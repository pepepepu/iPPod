import type { PointerEvent as ReactPointerEvent, RefObject } from 'react';
import { MobileClickWheel } from '../../components/MobileClickWheel';
import { ScreenArea, type PowerStatus } from '../../components/ScreenArea';
import type {
  IPPodColorPreset,
  PlacedSticker,
  ScreenId,
  TrackItem,
} from '../../content/homeContent';
import { getStickerDataUrl } from '../../utils/stickerCanvas';
import * as S from '../Home/styles';

export interface MobileViewProps {
  mobileWheelRef: RefObject<HTMLDivElement | null>;
  powerStatus: PowerStatus;
  isDeviceActive: boolean;
  colorPreset: IPPodColorPreset;
  placedStickers: PlacedSticker[];
  currentScreen: ScreenId;
  selectedIndex: number;
  activeProjectIndex: number;
  currentTrack: TrackItem;
  isPlaying: boolean;
  elapsedSeconds: number;
  volume: number;
  showVolumeHud: boolean;
  statusFeedback: string | null;
  onTurnOnOnly: () => void;
  onPrev: () => void;
  onNext: () => void;
  onSelect: () => void;
  onMenuBack: () => void;
  onPlayPause: () => void;
  onSeekSeconds: (seconds: number) => void;
  onHoverIndex: (idx: number) => void;
  onNavigateScreen: (screen: ScreenId, idx?: number) => void;
  onOpenProjectDetail: (projectIdx: number) => void;
  onExecuteProjectAction: (actionIdx: number) => void;
  onWheelPointerDown: (e: ReactPointerEvent<HTMLDivElement>) => void;
  onWheelPointerMove: (e: ReactPointerEvent<HTMLDivElement>) => void;
  onWheelPointerUp: () => void;
}

export function MobileView({
  mobileWheelRef,
  powerStatus,
  isDeviceActive,
  colorPreset,
  placedStickers,
  currentScreen,
  selectedIndex,
  activeProjectIndex,
  currentTrack,
  isPlaying,
  elapsedSeconds,
  volume,
  showVolumeHud,
  statusFeedback,
  onTurnOnOnly,
  onPrev,
  onNext,
  onSelect,
  onMenuBack,
  onPlayPause,
  onSeekSeconds,
  onHoverIndex,
  onNavigateScreen,
  onOpenProjectDetail,
  onExecuteProjectAction,
  onWheelPointerDown,
  onWheelPointerMove,
  onWheelPointerUp,
}: MobileViewProps) {
  const bezelStickers = placedStickers.filter(
    (item) => item.position[2] >= 0 && item.position[1] >= 0.15
  );

  return (
    <S.MobileVirtualIPPod
      $bodyColor={colorPreset.bodyColor}
      $backplateColor={colorPreset.backplateColor}
    >
      <S.MobileScreenBezel>
        {bezelStickers.map((placed) => {
          const [px, py] = placed.position;
          const leftPercent = Number(
            Math.max(-2, Math.min(102, ((px + 1.18) / 2.36) * 100)).toFixed(2)
          );
          const topPercent = Number(
            Math.max(-2, Math.min(102, ((2.08 - py) / 1.88) * 100)).toFixed(2)
          );
          const rotateDeg = Math.round(
            ((placed.rotation[2] || 0) * 180) / Math.PI
          );

          return (
            <S.MobileBezelStickerBadge
              key={placed.instanceId}
              src={getStickerDataUrl(placed.stickerId)}
              alt={placed.stickerId}
              $leftPercent={leftPercent}
              $topPercent={topPercent}
              $rotateDeg={rotateDeg}
              draggable={false}
            />
          );
        })}

        <S.MobileScreenInnerWrap>
          <ScreenArea
            isMobile
            powerStatus={powerStatus}
            currentScreen={currentScreen}
            selectedIndex={selectedIndex}
            activeProjectIndex={activeProjectIndex}
            currentTrack={currentTrack}
            isPlaying={isPlaying}
            elapsedSeconds={elapsedSeconds}
            volume={volume}
            showVolumeHud={showVolumeHud}
            statusFeedback={statusFeedback}
            onTogglePower={onTurnOnOnly}
            onPrev={onPrev}
            onNext={onNext}
            onSelect={onSelect}
            onMenuBack={onMenuBack}
            onPlayPause={onPlayPause}
            onSeekSeconds={onSeekSeconds}
            onHoverIndex={onHoverIndex}
            onNavigateScreen={onNavigateScreen}
            onOpenProjectDetail={onOpenProjectDetail}
            onExecuteProjectAction={onExecuteProjectAction}
            tracks={[]}
            trackIndex={0}
          />
        </S.MobileScreenInnerWrap>
      </S.MobileScreenBezel>

      <MobileClickWheel
        wheelRef={mobileWheelRef}
        wheelColor={colorPreset.wheelColor}
        centerButtonColor={colorPreset.centerButtonColor}
        powerStatus={powerStatus}
        isDeviceActive={isDeviceActive}
        placedStickers={placedStickers}
        onTurnOnOnly={onTurnOnOnly}
        onMenuBack={onMenuBack}
        onPrev={onPrev}
        onNext={onNext}
        onPlayPause={onPlayPause}
        onSelect={onSelect}
        onPointerDown={onWheelPointerDown}
        onPointerMove={onWheelPointerMove}
        onPointerUp={onWheelPointerUp}
      />
    </S.MobileVirtualIPPod>
  );
}