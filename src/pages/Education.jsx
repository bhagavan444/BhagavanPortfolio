// Education.jsx – FINAL COMPLETE VERSION (750+ lines)
// Rich modal details • Animated everything • Professional 2026 premium style

import { useState, useEffect, useRef } from "react";
import {
  Award,
  Zap,
  Trophy,
  Target,
  Brain,
  Code,
  GraduationCap,
  Calendar,
  MapPin,
  Star,
  Rocket,
  BookOpen,
  TrendingUp,
  Sparkles,
  Crown,
  Medal,
  X,
  ExternalLink,
  CheckCircle,
  BrainCircuit,
  Cpu,
  Database,
  GitBranch,
  Terminal,
  Lightbulb
} from "lucide-react";

import rceeImage from "../assets/Rcee.jpg";
import sriImage from "../assets/SRI.jpg";
import monteImage from "../assets/Monte.jpg";
const education = [
  {
    title: "B.Tech AI & Data Science",
    school: "Ramachandra College of Engineering",
    year: "2022–2026",
    score: "75%",
    cgpa: "8.5",
    desc: "Focused on designing intelligent systems using Machine Learning, Deep Learning, and Data Science. Gained hands-on experience with Python, TensorFlow, MERN stack, and real-world AI applications including predictive analytics, computer vision, and full-stack AI-driven platforms.",
    color: "linear-gradient(135deg, #06b6d4, #3b82f6, #8b5cf6)",
    accentColor: "#06b6d4",
    icon: "🚀",
    badge: "INNOVATION",
    achievement: "AI Specialist",
    focus: "AI / ML Engineering & Full-Stack Development",
    image: rceeImage,
    location: "Eluru, AP",
    highlights: [
      "Machine Learning & Deep Learning",
      "MERN Stack + AI Integration",
      "Predictive Analytics & Computer Vision",
      "MLOps & Model Deployment"
    ],
    keyProjects: [
      "AI-Powered Predictive Maintenance System",
      "Real-time Object Detection Web App",
      "Full-stack AI Chatbot Platform"
    ]
  },
  {
    title: "Intermediate MPC",
    school: "Sree Vidhya College",
    year: "2020–2022",
    score: "78%",
    cgpa: "7.8",
    desc: "Completed intensive coursework in Mathematics, Physics, and Chemistry with strong emphasis on analytical problem-solving and logical reasoning. Built solid quantitative foundation essential for algorithms and computational thinking.",
    color: "linear-gradient(135deg, #c084fc, #ec4899, #f43f5e)",
    accentColor: "#ec4899",
    icon: "🔬",
    badge: "EVOLUTION",
    achievement: "Science Excellence",
    focus: "STEM Foundations & Analytical Thinking",
    image: sriImage,
    location: "Vijayawada, AP",
    highlights: [
      "Advanced Mathematics & Calculus",
      "Classical & Modern Physics",
      "Inorganic & Organic Chemistry",
      "Structured Problem Solving"
    ],
    keyProjects: [
      "Mathematical Modeling Competition",
      "Physics Experiment Documentation",
      "Chemistry Practical Excellence"
    ]
  },
  {
    title: "10th Grade",
    school: "Montessori High School",
    year: "2020",
    score: "95%",
    cgpa: "10.0",
    desc: "Established strong academic foundation with excellence in Mathematics and Science. Demonstrated consistent top-tier performance, disciplined study habits, and early aptitude for logical reasoning and structured problem-solving.",
    color: "linear-gradient(135deg, #34d399, #14b8a6, #06b6d4)",
    accentColor: "#10b981",
    icon: "🌟",
    badge: "FOUNDATION",
    achievement: "Top 5%",
    focus: "Logic, Discipline & Problem Solving",
    image: monteImage,
    location: "Vijayawada, AP",
    highlights: [
      "Perfect Score in Mathematics",
      "Science Exhibition Winner",
      "Consistent Academic Topper",
      "Early Logical Reasoning Skills"
    ],
    keyProjects: [
      "School Science Fair Project",
      "Mathematics Olympiad Participant",
      "Best Student Award"
    ]
  }
];

