import { useState, useEffect, useRef } from "react";
import {
  GraduationCap, Calendar, MapPin, Brain, Code, Trophy,
  Sparkles, BookOpen, X, CheckCircle2, ExternalLink, Award,
  TrendingUp, Zap, Star, ChevronRight, Globe, Users, Target
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
    score: "7.9 CGPA",
    desc: "Specialized in building intelligent, data-driven systems using Machine Learning, Deep Learning, and Full-Stack Development. Leading AI projects and building production-ready applications.",
    color: "#00f0ff",
    image: rceeImage,
    location: "Eluru, Andhra Pradesh",
    coreSubjects: ["Machine Learning", "Deep Learning", "AI", "DSA", "Big Data", "Computer Vision", "NLP", "DBMS"],
    tools: ["Python", "TensorFlow", "PyTorch", "React", "Node.js", "MongoDB", "Docker", "Git"],
    skills: ["Machine Learning", "Deep Learning", "MERN Stack", "Computer Vision", "MLOps", "Neural Networks"],
    achievements: [
      "AI & ML Internship Experience",
      "Top 10% Academic Performer",
      "Multiple Full-Stack AI Projects",
      "24-Hour Hackathon Participant",
      "15+ Professional Certifications",
      "Published Research Work"
    ],
    badge: "CURRENT",
    icon: Brain,
    progress: 85
  },
  {
    id: 2,
    title: "Intermediate – MPC",
    school: "Srividhya Junior College",
    year: "2020 – 2022",
    score: "7.8 CGPA%",
    desc: "Pre-engineering curriculum with focus on analytical thinking, mathematical reasoning, and problem-solving. Built strong foundation for engineering studies.",
    color: "#a78bfa",
    image: sriImage,
    location: "Vijayawada, Andhra Pradesh",
    coreSubjects: ["Advanced Mathematics", "Physics", "Chemistry"],
    skills: ["Problem Solving", "Logical Reasoning", "Analytical Thinking"],
    achievements: ["Top Performer in Mathematics", "Strong Academic Foundation"],
    badge: "FOUNDATION",
    icon: Code,
    progress: 78
  },
  {
    id: 3,
    title: "Secondary School (10th)",
    school: "Montessori English Medium High School",
    year: "2019 – 2020",
    score: "9.5 GPA",
    desc: "Achieved academic excellence with exceptional performance in Mathematics and Science. Demonstrated discipline and leadership.",
    color: "#ff61d2",
    image: monteImage,
    location: "Vijayawada, Andhra Pradesh",
    coreSubjects: ["Mathematics", "Science", "English"],
    skills: ["Discipline", "Critical Thinking", "Leadership"],
    achievements: ["School Topper", "Perfect GPA", "Mathematics Excellence Award"],
    badge: "EXCELLENCE",
    icon: Trophy,
    progress: 95
  }
];

