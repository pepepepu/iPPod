import {
  ContactShadows,
  Environment,
  Float,
  OrbitControls,
} from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Suspense, type RefObject } from 'react';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import type {
  IPPodColorPreset,
  PendingStickerDrop,
  PlacedSticker,
  ScreenId,
  TrackItem,
} from '../../content/homeContent';
import { DeviceBody } from '../DeviceBody';
import type { PowerStatus } from '../ScreenArea';
import * as S from './styles';

export interface StudioStage3DProps {
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
  placedStickers: PlacedSticker[];
  pendingDrop: PendingStickerDrop | null;
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
  onSeekSeconds: (seconds: number) => void;
  onHoverIndex: (idx: number) => void;
  onNavigateScreen: (screen: ScreenId, idx?: number) => void;
  onOpenProjectDetail: (projectIdx: number) => void;
  onExecuteProjectAction: (actionIdx: number) => void;
}

export function StudioStage3D({
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
  placedStickers,
  pendingDrop,
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
  onSeekSeconds,
  onHoverIndex,
  onNavigateScreen,
  onOpenProjectDetail,
  onExecuteProjectAction,
}: StudioStage3DProps) {
  return (
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
            <DeviceBody
              isMobile={false}
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
              controlsRef={controlsRef}
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
              onSeekSeconds={onSeekSeconds}
              onHoverIndex={onHoverIndex}
              onNavigateScreen={onNavigateScreen}
              onOpenProjectDetail={onOpenProjectDetail}
              onExecuteProjectAction={onExecuteProjectAction}
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
          minPolarAngle={Math.PI / 2 - 0.45}
          maxPolarAngle={Math.PI / 2 + 0.45}
        />
      </Canvas>
    </S.CanvasStage>
  );
}