import React, { useState, useEffect } from 'react';
import { LoadingScreen } from './components/LoadingScreen';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { SelectedWorks } from './components/SelectedWorks';
import { Journal } from './components/Journal';
import { Explorations } from './components/Explorations';
import { ContactFooter } from './components/ContactFooter';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [activeSection, setActiveSection] = useState<string>('hero');

  // Handle smooth navigation
  const scrollToSection = (sectionId: string) => {
    const elem = document.getElementById(sectionId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Intersection observer to track active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'works', 'journal', 'explorations', 'contact'];
      const scrollPos = window.scrollY + 200;

      for (const sectionId of sections) {
        const elem = document.getElementById(sectionId);
        if (elem) {
          const top = elem.offsetTop;
          const height = elem.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-bg text-text-primary selection:bg-white/20 selection:text-white">
      {/* 1. Loading Screen */}
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}

      {/* Main Page Layout */}
      {!isLoading && (
        <>
          {/* Floating Navbar */}
          <Navbar
            activeSection={activeSection}
            onNavigate={scrollToSection}
          />

          {/* Section 2: Hero */}
          <Hero onNavigate={scrollToSection} />

          {/* Section 3: Selected Works */}
          <SelectedWorks />

          {/* Section 4: Journal */}
          <Journal />

          {/* Section 5: Tech Stack & Skills Builder */}
          <Explorations />

          {/* Section 6: Contact / Footer */}
          <ContactFooter />
        </>
      )}
    </div>
  );
};

export default App;
