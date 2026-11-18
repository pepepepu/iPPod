<div align="center">

# `:P` iPPod — 127GB Y2K Series
### **Firmware de Engenharia Front-End & Direção de UI/UX // Pedro Paulo (Pepe)**

![Model](https://img.shields.io/badge/MODEL-A127--Y2K-00f0ff?style=for-the-badge&labelColor=090d16)
![Storage](https://img.shields.io/badge/STORAGE-127GB-39ff14?style=for-the-badge&labelColor=090d16)
![Interface](https://img.shields.io/badge/DOCK-30--PIN_USB_2.0-ff007f?style=for-the-badge&labelColor=090d16)
![Engine](https://img.shields.io/badge/WEBGL-THREE.JS_%2B_R3F-3b82f6?style=for-the-badge&labelColor=090d16)

![Mood](https://img.shields.io/badge/AESTHETIC-CYBER_Y2K_%E2%9C%A6_CHROME-d946ef?style=flat-square&labelColor=1e1b4b)
![Audio](https://img.shields.io/badge/AUDIO-LIVE_LAST.FM_%2B_30S_PREVIEW-facc15?style=flat-square&labelColor=090d16)
![Stickers](https://img.shields.io/badge/STICKERS-HOLOGRAPHIC_FOIL-00f5d4?style=flat-square&labelColor=090d16)
![Vibe](https://img.shields.io/badge/MOOD-I_%E2%99%A5_CODE_%26_MUSIC-ff2a85?style=flat-square&labelColor=090d16)
![Status](https://img.shields.io/badge/BATTERY-100%25_CHARGED-4ade80?style=flat-square&labelColor=052e16)

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
  ![I Love Code](https://img.shields.io/badge/STICKER-I_%E2%99%A5_CODE-ff2a85?style=flat-square&labelColor=ffffff)
  ![I Love Music](https://img.shields.io/badge/STICKER-I_%E2%99%A5_MUSIC-ef4444?style=flat-square&labelColor=e0f2fe)
  ![Smiley :P](https://img.shields.io/badge/STICKER-:P_SMILEY-facc15?style=flat-square&labelColor=090d16)
  ![Compact Disc](https://img.shields.io/badge/STICKER-COMPACT_DISC_%E2%97%8E-00f0ff?style=flat-square&labelColor=cbd5e1)
  ![Music Notes](https://img.shields.io/badge/STICKER-NOTES_%E2%99%AB%E2%99%AA-8b5cf6?style=flat-square&labelColor=ec4899)
  ![Now Let's Code](https://img.shields.io/badge/STICKER-NOW_LET'S_CODE_%E2%9C%A6-39ff14?style=flat-square&labelColor=111827)
  ![DJ Turntable](https://img.shields.io/badge/STICKER-DJ_DECK-38bdf8?style=flat-square&labelColor=1e1b4b)
  ![Equalizer Bars](https://img.shields.io/badge/STICKER-EQ_BARS-22c55e?style=flat-square&labelColor=0f172a)

  * **Desktop:** Cartela interativa estilo anos 2000 ancorada no canto inferior esquerdo. Ao puxar um adesivo (*peel-off*), você pode arrastá-lo e colá-lo em qualquer parte livre da frente, traseira ou borda da tela. A malha 3D (`FoldedStickerMesh`) calcula a curvatura do chassi para dobrar o adesivo nas quinas sem nunca invadir o vidro do visor LCD, utilizando `<meshPhysicalMaterial>` com iridescência e verniz (*clearcoat*).
  * **Mobile:** No primeiro acesso mobile, o sistema sorteia automaticamente um preset de cor e gera uma colagem procedural exclusiva de adesivos ao redor da *Click Wheel* e na moldura da tela, salvando a identidade única do aparelho no `localStorage`.

* **6 Acabamentos Metálicos (`ColorPicker`):**
  ![Space Gray](https://img.shields.io/badge/CHASSIS-CINZA_ESPACIAL-4d5259?style=flat-square&labelColor=1b1d21)
  ![Silver Classic](https://img.shields.io/badge/CHASSIS-PRATA_CL%C3%81SSICO-cfd5df?style=flat-square&labelColor=475569)
  ![Midnight Blue](https://img.shields.io/badge/CHASSIS-AZUL_MET%C3%81LICO-1f3a60?style=flat-square&labelColor=111c2d)
  ![Y2K Lime](https://img.shields.io/badge/CHASSIS-VERDE_Y2K-65a30d?style=flat-square&labelColor=1a2e05)
  ![Cyber Pink](https://img.shields.io/badge/CHASSIS-ROSA_CYBER-be185d?style=flat-square&labelColor=2e0716)
  ![Crimson Red](https://img.shields.io/badge/CHASSIS-VERMELHO_SPECIAL-b91c1c?style=flat-square&labelColor=1f0808)

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

1. ![CD-01](https://img.shields.io/badge/CD--01-AURA-ff007f?style=flat-square&labelColor=090d16) ![Autoral](https://img.shields.io/badge/FAIXA-AUTORAL-00f0ff?style=flat-square&labelColor=1e1b4b) — **aura**: Sintonizador visual conectado à API do Last.fm que lê o que você está escutando no Spotify e gera uma aura cromática em tempo real.
2. ![CD-02](https://img.shields.io/badge/CD--02-GAP%5B%5D-39ff14?style=flat-square&labelColor=090d16) ![Autoral](https://img.shields.io/badge/FAIXA-AUTORAL-3b82f6?style=flat-square&labelColor=0f172a) — **gap\[\]**: Editor de fotos conceitual que permite fatiar imagens em recortes customizados e embuti-los diretamente no fluxo de composições textuais.
3. ![CD-03](https://img.shields.io/badge/CD--03-MEDIA_.-00f5d4?style=flat-square&labelColor=090d16) ![Autoral](https://img.shields.io/badge/FAIXA-AUTORAL-00bbf9?style=flat-square&labelColor=1d3557) — **media .**: Dashboard conceitual de identidade cultural que cruza artistas, cinema e estética visual.
4. ![CD-04](https://img.shields.io/badge/CD--04-LP--PRO-39ff14?style=flat-square&labelColor=090d16) ![Autoral](https://img.shields.io/badge/FAIXA-AUTORAL-00b4d8?style=flat-square&labelColor=03045e) — **landingPPage**: Interface de alta conversão com animações GSAP sincronizadas no scroll.
5. ![CD-05](https://img.shields.io/badge/CD--05-ZINE-ffbe0b?style=flat-square&labelColor=090d16) ![Autoral](https://img.shields.io/badge/FAIXA-AUTORAL-ff006e?style=flat-square&labelColor=3a0ca3) — **Zine**: Estúdio criativo DIY inspirado em fanzines e colagens xerox dos anos 2000 com exportação para PDF.
6. ![CD-06](https://img.shields.io/badge/CD--06-PORTAL-38bdf8?style=flat-square&labelColor=090d16) ![Colab](https://img.shields.io/badge/SEAD_%2F_ZDOC-GOVTECH-1d4ed8?style=flat-square&labelColor=0f172a) — **Portal do Servidor**: Plataforma web oficial dos servidores públicos de Sergipe.
7. ![CD-07](https://img.shields.io/badge/CD--07-MOBILE-00f0ff?style=flat-square&labelColor=090d16) ![Colab](https://img.shields.io/badge/SEAD_%2F_ZDOC-iOS_%26_ANDROID-3b82f6?style=flat-square&labelColor=1e1b4b) — **Servidor.SE**: App iOS e Android do Portal do Servidor com carteira funcional digital.
8. ![CD-08](https://img.shields.io/badge/CD--08-AGENDA-4ade80?style=flat-square&labelColor=090d16) ![Colab](https://img.shields.io/badge/SEAD_%2F_ZDOC-CEAC-0284c7?style=flat-square&labelColor=0f172a) — **AgendaFácil**: Sistema estadual de agendamento para atendimento cidadão nas unidades CEAC.
9. ![CD-09](https://img.shields.io/badge/CD--09-ADMIN-a855f7?style=flat-square&labelColor=090d16) ![Colab](https://img.shields.io/badge/SEAD_%2F_ZDOC-DASHBOARD-4f46e5?style=flat-square&labelColor=090d16) — **AgendaFácil ADMIN**: Console administrativo para gestão de vagas, guichês e métricas CEAC.
10. ![CD-10](https://img.shields.io/badge/CD--10-SGD-f43f5e?style=flat-square&labelColor=090d16) ![Colab](https://img.shields.io/badge/EBSERH_%2F_UFS-WEB_APP-9333ea?style=flat-square&labelColor=0f172a) — **Sistema SGD**: Plataforma de gestão de demandas, cestas de entrega e fluxo de faturamento hospitalar e acadêmico.
11. ![CD-11](https://img.shields.io/badge/CD--11-CAFE-fb923c?style=flat-square&labelColor=090d16) ![Colab](https://img.shields.io/badge/LAWD_%2F_UFS-EVENTO_TECH-db2777?style=flat-square&labelColor=1f122b) — **13º Café com Case**: Landing page comemorativa produzida junto à Liga Acadêmica de Desenvolvimento Web da UFS.

---

## 🛠️ 05. ESPECIFICAÇÕES TÉCNICAS // TECH STACK

<div align="center">

![React](https://img.shields.io/badge/REACT_19-61DAFB?style=for-the-badge&logo=react&logoColor=090d16&labelColor=090d16)
![TypeScript](https://img.shields.io/badge/TYPESCRIPT-3178C6?style=for-the-badge&logo=typescript&logoColor=ffffff&labelColor=090d16)
![Vite](https://img.shields.io/badge/VITE-646CFF?style=for-the-badge&logo=vite&logoColor=ffffff&labelColor=090d16)
![Three.js](https://img.shields.io/badge/THREE.JS-00f0ff?style=for-the-badge&logo=threedotjs&logoColor=ffffff&labelColor=090d16)
![R3F](https://img.shields.io/badge/REACT_THREE_FIBER-ff007f?style=for-the-badge&labelColor=090d16)
![GSAP](https://img.shields.io/badge/GSAP_MOTION-39ff14?style=for-the-badge&logo=greensock&logoColor=39ff14&labelColor=090d16)
![Styled Components](https://img.shields.io/badge/STYLED_COMPONENTS-DB7093?style=for-the-badge&logo=styled-components&logoColor=ffffff&labelColor=090d16)
![Last.fm](https://img.shields.io/badge/LAST.FM_API-D51007?style=for-the-badge&logo=lastdotfm&logoColor=ffffff&labelColor=090d16)
![iTunes API](https://img.shields.io/badge/ITUNES_AUDIO_STREAM-c084fc?style=for-the-badge&logo=applemusic&logoColor=ffffff&labelColor=090d16)

</div>

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

![Tag :P](https://img.shields.io/badge/MADE_WITH-:P_ENERGY-facc15?style=flat-square&labelColor=090d16)
![Y2K Bug](https://img.shields.io/badge/Y2K_COMPLIANT-2000s_CERTIFIED-00f0ff?style=flat-square&labelColor=090d16)
![Sergipe](https://img.shields.io/badge/DESIGNED_IN-SERGIPE%2C_BR-39ff14?style=flat-square&labelColor=090d16)

**Designed & Engineered by Pedro Paulo (Pepe) in Sergipe, Brazil**  
`Serial No. Y2K-PEPE-127GB • CE FC`

[![GitHub](https://img.shields.io/badge/GITHUB-pepepepu-00f0ff?style=for-the-badge&logo=github&logoColor=ffffff&labelColor=090d16)](https://github.com/pepepepu)
[![LinkedIn](https://img.shields.io/badge/LINKEDIN-pp--oliveira-3b82f6?style=for-the-badge&logo=linkedin&logoColor=ffffff&labelColor=090d16)](https://www.linkedin.com/in/pp-oliveira/)
[![E-mail](https://img.shields.io/badge/EMAIL-pedropaulo127oliveira%40gmail.com-ff007f?style=for-the-badge&logo=gmail&logoColor=ffffff&labelColor=090d16)](mailto:pedropaulo127oliveira@gmail.com)

</div>