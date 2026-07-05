'use client';
import { useState } from 'react';
import Image from 'next/image';
import { useSound } from '@/hooks/useSound';
import { useInView } from '@/hooks/useInView';
import Lightbox from './Lightbox';

const PROJECTS = [
  {
    id: '01',
    name: 'AIBEST TECH',
    year: 'JUL 2026',
    status: '3RD PLACE 🏆',
    stack: ['React', 'Node.js', 'MongoDB'],
    desc: 'Event management and notification center for the AIBEST Tech Academy hackathon held in Burgas. Handles registrations, scheduling, and real-time event notifications for participants. Awarded 3rd place at AIBEST Tech Academy — built as my graduation project for the practice work program.',
    links: [
      { label: 'CLIENT REPO', url: 'https://github.com/UMMustafa23/aibest-persey-client' },
      { label: 'SERVICE REPO', url: 'https://github.com/UMMustafa23/aibest-persey-service' },
    ],
    screenshots: ['/images/aibest-menu.png', '/images/aibest-3rd-place.jpg'],
    tags: ['HACKATHON', 'EVENT MGMT', 'FULL-STACK', 'AWARD'],
    current: false,
  },
  {
    id: '02',
    name: 'CINEMA SYSTEM',
    year: 'IN PROGRESS',
    status: 'IN PROGRESS',
    stack: ['React', 'Node.js', 'Database'],
    desc: 'Cinema ticketing system with seat selection, booking management, and scheduling. Allows users to browse movies, select seats, and purchase tickets with a clean interface.',
    links: [],
    screenshots: ['/images/cinema-menu.png'],
    tags: ['TICKETING', 'UI/UX', 'FULL-STACK'],
    current: true,
  },
  {
    id: '03',
    name: 'PathAI',
    year: 'MAR 2026',
    status: 'DEPLOYED',
    stack: ['Node.js', 'MongoDB', 'React', 'DeepSeek API'],
    desc: 'Cross-platform application helping students who are undecided about their academic major. Uses AI personality and skills assessment to recommend career paths.',
    links: [{ label: 'VIEW ON GITHUB', url: 'https://github.com/UMMustafa23/PathAI' }],
    screenshots: [
      '/images/pathai-assessment.png',
      '/images/pathai-dashboard.png',
      '/images/pathai-results.png',
      '/images/pathai-presentation.jpg',
    ],
    tags: ['AI', 'FULL-STACK', 'EDUCATION'],
    current: false,
  },
  {
    id: '04',
    name: 'TROY',
    year: 'FEB 2026',
    status: 'RELEASED',
    stack: ['C++', 'MSSQL', 'Raylib', 'Wikipedia API'],
    desc: 'Wikipedia-based student–teacher knowledge app. Teachers assign topics; students explore and are tested on content fetched live from the Wikipedia API.',
    links: [{ label: 'VIEW ON GITHUB', url: 'https://github.com/codingburgas/2nd-sprint-10th-grade-troy' }],
    screenshots: ['/images/troy-main.png'],
    tags: ['C++', 'DESKTOP', 'EDUCATION'],
    current: false,
  },
  {
    id: '05',
    name: 'SEEDSEARCH',
    year: 'NOV 2025',
    status: 'RELEASED',
    stack: ['C++', 'Raylib'],
    desc: 'Maze game where the player controls a farmer navigating procedurally generated fields to collect seeds. Built from scratch with collision detection and item spawning.',
    links: [{ label: 'VIEW ON GITHUB', url: 'https://github.com/UMMustafa23/sprint-10th-grade-no-way-out' }],
    screenshots: ['/images/seedsearch-award.jpg', '/images/seedsearch.png'],
    tags: ['GAME DEV', 'C++', 'GRAPHICS'],
    current: false,
  },
  {
    id: '06',
    name: 'SMART WATERING',
    year: 'OCT 2025',
    status: 'BUILT',
    stack: ['Arduino', 'C', 'Sensors'],
    desc: 'Automated smart plant watering system using soil moisture sensors and a water pump. Monitors humidity and waters only when needed — no human intervention required.',
    links: [],
    screenshots: ['/images/arduino-project.jpg'],
    tags: ['ARDUINO', 'IoT', 'HARDWARE'],
    current: false,
  },
];

