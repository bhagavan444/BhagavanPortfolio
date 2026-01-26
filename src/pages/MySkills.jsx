"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Code2, Database, Brain, Cloud, Layers, Zap, Cpu, Globe, Terminal,
  TrendingUp, Award, Star, ExternalLink, CheckCircle2, Rocket,
  GitBranch, Server, Lock, BarChart2, Settings, FileCode,
  Database as DbIcon, Network, Wrench, Sparkles, Trophy,
  Target, Flame, Shield, Crown, Hexagon, Activity
} from "lucide-react";

const skills = [
  {
    id: 1,
    name: "Full-Stack Development",
    icon: Layers,
    level: 92,
    color: "#00ffff",
    rarity: "LEGENDARY",
    yearsActive: "4+",
    masteryRank: "S+",
    technologies: [
      "React", "Next.js", "Node.js", "Express", "MongoDB",
      "JWT", "OAuth 2.0", "REST APIs", "TypeScript", "Tailwind CSS"
    ],
    projects: 24,
    completionRate: 98,
    impact: "Built 24 production apps serving 10K+ users",
    usedIn: [
      "ATS Resume Builder Platform",
      "NexusAI – Multi-Modal AI Workspace",
      "Project Forge – AI Project Generator",
      "ArchMind – AI System Design Platform",
      "Production-Style AI Chatbot",
      "Hackathon Electronics Marketplace",
      "Internship Projects (StudyOwl)"
    ],
    howUsed: [
      "Built responsive & performant UI using React + Next.js",
      "Developed secure RESTful APIs with Node.js & Express",
      "Implemented JWT & OAuth authentication flows",
      "Designed MongoDB schemas with proper indexing & aggregation",
      "Integrated frontend with backend using Axios & fetch",
      "Used TypeScript for type-safe development",
      "Styled components with Tailwind CSS & custom animations"
    ],
    keyAchievements: [
      "🏆 Reduced load time by 60% through optimization",
      "🚀 Deployed 24 production-grade applications",
      "⚡ Achieved 98% uptime across all projects",
      "💎 Built real-time features with WebSocket"
    ],
    description:
      "Designed and developed end-to-end full-stack web applications with modern authentication, database integration, responsive UI, and production-ready architecture."
  },

  {
    id: 2,
    name: "Machine Learning",
    icon: Brain,
    level: 88,
    color: "#8a2be2",
    rarity: "EPIC",
    yearsActive: "3+",
    masteryRank: "S",
    technologies: [
      "Scikit-learn", "Pandas", "NumPy", "Matplotlib", "Seaborn",
      "Jupyter Notebook", "TF-IDF", "Feature Engineering", "Hyperparameter Tuning"
    ],
    projects: 18,
    completionRate: 94,
    impact: "Achieved 95%+ accuracy across 18 ML models",
    usedIn: [
      "TruthGuard AI – Fake News Detection",
      "Career Path Recommendation System",
      "Heart Disease Prediction Platform",
      "Blackbucks Internship Projects",
      "Academic ML Assignments"
    ],
    howUsed: [
      "Performed comprehensive data preprocessing & feature engineering",
      "Built classification & regression models using Scikit-learn",
      "Implemented TF-IDF for NLP-based text classification",
      "Evaluated models using accuracy, precision, recall, F1-score & ROC-AUC",
      "Optimized models with GridSearchCV & RandomizedSearchCV",
      "Visualized data insights using Matplotlib & Seaborn",
      "Documented experiments in Jupyter Notebooks"
    ],
    keyAchievements: [
      "🎯 95%+ accuracy on fake news detection",
      "📊 Processed 500K+ data points efficiently",
      "🔬 Published research-quality notebooks",
      "⚙️ Optimized models for 3x faster inference"
    ],
    description:
      "Developed high-accuracy machine learning models for classification, regression, and prediction tasks using structured and unstructured data."
  },

  {
    id: 3,
    name: "Deep Learning & AI",
    icon: Star,
    level: 87,
    color: "#00ffff",
    rarity: "LEGENDARY",
    yearsActive: "3+",
    masteryRank: "S",
    technologies: [
      "TensorFlow", "Keras", "PyTorch", "CNN", "Computer Vision",
      "OpenCV", "Neural Networks", "Transfer Learning", "Image Augmentation"
    ],
    projects: 14,
    completionRate: 92,
    impact: "Deployed AI models with 92% accuracy in production",
    usedIn: [
      "Smart Sorting (AI/ML Internship)",
      "Image Classification Projects",
      "Healthy vs Rotten Fruit Detection",
      "Object Detection Experiments",
      "Deep Learning Academic Projects"
    ],
    howUsed: [
      "Designed custom CNN architectures for image classification",
      "Implemented transfer learning using pre-trained models (ResNet, VGG, EfficientNet)",
      "Performed image preprocessing, augmentation & normalization",
      "Trained & validated deep learning models with GPU acceleration",
      "Integrated trained models into Flask & React applications",
      "Deployed AI models for real-time inference",
      "Used OpenCV for image processing pipelines"
    ],
    keyAchievements: [
      "🧠 Built custom CNN architectures from scratch",
      "🎨 Real-time object detection at 30 FPS",
      "💫 Transfer learning with 92% accuracy",
      "🔥 GPU-accelerated training pipelines"
    ],
    description:
      "Built powerful deep learning models for computer vision and intelligent automation with real-world deployment experience."
  },

  {
    id: 4,
    name: "Cloud & DevOps",
    icon: Cloud,
    level: 85,
    color: "#8a2be2",
    rarity: "EPIC",
    yearsActive: "3+",
    masteryRank: "A+",
    technologies: [
      "AWS EC2", "AWS S3", "AWS Lambda", "Docker", "GitHub Actions",
      "Linux Server Management", "Nginx", "CI/CD Basics"
    ],
    projects: 16,
    completionRate: 96,
    impact: "Managed infrastructure serving 50K+ requests/day",
    usedIn: [
      "AI Chatbot Deployment",
      "ML Flask Applications",
      "Portfolio & Web Projects",
      "Internship Deployment Tasks"
    ],
    howUsed: [
      "Deployed full-stack & ML applications on AWS EC2",
      "Stored & served assets using AWS S3",
      "Containerized applications with Docker",
      "Set up basic CI/CD pipelines using GitHub Actions",
      "Managed Linux servers (Ubuntu) for production deployment",
      "Configured Nginx as reverse proxy & SSL setup",
      "Optimized deployment for cost & performance"
    ],
    keyAchievements: [
      "☁️ Zero-downtime deployments achieved",
      "🐳 Containerized 16 production apps",
      "⚡ 40% cost reduction through optimization",
      "🔒 Implemented SSL/TLS security protocols"
    ],
    description:
      "Deployed and managed scalable, production-ready applications using cloud platforms and containerization tools."
  },

  {
    id: 5,
    name: "Data Science & Analytics",
    icon: Database,
    level: 90,
    color: "#00ffff",
    rarity: "LEGENDARY",
    yearsActive: "3+",
    masteryRank: "S",
    technologies: [
      "Pandas", "NumPy", "Matplotlib", "Seaborn", "Plotly",
      "SQL", "MySQL", "PostgreSQL", "Data Cleaning", "EDA"
    ],
    projects: 22,
    completionRate: 95,
    impact: "Analyzed 1M+ records to drive business insights",
    usedIn: [
      "ML Model Training Pipelines",
      "Internship Data Analysis Assignments",
      "Academic Data Science Projects",
      "Hackathon Data Challenges"
    ],
    howUsed: [
      "Cleaned & transformed large raw datasets using Pandas & NumPy",
      "Performed in-depth Exploratory Data Analysis (EDA)",
      "Visualized complex trends & insights using Matplotlib, Seaborn & Plotly",
      "Wrote efficient SQL queries for data extraction & analysis",
      "Prepared high-quality datasets for ML & DL pipelines",
      "Created interactive dashboards for data storytelling"
    ],
    keyAchievements: [
      "📈 Processed 1M+ data records efficiently",
      "🎨 Created 50+ interactive visualizations",
      "💡 Uncovered insights that drove key decisions",
      "⚡ Optimized queries for 10x faster execution"
    ],
    description:
      "Analyzed and processed complex datasets to extract meaningful insights and support advanced machine learning models."
  },

  {
    id: 6,
    name: "Core Programming & CS Fundamentals",
    icon: Code2,
    level: 94,
    color: "#8a2be2",
    rarity: "MYTHIC",
    yearsActive: "5+",
    masteryRank: "S++",
    technologies: [
      "Python", "Java", "JavaScript", "TypeScript", "C++",
      "Data Structures & Algorithms", "OOP", "System Design Basics"
    ],
    projects: 32,
    completionRate: 97,
    impact: "Solved 500+ algorithmic problems, built 32 projects",
    usedIn: [
      "All Academic & Internship Projects",
      "LeetCode & HackerRank Practice",
      "Coding Competitions",
      "Technical Interview Preparation"
    ],
    howUsed: [
      "Implemented complex algorithms & data structures in Python & Java",
      "Applied OOP principles across multiple large-scale projects",
      "Solved 500+ coding problems on LeetCode & HackerRank",
      "Used JavaScript & TypeScript for modern web development",
      "Built strong foundation for scalable & maintainable systems",
      "Prepared for technical interviews with system design concepts"
    ],
    keyAchievements: [
      "🏅 500+ LeetCode problems solved",
      "🎖️ Top 5% on HackerRank",
      "🧩 Master of algorithms & data structures",
      "🌟 Built scalable system architectures"
    ],
    description:
      "Strong programming foundation with deep understanding of algorithms, data structures, OOP, and software design principles."
  }
];

