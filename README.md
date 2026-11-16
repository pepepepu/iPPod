# iPPod // Y2K Portfolio System ;P

Portfólio interativo em 3D inspirado nos reprodutores de MP3 e aparelhos de áudio do final dos anos 2000 e início dos anos 2010. Desenvolvido por **Pedro Paulo (Pepe)** — Engenheiro Front-End & UI/UX Designer.

---

## Visão Geral

O **iPPod** transforma a navegação tradicional de um portfólio em uma experiência física e nostálgica. O usuário interage diretamente com um dispositivo 3D renderizado em tempo real no navegador, equipado com visor LCD de matriz de subpixels, *scanlines*, reflexo de vidro, equalizador gráfico e *Click Wheel* funcional.

### Principais Funcionalidades

- **Hardware 3D Interativo:** Modelo tridimensional construído com Three.js e React Three Fiber, com botões físicos laterais de *Power* e *Volume* (+ / -).
- **Sequência de Boot Autoral:** Animação de inicialização com a assinatura `:P` piscando para `;P` e realinhamento automático de câmera via GSAP.
- **Interface Split-Screen Anos 2010:** Visor dividido com menu de navegação à esquerda e painel de pré-visualização com capas em gradientes Y2K à direita.
- **Customização de Cores Persistente:** Seletor com 6 acabamentos metálicos (*Cinza Espacial*, *Prata Clássico*, *Azul Metálico*, *Verde Y2K*, *Rosa Cyber* e *Vermelho Special*) salvos no `localStorage`.
- **Adaptação Desktop & Mobile:**
  - **Desktop:** Ao ligar o aparelho, a câmera aproxima e alinha o visor LCD, habilitando a navegação completa por teclado ou mouse.
  - **Mobile:** O iPPod permanece em enquadramento completo e travado no centro da tela, permitindo navegar 100% através da *Click Wheel* (toque nos botões ou gesto circular deslizante).

---

## Tecnologias Utilizadas

- **Core:** React 18, TypeScript, Vite
- **Renderização 3D:** Three.js, `@react-three/fiber`, `@react-three/drei`
- **Animações:** GSAP (`gsap`, `@gsap/react`)
- **Estilização:** `styled-components` + CSS Variables
- **Roteamento:** `react-router-dom`
- **Ícones:** `react-icons`

---

## Controles e Navegação

| Ação | Teclado (Desktop) | Hardware 3D / Mobile |
| :--- | :--- | :--- |
| **Ligar / Desligar** | Tecla `P` | Botão lateral direito ou clicar na tela desligada |
| **Subir no Menu** | `Seta para Cima` | Botão esquerdo da *Click Wheel* ou giro anti-horário |
| **Descer no Menu** | `Seta para Baixo` | Botão direito da *Click Wheel* ou giro horário |
| **Selecionar / Abrir** | `Seta para Direita` ou `Enter` | Botão central da *Click Wheel* |
| **Voltar / Menu** | `Seta para Esquerda`, `Backspace` ou `Esc` | Botão `MENU` no topo da *Click Wheel* |
| **Play / Pause** | `Espaço` | Botão inferior da *Click Wheel* |
| **Volume (+ / -)** | — | Botões físicos na lateral esquerda do chassi |

---

## Estrutura de Pastas

```text
src/
├── animations/        # Configurações e utilitários de animação
├── assets/            # Recursos estáticos (imagens, áudios, modelos)
├── components/
│   ├── IPPod3D/       # Chassi 3D, materiais metálicos, botões laterais e Click Wheel
│   └── iPPodScreens/  # Sistema operacional do visor LCD e telas internas
├── content/
│   └── homeContent.ts # Dados centralizados (projetos, bio, faixas, cores e links)
├── pages/
│   └── Home/          # Cenário 3D (Canvas), iluminação de estúdio e seletor de cores
├── routes/
│   └── router.ts      # Configuração de rotas da aplicação
├── styles/
│   ├── reset.css      # Reset global e variáveis CSS Y2K
│   ├── theme.ts       # Tema tipado do styled-components
│   └── styled.d.ts    # Declaração de tipos do tema
├── utils/
│   └── colorStorage.ts# Persistência de cor do iPPod no localStorage
├── App.tsx
└── main.tsx
```

---

## Como Executar Localmente

1. Clone o repositório e acesse a pasta do projeto:

```bash
git clone [https://github.com/pepepepu/portfolio-y2k.git](https://github.com/pepepepu/portfolio-y2k.git)
cd portfolio-y2k
```

2. Instale as dependências:

```bash
npm install
```

3. Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

4. Para gerar a versão de produção:

```bash
npm run build
npm run preview
```

---

## Deploy na Vercel

O projeto já inclui o arquivo `vercel.json` configurado para aplicações Single Page Application (SPA) em Vite:

1. Suba o repositório para o seu GitHub.
2. Acesse a [Vercel](https://vercel.com/) e clique em **Add New Project**.
3. Importe o repositório e clique em **Deploy** (o preset do Vite será detectado automaticamente).

---

## Autor & Contato

**Pedro Paulo (Pepe)**  
Desenvolvedor Front-End & UI/UX Designer

- **E-mail:** [pedropaulo127oliveira@gmail.com](mailto:pedropaulo127oliveira@gmail.com)
- **GitHub:** [github.com/pepepepu](https://github.com/pepepepu)
- **LinkedIn:** [linkedin.com/in/pp-oliveira](https://www.linkedin.com/in/pp-oliveira/)