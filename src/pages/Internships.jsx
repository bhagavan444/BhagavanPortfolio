import React, { useState, useEffect, useRef } from 'react';
import {
  Code, Brain, Database, Terminal, Award, ExternalLink, X,
  CheckCircle2, Layers, Sparkles, Zap, Github
} from 'lucide-react';

const internships = [
  {
    id: 1,
    title: "MERN Stack Intern",
    company: "StudyOwl Education Pvt Ltd",
    period: "May – July 2025",
    badge: "Full-Stack Pro",
    certId: "1bwbNlc9mdPYQOIyUpoiBIOhpyxaMBvbC",
    color: "#00ffff",
    tech: ["MongoDB", "Express", "React", "Node.js", "JWT"],
    achievements: ["Built 3+ Apps", "JWT Auth", "REST APIs", "Cloud Deploy"],
    icon: Code
  },
  {
    id: 2,
    title: "AI/ML Intern",
    company: "SmartBridge (Remote)",
    period: "May – June 2025",
    badge: "AI Engineer",
    certId: "1-_8ZI8uZ3DcrFpfZ3pts7VSYrAqPN5Zw",
    color: "#8a2be2",
    tech: ["Python", "TensorFlow", "Scikit-learn", "CNN", "Flask"],
    achievements: ["5+ Models", "CNNs", "85%+ Accuracy", "Deployment"],
    icon: Brain
  },
  {
    id: 3,
    title: "ML & Data Science Intern",
    company: "Blackbucks (Remote)",
    period: "May – June 2024",
    badge: "Data Specialist",
    certId: "1yQQqBf32o8d3sYlheDCdaLTKj5_hepfY",
    color: "#00ffff",
    tech: ["Python", "Pandas", "Scikit-learn", "Data Analysis"],
    achievements: ["ML Models", "Data Preprocessing", "Feature Engineering", "Model Evaluation"],
    icon: Database
  }
];

