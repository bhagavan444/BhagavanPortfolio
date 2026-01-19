// Projects.jsx – FINAL PREMIUM VERSION (1000+ lines)
// Cinematic • Animated • Modal details • Mouse tracking • Floating orbs • Perfect 2026 portfolio style

import { useState, useEffect, useRef } from "react";
import {
  Eye,
  Github,
  Rocket,
  Star,
  X,
  Sparkles,
  Code,
  Zap,
  ExternalLink,
  Award,
  BrainCircuit,
  Cpu,
  Database,
  GitBranch,
  Terminal,
  Lightbulb,
  CheckCircle,
  TrendingUp,
  Globe,
  Layers,
  Share2
} from "lucide-react";

// Your real projects data (updated with better descriptions & structure)
const projects = [
  {
    title: "ATS Resume Builder",
    github: "https://github.com/bhagavan444/Resumebuilderwebapp",
    live: null,
    desc: "Full-stack ATS-optimized resume builder with smart templates, keyword scoring, ATS compatibility checker, PDF/Word export, and beautiful modern designs.",
    longDesc: "Built to help candidates beat Applicant Tracking Systems. Features real-time ATS score, keyword optimization suggestions, multiple professional templates, dark/light mode, drag & drop sections, and instant preview.",
    tags: ["React", "Node.js", "MongoDB", "JWT", "PDFKit"],
    icon: "📄",
    img: "https://drive.google.com/thumbnail?id=1ngApn37ig05YDXxCbA5mppeva_opwcUs&sz=w1200",
    color: "#8B5CF6",
    featured: true,
    highlights: ["Real-time ATS Scoring", "Keyword Optimization", "Multiple Templates", "Drag & Drop Editor", "Dark/Light Mode"]
  },
  {
    title: "AI Chatbot Platform",
    github: "https://github.com/bhagavan444/chatbotwebapp",
    live: "https://bhagavanai.lovable.app",
    desc: "Advanced real-time AI chatbot with streaming responses, conversation memory, context-aware replies, markdown support, and beautiful UI.",
    longDesc: "Powered by modern AI models with persistent memory across sessions, streaming responses, code highlighting, file upload support, theme customization, and responsive design for all devices.",
    tags: ["AI", "Python", "React", "Flask", "Streaming"],
    icon: "🤖",
    img: "https://drive.google.com/thumbnail?id=10gvXlgHCb__NAWBoLEbj6LglL9dT6Kew&sz=w1200",
    color: "#06B6D4",
    featured: true,
    highlights: ["Streaming Responses", "Conversation Memory", "Markdown Support", "Code Highlighting", "Multi-theme UI"]
  },
  {
    title: "Career Path AI",
    github: "https://github.com/bhagavan444/carrer-path-web-",
    live: null,
    desc: "Machine Learning-powered career recommendation system that analyzes user skills, interests, personality, and market trends to suggest optimal career paths.",
    longDesc: "Uses advanced ML models to match user profile with thousands of job roles, provides detailed career roadmap, required skills gap analysis, learning resources, and salary expectations.",
    tags: ["ML", "Python", "Flask", "Career", "Recommendation"],
    icon: "🎯",
    img: "https://drive.google.com/thumbnail?id=1pTnIysNCQgb3oHPOyofDKVkAe_acI2Bj&sz=w1200",
    color: "#F59E0B"
  },
  {
    title: "Fake News Detector",
    github: "https://github.com/bhagavan444/News-detector",
    live: null,
    desc: "Sophisticated NLP-based fake news detection system using TF-IDF, LSTM, and ensemble methods with 92%+ accuracy on real-world datasets.",
    longDesc: "Trained on large verified news datasets, provides confidence scores, key phrase highlighting, source credibility check, and detailed explanation of detection.",
    tags: ["NLP", "TensorFlow", "Python", "LSTM", "Fake News"],
    icon: "📰",
    img: "https://drive.google.com/thumbnail?id=1i-qZCMDiOAy677h3y12es5xM_IL-_oOF&sz=w1200",
    color: "#10B981"
  },
  {
    title: "AI Architecture Generator",
    github: null,
    live: "https://archmind-spark.lovable.app",
    desc: "Revolutionary AI tool that generates complete system architectures, tech stack recommendations, database schemas, and API designs from natural language descriptions.",
    longDesc: "Understands complex requirements and produces professional architecture diagrams, component breakdowns, scalability considerations, security patterns, and deployment strategies.",
    tags: ["AI", "Architecture", "React", "System Design"],
    icon: "🧠",
    img: "https://drive.google.com/thumbnail?id=15dAzqZOC60zlje-DevzjWLFH4lIf5L0E&sz=w1200",
    color: "#8B5CF6",
    featured: true
  },
  {
    title: "NeuralLearn – AI EdTech Platform",
    github: null,
    live: "https://neurallearn.lovable.app",
    desc: "Next-generation AI-powered learning platform with personalized learning paths, adaptive difficulty, smart recommendations, and progress analytics.",
    longDesc: "Uses reinforcement learning to adapt content difficulty, predicts knowledge gaps, recommends optimal study sequences, and provides detailed performance insights.",
    tags: ["AI", "EdTech", "React", "Personalization"],
    icon: "📚",
    img: "https://drive.google.com/thumbnail?id=1jxmO9h3FbnKDYAiN9mWXpfR--cN8YF2O&sz=w1200",
    color: "#EC4899",
    featured: true
  }
];

