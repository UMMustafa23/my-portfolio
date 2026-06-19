'use client';
import { useState, useEffect, useCallback } from 'react';
import { useSound } from '@/hooks/useSound';

const LINES = [
  { text: '╔══════════════════════════════════════════╗', delay: 0,    dim: true },
  { text: '║   ACME DETECTIVE AGENCY — SECURE TERM    ║', delay: 80,   title: true },
  { text: '║   PORTFOLIO DOSSIER SYSTEM  v2.6.19      ║', delay: 140,  dim: true },
  { text: '╚══════════════════════════════════════════╝', delay: 200,  dim: true },
  { text: '', delay: 320 },
  { text: 'CONNECTING TO MAINFRAME................', delay: 420,  ok: true },
  { text: 'VERIFYING AGENT CREDENTIALS...........', delay: 850,  ok: true },
  { text: 'DECRYPTING OPERATIVE DOSSIER..........', delay: 1280, ok: true },
  { text: 'LOADING CASE FILES.....................',  delay: 1700, ok: true },
  { text: 'CALIBRATING SEARCH DATABASE...........', delay: 2130, ok: true },
  { text: '', delay: 2380 },
  { text: '──────────────────────────────────────', delay: 2450, dim: true },
  { text: 'OPERATIVE: ULVIE MUSTAFA  //  CLEARED', delay: 2560, bright: true },
  { text: '──────────────────────────────────────', delay: 2700, dim: true },
];

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [visible, setVisible] = useState<number[]>([]);
  const [progress, setProgress] = useState(0);
  const [showPrompt, setShowPrompt] = useState(false);
  const [exiting, setExiting] = useState(false);
  const { boot, success, typeKey } = useSound();

  const finish = useCallback(() => {
    if (exiting) return;
    setExiting(true);
    setTimeout(onComplete, 700);
  }, [exiting, onComplete]);

  useEffect(() => {
    boot();
    LINES.forEach((line, i) => {
      setTimeout(() => {
        setVisible(prev => [...prev, i]);
        typeKey();
        setProgress(Math.round(((i + 1) / LINES.length) * 100));
      }, line.delay);
    });
    setTimeout(() => { setShowPrompt(true); success(); }, 3000);
    const auto = setTimeout(finish, 5500);
    return () => clearTimeout(auto);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!showPrompt) return;
    const h = () => finish();
    window.addEventListener('keydown', h);
    window.addEventListener('click', h);
    return () => { window.removeEventListener('keydown', h); window.removeEventListener('click', h); };
  }, [showPrompt, finish]);

  return (
    <div
      className="loading-screen"
      style={{ opacity: exiting ? 0 : 1, transition: exiting ? 'opacity 0.7s ease' : 'none' }}
    >
      <div style={{ maxWidth: 500 }}>
        {LINES.map((line, i) =>
          visible.includes(i) ? (
            <div
              key={i}
              style={{
                fontFamily: '"Share Tech Mono", monospace',
                fontSize: line.title ? 11 : 12,
                color: line.bright ? '#ffffff' : line.title ? '#ffffff' : line.dim ? '#444444' : '#aaaaaa',
                fontWeight: line.bright ? 'bold' : 'normal',
                letterSpacing: line.title ? 1 : 0.3,
                marginBottom: 2,
                whiteSpace: 'pre',
              }}
            >
              {line.ok
                ? <><span style={{ color: '#888' }}>{line.text}</span><span style={{ color: '#fff' }}> OK</span></>
                : line.text
              }
            </div>
          ) : null
        )}

        {progress > 0 && (
          <div style={{ marginTop: 20, marginBottom: 6 }}>
            <div style={{
              width: '100%', height: 8,
              background: '#111',
              border: '1px solid #333',
            }}>
              <div style={{
                width: `${progress}%`,
                height: '100%',
                background: '#ffffff',
                transition: 'width 0.25s ease',
              }} />
            </div>
          </div>
        )}

        {showPrompt && (
          <div
            className="blink"
            style={{
              marginTop: 24,
              fontFamily: '"Press Start 2P", monospace',
              fontSize: 9,
              color: '#ffffff',
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
