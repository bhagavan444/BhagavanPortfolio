"use client";

import React, { useState, useEffect, useRef } from 'react';

// No big Lucide import — we use simple emoji/icons or CDN where needed

const skills = [
  {
    id: 1,
    category: "Full-Stack",
    title: "Full-Stack Development",
    subtitle: "MERN Stack Specialist",
    level: 82,
    projects: 2,
    experience: "Internship",
    whereLearned: "StudyOwl Education Pvt Ltd (MERN Stack Internship)",
    color: "#00f5ff",
    glowRGB: "0, 245, 255",
    secondaryColor: "#8b5cf6",
    accentColor: "#f59e0b",
    gradient: "linear-gradient(135deg, #00f5ff 0%, #0099ff 100%)",
    iconEmoji: "💻",
    badge: "FULL-STACK PRO",
    rarity: "LEGENDARY",
    tech: ["React", "Node.js", "Express", "MongoDB", "JWT", "OAuth", "REST API"],
    achievements: [
      "Built ATS-friendly Resume Builder with PDF & Word export",
      "Implemented secure OAuth-based authentication system",
      "Optimized REST API performance by 40%"
    ],
    impact: "Production-grade full-stack applications",
    impact_metrics: [
      { label: "Projects", value: "2+", iconEmoji: "🧩" },
      { label: "Auth", value: "OAuth", iconEmoji: "🔐" },
      { label: "Database", value: "Atlas", iconEmoji: "☁️" }
    ]
  },
  {
    id: 2,
    category: "AI/ML",
    title: "Machine Learning",
    subtitle: "NLP & Data Science",
    level: 80,
    projects: 2,
    experience: "Internship",
    whereLearned: "Blackbucks & SmartBridge Internships",
    color: "#a78bfa",
    glowRGB: "167, 139, 250",
    secondaryColor: "#ec4899",
    accentColor: "#06b6d4",
    gradient: "linear-gradient(135deg, #a78bfa 0%, #7c3aed 100%)",
    iconEmoji: "🧠",
    badge: "ML ENGINEER",
    rarity: "EPIC",
    tech: ["Python", "Scikit-learn", "Pandas", "NumPy", "TensorFlow", "Jupyter"],
    achievements: [
      "Built Fake News Detection with 89% accuracy",
      "Implemented TF-IDF vectorization pipeline",
      "Analyzed 50K+ data points for model training"
    ],
    impact: "High-accuracy ML & NLP solutions",
    impact_metrics: [
      { label: "Models", value: "4+", iconEmoji: "📈" },
      { label: "Accuracy", value: "89%", iconEmoji: "🎯" },
      { label: "Data", value: "50K+", iconEmoji: "📊" }
    ]
  },
  {
    id: 3,
    category: "Deep Learning",
    title: "Deep Learning & CV",
    subtitle: "Neural Networks Expert",
    level: 78,
    projects: 2,
    experience: "Internship",
    whereLearned: "SmartBridge AI/ML Internship",
    color: "#3b82f6",
    glowRGB: "59, 130, 246",
    secondaryColor: "#2563eb",
    accentColor: "#60a5fa",
    gradient: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
    iconEmoji: "🤖",
    badge: "CV SPECIALIST",
    rarity: "EPIC",
    tech: ["TensorFlow", "Keras", "OpenCV", "PyTorch", "Flask", "Python"],
    achievements: [
      "Developed CNN models with 92% accuracy",
      "Deployed real-time object detection system",
      "Optimized inference time by 35%"
    ],
    impact: "Computer Vision & Deep Learning pipelines",
    impact_metrics: [
      { label: "Models", value: "3+", iconEmoji: "🧬" },
      { label: "Accuracy", value: "92%", iconEmoji: "🏆" },
      { label: "Deploy", value: "Flask", iconEmoji: "🚀" }
    ]
  },
  {
    id: 4,
    category: "Data Science",
    title: "Data Science",
    subtitle: "Analytics & Visualization",
    level: 76,
    projects: 2,
    experience: "Internship",
    whereLearned: "Blackbucks Data Science Internship",
    color: "#f97316",
    glowRGB: "249, 115, 22",
    secondaryColor: "#ea580c",
    accentColor: "#fb923c",
    gradient: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
    iconEmoji: "📊",
    badge: "DATA ANALYST",
    rarity: "RARE",
    tech: ["Python", "Pandas", "NumPy", "Jupyter", "MySQL", "PostgreSQL"],
    achievements: [
      "Analyzed datasets with 100K+ records",
      "Created interactive data visualizations",
      "Automated data cleaning workflows"
    ],
    impact: "Large-scale data processing & insights",
    impact_metrics: [
      { label: "Datasets", value: "10+", iconEmoji: "📂" },
      { label: "Records", value: "100K+", iconEmoji: "📈" },
      { label: "Viz", value: "Multi", iconEmoji: "📉" }
    ]
  },
  {
    id: 5,
    category: "Programming",
    title: "Core Programming",
    subtitle: "Algorithms & Problem Solving",
    level: 85,
    projects: 5,
    experience: "Self + Academic",
    whereLearned: "Self-learning + College coursework",
    color: "#8b5cf6",
    glowRGB: "139, 92, 246",
    secondaryColor: "#7c3aed",
    accentColor: "#a78bfa",
    gradient: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)",
    iconEmoji: "⚡",
    badge: "DSA MASTER",
    rarity: "LEGENDARY",
    tech: ["Python", "Java", "JavaScript", "C++", "Git", "GitHub"],
    achievements: [
      "Solved 100+ DSA problems on coding platforms",
      "Strong foundation in OOP principles",
      "Implemented complex algorithms efficiently"
    ],
    impact: "Strong algorithmic thinking & clean code",
    impact_metrics: [
      { label: "Problems", value: "100+", iconEmoji: "🧩" },
      { label: "OOP", value: "Expert", iconEmoji: "🏛️" },
      { label: "DSA", value: "Strong", iconEmoji: "🚀" }
    ]
  },
  {
    id: 6,
    category: "Cloud & DevOps",
    title: "Cloud & DevOps",
    subtitle: "AWS & Docker Specialist",
    level: 70,
    projects: 2,
    experience: "Self-learning",
    whereLearned: "Personal projects & online courses",
    color: "#10b981",
    glowRGB: "16, 185, 129",
    secondaryColor: "#059669",
    accentColor: "#34d399",
    gradient: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    iconEmoji: "☁️",
    badge: "CLOUD ENGINEER",
    rarity: "RARE",
    tech: ["AWS", "Docker", "Kubernetes", "Linux", "Nginx", "Jenkins"],
    achievements: [
      "Deployed apps on AWS EC2 & S3",
      "Containerized microservices with Docker",
      "Set up CI/CD pipelines with GitHub Actions"
    ],
    impact: "Scalable & reliable cloud infrastructure",
    impact_metrics: [
      { label: "Cloud", value: "AWS", iconEmoji: "🌐" },
      { label: "CI/CD", value: "GitHub", iconEmoji: "🔄" },
      { label: "Container", value: "Docker", iconEmoji: "📦" }
    ]
  }
];

