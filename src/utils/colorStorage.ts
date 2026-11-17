import { homeContent, type IPPodColorPreset } from '../content/homeContent';

const DESKTOP_COLOR_STORAGE_KEY = '@ippod:desktop-color-preset-id';
const MOBILE_COLOR_STORAGE_KEY = '@ippod:mobile-color-preset-id';

export function getSavedColorPreset(isMobile = false): IPPodColorPreset {
  try {
    if (!isMobile) {
      const savedDesktopId = window.localStorage.getItem(
        DESKTOP_COLOR_STORAGE_KEY
      );
      if (savedDesktopId) {
        const found = homeContent.colorPresets.find(
          (item) => item.id === savedDesktopId
        );
        if (found) return found;
      }
      return homeContent.colorPresets[0];
    }

    const savedMobileId = window.localStorage.getItem(MOBILE_COLOR_STORAGE_KEY);
    if (savedMobileId) {
      const found = homeContent.colorPresets.find(
        (item) => item.id === savedMobileId
      );
      if (found) return found;
    }

    const randomIndex = Math.floor(
      Math.random() * homeContent.colorPresets.length
    );
    const randomPreset =
      homeContent.colorPresets[randomIndex] || homeContent.colorPresets[0];

    window.localStorage.setItem(MOBILE_COLOR_STORAGE_KEY, randomPreset.id);
    return randomPreset;
  } catch {
    return homeContent.colorPresets[0];
  }
}

export function saveColorPresetId(presetId: string, isMobile = false): void {
  try {
    const key = isMobile
      ? MOBILE_COLOR_STORAGE_KEY
      : DESKTOP_COLOR_STORAGE_KEY;
    window.localStorage.setItem(key, presetId);
  } catch {
    return;
  }
}