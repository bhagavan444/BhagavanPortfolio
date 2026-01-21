import { useState, useEffect, useRef } from "react";
import {
  GraduationCap, Calendar, MapPin, Award, Brain, Code, Trophy,
  Sparkles, Rocket, BookOpen, X, CheckCircle2, Layers, Lightbulb,
  ExternalLink, Star
} from "lucide-react";

// Replace with your actual image paths or public URLs
import rceeImage from "../assets/Rcee.jpg";
import sriImage from "../assets/SRI.jpg";
import monteImage from "../assets/Monte.jpg";

const education = [
  {
    id: 1,
    title: "B.Tech AI & Data Science",
    school: "Ramachandra College of Engineering (JNTUK)",
    year: "2022 – 2026",
    score: "8.5 CGPA",
    desc: "Focused on designing intelligent systems using Machine Learning, Deep Learning, and Data Science. Gained hands-on experience with Python, TensorFlow, MERN stack, and real-world AI applications.",
    color: "#00ffff",
    image: rceeImage,
    location: "Eluru, Andhra Pradesh",
    skills: ["Machine Learning", "Deep Learning", "MERN Stack", "Computer Vision", "MLOps", "Neural Networks"],
    achievements: ["AI Specialist", "Full-Stack Developer", "Top 10% Academic Performance", "Multiple AI Projects"],
    badge: "CURRENT",
    icon: Brain
  },
  {
    id: 2,
    title: "Intermediate (MPC)",
    school: "Srividhya Junior College",
    year: "2020 – 2022",
    score: "78%",
    desc: "Completed intensive coursework in Mathematics, Physics, and Chemistry with strong emphasis on analytical problem-solving and logical reasoning.",
    color: "#8a2be2",
    image: sriImage,
    location: "Vijayawada, Andhra Pradesh",
    skills: ["Advanced Mathematics", "Physics", "Chemistry", "Analytical Thinking", "Scientific Method"],
    achievements: ["Science Excellence", "Top Performer", "Strong Analytical Foundation"],
    badge: "FOUNDATION",
    icon: Code
  },
  {
    id: 3,
    title: "Secondary School (10th Class)",
    school: "Montessori English Medium High School",
    year: "2019 – 2020",
    score: "95% • 10.0 GPA",
    desc: "Established strong academic foundation with excellence in Mathematics and Science. Demonstrated consistent top-tier performance and disciplined study habits.",
    color: "#00ffff",
    image: monteImage,
    location: "Vijayawada, Andhra Pradesh",
    skills: ["Mathematics Mastery", "Scientific Method", "Critical Thinking", "Discipline", "Leadership"],
    achievements: ["School Topper", "Perfect Score", "Top 5% State Rank"],
    badge: "EXCELLENCE",
    icon: Trophy
  }
];

