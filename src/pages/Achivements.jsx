import { useState, useEffect, useRef } from "react";
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
    color: "#00ffff",
  },
  {
    id: 2,
    icon: Award,
    title: "Industry Certifications",
    highlight: "15+ Professional Credentials",
    description:
      "Earned 15+ industry-recognized certifications spanning Generative AI, Machine Learning, Cloud Computing, MERN Stack, DevOps, Data Science, and Software Engineering fundamentals...",
    color: "#8a2be2",
  },
  {
    id: 3,
    icon: Users,
    title: "Technical Workshop Participation",
    highlight: "Applied Learning & Collaboration",
    description:
      "Actively participated in hands-on technical workshops focused on Machine Learning, Deep Learning, Full-Stack Web Development, and Mobile Application Development...",
    color: "#00ffff",
  },
  {
    id: 4,
    icon: Target,
    title: "Production-Grade Project Delivery",
    highlight: "End-to-End Execution",
    description:
      "Successfully designed, developed, and delivered 8+ end-to-end projects across AI/ML and full-stack domains. Implemented JWT-secured APIs, OAuth-based authentication...",
    color: "#8a2be2",
  }
];

const metrics = [
  { label: "Production Projects", value: "5+", icon: Rocket, color: "#00ffff" },
  { label: "Technologies Mastered", value: "30+", icon: Zap, color: "#8a2be2" },
  { label: "Total Lines of Code", value: "10K+", icon: Code2, color: "#00ffff" },
  { label: "Problem-Solving Rating", value: "4★", icon: Medal, color: "#8a2be2" }
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

        .achieve-card {
          position: relative;
          background: rgba(8,8,22,0.84);
          border: 2px solid rgba(0,255,255,0.24);
          border-radius: 24px;
          overflow: hidden;
          transition: all 0.5s cubic-bezier(0.23,1,0.32,1);
        }

        .achieve-card:hover {
          transform: translateY(-20px) scale(1.04);
          border-color: currentColor;
          box-shadow: 0 0 80px currentColor;
        }

        .achieve-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, transparent 35%, rgba(0,255,255,0.15) 50%, transparent 65%);
          animation: scan 6s linear infinite;
          pointer-events: none;
          z-index: 1;
        }

        .metric-pill {
          background: rgba(0,0,0,0.72);
          border: 1.5px solid currentColor;
          padding: 0.55rem 1.15rem;
          border-radius: 999px;
          font-family: 'Fira Code',monospace;
          font-size: 0.9rem;
          transition: all 0.3s;
        }

        .metric-pill:hover {
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
              {'>'} achievements.unlock()
            </div>

            <h1 className="neon-title" style={{
              fontSize: 'clamp(4rem, 9vw, 7rem)',
              fontWeight: 900,
              color: '#00ffff',
              letterSpacing: '5px',
              textTransform: 'uppercase',
              marginBottom: '1.8rem'
            }}>
              PROOF OF IMPACT
            </h1>

            <p style={{
              fontSize: 'clamp(1.25rem, 2.8vw, 1.6rem)',
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
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '2rem',
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
                    padding: '2rem',
                    background: 'rgba(0,0,0,0.65)',
                    border: `2px solid ${color}40`,
                    borderRadius: '20px',
                    textAlign: 'center',
                    boxShadow: isHovered ? `0 0 60px ${color}60` : 'none',
                    transition: 'all 0.4s'
                  }}
                >
                  <metric.icon size={44} style={{ color, marginBottom: '1.2rem' }} />
                  <div style={{
                    fontSize: '2.4rem',
                    fontWeight: 900,
                    color,
                    marginBottom: '0.6rem'
                  }}>
                    {metric.value}
                  </div>
                  <div style={{ color: '#b0b0d0', fontSize: '1.1rem' }}>
                    {metric.label}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Achievements Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))',
            gap: '3rem',
            marginBottom: '7rem'
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
                    animation: `slideIn ${0.6 + i * 0.15}s ease-out`,
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
                      <ach.icon size={72} />
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
              CONTINUE EXECUTING?
            </h2>

            <div style={{ display: 'flex', gap: '2.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="#projects" style={{
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
                <Rocket size={32} />
                SEE LIVE PROJECTS
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