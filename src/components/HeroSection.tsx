'use client';
import { useEffect, useRef } from 'react';
import BinaryPhoto from './BinaryPhoto';
import { useSound } from '@/hooks/useSound';
import { useTypewriter } from '@/hooks/useTypewriter';

function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const fontSize = 12;
    let cols = Math.floor(canvas.width / fontSize);
    const drops: number[] = new Array(cols).fill(1);

    const draw = () => {
      ctx.fillStyle = 'rgba(0,0,0,0.06)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = `${fontSize}px "Share Tech Mono", monospace`;
      cols = Math.floor(canvas.width / fontSize);
      while (drops.length < cols) drops.push(1);

      for (let i = 0; i < cols; i++) {
        const ch = Math.random() > 0.5 ? '1' : '0';
        const alpha = Math.random() * 0.4 + 0.05;
        ctx.fillStyle = `rgba(0,255,65,${alpha})`;
        ctx.fillText(ch, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
    };

    const id = setInterval(draw, 60);
    return () => { clearInterval(id); window.removeEventListener('resize', resize); };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute', inset: 0,
        width: '100%', height: '100%',
        opacity: 0.18, pointerEvents: 'none',
      }}
    />
  );
}

export default function HeroSection() {
  const { hover, click } = useSound();
  const { display: subtitle } = useTypewriter(
    'FULL-STACK DEVELOPER  //  ENGINEER  //  CREATOR',
    55,
    600
  );

  const scrollTo = (id: string) => {
    click();
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        paddingTop: 60,
      }}
    >
      <MatrixRain />

      {/* Grid overlay */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: `
          linear-gradient(rgba(0,255,65,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,255,65,0.03) 1px, transparent 1px)
        `,
        backgroundSize: '40px 40px',
      }} />

      <div style={{
        maxWidth: 1100, margin: '0 auto', padding: '40px 24px',
        display: 'grid',
        gridTemplateColumns: 'auto 1fr',
        gap: 60,
        alignItems: 'center',
        position: 'relative',
        zIndex: 1,
      }}>

        {/* Binary photo frame */}
        <div style={{ position: 'relative' }}>
          <div style={{
            position: 'absolute', inset: -3,
            border: '2px solid var(--t-green)',
            boxShadow: '0 0 20px rgba(0,255,65,0.3), inset 0 0 20px rgba(0,255,65,0.05)',
            animation: 'pulse 3s ease-in-out infinite',
          }} />
          {/* Corner decorators */}
          {[
            { top: -8, left: -8 }, { top: -8, right: -8 },
            { bottom: -8, left: -8 }, { bottom: -8, right: -8 },
          ].map((pos, i) => (
            <div key={i} style={{
              position: 'absolute', ...pos,
              width: 14, height: 14,
              background: 'var(--t-amber)',
              zIndex: 2,
            }} />
          ))}
          <BinaryPhoto
            src="/images/ulvie-headshot.jpg"
            size={300}
            cellSize={6}
            style={{ animation: 'glitchImg 6s ease-in-out infinite' }}
          />
        </div>

        {/* Text content */}
        <div>
          <div style={{
            fontFamily: '"Share Tech Mono", monospace',
            fontSize: 12,
            color: 'var(--t-amber)',
            marginBottom: 12,
            letterSpacing: 3,
          }}>
            &gt; INITIATING PROFILE...
          </div>

          <h1 style={{
            fontFamily: '"Press Start 2P", monospace',
            fontSize: 'clamp(22px, 4vw, 40px)',
            color: 'var(--t-green)',
            lineHeight: 1.4,
            marginBottom: 8,
            animation: 'glitch 5s ease-in-out infinite',
            textShadow: '0 0 20px rgba(0,255,65,0.4)',
          }}>
            ULVIE<br />
            <span style={{ color: 'var(--t-amber)' }}>MUSTAFA</span>
          </h1>

          <div style={{
            fontFamily: '"Share Tech Mono", monospace',
            fontSize: 13,
            color: 'var(--t-gdim)',
            marginBottom: 28,
            minHeight: 22,
            letterSpacing: 1,
          }}>
            {subtitle}
            <span className="blink" style={{ color: 'var(--t-green)' }}>█</span>
          </div>

          <div style={{
            fontFamily: '"Share Tech Mono", monospace',
            fontSize: 12,
            color: 'var(--t-text)',
            marginBottom: 36,
            lineHeight: 2,
          }}>
            <div><span style={{ color: 'var(--t-amber)' }}>AGE</span>     : 16</div>
            <div><span style={{ color: 'var(--t-amber)' }}>LOCATION</span>: Burgas, Bulgaria</div>
            <div><span style={{ color: 'var(--t-amber)' }}>SCHOOL</span>  : VSCPI High School</div>
            <div><span style={{ color: 'var(--t-amber)' }}>STATUS</span>  : <span style={{ color: 'var(--t-green)' }}>SEEKING INTERNSHIP</span></div>
          </div>

          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            <button
              className="retro-btn"
              onMouseEnter={hover}
              onClick={() => scrollTo('#projects')}
            >
              ▶ VIEW PROJECTS
            </button>
            <button
              className="retro-btn-outline"
              onMouseEnter={hover}
              onClick={() => scrollTo('#contact')}
            >
              ▶ CONTACT ME
            </button>
          </div>

          {/* Social links */}
          <div style={{ marginTop: 28, display: 'flex', gap: 20, alignItems: 'center' }}>
            {[
              { label: 'GitHub', url: 'https://github.com/UMMustafa23', icon: '⌘' },
              { label: 'LinkedIn', url: 'https://www.linkedin.com/in/ulvie-mustafa-4115632ba/', icon: '◈' },
              { label: 'Email', url: 'mailto:ulvie1m@gmail.com', icon: '✉' },
            ].map(s => (
              <a
                key={s.label}
                href={s.url}
                target={s.label !== 'Email' ? '_blank' : undefined}
                rel="noopener noreferrer"
                onMouseEnter={hover}
                onClick={() => click()}
                style={{
                  fontFamily: '"Share Tech Mono", monospace',
                  fontSize: 11,
                  color: 'var(--t-dim)',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 5,
                  transition: 'color 0.15s',
                }}
                onMouseOver={e => (e.currentTarget.style.color = 'var(--t-green)')}
                onMouseOut={e => (e.currentTarget.style.color = 'var(--t-dim)')}
              >
                <span>{s.icon}</span> {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: 'absolute', bottom: 28, left: '50%', transform: 'translateX(-50%)',
        fontFamily: '"Share Tech Mono", monospace', fontSize: 11,
        color: 'var(--t-dim)', letterSpacing: 2,
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
      }}>
        <span style={{ animation: 'blink 2s ease-in-out infinite' }}>▼ SCROLL ▼</span>
      </div>
    </section>
  );
}
