import styled, { keyframes } from 'styled-components';
import { theme } from '../../styles/theme';

const bootPopIn = keyframes`
  0% {
    opacity: 0;
    transform: rotate(90deg) scale(0.85);
  }
  100% {
    opacity: 1;
    transform: rotate(90deg) scale(1);
  }
`;

const bootProgressAnim = keyframes`
  0% {
    width: 0%;
  }
  100% {
    width: 100%;
  }
`;

const livePulse = keyframes`
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.4;
    transform: scale(0.85);
  }
`;

export const ScreenWrapper = styled.div<{ $isMobile?: boolean }>`
  width: ${({ $isMobile }) => ($isMobile ? '100%' : '540px')};
  height: ${({ $isMobile }) => ($isMobile ? '100%' : '405px')};
  background-color: ${theme.colors.lcdWhite};
  border-radius: ${({ $isMobile }) => ($isMobile ? '12px' : '10px')};
  border: 4px solid ${theme.colors.lcdBorder};
  box-shadow: ${theme.shadows.lcdInnerShadow};
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  font-family: ${theme.fonts.ui};
  color: ${theme.colors.textDark};

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image:
      repeating-linear-gradient(
        0deg,
        rgba(0, 0, 0, 0.065) 0px,
        rgba(0, 0, 0, 0.065) 1px,
        transparent 1px,
        transparent 3px
      ),
      repeating-linear-gradient(
        90deg,
        rgba(255, 0, 0, 0.025) 0px,
        rgba(0, 255, 0, 0.025) 1px,
        rgba(0, 0, 255, 0.025) 2px,
        transparent 3px
      );
    pointer-events: none;
    z-index: 8;
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: ${theme.gradients.glassGlare};
    box-shadow: inset 0 0 18px rgba(0, 0, 0, 0.28);
    pointer-events: none;
    z-index: 9;
  }
`;

export const BlankOffScreen = styled.div`
  width: 100%;
  height: 100%;
  background: #000000;
  z-index: 2;
  cursor: pointer;
`;

export const BootScreen = styled.div`
  width: 100%;
  height: 100%;
  background: #000000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 28px;
  z-index: 2;
`;

export const BootTagEmoticon = styled.div`
  font-family: ${theme.fonts.display};
  font-size: 62px;
  font-weight: 900;
  letter-spacing: 2px;
  color: #ffffff;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  transform: rotate(90deg);
  animation: ${bootPopIn} 0.35s ease-out forwards;

  @media (max-width: 768px) {
    font-size: 48px;
  }
`;

export const BootLoadingTrack = styled.div`
  width: 150px;
  height: 5px;
  background: rgba(255, 255, 255, 0.18);
  border-radius: 999px;
  overflow: hidden;
`;

export const BootLoadingFill = styled.div`
  height: 100%;
  background: #ffffff;
  border-radius: 999px;
  animation: ${bootProgressAnim} 1.3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
`;

export const StatusBar = styled.header`
  height: 34px;
  background: ${theme.gradients.lcdHeader};
  border-bottom: 1px solid #7c889b;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 14px;
  font-size: 14px;
  font-weight: 700;
  color: #1f2633;
  text-shadow: 0 1px 0 rgba(255, 255, 255, 0.7);
  z-index: 2;
  flex-shrink: 0;

  @media (max-width: 768px) {
    height: 28px;
    padding: 0 10px;
    font-size: 12px;
  }
`;

export const StatusRight = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #1d69d8;
`;

export const BatteryIcon = styled.div`
  width: 28px;
  height: 13px;
  border: 1.5px solid #2b3340;
  border-radius: 2px;
  padding: 1.5px;
  position: relative;
  background: #ffffff;

  &::after {
    content: '';
    position: absolute;
    right: -4px;
    top: 3px;
    width: 2.5px;
    height: 5px;
    background: #2b3340;
    border-radius: 0 1px 1px 0;
  }
