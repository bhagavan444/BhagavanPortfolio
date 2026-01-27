import React, { useState, useEffect, useRef } from 'react';
import {
  ExternalLink, Github, Rocket, Star, X, CheckCircle2,
  Terminal, Sparkles, Layers, Mail, Award, Brain, Cpu,
  Code, Zap, Cloud, Database, Server, Globe, Heart,
  Trophy, Briefcase, GraduationCap, Users, Search, Filter,
  Grid, List, TrendingUp, Eye, Download, Share2, AlertCircle,
  Film, Play, Box, Crosshair, Target, Flame, Activity,
  ArrowRight, ChevronDown, Menu, Maximize2, GitBranch
} from 'lucide-react';

const allProjects = [
  {
    id: 11,
    title: "ATS Resume Builder Platform",
    github: "https://github.com/bhagavan444/Resumebuilderwebapp",
    live: "https://melody-nap-17037283.figma.site",
    desc: "AI-powered platform that helps job seekers build ATS-optimized resumes and dramatically improve shortlisting chances.",
    longDesc: "Developed a complete full-stack ATS Resume Builder that uses AI to analyze job descriptions, suggest keywords, optimize formatting, and generate ATS-friendly PDFs in real-time. Includes real-time scoring, multiple professional templates, and export functionality.",
    problem: "Many qualified candidates get rejected because their resumes fail Applicant Tracking System (ATS) filters.",
    solution: "Built an intelligent resume builder that parses job descriptions, suggests missing keywords, and generates perfectly formatted ATS-compatible resumes.",
    myRole: "Full ownership — Designed UI/UX, developed complete frontend & backend, implemented ATS scoring engine, keyword optimization, and PDF generation.",
    techUsed: ["React", "Node.js", "MongoDB", "JWT", "Resume Parsing", "PDF Generation", "AI Keyword Matching"],
    impact: [
      "Improved resume shortlisting probability by up to 2×",
      "Thousands of resumes generated with high success rate",
      "Real-time ATS scoring & keyword suggestions"
    ],
    highlights: ["ATS-Friendly Templates", "Real-Time Scoring", "Keyword Optimization", "PDF Export", "Job Description Analysis"],
    stats: { atsScore: "90%+", templates: "10+", resumesBuilt: "3k+", shortlistingBoost: "2×" },
    tags: ["ATS Optimization", "Resume Builder", "Full-Stack", "AI", "Career Tools"],
    category: "AI",
    icon: "📄",
    img: "https://lh3.googleusercontent.com/d/1gSVeUalkdrQAgl0rBNdOm_g2I-kmQgia",
    color: "#00f5ff",
    glowRGB: "0, 245, 255",
    featured: true,
    views: "12.5k",
    downloads: "3.2k"
  },
  {
    id: 9,
    title: "NexusAI – Multi-Modal AI Workspace",
    github: "https://github.com/bhagavan444/chatbotwebapp",
    live: "https://bhagavanai.lovable.app/",
    desc: "Enterprise-grade AI workspace for research, automation, content generation, and multi-modal interactions in one unified interface.",
    longDesc: "A powerful all-in-one AI platform supporting text, images, PDFs, code generation, and advanced prompt engineering — designed for professionals and teams.",
    problem: "Professionals juggle multiple disconnected AI tools, losing context and productivity.",
    solution: "Created a unified multi-modal AI workspace with ultra-fast responses, memory context, file understanding, and premium UI/UX.",
    myRole: "Led product vision, UI/UX design, frontend architecture, prompt engineering, and performance optimization.",
    techUsed: ["React", "AI APIs", "Prompt Engineering", "File Parsing", "Real-time Processing"],
    impact: [
      "Eliminated tool-switching overhead",
      "Enabled 3× faster AI-driven workflows",
      "Premium enterprise-grade experience"
    ],
    highlights: ["Unified Workspace", "Multi-Modal Input", "Ultra-Fast Responses", "Premium UI", "Context Memory"],
    stats: { speed: "Ultra-Fast", modes: "Multi-Modal", quality: "Enterprise" },
    tags: ["AI Platform", "Productivity", "Enterprise UI", "Multi-Modal AI"],
    category: "AI",
    icon: "⚡",
    img: "https://lh3.googleusercontent.com/d/1Rz65QllbOI8nPEGeTO2GJT8a11jdbPtc",
    color: "#a855f7",
    glowRGB: "168, 85, 247",
    featured: true,
    views: "18.3k",
    downloads: "5.1k"
  },
  {
    id: 5,
    title: "Project Forge – AI Project Generator",
    github: null,
    live: "https://aiprojecttool.lovable.app",
    desc: "AI-powered tool that instantly generates complete, production-ready software project structures from simple natural language prompts.",
    longDesc: "Transforms vague ideas into fully structured, well-organized project repositories with folder structure, README, tech stack suggestions, and starter code.",
    problem: "Developers waste hours setting up boilerplate, folder structure, and initial architecture.",
    solution: "An intelligent AI system that understands requirements and generates clean, scalable project skeletons instantly.",
    myRole: "Designed AI generation logic, prompt engineering, frontend interface, and output formatting.",
    techUsed: ["React", "AI Models", "File System Generation", "Prompt Engineering"],
    impact: [
      "Saved developers 4–8 hours of setup time per project",
      "Enabled lightning-fast prototyping",
      "100k+ projects generated"
    ],
    highlights: ["Prompt-to-Code", "Clean Architecture", "Production-Ready Output", "Tech Stack Suggestions"],
    stats: { projects: "100k+", satisfaction: "99.9%" },
    tags: ["AI", "Developer Tools", "Automation", "Code Generation"],
    category: "Developer Tools",
    icon: "🚀",
    img: "https://lh3.googleusercontent.com/d/1jE-44VOkR64pyjLZNKC3vLt8FIEzfg-g",
    color: "#ff6b35",
    glowRGB: "255, 107, 53",
    featured: true,
    views: "25.7k",
    downloads: "8.9k"
  },
  {
    id: 7,
    title: "ArchMind – AI System Design Platform",
    github: null,
    live: "https://archmind-spark.lovable.app/",
    desc: "AI-powered platform that generates scalable, production-grade system architectures with trade-off analysis and best practices.",
    longDesc: "Helps engineers and students design high-level system architectures for real-world problems with detailed explanations and scalability considerations.",
    problem: "System design interviews and real-world architecture planning require deep expertise and time.",
    solution: "AI that generates complete system designs, identifies bottlenecks, suggests improvements, and applies FAANG-level patterns.",
    myRole: "Designed AI reasoning engine, architecture visualization, prompt chains, and interactive UI.",
    techUsed: ["System Design", "AI Reasoning", "Scalability Patterns", "React"],
    impact: [
      "Helped users master system design concepts faster",
      "Generated 50k+ professional architectures",
      "Applied real-world best practices"
    ],
    highlights: ["AI Architecture Generation", "Trade-Off Analysis", "Scalable Patterns", "FAANG-Level Designs"],
    stats: { architectures: "50k+", uptime: "99%", latency: "<50ms" },
    tags: ["System Design", "Scalability", "AI", "Interview Prep"],
    category: "AI",
    icon: "🧠",
    img: "https://lh3.googleusercontent.com/d/1sYsWzyDIuWAF-wz3A6iNorF3ATCpKXPF",
    color: "#00f5ff",
    glowRGB: "0, 245, 255",
    featured: true,
    views: "31.2k",
    downloads: "11.4k"
  },
  {
    id: 8,
    title: "TruthGuard AI – Fake News Detection",
    github: "https://github.com/bhagavan444/News-detector",
    live: "https://bliss-gala-22285345.figma.site/",
    desc: "Advanced NLP & Deep Learning system for real-time fake news detection with explainable AI outputs.",
    longDesc: "Built an end-to-end ML pipeline using TF-IDF + LSTM that classifies news articles with 95% accuracy and provides reasoning for predictions.",
    problem: "Fake news spreads misinformation and affects public decision-making.",
    solution: "High-accuracy NLP model with explainable outputs deployed as a real-time detection system.",
    myRole: "Complete ML pipeline: data collection, preprocessing, feature engineering, model training, evaluation, and deployment.",
    techUsed: ["Python", "NLP", "LSTM", "TensorFlow", "TF-IDF", "Explainable AI"],
    impact: [
      "Achieved 95% classification accuracy",
      "Processed millions of articles",
      "Provided transparent, explainable predictions"
    ],
    highlights: ["95% Accuracy", "Explainable AI", "Real-Time Analysis", "Large-Scale Dataset"],
    stats: { accuracy: "95%", articles: "1M+", responseTime: "<100ms" },
    tags: ["NLP", "Machine Learning", "AI Safety", "Deep Learning"],
    category: "Machine Learning",
    icon: "🛡️",
    img: "https://lh3.googleusercontent.com/d/1zVrR2EdQoPvSSvfnVox0xBoc5qbgr96r",
    color: "#a855f7",
    glowRGB: "168, 85, 247",
    featured: true,
    views: "22.8k",
    downloads: "6.7k"
  },
  {
    id: 10,
    title: "CareerCompass AI – Career Path Recommendation",
    github: "https://github.com/bhagavan444/Career-Path-Recommendation",
    live: null,
    desc: "AI-powered career guidance platform that recommends personalized career paths based on skills, interests, and aptitude.",
    longDesc: "Developed an intelligent recommendation system using Machine Learning that analyzes student profiles and suggests optimal career trajectories.",
    problem: "Students lack personalized career direction.",
    solution: "Smart ML-based career recommendations.",
    myRole: "Built full pipeline, backend, and frontend.",
    techUsed: ["Python", "Machine Learning", "Flask", "Scikit-learn", "React"],
    impact: ["Effective career recommendations", "Structured learning paths"],
    highlights: ["ML-Driven Logic", "Interactive UI", "Skill Gap Analysis"],
    stats: { accuracy: "92%", careers: "50+", responseTime: "<200ms" },
    tags: ["AI", "ML", "EdTech", "Recommendation"],
    category: "Machine Learning",
    icon: "🧭",
    img: "https://lh3.googleusercontent.com/d/1pTnIysNCQgb3oHPOyofDKVkAe_acI2Bj",
    color: "#10b981",
    glowRGB: "16, 185, 129",
    featured: true,
    views: "18.4k",
    downloads: "4.9k"
  },
  {
    id: 4,
    title: "Heart Disease Prediction Platform",
    github: "https://github.com/bhagavan444/Heart-Disease-Prediction",
    live: null,
    desc: "Machine learning web application that predicts heart disease risk using clinical data with 87% accuracy.",
    longDesc: "Developed a complete ML pipeline and Flask web app that takes patient parameters and predicts heart disease probability with detailed explanations.",
    problem: "Early detection of heart disease is critical but often delayed due to lack of accessible tools.",
    solution: "User-friendly web platform powered by ML models trained on clinical datasets.",
    myRole: "End-to-end development: data preprocessing, model training, evaluation, Flask backend, and responsive frontend.",
    techUsed: ["Python", "Scikit-learn", "Flask", "Pandas", "HTML/CSS/JS"],
    impact: [
      "Achieved 87% prediction accuracy",
      "Enabled fast, accessible health risk assessment",
      "Educational tool for medical students"
    ],
    highlights: ["ML-Based Prediction", "Clinical Feature Engineering", "Web Deployment"],
    stats: { accuracy: "87%", predictions: "1.2k+" },
    tags: ["Machine Learning", "Healthcare", "Flask", "Web App"],
    category: "Healthcare",
    icon: "❤️",
    img: "https://lh3.googleusercontent.com/d/1Uy1JiAFMcAwMD0LZgm0J-bYiWuHpRzqq",
    color: "#ff6b35",
    glowRGB: "255, 107, 53",
    featured: false,
    views: "9.4k",
    downloads: "2.1k"
  }
];

