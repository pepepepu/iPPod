import { useEffect, useRef } from 'react';
import {
  BsFillPlayFill,
  BsPauseFill,
  BsVolumeUpFill,
} from 'react-icons/bs';
import {
  homeContent,
  type ScreenId,
  type TrackItem,
} from '../../content/homeContent';
import { HomeScreen } from '../ScreenContent/01-home';
import { AboutScreen } from '../ScreenContent/02-about';
import { SkillsScreen } from '../ScreenContent/03-skills';
import { ProjectsScreen } from '../ScreenContent/04-projects';
import { ProjectDetailScreen } from '../ScreenContent/05-project-detail';
import { NowPlayingScreen } from '../ScreenContent/06-now-playing';
import { ContactScreen } from '../ScreenContent/07-contact';
import * as S from './styles';

export type PowerStatus = 'off' | 'booting' | 'on';

export interface ScreenAreaProps {
  isMobile: boolean;
  powerStatus: PowerStatus;
  currentScreen: ScreenId;
  selectedIndex: number;
  activeProjectIndex: number;
  tracks: TrackItem[];
  trackIndex: number;
  isPlaying: boolean;
  elapsedSeconds: number;
  volume: number;
  showVolumeHud: boolean;
  statusFeedback: string | null;
  onTogglePower: () => void;
  onPrev: () => void;
  onNext: () => void;
  onSelect: () => void;
  onMenuBack: () => void;
  onPlayPause: () => void;
  onHoverIndex: (index: number) => void;
  onNavigateScreen: (screen: ScreenId, index?: number) => void;
  onOpenProjectDetail: (projectIdx: number) => void;
  onExecuteProjectAction: (actionIdx: number) => void;
}

