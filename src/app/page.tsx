'use client';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ProjectsSection from '@/components/ProjectsSection';
import SkillsSection from '@/components/SkillsSection';
import CertificationsSection from '@/components/CertificationsSection';
import ContactSection from '@/components/ContactSection';

const LoadingScreen = dynamic(() => import('@/components/LoadingScreen'), { ssr: false });

export default function HomePage() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && <LoadingScreen onComplete={() => setLoaded(true)} />}

      <div style={{
        opacity: loaded ? 1 : 0,
        transition: 'opacity 0.6s ease',
        pointerEvents: loaded ? 'auto' : 'none',
      }}>
        <Navigation />
        <main>
          <HeroSection />
          <AboutSection />
          <ProjectsSection />
          <SkillsSection />
          <CertificationsSection />
          <ContactSection />
        </main>
      </div>
    </>
  );
}
