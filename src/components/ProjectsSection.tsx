'use client';
import { useState } from 'react';
import Image from 'next/image';
import { useSound } from '@/hooks/useSound';
import { useInView } from '@/hooks/useInView';

const PROJECTS = [
  {
    id: '01',
    name: 'PathAI',
    year: 'MAR 2026',
    stack: ['Node.js', 'MongoDB', 'React', 'DeepSeek API'],
    desc: 'Cross-platform application helping students who are undecided about their academic major. Uses AI personality and skills assessment to recommend career paths.',
    status: 'DEPLOYED',
    url: 'https://github.com/UMMustafa23/PathAI',
    screenshot: '/images/pathai-screenshot.jpg',
    tags: ['AI', 'FULL-STACK', 'EDUCATION'],
  },
  {
    id: '02',
    name: 'TROY',
    year: 'FEB 2026',
    stack: ['C++', 'MSSQL', 'Raylib', 'Wikipedia API'],
    desc: 'Wikipedia-based student–teacher knowledge app. Teachers assign topics; students explore and are tested on content fetched live from the Wikipedia API.',
    status: 'RELEASED',
    url: 'https://github.com/codingburgas/2nd-sprint-10th-grade-troy',
    screenshot: null,
    tags: ['C++', 'DESKTOP', 'EDUCATION'],
  },
  {
    id: '03',
    name: 'SEEDSEARCH',
    year: 'NOV 2025',
    stack: ['C++', 'Raylib'],
    desc: 'Maze game where the player controls a farmer navigating procedurally generated fields to collect seeds. Built from scratch with collision detection and item spawning.',
    status: 'RELEASED',
    url: 'https://github.com/UMMustafa23/sprint-10th-grade-no-way-out',
    screenshot: null,
    tags: ['GAME DEV', 'C++', 'GRAPHICS'],
  },
  {
    id: '04',
    name: 'SMART WATERING',
    year: 'OCT 2025',
    stack: ['Arduino', 'C', 'Sensors'],
    desc: 'Automated smart plant watering system using soil moisture sensors and a water pump. Monitors humidity and waters only when needed — no human intervention required.',
    status: 'BUILT',
    url: null,
    screenshot: null,
    tags: ['ARDUINO', 'IoT', 'HARDWARE'],
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
      style={{ padding: '100px 28px', background: 'rgba(10,10,10,0.6)' }}
    >
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div className="section-heading">CASE FILES</div>

        {/* Carmen Sandiego "WHERE DO YOU GO?" prompt */}
        <div style={{
          fontFamily: '"Share Tech Mono", monospace',
          fontSize: 12, color: '#666',
          marginBottom: 24, letterSpacing: 1,
        }}>
          &gt; SELECT A CASE FILE TO REVIEW:
        </div>

        <div style={{
          display: 'grid', gridTemplateColumns: '260px 1fr', gap: 0,
          border: '1px solid #333',
        }}>

          {/* ── File list (left) ── */}
          <div style={{ borderRight: '1px solid #333', background: '#080808' }}>
            <div style={{
              background: '#fff', color: '#000',
              fontFamily: '"Press Start 2P", monospace',
              fontSize: 7, letterSpacing: 2,
              padding: '7px 14px',
              borderBottom: '1px solid #333',
            }}>
              ACTIVE CASES
            </div>

            {PROJECTS.map((p, i) => (
              <div
                key={p.id}
                className={`case-card${active === i ? ' active' : ''}`}
                onClick={() => { click(); setActive(i); }}
                onMouseEnter={hover}
                style={{ borderBottom: '1px solid #1a1a1a' }}
              >
                <div style={{ display: 'flex', gap: 10, marginBottom: 5, alignItems: 'baseline' }}>
                  <span style={{
                    fontFamily: '"Share Tech Mono", monospace',
                    fontSize: 10, color: '#555',
                  }}>
                    [{p.id}]
                  </span>
                  <span style={{
                    fontFamily: '"Press Start 2P", monospace',
                    fontSize: 7,
                    color: active === i ? '#ffffff' : '#aaaaaa',
                  }}>
                    {p.name}
                  </span>
                </div>
                <div style={{
                  fontFamily: '"Share Tech Mono", monospace',
                  fontSize: 10, color: '#444',
                }}>
                  {p.year}
                </div>
                {active === i && (
                  <div style={{ marginTop: 7, display: 'flex', gap: 5, flexWrap: 'wrap' }}>
                    {p.tags.map(t => (
                      <span key={t} style={{
                        fontFamily: '"Share Tech Mono", monospace',
                        fontSize: 9, color: '#888',
                        border: '1px solid #333', padding: '1px 5px',
                      }}>{t}</span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* ── Detail panel (right) ── */}
          <div style={{ padding: 28, background: '#050505', position: 'relative' }}>
            {/* Corner marks */}
            <div style={{ position: 'absolute', top: 0, right: 0, width: 18, height: 18, borderTop: '2px solid #fff', borderRight: '2px solid #fff' }} />
            <div style={{ position: 'absolute', bottom: 0, left: 0, width: 18, height: 18, borderBottom: '2px solid #fff', borderLeft: '2px solid #fff' }} />

            <div style={{
              fontFamily: '"Press Start 2P", monospace',
              fontSize: 13, color: '#ffffff',
              marginBottom: 6,
            }}>
              {proj.name}
            </div>

            <div style={{
              fontFamily: '"Share Tech Mono", monospace',
              fontSize: 11, color: '#555',
              marginBottom: 20, letterSpacing: 1,
            }}>
              STATUS: <span style={{ color: '#ccc' }}>{proj.status}</span>
              &nbsp;·&nbsp;{proj.year}
            </div>

            <p style={{
              fontFamily: '"Share Tech Mono", monospace',
              fontSize: 13, color: '#999', lineHeight: 1.8,
              marginBottom: 22,
            }}>
              {proj.desc}
            </p>

            {/* Screenshot */}
            {proj.screenshot && (
              <div style={{
                border: '1px solid #333', marginBottom: 22,
                overflow: 'hidden', maxWidth: 240, position: 'relative',
              }}>
                <Image
                  src={proj.screenshot}
                  alt={`${proj.name} screenshot`}
                  width={240} height={160}
                  style={{
                    width: '100%', height: 160,
                    objectFit: 'cover',
                    filter: 'grayscale(100%) contrast(1.1)',
                    display: 'block',
                  }}
                />
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,0,0,0.1) 3px,rgba(0,0,0,0.1) 4px)',
                  pointerEvents: 'none',
                }} />
              </div>
            )}

            {/* Stack */}
            <div style={{ marginBottom: 22 }}>
              <div style={{
                fontFamily: '"Share Tech Mono", monospace',
                fontSize: 10, color: '#444', letterSpacing: 2, marginBottom: 8,
              }}>
                // TECH STACK
              </div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {proj.stack.map(s => (
                  <span key={s} style={{
                    fontFamily: '"Share Tech Mono", monospace',
                    fontSize: 11, color: '#aaa',
                    border: '1px solid #333',
                    padding: '3px 10px',
                    background: '#0d0d0d',
                  }}>{s}</span>
                ))}
              </div>
            </div>

            {proj.url ? (
              <a
                href={proj.url}
                target="_blank"
                rel="noopener noreferrer"
                className="retro-btn"
                onMouseEnter={hover}
                onClick={() => click()}
              >
                ▶ VIEW ON GITHUB
              </a>
            ) : (
              <span style={{
                fontFamily: '"Share Tech Mono", monospace',
                fontSize: 11, color: '#444',
              }}>
                // Hardware project — no repository
              </span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
