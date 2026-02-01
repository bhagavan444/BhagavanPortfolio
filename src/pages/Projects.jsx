import React, { useState, useEffect, useRef } from 'react';
import {
  ExternalLink, Github, Rocket, Star, X, CheckCircle2,
  Terminal, Sparkles, Layers, Mail, Award, Brain, Cpu,
  Code, Zap, Cloud, Database, Server, Globe, Heart,
  Trophy, Briefcase, GraduationCap, Users, Search, Filter,
  Grid, List, TrendingUp, Eye, Download, Share2, AlertCircle,
  Film, Play, Box, Crosshair, Target, Flame, Activity,
  ArrowRight, ChevronDown, Menu, Maximize2, GitBranch,
  Linkedin, Twitter, BookOpen, MessageSquare, Calendar,
  MapPin, Clock, Send, Phone, FileText, BarChart3,
  Lightbulb, Package, Settings, Shield, Wifi, Coffee,
  Smartphone, Monitor, Headphones, Video, Music, Camera,
  Link, Copy, Check, ThumbsUp, Share, Bookmark
} from 'lucide-react';

const allProjects = [
  {
    id: 1,
    title: "ATS Resume Builder Platform",
    github: "https://github.com/bhagavan444/Resumebuilderwebapp",
    live: "https://melody-nap-17037283.figma.site",
    demo: "https://www.youtube.com/embed/demo1",
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
    downloads: "3.2k",
    likes: 342,
    stars: 89,
    forks: 23,
    timeline: "3 months",
    team: "Solo",
    status: "Production"
  },
  {
    id: 2,
    title: "AI Workspace – Multi-Modal AI Platform",
    github: "https://github.com/bhagavan444/chatbotwebapp",
    live: "https://bhagavanai.lovable.app/",
    demo: null,
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
    downloads: "5.1k",
    likes: 521,
    stars: 134,
    forks: 45,
    timeline: "4 months",
    team: "Solo",
    status: "Production"
  },
    {
    id: 3,
    title: "Career AI – Career Path Recommendation",
    github: "https://github.com/bhagavan444/Career-Path-Recommendation",
    live: "https://carrerweb.lovable.app/",
        demo: null,
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
    downloads: "4.9k",
    likes: 445,
    stars: 123,
    forks: 34,
    timeline: "3 months",
    team: "Solo",
    status: "Production"
  },
  {
    id: 4,
    title: "Heart Disease Prediction Platform",
    github: "https://github.com/bhagavan444/Heart-Disease-Prediction",
    live: null,
    demo: null,
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
    downloads: "2.1k",
    likes: 234,
    stars: 67,
    forks: 19,
    timeline: "2 months",
    team: "Solo",
    status: "Production"
  },
  {
    id: 8,
    title: "NEWS AI – Fake News Detection",
    github: "https://github.com/bhagavan444/News-detector",
    live: "https://bliss-gala-22285345.figma.site/",
    demo: null,
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
    downloads: "6.7k",
    likes: 678,
    stars: 189,
    forks: 56,
    timeline: "4 months",
    team: "Solo",
    status: "Production"
  },
  {
    id: 5,
    title: " AI Project Generator",
    github: null,
    live: "https://aiprojecttool.lovable.app",
    demo: null,
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
    downloads: "8.9k",
    likes: 892,
    stars: 245,
    forks: 78,
    timeline: "2 months",
    team: "Solo",
    status: "Production"
  },
  {
    id: 7,
    title: "AI System Design Platform",
    github: null,
    live: "https://archmind-spark.lovable.app/",
    demo: null,
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
    downloads: "11.4k",
    likes: 1123,
    stars: 312,
    forks: 95,
    timeline: "5 months",
    team: "Solo",
    status: "Production"
  },
  {
  id: 8,
  title: "NeuralLearn – AI-Powered Adaptive Learning Platform",
  github: null,
  live: "https://neurallearn.lovable.app/",
  demo: null,
  desc: "AI-driven learning platform that adapts content based on quizzes, tests, and user performance to deliver personalized learning experiences.",
  longDesc: "NeuralLearn is an intelligent learning platform where users learn through interactive quizzes and assessments. The AI continuously evaluates user performance, identifies strengths and gaps, and dynamically adapts learning paths, difficulty levels, and recommendations to optimize understanding and retention.",
  problem: "Traditional learning platforms follow a one-size-fits-all approach and fail to adapt to individual learner strengths, weaknesses, and progress.",
  solution: "NeuralLearn uses AI-powered assessment and quiz-based evaluation to personalize learning. It adjusts content difficulty, recommends focused topics, and tracks progress to ensure efficient, outcome-driven learning.",
  myRole: "Designed the adaptive learning logic, AI quiz evaluation system, performance-based recommendations, interactive UI, and overall platform architecture.",
  techUsed: [
    "Adaptive Learning Systems",
    "AI Reasoning",
    "Quiz-Based Evaluation",
    "Performance Analytics",
    "React"
  ],
  impact: [
    "Improved learning efficiency through personalized content",
    "Helped users identify weak areas using AI-driven quizzes",
    "Enabled continuous skill improvement with adaptive testing"
  ],
  highlights: [
    "AI-Based Adaptive Learning",
    "Quiz & Test Driven Personalization",
    "Performance Tracking & Analytics",
    "Smart Content Recommendations"
  ],
  stats: {
    learners: "25k+",
    quizzesTaken: "120k+",
    uptime: "99%",
    latency: "<50ms"
  },
  tags: [
    "AI",
    "Adaptive Learning",
    "Quizzes",
    "EdTech",
    "Personalized Education"
  ],
  category: "AI",
  icon: "🧠",
  img: "https://lh3.googleusercontent.com/d/1-5CHMxhjfpfaYVcVlCExNPeGr4ew9CJq",
  color: "#8b5cf6",
  glowRGB: "139, 92, 246",
  featured: true,
  views: "31.2k",
  downloads: "11.4k",
  likes: 1123,
  stars: 312,
  forks: 95,
  timeline: "5 months",
  team: "Solo",
  status: "Production"
},


];

const developerInfo = {
  name: "Bhagavan G",
  title: "Full-Stack AI Engineer",
  tagline: "Building the future with AI, one line of code at a time",
  location: "Gudivada, India",
  email: "g.sivasatyasaibhagavan@gmail.com",
  github: "https://github.com/bhagavan444",
  linkedin: "https://linkedin.com/in/bhagavan-g",
  twitter: "https://twitter.com/bhagavan_dev",
  experience: "0+ Years",
  projects: "5+",
  contributions: "200+",
  availability: "Open to Opportunities"
};

