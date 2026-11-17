import { Html, RoundedBox } from '@react-three/drei';
import { useMemo, type RefObject } from 'react';
import {
  BsFillPlayFill,
  BsFillSkipBackwardFill,
  BsFillSkipForwardFill,
  BsPauseFill,
} from 'react-icons/bs';
import { ThemeProvider } from 'styled-components';
import {
  BufferAttribute,
  BufferGeometry,
  FrontSide,
} from 'three';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import {
  homeContent,
  type IPPodColorPreset,
  type PendingStickerDrop,
  type PlacedSticker,
  type ScreenId,
  type StickerPreset,
  type TrackItem,
} from '../../content/homeContent';
import { useDeviceBody } from '../../hooks/useDeviceBody';
import { theme } from '../../styles/theme';
import {
  getBackplateEngravingTextures,
  getSticker3DTextures,
} from '../../utils/stickerCanvas';
import { ScreenArea, type PowerStatus } from '../ScreenArea';
import * as S from './styles';

interface FoldedStickerMeshProps {
  placed: PlacedSticker;
  preset: StickerPreset;
}

function FoldedStickerMesh({ placed, preset }: FoldedStickerMeshProps) {
  const { map, bumpMap, iridescenceMap } = useMemo(
    () => getSticker3DTextures(preset.id),
    [preset.id]
  );

  const geometry = useMemo(() => {
    const segs = 32;
    const geom = new BufferGeometry();
    const numVerts = (segs + 1) * (segs + 1);
    const positions = new Float32Array(numVerts * 3);
    const uvs = new Float32Array(numVerts * 2);
    const indices: number[] = [];

    const [cx, cy, cz] = placed.position;
    const isFront = cz >= 0;
    const tilt = placed.rotation[2] || 0;
    const cosT = Math.cos(tilt);
    const sinT = Math.sin(tilt);

    const w = preset.width3D * placed.scale;
    const h = preset.height3D * placed.scale;

    const halfBodyW = 1.35;
    const halfBodyH = 2.25;
    const edgeRadius = 0.14;
    const flatW = halfBodyW - edgeRadius;
    const flatH = halfBodyH - edgeRadius;

    let ptr = 0;
    let uvPtr = 0;

    for (let iy = 0; iy <= segs; iy++) {
      const vRatio = iy / segs;
      const localY = (vRatio - 0.5) * h;

      for (let ix = 0; ix <= segs; ix++) {
        const uRatio = ix / segs;
        const localX = (uRatio - 0.5) * w;

        const orientedX = isFront ? localX : -localX;
        const dx = orientedX * cosT - localY * sinT;
        const dy = orientedX * sinT + localY * cosT;

        const sx = cx + dx;
        const sy = cy + dy;

        let px = sx;
        let py = sy;
        let dropX = 0;
        let dropY = 0;

        if (Math.abs(sx) > flatW) {
          const overX = Math.abs(sx) - flatW;
          const angleX = Math.min(overX / edgeRadius, Math.PI / 2);
          const extraSideX = Math.max(0, overX - (Math.PI / 2) * edgeRadius);
          px = Math.sign(sx) * (flatW + Math.sin(angleX) * edgeRadius);
          dropX = (1 - Math.cos(angleX)) * edgeRadius + extraSideX;
        }

        if (Math.abs(sy) > flatH) {
          const overY = Math.abs(sy) - flatH;
          const angleY = Math.min(overY / edgeRadius, Math.PI / 2);
          const extraSideY = Math.max(0, overY - (Math.PI / 2) * edgeRadius);
          py = Math.sign(sy) * (flatH + Math.sin(angleY) * edgeRadius);
          dropY = (1 - Math.cos(angleY)) * edgeRadius + extraSideY;
        }

        const totalDrop = Math.min(0.13, dropX + dropY);

        let pz = isFront ? 0.142 - totalDrop : -0.144 + totalDrop;

        if (isFront && totalDrop < 0.02) {
          const dxBezel = Math.max(0, Math.abs(px) - 1.14);
          const dyBezel = Math.max(0, 0.26 - py, py - 1.98);
          const distOutsideBezel = Math.hypot(dxBezel, dyBezel);

          if (distOutsideBezel < 0.04) {
            const bezelFactor = 1 - distOutsideBezel / 0.04;
            pz = 0.142 + bezelFactor * 0.02;
          }

          const insideLcdOpening =
            Math.abs(px) < 1.015 && py > 0.325 && py < 1.915;

          if (insideLcdOpening) {
            const dLeft = Math.abs(px - -1.015);
            const dRight = Math.abs(1.015 - px);
            const dBottom = Math.abs(py - 0.325);
            const dTop = Math.abs(1.915 - py);
            const minEdgeDist = Math.min(dLeft, dRight, dBottom, dTop);

            if (minEdgeDist > 0.018) {
              pz = 0.135;
            } else {
              pz = 0.162 - (minEdgeDist / 0.018) * 0.024;
            }
          }
        }

        positions[ptr++] = px;
        positions[ptr++] = py;
        positions[ptr++] = pz;

        uvs[uvPtr++] = uRatio;
        uvs[uvPtr++] = vRatio;
      }
    }

    for (let iy = 0; iy < segs; iy++) {
      for (let ix = 0; ix < segs; ix++) {
        const a = iy * (segs + 1) + ix;
        const b = iy * (segs + 1) + (ix + 1);
        const c = (iy + 1) * (segs + 1) + ix;
        const d = (iy + 1) * (segs + 1) + (ix + 1);

        indices.push(a, b, d);
        indices.push(a, d, c);
      }
    }

    geom.setAttribute('position', new BufferAttribute(positions, 3));
    geom.setAttribute('uv', new BufferAttribute(uvs, 2));
    geom.setIndex(indices);
    geom.computeVertexNormals();
    return geom;
  }, [placed, preset]);

  return (
    <mesh geometry={geometry}>
      <meshPhysicalMaterial
        map={map}
        bumpMap={bumpMap}
        bumpScale={0.004}
        iridescence={0.95}
        iridescenceIOR={1.35}
        iridescenceThicknessRange={[140, 420]}
        iridescenceMap={iridescenceMap}
        clearcoat={1}
        clearcoatRoughness={0.12}
        roughness={0.22}
        metalness={0.25}
        transparent
        alphaTest={0.08}
        side={FrontSide}
        polygonOffset
        polygonOffsetFactor={-4}
      />
    </mesh>
  );
}

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
  placedStickers: PlacedSticker[];
  pendingDrop: PendingStickerDrop | null;
  controlsRef: RefObject<OrbitControlsImpl | null>;
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
  placedStickers,
  pendingDrop,
  controlsRef,
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
}: DeviceBodyProps) {
  const {
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
  } = useDeviceBody({
    powerStatus,
    controlsRef,
    pendingDrop,
    onPlaceSticker,
    onConsumeDrop,
    onNext,
    onPrev,
  });

  const backplateRelief = useMemo(() => getBackplateEngravingTextures(), []);

  return (
    <group ref={ipodGroupRef} scale={0.76}>
      <RoundedBox
        args={[0.12, 0.48, 0.16]}
        radius={0.03}
        smoothness={4}
        position={[1.36, 1.45, 0]}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={(e) => {
          e.stopPropagation();
          onTogglePower();
        }}
      >
        <meshStandardMaterial
          color={isActive ? '#39ff14' : colorPreset.bodyColor}
          metalness={0.82}
          roughness={0.28}
        />
      </RoundedBox>

      <RoundedBox
        args={[0.12, 0.36, 0.16]}
        radius={0.03}
        smoothness={4}
        position={[-1.36, 1.56, 0]}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={(e) => {
          e.stopPropagation();
          onVolumeUp();
        }}
      >
        <meshStandardMaterial
          color={colorPreset.bodyColor}
          metalness={0.82}
          roughness={0.28}
        />
      </RoundedBox>

      <RoundedBox
        args={[0.12, 0.36, 0.16]}
        radius={0.03}
        smoothness={4}
        position={[-1.36, 1.12, 0]}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={(e) => {
          e.stopPropagation();
          onVolumeDown();
        }}
      >
        <meshStandardMaterial
          color={colorPreset.bodyColor}
          metalness={0.82}
          roughness={0.28}
        />
      </RoundedBox>

      <RoundedBox
        ref={chassisMeshRef}
        args={[2.7, 4.5, 0.28]}
        radius={0.18}
        smoothness={6}
        position={[0, 0, 0]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial
          color={colorPreset.bodyColor}
          metalness={0.82}
          roughness={0.26}
        />
      </RoundedBox>

      <mesh position={[0, 0, -0.141]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[2.3, 3.8]} />
        <meshStandardMaterial
          map={backplateRelief.map}
          bumpMap={backplateRelief.bumpMap}
          bumpScale={0.016}
          metalness={0.92}
          roughness={0.18}
          transparent
          polygonOffset
          polygonOffsetFactor={-1}
        />
      </mesh>

      <RoundedBox
        ref={bezelMeshRef}
        args={[2.32, 1.76, 0.04]}
        radius={0.06}
        smoothness={4}
        position={[0, 1.12, 0.14]}
      >
        <meshStandardMaterial
          color="#121417"
          metalness={0.5}
          roughness={0.4}
        />
      </RoundedBox>

      {placedStickers.map((placed) => {
        const preset = homeContent.stickers.find(
          (item) => item.id === placed.stickerId
        );
        if (!preset) return null;

        return (
          <FoldedStickerMesh
            key={placed.instanceId}
            placed={placed}
            preset={preset}
          />
        );
      })}

      <Html
        center
        transform
        distanceFactor={1.65}
        position={[0, 1.12, 0.166]}
        style={{
          display: isFrontFacing ? 'block' : 'none',
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
        }}
      >
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
            onSeekSeconds={onSeekSeconds}
            onHoverIndex={onHoverIndex}
            onNavigateScreen={onNavigateScreen}
            onOpenProjectDetail={onOpenProjectDetail}
            onExecuteProjectAction={onExecuteProjectAction}
            tracks={[]}
            trackIndex={0}
          />
        </ThemeProvider>
      </Html>

      <mesh position={[0, -0.98, 0.135]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.82, 0.82, 0.03, 64]} />
        <meshStandardMaterial
          color={colorPreset.wheelColor}
          metalness={0.25}
          roughness={0.65}
        />
      </mesh>

      <mesh position={[0, -0.98, 0.145]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.29, 0.29, 0.035, 48]} />
        <meshStandardMaterial
          color={colorPreset.centerButtonColor}
          metalness={0.85}
          roughness={0.25}
        />
      </mesh>

      <Html
        center
        transform
        distanceFactor={1.65}
        position={[0, -0.98, 0.17]}
        style={{
          display: isFrontFacing ? 'block' : 'none',
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
        }}
      >
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