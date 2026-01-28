"use client";
import { useState, useEffect, useRef } from "react";
import {
  Trophy, Award, Users, Target, TrendingUp, Zap, Star, Medal,
  Sparkles, X, CheckCircle2, Rocket, Brain, Code2, Flame,
  Crown, Globe, Cpu, Database, Lock, GitBranch, Terminal,
  Download, ExternalLink, Share2, Heart, Eye, Clock,
  ArrowRight, ChevronRight, BadgeCheck, ShieldCheck,
  Code, Server, Layers, GitPullRequest, GitCommit,
  Hexagon, Shield, Swords, Gem, Skull, Radio, Activity,
  LineChart, BarChart3, PieChart, Briefcase, GraduationCap,
  Lightbulb, Workflow, Network, Boxes, CircuitBoard
} from "lucide-react";

const achievements = [
  {
    id: 1,
    category: "Competition Excellence",
    icon: Trophy,
    title: "National Hackathon Champion",
    subtitle: "Brainovision National Talent Hunt 2024",
    rank: "1st Place • National Winner",
    description: "Led complete full-stack architecture in a high-stakes 24-hour national championship. Engineered a production-grade MERN electronics marketplace featuring real-time bidding, WebSocket communications, military-grade JWT security, granular RBAC, and zero-downtime deployment strategy.",
    highlights: [
      "Architected complete microservices infrastructure & MongoDB schema design",
      "Engineered 20+ secure REST APIs with rate limiting & caching layers",
      "Built responsive React SPA with Redux Toolkit & optimistic UI updates",
      "Deployed with Docker containerization achieving 99.99% uptime SLA",
      "Implemented real-time notifications using Socket.io cluster mode"
    ],
    impact: [
      "Won ₹50,000 prize + featured in national tech publications",
      "Selected for exclusive industry mentorship with Fortune 500 CTOs",
      "Project adopted as case study for university curriculum"
    ],
    tech: ["React", "Node.js", "Express", "MongoDB", "Socket.io", "JWT", "Redux", "Docker", "Nginx", "Redis"],
    color: "#0ea5e9",
    secondaryColor: "#3b82f6",
    gradient: "linear-gradient(135deg, #0ea5e9 0%, #3b82f6 100%)",
    rarity: "Legendary",
    year: "2024",
    certificate: true,
    stats: { technical: 98, leadership: 95, innovation: 97, impact: 96 },
    metrics: { duration: "24 hours", team: "5 members", lines: "8,500+", commits: "147" }
  },
  {
    id: 2,
    category: "Professional Certification",
    icon: GraduationCap,
    title: "15+ Elite Industry Certifications",
    subtitle: "Multi-Domain Technical Excellence",
    rank: "Top 1% Global Percentile",
    description: "Achieved comprehensive mastery across cutting-edge technology domains through rigorous certification programs from world-leading platforms including AWS, Microsoft, Google Cloud, and specialized AI/ML institutions.",
    highlights: [
      "Generative AI & Large Language Models (GPT, BERT, Transformers)",
      "Advanced ML/DL: Neural Networks, CNNs, RNNs, Transfer Learning",
      "Full-Stack Engineering: MERN, Next.js, TypeScript, GraphQL",
      "Cloud Architecture: AWS Solutions Architect, Azure DevOps Engineer",
      "DevOps Excellence: Kubernetes, Docker, CI/CD, Infrastructure as Code",
      "Data Structures & Algorithms: Advanced Problem Solving & System Design"
    ],
    impact: [
      "Recognized in top 1% of certified professionals globally",
      "Knowledge directly applied across 8+ production-grade systems",
      "Contributed to 5000+ developer community through technical writing"
    ],
    tech: ["Python", "TensorFlow", "PyTorch", "AWS", "Azure", "Kubernetes", "Docker", "Git", "Terraform"],
    color: "#8b5cf6",
    secondaryColor: "#a78bfa",
    gradient: "linear-gradient(135deg, #8b5cf6 0%, #a78bfa 100%)",
    rarity: "Legendary",
    year: "2023–2025",
    stats: { technical: 96, dedication: 98, breadth: 94, depth: 95 },
    metrics: { certifications: "15+", hours: "2,400+", platforms: "8", domains: "6" }
  },
  {
    id: 3,
    category: "Production Engineering",
    icon: Rocket,
    title: "8+ Enterprise-Grade Projects",
    subtitle: "End-to-End System Ownership",
    rank: "Full-Stack Architect",
    description: "Designed, developed, and successfully deployed 8+ complete production systems serving thousands of users. Each project demonstrates enterprise-level architecture, security best practices, performance optimization, and scalable infrastructure.",
    highlights: [
      "Multi-factor authentication with JWT, OAuth 2.0 & biometric integration",
      "High-performance REST & GraphQL APIs with smart caching strategies",
      "Real-time collaboration features: WebSockets, SSE, operational transforms",
      "Automated CI/CD pipelines: GitHub Actions, Jenkins, ArgoCD",
      "Performance engineering: Lighthouse 95+ scores, sub-200ms TTFB",
      "Security hardening: OWASP compliance, penetration testing, zero CVEs"
    ],
    impact: [
      "Serving 5,000+ active users across multiple production platforms",
      "Zero critical security incidents in 18 months of operation",
      "Featured in tech community showcases with 2,100+ GitHub stars"
    ],
    tech: ["React", "Next.js", "Node.js", "TypeScript", "PostgreSQL", "MongoDB", "AWS", "Redis", "Elasticsearch"],
    color: "#ec4899",
    secondaryColor: "#f472b6",
    gradient: "linear-gradient(135deg, #ec4899 0%, #f472b6 100%)",
    rarity: "Epic",
    year: "2023–2025",
    stats: { architecture: 95, security: 97, performance: 94, scalability: 96 },
    metrics: { projects: "8+", users: "5,000+", uptime: "99.9%", deploys: "200+" }
  },
  {
    id: 4,
    category: "Open Source Impact",
    icon: GitBranch,
    title: "Active OSS Contributor",
    subtitle: "Community-Driven Development",
    rank: "Maintainer & Creator",
    description: "Actively contributing to open-source ecosystem through original project creation, major library contributions, and community leadership. Building tools that empower developers worldwide.",
    highlights: [
      "Created 5+ developer productivity tools with 10,000+ npm downloads",
      "Contributed to major frameworks: React ecosystem, Node.js libraries",
      "Maintained 3 popular repositories with 2,100+ collective GitHub stars",
      "Active technical reviewer in 50+ PRs across various projects",
      "Published technical articles reaching 15,000+ monthly readers"
    ],
    impact: [
      "Tools used by developers at Google, Microsoft, and startups globally",
      "Projects featured in GitHub Trending & JavaScript Weekly",
      "Mentored 20+ first-time open source contributors"
    ],
    tech: ["TypeScript", "React", "Node.js", "Rust", "Go", "WebAssembly", "Git"],
    color: "#10b981",
    secondaryColor: "#34d399",
    gradient: "linear-gradient(135deg, #10b981 0%, #34d399 100%)",
    rarity: "Epic",
    year: "2024–2025",
    stats: { contribution: 92, community: 88, innovation: 94, documentation: 90 },
    metrics: { repos: "12+", stars: "2.1K+", downloads: "10K+", prs: "150+" }
  },
  {
    id: 5,
    category: "Technical Leadership",
    icon: Users,
    title: "Team Lead & Mentor",
    subtitle: "Building High-Performance Teams",
    rank: "Technical Lead",
    description: "Led cross-functional engineering teams in delivering complex software solutions. Mentored junior developers, established coding standards, and drove technical decision-making for mission-critical projects.",
    highlights: [
      "Led 3 major product launches with 100% on-time delivery",
      "Mentored 15+ developers in full-stack engineering & best practices",
      "Established team coding standards & architecture review processes",
      "Conducted 50+ technical interviews & grew engineering team 3x",
      "Implemented agile workflows increasing team velocity by 40%"
    ],
    impact: [
      "Teams consistently rated 4.8/5 in engineering satisfaction surveys",
      "Reduced production bugs by 60% through code review excellence",
      "Mentees secured positions at FAANG & unicorn startups"
    ],
    tech: ["Agile", "Scrum", "System Design", "Architecture", "Code Review", "CI/CD"],
    color: "#f59e0b",
    secondaryColor: "#fbbf24",
    gradient: "linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)",
    rarity: "Epic",
    year: "2024–2025",
    stats: { leadership: 94, mentorship: 96, delivery: 95, collaboration: 93 },
    metrics: { team_size: "12", projects: "5", mentees: "15+", velocity: "+40%" }
  },
  {
    id: 6,
    category: "Innovation & Research",
    icon: Lightbulb,
    title: "AI/ML Research Projects",
    subtitle: "Cutting-Edge Technology Innovation",
    rank: "Research Engineer",
    description: "Pioneered innovative AI/ML solutions addressing real-world problems. Published research, built novel algorithms, and deployed intelligent systems leveraging latest advances in artificial intelligence.",
    highlights: [
      "Developed custom transformer models for domain-specific NLP tasks",
      "Built computer vision pipeline achieving 94% accuracy in production",
      "Implemented reinforcement learning agent for autonomous optimization",
      "Published 3 technical papers on ML optimization techniques",
      "Created explainable AI framework for model interpretability"
    ],
    impact: [
      "Research cited in 25+ academic papers and industry blogs",
      "AI models processing 100,000+ predictions daily in production",
      "Contributed to advancing state-of-the-art in specialized domains"
    ],
    tech: ["Python", "TensorFlow", "PyTorch", "Hugging Face", "OpenAI", "scikit-learn", "CUDA"],
    color: "#ef4444",
    secondaryColor: "#f87171",
    gradient: "linear-gradient(135deg, #ef4444 0%, #f87171 100%)",
    rarity: "Legendary",
    year: "2023–2025",
    stats: { research: 93, innovation: 97, implementation: 91, impact: 94 },
    metrics: { papers: "3", models: "8+", accuracy: "94%", citations: "25+" }
  }
];

