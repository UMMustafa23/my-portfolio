'use client';
import Image from 'next/image';
import { useInView } from '@/hooks/useInView';

const LANGS = [
  { name: 'TURKISH',   pct: 100, note: 'NATIVE' },
  { name: 'BULGARIAN', pct: 100, note: 'NATIVE' },
  { name: 'ENGLISH',   pct: 75,  note: 'B2 CERTIFICATE' },
];

export default function AboutSection() {
  const { ref, inView } = useInView();

  return (
    <section
      id="about"
      ref={ref as React.RefObject<HTMLElement>}
      className={`section-hidden ${inView ? 'section-visible' : ''}`}
      style={{ padding: '100px 24px', maxWidth: 1100, margin: '0 auto' }}
    >
      <div className="section-heading">ABOUT ME</div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 40,
        alignItems: 'start',
      }}>

        {/* Terminal bio */}
        <div className="terminal-window" style={{ padding: 0, overflow: 'hidden' }}>
          {/* Title bar */}
          <div style={{
            background: 'var(--t-gdark)',
            padding: '8px 16px',
            display: 'flex', alignItems: 'center', gap: 8,
            borderBottom: '1px solid var(--t-border)',
          }}>
            {['#FF5F57','#FEBC2E','#28C840'].map((c, i) => (
              <div key={i} style={{ width: 10, height: 10, background: c, borderRadius: '50%' }} />
            ))}
            <span style={{
              fontFamily: '"Share Tech Mono", monospace',
              fontSize: 11, color: 'var(--t-dim)', marginLeft: 8,
            }}>
              bio.exe — ULVIE OS
            </span>
          </div>

          <div style={{ padding: '20px 24px', fontFamily: '"Share Tech Mono", monospace', fontSize: 13 }}>
            {[
              ['NAME',     'Ulvie Mustafa'],
              ['AGE',      '16'],
              ['SCHOOL',   'VSCPI, Burgas, Bulgaria'],
              ['GRADE',    '10th → 11th'],
              ['PASSION',  'Engineering & Development'],
              ['HOBBIES',  'ML, Arduino, Game Dev, Web Dev'],
              ['STATUS',   'Open to internships'],
            ].map(([k, v]) => (
              <div key={k} style={{ marginBottom: 8, display: 'flex', gap: 16 }}>
                <span style={{ color: 'var(--t-amber)', minWidth: 80 }}>{k}</span>
                <span style={{ color: 'var(--t-text)' }}>{': '}{v}</span>
              </div>
            ))}

            <div style={{ marginTop: 20, borderTop: '1px solid var(--t-border)', paddingTop: 16 }}>
              <div style={{ color: 'var(--t-gdim)', marginBottom: 10 }}>// LANGUAGES</div>
              {LANGS.map(l => (
                <div key={l.name} style={{ marginBottom: 12 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <span style={{ color: 'var(--t-text)', fontSize: 12 }}>{l.name}</span>
                    <span style={{ color: 'var(--t-dim)', fontSize: 11 }}>{l.note}</span>
                  </div>
                  <div className="stat-bar-track">
                    <div
                      className="stat-bar-fill"
                      style={{ width: inView ? `${l.pct}%` : '0%', transition: 'width 1.2s ease 0.3s' }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 20, color: 'var(--t-green)', fontSize: 12 }}>
              <span style={{ color: 'var(--t-amber)' }}>&gt; </span>
              Motivated student specializing in IT &amp; Software Development.
              <br />
              <span style={{ color: 'var(--t-amber)' }}>&gt; </span>
              Building real projects that solve real problems.
              <br />
              <span className="blink" style={{ color: 'var(--t-green)' }}>█</span>
            </div>
          </div>
        </div>

        {/* Photos column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

          {/* Competition photo */}
          <div style={{ position: 'relative' }}>
            <div style={{
              border: '1px solid var(--t-border)',
              overflow: 'hidden',
              position: 'relative',
            }}>
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, zIndex: 2,
                background: 'rgba(0,0,0,0.7)',
                padding: '6px 12px',
                fontFamily: '"Share Tech Mono", monospace',
                fontSize: 11, color: 'var(--t-amber)',
                borderBottom: '1px solid var(--t-border)',
              }}>
                ▶ МЛАДЕЖКО ТЕХНИЧЕСКО ТВОРЧЕСТВО 2025
              </div>
              <Image
                src="/images/ulvie-competition.jpg"
                alt="Ulvie at Youth Technical Creativity competition holding diploma"
                width={500}
                height={340}
                style={{
                  width: '100%', height: 220,
                  objectFit: 'cover',
                  filter: 'grayscale(30%) contrast(1.1)',
                  display: 'block',
                  marginTop: 28,
                }}
              />
              {/* Green tint */}
              <div style={{
                position: 'absolute', inset: 0,
                background: 'rgba(0,255,65,0.06)',
                pointerEvents: 'none',
              }} />
              {/* Scanlines on photo */}
              <div style={{
                position: 'absolute', inset: 0,
                background: 'repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,0,0,0.08) 3px,rgba(0,0,0,0.08) 4px)',
                pointerEvents: 'none',
              }} />
            </div>
            <div style={{
              fontFamily: '"Share Tech Mono", monospace',
              fontSize: 11, color: 'var(--t-dim)',
              marginTop: 6, paddingLeft: 4,
            }}>
              // Smart Watering System · Arduino Project · 2025
            </div>
          </div>

          {/* Quick facts cards */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[
              { label: 'PROJECTS', value: '4+', color: 'var(--t-green)' },
              { label: 'CERTS',    value: '6',   color: 'var(--t-amber)' },
              { label: 'LANGS',    value: '3',   color: 'var(--t-green)' },
              { label: 'YEARS EXP',value: '3+',  color: 'var(--t-amber)' },
            ].map(f => (
              <div key={f.label} style={{
                background: 'var(--t-card)',
                border: '1px solid var(--t-border)',
                padding: '16px 12px',
                textAlign: 'center',
              }}>
                <div style={{
                  fontFamily: '"Press Start 2P", monospace',
                  fontSize: 22, color: f.color,
                  marginBottom: 6,
                  textShadow: `0 0 10px ${f.color}`,
                }}>
                  {f.value}
                </div>
                <div style={{
                  fontFamily: '"Share Tech Mono", monospace',
                  fontSize: 10, color: 'var(--t-dim)', letterSpacing: 1,
                }}>
                  {f.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
