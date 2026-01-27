import React, { useState, useEffect, useRef } from 'react';
import {
  Code, Brain, Database, Terminal, Award, ExternalLink, X,
  CheckCircle2, Layers, Sparkles, Zap, Github, Trophy,
  Target, Flame, Star, Rocket, Clock, MapPin, Calendar,
  TrendingUp, Shield, Crown, Hexagon, Activity, Users,
  ChevronRight, Cpu, GitBranch, Box, Boxes, Globe,
  Briefcase, Mail, Download, Share2, Eye, Heart
} from 'lucide-react';

const internships = [
  {
    id: 1,
    title: "MERN Stack Intern",
    company: "StudyOwl Education Pvt Ltd",
    location: "Hybrid",
    period: "May – July 2025",
    duration: "3 months",
    badge: "Full-Stack Pro",
    rarity: "LEGENDARY",
    certId: "1bwbNlc9mdPYQOIyUpoiBIOhpyxaMBvbC",
    color: "#00f5ff",
    secondaryColor: "#8b5cf6",
    accentColor: "#f59e0b",
    icon: Code,
    impact: "Built production apps serving 1000+ users",
    rating: 98,
    tech: [
      "React", "Node.js", "Express", "MongoDB",
      "JWT", "REST APIs", "Git", "Cloud Deployment"
    ],
    responsibilities: [
      "Developed responsive UI components using React",
      "Built secure RESTful APIs with Node.js and Express",
      "Implemented JWT-based authentication and authorization",
      "Integrated frontend with backend services",
      "Collaborated with team using Git and Agile workflows"
    ],
    achievements: [
      "🚀 Built 3+ full-stack web applications",
      "🔐 Implemented secure login & role-based access",
      "⚡ Optimized API performance and database queries",
      "☁️ Deployed applications to cloud environments"
    ],
    impact_metrics: [
      { label: "Apps Built", value: "3+", icon: Layers },
      { label: "Users Served", value: "1K+", icon: Users },
      { label: "Uptime", value: "99%", icon: Activity }
    ],
    skills_gained: [
      "Full-Stack Development",
      "API Design & Security",
      "Cloud Deployment",
      "Team Collaboration"
    ]
  },
  {
    id: 2,
    title: "AI / ML Intern",
    company: "SmartBridge",
    location: "Remote",
    period: "May – June 2025",
    duration: "2 months",
    badge: "AI Engineer",
    rarity: "EPIC",
    certId: "1-_8ZI8uZ3DcrFpfZ3pts7VSYrAqPN5Zw",
    color: "#a78bfa",
    secondaryColor: "#ec4899",
    accentColor: "#06b6d4",
    icon: Brain,
    impact: "Achieved 85%+ accuracy on ML models",
    rating: 95,
    tech: [
      "Python", "TensorFlow", "Scikit-learn",
      "CNN", "OpenCV", "Flask"
    ],
    responsibilities: [
      "Designed and trained CNN models for image classification",
      "Preprocessed and augmented image datasets",
      "Evaluated models using accuracy and loss metrics",
      "Integrated trained models into Flask web applications",
      "Deployed ML models for real-time inference"
    ],
    achievements: [
      "🧠 Built and evaluated 5+ ML/DL models",
      "🎯 Achieved 85%+ accuracy on image classification tasks",
      "🔄 Implemented end-to-end ML pipelines",
      "⏱️ Delivered working AI demos within deadlines"
    ],
    impact_metrics: [
      { label: "Models Built", value: "5+", icon: Brain },
      { label: "Accuracy", value: "85%", icon: Target },
      { label: "Projects", value: "4", icon: Rocket }
    ],
    skills_gained: [
      "Deep Learning & CNNs",
      "Computer Vision",
      "Model Deployment",
      "ML Pipeline Design"
    ]
  },
  {
    id: 3,
    title: "Machine Learning & Data Science Intern",
    company: "Blackbucks",
    location: "Remote",
    period: "May – June 2024",
    duration: "2 months",
    badge: "Data Specialist",
    rarity: "EPIC",
    certId: "1yQQqBf32o8d3sYlheDCdaLTKj5_hepfY",
    color: "#00f5ff",
    secondaryColor: "#10b981",
    accentColor: "#f472b6",
    icon: Database,
    impact: "Processed 100K+ data records efficiently",
    rating: 92,
    tech: [
      "Python", "Pandas", "NumPy",
      "Scikit-learn", "Data Analysis", "Feature Engineering"
    ],
    responsibilities: [
      "Cleaned and preprocessed real-world datasets",
      "Performed exploratory data analysis (EDA)",
      "Built ML models for classification and prediction",
      "Evaluated models using standard ML metrics",
      "Documented findings and model performance"
    ],
    achievements: [
      "📊 Built multiple ML models from scratch",
      "🔧 Implemented feature engineering pipelines",
      "📈 Improved data quality and model accuracy",
      "💡 Strengthened foundation in data science workflows"
    ],
    impact_metrics: [
      { label: "Data Processed", value: "100K+", icon: Database },
      { label: "Models", value: "6", icon: TrendingUp },
      { label: "Accuracy", value: "92%", icon: CheckCircle2 }
    ],
    skills_gained: [
      "Data Preprocessing",
      "Feature Engineering",
      "ML Model Building",
      "Statistical Analysis"
    ]
  }
];