const metrics = [
  { label: "Production Systems", value: "8+", icon: Rocket, color: "#0ea5e9", subtext: "Enterprise Grade" },
  { label: "Technologies Mastered", value: "35+", icon: Cpu, color: "#8b5cf6", subtext: "Full Stack" },
  { label: "Lines of Code", value: "25K+", icon: Code2, color: "#ec4899", subtext: "Written" },
  { label: "GitHub Stars", value: "2.1K+", icon: Star, color: "#fbbf24", subtext: "Community" },
  { label: "Hackathon Victories", value: "3", icon: Trophy, color: "#10b981", subtext: "National Level" },
  { label: "Certifications", value: "15+", icon: Award, color: "#f59e0b", subtext: "Elite Credentials" },
  { label: "Active Users", value: "5K+", icon: Users, color: "#06b6d4", subtext: "Serving" },
  { label: "Team Members Led", value: "12+", icon: Network, color: "#a855f7", subtext: "Leadership" }
];

const skills = [
  { name: "System Architecture", level: 96, category: "Backend", color: "#0ea5e9" },
  { name: "React/Next.js", level: 98, category: "Frontend", color: "#3b82f6" },
  { name: "Node.js/Express", level: 95, category: "Backend", color: "#10b981" },
  { name: "AI/ML Engineering", level: 92, category: "AI/ML", color: "#8b5cf6" },
  { name: "Cloud Infrastructure", level: 94, category: "DevOps", color: "#f59e0b" },
  { name: "Database Design", level: 97, category: "Backend", color: "#ec4899" },
  { name: "TypeScript", level: 96, category: "Languages", color: "#06b6d4" },
  { name: "DevOps/CI-CD", level: 93, category: "DevOps", color: "#ef4444" }
];

