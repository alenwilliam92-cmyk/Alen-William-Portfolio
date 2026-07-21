import React from 'react';
import { motion } from 'framer-motion';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export const Stats: React.FC = () => {
  const stats = PORTFOLIO_DATA.stats;

  return (
    <section className="bg-bg py-16 md:py-24 relative border-t border-stroke/40">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: index * 0.15, ease: [0.25, 0.1, 0.25, 1] }}
              className="flex flex-col items-center text-center p-8 bg-surface/40 border border-stroke/60 rounded-3xl backdrop-blur-sm relative overflow-hidden group hover:border-white/20 transition-all duration-300"
            >
              {/* Top accent glow line */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-px accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <span className="text-6xl sm:text-7xl md:text-8xl font-display italic text-text-primary mb-3 tracking-tight group-hover:scale-105 transition-transform duration-300">
                {stat.value}
              </span>

              <h3 className="text-base sm:text-lg font-normal text-text-primary tracking-wide mb-1">
                {stat.label}
              </h3>

              <p className="text-xs sm:text-sm text-muted font-light">
                {stat.sublabel}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
