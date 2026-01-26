"use client";

import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import profileImg from "../assets/profile.jpeg";
import resumePdf from "../assets/bhagavanresume.pdf";

import { 
  Terminal, 
  Download, 
  Github, 
  Linkedin, 
  Mail, 
  Phone,
  ChevronRight,
  Cpu,
  Database,
  Globe,
  Star,
  Brain,
  Code,
  Zap,
  Cloud,
  Layers,
  Server,
  Award,
  TrendingUp,
  Briefcase,
  Target,
  Rocket,
  Activity,
  Eye
} from "lucide-react";

export default function ModernPortfolio() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [typedText, setTypedText] = useState("");
  const [skillProgress, setSkillProgress] = useState({});
  const [visitorCount, setVisitorCount] = useState(1247);
  const [isVisible, setIsVisible] = useState({});
  const containerRef = useRef(null);
  const statsRef = useRef(null);

  const roles = ["AI Engineer", "Full-Stack Developer", "Cloud Architect", "ML Engineer"];
  const [roleIndex, setRoleIndex] = useState(0);

  // Mouse parallax effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Typing animation
  useEffect(() => {
    const currentRole = roles[roleIndex];
    let index = 0;
    const interval = setInterval(() => {
      if (index <= currentRole.length) {
        setTypedText(currentRole.slice(0, index));
        index++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setRoleIndex((prev) => (prev + 1) % roles.length);
        }, 2000);
      }
    }, 100);
    return () => clearInterval(interval);
  }, [roleIndex]);

  // Scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress((scrolled / maxScroll) * 100);
      setActiveSection(Math.floor(scrolled / 600));
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible((prev) => ({
            ...prev,
            [entry.target.id]: entry.isIntersecting
          }));
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll("[data-observe]").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Skill progress animation
  useEffect(() => {
    if (isVisible.skills) {
      skills.forEach((skill) => {
        setTimeout(() => {
          setSkillProgress((prev) => ({ ...prev, [skill.name]: skill.level }));
        }, 100);
      });
    }
  }, [isVisible.skills]);

  const techStack = [
    { name: "TensorFlow", icon: Brain, color: "#FF6F00", desc: "Deep Learning & Model Training" },
    { name: "PyTorch", icon: Cpu, color: "#EE4C2C", desc: "Neural Networks & Research" },
    { name: "React", icon: Code, color: "#61DAFB", desc: "Modern Frontend" },
    { name: "Node.js", icon: Server, color: "#339933", desc: "Backend APIs" },
    { name: "MongoDB", icon: Database, color: "#47A248", desc: "NoSQL Database" },
    { name: "AWS", icon: Cloud, color: "#FF9900", desc: "Cloud Infrastructure" },
    { name: "Docker", icon: Layers, color: "#2496ED", desc: "Containerization" },
    { name: "Kubernetes", icon: Zap, color: "#326CE5", desc: "Orchestration" },
  ];

 const skills = [
  { name: "Artificial Intelligence & Machine Learning", level: 95, color: "#FF6F00" },
  { name: "Full-Stack Web Development (MERN)", level: 93, color: "#61DAFB" },
  { name: "Deep Learning & Computer Vision", level: 90, color: "#8b5cf6" },
  { name: "Cloud Computing & Deployment", level: 88, color: "#FF9900" },
  { name: "DevOps, CI/CD & Automation", level: 85, color: "#2496ED" },
  { name: "Data Structures & Algorithms", level: 89, color: "#22c55e" },
];


  const stats = [
    { label: "Projects Completed", value: "10+", icon: Briefcase, color: "#00ffff" },
    { label: "Certifications", value: "15+", icon: Award, color: "#8a2be2" },
    { label: "Tech Stack", value: "20+", icon: Code, color: "#00ffff" },
    { label: "Success Rate", value: "100%", icon: Target, color: "#8a2be2" },
  ];

  const achievements = [
    {
      year: "2022-2026",
      title: "3 Industry Internships",
      subtitle: "AI • ML • MERN Stack",
      icon: Star,
      color: "#FFD700",
      details: "Delivered production-ready solutions"
    },
    {
      year: "2022-2026",
      title: "15+ Certifications",
      subtitle: "AI, Cloud & Full-Stack",
      icon: Award,
      color: "#00E5FF",
      details: "Mastered cutting-edge technologies"
    },
    {
      year: "2026",
      title: "Ready for Impact",
      subtitle: "AI Engineer • Full-Stack Developer",
      icon: Rocket,
      color: "#7C4DFF",
      details: "Seeking full-time opportunities"
    }
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Fira+Code:wght@400;500;600&display=swap');

        * { margin: 0; padding: 0; box-sizing: border-box; }
        
        body {
          font-family: 'Outfit', sans-serif;
          background: #000000;
          color: #ffffff;
          overflow-x: hidden;
        }

        @keyframes fadeSlide {
          from { opacity: 0; transform: translateX(-40px); }
          to { opacity: 1; transform: translateX(0); }
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-12px) rotate(3deg); }
        }

        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px currentColor; }
          50% { box-shadow: 0 0 40px currentColor, 0 0 60px currentColor; }
        }

        @keyframes typing {
          from { width: 0; }
          to { width: 100%; }
        }

        @keyframes blink {
          50% { border-color: transparent; }
        }

        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }

        @keyframes slideIn {
          from { transform: translateX(-100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }

        @keyframes countUp {
          from { opacity: 0; transform: scale(0.5); }
          to { opacity: 1; transform: scale(1); }
        }

        .fade-in {
          animation: fadeSlide 1s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          opacity: 0;
        }

        .fade-up {
          animation: fadeUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          opacity: 0;
        }

        .d1 { animation-delay: 0.1s; }
        .d2 { animation-delay: 0.2s; }
        .d3 { animation-delay: 0.3s; }
        .d4 { animation-delay: 0.4s; }
        .d5 { animation-delay: 0.5s; }
        .d6 { animation-delay: 0.6s; }

        .neon-text {
          text-shadow: 
            0 0 10px rgba(0, 255, 255, 0.7),
            0 0 20px rgba(0, 255, 255, 0.5),
            0 0 40px rgba(0, 255, 255, 0.3);
        }

        .hologram-card {
          background: linear-gradient(145deg, rgba(0,255,255,0.05) 0%, rgba(138,43,226,0.05) 100%);
          border: 1px solid rgba(0,255,255,0.2);
          position: relative;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .hologram-card:hover {
          transform: translateY(-10px) scale(1.02);
          border-color: rgba(0,255,255,0.5);
          box-shadow: 0 20px 60px rgba(0,255,255,0.3);
        }

        .hologram-card::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(
            45deg,
            transparent 30%,
            rgba(0,255,255,0.1) 50%,
            transparent 70%
          );
          animation: scan 3s linear infinite;
        }

        .cyber-btn {
          position: relative;
          background: linear-gradient(135deg, #00ffff, #8a2be2);
          border: none;
          color: #000;
          font-weight: 700;
          cursor: pointer;
          clip-path: polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%);
          transition: all 0.3s;
          text-transform: uppercase;
          letter-spacing: 1px;
          overflow: hidden;
        }

        .cyber-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
          transition: left 0.5s;
        }

        .cyber-btn:hover::before {
          left: 100%;
        }

        .cyber-btn:hover {
          transform: scale(1.05) translateY(-2px);
          box-shadow: 0 10px 40px rgba(0,255,255,0.6);
        }

        .grid-bg {
          background-image: 
            linear-gradient(rgba(0,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,255,255,0.1) 1px, transparent 1px);
          background-size: 50px 50px;
          animation: gridMove 20s linear infinite;
        }

        @keyframes gridMove {
          0% { background-position: 0 0; }
          100% { background-position: 50px 50px; }
        }

        .tech-tag {
          background: rgba(0,0,0,0.6);
          border: 1px solid currentColor;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-size: 0.85rem;
          font-family: 'Fira Code', monospace;
          transition: all 0.3s;
          position: relative;
          overflow: hidden;
        }

        .tech-tag::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, currentColor, transparent);
          opacity: 0.1;
          transition: left 0.5s;
        }

        .tech-tag:hover::before {
          left: 100%;
        }

        .tech-tag:hover {
          transform: translateY(-5px) scale(1.05);
          box-shadow: 0 10px 30px currentColor;
          border-width: 2px;
        }

        .tech-orbit {
          position: absolute;
          width: 64px;
          height: 64px;
          background: rgba(0,0,0,0.65);
          border: 2.5px solid;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          backdrop-filter: blur(10px);
          box-shadow: 0 0 25px currentColor;
          animation: float 7s ease-in-out infinite;
          z-index: 2;
          transition: all 0.4s;
        }

        .tech-orbit:hover {
          transform: scale(1.35) !important;
          box-shadow: 0 0 50px currentColor !important;
          animation: glow 1.5s ease-in-out infinite;
        }

        .ready-badge {
          position: absolute;
          top: -25px;
          left: 50%;
          transform: translateX(-50%);
          background: linear-gradient(135deg, #00ffff, #8a2be2);
          color: #000;
          font-weight: 900;
          font-size: 1.2rem;
          padding: 0.7rem 1.6rem;
          border-radius: 40px;
          box-shadow: 0 0 35px rgba(0,255,255,0.8);
          border: 2.5px solid #fff;
          letter-spacing: 2px;
          z-index: 10;
          animation: pulse 2s infinite;
          white-space: nowrap;
        }

        .skill-bar {
          height: 8px;
          background: rgba(0,255,255,0.1);
          border-radius: 10px;
          overflow: hidden;
          position: relative;
        }

        .skill-fill {
          height: 100%;
          background: linear-gradient(90deg, currentColor, rgba(138,43,226,0.8));
          border-radius: 10px;
          transition: width 1.5s cubic-bezier(0.22, 1, 0.36, 1);
          position: relative;
          overflow: hidden;
        }

        .skill-fill::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
          animation: shimmer 2s infinite;
        }

        .stat-card {
          background: linear-gradient(145deg, rgba(0,0,0,0.8), rgba(0,255,255,0.05));
          border: 2px solid;
          border-radius: 20px;
          padding: 2rem;
          text-align: center;
          transition: all 0.4s;
          position: relative;
          overflow: hidden;
        }

        .stat-card::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          border-radius: 50%;
          background: currentColor;
          opacity: 0.1;
          transform: translate(-50%, -50%);
          transition: width 0.4s, height 0.4s;
        }

        .stat-card:hover::before {
          width: 300px;
          height: 300px;
        }

        .stat-card:hover {
          transform: translateY(-10px) scale(1.05);
          box-shadow: 0 20px 60px currentColor;
        }

        .typing-cursor {
          display: inline-block;
          width: 3px;
          height: 1.2em;
          background: #00ffff;
          margin-left: 5px;
          animation: blink 1s step-end infinite;
        }

        .particle {
          position: absolute;
          width: 4px;
          height: 4px;
          background: #00ffff;
          border-radius: 50%;
          pointer-events: none;
          animation: particleFloat 3s ease-out forwards;
        }

        @keyframes particleFloat {
          0% { transform: translateY(0) scale(1); opacity: 1; }
          100% { transform: translateY(-100px) scale(0); opacity: 0; }
        }

        .hire-badge {
          color: #00ffff;
          text-decoration: none;
          font-weight: 700;
          transition: all 0.3s;
        }

        .hire-badge:hover {
          color: #ffffff;
          text-shadow: 0 0 15px #00ffff;
        }

        @media (max-width: 768px) {
          .hero-layout { flex-direction: column !important; }
          .tech-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .profile-container { width: 320px !important; height: 400px !important; }
          .tech-orbit { width: 54px !important; height: 54px !important; }
          .ready-badge { font-size: 1rem !important; padding: 0.6rem 1.2rem !important; top: -20px !important; }
        }
      `}</style>

      <div style={{ background: "#000000", minHeight: "100vh", position: "relative" }}>
        {/* Progress Bar */}
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: `${scrollProgress}%`,
          height: "4px",
          background: "linear-gradient(90deg, #00ffff, #8a2be2)",
          zIndex: 1000,
          transition: "width 0.1s",
          boxShadow: "0 0 20px rgba(0,255,255,0.8)"
        }} />

        {/* Visitor Counter */}
        <div style={{
          position: "fixed",
          top: "20px",
          right: "20px",
          background: "rgba(0,0,0,0.8)",
          border: "2px solid #00ffff",
          borderRadius: "10px",
          padding: "0.75rem 1.5rem",
          zIndex: 1000,
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          backdropFilter: "blur(10px)"
        }}>
          <Eye size={18} style={{ color: "#00ffff" }} />
          <span style={{ fontFamily: "'Fira Code', monospace", color: "#00ffff", fontSize: "0.9rem" }}>
            {visitorCount.toLocaleString()} views
          </span>
        </div>

        {/* Grid Background */}
        <div className="grid-bg" style={{
          position: "fixed",
          inset: 0,
          opacity: 0.3,
          pointerEvents: "none"
        }} />

        {/* Animated Background Elements */}
        <div style={{
          position: "fixed",
          top: "50%",
          right: "-10%",
          width: "800px",
          height: "800px",
          border: "2px solid rgba(0,255,255,0.1)",
          borderRadius: "50%",
          animation: "rotate 30s linear infinite",
          pointerEvents: "none",
          transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`
        }} />

        <div style={{
          position: "fixed",
          bottom: "-10%",
          left: "-10%",
          width: "600px",
          height: "600px",
          border: "2px solid rgba(138,43,226,0.1)",
          borderRadius: "50%",
          animation: "rotate 40s linear infinite reverse",
          pointerEvents: "none",
          transform: `translate(${-mousePosition.x}px, ${-mousePosition.y}px)`
        }} />

        <div ref={containerRef} style={{ maxWidth: "1300px", margin: "0 auto", padding: "0 2rem", position: "relative", zIndex: 10 }}>
          {/* Hero Section */}
          <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", paddingTop: "4rem" }}>
            <div className="hero-layout" style={{ display: "flex", gap: "4rem", alignItems: "center", width: "100%" }}>
              <div style={{ flex: 1 }}>
                <div className="fade-in d1" style={{
                  fontFamily: "'Fira Code', monospace",
                  color: "#00ffff",
                  fontSize: "1rem",
                  marginBottom: "1rem",
                  opacity: 0.8
                }}>
                  {'>'} System.initialize()
                </div>

                <h1 className="fade-in d2 neon-text" style={{
                  fontSize: "clamp(3rem, 7vw, 5.5rem)",
                  fontWeight: 900,
                  lineHeight: 1.1,
                  marginBottom: "1rem",
                  background: "linear-gradient(135deg, #00ffff 0%, #8a2be2 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent"
                }}>
                  SIVA SATYA SAI<br />BHAGAVAN
                </h1>

                <div
                  className="fade-in d3"
                  style={{
                    fontSize: "clamp(1.2rem, 3vw, 1.8rem)",
                    fontWeight: 600,
                    marginBottom: "2rem",
                    fontFamily: "'Fira Code', monospace",
                    letterSpacing: "0.12em",
                    color: "#00ffff",
                    minHeight: "2.5rem"
                  }}
                >
                  [ {typedText}<span className="typing-cursor" /> ]
                </div>

                <p className="fade-in d4" style={{
                  fontSize: "1.2rem",
                  lineHeight: 1.8,
                  color: "#a0a0a0",
                  maxWidth: "600px",
                  marginBottom: "3rem"
                }}>
                  Engineering the future with intelligent systems. Specialized in building
                  production-grade AI/ML pipelines, scalable cloud architectures, and seamless
                  full-stack experiences that drive real business impact.
                </p>

                <div className="fade-in d5" style={{ display: "flex", gap: "1.5rem", marginBottom: "3rem", flexWrap: "wrap" }}>
                  <Link 
                    to="/projects" 
                    className="cyber-btn" 
                    style={{
                      padding: "1.2rem 3rem",
                      fontSize: "1rem",
                      textDecoration: "none",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.6rem"
                    }}
                  >
                    <Terminal size={20} />
                    View Projects
                  </Link>

                  <a 
                    href={resumePdf} 
                    download="Bhagavan_Resume.pdf"
                    style={{
                      padding: "1.2rem 3rem",
                      background: "transparent",
                      border: "2px solid #00ffff",
                      color: "#00ffff",
                      fontWeight: 600,
                      cursor: "pointer",
                      transition: "all 0.3s",
                      fontSize: "1rem",
                      textDecoration: "none",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.6rem",
                      position: "relative",
                      overflow: "hidden"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "#00ffff";
                      e.currentTarget.style.color = "#000";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.color = "#00ffff";
                    }}
                  >
                    <Download size={20} />
                    Get Résumé
                  </a>
                </div>

                <div className="fade-in d6" style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                  {[
                    { icon: Github, href: "https://github.com/bhagavan444", color: "#ffffff" },
                    { icon: Linkedin, href: "https://www.linkedin.com/in/gopalajosyula-siva-satya-sai-bhagavan-1624a027b/", color: "#00ffff" },
                    { icon: Mail, href: "mailto:g.sivasatyasaibhagavan@gmail.com", color: "#8a2be2" },
                    { icon: Phone, href: "tel:+917569205626", color: "#00ffff" }
                  ].map((link, i) => (
                    <a
                      key={i}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "50px",
                        height: "50px",
                        background: "rgba(0,0,0,0.5)",
                        border: `2px solid ${link.color}`,
                        borderRadius: "50%",
                        color: link.color,
                        transition: "all 0.3s",
                        textDecoration: "none"
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "scale(1.2) translateY(-5px)";
                        e.currentTarget.style.boxShadow = `0 10px 30px ${link.color}`;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "scale(1) translateY(0)";
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    >
                      <link.icon size={22} />
                    </a>
                  ))}
                </div>
              </div>

              {/* Animated Profile */}
              <div className="fade-in d4" style={{ flex: 1, maxWidth: "450px", display: "flex", justifyContent: "center" }}>
                <div className="profile-container" style={{ position: "relative", width: "400px", height: "480px" }}>
                  <div className="ready-badge">2026 READY</div>

                  <div style={{
                    position: "absolute",
                    inset: "-20px",
                    border: "3px solid transparent",
                    borderTopColor: "#00ffff",
                    borderRightColor: "#00ffff",
                    borderRadius: "20px",
                    animation: "rotate 4s linear infinite",
                    opacity: 0.6
                  }} />

                  <div style={{
                    position: "absolute",
                    inset: "-35px",
                    border: "2px solid transparent",
                    borderBottomColor: "#8a2be2",
                    borderLeftColor: "#8a2be2",
                    borderRadius: "25px",
                    animation: "rotate 6s linear infinite reverse",
                    opacity: 0.5
                  }} />

                  <div style={{
                    position: "absolute",
                    inset: "-50px",
                    border: "2px solid transparent",
                    borderTopColor: "#00ffff",
                    borderRadius: "30px",
                    animation: "rotate 8s linear infinite",
                    opacity: 0.3
                  }} />

                  {[
                    { top: "-10px", left: "-10px", borderTop: true, borderLeft: true, color: "#00ffff" },
                    { top: "-10px", right: "-10px", borderTop: true, borderRight: true, color: "#8a2be2", delay: "0.5s" },
                    { bottom: "-10px", left: "-10px", borderBottom: true, borderLeft: true, color: "#00ffff", delay: "1s" },
                    { bottom: "-10px", right: "-10px", borderBottom: true, borderRight: true, color: "#8a2be2", delay: "1.5s" }
                  ].map((corner, i) => (
                    <div key={i} style={{
                      position: "absolute",
                      ...Object.fromEntries(Object.entries(corner).filter(([k]) => ['top', 'right', 'bottom', 'left'].includes(k))),
                      width: "30px",
                      height: "30px",
                      ...(corner.borderTop && { borderTop: `3px solid ${corner.color}` }),
                      ...(corner.borderRight && { borderRight: `3px solid ${corner.color}` }),
                      ...(corner.borderBottom && { borderBottom: `3px solid ${corner.color}` }),
                      ...(corner.borderLeft && { borderLeft: `3px solid ${corner.color}` }),
                      animation: "pulse 2s ease-in-out infinite",
                      animationDelay: corner.delay || "0s"
                    }} />
                  ))}

                  <div style={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                    borderRadius: "20px",
                    overflow: "hidden",
                    border: "4px solid rgba(0,255,255,0.4)",
                    boxShadow: `
                      0 0 40px rgba(0,255,255,0.5),
                      0 0 80px rgba(138,43,226,0.4),
                      inset 0 0 40px rgba(0,0,0,0.6)
                    `,
                    transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`
                  }}>
                    <img
                      src={profileImg}
                      alt="Siva Satya Sai Bhagavan"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block"
                      }}
                    />

                    <div style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      height: "120px",
                      background: "linear-gradient(to bottom, transparent, rgba(0,255,255,0.3), transparent)",
                      animation: "scan 3s ease-in-out infinite",
                      pointerEvents: "none"
                    }} />

                    <div style={{
                      position: "absolute",
                      inset: 0,
                      background: "linear-gradient(to top, rgba(0,0,0,0.5), transparent 60%)",
                      pointerEvents: "none"
                    }} />
                  </div>

                  {techStack.map((tech, index) => {
                    const positions = [
                      { top: "-10%", left: "50%", transform: "translate(-50%, -50%)" },
                      { top: "20%", right: "-10%", transform: "translate(50%, -50%)" },
                      { top: "50%", right: "-10%", transform: "translate(50%, -50%)" },
                      { bottom: "20%", right: "-10%", transform: "translate(50%, 50%)" },
                      { bottom: "-10%", left: "50%", transform: "translate(-50%, 50%)" },
                      { bottom: "20%", left: "-10%", transform: "translate(-50%, 50%)" },
                      { top: "50%", left: "-10%", transform: "translate(-50%, -50%)" },
                      { top: "20%", left: "-10%", transform: "translate(-50%, -50%)" },
                    ];

                    const pos = positions[index % positions.length];
                    const delay = index * 0.5;

                    return (
                      <div
                        key={index}
                        className="tech-orbit"
                        style={{
                          ...pos,
                          borderColor: tech.color,
                          color: tech.color,
                          animationDelay: `${delay}s`,
                        }}
                        title={tech.desc}
                      >
                        <tech.icon size={32} />
                      </div>
                    );
                  })}

                  <div style={{
                    position: "absolute",
                    bottom: "20px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    background: "rgba(0,0,0,0.8)",
                    border: "2px solid #00ffff",
                    borderRadius: "30px",
                    padding: "0.75rem 1.5rem",
                    fontFamily: "'Fira Code', monospace",
                    fontSize: "0.85rem",
                    color: "#00ffff",
                    fontWeight: 600,
                    boxShadow: "0 0 20px rgba(0,255,255,0.5)",
                    animation: "pulse 2s ease-in-out infinite",
                    whiteSpace: "nowrap"
                  }}>
                    <a
                      href="mailto:g.sivasatyasaibhagavan@gmail.com"
                      className="hire-badge"
                    >
                      AVAILABLE FOR HIRE
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Stats Section */}
          <section id="stats" data-observe style={{ padding: "4rem 0" }}>
            <div className="stats-grid" style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "2rem"
            }}>
              {stats.map((stat, i) => (
                <div
                  key={i}
                  className={`stat-card ${isVisible.stats ? 'fade-up' : ''}`}
                  style={{
                    borderColor: stat.color,
                    color: stat.color,
                    animationDelay: `${i * 0.1}s`,
                    opacity: isVisible.stats ? 1 : 0
                  }}
                >
                  <stat.icon size={40} style={{ marginBottom: "1rem" }} />
                  <div style={{
                    fontSize: "2.5rem",
                    fontWeight: 800,
                    marginBottom: "0.5rem",
                    fontFamily: "'Fira Code', monospace"
                  }}>
                    {stat.value}
                  </div>
                  <div style={{
                    fontSize: "0.95rem",
                    opacity: 0.8,
                    textTransform: "uppercase",
                    letterSpacing: "1px"
                  }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Skills Section */}
          <section id="skills" data-observe style={{ padding: "6rem 0" }}>
            <h2 style={{
              fontSize: "3rem",
              fontWeight: 800,
              marginBottom: "3rem",
              textAlign: "center",
              color: "#00ffff",
              textTransform: "uppercase",
              letterSpacing: "2px"
            }}>
              Core Competencies
            </h2>

            <div style={{ maxWidth: "800px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "2rem" }}>
              {skills.map((skill, i) => (
                <div key={i} style={{ opacity: isVisible.skills ? 1 : 0, transition: "opacity 0.5s", transitionDelay: `${i * 0.1}s` }}>
                  <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "0.75rem",
                    alignItems: "center"
                  }}>
                    <span style={{
                      fontSize: "1.1rem",
                      fontWeight: 600,
                      color: skill.color
                    }}>
                      {skill.name}
                    </span>
                    <span style={{
                      fontFamily: "'Fira Code', monospace",
                      fontSize: "1rem",
                      color: skill.color,
                      fontWeight: 700
                    }}>
                      {skillProgress[skill.name] || 0}%
                    </span>
                  </div>
                  <div className="skill-bar">
                    <div
                      className="skill-fill"
                      style={{
                        width: `${skillProgress[skill.name] || 0}%`,
                        color: skill.color
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Tech Stack Section */}
          <section style={{ padding: "6rem 0" }}>
            <h2 style={{
              fontSize: "3rem",
              fontWeight: 800,
              marginBottom: "3rem",
              textAlign: "center",
              color: "#00ffff",
              textTransform: "uppercase",
              letterSpacing: "2px"
            }}>
              Technology Arsenal
            </h2>

            <div className="tech-grid" style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "1.5rem"
            }}>
              {techStack.map((tech, i) => (
                <div
                  key={i}
                  className="tech-tag fade-in"
                  style={{
                    color: tech.color,
                    borderColor: tech.color,
                    animationDelay: `${i * 0.05}s`,
                    textAlign: "center",
                    padding: "1.2rem 1rem"
                  }}
                >
                  <tech.icon size={32} style={{ marginBottom: "0.5rem" }} />
                  <div style={{ fontWeight: 600, marginBottom: "0.25rem" }}>{tech.name}</div>
                  <div style={{ fontSize: "0.75rem", opacity: 0.7 }}>{tech.desc}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Achievements Timeline */}
          <section style={{ padding: "6rem 0 10rem" }}>
            <h2 style={{
              fontSize: "3rem",
              fontWeight: 800,
              marginBottom: "4rem",
              textAlign: "center",
              color: "#00ffff",
              textTransform: "uppercase",
              letterSpacing: "2px"
            }}>
              Journey Milestones
            </h2>

            <div style={{ display: "flex", justifyContent: "space-around", alignItems: "stretch", flexWrap: "wrap", gap: "3rem" }}>
              {achievements.map((milestone, i) => (
                <div key={i} className="hologram-card fade-in" style={{
                  padding: "2.5rem 2rem",
                  borderRadius: "20px",
                  textAlign: "center",
                  minWidth: "280px",
                  flex: "1 1 280px",
                  maxWidth: "350px",
                  animationDelay: `${i * 0.15}s`,
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem"
                }}>
                  <div style={{
                    width: "80px",
                    height: "80px",
                    margin: "0 auto",
                    borderRadius: "50%",
                    border: `3px solid ${milestone.color}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "rgba(0,0,0,0.6)",
                    boxShadow: `0 0 30px ${milestone.color}`
                  }}>
                    <milestone.icon size={40} style={{ color: milestone.color }} />
                  </div>
                  
                  <div style={{ fontSize: "2.5rem", fontWeight: 800, color: milestone.color }}>
                    {milestone.year}
                  </div>
                  
                  <div style={{ fontSize: "1.3rem", fontWeight: 700, color: "#ffffff" }}>
                    {milestone.title}
                  </div>
                  
                  <div style={{ fontSize: "1rem", color: "#a0a0a0", marginBottom: "0.5rem" }}>
                    {milestone.subtitle}
                  </div>
                  
                  <div style={{
                    fontSize: "0.9rem",
                    color: milestone.color,
                    fontStyle: "italic",
                    borderTop: `1px solid ${milestone.color}`,
                    paddingTop: "1rem",
                    marginTop: "auto"
                  }}>
                    {milestone.details}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* CTA Section */}
          <section style={{
            padding: "6rem 0 8rem",
            textAlign: "center"
          }}>
            <div className="hologram-card" style={{
              padding: "4rem 2rem",
              borderRadius: "30px",
              maxWidth: "800px",
              margin: "0 auto"
            }}>
              <h2 style={{
                fontSize: "2.5rem",
                fontWeight: 800,
                marginBottom: "1.5rem",
                background: "linear-gradient(135deg, #00ffff 0%, #8a2be2 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent"
              }}>
                Let's Build Something Extraordinary
              </h2>
              
              <p style={{
                fontSize: "1.2rem",
                color: "#a0a0a0",
                marginBottom: "2.5rem",
                lineHeight: 1.6
              }}>
                Ready to collaborate on your next AI-powered project or full-stack application?
                Let's turn innovative ideas into production-ready solutions.
              </p>
              
              <div style={{ display: "flex", gap: "1.5rem", justifyContent: "center", flexWrap: "wrap" }}>
                <a
                  href="mailto:g.sivasatyasaibhagavan@gmail.com"
                  className="cyber-btn"
                  style={{
                    padding: "1.2rem 3rem",
                    fontSize: "1rem",
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.6rem"
                  }}
                >
                  <Mail size={20} />
                  Start a Conversation
                </a>
                
                <Link
                  to="/projects"
                  style={{
                    padding: "1.2rem 3rem",
                    background: "transparent",
                    border: "2px solid #8a2be2",
                    color: "#8a2be2",
                    fontWeight: 600,
                    cursor: "pointer",
                    transition: "all 0.3s",
                    fontSize: "1rem",
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.6rem",
                    borderRadius: "5px"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#8a2be2";
                    e.currentTarget.style.color = "#000";
                    e.currentTarget.style.transform = "translateY(-3px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color = "#8a2be2";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <Rocket size={20} />
                  Explore My Work
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}