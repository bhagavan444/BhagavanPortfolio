"use client";

import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import profileImg from "../assets/profile.jpeg";
import resumePdf from "../assets/bhagavanresume.pdf";

import { 
  Terminal, Download, Github, Linkedin, Mail, Phone, ChevronRight,
  Cpu, Database, Globe, Star, Brain, Code, Zap, Cloud, Layers, Server,
  Award, TrendingUp, Briefcase, Target, Rocket, Activity, Eye, Sparkles,
  Film, Play, ArrowRight, CheckCircle, Flame, Lightbulb, Shield, Users,
  BarChart3, GitBranch, BookOpen, Trophy, Calendar, ExternalLink, FileText,
  Code2, Box, Workflow, Maximize2, MessageSquare, Coffee, Headphones,
  Settings, Monitor, Smartphone, Lock, Unlock, Gauge, Binary, CircuitBoard,
  Fingerprint, Radar, Blocks, Network, Wifi, CheckCircle2, Sparkle, Clock
} from "lucide-react";

export default function ModernDeveloperHome() {
  const navigate = useNavigate();
  
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [typedText, setTypedText] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [skillProgress, setSkillProgress] = useState({});
  const [visibleSections, setVisibleSections] = useState(new Set());
  const [activeMetric, setActiveMetric] = useState(0);
  const [cursorTrail, setCursorTrail] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  
  const canvasRef = useRef(null);
  const observerRef = useRef(null);

  const roles = useMemo(() => [
    "ELITE FULL-STACK ENGINEER",
    "AI/ML ARCHITECT", 
    "CLOUD SYSTEMS EXPERT",
    "PRODUCTION-READY DEVELOPER"
  ], []);

  const metrics = useMemo(() => [
    { 
      label: "Production Projects", 
      value: "5+", 
      icon: Rocket, 
      color: "#00f5ff",
      subtitle: "Enterprise-grade solutions"
    },
    { 
      label: "Industry Certifications", 
      value: "15+", 
      icon: Award, 
      color: "#a855f7",
      subtitle: "AWS, Azure, Google Cloud"
    },
    { 
      label: "Tech Stack Mastery", 
      value: "30+", 
      icon: Code2, 
      color: "#22c55e",
      subtitle: "Modern frameworks & tools"
    },
    { 
      label: "Project Success Rate", 
      value: "100%", 
      icon: Target, 
      color: "#ffd700",
      subtitle: "On-time delivery guaranteed"
    }
  ], []);

  const skills = useMemo(() => [
    { 
      name: "AI & Machine Learning", 
      level: 95, 
      icon: Brain, 
      color: "#a855f7",
      tech: "TensorFlow • PyTorch • Scikit-learn • NLP • Computer Vision"
    },
    { 
      name: "Full-Stack Development", 
      level: 93, 
      icon: Code, 
      color: "#00f5ff",
      tech: "React • Node.js • Python • Next.js • TypeScript • REST/GraphQL"
    },
    { 
      name: "Cloud & DevOps", 
      level: 90, 
      icon: Cloud, 
      color: "#FF9900",
      tech: "AWS • Azure • Docker • Kubernetes • CI/CD • Terraform"
    },
    { 
      name: "Data Structures & Algorithms", 
      level: 92, 
      icon: Terminal, 
      color: "#22c55e",
      tech: "LeetCode • System Design • Optimization • Competitive Programming"
    },
    { 
      name: "Database & Architecture", 
      level: 88, 
      icon: Database, 
      color: "#ffd700",
      tech: "PostgreSQL • MongoDB • Redis • Microservices • Scalable Systems"
    }
  ], []);

  const achievements = useMemo(() => [
    { icon: Trophy, label: "Top 5% on LeetCode", color: "#ffd700" },
    { icon: Award, label: "AWS Certified", color: "#FF9900" },
    { icon: Star, label: "Azure Expert", color: "#00a4ef" },
    { icon: CheckCircle2, label: "Google Cloud Pro", color: "#4285f4" },
    { icon: Flame, label: "100+ Days Coding Streak", color: "#ff6b35" },
    { icon: Target, label: "Zero Bug Production", color: "#22c55e" }
  ], []);

  const techStack = useMemo(() => [
    { 
      name: "React", 
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
      color: "#61dafb" 
    },
    { 
      name: "Node.js", 
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
      color: "#68a063" 
    },
    { 
      name: "Python", 
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
      color: "#3776ab" 
    },
    { 
      name: "TypeScript", 
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
      color: "#3178c6" 
    },
    { 
      name: "JavaScript", 
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
      color: "#f7df1e" 
    },
    { 
      name: "Docker", 
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
      color: "#2496ed" 
    },
    { 
      name: "MongoDB", 
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
      color: "#47a248" 
    },
    { 
      name: "PostgreSQL", 
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
      color: "#336791" 
    },
    { 
      name: "TensorFlow", 
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg",
      color: "#ff6f00" 
    },
    { 
      name: "Kubernetes", 
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg",
      color: "#326ce5" 
    },
    { 
      name: "Next.js", 
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
      color: "#000000" 
    },
    { 
      name: "GraphQL", 
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg",
      color: "#e10098" 
    },
    { 
      name: "Redis", 
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg",
      color: "#dc382d" 
    },
    { 
      name: "Git", 
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
      color: "#f05032" 
    },
    { 
      name: "AWS", 
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg",
      color: "#FF9900" 
    },
    { 
      name: "Azure", 
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg",
      color: "#0089d6" 
    }
  ], []);

  // Real-time clock
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Enhanced particle system with connections
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { alpha: true });
    let particles = [];
    let animationId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.size = Math.random() * 2 + 0.5;
        this.opacity = Math.random() * 0.4 + 0.2;
        this.pulseSpeed = Math.random() * 0.02 + 0.01;
        this.pulsePhase = Math.random() * Math.PI * 2;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        this.pulsePhase += this.pulseSpeed;
      }

      draw() {
        const pulse = Math.sin(this.pulsePhase) * 0.3 + 0.7;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * pulse, 0, Math.PI * 2);
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * pulse);
        gradient.addColorStop(0, `rgba(0, 245, 255, ${this.opacity * pulse})`);
        gradient.addColorStop(1, `rgba(168, 85, 247, ${this.opacity * pulse * 0.3})`);
        ctx.fillStyle = gradient;
        ctx.fill();
      }
    }

    for (let i = 0; i < 60; i++) particles.push(new Particle());

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw connections
      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach(p2 => {
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(0, 245, 255, ${(1 - dist / 120) * 0.15})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      particles.forEach(p => { p.update(); p.draw(); });
      animationId = requestAnimationFrame(animate);
    };

    animate();
    window.addEventListener('resize', resize);
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  // Mouse trail effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      setCursorTrail(prev => [...prev.slice(-5), { x: e.clientX, y: e.clientY, id: Date.now() }]);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Typing effect with faster speed
  useEffect(() => {
    const role = roles[roleIndex];
    let char = 0;
    
    const interval = setInterval(() => {
      if (char <= role.length) {
        setTypedText(role.slice(0, char));
        char++;
      } else {
        clearInterval(interval);
        setTimeout(() => setRoleIndex((prev) => (prev + 1) % roles.length), 1200);
      }
    }, 80);
    
    return () => clearInterval(interval);
  }, [roleIndex, roles]);

  // Scroll handler
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrolled = window.scrollY;
          const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
          setScrollProgress((scrolled / maxScroll) * 100);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Intersection Observer
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections(prev => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('[data-observe]').forEach(el => {
      observerRef.current?.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  // Skill animation
  useEffect(() => {
    if (visibleSections.has('skills')) {
      skills.forEach((skill, i) => {
        setTimeout(() => {
          setSkillProgress(prev => ({ ...prev, [skill.name]: skill.level }));
        }, 100 + i * 150);
      });
    }
  }, [visibleSections, skills]);

  // Metric rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveMetric(prev => (prev + 1) % metrics.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [metrics.length]);

  const handleNavigation = useCallback((path) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [navigate]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&family=Rajdhani:wght@300;400;500;600;700&family=Orbitron:wght@400;500;600;700;800;900&family=Roboto+Mono:wght@400;500;600;700&display=swap');
        
        * { margin:0; padding:0; box-sizing:border-box; }
        
        body { 
          font-family:'Poppins',sans-serif; 
          background:#000; 
          color:#fff; 
          overflow-x:hidden;
          -webkit-font-smoothing:antialiased;
          cursor:none;
        }

        .custom-cursor {
          position:fixed;
          width:20px;
          height:20px;
          border:2px solid #00f5ff;
          border-radius:50%;
          pointer-events:none;
          z-index:10001;
          transition:transform 0.15s ease;
          mix-blend-mode:difference;
        }

        .custom-cursor-dot {
          position:fixed;
          width:4px;
          height:4px;
          background:#00f5ff;
          border-radius:50%;
          pointer-events:none;
          z-index:10002;
          box-shadow:0 0 10px #00f5ff;
        }

        @keyframes fadeIn {
          from { opacity:0; transform:translateY(30px); }
          to { opacity:1; transform:translateY(0); }
        }

        @keyframes slideIn {
          from { opacity:0; transform:translateX(-50px); }
          to { opacity:1; transform:translateX(0); }
        }

        @keyframes scaleIn {
          from { opacity:0; transform:scale(0.9); }
          to { opacity:1; transform:scale(1); }
        }

        @keyframes glow {
          0%, 100% { box-shadow:0 0 15px currentColor; }
          50% { box-shadow:0 0 30px currentColor, 0 0 50px currentColor; }
        }

        @keyframes float {
          0%, 100% { transform:translateY(0); }
          50% { transform:translateY(-20px); }
        }

        @keyframes gradient-shift {
          0%, 100% { background-position:0% 50%; }
          50% { background-position:100% 50%; }
        }

        @keyframes cursor {
          0%, 50% { opacity:1; }
          51%, 100% { opacity:0; }
        }

        @keyframes pulse {
          0%, 100% { transform:scale(1); opacity:1; }
          50% { transform:scale(1.05); opacity:0.8; }
        }

        @keyframes slideUp {
          from { opacity:0; transform:translateY(20px); }
          to { opacity:1; transform:translateY(0); }
        }

        @keyframes shimmer {
          0% { background-position:-1000px 0; }
          100% { background-position:1000px 0; }
        }

        @keyframes rotate {
          from { transform:rotate(0deg); }
          to { transform:rotate(360deg); }
        }

        @keyframes spin {
          from { transform:rotate(0deg); }
          to { transform:rotate(360deg); }
        }

        @keyframes bounce {
          0%, 100% { transform:translateY(0); }
          50% { transform:translateY(-10px); }
        }

        .glass {
          background:rgba(255,255,255,0.03);
          backdrop-filter:blur(25px) saturate(180%);
          border:1px solid rgba(255,255,255,0.1);
          border-radius:24px;
          transition:all 0.4s cubic-bezier(0.16,1,0.3,1);
          position:relative;
          overflow:hidden;
        }

        .glass::before {
          content:'';
          position:absolute;
          top:0;
          left:-100%;
          width:100%;
          height:100%;
          background:linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
          transition:left 0.5s;
        }

        .glass:hover::before {
          left:100%;
        }

        .glass:hover {
          background:rgba(255,255,255,0.06);
          border-color:rgba(0,245,255,0.4);
          transform:translateY(-8px) scale(1.02);
          box-shadow:0 25px 60px rgba(0,0,0,0.6), 0 0 40px rgba(0,245,255,0.3);
        }

        .btn-primary {
          background:linear-gradient(135deg, #00f5ff, #00c4ff);
          border:none;
          color:#000;
          font-weight:700;
          padding:1.1rem 2.5rem;
          border-radius:12px;
          cursor:pointer;
          font-family:'Rajdhani',sans-serif;
          text-transform:uppercase;
          letter-spacing:1.5px;
          font-size:1rem;
          transition:all 0.3s cubic-bezier(0.16,1,0.3,1);
          display:inline-flex;
          align-items:center;
          gap:0.6rem;
          text-decoration:none;
          position:relative;
          overflow:hidden;
        }

        .btn-primary::before {
          content:'';
          position:absolute;
          top:0;
          left:-100%;
          width:100%;
          height:100%;
          background:linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
          transition:left 0.5s;
        }

        .btn-primary:hover::before {
          left:100%;
        }

        .btn-primary:hover {
          transform:translateY(-4px) scale(1.05);
          box-shadow:0 15px 40px rgba(0,245,255,0.5);
        }

        .btn-outline {
          background:transparent;
          border:2px solid currentColor;
          color:currentColor;
          font-weight:600;
          padding:1.1rem 2.5rem;
          border-radius:12px;
          cursor:pointer;
          font-family:'Rajdhani',sans-serif;
          text-transform:uppercase;
          letter-spacing:1.5px;
          font-size:1rem;
          transition:all 0.3s cubic-bezier(0.16,1,0.3,1);
          display:inline-flex;
          align-items:center;
          gap:0.6rem;
          text-decoration:none;
          position:relative;
          overflow:hidden;
        }

        .btn-outline::before {
          content:'';
          position:absolute;
          top:50%;
          left:50%;
          width:0;
          height:0;
          background:currentColor;
          border-radius:50%;
          transform:translate(-50%, -50%);
          transition:width 0.5s, height 0.5s;
        }

        .btn-outline:hover::before {
          width:300%;
          height:300%;
        }

        .btn-outline:hover {
          color:#000;
          transform:translateY(-4px) scale(1.05);
          box-shadow:0 15px 40px rgba(0,0,0,0.3);
        }

        .btn-outline span {
          position:relative;
          z-index:1;
        }

        .gradient-text {
          background:linear-gradient(135deg, #00f5ff 0%, #a855f7 35%, #ff6b35 65%, #ffd700 100%);
          background-size:200% 200%;
          -webkit-background-clip:text;
          -webkit-text-fill-color:transparent;
          animation:gradient-shift 4s ease infinite;
        }

        .fade-in { animation:fadeIn 0.8s cubic-bezier(0.16,1,0.3,1) forwards; opacity:0; }
        .slide-in { animation:slideIn 0.8s cubic-bezier(0.16,1,0.3,1) forwards; opacity:0; }
        .scale-in { animation:scaleIn 0.8s cubic-bezier(0.16,1,0.3,1) forwards; opacity:0; }
        .slide-up { animation:slideUp 0.6s cubic-bezier(0.16,1,0.3,1) forwards; opacity:0; }

        .delay-1 { animation-delay:0.1s; }
        .delay-2 { animation-delay:0.2s; }
        .delay-3 { animation-delay:0.3s; }
        .delay-4 { animation-delay:0.4s; }
        .delay-5 { animation-delay:0.5s; }
        .delay-6 { animation-delay:0.6s; }
        .delay-7 { animation-delay:0.7s; }
        .delay-8 { animation-delay:0.8s; }

        ::-webkit-scrollbar { width:10px; }
        ::-webkit-scrollbar-track { background:#000; }
        ::-webkit-scrollbar-thumb { 
          background:linear-gradient(180deg, #00f5ff, #a855f7); 
          border-radius:5px;
        }
        ::-webkit-scrollbar-thumb:hover { 
          background:linear-gradient(180deg, #00c4ff, #8b3fc7); 
        }

        @media(max-width:1024px) {
          body { cursor:auto; }
          .custom-cursor, .custom-cursor-dot { display:none; }
          .hero-grid { grid-template-columns:1fr!important; gap:3rem!important; }
          .profile-card { order:-1; max-width:100%!important; }
          .tech-stack-grid { grid-template-columns:repeat(3, 1fr)!important; }
          .achievement-grid { grid-template-columns:repeat(2, 1fr)!important; }
        }

        @media(max-width:768px) {
          h1 { font-size:2.5rem!important; }
          .btn-primary, .btn-outline { padding:0.9rem 1.8rem!important; font-size:0.9rem!important; }
          .tech-stack-grid { grid-template-columns:repeat(2, 1fr)!important; }
          .achievement-grid { grid-template-columns:1fr!important; }
        }
      `}</style>

      {/* Custom Cursor */}
      <div 
        className="custom-cursor" 
        style={{ 
          left: mousePos.x - 10, 
          top: mousePos.y - 10 
        }} 
      />
      <div 
        className="custom-cursor-dot" 
        style={{ 
          left: mousePos.x - 2, 
          top: mousePos.y - 2 
        }} 
      />

      <div style={{ 
        background:'#0a0a14', 
        minHeight:"100vh",
        position:"relative",
        overflow:"hidden"
      }}>
        
        {/* Enhanced Progress Bar */}
        <div style={{
          position:"fixed",
          top:0,
          left:0,
          right:0,
          height:"4px",
          background:"rgba(255,255,255,0.05)",
          zIndex:10000
        }}>
          <div style={{
            width:`${scrollProgress}%`,
            height:"100%",
            background:"linear-gradient(90deg, #00f5ff, #a855f7, #ffd700)",
            transition:"width 0.1s",
            boxShadow:"0 0 20px rgba(0,245,255,0.6)"
          }} />
        </div>

        {/* Canvas */}
        <canvas 
          ref={canvasRef} 
          style={{ 
            position:'fixed', 
            inset:0, 
            pointerEvents:'none', 
            zIndex:1,
            opacity:0.6
          }} 
        />

        {/* Enhanced Gradient Overlay */}
        <div style={{
          position:"fixed",
          inset:0,
          background:`
            radial-gradient(circle at 20% 80%, rgba(0,245,255,0.12) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(168,85,247,0.12) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, rgba(255,215,0,0.05) 0%, transparent 70%)
          `,
          pointerEvents:"none",
          zIndex:2
        }} />

        {/* Content */}
        <div style={{ 
          maxWidth:"1400px", 
          margin:"0 auto", 
          padding:"0 2rem", 
          position:"relative", 
          zIndex:10 
        }}>
          
          {/* HERO - SWAPPED LAYOUT */}
          <section style={{ 
            minHeight:"100vh", 
            display:"grid", 
            gridTemplateColumns:"1fr 1.2fr", 
            gap:"5rem", 
            alignItems:"center",
            paddingTop:"5rem"
          }} className="hero-grid">
            
            {/* Enhanced Profile Card with Professional Ring - NOW ON LEFT */}
            <div className="profile-card scale-in delay-2" style={{
              position:"relative",
              maxWidth:"450px",
              margin:"0 auto"
            }}>
              <div style={{
                position:"relative",
                aspectRatio:"4/5",
                animation:"float 6s ease-in-out infinite"
              }}>
                {/* Glowing Corners */}
                {[
                  { top:"-12px", left:"-12px", borderTop:"4px solid #00f5ff", borderLeft:"4px solid #00f5ff", boxShadow:"0 0 20px #00f5ff" },
                  { top:"-12px", right:"-12px", borderTop:"4px solid #a855f7", borderRight:"4px solid #a855f7", boxShadow:"0 0 20px #a855f7" },
                  { bottom:"-12px", left:"-12px", borderBottom:"4px solid #22c55e", borderLeft:"4px solid #22c55e", boxShadow:"0 0 20px #22c55e" },
                  { bottom:"-12px", right:"-12px", borderBottom:"4px solid #ffd700", borderRight:"4px solid #ffd700", boxShadow:"0 0 20px #ffd700" }
                ].map((c, i) => (
                  <div key={i} style={{
                    position:"absolute",
                    width:"35px",
                    height:"35px",
                    ...c,
                    animation:"pulse 3s ease-in-out infinite",
                    animationDelay:`${i * 0.3}s`,
                    zIndex:3
                  }} />
                ))}

                {/* Image */}
                <div style={{
                  position:"relative",
                  width:"100%",
                  height:"100%",
                  borderRadius:"24px",
                  overflow:"hidden",
                  border:"3px solid rgba(0,245,255,0.5)",
                  boxShadow:"0 0 60px rgba(0,245,255,0.4), inset 0 0 30px rgba(0,245,255,0.1)",
                  zIndex:1
                }}>
                  <img src={profileImg} alt="Profile" style={{
                    width:"100%",
                    height:"100%",
                    objectFit:"cover"
                  }} />

                  <div style={{
                    position:"absolute",
                    inset:0,
                    background:"linear-gradient(to top, rgba(0,0,0,0.95) 0%, transparent 65%)"
                  }} />

                  {/* Enhanced Tech Badges */}
                  {[
                    { icon:Brain, label:"AI/ML", color:"#a855f7", pos:{ top:"20px", left:"20px" } },
                    { icon:Code, label:"Full-Stack", color:"#00f5ff", pos:{ top:"20px", right:"20px" } },
                    { icon:Database, label:"Databases", color:"#22c55e", pos:{ bottom:"140px", left:"20px" } },
                    { icon:Cloud, label:"Cloud", color:"#FF9900", pos:{ bottom:"140px", right:"20px" } }
                  ].map((b, i) => (
                    <div key={i} style={{
                      position:"absolute",
                      ...b.pos,
                      width:"56px",
                      height:"56px",
                      background:"rgba(0,0,0,0.9)",
                      border:`3px solid ${b.color}`,
                      borderRadius:"12px",
                      display:"flex",
                      alignItems:"center",
                      justifyContent:"center",
                      color:b.color,
                      boxShadow:`0 0 20px ${b.color}60`,
                      animation:"pulse 2s ease-in-out infinite",
                      animationDelay:`${i * 0.2}s`
                    }}>
                      <b.icon size={26} />
                    </div>
                  ))}

                  {/* Enhanced Bottom Section with Status */}
                  <div style={{
                    position:"absolute",
                    bottom:0,
                    left:0,
                    right:0,
                    background:"linear-gradient(to top, rgba(0,0,0,0.98), rgba(0,0,0,0.85))",
                    borderTop:"3px solid #00f5ff",
                    padding:"1.3rem",
                    boxShadow:"0 -10px 30px rgba(0,245,255,0.2)"
                  }}>
                    {/* Status Bar in Profile Card */}
                    <div style={{
                      display:"flex",
                      justifyContent:"space-between",
                      alignItems:"center",
                      marginBottom:"1rem",
                      gap:"0.8rem",
                      flexWrap:"wrap"
                    }}>
                      {/* Available for Hire */}
                      <div style={{
                        display:"flex",
                        alignItems:"center",
                        gap:"0.5rem",
                        background:"rgba(34,197,94,0.2)",
                        border:"2px solid #22c55e",
                        borderRadius:"20px",
                        padding:"0.5rem 1rem",
                        flex:"1",
                        minWidth:"140px"
                      }}>
                        <div style={{
                          width:"8px",
                          height:"8px",
                          borderRadius:"50%",
                          background:"#22c55e",
                          boxShadow:"0 0 10px #22c55e",
                          animation:"pulse 2s ease-in-out infinite"
                        }} />
                        <span style={{
                          fontSize:"0.75rem",
                          color:"#22c55e",
                          fontWeight:700,
                          fontFamily:"'Roboto Mono',monospace",
                          textShadow:"0 0 10px #22c55e"
                        }}>
                          AVAILABLE
                        </span>
                      </div>

                      {/* Live Clock */}
                      <div style={{
                        display:"flex",
                        alignItems:"center",
                        gap:"0.5rem",
                        background:"rgba(0,245,255,0.2)",
                        border:"2px solid #00f5ff",
                        borderRadius:"20px",
                        padding:"0.5rem 1rem"
                      }}>
                        <Clock size={14} style={{ color:"#00f5ff" }} />
                        <span style={{
                          fontSize:"0.75rem",
                          color:"#00f5ff",
                          fontWeight:700,
                          fontFamily:"'Roboto Mono',monospace"
                        }}>
                          {currentTime.toLocaleTimeString('en-US', { hour12: false })}
                        </span>
                      </div>
                    </div>

                    {/* Tags */}
                    <div style={{
                      display:"flex",
                      gap:"0.6rem",
                      marginBottom:"1rem",
                      flexWrap:"wrap"
                    }}>
                      {["AI/ML", "Cloud", "Full-Stack"].map((t, i) => (
                        <span key={i} style={{
                          padding:"0.3rem 0.7rem",
                          background:"rgba(0,245,255,0.25)",
                          border:"1px solid #00f5ff",
                          borderRadius:"6px",
                          fontSize:"0.7rem",
                          color:"#00f5ff",
                          fontWeight:700,
                          boxShadow:"0 0 10px rgba(0,245,255,0.3)"
                        }}>
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* CTA Button */}
                    <a href="mailto:g.sivasatyasaibhagavan@gmail.com" style={{
                      display:"flex",
                      alignItems:"center",
                      justifyContent:"center",
                      gap:"0.6rem",
                      padding:"0.9rem",
                      background:"linear-gradient(135deg, #00f5ff, #00c4ff)",
                      borderRadius:"10px",
                      color:"#000",
                      fontWeight:800,
                      fontSize:"0.9rem",
                      textDecoration:"none",
                      transition:"all 0.3s",
                      boxShadow:"0 5px 20px rgba(0,245,255,0.4)"
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.transform = "scale(1.08)";
                      e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,245,255,0.6)";
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.transform = "scale(1)";
                      e.currentTarget.style.boxShadow = "0 5px 20px rgba(0,245,255,0.4)";
                    }}>
                      <Mail size={18} />
                      HIRE ME NOW
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Content - NOW ON RIGHT */}
            <div>
              {/* Enhanced Status Badge */}
              <div className="fade-in delay-1" style={{
                display:"inline-flex",
                alignItems:"center",
                gap:"0.7rem",
                background:"linear-gradient(135deg, rgba(0,245,255,0.15), rgba(168,85,247,0.15))",
                border:"2px solid rgba(0,245,255,0.4)",
                borderRadius:"30px",
                padding:"0.7rem 1.5rem",
                marginBottom:"2rem",
                fontFamily:"'Roboto Mono',monospace",
                fontSize:"0.85rem",
                fontWeight:700,
                color:"#00f5ff",
                boxShadow:"0 0 25px rgba(0,245,255,0.3)"
              }}>
                <Fingerprint size={16} style={{ animation:"pulse 2s ease-in-out infinite" }} />
                2026 GRADUATE • IMMEDIATE JOINER
              </div>

              {/* Name */}
              <h1 className="fade-in delay-2" style={{
                fontSize:"clamp(2.5rem, 7vw, 5.5rem)",
                fontWeight:900,
                lineHeight:1.1,
                marginBottom:"1rem",
                fontFamily:"'Orbitron',sans-serif",
                letterSpacing:"-0.02em"
              }}>
                <span style={{ color:'#fff' }}>SIVA SATYA SAI</span>
                <br />
                <span className="gradient-text">BHAGAVAN</span>
              </h1>

              {/* Enhanced Role */}
              <div className="fade-in delay-3" style={{
                fontSize:"clamp(1.2rem, 2.5vw, 2rem)",
                fontWeight:700,
                marginBottom:"1.5rem",
                fontFamily:"'Roboto Mono',monospace",
                color:"#00f5ff",
                minHeight:"3rem",
                display:"flex",
                alignItems:"center",
                textShadow:"0 0 30px rgba(0,245,255,0.5)"
              }}>
                &lt; {typedText}
                <span style={{
                  width:'3px',
                  height:'1.3em',
                  background:'#00f5ff',
                  marginLeft:'10px',
                  animation:'cursor 1s step-end infinite',
                  boxShadow:"0 0 10px #00f5ff"
                }} />
                &nbsp;/&gt;
              </div>

              {/* Enhanced Description */}
              <p className="fade-in delay-4" style={{
                fontSize:"1.15rem",
                lineHeight:1.8,
                color:"#c0c0c0",
                maxWidth:"700px",
                marginBottom:"2.5rem"
              }}>
                <strong style={{ color:'#fff', fontWeight:700 }}>Elite software engineer</strong> with{' '}
                <span style={{ color:'#00f5ff', fontWeight:600 }}>proven enterprise experience</span> across{' '}
                <strong style={{ color:'#fff' }}>3 industry internships</strong> at leading tech companies.
                Specialized in <span style={{ color:'#a855f7', fontWeight:600 }}>AI/ML systems</span> and{' '}
                <span style={{ color:'#22c55e', fontWeight:600 }}>scalable cloud architecture</span>.
                Delivered <strong style={{ color:'#fff' }}>15+ production-grade projects</strong> with{' '}
                <span style={{ color:'#ffd700', fontWeight:600 }}>100% client satisfaction</span>.
                Armed with <strong style={{ color:'#fff' }}>20+ industry certifications</strong> from 
                AWS, Azure, and Google Cloud.
              </p>

              {/* Buttons */}
              <div className="fade-in delay-5" style={{
                display:"flex",
                gap:"1.5rem",
                marginBottom:"3rem",
                flexWrap:"wrap"
              }}>
                <button 
                  onClick={() => handleNavigation('/projects')} 
                  className="btn-primary"
                >
                  <Rocket size={20} />
                  <span>VIEW PROJECTS</span>
                </button>
                <a 
                  href={resumePdf} 
                  download="Bhagavan_Resume.pdf" 
                  className="btn-outline" 
                  style={{ color:"#00f5ff" }}
                >
                  <Download size={20} />
                  <span>DOWNLOAD RESUME</span>
                </a>
              </div>

              {/* Enhanced Social */}
              <div className="fade-in delay-6" style={{
                display:"flex",
                gap:"1.2rem"
              }}>
                {[
                  { icon:Github, href:"https://github.com/bhagavan444", color:"#fff", label:"GitHub" },
                  { icon:Linkedin, href:"https://www.linkedin.com/in/gopalajosyula-siva-satya-sai-bhagavan-1624a027b/", color:"#00f5ff", label:"LinkedIn" },
                  { icon:Mail, href:"mailto:g.sivasatyasaibhagavan@gmail.com", color:"#a855f7", label:"Email" },
                  { icon:Phone, href:"tel:+917569205626", color:"#22c55e", label:"Phone" }
                ].map((social, i) => (
                  <a
                    key={i}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={social.label}
                    style={{
                      width:"52px",
                      height:"52px",
                      background:"rgba(0,0,0,0.6)",
                      border:`2px solid ${social.color}`,
                      borderRadius:"50%",
                      display:"flex",
                      alignItems:"center",
                      justifyContent:"center",
                      color:social.color,
                      transition:"all 0.3s cubic-bezier(0.16,1,0.3,1)",
                      textDecoration:"none",
                      position:"relative"
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = social.color;
                      e.currentTarget.style.color = "#000";
                      e.currentTarget.style.transform = "scale(1.3) translateY(-8px)";
                      e.currentTarget.style.boxShadow = `0 10px 30px ${social.color}80`;
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = "rgba(0,0,0,0.6)";
                      e.currentTarget.style.color = social.color;
                      e.currentTarget.style.transform = "scale(1) translateY(0)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    <social.icon size={22} />
                  </a>
                ))}
              </div>
            </div>
          </section>

          {/* ACHIEVEMENT BADGES */}
          <section id="achievements" data-observe style={{ padding:"4rem 0" }}>
            <h2 style={{
              fontSize:"clamp(2rem, 4vw, 3rem)",
              fontWeight:900,
              marginBottom:"3rem",
              textAlign:"center",
              fontFamily:"'Orbitron',sans-serif"
            }}>
              <span className="gradient-text">Achievements & Certifications</span>
            </h2>
            <div className="achievement-grid" style={{
              display:"grid",
              gridTemplateColumns:"repeat(auto-fit, minmax(250px, 1fr))",
              gap:"1.5rem"
            }}>
              {achievements.map((ach, i) => (
                <div key={i} className={`glass ${visibleSections.has('achievements') ? 'scale-in' : ''}`} style={{
                  padding:"1.5rem",
                  display:"flex",
                  alignItems:"center",
                  gap:"1rem",
                  opacity:visibleSections.has('achievements') ? 1 : 0,
                  animationDelay:`${i * 0.1}s`
                }}>
                  <div style={{
                    width:"50px",
                    height:"50px",
                    minWidth:"50px",
                    background:`${ach.color}20`,
                    border:`2px solid ${ach.color}`,
                    borderRadius:"12px",
                    display:"flex",
                    alignItems:"center",
                    justifyContent:"center",
                    color:ach.color,
                    boxShadow:`0 0 20px ${ach.color}40`
                  }}>
                    <ach.icon size={24} />
                  </div>
                  <div style={{
                    fontSize:"0.95rem",
                    fontWeight:700,
                    color:"#fff",
                    fontFamily:"'Rajdhani',sans-serif"
                  }}>
                    {ach.label}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* TECH STACK SHOWCASE WITH REAL ICONS */}
          <section id="techstack" data-observe style={{ padding:"4rem 0" }}>
            <h2 style={{
              fontSize:"clamp(2rem, 4vw, 3rem)",
              fontWeight:900,
              marginBottom:"1rem",
              textAlign:"center",
              fontFamily:"'Orbitron',sans-serif"
            }}>
              <span className="gradient-text">Technology Arsenal</span>
            </h2>
            <p style={{
              textAlign:"center",
              fontSize:"1.1rem",
              color:"#999",
              marginBottom:"3rem"
            }}>
              Mastery across the modern tech ecosystem
            </p>
            <div className="tech-stack-grid" style={{
              display:"grid",
              gridTemplateColumns:"repeat(auto-fit, minmax(140px, 1fr))",
              gap:"1.5rem",
              maxWidth:"1000px",
              margin:"0 auto"
            }}>
              {techStack.map((tech, i) => (
                <div key={i} className={`glass ${visibleSections.has('techstack') ? 'fade-in' : ''}`} style={{
                  padding:"1.5rem",
                  textAlign:"center",
                  opacity:visibleSections.has('techstack') ? 1 : 0,
                  animationDelay:`${i * 0.05}s`,
                  transition:"all 0.3s"
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = "translateY(-8px) scale(1.05)";
                  e.currentTarget.style.borderColor = tech.color;
                  e.currentTarget.style.boxShadow = `0 15px 40px ${tech.color}50`;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = "translateY(0) scale(1)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                  e.currentTarget.style.boxShadow = "none";
                }}>
                  <div style={{
                    width:"60px",
                    height:"60px",
                    margin:"0 auto 1rem",
                    background:`${tech.color}15`,
                    border:`2px solid ${tech.color}40`,
                    borderRadius:"12px",
                    display:"flex",
                    alignItems:"center",
                    justifyContent:"center",
                    padding:"0.8rem",
                    transition:"all 0.3s"
                  }}>
                    <img 
                      src={tech.icon} 
                      alt={tech.name}
                      style={{
                        width:"100%",
                        height:"100%",
                        objectFit:"contain",
                        filter: tech.name === "Next.js" ? "invert(1)" : "none"
                      }}
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                        e.currentTarget.parentElement.innerHTML = `<div style="font-size:1.5rem;font-weight:900;color:${tech.color}">${tech.name.charAt(0)}</div>`;
                      }}
                    />
                  </div>
                  <div style={{
                    fontSize:"0.95rem",
                    fontWeight:700,
                    color:"#fff",
                    fontFamily:"'Rajdhani',sans-serif",
                    letterSpacing:"0.5px"
                  }}>
                    {tech.name}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ENHANCED METRICS */}
          <section id="metrics" data-observe style={{ padding:"5rem 0" }}>
            <div style={{
              display:"grid",
              gridTemplateColumns:"repeat(auto-fit, minmax(280px, 1fr))",
              gap:"2.5rem"
            }}>
              {metrics.map((m, i) => (
                <div key={i} className={`glass ${visibleSections.has('metrics') ? 'fade-in' : ''}`} style={{
                  padding:"2.5rem",
                  textAlign:"center",
                  animationDelay:`${i * 0.15}s`,
                  opacity:visibleSections.has('metrics') ? 1 : 0,
                  position:"relative"
                }}>
                  {/* Glow effect on active */}
                  {activeMetric === i && (
                    <div style={{
                      position:"absolute",
                      inset:"-2px",
                      background:`linear-gradient(135deg, ${m.color}40, transparent)`,
                      borderRadius:"24px",
                      zIndex:-1,
                      animation:"pulse 2s ease-in-out infinite"
                    }} />
                  )}
                  
                  <div style={{
                    width:"70px",
                    height:"70px",
                    margin:"0 auto 1.2rem",
                    background:`${m.color}25`,
                    border:`3px solid ${m.color}`,
                    borderRadius:"50%",
                    display:"flex",
                    alignItems:"center",
                    justifyContent:"center",
                    color:m.color,
                    boxShadow:`0 0 30px ${m.color}60`,
                    animation:"float 4s ease-in-out infinite",
                    animationDelay:`${i * 0.3}s`
                  }}>
                    <m.icon size={32} />
                  </div>
                  <div style={{
                    fontSize:"3rem",
                    fontWeight:900,
                    color:m.color,
                    marginBottom:"0.8rem",
                    fontFamily:"'Orbitron',sans-serif",
                    textShadow:`0 0 20px ${m.color}80`
                  }}>
                    {m.value}
                  </div>
                  <div style={{
                    fontSize:"1.1rem",
                    fontWeight:700,
                    color:"#fff",
                    textTransform:"uppercase",
                    fontFamily:"'Rajdhani',sans-serif",
                    marginBottom:"0.5rem",
                    letterSpacing:"1px"
                  }}>
                    {m.label}
                  </div>
                  <div style={{
                    fontSize:"0.85rem",
                    color:"#999",
                    fontWeight:500
                  }}>
                    {m.subtitle}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ENHANCED SKILLS */}
          <section id="skills" data-observe style={{ padding:"5rem 0" }}>
            <h2 style={{
              fontSize:"clamp(2rem, 4vw, 3.5rem)",
              fontWeight:900,
              marginBottom:"1rem",
              textAlign:"center",
              fontFamily:"'Orbitron',sans-serif"
            }}>
              <span className="gradient-text">Elite Technical Arsenal</span>
            </h2>
            <p style={{
              textAlign:"center",
              fontSize:"1.1rem",
              color:"#999",
              marginBottom:"4rem",
              maxWidth:"700px",
              margin:"0 auto 4rem"
            }}>
              Battle-tested expertise in cutting-edge technologies and frameworks
            </p>

            <div style={{
              maxWidth:"1100px",
              margin:"0 auto",
              display:"flex",
              flexDirection:"column",
              gap:"2.5rem"
            }}>
              {skills.map((s, i) => (
                <div key={i} className={`glass ${visibleSections.has('skills') ? 'slide-in' : ''}`} style={{
                  padding:"2.5rem",
                  opacity:visibleSections.has('skills') ? 1 : 0,
                  animationDelay:`${i * 0.15}s`,
                  position:"relative"
                }}>
                  <div style={{
                    display:"flex",
                    alignItems:"flex-start",
                    gap:"1.5rem",
                    marginBottom:"1.5rem"
                  }}>
                    <div style={{
                      width:"60px",
                      height:"60px",
                      minWidth:"60px",
                      background:`${s.color}25`,
                      border:`3px solid ${s.color}`,
                      borderRadius:"12px",
                      display:"flex",
                      alignItems:"center",
                      justifyContent:"center",
                      color:s.color,
                      boxShadow:`0 0 25px ${s.color}60`
                    }}>
                      <s.icon size={28} />
                    </div>
                    <div style={{ flex:1 }}>
                      <div style={{
                        display:"flex",
                        justifyContent:"space-between",
                        alignItems:"center",
                        marginBottom:"0.8rem",
                        flexWrap:"wrap",
                        gap:"1rem"
                      }}>
                        <span style={{
                          fontSize:"1.3rem",
                          fontWeight:800,
                          color:"#fff",
                          fontFamily:"'Rajdhani',sans-serif",
                          letterSpacing:"0.5px"
                        }}>
                          {s.name}
                        </span>
                        <div style={{ display:"flex", alignItems:"center", gap:"1rem" }}>
                          <span style={{
                            fontFamily:"'Roboto Mono',monospace",
                            fontSize:"1.2rem",
                            color:s.color,
                            fontWeight:800,
                            textShadow:`0 0 10px ${s.color}60`
                          }}>
                            {skillProgress[s.name] || 0}%
                          </span>
                          <div style={{
                            padding:"0.4rem 0.8rem",
                            background:`${s.color}20`,
                            border:`1px solid ${s.color}`,
                            borderRadius:"6px",
                            fontSize:"0.75rem",
                            color:s.color,
                            fontWeight:700
                          }}>
                            EXPERT
                          </div>
                        </div>
                      </div>
                      <div style={{
                        height:"10px",
                        background:"rgba(255,255,255,0.05)",
                        borderRadius:"10px",
                        overflow:"hidden",
                        marginBottom:"1rem",
                        position:"relative"
                      }}>
                        <div style={{
                          width:`${skillProgress[s.name] || 0}%`,
                          height:"100%",
                          background:`linear-gradient(90deg, ${s.color}, ${s.color}DD)`,
                          borderRadius:"10px",
                          transition:"width 2s cubic-bezier(0.16,1,0.3,1)",
                          boxShadow:`0 0 15px ${s.color}80`
                        }} />
                      </div>
                      <div style={{
                        fontSize:"0.9rem",
                        color:"#aaa",
                        fontFamily:"'Roboto Mono',monospace",
                        lineHeight:1.6
                      }}>
                        {s.tech}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ENHANCED CTA */}
          <section style={{ padding:"6rem 0 8rem" }}>
            <div className="glass" style={{
              padding:"5rem 3rem",
              maxWidth:"1000px",
              margin:"0 auto",
              textAlign:"center",
              position:"relative",
              overflow:"hidden"
            }}>
              {/* Animated background */}
              <div style={{
                position:"absolute",
                inset:0,
                background:"linear-gradient(135deg, rgba(0,245,255,0.05), rgba(168,85,247,0.05))",
                animation:"gradient-shift 3s ease infinite",
                backgroundSize:"200% 200%"
              }} />
              
              <div style={{ position:"relative", zIndex:1 }}>
                <div style={{
                  display:"inline-flex",
                  alignItems:"center",
                  gap:"0.5rem",
                  background:"rgba(0,245,255,0.2)",
                  border:"2px solid #00f5ff",
                  borderRadius:"30px",
                  padding:"0.6rem 1.2rem",
                  marginBottom:"2rem",
                  fontSize:"0.85rem",
                  fontWeight:700,
                  color:"#00f5ff",
                  fontFamily:"'Roboto Mono',monospace"
                }}>
                  <Zap size={16} />
                  IMMEDIATE AVAILABILITY
                </div>

                <h2 style={{
                  fontSize:"clamp(2.2rem, 5vw, 3.8rem)",
                  fontWeight:900,
                  marginBottom:"1.5rem",
                  fontFamily:"'Orbitron',sans-serif",
                  lineHeight:1.2
                }}>
                  <span className="gradient-text">Ready to Drive Impact</span>
                  <br />
                  <span style={{ color:"#fff" }}>at Your Organization</span>
                </h2>
                
                <p style={{
                  fontSize:"1.15rem",
                  color:"#b0b0b0",
                  marginBottom:"3rem",
                  maxWidth:"800px",
                  margin:"0 auto 3rem",
                  lineHeight:1.8
                }}>
                  Seeking full-time opportunities at innovative tech companies where I can leverage my 
                  expertise in <strong style={{ color:"#00f5ff" }}>AI/ML</strong>, <strong style={{ color:"#a855f7" }}>
                  full-stack development</strong>, and <strong style={{ color:"#22c55e" }}>cloud architecture</strong> to 
                  build transformative solutions. Ready to contribute from day one with proven 
                  enterprise experience and a track record of delivery excellence.
                </p>
                
                <div style={{
                  display:"flex",
                  gap:"1.5rem",
                  justifyContent:"center",
                  flexWrap:"wrap"
                }}>
                  <a href="mailto:g.sivasatyasaibhagavan@gmail.com" className="btn-primary">
                    <Mail size={22} />
                    <span>SCHEDULE INTERVIEW</span>
                  </a>
                  <button onClick={() => handleNavigation('/projects')} className="btn-outline" style={{ color:"#a855f7" }}>
                    <Eye size={22} />
                    <span>VIEW PORTFOLIO</span>
                  </button>
                  <a href={resumePdf} download="Bhagavan_Resume.pdf" className="btn-outline" style={{ color:"#22c55e" }}>
                    <Download size={22} />
                    <span>GET RESUME</span>
                  </a>
                </div>

                {/* Contact info */}
                <div style={{
                  marginTop:"3rem",
                  paddingTop:"2rem",
                  borderTop:"1px solid rgba(255,255,255,0.1)",
                  display:"flex",
                  justifyContent:"center",
                  gap:"2rem",
                  flexWrap:"wrap"
                }}>
                  <a href="mailto:g.sivasatyasaibhagavan@gmail.com" style={{
                    display:"flex",
                    alignItems:"center",
                    gap:"0.5rem",
                    color:"#00f5ff",
                    textDecoration:"none",
                    fontSize:"0.95rem",
                    fontWeight:600,
                    transition:"all 0.3s"
                  }}
                  onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
                  onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}>
                    <Mail size={18} />
                    g.sivasatyasaibhagavan@gmail.com
                  </a>
                  <a href="tel:+917569205626" style={{
                    display:"flex",
                    alignItems:"center",
                    gap:"0.5rem",
                    color:"#22c55e",
                    textDecoration:"none",
                    fontSize:"0.95rem",
                    fontWeight:600,
                    transition:"all 0.3s"
                  }}
                  onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
                  onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}>
                    <Phone size={18} />
                    +91 7569205626
                  </a>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}