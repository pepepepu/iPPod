import { CanvasTexture, SRGBColorSpace } from 'three';
import type { StickerPreset } from '../content/homeContent';

const textureCache = new Map<string, CanvasTexture>();

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
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

export function getStickerCanvasTexture(preset: StickerPreset): CanvasTexture {
  const cached = textureCache.get(preset.id);
  if (cached) return cached;

  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  ctx.clearRect(0, 0, 512, 512);

  ctx.save();

  if (preset.shape === 'pill') {
    drawRoundedRect(ctx, 24, 116, 464, 280, 140);
  } else if (preset.shape === 'rounded') {
    drawRoundedRect(ctx, 46, 64, 420, 384, 96);
  } else {
    ctx.beginPath();
    ctx.arc(256, 256, 220, 0, Math.PI * 2);
    ctx.closePath();
  }

  ctx.fillStyle = '#ffffff';
  ctx.shadowColor = 'rgba(0, 0, 0, 0.35)';
  ctx.shadowBlur = 16;
  ctx.shadowOffsetY = 6;
  ctx.fill();
  ctx.restore();

  ctx.save();
  if (preset.shape === 'pill') {
    drawRoundedRect(ctx, 42, 134, 428, 244, 122);
  } else if (preset.shape === 'rounded') {
    drawRoundedRect(ctx, 64, 82, 384, 348, 80);
  } else {
    ctx.beginPath();
    ctx.arc(256, 256, 200, 0, Math.PI * 2);
    ctx.closePath();
  }
  ctx.clip();

  const grad = ctx.createLinearGradient(40, 40, 472, 472);
  if (preset.variant === 'love-code') {
    grad.addColorStop(0, '#e2e8f0');
    grad.addColorStop(0.25, '#ffffff');
    grad.addColorStop(0.5, '#94a3b8');
    grad.addColorStop(0.75, '#f8fafc');
    grad.addColorStop(1, '#cbd5e1');
  } else if (preset.variant === 'love-music') {
    grad.addColorStop(0, '#bae6fd');
    grad.addColorStop(0.3, '#ffffff');
    grad.addColorStop(0.6, '#38bdf8');
    grad.addColorStop(0.85, '#e879f9');
    grad.addColorStop(1, '#bae6fd');
  } else if (preset.variant === 'cd-disc') {
    grad.addColorStop(0, '#cbd5e1');
    grad.addColorStop(0.2, '#00f0ff');
    grad.addColorStop(0.4, '#ff007f');
    grad.addColorStop(0.6, '#ffffff');
    grad.addColorStop(0.8, '#39ff14');
    grad.addColorStop(1, '#94a3b8');
  } else if (preset.variant === 'music-notes') {
    grad.addColorStop(0, '#f0abfc');
    grad.addColorStop(0.35, '#d946ef');
    grad.addColorStop(0.55, '#ffffff');
    grad.addColorStop(0.8, '#6366f1');
    grad.addColorStop(1, '#ec4899');
  } else if (preset.variant === 'acid-smile') {
    grad.addColorStop(0, '#d9f99d');
    grad.addColorStop(0.35, '#84cc16');
    grad.addColorStop(0.55, '#ffffff');
    grad.addColorStop(0.85, '#22c55e');
    grad.addColorStop(1, '#bef264');
  } else if (preset.variant === 'chrome-heart') {
    grad.addColorStop(0, '#fecdd3');
    grad.addColorStop(0.3, '#f43f5e');
    grad.addColorStop(0.55, '#ffffff');
    grad.addColorStop(0.85, '#be123c');
    grad.addColorStop(1, '#fda4af');
  } else {
    grad.addColorStop(0, '#e0f2fe');
    grad.addColorStop(0.28, '#38bdf8');
    grad.addColorStop(0.52, '#ffffff');
    grad.addColorStop(0.76, '#f472b6');
    grad.addColorStop(1, '#bae6fd');
  }

  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 512, 512);

  const sheen = ctx.createLinearGradient(0, 0, 512, 260);
  sheen.addColorStop(0, 'rgba(255, 255, 255, 0.65)');
  sheen.addColorStop(0.45, 'rgba(255, 255, 255, 0.08)');
  sheen.addColorStop(0.5, 'rgba(255, 255, 255, 0)');
  ctx.fillStyle = sheen;
  ctx.fillRect(0, 0, 512, 512);

  if (preset.variant === 'cd-disc') {
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.75)';
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.arc(256, 256, 150, 0, Math.PI * 2);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(256, 256, 66, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.88)';
    ctx.fill();
    ctx.lineWidth = 5;
    ctx.strokeStyle = '#64748b';
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(256, 256, 28, 0, Math.PI * 2);
    ctx.fillStyle = '#0f172a';
    ctx.fill();
  } else if (preset.variant === 'love-code') {
    ctx.font = '900 84px Orbitron, Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#0f172a';
    ctx.fillText('I', 92, 258);
    ctx.fillStyle = '#e11d48';
    ctx.font = '900 96px Arial, sans-serif';
    ctx.fillText('♥', 165, 260);
    ctx.fillStyle = '#0f172a';
    ctx.font = '900 78px Orbitron, Arial, sans-serif';
    ctx.fillText('CODE', 332, 258);
  } else if (preset.variant === 'love-music') {
    ctx.font = '900 80px Orbitron, Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#0f172a';
    ctx.fillText('I', 82, 258);
    ctx.fillStyle = '#db2777';
    ctx.font = '900 92px Arial, sans-serif';
    ctx.fillText('♥', 150, 260);
    ctx.fillStyle = '#0f172a';
    ctx.font = '900 70px Orbitron, Arial, sans-serif';
    ctx.fillText('MUSIC', 330, 258);
  } else {
    ctx.font =
      preset.variant === 'pepe-tag'
        ? '900 180px Orbitron, Arial, sans-serif'
        : '900 200px Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = 'rgba(0, 0, 0, 0.22)';
    ctx.fillText(preset.label, 262, 268);
    ctx.fillStyle = preset.textColor;
    ctx.fillText(preset.label, 256, 260);
  }

  ctx.restore();

  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  texture.needsUpdate = true;
  textureCache.set(preset.id, texture);
  return texture;
}