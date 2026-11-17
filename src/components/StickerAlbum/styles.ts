import styled, { keyframes } from 'styled-components';
import { theme } from '../../styles/theme';

const peelOffKeyframes = keyframes`
  0% {
    transform: perspective(400px) rotateX(0deg) rotateZ(0deg) scale(1);
    filter: drop-shadow(0 3px 5px rgba(15, 23, 42, 0.18));
  }
  45% {
    transform: perspective(400px) rotateX(28deg) rotateY(-14deg) rotateZ(-6deg) scale(1.14);
    filter: drop-shadow(0 18px 20px rgba(15, 23, 42, 0.35));
  }
  100% {
    transform: perspective(400px) rotateX(8deg) rotateZ(-4deg) scale(1.08);
    filter: drop-shadow(0 14px 18px rgba(15, 23, 42, 0.32));
  }
`;

export const StickerPackDock = styled.aside<{ $isOpen: boolean }>`
  position: absolute;
  bottom: 0;
  left: ${({ $isOpen }) => ($isOpen ? '36px' : '-50px')};
  width: 320px;
  z-index: 15;
  transform: ${({ $isOpen }) =>
    $isOpen ? 'translateY(0)' : 'translateY(calc(100% - 76px))'};
  transition:
    transform 0.45s cubic-bezier(0.22, 1, 0.36, 1),
    left 0.45s cubic-bezier(0.22, 1, 0.36, 1);
  filter: drop-shadow(0 -6px 20px rgba(15, 23, 42, 0.22));
  user-select: none;
`;

export const PackHeaderTopper = styled.button`
  width: 100%;
  height: 76px;
  background: linear-gradient(180deg, #d8df00 0%, #c6ce00 100%);
  border-radius: 6px 6px 0 0;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0;
  cursor: pointer;
  overflow: hidden;
  border: 1px solid #b5bc00;
  border-bottom: none;
`;

export const HeaderMainArea = styled.div`
  position: relative;
  width: 100%;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 10px 4px;
  overflow: hidden;
`;

export const OutlinedWatermark = styled.span`
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%) scaleY(1.35);
  font-family: 'Arial Narrow', Impact, ${theme.fonts.display}, sans-serif;
  font-size: 2.35rem;
  font-weight: 900;
  letter-spacing: 2px;
  color: transparent;
  -webkit-text-stroke: 1.4px rgba(150, 158, 0, 0.65);
  pointer-events: none;
  white-space: nowrap;
  z-index: 1;
`;

export const HangerPunchHole = styled.div`
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  width: 56px;
  height: 15px;
  background: #d9dfe8;
  border-radius: 999px;
  box-shadow:
    inset 0 2px 4px rgba(0, 0, 0, 0.35),
    0 1px 0 rgba(255, 255, 255, 0.45);
  z-index: 3;

  &::before {
    content: '';
    position: absolute;
    top: -7px;
    left: 50%;
    transform: translateX(-50%);
    width: 18px;
    height: 14px;
    background: #d9dfe8;
    border-radius: 50%;
    box-shadow: inset 0 2px 3px rgba(0, 0, 0, 0.32);
  }
`;

export const BarcodeColumn = styled.div`
  margin-left: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  z-index: 3;
`;

export const BarcodeWhiteBox = styled.div`
  background: #ffffff;
  padding: 3px 5px 1px;
  border-radius: 1px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);

  svg {
    width: 56px;
    height: 22px;
  }

  span {
    font-family: monospace;
    font-size: 6.5px;
    font-weight: 700;
    letter-spacing: 0.4px;
    color: #111827;
    line-height: 1;
    margin-top: 1px;
  }
`;

export const CartelaRedText = styled.span`
  font-family: 'Arial Narrow', ${theme.fonts.ui}, sans-serif;
  font-size: 8.5px;
  font-weight: 900;
  letter-spacing: 0.3px;
  color: #d91b1b;
  line-height: 1;
`;

export const RainbowColorStrip = styled.div`
  width: 100%;
  height: 9px;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  flex-shrink: 0;
  z-index: 3;

  span:nth-child(1) {
    background: #5bc8f7;
  }
  span:nth-child(2) {
    background: #4f8df5;
  }
  span:nth-child(3) {
    background: #3238e8;
  }
  span:nth-child(4) {
    background: #8238ec;
  }
  span:nth-child(5) {
    background: #c13584;
  }
  span:nth-child(6) {
    background: #d94e4e;
  }
  span:nth-child(7) {
    background: #e06d44;
  }
  span:nth-child(8) {
    background: #e69145;
  }
  span:nth-child(9) {
    background: #ebad4d;
  }
  span:nth-child(10) {
    background: #f2d665;
  }
  span:nth-child(11) {
    background: #eae26b;
  }
  span:nth-child(12) {
    background: #b5d665;
  }
`;

export const StickerSheetBody = styled.div`
  width: 100%;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.97) 0%,
    rgba(241, 245, 249, 0.95) 100%
  );
  border-left: 1px solid #cbd5e1;
  border-right: 1px solid #cbd5e1;
  padding: 14px 12px 18px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      115deg,
      rgba(255, 255, 255, 0) 30%,
      rgba(255, 255, 255, 0.55) 48%,
      rgba(255, 255, 255, 0) 65%
    );
    pointer-events: none;
  }
`;

export const StickerSlot = styled.button<{ $isUsed: boolean }>`
  height: 74px;
  border-radius: 12px;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: 1.5px dashed
    ${({ $isUsed }) =>
    $isUsed ? 'rgba(203, 213, 225, 0.5)' : 'transparent'};
  cursor: ${({ $isUsed }) => ($isUsed ? 'default' : 'grab')};
  touch-action: none;

  &:active {
    cursor: ${({ $isUsed }) => ($isUsed ? 'default' : 'grabbing')};
  }
`;

export const VinylStickerImg = styled.img<{ $isUsed: boolean }>`
  width: 68px;
  height: 68px;
  object-fit: contain;
  pointer-events: none;
  opacity: ${({ $isUsed }) => ($isUsed ? 0 : 1)};
  transform-origin: bottom right;
  filter: drop-shadow(0 3px 5px rgba(15, 23, 42, 0.2));
  transition:
    transform 0.24s cubic-bezier(0.22, 1, 0.36, 1),
    filter 0.24s ease,
    opacity 0.2s ease;

  ${StickerSlot}:hover & {
    transform: ${({ $isUsed }) =>
    $isUsed
      ? 'none'
      : 'perspective(300px) rotateX(16deg) rotateY(-12deg) scale(1.08)'};
    filter: drop-shadow(0 10px 12px rgba(15, 23, 42, 0.28));
  }
`;

export const DraggingStickerGhost = styled.div`
  position: fixed;
  width: 84px;
  height: 84px;
  margin-left: -42px;
  margin-top: -42px;
  pointer-events: none;
  z-index: 9999;
  animation: ${peelOffKeyframes} 0.32s cubic-bezier(0.22, 1, 0.36, 1) forwards;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;