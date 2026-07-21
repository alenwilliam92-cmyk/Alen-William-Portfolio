import React from 'react';
import { motion } from 'framer-motion';
import { PORTFOLIO_DATA, Project } from '../data/portfolioData';

interface SelectedWorksProps {
  onSelectProject?: (project: Project) => void;
}

export const SelectedWorks: React.FC<SelectedWorksProps> = ({ onSelectProject }) => {
  const projects = PORTFOLIO_DATA.projects;

  return (
    <section id="works" className="bg-bg py-16 md:py-24 relative overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6"
        >
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-px bg-stroke" />
              <span className="text-xs text-muted uppercase tracking-[0.3em] font-medium">
                Selected Work
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-light text-text-primary tracking-tight">
              Featured <span className="font-display italic font-normal">projects</span>
            </h2>
            <p className="text-muted text-sm sm:text-base max-w-md mt-3 font-normal">
              A selection of projects I've worked on, from concept to production launch.
            </p>
          </div>

          {/* Desktop "View all work" Button */}
          <div className="hidden md:inline-flex">
            <div className="relative group">
              <span className="absolute -inset-[1.5px] rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-[1px]" />
              <a
                href={PORTFOLIO_DATA.profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="relative bg-surface hover:bg-bg border border-stroke text-text-primary text-xs sm:text-sm font-medium rounded-full px-5 py-2.5 flex items-center gap-2 transition-all duration-200"
              >
                <span>View all work</span>
                <span className="text-muted group-hover:text-text-primary group-hover:translate-x-1 transition-transform duration-200">
                  →
                </span>
              </a>
            </div>
          </div>
        </motion.div>

        {/* Bento Grid (7/5/5/7 Spans) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
              className={`group relative bg-surface border border-stroke/80 rounded-3xl overflow-hidden aspect-[4/3] md:aspect-[16/11] cursor-pointer ${project.span}`}
              onClick={() => {
                if (project.liveUrl) {
                  window.open(project.liveUrl, '_blank');
                } else if (project.githubUrl) {
                  window.open(project.githubUrl, '_blank');
                } else if (onSelectProject) {
                  onSelectProject(project);
                }
              }}
            >
              {/* Background Image */}
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Halftone Overlay Pattern */}
              <div
                className="absolute inset-0 pointer-events-none opacity-20 mix-blend-multiply"
                style={{
                  backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)',
                  backgroundSize: '4px 4px',
                }}
              />

              {/* Static Card Gradient Shade (Bottom to Top) */}
              <div className="absolute inset-0 bg-gradient-to-t from-bg/90 via-bg/30 to-transparent p-6 sm:p-8 flex flex-col justify-end transition-opacity duration-300 group-hover:opacity-40" />

              {/* Default Visible Card Details */}
              <div className="absolute bottom-6 left-6 right-6 z-10 transition-transform duration-300 group-hover:translate-y-2 group-hover:opacity-30">
                <div className="flex flex-wrap gap-2 mb-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full bg-black/40 border border-white/10 backdrop-blur-sm text-text-primary/90 font-mono"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-xl sm:text-2xl font-light text-text-primary">
                  {project.title}
                </h3>
              </div>

              {/* Hover Overlay: bg-bg/70 opacity-0->1 + backdrop-blur-lg */}
              <div className="absolute inset-0 bg-bg/75 backdrop-blur-lg opacity-0 group-hover:opacity-100 transition-all duration-300 p-6 sm:p-8 flex flex-col justify-between z-20">
                <div className="flex items-start justify-between">
                  <span className="text-xs text-muted font-mono uppercase tracking-widest">
                    PROJECT 0{index + 1}
                  </span>
                  <span className="text-xl text-text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300">
                    ↗
                  </span>
                </div>

                <div className="flex flex-col gap-3">
                  <h3 className="text-2xl sm:text-3xl font-light text-text-primary">
                    {project.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted line-clamp-3 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Hover Label Pill with Animated Gradient Border */}
                <div className="pt-2">
                  <div className="relative inline-flex group/pill">
                    <span className="absolute -inset-[1.5px] rounded-full accent-gradient opacity-100 blur-[0.5px]" />
                    <div className="relative bg-bg px-4 py-2 rounded-full text-xs font-medium text-text-primary flex items-center gap-1.5 shadow-md">
                      <span>{project.liveUrl ? 'View Live Demo —' : 'View GitHub —'}</span>
                      <span className="font-display italic text-sm text-text-primary font-normal">
                        {project.title}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
