import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'ULVIE.EXE | Portfolio',
  description: 'Portfolio of Ulvie Mustafa — Developer, Engineer & Creator from Burgas, Bulgaria.',
  keywords: ['developer', 'portfolio', 'React', 'Next.js', 'Ulvie Mustafa'],
  authors: [{ name: 'Ulvie Mustafa' }],
  openGraph: {
    title: 'ULVIE.EXE | Portfolio',
    description: 'Developer & Engineer from Burgas, Bulgaria.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Share+Tech+Mono&display=swap"
          rel="stylesheet"
        />
        <meta name="theme-color" content="#050505" />
      </head>
      <body>{children}</body>
    </html>
  );
}
