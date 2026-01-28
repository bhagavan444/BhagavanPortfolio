import { useState, useEffect, useRef } from "react";
import {
  GraduationCap, Calendar, MapPin, Brain, Code, Trophy,
  Sparkles, BookOpen, X, CheckCircle2, ExternalLink, Award,
  TrendingUp, Zap, Star, ChevronRight, Rocket, Terminal, 
  Activity, Cpu, Database, GitBranch, Shield, Flame
} from "lucide-react";

// PREMIUM ENTERPRISE EDUCATION PAGE
// Designed for world's top tech companies (Apple, Google, Microsoft, Meta level)
// Features: Advanced animations, neural networks, holographic effects, enterprise design

export default function PremiumEducation() {
  const [hoveredId, setHoveredId] = useState(null);
  const [activeEdu, setActiveEdu] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [visibleCards, setVisibleCards] = useState({});
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState([]);
  const [cursorTrail, setCursorTrail] = useState([]);
  const canvasRef = useRef(null);

  // Education data
  const education = [
    {
      id: 1,
      title: "B.Tech – Artificial Intelligence & Data Science",
      school: "Ramachandra College of Engineering (JNTUK)",
      year: "2022 – 2026",
      score: "7.9 CGPA",
      desc: "Specialized in building intelligent, data-driven systems using Machine Learning, Deep Learning, and Full-Stack Development.",
      color: "#00f5ff",
      glowRGB: "0, 245, 255",
      image:"https://lh3.googleusercontent.com/d/1wxnzvsS3MA7xWSxuXKeIkS8GaQoG4Y1a",
      location: "Eluru, Andhra Pradesh",
      skills: ["Machine Learning", "Deep Learning", "MERN Stack", "Computer Vision", "MLOps", "Neural Networks"],
      achievements: [
        "AI & ML Internship Experience",
        "Top 10% Academic Performer",
        "Multiple Full-Stack AI Projects",
        "24-Hour Hackathon Participant",
        "15+ Professional Certifications"
      ],
      badge: "CURRENT",
      icon: Brain,
      progress: 85,
      gradient: "linear-gradient(135deg, #00f5ff 0%, #0099ff 100%)"
    },
    {
      id: 2,
      title: "Intermediate – MPC",
      school: "Srividhya Junior College",
      year: "2020 – 2022",
      score: "7.8 CGPA",
      desc: "Pre-engineering curriculum with focus on analytical thinking, mathematical reasoning, and problem-solving.",
      color: "#a855f7",
      glowRGB: "168, 85, 247",
      image: "https://lh3.googleusercontent.com/d/1N1K1j6QGrgNPNL2D9UmfJAL2PVSulhPJ",      location: "Gudivada, Andhra Pradesh",
      skills: ["Problem Solving", "Logical Reasoning", "Analytical Thinking"],
      achievements: ["Top Performer in Mathematics", "Strong Academic Foundation"],
      badge: "FOUNDATION",
      icon: Code,
      progress: 78,
      gradient: "linear-gradient(135deg, #a855f7 0%, #7c3aed 100%)"
    },
    {
      id: 3,
      title: "Secondary School (10th)",
      school: "Montessori English Medium High School",
      year: "2019 – 2020",
      score: "9.5 GPA",
      desc: "Achieved academic excellence with exceptional performance in Mathematics and Science.",
      color: "#ff6b35",
      glowRGB: "255, 107, 53",
      image: "https://lh3.googleusercontent.com/d/1p1RXnVn9jySamu8OiIWF0WFhe7G6QxiL",
      location: "Gudivada, Andhra Pradesh",
      skills: ["Discipline", "Critical Thinking", "Leadership"],
      achievements: ["School Topper", "Perfect GPA", "Mathematics Excellence Award"],
      badge: "EXCELLENCE",
      icon: Trophy,
      progress: 95,
      gradient: "linear-gradient(135deg, #ff6b35 0%, #ff8c42 100%)"
    }
  ];

  // Particle system
  useEffect(() => {
    setParticles(Array.from({ length: 80 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      duration: Math.random() * 30 + 25,
      delay: Math.random() * 8
    })));
  }, []);

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 60;
      const y = (e.clientY / window.innerHeight - 0.5) * 60;
      setMousePosition({ x, y });
      setCursorTrail(prev => [...prev.slice(-15), { x: e.clientX, y: e.clientY, id: Date.now() }]);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress((scrolled / maxScroll) * 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Intersection observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleCards((prev) => ({ ...prev, [entry.target.dataset.id]: true }));
          }
        });
      },
      { threshold: 0.15 }
    );
    document.querySelectorAll("[data-observe]").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Neural network canvas
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

    const nodes = Array.from({ length: 120 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 1.2,
      vy: (Math.random() - 0.5) * 1.2,
      radius: Math.random() * 2.5 + 1
    }));

    const animate = () => {
      ctx.fillStyle = 'rgba(0,0,0,0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      nodes.forEach(node => {
        node.x += node.vx;
        node.y += node.vy;
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, node.radius * 3);
        gradient.addColorStop(0, 'rgba(0, 245, 255, 0.8)');
        gradient.addColorStop(1, 'rgba(0, 245, 255, 0)');
        ctx.fillStyle = gradient;
        ctx.fill();

        nodes.forEach(other => {
          const dx = node.x - other.x;
          const dy = node.y - other.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            const alpha = (1 - dist / 150) * 0.35;
            ctx.strokeStyle = `rgba(0, 245, 255, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(other.x, other.y);
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
    <div className="premium-education">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700&display=swap');

        * { margin: 0; padding: 0; box-sizing: border-box; }
        
        .premium-education {
          font-family: 'Inter', sans-serif;
          background: #000;
          color: #fff;
          overflow-x: hidden;
          min-height: 100vh;
        }

        @keyframes float-3d {
          0%, 100% { transform: translateY(0) rotateX(0deg); }
          33% { transform: translateY(-25px) rotateX(5deg); }
          66% { transform: translateY(-15px) rotateX(-3deg); }
        }

        @keyframes shimmer {
          0% { transform: translateX(-100%) skewX(-15deg); }
          100% { transform: translateX(200%) skewX(-15deg); }
        }

        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 30px currentColor; }
          50% { box-shadow: 0 0 60px currentColor, 0 0 120px currentColor; }
        }

        @keyframes slide-up {
          from { transform: translateY(60px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        @keyframes particle-float {
          0% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-100vh) rotate(720deg); opacity: 0; }
        }

        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .glass-card {
          background: rgba(255, 255, 255, 0.04);
          backdrop-filter: blur(40px) saturate(180%);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 32px;
          position: relative;
          overflow: hidden;
          transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .glass-card:hover {
          transform: translateY(-25px) scale(1.03);
          border-color: var(--card-color);
          box-shadow: 0 50px 120px var(--card-glow);
        }

        .premium-btn {
          background: var(--btn-gradient);
          border: none;
          color: #000;
          font-weight: 800;
          cursor: pointer;
          font-family: 'Orbitron', sans-serif;
          text-transform: uppercase;
          letter-spacing: 2.5px;
          transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative;
          overflow: hidden;
        }

        .premium-btn::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
          transform: translateX(-100%);
          animation: shimmer 3s infinite;
        }

        .premium-btn:hover {
          transform: translateY(-8px) scale(1.1);
          box-shadow: 0 30px 80px var(--btn-glow);
        }

        .skill-tag {
          background: rgba(0, 0, 0, 0.85);
          border: 2.5px solid currentColor;
          padding: 0.85rem 1.8rem;
          border-radius: 999px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.9rem;
          font-weight: 600;
          transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
          display: inline-block;
        }

        .skill-tag:hover {
          transform: translateY(-8px) scale(1.15);
          box-shadow: 0 20px 60px currentColor;
        }

        .stat-card {
          background: rgba(0, 0, 0, 0.75);
          backdrop-filter: blur(20px);
          border: 3px solid;
          border-radius: 28px;
          padding: 3rem;
          text-align: center;
          transition: all 0.7s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .stat-card:hover {
          transform: translateY(-20px) scale(1.1);
          box-shadow: 0 40px 100px currentColor;
        }

        @media (max-width: 768px) {
          .stats-grid { grid-template-columns: 1fr !important; }
          .edu-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* Progress Bar */}
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, height: '6px', zIndex: 10000,
        background: 'rgba(0,0,0,0.6)'
      }}>
        <div style={{
          width: `${scrollProgress}%`, height: '100%',
          background: 'linear-gradient(90deg, #00f5ff 0%, #a855f7 50%, #ff6b35 100%)',
          boxShadow: '0 0 40px currentColor', transition: 'width 0.1s'
        }} />
      </div>

      {/* Particles */}
      {particles.map(particle => (
        <div
          key={particle.id}
          style={{
            position: 'fixed', left: `${particle.x}%`, top: `${particle.y}%`,
            width: `${particle.size}px`, height: `${particle.size}px`,
            background: 'rgba(0, 245, 255, 0.8)', borderRadius: '50%',
            pointerEvents: 'none', animation: `particle-float ${particle.duration}s linear infinite`,
            animationDelay: `${particle.delay}s`, boxShadow: '0 0 18px rgba(0, 245, 255, 0.9)',
            zIndex: 1
          }}
        />
      ))}

      {/* Background */}
      <div style={{
        position: 'fixed', inset: 0,
        background: `
          radial-gradient(circle at 15% 85%, rgba(0, 245, 255, 0.2) 0%, transparent 50%),
          radial-gradient(circle at 85% 15%, rgba(168, 85, 247, 0.2) 0%, transparent 50%),
          radial-gradient(circle at 50% 50%, rgba(255, 107, 53, 0.15) 0%, transparent 50%)
        `,
        opacity: 0.7, pointerEvents: 'none', zIndex: 1
      }} />

      {/* Neural Network Canvas */}
      <canvas ref={canvasRef} style={{ 
        position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 2, opacity: 0.75
      }} />

      {/* Content */}
      <div style={{
        position: 'relative', zIndex: 10, maxWidth: '1800px', margin: '0 auto',
        padding: '0 clamp(1rem, 4vw, 3rem)', paddingTop: 'clamp(6rem, 14vw, 10rem)',
        paddingBottom: '10rem'
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(6rem, 12vw, 10rem)' }}>
          {/* Badge */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '1.2rem',
            fontFamily: "'JetBrains Mono', monospace", color: '#00f5ff',
            fontSize: 'clamp(0.9rem, 2.2vw, 1.1rem)', padding: '1.2rem 3rem',
            border: '3px solid rgba(0, 245, 255, 0.5)', borderRadius: '999px',
            marginBottom: '3rem', background: 'rgba(0, 245, 255, 0.1)',
            animation: 'pulse-glow 4s infinite', backdropFilter: 'blur(15px)',
            boxShadow: '0 15px 50px rgba(0, 245, 255, 0.35)'
          }}>
            <Terminal size={22} strokeWidth={3} />
            <span style={{ fontWeight: 700, letterSpacing: '2px' }}>
              EDUCATION.NEURAL_NETWORK.INITIALIZED
            </span>
            <Activity size={22} strokeWidth={3} />
          </div>

          {/* Title */}
          <h1 style={{
            fontSize: 'clamp(4rem, 13vw, 9rem)', fontWeight: 900,
            fontFamily: "'Orbitron', sans-serif", letterSpacing: '10px',
            textTransform: 'uppercase', marginBottom: '2.5rem', lineHeight: 1,
            background: 'linear-gradient(135deg, #00f5ff, #a855f7, #ff6b35)',
            backgroundSize: '200% auto', WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent', animation: 'gradient-shift 8s ease infinite'
          }}>
            ACADEMICS
          </h1>

          {/* Subtitle */}
          <p style={{
            fontSize: 'clamp(1.2rem, 3vw, 1.6rem)', color: '#c8d0e8',
            maxWidth: '1000px', margin: '0 auto 5rem', lineHeight: 2,
            fontWeight: 500, letterSpacing: '0.5px'
          }}>
            From foundational excellence to cutting-edge AI mastery — a transformative journey
            through innovation, technology, and academic achievement
            <br/>
            <span style={{
              color: '#00f5ff', fontFamily: "'JetBrains Mono', monospace",
              fontSize: '1.15rem', display: 'inline-block', marginTop: '1.5rem',
              padding: '0.7rem 2rem', background: 'rgba(0, 245, 255, 0.12)',
              borderRadius: '999px', border: '2px solid rgba(0, 245, 255, 0.4)',
              boxShadow: '0 10px 30px rgba(0, 245, 255, 0.2)'
            }}>
              [ 2019 → 2026 ]
            </span>
            <span style={{ color: '#a855f7', marginLeft: '1.5rem', fontWeight: 700 }}>
              • 7 Years of Innovation
            </span>
          </p>

          {/* Stats */}
          <div className="stats-grid" style={{
            display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '2.5rem', maxWidth: '1400px', margin: '0 auto'
          }}>
            {[
              { label: "Journey", value: "7Y", icon: Calendar, color: "#00f5ff" },
              { label: "Excellence", value: "86%", icon: TrendingUp, color: "#a855f7" },
              { label: "Milestones", value: "20+", icon: Award, color: "#ff6b35" },
              { label: "Tech Arsenal", value: "30+", icon: Zap, color: "#00f5ff" }
            ].map((stat, i) => (
              <div key={i} className="stat-card" style={{
                borderColor: stat.color, color: stat.color,
                animation: `slide-up 1s ease-out ${i * 0.15}s both`
              }}>
                <div style={{
                  width: '70px', height: '70px', margin: '0 auto 2rem',
                  borderRadius: '20px', background: `rgba(${stat.color === '#00f5ff' ? '0, 245, 255' : stat.color === '#a855f7' ? '168, 85, 247' : '255, 107, 53'}, 0.18)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  border: `3px solid ${stat.color}`, boxShadow: `0 0 35px ${stat.color}66`
                }}>
                  <stat.icon size={36} strokeWidth={3} />
                </div>
                <div style={{
                  fontSize: 'clamp(3rem, 7vw, 4rem)', fontWeight: 900,
                  marginBottom: '1rem', fontFamily: "'Orbitron', sans-serif",
                  textShadow: `0 0 30px ${stat.color}`
                }}>
                  {stat.value}
                </div>
                <div style={{
                  fontSize: '1.1rem', textTransform: 'uppercase',
                  letterSpacing: '2.5px', fontWeight: 700,
                  fontFamily: "'Orbitron', sans-serif"
                }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Education Cards */}
        <div className="edu-grid" style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(480px, 1fr))',
          gap: 'clamp(3.5rem, 7vw, 6rem)', marginBottom: '10rem'
        }}>
          {education.map((edu, i) => {
            const isHovered = hoveredId === edu.id;
            const isVisible = visibleCards[edu.id];

            return (
              <div
                key={edu.id}
                data-id={edu.id}
                data-observe
                className="glass-card"
                onMouseEnter={() => setHoveredId(edu.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => setActiveEdu(edu)}
                style={{
                  '--card-color': edu.color,
                  '--card-glow': `rgba(${edu.glowRGB}, 0.6)`,
                  cursor: 'pointer',
                  animation: `slide-up 1.2s ease-out ${i * 0.25}s both`
                }}
              >
                {/* Top Accent */}
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: '8px',
                  background: `linear-gradient(90deg, transparent, ${edu.color}, transparent)`,
                  boxShadow: `0 0 25px ${edu.color}`
                }} />

                {/* Image */}
                <div style={{ height: '360px', position: 'relative', overflow: 'hidden' }}>
                  <img src={edu.image} alt={edu.school} style={{
                    width: '100%', height: '100%', objectFit: 'cover',
                    transition: 'transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
                    transform: isHovered ? 'scale(1.3)' : 'scale(1.12)'
                  }} />
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: `linear-gradient(to top, rgba(0,0,0,0.98) 0%, rgba(0,0,0,0.75) 35%, transparent 75%)`
                  }} />

                  {/* Badge */}
                  <div style={{
                    position: 'absolute', top: '30px', right: '30px',
                    padding: '0.85rem 2rem', background: `rgba(${edu.glowRGB}, 0.3)`,
                    backdropFilter: 'blur(20px)', border: `3px solid ${edu.color}`,
                    borderRadius: '999px', fontSize: '0.95rem', fontWeight: 900,
                    color: edu.color, fontFamily: "'JetBrains Mono', monospace",
                    letterSpacing: '2px', display: 'flex', alignItems: 'center', gap: '0.7rem'
                  }}>
                    <Flame size={18} />
                    {edu.badge}
                  </div>

                  {/* Year */}
                  <div style={{
                    position: 'absolute', bottom: '30px', left: '30px',
                    padding: '0.75rem 1.8rem', background: 'rgba(0, 0, 0, 0.85)',
                    backdropFilter: 'blur(12px)', border: `2.5px solid ${edu.color}`,
                    borderRadius: '999px', fontSize: '1rem', fontWeight: 700,
                    color: edu.color, fontFamily: "'JetBrains Mono', monospace"
                  }}>
                    {edu.year}
                  </div>
                </div>

                {/* Content */}
                <div style={{ padding: 'clamp(2.5rem, 6vw, 3.5rem) clamp(2rem, 5vw, 3rem)' }}>
                  {/* Icon & Score */}
                  <div style={{
                    display: 'flex', justifyContent: 'space-between',
                    alignItems: 'center', marginBottom: '2.5rem'
                  }}>
                    <div style={{
                      width: '95px', height: '95px', border: `4px solid ${edu.color}`,
                      borderRadius: '24px', display: 'flex', alignItems: 'center',
                      justifyContent: 'center', background: `rgba(${edu.glowRGB}, 0.12)`,
                      animation: isHovered ? 'float-3d 4s ease-in-out infinite' : 'none',
                      boxShadow: `0 0 ${isHovered ? 60 : 25}px ${edu.color}${isHovered ? '' : '66'}`
                    }}>
                      <edu.icon size={48} style={{ color: edu.color }} strokeWidth={3} />
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{
                        fontSize: '0.85rem', color: '#a0a8c0',
                        fontFamily: "'JetBrains Mono', monospace", marginBottom: '0.5rem',
                        textTransform: 'uppercase', letterSpacing: '1.5px'
                      }}>
                        Performance
                      </div>
                      <div style={{
                        fontSize: '2.5rem', fontWeight: 900, color: edu.color,
                        fontFamily: "'Orbitron', sans-serif", textShadow: `0 0 25px ${edu.color}`
                      }}>
                        {edu.score.split(' ')[0]}
                      </div>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 style={{
                    fontSize: 'clamp(1.8rem, 5vw, 2.3rem)', fontWeight: 800,
                    background: `linear-gradient(135deg, ${edu.color}, #fff)`,
                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                    marginBottom: '1.2rem', lineHeight: 1.3, letterSpacing: '-0.5px'
                  }}>
                    {edu.title}
                  </h3>

                  {/* School */}
                  <div style={{
                    fontSize: '1.2rem', color: '#d0d8f0', marginBottom: '1rem',
                    fontWeight: 600, letterSpacing: '0.3px'
                  }}>
                    {edu.school}
                  </div>

                  {/* Location */}
                  <div style={{
                    fontSize: '1.05rem', color: '#a8b0d0', marginBottom: '2.5rem',
                    display: 'flex', alignItems: 'center', gap: '0.8rem',
                    fontFamily: "'JetBrains Mono', monospace"
                  }}>
                    <MapPin size={20} />
                    {edu.location}
                  </div>

                  {/* Description */}
                  <p style={{
                    fontSize: '1.05rem', color: '#b8c0e0', lineHeight: 1.9,
                    marginBottom: '2.5rem'
                  }}>
                    {edu.desc}
                  </p>

                  {/* Skills */}
                  <div style={{ marginBottom: '3rem' }}>
                    <div style={{
                      fontSize: '0.9rem', color: edu.color,
                      fontFamily: "'JetBrains Mono', monospace", marginBottom: '1.2rem',
                      fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase'
                    }}>
                      &lt;Core_Competencies/&gt;
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                      {edu.skills.map(skill => (
                        <span key={skill} className="skill-tag" style={{
                          color: isHovered ? edu.color : '#b8e0ff',
                          borderColor: isHovered ? edu.color : 'rgba(0, 245, 255, 0.5)'
                        }}>
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Achievements */}
                  <div style={{ marginBottom: '3rem' }}>
                    <div style={{
                      fontSize: '0.9rem', color: edu.color,
                      fontFamily: "'JetBrains Mono', monospace", marginBottom: '1.2rem',
                      fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase'
                    }}>
                      &lt;Key_Achievements/&gt;
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                      {edu.achievements.slice(0, 3).map((ach, idx) => (
                        <div key={idx} style={{
                          display: 'flex', alignItems: 'center', gap: '1.2rem',
                          fontSize: '1.05rem', color: '#e0e8f8', padding: '1rem',
                          background: 'rgba(255, 255, 255, 0.03)', borderRadius: '16px',
                          border: '1.5px solid rgba(255, 255, 255, 0.08)',
                          transition: 'all 0.5s'
                        }}>
                          <CheckCircle2 size={22} style={{ color: edu.color }} strokeWidth={3} />
                          <span>{ach}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  <button
                    className="premium-btn"
                    onClick={(e) => { e.stopPropagation(); setActiveEdu(edu); }}
                    style={{
                      '--btn-gradient': edu.gradient,
                      '--btn-glow': `rgba(${edu.glowRGB}, 0.7)`,
                      width: '100%', padding: '1.6rem', borderRadius: '999px',
                      fontSize: '1.1rem', display: 'flex', alignItems: 'center',
                      justifyContent: 'center', gap: '1.2rem'
                    }}
                  >
                    <BookOpen size={24} strokeWidth={3} />
                    <span>EXPLORE FULL DETAILS</span>
                    <ChevronRight size={24} strokeWidth={3} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="glass-card" style={{
          padding: 'clamp(5rem, 12vw, 7rem) clamp(3rem, 6vw, 4.5rem)',
          textAlign: 'center', borderColor: 'rgba(0, 245, 255, 0.5)',
          background: 'rgba(0, 25, 50, 0.45)'
        }}>
          <div style={{
            fontSize: '1.05rem', color: '#00f5ff', marginBottom: '2rem',
            fontFamily: "'JetBrains Mono', monospace", letterSpacing: '3px',
            fontWeight: 700, display: 'inline-block', padding: '0.8rem 2.2rem',
            border: '2.5px solid rgba(0, 245, 255, 0.5)', borderRadius: '999px',
            background: 'rgba(0, 245, 255, 0.08)'
          }}>
            &lt;COLLABORATION_PROTOCOL.ACTIVE&gt;
          </div>

          <h2 style={{
            fontSize: 'clamp(3.5rem, 10vw, 6rem)', fontWeight: 900,
            fontFamily: "'Orbitron', sans-serif",
            background: 'linear-gradient(135deg, #00f5ff, #a855f7, #ff6b35, #00f5ff)',
            backgroundSize: '300% auto', WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent', marginBottom: '3rem',
            letterSpacing: '5px', animation: 'gradient-shift 8s linear infinite'
          }}>
            LET'S BUILD THE FUTURE
          </h2>

          <p style={{
            fontSize: 'clamp(1.25rem, 3vw, 1.55rem)', color: '#d0d8f0',
            maxWidth: '950px', margin: '0 auto 5rem', lineHeight: 2.1, fontWeight: 500
          }}>
            Whether it's cutting-edge AI research, innovative full-stack solutions,
            or revolutionary projects — let's collaborate to create something extraordinary
          </p>

          <div style={{ display: 'flex', gap: '3rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a
              href="https://github.com/bhagavan444"
              target="_blank"
              rel="noopener noreferrer"
              className="premium-btn"
              style={{
                '--btn-gradient': 'linear-gradient(135deg, #00f5ff, #0099ff)',
                '--btn-glow': 'rgba(0, 245, 255, 0.7)',
                padding: '1.8rem 4rem', borderRadius: '999px', fontSize: '1.1rem',
                textDecoration: 'none', display: 'inline-flex', alignItems: 'center',
                gap: '1.5rem'
              }}
            >
              <GitBranch size={26} strokeWidth={3} />
              <span>VIEW PROJECTS</span>
              <ExternalLink size={26} strokeWidth={3} />
            </a>

            <a
              href="mailto:g.sivasatyasaibhagavan@gmail.com"
              className="premium-btn"
              style={{
                '--btn-gradient': 'linear-gradient(135deg, #a855f7, #7c3aed)',
                '--btn-glow': 'rgba(168, 85, 247, 0.7)',
                padding: '1.8rem 4rem', borderRadius: '999px', fontSize: '1.1rem',
                textDecoration: 'none', display: 'inline-flex', alignItems: 'center',
                gap: '1.5rem'
              }}
            >
              <Sparkles size={26} strokeWidth={3} />
              <span>START CONVERSATION</span>
              <Rocket size={26} strokeWidth={3} />
            </a>
          </div>
        </div>
      </div>

      {/* Modal */}
      {activeEdu && (
        <div onClick={() => setActiveEdu(null)} style={{
          position: 'fixed', inset: 0, background: 'rgba(0, 0, 0, 0.98)',
          backdropFilter: 'blur(30px)', zIndex: 9999, display: 'flex',
          alignItems: 'center', justifyContent: 'center', padding: '2rem'
        }}>
          <div onClick={e => e.stopPropagation()} style={{
            background: 'rgba(10, 10, 40, 0.98)', border: `6px solid ${activeEdu.color}`,
            borderRadius: '36px', maxWidth: '1200px', width: '98%', maxHeight: '90vh',
            overflowY: 'auto', position: 'relative',
            boxShadow: `0 0 250px rgba(${activeEdu.glowRGB}, 0.8)`
          }}>
            <button onClick={() => setActiveEdu(null)} style={{
              position: 'absolute', top: '2rem', right: '2rem', background: 'rgba(255, 107, 53, 0.25)',
              border: '3px solid #ff6b35', borderRadius: '50%', width: '60px', height: '60px',
              display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ff6b35',
              cursor: 'pointer', backdropFilter: 'blur(15px)', transition: 'all 0.5s'
            }}>
              <X size={32} strokeWidth={3.5} />
            </button>

            <div style={{ padding: '4rem 3rem' }}>
              <h2 style={{
                fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 900,
                fontFamily: "'Orbitron', sans-serif",
                background: `linear-gradient(135deg, ${activeEdu.color}, #fff)`,
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                marginBottom: '2rem'
              }}>
                {activeEdu.title}
              </h2>

              <p style={{
                fontSize: '1.3rem', lineHeight: 2, color: '#d8e0f8',
                marginBottom: '3rem', fontWeight: 500
              }}>
                {activeEdu.desc}
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {activeEdu.achievements.map((ach, idx) => (
                  <div key={idx} style={{
                    display: 'flex', alignItems: 'center', gap: '1.5rem',
                    padding: '1.5rem', background: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '16px', border: `2px solid rgba(${activeEdu.glowRGB}, 0.3)`
                  }}>
                    <CheckCircle2 size={24} style={{ color: activeEdu.color }} strokeWidth={3} />
                    <span style={{ fontSize: '1.15rem', color: '#f0f8ff' }}>{ach}</span>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: '4rem', textAlign: 'center' }}>
                <a
                  href="mailto:g.sivasatyasaibhagavan@gmail.com"
                  className="premium-btn"
                  style={{
                    '--btn-gradient': activeEdu.gradient,
                    '--btn-glow': `rgba(${activeEdu.glowRGB}, 0.8)`,
                    padding: '1.5rem 3.5rem', borderRadius: '999px', fontSize: '1.2rem',
                    textDecoration: 'none', display: 'inline-flex', alignItems: 'center',
                    gap: '1.5rem'
                  }}
                >
                  <Sparkles size={28} strokeWidth={3} />
                  <span>LET'S COLLABORATE</span>
                  <Rocket size={28} strokeWidth={3} />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}