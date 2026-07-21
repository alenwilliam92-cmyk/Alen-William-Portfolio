import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';
import { 
  Code, 
  Terminal, 
  Cpu, 
  Sparkles, 
  Layers, 
  Database, 
  GitBranch, 
  Check, 
  X, 
  RotateCcw,
  Zap
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export interface TechItem {
  id: string;
  title: string;
  category: 'Languages' | 'Frameworks' | 'Databases' | 'Frontend' | 'Tools';
  proficiency: number;
  icon: React.ReactNode;
  color?: string;
  barColor?: string;
}

const DEFAULT_TECH_ITEMS: TechItem[] = [
  { id: 'htmlcss', title: "HTML5 & CSS3", category: "Frontend", proficiency: 95, icon: <Code className="w-5 h-5 text-red-400" />, barColor: "bg-red-400" },
  { id: 'javascript', title: "JavaScript", category: "Languages", proficiency: 90, icon: <Terminal className="w-5 h-5 text-yellow-400" />, barColor: "bg-yellow-400" },
  { id: 'react', title: "React", category: "Frontend", proficiency: 88, icon: <Cpu className="w-5 h-5 text-blue-400" />, barColor: "bg-blue-400" },
  { id: 'bootstrap', title: "Bootstrap 5", category: "Frontend", proficiency: 88, icon: <Sparkles className="w-5 h-5 text-fuchsia-400" />, barColor: "bg-fuchsia-400" },
  { id: 'python', title: "Python", category: "Languages", proficiency: 90, icon: <Terminal className="w-5 h-5 text-cyan-400" />, barColor: "bg-cyan-400" },
  { id: 'django', title: "Django", category: "Frameworks", proficiency: 88, icon: <Layers className="w-5 h-5 text-emerald-400" />, barColor: "bg-emerald-400" },
  { id: 'sqlite', title: "SQLite", category: "Databases", proficiency: 85, icon: <Database className="w-5 h-5 text-sky-400" />, barColor: "bg-cyan-300" },
  { id: 'git', title: "Git & GitHub", category: "Tools", proficiency: 85, icon: <GitBranch className="w-5 h-5 text-rose-400" />, barColor: "bg-rose-400" },
];

export function Explorations({
  title = "Technical Skills &",
  subtitle = "Stack",
  description = "",
  techItems = DEFAULT_TECH_ITEMS,
  className,
}: {
  title?: string;
  subtitle?: string;
  description?: string;
  techItems?: TechItem[];
  className?: string;
}) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeIds, setActiveIds] = useState<string[]>(["react", "python", "django", "sqlite"]);
  const [activeTechId, setActiveTechId] = useState<string>(techItems[0]?.id || "python");

  const gridFullRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  const categories = ["All", "Languages", "Frameworks", "Databases", "Frontend", "Tools"];

  const handleToggle = (id: string) => {
    setActiveIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
    setActiveTechId(id);
  };

  const stackFullStackApp = () => {
    setActiveIds(["react", "python", "django", "sqlite"]);
  };

  const stackBackendCore = () => {
    setActiveIds(["python", "django", "sqlite"]);
  };

  const resetStack = () => {
    setActiveIds([]);
  };

  const splitText = (text: string) => {
    return text.split('').map((char, i) => (
      <span key={i} className="char inline-block" style={{ willChange: 'transform' }}>
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  // GSAP ScrollTrigger Staggered Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate Header Character Reveal
      if (textRef.current) {
        const chars = textRef.current.querySelectorAll('.char');
        gsap.timeline({
          scrollTrigger: {
            trigger: textRef.current,
            start: 'top bottom',
            end: 'center center-=15%',
            scrub: 1,
          },
        }).from(chars, {
          ease: 'sine.out',
          yPercent: 250,
          autoAlpha: 0,
          stagger: { each: 0.04, from: 'center' },
        });
      }

      // Animate Grid Items with Column Stagger
      if (gridFullRef.current) {
        const gridItems = gridFullRef.current.querySelectorAll('.grid__item');
        gsap.fromTo(
          gridItems,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: gridFullRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  const filteredModules = selectedCategory === "All"
    ? techItems
    : techItems.filter((m) => m.category === selectedCategory);

  const activeModules = activeIds
    .map((id) => techItems.find((m) => m.id === id))
    .filter(Boolean) as TechItem[];

  return (
    <section id="explorations" className={cn("relative w-full bg-[#0a0d14] py-24 px-6 md:px-12 text-white overflow-hidden", className)}>
      {/* Ambient background lighting glow */}
      <div className="absolute top-1/4 left-1/3 w-[650px] h-[650px] bg-[#00b4d8]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center space-x-3 text-xs uppercase tracking-widest text-[#00b4d8] font-semibold mb-3 font-mono">
              <span className="w-12 h-[1px] bg-[#00b4d8]/50"></span>
              <span>EXPERTISE & STACK</span>
            </div>

            <div ref={textRef} className="text font-serif uppercase flex flex-wrap gap-x-4 text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.9] tracking-tight">
              <span className="text-white font-sans font-light">{splitText(title)}</span>
              <span className="italic text-slate-400 font-light font-display">{splitText(subtitle)}</span>
            </div>
          </div>
        </div>

        {/* Responsive Staggered Tech Cards Grid */}
        <div ref={gridFullRef} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredModules.map((module) => {
            const isActive = activeIds.includes(module.id);
            const isSelected = activeTechId === module.id;

            return (
              <motion.div
                key={module.id}
                onClick={() => handleToggle(module.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                  "grid__item group relative p-5 rounded-3xl bg-[#111827]/70 backdrop-blur-xl border transition-all duration-300 cursor-pointer flex flex-col justify-between shadow-xl min-h-[140px]",
                  isActive 
                    ? "border-[#00b4d8] bg-[#111827]/90 shadow-[#00b4d8]/20 ring-1 ring-[#00b4d8]/40" 
                    : isSelected
                    ? "border-cyan-500/50 bg-[#111827]/80"
                    : "border-white/10 hover:border-white/30 hover:bg-[#111827]"
                )}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3.5">
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                      {module.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-base tracking-wide">{module.title}</h4>
                      <span className="text-[10px] text-slate-400 uppercase font-mono tracking-widest">{module.category}</span>
                    </div>
                  </div>

                  <div className={cn(
                    "w-8 h-8 rounded-full border flex items-center justify-center transition-all",
                    isActive 
                      ? "bg-[#00b4d8] text-slate-950 border-[#00b4d8] shadow-md" 
                      : "bg-white/5 border-white/10 text-slate-400 group-hover:border-[#00b4d8] group-hover:text-[#00b4d8]"
                  )}>
                    {isActive ? <Check className="w-4 h-4 stroke-[3]" /> : <span className="text-sm font-bold">+</span>}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-mono font-medium">
                    <span className="text-slate-400">Proficiency</span>
                    <span className="text-cyan-400">{module.proficiency}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-700 ${module.barColor || 'bg-[#00b4d8]'}`} 
                      style={{ width: `${module.proficiency}%` }}
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

export default Explorations;
