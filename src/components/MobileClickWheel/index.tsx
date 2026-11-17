import type { PointerEvent as ReactPointerEvent, RefObject } from 'react';
import {
  BsFillPlayFill,
  BsFillSkipBackwardFill,
  BsFillSkipForwardFill,
  BsPauseFill,
  BsPower,
} from 'react-icons/bs';
import type { PlacedSticker } from '../../content/homeContent';
import { getStickerDataUrl } from '../../utils/stickerCanvas';
import type { PowerStatus } from '../ScreenArea';
import * as S from './styles';

export interface MobileClickWheelProps {
  wheelRef: RefObject<HTMLDivElement | null>;
  wheelColor: string;
  centerButtonColor: string;
  powerStatus: PowerStatus;
  isDeviceActive: boolean;
  placedStickers: PlacedSticker[];
  onTurnOnOnly: () => void;
  onMenuBack: () => void;
  onPrev: () => void;
  onNext: () => void;
  onPlayPause: () => void;
  onSelect: () => void;
  onPointerDown: (e: ReactPointerEvent<HTMLDivElement>) => void;
  onPointerMove: (e: ReactPointerEvent<HTMLDivElement>) => void;
  onPointerUp: () => void;
}

export function MobileClickWheel({
  wheelRef,
  wheelColor,
  centerButtonColor,
  powerStatus,
  isDeviceActive,
  placedStickers,
  onTurnOnOnly,
  onMenuBack,
  onPrev,
  onNext,
  onPlayPause,
  onSelect,
  onPointerDown,
  onPointerMove,
  onPointerUp,
}: MobileClickWheelProps) {
  const isOn = powerStatus === 'on';
  const wheelStickers = placedStickers.filter(
    (item) => item.position[2] >= 0 && item.position[1] < 0.15
  );

  return (
    <S.MobileWheelSection>
      {wheelStickers.map((placed) => {
        const [px, py] = placed.position;
        const dx = px;
        const dy = -(py + 0.98);
        const angle = Math.atan2(dy, dx);
        const dist3D = Math.hypot(dx, dy);
        const cos = Number(Math.cos(angle).toFixed(4));
        const sin = Number(Math.sin(angle).toFixed(4));
        const offsetPx = Math.round(
          Math.max(18, Math.min(46, 18 + (dist3D - 0.96) * 52))
        );
        const rotateDeg = Math.round(
          ((placed.rotation[2] || 0) * 180) / Math.PI
        );

        return (
          <S.MobileStickerBadge
            key={placed.instanceId}
            src={getStickerDataUrl(placed.stickerId)}
            alt={placed.stickerId}
            $cos={cos}
            $sin={sin}
            $offsetPx={offsetPx}
            $rotateDeg={rotateDeg}
            draggable={false}
          />
        );
      })}

      <S.MobileClickWheel
        ref={wheelRef}
        $wheelColor={wheelColor}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
      >
        <S.MobileWheelBtn
          type="button"
          $position="top"
          onClick={isOn ? onMenuBack : onTurnOnOnly}
        >
          MENU
        </S.MobileWheelBtn>

        <S.MobileWheelBtn
          type="button"
          $position="left"
          onClick={isOn ? onPrev : onTurnOnOnly}
        >
          <BsFillSkipBackwardFill size={18} />
        </S.MobileWheelBtn>

        <S.MobileWheelBtn
          type="button"
          $position="right"
          onClick={isOn ? onNext : onTurnOnOnly}
        >
          <BsFillSkipForwardFill size={18} />
        </S.MobileWheelBtn>

        <S.MobileWheelBtn
          type="button"
          $position="bottom"
          onClick={isOn ? onPlayPause : onTurnOnOnly}
        >
          <BsFillPlayFill size={16} />
          <BsPauseFill size={16} />
        </S.MobileWheelBtn>

        <S.MobileCenterSelectBtn
          type="button"
          $centerColor={centerButtonColor}
          $isOn={isDeviceActive}
          onClick={powerStatus === 'off' ? onTurnOnOnly : onSelect}
          aria-label={
            powerStatus === 'off' ? 'Ligar iPPod' : 'Selecionar item'
          }
        >
          {powerStatus === 'off' && <BsPower size={26} />}
        </S.MobileCenterSelectBtn>
      </S.MobileClickWheel>
    </S.MobileWheelSection>
  );
}