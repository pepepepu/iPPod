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