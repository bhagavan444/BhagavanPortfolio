"use client";

import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import profileImg from "../assets/profile.jpeg";
import resumePdf from "../assets/bhagavanresume.pdf"; // <-- Added import for resume PDF

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
  Server
} from "lucide-react";

export default function ModernPortfolio() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState(0);
  const containerRef = useRef(null);

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

  const techStack = [
    { name: "TensorFlow", icon: Brain, color: "#FF6F00", desc: "Deep Learning & Model Training" },
    { name: "PyTorch", icon: Cpu, color: "#EE4C2C", desc: "Neural Networks & Research Models" },
    { name: "React", icon: Code, color: "#61DAFB", desc: "Modern Frontend Interfaces" },
    { name: "Node.js", icon: Server, color: "#339933", desc: "Backend APIs & Authentication" },
    { name: "MongoDB", icon: Database, color: "#47A248", desc: "NoSQL Database Design" },
    { name: "AWS", icon: Cloud, color: "#FF9900", desc: "Cloud Deployment & Hosting" },
    { name: "Docker", icon: Layers, color: "#2496ED", desc: "Containerized Applications" },
    { name: "Kubernetes", icon: Zap, color: "#326CE5", desc: "Scalable Orchestration" },
  ];

  const milestones = [
    {
      year: "2024",
      title: "3 Industry Internships",
      subtitle: "AI • ML • MERN Stack",
      icon: Star,
      color: "#FFD700"
    },
    {
      year: "2025",
      title: "15+ Professional Certifications",
      subtitle: "AI, Cloud & Full-Stack",
      icon: Star,
      color: "#00E5FF"
    },
    {
      year: "2026",
      title: "Ready for Full-Time Roles",
      subtitle: "AI Engineer • Full-Stack Developer",
      icon: Star,
      color: "#7C4DFF"
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

        .fade-in {
          animation: fadeSlide 1s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          opacity: 0;
        }

        .d1 { animation-delay: 0.1s; }
        .d2 { animation-delay: 0.2s; }
        .d3 { animation-delay: 0.3s; }
        .d4 { animation-delay: 0.4s; }
        .d5 { animation-delay: 0.5s; }

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
        }

        .cyber-btn:hover {
          transform: scale(1.05);
          box-shadow: 0 0 30px rgba(0,255,255,0.6);
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
        }

        .tech-tag:hover {
          transform: translateY(-3px);
          box-shadow: 0 5px 20px currentColor;
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
          transform: scale(1.25) !important;
          box-shadow: 0 0 45px currentColor !important;
        }

        .badge-2026 {
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

        .hire-badge {
          color: #00ffff;
          text-decoration: none;
          font-weight: 700;
        }

        .hire-badge:hover {
          color: #ffffff;
          text-shadow: 0 0 15px #00ffff;
        }

        @media (max-width: 768px) {
          .hero-layout { flex-direction: column !important; }
          .tech-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .profile-container { width: 320px !important; height: 400px !important; }
          .tech-orbit { width: 54px !important; height: 54px !important; }
          .badge-2026 { font-size: 1rem !important; padding: 0.6rem 1.2rem !important; top: -20px !important; }
        }
      `}</style>

      <div style={{ background: "#000000", minHeight: "100vh", position: "relative" }}>
        {/* Progress Bar */}
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: `${scrollProgress}%`,
          height: "3px",
          background: "linear-gradient(90deg, #00ffff, #8a2be2)",
          zIndex: 1000,
          transition: "width 0.1s"
        }} />

        {/* Grid Background */}
        <div className="grid-bg" style={{
          position: "fixed",
          inset: 0,
          opacity: 0.3,
          pointerEvents: "none"
        }} />

        {/* Rotating Rings */}
        <div style={{
          position: "fixed",
          top: "50%",
          right: "-10%",
          width: "800px",
          height: "800px",
          border: "2px solid rgba(0,255,255,0.1)",
          borderRadius: "50%",
          animation: "rotate 30s linear infinite",
          pointerEvents: "none"
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
          pointerEvents: "none"
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
                  className="fade-in d3 role-glow"
                  style={{
                    fontSize: "clamp(1.2rem, 3vw, 1.6rem)",
                    fontWeight: 600,
                    marginBottom: "2rem",
                    fontFamily: "'Fira Code', monospace",
                    letterSpacing: "0.12em"
                  }}
                >
                  [ AI Engineer × Full-Stack Developer ]
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
                  full-stack experiences.
                </p>

                <div className="fade-in d5" style={{ display: "flex", gap: "1.5rem", marginBottom: "3rem", flexWrap: "wrap" }}>
                  {/* Projects Button - Links to /projects */}
                  <a 
                    href="/projects" 
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
                  </a>

                  {/* Resume Button - Direct PDF Download */}
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
                      gap: "0.6rem"
                    }}
                  >
                    <Download size={20} />
                    Get Résumé
                  </a>
                </div>

                <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
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
                    >
                      <link.icon size={22} />
                    </a>
                  ))}
                </div>
              </div>

              {/* Animated Profile Image - Rectangle Shape */}
              <div className="fade-in d4" style={{ flex: 1, maxWidth: "450px", display: "flex", justifyContent: "center" }}>
                <div className="profile-container" style={{ position: "relative", width: "400px", height: "480px" }}>
                  {/* 2026 Badge - Top Center */}
                  <div className="ready-badge">
  2026 READY
</div>


                  {/* Rotating Ring 1 */}
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

                  {/* Rotating Ring 2 */}
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

                  {/* Rotating Ring 3 */}
                  <div style={{
                    position: "absolute",
                    inset: "-50px",
                    border: "2px solid transparent",
                    borderTopColor: "#00ffff",
                    borderRadius: "30px",
                    animation: "rotate 8s linear infinite",
                    opacity: 0.3
                  }} />

                  {/* Glowing Corner Accents */}
                  <div style={{
                    position: "absolute",
                    top: "-10px",
                    left: "-10px",
                    width: "30px",
                    height: "30px",
                    borderTop: "3px solid #00ffff",
                    borderLeft: "3px solid #00ffff",
                    animation: "pulse 2s ease-in-out infinite"
                  }} />
                  <div style={{
                    position: "absolute",
                    top: "-10px",
                    right: "-10px",
                    width: "30px",
                    height: "30px",
                    borderTop: "3px solid #8a2be2",
                    borderRight: "3px solid #8a2be2",
                    animation: "pulse 2s ease-in-out infinite",
                    animationDelay: "0.5s"
                  }} />
                  <div style={{
                    position: "absolute",
                    bottom: "-10px",
                    left: "-10px",
                    width: "30px",
                    height: "30px",
                    borderBottom: "3px solid #00ffff",
                    borderLeft: "3px solid #00ffff",
                    animation: "pulse 2s ease-in-out infinite",
                    animationDelay: "1s"
                  }} />
                  <div style={{
                    position: "absolute",
                    bottom: "-10px",
                    right: "-10px",
                    width: "30px",
                    height: "30px",
                    borderBottom: "3px solid #8a2be2",
                    borderRight: "3px solid #8a2be2",
                    animation: "pulse 2s ease-in-out infinite",
                    animationDelay: "1.5s"
                  }} />

                  {/* Image Container - Rectangle Shape */}
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
                    `
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

                    {/* Hologram Scan Effect */}
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

                    {/* Gradient Overlay */}
                    <div style={{
                      position: "absolute",
                      inset: 0,
                      background: "linear-gradient(to top, rgba(0,0,0,0.5), transparent 60%)",
                      pointerEvents: "none"
                    }} />
                  </div>

                  {/* Orbiting Tech Icons - Positioned around rectangle edges */}
                  {techStack.map((tech, index) => {
                    const positions = [
                      { top: "-10%", left: "50%", transform: "translate(-50%, -50%)" },     // Top center
                      { top: "20%", right: "-10%", transform: "translate(50%, -50%)" },     // Top-right
                      { top: "50%", right: "-10%", transform: "translate(50%, -50%)" },     // Middle-right
                      { bottom: "20%", right: "-10%", transform: "translate(50%, 50%)" },   // Bottom-right
                      { bottom: "-10%", left: "50%", transform: "translate(-50%, 50%)" },   // Bottom center
                      { bottom: "20%", left: "-10%", transform: "translate(-50%, 50%)" },   // Bottom-left
                      { top: "50%", left: "-10%", transform: "translate(-50%, -50%)" },     // Middle-left
                      { top: "20%", left: "-10%", transform: "translate(-50%, -50%)" },     // Top-left
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
                      >
                        <tech.icon size={32} />
                      </div>
                    );
                  })}

                  {/* Floating Status Badge */}
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
              Technology Stack
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
                  <div style={{ fontWeight: 600, marginBottom: "0.25rem" }}>{tech.name}</div>
                  <div style={{ fontSize: "0.75rem", opacity: 0.7 }}>{tech.desc}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Timeline */}
          <section style={{ padding: "6rem 0 10rem" }}>
            <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center", flexWrap: "wrap", gap: "3rem" }}>
              {milestones.map((milestone, i) => (
                <div key={i} className="hologram-card fade-in" style={{
                  padding: "2.5rem 2rem",
                  borderRadius: "20px",
                  textAlign: "center",
                  minWidth: "250px",
                  animationDelay: `${i * 0.15}s`
                }}>
                  <milestone.icon size={40} style={{ color: milestone.color, marginBottom: "1rem" }} />
                  <div style={{ fontSize: "2.5rem", fontWeight: 800, color: "#8a2be2", marginBottom: "0.5rem" }}>
                    {milestone.year}
                  </div>
                  <div style={{ fontSize: "1.1rem", color: "#a0a0a0" }}>
                    {milestone.title}
                  </div>
                  <div style={{ fontSize: "0.95rem", color: "#b0b0ff", marginTop: "0.5rem" }}>
                    {milestone.subtitle}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
} 