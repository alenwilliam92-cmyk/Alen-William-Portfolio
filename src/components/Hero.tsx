import React, { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';
import gsap from 'gsap';
import { PORTFOLIO_DATA } from '../data/portfolioData';

interface HeroProps {
  onNavigate: (sectionId: string) => void;
}

const HLS_SOURCE = "https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8";

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [roleIndex, setRoleIndex] = useState(0);

  const roles = PORTFOLIO_DATA.profile.roles;

  // Initialize HLS video
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (Hls.isSupported()) {
      const hls = new Hls({ enableWorker: true, autoStartLoad: true });
      hls.loadSource(HLS_SOURCE);
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch((err) => console.log('Autoplay error:', err));
      });

      return () => {
        hls.destroy();
      };
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = HLS_SOURCE;
      video.play().catch((err) => console.log('Autoplay error:', err));
    }
  }, []);

  // Role Cycling interval
  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [roles.length]);

  // GSAP Entrance animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.to('.name-reveal', {
        opacity: 1,
        y: 0,
        duration: 1.2,
        delay: 0.1,
      });

      tl.to(
        '.blur-in',
        {
          opacity: 1,
          filter: 'blur(0px)',
          y: 0,
          duration: 1,
          stagger: 0.1,
        },
        '-=0.9'
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative w-full h-screen min-h-[700px] flex items-center justify-center overflow-hidden bg-bg"
    >
      {/* Background Video */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto object-cover -translate-x-1/2 -translate-y-1/2 opacity-70"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/30 backdrop-brightness-95" />
        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-bg via-bg/80 to-transparent z-10" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-4xl px-6 text-center flex flex-col items-center pt-16">
        {/* Name */}
        <h1 className="name-reveal opacity-0 translate-y-12 text-6xl sm:text-8xl md:text-9xl font-display italic leading-[0.9] tracking-tight text-text-primary mb-6 selection:bg-white selection:text-black">
          {PORTFOLIO_DATA.profile.name}
        </h1>

        {/* Role line */}
        <div className="blur-in opacity-0 filter blur-md translate-y-5 text-base sm:text-xl text-text-primary/90 font-light mb-6 tracking-wide">
          A{' '}
          <span
            key={roleIndex}
            className="font-display italic font-normal text-text-primary animate-role-fade-in inline-block px-1 accent-gradient-text"
          >
            {roles[roleIndex]}
          </span>{' '}
          lives in Kerala.
        </div>

        {/* Description */}
        <p className="blur-in opacity-0 filter blur-md translate-y-5 text-xs sm:text-sm md:text-base text-muted max-w-md mb-10 leading-relaxed font-normal">
          {PORTFOLIO_DATA.profile.tagline}
        </p>

        {/* CTA Buttons */}
        <div className="blur-in opacity-0 filter blur-md translate-y-5 inline-flex items-center gap-4 flex-wrap justify-center">
          {/* See Works CTA */}
          <div className="relative group">
            <span className="absolute -inset-[2px] rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-[2px]" />
            <button
              onClick={() => onNavigate('works')}
              className="relative bg-text-primary text-bg font-semibold rounded-full text-xs sm:text-sm px-7 py-3.5 transition-all duration-300 hover:scale-105 group-hover:bg-bg group-hover:text-text-primary"
            >
              See Works
            </button>
          </div>

          {/* Reach out CTA */}
          <div className="relative group">
            <span className="absolute -inset-[2px] rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-[2px]" />
            <button
              onClick={() => onNavigate('contact')}
              className="relative border-2 border-stroke bg-bg text-text-primary font-semibold rounded-full text-xs sm:text-sm px-7 py-3.5 transition-all duration-300 hover:scale-105 group-hover:border-transparent"
            >
              Reach out...
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3">
        <span className="text-[10px] sm:text-xs text-muted uppercase tracking-[0.2em] font-medium">
          SCROLL
        </span>
        <div className="w-px h-10 bg-stroke/60 overflow-hidden relative">
          <div className="w-full h-1/2 bg-text-primary animate-scroll-down rounded-full" />
        </div>
      </div>
    </section>
  );
};
