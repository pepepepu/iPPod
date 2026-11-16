export type ScreenId =
  | 'home'
  | 'about'
  | 'skills'
  | 'projects'
  | 'project-detail'
  | 'now-playing'
  | 'contact';

export interface IPPodColorPreset {
  id: string;
  name: string;
  bodyColor: string;
  backplateColor: string;
  wheelColor: string;
  centerButtonColor: string;
  swatchHex: string;
}

export interface ProjectItem {
  id: string;
  trackNumber: string;
  category: 'authorial' | 'collaborative';
  contextLabel: string;
  title: string;
  description: string;
  tags: string[];
  y2kGradient: string;
  discCode: string;
  liveUrl?: string;
  liveLabel?: string;
  repoUrl?: string;
}

export interface SkillHighlightItem {
  id: string;
  label: string;
  subtitle: string;
  tools: string;
  description: string;
  y2kGradient: string;
  level: number;
  bars: number[];
}

export interface TrackItem {
  id: string;
  number: string;
  title: string;
  artist: string;
  album: string;
  duration: number;
  y2kGradient: string;
}

export interface ContactLinkItem {
  id: string;
  label: string;
  value: string;
  url: string;
  protocol: string;
  y2kGradient: string;
}

export interface MainMenuItem {
  id: Exclude<ScreenId, 'home' | 'project-detail'>;
  label: string;
  previewTitle: string;
  previewSubtitle: string;
  y2kGradient: string;
  badge: string;
}

