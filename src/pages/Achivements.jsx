import { useState, useEffect, useRef } from 'react';
import { 
  Trophy, Award, Users, Target, TrendingUp, Zap, Star, Medal,
  Sparkles, X, CheckCircle2, Rocket, Brain, Code2, Flame
} from "lucide-react";

const achievements = [
  {
    id: 1,
    icon: Trophy,
    title: "National Hackathon Champion",
    highlight: "24-Hour High-Pressure Build",
    description:
      "Selected as a core full-stack developer in a national-level 24-hour hackathon. Designed system architecture, implemented authentication flows, built REST APIs, and developed responsive React interfaces for a MERN-based electronics marketplace...",
    color: "var(--neon-primary)",
  },
  {
    id: 2,
    icon: Award,
    title: "Industry Certifications",
    highlight: "15+ Professional Credentials",
    description:
      "Earned 15+ industry-recognized certifications spanning Generative AI, Machine Learning, Cloud Computing, MERN Stack, DevOps, Data Science, and Software Engineering fundamentals...",
    color: "var(--neon-primary)",
  },
  {
    id: 3,
    icon: Users,
    title: "Technical Workshop Participation",
    highlight: "Applied Learning & Collaboration",
    description:
      "Actively participated in hands-on technical workshops focused on Machine Learning, Deep Learning, Full-Stack Web Development, and Mobile Application Development...",
    color: "var(--neon-primary)",
  },
  {
    id: 4,
    icon: Target,
    title: "Production-Grade Project Delivery",
    highlight: "End-to-End Execution",
    description:
      "Successfully designed, developed, and delivered 8+ end-to-end projects across AI/ML and full-stack domains. Implemented JWT-secured APIs, OAuth-based authentication...",
    color: "var(--neon-primary)",
  }
];

const metrics = [
  { label: "Production Projects", value: "5+", icon: Rocket, color: "var(--neon-primary)" },
  { label: "Technologies Mastered", value: "30+", icon: Zap, color: "var(--neon-primary)" },
  { label: "Total Lines of Code", value: "10K+", icon: Code2, color: "var(--neon-primary)" },
  { label: "Problem-Solving Rating", value: "4★", icon: Medal, color: "var(--neon-primary)" }
];

export default function CyberpunkAchievements() {
  const [hoveredId, setHoveredId] = useState(null);
  const [activeMetric, setActiveMetric] = useState(null);
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

        .achieve-card {
          position: relative;
          background: rgba(8,8,22,0.92);
          border: 2px solid rgba(0,240,255,0.32);
          border-radius: 20px;
          overflow: hidden;
          transition: all 0.5s cubic-bezier(0.23,1,0.32,1);
          max-width: 100%;
          box-sizing: border-box;
        }

        .achieve-card:hover {
          transform: translateY(-16px) scale(1.03);
          border-color: var(--neon-primary);
          box-shadow: var(--neon-glow);
        }

        .achieve-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, transparent 35%, rgba(0,240,255,0.15) 50%, transparent 65%);
          animation: scan 7s linear infinite;
          pointer-events: none;
          z-index: 1;
        }

        .metric-pill {
          background: rgba(0,0,0,0.78);
          border: 1.6px solid var(--neon-primary);
          padding: 0.5rem 1rem;
          border-radius: 999px;
          font-family: 'Fira Code',monospace;
          font-size: 0.86rem;
          transition: all 0.3s;
          color: #e0f7ff;
        }

        .metric-pill:hover {
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
          .achieve-grid {
            grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)) !important;
            gap: 2.5rem !important;
          }
          .metrics-grid {
            grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)) !important;
            gap: 1.5rem !important;
          }
        }

        @media (max-width: 768px) {
          .achieve-grid {
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
          .metric-pill {
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
              {'>'} achievements.unlock()
            </div>

            <h1 className="neon-title" style={{
              fontSize: 'clamp(3.8rem, 11vw, 7rem)',
              fontWeight: 900,
              letterSpacing: '4px',
              textTransform: 'uppercase',
              marginBottom: '1.4rem',
              lineHeight: 1.1
            }}>
              PROOF OF IMPACT
            </h1>

            <p style={{
              fontSize: 'clamp(1.15rem, 3vw, 1.4rem)',
              color: '#a0a0c8',
              maxWidth: '820px',
              margin: '0 auto',
              fontFamily: "'Fira Code', monospace",
              lineHeight: 1.8
            }}>
              [ National wins • certifications • production delivery ]<br/>
              Execution velocity logged — 2026 edition
            </p>
          </div>

          {/* Metrics Grid */}
          <div className="metrics-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: '1.5rem',
            marginBottom: '7rem'
          }}>
            {metrics.map((metric, i) => {
              const isHovered = activeMetric === i;
              const color = metric.color;

              return (
                <div
                  key={i}
                  onMouseEnter={() => setActiveMetric(i)}
                  onMouseLeave={() => setActiveMetric(null)}
                  style={{
                    padding: '1.8rem',
                    background: 'rgba(0,0,0,0.65)',
                    border: `2px solid ${color}40`,
                    borderRadius: '16px',
                    textAlign: 'center',
                    boxShadow: isHovered ? `0 0 50px ${color}60` : 'none',
                    transition: 'all 0.4s'
                  }}
                >
                  <metric.icon size={36} style={{ color, marginBottom: '1rem' }} />
                  <div style={{
                    fontSize: 'clamp(1.8rem, 5vw, 2.4rem)',
                    fontWeight: 900,
                    color,
                    marginBottom: '0.6rem'
                  }}>
                    {metric.value}
                  </div>
                  <div style={{ color: '#b0b0d0', fontSize: '1.05rem' }}>
                    {metric.label}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Achievements Grid */}
          <div className="achieve-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 'clamp(2rem, 5vw, 3.2rem)',
            marginBottom: '7rem',
            width: '100%',
            maxWidth: '100%'
          }}>
            {achievements.map((ach, i) => {
              const isHovered = hoveredId === ach.id;
              const color = ach.color;

              return (
                <div
                  key={ach.id}
                  className="achieve-card"
                  onMouseEnter={() => setHoveredId(ach.id)}
                  onMouseLeave={() => setHoveredId(null)}
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
                      <ach.icon size={72} />
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
                      {ach.title}
                    </h3>

                    <div style={{
                      fontSize: '1.3rem',
                      fontWeight: 700,
                      color,
                      textAlign: 'center',
                      marginBottom: '1.5rem'
                    }}>
                      {ach.highlight}
                    </div>

                    <p style={{
                      fontSize: '1rem',
                      color: '#b0b0d0',
                      lineHeight: 1.7,
                      textAlign: 'center',
                      marginBottom: '2rem',
                      fontFamily: "'Fira Code', monospace"
                    }}>
                      {ach.description}
                    </p>

                    {/* Action button */}
                    <button
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
                      View Full Achievement
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
              CONTINUE EXECUTING?
            </h2>

            <div className="cta-buttons" style={{ 
              display: 'flex', 
              gap: '2.5rem', 
              justifyContent: 'center', 
              flexWrap: 'wrap' 
            }}>
              <a href="#projects" style={{
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
                <Rocket size={32} />
                SEE LIVE PROJECTS
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
                <Brain size={32} />
                LET'S COLLABORATE
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}