export default function Education() {
  const [activeCard, setActiveCard] = useState(0);
  const [progress, setProgress] = useState([0, 0, 0]);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [modal, setModal] = useState(null);
  const [scrollY, setScrollY] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    // Animate progress bars when visible
    setTimeout(() => {
      setProgress(education.map(edu => parseInt(edu.score) || 0));
    }, 800);

    // Auto-cycle active card every 5 seconds
    const interval = setInterval(() => {
      setActiveCard(prev => (prev + 1) % education.length);
    }, 5000);

    // Mouse tracking for gradient effects
    const handleMove = (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setMousePos({
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100
      });
    };

    // Scroll tracking for parallax
    const handleScroll = () => setScrollY(window.scrollY);

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("scroll", handleScroll);

    return () => {
      clearInterval(interval);
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const currentEdu = education[modal !== null ? modal : activeCard];

  return (
    <div
      ref={containerRef}
      style={{
        minHeight: "100vh",
        background: "#000000",
        color: "#ffffff",
        fontFamily: "system-ui, -apple-system, sans-serif",
        position: "relative",
        overflow: "hidden",
        padding: "clamp(60px, 10vh, 100px) clamp(20px, 5vw, 60px)"
      }}
    >
      <style>{`
        @keyframes float { 0%, 100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-25px) rotate(5deg); } }
        @keyframes pulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.8; transform: scale(1.05); } }
        @keyframes shimmer { 0% { background-position: -200%; } 100% { background-position: 200%; } }
        @keyframes slideUp { 0% { opacity: 0; transform: translateY(40px); } 100% { opacity: 1; transform: translateY(0); } }
        @keyframes rotate { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        @keyframes gradient { 0%, 100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }
        @keyframes glow { 0%, 100% { filter: drop-shadow(0 0 20px currentColor); } 50% { filter: drop-shadow(0 0 40px currentColor); } }
        @keyframes orbit { 
          0%, 100% { transform: translate(0, 0) scale(1); } 
          25% { transform: translate(40px, -30px) scale(1.1); }
          50% { transform: translate(-30px, 40px) scale(0.9); }
          75% { transform: translate(30px, 30px) scale(1.05); }
        }
        @keyframes checkAppear { from { opacity: 0; transform: scale(0.5) translateY(10px); } to { opacity: 1; transform: scale(1) translateY(0); } }
        .float { animation: float 8s ease-in-out infinite; }
        .pulse { animation: pulse 3s ease-in-out infinite; }
        .glow { animation: glow 2s ease-in-out infinite; }
      `}</style>

      {/* Animated Background */}
      <div style={{ position: "fixed", inset: 0, zIndex: 0 }}>
        {/* Mouse-tracking gradient */}
        <div style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(6,182,212,0.18), transparent 55%)`,
          transition: "background 0.4s ease"
        }} />

        {/* Floating gradient orbs */}
        {[
          { size: 600, top: "15%", left: "10%", color: "rgba(6,182,212,0.12)", duration: "25s" },
          { size: 500, bottom: "15%", right: "10%", color: "rgba(236,72,153,0.12)", duration: "20s", delay: "2s" },
          { size: 450, top: "50%", left: "50%", color: "rgba(139,92,246,0.1)", duration: "22s", delay: "1s" }
        ].map((orb, i) => (
          <div key={i} style={{
            position: "absolute",
            width: `${orb.size}px`,
            height: `${orb.size}px`,
            top: orb.top,
            left: orb.left,
            right: orb.right,
            bottom: orb.bottom,
            ...(orb.top === "50%" && orb.left === "50%" && { transform: "translate(-50%, -50%)" }),
            background: `radial-gradient(circle, ${orb.color}, transparent 70%)`,
            borderRadius: "50%",
            filter: "blur(80px)",
            animation: `orbit ${orb.duration} ease-in-out infinite`,
            animationDelay: orb.delay || "0s"
          }} />
        ))}

        {/* Animated grid */}
        <div style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "linear-gradient(rgba(6,182,212,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          opacity: 0.4,
          transform: `translateY(${scrollY * 0.3}px)`
        }} />

        {/* Floating particles */}
        {[...Array(40)].map((_, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${2 + Math.random() * 4}px`,
              height: `${2 + Math.random() * 4}px`,
              background: `hsl(${180 + Math.random() * 100}, 80%, 60%)`,
              borderRadius: "50%",
              opacity: 0.6,
              animation: `float ${10 + Math.random() * 15}s ease-in-out infinite ${Math.random() * 5}s`,
              filter: "blur(1px)"
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div style={{ position: "relative", zIndex: 10, maxWidth: "1600px", margin: "0 auto" }}>
        
        {/* Header Section */}
        <div style={{ textAlign: "center", marginBottom: "clamp(60px, 10vh, 100px)" }}>
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "16px",
            padding: "16px 40px",
            background: "rgba(6,182,212,0.15)",
            backdropFilter: "blur(20px)",
            borderRadius: "100px",
            border: "2px solid rgba(6,182,212,0.4)",
            marginBottom: "40px",
            boxShadow: "0 20px 60px rgba(6,182,212,0.3)",
            animation: "slideUp 1s ease-out"
          }}>
            <GraduationCap className="pulse" size={28} style={{ color: "#06b6d4" }} />
            <span style={{
              fontSize: "clamp(0.9rem, 2vw, 1.1rem)",
              fontWeight: "900",
              letterSpacing: "0.15em",
              color: "#06b6d4"
            }}>
              ACADEMIC JOURNEY • 2019–2026
            </span>
            <Trophy className="pulse" size={24} style={{ color: "#fbbf24" }} />
          </div>

          <h1 style={{
            fontSize: "clamp(3rem, 12vw, 7.5rem)",
            fontWeight: "900",
            lineHeight: 0.95,
            marginBottom: "30px",
            letterSpacing: "-0.02em",
            animation: "slideUp 1s ease-out 0.2s backwards"
          }}>
            Academic
            <br />
            <span style={{
              background: "linear-gradient(90deg, #06b6d4, #8b5cf6, #ec4899, #06b6d4)",
              backgroundSize: "200%",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
              animation: "gradient 5s ease infinite"
            }}>
              Excellence
            </span>
          </h1>

          <p style={{
            fontSize: "clamp(1.1rem, 3vw, 1.4rem)",
            color: "#94a3b8",
            maxWidth: "900px",
            margin: "0 auto",
            lineHeight: 1.7,
            animation: "slideUp 1s ease-out 0.4s backwards"
          }}>
            From strong <strong style={{ color: "#34d399" }}>foundations</strong> through rigorous 
            <strong style={{ color: "#8b5cf6" }}> analytical training</strong> to cutting-edge 
            <strong style={{ color: "#06b6d4" }}> AI innovation</strong>
          </p>
        </div>

        {/* Education Cards Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 380px), 1fr))",
          gap: "clamp(30px, 5vw, 45px)",
          marginBottom: "clamp(80px, 12vh, 120px)"
        }}>
          {education.map((edu, idx) => (
            <div
              key={idx}
              onClick={() => setModal(idx)}
              onMouseEnter={() => setActiveCard(idx)}
              style={{
                position: "relative",
                borderRadius: "32px",
                overflow: "hidden",
                background: "rgba(10,14,39,0.6)",
                backdropFilter: "blur(30px)",
                border: activeCard === idx 
                  ? `2px solid ${edu.accentColor}` 
                  : "2px solid rgba(255,255,255,0.08)",
                boxShadow: activeCard === idx 
                  ? `0 40px 100px ${edu.accentColor}50`
                  : "0 20px 60px rgba(0,0,0,0.5)",
                transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
                transform: activeCard === idx ? "translateY(-15px) scale(1.02)" : "translateY(0)",
                cursor: "pointer",
                animation: `slideUp 0.8s ease-out ${0.2 + idx * 0.2}s backwards`
              }}
            >
              {/* Rotating border effect */}
              {activeCard === idx && (
                <div style={{
                  position: "absolute",
                  inset: -3,
                  background: `conic-gradient(from 0deg at 50% 50%, ${edu.accentColor}, transparent, ${edu.accentColor})`,
                  borderRadius: "32px",
                  animation: "rotate 8s linear infinite",
                  zIndex: -1,
                  opacity: 0.6
                }} />
              )}

              {/* Image Section */}
              <div style={{
                position: "relative",
                height: "clamp(240px, 40vw, 300px)",
                overflow: "hidden"
              }}>
                <img
                  src={edu.image}
                  alt={edu.school}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "all 1s ease",
                    transform: activeCard === idx ? "scale(1.2)" : "scale(1.08)",
                    filter: activeCard === idx ? "brightness(1.15)" : "brightness(0.85)"
                  }}
                />

                {/* Gradient overlay */}
                <div style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.3) 50%, transparent 100%)"
                }} />

                {/* Animated shine effect */}
                {activeCard === idx && (
                  <div style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
                    animation: "shimmer 3s linear infinite"
                  }} />
                )}

                {/* Badge */}
                <div className={activeCard === idx ? "pulse" : ""} style={{
                  position: "absolute",
                  top: "24px",
                  right: "24px",
                  padding: "12px 28px",
                  borderRadius: "100px",
                  fontSize: "clamp(0.75rem, 2vw, 0.9rem)",
                  fontWeight: "900",
                  letterSpacing: "0.12em",
                  background: edu.color,
                  color: "white",
                  boxShadow: `0 12px 40px ${edu.accentColor}90`
                }}>
                  {edu.badge}
                </div>

                {/* Year & Location badges */}
                <div style={{
                  position: "absolute",
                  top: "24px",
                  left: "24px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px"
                }}>
                  <div style={{
                    padding: "12px 24px",
                    borderRadius: "100px",
                    background: "rgba(0,0,0,0.8)",
                    backdropFilter: "blur(15px)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    fontSize: "clamp(0.8rem, 2vw, 0.95rem)",
                    fontWeight: "700"
                  }}>
                    <Calendar size={18} style={{ color: "#fbbf24" }} />
                    {edu.year}
                  </div>
                  <div style={{
                    padding: "12px 24px",
                    borderRadius: "100px",
                    background: "rgba(0,0,0,0.8)",
                    backdropFilter: "blur(15px)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    fontSize: "clamp(0.8rem, 2vw, 0.95rem)",
                    fontWeight: "700"
                  }}>
                    <MapPin size={18} style={{ color: edu.accentColor }} />
                    {edu.location}
                  </div>
                </div>
              </div>

              {/* Content Section */}
              <div style={{ padding: "clamp(30px, 6vw, 45px)" }}>
                
                {/* Icon & Title */}
                <div style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "24px",
                  marginBottom: "28px"
                }}>
                  <div className={activeCard === idx ? "float" : ""} style={{
                    width: "clamp(90px, 18vw, 110px)",
                    height: "clamp(90px, 18vw, 110px)",
                    borderRadius: "28px",
                    background: edu.color,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "clamp(44px, 10vw, 60px)",
                    boxShadow: `0 25px 60px ${edu.accentColor}70`,
                    flexShrink: 0
                  }}>
                    {edu.icon}
                  </div>

                  <div style={{ flex: 1 }}>
                    <h2 style={{
                      fontSize: "clamp(1.6rem, 5vw, 2.4rem)",
                      fontWeight: "900",
                      marginBottom: "10px",
                      lineHeight: 1.2
                    }}>
                      {edu.title}
                    </h2>
                    <p style={{
                      color: "#94a3b8",
                      fontSize: "clamp(0.9rem, 2.5vw, 1.1rem)",
                      fontWeight: "600"
                    }}>
                      {edu.school}
                    </p>
                  </div>
                </div>

                {/* Score & CGPA Cards */}
                <div style={{
                  display: "flex",
                  gap: "16px",
                  marginBottom: "28px",
                  flexWrap: "wrap"
                }}>
                  <div style={{
                    flex: 1,
                    minWidth: "130px",
                    padding: "20px 24px",
                    borderRadius: "20px",
                    background: edu.color,
                    color: "white",
                    textAlign: "center"
                  }}>
                    <div style={{
                      fontSize: "clamp(2.2rem, 6vw, 2.8rem)",
                      fontWeight: "900",
                      marginBottom: "6px"
                    }}>
                      {edu.score}
                    </div>
                    <div style={{
                      fontSize: "clamp(0.75rem, 2vw, 0.9rem)",
                      fontWeight: "700",
                      opacity: 0.9,
                      letterSpacing: "0.05em"
                    }}>
                      SCORE
                    </div>
                  </div>

                  <div style={{
                    flex: 1,
                    minWidth: "130px",
                    padding: "20px 24px",
                    borderRadius: "20px",
                    background: "rgba(255,255,255,0.08)",
                    border: `2px solid ${edu.accentColor}50`,
                    textAlign: "center"
                  }}>
                    <div style={{
                      fontSize: "clamp(2.2rem, 6vw, 2.8rem)",
                      fontWeight: "900",
                      color: edu.accentColor,
                      marginBottom: "6px"
                    }}>
                      {edu.cgpa}
                    </div>
                    <div style={{
                      fontSize: "clamp(0.75rem, 2vw, 0.9rem)",
                      color: "#94a3b8",
                      fontWeight: "700",
                      letterSpacing: "0.05em"
                    }}>
                      CGPA
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p style={{
                  color: "#cbd5e1",
                  lineHeight: 1.8,
                  marginBottom: "28px",
                  fontSize: "clamp(0.9rem, 2.5vw, 1.05rem)"
                }}>
                  {edu.desc}
                </p>

                {/* Animated Progress Bar */}
                <div style={{
                  height: "14px",
                  background: "rgba(255,255,255,0.08)",
                  borderRadius: "100px",
                  overflow: "hidden",
                  position: "relative",
                  marginBottom: "28px",
                  border: "1px solid rgba(255,255,255,0.1)"
                }}>
                  <div style={{
                    height: "100%",
                    width: `${progress[idx]}%`,
                    background: edu.color,
                    transition: "width 2.5s cubic-bezier(0.4, 0, 0.2, 1)",
                    boxShadow: `0 0 25px ${edu.accentColor}`,
                    position: "relative"
                  }}>
                    <div style={{
                      position: "absolute",
                      inset: 0,
                      background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
                      backgroundSize: "200%",
                      animation: "shimmer 3s linear infinite"
                    }} />
                  </div>
                </div>

                {/* Focus & Achievement */}
                <div style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "14px"
                }}>
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "14px",
                    padding: "16px 24px",
                    borderRadius: "16px",
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.1)"
                  }}>
                    <Zap size={22} style={{ color: edu.accentColor, filter: `drop-shadow(0 0 8px ${edu.accentColor})` }} />
                    <span style={{ 
                      fontWeight: "600", 
                      fontSize: "clamp(0.85rem, 2.5vw, 1rem)",
                      color: "#e5e7eb"
                    }}>
                      {edu.focus}
                    </span>
                  </div>

                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "14px",
                    padding: "16px 24px",
                    borderRadius: "16px",
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.1)"
                  }}>
                    <Award size={22} style={{ color: edu.accentColor, filter: `drop-shadow(0 0 8px ${edu.accentColor})` }} />
                    <span style={{ 
                      fontWeight: "600", 
                      fontSize: "clamp(0.85rem, 2.5vw, 1rem)",
                      color: "#94a3b8"
                    }}>
                      {edu.achievement}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 220px), 1fr))",
          gap: "clamp(24px, 5vw, 36px)"
        }}>
          {[
            { icon: Brain, value: "8.5+", label: "Current CGPA", color: "#fbbf24", desc: "Academic Performance" },
            { icon: Rocket, value: "AI/ML", label: "Specialization", color: "#06b6d4", desc: "Future Technology" },
            { icon: Code, value: "Production", label: "Ready Skills", color: "#f97316", desc: "Industry Standard" },
            { icon: Target, value: "MNC", label: "Career Goal", color: "#8b5cf6", desc: "Top-Tier Engineer" }
          ].map((item, i) => (
            <div
              key={i}
              style={{
                padding: "clamp(32px, 6vw, 48px) 28px",
                background: "rgba(255,255,255,0.05)",
                backdropFilter: "blur(25px)",
                borderRadius: "28px",
                border: "1px solid rgba(255,255,255,0.1)",
                textAlign: "center",
                transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                cursor: "pointer",
                animation: `slideUp 0.8s ease-out ${1 + i * 0.15}s backwards`
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-12px)";
                e.currentTarget.style.boxShadow = `0 30px 70px ${item.color}50`;
                e.currentTarget.style.borderColor = `${item.color}70`;
                e.currentTarget.style.background = "rgba(255,255,255,0.08)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                e.currentTarget.style.background = "rgba(255,255,255,0.05)";
              }}
            >
              <item.icon 
                size={48} 
                style={{ 
                  color: item.color, 
                  marginBottom: "20px",
                  filter: `drop-shadow(0 0 20px ${item.color})`,
                }} 
                className="glow"
              />
              <div style={{
                fontSize: "clamp(2.4rem, 7vw, 3.2rem)",
                fontWeight: "900",
                color: item.color,
                marginBottom: "10px",
                lineHeight: 1
              }}>
                {item.value}
              </div>
              <div style={{
                fontSize: "clamp(0.9rem, 2.5vw, 1.1rem)",
                color: "#e5e7eb",
                fontWeight: "700",
                marginBottom: "8px",
                letterSpacing: "0.05em"
              }}>
                {item.label}
              </div>
              <div style={{
                fontSize: "clamp(0.75rem, 2vw, 0.9rem)",
                color: "#64748b",
                fontWeight: "500"
              }}>
                {item.desc}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detail Modal */}
      {modal !== null && (
        <div
          onClick={() => setModal(null)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 1000,
            background: "rgba(0,0,0,0.96)",
            backdropFilter: "blur(50px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "24px",
            animation: "slideUp 0.4s ease-out"
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "rgba(10,14,39,0.9)",
              backdropFilter: "blur(30px)",
              borderRadius: "32px",
              border: `2px solid ${currentEdu.accentColor}60`,
              width: "min(95vw, 1100px)",
              maxHeight: "92vh",
              overflowY: "auto",
              boxShadow: `0 40px 120px ${currentEdu.accentColor}70`,
              position: "relative",
              animation: "slideUp 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 0.1s backwards"
            }}
          >
            {/* Modal Header */}
            <div style={{
              position: "sticky",
              top: 0,
              zIndex: 10,
              background: "rgba(10,14,39,0.95)",
              backdropFilter: "blur(20px)",
              padding: "24px 32px",
              borderBottom: `1px solid ${currentEdu.accentColor}30`,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}>
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "16px"
              }}>
                <div style={{
                  width: "64px",
                  height: "64px",
                  borderRadius: "20px",
                  background: currentEdu.color,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "2.2rem",
                  boxShadow: `0 15px 40px ${currentEdu.accentColor}60`
                }}>
                  {currentEdu.icon}
                </div>
                <div>
                  <h2 style={{
                    fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
                    fontWeight: "900",
                    marginBottom: "4px"
                  }}>
                    {currentEdu.title}
                  </h2>
                  <p style={{
                    color: currentEdu.accentColor,
                    fontSize: "1.1rem",
                    fontWeight: "600"
                  }}>
                    {currentEdu.school}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setModal(null)}
                style={{
                  background: "rgba(255,255,255,0.1)",
                  border: "none",
                  borderRadius: "50%",
                  width: "48px",
                  height: "48px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  transition: "all 0.3s"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(255,50,50,0.3)";
                  e.currentTarget.style.transform = "rotate(90deg)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.1)";
                  e.currentTarget.style.transform = "rotate(0deg)";
                }}
              >
                <X size={24} style={{ color: "#ef4444" }} />
              </button>
            </div>

            {/* Modal Body */}
            <div style={{ padding: "clamp(32px, 5vw, 48px)" }}>
              {/* Highlights */}
              <div style={{
                marginBottom: "40px"
              }}>
                <h3 style={{
                  fontSize: "1.6rem",
                  fontWeight: "800",
                  color: currentEdu.accentColor,
                  marginBottom: "20px",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px"
                }}>
                  <Star size={28} />
                  Key Highlights
                </h3>
                <div style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "12px"
                }}>
                  {currentEdu.highlights.map((highlight, i) => (
                    <div key={i} style={{
                      padding: "12px 24px",
                      background: "rgba(255,255,255,0.05)",
                      borderRadius: "100px",
                      border: `1px solid ${currentEdu.accentColor}30`,
                      fontSize: "0.95rem",
                      fontWeight: "600",
                      color: "#e5e7eb",
                      animation: `checkAppear 0.6s ease-out ${i * 0.1 + 0.4}s backwards`
                    }}>
                      {highlight}
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Projects */}
              {currentEdu.keyProjects && (
                <div style={{ marginBottom: "40px" }}>
                  <h3 style={{
                    fontSize: "1.6rem",
                    fontWeight: "800",
                    color: currentEdu.accentColor,
                    marginBottom: "20px",
                    display: "flex",
                    alignItems: "center",
                    gap: "12px"
                  }}>
                    <Rocket size={28} />
                    Notable Projects
                  </h3>
                  <ul style={{
                    listStyle: "none",
                    padding: 0,
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px"
                  }}>
                    {currentEdu.keyProjects.map((project, i) => (
                      <li key={i} style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "14px",
                        fontSize: "1rem",
                        color: "#cbd5e1",
                        animation: `checkAppear 0.7s ease-out ${i * 0.12 + 0.5}s backwards`
                      }}>
                        <CheckCircle size={22} style={{ color: currentEdu.accentColor, flexShrink: 0 }} />
                        {project}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Full Description */}
              <p style={{
                color: "#cbd5e1",
                lineHeight: 1.8,
                fontSize: "1.05rem",
                marginBottom: "40px"
              }}>
                {currentEdu.desc}
              </p>

              {/* Close Button (bottom) */}
              <div style={{ textAlign: "center", marginTop: "40px" }}>
                <button
                  onClick={() => setModal(null)}
                  style={{
                    padding: "16px 48px",
                    background: `linear-gradient(135deg, ${currentEdu.accentColor}, ${currentEdu.color.split(',')[1] || currentEdu.accentColor})`,
                    border: "none",
                    borderRadius: "100px",
                    color: "white",
                    fontSize: "1.1rem",
                    fontWeight: "700",
                    cursor: "pointer",
                    boxShadow: `0 15px 40px ${currentEdu.accentColor}60`,
                    transition: "all 0.4s ease"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.boxShadow = `0 25px 60px ${currentEdu.accentColor}80`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = `0 15px 40px ${currentEdu.accentColor}60`;
                  }}
                >
                  Close Details
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}