<div align="center">

# `:P` iPPod — 127GB Y2K Series
### **Firmware de Engenharia Front-End & Direção de UI/UX // Pedro Paulo (Pepe)**

![Model](https://img.shields.io/badge/MODEL-A127--Y2K-00f0ff?style=for-the-badge&labelColor=090d16)
![Storage](https://img.shields.io/badge/STORAGE-127GB-39ff14?style=for-the-badge&labelColor=090d16)
![Interface](https://img.shields.io/badge/DOCK-30--PIN_USB_2.0-ff007f?style=for-the-badge&labelColor=090d16)
![Engine](https://img.shields.io/badge/WEBGL-THREE.JS_%2B_R3F-3b82f6?style=for-the-badge&labelColor=090d16)

<p align="center">
  <i>"Operando entre código e direção visual: interfaces digitais com estética afiada, velocidade de resposta e memória afetiva."</i>
</p>

</div>

---

## 💿 01. SYSTEM OVERVIEW // O PROJETO

O **iPPod** é um portfólio interativo tridimensional inspirado nos clássicos tocadores de MP3 e na estética cromada dos anos 2000 (**Y2K**). Em vez de uma página estática tradicional, toda a experiência acontece dentro (e ao redor) de um dispositivo portátil renderizado em tempo real no navegador.

Quando desligado no Desktop, o **iPPod** flutua em um estúdio 3D onde pode ser girado em 360°, trocado de cor e customizado com adesivos holográficos de papel-plástico que dobram na curvatura da carcaça e reagem à luz. Ao apertar **`[P]`** (ou o botão físico de *Power* no topo do chassi), a câmera aproxima o dispositivo, o sistema executa a sequência de boot `:P` e libera a navegação completa pela **Click Wheel**.

---

## ⚡ 02. HARDWARE & FIRMWARE SPECS // FUNCIONALIDADES

* **Chassi 3D & Gravação a Laser (`DeviceBody`):** Modelagem procedural em *React Three Fiber* com iluminação de estúdio, botões físicos de volume/energia e gravação traseira em relevo (`bumpMap`) com o selo `:P`, **iPPod** e capacidade **127GB**.
* **Cartela de Adesivos Holográficos (`StickerAlbum`):**
  * **Desktop:** Cartela interativa estilo anos 2000 ancorada no canto inferior esquerdo. Ao puxar um adesivo (*peel-off*), você pode arrastá-lo e colá-lo em qualquer parte livre da frente, traseira ou borda da tela. A malha 3D (`FoldedStickerMesh`) calcula a curvatura do chassi para dobrar o adesivo nas quinas sem nunca invadir o vidro do visor LCD, utilizando `<meshPhysicalMaterial>` com iridescência e verniz (*clearcoat*).
  * **Mobile:** No primeiro acesso mobile, o sistema sorteia automaticamente um preset de cor e gera uma colagem procedural exclusiva de adesivos ao redor da *Click Wheel* e na moldura da tela, salvando a identidade única do aparelho no `localStorage`.
* **6 Acabamentos Metálicos (`ColorPicker`):** Troca instantânea de chassi com persistência local entre *Cinza Espacial*, *Prata Clássico*, *Azul Metálico*, *Verde Y2K*, *Rosa Cyber* e *Vermelho Special*.
* **Live Sync Musical (`Last.fm` + `iTunes Preview API`):** A tela **Tocando Agora** sincroniza em tempo real o que estou escutando no Spotify via **Last.fm** e encadeia uma busca automática na API da **Apple Music / iTunes** para reproduzir a prévia real de 30 segundos da faixa (com sintetizador *Web Audio API* nativo de fallback), permitindo avançar, retroceder e pausar o áudio direto pela *Click Wheel* ou pelos botões em tela.
* **Dual View Responsiva (`WebView` & `MobileView`):** Palco WebGL 3D completo no Desktop e versão *Full-Bleed Virtual Device* no Mobile com suporte a gestos circulares de toque na *Click Wheel*.

---

## 🎛️ 03. CONTROLES & NAVEGAÇÃO

| Ação | Atalho de Teclado (Desktop) | Click Wheel / Hardware |
| :--- | :---: | :---: |
| **Ligar / Desligar Sistema** | `Tecla P` | Botão superior direito do chassi / Centro (quando desligado) |
| **Navegar na Lista / Scrubbing (`-3s` / `+3s`)** | `↑` / `↓` | Girar a Click Wheel (ou botões `\|<<` e `>>\|`) |
| **Selecionar / Abrir Item** | `→` ou `Enter` | Botão Central da Click Wheel |
| **Voltar ao Menu Anterior** | `←`, `Backspace` ou `Esc` | Botão `MENU` (topo da Click Wheel) |
| **Play / Pause da Prévia Musical** | `Espaço` | Botão `▶\|\|` (base da Click Wheel) |
| **Volume (`+10%` / `-10%`)** | — | Botões laterais esquerdos do chassi 3D |

---

## 💽 04. DISCOGRAFIA // FAIXAS NO SISTEMA (`11 TRACKS`)

1. **`CD-01 // AURA`** — *aura*: Sintonizador visual conectado à API do Last.fm que lê o que você está escutando no Spotify e gera uma aura cromática em tempo real.
2. **`CD-02 // GAP`** — *gap[]*: Editor de fotos conceitual que permite fatiar imagens em recortes customizados e embuti-los diretamente no fluxo de composições textuais.
3. **`CD-03 // MEDIA`** — *media .*: Dashboard conceitual de identidade cultural que cruza artistas, cinema e estética visual.
4. **`CD-04 // LP-PRO`** — *landingPPage*: Interface de alta conversão com animações GSAP sincronizadas no scroll.
5. **`CD-05 // ZINE`** — *Zine*: Estúdio criativo DIY inspirado em fanzines e colagens xerox dos anos 2000 com exportação para PDF.
6. **`CD-06 // PORTAL`** — *Portal do Servidor (SEAD/ZDoc)*: Plataforma web oficial dos servidores públicos de Sergipe.
7. **`CD-07 // MOBILE`** — *Servidor.SE (SEAD/ZDoc)*: App iOS e Android do Portal do Servidor com carteira funcional digital.
8. **`CD-08 // AGENDA`** — *AgendaFácil (SEAD/ZDoc)*: Sistema estadual de agendamento para atendimento cidadão nas unidades CEAC.
9. **`CD-09 // ADMIN`** — *AgendaFácil ADMIN (SEAD/ZDoc)*: Console administrativo para gestão de vagas, guichês e métricas CEAC.
10. **`CD-10 // SGD`** — *Sistema SGD (EBSERH/UFS/FAPESE)*: Plataforma de gestão de demandas, cestas de entrega e fluxo de faturamento hospitalar e acadêmico.
11. **`CD-11 // CAFE`** — *13º Café com Case (LAWD/UFS)*: Landing page comemorativa produzida junto à Liga Acadêmica de Desenvolvimento Web da UFS.

---

## 🛠️ 05. ESPECIFICAÇÕES TÉCNICAS // TECH STACK

* **Core:** React + TypeScript + Vite
* **3D & Shaders:** Three.js + React Three Fiber (`@react-three/fiber`) + Drei (`@react-three/drei`)
* **Motion & Física de Câmera:** GSAP (GreenSock)
* **Estilização:** Styled Components + Design Tokens Y2K (`Orbitron`, `VT323`, `Tahoma`)
* **Áudio & Integrações:** Last.fm Scrobbler API + iTunes Search API + HTML5 Audio / Web Audio API
* **Persistência:** Web Storage API (`localStorage` isolado por plataforma)

---

## 📂 06. ARQUITETURA DE DIRETÓRIOS

```text
src/
├── components/
│   ├── ColorPicker/         # Seletor de cores metálicas do chassi
│   ├── DeviceBody/          # Malha 3D do iPPod, botões físicos e FoldedStickerMesh
│   ├── MobileClickWheel/    # Click Wheel tátil 2D e adesivos na view mobile
│   ├── ScreenArea/          # Moldura LCD, barra de status, HUD de volume e boot :P
│   ├── ScreenContent/       # Telas internas (01-home a 07-contact)
│   ├── StatusHeader/        # Badge superior de status (ONLINE / OFFLINE)
│   ├── StickerAlbum/        # Cartela Y2K animada com drag-and-drop e peel-off
│   └── StudioStage3D/       # Palco Three.js, iluminação Studio e OrbitControls
├── content/
│   ├── sections/            # Dados modulares (device, about, skills, projects, stickers, tracks, contact)
│   ├── homeContent.ts       # Agregador central de conteúdo
│   └── types.ts             # Contratos e interfaces TypeScript
├── hooks/
│   ├── useDeviceBody.ts     # Animações GSAP de câmera, Raycaster 3D de adesivos e giro da Wheel
│   └── useHome.ts           # Estado global do iPPod, áudio HTML5, teclado e Last.fm polling
├── pages/
│   ├── Home/                # Ponto de entrada e estilos base do viewport
│   └── Views/               # Separação entre webView.tsx (3D) e mobileView.tsx (Virtual)
├── routes/                  # Configuração do React Router
├── styles/                  # Theme tokens, tipografia e CSS Reset
└── utils/
    ├── colorStorage.ts      # Persistência de cor (manual no Desktop / sorteada no Mobile)
    ├── lastFMServices.ts    # Integração Last.fm + prévia de áudio iTunes + fallback WAV synth
    ├── stickerCanvas.ts     # Geração procedural 2D/3D dos adesivos e relevo traseiro
    └── stickerStorage.ts    # Persistência e distribuição procedural de adesivos
```

---

## 🔌 07. 30-PIN SYNC // COMO EXECUTAR LOCALMENTE

1. **Clone o repositório e instale as dependências:**
   ```bash
   git clone https://github.com/pepepepu/ippod.git
   cd ippod
   npm install
   ```

2. **Configure as variáveis de ambiente (opcional para sincronização ao vivo com o Last.fm):**
   Crie um arquivo `.env` na raiz do projeto:
   ```env
   VITE_LASTFM_API_KEY=sua_api_key_do_lastfm
   VITE_LASTFM_USERNAME=seu_usuario_do_lastfm
   ```
   *(Caso não sejam informadas, o iPPod utiliza automaticamente a faixa autoral de fallback com áudio sintetizado via Web Audio API).*

3. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```

---

<div align="center">

**Designed & Engineered by Pedro Paulo (Pepe) in Sergipe, Brazil**  
`Serial No. Y2K-PEPE-127GB • CE FC`

[![GitHub](https://img.shields.io/badge/GITHUB-pepepepu-14181f?style=flat-square&logo=github)](https://github.com/pepepepu)
[![LinkedIn](https://img.shields.io/badge/LINKEDIN-pp--oliveira-1362d6?style=flat-square&logo=linkedin)](https://www.linkedin.com/in/pp-oliveira/)
[![E-mail](https://img.shields.io/badge/EMAIL-pedropaulo127oliveira%40gmail.com-ff0055?style=flat-square&logo=gmail)](mailto:pedropaulo127oliveira@gmail.com)

</div>