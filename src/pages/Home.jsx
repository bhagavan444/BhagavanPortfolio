"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import profileImg from "../assets/profile.jpeg";
import resumePdf from "../assets/bhagavanresume.pdf";
import {
  Download, Github, Linkedin, Mail, Phone, ArrowRight,
  ExternalLink, CheckCircle, Verified, ChevronRight, ChevronLeft,
  Sparkles, MapPin, MousePointer2
} from "lucide-react";

/* ═══════════════════════════════════════════════════════════════
   DESIGN SYSTEM TOKENS
═══════════════════════════════════════════════════════════════ */
const T = {
  bg:       "#ffffff",
  surface:  "#f8f9fa",
  surface2: "#f0f2f5",
  border:   "rgba(0,0,0,0.08)",
  border2:  "rgba(0,0,0,0.12)",
  text:     "#0a0a0f",
  muted:    "#6b6b78",
  muted2:   "#494956",
  accent:   "#5b7fff",
  accent2:  "#8b5cf6",
  green:    "#10b981",
  gold:     "#f59e0b",
};

/* ═══════════════════════════════════════════════════════════════
   GLOBAL STYLES WITH ANIMATIONS
═══════════════════════════════════════════════════════════════ */
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;0,9..144,600;0,9..144,700;1,9..144,400&family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap');

  *, *::before, *::after { 
    margin: 0; 
    padding: 0; 
    box-sizing: border-box; 
  }

  html { 
    scroll-behavior: smooth; 
    overflow-x: hidden;
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    background: ${T.bg};
    color: ${T.text};
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  ::selection { 
    background: rgba(91,127,255,0.25); 
    color: #fff; 
  }

  ::-webkit-scrollbar { width: 8px; }
  ::-webkit-scrollbar-track { background: ${T.bg}; }
  ::-webkit-scrollbar-thumb { 
    background: rgba(91,127,255,0.4); 
    border-radius: 4px; 
  }
  ::-webkit-scrollbar-thumb:hover { 
    background: rgba(91,127,255,0.6); 
  }

  /* ══════════════════════════════════════════════════════════════
     KEYFRAME ANIMATIONS
  ══════════════════════════════════════════════════════════════ */
  @keyframes fadeUp {
    from { 
      opacity: 0; 
      transform: translateY(32px); 
    }
    to { 
      opacity: 1; 
      transform: translateY(0); 
    }
  }

  @keyframes fadeIn {
    from { opacity: 0; } 
    to { opacity: 1; }
  }

  @keyframes slideInLeft {
    from { 
      opacity: 0; 
      transform: translateX(-30px); 
    }
    to { 
      opacity: 1; 
      transform: translateX(0); 
    }
  }

  @keyframes float {
    0%, 100% { transform: translateY(0px) translateX(0px); }
    25% { transform: translateY(-20px) translateX(10px); }
    50% { transform: translateY(-10px) translateX(-10px); }
    75% { transform: translateY(-25px) translateX(5px); }
  }

  @keyframes floatSlow {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-12px); }
  }

  @keyframes pulse-ring {
    0% { box-shadow: 0 0 0 0 rgba(91,127,255,0.4); }
    70% { box-shadow: 0 0 0 20px rgba(91,127,255,0); }
    100% { box-shadow: 0 0 0 0 rgba(91,127,255,0); }
  }

  @keyframes marquee {
    from { transform: translateX(0); }
    to { transform: translateX(-50%); }
  }

  @keyframes glowPulse {
    0%, 100% { opacity: 0.5; }
    50% { opacity: 0.9; }
  }

  @keyframes rotateSlow {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  @keyframes scaleIn {
    from { 
      opacity: 0; 
      transform: scale(0.92); 
    }
    to { 
      opacity: 1; 
      transform: scale(1); 
    }
  }

  @keyframes shimmer {
    0% { background-position: -1000px 0; }
    100% { background-position: 1000px 0; }
  }

  @keyframes particle1 {
    0%, 100% { 
      transform: translate(0, 0) scale(1); 
      opacity: 0.6;
    }
    25% { 
      transform: translate(150px, -200px) scale(1.2); 
      opacity: 0.8;
    }
    50% { 
      transform: translate(-100px, -400px) scale(0.8); 
      opacity: 0.4;
    }
    75% { 
      transform: translate(200px, -300px) scale(1.1); 
      opacity: 0.7;
    }
  }

  @keyframes particle2 {
    0%, 100% { 
      transform: translate(0, 0) scale(1); 
      opacity: 0.5;
    }
    33% { 
      transform: translate(-180px, -250px) scale(1.3); 
      opacity: 0.7;
    }
    66% { 
      transform: translate(120px, -350px) scale(0.9); 
      opacity: 0.3;
    }
  }

  @keyframes particle3 {
    0%, 100% { 
      transform: translate(0, 0) scale(1); 
      opacity: 0.4;
    }
    40% { 
      transform: translate(100px, -300px) scale(1.1); 
      opacity: 0.6;
    }
    80% { 
      transform: translate(-150px, -200px) scale(0.85); 
      opacity: 0.5;
    }
  }

  @keyframes textGlow {
    0%, 100% { 
      text-shadow: 0 0 20px rgba(91,127,255,0.3);
    }
    50% { 
      text-shadow: 0 0 40px rgba(91,127,255,0.6), 0 0 60px rgba(91,127,255,0.4);
    }
  }

  @keyframes borderGlow {
    0%, 100% { 
      box-shadow: 0 0 20px rgba(91,127,255,0.2), inset 0 0 20px rgba(91,127,255,0.1);
    }
    50% { 
      box-shadow: 0 0 40px rgba(91,127,255,0.4), inset 0 0 30px rgba(91,127,255,0.2);
    }
  }

  @keyframes scanline {
    0% { transform: translateY(-100%); }
    100% { transform: translateY(100%); }
  }

  @keyframes orbitSlow {
    from { transform: rotate(0deg) translateX(40px) rotate(0deg); }
    to { transform: rotate(360deg) translateX(40px) rotate(-360deg); }
  }

  /* ══════════════════════════════════════════════════════════════
     UTILITY CLASSES
  ══════════════════════════════════════════════════════════════ */
  .fade-up { animation: fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) both; }
  .fade-in { animation: fadeIn 0.6s ease both; }
  .slide-in-left { animation: slideInLeft 0.7s cubic-bezier(0.16, 1, 0.3, 1) both; }
  .scale-in { animation: scaleIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) both; }

  .d1 { animation-delay: 0.05s; }
  .d2 { animation-delay: 0.12s; }
  .d3 { animation-delay: 0.20s; }
  .d4 { animation-delay: 0.30s; }
  .d5 { animation-delay: 0.42s; }
  .d6 { animation-delay: 0.55s; }
  .d7 { animation-delay: 0.68s; }

  .glass {
    background: rgba(255,255,255,0.8);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid ${T.border};
    border-radius: 24px;
    box-shadow: 0 4px 24px rgba(0,0,0,0.06);
  }

  .display-heading {
    font-family: 'Fraunces', serif;
    line-height: 1;
    letter-spacing: -0.04em;
    font-weight: 600;
  }

  .section-label {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.7rem;
    font-weight: 600;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: ${T.accent};
    opacity: 0.9;
  }

  /* Marquee Animation */
  .marquee-track {
    display: flex;
    width: max-content;
    animation: marquee 40s linear infinite;
  }
  .marquee-track:hover { 
    animation-play-state: paused; 
  }

  /* Hover Effects */
  .hover-glow:hover {
    animation: borderGlow 2s ease-in-out infinite;
  }

  /* ══════════════════════════════════════════════════════════════
     RESPONSIVE DESIGN
  ══════════════════════════════════════════════════════════════ */
  @media (max-width: 1024px) {
    .hero-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
    .hero-image-col { max-width: 400px !important; margin: 0 auto !important; }
  }

  @media (max-width: 768px) {
    .nav-links { display: none !important; }
    .cta-row { flex-direction: column !important; width: 100% !important; }
    .metrics-grid { grid-template-columns: 1fr 1fr !important; gap: 1rem !important; }
    .skills-grid { grid-template-columns: 1fr !important; }
    .project-grid { grid-template-columns: 1fr !important; }
    .footer-content { flex-direction: column !important; gap: 1.5rem !important; text-align: center !important; }
    .footer-links { justify-content: center !important; }
  }

  @media (max-width: 480px) {
    .metrics-grid { grid-template-columns: 1fr !important; }
    .trust-row { flex-direction: column !important; align-items: flex-start !important; gap: 0.75rem !important; }
  }
