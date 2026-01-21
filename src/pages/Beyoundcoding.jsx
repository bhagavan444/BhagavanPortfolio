import { useState, useEffect, useRef } from 'react';
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
    color: "#00ffff",
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
    color: "#8a2be2",
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
    color: "#00ffff",
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
    color: "#8a2be2",
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
    color: "#00ffff",
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
    color: "#8a2be2",
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
    color: "#00ffff",
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

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Fira+Code:wght@400;500;600&display=swap');

        @keyframes slideIn { from { opacity:0; transform:translateY(60px); } to { opacity:1; transform:translateY(0); } }
        @keyframes scan     { 0% { transform:translateY(-100%); } 100% { transform:translateY(100%); } }
        @keyframes float    { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-14px); } }
        @keyframes pulse    { 0%,100% { opacity:1; } 50% { opacity:0.6; } }

        .hobby-card {
          position: relative;
          background: rgba(8,8,22,0.84);
          border: 2px solid rgba(0,255,255,0.24);
          border-radius: 24px;
          overflow: hidden;
          transition: all 0.5s cubic-bezier(0.23,1,0.32,1);
        }

        .hobby-card:hover {
          transform: translateY(-20px) scale(1.04);
          border-color: currentColor;
          box-shadow: 0 0 80px currentColor;
        }

        .hobby-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, transparent 35%, rgba(0,255,255,0.15) 50%, transparent 65%);
          animation: scan 6s linear infinite;
          pointer-events: none;
          z-index: 1;
        }

        .stat-pill {
          background: rgba(0,0,0,0.72);
          border: 1.5px solid currentColor;
          padding: 0.55rem 1.15rem;
          border-radius: 999px;
          font-family: 'Fira Code',monospace;
          font-size: 0.9rem;
          transition: all 0.3s;
        }

        .stat-pill:hover {
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
              {'>'} life.balance.display()
            </div>

            <h1 className="neon-title" style={{
              fontSize: 'clamp(4rem, 9vw, 7rem)',
              fontWeight: 900,
              color: '#00ffff',
              letterSpacing: '5px',
              textTransform: 'uppercase',
              marginBottom: '1.8rem'
            }}>
              BEYOND THE CODE
            </h1>

            <p style={{
              fontSize: 'clamp(1.25rem, 2.8vw, 1.6rem)',
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
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))',
            gap: '2.5rem',
            marginBottom: '7rem'
          }}>
            {hobbiesData.map((hobby, i) => {
              const isHovered = hoveredId === i;
              const color = hobby.color || '#00ffff';

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
                    height: '5px',
                    background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
                    opacity: isHovered ? 0.95 : 0.45,
                    transition: 'opacity 0.5s'
                  }} />

                  {/* Icon showcase */}
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
                      <hobby.icon size={72} />
                    </div>
                  </div>

                  <div style={{ padding: '2.4rem 2.6rem' }}>
                    <h3 style={{
                      fontSize: '1.9rem',
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
              READY TO RECHARGE?
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
                <Code2 size={32} />
                VIEW CREATIVE PROJECTS
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
                <Heart size={32} />
                LET'S CONNECT
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ─── HOBBY DETAIL MODAL (optional - can expand later) ────────────────── */}
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
            padding: '2rem'
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: 'rgba(6,6,28,0.97)',
              border: `4px solid ${activeHobby.color || '#00ffff'}aa`,
              borderRadius: '32px',
              maxWidth: '1100px',
              width: '94%',
              maxHeight: '92vh',
              overflowY: 'auto',
              boxShadow: `0 0 160px ${(activeHobby.color || '#00ffff')}70`,
              position: 'relative'
            }}
          >
            <button
              onClick={() => setActiveHobby(null)}
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
              padding: '5rem 4rem 6rem',
              textAlign: 'center'
            }}>
              <div style={{
                width: '160px',
                height: '160px',
                margin: '0 auto 2rem',
                border: `4px solid ${activeHobby.color || '#00ffff'}`,
                borderRadius: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: `0 0 80px ${(activeHobby.color || '#00ffff')}90`
              }}>
                <activeHobby.icon size={80} style={{ color: activeHobby.color || '#00ffff' }} />
              </div>

              <h2 style={{
                fontSize: 'clamp(2.8rem, 6vw, 4.5rem)',
                fontWeight: 900,
                color: activeHobby.color || '#00ffff',
                textShadow: `0 0 40px ${(activeHobby.color || '#00ffff')}90`,
                marginBottom: '1.5rem'
              }}>
                {activeHobby.title}
              </h2>

              <p style={{
                fontSize: '1.35rem',
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
                    border: `2px solid ${(activeHobby.color || '#00ffff')}40`,
                    textAlign: 'center'
                  }}>
                    <stat.icon size={40} style={{ color: activeHobby.color || '#00ffff', marginBottom: '1rem' }} />
                    <div style={{
                      fontSize: '2.2rem',
                      fontWeight: 900,
                      color: activeHobby.color || '#00ffff'
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