export default function EliteAchievements() {
  const [hoveredId, setHoveredId] = useState(null);
  const [activeAchievement, setActiveAchievement] = useState(null);
  const [activeMetric, setActiveMetric] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState({});
  const canvasRef = useRef(null);
  const observerRef = useRef(null);

  // Intersection Observer for scroll animations
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    return () => observerRef.current?.disconnect();
  }, []);

  // Advanced particle system
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;
    let time = 0;
    let particles = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = Math.max(document.documentElement.scrollHeight, window.innerHeight);
    };
    resize();

    // Initialize particles
    particles = Array.from({ length: 80 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      radius: Math.random() * 1.5 + 0.5,
      color: ['#0ea5e9', '#8b5cf6', '#ec4899', '#10b981', '#f59e0b'][Math.floor(Math.random() * 5)],
      pulse: Math.random() * Math.PI * 2,
      life: Math.random()
    }));

    const animate = () => {
      time += 0.005;
      
      ctx.fillStyle = 'rgba(0, 0, 0, 0.03)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Grid background
      ctx.strokeStyle = 'rgba(100, 100, 255, 0.03)';
      ctx.lineWidth = 1;
      const gridSize = 50;
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Update and draw particles
      particles.forEach((particle, i) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.pulse += 0.02;
        particle.life += 0.001;

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        // Connect nearby particles
        particles.slice(i + 1).forEach(other => {
          const dx = other.x - particle.x;
          const dy = other.y - particle.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            const alpha = (1 - dist / 120) * 0.15;
            ctx.strokeStyle = `${particle.color}${Math.floor(alpha * 255).toString(16).padStart(2, '0')}`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
            ctx.stroke();
          }
        });

        // Draw particle with glow
        const pulseSize = particle.radius * (1 + Math.sin(particle.pulse) * 0.3);
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, pulseSize * 4
        );
        gradient.addColorStop(0, `${particle.color}60`);
        gradient.addColorStop(0.5, `${particle.color}20`);
        gradient.addColorStop(1, 'transparent');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, pulseSize * 4, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, pulseSize, 0, Math.PI * 2);
        ctx.fill();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();
    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    const handleScroll = () => setScrollY(window.scrollY);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700&display=swap');

        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { overflow-x: hidden; font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes slideInFromLeft {
          from { opacity: 0; transform: translateX(-50px); }
          to { opacity: 1; transform: translateX(0); }
        }

        @keyframes slideInFromRight {
          from { opacity: 0; transform: translateX(50px); }
          to { opacity: 1; transform: translateX(0); }
        }

        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }

        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }

        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .glass-card {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(20px) saturate(180%);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 24px;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .glass-card:hover {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(255, 255, 255, 0.2);
          transform: translateY(-8px);
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
        }

        .gradient-text {
          background: linear-gradient(135deg, #0ea5e9, #8b5cf6, #ec4899);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: gradientShift 3s ease infinite;
        }

        .stat-bar {
          height: 8px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 100px;
          overflow: hidden;
          position: relative;
        }

        .stat-fill {
          height: 100%;
          border-radius: 100px;
          position: relative;
          transition: width 1.5s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .stat-fill::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
          animation: shimmer 2s infinite;
        }

        .tech-tag {
          padding: 8px 16px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 100px;
          font-size: 13px;
          font-weight: 600;
          transition: all 0.3s;
          font-family: 'JetBrains Mono', monospace;
        }

        .tech-tag:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.2);
          transform: translateY(-2px);
        }

        .btn-primary {
          padding: 16px 32px;
          background: linear-gradient(135deg, #0ea5e9, #3b82f6);
          border: none;
          border-radius: 12px;
          color: white;
          font-weight: 700;
          font-size: 15px;
          cursor: pointer;
          transition: all 0.3s;
          box-shadow: 0 8px 24px rgba(14, 165, 233, 0.3);
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 32px rgba(14, 165, 233, 0.4);
        }

        .btn-secondary {
          padding: 16px 32px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 12px;
          color: white;
          font-weight: 600;
          font-size: 15px;
          cursor: pointer;
          transition: all 0.3s;
          backdrop-filter: blur(10px);
        }

        .btn-secondary:hover {
          background: rgba(255, 255, 255, 0.1);
          transform: translateY(-2px);
        }

        @media (max-width: 768px) {
          .glass-card:hover {
            transform: translateY(-4px);
          }
        }

        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: rgba(0, 0, 0, 0.3); }
        ::-webkit-scrollbar-thumb { 
          background: linear-gradient(180deg, #0ea5e9, #8b5cf6);
          border-radius: 10px;
        }
        ::-webkit-scrollbar-thumb:hover { 
          background: linear-gradient(180deg, #3b82f6, #a78bfa);
        }
      `}</style>

      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(to bottom, #000000, #0a0a0f, #000000)',
        color: 'white',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background canvas */}
        <canvas
          ref={canvasRef}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            zIndex: 0
          }}
        />

        {/* Gradient orbs */}
        <div style={{
          position: 'fixed',
          top: '10%',
          left: '10%',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(14,165,233,0.15), transparent 70%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
          zIndex: 1
        }} />
        <div style={{
          position: 'fixed',
          top: '50%',
          right: '10%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(139,92,246,0.15), transparent 70%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
          zIndex: 1
        }} />

        {/* Mouse follower */}
        <div style={{
          position: 'fixed',
          left: mousePos.x - 150,
          top: mousePos.y - 150,
          width: '300px',
          height: '300px',
          background: 'radial-gradient(circle, rgba(236,72,153,0.1), transparent 70%)',
          pointerEvents: 'none',
          zIndex: 2,
          transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
          filter: 'blur(40px)'
        }} />

        <div style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '120px 24px 80px'
        }}>
          {/* Header Section */}
          <div style={{ textAlign: 'center', marginBottom: '120px' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px 24px',
              background: 'rgba(14, 165, 233, 0.1)',
              border: '1px solid rgba(14, 165, 233, 0.3)',
              borderRadius: '100px',
              marginBottom: '32px',
              animation: 'fadeInUp 0.6s ease-out'
            }}>
              <Shield size={20} color="#0ea5e9" />
              <span style={{ 
                fontSize: '14px',
                fontWeight: 700,
                letterSpacing: '1px',
                textTransform: 'uppercase',
                color: '#0ea5e9'
              }}>
                Elite Developer Portfolio • 2026
              </span>
            </div>

            <h1 className="gradient-text" style={{
              fontSize: 'clamp(48px, 8vw, 96px)',
              fontWeight: 900,
              marginBottom: '24px',
              letterSpacing: '-2px',
              lineHeight: 1,
              animation: 'fadeInUp 0.8s ease-out'
            }}>
              Achievements
            </h1>

            <div style={{
              width: '120px',
              height: '6px',
              background: 'linear-gradient(90deg, #0ea5e9, #8b5cf6, #ec4899)',
              margin: '32px auto',
              borderRadius: '100px',
              animation: 'fadeInUp 1s ease-out'
            }} />

            <p style={{
              fontSize: 'clamp(18px, 2vw, 24px)',
              color: 'rgba(255, 255, 255, 0.7)',
              maxWidth: '800px',
              margin: '0 auto',
              lineHeight: 1.6,
              fontWeight: 400,
              animation: 'fadeInUp 1.2s ease-out'
            }}>
              Engineering excellence through innovation, precision, and relentless pursuit of perfection.
              <br/>Building enterprise-grade solutions that scale.
            </p>
          </div>

          {/* Metrics Grid */}
          <div id="metrics" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '24px',
            marginBottom: '120px'
          }}>
            {metrics.map((metric, i) => (
              <div
                key={i}
                className="glass-card"
                onMouseEnter={() => setActiveMetric(i)}
                onMouseLeave={() => setActiveMetric(null)}
                style={{
                  padding: '32px 24px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  animation: `fadeInUp ${0.6 + i * 0.1}s ease-out`,
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '4px',
                  background: metric.color,
                  transform: activeMetric === i ? 'scaleX(1)' : 'scaleX(0)',
                  transformOrigin: 'left',
                  transition: 'transform 0.4s'
                }} />

                <div style={{
                  width: '64px',
                  height: '64px',
                  margin: '0 auto 16px',
                  background: `${metric.color}15`,
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'transform 0.4s',
                  transform: activeMetric === i ? 'scale(1.1) rotate(5deg)' : 'scale(1) rotate(0deg)'
                }}>
                  <metric.icon size={32} color={metric.color} strokeWidth={2} />
                </div>

                <div style={{
                  fontSize: '40px',
                  fontWeight: 900,
                  color: metric.color,
                  marginBottom: '8px',
                  fontFamily: 'JetBrains Mono, monospace'
                }}>
                  {metric.value}
                </div>

                <div style={{
                  fontSize: '15px',
                  fontWeight: 600,
                  color: 'rgba(255, 255, 255, 0.9)',
                  marginBottom: '4px',
                  letterSpacing: '0.5px'
                }}>
                  {metric.label}
                </div>

                <div style={{
                  fontSize: '13px',
                  color: 'rgba(255, 255, 255, 0.5)',
                  fontWeight: 500
                }}>
                  {metric.subtext}
                </div>
              </div>
            ))}
          </div>

          {/* Skills Section */}
          <div id="skills" style={{ marginBottom: '120px' }}>
            <h2 style={{
              fontSize: 'clamp(32px, 5vw, 48px)',
              fontWeight: 800,
              marginBottom: '48px',
              textAlign: 'center',
              letterSpacing: '-1px'
            }}>
              Core <span className="gradient-text">Technical Competencies</span>
            </h2>

            <div className="glass-card" style={{ padding: '48px' }}>
              <div style={{
                display: 'grid',
                gap: '32px'
              }}>
                {skills.map((skill, i) => (
                  <div key={i} style={{ animation: `slideInFromLeft ${0.8 + i * 0.1}s ease-out` }}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginBottom: '12px'
                    }}>
                      <div>
                        <span style={{ 
                          fontSize: '18px',
                          fontWeight: 700,
                          color: 'white'
                        }}>
                          {skill.name}
                        </span>
                        <span style={{
                          marginLeft: '12px',
                          fontSize: '14px',
                          color: 'rgba(255, 255, 255, 0.5)',
                          fontWeight: 500
                        }}>
                          {skill.category}
                        </span>
                      </div>
                      <span style={{
                        fontSize: '18px',
                        fontWeight: 700,
                        color: skill.color,
                        fontFamily: 'JetBrains Mono, monospace'
                      }}>
                        {skill.level}%
                      </span>
                    </div>
                    <div className="stat-bar">
                      <div 
                        className="stat-fill"
                        style={{
                          width: `${skill.level}%`,
                          background: `linear-gradient(90deg, ${skill.color}, ${skill.color}dd)`,
                          boxShadow: `0 0 20px ${skill.color}40`
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Achievements Grid */}
          <div id="achievements" style={{ marginBottom: '120px' }}>
            <h2 style={{
              fontSize: 'clamp(32px, 5vw, 48px)',
              fontWeight: 800,
              marginBottom: '48px',
              textAlign: 'center',
              letterSpacing: '-1px'
            }}>
              Featured <span className="gradient-text">Achievements</span>
            </h2>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
              gap: '32px'
            }}>
              {achievements.map((ach, index) => (
                <div
                  key={ach.id}
                  className="glass-card"
                  onMouseEnter={() => setHoveredId(ach.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onClick={() => setActiveAchievement(ach)}
                  style={{
                    cursor: 'pointer',
                    padding: 0,
                    overflow: 'hidden',
                    animation: `fadeInUp ${0.8 + index * 0.15}s ease-out`,
                    position: 'relative'
                  }}
                >
                  {/* Card Header */}
                  <div style={{
                    height: '220px',
                    background: ach.gradient,
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'rgba(0, 0, 0, 0.3)',
                      backdropFilter: 'blur(0px)',
                      transition: 'backdrop-filter 0.4s'
                    }} />

                    <div style={{
                      position: 'relative',
                      zIndex: 2,
                      width: '120px',
                      height: '120px',
                      background: 'rgba(255, 255, 255, 0.15)',
                      backdropFilter: 'blur(20px)',
                      borderRadius: '24px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '2px solid rgba(255, 255, 255, 0.2)',
                      transition: 'all 0.4s',
                      transform: hoveredId === ach.id ? 'scale(1.1) rotate(5deg)' : 'scale(1) rotate(0deg)'
                    }}>
                      <ach.icon size={60} color="white" strokeWidth={2} />
                    </div>

                    {/* Badges */}
                    <div style={{
                      position: 'absolute',
                      top: '16px',
                      right: '16px',
                      padding: '8px 16px',
                      background: 'rgba(0, 0, 0, 0.5)',
                      backdropFilter: 'blur(20px)',
                      borderRadius: '100px',
                      fontSize: '12px',
                      fontWeight: 700,
                      color: 'white',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}>
                      <Crown size={14} />
                      {ach.rarity}
                    </div>

                    <div style={{
                      position: 'absolute',
                      top: '16px',
                      left: '16px',
                      padding: '8px 16px',
                      background: 'rgba(0, 0, 0, 0.5)',
                      backdropFilter: 'blur(20px)',
                      borderRadius: '100px',
                      fontSize: '12px',
                      fontWeight: 600,
                      color: 'rgba(255, 255, 255, 0.9)',
                      border: '1px solid rgba(255, 255, 255, 0.2)'
                    }}>
                      {ach.year}
                    </div>
                  </div>

                  {/* Card Content */}
                  <div style={{ padding: '32px' }}>
                    <div style={{
                      fontSize: '12px',
                      fontWeight: 700,
                      color: ach.color,
                      textTransform: 'uppercase',
                      letterSpacing: '1px',
                      marginBottom: '12px'
                    }}>
                      {ach.category}
                    </div>

                    <h3 style={{
                      fontSize: '24px',
                      fontWeight: 800,
                      marginBottom: '8px',
                      letterSpacing: '-0.5px',
                      lineHeight: 1.2
                    }}>
                      {ach.title}
                    </h3>

                    <p style={{
                      fontSize: '16px',
                      fontWeight: 600,
                      color: ach.color,
                      marginBottom: '16px'
                    }}>
                      {ach.subtitle}
                    </p>

                    <div style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '8px 16px',
                      background: `${ach.color}15`,
                      border: `1px solid ${ach.color}40`,
                      borderRadius: '100px',
                      fontSize: '13px',
                      fontWeight: 600,
                      color: ach.color,
                      marginBottom: '20px'
                    }}>
                      <Target size={14} />
                      {ach.rank}
                    </div>

                    <p style={{
                      fontSize: '15px',
                      color: 'rgba(255, 255, 255, 0.7)',
                      lineHeight: 1.6,
                      marginBottom: '24px'
                    }}>
                      {ach.description.slice(0, 180)}...
                    </p>

                    {/* Quick Stats */}
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(2, 1fr)',
                      gap: '12px',
                      marginBottom: '24px'
                    }}>
                      {Object.entries(ach.stats).slice(0, 4).map(([key, value]) => (
                        <div key={key} style={{
                          padding: '12px',
                          background: 'rgba(255, 255, 255, 0.03)',
                          borderRadius: '12px',
                          border: '1px solid rgba(255, 255, 255, 0.05)'
                        }}>
                          <div style={{
                            fontSize: '20px',
                            fontWeight: 800,
                            color: ach.color,
                            marginBottom: '4px',
                            fontFamily: 'JetBrains Mono, monospace'
                          }}>
                            {value}%
                          </div>
                          <div style={{
                            fontSize: '12px',
                            color: 'rgba(255, 255, 255, 0.5)',
                            textTransform: 'capitalize',
                            fontWeight: 600
                          }}>
                            {key}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Tech Stack Preview */}
                    <div style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '8px',
                      marginBottom: '24px'
                    }}>
                      {ach.tech.slice(0, 4).map((tech, i) => (
                        <span key={i} className="tech-tag" style={{
                          color: ach.color,
                          borderColor: `${ach.color}40`
                        }}>
                          {tech}
                        </span>
                      ))}
                      {ach.tech.length > 4 && (
                        <span className="tech-tag" style={{
                          color: ach.color,
                          borderColor: `${ach.color}40`
                        }}>
                          +{ach.tech.length - 4}
                        </span>
                      )}
                    </div>

                    {/* CTA */}
                    <button className="btn-secondary" style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px'
                    }}>
                      View Full Details
                      <ArrowRight size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="glass-card" style={{
            padding: '80px 48px',
            textAlign: 'center',
            background: 'linear-gradient(135deg, rgba(14,165,233,0.1), rgba(139,92,246,0.1))',
            border: '2px solid rgba(255, 255, 255, 0.1)'
          }}>
            <Rocket size={48} color="#0ea5e9" style={{ marginBottom: '24px' }} />
            
            <h2 style={{
              fontSize: 'clamp(32px, 5vw, 56px)',
              fontWeight: 900,
              marginBottom: '16px',
              letterSpacing: '-1px'
            }}>
              Let's Build <span className="gradient-text">Something Extraordinary</span>
            </h2>

            <p style={{
              fontSize: '18px',
              color: 'rgba(255, 255, 255, 0.7)',
              maxWidth: '700px',
              margin: '0 auto 40px',
              lineHeight: 1.6
            }}>
              Ready to transform your vision into a production-grade reality?
              Let's collaborate on innovative solutions that make an impact.
            </p>

            <div style={{
              display: 'flex',
              gap: '16px',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              <button className="btn-primary" style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <Code2 size={20} />
                View Projects
              </button>

              <button className="btn-secondary" style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <Users size={20} />
                Connect on LinkedIn
              </button>

              <button className="btn-secondary" style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <GitBranch size={20} />
                GitHub Profile
              </button>
            </div>
          </div>
        </div>

        {/* Scroll to Top */}
        {scrollY > 500 && (
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            style={{
              position: 'fixed',
              bottom: '32px',
              right: '32px',
              width: '56px',
              height: '56px',
              background: 'linear-gradient(135deg, #0ea5e9, #3b82f6)',
              border: 'none',
              borderRadius: '50%',
              color: 'white',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 8px 24px rgba(14, 165, 233, 0.4)',
              transition: 'transform 0.3s',
              zIndex: 1000,
              animation: 'fadeInUp 0.4s ease-out'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <ChevronRight size={24} style={{ transform: 'rotate(-90deg)' }} />
          </button>
        )}
      </div>

      {/* Achievement Detail Modal */}
      {activeAchievement && (
        <div
          onClick={() => setActiveAchievement(null)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.95)',
            backdropFilter: 'blur(20px)',
            zIndex: 10000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
            animation: 'fadeInUp 0.3s ease-out',
            overflowY: 'auto'
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            className="glass-card"
            style={{
              maxWidth: '1200px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              background: 'rgba(10, 10, 15, 0.95)',
              border: `2px solid ${activeAchievement.color}`,
              position: 'relative'
            }}
          >
            <button
              onClick={() => setActiveAchievement(null)}
              style={{
                position: 'sticky',
                top: '24px',
                left: 'calc(100% - 80px)',
                background: 'rgba(255, 50, 50, 0.2)',
                border: '2px solid #ff3333',
                borderRadius: '50%',
                width: '48px',
                height: '48px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ff3333',
                cursor: 'pointer',
                zIndex: 10,
                marginBottom: '-48px',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.3s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 50, 50, 0.4)';
                e.currentTarget.style.transform = 'rotate(90deg)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 50, 50, 0.2)';
                e.currentTarget.style.transform = 'rotate(0deg)';
              }}
            >
              <X size={24} strokeWidth={3} />
            </button>

            {/* Modal Header */}
            <div style={{
              height: '300px',
              background: activeAchievement.gradient,
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '48px'
            }}>
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(0, 0, 0, 0.4)'
              }} />
              
              <div style={{
                position: 'relative',
                zIndex: 2,
                textAlign: 'center',
                padding: '0 24px'
              }}>
                <div style={{
                  width: '120px',
                  height: '120px',
                  margin: '0 auto 24px',
                  background: 'rgba(255, 255, 255, 0.2)',
                  backdropFilter: 'blur(20px)',
                  borderRadius: '30px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '3px solid rgba(255, 255, 255, 0.3)'
                }}>
                  <activeAchievement.icon size={64} color="white" strokeWidth={2} />
                </div>

                <h2 style={{
                  fontSize: 'clamp(32px, 5vw, 48px)',
                  fontWeight: 900,
                  marginBottom: '12px',
                  color: 'white',
                  letterSpacing: '-1px'
                }}>
                  {activeAchievement.title}
                </h2>

                <p style={{
                  fontSize: '20px',
                  fontWeight: 600,
                  color: 'rgba(255, 255, 255, 0.9)'
                }}>
                  {activeAchievement.subtitle}
                </p>
              </div>
            </div>

            <div style={{ padding: '0 48px 48px' }}>
              {/* Key Metrics */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '16px',
                marginBottom: '48px'
              }}>
                {Object.entries(activeAchievement.metrics).map(([key, value]) => (
                  <div key={key} style={{
                    padding: '24px',
                    background: 'rgba(255, 255, 255, 0.03)',
                    borderRadius: '16px',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    textAlign: 'center'
                  }}>
                    <div style={{
                      fontSize: '32px',
                      fontWeight: 900,
                      color: activeAchievement.color,
                      marginBottom: '8px',
                      fontFamily: 'JetBrains Mono, monospace'
                    }}>
                      {value}
                    </div>
                    <div style={{
                      fontSize: '14px',
                      color: 'rgba(255, 255, 255, 0.6)',
                      textTransform: 'capitalize',
                      fontWeight: 600
                    }}>
                      {key.replace('_', ' ')}
                    </div>
                  </div>
                ))}
              </div>

              {/* Description */}
              <div style={{ marginBottom: '40px' }}>
                <h3 style={{
                  fontSize: '24px',
                  fontWeight: 800,
                  marginBottom: '16px',
                  color: activeAchievement.color
                }}>
                  Overview
                </h3>
                <p style={{
                  fontSize: '16px',
                  lineHeight: 1.8,
                  color: 'rgba(255, 255, 255, 0.8)'
                }}>
                  {activeAchievement.description}
                </p>
              </div>

              {/* Highlights */}
              <div style={{ marginBottom: '40px' }}>
                <h3 style={{
                  fontSize: '24px',
                  fontWeight: 800,
                  marginBottom: '24px',
                  color: activeAchievement.color
                }}>
                  Key Achievements
                </h3>
                <div style={{ display: 'grid', gap: '12px' }}>
                  {activeAchievement.highlights.map((highlight, i) => (
                    <div key={i} style={{
                      display: 'flex',
                      gap: '16px',
                      padding: '16px',
                      background: 'rgba(255, 255, 255, 0.03)',
                      borderRadius: '12px',
                      border: '1px solid rgba(255, 255, 255, 0.05)'
                    }}>
                      <CheckCircle2 size={20} color={activeAchievement.color} style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span style={{
                        fontSize: '15px',
                        lineHeight: 1.6,
                        color: 'rgba(255, 255, 255, 0.8)'
                      }}>
                        {highlight}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Impact */}
              <div style={{ marginBottom: '40px' }}>
                <h3 style={{
                  fontSize: '24px',
                  fontWeight: 800,
                  marginBottom: '24px',
                  color: activeAchievement.color
                }}>
                  Impact & Recognition
                </h3>
                <div style={{ display: 'grid', gap: '12px' }}>
                  {activeAchievement.impact.map((item, i) => (
                    <div key={i} style={{
                      display: 'flex',
                      gap: '16px',
                      padding: '16px',
                      background: `${activeAchievement.color}10`,
                      borderRadius: '12px',
                      border: `1px solid ${activeAchievement.color}30`
                    }}>
                      <Star size={20} color={activeAchievement.color} style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span style={{
                        fontSize: '15px',
                        lineHeight: 1.6,
                        color: 'rgba(255, 255, 255, 0.8)'
                      }}>
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech Stack */}
              <div style={{ marginBottom: '40px' }}>
                <h3 style={{
                  fontSize: '24px',
                  fontWeight: 800,
                  marginBottom: '24px',
                  color: activeAchievement.color
                }}>
                  Technology Stack
                </h3>
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '12px'
                }}>
                  {activeAchievement.tech.map((tech, i) => (
                    <span key={i} className="tech-tag" style={{
                      color: activeAchievement.color,
                      borderColor: `${activeAchievement.color}40`,
                      background: `${activeAchievement.color}10`
                    }}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div>
                <h3 style={{
                  fontSize: '24px',
                  fontWeight: 800,
                  marginBottom: '24px',
                  color: activeAchievement.color
                }}>
                  Performance Metrics
                </h3>
                <div style={{ display: 'grid', gap: '20px' }}>
                  {Object.entries(activeAchievement.stats).map(([key, value]) => (
                    <div key={key}>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginBottom: '12px'
                      }}>
                        <span style={{
                          fontSize: '16px',
                          fontWeight: 700,
                          textTransform: 'capitalize',
                          color: 'white'
                        }}>
                          {key}
                        </span>
                        <span style={{
                          fontSize: '16px',
                          fontWeight: 700,
                          color: activeAchievement.color,
                          fontFamily: 'JetBrains Mono, monospace'
                        }}>
                          {value}%
                        </span>
                      </div>
                      <div className="stat-bar" style={{ height: '10px' }}>
                        <div
                          className="stat-fill"
                          style={{
                            width: `${value}%`,
                            background: activeAchievement.gradient,
                            boxShadow: `0 0 20px ${activeAchievement.color}60`
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}