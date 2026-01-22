import { useState, useEffect, useRef } from "react";
import {
  Smartphone, Code, Brain, Cpu, Shield, GitBranch,
  Calendar, Users, Sparkles, Zap, Star, Award,
  Rocket, BookOpen, X, CheckCircle2, ArrowRight,
  GraduationCap, Layers, Terminal, Database, Server, Lock
} from "lucide-react";

const workshops = [
  {
    title: "Mobile App Development",
    icon: Smartphone,
    color: "var(--neon-primary)",

    desc: "Hands-on workshop focused on building cross-platform mobile applications using modern frameworks.",

    fullDesc:
      "Learned end-to-end mobile app development by building real-world cross-platform applications. Covered UI design, state management, backend integration, authentication, performance optimization, and deployment workflows.",

    skills: [
      "React Native",
      "Flutter",
      "Firebase",
      "REST API Integration",
      "State Management",
      "Performance Optimization"
    ],

    whatILearned: [
      "Building cross-platform mobile apps from scratch",
      "Designing responsive and adaptive mobile UIs",
      "Integrating backend APIs and Firebase services",
      "Handling authentication and data persistence",
      "Optimizing performance for mobile devices"
    ],

    howIUsed: [
      "Applied UI and state management concepts in web projects",
      "Improved frontend performance optimization skills",
      "Gained understanding of mobile-first design principles"
    ],

    outcomes: [
      "Built multiple functional mobile app prototypes",
      "Strengthened understanding of client-side architecture",
      "Improved confidence in frontend engineering"
    ],

    duration: "8 Weeks",
    level: "Intermediate",
    projects: 6,
    featured: true
  },

  {
    title: "Full-Stack Engineering",
    icon: Code,
    color: "var(--neon-primary)",

    desc: "Comprehensive full-stack training covering frontend, backend, databases, and cloud deployment.",

    fullDesc:
      "Developed strong full-stack engineering fundamentals by building scalable web applications using modern frontend frameworks, backend APIs, databases, and cloud deployment platforms.",

    skills: [
      "Next.js",
      "TypeScript",
      "REST APIs",
      "PostgreSQL",
      "Docker",
      "Cloud Deployment"
    ],

    whatILearned: [
      "Building scalable frontend applications",
      "Designing RESTful backend services",
      "Working with relational databases",
      "Containerizing applications using Docker",
      "Deploying applications to cloud platforms"
    ],

    howIUsed: [
      "Applied full-stack principles in MERN projects",
      "Improved backend API design and security",
      "Used deployment concepts in hackathons and projects"
    ],

    outcomes: [
      "Built multiple full-stack web applications",
      "Improved system design understanding",
      "Strengthened backend and deployment skills"
    ],

    duration: "12 Weeks",
    level: "Beginner → Advanced",
    projects: 8,
    featured: false
  },

  {
    title: "Machine Learning Pro",
    icon: Brain,
    color: "var(--neon-primary)",

    desc: "Practical machine learning workshop focused on real-world ML pipelines and deployment.",

    fullDesc:
      "Focused on building end-to-end machine learning pipelines including data preprocessing, feature engineering, model training, evaluation, and deployment into real-world applications.",

    skills: [
      "Python",
      "Scikit-learn",
      "Feature Engineering",
      "Model Evaluation",
      "ML Pipelines",
      "Model Deployment"
    ],

    whatILearned: [
      "Preparing real-world datasets for ML models",
      "Training and evaluating ML algorithms",
      "Avoiding overfitting and improving generalization",
      "Deploying ML models into applications",
      "Understanding ML lifecycle and workflows"
    ],

    howIUsed: [
      "Built ML-based prediction systems",
      "Applied feature engineering in academic projects",
      "Improved ML model performance and reliability"
    ],

    outcomes: [
      "Built multiple machine learning models",
      "Improved understanding of ML workflows",
      "Prepared for AI/ML internships and projects"
    ],

    duration: "10 Weeks",
    level: "Intermediate",
    projects: 7,
    featured: false
  },

  {
    title: "Deep Learning & Advanced AI",
    icon: Cpu,
    color: "var(--neon-primary)",

    desc: "Advanced deep learning workshop covering modern AI architectures and generative models.",

    fullDesc:
      "Explored advanced AI concepts including deep neural networks, transformers, generative models, and real-world AI system design with hands-on implementations.",

    skills: [
      "PyTorch",
      "Deep Neural Networks",
      "Transformers",
      "Computer Vision",
      "NLP",
      "Model Optimization"
    ],

    whatILearned: [
      "Designing and training deep neural networks",
      "Understanding transformer architectures",
      "Working with advanced AI models",
      "Optimizing deep learning performance",
      "Deploying deep learning models"
    ],

    howIUsed: [
      "Applied DL concepts in AI projects",
      "Improved model accuracy and performance",
      "Built AI-powered applications"
    ],

    outcomes: [
      "Built advanced deep learning models",
      "Strengthened AI system design skills",
      "Prepared for AI Engineer roles"
    ],

    duration: "12 Weeks",
    level: "Advanced",
    projects: 5,
    featured: true
  }
];


