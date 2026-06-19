'use client';
import { useState, FormEvent } from 'react';
import { useSound } from '@/hooks/useSound';
import { useInView } from '@/hooks/useInView';

type Status = 'idle' | 'sending' | 'sent' | 'error';

export default function ContactSection() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const { hover, click, typeKey, success } = useSound();
  const { ref, inView } = useInView();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    click();
    setStatus('sending');
    try {
      const res = await fetch('https://formspree.io/f/xpwzkvra', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ name, email, message }),
      });
      if (res.ok) { setStatus('sent'); success(); setName(''); setEmail(''); setMessage(''); }
      else setStatus('error');
    } catch { setStatus('error'); }
  };

  return (
    <section
      id="contact"
      ref={ref as React.RefObject<HTMLElement>}
      className={`section-hidden ${inView ? 'section-visible' : ''}`}
      style={{ padding: '100px 28px' }}
    >
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <div className="section-heading">DISPATCH</div>

        <div style={{
          fontFamily: '"Share Tech Mono", monospace',
          fontSize: 12, color: '#555',
          marginBottom: 32, lineHeight: 2, letterSpacing: 0.5,
        }}>
          &gt; OPEN FOR: internships, collaborations, freelance<br />
          &gt; RESPONSE TIME: under 24 hours<br />
          &gt; PREFERRED CHANNEL: email or LinkedIn
        </div>

        {/* Direct contact links */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 10,
          marginBottom: 36,
        }}>
          {[
            { label: 'EMAIL',    value: 'ulvie1m@gmail.com',     href: 'mailto:ulvie1m@gmail.com' },
            { label: 'GITHUB',   value: 'UMMustafa23',            href: 'https://github.com/UMMustafa23' },
            { label: 'LINKEDIN', value: 'ulvie-mustafa',          href: 'https://www.linkedin.com/in/ulvie-mustafa-4115632ba/' },
            { label: 'PHONE',    value: '+359 88 451 7040',       href: 'tel:+359884517040' },
          ].map(l => (
            <a
              key={l.label}
              href={l.href}
              target={l.href.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              onMouseEnter={hover} onClick={() => click()}
              style={{
                display: 'block',
                border: '1px solid #222',
                borderTop: '2px solid #444',
                background: '#080808',
                padding: '12px 16px',
                textDecoration: 'none',
                transition: 'border-top-color 0.15s, background 0.15s',
              }}
              onMouseOver={e => {
                (e.currentTarget as HTMLElement).style.borderTopColor = '#fff';
                (e.currentTarget as HTMLElement).style.background = '#0d0d0d';
              }}
              onMouseOut={e => {
                (e.currentTarget as HTMLElement).style.borderTopColor = '#444';
                (e.currentTarget as HTMLElement).style.background = '#080808';
              }}
            >
              <div style={{ fontFamily: '"Share Tech Mono"', fontSize: 10, color: '#555', marginBottom: 4, letterSpacing: 1 }}>
                {l.label}
              </div>
              <div style={{ fontFamily: '"Share Tech Mono"', fontSize: 12, color: '#ccc' }}>
                {l.value}
              </div>
            </a>
          ))}
        </div>

        {/* Terminal form */}
        <div style={{ border: '1px solid #333', background: '#060606' }}>
          {/* Title bar */}
          <div style={{
            background: '#fff', color: '#000',
            fontFamily: '"Press Start 2P", monospace',
            fontSize: 8, letterSpacing: 2,
            padding: '7px 14px',
            display: 'flex', justifyContent: 'space-between',
          }}>
            <span>SEND DISPATCH</span>
            <span>send_message.exe</span>
          </div>

          <form onSubmit={handleSubmit} style={{ padding: 24 }}>
            {status === 'sent' ? (
              <div style={{
                textAlign: 'center', padding: '30px 0',
                fontFamily: '"Press Start 2P", monospace',
                fontSize: 10, color: '#fff', lineHeight: 2.5,
              }}>
                MESSAGE TRANSMITTED<br />
                <span style={{ fontSize: 8, color: '#666' }}>EXPECT REPLY WITHIN 24 HRS</span>
              </div>
            ) : (
              <>
                {[
                  { label: 'AGENT NAME', value: name, set: setName, type: 'text', ph: 'Your name' },
                  { label: 'FREQUENCY (EMAIL)', value: email, set: setEmail, type: 'email', ph: 'your@email.com' },
                ].map(f => (
                  <div key={f.label} style={{ marginBottom: 22 }}>
                    <div style={{
                      fontFamily: '"Share Tech Mono", monospace',
                      fontSize: 11, color: '#555', marginBottom: 6, letterSpacing: 1,
                    }}>
                      &gt; {f.label}:
                    </div>
                    <input
                      className="terminal-input"
                      type={f.type}
                      required
                      value={f.value}
                      onChange={e => { f.set(e.target.value); typeKey(); }}
                      placeholder={f.ph}
                    />
                  </div>
                ))}

                <div style={{ marginBottom: 26 }}>
                  <div style={{
                    fontFamily: '"Share Tech Mono", monospace',
                    fontSize: 11, color: '#555', marginBottom: 6, letterSpacing: 1,
                  }}>
                    &gt; MESSAGE:
                  </div>
                  <textarea
                    className="terminal-input"
                    required
                    rows={5}
                    value={message}
                    onChange={e => { setMessage(e.target.value); typeKey(); }}
                    placeholder="Your message..."
                    style={{ resize: 'vertical', display: 'block' }}
                  />
                </div>

                {status === 'error' && (
                  <div style={{
                    fontFamily: '"Share Tech Mono", monospace',
                    fontSize: 12, color: '#888', marginBottom: 14,
                  }}>
                    TRANSMISSION FAILED. TRY EMAIL DIRECTLY.
                  </div>
                )}

                <button
                  type="submit"
                  className="retro-btn"
                  onMouseEnter={hover}
                  disabled={status === 'sending'}
                  style={{ width: '100%', textAlign: 'center' }}
                >
                  {status === 'sending' ? '▶ TRANSMITTING...' : '▶▶  SEND DISPATCH  ◀◀'}
                </button>
              </>
            )}
          </form>
        </div>

        {/* Footer */}
        <div style={{
          marginTop: 56, borderTop: '1px solid #1a1a1a', paddingTop: 20,
          textAlign: 'center',
          fontFamily: '"Share Tech Mono", monospace',
          fontSize: 11, color: '#333', lineHeight: 2,
        }}>
          <div style={{
            fontFamily: '"Press Start 2P", monospace',
            fontSize: 7, color: '#444',
            letterSpacing: 3, marginBottom: 6,
          }}>
            ACME DETECTIVE AGENCY  ·  OPERATIVE: ULVIE MUSTAFA
          </div>
          Built with Next.js  ·  Burgas, Bulgaria  ·  2026<br />
          <span style={{ color: '#fff', fontSize: 10 }}>ulvie1m@gmail.com</span>
        </div>
      </div>
    </section>
  );
}
