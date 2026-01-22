"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Code2, Database, Brain, Cloud, Layers, Zap, Cpu, Globe, Terminal,
  TrendingUp, Award, Star, ExternalLink, CheckCircle2, Rocket,
  GitBranch, Server, Lock, BarChart2, Settings, FileCode,
  Database as DbIcon, Network, Wrench, Sparkles
} from "lucide-react";

const skills = [
  {
    id: 1,
    name: "Full-Stack Development",
    icon: Layers,
    level: 92,
    color: "#00ffff",
    technologies: [
      "React", "Next.js", "Node.js", "Express", "MongoDB",
      "JWT", "OAuth 2.0", "REST APIs", "TypeScript", "Tailwind CSS"
    ],
    projects: 24,
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
    description:
      "Designed and developed end-to-end full-stack web applications with modern authentication, database integration, responsive UI, and production-ready architecture."
  },

  {
    id: 2,
    name: "Machine Learning",
    icon: Brain,
    level: 88,
    color: "#8a2be2",
    technologies: [
      "Scikit-learn", "Pandas", "NumPy", "Matplotlib", "Seaborn",
      "Jupyter Notebook", "TF-IDF", "Feature Engineering", "Hyperparameter Tuning"
    ],
    projects: 18,
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
    description:
      "Developed high-accuracy machine learning models for classification, regression, and prediction tasks using structured and unstructured data."
  },

  {
    id: 3,
    name: "Deep Learning & AI",
    icon: Star,
    level: 87,
    color: "#00ffff",
    technologies: [
      "TensorFlow", "Keras", "PyTorch", "CNN", "Computer Vision",
      "OpenCV", "Neural Networks", "Transfer Learning", "Image Augmentation"
    ],
    projects: 14,
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
    description:
      "Built powerful deep learning models for computer vision and intelligent automation with real-world deployment experience."
  },

  {
    id: 4,
    name: "Cloud & DevOps",
    icon: Cloud,
    level: 85,
    color: "#8a2be2",
    technologies: [
      "AWS EC2", "AWS S3", "AWS Lambda", "Docker", "GitHub Actions",
      "Linux Server Management", "Nginx", "CI/CD Basics"
    ],
    projects: 16,
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
    description:
      "Deployed and managed scalable, production-ready applications using cloud platforms and containerization tools."
  },

  {
    id: 5,
    name: "Data Science & Analytics",
    icon: Database,
    level: 90,
    color: "#00ffff",
    technologies: [
      "Pandas", "NumPy", "Matplotlib", "Seaborn", "Plotly",
      "SQL", "MySQL", "PostgreSQL", "Data Cleaning", "EDA"
    ],
    projects: 22,
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
    description:
      "Analyzed and processed complex datasets to extract meaningful insights and support advanced machine learning models."
  },

  {
    id: 6,
    name: "Core Programming & CS Fundamentals",
    icon: Code2,
    level: 94,
    color: "#8a2be2",
    technologies: [
      "Python", "Java", "JavaScript", "TypeScript", "C++",
      "Data Structures & Algorithms", "OOP", "System Design Basics"
    ],
    projects: 32,
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
    description:
      "Strong programming foundation with deep understanding of algorithms, data structures, OOP, and software design principles."
  }
];

