import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        t: {
          bg: '#050505',
          card: '#0d1100',
          green: '#00FF41',
          gdim: '#00aa28',
          gdark: '#003b00',
          amber: '#FF8C00',
          adim: '#cc7000',
          text: '#c8c8c8',
          dim: '#555555',
          border: '#1a3a1a',
        },
      },
      fontFamily: {
        pixel: ['"Press Start 2P"', 'monospace'],
        mono: ['"Share Tech Mono"', 'Courier New', 'monospace'],
      },
    },
  },
  plugins: [],
};

export default config;