export default function AdvancedProjectsShowcase() {
  const [activeProject, setActiveProject] = useState(null);
  const [hoveredId, setHoveredId] = useState(null);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [projectType, setProjectType] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const heroRef = useRef(null);

  const categories = ['all', ...new Set(allProjects.map(p => p.category))];

  // Mouse parallax effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress((scrolled / maxScroll) * 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.fade-in-element').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [filter, searchTerm, projectType, sortBy]);

  const filteredProjects = allProjects
    .filter(p => filter === 'all' || p.category === filter)
    .filter(p => {
      if (projectType === 'github') return p.github !== null;
      if (projectType === 'live') return p.live !== null;
      return true;
    })
    .filter(p =>
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.desc.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => {
      if (sortBy === 'featured') return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      if (sortBy === 'views') return parseFloat(b.views) - parseFloat(a.views);
      return 0;
    });

  const totalViews = allProjects.reduce((sum, p) => sum + parseFloat(p.views), 0);
  const totalDownloads = allProjects.reduce((sum, p) => sum + parseFloat(p.downloads), 0);
  const githubProjects = allProjects.filter(p => p.github).length;
  const liveProjects = allProjects.filter(p => p.live).length;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&display=swap');

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          background: #000;
          color: #fff;
          overflow-x: hidden;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        /* ═══════════════════════════════════════════════════════════ */
        /* ADVANCED ANIMATIONS */
        /* ═══════════════════════════════════════════════════════════ */
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }

        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px currentColor; }
          50% { box-shadow: 0 0 40px currentColor, 0 0 60px currentColor; }
        }

        @keyframes shimmer {
          0% { transform: translateX(-100%) rotate(45deg); }
          100% { transform: translateX(200%) rotate(45deg); }
        }

        @keyframes rotate-gradient {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .fade-in-element {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1),
                      transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .fade-in-element.animate-in {
          opacity: 1;
          transform: translateY(0);
        }

        /* ═══════════════════════════════════════════════════════════ */
        /* GLASS MORPHISM */
        /* ═══════════════════════════════════════════════════════════ */
        
        .glass-card {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(30px) saturate(180%);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 24px;
          box-shadow: 
            0 8px 32px 0 rgba(0, 0, 0, 0.37),
            inset 0 1px 0 0 rgba(255, 255, 255, 0.05);
        }

        .glass-button {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .glass-button:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.2);
          transform: translateY(-2px);
        }

        /* ═══════════════════════════════════════════════════════════ */
        /* PROJECT CARDS */
        /* ═══════════════════════════════════════════════════════════ */
        
        .project-card {
          position: relative;
          overflow: hidden;
          transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
          cursor: pointer;
        }

        .project-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.1),
            transparent
          );
          transition: left 0.6s;
        }

        .project-card:hover::before {
          left: 100%;
        }

        .project-card:hover {
          transform: translateY(-12px) scale(1.02);
        }

        .project-card-image {
          position: relative;
          overflow: hidden;
        }

        .project-card-image img {
          transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .project-card:hover .project-card-image img {
          transform: scale(1.15);
        }

        /* ═══════════════════════════════════════════════════════════ */
        /* GRADIENT TEXT */
        /* ═══════════════════════════════════════════════════════════ */
        
        .gradient-text {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: gradient-shift 3s ease infinite;
        }

        .gradient-text-cyan {
          background: linear-gradient(135deg, #00f5ff 0%, #00a6fb 50%, #0582ca 100%);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: gradient-shift 3s ease infinite;
        }

        /* ═══════════════════════════════════════════════════════════ */
        /* SCROLL BAR */
        /* ═══════════════════════════════════════════════════════════ */
        
        ::-webkit-scrollbar {
          width: 10px;
        }

        ::-webkit-scrollbar-track {
          background: #000;
        }

        ::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #667eea, #764ba2);
          border-radius: 10px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, #764ba2, #f093fb);
        }

        /* ═══════════════════════════════════════════════════════════ */
        /* RESPONSIVE */
        /* ═══════════════════════════════════════════════════════════ */
        
        @media (max-width: 768px) {
          .mobile-menu {
            position: fixed;
            top: 0;
            right: -100%;
            width: 80%;
            height: 100vh;
            background: rgba(10, 10, 30, 0.98);
            backdrop-filter: blur(20px);
            transition: right 0.5s cubic-bezier(0.16, 1, 0.3, 1);
            z-index: 9999;
            padding: 2rem;
          }

          .mobile-menu.open {
            right: 0;
          }
        }

        /* ═══════════════════════════════════════════════════════════ */
        /* PREMIUM EFFECTS */
        /* ═══════════════════════════════════════════════════════════ */
        
        .magnetic-button {
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .hover-lift {
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .hover-lift:hover {
          transform: translateY(-8px);
        }

        .shimmer-effect {
          position: relative;
          overflow: hidden;
        }

        .shimmer-effect::after {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(
            45deg,
            transparent 30%,
            rgba(255, 255, 255, 0.1) 50%,
            transparent 70%
          );
          animation: shimmer 3s infinite;
        }

        .gradient-border {
          position: relative;
        }

        .gradient-border::before {
          content: '';
          position: absolute;
          inset: -2px;
          border-radius: inherit;
          padding: 2px;
          background: linear-gradient(135deg, #667eea, #764ba2, #f093fb);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          opacity: 0;
          transition: opacity 0.4s;
        }

        .gradient-border:hover::before {
          opacity: 1;
        }

        /* ═══════════════════════════════════════════════════════════ */
        /* NEURAL NETWORK BACKGROUND */
        /* ═══════════════════════════════════════════════════════════ */
        
        .neural-bg {
          position: fixed;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          opacity: 0.3;
        }

        .neural-dot {
          position: absolute;
          width: 4px;
          height: 4px;
          background: #667eea;
          border-radius: 50%;
          box-shadow: 0 0 10px #667eea;
        }

        /* ═══════════════════════════════════════════════════════════ */
        /* STATS COUNTER ANIMATION */
        /* ═══════════════════════════════════════════════════════════ */
        
        @keyframes count-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .stat-number {
          animation: count-up 1s cubic-bezier(0.16, 1, 0.3, 1);
        }
      `}</style>

      {/* Progress Bar */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: `${scrollProgress}%`,
          height: '3px',
          background: 'linear-gradient(90deg, #667eea, #764ba2, #f093fb)',
          zIndex: 10000,
          transition: 'width 0.1s',
          boxShadow: '0 0 20px #667eea'
        }}
      />

      {/* Neural Network Background */}
      <div className="neural-bg">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="neural-dot"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`
            }}
          />
        ))}
      </div>

      {/* Main Container */}
      <div
        style={{
          minHeight: '100vh',
          background: 'radial-gradient(ellipse at top, #0f0f23 0%, #000000 100%)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Animated Gradient Orbs */}
        <div
          style={{
            position: 'absolute',
            top: '10%',
            left: `${mousePosition.x * 0.05}%`,
            width: '500px',
            height: '500px',
            background: 'radial-gradient(circle, rgba(102, 126, 234, 0.15) 0%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(80px)',
            pointerEvents: 'none',
            transition: 'all 0.3s ease-out'
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '10%',
            right: `${mousePosition.y * 0.05}%`,
            width: '600px',
            height: '600px',
            background: 'radial-gradient(circle, rgba(118, 75, 162, 0.12) 0%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(100px)',
            pointerEvents: 'none',
            transition: 'all 0.3s ease-out'
          }}
        />

        {/* Content */}
        <div
          style={{
            position: 'relative',
            zIndex: 10,
            maxWidth: '1600px',
            margin: '0 auto',
            padding: '0 clamp(1rem, 5vw, 3rem)'
          }}
        >
          {/* Hero Section */}
          <section
            ref={heroRef}
            style={{
              minHeight: '100vh',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              paddingTop: '80px',
              paddingBottom: '80px'
            }}
          >
            {/* Badge */}
            <div
              className="glass-button fade-in-element"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.75rem 1.5rem',
                borderRadius: '100px',
                marginBottom: '2rem',
                fontSize: '0.9rem',
                fontWeight: 500,
                letterSpacing: '0.5px',
                color: '#a0aec0'
              }}
            >
              <Sparkles size={18} style={{ color: '#667eea' }} />
              Enterprise-Grade Portfolio
              <Activity size={18} style={{ color: '#f093fb' }} />
            </div>

            {/* Main Title */}
            <h1
              className="gradient-text fade-in-element"
              style={{
                fontSize: 'clamp(3rem, 10vw, 7rem)',
                fontWeight: 900,
                lineHeight: 1.1,
                marginBottom: '2rem',
                fontFamily: "'Space Grotesk', sans-serif",
                letterSpacing: '-0.03em'
              }}
            >
              INNOVATION
              <br />
              IN MOTION
            </h1>

            {/* Subtitle */}
            <p
              className="fade-in-element"
              style={{
                fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)',
                color: '#a0aec0',
                maxWidth: '800px',
                lineHeight: 1.8,
                marginBottom: '3rem',
                fontWeight: 400
              }}
            >
              Transforming ideas into production-ready solutions with cutting-edge AI,
              <br />
              full-stack development, and scalable architecture
            </p>

            {/* CTA Buttons */}
            <div
              className="fade-in-element"
              style={{
                display: 'flex',
                gap: '1.5rem',
                flexWrap: 'wrap',
                justifyContent: 'center'
              }}
            >
              <a
                href="#projects"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '1.25rem 2.5rem',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: '#fff',
                  borderRadius: '100px',
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  textDecoration: 'none',
                  transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                  boxShadow: '0 20px 40px rgba(102, 126, 234, 0.3)'
                }}
                className="hover-lift"
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 25px 50px rgba(102, 126, 234, 0.5)';
                  e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(102, 126, 234, 0.3)';
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                }}
              >
                Explore Projects
                <Rocket size={20} />
              </a>

              <a
                href="mailto:g.sivasatyasaibhagavan@gmail.com"
                className="glass-button"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '1.25rem 2.5rem',
                  borderRadius: '100px',
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  textDecoration: 'none',
                  color: '#fff'
                }}
              >
                <Mail size={20} />
                Get in Touch
              </a>
            </div>

            {/* Scroll Indicator */}
            <div
              style={{
                position: 'absolute',
                bottom: '40px',
                left: '50%',
                transform: 'translateX(-50%)',
                animation: 'float 3s ease-in-out infinite'
              }}
            >
              <ChevronDown size={32} style={{ color: '#667eea', opacity: 0.6 }} />
            </div>
          </section>

          {/* Stats Section */}
          <section
            id="stats"
            style={{
              padding: '6rem 0',
              marginBottom: '4rem'
            }}
          >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '2rem'
              }}
            >
              {[
                { label: 'Total Projects', value: allProjects.length, icon: Rocket, color: '#667eea', suffix: '' },
                { label: 'GitHub Repos', value: githubProjects, icon: Github, color: '#764ba2', suffix: '' },
                { label: 'Live Demos', value: liveProjects, icon: Globe, color: '#f093fb', suffix: '' },
                { label: 'Total Views', value: totalViews.toFixed(1), icon: Eye, color: '#667eea', suffix: 'k' },
                { label: 'Downloads', value: totalDownloads.toFixed(1), icon: Download, color: '#764ba2', suffix: 'k' },
                { label: 'Featured Works', value: allProjects.filter(p => p.featured).length, icon: Star, color: '#ffd700', suffix: '' }
              ].map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={i}
                    className="glass-card fade-in-element hover-lift"
                    style={{
                      padding: '2.5rem 2rem',
                      textAlign: 'center',
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                  >
                    {/* Icon */}
                    <div
                      style={{
                        width: '70px',
                        height: '70px',
                        margin: '0 auto 1.5rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: `linear-gradient(135deg, ${stat.color}20, ${stat.color}10)`,
                        borderRadius: '20px',
                        border: `2px solid ${stat.color}40`
                      }}
                    >
                      <Icon size={32} style={{ color: stat.color }} />
                    </div>

                    {/* Value */}
                    <div
                      className="stat-number"
                      style={{
                        fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
                        fontWeight: 900,
                        color: stat.color,
                        marginBottom: '0.5rem',
                        fontFamily: "'Space Grotesk', sans-serif",
                        textShadow: `0 0 30px ${stat.color}50`
                      }}
                    >
                      {stat.value}{stat.suffix}
                    </div>

                    {/* Label */}
                    <div
                      style={{
                        fontSize: '1rem',
                        color: '#a0aec0',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: '1px'
                      }}
                    >
                      {stat.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Filters Section */}
          <section
            id="filters"
            style={{
              padding: '4rem 0',
              marginBottom: '3rem'
            }}
          >
            {/* Search Bar */}
            <div
              className="fade-in-element"
              style={{
                maxWidth: '700px',
                margin: '0 auto 3rem',
                position: 'relative'
              }}
            >
              <Search
                size={22}
                style={{
                  position: 'absolute',
                  left: '1.5rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#667eea',
                  pointerEvents: 'none',
                  zIndex: 2
                }}
              />
              <input
                type="text"
                placeholder="Search projects, technologies, or categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="glass-card"
                style={{
                  width: '100%',
                  padding: '1.25rem 1.75rem 1.25rem 4rem',
                  fontSize: '1.05rem',
                  color: '#fff',
                  border: '1px solid rgba(102, 126, 234, 0.3)',
                  outline: 'none',
                  transition: 'all 0.3s'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#667eea';
                  e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(102, 126, 234, 0.3)';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>

            {/* Filter Buttons */}
            <div
              className="fade-in-element"
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '1rem',
                justifyContent: 'center',
                marginBottom: '2.5rem'
              }}
            >
              {/* View Mode Toggle */}
              <div
                className="glass-card"
                style={{
                  display: 'flex',
                  padding: '0.5rem',
                  gap: '0.5rem'
                }}
              >
                <button
                  onClick={() => setViewMode('grid')}
                  className="glass-button"
                  style={{
                    padding: '0.75rem 1.5rem',
                    borderRadius: '12px',
                    background: viewMode === 'grid' ? 'rgba(102, 126, 234, 0.2)' : 'transparent',
                    color: viewMode === 'grid' ? '#667eea' : '#a0aec0',
                    fontSize: '0.95rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                >
                  <Grid size={18} />
                  Grid
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className="glass-button"
                  style={{
                    padding: '0.75rem 1.5rem',
                    borderRadius: '12px',
                    background: viewMode === 'list' ? 'rgba(102, 126, 234, 0.2)' : 'transparent',
                    color: viewMode === 'list' ? '#667eea' : '#a0aec0',
                    fontSize: '0.95rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                >
                  <List size={18} />
                  List
                </button>
              </div>

              {/* Project Type Filters */}
              {['all', 'github', 'live'].map((type) => (
                <button
                  key={type}
                  onClick={() => setProjectType(type)}
                  className="glass-button"
                  style={{
                    padding: '0.75rem 1.75rem',
                    borderRadius: '100px',
                    background: projectType === type ? 'rgba(102, 126, 234, 0.2)' : 'transparent',
                    color: projectType === type ? '#667eea' : '#a0aec0',
                    fontSize: '0.95rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                >
                  {type === 'all' && <Box size={18} />}
                  {type === 'github' && <Github size={18} />}
                  {type === 'live' && <Globe size={18} />}
                  {type === 'all' ? 'All Projects' : type === 'github' ? 'GitHub' : 'Live Demos'}
                </button>
              ))}
            </div>

            {/* Category Filters */}
            <div
              className="fade-in-element"
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '1rem',
                justifyContent: 'center',
                marginBottom: '2rem'
              }}
            >
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className="glass-button"
                  style={{
                    padding: '0.75rem 1.75rem',
                    borderRadius: '100px',
                    background: filter === cat ? 'linear-gradient(135deg, #667eea, #764ba2)' : 'transparent',
                    color: filter === cat ? '#fff' : '#a0aec0',
                    fontSize: '0.95rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    textTransform: 'capitalize',
                    letterSpacing: '0.5px'
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Sort Options */}
            <div
              className="fade-in-element"
              style={{
                display: 'flex',
                gap: '1rem',
                justifyContent: 'center',
                flexWrap: 'wrap'
              }}
            >
              <button
                onClick={() => setSortBy('featured')}
                className="glass-button"
                style={{
                  padding: '0.75rem 1.75rem',
                  borderRadius: '100px',
                  background: sortBy === 'featured' ? 'rgba(255, 215, 0, 0.2)' : 'transparent',
                  color: sortBy === 'featured' ? '#ffd700' : '#a0aec0',
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <Star size={18} />
                Featured
              </button>
              <button
                onClick={() => setSortBy('views')}
                className="glass-button"
                style={{
                  padding: '0.75rem 1.75rem',
                  borderRadius: '100px',
                  background: sortBy === 'views' ? 'rgba(102, 126, 234, 0.2)' : 'transparent',
                  color: sortBy === 'views' ? '#667eea' : '#a0aec0',
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <TrendingUp size={18} />
                Most Viewed
              </button>
            </div>

            {/* Results Count */}
            <div
              className="fade-in-element"
              style={{
                textAlign: 'center',
                marginTop: '2.5rem',
                fontSize: '1.1rem',
                color: '#667eea',
                fontFamily: "'JetBrains Mono', monospace"
              }}
            >
              {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''} found
            </div>
          </section>

          {/* Projects Grid/List */}
          <section
            id="projects"
            style={{
              padding: '2rem 0 6rem'
            }}
          >
            {viewMode === 'grid' ? (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 420px), 1fr))',
                  gap: 'clamp(2rem, 4vw, 3rem)'
                }}
              >
                {filteredProjects.map((project, idx) => (
                  <div
                    key={project.id}
                    className="glass-card project-card fade-in-element"
                    onClick={() => setActiveProject(project)}
                    onMouseEnter={() => setHoveredId(project.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    style={{
                      borderColor: hoveredId === project.id ? project.color : 'rgba(255, 255, 255, 0.08)',
                      boxShadow: hoveredId === project.id
                        ? `0 20px 60px rgba(${project.glowRGB}, 0.4)`
                        : '0 8px 32px rgba(0, 0, 0, 0.37)',
                      animationDelay: `${idx * 0.1}s`
                    }}
                  >
                    {/* Image */}
                    <div
                      className="project-card-image"
                      style={{
                        height: '260px',
                        position: 'relative'
                      }}
                    >
                      <img
                        src={project.img}
                        alt={project.title}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          borderRadius: '24px 24px 0 0'
                        }}
                      />

                      {/* Gradient Overlay */}
                      <div
                        style={{
                          position: 'absolute',
                          inset: 0,
                          background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 50%)',
                          borderRadius: '24px 24px 0 0'
                        }}
                      />

                      {/* Featured Badge */}
                      {project.featured && (
                        <div
                          style={{
                            position: 'absolute',
                            top: '1rem',
                            right: '1rem',
                            padding: '0.5rem 1rem',
                            background: 'rgba(255, 215, 0, 0.2)',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(255, 215, 0, 0.5)',
                            borderRadius: '100px',
                            color: '#ffd700',
                            fontSize: '0.8rem',
                            fontWeight: 700,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                          }}
                        >
                          <Star size={14} fill="#ffd700" />
                          FEATURED
                        </div>
                      )}

                      {/* Project Type Badges */}
                      <div
                        style={{
                          position: 'absolute',
                          bottom: '1rem',
                          left: '1rem',
                          right: '1rem',
                          display: 'flex',
                          justifyContent: 'space-between',
                          gap: '0.75rem'
                        }}
                      >
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          {project.github && (
                            <div
                              style={{
                                padding: '0.5rem 0.75rem',
                                background: 'rgba(168, 85, 247, 0.2)',
                                backdropFilter: 'blur(10px)',
                                border: '1px solid rgba(168, 85, 247, 0.5)',
                                borderRadius: '8px',
                                fontSize: '0.75rem',
                                color: '#a855f7',
                                fontWeight: 600
                              }}
                            >
                              <Github size={14} />
                            </div>
                          )}
                          {project.live && (
                            <div
                              style={{
                                padding: '0.5rem 0.75rem',
                                background: 'rgba(255, 107, 53, 0.2)',
                                backdropFilter: 'blur(10px)',
                                border: '1px solid rgba(255, 107, 53, 0.5)',
                                borderRadius: '8px',
                                fontSize: '0.75rem',
                                color: '#ff6b35',
                                fontWeight: 600
                              }}
                            >
                              <Globe size={14} />
                            </div>
                          )}
                        </div>
                        <div
                          style={{
                            padding: '0.5rem 0.75rem',
                            background: 'rgba(0, 0, 0, 0.6)',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(102, 126, 234, 0.3)',
                            borderRadius: '8px',
                            fontSize: '0.75rem',
                            color: '#667eea',
                            fontWeight: 600,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.4rem'
                          }}
                        >
                          <Eye size={12} />
                          {project.views}
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div style={{ padding: '2rem' }}>
                      {/* Icon & Title */}
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '1rem',
                          marginBottom: '1.25rem'
                        }}
                      >
                        <div
                          style={{
                            width: '60px',
                            height: '60px',
                            flexShrink: 0,
                            background: `linear-gradient(135deg, ${project.color}20, ${project.color}10)`,
                            border: `2px solid ${project.color}40`,
                            borderRadius: '16px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '2rem'
                          }}
                        >
                          {project.icon}
                        </div>

                        <div style={{ flex: 1, minWidth: 0 }}>
                          <h3
                            style={{
                              fontSize: 'clamp(1.25rem, 2.5vw, 1.5rem)',
                              fontWeight: 700,
                              color: '#fff',
                              marginBottom: '0.5rem',
                              lineHeight: 1.3
                            }}
                          >
                            {project.title}
                          </h3>
                          <div
                            style={{
                              display: 'inline-block',
                              padding: '0.25rem 0.75rem',
                              background: `${project.color}20`,
                              border: `1px solid ${project.color}40`,
                              borderRadius: '100px',
                              fontSize: '0.75rem',
                              fontWeight: 600,
                              color: project.color
                            }}
                          >
                            {project.category}
                          </div>
                        </div>
                      </div>

                      {/* Description */}
                      <p
                        style={{
                          fontSize: '1rem',
                          lineHeight: 1.6,
                          color: '#a0aec0',
                          marginBottom: '1.5rem'
                        }}
                      >
                        {project.desc}
                      </p>

                      {/* Tags */}
                      <div
                        style={{
                          display: 'flex',
                          flexWrap: 'wrap',
                          gap: '0.5rem',
                          marginBottom: '1.5rem'
                        }}
                      >
                        {project.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            style={{
                              padding: '0.4rem 0.9rem',
                              background: 'rgba(255, 255, 255, 0.05)',
                              border: '1px solid rgba(255, 255, 255, 0.1)',
                              borderRadius: '100px',
                              fontSize: '0.8rem',
                              color: '#cbd5e0',
                              fontFamily: "'JetBrains Mono', monospace"
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Action Buttons */}
                      <div
                        style={{
                          display: 'flex',
                          gap: '0.75rem'
                        }}
                      >
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="glass-button"
                            style={{
                              flex: 1,
                              padding: '0.875rem',
                              borderRadius: '12px',
                              fontSize: '0.95rem',
                              fontWeight: 600,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              gap: '0.5rem',
                              textDecoration: 'none',
                              color: '#a855f7',
                              borderColor: 'rgba(168, 85, 247, 0.3)'
                            }}
                          >
                            <Github size={18} />
                            Code
                          </a>
                        )}
                        {project.live && (
                          <a
                            href={project.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            style={{
                              flex: 1,
                              padding: '0.875rem',
                              borderRadius: '12px',
                              fontSize: '0.95rem',
                              fontWeight: 700,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              gap: '0.5rem',
                              textDecoration: 'none',
                              background: `linear-gradient(135deg, ${project.color}, ${project.color}dd)`,
                              color: '#000',
                              border: 'none',
                              transition: 'all 0.3s'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.transform = 'scale(1.03)';
                              e.currentTarget.style.boxShadow = `0 10px 30px rgba(${project.glowRGB}, 0.4)`;
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.transform = 'scale(1)';
                              e.currentTarget.style.boxShadow = 'none';
                            }}
                          >
                            <Rocket size={18} />
                            Demo
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              // List View
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {filteredProjects.map((project, idx) => (
                  <div
                    key={project.id}
                    className="glass-card project-card fade-in-element hover-lift"
                    onClick={() => setActiveProject(project)}
                    onMouseEnter={() => setHoveredId(project.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    style={{
                      display: 'flex',
                      flexDirection: window.innerWidth > 768 ? 'row' : 'column',
                      overflow: 'hidden',
                      borderColor: hoveredId === project.id ? project.color : 'rgba(255, 255, 255, 0.08)',
                      animationDelay: `${idx * 0.1}s`
                    }}
                  >
                    {/* Image */}
                    <div
                      className="project-card-image"
                      style={{
                        width: window.innerWidth > 768 ? '320px' : '100%',
                        height: window.innerWidth > 768 ? 'auto' : '200px',
                        flexShrink: 0,
                        position: 'relative'
                      }}
                    >
                      <img
                        src={project.img}
                        alt={project.title}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover'
                        }}
                      />
                      {project.featured && (
                        <div
                          style={{
                            position: 'absolute',
                            top: '1rem',
                            left: '1rem',
                            padding: '0.5rem 1rem',
                            background: 'rgba(255, 215, 0, 0.2)',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(255, 215, 0, 0.5)',
                            borderRadius: '100px',
                            color: '#ffd700',
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.4rem'
                          }}
                        >
                          <Star size={12} fill="#ffd700" />
                          FEATURED
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div style={{ flex: 1, padding: '2rem', display: 'flex', flexDirection: 'column' }}>
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '1rem' }}>
                        <div
                          style={{
                            width: '50px',
                            height: '50px',
                            background: `linear-gradient(135deg, ${project.color}20, ${project.color}10)`,
                            border: `2px solid ${project.color}40`,
                            borderRadius: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '1.5rem',
                            flexShrink: 0
                          }}
                        >
                          {project.icon}
                        </div>
                        <div style={{ flex: 1 }}>
                          <h3
                            style={{
                              fontSize: '1.5rem',
                              fontWeight: 700,
                              color: '#fff',
                              marginBottom: '0.5rem'
                            }}
                          >
                            {project.title}
                          </h3>
                          <div
                            style={{
                              display: 'inline-block',
                              padding: '0.25rem 0.75rem',
                              background: `${project.color}20`,
                              border: `1px solid ${project.color}40`,
                              borderRadius: '100px',
                              fontSize: '0.75rem',
                              fontWeight: 600,
                              color: project.color
                            }}
                          >
                            {project.category}
                          </div>
                        </div>
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            padding: '0.5rem 1rem',
                            background: 'rgba(102, 126, 234, 0.1)',
                            border: '1px solid rgba(102, 126, 234, 0.3)',
                            borderRadius: '100px',
                            color: '#667eea',
                            fontSize: '0.85rem',
                            fontWeight: 600
                          }}
                        >
                          <Eye size={14} />
                          {project.views}
                        </div>
                      </div>

                      <p
                        style={{
                          fontSize: '1rem',
                          lineHeight: 1.6,
                          color: '#a0aec0',
                          marginBottom: '1.5rem',
                          flex: 1
                        }}
                      >
                        {project.desc}
                      </p>

                      <div
                        style={{
                          display: 'flex',
                          flexWrap: 'wrap',
                          gap: '0.5rem',
                          marginBottom: '1.5rem'
                        }}
                      >
                        {project.tags.slice(0, 5).map((tag) => (
                          <span
                            key={tag}
                            style={{
                              padding: '0.4rem 0.9rem',
                              background: 'rgba(255, 255, 255, 0.05)',
                              border: '1px solid rgba(255, 255, 255, 0.1)',
                              borderRadius: '100px',
                              fontSize: '0.8rem',
                              color: '#cbd5e0',
                              fontFamily: "'JetBrains Mono', monospace"
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div style={{ display: 'flex', gap: '1rem' }}>
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="glass-button"
                            style={{
                              padding: '0.875rem 1.5rem',
                              borderRadius: '12px',
                              fontSize: '0.95rem',
                              fontWeight: 600,
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.5rem',
                              textDecoration: 'none',
                              color: '#a855f7',
                              borderColor: 'rgba(168, 85, 247, 0.3)'
                            }}
                          >
                            <Github size={18} />
                            View Code
                          </a>
                        )}
                        {project.live && (
                          <a
                            href={project.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            style={{
                              padding: '0.875rem 1.5rem',
                              borderRadius: '12px',
                              fontSize: '0.95rem',
                              fontWeight: 700,
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.5rem',
                              textDecoration: 'none',
                              background: `linear-gradient(135deg, ${project.color}, ${project.color}dd)`,
                              color: '#000',
                              border: 'none'
                            }}
                          >
                            <Rocket size={18} />
                            Live Demo
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* No Results */}
            {filteredProjects.length === 0 && (
              <div
                className="glass-card fade-in-element"
                style={{
                  padding: '5rem 2rem',
                  textAlign: 'center'
                }}
              >
                <div style={{ fontSize: '5rem', marginBottom: '1.5rem' }}>🔍</div>
                <h3
                  style={{
                    fontSize: '2rem',
                    color: '#667eea',
                    marginBottom: '1rem',
                    fontWeight: 800
                  }}
                >
                  No Projects Found
                </h3>
                <p
                  style={{
                    fontSize: '1.1rem',
                    color: '#a0aec0',
                    marginBottom: '2rem'
                  }}
                >
                  Try adjusting your search or filters
                </p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setFilter('all');
                    setProjectType('all');
                  }}
                  style={{
                    padding: '1rem 2rem',
                    background: 'linear-gradient(135deg, #667eea, #764ba2)',
                    border: 'none',
                    borderRadius: '100px',
                    color: '#fff',
                    fontWeight: 700,
                    fontSize: '1rem',
                    cursor: 'pointer',
                    transition: 'transform 0.3s'
                  }}
                  onMouseEnter={(e) => (e.target.style.transform = 'scale(1.05)')}
                  onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')}
                >
                  Reset Filters
                </button>
              </div>
            )}
          </section>

          {/* CTA Section */}
          <section
            style={{
              padding: '6rem 0',
              textAlign: 'center'
            }}
          >
            <div
              className="glass-card fade-in-element"
              style={{
                padding: 'clamp(3rem, 8vw, 5rem) clamp(2rem, 5vw, 3rem)',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.05), rgba(118, 75, 162, 0.05))',
                  pointerEvents: 'none'
                }}
              />

              <div style={{ position: 'relative', zIndex: 1 }}>
                <div
                  style={{
                    display: 'inline-block',
                    padding: '0.5rem 1.5rem',
                    background: 'rgba(102, 126, 234, 0.1)',
                    border: '1px solid rgba(102, 126, 234, 0.3)',
                    borderRadius: '100px',
                    color: '#667eea',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    marginBottom: '2rem',
                    fontFamily: "'JetBrains Mono', monospace"
                  }}
                >
                  {'<collaboration>'}
                </div>

                <h2
                  className="gradient-text"
                  style={{
                    fontSize: 'clamp(2.5rem, 7vw, 4.5rem)',
                    fontWeight: 900,
                    marginBottom: '1.5rem',
                    fontFamily: "'Space Grotesk', sans-serif"
                  }}
                >
                  Let's Build Something Amazing
                </h2>

                <p
                  style={{
                    fontSize: 'clamp(1.1rem, 2.5vw, 1.3rem)',
                    color: '#a0aec0',
                    maxWidth: '700px',
                    margin: '0 auto 3rem',
                    lineHeight: 1.7
                  }}
                >
                  From concept to deployment, I bring ideas to life with cutting-edge technology and clean architecture
                </p>

                <div
                  style={{
                    display: 'flex',
                    gap: '1.5rem',
                    justifyContent: 'center',
                    flexWrap: 'wrap'
                  }}
                >
                  <a
                    href="https://github.com/bhagavan444"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass-button hover-lift"
                    style={{
                      padding: '1.25rem 2.5rem',
                      borderRadius: '100px',
                      fontSize: '1.1rem',
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      textDecoration: 'none',
                      color: '#a855f7',
                      borderColor: 'rgba(168, 85, 247, 0.3)'
                    }}
                  >
                    <Github size={22} />
                    View All Repos
                  </a>

                  <a
                    href="mailto:g.sivasatyasaibhagavan@gmail.com"
                    style={{
                      padding: '1.25rem 2.5rem',
                      borderRadius: '100px',
                      fontSize: '1.1rem',
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      textDecoration: 'none',
                      background: 'linear-gradient(135deg, #667eea, #764ba2)',
                      color: '#fff',
                      border: 'none',
                      transition: 'all 0.3s',
                      boxShadow: '0 20px 40px rgba(102, 126, 234, 0.3)'
                    }}
                    className="hover-lift"
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = '0 25px 50px rgba(102, 126, 234, 0.5)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = '0 20px 40px rgba(102, 126, 234, 0.3)';
                    }}
                  >
                    <Mail size={22} />
                    Let's Connect
                  </a>
                </div>

                <div
                  style={{
                    marginTop: '2.5rem',
                    color: '#667eea',
                    fontSize: '0.9rem',
                    fontFamily: "'JetBrains Mono', monospace"
                  }}
                >
                  {'</collaboration>'}
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Project Detail Modal */}
      {activeProject && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.95)',
            backdropFilter: 'blur(20px)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
            animation: 'fadeInScale 0.3s ease-out',
            overflow: 'auto'
          }}
          onClick={() => setActiveProject(null)}
        >
          <div
            className="glass-card"
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: '1200px',
              width: '100%',
              maxHeight: '90vh',
              overflow: 'auto',
              position: 'relative',
              borderColor: activeProject.color
            }}
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveProject(null)}
              className="glass-button"
              style={{
                position: 'absolute',
                top: '1.5rem',
                right: '1.5rem',
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 10,
                borderColor: 'rgba(255, 0, 0, 0.5)'
              }}
            >
              <X size={24} color="#ff4444" />
            </button>

            {/* Modal Image */}
            <img
              src={activeProject.img}
              alt={activeProject.title}
              style={{
                width: '100%',
                maxHeight: '400px',
                objectFit: 'cover',
                borderRadius: '24px 24px 0 0'
              }}
            />

            {/* Modal Content */}
            <div style={{ padding: 'clamp(2rem, 5vw, 4rem)' }}>
              {/* Title & Category */}
              <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <div
                  style={{
                    display: 'inline-block',
                    padding: '0.5rem 1.5rem',
                    background: `${activeProject.color}20`,
                    border: `1px solid ${activeProject.color}40`,
                    borderRadius: '100px',
                    color: activeProject.color,
                    fontSize: '0.9rem',
                    fontWeight: 700,
                    marginBottom: '1.5rem'
                  }}
                >
                  {activeProject.category}
                </div>

                <h2
                  style={{
                    fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                    fontWeight: 900,
                    background: `linear-gradient(135deg, ${activeProject.color}, #ffffff)`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    marginBottom: '1rem',
                    fontFamily: "'Space Grotesk', sans-serif"
                  }}
                >
                  {activeProject.title}
                </h2>

                <p
                  style={{
                    fontSize: '1.2rem',
                    color: '#a0aec0',
                    lineHeight: 1.7,
                    maxWidth: '800px',
                    margin: '0 auto'
                  }}
                >
                  {activeProject.longDesc}
                </p>
              </div>

              {/* Problem & Solution */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: window.innerWidth > 768 ? '1fr 1fr' : '1fr',
                  gap: '2rem',
                  marginBottom: '3rem'
                }}
              >
                <div
                  className="glass-card"
                  style={{
                    padding: '2rem',
                    borderColor: 'rgba(239, 68, 68, 0.3)'
                  }}
                >
                  <h4
                    style={{
                      color: '#ef4444',
                      fontSize: '1.3rem',
                      fontWeight: 800,
                      marginBottom: '1rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem'
                    }}
                  >
                    <AlertCircle size={24} />
                    Problem
                  </h4>
                  <p style={{ color: '#cbd5e0', lineHeight: 1.6 }}>
                    {activeProject.problem}
                  </p>
                </div>

                <div
                  className="glass-card"
                  style={{
                    padding: '2rem',
                    borderColor: 'rgba(34, 197, 94, 0.3)'
                  }}
                >
                  <h4
                    style={{
                      color: '#22c55e',
                      fontSize: '1.3rem',
                      fontWeight: 800,
                      marginBottom: '1rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem'
                    }}
                  >
                    <Zap size={24} />
                    Solution
                  </h4>
                  <p style={{ color: '#cbd5e0', lineHeight: 1.6 }}>
                    {activeProject.solution}
                  </p>
                </div>
              </div>

              {/* My Role */}
              <div
                className="glass-card"
                style={{
                  padding: '2rem',
                  marginBottom: '3rem',
                  borderColor: `${activeProject.color}40`
                }}
              >
                <h4
                  style={{
                    color: activeProject.color,
                    fontSize: '1.3rem',
                    fontWeight: 800,
                    marginBottom: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem'
                  }}
                >
                  <Users size={24} />
                  My Role
                </h4>
                <p style={{ color: '#cbd5e0', lineHeight: 1.7 }}>
                  {activeProject.myRole}
                </p>
              </div>

              {/* Tech Stack */}
              <div style={{ marginBottom: '3rem' }}>
                <h4
                  style={{
                    fontSize: '1.5rem',
                    fontWeight: 800,
                    color: activeProject.color,
                    marginBottom: '1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem'
                  }}
                >
                  <Code size={26} />
                  Technology Stack
                </h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                  {activeProject.techUsed.map((tech) => (
                    <span
                      key={tech}
                      className="glass-card"
                      style={{
                        padding: '0.75rem 1.5rem',
                        borderColor: `${activeProject.color}40`,
                        color: activeProject.color,
                        fontSize: '0.95rem',
                        fontWeight: 600,
                        fontFamily: "'JetBrains Mono', monospace"
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Impact */}
              <div style={{ marginBottom: '3rem' }}>
                <h4
                  style={{
                    fontSize: '1.5rem',
                    fontWeight: 800,
                    color: '#ffd700',
                    marginBottom: '1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem'
                  }}
                >
                  <Trophy size={26} />
                  Impact & Results
                </h4>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '1rem'
                  }}
                >
                  {activeProject.impact.map((item, idx) => (
                    <div
                      key={idx}
                      className="glass-card"
                      style={{
                        padding: '1.5rem',
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '1rem',
                        borderColor: 'rgba(255, 215, 0, 0.2)'
                      }}
                    >
                      <CheckCircle2 size={20} style={{ color: '#ffd700', flexShrink: 0 }} />
                      <span style={{ color: '#cbd5e0', lineHeight: 1.6 }}>
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '1.5rem',
                  justifyContent: 'center',
                  marginBottom: '3rem'
                }}
              >
                {Object.entries(activeProject.stats).map(([key, value]) => (
                  <div
                    key={key}
                    className="glass-card"
                    style={{
                      padding: '1.5rem 2rem',
                      minWidth: '160px',
                      textAlign: 'center',
                      borderColor: `${activeProject.color}40`
                    }}
                  >
                    <div
                      style={{
                        fontSize: '2rem',
                        fontWeight: 900,
                        color: activeProject.color,
                        marginBottom: '0.5rem',
                        fontFamily: "'Space Grotesk', sans-serif"
                      }}
                    >
                      {value}
                    </div>
                    <div
                      style={{
                        fontSize: '0.85rem',
                        color: '#a0aec0',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px'
                      }}
                    >
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </div>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div
                style={{
                  display: 'flex',
                  gap: '1.5rem',
                  justifyContent: 'center',
                  flexWrap: 'wrap'
                }}
              >
                {activeProject.github && (
                  <a
                    href={activeProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass-button hover-lift"
                    style={{
                      padding: '1.25rem 2.5rem',
                      borderRadius: '100px',
                      fontSize: '1.1rem',
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      textDecoration: 'none',
                      color: '#a855f7',
                      borderColor: 'rgba(168, 85, 247, 0.3)'
                    }}
                  >
                    <Github size={22} />
                    View Source Code
                  </a>
                )}
                {activeProject.live && (
                  <a
                    href={activeProject.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover-lift"
                    style={{
                      padding: '1.25rem 2.5rem',
                      borderRadius: '100px',
                      fontSize: '1.1rem',
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      textDecoration: 'none',
                      background: `linear-gradient(135deg, ${activeProject.color}, ${activeProject.color}dd)`,
                      color: '#000',
                      border: 'none',
                      boxShadow: `0 20px 40px rgba(${activeProject.glowRGB}, 0.3)`
                    }}
                  >
                    <Rocket size={22} />
                    Launch Live Demo
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}