'use client';
import { useEffect, useRef } from 'react';
import BinaryPhoto from './BinaryPhoto';
import { useSound } from '@/hooks/useSound';
import { useTypewriter } from '@/hooks/useTypewriter';

function StaticNoise() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener('resize', resize);
    const draw = () => {
      const w = canvas.width, h = canvas.height;
      const img = ctx.createImageData(w, h);
      for (let i = 0; i < img.data.length; i += 4) {
        const v = Math.random() > 0.985 ? Math.floor(Math.random() * 120 + 60) : 0;
        img.data[i] = img.data[i+1] = img.data[i+2] = v;
        img.data[i+3] = v > 0 ? 180 : 0;
      }
      ctx.putImageData(img, 0, 0);
    };
    const id = setInterval(draw, 80);
    return () => { clearInterval(id); window.removeEventListener('resize', resize); };
  }, []);
  return (
    <canvas ref={canvasRef} style={{
      position: 'absolute', inset: 0, width: '100%', height: '100%',
      opacity: 0.35, pointerEvents: 'none',
    }} />
  );
}

export default function HeroSection() {
  const { hover, click } = useSound();
  const { display: role } = useTypewriter('DEVELOPER  //  ENGINEER  //  CREATOR', 55, 800);

  const scrollTo = (id: string) => { click(); document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' }); };

  return (
    <section id="home" style={{
      position: 'relative', minHeight: '100vh',
      display: 'flex', alignItems: 'center',
      overflow: 'hidden', paddingTop: 50,
    }}>
      <StaticNoise />

      {/* Horizontal rule lines ─ Carmen Sandiego map grid feel */}
      {[20, 40, 60, 80].map(pct => (
        <div key={pct} style={{
          position: 'absolute', top: `${pct}%`, left: 0, right: 0,
          height: 1, background: 'rgba(255,255,255,0.03)', pointerEvents: 'none',
        }} />
      ))}

      <div style={{
        maxWidth: 1100, margin: '0 auto', padding: '60px 28px',
        display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 64,
        alignItems: 'center', position: 'relative', zIndex: 1,
      }}>

        {/* ── Dossier photo frame ── */}
        <div style={{ position: 'relative' }}>
          {/* Outer double-line frame */}
          <div style={{
            position: 'absolute', inset: -10,
            border: '2px solid #ffffff',
            boxShadow: '0 0 0 1px #000, 0 0 0 2px #333',
          }} />
          {/* Corner labels */}
          {[
            { top: -22, left: -6, text: '╔' },
            { top: -22, right: -6, text: '╗' },
            { bottom: -22, left: -6, text: '╚' },
            { bottom: -22, right: -6, text: '╝' },
          ].map((c, i) => (
            <span key={i} style={{
              position: 'absolute', ...c,
              fontFamily: 'monospace', fontSize: 16,
              color: '#ffffff', lineHeight: 1,
            }}>{c.text}</span>
          ))}

          <BinaryPhoto src="/images/ulvie-headshot.jpg" size={280} cellSize={6} />

          {/* Label strip below photo */}
          <div style={{
            background: '#ffffff', color: '#000000',
            fontFamily: '"Press Start 2P", monospace',
            fontSize: 7, letterSpacing: 2,
            padding: '5px 0', textAlign: 'center', marginTop: 2,
          }}>
            OPERATIVE — CLASSIFIED
          </div>
        </div>

        {/* ── Dossier text ── */}
        <div>
          {/* Case header */}
          <div style={{
            fontFamily: '"Share Tech Mono", monospace',
            fontSize: 11, color: '#666', letterSpacing: 3,
            marginBottom: 10,
          }}>
            ACME DETECTIVE AGENCY  ·  OPERATIVE DOSSIER  ·  REF# UM-2026
          </div>

          {/* Name — glitch style */}
          <h1 style={{
            fontFamily: '"Press Start 2P", monospace',
            fontSize: 'clamp(18px, 3.5vw, 36px)',
            color: '#ffffff',
            lineHeight: 1.5,
            marginBottom: 10,
            animation: 'glitch 6s ease-in-out infinite',
          }}>
            ULVIE<br />MUSTAFA
          </h1>

          {/* Typewriter role */}
          <div style={{
            fontFamily: '"Share Tech Mono", monospace',
            fontSize: 13, color: '#888',
            marginBottom: 30, minHeight: 22, letterSpacing: 1,
          }}>
            {role}<span className="blink" style={{ color: '#fff' }}>█</span>
          </div>

          {/* Dossier fields */}
          <div style={{
            border: '1px solid #222',
            borderTop: '2px solid #ffffff',
            background: '#0a0a0a',
            padding: '16px 20px',
            marginBottom: 32,
            fontFamily: '"Share Tech Mono", monospace',
            fontSize: 12, lineHeight: 2.1,
          }}>
            {[
              ['AGE',      '16'],
              ['LOCATION', 'BURGAS, BULGARIA'],
              ['SCHOOL',   'VSCPI HIGH SCHOOL'],
              ['GRADE',    '10TH → 11TH'],
              ['STATUS',   'SEEKING INTERNSHIP ◀'],
            ].map(([k, v]) => (
              <div key={k} style={{ display: 'flex', gap: 12 }}>
                <span style={{ color: '#555', minWidth: 90 }}>{k}</span>
                <span style={{ color: '#aaa' }}>:</span>
                <span style={{ color: k === 'STATUS' ? '#fff' : '#ccc', fontWeight: k === 'STATUS' ? 'bold' : 'normal' }}>{v}</span>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 28 }}>
            <button className="retro-btn" onMouseEnter={hover} onClick={() => scrollTo('#projects')}>
              ▶ VIEW CASE FILES
            </button>
            <button className="retro-btn-outline" onMouseEnter={hover} onClick={() => scrollTo('#contact')}>
              ▶ OPEN DISPATCH
            </button>
          </div>

          {/* Socials */}
          <div style={{ display: 'flex', gap: 22, flexWrap: 'wrap' }}>
            {[
              { label: 'GITHUB',   url: 'https://github.com/UMMustafa23' },
              { label: 'LINKEDIN', url: 'https://www.linkedin.com/in/ulvie-mustafa-4115632ba/' },
              { label: 'EMAIL',    url: 'mailto:ulvie1m@gmail.com' },
            ].map(s => (
              <a key={s.label} href={s.url}
                target={s.label !== 'EMAIL' ? '_blank' : undefined}
                rel="noopener noreferrer"
                onMouseEnter={hover} onClick={() => click()}
                style={{
                  fontFamily: '"Share Tech Mono", monospace', fontSize: 11,
                  color: '#555', textDecoration: 'none', letterSpacing: 1,
                  transition: 'color 0.15s',
                }}
                onMouseOver={e => (e.currentTarget.style.color = '#fff')}
                onMouseOut={e => (e.currentTarget.style.color = '#555')}
              >
                [ {s.label} ]
              </a>
            ))}
          </div>
        </div>
      </div>

      <div style={{
        position: 'absolute', bottom: 24, left: '50%', transform: 'translateX(-50%)',
        fontFamily: '"Share Tech Mono", monospace', fontSize: 10,
        color: '#444', letterSpacing: 3,
        animation: 'blink 2.5s ease-in-out infinite',
      }}>
        ▼  SCROLL  ▼
      </div>
    </section>
  );
}
