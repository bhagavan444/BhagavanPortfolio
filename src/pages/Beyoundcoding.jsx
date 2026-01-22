import { useState, useEffect, useRef } from "react";
import { 
  BookOpen, Music, Coffee, Dumbbell, Camera, Film, Gamepad2, 
  Sparkles, Zap, TrendingUp, Heart, Brain, Code2, Rocket, Crown, 
  Flame, Star, Target, Award, Volume2, Timer, Activity, X, CheckCircle2 
} from "lucide-react";

const hobbiesData = [
  { 
    title: "Reading", 
    desc: "Deep diving into software architecture and system design",
    icon: BookOpen, 
    color: "var(--neon-primary)",
    stats: [
      { label: "Books/Year", value: "24+", icon: BookOpen },
      { label: "Topics", value: "Tech", icon: Target },
      { label: "Impact", value: "High", icon: Award }
    ]
  },
  { 
    title: "Music", 
    desc: "Enhancing focus and creativity through rhythm",
    icon: Music, 
    color: "var(--neon-primary)",
    stats: [
      { label: "Daily Hours", value: "4+", icon: Timer },
      { label: "Genres", value: "Various", icon: Volume2 },
      { label: "Boost", value: "200%", icon: Activity }
    ]
  },
  { 
    title: "Coffee", 
    desc: "Fueling late-night coding marathons",
    icon: Coffee, 
    color: "var(--neon-primary)",
    stats: [
      { label: "Cups/Day", value: "3+", icon: Coffee },
      { label: "Type", value: "Espresso", icon: Zap },
      { label: "Energy", value: "∞", icon: Rocket }
    ]
  },
  { 
    title: "Gaming", 
    desc: "Sharpening strategic thinking and reflexes",
    icon: Gamepad2, 
    color: "var(--neon-primary)",
    stats: [
      { label: "Strategy", value: "95%", icon: Brain },
      { label: "Reflexes", value: "88%", icon: Zap },
      { label: "Focus", value: "92%", icon: Target }
    ]
  },
  { 
    title: "Movies", 
    desc: "Learning storytelling and user experience",
    icon: Film, 
    color: "var(--neon-primary)",
    stats: [
      { label: "Weekly", value: "5+", icon: Film },
      { label: "Genres", value: "All", icon: Star },
      { label: "Learning", value: "UX", icon: Brain }
    ]
  },
  { 
    title: "Fitness", 
    desc: "Building mental clarity through physical strength",
    icon: Dumbbell, 
    color: "var(--neon-primary)",
    stats: [
      { label: "Weekly", value: "5x", icon: Dumbbell },
      { label: "Strength", value: "90%", icon: TrendingUp },
      { label: "Clarity", value: "100%", icon: Brain }
    ]
  },
  { 
    title: "Photography", 
    desc: "Capturing moments and visual composition",
    icon: Camera, 
    color: "var(--neon-primary)",
    stats: [
      { label: "Photos", value: "500+", icon: Camera },
      { label: "Style", value: "Urban", icon: Star },
      { label: "Skill", value: "Pro", icon: Award }
    ]
  },
];

