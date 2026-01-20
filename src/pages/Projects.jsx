import { useState, useEffect, useRef } from 'react';
import {
  ExternalLink, Code, Brain, Sparkles, Award, Zap, Eye, X, CheckCircle2,
  Terminal, Github, Rocket, Star, TrendingUp, Cpu, Layers, Globe, Mail
} from 'lucide-react';

const projects = [
  {
    id: 1,
    title: "ATS Resume Builder",
    github: "https://github.com/bhagavan444/Resumebuilderwebapp",
    live: null,
    desc: "Full-stack ATS-optimized resume builder with smart templates and real-time scoring",
    tags: ["React", "Node.js", "MongoDB", "JWT"],
    icon: "📄",
    img: "https://drive.google.com/thumbnail?id=1ngApn37ig05YDXxCbA5mppeva_opwcUs&sz=w1200",
    color: "#8B5CF6",
    featured: true,
    highlights: ["Real-time ATS Scoring", "Keyword Optimization", "Multiple Templates", "Dark/Light Mode"]
  },
  {
    id: 2,
    title: "AI Chatbot Platform",
    github: "https://github.com/bhagavan444/chatbotwebapp",
    live: "https://bhagavanai.lovable.app",
    desc: "Advanced AI chatbot with streaming responses and persistent memory",
    tags: ["AI", "React", "Flask", "Gemini"],
    icon: "🤖",
    img: "https://drive.google.com/thumbnail?id=10gvXlgHCb__NAWBoLEbj6LglL9dT6Kew&sz=w1200",
    color: "#06B6D4",
    featured: true,
    highlights: ["Streaming Responses", "Persistent Memory", "Code Highlighting", "File Upload"]
  },
  {
    id: 3,
    title: "AI Career Path System",
    github: "https://github.com/bhagavan444/carrer-path-web-",
    live: null,
    desc: "ML-powered career recommendation engine with personalized roadmaps",
    tags: ["ML", "Python", "Flask"],
    icon: "🎯",
    img: "https://drive.google.com/thumbnail?id=1pTnIysNCQgb3oHPOyofDKVkAe_acI2Bj&sz=w1200",
    color: "#F59E0B",
    highlights: ["AI Career Matching", "Skills Gap Analysis", "Learning Roadmap", "Market Insights"]
  },
  {
    id: 4,
    title: "Fake News Detector",
    github: "https://github.com/bhagavan444/News-detector",
    live: null,
    desc: "NLP-based fake news detection with 92%+ accuracy",
    tags: ["NLP", "TensorFlow", "LSTM"],
    icon: "📰",
    img: "https://drive.google.com/thumbnail?id=1i-qZCMDiOAy677h3y12es5xM_IL-_oOF&sz=w1200",
    color: "#10B981",
    highlights: ["92%+ Accuracy", "LSTM Networks", "Real-time Check", "Confidence Scoring"]
  },
  {
    id: 5,
    title: "AI Architecture Generator",
    github: null,
    live: "https://archmind-spark.lovable.app",
    desc: "Revolutionary AI tool generating complete system architectures from natural language",
    tags: ["AI", "System Design", "React"],
    icon: "🧠",
    img: "https://drive.google.com/thumbnail?id=15dAzqZOC60zlje-DevzjWLFH4lIf5L0E&sz=w1200",
    color: "#8B5CF6",
    featured: true,
    highlights: ["Auto Architecture", "Tech Stack Recommendations", "Database Schema", "Security Patterns"]
  },
  {
    id: 6,
    title: "NeuralLearn Platform",
    github: null,
    live: "https://neurallearn.lovable.app",
    desc: "AI-driven learning platform with adaptive difficulty and personalized paths",
    tags: ["AI", "EdTech", "React"],
    icon: "📚",
    img: "https://drive.google.com/thumbnail?id=1jxmO9h3FbnKDYAiN9mWXpfR--cN8YF2O&sz=w1200",
    color: "#EC4899",
    featured: true,
    highlights: ["Adaptive Learning", "Personalized Paths", "Smart Recommendations", "Progress Analytics"]
  }
];

