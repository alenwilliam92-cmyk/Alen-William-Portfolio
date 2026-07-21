import React from 'react';
import { motion } from 'framer-motion';
import { PORTFOLIO_DATA } from '../data/portfolioData';

interface MilestoneRow {
  id: string;
  category: string;
  date: string;
  title: string;
  subtitle: string;
  description: string;
  highlight: string;
  image: string;
}

const MILESTONES: MilestoneRow[] = [
  {
    id: "m1",
    category: "CERTIFICATION",
    date: "NOV 2025",
    title: "Python Full Stack Engineering Certification",
    subtitle: "STED Council · Logiprompt Pro Academy",
    description: "Achieved Grade A+ certification (176/200 score) during an intensive 4-month program focused on Django, Python, relational database schemas, REST APIs, and deployment.",
    highlight: "176/200 SCORE",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=400&auto=format&fit=crop"
  },
  {
    id: "m2",
    category: "ACADEMIC",
    date: "GRADUATED",
    title: "B.Sc. Degree in Chemistry Foundation",
    subtitle: "Analytical Thinking & Scientific Methodology",
    description: "Applied scientific analytical logic, structured thinking, and quantitative methodologies to architect clean backend code structures and optimize database performance.",
    highlight: "ANALYTICAL LOGIC",
    image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=400&auto=format&fit=crop"
  },
  {
    id: "m3",
    category: "AI WORKFLOWS",
    date: "2026",
    title: "Vibe Coding & Rapid AI Prototyping",
    subtitle: "Antigravity AI · React · GSAP · Tailwind CSS",
    description: "Mastered high-velocity modern software creation combining AI pair programming tools, responsive design systems, reactive state management, and smooth web animations.",
    highlight: "ANTIGRAVITY AI",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=400&auto=format&fit=crop"
  },
  {
    id: "m4",
    category: "FULLSTACK",
    date: "KERALA, INDIA",
    title: "End-to-End Web Systems & Production Delivery",
    subtitle: "Django · MySQL · React · PHP",
    description: "Architected and delivered production-grade web applications including SmartEdu education portal, Fat Loss fitness dashboard, and Neatzoo cleaning company platform.",
    highlight: "DJANGO · MYSQL",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=400&auto=format&fit=crop"
  }
];

export const Journal: React.FC = () => {
  // Stagger variants for Framer Motion entrance
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  return (
    <section id="journal" className="bg-[#0a0d14] py-20 md:py-28 relative overflow-hidden">
      {/* Background Ambient Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] bg-white/[0.02] rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-14 md:mb-18 gap-6"
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-px bg-white/30" />
              <span className="text-xs text-slate-400 uppercase tracking-[0.3em] font-mono font-medium">
                ABOUT ME
              </span>
            </div>

            <h2 className="text-5xl sm:text-6xl md:text-7xl font-light text-[#f5f5f5] tracking-tight leading-none">
              Engineering Scalable <span className="font-display italic font-normal text-white">Solutions</span>
            </h2>

            <p className="text-slate-400 text-sm sm:text-base max-w-xl mt-4 leading-relaxed font-normal">
              Python Full Stack Developer based in Kerala. Combining a B.Sc. foundation with Grade A+ STED Council certification in Python Fullstack Development to build robust, high-performance web systems using Django, MySQL, React, and modern engineering tools.
            </p>
          </div>

          {/* Right Floating Action Pill Button */}
          <div className="inline-flex shrink-0">
            <div className="relative group">
              <span className="absolute -inset-[1.5px] rounded-full bg-gradient-to-r from-white/20 via-white/40 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-[1px]" />
              <a
                href={`mailto:${PORTFOLIO_DATA.profile.email}`}
                className="relative bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 text-slate-200 text-xs sm:text-sm font-medium rounded-full px-6 py-3 flex items-center gap-2.5 transition-all duration-300 shadow-md"
              >
                <span>Get in Touch</span>
                <span className="text-slate-400 group-hover:text-white group-hover:translate-x-1 transition-all duration-200">
                  →
                </span>
              </a>
            </div>
          </div>
        </motion.div>

        {/* Horizontal Pill Card Rows List */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="flex flex-col gap-4 sm:gap-5"
        >
          {MILESTONES.map((item) => (
            <motion.div
              key={item.id}
              variants={itemVariants}
              className="group relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 p-4 sm:p-5 sm:pr-8 bg-white/[0.02] hover:bg-white/[0.05] border border-white/10 hover:border-white/20 rounded-[35px] sm:rounded-full transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl"
            >
              {/* Left: Circular Image Avatar & Info */}
              <div className="flex items-center gap-4 sm:gap-6 w-full sm:w-auto">
                {/* Circular Thumbnail Avatar */}
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden shrink-0 border border-white/10 relative shadow-md">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:opacity-0 transition-opacity duration-300" />
                </div>

                {/* Metadata & Title */}
                <div className="flex flex-col gap-1 min-w-0 flex-1">
                  <div className="flex items-center gap-2.5 text-[11px] font-mono tracking-wider text-slate-400 uppercase">
                    <span>{item.category}</span>
                    <span className="text-slate-600 font-bold">•</span>
                    <span>{item.date}</span>
                  </div>

                  <h3 className="text-base sm:text-lg md:text-xl font-normal text-[#f5f5f5] group-hover:text-white transition-colors duration-200 truncate pr-2 tracking-tight">
                    {item.title}
                  </h3>
                </div>
              </div>

              {/* Right: Highlight Tag & Circular Arrow Button */}
              <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-white/5">
                <span className="text-xs text-slate-400 font-mono tracking-wider whitespace-nowrap uppercase">
                  {item.highlight}
                </span>

                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/[0.05] border border-white/10 flex items-center justify-center text-slate-300 group-hover:bg-white/10 group-hover:text-white group-hover:translate-x-1 transition-all duration-300 shadow-md">
                  →
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
