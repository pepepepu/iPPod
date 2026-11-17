import { homeContent, type IPPodColorPreset } from '../content/homeContent';

const COLOR_STORAGE_KEY = '@ippod:color-preset-id-v2';

export function getSavedColorPreset(): IPPodColorPreset {
  try {
    const savedId = window.localStorage.getItem(COLOR_STORAGE_KEY);
    if (savedId) {
      const found = homeContent.colorPresets.find(
        (item) => item.id === savedId
      );
      if (found) return found;
    }

    const randomIndex = Math.floor(
      Math.random() * homeContent.colorPresets.length
    );
    const randomPreset =
      homeContent.colorPresets[randomIndex] || homeContent.colorPresets[0];

    window.localStorage.setItem(COLOR_STORAGE_KEY, randomPreset.id);
    return randomPreset;
  } catch {
    return homeContent.colorPresets[0];
  }
}

export function saveColorPresetId(presetId: string): void {
  try {
    window.localStorage.setItem(COLOR_STORAGE_KEY, presetId);
  } catch {
    return;
  }
}