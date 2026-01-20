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
  ChevronRight,
  CheckCircle,
  Flame,
  Compass,
  Layers,
  Lightbulb,
  ArrowRight
} from "lucide-react";

// Replace with your actual image paths
import rceeImage from "../assets/Rcee.jpg";
import sriImage from "../assets/SRI.jpg";
import monteImage from "../assets/Monte.jpg";

const education = [
  {
    id: 1,
    title: "B.Tech AI&DS",
    school: "Ramachandra College of Engineering (JNTUK)",
    year: "2022 – 2026",
    score: "75%",
    cgpa: "8.5",
    desc: "Focused on designing intelligent systems using Machine Learning, Deep Learning, and Data Science. Gained hands-on experience with Python, TensorFlow, MERN stack, and real-world AI applications.",
    gradient: "from-cyan-500 via-blue-500 to-purple-600",
    accentColor: "#06b6d4",
    icon: "🚀",
    badge: "CURRENT",
    image: rceeImage,
    location: "Eluru, Andhra Pradesh",
    skills: ["Machine Learning", "Deep Learning", "MERN Stack", "Computer Vision", "MLOps", "Neural Networks"],
    achievements: ["AI Specialist", "Full-Stack Developer", "Top 10% Academic Performance", "Multiple AI Projects"]
  },
  {
    id: 2,
    title: "Intermediate (MPC)",
    school: "Srividhya Junior College",
    year: "2020 – 2022",
    score: "78%",
    cgpa: "7.8",
    desc: "Completed intensive coursework in Mathematics, Physics, and Chemistry with strong emphasis on analytical problem-solving and logical reasoning.",
    gradient: "from-purple-500 via-pink-500 to-rose-500",
    accentColor: "#ec4899",
    icon: "🔬",
    badge: "FOUNDATION",
    image: sriImage,
    location: "Vijayawada, Andhra Pradesh",
    skills: ["Advanced Mathematics", "Physics", "Chemistry", "Analytical Thinking", "Scientific Method"],
    achievements: ["Science Excellence", "Top Performer", "Strong Analytical Foundation"]
  },
  {
    id: 3,
    title: "Secondary School (10th Class)",
    school: "Montessori English Medium High School",
    year: "2019 – 2020",
    score: "95%",
    cgpa: "10.0",
    desc: "Established strong academic foundation with excellence in Mathematics and Science. Demonstrated consistent top-tier performance and disciplined study habits.",
    gradient: "from-emerald-500 via-teal-500 to-cyan-500",
    accentColor: "#10b981",
    icon: "🌟",
    badge: "EXCELLENCE",
    image: monteImage,
    location: "Vijayawada, Andhra Pradesh",
    skills: ["Mathematics Mastery", "Scientific Method", "Critical Thinking", "Discipline", "Leadership"],
    achievements: ["School Topper", "Perfect Score", "Top 5% State Rank"]
  }
];

