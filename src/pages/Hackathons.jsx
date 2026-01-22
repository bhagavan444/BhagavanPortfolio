import { useState, useEffect, useRef } from "react";
import {
  Trophy, Award, X, Code, Database, Shield, Rocket, Crown,
  Clock, Users, Sparkles, Zap, Star, Flame, Target, Cpu, GitBranch,
  Download, TrendingUp, Layers, CheckCircle2, ArrowRight, Terminal,
  Server, Lock
} from "lucide-react";
import certificateImage from "../assets/images/Brainovision-certificate.jpg";

export default function CyberpunkHackathon() {
  const [modalOpen, setModalOpen] = useState(false);
  const [activePhase, setActivePhase] = useState(0);
  const [hoveredId, setHoveredId] = useState(null);
  const canvasRef = useRef(null);
const phases = [
  {
    id: 1,
    hour: "0–6h",
    icon: Terminal,
    title: "Foundation Sprint",
    desc: "Designed overall system architecture, finalized use-cases, modeled MongoDB schemas, implemented JWT authentication core, and scaffolded backend & frontend projects.",
    color: "var(--neon-primary)",
    achievements: [
      "System Architecture Blueprint",
      "MongoDB Schema Design",
      "JWT Authentication Core",
      "Backend & Frontend Setup"
    ]
  },
  {
    id: 2,
    hour: "6–14h",
    icon: Code,
    title: "Core Development",
    desc: "Implemented RESTful APIs, developed reusable React components, set up state management, routing, and integrated core application workflows.",
    color: "var(--neon-primary)",
    achievements: [
      "15+ REST API Endpoints",
      "Reusable UI Component Library",
      "State Management Architecture",
      "Client-Side Routing"
    ]
  },
  {
    id: 3,
    hour: "14–20h",
    icon: Zap,
    title: "Integration & Security",
    desc: "Integrated real-time features using Socket.io, implemented role-based access control, added validation layers, middleware, and centralized error handling.",
    color: "var(--neon-primary)",
    achievements: [
      "Real-Time Chat System",
      "Role-Based Authorization",
      "Security Hardening",
      "Robust Error Handling"
    ]
  },
  {
    id: 4,
    hour: "20–24h",
    icon: Rocket,
    title: "Launch & Demo",
    desc: "Optimized performance, tested core flows, prepared live demo, deployed to cloud, and documented system for presentation and evaluation.",
    color: "var(--neon-primary)",
    achievements: [
      "Production Deployment",
      "Performance Optimization",
      "Live Demo Preparation",
      "Technical Documentation"
    ]
  }
];


 const techStack = [
  { icon: Database, name: "MongoDB", desc: "NoSQL database for scalable data storage", color: "#10b981" },
  { icon: Server, name: "Express.js", desc: "Backend framework for REST APIs", color: "var(--neon-primary)" },
  { icon: Sparkles, name: "React", desc: "Frontend UI library for dynamic components", color: "#8b5cf6" },
  { icon: Layers, name: "Node.js", desc: "JavaScript runtime for backend services", color: "#ec4899" },
  { icon: Lock, name: "JWT", desc: "Secure authentication & authorization", color: "#f59e0b" },
  { icon: Zap, name: "Socket.io", desc: "Real-time communication engine", color: "#3b82f6" }
];

const stats = [
  {
    label: "Duration",
    value: "24",
    unit: "hours",
    icon: Clock,
    color: "var(--neon-primary)"
  },
  {
    label: "Team Size",
    value: "4",
    unit: "members",
    icon: Users,
    color: "var(--neon-primary)"
  },
  {
    label: "Code Written",
    value: "5000+",
    unit: "lines",
    icon: Code,
    color: "var(--neon-primary)"
  },
  {
    label: "Achievement",
    value: "1st",
    unit: "place",
    icon: Trophy,
    color: "var(--neon-primary)"
  }
];


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

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = certificateImage;
    link.download = "Brainovision-Certificate-2024.jpg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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

        .hack-card {
          position: relative;
          background: rgba(8,8,22,0.92);
          border: 2px solid rgba(0,240,255,0.32);
          border-radius: 20px;
          overflow: hidden;
          transition: all 0.5s cubic-bezier(0.23,1,0.32,1);
          max-width: 100%;
          box-sizing: border-box;
        }

        .hack-card:hover {
          transform: translateY(-16px) scale(1.03);
          border-color: var(--neon-primary);
          box-shadow: var(--neon-glow);
        }

        .hack-card::before {
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
          .hack-grid {
            grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)) !important;
            gap: 2.5rem !important;
          }
        }

        @media (max-width: 768px) {
          .hack-grid {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
          }
          .cert-showcase {
            margin: 0 auto 6rem !important;
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
          .cert-showcase img {
            max-height: 50vh !important;
            object-fit: contain !important;
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
              {'>'} hackathon.2024.load()
            </div>

            <h1 className="neon-title" style={{
              fontSize: 'clamp(3.8rem, 11vw, 7rem)',
              fontWeight: 900,
              letterSpacing: '4px',
              textTransform: 'uppercase',
              marginBottom: '1.4rem',
              lineHeight: 1.1
            }}>
              BRAINO VISION
            </h1>

            <div style={{
              fontSize: 'clamp(1.8rem, 5vw, 3.2rem)',
              fontWeight: 900,
              background: 'var(--neon-gradient)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
              marginBottom: '1.5rem'
            }}>
              NATIONAL TALENT HUNT 2024
            </div>

            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '1rem',
              padding: '1rem 2.5rem',
              background: 'rgba(0,240,255,0.12)',
              border: '2.5px solid rgba(0,240,255,0.6)',
              borderRadius: '999px',
              color: 'var(--neon-primary)',
              fontSize: '1.3rem',
              fontWeight: 800,
              marginBottom: '3rem'
            }}>
              <div className="certificate-badge">
  <Trophy size={32} />
  <span>CERTIFIED</span>
</div>

            </div>

            <p style={{
              fontSize: 'clamp(1.15rem, 3vw, 1.4rem)',
              color: '#a0a0c8',
              maxWidth: '820px',
              margin: '0 auto 4rem',
              fontFamily: "'Fira Code', monospace",
              lineHeight: 1.8
            }}>
              24-hour full-stack warfare — MERN marketplace with real-time chat,<br/>
              JWT security fortress and production-grade deployment
            </p>

            {/* Quick Stats */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '2rem',
              marginBottom: '5rem'
            }}>
              {stats.map((stat, i) => (
                <div key={i} style={{
                  padding: '2rem',
                  background: 'rgba(0,0,0,0.65)',
                  border: `2px solid ${stat.color}40`,
                  borderRadius: '20px',
                  textAlign: 'center'
                }}>
                  <stat.icon size={36} style={{ color: stat.color, marginBottom: '1rem' }} />
                  <div style={{
                    fontSize: 'clamp(2rem, 5vw, 2.8rem)',
                    fontWeight: 900,
                    color: stat.color,
                    marginBottom: '0.5rem'
                  }}>
                    {stat.value}{stat.unit && <span style={{ fontSize: '1.2rem' }}> {stat.unit}</span>}
                  </div>
                  <div style={{ color: '#b0b0d0', fontSize: '1.05rem' }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Certificate Showcase */}
          <div className="cert-showcase" style={{
            maxWidth: '1100px',
            margin: '0 auto 6rem',
            borderRadius: '28px',
            overflow: 'hidden',
            position: 'relative',
            boxShadow: '0 0 100px rgba(0,240,255,0.3)'
          }}>
            <div style={{
              position: 'absolute',
              inset: '-4px',
              background: 'conic-gradient(from 0deg at 50% 50%, #00f0ff, #a78bfa, #00f0ff)',
              borderRadius: '32px',
              animation: 'rotate 20s linear infinite',
              zIndex: -1,
              opacity: 0.7
            }} />

            <img
              src={certificateImage}
              alt="Brainovision National Championship Certificate"
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
                borderRadius: '24px'
              }}
            />

            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(0,0,0,0.85), transparent 60%)',
              pointerEvents: 'none'
            }} />
          </div>

          {/* 24-Hour Timeline */}
          <div style={{ marginBottom: '8rem' }}>
            <h2 className="neon-title" style={{
              fontSize: 'clamp(2.8rem, 6vw, 4.5rem)',
              fontWeight: 900,
              color: 'var(--neon-primary)',
              textAlign: 'center',
              marginBottom: '4rem',
              letterSpacing: '2px'
            }}>
              24-HOUR DEPLOYMENT LOG
            </h2>

            <div className="hack-grid" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: 'clamp(2rem, 5vw, 3rem)',
              width: '100%',
              maxWidth: '100%'
            }}>
              {phases.map(phase => {
                const isHovered = hoveredId === phase.id;
                const color = phase.color;

                return (
                  <div
                    key={phase.id}
                    className="hack-card"
                    onMouseEnter={() => setHoveredId(phase.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    onClick={() => setActivePhase(phase.id - 1)}
                    style={{
                      color,
                      cursor: 'pointer'
                    }}
                  >
                    <div className="card-padding" style={{ padding: 'clamp(1.8rem, 4vw, 2.4rem) clamp(1.6rem, 3.5vw, 2.2rem)' }}>
                      <div style={{
                        width: '90px',
                        height: '90px',
                        border: `3px solid ${color}`,
                        borderRadius: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 1.8rem',
                        animation: isHovered ? 'float 3s ease-in-out infinite' : 'none',
                        boxShadow: isHovered ? `0 0 50px ${color}80` : 'none'
                      }}>
                        <phase.icon size={44} />
                      </div>

                      <div style={{
                        fontSize: '1.4rem',
                        fontWeight: 800,
                        color: '#ffffff',
                        textAlign: 'center',
                        marginBottom: '1rem'
                      }}>
                        {phase.hour}
                      </div>

                      <h3 style={{
                        fontSize: 'clamp(1.6rem, 4.2vw, 1.9rem)',
                        fontWeight: 800,
                        marginBottom: '1.2rem',
                        textAlign: 'center'
                      }}>
                        {phase.title}
                      </h3>

                      <p style={{
                        fontSize: '1rem',
                        color: '#b0b0d0',
                        lineHeight: 1.7,
                        textAlign: 'center',
                        marginBottom: '2rem',
                        fontFamily: "'Fira Code', monospace"
                      }}>
                        {phase.desc}
                      </p>

                      <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1rem'
                      }}>
                        {phase.achievements.map((ach, idx) => (
                          <div key={idx} style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem',
                            padding: '1rem',
                            background: 'rgba(0,0,0,0.55)',
                            borderRadius: '14px',
                            border: `1px solid ${color}30`
                          }}>
                            <CheckCircle2 size={20} style={{ color }} />
                            {ach}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Tech Stack */}
          <div style={{ marginBottom: '8rem' }}>
            <h2 className="neon-title" style={{
              fontSize: 'clamp(2.8rem, 6vw, 4.5rem)',
              fontWeight: 900,
              color: 'var(--neon-primary)',
              textAlign: 'center',
              marginBottom: '4rem'
            }}>
              TECHNOLOGY ARSENAL
            </h2>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '2rem'
            }}>
              {techStack.map((tech, i) => (
                <div key={i} style={{
                  padding: '2.2rem',
                  background: 'rgba(0,0,0,0.65)',
                  border: `2px solid ${tech.color}40`,
                  borderRadius: '20px',
                  textAlign: 'center'
                }}>
                  <tech.icon size={48} style={{ color: tech.color, marginBottom: '1.5rem' }} />
                  <div style={{
                    fontSize: '1.6rem',
                    fontWeight: 800,
                    color: '#ffffff',
                    marginBottom: '0.6rem'
                  }}>
                    {tech.name}
                  </div>
                  <div style={{ color: '#a0a0c0', fontSize: '1.1rem' }}>
                    {tech.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
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
              READY FOR NEXT HACK?
            </h2>

            <div className="cta-buttons" style={{ 
              display: 'flex', 
              gap: '2.5rem', 
              justifyContent: 'center', 
              flexWrap: 'wrap' 
            }}>
              <button
                onClick={() => setModalOpen(true)}
                style={{
                  padding: '1.4rem 3.2rem',
                  background: 'rgba(0,240,255,0.14)',
                  border: '2.5px solid rgba(0,240,255,0.7)',
                  borderRadius: '999px',
                  color: 'var(--neon-primary)',
                  fontWeight: 700,
                  fontSize: '1.25rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1.2rem',
                  cursor: 'pointer'
                }}
              >
                <Terminal size={32} />
                VIEW FULL TIMELINE
              </button>

              <button
                onClick={handleDownload}
                style={{
                  padding: '1.4rem 3.2rem',
                  background: 'var(--neon-gradient)',
                  borderRadius: '999px',
                  color: '#000',
                  fontWeight: 900,
                  fontSize: '1.25rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1.2rem',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                <Download size={32} />
                DOWNLOAD CERTIFICATE
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ─── TIMELINE MODAL ──────────────────────────────────────────────────── */}
      {modalOpen && (
        <div
          onClick={() => setModalOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.97)',
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
              border: `4px solid var(--neon-primary)aa`,
              borderRadius: '28px',
              maxWidth: '1300px',
              width: '96%',
              maxHeight: '92vh',
              overflowY: 'auto',
              boxShadow: '0 0 160px rgba(0,240,255,0.7)',
              position: 'relative'
            }}
          >
            <button
              onClick={() => setModalOpen(false)}
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

            <div style={{ padding: 'clamp(3rem, 7vw, 5rem) clamp(2rem, 6vw, 4rem) 6rem' }}>
              <h2 style={{
                fontSize: 'clamp(2.8rem, 7vw, 4.5rem)',
                fontWeight: 900,
                background: 'var(--neon-gradient)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textAlign: 'center',
                marginBottom: '4rem',
                textShadow: '0 0 40px rgba(0,240,255,0.7)'
              }}>
                24-HOUR FULL TIMELINE
              </h2>

              {phases.map(phase => (
                <div key={phase.id} style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '2rem',
                  marginBottom: '3.5rem',
                  padding: '2.5rem',
                  background: 'rgba(0,0,0,0.55)',
                  borderRadius: '24px',
                  border: `2px solid ${phase.color}40`
                }}>
                  <div style={{
                    width: '100px',
                    height: '100px',
                    border: `3px solid ${phase.color}`,
                    borderRadius: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto',
                    flexShrink: 0
                  }}>
                    <phase.icon size={48} style={{ color: phase.color }} />
                  </div>

                  <div style={{ textAlign: 'center' }}>
                    <div style={{
                      fontSize: '1.5rem',
                      fontWeight: 800,
                      color: phase.color,
                      marginBottom: '1rem'
                    }}>
                      {phase.hour}
                    </div>

                    <h3 style={{
                      fontSize: 'clamp(1.9rem, 5vw, 2.3rem)',
                      fontWeight: 800,
                      color: '#ffffff',
                      marginBottom: '1.5rem'
                    }}>
                      {phase.title}
                    </h3>

                    <p style={{
                      fontSize: 'clamp(1.1rem, 3vw, 1.3rem)',
                      color: '#d0d0ff',
                      lineHeight: 1.7,
                      marginBottom: '2rem'
                    }}>
                      {phase.desc}
                    </p>

                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr',
                      gap: '1.2rem',
                      '@media (min-width: 768px)': { gridTemplateColumns: '1fr 1fr' }
                    }}>
                      {phase.achievements.map((ach, idx) => (
                        <div key={idx} style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '1rem',
                          padding: '1.2rem',
                          background: 'rgba(255,255,255,0.04)',
                          borderRadius: '16px',
                          border: `1px solid ${phase.color}30`
                        }}>
                          <CheckCircle2 size={22} style={{ color: phase.color }} />
                          {ach}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}