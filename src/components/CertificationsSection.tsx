'use client';
import { useInView } from '@/hooks/useInView';

const CERTS = [
  {
    name: 'IT Specialist – Computational Thinking',
    org: 'Certiport',
    date: 'DEC 2025',
    icon: '◈',
    color: 'var(--t-green)',
  },
  {
    name: 'IT Specialist – JavaScript',
    org: 'Certiport',
    date: 'JUN 2025',
    icon: '◈',
    color: 'var(--t-green)',
  },
  {
    name: 'IT Specialist – HTML and CSS',
    org: 'Certiport',
    date: 'JUN 2024',
    icon: '◈',
    color: 'var(--t-green)',
  },
  {
    name: 'MOS: Excel Associate (Office 2019)',
    org: 'Microsoft',
    date: 'JAN 2025',
    icon: '⊞',
    color: 'var(--t-amber)',
  },
  {
    name: 'MOS: Word Associate (Office 2019)',
    org: 'Microsoft',
    date: 'MAR 2024',
    icon: '⊞',
    color: 'var(--t-amber)',
  },
  {
    name: 'Cisco Networking Academy Learn-A-Thon',
    org: 'Cisco',
    date: 'APR 2026',
    icon: '◉',
    color: 'var(--t-amber)',
  },
];

const VOLUNTEER = [
  {
    role: 'VOLUNTEER — QUAESTOR',
    org: 'IOAI 2024 (International Olympiad in AI)',
    desc: 'Guided international participants, worked as quaestor, assisted with event organization and room preparation in a multicultural environment.',
    date: '2024',
  },
  {
    role: 'TEACHER — SCRATCH PROGRAMMING',
    org: 'CodingKids Program',
    desc: 'Taught Scratch programming to children, fostering early interest in coding and computational thinking.',
    date: '2024',
  },
];

export default function CertificationsSection() {
  const { ref, inView } = useInView();

  return (
    <section
      id="certs"
      ref={ref as React.RefObject<HTMLElement>}
      className={`section-hidden ${inView ? 'section-visible' : ''}`}
      style={{ padding: '100px 24px', background: 'rgba(13,17,0,0.4)' }}
    >
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div className="section-heading">ACHIEVEMENTS</div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 40,
        }}>
          {/* Certifications */}
          <div>
            <div style={{
              fontFamily: '"Share Tech Mono", monospace',
              fontSize: 12, color: 'var(--t-amber)',
              marginBottom: 20, letterSpacing: 1,
            }}>
              &gt; CERTIFICATIONS UNLOCKED:
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {CERTS.map((cert, i) => (
                <div
                  key={cert.name}
                  className="cert-badge"
                  style={{
                    borderLeftColor: cert.color,
                    animationDelay: `${i * 0.1}s`,
                    opacity: inView ? 1 : 0,
                    transition: `opacity 0.4s ease ${i * 0.1}s, transform 0.4s ease ${i * 0.1}s`,
                    transform: inView ? 'translateX(0)' : 'translateX(-20px)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                    <span style={{
                      fontSize: 16, color: cert.color, flexShrink: 0, marginTop: 2,
                    }}>
                      {cert.icon}
                    </span>
                    <div>
                      <div style={{
                        fontFamily: '"Share Tech Mono", monospace',
                        fontSize: 13, color: 'var(--t-text)',
                        marginBottom: 2,
                      }}>
                        {cert.name}
                      </div>
                      <div style={{
                        fontFamily: '"Share Tech Mono", monospace',
                        fontSize: 11,
                        display: 'flex', gap: 10, color: 'var(--t-dim)',
                      }}>
                        <span>{cert.org}</span>
                        <span style={{ color: cert.color }}>·</span>
                        <span>{cert.date}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Volunteering */}
          <div>
            <div style={{
              fontFamily: '"Share Tech Mono", monospace',
              fontSize: 12, color: 'var(--t-amber)',
              marginBottom: 20, letterSpacing: 1,
            }}>
              &gt; VOLUNTEER EXPERIENCE:
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {VOLUNTEER.map((v, i) => (
                <div
                  key={v.role}
                  className="terminal-window"
                  style={{
                    padding: 18,
                    opacity: inView ? 1 : 0,
                    transition: `opacity 0.5s ease ${0.3 + i * 0.15}s, transform 0.5s ease ${0.3 + i * 0.15}s`,
                    transform: inView ? 'translateX(0)' : 'translateX(20px)',
                  }}
                >
                  <div style={{
                    fontFamily: '"Press Start 2P", monospace',
                    fontSize: 8, color: 'var(--t-green)',
                    marginBottom: 6,
                  }}>
                    {v.role}
                  </div>
                  <div style={{
                    fontFamily: '"Share Tech Mono", monospace',
                    fontSize: 11, color: 'var(--t-amber)',
                    marginBottom: 8,
                  }}>
                    {v.org} · {v.date}
                  </div>
                  <p style={{
                    fontFamily: '"Share Tech Mono", monospace',
                    fontSize: 12, color: 'var(--t-text)', lineHeight: 1.7,
                  }}>
                    {v.desc}
                  </p>
                </div>
              ))}

              {/* Extra badge */}
              <div style={{
                border: '1px dashed var(--t-border)',
                padding: 16,
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                opacity: inView ? 0.7 : 0,
                transition: 'opacity 0.5s ease 0.6s',
              }}>
                <span style={{ fontSize: 24, color: 'var(--t-gdim)' }}>?</span>
                <span style={{
                  fontFamily: '"Share Tech Mono", monospace',
                  fontSize: 12, color: 'var(--t-dim)',
                }}>
                  // More achievements incoming...
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