export default function CyberpunkBeyondCoding() {
  const [activeHobby, setActiveHobby] = useState(null);
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

        .hobby-card {
          position: relative;
          background: rgba(8,8,22,0.92);
          border: 2px solid rgba(0,240,255,0.32);
          border-radius: 20px;
          overflow: hidden;
          transition: all 0.5s cubic-bezier(0.23,1,0.32,1);
          max-width: 100%;
          box-sizing: border-box;
        }

        .hobby-card:hover {
          transform: translateY(-16px) scale(1.03);
          border-color: var(--neon-primary);
          box-shadow: var(--neon-glow);
        }

        .hobby-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, transparent 35%, rgba(0,240,255,0.15) 50%, transparent 65%);
          animation: scan 7s linear infinite;
          pointer-events: none;
          z-index: 1;
        }

        .stat-pill {
          background: rgba(0,0,0,0.78);
          border: 1.6px solid var(--neon-primary);
          padding: 0.5rem 1rem;
          border-radius: 999px;
          font-family: 'Fira Code',monospace;
          font-size: 0.86rem;
          transition: all 0.3s;
          color: #e0f7ff;
        }

        .stat-pill:hover {
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
          .hobby-grid {
            grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)) !important;
            gap: 2.5rem !important;
          }
        }

        @media (max-width: 768px) {
          .hobby-grid {
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
          .stat-pill {
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
              {'>'} life.balance.display()
            </div>

            <h1 className="neon-title" style={{
              fontSize: 'clamp(3.8rem, 11vw, 7rem)',
              fontWeight: 900,
              letterSpacing: '4px',
              textTransform: 'uppercase',
              marginBottom: '1.4rem',
              lineHeight: 1.1
            }}>
              BEYOND THE CODE
            </h1>

            <p style={{
              fontSize: 'clamp(1.15rem, 3vw, 1.4rem)',
              color: '#a0a0c8',
              maxWidth: '820px',
              margin: '0 auto',
              fontFamily: "'Fira Code', monospace",
              lineHeight: 1.8
            }}>
              [ Fueling creativity • sharpening focus • sustaining excellence ]<br/>
              The human side of the machine — 2026 protocol
            </p>
          </div>

          {/* Hobbies Grid */}
          <div className="hobby-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 'clamp(2rem, 5vw, 3.2rem)',
            marginBottom: '7rem',
            width: '100%',
            maxWidth: '100%'
          }}>
            {hobbiesData.map((hobby, i) => {
              const isHovered = hoveredId === i;
              const color = hobby.color || 'var(--neon-primary)';

              return (
                <div
                  key={i}
                  className="hobby-card"
                  onMouseEnter={() => setHoveredId(i)}
                  onMouseLeave={() => setHoveredId(null)}
                  onClick={() => setActiveHobby(hobby)}
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

                  {/* Icon showcase */}
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
                      <hobby.icon size={72} />
                    </div>
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
                      {hobby.title}
                    </h3>

                    <p style={{
                      fontSize: '1rem',
                      color: '#b0b0d0',
                      lineHeight: 1.7,
                      textAlign: 'center',
                      marginBottom: '2rem',
                      fontFamily: "'Fira Code', monospace"
                    }}>
                      {hobby.desc}
                    </p>

                    {/* Stats pills */}
                    <div style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '0.8rem',
                      justifyContent: 'center',
                      marginBottom: '2rem'
                    }}>
                      {hobby.stats.map((stat, idx) => (
                        <span
                          key={idx}
                          className="stat-pill"
                          style={{
                            color: isHovered ? color : '#8888bb',
                            borderColor: isHovered ? color : '#555577'
                          }}
                        >
                          <stat.icon size={16} style={{ marginRight: '0.5rem', verticalAlign: 'middle' }} />
                          {stat.value} {stat.label}
                        </span>
                      ))}
                    </div>

                    {/* Action */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveHobby(hobby);
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
                      <Sparkles size={22} />
                      Dive Deeper
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
              READY TO RECHARGE?
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
                <Code2 size={32} />
                VIEW CREATIVE PROJECTS
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
                <Heart size={32} />
                LET'S CONNECT
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ─── HOBBY DETAIL MODAL ──────────────────────────────────────────────── */}
      {activeHobby && (
        <div
          onClick={() => setActiveHobby(null)}
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
              border: `4px solid ${activeHobby.color || 'var(--neon-primary)'}aa`,
              borderRadius: '28px',
              maxWidth: '1100px',
              width: '96%',
              maxHeight: '92vh',
              overflowY: 'auto',
              boxShadow: `0 0 160px ${(activeHobby.color || 'var(--neon-primary)')}70`,
              position: 'relative'
            }}
          >
            <button
              onClick={() => setActiveHobby(null)}
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
              padding: 'clamp(3rem, 7vw, 5rem) clamp(2rem, 6vw, 4rem) 6rem',
              textAlign: 'center'
            }}>
              <div style={{
                width: '160px',
                height: '160px',
                margin: '0 auto 2rem',
                border: `4px solid ${activeHobby.color || 'var(--neon-primary)'}`,
                borderRadius: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: `0 0 80px ${(activeHobby.color || 'var(--neon-primary)')}90`
              }}>
                <activeHobby.icon size={80} style={{ color: activeHobby.color || 'var(--neon-primary)' }} />
              </div>

              <h2 style={{
                fontSize: 'clamp(2.8rem, 7vw, 4.5rem)',
                fontWeight: 900,
                background: 'var(--neon-gradient)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: `0 0 40px ${(activeHobby.color || 'var(--neon-primary)')}90`,
                marginBottom: '1.5rem'
              }}>
                {activeHobby.title}
              </h2>

              <p style={{
                fontSize: 'clamp(1.25rem, 3.5vw, 1.45rem)',
                lineHeight: 1.8,
                color: '#c8d0ff',
                marginBottom: '3rem'
              }}>
                {activeHobby.desc}
              </p>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '2rem'
              }}>
                {activeHobby.stats.map((stat, idx) => (
                  <div key={idx} style={{
                    padding: '2rem',
                    background: 'rgba(255,255,255,0.05)',
                    borderRadius: '20px',
                    border: `2px solid ${(activeHobby.color || 'var(--neon-primary)')}40`,
                    textAlign: 'center'
                  }}>
                    <stat.icon size={40} style={{ color: activeHobby.color || 'var(--neon-primary)', marginBottom: '1rem' }} />
                    <div style={{
                      fontSize: '2.2rem',
                      fontWeight: 900,
                      color: activeHobby.color || 'var(--neon-primary)'
                    }}>
                      {stat.value}
                    </div>
                    <div style={{ color: '#b0b0ff', fontSize: '1.1rem', marginTop: '0.5rem' }}>
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}