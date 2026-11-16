import type { ContactLinkItem } from '../types';

export const contactContent = {
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
};