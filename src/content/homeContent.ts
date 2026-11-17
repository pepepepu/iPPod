import { aboutContent } from './sections/aboutContent';
import { contactContent } from './sections/contactContent';
import {
  colorPresetsContent,
  deviceInfoContent,
  mainMenuContent,
} from './sections/deviceContent';
import {
  getProjectDetailActions,
  projectsContent,
} from './sections/projectsContent';
import { stickersContent } from './sections/stickersContent';
import { tracksContent } from './sections/tracksContent';
import { whatIDoContent } from './sections/whatIDoContent';

export type {
  ContactLinkItem,
  IPPodColorPreset,
  MainMenuItem,
  PendingStickerDrop,
  PlacedSticker,
  ProjectItem,
  ScreenId,
  SkillHighlightItem,
  StickerPreset,
  TrackItem
} from './types';

export { getProjectDetailActions };

export const homeContent = {
  ...deviceInfoContent,
  colorPresets: colorPresetsContent,
  stickers: stickersContent,
  mainMenu: mainMenuContent,
  about: aboutContent,
  whatIDo: whatIDoContent,
  projects: projectsContent,
  tracks: tracksContent,
  contact: contactContent,
};