export default function Education() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showModal, setShowModal] = useState(false);
  const [selectedEdu, setSelectedEdu] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [timelineHover, setTimelineHover] = useState(null);
  const containerRef = useRef(null);

  // Mouse position tracking for parallax effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100
        });
      }
    };

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress((scrollTop / docHeight) * 100);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);

    // Auto-rotate timeline
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % education.length);
    }, 7000);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      clearInterval(interval);
    };
  }, []);

  const openModal = (edu) => {
    setSelectedEdu(edu);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setTimeout(() => setSelectedEdu(null), 300);
  };

  return (
    <div
      ref={containerRef}
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom, #000000, #0a0e1a, #000000)",
        color: "#ffffff",
        fontFamily: "'Inter', system-ui, sans-serif",
        position: "relative",
        overflow: "hidden",
        padding: "clamp(80px, 10vh, 120px) clamp(20px, 5vw, 60px)"
      }}
    >
      {/* Global Keyframes */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Orbitron:wght@400;700;900&display=swap');

        @keyframes float { 0%, 100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-30px) rotate(5deg); } }
        @keyframes pulse-glow { 0%, 100% { filter: drop-shadow(0 0 30px currentColor) drop-shadow(0 0 60px currentColor); opacity: 1; } 50% { filter: drop-shadow(0 0 50px currentColor) drop-shadow(0 0 100px currentColor); opacity: 0.85; } }
        @keyframes slide-up { from { opacity: 0; transform: translateY(80px) scale(0.95); } to { opacity: 1; transform: translateY(0) scale(1); } }
        @keyframes rotate-border { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes shimmer { 0% { transform: translateX(-100%) skewX(-15deg); } 100% { transform: translateX(200%) skewX(-15deg); } }
        @keyframes gradient-shift { 0%, 100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }
        @keyframes bounce-in { 0% { opacity: 0; transform: scale(0.3) translateY(100px); } 50% { transform: scale(1.08); } 70% { transform: scale(0.97); } 100% { opacity: 1; transform: scale(1) translateY(0); } }
        @keyframes orbit { 0%, 100% { transform: translate(0, 0) scale(1); } 25% { transform: translate(50px, -40px) scale(1.15); } 50% { transform: translate(-40px, 50px) scale(0.9); } 75% { transform: translate(40px, 40px) scale(1.1); } }
        @keyframes text-glow { 0%, 100% { text-shadow: 0 0 20px currentColor, 0 0 40px currentColor, 0 0 60px currentColor; } 50% { text-shadow: 0 0 30px currentColor, 0 0 60px currentColor, 0 0 90px currentColor; } }
        @keyframes holographic { 0% { transform: translateX(-100%) translateY(-50%); } 100% { transform: translateX(100%) translateY(-50%); } }
        @keyframes particle-float { 0% { transform: translate(0, 0); opacity: 0.7; } 50% { opacity: 0.3; } 100% { transform: translate(0, -100px); opacity: 0; } }
        @keyframes laser-scan { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
        @keyframes cinematic-reveal { from { opacity: 0; transform: scale(0.9) translateY(50px); } to { opacity: 1; transform: scale(1) translateY(0); } }
        @keyframes modal-enter { from { opacity: 0; transform: scale(0.9) translateY(50px); } to { opacity: 1; transform: scale(1) translateY(0); } }
        @keyframes modal-bg { from { opacity: 0; } to { opacity: 1; } }
      `}</style>

      {/* Background Effects */}
      <div style={{ position: "fixed", inset: "0", zIndex: "0", pointerEvents: "none" }}>
        {/* Epic space gradient orbs */}
        <div style={{
          position: "absolute",
          inset: "0",
          background: "radial-gradient(circle at 20% 20%, rgba(6,182,212,0.3), transparent 50%), radial-gradient(circle at 80% 80%, rgba(236,72,153,0.3), transparent 50%), radial-gradient(circle at 50% 50%, rgba(139,92,246,0.25), transparent 60%)",
          mixBlendMode: "screen"
        }} />

        {/* Laser grid */}
        <div style={{
          position: "absolute",
          inset: "0",
          backgroundImage: "linear-gradient(45deg, rgba(6,182,212,0.08) 1px, transparent 1px), linear-gradient(-45deg, rgba(6,182,212,0.08) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          opacity: "0.4",
          animation: "holographic 25s linear infinite"
        }} />

        {/* Floating particles */}
        {[...Array(100)].map((_, i) => (
          <div key={i} style={{
            position: "absolute",
            width: `${1 + Math.random() * 4}px`,
            height: `${1 + Math.random() * 4}px`,
            borderRadius: "50%",
            background: `hsl(${180 + Math.random() * 180}, 100%, ${70 + Math.random() * 30}%)`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            opacity: 0.6,
            animation: `particle-float ${15 + Math.random() * 20}s linear infinite ${Math.random() * 10}s`,
            boxShadow: `0 0 ${15 + Math.random() * 30}px currentColor`
          }} />
        ))}

        {/* Mouse-following cinematic light */}
        <div style={{
          position: "absolute",
          width: "1400px",
          height: "1400px",
          borderRadius: "50%",
          background: "radial-gradient(circle at center, rgba(6,182,212,0.25), transparent 70%)",
          left: `${mousePosition.x}%`,
          top: `${mousePosition.y}%`,
          transform: "translate(-50%, -50%)",
          filter: "blur(120px)",
          transition: "all 0.9s cubic-bezier(0.23, 1, 0.32, 1)",
          mixBlendMode: "screen"
        }} />

        {/* Cinematic vignette */}
        <div style={{
          position: "absolute",
          inset: "0",
          background: "radial-gradient(circle at center, transparent 30%, rgba(0,0,0,0.7) 100%)",
          pointerEvents: "none"
        }} />
      </div>

      {/* Main Content */}
      <div style={{ position: "relative", zIndex: "10", maxWidth: "1600px", margin: "0 auto" }}>
        {/* Hero Header */}
        <div style={{ textAlign: "center", marginBottom: "clamp(80px, 12vh, 140px)" }}>
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "20px",
            padding: "20px 48px",
            background: "linear-gradient(135deg, rgba(6,182,212,0.2), rgba(59,130,246,0.2))",
            backdropFilter: "blur(40px)",
            borderRadius: "100px",
            border: "2px solid rgba(6,182,212,0.4)",
            boxShadow: "0 25px 80px rgba(6,182,212,0.5), inset 0 1px 0 rgba(255,255,255,0.2)",
            marginBottom: "60px",
            animation: "slide-up 1.5s cubic-bezier(0.34, 1.56, 0.64, 1) backwards"
          }}>
            <GraduationCap size={36} style={{ color: "#06b6d4", filter: "drop-shadow(0 0 20px #06b6d4)" }} className="animate-pulse-glow" />
            <span style={{
              fontFamily: "'Orbitron', sans-serif",
              fontSize: "clamp(1.1rem, 2.8vw, 1.3rem)",
              fontWeight: "900",
              letterSpacing: "0.3em",
              background: "linear-gradient(90deg, #06b6d4, #3b82f6, #8b5cf6)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
              textTransform: "uppercase"
            }}>
              ACADEMIC ODYSSEY • 2020–2026
            </span>
            <Trophy size={32} style={{ color: "#fbbf24", filter: "drop-shadow(0 0 20px #fbbf24)" }} className="animate-pulse-glow" />
          </div>

          <h1 style={{
            fontFamily: "'Orbitron', sans-serif",
            fontSize: "clamp(3rem, 18vw, 10rem)",
            fontWeight: "900",
            lineHeight: "0.9",
            marginBottom: "40px",
            letterSpacing: "-0.03em",
            animation: "slide-up 1.5s cubic-bezier(0.34, 1.56, 0.64, 1) 0.2s backwards"
          }}>
            MY
            <br />
            <span style={{
              background: "linear-gradient(90deg, #06b6d4, #3b82f6, #8b5cf6, #ec4899, #06b6d4)",
              backgroundSize: "200% auto",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
              display: "inline-block",
              animation: "gradient-shift 12s linear infinite, text-glow 4s ease-in-out infinite"
            }}>
              EDUCATION JOURNEY
            </span>
          </h1>

          <p style={{
            fontSize: "clamp(1.3rem, 4vw, 1.8rem)",
            color: "#94a3b8",
            maxWidth: "1000px",
            margin: "0 auto",
            lineHeight: "1.8",
            fontWeight: "500",
            animation: "slide-up 1.5s cubic-bezier(0.34, 1.56, 0.64, 1) 0.4s backwards"
          }}>
            From <span style={{ color: "#34d399", fontWeight: "900", textShadow: "0 0 30px #34d399" }}>foundational brilliance</span> through 
            <span style={{ color: "#8b5cf6", fontWeight: "900", textShadow: "0 0 30px #8b5cf6" }}>scientific mastery</span> to 
            <span style={{ color: "#06b6d4", fontWeight: "900", textShadow: "0 0 30px #06b6d4" }}>AI revolution</span>
          </p>
        </div>

        {/* Interactive Timeline */}
        <div style={{ marginBottom: "clamp(100px, 15vh, 160px)", position: "relative" }}>
          <div style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "90%",
            height: "6px",
            background: "linear-gradient(90deg, transparent, rgba(6,182,212,0.4), rgba(6,182,212,0.4), transparent)",
            borderRadius: "100px",
            zIndex: "0"
          }} />

          <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "clamp(30px, 6vw, 80px)",
            marginBottom: "80px",
            position: "relative",
            zIndex: "1"
          }}>
            {education.map((edu, idx) => (
              <div key={edu.id} style={{ display: "flex", alignItems: "center", gap: "clamp(20px, 4vw, 60px)" }}>
                <button
                  onClick={() => setActiveIndex(idx)}
                  onMouseEnter={() => setTimelineHover(idx)}
                  onMouseLeave={() => setTimelineHover(null)}
                  style={{
                    position: "relative",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: "0",
                    transform: activeIndex === idx ? "scale(1.3)" : timelineHover === idx ? "scale(1.15)" : "scale(1)",
                    transition: "all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)"
                  }}
                >
                  {/* Holographic ring */}
                  <div style={{
                    position: "absolute",
                    inset: "-20px",
                    borderRadius: "50%",
                    background: `conic-gradient(from 0deg, ${edu.accentColor}, transparent 120deg, ${edu.accentColor} 240deg, transparent 360deg)`,
                    animation: "rotate-border 8s linear infinite",
                    filter: "blur(15px)",
                    opacity: activeIndex === idx ? "0.8" : "0.3"
                  }} />

                  {/* Main holographic sphere */}
                  <div style={{
                    width: "clamp(90px, 18vw, 140px)",
                    height: "clamp(90px, 18vw, 140px)",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "clamp(3rem, 8vw, 5rem)",
                    background: activeIndex === idx 
                      ? `linear-gradient(135deg, ${edu.accentColor}, ${edu.accentColor}cc)` 
                      : "rgba(15,20,35,0.7)",
                    border: `4px solid ${edu.accentColor}60`,
                    boxShadow: activeIndex === idx 
                      ? `0 0 60px ${edu.accentColor}80, inset 0 0 30px ${edu.accentColor}40` 
                      : "0 0 40px rgba(0,0,0,0.6)",
                    backdropFilter: "blur(25px)",
                    transition: "all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)",
                    position: "relative",
                    overflow: "hidden"
                  }}>
                    {/* Laser scan */}
                    <div style={{
                      position: "absolute",
                      inset: "-50%",
                      background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
                      animation: "laser-scan 3s infinite linear",
                      transform: "translateX(-100%)"
                    }} />
                    <span style={{ position: "relative", zIndex: "1", textShadow: "0 0 20px currentColor" }}>{edu.icon}</span>
                  </div>

                  {/* Year label */}
                  <div style={{
                    position: "absolute",
                    top: "calc(100% + 20px)",
                    left: "50%",
                    transform: "translateX(-50%)",
                    fontFamily: "'Orbitron', sans-serif",
                    fontSize: "clamp(1rem, 2.5vw, 1.2rem)",
                    fontWeight: "900",
                    color: activeIndex === idx ? edu.accentColor : "#64748b",
                    textShadow: activeIndex === idx ? `0 0 30px ${edu.accentColor}` : "none",
                    transition: "all 0.5s ease"
                  }}>
                    {edu.year}
                  </div>
                </button>

                {idx < education.length - 1 && (
                  <div style={{
                    width: "clamp(60px, 10vw, 120px)",
                    height: "6px",
                    background: idx < activeIndex ? `linear-gradient(90deg, ${education[idx].accentColor}, ${education[idx + 1].accentColor})` : "rgba(255,255,255,0.1)",
                    boxShadow: idx < activeIndex ? `0 0 30px ${education[idx].accentColor}` : "none",
                    animation: idx < activeIndex ? "shimmer 3s infinite" : "none"
                  }} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Image-Centric Education Blocks */}
        <div style={{ position: "relative", marginBottom: "clamp(100px, 15vh, 160px)" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "clamp(80px, 12vh, 120px)" }}>
            {education.map((edu, idx) => (
              <div
                key={edu.id}
                onClick={() => openModal(edu)}
                style={{
                  position: "relative",
                  height: "clamp(600px, 70vh, 800px)",
                  borderRadius: "40px",
                  overflow: "hidden",
                  cursor: "pointer",
                  transformStyle: "preserve-3d",
                  animation: `cinematic-reveal 1.5s cubic-bezier(0.34, 1.56, 0.64, 1) ${idx * 0.4}s backwards`,
                  boxShadow: "0 40px 120px rgba(0,0,0,0.8)",
                  transition: "all 1s cubic-bezier(0.34, 1.56, 0.64, 1)"
                }}
              >
                {/* Background Image */}
                <img
                  src={edu.image}
                  alt={edu.school}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    filter: "brightness(0.7) contrast(1.2)",
                    transform: "scale(1.1)",
                    transition: "all 1.5s ease"
                  }}
                />

                {/* Overlay Gradient */}
                <div style={{
                  position: "absolute",
                  inset: "0",
                  background: `linear-gradient(to bottom, transparent 30%, rgba(0,0,0,0.9) 70%), linear-gradient(135deg, rgba(0,0,0,0.4), transparent 50%)`
                }} />

                {/* Content Overlay */}
                <div style={{
                  position: "absolute",
                  inset: "0",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  padding: "clamp(40px, 8vw, 80px)",
                  background: "linear-gradient(to top, rgba(0,0,0,0.95), transparent 50%)"
                }}>
                  {/* Badge */}
                  <div style={{
                    alignSelf: "flex-start",
                    padding: "12px 28px",
                    borderRadius: "100px",
                    background: `linear-gradient(135deg, ${edu.accentColor}, ${edu.accentColor}cc)`,
                    boxShadow: `0 0 40px ${edu.accentColor}80`,
                    fontFamily: "'Orbitron', sans-serif",
                    fontWeight: "900",
                    fontSize: "clamp(1.2rem, 3vw, 1.5rem)",
                    marginBottom: "20px"
                  }}>
                    {edu.badge}
                  </div>

                  {/* Title */}
                  <h2 style={{
                    fontFamily: "'Orbitron', sans-serif",
                    fontSize: "clamp(3rem, 8vw, 6rem)",
                    fontWeight: "900",
                    marginBottom: "16px",
                    background: `linear-gradient(135deg, ${edu.accentColor}, #ffffff)`,
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    color: "transparent",
                    textShadow: `0 0 40px ${edu.accentColor}80`
                  }}>
                    {edu.title}
                  </h2>

                  {/* School & Year */}
                  <div style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "clamp(20px, 4vw, 40px)",
                    marginBottom: "24px"
                  }}>
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      fontSize: "clamp(1.2rem, 3vw, 1.5rem)",
                      fontWeight: "700"
                    }}>
                      <GraduationCap size={28} style={{ color: edu.accentColor }} />
                      {edu.school}
                    </div>
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      fontSize: "clamp(1.2rem, 3vw, 1.5rem)",
                      fontWeight: "700"
                    }}>
                      <Calendar size={28} style={{ color: "#fbbf24" }} />
                      {edu.year}
                    </div>
                  </div>

                  {/* Description */}
                  <p style={{
                    fontSize: "clamp(1.1rem, 2.8vw, 1.4rem)",
                    lineHeight: "1.7",
                    maxWidth: "800px",
                    marginBottom: "32px",
                    color: "#cbd5e1"
                  }}>
                    {edu.desc}
                  </p>

                  {/* Stats */}
                  <div style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "clamp(20px, 4vw, 40px)"
                  }}>
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      fontSize: "clamp(1.4rem, 3.5vw, 1.8rem)",
                      fontWeight: "900",
                      background: `linear-gradient(90deg, ${edu.accentColor}, #ffffff)`,
                      backgroundClip: "text",
                      WebkitBackgroundClip: "text",
                      color: "transparent"
                    }}>
                      {edu.score}
                      <span style={{ fontSize: "clamp(0.9rem, 2.2vw, 1.1rem)", color: "#94a3b8", fontWeight: "600" }}>SCORE</span>
                    </div>
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      fontSize: "clamp(1.4rem, 3.5vw, 1.8rem)",
                      fontWeight: "900",
                      color: "#ffffff"
                    }}>
                      {edu.cgpa}
                      <span style={{ fontSize: "clamp(0.9rem, 2.2vw, 1.1rem)", color: "#94a3b8", fontWeight: "600" }}>CGPA</span>
                    </div>
                  </div>
                </div>

                {/* Holographic overlay */}
                <div style={{
                  position: "absolute",
                  inset: "0",
                  border: `4px solid ${edu.accentColor}40`,
                  borderRadius: "40px",
                  animation: "pulse-glow 3s ease-in-out infinite",
                  pointerEvents: "none"
                }} />

                {/* Shimmer */}
                <div style={{
                  position: "absolute",
                  inset: "0",
                  background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
                  animation: "shimmer 6s infinite linear"
                }} />
              </div>
            ))}
          </div>
        </div>

        {/* Academic Stats Section */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "clamp(40px, 6vw, 80px)",
          marginBottom: "clamp(80px, 12vh, 120px)"
        }}>
          {[
            { icon: Brain, value: "8.5+", label: "CGPA", color: "#fbbf24", desc: "Academic Excellence" },
            { icon: Rocket, value: "AI/ML", label: "Focus Area", color: "#06b6d4", desc: "Future Technology" },
            { icon: Code, value: "15+", label: "Projects", color: "#f97316", desc: "Production Ready" },
            { icon: Trophy, value: "Top 10%", label: "Class Rank", color: "#8b5cf6", desc: "Consistent Performance" }
          ].map((stat, i) => (
            <div key={i} style={{
              padding: "clamp(40px, 6vw, 60px)",
              background: "linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))",
              backdropFilter: "blur(40px)",
              borderRadius: "40px",
              border: `3px solid ${stat.color}40`,
              textAlign: "center",
              boxShadow: `0 30px 100px ${stat.color}40`,
              animation: `bounce-in 1.5s cubic-bezier(0.34, 1.56, 0.64, 1) ${i * 0.2}s backwards`
            }}>
              <stat.icon size={80} style={{ color: stat.color, filter: `drop-shadow(0 0 40px ${stat.color})` }} className="animate-pulse-glow" />
              <div style={{
                fontSize: "clamp(4rem, 10vw, 6rem)",
                fontWeight: "900",
                background: `linear-gradient(135deg, ${stat.color}, #ffffff)`,
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
                margin: "20px 0"
              }}>
                {stat.value}
              </div>
              <div style={{
                fontSize: "clamp(1.8rem, 4vw, 2.2rem)",
                fontWeight: "900",
                color: "#ffffff"
              }}>
                {stat.label}
              </div>
              <div style={{
                fontSize: "clamp(1rem, 2.5vw, 1.3rem)",
                color: "#94a3b8",
                marginTop: "12px"
              }}>
                {stat.desc}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal - Cinematic Deep Dive */}
      {showModal && selectedEdu && (
        <div
          onClick={closeModal}
          style={{
            position: "fixed",
            inset: "0",
            zIndex: "1000",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(0,0,0,0.95)",
            backdropFilter: "blur(80px)",
            animation: "modal-bg 0.6s ease-out"
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "relative",
              width: "clamp(600px, 90vw, 1400px)",
              height: "clamp(80vh, 90vh, 95vh)",
              background: "linear-gradient(135deg, rgba(15,20,45,0.98), rgba(10,14,35,0.98))",
              borderRadius: "40px",
              overflowY: "auto",
              border: `5px solid ${selectedEdu.accentColor}60`,
              boxShadow: `0 0 100px ${selectedEdu.accentColor}80`,
              animation: "modal-enter 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) backwards"
            }}
          >
            <img
              src={selectedEdu.image}
              alt={selectedEdu.school}
              style={{
                position: "absolute",
                inset: "0",
                width: "100%",
                height: "100%",
                objectFit: "cover",
                filter: "brightness(0.5)",
                zIndex: "-1"
              }}
            />

            <div style={{
              position: "absolute",
              inset: "0",
              background: "linear-gradient(to bottom, transparent 30%, rgba(0,0,0,0.95) 70%)"
            }} />

            {/* Close Button */}
            <button
              onClick={closeModal}
              style={{
                position: "absolute",
                top: "clamp(30px, 5vw, 40px)",
                right: "clamp(30px, 5vw, 40px)",
                width: "70px",
                height: "70px",
                borderRadius: "50%",
                background: "rgba(239,68,68,0.3)",
                backdropFilter: "blur(30px)",
                border: "3px solid rgba(239,68,68,0.6)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: "10",
                transition: "all 0.4s ease"
              }}
              onMouseEnter={e => e.currentTarget.style.transform = "scale(1.15)"}
              onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
            >
              <X size={36} style={{ color: "#ef4444" }} />
            </button>

            {/* Modal Content */}
            <div style={{ padding: "clamp(40px, 8vw, 80px)" }}>
              <h1 style={{
                fontFamily: "'Orbitron', sans-serif",
                fontSize: "clamp(3.5rem, 10vw, 7rem)",
                fontWeight: "900",
                background: `linear-gradient(135deg, ${selectedEdu.accentColor}, #ffffff)`,
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
                marginBottom: "30px"
              }}>
                {selectedEdu.title}
              </h1>

              <p style={{
                fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
                color: "#ffffff",
                marginBottom: "40px"
              }}>
                {selectedEdu.school} • {selectedEdu.year}
              </p>

              <p style={{
                fontSize: "clamp(1.3rem, 3vw, 1.8rem)",
                lineHeight: "1.8",
                color: "#cbd5e1",
                marginBottom: "60px"
              }}>
                {selectedEdu.desc}
              </p>

              {/* Skills & Achievements Grid */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(40px, 6vw, 80px)" }}>
                <div>
                  <h3 style={{
                    fontFamily: "'Orbitron', sans-serif",
                    fontSize: "clamp(2rem, 5vw, 3rem)",
                    color: selectedEdu.accentColor,
                    marginBottom: "30px"
                  }}>
                    KEY SKILLS ACQUIRED
                  </h3>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
                    {selectedEdu.skills.map((skill, i) => (
                      <span key={i} style={{
                        padding: "16px 32px",
                        borderRadius: "100px",
                        background: `${selectedEdu.accentColor}30`,
                        border: `2px solid ${selectedEdu.accentColor}60`,
                        fontSize: "clamp(1.2rem, 3vw, 1.5rem)",
                        fontWeight: "700",
                        color: "#ffffff"
                      }}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 style={{
                    fontFamily: "'Orbitron', sans-serif",
                    fontSize: "clamp(2rem, 5vw, 3rem)",
                    color: selectedEdu.accentColor,
                    marginBottom: "30px"
                  }}>
                    MILESTONE ACHIEVEMENTS
                  </h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                    {selectedEdu.achievements.map((ach, i) => (
                      <div key={i} style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "20px",
                        fontSize: "clamp(1.3rem, 3vw, 1.8rem)"
                      }}>
                        <CheckCircle size={40} style={{ color: selectedEdu.accentColor }} />
                        <span style={{ color: "#ffffff" }}>{ach}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}