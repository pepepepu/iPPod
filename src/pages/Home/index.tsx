import { ContactShadows, Environment, Float, OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import {
  type PointerEvent as ReactPointerEvent,
  Suspense,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  BsFillSkipBackwardFill,
  BsFillSkipForwardFill,
  BsPauseCircleFill,
  BsPower,
} from 'react-icons/bs';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import { IPPod3D } from '../../components/iPPod3d';
import { IPPodScreens, type PowerStatus } from '../../components/iPPodScreens';
import {
  getProjectDetailActions,
  homeContent,
  type IPPodColorPreset,
  type ScreenId,
} from '../../content/homeContent';
import {
  getSavedColorPreset,
  saveColorPresetId,
} from '../../utils/colorStorage';
import * as S from './styles';

export function Home() {
  const controlsRef = useRef<OrbitControlsImpl | null>(null);
  const mobileWheelRef = useRef<HTMLDivElement>(null);
  const lastMobileAngleRef = useRef<number | null>(null);
  const bootTimersRef = useRef<number[]>([]);
  const volumeTimerRef = useRef<number | null>(null);

  const [isMobile, setIsMobile] = useState<boolean>(() =>
    typeof window !== 'undefined' ? window.innerWidth <= 768 : false
  );
  const [powerStatus, setPowerStatus] = useState<PowerStatus>('off');
  const [bootWink, setBootWink] = useState(false);
  const [colorPreset, setColorPreset] = useState<IPPodColorPreset>(() =>
    getSavedColorPreset()
  );
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('home');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [trackIndex, setTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [elapsedSeconds, setElapsedSeconds] = useState(48);
  const [volume, setVolume] = useState(70);
  const [showVolumeHud, setShowVolumeHud] = useState(false);
  const [statusFeedback, setStatusFeedback] = useState<string | null>(null);

  const currentTrack = homeContent.tracks[trackIndex] || homeContent.tracks[0];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const clearBootTimers = () => {
    bootTimersRef.current.forEach((id) => window.clearTimeout(id));
    bootTimersRef.current = [];
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
        return homeContent.tracks.length;
      case 'contact':
        return homeContent.contact.links.length;
      default:
        return 1;
    }
  };

  const handleSelectColor = (preset: IPPodColorPreset) => {
    setColorPreset(preset);
    saveColorPresetId(preset.id);
  };

  const handleTogglePower = () => {
    clearBootTimers();
    if (powerStatus === 'off') {
      setBootWink(false);
      setPowerStatus('booting');

      const winkTimer = window.setTimeout(() => {
        setBootWink(true);
      }, 550);

      const finishTimer = window.setTimeout(() => {
        setPowerStatus('on');
      }, 1300);

      bootTimersRef.current = [winkTimer, finishTimer];
    } else {
      setPowerStatus('off');
      setBootWink(false);
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

  const navigateToScreen = (nextScreen: ScreenId, initialIdx = 0) => {
    setCurrentScreen(nextScreen);
    setSelectedIndex(initialIdx);
    setStatusFeedback(null);
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
      setTrackIndex((prev) => (prev + 1) % homeContent.tracks.length);
      setElapsedSeconds(0);
      return;
    }
    const len = getListLength(currentScreen);
    setSelectedIndex((prev) => (prev + 1) % len);
  };

  const handlePrev = () => {
    if (powerStatus !== 'on') return;
    if (currentScreen === 'now-playing') {
      setTrackIndex(
        (prev) =>
          (prev - 1 + homeContent.tracks.length) % homeContent.tracks.length
      );
      setElapsedSeconds(0);
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
      clearBootTimers();
      if (volumeTimerRef.current) {
        window.clearTimeout(volumeTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (powerStatus !== 'on' || !isPlaying) return;
    const timer = window.setInterval(() => {
      setElapsedSeconds((prev) => {
        if (prev + 1 >= currentTrack.duration) {
          setTrackIndex((t) => (t + 1) % homeContent.tracks.length);
          return 0;
        }
        return prev + 1;
      });
    }, 1000);
    return () => window.clearInterval(timer);
  }, [powerStatus, isPlaying, currentTrack.duration]);

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

  if (isMobile) {
    return (
      <S.MobileVirtualIPPod
        $bodyColor={colorPreset.bodyColor}
        $backplateColor={colorPreset.backplateColor}
      >
        <S.MobileScreenBezel>
          <IPPodScreens
            isMobile
            powerStatus={powerStatus}
            bootWink={bootWink}
            currentScreen={currentScreen}
            selectedIndex={selectedIndex}
            activeProjectIndex={activeProjectIndex}
            trackIndex={trackIndex}
            isPlaying={isPlaying}
            elapsedSeconds={elapsedSeconds}
            volume={volume}
            showVolumeHud={showVolumeHud}
            statusFeedback={statusFeedback}
            onTogglePower={handleTogglePower}
            onPrev={handlePrev}
            onNext={handleNext}
            onSelect={handleSelect}
            onMenuBack={handleMenuBack}
            onHoverIndex={setSelectedIndex}
            onNavigateScreen={navigateToScreen}
            onOpenProjectDetail={(idx) => {
              setActiveProjectIndex(idx);
              navigateToScreen('project-detail', 0);
            }}
            onExecuteProjectAction={executeProjectAction}
          />
        </S.MobileScreenBezel>

        <S.MobileWheelSection>
          <S.MobileClickWheel
            ref={mobileWheelRef}
            $wheelColor={colorPreset.wheelColor}
            onPointerDown={handleMobileWheelPointerDown}
            onPointerMove={handleMobileWheelPointerMove}
            onPointerUp={handleMobileWheelPointerUp}
            onPointerLeave={handleMobileWheelPointerUp}
          >
            <S.MobileWheelBtn
              type="button"
              $position="top"
              onClick={handlePrev}
            >
              MENU
            </S.MobileWheelBtn>

            <S.MobileWheelBtn
              type="button"
              $position="left"
              onClick={handleMenuBack}
            >
              <BsFillSkipBackwardFill size={18} />
            </S.MobileWheelBtn>

            <S.MobileWheelBtn
              type="button"
              $position="right"
              onClick={handleSelect}
            >
              <BsFillSkipForwardFill size={18} />
            </S.MobileWheelBtn>

            <S.MobileWheelBtn
              type="button"
              $position="bottom"
              onClick={handleNext}
            >
              <BsPauseCircleFill size={20} />
            </S.MobileWheelBtn>

            <S.MobileCenterSelectBtn
              type="button"
              $centerColor={colorPreset.centerButtonColor}
              $isOn={isDeviceActive}
              onClick={handleTogglePower}
              aria-label="Ligar ou desligar iPPod"
            >
              <BsPower size={24} />
            </S.MobileCenterSelectBtn>
          </S.MobileClickWheel>
        </S.MobileWheelSection>
      </S.MobileVirtualIPPod>
    );
  }

  return (
    <S.ViewportContainer>
      <S.TopHeaderBadge>
        <S.StatusDot $isOn={isDeviceActive} />
        <span>
          iPPod • {colorPreset.name.toUpperCase()} •{' '}
          {isDeviceActive ? 'ONLINE' : 'OFFLINE'}
        </span>
      </S.TopHeaderBadge>

      <S.CanvasStage $isInteractive={!isDeviceActive}>
        <Canvas
          shadows
          camera={{ position: [0, 0, 7.6], fov: 40 }}
          gl={{ antialias: true, alpha: true }}
        >
          <ambientLight intensity={0.9} />
          <directionalLight position={[5, 8, 6]} intensity={1.6} castShadow />
          <directionalLight position={[-5, -3, 4]} intensity={0.65} />
          <pointLight position={[0, 3, 4]} intensity={0.5} color="#ffffff" />

          <Suspense fallback={null}>
            <Environment preset="studio" />
            <Float
              speed={isDeviceActive ? 0 : 1.5}
              rotationIntensity={isDeviceActive ? 0 : 0.1}
              floatIntensity={isDeviceActive ? 0 : 0.18}
            >
              <IPPod3D
                isMobile={false}
                powerStatus={powerStatus}
                bootWink={bootWink}
                colorPreset={colorPreset}
                currentScreen={currentScreen}
                selectedIndex={selectedIndex}
                activeProjectIndex={activeProjectIndex}
                trackIndex={trackIndex}
                isPlaying={isPlaying}
                elapsedSeconds={elapsedSeconds}
                volume={volume}
                showVolumeHud={showVolumeHud}
                statusFeedback={statusFeedback}
                controlsRef={controlsRef}
                onTogglePower={handleTogglePower}
                onVolumeUp={handleVolumeUp}
                onVolumeDown={handleVolumeDown}
                onNext={handleNext}
                onPrev={handlePrev}
                onSelect={handleSelect}
                onMenuBack={handleMenuBack}
                onPlayPause={handlePlayPause}
                onHoverIndex={setSelectedIndex}
                onNavigateScreen={navigateToScreen}
                onOpenProjectDetail={(idx) => {
                  setActiveProjectIndex(idx);
                  navigateToScreen('project-detail', 0);
                }}
                onExecuteProjectAction={executeProjectAction}
              />
            </Float>
            <ContactShadows
              position={[0, -2.15, 0]}
              opacity={isDeviceActive ? 0.12 : 0.34}
              scale={6}
              blur={2.4}
              far={4}
            />
          </Suspense>

          <OrbitControls
            ref={controlsRef}
            enabled={!isDeviceActive}
            enableZoom={false}
            enablePan={false}
            enableRotate={!isDeviceActive}
            minPolarAngle={Math.PI / 2 - 0.35}
            maxPolarAngle={Math.PI / 2 + 0.35}
            minAzimuthAngle={-0.45}
            maxAzimuthAngle={0.45}
          />
        </Canvas>
      </S.CanvasStage>

      <S.BottomRightPanel>
        <S.ColorPickerCard>
          <S.ColorPickerLabel>COR:</S.ColorPickerLabel>
          <S.SwatchList>
            {homeContent.colorPresets.map((preset) => (
              <S.ColorSwatchButton
                key={preset.id}
                type="button"
                title={preset.name}
                $hex={preset.swatchHex}
                $active={preset.id === colorPreset.id}
                onClick={() => handleSelectColor(preset)}
              />
            ))}
          </S.SwatchList>
        </S.ColorPickerCard>
      </S.BottomRightPanel>
    </S.ViewportContainer>
  );
}