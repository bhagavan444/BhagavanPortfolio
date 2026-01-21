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
      hour: "0-6h",
      icon: Terminal,
      title: "Foundation Sprint",
      desc: "System architecture design, MongoDB schema modeling, JWT authentication core, project scaffolding, RESTful API structure planning",
      color: "#00ffff",
      achievements: ["Database Schema Design", "Auth System Core", "API Architecture", "Environment Setup"]
    },
    {
      id: 2,
      hour: "6-14h",
      icon: Code,
      title: "Core Development",
      desc: "RESTful API endpoints implementation, React component library, state management architecture, routing system, real-time features integration foundation",
      color: "#8a2be2",
      achievements: ["15+ API Endpoints", "UI Component Library", "State Management", "Routing System"]
    },
    {
      id: 3,
      hour: "14-20h",
      icon: Zap,
      title: "Integration Phase",
      desc: "Socket.io real-time chat implementation, security hardening, comprehensive error handling, data validation layers, middleware integration",
      color: "#00ffff",
      achievements: ["Real-time Chat System", "Security Hardening", "Error Handling", "Data Validation"]
    },
    {
      id: 4,
      hour: "20-24h",
      icon: Rocket,
      title: "Launch Sequence",
      desc: "Production optimization, comprehensive testing suite, performance tuning, demo preparation, cloud deployment pipeline, final documentation",
      color: "#8a2be2",
      achievements: ["Testing Suite", "Cloud Deployment", "Performance Optimization", "Documentation"]
    }
  ];

  const techStack = [
    { icon: Database, name: "MongoDB", desc: "NoSQL Database", color: "#10b981" },
    { icon: Server, name: "Express.js", desc: "Backend Framework", color: "#00ffff" },
    { icon: Sparkles, name: "React", desc: "UI Library", color: "#8b5cf6" },
    { icon: Layers, name: "Node.js", desc: "Runtime Environment", color: "#ec4899" },
    { icon: Lock, name: "JWT", desc: "Authentication", color: "#f59e0b" },
    { icon: Zap, name: "Socket.io", desc: "Real-time Engine", color: "#3b82f6" }
  ];

  const stats = [
    { label: "Duration", value: "24", unit: "hours", icon: Clock, color: "#00ffff" },
    { label: "Team Size", value: "4", unit: "members", icon: Users, color: "#8a2be2" },
    { label: "Code Lines", value: "5000+", unit: "lines", icon: Code, color: "#00ffff" },
    { label: "Rank", value: "1st", unit: "place", icon: Trophy, color: "#8a2be2" }
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

        @keyframes slideIn { from { opacity:0; transform:translateY(60px); } to { opacity:1; transform:translateY(0); } }
        @keyframes scan     { 0% { transform:translateY(-100%); } 100% { transform:translateY(100%); } }
        @keyframes float    { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-14px); } }
        @keyframes pulse    { 0%,100% { opacity:1; } 50% { opacity:0.6; } }

        .hack-card {
          position: relative;
          background: rgba(8,8,22,0.84);
          border: 2px solid rgba(0,255,255,0.24);
          border-radius: 24px;
          overflow: hidden;
          transition: all 0.5s cubic-bezier(0.23,1,0.32,1);
        }

        .hack-card:hover {
          transform: translateY(-20px) scale(1.04);
          border-color: currentColor;
          box-shadow: 0 0 80px currentColor;
        }

        .hack-card::before {
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
              {'>'} hackathon.2024.load()
            </div>

            <h1 className="neon-title" style={{
              fontSize: 'clamp(4rem, 9vw, 7rem)',
              fontWeight: 900,
              color: '#00ffff',
              letterSpacing: '5px',
              textTransform: 'uppercase',
              marginBottom: '1.8rem'
            }}>
              BRAINO VISION
            </h1>

            <div style={{
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: 900,
              background: 'linear-gradient(90deg, #00ffff, #8a2be2)',
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
              background: 'rgba(0,255,255,0.12)',
              border: '2.5px solid #00ffff60',
              borderRadius: '999px',
              color: '#00ffff',
              fontSize: '1.3rem',
              fontWeight: 800,
              marginBottom: '3rem'
            }}>
              <Trophy size={32} />
              1ST PLACE • NATIONAL CHAMPION
            </div>

            <p style={{
              fontSize: 'clamp(1.25rem, 2.8vw, 1.6rem)',
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
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '2rem',
              marginBottom: '5rem'
            }}>
              {stats.map((stat, i) => (
                <div key={i} style={{
                  padding: '2.2rem',
                  background: 'rgba(0,0,0,0.65)',
                  border: `2px solid ${stat.color}40`,
                  borderRadius: '20px',
                  textAlign: 'center'
                }}>
                  <stat.icon size={38} style={{ color: stat.color, marginBottom: '1rem' }} />
                  <div style={{
                    fontSize: '2.8rem',
                    fontWeight: 900,
                    color: stat.color,
                    marginBottom: '0.5rem'
                  }}>
                    {stat.value}{stat.unit && <span style={{ fontSize: '1.4rem' }}> {stat.unit}</span>}
                  </div>
                  <div style={{ color: '#b0b0d0', fontSize: '1.1rem' }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Certificate Showcase */}
          <div style={{
            maxWidth: '1100px',
            margin: '0 auto 8rem',
            borderRadius: '28px',
            overflow: 'hidden',
            position: 'relative',
            boxShadow: '0 0 100px rgba(0,255,255,0.3)'
          }}>
            <div style={{
              position: 'absolute',
              inset: '-4px',
              background: 'conic-gradient(from 0deg at 50% 50%, #00ffff, #8a2be2, #00ffff)',
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
              fontSize: 'clamp(3rem, 7vw, 5rem)',
              fontWeight: 900,
              color: '#00ffff',
              textAlign: 'center',
              marginBottom: '4rem',
              letterSpacing: '2px'
            }}>
              24-HOUR DEPLOYMENT LOG
            </h2>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))',
              gap: '2.5rem'
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
                      cursor: 'pointer',
                      padding: '2.2rem'
                    }}
                  >
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
                      fontSize: '1.8rem',
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
                );
              })}
            </div>
          </div>

          {/* Tech Stack */}
          <div style={{ marginBottom: '8rem' }}>
            <h2 className="neon-title" style={{
              fontSize: 'clamp(2.8rem, 6vw, 4.5rem)',
              fontWeight: 900,
              color: '#00ffff',
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
              READY FOR NEXT HACK?
            </h2>

            <div style={{ display: 'flex', gap: '2.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                onClick={() => setModalOpen(true)}
                style={{
                  padding: '1.4rem 3.2rem',
                  background: 'rgba(0,255,255,0.14)',
                  border: '2.5px solid #00ffff80',
                  borderRadius: '999px',
                  color: '#00ffff',
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
                  background: 'linear-gradient(90deg, #00ffff, #8a2be2)',
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
              border: '4px solid #00ffffaa',
              borderRadius: '32px',
              maxWidth: '1300px',
              width: '94%',
              maxHeight: '92vh',
              overflowY: 'auto',
              boxShadow: '0 0 160px #00ffff70',
              position: 'relative'
            }}
          >
            <button
              onClick={() => setModalOpen(false)}
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

            <div style={{ padding: '5rem 4rem 6rem' }}>
              <h2 style={{
                fontSize: 'clamp(3rem, 7vw, 5rem)',
                fontWeight: 900,
                color: '#00ffff',
                textAlign: 'center',
                marginBottom: '4rem',
                textShadow: '0 0 40px #00ffff90'
              }}>
                24-HOUR FULL TIMELINE
              </h2>

              {phases.map(phase => (
                <div key={phase.id} style={{
                  display: 'flex',
                  gap: '3rem',
                  marginBottom: '3.5rem',
                  padding: '2.5rem',
                  background: 'rgba(0,0,0,0.55)',
                  borderRadius: '24px',
                  border: `2px solid ${phase.color}40`
                }}>
                  <div style={{
                    width: '120px',
                    height: '120px',
                    border: `3px solid ${phase.color}`,
                    borderRadius: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <phase.icon size={52} style={{ color: phase.color }} />
                  </div>

                  <div style={{ flex: 1 }}>
                    <div style={{
                      fontSize: '1.5rem',
                      fontWeight: 800,
                      color: phase.color,
                      marginBottom: '1rem'
                    }}>
                      {phase.hour}
                    </div>

                    <h3 style={{
                      fontSize: '2.2rem',
                      fontWeight: 800,
                      color: '#ffffff',
                      marginBottom: '1.5rem'
                    }}>
                      {phase.title}
                    </h3>

                    <p style={{
                      fontSize: '1.2rem',
                      color: '#d0d0ff',
                      lineHeight: 1.7,
                      marginBottom: '2rem'
                    }}>
                      {phase.desc}
                    </p>

                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: '1.2rem'
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