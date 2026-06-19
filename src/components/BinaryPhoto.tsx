'use client';
import { useEffect, useRef } from 'react';

interface Props {
  src: string;
  size?: number;
  cellSize?: number;
  className?: string;
  style?: React.CSSProperties;
}

export default function BinaryPhoto({ src, size = 300, cellSize = 6, className, style }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = size;
    canvas.height = size;

    const img = new Image();
    img.onload = () => {
      const cols = Math.floor(size / cellSize);
      const rows = Math.floor(size / cellSize);

      const off = document.createElement('canvas');
      off.width = cols;
      off.height = rows;
      const offCtx = off.getContext('2d')!;
      offCtx.drawImage(img, 0, 0, cols, rows);
      const data = offCtx.getImageData(0, 0, cols, rows).data;

      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, size, size);

      ctx.font = `bold ${cellSize - 1}px "Courier New", monospace`;
      ctx.textBaseline = 'top';

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const idx = (row * cols + col) * 4;
          const r = data[idx], g = data[idx + 1], b = data[idx + 2], a = data[idx + 3];
          if (a < 20) continue;

          const brightness = (r * 0.299 + g * 0.587 + b * 0.114) / 255;
          if (brightness < 0.04) continue;

          const char = brightness > 0.55 ? '1' : '0';
          const gv = Math.floor(brightness * 180 + 60);
          ctx.fillStyle = `rgb(0,${gv},0)`;
          ctx.fillText(char, col * cellSize, row * cellSize);
        }
      }
    };
    img.src = src;
  }, [src, size, cellSize]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ width: size, height: size, display: 'block', imageRendering: 'pixelated', ...style }}
    />
  );
}
