'use client';
import { useState, useEffect } from 'react';

export function useTypewriter(text: string, speed = 45, startDelay = 0) {
  const [display, setDisplay] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDisplay('');
    setDone(false);
    let i = 0;
    let interval: ReturnType<typeof setInterval>;

    const timer = setTimeout(() => {
      interval = setInterval(() => {
        i++;
        setDisplay(text.slice(0, i));
        if (i >= text.length) {
          setDone(true);
          clearInterval(interval);
        }
      }, speed);
    }, startDelay);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [text, speed, startDelay]);

  return { display, done };
}
