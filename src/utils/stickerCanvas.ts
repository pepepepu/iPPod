import { CanvasTexture, LinearFilter, SRGBColorSpace } from 'three';

const dataUrlCache = new Map<string, string>();
const textureCache = new Map<
  string,
  { map: CanvasTexture; bumpMap: CanvasTexture; iridescenceMap: CanvasTexture }
>();

function addHolographicFoilSheen(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number
) {
  ctx.save();
  const holo = ctx.createLinearGradient(x, y, x + w, y + h);
  holo.addColorStop(0, 'rgba(255, 255, 255, 0.25)');
  holo.addColorStop(0.25, 'rgba(0, 240, 255, 0.18)');
  holo.addColorStop(0.5, 'rgba(255, 0, 128, 0.16)');
  holo.addColorStop(0.75, 'rgba(57, 255, 20, 0.15)');
  holo.addColorStop(1, 'rgba(255, 255, 255, 0.28)');
  ctx.fillStyle = holo;
  ctx.fillRect(x, y, w, h);

  const gloss = ctx.createLinearGradient(x, y, x + w * 0.4, y + h * 0.65);
  gloss.addColorStop(0, 'rgba(255, 255, 255, 0.55)');
  gloss.addColorStop(0.45, 'rgba(255, 255, 255, 0.12)');
  gloss.addColorStop(0.5, 'rgba(255, 255, 255, 0)');
  ctx.fillStyle = gloss;
  ctx.fillRect(x, y, w, h);
  ctx.restore();
}

function drawRoundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function drawHeartPath(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  size: number
) {
  ctx.beginPath();
  ctx.moveTo(cx, cy + size * 0.65);
  ctx.bezierCurveTo(
    cx - size * 1.1,
    cy + size * 0.1,
    cx - size * 0.9,
    cy - size * 0.75,
    cx,
    cy - size * 0.25
  );
  ctx.bezierCurveTo(
    cx + size * 0.9,
    cy - size * 0.75,
    cx + size * 1.1,
    cy + size * 0.1,
    cx,
    cy + size * 0.65
  );
  ctx.closePath();
}

function drawStarBurst(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  spikes: number,
  outerR: number,
  innerR: number
) {
  let rot = (Math.PI / 2) * 3;
  const step = Math.PI / spikes;
  ctx.beginPath();
  ctx.moveTo(cx, cy - outerR);
  for (let i = 0; i < spikes; i += 1) {
    ctx.lineTo(cx + Math.cos(rot) * outerR, cy + Math.sin(rot) * outerR);
    rot += step;
    ctx.lineTo(cx + Math.cos(rot) * innerR, cy + Math.sin(rot) * innerR);
    rot += step;
  }
  ctx.closePath();
}

