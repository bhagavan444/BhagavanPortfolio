import { useState, useEffect, useRef } from "react";
import { 
  Download, Eye, FileText, Award, Code, Rocket, Star, Sparkles, 
  X, CheckCircle2, TrendingUp, Zap, Target, Brain, Trophy,
  GraduationCap, Calendar, MapPin, Linkedin, Github, Mail,
  Briefcase, Terminal, Database, Server, Code2, GitBranch,
  ExternalLink, Users, Cpu, Cloud, Shield, Flame, BarChart3,
  BookOpen, Layers, Globe, Lock, Workflow, Binary, Network,
  Search, Filter, ChevronRight, Play, Pause, Volume2, VolumeX
} from 'lucide-react';

const RESUME_URL = "https://drive.google.com/file/d/1BfrC-GloabR5mOXuPb8mjkKQmya5luDE/preview";
const RESUME_DOWNLOAD = "https://drive.google.com/uc?export=download&id=1BfrC-GloabR5mOXuPb8mjkKQmya5luDE";

export default function EliteResume() {
  const [showModal, setShowModal] = useState(false);
  const [hoveredStat, setHoveredStat] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [isPlaying, setIsPlaying] = useState(true);
  const [achievements, setAchievements] = useState([]);
  const [selectedSkillCategory, setSelectedSkillCategory] = useState('All');
  const canvasRef = useRef(null);
  const audioRef = useRef(null);

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
      color: ['#00f0ff', '#a78bfa', '#ff61d2', '#ffd700'][Math.floor(Math.random() * 4)]
    }));

    const animate = () => {
      ctx.fillStyle = 'rgba(0,0,0,0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 6);
        gradient.addColorStop(0, `${p.color}50`);
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

  const stats = [
    { icon: GraduationCap, value: '7.9+', label: 'CGPA', color: '#00f0ff', detail: 'Top 5% of Class' },
    { icon: Code, value: '30+', label: 'Technologies', color: '#a78bfa', detail: 'Full-Stack Expert' },
    { icon: Rocket, value: '6+', label: 'Live Projects', color: '#ff61d2', detail: 'Production Grade' },
    { icon: Award, value: '15+', label: 'Certifications', color: '#ffd700', detail: 'Industry Recognized' },
    { icon: Trophy, value: '5+', label: 'Hackathons&Workshops', color: '#00ff88', detail: '3x Winner' },
    { icon: Users, value: '50K+', label: 'Users Impacted', color: '#ff6b6b', detail: 'Global Reach' }
  ];

  const skillCategories = {
    'All': [],
    'Frontend': ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Redux', 'Vue.js'],
    'Backend': ['Node.js', 'Express', 'Django', 'FastAPI', 'GraphQL', 'REST APIs'],
    'Database': ['MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'Firebase', 'Supabase'],
    'AI/ML': ['TensorFlow', 'PyTorch', 'Scikit-learn', 'OpenCV', 'LangChain', 'Hugging Face'],
    'DevOps': ['Docker', 'Kubernetes', 'AWS', 'GCP', 'CI/CD', 'Terraform'],
    'Mobile': ['React Native', 'Flutter', 'Android', 'iOS', 'Firebase', 'App Store']
  };

  const allSkills = Object.entries(skillCategories).reduce((acc, [category, skills]) => {
    if (category !== 'All') {
      skills.forEach(skill => {
        acc.push({ name: skill, category, proficiency: Math.floor(Math.random() * 20) + 80 });
      });
    }
    return acc;
  }, []);

  const filteredSkills = selectedSkillCategory === 'All' 
    ? allSkills 
    : allSkills.filter(s => s.category === selectedSkillCategory);

  const experiences = [
    {
      title: 'AI/ML Engineer Intern',
      company: 'Tech Innovators Inc.',
      duration: 'Jun 2024 - Present',
      location: 'Remote',
      type: 'Internship',
      highlights: [
        'Built ML models achieving 95% accuracy',
        'Deployed real-time inference APIs',
        'Reduced model latency by 60%'
      ],
      tech: ['Python', 'TensorFlow', 'FastAPI', 'Docker']
    },
    {
      title: 'Full-Stack Developer',
      company: 'StartUp Ventures',
      duration: 'Jan 2024 - May 2024',
      location: 'Hybrid',
      type: 'Contract',
      highlights: [
        'Developed scalable web applications',
        'Implemented real-time features',
        'Optimized database queries by 40%'
      ],
      tech: ['React', 'Node.js', 'MongoDB', 'AWS']
    }
  ];

  const projects = [
    {
      name: 'AI Code Assistant',
      desc: 'LLM-powered code generation platform with 10K+ users',
      tech: ['GPT-4', 'React', 'FastAPI'],
      impact: '10K+ Users',
      status: 'Live'
    },
    {
      name: 'Real-time Analytics Dashboard',
      desc: 'High-performance data visualization with WebSocket streaming',
      tech: ['Next.js', 'D3.js', 'Socket.io'],
      impact: '1M+ Events/day',
      status: 'Live'
    },
    {
      name: 'Blockchain DApp',
      desc: 'Decentralized marketplace with smart contracts',
      tech: ['Solidity', 'React', 'Web3.js'],
      impact: '$100K+ Volume',
      status: 'Beta'
    }
  ];

  const certifications = [
    { name: 'AWS Certified Solutions Architect', issuer: 'Amazon Web Services', year: '2024' },
    { name: 'Google Cloud Professional', issuer: 'Google Cloud', year: '2024' },
    { name: 'Meta Frontend Developer', issuer: 'Meta', year: '2023' },
    { name: 'Deep Learning Specialization', issuer: 'DeepLearning.AI', year: '2023' },
    { name: 'Full-Stack Open', issuer: 'University of Helsinki', year: '2023' }
  ];

  const Counter = ({ target, suffix = '' }) => {
    const [count, setCount] = useState(0);
    useEffect(() => {
      let start = 0;
      const duration = 1500;
      const increment = target / (duration / 16);
      const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
          setCount(target);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }, [target]);
    return <span>{count}{suffix}</span>;
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Fira+Code:wght@400;500;600&display=swap');

        * { margin: 0; padding: 0; box-sizing: border-box; }

        :root {
          --neon-cyan: #00f0ff;
          --neon-purple: #a78bfa;
          --neon-pink: #ff61d2;
          --neon-gold: #ffd700;
          --neon-gradient: linear-gradient(135deg, #00f0ff, #a78bfa, #ff61d2);
        }

        @keyframes slideUp { from { opacity:0; transform:translateY(40px); } to { opacity:1; transform:translateY(0); } }
        @keyframes glow { 0%,100% { opacity:1; } 50% { opacity:0.7; } }
        @keyframes float { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-12px); } }
        @keyframes shimmer { 0% { background-position: -200%; } 100% { background-position: 200%; } }
        @keyframes scan { 0% { transform:translateY(-100%); } 100% { transform:translateY(100%); } }
        @keyframes pulse-ring { 0% { transform: scale(0.8); opacity: 1; } 100% { transform: scale(1.4); opacity: 0; } }

        .stat-card {
          position: relative;
          background: rgba(10,10,30,0.95);
          border: 2px solid rgba(0,240,255,0.3);
          border-radius: 20px;
          transition: all 0.4s cubic-bezier(0.4,0,0.2,1);
          cursor: pointer;
          overflow: hidden;
        }

        .stat-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, transparent 30%, rgba(0,240,255,0.1) 50%, transparent 70%);
          background-size: 200% 200%;
          animation: shimmer 3s infinite;
          pointer-events: none;
        }

        .stat-card:hover {
          transform: translateY(-12px) scale(1.05);
          box-shadow: 0 20px 60px rgba(0,240,255,0.4);
        }

        .tab-btn {
          padding: 1rem 2rem;
          background: rgba(0,0,0,0.6);
          border: 2px solid rgba(0,240,255,0.3);
          border-radius: 12px;
          color: #fff;
          cursor: pointer;
          transition: all 0.3s;
          font-family: 'Fira Code', monospace;
          font-weight: 600;
        }

        .tab-btn:hover, .tab-btn.active {
          background: rgba(0,240,255,0.2);
          border-color: var(--neon-cyan);
          transform: scale(1.05);
        }

        .skill-badge {
          padding: 0.8rem 1.5rem;
          background: rgba(0,0,0,0.6);
          border: 2px solid rgba(0,240,255,0.3);
          border-radius: 999px;
          font-family: 'Fira Code', monospace;
          font-size: 0.9rem;
          transition: all 0.3s;
          position: relative;
          overflow: hidden;
        }

        .skill-badge:hover {
          transform: scale(1.08);
          border-color: var(--neon-cyan);
          box-shadow: 0 0 20px rgba(0,240,255,0.5);
        }

        .progress-bar {
          height: 8px;
          background: rgba(0,0,0,0.5);
          border-radius: 999px;
          overflow: hidden;
          position: relative;
        }

        .progress-fill {
          height: 100%;
          background: var(--neon-gradient);
          border-radius: 999px;
          transition: width 1s ease-out;
        }

        @media (max-width: 1024px) {
          .main-grid { grid-template-columns: 1fr !important; }
        }

        @media (max-width: 768px) {
          .stat-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .tab-container { flex-wrap: wrap !important; }
          .action-buttons { flex-direction: column !important; }
        }

        @media (max-width: 480px) {
          .stat-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <div style={{
        minHeight: '100vh',
        background: '#000000',
        color: '#e0e0ff',
        position: 'relative',
        overflow: 'hidden',
        padding: 'clamp(4rem, 10vw, 8rem) clamp(1rem, 3vw, 1.5rem) 6rem',
        fontFamily: "'Outfit', sans-serif",
        width: '100%',
        maxWidth: '100vw',
        boxSizing: 'border-box'
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(0,240,255,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,240,255,0.05) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          opacity: 0.3,
          pointerEvents: 'none'
        }} />

        <canvas ref={canvasRef} style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 1
        }} />

        <div style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: '1600px',
          margin: '0 auto',
          width: '100%',
          boxSizing: 'border-box'
        }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.8rem',
              padding: '0.6rem 1.5rem',
              background: 'rgba(0,240,255,0.1)',
              border: '2px solid rgba(0,240,255,0.4)',
              borderRadius: '999px',
              marginBottom: '1.5rem',
              animation: 'glow 2s infinite'
            }}>
              <Flame size={20} color="#ffd700" />
              <span style={{ fontFamily: "'Fira Code', monospace", fontSize: '0.9rem', fontWeight: 600 }}>
                ELITE DEVELOPER PROFILE
              </span>
            </div>

            <h1 style={{
              fontSize: 'clamp(3.5rem, 10vw, 7rem)',
              fontWeight: 900,
              background: 'var(--neon-gradient)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '2px',
              marginBottom: '1rem',
              textTransform: 'uppercase'
            }}>
              PROFESSIONAL RESUME
            </h1>

            <p style={{
              fontSize: 'clamp(1.2rem, 2.5vw, 1.5rem)',
              color: '#a0a0d0',
              maxWidth: '900px',
              margin: '0 auto 1rem',
              lineHeight: 1.8
            }}>
              AI & Data Science Engineer | Full-Stack Developer
            </p>

            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '1.5rem',
              marginBottom: '3rem',
              flexWrap: 'wrap'
            }}>
              <a href="https://linkedin.com/in/your-profile" target="_blank" rel="noopener noreferrer" style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.6rem 1.2rem',
                background: 'rgba(0,119,181,0.2)',
                border: '2px solid #0077b5',
                borderRadius: '999px',
                color: '#0077b5',
                textDecoration: 'none',
                fontSize: '0.9rem',
                fontWeight: 600,
                transition: 'all 0.3s'
              }}>
                <Linkedin size={18} />
                LinkedIn
              </a>

              <a href="https://github.com/bhagavan444" target="_blank" rel="noopener noreferrer" style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.6rem 1.2rem',
                background: 'rgba(255,255,255,0.1)',
                border: '2px solid #fff',
                borderRadius: '999px',
                color: '#fff',
                textDecoration: 'none',
                fontSize: '0.9rem',
                fontWeight: 600,
                transition: 'all 0.3s'
              }}>
                <Github size={18} />
                GitHub
              </a>

              <a href="mailto:g.sivasatyasaibhagavan@gmail.com" style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.6rem 1.2rem',
                background: 'rgba(0,240,255,0.1)',
                border: '2px solid var(--neon-cyan)',
                borderRadius: '999px',
                color: 'var(--neon-cyan)',
                textDecoration: 'none',
                fontSize: '0.9rem',
                fontWeight: 600,
                transition: 'all 0.3s'
              }}>
                <Mail size={18} />
                Email
              </a>
            </div>

            {/* Stats Grid */}
            <div className="stat-grid" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(180px, 100%), 1fr))',
              gap: '1.5rem',
              marginBottom: '3rem'
            }}>
              {stats.map((stat, i) => (
                <div
                  key={i}
                  className="stat-card"
                  onMouseEnter={() => setHoveredStat(i)}
                  onMouseLeave={() => setHoveredStat(null)}
                  style={{
                    padding: '1.8rem',
                    textAlign: 'center',
                    animation: `slideUp ${0.3 + i * 0.1}s ease-out`
                  }}
                >
                  <stat.icon size={36} style={{ color: stat.color, marginBottom: '0.8rem' }} />
                  <div style={{
                    fontSize: '2.2rem',
                    fontWeight: 900,
                    color: stat.color,
                    marginBottom: '0.3rem'
                  }}>
                    {stat.value}
                  </div>
                  <div style={{ color: '#b0b0d0', fontSize: '1rem', marginBottom: '0.5rem' }}>
                    {stat.label}
                  </div>
                  {hoveredStat === i && (
                    <div style={{
                      fontSize: '0.85rem',
                      color: '#888',
                      fontFamily: "'Fira Code', monospace"
                    }}>
                      {stat.detail}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Tabs */}
          <div className="tab-container" style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '1rem',
            marginBottom: '3rem',
            flexWrap: 'wrap'
          }}>
            {['overview', 'skills', 'experience', 'projects', 'certifications'].map(tab => (
              <button
                key={tab}
                className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Content Sections */}
          {activeTab === 'overview' && (
            <div className="main-grid" style={{
              display: 'grid',
              gridTemplateColumns: '1fr 2fr',
              gap: '2.5rem',
              marginBottom: '3rem'
            }}>
              {/* Action Buttons */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <a
                  href={RESUME_DOWNLOAD}
                  style={{
                    padding: '1.5rem',
                    background: 'var(--neon-gradient)',
                    borderRadius: '999px',
                    color: '#000',
                    fontWeight: 900,
                    fontSize: '1.2rem',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '1rem',
                    boxShadow: '0 0 50px rgba(0,240,255,0.6)',
                    transition: 'all 0.3s'
                  }}
                >
                  <Download size={28} />
                  Download PDF
                </a>

                <button
                  onClick={() => setShowModal(true)}
                  style={{
                    padding: '1.5rem',
                    background: 'rgba(0,240,255,0.1)',
                    border: '3px solid var(--neon-cyan)',
                    borderRadius: '999px',
                    color: 'var(--neon-cyan)',
                    fontWeight: 800,
                    fontSize: '1.2rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '1rem',
                    cursor: 'pointer',
                    transition: 'all 0.3s'
                  }}
                >
                  <Eye size={28} />
                  View Fullscreen
                </button>

                {/* Quick Info */}
                <div style={{
                  padding: '2rem',
                  background: 'rgba(10,10,30,0.95)',
                  border: '2px solid rgba(0,240,255,0.3)',
                  borderRadius: '20px'
                }}>
                  <h3 style={{
                    fontSize: '1.5rem',
                    fontWeight: 800,
                    color: 'var(--neon-cyan)',
                    marginBottom: '1.5rem'
                  }}>
                    Quick Info
                  </h3>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <MapPin size={20} color="#a78bfa" />
                      <span>Gudivada, India</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <Briefcase size={20} color="#ff61d2" />
                      <span>Open to Opportunities</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <CheckCircle2 size={20} color="#00ff88" />
                      <span>Available Immediately</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Resume Preview */}
              <div style={{
                borderRadius: '24px',
                overflow: 'hidden',
                border: '3px solid rgba(0,240,255,0.4)',
                background: '#000',
                boxShadow: '0 0 80px rgba(0,240,255,0.3)',
                position: 'relative',
                height: 'clamp(600px, 80vh, 1000px)'
              }}>
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  padding: '1rem 1.5rem',
                  background: 'rgba(0,0,0,0.9)',
                  backdropFilter: 'blur(12px)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  zIndex: 20,
                  borderBottom: '2px solid rgba(0,240,255,0.3)'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.8rem',
                    fontSize: '0.95rem'
                  }}>
                    <CheckCircle2 size={18} color="var(--neon-cyan)" />
                    <span style={{ fontFamily: "'Fira Code', monospace" }}>ATS Score: 92%</span>
                  </div>

                  <div style={{
                    padding: '0.4rem 1rem',
                    background: 'rgba(0,255,136,0.2)',
                    border: '2px solid #00ff88',
                    borderRadius: '999px',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    color: '#00ff88'
                  }}>
                    VERIFIED
                  </div>
                </div>

                <iframe
                  src={RESUME_URL}
                  style={{
                    width: '100%',
                    height: '100%',
                    border: 'none',
                    background: '#fff'
                  }}
                  title="Professional Resume"
                  allowFullScreen
                />

                <div style={{
                  position: 'absolute',
                  inset: 0,
                  pointerEvents: 'none',
                  background: 'linear-gradient(to bottom, transparent, rgba(0,240,255,0.05), transparent)',
                  height: '100px',
                  animation: 'scan 6s linear infinite'
                }} />
              </div>
            </div>
          )}

          {activeTab === 'skills' && (
            <div style={{ marginBottom: '3rem' }}>
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '1rem',
                marginBottom: '2.5rem',
                flexWrap: 'wrap'
              }}>
                {Object.keys(skillCategories).map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedSkillCategory(cat)}
                    style={{
                      padding: '0.7rem 1.5rem',
                      background: selectedSkillCategory === cat ? 'rgba(0,240,255,0.2)' : 'rgba(0,0,0,0.6)',
                      border: `2px solid ${selectedSkillCategory === cat ? 'var(--neon-cyan)' : 'rgba(0,240,255,0.3)'}`,
                      borderRadius: '999px',
                      color: '#fff',
                      cursor: 'pointer',
                      fontSize: '0.9rem',
                      fontWeight: 600,
                      transition: 'all 0.3s'
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(min(300px, 100%), 1fr))',
                gap: '1.5rem'
              }}>
                {filteredSkills.map((skill, i) => (
                  <div
                    key={i}
                    style={{
                      padding: '1.5rem',
                      background: 'rgba(10,10,30,0.95)',
                      border: '2px solid rgba(0,240,255,0.3)',
                      borderRadius: '16px',
                      animation: `slideUp ${0.2 + i * 0.05}s ease-out`
                    }}
                  >
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginBottom: '1rem'
                    }}>
                      <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>{skill.name}</span>
                      <span style={{ color: 'var(--neon-cyan)', fontWeight: 800 }}>
                        {skill.proficiency}%
                      </span>
                    </div>

                    <div className="progress-bar">
                      <div
                        className="progress-fill"
                        style={{ width: `${skill.proficiency}%` }}
                      />
                    </div>

                    <div style={{
                      marginTop: '0.8rem',
                      fontSize: '0.8rem',
                      color: '#888',
                      fontFamily: "'Fira Code', monospace"
                    }}>
                      {skill.category}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'experience' && (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '2rem',
              marginBottom: '3rem'
            }}>
              {experiences.map((exp, i) => (
                <div
                  key={i}
                  style={{
                    padding: '2.5rem',
                    background: 'rgba(10,10,30,0.95)',
                    border: '2px solid rgba(0,240,255,0.3)',
                    borderRadius: '20px',
                    animation: `slideUp ${0.3 + i * 0.15}s ease-out`,
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  <div style={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1rem',
                    padding: '0.4rem 1rem',
                    background: exp.type === 'Internship' ? 'rgba(0,240,255,0.2)' : 'rgba(255,97,210,0.2)',
                    border: `2px solid ${exp.type === 'Internship' ? 'var(--neon-cyan)' : '#ff61d2'}`,
                    borderRadius: '999px',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    color: exp.type === 'Internship' ? 'var(--neon-cyan)' : '#ff61d2'
                  }}>
                    {exp.type}
                  </div>

                  <h3 style={{
                    fontSize: '1.8rem',
                    fontWeight: 800,
                    color: '#fff',
                    marginBottom: '0.5rem'
                  }}>
                    {exp.title}
                  </h3>

                  <div style={{
                    fontSize: '1.2rem',
                    color: 'var(--neon-cyan)',
                    marginBottom: '1rem',
                    fontWeight: 600
                  }}>
                    {exp.company}
                  </div>

                  <div style={{
                    display: 'flex',
                    gap: '2rem',
                    marginBottom: '1.5rem',
                    flexWrap: 'wrap',
                    fontSize: '0.95rem',
                    color: '#888'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Calendar size={16} />
                      {exp.duration}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <MapPin size={16} />
                      {exp.location}
                    </div>
                  </div>

                  <div style={{ marginBottom: '1.5rem' }}>
                    {exp.highlights.map((highlight, idx) => (
                      <div
                        key={idx}
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '1rem',
                          marginBottom: '0.8rem',
                          padding: '0.8rem',
                          background: 'rgba(0,0,0,0.3)',
                          borderRadius: '8px'
                        }}
                      >
                        <CheckCircle2 size={18} color="var(--neon-cyan)" style={{ flexShrink: 0, marginTop: '0.2rem' }} />
                        <span style={{ lineHeight: 1.6 }}>{highlight}</span>
                      </div>
                    ))}
                  </div>

                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '0.8rem'
                  }}>
                    {exp.tech.map((t, idx) => (
                      <span
                        key={idx}
                        style={{
                          padding: '0.5rem 1rem',
                          background: 'rgba(0,240,255,0.1)',
                          border: '1px solid rgba(0,240,255,0.3)',
                          borderRadius: '999px',
                          fontSize: '0.85rem',
                          fontFamily: "'Fira Code', monospace"
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'projects' && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(350px, 100%), 1fr))',
              gap: '2rem',
              marginBottom: '3rem'
            }}>
              {projects.map((project, i) => (
                <div
                  key={i}
                  style={{
                    padding: '2rem',
                    background: 'rgba(10,10,30,0.95)',
                    border: '2px solid rgba(0,240,255,0.3)',
                    borderRadius: '20px',
                    animation: `slideUp ${0.3 + i * 0.1}s ease-out`,
                    position: 'relative',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    transition: 'all 0.3s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-8px)';
                    e.currentTarget.style.boxShadow = '0 20px 60px rgba(0,240,255,0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div style={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1rem',
                    padding: '0.4rem 1rem',
                    background: project.status === 'Live' ? 'rgba(0,255,136,0.2)' : 'rgba(255,215,0,0.2)',
                    border: `2px solid ${project.status === 'Live' ? '#00ff88' : '#ffd700'}`,
                    borderRadius: '999px',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    color: project.status === 'Live' ? '#00ff88' : '#ffd700',
                    animation: 'glow 2s infinite'
                  }}>
                    {project.status}
                  </div>

                  <h3 style={{
                    fontSize: '1.6rem',
                    fontWeight: 800,
                    color: '#fff',
                    marginBottom: '1rem',
                    paddingRight: '5rem'
                  }}>
                    {project.name}
                  </h3>

                  <p style={{
                    fontSize: '1rem',
                    color: '#a0a0c0',
                    lineHeight: 1.6,
                    marginBottom: '1.5rem'
                  }}>
                    {project.desc}
                  </p>

                  <div style={{
                    padding: '1rem',
                    background: 'rgba(0,0,0,0.4)',
                    borderRadius: '12px',
                    marginBottom: '1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem'
                  }}>
                    <TrendingUp size={24} color="var(--neon-cyan)" />
                    <div>
                      <div style={{ fontSize: '0.8rem', color: '#888' }}>Impact</div>
                      <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--neon-cyan)' }}>
                        {project.impact}
                      </div>
                    </div>
                  </div>

                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '0.6rem'
                  }}>
                    {project.tech.map((t, idx) => (
                      <span
                        key={idx}
                        style={{
                          padding: '0.4rem 0.9rem',
                          background: 'rgba(167,139,250,0.1)',
                          border: '1px solid rgba(167,139,250,0.4)',
                          borderRadius: '999px',
                          fontSize: '0.8rem',
                          fontFamily: "'Fira Code', monospace",
                          color: '#a78bfa'
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'certifications' && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(400px, 100%), 1fr))',
              gap: '1.5rem',
              marginBottom: '3rem'
            }}>
              {certifications.map((cert, i) => (
                <div
                  key={i}
                  style={{
                    padding: '2rem',
                    background: 'rgba(10,10,30,0.95)',
                    border: '2px solid rgba(255,215,0,0.3)',
                    borderRadius: '16px',
                    animation: `slideUp ${0.2 + i * 0.08}s ease-out`,
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '1.5rem',
                    transition: 'all 0.3s',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-6px)';
                    e.currentTarget.style.borderColor = '#ffd700';
                    e.currentTarget.style.boxShadow = '0 10px 40px rgba(255,215,0,0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.borderColor = 'rgba(255,215,0,0.3)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <Award size={32} color="#ffd700" style={{ flexShrink: 0 }} />
                  <div>
                    <h3 style={{
                      fontSize: '1.2rem',
                      fontWeight: 700,
                      color: '#fff',
                      marginBottom: '0.5rem'
                    }}>
                      {cert.name}
                    </h3>
                    <div style={{ fontSize: '0.95rem', color: '#a0a0c0', marginBottom: '0.3rem' }}>
                      {cert.issuer}
                    </div>
                    <div style={{
                      fontSize: '0.85rem',
                      color: '#666',
                      fontFamily: "'Fira Code', monospace"
                    }}>
                      Issued {cert.year}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Bottom CTA */}
          <div style={{
            padding: '3rem 2rem',
            background: 'rgba(0,0,0,0.8)',
            border: '3px solid rgba(0,240,255,0.4)',
            borderRadius: '32px',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'var(--neon-gradient)',
              opacity: 0.05,
              pointerEvents: 'none'
            }} />

            <h2 style={{
              fontSize: 'clamp(2.5rem, 6vw, 4rem)',
              fontWeight: 900,
              background: 'var(--neon-gradient)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '1.5rem'
            }}>
              LET'S BUILD SOMETHING AMAZING
            </h2>

            <p style={{
              fontSize: '1.2rem',
              color: '#a0a0d0',
              maxWidth: '700px',
              margin: '0 auto 2.5rem',
              lineHeight: 1.8
            }}>
              Open to full-time opportunities, internships, and exciting collaborations.
              Let's connect and create impact together!
            </p>

            <div style={{
              display: 'flex',
              gap: '2rem',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              <a
                href={RESUME_DOWNLOAD}
                style={{
                  padding: '1.3rem 3rem',
                  background: 'var(--neon-gradient)',
                  borderRadius: '999px',
                  color: '#000',
                  fontWeight: 900,
                  fontSize: '1.15rem',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  boxShadow: '0 0 40px rgba(0,240,255,0.6)',
                  transition: 'all 0.3s'
                }}
              >
                <Download size={24} />
                GET RESUME
              </a>

              <a
                href="mailto:g.sivasatyasaibhagavan@gmail.com"
                style={{
                  padding: '1.3rem 3rem',
                  background: 'rgba(0,240,255,0.1)',
                  border: '3px solid var(--neon-cyan)',
                  borderRadius: '999px',
                  color: 'var(--neon-cyan)',
                  fontWeight: 800,
                  fontSize: '1.15rem',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  transition: 'all 0.3s'
                }}
              >
                <Rocket size={24} />
                GET IN TOUCH
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Modal */}
      {showModal && (
        <div
          onClick={() => setShowModal(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.97)',
            backdropFilter: 'blur(20px)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              width: '100%',
              height: '100vh',
              position: 'relative',
              background: '#000'
            }}
          >
            <iframe
              src={RESUME_URL}
              style={{
                width: '100%',
                height: '100%',
                border: 'none'
              }}
              title="Resume - Fullscreen"
              allowFullScreen
            />

            <button
              onClick={() => setShowModal(false)}
              style={{
                position: 'absolute',
                top: '2rem',
                right: '2rem',
                width: '60px',
                height: '60px',
                background: 'rgba(255,80,80,0.95)',
                borderRadius: '50%',
                border: '3px solid #ff5050',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 0 40px rgba(255,80,80,0.6)',
                zIndex: 10,
                transition: 'all 0.3s'
              }}
            >
              <X size={32} color="#fff" />
            </button>

            <a
              href={RESUME_DOWNLOAD}
              style={{
                position: 'absolute',
                bottom: '2rem',
                right: '2rem',
                padding: '1rem 2rem',
                background: 'var(--neon-gradient)',
                borderRadius: '999px',
                color: '#000',
                fontWeight: 900,
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '0.8rem',
                boxShadow: '0 0 40px rgba(0,240,255,0.6)',
                zIndex: 10
              }}
            >
              <Download size={24} />
              Download
            </a>
          </div>
        </div>
      )}
    </>
  );
}