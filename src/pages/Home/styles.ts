import styled from 'styled-components';
import { theme } from '../../styles/theme';

export const ViewportContainer = styled.main`
  width: 100vw;
  height: 100dvh;
  background: ${theme.gradients.studioBackdrop};
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  touch-action: none;
`;

export const TopHeaderBadge = styled.header`
  position: absolute;
  top: 28px;
  left: 36px;
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: ${theme.fonts.display};
  font-size: 0.76rem;
  letter-spacing: 2px;
  color: #3a4250;
  z-index: 10;
`;

export const StatusDot = styled.span<{ $isOn: boolean }>`
  width: 9px;
  height: 9px;
  border-radius: 50%;
  flex-shrink: 0;
  background: ${({ $isOn }) => ($isOn ? '#39ff14' : '#ef4444')};
  box-shadow: 0 0 8px
    ${({ $isOn }) =>
    $isOn ? 'rgba(57, 255, 20, 0.8)' : 'rgba(239, 68, 68, 0.6)'};
`;

export const CanvasStage = styled.div<{ $isInteractive: boolean }>`
  width: 100%;
  height: 100%;
  cursor: ${({ $isInteractive }) => ($isInteractive ? 'grab' : 'default')};

  &:active {
    cursor: ${({ $isInteractive }) =>
    $isInteractive ? 'grabbing' : 'default'};
  }
`;

export const BottomRightPanel = styled.footer`
  position: absolute;
  bottom: 24px;
  right: 32px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  z-index: 10;
`;

export const ColorPickerCard = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  background: rgba(255, 255, 255, 0.76);
  backdrop-filter: blur(10px);
  padding: 8px 14px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.9);
  box-shadow: 0 8px 20px rgba(20, 24, 31, 0.1);
`;

export const ColorPickerLabel = styled.span`
  font-family: ${theme.fonts.display};
  font-size: 0.62rem;
  letter-spacing: 1.5px;
  color: #3a4250;
  text-transform: uppercase;
`;

export const SwatchList = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const ColorSwatchButton = styled.button<{
  $hex: string;
  $active: boolean;
}>`
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: ${({ $hex }) => $hex};
  border: 2px solid ${({ $active }) => ($active ? '#1362d6' : '#ffffff')};
  box-shadow: ${({ $active }) =>
    $active
      ? '0 0 0 2px rgba(19, 98, 214, 0.35)'
      : '0 2px 4px rgba(0, 0, 0, 0.25)'};
  transition: transform 0.15s ease;

  &:hover {
    transform: scale(1.15);
  }
`;

export const MobileVirtualIPPod = styled.section<{
  $bodyColor: string;
  $backplateColor: string;
}>`
  width: 100vw;
  height: 100dvh;
  background: linear-gradient(
    160deg,
    ${({ $backplateColor }) => $backplateColor} 0%,
    ${({ $bodyColor }) => $bodyColor} 38%,
    #22262b 100%
  );
  box-shadow:
    inset 0 0 0 3px rgba(255, 255, 255, 0.35),
    inset 0 12px 28px rgba(255, 255, 255, 0.22),
    inset 0 -18px 32px rgba(0, 0, 0, 0.65);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 12px 14px 20px;
  overflow: hidden;
  touch-action: none;
`;

export const MobileHardwareTopBar = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2px 4px 10px;
  flex-shrink: 0;
`;

export const MobileVolumeButtonsGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const MobileHardwareBtn = styled.button<{ $activePower?: boolean }>`
  height: 28px;
  padding: 0 11px;
  border-radius: 6px;
  background: ${({ $activePower }) =>
    $activePower
      ? 'linear-gradient(180deg, #223026 0%, #101712 100%)'
      : 'linear-gradient(180deg, #e6e9ef 0%, #9ca4b2 100%)'};
  color: ${({ $activePower }) => ($activePower ? '#39ff14' : '#14181f')};
  border: 1px solid
    ${({ $activePower }) => ($activePower ? '#39ff14' : '#6e737b')};
  box-shadow:
    0 2px 5px rgba(0, 0, 0, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.5);
  font-family: ${theme.fonts.display};
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 1px;
  display: flex;
  align-items: center;
  gap: 5px;
  touch-action: manipulation;

  &:active {
    transform: translateY(1px);
  }
`;

export const MobileStatusText = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-family: ${theme.fonts.display};
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 1.4px;
  color: #f0f4f8;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.6);
`;

export const MobileScreenBezel = styled.div`
  width: 100%;
  height: 46dvh;
  min-height: 250px;
  max-height: 410px;
  background: #121417;
  border-radius: 16px;
  padding: 6px;
  box-shadow:
    inset 0 2px 6px rgba(0, 0, 0, 0.85),
    0 2px 0 rgba(255, 255, 255, 0.28);
  flex-shrink: 0;
`;

export const MobileWheelSection = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 0;
  padding: 8px 0;
`;

export const MobileClickWheel = styled.div<{ $wheelColor: string }>`
  width: min(74vw, 38dvh);
  height: min(74vw, 38dvh);
  max-width: 290px;
  max-height: 290px;
  min-width: 210px;
  min-height: 210px;
  border-radius: 50%;
  background: radial-gradient(
    circle at 50% 45%,
    ${({ $wheelColor }) => $wheelColor} 0%,
    #101215 100%
  );
  border: 2px solid rgba(255, 255, 255, 0.14);
  box-shadow:
    0 12px 28px rgba(0, 0, 0, 0.55),
    inset 0 2px 5px rgba(255, 255, 255, 0.12),
    inset 0 -4px 8px rgba(0, 0, 0, 0.6);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  touch-action: none;
`;

export const MobileWheelBtn = styled.button<{
  $position: 'top' | 'bottom' | 'left' | 'right';
}>`
  position: absolute;
  color: #e6ebf2;
  font-family: ${theme.fonts.display};
  font-weight: 700;
  font-size: 13px;
  letter-spacing: 1.5px;
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  touch-action: manipulation;

  ${({ $position }) =>
    $position === 'top' &&
    `
    top: 8px;
    left: 50%;
    transform: translateX(-50%);
  `}

  ${({ $position }) =>
    $position === 'bottom' &&
    `
    bottom: 8px;
    left: 50%;
    transform: translateX(-50%);
  `}

  ${({ $position }) =>
    $position === 'left' &&
    `
    left: 8px;
    top: 50%;
    transform: translateY(-50%);
  `}

  ${({ $position }) =>
    $position === 'right' &&
    `
    right: 8px;
    top: 50%;
    transform: translateY(-50%);
  `}

  &:active {
    color: #00f0ff;
  }
`;

export const MobileCenterSelectBtn = styled.button<{ $centerColor: string }>`
  width: 36%;
  height: 36%;
  border-radius: 50%;
  background: radial-gradient(
    circle at 35% 30%,
    #6e737b 0%,
    ${({ $centerColor }) => $centerColor} 60%,
    #25282c 100%
  );
  border: 1.5px solid rgba(255, 255, 255, 0.25);
  box-shadow:
    inset 0 2px 3px rgba(255, 255, 255, 0.35),
    0 4px 10px rgba(0, 0, 0, 0.5);
  touch-action: manipulation;

  &:active {
    transform: scale(0.96);
  }
`;