export default function FuturisticPortfolio() {
  const [activeProject, setActiveProject] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollProgress, setScrollProgress] = useState(0);
  const [filter, setFilter] = useState("All");
  const containerRef = useRef(null);
  const particlesRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleScroll = () => {
      const winScroll = document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      setScrollProgress((winScroll / height) * 100);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Holographic Particle System
  useEffect(() => {
    const canvas = particlesRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();

    const particles = Array.from({ length: 80 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      radius: Math.random() * 2 + 1,
      color: projects[Math.floor(Math.random() * projects.length)].color,
      opacity: Math.random() * 0.5 + 0.2
    }));

    let animationId;
    const animate = () => {
      ctx.fillStyle = 'rgba(5, 0, 15, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${Math.floor(p.opacity * 255).toString(16).padStart(2, '0')}`;
        ctx.fill();

        particles.forEach((p2, j) => {
          if (i < j) {
            const dx = p.x - p2.x;
            const dy = p.y - p2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 150) {
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.strokeStyle = `${p.color}${Math.floor((1 - dist / 150) * 40).toString(16).padStart(2, '0')}`;
              ctx.lineWidth = 1;
              ctx.stroke();
            }
          }
        });
      });

      animationId = requestAnimationFrame(animate);
    };
    animate();

    window.addEventListener('resize', resizeCanvas);
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  const allTags = ["All", ...new Set(projects.flatMap(p => p.tags))];
  const filteredProjects = filter === "All" ? projects : projects.filter(p => p.tags.includes(filter));

  return (
    <div ref={containerRef} style={{
      minHeight: '100vh',
      background: 'linear-gradient(145deg, #05000f 0%, #0a0520 50%, #050012 100%)',
      color: '#fff',
      position: 'relative',
      overflow: 'hidden',
      fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif'
    }}>
      {/* Global Styles */}
      <style>{`
        @keyframes holographicShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes floatPulse {
          0%, 100% { transform: translateY(0) scale(1); opacity: 0.8; }
          50% { transform: translateY(-20px) scale(1.05); opacity: 1; }
        }
        @keyframes glowPulse {
          0%, 100% { filter: drop-shadow(0 0 20px currentColor); }
          50% { filter: drop-shadow(0 0 40px currentColor); }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes rotate3D {
          from { transform: rotateY(0deg); }
          to { transform: rotateY(360deg); }
        }
        @keyframes shimmerSweep {
          0% { transform: translateX(-100%) skewX(-15deg); }
          100% { transform: translateX(200%) skewX(-15deg); }
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { overflow-x: hidden; }
      `}</style>

      {/* Progress Bar */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '4px',
        background: 'rgba(255,255,255,0.1)',
        zIndex: 9999
      }}>
        <div style={{
          height: '100%',
          width: `${scrollProgress}%`,
          background: 'linear-gradient(90deg, #8B5CF6, #06B6D4, #EC4899)',
          transition: 'width 0.1s',
          boxShadow: '0 0 20px rgba(139,92,246,0.8)'
        }} />
      </div>

      {/* Particle Canvas */}
      <canvas ref={particlesRef} style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1
      }} />

      {/* Cursor Glow */}
      <div style={{
        position: 'fixed',
        width: '600px',
        height: '600px',
        background: 'radial-gradient(circle, rgba(139,92,246,0.15), transparent 70%)',
        borderRadius: '50%',
        pointerEvents: 'none',
        transform: 'translate(-50%, -50%)',
        left: mousePosition.x,
        top: mousePosition.y,
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        zIndex: 2,
        filter: 'blur(60px)'
      }} />

      {/* Main Content */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        maxWidth: '1600px',
        margin: '0 auto',
        padding: '4rem clamp(1rem, 5vw, 3rem)'
      }}>
        {/* Hero Section */}
        <div style={{
          textAlign: 'center',
          marginBottom: '6rem',
          animation: 'slideIn 1s ease-out'
        }}>
          {/* Floating Icon */}
          <div style={{
            fontSize: 'clamp(4rem, 12vw, 7rem)',
            marginBottom: '2rem',
            animation: 'floatPulse 6s ease-in-out infinite'
          }}>
            🚀
          </div>

          {/* Badge */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '1rem',
            padding: '0.75rem 2rem',
            background: 'rgba(139,92,246,0.1)',
            backdropFilter: 'blur(20px)',
            border: '2px solid rgba(139,92,246,0.3)',
            borderRadius: '999px',
            marginBottom: '2rem',
            boxShadow: '0 10px 40px rgba(139,92,246,0.3)'
          }}>
            <Terminal size={24} style={{ color: '#8B5CF6', animation: 'glowPulse 3s infinite' }} />
            <span style={{
              fontWeight: '800',
              letterSpacing: '0.1em',
              fontSize: 'clamp(0.8rem, 2vw, 1rem)',
              background: 'linear-gradient(90deg, #8B5CF6, #06B6D4)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              2050 PORTFOLIO
            </span>
            <Sparkles size={24} style={{ color: '#06B6D4', animation: 'rotate3D 8s linear infinite' }} />
          </div>

          {/* Main Title */}
          <h1 style={{
            fontSize: 'clamp(2.5rem, 10vw, 6rem)',
            fontWeight: '900',
            lineHeight: '1.1',
            marginBottom: '1.5rem',
            background: 'linear-gradient(135deg, #fff, #8B5CF6, #06B6D4)',
            backgroundSize: '200% 200%',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            animation: 'holographicShift 5s ease infinite'
          }}>
            Project Showcase
          </h1>

          <p style={{
            fontSize: 'clamp(1rem, 3vw, 1.4rem)',
            color: '#94a3b8',
            maxWidth: '800px',
            margin: '0 auto 3rem',
            lineHeight: '1.6'
          }}>
            Revolutionary <span style={{ color: '#8B5CF6', fontWeight: '700' }}>MERN Stack</span> & <span style={{ color: '#06B6D4', fontWeight: '700' }}>AI-Powered</span> Applications
          </p>

          {/* Stats Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: '1.5rem',
            maxWidth: '900px',
            margin: '0 auto 3rem'
          }}>
            {[
              { icon: Code, label: 'Projects', value: projects.length, color: '#8B5CF6' },
              { icon: Star, label: 'Featured', value: projects.filter(p => p.featured).length, color: '#FBBF24' },
              { icon: Rocket, label: 'Live', value: projects.filter(p => p.live).length, color: '#06B6D4' },
              { icon: Cpu, label: 'Tech Stack', value: '12+', color: '#EC4899' }
            ].map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div key={i} style={{
                  padding: '2rem 1.5rem',
                  background: 'rgba(255,255,255,0.03)',
                  backdropFilter: 'blur(20px)',
                  borderRadius: '1.5rem',
                  border: `2px solid ${stat.color}30`,
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  cursor: 'pointer',
                  animation: `slideIn 0.6s ease-out ${i * 0.1}s backwards`
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = `0 20px 50px ${stat.color}40`;
                  e.currentTarget.style.borderColor = stat.color;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.borderColor = `${stat.color}30`;
                }}>
                  <Icon size={32} color={stat.color} style={{ marginBottom: '0.75rem' }} />
                  <div style={{
                    fontSize: 'clamp(2rem, 5vw, 3rem)',
                    fontWeight: '900',
                    color: stat.color,
                    marginBottom: '0.5rem'
                  }}>
                    {stat.value}
                  </div>
                  <div style={{
                    fontSize: 'clamp(0.8rem, 2vw, 1rem)',
                    color: '#94a3b8',
                    fontWeight: '700',
                    letterSpacing: '0.05em'
                  }}>
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Filter Tags */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '0.75rem',
            flexWrap: 'wrap',
            animation: 'slideIn 1s ease-out 0.3s backwards'
          }}>
            {allTags.map(tag => (
              <button key={tag} onClick={() => setFilter(tag)} style={{
                padding: '0.75rem 1.5rem',
                background: filter === tag ? 'linear-gradient(135deg, #8B5CF6, #06B6D4)' : 'rgba(255,255,255,0.05)',
                border: filter === tag ? 'none' : '2px solid rgba(139,92,246,0.3)',
                borderRadius: '999px',
                color: filter === tag ? '#fff' : '#94a3b8',
                fontWeight: '700',
                fontSize: 'clamp(0.8rem, 2vw, 0.95rem)',
                cursor: 'pointer',
                transition: 'all 0.3s',
                boxShadow: filter === tag ? '0 10px 30px rgba(139,92,246,0.5)' : 'none'
              }}
              onMouseEnter={(e) => {
                if (filter !== tag) {
                  e.currentTarget.style.background = 'rgba(139,92,246,0.15)';
                  e.currentTarget.style.color = '#e2e8f0';
                }
              }}
              onMouseLeave={(e) => {
                if (filter !== tag) {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                  e.currentTarget.style.color = '#94a3b8';
                }
              }}>
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 400px), 1fr))',
          gap: 'clamp(2rem, 4vw, 3rem)',
          marginBottom: '6rem'
        }}>
          {filteredProjects.map((project, idx) => (
            <div key={project.id}
              onMouseEnter={() => setHoveredCard(project.id)}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={() => setActiveProject(project)}
              style={{
                position: 'relative',
                cursor: 'pointer',
                animation: `slideIn 0.6s ease-out ${idx * 0.1}s backwards`,
                transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                transform: hoveredCard === project.id ? 'translateY(-12px) scale(1.02)' : 'translateY(0) scale(1)'
              }}>
              {/* Glow Effect */}
              <div style={{
                position: 'absolute',
                inset: '-40px',
                background: `radial-gradient(circle, ${project.color}30, transparent 70%)`,
                opacity: hoveredCard === project.id ? 1 : 0,
                transition: 'opacity 0.5s',
                filter: 'blur(60px)',
                zIndex: -1
              }} />

              {/* Card */}
              <div style={{
                background: 'rgba(15,15,35,0.9)',
                backdropFilter: 'blur(30px)',
                borderRadius: '2rem',
                overflow: 'hidden',
                border: `2px solid ${hoveredCard === project.id ? project.color : 'rgba(255,255,255,0.1)'}`,
                boxShadow: hoveredCard === project.id ? `0 40px 80px ${project.color}40` : '0 10px 30px rgba(0,0,0,0.5)',
                transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
              }}>
                {/* Featured Badge */}
                {project.featured && (
                  <div style={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1rem',
                    padding: '0.5rem 1rem',
                    background: 'linear-gradient(135deg, #FBBF24, #F59E0B)',
                    borderRadius: '999px',
                    fontSize: '0.75rem',
                    fontWeight: '900',
                    color: '#000',
                    zIndex: 20,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    boxShadow: '0 10px 30px rgba(251,191,36,0.6)'
                  }}>
                    <Star size={14} fill="#000" />
                    FEATURED
                  </div>
                )}

                {/* Image */}
                <div style={{ position: 'relative', height: 'clamp(200px, 40vw, 300px)', overflow: 'hidden' }}>
                  <img src={project.img} alt={project.title} style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)',
                    transform: hoveredCard === project.id ? 'scale(1.15)' : 'scale(1.05)'
                  }} />
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(15,15,35,1) 0%, transparent 60%)'
                  }} />
                  {hoveredCard === project.id && (
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.2) 50%, transparent 70%)',
                      animation: 'shimmerSweep 2s infinite'
                    }} />
                  )}
                </div>

                {/* Content */}
                <div style={{ padding: 'clamp(1.5rem, 4vw, 2.5rem)' }}>
                  {/* Icon & Title */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                    <span style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}>{project.icon}</span>
                    <h3 style={{
                      fontSize: 'clamp(1.3rem, 3vw, 1.8rem)',
                      fontWeight: '900',
                      color: '#fff',
                      lineHeight: '1.2'
                    }}>
                      {project.title}
                    </h3>
                  </div>

                  <p style={{
                    color: '#94a3b8',
                    fontSize: 'clamp(0.9rem, 2vw, 1rem)',
                    lineHeight: '1.6',
                    marginBottom: '1.5rem'
                  }}>
                    {project.desc}
                  </p>

                  {/* Tags */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
                    {project.tags.map(tag => (
                      <span key={tag} style={{
                        padding: '0.4rem 0.9rem',
                        background: `${project.color}20`,
                        border: `1px solid ${project.color}40`,
                        borderRadius: '999px',
                        fontSize: '0.8rem',
                        fontWeight: '700',
                        color: '#e2e8f0'
                      }}>
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Highlights */}
                  <div style={{ marginBottom: '1.5rem' }}>
                    {project.highlights.slice(0, 2).map((highlight, i) => (
                      <div key={i} style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        marginBottom: '0.5rem',
                        fontSize: '0.9rem',
                        color: '#cbd5e1'
                      }}>
                        <CheckCircle2 size={16} style={{ color: project.color }} />
                        {highlight}
                      </div>
                    ))}
                  </div>

                  {/* Actions */}
                  <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                    {project.github && (
                      <a href={project.github} target="_blank" rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        style={{
                          flex: 1,
                          minWidth: '120px',
                          padding: '0.75rem 1.25rem',
                          background: 'rgba(139,92,246,0.15)',
                          border: '2px solid rgba(139,92,246,0.5)',
                          borderRadius: '999px',
                          color: '#8B5CF6',
                          fontWeight: '700',
                          fontSize: '0.9rem',
                          textDecoration: 'none',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '0.5rem',
                          transition: 'all 0.3s'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = 'rgba(139,92,246,0.25)';
                          e.currentTarget.style.transform = 'translateY(-2px)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'rgba(139,92,246,0.15)';
                          e.currentTarget.style.transform = 'translateY(0)';
                        }}>
                        <Github size={16} />
                        Code
                      </a>
                    )}
                    {project.live && (
                      <a href={project.live} target="_blank" rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        style={{
                          flex: 1,
                          minWidth: '120px',
                          padding: '0.75rem 1.25rem',
                          background: `linear-gradient(135deg, ${project.color}, #fff)`,
                          border: 'none',
                          borderRadius: '999px',
                          color: '#000',
                          fontWeight: '900',
                          fontSize: '0.9rem',
                          textDecoration: 'none',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '0.5rem',
                          boxShadow: `0 10px 30px ${project.color}50`,
                          transition: 'all 0.3s'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
                          e.currentTarget.style.boxShadow = `0 15px 40px ${project.color}70`;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'translateY(0) scale(1)';
                          e.currentTarget.style.boxShadow = `0 10px 30px ${project.color}50`;
                        }}>
                        <Rocket size={16} />
                        Live
                        <ExternalLink size={14} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div style={{
          textAlign: 'center',
          padding: 'clamp(3rem, 8vw, 5rem) clamp(1rem, 4vw, 2rem)',
          background: 'rgba(139,92,246,0.05)',
          backdropFilter: 'blur(20px)',
          borderRadius: '2rem',
          border: '2px solid rgba(139,92,246,0.2)',
          animation: 'slideIn 1s ease-out 0.5s backwards'
        }}>
          <h2 style={{
            fontSize: 'clamp(2rem, 6vw, 3.5rem)',
            fontWeight: '900',
            marginBottom: '1.5rem',
            background: 'linear-gradient(135deg, #8B5CF6, #06B6D4, #EC4899)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Let's Build Together
          </h2>
          <p style={{
            fontSize: 'clamp(1rem, 2.5vw, 1.3rem)',
            color: '#94a3b8',
            marginBottom: '2rem',
            maxWidth: '600px',
            margin: '0 auto 2rem'
          }}>
            Ready to create the next generation of AI-powered applications?
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="https://github.com/bhagavan444" target="_blank" rel="noopener noreferrer" style={{
              padding: '1rem 2rem',
              background: 'rgba(139,92,246,0.15)',
              border: '2px solid #8B5CF6',
              borderRadius: '999px',
              color: '#8B5CF6',
              fontWeight: '800',
              fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
              transition: 'all 0.3s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(139,92,246,0.25)';
              e.currentTarget.style.transform = 'translateY(-4px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(139,92,246,0.15)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}>
              <Github size={20} />
              View GitHub
            </a>
            <a href="mailto:g.sivasatyasaibhagavan@gmail.com" style={{
              padding: '1rem 2rem',
              background: 'linear-gradient(135deg, #06B6D4, #EC4899)',
              border: 'none',
              borderRadius: '999px',
              color: '#fff',
              fontWeight: '900',
              fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
              boxShadow: '0 15px 40px rgba(6,182,212,0.5)',
              transition: 'all 0.3s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px) scale(1.05)';
              e.currentTarget.style.boxShadow = '0 20px 50px rgba(6,182,212,0.7)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = '0 15px 40px rgba(6,182,212,0.5)';
            }}>
              <Mail size={20} />
              Get In Touch
            </a>
          </div>
        </div>
      </div>

      {/* Modal */}
      {activeProject && (
        <div onClick={() => setActiveProject(null)} style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.95)',
          backdropFilter: 'blur(40px)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 'clamp(1rem, 3vw, 2rem)',
          animation: 'slideIn 0.3s ease-out'
        }}>
          <div onClick={(e) => e.stopPropagation()} style={{
            background: 'rgba(15,15,35,0.98)',
            backdropFilter: 'blur(40px)',
            borderRadius: '2rem',
            maxWidth: '1200px',
            width: '100%',
            maxHeight: '90vh',
            overflowY: 'auto',
            border: `3px solid ${activeProject.color}`,
            boxShadow: `0 50px 100px ${activeProject.color}60`,
            animation: 'slideIn 0.4s ease-out'
          }}>
            {/* Modal Header */}
            <div style={{
              position: 'sticky',
              top: 0,
              background: 'rgba(15,15,35,0.98)',
              backdropFilter: 'blur(30px)',
              padding: 'clamp(1.5rem, 4vw, 2.5rem)',
              borderBottom: `2px solid ${activeProject.color}40`,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              zIndex: 10
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)' }}>{activeProject.icon}</span>
                <div>
                  <h2 style={{
                    fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
                    fontWeight: '900',
                    marginBottom: '0.5rem'
                  }}>
                    {activeProject.title}
                  </h2>
                  <p style={{ fontSize: 'clamp(0.9rem, 2vw, 1.1rem)', color: activeProject.color, fontWeight: '700' }}>
                    Full Project Details
                  </p>
                </div>
              </div>
              <button onClick={() => setActiveProject(null)} style={{
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                color: '#ef4444',
                transition: 'all 0.3s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'rotate(90deg) scale(1.2)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'rotate(0) scale(1)'}>
                <X size={32} />
              </button>
            </div>

            {/* Modal Content */}
            <div style={{ padding: 'clamp(2rem, 5vw, 3rem)' }}>
              <img src={activeProject.img} alt={activeProject.title} style={{
                width: '100%',
                borderRadius: '1.5rem',
                marginBottom: '2rem',
                boxShadow: `0 30px 60px ${activeProject.color}40`
              }} />

              <p style={{
                fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
                lineHeight: '1.8',
                color: '#cbd5e1',
                marginBottom: '2.5rem'
              }}>
                {activeProject.desc}
              </p>

              {/* Highlights */}
              <h3 style={{
                fontSize: 'clamp(1.3rem, 3vw, 1.8rem)',
                fontWeight: '900',
                color: activeProject.color,
                marginBottom: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem'
              }}>
                <Sparkles size={24} />
                Key Features
              </h3>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '1rem',
                marginBottom: '2.5rem'
              }}>
                {activeProject.highlights.map((highlight, i) => (
                  <div key={i} style={{
                    padding: '1.25rem',
                    background: 'rgba(255,255,255,0.05)',
                    borderRadius: '1rem',
                    border: `2px solid ${activeProject.color}30`,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem'
                  }}>
                    <CheckCircle2 size={20} style={{ color: activeProject.color, flexShrink: 0 }} />
                    <span style={{ fontSize: 'clamp(0.9rem, 2vw, 1.05rem)', fontWeight: '600' }}>
                      {highlight}
                    </span>
                  </div>
                ))}
              </div>

              {/* Tech Stack */}
              <h3 style={{
                fontSize: 'clamp(1.3rem, 3vw, 1.8rem)',
                fontWeight: '900',
                color: activeProject.color,
                marginBottom: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem'
              }}>
                <Layers size={24} />
                Technologies
              </h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '2.5rem' }}>
                {activeProject.tags.map(tag => (
                  <span key={tag} style={{
                    padding: '0.75rem 1.5rem',
                    background: `${activeProject.color}20`,
                    border: `2px solid ${activeProject.color}50`,
                    borderRadius: '999px',
                    fontSize: 'clamp(0.9rem, 2vw, 1.05rem)',
                    fontWeight: '800',
                    color: '#e2e8f0'
                  }}>
                    {tag}
                  </span>
                ))}
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                {activeProject.github && (
                  <a href={activeProject.github} target="_blank" rel="noopener noreferrer" style={{
                    padding: '1rem 2rem',
                    background: 'rgba(139,92,246,0.15)',
                    border: '2px solid #8B5CF6',
                    borderRadius: '999px',
                    color: '#8B5CF6',
                    fontWeight: '800',
                    fontSize: 'clamp(1rem, 2vw, 1.2rem)',
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    transition: 'all 0.3s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(139,92,246,0.25)';
                    e.currentTarget.style.transform = 'translateY(-4px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(139,92,246,0.15)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}>
                    <Github size={24} />
                    View Source Code
                  </a>
                )}
                {activeProject.live && (
                  <a href={activeProject.live} target="_blank" rel="noopener noreferrer" style={{
                    padding: '1rem 2rem',
                    background: `linear-gradient(135deg, ${activeProject.color}, #fff)`,
                    border: 'none',
                    borderRadius: '999px',
                    color: '#000',
                    fontWeight: '900',
                    fontSize: 'clamp(1rem, 2vw, 1.2rem)',
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    boxShadow: `0 15px 40px ${activeProject.color}60`,
                    transition: 'all 0.3s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px) scale(1.05)';
                    e.currentTarget.style.boxShadow = `0 20px 50px ${activeProject.color}80`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    e.currentTarget.style.boxShadow = `0 15px 40px ${activeProject.color}60`;
                  }}>
                    <Rocket size={24} />
                    Launch Demo
                    <ExternalLink size={20} />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}