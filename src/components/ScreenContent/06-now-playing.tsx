import type { MouseEvent } from 'react';
import {
  BsBoxArrowUpRight,
  BsFillPlayFill,
  BsFillSkipBackwardFill,
  BsFillSkipForwardFill,
  BsPauseFill,
} from 'react-icons/bs';
import type { TrackItem } from '../../content/homeContent';
import * as S from './styles';

export interface NowPlayingScreenProps {
  isMobile?: boolean;
  currentTrack: TrackItem;
  elapsedSeconds: number;
  isPlaying?: boolean;
  onPlayPause?: () => void;
  onPrev?: () => void;
  onNext?: () => void;
  onSeekSeconds?: (seconds: number) => void;
}

export function NowPlayingScreen({
  isMobile = false,
  currentTrack,
  elapsedSeconds,
  isPlaying = false,
  onPlayPause,
  onPrev,
  onNext,
  onSeekSeconds,
}: NowPlayingScreenProps) {
  const duration = Math.max(1, currentTrack.duration);
  const progressPercent = Math.min(100, (elapsedSeconds / duration) * 100);
  const remaining = Math.max(0, duration - elapsedSeconds);

  const formatTime = (secs: number) => {
    const clean = Math.max(0, Math.floor(secs));
    const mins = Math.floor(clean / 60);
    const rem = clean % 60;
    return `${mins}:${rem < 10 ? '0' : ''}${rem}`;
  };

  const handleBarClick = (e: MouseEvent<HTMLDivElement>) => {
    if (!onSeekSeconds) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = Math.max(
      0,
      Math.min(1, (e.clientX - rect.left) / rect.width)
    );
    onSeekSeconds(Math.round(ratio * duration));
  };

  return (
    <S.FullScreenBody>
      <S.NowPlayingGrid>
        <S.Y2KGradientCover
          $gradient={currentTrack.y2kGradient}
          $size={138}
          onClick={() => {
            if (currentTrack.trackUrl) {
              window.open(
                currentTrack.trackUrl,
                '_blank',
                'noopener,noreferrer'
              );
            }
          }}
          style={{ cursor: currentTrack.trackUrl ? 'pointer' : 'default' }}
        >
          {currentTrack.coverUrl ? (
            <S.AlbumCoverImage
              src={currentTrack.coverUrl}
              alt={currentTrack.title}
            />
          ) : (
            <S.AlbumOpticalRing />
          )}
        </S.Y2KGradientCover>

        <S.TrackMeta>
          <h2>{currentTrack.title}</h2>
          <p className="artist">{currentTrack.artist}</p>
          <p className="album">{currentTrack.album}</p>

          {!isMobile && (
            <S.InScreenPlayerRow>
              <S.InScreenPlayerBtn
                type="button"
                onClick={onPrev}
                title="Voltar 3 segundos"
              >
                <BsFillSkipBackwardFill size={11} />
                <span>-3s</span>
              </S.InScreenPlayerBtn>

              <S.InScreenPlayerBtn
                type="button"
                $primary
                onClick={onPlayPause}
                title={isPlaying ? 'Pausar prévia' : 'Tocar prévia'}
              >
                {isPlaying ? (
                  <>
                    <BsPauseFill size={14} />
                    <span>PAUSE</span>
                  </>
                ) : (
                  <>
                    <BsFillPlayFill size={14} />
                    <span>PLAY</span>
                  </>
                )}
              </S.InScreenPlayerBtn>

              <S.InScreenPlayerBtn
                type="button"
                onClick={onNext}
                title="Avançar 3 segundos"
              >
                <span>+3s</span>
                <BsFillSkipForwardFill size={11} />
              </S.InScreenPlayerBtn>

              {currentTrack.trackUrl && (
                <S.InScreenPlayerBtn
                  type="button"
                  title="Abrir no Last.fm"
                  onClick={() =>
                    window.open(
                      currentTrack.trackUrl,
                      '_blank',
                      'noopener,noreferrer'
                    )
                  }
                >
                  <BsBoxArrowUpRight size={10} />
                </S.InScreenPlayerBtn>
              )}
            </S.InScreenPlayerRow>
          )}
        </S.TrackMeta>
      </S.NowPlayingGrid>

      <S.ScrubberContainer>
        <S.ScrubberBar
          onClick={handleBarClick}
          style={{ cursor: onSeekSeconds ? 'pointer' : 'default' }}
        >
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