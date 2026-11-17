import type { PlacedSticker } from '../content/homeContent';

const STICKER_STORAGE_KEY = '@ippod:placed-stickers-v2';

export function getSavedStickers(): PlacedSticker[] {
  try {
    const raw = window.localStorage.getItem(STICKER_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as PlacedSticker[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function savePlacedStickers(stickers: PlacedSticker[]): void {
  try {
    window.localStorage.setItem(STICKER_STORAGE_KEY, JSON.stringify(stickers));
  } catch {
    return;
  }
}
