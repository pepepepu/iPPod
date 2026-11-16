import type { SkillHighlightItem } from '../types';

export const whatIDoContent = {
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
};