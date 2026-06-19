'use client';
import { useState, useEffect, useCallback } from 'react';
import { useSound } from '@/hooks/useSound';

const LINES = [
  { text: 'ULVIE OS v2.6.19  [PORTFOLIO EDITION]', delay: 0,    type: 'title' },
  { text: '════════════════════════════════════════', delay: 150, type: 'divider' },
  { text: 'CPU   : CREATIVE PROCESSOR  16 YRS', delay: 350, type: 'info' },
  { text: 'MEM   : 2048MB IMAGINATION RAM', delay: 500, type: 'info' },
  { text: 'DISK  : PROJECTS.DAT  SKILLS.DAT', delay: 650, type: 'info' },
  { text: '════════════════════════════════════════', delay: 800, type: 'divider' },
  { text: 'LOADING CORE MODULES............... [OK]', delay: 1100, type: 'ok' },
  { text: 'INITIALIZING SKILL DATABASE........ [OK]', delay: 1500, type: 'ok' },
  { text: 'MOUNTING PROJECT FILES............. [OK]', delay: 1900, type: 'ok' },
  { text: 'CALIBRATING PORTFOLIO RENDERER..... [OK]', delay: 2300, type: 'ok' },
  { text: 'STARTING INTERFACE................. [OK]', delay: 2700, type: 'ok' },
  { text: '════════════════════════════════════════', delay: 2900, type: 'divider' },
  { text: 'SYSTEM READY.  WELCOME, VISITOR.', delay: 3100, type: 'ready' },
];

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [visible, setVisible] = useState<number[]>([]);
  const [progress, setProgress] = useState(0);
  const [showPrompt, setShowPrompt] = useState(false);
  const [exiting, setExiting] = useState(false);
  const { boot, success } = useSound();

  const finish = useCallback(() => {
    if (exiting) return;
    setExiting(true);
    setTimeout(onComplete, 900);
  }, [exiting, onComplete]);

  useEffect(() => {
    boot();
    LINES.forEach((line, i) => {
      setTimeout(() => {
        setVisible(prev => [...prev, i]);
        const pct = Math.round(((i + 1) / LINES.length) * 100);
        setProgress(pct);
      }, line.delay);
    });
    setTimeout(() => { setShowPrompt(true); success(); }, 3400);
    const auto = setTimeout(finish, 5500);
    return () => clearTimeout(auto);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!showPrompt) return;
    const handler = () => finish();
    window.addEventListener('keydown', handler);
    window.addEventListener('click', handler);
    return () => { window.removeEventListener('keydown', handler); window.removeEventListener('click', handler); };
  }, [showPrompt, finish]);

  const lineColor = (type: string) => {
    if (type === 'title')   return 'var(--t-green)';
    if (type === 'divider') return 'var(--t-gdark)';
    if (type === 'info')    return 'var(--t-text)';
    if (type === 'ok')      return 'var(--t-text)';
    if (type === 'ready')   return 'var(--t-amber)';
    return 'var(--t-green)';
  };

  return (
    <div
      className="loading-screen"
      style={{ opacity: exiting ? 0 : 1, transition: exiting ? 'opacity 0.8s ease' : 'none' }}
    >
      <div style={{ maxWidth: 560 }}>
        {LINES.map((line, i) =>
          visible.includes(i) ? (
            <div
              key={i}
              style={{
                fontFamily: i === 0 ? '"Press Start 2P", monospace' : '"Share Tech Mono", monospace',
                fontSize: i === 0 ? 11 : 12,
                color: lineColor(line.type),
                marginBottom: i === 0 ? 4 : 2,
                letterSpacing: i === 0 ? 2 : 0.5,
              }}
            >
              {line.text}
            </div>
          ) : null
        )}

        {/* Progress bar */}
        {visible.length > 0 && (
          <div style={{ marginTop: 18, marginBottom: 8 }}>
            <div style={{
              width: '100%', height: 12,
              background: 'var(--t-gdark)',
              border: '1px solid var(--t-gdim)',
              position: 'relative',
            }}>
              <div style={{
                width: `${progress}%`,
                height: '100%',
                background: 'var(--t-green)',
                transition: 'width 0.3s ease',
                boxShadow: '0 0 6px var(--t-green)',
              }} />
            </div>
            <span style={{ fontFamily: '"Share Tech Mono"', fontSize: 11, color: 'var(--t-gdim)' }}>
              {progress}%
            </span>
          </div>
        )}

        {showPrompt && (
          <div
            className="blink"
            style={{
              marginTop: 20,
              fontFamily: '"Press Start 2P", monospace',
              fontSize: 10,
              color: 'var(--t-green)',
              letterSpacing: 2,
            }}
          >
            [ PRESS ANY KEY TO CONTINUE ]
          </div>
        )}
      </div>
    </div>
  );
}
