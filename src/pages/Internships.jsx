"use client";

import React, { useState, useEffect, useRef } from 'react';
import {
  Code, Brain, Database, Terminal, Award, ExternalLink, X,
  CheckCircle2, Layers, Sparkles, Zap, Github, Trophy,
  Target, Flame, Star, Rocket, Clock, MapPin, Calendar,
  TrendingUp, Shield, Crown, Hexagon, Activity, Users,
  ChevronRight, Cpu, GitBranch, Box, Boxes, Globe,
  Briefcase, Mail, Download, Share2, Eye, Heart, Menu,
  ChevronDown, ChevronUp, Filter, Grid, List, Columns
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
    year: 2025,
    tech: ["React", "Node.js", "Express", "MongoDB", "JWT", "REST APIs", "Git", "Cloud Deployment"],
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
    skills_gained: ["Full-Stack Development", "API Design & Security", "Cloud Deployment", "Team Collaboration"]
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
    year: 2025,
    tech: ["Python", "TensorFlow", "Scikit-learn", "CNN", "OpenCV", "Flask"],
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
    skills_gained: ["Deep Learning & CNNs", "Computer Vision", "Model Deployment", "ML Pipeline Design"]
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
    year: 2024,
    tech: ["Python", "Pandas", "NumPy", "Scikit-learn", "Data Analysis", "Feature Engineering"],
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
    skills_gained: ["Data Preprocessing", "Feature Engineering", "ML Model Building", "Statistical Analysis"]
  }
];

