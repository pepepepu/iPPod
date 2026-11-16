import { Html, RoundedBox } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import gsap from 'gsap';
import {
  type PointerEvent as ReactPointerEvent,
  useEffect,
  useRef,
  type WheelEvent,
} from 'react';
import {
  BsFillSkipBackwardFill,
  BsFillSkipForwardFill,
  BsPauseFill,
} from 'react-icons/bs';
import { ThemeProvider } from 'styled-components';
import { Group } from 'three';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import type { IPPodColorPreset, ScreenId } from '../../content/homeContent';
import { theme } from '../../styles/theme';
import { IPPodScreens, type PowerStatus } from '../iPPodScreens';
import * as S from './styles';

export interface IPPod3DProps {
  isMobile: boolean;
  powerStatus: PowerStatus;
  bootWink: boolean;
  colorPreset: IPPodColorPreset;
  currentScreen: ScreenId;
  selectedIndex: number;
  activeProjectIndex: number;
  trackIndex: number;
  isPlaying: boolean;
  elapsedSeconds: number;
  volume: number;
  showVolumeHud: boolean;
  statusFeedback: string | null;
  controlsRef: React.RefObject<OrbitControlsImpl | null>;
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

export function IPPod3D({
  isMobile,
  powerStatus,
  bootWink,
  colorPreset,
  currentScreen,
  selectedIndex,
  activeProjectIndex,
  trackIndex,
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
}: IPPod3DProps) {
  const ipodGroupRef = useRef<Group>(null);
  const wheelElementRef = useRef<HTMLDivElement>(null);
  const lastWheelAngleRef = useRef<number | null>(null);
  const { camera } = useThree();
  const isActive = powerStatus !== 'off';

  useEffect(() => {
    if (!ipodGroupRef.current) return;

    gsap.killTweensOf([
      ipodGroupRef.current.scale,
      ipodGroupRef.current.position,
      ipodGroupRef.current.rotation,
      camera.position,
    ]);

    if (controlsRef.current) {
      controlsRef.current.enabled = !isActive;
    }

    gsap.to(camera.position, {
      x: 0,
      y: 0,
      z: 7.6,
      duration: 0.85,
      ease: 'power3.inOut',
      onUpdate: () => {
        camera.lookAt(0, 0, 0);
        if (controlsRef.current) {
          controlsRef.current.target.set(0, 0, 0);
          controlsRef.current.update();
        }
      },
    });

    if (isMobile) {
      gsap.to(ipodGroupRef.current.scale, {
        x: 0.72,
        y: 0.72,
        z: 0.72,
        duration: 0.75,
        ease: 'power3.inOut',
      });
      gsap.to(ipodGroupRef.current.position, {
        x: 0,
        y: 0.05,
        z: 0,
        duration: 0.75,
        ease: 'power3.inOut',
      });
      gsap.to(ipodGroupRef.current.rotation, {
        x: 0,
        y: 0,
        z: 0,
        duration: 0.75,
        ease: 'power3.inOut',
      });
      return;
    }

    if (isActive) {
      gsap.to(ipodGroupRef.current.scale, {
        x: 1.55,
        y: 1.55,
        z: 1.55,
        duration: 0.85,
        ease: 'power3.inOut',
      });
      gsap.to(ipodGroupRef.current.position, {
        x: 0,
        y: -1.68,
        z: 1.15,
        duration: 0.85,
        ease: 'power3.inOut',
      });
      gsap.to(ipodGroupRef.current.rotation, {
        x: 0,
        y: 0,
        z: 0,
        duration: 0.85,
        ease: 'power3.inOut',
      });
    } else {
      gsap.to(ipodGroupRef.current.scale, {
        x: 0.76,
        y: 0.76,
        z: 0.76,
        duration: 0.85,
        ease: 'power3.inOut',
      });
      gsap.to(ipodGroupRef.current.position, {
        x: 0,
        y: 0,
        z: 0,
        duration: 0.85,
        ease: 'power3.inOut',
      });
      gsap.to(ipodGroupRef.current.rotation, {
        x: 0,
        y: 0,
        z: 0,
        duration: 0.85,
        ease: 'power3.inOut',
      });
    }
  }, [isActive, isMobile, camera, controlsRef]);

  const handleWheelScroll = (event: WheelEvent<HTMLDivElement>) => {
    if (powerStatus !== 'on') return;
    if (event.deltaY > 0) {
      onNext();
    } else if (event.deltaY < 0) {
      onPrev();
    }
  };

  const computeWheelAngle = (clientX: number, clientY: number) => {
    if (!wheelElementRef.current) return null;
    const rect = wheelElementRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    return Math.atan2(clientY - centerY, clientX - centerX) * (180 / Math.PI);
  };

  const handleWheelPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (powerStatus !== 'on') return;
    lastWheelAngleRef.current = computeWheelAngle(e.clientX, e.clientY);
  };

  const handleWheelPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (powerStatus !== 'on' || lastWheelAngleRef.current === null) return;
    if (e.buttons === 0 && e.pointerType === 'mouse') return;

    const currentAngle = computeWheelAngle(e.clientX, e.clientY);
    if (currentAngle === null) return;

    let delta = currentAngle - lastWheelAngleRef.current;
    if (delta > 180) delta -= 360;
    if (delta < -180) delta += 360;

    if (Math.abs(delta) >= 24) {
      if (delta > 0) {
        onNext();
      } else {
        onPrev();
      }
      lastWheelAngleRef.current = currentAngle;
    }
  };

  const handleWheelPointerUp = () => {
    lastWheelAngleRef.current = null;
  };

  return (
    <group ref={ipodGroupRef} scale={isMobile ? 0.72 : 0.76}>
      <RoundedBox
        args={[0.12, 0.48, 0.16]}
        radius={0.03}
        smoothness={4}
        position={[1.38, 1.45, 0.01]}
        onPointerOver={() => {
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          document.body.style.cursor = 'default';
        }}
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
        onPointerOver={() => {
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          document.body.style.cursor = 'default';
        }}
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
        onPointerOver={() => {
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          document.body.style.cursor = 'default';
        }}
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

      <Html transform distanceFactor={1.65} position={[0, 1.12, 0.18]}>
        <ThemeProvider theme={theme}>
          <IPPodScreens
            isMobile={isMobile}
            powerStatus={powerStatus}
            bootWink={bootWink}
            currentScreen={currentScreen}
            selectedIndex={selectedIndex}
            activeProjectIndex={activeProjectIndex}
            trackIndex={trackIndex}
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
            onHoverIndex={onHoverIndex}
            onNavigateScreen={onNavigateScreen}
            onOpenProjectDetail={onOpenProjectDetail}
            onExecuteProjectAction={onExecuteProjectAction}
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

      <Html transform distanceFactor={1.65} position={[0, -0.98, 0.19]}>
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
              <BsPauseFill size={18} />
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