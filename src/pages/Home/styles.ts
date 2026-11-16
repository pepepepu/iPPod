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

  @media (max-width: 768px) {
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    width: max-content;
    max-width: 92vw;
    justify-content: center;
    text-align: center;
    font-size: 0.68rem;
    letter-spacing: 1.5px;
    background: rgba(255, 255, 255, 0.72);
    backdrop-filter: blur(8px);
    padding: 8px 14px;
    border-radius: 999px;
    border: 1px solid rgba(255, 255, 255, 0.9);
    box-shadow: 0 4px 14px rgba(20, 24, 31, 0.08);
  }
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

  @media (max-width: 768px) {
    bottom: 20px;
    right: auto;
    left: 50%;
    transform: translateX(-50%);
    align-items: center;
    width: max-content;
    max-width: 94vw;
  }
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