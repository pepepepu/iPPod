import styled from 'styled-components';
import { theme } from '../../styles/theme';

export const MobileWheelSection = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 0;
  padding: 8px 0;
`;

export const MobileClickWheel = styled.div<{ $wheelColor: string }>`
  width: min(76vw, 40dvh);
  height: min(76vw, 40dvh);
  max-width: 300px;
  max-height: 300px;
  min-width: 215px;
  min-height: 215px;
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

export const MobileCenterSelectBtn = styled.button<{
  $centerColor: string;
  $isOn: boolean;
}>`
  width: 36%;
  height: 36%;
  border-radius: 50%;
  background: radial-gradient(
    circle at 35% 30%,
    #6e737b 0%,
    ${({ $centerColor }) => $centerColor} 60%,
    #25282c 100%
  );
  border: 1.5px solid
    ${({ $isOn }) =>
    $isOn ? 'rgba(57, 255, 20, 0.55)' : 'rgba(255, 255, 255, 0.25)'};
  box-shadow:
    inset 0 2px 3px rgba(255, 255, 255, 0.35),
    0 4px 10px rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ $isOn }) => ($isOn ? '#39ff14' : '#e6ebf2')};
  touch-action: manipulation;
  transition: transform 0.12s ease, color 0.2s ease, border-color 0.2s ease;

  &:active {
    transform: scale(0.95);
  }
`;