export default function ProjectsSection() {
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState<{ open: boolean; idx: number }>({ open: false, idx: 0 });
  const { hover, click } = useSound();
  const { ref, inView } = useInView();
  const proj = PROJECTS[active];
  const shots = proj.screenshots;

  const openLightbox = (idx: number) => { click(); setLightbox({ open: true, idx }); };
  const closeLightbox = () => setLightbox({ open: false, idx: 0 });

  return (
    <section
      id="projects"
      ref={ref as React.RefObject<HTMLElement>}
      className={`section-hidden ${inView ? 'section-visible' : ''}`}
      style={{ padding: '100px 28px', background: 'rgba(10,10,10,0.6)' }}
    >
      {lightbox.open && (
        <Lightbox
          images={shots}
          index={lightbox.idx}
          alt={`${proj.name} screenshot`}
          onClose={closeLightbox}
          onChange={idx => setLightbox({ open: true, idx })}
        />
      )}

      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div className="section-heading">CASE FILES</div>

        <div style={{
          fontFamily: '"Share Tech Mono", monospace',
          fontSize: 12, color: '#666', marginBottom: 24, letterSpacing: 1,
        }}>
          &gt; SELECT A CASE FILE TO REVIEW:
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', border: '1px solid #333' }}>

          {/* ── File list ── */}
          <div style={{ borderRight: '1px solid #333', background: '#080808' }}>
            <div style={{
              background: '#fff', color: '#000',
              fontFamily: '"Press Start 2P", monospace',
              fontSize: 7, letterSpacing: 2,
              padding: '7px 14px', borderBottom: '1px solid #333',
            }}>
              ACTIVE CASES
            </div>

            {PROJECTS.map((p, i) => (
              <div
                key={p.id}
                className={`case-card${active === i ? ' active' : ''}`}
                onClick={() => { click(); setActive(i); setLightbox({ open: false, idx: 0 }); }}
                onMouseEnter={hover}
                style={{ borderBottom: '1px solid #1a1a1a' }}
              >
                <div style={{ display: 'flex', gap: 8, marginBottom: 4, alignItems: 'baseline' }}>
                  <span style={{ fontFamily: '"Share Tech Mono"', fontSize: 10, color: '#444' }}>[{p.id}]</span>
                  <span style={{
                    fontFamily: '"Press Start 2P"', fontSize: 7,
                    color: active === i ? '#fff' : '#999',
                  }}>{p.name}</span>
                  {p.current && (
                    <span className="blink" style={{ fontSize: 8, color: '#fff', marginLeft: 'auto' }}>●</span>
                  )}
                </div>
                <div style={{ fontFamily: '"Share Tech Mono"', fontSize: 10, color: '#444' }}>
                  {p.year}
                </div>
                {active === i && (
                  <div style={{ marginTop: 6, display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                    {p.tags.map(t => (
                      <span key={t} style={{
                        fontFamily: '"Share Tech Mono"', fontSize: 9, color: '#777',
                        border: '1px solid #2a2a2a', padding: '1px 5px',
                      }}>{t}</span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* ── Detail panel ── */}
          <div style={{ padding: 28, background: '#050505', position: 'relative' }}>
            <div style={{ position: 'absolute', top: 0, right: 0, width: 18, height: 18, borderTop: '2px solid #fff', borderRight: '2px solid #fff' }} />
            <div style={{ position: 'absolute', bottom: 0, left: 0, width: 18, height: 18, borderBottom: '2px solid #fff', borderLeft: '2px solid #fff' }} />

            <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 4 }}>
              <div style={{ fontFamily: '"Press Start 2P"', fontSize: 13, color: '#fff' }}>
                {proj.name}
              </div>
              {proj.current && (
                <span style={{
                  fontFamily: '"Share Tech Mono"', fontSize: 10,
                  color: '#fff', border: '1px solid #fff', padding: '2px 8px', letterSpacing: 1,
                }}>
                  ● IN PROGRESS
                </span>
              )}
            </div>

            <div style={{
              fontFamily: '"Share Tech Mono"', fontSize: 11, color: '#555',
              marginBottom: 18, letterSpacing: 1,
            }}>
              STATUS: <span style={{ color: '#aaa' }}>{proj.status}</span> · {proj.year}
            </div>

            <p style={{
              fontFamily: '"Share Tech Mono"', fontSize: 13, color: '#999',
              lineHeight: 1.8, marginBottom: 20,
            }}>
              {proj.desc}
            </p>

            {/* Screenshots grid */}
            {shots.length > 0 && (
              <div style={{ marginBottom: 22 }}>
                <div style={{
                  fontFamily: '"Share Tech Mono"', fontSize: 10, color: '#444',
                  letterSpacing: 2, marginBottom: 8,
                }}>
                  // EVIDENCE  <span style={{ color: '#333' }}>— CLICK IMAGE TO EXPAND</span>
                </div>

                {/* Main screenshot */}
                <div
                  onClick={() => openLightbox(0)}
                  style={{
                    position: 'relative', border: '1px solid #2a2a2a',
                    overflow: 'hidden', maxWidth: 320,
                    cursor: 'zoom-in', marginBottom: shots.length > 1 ? 6 : 0,
                  }}
                >
                  <Image
                    src={shots[0]}
                    alt={`${proj.name} screenshot`}
                    width={320} height={200}
                    style={{
                      width: '100%', height: 200, objectFit: 'cover',
                      filter: 'grayscale(100%) contrast(1.1)',
                      display: 'block',
                      transition: 'filter 0.2s',
                    }}
                    onMouseOver={e => (e.currentTarget.style.filter = 'grayscale(50%) contrast(1.1)')}
                    onMouseOut={e => (e.currentTarget.style.filter = 'grayscale(100%) contrast(1.1)')}
                  />
                  <div style={{
                    position: 'absolute', inset: 0, pointerEvents: 'none',
                    background: 'repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,0,0,0.1) 3px,rgba(0,0,0,0.1) 4px)',
                  }} />
                </div>

                {/* Thumbnail strip for multiple screenshots */}
                {shots.length > 1 && (
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    {shots.map((s, i) => (
                      <div
                        key={i}
                        onClick={() => openLightbox(i)}
                        onMouseEnter={hover}
                        style={{
                          width: 52, height: 36, cursor: 'zoom-in',
                          border: '1px solid #2a2a2a',
                          overflow: 'hidden', flexShrink: 0,
                          transition: 'border-color 0.15s',
                        }}
                        onMouseOver={e => ((e.currentTarget as HTMLElement).style.borderColor = '#fff')}
                        onMouseOut={e => ((e.currentTarget as HTMLElement).style.borderColor = '#2a2a2a')}
                      >
                        <Image
                          src={s} alt="" width={52} height={36}
                          style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(100%)' }}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Stack */}
            <div style={{ marginBottom: 22 }}>
              <div style={{ fontFamily: '"Share Tech Mono"', fontSize: 10, color: '#444', letterSpacing: 2, marginBottom: 8 }}>
                // TECH STACK
              </div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {proj.stack.map(s => (
                  <span key={s} style={{
                    fontFamily: '"Share Tech Mono"', fontSize: 11, color: '#aaa',
                    border: '1px solid #2a2a2a', padding: '3px 10px', background: '#0d0d0d',
                  }}>{s}</span>
                ))}
              </div>
            </div>

            {proj.links.length > 0 ? (
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                {proj.links.map(l => (
                  <a key={l.url} href={l.url} target="_blank" rel="noopener noreferrer"
                    className="retro-btn" onMouseEnter={hover} onClick={() => click()}>
                    ▶ {l.label}
                  </a>
                ))}
              </div>
            ) : (
              <span style={{ fontFamily: '"Share Tech Mono"', fontSize: 11, color: '#444' }}>
                {proj.current ? '// Repository will be public after completion' : '// Hardware project — no repository'}
              </span>
            )}
          </div>
        </div>

        <div style={{ marginTop: 10, fontFamily: '"Share Tech Mono"', fontSize: 10, color: '#333', textAlign: 'right' }}>
          ● = currently in development
        </div>
      </div>
    </section>
  );
}
