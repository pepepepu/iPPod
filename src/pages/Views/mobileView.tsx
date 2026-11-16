import type { PointerEvent as ReactPointerEvent, RefObject } from 'react';
import { MobileClickWheel } from '../../components/MobileClickWheel';
import { ScreenArea, type PowerStatus } from '../../components/ScreenArea';
import type {
  IPPodColorPreset,
  ScreenId,
  TrackItem,
} from '../../content/homeContent';
import * as S from '../Home/styles';

export interface MobileViewProps {
  mobileWheelRef: RefObject<HTMLDivElement | null>;
  powerStatus: PowerStatus;
  isDeviceActive: boolean;
  colorPreset: IPPodColorPreset;
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
  onHoverIndex,
  onNavigateScreen,
  onOpenProjectDetail,
  onExecuteProjectAction,
  onWheelPointerDown,
  onWheelPointerMove,
  onWheelPointerUp,
}: MobileViewProps) {
  return (
    <S.MobileVirtualIPPod
      $bodyColor={colorPreset.bodyColor}
      $backplateColor={colorPreset.backplateColor}
    >
      <S.MobileScreenBezel>
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
          onHoverIndex={onHoverIndex}
          onNavigateScreen={onNavigateScreen}
          onOpenProjectDetail={onOpenProjectDetail}
          onExecuteProjectAction={onExecuteProjectAction}
          tracks={[]}
          trackIndex={0}
        />
      </S.MobileScreenBezel>

      <MobileClickWheel
        wheelRef={mobileWheelRef}
        wheelColor={colorPreset.wheelColor}
        centerButtonColor={colorPreset.centerButtonColor}
        powerStatus={powerStatus}
        isDeviceActive={isDeviceActive}
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