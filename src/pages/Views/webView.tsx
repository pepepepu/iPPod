import type { RefObject } from 'react';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import { ColorPicker } from '../../components/ColorPicker';
import type { PowerStatus } from '../../components/ScreenArea';
import { StatusHeader } from '../../components/StatusHeader';
import { StickerAlbum } from '../../components/StickerAlbum';
import { StudioStage3D } from '../../components/StudioStage3D';
import type {
  IPPodColorPreset,
  PendingStickerDrop,
  PlacedSticker,
  ScreenId,
  TrackItem,
} from '../../content/homeContent';
import * as S from '../Home/styles';

export interface WebViewProps {
  controlsRef: RefObject<OrbitControlsImpl | null>;
  isDeviceActive: boolean;
  powerStatus: PowerStatus;
  colorPreset: IPPodColorPreset;
  placedStickers: PlacedSticker[];
  pendingDrop: PendingStickerDrop | null;
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
  onDropSticker: (drop: PendingStickerDrop) => void;
  onPlaceSticker: (sticker: PlacedSticker) => void;
  onConsumeDrop: () => void;
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
  placedStickers,
  pendingDrop,
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
  onDropSticker,
  onPlaceSticker,
  onConsumeDrop,
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
        placedStickers={placedStickers}
        pendingDrop={pendingDrop}
        onPlaceSticker={onPlaceSticker}
        onConsumeDrop={onConsumeDrop}
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

      <StickerAlbum
        placedStickers={placedStickers}
        onDropSticker={onDropSticker}
      />

      <ColorPicker
        activeColorId={colorPreset.id}
        onSelectColor={onSelectColor}
      />
    </S.ViewportContainer>
  );
}