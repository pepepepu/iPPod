import styled from 'styled-components';
import { theme } from '../../styles/theme';

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