`;

export const BatteryFill = styled.div`
  width: 86%;
  height: 100%;
  background: linear-gradient(180deg, #74f57d 0%, #29b833 60%, #1d8f25 100%);
`;

export const SplitBody = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: 50% 50%;
  min-height: 0;
  z-index: 2;

  @media (max-width: 768px) {
    grid-template-columns: 46% 54%;
  }
`;

export const FullScreenBody = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 0;
  background: linear-gradient(180deg, #f9fbff 0%, #e4ebf5 100%);
  z-index: 2;
  padding: 10px 16px 8px;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  touch-action: pan-y;

  @media (max-width: 768px) {
    padding: 8px 12px;
  }
`;

export const LeftPane = styled.div`
  background: #ffffff;
  border-right: 1px solid #b8c2d1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 2px 0;
  min-height: 0;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  touch-action: pan-y;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: #eef2f7;
  }

  &::-webkit-scrollbar-thumb {
    background: #9aa6b8;
    border-radius: 3px;
  }
`;

export const MenuList = styled.ul`
  display: flex;
  flex-direction: column;
`;

export const MenuItemRow = styled.li<{ $active: boolean }>`
  min-height: 42px;
  padding: 6px 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  color: ${({ $active }) =>
    $active ? theme.colors.textLight : theme.colors.textDark};
  background: ${({ $active }) =>
    $active ? theme.gradients.activeSelection : 'transparent'};
  border-top: 1px solid
    ${({ $active }) => ($active ? '#4997f5' : 'transparent')};
  border-bottom: 1px solid
    ${({ $active }) => ($active ? '#0f4da8' : '#eef1f6')};
  text-shadow: ${({ $active }) =>
    $active ? '0 1px 2px rgba(0, 0, 0, 0.45)' : 'none'};

  span.truncate {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  @media (max-width: 768px) {
    min-height: 35px;
    padding: 4px 10px;
    font-size: 12px;
  }
`;

export const RightPane = styled.div`
  background: linear-gradient(180deg, #e9eef5 0%, #cfd8e6 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 12px 14px;
  text-align: center;
  position: relative;
  min-height: 0;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  touch-action: pan-y;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.35);
  }

  &::-webkit-scrollbar-thumb {
    background: #8c98ac;
    border-radius: 3px;
  }

  @media (max-width: 768px) {
    padding: 10px 8px;
  }
`;

export const RightPaneInner = styled.div`
  width: 100%;
  margin: auto 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Y2KGradientCover = styled.div<{
  $gradient: string;
  $size?: number;
}>`
  width: ${({ $size }) => ($size ? `${$size}px` : '128px')};
  height: ${({ $size }) => ($size ? `${$size}px` : '128px')};
  border-radius: 10px;
  background: ${({ $gradient }) => $gradient};
  box-shadow:
    0 12px 22px rgba(0, 0, 0, 0.32),
    inset 0 2px 3px rgba(255, 255, 255, 0.75),
    inset 0 -2px 6px rgba(0, 0, 0, 0.45);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  border: 1.5px solid rgba(255, 255, 255, 0.7);
  transform: perspective(300px) rotateY(-10deg);
  flex-shrink: 0;
  padding: 10px;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -40%;
    left: -40%;
    width: 180%;
    height: 95%;
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.55) 0%,
      rgba(255, 255, 255, 0.05) 100%
    );
    transform: rotate(-18deg);
    pointer-events: none;
    z-index: 1;
  }

  @media (max-width: 768px) {
    width: ${({ $size }) => ($size ? `${Math.min($size, 70)}px` : '76px')};
    height: ${({ $size }) => ($size ? `${Math.min($size, 70)}px` : '76px')};
    padding: 6px;
    margin-bottom: 5px;
  }
`;

export const AlbumCoverImage = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
`;

export const AlbumOpticalRing = styled.div`
  width: 42px;
  height: 42px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.85);
  background: radial-gradient(
    circle,
    rgba(255, 255, 255, 0.9) 0%,
    rgba(255, 255, 255, 0.2) 45%,
    transparent 70%
  );
  box-shadow: 0 0 12px rgba(255, 255, 255, 0.5);
  margin-top: 8px;
  z-index: 2;

  @media (max-width: 768px) {
    width: 22px;
    height: 22px;
    margin-top: 2px;
  }
`;

export const ArtworkBadge = styled.span`
  font-family: ${theme.fonts.display};
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 1.2px;
  padding: 3px 8px;
  background: rgba(10, 14, 22, 0.82);
  color: #ffffff;
  border-radius: 4px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  max-width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  z-index: 2;
  margin-top: auto;

  @media (max-width: 768px) {
    font-size: 6.5px;
    padding: 2px 4px;
  }
`;

export const PreviewTitle = styled.h2`
  font-size: 15px;
  font-weight: 700;
  color: #14181f;
  margin-bottom: 3px;
  flex-shrink: 0;

  @media (max-width: 768px) {
    font-size: 12px;
    margin-bottom: 2px;
  }
