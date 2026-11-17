import {
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from 'react';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import type { PowerStatus } from '../components/ScreenArea';
import {
  getProjectDetailActions,
  homeContent,
  type IPPodColorPreset,
  type PendingStickerDrop,
  type PlacedSticker,
  type ScreenId,
  type TrackItem,
} from '../content/homeContent';
import {
  getSavedColorPreset,
  saveColorPresetId,
} from '../utils/colorStorage';
import { fetchLastFmCurrentTrack } from '../utils/lastFMServices';
import {
  getSavedStickers,
  savePlacedStickers,
} from '../utils/stickerStorage';

export function useHome() {
  const controlsRef = useRef<OrbitControlsImpl | null>(null);
  const mobileWheelRef = useRef<HTMLDivElement>(null);
  const lastMobileAngleRef = useRef<number | null>(null);
  const bootTimerRef = useRef<number | null>(null);
  const volumeTimerRef = useRef<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [isMobile, setIsMobile] = useState<boolean>(() =>
    typeof window !== 'undefined' ? window.innerWidth <= 768 : false
  );
  const [powerStatus, setPowerStatus] = useState<PowerStatus>('off');
  const [colorPreset, setColorPreset] = useState<IPPodColorPreset>(() =>
    getSavedColorPreset(
      typeof window !== 'undefined' ? window.innerWidth <= 768 : false
    )
  );
  const [placedStickers, setPlacedStickers] = useState<PlacedSticker[]>(() =>
    getSavedStickers(
      typeof window !== 'undefined' ? window.innerWidth <= 768 : false
    )
  );
  const [pendingDrop, setPendingDrop] = useState<PendingStickerDrop | null>(
    null
  );
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('home');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [currentTrack, setCurrentTrack] = useState<TrackItem>(() => ({
    ...homeContent.tracks[0],
    number: 'Faixa 01 de 01',
    duration: 30,
    isLiveNow: true,
  }));
  const [isPlaying, setIsPlaying] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [volume, setVolume] = useState(70);
  const [showVolumeHud, setShowVolumeHud] = useState(false);
  const [statusFeedback, setStatusFeedback] = useState<string | null>(null);

  useEffect(() => {
    const audio = new Audio();
    audio.preload = 'auto';
    audio.loop = true;
    audio.volume = 0.7;

    const handleTimeUpdate = () => {
      setElapsedSeconds(Math.floor(audio.currentTime));
    };

    const handleLoadedMetadata = () => {
      if (audio.duration && Number.isFinite(audio.duration)) {
        const dur = Math.round(audio.duration);
        setCurrentTrack((prev) =>
          prev.duration === dur ? prev : { ...prev, duration: dur }
        );
      }
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audioRef.current = null;
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentTrack.previewUrl) return;

    if (audio.src !== currentTrack.previewUrl) {
      audio.src = currentTrack.previewUrl;
      audio.currentTime = 0;
      setElapsedSeconds(0);
      if (powerStatus === 'on' && isPlaying) {
        void audio.play().catch(() => {
          setIsPlaying(false);
        });
      }
    }
  }, [currentTrack.previewUrl, powerStatus, isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (powerStatus !== 'on') {
      audio.pause();
      return;
    }

    if (isPlaying && currentTrack.previewUrl) {
      void audio.play().catch(() => {
        setIsPlaying(false);
      });
    } else {
      audio.pause();
    }
  }, [powerStatus, isPlaying, currentTrack.previewUrl]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = Math.max(0, Math.min(1, volume / 100));
    }
  }, [volume]);

  useEffect(() => {
    const handleResize = () => {
      const nextIsMobile = window.innerWidth <= 768;
      setIsMobile((prev) => {
        if (prev !== nextIsMobile) {
          setColorPreset(getSavedColorPreset(nextIsMobile));
          setPlacedStickers(getSavedStickers(nextIsMobile));
        }
        return nextIsMobile;
      });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    let isMounted = true;

    const loadLatestTrack = async () => {
      const latest = await fetchLastFmCurrentTrack();
      if (isMounted) {
        setCurrentTrack((prev) => {
          if (prev.title === latest.title && prev.artist === latest.artist) {
            return {
              ...prev,
              coverUrl: latest.coverUrl || prev.coverUrl,
              previewUrl: latest.previewUrl || prev.previewUrl,
              trackUrl: latest.trackUrl || prev.trackUrl,
            };
          }
          setElapsedSeconds(0);
          return latest;
        });
      }
    };

    void loadLatestTrack();
    const pollingInterval = window.setInterval(() => {
      void loadLatestTrack();
    }, 20000);

    return () => {
      isMounted = false;
      window.clearInterval(pollingInterval);
    };
  }, []);

  const clearBootTimer = () => {
    if (bootTimerRef.current !== null) {
      window.clearTimeout(bootTimerRef.current);
      bootTimerRef.current = null;
    }
  };

  const getListLength = (screen: ScreenId): number => {
    switch (screen) {
      case 'home':
        return homeContent.mainMenu.length;
      case 'about':
        return homeContent.about.tracks.length;
      case 'skills':
        return homeContent.whatIDo.topics.length;
      case 'projects':
        return homeContent.projects.length;
      case 'project-detail': {
        const proj =
          homeContent.projects[activeProjectIndex] || homeContent.projects[0];
        return getProjectDetailActions(proj).length;
      }
      case 'now-playing':
        return 1;
      case 'contact':
        return homeContent.contact.links.length;
      default:
        return 1;
    }
  };

  const handleSelectColor = (preset: IPPodColorPreset) => {
    setColorPreset(preset);
    saveColorPresetId(preset.id, isMobile);
  };

  const handlePlaceSticker = (newSticker: PlacedSticker) => {
    setPlacedStickers((prev) => {
      if (prev.some((item) => item.stickerId === newSticker.stickerId)) {
        return prev;
      }
      const updated = [
        ...prev,
        { ...newSticker, autoGenerated: false },
      ];
      savePlacedStickers(updated, isMobile);
      return updated;
    });
  };

  const handleDropSticker = (drop: PendingStickerDrop) => {
    setPendingDrop(drop);
  };

  const handleConsumeDrop = () => {
    setPendingDrop(null);
  };

  const handleTurnOnOnly = () => {
    if (powerStatus !== 'off') return;
    clearBootTimer();
    setPowerStatus('booting');

    bootTimerRef.current = window.setTimeout(() => {
      setPowerStatus('on');
    }, 1350);
  };

  const handleTogglePower = () => {
    if (powerStatus === 'off') {
      handleTurnOnOnly();
    } else {
      clearBootTimer();
      setIsPlaying(false);
      setPowerStatus('off');
    }
  };

  const triggerVolumeHud = (nextVolume: number) => {
    if (powerStatus !== 'on') return;
    setVolume(nextVolume);
    setShowVolumeHud(true);
    if (volumeTimerRef.current) {
      window.clearTimeout(volumeTimerRef.current);
    }
    volumeTimerRef.current = window.setTimeout(() => {
      setShowVolumeHud(false);
    }, 1400);
  };

  const handleVolumeUp = () => {
    triggerVolumeHud(Math.min(100, volume + 10));
  };

  const handleVolumeDown = () => {
    triggerVolumeHud(Math.max(0, volume - 10));
  };

  const handleSeekSeconds = (targetSeconds: number) => {
    const clamped = Math.max(
      0,
      Math.min(currentTrack.duration - 1, targetSeconds)
    );
    setElapsedSeconds(clamped);
    if (audioRef.current) {
      audioRef.current.currentTime = clamped;
    }
  };

  const navigateToScreen = (nextScreen: ScreenId, initialIdx = 0) => {
    setCurrentScreen(nextScreen);
    setSelectedIndex(initialIdx);
    setStatusFeedback(null);

    if (nextScreen === 'now-playing') {
      setIsPlaying(true);
      if (audioRef.current && currentTrack.previewUrl) {
        if (audioRef.current.src !== currentTrack.previewUrl) {
          audioRef.current.src = currentTrack.previewUrl;
        }
        void audioRef.current.play().catch(() => {
          setIsPlaying(false);
        });
      }
    }
  };

  const handleOpenProjectDetail = (idx: number) => {
    setActiveProjectIndex(idx);
    navigateToScreen('project-detail', 0);
  };

  const executeProjectAction = (actionIdx: number) => {
    const proj =
      homeContent.projects[activeProjectIndex] || homeContent.projects[0];
    const actions = getProjectDetailActions(proj);
    const chosen = actions[actionIdx];
    if (!chosen) return;

    if (chosen.type === 'back') {
      navigateToScreen('projects', activeProjectIndex);
      return;
    }

    if (chosen.url) {
      window.open(chosen.url, '_blank', 'noopener,noreferrer');
      setStatusFeedback('ABERTO EM NOVA ABA');
    }
  };

  const handleNext = () => {
    if (powerStatus !== 'on') return;
    if (currentScreen === 'now-playing') {
      handleSeekSeconds(elapsedSeconds + 3);
      return;
    }
    const len = getListLength(currentScreen);
    setSelectedIndex((prev) => (prev + 1) % len);
  };

  const handlePrev = () => {
    if (powerStatus !== 'on') return;
    if (currentScreen === 'now-playing') {
      handleSeekSeconds(elapsedSeconds - 3);
      return;
    }
    const len = getListLength(currentScreen);
    setSelectedIndex((prev) => (prev - 1 + len) % len);
  };

  const handleSelect = () => {
    if (powerStatus !== 'on') return;

    if (currentScreen === 'home') {
      const target = homeContent.mainMenu[selectedIndex];
      if (target) navigateToScreen(target.id, 0);
      return;
    }

    if (currentScreen === 'projects') {
      setActiveProjectIndex(selectedIndex);
      navigateToScreen('project-detail', 0);
      return;
    }

    if (currentScreen === 'project-detail') {
      executeProjectAction(selectedIndex);
      return;
    }

    if (currentScreen === 'now-playing') {
      setIsPlaying((prev) => !prev);
      return;
    }

    if (currentScreen === 'contact') {
      const contact = homeContent.contact.links[selectedIndex];
      if (contact) {
        window.open(contact.url, '_blank', 'noopener,noreferrer');
        setStatusFeedback(`ABRINDO ${contact.label.toUpperCase()}`);
      }
    }
  };

  const handleMenuBack = () => {
    if (powerStatus !== 'on') return;
    if (currentScreen === 'project-detail') {
      navigateToScreen('projects', activeProjectIndex);
      return;
    }
    if (currentScreen !== 'home') {
      const returnIdx = homeContent.mainMenu.findIndex(
        (item) => item.id === currentScreen
      );
      navigateToScreen('home', returnIdx >= 0 ? returnIdx : 0);
    }
  };

  const handlePlayPause = () => {
    if (powerStatus !== 'on') return;
    setIsPlaying((prev) => !prev);
  };

  const computeMobileWheelAngle = (clientX: number, clientY: number) => {
    if (!mobileWheelRef.current) return null;
    const rect = mobileWheelRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    return Math.atan2(clientY - centerY, clientX - centerX) * (180 / Math.PI);
  };

  const handleMobileWheelPointerDown = (
    e: ReactPointerEvent<HTMLDivElement>
  ) => {
    if (powerStatus !== 'on') return;
    lastMobileAngleRef.current = computeMobileWheelAngle(e.clientX, e.clientY);
  };

  const handleMobileWheelPointerMove = (
    e: ReactPointerEvent<HTMLDivElement>
  ) => {
    if (powerStatus !== 'on' || lastMobileAngleRef.current === null) return;

    const currentAngle = computeMobileWheelAngle(e.clientX, e.clientY);
    if (currentAngle === null) return;

    let delta = currentAngle - lastMobileAngleRef.current;
    if (delta > 180) delta -= 360;
    if (delta < -180) delta += 360;

    if (Math.abs(delta) >= 22) {
      if (delta > 0) {
        handleNext();
      } else {
        handlePrev();
      }
      lastMobileAngleRef.current = currentAngle;
    }
  };

  const handleMobileWheelPointerUp = () => {
    lastMobileAngleRef.current = null;
  };

  useEffect(() => {
    return () => {
      clearBootTimer();
      if (volumeTimerRef.current) {
        window.clearTimeout(volumeTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === 'p') {
        event.preventDefault();
        handleTogglePower();
        return;
      }

      if (powerStatus !== 'on') return;

      if (event.key === 'ArrowUp') {
        event.preventDefault();
        handlePrev();
      } else if (event.key === 'ArrowDown') {
        event.preventDefault();
        handleNext();
      } else if (
        event.key === 'ArrowLeft' ||
        event.key === 'Backspace' ||
        event.key === 'Escape'
      ) {
        event.preventDefault();
        handleMenuBack();
      } else if (event.key === 'ArrowRight' || event.key === 'Enter') {
        event.preventDefault();
        handleSelect();
      } else if (event.key === ' ') {
        event.preventDefault();
        handlePlayPause();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  });

  const isDeviceActive = powerStatus !== 'off';

  return {
    controlsRef,
    mobileWheelRef,
    isMobile,
    powerStatus,
    isDeviceActive,
    colorPreset,
    placedStickers,
    pendingDrop,
    currentScreen,
    selectedIndex,
    setSelectedIndex,
    activeProjectIndex,
    currentTrack,
    isPlaying,
    elapsedSeconds,
    volume,
    showVolumeHud,
    statusFeedback,
    handleSelectColor,
    handlePlaceSticker,
    handleDropSticker,
    handleConsumeDrop,
    handleTurnOnOnly,
    handleTogglePower,
    handleVolumeUp,
    handleVolumeDown,
    handleSeekSeconds,
    navigateToScreen,
    handleOpenProjectDetail,
    executeProjectAction,
    handleNext,
    handlePrev,
    handleSelect,
    handleMenuBack,
    handlePlayPause,
    handleMobileWheelPointerDown,
    handleMobileWheelPointerMove,
    handleMobileWheelPointerUp,
  };
}