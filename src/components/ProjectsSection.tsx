'use client';
import { useState } from 'react';
import Image from 'next/image';
import { useSound } from '@/hooks/useSound';
import { useInView } from '@/hooks/useInView';

const PROJECTS = [
  {
    id: '01',
    name: 'PathAI',
    year: '2026',
    stack: ['Node.js', 'MongoDB', 'React', 'DeepSeek API'],
    desc: 'Cross-platform app helping students who are undecided about their academic major. Uses AI to assess personality, skills, and interests to suggest career paths.',
    status: 'DEPLOYED',
    url: 'https://github.com/UMMustafa23/PathAI',
    screenshot: '/images/pathai-screenshot.jpg',
    tags: ['AI', 'FULL-STACK', 'EDUCATION'],
  },
  {
    id: '02',
    name: 'TROY',
    year: '2026',
    stack: ['C++', 'MSSQL', 'Raylib', 'Wikipedia API'],
    desc: 'Wikipedia-based student–teacher knowledge app. Teachers can assign Wikipedia topics; students explore and are tested on content pulled live from the API.',
    status: 'RELEASED',
    url: 'https://github.com/codingburgas/2nd-sprint-10th-grade-troy',
    screenshot: null,
    tags: ['C++', 'DESKTOP', 'EDUCATION'],
  },
  {
    id: '03',
    name: 'SeedSearch',
    year: '2025',
    stack: ['C++', 'Raylib'],
    desc: 'Maze game where the player controls a farmer navigating procedurally generated fields to collect seeds. Built from scratch with collision detection and item spawning.',
    status: 'RELEASED',
    url: 'https://github.com/UMMustafa23/sprint-10th-grade-no-way-out',
    screenshot: null,
    tags: ['GAME', 'C++', 'GRAPHICS'],
  },
  {
    id: '04',
    name: 'SMART WATERING',
    year: '2025',
    stack: ['Arduino', 'C', 'Sensors'],
    desc: 'Automated smart watering system using soil moisture sensors and a water pump. The system monitors soil humidity and waters plants only when needed.',
    status: 'BUILT',
    url: null,
    screenshot: null,
    tags: ['ARDUINO', 'IOT', 'HARDWARE'],
  },
];