`;

export const PreviewSubtitle = styled.p`
  font-size: 11.5px;
  color: #3b4556;
  line-height: 1.35;
  max-width: 235px;
  flex-shrink: 0;

  @media (max-width: 768px) {
    font-size: 10px;
    line-height: 1.25;
    max-width: 100%;
    word-break: break-word;
  }
`;

export const TagRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 4px;
  margin-top: 6px;
  flex-shrink: 0;
`;

export const MiniTag = styled.span`
  font-size: 9.5px;
  font-weight: 700;
  padding: 2px 6px;
  border-radius: 3px;
  background: #ffffff;
  border: 1px solid #b8c2d1;
  color: #1f2633;

  @media (max-width: 768px) {
    font-size: 8px;
    padding: 1px 4px;
  }
`;

export const DetailHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding-bottom: 8px;
  border-bottom: 1px solid #c5d0e0;
`;

export const DetailMiniCover = styled.div<{ $gradient: string }>`
  width: 62px;
  height: 62px;
  border-radius: 8px;
  background: ${({ $gradient }) => $gradient};
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow:
    0 6px 14px rgba(0, 0, 0, 0.25),
    inset 0 1px 2px rgba(255, 255, 255, 0.75);
  border: 1.5px solid rgba(255, 255, 255, 0.75);
  flex-shrink: 0;
  font-family: ${theme.fonts.display};
  font-size: 13px;
  font-weight: 900;
  color: #ffffff;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.45);

  @media (max-width: 768px) {
    width: 44px;
    height: 44px;
    font-size: 10.5px;
  }
`;

export const DetailTitleBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;

  h3 {
    font-size: 16px;
    font-weight: 700;
    color: #14181f;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  span {
    font-size: 11px;
    font-weight: 600;
    color: #1362d6;
  }

  @media (max-width: 768px) {
    h3 {
      font-size: 13px;
    }
    span {
      font-size: 9.5px;
    }
  }
`;

export const DetailDescription = styled.p`
  font-size: 12px;
  line-height: 1.38;
  color: #262f3d;
  background: #ffffff;
  border: 1px solid #cfd8e6;
  border-radius: 6px;
  padding: 8px 10px;
  margin: 6px 0;
  max-height: 110px;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  touch-action: pan-y;

  @media (max-width: 768px) {
    font-size: 10.5px;
    line-height: 1.32;
    padding: 6px 8px;
    margin: 4px 0;
    max-height: 82px;
  }
`;

export const ActionButtonsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
`;

export const NowPlayingGrid = styled.div`
  display: grid;
  grid-template-columns: 160px 1fr;
  gap: 16px;
  align-items: center;
  margin-top: 6px;

  @media (max-width: 768px) {
    grid-template-columns: 86px 1fr;
    gap: 10px;
    margin-top: 2px;
  }
`;

export const TrackMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  min-width: 0;

  h2 {
    font-size: 19px;
    font-weight: 700;
    color: #14181f;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  p.artist {
    font-size: 14px;
    font-weight: 600;
    color: #1362d6;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  p.album {
    font-size: 12px;
    color: #5a6578;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  @media (max-width: 768px) {
    gap: 2px;
    h2 {
      font-size: 14px;
    }
    p.artist {
      font-size: 11.5px;
    }
    p.album {
      font-size: 10px;
    }
  }
`;

