import { useState, useEffect, useRef } from "react";
import {
  GraduationCap, Calendar, MapPin, Brain, Code, Trophy,
  Sparkles, BookOpen, X, CheckCircle2, ExternalLink
} from "lucide-react";

// Replace with your actual image paths
import rceeImage from "../assets/Rcee.jpg";
import sriImage from "../assets/SRI.jpg";
import monteImage from "../assets/Monte.jpg";

const education = [
  {
    id: 1,
    title: "B.Tech – Artificial Intelligence & Data Science",
    school: "Ramachandra College of Engineering (JNTUK)",
    year: "2022 – 2026",
    score: "8.5 CGPA",
    desc: "Specialized in building intelligent, data-driven systems using Machine Learning, Deep Learning, and Full-Stack Development. Actively worked on real-world AI projects, hackathons, and production-ready web applications.",
    color: "var(--neon-primary)",
    image: rceeImage,
    location: "Eluru, Andhra Pradesh",

    coreSubjects: [
      "Machine Learning",
      "Deep Learning",
      "Artificial Intelligence",
      "Data Structures & Algorithms",
      "Big Data Analytics",
      "Computer Vision",
      "Natural Language Processing",
      "Database Management Systems"
    ],

    tools: [
      "Python",
      "TensorFlow",
      "PyTorch",
      "Scikit-learn",
      "React",
      "Node.js",
      "MongoDB",
      "Flask",
      "Docker",
      "Git & GitHub"
    ],

    skills: [
      "Machine Learning",
      "Deep Learning",
      "MERN Stack",
      "Computer Vision",
      "MLOps",
      "Neural Networks",
      "Model Deployment"
    ],

    achievements: [
      "AI & ML Internship Experience",
      "Top 10% Academic Performer",
      "Multiple Full-Stack AI Projects",
      "24-Hour Hackathon Participant",
      "Built Production-Ready ML Web Apps"
    ],

    highlights: [
      "Developed AI-based Resume Builder with ATS scoring",
      "Built Deep Learning models for image classification",
      "Created end-to-end MERN stack applications",
      "Hands-on experience with model deployment & APIs"
    ],

    leadership: [
      "Team Lead in Academic & Hackathon Projects",
      "Mentored juniors in Python & ML basics"
    ],

    badge: "CURRENT",
    icon: Brain
  },

  {
    id: 2,
    title: "Intermediate – MPC (Maths, Physics, Chemistry)",
    school: "Srividhya Junior College",
    year: "2020 – 2022",
    score: "78%",
    desc: "Completed intensive pre-engineering curriculum with strong focus on analytical thinking, mathematical reasoning, and problem-solving skills.",
    color: "var(--neon-primary)",
    image: sriImage,
    location: "Vijayawada, Andhra Pradesh",

    coreSubjects: [
      "Advanced Mathematics",
      "Physics",
      "Chemistry"
    ],

    skills: [
      "Problem Solving",
      "Logical Reasoning",
      "Analytical Thinking",
      "Time Management"
    ],

    achievements: [
      "Strong Academic Consistency",
      "Top Performer in Mathematics",
      "Built strong foundation for Engineering & AI studies"
    ],

    highlights: [
      "Developed strong numerical and analytical skills",
      "Prepared for competitive engineering education"
    ],

    badge: "FOUNDATION",
    icon: Code
  },

  {
    id: 3,
    title: "Secondary School (10th Standard)",
    school: "Montessori English Medium High School",
    year: "2019 – 2020",
    score: "95% • 10.0 GPA",
    desc: "Achieved academic excellence with exceptional performance in Mathematics and Science. Demonstrated discipline, leadership, and consistency throughout schooling.",
    color: "var(--neon-primary)",
    image: monteImage,
    location: "Vijayawada, Andhra Pradesh",

    coreSubjects: [
      "Mathematics",
      "Science",
      "English",
      "Social Studies"
    ],

    skills: [
      "Discipline",
      "Critical Thinking",
      "Leadership",
      "Communication"
    ],

    achievements: [
      "School Topper",
      "Perfect GPA",
      "Top 5% Academic Rank"
    ],

    highlights: [
      "Strong academic discipline",
      "Early excellence in Mathematics & Science"
    ],

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

        .edu-card {
          position: relative;
          background: rgba(8,8,22,0.92);
          border: 2px solid rgba(0,240,255,0.32);
          border-radius: 20px;
          overflow: hidden;
          transition: all 0.5s cubic-bezier(0.23,1,0.32,1);
          max-width: 100%;
          box-sizing: border-box;
        }

        .edu-card:hover {
          transform: translateY(-16px) scale(1.03);
          border-color: var(--neon-primary);
          box-shadow: var(--neon-glow);
        }

        .edu-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, transparent 35%, rgba(0,240,255,0.15) 50%, transparent 65%);
          animation: scan 7s linear infinite;
          pointer-events: none;
          z-index: 1;
        }

        .skill-tag {
          background: rgba(0,0,0,0.78);
          border: 1.6px solid var(--neon-primary);
          padding: 0.5rem 1rem;
          border-radius: 999px;
          font-family: 'Fira Code',monospace;
          font-size: 0.86rem;
          transition: all 0.3s;
          color: #e0f7ff;
        }

        .skill-tag:hover {
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
          .edu-grid {
            grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)) !important;
            gap: 2.4rem !important;
          }
        }

        @media (max-width: 768px) {
          .edu-grid {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
          }
          .edu-image-container {
            height: 220px !important;
          }
          .card-padding {
            padding: 1.8rem 1.5rem !important;
          }
          h1.neon-title {
            font-size: clamp(3.4rem, 11vw, 5.5rem) !important;
            letter-spacing: 3px !important;
          }
          .score-display {
            font-size: 2.8rem !important;
          }
          .modal-content {
            padding: 2.2rem 1.6rem !important;
            width: 98% !important;
            max-width: 98% !important;
          }
          .modal-image {
            max-height: 38vh !important;
            object-fit: cover !important;
          }
        }

        @media (max-width: 480px) {
          .edu-image-container {
            height: 200px !important;
          }
          .card-padding {
            padding: 1.5rem 1.3rem !important;
          }
          h3 {
            font-size: 1.65rem !important;
          }
          .skill-tag {
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
          .edu-image-container {
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
        {/* Subtle grid */}
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
              {'>'} academic.history.load()
            </div>

            <h1 className="neon-title" style={{
              fontSize: 'clamp(3.8rem, 11vw, 7rem)',
              fontWeight: 900,
              letterSpacing: '4px',
              textTransform: 'uppercase',
              marginBottom: '1.4rem',
              lineHeight: 1.1
            }}>
              ACADEMIC MATRIX
            </h1>

            <p style={{
              fontSize: 'clamp(1.1rem, 3vw, 1.35rem)',
              color: '#a0a0c8',
              maxWidth: '800px',
              margin: '0 auto',
              fontFamily: "'Fira Code', monospace",
              lineHeight: 1.7
            }}>
              [ From foundational code to neural evolution ]<br/>
              Knowledge stack deployed — 2019–2026
            </p>
          </div>

          {/* Education Cards */}
          <div className="edu-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 'clamp(2rem, 5vw, 3.2rem)',
            marginBottom: '7rem',
            width: '100%',
            maxWidth: '100%'
          }}>
            {education.map((edu, i) => {
              const isHovered = hoveredId === edu.id;

              return (
                <div
                  key={edu.id}
                  className="edu-card"
                  onMouseEnter={() => setHoveredId(edu.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onClick={() => setActiveEdu(edu)}
                  style={{
                    color: edu.color,
                    animation: `slideIn ${0.6 + i * 0.12}s ease-out`,
                    opacity: 0,
                    animationFillMode: 'forwards',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{
                    position: 'absolute',
                    top: 0, left: 0, right: 0,
                    height: '4px',
                    background: `linear-gradient(90deg, transparent, var(--neon-primary), transparent)`,
                    opacity: isHovered ? 0.9 : 0.4,
                    transition: 'opacity 0.5s'
                  }} />

                  <div className="edu-image-container" style={{
                    height: 'clamp(180px, 50vw, 240px)',
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
                        <GraduationCap size={18} />
                        View Details
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
                        <edu.icon size={36} />
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
                        {edu.badge}
                      </div>
                    </div>

                    <h3 style={{
                      fontSize: 'clamp(1.7rem, 4.5vw, 1.95rem)',
                      fontWeight: 800,
                      color: '#ffffff',
                      marginBottom: '0.7rem'
                    }}>
                      {edu.title}
                    </h3>

                    <div style={{
                      fontSize: '1.05rem',
                      color: '#b0b0d8',
                      marginBottom: '0.4rem',
                      fontFamily: "'Fira Code', monospace"
                    }}>
                      {edu.school}
                    </div>

                    <div style={{
                      fontSize: '0.98rem',
                      color: 'var(--neon-primary)',
                      fontWeight: 600,
                      marginBottom: '0.6rem'
                    }}>
                      {edu.year}
                    </div>

                    <div style={{
                      fontSize: '0.92rem',
                      color: '#a0a0c0',
                      marginBottom: '1.6rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.6rem'
                    }}>
                      <MapPin size={17} />
                      {edu.location}
                    </div>

                    <div className="score-display" style={{
                      fontSize: 'clamp(2.2rem, 6vw, 3rem)',
                      fontWeight: 900,
                      color: 'var(--neon-primary)',
                      marginBottom: '1.8rem',
                      textShadow: '0 0 18px rgba(0,240,255,0.7)'
                    }}>
                      {edu.score}
                    </div>

                    {/* Skills */}
                    <div style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '0.65rem',
                      marginBottom: '1.8rem'
                    }}>
                      {(edu.skills ?? []).slice(0, 6).map(s => (
                        <span
                          key={s}
                          className="skill-tag"
                          style={{
                            color: isHovered ? 'var(--neon-primary)' : '#b0e0ff',
                            borderColor: isHovered ? 'var(--neon-primary)' : 'rgba(0,240,255,0.45)'
                          }}
                        >
                          {s}
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
                      {(edu.achievements ?? []).slice(0, 3).map((ach, idx) => (
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

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveEdu(edu);
                      }}
                      style={{
                        width: '100%',
                        padding: '1.1rem',
                        background: 'var(--neon-gradient)',
                        color: '#000',
                        fontWeight: 800,
                        borderRadius: '999px',
                        border: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.9rem',
                        boxShadow: '0 0 35px rgba(0,240,255,0.5)',
                        cursor: 'pointer',
                        fontSize: '1.05rem'
                      }}
                    >
                      <BookOpen size={20} />
                      View Full Record
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* CTA Bar */}
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
              CONTINUE LEARNING PROTOCOL?
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
                <ExternalLink size={28} />
                VIEW PROJECTS
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
                NEXT COLLABORATION?
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ─── MODAL ──────────────────────────────────────────── */}
      {activeEdu && (
        <div
          onClick={() => setActiveEdu(null)}
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
              border: `4px solid ${activeEdu.color}aa`,
              borderRadius: '28px',
              maxWidth: '1300px',
              width: '96%',
              maxHeight: '92vh',
              overflowY: 'auto',
              boxShadow: `0 0 140px ${activeEdu.color}60`,
              position: 'relative'
            }}
          >
            <button
              onClick={() => setActiveEdu(null)}
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
              src={activeEdu.image}
              alt={activeEdu.school}
              className="modal-image"
              style={{
                width: '100%',
                height: 'auto',
                maxHeight: '40vh',
                objectFit: 'cover',
                display: 'block'
              }}
            />

            <div style={{ padding: 'clamp(2.2rem, 6vw, 4rem) clamp(1.6rem, 5vw, 3.5rem) 5rem' }}>
              <h2 style={{
                fontSize: 'clamp(2.6rem, 7vw, 4.2rem)',
                fontWeight: 900,
                background: 'var(--neon-gradient)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 0 35px rgba(0,240,255,0.7)',
                marginBottom: '1.4rem'
              }}>
                {activeEdu.title}
              </h2>

              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '1.6rem',
                marginBottom: '2.8rem',
                fontSize: 'clamp(1.15rem, 3vw, 1.3rem)',
                color: '#d0d0ff'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem' }}>
                  <GraduationCap size={26} />
                  {activeEdu.school}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem' }}>
                  <Calendar size={26} />
                  {activeEdu.year}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem' }}>
                  <MapPin size={26} />
                  {activeEdu.location}
                </div>
              </div>

              <p style={{
                fontSize: 'clamp(1.2rem, 3.2vw, 1.35rem)',
                lineHeight: 1.8,
                color: '#c8d0ff',
                marginBottom: '3rem'
              }}>
                {activeEdu.desc}
              </p>

              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr',
                gap: '2.8rem',
                '@media (min-width: 768px)': { gridTemplateColumns: '1fr 1fr' }
              }}>
                <div>
                  <h3 style={{
                    fontSize: 'clamp(1.9rem, 4.8vw, 2.3rem)',
                    background: 'var(--neon-gradient)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    marginBottom: '1.6rem',
                    fontWeight: 800
                  }}>
                    CORE COMPETENCIES
                  </h3>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                    {(activeEdu.skills ?? []).map(s => (
                      <span key={s} style={{
                        padding: '0.8rem 1.6rem',
                        background: `rgba(0,240,255,0.18)`,
                        border: `2px solid rgba(0,240,255,0.5)`,
                        borderRadius: '999px',
                        fontFamily: "'Fira Code', monospace",
                        fontWeight: 600,
                        fontSize: '0.95rem'
                      }}>
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 style={{
                    fontSize: 'clamp(1.9rem, 4.8vw, 2.3rem)',
                    background: 'var(--neon-gradient)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    marginBottom: '1.6rem',
                    fontWeight: 800
                  }}>
                    KEY MILESTONES
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                    {(activeEdu.achievements ?? []).map((ach, i) => (
                      <div key={i} style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        fontSize: '1.1rem'
                      }}>
                        <CheckCircle2 size={22} style={{ color: 'var(--neon-primary)' }} />
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