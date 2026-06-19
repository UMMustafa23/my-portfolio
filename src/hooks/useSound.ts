'use client';
import { useRef, useCallback } from 'react';

export function useSound() {
  const ctxRef = useRef<AudioContext | null>(null);
  const enabledRef = useRef(true);

  const getCtx = useCallback((): AudioContext | null => {
    if (typeof window === 'undefined') return null;
    if (!ctxRef.current) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ctxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return ctxRef.current;
  }, []);

  const tone = useCallback(
    (freq: number, dur: number, type: OscillatorType = 'square', vol = 0.04) => {
      if (!enabledRef.current) return;
      const ctx = getCtx();
      if (!ctx) return;
      try {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = type;
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        gain.gain.setValueAtTime(vol, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + dur);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + dur);
      } catch { /* ignore */ }
    },
    [getCtx]
  );

  /* Mechanical keyboard/mouse click — white-noise burst with sharp decay */
  const keyClick = useCallback((vol = 0.28) => {
    if (!enabledRef.current) return;
    const ctx = getCtx();
    if (!ctx) return;
    try {
      const dur = 0.045;
      const bufLen = Math.floor(ctx.sampleRate * dur);
      const buf = ctx.createBuffer(1, bufLen, ctx.sampleRate);
      const data = buf.getChannelData(0);
      for (let i = 0; i < bufLen; i++) {
        // noise burst that decays very fast — classic key-bottom-out click
        data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / bufLen, 10);
      }
      const src = ctx.createBufferSource();
      src.buffer = buf;

      // High-pass to give the clicky "tick" character
      const hp = ctx.createBiquadFilter();
      hp.type = 'highpass';
      hp.frequency.value = 800;

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(vol, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + dur);

      src.connect(hp);
      hp.connect(gain);
      gain.connect(ctx.destination);
      src.start();
    } catch { /* ignore */ }
  }, [getCtx]);

  const hover   = useCallback(() => tone(600, 0.04, 'square', 0.018), [tone]);
  const click   = useCallback(() => keyClick(), [keyClick]);
  const typeKey = useCallback(() => keyClick(0.12), [keyClick]);
  const success = useCallback(() => {
    [523, 659, 784, 1047].forEach((f, i) => setTimeout(() => tone(f, 0.14, 'square', 0.03), i * 110));
  }, [tone]);
  const boot = useCallback(() => {
    [150, 200, 280, 360, 480].forEach((f, i) => setTimeout(() => tone(f, 0.12, 'square', 0.025), i * 90));
  }, [tone]);
  const toggle = useCallback(() => {
    enabledRef.current = !enabledRef.current;
    return enabledRef.current;
  }, []);

  return { hover, click, typeKey, success, boot, toggle, isEnabled: enabledRef };
}
