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
    // Formspree-compatible endpoint — replace with your own form ID
    const endpoint = 'https://formspree.io/f/xpwzkvra';
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ name, email, message }),
      });
      if (res.ok) {
        setStatus('sent');
        success();
        setName(''); setEmail(''); setMessage('');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <section
      id="contact"
      ref={ref as React.RefObject<HTMLElement>}
      className={`section-hidden ${inView ? 'section-visible' : ''}`}
      style={{ padding: '100px 24px' }}
    >
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <div className="section-heading">CONTACT</div>

        <div style={{
          fontFamily: '"Share Tech Mono", monospace',
          fontSize: 12, color: 'var(--t-amber)',
          marginBottom: 32, lineHeight: 1.8,
        }}>
          &gt; OPEN FOR: internships, collaborations, freelance projects<br />
          &gt; RESPONSE TIME: &lt; 24 hours<br />
          &gt; PREFERRED: email / LinkedIn
        </div>

        {/* Direct links */}
        <div style={{
          display: 'flex', gap: 20, flexWrap: 'wrap',
          marginBottom: 40,
          padding: '16px 20px',
          background: 'var(--t-card)',
          border: '1px solid var(--t-border)',
        }}>
          {[
            { label: '✉ EMAIL',    value: 'ulvie1m@gmail.com',     href: 'mailto:ulvie1m@gmail.com' },
            { label: '◈ GITHUB',   value: 'UMMustafa23',            href: 'https://github.com/UMMustafa23' },
            { label: '⊞ LINKEDIN', value: 'ulvie-mustafa',          href: 'https://www.linkedin.com/in/ulvie-mustafa-4115632ba/' },
            { label: '☏ PHONE',    value: '+359 88 451 7040',       href: 'tel:+359884517040' },
          ].map(l => (
            <a
              key={l.label}
              href={l.href}
              target={l.href.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              onMouseEnter={hover}
              onClick={() => click()}
              style={{
                fontFamily: '"Share Tech Mono", monospace',
                textDecoration: 'none',
                color: 'var(--t-text)',
                transition: 'color 0.15s',
              }}
              onMouseOver={e => (e.currentTarget.style.color = 'var(--t-green)')}
              onMouseOut={e => (e.currentTarget.style.color = 'var(--t-text)')}
            >
              <span style={{ color: 'var(--t-amber)' }}>{l.label}</span>
              <br />
              <span style={{ fontSize: 12 }}>{l.value}</span>
            </a>
          ))}
        </div>

        {/* Terminal form */}
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
              send_message.exe
            </span>
          </div>

          <form onSubmit={handleSubmit} style={{ padding: 24 }}>
            {status === 'sent' ? (
              <div style={{
                fontFamily: '"Press Start 2P", monospace',
                fontSize: 11, color: 'var(--t-green)',
                lineHeight: 2, textAlign: 'center', padding: '20px 0',
              }}>
                <div style={{ fontSize: 24, marginBottom: 12 }}>✓</div>
                MESSAGE TRANSMITTED<br />
                <span style={{ color: 'var(--t-amber)', fontSize: 9 }}>
                  EXPECT A REPLY WITHIN 24HRS
                </span>
              </div>
            ) : (
              <>
                {[
                  { label: 'NAME', value: name, onChange: setName, type: 'text', placeholder: 'Your name' },
                  { label: 'EMAIL', value: email, onChange: setEmail, type: 'email', placeholder: 'your@email.com' },
                ].map(f => (
                  <div key={f.label} style={{ marginBottom: 22 }}>
                    <div style={{
                      fontFamily: '"Share Tech Mono", monospace',
                      fontSize: 12, color: 'var(--t-amber)', marginBottom: 6,
                    }}>
                      &gt; {f.label}:
                    </div>
                    <input
                      className="terminal-input"
                      type={f.type}
                      required
                      value={f.value}
                      onChange={e => { f.onChange(e.target.value); typeKey(); }}
                      placeholder={f.placeholder}
                    />
                  </div>
                ))}

                <div style={{ marginBottom: 28 }}>
                  <div style={{
                    fontFamily: '"Share Tech Mono", monospace',
                    fontSize: 12, color: 'var(--t-amber)', marginBottom: 6,
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
                    fontSize: 12, color: '#FF4444', marginBottom: 16,
                  }}>
                    ERROR: Message failed to send. Try email directly.
                  </div>
                )}

                <button
                  type="submit"
                  className="retro-btn"
                  onMouseEnter={hover}
                  disabled={status === 'sending'}
                  style={{ width: '100%', textAlign: 'center' }}
                >
                  {status === 'sending' ? '▶ TRANSMITTING...' : '▶▶ SEND MESSAGE ◀◀'}
                </button>
              </>
            )}
          </form>
        </div>

        {/* Footer */}
        <div style={{
          marginTop: 60,
          borderTop: '1px solid var(--t-border)',
          paddingTop: 20,
          textAlign: 'center',
          fontFamily: '"Share Tech Mono", monospace',
          fontSize: 11,
          color: 'var(--t-dim)',
          lineHeight: 2,
        }}>
          <div style={{ color: 'var(--t-gdim)', marginBottom: 4, fontFamily: '"Press Start 2P"', fontSize: 8 }}>
            ULVIE.EXE v2.6.19
          </div>
          Built with Next.js · Designed by Ulvie Mustafa · 2026<br />
          <span style={{ color: 'var(--t-green)' }}>Burgas, Bulgaria</span>
        </div>
      </div>
    </section>
  );
}
