import { useState, useEffect, useRef } from 'react';
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

  const stats = [
    { icon: GraduationCap, value: '8.5+', label: 'CGPA', color: '#00ffff' },
    { icon: Code, value: '30+', label: 'Technologies', color: '#8a2be2' },
    { icon: Rocket, value: '6+', label: 'Projects', color: '#00ffff' },
    { icon: Award, value: '13+', label: 'Certifications', color: '#8a2be2' }
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

        @keyframes slideIn { from { opacity:0; transform:translateY(60px); } to { opacity:1; transform:translateY(0); } }
        @keyframes scan     { 0% { transform:translateY(-100%); } 100% { transform:translateY(100%); } }
        @keyframes float    { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-14px); } }
        @keyframes pulse    { 0%,100% { opacity:1; } 50% { opacity:0.6; } }

        .stat-card {
          transition: all 0.4s cubic-bezier(0.23,1,0.32,1);
        }

        .stat-card:hover {
          transform: translateY(-12px) scale(1.04);
          box-shadow: 0 0 60px currentColor;
        }
      `}</style>

      <div style={{
        minHeight: '100vh',
        background: '#000000',
        color: '#e0e0ff',
        position: 'relative',
        overflow: 'hidden',
        padding: '8rem 2rem 6rem',
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
          maxWidth: '1600px',
          margin: '0 auto'
        }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '6rem' }}>
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
              {'>'} resume.display()
            </div>

            <h1 style={{
              fontSize: 'clamp(4rem, 9vw, 7rem)',
              fontWeight: 900,
              color: '#00ffff',
              letterSpacing: '5px',
              textTransform: 'uppercase',
              marginBottom: '1.5rem',
              textShadow: '0 0 40px #00ffff90'
            }}>
              PROFESSIONAL RESUME
            </h1>

            <p style={{
              fontSize: 'clamp(1.25rem, 2.8vw, 1.6rem)',
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
            <div style={{
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
                    fontSize: '2.2rem',
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
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 2fr',
            gap: '3rem',
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
                border: '2px solid rgba(0,255,255,0.3)',
                borderRadius: '20px'
              }}>
                <h3 style={{
                  fontSize: '1.8rem',
                  fontWeight: 800,
                  color: '#00ffff',
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

              {/* Action Buttons - bigger on mobile */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem'
              }}>
                <a
                  href={RESUME_DOWNLOAD}
                  style={{
                    padding: '1.4rem',
                    background: 'linear-gradient(90deg, #00ffff, #8a2be2)',
                    borderRadius: '999px',
                    color: '#000',
                    fontWeight: 900,
                    fontSize: '1.25rem',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '1rem',
                    boxShadow: '0 0 50px #00ffff60',
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
                    background: 'rgba(0,255,255,0.14)',
                    border: '2.5px solid #00ffff80',
                    borderRadius: '999px',
                    color: '#00ffff',
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
            <div style={{
              borderRadius: '24px',
              overflow: 'hidden',
              border: '2px solid rgba(0,255,255,0.3)',
              background: '#000',
              boxShadow: '0 0 80px rgba(0,255,255,0.3)',
              position: 'relative'
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
                  <CheckCircle2 size={20} style={{ color: '#00ffff' }} />
                  ATS Score: 92%
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1.5rem'
                }}>
                  <a href="https://linkedin.com/in/your-profile" target="_blank" style={{ color: '#00ffff' }}>
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
                  height: 'clamp(800px, 85vh, 1200px)',
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
                background: 'linear-gradient(to bottom, transparent, rgba(0,255,255,0.08), transparent)',
                height: '120px',
                animation: 'scan 6s linear infinite'
              }} />
            </div>
          </div>
        </div>

        {/* Floating CTA on mobile */}
        <div style={{
          position: 'fixed',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: '1.5rem',
          zIndex: 100,
          '@media (min-width: 768px)': { display: 'none' }
        }}>
          <button
            onClick={() => setShowModal(true)}
            style={{
              padding: '1rem 1.8rem',
              background: 'rgba(0,255,255,0.2)',
              border: '2px solid #00ffff',
              borderRadius: '999px',
              color: '#00ffff',
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
              background: 'linear-gradient(90deg, #00ffff, #8a2be2)',
              borderRadius: '999px',
              color: '#000',
              fontWeight: 900,
              display: 'flex',
              alignItems: 'center',
              gap: '0.8rem',
              boxShadow: '0 0 30px #00ffff60'
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