export default function EnterpriseInternships() {
  const [hoveredId, setHoveredId] = useState(null);
  const [activeCert, setActiveCert] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState('ALL');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollProgress, setScrollProgress] = useState(0);
  const [viewMode, setViewMode] = useState('grid');
  const canvasRef = useRef(null);

  // Mouse tracking for parallax
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2
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
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 2 + 1;
        this.color = ['#00f5ff', '#a78bfa', '#ec4899', '#10b981'][Math.floor(Math.random() * 4)];
        this.opacity = Math.random() * 0.5 + 0.2;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
      }
      draw() {
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.opacity;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    }

    const particles = Array.from({ length: 100 }, () => new Particle());

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        p.update();
        p.draw();
      });

      // Connect nearby particles
      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach(p2 => {
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.strokeStyle = p1.color;
            ctx.globalAlpha = 0.1 * (1 - dist / 120);
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        });
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

  const getCertificateUrl = (id) => `https://drive.google.com/thumbnail?id=${id}&sz=w1000`;
  const getViewUrl = (id) => `https://drive.google.com/file/d/${id}/view`;

  const getRarityColor = (rarity) => {
    const colors = {
      'LEGENDARY': '#ffd700',
      'EPIC': '#a78bfa',
      'RARE': '#00f5ff'
    };
    return colors[rarity] || '#00f5ff';
  };

  const filteredInternships = selectedFilter === 'ALL'
    ? internships
    : internships.filter(i => i.rarity === selectedFilter);

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
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(60px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes fadeInScale {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.9; transform: scale(1.05); }
        }

        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }

        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        .glass-card {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(30px) saturate(180%);
          border: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: 
            0 8px 32px 0 rgba(0, 0, 0, 0.37),
            inset 0 1px 0 0 rgba(255, 255, 255, 0.05);
        }

        .intern-card {
          position: relative;
          overflow: hidden;
          transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
          cursor: pointer;
          transform-style: preserve-3d;
        }

        .intern-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
          transition: left 0.6s;
        }

        .intern-card:hover::before {
          left: 100%;
        }

        .intern-card:hover {
          transform: translateY(-20px) scale(1.02);
        }

        .gradient-text {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: gradient-shift 3s ease infinite;
        }

        .tech-badge {
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .tech-badge:hover {
          transform: translateY(-4px) scale(1.05);
        }

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

        @media (max-width: 768px) {
          .intern-card:hover {
            transform: translateY(-10px) scale(1.01);
          }
        }
      `}</style>

      <div style={{
        minHeight: '100vh',
        background: 'radial-gradient(ellipse at top, #0f0f23 0%, #000000 100%)',
        color: '#fff',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Progress Bar */}
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: `${scrollProgress}%`,
          height: '3px',
          background: 'linear-gradient(90deg, #667eea, #764ba2, #f093fb)',
          zIndex: 10000,
          transition: 'width 0.1s',
          boxShadow: '0 0 20px #667eea'
        }} />

        {/* Particle Canvas */}
        <canvas
          ref={canvasRef}
          style={{
            position: 'fixed',
            inset: 0,
            pointerEvents: 'none',
            zIndex: 1,
            opacity: 0.4
          }}
        />

        {/* Gradient Orbs */}
        <div style={{
          position: 'absolute',
          top: '10%',
          left: `${50 + mousePosition.x * 5}%`,
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(102, 126, 234, 0.15) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(100px)',
          pointerEvents: 'none',
          transition: 'all 0.3s ease-out'
        }} />

        <div style={{
          position: 'absolute',
          bottom: '10%',
          right: `${50 + mousePosition.y * 5}%`,
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(118, 75, 162, 0.12) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(80px)',
          pointerEvents: 'none',
          transition: 'all 0.3s ease-out'
        }} />

        {/* Content */}
        <div style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: '1600px',
          margin: '0 auto',
          padding: '0 clamp(1rem, 5vw, 3rem)'
        }}>
          {/* Hero Section */}
          <section style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            paddingTop: '80px',
            paddingBottom: '80px'
          }}>
            {/* Badge */}
            <div
              className="glass-card"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.75rem 1.5rem',
                borderRadius: '100px',
                marginBottom: '2rem',
                fontSize: '0.9rem',
                fontWeight: 500,
                color: '#a0aec0',
                animation: 'fadeInScale 0.8s ease-out'
              }}
            >
              <Terminal size={18} style={{ color: '#667eea' }} />
              Professional Experience
              <Activity size={18} style={{ color: '#f093fb' }} />
            </div>

            {/* Main Title */}
            <h1
              className="gradient-text"
              style={{
                fontSize: 'clamp(3rem, 10vw, 7rem)',
                fontWeight: 900,
                lineHeight: 1.1,
                marginBottom: '2rem',
                fontFamily: "'Space Grotesk', sans-serif",
                letterSpacing: '-0.03em',
                animation: 'fadeInUp 1s ease-out'
              }}
            >
              ELITE
              <br />
              INTERNSHIPS
            </h1>

            {/* Subtitle */}
            <p style={{
              fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)',
              color: '#a0aec0',
              maxWidth: '800px',
              lineHeight: 1.8,
              marginBottom: '3rem',
              fontWeight: 400,
              animation: 'fadeInUp 1.2s ease-out'
            }}>
              Professional experience across cutting-edge domains:
              <br />
              Full-Stack Engineering • Artificial Intelligence • Data Science
            </p>

            {/* Stats */}
            <div style={{
              display: 'flex',
              gap: 'clamp(1.5rem, 4vw, 3rem)',
              flexWrap: 'wrap',
              justifyContent: 'center',
              marginBottom: '3rem',
              animation: 'fadeInUp 1.4s ease-out'
            }}>
              {[
                { icon: Flame, label: '3 Companies', color: '#ff6b35' },
                { icon: Clock, label: '7+ Months', color: '#00f5ff' },
                { icon: Trophy, label: '95% Success', color: '#ffd700' },
                { icon: Rocket, label: '15+ Projects', color: '#a78bfa' }
              ].map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={i}
                    className="glass-card"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      padding: '1rem 1.5rem',
                      borderRadius: '100px',
                      color: stat.color,
                      fontSize: '0.95rem',
                      fontWeight: 600,
                      border: `1px solid ${stat.color}40`
                    }}
                  >
                    <Icon size={20} />
                    {stat.label}
                  </div>
                );
              })}
            </div>

            {/* Filters */}
            <div style={{
              display: 'flex',
              gap: '1rem',
              flexWrap: 'wrap',
              justifyContent: 'center',
              animation: 'fadeInUp 1.6s ease-out'
            }}>
              {['ALL', 'LEGENDARY', 'EPIC'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setSelectedFilter(filter)}
                  className="glass-card"
                  style={{
                    padding: '0.875rem 2rem',
                    borderRadius: '100px',
                    fontSize: '0.95rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    background: selectedFilter === filter 
                      ? 'linear-gradient(135deg, #667eea, #764ba2)'
                      : 'rgba(255, 255, 255, 0.03)',
                    color: selectedFilter === filter ? '#fff' : '#a0aec0',
                    border: selectedFilter === filter 
                      ? 'none' 
                      : '1px solid rgba(255, 255, 255, 0.08)'
                  }}
                  onMouseEnter={(e) => {
                    if (selectedFilter !== filter) {
                      e.target.style.background = 'rgba(255, 255, 255, 0.05)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedFilter !== filter) {
                      e.target.style.background = 'rgba(255, 255, 255, 0.03)';
                    }
                  }}
                >
                  {filter === 'ALL' ? '⚡ All Experiences' : `✨ ${filter}`}
                </button>
              ))}
            </div>
          </section>

          {/* Internships Grid */}
          <section style={{
            padding: '4rem 0',
            marginBottom: '6rem'
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 450px), 1fr))',
              gap: 'clamp(2.5rem, 5vw, 4rem)'
            }}>
              {filteredInternships.map((intern, i) => {
                const isHovered = hoveredId === intern.id;
                const Icon = intern.icon;

                return (
                  <div
                    key={intern.id}
                    className="glass-card intern-card"
                    onMouseEnter={() => setHoveredId(intern.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    style={{
                      borderRadius: '32px',
                      overflow: 'hidden',
                      borderColor: isHovered ? intern.color : 'rgba(255, 255, 255, 0.08)',
                      boxShadow: isHovered 
                        ? `0 20px 60px rgba(${intern.color === '#00f5ff' ? '0, 245, 255' : intern.color === '#a78bfa' ? '167, 139, 250' : '16, 185, 129'}, 0.4)`
                        : '0 8px 32px rgba(0, 0, 0, 0.37)',
                      animation: `fadeInUp ${0.8 + i * 0.2}s ease-out`
                    }}
                  >
                    {/* Top Accent */}
                    <div style={{
                      height: '6px',
                      background: `linear-gradient(90deg, ${intern.color}, ${intern.secondaryColor}, ${intern.accentColor})`,
                      backgroundSize: '200% 100%',
                      animation: 'shimmer 3s linear infinite'
                    }} />

                    {/* Certificate Preview */}
                    <div
                      onClick={() => setActiveCert(intern)}
                      style={{
                        height: '260px',
                        position: 'relative',
                        overflow: 'hidden',
                        cursor: 'pointer'
                      }}
                    >
                      <img
                        src={getCertificateUrl(intern.certId)}
                        alt={`${intern.title} Certificate`}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          transition: 'transform 0.8s',
                          transform: isHovered ? 'scale(1.15)' : 'scale(1.05)'
                        }}
                      />

                      {/* Gradient Overlay */}
                      <div style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, transparent 60%)'
                      }} />

                      {/* Rarity Badge */}
                      <div style={{
                        position: 'absolute',
                        top: '1rem',
                        right: '1rem',
                        padding: '0.5rem 1.25rem',
                        background: getRarityColor(intern.rarity),
                        color: '#000',
                        borderRadius: '100px',
                        fontSize: '0.75rem',
                        fontWeight: 900,
                        letterSpacing: '1px',
                        fontFamily: "'Space Grotesk', sans-serif",
                        boxShadow: `0 0 30px ${getRarityColor(intern.rarity)}`,
                        animation: 'pulse 2s ease-in-out infinite'
                      }}>
                        ★ {intern.rarity}
                      </div>

                      {/* Rating */}
                      <div style={{
                        position: 'absolute',
                        top: '1rem',
                        left: '1rem',
                        padding: '0.75rem 1.25rem',
                        background: 'rgba(0, 0, 0, 0.8)',
                        backdropFilter: 'blur(10px)',
                        borderRadius: '100px',
                        border: `2px solid ${intern.color}`,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        fontSize: '1rem',
                        fontWeight: 800,
                        color: intern.color
                      }}>
                        <Star size={18} fill={intern.color} />
                        {intern.rating}%
                      </div>

                      {/* View Badge */}
                      <div style={{
                        position: 'absolute',
                        bottom: '1rem',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        padding: '0.875rem 2rem',
                        background: 'rgba(0, 0, 0, 0.7)',
                        backdropFilter: 'blur(10px)',
                        borderRadius: '100px',
                        border: `2px solid ${intern.color}`,
                        color: '#fff',
                        fontSize: '0.9rem',
                        fontWeight: 700,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        opacity: isHovered ? 1 : 0.7,
                        transition: 'opacity 0.3s'
                      }}>
                        <Award size={18} />
                        View Certificate
                      </div>
                    </div>

                    {/* Content */}
                    <div style={{
                      padding: 'clamp(2rem, 4vw, 2.5rem)'
                    }}>
                      {/* Icon & Duration */}
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '1.5rem',
                        gap: '1rem',
                        flexWrap: 'wrap'
                      }}>
                        <div style={{
                          width: '70px',
                          height: '70px',
                          background: `linear-gradient(135deg, ${intern.color}20, ${intern.color}10)`,
                          border: `2px solid ${intern.color}40`,
                          borderRadius: '20px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          animation: isHovered ? 'float 2s ease-in-out infinite' : 'none'
                        }}>
                          <Icon size={36} style={{ color: intern.color }} />
                        </div>

                        <div
                          className="glass-card"
                          style={{
                            padding: '0.625rem 1.25rem',
                            borderRadius: '100px',
                            border: `1px solid ${intern.color}40`,
                            color: intern.color,
                            fontSize: '0.85rem',
                            fontWeight: 700,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                          }}
                        >
                          <Clock size={16} />
                          {intern.duration}
                        </div>
                      </div>

                      {/* Title */}
                      <h3 style={{
                        fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                        fontWeight: 800,
                        color: '#fff',
                        marginBottom: '0.75rem',
                        fontFamily: "'Space Grotesk', sans-serif",
                        lineHeight: 1.2
                      }}>
                        {intern.title}
                      </h3>

                      {/* Company Info */}
                      <div style={{
                        fontSize: '1.1rem',
                        color: '#cbd5e0',
                        fontWeight: 600,
                        marginBottom: '0.5rem'
                      }}>
                        {intern.company}
                      </div>

                      <div style={{
                        display: 'flex',
                        gap: '1.5rem',
                        flexWrap: 'wrap',
                        fontSize: '0.95rem',
                        color: intern.color,
                        fontWeight: 500,
                        marginBottom: '1.5rem'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                          <MapPin size={16} />
                          {intern.location}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                          <Calendar size={16} />
                          {intern.period}
                        </div>
                      </div>

                      {/* Impact */}
                      <div
                        className="glass-card"
                        style={{
                          padding: '1rem',
                          borderRadius: '16px',
                          border: `1px solid ${intern.color}30`,
                          marginBottom: '1.5rem',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.75rem',
                          background: `${intern.color}05`
                        }}
                      >
                        <Trophy size={24} style={{ color: intern.color, flexShrink: 0 }} />
                        <span style={{
                          fontSize: '0.95rem',
                          fontWeight: 600,
                          color: '#e2e8f0'
                        }}>
                          {intern.impact}
                        </span>
                      </div>

                      {/* Metrics */}
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, 1fr)',
                        gap: '0.75rem',
                        marginBottom: '1.5rem'
                      }}>
                        {intern.impact_metrics.map((metric, idx) => {
                          const MetricIcon = metric.icon;
                          return (
                            <div
                              key={idx}
                              className="glass-card"
                              style={{
                                padding: '1rem',
                                borderRadius: '12px',
                                textAlign: 'center',
                                border: `1px solid ${intern.color}30`,
                                transition: 'all 0.3s'
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-4px)';
                                e.currentTarget.style.borderColor = intern.color;
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.borderColor = `${intern.color}30`;
                              }}
                            >
                              <MetricIcon size={20} style={{ 
                                color: intern.color, 
                                marginBottom: '0.5rem',
                                display: 'block',
                                margin: '0 auto 0.5rem'
                              }} />
                              <div style={{
                                fontSize: '1.5rem',
                                fontWeight: 900,
                                color: intern.color,
                                marginBottom: '0.25rem',
                                fontFamily: "'Space Grotesk', sans-serif"
                              }}>
                                {metric.value}
                              </div>
                              <div style={{
                                fontSize: '0.75rem',
                                color: '#94a3b8',
                                textTransform: 'uppercase',
                                letterSpacing: '0.5px',
                                fontWeight: 600
                              }}>
                                {metric.label}
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Tech Stack */}
                      <div
                        className="glass-card"
                        style={{
                          padding: '1.25rem',
                          borderRadius: '16px',
                          border: `1px solid ${intern.color}30`,
                          marginBottom: '1.5rem'
                        }}
                      >
                        <h4 style={{
                          color: intern.color,
                          fontSize: '0.95rem',
                          fontWeight: 700,
                          marginBottom: '1rem',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem'
                        }}>
                          <Cpu size={18} />
                          Tech Stack
                        </h4>
                        <div style={{
                          display: 'flex',
                          flexWrap: 'wrap',
                          gap: '0.5rem'
                        }}>
                          {intern.tech.map((t) => (
                            <span
                              key={t}
                              className="tech-badge"
                              style={{
                                padding: '0.5rem 1rem',
                                background: 'rgba(255, 255, 255, 0.05)',
                                border: `1px solid ${intern.color}40`,
                                borderRadius: '100px',
                                fontSize: '0.8rem',
                                color: '#cbd5e0',
                                fontFamily: "'JetBrains Mono', monospace",
                                fontWeight: 500
                              }}
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Achievements */}
                      <div
                        className="glass-card"
                        style={{
                          padding: '1.25rem',
                          borderRadius: '16px',
                          border: `1px solid ${intern.color}30`,
                          marginBottom: '1.5rem'
                        }}
                      >
                        <h4 style={{
                          color: intern.color,
                          fontSize: '0.95rem',
                          fontWeight: 700,
                          marginBottom: '1rem',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem'
                        }}>
                          <Zap size={18} />
                          Key Achievements
                        </h4>
                        <div style={{
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '0.625rem'
                        }}>
                          {intern.achievements.map((ach, idx) => (
                            <div
                              key={idx}
                              style={{
                                fontSize: '0.9rem',
                                color: '#e2e8f0',
                                padding: '0.5rem',
                                borderRadius: '8px',
                                transition: 'all 0.3s'
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.background = `${intern.color}10`;
                                e.currentTarget.style.transform = 'translateX(8px)';
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.background = 'transparent';
                                e.currentTarget.style.transform = 'translateX(0)';
                              }}
                            >
                              {ach}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* CTA */}
                      <a
                        href={getViewUrl(intern.certId)}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '0.75rem',
                          padding: '1rem',
                          background: `linear-gradient(90deg, ${intern.color}, ${intern.secondaryColor})`,
                          color: '#000',
                          fontWeight: 800,
                          borderRadius: '100px',
                          textDecoration: 'none',
                          fontSize: '0.95rem',
                          transition: 'all 0.3s',
                          fontFamily: "'Space Grotesk', sans-serif"
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'scale(1.03)';
                          e.currentTarget.style.boxShadow = `0 10px 30px ${intern.color}60`;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'scale(1)';
                          e.currentTarget.style.boxShadow = 'none';
                        }}
                      >
                        <Award size={20} />
                        View Certificate
                        <ExternalLink size={20} />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Stats Section */}
          <section
            className="glass-card"
            style={{
              padding: 'clamp(3rem, 6vw, 5rem) clamp(2rem, 4vw, 3rem)',
              borderRadius: '32px',
              marginBottom: '6rem',
              border: '1px solid rgba(102, 126, 234, 0.3)'
            }}
          >
            <h2 style={{
              fontSize: 'clamp(2.5rem, 6vw, 4rem)',
              fontWeight: 900,
              textAlign: 'center',
              marginBottom: '3rem',
              fontFamily: "'Space Grotesk', sans-serif"
            }}>
              <span className="gradient-text">Career Achievements</span>
            </h2>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '2rem'
            }}>
              {[
                { label: 'Experience', value: '7+', unit: 'Months', icon: Clock, color: '#667eea' },
                { label: 'Companies', value: '3', unit: 'Elite', icon: Shield, color: '#764ba2' },
                { label: 'Projects', value: '15+', unit: 'Built', icon: Rocket, color: '#f093fb' },
                { label: 'Technologies', value: '25+', unit: 'Skills', icon: Zap, color: '#10b981' },
                { label: 'Success Rate', value: '95%', unit: 'Average', icon: TrendingUp, color: '#fbbf24' },
                { label: 'Certificates', value: '3', unit: 'Verified', icon: Award, color: '#f97316' }
              ].map((stat, i) => {
                const StatIcon = stat.icon;
                return (
                  <div
                    key={i}
                    className="glass-card"
                    style={{
                      padding: '2rem',
                      borderRadius: '24px',
                      textAlign: 'center',
                      border: `1px solid ${stat.color}40`,
                      transition: 'all 0.4s',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-10px)';
                      e.currentTarget.style.boxShadow = `0 15px 40px ${stat.color}40`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <div style={{
                      width: '60px',
                      height: '60px',
                      margin: '0 auto 1rem',
                      background: `${stat.color}20`,
                      border: `2px solid ${stat.color}40`,
                      borderRadius: '16px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <StatIcon size={32} style={{ color: stat.color }} />
                    </div>
                    <div style={{
                      fontSize: '3rem',
                      fontWeight: 900,
                      color: stat.color,
                      marginBottom: '0.5rem',
                      fontFamily: "'Space Grotesk', sans-serif"
                    }}>
                      {stat.value}
                    </div>
                    <div style={{
                      fontSize: '1rem',
                      color: '#fff',
                      fontWeight: 700,
                      marginBottom: '0.25rem'
                    }}>
                      {stat.label}
                    </div>
                    <div style={{
                      fontSize: '0.85rem',
                      color: '#94a3b8',
                      fontWeight: 500
                    }}>
                      {stat.unit}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* CTA Section */}
          <section
            className="glass-card"
            style={{
              padding: 'clamp(4rem, 8vw, 6rem) clamp(2rem, 4vw, 3rem)',
              borderRadius: '32px',
              textAlign: 'center',
              background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))',
              border: '1px solid rgba(102, 126, 234, 0.3)',
              marginBottom: '6rem'
            }}
          >
            <h2 style={{
              fontSize: 'clamp(3rem, 8vw, 5rem)',
              fontWeight: 900,
              marginBottom: '1.5rem',
              fontFamily: "'Space Grotesk', sans-serif"
            }}>
              <span className="gradient-text">Ready to Collaborate?</span>
            </h2>

            <p style={{
              fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)',
              color: '#a0aec0',
              maxWidth: '800px',
              margin: '0 auto 3rem',
              lineHeight: 1.7
            }}>
              Let's build something amazing together. From full-stack applications to AI-powered solutions.
            </p>

            <div style={{
              display: 'flex',
              gap: '1.5rem',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              <a
                href="https://github.com/bhagavan444"
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card"
                style={{
                  padding: '1.25rem 2.5rem',
                  borderRadius: '100px',
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  textDecoration: 'none',
                  color: '#667eea',
                  border: '1px solid rgba(102, 126, 234, 0.5)',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(102, 126, 234, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <Github size={24} />
                View Repositories
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
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.boxShadow = '0 15px 40px rgba(102, 126, 234, 0.5)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <Mail size={24} />
                Let's Collaborate
              </a>
            </div>
          </section>
        </div>
      </div>

      {/* Certificate Modal */}
      {activeCert && (
        <div
          onClick={() => setActiveCert(null)}
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
            animation: 'fadeInScale 0.3s ease-out'
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="glass-card"
            style={{
              maxWidth: '1400px',
              width: '100%',
              maxHeight: '90vh',
              overflow: 'auto',
              borderRadius: '32px',
              border: `2px solid ${activeCert.color}`,
              position: 'relative'
            }}
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveCert(null)}
              className="glass-card"
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
                border: '2px solid #ff4444',
                background: 'rgba(255, 68, 68, 0.2)',
                transition: 'all 0.3s',
                zIndex: 10
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 68, 68, 0.4)';
                e.currentTarget.style.transform = 'rotate(90deg)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 68, 68, 0.2)';
                e.currentTarget.style.transform = 'rotate(0deg)';
              }}
            >
              <X size={24} color="#ff4444" />
            </button>

            {/* Certificate Image */}
            <img
              src={getCertificateUrl(activeCert.certId)}
              alt={`${activeCert.title} Certificate`}
              style={{
                width: '100%',
                maxHeight: '50vh',
                objectFit: 'contain',
                borderRadius: '32px 32px 0 0'
              }}
            />

            {/* Content */}
            <div style={{ padding: 'clamp(2rem, 5vw, 4rem)' }}>
              <h2 style={{
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                fontWeight: 900,
                background: `linear-gradient(90deg, ${activeCert.color}, ${activeCert.secondaryColor})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: '1.5rem',
                fontFamily: "'Space Grotesk', sans-serif"
              }}>
                {activeCert.title}
              </h2>

              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '2rem',
                marginBottom: '2rem',
                fontSize: '1.1rem',
                color: '#cbd5e0'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Briefcase size={20} style={{ color: activeCert.color }} />
                  {activeCert.company}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Calendar size={20} style={{ color: activeCert.color }} />
                  {activeCert.period}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <MapPin size={20} style={{ color: activeCert.color }} />
                  {activeCert.location}
                </div>
              </div>

              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '1rem',
                marginBottom: '2rem'
              }}>
                {activeCert.tech.map((t) => (
                  <span
                    key={t}
                    className="glass-card"
                    style={{
                      padding: '0.75rem 1.5rem',
                      borderRadius: '100px',
                      border: `1px solid ${activeCert.color}60`,
                      color: activeCert.color,
                      fontSize: '0.95rem',
                      fontWeight: 600,
                      fontFamily: "'JetBrains Mono', monospace"
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                marginBottom: '3rem'
              }}>
                {activeCert.achievements.map((ach, idx) => (
                  <div
                    key={idx}
                    className="glass-card"
                    style={{
                      padding: '1rem',
                      borderRadius: '12px',
                      borderLeft: `4px solid ${activeCert.color}`,
                      fontSize: '1rem',
                      color: '#e2e8f0'
                    }}
                  >
                    {ach}
                  </div>
                ))}
              </div>

              <div style={{ textAlign: 'center' }}>
                <a
                  href={getViewUrl(activeCert.certId)}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '1rem',
                    padding: '1.25rem 3rem',
                    background: `linear-gradient(90deg, ${activeCert.color}, ${activeCert.secondaryColor})`,
                    color: '#000',
                    fontWeight: 800,
                    fontSize: '1.1rem',
                    borderRadius: '100px',
                    textDecoration: 'none',
                    transition: 'all 0.3s',
                    fontFamily: "'Space Grotesk', sans-serif"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05)';
                    e.currentTarget.style.boxShadow = `0 15px 40px ${activeCert.color}60`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <Award size={24} />
                  View Full Certificate
                  <ExternalLink size={24} />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}