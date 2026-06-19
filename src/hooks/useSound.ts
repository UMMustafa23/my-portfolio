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
      } catch {
        /* ignore */
      }
    },
    [getCtx]
  );

  const hover   = useCallback(() => tone(440, 0.05, 'square', 0.025), [tone]);
  const click   = useCallback(() => { tone(880, 0.04, 'square', 0.04); setTimeout(() => tone(660, 0.06, 'square', 0.03), 45); }, [tone]);
  const typeKey = useCallback(() => tone(180 + Math.random() * 80, 0.025, 'square', 0.018), [tone]);
  const success = useCallback(() => {
    [523, 659, 784, 1047].forEach((f, i) => setTimeout(() => tone(f, 0.14, 'square', 0.035), i * 120));
  }, [tone]);
  const boot = useCallback(() => {
    [150, 200, 280, 360, 480].forEach((f, i) => setTimeout(() => tone(f, 0.12, 'square', 0.03), i * 90));
  }, [tone]);
  const toggle = useCallback(() => { enabledRef.current = !enabledRef.current; return enabledRef.current; }, []);

  return { hover, click, typeKey, success, boot, toggle, isEnabled: enabledRef };
}
