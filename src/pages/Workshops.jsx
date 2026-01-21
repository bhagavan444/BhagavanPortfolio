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
    color: "#00ffff",
    desc: "Build production-grade cross-platform apps with React Native & Flutter.",
    fullDesc: "Master mobile development with industry-standard frameworks. Build real-world apps from scratch, implement complex UI patterns, integrate cloud services, and deploy to both App Store and Google Play. Learn advanced state management, native modules, and performance optimization techniques used by top tech companies.",
    skills: ["React Native", "Flutter", "Firebase", "App Store Deploy", "Native Modules", "Performance Tuning"],
    slots: 25,
    enrolled: 489,
    duration: "8 Weeks",
    level: "Intermediate",
    featured: true,
    projects: 6
  },
  {
    title: "Full-Stack Engineering",
    icon: Code,
    color: "#8a2be2",
    desc: "Master Next.js 14, TypeScript, GraphQL & cloud-native backends.",
    fullDesc: "Become a complete full-stack engineer. Build scalable web applications using the latest technologies. Master server-side rendering, API design, database optimization, authentication systems, and deployment pipelines. Work on real production-grade projects that mirror industry standards.",
    skills: ["Next.js 14", "TypeScript", "GraphQL", "PostgreSQL", "Docker", "AWS/Vercel"],
    slots: 30,
    enrolled: 642,
    duration: "12 Weeks",
    level: "Beginner → Expert",
    featured: false,
    projects: 8
  },
  {
    title: "Machine Learning Pro",
    icon: Brain,
    color: "#00ffff",
    desc: "Real-world ML pipelines, MLOps & production model deployment.",
    fullDesc: "Transform into an ML engineer capable of building production systems. Learn end-to-end ML workflows from data preprocessing to model deployment. Master feature engineering, model selection, hyperparameter tuning, and MLOps practices. Deploy scalable ML services used by millions.",
    skills: ["Python ML", "MLOps", "Feature Engineering", "Time Series", "Model Deployment", "A/B Testing"],
    slots: 20,
    enrolled: 573,
    duration: "10 Weeks",
    level: "Intermediate",
    featured: false,
    projects: 7
  },
  {
    title: "Deep Learning & Gen AI",
    icon: Cpu,
    color: "#8a2be2",
    desc: "Transformers, Diffusion Models, LLM fine-tuning & RAG systems.",
    fullDesc: "Dive deep into cutting-edge AI technologies. Build and fine-tune large language models, create custom RAG systems, implement diffusion models for image generation, and deploy AI-powered applications. Learn prompt engineering, vector databases, and production AI architecture.",
    skills: ["PyTorch", "Transformers", "Stable Diffusion", "RAG Systems", "LangChain", "Vector DBs"],
    slots: 18,
    enrolled: 521,
    duration: "12 Weeks",
    level: "Advanced",
    featured: true,
    projects: 5
  },
  {
    title: "Cloud & DevOps Mastery",
    icon: Shield,
    color: "#00ffff",
    desc: "Kubernetes, Terraform, CI/CD pipelines & cloud-native architecture.",
    fullDesc: "Master cloud infrastructure and DevOps practices. Build automated deployment pipelines, manage containerized applications, implement infrastructure as code, and design highly available systems. Learn AWS/GCP/Azure, monitoring, security, and cost optimization strategies.",
    skills: ["Kubernetes", "Terraform", "CI/CD", "AWS", "Monitoring", "Security"],
    slots: 22,
    enrolled: 438,
    duration: "10 Weeks",
    level: "Intermediate",
    featured: false,
    projects: 6
  },
  {
    title: "Blockchain Engineering",
    icon: GitBranch,
    color: "#8a2be2",
    desc: "Smart contracts, Web3, DeFi protocols & decentralized applications.",
    fullDesc: "Enter the world of Web3 development. Build decentralized applications, write secure smart contracts, integrate blockchain into existing systems, and understand DeFi protocols. Master Solidity, Web3.js, and build production-ready dApps on Ethereum and other blockchains.",
    skills: ["Solidity", "Web3.js", "Ethereum", "Smart Contracts", "DeFi", "NFT Development"],
    slots: 15,
    enrolled: 367,
    duration: "8 Weeks",
    level: "Advanced",
    featured: false,
    projects: 4
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

    const particles = Array.from({ length: 70 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      size: Math.random() * 2.8 + 1.2
    }));

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.07)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 5);
        gradient.addColorStop(0, 'rgba(0, 255, 255, 0.38)');
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

        @keyframes slideIn { from { opacity:0; transform:translateY(60px); } to { opacity:1; transform:translateY(0); } }
        @keyframes scan     { 0% { transform:translateY(-100%); } 100% { transform:translateY(100%); } }
        @keyframes float    { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-14px); } }
        @keyframes pulse    { 0%,100% { opacity:1; } 50% { opacity:0.6; } }

        .workshop-card {
          position: relative;
          background: rgba(8,8,22,0.84);
          border: 2px solid rgba(0,255,255,0.24);
          border-radius: 24px;
          overflow: hidden;
          transition: all 0.5s cubic-bezier(0.23,1,0.32,1);
        }

        .workshop-card:hover {
          transform: translateY(-20px) scale(1.04);
          border-color: currentColor;
          box-shadow: 0 0 80px currentColor;
        }

        .workshop-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, transparent 35%, rgba(0,255,255,0.15) 50%, transparent 65%);
          animation: scan 6s linear infinite;
          pointer-events: none;
          z-index: 1;
        }

        .tech-pill {
          background: rgba(0,0,0,0.72);
          border: 1.5px solid currentColor;
          padding: 0.55rem 1.15rem;
          border-radius: 999px;
          font-family: 'Fira Code',monospace;
          font-size: 0.9rem;
          transition: all 0.3s;
        }

        .tech-pill:hover {
          transform: scale(1.08);
          box-shadow: 0 0 28px currentColor;
        }

        .neon-title {
          text-shadow: 0 0 14px currentColor, 0 0 32px currentColor, 0 0 60px currentColor;
        }
      `}</style>

      <div style={{
        minHeight: '100vh',
        background: '#000000',
        color: '#e0e0ff',
        position: 'relative',
        overflow: 'hidden',
        padding: '8rem 3rem 6rem',
        fontFamily: "'Outfit', sans-serif"
      }}>
        {/* Grid overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(0,255,255,0.09) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,255,255,0.09) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          opacity: 0.22,
          pointerEvents: 'none'
        }} />

        {/* Particles canvas */}
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
          maxWidth: '1680px',
          margin: '0 auto'
        }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '7rem' }}>
            <div style={{
              display: 'inline-block',
              fontFamily: "'Fira Code', monospace",
              color: '#00ffff',
              fontSize: '1.15rem',
              padding: '0.9rem 2rem',
              border: '2.5px solid rgba(0,255,255,0.4)',
              borderRadius: '999px',
              marginBottom: '1.8rem',
              animation: 'pulse 3.5s infinite'
            }}>
              {'>'} workshops.initialize()
            </div>

            <h1 className="neon-title" style={{
              fontSize: 'clamp(4rem, 9vw, 7rem)',
              fontWeight: 900,
              color: '#00ffff',
              letterSpacing: '5px',
              textTransform: 'uppercase',
              marginBottom: '1.8rem'
            }}>
              ELITE WORKSHOPS
            </h1>

            <p style={{
              fontSize: 'clamp(1.25rem, 2.8vw, 1.6rem)',
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
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))',
            gap: '3rem',
            marginBottom: '7rem'
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
                    height: '5px',
                    background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
                    opacity: isHovered ? 0.95 : 0.45,
                    transition: 'opacity 0.5s'
                  }} />

                  {/* Icon showcase area */}
                  <div style={{
                    height: '260px',
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

                  <div style={{ padding: '2.4rem 2.6rem' }}>
                    <h3 style={{
                      fontSize: '1.9rem',
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
            padding: '4rem',
            background: 'rgba(0,0,0,0.75)',
            border: '2.5px solid rgba(0,255,255,0.3)',
            borderRadius: '28px',
            textAlign: 'center'
          }}>
            <h2 style={{
              fontSize: 'clamp(3rem, 7vw, 4.8rem)',
              fontWeight: 900,
              color: '#00ffff',
              marginBottom: '2.5rem',
              textShadow: '0 0 40px #00ffff90'
            }}>
              READY TO LEVEL UP?
            </h2>

            <div style={{ display: 'flex', gap: '2.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="https://github.com/bhagavan444" target="_blank" style={{
                padding: '1.4rem 3.2rem',
                background: 'rgba(0,255,255,0.14)',
                border: '2.5px solid #00ffff80',
                borderRadius: '999px',
                color: '#00ffff',
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
                background: 'linear-gradient(90deg, #00ffff, #8a2be2)',
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
            padding: '2rem'
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: 'rgba(6,6,28,0.97)',
              border: `4px solid ${selected.color}aa`,
              borderRadius: '32px',
              maxWidth: '1300px',
              width: '94%',
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
                top: '2rem',
                right: '2.5rem',
                background: 'none',
                border: 'none',
                color: '#ff6666',
                cursor: 'pointer',
                zIndex: 10
              }}
            >
              <X size={56} strokeWidth={2.8} />
            </button>

            <div style={{
              height: '300px',
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

            <div style={{ padding: '4rem 4rem 5rem' }}>
              <h2 style={{
                fontSize: 'clamp(2.8rem, 6vw, 4.5rem)',
                fontWeight: 900,
                color: selected.color,
                textShadow: `0 0 40px ${selected.color}90`,
                marginBottom: '1.5rem',
                textAlign: 'center'
              }}>
                {selected.title}
              </h2>

              <p style={{
                fontSize: '1.35rem',
                lineHeight: 1.8,
                color: '#c8d0ff',
                textAlign: 'center',
                marginBottom: '3.5rem'
              }}>
                {selected.fullDesc}
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', marginBottom: '4rem' }}>
                <div>
                  <h3 style={{
                    fontSize: '2.2rem',
                    color: selected.color,
                    marginBottom: '1.8rem',
                    fontWeight: 800,
                    textAlign: 'center'
                  }}>
                    MASTERED SKILLS
                  </h3>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.2rem', justifyContent: 'center' }}>
                    {selected.skills.map(s => (
                      <span key={s} style={{
                        padding: '0.9rem 1.8rem',
                        background: `${selected.color}20`,
                        border: `2px solid ${selected.color}50`,
                        borderRadius: '999px',
                        fontFamily: "'Fira Code', monospace",
                        fontWeight: 600
                      }}>
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 style={{
                    fontSize: '2.2rem',
                    color: selected.color,
                    marginBottom: '1.8rem',
                    fontWeight: 800,
                    textAlign: 'center'
                  }}>
                    PROGRAM STATS
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
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