function renderStickerArtwork(
  ctx: CanvasRenderingContext2D,
  stickerId: string
) {
  const size = 512;
  ctx.clearRect(0, 0, size, size);
  ctx.save();
  ctx.scale(2, 2);

  ctx.shadowColor = 'rgba(0, 0, 0, 0.28)';
  ctx.shadowBlur = 6;
  ctx.shadowOffsetY = 2;

  if (stickerId === 'stk-i-love-code') {
    drawRoundedRect(ctx, 22, 22, 212, 212, 42);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
    ctx.shadowColor = 'transparent';

    drawRoundedRect(ctx, 34, 34, 188, 188, 32);
    const grad = ctx.createLinearGradient(34, 34, 222, 222);
    grad.addColorStop(0, '#ff2a85');
    grad.addColorStop(0.5, '#ff66b2');
    grad.addColorStop(1, '#c026d3');
    ctx.fillStyle = grad;
    ctx.fill();
    ctx.lineWidth = 4;
    ctx.strokeStyle = '#0f172a';
    ctx.stroke();

    ctx.save();
    ctx.clip();
    addHolographicFoilSheen(ctx, 34, 34, 188, 188);
    ctx.restore();

    ctx.fillStyle = '#ffffff';
    ctx.font = '900 56px Orbitron, Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('I', 80, 114);

    drawHeartPath(ctx, 152, 92, 35);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#0f172a';
    ctx.stroke();

    ctx.fillStyle = '#ffffff';
    ctx.font = '900 42px Orbitron, Arial, sans-serif';
    ctx.fillText('CODE', 128, 184);
  } else if (stickerId === 'stk-i-love-music') {
    drawRoundedRect(ctx, 22, 30, 212, 196, 36);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
    ctx.shadowColor = 'transparent';

    drawRoundedRect(ctx, 34, 42, 188, 172, 26);
    const grad = ctx.createLinearGradient(34, 42, 222, 214);
    grad.addColorStop(0, '#f8fafc');
    grad.addColorStop(0.5, '#e0f2fe');
    grad.addColorStop(1, '#f3e8ff');
    ctx.fillStyle = grad;
    ctx.fill();
    ctx.lineWidth = 5;
    ctx.strokeStyle = '#0f172a';
    ctx.stroke();

    ctx.save();
    ctx.clip();
    addHolographicFoilSheen(ctx, 34, 42, 188, 172);
    ctx.restore();

    ctx.fillStyle = '#0f172a';
    ctx.font = '900 62px Orbitron, Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('I', 74, 124);

    drawHeartPath(ctx, 150, 98, 36);
    ctx.fillStyle = '#ef4444';
    ctx.fill();
    ctx.lineWidth = 3.5;
    ctx.strokeStyle = '#0f172a';
    ctx.stroke();

    ctx.fillStyle = '#0f172a';
    ctx.font = '900 35px Orbitron, Arial, sans-serif';
    ctx.fillText('MUSIC', 128, 184);
  } else if (stickerId === 'stk-smiley-pepe') {
    ctx.beginPath();
    ctx.arc(128, 128, 104, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
    ctx.shadowColor = 'transparent';

    ctx.beginPath();
    ctx.arc(128, 128, 91, 0, Math.PI * 2);
    const grad = ctx.createRadialGradient(100, 92, 12, 128, 128, 91);
    grad.addColorStop(0, '#fef08a');
    grad.addColorStop(0.55, '#facc15');
    grad.addColorStop(1, '#eab308');
    ctx.fillStyle = grad;
    ctx.fill();
    ctx.lineWidth = 5;
    ctx.strokeStyle = '#0f172a';
    ctx.stroke();

    ctx.save();
    ctx.clip();
    addHolographicFoilSheen(ctx, 36, 36, 184, 184);
    ctx.restore();

    ctx.save();
    ctx.translate(128, 128);
    ctx.rotate(Math.PI / 2);
    ctx.fillStyle = '#0f172a';
    ctx.font = '900 82px Orbitron, Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(':P', 0, 4);
    ctx.restore();
  } else if (stickerId === 'stk-cd-disc') {
    ctx.beginPath();
    ctx.arc(128, 128, 106, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
    ctx.shadowColor = 'transparent';

    ctx.save();
    ctx.beginPath();
    ctx.arc(128, 128, 94, 0, Math.PI * 2);
    ctx.clip();

    const baseGrad = ctx.createLinearGradient(34, 34, 222, 222);
    baseGrad.addColorStop(0, '#e2e8f0');
    baseGrad.addColorStop(0.25, '#ffffff');
    baseGrad.addColorStop(0.5, '#cbd5e1');
    baseGrad.addColorStop(0.75, '#f8fafc');
    baseGrad.addColorStop(1, '#94a3b8');
    ctx.fillStyle = baseGrad;
    ctx.fillRect(34, 34, 188, 188);

    const prism1 = ctx.createLinearGradient(34, 128, 222, 128);
    prism1.addColorStop(0, 'rgba(0, 240, 255, 0.55)');
    prism1.addColorStop(0.3, 'rgba(255, 0, 128, 0.45)');
    prism1.addColorStop(0.5, 'rgba(255, 255, 255, 0.8)');
    prism1.addColorStop(0.7, 'rgba(57, 255, 20, 0.45)');
    prism1.addColorStop(1, 'rgba(99, 102, 241, 0.55)');
    ctx.fillStyle = prism1;
    ctx.fillRect(34, 34, 188, 188);

    addHolographicFoilSheen(ctx, 34, 34, 188, 188);
    ctx.restore();

    ctx.beginPath();
    ctx.arc(128, 128, 94, 0, Math.PI * 2);
    ctx.lineWidth = 4;
    ctx.strokeStyle = '#0f172a';
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(128, 128, 32, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(241, 245, 249, 0.9)';
    ctx.fill();
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#475569';
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(128, 128, 13, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#0f172a';
    ctx.stroke();
  } else if (stickerId === 'stk-music-notes') {
    drawRoundedRect(ctx, 24, 24, 208, 208, 52);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
    ctx.shadowColor = 'transparent';

    drawRoundedRect(ctx, 36, 36, 184, 184, 42);
    const grad = ctx.createLinearGradient(36, 36, 220, 220);
    grad.addColorStop(0, '#8b5cf6');
    grad.addColorStop(0.5, '#ec4899');
    grad.addColorStop(1, '#3b82f6');
    ctx.fillStyle = grad;
    ctx.fill();
    ctx.lineWidth = 4.5;
    ctx.strokeStyle = '#0f172a';
    ctx.stroke();

    ctx.save();
    ctx.clip();
    addHolographicFoilSheen(ctx, 36, 36, 184, 184);
    ctx.restore();

    ctx.strokeStyle = '#0f172a';
    ctx.fillStyle = '#ffffff';
    ctx.lineWidth = 5;

    ctx.beginPath();
    ctx.ellipse(88, 166, 22, 16, -0.3, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.ellipse(162, 152, 22, 16, -0.3, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(104, 162);
    ctx.lineTo(104, 82);
    ctx.lineTo(178, 68);
    ctx.lineTo(178, 148);
    ctx.lineWidth = 10;
    ctx.strokeStyle = '#0f172a';
    ctx.stroke();

    ctx.lineWidth = 6;
    ctx.strokeStyle = '#ffffff';
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(104, 102);
    ctx.lineTo(178, 88);
    ctx.lineWidth = 8;
    ctx.strokeStyle = '#ffffff';
    ctx.stroke();
  } else if (stickerId === 'stk-lets-code-star') {
    drawStarBurst(ctx, 128, 128, 9, 114, 68);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
    ctx.shadowColor = 'transparent';

    drawStarBurst(ctx, 128, 128, 9, 102, 58);
    const grad = ctx.createLinearGradient(26, 26, 230, 230);
    grad.addColorStop(0, '#111827');
    grad.addColorStop(0.5, '#1e293b');
    grad.addColorStop(1, '#090d16');
    ctx.fillStyle = grad;
    ctx.fill();
    ctx.lineWidth = 4;
    ctx.strokeStyle = '#facc15';
    ctx.stroke();

    ctx.save();
    ctx.clip();
    addHolographicFoilSheen(ctx, 26, 26, 204, 204);
    ctx.restore();

    ctx.textAlign = 'center';
    ctx.font = '900 26px Orbitron, Arial, sans-serif';
    ctx.fillStyle = '#ff2a85';
    ctx.fillText('NOW', 128, 104);
    ctx.fillStyle = '#38bdf8';
    ctx.fillText("LET'S", 128, 134);
    ctx.fillStyle = '#39ff14';
    ctx.fillText('CODE', 128, 164);
  } else if (stickerId === 'stk-dj-deck') {
    drawRoundedRect(ctx, 18, 36, 220, 184, 28);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
    ctx.shadowColor = 'transparent';

    drawRoundedRect(ctx, 30, 48, 196, 160, 18);
    const grad = ctx.createLinearGradient(30, 48, 226, 208);
    grad.addColorStop(0, '#00b4d8');
    grad.addColorStop(0.5, '#38bdf8');
    grad.addColorStop(1, '#0284c7');
    ctx.fillStyle = grad;
    ctx.fill();
    ctx.lineWidth = 4;
    ctx.strokeStyle = '#0f172a';
    ctx.stroke();

    ctx.save();
    ctx.clip();
    addHolographicFoilSheen(ctx, 30, 48, 196, 160);
    ctx.restore();

    ctx.beginPath();
    ctx.arc(112, 128, 58, 0, Math.PI * 2);
    ctx.fillStyle = '#1e1b4b';
    ctx.fill();
    ctx.lineWidth = 4;
    ctx.strokeStyle = '#fde047';
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(112, 128, 20, 0, Math.PI * 2);
    ctx.fillStyle = '#facc15';
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(192, 74);
    ctx.lineTo(182, 148);
    ctx.lineTo(156, 162);
    ctx.lineWidth = 7;
    ctx.strokeStyle = '#e2e8f0';
    ctx.stroke();
  } else {
    drawRoundedRect(ctx, 16, 46, 224, 168, 24);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
    ctx.shadowColor = 'transparent';

    drawRoundedRect(ctx, 26, 56, 204, 148, 16);
    ctx.fillStyle = '#0f172a';
    ctx.fill();

    const barHeights = [6, 4, 7, 5, 3, 6, 4, 7];
    const barColors = [
      '#ef4444',
      '#f97316',
      '#eab308',
      '#22c55e',
      '#06b6d4',
      '#3b82f6',
      '#8b5cf6',
      '#ec4899',
    ];
    const startX = 34;
    const barW = 20;
    const gap = 4;
    barHeights.forEach((blocks, colIdx) => {
      const bx = startX + colIdx * (barW + gap);
      for (let b = 0; b < blocks; b += 1) {
        const by = 182 - b * 16;
        ctx.fillStyle = barColors[(b + colIdx) % barColors.length];
        ctx.fillRect(bx, by, barW, 12);
      }
    });

    ctx.save();
    drawRoundedRect(ctx, 26, 56, 204, 148, 16);
    ctx.clip();
    addHolographicFoilSheen(ctx, 26, 56, 204, 148);
    ctx.restore();
  }

  ctx.restore();
}

export function getStickerDataUrl(stickerId: string): string {
  const cached = dataUrlCache.get(stickerId);
  if (cached) return cached;

  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    renderStickerArtwork(ctx, stickerId);
  }
  const url = canvas.toDataURL('image/png');
  dataUrlCache.set(stickerId, url);
  return url;
}

export function getSticker3DTextures(stickerId: string): {
  map: CanvasTexture;
  bumpMap: CanvasTexture;
  iridescenceMap: CanvasTexture;
} {
  const cached = textureCache.get(stickerId);
  if (cached) return cached;

  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    renderStickerArtwork(ctx, stickerId);
  }

  const bumpCanvas = document.createElement('canvas');
  bumpCanvas.width = 512;
  bumpCanvas.height = 512;
  const bCtx = bumpCanvas.getContext('2d');
  if (bCtx) {
    bCtx.fillStyle = '#000000';
    bCtx.fillRect(0, 0, 512, 512);
    bCtx.drawImage(canvas, 0, 0);
  }

  const iridCanvas = document.createElement('canvas');
  iridCanvas.width = 512;
  iridCanvas.height = 512;
  const iCtx = iridCanvas.getContext('2d');
  if (iCtx) {
    const grad = iCtx.createLinearGradient(0, 0, 512, 512);
    grad.addColorStop(0, '#ffffff');
    grad.addColorStop(0.5, '#d4d4d8');
    grad.addColorStop(1, '#ffffff');
    iCtx.fillStyle = grad;
    iCtx.fillRect(0, 0, 512, 512);
  }

  const map = new CanvasTexture(canvas);
  map.colorSpace = SRGBColorSpace;
  map.minFilter = LinearFilter;
  map.magFilter = LinearFilter;
  map.needsUpdate = true;

  const bumpMap = new CanvasTexture(bumpCanvas);
  bumpMap.minFilter = LinearFilter;
  bumpMap.magFilter = LinearFilter;
  bumpMap.needsUpdate = true;

  const iridescenceMap = new CanvasTexture(iridCanvas);
  iridescenceMap.minFilter = LinearFilter;
  iridescenceMap.magFilter = LinearFilter;
  iridescenceMap.needsUpdate = true;

  const result = { map, bumpMap, iridescenceMap };
  textureCache.set(stickerId, result);
  return result;
}

let cachedBackplateTextures: {
  map: CanvasTexture;
  bumpMap: CanvasTexture;
} | null = null;

export function getBackplateEngravingTextures(): {
  map: CanvasTexture;
  bumpMap: CanvasTexture;
} {
  if (cachedBackplateTextures) return cachedBackplateTextures;

  const width = 1024;
  const height = 1680;

  const colorCanvas = document.createElement('canvas');
  colorCanvas.width = width;
  colorCanvas.height = height;
  const ctx = colorCanvas.getContext('2d');

  const bumpCanvas = document.createElement('canvas');
  bumpCanvas.width = width;
  bumpCanvas.height = height;
  const bCtx = bumpCanvas.getContext('2d');

  if (ctx && bCtx) {
    ctx.clearRect(0, 0, width, height);
    bCtx.fillStyle = '#808080';
    bCtx.fillRect(0, 0, width, height);

    const drawRelief = (
      c: CanvasRenderingContext2D,
      isBump: boolean
    ) => {
      c.save();
      c.translate(width / 2, 460);
      c.rotate(Math.PI / 2);
      c.font = '900 220px Orbitron, Arial, sans-serif';
      c.textAlign = 'center';
      c.textBaseline = 'middle';
      if (!isBump) {
        c.shadowColor = 'rgba(0, 0, 0, 0.55)';
        c.shadowBlur = 4;
        c.shadowOffsetY = 3;
      }
      c.fillStyle = isBump ? '#ffffff' : 'rgba(255, 255, 255, 0.86)';
      c.fillText(':P', 0, 0);
      c.restore();

      c.save();
      c.font = '900 92px Orbitron, Arial, sans-serif';
      c.textAlign = 'center';
      if (!isBump) {
        c.shadowColor = 'rgba(0, 0, 0, 0.55)';
        c.shadowBlur = 4;
        c.shadowOffsetY = 3;
      }
      c.fillStyle = isBump ? '#ffffff' : 'rgba(255, 255, 255, 0.9)';
      c.fillText('iPPod', width / 2, 1080);
      c.restore();

      c.save();
      drawRoundedRect(c, width / 2 - 150, 1170, 300, 88, 18);
      c.lineWidth = 6;
      c.strokeStyle = isBump ? '#ffffff' : 'rgba(255, 255, 255, 0.8)';
      c.stroke();

      c.font = '800 46px Orbitron, Arial, sans-serif';
      c.textAlign = 'center';
      c.fillStyle = isBump ? '#ffffff' : 'rgba(255, 255, 255, 0.88)';
      c.fillText('127GB', width / 2, 1230);
      c.restore();

      c.save();
      c.font = '600 26px Tahoma, Arial, sans-serif';
      c.textAlign = 'center';
      c.fillStyle = isBump ? '#d4d4d4' : 'rgba(255, 255, 255, 0.68)';
      c.fillText(
        'Designed by Pepe in Sergipe • Model A127',
        width / 2,
        1360
      );
      c.fillText('Serial No. Y2K-PEPE-127GB • CE FC', width / 2, 1405);
      c.restore();
    };

    drawRelief(ctx, false);
    drawRelief(bCtx, true);
  }

  const map = new CanvasTexture(colorCanvas);
  map.colorSpace = SRGBColorSpace;
  map.needsUpdate = true;

  const bumpMap = new CanvasTexture(bumpCanvas);
  bumpMap.needsUpdate = true;

  cachedBackplateTextures = { map, bumpMap };
  return cachedBackplateTextures;
}