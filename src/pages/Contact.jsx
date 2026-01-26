"use client";

import { useState, useEffect, useRef } from "react";
import {
  Mail, Phone, Send, CheckCircle2, Linkedin, Github, Twitter,
  Code, Zap, MessageCircle, User, ArrowRight, Sparkles, Award,
  Target, X, ExternalLink, Terminal, Cpu, Database, Layers,
  Globe, Rocket, Brain, Coffee, Clock, Download, Share2,
  Code2, Users, Trophy, Lock, GitBranch, Cpu as CpuIcon,
  Database as DatabaseIcon, Layers as LayersIcon, AlertCircle
} from "lucide-react";

export default function EliteDeveloperContact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("idle");
  const [focusedField, setFocusedField] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeSkill, setActiveSkill] = useState(null);
  const [messageCount, setMessageCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

  const canvasRef = useRef(null);
  const matrixCanvasRef = useRef(null);

  // Typing animation
  const [currentText, setCurrentText] = useState("");
  const [charIndex, setCharIndex] = useState(0);
  const [textIndex, setTextIndex] = useState(0);
  const texts = [
    "Let's build something extraordinary together! 🚀",
    "Ready to transform your vision into reality?",
    "Elite solutions for complex problems 💡",
    "Where innovation meets execution ⚡",
    "Your next big project starts here...",
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      if (charIndex < texts[textIndex].length) {
        setCharIndex(charIndex + 1);
        setCurrentText(texts[textIndex].slice(0, charIndex + 1));
      } else {
        setTimeout(() => {
          setCharIndex(0);
          setTextIndex((textIndex + 1) % texts.length);
        }, 3500);
      }
    }, 80);

    return () => clearTimeout(timer);
  }, [charIndex, textIndex]);

  // 24-hour response countdown
  useEffect(() => {
    const targetTime = new Date();
    targetTime.setHours(targetTime.getHours() + 24);

    const interval = setInterval(() => {
      const now = new Date();
      const diff = targetTime - now;

      if (diff > 0) {
        setTimeLeft({
          hours: Math.floor(diff / (1000 * 60 * 60)),
          minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((diff % (1000 * 60)) / 1000)
        });
      } else {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Mouse tracking for interactive effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Matrix rain background
  useEffect(() => {
    const canvas = matrixCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+-=[]{}|;:,.<>?';
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#00f0ff';
      ctx.font = `${fontSize}px 'JetBrains Mono', monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 33);

    window.addEventListener('resize', resize);
    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', resize);
    };
  }, []);

  // Floating particles with connections
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

    const particles = Array.from({ length: 100 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      size: Math.random() * 2.5 + 1,
      color: Math.random() > 0.5 ? 'rgba(0, 240, 255, 0.5)' : 'rgba(167, 139, 250, 0.5)'
    }));

    const animate = () => {
      ctx.fillStyle = 'rgba(0,0,0,0.06)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        particles.slice(i + 1).forEach(p2 => {
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            ctx.strokeStyle = `rgba(0, 240, 255, ${0.3 - dist / 700})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        });

        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 8);
        gradient.addColorStop(0, p.color);
        gradient.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 8, 0, Math.PI * 2);
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

  // Form validation (only name, email, message)
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setMessageCount(prev => prev + 1);

    try {
      // Simulate API call (replace with real API later)
      await new Promise(resolve => setTimeout(resolve, 2200));

      setSubmitStatus("success");
      setFormData({
        name: "",
        email: "",
        message: ""
      });
      setErrors({});

      setTimeout(() => {
        setSubmitStatus("idle");
        setIsSubmitting(false);
      }, 6000);
    } catch (error) {
      setSubmitStatus("error");
      setIsSubmitting(false);
    }
  };

  const skills = [
    { icon: Code, name: "Full Stack Development", level: 96, color: "#00f0ff" },
    { icon: DatabaseIcon, name: "Database Architecture", level: 93, color: "#a78bfa" },
    { icon: LayersIcon, name: "System Design", level: 91, color: "#ff61d2" },
    { icon: CpuIcon, name: "AI/ML Integration", level: 89, color: "#00f0ff" },
    { icon: Globe, name: "Cloud & DevOps", level: 94, color: "#a78bfa" },
    { icon: Zap, name: "Performance Optimization", level: 97, color: "#ff61d2" }
  ];

  const achievements = [
    { icon: Award, label: "50+ Projects", value: "Delivered" },
    { icon: Target, label: "98% Success", value: "Rate" },
    { icon: Coffee, label: "∞ Coffee", value: "Consumed" },
    { icon: Rocket, label: "<24hr", value: "Response" }
  ];

  const socialLinks = [
    {
      icon: Github,
      label: "GitHub",
      href: "https://github.com/bhagavan444",
      color: "#ffffff",
      stats: "15+ Repos • Growing Stars"
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/gopalajosyula-siva-satya-sai-bhagavan-1624a027b/",
      color: "#00f0ff",
      stats: "500+ Connections • Active"
    },
    {
      icon: Twitter,
      label: "Twitter",
      href: "https://twitter.com/bhagavan444",
      color: "#00f0ff",
      stats: "Tech Insights • Follow"
    }
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Fira+Code:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&display=swap');

        :root {
          --neon-primary: #00f0ff;
          --neon-secondary: #a78bfa;
          --neon-accent: #ff61d2;
          --neon-gradient: linear-gradient(135deg, #00f0ff, #a78bfa, #ff61d2);
          --neon-glow: 0 0 35px rgba(0, 240, 255, 0.85);
          --card-gradient: linear-gradient(135deg, rgba(0,240,255,0.12), rgba(167,139,250,0.12));
        }

        * { margin: 0; padding: 0; box-sizing: border-box; }

        @keyframes slideIn { from { opacity:0; transform:translateY(60px); } to { opacity:1; transform:translateY(0); } }
        @keyframes float { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-15px); } }
        @keyframes pulse { 0%,100% { opacity:1; transform:scale(1); } 50% { opacity:0.8; transform:scale(1.05); } }
        @keyframes spin { from { transform:rotate(0deg); } to { transform:rotate(360deg); } }
        @keyframes blink { 0%,50% { opacity:1; } 51%,100% { opacity:0; } }
        @keyframes glow { 0%,100% { box-shadow: 0 0 25px rgba(0,240,255,0.6); } 50% { box-shadow: 0 0 50px rgba(0,240,255,0.9); } }
        @keyframes shimmer { 0% { background-position: -2000px 0; } 100% { background-position: 2000px 0; } }

        .contact-card {
          transition: all 0.5s cubic-bezier(0.23,1,0.32,1);
          position: relative;
          overflow: hidden;
          backdrop-filter: blur(10px);
        }

        .contact-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: var(--card-gradient);
          opacity: 0;
          transition: opacity 0.5s;
        }

        .contact-card:hover::before {
          opacity: 1;
        }

        .contact-card:hover {
          transform: translateY(-15px) scale(1.03);
          box-shadow: 0 25px 70px rgba(0,0,0,0.5), 0 0 90px rgba(0,240,255,0.4);
        }

        .skill-bar {
          position: relative;
          overflow: hidden;
          height: 10px;
          background: rgba(255,255,255,0.08);
          border-radius: 999px;
        }

        .skill-bar::after {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
          animation: shimmer 3s infinite;
        }

        .stat-card {
          animation: float 4s ease-in-out infinite;
        }

        .stat-card:nth-child(2) { animation-delay: 0.6s; }
        .stat-card:nth-child(3) { animation-delay: 1.2s; }
        .stat-card:nth-child(4) { animation-delay: 1.8s; }

        .error-text {
          color: #ff6b6b;
          font-size: 0.9rem;
          margin-top: 0.4rem;
          font-family: 'Fira Code', monospace;
        }

        .input-error {
          border-color: #ff6b6b !important;
          box-shadow: 0 0 15px rgba(255,107,107,0.4) !important;
        }

        input:focus, textarea:focus, select:focus {
          outline: none;
          border-color: var(--neon-primary) !important;
          box-shadow: 0 0 25px rgba(0,240,255,0.4) !important;
        }

        @media (max-width: 1024px) {
          .main-grid { grid-template-columns: 1fr !important; gap: 3.5rem !important; }
        }

        @media (max-width: 768px) {
          .skills-grid { grid-template-columns: 1fr !important; }
          .social-grid { grid-template-columns: 1fr !important; }
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }

        @media (max-width: 480px) {
          .floating-cta { bottom: 1.5rem !important; }
        }
      `}</style>

      <div style={{
        minHeight: '100vh',
        background: '#000000',
        color: '#e0e0ff',
        position: 'relative',
        overflow: 'hidden',
        padding: 'clamp(4rem, 8vw, 7rem) 1.5rem 8rem',
        fontFamily: "'Outfit', sans-serif"
      }}>
        {/* Matrix Rain Background */}
        <canvas
          ref={matrixCanvasRef}
          style={{
            position: 'absolute',
            inset: 0,
            opacity: 0.09,
            pointerEvents: 'none',
            zIndex: 0
          }}
        />

        {/* Grid overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(0,240,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,240,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '45px 45px',
          opacity: 0.18,
          pointerEvents: 'none',
          zIndex: 1
        }} />

        {/* Particles */}
        <canvas
          ref={canvasRef}
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            zIndex: 2
          }}
        />

        {/* Floating gradient orbs */}
        <div style={{
          position: 'absolute',
          top: '15%',
          left: '8%',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(0,240,255,0.18) 0%, transparent 70%)',
          filter: 'blur(100px)',
          animation: 'float 12s ease-in-out infinite',
          zIndex: 1
        }} />
        <div style={{
          position: 'absolute',
          bottom: '15%',
          right: '8%',
          width: '700px',
          height: '700px',
          background: 'radial-gradient(circle, rgba(167,139,250,0.18) 0%, transparent 70%)',
          filter: 'blur(120px)',
          animation: 'float 15s ease-in-out infinite reverse',
          zIndex: 1
        }} />

        <div style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: '1800px',
          margin: '0 auto',
          width: '100%'
        }}>
          {/* Status Bar */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '4rem',
            padding: '1.4rem 2.5rem',
            background: 'rgba(0,0,0,0.65)',
            border: '1.5px solid rgba(0,240,255,0.35)',
            borderRadius: '20px',
            backdropFilter: 'blur(12px)',
            flexWrap: 'wrap',
            gap: '1.5rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
              <div style={{
                width: '14px',
                height: '14px',
                borderRadius: '50%',
                background: '#00ff00',
                animation: 'pulse 2.2s infinite',
                boxShadow: '0 0 12px #00ff00'
              }} />
              <span style={{ fontFamily: "'Fira Code', monospace", fontSize: '1.1rem', color: '#00ff00', fontWeight: 600 }}>
                ONLINE & READY TO COLLABORATE
              </span>
            </div>
            <div style={{ display: 'flex', gap: '2.5rem', fontSize: '1rem', fontFamily: "'Fira Code', monospace" }}>
              <div>Response Time: <span style={{ color: 'var(--neon-primary)', fontWeight: 700 }}>
                {String(timeLeft.hours).padStart(2, '0')}:{String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}
              </span></div>
              <div>Messages Sent: <span style={{ color: 'var(--neon-accent)' }}>{messageCount}</span></div>
            </div>
          </div>

          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: 'clamp(5rem, 10vw, 8rem)' }}>
            <div style={{
              display: 'inline-block',
              fontFamily: "'JetBrains Mono', monospace",
              color: 'var(--neon-primary)',
              fontSize: 'clamp(1.1rem, 2.5vw, 1.3rem)',
              padding: '1rem 2.5rem',
              border: '2.5px solid rgba(0,240,255,0.55)',
              borderRadius: '999px',
              marginBottom: '2.5rem',
              animation: 'glow 3.5s infinite',
              background: 'rgba(0,240,255,0.08)',
              backdropFilter: 'blur(10px)'
            }}>
              <Terminal size={22} style={{ display: 'inline', marginRight: '0.8rem', verticalAlign: 'middle' }} />
              {'contact.initiate()'} <span style={{ animation: 'blink 1.1s infinite' }}>_</span>
            </div>

            <h1 style={{
              fontSize: 'clamp(4rem, 11vw, 8.5rem)',
              fontWeight: 900,
              letterSpacing: '7px',
              textTransform: 'uppercase',
              marginBottom: '1.8rem',
              lineHeight: 1.1,
              background: 'var(--neon-gradient)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 0 50px rgba(0,240,255,0.6)'
            }}>
              ELITE CONTACT
            </h1>

            <div style={{
              fontSize: 'clamp(1.5rem, 4vw, 2.4rem)',
              fontWeight: 700,
              color: '#c0c0ff',
              marginBottom: '3rem',
              minHeight: '3.5rem',
              fontFamily: "'Fira Code', monospace"
            }}>
              {currentText}
              <span style={{
                display: 'inline-block',
                width: '4px',
                height: '1.3em',
                background: 'var(--neon-primary)',
                animation: 'blink 1s step-end infinite',
                marginLeft: '6px',
                verticalAlign: 'middle'
              }} />
            </div>

            <p style={{
              fontSize: 'clamp(1.2rem, 3vw, 1.5rem)',
              color: '#b0b0d8',
              maxWidth: '950px',
              margin: '0 auto 3.5rem',
              lineHeight: 1.9
            }}>
              Let's turn your vision into production-grade reality with elite full-stack expertise.
            </p>

            {/* Quick Stats */}
            <div className="stats-grid" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '2rem',
              maxWidth: '1000px',
              margin: '0 auto'
            }}>
              {achievements.map((stat, i) => (
                <div key={i} className="stat-card" style={{
                  padding: '2rem 1.5rem',
                  background: 'rgba(0,0,0,0.55)',
                  border: '1.5px solid rgba(0,240,255,0.35)',
                  borderRadius: '20px',
                  backdropFilter: 'blur(12px)',
                  textAlign: 'center'
                }}>
                  <stat.icon size={36} color="var(--neon-primary)" style={{ marginBottom: '1rem' }} />
                  <div style={{ fontSize: '2.2rem', fontWeight: 900, color: 'var(--neon-primary)', marginBottom: '0.5rem' }}>
                    {stat.value}
                  </div>
                  <div style={{ fontSize: '1rem', color: '#c0c0ff' }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Skills Showcase */}
          <div style={{
            marginBottom: '6rem',
            padding: '4rem 2.5rem',
            background: 'rgba(0,0,0,0.65)',
            border: '2.5px solid rgba(0,240,255,0.35)',
            borderRadius: '28px',
            backdropFilter: 'blur(12px)'
          }}>
            <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
              <h2 style={{
                fontSize: 'clamp(2.5rem, 6vw, 4rem)',
                fontWeight: 900,
                background: 'var(--neon-gradient)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: '0.8rem'
              }}>
                Technical Mastery
              </h2>
              <p style={{ color: '#c0c0ff', fontSize: '1.2rem' }}>
                Expertise that delivers real business impact
              </p>
            </div>

            <div className="skills-grid" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
              gap: '2.5rem'
            }}>
              {skills.map((skill, i) => (
                <div
                  key={i}
                  onMouseEnter={() => setActiveSkill(i)}
                  onMouseLeave={() => setActiveSkill(null)}
                  style={{
                    padding: '2rem',
                    background: activeSkill === i ? 'rgba(0,240,255,0.12)' : 'rgba(255,255,255,0.04)',
                    border: `2.5px solid ${activeSkill === i ? skill.color : 'rgba(255,255,255,0.12)'}`,
                    borderRadius: '20px',
                    transition: 'all 0.4s',
                    transform: activeSkill === i ? 'translateY(-8px)' : 'translateY(0)',
                    boxShadow: activeSkill === i ? `0 0 40px ${skill.color}40` : 'none'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '1.5rem' }}>
                    <div style={{
                      width: '65px',
                      height: '65px',
                      borderRadius: '16px',
                      background: `${skill.color}20`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <skill.icon size={36} color={skill.color} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 800, fontSize: '1.3rem', marginBottom: '0.4rem' }}>
                        {skill.name}
                      </div>
                      <div style={{ color: skill.color, fontSize: '1rem', fontWeight: 700 }}>
                        {skill.level}% Mastery
                      </div>
                    </div>
                  </div>

                  <div className="skill-bar">
                    <div style={{
                      height: '100%',
                      width: `${skill.level}%`,
                      background: `linear-gradient(90deg, ${skill.color}, ${skill.color}aa)`,
                      borderRadius: '999px',
                      transition: 'width 1.2s ease-out',
                      boxShadow: `0 0 20px ${skill.color}`
                    }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Main Content - Form + Contact Info */}
          <div className="main-grid" style={{
            display: 'grid',
            gridTemplateColumns: '1.3fr 1fr',
            gap: 'clamp(3rem, 6vw, 5rem)',
            marginBottom: '6rem'
          }}>
            {/* Contact Form - Rebuilt with only Name, Email, Message */}
            <div className="contact-card" style={{
              background: 'rgba(0,0,0,0.75)',
              border: '2.5px solid rgba(0,240,255,0.35)',
              borderRadius: '32px',
              padding: 'clamp(3rem, 6vw, 4.5rem)',
              boxShadow: '0 0 90px rgba(0,240,255,0.2)'
            }}>
              {submitStatus === "success" ? (
                <div style={{
                  textAlign: 'center',
                  padding: '6rem 2.5rem'
                }}>
                  <div style={{
                    width: '140px',
                    height: '140px',
                    margin: '0 auto 3rem',
                    borderRadius: '50%',
                    background: 'var(--neon-gradient)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 0 100px rgba(0,240,255,0.9)',
                    animation: 'pulse 2.5s infinite'
                  }}>
                    <CheckCircle2 size={80} color="#000" />
                  </div>
                  <h3 style={{
                    fontSize: 'clamp(2.5rem, 6vw, 3.5rem)',
                    fontWeight: 900,
                    color: 'var(--neon-primary)',
                    marginBottom: '2rem'
                  }}>
                    Message Sent Successfully!
                  </h3>
                  <p style={{
                    fontSize: '1.5rem',
                    color: '#c0c0ff',
                    marginBottom: '1.5rem'
                  }}>
                    Thank you, {formData.name}! Your message has been received.
                  </p>
                  <p style={{
                    fontSize: '1.2rem',
                    color: '#a0a0d0'
                  }}>
                    I'll get back to you within 24 hours. Let's create something legendary together!
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <h3 style={{
                    fontSize: 'clamp(2rem, 5vw, 2.8rem)',
                    fontWeight: 900,
                    color: 'var(--neon-primary)',
                    marginBottom: '3rem',
                    fontFamily: "'Fira Code', monospace",
                    textAlign: 'center'
                  }}>
                    {'<'} GET IN TOUCH {'/>'}
                  </h3>

                  <div style={{ display: 'grid', gap: '2.8rem' }}>
                    {/* Name */}
                    <div>
                      <label style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.8rem',
                        marginBottom: '1rem',
                        fontSize: '1.15rem',
                        color: '#c0c0ff',
                        fontWeight: 600
                      }}>
                        <User size={22} />
                        Your Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Developer"
                        required
                        className={errors.name ? 'input-error' : ''}
                        style={{
                          width: '100%',
                          padding: '1.5rem',
                          background: 'rgba(255,255,255,0.06)',
                          border: `2.5px solid ${focusedField === 'name' ? 'var(--neon-primary)' : errors.name ? '#ff6b6b' : 'rgba(255,255,255,0.18)'}`,
                          borderRadius: '16px',
                          color: '#ffffff',
                          fontSize: '1.15rem',
                          outline: 'none',
                          transition: 'all 0.4s',
                          boxShadow: focusedField === 'name' ? '0 0 25px rgba(0,240,255,0.4)' : errors.name ? '0 0 15px rgba(255,107,107,0.4)' : 'none'
                        }}
                        onFocus={() => setFocusedField('name')}
                        onBlur={() => setFocusedField(null)}
                      />
                      {errors.name && <div className="error-text">{errors.name}</div>}
                    </div>

                    {/* Email */}
                    <div>
                      <label style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.8rem',
                        marginBottom: '1rem',
                        fontSize: '1.15rem',
                        color: '#c0c0ff',
                        fontWeight: 600
                      }}>
                        <Mail size={22} />
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@company.com"
                        required
                        className={errors.email ? 'input-error' : ''}
                        style={{
                          width: '100%',
                          padding: '1.5rem',
                          background: 'rgba(255,255,255,0.06)',
                          border: `2.5px solid ${focusedField === 'email' ? 'var(--neon-primary)' : errors.email ? '#ff6b6b' : 'rgba(255,255,255,0.18)'}`,
                          borderRadius: '16px',
                          color: '#ffffff',
                          fontSize: '1.15rem',
                          outline: 'none',
                          transition: 'all 0.4s',
                          boxShadow: focusedField === 'email' ? '0 0 25px rgba(0,240,255,0.4)' : errors.email ? '0 0 15px rgba(255,107,107,0.4)' : 'none'
                        }}
                        onFocus={() => setFocusedField('email')}
                        onBlur={() => setFocusedField(null)}
                      />
                      {errors.email && <div className="error-text">{errors.email}</div>}
                    </div>

                    {/* Message */}
                    <div>
                      <label style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.8rem',
                        marginBottom: '1rem',
                        fontSize: '1.15rem',
                        color: '#c0c0ff',
                        fontWeight: 600
                      }}>
                        <MessageCircle size={22} />
                        Your Message
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={8}
                        placeholder="Tell me about your project, goals, challenges, timeline, or anything you'd like to discuss..."
                        required
                        className={errors.message ? 'input-error' : ''}
                        style={{
                          width: '100%',
                          padding: '1.5rem',
                          background: 'rgba(255,255,255,0.06)',
                          border: `2.5px solid ${focusedField === 'message' ? 'var(--neon-primary)' : errors.message ? '#ff6b6b' : 'rgba(255,255,255,0.18)'}`,
                          borderRadius: '16px',
                          color: '#ffffff',
                          fontSize: '1.15rem',
                          resize: 'vertical',
                          minHeight: '220px',
                          outline: 'none',
                          transition: 'all 0.4s',
                          fontFamily: "'Outfit', sans-serif",
                          boxShadow: focusedField === 'message' ? '0 0 25px rgba(0,240,255,0.4)' : errors.message ? '0 0 15px rgba(255,107,107,0.4)' : 'none'
                        }}
                        onFocus={() => setFocusedField('message')}
                        onBlur={() => setFocusedField(null)}
                      />
                      {errors.message && <div className="error-text">{errors.message}</div>}
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      style={{
                        padding: '1.8rem',
                        background: isSubmitting ? 'rgba(0,240,255,0.35)' : 'var(--neon-gradient)',
                        borderRadius: '999px',
                        color: '#000',
                        fontWeight: 900,
                        fontSize: '1.4rem',
                        border: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '1.5rem',
                        boxShadow: isSubmitting ? 'none' : '0 0 70px rgba(0,240,255,0.8)',
                        cursor: isSubmitting ? 'not-allowed' : 'pointer',
                        opacity: isSubmitting ? 0.75 : 1,
                        transition: 'all 0.5s',
                        transform: isSubmitting ? 'scale(0.98)' : 'scale(1)'
                      }}
                      onMouseEnter={(e) => !isSubmitting && (e.target.style.transform = 'scale(1.06)')}
                      onMouseLeave={(e) => !isSubmitting && (e.target.style.transform = 'scale(1)')}
                    >
                      {isSubmitting ? (
                        <>
                          <div style={{
                            width: '30px',
                            height: '30px',
                            border: '5px solid #000',
                            borderTopColor: '#fff',
                            borderRadius: '50%',
                            animation: 'spin 1s linear infinite'
                          }} />
                          SENDING MESSAGE...
                        </>
                      ) : (
                        <>
                          <Send size={32} />
                          SEND MESSAGE
                          <Rocket size={32} />
                        </>
                      )}
                    </button>

                    <div style={{
                      textAlign: 'center',
                      fontSize: '1rem',
                      color: '#909090',
                      fontFamily: "'Fira Code', monospace"
                    }}>
                      🔒 End-to-end encrypted • Your data is secure
                    </div>
                  </div>
                </form>
              )}
            </div>

            {/* Contact Info & Social Links */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'clamp(2.5rem, 5vw, 4rem)'
            }}>
              {/* Quick Contact Card */}
              <div className="contact-card" style={{
                background: 'rgba(0,0,0,0.75)',
                border: '2.5px solid rgba(0,240,255,0.35)',
                borderRadius: '28px',
                padding: 'clamp(2.5rem, 5vw, 3.5rem)',
                boxShadow: '0 0 70px rgba(0,240,255,0.2)'
              }}>
                <h3 style={{
                  fontSize: 'clamp(1.8rem, 4.5vw, 2.4rem)',
                  fontWeight: 900,
                  color: 'var(--neon-primary)',
                  marginBottom: '2.5rem',
                  textAlign: 'center',
                  fontFamily: "'Fira Code', monospace"
                }}>
                  {'<'} DIRECT ACCESS {'/>'}
                </h3>

                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '2rem'
                }}>
                  <a
                    href="mailto:g.sivasatyasaibhagavan@gmail.com"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1.8rem',
                      padding: '2rem',
                      background: 'rgba(255,255,255,0.05)',
                      borderRadius: '20px',
                      border: '2.5px solid rgba(0,240,255,0.35)',
                      color: '#ffffff',
                      textDecoration: 'none',
                      transition: 'all 0.4s'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(0,240,255,0.15)';
                      e.currentTarget.style.transform = 'translateX(8px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                      e.currentTarget.style.transform = 'translateX(0)';
                    }}
                  >
                    <div style={{
                      width: '85px',
                      height: '85px',
                      borderRadius: '24px',
                      background: 'var(--neon-gradient)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <Mail size={44} color="#000" />
                    </div>

                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>
                        Priority Email
                      </div>
                      <div style={{ color: '#c0c0ff', fontSize: '1.05rem', wordBreak: 'break-all' }}>
                        g.sivasatyasaibhagavan@gmail.com
                      </div>
                    </div>

                    <ArrowRight size={28} color="var(--neon-primary)" />
                  </a>

                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '2rem'
                  }}>
                    <a
                      href="tel:+917569205626"
                      style={{
                        padding: '2rem 1.5rem',
                        background: 'rgba(255,255,255,0.05)',
                        borderRadius: '20px',
                        border: '2.5px solid rgba(167,139,250,0.35)',
                        color: '#ffffff',
                        textDecoration: 'none',
                        textAlign: 'center',
                        transition: 'all 0.4s',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '1rem'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(167,139,250,0.15)';
                        e.currentTarget.style.transform = 'translateY(-8px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                        e.currentTarget.style.transform = 'translateY(0)';
                      }}
                    >
                      <Phone size={40} color="var(--neon-secondary)" />
                      <div style={{ fontSize: '1.2rem', fontWeight: 800 }}>+91 75692 05626</div>
                      <div style={{ fontSize: '0.95rem', color: '#c0c0ff' }}>Primary</div>
                    </a>

                    <a
                      href="tel:+919032230626"
                      style={{
                        padding: '2rem 1.5rem',
                        background: 'rgba(255,255,255,0.05)',
                        borderRadius: '20px',
                        border: '2.5px solid rgba(255,97,210,0.35)',
                        color: '#ffffff',
                        textDecoration: 'none',
                        textAlign: 'center',
                        transition: 'all 0.4s',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '1rem'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(255,97,210,0.15)';
                        e.currentTarget.style.transform = 'translateY(-8px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                        e.currentTarget.style.transform = 'translateY(0)';
                      }}
                    >
                      <Phone size={40} color="var(--neon-accent)" />
                      <div style={{ fontSize: '1.2rem', fontWeight: 800 }}>+91 90322 30626</div>
                      <div style={{ fontSize: '0.95rem', color: '#c0c0ff' }}>Secondary</div>
                    </a>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="contact-card" style={{
                background: 'rgba(0,0,0,0.75)',
                border: '2.5px solid rgba(0,240,255,0.35)',
                borderRadius: '28px',
                padding: 'clamp(2.5rem, 5vw, 3.5rem)',
                boxShadow: '0 0 70px rgba(0,240,255,0.2)'
              }}>
                <h3 style={{
                  fontSize: 'clamp(1.8rem, 4.5vw, 2.4rem)',
                  fontWeight: 900,
                  color: 'var(--neon-primary)',
                  marginBottom: '2.5rem',
                  textAlign: 'center',
                  fontFamily: "'Fira Code', monospace"
                }}>
                  {'<'} SOCIAL NETWORK {'/>'}
                </h3>

                <div className="social-grid" style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr',
                  gap: '2rem'
                }}>
                  {socialLinks.map((link, i) => (
                    <a
                      key={i}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1.8rem',
                        padding: '2rem',
                        background: 'rgba(255,255,255,0.05)',
                        borderRadius: '20px',
                        border: `2.5px solid ${link.color}40`,
                        color: '#ffffff',
                        textDecoration: 'none',
                        transition: 'all 0.4s'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = `${link.color}20`;
                        e.currentTarget.style.transform = 'translateX(10px)';
                        e.currentTarget.style.borderColor = link.color;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                        e.currentTarget.style.transform = 'translateX(0)';
                        e.currentTarget.style.borderColor = `${link.color}40`;
                      }}
                    >
                      <div style={{
                        width: '80px',
                        height: '80px',
                        borderRadius: '20px',
                        background: link.color === '#ffffff' ? '#222' : `${link.color}20`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}>
                        <link.icon size={40} color={link.color} />
                      </div>

                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 800, fontSize: '1.4rem', marginBottom: '0.5rem' }}>
                          {link.label}
                        </div>
                        <div style={{ fontSize: '1.1rem', color: '#c0c0ff' }}>
                          {link.stats}
                        </div>
                      </div>

                      <ExternalLink size={28} color={link.color} />
                    </a>
                  ))}
                </div>
              </div>

              {/* Availability Badge */}
              <div style={{
                padding: '2.5rem',
                background: 'rgba(0,255,0,0.12)',
                border: '2.5px solid rgba(0,255,0,0.35)',
                borderRadius: '20px',
                textAlign: 'center',
                backdropFilter: 'blur(12px)'
              }}>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '1.5rem',
                  marginBottom: '1.5rem'
                }}>
                  <div style={{
                    width: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    background: '#00ff00',
                    animation: 'pulse 2.2s infinite',
                    boxShadow: '0 0 25px #00ff00'
                  }} />
                  <span style={{ fontSize: '1.5rem', fontWeight: 900, color: '#00ff00' }}>
                    READY FOR NEW PROJECTS
                  </span>
                </div>
                <div style={{ fontSize: '1.1rem', color: '#c0c0ff' }}>
                  Currently accepting select clients • Limited slots available
                </div>
              </div>
            </div>
          </div>

          {/* Final CTA Section */}
          <div style={{
            marginTop: '7rem',
            padding: 'clamp(4rem, 9vw, 6.5rem) clamp(2.5rem, 6vw, 4rem)',
            background: 'rgba(0,0,0,0.85)',
            border: '3.5px solid rgba(0,240,255,0.45)',
            borderRadius: '36px',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'var(--card-gradient)',
              opacity: 0.15
            }} />

            <div style={{ position: 'relative', zIndex: 1 }}>
              <Sparkles size={60} color="var(--neon-primary)" style={{ marginBottom: '2rem' }} />

              <h2 style={{
                fontSize: 'clamp(3.2rem, 8vw, 5.5rem)',
                fontWeight: 900,
                background: 'var(--neon-gradient)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: '2rem',
                textTransform: 'uppercase',
                letterSpacing: '4px'
              }}>
                READY TO LAUNCH?
              </h2>

              <p style={{
                fontSize: 'clamp(1.3rem, 3.5vw, 1.7rem)',
                color: '#c0c0ff',
                marginBottom: '4rem',
                maxWidth: '900px',
                margin: '0 auto 4rem',
                lineHeight: 1.8
              }}>
                Let's transform your vision into a powerful, scalable digital reality with elite development expertise.
              </p>

              <div style={{
                display: 'flex',
                gap: '3rem',
                justifyContent: 'center',
                flexWrap: 'wrap',
                alignItems: 'center'
              }}>
                <a href="https://github.com/bhagavan444" target="_blank" rel="noopener noreferrer" style={{
                  padding: '1.8rem 4rem',
                  background: 'rgba(0,240,255,0.18)',
                  border: '3.5px solid var(--neon-primary)',
                  borderRadius: '999px',
                  color: 'var(--neon-primary)',
                  fontWeight: 900,
                  fontSize: '1.4rem',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1.5rem',
                  transition: 'all 0.4s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'var(--neon-primary)';
                  e.currentTarget.style.color = '#000';
                  e.currentTarget.style.transform = 'scale(1.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(0,240,255,0.18)';
                  e.currentTarget.style.color = 'var(--neon-primary)';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
                >
                  <Github size={36} />
                  EXPLORE MY CODE
                  <Code size={32} />
                </a>

                <a href="mailto:g.sivasatyasaibhagavan@gmail.com" style={{
                  padding: '1.8rem 4rem',
                  background: 'var(--neon-gradient)',
                  borderRadius: '999px',
                  color: '#000',
                  fontWeight: 900,
                  fontSize: '1.4rem',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1.5rem',
                  boxShadow: '0 0 80px rgba(0,240,255,0.8)',
                  transition: 'all 0.4s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.1) translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 15px 100px rgba(0,240,255,1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1) translateY(0)';
                  e.currentTarget.style.boxShadow = '0 0 80px rgba(0,240,255,0.8)';
                }}
                >
                  <Rocket size={36} />
                  START YOUR PROJECT NOW
                  <Zap size={32} />
                </a>
              </div>

              <div style={{
                marginTop: '4rem',
                padding: '2rem',
                background: 'rgba(0,240,255,0.08)',
                borderRadius: '20px',
                display: 'inline-block'
              }}>
                <div style={{ fontSize: '1.1rem', color: '#a0a0d0', marginBottom: '1rem' }}>
                  Trusted by startups, enterprises & innovators worldwide
                </div>
                <div style={{ display: 'flex', gap: '2.5rem', justifyContent: 'center', fontSize: '2.5rem' }}>
                  ⭐⭐⭐⭐⭐
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Mobile CTA */}
        <div className="floating-cta" style={{
          position: 'fixed',
          bottom: '2.5rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'none',
          gap: '1.5rem',
          zIndex: 1000,
          '@media (max-width: 768px)': { display: 'flex' }
        }}>
          <a
            href="tel:+917569205626"
            style={{
              padding: '1.5rem',
              background: 'rgba(0,240,255,0.3)',
              border: '3px solid var(--neon-primary)',
              borderRadius: '999px',
              color: 'var(--neon-primary)',
              fontWeight: 700,
              backdropFilter: 'blur(20px)',
              display: 'flex',
              alignItems: 'center',
              boxShadow: '0 0 40px rgba(0,240,255,0.7)'
            }}
          >
            <Phone size={32} />
          </a>

          <a
            href="mailto:g.sivasatyasaibhagavan@gmail.com"
            style={{
              padding: '1.5rem 3rem',
              background: 'var(--neon-gradient)',
              borderRadius: '999px',
              color: '#000',
              fontWeight: 900,
              fontSize: '1.2rem',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              boxShadow: '0 0 60px rgba(0,240,255,0.9)'
            }}
          >
            <Send size={32} />
            SEND MESSAGE
          </a>
        </div>
      </div>
    </>
  );
}