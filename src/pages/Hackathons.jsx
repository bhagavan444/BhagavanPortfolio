import { 
  Trophy, Award, X, Code, Database, Shield, Rocket, Crown, 
  Clock, Users, Sparkles, Zap, Star, Flame, Target, Cpu, GitBranch, Download,
  TrendingUp, Layers, Box, CheckCircle, ArrowRight, Hexagon, Terminal, Server, Lock
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import certificateImage from "../assets/images/Brainovision-certificate.jpg";

export default function HackathonShowcase() {
  const [modal, setModal] = useState(false);
  const [activePhase, setActivePhase] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [scrollY, setScrollY] = useState(0);
  const containerRef = useRef(null);

  const phases = [
    { 
      hour: "0-6h", 
      icon: Terminal, 
      title: "Foundation Sprint", 
      desc: "System architecture design, MongoDB schema modeling, JWT authentication core, project scaffolding, RESTful API structure planning",
      color: "#06b6d4",
      achievements: ["Database Schema Design", "Auth System Core", "API Architecture", "Environment Setup"]
    },
    { 
      hour: "6-14h", 
      icon: Code, 
      title: "Core Development", 
      desc: "RESTful API endpoints implementation, React component library, state management architecture, routing system, real-time features integration foundation",
      color: "#8b5cf6",
      achievements: ["15+ API Endpoints", "UI Component Library", "State Management", "Routing System"]
    },
    { 
      hour: "14-20h", 
      icon: Zap, 
      title: "Integration Phase", 
      desc: "Socket.io real-time chat implementation, security hardening, comprehensive error handling, data validation layers, middleware integration",
      color: "#ec4899",
      achievements: ["Real-time Chat System", "Security Hardening", "Error Handling", "Data Validation"]
    },
    { 
      hour: "20-24h", 
      icon: Rocket, 
      title: "Launch Sequence", 
      desc: "Production optimization, comprehensive testing suite, performance tuning, demo preparation, cloud deployment pipeline, final documentation",
      color: "#10b981",
      achievements: ["Testing Suite", "Cloud Deployment", "Performance Optimization", "Documentation"]
    }
  ];

  const techStack = [
    { icon: Database, name: "MongoDB", desc: "NoSQL Database", color: "#10b981" },
    { icon: Server, name: "Express.js", desc: "Backend Framework", color: "#06b6d4" },
    { icon: Sparkles, name: "React", desc: "UI Library", color: "#8b5cf6" },
    { icon: Hexagon, name: "Node.js", desc: "Runtime Environment", color: "#ec4899" },
    { icon: Lock, name: "JWT", desc: "Authentication", color: "#f59e0b" },
    { icon: Zap, name: "Socket.io", desc: "Real-time Engine", color: "#3b82f6" }
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

    const interval = setInterval(() => {
      setActivePhase(prev => (prev + 1) % phases.length);
    }, 5000);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMove);
      clearInterval(interval);
    };
  }, [phases.length]);

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
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        position: "relative",
        overflow: "hidden"
      }}
    >
      <style>{`
        @keyframes floatSlow { 0%, 100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-25px) rotate(3deg); } }
        @keyframes glow { 0%, 100% { filter: drop-shadow(0 0 25px currentColor); } 50% { filter: drop-shadow(0 0 50px currentColor); } }
        @keyframes shimmer { 0% { backgroundPosition: -100% 0; } 100% { backgroundPosition: 200% 0; } }
        @keyframes pulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.85; transform: scale(1.08); } }
        @keyframes rotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes gradient { 0%, 100% { backgroundPosition: 0% 50%; } 50% { backgroundPosition: 100% 50%; } }
        @keyframes slideRight { from { transform: translateX(-100%); } to { transform: translateX(100%); } }
        @keyframes scaleIn { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }
        .float { animation: floatSlow 8s ease-in-out infinite; }
        .glow { animation: glow 3s ease-in-out infinite; }
        .pulse { animation: pulse 4s ease-in-out infinite; }
        .rotate { animation: rotate 25s linear infinite; }
        .fadeInUp { animation: fadeInUp 1s ease-out forwards; opacity: 0; }
      `}</style>

      {/* Dynamic Background Gradient */}
      <div style={{
        position: "fixed",
        inset: 0,
        background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(139,92,246,0.18), transparent 60%)`,
        transition: "background 0.4s ease",
        zIndex: 0
      }} />
      
      {/* Grid Pattern */}
      <div style={{
        position: "fixed",
        inset: 0,
        backgroundImage: `
          linear-gradient(rgba(139,92,246,0.04) 1.5px, transparent 1.5px),
          linear-gradient(90deg, rgba(139,92,246,0.04) 1.5px, transparent 1.5px)
        `,
        backgroundSize: "80px 80px",
        transform: `translateY(${scrollY * 0.3}px)`,
        zIndex: 0
      }} />

      {/* Ambient Particles */}
      {[...Array(40)].map((_, i) => (
        <div
          key={i}
          style={{
            position: "fixed",
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${3 + Math.random() * 5}px`,
            height: `${3 + Math.random() * 5}px`,
            background: `hsl(${260 + Math.random() * 60}, 85%, 65%)`,
            borderRadius: "50%",
            opacity: 0.5,
            animation: `floatSlow ${10 + Math.random() * 15}s ease-in-out infinite ${Math.random() * 8}s`,
            zIndex: 0,
            filter: "blur(1.5px)",
            boxShadow: `0 0 ${8 + Math.random() * 12}px currentColor`
          }}
        />
      ))}

      {/* Main Content Container */}
      <div style={{ position: "relative", zIndex: 10, maxWidth: "1500px", margin: "0 auto", padding: "100px 32px" }}>
        
        {/* Hero Section */}
        <div style={{ textAlign: "center", marginBottom: "140px" }}>
          
          {/* Champion Badge */}
          <div className="fadeInUp" style={{ marginBottom: "50px", animationDelay: "0.1s" }}>
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "20px",
              padding: "20px 50px",
              borderRadius: "100px",
              background: "linear-gradient(135deg, rgba(251,191,36,0.25), rgba(249,115,22,0.15))",
              border: "2.5px solid rgba(251,191,36,0.6)",
              boxShadow: "0 25px 70px rgba(251,191,36,0.35), inset 0 1px 0 rgba(255,255,255,0.15)"
            }}>
              <Trophy className="glow" size={38} color="#fbbf24" />
              <span style={{
                fontSize: "1.2rem",
                fontWeight: 900,
                letterSpacing: "0.18em",
                background: "linear-gradient(90deg, #fef08a, #fbbf24, #f59e0b)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
                backgroundSize: "200%",
                animation: "gradient 4s ease infinite"
              }}>
                NATIONAL CHAMPION 2024
              </span>
              <Crown className="pulse" size={34} color="#fde047" />
            </div>
          </div>

          {/* Main Title */}
          <h1 className="fadeInUp" style={{
            fontSize: "clamp(3.5rem, 12vw, 8rem)",
            fontWeight: 900,
            lineHeight: 0.95,
            background: "linear-gradient(135deg, #06b6d4 0%, #8b5cf6 45%, #ec4899 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
            marginBottom: "30px",
            filter: "drop-shadow(0 0 80px rgba(139,92,246,0.6))",
            backgroundSize: "200%",
            animation: "gradient 5s ease infinite",
            animationDelay: "0.3s",
            letterSpacing: "-0.02em"
          }}>
            Brainovision
          </h1>

          <div className="fadeInUp" style={{
            fontSize: "clamp(1.6rem, 5vw, 3.2rem)",
            fontWeight: 800,
            background: "linear-gradient(90deg, #06b6d4, #8b5cf6)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
            marginBottom: "24px",
            letterSpacing: "0.12em",
            animationDelay: "0.5s"
          }}>
            TALENT HUNT 2024
          </div>

          <div className="fadeInUp" style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "10px",
            padding: "14px 34px",
            background: "rgba(16,185,129,0.18)",
            border: "2.5px solid rgba(16,185,129,0.5)",
            borderRadius: "14px",
            color: "#34d399",
            fontSize: "1.15rem",
            fontWeight: 700,
            marginBottom: "40px",
            animationDelay: "0.7s",
            boxShadow: "0 10px 30px rgba(16,185,129,0.2)"
          }}>
            <Star size={22} />
            FIRST PLACE WINNER
          </div>

          <p className="fadeInUp" style={{
            fontSize: "1.35rem",
            color: "#cbd5e1",
            lineHeight: 1.85,
            maxWidth: "950px",
            margin: "0 auto 80px",
            animationDelay: "0.9s",
            fontWeight: 400
          }}>
            A production-grade <span style={{ color: "#8b5cf6", fontWeight: 700 }}>MERN marketplace</span> featuring 
            JWT authentication, real-time Socket.io chat, and enterprise architecture — 
            conceptualized, built, and deployed in <span style={{ color: "#06b6d4", fontWeight: 700 }}>24 hours</span>
          </p>

          {/* Stats Grid */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            gap: "28px",
            maxWidth: "900px",
            margin: "0 auto 80px"
          }}>
            {stats.map((stat, i) => (
              <div
                key={i}
                className="fadeInUp"
                style={{
                  padding: "40px 24px",
                  borderRadius: "24px",
                  background: "rgba(15,23,42,0.7)",
                  backdropFilter: "blur(30px)",
                  border: `2.5px solid ${stat.color}50`,
                  boxShadow: `0 15px 50px ${stat.color}25`,
                  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                  cursor: "pointer",
                  animationDelay: `${1.1 + i * 0.15}s`
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-12px) scale(1.06)";
                  e.currentTarget.style.boxShadow = `0 25px 70px ${stat.color}45`;
                  e.currentTarget.style.borderColor = stat.color;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0) scale(1)";
                  e.currentTarget.style.boxShadow = `0 15px 50px ${stat.color}25`;
                  e.currentTarget.style.borderColor = `${stat.color}50`;
                }}
              >
                <stat.icon size={46} color={stat.color} style={{ margin: "0 auto 20px", filter: `drop-shadow(0 0 16px ${stat.color})` }} />
                <div style={{ fontSize: "3rem", fontWeight: 900, color: "white", marginBottom: "10px", letterSpacing: "-0.02em" }}>
                  {stat.value}
                </div>
                <div style={{ color: stat.color, fontSize: "0.95rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                  {stat.unit}
                </div>
                <div style={{ color: "#94a3b8", fontSize: "0.88rem", marginTop: "6px" }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div style={{ display: "flex", gap: "24px", justifyContent: "center", flexWrap: "wrap" }}>
            <button
              onClick={() => setModal(true)}
              style={{
                padding: "22px 54px",
                fontSize: "1.18rem",
                fontWeight: 700,
                background: "linear-gradient(135deg, #7c3aed, #8b5cf6, #ec4899)",
                borderRadius: "100px",
                color: "white",
                display: "inline-flex",
                alignItems: "center",
                gap: "14px",
                border: "none",
                cursor: "pointer",
                boxShadow: "0 25px 70px rgba(139,92,246,0.5)",
                position: "relative",
                overflow: "hidden",
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-5px) scale(1.06)";
                e.currentTarget.style.boxShadow = "0 35px 90px rgba(139,92,246,0.65)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0) scale(1)";
                e.currentTarget.style.boxShadow = "0 25px 70px rgba(139,92,246,0.5)";
              }}
            >
              <div style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent)",
                animation: "slideRight 3.5s linear infinite"
              }} />
              <Zap size={26} />
              <span style={{ position: "relative", zIndex: 1 }}>View Timeline</span>
            </button>

            <button
              onClick={handleDownload}
              style={{
                padding: "22px 54px",
                fontSize: "1.18rem",
                fontWeight: 700,
                background: "rgba(255,255,255,0.12)",
                borderRadius: "100px",
                color: "white",
                display: "inline-flex",
                alignItems: "center",
                gap: "14px",
                border: "2.5px solid rgba(255,255,255,0.25)",
                cursor: "pointer",
                backdropFilter: "blur(20px)",
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.background = "rgba(255,255,255,0.18)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.45)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.background = "rgba(255,255,255,0.12)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)";
              }}
            >
              <Download size={26} />
              <span>Certificate</span>
            </button>
          </div>
        </div>

        {/* Certificate Showcase */}
        <div style={{ marginBottom: "160px", position: "relative" }}>
          <div style={{
            maxWidth: "1000px",
            margin: "0 auto",
            borderRadius: "36px",
            overflow: "hidden",
            position: "relative",
            boxShadow: "0 50px 120px rgba(0,0,0,0.6)"
          }}>
            <div style={{
              position: "absolute",
              inset: -5,
              background: "conic-gradient(from 0deg at 50% 50%, #8b5cf6, #ec4899, #06b6d4, #8b5cf6)",
              borderRadius: "36px",
              animation: "rotate 18s linear infinite",
              zIndex: -1,
              opacity: 0.8
            }} />
            
            <div style={{
              padding: "20px",
              background: "linear-gradient(135deg, #0f172a, #1e293b)",
              borderRadius: "32px"
            }}>
              <img
                src={certificateImage}
                alt="Brainovision National Championship Certificate"
                style={{
                  width: "100%",
                  height: "auto",
                  borderRadius: "24px",
                  display: "block"
                }}
              />
            </div>

            <div style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)",
              animation: "slideRight 5s linear infinite",
              pointerEvents: "none"
            }} />
          </div>
        </div>

        {/* Development Timeline */}
        <div>
          <h2 style={{
            fontSize: "clamp(2.8rem, 7vw, 4.5rem)",
            fontWeight: 900,
            textAlign: "center",
            background: "linear-gradient(135deg, #06b6d4, #8b5cf6, #ec4899)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
            marginBottom: "30px",
            letterSpacing: "-0.02em"
          }}>
            24-Hour Development Sprint
          </h2>
          <p style={{
            textAlign: "center",
            color: "#94a3b8",
            fontSize: "1.25rem",
            marginBottom: "100px",
            fontWeight: 400
          }}>
            Four intense phases from concept to deployment
          </p>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "40px"
          }}>
            {phases.map((phase, i) => (
              <div
                key={i}
                onClick={() => setActivePhase(i)}
                style={{
                  padding: "48px 38px",
                  borderRadius: "32px",
                  background: activePhase === i 
                    ? `linear-gradient(135deg, ${phase.color}25, rgba(15,23,42,0.85))`
                    : "rgba(15,23,42,0.7)",
                  backdropFilter: "blur(30px)",
                  border: `2.5px solid ${activePhase === i ? phase.color : 'rgba(139,92,246,0.25)'}`,
                  cursor: "pointer",
                  transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                  position: "relative",
                  overflow: "hidden"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-10px)";
                  e.currentTarget.style.boxShadow = `0 35px 90px ${phase.color}50`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div style={{
                  width: "100px",
                  height: "100px",
                  margin: "0 auto 28px",
                  borderRadius: "28px",
                  background: `${phase.color}35`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: `0 0 70px ${phase.color}60`,
                  border: `2.5px solid ${phase.color}70`,
                  transition: "all 0.4s ease"
                }}>
                  <phase.icon size={52} color={phase.color} />
                </div>

                <div style={{
                  textAlign: "center",
                  color: phase.color,
                  fontWeight: 900,
                  fontSize: "1.15rem",
                  marginBottom: "14px",
                  letterSpacing: "0.12em"
                }}>
                  {phase.hour}
                </div>

                <h3 style={{
                  fontSize: "2.2rem",
                  fontWeight: 900,
                  color: "white",
                  marginBottom: "20px",
                  textAlign: "center",
                  letterSpacing: "-0.01em"
                }}>
                  {phase.title}
                </h3>

                <p style={{
                  color: "#cbd5e1",
                  lineHeight: 1.75,
                  fontSize: "1.08rem",
                  marginBottom: "28px",
                  textAlign: "center",
                  fontWeight: 400
                }}>
                  {phase.desc}
                </p>

                <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                  {phase.achievements.map((achievement, idx) => (
                    <div key={idx} style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "14px",
                      padding: "14px 18px",
                      background: "rgba(255,255,255,0.06)",
                      borderRadius: "14px",
                      border: "1.5px solid rgba(255,255,255,0.12)"
                    }}>
                      <CheckCircle size={20} color={phase.color} />
                      <span style={{ color: "#e2e8f0", fontSize: "0.98rem" }}>{achievement}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Technology Stack */}
        <div style={{ marginTop: "160px" }}>
          <h3 style={{
            fontSize: "2.8rem",
            fontWeight: 900,
            textAlign: "center",
            color: "white",
            marginBottom: "80px",
            letterSpacing: "-0.01em"
          }}>
            <Cpu size={44} style={{ display: "inline", marginRight: "18px", color: "#8b5cf6", verticalAlign: "middle" }} />
            Technology Stack
          </h3>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "30px",
            maxWidth: "1100px",
            margin: "0 auto"
          }}>
            {techStack.map((tech, i) => (
              <div
                key={i}
                style={{
                  padding: "38px 28px",
                  borderRadius: "24px",
                  background: "rgba(15,23,42,0.7)",
                  backdropFilter: "blur(30px)",
                  border: `2.5px solid ${tech.color}35`,
                  textAlign: "center",
                  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                  cursor: "pointer"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-10px) rotate(2deg)";
                  e.currentTarget.style.boxShadow = `0 25px 70px ${tech.color}45`;
                  e.currentTarget.style.borderColor = tech.color;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0) rotate(0deg)";
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.borderColor = `${tech.color}35`;
                }}
              >
                <tech.icon size={52} color={tech.color} style={{ margin: "0 auto 20px", filter: `drop-shadow(0 0 16px ${tech.color})` }} />
                <div style={{
                  fontSize: "1.5rem",
                  fontWeight: 800,
                  color: "white",
                  marginBottom: "10px",
                  letterSpacing: "-0.01em"
                }}>
                  {tech.name}
                </div>
                <div style={{ color: "#94a3b8", fontSize: "0.95rem" }}>
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
            background: "rgba(0,0,0,0.96)",
            backdropFilter: "blur(50px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "32px",
            animation: "scaleIn 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: "1100px",
              width: "100%",
              background: "rgba(15,23,42,0.96)",
              backdropFilter: "blur(60px)",
              borderRadius: "40px",
              padding: "70px",
              border: "2.5px solid rgba(139,92,246,0.5)",
              boxShadow: "0 60px 120px rgba(0,0,0,0.95)",
              maxHeight: "90vh",
              overflowY: "auto",
              position: "relative"
            }}
          >
            <button
              onClick={() => setModal(false)}
              style={{
                position: "absolute",
                top: "30px",
                right: "30px",
                width: "52px",
                height: "52px",
                borderRadius: "14px",
                background: "rgba(255,255,255,0.12)",
                border: "2px solid rgba(255,255,255,0.25)",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.2)";
                e.currentTarget.style.transform = "rotate(90deg)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.12)";
                e.currentTarget.style.transform = "rotate(0deg)";
              }}
            >
              <X size={26} />
              </button>

        <h2 style={{
          fontSize: "3.5rem",
          fontWeight: 900,
          background: "linear-gradient(135deg, #8b5cf6, #ec4899)",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
          textAlign: "center",
          marginBottom: "70px",
          letterSpacing: "-0.02em"
        }}>
          Complete Development Timeline
        </h2>

        {phases.map((phase, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              gap: "40px",
              padding: "42px",
              background: "rgba(255,255,255,0.06)",
              borderRadius: "28px",
              border: `2.5px solid ${phase.color}45`,
              marginBottom: "38px",
              transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateX(10px)";
              e.currentTarget.style.boxShadow = `0 25px 70px ${phase.color}45`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateX(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <div style={{
              width: "110px",
              height: "110px",
              borderRadius: "28px",
              background: `${phase.color}35`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: `0 0 70px ${phase.color}60`,
              border: `2.5px solid ${phase.color}70`,
              flexShrink: 0
            }}>
              <phase.icon size={54} color={phase.color} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{
                fontSize: "1.25rem",
                fontWeight: 700,
                color: phase.color,
                marginBottom: "10px",
                letterSpacing: "0.12em"
              }}>
                {phase.hour}
              </div>  
              <h3 style={{
                fontSize: "2.2rem",
                fontWeight: 900,
                color: "white",
                marginBottom: "18px",
                letterSpacing: "-0.01em"
              }}>
                {phase.title}
              </h3>
              <p style={{
                color: "#cbd5e1",
                lineHeight: 1.75,
                fontSize: "1.08rem",
                marginBottom: "20px",
                fontWeight: 400
              }}>
                {phase.desc}
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                {phase.achievements.map((achievement, idx) => (
                  <div key={idx} style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "14px",  
                    padding: "14px 18px",
                    background: "rgba(255,255,255,0.06)",
                    borderRadius: "14px", 
                    border: "1.5px solid rgba(255,255,255,0.12)" 
                  }}>
                    <CheckCircle size={20} color={phase.color} />
                    <span style={{ color: "#e2e8f0", fontSize: "0.98rem" }}>{achievement}</span>
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