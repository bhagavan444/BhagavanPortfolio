"use client";
import React, { useState, useEffect, useRef } from 'react';
import {
  ExternalLink, Github, Rocket, Star, X, CheckCircle2,
  Terminal, Sparkles, Layers, Mail, Award, Brain, Cpu,
  Code, Zap, Cloud, Database, Server, Globe, Heart,
  Trophy, Briefcase, GraduationCap, Users, Search, Filter,
  Grid, List, TrendingUp, Eye, Download, Share2, AlertCircle
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
    color: "#00f0ff",
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
    color: "#a78bfa",
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
    color: "#ff61d2",
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
    color: "#00f0ff",
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
    color: "#a78bfa",
    featured: true,
    views: "22.8k",
    downloads: "6.7k"
  },
  {
  id: 9,
  title: "CareerCompass AI – Career Path Recommendation System",
  github: "https://github.com/bhagavan444/Career-Path-Recommendation",
  live: null,
  desc: "AI-powered career guidance platform that recommends personalized career paths based on skills, interests, and aptitude.",
  longDesc: "Developed an intelligent recommendation system using Machine Learning ...",
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
    color: "#ff61d2",
    featured: false,
    views: "9.4k",
    downloads: "2.1k"
  }
];

export default function CyberpunkProjects() {
  const [activeProject, setActiveProject] = useState(null);
  const [hoveredId, setHoveredId] = useState(null);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('featured');
  const [showStats, setShowStats] = useState(true);
  const canvasRef = useRef(null);

  const categories = ['all', ...new Set(allProjects.map(p => p.category))];

  const filteredProjects = allProjects
    .filter(p => filter === 'all' || p.category === filter)
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

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let id;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const particles = Array.from({ length: 80 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      size: Math.random() * 3 + 1
    }));

    const animate = () => {
      ctx.fillStyle = 'rgba(0,0,0,0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 8);
        g.addColorStop(0, 'rgba(0,240,255,0.5)');
        g.addColorStop(0.5, 'rgba(167,139,250,0.3)');
        g.addColorStop(1, 'transparent');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 8, 0, Math.PI * 2);
        ctx.fill();
      });

      id = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Fira+Code:wght@400;500;600&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        :root {
          --neon-cyan: #00f0ff;
          --neon-purple: #a78bfa;
          --neon-pink: #ff61d2;
          --neon-gradient: linear-gradient(135deg, #00f0ff, #a78bfa, #ff61d2);
        }
        @keyframes slideIn { from { opacity:0; transform:translateY(60px); } to { opacity:1; transform:translateY(0); } }
        @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
        @keyframes float { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-12px); } }
        @keyframes pulse { 0%,100% { opacity:1; transform:scale(1); } 50% { opacity:0.8; transform:scale(1.03); } }
        @keyframes shimmer { 0% { background-position:-1000px 0; } 100% { background-position:1000px 0; } }
        @keyframes glow { 0%,100% { box-shadow:0 0 20px rgba(0,240,255,0.4); } 50% { box-shadow:0 0 40px rgba(0,240,255,0.8); } }
        @keyframes rotate3d { from { transform:perspective(1200px) rotateY(0deg); } to { transform:perspective(1200px) rotateY(360deg); } }
        @keyframes scan { 0% { transform:translateY(-100%); } 100% { transform:translateY(100%); } }
        .project-card {
          position: relative;
          background: linear-gradient(135deg, rgba(10,10,35,0.95), rgba(20,20,50,0.92));
          border: 2.5px solid rgba(0,240,255,0.35);
          border-radius: 24px;
          overflow: hidden;
          transition: all 0.6s cubic-bezier(0.23,1,0.32,1);
          backdrop-filter: blur(25px);
          transform-style: preserve-3d;
          cursor: pointer;
        }
        .project-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, transparent 30%, rgba(0,240,255,0.12) 50%, transparent 70%);
          animation: scan 8s linear infinite;
          pointer-events: none;
          z-index: 1;
        }
        .project-card::after {
          content: '';
          position: absolute;
          inset: -2px;
          background: var(--neon-gradient);
          border-radius: 24px;
          opacity: 0;
          transition: opacity 0.5s;
          z-index: -1;
        }
        .project-card.featured {
          border-width: 3.5px;
          box-shadow: 0 0 50px rgba(0,240,255,0.4), inset 0 0 80px rgba(0,240,255,0.08);
          background: linear-gradient(135deg, rgba(15,15,45,0.97), rgba(25,25,60,0.95));
        }
        .project-card:hover {
          transform: translateY(-20px) scale(1.05) rotateX(3deg);
          border-color: var(--neon-cyan);
          box-shadow: 0 25px 80px rgba(0,240,255,0.5), 0 0 100px rgba(167,139,250,0.3);
        }
        .project-card:hover::after {
          opacity: 0.15;
        }
        .tech-pill {
          background: rgba(0,0,0,0.7);
          border: 2px solid var(--neon-cyan);
          padding: 0.55rem 1.1rem;
          border-radius: 999px;
          font-family: 'Fira Code', monospace;
          font-size: 0.85rem;
          font-weight: 500;
          transition: all 0.4s;
          color: #d0f0ff;
          white-space: nowrap;
        }
        .tech-pill:hover {
          transform: scale(1.1) translateY(-3px);
          box-shadow: 0 0 30px var(--neon-cyan);
          background: rgba(0,240,255,0.15);
        }
        .action-btn {
          padding: 1rem 2rem;
          border-radius: 999px;
          font-weight: 700;
          font-size: 1.05rem;
          display: inline-flex;
          align-items: center;
          gap: 0.9rem;
          transition: all 0.4s cubic-bezier(0.23,1,0.32,1);
          text-decoration: none;
          position: relative;
          overflow: hidden;
        }
        .action-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
          transform: translateX(-100%);
          transition: transform 0.6s;
        }
        .action-btn:hover::before {
          transform: translateX(100%);
        }
        .action-btn:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 40px rgba(0,240,255,0.5);
        }
        .filter-btn {
          padding: 0.8rem 1.8rem;
          border: 2px solid rgba(0,240,255,0.3);
          background: rgba(0,0,0,0.5);
          color: #b0d0e0;
          border-radius: 999px;
          cursor: pointer;
          transition: all 0.4s;
          font-family: 'Fira Code', monospace;
          font-weight: 600;
          font-size: 0.95rem;
        }
        .filter-btn:hover {
          border-color: var(--neon-cyan);
          background: rgba(0,240,255,0.1);
          color: var(--neon-cyan);
          transform: translateY(-3px);
        }
        .filter-btn.active {
          background: var(--neon-gradient);
          border-color: transparent;
          color: #000;
          font-weight: 800;
          box-shadow: 0 0 30px rgba(0,240,255,0.6);
        }
        .search-input {
          width: 100%;
          max-width: 600px;
          padding: 1.2rem 1.8rem 1.2rem 3.5rem;
          background: rgba(0,0,0,0.6);
          border: 2px solid rgba(0,240,255,0.35);
          border-radius: 999px;
          color: #fff;
          font-size: 1.05rem;
          font-family: 'Outfit', sans-serif;
          transition: all 0.4s;
          outline: none;
        }
        .search-input:focus {
          border-color: var(--neon-cyan);
          box-shadow: 0 0 40px rgba(0,240,255,0.4);
          background: rgba(0,0,0,0.8);
        }
        .stat-card {
          background: linear-gradient(135deg, rgba(0,240,255,0.08), rgba(167,139,250,0.08));
          border: 2px solid rgba(0,240,255,0.3);
          border-radius: 20px;
          padding: 2rem;
          text-align: center;
          transition: all 0.5s;
          backdrop-filter: blur(20px);
        }
        .stat-card:hover {
          transform: translateY(-8px);
          border-color: var(--neon-cyan);
          box-shadow: 0 15px 50px rgba(0,240,255,0.3);
        }
        .modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.95);
          backdrop-filter: blur(20px);
          z-index: 9999;
          display: flex;
          alignItems: center;
          justify-content: center;
          padding: 1.5rem;
          animation: fadeIn 0.3s ease-out;
        }
        .modal-content {
          background: linear-gradient(135deg, rgba(10,10,40,0.98), rgba(20,20,55,0.96));
          border: 4px solid var(--neon-cyan);
          border-radius: 32px;
          max-width: 1400px;
          width: 100%;
          max-height: 94vh;
          overflow-y: auto;
          box-shadow: 0 0 150px rgba(0,240,255,0.6);
          animation: slideIn 0.5s cubic-bezier(0.23,1,0.32,1);
          position: relative;
        }
        .modal-content::-webkit-scrollbar {
          width: 12px;
        }
        .modal-content::-webkit-scrollbar-track {
          background: rgba(0,0,0,0.3);
          border-radius: 10px;
        }
        .modal-content::-webkit-scrollbar-thumb {
          background: var(--neon-gradient);
          border-radius: 10px;
        }
        @media (max-width: 1200px) {
          .projects-grid { grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)) !important; }
        }
        @media (max-width: 768px) {
          .projects-grid { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
          .search-input { font-size: 1rem; padding: 1rem 1.5rem 1rem 3rem; }
          .filter-btn { padding: 0.7rem 1.4rem; font-size: 0.88rem; }
          .modal-content { max-height: 96vh; border-radius: 24px; }
        }
        @media (max-width: 480px) {
          .project-card { border-radius: 20px; }
          .tech-pill { font-size: 0.8rem; padding: 0.5rem 0.9rem; }
          .action-btn { padding: 0.85rem 1.6rem; font-size: 0.95rem; }
        }
      `}</style>

      <div style={{
        minHeight: '100vh',
        background: '#000',
        color: '#e8e8ff',
        position: 'relative',
        overflow: 'hidden',
        padding: 'clamp(4rem, 10vw, 8rem) clamp(1rem, 4vw, 2rem) 5rem',
        fontFamily: "'Outfit', sans-serif"
      }}>
        {/* Animated Grid Background */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'linear-gradient(rgba(0,240,255,0.06) 1.5px, transparent 1.5px), linear-gradient(90deg, rgba(0,240,255,0.06) 1.5px, transparent 1.5px)',
          backgroundSize: '60px 60px',
          opacity: 0.25,
          pointerEvents: 'none'
        }} />

        {/* Particle Canvas */}
        <canvas ref={canvasRef} style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 1
        }} />

        <div style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: '1700px',
          margin: '0 auto',
          width: '100%'
        }}>
          {/* Hero Header */}
          <div style={{
            textAlign: 'center',
            marginBottom: 'clamp(3rem, 8vw, 5rem)'
          }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '1rem',
              fontFamily: "'Fira Code', monospace",
              color: '#00f0ff',
              fontSize: 'clamp(0.95rem, 2.5vw, 1.1rem)',
              padding: '0.9rem 2rem',
              border: '2px solid rgba(0,240,255,0.5)',
              borderRadius: '999px',
              marginBottom: '2rem',
              animation: 'pulse 4s infinite',
              background: 'rgba(0,240,255,0.05)'
            }}>
              <Sparkles size={22} />
              {'>'} ELITE_PORTFOLIO.initialize()
            </div>

            <h1 style={{
              fontSize: 'clamp(3.5rem, 10vw, 8rem)',
              fontWeight: 900,
              background: 'linear-gradient(135deg, #00f0ff, #a78bfa, #ff61d2)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '6px',
              textTransform: 'uppercase',
              lineHeight: 1.1,
              marginBottom: '1.5rem',
              textShadow: '0 0 80px rgba(0,240,255,0.5)'
            }}>
              PROJECT SHOW CASE
            </h1>

            <p style={{
              fontSize: 'clamp(1.15rem, 3vw, 1.45rem)',
              color: '#a0b5c5',
              maxWidth: '900px',
              margin: '0 auto',
              lineHeight: 1.9,
              fontFamily: "'Fira Code', monospace",
              letterSpacing: '0.5px'
            }}>
              [ AI-Powered Systems • Full-Stack Innovation • Production Deployments ]<br/>
              <span style={{ color: '#00f0ff' }}>Building the future, one line at a time</span>
            </p>
          </div>

          {/* Stats Dashboard */}
          {showStats && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1.5rem',
              marginBottom: '4rem',
              animation: 'slideIn 0.8s ease-out 0.3s backwards'
            }}>
              <div className="stat-card">
                <div style={{
                  fontSize: '3rem',
                  marginBottom: '0.5rem',
                  animation: 'float 3s infinite'
                }}>🚀</div>
                <div style={{
                  fontSize: '2.5rem',
                  fontWeight: 900,
                  color: '#00f0ff',
                  marginBottom: '0.5rem'
                }}>
                  {allProjects.length}
                </div>
                <div style={{
                  color: '#8899aa',
                  fontSize: '1.05rem',
                  fontWeight: 600
                }}>
                  Elite Projects
                </div>
              </div>

              <div className="stat-card">
                <div style={{
                  fontSize: '3rem',
                  marginBottom: '0.5rem',
                  animation: 'float 3s infinite 0.5s'
                }}>👁️</div>
                <div style={{
                  fontSize: '2.5rem',
                  fontWeight: 900,
                  color: '#a78bfa',
                  marginBottom: '0.5rem'
                }}>
                  {totalViews.toFixed(1)}k
                </div>
                <div style={{
                  color: '#8899aa',
                  fontSize: '1.05rem',
                  fontWeight: 600
                }}>
                  Total Views
                </div>
              </div>

              <div className="stat-card">
                <div style={{
                  fontSize: '3rem',
                  marginBottom: '0.5rem',
                  animation: 'float 3s infinite 1s'
                }}>⬇️</div>
                <div style={{
                  fontSize: '2.5rem',
                  fontWeight: 900,
                  color: '#ff61d2',
                  marginBottom: '0.5rem'
                }}>
                  {totalDownloads.toFixed(1)}k
                </div>
                <div style={{
                  color: '#8899aa',
                  fontSize: '1.05rem',
                  fontWeight: 600
                }}>
                  Downloads
                </div>
              </div>

              <div className="stat-card">
                <div style={{
                  fontSize: '3rem',
                  marginBottom: '0.5rem',
                  animation: 'float 3s infinite 1.5s'
                }}>⭐</div>
                <div style={{
                  fontSize: '2.5rem',
                  fontWeight: 900,
                  color: '#00f0ff',
                  marginBottom: '0.5rem'
                }}>
                  {allProjects.filter(p => p.featured).length}
                </div>
                <div style={{
                  color: '#8899aa',
                  fontSize: '1.05rem',
                  fontWeight: 600
                }}>
                  Featured
                </div>
              </div>
            </div>
          )}

          {/* Search & Filters */}
          <div style={{
            marginBottom: '4rem',
            animation: 'slideIn 0.9s ease-out 0.4s backwards'
          }}>
            <div style={{
              position: 'relative',
              maxWidth: '600px',
              margin: '0 auto 2.5rem'
            }}>
              <Search
                size={22}
                style={{
                  position: 'absolute',
                  left: '1.5rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#00f0ff',
                  pointerEvents: 'none'
                }}
              />
              <input
                type="text"
                placeholder="Search projects, tech, categories..."
                className="search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div style={{
              display: 'flex',
              justifyContent: 'center',
              flexWrap: 'wrap',
              gap: '1.2rem',
              marginBottom: '2rem'
            }}>
              {categories.map(cat => (
                <button
                  key={cat}
                  className={`filter-btn ${filter === cat ? 'active' : ''}`}
                  onClick={() => setFilter(cat)}
                >
                  {cat === 'all' ? '🌐 All Projects' : cat}
                </button>
              ))}
            </div>

            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '1rem',
              flexWrap: 'wrap'
            }}>
              <button
                className="filter-btn"
                style={{
                  background: sortBy === 'featured' ? 'rgba(0,240,255,0.2)' : 'rgba(0,0,0,0.5)',
                  borderColor: sortBy === 'featured' ? '#00f0ff' : 'rgba(0,240,255,0.3)'
                }}
                onClick={() => setSortBy('featured')}
              >
                <Star size={18} style={{ display: 'inline', marginRight: '0.5rem' }} />
                Featured First
              </button>

              <button
                className="filter-btn"
                style={{
                  background: sortBy === 'views' ? 'rgba(0,240,255,0.2)' : 'rgba(0,0,0,0.5)',
                  borderColor: sortBy === 'views' ? '#00f0ff' : 'rgba(0,240,255,0.3)'
                }}
                onClick={() => setSortBy('views')}
              >
                <TrendingUp size={18} style={{ display: 'inline', marginRight: '0.5rem' }} />
                Most Viewed
              </button>
            </div>
          </div>

          {/* Results Count */}
          <div style={{
            textAlign: 'center',
            marginBottom: '2.5rem',
            fontFamily: "'Fira Code', monospace",
            fontSize: '1.1rem',
            color: '#00f0ff'
          }}>
            {'>'} {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''} found
          </div>

          {/* Projects Grid */}
          <div className="projects-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))',
            gap: 'clamp(2.5rem, 5vw, 4rem)',
            width: '100%',
            marginBottom: '5rem'
          }}>
            {filteredProjects.map((project, idx) => {
              const isHovered = hoveredId === project.id;

              return (
                <div
                  key={project.id}
                  className={`project-card ${project.featured ? 'featured' : ''}`}
                  onMouseEnter={() => setHoveredId(project.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onClick={() => setActiveProject(project)}
                  style={{
                    animation: `slideIn 0.7s ease-out ${idx * 0.1}s backwards`
                  }}
                >
                  {/* Project Image */}
                  <div style={{
                    height: project.featured ? 'clamp(240px, 50vw, 300px)' : 'clamp(200px, 45vw, 260px)',
                    overflow: 'hidden',
                    position: 'relative'
                  }}>
                    <img
                      src={project.img}
                      alt={project.title}
                      onError={e => e.target.src = "https://via.placeholder.com/600x350/0a0a23/00f0ff?text=Elite+Project"}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.8s cubic-bezier(0.23,1,0.32,1)',
                        transform: isHovered ? 'scale(1.15)' : 'scale(1.05)'
                      }}
                    />

                    {/* Gradient Overlay */}
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.3) 50%, transparent 100%)'
                    }} />

                    {/* Featured Badge */}
                    {project.featured && (
                      <div style={{
                        position: 'absolute',
                        top: '1.5rem',
                        right: '1.5rem',
                        padding: '0.7rem 1.5rem',
                        background: 'linear-gradient(135deg, rgba(255,215,0,0.25), rgba(255,165,0,0.25))',
                        border: '2px solid #ffd700',
                        borderRadius: '999px',
                        color: '#ffd700',
                        fontWeight: 800,
                        fontSize: '0.95rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.6rem',
                        backdropFilter: 'blur(10px)',
                        animation: 'glow 2s infinite'
                      }}>
                        <Star size={18} fill="#ffd700" />
                        FEATURED
                      </div>
                    )}

                    {/* Stats Overlay */}
                    <div style={{
                      position: 'absolute',
                      bottom: '1rem',
                      left: '1rem',
                      right: '1rem',
                      display: 'flex',
                      justifyContent: 'space-between',
                      gap: '1rem',
                      zIndex: 2
                    }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.5rem 1rem',
                        background: 'rgba(0,0,0,0.7)',
                        borderRadius: '999px',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(0,240,255,0.3)',
                        fontSize: '0.9rem',
                        color: '#00f0ff'
                      }}>
                        <Eye size={16} />
                        {project.views}
                      </div>

                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.5rem 1rem',
                        background: 'rgba(0,0,0,0.7)',
                        borderRadius: '999px',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(167,139,250,0.3)',
                        fontSize: '0.9rem',
                        color: '#a78bfa'
                      }}>
                        <Download size={16} />
                        {project.downloads}
                      </div>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div style={{
                    padding: 'clamp(1.8rem, 4vw, 2.5rem) clamp(1.5rem, 3.5vw, 2.2rem)',
                    position: 'relative',
                    zIndex: 2
                  }}>
                    {/* Title & Icon */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '1.5rem',
                      marginBottom: '1.5rem'
                    }}>
                      <div style={{
                        width: '80px',
                        height: '80px',
                        flexShrink: 0,
                        border: `3px solid ${project.color}`,
                        borderRadius: '18px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '3rem',
                        background: `linear-gradient(135deg, ${project.color}15, ${project.color}05)`,
                        animation: isHovered ? 'float 2.5s infinite' : 'none',
                        boxShadow: isHovered ? `0 0 50px ${project.color}60` : '0 0 20px rgba(0,0,0,0.3)',
                        transition: 'all 0.5s'
                      }}>
                        {project.icon}
                      </div>

                      <div style={{ flex: 1 }}>
                        <h3 style={{
                          fontSize: 'clamp(1.6rem, 4vw, 1.9rem)',
                          fontWeight: 800,
                          lineHeight: 1.3,
                          color: '#ffffff',
                          marginBottom: '0.8rem'
                        }}>
                          {project.title}
                        </h3>

                        <div style={{
                          display: 'inline-block',
                          padding: '0.4rem 1rem',
                          background: `${project.color}20`,
                          border: `1.5px solid ${project.color}60`,
                          borderRadius: '999px',
                          fontSize: '0.85rem',
                          fontWeight: 700,
                          color: project.color,
                          fontFamily: "'Fira Code', monospace"
                        }}>
                          {project.category}
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <p style={{
                      fontSize: '1.05rem',
                      lineHeight: 1.7,
                      color: '#b8c5d5',
                      marginBottom: '2rem'
                    }}>
                      {project.desc}
                    </p>

                    {/* Tags */}
                    <div style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '0.8rem',
                      marginBottom: '2rem'
                    }}>
                      {project.tags.slice(0, 4).map(tag => (
                        <span
                          key={tag}
                          className="tech-pill"
                          style={{
                            borderColor: isHovered ? project.color : 'rgba(0,240,255,0.4)',
                            color: isHovered ? project.color : '#b0d0e0'
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div style={{
                      display: 'flex',
                      gap: '1.2rem',
                      flexWrap: 'wrap'
                    }}>
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={e => e.stopPropagation()}
                          className="action-btn"
                          style={{
                            flex: project.live ? '0 1 auto' : '1',
                            background: 'rgba(0,240,255,0.15)',
                            border: `2.5px solid ${project.color}70`,
                            color: project.color
                          }}
                        >
                          <Github size={22} />
                          Code
                        </a>
                      )}

                      {project.live && (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={e => e.stopPropagation()}
                          className="action-btn"
                          style={{
                            flex: 1,
                            background: `linear-gradient(135deg, ${project.color}, #ffffff)`,
                            color: '#000',
                            fontWeight: 900,
                            boxShadow: `0 0 40px ${project.color}50`
                          }}
                        >
                          <Rocket size={22} />
                          Live Demo
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* No Results */}
          {filteredProjects.length === 0 && (
            <div style={{
              textAlign: 'center',
              padding: '5rem 2rem',
              animation: 'fadeIn 0.5s ease-out'
            }}>
              <div style={{ fontSize: '5rem', marginBottom: '1.5rem' }}>🔍</div>
              <h3 style={{
                fontSize: '2rem',
                color: '#00f0ff',
                marginBottom: '1rem',
                fontWeight: 800
              }}>
                No Projects Found
              </h3>
              <p style={{
                fontSize: '1.2rem',
                color: '#8899aa',
                maxWidth: '500px',
                margin: '0 auto'
              }}>
                Try adjusting your search or filters to find what you're looking for.
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setFilter('all');
                }}
                style={{
                  marginTop: '2rem',
                  padding: '1rem 2.5rem',
                  background: 'linear-gradient(135deg, #00f0ff, #a78bfa, #ff61d2)',
                  border: 'none',
                  borderRadius: '999px',
                  color: '#000',
                  fontWeight: 800,
                  fontSize: '1.1rem',
                  cursor: 'pointer',
                  transition: 'transform 0.3s'
                }}
                onMouseEnter={e => e.target.style.transform = 'scale(1.05)'}
                onMouseLeave={e => e.target.style.transform = 'scale(1)'}
              >
                Reset Filters
              </button>
            </div>
          )}

          {/* CTA Section */}
          <div style={{
            marginTop: '8rem',
            padding: 'clamp(3.5rem, 8vw, 5rem) clamp(2rem, 5vw, 3rem)',
            background: 'linear-gradient(135deg, rgba(0,240,255,0.08), rgba(167,139,250,0.08))',
            border: '3px solid rgba(0,240,255,0.4)',
            borderRadius: '36px',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
            animation: 'slideIn 1s ease-out 0.5s backwards'
          }}>
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(135deg, transparent 30%, rgba(0,240,255,0.08) 50%, transparent 70%)',
              animation: 'scan 10s linear infinite',
              pointerEvents: 'none'
            }} />

            <div style={{
              position: 'relative',
              zIndex: 1
            }}>
              <h2 style={{
                fontSize: 'clamp(2.8rem, 7vw, 5.5rem)',
                fontWeight: 900,
                background: 'linear-gradient(135deg, #00f0ff, #a78bfa, #ff61d2)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: '2rem',
                textShadow: '0 0 80px rgba(0,240,255,0.5)',
                letterSpacing: '2px'
              }}>
                READY TO COLLABORATE?
              </h2>

              <p style={{
                fontSize: 'clamp(1.15rem, 3vw, 1.4rem)',
                color: '#a0b5c5',
                maxWidth: '800px',
                margin: '0 auto 3.5rem',
                lineHeight: 1.8,
                fontFamily: "'Fira Code', monospace"
              }}>
                Let's build something extraordinary together. <br/>
                From concept to deployment, I bring ideas to life.
              </p>

              <div style={{
                display: 'flex',
                gap: '2rem',
                justifyContent: 'center',
                flexWrap: 'wrap'
              }}>
                <a
                  href="https://github.com/bhagavan444"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="action-btn"
                  style={{
                    padding: '1.4rem 3.5rem',
                    background: 'rgba(0,240,255,0.18)',
                    border: '3px solid rgba(0,240,255,0.7)',
                    color: '#00f0ff',
                    fontSize: '1.25rem'
                  }}
                >
                  <Github size={32} />
                  View All Repositories
                </a>

                <a
                  href="mailto:g.sivasatyasaibhagavan@gmail.com"
                  className="action-btn"
                  style={{
                    padding: '1.4rem 3.5rem',
                    background: 'linear-gradient(135deg, #00f0ff, #a78bfa, #ff61d2)',
                    border: 'none',
                    color: '#000',
                    fontSize: '1.25rem',
                    fontWeight: 900
                  }}
                >
                  <Mail size={32} />
                  Let's Connect
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Project Detail Modal */}
      {activeProject && (
        <div
          className="modal-backdrop"
          onClick={() => setActiveProject(null)}
        >
          <div
            className="modal-content"
            onClick={e => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveProject(null)}
              style={{
                position: 'absolute',
                top: '2rem',
                right: '2rem',
                background: 'rgba(255,0,0,0.2)',
                border: '2px solid #ff4444',
                borderRadius: '50%',
                width: '60px',
                height: '60px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s',
                zIndex: 10
              }}
              onMouseEnter={e => {
                e.target.style.background = '#ff4444';
                e.target.style.transform = 'scale(1.1) rotate(90deg)';
              }}
              onMouseLeave={e => {
                e.target.style.background = 'rgba(255,0,0,0.2)';
                e.target.style.transform = 'scale(1) rotate(0deg)';
              }}
            >
              <X size={32} color="#fff" strokeWidth={3} />
            </button>

            {/* Modal Image */}
            <img
              src={activeProject.img}
              alt={activeProject.title}
              style={{
                width: '100%',
                maxHeight: '45vh',
                objectFit: 'cover',
                borderRadius: '28px 28px 0 0',
                display: 'block'
              }}
            />

            {/* Modal Content */}
            <div style={{
              padding: 'clamp(2.5rem, 6vw, 4.5rem) clamp(2rem, 5vw, 4rem) 5rem'
            }}>
              {/* Title & Category */}
              <div style={{
                textAlign: 'center',
                marginBottom: '3rem'
              }}>
                <div style={{
                  display: 'inline-block',
                  padding: '0.6rem 1.5rem',
                  background: `${activeProject.color}20`,
                  border: `2px solid ${activeProject.color}`,
                  borderRadius: '999px',
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  color: activeProject.color,
                  marginBottom: '1.5rem',
                  fontFamily: "'Fira Code', monospace"
                }}>
                  {activeProject.category}
                </div>

                <h2 style={{
                  fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                  fontWeight: 900,
                  background: 'linear-gradient(135deg, #00f0ff, #a78bfa, #ff61d2)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  marginBottom: '1.5rem',
                  letterSpacing: '2px'
                }}>
                  {activeProject.title}
                </h2>

                <p style={{
                  fontSize: 'clamp(1.2rem, 3vw, 1.5rem)',
                  color: '#b8c5d5',
                  lineHeight: 1.8,
                  maxWidth: '900px',
                  margin: '0 auto'
                }}>
                  {activeProject.longDesc}
                </p>
              </div>

              {/* Problem & Solution Grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: window.innerWidth > 768 ? '1fr 1fr' : '1fr',
                gap: '2.5rem',
                marginBottom: '3.5rem'
              }}>
                <div style={{
                  padding: '2rem',
                  background: 'rgba(255,0,0,0.08)',
                  borderRadius: '20px',
                  border: '2px solid rgba(255,100,100,0.3)'
                }}>
                  <h4 style={{
                    color: '#ff6666',
                    fontSize: '1.6rem',
                    fontWeight: 800,
                    marginBottom: '1.2rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.8rem'
                  }}>
                    <AlertCircle size={28} />
                    Problem
                  </h4>
                  <p style={{
                    color: '#ffcccc',
                    fontSize: '1.1rem',
                    lineHeight: 1.7
                  }}>
                    {activeProject.problem}
                  </p>
                </div>

                <div style={{
                  padding: '2rem',
                  background: 'rgba(0,255,0,0.08)',
                  borderRadius: '20px',
                  border: '2px solid rgba(0,200,0,0.3)'
                }}>
                  <h4 style={{
                    color: '#00cc00',
                    fontSize: '1.6rem',
                    fontWeight: 800,
                    marginBottom: '1.2rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.8rem'
                  }}>
                    <Zap size={28} />
                    Solution
                  </h4>
                  <p style={{
                    color: '#ccffcc',
                    fontSize: '1.1rem',
                    lineHeight: 1.7
                  }}>
                    {activeProject.solution}
                  </p>
                </div>
              </div>

              {/* My Role */}
              <div style={{
                padding: '2rem',
                background: 'rgba(0,240,255,0.08)',
                borderRadius: '20px',
                border: `2px solid ${activeProject.color}50`,
                marginBottom: '3.5rem'
              }}>
                <h4 style={{
                  color: activeProject.color,
                  fontSize: '1.6rem',
                  fontWeight: 800,
                  marginBottom: '1.2rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.8rem'
                }}>
                  <Users size={28} />
                  My Role
                </h4>
                <p style={{
                  color: '#e0e0ff',
                  fontSize: '1.1rem',
                  lineHeight: 1.8
                }}>
                  {activeProject.myRole}
                </p>
              </div>

              {/* Tech Stack */}
              <div style={{ marginBottom: '3.5rem' }}>
                <h4 style={{
                  fontSize: '1.8rem',
                  fontWeight: 800,
                  color: activeProject.color,
                  marginBottom: '1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.8rem'
                }}>
                  <Code size={30} />
                  Technology Stack
                </h4>
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '1rem'
                }}>
                  {activeProject.techUsed.map(tech => (
                    <span
                      key={tech}
                      className="tech-pill"
                      style={{
                        background: `${activeProject.color}20`,
                        borderColor: activeProject.color,
                        color: activeProject.color,
                        fontSize: '1rem',
                        padding: '0.7rem 1.4rem'
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Impact */}
              <div style={{ marginBottom: '3.5rem' }}>
                <h4 style={{
                  fontSize: '1.8rem',
                  fontWeight: 800,
                  color: '#ffd700',
                  marginBottom: '1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.8rem'
                }}>
                  <Trophy size={30} />
                  Impact & Results
                </h4>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: window.innerWidth > 768 ? 'repeat(auto-fit, minmax(300px, 1fr))' : '1fr',
                  gap: '1.5rem'
                }}>
                  {activeProject.impact.map((item, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '1rem',
                        padding: '1.5rem',
                        background: 'rgba(255,215,0,0.08)',
                        borderRadius: '16px',
                        border: '2px solid rgba(255,215,0,0.3)'
                      }}
                    >
                      <CheckCircle2
                        size={24}
                        style={{
                          color: '#ffd700',
                          flexShrink: 0,
                          marginTop: '0.2rem'
                        }}
                      />
                      <span style={{
                        color: '#ffffcc',
                        fontSize: '1.05rem',
                        lineHeight: 1.6
                      }}>
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Highlights */}
              <div style={{ marginBottom: '3.5rem' }}>
                <h4 style={{
                  fontSize: '1.8rem',
                  fontWeight: 800,
                  color: activeProject.color,
                  marginBottom: '1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.8rem'
                }}>
                  <Layers size={30} />
                  Key Highlights
                </h4>
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '1rem'
                }}>
                  {activeProject.highlights.map((highlight, idx) => (
                    <div
                      key={idx}
                      style={{
                        padding: '0.8rem 1.6rem',
                        background: `${activeProject.color}15`,
                        border: `2px solid ${activeProject.color}40`,
                        borderRadius: '999px',
                        color: activeProject.color,
                        fontWeight: 600
                      }}
                    >
                      {highlight}
                    </div>
                  ))}
                </div>
              </div>

              {/* Stats Grid */}
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '2rem',
                justifyContent: 'center',
                marginBottom: '3.5rem'
              }}>
                {Object.entries(activeProject.stats).map(([key, value]) => (
                  <div
                    key={key}
                    style={{
                      padding: '1.5rem 2.5rem',
                      background: `${activeProject.color}15`,
                      border: `2px solid ${activeProject.color}40`,
                      borderRadius: '16px',
                      minWidth: '180px',
                      textAlign: 'center'
                    }}
                  >
                    <div style={{
                      fontSize: '2.2rem',
                      fontWeight: 900,
                      color: activeProject.color,
                      marginBottom: '0.5rem'
                    }}>
                      {value}
                    </div>
                    <div style={{
                      fontSize: '1rem',
                      color: '#b8c5d5',
                      textTransform: 'uppercase',
                      letterSpacing: '1px'
                    }}>
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </div>
                  </div>
                ))}
              </div>

              {/* Action Buttons in Modal */}
              <div style={{
                display: 'flex',
                gap: '2rem',
                justifyContent: 'center',
                flexWrap: 'wrap',
                marginTop: '3rem'
              }}>
                {activeProject.github && (
                  <a
                    href={activeProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="action-btn"
                    style={{
                      background: 'rgba(0,240,255,0.15)',
                      border: `2.5px solid ${activeProject.color}70`,
                      color: activeProject.color,
                      padding: '1.3rem 3rem',
                      fontSize: '1.15rem'
                    }}
                  >
                    <Github size={28} />
                    View Source Code
                  </a>
                )}

                {activeProject.live && (
                  <a
                    href={activeProject.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="action-btn"
                    style={{
                      background: `linear-gradient(135deg, ${activeProject.color}, #ffffff)`,
                      color: '#000',
                      fontWeight: 900,
                      padding: '1.3rem 3rem',
                      fontSize: '1.15rem',
                      boxShadow: `0 0 50px ${activeProject.color}60`
                    }}
                  >
                    <Rocket size={28} />
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