import React, { useState, useEffect, useRef } from 'react';
import {
  Code, Brain, Database, Terminal, Award, ExternalLink, X,
  CheckCircle2, Layers, Sparkles, Zap, Github, Trophy,
  Target, Flame, Star, Rocket, Clock, MapPin, Calendar,
  TrendingUp, Shield, Crown, Hexagon, Activity, Users
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
    color: "#00f0ff",
    secondaryColor: "#8b5cf6",
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
    color: "#00f0ff",
    secondaryColor: "#10b981",
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

export default function EliteInternships() {
  const [hoveredId, setHoveredId] = useState(null);
  const [activeCert, setActiveCert] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState('ALL');
  const canvasRef = useRef(null);

  // Particle network animation
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

    const particles = Array.from({ length: 80 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      size: Math.random() * 2.5 + 1,
      hue: Math.random() * 60 + 180
    }));

    const animate = () => {
      ctx.fillStyle = 'rgba(0,0,0,0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        particles.forEach((p2, j) => {
          if (i < j) {
            const dx = p.x - p2.x;
            const dy = p.y - p2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 120) {
              ctx.strokeStyle = `hsla(${p.hue}, 80%, 60%, ${0.25 * (1 - dist / 120)})`;
              ctx.lineWidth = 0.8;
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.stroke();
            }
          }
        });

        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 6);
        gradient.addColorStop(0, `hsla(${p.hue}, 100%, 60%, 0.5)`);
        gradient.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 6, 0, Math.PI * 2);
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

  const getCertificateUrl = (id) => `https://drive.google.com/thumbnail?id=${id}&sz=w1000`;
  const getViewUrl = (id) => `https://drive.google.com/file/d/${id}/view`;

  const getRarityColor = (rarity) => {
    const colors = {
      'LEGENDARY': '#ffd700',
      'EPIC': '#a78bfa',
      'RARE': '#00f0ff'
    };
    return colors[rarity] || '#00f0ff';
  };

  const filteredInternships = selectedFilter === 'ALL'
    ? internships
    : internships.filter(i => i.rarity === selectedFilter);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=Rajdhani:wght@300;400;500;600;700&family=Fira+Code:wght@400;500;600&display=swap');
        :root {
          --neon-primary: #00f0ff;
          --neon-secondary: #a78bfa;
          --neon-accent: #ec4899;
        }
        @keyframes slideIn { from { opacity:0; transform:translateY(60px); } to { opacity:1; transform:translateY(0); } }
        @keyframes slideUp { from { opacity:0; transform:translateY(40px); } to { opacity:1; transform:translateY(0); } }
        @keyframes scan { 0% { transform:translateY(-100%); } 100% { transform:translateY(100%); } }
        @keyframes float { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-12px); } }
        @keyframes pulse { 0%,100% { opacity:1; transform: scale(1); } 50% { opacity:0.8; transform: scale(1.05); } }
        @keyframes glow { 0%,100% { box-shadow: 0 0 25px currentColor; } 50% { box-shadow: 0 0 45px currentColor, 0 0 70px currentColor; } }
        @keyframes shimmer { 0% { background-position: -1000px 0; } 100% { background-position: 1000px 0; } }
        @keyframes rotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .intern-card {
          position: relative;
          background: linear-gradient(135deg, rgba(0,0,0,0.95), rgba(10,10,30,0.95));
          border: 2.5px solid;
          border-radius: 24px;
          overflow: hidden;
          transition: all 0.6s cubic-bezier(0.23,1,0.32,1);
          backdrop-filter: blur(12px);
          cursor: pointer;
        }
        .intern-card:hover {
          transform: translateY(-20px) scale(1.03);
          box-shadow: 0 25px 70px currentColor;
        }
        .intern-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, transparent 30%, rgba(255,255,255,0.08) 50%, transparent 70%);
          animation: scan 6s linear infinite;
          pointer-events: none;
          z-index: 1;
        }
        .intern-card::after {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
          animation: shimmer 3s infinite;
          pointer-events: none;
        }
        .tech-pill {
          background: rgba(0,0,0,0.8);
          border: 2px solid;
          padding: 0.6rem 1.1rem;
          border-radius: 999px;
          font-family: 'Fira Code',monospace;
          font-size: 0.88rem;
          font-weight: 600;
          transition: all 0.35s;
          cursor: pointer;
          position: relative;
          overflow: hidden;
        }
        .tech-pill::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent);
          transition: left 0.5s;
        }
        .tech-pill:hover::before {
          left: 100%;
        }
        .tech-pill:hover {
          transform: translateY(-4px) scale(1.08);
          box-shadow: 0 8px 25px currentColor;
        }
        .rarity-badge {
          position: absolute;
          top: 1.2rem;
          right: 1.2rem;
          padding: 0.6rem 1.3rem;
          border-radius: 999px;
          font-family: 'Orbitron', sans-serif;
          font-weight: 900;
          font-size: 0.75rem;
          letter-spacing: 1.5px;
          border: 2.5px solid;
          animation: pulse 2.5s ease-in-out infinite;
          z-index: 10;
          backdrop-filter: blur(10px);
        }
        .impact-metric {
          background: rgba(0,0,0,0.6);
          border: 2px solid;
          border-radius: 16px;
          padding: 1.2rem;
          text-align: center;
          transition: all 0.4s;
        }
        .impact-metric:hover {
          transform: translateY(-8px);
          box-shadow: 0 12px 35px currentColor;
        }
        .hexagon-icon {
          clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
          background: linear-gradient(135deg, currentColor, transparent);
          animation: rotate 25s linear infinite;
        }
        .filter-btn {
          background: rgba(0,0,0,0.75);
          border: 2.5px solid;
          padding: 0.85rem 1.8rem;
          border-radius: 999px;
          font-family: 'Orbitron', sans-serif;
          font-weight: 800;
          cursor: pointer;
          transition: all 0.35s;
          font-size: 0.9rem;
          letter-spacing: 1px;
        }
        .filter-btn:hover {
          transform: scale(1.08);
          box-shadow: 0 0 35px currentColor;
        }
        .filter-btn.active {
          background: currentColor;
          color: black;
          box-shadow: 0 0 50px currentColor;
        }
        @media (max-width: 768px) {
          .intern-card { max-width: 100%; margin: 0 auto; }
          .cert-preview { height: 200px !important; }
          .impact-metrics-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 480px) {
          .cert-preview { height: 180px !important; }
          .tech-pill { padding: 0.5rem 0.9rem; font-size: 0.82rem; }
        }
      `}</style>

      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(to bottom, #000000, #0a0a1e, #000000)',
        color: '#e0e0ff',
        position: 'relative',
        overflow: 'hidden',
        padding: '5rem 1rem 6rem',
        fontFamily: "'Rajdhani', sans-serif"
      }}>
        {/* Animated grid background */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(0,240,255,0.06) 2px, transparent 2px),
            linear-gradient(90deg, rgba(167,139,250,0.06) 2px, transparent 2px)
          `,
          backgroundSize: '60px 60px',
          opacity: 0.3,
          pointerEvents: 'none',
          animation: 'slideUp 30s linear infinite'
        }} />

        {/* Particle network canvas */}
        <canvas
          ref={canvasRef}
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            zIndex: 1
          }}
        />

        {/* Floating geometric orbs */}
        {[...Array(3)].map((_, i) => (
          <div key={i} style={{
            position: 'absolute',
            top: `${15 + i * 25}%`,
            right: `${5 + i * 8}%`,
            width: `${350 - i * 80}px`,
            height: `${350 - i * 80}px`,
            border: '2px solid rgba(0,240,255,0.12)',
            borderRadius: '50%',
            animation: `rotate ${25 + i * 10}s linear infinite ${i % 2 === 0 ? 'reverse' : ''}`,
            pointerEvents: 'none',
            zIndex: 0
          }} />
        ))}

        <div style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: '1600px',
          margin: '0 auto',
          width: '100%',
          padding: '0 0.5rem'
        }}>
          {/* Header */}
          <div style={{
            textAlign: 'center',
            marginBottom: '5rem',
            animation: 'slideIn 1s ease-out'
          }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '1rem',
              fontFamily: "'Fira Code', monospace",
              color: 'var(--neon-primary)',
              fontSize: 'clamp(1rem, 2.5vw, 1.15rem)',
              padding: '1rem 2rem',
              border: '2.5px solid rgba(0,240,255,0.5)',
              borderRadius: 999,
              marginBottom: '2rem',
              background: 'rgba(0,0,0,0.75)',
              animation: 'pulse 3s ease-in-out infinite'
            }}>
              <Terminal size={24} />
              <span>{'>'} experience.initialize()</span>
              <Activity size={24} />
            </div>

            <h1 style={{
              fontSize: 'clamp(4rem, 10vw, 7.5rem)',
              fontWeight: 900,
              letterSpacing: '6px',
              textTransform: 'uppercase',
              marginBottom: '2rem',
              lineHeight: 1.1,
              background: 'linear-gradient(90deg, #00f0ff, #a78bfa, #ec4899, #00f0ff)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundSize: '200% 100%',
              fontFamily: "'Orbitron', sans-serif"
            }}>
              ELITE INTERNSHIP JOURNEY
            </h1>

            <p style={{
              fontSize: 'clamp(1.2rem, 3vw, 1.45rem)',
              color: '#b0b0d8',
              maxWidth: '900px',
              margin: '0 auto 2.5rem',
              fontFamily: "'Rajdhani', sans-serif",
              fontWeight: 500,
              lineHeight: 1.7
            }}>
              Master-level industry experience across Full-Stack Development, Artificial Intelligence, and Data Science.
              <br />
              <span style={{ color: '#00f0ff', fontFamily: "'Fira Code', monospace", fontSize: '1.1rem' }}>
                [3 elite internships | 7 months combat-tested | Production-grade experience]
              </span>
            </p>

            {/* Filter Buttons */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '1.2rem',
              flexWrap: 'wrap',
              marginBottom: '1rem'
            }}>
              {['ALL', 'LEGENDARY', 'EPIC'].map(filter => (
                <button
                  key={filter}
                  className={`filter-btn ${selectedFilter === filter ? 'active' : ''}`}
                  onClick={() => setSelectedFilter(filter)}
                  style={{
                    borderColor: getRarityColor(filter),
                    color: selectedFilter === filter ? '#000' : getRarityColor(filter),
                    background: selectedFilter === filter ? getRarityColor(filter) : 'rgba(0,0,0,0.75)'
                  }}
                >
                  {filter === 'ALL' ? '🌟 ALL EXPERIENCES' : `✨ ${filter}`}
                </button>
              ))}
            </div>
          </div>

          {/* Internship Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))',
            gap: 'clamp(2.5rem, 5vw, 3.5rem)',
            marginBottom: '6rem',
            width: '100%'
          }}>
            {filteredInternships.map((intern, i) => {
              const isHovered = hoveredId === intern.id;
              const rarityColor = getRarityColor(intern.rarity);

              return (
                <div
                  key={intern.id}
                  className="intern-card"
                  onMouseEnter={() => setHoveredId(intern.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  style={{
                    borderColor: isHovered ? intern.color : 'rgba(0,240,255,0.25)',
                    animation: `slideUp ${0.7 + i * 0.12}s ease-out`,
                    opacity: 0,
                    animationFillMode: 'forwards',
                    animationDelay: `${i * 0.15}s`
                  }}
                >
                  {/* Rarity Badge */}
                  <div className="rarity-badge" style={{
                    background: rarityColor,
                    color: '#000',
                    borderColor: rarityColor,
                    boxShadow: isHovered ? `0 0 40px ${rarityColor}` : `0 0 20px ${rarityColor}50`
                  }}>
                    {intern.rarity}
                  </div>

                  {/* Top gradient bar */}
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '6px',
                    background: `linear-gradient(90deg, ${intern.color}, ${intern.secondaryColor})`,
                    opacity: isHovered ? 1 : 0.6,
                    transition: 'opacity 0.5s'
                  }} />

                  {/* Certificate Preview */}
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveCert(intern);
                    }}
                    className="cert-preview"
                    style={{
                      height: 'clamp(200px, 35vw, 260px)',
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

                    {/* Rating Badge */}
                    <div style={{
                      position: 'absolute',
                      top: '1.5rem',
                      left: '1.5rem',
                      background: 'rgba(0,0,0,0.9)',
                      backdropFilter: 'blur(15px)',
                      padding: '0.8rem 1.3rem',
                      borderRadius: 999,
                      border: `2.5px solid ${intern.color}`,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.6rem',
                      fontFamily: "'Orbitron', sans-serif",
                      fontWeight: 900,
                      fontSize: '1.1rem',
                      color: intern.color,
                      boxShadow: `0 0 30px ${intern.color}50`
                    }}>
                      <Star size={20} fill={intern.color} />
                      {intern.rating}%
                    </div>

                    {/* View Overlay */}
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, transparent 60%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      opacity: isHovered ? 1 : 0.5,
                      transition: 'opacity 0.5s'
                    }}>
                      <div style={{
                        padding: '1rem 2rem',
                        background: 'rgba(0,0,0,0.85)',
                        backdropFilter: 'blur(12px)',
                        border: `2.5px solid ${intern.color}`,
                        borderRadius: 999,
                        color: '#fff',
                        fontWeight: 800,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.8rem',
                        fontSize: '1rem',
                        fontFamily: "'Rajdhani', sans-serif",
                        boxShadow: isHovered ? `0 0 40px ${intern.color}` : 'none',
                        animation: isHovered ? 'pulse 2s ease-in-out infinite' : 'none'
                      }}>
                        <Award size={22} />
                        VIEW CERTIFICATE
                      </div>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div style={{
                    padding: 'clamp(1.8rem, 4vw, 2.5rem) clamp(1.6rem, 3.5vw, 2.2rem)',
                    position: 'relative',
                    zIndex: 2
                  }}>
                    {/* Icon + Duration */}
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '1.8rem',
                      flexWrap: 'wrap',
                      gap: '1rem'
                    }}>
                      <div className="hexagon-icon" style={{
                        width: '80px',
                        height: '80px',
                        background: `linear-gradient(135deg, ${intern.color}, transparent)`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        animation: isHovered ? 'float 3s ease-in-out infinite' : 'none',
                        boxShadow: isHovered ? `0 0 50px ${intern.color}` : 'none',
                        flexShrink: 0
                      }}>
                        <intern.icon size={38} style={{
                          color: intern.color,
                          transform: 'rotate(90deg)',
                          filter: 'drop-shadow(0 0 12px currentColor)'
                        }} />
                      </div>

                      <div style={{
                        padding: '0.7rem 1.4rem',
                        background: `linear-gradient(135deg, ${intern.color}20, ${intern.secondaryColor}20)`,
                        border: `2.5px solid ${intern.color}70`,
                        borderRadius: 999,
                        fontSize: '0.95rem',
                        fontWeight: 800,
                        color: intern.color,
                        fontFamily: "'Orbitron', sans-serif",
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.6rem'
                      }}>
                        <Clock size={18} />
                        {intern.duration}
                      </div>
                    </div>

                    {/* Title */}
                    <h3 style={{
                      fontSize: 'clamp(1.9rem, 4.5vw, 2.2rem)',
                      fontWeight: 900,
                      color: '#ffffff',
                      marginBottom: '0.8rem',
                      fontFamily: "'Orbitron', sans-serif",
                      letterSpacing: '1px'
                    }}>
                      {intern.title}
                    </h3>

                    {/* Company + Location + Period */}
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.6rem',
                      marginBottom: '0.8rem',
                      fontFamily: "'Rajdhani', sans-serif"
                    }}>
                      <div style={{
                        fontSize: '1.1rem',
                        color: '#d0d0ff',
                        fontWeight: 600
                      }}>
                        {intern.company}
                      </div>

                      <div style={{
                        display: 'flex',
                        gap: '1.5rem',
                        flexWrap: 'wrap',
                        fontSize: '1rem',
                        color: intern.color
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <MapPin size={16} />
                          {intern.location}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <Calendar size={16} />
                          {intern.period}
                        </div>
                      </div>
                    </div>

                    {/* Impact Statement */}
                    <div style={{
                      background: `linear-gradient(135deg, ${intern.color}15, ${intern.secondaryColor}15)`,
                      border: `2px solid ${intern.color}40`,
                      borderRadius: '16px',
                      padding: '1.2rem',
                      marginBottom: '2rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.9rem'
                    }}>
                      <Trophy size={26} style={{ color: intern.color, flexShrink: 0 }} />
                      <span style={{
                        fontFamily: "'Rajdhani', sans-serif",
                        fontSize: '1.08rem',
                        fontWeight: 700,
                        color: '#e0e0ff'
                      }}>
                        {intern.impact}
                      </span>
                    </div>

                    {/* Impact Metrics */}
                    <div className="impact-metrics-grid" style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(3, 1fr)',
                      gap: '1rem',
                      marginBottom: '2rem'
                    }}>
                      {intern.impact_metrics.map((metric, idx) => {
                        const MetricIcon = metric.icon;
                        return (
                          <div
                            key={idx}
                            className="impact-metric"
                            style={{
                              borderColor: `${intern.color}40`,
                              background: isHovered ? `${intern.color}10` : 'rgba(0,0,0,0.6)'
                            }}
                          >
                            <MetricIcon size={24} style={{ 
                              color: intern.color, 
                              marginBottom: '0.6rem',
                              display: 'block',
                              margin: '0 auto 0.6rem'
                            }} />
                            <div style={{
                              fontSize: '1.8rem',
                              fontWeight: 900,
                              color: intern.color,
                              fontFamily: "'Orbitron', sans-serif",
                              marginBottom: '0.3rem'
                            }}>
                              {metric.value}
                            </div>
                            <div style={{
                              fontSize: '0.85rem',
                              color: '#999',
                              textTransform: 'uppercase',
                              letterSpacing: '0.5px'
                            }}>
                              {metric.label}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Tech Stack */}
                    <div style={{
                      background: 'rgba(0,0,0,0.6)',
                      border: `2px solid ${intern.color}30`,
                      borderRadius: '18px',
                      padding: '1.5rem',
                      marginBottom: '2rem'
                    }}>
                      <h4 style={{
                        color: intern.color,
                        fontSize: '1.15rem',
                        fontWeight: 800,
                        marginBottom: '1.2rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        fontFamily: "'Orbitron', sans-serif"
                      }}>
                        <Layers size={22} /> Tech Arsenal
                      </h4>
                      <div style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '0.8rem'
                      }}>
                        {intern.tech.map(t => (
                          <span
                            key={t}
                            className="tech-pill"
                            style={{
                              color: isHovered ? intern.color : '#b0e0ff',
                              borderColor: isHovered ? intern.color : `${intern.color}50`
                            }}
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Achievements */}
                    <div style={{
                      background: 'rgba(0,0,0,0.6)',
                      border: `2px solid ${intern.color}30`,
                      borderRadius: '18px',
                      padding: '1.5rem',
                      marginBottom: '2rem'
                    }}>
                      <h4 style={{
                        color: intern.color,
                        fontSize: '1.15rem',
                        fontWeight: 800,
                        marginBottom: '1.2rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        fontFamily: "'Orbitron', sans-serif"
                      }}>
                        <Star size={22} /> Key Achievements
                      </h4>
                      <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.9rem'
                      }}>
                        {intern.achievements.map((ach, idx) => (
                          <div
                            key={idx}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.9rem',
                              fontSize: '1.02rem',
                              padding: '0.7rem',
                              borderRadius: '10px',
                              transition: 'all 0.3s',
                              background: 'transparent'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = `${intern.color}15`;
                              e.currentTarget.style.transform = 'translateX(10px)';
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

                    {/* Skills Gained */}
                    <details style={{
                      background: 'rgba(0,0,0,0.6)',
                      border: `2px solid ${intern.color}30`,
                      borderRadius: '18px',
                      padding: '1.5rem',
                      marginBottom: '2rem',
                      cursor: 'pointer'
                    }}>
                      <summary style={{
                        color: intern.color,
                        fontSize: '1.15rem',
                        fontWeight: 800,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        fontFamily: "'Orbitron', sans-serif",
                        cursor: 'pointer',
                        userSelect: 'none'
                      }}>
                        <Target size={22} /> Skills Mastered ({intern.skills_gained.length})
                      </summary>
                      <div style={{
                        marginTop: '1.2rem',
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '0.8rem'
                      }}>
                        {intern.skills_gained.map((skill, idx) => (
                          <div
                            key={idx}
                            style={{
                              padding: '0.7rem 1.3rem',
                              background: `${intern.color}15`,
                              border: `2px solid ${intern.color}60`,
                              borderRadius: 999,
                              fontSize: '0.95rem',
                              fontWeight: 700,
                              color: intern.color
                            }}
                          >
                            {skill}
                          </div>
                        ))}
                      </div>
                    </details>

                    {/* View Certificate Button */}
                    <a
                      href={getViewUrl(intern.certId)}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '1rem',
                        padding: '1.3rem',
                        background: `linear-gradient(90deg, ${intern.color}, ${intern.secondaryColor})`,
                        color: '#000',
                        fontWeight: 900,
                        borderRadius: 999,
                        textDecoration: 'none',
                        boxShadow: isHovered ? `0 0 50px ${intern.color}` : `0 0 30px ${intern.color}50`,
                        transition: 'all 0.4s',
                        fontSize: '1.1rem',
                        fontFamily: "'Orbitron', sans-serif",
                        letterSpacing: '1px'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.05)';
                        e.currentTarget.style.boxShadow = `0 0 60px ${intern.color}`;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                        e.currentTarget.style.boxShadow = `0 0 30px ${intern.color}50`;
                      }}
                    >
                      <Award size={24} />
                      VIEW CERTIFICATE
                      <ExternalLink size={24} />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Stats Overview */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(0,0,0,0.95), rgba(10,10,30,0.95))',
            border: '3px solid rgba(0,240,255,0.35)',
            borderRadius: '30px',
            padding: 'clamp(2.5rem, 6vw, 4rem) clamp(1.5rem, 4vw, 3rem)',
            position: 'relative',
            overflow: 'hidden',
            marginBottom: '5rem'
          }}>
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '6px',
              background: 'linear-gradient(90deg, #00f0ff, #a78bfa, #ec4899, #00f0ff)',
              backgroundSize: '200% 100%',
              animation: 'shimmer 3s linear infinite'
            }} />

            <h2 style={{
              fontSize: 'clamp(2.5rem, 6vw, 3.8rem)',
              fontWeight: 900,
              color: '#00f0ff',
              textAlign: 'center',
              marginBottom: '3.5rem',
              fontFamily: "'Orbitron', sans-serif",
              textTransform: 'uppercase',
              letterSpacing: '3px',
              textShadow: '0 0 35px #00f0ff'
            }}>
              🏆 CAREER ACHIEVEMENTS
            </h2>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))',
              gap: '2.5rem'
            }}>
              {[
                { label: 'Total Experience', value: '0+', unit: 'Months', icon: Clock, color: '#00f0ff' },
                { label: 'Companies Worked', value: '3', unit: 'Elite Firms', icon: Shield, color: '#a78bfa' },
                { label: 'Projects Delivered', value: '5+', unit: 'Production', icon: Rocket, color: '#ec4899' },
                { label: 'Technologies', value: '20+', unit: 'Mastered', icon: Zap, color: '#10b981' },
                { label: 'Success Rate', value: '95%', unit: 'Achievement', icon: TrendingUp, color: '#fbbf24' },
                { label: 'Certifications', value: '15+', unit: 'Verified', icon: Award, color: '#f97316' }
              ].map((stat, i) => {
                const StatIcon = stat.icon;
                return (
                  <div
                    key={i}
                    style={{
                      background: 'linear-gradient(135deg, rgba(0,0,0,0.8), rgba(20,20,40,0.8))',
                      border: `3px solid ${stat.color}`,
                      borderRadius: '22px',
                      padding: '2rem',
                      textAlign: 'center',
                      position: 'relative',
                      overflow: 'hidden',
                      transition: 'all 0.5s',
                      cursor: 'pointer',
                      animation: `slideUp ${1 + i * 0.1}s ease-out`,
                      opacity: 0,
                      animationFillMode: 'forwards',
                      animationDelay: `${i * 0.1}s`
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-12px)';
                      e.currentTarget.style.boxShadow = `0 15px 50px ${stat.color}`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <div style={{
                      width: '75px',
                      height: '75px',
                      margin: '0 auto 1.5rem',
                      border: `3.5px solid ${stat.color}`,
                      borderRadius: '18px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      animation: 'float 3.5s ease-in-out infinite',
                      animationDelay: `${i * 0.3}s`,
                      boxShadow: `0 0 35px ${stat.color}50`,
                      background: `${stat.color}10`
                    }}>
                      <StatIcon size={36} style={{ color: stat.color }} />
                    </div>
                    <div style={{
                      fontSize: 'clamp(3rem, 7vw, 4rem)',
                      fontWeight: 900,
                      color: stat.color,
                      marginBottom: '0.5rem',
                      fontFamily: "'Orbitron', sans-serif",
                      textShadow: `0 0 30px ${stat.color}`
                    }}>
                      {stat.value}
                    </div>
                    <div style={{
                      fontSize: '1.1rem',
                      color: '#ffffff',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '1px',
                      marginBottom: '0.4rem',
                      fontFamily: "'Rajdhani', sans-serif"
                    }}>
                      {stat.label}
                    </div>
                    <div style={{
                      fontSize: '0.95rem',
                      color: '#b0b0d8'
                    }}>
                      {stat.unit}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Call to Action */}
          <div style={{
            padding: 'clamp(3.5rem, 8vw, 5rem) clamp(2rem, 5vw, 3rem)',
            background: 'linear-gradient(135deg, rgba(0,240,255,0.12), rgba(167,139,250,0.12))',
            border: '3px solid rgba(0,240,255,0.4)',
            borderRadius: '32px',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{
              fontSize: 'clamp(3rem, 8vw, 5rem)',
              fontWeight: 900,
              background: 'linear-gradient(90deg, #00f0ff, #a78bfa, #ec4899)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '2rem',
              fontFamily: "'Orbitron', sans-serif",
              textShadow: '0 0 40px rgba(0,240,255,0.7)',
              letterSpacing: '2px'
            }}>
              READY FOR NEXT MISSION?
            </div>

            <p style={{
              fontSize: 'clamp(1.2rem, 3vw, 1.5rem)',
              color: '#c0c0ff',
              marginBottom: '3rem',
              fontFamily: "'Rajdhani', sans-serif",
              maxWidth: '850px',
              margin: '0 auto 3rem',
              lineHeight: 1.7
            }}>
              Let's collaborate on cutting-edge projects that push the boundaries of technology.
              From full-stack applications to AI-powered solutions.
            </p>

            <div style={{
              display: 'flex',
              gap: 'clamp(1.5rem, 4vw, 2.5rem)',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              <a 
                href="https://github.com/bhagavan444" 
                target="_blank" 
                rel="noopener noreferrer" 
                style={{
                  padding: '1.4rem 3rem',
                  background: 'rgba(0,240,255,0.18)',
                  border: '3px solid rgba(0,240,255,0.7)',
                  borderRadius: 999,
                  color: '#00f0ff',
                  fontWeight: 800,
                  fontSize: '1.2rem',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1.2rem',
                  fontFamily: "'Orbitron', sans-serif",
                  transition: 'all 0.4s',
                  letterSpacing: '1px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.08)';
                  e.currentTarget.style.boxShadow = '0 0 50px #00f0ff';
                  e.currentTarget.style.background = 'rgba(0,240,255,0.25)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.background = 'rgba(0,240,255,0.18)';
                }}
              >
                <Github size={28} />
                VIEW REPOSITORIES
              </a>

              <a 
                href="mailto:g.sivasatyasaibhagavan@gmail.com" 
                style={{
                  padding: '1.4rem 3rem',
                  background: 'linear-gradient(90deg, #00f0ff, #a78bfa)',
                  borderRadius: 999,
                  color: '#000',
                  fontWeight: 900,
                  fontSize: '1.2rem',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1.2rem',
                  fontFamily: "'Orbitron', sans-serif",
                  transition: 'all 0.4s',
                  letterSpacing: '1px',
                  boxShadow: '0 0 40px rgba(0,240,255,0.5)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.08)';
                  e.currentTarget.style.boxShadow = '0 0 60px rgba(0,240,255,0.8)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = '0 0 40px rgba(0,240,255,0.5)';
                }}
              >
                <Sparkles size={28} />
                LET'S COLLABORATE
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Certificate Modal */}
      {activeCert && (
        <div
          onClick={() => setActiveCert(null)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.98)',
            backdropFilter: 'blur(20px)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 'clamp(1rem, 3vw, 2rem)',
            animation: 'fadeIn 0.3s ease-out'
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: 'linear-gradient(135deg, rgba(0,0,0,0.98), rgba(10,10,30,0.98))',
              border: `4px solid ${activeCert.color}`,
              borderRadius: '32px',
              maxWidth: '1400px',
              width: '96%',
              maxHeight: '94vh',
              overflowY: 'auto',
              boxShadow: `0 0 150px ${activeCert.color}70`,
              position: 'relative',
              animation: 'slideUp 0.4s ease-out'
            }}
          >
            <button
              onClick={() => setActiveCert(null)}
              style={{
                position: 'absolute',
                top: 'clamp(1rem, 3vw, 2rem)',
                right: 'clamp(1rem, 3vw, 2rem)',
                background: 'rgba(255,100,100,0.2)',
                border: '2.5px solid #ff6666',
                borderRadius: '50%',
                width: '55px',
                height: '55px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ff6666',
                cursor: 'pointer',
                zIndex: 10,
                transition: 'all 0.3s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255,100,100,0.4)';
                e.currentTarget.style.transform = 'scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255,100,100,0.2)';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <X size={32} strokeWidth={3} />
            </button>

            <img
              src={getCertificateUrl(activeCert.certId)}
              alt={`${activeCert.title} Certificate`}
              style={{
                width: '100%',
                height: 'auto',
                maxHeight: '50vh',
                objectFit: 'contain',
                display: 'block',
                borderTopLeftRadius: '28px',
                borderTopRightRadius: '28px'
              }}
            />

            <div style={{ padding: 'clamp(2rem, 5vw, 4.5rem) clamp(1.5rem, 4vw, 4rem)' }}>
              <h2 style={{
                fontSize: 'clamp(2.5rem, 7vw, 4.5rem)',
                fontWeight: 900,
                background: `linear-gradient(90deg, ${activeCert.color}, ${activeCert.secondaryColor})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: '1.5rem',
                fontFamily: "'Orbitron', sans-serif"
              }}>
                {activeCert.title}
              </h2>

              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '2rem',
                marginBottom: '2.5rem',
                fontSize: 'clamp(1.1rem, 3vw, 1.4rem)',
                color: '#d0d0ff',
                fontFamily: "'Rajdhani', sans-serif"
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <Code size={28} style={{ color: activeCert.color }} />
                  {activeCert.company}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <Calendar size={28} style={{ color: activeCert.color }} />
                  {activeCert.period}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <MapPin size={28} style={{ color: activeCert.color }} />
                  {activeCert.location}
                </div>
              </div>

              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '1.2rem',
                marginBottom: '2.5rem'
              }}>
                {activeCert.tech.map(t => (
                  <span key={t} style={{
                    padding: '0.8rem 1.6rem',
                    background: `linear-gradient(135deg, ${activeCert.color}20, ${activeCert.secondaryColor}20)`,
                    border: `2.5px solid ${activeCert.color}60`,
                    borderRadius: 999,
                    fontFamily: "'Fira Code', monospace",
                    fontSize: '1rem',
                    fontWeight: 700,
                    color: activeCert.color
                  }}>
                    {t}
                  </span>
                ))}
              </div>

              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1.2rem'
              }}>
                {activeCert.achievements.map((ach, idx) => (
                  <div key={idx} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1.2rem',
                    fontSize: 'clamp(1.05rem, 2.5vw, 1.2rem)',
                    padding: '1rem',
                    background: `${activeCert.color}08`,
                    borderRadius: '12px',
                    borderLeft: `4px solid ${activeCert.color}`
                  }}>
                    {ach}
                  </div>
                ))}
              </div>

              <div style={{ marginTop: '3rem', textAlign: 'center' }}>
                <a
                  href={getViewUrl(activeCert.certId)}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    padding: '1.4rem 3.5rem',
                    background: `linear-gradient(90deg, ${activeCert.color}, ${activeCert.secondaryColor})`,
                    color: '#000',
                    fontWeight: 900,
                    fontSize: '1.2rem',
                    borderRadius: 999,
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '1rem',
                    boxShadow: `0 0 60px ${activeCert.color}60`,
                    transition: 'all 0.4s'
                  }}
                >
                  <Award size={28} />
                  VIEW FULL CERTIFICATE
                  <ExternalLink size={28} />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}