export default function EliteSkillsShowcase() {
  const [activeSkill, setActiveSkill] = useState(null);
  const [hoveredTech, setHoveredTech] = useState(null);
  const [viewMode, setViewMode] = useState('cards'); // 'cards' or 'matrix'
  const [filterRarity, setFilterRarity] = useState('ALL');
  const [showStats, setShowStats] = useState(false);
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);

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

    // Advanced particle system with connections
    particlesRef.current = Array.from({ length: 100 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 2 + 1,
      opacity: Math.random() * 0.5 + 0.3,
      hue: Math.random() * 60 + 180
    }));

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        // Draw connections
        particlesRef.current.forEach((p2, j) => {
          if (i < j) {
            const dx = p.x - p2.x;
            const dy = p.y - p2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 150) {
              ctx.strokeStyle = `hsla(${p.hue}, 100%, 50%, ${0.2 * (1 - dist / 150)})`;
              ctx.lineWidth = 0.5;
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.stroke();
            }
          }
        });

        // Draw particle
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 4);
        gradient.addColorStop(0, `hsla(${p.hue}, 100%, 50%, ${p.opacity})`);
        gradient.addColorStop(1, 'transparent');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 4, 0, Math.PI * 2);
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

  const getRarityColor = (rarity) => {
    const colors = {
      'MYTHIC': '#ff00ff',
      'LEGENDARY': '#ffd700',
      'EPIC': '#8a2be2',
      'RARE': '#00ffff'
    };
    return colors[rarity] || '#00ffff';
  };

  const filteredSkills = filterRarity === 'ALL' 
    ? skills 
    : skills.filter(s => s.rarity === filterRarity);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=Rajdhani:wght@300;400;500;600;700&family=Fira+Code:wght@400;500;600&display=swap');

        @keyframes slideIn {
          from { opacity: 0; transform: translateX(-40px); }
          to { opacity: 1; transform: translateX(0); }
        }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes glitch {
          0%, 100% { transform: translate(0); }
          20% { transform: translate(-2px, 2px); }
          40% { transform: translate(-2px, -2px); }
          60% { transform: translate(2px, 2px); }
          80% { transform: translate(2px, -2px); }
        }

        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.05); }
        }

        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px currentColor; }
          50% { box-shadow: 0 0 40px currentColor, 0 0 60px currentColor; }
        }

        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }

        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .skill-card {
          position: relative;
          background: linear-gradient(135deg, rgba(0, 0, 0, 0.9), rgba(20, 20, 40, 0.9));
          border: 2px solid;
          transition: all 0.5s cubic-bezier(0.22, 1, 0.36, 1);
          overflow: hidden;
          border-radius: 24px;
          backdrop-filter: blur(10px);
        }

        .skill-card:hover {
          transform: translateY(-15px) scale(1.02);
          box-shadow: 0 20px 60px currentColor;
        }

        .skill-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.1),
            transparent
          );
          animation: shimmer 3s infinite;
        }

        .skill-card::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 100%;
          background: linear-gradient(
            45deg,
            transparent 30%,
            rgba(255, 255, 255, 0.05) 50%,
            transparent 70%
          );
          animation: scan 4s linear infinite;
          pointer-events: none;
        }

        .tech-tag {
          background: rgba(0, 0, 0, 0.7);
          border: 1px solid;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-family: 'Fira Code', monospace;
          font-size: 0.85rem;
          transition: all 0.3s;
          cursor: pointer;
          position: relative;
          overflow: hidden;
        }

        .tech-tag::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          transition: left 0.5s;
        }

        .tech-tag:hover::before {
          left: 100%;
        }

        .tech-tag:hover {
          transform: translateY(-3px) scale(1.1);
          box-shadow: 0 5px 20px currentColor;
        }

        .neon-text {
          text-shadow: 
            0 0 10px currentColor,
            0 0 20px currentColor,
            0 0 40px currentColor,
            0 0 80px currentColor;
        }

        .grid-bg {
          background-image: 
            linear-gradient(rgba(0,255,255,0.05) 2px, transparent 2px),
            linear-gradient(90deg, rgba(138,43,226,0.05) 2px, transparent 2px);
          background-size: 50px 50px;
          animation: gridMove 20s linear infinite;
        }

        @keyframes gridMove {
          0% { background-position: 0 0; }
          100% { background-position: 50px 50px; }
        }

        .rarity-badge {
          position: absolute;
          top: 1rem;
          right: 1rem;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-family: 'Orbitron', sans-serif;
          font-weight: 800;
          font-size: 0.75rem;
          letter-spacing: 1px;
          border: 2px solid;
          animation: pulse 2s ease-in-out infinite;
          z-index: 10;
        }

        .mastery-rank {
          font-family: 'Orbitron', sans-serif;
          font-weight: 900;
          font-size: 2rem;
          letter-spacing: 3px;
          animation: glow 2s ease-in-out infinite;
        }

        .achievement-badge {
          background: linear-gradient(135deg, rgba(255,215,0,0.1), rgba(255,165,0,0.1));
          border: 1px solid rgba(255,215,0,0.3);
          border-radius: 12px;
          padding: 0.75rem;
          font-family: 'Rajdhani', sans-serif;
          font-size: 0.9rem;
          transition: all 0.3s;
        }

        .achievement-badge:hover {
          transform: translateX(10px);
          border-color: rgba(255,215,0,0.8);
          background: linear-gradient(135deg, rgba(255,215,0,0.2), rgba(255,165,0,0.2));
        }

        .stat-card {
          background: linear-gradient(135deg, rgba(0,0,0,0.8), rgba(20,20,40,0.8));
          border: 2px solid;
          border-radius: 20px;
          padding: 2rem;
          transition: all 0.4s;
          position: relative;
          overflow: hidden;
        }

        .stat-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 15px 40px currentColor;
        }

        .filter-btn {
          background: rgba(0, 0, 0, 0.7);
          border: 2px solid;
          padding: 0.75rem 1.5rem;
          border-radius: 25px;
          font-family: 'Orbitron', sans-serif;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s;
          color: white;
        }

        .filter-btn:hover {
          transform: scale(1.05);
          box-shadow: 0 0 30px currentColor;
        }

        .filter-btn.active {
          background: currentColor;
          color: black;
          box-shadow: 0 0 40px currentColor;
        }

        .hexagon {
          width: 100px;
          height: 100px;
          clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
          background: linear-gradient(135deg, currentColor, transparent);
          display: flex;
          align-items: center;
          justify-content: center;
          animation: rotate 20s linear infinite;
        }

        .progress-ring {
          transform: rotate(-90deg);
        }

        .progress-ring-circle {
          transition: stroke-dashoffset 1.5s cubic-bezier(0.22, 1, 0.36, 1);
        }
      `}</style>

      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(to bottom, #000000, #0a0a1a, #000000)',
        color: '#ffffff',
        position: 'relative',
        overflow: 'hidden',
        padding: '4rem 1rem',
        fontFamily: "'Rajdhani', sans-serif"
      }}>
        {/* Animated Grid Background */}
        <div className="grid-bg" style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.3,
          pointerEvents: 'none'
        }} />

        {/* Advanced Canvas Background */}
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

        {/* Rotating Geometric Shapes */}
        {[...Array(3)].map((_, i) => (
          <div key={i} style={{
            position: 'absolute',
            top: `${20 + i * 30}%`,
            right: `${5 + i * 10}%`,
            width: `${400 - i * 100}px`,
            height: `${400 - i * 100}px`,
            border: '2px solid rgba(0, 255, 255, 0.1)',
            borderRadius: '50%',
            animation: `rotate ${30 + i * 10}s linear infinite ${i % 2 === 0 ? 'reverse' : ''}`,
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
          {/* Epic Header */}
          <div style={{
            textAlign: 'center',
            marginBottom: '4rem',
            animation: 'fadeIn 1s ease-out'
          }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '1rem',
              fontFamily: "'Fira Code', monospace",
              color: '#00ffff',
              fontSize: '1.1rem',
              marginBottom: '1.5rem',
              padding: '1rem 2rem',
              border: '2px solid rgba(0, 255, 255, 0.4)',
              borderRadius: 40,
              background: 'rgba(0, 0, 0, 0.7)',
              animation: 'pulse 3s ease-in-out infinite'
            }}>
              <Terminal size={24} />
              <span>{'>'} elite_developer.initialize()</span>
              <Activity size={24} className="pulse" />
            </div>

            <h1 style={{
              fontSize: 'clamp(3.5rem, 8vw, 6.5rem)',
              fontWeight: 900,
              marginBottom: '2rem',
              color: '#00ffff',
              textTransform: 'uppercase',
              letterSpacing: '5px',
              fontFamily: "'Orbitron', sans-serif",
              animation: 'slideIn 1s ease-out',
              background: 'linear-gradient(90deg, #00ffff, #8a2be2, #00ffff)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundSize: '200% 100%'
            }}>
              ELITE SKILLS ARSENAL
            </h1>

            <p style={{
              fontSize: 'clamp(1.2rem, 2.5vw, 1.5rem)',
              color: '#b0b0ff',
              maxWidth: '900px',
              margin: '0 auto 3rem',
              lineHeight: 1.8,
              fontFamily: "'Rajdhani', sans-serif",
              fontWeight: 500
            }}>
              Master-level proficiency across full-stack development, AI/ML, cloud architecture, and data science.
              <br />
              <span style={{ color: '#00ffff', fontFamily: "'Fira Code', monospace" }}>
                [5+ production projects | 300+ problems solved | 0+  years experience]
              </span>
            </p>

            {/* Filter Buttons */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '1rem',
              flexWrap: 'wrap',
              marginBottom: '2rem'
            }}>
              {['ALL', 'MYTHIC', 'LEGENDARY', 'EPIC'].map(rarity => (
                <button
                  key={rarity}
                  className={`filter-btn ${filterRarity === rarity ? 'active' : ''}`}
                  onClick={() => setFilterRarity(rarity)}
                  style={{
                    borderColor: getRarityColor(rarity),
                    color: filterRarity === rarity ? '#000' : getRarityColor(rarity),
                    background: filterRarity === rarity ? getRarityColor(rarity) : 'rgba(0,0,0,0.7)'
                  }}
                >
                  {rarity === 'ALL' ? '🌟 ALL SKILLS' : `✨ ${rarity}`}
                </button>
              ))}
            </div>
          </div>

          {/* Skills Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 380px), 1fr))',
            gap: '2rem',
            marginBottom: '5rem'
          }}>
            {filteredSkills.map((skill, index) => {
              const Icon = skill.icon;
              const isActive = activeSkill === skill.id;
              const rarityColor = getRarityColor(skill.rarity);

              return (
                <div
                  key={skill.id}
                  className="skill-card"
                  onMouseEnter={() => setActiveSkill(skill.id)}
                  onMouseLeave={() => setActiveSkill(null)}
                  style={{
                    padding: '1.5rem',
                    borderColor: isActive ? rarityColor : 'rgba(0, 255, 255, 0.2)',
                    animation: `slideUp ${0.8 + index * 0.1}s ease-out`,
                    opacity: 0,
                    animationFillMode: 'forwards',
                    animationDelay: `${index * 0.1}s`,
                    maxWidth: '100%',
                    boxSizing: 'border-box'
                  }}
                >
                  {/* Rarity Badge */}
                  <div className="rarity-badge" style={{
                    background: rarityColor,
                    color: '#000',
                    borderColor: rarityColor,
                    boxShadow: isActive ? `0 0 30px ${rarityColor}` : 'none'
                  }}>
                    {skill.rarity}
                  </div>

                  {/* Top Gradient Border */}
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '6px',
                    background: `linear-gradient(90deg, ${rarityColor}, transparent)`,
                    opacity: isActive ? 1 : 0.6
                  }} />

                  {/* Header Section */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    marginBottom: '1.5rem',
                    gap: '1rem',
                    flexWrap: 'wrap'
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      flex: 1,
                      minWidth: '200px'
                    }}>
                      <div className="hexagon" style={{
                        background: `linear-gradient(135deg, ${rarityColor}, transparent)`,
                        boxShadow: isActive ? `0 0 40px ${rarityColor}` : 'none',
                        minWidth: '70px',
                        minHeight: '70px',
                        width: '70px',
                        height: '70px'
                      }}>
                        <Icon size={32} style={{ 
                          color: rarityColor,
                          filter: 'drop-shadow(0 0 10px currentColor)',
                          animation: 'none',
                          transform: 'rotate(90deg)'
                        }} />
                      </div>

                      <div style={{ flex: 1 }}>
                        <div className="mastery-rank" style={{
                          color: rarityColor,
                          textShadow: isActive ? `0 0 30px ${rarityColor}` : 'none',
                          marginBottom: '0.5rem',
                          fontSize: '1.5rem'
                        }}>
                          {skill.masteryRank}
                        </div>
                        <div style={{
                          fontFamily: "'Fira Code', monospace",
                          fontSize: '0.9rem',
                          color: '#888',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem'
                        }}>
                          <Zap size={16} style={{ color: rarityColor }} />
                          Active: {skill.yearsActive}
                        </div>
                      </div>
                    </div>

                    {/* Circular Progress */}
                    <svg width="80" height="80" style={{ transform: 'rotate(-90deg)', flexShrink: 0 }}>
                      <circle
                        cx="40"
                        cy="40"
                        r="32"
                        fill="none"
                        stroke="rgba(255,255,255,0.1)"
                        strokeWidth="6"
                      />
                      <circle
                        cx="40"
                        cy="40"
                        r="32"
                        fill="none"
                        stroke={rarityColor}
                        strokeWidth="6"
                        strokeDasharray={`${2 * Math.PI * 32}`}
                        strokeDashoffset={`${2 * Math.PI * 32 * (1 - skill.level / 100)}`}
                        style={{
                          transition: 'stroke-dashoffset 1.5s cubic-bezier(0.22, 1, 0.36, 1)',
                          filter: `drop-shadow(0 0 ${isActive ? '10px' : '5px'} ${rarityColor})`
                        }}
                        strokeLinecap="round"
                      />
                      <text
                        x="40"
                        y="40"
                        textAnchor="middle"
                        dy="6"
                        fill={rarityColor}
                        fontSize="16"
                        fontWeight="900"
                        fontFamily="'Orbitron', sans-serif"
                        style={{ transform: 'rotate(90deg)', transformOrigin: '40px 40px' }}
                      >
                        {skill.level}%
                      </text>
                    </svg>
                  </div>

                  {/* Title */}
                  <h3 style={{
                    fontSize: '2rem',
                    fontWeight: 900,
                    marginBottom: '1rem',
                    color: '#ffffff',
                    textTransform: 'uppercase',
                    letterSpacing: '2px',
                    fontFamily: "'Orbitron', sans-serif"
                  }}>
                    {skill.name}
                  </h3>

                  {/* Impact Badge */}
                  <div style={{
                    background: `linear-gradient(135deg, ${rarityColor}20, ${rarityColor}10)`,
                    border: `2px solid ${rarityColor}40`,
                    borderRadius: '15px',
                    padding: '1rem',
                    marginBottom: '1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem'
                  }}>
                    <Trophy size={24} style={{ color: rarityColor }} />
                    <span style={{
                      fontFamily: "'Rajdhani', sans-serif",
                      fontSize: '1.05rem',
                      fontWeight: 600,
                      color: '#e0e0ff'
                    }}>
                      {skill.impact}
                    </span>
                  </div>

                  {/* Description */}
                  <p style={{
                    fontSize: '1.05rem',
                    color: '#c0c0ff',
                    lineHeight: 1.7,
                    marginBottom: '2rem',
                    fontFamily: "'Rajdhani', sans-serif"
                  }}>
                    {skill.description}
                  </p>

                  {/* Stats Row */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: '1rem',
                    marginBottom: '2rem'
                  }}>
                    <div style={{
                      background: 'rgba(0, 0, 0, 0.5)',
                      border: `1px solid ${rarityColor}30`,
                      borderRadius: '12px',
                      padding: '1rem',
                      textAlign: 'center'
                    }}>
                      <div style={{
                        fontSize: '2rem',
                        fontWeight: 900,
                        color: rarityColor,
                        fontFamily: "'Orbitron', sans-serif",
                        marginBottom: '0.25rem'
                      }}>
                        {skill.projects}
                      </div>
                      <div style={{
                        fontSize: '0.9rem',
                        color: '#888',
                        textTransform: 'uppercase',
                        letterSpacing: '1px'
                      }}>
                        Projects
                      </div>
                    </div>

                    <div style={{
                      background: 'rgba(0, 0, 0, 0.5)',
                      border: `1px solid ${rarityColor}30`,
                      borderRadius: '12px',
                      padding: '1rem',
                      textAlign: 'center'
                    }}>
                      <div style={{
                        fontSize: '2rem',
                        fontWeight: 900,
                        color: rarityColor,
                        fontFamily: "'Orbitron', sans-serif",
                        marginBottom: '0.25rem'
                      }}>
                        {skill.completionRate}%
                      </div>
                      <div style={{
                        fontSize: '0.9rem',
                        color: '#888',
                        textTransform: 'uppercase',
                        letterSpacing: '1px'
                      }}>
                        Success Rate
                      </div>
                    </div>
                  </div>

                  {/* Technologies */}
                  <div style={{
                    background: 'rgba(0, 0, 0, 0.5)',
                    border: `1px solid ${rarityColor}30`,
                    borderRadius: '16px',
                    padding: '1.5rem',
                    marginBottom: '1.5rem'
                  }}>
                    <h4 style={{
                      color: rarityColor,
                      fontSize: '1.2rem',
                      fontWeight: 700,
                      marginBottom: '1rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      fontFamily: "'Orbitron', sans-serif"
                    }}>
                      <Code2 size={22} /> Tech Stack
                    </h4>
                    <div style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '0.7rem'
                    }}>
                      {skill.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="tech-tag"
                          style={{
                            color: hoveredTech === tech ? '#000' : (isActive ? rarityColor : '#aaa'),
                            borderColor: hoveredTech === tech ? rarityColor : (isActive ? rarityColor : '#444'),
                            background: hoveredTech === tech ? rarityColor : 'rgba(0,0,0,0.6)'
                          }}
                          onMouseEnter={() => setHoveredTech(tech)}
                          onMouseLeave={() => setHoveredTech(null)}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Key Achievements */}
                  <div style={{
                    background: 'rgba(0, 0, 0, 0.5)',
                    border: `1px solid ${rarityColor}30`,
                    borderRadius: '16px',
                    padding: '1.5rem',
                    marginBottom: '1.5rem'
                  }}>
                    <h4 style={{
                      color: rarityColor,
                      fontSize: '1.2rem',
                      fontWeight: 700,
                      marginBottom: '1rem',
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
                      gap: '0.75rem'
                    }}>
                      {skill.keyAchievements.map((achievement, idx) => (
                        <div
                          key={idx}
                          className="achievement-badge"
                          style={{
                            borderColor: isActive ? `${rarityColor}50` : 'rgba(255,215,0,0.3)'
                          }}
                        >
                          {achievement}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Projects Used In - Collapsible */}
                  <details style={{
                    background: 'rgba(0, 0, 0, 0.5)',
                    border: `1px solid ${rarityColor}30`,
                    borderRadius: '16px',
                    padding: '1.5rem',
                    marginBottom: '1.5rem',
                    cursor: 'pointer'
                  }}>
                    <summary style={{
                      color: rarityColor,
                      fontSize: '1.2rem',
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      fontFamily: "'Orbitron', sans-serif",
                      cursor: 'pointer',
                      userSelect: 'none'
                    }}>
                      <Rocket size={22} /> Featured Projects ({skill.usedIn.length})
                    </summary>
                    <ul style={{
                      color: '#e0f7ff',
                      fontSize: '1rem',
                      listStyleType: 'none',
                      padding: 0,
                      margin: '1rem 0 0 0'
                    }}>
                      {skill.usedIn.map((proj, idx) => (
                        <li key={idx} style={{
                          marginBottom: '0.75rem',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.75rem',
                          padding: '0.5rem',
                          borderRadius: '8px',
                          transition: 'all 0.3s'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = `${rarityColor}15`;
                          e.currentTarget.style.transform = 'translateX(10px)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'transparent';
                          e.currentTarget.style.transform = 'translateX(0)';
                        }}>
                          <CheckCircle2 size={18} style={{ color: rarityColor, minWidth: '18px' }} />
                          {proj}
                        </li>
                      ))}
                    </ul>
                  </details>

                  {/* How I Used It - Collapsible */}
                  <details style={{
                    background: 'rgba(0, 0, 0, 0.5)',
                    border: `1px solid ${rarityColor}30`,
                    borderRadius: '16px',
                    padding: '1.5rem',
                    cursor: 'pointer'
                  }}>
                    <summary style={{
                      color: rarityColor,
                      fontSize: '1.2rem',
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      fontFamily: "'Orbitron', sans-serif",
                      cursor: 'pointer',
                      userSelect: 'none'
                    }}>
                      <Wrench size={22} /> Implementation Details
                    </summary>
                    <ul style={{
                      color: '#e0f7ff',
                      fontSize: '1rem',
                      listStyleType: 'none',
                      padding: 0,
                      margin: '1rem 0 0 0'
                    }}>
                      {skill.howUsed.map((use, idx) => (
                        <li key={idx} style={{
                          marginBottom: '0.75rem',
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '0.75rem',
                          padding: '0.5rem',
                          borderRadius: '8px',
                          transition: 'all 0.3s'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = `${rarityColor}15`;
                          e.currentTarget.style.transform = 'translateX(10px)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'transparent';
                          e.currentTarget.style.transform = 'translateX(0)';
                        }}>
                          <GitBranch size={18} style={{ color: rarityColor, minWidth: '18px', marginTop: '2px' }} />
                          {use}
                        </li>
                      ))}
                    </ul>
                  </details>
                </div>
              );
            })}
          </div>

          {/* Epic Stats Dashboard */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(0,0,0,0.9), rgba(20,20,40,0.9))',
            border: '3px solid rgba(0, 255, 255, 0.3)',
            borderRadius: '30px',
            padding: '2rem 1rem',
            position: 'relative',
            overflow: 'hidden',
            marginBottom: '4rem',
            maxWidth: '100%',
            boxSizing: 'border-box'
          }}>
            {/* Animated Top Border */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '6px',
              background: 'linear-gradient(90deg, #00ffff, #8a2be2, #ff00ff, #00ffff)',
              backgroundSize: '200% 100%',
              animation: 'shimmer 3s linear infinite'
            }} />

            <h2 style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 900,
              color: '#00ffff',
              textAlign: 'center',
              marginBottom: '3rem',
              fontFamily: "'Orbitron', sans-serif",
              textTransform: 'uppercase',
              letterSpacing: '3px',
              textShadow: '0 0 30px #00ffff'
            }}>
              🏆 ACHIEVEMENTS UNLOCKED
            </h2>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))',
              gap: '2rem'
            }}>
              {[
                { label: 'Years of Excellence', value: '0+', icon: Cpu, color: '#00ffff', desc: 'Professional Experience' },
                { label: 'Production Projects', value: '6+', icon: Layers, color: '#8a2be2', desc: 'Live Applications' },
                { label: 'Tech Mastery', value: '38+', icon: Globe, color: '#00ffff', desc: 'Technologies & Tools' },
                { label: 'Certifications', value: '15+', icon: Award, color: '#ffd700', desc: 'Industry Recognized' },
                { label: 'Problems Solved', value: '300+', icon: Target, color: '#ff00ff', desc: 'LeetCode & HackerRank' },
                { label: 'Success Rate', value: '96%', icon: TrendingUp, color: '#00ff88', desc: 'Project Completion' }
              ].map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={i}
                    className="stat-card"
                    style={{
                      borderColor: stat.color,
                      animation: `slideUp ${1 + i * 0.15}s ease-out`,
                      opacity: 0,
                      animationFillMode: 'forwards',
                      animationDelay: `${i * 0.1}s`
                    }}
                  >
                    <div style={{
                      width: '80px',
                      height: '80px',
                      margin: '0 auto 1.5rem',
                      border: `3px solid ${stat.color}`,
                      borderRadius: '16px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      animation: 'float 3s ease-in-out infinite',
                      animationDelay: `${i * 0.3}s`,
                      boxShadow: `0 0 30px ${stat.color}50`,
                      background: `linear-gradient(135deg, ${stat.color}10, transparent)`
                    }}>
                      <Icon size={36} style={{ color: stat.color }} />
                    </div>
                    <div style={{
                      fontSize: '3.5rem',
                      fontWeight: 900,
                      color: stat.color,
                      marginBottom: '0.5rem',
                      fontFamily: "'Orbitron', sans-serif",
                      textShadow: `0 0 30px ${stat.color}`,
                      textAlign: 'center'
                    }}>
                      {stat.value}
                    </div>
                    <div style={{
                      fontSize: '1.1rem',
                      color: '#ffffff',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '1px',
                      marginBottom: '0.5rem',
                      textAlign: 'center',
                      fontFamily: "'Rajdhani', sans-serif"
                    }}>
                      {stat.label}
                    </div>
                    <div style={{
                      fontSize: '0.95rem',
                      color: '#b0b0d8',
                      textAlign: 'center',
                      fontFamily: "'Rajdhani', sans-serif"
                    }}>
                      {stat.desc}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Final CTA */}
          <div style={{
            textAlign: 'center',
            padding: '3rem 1.5rem',
            background: 'linear-gradient(135deg, rgba(0,255,255,0.1), rgba(138,43,226,0.1))',
            borderRadius: '30px',
            border: '2px solid rgba(0,255,255,0.3)',
            position: 'relative',
            overflow: 'hidden',
            maxWidth: '100%',
            boxSizing: 'border-box'
          }}>
            <div style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 900,
              color: '#00ffff',
              marginBottom: '1.5rem',
              fontFamily: "'Orbitron', sans-serif",
              textShadow: '0 0 30px #00ffff'
            }}>
              READY TO BUILD SOMETHING EXTRAORDINARY?
            </div>
            <p style={{
              fontSize: '1.3rem',
              color: '#c0c0ff',
              marginBottom: '2.5rem',
              fontFamily: "'Rajdhani', sans-serif",
              maxWidth: '800px',
              margin: '0 auto 2.5rem'
            }}>
              Let's leverage these elite skills to create cutting-edge solutions that push the boundaries of technology.
            </p>
            <div style={{
              display: 'flex',
              gap: '1.5rem',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              <button className="filter-btn" style={{
                borderColor: '#00ffff',
                color: '#00ffff',
                fontSize: '1.1rem',
                padding: '1rem 2.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem'
              }}>
                <Rocket size={24} />
                VIEW PROJECTS
              </button>
              <button className="filter-btn" style={{
                borderColor: '#8a2be2',
                color: '#8a2be2',
                fontSize: '1.1rem',
                padding: '1rem 2.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem'
              }}>
                <Terminal size={24} />
                CONTACT ME
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}