export default function CyberpunkSkills() {
  const [activeSkill, setActiveSkill] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const canvasRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById('skills-section');
      if (section) {
        const rect = section.getBoundingClientRect();
        const progress = Math.max(0, Math.min(100, (1 - rect.top / window.innerHeight) * 100));
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      size: Math.random() * 2 + 1
    }));

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3);
        gradient.addColorStop(0, 'rgba(0, 255, 255, 0.3)');
        gradient.addColorStop(1, 'transparent');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
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

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Fira+Code:wght@400;500;600&display=swap');

        @keyframes slideIn {
          from { opacity: 0; transform: translateX(-40px); }
          to { opacity: 1; transform: translateX(0); }
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
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        @keyframes loadBar {
          from { width: 0; }
          to { width: 100%; }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        .skill-card {
          position: relative;
          background: rgba(0, 0, 0, 0.7);
          border: 2px solid rgba(0, 255, 255, 0.2);
          transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
          overflow: hidden;
          border-radius: 20px;
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        .skill-card:hover {
          transform: translateY(-10px);
          border-color: currentColor;
          box-shadow: 0 0 40px currentColor;
        }

        .skill-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 100%;
          background: linear-gradient(
            45deg,
            transparent 30%,
            rgba(0, 255, 255, 0.1) 50%,
            transparent 70%
          );
          animation: scan 4s linear infinite;
          pointer-events: none;
        }

        .tech-tag {
          background: rgba(0, 0, 0, 0.6);
          border: 1px solid currentColor;
          padding: 0.4rem 0.9rem;
          border-radius: 20px;
          font-family: 'Fira Code', monospace;
          font-size: 0.8rem;
          transition: all 0.3s;
        }

        .tech-tag:hover {
          transform: scale(1.1);
          box-shadow: 0 0 20px currentColor;
        }

        .neon-text {
          text-shadow: 
            0 0 10px currentColor,
            0 0 20px currentColor,
            0 0 40px currentColor;
        }

        .detail-section {
          background: rgba(0, 0, 0, 0.5);
          border: 1px solid rgba(0, 255, 255, 0.3);
          border-radius: 12px;
          padding: 1.2rem;
          margin: 1rem 0;
        }

        .detail-title {
          color: var(--neon-primary);
          font-size: 1.15rem;
          font-weight: 700;
          margin-bottom: 0.8rem;
          display: flex;
          align-items: center;
          gap: 0.7rem;
        }

        .grid-bg {
          background-image: 
            linear-gradient(rgba(0,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,255,255,0.1) 1px, transparent 1px);
          background-size: 40px 40px;
        }
      `}</style>

      <div id="skills-section" style={{
        minHeight: '100vh',
        background: '#000000',
        color: '#ffffff',
        position: 'relative',
        overflow: 'hidden',
        padding: '6rem 2rem',
        fontFamily: "'Outfit', sans-serif"
      }}>
        {/* Grid Background */}
        <div className="grid-bg" style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.2,
          pointerEvents: 'none'
        }} />

        {/* Canvas Background */}
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

        {/* Rotating Border */}
        <div style={{
          position: 'absolute',
          top: '10%',
          right: '5%',
          width: '500px',
          height: '500px',
          border: '2px solid rgba(0, 255, 255, 0.1)',
          borderRadius: '50%',
          animation: 'float 20s ease-in-out infinite',
          pointerEvents: 'none',
          zIndex: 0
        }} />

        <div style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: '1400px',
          margin: '0 auto'
        }}>
          {/* Header */}
          <div style={{
            textAlign: 'center',
            marginBottom: '5rem'
          }}>
            <div style={{
              display: 'inline-block',
              fontFamily: "'Fira Code', monospace",
              color: '#00ffff',
              fontSize: '1rem',
              marginBottom: '1rem',
              padding: '0.75rem 1.5rem',
              border: '2px solid rgba(0, 255, 255, 0.3)',
              borderRadius: '30px',
              animation: 'pulse 2s ease-in-out infinite'
            }}>
              {'>'} skills.initialize()
            </div>

            <h1 className="neon-text" style={{
              fontSize: 'clamp(3rem, 7vw, 5rem)',
              fontWeight: 900,
              marginBottom: '1.5rem',
              color: '#00ffff',
              textTransform: 'uppercase',
              letterSpacing: '3px',
              animation: 'slideIn 1s ease-out'
            }}>
              TECHNICAL ARSENAL
            </h1>

            <p style={{
              fontSize: 'clamp(1.1rem, 2vw, 1.3rem)',
              color: '#a0a0a0',
              maxWidth: '700px',
              margin: '0 auto',
              lineHeight: 1.8,
              fontFamily: "'Fira Code', monospace"
            }}>
              [Tools, technologies, and systems I use to build production-ready AI and full-stack solutions. ]
            </p>
          </div>

          {/* Skills Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))',
            gap: '2.5rem',
            marginBottom: '5rem'
          }}>
            {skills.map((skill, index) => {
              const Icon = skill.icon;
              const isActive = activeSkill === skill.id;

              return (
                <div
                  key={skill.id}
                  className="skill-card"
                  onMouseEnter={() => setActiveSkill(skill.id)}
                  onMouseLeave={() => setActiveSkill(null)}
                  style={{
                    padding: '2.2rem',
                    borderRadius: '20px',
                    color: skill.color,
                    animation: `slideIn ${0.8 + index * 0.1}s ease-out`,
                    opacity: 0,
                    animationFillMode: 'forwards',
                    boxShadow: isActive ? `0 0 40px ${skill.color}50` : 'none'
                  }}
                >
                  {/* Top Border */}
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '4px',
                    background: `linear-gradient(90deg, ${skill.color}, transparent)`,
                    opacity: isActive ? 1 : 0.5
                  }} />

                  {/* Header */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '1.8rem'
                  }}>
                    <div style={{
                      width: '70px',
                      height: '70px',
                      border: `2.5px solid ${skill.color}`,
                      borderRadius: '14px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      animation: isActive ? 'float 2s ease-in-out infinite' : 'none',
                      boxShadow: isActive ? `0 0 35px ${skill.color}` : 'none'
                    }}>
                      <Icon size={36} style={{ color: skill.color }} />
                    </div>

                    <div style={{
                      fontFamily: "'Fira Code', monospace",
                      fontSize: '3.5rem',
                      fontWeight: 900,
                      color: skill.color,
                      textShadow: isActive ? `0 0 25px ${skill.color}` : 'none'
                    }}>
                      {skill.level}
                      <span style={{ fontSize: '1.6rem' }}>%</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 style={{
                    fontSize: '1.8rem',
                    fontWeight: 900,
                    marginBottom: '1.2rem',
                    color: '#ffffff',
                    textTransform: 'uppercase',
                    letterSpacing: '1px'
                  }}>
                    {skill.name}
                  </h3>

                  {/* Description */}
                  <p style={{
                    fontSize: '1rem',
                    color: '#c0c0ff',
                    lineHeight: 1.7,
                    marginBottom: '1.8rem',
                    fontFamily: "'Fira Code', monospace"
                  }}>
                    {skill.description}
                  </p>

                  {/* Progress Bar */}
                  <div style={{ marginBottom: '2rem' }}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginBottom: '0.8rem',
                      fontFamily: "'Fira Code', monospace",
                      fontSize: '0.9rem'
                    }}>
                      <span style={{ color: '#888' }}>PROFICIENCY</span>
                      <span style={{ color: skill.color }}>[{skill.level}%]</span>
                    </div>
                    <div style={{
                      height: '10px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      borderRadius: '5px',
                      overflow: 'hidden',
                      border: '1px solid rgba(255, 255, 255, 0.1)'
                    }}>
                      <div style={{
                        height: '100%',
                        width: isActive ? `${skill.level}%` : '0%',
                        background: `linear-gradient(90deg, ${skill.color}, ${skill.color}aa)`,
                        transition: 'width 1.5s cubic-bezier(0.22, 1, 0.36, 1)',
                        boxShadow: `0 0 15px ${skill.color}`,
                        position: 'relative'
                      }}>
                        <div style={{
                          position: 'absolute',
                          top: 0,
                          right: 0,
                          width: '30px',
                          height: '100%',
                          background: 'rgba(255, 255, 255, 0.6)',
                          filter: 'blur(6px)'
                        }} />
                      </div>
                    </div>
                  </div>

                  {/* Technologies */}
                  <div className="detail-section">
                    <h4 style={{
                      color: skill.color,
                      fontSize: '1.15rem',
                      fontWeight: 700,
                      marginBottom: '1rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.7rem'
                    }}>
                      <Code2 size={20} /> Core Technologies
                    </h4>
                    <div style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '0.6rem'
                    }}>
                      {skill.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="tech-tag"
                          style={{
                            color: isActive ? skill.color : '#aaa',
                            borderColor: isActive ? skill.color : '#444'
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Projects Used In */}
                  <div className="detail-section">
                    <h4 style={{
                      color: skill.color,
                      fontSize: '1.15rem',
                      fontWeight: 700,
                      marginBottom: '1rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.7rem'
                    }}>
                      <Rocket size={20} /> Used In Projects
                    </h4>
                    <ul style={{
                      color: '#e0f7ff',
                      fontSize: '0.95rem',
                      listStyleType: 'none',
                      padding: 0,
                      margin: 0
                    }}>
                      {skill.usedIn.map((proj, idx) => (
                        <li key={idx} style={{
                          marginBottom: '0.6rem',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.7rem'
                        }}>
                          <CheckCircle2 size={16} style={{ color: skill.color }} />
                          {proj}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* How I Used It */}
                  <div className="detail-section">
                    <h4 style={{
                      color: skill.color,
                      fontSize: '1.15rem',
                      fontWeight: 700,
                      marginBottom: '1rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.7rem'
                    }}>
                      <Wrench size={20} /> How I Used It
                    </h4>
                    <ul style={{
                      color: '#e0f7ff',
                      fontSize: '0.95rem',
                      listStyleType: 'none',
                      padding: 0,
                      margin: 0
                    }}>
                      {skill.howUsed.map((use, idx) => (
                        <li key={idx} style={{
                          marginBottom: '0.6rem',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.7rem'
                        }}>
                          <GitBranch size={16} style={{ color: skill.color }} />
                          {use}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Projects Count */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.9rem',
                    padding: '1.2rem',
                    background: 'rgba(0, 0, 0, 0.5)',
                    border: `1px solid ${isActive ? skill.color : 'rgba(255, 255, 255, 0.1)'}`,
                    borderRadius: '12px',
                    fontFamily: "'Fira Code', monospace",
                    marginTop: 'auto'
                  }}>
                    <Terminal size={22} style={{ color: skill.color }} />
                    <span style={{
                      fontSize: '1rem',
                      fontWeight: 700,
                      color: '#ffffff'
                    }}>
                      {skill.projects} PROJECTS DEPLOYED
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Stats Bar */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '2rem',
            padding: '3.5rem 2rem',
            background: 'rgba(0, 0, 0, 0.7)',
            border: '2px solid rgba(0, 255, 255, 0.2)',
            borderRadius: '24px',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '4px',
              background: 'linear-gradient(90deg, #00ffff, #8a2be2, #00ffff)',
              animation: 'loadBar 2.5s ease-out'
            }} />

            {[
              { label: 'Experience', value: '4+', icon: Cpu, color: '#00ffff' },
              { label: 'Projects', value: '126+', icon: Layers, color: '#8a2be2' },
              { label: 'Technologies', value: '38+', icon: Globe, color: '#00ffff' },
              { label: 'Certifications', value: '15+', icon: Award, color: '#8a2be2' }
            ].map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div
                  key={i}
                  style={{
                    textAlign: 'center',
                    animation: `slideIn ${1 + i * 0.15}s ease-out`,
                    opacity: 0,
                    animationFillMode: 'forwards'
                  }}
                >
                  <div style={{
                    width: '70px',
                    height: '70px',
                    margin: '0 auto 1.2rem',
                    border: `2.5px solid ${stat.color}`,
                    borderRadius: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    animation: 'float 3s ease-in-out infinite',
                    animationDelay: `${i * 0.2}s`,
                    boxShadow: `0 0 25px ${stat.color}40`
                  }}>
                    <Icon size={32} style={{ color: stat.color }} />
                  </div>
                  <div style={{
                    fontSize: '2.8rem',
                    fontWeight: 900,
                    color: stat.color,
                    marginBottom: '0.6rem',
                    fontFamily: "'Fira Code', monospace",
                    textShadow: `0 0 25px ${stat.color}`
                  }}>
                    {stat.value}
                  </div>
                  <div style={{
                    fontSize: '1rem',
                    color: '#b0b0d8',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '1px'
                  }}>
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
} 