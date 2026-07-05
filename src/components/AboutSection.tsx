'use client';
import { useState } from 'react';
import Image from 'next/image';
import { useInView } from '@/hooks/useInView';
import { useSound } from '@/hooks/useSound';
import Lightbox from './Lightbox';

const LANGS = [
  { name: 'TURKISH',   pct: 100, note: 'NATIVE' },
  { name: 'BULGARIAN', pct: 100, note: 'NATIVE' },
  { name: 'ENGLISH',   pct: 75,  note: 'B2 CERT' },
];

export default function AboutSection() {
  const { ref, inView } = useInView();
  const { click } = useSound();
  const [lightboxOpen, setLightboxOpen] = useState(false);

  return (
    <section
      id="about"
      ref={ref as React.RefObject<HTMLElement>}
      className={`section-hidden ${inView ? 'section-visible' : ''}`}
      style={{ padding: '100px 28px', maxWidth: 1100, margin: '0 auto' }}
    >
      {lightboxOpen && (
        <Lightbox
          images={['/images/aibest-3rd-place.jpg']}
          index={0}
          alt="Ulvie at the AIBEST Tech Academy awards ceremony — 3rd place"
          onClose={() => setLightboxOpen(false)}
          onChange={() => {}}
        />
      )}

      <div className="section-heading">OPERATIVE PROFILE</div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 36, alignItems: 'start' }}>

        {/* ── Left: terminal dossier ── */}
        <div>
          <div style={{
            background: '#fff', color: '#000',
            fontFamily: '"Press Start 2P", monospace',
            fontSize: 8, letterSpacing: 2, padding: '7px 14px',
            display: 'flex', justifyContent: 'space-between',
          }}>
            <span>PERSONNEL FILE</span>
            <span>// ACME</span>
          </div>

          <div style={{
            border: '1px solid #333', borderTop: 'none',
            background: '#0a0a0a', padding: '22px 24px',
          }}>
            {[
              ['NAME',     'Ulvie Mustafa'],
              ['AGE',      '16'],
              ['SCHOOL',   'VSCPI, Burgas, Bulgaria'],
              ['GRADE',    '10th → 11th'],
              ['PASSION',  'Engineering & Dev'],
              ['HOBBIES',  'ML, Arduino, Game Dev, Web'],
            ].map(([k, v]) => (
              <div key={k} style={{
                display: 'flex', gap: 14, marginBottom: 9,
                fontFamily: '"Share Tech Mono", monospace', fontSize: 12,
              }}>
                <span style={{ color: '#555', minWidth: 80 }}>{k}</span>
                <span style={{ color: '#888' }}>──</span>
                <span style={{ color: '#ccc' }}>{v}</span>
              </div>
            ))}

            <div style={{ borderTop: '1px solid #222', marginTop: 18, paddingTop: 18 }}>
              <div style={{
                fontFamily: '"Share Tech Mono", monospace',
                fontSize: 10, color: '#555', letterSpacing: 2, marginBottom: 14,
              }}>
                // LANGUAGE PROFICIENCY
              </div>
              {LANGS.map(l => (
                <div key={l.name} style={{ marginBottom: 12 }}>
                  <div style={{
                    display: 'flex', justifyContent: 'space-between',
                    fontFamily: '"Share Tech Mono", monospace', fontSize: 11,
                    marginBottom: 4,
                  }}>
                    <span style={{ color: '#aaa' }}>{l.name}</span>
                    <span style={{ color: '#555' }}>{l.note}</span>
                  </div>
                  <div className="stat-bar-track">
                    <div className="stat-bar-fill" style={{
                      width: inView ? `${l.pct}%` : '0%',
                      transition: 'width 1.2s ease 0.2s',
                    }} />
                  </div>
                </div>
              ))}
            </div>

            <div style={{ borderTop: '1px solid #222', marginTop: 18, paddingTop: 18 }}>
              <div style={{
                fontFamily: '"Share Tech Mono", monospace',
                fontSize: 10, color: '#555', letterSpacing: 2, marginBottom: 14,
              }}>
                // SUMMER 2026 — ACTIVE ASSIGNMENTS
              </div>
              <div style={{
                fontFamily: '"Share Tech Mono", monospace', fontSize: 12,
                color: '#666', lineHeight: 1.9,
              }}>
                <span style={{ color: '#aaa' }}>&gt;</span> Training: <span style={{ color: '#ccc' }}>C#, OOP &amp; algorithms</span> — full summer.<br />
                <span style={{ color: '#aaa' }}>&gt;</span> Field work: <span style={{ color: '#ccc' }}>practicant @ Lidl</span> — real-world
                experience in teamwork, discipline, time management and working under pressure
                in a fast-paced environment.<br />
                <span style={{ color: '#aaa' }}>&gt;</span> <span style={{ color: '#fff' }}>STILL OPEN FOR INTERNSHIPS</span> — active
                assignments don&apos;t close this case file.
              </div>
            </div>

            <div style={{
              marginTop: 20, borderTop: '1px solid #222', paddingTop: 16,
              fontFamily: '"Share Tech Mono", monospace', fontSize: 12,
              color: '#666', lineHeight: 1.9,
            }}>
              <span style={{ color: '#aaa' }}>&gt;</span> Specialising in IT &amp; Software Dev.<br />
              <span style={{ color: '#aaa' }}>&gt;</span> Building projects that solve real problems.<br />
              <span style={{ color: '#aaa' }}>&gt;</span> Open to internships &amp; collaboration.
              <span className="blink" style={{ color: '#fff' }}> █</span>
            </div>
          </div>
        </div>

        {/* ── Right: photo + stats ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>

          {/* Competition photo — clickable */}
          <div style={{ border: '1px solid #333', overflow: 'hidden', position: 'relative' }}>
            <div style={{
              background: '#fff', color: '#000',
              fontFamily: '"Press Start 2P", monospace',
              fontSize: 7, letterSpacing: 2, padding: '6px 12px',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            }}>
              <span>AIBEST TECH ACADEMY — 3RD PLACE 2026</span>
              <span style={{ fontSize: 6, color: '#666' }}>CLICK TO EXPAND</span>
            </div>
            <div
              onClick={() => { click(); setLightboxOpen(true); }}
              style={{ position: 'relative', cursor: 'zoom-in' }}
            >
              <Image
                src="/images/aibest-3rd-place.jpg"
                alt="Ulvie at the AIBEST Tech Academy awards ceremony — 3rd place"
                width={500} height={300}
                style={{
                  width: '100%', height: 210,
                  objectFit: 'cover',
                  filter: 'grayscale(100%) contrast(1.15)',
                  display: 'block',
                  transition: 'filter 0.2s',
                }}
                onMouseOver={e => (e.currentTarget.style.filter = 'grayscale(60%) contrast(1.15)')}
                onMouseOut={e => (e.currentTarget.style.filter = 'grayscale(100%) contrast(1.15)')}
              />
              {/* Scanlines */}
              <div style={{
                position: 'absolute', inset: 0, pointerEvents: 'none',
                background: 'repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,0,0,0.12) 3px,rgba(0,0,0,0.12) 4px)',
              }} />
              {/* Zoom hint overlay */}
              <div style={{
                position: 'absolute', inset: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: 'rgba(0,0,0,0)',
                transition: 'background 0.2s',
                pointerEvents: 'none',
              }}
                className="photo-hover-overlay"
              />
            </div>
          </div>

          {/* Stat grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {[
              { label: 'PROJECTS',  value: '6+' },
              { label: 'CERTS',     value: '6'  },
              { label: 'LANGUAGES', value: '3'  },
              { label: 'YRS EXP',   value: '3+' },
            ].map(f => (
              <div key={f.label} style={{
                border: '1px solid #222', background: '#0a0a0a',
                padding: '16px 12px', textAlign: 'center',
              }}>
                <div style={{
                  fontFamily: '"Press Start 2P", monospace',
                  fontSize: 26, color: '#ffffff', marginBottom: 6,
                }}>
                  {f.value}
                </div>
                <div style={{
                  fontFamily: '"Share Tech Mono", monospace',
                  fontSize: 10, color: '#555', letterSpacing: 1,
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
