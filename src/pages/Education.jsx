"use client";

import React, { useState, useEffect, useRef } from 'react';

const education = [
  {
    id: 1,
    degree: "B.Tech in AI & Data Science",
    institution: "Ramachandra College of Engineering",
    university: "JNTUK",
    duration: "2022 – 2026",
    score: "7.9 CGPA",
    location: "Eluru, Andhra Pradesh",
    description: "Specialized in building intelligent systems using Machine Learning, Deep Learning, and Full-Stack Development. Focus on production-ready AI applications.",
    certId: "1wxnzvsS3MA7xWSxuXKeIkS8GaQoG4Y1a",
    color: "#00f5ff",
    glowRGB: "0, 245, 255",
    secondaryColor: "#8b5cf6",
    accentColor: "#f59e0b",
    gradient: "linear-gradient(135deg, #00f5ff 0%, #0099ff 100%)",
    iconEmoji: "🧠",
    badge: "CURRENT",
    rarity: "LEGENDARY",
    year: "2022–2026",
    progress: 85,
    skills: [
      "Machine Learning",
      "Deep Learning",
      "MERN Stack",
      "Computer Vision",
      "MLOps",
      "Neural Networks",
      "Python",
      "React.js"
    ],
    achievements: [
      "AI/ML Internship at Leading Tech Firms",
      "Top 10% Academic Performer",
      "10+ Full-Stack AI Projects Deployed",
      "24-Hour Hackathon Winner",
      "20+ Professional Certifications"
    ],
    impact: "Building next-generation AI systems",
    impact_metrics: [
      { label: "Projects", value: "10+", iconEmoji: "🚀" },
      { label: "CGPA", value: "7.9", iconEmoji: "📊" },
      { label: "Certs", value: "20+", iconEmoji: "🏆" }
    ]
  },
  {
    id: 2,
    degree: "Intermediate (MPC)",
    institution: "Srividhya Junior College",
    university: "Board of Intermediate",
    duration: "2020 – 2022",
    score: "7.8 CGPA",
    location: "Gudivada, Andhra Pradesh",
    description: "Pre-engineering curriculum with emphasis on Mathematics, Physics, and Chemistry. Built strong analytical and problem-solving foundation.",
    certId: "1N1K1j6QGrgNPNL2D9UmfJAL2PVSulhPJ",
    color: "#a78bfa",
    glowRGB: "167, 139, 250",
    secondaryColor: "#ec4899",
    accentColor: "#c084fc",
    gradient: "linear-gradient(135deg, #a78bfa 0%, #7c3aed 100%)",
    iconEmoji: "📐",
    badge: "FOUNDATION",
    rarity: "EPIC",
    year: "2020–2022",
    progress: 78,
    skills: [
      "Mathematical Reasoning",
      "Physics Principles",
      "Problem Solving",
      "Analytical Thinking",
      "Scientific Method"
    ],
    achievements: [
      "Top Performer in Mathematics",
      "Strong Academic Foundation",
      "Science Exhibition Participant"
    ],
    impact: "Strong base for engineering studies",
    impact_metrics: [
      { label: "CGPA", value: "7.8", iconEmoji: "📈" },
      { label: "Maths", value: "Top", iconEmoji: "🧮" },
      { label: "Science", value: "Strong", iconEmoji: "🔬" }
    ]
  },
  {
    id: 3,
    degree: "Secondary Education (10th)",
    institution: "Montessori English Medium High School",
    university: "SSC Board",
    duration: "2019 – 2020",
    score: "9.5 GPA",
    location: "Gudivada, Andhra Pradesh",
    description: "Achieved academic excellence with exceptional performance in Mathematics and Science. Perfect GPA with distinction in all subjects.",
    certId: "1p1RXnVn9jySamu8OiIWF0WFhe7G6QxiL",
    color: "#f97316",
    glowRGB: "249, 115, 22",
    secondaryColor: "#ea580c",
    accentColor: "#fb923c",
    gradient: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
    iconEmoji: "🏆",
    badge: "EXCELLENCE",
    rarity: "LEGENDARY",
    year: "2019–2020",
    progress: 95,
    skills: [
      "Academic Excellence",
      "Leadership",
      "Critical Thinking",
      "Discipline"
    ],
    achievements: [
      "School Topper (9.5 GPA)",
      "Perfect Score in Mathematics",
      "Excellence Award Winner"
    ],
    impact: "Outstanding school performance",
    impact_metrics: [
      { label: "GPA", value: "9.5", iconEmoji: "⭐" },
      { label: "Maths", value: "100%", iconEmoji: "🧠" },
      { label: "Rank", value: "1st", iconEmoji: "👑" }
    ]
  }
];

