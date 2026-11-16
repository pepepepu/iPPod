export const theme = {
  colors: {
    studioCenter: '#f4f6f9',
    studioMid: '#d9dfe8',
    studioEdge: '#b4becc',
    frameWhite: '#ffffff',
    spaceGrayLight: '#6e737b',
    spaceGrayMid: '#4a4e54',
    spaceGrayDark: '#2c2f33',
    wheelBlack: '#18191c',
    lcdWhite: '#f7f9fc',
    lcdBorder: '#0d0f12',
    selectionBlueTop: '#5ca9ff',
    selectionBlueBottom: '#1362d6',
    textDark: '#14181f',
    textLight: '#ffffff',
    textMuted: '#5a6578',
    batteryGreen: '#35d441',
  },
  gradients: {
    studioBackdrop:
      'radial-gradient(circle at 50% 45%, #f4f6f9 0%, #d9dfe8 58%, #b4becc 100%)',
    lcdHeader: 'linear-gradient(180deg, #eef2f7 0%, #c1cad8 50%, #aeb9ca 100%)',
    activeSelection:
      'linear-gradient(180deg, #6ab2ff 0%, #297be6 50%, #1258c4 100%)',
    glassGlare:
      'linear-gradient(125deg, rgba(255, 255, 255, 0.34) 0%, rgba(255, 255, 255, 0.08) 38%, rgba(255, 255, 255, 0) 42%, rgba(255, 255, 255, 0.04) 100%)',
  },
  shadows: {
    frameInset:
      'inset 0 0 0 14px #ffffff, inset 0 0 36px rgba(20, 24, 31, 0.18)',
    lcdInnerShadow:
      'inset 0 2px 8px rgba(0, 0, 0, 0.45), inset 0 0 2px rgba(0, 0, 0, 0.8)',
  },
  fonts: {
    display: 'var(--font-display)',
    lcd: 'var(--font-lcd)',
    ui: 'var(--font-ui)',
  },
} as const;

export type ThemeType = typeof theme;