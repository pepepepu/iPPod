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
import { tracksContent } from './sections/tracksContent';
import { whatIDoContent } from './sections/whatIDoContent';

export type {
  ContactLinkItem,
  IPPodColorPreset,
  MainMenuItem,
  ProjectItem,
  ScreenId,
  SkillHighlightItem,
  TrackItem
} from './types';

export { getProjectDetailActions };

export const homeContent = {
  ...deviceInfoContent,
  colorPresets: colorPresetsContent,
  mainMenu: mainMenuContent,
  about: aboutContent,
  whatIDo: whatIDoContent,
  projects: projectsContent,
  tracks: tracksContent,
  contact: contactContent,
};