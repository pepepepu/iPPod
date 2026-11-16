import { useThree } from '@react-three/fiber';
import gsap from 'gsap';
import {
  useEffect,
  useRef,
  type PointerEvent as ReactPointerEvent,
  type RefObject,
  type WheelEvent,
} from 'react';
import type { Group } from 'three';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import type { PowerStatus } from '../components/ScreenArea';

export interface UseDeviceBodyParams {
  powerStatus: PowerStatus;
  controlsRef: RefObject<OrbitControlsImpl | null>;
  onNext: () => void;
  onPrev: () => void;
}

export function useDeviceBody({
  powerStatus,
  controlsRef,
  onNext,
  onPrev,
}: UseDeviceBodyParams) {
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
  }, [isActive, camera, controlsRef]);

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

  const handlePointerOver = () => {
    document.body.style.cursor = 'pointer';
  };

  const handlePointerOut = () => {
    document.body.style.cursor = 'default';
  };

  return {
    ipodGroupRef,
    wheelElementRef,
    isActive,
    handleWheelScroll,
    handleWheelPointerDown,
    handleWheelPointerMove,
    handleWheelPointerUp,
    handlePointerOver,
    handlePointerOut,
  };
}