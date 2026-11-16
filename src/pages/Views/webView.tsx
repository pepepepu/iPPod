import type { RefObject } from 'react';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import { ColorPicker } from '../../components/ColorPicker';
import type { PowerStatus } from '../../components/ScreenArea';
import { StatusHeader } from '../../components/StatusHeader';
import { StudioStage3D } from '../../components/StudioStage3D';
import type {
  IPPodColorPreset,
  ScreenId,
  TrackItem,
} from '../../content/homeContent';
import * as S from '../Home/styles';

export interface WebViewProps {
  controlsRef: RefObject<OrbitControlsImpl | null>;
  isDeviceActive: boolean;
  powerStatus: PowerStatus;
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
  onSelectColor: (preset: IPPodColorPreset) => void;
  onTogglePower: () => void;
  onVolumeUp: () => void;
  onVolumeDown: () => void;
  onNext: () => void;
  onPrev: () => void;
  onSelect: () => void;
  onMenuBack: () => void;
  onPlayPause: () => void;
  onHoverIndex: (idx: number) => void;
  onNavigateScreen: (screen: ScreenId, idx?: number) => void;
  onOpenProjectDetail: (projectIdx: number) => void;
  onExecuteProjectAction: (actionIdx: number) => void;
}

export function WebView({
  controlsRef,
  isDeviceActive,
  powerStatus,
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
  onSelectColor,
  onTogglePower,
  onVolumeUp,
  onVolumeDown,
  onNext,
  onPrev,
  onSelect,
  onMenuBack,
  onPlayPause,
  onHoverIndex,
  onNavigateScreen,
  onOpenProjectDetail,
  onExecuteProjectAction,
}: WebViewProps) {
  return (
    <S.ViewportContainer>
      <StatusHeader
        isDeviceActive={isDeviceActive}
        colorName={colorPreset.name}
      />

      <StudioStage3D
        controlsRef={controlsRef}
        isDeviceActive={isDeviceActive}
        powerStatus={powerStatus}
        colorPreset={colorPreset}
        currentScreen={currentScreen}
        selectedIndex={selectedIndex}
        activeProjectIndex={activeProjectIndex}
        currentTrack={currentTrack}
        isPlaying={isPlaying}
        elapsedSeconds={elapsedSeconds}
        volume={volume}
        showVolumeHud={showVolumeHud}
        statusFeedback={statusFeedback}
        onTogglePower={onTogglePower}
        onVolumeUp={onVolumeUp}
        onVolumeDown={onVolumeDown}
        onNext={onNext}
        onPrev={onPrev}
        onSelect={onSelect}
        onMenuBack={onMenuBack}
        onPlayPause={onPlayPause}
        onHoverIndex={onHoverIndex}
        onNavigateScreen={onNavigateScreen}
        onOpenProjectDetail={onOpenProjectDetail}
        onExecuteProjectAction={onExecuteProjectAction}
      />

      <ColorPicker
        activeColorId={colorPreset.id}
        onSelectColor={onSelectColor}
      />
    </S.ViewportContainer>
  );
}