export default function AdvancedSkills() {
  const [viewMode, setViewMode] = useState("grid");
  const [hoveredId, setHoveredId] = useState(null);
  const [activeSkill, setActiveSkill] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState('ALL');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const canvasRef = useRef(null);

  // Mouse movement for subtle parallax
  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 18;
      const y = (e.clientY / window.innerHeight - 0.5) * 18;
      setMousePosition({ x, y });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Scroll progress bar
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress((scrolled / maxScroll) * 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Particle background
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
        this.y = Math.random() * canvas.height;
      }
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = -20;
        this.speed = Math.random() * 1.8 + 0.6;
        this.radius = Math.random() * 2.2 + 0.6;
        this.color = Math.random() > 0.5 ? '0, 245, 255' : '139, 92, 246';
        this.opacity = Math.random() * 0.45 + 0.25;
        this.drift = (Math.random() - 0.5) * 0.4;
      }
      update() {
        this.y += this.speed;
        this.x += this.drift;
        if (this.y > canvas.height + 20) this.reset();
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius * 2.8);
        gradient.addColorStop(0, `rgba(${this.color}, ${this.opacity})`);
        gradient.addColorStop(1, `rgba(${this.color}, 0)`);
        ctx.fillStyle = gradient;
        ctx.fill();
      }
    }

    const particles = Array.from({ length: 130 }, () => new Particle());

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.06)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        p.update();
        p.draw();
      });

      // connections
      for (let i = 0; i < particles.length; i += 2) {
        for (let j = i + 1; j < particles.length; j += 2) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 110) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0, 245, 255, ${0.10 * (1 - distance / 110)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animationId = requestAnimationFrame(animate);
    };
    animate();

    window.addEventListener('resize', resize);
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  const getRarityColor = (rarity) => {
    const map = {
      'LEGENDARY': '#ffd700',
      'EPIC': '#c084fc',
      'RARE': '#22d3ee'
    };
    return map[rarity] || '#67e8f9';
  };

  const filteredSkills = selectedFilter === 'ALL'
    ? skills
    : skills.filter(s => s.rarity === selectedFilter);

  // ────────────────────────────────────────────────
  //   VIEW MODE SELECTOR
  // ────────────────────────────────────────────────
  const ViewModeSelector = () => (
    <div style={{
      display: 'flex',
      gap: '1.4rem',
      justifyContent: 'center',
      margin: '0 auto 4.5rem',
      flexWrap: 'wrap',
      maxWidth: '1000px'
    }}>
      {[
        { mode: "grid", label: "Grid", icon: "◼◼◼" },
        { mode: "timeline", label: "Timeline", icon: "➜" },
        { mode: "network", label: "Network", icon: "⟁" },
        { mode: "immersive", label: "Immersive", icon: "⛶" }
      ].map(({ mode, label, icon }) => (
        <button
          key={mode}
          onClick={() => setViewMode(mode)}
          style={{
            padding: '0.9rem 2.2rem',
            background: viewMode === mode ? 'rgba(0,245,255,0.14)' : 'rgba(255,255,255,0.04)',
            border: viewMode === mode ? '2px solid #00f5ff' : '1px solid rgba(255,255,255,0.13)',
            borderRadius: '999px',
            color: viewMode === mode ? '#00f5ff' : '#cbd5e1',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.94rem',
            fontWeight: 700,
            letterSpacing: '1px',
            textTransform: 'uppercase',
            cursor: 'pointer',
            transition: 'all 0.35s ease',
            backdropFilter: 'blur(12px)',
            boxShadow: viewMode === mode ? '0 0 30px rgba(0,245,255,0.4)' : 'none'
          }}
        >
          <span style={{ marginRight: '10px', fontSize: '1.1rem' }}>{icon}</span>
          {label}
        </button>
      ))}
    </div>
  );

  // ────────────────────────────────────────────────
  //   GRID VIEW
  // ────────────────────────────────────────────────
  const GridView = () => (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
      gap: '3rem',
      padding: '1rem 0 6rem'
    }}>
      {filteredSkills.map((skill, index) => (
        <div
          key={skill.id}
          onMouseEnter={() => setHoveredId(skill.id)}
          onMouseLeave={() => setHoveredId(null)}
          onClick={() => setActiveSkill(skill)}
          style={{
            background: 'rgba(255,255,255,0.035)',
            backdropFilter: 'blur(38px)',
            border: `2px solid ${hoveredId === skill.id ? skill.color : 'rgba(255,255,255,0.11)'}`,
            borderRadius: '26px',
            overflow: 'hidden',
            cursor: 'pointer',
            transition: 'all 0.55s cubic-bezier(0.16,1,0.3,1)',
            transform: hoveredId === skill.id ? 'translateY(-14px) scale(1.025)' : 'translateY(0)',
            boxShadow: hoveredId === skill.id
              ? `0 30px 80px rgba(${skill.glowRGB},0.48)`
              : '0 10px 35px rgba(0,0,0,0.32)',
            animation: `fadeUp 0.8s ease-out ${index * 0.1}s both`
          }}
        >
          <div style={{ padding: '2.4rem 2rem' }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              marginBottom: '1.8rem'
            }}>
              <div style={{
                fontSize: '3.6rem',
                lineHeight: 1,
                fontWeight: 900,
                color: skill.color,
                textShadow: `0 0 25px ${skill.color}80`
              }}>
                {skill.iconEmoji}
              </div>

              <div style={{ textAlign: 'right' }}>
                <div style={{
                  fontSize: '2.6rem',
                  fontWeight: 900,
                  color: skill.color,
                  fontFamily: "'Orbitron', sans-serif",
                  lineHeight: 0.95
                }}>
                  {skill.level}
                </div>
                <div style={{
                  fontSize: '0.82rem',
                  color: '#94a3b8',
                  fontFamily: "'JetBrains Mono', monospace",
                  letterSpacing: '1px'
                }}>
                  MASTERY
                </div>
              </div>
            </div>

            <h3 style={{
              fontSize: '1.85rem',
              fontWeight: 800,
              color: '#f1f5f9',
              marginBottom: '0.6rem',
              fontFamily: "'Orbitron', sans-serif"
            }}>
              {skill.title}
            </h3>

            <div style={{
              fontSize: '1.1rem',
              color: '#cbd5e1',
              marginBottom: '1.4rem',
              fontWeight: 500
            }}>
              {skill.subtitle}
            </div>

            <div style={{
              fontSize: '0.95rem',
              color: '#94a3b8',
              marginBottom: '1.8rem',
              fontFamily: "'JetBrains Mono', monospace",
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem'
            }}>
              <span style={{ color: skill.color, fontSize: '1.1rem' }}>⌂</span>
              {skill.whereLearned}
            </div>

            <div style={{
              padding: '1rem',
              background: `rgba(${skill.glowRGB},0.07)`,
              borderRadius: '16px',
              border: `1px solid ${skill.color}25`,
              marginBottom: '1.8rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.9rem'
            }}>
              <span style={{ fontSize: '1.4rem' }}>★</span>
              <span style={{ fontWeight: 600, color: '#e2e8f0' }}>
                {skill.impact}
              </span>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', marginBottom: '2rem' }}>
              {skill.tech.slice(0, 5).map((t, i) => (
                <span
                  key={i}
                  style={{
                    padding: '0.48rem 1.1rem',
                    background: 'rgba(0,0,0,0.45)',
                    border: `1.5px solid ${skill.color}45`,
                    borderRadius: '999px',
                    fontSize: '0.82rem',
                    color: skill.color,
                    fontFamily: "'JetBrains Mono', monospace",
                    fontWeight: 600
                  }}
                >
                  {t}
                </span>
              ))}
            </div>

            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.7rem',
              padding: '0.85rem 1.7rem',
              background: skill.gradient,
              color: '#000',
              borderRadius: '999px',
              fontWeight: 800,
              fontFamily: "'Orbitron', sans-serif",
              fontSize: '0.94rem',
              boxShadow: `0 8px 25px rgba(${skill.glowRGB},0.35)`
            }}>
              <span>Details</span>
              <span style={{ fontSize: '1.1rem' }}>→</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  // ────────────────────────────────────────────────
  //   TIMELINE VIEW (simplified version)
  // ────────────────────────────────────────────────
  const TimelineView = () => (
    <div style={{ position: 'relative', padding: '4rem 0' }}>
      <div style={{
        position: 'absolute',
        left: '50%',
        top: 0,
        bottom: 0,
        width: '3px',
        background: 'linear-gradient(to bottom, #00f5ff, #a78bfa, #10b981)',
        transform: 'translateX(-50%)',
        boxShadow: '0 0 25px rgba(0,245,255,0.5)'
      }} />

      {filteredSkills.map((skill, i) => {
        const isLeft = i % 2 === 0;
        return (
          <div
            key={skill.id}
            onClick={() => setActiveSkill(skill)}
            style={{
              display: 'flex',
              justifyContent: isLeft ? 'flex-end' : 'flex-start',
              margin: '5rem 0',
              position: 'relative',
              opacity: 0,
              animation: `fadeInFromSide 1s ease-out ${i * 0.2}s forwards`,
              animationFillMode: 'forwards'
            }}
          >
            {/* Node */}
            <div style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              width: '70px',
              height: '70px',
              borderRadius: '50%',
              background: skill.color,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 10,
              boxShadow: `0 0 50px ${skill.color}80`,
              border: '5px solid #000'
            }}>
              <span style={{ fontSize: '2.2rem' }}>{skill.iconEmoji}</span>
            </div>

            {/* Card */}
            <div style={{
              width: '46%',
              padding: '2.2rem',
              background: 'rgba(255,255,255,0.04)',
              backdropFilter: 'blur(35px)',
              border: `2px solid ${hoveredId === skill.id ? skill.color : 'rgba(255,255,255,0.14)'}`,
              borderRadius: '24px',
              cursor: 'pointer',
              transition: 'all 0.5s ease',
              transform: hoveredId === skill.id ? 'scale(1.04)' : 'scale(1)',
              boxShadow: hoveredId === skill.id
                ? `0 25px 70px rgba(${skill.glowRGB},0.45)`
                : '0 10px 35px rgba(0,0,0,0.3)'
            }}>
              <div style={{
                fontSize: '1.1rem',
                color: '#94a3b8',
                marginBottom: '1rem',
                fontFamily: "'JetBrains Mono', monospace"
              }}>
                {skill.whereLearned}
              </div>

              <h3 style={{
                fontSize: '1.7rem',
                fontWeight: 800,
                color: skill.color,
                marginBottom: '0.8rem',
                fontFamily: "'Orbitron', sans-serif"
              }}>
                {skill.title}
              </h3>

              <div style={{
                fontSize: '1.05rem',
                color: '#cbd5e1',
                marginBottom: '1.4rem'
              }}>
                {skill.subtitle}
              </div>

              <div style={{
                fontSize: '2.4rem',
                fontWeight: 900,
                color: skill.color,
                margin: '1.5rem 0'
              }}>
                {skill.level}%
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );

  // ────────────────────────────────────────────────
  //   NETWORK VIEW (simplified)
  // ────────────────────────────────────────────────
  const NetworkView = () => (
    <div style={{
      height: '900px',
      position: 'relative',
      margin: '5rem 0'
    }}>
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        {filteredSkills.map((skill, i) => {
          const angle = (i / filteredSkills.length) * Math.PI * 2;
          const x = 50 + 32 * Math.cos(angle);
          const y = 50 + 32 * Math.sin(angle);
          return (
            <line
              key={i}
              x1="50%"
              y1="50%"
              x2={`${x}%`}
              y2={`${y}%`}
              stroke={skill.color}
              strokeWidth={hoveredId === skill.id ? 3.5 : 1.8}
              opacity={hoveredId === skill.id ? 0.9 : 0.35}
              style={{ transition: 'all 0.4s' }}
            />
          );
        })}
      </svg>

      {/* Center */}
      <div style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        width: '180px',
        height: '180px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #00f5ff, #a78bfa)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#000',
        fontWeight: 900,
        fontSize: '1.3rem',
        boxShadow: '0 0 90px rgba(0,245,255,0.7)',
        border: '6px solid #000'
      }}>
        SKILLS
      </div>

      {/* Nodes */}
      {filteredSkills.map((skill, i) => {
        const angle = (i / filteredSkills.length) * Math.PI * 2;
        const x = 50 + 32 * Math.cos(angle);
        const y = 50 + 32 * Math.sin(angle);

        return (
          <div
            key={skill.id}
            onMouseEnter={() => setHoveredId(skill.id)}
            onMouseLeave={() => setHoveredId(null)}
            onClick={() => setActiveSkill(skill)}
            style={{
              position: 'absolute',
              left: `${x}%`,
              top: `${y}%`,
              transform: `translate(-50%, -50%) scale(${hoveredId === skill.id ? 1.12 : 1})`,
              transition: 'all 0.45s ease',
              cursor: 'pointer',
              width: '260px',
              textAlign: 'center'
            }}
          >
            <div style={{
              background: 'rgba(0,0,0,0.85)',
              backdropFilter: 'blur(28px)',
              border: `3px solid ${skill.color}`,
              borderRadius: '20px',
              padding: '1.6rem',
              boxShadow: hoveredId === skill.id
                ? `0 25px 70px rgba(${skill.glowRGB},0.65)`
                : `0 8px 30px rgba(${skill.glowRGB},0.3)`
            }}>
              <div style={{ fontSize: '3.2rem', marginBottom: '0.8rem' }}>
                {skill.iconEmoji}
              </div>
              <div style={{
                fontSize: '1.35rem',
                fontWeight: 800,
                color: skill.color,
                marginBottom: '0.4rem'
              }}>
                {skill.level}%
              </div>
              <div style={{
                fontSize: '1.05rem',
                color: '#e2e8f0',
                fontWeight: 600
              }}>
                {skill.title.split(' ')[0]}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );

  // ────────────────────────────────────────────────
  //   IMMERSIVE VIEW
  // ────────────────────────────────────────────────
  const ImmersiveView = () => {
    const [index, setIndex] = useState(0);
    const skill = filteredSkills[index];

    return (
      <div style={{
        minHeight: '90vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '4rem 2rem',
        position: 'relative'
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(135deg, ${skill.color}15, #000)`,
          opacity: 0.4,
          zIndex: -1
        }} />

        <div style={{
          maxWidth: '1200px',
          width: '100%',
          display: 'flex',
          gap: '5rem',
          flexWrap: 'wrap',
          alignItems: 'center'
        }}>
          {/* Left - Big Icon */}
          <div style={{
            flex: 1,
            minWidth: '300px',
            textAlign: 'center'
          }}>
            <div style={{
              fontSize: 'clamp(12rem, 30vw, 18rem)',
              color: skill.color,
              textShadow: `0 0 80px ${skill.color}90`,
              lineHeight: 0.9
            }}>
              {skill.iconEmoji}
            </div>
          </div>

          {/* Right - Content */}
          <div style={{ flex: 1.4, minWidth: '400px' }}>
            <div style={{
              display: 'inline-flex',
              padding: '0.7rem 1.6rem',
              background: `rgba(${skill.glowRGB},0.18)`,
              border: `2px solid ${skill.color}`,
              borderRadius: '999px',
              color: skill.color,
              fontFamily: "'JetBrains Mono', monospace",
              marginBottom: '1.8rem'
            }}>
              {skill.badge} • {skill.rarity}
            </div>

            <h2 style={{
              fontSize: 'clamp(3.5rem, 8vw, 5.5rem)',
              fontWeight: 900,
              color: '#fff',
              background: skill.gradient,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '1.5rem',
              lineHeight: 1.05,
              fontFamily: "'Orbitron', sans-serif"
            }}>
              {skill.title}
            </h2>

            <div style={{
              fontSize: '1.5rem',
              color: '#cbd5e1',
              marginBottom: '2rem'
            }}>
              {skill.subtitle}
            </div>

            <div style={{
              fontSize: '1.1rem',
              color: '#94a3b8',
              marginBottom: '2.5rem',
              fontFamily: "'JetBrains Mono', monospace"
            }}>
              Learned at: {skill.whereLearned}
            </div>

            <div style={{
              fontSize: '4.5rem',
              fontWeight: 900,
              color: skill.color,
              marginBottom: '2.5rem'
            }}>
              {skill.level}%
            </div>

            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
              <button
                onClick={() => setIndex((index - 1 + filteredSkills.length) % filteredSkills.length)}
                style={{
                  padding: '1rem 2.2rem',
                  background: 'rgba(255,255,255,0.08)',
                  border: '2px solid rgba(255,255,255,0.25)',
                  borderRadius: '999px',
                  color: '#fff',
                  fontWeight: 700,
                  cursor: 'pointer',
                  fontFamily: "'Orbitron', sans-serif"
                }}
              >
                ← Prev
              </button>

              <button
                onClick={() => setIndex((index + 1) % filteredSkills.length)}
                style={{
                  padding: '1rem 2.2rem',
                  background: skill.gradient,
                  border: 'none',
                  borderRadius: '999px',
                  color: '#000',
                  fontWeight: 900,
                  cursor: 'pointer',
                  fontFamily: "'Orbitron', sans-serif",
                  boxShadow: `0 12px 40px rgba(${skill.glowRGB},0.5)`
                }}
              >
                Next →
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ────────────────────────────────────────────────
  //   MAIN RETURN
  // ────────────────────────────────────────────────
  return (
    <div style={{
      background: '#000',
      color: '#fff',
      minHeight: '100vh',
      position: 'relative',
      overflowX: 'hidden',
      fontFamily: "'Inter', system-ui, sans-serif"
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@500;700;900&family=JetBrains+Mono:wght@400;600;800&display=swap');

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(60px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes fadeInFromSide {
          from { opacity: 0; transform: translateX(80px); }
          to { opacity: 1; transform: translateX(0); }
        }

        .glass-card {
          background: rgba(255,255,255,0.03);
          backdrop-filter: blur(22px);
          border: 1px solid rgba(255,255,255,0.09);
        }
      `}</style>

      {/* Progress bar */}
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, height: '5px', zIndex: 9999,
        background: 'rgba(0,0,0,0.75)'
      }}>
        <div style={{
          width: `${scrollProgress}%`,
          height: '100%',
          background: 'linear-gradient(90deg, #00f5ff, #a78bfa, #10b981)',
          boxShadow: '0 0 30px currentColor',
          transition: 'width 0.12s linear'
        }} />
      </div>

      {/* Particles */}
      <canvas ref={canvasRef} style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 1
      }} />

      {/* Floating orbs */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 2, pointerEvents: 'none' }}>
        <div style={{
          position: 'absolute', width: '720px', height: '720px', top: '12%', left: '8%',
          background: 'radial-gradient(circle, rgba(0,245,255,0.13), transparent 70%)',
          borderRadius: '50%', filter: 'blur(85px)',
          animation: 'float 24s infinite ease-in-out',
          transform: `translate(${mousePosition.x * 0.7}px, ${mousePosition.y * 0.7}px)`
        }} />
        <div style={{
          position: 'absolute', width: '620px', height: '620px', bottom: '18%', right: '12%',
          background: 'radial-gradient(circle, rgba(167,139,250,0.11), transparent 70%)',
          borderRadius: '50%', filter: 'blur(75px)',
          animation: 'float 30s infinite ease-in-out reverse',
          transform: `translate(${-mousePosition.x * 0.5}px, ${-mousePosition.y * 0.5}px)`
        }} />
      </div>

      <div style={{
        position: 'relative',
        zIndex: 10,
        maxWidth: '1800px',
        margin: '0 auto',
        padding: 'clamp(7rem, 12vw, 12rem) clamp(1.8rem, 5vw, 5rem)'
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '9rem' }}>
          <h1 style={{
            fontSize: 'clamp(6rem, 16vw, 11rem)',
            fontWeight: 900,
            fontFamily: "'Orbitron', sans-serif",
            background: 'linear-gradient(135deg, #00f5ff, #a78bfa, #10b981, #00f5ff)',
            backgroundSize: '300% auto',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            animation: 'gradientFlow 12s linear infinite',
            marginBottom: '1.8rem',
            letterSpacing: '8px',
            textTransform: 'uppercase'
          }}>
            SKILLS
          </h1>

          <p style={{
            fontSize: 'clamp(1.4rem, 3.2vw, 1.7rem)',
            color: '#cbd5e1',
            maxWidth: '920px',
            margin: '0 auto 4rem',
            lineHeight: 1.8
          }}>
            Advanced technical capabilities across full-stack, AI/ML, cloud & core programming
          </p>

          <ViewModeSelector />

          <div style={{
            display: 'flex',
            gap: '1.1rem',
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginTop: '3.5rem'
          }}>
            {['ALL', 'LEGENDARY', 'EPIC', 'RARE'].map(f => (
              <button
                key={f}
                onClick={() => setSelectedFilter(f)}
                style={{
                  padding: '0.85rem 2.1rem',
                  borderRadius: '999px',
                  background: selectedFilter === f ? 'linear-gradient(135deg, #00f5ff, #a78bfa)' : 'rgba(255,255,255,0.06)',
                  color: selectedFilter === f ? '#000' : '#e2e8f0',
                  border: selectedFilter === f ? 'none' : '1px solid rgba(255,255,255,0.14)',
                  fontFamily: "'Orbitron', sans-serif",
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }}
              >
                {f === 'ALL' ? 'All Skills' : f}
              </button>
            ))}
          </div>
        </div>

        {viewMode === "grid" && <GridView />}
        {viewMode === "timeline" && <TimelineView />}
        {viewMode === "network" && <NetworkView />}
        {viewMode === "immersive" && <ImmersiveView />}

        {/* Modal Detail View */}
        {activeSkill && (
          <div
            onClick={() => setActiveSkill(null)}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0,0,0,0.95)',
              backdropFilter: 'blur(22px)',
              zIndex: 9999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '2.5rem'
            }}
          >
            <div
              onClick={e => e.stopPropagation()}
              style={{
                background: 'rgba(8,8,35,0.94)',
                border: `4px solid ${activeSkill.color}`,
                borderRadius: '32px',
                maxWidth: '1100px',
                width: '92%',
                maxHeight: '92vh',
                overflowY: 'auto',
                boxShadow: `0 0 200px rgba(${activeSkill.glowRGB},0.65)`,
                backdropFilter: 'blur(28px)'
              }}
            >
              <button
                onClick={() => setActiveSkill(null)}
                style={{
                  position: 'absolute',
                  top: '1.8rem',
                  right: '1.8rem',
                  background: 'rgba(255,100,100,0.2)',
                  border: 'none',
                  borderRadius: '50%',
                  width: '54px',
                  height: '54px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ff6b6b',
                  cursor: 'pointer',
                  backdropFilter: 'blur(10px)',
                  fontSize: '1.6rem'
                }}
              >
                ×
              </button>

              <div style={{ padding: '4rem 3.5rem' }}>
                <div style={{
                  fontSize: 'clamp(3rem, 7vw, 4.5rem)',
                  fontWeight: 900,
                  color: activeSkill.color,
                  fontFamily: "'Orbitron', sans-serif",
                  marginBottom: '1.2rem'
                }}>
                  {activeSkill.title}
                </div>

                <div style={{
                  fontSize: '1.45rem',
                  color: '#cbd5e1',
                  marginBottom: '2rem'
                }}>
                  {activeSkill.subtitle}
                </div>

                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '1.2rem',
                  padding: '0.9rem 2rem',
                  background: `rgba(${activeSkill.glowRGB},0.16)`,
                  border: `2px solid ${activeSkill.color}`,
                  borderRadius: '999px',
                  color: activeSkill.color,
                  fontSize: '1.15rem',
                  fontFamily: "'JetBrains Mono', monospace",
                  marginBottom: '2.8rem'
                }}>
                  <span style={{ fontSize: '1.4rem' }}>★</span>
                  {activeSkill.level}% Mastery
                </div>

                <div style={{
                  marginBottom: '3rem'
                }}>
                  <h4 style={{
                    color: activeSkill.color,
                    fontSize: '1.35rem',
                    marginBottom: '1.4rem',
                    fontFamily: "'JetBrains Mono', monospace"
                  }}>
                    Where I Learned
                  </h4>
                  <div style={{
                    fontSize: '1.15rem',
                    color: '#e2e8f0',
                    padding: '1rem 1.4rem',
                    background: 'rgba(255,255,255,0.05)',
                    borderRadius: '16px',
                    border: `1px solid ${activeSkill.color}30`
                  }}>
                    {activeSkill.whereLearned}
                  </div>
                </div>

                <div style={{ marginBottom: '3.5rem' }}>
                  <h4 style={{
                    color: activeSkill.color,
                    fontSize: '1.35rem',
                    marginBottom: '1.4rem',
                    fontFamily: "'JetBrains Mono', monospace"
                  }}>
                    Key Achievements
                  </h4>
                  {activeSkill.achievements.map((ach, i) => (
                    <div
                      key={i}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '1.1rem',
                        marginBottom: '1.2rem',
                        fontSize: '1.08rem',
                        color: '#e2e8f0'
                      }}
                    >
                      <span style={{ color: activeSkill.color, fontSize: '1.4rem' }}>›</span>
                      {ach}
                    </div>
                  ))}
                </div>

                <div>
                  <h4 style={{
                    color: activeSkill.color,
                    fontSize: '1.35rem',
                    marginBottom: '1.4rem',
                    fontFamily: "'JetBrains Mono', monospace"
                  }}>
                    Technology Stack
                  </h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.9rem' }}>
                    {activeSkill.tech.map((t, i) => (
                      <span
                        key={i}
                        style={{
                          padding: '0.75rem 1.5rem',
                          background: 'rgba(255,255,255,0.06)',
                          border: `2px solid ${activeSkill.color}40`,
                          borderRadius: '999px',
                          color: activeSkill.color,
                          fontFamily: "'JetBrains Mono', monospace",
                          fontWeight: 600
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}