import type { PointerEvent as ReactPointerEvent, RefObject } from 'react';
import {
  BsFillPlayFill,
  BsFillSkipBackwardFill,
  BsFillSkipForwardFill,
  BsPauseFill,
  BsPower,
} from 'react-icons/bs';
import type { PowerStatus } from '../ScreenArea';
import * as S from './styles';

export interface MobileClickWheelProps {
  wheelRef: RefObject<HTMLDivElement | null>;
  wheelColor: string;
  centerButtonColor: string;
  powerStatus: PowerStatus;
  isDeviceActive: boolean;
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

  return (
    <S.MobileWheelSection>
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