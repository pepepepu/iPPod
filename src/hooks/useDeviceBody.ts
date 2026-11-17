import { useFrame, useThree } from '@react-three/fiber';
import gsap from 'gsap';
import {
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type RefObject,
  type WheelEvent,
} from 'react';
import { Raycaster, Vector2, type Group, type Mesh } from 'three';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import type { PowerStatus } from '../components/ScreenArea';
import type {
  PendingStickerDrop,
  PlacedSticker,
} from '../content/homeContent';

export interface UseDeviceBodyParams {
  powerStatus: PowerStatus;
  controlsRef: RefObject<OrbitControlsImpl | null>;
  pendingDrop: PendingStickerDrop | null;
  onPlaceSticker: (sticker: PlacedSticker) => void;
  onConsumeDrop: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export function useDeviceBody({
  powerStatus,
  controlsRef,
  pendingDrop,
  onPlaceSticker,
  onConsumeDrop,
  onNext,
  onPrev,
}: UseDeviceBodyParams) {
  const ipodGroupRef = useRef<Group>(null);
  const chassisMeshRef = useRef<Mesh>(null);
  const bezelMeshRef = useRef<Mesh>(null);
  const wheelElementRef = useRef<HTMLDivElement>(null);
  const lastWheelAngleRef = useRef<number | null>(null);
  const [isFrontFacing, setIsFrontFacing] = useState(true);
  const { camera, gl } = useThree();
  const isActive = powerStatus !== 'off';

  useFrame(() => {
    if (!ipodGroupRef.current) return;
    const localCam = ipodGroupRef.current.worldToLocal(
      camera.position.clone()
    );
    const facingFront = localCam.z > 0.05;
    if (facingFront !== isFrontFacing) {
      setIsFrontFacing(facingFront);
    }
  });

  useEffect(() => {
    if (!pendingDrop) return;

    if (
      ipodGroupRef.current &&
      chassisMeshRef.current &&
      bezelMeshRef.current
    ) {
      const rect = gl.domElement.getBoundingClientRect();
      const ndcX =
        ((pendingDrop.clientX - rect.left) / rect.width) * 2 - 1;
      const ndcY =
        -((pendingDrop.clientY - rect.top) / rect.height) * 2 + 1;

      const raycaster = new Raycaster();
      raycaster.setFromCamera(new Vector2(ndcX, ndcY), camera);

      const targets: Mesh[] = [
        bezelMeshRef.current,
        chassisMeshRef.current,
      ];
      const intersects = raycaster.intersectObjects(targets, false);

      if (intersects.length > 0) {
        const hit = intersects[0];
        const localPoint = ipodGroupRef.current.worldToLocal(
          hit.point.clone()
        );
        const localCam = ipodGroupRef.current.worldToLocal(
          camera.position.clone()
        );

        const isFrontSide = localCam.z >= 0 && localPoint.z >= -0.02;

        let blocked = false;
        if (isFrontSide) {
          const insideLcdGlass =
            Math.abs(localPoint.x) < 1.01 &&
            localPoint.y > 0.33 &&
            localPoint.y < 1.91;
          const distFromWheel = Math.hypot(
            localPoint.x,
            localPoint.y + 0.98
          );
          const insideWheel = distFromWheel < 0.84;

          if (insideLcdGlass || insideWheel) {
            blocked = true;
          }
        }

        if (!blocked) {
          const randomTilt = (Math.random() - 0.5) * 0.24;
          onPlaceSticker({
            instanceId: `stk-${Date.now()}-${Math.random()
              .toString(36)
              .slice(2, 6)}`,
            stickerId: pendingDrop.stickerId,
            position: [
              localPoint.x,
              localPoint.y,
              isFrontSide ? 0.142 : -0.144,
            ],
            rotation: [0, isFrontSide ? 0 : Math.PI, randomTilt],
            scale: 1,
          });
        }
      }
    }

    onConsumeDrop();
  }, [pendingDrop, camera, gl, onPlaceSticker, onConsumeDrop]);

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
    chassisMeshRef,
    bezelMeshRef,
    wheelElementRef,
    isActive,
    isFrontFacing,
    handleWheelScroll,
    handleWheelPointerDown,
    handleWheelPointerMove,
    handleWheelPointerUp,
    handlePointerOver,
    handlePointerOut,
  };
}