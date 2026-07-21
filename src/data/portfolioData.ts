export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  image: string;
  span: string;
  githubUrl?: string;
  liveUrl?: string;
}

export interface JournalEntry {
  id: string;
  title: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  summary: string;
}

export interface ExplorationItem {
  id: string;
  title: string;
  category: string;
  image: string;
  rotation: number;
}

export const PORTFOLIO_DATA = {
  profile: {
    name: "Alen William",
    eyebrow: "COLLECTION '26",
    roles: ["Python Developer", "Fullstack", "Django Specialist", "Scholar"],
    location: "Technopark Zone, Kerala, India",
    email: "alenwilliam92@gmail.com",
    tagline: "Designing seamless digital interactions by focusing on the unique nuances which bring systems to life.",
    github: "https://github.com/alenwilliam92-cmyk",
    linkedin: "https://www.linkedin.com/in/alenwilliam/",
    dribbble: "https://dribbble.com",
    twitter: "https://twitter.com",
  },
  
  projects: [
    {
      id: "smart-edu",
      title: "SmartEdu Platform",
      subtitle: "Specialized Education Platform",
      description: "A full-stack Django platform digitizing educational workflows for special institutions with role-based access and database optimization.",
      tags: ["Python", "Django", "MySQL", "JavaScript"],
      image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=1200&auto=format&fit=crop",
      span: "md:col-span-7",
      githubUrl: "https://github.com/alenwilliam92-cmyk/SmartEdu_Project"
    },
    {
      id: "fat-loss",
      title: "Fat Loss Journey",
      subtitle: "Fitness Analytics Dashboard",
      description: "Sleek fitness tracking landing page with glassmorphism UI, custom validation, and smooth micro-animations.",
      tags: ["HTML5", "CSS3", "JavaScript", "GSAP"],
      image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1200&auto=format&fit=crop",
      span: "md:col-span-5",
      liveUrl: "https://alenwilliam92-cmyk.github.io/Fat_loss-project/",
      githubUrl: "https://github.com/alenwilliam92-cmyk/Fat_loss-project"
    },
    {
      id: "neatzoo",
      title: "Neatzoo",
      subtitle: "Cleaning Company Platform",
      description: "A modern, responsive cleaning service web application featuring interactive service booking, scheduling workflow, and clean UI design.",
      tags: ["React", "Tailwind CSS", "JavaScript", "UI/UX"],
      image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=1200&auto=format&fit=crop",
      span: "md:col-span-12",
      liveUrl: "https://neatzoo.vercel.app/",
      githubUrl: "https://github.com/alenwilliam92-cmyk/Neatzoo"
    }
  ] as Project[],

  journal: [
    {
      id: "j1",
      title: "Building Scalable Backend Systems with Django & MySQL",
      date: "JUL 2026",
      readTime: "5 MIN READ",
      category: "BACKEND",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=600&auto=format&fit=crop",
      summary: "Exploring ORM query optimization, indexing strategies, and clean architecture principles."
    },
    {
      id: "j2",
      title: "Architecting Modern Fullstack Applications in Technopark Zone",
      date: "JUN 2026",
      readTime: "4 MIN READ",
      category: "ENGINEERING",
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=600&auto=format&fit=crop",
      summary: "Bridging server-rendered templates with modern reactive components for optimal performance."
    },
    {
      id: "j3",
      title: "Designing Interactive Glassmorphism UI with GSAP & Tailwind",
      date: "MAY 2026",
      readTime: "6 MIN READ",
      category: "FRONTEND",
      image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?q=80&w=600&auto=format&fit=crop",
      summary: "Crafting fluid user interfaces with hardware-accelerated CSS and timeline control."
    },
    {
      id: "j4",
      title: "STED Council Certification & End-to-End Delivery Standards",
      date: "APR 2026",
      readTime: "3 MIN READ",
      category: "CAREER",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=600&auto=format&fit=crop",
      summary: "Insights from achieving Grade A+ certification in Python Full Stack Development."
    }
  ] as JournalEntry[],

  explorations: [
    {
      id: "ex1",
      title: "SmartEdu Workspace UI",
      category: "Fullstack Architecture",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
      rotation: -3
    },
    {
      id: "ex2",
      title: "Dark Glass Dashboard",
      category: "UI/UX Design",
      image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop",
      rotation: 4
    },
    {
      id: "ex3",
      title: "Django REST Schema",
      category: "API Development",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800&auto=format&fit=crop",
      rotation: -2
    },
    {
      id: "ex4",
      title: "Fluid Micro-Animations",
      category: "Motion Design",
      image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=800&auto=format&fit=crop",
      rotation: 3
    },
    {
      id: "ex5",
      title: "Education Workflow",
      category: "Product Architecture",
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=800&auto=format&fit=crop",
      rotation: -4
    },
    {
      id: "ex6",
      title: "MySQL Performance Index",
      category: "Database Engineering",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=800&auto=format&fit=crop",
      rotation: 2
    }
  ] as ExplorationItem[],

  stats: [
    { value: "20+", label: "Years Experience", sublabel: "Industry & Tech Engineering" },
    { value: "95+", label: "Projects Done", sublabel: "Full Stack & Web Modules" },
    { value: "200%", label: "Satisfied Clients", sublabel: "Guaranteed Performance" }
  ]
};