export default function AdvancedDeveloperShowcase() {
  const [activeProject, setActiveProject] = useState(null);
  const [hoveredId, setHoveredId] = useState(null);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [projectType, setProjectType] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState('grid');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [likedProjects, setLikedProjects] = useState(new Set());
  const [bookmarkedProjects, setBookmarkedProjects] = useState(new Set());
  const [particlesEnabled, setParticlesEnabled] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const heroRef = useRef(null);
  const canvasRef = useRef(null);

  const categories = ['all', ...new Set(allProjects.map(p => p.category))];

  // Particle animation
  useEffect(() => {
    if (!particlesEnabled || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 100;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2
      });
    }

    let animationFrame;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(102, 126, 234, 0.5)';
        ctx.fill();
      });

      // Connect nearby particles
      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach(p2 => {
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(102, 126, 234, ${0.2 * (1 - distance / 150)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        });
      });

      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(animationFrame);
  }, [particlesEnabled]);

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
      if (sortBy === 'likes') return b.likes - a.likes;
      return 0;
    });

  const totalViews = allProjects.reduce((sum, p) => sum + parseFloat(p.views), 0);
  const totalDownloads = allProjects.reduce((sum, p) => sum + parseFloat(p.downloads), 0);
  const totalLikes = allProjects.reduce((sum, p) => sum + p.likes, 0);
  const totalStars = allProjects.reduce((sum, p) => sum + p.stars, 0);
  const githubProjects = allProjects.filter(p => p.github).length;
  const liveProjects = allProjects.filter(p => p.live).length;

  const handleLike = (projectId) => {
    setLikedProjects(prev => {
      const newSet = new Set(prev);
      if (newSet.has(projectId)) {
        newSet.delete(projectId);
      } else {
        newSet.add(projectId);
      }
      return newSet;
    });
  };

  const handleBookmark = (projectId) => {
    setBookmarkedProjects(prev => {
      const newSet = new Set(prev);
      if (newSet.has(projectId)) {
        newSet.delete(projectId);
      } else {
        newSet.add(projectId);
      }
      return newSet;
    });
  };

  const copyProfileLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&family=Orbitron:wght@400;500;600;700;800;900&display=swap');

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

        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(100px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes typing {
          from { width: 0; }
          to { width: 100%; }
        }

        @keyframes blink {
          50% { border-color: transparent; }
        }

        @keyframes matrix-fall {
          0% { transform: translateY(-100%); opacity: 1; }
          100% { transform: translateY(100vh); opacity: 0; }
        }

        @keyframes glow-pulse {
          0%, 100% { 
            text-shadow: 0 0 10px currentColor,
                         0 0 20px currentColor,
                         0 0 30px currentColor;
          }
          50% { 
            text-shadow: 0 0 20px currentColor,
                         0 0 30px currentColor,
                         0 0 40px currentColor,
                         0 0 50px currentColor;
          }
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
        /* GLASS MORPHISM ENHANCED */
        /* ═══════════════════════════════════════════════════════════ */
        
        .glass-card {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(30px) saturate(180%);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 24px;
          box-shadow: 
            0 8px 32px 0 rgba(0, 0, 0, 0.37),
            inset 0 1px 0 0 rgba(255, 255, 255, 0.05);
          position: relative;
          overflow: hidden;
        }

        .glass-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 50%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.05),
            transparent
          );
          transition: left 0.6s;
        }

        .glass-card:hover::before {
          left: 100%;
        }

        .glass-button {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative;
          overflow: hidden;
        }

        .glass-button::after {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(
            circle at center,
            rgba(255, 255, 255, 0.1) 0%,
            transparent 70%
          );
          opacity: 0;
          transition: opacity 0.3s;
        }

        .glass-button:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.2);
          transform: translateY(-2px);
        }

        .glass-button:hover::after {
          opacity: 1;
        }

        /* ═══════════════════════════════════════════════════════════ */
        /* PROJECT CARDS ENHANCED */
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
          transform: scale(1.15) rotate(2deg);
        }

        /* ═══════════════════════════════════════════════════════════ */
        /* GRADIENT TEXT ENHANCED */
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

        .gradient-text-fire {
          background: linear-gradient(135deg, #ff6b35 0%, #f7931e 50%, #fdc830 100%);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: gradient-shift 3s ease infinite;
        }

        .gradient-text-neon {
          background: linear-gradient(135deg, #00f5ff 0%, #a855f7 50%, #ff6b35 100%);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: gradient-shift 3s ease infinite, glow-pulse 2s ease infinite;
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

        .neon-glow {
          text-shadow: 
            0 0 10px currentColor,
            0 0 20px currentColor,
            0 0 30px currentColor,
            0 0 40px currentColor;
        }

        .holographic {
          background: linear-gradient(
            45deg,
            #667eea 0%,
            #764ba2 25%,
            #f093fb 50%,
            #667eea 75%,
            #764ba2 100%
          );
          background-size: 400% 400%;
          animation: gradient-shift 8s ease infinite;
        }

        /* ═══════════════════════════════════════════════════════════ */
        /* 3D EFFECTS */
        /* ═══════════════════════════════════════════════════════════ */
        
        .card-3d {
          transform-style: preserve-3d;
          perspective: 1000px;
        }

        .card-3d:hover {
          transform: rotateY(5deg) rotateX(5deg);
        }

        /* ═══════════════════════════════════════════════════════════ */
        /* TYPING ANIMATION */
        /* ═══════════════════════════════════════════════════════════ */
        
        .typing-text {
          overflow: hidden;
          border-right: 2px solid #667eea;
          white-space: nowrap;
          margin: 0 auto;
          animation: typing 3.5s steps(40, end), blink 0.75s step-end infinite;
        }

        /* ═══════════════════════════════════════════════════════════ */
        /* PARTICLES CANVAS */
        /* ═══════════════════════════════════════════════════════════ */
        
        #particles-canvas {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 1;
        }

        /* ═══════════════════════════════════════════════════════════ */
        /* FLOATING BADGES */
        /* ═══════════════════════════════════════════════════════════ */
        
        .floating-badge {
          animation: float 3s ease-in-out infinite;
        }

        .floating-badge:nth-child(2) {
          animation-delay: 0.5s;
        }

        .floating-badge:nth-child(3) {
          animation-delay: 1s;
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
        /* SPECIAL EFFECTS */
        /* ═══════════════════════════════════════════════════════════ */
        
        .cyber-glitch {
          position: relative;
        }

        .cyber-glitch::before,
        .cyber-glitch::after {
          content: attr(data-text);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }

        .cyber-glitch::before {
          left: 2px;
          text-shadow: -2px 0 #667eea;
          animation: glitch-anim 2s infinite linear alternate-reverse;
        }

        .cyber-glitch::after {
          left: -2px;
          text-shadow: -2px 0 #764ba2;
          animation: glitch-anim 3s infinite linear alternate-reverse;
        }

        @keyframes glitch-anim {
          0% { clip-path: inset(40% 0 61% 0); }
          20% { clip-path: inset(92% 0 1% 0); }
          40% { clip-path: inset(43% 0 1% 0); }
          60% { clip-path: inset(25% 0 58% 0); }
          80% { clip-path: inset(54% 0 7% 0); }
          100% { clip-path: inset(58% 0 43% 0); }
        }
      `}</style>

      {/* Particles Canvas */}
      <canvas
        ref={canvasRef}
        id="particles-canvas"
        style={{ opacity: particlesEnabled ? 1 : 0, transition: 'opacity 0.5s' }}
      />

      {/* Progress Bar */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: `${scrollProgress}%`,
          height: '4px',
          background: 'linear-gradient(90deg, #667eea, #764ba2, #f093fb)',
          zIndex: 10000,
          transition: 'width 0.1s',
          boxShadow: '0 0 20px #667eea'
        }}
      />

      {/* Floating Action Bar */}
      <div
        className="glass-card"
        style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          zIndex: 9999,
          padding: '1rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          borderRadius: '100px'
        }}
      >
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="glass-button"
          style={{
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
          title="Scroll to top"
        >
          <ArrowRight size={20} style={{ transform: 'rotate(-90deg)', color: '#667eea' }} />
        </button>

        <button
          onClick={() => setShowContact(true)}
          className="glass-button"
          style={{
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
          title="Contact me"
        >
          <Mail size={20} style={{ color: '#764ba2' }} />
        </button>

        <button
          onClick={copyProfileLink}
          className="glass-button"
          style={{
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
          title="Copy profile link"
        >
          {copiedLink ? (
            <Check size={20} style={{ color: '#10b981' }} />
          ) : (
            <Link size={20} style={{ color: '#f093fb' }} />
          )}
        </button>

        <button
          onClick={() => setParticlesEnabled(!particlesEnabled)}
          className="glass-button"
          style={{
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
          title="Toggle particles"
        >
          <Sparkles size={20} style={{ color: particlesEnabled ? '#ffd700' : '#666' }} />
        </button>
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
            width: '600px',
            height: '600px',
            background: 'radial-gradient(circle, rgba(102, 126, 234, 0.2) 0%, transparent 70%)',
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
            width: '700px',
            height: '700px',
            background: 'radial-gradient(circle, rgba(118, 75, 162, 0.15) 0%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(100px)',
            pointerEvents: 'none',
            transition: 'all 0.3s ease-out'
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '800px',
            height: '800px',
            background: 'radial-gradient(circle, rgba(240, 147, 251, 0.1) 0%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(120px)',
            pointerEvents: 'none',
            animation: 'float 8s ease-in-out infinite'
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
              paddingBottom: '80px',
              position: 'relative'
            }}
          >
            {/* Profile Badge */}
            <div
              className="glass-card fade-in-element floating-badge"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '1rem 2rem',
                borderRadius: '100px',
                marginBottom: '2rem',
                fontSize: '1rem',
                fontWeight: 600,
                letterSpacing: '0.5px',
                borderColor: 'rgba(102, 126, 234, 0.5)'
              }}
            >
              <div
                style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  background: '#10b981',
                  boxShadow: '0 0 10px #10b981',
                  animation: 'pulse-glow 2s ease infinite'
                }}
              />
              <span style={{ color: '#10b981', fontFamily: "'JetBrains Mono', monospace" }}>
                {developerInfo.availability}
              </span>
              <Zap size={18} style={{ color: '#667eea' }} />
            </div>

            {/* Name & Title */}
            <h1
              className="fade-in-element"
              style={{
                fontSize: 'clamp(3.5rem, 12vw, 8rem)',
                fontWeight: 900,
                lineHeight: 1,
                marginBottom: '1.5rem',
                fontFamily: "'Orbitron', sans-serif",
                letterSpacing: '-0.03em',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #00f5ff 75%, #667eea 100%)',
                backgroundSize: '200% 200%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                animation: 'gradient-shift 5s ease infinite'
              }}
            >
              {developerInfo.name.toUpperCase()}
            </h1>

            <h2
              className="fade-in-element"
              style={{
                fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
                fontWeight: 700,
                color: '#a0aec0',
                marginBottom: '1.5rem',
                fontFamily: "'Space Grotesk', sans-serif"
              }}
            >
              {developerInfo.title}
            </h2>

            {/* Tagline */}
            <p
              className="fade-in-element typing-text"
              style={{
                fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)',
                color: '#667eea',
                maxWidth: '800px',
                lineHeight: 1.8,
                marginBottom: '3rem',
                fontWeight: 400,
                fontFamily: "'JetBrains Mono', monospace"
              }}
            >
              {developerInfo.tagline}
            </p>

            {/* Quick Stats Badges */}
            <div
              className="fade-in-element"
              style={{
                display: 'flex',
                gap: '1rem',
                flexWrap: 'wrap',
                justifyContent: 'center',
                marginBottom: '3rem'
              }}
            >
              {[
                { icon: Clock, label: 'Experience', value: developerInfo.experience, color: '#667eea' },
                { icon: Rocket, label: 'Projects', value: developerInfo.projects, color: '#764ba2' },
                { icon: GitBranch, label: 'Contributions', value: developerInfo.contributions, color: '#f093fb' },
                { icon: MapPin, label: 'Location', value: developerInfo.location.split(',')[0], color: '#10b981' }
              ].map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={i}
                    className="glass-button floating-badge"
                    style={{
                      padding: '0.75rem 1.5rem',
                      borderRadius: '100px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      borderColor: `${stat.color}40`
                    }}
                  >
                    <Icon size={20} style={{ color: stat.color }} />
                    <span style={{ color: '#cbd5e0', fontWeight: 600 }}>
                      {stat.value}
                    </span>
                    <span style={{ color: '#718096', fontSize: '0.85rem' }}>
                      {stat.label}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* CTA Buttons */}
            <div
              className="fade-in-element"
              style={{
                display: 'flex',
                gap: '1.5rem',
                flexWrap: 'wrap',
                justifyContent: 'center',
                marginBottom: '3rem'
              }}
            >
              <a
                href="#projects"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '1.5rem 3rem',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: '#fff',
                  borderRadius: '100px',
                  fontSize: '1.2rem',
                  fontWeight: 800,
                  textDecoration: 'none',
                  transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                  boxShadow: '0 20px 40px rgba(102, 126, 234, 0.4)',
                  fontFamily: "'Space Grotesk', sans-serif"
                }}
                className="hover-lift shimmer-effect"
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 30px 60px rgba(102, 126, 234, 0.6)';
                  e.currentTarget.style.transform = 'translateY(-8px) scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(102, 126, 234, 0.4)';
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                }}
              >
                <Rocket size={24} />
                Explore Portfolio
              </a>

              <button
                onClick={() => setShowContact(true)}
                className="glass-button"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '1.5rem 3rem',
                  borderRadius: '100px',
                  fontSize: '1.2rem',
                  fontWeight: 800,
                  color: '#fff',
                  cursor: 'pointer',
                  borderColor: 'rgba(102, 126, 234, 0.5)',
                  fontFamily: "'Space Grotesk', sans-serif"
                }}
              >
                <Mail size={24} />
                Get in Touch
              </button>

              <a
                href={developerInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-button"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '1.5rem 1.5rem',
                  borderRadius: '100px',
                  fontSize: '1.2rem',
                  fontWeight: 800,
                  textDecoration: 'none',
                  color: '#a855f7',
                  borderColor: 'rgba(168, 85, 247, 0.5)'
                }}
              >
                <Github size={24} />
              </a>

              <a
                href={developerInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-button"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '1.5rem 1.5rem',
                  borderRadius: '100px',
                  fontSize: '1.2rem',
                  fontWeight: 800,
                  textDecoration: 'none',
                  color: '#0077b5',
                  borderColor: 'rgba(0, 119, 181, 0.5)'
                }}
              >
                <Linkedin size={24} />
              </a>
            </div>

            {/* Scroll Indicator */}
            <div
              style={{
                position: 'absolute',
                bottom: '40px',
                left: '50%',
                transform: 'translateX(-50%)',
                animation: 'bounce-slow 2s ease-in-out infinite',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <span
                style={{
                  color: '#667eea',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  letterSpacing: '1px',
                  fontFamily: "'JetBrains Mono', monospace"
                }}
              >
                SCROLL DOWN
              </span>
              <ChevronDown size={32} style={{ color: '#667eea' }} />
            </div>
          </section>

          {/* Enhanced Stats Section */}
          <section
            id="stats"
            style={{
              padding: '6rem 0',
              marginBottom: '4rem'
            }}
          >
            <div
              className="fade-in-element"
              style={{
                textAlign: 'center',
                marginBottom: '4rem'
              }}
            >
              <h2
                className="gradient-text"
                style={{
                  fontSize: 'clamp(2.5rem, 6vw, 4rem)',
                  fontWeight: 900,
                  marginBottom: '1rem',
                  fontFamily: "'Space Grotesk', sans-serif"
                }}
              >
                Impact Metrics
              </h2>
              <p
                style={{
                  fontSize: '1.2rem',
                  color: '#a0aec0',
                  maxWidth: '600px',
                  margin: '0 auto'
                }}
              >
                Real numbers, real impact across the tech ecosystem
              </p>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '2rem'
              }}
            >
              {[
                { label: 'Total Projects', value: allProjects.length, icon: Rocket, color: '#667eea', suffix: '+', gradient: 'linear-gradient(135deg, #667eea, #764ba2)' },
                { label: 'GitHub Repos', value: githubProjects, icon: Github, color: '#a855f7', suffix: '', gradient: 'linear-gradient(135deg, #a855f7, #f093fb)' },
                { label: 'Live Demos', value: liveProjects, icon: Globe, color: '#10b981', suffix: '', gradient: 'linear-gradient(135deg, #10b981, #34d399)' },
                { label: 'Total Views', value: totalViews.toFixed(1), icon: Eye, color: '#00f5ff', suffix: 'k', gradient: 'linear-gradient(135deg, #00f5ff, #0582ca)' },
                { label: 'Downloads', value: totalDownloads.toFixed(1), icon: Download, color: '#ff6b35', suffix: 'k', gradient: 'linear-gradient(135deg, #ff6b35, #fdc830)' },
                { label: 'Community Likes', value: totalLikes, icon: Heart, color: '#ec4899', suffix: '+', gradient: 'linear-gradient(135deg, #ec4899, #f472b6)' },
                { label: 'GitHub Stars', value: totalStars, icon: Star, color: '#ffd700', suffix: '+', gradient: 'linear-gradient(135deg, #ffd700, #fbbf24)' },
                { label: 'Featured Works', value: allProjects.filter(p => p.featured).length, icon: Award, color: '#8b5cf6', suffix: '', gradient: 'linear-gradient(135deg, #8b5cf6, #a78bfa)' }
              ].map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={i}
                    className="glass-card fade-in-element hover-lift card-3d"
                    style={{
                      padding: '2.5rem 2rem',
                      textAlign: 'center',
                      position: 'relative',
                      overflow: 'hidden',
                      borderColor: `${stat.color}40`
                    }}
                  >
                    {/* Background Glow */}
                    <div
                      style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '200px',
                        height: '200px',
                        background: `radial-gradient(circle, ${stat.color}15, transparent)`,
                        filter: 'blur(40px)',
                        pointerEvents: 'none'
                      }}
                    />

                    {/* Icon */}
                    <div
                      style={{
                        width: '80px',
                        height: '80px',
                        margin: '0 auto 1.5rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: stat.gradient,
                        borderRadius: '24px',
                        boxShadow: `0 10px 30px ${stat.color}40`,
                        position: 'relative'
                      }}
                      className="shimmer-effect"
                    >
                      <Icon size={36} style={{ color: '#fff' }} />
                    </div>

                    {/* Value */}
                    <div
                      className="stat-number"
                      style={{
                        fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                        fontWeight: 900,
                        background: stat.gradient,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        marginBottom: '0.5rem',
                        fontFamily: "'Orbitron', sans-serif",
                        textShadow: `0 0 30px ${stat.color}50`,
                        position: 'relative'
                      }}
                    >
                      {stat.value}{stat.suffix}
                    </div>

                    {/* Label */}
                    <div
                      style={{
                        fontSize: '1rem',
                        color: '#cbd5e0',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                        fontFamily: "'JetBrains Mono', monospace"
                      }}
                    >
                      {stat.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Enhanced Filters Section */}
          <section
            id="filters"
            style={{
              padding: '4rem 0',
              marginBottom: '3rem'
            }}
          >
            <div
              className="fade-in-element"
              style={{
                textAlign: 'center',
                marginBottom: '3rem'
              }}
            >
              <h2
                className="gradient-text-fire"
                style={{
                  fontSize: 'clamp(2.5rem, 6vw, 4rem)',
                  fontWeight: 900,
                  marginBottom: '1rem',
                  fontFamily: "'Space Grotesk', sans-serif"
                }}
              >
                Project Showcase
              </h2>
              <p
                style={{
                  fontSize: '1.2rem',
                  color: '#a0aec0',
                  maxWidth: '700px',
                  margin: '0 auto'
                }}
              >
                Production-ready solutions built with cutting-edge technology
              </p>
            </div>

            {/* Search Bar */}
            <div
              className="fade-in-element"
              style={{
                maxWidth: '800px',
                margin: '0 auto 3rem',
                position: 'relative'
              }}
            >
              <Search
                size={24}
                style={{
                  position: 'absolute',
                  left: '2rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#667eea',
                  pointerEvents: 'none',
                  zIndex: 2
                }}
              />
              <input
                type="text"
                placeholder="Search by project name, technology, or keyword..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="glass-card"
                style={{
                  width: '100%',
                  padding: '1.5rem 2rem 1.5rem 5rem',
                  fontSize: '1.1rem',
                  color: '#fff',
                  border: '2px solid rgba(102, 126, 234, 0.3)',
                  outline: 'none',
                  transition: 'all 0.3s',
                  fontFamily: "'JetBrains Mono', monospace"
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#667eea';
                  e.target.style.boxShadow = '0 0 0 4px rgba(102, 126, 234, 0.15)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(102, 126, 234, 0.3)';
                  e.target.style.boxShadow = 'none';
                }}
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  style={{
                    position: 'absolute',
                    right: '2rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    color: '#667eea',
                    cursor: 'pointer',
                    padding: '0.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <X size={20} />
                </button>
              )}
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
                  gap: '0.5rem',
                  borderColor: 'rgba(102, 126, 234, 0.5)'
                }}
              >
                <button
                  onClick={() => setViewMode('grid')}
                  className="glass-button"
                  style={{
                    padding: '0.875rem 1.75rem',
                    borderRadius: '12px',
                    background: viewMode === 'grid' ? 'linear-gradient(135deg, #667eea, #764ba2)' : 'transparent',
                    color: viewMode === 'grid' ? '#fff' : '#a0aec0',
                    fontSize: '1rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    border: 'none'
                  }}
                >
                  <Grid size={20} />
                  Grid
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className="glass-button"
                  style={{
                    padding: '0.875rem 1.75rem',
                    borderRadius: '12px',
                    background: viewMode === 'list' ? 'linear-gradient(135deg, #667eea, #764ba2)' : 'transparent',
                    color: viewMode === 'list' ? '#fff' : '#a0aec0',
                    fontSize: '1rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    border: 'none'
                  }}
                >
                  <List size={20} />
                  List
                </button>
                <button
                  onClick={() => setViewMode('column')}
                  className="glass-button"
                  style={{
                    padding: '0.875rem 1.75rem',
                    borderRadius: '12px',
                    background: viewMode === 'column' ? 'linear-gradient(135deg, #667eea, #764ba2)' : 'transparent',
                    color: viewMode === 'column' ? '#fff' : '#a0aec0',
                    fontSize: '1rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    border: 'none'
                  }}
                >
                  <Layers size={20} />
                  Column
                </button>
              </div>

              {/* Project Type Filters */}
              {['all', 'github', 'live'].map((type) => (
                <button
                  key={type}
                  onClick={() => setProjectType(type)}
                  className="glass-button"
                  style={{
                    padding: '0.875rem 2rem',
                    borderRadius: '100px',
                    background: projectType === type ? 'linear-gradient(135deg, #667eea, #764ba2)' : 'transparent',
                    color: projectType === type ? '#fff' : '#a0aec0',
                    fontSize: '1rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.6rem',
                    border: projectType === type ? 'none' : '1px solid rgba(255, 255, 255, 0.1)',
                    fontFamily: "'JetBrains Mono', monospace"
                  }}
                >
                  {type === 'all' && <Box size={20} />}
                  {type === 'github' && <Github size={20} />}
                  {type === 'live' && <Globe size={20} />}
                  {type === 'all' ? 'All Projects' : type === 'github' ? 'GitHub' : 'Live'}
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
                  className="glass-button gradient-border"
                  style={{
                    padding: '0.875rem 2rem',
                    borderRadius: '100px',
                    background: filter === cat ? 'linear-gradient(135deg, #a855f7, #f093fb)' : 'transparent',
                    color: filter === cat ? '#fff' : '#cbd5e0',
                    fontSize: '1rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    textTransform: 'capitalize',
                    letterSpacing: '0.5px',
                    border: filter === cat ? 'none' : '1px solid rgba(255, 255, 255, 0.1)',
                    boxShadow: filter === cat ? '0 10px 30px rgba(168, 85, 247, 0.4)' : 'none'
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
              {[
                { key: 'featured', label: 'Featured', icon: Star, color: '#ffd700' },
                { key: 'views', label: 'Most Viewed', icon: TrendingUp, color: '#667eea' },
                { key: 'likes', label: 'Most Liked', icon: Heart, color: '#ec4899' }
              ].map((sort) => {
                const Icon = sort.icon;
                return (
                  <button
                    key={sort.key}
                    onClick={() => setSortBy(sort.key)}
                    className="glass-button"
                    style={{
                      padding: '0.875rem 2rem',
                      borderRadius: '100px',
                      background: sortBy === sort.key ? `${sort.color}20` : 'transparent',
                      color: sortBy === sort.key ? sort.color : '#a0aec0',
                      fontSize: '1rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.6rem',
                      border: sortBy === sort.key ? `2px solid ${sort.color}40` : '1px solid rgba(255, 255, 255, 0.1)'
                    }}
                  >
                    <Icon size={20} fill={sortBy === sort.key ? sort.color : 'none'} />
                    {sort.label}
                  </button>
                );
              })}
            </div>

            {/* Results Count */}
            <div
              className="fade-in-element"
              style={{
                textAlign: 'center',
                marginTop: '2.5rem',
                padding: '1rem 2rem',
                borderRadius: '100px',
                background: 'rgba(102, 126, 234, 0.1)',
                border: '1px solid rgba(102, 126, 234, 0.3)',
                display: 'inline-block',
                margin: '2.5rem auto 0',
                width: 'fit-content',
                position: 'relative',
                left: '50%',
                transform: 'translateX(-50%)'
              }}
            >
              <span
                style={{
                  fontSize: '1.1rem',
                  color: '#667eea',
                  fontWeight: 700,
                  fontFamily: "'JetBrains Mono', monospace"
                }}
              >
                {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''} found
              </span>
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
                  gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 450px), 1fr))',
                  gap: 'clamp(2rem, 4vw, 3.5rem)'
                }}
              >
                {filteredProjects.map((project, idx) => (
                  <div
                    key={project.id}
                    className="glass-card project-card fade-in-element gradient-border"
                    onClick={() => setActiveProject(project)}
                    onMouseEnter={() => setHoveredId(project.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    style={{
                      borderColor: hoveredId === project.id ? project.color : 'rgba(255, 255, 255, 0.08)',
                      boxShadow: hoveredId === project.id
                        ? `0 30px 80px rgba(${project.glowRGB}, 0.5), 0 0 0 1px ${project.color}40`
                        : '0 8px 32px rgba(0, 0, 0, 0.37)',
                      animationDelay: `${idx * 0.1}s`
                    }}
                  >
                    {/* Image */}
                    <div
                      className="project-card-image"
                      style={{
                        height: '300px',
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
                          background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, transparent 60%)',
                          borderRadius: '24px 24px 0 0'
                        }}
                      />

                      {/* Featured Badge */}
                      {project.featured && (
                        <div
                          className="floating-badge"
                          style={{
                            position: 'absolute',
                            top: '1rem',
                            right: '1rem',
                            padding: '0.6rem 1.2rem',
                            background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.3), rgba(255, 215, 0, 0.2))',
                            backdropFilter: 'blur(10px)',
                            border: '2px solid rgba(255, 215, 0, 0.6)',
                            borderRadius: '100px',
                            color: '#ffd700',
                            fontSize: '0.85rem',
                            fontWeight: 800,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            fontFamily: "'JetBrains Mono', monospace",
                            textTransform: 'uppercase',
                            letterSpacing: '1px'
                          }}
                        >
                          <Star size={16} fill="#ffd700" />
                          Featured
                        </div>
                      )}

                      {/* Status Badge */}
                      <div
                        style={{
                          position: 'absolute',
                          top: '1rem',
                          left: '1rem',
                          padding: '0.5rem 1rem',
                          background: 'rgba(16, 185, 129, 0.2)',
                          backdropFilter: 'blur(10px)',
                          border: '1px solid rgba(16, 185, 129, 0.5)',
                          borderRadius: '100px',
                          color: '#10b981',
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.4rem'
                        }}
                      >
                        <div
                          style={{
                            width: '8px',
                            height: '8px',
                            borderRadius: '50%',
                            background: '#10b981',
                            boxShadow: '0 0 10px #10b981',
                            animation: 'pulse-glow 2s ease infinite'
                          }}
                        />
                        {project.status}
                      </div>

                      {/* Bottom Info Bar */}
                      <div
                        style={{
                          position: 'absolute',
                          bottom: '1rem',
                          left: '1rem',
                          right: '1rem',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          gap: '1rem'
                        }}
                      >
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          {project.github && (
                            <div
                              style={{
                                padding: '0.5rem 0.75rem',
                                background: 'rgba(168, 85, 247, 0.25)',
                                backdropFilter: 'blur(10px)',
                                border: '1px solid rgba(168, 85, 247, 0.6)',
                                borderRadius: '8px',
                                fontSize: '0.75rem',
                                color: '#a855f7',
                                fontWeight: 700,
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.4rem'
                              }}
                            >
                              <Github size={14} />
                              {project.stars}
                            </div>
                          )}
                          {project.live && (
                            <div
                              style={{
                                padding: '0.5rem 0.75rem',
                                background: 'rgba(16, 185, 129, 0.25)',
                                backdropFilter: 'blur(10px)',
                                border: '1px solid rgba(16, 185, 129, 0.6)',
                                borderRadius: '8px',
                                fontSize: '0.75rem',
                                color: '#10b981',
                                fontWeight: 700,
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.4rem'
                              }}
                            >
                              <Globe size={14} />
                              LIVE
                            </div>
                          )}
                        </div>
                        <div
                          style={{
                            padding: '0.5rem 0.75rem',
                            background: 'rgba(0, 0, 0, 0.7)',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(102, 126, 234, 0.4)',
                            borderRadius: '8px',
                            fontSize: '0.75rem',
                            color: '#667eea',
                            fontWeight: 700,
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
                          className="shimmer-effect"
                          style={{
                            width: '70px',
                            height: '70px',
                            flexShrink: 0,
                            background: `linear-gradient(135deg, ${project.color}25, ${project.color}15)`,
                            border: `2px solid ${project.color}50`,
                            borderRadius: '20px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '2.2rem',
                            boxShadow: `0 10px 30px ${project.color}30`
                          }}
                        >
                          {project.icon}
                        </div>

                        <div style={{ flex: 1, minWidth: 0 }}>
                          <h3
                            style={{
                              fontSize: 'clamp(1.3rem, 2.5vw, 1.6rem)',
                              fontWeight: 800,
                              color: '#fff',
                              marginBottom: '0.5rem',
                              lineHeight: 1.2,
                              fontFamily: "'Space Grotesk', sans-serif"
                            }}
                          >
                            {project.title}
                          </h3>
                          <div
                            style={{
                              display: 'inline-block',
                              padding: '0.3rem 0.9rem',
                              background: `linear-gradient(135deg, ${project.color}25, ${project.color}15)`,
                              border: `1px solid ${project.color}50`,
                              borderRadius: '100px',
                              fontSize: '0.75rem',
                              fontWeight: 700,
                              color: project.color,
                              textTransform: 'uppercase',
                              letterSpacing: '0.5px'
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
                          lineHeight: 1.7,
                          color: '#cbd5e0',
                          marginBottom: '1.5rem'
                        }}
                      >
                        {project.desc}
                      </p>

                      {/* Meta Info */}
                      <div
                        style={{
                          display: 'grid',
                          gridTemplateColumns: 'repeat(2, 1fr)',
                          gap: '0.75rem',
                          marginBottom: '1.5rem',
                          padding: '1rem',
                          background: 'rgba(255, 255, 255, 0.02)',
                          borderRadius: '12px',
                          border: '1px solid rgba(255, 255, 255, 0.05)'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <Clock size={16} style={{ color: project.color }} />
                          <span style={{ fontSize: '0.85rem', color: '#a0aec0' }}>
                            {project.timeline}
                          </span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <Users size={16} style={{ color: project.color }} />
                          <span style={{ fontSize: '0.85rem', color: '#a0aec0' }}>
                            {project.team}
                          </span>
                        </div>
                      </div>

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
                              padding: '0.4rem 1rem',
                              background: 'rgba(255, 255, 255, 0.05)',
                              border: '1px solid rgba(255, 255, 255, 0.1)',
                              borderRadius: '100px',
                              fontSize: '0.8rem',
                              color: '#cbd5e0',
                              fontFamily: "'JetBrains Mono', monospace",
                              fontWeight: 500
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                        {project.tags.length > 3 && (
                          <span
                            style={{
                              padding: '0.4rem 1rem',
                              background: `${project.color}20`,
                              border: `1px solid ${project.color}40`,
                              borderRadius: '100px',
                              fontSize: '0.8rem',
                              color: project.color,
                              fontFamily: "'JetBrains Mono', monospace",
                              fontWeight: 600
                            }}
                          >
                            +{project.tags.length - 3}
                          </span>
                        )}
                      </div>

                      {/* Engagement Stats */}
                      <div
                        style={{
                          display: 'flex',
                          gap: '1rem',
                          marginBottom: '1.5rem',
                          padding: '0.75rem',
                          background: 'rgba(255, 255, 255, 0.02)',
                          borderRadius: '12px',
                          justifyContent: 'space-around'
                        }}
                      >
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleLike(project.id);
                          }}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: likedProjects.has(project.id) ? '#ec4899' : '#718096',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.4rem',
                            fontSize: '0.9rem',
                            fontWeight: 600,
                            transition: 'all 0.3s'
                          }}
                        >
                          <Heart
                            size={18}
                            fill={likedProjects.has(project.id) ? '#ec4899' : 'none'}
                          />
                          {project.likes + (likedProjects.has(project.id) ? 1 : 0)}
                        </button>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleBookmark(project.id);
                          }}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: bookmarkedProjects.has(project.id) ? '#ffd700' : '#718096',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.4rem',
                            fontSize: '0.9rem',
                            fontWeight: 600,
                            transition: 'all 0.3s'
                          }}
                        >
                          <Bookmark
                            size={18}
                            fill={bookmarkedProjects.has(project.id) ? '#ffd700' : 'none'}
                          />
                          Save
                        </button>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            navigator.clipboard.writeText(project.live || project.github || window.location.href);
                          }}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: '#718096',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.4rem',
                            fontSize: '0.9rem',
                            fontWeight: 600,
                            transition: 'all 0.3s'
                          }}
                        >
                          <Share2 size={18} />
                          Share
                        </button>
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
                            className="glass-button hover-lift"
                            style={{
                              flex: 1,
                              padding: '1rem',
                              borderRadius: '14px',
                              fontSize: '0.95rem',
                              fontWeight: 700,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              gap: '0.5rem',
                              textDecoration: 'none',
                              color: '#a855f7',
                              borderColor: 'rgba(168, 85, 247, 0.4)'
                            }}
                          >
                            <Github size={20} />
                            Code
                          </a>
                        )}
                        {project.live && (
                          <a
                            href={project.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="hover-lift shimmer-effect"
                            style={{
                              flex: 1,
                              padding: '1rem',
                              borderRadius: '14px',
                              fontSize: '0.95rem',
                              fontWeight: 800,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              gap: '0.5rem',
                              textDecoration: 'none',
                              background: `linear-gradient(135deg, ${project.color}, ${project.color}dd)`,
                              color: '#000',
                              border: 'none',
                              boxShadow: `0 10px 30px rgba(${project.glowRGB}, 0.4)`,
                              position: 'relative',
                              overflow: 'hidden'
                            }}
                          >
                            <Rocket size={20} />
                            Demo
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : viewMode === 'list' ? (
              // List View
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
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
                        width: window.innerWidth > 768 ? '350px' : '100%',
                        height: window.innerWidth > 768 ? 'auto' : '220px',
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
                            background: 'rgba(255, 215, 0, 0.3)',
                            backdropFilter: 'blur(10px)',
                            border: '2px solid rgba(255, 215, 0, 0.6)',
                            borderRadius: '100px',
                            color: '#ffd700',
                            fontSize: '0.75rem',
                            fontWeight: 800,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.4rem'
                          }}
                        >
                          <Star size={14} fill="#ffd700" />
                          FEATURED
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div style={{ flex: 1, padding: '2.5rem', display: 'flex', flexDirection: 'column' }}>
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '1rem' }}>
                        <div
                          style={{
                            width: '60px',
                            height: '60px',
                            background: `linear-gradient(135deg, ${project.color}25, ${project.color}15)`,
                            border: `2px solid ${project.color}50`,
                            borderRadius: '16px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '2rem',
                            flexShrink: 0
                          }}
                        >
                          {project.icon}
                        </div>
                        <div style={{ flex: 1 }}>
                          <h3
                            style={{
                              fontSize: '1.8rem',
                              fontWeight: 800,
                              color: '#fff',
                              marginBottom: '0.5rem',
                              fontFamily: "'Space Grotesk', sans-serif"
                            }}
                          >
                            {project.title}
                          </h3>
                          <div
                            style={{
                              display: 'inline-block',
                              padding: '0.3rem 1rem',
                              background: `${project.color}20`,
                              border: `1px solid ${project.color}40`,
                              borderRadius: '100px',
                              fontSize: '0.8rem',
                              fontWeight: 700,
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
                            gap: '1rem'
                          }}
                        >
                          <div
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.5rem',
                              padding: '0.5rem 1rem',
                              background: 'rgba(102, 126, 234, 0.15)',
                              border: '1px solid rgba(102, 126, 234, 0.4)',
                              borderRadius: '100px',
                              color: '#667eea',
                              fontSize: '0.9rem',
                              fontWeight: 700
                            }}
                          >
                            <Eye size={16} />
                            {project.views}
                          </div>
                        </div>
                      </div>

                      <p
                        style={{
                          fontSize: '1.05rem',
                          lineHeight: 1.7,
                          color: '#cbd5e0',
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
                        {project.tags.slice(0, 6).map((tag) => (
                          <span
                            key={tag}
                            style={{
                              padding: '0.4rem 1rem',
                              background: 'rgba(255, 255, 255, 0.05)',
                              border: '1px solid rgba(255, 255, 255, 0.1)',
                              borderRadius: '100px',
                              fontSize: '0.85rem',
                              color: '#cbd5e0',
                              fontFamily: "'JetBrains Mono', monospace"
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="glass-button"
                            style={{
                              padding: '1rem 2rem',
                              borderRadius: '14px',
                              fontSize: '1rem',
                              fontWeight: 700,
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.5rem',
                              textDecoration: 'none',
                              color: '#a855f7',
                              borderColor: 'rgba(168, 85, 247, 0.4)'
                            }}
                          >
                            <Github size={20} />
                            View Code
                          </a>
                        )}
                        {project.live && (
                          <a
                            href={project.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="hover-lift"
                            style={{
                              padding: '1rem 2rem',
                              borderRadius: '14px',
                              fontSize: '1rem',
                              fontWeight: 800,
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.5rem',
                              textDecoration: 'none',
                              background: `linear-gradient(135deg, ${project.color}, ${project.color}dd)`,
                              color: '#000',
                              border: 'none',
                              boxShadow: `0 10px 30px rgba(${project.glowRGB}, 0.4)`
                            }}
                          >
                            <Rocket size={20} />
                            Live Demo
                          </a>
                        )}
                        
                        <div style={{ marginLeft: 'auto', display: 'flex', gap: '0.75rem' }}>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleLike(project.id);
                            }}
                            className="glass-button"
                            style={{
                              width: '50px',
                              height: '50px',
                              borderRadius: '50%',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: likedProjects.has(project.id) ? '#ec4899' : '#718096',
                              cursor: 'pointer',
                              border: likedProjects.has(project.id) ? '2px solid #ec4899' : '1px solid rgba(255, 255, 255, 0.1)'
                            }}
                          >
                            <Heart size={20} fill={likedProjects.has(project.id) ? '#ec4899' : 'none'} />
                          </button>
                          
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleBookmark(project.id);
                            }}
                            className="glass-button"
                            style={{
                              width: '50px',
                              height: '50px',
                              borderRadius: '50%',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: bookmarkedProjects.has(project.id) ? '#ffd700' : '#718096',
                              cursor: 'pointer',
                              border: bookmarkedProjects.has(project.id) ? '2px solid #ffd700' : '1px solid rgba(255, 255, 255, 0.1)'
                            }}
                          >
                            <Bookmark size={20} fill={bookmarkedProjects.has(project.id) ? '#ffd700' : 'none'} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              // Column View
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {filteredProjects.map((project, idx) => (
                  <div
                    key={project.id}
                    className="glass-card project-card fade-in-element hover-lift"
                    onClick={() => setActiveProject(project)}
                    onMouseEnter={() => setHoveredId(project.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    style={{
                      padding: '2rem',
                      borderColor: hoveredId === project.id ? project.color : 'rgba(255, 255, 255, 0.08)',
                      animationDelay: `${idx * 0.05}s`,
                      display: 'flex',
                      gap: '2rem',
                      alignItems: 'center',
                      flexDirection: window.innerWidth > 1024 ? 'row' : 'column'
                    }}
                  >
                    {/* Compact Image */}
                    <div
                      style={{
                        width: window.innerWidth > 1024 ? '200px' : '100%',
                        height: '150px',
                        flexShrink: 0,
                        borderRadius: '16px',
                        overflow: 'hidden',
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
                            top: '0.5rem',
                            right: '0.5rem',
                            width: '30px',
                            height: '30px',
                            borderRadius: '50%',
                            background: 'rgba(255, 215, 0, 0.3)',
                            backdropFilter: 'blur(10px)',
                            border: '2px solid rgba(255, 215, 0, 0.6)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          <Star size={16} fill="#ffd700" />
                        </div>
                      )}
                    </div>

                    {/* Icon & Basic Info */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flex: 1, minWidth: 0 }}>
                      <div
                        style={{
                          width: '70px',
                          height: '70px',
                          background: `linear-gradient(135deg, ${project.color}25, ${project.color}15)`,
                          border: `2px solid ${project.color}50`,
                          borderRadius: '18px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '2.2rem',
                          flexShrink: 0
                        }}
                      >
                        {project.icon}
                      </div>

                      <div style={{ flex: 1, minWidth: 0 }}>
                        <h3
                          style={{
                            fontSize: '1.4rem',
                            fontWeight: 800,
                            color: '#fff',
                            marginBottom: '0.5rem',
                            fontFamily: "'Space Grotesk', sans-serif"
                          }}
                        >
                          {project.title}
                        </h3>
                        <p
                          style={{
                            fontSize: '0.95rem',
                            color: '#a0aec0',
                            marginBottom: '0.75rem',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden'
                          }}
                        >
                          {project.desc}
                        </p>
                        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                          <span
                            style={{
                              padding: '0.3rem 0.8rem',
                              background: `${project.color}20`,
                              border: `1px solid ${project.color}40`,
                              borderRadius: '100px',
                              fontSize: '0.75rem',
                              fontWeight: 700,
                              color: project.color
                            }}
                          >
                            {project.category}
                          </span>
                          {project.tags.slice(0, 2).map((tag) => (
                            <span
                              key={tag}
                              style={{
                                padding: '0.3rem 0.8rem',
                                background: 'rgba(255, 255, 255, 0.05)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                borderRadius: '100px',
                                fontSize: '0.75rem',
                                color: '#cbd5e0'
                              }}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Stats & Actions */}
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexShrink: 0 }}>
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '0.5rem',
                          padding: '1rem',
                          background: 'rgba(255, 255, 255, 0.02)',
                          borderRadius: '12px',
                          minWidth: '100px',
                          textAlign: 'center'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', justifyContent: 'center' }}>
                          <Eye size={14} style={{ color: '#667eea' }} />
                          <span style={{ fontSize: '0.85rem', color: '#cbd5e0', fontWeight: 600 }}>
                            {project.views}
                          </span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', justifyContent: 'center' }}>
                          <Heart size={14} style={{ color: '#ec4899' }} />
                          <span style={{ fontSize: '0.85rem', color: '#cbd5e0', fontWeight: 600 }}>
                            {project.likes}
                          </span>
                        </div>
                      </div>

                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="glass-button"
                            style={{
                              width: '45px',
                              height: '45px',
                              borderRadius: '50%',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              textDecoration: 'none',
                              color: '#a855f7',
                              borderColor: 'rgba(168, 85, 247, 0.4)'
                            }}
                            title="View Code"
                          >
                            <Github size={20} />
                          </a>
                        )}
                        {project.live && (
                          <a
                            href={project.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            style={{
                              width: '45px',
                              height: '45px',
                              borderRadius: '50%',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              textDecoration: 'none',
                              background: `linear-gradient(135deg, ${project.color}, ${project.color}dd)`,
                              color: '#000',
                              border: 'none'
                            }}
                            title="Live Demo"
                          >
                            <Rocket size={20} />
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
                  padding: '5rem 3rem',
                  textAlign: 'center'
                }}
              >
                <div
                  style={{
                    fontSize: '6rem',
                    marginBottom: '2rem',
                    animation: 'float 3s ease-in-out infinite'
                  }}
                >
                  🔍
                </div>
                <h3
                  className="gradient-text"
                  style={{
                    fontSize: '2.5rem',
                    marginBottom: '1rem',
                    fontWeight: 900,
                    fontFamily: "'Space Grotesk', sans-serif"
                  }}
                >
                  No Projects Found
                </h3>
                <p
                  style={{
                    fontSize: '1.2rem',
                    color: '#a0aec0',
                    marginBottom: '2.5rem',
                    maxWidth: '500px',
                    margin: '0 auto 2.5rem'
                  }}
                >
                  Try adjusting your search criteria or filters to discover more projects
                </p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setFilter('all');
                    setProjectType('all');
                  }}
                  className="hover-lift"
                  style={{
                    padding: '1.25rem 2.5rem',
                    background: 'linear-gradient(135deg, #667eea, #764ba2)',
                    border: 'none',
                    borderRadius: '100px',
                    color: '#fff',
                    fontWeight: 800,
                    fontSize: '1.1rem',
                    cursor: 'pointer',
                    boxShadow: '0 20px 40px rgba(102, 126, 234, 0.4)',
                    fontFamily: "'Space Grotesk', sans-serif"
                  }}
                >
                  Reset All Filters
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
                padding: 'clamp(4rem, 10vw, 6rem) clamp(2rem, 5vw, 4rem)',
                position: 'relative',
                overflow: 'hidden',
                borderColor: 'rgba(102, 126, 234, 0.3)'
              }}
            >
              {/* Background Effects */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.08), rgba(118, 75, 162, 0.08))',
                  pointerEvents: 'none'
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '600px',
                  height: '600px',
                  background: 'radial-gradient(circle, rgba(102, 126, 234, 0.15), transparent)',
                  filter: 'blur(80px)',
                  pointerEvents: 'none',
                  animation: 'float 8s ease-in-out infinite'
                }}
              />

              <div style={{ position: 'relative', zIndex: 1 }}>
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '1rem',
                    padding: '0.75rem 2rem',
                    background: 'rgba(102, 126, 234, 0.15)',
                    border: '1px solid rgba(102, 126, 234, 0.4)',
                    borderRadius: '100px',
                    color: '#667eea',
                    fontSize: '1rem',
                    fontWeight: 700,
                    marginBottom: '2.5rem',
                    fontFamily: "'JetBrains Mono', monospace"
                  }}
                >
                  <Sparkles size={20} />
                  {'<lets-collaborate/>'}
                </div>

                <h2
                  className="gradient-text-neon"
                  style={{
                    fontSize: 'clamp(2.5rem, 8vw, 5rem)',
                    fontWeight: 900,
                    marginBottom: '2rem',
                    fontFamily: "'Orbitron', sans-serif",
                    letterSpacing: '-0.02em'
                  }}
                >
                  Ready to Build
                  <br />
                  Something Amazing?
                </h2>

                <p
                  style={{
                    fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)',
                    color: '#cbd5e0',
                    maxWidth: '800px',
                    margin: '0 auto 3.5rem',
                    lineHeight: 1.8
                  }}
                >
                  From initial concept to production deployment, I bring ideas to life with
                  cutting-edge AI, scalable architecture, and pixel-perfect design
                </p>

                <div
                  style={{
                    display: 'flex',
                    gap: '1.5rem',
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                    marginBottom: '3rem'
                  }}
                >
                  <a
                    href={developerInfo.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass-button hover-lift"
                    style={{
                      padding: '1.5rem 3rem',
                      borderRadius: '100px',
                      fontSize: '1.2rem',
                      fontWeight: 800,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      textDecoration: 'none',
                      color: '#a855f7',
                      borderColor: 'rgba(168, 85, 247, 0.5)',
                      fontFamily: "'Space Grotesk', sans-serif"
                    }}
                  >
                    <Github size={24} />
                    View All Repositories
                  </a>

                  <button
                    onClick={() => setShowContact(true)}
                    className="hover-lift shimmer-effect"
                    style={{
                      padding: '1.5rem 3rem',
                      borderRadius: '100px',
                      fontSize: '1.2rem',
                      fontWeight: 800,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      background: 'linear-gradient(135deg, #667eea, #764ba2)',
                      color: '#fff',
                      border: 'none',
                      cursor: 'pointer',
                      boxShadow: '0 20px 40px rgba(102, 126, 234, 0.4)',
                      fontFamily: "'Space Grotesk', sans-serif"
                    }}
                  >
                    <Send size={24} />
                    Let's Connect
                  </button>
                </div>

                <div
                  style={{
                    display: 'flex',
                    gap: '2rem',
                    justifyContent: 'center',
                    flexWrap: 'wrap'
                  }}
                >
                  {[
                    { icon: Mail, label: 'Email', value: developerInfo.email.split('@')[0] },
                    { icon: MapPin, label: 'Location', value: developerInfo.location.split(',')[0] },
                    { icon: Clock, label: 'Availability', value: 'Open' }
                  ].map((item, i) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={i}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.75rem',
                          padding: '1rem 1.5rem',
                          background: 'rgba(255, 255, 255, 0.03)',
                          borderRadius: '100px',
                          border: '1px solid rgba(255, 255, 255, 0.1)'
                        }}
                      >
                        <Icon size={20} style={{ color: '#667eea' }} />
                        <div style={{ textAlign: 'left' }}>
                          <div
                            style={{
                              fontSize: '0.75rem',
                              color: '#718096',
                              marginBottom: '0.2rem',
                              textTransform: 'uppercase',
                              letterSpacing: '0.5px'
                            }}
                          >
                            {item.label}
                          </div>
                          <div
                            style={{
                              fontSize: '0.9rem',
                              color: '#cbd5e0',
                              fontWeight: 600
                            }}
                          >
                            {item.value}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer
            style={{
              padding: '3rem 0',
              borderTop: '1px solid rgba(255, 255, 255, 0.1)',
              textAlign: 'center'
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '2rem',
                marginBottom: '2rem',
                flexWrap: 'wrap'
              }}
            >
              {[
                { icon: Github, url: developerInfo.github, color: '#a855f7' },
                { icon: Linkedin, url: developerInfo.linkedin, color: '#0077b5' },
                { icon: Mail, url: `mailto:${developerInfo.email}`, color: '#667eea' }
              ].map((social, i) => {
                const Icon = social.icon;
                return (
                  <a
                    key={i}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass-button hover-lift"
                    style={{
                      width: '60px',
                      height: '60px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      textDecoration: 'none',
                      borderColor: `${social.color}40`
                    }}
                  >
                    <Icon size={24} style={{ color: social.color }} />
                  </a>
                );
              })}
            </div>

            <p
              style={{
                color: '#718096',
                fontSize: '1rem',
                fontFamily: "'JetBrains Mono', monospace"
              }}
            >
              © 2025 {developerInfo.name}. Built with React + AI ⚡
            </p>
          </footer>
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
              maxWidth: '1400px',
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
              className="glass-button hover-lift"
              style={{
                position: 'absolute',
                top: '2rem',
                right: '2rem',
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 10,
                borderColor: 'rgba(255, 0, 0, 0.5)',
                background: 'rgba(0, 0, 0, 0.5)'
              }}
            >
              <X size={28} color="#ff4444" />
            </button>

            {/* Modal Header Image */}
            <div style={{ position: 'relative', height: '400px', overflow: 'hidden' }}>
              <img
                src={activeProject.img}
                alt={activeProject.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: '24px 24px 0 0'
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 50%)'
                }}
              />
            </div>

            {/* Modal Content */}
            <div style={{ padding: 'clamp(2rem, 5vw, 4rem)' }}>
              {/* Title & Category */}
              <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '1rem',
                    padding: '0.75rem 2rem',
                    background: `linear-gradient(135deg, ${activeProject.color}25, ${activeProject.color}15)`,
                    border: `2px solid ${activeProject.color}50`,
                    borderRadius: '100px',
                    color: activeProject.color,
                    fontSize: '1rem',
                    fontWeight: 800,
                    marginBottom: '2rem',
                    textTransform: 'uppercase',
                    letterSpacing: '1px'
                  }}
                >
                  <div
                    style={{
                      fontSize: '1.5rem'
                    }}
                  >
                    {activeProject.icon}
                  </div>
                  {activeProject.category}
                </div>

                <h2
                  style={{
                    fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                    fontWeight: 900,
                    background: `linear-gradient(135deg, ${activeProject.color}, #ffffff)`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    marginBottom: '1.5rem',
                    fontFamily: "'Orbitron', sans-serif",
                    letterSpacing: '-0.02em'
                  }}
                >
                  {activeProject.title}
                </h2>

                <p
                  style={{
                    fontSize: '1.3rem',
                    color: '#cbd5e0',
                    lineHeight: 1.8,
                    maxWidth: '900px',
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
                  marginBottom: '4rem'
                }}
              >
                <div
                  className="glass-card hover-lift"
                  style={{
                    padding: '2.5rem',
                    borderColor: 'rgba(239, 68, 68, 0.4)'
                  }}
                >
                  <h4
                    style={{
                      color: '#ef4444',
                      fontSize: '1.5rem',
                      fontWeight: 900,
                      marginBottom: '1.5rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      fontFamily: "'Space Grotesk', sans-serif"
                    }}
                  >
                    <AlertCircle size={28} />
                    Problem Statement
                  </h4>
                  <p style={{ color: '#cbd5e0', lineHeight: 1.7, fontSize: '1.05rem' }}>
                    {activeProject.problem}
                  </p>
                </div>

                <div
                  className="glass-card hover-lift"
                  style={{
                    padding: '2.5rem',
                    borderColor: 'rgba(34, 197, 94, 0.4)'
                  }}
                >
                  <h4
                    style={{
                      color: '#22c55e',
                      fontSize: '1.5rem',
                      fontWeight: 900,
                      marginBottom: '1.5rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      fontFamily: "'Space Grotesk', sans-serif"
                    }}
                  >
                    <Lightbulb size={28} />
                    Solution Approach
                  </h4>
                  <p style={{ color: '#cbd5e0', lineHeight: 1.7, fontSize: '1.05rem' }}>
                    {activeProject.solution}
                  </p>
                </div>
              </div>

              {/* My Role */}
              <div
                className="glass-card hover-lift"
                style={{
                  padding: '2.5rem',
                  marginBottom: '4rem',
                  borderColor: `${activeProject.color}50`
                }}
              >
                <h4
                  style={{
                    color: activeProject.color,
                    fontSize: '1.5rem',
                    fontWeight: 900,
                    marginBottom: '1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    fontFamily: "'Space Grotesk', sans-serif"
                  }}
                >
                  <Briefcase size={28} />
                  My Role & Responsibilities
                </h4>
                <p style={{ color: '#cbd5e0', lineHeight: 1.8, fontSize: '1.05rem' }}>
                  {activeProject.myRole}
                </p>
              </div>

              {/* Tech Stack */}
              <div style={{ marginBottom: '4rem' }}>
                <h4
                  style={{
                    fontSize: '2rem',
                    fontWeight: 900,
                    color: activeProject.color,
                    marginBottom: '2rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    fontFamily: "'Space Grotesk', sans-serif"
                  }}
                >
                  <Code size={32} />
                  Technology Stack
                </h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                  {activeProject.techUsed.map((tech) => (
                    <span
                      key={tech}
                      className="glass-card hover-lift"
                      style={{
                        padding: '1rem 1.75rem',
                        borderColor: `${activeProject.color}40`,
                        color: activeProject.color,
                        fontSize: '1rem',
                        fontWeight: 700,
                        fontFamily: "'JetBrains Mono', monospace"
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Impact */}
              <div style={{ marginBottom: '4rem' }}>
                <h4
                  style={{
                    fontSize: '2rem',
                    fontWeight: 900,
                    color: '#ffd700',
                    marginBottom: '2rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    fontFamily: "'Space Grotesk', sans-serif"
                  }}
                >
                  <Trophy size={32} />
                  Impact & Results
                </h4>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '1.5rem'
                  }}
                >
                  {activeProject.impact.map((item, idx) => (
                    <div
                      key={idx}
                      className="glass-card hover-lift"
                      style={{
                        padding: '2rem',
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '1rem',
                        borderColor: 'rgba(255, 215, 0, 0.3)'
                      }}
                    >
                      <CheckCircle2 size={24} style={{ color: '#ffd700', flexShrink: 0, marginTop: '0.2rem' }} />
                      <span style={{ color: '#cbd5e0', lineHeight: 1.7, fontSize: '1.05rem' }}>
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
                  gap: '2rem',
                  justifyContent: 'center',
                  marginBottom: '4rem'
                }}
              >
                {Object.entries(activeProject.stats).map(([key, value]) => (
                  <div
                    key={key}
                    className="glass-card hover-lift card-3d"
                    style={{
                      padding: '2rem 2.5rem',
                      minWidth: '200px',
                      textAlign: 'center',
                      borderColor: `${activeProject.color}50`
                    }}
                  >
                    <div
                      style={{
                        fontSize: '2.5rem',
                        fontWeight: 900,
                        color: activeProject.color,
                        marginBottom: '0.75rem',
                        fontFamily: "'Orbitron', sans-serif",
                        textShadow: `0 0 20px ${activeProject.color}50`
                      }}
                    >
                      {value}
                    </div>
                    <div
                      style={{
                        fontSize: '0.9rem',
                        color: '#a0aec0',
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                        fontWeight: 700
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
                  gap: '2rem',
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
                      padding: '1.5rem 3rem',
                      borderRadius: '100px',
                      fontSize: '1.2rem',
                      fontWeight: 800,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      textDecoration: 'none',
                      color: '#a855f7',
                      borderColor: 'rgba(168, 85, 247, 0.5)',
                      fontFamily: "'Space Grotesk', sans-serif"
                    }}
                  >
                    <Github size={24} />
                    View Source Code
                  </a>
                )}
                {activeProject.live && (
                  <a
                    href={activeProject.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover-lift shimmer-effect"
                    style={{
                      padding: '1.5rem 3rem',
                      borderRadius: '100px',
                      fontSize: '1.2rem',
                      fontWeight: 800,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      textDecoration: 'none',
                      background: `linear-gradient(135deg, ${activeProject.color}, ${activeProject.color}dd)`,
                      color: '#000',
                      border: 'none',
                      boxShadow: `0 30px 60px rgba(${activeProject.glowRGB}, 0.5)`,
                      fontFamily: "'Space Grotesk', sans-serif"
                    }}
                  >
                    <Rocket size={24} />
                    Launch Live Demo
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Contact Modal */}
      {showContact && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.95)',
            backdropFilter: 'blur(20px)',
            zIndex: 10000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
            animation: 'fadeInScale 0.3s ease-out'
          }}
          onClick={() => setShowContact(false)}
        >
          <div
            className="glass-card"
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: '600px',
              width: '100%',
              padding: 'clamp(2rem, 5vw, 4rem)',
              position: 'relative',
              borderColor: 'rgba(102, 126, 234, 0.5)'
            }}
          >
            <button
              onClick={() => setShowContact(false)}
              className="glass-button hover-lift"
              style={{
                position: 'absolute',
                top: '2rem',
                right: '2rem',
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <X size={24} color="#667eea" />
            </button>

            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <h2
                className="gradient-text-neon"
                style={{
                  fontSize: 'clamp(2rem, 5vw, 3rem)',
                  fontWeight: 900,
                  marginBottom: '1rem',
                  fontFamily: "'Orbitron', sans-serif"
                }}
              >
                Get In Touch
              </h2>
              <p style={{ color: '#a0aec0', fontSize: '1.1rem' }}>
                Let's discuss your next big project
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {[
                { icon: Mail, label: 'Email', value: developerInfo.email, href: `mailto:${developerInfo.email}` },
                { icon: Github, label: 'GitHub', value: '@bhagavan444', href: developerInfo.github },
                { icon: Linkedin, label: 'LinkedIn', value: 'Connect on LinkedIn', href: developerInfo.linkedin },
                { icon: MapPin, label: 'Location', value: developerInfo.location, href: null }
              ].map((contact, i) => {
                const Icon = contact.icon;
                const content = (
                  <div
                    className="glass-card hover-lift"
                    style={{
                      padding: '1.5rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1.5rem',
                      cursor: contact.href ? 'pointer' : 'default'
                    }}
                  >
                    <div
                      style={{
                        width: '60px',
                        height: '60px',
                        borderRadius: '16px',
                        background: 'linear-gradient(135deg, #667eea20, #764ba220)',
                        border: '2px solid rgba(102, 126, 234, 0.3)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <Icon size={28} style={{ color: '#667eea' }} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          fontSize: '0.85rem',
                          color: '#718096',
                          marginBottom: '0.25rem',
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px',
                          fontWeight: 600
                        }}
                      >
                        {contact.label}
                      </div>
                      <div
                        style={{
                          fontSize: '1.05rem',
                          color: '#cbd5e0',
                          fontWeight: 600
                        }}
                      >
                        {contact.value}
                      </div>
                    </div>
                    {contact.href && (
                      <ExternalLink size={20} style={{ color: '#667eea' }} />
                    )}
                  </div>
                );

                return contact.href ? (
                  <a
                    key={i}
                    href={contact.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: 'none' }}
                  >
                    {content}
                  </a>
                ) : (
                  <div key={i}>{content}</div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}