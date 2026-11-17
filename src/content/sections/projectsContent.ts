import type { ProjectItem } from '../types';

export const projectsContent: ProjectItem[] = [
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
    liveUrl: 'https://aaauraaa.vercel.app',
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
];

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