export const LiveStatusPill = styled.div<{ $isLive: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 2px 8px;
  border-radius: 999px;
  font-family: ${theme.fonts.display};
  font-size: 8.5px;
  font-weight: 700;
  letter-spacing: 0.8px;
  width: fit-content;
  max-width: 100%;
  background: ${({ $isLive }) =>
    $isLive ? 'rgba(22, 163, 74, 0.14)' : 'rgba(90, 101, 120, 0.14)'};
  color: ${({ $isLive }) => ($isLive ? '#15803d' : '#475569')};
  border: 1px solid
    ${({ $isLive }) =>
    $isLive ? 'rgba(22, 163, 74, 0.4)' : 'rgba(90, 101, 120, 0.3)'};

  @media (max-width: 768px) {
    font-size: 7.5px;
    padding: 2px 6px;
  }
`;

export const LivePulseDot = styled.span<{ $isLive: boolean }>`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  flex-shrink: 0;
  background: ${({ $isLive }) => ($isLive ? '#22c55e' : '#64748b')};
  animation: ${({ $isLive }) => ($isLive ? livePulse : 'none')} 1.4s ease-in-out
    infinite;
`;

export const ScrubberContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-top: 8px;
`;

export const ScrubberBar = styled.div`
  width: 100%;
  height: 12px;
  border-radius: 999px;
  background: linear-gradient(180deg, #b8c2d1 0%, #eef2f7 100%);
  border: 1px solid #8c98ac;
  overflow: hidden;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.25);
`;

export const ScrubberFill = styled.div<{ $percent: number }>`
  width: ${({ $percent }) => $percent}%;
  height: 100%;
  background: linear-gradient(
    180deg,
    #80c1ff 0%,
    #257ce8 50%,
    #0e52b5 100%
  );
  transition: width 0.3s linear;
`;

export const ScrubberTimeRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 11px;
  font-weight: 700;
  color: #2b3340;
`;

export const EqualizerBox = styled.div`
  width: 100%;
  height: 78px;
  background: #0b1622;
  border: 2px solid #7c889b;
  border-radius: 6px;
  padding: 8px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 5px;
  margin-bottom: 6px;
  box-shadow: inset 0 2px 10px rgba(0, 0, 0, 0.8);
  flex-shrink: 0;

  @media (max-width: 768px) {
    height: 48px;
    padding: 5px;
    margin-bottom: 4px;
  }
`;

export const EqBarColumn = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  align-items: flex-end;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 2px;
  overflow: hidden;
`;

export const EqBarFill = styled.div<{ $height: number }>`
  width: 100%;
  height: ${({ $height }) => $height}%;
  background: linear-gradient(
    180deg,
    #00f0ff 0%,
    #39ff14 55%,
    #1362d6 100%
  );
  transition: height 0.25s ease;
`;

export const InfoTextCard = styled.div`
  background: #ffffff;
  border: 1px solid #c2cde0;
  border-radius: 6px;
  padding: 8px 10px;
  display: flex;
  flex-direction: column;
  gap: 3px;
  width: 100%;
  text-align: left;
  margin-top: 6px;
  flex-shrink: 0;
  max-height: 115px;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  touch-action: pan-y;

  &::-webkit-scrollbar {
    width: 3px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f5f9;
  }

  &::-webkit-scrollbar-thumb {
    background: #94a3b8;
    border-radius: 3px;
  }

  span.label {
    font-size: 9.5px;
    font-weight: 700;
    text-transform: uppercase;
    color: #1362d6;
    letter-spacing: 0.5px;
  }

  p.val {
    font-size: 11px;
    line-height: 1.38;
    font-weight: 500;
    color: #1f2633;
    word-break: break-word;
  }

  @media (max-width: 768px) {
    padding: 6px 8px;
    margin-top: 5px;
    max-height: 96px;

    span.label {
      font-size: 8.5px;
    }

    p.val {
      font-size: 10px;
      line-height: 1.32;
    }
  }
`;

export const VolumeHudOverlay = styled.div`
  position: absolute;
  bottom: 44px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(15, 23, 42, 0.88);
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 8px;
  padding: 8px 14px;
  display: flex;
  align-items: center;
  gap: 10px;
  color: #ffffff;
  font-size: 11px;
  font-weight: 700;
  z-index: 7;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.35);
`;

export const VolumeTrack = styled.div`
  width: 110px;
  height: 7px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 999px;
  overflow: hidden;
`;

export const VolumeFill = styled.div<{ $level: number }>`
  width: ${({ $level }) => $level}%;
  height: 100%;
  background: #00f0ff;
`;

export const ScreenFixedFooter = styled.footer`
  height: 34px;
  background: linear-gradient(180deg, #dde4ef 0%, #c1cad8 100%);
  border-top: 1px solid #8c98ac;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  z-index: 4;
  flex-shrink: 0;

  @media (max-width: 768px) {
    height: 28px;
    padding: 0 6px;
  }
`;

export const FooterControlBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 3px 6px;
  border-radius: 4px;
  font-family: ${theme.fonts.ui};
  font-size: 11px;
  font-weight: 700;
  color: #1f2633;
  transition: background 0.15s ease, color 0.15s ease;

  &:hover {
    background: rgba(19, 98, 214, 0.14);
    color: #1362d6;
  }

  @media (max-width: 768px) {
    gap: 3px;
    padding: 2px 3px;
    font-size: 9px;
  }
`;

export const FooterKeyBadge = styled.kbd`
  background: #ffffff;
  border: 1px solid #7c889b;
  border-radius: 3px;
  padding: 1px 5px;
  font-family: ${theme.fonts.display};
  font-size: 9.5px;
  font-weight: 700;
  color: #14181f;
  box-shadow: 0 1px 0 #7c889b;

  @media (max-width: 768px) {
    font-size: 7.5px;
    padding: 1px 3px;
  }
`;