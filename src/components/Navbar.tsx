import React, { useState, useEffect } from 'react';
import { clsx } from 'clsx';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection, onNavigate }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'works', label: 'Work' },
    { id: 'journal', label: 'Resume' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 md:pt-6 px-4 pointer-events-none">
      <nav
        className={clsx(
          "pointer-events-auto inline-flex items-center gap-1 sm:gap-2 rounded-full backdrop-blur-md border border-white/10 bg-surface/90 px-2.5 py-2 transition-all duration-300",
          scrolled ? "shadow-lg shadow-black/40 border-stroke/80 bg-surface/95" : "shadow-md shadow-black/10"
        )}
      >
        {/* 1. Logo: 9x9 circle with accent gradient border */}
        <button
          onClick={() => onNavigate('hero')}
          className="group relative flex items-center justify-center w-9 h-9 rounded-full p-[1.5px] accent-gradient transition-transform duration-300 hover:scale-110 overflow-hidden"
          aria-label="Home"
        >
          <div className="w-full h-full bg-bg rounded-full flex items-center justify-center transition-colors duration-300 group-hover:bg-bg/80">
            <span className="font-display italic text-[13px] font-bold text-text-primary tracking-tight">
              AW
            </span>
          </div>
        </button>

        {/* 2. Divider (hidden on mobile) */}
        <div className="hidden sm:block w-px h-5 bg-stroke mx-1" />

        {/* 3. Nav links */}
        <div className="flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={clsx(
                  "text-xs sm:text-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 transition-all duration-200 font-medium",
                  isActive
                    ? "text-text-primary bg-stroke/60 shadow-inner"
                    : "text-muted hover:text-text-primary hover:bg-stroke/50"
                )}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        {/* 4. Divider */}
        <div className="w-px h-5 bg-stroke mx-1" />

        {/* 5. "Say hi" button */}
        <div className="relative group">
          {/* Animated gradient border behind on hover */}
          <span className="absolute -inset-[2px] rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-[1px]" />
          <button
            onClick={() => onNavigate('contact')}
            className="relative text-xs sm:text-sm rounded-full px-3.5 sm:px-4 py-1.5 sm:py-2 bg-surface text-text-primary backdrop-blur-md flex items-center gap-1.5 transition-all duration-200 group-hover:bg-bg"
          >
            <span>Say hi</span>
            <span className="text-muted group-hover:text-text-primary transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              ↗
            </span>
          </button>
        </div>
      </nav>
    </header>
  );
};
