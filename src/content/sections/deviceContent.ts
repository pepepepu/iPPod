import type { IPPodColorPreset, MainMenuItem } from '../types';

export const deviceInfoContent = {
  deviceName: 'iPPod',
  storageInfo: '127GB',
};

export const colorPresetsContent: IPPodColorPreset[] = [
  {
    id: 'space-gray',
    name: 'Cinza Espacial',
    bodyColor: '#4d5259',
    backplateColor: '#4d5259',
    wheelColor: '#1b1d21',
    centerButtonColor: '#50555c',
    swatchHex: '#4d5259',
  },
  {
    id: 'silver-classic',
    name: 'Prata Clássico',
    bodyColor: '#cfd5df',
    backplateColor: '#cfd5df',
    wheelColor: '#ffffff',
    centerButtonColor: '#cfd5df',
    swatchHex: '#cfd5df',
  },
  {
    id: 'midnight-blue',
    name: 'Azul Metálico',
    bodyColor: '#1f3a60',
    backplateColor: '#1f3a60',
    wheelColor: '#111c2d',
    centerButtonColor: '#2d5082',
    swatchHex: '#1f3a60',
  },
  {
    id: 'y2k-lime',
    name: 'Verde Y2K',
    bodyColor: '#4d7c0f',
    backplateColor: '#4d7c0f',
    wheelColor: '#1a2e05',
    centerButtonColor: '#65a30d',
    swatchHex: '#65a30d',
  },
  {
    id: 'cyber-pink',
    name: 'Rosa Cyber',
    bodyColor: '#9d174d',
    backplateColor: '#9d174d',
    wheelColor: '#2e0716',
    centerButtonColor: '#be185d',
    swatchHex: '#be185d',
  },
  {
    id: 'crimson-red',
    name: 'Vermelho Special',
    bodyColor: '#991b1b',
    backplateColor: '#991b1b',
    wheelColor: '#1f0808',
    centerButtonColor: '#b91c1c',
    swatchHex: '#b91c1c',
  },
];

export const mainMenuContent: MainMenuItem[] = [
  {
    id: 'about',
    label: 'Sobre Mim',
    previewTitle: 'Pedro Paulo // Pepe',
    previewSubtitle: 'Firmware de Engenharia Front-End & Direção de UI/UX',
    y2kGradient:
      'linear-gradient(135deg, #00f0ff 0%, #0066ff 50%, #0a1128 100%)',
    badge: 'SYS • BIO',
  },
  {
    id: 'skills',
    label: 'O Que Eu Faço',
    previewTitle: 'Audio & Code Equalizer',
    previewSubtitle: 'UI/UX • Front-End • Back-End • Motion Design',
    y2kGradient:
      'linear-gradient(135deg, #39ff14 0%, #00b4d8 52%, #1e1b4b 100%)',
    badge: '4 CANAIS',
  },
  {
    id: 'projects',
    label: 'Meus Projetos',
    previewTitle: 'Discografia // 10 Obras',
    previewSubtitle: 'Faixas autorais & sistemas de alta rotação em campo',
    y2kGradient:
      'linear-gradient(135deg, #ff007f 0%, #7928ca 50%, #0f172a 100%)',
    badge: '10 TRACKS',
  },
  {
    id: 'now-playing',
    label: 'Tocando Agora',
    previewTitle: 'Spotify // Last.fm Sync',
    previewSubtitle: 'O que está tocando nos meus fones em tempo real',
    y2kGradient:
      'linear-gradient(135deg, #ff6b00 0%, #ff0055 55%, #1a002c 100%)',
    badge: 'LIVE SYNC',
  },
  {
    id: 'contact',
    label: 'Contato',
    previewTitle: '30-Pin Sync Dock',
    previewSubtitle: 'Conecte o cabo para projetos, freelas e ideias',
    y2kGradient:
      'linear-gradient(135deg, #00f5d4 0%, #7b2cbf 55%, #090d16 100%)',
    badge: 'USB 2.0',
  },
];