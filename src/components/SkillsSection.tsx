'use client';
import { useInView } from '@/hooks/useInView';

const GROUPS = [
  {
    label: 'LANGUAGES',
    skills: [
      { name: 'JavaScript / TypeScript', pct: 80 },
      { name: 'HTML & CSS',              pct: 90 },
      { name: 'C++',                     pct: 75 },
      { name: 'Python',                  pct: 40 },
      { name: 'C  (Arduino)',            pct: 65 },
    ],
  },
  {
    label: 'FRAMEWORKS & TOOLS',
    skills: [
      { name: 'React / Next.js',  pct: 78 },
      { name: 'Node.js',          pct: 72 },
      { name: 'Raylib (C++)',     pct: 70 },
      { name: 'Git / GitHub',     pct: 82 },
      { name: 'MongoDB & MSSQL',  pct: 62 },
    ],
  },
  {
    label: 'SPECIALIST SKILLS',
    skills: [
      { name: 'Arduino / IoT',    pct: 72 },
      { name: 'Game Dev (C++)',    pct: 68 },
      { name: 'AI Integration',   pct: 65 },
      { name: 'MS Office Suite',  pct: 92 },
    ],
  },
  {
    label: 'FIELD ABILITIES',
    skills: [
      { name: 'Teamwork',         pct: 95 },
      { name: 'Communication',    pct: 90 },
      { name: 'Problem Solving',  pct: 88 },
      { name: 'Time Management',  pct: 85 },
    ],
  },
];

function Bar({ name, pct, inView }: { name: string; pct: number; inView: boolean }) {
  const blocks = 18;
  const filled = Math.round((pct / 100) * blocks);
  return (
    <div style={{ marginBottom: 13 }}>
      <div style={{
        display: 'flex', justifyContent: 'space-between', marginBottom: 5,
        fontFamily: '"Share Tech Mono", monospace', fontSize: 12,
      }}>
        <span style={{ color: '#aaa' }}>{name}</span>
        <span style={{ color: '#555' }}>{pct}%</span>
      </div>
      <div style={{ display: 'flex', gap: 2 }}>
        {Array.from({ length: blocks }, (_, i) => (
          <div key={i} style={{
            flex: 1, height: 9,
            background: i < filled && inView ? '#ffffff' : '#1a1a1a',
            border: '1px solid #2a2a2a',
            transition: `background ${0.04 * i + 0.15}s ease`,
          }} />
        ))}
      </div>
    </div>
  );
}

export default function SkillsSection() {
  const { ref, inView } = useInView();
  return (
    <section
      id="skills"
      ref={ref as React.RefObject<HTMLElement>}
      className={`section-hidden ${inView ? 'section-visible' : ''}`}
      style={{ padding: '100px 28px' }}
    >
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div className="section-heading">EVIDENCE</div>

        <div style={{
          fontFamily: '"Share Tech Mono", monospace',
          fontSize: 12, color: '#555',
          marginBottom: 32, letterSpacing: 1,
        }}>
          &gt; OPERATIVE ABILITY ASSESSMENT — FILED BY ACME INTELLIGENCE
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: 20,
        }}>
          {GROUPS.map(g => (
            <div key={g.label} style={{
              border: '1px solid #222',
              borderTop: '2px solid #fff',
              background: '#080808',
              padding: 20,
            }}>
              <div style={{
                fontFamily: '"Press Start 2P", monospace',
                fontSize: 8, color: '#fff',
                letterSpacing: 2, marginBottom: 20,
                paddingBottom: 10,
                borderBottom: '1px solid #1a1a1a',
              }}>
                {g.label}
              </div>
              {g.skills.map(s => <Bar key={s.name} {...s} inView={inView} />)}
            </div>
          ))}
        </div>

        {/* Overall level bar */}
        <div style={{
          marginTop: 30, border: '1px solid #222',
          background: '#080808', padding: '20px 24px',
        }}>
          <div style={{
            display: 'flex', justifyContent: 'space-between',
            fontFamily: '"Share Tech Mono", monospace', fontSize: 11,
            marginBottom: 10,
          }}>
            <span style={{ color: '#fff', fontFamily: '"Press Start 2P"', fontSize: 8, letterSpacing: 2 }}>
              OVERALL RANK
            </span>
            <span style={{ color: '#666' }}>JUNIOR  →  MID LEVEL  ·  3 YRS EXP</span>
          </div>
          <div className="stat-bar-track" style={{ height: 14 }}>
            <div className="stat-bar-fill" style={{
              width: inView ? '45%' : '0%',
              transition: 'width 2s ease 0.4s',
              background: 'linear-gradient(90deg, #444, #ffffff)',
            }} />
          </div>
          <div style={{
            fontFamily: '"Share Tech Mono", monospace',
            fontSize: 11, color: '#444', marginTop: 6,
          }}>
            PROGRESS: 3200 XP / 7000 XP  ·  NEXT RANK REQUIRES: INTERNSHIP
          </div>
        </div>
      </div>
    </section>
  );
}
