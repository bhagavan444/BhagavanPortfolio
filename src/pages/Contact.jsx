"use client";

import { useState, useEffect, useRef } from "react";
import {
  Mail, Phone, Send, CheckCircle2, Linkedin, Github, Twitter,
  Code, Zap, MessageCircle, User, ArrowRight, Sparkles, Award,
  Target, ExternalLink, Terminal, Cpu, Database, Layers,
  Globe, Rocket, Brain, Coffee, Clock, MapPin, Calendar,
  Users, Trophy, Lock, Shield, Star, TrendingUp, Activity,
  Briefcase, ChevronRight, Play, Pause, Volume2, VolumeX,
  Heart, Flame, Wifi, Box, Hexagon, Circle, Square
} from "lucide-react";

export default function UltraContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("idle");
  const [focusedField, setFocusedField] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeSkill, setActiveSkill] = useState(null);
  const [messageCount, setMessageCount] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState({});
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [theme, setTheme] = useState('cyber'); // cyber, matrix, neon
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);

  // Enhanced typing animation
  const [currentText, setCurrentText] = useState("");
  const [charIndex, setCharIndex] = useState(0);
  const [textIndex, setTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const heroTexts = [
    "Elite Developer • Premium Solutions 🚀",
    "Transform Ideas Into Reality ✨",
    "Enterprise-Grade Architecture 💎",
    "Innovation Through Code ⚡",
    "Your Vision, My Expertise 🎯"
  ];

  // Typing effect
  useEffect(() => {
    const currentFullText = heroTexts[textIndex];
    const typingSpeed = isDeleting ? 30 : 80;
    const pauseDuration = isDeleting ? 500 : 2000;

    const timer = setTimeout(() => {
      if (!isDeleting && charIndex < currentFullText.length) {
        setCharIndex(charIndex + 1);
        setCurrentText(currentFullText.slice(0, charIndex + 1));
      } else if (isDeleting && charIndex > 0) {
        setCharIndex(charIndex - 1);
        setCurrentText(currentFullText.slice(0, charIndex - 1));
      } else if (!isDeleting && charIndex === currentFullText.length) {
        setTimeout(() => setIsDeleting(true), pauseDuration);
      } else if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
        setTextIndex((textIndex + 1) % heroTexts.length);
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [charIndex, textIndex, isDeleting]);

  // Scroll tracking
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible((prev) => ({ ...prev, [entry.target.id]: entry.isIntersecting }));
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('[data-animate]').forEach((el) => {
      if (el.id) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Advanced particle system with neural network effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    class Particle {
      constructor() {
        this.reset();
        this.y = Math.random() * canvas.height;
        this.opacity = Math.random();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = -20;
        this.speed = Math.random() * 1.5 + 0.5;
        this.radius = Math.random() * 2 + 1;
        this.color = ['#00f0ff', '#a78bfa', '#ff61d2', '#00ff88'][Math.floor(Math.random() * 4)];
        this.opacity = Math.random() * 0.5 + 0.5;
        this.pulse = Math.random() * Math.PI * 2;
      }

      update() {
        this.y += this.speed;
        this.pulse += 0.05;
        if (this.y > canvas.height + 20) this.reset();
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity * (Math.sin(this.pulse) * 0.3 + 0.7);
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    class NeuralNode {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = Math.random() * 3 + 2;
        this.connections = [];
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
      }

      draw() {
        ctx.fillStyle = 'rgba(0, 240, 255, 0.8)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const particles = Array.from({ length: 100 }, () => new Particle());
    const nodes = Array.from({ length: 30 }, () => new NeuralNode());

    const animate = () => {
      time += 0.005;
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw neural network
      nodes.forEach((node, i) => {
        node.update();
        nodes.slice(i + 1).forEach(otherNode => {
          const dx = node.x - otherNode.x;
          const dy = node.y - otherNode.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            ctx.strokeStyle = `rgba(0, 240, 255, ${0.15 * (1 - dist / 150)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(otherNode.x, otherNode.y);
            ctx.stroke();
          }
        });
        node.draw();
      });

      // Draw particles
      particles.forEach(p => {
        p.update();
        p.draw();
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

  // Form validation
  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name required";
    else if (formData.name.trim().length < 2) newErrors.name = "Min 2 characters";
    if (!formData.email.trim()) newErrors.email = "Email required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Invalid email";
    if (!formData.message.trim()) newErrors.message = "Message required";
    else if (formData.message.trim().length < 10) newErrors.message = "Min 10 characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    setMessageCount(prev => prev + 1);

    try {
      await new Promise(resolve => setTimeout(resolve, 2500));
      setSubmitStatus("success");
      setFormData({ name: "", email: "", message: "" });
      setErrors({});
      setTimeout(() => {
        setSubmitStatus("idle");
        setIsSubmitting(false);
      }, 7000);
    } catch (error) {
      setSubmitStatus("error");
      setIsSubmitting(false);
    }
  };

  const skills = [
    { icon: Code, name: "Full Stack Dev", level: 98, color: "#00f0ff", desc: "React, Node, Next.js" },
    { icon: Database, name: "Database Expert", level: 96, color: "#a78bfa", desc: "SQL, NoSQL, Redis" },
    { icon: Layers, name: "System Design", level: 95, color: "#ff61d2", desc: "Microservices, Scale" },
    { icon: Cpu, name: "AI/ML Integration", level: 93, color: "#00ff88", desc: "TensorFlow, PyTorch" },
    { icon: Globe, name: "Cloud & DevOps", level: 97, color: "#00f0ff", desc: "AWS, Docker, K8s" },
    { icon: Zap, name: "Performance", level: 99, color: "#ff61d2", desc: "Optimization Master" }
  ];

  const achievements = [
    { icon: Award, label: "Projects", value: "50+", trend: "+12 monthly" },
    { icon: Target, label: "Success Rate", value: "98%", trend: "Top Tier" },
    { icon: Users, label: "Clients", value: "45+", trend: "5-Star" },
    { icon: Rocket, label: "Response", value: "<24h", trend: "Guaranteed" }
  ];

  const socialLinks = [
    { icon: Github, label: "GitHub", href: "https://github.com/bhagavan444", color: "#ffffff", stats: "15+ Repos" },
    { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/gopalajosyula-siva-satya-sai-bhagavan-1624a027b/", color: "#00f0ff", stats: "500+ Network" },
    { icon: Twitter, label: "Twitter", href: "https://twitter.com/bhagavan444", color: "#1DA1F2", stats: "Tech Content" }
  ];

  const companyFeatures = [
    { icon: Shield, title: "Enterprise Security", desc: "Bank-grade encryption" },
    { icon: TrendingUp, title: "Proven Track Record", desc: "98% satisfaction" },
    { icon: Activity, title: "Real-time Updates", desc: "24/7 monitoring" },
    { icon: Briefcase, title: "Professional", desc: "NDA protected" }
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Fira+Code:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap');

        :root {
          --neon-cyan: #00f0ff;
          --neon-purple: #a78bfa;
          --neon-pink: #ff61d2;
          --neon-green: #00ff88;
          --dark-bg: #000000;
        }

        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { overflow-x: hidden; }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes fadeInLeft {
          from { opacity: 0; transform: translateX(-40px); }
          to { opacity: 1; transform: translateX(0); }
        }

        @keyframes fadeInRight {
          from { opacity: 0; transform: translateX(40px); }
          to { opacity: 1; transform: translateX(0); }
        }

        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.05); }
        }

        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }

        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(0, 240, 255, 0.4), 0 0 40px rgba(0, 240, 255, 0.2); }
          50% { box-shadow: 0 0 30px rgba(0, 240, 255, 0.6), 0 0 60px rgba(0, 240, 255, 0.4); }
        }

        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }

        @keyframes slideIn {
          from { opacity: 0; transform: translateY(-50px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes rotate3d {
          from { transform: rotateY(0deg); }
          to { transform: rotateY(360deg); }
        }

        .animate-in { animation: fadeInUp 0.6s ease-out forwards; }
        .animate-left { animation: fadeInLeft 0.6s ease-out forwards; }
        .animate-right { animation: fadeInRight 0.6s ease-out forwards; }
        .animate-scale { animation: scaleIn 0.5s ease-out forwards; }

        .glass-card {
          background: rgba(10, 10, 20, 0.8);
          backdrop-filter: blur(20px);
          border: 2px solid rgba(0, 240, 255, 0.3);
          border-radius: 24px;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }

        .glass-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
          transition: left 0.5s;
        }

        .glass-card:hover::before { left: 100%; }

        .glass-card:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 15px 50px rgba(0, 240, 255, 0.3);
          border-color: var(--neon-cyan);
        }

        .skill-bar {
          position: relative;
          height: 10px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 999px;
          overflow: hidden;
        }

        .skill-bar-fill {
          height: 100%;
          border-radius: 999px;
          position: relative;
          transition: width 1.2s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .skill-bar-fill::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
          animation: shimmer 2s infinite;
        }

        .floating { animation: float 6s ease-in-out infinite; }
        .floating:nth-child(2) { animation-delay: 0.5s; }
        .floating:nth-child(3) { animation-delay: 1s; }
        .floating:nth-child(4) { animation-delay: 1.5s; }

        .neon-text {
          background: linear-gradient(135deg, var(--neon-cyan), var(--neon-purple), var(--neon-pink));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .input-field {
          width: 100%;
          padding: 1.2rem 1.5rem;
          background: rgba(255, 255, 255, 0.05);
          border: 2px solid rgba(255, 255, 255, 0.15);
          border-radius: 16px;
          color: #ffffff;
          font-size: 1rem;
          font-family: 'Inter', sans-serif;
          transition: all 0.3s;
          outline: none;
        }

        .input-field:focus {
          border-color: var(--neon-cyan);
          box-shadow: 0 0 20px rgba(0, 240, 255, 0.3);
          background: rgba(255, 255, 255, 0.08);
        }

        .input-field.error {
          border-color: #ff4444;
          box-shadow: 0 0 20px rgba(255, 68, 68, 0.3);
        }

        .btn-primary {
          padding: 1.2rem 2.5rem;
          background: linear-gradient(135deg, var(--neon-cyan), var(--neon-purple));
          border: none;
          border-radius: 999px;
          color: #000;
          font-weight: 800;
          font-size: 1.1rem;
          cursor: pointer;
          transition: all 0.3s;
          box-shadow: 0 0 30px rgba(0, 240, 255, 0.5);
          position: relative;
          overflow: hidden;
        }

        .btn-primary::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.3);
          transform: translate(-50%, -50%);
          transition: width 0.6s, height 0.6s;
        }

        .btn-primary:hover::before {
          width: 300px;
          height: 300px;
        }

        .btn-primary:hover {
          transform: scale(1.05);
          box-shadow: 0 0 50px rgba(0, 240, 255, 0.8);
        }

        .btn-primary:active { transform: scale(0.98); }
        .btn-primary:disabled { opacity: 0.6; cursor: not-allowed; }

        @media (max-width: 1200px) {
          .grid-2 { grid-template-columns: 1fr !important; }
        }

        @media (max-width: 768px) {
          .grid-auto { grid-template-columns: 1fr !important; }
          .hide-mobile { display: none !important; }
        }
      `}</style>

      <div style={{
        minHeight: '100vh',
        background: 'var(--dark-bg)',
        color: '#e0e0ff',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: "'Inter', sans-serif"
      }}>
        {/* Animated Background */}
        <canvas ref={canvasRef} style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 0
        }} />

        {/* Grid Overlay */}
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: 'linear-gradient(rgba(0, 240, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 240, 255, 0.03) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
          opacity: 0.5,
          pointerEvents: 'none',
          zIndex: 1
        }} />

        {/* Gradient Orbs */}
        <div style={{
          position: 'fixed',
          top: '10%',
          left: '5%',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(0, 240, 255, 0.15) 0%, transparent 70%)',
          filter: 'blur(100px)',
          animation: 'float 20s ease-in-out infinite',
          zIndex: 1
        }} />
        <div style={{
          position: 'fixed',
          bottom: '10%',
          right: '5%',
          width: '700px',
          height: '700px',
          background: 'radial-gradient(circle, rgba(167, 139, 250, 0.15) 0%, transparent 70%)',
          filter: 'blur(120px)',
          animation: 'float 25s ease-in-out infinite reverse',
          zIndex: 1
        }} />

        {/* Main Content */}
        <div style={{
          position: 'relative',
          zIndex: 10,
          padding: 'clamp(2rem, 5vw, 4rem) clamp(1rem, 3vw, 2rem)',
          maxWidth: '1600px',
          margin: '0 auto'
        }}>
          {/* Status Bar */}
          <div data-animate id="status-bar" className={isVisible['status-bar'] ? 'animate-in' : ''} style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '1rem 2rem',
            marginBottom: '2rem',
            background: 'rgba(10, 10, 20, 0.8)',
            border: '2px solid rgba(0, 240, 255, 0.3)',
            borderRadius: '20px',
            backdropFilter: 'blur(15px)',
            gap: '1rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                background: 'var(--neon-green)',
                animation: 'pulse 2s infinite',
                boxShadow: '0 0 15px var(--neon-green)'
              }} />
              <span style={{ fontFamily: "'Fira Code', monospace", fontSize: '1rem', color: 'var(--neon-green)', fontWeight: 700 }}>
                ONLINE & AVAILABLE
              </span>
            </div>
            <div style={{ display: 'flex', gap: '2rem', fontSize: '0.95rem', fontFamily: "'Fira Code', monospace", flexWrap: 'wrap' }}>
              <div>Response: <span style={{ color: 'var(--neon-cyan)', fontWeight: 700 }}>{'<24h'}</span></div>
              <div>Messages: <span style={{ color: 'var(--neon-pink)' }}>{messageCount}</span></div>
            </div>
          </div>

          {/* Hero Section */}
          <div data-animate id="hero" className={isVisible['hero'] ? 'animate-scale' : ''} style={{ textAlign: 'center', marginBottom: 'clamp(3rem, 6vw, 5rem)' }}>
            <div style={{
              display: 'inline-block',
              padding: '0.75rem 2rem',
              marginBottom: '1.5rem',
              background: 'rgba(0, 240, 255, 0.1)',
              border: '2px solid var(--neon-cyan)',
              borderRadius: '999px',
              fontFamily: "'Fira Code', monospace",
              fontSize: 'clamp(0.9rem, 2vw, 1rem)',
              color: 'var(--neon-cyan)',
              animation: 'glow 3s infinite'
            }}>
              <Terminal size={18} style={{ display: 'inline', marginRight: '0.5rem', verticalAlign: 'middle' }} />
              {'contact.initialize()'}
              <span style={{ animation: 'blink 1s infinite' }}>_</span>
            </div>

            <h1 style={{
              fontSize: 'clamp(2.5rem, 8vw, 6rem)',
              fontWeight: 900,
              letterSpacing: '-2px',
              marginBottom: '1rem',
              lineHeight: 1.1,
              textTransform: 'uppercase'
            }}>
              <span className="neon-text">ELITE DEVELOPER</span>
              <br />
              <span style={{ color: '#ffffff' }}>CONTACT HUB</span>
            </h1>

            <div style={{
              fontSize: 'clamp(1.1rem, 2.5vw, 1.8rem)',
              fontWeight: 700,
              color: '#c0c0ff',
              marginBottom: '1.5rem',
              minHeight: '2.5rem',
              fontFamily: "'Space Grotesk', sans-serif"
            }}>
              {currentText}
              <span style={{
                display: 'inline-block',
                width: '3px',
                height: '1.2em',
                background: 'var(--neon-cyan)',
                animation: 'blink 0.8s step-end infinite',
                marginLeft: '4px',
                verticalAlign: 'middle'
              }} />
            </div>

            <p style={{
              fontSize: 'clamp(0.95rem, 2vw, 1.2rem)',
              color: '#a0a0d0',
              maxWidth: '800px',
              margin: '0 auto 2.5rem',
              lineHeight: 1.7
            }}>
              Enterprise-grade full-stack solutions delivered with precision and professional excellence
            </p>

            {/* Achievement Stats */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '1.5rem',
              maxWidth: '1000px',
              margin: '0 auto'
            }}>
              {achievements.map((stat, i) => (
                <div key={i} className="floating glass-card" style={{ padding: '1.5rem', textAlign: 'center' }}>
                  <stat.icon size={36} color="var(--neon-cyan)" style={{ marginBottom: '0.75rem' }} />
                  <div style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--neon-cyan)', marginBottom: '0.5rem' }}>
                    {stat.value}
                  </div>
                  <div style={{ fontSize: '0.95rem', color: '#c0c0ff', marginBottom: '0.25rem' }}>
                    {stat.label}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#808080' }}>{stat.trend}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Company Features */}
          <div data-animate id="features" className={isVisible['features'] ? 'animate-in' : ''} style={{ marginBottom: 'clamp(3rem, 6vw, 5rem)' }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
              gap: '1.5rem'
            }}>
              {companyFeatures.map((feature, i) => (
                <div key={i} className="glass-card" style={{ padding: '1.5rem' }}>
                  <feature.icon size={32} color="var(--neon-purple)" style={{ marginBottom: '1rem' }} />
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.5rem' }}>
                    {feature.title}
                  </h3>
                  <p style={{ fontSize: '0.9rem', color: '#a0a0d0' }}>{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Skills Section */}
          <div data-animate id="skills" className={isVisible['skills'] ? 'animate-in' : ''} style={{
            marginBottom: 'clamp(3rem, 6vw, 5rem)',
            padding: 'clamp(2rem, 4vw, 3rem)',
            background: 'rgba(10, 10, 20, 0.8)',
            border: '2px solid rgba(0, 240, 255, 0.3)',
            borderRadius: '32px',
            backdropFilter: 'blur(15px)'
          }}>
            <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              <h2 style={{ fontSize: 'clamp(1.8rem, 5vw, 3rem)', fontWeight: 900, marginBottom: '1rem' }}>
                <span className="neon-text">Technical Expertise</span>
              </h2>
              <p style={{ fontSize: '1.1rem', color: '#c0c0ff' }}>Mastery across the full stack</p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.5rem'
            }}>
              {skills.map((skill, i) => (
                <div key={i} onMouseEnter={() => setActiveSkill(i)} onMouseLeave={() => setActiveSkill(null)} className="glass-card" style={{
                  padding: '1.5rem',
                  borderColor: activeSkill === i ? skill.color : 'rgba(0, 240, 255, 0.3)',
                  boxShadow: activeSkill === i ? `0 0 30px ${skill.color}50` : 'none'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                    <div style={{
                      width: '50px',
                      height: '50px',
                      borderRadius: '12px',
                      background: `${skill.color}20`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <skill.icon size={28} color={skill.color} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 800, fontSize: '1.1rem', marginBottom: '0.25rem', color: '#ffffff' }}>
                        {skill.name}
                      </div>
                      <div style={{ fontSize: '0.85rem', color: '#a0a0d0' }}>{skill.desc}</div>
                    </div>
                  </div>

                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.85rem' }}>
                      <span style={{ color: '#c0c0ff' }}>Proficiency</span>
                      <span style={{ color: skill.color, fontWeight: 700 }}>{skill.level}%</span>
                    </div>
                    <div className="skill-bar">
                      <div className="skill-bar-fill" style={{
                        width: activeSkill === i ? `${skill.level}%` : '0%',
                        background: `linear-gradient(90deg, ${skill.color}, ${skill.color}cc)`,
                        boxShadow: `0 0 10px ${skill.color}`
                      }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Section */}
          <div data-animate id="contact" className={`${isVisible['contact'] ? 'animate-in' : ''} grid-2`} style={{
            display: 'grid',
            gridTemplateColumns: '1.2fr 1fr',
            gap: 'clamp(2rem, 4vw, 3rem)',
            marginBottom: 'clamp(3rem, 6vw, 5rem)'
          }}>
            {/* Contact Form */}
            <div className="glass-card" style={{ padding: 'clamp(2rem, 4vw, 3rem)' }}>
              {submitStatus === "success" ? (
                <div style={{ textAlign: 'center', padding: '3rem 2rem' }}>
                  <div style={{
                    width: '100px',
                    height: '100px',
                    margin: '0 auto 1.5rem',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, var(--neon-cyan), var(--neon-purple))',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    animation: 'pulse 2s infinite',
                    boxShadow: '0 0 50px rgba(0, 240, 255, 0.6)'
                  }}>
                    <CheckCircle2 size={60} color="#000" />
                  </div>
                  <h3 className="neon-text" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 900, marginBottom: '1rem' }}>
                    Message Sent!
                  </h3>
                  <p style={{ fontSize: '1.2rem', color: '#c0c0ff', marginBottom: '0.75rem' }}>
                    Thank you for reaching out!
                  </p>
                  <p style={{ fontSize: '1rem', color: '#a0a0d0' }}>
                    I'll respond within 24 hours. Let's build something amazing!
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <h3 style={{
                    fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)',
                    fontWeight: 900,
                    marginBottom: '2rem',
                    fontFamily: "'Fira Code', monospace",
                    textAlign: 'center'
                  }}>
                    <span className="neon-text">{'<'} Get In Touch {'/>'}</span>
                  </h3>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', fontSize: '0.95rem', color: '#c0c0ff', fontWeight: 600 }}>
                        <User size={18} /> Full Name
                      </label>
                      <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="John Developer"
                        className={`input-field ${errors.name ? 'error' : ''}`}
                        onFocus={() => setFocusedField('name')}
                        onBlur={() => setFocusedField(null)}
                      />
                      {errors.name && <div style={{ color: '#ff4444', fontSize: '0.8rem', marginTop: '0.5rem', fontFamily: "'Fira Code', monospace" }}>{errors.name}</div>}
                    </div>

                    <div>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', fontSize: '0.95rem', color: '#c0c0ff', fontWeight: 600 }}>
                        <Mail size={18} /> Email Address
                      </label>
                      <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="john@company.com"
                        className={`input-field ${errors.email ? 'error' : ''}`}
                        onFocus={() => setFocusedField('email')}
                        onBlur={() => setFocusedField(null)}
                      />
                      {errors.email && <div style={{ color: '#ff4444', fontSize: '0.8rem', marginTop: '0.5rem', fontFamily: "'Fira Code', monospace" }}>{errors.email}</div>}
                    </div>

                    <div>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', fontSize: '0.95rem', color: '#c0c0ff', fontWeight: 600 }}>
                        <MessageCircle size={18} /> Your Message
                      </label>
                      <textarea name="message" value={formData.message} onChange={handleChange} rows={6}
                        placeholder="Tell me about your project, goals, timeline..."
                        className={`input-field ${errors.message ? 'error' : ''}`}
                        style={{ resize: 'vertical', minHeight: '160px', fontFamily: "'Inter', sans-serif" }}
                        onFocus={() => setFocusedField('message')}
                        onBlur={() => setFocusedField(null)}
                      />
                      {errors.message && <div style={{ color: '#ff4444', fontSize: '0.8rem', marginTop: '0.5rem', fontFamily: "'Fira Code', monospace" }}>{errors.message}</div>}
                    </div>

                    <button type="submit" disabled={isSubmitting} className="btn-primary" style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '1rem',
                      opacity: isSubmitting ? 0.7 : 1
                    }}>
                      {isSubmitting ? (
                        <>
                          <div style={{
                            width: '20px',
                            height: '20px',
                            border: '3px solid #000',
                            borderTopColor: '#fff',
                            borderRadius: '50%',
                            animation: 'spin 1s linear infinite'
                          }} />
                          <span style={{ position: 'relative', zIndex: 1 }}>SENDING...</span>
                        </>
                      ) : (
                        <>
                          <Send size={20} style={{ position: 'relative', zIndex: 1 }} />
                          <span style={{ position: 'relative', zIndex: 1 }}>SEND MESSAGE</span>
                          <Rocket size={20} style={{ position: 'relative', zIndex: 1 }} />
                        </>
                      )}
                    </button>

                    <div style={{ textAlign: 'center', fontSize: '0.85rem', color: '#808080', fontFamily: "'Fira Code', monospace" }}>
                      <Lock size={14} style={{ display: 'inline', marginRight: '0.5rem', verticalAlign: 'middle' }} />
                      Secure & Encrypted
                    </div>
                  </div>
                </form>
              )}
            </div>

            {/* Contact Info Sidebar */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div className="glass-card" style={{ padding: '1.5rem' }}>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 900, marginBottom: '1.25rem', fontFamily: "'Fira Code', monospace" }}>
                  <span className="neon-text">{'<'} Direct Access {'/>'}</span>
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <a href="mailto:g.sivasatyasaibhagavan@gmail.com" style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    padding: '1.25rem',
                    background: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '12px',
                    border: '2px solid rgba(0, 240, 255, 0.3)',
                    color: '#ffffff',
                    textDecoration: 'none',
                    transition: 'all 0.3s'
                  }} onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(0, 240, 255, 0.1)';
                    e.currentTarget.style.borderColor = 'var(--neon-cyan)';
                    e.currentTarget.style.transform = 'translateX(5px)';
                  }} onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                    e.currentTarget.style.borderColor = 'rgba(0, 240, 255, 0.3)';
                    e.currentTarget.style.transform = 'translateX(0)';
                  }}>
                    <div style={{
                      width: '45px',
                      height: '45px',
                      borderRadius: '10px',
                      background: 'linear-gradient(135deg, var(--neon-cyan), var(--neon-purple))',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <Mail size={22} color="#000" />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: '0.8rem', color: '#a0a0d0', marginBottom: '0.25rem' }}>Email</div>
                      <div style={{ fontSize: '0.85rem', fontWeight: 700, wordBreak: 'break-all' }}>
                        g.sivasatyasaibhagavan@gmail.com
                      </div>
                    </div>
                    <ChevronRight size={18} color="var(--neon-cyan)" />
                  </a>

                  <a href="tel:+917569205626" style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    padding: '1.25rem',
                    background: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '12px',
                    border: '2px solid rgba(167, 139, 250, 0.3)',
                    color: '#ffffff',
                    textDecoration: 'none',
                    transition: 'all 0.3s'
                  }} onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(167, 139, 250, 0.1)';
                    e.currentTarget.style.borderColor = 'var(--neon-purple)';
                    e.currentTarget.style.transform = 'translateX(5px)';
                  }} onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                    e.currentTarget.style.borderColor = 'rgba(167, 139, 250, 0.3)';
                    e.currentTarget.style.transform = 'translateX(0)';
                  }}>
                    <div style={{
                      width: '45px',
                      height: '45px',
                      borderRadius: '10px',
                      background: 'rgba(167, 139, 250, 0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <Phone size={22} color="var(--neon-purple)" />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '0.8rem', color: '#a0a0d0', marginBottom: '0.25rem' }}>Primary</div>
                      <div style={{ fontSize: '0.95rem', fontWeight: 700 }}>+91 75692 05626</div>
                    </div>
                    <ChevronRight size={18} color="var(--neon-purple)" />
                  </a>

                  <a href="tel:+919032230626" style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    padding: '1.25rem',
                    background: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '12px',
                    border: '2px solid rgba(255, 97, 210, 0.3)',
                    color: '#ffffff',
                    textDecoration: 'none',
                    transition: 'all 0.3s'
                  }} onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 97, 210, 0.1)';
                    e.currentTarget.style.borderColor = 'var(--neon-pink)';
                    e.currentTarget.style.transform = 'translateX(5px)';
                  }} onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                    e.currentTarget.style.borderColor = 'rgba(255, 97, 210, 0.3)';
                    e.currentTarget.style.transform = 'translateX(0)';
                  }}>
                    <div style={{
                      width: '45px',
                      height: '45px',
                      borderRadius: '10px',
                      background: 'rgba(255, 97, 210, 0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <Phone size={22} color="var(--neon-pink)" />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '0.8rem', color: '#a0a0d0', marginBottom: '0.25rem' }}>Secondary</div>
                      <div style={{ fontSize: '0.95rem', fontWeight: 700 }}>+91 90322 30626</div>
                    </div>
                    <ChevronRight size={18} color="var(--neon-pink)" />
                  </a>
                </div>
              </div>

              {/* Social Links */}
              <div className="glass-card" style={{ padding: '1.5rem' }}>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 900, marginBottom: '1.25rem', fontFamily: "'Fira Code', monospace" }}>
                  <span className="neon-text">{'<'} Social Network {'/>'}</span>
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {socialLinks.map((link, i) => (
                    <a key={i} href={link.href} target="_blank" rel="noopener noreferrer" style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      padding: '1rem',
                      background: 'rgba(255, 255, 255, 0.05)',
                      borderRadius: '12px',
                      border: `2px solid ${link.color}40`,
                      color: '#ffffff',
                      textDecoration: 'none',
                      transition: 'all 0.3s'
                    }} onMouseEnter={(e) => {
                      e.currentTarget.style.background = `${link.color}20`;
                      e.currentTarget.style.borderColor = link.color;
                      e.currentTarget.style.transform = 'translateX(5px)';
                    }} onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                      e.currentTarget.style.borderColor = `${link.color}40`;
                      e.currentTarget.style.transform = 'translateX(0)';
                    }}>
                      <div style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '10px',
                        background: link.color === '#ffffff' ? '#222' : `${link.color}20`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}>
                        <link.icon size={20} color={link.color} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 800, fontSize: '0.95rem', marginBottom: '0.25rem' }}>{link.label}</div>
                        <div style={{ fontSize: '0.8rem', color: '#a0a0d0' }}>{link.stats}</div>
                      </div>
                      <ExternalLink size={16} color={link.color} />
                    </a>
                  ))}
                </div>
              </div>

              {/* Availability */}
              <div style={{
                padding: '1.5rem',
                background: 'rgba(0, 255, 136, 0.1)',
                border: '2px solid rgba(0, 255, 136, 0.3)',
                borderRadius: '12px',
                textAlign: 'center'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                  <div style={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    background: 'var(--neon-green)',
                    animation: 'pulse 2s infinite',
                    boxShadow: '0 0 15px var(--neon-green)'
                  }} />
                  <span style={{ fontSize: '1.1rem', fontWeight: 900, color: 'var(--neon-green)' }}>
                    ACCEPTING PROJECTS
                  </span>
                </div>
                <div style={{ fontSize: '0.85rem', color: '#c0c0ff' }}>Limited slots available</div>
              </div>
            </div>
          </div>

          {/* Final CTA */}
          <div data-animate id="cta" className={isVisible['cta'] ? 'animate-scale' : ''} style={{
            padding: 'clamp(2.5rem, 5vw, 4rem) clamp(2rem, 3vw, 2.5rem)',
            background: 'rgba(10, 10, 20, 0.8)',
            border: '2px solid rgba(0, 240, 255, 0.3)',
            borderRadius: '32px',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(135deg, rgba(0,240,255,0.1), rgba(167,139,250,0.1))',
              opacity: 0.2
            }} />

            <div style={{ position: 'relative', zIndex: 1 }}>
              <Sparkles size={45} color="var(--neon-cyan)" style={{ marginBottom: '1.5rem' }} />

              <h2 className="neon-text" style={{
                fontSize: 'clamp(2rem, 6vw, 4rem)',
                fontWeight: 900,
                marginBottom: '1rem',
                textTransform: 'uppercase'
              }}>
                READY TO BUILD?
              </h2>

              <p style={{
                fontSize: 'clamp(1rem, 2.5vw, 1.3rem)',
                color: '#c0c0ff',
                marginBottom: '2.5rem',
                maxWidth: '700px',
                margin: '0 auto 2.5rem',
                lineHeight: 1.6
              }}>
                Transform your vision into enterprise-grade digital solutions
              </p>

              <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <a href="https://github.com/bhagavan444" target="_blank" rel="noopener noreferrer" style={{
                  padding: '1rem 2.5rem',
                  background: 'rgba(0, 240, 255, 0.15)',
                  border: '2px solid var(--neon-cyan)',
                  borderRadius: '999px',
                  color: 'var(--neon-cyan)',
                  fontWeight: 800,
                  fontSize: '1rem',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  transition: 'all 0.3s'
                }} onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'var(--neon-cyan)';
                  e.currentTarget.style.color = '#000';
                  e.currentTarget.style.transform = 'scale(1.05)';
                }} onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(0, 240, 255, 0.15)';
                  e.currentTarget.style.color = 'var(--neon-cyan)';
                  e.currentTarget.style.transform = 'scale(1)';
                }}>
                  <Github size={20} />
                  VIEW WORK
                </a>

                <a href="mailto:g.sivasatyasaibhagavan@gmail.com" className="btn-primary" style={{
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem'
                }}>
                  <Rocket size={20} style={{ position: 'relative', zIndex: 1 }} />
                  <span style={{ position: 'relative', zIndex: 1 }}>START PROJECT</span>
                </a>
              </div>

              <div style={{
                marginTop: '2.5rem',
                padding: '1.25rem',
                background: 'rgba(0, 240, 255, 0.05)',
                borderRadius: '12px',
                display: 'inline-block'
              }}>
                <div style={{ fontSize: '0.9rem', color: '#a0a0d0', marginBottom: '0.5rem' }}>
                  Trusted worldwide
                </div>
                <div style={{ fontSize: '1.8rem', letterSpacing: '0.5rem' }}>⭐⭐⭐⭐⭐</div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div style={{
            marginTop: '3rem',
            padding: '1.5rem',
            textAlign: 'center',
            borderTop: '2px solid rgba(0, 240, 255, 0.2)'
          }}>
            <p style={{ fontSize: '0.9rem', color: '#808080', fontFamily: "'Fira Code', monospace" }}>
              © 2025 Elite Developer • Crafted with precision
            </p>
          </div>
        </div>
      </div>
    </>
  );
}