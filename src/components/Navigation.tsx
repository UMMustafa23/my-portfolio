'use client';
import { useState, useEffect } from 'react';
import { useSound } from '@/hooks/useSound';

const LINKS = [
  { label: 'HOME',     href: '#home' },
  { label: 'ABOUT',    href: '#about' },
  { label: 'PROJECTS', href: '#projects' },
  { label: 'SKILLS',   href: '#skills' },
  { label: 'CERTS',    href: '#certs' },
  { label: 'CONTACT',  href: '#contact' },
];

export default function Navigation() {
  const [active, setActive] = useState('HOME');
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
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleToggleSound = () => {
    const on = toggle();
    setSoundOn(on);
  };

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 1000,
        background: scrolled ? 'rgba(5,5,5,0.97)' : 'rgba(5,5,5,0.85)',
        borderBottom: '1px solid var(--t-border)',
        boxShadow: scrolled ? '0 2px 16px rgba(0,255,65,0.08)' : 'none',
        backdropFilter: 'blur(4px)',
        transition: 'background 0.3s, box-shadow 0.3s',
      }}
    >
      <div style={{
        maxWidth: 1100, margin: '0 auto',
        padding: '0 20px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        height: 52,
      }}>
        {/* Logo */}
        <span style={{
          fontFamily: '"Press Start 2P", monospace',
          fontSize: 10,
          color: 'var(--t-green)',
          letterSpacing: 2,
          textShadow: '0 0 8px var(--t-green)',
        }}>
          ULVIE<span style={{ color: 'var(--t-amber)' }}>.EXE</span>
        </span>

        {/* Links */}
        <div style={{ display: 'flex', gap: 4, alignItems: 'center', flexWrap: 'wrap' }}>
          {LINKS.map(l => (
            <button
              key={l.label}
              onClick={() => handleNav(l.label, l.href)}
              onMouseEnter={hover}
              style={{
                fontFamily: '"Share Tech Mono", monospace',
                fontSize: 11,
                color: active === l.label ? 'var(--t-green)' : 'var(--t-dim)',
                background: 'transparent',
                border: active === l.label ? '1px solid var(--t-green)' : '1px solid transparent',
                padding: '4px 10px',
                cursor: 'pointer',
                letterSpacing: 1,
                transition: 'color 0.15s, border-color 0.15s',
              }}
            >
              {active === l.label && <span style={{ color: 'var(--t-amber)' }}>▶ </span>}
              {l.label}
            </button>
          ))}

          {/* Sound toggle */}
          <button
            onClick={handleToggleSound}
            onMouseEnter={hover}
            title={soundOn ? 'Mute sounds' : 'Enable sounds'}
            style={{
              background: 'transparent',
              border: '1px solid var(--t-border)',
              color: soundOn ? 'var(--t-green)' : 'var(--t-dim)',
              cursor: 'pointer',
              fontSize: 13,
              padding: '3px 8px',
              marginLeft: 4,
              transition: 'color 0.15s',
            }}
          >
            {soundOn ? '♪' : '♩'}
          </button>
        </div>
      </div>
    </nav>
  );
}