export default function ProjectsSection() {
  const [active, setActive] = useState(0);
  const { hover, click } = useSound();
  const { ref, inView } = useInView();
  const proj = PROJECTS[active];

  return (
    <section
      id="projects"
      ref={ref as React.RefObject<HTMLElement>}
      className={`section-hidden ${inView ? 'section-visible' : ''}`}
      style={{ padding: '100px 24px', background: 'rgba(13,17,0,0.4)' }}
    >
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div className="section-heading">PROJECTS</div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '280px 1fr',
          gap: 0,
          border: '1px solid var(--t-border)',
          minHeight: 420,
        }}>

          {/* File list */}
          <div style={{
            borderRight: '1px solid var(--t-border)',
            background: 'var(--t-card)',
          }}>
            <div style={{
              padding: '10px 16px',
              borderBottom: '1px solid var(--t-border)',
              fontFamily: '"Share Tech Mono", monospace',
              fontSize: 11, color: 'var(--t-gdim)',
              letterSpacing: 1,
            }}>
              PROJECTS.DAT
            </div>
            {PROJECTS.map((p, i) => (
              <div
                key={p.id}
                className={`project-card ${active === i ? 'active' : ''}`}
                onClick={() => { click(); setActive(i); }}
                onMouseEnter={hover}
                style={{ padding: '16px', borderBottom: '1px solid var(--t-border)' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                  <span style={{
                    fontFamily: '"Press Start 2P", monospace',
                    fontSize: 9, color: 'var(--t-amber)',
                  }}>[{p.id}]</span>
                  <span style={{
                    fontFamily: '"Press Start 2P", monospace',
                    fontSize: 8,
                    color: active === i ? 'var(--t-green)' : 'var(--t-text)',
                  }}>{p.name}</span>
                </div>
                <div style={{
                  fontFamily: '"Share Tech Mono", monospace',
                  fontSize: 10, color: 'var(--t-dim)',
                }}>
                  {p.year} · {p.stack[0]}
                </div>
                {active === i && (
                  <div style={{
                    marginTop: 6,
                    display: 'flex', gap: 4, flexWrap: 'wrap',
                  }}>
                    {p.tags.map(t => (
                      <span key={t} style={{
                        fontFamily: '"Share Tech Mono", monospace',
                        fontSize: 9,
                        color: 'var(--t-green)',
                        border: '1px solid var(--t-gdark)',
                        padding: '1px 5px',
                      }}>{t}</span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Detail panel */}
          <div style={{ padding: 28, background: 'rgba(5,5,5,0.6)', position: 'relative', overflow: 'hidden' }}>
            {/* Corner decorators */}
            {[
              { top: 0, right: 0, borderTop: '2px solid var(--t-amber)', borderRight: '2px solid var(--t-amber)', width: 20, height: 20 },
              { bottom: 0, left: 0, borderBottom: '2px solid var(--t-amber)', borderLeft: '2px solid var(--t-amber)', width: 20, height: 20 },
            ].map((s, i) => (
              <div key={i} style={{ position: 'absolute', ...s }} />
            ))}

            <div style={{
              fontFamily: '"Press Start 2P", monospace',
              fontSize: 14, color: 'var(--t-green)',
              marginBottom: 6,
              textShadow: '0 0 10px rgba(0,255,65,0.3)',
            }}>
              {proj.name}
            </div>

            <div style={{
              fontFamily: '"Share Tech Mono", monospace',
              fontSize: 11, color: 'var(--t-amber)',
              marginBottom: 20,
              letterSpacing: 2,
            }}>
              STATUS:{' '}
              <span style={{ color: 'var(--t-green)', animation: 'blink 2s ease-in-out infinite' }}>
                ▮
              </span>{' '}
              {proj.status} · {proj.year}
            </div>

            <p style={{
              fontFamily: '"Share Tech Mono", monospace',
              fontSize: 13, color: 'var(--t-text)', lineHeight: 1.8,
              marginBottom: 24,
            }}>
              {proj.desc}
            </p>

            {/* Screenshot */}
            {proj.screenshot && (
              <div style={{
                border: '1px solid var(--t-border)',
                marginBottom: 24,
                overflow: 'hidden',
                position: 'relative',
                maxWidth: 260,
              }}>
                <Image
                  src={proj.screenshot}
                  alt={`${proj.name} screenshot`}
                  width={260}
                  height={180}
                  style={{
                    width: '100%', height: 180,
                    objectFit: 'cover',
                    filter: 'grayscale(20%) contrast(1.1)',
                    display: 'block',
                  }}
                />
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'rgba(0,255,65,0.04)',
                  pointerEvents: 'none',
                }} />
              </div>
            )}

            {/* Stack */}
            <div style={{ marginBottom: 24 }}>
              <div style={{
                fontFamily: '"Share Tech Mono", monospace',
                fontSize: 11, color: 'var(--t-gdim)', marginBottom: 8,
              }}>
                // TECH STACK
              </div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {proj.stack.map(s => (
                  <span key={s} style={{
                    fontFamily: '"Share Tech Mono", monospace',
                    fontSize: 11, color: 'var(--t-text)',
                    background: 'var(--t-gdark)',
                    border: '1px solid var(--t-border)',
                    padding: '3px 10px',
                  }}>{s}</span>
                ))}
              </div>
            </div>

            {/* Link */}
            {proj.url ? (
              <a
                href={proj.url}
                target="_blank"
                rel="noopener noreferrer"
                className="retro-btn"
                onMouseEnter={hover}
                onClick={() => click()}
                style={{ textDecoration: 'none', display: 'inline-block' }}
              >
                ▶ VIEW ON GITHUB
              </a>
            ) : (
              <span style={{
                fontFamily: '"Share Tech Mono", monospace',
                fontSize: 11, color: 'var(--t-dim)',
              }}>
                // Hardware project — no repository
              </span>
            )}
          </div>
        </div>

        {/* Keyboard hint */}
        <div style={{
          marginTop: 12,
          fontFamily: '"Share Tech Mono", monospace',
          fontSize: 11, color: 'var(--t-dim)',
          textAlign: 'right',
        }}>
          // Click a project to view details
        </div>
      </div>
    </section>
  );
}
