import styled from 'styled-components';
import { theme } from '../../styles/theme';

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