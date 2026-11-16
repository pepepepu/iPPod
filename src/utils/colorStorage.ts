import { homeContent, type IPPodColorPreset } from '../content/homeContent';

const COLOR_STORAGE_KEY = '@ippod:color-preset-id';

export function getSavedColorPreset(): IPPodColorPreset {
  try {
    const savedId = window.localStorage.getItem(COLOR_STORAGE_KEY);
    if (savedId) {
      const found = homeContent.colorPresets.find((item) => item.id === savedId);
      if (found) return found;
    }
  } catch {
    return homeContent.colorPresets[0];
  }
  return homeContent.colorPresets[0];
}

export function saveColorPresetId(presetId: string): void {
  try {
    window.localStorage.setItem(COLOR_STORAGE_KEY, presetId);
  } catch {
    return;
  }
}