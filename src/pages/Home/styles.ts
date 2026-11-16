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
  padding: 16px 14px 20px;
  overflow: hidden;
`;

export const MobileScreenBezel = styled.div`
  width: 100%;
  height: 48dvh;
  min-height: 250px;
  max-height: 430px;
  background: #121417;
  border-radius: 16px;
  padding: 6px;
  box-shadow:
    inset 0 2px 6px rgba(0, 0, 0, 0.85),
    0 2px 0 rgba(255, 255, 255, 0.28);
  flex-shrink: 0;
`;