export default function CyberpunkEducation() {
  const [hoveredId, setHoveredId] = useState(null);
  const [activeEdu, setActiveEdu] = useState(null);
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

        .edu-card {
          position: relative;
          background: rgba(8,8,22,0.84);
          border: 2px solid rgba(0,255,255,0.24);
          border-radius: 24px;
          overflow: hidden;
          transition: all 0.5s cubic-bezier(0.23,1,0.32,1);
        }

        .edu-card:hover {
          transform: translateY(-20px) scale(1.04);
          border-color: currentColor;
          box-shadow: 0 0 80px currentColor;
        }

        .edu-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, transparent 35%, rgba(0,255,255,0.15) 50%, transparent 65%);
          animation: scan 6s linear infinite;
          pointer-events: none;
          z-index: 1;
        }

        .skill-tag {
          background: rgba(0,0,0,0.72);
          border: 1.5px solid currentColor;
          padding: 0.55rem 1.15rem;
          border-radius: 999px;
          font-family: 'Fira Code',monospace;
          font-size: 0.9rem;
          transition: all 0.3s;
        }

        .skill-tag:hover {
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
        {/* Subtle grid */}
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
              {'>'} academic.history.load()
            </div>

            <h1 className="neon-title" style={{
              fontSize: 'clamp(4rem, 9vw, 7rem)',
              fontWeight: 900,
              color: '#00ffff',
              letterSpacing: '5px',
              textTransform: 'uppercase',
              marginBottom: '1.8rem'
            }}>
              ACADEMIC MATRIX
            </h1>

            <p style={{
              fontSize: 'clamp(1.25rem, 2.8vw, 1.6rem)',
              color: '#a0a0c8',
              maxWidth: '820px',
              margin: '0 auto',
              fontFamily: "'Fira Code', monospace",
              lineHeight: 1.8
            }}>
              [ From foundational code to neural evolution ]<br/>
              Knowledge stack deployed — 2019–2026
            </p>
          </div>

          {/* Education Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))',
            gap: '3rem',
            marginBottom: '7rem'
          }}>
            {education.map((edu, i) => {
              const isHovered = hoveredId === edu.id;
              const color = edu.color;

              return (
                <div
                  key={edu.id}
                  className="edu-card"
                  onMouseEnter={() => setHoveredId(edu.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onClick={() => setActiveEdu(edu)}
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

                  {/* Institution image preview */}
                  <div style={{
                    height: '260px',
                    position: 'relative',
                    overflow: 'hidden'
                  }}>
                    <img
                      src={edu.image}
                      alt={edu.school}
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
                      opacity: isHovered ? 1 : 0.4,
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
                        <GraduationCap size={20} />
                        View Details
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
                        <edu.icon size={40} />
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
                        {edu.badge}
                      </div>
                    </div>

                    <h3 style={{
                      fontSize: '1.9rem',
                      fontWeight: 800,
                      color: '#ffffff',
                      marginBottom: '0.8rem'
                    }}>
                      {edu.title}
                    </h3>

                    <div style={{
                      fontSize: '1.1rem',
                      color: '#b0b0d8',
                      marginBottom: '0.4rem',
                      fontFamily: "'Fira Code', monospace"
                    }}>
                      {edu.school}
                    </div>

                    <div style={{
                      fontSize: '1rem',
                      color,
                      fontWeight: 600,
                      marginBottom: '0.6rem'
                    }}>
                      {edu.year}
                    </div>

                    <div style={{
                      fontSize: '0.95rem',
                      color: '#a0a0c0',
                      marginBottom: '2rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.6rem'
                    }}>
                      <MapPin size={18} />
                      {edu.location}
                    </div>

                    {/* Score highlight */}
                    <div style={{
                      fontSize: '2.2rem',
                      fontWeight: 900,
                      color,
                      marginBottom: '2rem',
                      textShadow: `0 0 20px ${color}80`
                    }}>
                      {edu.score}
                    </div>

                    {/* Skills */}
                    <div style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '0.7rem',
                      marginBottom: '2.2rem'
                    }}>
                      {edu.skills.slice(0, 6).map(s => (
                        <span
                          key={s}
                          className="skill-tag"
                          style={{
                            color: isHovered ? color : '#8888bb',
                            borderColor: isHovered ? color : '#555577'
                          }}
                        >
                          {s}
                        </span>
                      ))}
                    </div>

                    {/* Quick achievements */}
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.9rem',
                      marginBottom: '2.4rem'
                    }}>
                      {edu.achievements.slice(0, 3).map((ach, idx) => (
                        <div
                          key={idx}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.9rem',
                            fontSize: '1rem'
                          }}
                        >
                          <CheckCircle2 size={18} style={{ color }} />
                          {ach}
                        </div>
                      ))}
                    </div>

                    {/* Action */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveEdu(edu);
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
                      <BookOpen size={22} />
                      View Full Record
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
              CONTINUE LEARNING PROTOCOL?
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
                <Code size={32} />
                VIEW ACADEMIC PROJECTS
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
                NEXT COLLABORATION?
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ─── EDUCATION DETAIL MODAL ──────────────────────────────────────────── */}
      {activeEdu && (
        <div
          onClick={() => setActiveEdu(null)}
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
              border: `4px solid ${activeEdu.color}aa`,
              borderRadius: '32px',
              maxWidth: '1300px',
              width: '94%',
              maxHeight: '92vh',
              overflowY: 'auto',
              boxShadow: `0 0 160px ${activeEdu.color}70`,
              position: 'relative'
            }}
          >
            <button
              onClick={() => setActiveEdu(null)}
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
              src={activeEdu.image}
              alt={activeEdu.school}
              style={{
                width: '100%',
                height: 'auto',
                display: 'block'
              }}
            />

            <div style={{ padding: '4rem 4rem 5rem' }}>
              <h2 style={{
                fontSize: 'clamp(2.8rem, 6vw, 4.5rem)',
                fontWeight: 900,
                color: activeEdu.color,
                textShadow: `0 0 40px ${activeEdu.color}90`,
                marginBottom: '1.5rem'
              }}>
                {activeEdu.title}
              </h2>

              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '2rem',
                marginBottom: '3rem',
                fontSize: '1.3rem',
                color: '#d0d0ff'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <GraduationCap size={28} />
                  {activeEdu.school}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <Calendar size={28} />
                  {activeEdu.year}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <MapPin size={28} />
                  {activeEdu.location}
                </div>
              </div>

              <p style={{
                fontSize: '1.35rem',
                lineHeight: 1.8,
                color: '#c8d0ff',
                marginBottom: '3.5rem'
              }}>
                {activeEdu.desc}
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
                <div>
                  <h3 style={{
                    fontSize: '2.2rem',
                    color: activeEdu.color,
                    marginBottom: '1.8rem',
                    fontWeight: 800
                  }}>
                    CORE COMPETENCIES
                  </h3>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.2rem' }}>
                    {activeEdu.skills.map(s => (
                      <span key={s} style={{
                        padding: '0.9rem 1.8rem',
                        background: `${activeEdu.color}20`,
                        border: `2px solid ${activeEdu.color}50`,
                        borderRadius: '999px',
                        fontFamily: "'Fira Code', monospace",
                        fontWeight: 600
                      }}>
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 style={{
                    fontSize: '2.2rem',
                    color: activeEdu.color,
                    marginBottom: '1.8rem',
                    fontWeight: 800
                  }}>
                    KEY MILESTONES
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.4rem' }}>
                    {activeEdu.achievements.map((ach, i) => (
                      <div key={i} style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1.2rem',
                        fontSize: '1.2rem'
                      }}>
                        <CheckCircle2 size={24} style={{ color: activeEdu.color }} />
                        {ach}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}