`;

/* ═══════════════════════════════════════════════════════════════
   ANIMATED PARTICLES COMPONENT
═══════════════════════════════════════════════════════════════ */
function AnimatedParticles() {
  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
      {/* Floating Particles */}
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            width: i % 3 === 0 ? "4px" : i % 3 === 1 ? "6px" : "3px",
            height: i % 3 === 0 ? "4px" : i % 3 === 1 ? "6px" : "3px",
            borderRadius: "50%",
            background: i % 2 === 0 ? T.accent : T.accent2,
            left: `${10 + i * 12}%`,
            top: `${20 + (i * 15) % 60}%`,
            opacity: 0.4,
            animation: `particle${(i % 3) + 1} ${15 + i * 2}s ease-in-out infinite`,
            animationDelay: `${i * 0.8}s`,
            filter: "blur(1px)",
            boxShadow: `0 0 ${i % 2 === 0 ? "20px" : "15px"} ${i % 2 === 0 ? T.accent : T.accent2}`,
          }}
        />
      ))}
      
      {/* Orbiting Dots */}
      {[...Array(3)].map((_, i) => (
        <div
          key={`orbit-${i}`}
          style={{
            position: "absolute",
            left: "50%",
            top: "30%",
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            background: i === 0 ? T.accent : i === 1 ? T.green : T.accent2,
            animation: `orbitSlow ${20 + i * 5}s linear infinite`,
            animationDelay: `${i * 3}s`,
            opacity: 0.5,
            boxShadow: `0 0 15px ${i === 0 ? T.accent : i === 1 ? T.green : T.accent2}`,
          }}
        />
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   ENHANCED BUTTON COMPONENT (Performance Optimized)
═══════════════════════════════════════════════════════════════ */
function MagneticButton({ children, href, onClick, className = "", isPrimary = false, download }) {
  const [isHovered, setIsHovered] = useState(false);

  const baseStyle = {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.5rem",
    fontFamily: "'Inter', sans-serif",
    fontWeight: 600,
    fontSize: "0.875rem",
    padding: isPrimary ? "0.875rem 1.75rem" : "0.875rem 1.75rem",
    borderRadius: "12px",
    border: isPrimary ? "none" : `1.5px solid ${T.border2}`,
    cursor: "pointer",
    textDecoration: "none",
    letterSpacing: "-0.01em",
    transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
    whiteSpace: "nowrap",
    position: "relative",
    overflow: "hidden",
    background: isPrimary 
      ? `linear-gradient(135deg, ${T.accent} 0%, ${T.accent2} 100%)`
      : "rgba(0,0,0,0.03)",
    color: isPrimary ? "#fff" : T.text,
    boxShadow: isPrimary 
      ? `0 4px 24px rgba(91,127,255,0.3)` 
      : "none",
  };

  const hoverStyle = isHovered ? {
    transform: "translateY(-3px) scale(1.03)",
    boxShadow: isPrimary 
      ? `0 8px 32px rgba(91,127,255,0.5)` 
      : `0 4px 20px rgba(91,127,255,0.2)`,
    borderColor: isPrimary ? "transparent" : T.accent,
    color: isPrimary ? "#fff" : "#fff",
    background: isPrimary 
      ? `linear-gradient(135deg, ${T.accent} 0%, ${T.accent2} 100%)`
      : "rgba(91,127,255,0.08)",
  } : {};

  const Component = href ? "a" : "button";

  return (
    <Component
      href={href}
      onClick={onClick}
      download={download}
      className={className}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ ...baseStyle, ...hoverStyle }}
      target={href && href.startsWith("http") ? "_blank" : undefined}
      rel={href && href.startsWith("http") ? "noopener noreferrer" : undefined}
    >
      {isHovered && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `linear-gradient(90deg, transparent, rgba(91,127,255,0.15), transparent)`,
            animation: "shimmer 2s ease-in-out infinite",
          }}
        />
      )}
      <span style={{ position: "relative", zIndex: 1, display: "flex", alignItems: "center", gap: "0.5rem" }}>
        {children}
      </span>
    </Component>
  );
}

/* ═══════════════════════════════════════════════════════════════
   ANIMATED COUNTER COMPONENT
═══════════════════════════════════════════════════════════════ */
function AnimCounter({ target, suffix = "", duration = 1600, triggered }) {
  const [val, setVal] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!triggered || started.current) return;
    started.current = true;
    
    const num = parseInt(target.replace(/\D/g, ""), 10);
    const steps = 60;
    const stepValue = num / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += stepValue;
      if (current >= num) {
        setVal(num);
        clearInterval(timer);
      } else {
        setVal(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [triggered, target, duration]);

  return <span>{val}{suffix}</span>;
}

/* ═══════════════════════════════════════════════════════════════
   INTERSECTION OBSERVER HOOK
═══════════════════════════════════════════════════════════════ */
function useInView(threshold = 0.2) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return [ref, inView];
}

/* ═══════════════════════════════════════════════════════════════
   MAIN HOME COMPONENT
═══════════════════════════════════════════════════════════════ */
export default function Home() {
  const navigate = useNavigate();

  // Navbar state
  const [scrolled, setScrolled] = useState(false);
  const [scrollPct, setScrollPct] = useState(0);

  // Role cycling
  const roles = ["Full-Stack Engineer", "AI/ML Architect", "Cloud Systems Expert", "Systems Designer"];
  const [roleIdx, setRoleIdx] = useState(0);
  const [roleFading, setRoleFading] = useState(false);

  // Testimonial slider
  const [testIdx, setTestIdx] = useState(0);

  /* ══════════════════════════════════════════════════════════════
     SCROLL EFFECTS
  ══════════════════════════════════════════════════════════════ */
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setScrolled(scrollTop > 50);
      
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      setScrollPct((scrollTop / maxScroll) * 100);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ══════════════════════════════════════════════════════════════
     ROLE CYCLING
  ══════════════════════════════════════════════════════════════ */
  useEffect(() => {
    const interval = setInterval(() => {
      setRoleFading(true);
      setTimeout(() => {
        setRoleIdx((prev) => (prev + 1) % roles.length);
        setRoleFading(false);
      }, 400);
    }, 3200);

    return () => clearInterval(interval);
  }, []);

  /* ══════════════════════════════════════════════════════════════
     TESTIMONIAL AUTO-PLAY
  ══════════════════════════════════════════════════════════════ */
  useEffect(() => {
    const interval = setInterval(() => {
      setTestIdx((prev) => (prev + 1) % testimonials.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  /* ══════════════════════════════════════════════════════════════
     INTERSECTION OBSERVERS
  ══════════════════════════════════════════════════════════════ */
  const [metricsRef, metricsIn] = useInView();
  const [skillsRef, skillsIn] = useInView();
  const [achievRef, achievIn] = useInView();
  const [testRef, testIn] = useInView();
  const [projectRef, projectIn] = useInView();
  const [ctaRef, ctaIn] = useInView();

  /* ══════════════════════════════════════════════════════════════
     DATA
  ══════════════════════════════════════════════════════════════ */
  const metrics = [
    { 
      value: "5", 
      suffix: "+", 
      label: "Production Projects", 
      sub: "Shipped across 3 internships", 
      color: T.accent 
    },
    { 
      value: "20", 
      suffix: "+", 
      label: "Certifications", 
      sub: "AWS, Azure, GCP & more", 
      color: T.accent2 
    },
    { 
      value: "15", 
      suffix: "+", 
      label: "Tech Stack", 
      sub: "Languages, frameworks, tools", 
      color: T.green 
    },
    { 
      value: "80", 
      suffix: "%", 
      label: "Client Satisfaction", 
      sub: "Zero bug production record", 
      color: T.gold 
    },
  ];

  const skillGroups = [
  {
    category: "AI & Machine Learning",
    color: T.accent2,
    dot: "#8b5cf6",
    skills: [
      "TensorFlow",
      "Keras",
      "Scikit-learn",
      "CNN",
      "NLP (TF-IDF)",
      "Supervised Learning"
    ],
    desc: "Building and deploying machine learning models with real-world datasets and Flask-based inference pipelines.",
  },
  {
    category: "Full-Stack Development",
    color: T.accent,
    dot: "#5b7fff",
    skills: [
      "React.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "JavaScript",
      "REST APIs"
    ],
    desc: "Developing end-to-end web applications with secure authentication and frontend–backend integration.",
  },
  {
    category: "Backend & Integration",
    color: T.green,
    dot: "#34d399",
    skills: [
      "Flask",
      "API Integration",
      "OAuth (Google/GitHub)",
      "PDF Parsing",
      "Asynchronous Requests"
    ],
    desc: "Designing backend services and integrating third-party APIs for AI-powered applications.",
  },
  {
    category: "Tools & Foundations",
    color: T.gold,
    dot: "#fbbf24",
    skills: [
      "Git",
      "GitHub",
      "Postman",
      "VS Code",
      "OOP (Java & Python)",
      "Basic DSA"
    ],
    desc: "Strong programming fundamentals with collaborative development practices.",
  },
];

const techStack = [
  "React.js",
  "Node.js",
  "Express.js",
  "MongoDB",
  "JavaScript",
  "Python",
  "TensorFlow",
  "Keras",
  "Flask",
  "Scikit-learn",
  "HTML5",
  "CSS3",
  "Git",
  "GitHub",
  "REST APIs",
];



 const achievements = [
  { 
    year: "2025", 
    title: "AWS Certified Cloud Practitioner", 
    issuer: "Amazon Web Services", 
    color: T.gold 
  },
  { 
    year: "2025", 
    title: "24-Hour Hackathon Finalist", 
    issuer: "Brainovision × Ramachandra College of Engineering", 
    color: T.accent 
  },
  { 
    year: "2024", 
    title: "AIML Internship Completion", 
    issuer: "Blackbucks Paid Online", 
    color: T.green 
  },
  { 
    year: "2025", 
    title: "100+ DSA Problems Solved", 
    issuer: "LeetCode & Practice Platforms", 
    color: T.accent2 
  },
  { 
    year: "2024", 
    title: "Consistent Coding Streak (300+ Days)", 
    issuer: "GitHub Activity & Daily Practice", 
    color: "#f59e0b" 
  },
];


 const testimonials = [
  {
    quote: "Bhagavan led the backend architecture during our 24-hour hackathon. He handled MongoDB integration and authentication under pressure and ensured the deployment worked before submission.",
    name: "M Dhana Pujitha",
    role: "Team Lead – 24hr Hackathon, Ramachandra College of Engineering",
    avatar: "DP",
    color: T.accent,
  },
  {
    quote: "During his AIML internship, he quickly understood TensorFlow concepts and independently implemented model evaluation pipelines. Strong learning mindset.",
    name: "Internship Mentor",
    role: "Blackbucks Paid Online – AIML & Data Science",
    avatar: "IM",
    color: T.accent2,
  },
  {
    quote: "He consistently takes ownership of MERN stack features instead of just implementing assigned tasks. Shows initiative beyond academics.",
    name: "Project Guide",
    role: "Faculty – B.Tech AIDS",
    avatar: "PG",
    color: T.green,
  },
];


  const featuredProject = {
  title: "Real-Time Leave Automation System",
  subtitle: "Final Year Project (B.Tech 4-2)",
  tag: "Low-Code × Enterprise Workflow Automation × Microsoft 365",
  desc: `
  Designed and implemented an enterprise-ready Leave Management System as a final year project (4-2) 
  using Microsoft Power Apps and Power Automate. The system digitizes leave requests, 
  automates multi-level approval workflows, and provides real-time visibility for employees, managers, and HR teams.

  Integrated SharePoint as the centralized data repository and configured dynamic approval flows 
  using Power Automate with role-based access control. Implemented automated notifications via 
  Microsoft Teams and Outlook to reduce communication delays. Developed HR dashboards 
  using Power BI for leave analytics, department-level trends, and policy compliance monitoring.

  Focused on reducing manual paperwork, minimizing approval bottlenecks, and improving operational efficiency 
  within an organizational environment.
  `,
  stats: [
    { label: "Approval Time Reduced", value: "60–70%" },
    { label: "Manual Processing Reduced", value: "85–90%" },
    { label: "Pilot Users", value: "100+ Simulated Employees" },
  ],
  tech: [
    "Microsoft Power Apps",
    "Power Automate",
    "SharePoint Online",
    "Microsoft 365",
    "Dataverse",
    "Power BI",
  ],
  color: T.accent,
};


  /* ══════════════════════════════════════════════════════════════
     RENDER
  ══════════════════════════════════════════════════════════════ */
  return (
    <>
      <style>{GLOBAL_CSS}</style>

      {/* Animated Particles */}
      <AnimatedParticles />

      {/* Scroll Progress */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: "2px",
          background: T.surface,
          zIndex: 10000,
        }}
      >
        <div
          style={{
            width: `${scrollPct}%`,
            height: "100%",
            background: `linear-gradient(90deg, ${T.accent}, ${T.accent2})`,
            transition: "width 0.1s linear",
          }}
        />
      </div>

      {/* ══════════════════════════════════════════════════════════
          NAVBAR
      ══════════════════════════════════════════════════════════ */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          padding: "0 2.5rem",
          height: "72px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: scrolled ? "rgba(255,255,255,0.9)" : "transparent",
          backdropFilter: scrolled ? "blur(24px) saturate(180%)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(24px) saturate(180%)" : "none",
          borderBottom: scrolled ? `1px solid ${T.border}` : "1px solid transparent",
          transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        {/* Logo */}
        <div
          style={{
            fontFamily: "'Fraunces', serif",
            fontSize: "1.25rem",
            fontWeight: 600,
            color: T.text,
            letterSpacing: "-0.03em",
          }}
        >
          Bhagavan<span style={{ color: T.accent }}>.</span>
        </div>

        {/* Nav Links */}
        <div className="nav-links" style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          {["About", "Projects", "Skills", "Contact"].map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              style={{
                fontSize: "0.875rem",
                fontWeight: 500,
                color: T.muted2,
                textDecoration: "none",
                padding: "0.5rem 1rem",
                borderRadius: "8px",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#fff";
                e.currentTarget.style.background = "rgba(255,255,255,0.05)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = T.muted2;
                e.currentTarget.style.background = "transparent";
              }}
            >
              {link}
            </a>
          ))}
        </div>

        {/* Right Actions */}
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          {/* Availability Badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.4rem 0.9rem",
              background: "rgba(16,185,129,0.1)",
              border: `1px solid rgba(16,185,129,0.3)`,
              borderRadius: "999px",
            }}
          >
            <div
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: T.green,
                animation: "pulse-ring 2s ease-in-out infinite",
              }}
            />
            <span
              style={{
                fontSize: "0.75rem",
                fontWeight: 600,
                color: T.green,
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              Available
            </span>
          </div>

          {/* Resume Button */}
          <MagneticButton href={resumePdf} download>
            <Download size={14} /> Resume
          </MagneticButton>
        </div>
      </nav>

      {/* ══════════════════════════════════════════════════════════
          MAIN CONTENT
      ══════════════════════════════════════════════════════════ */}
      <main style={{ position: "relative", zIndex: 1 }}>
        {/* Background Gradient Mesh */}
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 0,
            pointerEvents: "none",
            background: `
              radial-gradient(ellipse 80% 60% at 20% 20%, rgba(91,127,255,0.06) 0%, transparent 60%),
              radial-gradient(ellipse 60% 50% at 80% 80%, rgba(139,92,246,0.05) 0%, transparent 60%),
              radial-gradient(ellipse 50% 40% at 50% 50%, rgba(52,211,153,0.03) 0%, transparent 55%)
            `,
          }}
        />

        {/* Noise Texture Overlay */}
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 0,
            pointerEvents: "none",
            opacity: 0.03,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* ══════════════════════════════════════════════════════════
            HERO SECTION
        ══════════════════════════════════════════════════════════ */}
        <section
          id="about"
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            position: "relative",
            zIndex: 1,
            paddingTop: "72px",
          }}
        >
          {/* Grid Overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 0,
              pointerEvents: "none",
              backgroundImage: `
                linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)
              `,
              backgroundSize: "80px 80px",
              maskImage: "radial-gradient(ellipse 80% 60% at 50% 50%, black 0%, transparent 100%)",
              WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 50%, black 0%, transparent 100%)",
            }}
          />

          <div
            style={{
              maxWidth: "1400px",
              margin: "0 auto",
              padding: "0 2.5rem",
              width: "100%",
              position: "relative",
              zIndex: 1,
            }}
          >
            <div
              className="hero-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 440px",
                gap: "6rem",
                alignItems: "center",
              }}
            >
              {/* LEFT: Content */}
              <div>
                {/* Availability Badge */}
                <div className="fade-up d1" style={{ marginBottom: "2.5rem" }}>
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.6rem",
                      padding: "0.5rem 1.1rem",
                      background: "rgba(16,185,129,0.1)",
                      border: `1px solid rgba(16,185,129,0.3)`,
                      borderRadius: "999px",
                      fontSize: "0.8rem",
                      fontWeight: 600,
                      color: T.green,
                    }}
                  >
                    <div
                      style={{
                        width: "6px",
                        height: "6px",
                        borderRadius: "50%",
                        background: T.green,
                        animation: "pulse-ring 2s ease-in-out infinite",
                      }}
                    />
                    Open to full-time roles · 2026 Graduate
                    <MapPin size={12} />
                    India / Remote
                  </span>
                </div>

                {/* Headline */}
                <h1
                  className="display-heading fade-up d2"
                  style={{
                    fontSize: "clamp(3.5rem, 7vw, 6rem)",
                    marginBottom: "0.4rem",
                    color: T.text,
                  }}
                >
                  Siva Satya Sai
                </h1>
                <h1
                  className="display-heading fade-up d3"
                  style={{
                    fontSize: "clamp(3.5rem, 7vw, 6rem)",
                    marginBottom: "2rem",
                    background: `linear-gradient(135deg, ${T.accent} 0%, ${T.accent2} 100%)`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    animation: "textGlow 3s ease-in-out infinite",
                    position: "relative",
                  }}
                >
                  Bhagavan
                  {/* Scanline Effect */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "linear-gradient(transparent 50%, rgba(91,127,255,0.05) 50%)",
                      backgroundSize: "100% 4px",
                      pointerEvents: "none",
                      animation: "scanline 8s linear infinite",
                    }}
                  />
                </h1>

                {/* Role Transition */}
                <div
                  className="fade-up d4"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    marginBottom: "2.5rem",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "0.75rem",
                      color: T.muted,
                      letterSpacing: "0.15em",
                    }}
                  >
                    CURRENTLY →
                  </span>
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "1.1rem",
                      fontWeight: 600,
                      color: T.text,
                      opacity: roleFading ? 0 : 1,
                      transform: roleFading ? "translateY(10px)" : "translateY(0)",
                      transition: "opacity 0.4s ease, transform 0.4s ease",
                    }}
                  >
                    {roles[roleIdx]}
                  </span>
                </div>

                {/* Description */}
                <p
                  className="fade-up d5"
                  style={{
                    fontSize: "1.15rem",
                    lineHeight: 1.8,
                    color: T.muted2,
                    maxWidth: "600px",
                    marginBottom: "3rem",
                    fontWeight: 400,
                  }}
                >
                  Full-stack engineer building scalable AI-powered systems.{" "}
                  <strong style={{ color: T.text, fontWeight: 600 }}>
                    3 industry internships
                  </strong>{" "}
                  and{" "}
                  <strong style={{ color: T.text, fontWeight: 600 }}>
                    5+ production systems
                  </strong>{" "}
                  shipped. Specializing in AI-powered applications and scalable cloud
                  architecture that drives real business outcomes.
                </p>

                {/* CTAs */}
                <div
                  className="cta-row fade-up d6"
                  style={{
                    display: "flex",
                    gap: "1rem",
                    marginBottom: "3.5rem",
                    flexWrap: "wrap",
                    alignItems: "center",
                  }}
                >
                  <MagneticButton isPrimary onClick={() => navigate("/projects")}>
                    View Work <ArrowRight size={16} />
                  </MagneticButton>
                  <MagneticButton href="mailto:g.sivasatyasaibhagavan@gmail.com">
                    <Mail size={15} /> Get in Touch
                  </MagneticButton>
                  <MagneticButton href={resumePdf} download>
                    <Download size={15} /> Resume
                  </MagneticButton>
                </div>

                {/* Trust Indicators */}
                <div
                  className="trust-row fade-up d7"
                  style={{
                    display: "flex",
                    gap: "2rem",
                    alignItems: "center",
                    paddingTop: "2.5rem",
                    borderTop: `1px solid ${T.border}`,
                  }}
                >
                  {[
                    { icon: "🏅", text: "20+ Certifications" },
                    { icon: "🚀", text: "5+ Projects" },
                    { icon: "⭐", text: "LeetCode Top 5%" },
                  ].map((item, i) => (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.6rem",
                      }}
                    >
                      <span style={{ fontSize: "1.1rem" }}>{item.icon}</span>
                      <span
                        style={{
                          fontSize: "0.85rem",
                          fontWeight: 500,
                          color: T.muted2,
                        }}
                      >
                        {item.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* RIGHT: Portrait */}
              <div className="hero-image-col fade-in d3" style={{ position: "relative" }}>
                {/* Glow Effect */}
                <div
                  style={{
                    position: "absolute",
                    inset: "-30px",
                    background: `radial-gradient(ellipse at center, rgba(91,127,255,0.15) 0%, transparent 70%)`,
                    animation: "glowPulse 4s ease-in-out infinite",
                    borderRadius: "36px",
                    zIndex: 0,
                  }}
                />

                {/* Card */}
                <div
                  className="hover-glow"
                  style={{
                    position: "relative",
                    zIndex: 1,
                    borderRadius: "32px",
                    border: `1.5px solid ${T.border2}`,
                    overflow: "hidden",
                    background: "#fff",
                    boxShadow: `
                      0 40px 100px rgba(0,0,0,0.15),
                      0 0 0 1px rgba(0,0,0,0.05)
                    `,
                    animation: "floatSlow 8s ease-in-out infinite",
                    transition: "transform 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.02) translateY(-8px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1) translateY(0)";
                  }}
                >
                  <img
                    src={profileImg}
                    alt="Siva Satya Sai Bhagavan"
                    style={{
                      width: "100%",
                      display: "block",
                      aspectRatio: "4/5",
                      objectFit: "cover",
                    }}
                  />

                  {/* Gradient Overlay */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(to top, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.3) 50%, transparent 100%)",
                    }}
                  />

                  {/* Floating Status Chip */}
                  <div
                    style={{
                      position: "absolute",
                      top: "24px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      background: "rgba(255,255,255,0.95)",
                      border: `1px solid ${T.border2}`,
                      backdropFilter: "blur(24px)",
                      borderRadius: "999px",
                      padding: "0.5rem 1.2rem",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      whiteSpace: "nowrap",
                    }}
                  >
                    <div
                      style={{
                        width: "6px",
                        height: "6px",
                        borderRadius: "50%",
                        background: T.green,
                        animation: "pulse-ring 2s ease-in-out infinite",
                      }}
                    />
                    <span
                      style={{
                        fontSize: "0.7rem",
                        fontWeight: 600,
                        color: T.text,
                        fontFamily: "'JetBrains Mono', monospace",
                      }}
                    >
                      AVAILABLE · IMMEDIATE
                    </span>
                  </div>

                  {/* Bottom Info Bar */}
                  <div
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      padding: "1.75rem",
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "'Fraunces', serif",
                        fontSize: "1.4rem",
                        color: "#fff",
                        marginBottom: "0.4rem",
                        fontWeight: 600,
                      }}
                    >
                      Bhagavan
                    </div>
                    <div
                      style={{
                        fontSize: "0.85rem",
                        color: T.muted2,
                        marginBottom: "1.2rem",
                      }}
                    >
                      Full-Stack · AI/ML · Cloud. Data Science
                    </div>

                    {/* Social Links */}
                    <div style={{ display: "flex", gap: "0.7rem" }}>
                      {[
                        {
                          icon: Github,
                          href: "https://github.com/bhagavan444",
                          color: "#fff",
                        },
                        {
                          icon: Linkedin,
                          href: "https://www.linkedin.com/in/gopalajosyula-siva-satya-sai-bhagavan-1624a027b/",
                          color: "#0a91fb",
                        },
                        {
                          icon: Mail,
                          href: "mailto:g.sivasatyasaibhagavan@gmail.com",
                          color: T.accent,
                        },
                      ].map((social, i) => (
                        <a
                          key={i}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            width: "38px",
                            height: "38px",
                            borderRadius: "10px",
                            background: "rgba(0,0,0,0.04)",
                            border: `1px solid ${T.border}`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: social.color,
                            textDecoration: "none",
                            transition: "all 0.3s ease",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = "rgba(91,127,255,0.1)";
                            e.currentTarget.style.transform = "scale(1.15) translateY(-2px)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = "rgba(0,0,0,0.04)";
                            e.currentTarget.style.transform = "scale(1) translateY(0)";
                          }}
                        >
                          <social.icon size={16} />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            METRICS SECTION
        ══════════════════════════════════════════════════════════ */}
        <section ref={metricsRef} style={{ padding: "8rem 0", position: "relative", zIndex: 1 }}>
          <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 2.5rem" }}>
            <div
              className="metrics-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: "1.5rem",
              }}
            >
              {metrics.map((metric, i) => (
                <div
                  key={i}
                  className="glass"
                  style={{
                    padding: "2.5rem 2rem",
                    opacity: metricsIn ? 1 : 0,
                    animation: metricsIn
                      ? `fadeUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.1}s both`
                      : "none",
                    transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                    cursor: "default",
                    position: "relative",
                    overflow: "hidden",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-8px) scale(1.02)";
                    e.currentTarget.style.borderColor = "rgba(91,127,255,0.2)";
                    e.currentTarget.style.boxShadow = "0 24px 64px rgba(0,0,0,0.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0) scale(1)";
                    e.currentTarget.style.borderColor = T.border;
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  {/* Shimmer Effect on Hover */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "linear-gradient(90deg, transparent, rgba(91,127,255,0.08), transparent)",
                      animation: "shimmer 3s ease-in-out infinite",
                      pointerEvents: "none",
                    }}
                  />
                  
                  <div style={{ position: "relative", zIndex: 1 }}>
                    <div
                      style={{
                        fontFamily: "'Fraunces', serif",
                        fontSize: "3rem",
                        fontWeight: 600,
                        color: metric.color,
                        marginBottom: "0.6rem",
                        letterSpacing: "-0.04em",
                        lineHeight: 1,
                      }}
                    >
                      <AnimCounter
                        target={metric.value}
                        suffix={metric.suffix}
                        triggered={metricsIn}
                      />
                    </div>
                    <div
                      style={{
                        fontSize: "0.95rem",
                        fontWeight: 600,
                        color: T.text,
                        marginBottom: "0.4rem",
                      }}
                    >
                      {metric.label}
                    </div>
                    <div
                      style={{
                        fontSize: "0.8rem",
                        color: T.muted,
                        lineHeight: 1.6,
                      }}
                    >
                      {metric.sub}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            TECH MARQUEE
        ══════════════════════════════════════════════════════════ */}
        <section
          style={{
            padding: "4rem 0 6rem",
            overflow: "hidden",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div style={{ marginBottom: "2rem", textAlign: "center" }}>
            <span className="section-label">Technology Arsenal</span>
          </div>

          {/* Fade Masks */}
          <div style={{ position: "relative" }}>
            <div
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                bottom: 0,
                width: "150px",
                background: `linear-gradient(90deg, ${T.bg}, transparent)`,
                zIndex: 2,
                pointerEvents: "none",
              }}
            />
            <div
              style={{
                position: "absolute",
                right: 0,
                top: 0,
                bottom: 0,
                width: "150px",
                background: `linear-gradient(270deg, ${T.bg}, transparent)`,
                zIndex: 2,
                pointerEvents: "none",
              }}
            />

            <div style={{ overflow: "hidden" }}>
              <div className="marquee-track">
                {techStack.map((tech, i) => (
                  <div
                    key={i}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.7rem",
                      margin: "0 0.9rem",
                      padding: "0.7rem 1.4rem",
                      background: "#fff",
                      border: `1px solid ${T.border}`,
                      borderRadius: "999px",
                      whiteSpace: "nowrap",
                      fontSize: "0.875rem",
                      fontWeight: 500,
                      color: T.muted2,
                      transition: "all 0.3s ease",
                      cursor: "default",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = T.text;
                      e.currentTarget.style.borderColor = T.accent;
                      e.currentTarget.style.background = "rgba(91,127,255,0.08)";
                      e.currentTarget.style.transform = "scale(1.05)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = T.muted2;
                      e.currentTarget.style.borderColor = T.border;
                      e.currentTarget.style.background = "#fff";
                      e.currentTarget.style.transform = "scale(1)";
                    }}
                  >
                    {tech}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            SKILLS SECTION
        ══════════════════════════════════════════════════════════ */}
        <section
          id="skills"
          ref={skillsRef}
          style={{ padding: "8rem 0", position: "relative", zIndex: 1 }}
        >
          <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 2.5rem" }}>
            <div style={{ marginBottom: "4rem" }}>
              <span className="section-label" style={{ display: "block", marginBottom: "1.2rem" }}>
                Expertise
              </span>
              <h2
                className="display-heading"
                style={{
                  fontSize: "clamp(2.5rem, 5vw, 3.5rem)",
                  color: T.text,
                  maxWidth: "600px",
                }}
              >
                Skills & Competencies
              </h2>
            </div>

            <div
              className="skills-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "1.5rem",
              }}
            >
              {skillGroups.map((group, i) => (
                <div
                  key={i}
                  className="glass"
                  style={{
                    padding: "2.5rem",
                    opacity: skillsIn ? 1 : 0,
                    animation: skillsIn
                      ? `fadeUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.12}s both`
                      : "none",
                    cursor: "default",
                    transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-10px) scale(1.02)";
                    e.currentTarget.style.borderColor = "rgba(91,127,255,0.25)";
                    e.currentTarget.style.background = "rgba(91,127,255,0.04)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0) scale(1)";
                    e.currentTarget.style.borderColor = T.border;
                    e.currentTarget.style.background = "rgba(255,255,255,0.8)";
                  }}
                >
                  {/* Header */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.9rem",
                      marginBottom: "1.2rem",
                    }}
                  >
                    <div
                      style={{
                        width: "10px",
                        height: "10px",
                        borderRadius: "50%",
                        background: group.dot,
                        boxShadow: `0 0 16px ${group.dot}`,
                      }}
                    />
                    <span
                      style={{
                        fontSize: "0.95rem",
                        fontWeight: 700,
                        color: T.text,
                      }}
                    >
                      {group.category}
                    </span>
                  </div>

                  {/* Description */}
                  <p
                    style={{
                      fontSize: "0.875rem",
                      color: T.muted,
                      lineHeight: 1.7,
                      marginBottom: "1.5rem",
                    }}
                  >
                    {group.desc}
                  </p>

                  {/* Skill Chips */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem" }}>
                    {group.skills.map((skill, j) => (
                      <span
                        key={j}
                        style={{
                          padding: "0.35rem 0.85rem",
                          borderRadius: "8px",
                          background: `rgba(${
                            group.color === T.accent
                              ? "91,127,255"
                              : group.color === T.accent2
                              ? "139,92,246"
                              : group.color === T.green
                              ? "52,211,153"
                              : "251,191,36"
                          },0.08)`,
                          border: `1px solid rgba(${
                            group.color === T.accent
                              ? "91,127,255"
                              : group.color === T.accent2
                              ? "139,92,246"
                              : group.color === T.green
                              ? "52,211,153"
                              : "251,191,36"
                          },0.2)`,
                          fontSize: "0.775rem",
                          fontWeight: 500,
                          color: group.color,
                          fontFamily: "'JetBrains Mono', monospace",
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            FEATURED PROJECT
        ══════════════════════════════════════════════════════════ */}
        <section
          ref={projectRef}
          style={{ padding: "8rem 0", position: "relative", zIndex: 1 }}
        >
          <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 2.5rem" }}>
            <div style={{ marginBottom: "4rem" }}>
              <span className="section-label" style={{ display: "block", marginBottom: "1.2rem" }}>
                Featured Work
              </span>
              <h2
                className="display-heading"
                style={{
                  fontSize: "clamp(2.5rem, 5vw, 3.5rem)",
                  color: T.text,
                }}
              >
                Selected Project
              </h2>
            </div>

            <div
              style={{
                borderRadius: "28px",
                overflow: "hidden",
                border: `1.5px solid ${T.border2}`,
                background: "#fff",
                opacity: projectIn ? 1 : 0,
                animation: projectIn
                  ? "fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) both"
                  : "none",
                transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-6px)";
                e.currentTarget.style.boxShadow = "0 32px 80px rgba(0,0,0,0.12)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 24px rgba(0,0,0,0.06)";
              }}
            >
              {/* Top Banner */}
              <div
                style={{
                  height: "240px",
                  position: "relative",
                  overflow: "hidden",
                  background: `linear-gradient(135deg, rgba(91,127,255,0.12), rgba(139,92,246,0.08), rgba(52,211,153,0.06))`,
                  borderBottom: `1px solid ${T.border}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {/* Grid Pattern */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    backgroundImage: `
                      linear-gradient(rgba(91,127,255,0.06) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(91,127,255,0.06) 1px, transparent 1px)
                    `,
                    backgroundSize: "48px 48px",
                  }}
                />

                {/* Floating Orbs */}
                {[
                  { size: 220, x: "15%", y: "50%", c: T.accent, o: 0.15 },
                  { size: 180, x: "70%", y: "35%", c: T.accent2, o: 0.12 },
                  { size: 140, x: "85%", y: "70%", c: T.green, o: 0.10 },
                ].map((orb, i) => (
                  <div
                    key={i}
                    style={{
                      position: "absolute",
                      left: orb.x,
                      top: orb.y,
                      width: orb.size,
                      height: orb.size,
                      borderRadius: "50%",
                      background: orb.c,
                      opacity: orb.o,
                      filter: "blur(70px)",
                      transform: "translate(-50%, -50%)",
                      animation: `float ${7 + i}s ease-in-out infinite`,
                      animationDelay: `${i * 0.9}s`,
                    }}
                  />
                ))}

                {/* Content */}
                <div style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
                  <div
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "0.75rem",
                      color: T.accent,
                      letterSpacing: "0.18em",
                      marginBottom: "0.7rem",
                    }}
                  >
                    {featuredProject.tag}
                  </div>
                  <div
                    className="display-heading"
                    style={{
                      fontSize: "2.2rem",
                      color: T.text,
                    }}
                  >
                    {featuredProject.title}
                  </div>
                </div>
              </div>

              {/* Bottom Content */}
              <div
                className="project-grid"
                style={{
                  padding: "2.5rem 3rem",
                  display: "grid",
                  gridTemplateColumns: "1fr auto",
                  gap: "2.5rem",
                  alignItems: "start",
                }}
              >
                <div>
                  <p
                    style={{
                      fontSize: "1rem",
                      color: T.muted2,
                      lineHeight: 1.8,
                      marginBottom: "1.8rem",
                      maxWidth: "640px",
                    }}
                  >
                    {featuredProject.desc}
                  </p>

                  {/* Tech Stack */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem" }}>
                    {featuredProject.tech.map((tech, i) => (
                      <span
                        key={i}
                        style={{
                          padding: "0.35rem 0.85rem",
                          borderRadius: "8px",
                          background: "rgba(0,0,0,0.04)",
                          border: `1px solid ${T.border}`,
                          fontSize: "0.775rem",
                          color: T.muted2,
                          fontFamily: "'JetBrains Mono', monospace",
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Stats */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1.2rem",
                    minWidth: "200px",
                  }}
                >
                  {featuredProject.stats.map((stat, i) => (
                    <div key={i} style={{ textAlign: "right" }}>
                      <div
                        style={{
                          fontSize: "1.8rem",
                          fontFamily: "'Fraunces', serif",
                          color: T.accent,
                          letterSpacing: "-0.03em",
                          fontWeight: 600,
                        }}
                      >
                        {stat.value}
                      </div>
                      <div
                        style={{
                          fontSize: "0.8rem",
                          color: T.muted,
                          marginTop: "0.2rem",
                        }}
                      >
                        {stat.label}
                      </div>
                    </div>
                  ))}

                  <MagneticButton
                    isPrimary
                    onClick={() => navigate("/projects")}
                    style={{ marginTop: "0.8rem", justifyContent: "center" }}
                  >
                    See All Work <ArrowRight size={15} />
                  </MagneticButton>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            ACHIEVEMENTS
        ══════════════════════════════════════════════════════════ */}
        <section
          ref={achievRef}
          id="achievements"
          style={{ padding: "8rem 0", position: "relative", zIndex: 1 }}
        >
          <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 2.5rem" }}>
            <div style={{ marginBottom: "4rem" }}>
              <span className="section-label" style={{ display: "block", marginBottom: "1.2rem" }}>
                Credentials
              </span>
              <h2
                className="display-heading"
                style={{
                  fontSize: "clamp(2.5rem, 5vw, 3.5rem)",
                  color: T.text,
                }}
              >
                Certifications & Awards
              </h2>
            </div>

            <div style={{ position: "relative", paddingLeft: "2px" }}>
              {/* Timeline Line */}
              <div
                style={{
                  position: "absolute",
                  left: "19px",
                  top: "28px",
                  bottom: "28px",
                  width: "2px",
                  background: `linear-gradient(180deg, ${T.accent}, ${T.accent2}, ${T.green})`,
                }}
              />

              <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
                {achievements.map((achievement, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      gap: "2.5rem",
                      alignItems: "center",
                      padding: "1.2rem 0",
                      opacity: achievIn ? 1 : 0,
                      animation: achievIn
                        ? `fadeUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.1}s both`
                        : "none",
                    }}
                  >
                    {/* Dot */}
                    <div
                      style={{
                        width: "40px",
                        height: "40px",
                        minWidth: "40px",
                        borderRadius: "50%",
                        background: "#fff",
                        border: `2.5px solid ${achievement.color}`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        position: "relative",
                        zIndex: 1,
                        transition: "all 0.3s ease",
                        boxShadow: `0 0 0 5px ${T.bg}`,
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.boxShadow = `0 0 0 10px ${achievement.color}20, 0 0 0 5px ${T.bg}`;
                        e.currentTarget.style.transform = "scale(1.1)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.boxShadow = `0 0 0 5px ${T.bg}`;
                        e.currentTarget.style.transform = "scale(1)";
                      }}
                    >
                      <CheckCircle size={18} style={{ color: achievement.color }} />
                    </div>

                    {/* Card */}
                    <div
                      className="glass"
                      style={{
                        flex: 1,
                        padding: "1.3rem 1.8rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: "1.5rem",
                        transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "translateY(-6px)";
                        e.currentTarget.style.borderColor = "rgba(91,127,255,0.2)";
                        e.currentTarget.style.boxShadow = "0 20px 60px rgba(0,0,0,0.08)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.borderColor = T.border;
                        e.currentTarget.style.boxShadow = "0 4px 24px rgba(0,0,0,0.06)";
                      }}
                    >
                      <div>
                        <div
                          style={{
                            fontSize: "1rem",
                            fontWeight: 600,
                            color: T.text,
                            marginBottom: "0.3rem",
                          }}
                        >
                          {achievement.title}
                        </div>
                        <div
                          style={{
                            fontSize: "0.8rem",
                            color: T.muted,
                          }}
                        >
                          {achievement.issuer}
                        </div>
                      </div>

                      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                        <span
                          style={{
                            fontFamily: "'JetBrains Mono', monospace",
                            fontSize: "0.75rem",
                            color: T.muted,
                            fontWeight: 600,
                          }}
                        >
                          {achievement.year}
                        </span>
                        <span
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "0.4rem",
                            padding: "0.3rem 0.8rem",
                            borderRadius: "999px",
                            background: `rgba(${
                              achievement.color === T.gold
                                ? "251,191,36"
                                : achievement.color === T.accent
                                ? "91,127,255"
                                : achievement.color === T.green
                                ? "52,211,153"
                                : "139,92,246"
                            },0.08)`,
                            border: `1px solid ${achievement.color}40`,
                            fontSize: "0.7rem",
                            fontWeight: 600,
                            color: achievement.color,
                          }}
                        >
                          <Verified size={11} /> Verified
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            TESTIMONIALS
        ══════════════════════════════════════════════════════════ */}
        <section
          ref={testRef}
          style={{ padding: "8rem 0", position: "relative", zIndex: 1 }}
        >
          <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 2.5rem" }}>
            <div
              style={{
                marginBottom: "4rem",
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: "1.5rem",
              }}
            >
              <div>
                <span className="section-label" style={{ display: "block", marginBottom: "1.2rem" }}>
                  Social Proof
                </span>
                <h2
                  className="display-heading"
                  style={{
                    fontSize: "clamp(2.5rem, 5vw, 3.5rem)",
                    color: T.text,
                  }}
                >
                  What Leaders Say
                </h2>
              </div>

              {/* Navigation Buttons */}
              <div style={{ display: "flex", gap: "0.7rem" }}>
                <button
                  onClick={() =>
                    setTestIdx((prev) => (prev - 1 + testimonials.length) % testimonials.length)
                  }
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "12px",
                    background: T.surface,
                    border: `1px solid ${T.border}`,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: T.muted2,
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#fff";
                    e.currentTarget.style.borderColor = T.border2;
                    e.currentTarget.style.transform = "scale(1.05)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = T.muted2;
                    e.currentTarget.style.borderColor = T.border;
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={() => setTestIdx((prev) => (prev + 1) % testimonials.length)}
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "12px",
                    background: T.surface,
                    border: `1px solid ${T.border}`,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: T.muted2,
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#fff";
                    e.currentTarget.style.borderColor = T.border2;
                    e.currentTarget.style.transform = "scale(1.05)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = T.muted2;
                    e.currentTarget.style.borderColor = T.border;
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>

            {/* Testimonial Cards */}
            <div style={{ position: "relative", minHeight: "260px" }}>
              {testimonials.map((testimonial, i) => (
                <div
                  key={i}
                  className="glass"
                  style={{
                    position: i === testIdx ? "relative" : "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    padding: "3rem",
                    opacity: i === testIdx ? 1 : 0,
                    visibility: i === testIdx ? "visible" : "hidden",
                    transform:
                      i === testIdx ? "translateY(0) scale(1)" : "translateY(25px) scale(0.96)",
                    transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
                    boxShadow: i === testIdx ? "0 28px 90px rgba(0,0,0,0.12)" : "none",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      gap: "2.5rem",
                      alignItems: "flex-start",
                      flexWrap: "wrap",
                    }}
                  >
                    {/* Avatar */}
                    <div
                      style={{
                        width: "64px",
                        height: "64px",
                        minWidth: "64px",
                        borderRadius: "18px",
                        background: `linear-gradient(135deg, ${testimonial.color}30, ${testimonial.color}10)`,
                        border: `2.5px solid ${testimonial.color}40`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "1.1rem",
                        fontWeight: 700,
                        color: testimonial.color,
                        fontFamily: "'Fraunces', serif",
                      }}
                    >
                      {testimonial.avatar}
                    </div>

                    {/* Content */}
                    <div style={{ flex: 1 }}>
                      {/* Stars */}
                      <div style={{ display: "flex", gap: "0.3rem", marginBottom: "1.2rem" }}>
                        {[...Array(5)].map((_, si) => (
                          <Sparkles key={si} size={13} style={{ color: T.gold }} />
                        ))}
                      </div>

                      {/* Quote */}
                      <blockquote
                        style={{
                          fontSize: "1.1rem",
                          lineHeight: 1.8,
                          color: T.muted2,
                          marginBottom: "1.8rem",
                          fontStyle: "italic",
                          maxWidth: "720px",
                        }}
                      >
                        "{testimonial.quote}"
                      </blockquote>

                      {/* Author */}
                      <div>
                        <div
                          style={{
                            fontSize: "0.95rem",
                            fontWeight: 600,
                            color: T.text,
                          }}
                        >
                          {testimonial.name}
                        </div>
                        <div
                          style={{
                            fontSize: "0.85rem",
                            color: T.muted,
                          }}
                        >
                          {testimonial.role}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Indicator Dots */}
                  <div
                    style={{
                      display: "flex",
                      gap: "0.6rem",
                      marginTop: "2.5rem",
                      justifyContent: "flex-end",
                    }}
                  >
                    {testimonials.map((_, di) => (
                      <button
                        key={di}
                        onClick={() => setTestIdx(di)}
                        style={{
                          width: di === testIdx ? "28px" : "8px",
                          height: "8px",
                          borderRadius: "4px",
                          border: "none",
                          cursor: "pointer",
                          background: di === testIdx ? testimonial.color : T.border2,
                          transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                        }}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            CTA SECTION
        ══════════════════════════════════════════════════════════ */}
        <section
          ref={ctaRef}
          id="contact"
          style={{ padding: "8rem 0 10rem", position: "relative", zIndex: 1 }}
        >
          <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 2.5rem" }}>
            <div
              style={{
                borderRadius: "32px",
                padding: "5rem 4rem",
                background: `linear-gradient(135deg, ${T.surface} 0%, rgba(91,127,255,0.06) 100%)`,
                border: `1.5px solid ${T.border2}`,
                position: "relative",
                overflow: "hidden",
                opacity: ctaIn ? 1 : 0,
                animation: ctaIn ? "fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) both" : "none",
              }}
            >
              {/* Background Orb */}
              <div
                style={{
                  position: "absolute",
                  right: "-12%",
                  top: "-35%",
                  width: "480px",
                  height: "480px",
                  borderRadius: "50%",
                  background: `radial-gradient(circle, rgba(91,127,255,0.1), transparent 70%)`,
                  pointerEvents: "none",
                }}
              />

              <div style={{ position: "relative", zIndex: 1, maxWidth: "720px" }}>
                <span className="section-label" style={{ display: "block", marginBottom: "1.5rem" }}>
                  Let's build something great
                </span>

                <h2
                  className="display-heading"
                  style={{
                    fontSize: "clamp(2.5rem, 5vw, 3.8rem)",
                    color: T.text,
                    marginBottom: "1.5rem",
                    lineHeight: 1.1,
                  }}
                >
                  Ready to make an
                  <br />
                  <span
                    style={{
                      background: `linear-gradient(135deg, ${T.accent} 0%, ${T.accent2} 100%)`,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    immediate impact
                  </span>
                </h2>

                <p
                  style={{
                    fontSize: "1.05rem",
                    color: T.muted2,
                    lineHeight: 1.8,
                    marginBottom: "3rem",
                    maxWidth: "560px",
                  }}
                >
                  Seeking full-time engineering roles where I can ship AI-powered products,
                  architect scalable systems, and grow alongside exceptional teams.
                </p>

                {/* CTA Buttons */}
                <div
                  style={{
                    display: "flex",
                    gap: "1rem",
                    flexWrap: "wrap",
                    marginBottom: "3rem",
                  }}
                >
                  <MagneticButton isPrimary href="mailto:g.sivasatyasaibhagavan@gmail.com">
                    Schedule Interview <ArrowRight size={16} />
                  </MagneticButton>
                  <MagneticButton onClick={() => navigate("/projects")}>
                    View Portfolio <ExternalLink size={15} />
                  </MagneticButton>
                </div>

                {/* Contact Info */}
                <div
                  style={{
                    display: "flex",
                    gap: "2.5rem",
                    flexWrap: "wrap",
                    paddingTop: "2.5rem",
                    borderTop: `1px solid ${T.border}`,
                  }}
                >
                  <a
                    href="mailto:g.sivasatyasaibhagavan@gmail.com"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.6rem",
                      color: T.muted2,
                      textDecoration: "none",
                      fontSize: "0.9rem",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = T.muted2)}
                  >
                    <Mail size={16} style={{ color: T.accent }} /> g.sivasatyasaibhagavan@gmail.com
                  </a>
                  <a
                    href="tel:+917569205626"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.6rem",
                      color: T.muted2,
                      textDecoration: "none",
                      fontSize: "0.9rem",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = T.muted2)}
                  >
                    <Phone size={16} style={{ color: T.green }} /> +91 7569205626
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            FOOTER
        ══════════════════════════════════════════════════════════ */}
        <footer
          style={{
            borderTop: `1px solid ${T.border}`,
            padding: "3rem 0",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div
            className="footer-content"
            style={{
              maxWidth: "1400px",
              margin: "0 auto",
              padding: "0 2.5rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "1.5rem",
            }}
          >
            {/* Logo */}
            <div
              style={{
                fontFamily: "'Fraunces', serif",
                fontSize: "1.1rem",
                fontWeight: 600,
                color: T.muted,
              }}
            >
              Bhagavan<span style={{ color: T.accent }}>.</span>
            </div>

            {/* Links */}
            <div
              className="footer-links"
              style={{
                display: "flex",
                gap: "2.5rem",
                alignItems: "center",
              }}
            >
              {[
                { icon: Github, href: "https://github.com/bhagavan444", label: "GitHub" },
                {
                  icon: Linkedin,
                  href: "https://www.linkedin.com/in/gopalajosyula-siva-satya-sai-bhagavan-1624a027b/",
                  label: "LinkedIn",
                },
                {
                  icon: Mail,
                  href: "mailto:g.sivasatyasaibhagavan@gmail.com",
                  label: "Email",
                },
              ].map((link, i) => (
                <a
                  key={i}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    color: T.muted,
                    textDecoration: "none",
                    fontSize: "0.85rem",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = T.muted)}
                >
                  <link.icon size={14} /> {link.label}
                </a>
              ))}
            </div>

            {/* Copyright */}
            <div
              style={{
                fontSize: "0.8rem",
                color: T.muted,
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              © 2026 · Built with precision
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}