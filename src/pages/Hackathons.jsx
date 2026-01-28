"use client";

import { useState, useEffect, useRef } from "react";
import {
  Trophy, Award, X, Code, Database, Shield, Rocket, Crown,
  Clock, Users, Sparkles, Zap, Star, Flame, Target, Cpu,
  Download, TrendingUp, Layers, CheckCircle2, ArrowRight, Terminal,
  Server, Lock, Brain, Github, Mail, AlertCircle, Container, Network
} from "lucide-react";

export default function EliteHackathonShowcase() {
  const [activePhase, setActivePhase] = useState(null);
  const [hoveredId, setHoveredId] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showCertificate, setShowCertificate] = useState(false);
  const [statsAnimated, setStatsAnimated] = useState(false);
  const [displayStats, setDisplayStats] = useState([]);
  const canvasRef = useRef(null);
  const statsRef = useRef(null);

  const certificateImage = "https://lh3.googleusercontent.com/d/1bkXJCzHQPbSSovbaLs4EPeKT1f9ERl5O";

  const phases = [
    {
      id: 1,
      hour: "0–6h",
      icon: Terminal,
      title: "Foundation Sprint",
      desc: "Designed system architecture with microservices approach, implemented MongoDB sharding strategy, created JWT authentication with refresh tokens, and established CI/CD pipeline foundation.",
      color: "#00f0ff",
      achievements: ["Microservices Architecture Design", "MongoDB Sharding & Indexing", "JWT + Refresh Token Auth", "Docker Container Setup"],
      techUsed: ["Node.js", "Express", "MongoDB Atlas", "JWT", "Docker"],
      challenges: "Designing scalable architecture under extreme time pressure while ensuring security best practices",
      solutions: "Implemented modular microservices with API gateway pattern and comprehensive middleware authentication layer",
      metrics: { linesOfCode: 1200, apis: 5, tests: 15 }
    },
    {
      id: 2,
      hour: "6–14h",
      icon: Code,
      title: "Core Development",
      desc: "Built RESTful APIs with advanced error handling, implemented Redux Toolkit for state management, created reusable component library with TypeScript, and integrated real-time data synchronization.",
      color: "#a78bfa",
      achievements: ["20+ REST API Endpoints", "TypeScript Component Library", "Redux Toolkit Integration", "Client-Side Routing"],
      techUsed: ["React 18", "TypeScript", "Redux Toolkit", "React Router", "Axios"],
      challenges: "Managing complex async state with multiple data sources while maintaining type safety and performance",
      solutions: "Leveraged RTK Query for automatic caching and Redux Toolkit for normalized state management",
      metrics: { linesOfCode: 2100, apis: 10, tests: 35 }
    },
    {
      id: 3,
      hour: "14–20h",
      icon: Zap,
      title: "Integration & Security",
      desc: "Integrated Socket.io with Redis adapter for horizontal scaling, implemented OAuth 2.0 flow, added rate limiting and DDoS protection, created comprehensive logging system with Winston.",
      color: "#ff61d2",
      achievements: ["WebSocket + Redis Pub/Sub", "OAuth 2.0 & RBAC", "Rate Limiting + Security", "Winston Logger System"],
      techUsed: ["Socket.io", "Redis", "OAuth 2.0", "Helmet.js", "Winston", "express-rate-limit"],
      challenges: "Securing WebSocket connections with authentication while maintaining real-time performance at scale",
      solutions: "Implemented Redis-backed Socket.io adapter with JWT middleware for connection authentication",
      metrics: { linesOfCode: 1500, apis: 4, tests: 28 }
    },
    {
      id: 4,
      hour: "20–24h",
      icon: Rocket,
      title: "Launch & Demo",
      desc: "Deployed to AWS ECS with auto-scaling, implemented CDN for static assets, added comprehensive monitoring with Prometheus, created interactive demo with live metrics dashboard.",
      color: "#10b981",
      achievements: ["AWS ECS Deployment", "CloudFront CDN", "Prometheus Monitoring", "Live Demo Dashboard"],
      techUsed: ["Docker", "AWS ECS", "CloudFront", "Nginx", "Prometheus", "Grafana"],
      challenges: "Optimizing bundle size and achieving sub-second load times while deploying complex microservices",
      solutions: "Implemented code splitting, lazy loading, aggressive caching, and containerized services",
      metrics: { linesOfCode: 200, apis: 1, tests: 12 }
    }
  ];

  const techStack = [
    { icon: Database, name: "MongoDB", desc: "Distributed NoSQL with sharding", color: "#10b981", proficiency: 95 },
    { icon: Server, name: "Express.js", desc: "High-performance REST API", color: "#00f0ff", proficiency: 92 },
    { icon: Sparkles, name: "React", desc: "Component-based UI library", color: "#8b5cf6", proficiency: 98 },
    { icon: Layers, name: "Node.js", desc: "Async I/O runtime", color: "#ec4899", proficiency: 90 },
    { icon: Lock, name: "JWT & OAuth", desc: "Token-based authentication", color: "#f59e0b", proficiency: 88 },
    { icon: Zap, name: "Socket.io", desc: "Real-time communication", color: "#3b82f6", proficiency: 85 },
    { icon: Container, name: "Docker", desc: "Containerization", color: "#06b6d4", proficiency: 87 },
    { icon: Network, name: "Redis", desc: "In-memory data store", color: "#dc2626", proficiency: 84 }
  ];

  const stats = [
    { label: "Duration", value: 24, unit: "hours", icon: Clock, color: "#00f0ff" },
    { label: "Team Size", value: 4, unit: "developers", icon: Users, color: "#a78bfa" },
    { label: "Code Written", value: 5000, unit: "lines", icon: Code, color: "#ff61d2" },
    { label: "Achievement", value: 1, unit: "place", icon: Trophy, color: "#10b981", isPlace: true },
    { label: "API Endpoints", value: 20, unit: "routes", icon: Server, color: "#f59e0b" },
    { label: "Test Coverage", value: 90, unit: "percent", icon: Shield, color: "#3b82f6" }
  ];

  const teamMembers = [
    { name: "Bhagavan", role: "Full-Stack Architect", avatar: "🧑‍💻", contribution: "System Design & Backend", skills: ["Node.js", "MongoDB", "AWS", "Docker"], github: "https://github.com/bhagavan444" },
    { name: "Dhanus Chandra", role: "Frontend Engineer", avatar: "👩‍💻", contribution: "UI/UX & Components", skills: ["React", "TypeScript", "Redux", "Tailwind"] },
    { name: "Pavan", role: "DevOps Engineer", avatar: "👨‍💻", contribution: "CI/CD & Infrastructure", skills: ["Docker", "Kubernetes", "AWS", "Nginx"] },
    { name: "Rahul", role: "Security Specialist", avatar: "👩‍💻", contribution: "Authentication Systems", skills: ["JWT", "OAuth", "Security", "Encryption"] }
  ];

  // Advanced particle system
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    class Particle {
      constructor() {
        this.reset();
        this.y = Math.random() * canvas.height;
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = -20;
        this.speed = Math.random() * 1.5 + 0.5;
        this.radius = Math.random() * 2 + 1;
        this.color = ['#00f0ff', '#a78bfa', '#ff61d2', '#10b981'][Math.floor(Math.random() * 4)];
        this.opacity = Math.random() * 0.5 + 0.5;
        this.pulse = Math.random() * Math.PI * 2;
      }

      update() {
        this.y += this.speed;
        this.pulse += 0.05;
        if (this.y > canvas.height + 20) this.reset();
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity * (Math.sin(this.pulse) * 0.3 + 0.7);
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    class NeuralNode {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = Math.random() * 3 + 2;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
      }

      draw() {
        ctx.fillStyle = 'rgba(0, 240, 255, 0.8)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const particles = Array.from({ length: 100 }, () => new Particle());
    const nodes = Array.from({ length: 30 }, () => new NeuralNode());

    const animate = () => {
      time += 0.005;
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      nodes.forEach((node, i) => {
        node.update();
        nodes.slice(i + 1).forEach(otherNode => {
          const dx = node.x - otherNode.x;
          const dy = node.y - otherNode.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            ctx.strokeStyle = `rgba(0, 240, 255, ${0.15 * (1 - dist / 150)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(otherNode.x, otherNode.y);
            ctx.stroke();
          }
        });
        node.draw();
      });

      particles.forEach(p => {
        p.update();
        p.draw();
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

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: (e.clientX / window.innerWidth - 0.5) * 20, y: (e.clientY / window.innerHeight - 0.5) * 20 });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const scrolled = (window.scrollY / documentHeight) * 100;
      setScrollProgress(scrolled);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animated stats
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !statsAnimated) {
          setStatsAnimated(true);
          stats.forEach((stat, index) => {
            let current = 0;
            const increment = stat.value / 60;
            const timer = setInterval(() => {
              current += increment;
              if (current >= stat.value) {
                current = stat.value;
                clearInterval(timer);
              }
              setDisplayStats(prev => {
                const updated = [...prev];
                updated[index] = Math.floor(current);
                return updated;
              });
            }, 25);
          });
        }
      },
      { threshold: 0.3 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, [statsAnimated]);

  useEffect(() => {
    setDisplayStats(stats.map(() => 0));
  }, []);

  const handleCertificateDownload = () => {
    const link = document.createElement("a");
    link.href = certificateImage;
    link.download = "Brainovision-National-Championship-Certificate-2024.jpg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Fira+Code:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700;800&display=swap');

        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { overflow-x: hidden; }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
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
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.05); }
        }

        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }

        @keyframes glow {
          0%, 100% { filter: drop-shadow(0 0 5px currentColor); }
          50% { filter: drop-shadow(0 0 20px currentColor); }
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .glass-card {
          background: rgba(10, 10, 20, 0.8);
          backdrop-filter: blur(20px);
          border: 2px solid rgba(0, 240, 255, 0.3);
          border-radius: 24px;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }

        .glass-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
          transition: left 0.5s;
        }

        .glass-card:hover::before { left: 100%; }

        .glass-card:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 15px 50px rgba(0, 240, 255, 0.3);
          border-color: var(--neon-cyan);
        }

        .neon-text {
          background: linear-gradient(135deg, #00f0ff, #a78bfa, #ff61d2, #10b981);
          background-size: 300% 300%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 8s ease infinite;
        }

        .holographic {
          background: linear-gradient(135deg, rgba(0, 240, 255, 0.1) 0%, rgba(167, 139, 250, 0.1) 25%, rgba(255, 97, 210, 0.1) 50%, rgba(16, 185, 129, 0.1) 75%);
          background-size: 400% 400%;
          animation: shimmer 10s ease infinite;
        }

        @media (max-width: 768px) {
          .glass-card:hover { transform: translateY(-5px) scale(1.01); }
          .grid-responsive { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* Scroll Progress */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: `${scrollProgress}%`,
        height: '4px',
        background: 'linear-gradient(90deg, #00f0ff, #a78bfa, #ff61d2, #10b981)',
        zIndex: 10000,
        transition: 'width 0.1s ease'
      }} />

      <div style={{
        minHeight: '100vh',
        background: '#000000',
        color: '#ffffff',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: "'Inter', sans-serif"
      }}>
        {/* Animated Background */}
        <canvas ref={canvasRef} style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 0
        }} />

        {/* Grid Overlay */}
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: 'linear-gradient(rgba(0, 240, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 240, 255, 0.03) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
          opacity: 0.5,
          pointerEvents: 'none',
          zIndex: 1
        }} />

        {/* Gradient Orbs */}
        <div style={{
          position: 'fixed',
          top: '10%',
          left: '5%',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(0, 240, 255, 0.15) 0%, transparent 70%)',
          filter: 'blur(100px)',
          animation: 'float 20s ease-in-out infinite',
          zIndex: 1
        }} />
        <div style={{
          position: 'fixed',
          bottom: '10%',
          right: '5%',
          width: '700px',
          height: '700px',
          background: 'radial-gradient(circle, rgba(167, 139, 250, 0.15) 0%, transparent 70%)',
          filter: 'blur(120px)',
          animation: 'float 25s ease-in-out infinite reverse',
          zIndex: 1
        }} />

        <div style={{
          position: 'relative',
          zIndex: 10,
          padding: 'clamp(2rem, 5vw, 4rem) clamp(1rem, 3vw, 2rem)',
          maxWidth: '1600px',
          margin: '0 auto'
        }}>
          {/* Hero Section */}
          <div style={{
            textAlign: 'center',
            marginBottom: 'clamp(3rem, 6vw, 5rem)',
            animation: 'fadeInUp 1s ease-out',
            transform: `translate3d(${mousePosition.x}px, ${mousePosition.y}px, 0)`,
            transition: 'transform 0.3s ease-out'
          }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '1rem',
              fontFamily: "'Fira Code', monospace",
              color: '#00f0ff',
              fontSize: 'clamp(0.85rem, 2vw, 1rem)',
              padding: 'clamp(0.7rem, 2vw, 0.9rem) clamp(1.5rem, 4vw, 2rem)',
              border: '2px solid rgba(0, 240, 255, 0.5)',
              borderRadius: '999px',
              marginBottom: '2rem',
              animation: 'pulse 3s infinite',
              background: 'rgba(0, 240, 255, 0.05)',
              backdropFilter: 'blur(10px)',
              flexWrap: 'wrap',
              justifyContent: 'center'
            }}>
              <Terminal size={20} style={{ animation: 'glow 2s infinite' }} />
              <span>{'> system.hackathon.execute()'}</span>
              <Sparkles size={20} style={{ animation: 'glow 2s infinite' }} />
            </div>

            <h1 className="neon-text" style={{
              fontSize: 'clamp(2.5rem, 10vw, 8rem)',
              fontWeight: 900,
              letterSpacing: 'clamp(2px, 1vw, 8px)',
              textTransform: 'uppercase',
              marginBottom: '1rem',
              fontFamily: "'Space Grotesk', sans-serif",
              lineHeight: 1,
              textShadow: '0 0 80px rgba(0, 240, 255, 0.5)'
            }}>
              BRAINO VISION
            </h1>

            <div style={{
              fontSize: 'clamp(1.1rem, 3.5vw, 2.5rem)',
              fontWeight: 700,
              background: 'linear-gradient(135deg, #00f0ff, #a78bfa)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '2.5rem',
              fontFamily: "'Space Grotesk', sans-serif"
            }}>
              National Talent Hunt Championship 2024
            </div>

            {/* Achievement Badges */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '1.5rem',
              marginBottom: '3rem',
              maxWidth: '1100px',
              margin: '0 auto 3rem'
            }}>
              {[
                { icon: Trophy, text: '1st Place', color: '#ffd700' },
                { icon: Users, text: '4 Developers', color: '#00f0ff' },
                { icon: Clock, text: '24 Hours', color: '#a78bfa' },
                { icon: Code, text: '5000+ Lines', color: '#ff61d2' }
              ].map((badge, i) => (
                <div key={i} className="glass-card" style={{
                  padding: 'clamp(1rem, 2.5vw, 1.5rem)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.75rem',
                  animation: `float 3s ease-in-out infinite`,
                  animationDelay: `${i * 0.2}s`
                }}>
                  <badge.icon size={28} style={{ color: badge.color, flexShrink: 0 }} />
                  <span style={{ fontSize: 'clamp(0.95rem, 2.5vw, 1.1rem)', fontWeight: 600 }}>{badge.text}</span>
                </div>
              ))}
            </div>

            {/* Certificate */}
            <div className="glass-card holographic" style={{
              margin: '3rem auto',
              maxWidth: '1100px',
              padding: 'clamp(2rem, 4vw, 3rem)'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '1rem',
                marginBottom: '2rem',
                flexWrap: 'wrap'
              }}>
                <Award size={40} style={{ color: '#ffd700', animation: 'glow 2s infinite' }} />
                <h2 style={{
                  fontSize: 'clamp(1.6rem, 4.5vw, 3rem)',
                  fontWeight: 900,
                  background: 'linear-gradient(135deg, #ffd700, #ffed4e)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontFamily: "'Space Grotesk', sans-serif"
                }}>
                  NATIONAL CHAMPIONSHIP
                </h2>
                <Award size={40} style={{ color: '#ffd700', animation: 'glow 2s infinite' }} />
              </div>

              <div onClick={() => setShowCertificate(true)} style={{
                cursor: 'pointer',
                borderRadius: '16px',
                overflow: 'hidden',
                border: '3px solid rgba(255, 215, 0, 0.5)',
                transition: 'all 0.4s'
              }} onMouseEnter={e => {
                e.currentTarget.style.transform = 'scale(1.02)';
                e.currentTarget.style.boxShadow = '0 0 60px rgba(255, 215, 0, 0.6)';
              }} onMouseLeave={e => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = 'none';
              }}>
                <img src={certificateImage} alt="Certificate" style={{ width: '100%', height: 'auto', display: 'block' }} />
              </div>

              <button onClick={handleCertificateDownload} style={{
                marginTop: '2rem',
                padding: 'clamp(0.9rem, 2.5vw, 1.1rem) clamp(2rem, 5vw, 2.5rem)',
                background: 'linear-gradient(135deg, #ffd700, #ffed4e)',
                border: 'none',
                borderRadius: '999px',
                color: '#000',
                fontWeight: 800,
                fontSize: 'clamp(0.95rem, 2.5vw, 1.1rem)',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.75rem',
                transition: 'all 0.3s',
                fontFamily: "'Space Grotesk', sans-serif",
                boxShadow: '0 10px 40px rgba(255, 215, 0, 0.4)'
              }} onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-3px) scale(1.05)';
                e.currentTarget.style.boxShadow = '0 15px 60px rgba(255, 215, 0, 0.6)';
              }} onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 10px 40px rgba(255, 215, 0, 0.4)';
              }}>
                <Download size={20} />
                Download Certificate
              </button>
            </div>
          </div>

          {/* Stats Dashboard */}
          <div ref={statsRef} style={{ marginBottom: 'clamp(3rem, 6vw, 5rem)' }}>
            <h2 className="neon-text" style={{
              fontSize: 'clamp(1.8rem, 6vw, 3.5rem)',
              fontWeight: 900,
              textAlign: 'center',
              marginBottom: '3rem',
              fontFamily: "'Space Grotesk', sans-serif"
            }}>
              PERFORMANCE METRICS
            </h2>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: 'clamp(1.5rem, 3vw, 2rem)'
            }}>
              {stats.map((stat, i) => (
                <div key={i} className="glass-card" style={{
                  padding: 'clamp(1.5rem, 3vw, 2rem)',
                  textAlign: 'center',
                  animation: 'scaleIn 0.6s ease-out',
                  animationDelay: `${i * 0.1}s`,
                  animationFillMode: 'backwards'
                }}>
                  <stat.icon size={40} style={{ color: stat.color, marginBottom: '1rem', filter: `drop-shadow(0 0 10px ${stat.color})` }} />
                  <div style={{
                    fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                    fontWeight: 900,
                    color: stat.color,
                    marginBottom: '0.5rem',
                    fontFamily: "'Space Grotesk', sans-serif",
                    textShadow: `0 0 20px ${stat.color}`
                  }}>
                    {stat.isPlace ? `${stat.value}st` : displayStats[i] || 0}
                  </div>
                  <div style={{
                    fontSize: 'clamp(0.85rem, 2vw, 1rem)',
                    color: 'rgba(255, 255, 255, 0.7)',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '1px'
                  }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Team Section */}
          <div style={{ marginBottom: 'clamp(3rem, 6vw, 5rem)' }}>
            <h2 className="neon-text" style={{
              fontSize: 'clamp(1.8rem, 6vw, 3.5rem)',
              fontWeight: 900,
              textAlign: 'center',
              marginBottom: '3rem',
              fontFamily: "'Space Grotesk', sans-serif"
            }}>
              DEVELOPMENT TEAM
            </h2>

            <div className="grid-responsive" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: 'clamp(1.5rem, 3vw, 2rem)'
            }}>
              {teamMembers.map((member, i) => (
                <div key={i} className="glass-card" style={{
                  padding: 'clamp(1.5rem, 3vw, 2rem)',
                  textAlign: 'center',
                  animation: 'fadeInUp 0.8s ease-out',
                  animationDelay: `${i * 0.15}s`,
                  animationFillMode: 'backwards'
                }}>
                  <div style={{
                    fontSize: 'clamp(3rem, 7vw, 4.5rem)',
                    marginBottom: '1rem',
                    animation: 'float 4s ease-in-out infinite',
                    animationDelay: `${i * 0.3}s`,
                    filter: 'drop-shadow(0 10px 30px rgba(0, 240, 255, 0.3))'
                  }}>
                    {member.avatar}
                  </div>

                  <h3 style={{
                    fontSize: 'clamp(1.2rem, 3vw, 1.6rem)',
                    fontWeight: 800,
                    marginBottom: '0.5rem',
                    background: 'linear-gradient(135deg, #fff, #00f0ff)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}>
                    {member.name}
                  </h3>

                  <div style={{ color: '#00f0ff', fontSize: 'clamp(0.9rem, 2.5vw, 1rem)', fontWeight: 600, marginBottom: '0.75rem' }}>
                    {member.role}
                  </div>

                  <p style={{
                    color: 'rgba(255, 255, 255, 0.6)',
                    fontSize: 'clamp(0.8rem, 2vw, 0.9rem)',
                    marginBottom: '1rem',
                    fontFamily: "'Fira Code', monospace"
                  }}>
                    {member.contribution}
                  </p>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center', marginBottom: '1rem' }}>
                    {member.skills.map((skill, idx) => (
                      <span key={idx} style={{
                        fontSize: 'clamp(0.7rem, 2vw, 0.8rem)',
                        padding: 'clamp(0.3rem, 1vw, 0.4rem) clamp(0.6rem, 2vw, 0.8rem)',
                        background: 'rgba(0, 0, 0, 0.6)',
                        border: '2px solid #00f0ff',
                        borderRadius: '999px',
                        color: '#00f0ff',
                        fontFamily: "'Fira Code', monospace"
                      }}>
                        {skill}
                      </span>
                    ))}
                  </div>

                  {member.github && (
                    <a href={member.github} target="_blank" rel="noopener noreferrer" style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: 'clamp(0.5rem, 2vw, 0.7rem) clamp(1rem, 3vw, 1.3rem)',
                      background: 'rgba(0, 240, 255, 0.1)',
                      border: '2px solid rgba(0, 240, 255, 0.3)',
                      borderRadius: '999px',
                      color: '#00f0ff',
                      textDecoration: 'none',
                      fontSize: 'clamp(0.8rem, 2vw, 0.9rem)',
                      fontWeight: 600,
                      transition: 'all 0.3s'
                    }} onMouseEnter={e => {
                      e.currentTarget.style.background = 'rgba(0, 240, 255, 0.2)';
                      e.currentTarget.style.transform = 'scale(1.05)';
                    }} onMouseLeave={e => {
                      e.currentTarget.style.background = 'rgba(0, 240, 255, 0.1)';
                      e.currentTarget.style.transform = 'scale(1)';
                    }}>
                      <Github size={16} />
                      GitHub
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Battle Log */}
          <div style={{ marginBottom: 'clamp(3rem, 6vw, 5rem)' }}>
            <h2 className="neon-text" style={{
              fontSize: 'clamp(1.8rem, 6vw, 3.5rem)',
              fontWeight: 900,
              textAlign: 'center',
              marginBottom: '3rem',
              fontFamily: "'Space Grotesk', sans-serif"
            }}>
              24-HOUR BATTLE LOG
            </h2>

            <div className="grid-responsive" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 'clamp(1.5rem, 3vw, 2rem)'
            }}>
              {phases.map((phase, i) => (
                <div key={phase.id} className="glass-card" onClick={() => setActivePhase(phase.id)}
                  onMouseEnter={() => setHoveredId(phase.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  style={{
                    padding: 'clamp(1.5rem, 3vw, 2rem)',
                    cursor: 'pointer',
                    animation: 'fadeInUp 0.8s ease-out',
                    animationDelay: `${i * 0.15}s`,
                    animationFillMode: 'backwards',
                    borderColor: hoveredId === phase.id ? phase.color : 'rgba(0, 240, 255, 0.3)'
                  }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '1.5rem',
                    flexWrap: 'wrap',
                    gap: '1rem'
                  }}>
                    <div style={{
                      width: 'clamp(55px, 13vw, 70px)',
                      height: 'clamp(55px, 13vw, 70px)',
                      borderRadius: '50%',
                      background: `linear-gradient(135deg, ${phase.color}, ${phase.color}cc)`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: hoveredId === phase.id ? `0 0 40px ${phase.color}` : 'none',
                      transition: 'all 0.4s',
                      flexShrink: 0
                    }}>
                      <phase.icon size={32} style={{ color: '#000' }} />
                    </div>

                    <div style={{
                      padding: '0.5rem 1rem',
                      background: `${phase.color}20`,
                      border: `2px solid ${phase.color}`,
                      borderRadius: '999px',
                      fontSize: 'clamp(0.85rem, 2vw, 0.95rem)',
                      fontWeight: 700,
                      color: phase.color,
                      fontFamily: "'Fira Code', monospace"
                    }}>
                      {phase.hour}
                    </div>
                  </div>

                  <h3 style={{
                    fontSize: 'clamp(1.2rem, 3vw, 1.6rem)',
                    fontWeight: 800,
                    marginBottom: '0.75rem',
                    color: '#fff'
                  }}>
                    {phase.title}
                  </h3>

                  <p style={{
                    color: 'rgba(255, 255, 255, 0.7)',
                    fontSize: 'clamp(0.85rem, 2vw, 0.95rem)',
                    lineHeight: 1.6,
                    marginBottom: '1.5rem'
                  }}>
                    {phase.desc}
                  </p>

                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '0.75rem',
                    marginBottom: '1.5rem',
                    padding: '1rem',
                    background: 'rgba(0, 0, 0, 0.3)',
                    borderRadius: '12px'
                  }}>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ color: phase.color, fontSize: 'clamp(1.2rem, 3vw, 1.6rem)', fontWeight: 800 }}>
                        {phase.metrics.linesOfCode}
                      </div>
                      <div style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: 'clamp(0.65rem, 1.5vw, 0.75rem)' }}>
                        Lines
                      </div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ color: phase.color, fontSize: 'clamp(1.2rem, 3vw, 1.6rem)', fontWeight: 800 }}>
                        {phase.metrics.apis}
                      </div>
                      <div style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: 'clamp(0.65rem, 1.5vw, 0.75rem)' }}>
                        APIs
                      </div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ color: phase.color, fontSize: 'clamp(1.2rem, 3vw, 1.6rem)', fontWeight: 800 }}>
                        {phase.metrics.tests}
                      </div>
                      <div style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: 'clamp(0.65rem, 1.5vw, 0.75rem)' }}>
                        Tests
                      </div>
                    </div>
                  </div>

                  <button onClick={() => setActivePhase(phase.id)} style={{
                    width: '100%',
                    padding: 'clamp(0.7rem, 2vw, 0.9rem)',
                    background: 'transparent',
                    border: `2px solid ${phase.color}`,
                    borderRadius: '12px',
                    color: phase.color,
                    fontWeight: 700,
                    fontSize: 'clamp(0.85rem, 2vw, 0.95rem)',
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem'
                  }} onMouseEnter={e => {
                    e.currentTarget.style.background = phase.color;
                    e.currentTarget.style.color = '#000';
                  }} onMouseLeave={e => {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = phase.color;
                  }}>
                    View Details
                    <ArrowRight size={18} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack */}
          <div style={{ marginBottom: 'clamp(3rem, 6vw, 5rem)' }}>
            <h2 className="neon-text" style={{
              fontSize: 'clamp(1.8rem, 6vw, 3.5rem)',
              fontWeight: 900,
              textAlign: 'center',
              marginBottom: '3rem',
              fontFamily: "'Space Grotesk', sans-serif"
            }}>
              TECHNOLOGY ARSENAL
            </h2>

            <div className="grid-responsive" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: 'clamp(1.5rem, 3vw, 2rem)'
            }}>
              {techStack.map((tech, i) => (
                <div key={i} className="glass-card" style={{
                  padding: 'clamp(1.5rem, 3vw, 2rem)',
                  animation: 'scaleIn 0.8s ease-out',
                  animationDelay: `${i * 0.1}s`,
                  animationFillMode: 'backwards'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '1rem'
                  }}>
                    <div style={{
                      width: 'clamp(45px, 11vw, 60px)',
                      height: 'clamp(45px, 11vw, 60px)',
                      borderRadius: '12px',
                      background: `${tech.color}20`,
                      border: `2px solid ${tech.color}40`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <tech.icon size={28} style={{ color: tech.color }} />
                    </div>

                    <div style={{
                      fontSize: 'clamp(1.3rem, 3.5vw, 1.8rem)',
                      fontWeight: 800,
                      color: tech.color,
                      fontFamily: "'Space Grotesk', sans-serif"
                    }}>
                      {tech.proficiency}%
                    </div>
                  </div>

                  <h3 style={{
                    fontSize: 'clamp(1.1rem, 2.8vw, 1.4rem)',
                    fontWeight: 800,
                    marginBottom: '0.5rem',
                    color: '#fff'
                  }}>
                    {tech.name}
                  </h3>

                  <p style={{
                    color: 'rgba(255, 255, 255, 0.6)',
                    fontSize: 'clamp(0.8rem, 2vw, 0.9rem)',
                    marginBottom: '1rem'
                  }}>
                    {tech.desc}
                  </p>

                  <div style={{
                    height: '8px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '4px',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      width: statsAnimated ? `${tech.proficiency}%` : '0%',
                      height: '100%',
                      background: tech.color,
                      transition: 'width 1.5s ease-out',
                      boxShadow: `0 0 10px ${tech.color}`
                    }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="glass-card holographic" style={{
            padding: 'clamp(2.5rem, 5vw, 4rem) clamp(2rem, 4vw, 3rem)',
            textAlign: 'center',
            marginBottom: '3rem'
          }}>
            <h2 className="neon-text" style={{
              fontSize: 'clamp(1.8rem, 6vw, 4rem)',
              fontWeight: 900,
              marginBottom: '1.5rem',
              fontFamily: "'Space Grotesk', sans-serif"
            }}>
              READY FOR THE NEXT CHALLENGE?
            </h2>

            <p style={{
              fontSize: 'clamp(0.95rem, 2.5vw, 1.3rem)',
              color: 'rgba(255, 255, 255, 0.7)',
              maxWidth: '750px',
              margin: '0 auto 2.5rem',
              lineHeight: 1.6
            }}>
              From hackathon domination to production-grade applications - enterprise MERN stack expertise delivered.
            </p>

            <div style={{
              display: 'flex',
              gap: '1.5rem',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              <a href="https://github.com/bhagavan444" target="_blank" rel="noopener noreferrer" style={{
                padding: 'clamp(0.9rem, 2.5vw, 1.1rem) clamp(2rem, 5vw, 2.5rem)',
                background: 'rgba(0, 240, 255, 0.15)',
                border: '2px solid rgba(0, 240, 255, 0.6)',
                borderRadius: '12px',
                color: '#00f0ff',
                fontWeight: 700,
                fontSize: 'clamp(0.95rem, 2.5vw, 1.05rem)',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.75rem',
                transition: 'all 0.3s',
                fontFamily: "'Space Grotesk', sans-serif"
              }} onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(0, 240, 255, 0.3)';
                e.currentTarget.style.transform = 'translateY(-3px)';
              }} onMouseLeave={e => {
                e.currentTarget.style.background = 'rgba(0, 240, 255, 0.15)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}>
                <Github size={20} />
                GitHub
              </a>

              <a href="mailto:g.sivasatyasaibhagavan@gmail.com" style={{
                padding: 'clamp(0.9rem, 2.5vw, 1.1rem) clamp(2rem, 5vw, 2.5rem)',
                background: 'linear-gradient(135deg, #00f0ff, #a78bfa)',
                borderRadius: '12px',
                color: '#000',
                fontWeight: 800,
                fontSize: 'clamp(0.95rem, 2.5vw, 1.05rem)',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.75rem',
                transition: 'all 0.3s',
                fontFamily: "'Space Grotesk', sans-serif",
                boxShadow: '0 10px 40px rgba(0, 240, 255, 0.4)'
              }} onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-3px) scale(1.05)';
              }} onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
              }}>
                <Mail size={20} />
                Collaborate
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Certificate Modal */}
      {showCertificate && (
        <div onClick={() => setShowCertificate(false)} style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.95)',
          backdropFilter: 'blur(20px)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
          animation: 'fadeInUp 0.3s ease-out'
        }}>
          <div onClick={e => e.stopPropagation()} style={{
            position: 'relative',
            maxWidth: '95vw',
            maxHeight: '95vh',
            borderRadius: '24px',
            overflow: 'hidden',
            border: '4px solid #ffd700',
            boxShadow: '0 0 100px rgba(255, 215, 0, 0.6)',
            animation: 'scaleIn 0.4s ease-out'
          }}>
            <button onClick={() => setShowCertificate(false)} style={{
              position: 'absolute',
              top: '1.5rem',
              right: '1.5rem',
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              background: 'rgba(255, 0, 0, 0.8)',
              border: 'none',
              color: '#fff',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 10,
              transition: 'all 0.3s'
            }}>
              <X size={28} />
            </button>

            <img src={certificateImage} alt="Certificate" style={{ width: '100%', height: 'auto', display: 'block' }} />

            <div style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)' }}>
              <button onClick={handleCertificateDownload} style={{
                padding: '1rem 2.5rem',
                background: 'linear-gradient(135deg, #ffd700, #ffed4e)',
                border: 'none',
                borderRadius: '12px',
                color: '#000',
                fontWeight: 800,
                fontSize: '1.1rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                boxShadow: '0 10px 40px rgba(255, 215, 0, 0.6)'
              }}>
                <Download size={22} />
                Download
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Phase Modal */}
      {activePhase !== null && (
        <div onClick={() => setActivePhase(null)} style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.95)',
          backdropFilter: 'blur(20px)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 'clamp(1rem, 3vw, 2rem)',
          animation: 'fadeInUp 0.3s ease-out',
          overflowY: 'auto'
        }}>
          <div onClick={e => e.stopPropagation()} className="glass-card" style={{
            maxWidth: '1100px',
            width: '95%',
            maxHeight: '90vh',
            overflowY: 'auto',
            padding: 'clamp(2rem, 5vw, 3rem)',
            position: 'relative',
            animation: 'scaleIn 0.4s ease-out'
          }}>
            <button onClick={() => setActivePhase(null)} style={{
              position: 'absolute',
              top: '1rem',
              right: '1rem',
              width: '45px',
              height: '45px',
              borderRadius: '50%',
              background: 'rgba(255, 0, 0, 0.3)',
              border: '2px solid rgba(255, 0, 0, 0.6)',
              color: '#ff4444',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.3s',
              zIndex: 10
            }}>
              <X size={22} />
            </button>

            {(() => {
              const phase = phases[activePhase - 1];
              return (
                <>
                  <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                    <div style={{
                      width: 'clamp(70px, 18vw, 100px)',
                      height: 'clamp(70px, 18vw, 100px)',
                      margin: '0 auto 1.5rem',
                      borderRadius: '50%',
                      background: `linear-gradient(135deg, ${phase.color}, ${phase.color}cc)`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: `0 0 50px ${phase.color}`
                    }}>
                      <phase.icon size={50} style={{ color: '#000' }} />
                    </div>

                    <div style={{
                      fontSize: 'clamp(0.95rem, 2.5vw, 1.2rem)',
                      color: phase.color,
                      fontWeight: 700,
                      marginBottom: '1rem',
                      fontFamily: "'Fira Code', monospace"
                    }}>
                      {phase.hour}
                    </div>

                    <h2 style={{
                      fontSize: 'clamp(1.8rem, 5vw, 3.5rem)',
                      fontWeight: 900,
                      marginBottom: '1rem',
                      background: `linear-gradient(135deg, ${phase.color}, #ffffff)`,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent'
                    }}>
                      {phase.title}
                    </h2>

                    <p style={{
                      fontSize: 'clamp(0.95rem, 2.5vw, 1.1rem)',
                      color: 'rgba(255, 255, 255, 0.8)',
                      lineHeight: 1.6
                    }}>
                      {phase.desc}
                    </p>
                  </div>

                  <div style={{ marginBottom: '2.5rem' }}>
                    <h3 style={{ fontSize: 'clamp(1.2rem, 3vw, 1.6rem)', color: phase.color, marginBottom: '1.5rem', fontWeight: 800 }}>
                      Key Achievements
                    </h3>
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                      gap: '1rem'
                    }}>
                      {phase.achievements.map((ach, idx) => (
                        <div key={idx} style={{
                          padding: '1rem',
                          background: `${phase.color}15`,
                          border: `2px solid ${phase.color}40`,
                          borderRadius: '12px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.75rem'
                        }}>
                          <CheckCircle2 size={20} style={{ color: phase.color, flexShrink: 0 }} />
                          <span style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: 'clamp(0.85rem, 2vw, 0.95rem)' }}>{ach}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div style={{ marginBottom: '2.5rem' }}>
                    <h3 style={{ fontSize: 'clamp(1.2rem, 3vw, 1.6rem)', color: phase.color, marginBottom: '1.5rem', fontWeight: 800 }}>
                      Technologies
                    </h3>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                      {phase.techUsed.map((tech, idx) => (
                        <span key={idx} style={{
                          padding: '0.5rem 1rem',
                          background: 'rgba(0, 0, 0, 0.6)',
                          border: `2px solid ${phase.color}`,
                          borderRadius: '999px',
                          color: phase.color,
                          fontSize: 'clamp(0.8rem, 2vw, 0.9rem)',
                          fontFamily: "'Fira Code', monospace"
                        }}>
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: window.innerWidth > 768 ? '1fr 1fr' : '1fr',
                    gap: '1.5rem'
                  }}>
                    <div style={{
                      padding: '1.5rem',
                      background: 'rgba(239, 68, 68, 0.1)',
                      border: '2px solid rgba(239, 68, 68, 0.3)',
                      borderRadius: '16px'
                    }}>
                      <h4 style={{
                        color: '#ef4444',
                        fontSize: 'clamp(1.1rem, 3vw, 1.4rem)',
                        marginBottom: '0.75rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        fontWeight: 700
                      }}>
                        <AlertCircle size={24} />
                        Challenge
                      </h4>
                      <p style={{ color: 'rgba(255, 255, 255, 0.8)', lineHeight: 1.6, fontSize: 'clamp(0.85rem, 2vw, 1rem)' }}>
                        {phase.challenges}
                      </p>
                    </div>

                    <div style={{
                      padding: '1.5rem',
                      background: 'rgba(16, 185, 129, 0.1)',
                      border: '2px solid rgba(16, 185, 129, 0.3)',
                      borderRadius: '16px'
                    }}>
                      <h4 style={{
                        color: '#10b981',
                        fontSize: 'clamp(1.1rem, 3vw, 1.4rem)',
                        marginBottom: '0.75rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        fontWeight: 700
                      }}>
                        <Zap size={24} />
                        Solution
                      </h4>
                      <p style={{ color: 'rgba(255, 255, 255, 0.8)', lineHeight: 1.6, fontSize: 'clamp(0.85rem, 2vw, 1rem)' }}>
                        {phase.solutions}
                      </p>
                    </div>
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      )}
    </>
  );
}