export default function EnterpriseInternships() {
  const [hoveredId, setHoveredId] = useState(null);
  const [activeCert, setActiveCert] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState('ALL');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollProgress, setScrollProgress] = useState(0);
  const [viewMode, setViewMode] = useState('grid');
  const [expandedCard, setExpandedCard] = useState(null);
  const canvasRef = useRef(null);

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

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress((scrolled / maxScroll) * 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // New Geometric Animated Background
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

    class GeometricShape {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 100 + 50;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.01;
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
        this.type = Math.floor(Math.random() * 5);
        const colors = ['#00f5ff', '#a78bfa', '#ec4899', '#10b981', '#f59e0b'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.pulsePhase = Math.random() * Math.PI * 2;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.rotation += this.rotationSpeed;
        this.pulsePhase += 0.02;

        if (this.x < -this.size) this.x = canvas.width + this.size;
        if (this.x > canvas.width + this.size) this.x = -this.size;
        if (this.y < -this.size) this.y = canvas.height + this.size;
        if (this.y > canvas.height + this.size) this.y = -this.size;
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);

        const pulse = Math.sin(this.pulsePhase) * 0.2 + 1;
        const size = this.size * pulse;

        ctx.strokeStyle = this.color;
        ctx.lineWidth = 2;
        ctx.globalAlpha = 0.15;
        ctx.fillStyle = this.color.replace(')', ', 0.03)').replace('rgb', 'rgba');

        ctx.beginPath();
        
        switch(this.type) {
          case 0:
            ctx.moveTo(0, -size / 2);
            ctx.lineTo(size / 2, size / 2);
            ctx.lineTo(-size / 2, size / 2);
            ctx.closePath();
            break;
          case 1:
            ctx.rect(-size / 2, -size / 2, size, size);
            break;
          case 2:
            for (let i = 0; i < 6; i++) {
              const angle = (Math.PI / 3) * i;
              const x = Math.cos(angle) * size / 2;
              const y = Math.sin(angle) * size / 2;
              if (i === 0) ctx.moveTo(x, y);
              else ctx.lineTo(x, y);
            }
            ctx.closePath();
            break;
          case 3:
            for (let i = 0; i < 5; i++) {
              const angle = (Math.PI * 2 / 5) * i - Math.PI / 2;
              const x = Math.cos(angle) * size / 2;
              const y = Math.sin(angle) * size / 2;
              if (i === 0) ctx.moveTo(x, y);
              else ctx.lineTo(x, y);
            }
            ctx.closePath();
            break;
          case 4:
            ctx.moveTo(0, -size / 2);
            ctx.lineTo(size / 2, 0);
            ctx.lineTo(0, size / 2);
            ctx.lineTo(-size / 2, 0);
            ctx.closePath();
            break;
        }

        ctx.fill();
        ctx.stroke();
        ctx.restore();
      }
    }

    class GridPattern {
      draw() {
        ctx.strokeStyle = 'rgba(0, 245, 255, 0.05)';
        ctx.lineWidth = 1;

        const spacing = 60;
        for (let x = 0; x < canvas.width; x += spacing) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, canvas.height);
          ctx.stroke();
        }

        for (let y = 0; y < canvas.height; y += spacing) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(canvas.width, y);
          ctx.stroke();
        }
      }
    }

    class Constellation {
      constructor() {
        this.points = [];
        for (let i = 0; i < 30; i++) {
          this.points.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.2,
            vy: (Math.random() - 0.5) * 0.2,
            radius: Math.random() * 2 + 1
          });
        }
      }

      update() {
        this.points.forEach(p => {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
          if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        });
      }

      draw() {
        this.points.forEach(p => {
          ctx.fillStyle = '#00f5ff';
          ctx.globalAlpha = 0.6;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fill();
        });

        ctx.globalAlpha = 0.1;
        this.points.forEach((p1, i) => {
          this.points.slice(i + 1).forEach(p2 => {
            const dx = p1.x - p2.x;
            const dy = p1.y - p2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 150) {
              ctx.strokeStyle = '#00f5ff';
              ctx.lineWidth = 1;
              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.stroke();
            }
          });
        });
      }
    }

    const shapes = Array.from({ length: 12 }, () => new GeometricShape());
    const grid = new GridPattern();
    const constellation = new Constellation();

    const animate = () => {
      ctx.fillStyle = 'rgba(15, 15, 35, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      grid.draw();
      
      constellation.update();
      constellation.draw();

      shapes.forEach(shape => {
        shape.update();
        shape.draw();
      });

      ctx.globalAlpha = 1;
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
    const colors = { 'LEGENDARY': '#ffd700', 'EPIC': '#a78bfa', 'RARE': '#00f5ff' };
    return colors[rarity] || '#00f5ff';
  };

  const filteredInternships = selectedFilter === 'ALL'
    ? internships
    : internships.filter(i => i.rarity === selectedFilter);

  const viewModes = [
    { id: 'grid', icon: Grid, label: 'Grid' },
    { id: 'list', icon: List, label: 'List' },
    { id: 'columns', icon: Columns, label: 'Columns' },
    { id: 'timeline', icon: Clock, label: 'Timeline' }
  ];

  const renderInternshipCard = (intern, i) => {
    const isHovered = hoveredId === intern.id;
    const isExpanded = expandedCard === intern.id;
    const Icon = intern.icon;

    if (viewMode === 'timeline') {
      return (
        <div key={intern.id} style={{
          display: 'flex',
          gap: '2rem',
          position: 'relative',
          paddingLeft: '3rem',
          animation: `fadeInUp ${0.8 + i * 0.2}s ease-out`
        }}>
          <div style={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: intern.color,
            border: '4px solid #0f0f23',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 2,
            boxShadow: `0 0 20px ${intern.color}`
          }}>
            <Icon size={20} color="#000" />
          </div>

          {i < filteredInternships.length - 1 && (
            <div style={{
              position: 'absolute',
              left: '19px',
              top: '40px',
              width: '2px',
              height: 'calc(100% + 2rem)',
              background: `linear-gradient(180deg, ${intern.color}, transparent)`,
              zIndex: 1
            }} />
          )}

          <div className="glass-card intern-card" onMouseEnter={() => setHoveredId(intern.id)}
            onMouseLeave={() => setHoveredId(null)} style={{
              flex: 1,
              borderRadius: '24px',
              padding: 'clamp(1.5rem, 3vw, 2rem)',
              borderColor: isHovered ? intern.color : 'rgba(255, 255, 255, 0.08)',
              boxShadow: isHovered ? `0 20px 60px ${intern.color}40` : '0 8px 32px rgba(0, 0, 0, 0.37)'
            }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <div style={{ fontSize: 'clamp(0.8rem, 2vw, 0.9rem)', color: intern.color, fontWeight: 700, marginBottom: '0.5rem' }}>
                  {intern.period}
                </div>
                <h3 style={{ fontSize: 'clamp(1.3rem, 3vw, 1.8rem)', fontWeight: 800, color: '#fff', marginBottom: '0.5rem' }}>
                  {intern.title}
                </h3>
                <div style={{ fontSize: '1rem', color: '#cbd5e0', fontWeight: 600 }}>
                  {intern.company}
                </div>
              </div>
              <div style={{
                padding: '0.5rem 1rem',
                background: getRarityColor(intern.rarity),
                color: '#000',
                borderRadius: '100px',
                fontSize: '0.75rem',
                fontWeight: 900
              }}>
                {intern.rarity}
              </div>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
              {intern.tech.slice(0, 6).map((t) => (
                <span key={t} style={{
                  padding: '0.4rem 0.8rem',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: `1px solid ${intern.color}40`,
                  borderRadius: '100px',
                  fontSize: '0.75rem',
                  color: '#cbd5e0'
                }}>
                  {t}
                </span>
              ))}
            </div>

            <button onClick={() => setActiveCert(intern)} style={{
              padding: '0.75rem 1.5rem',
              background: `linear-gradient(90deg, ${intern.color}, ${intern.secondaryColor})`,
              color: '#000',
              border: 'none',
              borderRadius: '100px',
              fontWeight: 700,
              cursor: 'pointer',
              fontSize: '0.9rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <Award size={16} />
              View Certificate
            </button>
          </div>
        </div>
      );
    }

    const isCompact = viewMode === 'list';

    return (
      <div key={intern.id} className="glass-card intern-card"
        onMouseEnter={() => setHoveredId(intern.id)}
        onMouseLeave={() => setHoveredId(null)}
        style={{
          borderRadius: isCompact ? '20px' : '32px',
          overflow: 'hidden',
          borderColor: isHovered ? intern.color : 'rgba(255, 255, 255, 0.08)',
          boxShadow: isHovered ? `0 20px 60px ${intern.color}40` : '0 8px 32px rgba(0, 0, 0, 0.37)',
          animation: `fadeInUp ${0.8 + i * 0.2}s ease-out`,
          display: isCompact ? 'flex' : 'block',
          flexDirection: isCompact ? 'row' : 'column'
        }}>
        <div style={{
          height: isCompact ? '100%' : '6px',
          width: isCompact ? '6px' : '100%',
          background: `linear-gradient(${isCompact ? '180deg' : '90deg'}, ${intern.color}, ${intern.secondaryColor}, ${intern.accentColor})`,
          backgroundSize: isCompact ? '100% 200%' : '200% 100%',
          animation: 'shimmer 3s linear infinite'
        }} />

        {!isCompact && (
          <div onClick={() => setActiveCert(intern)} style={{
            height: 'clamp(200px, 30vw, 260px)',
            position: 'relative',
            overflow: 'hidden',
            cursor: 'pointer'
          }}>
            <img src={getCertificateUrl(intern.certId)} alt={`${intern.title} Certificate`} style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.8s',
              transform: isHovered ? 'scale(1.15)' : 'scale(1.05)'
            }} />

            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, transparent 60%)'
            }} />

            <div style={{
              position: 'absolute',
              top: '1rem',
              right: '1rem',
              padding: '0.5rem 1rem',
              background: getRarityColor(intern.rarity),
              color: '#000',
              borderRadius: '100px',
              fontSize: 'clamp(0.7rem, 2vw, 0.75rem)',
              fontWeight: 900,
              boxShadow: `0 0 30px ${getRarityColor(intern.rarity)}`,
              animation: 'pulse 2s ease-in-out infinite'
            }}>
              ★ {intern.rarity}
            </div>

            <div style={{
              position: 'absolute',
              top: '1rem',
              left: '1rem',
              padding: 'clamp(0.6rem, 2vw, 0.75rem) clamp(1rem, 2.5vw, 1.25rem)',
              background: 'rgba(0, 0, 0, 0.8)',
              backdropFilter: 'blur(10px)',
              borderRadius: '100px',
              border: `2px solid ${intern.color}`,
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: 'clamp(0.9rem, 2vw, 1rem)',
              fontWeight: 800,
              color: intern.color
            }}>
              <Star size={16} fill={intern.color} />
              {intern.rating}%
            </div>
          </div>
        )}

        <div style={{ 
          padding: isCompact ? 'clamp(1.5rem, 3vw, 2rem)' : 'clamp(1.5rem, 4vw, 2.5rem)',
          flex: isCompact ? 1 : 'none',
          display: isCompact ? 'flex' : 'block',
          flexDirection: isCompact ? 'column' : 'row',
          justifyContent: isCompact ? 'space-between' : 'flex-start'
        }}>
          <div style={{ flex: isCompact ? 1 : 'none' }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1.5rem',
              gap: '1rem',
              flexWrap: 'wrap'
            }}>
              <div style={{
                width: isCompact ? '50px' : 'clamp(60px, 15vw, 70px)',
                height: isCompact ? '50px' : 'clamp(60px, 15vw, 70px)',
                background: `linear-gradient(135deg, ${intern.color}20, ${intern.color}10)`,
                border: `2px solid ${intern.color}40`,
                borderRadius: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                animation: isHovered ? 'float 2s ease-in-out infinite' : 'none'
              }}>
                <Icon size={isCompact ? 24 : 32} style={{ color: intern.color }} />
              </div>

              <div className="glass-card" style={{
                padding: 'clamp(0.5rem, 2vw, 0.625rem) clamp(1rem, 3vw, 1.25rem)',
                borderRadius: '100px',
                border: `1px solid ${intern.color}40`,
                color: intern.color,
                fontSize: 'clamp(0.8rem, 2vw, 0.85rem)',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <Clock size={14} />
                {intern.duration}
              </div>
            </div>

            <h3 style={{
              fontSize: isCompact ? 'clamp(1.2rem, 2.5vw, 1.5rem)' : 'clamp(1.3rem, 3vw, 2rem)',
              fontWeight: 800,
              color: '#fff',
              marginBottom: '0.75rem',
              fontFamily: "'Space Grotesk', sans-serif",
              lineHeight: 1.2
            }}>
              {intern.title}
            </h3>

            <div style={{
              fontSize: 'clamp(1rem, 2.5vw, 1.1rem)',
              color: '#cbd5e0',
              fontWeight: 600,
              marginBottom: '0.5rem'
            }}>
              {intern.company}
            </div>

            <div style={{
              display: 'flex',
              gap: '1rem',
              flexWrap: 'wrap',
              fontSize: 'clamp(0.85rem, 2vw, 0.95rem)',
              color: intern.color,
              fontWeight: 500,
              marginBottom: '1.5rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <MapPin size={14} />
                {intern.location}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Calendar size={14} />
                {intern.period}
              </div>
            </div>

            {!isCompact && (
              <>
                <div className="glass-card" style={{
                  padding: 'clamp(0.875rem, 2vw, 1rem)',
                  borderRadius: '16px',
                  border: `1px solid ${intern.color}30`,
                  marginBottom: '1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  background: `${intern.color}05`
                }}>
                  <Trophy size={20} style={{ color: intern.color, flexShrink: 0 }} />
                  <span style={{
                    fontSize: 'clamp(0.85rem, 2vw, 0.95rem)',
                    fontWeight: 600,
                    color: '#e2e8f0'
                  }}>
                    {intern.impact}
                  </span>
                </div>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: 'clamp(0.5rem, 2vw, 0.75rem)',
                  marginBottom: '1.5rem'
                }}>
                  {intern.impact_metrics.map((metric, idx) => {
                    const MetricIcon = metric.icon;
                    return (
                      <div key={idx} className="glass-card" style={{
                        padding: 'clamp(0.75rem, 2vw, 1rem)',
                        borderRadius: '12px',
                        textAlign: 'center',
                        border: `1px solid ${intern.color}30`
                      }}>
                        <MetricIcon size={18} style={{ color: intern.color, marginBottom: '0.5rem' }} />
                        <div style={{
                          fontSize: 'clamp(1.2rem, 3vw, 1.5rem)',
                          fontWeight: 900,
                          color: intern.color,
                          marginBottom: '0.25rem'
                        }}>
                          {metric.value}
                        </div>
                        <div style={{
                          fontSize: 'clamp(0.7rem, 2vw, 0.75rem)',
                          color: '#94a3b8',
                          textTransform: 'uppercase'
                        }}>
                          {metric.label}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="glass-card" style={{
                  padding: 'clamp(1rem, 3vw, 1.25rem)',
                  borderRadius: '16px',
                  border: `1px solid ${intern.color}30`,
                  marginBottom: '1.5rem'
                }}>
                  <h4 style={{
                    color: intern.color,
                    fontSize: 'clamp(0.85rem, 2vw, 0.95rem)',
                    fontWeight: 700,
                    marginBottom: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    <Cpu size={16} />
                    Tech Stack
                  </h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {intern.tech.slice(0, isExpanded ? intern.tech.length : 6).map((t) => (
                      <span key={t} className="tech-badge" style={{
                        padding: 'clamp(0.4rem, 2vw, 0.5rem) clamp(0.75rem, 2vw, 1rem)',
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: `1px solid ${intern.color}40`,
                        borderRadius: '100px',
                        fontSize: 'clamp(0.75rem, 2vw, 0.8rem)',
                        color: '#cbd5e0',
                        fontFamily: "'JetBrains Mono', monospace"
                      }}>
                        {t}
                      </span>
                    ))}
                  </div>
                  {intern.tech.length > 6 && (
                    <button onClick={() => setExpandedCard(isExpanded ? null : intern.id)} style={{
                      marginTop: '0.75rem',
                      padding: '0.5rem 1rem',
                      background: 'transparent',
                      border: `1px solid ${intern.color}40`,
                      borderRadius: '100px',
                      color: intern.color,
                      fontSize: '0.8rem',
                      cursor: 'pointer',
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      width: '100%',
                      justifyContent: 'center'
                    }}>
                      {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      {isExpanded ? 'Show Less' : `+${intern.tech.length - 6} More`}
                    </button>
                  )}
                </div>
              </>
            )}

            <a href={getViewUrl(intern.certId)} target="_blank" rel="noopener noreferrer" style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.75rem',
              padding: isCompact ? '0.75rem 1.5rem' : 'clamp(0.9rem, 2.5vw, 1rem)',
              background: `linear-gradient(90deg, ${intern.color}, ${intern.secondaryColor})`,
              color: '#000',
              fontWeight: 800,
              borderRadius: '100px',
              textDecoration: 'none',
              fontSize: 'clamp(0.85rem, 2vw, 0.95rem)',
              transition: 'all 0.3s'
            }}>
              <Award size={18} />
              {isCompact ? 'View' : 'View Certificate'}
              <ExternalLink size={18} />
            </a>
          </div>
        </div>
      </div>
    );
  };

  const getLayoutStyles = () => {
    switch(viewMode) {
      case 'list':
        return { display: 'flex', flexDirection: 'column', gap: 'clamp(1.5rem, 3vw, 2rem)' };
      case 'columns':
        return { 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 350px), 1fr))',
          gap: 'clamp(1.5rem, 3vw, 2rem)'
        };
      case 'timeline':
        return { display: 'flex', flexDirection: 'column', gap: '2rem' };
      default:
        return { 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 400px), 1fr))',
          gap: 'clamp(2rem, 4vw, 3rem)'
        };
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap');
        
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Inter', sans-serif; overflow-x: hidden; }

        @keyframes fadeInUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeInScale { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
        @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-15px); } }
        @keyframes pulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.85; transform: scale(1.05); } }
        @keyframes shimmer { 0% { background-position: -1000px 0; } 100% { background-position: 1000px 0; } }
        @keyframes gradient-shift { 0%, 100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }

        .glass-card {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(30px) saturate(180%);
          border: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37), inset 0 1px 0 0 rgba(255, 255, 255, 0.05);
        }

        .intern-card {
          position: relative;
          overflow: hidden;
          transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
          cursor: pointer;
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

        .intern-card:hover::before { left: 100%; }
        .intern-card:hover { transform: translateY(-15px) scale(1.02); }

        .gradient-text {
          background: linear-gradient(135deg, #00f5ff 0%, #a78bfa 50%, #ec4899 100%);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: gradient-shift 4s ease infinite;
        }

        .tech-badge { transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1); }
        .tech-badge:hover { transform: translateY(-3px) scale(1.05); }

        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #000; }
        ::-webkit-scrollbar-thumb { background: linear-gradient(180deg, #00f5ff, #a78bfa); border-radius: 10px; }

        @media (max-width: 768px) {
          .intern-card:hover { transform: translateY(-8px) scale(1.01); }
          .hide-mobile { display: none !important; }
        }
      `}</style>

      <div style={{
        minHeight: '100vh',
        background: '#0f0f23',
        color: '#fff',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: `${scrollProgress}%`,
          height: '3px',
          background: 'linear-gradient(90deg, #00f5ff, #a78bfa, #ec4899)',
          zIndex: 10000,
          transition: 'width 0.1s',
          boxShadow: '0 0 20px #00f5ff'
        }} />

        <canvas ref={canvasRef} style={{
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 1
        }} />

        <div style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: '1600px',
          margin: '0 auto',
          padding: '0 clamp(1rem, 5vw, 3rem)'
        }}>
          <section style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            padding: 'clamp(3rem, 8vw, 5rem) 0'
          }}>
            <div className="glass-card" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: 'clamp(0.6rem, 2vw, 0.75rem) clamp(1.2rem, 3vw, 1.5rem)',
              borderRadius: '100px',
              marginBottom: '2rem',
              fontSize: 'clamp(0.8rem, 2vw, 0.9rem)',
              fontWeight: 500,
              color: '#a0aec0',
              animation: 'fadeInScale 0.8s ease-out'
            }}>
              <Terminal size={18} style={{ color: '#00f5ff' }} />
              Professional Experience
              <Activity size={18} style={{ color: '#ec4899' }} />
            </div>

            <h1 className="gradient-text" style={{
              fontSize: 'clamp(2.5rem, 10vw, 7rem)',
              fontWeight: 900,
              lineHeight: 1.1,
              marginBottom: '2rem',
              fontFamily: "'Space Grotesk', sans-serif",
              letterSpacing: '-0.03em',
              animation: 'fadeInUp 1s ease-out'
            }}>
              ELITE INTERNSHIPS
            </h1>

            <p style={{
              fontSize: 'clamp(1rem, 2.5vw, 1.5rem)',
              color: '#a0aec0',
              maxWidth: '800px',
              lineHeight: 1.8,
              marginBottom: '3rem',
              fontWeight: 400,
              animation: 'fadeInUp 1.2s ease-out',
              padding: '0 1rem'
            }}>
              Professional experience across cutting-edge domains: Full-Stack Engineering • Artificial Intelligence • Data Science
            </p>

            <div className="glass-card" style={{
              display: 'flex',
              gap: '0.5rem',
              padding: '0.5rem',
              borderRadius: '100px',
              marginBottom: '2rem',
              animation: 'fadeInUp 1.4s ease-out',
              flexWrap: 'wrap',
              justifyContent: 'center'
            }}>
              {viewModes.map(mode => {
                const Icon = mode.icon;
                return (
                  <button key={mode.id} onClick={() => setViewMode(mode.id)} style={{
                    padding: 'clamp(0.6rem, 2vw, 0.75rem) clamp(1rem, 3vw, 1.5rem)',
                    borderRadius: '100px',
                    background: viewMode === mode.id ? 'linear-gradient(135deg, #00f5ff, #a78bfa)' : 'transparent',
                    border: 'none',
                    color: viewMode === mode.id ? '#000' : '#a0aec0',
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    fontWeight: 700,
                    fontSize: 'clamp(0.8rem, 2vw, 0.9rem)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    <Icon size={18} />
                    <span className="hide-mobile">{mode.label}</span>
                  </button>
                );
              })}
            </div>

            <div style={{
              display: 'flex',
              gap: '1rem',
              flexWrap: 'wrap',
              justifyContent: 'center',
              animation: 'fadeInUp 1.6s ease-out'
            }}>
              {['ALL', 'LEGENDARY', 'EPIC'].map((filter) => (
                <button key={filter} onClick={() => setSelectedFilter(filter)} className="glass-card" style={{
                  padding: 'clamp(0.75rem, 2vw, 0.875rem) clamp(1.5rem, 4vw, 2rem)',
                  borderRadius: '100px',
                  fontSize: 'clamp(0.85rem, 2vw, 0.95rem)',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  background: selectedFilter === filter ? 'linear-gradient(135deg, #00f5ff, #a78bfa)' : 'rgba(255, 255, 255, 0.03)',
                  color: selectedFilter === filter ? '#000' : '#a0aec0',
                  border: selectedFilter === filter ? 'none' : '1px solid rgba(255, 255, 255, 0.08)'
                }}>
                  {filter === 'ALL' ? '⚡ All' : `✨ ${filter}`}
                </button>
              ))}
            </div>
          </section>

          <section style={{ padding: '4rem 0', marginBottom: '6rem' }}>
            <div style={getLayoutStyles()}>
              {filteredInternships.map((intern, i) => renderInternshipCard(intern, i))}
            </div>
          </section>

          <section className="glass-card" style={{
            padding: 'clamp(2.5rem, 6vw, 5rem) clamp(1.5rem, 4vw, 3rem)',
            borderRadius: '32px',
            marginBottom: '6rem',
            border: '1px solid rgba(0, 245, 255, 0.3)'
          }}>
            <h2 style={{
              fontSize: 'clamp(2rem, 6vw, 4rem)',
              fontWeight: 900,
              textAlign: 'center',
              marginBottom: '3rem',
              fontFamily: "'Space Grotesk', sans-serif"
            }}>
              <span className="gradient-text">Career Achievements</span>
            </h2>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: 'clamp(1.5rem, 3vw, 2rem)'
            }}>
              {[
                { label: 'Experience', value: '7+', unit: 'Months', icon: Clock, color: '#00f5ff' },
                { label: 'Companies', value: '3', unit: 'Elite', icon: Shield, color: '#a78bfa' },
                { label: 'Projects', value: '15+', unit: 'Built', icon: Rocket, color: '#ec4899' },
                { label: 'Technologies', value: '25+', unit: 'Skills', icon: Zap, color: '#10b981' },
                { label: 'Success Rate', value: '95%', unit: 'Average', icon: TrendingUp, color: '#fbbf24' },
                { label: 'Certificates', value: '3', unit: 'Verified', icon: Award, color: '#f97316' }
              ].map((stat, i) => {
                const StatIcon = stat.icon;
                return (
                  <div key={i} className="glass-card" style={{
                    padding: 'clamp(1.5rem, 3vw, 2rem)',
                    borderRadius: '24px',
                    textAlign: 'center',
                    border: `1px solid ${stat.color}40`,
                    transition: 'all 0.4s',
                    cursor: 'pointer'
                  }}>
                    <div style={{
                      width: 'clamp(50px, 12vw, 60px)',
                      height: 'clamp(50px, 12vw, 60px)',
                      margin: '0 auto 1rem',
                      background: `${stat.color}20`,
                      border: `2px solid ${stat.color}40`,
                      borderRadius: '16px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <StatIcon size={28} style={{ color: stat.color }} />
                    </div>
                    <div style={{
                      fontSize: 'clamp(2rem, 6vw, 3rem)',
                      fontWeight: 900,
                      color: stat.color,
                      marginBottom: '0.5rem',
                      fontFamily: "'Space Grotesk', sans-serif"
                    }}>
                      {stat.value}
                    </div>
                    <div style={{
                      fontSize: 'clamp(0.9rem, 2vw, 1rem)',
                      color: '#fff',
                      fontWeight: 700,
                      marginBottom: '0.25rem'
                    }}>
                      {stat.label}
                    </div>
                    <div style={{
                      fontSize: 'clamp(0.75rem, 2vw, 0.85rem)',
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

          <section className="glass-card" style={{
            padding: 'clamp(3rem, 8vw, 6rem) clamp(1.5rem, 4vw, 3rem)',
            borderRadius: '32px',
            textAlign: 'center',
            background: 'linear-gradient(135deg, rgba(0, 245, 255, 0.1), rgba(167, 139, 250, 0.1))',
            border: '1px solid rgba(0, 245, 255, 0.3)',
            marginBottom: '6rem'
          }}>
            <h2 style={{
              fontSize: 'clamp(2.5rem, 8vw, 5rem)',
              fontWeight: 900,
              marginBottom: '1.5rem',
              fontFamily: "'Space Grotesk', sans-serif"
            }}>
              <span className="gradient-text">Ready to Collaborate?</span>
            </h2>

            <p style={{
              fontSize: 'clamp(1rem, 2.5vw, 1.4rem)',
              color: '#a0aec0',
              maxWidth: '800px',
              margin: '0 auto 3rem',
              lineHeight: 1.7,
              padding: '0 1rem'
            }}>
              Let's build something amazing together. From full-stack applications to AI-powered solutions.
            </p>

            <div style={{
              display: 'flex',
              gap: '1.5rem',
              justifyContent: 'center',
              flexWrap: 'wrap',
              padding: '0 1rem'
            }}>
              <a href="https://github.com/bhagavan444" target="_blank" rel="noopener noreferrer" className="glass-card" style={{
                padding: 'clamp(1rem, 3vw, 1.25rem) clamp(2rem, 5vw, 2.5rem)',
                borderRadius: '100px',
                fontSize: 'clamp(0.95rem, 2vw, 1.1rem)',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                textDecoration: 'none',
                color: '#00f5ff',
                border: '1px solid rgba(0, 245, 255, 0.5)',
                transition: 'all 0.3s'
              }}>
                <Github size={20} />
                View Repositories
              </a>

              <a href="mailto:g.sivasatyasaibhagavan@gmail.com" style={{
                padding: 'clamp(1rem, 3vw, 1.25rem) clamp(2rem, 5vw, 2.5rem)',
                borderRadius: '100px',
                fontSize: 'clamp(0.95rem, 2vw, 1.1rem)',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                textDecoration: 'none',
                background: 'linear-gradient(135deg, #00f5ff, #a78bfa)',
                color: '#000',
                transition: 'all 0.3s'
              }}>
                <Mail size={20} />
                Let's Collaborate
              </a>
            </div>
          </section>
        </div>
      </div>

      {activeCert && (
        <div onClick={() => setActiveCert(null)} style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.95)',
          backdropFilter: 'blur(20px)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 'clamp(1rem, 3vw, 2rem)',
          animation: 'fadeInScale 0.3s ease-out',
          overflowY: 'auto'
        }}>
          <div onClick={(e) => e.stopPropagation()} className="glass-card" style={{
            maxWidth: '1400px',
            width: '100%',
            maxHeight: '90vh',
            overflow: 'auto',
            borderRadius: '32px',
            border: `2px solid ${activeCert.color}`,
            position: 'relative'
          }}>
            <button onClick={() => setActiveCert(null)} className="glass-card" style={{
              position: 'absolute',
              top: '1rem',
              right: '1rem',
              width: '45px',
              height: '45px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              border: '2px solid #ff4444',
              background: 'rgba(255, 68, 68, 0.2)',
              transition: 'all 0.3s',
              zIndex: 10
            }}>
              <X size={22} color="#ff4444" />
            </button>

            <img src={getCertificateUrl(activeCert.certId)} alt={`${activeCert.title} Certificate`} style={{
              width: '100%',
              maxHeight: '50vh',
              objectFit: 'contain',
              borderRadius: '32px 32px 0 0'
            }} />

            <div style={{ padding: 'clamp(1.5rem, 5vw, 4rem)' }}>
              <h2 style={{
                fontSize: 'clamp(1.8rem, 5vw, 3.5rem)',
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
                gap: 'clamp(1rem, 3vw, 2rem)',
                marginBottom: '2rem',
                fontSize: 'clamp(0.95rem, 2vw, 1.1rem)',
                color: '#cbd5e0'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Briefcase size={18} style={{ color: activeCert.color }} />
                  {activeCert.company}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Calendar size={18} style={{ color: activeCert.color }} />
                  {activeCert.period}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <MapPin size={18} style={{ color: activeCert.color }} />
                  {activeCert.location}
                </div>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
                {activeCert.tech.map((t) => (
                  <span key={t} className="glass-card" style={{
                    padding: 'clamp(0.6rem, 2vw, 0.75rem) clamp(1rem, 3vw, 1.5rem)',
                    borderRadius: '100px',
                    border: `1px solid ${activeCert.color}60`,
                    color: activeCert.color,
                    fontSize: 'clamp(0.85rem, 2vw, 0.95rem)',
                    fontWeight: 600,
                    fontFamily: "'JetBrains Mono', monospace"
                  }}>
                    {t}
                  </span>
                ))}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '3rem' }}>
                {activeCert.achievements.map((ach, idx) => (
                  <div key={idx} className="glass-card" style={{
                    padding: 'clamp(0.875rem, 2vw, 1rem)',
                    borderRadius: '12px',
                    borderLeft: `4px solid ${activeCert.color}`,
                    fontSize: 'clamp(0.9rem, 2vw, 1rem)',
                    color: '#e2e8f0'
                  }}>
                    {ach}
                  </div>
                ))}
              </div>

              <div style={{ textAlign: 'center' }}>
                <a href={getViewUrl(activeCert.certId)} target="_blank" rel="noopener noreferrer" style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '1rem',
                  padding: 'clamp(1rem, 3vw, 1.25rem) clamp(2rem, 5vw, 3rem)',
                  background: `linear-gradient(90deg, ${activeCert.color}, ${activeCert.secondaryColor})`,
                  color: '#000',
                  fontWeight: 800,
                  fontSize: 'clamp(0.95rem, 2vw, 1.1rem)',
                  borderRadius: '100px',
                  textDecoration: 'none',
                  transition: 'all 0.3s',
                  fontFamily: "'Space Grotesk', sans-serif"
                }}>
                  <Award size={20} />
                  View Full Certificate
                  <ExternalLink size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}