export function ScreenArea({
  isMobile,
  powerStatus,
  currentScreen,
  selectedIndex,
  activeProjectIndex,
  currentTrack,
  isPlaying,
  elapsedSeconds,
  volume,
  showVolumeHud,
  statusFeedback,
  onTogglePower,
  onPrev,
  onNext,
  onSelect,
  onMenuBack,
  onPlayPause,
  onHoverIndex,
  onNavigateScreen,
  onOpenProjectDetail,
  onExecuteProjectAction,
}: ScreenAreaProps & { currentTrack: TrackItem }) {
  const listContainerRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (!listContainerRef.current) return;
    const activeEl = listContainerRef.current.children[
      selectedIndex
    ] as HTMLElement | undefined;
    if (activeEl) {
      activeEl.scrollIntoView({
        block: 'nearest',
        behavior: 'smooth',
      });
    }
  }, [selectedIndex, currentScreen]);

  const getHeaderTitle = () => {
    switch (currentScreen) {
      case 'home':
        return homeContent.deviceName;
      case 'about':
        return homeContent.about.title;
      case 'skills':
        return homeContent.whatIDo.title;
      case 'projects':
        return `Meus Projetos (${homeContent.projects.length})`;
      case 'project-detail':
        return homeContent.projects[activeProjectIndex]?.title || 'Projeto';
      case 'now-playing':
        return 'Tocando Agora';
      case 'contact':
        return homeContent.contact.title;
    }
  };

  if (powerStatus === 'off') {
    return (
      <S.ScreenWrapper $isMobile={isMobile}>
        <S.BlankOffScreen onClick={onTogglePower} />
      </S.ScreenWrapper>
    );
  }

  if (powerStatus === 'booting') {
    return (
      <S.ScreenWrapper $isMobile={isMobile}>
        <S.BootScreen>
          <S.BootTagEmoticon>:P</S.BootTagEmoticon>
          <S.BootLoadingTrack>
            <S.BootLoadingFill />
          </S.BootLoadingTrack>
        </S.BootScreen>
      </S.ScreenWrapper>
    );
  }

  const renderActiveScreen = () => {
    switch (currentScreen) {
      case 'home':
        return (
          <HomeScreen
            selectedIndex={selectedIndex}
            listContainerRef={listContainerRef}
            onHoverIndex={onHoverIndex}
            onNavigateScreen={onNavigateScreen}
          />
        );
      case 'about':
        return (
          <AboutScreen
            selectedIndex={selectedIndex}
            listContainerRef={listContainerRef}
            onHoverIndex={onHoverIndex}
          />
        );
      case 'skills':
        return (
          <SkillsScreen
            selectedIndex={selectedIndex}
            listContainerRef={listContainerRef}
            onHoverIndex={onHoverIndex}
          />
        );
      case 'projects':
        return (
          <ProjectsScreen
            selectedIndex={selectedIndex}
            listContainerRef={listContainerRef}
            onHoverIndex={onHoverIndex}
            onOpenProjectDetail={onOpenProjectDetail}
          />
        );
      case 'project-detail':
        return (
          <ProjectDetailScreen
            activeProjectIndex={activeProjectIndex}
            selectedIndex={selectedIndex}
            statusFeedback={statusFeedback}
            onHoverIndex={onHoverIndex}
            onExecuteProjectAction={onExecuteProjectAction}
          />
        );
      case 'now-playing':
        return (
          <NowPlayingScreen
            currentTrack={currentTrack}
            elapsedSeconds={elapsedSeconds}
          />
        );
      case 'contact':
        return (
          <ContactScreen
            selectedIndex={selectedIndex}
            listContainerRef={listContainerRef}
            onHoverIndex={onHoverIndex}
          />
        );
      default:
        return null;
    }
  };

  return (
    <S.ScreenWrapper $isMobile={isMobile}>
      <S.StatusBar>
        <span>{getHeaderTitle()}</span>
        <S.StatusRight>
          {isPlaying ? <BsFillPlayFill size={16} /> : <BsPauseFill size={16} />}
          <S.BatteryIcon>
            <S.BatteryFill />
          </S.BatteryIcon>
        </S.StatusRight>
      </S.StatusBar>

      {renderActiveScreen()}

      {showVolumeHud && (
        <S.VolumeHudOverlay>
          <BsVolumeUpFill size={14} color="#00f0ff" />
          <span>VOL</span>
          <S.VolumeTrack>
            <S.VolumeFill $level={volume} />
          </S.VolumeTrack>
          <span>{volume}%</span>
        </S.VolumeHudOverlay>
      )}

      {isMobile ? (
        <S.ScreenFixedFooter>
          <S.FooterControlBtn type="button" onClick={onMenuBack}>
            <S.FooterKeyBadge>MENU</S.FooterKeyBadge>
            <span>Voltar</span>
          </S.FooterControlBtn>
          <S.FooterControlBtn type="button" onClick={onPrev}>
            <S.FooterKeyBadge>|&lt;&lt;</S.FooterKeyBadge>
            <span>Cima</span>
          </S.FooterControlBtn>
          <S.FooterControlBtn type="button" onClick={onNext}>
            <S.FooterKeyBadge>&gt;&gt;|</S.FooterKeyBadge>
            <span>Baixo</span>
          </S.FooterControlBtn>
          <S.FooterControlBtn type="button" onClick={onPlayPause}>
            <S.FooterKeyBadge>▶||</S.FooterKeyBadge>
            <span>Play</span>
          </S.FooterControlBtn>
          <S.FooterControlBtn type="button" onClick={onSelect}>
            <S.FooterKeyBadge>●</S.FooterKeyBadge>
            <span>Abrir</span>
          </S.FooterControlBtn>
        </S.ScreenFixedFooter>
      ) : (
        <S.ScreenFixedFooter>
          <S.FooterControlBtn type="button" onClick={onMenuBack}>
            <S.FooterKeyBadge>←</S.FooterKeyBadge>
            <span>Voltar</span>
          </S.FooterControlBtn>
          <S.FooterControlBtn type="button" onClick={onSelect}>
            <S.FooterKeyBadge>→</S.FooterKeyBadge>
            <span>Selecionar</span>
          </S.FooterControlBtn>
          <S.FooterControlBtn type="button" onClick={onPrev}>
            <S.FooterKeyBadge>↑</S.FooterKeyBadge>
            <span>Cima</span>
          </S.FooterControlBtn>
          <S.FooterControlBtn type="button" onClick={onNext}>
            <S.FooterKeyBadge>↓</S.FooterKeyBadge>
            <span>Baixo</span>
          </S.FooterControlBtn>
          <S.FooterControlBtn type="button" onClick={onTogglePower}>
            <S.FooterKeyBadge>P</S.FooterKeyBadge>
            <span>Desligar</span>
          </S.FooterControlBtn>
        </S.ScreenFixedFooter>
      )}
    </S.ScreenWrapper>
  );
}