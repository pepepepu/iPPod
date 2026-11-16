import type { TrackItem } from '../../content/homeContent';
import * as S from './styles';

export interface NowPlayingScreenProps {
  currentTrack: TrackItem;
  elapsedSeconds: number;
}

export function NowPlayingScreen({
  currentTrack,
  elapsedSeconds,
}: NowPlayingScreenProps) {
  const progressPercent = Math.min(
    100,
    (elapsedSeconds / currentTrack.duration) * 100
  );
  const remaining = Math.max(0, currentTrack.duration - elapsedSeconds);
  const isLive = Boolean(currentTrack.isLiveNow);

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const rem = secs % 60;
    return `${mins}:${rem < 10 ? '0' : ''}${rem}`;
  };

  return (
    <S.FullScreenBody>
      <S.NowPlayingGrid>
        <S.Y2KGradientCover
          $gradient={currentTrack.y2kGradient}
          $size={145}
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
          <S.ArtworkBadge>LIVE • SPOTIFY</S.ArtworkBadge>
        </S.Y2KGradientCover>

        <S.TrackMeta>
          <S.LiveStatusPill $isLive={isLive}>
            <S.LivePulseDot $isLive={isLive} />
            <span>OUVINDO AGORA • {currentTrack.number}</span>
          </S.LiveStatusPill>
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