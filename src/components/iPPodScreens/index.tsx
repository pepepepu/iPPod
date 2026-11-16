import { useEffect, useRef } from 'react';
import {
  BsChevronRight,
  BsFillPlayFill,
  BsLink45Deg,
  BsPauseFill,
  BsVolumeUpFill,
} from 'react-icons/bs';
import {
  getProjectDetailActions,
  homeContent,
  type ScreenId,
} from '../../content/homeContent';
import * as S from './styles';

export type PowerStatus = 'off' | 'booting' | 'on';

export interface IPPodScreensProps {
  isMobile: boolean;
  powerStatus: PowerStatus;
  bootWink: boolean;
  currentScreen: ScreenId;
  selectedIndex: number;
  activeProjectIndex: number;
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
  onHoverIndex: (index: number) => void;
  onNavigateScreen: (screen: ScreenId, index?: number) => void;
  onOpenProjectDetail: (projectIdx: number) => void;
  onExecuteProjectAction: (actionIdx: number) => void;
}

export function IPPodScreens({
  isMobile,
  powerStatus,
  bootWink,
  currentScreen,
  selectedIndex,
  activeProjectIndex,
  trackIndex,
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
  onHoverIndex,
  onNavigateScreen,
  onOpenProjectDetail,
  onExecuteProjectAction,
}: IPPodScreensProps) {
  const listContainerRef = useRef<HTMLUListElement>(null);
  const currentTrack = homeContent.tracks[trackIndex] || homeContent.tracks[0];

  useEffect(() => {
    if (!listContainerRef.current) return;
    const activeEl = listContainerRef.current.children[
      selectedIndex
    ] as HTMLElement | undefined;
    if (activeEl) {
      activeEl.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
  }, [selectedIndex, currentScreen]);

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const rem = secs % 60;
    return `${mins}:${rem < 10 ? '0' : ''}${rem}`;
  };

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
      <S.ScreenWrapper>
        <S.BlankOffScreen onClick={onTogglePower} />
      </S.ScreenWrapper>
    );
  }

  if (powerStatus === 'booting') {
    return (
      <S.ScreenWrapper>
        <S.BootScreen>
          <S.BootTagEmoticon $winking={bootWink}>
            {bootWink ? ';P' : ':P'}
          </S.BootTagEmoticon>
          <S.BootLoadingTrack>
            <S.BootLoadingFill />
          </S.BootLoadingTrack>
        </S.BootScreen>
      </S.ScreenWrapper>
    );
  }

  const renderActiveScreen = () => {
    if (currentScreen === 'home') {
      const activeMenu =
        homeContent.mainMenu[selectedIndex] || homeContent.mainMenu[0];
      return (
        <S.SplitBody>
          <S.LeftPane>
            <S.MenuList ref={listContainerRef}>
              {homeContent.mainMenu.map((item, idx) => (
                <S.MenuItemRow
                  key={item.id}
                  $active={idx === selectedIndex}
                  onMouseEnter={() => onHoverIndex(idx)}
                  onClick={() => onNavigateScreen(item.id, 0)}
                >
                  <span className="truncate">{item.label}</span>
                  <BsChevronRight size={14} />
                </S.MenuItemRow>
              ))}
            </S.MenuList>
          </S.LeftPane>

          <S.RightPane>
            <S.Y2KGradientCover $gradient={activeMenu.y2kGradient}>
              <S.AlbumOpticalRing />
              <S.ArtworkBadge>{activeMenu.badge}</S.ArtworkBadge>
            </S.Y2KGradientCover>
            <S.PreviewTitle>{activeMenu.previewTitle}</S.PreviewTitle>
            <S.PreviewSubtitle>{activeMenu.previewSubtitle}</S.PreviewSubtitle>
          </S.RightPane>
        </S.SplitBody>
      );
    }

    if (currentScreen === 'about') {
      const activeBioTrack =
        homeContent.about.tracks[selectedIndex] || homeContent.about.tracks[0];

      return (
        <S.SplitBody>
          <S.LeftPane>
            <S.MenuList ref={listContainerRef}>
              {homeContent.about.tracks.map((item, idx) => (
                <S.MenuItemRow
                  key={item.id}
                  $active={idx === selectedIndex}
                  onMouseEnter={() => onHoverIndex(idx)}
                  onClick={() => onHoverIndex(idx)}
                >
                  <span className="truncate">{item.label}</span>
                  <BsChevronRight size={14} />
                </S.MenuItemRow>
              ))}
            </S.MenuList>
          </S.LeftPane>

          <S.RightPane>
            <S.Y2KGradientCover
              $gradient={homeContent.about.y2kGradient} $size={94}
            >
              <S.AlbumOpticalRing />
              <S.ArtworkBadge>{activeBioTrack.tag}</S.ArtworkBadge>
            </S.Y2KGradientCover>
            <S.PreviewTitle>{homeContent.about.title}</S.PreviewTitle>
            <S.PreviewSubtitle>{homeContent.about.subtitle}</S.PreviewSubtitle>
            <S.InfoTextCard>
              <span className="label">{activeBioTrack.label}</span>
              <p className="val">{activeBioTrack.content}</p>
            </S.InfoTextCard>
          </S.RightPane>
        </S.SplitBody>
      );
    }

    if (currentScreen === 'skills') {
      const activeTopic =
        homeContent.whatIDo.topics[selectedIndex] ||
        homeContent.whatIDo.topics[0];

      return (
        <S.SplitBody>
          <S.LeftPane>
            <S.MenuList ref={listContainerRef}>
              {homeContent.whatIDo.topics.map((topic, idx) => (
                <S.MenuItemRow
                  key={topic.id}
                  $active={idx === selectedIndex}
                  onMouseEnter={() => onHoverIndex(idx)}
                  onClick={() => onHoverIndex(idx)}
                >
                  <span className="truncate">{topic.label}</span>
                  <BsChevronRight size={14} />
                </S.MenuItemRow>
              ))}
            </S.MenuList>
          </S.LeftPane>

          <S.RightPane>
            <S.EqualizerBox>
              {activeTopic.bars.map((barValue, idx) => (
                <S.EqBarColumn key={`${activeTopic.id}-${idx}`}>
                  <S.EqBarFill $height={barValue} />
                </S.EqBarColumn>
              ))}
            </S.EqualizerBox>
            <S.PreviewTitle>{activeTopic.label}</S.PreviewTitle>
            <S.PreviewSubtitle>{activeTopic.tools}</S.PreviewSubtitle>
            <S.InfoTextCard>
              <span className="label">{activeTopic.subtitle}</span>
              <p className="val">{activeTopic.description}</p>
            </S.InfoTextCard>
          </S.RightPane>
        </S.SplitBody>
      );
    }

    if (currentScreen === 'projects') {
      const activeProj =
        homeContent.projects[selectedIndex] || homeContent.projects[0];
      return (
        <S.SplitBody>
          <S.LeftPane>
            <S.MenuList ref={listContainerRef}>
              {homeContent.projects.map((proj, idx) => (
                <S.MenuItemRow
                  key={proj.id}
                  $active={idx === selectedIndex}
                  onMouseEnter={() => onHoverIndex(idx)}
                  onClick={() => onOpenProjectDetail(idx)}
                >
                  <span className="truncate">
                    {proj.trackNumber}. {proj.title}
                  </span>
                  <BsChevronRight size={14} />
                </S.MenuItemRow>
              ))}
            </S.MenuList>
          </S.LeftPane>

          <S.RightPane>
            <S.Y2KGradientCover $gradient={activeProj.y2kGradient}>
              <S.AlbumOpticalRing />
              <S.ArtworkBadge>{activeProj.discCode}</S.ArtworkBadge>
            </S.Y2KGradientCover>
            <S.PreviewTitle>{activeProj.title}</S.PreviewTitle>
            <S.PreviewSubtitle>{activeProj.contextLabel}</S.PreviewSubtitle>
            <S.TagRow>
              {activeProj.tags.slice(0, 4).map((tech) => (
                <S.MiniTag key={tech}>{tech}</S.MiniTag>
              ))}
            </S.TagRow>
          </S.RightPane>
        </S.SplitBody>
      );
    }

    if (currentScreen === 'project-detail') {
      const proj =
        homeContent.projects[activeProjectIndex] || homeContent.projects[0];
      const actions = getProjectDetailActions(proj);

      return (
        <S.FullScreenBody>
          <div>
            <S.DetailHeader>
              <S.DetailMiniCover $gradient={proj.y2kGradient}>
                {proj.trackNumber}
              </S.DetailMiniCover>
              <S.DetailTitleBlock>
                <h3>{proj.title}</h3>
                <span>
                  {proj.contextLabel}
                  {statusFeedback ? ` • ${statusFeedback}` : ''}
                </span>
                <S.TagRow style={{ justifyContent: 'flex-start' }}>
                  {proj.tags.map((t) => (
                    <S.MiniTag key={t}>{t}</S.MiniTag>
                  ))}
                </S.TagRow>
              </S.DetailTitleBlock>
            </S.DetailHeader>

            <S.DetailDescription>{proj.description}</S.DetailDescription>

            <S.ActionButtonsList>
              {actions.map((act, idx) => (
                <S.MenuItemRow
                  key={act.label}
                  $active={idx === selectedIndex}
                  onMouseEnter={() => onHoverIndex(idx)}
                  onClick={() => {
                    onHoverIndex(idx);
                    onExecuteProjectAction(idx);
                  }}
                >
                  <span className="truncate">{act.label}</span>
                  {act.type === 'back' ? (
                    <BsChevronRight size={14} />
                  ) : (
                    <BsLink45Deg size={18} />
                  )}
                </S.MenuItemRow>
              ))}
            </S.ActionButtonsList>
          </div>
        </S.FullScreenBody>
      );
    }

    if (currentScreen === 'now-playing') {
      const progressPercent = Math.min(
        100,
        (elapsedSeconds / currentTrack.duration) * 100
      );
      const remaining = Math.max(0, currentTrack.duration - elapsedSeconds);

      return (
        <S.FullScreenBody>
          <S.NowPlayingGrid>
            <S.Y2KGradientCover
              $gradient={currentTrack.y2kGradient} $size={145}
            >
              <S.AlbumOpticalRing />
              <S.ArtworkBadge>128 KBPS</S.ArtworkBadge>
            </S.Y2KGradientCover>

            <S.TrackMeta>
              <span className="index">{currentTrack.number}</span>
              <h2>{currentTrack.title}</h2>
              <p className="artist">{currentTrack.artist}</p>
              <p className="album">{currentTrack.album}</p>
            </S.TrackMeta>
          </S.NowPlayingGrid>

          <S.ScrubberContainer>
            <S.ScrubberBar>
              <S.ScrubberFill $percent={progressPercent} />
            </S.ScrubberBar>
            <S.ScrubberTimeRow>
              <span>{formatTime(elapsedSeconds)}</span>
              <span>-{formatTime(remaining)}</span>
            </S.ScrubberTimeRow>
          </S.ScrubberContainer>
        </S.FullScreenBody>
      );
    }

    const activeContact =
      homeContent.contact.links[selectedIndex] || homeContent.contact.links[0];
    return (
      <S.SplitBody>
        <S.LeftPane>
          <S.MenuList ref={listContainerRef}>
            {homeContent.contact.links.map((cnt, idx) => (
              <S.MenuItemRow
                key={cnt.id}
                $active={idx === selectedIndex}
                onMouseEnter={() => onHoverIndex(idx)}
                onClick={() => {
                  onHoverIndex(idx);
                  window.open(cnt.url, '_blank', 'noopener,noreferrer');
                }}
              >
                <span className="truncate">{cnt.label}</span>
                <BsLink45Deg size={18} />
              </S.MenuItemRow>
            ))}
          </S.MenuList>
        </S.LeftPane>

        <S.RightPane>
          <S.Y2KGradientCover $gradient={activeContact.y2kGradient} $size={96}>
            <S.AlbumOpticalRing />
            <S.ArtworkBadge>{activeContact.protocol}</S.ArtworkBadge>
          </S.Y2KGradientCover>
          <S.PreviewTitle>{activeContact.label}</S.PreviewTitle>
          <S.PreviewSubtitle>{activeContact.value}</S.PreviewSubtitle>
          <S.InfoTextCard>
            <span className="label">{homeContent.contact.subtitle}</span>
            <p className="val">{homeContent.contact.message}</p>
          </S.InfoTextCard>
        </S.RightPane>
      </S.SplitBody>
    );
  };

  return (
    <S.ScreenWrapper>
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

      {!isMobile && (
        <S.ScreenFixedFooter>
          <S.FooterControlBtn type="button" onClick={onMenuBack}>
            <S.FooterKeyBadge>←</S.FooterKeyBadge>
            <span>Voltar</span>
          </S.FooterControlBtn>

          <S.FooterControlBtn type="button" onClick={onSelect}>
            <S.FooterKeyBadge>→ / Enter</S.FooterKeyBadge>
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