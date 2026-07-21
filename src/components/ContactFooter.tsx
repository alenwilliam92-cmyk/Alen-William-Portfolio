import React, { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';
import gsap from 'gsap';
import { PORTFOLIO_DATA } from '../data/portfolioData';

const HLS_SOURCE = "https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8";

export const ContactFooter: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  // Initialize HLS video
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (Hls.isSupported()) {
      const hls = new Hls({ enableWorker: true });
      hls.loadSource(HLS_SOURCE);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch((err) => console.log('Autoplay error:', err));
      });
      return () => hls.destroy();
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = HLS_SOURCE;
      video.play().catch((err) => console.log('Autoplay error:', err));
    }
  }, []);

  // GSAP Infinite Marquee
  useEffect(() => {
    if (!marqueeRef.current) return;
    const marqueeTrack = marqueeRef.current.firstElementChild;
    if (!marqueeTrack) return;

    const anim = gsap.to(marqueeTrack, {
      xPercent: -50,
      duration: 40,
      ease: 'none',
      repeat: -1,
    });

    return () => {
      anim.kill();
    };
  }, []);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <footer id="contact" className="relative bg-bg pt-16 md:pt-20 pb-8 md:pb-12 overflow-hidden">
      {/* Background Video (flipped vertically scale-y-[-1] with heavier overlay bg-black/60) */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto object-cover -translate-x-1/2 -translate-y-1/2 scale-y-[-1] opacity-50"
        />
        <div className="absolute inset-0 bg-black/75 backdrop-brightness-90" />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16 flex flex-col gap-12">
        {/* GSAP Infinite Marquee Banner */}
        <div ref={marqueeRef} className="w-full overflow-hidden whitespace-nowrap py-4 border-y border-stroke/50">
          <div className="inline-flex items-center gap-8 text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-display italic text-text-primary/40 tracking-wider">
            {Array.from({ length: 10 }).map((_, i) => (
              <span key={i} className="flex items-center gap-8">
                <span>BUILDING THE FUTURE</span>
                <span className="text-2xl font-body not-italic text-muted">•</span>
              </span>
            ))}
          </div>
        </div>

        {/* Contact Content Grid */}
        <div className="max-w-[1200px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 pt-8">
          {/* Left Column: Email CTA */}
          <div className="lg:col-span-5 flex flex-col justify-between items-start gap-8">
            <div>
              <span className="text-xs text-muted uppercase tracking-[0.3em] font-medium block mb-3">
                Get In Touch
              </span>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-light text-text-primary tracking-tight leading-none mb-6">
                Let's work <span className="font-display italic font-normal">together</span>
              </h2>
              <p className="text-sm text-muted leading-relaxed max-w-sm mb-8 font-normal">
                Have a project in mind, seeking full-stack engineering expertise, or want to discuss scalabilities? Reach out anytime.
              </p>

              {/* Email CTA Button with Gradient Hover Border Ring */}
              <div className="relative group inline-flex">
                <span className="absolute -inset-[2px] rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-[2px]" />
                <a
                  href={`mailto:${PORTFOLIO_DATA.profile.email}`}
                  className="relative bg-surface hover:bg-bg border border-stroke text-text-primary text-sm font-medium rounded-full px-7 py-3.5 flex items-center gap-3 transition-all duration-300 shadow-lg"
                >
                  <span>{PORTFOLIO_DATA.profile.email}</span>
                  <span className="text-muted group-hover:text-text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200">
                    ↗
                  </span>
                </a>
              </div>
            </div>

            <div className="text-xs text-muted">
              Based in Kerala, India. Available worldwide for remote contracts and full-time engineering.
            </div>
          </div>

          {/* Right Column: Terminal Contact Form */}
          <div className="lg:col-span-7 bg-surface/80 border border-stroke rounded-3xl overflow-hidden shadow-2xl backdrop-blur-md">
            {/* macOS Title Bar */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-stroke/60 bg-bg/70">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block" />
              </div>
              <span className="text-xs text-muted font-mono">contact.sh</span>
            </div>

            {/* Form Body */}
            <div className="p-6 sm:p-8 font-mono">
              {formSubmitted ? (
                <div className="flex flex-col gap-4 py-8 items-center text-center">
                  <div className="w-12 h-12 rounded-full accent-gradient flex items-center justify-center text-bg text-xl font-bold">
                    ✓
                  </div>
                  <h3 className="text-xl text-text-primary font-display italic">
                    MESSAGE TRANSMITTED
                  </h3>
                  <p className="text-xs text-muted max-w-xs font-sans">
                    Thank you! Your message has been sent to {PORTFOLIO_DATA.profile.name}. I'll get back to you shortly.
                  </p>
                  <button
                    onClick={() => setFormSubmitted(false)}
                    className="mt-4 text-xs text-text-primary underline hover:text-muted"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="flex flex-col gap-5 text-xs">
                  <div className="text-muted mb-1">$ ./initiate_contact.sh</div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-muted">// name</label>
                    <input
                      type="text"
                      required
                      placeholder="Your name..."
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-bg/90 border border-stroke rounded-xl px-4 py-2.5 text-text-primary focus:outline-none focus:border-white/40 transition-colors font-sans"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-muted">// email</label>
                    <input
                      type="email"
                      required
                      placeholder="your@email.com..."
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-bg/90 border border-stroke rounded-xl px-4 py-2.5 text-text-primary focus:outline-none focus:border-white/40 transition-colors font-sans"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-muted">// message</label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Your message details..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-bg/90 border border-stroke rounded-xl px-4 py-2.5 text-text-primary focus:outline-none focus:border-white/40 transition-colors font-sans"
                    />
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <button
                      type="submit"
                      className="relative group inline-flex"
                    >
                      <span className="absolute -inset-[1.5px] rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-[1px]" />
                      <span className="relative bg-text-primary text-bg font-sans font-semibold rounded-full px-6 py-2.5 hover:bg-bg hover:text-text-primary transition-all duration-200">
                        Execute Send
                      </span>
                    </button>

                    <div className="w-2.5 h-5 bg-text-primary/60 animate-pulse" />
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Footer Bar */}
        <div className="pt-12 mt-8 border-t border-stroke/40 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-muted">
          {/* Social Links */}
          <div className="flex items-center gap-6 font-medium">
            <a
              href={PORTFOLIO_DATA.profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-text-primary transition-colors"
            >
              LinkedIn
            </a>
            <a
              href={PORTFOLIO_DATA.profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-text-primary transition-colors"
            >
              GitHub
            </a>
          </div>

          {/* Green Pulsing Dot + Status */}
          <div className="flex items-center gap-2.5 bg-surface/80 border border-stroke px-3.5 py-1.5 rounded-full">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-text-primary font-medium">Available for projects</span>
          </div>

          <div>
            © {new Date().getFullYear()} {PORTFOLIO_DATA.profile.name}. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};
