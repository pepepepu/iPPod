import { Html, RoundedBox } from '@react-three/drei';
import type { RefObject } from 'react';
import {
  BsFillPlayFill,
  BsFillSkipBackwardFill,
  BsFillSkipForwardFill,
  BsPauseFill,
} from 'react-icons/bs';
import { ThemeProvider } from 'styled-components';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import type {
  IPPodColorPreset,
  ScreenId,
  TrackItem,
} from '../../content/homeContent';
import { useDeviceBody } from '../../hooks/useDeviceBody';
import { theme } from '../../styles/theme';
import { ScreenArea, type PowerStatus } from '../ScreenArea';
import * as S from './styles';

export interface DeviceBodyProps {
  isMobile: boolean;
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
  controlsRef: RefObject<OrbitControlsImpl | null>;
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

export function DeviceBody({
  isMobile,
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
  controlsRef,
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
}: DeviceBodyProps) {
  const {
    ipodGroupRef,
    wheelElementRef,
    isActive,
    handleWheelScroll,
    handleWheelPointerDown,
    handleWheelPointerMove,
    handleWheelPointerUp,
    handlePointerOver,
    handlePointerOut,
  } = useDeviceBody({
    powerStatus,
    controlsRef,
    onNext,
    onPrev,
  });

  return (
    <group ref={ipodGroupRef} scale={0.76}>
      <RoundedBox
        args={[0.12, 0.48, 0.16]}
        radius={0.03}
        smoothness={4}
        position={[1.38, 1.45, 0.01]}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={(e) => {
          e.stopPropagation();
          onTogglePower();
        }}
      >
        <meshStandardMaterial
          color={isActive ? '#39ff14' : colorPreset.backplateColor}
          metalness={0.9}
          roughness={0.2}
        />
      </RoundedBox>

      <RoundedBox
        args={[0.12, 0.36, 0.16]}
        radius={0.03}
        smoothness={4}
        position={[-1.38, 1.56, 0.01]}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={(e) => {
          e.stopPropagation();
          onVolumeUp();
        }}
      >
        <meshStandardMaterial
          color={colorPreset.backplateColor}
          metalness={0.92}
          roughness={0.18}
        />
      </RoundedBox>

      <RoundedBox
        args={[0.12, 0.36, 0.16]}
        radius={0.03}
        smoothness={4}
        position={[-1.38, 1.12, 0.01]}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={(e) => {
          e.stopPropagation();
          onVolumeDown();
        }}
      >
        <meshStandardMaterial
          color={colorPreset.backplateColor}
          metalness={0.92}
          roughness={0.18}
        />
      </RoundedBox>

      <RoundedBox
        args={[2.75, 4.55, 0.28]}
        radius={0.22}
        smoothness={6}
        position={[0, 0, -0.03]}
      >
        <meshStandardMaterial
          color={colorPreset.backplateColor}
          metalness={0.95}
          roughness={0.12}
        />
      </RoundedBox>

      <RoundedBox
        args={[2.7, 4.5, 0.28]}
        radius={0.2}
        smoothness={6}
        position={[0, 0, 0.02]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial
          color={colorPreset.bodyColor}
          metalness={0.82}
          roughness={0.28}
        />
      </RoundedBox>

      <RoundedBox
        args={[2.32, 1.76, 0.04]}
        radius={0.06}
        smoothness={4}
        position={[0, 1.12, 0.15]}
      >
        <meshStandardMaterial
          color="#121417"
          metalness={0.5}
          roughness={0.4}
        />
      </RoundedBox>

      <Html center transform distanceFactor={1.65} position={[0, 1.12, 0.18]}>
        <ThemeProvider theme={theme}>
          <ScreenArea
            isMobile={isMobile}
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
            onTogglePower={onTogglePower}
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
        </ThemeProvider>
      </Html>

      <mesh position={[0, -0.98, 0.155]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.82, 0.82, 0.03, 64]} />
        <meshStandardMaterial
          color={colorPreset.wheelColor}
          metalness={0.25}
          roughness={0.65}
        />
      </mesh>

      <mesh position={[0, -0.98, 0.165]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.29, 0.29, 0.035, 48]} />
        <meshStandardMaterial
          color={colorPreset.centerButtonColor}
          metalness={0.85}
          roughness={0.25}
        />
      </mesh>

      <Html center transform distanceFactor={1.65} position={[0, -0.98, 0.19]}>
        <ThemeProvider theme={theme}>
          <S.WheelOverlay
            ref={wheelElementRef}
            onWheel={handleWheelScroll}
            onPointerDown={handleWheelPointerDown}
            onPointerMove={handleWheelPointerMove}
            onPointerUp={handleWheelPointerUp}
            onPointerLeave={handleWheelPointerUp}
          >
            <S.WheelButton
              type="button"
              $position="top"
              onClick={powerStatus === 'on' ? onMenuBack : onTogglePower}
            >
              MENU
            </S.WheelButton>

            <S.WheelButton
              type="button"
              $position="left"
              onClick={powerStatus === 'on' ? onPrev : onTogglePower}
            >
              <BsFillSkipBackwardFill size={16} />
            </S.WheelButton>

            <S.WheelButton
              type="button"
              $position="right"
              onClick={powerStatus === 'on' ? onNext : onTogglePower}
            >
              <BsFillSkipForwardFill size={16} />
            </S.WheelButton>

            <S.WheelButton
              type="button"
              $position="bottom"
              onClick={powerStatus === 'on' ? onPlayPause : onTogglePower}
            >
              <BsFillPlayFill size={15} />
              <BsPauseFill size={15} />
            </S.WheelButton>

            <S.CenterSelectButton
              type="button"
              onClick={powerStatus === 'on' ? onSelect : onTogglePower}
              aria-label="Selecionar no iPPod"
            />
          </S.WheelOverlay>
        </ThemeProvider>
      </Html>
    </group>
  );
}