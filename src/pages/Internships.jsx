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
    location: "Hybrid",
    period: "May – July 2025",
    badge: "Full-Stack Pro",
    certId: "1bwbNlc9mdPYQOIyUpoiBIOhpyxaMBvbC",
    color: "var(--neon-primary)",
    icon: Code,

    tech: [
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "JWT",
      "REST APIs",
      "Git",
      "Cloud Deployment"
    ],

    responsibilities: [
      "Developed responsive UI components using React",
      "Built secure RESTful APIs with Node.js and Express",
      "Implemented JWT-based authentication and authorization",
      "Integrated frontend with backend services",
      "Collaborated with team using Git and Agile workflows"
    ],

    achievements: [
      "Built 3+ full-stack web applications",
      "Implemented secure login & role-based access",
      "Optimized API performance and database queries",
      "Deployed applications to cloud environments"
    ],

    impact: [
      "Improved application usability and performance",
      "Reduced authentication-related issues",
      "Delivered production-ready features under deadlines"
    ]
  },

  {
    id: 2,
    title: "AI / ML Intern",
    company: "SmartBridge",
    location: "Remote",
    period: "May – June 2025",
    badge: "AI Engineer",
    certId: "1-_8ZI8uZ3DcrFpfZ3pts7VSYrAqPN5Zw",
    color: "var(--neon-primary)",
    icon: Brain,

    tech: [
      "Python",
      "TensorFlow",
      "Scikit-learn",
      "CNN",
      "OpenCV",
      "Flask"
    ],

    responsibilities: [
      "Designed and trained CNN models for image classification",
      "Preprocessed and augmented image datasets",
      "Evaluated models using accuracy and loss metrics",
      "Integrated trained models into Flask web applications",
      "Deployed ML models for real-time inference"
    ],

    achievements: [
      "Built and evaluated 5+ ML/DL models",
      "Achieved 85%+ accuracy on image classification tasks",
      "Implemented end-to-end ML pipelines",
      "Delivered working AI demos within deadlines"
    ],

    impact: [
      "Enabled automated image-based decision systems",
      "Improved model reliability through tuning",
      "Gained real-world experience in ML deployment"
    ]
  },

  {
    id: 3,
    title: "Machine Learning & Data Science Intern",
    company: "Blackbucks",
    location: "Remote",
    period: "May – June 2024",
    badge: "Data Specialist",
    certId: "1yQQqBf32o8d3sYlheDCdaLTKj5_hepfY",
    color: "var(--neon-primary)",
    icon: Database,

    tech: [
      "Python",
      "Pandas",
      "NumPy",
      "Scikit-learn",
      "Data Analysis",
      "Feature Engineering"
    ],

    responsibilities: [
      "Cleaned and preprocessed real-world datasets",
      "Performed exploratory data analysis (EDA)",
      "Built ML models for classification and prediction",
      "Evaluated models using standard ML metrics",
      "Documented findings and model performance"
    ],

    achievements: [
      "Built multiple ML models from scratch",
      "Implemented feature engineering pipelines",
      "Improved data quality and model accuracy",
      "Strengthened foundation in data science workflows"
    ],

    impact: [
      "Delivered reliable ML prototypes",
      "Enhanced understanding of data-driven decision making",
      "Prepared for advanced AI and ML projects"
    ]
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

  const getCertificateUrl = (id) =>
    `https://drive.google.com/thumbnail?id=${id}&sz=w1000`;

  const getViewUrl = (id) =>
    `https://drive.google.com/file/d/${id}/view`;

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

        .intern-card {
          position: relative;
          background: rgba(8,8,22,0.92);
          border: 2px solid rgba(0,240,255,0.32);
          border-radius: 20px;
          overflow: hidden;
          transition: all 0.5s cubic-bezier(0.23,1,0.32,1);
          max-width: 100%;
          box-sizing: border-box;
        }

        .intern-card:hover {
          transform: translateY(-16px) scale(1.03);
          border-color: var(--neon-primary);
          box-shadow: var(--neon-glow);
        }

        .intern-card::before {
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
          .intern-grid {
            grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)) !important;
            gap: 2.4rem !important;
          }
        }

        @media (max-width: 768px) {
          .intern-grid {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
          }
          .cert-preview {
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
          .modal-image {
            max-height: 45vh !important;
            object-fit: contain !important;
          }
        }

        @media (max-width: 480px) {
          .cert-preview {
            height: 200px !important;
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
          .cert-preview {
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
              {'>'} experience.load()
            </div>

            <h1 className="neon-title" style={{
              fontSize: 'clamp(3.8rem, 11vw, 7rem)',
              fontWeight: 900,
              letterSpacing: '4px',
              textTransform: 'uppercase',
              marginBottom: '1.4rem',
              lineHeight: 1.1
            }}>
              INTERNSHIP LOG
            </h1>

            <p style={{
              fontSize: 'clamp(1.1rem, 3vw, 1.35rem)',
              color: '#a0a0c8',
              maxWidth: '800px',
              margin: '0 auto',
              fontFamily: "'Fira Code', monospace",
              lineHeight: 1.7
            }}>
              [ Hands-on industry experience across Full-Stack, AI, and Data Science roles. ]<br/>
              Forged in industry — 2024–2025 protocol
            </p>
          </div>

          {/* Internship Cards */}
          <div className="intern-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 'clamp(2rem, 5vw, 3.2rem)',
            marginBottom: '7rem',
            width: '100%',
            maxWidth: '100%'
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
                    animation: `slideIn ${0.6 + i * 0.12}s ease-out`,
                    opacity: 0,
                    animationFillMode: 'forwards',
                    cursor: 'pointer'
                  }}
                >
                  {/* Top scan */}
                  <div style={{
                    position: 'absolute',
                    top: 0, left: 0, right: 0,
                    height: '4px',
                    background: `linear-gradient(90deg, transparent, var(--neon-primary), transparent)`,
                    opacity: isHovered ? 0.9 : 0.4,
                    transition: 'opacity 0.5s'
                  }} />

                  {/* Certificate preview */}
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveCert(intern);
                    }}
                    className="cert-preview"
                    style={{
                      height: 'clamp(180px, 50vw, 240px)',
                      position: 'relative',
                      overflow: 'hidden',
                      cursor: 'pointer'
                    }}
                  >
                    <img
                      src={getCertificateUrl(intern.certId)}
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
                      background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 55%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      opacity: isHovered ? 1 : 0.45,
                      transition: 'opacity 0.5s'
                    }}>
                      <div style={{
                        padding: '0.9rem 1.8rem',
                        background: 'rgba(0,0,0,0.8)',
                        backdropFilter: 'blur(10px)',
                        border: `2px solid var(--neon-primary)`,
                        borderRadius: '999px',
                        color: '#fff',
                        fontWeight: 700,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.7rem',
                        fontSize: 'clamp(0.9rem, 2.5vw, 0.95rem)'
                      }}>
                        <Award size={18} />
                        View Certificate
                      </div>
                    </div>
                  </div>

                  <div className="card-padding" style={{ 
                    padding: 'clamp(1.6rem, 4vw, 2.2rem) clamp(1.4rem, 3.5vw, 2rem)' 
                  }}>
                    {/* Icon + Badge */}
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '1.6rem'
                    }}>
                      <div style={{
                        width: '70px',
                        height: '70px',
                        border: `3px solid var(--neon-primary)`,
                        borderRadius: '14px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '2.4rem',
                        animation: isHovered ? 'float 3.2s ease-in-out infinite' : 'none',
                        boxShadow: isHovered ? '0 0 40px rgba(0,240,255,0.5)' : 'none'
                      }}>
                        <intern.icon size={36} />
                      </div>

                      <div style={{
                        padding: '0.5rem 1.2rem',
                        background: `rgba(0,240,255,0.15)`,
                        border: `2px solid rgba(0,240,255,0.6)`,
                        borderRadius: '999px',
                        fontSize: '0.9rem',
                        fontWeight: 700,
                        color: 'var(--neon-primary)'
                      }}>
                        {intern.badge}
                      </div>
                    </div>

                    <h3 style={{
                      fontSize: 'clamp(1.7rem, 4.5vw, 1.95rem)',
                      fontWeight: 800,
                      color: '#ffffff',
                      marginBottom: '0.7rem'
                    }}>
                      {intern.title}
                    </h3>

                    <div style={{
                      fontSize: '1.05rem',
                      color: '#b0b0d8',
                      marginBottom: '0.4rem',
                      fontFamily: "'Fira Code', monospace"
                    }}>
                      {intern.company}
                    </div>

                    <div style={{
                      fontSize: '0.98rem',
                      color: 'var(--neon-primary)',
                      fontWeight: 600,
                      marginBottom: '1.6rem'
                    }}>
                      {intern.period}
                    </div>

                    {/* Tech pills */}
                    <div style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '0.65rem',
                      marginBottom: '1.8rem'
                    }}>
                      {intern.tech.map(t => (
                        <span
                          key={t}
                          className="tech-pill"
                          style={{
                            color: isHovered ? 'var(--neon-primary)' : '#b0e0ff',
                            borderColor: isHovered ? 'var(--neon-primary)' : 'rgba(0,240,255,0.45)'
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Achievements */}
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.8rem',
                      marginBottom: '2rem'
                    }}>
                      {intern.achievements.map((ach, idx) => (
                        <div
                          key={idx}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.8rem',
                            fontSize: '0.98rem'
                          }}
                        >
                          <CheckCircle2 size={17} style={{ color: 'var(--neon-primary)' }} />
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
                        padding: '1.1rem',
                        background: 'var(--neon-gradient)',
                        color: '#000',
                        fontWeight: 800,
                        borderRadius: '999px',
                        textDecoration: 'none',
                        boxShadow: '0 0 35px rgba(0,240,255,0.5)',
                        transition: 'all 0.4s',
                        fontSize: '1.05rem'
                      }}
                    >
                      <Award size={20} />
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
            padding: 'clamp(3rem, 8vw, 4.5rem) 2rem',
            background: 'rgba(0,0,0,0.8)',
            border: '2.5px solid rgba(0,240,255,0.38)',
            borderRadius: '28px',
            textAlign: 'center'
          }}>
            <h2 style={{
              fontSize: 'clamp(2.8rem, 8vw, 4.5rem)',
              fontWeight: 900,
              background: 'var(--neon-gradient)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '2.5rem',
              textShadow: '0 0 35px rgba(0,240,255,0.7)'
            }}>
              READY FOR NEXT DEPLOYMENT?
            </h2>

            <div className="cta-buttons" style={{
              display: 'flex',
              gap: '2rem',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              <a href="https://github.com/bhagavan444" target="_blank" rel="noopener noreferrer" style={{
                padding: '1.2rem 2.8rem',
                background: 'rgba(0,240,255,0.16)',
                border: '2.5px solid rgba(0,240,255,0.7)',
                borderRadius: '999px',
                color: 'var(--neon-primary)',
                fontWeight: 700,
                fontSize: '1.15rem',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem'
              }}>
                <Github size={28} />
                VIEW REPOSITORIES
              </a>

              <a href="mailto:g.sivasatyasaibhagavan@gmail.com" style={{
                padding: '1.2rem 2.8rem',
                background: 'var(--neon-gradient)',
                borderRadius: '999px',
                color: '#000',
                fontWeight: 900,
                fontSize: '1.15rem',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem'
              }}>
                <Sparkles size={28} />
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
              border: `4px solid ${activeCert.color}aa`,
              borderRadius: '28px',
              maxWidth: '1300px',
              width: '96%',
              maxHeight: '92vh',
              overflowY: 'auto',
              boxShadow: `0 0 140px ${activeCert.color}60`,
              position: 'relative'
            }}
          >
            <button
              onClick={() => setActiveCert(null)}
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

            <img
              src={getCertificateUrl(activeCert.certId)}
              alt={`${activeCert.title} Certificate`}
              className="modal-image"
              style={{
                width: '100%',
                height: 'auto',
                maxHeight: '45vh',
                objectFit: 'contain',
                display: 'block'
              }}
            />

            <div style={{ padding: 'clamp(2rem, 6vw, 4rem) clamp(1.5rem, 5vw, 3.5rem) 4rem' }}>
              <h2 style={{
                fontSize: 'clamp(2.2rem, 6vw, 3.8rem)',
                fontWeight: 900,
                background: 'var(--neon-gradient)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: '1.2rem'
              }}>
                {activeCert.title}
              </h2>

              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '1.5rem',
                marginBottom: '2rem',
                fontSize: 'clamp(1.1rem, 3vw, 1.3rem)',
                color: '#d0d0ff'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                  <Code size={24} />
                  {activeCert.company}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                  <Zap size={24} />
                  {activeCert.period}
                </div>
              </div>

              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '1rem',
                marginBottom: '2rem'
              }}>
                {activeCert.tech.map(t => (
                  <span key={t} style={{
                    padding: '0.7rem 1.4rem',
                    background: `rgba(0,240,255,0.18)`,
                    border: `2px solid rgba(0,240,255,0.5)`,
                    borderRadius: '999px',
                    fontFamily: "'Fira Code', monospace",
                    fontSize: '0.95rem',
                    fontWeight: 600
                  }}>
                    {t}
                  </span>
                ))}
              </div>

              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem'
              }}>
                {activeCert.achievements.map((ach, idx) => (
                  <div key={idx} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    fontSize: '1.05rem'
                  }}>
                    <CheckCircle2 size={20} style={{ color: 'var(--neon-primary)' }} />
                    {ach}
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