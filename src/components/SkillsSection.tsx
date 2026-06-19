'use client';
import { useInView } from '@/hooks/useInView';

const SKILL_GROUPS = [
  {
    category: 'LANGUAGES',
    icon: '</>',
    skills: [
      { name: 'JavaScript / TypeScript', pct: 80 },
      { name: 'C++', pct: 75 },
      { name: 'HTML & CSS', pct: 90 },
      { name: 'Python', pct: 40 },
      { name: 'C (Arduino)', pct: 65 },
    ],
  },
  {
    category: 'FRAMEWORKS',
    icon: '⊞',
    skills: [
      { name: 'React / Next.js', pct: 78 },
      { name: 'Node.js', pct: 72 },
      { name: 'Raylib (C++)', pct: 70 },
      { name: 'Tailwind CSS', pct: 75 },
    ],
  },
  {
    category: 'TOOLS & DBs',
    icon: '◉',
    skills: [
      { name: 'Git / GitHub', pct: 80 },
      { name: 'MongoDB', pct: 65 },
      { name: 'MSSQL', pct: 60 },
      { name: 'Arduino IDE', pct: 72 },
      { name: 'MS Office Suite', pct: 90 },
    ],
  },
  {
    category: 'SOFT SKILLS',
    icon: '★',
    skills: [
      { name: 'Teamwork', pct: 95 },
      { name: 'Communication', pct: 90 },
      { name: 'Time Management', pct: 85 },
      { name: 'Problem Solving', pct: 88 },
      { name: 'Adaptability', pct: 92 },
    ],
  },
];

function SkillBar({ name, pct, inView }: { name: string; pct: number; inView: boolean }) {
  const blocks = 20;
  const filled = Math.round((pct / 100) * blocks);

  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{
        display: 'flex', justifyContent: 'space-between', marginBottom: 5,
        fontFamily: '"Share Tech Mono", monospace',
      }}>
        <span style={{ fontSize: 12, color: 'var(--t-text)' }}>{name}</span>
        <span style={{ fontSize: 11, color: 'var(--t-gdim)' }}>{pct}%</span>
      </div>
      <div style={{ display: 'flex', gap: 2 }}>
        {Array.from({ length: blocks }, (_, i) => (
          <div
            key={i}
            style={{
              width: '100%',
              height: 10,
              background: i < filled && inView ? 'var(--t-green)' : 'var(--t-gdark)',
              border: '1px solid rgba(0,255,65,0.15)',
              transition: `background ${0.05 * i + 0.2}s ease`,
              boxShadow: i < filled && inView ? '0 0 4px rgba(0,255,65,0.5)' : 'none',
            }}
          />
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
      style={{ padding: '100px 24px' }}
    >
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div className="section-heading">SKILLS</div>

        {/* RPG header */}
        <div style={{
          fontFamily: '"Share Tech Mono", monospace',
          fontSize: 12, color: 'var(--t-amber)',
          marginBottom: 32, letterSpacing: 1,
        }}>
          &gt; CHARACTER STATS OVERVIEW — LVL 16 ENGINEER
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 24,
        }}>
          {SKILL_GROUPS.map(group => (
            <div
              key={group.category}
              className="terminal-window"
              style={{ padding: 20 }}
            >
              {/* Group header */}
              <div style={{
                fontFamily: '"Press Start 2P", monospace',
                fontSize: 9,
                color: 'var(--t-amber)',
                marginBottom: 20,
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                borderBottom: '1px solid var(--t-border)',
                paddingBottom: 10,
              }}>
                <span style={{ color: 'var(--t-green)' }}>{group.icon}</span>
                {group.category}
              </div>

              {group.skills.map(skill => (
                <SkillBar key={skill.name} {...skill} inView={inView} />
              ))}
            </div>
          ))}
        </div>

        {/* XP bar */}
        <div style={{
          marginTop: 40,
          background: 'var(--t-card)',
          border: '1px solid var(--t-border)',
          padding: '20px 24px',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
            <span style={{
              fontFamily: '"Press Start 2P", monospace',
              fontSize: 9, color: 'var(--t-green)',
            }}>
              OVERALL PROGRESS
            </span>
            <span style={{
              fontFamily: '"Share Tech Mono", monospace',
              fontSize: 11, color: 'var(--t-amber)',
            }}>
              JUNIOR → MID  [3 YRS EXP]
            </span>
          </div>
          <div className="stat-bar-track" style={{ height: 18 }}>
            <div
              className="stat-bar-fill"
              style={{
                width: inView ? '45%' : '0%',
                transition: 'width 2s ease 0.5s',
                position: 'relative',
                background: 'linear-gradient(90deg, var(--t-gdim), var(--t-green))',
              }}
            >
              <div style={{
                position: 'absolute', right: 0, top: 0, bottom: 0,
                width: 3, background: 'white', opacity: 0.8,
              }} />
            </div>
          </div>
          <div style={{
            fontFamily: '"Share Tech Mono", monospace',
            fontSize: 11, color: 'var(--t-dim)',
            marginTop: 6,
          }}>
            EXP: 3200 / 7000  ·  NEXT LEVEL: INTERNSHIP XP REQUIRED
          </div>
        </div>
      </div>
    </section>
  );
}
