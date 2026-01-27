"use client";
import { useState, useEffect, useRef } from "react";
import {
  Trophy, Award, Users, Target, TrendingUp, Zap, Star, Medal,
  Sparkles, X, CheckCircle2, Rocket, Brain, Code2, Flame,
  Crown, Globe, Cpu, Database, Lock, GitBranch, Terminal,
  Download, ExternalLink, Share2, Heart, Eye, Clock,
  ArrowRight, ChevronRight, BadgeCheck, ShieldCheck,
  Code, Server, Layers, GitPullRequest, GitCommit,
  Hexagon, Shield, Swords, Gem, Skull, Radio, Activity
} from "lucide-react";

const achievements = [
  {
    id: 1,
    category: "Competition",
    icon: Trophy,
    title: "National Hackathon Champion",
    subtitle: "Brainovision National Talent Hunt 2024",
    rank: "1st Place",
    description: "Led full-stack development in a 24-hour national championship. Built a production-grade MERN electronics marketplace with real-time chat (Socket.io), JWT fortress security, role-based access control, and optimized deployment.",
    highlights: [
      "Designed complete system architecture & MongoDB schemas",
      "Implemented 20+ secure REST APIs & WebSocket features",
      "Delivered responsive React frontend with Redux state management",
      "Achieved 100% uptime during live demo under extreme pressure"
    ],
    impact: [
      "Won ₹50,000 cash prize + national recognition",
      "Selected for top industry mentorship program"
    ],
    tech: ["React", "Node.js", "Express", "MongoDB", "Socket.io", "JWT", "Redux"],
    color: "#00f0ff",
    secondaryColor: "#0088ff",
    rarity: "Legendary",
    year: "2024",
    certificate: true,
    stats: { difficulty: 98, impact: 95, innovation: 92 }
  },
  {
    id: 2,
    category: "Certification",
    icon: Award,
    title: "15+ Industry Certifications",
    subtitle: "Elite Developer Credential Stack",
    rank: "Multiple Specializations",
    description: "Mastered cutting-edge technologies through rigorous professional certifications from leading platforms and organizations.",
    highlights: [
      "Generative AI & Large Language Models",
      "Advanced Machine Learning & Deep Learning",
      "Full-Stack Web Development (MERN)",
      "Cloud Computing (AWS & Azure)",
      "DevOps & CI/CD Pipelines",
      "Data Structures & Algorithms Mastery"
    ],
    impact: [
      "Recognized by top 1% of certified developers globally",
      "Directly applied knowledge in production-grade projects"
    ],
    tech: ["Python", "TensorFlow", "PyTorch", "AWS", "Docker", "Kubernetes", "Git"],
    color: "#a78bfa",
    secondaryColor: "#8b5cf6",
    rarity: "Legendary",
    year: "2023–2025",
    stats: { difficulty: 88, impact: 90, innovation: 85 }
  },
  {
    id: 3,
    category: "Production",
    icon: Rocket,
    title: "8+ End-to-End Production Projects",
    subtitle: "Real-World Impact Delivered",
    rank: "Full Ownership",
    description: "Architected, developed, and successfully deployed 8+ complete full-stack & AI/ML projects from concept to production.",
    highlights: [
      "Secure authentication systems with JWT & OAuth 2.0",
      "Scalable REST & GraphQL APIs with rate limiting & caching",
      "Real-time features using WebSockets & Server-Sent Events",
      "CI/CD pipelines with GitHub Actions & Docker",
      "Performance optimization (Lighthouse 95+ scores)"
    ],
    impact: [
      "Used by 5000+ users across multiple platforms",
      "Zero critical security vulnerabilities in production"
    ],
    tech: ["React", "Next.js", "Node.js", "TypeScript", "PostgreSQL", "MongoDB", "AWS"],
    color: "#ff61d2",
    secondaryColor: "#ec4899",
    rarity: "Epic",
    year: "2023–2025",
    stats: { difficulty: 92, impact: 96, innovation: 89 }
  },
  {
    id: 4,
    category: "Open Source",
    icon: GitPullRequest,
    title: "Active Open Source Contributor",
    subtitle: "GitHub Impact & Community",
    rank: "Consistent Contributor",
    description: "Regularly contribute to open-source projects, create developer tools, and maintain popular repositories.",
    highlights: [
      "Created 5+ developer productivity tools (10k+ downloads)",
      "Contributed to major libraries & frameworks",
      "Maintained 3 repositories with 2k+ stars collectively",
      "Active in GitHub Discussions & Issues"
    ],
    impact: [
      "Helped 5000+ developers worldwide",
      "Featured in GitHub trending repositories"
    ],
    tech: ["TypeScript", "React", "Node.js", "Rust", "Go"],
    color: "#00ff88",
    secondaryColor: "#10b981",
    rarity: "Epic",
    year: "2024–2025",
    stats: { difficulty: 85, impact: 88, innovation: 91 }
  }
];

