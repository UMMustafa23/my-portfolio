'use client';
import { useInView } from '@/hooks/useInView';

const CERTS = [
  { name: 'IT Specialist – Computational Thinking', org: 'Certiport',  date: 'DEC 2025', ref: 'CS-001' },
  { name: 'IT Specialist – JavaScript',            org: 'Certiport',  date: 'JUN 2025', ref: 'JS-002' },
  { name: 'IT Specialist – HTML and CSS',          org: 'Certiport',  date: 'JUN 2024', ref: 'WB-003' },
  { name: 'MOS: Excel Associate (Office 2019)',    org: 'Microsoft',  date: 'JAN 2025', ref: 'XL-004' },
  { name: 'MOS: Word Associate (Office 2019)',     org: 'Microsoft',  date: 'MAR 2024', ref: 'WD-005' },
  { name: 'Cisco Networking Academy Learn-A-Thon', org: 'Cisco',      date: 'APR 2026', ref: 'NW-006' },
];

const VOLUNTEER = [
  {
    role: 'VOLUNTEER — QUAESTOR',
    org: 'IOAI 2024  (International Olympiad in Artificial Intelligence)',
    desc: 'Guided international participants, served as quaestor, assisted with event logistics and room preparation in a multicultural environment.',
    date: '2024',
  },
  {
    role: 'INSTRUCTOR — SCRATCH PROGRAMMING',
    org: 'CodingKids Program',
    desc: 'Taught Scratch programming to children, introducing computational thinking and fostering early interest in coding.',
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
      style={{ padding: '100px 28px', background: 'rgba(10,10,10,0.5)' }}
    >
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div className="section-heading">CREDENTIALS</div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 36 }}>

          {/* ── Certifications ── */}
          <div>
            <div style={{
              background: '#fff', color: '#000',
              fontFamily: '"Press Start 2P", monospace',
              fontSize: 8, letterSpacing: 2,
              padding: '7px 14px', marginBottom: 16,
            }}>
              OFFICIAL RECORDS
            </div>

            {/* Table header */}
            <div style={{
              display: 'grid', gridTemplateColumns: '1fr auto',
              padding: '4px 12px 4px 0',
              borderBottom: '1px solid #222',
              fontFamily: '"Share Tech Mono", monospace',
              fontSize: 10, color: '#444', letterSpacing: 1,
              marginBottom: 6,
            }}>
              <span>CERTIFICATION</span>
              <span>DATE</span>
            </div>

            {CERTS.map((c, i) => (
              <div
                key={c.ref}
                style={{
                  display: 'grid', gridTemplateColumns: '1fr auto',
                  padding: '10px 0',
                  borderBottom: '1px solid #111',
                  opacity: inView ? 1 : 0,
                  transform: inView ? 'none' : 'translateX(-16px)',
                  transition: `opacity 0.4s ease ${i * 0.08}s, transform 0.4s ease ${i * 0.08}s`,
                  alignItems: 'start', gap: 12,
                }}
              >
                <div>
                  <div style={{
                    fontFamily: '"Share Tech Mono", monospace',
                    fontSize: 12, color: '#ccc', marginBottom: 2,
                  }}>
                    {c.name}
                  </div>
                  <div style={{
                    fontFamily: '"Share Tech Mono", monospace',
                    fontSize: 10, color: '#444',
                  }}>
                    {c.org}  ·  REF #{c.ref}
                  </div>
                </div>
                <div style={{
                  fontFamily: '"Share Tech Mono", monospace',
                  fontSize: 10, color: '#666',
                  whiteSpace: 'nowrap',
                }}>
                  {c.date}
                </div>
              </div>
            ))}
          </div>

          {/* ── Volunteer ── */}
          <div>
            <div style={{
              background: '#fff', color: '#000',
              fontFamily: '"Press Start 2P", monospace',
              fontSize: 8, letterSpacing: 2,
              padding: '7px 14px', marginBottom: 16,
            }}>
              FIELD OPERATIONS
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {VOLUNTEER.map((v, i) => (
                <div
                  key={v.role}
                  style={{
                    border: '1px solid #222',
                    borderLeft: '3px solid #fff',
                    background: '#080808',
                    padding: '16px 18px',
                    opacity: inView ? 1 : 0,
                    transform: inView ? 'none' : 'translateX(16px)',
                    transition: `opacity 0.4s ease ${0.2 + i * 0.12}s, transform 0.4s ease ${0.2 + i * 0.12}s`,
                  }}
                >
                  <div style={{
                    fontFamily: '"Press Start 2P", monospace',
                    fontSize: 7, color: '#fff', marginBottom: 6,
                  }}>
                    {v.role}
                  </div>
                  <div style={{
                    fontFamily: '"Share Tech Mono", monospace',
                    fontSize: 11, color: '#555', marginBottom: 10,
                  }}>
                    {v.org}  ·  {v.date}
                  </div>
                  <p style={{
                    fontFamily: '"Share Tech Mono", monospace',
                    fontSize: 12, color: '#888', lineHeight: 1.7,
                  }}>
                    {v.desc}
                  </p>
                </div>
              ))}

              <div style={{
                border: '1px dashed #222', padding: 14,
                fontFamily: '"Share Tech Mono", monospace',
                fontSize: 11, color: '#333', textAlign: 'center',
                opacity: inView ? 0.7 : 0, transition: 'opacity 0.5s ease 0.5s',
              }}>
                // MORE OPERATIONS PENDING...
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
