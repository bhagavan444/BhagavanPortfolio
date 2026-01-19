import { 
  Trophy, Award, X, Code, Database, Shield, Rocket, Crown, 
  Clock, Users, Sparkles, Zap, Star, Flame, Target, Cpu, GitBranch, Download,
  TrendingUp, Layers, Box, CheckCircle, ArrowRight, Hexagon
} from "lucide-react";
import certificateImage from "../assets/images/Brainovision-certificate.jpg";

import { useState, useEffect, useRef } from "react";

export default function HackathonShowcase() {
  const [modal, setModal] = useState(false);
  const [activePhase, setActivePhase] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [scrollY, setScrollY] = useState(0);
  const containerRef = useRef(null);

  // Certificate image - replace with your actual path
 

  const phases = [
    { 
      hour: "0-6h", 
      icon: Code, 
      title: "Foundation Sprint", 
      desc: "System architecture design, MongoDB schema modeling, JWT authentication core, project scaffolding",
      color: "#06b6d4",
      achievements: ["Database Schema", "Auth System", "API Structure"]
    },
    { 
      hour: "6-14h", 
      icon: Database, 
      title: "Core Development", 
      desc: "RESTful API endpoints, React component library, state management, real-time features integration",
      color: "#8b5cf6",
      achievements: ["15+ API Routes", "UI Components", "State Logic"]
    },
    { 
      hour: "14-20h", 
      icon: Shield, 
      title: "Integration Phase", 
      desc: "Socket.io chat implementation, security hardening, error handling, data validation layers",
      color: "#ec4899",
      achievements: ["Real-time Chat", "Security Layer", "Validation"]
    },
    { 
      hour: "20-24h", 
      icon: Rocket, 
      title: "Launch Sequence", 
      desc: "Production optimization, comprehensive testing, demo preparation, cloud deployment pipeline",
      color: "#10b981",
      achievements: ["Testing Suite", "Deployment", "Documentation"]
    }
  ];

  const techStack = [
    { icon: Database, name: "MongoDB", desc: "NoSQL Database", color: "#10b981" },
    { icon: Zap, name: "Express.js", desc: "Backend Framework", color: "#06b6d4" },
    { icon: Sparkles, name: "React", desc: "UI Library", color: "#8b5cf6" },
    { icon: GitBranch, name: "Node.js", desc: "Runtime", color: "#ec4899" },
    { icon: Shield, name: "JWT", desc: "Authentication", color: "#f59e0b" },
    { icon: Code, name: "Socket.io", desc: "Real-time", color: "#3b82f6" }
  ];

  const stats = [
    { label: "Duration", value: "24", unit: "hours", icon: Clock, color: "#06b6d4" },
    { label: "Team Size", value: "4", unit: "members", icon: Users, color: "#8b5cf6" },
    { label: "Code Lines", value: "5000+", unit: "lines", icon: Code, color: "#ec4899" },
    { label: "Rank", value: "1st", unit: "place", icon: Trophy, color: "#fbbf24" }
  ];

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMove = (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setMousePos({
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100
      });
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMove);

    // Auto-cycle phases
    const interval = setInterval(() => {
      setActivePhase(prev => (prev + 1) % phases.length);
    }, 4000);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMove);
      clearInterval(interval);
    };
  }, []);

  const handleDownload = () => {
  const link = document.createElement("a");
  link.href = certificateImage;
  link.download = "Brainovision-Certificate-2024.jpg";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};


  return (
    <div
      ref={containerRef}
      style={{
        minHeight: "100vh",
        background: "#000000",
        color: "#ffffff",
        fontFamily: "system-ui, -apple-system, sans-serif",
        position: "relative",
        overflow: "hidden"
      }}
    >
      <style>{`
        @keyframes float { 0%, 100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-20px) rotate(5deg); } }
        @keyframes glow { 0%, 100% { filter: drop-shadow(0 0 20px currentColor); } 50% { filter: drop-shadow(0 0 40px currentColor); } }
        @keyframes slide { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
        @keyframes shimmer { 0% { background-position: -200%; } 100% { background-position: 200%; } }
        @keyframes pulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.8; transform: scale(1.05); } }
        @keyframes rotate { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        @keyframes fadeIn { 0% { opacity: 0; transform: translateY(30px); } 100% { opacity: 1; transform: translateY(0); } }
        @keyframes gradient { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
        .float { animation: float 6s ease-in-out infinite; }
        .glow { animation: glow 2s ease-in-out infinite; }
        .shimmer { animation: shimmer 3s linear infinite; }
        .pulse { animation: pulse 3s ease-in-out infinite; }
        .rotate { animation: rotate 20s linear infinite; }
        .fadeIn { animation: fadeIn 0.8s ease-out forwards; }
      `}</style>

      {/* Animated Background */}
      <div style={{
        position: "fixed",
        inset: 0,
        background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(139,92,246,0.15), transparent 50%)`,
        transition: "background 0.3s ease",
        zIndex: 0
      }} />
      
      <div style={{
        position: "fixed",
        inset: 0,
        backgroundImage: `
          linear-gradient(rgba(139,92,246,0.03) 2px, transparent 2px),
          linear-gradient(90deg, rgba(139,92,246,0.03) 2px, transparent 2px)
        `,
        backgroundSize: "100px 100px",
        transform: `translateY(${scrollY * 0.5}px)`,
        zIndex: 0
      }} />

      {/* Floating particles */}
      {[...Array(30)].map((_, i) => (
        <div
          key={i}
          style={{
            position: "fixed",
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${2 + Math.random() * 4}px`,
            height: `${2 + Math.random() * 4}px`,
            background: `hsl(${250 + Math.random() * 80}, 80%, 60%)`,
            borderRadius: "50%",
            opacity: 0.6,
            animation: `float ${8 + Math.random() * 10}s ease-in-out infinite ${Math.random() * 5}s`,
            zIndex: 0,
            filter: "blur(1px)"
          }}
        />
      ))}

      {/* Main Content */}
      <div style={{ position: "relative", zIndex: 10, maxWidth: "1400px", margin: "0 auto", padding: "80px 24px" }}>
        
        {/* Hero Section */}
        <div style={{ textAlign: "center", marginBottom: "100px" }}>
          {/* Champion Badge */}
          <div className="fadeIn" style={{ marginBottom: "40px", animationDelay: "0.2s" }}>
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "16px",
              padding: "16px 40px",
              borderRadius: "100px",
              background: "linear-gradient(135deg, rgba(251,191,36,0.2), rgba(249,115,22,0.1))",
              border: "2px solid rgba(251,191,36,0.5)",
              boxShadow: "0 20px 60px rgba(251,191,36,0.3), inset 0 1px 0 rgba(255,255,255,0.1)"
            }}>
              <Trophy className="glow" size={32} color="#fbbf24" />
              <span style={{
                fontSize: "1.1rem",
                fontWeight: 900,
                letterSpacing: "0.15em",
                background: "linear-gradient(90deg, #fef08a, #fbbf24, #f59e0b)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
                backgroundSize: "200%",
                animation: "gradient 3s ease infinite"
              }}>
                NATIONAL CHAMPION 2024
              </span>
              <Crown className="pulse" size={28} color="#fde047" />
            </div>
          </div>

          {/* Main Title */}
          <h1 className="fadeIn" style={{
            fontSize: "clamp(3rem, 10vw, 7rem)",
            fontWeight: 900,
            lineHeight: 0.9,
            background: "linear-gradient(135deg, #06b6d4 0%, #8b5cf6 50%, #ec4899 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
            marginBottom: "24px",
            filter: "drop-shadow(0 0 60px rgba(139,92,246,0.5))",
            backgroundSize: "200%",
            animation: "gradient 4s ease infinite",
            animationDelay: "0.4s"
          }}>
            Brainovision
          </h1>

          <div className="fadeIn" style={{
            fontSize: "clamp(1.5rem, 4vw, 3rem)",
            fontWeight: 800,
            background: "linear-gradient(90deg, #06b6d4, #8b5cf6)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
            marginBottom: "16px",
            letterSpacing: "0.1em",
            animationDelay: "0.6s"
          }}>
            TALENT HUNT 2024
          </div>

          <div className="fadeIn" style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "12px 28px",
            background: "rgba(16,185,129,0.15)",
            border: "2px solid rgba(16,185,129,0.4)",
            borderRadius: "12px",
            color: "#34d399",
            fontSize: "1.1rem",
            fontWeight: 700,
            marginBottom: "32px",
            animationDelay: "0.8s"
          }}>
            <Star size={20} />
            FIRST PLACE WINNER
          </div>

          <p className="fadeIn" style={{
            fontSize: "1.3rem",
            color: "#cbd5e1",
            lineHeight: 1.8,
            maxWidth: "900px",
            margin: "0 auto 60px",
            animationDelay: "1s"
          }}>
            A production-grade <span style={{ color: "#8b5cf6", fontWeight: 700 }}>MERN marketplace</span> featuring 
            JWT authentication, real-time Socket.io chat, and enterprise architecture — 
            conceptualized, built, and deployed in <span style={{ color: "#06b6d4", fontWeight: 700 }}>24 hours</span>
          </p>

          {/* Stats Grid */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
            gap: "24px",
            maxWidth: "800px",
            margin: "0 auto 60px"
          }}>
            {stats.map((stat, i) => (
              <div
                key={i}
                className="fadeIn"
                style={{
                  padding: "32px 20px",
                  borderRadius: "20px",
                  background: "rgba(15,23,42,0.6)",
                  backdropFilter: "blur(20px)",
                  border: `2px solid ${stat.color}40`,
                  boxShadow: `0 10px 40px ${stat.color}20`,
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                  animationDelay: `${1.2 + i * 0.1}s`
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-10px) scale(1.05)";
                  e.currentTarget.style.boxShadow = `0 20px 60px ${stat.color}40`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0) scale(1)";
                  e.currentTarget.style.boxShadow = `0 10px 40px ${stat.color}20`;
                }}
              >
                <stat.icon size={40} color={stat.color} style={{ margin: "0 auto 16px", filter: `drop-shadow(0 0 12px ${stat.color})` }} />
                <div style={{ fontSize: "2.5rem", fontWeight: 900, color: "white", marginBottom: "8px" }}>
                  {stat.value}
                </div>
                <div style={{ color: stat.color, fontSize: "0.9rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  {stat.unit}
                </div>
                <div style={{ color: "#94a3b8", fontSize: "0.85rem", marginTop: "4px" }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div style={{ display: "flex", gap: "20px", justifyContent: "center", flexWrap: "wrap" }}>
            <button
              onClick={() => setModal(true)}
              style={{
                padding: "20px 48px",
                fontSize: "1.15rem",
                fontWeight: 700,
                background: "linear-gradient(135deg, #7c3aed, #8b5cf6, #ec4899)",
                borderRadius: "100px",
                color: "white",
                display: "inline-flex",
                alignItems: "center",
                gap: "12px",
                border: "none",
                cursor: "pointer",
                boxShadow: "0 20px 60px rgba(139,92,246,0.4)",
                position: "relative",
                overflow: "hidden",
                transition: "all 0.3s ease"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px) scale(1.05)";
                e.currentTarget.style.boxShadow = "0 30px 80px rgba(139,92,246,0.6)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0) scale(1)";
                e.currentTarget.style.boxShadow = "0 20px 60px rgba(139,92,246,0.4)";
              }}
            >
              <div style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
                animation: "slide 3s linear infinite"
              }} />
              <Zap size={24} />
              <span>View Timeline</span>
            </button>

            <button
              onClick={handleDownload}
              style={{
                padding: "20px 48px",
                fontSize: "1.15rem",
                fontWeight: 700,
                background: "rgba(255,255,255,0.1)",
                borderRadius: "100px",
                color: "white",
                display: "inline-flex",
                alignItems: "center",
                gap: "12px",
                border: "2px solid rgba(255,255,255,0.2)",
                cursor: "pointer",
                backdropFilter: "blur(10px)",
                transition: "all 0.3s ease"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.background = "rgba(255,255,255,0.15)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.background = "rgba(255,255,255,0.1)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
              }}
            >
              <Download size={24} />
              <span>Certificate</span>
            </button>
          </div>
        </div>

        {/* Certificate Preview */}
        <div style={{ marginBottom: "120px", position: "relative" }}>
          <div style={{
            maxWidth: "900px",
            margin: "0 auto",
            borderRadius: "32px",
            overflow: "hidden",
            position: "relative",
            boxShadow: "0 40px 100px rgba(0,0,0,0.5)"
          }}>
            <div style={{
              position: "absolute",
              inset: -4,
              background: "conic-gradient(from 0deg at 50% 50%, #8b5cf6, #ec4899, #06b6d4, #8b5cf6)",
              borderRadius: "32px",
              animation: "rotate 15s linear infinite",
              zIndex: -1,
              opacity: 0.7
            }} />
            
            <div style={{
              padding: "16px",
              background: "linear-gradient(135deg, #0f172a, #1e293b)",
              borderRadius: "28px"
            }}>
             <img
  src={certificateImage}
  alt="Brainovision Certificate"
  style={{
    width: "100%",
    height: "auto",
    borderRadius: "20px",
    display: "block"
  }}
/>

            </div>

            <div style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
              animation: "slide 4s linear infinite",
              pointerEvents: "none"
            }} />
          </div>
        </div>

        {/* Development Phases */}
        <div>
          <h2 style={{
            fontSize: "clamp(2.5rem, 6vw, 4rem)",
            fontWeight: 900,
            textAlign: "center",
            background: "linear-gradient(135deg, #06b6d4, #8b5cf6, #ec4899)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
            marginBottom: "24px"
          }}>
            24-Hour Development Sprint
          </h2>
          <p style={{
            textAlign: "center",
            color: "#94a3b8",
            fontSize: "1.2rem",
            marginBottom: "80px"
          }}>
            Four intense phases from concept to deployment
          </p>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "32px"
          }}>
            {phases.map((phase, i) => (
              <div
                key={i}
                onClick={() => setActivePhase(i)}
                style={{
                  padding: "40px 32px",
                  borderRadius: "28px",
                  background: activePhase === i 
                    ? `linear-gradient(135deg, ${phase.color}20, rgba(15,23,42,0.8))`
                    : "rgba(15,23,42,0.6)",
                  backdropFilter: "blur(20px)",
                  border: `2px solid ${activePhase === i ? phase.color : 'rgba(139,92,246,0.2)'}`,
                  cursor: "pointer",
                  transition: "all 0.4s ease",
                  position: "relative",
                  overflow: "hidden"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-8px)";
                  e.currentTarget.style.boxShadow = `0 30px 80px ${phase.color}40`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div style={{
                  width: "90px",
                  height: "90px",
                  margin: "0 auto 24px",
                  borderRadius: "24px",
                  background: `${phase.color}30`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: `0 0 60px ${phase.color}50`,
                  border: `2px solid ${phase.color}60`,
                  transition: "all 0.3s ease"
                }}>
                  <phase.icon size={48} color={phase.color} />
                </div>

                <div style={{
                  textAlign: "center",
                  color: phase.color,
                  fontWeight: 900,
                  fontSize: "1.1rem",
                  marginBottom: "12px",
                  letterSpacing: "0.1em"
                }}>
                  {phase.hour}
                </div>

                <h3 style={{
                  fontSize: "2rem",
                  fontWeight: 900,
                  color: "white",
                  marginBottom: "16px",
                  textAlign: "center"
                }}>
                  {phase.title}
                </h3>

                <p style={{
                  color: "#cbd5e1",
                  lineHeight: 1.7,
                  fontSize: "1.05rem",
                  marginBottom: "24px",
                  textAlign: "center"
                }}>
                  {phase.desc}
                </p>

                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  {phase.achievements.map((achievement, idx) => (
                    <div key={idx} style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      padding: "12px 16px",
                      background: "rgba(255,255,255,0.05)",
                      borderRadius: "12px",
                      border: "1px solid rgba(255,255,255,0.1)"
                    }}>
                      <CheckCircle size={18} color={phase.color} />
                      <span style={{ color: "#e2e8f0", fontSize: "0.95rem" }}>{achievement}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack */}
        <div style={{ marginTop: "120px" }}>
          <h3 style={{
            fontSize: "2.5rem",
            fontWeight: 900,
            textAlign: "center",
            color: "white",
            marginBottom: "60px"
          }}>
            <Cpu size={40} style={{ display: "inline", marginRight: "16px", color: "#8b5cf6" }} />
            Technology Stack
          </h3>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "24px",
            maxWidth: "1000px",
            margin: "0 auto"
          }}>
            {techStack.map((tech, i) => (
              <div
                key={i}
                style={{
                  padding: "32px 24px",
                  borderRadius: "20px",
                  background: "rgba(15,23,42,0.6)",
                  backdropFilter: "blur(20px)",
                  border: `2px solid ${tech.color}30`,
                  textAlign: "center",
                  transition: "all 0.3s ease",
                  cursor: "pointer"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-8px) rotate(2deg)";
                  e.currentTarget.style.boxShadow = `0 20px 60px ${tech.color}40`;
                  e.currentTarget.style.borderColor = tech.color;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0) rotate(0deg)";
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.borderColor = `${tech.color}30`;
                }}
              >
                <tech.icon size={48} color={tech.color} style={{ margin: "0 auto 16px", filter: `drop-shadow(0 0 12px ${tech.color})` }} />
                <div style={{
                  fontSize: "1.4rem",
                  fontWeight: 800,
                  color: "white",
                  marginBottom: "8px"
                }}>
                  {tech.name}
                </div>
                <div style={{ color: "#94a3b8", fontSize: "0.9rem" }}>
                  {tech.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Timeline Modal */}
      {modal && (
        <div
          onClick={() => setModal(false)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 1000,
            background: "rgba(0,0,0,0.95)",
            backdropFilter: "blur(40px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "24px",
            animation: "fadeIn 0.3s ease-out"
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: "1000px",
              width: "100%",
              background: "rgba(15,23,42,0.95)",
              backdropFilter: "blur(50px)",
              borderRadius: "32px",
              padding: "60px",
              border: "2px solid rgba(139,92,246,0.4)",
              boxShadow: "0 50px 100px rgba(0,0,0,0.9)",
              maxHeight: "90vh",
              overflowY: "auto",
              position: "relative"
            }}
          >
            <button
              onClick={() => setModal(false)}
              style={{
                position: "absolute",
                top: "24px",
                right: "24px",
                width: "48px",
                height: "48px",
                borderRadius: "12px",
                background: "rgba(255,255,255,0.1)",
                border: "1px solid rgba(255,255,255,0.2)",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition: "all 0.3s ease"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.2)";
                e.currentTarget.style.transform = "rotate(90deg)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.1)";
                e.currentTarget.style.transform = "rotate(0deg)";
              }}
            >
              <X size={24} />
            </button>

            <h2 style={{
              fontSize: "3rem",
              fontWeight: 900,
              background: "linear-gradient(135deg, #8b5cf6, #ec4899)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
              textAlign: "center",
              marginBottom: "60px"
            }}>
              Complete Development Timeline
            </h2>

            {phases.map((phase, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  gap: "32px",
                  padding: "36px",
                  background: "rgba(255,255,255,0.05)",
                  borderRadius: "24px",
                  border: `2px solid ${phase.color}40`,
                  marginBottom: "32px",
                  transition: "all 0.3s ease"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateX(8px)";
                  e.currentTarget.style.boxShadow = `0 20px 60px ${phase.color}40`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateX(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div style={{
                  width: "100px",
                  height: "100px",
                  borderRadius: "24px",
                  background: `${phase.color}30`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: `0 0 60px ${phase.color}50`,
                  border: `2px solid ${phase.color}60`
                }}>
                  <phase.icon size={48} color={phase.color} />
                </div>
                <div>
                  <div style={{
                    fontSize: "1.2rem",
                    fontWeight: 700,
                    color: phase.color,
                    marginBottom: "8px",
                    letterSpacing: "0.1em"
                  }}>
                    {phase.hour}
                  </div>  
                  <h3 style={{
                    fontSize: "2rem",
                    fontWeight: 900,
                    color: "white",
                    marginBottom: "16px"
                  }}>
                    {phase.title}
                  </h3>
                  <p style={{
                    color: "#cbd5e1",
                    lineHeight: 1.7,
                    fontSize: "1.05rem",
                    marginBottom: "16px"
                  }}>
                    {phase.desc}
                  </p>
                  <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    {phase.achievements.map((achievement, idx) => (
                      <div key={idx} style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",  
                        padding: "12px 16px",
                        background: "rgba(255,255,255,0.05)",
                        borderRadius: "12px", 
                        border: "1px solid rgba(255,255,255,0.1)" 
                      }}>
                        <CheckCircle size={18} color={phase.color} />
                        <span style={{ color: "#e2e8f0", fontSize: "0.95rem" }}>{achievement}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}