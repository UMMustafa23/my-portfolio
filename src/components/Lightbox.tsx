'use client';
import { useEffect, useCallback } from 'react';
import Image from 'next/image';
import { useSound } from '@/hooks/useSound';

interface Props {
  images: string[];
  index: number;
  alt?: string;
  onClose: () => void;
  onChange: (i: number) => void;
}

export default function Lightbox({ images, index, alt = '', onClose, onChange }: Props) {
  const { click } = useSound();

  const prev = useCallback(() => { click(); onChange((index - 1 + images.length) % images.length); }, [index, images.length, onChange, click]);
  const next = useCallback(() => { click(); onChange((index + 1) % images.length); }, [index, images.length, onChange, click]);

  const handleKey = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape')      { click(); onClose(); }
    if (e.key === 'ArrowLeft')   prev();
    if (e.key === 'ArrowRight')  next();
  }, [onClose, prev, next, click]);

  useEffect(() => {
    window.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [handleKey]);

  return (
    <div
      onClick={() => { click(); onClose(); }}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: 'rgba(0,0,0,0.96)',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer',
      }}
    >
      {/* Top bar */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0,
        borderBottom: '1px solid #222',
        background: '#000',
        padding: '10px 20px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        fontFamily: '"Share Tech Mono", monospace', fontSize: 11, color: '#555',
      }}>
        <span>
          ACME FILE VIEWER
          {images.length > 1 && (
            <span style={{ marginLeft: 16, color: '#888' }}>
              [{index + 1} / {images.length}]
            </span>
          )}
        </span>
        <button
          onClick={e => { e.stopPropagation(); click(); onClose(); }}
          style={{
            fontFamily: '"Press Start 2P", monospace', fontSize: 8,
            color: '#fff', background: 'transparent',
            border: '1px solid #fff', padding: '6px 12px',
            cursor: 'pointer', letterSpacing: 1,
            transition: 'background 0.1s, color 0.1s',
          }}
          onMouseOver={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = '#000'; }}
          onMouseOut={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#fff'; }}
        >
          ✕ CLOSE FILE
        </button>
      </div>

      {/* Image */}
      <div
        onClick={e => e.stopPropagation()}
        style={{
          position: 'relative',
          maxWidth: 'min(90vw, 1100px)',
          maxHeight: '75vh',
          border: '1px solid #333',
          overflow: 'hidden',
          cursor: 'default',
        }}
      >
        <Image
          key={images[index]}
          src={images[index]}
          alt={alt}
          width={1200}
          height={800}
          style={{
            maxWidth: 'min(90vw, 1100px)',
            maxHeight: '75vh',
            width: 'auto',
            height: 'auto',
            display: 'block',
            filter: 'grayscale(100%) contrast(1.1) brightness(1.05)',
          }}
        />
        {/* Scanlines */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,0,0,0.14) 3px,rgba(0,0,0,0.14) 4px)',
        }} />
      </div>

      {/* Prev / Next */}
      {images.length > 1 && (
        <>
          <button
            onClick={e => { e.stopPropagation(); prev(); }}
            style={{
              position: 'absolute', left: 20, top: '50%', transform: 'translateY(-50%)',
              fontFamily: '"Press Start 2P", monospace', fontSize: 10,
              color: '#888', background: 'transparent',
              border: '1px solid #333', padding: '12px 16px',
              cursor: 'pointer', transition: 'color 0.1s, border-color 0.1s',
            }}
            onMouseOver={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = '#fff'; }}
            onMouseOut={e => { e.currentTarget.style.color = '#888'; e.currentTarget.style.borderColor = '#333'; }}
          >◀</button>
          <button
            onClick={e => { e.stopPropagation(); next(); }}
            style={{
              position: 'absolute', right: 20, top: '50%', transform: 'translateY(-50%)',
              fontFamily: '"Press Start 2P", monospace', fontSize: 10,
              color: '#888', background: 'transparent',
              border: '1px solid #333', padding: '12px 16px',
              cursor: 'pointer', transition: 'color 0.1s, border-color 0.1s',
            }}
            onMouseOver={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = '#fff'; }}
            onMouseOut={e => { e.currentTarget.style.color = '#888'; e.currentTarget.style.borderColor = '#333'; }}
          >▶</button>
        </>
      )}

      {/* Dot indicators */}
      {images.length > 1 && (
        <div style={{ display: 'flex', gap: 8, marginTop: 14 }} onClick={e => e.stopPropagation()}>
          {images.map((_, i) => (
            <div
              key={i}
              onClick={() => { click(); onChange(i); }}
              style={{
                width: 8, height: 8,
                background: i === index ? '#fff' : '#333',
                border: '1px solid #555',
                cursor: 'pointer',
                transition: 'background 0.15s',
              }}
            />
          ))}
        </div>
      )}

      {/* Hint */}
      <div style={{
        position: 'absolute', bottom: 14,
        fontFamily: '"Share Tech Mono", monospace', fontSize: 10, color: '#333',
        letterSpacing: 1,
      }}>
        {images.length > 1 ? 'ESC · CLICK OUTSIDE · ← → NAVIGATE' : 'ESC · CLICK OUTSIDE TO CLOSE'}
      </div>
    </div>
  );
}