const metrics = [
  { label: "Production Projects", value: "8+", icon: Rocket, color: "#00f0ff" },
  { label: "Technologies Mastered", value: "35+", icon: Cpu, color: "#a78bfa" },
  { label: "Total Lines of Code", value: "25K+", icon: Code2, color: "#ff61d2" },
  { label: "GitHub Stars", value: "2.1K+", icon: Star, color: "#ffd700" },
  { label: "Hackathon Wins", value: "3", icon: Trophy, color: "#00ff88" },
  { label: "Certifications", value: "15+", icon: Award, color: "#ff9500" }
];

export default function EliteAchievements() {
  const [hoveredId, setHoveredId] = useState(null);
  const [activeAchievement, setActiveAchievement] = useState(null);
  const [activeMetric, setActiveMetric] = useState(null);
  const [showCertificate, setShowCertificate] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);

  // Advanced Particle Background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = Math.max(document.documentElement.scrollHeight, window.innerHeight);
    };
    resize();

    if (particlesRef.current.length === 0) {
      particlesRef.current = Array.from({ length: 60 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 2 + 1,
        color: ['#00f0ff', '#a78bfa', '#ff61d2', '#00ff88'][Math.floor(Math.random() * 4)],
        pulse: Math.random() * Math.PI * 2
      }));
    }

    const nodes = particlesRef.current;

    const animate = () => {
      time += 0.01;
      
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // DNA helix background
      const helixCenterX = canvas.width / 2;
      const helixAmplitude = Math.min(150, canvas.width * 0.15);
      const helixFrequency = 0.02;
      
      for (let y = 0; y < canvas.height; y += 10) {
        const x1 = helixCenterX + Math.sin(y * helixFrequency + time) * helixAmplitude;
        const x2 = helixCenterX - Math.sin(y * helixFrequency + time) * helixAmplitude;
        
        const alpha = Math.abs(Math.sin(y * 0.01 + time)) * 0.1;
        ctx.fillStyle = `rgba(0, 240, 255, ${alpha})`;
        ctx.beginPath();
        ctx.arc(x1, y, 2, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.fillStyle = `rgba(167, 139, 250, ${alpha})`;
        ctx.beginPath();
        ctx.arc(x2, y, 2, 0, Math.PI * 2);
        ctx.fill();
        
        if (y % 50 === 0) {
          ctx.strokeStyle = `rgba(255, 97, 210, ${alpha * 0.5})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(x1, y);
          ctx.lineTo(x2, y);
          ctx.stroke();
        }
      }

      // Update and draw nodes
      nodes.forEach((node, i) => {
        node.x += node.vx;
        node.y += node.vy;
        node.pulse += 0.03;

        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

        nodes.slice(i + 1).forEach(other => {
          const dx = other.x - node.x;
          const dy = other.y - node.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 150) {
            const alpha = (1 - dist / 150) * 0.2;
            ctx.strokeStyle = `${node.color}${Math.floor(alpha * 255).toString(16).padStart(2, '0')}`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(other.x, other.y);
            ctx.stroke();
          }
        });

        const pulseSize = node.radius * (1 + Math.sin(node.pulse) * 0.5);
        const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, pulseSize * 6);
        gradient.addColorStop(0, `${node.color}80`);
        gradient.addColorStop(0.5, `${node.color}40`);
        gradient.addColorStop(1, 'transparent');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(node.x, node.y, pulseSize * 6, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = node.color;
        ctx.beginPath();
        ctx.arc(node.x, node.y, pulseSize, 0, Math.PI * 2);
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
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleCertificateDownload = () => {
    // Placeholder for certificate download
    alert("Certificate download functionality - connect to your actual certificate file");
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=Rajdhani:wght@300;400;500;600;700&family=Fira+Code:wght@400;500;600;700&display=swap');

        :root {
          --neon-cyan: #00f0ff;
          --neon-purple: #a78bfa;
          --neon-pink: #ff61d2;
          --neon-gold: #ffd700;
          --neon-green: #00ff88;
        }

        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { overflow-x: hidden; }

        @keyframes slideInUp { 
          from { opacity:0; transform:translateY(80px) scale(0.95); } 
          to { opacity:1; transform:translateY(0) scale(1); } 
        }
        
        @keyframes glitchPulse { 
          0%, 100% { transform:translate(0) scale(1); filter:hue-rotate(0deg); } 
          20% { transform:translate(-3px,3px) scale(1.02); filter:hue-rotate(5deg); } 
          40% { transform:translate(3px,-3px) scale(0.98); filter:hue-rotate(-5deg); } 
          60% { transform:translate(-2px,-2px) scale(1.01); filter:hue-rotate(3deg); }
        }
        
        @keyframes energyFlow { 
          0% { transform:translateX(-100%); opacity:0; } 
          50% { opacity:0.6; } 
          100% { transform:translateX(200%); opacity:0; } 
        }
        
        @keyframes float3D { 
          0%, 100% { transform:translateY(0) rotateX(0deg); } 
          25% { transform:translateY(-15px) rotateX(5deg); }
          50% { transform:translateY(-8px) rotateX(-5deg); }
          75% { transform:translateY(-12px) rotateX(3deg); }
        }
        
        @keyframes scanline { 
          0% { transform:translateY(-100%); } 
          100% { transform:translateY(100%); } 
        }
        
        @keyframes hologramFlicker { 
          0%, 100% { opacity:1; } 
          50% { opacity:0.85; } 
        }
        
        @keyframes borderRun { 
          0% { background-position:0% 50%; } 
          50% { background-position:100% 50%; } 
          100% { background-position:0% 50%; } 
        }
        
        @keyframes textGlitch {
          0% { text-shadow: 2px 2px #00f0ff, -2px -2px #ff61d2; }
          25% { text-shadow: -2px 2px #a78bfa, 2px -2px #00ff88; }
          50% { text-shadow: 2px -2px #ffd700, -2px 2px #00f0ff; }
          75% { text-shadow: -2px -2px #ff61d2, 2px 2px #a78bfa; }
          100% { text-shadow: 2px 2px #00f0ff, -2px -2px #ff61d2; }
        }

        @keyframes pulseGradient {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.1); }
        }

        @keyframes spin { 
          to { transform: rotate(360deg); } 
        }

        .achieve-card {
          position: relative;
          background: linear-gradient(135deg, rgba(8,8,22,0.95), rgba(15,5,30,0.9));
          border: 2px solid rgba(0,240,255,0.25);
          border-radius: clamp(20px, 4vw, 28px);
          overflow: hidden;
          transition: all 0.7s cubic-bezier(0.16, 1, 0.3, 1);
          backdrop-filter: blur(12px) saturate(180%);
          transform-style: preserve-3d;
          perspective: 1000px;
        }

        .achieve-card::before {
          content: '';
          position: absolute;
          inset: -2px;
          background: linear-gradient(135deg, transparent 30%, var(--neon-cyan) 50%, transparent 70%);
          border-radius: clamp(20px, 4vw, 28px);
          opacity: 0;
          transition: opacity 0.5s;
          animation: scanline 4s linear infinite;
          pointer-events: none;
          z-index: 0;
        }

        .achieve-card:hover::before {
          opacity: 0.3;
        }

        .achieve-card::after {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), 
                      rgba(0,240,255,0.15) 0%, transparent 60%);
          opacity: 0;
          transition: opacity 0.3s;
          pointer-events: none;
          z-index: 1;
        }

        .achieve-card:hover::after {
          opacity: 1;
        }

        .metric-card {
          position: relative;
          background: linear-gradient(135deg, rgba(0,0,0,0.85), rgba(10,10,25,0.9));
          border: 2.5px solid;
          padding: clamp(1.5rem, 3vw, 2rem) clamp(1.2rem, 2.5vw, 1.8rem);
          border-radius: clamp(18px, 3vw, 24px);
          transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
          backdrop-filter: blur(10px);
          overflow: hidden;
        }

        .metric-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(45deg, transparent 30%, var(--metric-color) 50%, transparent 70%);
          animation: energyFlow 3s linear infinite;
          opacity: 0;
          transition: opacity 0.4s;
        }

        .metric-card:hover::before {
          opacity: 0.4;
        }

        .neon-text {
          background: linear-gradient(135deg, #00f0ff 0%, #a78bfa 25%, #ff61d2 50%, #ffd700 75%, #00ff88 100%);
          background-size: 300% 300%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: borderRun 8s ease infinite, textGlitch 5s infinite;
        }

        .hologram {
          position: relative;
          animation: hologramFlicker 4s infinite;
        }

        .hologram::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, 
            transparent 0%, 
            rgba(0,240,255,0.1) 50%, 
            transparent 100%);
          animation: scanline 2s linear infinite;
          pointer-events: none;
        }

        .tech-badge {
          position: relative;
          padding: clamp(0.6rem, 1.5vw, 0.7rem) clamp(1rem, 2vw, 1.5rem);
          background: rgba(0,0,0,0.6);
          border: 1.5px solid;
          border-radius: clamp(12px, 2vw, 16px);
          font-family: 'Fira Code', monospace;
          font-size: clamp(0.8rem, 2vw, 0.95rem);
          font-weight: 600;
          transition: all 0.4s;
          overflow: hidden;
        }

        .tech-badge::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent, var(--badge-color), transparent);
          transform: translateX(-100%);
          transition: transform 0.5s;
        }

        .tech-badge:hover::before {
          transform: translateX(100%);
        }

        .stat-bar {
          position: relative;
          height: 10px;
          background: rgba(0,0,0,0.5);
          border-radius: 10px;
          overflow: hidden;
        }

        .stat-bar-fill {
          height: 100%;
          border-radius: 10px;
          position: relative;
          transition: width 1.5s cubic-bezier(0.34, 1.56, 0.64, 1);
          box-shadow: 0 0 20px currentColor;
        }

        .stat-bar-fill::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent);
          animation: energyFlow 2s linear infinite;
        }

        .glass-morphism {
          background: rgba(8,8,22,0.7);
          backdrop-filter: blur(20px) saturate(180%);
          border: 1px solid rgba(255,255,255,0.1);
        }

        /* Responsive adjustments */
        @media (max-width: 1200px) {
          .achieve-grid { grid-template-columns: repeat(auto-fit, minmax(min(350px, 100%), 1fr)) !important; }
        }
        
        @media (max-width: 768px) {
          .achieve-grid { grid-template-columns: 1fr !important; }
          .achieve-card:hover { transform: translateY(-10px) scale(1.02) !important; }
          .metric-card:hover { transform: translateY(-10px) scale(1.05) !important; }
        }

        @media (max-width: 640px) {
          .achieve-card:hover { transform: translateY(-8px) scale(1.01) !important; }
        }

        /* Custom Scrollbar */
        ::-webkit-scrollbar { width: 10px; }
        ::-webkit-scrollbar-track { background: rgba(0,0,0,0.5); }
        ::-webkit-scrollbar-thumb { 
          background: linear-gradient(var(--neon-cyan), var(--neon-purple)); 
          border-radius: 10px;
          box-shadow: 0 0 10px var(--neon-cyan);
        }
        ::-webkit-scrollbar-thumb:hover { 
          background: linear-gradient(var(--neon-purple), var(--neon-pink)); 
        }
      `}</style>

      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(to bottom, #000000, #0a0a15, #000000)',
        color: '#e0e0ff',
        position: 'relative',
        overflow: 'hidden',
        padding: 'clamp(4rem, 10vw, 8rem) clamp(1rem, 3vw, 2rem) clamp(6rem, 12vw, 10rem)',
        fontFamily: "'Rajdhani', sans-serif"
      }}>
        {/* Background Layers */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, #000000 0%, #0a0515 50%, #000000 100%)',
          pointerEvents: 'none'
        }} />

        <div style={{
          position: 'absolute',
          inset: 0,
          background: 
            'radial-gradient(circle at 20% 30%, rgba(0,240,255,0.08), transparent 40%), ' +
            'radial-gradient(circle at 80% 20%, rgba(167,139,250,0.08), transparent 40%), ' +
            'radial-gradient(circle at 50% 80%, rgba(255,97,210,0.08), transparent 40%)',
          animation: 'pulseGradient 15s ease-in-out infinite',
          pointerEvents: 'none'
        }} />

        <canvas
          ref={canvasRef}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            zIndex: 1
          }}
        />

        {/* Mouse Follower */}
        <div style={{
          position: 'fixed',
          left: mousePos.x - 200,
          top: mousePos.y - 200,
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(0,240,255,0.15), transparent 70%)',
          pointerEvents: 'none',
          zIndex: 2,
          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          filter: 'blur(60px)'
        }} />

        <div style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: '1800px',
          margin: '0 auto'
        }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: 'clamp(4rem, 10vw, 8rem)' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 'clamp(0.8rem, 2vw, 1.2rem)',
              padding: 'clamp(0.9rem, 2vw, 1.2rem) clamp(1.5rem, 3vw, 2.5rem)',
              background: 'linear-gradient(135deg, rgba(0,240,255,0.15), rgba(167,139,250,0.15))',
              border: '3px solid rgba(0,240,255,0.6)',
              borderRadius: '999px',
              marginBottom: 'clamp(2rem, 4vw, 3rem)',
              animation: 'float3D 6s ease-in-out infinite',
              backdropFilter: 'blur(15px)',
              boxShadow: '0 0 60px rgba(0,240,255,0.4)',
              flexWrap: 'wrap',
              justifyContent: 'center'
            }}>
              <Hexagon size={Math.min(32, window.innerWidth * 0.05)} color="#ffd700" strokeWidth={3} />
              <span style={{ 
                fontFamily: "'Orbitron', sans-serif", 
                fontSize: 'clamp(0.85rem, 2vw, 1.2rem)', 
                fontWeight: 800,
                letterSpacing: 'clamp(1px, 0.3vw, 3px)',
                textAlign: 'center'
              }}>
                ELITE DEVELOPER ARSENAL — 2026
              </span>
              <Shield size={Math.min(32, window.innerWidth * 0.05)} color="#ffd700" strokeWidth={3} />
            </div>

            <h1 className="neon-text hologram" style={{
              fontSize: 'clamp(3.5rem, 12vw, 11rem)',
              fontWeight: 900,
              fontFamily: "'Orbitron', sans-serif",
              letterSpacing: 'clamp(2px, 1vw, 8px)',
              textTransform: 'uppercase',
              marginBottom: 'clamp(1.5rem, 3vw, 2rem)',
              lineHeight: 1,
              textShadow: '0 0 80px rgba(0,240,255,0.8)',
              wordWrap: 'break-word'
            }}>
              ACHIEVEMENTS
            </h1>

            <div style={{
              width: 'clamp(150px, 30vw, 200px)',
              height: 'clamp(4px, 1vw, 6px)',
              background: 'linear-gradient(90deg, transparent, #00f0ff, #a78bfa, #ff61d2, transparent)',
              margin: 'clamp(2rem, 4vw, 3rem) auto',
              borderRadius: '10px',
              boxShadow: '0 0 30px rgba(0,240,255,0.6)'
            }} />

            <p style={{
              fontSize: 'clamp(1rem, 3vw, 1.8rem)',
              color: '#b0b0d8',
              maxWidth: '1000px',
              margin: '0 auto',
              fontFamily: "'Fira Code', monospace",
              lineHeight: 1.8,
              fontWeight: 500,
              padding: '0 1rem'
            }}>
              <span style={{ color: '#00f0ff' }}>▸</span> Where precision engineering meets creative innovation<br/>
              <span style={{ color: '#a78bfa' }}>▸</span> National championships • Elite certifications • Production mastery
            </p>
          </div>

          {/* Metrics */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(200px, 100%), 1fr))',
            gap: 'clamp(1.5rem, 3vw, 2.5rem)',
            marginBottom: 'clamp(6rem, 12vw, 10rem)'
          }}>
            {metrics.map((metric, i) => {
              const isActive = activeMetric === i;
              return (
                <div
                  key={i}
                  className="metric-card hologram"
                  onMouseEnter={() => setActiveMetric(i)}
                  onMouseLeave={() => setActiveMetric(null)}
                  style={{
                    '--metric-color': metric.color,
                    borderColor: isActive ? metric.color : `${metric.color}40`,
                    animation: `slideInUp ${i * 0.15}s ease-out`,
                    cursor: 'pointer'
                  }}
                >
                  <div style={{
                    position: 'relative',
                    zIndex: 2,
                    textAlign: 'center'
                  }}>
                    <div style={{
                      width: 'clamp(60px, 12vw, 80px)',
                      height: 'clamp(60px, 12vw, 80px)',
                      margin: '0 auto clamp(1rem, 2vw, 1.5rem)',
                      background: `linear-gradient(135deg, ${metric.color}25, transparent)`,
                      border: `3px solid ${metric.color}`,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.5s',
                      transform: isActive ? 'rotate(360deg) scale(1.1)' : 'rotate(0deg) scale(1)',
                      boxShadow: isActive ? `0 0 50px ${metric.color}` : 'none'
                    }}>
                      <metric.icon size={Math.min(40, window.innerWidth * 0.06)} style={{ color: metric.color }} strokeWidth={2.5} />
                    </div>
                    
                    <div style={{
                      fontSize: 'clamp(2rem, 5vw, 4rem)',
                      fontWeight: 900,
                      fontFamily: "'Orbitron', sans-serif",
                      color: metric.color,
                      marginBottom: 'clamp(0.5rem, 1vw, 0.8rem)',
                      textShadow: `0 0 30px ${metric.color}80`,
                      letterSpacing: '2px'
                    }}>
                      {metric.value}
                    </div>
                    
                    <div style={{
                      color: '#c0c0e0',
                      fontSize: 'clamp(0.9rem, 2vw, 1.15rem)',
                      fontWeight: 700,
                      letterSpacing: '1px',
                      textTransform: 'uppercase'
                    }}>
                      {metric.label}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Achievements Grid */}
          <div className="achieve-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(380px, 100%), 1fr))',
            gap: 'clamp(2rem, 5vw, 5rem)',
            marginBottom: 'clamp(6rem, 12vw, 10rem)'
          }}>
            {achievements.map((ach) => {
              const isHovered = hoveredId === ach.id;
              return (
                <div
                  key={ach.id}
                  className="achieve-card"
                  onMouseEnter={() => setHoveredId(ach.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onClick={() => setActiveAchievement(ach)}
                  style={{
                    cursor: 'pointer',
                    '--card-color': ach.color,
                    animation: `slideInUp ${ach.id * 0.2}s ease-out`
                  }}
                  onMouseMove={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const x = ((e.clientX - rect.left) / rect.width) * 100;
                    const y = ((e.clientY - rect.top) / rect.height) * 100;
                    e.currentTarget.style.setProperty('--mouse-x', `${x}%`);
                    e.currentTarget.style.setProperty('--mouse-y', `${y}%`);
                  }}
                >
                  {/* Card Header */}
                  <div style={{
                    height: 'clamp(220px, 40vw, 320px)',
                    background: `linear-gradient(135deg, ${ach.color}20 0%, ${ach.secondaryColor}15 50%, transparent 100%)`,
                    position: 'relative',
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderBottom: `2px solid ${ach.color}40`
                  }}>
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      backgroundImage: `radial-gradient(circle, ${ach.color}15 1px, transparent 1px)`,
                      backgroundSize: '30px 30px',
                      opacity: 0.4,
                      animation: isHovered ? 'scanline 3s linear infinite' : 'none'
                    }} />

                    <div style={{
                      position: 'relative',
                      zIndex: 2,
                      width: 'clamp(140px, 25vw, 180px)',
                      height: 'clamp(140px, 25vw, 180px)',
                      border: `5px solid ${ach.color}`,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: `linear-gradient(135deg, ${ach.color}25, transparent)`,
                      backdropFilter: 'blur(10px)',
                      animation: isHovered ? 'float3D 4s ease-in-out infinite' : 'none',
                      boxShadow: isHovered ? `0 0 100px ${ach.color}` : `0 0 40px ${ach.color}50`,
                      transform: isHovered ? 'scale(1.15)' : 'scale(1)',
                      transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)'
                    }}>
                      <ach.icon size={Math.min(90, window.innerWidth * 0.12)} color={ach.color} strokeWidth={2.5} />
                      
                      {isHovered && (
                        <div style={{
                          position: 'absolute',
                          inset: -15,
                          border: `2px solid ${ach.color}`,
                          borderRadius: '50%',
                          borderTopColor: 'transparent',
                          animation: 'spin 3s linear infinite'
                        }} />
                      )}
                    </div>

                    {/* Badges */}
                    <div style={{
                      position: 'absolute',
                      top: 'clamp(1rem, 2vw, 2rem)',
                      right: 'clamp(1rem, 2vw, 2rem)',
                      padding: 'clamp(0.6rem, 1.5vw, 0.8rem) clamp(1rem, 2vw, 1.8rem)',
                      borderRadius: '999px',
                      backdropFilter: 'blur(15px)',
                      background: `${ach.color}35`,
                      border: `3px solid ${ach.color}`,
                      fontSize: 'clamp(0.8rem, 2vw, 1rem)',
                      fontWeight: 900,
                      fontFamily: "'Orbitron', sans-serif",
                      color: ach.color,
                      boxShadow: `0 0 30px ${ach.color}50`,
                      letterSpacing: '2px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}>
                      {ach.rarity === 'Legendary' && <Crown size={16} />}
                      {ach.rarity}
                    </div>

                    <div style={{
                      position: 'absolute',
                      top: 'clamp(1rem, 2vw, 2rem)',
                      left: 'clamp(1rem, 2vw, 2rem)',
                      padding: 'clamp(0.5rem, 1.5vw, 0.6rem) clamp(0.9rem, 2vw, 1.4rem)',
                      borderRadius: '12px',
                      background: 'rgba(0,0,0,0.8)',
                      border: `2px solid ${ach.color}60`,
                      fontSize: 'clamp(0.75rem, 2vw, 0.9rem)',
                      fontWeight: 700,
                      fontFamily: "'Fira Code', monospace",
                      color: ach.color,
                      backdropFilter: 'blur(10px)'
                    }}>
                      {ach.category} • {ach.year}
                    </div>
                  </div>

                  {/* Card Content */}
                  <div style={{ 
                    padding: 'clamp(2rem, 4vw, 3rem) clamp(1.5rem, 3vw, 2.5rem)',
                    position: 'relative',
                    zIndex: 2
                  }}>
                    <h3 style={{
                      fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
                      fontWeight: 900,
                      fontFamily: "'Orbitron', sans-serif",
                      color: '#ffffff',
                      marginBottom: 'clamp(0.8rem, 2vw, 1rem)',
                      letterSpacing: '1px',
                      lineHeight: 1.2
                    }}>
                      {ach.title}
                    </h3>

                    <div style={{
                      fontSize: 'clamp(1.1rem, 3vw, 1.45rem)',
                      fontWeight: 800,
                      color: ach.color,
                      marginBottom: 'clamp(0.6rem, 1.5vw, 0.8rem)',
                      fontFamily: "'Rajdhani', sans-serif",
                      textShadow: `0 0 20px ${ach.color}60`
                    }}>
                      {ach.subtitle}
                    </div>

                    <div style={{
                      display: 'inline-block',
                      padding: 'clamp(0.4rem, 1vw, 0.5rem) clamp(0.9rem, 2vw, 1.2rem)',
                      background: `${ach.color}15`,
                      border: `2px solid ${ach.color}50`,
                      borderRadius: '999px',
                      fontSize: 'clamp(0.9rem, 2vw, 1.05rem)',
                      fontWeight: 700,
                      color: ach.color,
                      marginBottom: 'clamp(1.5rem, 3vw, 2rem)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}>
                      <Target size={16} />
                      {ach.rank}
                    </div>

                    <p style={{
                      fontSize: 'clamp(0.95rem, 2vw, 1.1rem)',
                      color: '#d0d0ff',
                      lineHeight: 1.8,
                      marginBottom: 'clamp(1.5rem, 3vw, 2rem)',
                      fontFamily: "'Fira Code', monospace",
                      fontWeight: 400
                    }}>
                      {ach.description}
                    </p>

                    {/* Stats */}
                    <div style={{ marginBottom: 'clamp(1.5rem, 3vw, 2rem)' }}>
                      {Object.entries(ach.stats).map(([key, value]) => (
                        <div key={key} style={{ marginBottom: 'clamp(0.8rem, 2vw, 1rem)' }}>
                          <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            marginBottom: '0.5rem',
                            fontSize: 'clamp(0.8rem, 2vw, 0.95rem)',
                            fontWeight: 700,
                            color: ach.color,
                            textTransform: 'uppercase',
                            letterSpacing: '1px'
                          }}>
                            <span>{key}</span>
                            <span>{value}%</span>
                          </div>
                          <div className="stat-bar">
                            <div 
                              className="stat-bar-fill"
                              style={{
                                width: isHovered ? `${value}%` : '0%',
                                background: `linear-gradient(90deg, ${ach.color}, ${ach.secondaryColor})`,
                                color: ach.color
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Tech Stack */}
                    <div style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: 'clamp(0.6rem, 1.5vw, 0.9rem)',
                      marginBottom: 'clamp(1.5rem, 3vw, 2.5rem)'
                    }}>
                      {ach.tech.slice(0, 5).map((t, idx) => (
                        <div 
                          key={idx} 
                          className="tech-badge"
                          style={{
                            '--badge-color': ach.color,
                            borderColor: `${ach.color}60`,
                            color: ach.color
                          }}
                        >
                          {t}
                        </div>
                      ))}
                      {ach.tech.length > 5 && (
                        <div 
                          className="tech-badge"
                          style={{
                            '--badge-color': ach.color,
                            borderColor: `${ach.color}60`,
                            color: ach.color
                          }}
                        >
                          +{ach.tech.length - 5}
                        </div>
                      )}
                    </div>

                    {/* CTA */}
                    <button
                      style={{
                        width: '100%',
                        padding: 'clamp(1.1rem, 2.5vw, 1.4rem)',
                        background: `linear-gradient(135deg, ${ach.color}, ${ach.secondaryColor})`,
                        color: '#000',
                        fontWeight: 900,
                        fontFamily: "'Orbitron', sans-serif",
                        border: 'none',
                        borderRadius: '999px',
                        fontSize: 'clamp(0.95rem, 2vw, 1.15rem)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 'clamp(0.6rem, 1.5vw, 1rem)',
                        boxShadow: `0 0 50px ${ach.color}70`,
                        transition: 'all 0.4s',
                        letterSpacing: '2px',
                        textTransform: 'uppercase'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.03)';
                        e.currentTarget.style.boxShadow = `0 0 80px ${ach.color}`;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                        e.currentTarget.style.boxShadow = `0 0 50px ${ach.color}70`;
                      }}
                    >
                      <Sparkles size={20} />
                      View Details
                      <ArrowRight size={20} />
                    </button>
                  </div>

                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: `radial-gradient(circle at center, ${ach.color}20, transparent 60%)`,
                    opacity: isHovered ? 1 : 0,
                    transition: 'opacity 0.4s',
                    pointerEvents: 'none',
                    borderRadius: 'clamp(20px, 4vw, 28px)'
                  }} />
                </div>
              );
            })}
          </div>

          {/* Final CTA */}
          <div className="glass-morphism" style={{
            padding: 'clamp(4rem, 10vw, 8rem) clamp(2rem, 4vw, 3rem)',
            borderRadius: 'clamp(24px, 5vw, 40px)',
            border: '3px solid rgba(0,240,255,0.4)',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'radial-gradient(circle at 50% 0%, rgba(0,240,255,0.15), transparent 60%)',
              pointerEvents: 'none'
            }} />

            <div style={{ position: 'relative', zIndex: 2 }}>
              <Rocket size={Math.min(60, window.innerWidth * 0.1)} color="#ffd700" style={{ marginBottom: 'clamp(1.5rem, 3vw, 2rem)' }} strokeWidth={2.5} />
              
              <h2 className="neon-text" style={{
                fontSize: 'clamp(2.5rem, 8vw, 6rem)',
                fontWeight: 900,
                fontFamily: "'Orbitron', sans-serif",
                marginBottom: 'clamp(2rem, 4vw, 2.5rem)',
                letterSpacing: 'clamp(2px, 0.5vw, 4px)',
                lineHeight: 1.2
              }}>
                LET'S BUILD THE FUTURE
              </h2>

              <p style={{
                fontSize: 'clamp(1.1rem, 3vw, 1.5rem)',
                color: '#b0b0d8',
                maxWidth: '900px',
                margin: '0 auto clamp(3rem, 6vw, 4rem)',
                lineHeight: 2,
                fontFamily: "'Rajdhani', sans-serif",
                fontWeight: 500,
                padding: '0 1rem'
              }}>
                Ready to transform your vision into production-grade reality?<br/>
                Let's collaborate on something extraordinary.
              </p>

              <div style={{
                display: 'flex',
                gap: 'clamp(1.5rem, 3vw, 2.5rem)',
                justifyContent: 'center',
                flexWrap: 'wrap',
                padding: '0 1rem'
              }}>
                <a
                  href="https://github.com/yourusername"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    padding: 'clamp(1.2rem, 2.5vw, 1.6rem) clamp(2.5rem, 5vw, 4rem)',
                    background: 'rgba(0,240,255,0.15)',
                    border: '3px solid var(--neon-cyan)',
                    borderRadius: '999px',
                    color: 'var(--neon-cyan)',
                    fontWeight: 900,
                    fontFamily: "'Orbitron', sans-serif",
                    fontSize: 'clamp(1rem, 2.5vw, 1.4rem)',
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 'clamp(0.8rem, 2vw, 1.5rem)',
                    transition: 'all 0.4s',
                    letterSpacing: '2px'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-5px) scale(1.05)';
                    e.currentTarget.style.boxShadow = '0 0 80px var(--neon-cyan)';
                    e.currentTarget.style.background = 'rgba(0,240,255,0.25)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.background = 'rgba(0,240,255,0.15)';
                  }}
                >
                  <Code2 size={Math.min(34, window.innerWidth * 0.05)} />
                  PROJECTS
                </a>

                <a
                  href="https://linkedin.com/in/yourprofile"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    padding: 'clamp(1.2rem, 2.5vw, 1.6rem) clamp(2.5rem, 5vw, 4rem)',
                    background: 'linear-gradient(135deg, var(--neon-cyan), var(--neon-purple), var(--neon-pink))',
                    borderRadius: '999px',
                    color: '#000',
                    fontWeight: 900,
                    fontFamily: "'Orbitron', sans-serif",
                    fontSize: 'clamp(1rem, 2.5vw, 1.4rem)',
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 'clamp(0.8rem, 2vw, 1.5rem)',
                    boxShadow: '0 0 60px rgba(0,240,255,0.7)',
                    transition: 'all 0.4s',
                    letterSpacing: '2px'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-5px) scale(1.05)';
                    e.currentTarget.style.boxShadow = '0 0 120px rgba(0,240,255,0.9)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    e.currentTarget.style.boxShadow = '0 0 60px rgba(0,240,255,0.7)';
                  }}
                >
                  <Users size={Math.min(34, window.innerWidth * 0.05)} />
                  CONNECT
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        {scrollY < 200 && (
          <div style={{
            position: 'fixed',
            bottom: '3rem',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 100
          }}>
            <div style={{
              width: 'clamp(30px, 6vw, 40px)',
              height: 'clamp(50px, 10vw, 60px)',
              border: '3px solid var(--neon-cyan)',
              borderRadius: '20px',
              display: 'flex',
              justifyContent: 'center',
              paddingTop: '10px',
              animation: 'float3D 3s ease-in-out infinite'
            }}>
              <div style={{
                width: '6px',
                height: '10px',
                background: 'var(--neon-cyan)',
                borderRadius: '3px',
                animation: 'scanline 2s ease-in-out infinite'
              }} />
            </div>
          </div>
        )}
      </div>

      {/* Achievement Detail Modal */}
      {activeAchievement && (
        <div
          onClick={() => setActiveAchievement(null)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.97)',
            backdropFilter: 'blur(30px)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 'clamp(1rem, 3vw, 2rem)',
            animation: 'slideInUp 0.4s ease-out',
            overflowY: 'auto'
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            className="glass-morphism"
            style={{
              background: 'linear-gradient(135deg, rgba(8,8,22,0.98), rgba(15,5,30,0.95))',
              border: `6px solid ${activeAchievement.color}`,
              borderRadius: 'clamp(24px, 5vw, 40px)',
              maxWidth: '1300px',
              width: '100%',
              maxHeight: '95vh',
              overflowY: 'auto',
              boxShadow: `0 0 200px ${activeAchievement.color}`,
              position: 'relative'
            }}
          >
            <button
              onClick={() => setActiveAchievement(null)}
              style={{
                position: 'sticky',
                top: 'clamp(1rem, 3vw, 2rem)',
                left: 'calc(100% - clamp(3.5rem, 8vw, 5rem))',
                background: 'rgba(255,50,50,0.5)',
                border: '3px solid #ff3333',
                borderRadius: '50%',
                width: 'clamp(50px, 10vw, 70px)',
                height: 'clamp(50px, 10vw, 70px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                cursor: 'pointer',
                zIndex: 10,
                marginBottom: 'clamp(-50px, -10vw, -70px)',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.3s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.1) rotate(90deg)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
              }}
            >
              <X size={Math.min(40, window.innerWidth * 0.06)} strokeWidth={4} />
            </button>

            <div style={{
              padding: 'clamp(3rem, 8vw, 6rem) clamp(2rem, 5vw, 5rem) clamp(4rem, 10vw, 8rem)'
            }}>
              {/* Modal content here - abbreviated for space */}
              <div style={{ textAlign: 'center' }}>
                <h2 style={{
                  fontSize: 'clamp(2.5rem, 7vw, 5rem)',
                  fontWeight: 900,
                  fontFamily: "'Orbitron', sans-serif",
                  background: `linear-gradient(135deg, ${activeAchievement.color}, ${activeAchievement.secondaryColor}, #ffffff)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  marginBottom: '2rem'
                }}>
                  {activeAchievement.title}
                </h2>
                <p style={{
                  fontSize: 'clamp(1.1rem, 3vw, 1.4rem)',
                  color: '#d0d0ff',
                  lineHeight: 1.8,
                  padding: '0 1rem'
                }}>
                  {activeAchievement.description}
                </p>
              </div>

              <div style={{ textAlign: 'center', marginTop: 'clamp(3rem, 6vw, 6rem)' }}>
                <button
                  onClick={() => setActiveAchievement(null)}
                  style={{
                    padding: 'clamp(1.2rem, 3vw, 1.6rem) clamp(3rem, 6vw, 5rem)',
                    background: `linear-gradient(135deg, ${activeAchievement.color}, ${activeAchievement.secondaryColor})`,
                    border: 'none',
                    borderRadius: '999px',
                    color: '#000',
                    fontWeight: 900,
                    fontFamily: "'Orbitron', sans-serif",
                    fontSize: 'clamp(1.1rem, 3vw, 1.4rem)',
                    cursor: 'pointer',
                    transition: 'all 0.4s',
                    boxShadow: `0 0 60px ${activeAchievement.color}`,
                    letterSpacing: '2px'
                  }}
                >
                  CLOSE
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}