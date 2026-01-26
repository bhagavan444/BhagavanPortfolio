"use client";

import { useState, useEffect, useRef } from "react";
import {
  Trophy, Award, X, Code, Database, Shield, Rocket, Crown,
  Clock, Users, Sparkles, Zap, Star, Flame, Target, Cpu, GitBranch,
  Download, TrendingUp, Layers, CheckCircle2, ArrowRight, Terminal,
  Server, Lock, Brain, Eye, Heart, Coffee, Mic, Volume2, Play, Pause,
  ChevronDown, ChevronUp, Calendar, MapPin, Mail, Github, Linkedin,
  Globe, MessageSquare, Send, BarChart3, PieChart, Activity, AlertCircle
} from "lucide-react";

// Lookup object for phase icons
const phaseIcons = {
  1: Terminal,
  2: Code,
  3: Zap,
  4: Rocket
};

export default function EliteHackathonShowcase() {
  const [activePhase, setActivePhase] = useState(null);
  const [hoveredId, setHoveredId] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [timelineExpanded, setTimelineExpanded] = useState(false);
  const [statsAnimated, setStatsAnimated] = useState(false);
  const [messageForm, setMessageForm] = useState({ name: '', email: '', message: '' });
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [activeFilter, setActiveFilter] = useState('all');
  const [showCertificate, setShowCertificate] = useState(false);

  const canvasRef = useRef(null);
  const audioRef = useRef(null);
  const statsRef = useRef(null);

  // Use direct Google Drive link for certificate (public view & download)
  const certificateImage = "https://lh3.googleusercontent.com/d/1bkXJCzHQPbSSovbaLs4EPeKT1f9ERl5O";

  const phases = [
    {
      id: 1,
      hour: "0–6h",
      icon: Terminal,
      title: "Foundation Sprint",
      desc: "Designed overall system architecture, finalized use-cases, modeled MongoDB schemas, implemented JWT authentication core, and scaffolded backend & frontend projects.",
      color: "#00f0ff",
      achievements: [
        "System Architecture Blueprint",
        "MongoDB Schema Design",
        "JWT Authentication Core",
        "Backend & Frontend Setup"
      ],
      techUsed: ["Node.js", "Express", "MongoDB", "JWT"],
      challenges: "Tight deadline required rapid prototyping without compromising security",
      solutions: "Implemented modular architecture with reusable authentication middleware"
    },
    {
      id: 2,
      hour: "6–14h",
      icon: Code,
      title: "Core Development",
      desc: "Implemented RESTful APIs, developed reusable React components, set up state management, routing, and integrated core application workflows.",
      color: "#a78bfa",
      achievements: [
        "15+ REST API Endpoints",
        "Reusable UI Component Library",
        "State Management Architecture",
        "Client-Side Routing"
      ],
      techUsed: ["React", "Redux", "React Router", "Axios"],
      challenges: "Complex state management across multiple interconnected components",
      solutions: "Centralized state with Redux Toolkit and custom hooks for data fetching"
    },
    {
      id: 3,
      hour: "14–20h",
      icon: Zap,
      title: "Integration & Security",
      desc: "Integrated real-time features using Socket.io, implemented role-based access control, added validation layers, middleware, and centralized error handling.",
      color: "#ff61d2",
      achievements: [
        "Real-Time Chat System",
        "Role-Based Authorization",
        "Security Hardening",
        "Robust Error Handling"
      ],
      techUsed: ["Socket.io", "bcrypt", "Helmet.js", "express-validator"],
      challenges: "Ensuring secure real-time communication with proper authorization",
      solutions: "JWT token validation on WebSocket connections with role-based room access"
    },
    {
      id: 4,
      hour: "20–24h",
      icon: Rocket,
      title: "Launch & Demo",
      desc: "Optimized performance, tested core flows, prepared live demo, deployed to cloud, and documented system for presentation and evaluation.",
      color: "#10b981",
      achievements: [
        "Production Deployment",
        "Performance Optimization",
        "Live Demo Preparation",
        "Technical Documentation"
      ],
      techUsed: ["Docker", "AWS/Heroku", "Jest", "Lighthouse"],
      challenges: "Last-minute bugs and performance bottlenecks before presentation",
      solutions: "Implemented code splitting, lazy loading, and caching strategies"
    }
  ];

  const techStack = [
    { icon: Database, name: "MongoDB", desc: "NoSQL database for scalable data storage", color: "#10b981", proficiency: 95 },
    { icon: Server, name: "Express.js", desc: "Backend framework for REST APIs", color: "#00f0ff", proficiency: 92 },
    { icon: Sparkles, name: "React", desc: "Frontend UI library for dynamic components", color: "#8b5cf6", proficiency: 98 },
    { icon: Layers, name: "Node.js", desc: "JavaScript runtime for backend services", color: "#ec4899", proficiency: 90 },
    { icon: Lock, name: "JWT", desc: "Secure authentication & authorization", color: "#f59e0b", proficiency: 88 },
    { icon: Zap, name: "Socket.io", desc: "Real-time communication engine", color: "#3b82f6", proficiency: 85 }
  ];

  const stats = [
    { label: "Duration", value: "24", unit: "hours", icon: Clock, color: "#00f0ff", target: 24 },
    { label: "Team Size", value: "4", unit: "members", icon: Users, color: "#a78bfa", target: 4 },
    { label: "Code Written", value: "5000+", unit: "lines", icon: Code, color: "#ff61d2", target: 5000 },
    { label: "Achievement", value: "1st", unit: "place", icon: Trophy, color: "#10b981", target: 1 }
  ];

  const teamMembers = [
    { name: "Bhagavan", role: "Full-Stack Lead", avatar: "🧑‍💻", contribution: "Architecture & Backend" },
    { name: "Dhanus Chandra", role: "Frontend Specialist", avatar: "👩‍💻", contribution: "UI/UX & Components" },
    { name: "Pavan", role: "backend Engineer", avatar: "👨‍💻", contribution: "Deployment & Infrastructure" },
    { name: "Rahul", role: "Security Expert", avatar: "👩‍💻", contribution: "Authentication & Security" }
  ];

  const milestones = [
    { time: "00:00", event: "Hackathon Kickoff - Team Formation", icon: Users },
    { time: "02:00", event: "Architecture Design Complete", icon: Brain },
    { time: "06:00", event: "Database Schema Finalized", icon: Database },
    { time: "10:00", event: "API Endpoints Functional", icon: Server },
    { time: "14:00", event: "Frontend Components Ready", icon: Code },
    { time: "18:00", event: "Real-Time Features Integrated", icon: Zap },
    { time: "22:00", event: "Testing & Bug Fixes", icon: Shield },
    { time: "24:00", event: "Final Presentation & Victory!", icon: Trophy }
  ];

  const [displayStats, setDisplayStats] = useState(stats.map(() => 0));

  // Animated counter for stats
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !statsAnimated) {
          setStatsAnimated(true);
          stats.forEach((stat, index) => {
            let current = 0;
            const increment = stat.target / 50;
            const timer = setInterval(() => {
              current += increment;
              if (current >= stat.target) {
                current = stat.target;
                clearInterval(timer);
              }
              setDisplayStats(prev => {
                const newStats = [...prev];
                newStats[index] = Math.floor(current);
                return newStats;
              });
            }, 30);
          });
        }
      },
      { threshold: 0.5 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, [statsAnimated]);

  // Scroll progress tracker
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

  // Custom cursor tracking
  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Advanced particle system
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    class Particle {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.6;
        this.vy = (Math.random() - 0.5) * 0.6;
        this.size = Math.random() * 2.5 + 1;
        this.life = 1;
        this.decay = Math.random() * 0.001 + 0.0005;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.life -= this.decay;
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        if (this.life <= 0) this.reset();
      }
      draw() {
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 6);
        gradient.addColorStop(0, `rgba(0, 240, 255, ${0.4 * this.life})`);
        gradient.addColorStop(0.5, `rgba(167, 139, 250, ${0.2 * this.life})`);
        gradient.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 6, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const particles = Array.from({ length: 100 }, () => new Particle());

    const animate = () => {
      ctx.fillStyle = 'rgba(0,0,0,0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
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

  // Certificate Download Function
  const handleCertificateDownload = () => {
    const link = document.createElement("a");
    link.href = certificateImage;
    link.download = "Brainovision-National-Championship-Certificate-2024.jpg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleMessageSubmit = (e) => {
    e.preventDefault();
    alert(`Message sent! We'll get back to you soon, ${messageForm.name}!`);
    setMessageForm({ name: '', email: '', message: '' });
  };

  const playSound = () => {
    setSoundEnabled(!soundEnabled);
    if (audioRef.current) {
      soundEnabled ? audioRef.current.pause() : audioRef.current.play();
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Fira+Code:wght@400;500;600&family=Space+Grotesk:wght@300;400;500;600;700&family=Orbitron:wght@500;700;900&display=swap');

        :root {
          --neon-primary: #00f0ff;
          --neon-secondary: #a78bfa;
          --neon-accent: #ff61d2;
          --neon-success: #10b981;
          --neon-gradient: linear-gradient(135deg, #00f0ff, #a78bfa, #ff61d2);
          --neon-glow: 0 0 35px rgba(0, 240, 255, 0.9);
        }

        * { margin: 0; padding: 0; box-sizing: border-box; }

        @keyframes slideIn { from { opacity:0; transform:translateY(60px); } to { opacity:1; transform:translateY(0); } }
        @keyframes scan { 0% { transform:translateY(-100%); } 100% { transform:translateY(100%); } }
        @keyframes float { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-15px); } }
        @keyframes pulse { 0%,100% { opacity:1; transform:scale(1); } 50% { opacity:0.8; transform:scale(1.05); } }
        @keyframes rotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes glitch {
          0%, 100% { transform: translate(0); }
          20% { transform: translate(-2px, 2px); }
          40% { transform: translate(-2px, -2px); }
          60% { transform: translate(2px, 2px); }
          80% { transform: translate(2px, -2px); }
        }
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        @keyframes countUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .hack-card {
          position: relative;
          background: rgba(8,8,22,0.95);
          border: 2px solid rgba(0,240,255,0.35);
          border-radius: 24px;
          overflow: hidden;
          transition: all 0.6s cubic-bezier(0.23,1,0.32,1);
        }

        .hack-card:hover {
          transform: translateY(-20px) scale(1.04);
          border-color: var(--neon-primary);
          box-shadow: var(--neon-glow), 0 20px 60px rgba(0,0,0,0.4);
        }

        .hack-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, transparent 30%, rgba(0,240,255,0.15) 50%, transparent 70%);
          animation: scan 8s linear infinite;
          pointer-events: none;
          z-index: 1;
        }

        .tech-pill {
          background: rgba(0,0,0,0.8);
          border: 2px solid var(--neon-primary);
          padding: 0.65rem 1.3rem;
          border-radius: 999px;
          font-family: 'Fira Code',monospace;
          font-size: 0.95rem;
          transition: all 0.4s;
          color: #e0f7ff;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
        }

        .tech-pill:hover {
          transform: scale(1.1) translateY(-3px);
          box-shadow: 0 0 25px var(--neon-primary);
          background: rgba(0,240,255,0.1);
        }

        .neon-title {
          background: var(--neon-gradient);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 3s infinite linear;
          background-size: 1000px 100%;
        }

        .progress-bar {
          position: fixed;
          top: 0;
          left: 0;
          height: 4px;
          background: var(--neon-gradient);
          z-index: 10000;
          transition: width 0.1s ease;
        }

        .custom-cursor {
          position: fixed;
          width: 20px;
          height: 20px;
          border: 2px solid var(--neon-primary);
          border-radius: 50%;
          pointer-events: none;
          z-index: 9999;
          transition: transform 0.15s ease;
          mix-blend-mode: difference;
        }

        .glassmorphism {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .certificate-preview {
          width: 100%;
          max-width: 900px;
          border-radius: 16px;
          box-shadow: 0 0 60px rgba(0,240,255,0.6);
          border: 4px solid var(--neon-primary);
          background: #000;
          overflow: hidden;
          transition: all 0.4s;
          cursor: pointer;
        }

        .certificate-preview:hover {
          transform: scale(1.02);
          box-shadow: 0 0 80px rgba(0,240,255,0.8);
        }

        @media (max-width: 1024px) {
          .hack-grid { grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)) !important; }
        }

        @media (max-width: 768px) {
          .hack-grid { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
          h1.neon-title { font-size: clamp(3rem, 10vw, 5rem) !important; }
          .modal-content { padding: 2rem 1.5rem !important; width: 95% !important; }
        }

        @media (max-width: 480px) {
          .card-padding { padding: 1.5rem 1.2rem !important; }
          .tech-pill { padding: 0.5rem 1rem; font-size: 0.85rem; }
          .cta-buttons { flex-direction: column !important; }
        }
      `}</style>

      {/* Progress Bar */}
      <div className="progress-bar" style={{ width: `${scrollProgress}%` }} />

      {/* Custom Cursor */}
      <div
        className="custom-cursor"
        style={{
          left: `${cursorPos.x}px`,
          top: `${cursorPos.y}px`,
          transform: hoveredId ? 'scale(2)' : 'scale(1)'
        }}
      />

      <div style={{
        minHeight: '100vh',
        background: '#000000',
        color: '#e0e0ff',
        position: 'relative',
        overflow: 'hidden',
        padding: 'clamp(4rem, 10vw, 8rem) 1.5rem 6rem',
        fontFamily: "'Outfit', sans-serif"
      }}>
        {/* Animated Grid Background */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(0,240,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,240,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          opacity: 0.25,
          pointerEvents: 'none',
          animation: 'float 20s ease-in-out infinite'
        }} />

        {/* Particle Canvas */}
        <canvas
          ref={canvasRef}
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            zIndex: 1
          }}
        />

        <div style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: '1600px',
          margin: '0 auto'
        }}>
          {/* Hero Section */}
          <div style={{ textAlign: 'center', marginBottom: 'clamp(5rem, 12vw, 8rem)' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '1rem',
              fontFamily: "'Fira Code', monospace",
              color: '#00f0ff',
              fontSize: 'clamp(0.95rem, 2.5vw, 1.2rem)',
              padding: '0.9rem 2rem',
              border: '2.5px solid rgba(0,240,255,0.5)',
              borderRadius: '999px',
              marginBottom: '2rem',
              animation: 'pulse 4s infinite',
              background: 'rgba(0,240,255,0.05)'
            }}>
              <Sparkles size={24} />
              {'>'} hackathon.elite.execute()
              <Sparkles size={24} />
            </div>

            <h1 className="neon-title" style={{
              fontSize: 'clamp(4rem, 12vw, 8rem)',
              fontWeight: 900,
              letterSpacing: '6px',
              textTransform: 'uppercase',
              marginBottom: '1.5rem',
              lineHeight: 1.1,
              animation: 'glitch 5s infinite'
            }}>
              BRAINO VISION
            </h1>

            <div style={{
              fontSize: 'clamp(2rem, 6vw, 3.8rem)',
              fontWeight: 900,
              background: 'var(--neon-gradient)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
              marginBottom: '2rem',
              fontFamily: "'Space Grotesk', sans-serif"
            }}>
              NATIONAL TALENT HUNT 2024
            </div>

            {/* Certificate Preview Card */}
            <div style={{
              margin: '4rem auto',
              maxWidth: '1000px',
              padding: '2.5rem',
              background: 'rgba(0,0,0,0.75)',
              border: '3.5px solid var(--neon-primary)',
              borderRadius: '28px',
              boxShadow: '0 0 70px rgba(0,240,255,0.6)',
              textAlign: 'center'
            }}>
              <h2 style={{
                fontSize: 'clamp(2rem, 5vw, 3.2rem)',
                color: '#00f0ff',
                marginBottom: '2rem',
                fontWeight: 900,
                fontFamily: "'Orbitron', sans-serif"
              }}>
                NATIONAL CHAMPIONSHIP CERTIFICATE
              </h2>

              <div 
                className="certificate-preview"
                onClick={() => setShowCertificate(true)}
                style={{ cursor: 'pointer' }}
              >
                <img 
                  src={certificateImage} 
                  alt="Brainovision National Championship Certificate"
                  style={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: '12px',
                    objectFit: 'cover'
                  }}
                />
              </div>

              <p style={{
                marginTop: '2rem',
                fontSize: '1.25rem',
                color: '#b0b0d8'
              }}>
                Click the certificate to view full size • Download available
              </p>

              <button
                onClick={handleCertificateDownload}
                style={{
                  marginTop: '2.5rem',
                  padding: '1.2rem 3rem',
                  background: 'var(--neon-gradient)',
                  border: 'none',
                  borderRadius: '999px',
                  color: '#000',
                  fontWeight: 900,
                  fontSize: '1.25rem',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '1rem',
                  boxShadow: '0 0 50px rgba(0,240,255,0.7)'
                }}
              >
                <Download size={32} />
                DOWNLOAD CERTIFICATE
              </button>
            </div>

            {/* Sound Toggle */}
            <button
              onClick={playSound}
              style={{
                padding: '1rem 2.5rem',
                background: soundEnabled ? 'var(--neon-gradient)' : 'rgba(0,0,0,0.6)',
                border: '2.5px solid var(--neon-primary)',
                borderRadius: '999px',
                color: soundEnabled ? '#000' : 'var(--neon-primary)',
                fontWeight: 700,
                fontSize: '1.1rem',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '1rem',
                marginTop: '4rem',
                boxShadow: soundEnabled ? '0 0 50px rgba(0,240,255,0.7)' : 'none'
              }}
            >
              {soundEnabled ? <Volume2 size={28} /> : <Mic size={28} />}
              {soundEnabled ? 'Sound Enabled' : 'Enable Sound Effects'}
            </button>
          </div>

          {/* Animated Stats */}
          <div ref={statsRef} style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '2.8rem',
            marginBottom: '7rem'
          }}>
            {stats.map((stat, i) => (
              <div key={i} style={{
                padding: '2.8rem 2rem',
                background: 'rgba(0,0,0,0.75)',
                border: `3.5px solid ${stat.color}60`,
                borderRadius: '28px',
                textAlign: 'center',
                transition: 'all 0.5s',
                cursor: 'pointer',
                animation: statsAnimated ? 'countUp 1s ease-out' : 'none'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-12px)';
                e.currentTarget.style.boxShadow = `0 0 50px ${stat.color}90`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}>
                <stat.icon size={52} style={{ color: stat.color, marginBottom: '1.5rem' }} />
                <div style={{
                  fontSize: 'clamp(2.8rem, 7vw, 4rem)',
                  fontWeight: 900,
                  color: stat.color,
                  marginBottom: '0.8rem',
                  fontFamily: "'Space Grotesk', sans-serif"
                }}>
                  {stat.label === "Achievement" ? stat.value : displayStats[i]}
                  {stat.unit && <span style={{ fontSize: '1.5rem' }}> {stat.unit}</span>}
                </div>
                <div style={{
                  color: '#c0c0e0',
                  fontSize: '1.25rem',
                  fontWeight: 600
                }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Team Section */}
          <div style={{ marginBottom: '9rem' }}>
            <h2 className="neon-title" style={{
              fontSize: 'clamp(3.2rem, 8vw, 5.5rem)',
              fontWeight: 900,
              textAlign: 'center',
              marginBottom: '5rem',
              letterSpacing: '4px'
            }}>
              ELITE DEVELOPMENT TEAM
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '3rem'
            }}>
              {teamMembers.map((member, i) => (
                <div key={i} className="hack-card" style={{
                  padding: '3rem 2rem',
                  textAlign: 'center',
                  cursor: 'pointer'
                }}>
                  <div style={{
                    fontSize: '6rem',
                    marginBottom: '2rem',
                    animation: 'float 4.5s ease-in-out infinite',
                    animationDelay: `${i * 0.3}s`
                  }}>
                    {member.avatar}
                  </div>
                  <h3 style={{
                    fontSize: '2rem',
                    fontWeight: 900,
                    color: '#fff',
                    marginBottom: '1rem'
                  }}>
                    {member.name}
                  </h3>
                  <div style={{
                    color: '#00f0ff',
                    fontSize: '1.3rem',
                    fontWeight: 700,
                    marginBottom: '1.2rem'
                  }}>
                    {member.role}
                  </div>
                  <div style={{
                    color: '#b0b0d0',
                    fontSize: '1.1rem',
                    fontFamily: "'Fira Code', monospace"
                  }}>
                    {member.contribution}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Timeline Phases */}
          <div style={{ marginBottom: '9rem' }}>
            <h2 className="neon-title" style={{
              fontSize: 'clamp(3.2rem, 8vw, 5.5rem)',
              fontWeight: 900,
              textAlign: 'center',
              marginBottom: '5rem',
              letterSpacing: '4px'
            }}>
              24-HOUR BATTLE LOG
            </h2>

            <div className="hack-grid" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
              gap: '3.5rem'
            }}>
              {phases.map((phase) => (
                <div
                  key={phase.id}
                  className="hack-card"
                  onMouseEnter={() => setHoveredId(phase.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onClick={() => setActivePhase(phase.id)}
                  style={{
                    cursor: 'pointer',
                    padding: '3rem 2.5rem',
                    position: 'relative'
                  }}
                >
                  <div style={{
                    width: '120px',
                    height: '120px',
                    border: `5px solid ${phase.color}`,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 2rem',
                    background: `${phase.color}20`,
                    boxShadow: hoveredId === phase.id ? `0 0 50px ${phase.color}` : 'none',
                    transition: 'all 0.5s'
                  }}>
                    <phase.icon size={56} style={{ color: phase.color }} />
                  </div>

                  <div style={{
                    position: 'absolute',
                    top: '1.5rem',
                    right: '1.5rem',
                    padding: '0.6rem 1.3rem',
                    background: `${phase.color}25`,
                    borderRadius: '999px',
                    fontSize: '1rem',
                    fontWeight: 800,
                    color: phase.color
                  }}>
                    {phase.hour}
                  </div>

                  <h3 style={{
                    fontSize: '1.9rem',
                    fontWeight: 900,
                    color: '#fff',
                    marginBottom: '1.2rem',
                    textAlign: 'center'
                  }}>
                    {phase.title}
                  </h3>

                  <p style={{
                    color: '#d0d0ff',
                    fontSize: '1.15rem',
                    lineHeight: 1.7,
                    marginBottom: '2rem',
                    textAlign: 'center'
                  }}>
                    {phase.desc}
                  </p>

                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '1rem',
                    justifyContent: 'center',
                    marginBottom: '2rem'
                  }}>
                    {phase.achievements.map((ach, idx) => (
                      <div key={idx} style={{
                        padding: '0.7rem 1.4rem',
                        background: `${phase.color}20`,
                        border: `1.5px solid ${phase.color}50`,
                        borderRadius: '14px',
                        fontSize: '1rem',
                        color: phase.color
                      }}>
                        {ach}
                      </div>
                    ))}
                  </div>

                  <div style={{
                    textAlign: 'center',
                    marginTop: '1.5rem'
                  }}>
                    <button
                      onClick={() => setActivePhase(phase.id)}
                      style={{
                        padding: '1rem 2rem',
                        background: 'transparent',
                        border: `2.5px solid ${phase.color}`,
                        borderRadius: '999px',
                        color: phase.color,
                        fontWeight: 800,
                        cursor: 'pointer',
                        transition: 'all 0.4s',
                        fontSize: '1.1rem'
                      }}
                    >
                      View Phase Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack */}
          <div style={{ marginBottom: '9rem' }}>
            <h2 className="neon-title" style={{
              fontSize: 'clamp(3.2rem, 8vw, 5.5rem)',
              fontWeight: 900,
              textAlign: 'center',
              marginBottom: '5rem',
              letterSpacing: '4px'
            }}>
              TECH STACK MASTERY
            </h2>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '3rem'
            }}>
              {techStack.map((tech, i) => (
                <div key={i} className="hack-card" style={{
                  padding: '3rem 2.5rem',
                  textAlign: 'center'
                }}>
                  <div style={{
                    width: '110px',
                    height: '110px',
                    margin: '0 auto 2rem',
                    border: `4px solid ${tech.color}`,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: `${tech.color}20`
                  }}>
                    <tech.icon size={52} style={{ color: tech.color }} />
                  </div>

                  <h3 style={{
                    fontSize: '1.8rem',
                    fontWeight: 900,
                    color: '#fff',
                    marginBottom: '1rem'
                  }}>
                    {tech.name}
                  </h3>

                  <p style={{
                    color: '#b0b0d0',
                    fontSize: '1.1rem',
                    marginBottom: '1.5rem'
                  }}>
                    {tech.desc}
                  </p>

                  <div style={{
                    height: '10px',
                    background: 'rgba(255,255,255,0.12)',
                    borderRadius: '5px',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      width: `${tech.proficiency}%`,
                      height: '100%',
                      background: tech.color,
                      transition: 'width 1.8s ease-out',
                      animation: statsAnimated ? 'slideIn 1.5s forwards' : 'none'
                    }} />
                  </div>
                  <div style={{
                    textAlign: 'right',
                    fontSize: '1.1rem',
                    color: tech.color,
                    marginTop: '0.8rem',
                    fontWeight: 800
                  }}>
                    {tech.proficiency}%
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Timeline Milestones */}
          <div style={{ marginBottom: '9rem' }}>
            <h2 className="neon-title" style={{
              fontSize: 'clamp(3.2rem, 8vw, 5.5rem)',
              fontWeight: 900,
              textAlign: 'center',
              marginBottom: '5rem',
              letterSpacing: '4px'
            }}>
              TIMELINE MILESTONES
            </h2>

            <div style={{
              position: 'relative',
              maxWidth: '1000px',
              margin: '0 auto'
            }}>
              {/* Vertical Line */}
              <div style={{
                position: 'absolute',
                left: '50%',
                top: 0,
                bottom: 0,
                width: '5px',
                background: 'var(--neon-gradient)',
                transform: 'translateX(-50%)',
                borderRadius: '3px'
              }} />

              {milestones.map((milestone, i) => (
                <div key={i} style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '4rem',
                  position: 'relative',
                  flexDirection: i % 2 === 0 ? 'row' : 'row-reverse'
                }}>
                  <div style={{
                    width: '50%',
                    padding: i % 2 === 0 ? '0 4rem 0 0' : '0 0 0 4rem',
                    textAlign: i % 2 === 0 ? 'right' : 'left'
                  }}>
                    <div style={{
                      background: 'rgba(0,0,0,0.75)',
                      border: `3px solid ${i % 2 === 0 ? '#00f0ff' : '#a78bfa'}`,
                      borderRadius: '20px',
                      padding: '2rem',
                      boxShadow: '0 0 40px rgba(0,0,0,0.5)'
                    }}>
                      <div style={{
                        fontSize: '1.6rem',
                        fontWeight: 900,
                        color: i % 2 === 0 ? '#00f0ff' : '#a78bfa',
                        marginBottom: '0.8rem'
                      }}>
                        {milestone.time}
                      </div>
                      <div style={{
                        fontSize: '1.3rem',
                        color: '#e0e0ff'
                      }}>
                        {milestone.event}
                      </div>
                    </div>
                  </div>

                  {/* Dot */}
                  <div style={{
                    width: '30px',
                    height: '30px',
                    background: 'black',
                    border: `5px solid ${i % 2 === 0 ? '#00f0ff' : '#a78bfa'}`,
                    borderRadius: '50%',
                    position: 'absolute',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    boxShadow: `0 0 25px ${i % 2 === 0 ? '#00f0ff' : '#a78bfa'}`
                  }}>
                    <milestone.icon size={20} style={{
                      color: i % 2 === 0 ? '#00f0ff' : '#a78bfa',
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)'
                    }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div style={{
            padding: 'clamp(5rem, 10vw, 8rem) 3rem',
            background: 'linear-gradient(135deg, rgba(0,240,255,0.12), rgba(167,139,250,0.12))',
            border: '4px solid rgba(0,240,255,0.45)',
            borderRadius: '36px',
            textAlign: 'center',
            marginBottom: '8rem'
          }}>
            <h2 className="neon-title" style={{
              fontSize: 'clamp(3.5rem, 9vw, 6rem)',
              fontWeight: 900,
              marginBottom: '2.5rem'
            }}>
              READY FOR THE NEXT CHALLENGE?
            </h2>

            <p style={{
              fontSize: 'clamp(1.3rem, 4vw, 1.7rem)',
              color: '#b0b0d8',
              maxWidth: '900px',
              margin: '0 auto 4rem',
              lineHeight: 1.9
            }}>
              Let's build something legendary together. Whether it's another hackathon domination or a production-grade project — I'm ready.
            </p>

            <div style={{
              display: 'flex',
              gap: '3rem',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              <a
                href="https://github.com/bhagavan444"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  padding: '1.5rem 4rem',
                  background: 'rgba(0,240,255,0.18)',
                  border: '3.5px solid rgba(0,240,255,0.8)',
                  borderRadius: '999px',
                  color: '#00f0ff',
                  fontWeight: 900,
                  fontSize: '1.4rem',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1.5rem',
                  transition: 'all 0.4s'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'scale(1.1)';
                  e.currentTarget.style.boxShadow = '0 0 60px #00f0ff';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <Github size={32} />
                VIEW REPOSITORIES
              </a>

              <a
                href="mailto:g.sivasatyasaibhagavan@gmail.com"
                style={{
                  padding: '1.5rem 4rem',
                  background: 'var(--neon-gradient)',
                  borderRadius: '999px',
                  color: '#000',
                  fontWeight: 900,
                  fontSize: '1.4rem',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1.5rem',
                  boxShadow: '0 0 60px rgba(0,240,255,0.7)'
                }}
              >
                <Mail size={32} />
                LET'S COLLABORATE
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Certificate Full View Modal */}
      {showCertificate && (
        <div
          onClick={() => setShowCertificate(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.96)',
            backdropFilter: 'blur(25px)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem'
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              position: 'relative',
              maxWidth: '95vw',
              maxHeight: '95vh',
              border: '5px solid var(--neon-primary)',
              borderRadius: '28px',
              overflow: 'hidden',
              boxShadow: '0 0 120px rgba(0,240,255,0.8)'
            }}
          >
            <button
              onClick={() => setShowCertificate(false)}
              style={{
                position: 'absolute',
                top: '1.8rem',
                right: '1.8rem',
                background: 'rgba(255,80,80,0.4)',
                border: 'none',
                borderRadius: '50%',
                width: '65px',
                height: '65px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                cursor: 'pointer',
                zIndex: 10,
                transition: 'all 0.3s'
              }}
            >
              <X size={36} strokeWidth={3} />
            </button>

            <img
              src={certificateImage}
              alt="Brainovision National Championship Certificate"
              style={{
                width: '100%',
                height: 'auto',
                display: 'block'
              }}
            />

            <div style={{
              position: 'absolute',
              bottom: '2rem',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              gap: '2.5rem'
            }}>
              <button
                onClick={handleCertificateDownload}
                style={{
                  padding: '1.2rem 3rem',
                  background: 'var(--neon-gradient)',
                  border: 'none',
                  borderRadius: '999px',
                  color: '#000',
                  fontWeight: 900,
                  fontSize: '1.3rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  boxShadow: '0 0 50px rgba(0,240,255,0.8)'
                }}
              >
                <Download size={32} />
                Download Certificate
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Phase Detail Modal */}
      {activePhase !== null && (
        <div
          onClick={() => setActivePhase(null)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.96)',
            backdropFilter: 'blur(25px)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem'
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: 'rgba(8,8,22,0.98)',
              border: `5px solid ${phases[activePhase - 1].color}`,
              borderRadius: '36px',
              maxWidth: '1200px',
              width: '96%',
              maxHeight: '92vh',
              overflowY: 'auto',
              boxShadow: `0 0 160px ${phases[activePhase - 1].color}80`,
              position: 'relative'
            }}
          >
            <button
              onClick={() => setActivePhase(null)}
              style={{
                position: 'absolute',
                top: '1.8rem',
                right: '1.8rem',
                background: 'rgba(255,80,80,0.4)',
                border: 'none',
                borderRadius: '50%',
                width: '65px',
                height: '65px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                cursor: 'pointer',
                zIndex: 10
              }}
            >
              <X size={36} strokeWidth={3} />
            </button>

            <div style={{
              padding: 'clamp(3rem, 7vw, 5.5rem) clamp(2.5rem, 6vw, 4.5rem) 6rem'
            }}>
              <div style={{
                textAlign: 'center',
                marginBottom: '4rem'
              }}>
                <div style={{
                  width: '140px',
                  height: '140px',
                  margin: '0 auto 2rem',
                  border: `5px solid ${phases[activePhase - 1].color}`,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: `${phases[activePhase - 1].color}25`
                }}>
                  {(() => {
                    const Icon = phaseIcons[activePhase];
                    return <Icon size={70} style={{ color: phases[activePhase - 1].color }} />;
                  })()}
                </div>

                <div style={{
                  fontSize: '1.6rem',
                  color: phases[activePhase - 1].color,
                  fontWeight: 800,
                  marginBottom: '1rem'
                }}>
                  {phases[activePhase - 1].hour}
                </div>

                <h2 style={{
                  fontSize: 'clamp(2.8rem, 7vw, 4.8rem)',
                  fontWeight: 900,
                  background: `linear-gradient(135deg, ${phases[activePhase - 1].color}, #ffffff)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  marginBottom: '1.5rem'
                }}>
                  {phases[activePhase - 1].title}
                </h2>

                <p style={{
                  fontSize: '1.4rem',
                  color: '#d0d0ff',
                  maxWidth: '900px',
                  margin: '0 auto 2.5rem',
                  lineHeight: 1.8
                }}>
                  {phases[activePhase - 1].desc}
                </p>
              </div>

              {/* Achievements */}
              <div style={{ marginBottom: '4rem' }}>
                <h3 style={{
                  fontSize: '2.2rem',
                  color: phases[activePhase - 1].color,
                  marginBottom: '2rem',
                  textAlign: 'center'
                }}>
                  Key Achievements
                </h3>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                  gap: '1.5rem'
                }}>
                  {phases[activePhase - 1].achievements.map((ach, idx) => (
                    <div key={idx} style={{
                      padding: '1.5rem',
                      background: `${phases[activePhase - 1].color}20`,
                      border: `1.5px solid ${phases[activePhase - 1].color}50`,
                      borderRadius: '20px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1.2rem'
                    }}>
                      <CheckCircle2 size={28} style={{ color: phases[activePhase - 1].color }} />
                      <span style={{ color: '#e0e0ff', fontSize: '1.1rem' }}>{ach}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech Used */}
              <div style={{ marginBottom: '4rem' }}>
                <h3 style={{
                  fontSize: '2.2rem',
                  color: phases[activePhase - 1].color,
                  marginBottom: '2rem',
                  textAlign: 'center'
                }}>
                  Technologies Used
                </h3>
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '1.2rem',
                  justifyContent: 'center'
                }}>
                  {phases[activePhase - 1].techUsed.map((tech, idx) => (
                    <div key={idx} style={{
                      padding: '1rem 2rem',
                      background: `${phases[activePhase - 1].color}25`,
                      border: `2.5px solid ${phases[activePhase - 1].color}60`,
                      borderRadius: '999px',
                      color: phases[activePhase - 1].color,
                      fontWeight: 800,
                      fontSize: '1.2rem'
                    }}>
                      {tech}
                    </div>
                  ))}
                </div>
              </div>

              {/* Challenge & Solution */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: window.innerWidth > 768 ? '1fr 1fr' : '1fr',
                gap: '2.5rem'
              }}>
                <div style={{
                  padding: '2.5rem',
                  background: 'rgba(255,100,100,0.12)',
                  border: '3px solid rgba(255,100,100,0.5)',
                  borderRadius: '24px'
                }}>
                  <h4 style={{
                    color: '#ff6666',
                    fontSize: '1.9rem',
                    marginBottom: '1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem'
                  }}>
                    <AlertCircle size={32} />
                    Challenge Faced
                  </h4>
                  <p style={{ color: '#ffcccc', lineHeight: 1.8, fontSize: '1.15rem' }}>
                    {phases[activePhase - 1].challenges}
                  </p>
                </div>

                <div style={{
                  padding: '2.5rem',
                  background: 'rgba(0,200,0,0.12)',
                  border: '3px solid rgba(0,200,0,0.5)',
                  borderRadius: '24px'
                }}>
                  <h4 style={{
                    color: '#00cc00',
                    fontSize: '1.9rem',
                    marginBottom: '1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem'
                  }}>
                    <Zap size={32} />
                    Solution Implemented
                  </h4>
                  <p style={{ color: '#ccffcc', lineHeight: 1.8, fontSize: '1.15rem' }}>
                    {phases[activePhase - 1].solutions}
                  </p>
                </div>
              </div>

              {/* Close Button */}
              <div style={{
                textAlign: 'center',
                marginTop: '4rem'
              }}>
                <button
                  onClick={() => setActivePhase(null)}
                  style={{
                    padding: '1.2rem 3.5rem',
                    background: 'rgba(255,100,100,0.25)',
                    border: '3px solid #ff6666',
                    borderRadius: '999px',
                    color: '#ff6666',
                    fontWeight: 900,
                    fontSize: '1.3rem',
                    cursor: 'pointer',
                    transition: 'all 0.4s'
                  }}
                >
                  Close Phase Details
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}