export default function EliteEducation() {
  const [hoveredId, setHoveredId] = useState(null);
  const [activeEdu, setActiveEdu] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [visibleCards, setVisibleCards] = useState({});
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const canvasRef = useRef(null);

  // Mouse movement parallax effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 30,
        y: (e.clientY / window.innerHeight - 0.5) * 30
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Scroll progress bar
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress((scrolled / maxScroll) * 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Intersection observer for card animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleCards((prev) => ({ ...prev, [entry.target.dataset.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll("[data-observe]").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Canvas particle background
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

    const particles = Array.from({ length: 80 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 2 + 1,
      color: Math.random() > 0.5 ? 'rgba(0,240,255,0.4)' : 'rgba(167,139,250,0.4)'
    }));

    const animate = () => {
      ctx.fillStyle = 'rgba(0,0,0,0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 6);
        gradient.addColorStop(0, p.color);
        gradient.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 6, 0, Math.PI * 2);
        ctx.fill();

        particles.forEach(p2 => {
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            ctx.strokeStyle = `rgba(0,240,255,${0.15 * (1 - dist / 150)})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        });
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
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Outfit', sans-serif; background: #000; color: #fff; overflow-x: hidden; }
        @keyframes slideIn { from { opacity: 0; transform: translateY(60px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-15px); } }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.7; } }
        @keyframes scan { 0% { transform: translateY(-100%); } 100% { transform: translateY(100%); } }
        @keyframes rotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes glow { 0%, 100% { box-shadow: 0 0 20px currentColor; } 50% { box-shadow: 0 0 40px currentColor; } }

        .edu-card {
          position: relative;
          background: rgba(8,8,22,0.95);
          border: 2px solid rgba(0,240,255,0.3);
          border-radius: 24px;
          overflow: hidden;
          transition: all 0.6s cubic-bezier(0.23,1,0.32,1);
          opacity: 0;
        }
        .edu-card.visible { animation: slideIn 0.8s cubic-bezier(0.23,1,0.32,1) forwards; }
        .edu-card:hover {
          transform: translateY(-20px) scale(1.03);
          border-color: var(--card-color);
          box-shadow: 0 30px 80px var(--card-color);
        }
        .edu-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, transparent 30%, var(--card-color) 50%, transparent 70%);
          opacity: 0.1;
          animation: scan 8s linear infinite;
          pointer-events: none;
        }
        .skill-tag {
          background: rgba(0,0,0,0.8);
          border: 2px solid currentColor;
          padding: 0.6rem 1.2rem;
          border-radius: 999px;
          font-family: 'Fira Code', monospace;
          font-size: 0.85rem;
          transition: all 0.3s;
        }
        .skill-tag:hover {
          transform: translateY(-3px) scale(1.08);
          box-shadow: 0 10px 30px currentColor;
        }
        .stat-card {
          background: linear-gradient(145deg, rgba(0,0,0,0.9), rgba(0,240,255,0.05));
          border: 2px solid;
          border-radius: 20px;
          padding: 2rem;
          text-align: center;
          transition: all 0.4s;
        }
        .stat-card:hover {
          transform: translateY(-10px) scale(1.05);
          box-shadow: 0 20px 60px currentColor;
        }
        .modal-content {
          animation: slideIn 0.6s ease-out;
        }
        .timeline-line {
          position: absolute;
          left: 50%;
          top: 0;
          bottom: 0;
          width: 4px;
          background: linear-gradient(to bottom, #00f0ff, #a78bfa, #ff61d2);
          transform: translateX(-50%);
        }
        .timeline-dot {
          width: 16px;
          height: 16px;
          background: #000;
          border: 3px solid currentColor;
          border-radius: 50%;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          box-shadow: 0 0 20px currentColor;
        }
        @media (max-width: 768px) {
          .edu-grid { grid-template-columns: 1fr !important; }
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .timeline-line { display: none; }
        }
      `}</style>

      <div style={{ minHeight: '100vh', background: '#000', position: 'relative', overflow: 'hidden' }}>
        {/* Progress Bar */}
        <div style={{
          position: 'fixed', top: 0, left: 0, width: `${scrollProgress}%`, height: '4px',
          background: 'linear-gradient(90deg, #00f0ff, #a78bfa, #ff61d2)', zIndex: 10000,
          boxShadow: '0 0 20px rgba(0,240,255,0.8)'
        }} />

        {/* Grid Background */}
        <div style={{
          position: 'fixed', inset: 0,
          backgroundImage: 'linear-gradient(rgba(0,240,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(0,240,255,0.08) 1px, transparent 1px)',
          backgroundSize: '50px 50px', opacity: 0.25, pointerEvents: 'none'
        }} />

        {/* Particle Canvas */}
        <canvas ref={canvasRef} style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 2 }} />

        {/* Floating Orb */}
        <div style={{
          position: 'fixed', top: '20%', right: '-10%', width: '800px', height: '800px',
          border: '2px solid rgba(0,240,255,0.1)', borderRadius: '50%',
          animation: 'rotate 40s linear infinite', pointerEvents: 'none',
          transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`
        }} />

        <div style={{
          position: 'relative', zIndex: 10, maxWidth: '1600px', margin: '0 auto',
          padding: '0 2rem', paddingTop: 'clamp(5rem, 12vw, 8rem)', paddingBottom: '6rem'
        }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: 'clamp(4rem, 10vw, 6rem)' }}>
            <div style={{
              display: 'inline-block', fontFamily: "'Fira Code', monospace", color: '#00f0ff',
              fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)', padding: '0.8rem 2rem',
              border: '2px solid rgba(0,240,255,0.5)', borderRadius: '999px', marginBottom: '1.8rem',
              animation: 'pulse 3s infinite', background: 'rgba(0,240,255,0.05)'
            }}>
              {"> education.matrix.initialize()"}
            </div>
            <h1 style={{
              fontSize: 'clamp(3.5rem, 10vw, 7rem)', fontWeight: 900, letterSpacing: '5px',
              textTransform: 'uppercase', marginBottom: '1.5rem', lineHeight: 1.1,
              background: 'linear-gradient(135deg, #00f0ff 0%, #a78bfa 50%, #ff61d2 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              textShadow: '0 0 80px rgba(0,240,255,0.5)'
            }}>
              ACADEMIC BACKGROUND
            </h1>
            <p style={{
              fontSize: 'clamp(1.1rem, 3vw, 1.4rem)', color: '#b0b0d8', maxWidth: '900px',
              margin: '0 auto 3rem', fontFamily: "'Fira Code', monospace", lineHeight: 1.8
            }}>
              [ From foundational principles to cutting-edge AI ]<br/>
              <span style={{ color: '#00f0ff' }}>2019–2026</span> • Journey of Excellence & Innovation
            </p>

            {/* Stats Grid */}
            <div className="stats-grid" style={{
              display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem',
              maxWidth: '1000px', margin: '0 auto'
            }}>
              {[
                { label: "Years", value: 7, icon: Calendar, color: "#00f0ff" },
                { label: "Avg Score", value: "86%", icon: TrendingUp, color: "#a78bfa" },
                { label: "Achievements", value: 15, icon: Award, color: "#ff61d2" },
                { label: "Skills", value: "25+", icon: Zap, color: "#00f0ff" }
              ].map((stat, i) => (
                <div key={i} className="stat-card" style={{ borderColor: stat.color, color: stat.color }}>
                  <stat.icon size={32} style={{ marginBottom: '0.8rem' }} />
                  <div style={{ fontSize: '2.2rem', fontWeight: 800, marginBottom: '0.4rem', fontFamily: "'Fira Code', monospace" }}>
                    {stat.value}
                  </div>
                  <div style={{ fontSize: '0.9rem', opacity: 0.8, textTransform: 'uppercase', letterSpacing: '1px' }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education Cards Grid */}
          <div className="edu-grid" style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))',
            gap: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '7rem', position: 'relative'
          }}>
            {/* Timeline Line (Desktop only) */}
            <div className="timeline-line" style={{ display: window.innerWidth > 768 ? 'block' : 'none' }} />

            {education.map((edu, i) => {
              const isHovered = hoveredId === edu.id;
              const isVisible = visibleCards[edu.id];
              const isEven = i % 2 === 0;

              return (
                <div
                  key={edu.id}
                  data-id={edu.id}
                  data-observe
                  className={`edu-card ${isVisible ? 'visible' : ''}`}
                  onMouseEnter={() => setHoveredId(edu.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onClick={() => setActiveEdu(edu)}
                  style={{
                    '--card-color': edu.color,
                    animationDelay: `${i * 0.15}s`,
                    cursor: 'pointer',
                    marginLeft: isEven ? 'auto' : '0',
                    marginRight: isEven ? '0' : 'auto',
                    maxWidth: '420px'
                  }}
                >
                  {/* Timeline Dot */}
                  <div className="timeline-dot" style={{
                    top: '140px',
                    background: edu.color,
                    borderColor: edu.color,
                    display: window.innerWidth > 768 ? 'block' : 'none'
                  }} />

                  <div style={{
                    position: 'absolute', top: 0, left: 0, right: 0, height: '5px',
                    background: `linear-gradient(90deg, transparent, ${edu.color}, transparent)`,
                    opacity: isHovered ? 1 : 0.5, transition: 'opacity 0.5s', zIndex: 2
                  }} />

                  <div style={{ height: '280px', position: 'relative', overflow: 'hidden' }}>
                    <img src={edu.image} alt={edu.school} style={{
                      width: '100%', height: '100%', objectFit: 'cover',
                      transition: 'transform 0.7s', transform: isHovered ? 'scale(1.15)' : 'scale(1.05)'
                    }} />

                    <div style={{
                      position: 'absolute', inset: 0,
                      background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, transparent 60%)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                      <svg width="120" height="120" style={{ opacity: isHovered ? 1 : 0, transition: 'opacity 0.5s' }}>
                        <circle cx="60" cy="60" r="50" fill="none" stroke="rgba(0,240,255,0.2)" strokeWidth="8" />
                        <circle
                          cx="60" cy="60" r="50" fill="none" stroke={edu.color} strokeWidth="8"
                          strokeDasharray={314} strokeDashoffset={314 * (1 - edu.progress / 100)}
                          strokeLinecap="round" transform="rotate(-90 60 60)"
                        />
                        <text x="60" y="70" textAnchor="middle" fill={edu.color} fontSize="24" fontWeight="800" fontFamily="'Fira Code', monospace">
                          {edu.progress}%
                        </text>
                      </svg>
                    </div>
                  </div>

                  <div style={{ padding: 'clamp(1.6rem, 4vw, 2.2rem) clamp(1.4rem, 3.5vw, 2rem)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.6rem' }}>
                      <div style={{
                        width: '70px', height: '70px', border: `3px solid ${edu.color}`, borderRadius: '14px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        animation: isHovered ? 'float 3.2s ease-in-out infinite' : 'none',
                        boxShadow: isHovered ? `0 0 40px ${edu.color}` : 'none'
                      }}>
                        <edu.icon size={36} style={{ color: edu.color }} />
                      </div>
                      <div style={{
                        padding: '0.5rem 1.2rem', background: `${edu.color}20`,
                        border: `2px solid ${edu.color}`, borderRadius: '999px',
                        fontSize: '0.9rem', fontWeight: 700, color: edu.color
                      }}>
                        {edu.badge}
                      </div>
                    </div>

                    <h3 style={{ fontSize: 'clamp(1.7rem, 4.5vw, 1.95rem)', fontWeight: 800, color: '#fff', marginBottom: '0.7rem' }}>
                      {edu.title}
                    </h3>
                    <div style={{ fontSize: '1.05rem', color: '#b0b0d8', marginBottom: '0.4rem', fontFamily: "'Fira Code', monospace" }}>
                      {edu.school}
                    </div>
                    <div style={{ fontSize: '0.98rem', color: edu.color, fontWeight: 600, marginBottom: '0.6rem' }}>
                      {edu.year}
                    </div>
                    <div style={{ fontSize: '0.92rem', color: '#a0a0c0', marginBottom: '1.6rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                      <MapPin size={17} />
                      {edu.location}
                    </div>
                    <div style={{
                      fontSize: 'clamp(2.2rem, 6vw, 3rem)', fontWeight: 900, color: edu.color,
                      marginBottom: '1.8rem', textShadow: `0 0 18px ${edu.color}`
                    }}>
                      {edu.score}
                    </div>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.65rem', marginBottom: '1.8rem' }}>
                      {(edu.skills ?? []).slice(0, 6).map(s => (
                        <span key={s} className="skill-tag" style={{
                          color: isHovered ? edu.color : '#b0e0ff',
                          borderColor: isHovered ? edu.color : 'rgba(0,240,255,0.45)'
                        }}>
                          {s}
                        </span>
                      ))}
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', marginBottom: '2rem' }}>
                      {(edu.achievements ?? []).slice(0, 3).map((ach, idx) => (
                        <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', fontSize: '0.98rem' }}>
                          <CheckCircle2 size={17} style={{ color: edu.color }} />
                          {ach}
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={(e) => { e.stopPropagation(); setActiveEdu(edu); }}
                      style={{
                        width: '100%', padding: '1.1rem',
                        background: `linear-gradient(135deg, ${edu.color}, #a78bfa)`,
                        color: '#000', fontWeight: 800, borderRadius: '999px', border: 'none',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.9rem',
                        boxShadow: `0 0 35px ${edu.color}`, cursor: 'pointer', fontSize: '1.05rem',
                        transition: 'all 0.3s'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                      onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    >
                      <BookOpen size={20} />
                      View Full Record
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Final Call to Action */}
          <div style={{
            padding: 'clamp(3rem, 8vw, 4.5rem) 2rem',
            background: 'rgba(0,0,0,0.8)',
            border: '2.5px solid rgba(0,240,255,0.38)',
            borderRadius: '28px',
            textAlign: 'center',
            marginTop: '6rem'
          }}>
            <h2 style={{
              fontSize: 'clamp(2.8rem, 8vw, 4.5rem)',
              fontWeight: 900,
              background: 'linear-gradient(135deg, #00f0ff, #a78bfa, #ff61d2)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '2.5rem'
            }}>
              READY TO COLLABORATE?
            </h2>
            <p style={{
              fontSize: 'clamp(1.2rem, 3vw, 1.4rem)',
              color: '#b0b0d8',
              maxWidth: '800px',
              margin: '0 auto 3rem',
              lineHeight: 1.7
            }}>
              Let's build the future together. Whether it's AI research, full-stack development, or innovative projects — I'm ready to dive in.
            </p>
            <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="https://github.com/bhagavan444" target="_blank" rel="noopener noreferrer" style={{
                padding: '1.2rem 2.8rem', background: 'rgba(0,240,255,0.16)',
                border: '2.5px solid rgba(0,240,255,0.7)', borderRadius: '999px',
                color: '#00f0ff', fontWeight: 700, fontSize: '1.15rem', textDecoration: 'none',
                display: 'flex', alignItems: 'center', gap: '1rem', transition: 'all 0.3s'
              }}>
                <ExternalLink size={28} />
                VIEW PROJECTS
              </a>
              <a href="mailto:g.sivasatyasaibhagavan@gmail.com" style={{
                padding: '1.2rem 2.8rem', background: 'linear-gradient(135deg, #00f0ff, #a78bfa)',
                borderRadius: '999px', color: '#000', fontWeight: 900, fontSize: '1.15rem',
                textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '1rem', transition: 'all 0.3s'
              }}>
                <Sparkles size={28} />
                START CONVERSATION
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Detail View */}
      {activeEdu && (
        <div onClick={() => setActiveEdu(null)} style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.97)', backdropFilter: 'blur(16px)',
          zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem'
        }}>
          <div onClick={e => e.stopPropagation()} style={{
            background: 'rgba(6,6,28,0.98)', border: `4px solid ${activeEdu.color}`, borderRadius: '28px',
            maxWidth: '1300px', width: '96%', maxHeight: '92vh', overflowY: 'auto',
            boxShadow: `0 0 140px ${activeEdu.color}`, position: 'relative'
          }}>
            <button onClick={() => setActiveEdu(null)} style={{
              position: 'absolute', top: '1.5rem', right: '1.8rem', background: 'none',
              border: 'none', color: '#ff6666', cursor: 'pointer', zIndex: 10, transition: 'transform 0.3s'
            }}>
              <X size={48} strokeWidth={2.8} />
            </button>

            <img src={activeEdu.image} alt={activeEdu.school} style={{
              width: '100%', height: 'auto', maxHeight: '40vh', objectFit: 'cover', display: 'block'
            }} />

            <div className="modal-content" style={{ padding: 'clamp(2.2rem, 6vw, 4rem) clamp(1.6rem, 5vw, 3.5rem) 5rem' }}>
              <h2 style={{
                fontSize: 'clamp(2.6rem, 7vw, 4.2rem)', fontWeight: 900,
                background: `linear-gradient(135deg, ${activeEdu.color}, #a78bfa)`,
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '1.4rem'
              }}>
                {activeEdu.title}
              </h2>

              <div style={{
                display: 'flex', flexWrap: 'wrap', gap: '1.6rem', marginBottom: '2.8rem',
                fontSize: 'clamp(1.15rem, 3vw, 1.3rem)', color: '#d0d0ff'
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
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem' }}>
                  <Star size={26} />
                  {activeEdu.score}
                </div>
              </div>

              <p style={{
                fontSize: 'clamp(1.2rem, 3.2vw, 1.35rem)', lineHeight: 1.8,
                color: '#c8d0ff', marginBottom: '3rem'
              }}>
                {activeEdu.desc}
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                {/* Core Subjects */}
                <div>
                  <h3 style={{ fontSize: '1.5rem', color: activeEdu.color, marginBottom: '1rem', fontFamily: "'Fira Code', monospace" }}>
                    Core Subjects
                  </h3>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem' }}>
                    {activeEdu.coreSubjects.map(sub => (
                      <span key={sub} className="skill-tag" style={{ color: activeEdu.color, borderColor: activeEdu.color }}>
                        {sub}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Tools & Technologies */}
                <div>
                  <h3 style={{ fontSize: '1.5rem', color: activeEdu.color, marginBottom: '1rem', fontFamily: "'Fira Code', monospace" }}>
                    Tools & Technologies
                  </h3>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem' }}>
                    {activeEdu.tools.map(tool => (
                      <span key={tool} className="skill-tag" style={{ color: activeEdu.color, borderColor: activeEdu.color }}>
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Key Skills */}
                <div>
                  <h3 style={{ fontSize: '1.5rem', color: activeEdu.color, marginBottom: '1rem', fontFamily: "'Fira Code', monospace" }}>
                    Key Skills
                  </h3>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem' }}>
                    {activeEdu.skills.map(skill => (
                      <span key={skill} className="skill-tag" style={{ color: activeEdu.color, borderColor: activeEdu.color }}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Achievements */}
              <div style={{ marginTop: '3rem' }}>
                <h3 style={{ fontSize: '1.8rem', color: activeEdu.color, marginBottom: '1.5rem', fontFamily: "'Fira Code', monospace" }}>
                  Major Achievements
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.2rem' }}>
                  {activeEdu.achievements.map((ach, idx) => (
                    <div key={idx} style={{
                      display: 'flex', alignItems: 'center', gap: '1rem',
                      background: 'rgba(0,0,0,0.4)', padding: '1rem', borderRadius: '12px',
                      border: `1px solid ${activeEdu.color}30`
                    }}>
                      <Award size={24} style={{ color: activeEdu.color }} />
                      <span style={{ fontSize: '1rem', color: '#e0e0ff' }}>{ach}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Call to Action in Modal */}
              <div style={{ marginTop: '4rem', textAlign: 'center' }}>
                <a href="mailto:g.sivasatyasaibhagavan@gmail.com" style={{
                  padding: '1.3rem 3rem', background: `linear-gradient(135deg, ${activeEdu.color}, #a78bfa)`,
                  borderRadius: '999px', color: '#000', fontWeight: 900, fontSize: '1.2rem',
                  textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '1rem',
                  boxShadow: `0 0 40px ${activeEdu.color}50`
                }}>
                  <Sparkles size={28} />
                  Let's Discuss Your Project
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}