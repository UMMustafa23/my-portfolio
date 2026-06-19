'use client';
import { useState, useEffect } from 'react';
import { useSound } from '@/hooks/useSound';

const LINKS = [
  { label: 'DOSSIER',     href: '#home' },
  { label: 'PROFILE',     href: '#about' },
  { label: 'CASE FILES',  href: '#projects' },
  { label: 'EVIDENCE',    href: '#skills' },
  { label: 'CREDENTIALS', href: '#certs' },
  { label: 'DISPATCH',    href: '#contact' },
];

export default function Navigation() {
  const [active, setActive] = useState('DOSSIER');
  const [scrolled, setScrolled] = useState(false);
  const [soundOn, setSoundOn] = useState(true);
  const { hover, click, toggle } = useSound();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (label: string, href: string) => {
    click();
    setActive(label);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav style={{
      position: 'fixed',
      top: 0, left: 0, right: 0,
      zIndex: 1000,
      background: scrolled ? 'rgba(0,0,0,0.98)' : 'rgba(0,0,0,0.92)',
      borderBottom: `1px solid ${scrolled ? '#444' : '#222'}`,
      backdropFilter: 'blur(2px)',
      transition: 'border-color 0.3s',
    }}>
      <div style={{
        maxWidth: 1100, margin: '0 auto',
        padding: '0 20px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        height: 50,
      }}>

        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{
            fontFamily: '"Press Start 2P", monospace',
            fontSize: 8,
            color: '#ffffff',
            letterSpacing: 2,
            borderRight: '1px solid #333',
            paddingRight: 14,
            marginRight: 4,
          }}>
            ACME
          </span>
          <span style={{
            fontFamily: '"Share Tech Mono", monospace',
            fontSize: 11,
            color: '#666',
            letterSpacing: 2,
          }}>
            DETECTIVE AGENCY
          </span>
        </div>

        {/* Links */}
        <div style={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          {LINKS.map(l => (
            <button
              key={l.label}
              onClick={() => handleNav(l.label, l.href)}
              onMouseEnter={hover}
              className={`nav-link${active === l.label ? ' active' : ''}`}
            >
              {l.label}
            </button>
          ))}

          <button
            onClick={() => { const on = toggle(); setSoundOn(on); }}
            onMouseEnter={hover}
            style={{
              background: 'transparent',
              border: '1px solid #333',
              color: soundOn ? '#888' : '#444',
              cursor: 'pointer',
              fontSize: 12,
              padding: '3px 8px',
              marginLeft: 6,
              transition: 'color 0.12s',
              fontFamily: 'monospace',
            }}
            title={soundOn ? 'Mute' : 'Unmute'}
          >
            {soundOn ? '♪' : '♩'}
          </button>
        </div>
      </div>

      {/* Bottom rule */}
      <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, #333 20%, #333 80%, transparent)' }} />
    </nav>
  );
}