export default function CyberpunkInternships() {
  const [hoveredId, setHoveredId] = useState(null);
  const [activeCert, setActiveCert] = useState(null);
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

  const getCertificateUrl = (id) =>
    `https://drive.google.com/thumbnail?id=${id}&sz=w1000`;

  const getViewUrl = (id) =>
    `https://drive.google.com/file/d/${id}/view`;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Fira+Code:wght@400;500;600&display=swap');

        @keyframes slideIn { from { opacity:0; transform:translateY(60px); } to { opacity:1; transform:translateY(0); } }
        @keyframes scan     { 0% { transform:translateY(-100%); } 100% { transform:translateY(100%); } }
        @keyframes float    { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-14px); } }
        @keyframes pulse    { 0%,100% { opacity:1; } 50% { opacity:0.6; } }
        @keyframes glitch   { 0%,100% { transform:translate(0); } 20% { transform:translate(-2px,2px); } 40% { transform:translate(2px,-2px); } }

        .intern-card {
          position: relative;
          background: rgba(8,8,22,0.84);
          border: 2px solid rgba(0,255,255,0.24);
          border-radius: 24px;
          overflow: hidden;
          transition: all 0.5s cubic-bezier(0.23,1,0.32,1);
        }

        .intern-card:hover {
          transform: translateY(-20px) scale(1.04);
          border-color: currentColor;
          box-shadow: 0 0 80px currentColor;
        }

        .intern-card::before {
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
              {'>'} experience.load()
            </div>

            <h1 className="neon-title" style={{
              fontSize: 'clamp(4rem, 9vw, 7rem)',
              fontWeight: 900,
              color: '#00ffff',
              letterSpacing: '5px',
              textTransform: 'uppercase',
              marginBottom: '1.8rem'
            }}>
              INTERNSHIP LOG
            </h1>

            <p style={{
              fontSize: 'clamp(1.25rem, 2.8vw, 1.6rem)',
              color: '#a0a0c8',
              maxWidth: '820px',
              margin: '0 auto',
              fontFamily: "'Fira Code', monospace",
              lineHeight: 1.8
            }}>
              [ Real-world deployment logs • Production-grade training ]<br/>
              Forged in industry — 20XX–2025 protocol
            </p>
          </div>

          {/* Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))',
            gap: '3rem',
            marginBottom: '7rem'
          }}>
            {internships.map((intern, i) => {
              const isHovered = hoveredId === intern.id;
              const color = intern.color;

              return (
                <div
                  key={intern.id}
                  className="intern-card"
                  onMouseEnter={() => setHoveredId(intern.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  style={{
                    color,
                    animation: `slideIn ${0.6 + i * 0.15}s ease-out`,
                    opacity: 0,
                    animationFillMode: 'forwards',
                    cursor: 'pointer'
                  }}
                >
                  {/* Top scan */}
                  <div style={{
                    position: 'absolute',
                    top: 0, left: 0, right: 0,
                    height: '5px',
                    background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
                    opacity: isHovered ? 0.95 : 0.45,
                    transition: 'opacity 0.5s'
                  }} />

                  {/* Certificate preview */}
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveCert(intern);
                    }}
                    style={{
                      height: '260px',
                      position: 'relative',
                      overflow: 'hidden',
                      cursor: 'pointer'
                    }}
                  >
                    <img
                      src={`https://drive.google.com/thumbnail?id=${intern.certId}&sz=w1000`}
                      alt={`${intern.title} Certificate`}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.7s',
                        transform: isHovered ? 'scale(1.12)' : 'scale(1.04)'
                      }}
                    />
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to top, rgba(0,0,0,0.92) 0%, transparent 60%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      opacity: isHovered ? 1 : 0.3,
                      transition: 'opacity 0.5s'
                    }}>
                      <div style={{
                        padding: '1rem 2.2rem',
                        background: 'rgba(0,0,0,0.75)',
                        backdropFilter: 'blur(12px)',
                        border: `2px solid ${color}`,
                        borderRadius: '999px',
                        color: '#fff',
                        fontWeight: 700,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.8rem'
                      }}>
                        <Award size={20} />
                        View Certificate
                      </div>
                    </div>
                  </div>

                  <div style={{ padding: '2.4rem 2.6rem' }}>
                    {/* Icon + Badge */}
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '1.8rem'
                    }}>
                      <div style={{
                        width: '80px',
                        height: '80px',
                        border: `3px solid ${color}`,
                        borderRadius: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '2.8rem',
                        animation: isHovered ? 'float 3s ease-in-out infinite' : 'none',
                        boxShadow: isHovered ? `0 0 44px ${color}90` : 'none'
                      }}>
                        <intern.icon size={40} />
                      </div>

                      <div style={{
                        padding: '0.6rem 1.4rem',
                        background: `${color}20`,
                        border: `2px solid ${color}70`,
                        borderRadius: '999px',
                        fontSize: '0.95rem',
                        fontWeight: 700,
                        color
                      }}>
                        {intern.badge}
                      </div>
                    </div>

                    <h3 style={{
                      fontSize: '1.9rem',
                      fontWeight: 800,
                      color: '#ffffff',
                      marginBottom: '0.8rem'
                    }}>
                      {intern.title}
                    </h3>

                    <div style={{
                      fontSize: '1.1rem',
                      color: '#b0b0d8',
                      marginBottom: '0.4rem',
                      fontFamily: "'Fira Code', monospace"
                    }}>
                      {intern.company}
                    </div>

                    <div style={{
                      fontSize: '1rem',
                      color,
                      fontWeight: 600,
                      marginBottom: '2rem'
                    }}>
                      {intern.period}
                    </div>

                    {/* Tech pills */}
                    <div style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '0.7rem',
                      marginBottom: '2.2rem'
                    }}>
                      {intern.tech.map(t => (
                        <span
                          key={t}
                          className="tech-pill"
                          style={{
                            color: isHovered ? color : '#8888bb',
                            borderColor: isHovered ? color : '#555577'
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Achievements */}
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: '1rem',
                      marginBottom: '2.4rem'
                    }}>
                      {intern.achievements.map((ach, idx) => (
                        <div
                          key={idx}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.9rem',
                            padding: '0.9rem',
                            background: 'rgba(255,255,255,0.04)',
                            borderRadius: '14px',
                            border: `1px solid ${color}30`,
                            fontSize: '0.98rem'
                          }}
                        >
                          <CheckCircle2 size={18} style={{ color }} />
                          {ach}
                        </div>
                      ))}
                    </div>

                    {/* View Certificate Button */}
                    <a
                      href={getViewUrl(intern.certId)}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '1rem',
                        padding: '1.2rem',
                        background: `linear-gradient(90deg, ${color}, #ffffff)`,
                        color: '#000',
                        fontWeight: 800,
                        borderRadius: '999px',
                        textDecoration: 'none',
                        boxShadow: `0 0 40px ${color}60`,
                        transition: 'all 0.4s'
                      }}
                    >
                      <Award size={22} />
                      View Certificate
                      <ExternalLink size={20} />
                    </a>
                  </div>
                </div>
              );
            })}
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
              READY FOR NEXT DEPLOYMENT?
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
                <Github size={32} />
                VIEW REPOSITORIES
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
                LET'S COLLABORATE
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ─── CERTIFICATE MODAL ────────────────────────────────────────────── */}
      {activeCert && (
        <div
          onClick={() => setActiveCert(null)}
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
              border: `4px solid ${activeCert.color}aa`,
              borderRadius: '32px',
              maxWidth: '1200px',
              width: '94%',
              maxHeight: '94vh',
              overflow: 'hidden',
              boxShadow: `0 0 160px ${activeCert.color}70`,
              position: 'relative'
            }}
          >
            <button
              onClick={() => setActiveCert(null)}
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

            <img
              src={getCertificateUrl(activeCert.certId)}
              alt={`${activeCert.title} Certificate`}
              style={{
                width: '100%',
                display: 'block'
              }}
            />
          </div>
        </div>
      )}
    </>
  );
}