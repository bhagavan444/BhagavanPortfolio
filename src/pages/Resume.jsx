import { useState, useEffect, useRef } from "react";
import { 
  Download, Eye, FileText, Award, Code, Rocket, Star, Sparkles, 
  X, CheckCircle2, TrendingUp, Zap, Target, Brain, Trophy,
  GraduationCap, Calendar, MapPin, Linkedin, Github, Mail,
  Briefcase, Terminal, Database, Server, Code2, GitBranch,
  ExternalLink, Users, Cpu, Cloud
} from 'lucide-react';

const RESUME_URL = "https://drive.google.com/file/d/1BfrC-GloabR5mOXuPb8mjkKQmya5luDE/preview";
const RESUME_DOWNLOAD = "https://drive.google.com/uc?export=download&id=1BfrC-GloabR5mOXuPb8mjkKQmya5luDE";

export default function CyberpunkResume() {
  const [showModal, setShowModal] = useState(false);
  const [hoveredStat, setHoveredStat] = useState(null);
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

  const stats = [
    { icon: GraduationCap, value: '8.5+', label: 'CGPA', color: 'var(--neon-primary)' },
    { icon: Code, value: '30+', label: 'Technologies', color: 'var(--neon-primary)' },
    { icon: Rocket, value: '6+', label: 'Projects', color: 'var(--neon-primary)' },
    { icon: Award, value: '13+', label: 'Certifications', color: 'var(--neon-primary)' }
  ];

  const coreSkills = [
    { name: 'React', color: '#61DAFB' },
    { name: 'Node.js', color: '#339933' },
    { name: 'MongoDB', color: '#47A248' },
    { name: 'Python', color: '#3776AB' },
    { name: 'TensorFlow', color: '#FF6F00' },
    { name: 'TypeScript', color: '#3178C6' },
    { name: 'Next.js', color: '#000000' },
    { name: 'AWS', color: '#FF9900' }
  ];

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

        .stat-card {
          transition: all 0.4s cubic-bezier(0.23,1,0.32,1);
        }

        .stat-card:hover {
          transform: translateY(-12px) scale(1.04);
          box-shadow: var(--neon-glow);
        }

        .neon-title {
          background: var(--neon-gradient);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          text-shadow: 0 0 35px rgba(0,240,255,0.85);
        }

        /* ─── RESPONSIVE FIXES ──────────────────────────────────────── */
        @media (max-width: 1024px) {
          .main-grid {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
          }
        }

        @media (max-width: 768px) {
          .resume-preview {
            height: clamp(600px, 80vh, 900px) !important;
          }
          .stat-grid {
            grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)) !important;
            gap: 1.5rem !important;
          }
          .action-buttons {
            flex-direction: column !important;
            gap: 1.5rem !important;
          }
          .floating-cta {
            display: flex !important;
          }
        }

        @media (max-width: 480px) {
          .resume-preview {
            height: clamp(500px, 70vh, 700px) !important;
          }
          .stat-grid {
            grid-template-columns: 1fr !important;
          }
          .card-padding {
            padding: 1.6rem 1.4rem !important;
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
          <div style={{ textAlign: 'center', marginBottom: 'clamp(4rem, 10vw, 6rem)' }}>
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
              {'>'} resume.display()
            </div>

            <h1 className="neon-title" style={{
              fontSize: 'clamp(3.8rem, 11vw, 7rem)',
              fontWeight: 900,
              letterSpacing: '4px',
              textTransform: 'uppercase',
              marginBottom: '1.5rem',
              lineHeight: 1.1
            }}>
              PROFESSIONAL RESUME
            </h1>

            <p style={{
              fontSize: 'clamp(1.15rem, 3vw, 1.4rem)',
              color: '#a0a0c8',
              maxWidth: '820px',
              margin: '0 auto 3rem',
              fontFamily: "'Fira Code', monospace",
              lineHeight: 1.8
            }}>
              AI & Data Science Engineer | Full-Stack Developer<br/>
              Building intelligent, production-grade systems — 2026 edition
            </p>

            {/* Quick Stats */}
            <div className="stat-grid" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '1.5rem',
              marginBottom: '4rem'
            }}>
              {stats.map((stat, i) => (
                <div
                  key={i}
                  className="stat-card"
                  onMouseEnter={() => setHoveredStat(i)}
                  onMouseLeave={() => setHoveredStat(null)}
                  style={{
                    padding: '1.8rem',
                    background: 'rgba(0,0,0,0.65)',
                    border: `2px solid ${stat.color}40`,
                    borderRadius: '16px',
                    textAlign: 'center',
                    boxShadow: hoveredStat === i ? `0 0 50px ${stat.color}60` : 'none'
                  }}
                >
                  <stat.icon size={36} style={{ color: stat.color, marginBottom: '1rem' }} />
                  <div style={{
                    fontSize: 'clamp(1.8rem, 5vw, 2.2rem)',
                    fontWeight: 900,
                    color: stat.color
                  }}>
                    {stat.value}
                  </div>
                  <div style={{ color: '#b0b0d0', fontSize: '1.1rem' }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Main Content - Mobile: stacked, Desktop: side-by-side */}
          <div className="main-grid" style={{
            display: 'grid',
            gridTemplateColumns: '1fr 2fr',
            gap: 'clamp(2rem, 5vw, 3rem)',
            '@media (max-width: 1024px)': {
              gridTemplateColumns: '1fr'
            }
          }}>
            {/* Left Column - Info & Actions (stacks first on mobile) */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '2.5rem'
            }}>
              {/* Core Skills */}
              <div style={{
                padding: '2.2rem',
                background: 'rgba(0,0,0,0.65)',
                border: '2px solid rgba(0,240,255,0.3)',
                borderRadius: '20px'
              }}>
                <h3 style={{
                  fontSize: 'clamp(1.6rem, 4.5vw, 1.9rem)',
                  fontWeight: 800,
                  color: 'var(--neon-primary)',
                  marginBottom: '1.8rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem'
                }}>
                  <Brain size={28} />
                  Core Stack
                </h3>

                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.8rem'
                }}>
                  {coreSkills.map((skill, i) => (
                    <span
                      key={i}
                      style={{
                        padding: '0.7rem 1.4rem',
                        background: 'rgba(0,0,0,0.55)',
                        border: `1.5px solid ${skill.color}50`,
                        borderRadius: '999px',
                        fontSize: '0.95rem',
                        fontWeight: 600,
                        color: '#e0e0ff'
                      }}
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="action-buttons" style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem'
              }}>
                <a
                  href={RESUME_DOWNLOAD}
                  style={{
                    padding: '1.4rem',
                    background: 'var(--neon-gradient)',
                    borderRadius: '999px',
                    color: '#000',
                    fontWeight: 900,
                    fontSize: '1.25rem',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '1rem',
                    boxShadow: '0 0 50px rgba(0,240,255,0.6)',
                    transition: 'all 0.4s'
                  }}
                >
                  <Download size={28} />
                  Download Resume
                </a>

                <button
                  onClick={() => setShowModal(true)}
                  style={{
                    padding: '1.4rem',
                    background: 'rgba(0,240,255,0.14)',
                    border: '2.5px solid rgba(0,240,255,0.7)',
                    borderRadius: '999px',
                    color: 'var(--neon-primary)',
                    fontWeight: 700,
                    fontSize: '1.25rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '1rem',
                    cursor: 'pointer'
                  }}
                >
                  <Eye size={28} />
                  View Fullscreen
                </button>
              </div>
            </div>

            {/* Right Column - Resume Preview (full width on mobile) */}
            <div className="resume-preview" style={{
              borderRadius: '24px',
              overflow: 'hidden',
              border: '2px solid rgba(0,240,255,0.3)',
              background: '#000',
              boxShadow: '0 0 80px rgba(0,240,255,0.3)',
              position: 'relative',
              height: 'clamp(700px, 85vh, 1200px)'
            }}>
              {/* Status Bar */}
              <div style={{
                position: 'absolute',
                top: 0, left: 0, right: 0,
                padding: '1rem 2rem',
                background: 'rgba(0,0,0,0.7)',
                backdropFilter: 'blur(12px)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                zIndex: 20,
                flexWrap: 'wrap',
                gap: '1rem'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  fontSize: '1rem'
                }}>
                  <CheckCircle2 size={20} style={{ color: 'var(--neon-primary)' }} />
                  ATS Score: 92%
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1.5rem'
                }}>
                  <a href="https://linkedin.com/in/your-profile" target="_blank" style={{ color: 'var(--neon-primary)' }}>
                    <Linkedin size={22} />
                  </a>
                  <a href="https://github.com/bhagavan444" target="_blank" style={{ color: '#ffffff' }}>
                    <Github size={22} />
                  </a>
                </div>
              </div>

              {/* Resume iframe */}
              <iframe
                src={RESUME_URL}
                style={{
                  width: '100%',
                  height: '100%',
                  border: 'none',
                  background: '#fff'
                }}
                title="Professional Resume 2026"
                allowFullScreen
              />

              {/* Scanline overlay */}
              <div style={{
                position: 'absolute',
                inset: 0,
                pointerEvents: 'none',
                background: 'linear-gradient(to bottom, transparent, rgba(0,240,255,0.08), transparent)',
                height: '120px',
                animation: 'scan 6s linear infinite'
              }} />
            </div>
          </div>
        </div>

        {/* Floating CTA on mobile */}
        <div className="floating-cta" style={{
          position: 'fixed',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'none',
          gap: '1.5rem',
          zIndex: 100
        }}>
          <button
            onClick={() => setShowModal(true)}
            style={{
              padding: '1rem 1.8rem',
              background: 'rgba(0,240,255,0.2)',
              border: '2px solid var(--neon-primary)',
              borderRadius: '999px',
              color: 'var(--neon-primary)',
              fontWeight: 700,
              backdropFilter: 'blur(12px)'
            }}
          >
            <Eye size={24} />
          </button>

          <a
            href={RESUME_DOWNLOAD}
            style={{
              padding: '1rem 2rem',
              background: 'var(--neon-gradient)',
              borderRadius: '999px',
              color: '#000',
              fontWeight: 900,
              display: 'flex',
              alignItems: 'center',
              gap: '0.8rem',
              boxShadow: '0 0 30px rgba(0,240,255,0.6)'
            }}
          >
            <Download size={24} />
            Download
          </a>
        </div>
      </div>

      {/* ─── FULLSCREEN MODAL ────────────────────────────────────────────────── */}
      {showModal && (
        <div
          onClick={() => setShowModal(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.96)',
            backdropFilter: 'blur(16px)',
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
              title="Resume - Fullscreen View"
              allowFullScreen
            />

            <button
              onClick={() => setShowModal(false)}
              style={{
                position: 'absolute',
                top: '1.5rem',
                right: '1.5rem',
                width: '60px',
                height: '60px',
                background: 'rgba(255,80,80,0.9)',
                borderRadius: '50%',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 0 30px rgba(255,80,80,0.6)',
                zIndex: 10
              }}
            >
              <X size={32} color="#fff" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}