export default function PremiumProjectsShowcase() {
  const [modal, setModal] = useState(null);
  const [hover, setHover] = useState(null);
  const [visible, setVisible] = useState(false);
  const [filterTag, setFilterTag] = useState("All");
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [scrollY, setScrollY] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    setTimeout(() => setVisible(true), 300);

    const handleMove = (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setMousePos({
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100
      });
    };

    const handleScroll = () => setScrollY(window.scrollY);

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const allTags = ["All", ...new Set(projects.flatMap(p => p.tags))];
  const filtered = filterTag === "All" ? projects : projects.filter(p => p.tags.includes(filterTag));

  const currentProject = modal !== null ? projects.find(p => p.title === modal) : null;

  return (
    <div
      ref={containerRef}
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0a001a 0%, #001433 50%, #0a0028 100%)",
        color: "#ffffff",
        position: "relative",
        overflow: "hidden",
        padding: "clamp(80px, 12vh, 140px) clamp(20px, 5vw, 60px)"
      }}
    >
      <style>{`
        @keyframes floatProject { 0%, 100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-20px) rotate(4deg); } }
        @keyframes glowPulse { 0%, 100% { opacity: 0.5; } 50% { opacity: 0.9; } }
        @keyframes slideIn { from { opacity: 0; transform: translateY(60px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes rotateGlow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes shimmerEffect { 0% { transform: translateX(-150%); } 100% { transform: translateX(150%); } }
        @keyframes statPulse { 0%, 100% { transform: scale(1); box-shadow: 0 5px 20px rgba(139,92,246,0.3); } 50% { transform: scale(1.06); box-shadow: 0 15px 50px rgba(139,92,246,0.6); } }
        @keyframes checkAppear { from { opacity: 0; transform: scale(0.6) translateY(15px); } to { opacity: 1; transform: scale(1) translateY(0); } }
      `}</style>

      {/* Background Effects */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
        {/* Mouse-following orb */}
        <div style={{
          position: "absolute",
          width: "800px",
          height: "800px",
          top: `${mousePos.y - 50}%`,
          left: `${mousePos.x - 50}%`,
          background: "radial-gradient(circle, rgba(139,92,246,0.25), transparent 60%)",
          filter: "blur(100px)",
          transform: "translate(-50%, -50%)",
          transition: "all 0.6s ease-out"
        }} />

        {/* Secondary orbs */}
        <div style={{
          position: "absolute",
          width: "600px",
          height: "600px",
          bottom: "10%",
          right: "15%",
          background: "radial-gradient(circle, rgba(6,182,212,0.18), transparent 70%)",
          filter: "blur(90px)",
          animation: "floatProject 22s ease-in-out infinite"
        }} />

        {/* Grid */}
        <div style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `linear-gradient(rgba(139,92,246,0.08) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(139,92,246,0.08) 1px, transparent 1px)`,
          backgroundSize: "70px 70px",
          opacity: 0.25,
          transform: `translateY(${scrollY * 0.25}px)`
        }} />

        {/* Particles */}
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              width: `${4 + Math.random() * 8}px`,
              height: `${4 + Math.random() * 8}px`,
              background: "rgba(139,92,246,0.6)",
              borderRadius: "50%",
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `floatProject ${12 + Math.random() * 12}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 6}s`,
              boxShadow: "0 0 15px rgba(139,92,246,0.7)"
            }}
          />
        ))}
      </div>

      <div style={{ position: "relative", maxWidth: "1600px", margin: "0 auto", zIndex: 1 }}>
        {/* Header */}
        <div style={{
          textAlign: "center",
          marginBottom: "clamp(60px, 10vh, 100px)",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(-60px)",
          transition: "all 1.4s cubic-bezier(0.34, 1.56, 0.64, 1)"
        }}>
          <div style={{
            fontSize: "clamp(5rem, 15vw, 8rem)",
            marginBottom: "30px",
            animation: "floatProject 5s ease-in-out infinite",
            filter: "drop-shadow(0 0 40px rgba(139,92,246,0.6))"
          }}>
            🚀
          </div>

          <h1 style={{
            fontSize: "clamp(3rem, 10vw, 6.5rem)",
            fontWeight: "900",
            lineHeight: 0.95,
            marginBottom: "25px",
            background: "linear-gradient(90deg, #ffffff, #8B5CF6, #06B6D4, #ffffff)",
            backgroundSize: "200% auto",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
            animation: "shimmerEffect 4s linear infinite"
          }}>
            Project Portfolio
          </h1>

          <p style={{
            fontSize: "clamp(1.1rem, 3vw, 1.5rem)",
            color: "#9ca3af",
            maxWidth: "800px",
            margin: "0 auto 40px",
            lineHeight: 1.6
          }}>
            Cutting-edge <span style={{ color: "#8B5CF6", fontWeight: "700" }}>AI</span> • 
            Full-stack • <span style={{ color: "#06B6D4", fontWeight: "700" }}>Production-ready</span> solutions
          </p>

          {/* Quick Stats */}
          <div style={{
            display: "flex",
            justifyContent: "center",
            gap: "clamp(20px, 5vw, 40px)",
            flexWrap: "wrap",
            marginBottom: "50px"
          }}>
            {[
              { label: "PROJECTS", value: projects.length, color: "#8B5CF6", icon: Code },
              { label: "FEATURED", value: projects.filter(p => p.featured).length, color: "#FBBF24", icon: Star },
              { label: "LIVE DEMOS", value: projects.filter(p => p.live).length, color: "#06B6D4", icon: Rocket }
            ].map((stat, i) => (
              <div
                key={i}
                style={{
                  padding: "clamp(20px, 5vw, 28px) clamp(32px, 7vw, 44px)",
                  background: "rgba(255,255,255,0.03)",
                  backdropFilter: "blur(25px)",
                  borderRadius: "24px",
                  border: `2px solid ${stat.color}30`,
                  animation: `statPulse 3.5s ease-in-out ${i * 0.3}s infinite`,
                  minWidth: "180px"
                }}
              >
                <stat.icon size={40} color={stat.color} style={{ marginBottom: "12px" }} />
                <div style={{
                  fontSize: "clamp(2.4rem, 6vw, 3.4rem)",
                  fontWeight: "900",
                  color: stat.color,
                  marginBottom: "8px"
                }}>
                  {stat.value}
                </div>
                <div style={{
                  fontSize: "clamp(0.9rem, 2vw, 1.1rem)",
                  color: "#9ca3af",
                  fontWeight: "700"
                }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Tag Filter */}
          <div style={{
            display: "flex",
            justifyContent: "center",
            gap: "12px",
            flexWrap: "wrap",
            marginBottom: "30px"
          }}>
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => setFilterTag(tag)}
                style={{
                  padding: "10px 24px",
                  background: filterTag === tag ? `linear-gradient(135deg, ${tag === "All" ? "#8B5CF6" : "#06B6D4"}, ${tag === "All" ? "#06B6D4" : "#8B5CF6"})` : "rgba(255,255,255,0.06)",
                  border: filterTag === tag ? "none" : "2px solid rgba(139,92,246,0.3)",
                  borderRadius: "50px",
                  fontSize: "clamp(13px, 2.5vw, 15px)",
                  fontWeight: "700",
                  color: filterTag === tag ? "#fff" : "#9ca3af",
                  cursor: "pointer",
                  transition: "all 0.4s ease",
                  boxShadow: filterTag === tag ? "0 8px 30px rgba(139,92,246,0.5)" : "none",
                  transform: filterTag === tag ? "scale(1.08)" : "scale(1)"
                }}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 380px), 1fr))",
          gap: "clamp(28px, 5vw, 44px)"
        }}>
          {filtered.map((project, index) => (
            <div
              key={project.title}
              onMouseEnter={() => setHover(index)}
              onMouseLeave={() => setHover(null)}
              onClick={() => setModal(project.title)}
              style={{
                position: "relative",
                cursor: "pointer",
                opacity: visible ? 1 : 0,
                animation: `slideIn 1s ease-out ${index * 0.12}s backwards`,
                transform: hover === index ? "translateY(-16px) scale(1.03)" : "scale(1)",
                transition: "all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)"
              }}
            >
              {/* Glow background */}
              <div style={{
                position: "absolute",
                inset: "-40px",
                background: `radial-gradient(circle at 50% 50%, ${project.color}40, transparent 70%)`,
                filter: "blur(60px)",
                opacity: hover === index ? 0.9 : 0,
                transition: "opacity 0.6s ease",
                pointerEvents: "none"
              }} />

              <div style={{
                position: "relative",
                background: "rgba(255,255,255,0.04)",
                border: `2px solid ${hover === index ? project.color : "rgba(139,92,246,0.15)"}`,
                borderRadius: "28px",
                overflow: "hidden",
                backdropFilter: "blur(24px)",
                boxShadow: hover === index 
                  ? `0 40px 100px ${project.color}50, inset 0 0 60px ${project.color}20`
                  : "0 20px 60px rgba(0,0,0,0.5)",
                transition: "all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)"
              }}>
                {/* Featured corner badge */}
                {project.featured && (
                  <div style={{
                    position: "absolute",
                    top: "16px",
                    right: "16px",
                    padding: "8px 20px",
                    background: "linear-gradient(135deg, #FBBF24, #F59E0B)",
                    borderRadius: "100px",
                    fontSize: "clamp(11px, 2vw, 13px)",
                    fontWeight: "900",
                    color: "#000",
                    zIndex: 20,
                    boxShadow: "0 8px 25px rgba(251,191,36,0.6)",
                    animation: "glowPulse 2.5s infinite alternate"
                  }}>
                    <Star size={14} style={{ marginRight: "6px", verticalAlign: "-2px" }} />
                    FEATURED
                  </div>
                )}

                {/* Project Image */}
                <div style={{
                  position: "relative",
                  height: "clamp(220px, 42vw, 300px)",
                  overflow: "hidden"
                }}>
                  <img
                    src={project.img}
                    alt={project.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      transition: "transform 0.9s ease",
                      transform: hover === index ? "scale(1.18)" : "scale(1.08)",
                      filter: hover === index ? "brightness(1.15) contrast(1.05)" : "brightness(0.9)"
                    }}
                    loading="lazy"
                  />

                  {/* Shine overlay */}
                  {hover === index && (
                    <div style={{
                      position: "absolute",
                      inset: 0,
                      background: "linear-gradient(120deg, transparent 40%, rgba(255,255,255,0.25) 50%, transparent 60%)",
                      animation: "shimmerEffect 2s infinite"
                    }} />
                  )}

                  {/* Icon overlay */}
                  <div style={{
                    position: "absolute",
                    top: "20px",
                    left: "20px",
                    fontSize: "clamp(3.5rem, 8vw, 5rem)",
                    opacity: 0.9,
                    filter: "drop-shadow(0 8px 30px rgba(0,0,0,0.7))",
                    animation: hover === index ? "floatProject 3s ease-in-out infinite" : "none"
                  }}>
                    {project.icon}
                  </div>
                </div>

                {/* Content */}
                <div style={{ padding: "clamp(24px, 5vw, 36px)" }}>
                  <h3 style={{
                    fontSize: "clamp(1.4rem, 4vw, 1.9rem)",
                    fontWeight: "900",
                    marginBottom: "14px",
                    color: "#ffffff",
                    lineHeight: 1.2
                  }}>
                    {project.title}
                  </h3>

                  <p style={{
                    fontSize: "clamp(0.95rem, 2.5vw, 1.05rem)",
                    color: "#d1d5db",
                    lineHeight: 1.6,
                    marginBottom: "24px",
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden"
                  }}>
                    {project.desc}
                  </p>

                  {/* Tags */}
                  <div style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "10px",
                    marginBottom: "28px"
                  }}>
                    {project.tags.map((tag, i) => (
                      <span
                        key={i}
                        style={{
                          padding: "8px 16px",
                          background: `${project.color}15`,
                          border: `1px solid ${project.color}30`,
                          borderRadius: "100px",
                          fontSize: "clamp(12px, 2.5vw, 14px)",
                          color: "#e5e7eb",
                          fontWeight: "600"
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div style={{
                    display: "flex",
                    gap: "16px",
                    flexWrap: "wrap"
                  }}>
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={e => e.stopPropagation()}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                          padding: "clamp(12px, 4vw, 16px) clamp(24px, 6vw, 36px)",
                          background: `linear-gradient(135deg, ${project.color}, ${project.color}CC)`,
                          borderRadius: "100px",
                          fontSize: "clamp(14px, 3vw, 16px)",
                          fontWeight: "800",
                          color: "white",
                          textDecoration: "none",
                          boxShadow: `0 10px 35px ${project.color}50`,
                          transition: "all 0.4s ease"
                        }}
                        onMouseEnter={e => {
                          e.currentTarget.style.transform = "translateY(-4px) scale(1.03)";
                          e.currentTarget.style.boxShadow = `0 16px 50px ${project.color}70`;
                        }}
                        onMouseLeave={e => {
                          e.currentTarget.style.transform = "translateY(0) scale(1)";
                          e.currentTarget.style.boxShadow = `0 10px 35px ${project.color}50`;
                        }}
                      >
                        <Rocket size={18} />
                        LIVE DEMO
                      </a>
                    )}

                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={e => e.stopPropagation()}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                          padding: "clamp(12px, 4vw, 16px) clamp(24px, 6vw, 36px)",
                          background: "rgba(255,255,255,0.07)",
                          border: "2px solid rgba(255,255,255,0.15)",
                          borderRadius: "100px",
                          fontSize: "clamp(14px, 3vw, 16px)",
                          fontWeight: "800",
                          color: "#d1d5db",
                          textDecoration: "none",
                          transition: "all 0.4s ease"
                        }}
                        onMouseEnter={e => {
                          e.currentTarget.style.background = "rgba(255,255,255,0.15)";
                          e.currentTarget.style.color = "white";
                          e.currentTarget.style.borderColor = "rgba(255,255,255,0.4)";
                        }}
                        onMouseLeave={e => {
                          e.currentTarget.style.background = "rgba(255,255,255,0.07)";
                          e.currentTarget.style.color = "#d1d5db";
                          e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
                        }}
                      >
                        <Github size={18} />
                        SOURCE CODE
                      </a>
                    )}
                  </div>
                </div>

                {/* Corner glow accents */}
                <div style={{
                  position: "absolute",
                  top: "0",
                  left: "0",
                  width: "100px",
                  height: "100px",
                  background: `radial-gradient(circle at 0% 0%, ${project.color}60, transparent 70%)`,
                  opacity: hover === index ? 0.6 : 0.1,
                  transition: "opacity 0.6s"
                }} />
                <div style={{
                  position: "absolute",
                  bottom: "0",
                  right: "0",
                  width: "100px",
                  height: "100px",
                  background: `radial-gradient(circle at 100% 100%, ${project.color}60, transparent 70%)`,
                  opacity: hover === index ? 0.6 : 0.1,
                  transition: "opacity 0.6s"
                }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detail Modal */}
      {modal !== null && currentProject && (
        <div
          onClick={() => setModal(null)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.94)",
            backdropFilter: "blur(40px)",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "clamp(20px, 4vw, 32px)",
            animation: "slideIn 0.4s ease-out"
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: "rgba(10,10,30,0.92)",
              backdropFilter: "blur(32px)",
              borderRadius: "32px",
              border: `3px solid ${currentProject.color}70`,
              width: "min(96vw, 1200px)",
              maxHeight: "94vh",
              overflowY: "auto",
              boxShadow: `0 60px 140px ${currentProject.color}70`,
              position: "relative",
              animation: "slideUp 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) backwards"
            }}
          >
            {/* Modal Header Image */}
            <div style={{
              position: "relative",
              height: "clamp(300px, 50vw, 420px)",
              overflow: "hidden"
            }}>
              <img
                src={currentProject.img}
                alt={currentProject.title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  filter: "brightness(0.85)"
                }}
              />
              <div style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)"
              }} />

              {/* Close button */}
              <button
                onClick={() => setModal(null)}
                style={{
                  position: "absolute",
                  top: "24px",
                  right: "24px",
                  background: "rgba(0,0,0,0.6)",
                  border: "none",
                  borderRadius: "50%",
                  width: "56px",
                  height: "56px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  backdropFilter: "blur(10px)",
                  transition: "all 0.4s"
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = "rgba(239,68,68,0.7)";
                  e.currentTarget.style.transform = "rotate(90deg)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = "rgba(0,0,0,0.6)";
                  e.currentTarget.style.transform = "rotate(0deg)";
                }}
              >
                <X size={28} color="#fff" />
              </button>

              {/* Project Icon */}
              <div style={{
                position: "absolute",
                bottom: "32px",
                left: "32px",
                fontSize: "clamp(4.5rem, 10vw, 7rem)",
                filter: "drop-shadow(0 10px 40px rgba(0,0,0,0.8))",
                opacity: 0.9
              }}>
                {currentProject.icon}
              </div>
            </div>

            {/* Modal Content */}
            <div style={{ padding: "clamp(32px, 6vw, 48px)" }}>
              <h2 style={{
                fontSize: "clamp(2.2rem, 6vw, 3.2rem)",
                fontWeight: "900",
                marginBottom: "16px",
                background: `linear-gradient(90deg, #ffffff, ${currentProject.color})`,
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent"
              }}>
                {currentProject.title}
              </h2>

              <div style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "16px",
                marginBottom: "32px"
              }}>
                {currentProject.tags.map((tag, i) => (
                  <span
                    key={i}
                    style={{
                      padding: "10px 22px",
                      background: `${currentProject.color}20`,
                      border: `1px solid ${currentProject.color}40`,
                      borderRadius: "100px",
                      fontSize: "0.95rem",
                      fontWeight: "700",
                      color: "#e5e7eb"
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <p style={{
                fontSize: "1.1rem",
                lineHeight: 1.8,
                color: "#d1d5db",
                marginBottom: "40px"
              }}>
                {currentProject.longDesc || currentProject.desc}
              </p>

              {/* Highlights */}
              {currentProject.highlights && (
                <div style={{ marginBottom: "40px" }}>
                  <h3 style={{
                    fontSize: "1.7rem",
                    fontWeight: "800",
                    color: currentProject.color,
                    marginBottom: "20px",
                    display: "flex",
                    alignItems: "center",
                    gap: "12px"
                  }}>
                    <Award size={28} />
                    Key Highlights
                  </h3>
                  <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                    gap: "16px"
                  }}>
                    {currentProject.highlights.map((highlight, i) => (
                      <div
                        key={i}
                        style={{
                          padding: "16px 24px",
                          background: "rgba(255,255,255,0.05)",
                          borderRadius: "16px",
                          border: `1px solid ${currentProject.color}30`,
                          display: "flex",
                          alignItems: "center",
                          gap: "12px",
                          animation: `checkAppear 0.7s ease-out ${i * 0.1 + 0.4}s backwards`
                        }}
                      >
                        <CheckCircle size={20} style={{ color: currentProject.color }} />
                        <span style={{ fontSize: "1rem" }}>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div style={{
                display: "flex",
                gap: "20px",
                flexWrap: "wrap",
                justifyContent: "center",
                marginTop: "40px"
              }}>
                {currentProject.live && (
                  <a
                    href={currentProject.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      padding: "16px 40px",
                      background: `linear-gradient(135deg, ${currentProject.color}, ${currentProject.color}CC)`,
                      borderRadius: "100px",
                      fontSize: "1.1rem",
                      fontWeight: "800",
                      color: "white",
                      textDecoration: "none",
                      boxShadow: `0 12px 40px ${currentProject.color}60`,
                      transition: "all 0.4s ease"
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.transform = "translateY(-4px) scale(1.05)";
                      e.currentTarget.style.boxShadow = `0 20px 60px ${currentProject.color}80`;
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.transform = "translateY(0) scale(1)";
                      e.currentTarget.style.boxShadow = `0 12px 40px ${currentProject.color}60`;
                    }}
                  >
                    <Rocket size={22} />
                    View Live Project
                  </a>
                )}

                {currentProject.github && (
                  <a
                    href={currentProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      padding: "16px 40px",
                      background: "rgba(255,255,255,0.08)",
                      border: `2px solid ${currentProject.color}50`,
                      borderRadius: "100px",
                      fontSize: "1.1rem",
                      fontWeight: "800",
                      color: "#e5e7eb",
                      textDecoration: "none",
                      transition: "all 0.4s ease"
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = "rgba(255,255,255,0.16)";
                      e.currentTarget.style.color = "white";
                      e.currentTarget.style.borderColor = `${currentProject.color}80`;
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = "rgba(255,255,255,0.08)";
                      e.currentTarget.style.color = "#e5e7eb";
                      e.currentTarget.style.borderColor = `${currentProject.color}50`;
                    }}
                  >
                    <Github size={22} />
                    View Source Code
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}