export const homeContent = {
  deviceName: 'iPPod',
  storageInfo: '160 GB',
  colorPresets: [
    {
      id: 'space-gray',
      name: 'Cinza Espacial',
      bodyColor: '#4d5259',
      backplateColor: '#b8bec7',
      wheelColor: '#1b1d21',
      centerButtonColor: '#50555c',
      swatchHex: '#4d5259',
    },
    {
      id: 'silver-classic',
      name: 'Prata Clássico',
      bodyColor: '#cfd5df',
      backplateColor: '#eef2f6',
      wheelColor: '#ffffff',
      centerButtonColor: '#cfd5df',
      swatchHex: '#cfd5df',
    },
    {
      id: 'midnight-blue',
      name: 'Azul Metálico',
      bodyColor: '#1f3a60',
      backplateColor: '#a3b8d7',
      wheelColor: '#111c2d',
      centerButtonColor: '#2d5082',
      swatchHex: '#1f3a60',
    },
    {
      id: 'y2k-lime',
      name: 'Verde Y2K',
      bodyColor: '#4d7c0f',
      backplateColor: '#d9f99d',
      wheelColor: '#1a2e05',
      centerButtonColor: '#65a30d',
      swatchHex: '#65a30d',
    },
    {
      id: 'cyber-pink',
      name: 'Rosa Cyber',
      bodyColor: '#9d174d',
      backplateColor: '#fbcfe8',
      wheelColor: '#2e0716',
      centerButtonColor: '#be185d',
      swatchHex: '#be185d',
    },
    {
      id: 'crimson-red',
      name: 'Vermelho Special',
      bodyColor: '#991b1b',
      backplateColor: '#fecaca',
      wheelColor: '#1f0808',
      centerButtonColor: '#b91c1c',
      swatchHex: '#b91c1c',
    },
  ] as IPPodColorPreset[],
  mainMenu: [
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
      previewTitle: 'Y2K Stereo Deck',
      previewSubtitle: '128 kbps MP3 • Som Cristalino & Bass Boost',
      y2kGradient:
        'linear-gradient(135deg, #ff6b00 0%, #ff0055 55%, #1a002c 100%)',
      badge: 'HI-FI MP3',
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
  ] as MainMenuItem[],
  about: {
    title: 'Pedro Paulo — Pepe',
    subtitle: 'Front-End Engineer & UI/UX Designer',
    y2kGradient:
      'linear-gradient(135deg, #00f0ff 0%, #1d4ed8 52%, #090d16 100%)',
    tracks: [
      {
        id: 'bio-01',
        label: '01. Identidade // Pepe',
        tag: 'SYSTEM ID',
        content:
          'Operando entre código e direção visual: crio interfaces digitais com estética afiada, velocidade de resposta e memória afetiva.',
      },
      {
        id: 'bio-02',
        label: '02. SEAD // ZDoc',
        tag: 'WORK DECK',
        content:
          'Analista de Sistemas projetando e desenvolvendo plataformas governamentais web e mobile que atendem milhares de cidadãos em Sergipe.',
      },
      {
        id: 'bio-03',
        label: '03. UFS & LAWD',
        tag: 'ACADEMY',
        content:
          'Graduando em Engenharia de Computação na UFS e membro da Liga Acadêmica de Desenvolvimento Web (LAWD), pesquisando web e PLN.',
      },
    ],
  },
  whatIDo: {
    title: 'O Que Eu Faço',
    subtitle: '4 Canais de Produção Digital',
    topics: [
      {
        id: 'topic-uiux',
        label: 'UI/UX',
        subtitle: 'Design de Experiência & Sistemas Visuais',
        tools: 'Figma • Design Systems • Prototipação • Direção de Arte',
        description:
          'Projeto interfaces que despertam sensação imediata: da arquitetura de informação e wireframes até protótipos interativos de alta fidelidade.',
        y2kGradient:
          'linear-gradient(135deg, #ff007f 0%, #7928ca 55%, #111827 100%)',
        level: 96,
        bars: [90, 96, 100, 92, 88, 95, 94, 96],
      },
      {
        id: 'topic-frontend',
        label: 'Front-End',
        subtitle: 'Engenharia de Interfaces Web & Mobile',
        tools: 'React • React Native • TypeScript • Vue.js • Angular • Swift',
        description:
          'Construo aplicações escaláveis, rápidas e tipadas para web, iOS e Android, transformando layouts complexos em componentes limpos e reutilizáveis.',
        y2kGradient:
          'linear-gradient(135deg, #00f0ff 0%, #0066ff 55%, #0f172a 100%)',
        level: 98,
        bars: [95, 100, 98, 94, 92, 98, 96, 94],
      },
      {
        id: 'topic-backend',
        label: 'Back-End',
        subtitle: 'APIs, Arquitetura de Dados & IA (PLN)',
        tools: 'Nest.js • Python (PLN) • PHP & Laravel • PostgreSQL • Docker',
        description:
          'Estruturação de servidores robustos, integrações REST, bancos de dados relacionais e processamento de linguagem natural.',
        y2kGradient:
          'linear-gradient(135deg, #39ff14 0%, #059669 55%, #06281e 100%)',
        level: 88,
        bars: [78, 86, 90, 84, 88, 82, 85, 88],
      },
      {
        id: 'topic-motion',
        label: 'Motion Design',
        subtitle: 'Animações Coreografadas & Web 3D',
        tools: 'GSAP • Three.js • React Three Fiber • Framer Motion',
        description:
          'Dou vida e física às telas com transições sincronizadas, microinterações táteis e experiências tridimensionais imersivas no navegador.',
        y2kGradient:
          'linear-gradient(135deg, #ffbe0b 0%, #fb5607 52%, #3a0ca3 100%)',
        level: 94,
        bars: [84, 92, 96, 90, 94, 88, 95, 92],
      },
    ] as SkillHighlightItem[],
  },
  projects: [
    {
      id: 'aura',
      trackNumber: '01',
      category: 'authorial',
      contextLabel: 'Faixa Autoral // Visualizador Musical',
      title: 'aura',
      description:
        'Sintonizador visual conectado à API do Last.fm que lê o que você está escutando no Spotify e gera uma aura cromática em tempo real.',
      tags: ['React', 'TypeScript', 'GSAP', 'Last.fm API'],
      y2kGradient:
        'linear-gradient(135deg, #ff007f 0%, #7928ca 48%, #00f0ff 100%)',
      discCode: 'CD-01 // AURA',
      liveUrl: 'https://musical-aura.vercell.app/',
      liveLabel: 'Visitar Site',
      repoUrl: 'https://github.com/pepepepu/aura',
    },
    {
      id: 'media',
      trackNumber: '02',
      category: 'authorial',
      contextLabel: 'Faixa Autoral // Cultural Hub',
      title: 'media .',
      description:
        'Dashboard conceitual de identidade cultural que cruza artistas, cinema e estética visual a partir do seu histórico de reprodução.',
      tags: ['Product Design', 'UX/UI', 'Figma', 'Branding'],
      y2kGradient:
        'linear-gradient(135deg, #00f5d4 0%, #00bbf9 50%, #1d3557 100%)',
      discCode: 'CD-02 // MEDIA',
      liveUrl:
        'https://www.behance.net/gallery/241873165/media-Cultural-Identity-Hub-Dashboard',
      liveLabel: 'Ver no Behance',
    },
    {
      id: 'landing-ppage',
      trackNumber: '03',
      category: 'authorial',
      contextLabel: 'Faixa Autoral // High-Conversion Web',
      title: 'landingPPage',
      description:
        'Interface de alta conversão com ritmo visual preciso, animações GSAP encaixadas no scroll e acabamento minimalista.',
      tags: ['React', 'GSAP', 'TypeScript', 'UI/UX', 'Styled Components'],
      y2kGradient:
        'linear-gradient(135deg, #39ff14 0%, #00b4d8 52%, #03045e 100%)',
      discCode: 'CD-03 // LP-PRO',
      liveUrl: 'https://landing-ppage-model.vercel.app/',
      liveLabel: 'Visitar Site',
      repoUrl: 'https://github.com/pepepepu/landing-page.git',
    },
    {
      id: 'zine',
      trackNumber: '04',
      category: 'authorial',
      contextLabel: 'Faixa Autoral // Estúdio DIY & Xerox',
      title: 'Zine',
      description:
        'Editor criativo inspirado nas revistas independentes dos anos 2000, colagens lo-fi em xerox e exportação direta para impressão.',
      tags: ['React', 'GSAP', 'TypeScript', 'UI/UX', 'PDF'],
      y2kGradient:
        'linear-gradient(135deg, #ffbe0b 0%, #ff006e 52%, #3a0ca3 100%)',
      discCode: 'CD-04 // ZINE',
      liveUrl: 'https://make-my-zine.vercel.app/',
      liveLabel: 'Visitar Site',
      repoUrl: 'https://github.com/pepepepu/zine',
    },
    {
      id: 'portal-do-servidor',
      trackNumber: '05',
      category: 'collaborative',
      contextLabel: 'SEAD / ZDoc // Plataforma Web',
      title: 'Portal do Servidor',
      description:
        'Central digital oficial dos servidores públicos de Sergipe: contracheques, requerimentos, serviços funcionais e benefícios.',
      tags: ['React', 'TypeScript', 'UI/UX', 'GovTech'],
      y2kGradient:
        'linear-gradient(135deg, #38bdf8 0%, #1d4ed8 55%, #0f172a 100%)',
      discCode: 'CD-05 // PORTAL',
      liveUrl: 'https://portaldoservidor.sead.se.gov.br',
      liveLabel: 'Visitar Portal',
    },
    {
      id: 'servidor-se-mobile',
      trackNumber: '06',
      category: 'collaborative',
      contextLabel: 'SEAD / ZDoc // App iOS & Android',
      title: 'Servidor.SE',
      description:
        'Edição de bolso para iOS e Android do Portal do Servidor, com carteira funcional digital, avisos e acesso rápido.',
      tags: ['React Native', 'TypeScript', 'Mobile UI', 'iOS & Android'],
      y2kGradient:
        'linear-gradient(135deg, #00f0ff 0%, #3b82f6 50%, #1e1b4b 100%)',
      discCode: 'CD-06 // MOBILE',
      liveUrl: 'https://apps.apple.com/br/app/servidor-se/id6743541650',
      liveLabel: 'Conhecer App',
    },
    {
      id: 'agenda-facil',
      trackNumber: '07',
      category: 'collaborative',
      contextLabel: 'SEAD / ZDoc // Sistema Cidadão',
      title: 'AgendaFácil',
      description:
        'Sistema estadual de agendamento para atendimento nas unidades CEAC em Sergipe, focado em clareza e acessibilidade.',
      tags: ['React', 'TypeScript', 'UI/UX', 'Serviço Público'],
      y2kGradient:
        'linear-gradient(135deg, #4ade80 0%, #0284c7 55%, #0f172a 100%)',
      discCode: 'CD-07 // AGENDA',
      liveUrl: 'https://agendafacil.se.gov.br',
      liveLabel: 'Visitar Site',
    },
    {
      id: 'agenda-facil-admin',
      trackNumber: '08',
      category: 'collaborative',
      contextLabel: 'SEAD / ZDoc // Painel de Controle',
      title: 'AgendaFácil ADMIN',
      description:
        'Console administrativo para controle de vagas, guichês, unidades CEAC e métricas operacionais de atendimento.',
      tags: ['React', 'TypeScript', 'Dashboard', 'Front-End'],
      y2kGradient:
        'linear-gradient(135deg, #a855f7 0%, #4f46e5 52%, #090d16 100%)',
      discCode: 'CD-08 // ADMIN',
      liveUrl: 'https://agendaadmin.se.gov.br',
      liveLabel: 'Visitar Site',
    },
    {
      id: 'sgd-ebserh',
      trackNumber: '09',
      category: 'collaborative',
      contextLabel: 'EBSERH / UFS / FAPESE // Web App',
      title: 'Sistema SGD',
      description:
        'Plataforma de gerenciamento de demandas, cestas de entrega e fluxo de faturamento para projetos hospitalares e acadêmicos.',
      tags: ['React', 'TypeScript', 'Faturamento', 'UI/UX'],
      y2kGradient:
        'linear-gradient(135deg, #f43f5e 0%, #9333ea 52%, #0f172a 100%)',
      discCode: 'CD-09 // SGD',
      liveUrl: 'https://portalsgd.com.br',
      liveLabel: 'Visitar Site',
    },
    {
      id: 'cafe-com-case-13',
      trackNumber: '10',
      category: 'collaborative',
      contextLabel: 'LAWD / UFS // Evento Tech',
      title: '13º Café com Case',
      description:
        'Landing page comemorativa da 13ª edição do evento Café com Case na UFS, produzida junto à Liga Acadêmica LAWD.',
      tags: ['React', 'UI/UX Design', 'Motion', 'LAWD — UFS'],
      y2kGradient:
        'linear-gradient(135deg, #fb923c 0%, #db2777 55%, #1f122b 100%)',
      discCode: 'CD-10 // CAFE',
      liveUrl: '#',
      liveLabel: 'Visitar Site',
    },
  ] as ProjectItem[],
  tracks: [
    {
      id: 'tr-1',
      number: 'Faixa 01 de 04',
      title: 'Cybernetic Chrome',
      artist: 'Pedro Paulo — Pepe',
      album: 'Y2K Portfolio Mixtape',
      duration: 214,
      y2kGradient:
        'linear-gradient(135deg, #00f0ff 0%, #1362d6 52%, #090d16 100%)',
    },
    {
      id: 'tr-2',
      number: 'Faixa 02 de 04',
      title: 'Liquid Crystal Display',
      artist: 'Digital Stereo 2000',
      album: 'Space Gray Sessions',
      duration: 186,
      y2kGradient:
        'linear-gradient(135deg, #ff007f 0%, #7b2cbf 52%, #0f172a 100%)',
    },
    {
      id: 'tr-3',
      number: 'Faixa 03 de 04',
      title: 'Acrylic Jewel Case',
      artist: 'Optical Laser Unit',
      album: 'Compact Disc Era',
      duration: 242,
      y2kGradient:
        'linear-gradient(135deg, #39ff14 0%, #00a878 52%, #051923 100%)',
    },
    {
      id: 'tr-4',
      number: 'Faixa 04 de 04',
      title: 'Subpixel Matrix',
      artist: 'Front-End Synthesizer',
      album: 'Vite + TypeScript',
      duration: 198,
      y2kGradient:
        'linear-gradient(135deg, #ffbe0b 0%, #ff5400 52%, #1b0a00 100%)',
    },
  ] as TrackItem[],
  contact: {
    title: 'Contato // Sync',
    subtitle: 'Conexão Direta via Cabo 30-Pinos',
    message:
      'Sintonize na mesma frequência para criar um novo projeto web, app mobile ou trocar ideias sobre UI/UX, código e movimento.',
    links: [
      {
        id: 'cnt-email',
        label: 'E-mail',
        value: 'pedropaulo127oliveira@gmail.com',
        url: 'mailto:pedropaulo127oliveira@gmail.com',
        protocol: 'SMTP // MAIL',
        y2kGradient:
          'linear-gradient(135deg, #ff0055 0%, #ff6b00 55%, #1a0612 100%)',
      },
      {
        id: 'cnt-github',
        label: 'GitHub',
        value: 'github.com/pepepepu',
        url: 'https://github.com/pepepepu',
        protocol: 'GIT // REPO',
        y2kGradient:
          'linear-gradient(135deg, #00f0ff 0%, #3b82f6 55%, #0f172a 100%)',
      },
      {
        id: 'cnt-linkedin',
        label: 'LinkedIn',
        value: 'linkedin.com/in/pp-oliveira',
        url: 'https://www.linkedin.com/in/pp-oliveira/',
        protocol: 'NET // LINK',
        y2kGradient:
          'linear-gradient(135deg, #38bdf8 0%, #1d4ed8 55%, #0a1128 100%)',
      },
    ] as ContactLinkItem[],
  },
};

export function getProjectDetailActions(project: ProjectItem) {
  const actions: { label: string; type: 'live' | 'repo' | 'back'; url?: string }[] = [];

  if (project.liveUrl && project.liveUrl !== '#') {
    actions.push({
      label: project.liveLabel || 'Visitar Site',
      type: 'live',
      url: project.liveUrl,
    });
  }

  if (project.repoUrl) {
    actions.push({
      label: 'Repositório GitHub',
      type: 'repo',
      url: project.repoUrl,
    });
  }

  actions.push({
    label: 'Voltar para Meus Projetos',
    type: 'back',
  });

  return actions;
}