export default function CyberpunkWorkshops() {
  const [selected, setSelected] = useState(null);
  const [hoveredId, setHoveredId] = useState(null);
  const canvasRef = useRef(null);

  // ─── BACKGROUND PARTICLES ────────────────────────────────────────────────
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

    const particles = Array.from({ length: 50 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      size: Math.random() * 2 + 1
    }));

    const animate = () => {
      ctx.fillStyle = 'rgba(0,0,0,0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 5);
        gradient.addColorStop(0, 'rgba(0, 240, 255, 0.35)');
        gradient.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 5, 0, Math.PI * 2);
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

  const Counter = ({ target }) => {
    const [count, setCount] = useState(0);
    useEffect(() => {
      let start = 0;
      const duration = 1800;
      const step = target / (duration / 16);
      const timer = setInterval(() => {
        start += step;
        if (start >= target) {
          setCount(target);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }, [target]);
    return <span>{count.toLocaleString()}</span>;
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Fira+Code:wght@400;500;600&display=swap');

        :root {
          --neon-primary: #00f0ff;
          --neon-gradient: linear-gradient(90deg, #00f0ff, #a78bfa, #ff61d2);
          --neon-glow: 0 0 25px rgba(0, 240, 255, 0.75);
        }

        @keyframes slideIn { from { opacity:0; transform:translateY(50px); } to { opacity:1; transform:translateY(0); } }
        @keyframes scan     { 0% { transform:translateY(-100%); } 100% { transform:translateY(100%); } }
        @keyframes float    { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-10px); } }
        @keyframes pulse    { 0%,100% { opacity:1; } 50% { opacity:0.7; } }

        .workshop-card {
          position: relative;
          background: rgba(8,8,22,0.92);
          border: 2px solid rgba(0,240,255,0.32);
          border-radius: 20px;
          overflow: hidden;
          transition: all 0.5s cubic-bezier(0.23,1,0.32,1);
          max-width: 100%;
          box-sizing: border-box;
        }

        .workshop-card:hover {
          transform: translateY(-16px) scale(1.03);
          border-color: var(--neon-primary);
          box-shadow: var(--neon-glow);
        }

        .workshop-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, transparent 35%, rgba(0,240,255,0.15) 50%, transparent 65%);
          animation: scan 7s linear infinite;
          pointer-events: none;
          z-index: 1;
        }

        .tech-pill {
          background: rgba(0,0,0,0.78);
          border: 1.6px solid var(--neon-primary);
          padding: 0.5rem 1rem;
          border-radius: 999px;
          font-family: 'Fira Code',monospace;
          font-size: 0.86rem;
          transition: all 0.3s;
          color: #e0f7ff;
        }

        .tech-pill:hover {
          transform: scale(1.06);
          box-shadow: 0 0 20px var(--neon-primary);
        }

        .neon-title {
          background: var(--neon-gradient);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          text-shadow: 0 0 35px rgba(0,240,255,0.85);
        }

        /* ─── RESPONSIVE FIXES ──────────────────────────────────────── */
        @media (max-width: 1024px) {
          .workshop-grid {
            grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)) !important;
            gap: 2.5rem !important;
          }
        }

        @media (max-width: 768px) {
          .workshop-grid {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
          }
          .icon-showcase {
            height: 220px !important;
          }
          .card-padding {
            padding: 1.8rem 1.5rem !important;
          }
          h1.neon-title {
            font-size: clamp(3.4rem, 11vw, 5.5rem) !important;
            letter-spacing: 3px !important;
          }
          .modal-content {
            padding: 2.2rem 1.6rem !important;
            width: 98% !important;
            max-width: 98% !important;
          }
        }

        @media (max-width: 480px) {
          .icon-showcase {
            height: 200px !important;
          }
          .card-padding {
            padding: 1.5rem 1.3rem !important;
          }
          h3 {
            font-size: 1.65rem !important;
          }
          .tech-pill {
            padding: 0.45rem 0.9rem;
            font-size: 0.82rem;
          }
          .cta-buttons {
            flex-direction: column !important;
            gap: 1.5rem !important;
          }
          .modal-content {
            padding: 2rem 1.4rem !important;
          }
        }

        @media (max-width: 360px) {
          .icon-showcase {
            height: 180px !important;
          }
          .card-padding {
            padding: 1.4rem 1.2rem !important;
          }
        }
      `}</style>

      <div style={{
        minHeight: '100vh',
        background: '#000000',
        color: '#e0e0ff',
        position: 'relative',
        overflow: 'hidden',
        padding: 'clamp(5rem, 12vw, 10rem) 1.5rem 6rem',
        fontFamily: "'Outfit', sans-serif"
      }}>
        {/* Grid overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(0,240,255,0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,240,255,0.08) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          opacity: 0.22,
          pointerEvents: 'none'
        }} />

        {/* Particles */}
        <canvas
          ref={canvasRef}
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            zIndex: 1
          }}
        />

        <div style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: '1600px',
          margin: '0 auto',
          width: '100%'
        }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: 'clamp(4rem, 10vw, 7rem)' }}>
            <div style={{
              display: 'inline-block',
              fontFamily: "'Fira Code', monospace",
              color: 'var(--neon-primary)',
              fontSize: 'clamp(1rem, 2.6vw, 1.15rem)',
              padding: '0.8rem 1.8rem',
              border: '2px solid rgba(0,240,255,0.45)',
              borderRadius: '999px',
              marginBottom: '1.6rem',
              animation: 'pulse 3.5s infinite'
            }}>
              {'>'} workshops.initialize()
            </div>

            <h1 className="neon-title" style={{
              fontSize: 'clamp(3.8rem, 11vw, 7rem)',
              fontWeight: 900,
              letterSpacing: '4px',
              textTransform: 'uppercase',
              marginBottom: '1.4rem',
              lineHeight: 1.1
            }}>
              ELITE WORKSHOPS
            </h1>

            <p style={{
              fontSize: 'clamp(1.15rem, 3vw, 1.4rem)',
              color: '#a0a0c8',
              maxWidth: '820px',
              margin: '0 auto',
              fontFamily: "'Fira Code', monospace",
              lineHeight: 1.8
            }}>
              [ Next-generation engineering acceleration programs ]<br/>
              Deployed for elite developers — 2025 edition
            </p>
          </div>

          {/* Workshops Grid */}
          <div className="workshop-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 'clamp(2rem, 5vw, 3.2rem)',
            marginBottom: '7rem',
            width: '100%',
            maxWidth: '100%'
          }}>
            {workshops.map((ws, i) => {
              const isHovered = hoveredId === i;
              const color = ws.color;

              return (
                <div
                  key={i}
                  className="workshop-card"
                  onMouseEnter={() => setHoveredId(i)}
                  onMouseLeave={() => setHoveredId(null)}
                  onClick={() => setSelected(ws)}
                  style={{
                    color,
                    animation: `slideIn ${0.6 + i * 0.12}s ease-out`,
                    opacity: 0,
                    animationFillMode: 'forwards',
                    cursor: 'pointer'
                  }}
                >
                  {/* Top glowing scan */}
                  <div style={{
                    position: 'absolute',
                    top: 0, left: 0, right: 0,
                    height: '4px',
                    background: `linear-gradient(90deg, transparent, var(--neon-primary), transparent)`,
                    opacity: isHovered ? 0.9 : 0.4,
                    transition: 'opacity 0.5s'
                  }} />

                  {/* Icon showcase area */}
                  <div className="icon-showcase" style={{
                    height: 'clamp(180px, 50vw, 240px)',
                    position: 'relative',
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: `linear-gradient(135deg, ${color}15, transparent)`
                  }}>
                    <div style={{
                      width: '140px',
                      height: '140px',
                      border: `3px solid ${color}`,
                      borderRadius: '32px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      animation: isHovered ? 'float 3s ease-in-out infinite' : 'none',
                      boxShadow: isHovered ? `0 0 60px ${color}80` : 'none',
                      transform: isHovered ? 'scale(1.15) rotate(6deg)' : 'scale(1)'
                    }}>
                      <ws.icon size={72} />
                    </div>

                    {ws.featured && (
                      <div style={{
                        position: 'absolute',
                        top: '1.5rem',
                        right: '1.5rem',
                        padding: '0.6rem 1.4rem',
                        background: 'rgba(255,215,0,0.18)',
                        border: '2px solid #ffea8090',
                        borderRadius: '999px',
                        fontSize: '0.95rem',
                        fontWeight: 700,
                        color: '#ffea80',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.6rem'
                      }}>
                        <Star size={16} fill="#ffea80" /> FEATURED
                      </div>
                    )}
                  </div>

                  <div className="card-padding" style={{ 
                    padding: 'clamp(1.8rem, 4vw, 2.4rem) clamp(1.6rem, 3.5vw, 2.2rem)' 
                  }}>
                    <h3 style={{
                      fontSize: 'clamp(1.7rem, 4.5vw, 1.95rem)',
                      fontWeight: 800,
                      color: '#ffffff',
                      marginBottom: '1rem',
                      textAlign: 'center'
                    }}>
                      {ws.title}
                    </h3>

                    <p style={{
                      fontSize: '1rem',
                      color: '#b0b0d0',
                      lineHeight: 1.7,
                      textAlign: 'center',
                      marginBottom: '2rem',
                      fontFamily: "'Fira Code', monospace"
                    }}>
                      {ws.desc}
                    </p>

                    {/* Quick stats */}
                    <div style={{
                      display: 'flex',
                      justifyContent: 'center',
                      gap: '1.5rem',
                      marginBottom: '2rem',
                      flexWrap: 'wrap'
                    }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.8rem',
                        padding: '0.8rem 1.4rem',
                        background: 'rgba(0,0,0,0.55)',
                        borderRadius: '999px',
                        border: `1px solid ${color}40`
                      }}>
                        <Calendar size={18} />
                        <span>{ws.duration}</span>
                      </div>

                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.8rem',
                        padding: '0.8rem 1.4rem',
                        background: 'rgba(0,0,0,0.55)',
                        borderRadius: '999px',
                        border: `1px solid ${color}40`
                      }}>
                        <Users size={18} />
                        <span><Counter target={ws.enrolled} />+</span>
                      </div>

                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.8rem',
                        padding: '0.8rem 1.4rem',
                        background: 'rgba(0,0,0,0.55)',
                        borderRadius: '999px',
                        border: `1px solid ${color}40`
                      }}>
                        <Layers size={18} />
                        <span>{ws.projects} Projects</span>
                      </div>
                    </div>

                    {/* Action button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelected(ws);
                      }}
                      style={{
                        width: '100%',
                        padding: '1.2rem',
                        background: `linear-gradient(90deg, ${color}, #ffffff)`,
                        color: '#000',
                        fontWeight: 800,
                        borderRadius: '999px',
                        border: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '1rem',
                        boxShadow: `0 0 40px ${color}60`,
                        cursor: 'pointer'
                      }}
                    >
                      <BookOpen size={22} />
                      Explore Workshop
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* CTA Bar */}
          <div style={{
            padding: 'clamp(3rem, 8vw, 4.5rem) 2rem',
            background: 'rgba(0,0,0,0.75)',
            border: '2.5px solid rgba(0,240,255,0.38)',
            borderRadius: '28px',
            textAlign: 'center'
          }}>
            <h2 style={{
              fontSize: 'clamp(2.8rem, 6vw, 4.5rem)',
              fontWeight: 900,
              background: 'var(--neon-gradient)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '2.5rem',
              textShadow: '0 0 40px rgba(0,240,255,0.7)'
            }}>
              READY TO LEVEL UP?
            </h2>

            <div className="cta-buttons" style={{ 
              display: 'flex', 
              gap: '2.5rem', 
              justifyContent: 'center', 
              flexWrap: 'wrap' 
            }}>
              <a href="https://github.com/bhagavan444" target="_blank" rel="noopener noreferrer" style={{
                padding: '1.4rem 3.2rem',
                background: 'rgba(0,240,255,0.14)',
                border: '2.5px solid rgba(0,240,255,0.7)',
                borderRadius: '999px',
                color: 'var(--neon-primary)',
                fontWeight: 700,
                fontSize: '1.25rem',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '1.2rem'
              }}>
                <Code size={32} />
                VIEW PROJECTS
              </a>

              <a href="mailto:g.sivasatyasaibhagavan@gmail.com" style={{
                padding: '1.4rem 3.2rem',
                background: 'var(--neon-gradient)',
                borderRadius: '999px',
                color: '#000',
                fontWeight: 900,
                fontSize: '1.25rem',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '1.2rem'
              }}>
                <Sparkles size={32} />
                GET IN TOUCH
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ─── WORKSHOP DETAIL MODAL ───────────────────────────────────────────── */}
      {selected && (
        <div
          onClick={() => setSelected(null)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.96)',
            backdropFilter: 'blur(16px)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem'
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            className="modal-content"
            style={{
              background: 'rgba(6,6,28,0.98)',
              border: `4px solid ${selected.color}aa`,
              borderRadius: '28px',
              maxWidth: '1300px',
              width: '96%',
              maxHeight: '92vh',
              overflowY: 'auto',
              boxShadow: `0 0 160px ${selected.color}70`,
              position: 'relative'
            }}
          >
            <button
              onClick={() => setSelected(null)}
              style={{
                position: 'absolute',
                top: '1.5rem',
                right: '1.8rem',
                background: 'none',
                border: 'none',
                color: '#ff6666',
                cursor: 'pointer',
                zIndex: 10
              }}
            >
              <X size={48} strokeWidth={2.8} />
            </button>

            <div style={{
              height: 'clamp(220px, 50vw, 300px)',
              position: 'relative',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: `linear-gradient(135deg, ${selected.color}20, transparent)`
            }}>
              <div style={{
                width: '180px',
                height: '180px',
                border: `4px solid ${selected.color}`,
                borderRadius: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: `0 0 80px ${selected.color}90`
              }}>
                <selected.icon size={90} />
              </div>
            </div>

            <div style={{ padding: 'clamp(2.2rem, 6vw, 4rem) clamp(1.6rem, 5vw, 3.5rem) 5rem' }}>
              <h2 style={{
                fontSize: 'clamp(2.6rem, 7vw, 4.2rem)',
                fontWeight: 900,
                background: 'var(--neon-gradient)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: `0 0 40px ${selected.color}90`,
                marginBottom: '1.4rem',
                textAlign: 'center'
              }}>
                {selected.title}
              </h2>

              <p style={{
                fontSize: 'clamp(1.25rem, 3.5vw, 1.45rem)',
                lineHeight: 1.8,
                color: '#c8d0ff',
                textAlign: 'center',
                marginBottom: '3.5rem'
              }}>
                {selected.fullDesc}
              </p>

              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: '1fr', 
                gap: '3rem', 
                marginBottom: '4rem',
                '@media (min-width: 768px)': { gridTemplateColumns: '1fr 1fr' }
              }}>
                <div>
                  <h3 style={{
                    fontSize: 'clamp(2rem, 5vw, 2.4rem)',
                    background: 'var(--neon-gradient)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    marginBottom: '1.8rem',
                    fontWeight: 800,
                    textAlign: 'center'
                  }}>
                    MASTERED SKILLS
                  </h3>
                  <div style={{ 
                    display: 'flex', 
                    flexWrap: 'wrap', 
                    gap: '1.2rem', 
                    justifyContent: 'center' 
                  }}>
                    {selected.skills.map(s => (
                      <span key={s} style={{
                        padding: '0.9rem 1.8rem',
                        background: `${selected.color}20`,
                        border: `2px solid ${selected.color}50`,
                        borderRadius: '999px',
                        fontFamily: "'Fira Code', monospace",
                        fontWeight: 600,
                        fontSize: '0.95rem'
                      }}>
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 style={{
                    fontSize: 'clamp(2rem, 5vw, 2.4rem)',
                    background: 'var(--neon-gradient)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    marginBottom: '1.8rem',
                    fontWeight: 800,
                    textAlign: 'center'
                  }}>
                    PROGRAM STATS
                  </h3>
                  <div style={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    gap: '1.5rem' 
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.3rem' }}>
                      <span>Duration:</span>
                      <span style={{ color: '#ffffff', fontWeight: 700 }}>{selected.duration}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.3rem' }}>
                      <span>Enrolled:</span>
                      <span style={{ color: '#ffffff', fontWeight: 700 }}><Counter target={selected.enrolled} />+</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.3rem' }}>
                      <span>Projects:</span>
                      <span style={{ color: '#ffffff', fontWeight: 700 }}>{selected.projects}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.3rem' }}>
                      <span>Level:</span>
                      <span style={{ color: '#ffffff', fontWeight: 700 }}>{selected.level}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ textAlign: 'center', marginTop: '4rem' }}>
                <button style={{
                  padding: '1.4rem 4rem',
                  background: `linear-gradient(90deg, ${selected.color}, #ffffff)`,
                  color: '#000',
                  fontWeight: 900,
                  fontSize: '1.3rem',
                  borderRadius: '999px',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1.2rem',
                  margin: '0 auto',
                  boxShadow: `0 0 60px ${selected.color}80`,
                  cursor: 'pointer'
                }}>
                  <Rocket size={28} />
                  ENROLL NOW
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}