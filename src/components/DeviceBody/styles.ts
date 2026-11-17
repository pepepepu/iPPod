import styled from 'styled-components';
import { theme } from '../../styles/theme';

export const WheelOverlay = styled.div`
  width: 380px;
  height: 380px;
  border-radius: 50%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  touch-action: none;
`;

export const WheelButton = styled.button<{
  $position: 'top' | 'bottom' | 'left' | 'right';
}>`
  position: absolute;
  color: #e6ebf2;
  font-family: ${theme.fonts.ui};
  font-weight: 700;
  font-size: 16px;
  letter-spacing: 1.5px;
  padding: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.12s ease, color 0.15s ease;
  touch-action: manipulation;

  ${({ $position }) =>
    $position === 'top' &&
    `
    top: 14px;
    left: 50%;
    transform: translateX(-50%);
  `}

  ${({ $position }) =>
    $position === 'bottom' &&
    `
    bottom: 14px;
    left: 50%;
    transform: translateX(-50%);
  `}

  ${({ $position }) =>
    $position === 'left' &&
    `
    left: 14px;
    top: 50%;
    transform: translateY(-50%);
  `}

  ${({ $position }) =>
    $position === 'right' &&
    `
    right: 14px;
    top: 50%;
    transform: translateY(-50%);
  `}

  &:hover {
    color: #5ca9ff;
  }

  &:active {
    color: #00f0ff;
  }
`;

export const CenterSelectButton = styled.button`
  width: 136px;
  height: 136px;
  border-radius: 50%;
  cursor: pointer;
  background: transparent;
  touch-action: manipulation;
`;

export const BackEngravingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  pointer-events: none;
  user-select: none;
  opacity: 0.72;
  color: rgba(255, 255, 255, 0.85);
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.55);

  span.brand {
    font-family: ${theme.fonts.display};
    font-size: 28px;
    font-weight: 900;
    letter-spacing: 3px;
  }

  span.capacity {
    font-family: ${theme.fonts.display};
    font-size: 18px;
    font-weight: 700;
    letter-spacing: 2px;
    padding: 4px 14px;
    border: 2px solid rgba(255, 255, 255, 0.75);
    border-radius: 6px;
  }

  span.serial {
    font-family: ${theme.fonts.ui};
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 1px;
    opacity: 0.8;
  }
`;