export default function AdvancedEducation() {
  const [viewMode, setViewMode] = useState("grid");
  const [hoveredId, setHoveredId] = useState(null);
  const [activeEdu, setActiveEdu] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState('ALL');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const canvasRef = useRef(null);

  // Mouse tracking for subtle parallax effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      setMousePosition({ x, y });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Scroll progress indicator
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress((scrolled / maxScroll) * 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Particle background system
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
        this.opacity = Math.random();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = -10;
        this.speed = Math.random() * 2 + 0.5;
        this.radius = Math.random() * 2.5 + 0.5;
        this.color = Math.random() > 0.5 ? '0, 245, 255' : '167, 139, 250';
        this.opacity = Math.random() * 0.5 + 0.3;
        this.drift = (Math.random() - 0.5) * 0.5;
      }

      update() {
        this.y += this.speed;
        this.x += this.drift;
        if (this.y > canvas.height + 10) this.reset();
        if (this.x < -10 || this.x > canvas.width + 10) this.reset();
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius * 3);
        gradient.addColorStop(0, `rgba(${this.color}, ${this.opacity})`);
        gradient.addColorStop(1, `rgba(${this.color}, 0)`);
        ctx.fillStyle = gradient;
        ctx.fill();
      }
    }

    const particles = Array.from({ length: 160 }, () => new Particle());

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      // Connect nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 130) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0, 245, 255, ${0.13 * (1 - distance / 130)})`;
            ctx.lineWidth = 0.6;
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

  const getCertificateThumbnail = (id) => `https://lh3.googleusercontent.com/d/${id}`;
  const getCertificateViewUrl = (id) => `https://drive.google.com/file/d/${id}/view`;

  const getRarityColor = (rarity) => {
    const colors = {
      'LEGENDARY': '#ffd700',
      'EPIC': '#a78bfa',
      'RARE': '#00f5ff'
    };
    return colors[rarity] || '#00f5ff';
  };

  const filteredEducation = selectedFilter === 'ALL'
    ? education
    : education.filter(e => e.rarity === selectedFilter);

  // ────────────────────────────────────────────────
  // View Mode Selector
  // ────────────────────────────────────────────────
  const ViewModeSelector = () => (
    <div style={{
      display: 'flex',
      gap: '1.6rem',
      justifyContent: 'center',
      marginBottom: '5rem',
      flexWrap: 'wrap'
    }}>
      {[
        { mode: "grid", icon: "◼◼◼", label: "Grid" },
        { mode: "timeline", icon: "➜", label: "Timeline" },
        { mode: "network", icon: "⟁", label: "Network" },
        { mode: "immersive", icon: "⛶", label: "Immersive" }
      ].map(({ mode, icon, label }) => (
        <button
          key={mode}
          onClick={() => setViewMode(mode)}
          style={{
            padding: '1.1rem 2.8rem',
            background: viewMode === mode ? 'rgba(0, 245, 255, 0.2)' : 'rgba(255,255,255,0.05)',
            border: viewMode === mode ? '2.5px solid #00f5ff' : '1.5px solid rgba(255,255,255,0.16)',
            borderRadius: '999px',
            color: viewMode === mode ? '#00f5ff' : '#e2e8f0',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.98rem',
            fontWeight: 700,
            letterSpacing: '1.3px',
            textTransform: 'uppercase',
            transition: 'all 0.4s ease',
            backdropFilter: 'blur(12px)',
            boxShadow: viewMode === mode ? '0 0 40px rgba(0,245,255,0.5)' : 'none'
          }}
        >
          <span style={{ fontSize: '1.3rem' }}>{icon}</span>
          {label}
        </button>
      ))}
    </div>
  );

  // ────────────────────────────────────────────────
  // Grid View
  // ────────────────────────────────────────────────
  const GridView = () => (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(440px, 1fr))',
      gap: '3.8rem',
      padding: '2.5rem 0'
    }}>
      {filteredEducation.map((edu, index) => (
        <div
          key={edu.id}
          onMouseEnter={() => setHoveredId(edu.id)}
          onMouseLeave={() => setHoveredId(null)}
          onClick={() => setActiveEdu(edu)}
          style={{
            background: 'rgba(255,255,255,0.045)',
            backdropFilter: 'blur(42px)',
            border: `2.5px solid ${hoveredId === edu.id ? edu.color : 'rgba(255,255,255,0.13)'}`,
            borderRadius: '30px',
            overflow: 'hidden',
            cursor: 'pointer',
            transition: 'all 0.65s cubic-bezier(0.16,1,0.3,1)',
            transform: hoveredId === edu.id ? 'translateY(-18px) scale(1.035)' : 'translateY(0)',
            boxShadow: hoveredId === edu.id
              ? `0 40px 100px rgba(${edu.glowRGB},0.6)`
              : '0 14px 45px rgba(0,0,0,0.38)',
            animation: `slide-up 1s ease-out ${index * 0.14}s both`
          }}
        >
          {/* Image + overlay */}
          <div style={{
            height: '300px',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <img
              src={getCertificateThumbnail(edu.certId)}
              alt={edu.institution}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transition: 'transform 0.9s ease',
                transform: hoveredId === edu.id ? 'scale(1.18)' : 'scale(1.08)'
              }}
            />
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(0,0,0,0.92) 0%, transparent 65%)'
            }} />

            {/* Badge */}
            <div style={{
              position: 'absolute',
              top: '1.6rem',
              right: '1.6rem',
              padding: '0.7rem 1.6rem',
              background: `rgba(${edu.glowRGB}, 0.22)`,
              backdropFilter: 'blur(14px)',
              border: `2.5px solid ${edu.color}`,
              borderRadius: '999px',
              fontSize: '0.88rem',
              fontWeight: 900,
              color: edu.color,
              fontFamily: "'JetBrains Mono', monospace",
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
              boxShadow: `0 6px 25px rgba(${edu.glowRGB},0.4)`
            }}>
              <span style={{ fontSize: '1.1rem' }}>★</span>
              {edu.badge}
            </div>

            {/* Big icon */}
            <div style={{
              position: 'absolute',
              bottom: '-50px',
              left: '2.2rem',
              fontSize: '6.5rem',
              color: edu.color,
              opacity: 0.9,
              textShadow: `0 0 40px ${edu.color}80`
            }}>
              {edu.iconEmoji}
            </div>
          </div>

          {/* Content */}
          <div style={{ padding: '2.8rem 2.2rem' }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              marginBottom: '2.2rem'
            }}>
              <div>
                <h3 style={{
                  fontSize: '2rem',
                  fontWeight: 900,
                  color: edu.color,
                  marginBottom: '0.6rem',
                  fontFamily: "'Orbitron', sans-serif"
                }}>
                  {edu.degree}
                </h3>
                <div style={{
                  fontSize: '1.2rem',
                  color: '#d0d8f0',
                  fontWeight: 600
                }}>
                  {edu.institution}
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <div style={{
                  fontSize: '3rem',
                  fontWeight: 900,
                  color: edu.color,
                  lineHeight: 0.95,
                  fontFamily: "'Orbitron', sans-serif"
                }}>
                  {edu.progress}%
                </div>
                <div style={{
                  fontSize: '0.9rem',
                  color: '#94a3b8',
                  fontFamily: "'JetBrains Mono', monospace"
                }}>
                  PROGRESS
                </div>
              </div>
            </div>

            <div style={{
              fontSize: '1.05rem',
              color: '#94a3b8',
              marginBottom: '1.8rem',
              fontFamily: "'JetBrains Mono', monospace",
              display: 'flex',
              alignItems: 'center',
              gap: '0.7rem'
            }}>
              <span style={{ fontSize: '1.3rem', color: edu.color }}>⌛</span>
              {edu.duration} • {edu.score}
            </div>

            <div style={{
              padding: '1.1rem',
              background: `rgba(${edu.glowRGB},0.09)`,
              borderRadius: '18px',
              border: `1px solid ${edu.color}35`,
              marginBottom: '2.2rem',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem'
            }}>
              <span style={{ fontSize: '1.6rem' }}>★</span>
              <span style={{ fontWeight: 600, color: '#e2e8f0' }}>
                {edu.impact}
              </span>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem', marginBottom: '2.4rem' }}>
              {edu.skills.slice(0, 5).map((t, idx) => (
                <span
                  key={idx}
                  style={{
                    padding: '0.55rem 1.3rem',
                    background: 'rgba(0,0,0,0.52)',
                    border: `2px solid ${edu.color}55`,
                    borderRadius: '999px',
                    fontSize: '0.88rem',
                    color: edu.color,
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
              gap: '0.9rem',
              padding: '1rem 2rem',
              background: edu.gradient,
              color: '#000',
              borderRadius: '999px',
              fontWeight: 900,
              fontFamily: "'Orbitron', sans-serif",
              fontSize: '1rem',
              boxShadow: `0 10px 35px rgba(${edu.glowRGB},0.45)`
            }}>
              View Certificate
              <span style={{ fontSize: '1.2rem' }}>→</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  // ────────────────────────────────────────────────
  // Timeline View
  // ────────────────────────────────────────────────
  const TimelineView = () => (
    <div style={{ position: 'relative', padding: '6rem 0', maxWidth: '1400px', margin: '0 auto' }}>
      <div style={{
        position: 'absolute',
        left: '50%',
        top: 0,
        bottom: 0,
        width: '5px',
        background: 'linear-gradient(to bottom, #00f5ff, #a78bfa, #f97316)',
        transform: 'translateX(-50%)',
        boxShadow: '0 0 35px rgba(0,245,255,0.7)'
      }} />

      {filteredEducation.map((edu, index) => {
        const isLeft = index % 2 === 0;

        return (
          <div
            key={edu.id}
            onMouseEnter={() => setHoveredId(edu.id)}
            onMouseLeave={() => setHoveredId(null)}
            onClick={() => setActiveEdu(edu)}
            style={{
              display: 'flex',
              justifyContent: isLeft ? 'flex-end' : 'flex-start',
              margin: '7rem 0',
              position: 'relative',
              padding: '0 2rem'
            }}
          >
            {/* Timeline node */}
            <div style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              width: '90px',
              height: '90px',
              background: edu.color,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 10,
              boxShadow: `0 0 70px ${edu.color}90`,
              border: '7px solid #000'
            }}>
              <span style={{ fontSize: '3.2rem' }}>{edu.iconEmoji}</span>
            </div>

            {/* Card */}
            <div style={{
              width: '48%',
              padding: '2.8rem',
              background: 'rgba(255,255,255,0.045)',
              backdropFilter: 'blur(40px)',
              border: `2.5px solid ${hoveredId === edu.id ? edu.color : 'rgba(255,255,255,0.15)'}`,
              borderRadius: '26px',
              cursor: 'pointer',
              transition: 'all 0.55s ease',
              transform: hoveredId === edu.id ? 'scale(1.04) translateX(0)' : 'scale(1)',
              boxShadow: hoveredId === edu.id
                ? `0 30px 80px rgba(${edu.glowRGB},0.55)`
                : '0 12px 40px rgba(0,0,0,0.35)'
            }}>
              <div style={{
                fontSize: '1.2rem',
                color: '#94a3b8',
                marginBottom: '1.2rem',
                fontFamily: "'JetBrains Mono', monospace"
              }}>
                {edu.year}
              </div>

              <h3 style={{
                fontSize: '2.1rem',
                fontWeight: 900,
                color: edu.color,
                marginBottom: '0.9rem',
                fontFamily: "'Orbitron', sans-serif"
              }}>
                {edu.degree}
              </h3>

              <div style={{
                fontSize: '1.25rem',
                color: '#d0d8f0',
                marginBottom: '1.2rem',
                fontWeight: 600
              }}>
                {edu.institution}
              </div>

              <div style={{
                fontSize: '1.05rem',
                color: '#94a3b8',
                marginBottom: '1.8rem',
                fontFamily: "'JetBrains Mono', monospace"
              }}>
                {edu.duration} • {edu.score} • {edu.location}
              </div>

              <div style={{
                fontSize: '3.2rem',
                fontWeight: 900,
                color: edu.color,
                margin: '1.5rem 0'
              }}>
                {edu.progress}%
              </div>

              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.9rem',
                padding: '1rem 2rem',
                background: edu.gradient,
                color: '#000',
                borderRadius: '999px',
                fontWeight: 900,
                fontFamily: "'Orbitron', sans-serif",
                fontSize: '1.05rem'
              }}>
                View Details →
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );

  // ────────────────────────────────────────────────
  // Network View
  // ────────────────────────────────────────────────
  const NetworkView = () => (
    <div style={{
      height: '1000px',
      position: 'relative',
      margin: '6rem 0'
    }}>
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        {filteredEducation.map((edu, i) => {
          const angle = (i / filteredEducation.length) * Math.PI * 2 - Math.PI / 2;
          const x = 50 + 36 * Math.cos(angle);
          const y = 50 + 36 * Math.sin(angle);
          return (
            <line
              key={i}
              x1="50%"
              y1="50%"
              x2={`${x}%`}
              y2={`${y}%`}
              stroke={edu.color}
              strokeWidth={hoveredId === edu.id ? 4.5 : 2}
              opacity={hoveredId === edu.id ? 0.95 : 0.4}
              style={{ transition: 'all 0.45s' }}
            />
          );
        })}
      </svg>

      {/* Center node */}
      <div style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        width: '220px',
        height: '220px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #00f5ff, #a78bfa, #f97316)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.6rem',
        fontWeight: 900,
        color: '#000',
        boxShadow: '0 0 110px rgba(0,245,255,0.8)',
        border: '9px solid #000'
      }}>
        EDUCATION
      </div>

      {filteredEducation.map((edu, i) => {
        const angle = (i / filteredEducation.length) * Math.PI * 2 - Math.PI / 2;
        const x = 50 + 36 * Math.cos(angle);
        const y = 50 + 36 * Math.sin(angle);

        return (
          <div
            key={edu.id}
            onMouseEnter={() => setHoveredId(edu.id)}
            onMouseLeave={() => setHoveredId(null)}
            onClick={() => setActiveEdu(edu)}
            style={{
              position: 'absolute',
              left: `${x}%`,
              top: `${y}%`,
              transform: `translate(-50%, -50%) scale(${hoveredId === edu.id ? 1.18 : 1})`,
              transition: 'all 0.5s cubic-bezier(0.16,1,0.3,1)',
              cursor: 'pointer',
              width: '300px',
              textAlign: 'center'
            }}
          >
            <div style={{
              background: 'rgba(0,0,0,0.9)',
              backdropFilter: 'blur(32px)',
              border: `4px solid ${edu.color}`,
              borderRadius: '26px',
              padding: '2.2rem',
              boxShadow: hoveredId === edu.id
                ? `0 35px 90px rgba(${edu.glowRGB},0.75)`
                : `0 12px 45px rgba(${edu.glowRGB},0.4)`
            }}>
              <div style={{ fontSize: '4.5rem', marginBottom: '1.2rem' }}>
                {edu.iconEmoji}
              </div>
              <div style={{
                fontSize: '1.9rem',
                fontWeight: 900,
                color: edu.color
              }}>
                {edu.progress}%
              </div>
              <div style={{
                fontSize: '1.25rem',
                color: '#e2e8f0',
                marginTop: '0.6rem',
                fontWeight: 600
              }}>
                {edu.degree.split(' in ')[0]}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );

  // ────────────────────────────────────────────────
  // Immersive / Spotlight View
  // ────────────────────────────────────────────────
  const ImmersiveView = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const edu = filteredEducation[activeIndex];

    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '5rem 2.5rem',
        position: 'relative'
      }}>
        {/* Background gradient & blur */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(135deg, ${edu.color}15, #000 70%)`,
          opacity: 0.5,
          zIndex: -1
        }} />

        <div style={{
          maxWidth: '1400px',
          width: '100%',
          display: 'flex',
          gap: '7rem',
          flexWrap: 'wrap',
          alignItems: 'center'
        }}>
          {/* Left - Large Icon / Image */}
          <div style={{
            flex: 1,
            minWidth: '340px',
            textAlign: 'center',
            position: 'relative'
          }}>
            <div style={{
              fontSize: 'clamp(16rem, 40vw, 26rem)',
              color: edu.color,
              textShadow: `0 0 100px ${edu.color}90`,
              lineHeight: 0.85,
              opacity: 0.9
            }}>
              {edu.iconEmoji}
            </div>
          </div>

          {/* Right - Content */}
          <div style={{ flex: 1.6, minWidth: '440px' }}>
            <div style={{
              display: 'inline-flex',
              padding: '0.9rem 2.2rem',
              background: `rgba(${edu.glowRGB},0.2)`,
              border: `2.5px solid ${edu.color}`,
              borderRadius: '999px',
              color: edu.color,
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '1.05rem',
              marginBottom: '2.5rem'
            }}>
              {edu.badge} • {edu.year}
            </div>

            <h2 style={{
              fontSize: 'clamp(4rem, 10vw, 7rem)',
              fontWeight: 900,
              background: edu.gradient,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '2rem',
              lineHeight: 1.05,
              fontFamily: "'Orbitron', sans-serif"
            }}>
              {edu.degree}
            </h2>

            <div style={{
              fontSize: '1.8rem',
              color: '#d0d8f0',
              marginBottom: '1.8rem',
              fontWeight: 600
            }}>
              {edu.institution} • {edu.university}
            </div>

            <div style={{
              fontSize: '1.25rem',
              color: '#94a3b8',
              marginBottom: '3.5rem',
              fontFamily: "'JetBrains Mono', monospace",
              display: 'flex',
              flexWrap: 'wrap',
              gap: '2rem'
            }}>
              <div>{edu.duration}</div>
              <div>{edu.score}</div>
              <div>{edu.location}</div>
            </div>

            <div style={{
              fontSize: '6.5rem',
              fontWeight: 900,
              color: edu.color,
              marginBottom: '3.5rem',
              textShadow: `0 0 60px ${edu.color}70`
            }}>
              {edu.progress}%
            </div>

            <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
              <button
                onClick={() => setActiveIndex((activeIndex - 1 + filteredEducation.length) % filteredEducation.length)}
                style={{
                  padding: '1.3rem 3rem',
                  background: 'rgba(255,255,255,0.09)',
                  border: '2.5px solid rgba(255,255,255,0.28)',
                  borderRadius: '999px',
                  color: '#fff',
                  fontWeight: 800,
                  cursor: 'pointer',
                  fontFamily: "'Orbitron', sans-serif",
                  fontSize: '1.1rem'
                }}
              >
                ← Previous
              </button>

              <button
                onClick={() => setActiveIndex((activeIndex + 1) % filteredEducation.length)}
                style={{
                  padding: '1.3rem 3rem',
                  background: edu.gradient,
                  border: 'none',
                  borderRadius: '999px',
                  color: '#000',
                  fontWeight: 900,
                  cursor: 'pointer',
                  fontFamily: "'Orbitron', sans-serif",
                  fontSize: '1.1rem',
                  boxShadow: `0 18px 50px rgba(${edu.glowRGB},0.6)`
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

        @keyframes slide-up {
          from { opacity: 0; transform: translateY(80px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-30px); }
        }

        .glass-card {
          background: rgba(255,255,255,0.035);
          backdrop-filter: blur(24px);
          border: 1px solid rgba(255,255,255,0.1);
        }
      `}</style>

      {/* Progress bar */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '6px',
        zIndex: 9999,
        background: 'rgba(0,0,0,0.75)'
      }}>
        <div style={{
          width: `${scrollProgress}%`,
          height: '100%',
          background: 'linear-gradient(90deg, #00f5ff, #a78bfa, #f97316)',
          boxShadow: '0 0 35px currentColor',
          transition: 'width 0.12s linear'
        }} />
      </div>

      {/* Particle canvas */}
      <canvas ref={canvasRef} style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 1
      }} />

      {/* Floating orbs */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 2, pointerEvents: 'none' }}>
        <div style={{
          position: 'absolute',
          width: '800px',
          height: '800px',
          top: '10%',
          left: '5%',
          background: 'radial-gradient(circle, rgba(0,245,255,0.14), transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(90px)',
          animation: 'float 26s infinite ease-in-out',
          transform: `translate(${mousePosition.x * 0.7}px, ${mousePosition.y * 0.7}px)`
        }} />

        <div style={{
          position: 'absolute',
          width: '680px',
          height: '680px',
          bottom: '15%',
          right: '10%',
          background: 'radial-gradient(circle, rgba(167,139,250,0.13), transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(80px)',
          animation: 'float 32s infinite ease-in-out reverse',
          transform: `translate(${-mousePosition.x * 0.5}px, ${-mousePosition.y * 0.5}px)`
        }} />
      </div>

      <div style={{
        position: 'relative',
        zIndex: 10,
        maxWidth: '1800px',
        margin: '0 auto',
        padding: 'clamp(8rem, 14vw, 13rem) clamp(2rem, 6vw, 6rem)'
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '10rem' }}>
          <h1 style={{
            fontSize: 'clamp(7rem, 18vw, 13rem)',
            fontWeight: 900,
            fontFamily: "'Orbitron', sans-serif",
            background: 'linear-gradient(135deg, #00f5ff, #a78bfa, #f97316, #00f5ff)',
            backgroundSize: '300% auto',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            animation: 'gradientFlow 15s linear infinite',
            marginBottom: '2rem',
            letterSpacing: '9px',
            textTransform: 'uppercase'
          }}>
            EDUCATION
          </h1>

          <p style={{
            fontSize: 'clamp(1.5rem, 3.5vw, 1.9rem)',
            color: '#cbd5e1',
            maxWidth: '950px',
            margin: '0 auto 5rem',
            lineHeight: 1.9
          }}>
            Academic progression from foundational excellence to advanced AI specialization
          </p>

          <ViewModeSelector />

          <div style={{
            display: 'flex',
            gap: '1.4rem',
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginTop: '4.5rem'
          }}>
            {['ALL', 'LEGENDARY', 'EPIC'].map(f => (
              <button
                key={f}
                onClick={() => setSelectedFilter(f)}
                style={{
                  padding: '1rem 2.5rem',
                  borderRadius: '999px',
                  background: selectedFilter === f ? 'linear-gradient(135deg, #00f5ff, #a78bfa)' : 'rgba(255,255,255,0.07)',
                  color: selectedFilter === f ? '#000' : '#e2e8f0',
                  border: selectedFilter === f ? 'none' : '1.5px solid rgba(255,255,255,0.15)',
                  fontFamily: "'Orbitron', sans-serif",
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.35s'
                }}
              >
                {f === 'ALL' ? 'All Entries' : f}
              </button>
            ))}
          </div>
        </div>

        {viewMode === "grid" && <GridView />}
        {viewMode === "timeline" && <TimelineView />}
        {viewMode === "network" && <NetworkView />}
        {viewMode === "immersive" && <ImmersiveView />}

        {/* ──────────────────────────────────────────────── */}
        {/* Detail Modal */}
        {/* ──────────────────────────────────────────────── */}
        {activeEdu && (
          <div
            onClick={() => setActiveEdu(null)}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0,0,0,0.97)',
              backdropFilter: 'blur(24px)',
              zIndex: 9999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '3rem 2rem',
              overflowY: 'auto'
            }}
          >
            <div
              onClick={e => e.stopPropagation()}
              style={{
                background: 'rgba(10,10,40,0.96)',
                border: `5px solid ${activeEdu.color}`,
                borderRadius: '36px',
                maxWidth: '1200px',
                width: '94%',
                maxHeight: '94vh',
                overflowY: 'auto',
                boxShadow: `0 0 220px rgba(${activeEdu.glowRGB},0.7)`,
                backdropFilter: 'blur(32px)'
              }}
            >
              <button
                onClick={() => setActiveEdu(null)}
                style={{
                  position: 'absolute',
                  top: '2rem',
                  right: '2rem',
                  background: 'rgba(255,90,90,0.25)',
                  border: 'none',
                  borderRadius: '50%',
                  width: '60px',
                  height: '60px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ff6b6b',
                  cursor: 'pointer',
                  backdropFilter: 'blur(12px)',
                  fontSize: '1.8rem',
                  zIndex: 10
                }}
              >
                ×
              </button>

              <div style={{ padding: '4.5rem 4rem' }}>
                {/* Header */}
                <div style={{
                  fontSize: 'clamp(3.5rem, 8vw, 5rem)',
                  fontWeight: 900,
                  color: activeEdu.color,
                  fontFamily: "'Orbitron', sans-serif",
                  marginBottom: '1.5rem',
                  lineHeight: 1.1
                }}>
                  {activeEdu.degree}
                </div>

                <div style={{
                  fontSize: '1.6rem',
                  color: '#d0d8f0',
                  marginBottom: '2.2rem',
                  fontWeight: 600
                }}>
                  {activeEdu.institution} • {activeEdu.university}
                </div>

                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '1.3rem',
                  padding: '1rem 2.2rem',
                  background: `rgba(${activeEdu.glowRGB},0.18)`,
                  border: `2.5px solid ${activeEdu.color}`,
                  borderRadius: '999px',
                  color: activeEdu.color,
                  fontSize: '1.2rem',
                  fontFamily: "'JetBrains Mono', monospace",
                  marginBottom: '3rem'
                }}>
                  <span style={{ fontSize: '1.6rem' }}>★</span>
                  {activeEdu.progress}% • {activeEdu.score}
                </div>

                {/* Image */}
                <div style={{
                  marginBottom: '4rem',
                  position: 'relative',
                  borderRadius: '24px',
                  overflow: 'hidden',
                  border: `3px solid ${activeEdu.color}60`,
                  boxShadow: `0 25px 80px rgba(${activeEdu.glowRGB},0.4)`
                }}>
                  <img
                    src={getCertificateThumbnail(activeEdu.certId)}
                    alt={activeEdu.institution}
                    style={{
                      width: '100%',
                      height: 'auto',
                      display: 'block'
                    }}
                  />
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.85), transparent 60%)'
                  }} />
                </div>

                {/* Period & Location */}
                <div style={{ marginBottom: '3.5rem' }}>
                  <h4 style={{
                    color: activeEdu.color,
                    fontSize: '1.4rem',
                    marginBottom: '1.5rem',
                    fontFamily: "'JetBrains Mono', monospace"
                  }}>
                    Period & Location
                  </h4>
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '2rem',
                    fontSize: '1.2rem',
                    color: '#e2e8f0'
                  }}>
                    <div>📅 {activeEdu.duration}</div>
                    <div>📍 {activeEdu.location}</div>
                  </div>
                </div>

                {/* Achievements */}
                <div style={{ marginBottom: '4rem' }}>
                  <h4 style={{
                    color: activeEdu.color,
                    fontSize: '1.4rem',
                    marginBottom: '1.5rem',
                    fontFamily: "'JetBrains Mono', monospace"
                  }}>
                    Key Achievements
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.3rem' }}>
                    {activeEdu.achievements.map((ach, idx) => (
                      <div
                        key={idx}
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '1.2rem',
                          padding: '1.2rem',
                          background: 'rgba(255,255,255,0.06)',
                          borderRadius: '18px',
                          border: `1.5px solid ${activeEdu.color}35`
                        }}
                      >
                        <span style={{ color: activeEdu.color, fontSize: '1.5rem' }}>›</span>
                        <span style={{ fontSize: '1.12rem', lineHeight: 1.6 }}>
                          {ach}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Skills */}
                <div style={{ marginBottom: '3rem' }}>
                  <h4 style={{
                    color: activeEdu.color,
                    fontSize: '1.4rem',
                    marginBottom: '1.5rem',
                    fontFamily: "'JetBrains Mono', monospace"
                  }}>
                    Core Skills & Focus Areas
                  </h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                    {activeEdu.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        style={{
                          padding: '0.85rem 1.8rem',
                          background: 'rgba(255,255,255,0.07)',
                          border: `2px solid ${activeEdu.color}45`,
                          borderRadius: '999px',
                          color: activeEdu.color,
                          fontFamily: "'JetBrains Mono', monospace",
                          fontWeight: 600,
                          fontSize: '1rem'
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div style={{ textAlign: 'center', marginTop: '4rem' }}>
                  <a
                    href={getCertificateViewUrl(activeEdu.certId)}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '1.2rem',
                      padding: '1.4rem 3.2rem',
                      background: activeEdu.gradient,
                      color: '#000',
                      borderRadius: '999px',
                      fontSize: '1.2rem',
                      fontWeight: 900,
                      textDecoration: 'none',
                      fontFamily: "'Orbitron', sans-serif",
                      boxShadow: `0 20px 60px rgba(${activeEdu.glowRGB},0.6)`
                    }}
                  >
                    View Certificate
                    <span style={{ fontSize: '1.4rem' }}>↗</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}