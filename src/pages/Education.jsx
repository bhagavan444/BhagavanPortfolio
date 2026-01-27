import { useState, useEffect, useRef } from "react";
import {
  GraduationCap, Calendar, MapPin, Brain, Code, Trophy,
  Sparkles, BookOpen, X, CheckCircle2, ExternalLink, Award,
  TrendingUp, Zap, Star, ChevronRight, Globe, Users, Target,
  Rocket, Eye, Film, Play, Layers, Activity, Box, Cpu, Database,
  GitBranch, Briefcase, Terminal, Shield, Flame
} from "lucide-react";

// Replace with your actual image paths
import rceeImage from "../assets/Rcee.jpg";
import sriImage from "../assets/SRI.jpg";
import monteImage from "../assets/Monte.jpg";

const education = [
  {
    id: 1,
    title: "B.Tech – Artificial Intelligence & Data Science",
    school: "Ramachandra College of Engineering (JNTUK)",
    year: "2022 – 2026",
    score: "7.9 CGPA",
    desc: "Specialized in building intelligent, data-driven systems using Machine Learning, Deep Learning, and Full-Stack Development. Leading AI projects and building production-ready applications with focus on scalable architectures and cutting-edge neural networks.",
    color: "#00f5ff",
    glowRGB: "0, 245, 255",
    image: rceeImage,
    location: "Eluru, Andhra Pradesh",
    coreSubjects: ["Machine Learning", "Deep Learning", "AI", "DSA", "Big Data", "Computer Vision", "NLP", "DBMS"],
    tools: ["Python", "TensorFlow", "PyTorch", "React", "Node.js", "MongoDB", "Docker", "Git"],
    skills: ["Machine Learning", "Deep Learning", "MERN Stack", "Computer Vision", "MLOps", "Neural Networks"],
    achievements: [
      "AI & ML Internship Experience",
      "Top 10% Academic Performer",
      "Multiple Full-Stack AI Projects",
      "24-Hour Hackathon Participant",
      "15+ Professional Certifications",
      "Published Research Work"
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
    desc: "Pre-engineering curriculum with focus on analytical thinking, mathematical reasoning, and problem-solving. Built strong foundation for engineering studies with emphasis on computational mathematics and physics principles.",
    color: "#a855f7",
    glowRGB: "168, 85, 247",
    image: sriImage,
    location: "Vijayawada, Andhra Pradesh",
    coreSubjects: ["Advanced Mathematics", "Physics", "Chemistry"],
    tools: ["Scientific Computing", "Mathematical Modeling", "Problem Analysis"],
    skills: ["Problem Solving", "Logical Reasoning", "Analytical Thinking"],
    achievements: ["Top Performer in Mathematics", "Strong Academic Foundation", "Excellence in Science"],
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
    desc: "Achieved academic excellence with exceptional performance in Mathematics and Science. Demonstrated discipline, leadership, and consistent top-tier results across all subjects with perfect attendance.",
    color: "#ff6b35",
    glowRGB: "255, 107, 53",
    image: monteImage,
    location: "Vijayawada, Andhra Pradesh",
    coreSubjects: ["Mathematics", "Science", "English"],
    tools: ["Academic Excellence", "Research Methods", "Presentation Skills"],
    skills: ["Discipline", "Critical Thinking", "Leadership"],
    achievements: ["School Topper", "Perfect GPA", "Mathematics Excellence Award"],
    badge: "EXCELLENCE",
    icon: Trophy,
    progress: 95,
    gradient: "linear-gradient(135deg, #ff6b35 0%, #ff8c42 100%)"
  }
];

export default function AdvancedEducation() {
  const [hoveredId, setHoveredId] = useState(null);
  const [activeEdu, setActiveEdu] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [visibleCards, setVisibleCards] = useState({});
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState([]);
  const [cursorTrail, setCursorTrail] = useState([]);
  const [time, setTime] = useState(0);
  const canvasRef = useRef(null);
  const matrixCanvasRef = useRef(null);

  // Advanced Particle System
  useEffect(() => {
    const newParticles = Array.from({ length: 80 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      duration: Math.random() * 30 + 25,
      delay: Math.random() * 8,
      opacity: Math.random() * 0.8 + 0.3,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: Math.random() * 0.3 + 0.2
    }));
    setParticles(newParticles);
  }, []);

  // Time-based animations
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(prev => prev + 0.016);
    }, 16);
    return () => clearInterval(interval);
  }, []);

  // Enhanced mouse movement with parallax
  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 60;
      const y = (e.clientY / window.innerHeight - 0.5) * 60;
      setMousePosition({ x, y });

      setCursorTrail(prev => [
        ...prev.slice(-15),
        { x: e.clientX, y: e.clientY, id: Date.now() }
      ]);
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

  // Advanced Neural Network Canvas Background
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
      radius: Math.random() * 2.5 + 1,
      connections: []
    }));

    const animate = () => {
      ctx.fillStyle = 'rgba(0,0,0,0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      nodes.forEach(node => {
        node.x += node.vx;
        node.y += node.vy;
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

        // Draw node with glow
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, node.radius * 3);
        gradient.addColorStop(0, 'rgba(0, 245, 255, 0.8)');
        gradient.addColorStop(1, 'rgba(0, 245, 255, 0)');
        ctx.fillStyle = gradient;
        ctx.fill();

        // Draw connections
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

  // Matrix Rain Effect
  useEffect(() => {
    const canvas = matrixCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()';
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = 'rgba(0, 245, 255, 0.15)';
      ctx.font = fontSize + 'px monospace';

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
      
      animationId = requestAnimationFrame(draw);
    };
    draw();

    window.addEventListener('resize', resize);
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=Rajdhani:wght@300;400;500;600;700&family=Space+Mono:wght@400;700&family=Inter:wght@300;400;500;600;700;800;900&display=swap');

        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
          font-family: 'Inter', 'Rajdhani', sans-serif; 
          background: #000; 
          color: #fff; 
          overflow-x: hidden;
          cursor: none;
        }

        /* ═══════════════════════════════════════════════════════════ */
        /* ENTERPRISE CURSOR SYSTEM */
        /* ═══════════════════════════════════════════════════════════ */
        .custom-cursor {
          position: fixed;
          width: 24px;
          height: 24px;
          border: 2px solid #00f5ff;
          border-radius: 50%;
          pointer-events: none;
          z-index: 9999;
          mix-blend-mode: screen;
          transition: transform 0.15s ease-out, border-color 0.3s;
        }

        .custom-cursor.active {
          transform: scale(1.5);
          border-color: #a855f7;
        }

        .cursor-trail {
          position: fixed;
          width: 10px;
          height: 10px;
          background: radial-gradient(circle, rgba(0, 245, 255, 0.8), transparent);
          border-radius: 50%;
          pointer-events: none;
          z-index: 9998;
          animation: fadeTrail 1s ease-out forwards;
        }

        @keyframes fadeTrail {
          to { 
            opacity: 0; 
            transform: scale(0.3);
          }
        }

        /* ═══════════════════════════════════════════════════════════ */
        /* CINEMATIC ANIMATIONS */
        /* ═══════════════════════════════════════════════════════════ */
        @keyframes cinematic-reveal {
          0% { 
            opacity: 0; 
            transform: translateY(120px) scale(0.85) rotateX(-15deg);
            filter: blur(15px);
          }
          100% { 
            opacity: 1; 
            transform: translateY(0) scale(1) rotateX(0);
            filter: blur(0);
          }
        }

        @keyframes float-3d {
          0%, 100% { transform: translateY(0) rotateX(0deg) rotateY(0deg); }
          33% { transform: translateY(-25px) rotateX(5deg) rotateY(5deg); }
          66% { transform: translateY(-15px) rotateX(-3deg) rotateY(-3deg); }
        }

        @keyframes rotate-border {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes pulse-glow {
          0%, 100% { 
            box-shadow: 0 0 25px currentColor,
                        0 0 50px currentColor;
          }
          50% { 
            box-shadow: 0 0 50px currentColor,
                        0 0 100px currentColor,
                        0 0 150px currentColor;
          }
        }

        @keyframes neon-flicker {
          0%, 100% { opacity: 1; }
          41% { opacity: 1; }
          42% { opacity: 0.75; }
          43% { opacity: 1; }
          45% { opacity: 0.3; }
          46% { opacity: 1; }
        }

        @keyframes hologram-scan {
          0% { transform: translateY(-100%) scaleY(2); opacity: 0.3; }
          50% { opacity: 0.5; }
          100% { transform: translateY(100%) scaleY(2); opacity: 0.3; }
        }

        @keyframes particle-float {
          0% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-100vh) rotate(720deg); opacity: 0; }
        }

        @keyframes shimmer {
          0% { transform: translateX(-100%) skewX(-15deg); }
          100% { transform: translateX(200%) skewX(-15deg); }
        }

        @keyframes expand-card {
          0% { transform: scale(0.75) rotateY(-25deg); opacity: 0; }
          100% { transform: scale(1) rotateY(0); opacity: 1; }
        }

        @keyframes slide-up {
          from { transform: translateY(50px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        @keyframes border-flow {
          0% { border-color: #00f5ff; }
          33% { border-color: #a855f7; }
          66% { border-color: #ff6b35; }
          100% { border-color: #00f5ff; }
        }

        @keyframes data-flow {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        /* ═══════════════════════════════════════════════════════════ */
        /* GLASS MORPHISM PREMIUM */
        /* ═══════════════════════════════════════════════════════════ */
        .glass-card {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(30px) saturate(200%);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 28px;
          position: relative;
          overflow: hidden;
          transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
          transform-style: preserve-3d;
          perspective: 1500px;
        }

        .glass-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: -150%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
          transition: left 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .glass-card:hover::before {
          left: 150%;
        }

        .glass-card:hover {
          transform: translateY(-25px) scale(1.03) rotateX(8deg);
          border-color: var(--card-color);
          box-shadow: 
            0 50px 120px var(--card-glow),
            0 0 80px var(--card-glow) inset,
            0 5px 0 var(--card-color);
        }

        /* ═══════════════════════════════════════════════════════════ */
        /* EDUCATION CARDS ADVANCED */
        /* ═══════════════════════════════════════════════════════════ */
        .edu-card {
          animation: cinematic-reveal 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0;
        }

        .edu-card.visible {
          animation: expand-card 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .edu-card::after {
          content: '';
          position: absolute;
          inset: -2px;
          background: var(--card-gradient);
          border-radius: 28px;
          z-index: -1;
          opacity: 0;
          transition: opacity 0.6s;
        }

        .edu-card:hover::after {
          opacity: 0.15;
        }

        /* ═══════════════════════════════════════════════════════════ */
        /* PREMIUM BUTTONS MNC-LEVEL */
        /* ═══════════════════════════════════════════════════════════ */
        .premium-btn {
          position: relative;
          background: var(--btn-gradient);
          border: none;
          color: #000;
          font-weight: 800;
          cursor: pointer;
          overflow: hidden;
          font-family: 'Orbitron', sans-serif;
          text-transform: uppercase;
          letter-spacing: 2.5px;
          transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 10px 40px var(--btn-glow);
        }

        .premium-btn::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          background: rgba(255, 255, 255, 0.4);
          border-radius: 50%;
          transform: translate(-50%, -50%);
          transition: width 0.7s, height 0.7s;
        }

        .premium-btn::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
          transform: translateX(-100%);
          animation: shimmer 3s infinite;
        }

        .premium-btn:hover::before {
          width: 400px;
          height: 400px;
        }

        .premium-btn:hover {
          transform: translateY(-8px) scale(1.08);
          box-shadow: 0 30px 80px var(--btn-glow);
        }

        .outline-btn {
          background: transparent;
          border: 3px solid var(--btn-color);
          color: var(--btn-color);
          font-weight: 700;
          cursor: pointer;
          font-family: 'Orbitron', sans-serif;
          text-transform: uppercase;
          letter-spacing: 2.5px;
          transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative;
          overflow: hidden;
        }

        .outline-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: var(--btn-color);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
          z-index: -1;
        }

        .outline-btn::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle, rgba(255,255,255,0.3), transparent 70%);
          transform: translate(-50%, -50%) scale(0);
          transition: transform 0.6s;
        }

        .outline-btn:hover::before {
          transform: scaleX(1);
        }

        .outline-btn:hover::after {
          transform: translate(-50%, -50%) scale(1);
        }

        .outline-btn:hover {
          color: #000;
          transform: translateY(-8px) scale(1.05);
          box-shadow: 0 25px 70px var(--btn-glow);
        }

        /* ═══════════════════════════════════════════════════════════ */
        /* SKILL TAGS PREMIUM */
        /* ═══════════════════════════════════════════════════════════ */
        .skill-tag {
          background: rgba(0, 0, 0, 0.8);
          border: 2px solid currentColor;
          padding: 0.75rem 1.5rem;
          border-radius: 999px;
          font-family: 'Space Mono', monospace;
          font-size: 0.875rem;
          font-weight: 600;
          transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative;
          overflow: hidden;
        }

        .skill-tag::before {
          content: '';
          position: absolute;
          inset: 0;
          background: currentColor;
          opacity: 0;
          transition: opacity 0.5s;
        }

        .skill-tag::after {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
          transition: left 0.5s;
        }

        .skill-tag:hover::before {
          opacity: 0.25;
        }

        .skill-tag:hover::after {
          left: 100%;
        }

        .skill-tag:hover {
          transform: translateY(-6px) scale(1.12);
          box-shadow: 0 18px 50px currentColor;
        }

        /* ═══════════════════════════════════════════════════════════ */
        /* STAT CARDS ELITE */
        /* ═══════════════════════════════════════════════════════════ */
        .stat-card {
          background: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(15px);
          border: 2.5px solid;
          border-radius: 24px;
          padding: 2.5rem;
          text-align: center;
          transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
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
          background: currentColor;
          opacity: 0.12;
          border-radius: 50%;
          transform: translate(-50%, -50%);
          transition: width 0.7s, height 0.7s;
        }

        .stat-card::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, transparent, rgba(255,255,255,0.05), transparent);
          opacity: 0;
          transition: opacity 0.6s;
        }

        .stat-card:hover::before {
          width: 500px;
          height: 500px;
        }

        .stat-card:hover::after {
          opacity: 1;
        }

        .stat-card:hover {
          transform: translateY(-18px) scale(1.08);
          box-shadow: 0 35px 90px currentColor;
        }

        /* ═══════════════════════════════════════════════════════════ */
        /* NEON TEXT ADVANCED */
        /* ═══════════════════════════════════════════════════════════ */
        .neon-text {
          text-shadow: 
            0 0 12px currentColor,
            0 0 25px currentColor,
            0 0 50px currentColor,
            0 0 100px currentColor;
          animation: neon-flicker 5s linear infinite;
        }

        /* ═══════════════════════════════════════════════════════════ */
        /* HOLOGRAM EFFECT PREMIUM */
        /* ═══════════════════════════════════════════════════════════ */
        .hologram {
          position: relative;
          overflow: hidden;
        }

        .hologram::after {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(
            to bottom,
            transparent 35%,
            rgba(0, 245, 255, 0.2) 50%,
            transparent 65%
          );
          animation: hologram-scan 4s linear infinite;
          pointer-events: none;
        }

        /* ═══════════════════════════════════════════════════════════ */
        /* PROGRESS SYSTEMS */
        /* ═══════════════════════════════════════════════════════════ */
        .progress-ring {
          transform: rotate(-90deg);
          filter: drop-shadow(0 0 15px currentColor);
        }

        .progress-bar {
          height: 8px;
          background: rgba(255,255,255,0.1);
          border-radius: 999px;
          overflow: hidden;
          position: relative;
        }

        .progress-fill {
          height: 100%;
          background: var(--progress-gradient);
          border-radius: 999px;
          position: relative;
          overflow: hidden;
          transition: width 1.5s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .progress-fill::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent);
          animation: shimmer 2s infinite;
        }

        /* ═══════════════════════════════════════════════════════════ */
        /* SCROLL ANIMATIONS */
        /* ═══════════════════════════════════════════════════════════ */
        .scroll-reveal {
          opacity: 0;
          transform: translateY(60px);
          transition: all 1s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .scroll-reveal.visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* ═══════════════════════════════════════════════════════════ */
        /* RESPONSIVE DESIGN */
        /* ═══════════════════════════════════════════════════════════ */
        @media (max-width: 1024px) {
          .edu-grid { grid-template-columns: 1fr !important; }
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }

        @media (max-width: 768px) {
          body { cursor: default; }
          .custom-cursor, .cursor-trail { display: none; }
          .stats-grid { grid-template-columns: 1fr !important; }
          .glass-card:hover {
            transform: translateY(-15px) scale(1.02);
          }
        }

        @media (max-width: 480px) {
          .premium-btn, .outline-btn {
            padding: 1rem 2rem !important;
            font-size: 0.85rem !important;
          }
        }
      `}</style>

      {/* Enterprise Cursor System */}
      <div 
        className={`custom-cursor ${hoveredId ? 'active' : ''}`}
        style={{
          left: cursorTrail[cursorTrail.length - 1]?.x || 0,
          top: cursorTrail[cursorTrail.length - 1]?.y || 0,
          transform: 'translate(-50%, -50%)'
        }}
      />
      
      {cursorTrail.slice(-12).map((point, i) => (
        <div
          key={point.id}
          className="cursor-trail"
          style={{
            left: point.x,
            top: point.y,
            transform: 'translate(-50%, -50%)',
            animationDelay: `${i * 0.04}s`
          }}
        />
      ))}

      <div style={{ minHeight: '100vh', background: '#000', position: 'relative', overflow: 'hidden' }}>
        {/* Multi-layer Progress Bar */}
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, height: '5px',
          zIndex: 10000, background: 'rgba(0,0,0,0.5)'
        }}>
          <div style={{
            width: `${scrollProgress}%`,
            height: '100%',
            background: 'linear-gradient(90deg, #00f5ff 0%, #a855f7 50%, #ff6b35 100%)',
            boxShadow: '0 0 30px currentColor',
            transition: 'width 0.1s',
            position: 'relative'
          }}>
            <div style={{
              position: 'absolute',
              right: 0,
              top: '50%',
              transform: 'translateY(-50%)',
              width: '20px',
              height: '20px',
              background: '#fff',
              borderRadius: '50%',
              boxShadow: '0 0 20px #fff',
              animation: 'pulse-glow 2s infinite'
            }} />
          </div>
        </div>

        {/* Advanced Particle System */}
        {particles.map(particle => (
          <div
            key={particle.id}
            style={{
              position: 'fixed',
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              background: 'rgba(0, 245, 255, 0.7)',
              borderRadius: '50%',
              pointerEvents: 'none',
              animation: `particle-float ${particle.duration}s linear infinite`,
              animationDelay: `${particle.delay}s`,
              opacity: particle.opacity,
              boxShadow: '0 0 15px rgba(0, 245, 255, 0.9), 0 0 30px rgba(0, 245, 255, 0.5)',
              zIndex: 1
            }}
          />
        ))}

        {/* Multi-layer Background System */}
        <div style={{
          position: 'fixed', inset: 0,
          background: `
            radial-gradient(circle at 15% 85%, rgba(0, 245, 255, 0.18) 0%, transparent 50%),
            radial-gradient(circle at 85% 15%, rgba(168, 85, 247, 0.18) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, rgba(255, 107, 53, 0.12) 0%, transparent 50%)
          `,
          opacity: 0.6, pointerEvents: 'none', zIndex: 1
        }} />

        {/* Neural Network Canvas */}
        <canvas ref={canvasRef} style={{ 
          position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 2,
          opacity: 0.7
        }} />

        {/* Matrix Rain Canvas */}
        <canvas ref={matrixCanvasRef} style={{ 
          position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 1,
          opacity: 0.3
        }} />

        {/* Dynamic Floating Orbs */}
        <div style={{
          position: 'fixed', 
          top: '8%', 
          right: '-8%', 
          width: '700px', 
          height: '700px',
          border: '3px solid rgba(0, 245, 255, 0.12)', 
          borderRadius: '50%',
          animation: 'rotate-border 40s linear infinite', 
          pointerEvents: 'none',
          transform: `translate(${mousePosition.x * 0.9}px, ${mousePosition.y * 0.9}px)`,
          transition: 'transform 0.3s ease-out'
        }}>
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '50%',
            height: '50%',
            border: '2px solid rgba(168, 85, 247, 0.15)',
            borderRadius: '50%',
            transform: 'translate(-50%, -50%)',
            animation: 'rotate-border 25s linear infinite reverse'
          }} />
        </div>

        <div style={{
          position: 'fixed', 
          bottom: '-8%', 
          left: '-8%', 
          width: '600px', 
          height: '600px',
          border: '3px solid rgba(168, 85, 247, 0.12)', 
          borderRadius: '50%',
          animation: 'rotate-border 50s linear infinite reverse', 
          pointerEvents: 'none',
          transform: `translate(${-mousePosition.x * 0.8}px, ${-mousePosition.y * 0.8}px)`,
          transition: 'transform 0.3s ease-out'
        }}>
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '60%',
            height: '60%',
            border: '2px solid rgba(255, 107, 53, 0.15)',
            borderRadius: '50%',
            transform: 'translate(-50%, -50%)',
            animation: 'rotate-border 30s linear infinite'
          }} />
        </div>

        <div style={{
          position: 'relative', zIndex: 10, maxWidth: '1700px', margin: '0 auto',
          padding: '0 clamp(1rem, 4vw, 3rem)', 
          paddingTop: 'clamp(5rem, 12vw, 8rem)', 
          paddingBottom: '8rem'
        }}>
          {/* Elite Header Section */}
          <div style={{ textAlign: 'center', marginBottom: 'clamp(5rem, 10vw, 8rem)' }}>
            {/* Animated Badge */}
            <div style={{
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '1rem',
              fontFamily: "'Space Mono', monospace", 
              color: '#00f5ff',
              fontSize: 'clamp(0.85rem, 2vw, 1.05rem)', 
              padding: '1rem 2.5rem',
              border: '2.5px solid rgba(0, 245, 255, 0.6)', 
              borderRadius: '999px',
              marginBottom: '2.5rem', 
              background: 'rgba(0, 245, 255, 0.08)',
              animation: 'pulse-glow 3.5s infinite, border-flow 8s infinite',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 10px 40px rgba(0, 245, 255, 0.3)',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                animation: 'data-flow 3s infinite'
              }} />
              <Terminal size={20} strokeWidth={2.5} />
              <span style={{ position: 'relative', zIndex: 1, fontWeight: 700, letterSpacing: '1.5px' }}>
                EDUCATION.NEURAL_NETWORK.INITIALIZED
              </span>
              <Activity size={20} strokeWidth={2.5} />
            </div>

            {/* Main Title */}
            <h1 className="neon-text" style={{
              fontSize: 'clamp(3.5rem, 11vw, 7.5rem)', 
              fontWeight: 900,
              fontFamily: "'Orbitron', sans-serif", 
              letterSpacing: '8px',
              textTransform: 'uppercase', 
              marginBottom: '2rem', 
              lineHeight: 1,
              color: '#00f5ff',
              textShadow: `
                0 0 20px #00f5ff,
                0 0 40px #00f5ff,
                0 0 60px #00f5ff,
                0 0 80px #00f5ff,
                0 0 100px #a855f7,
                0 0 120px #a855f7
              `,
              position: 'relative'
            }}>
              ACADEMIC ODYSSEY
              <div style={{
                position: 'absolute',
                bottom: '-15px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '200px',
                height: '4px',
                background: 'linear-gradient(90deg, transparent, #00f5ff, transparent)',
                boxShadow: '0 0 20px #00f5ff',
                animation: 'pulse-glow 2s infinite'
              }} />
            </h1>

            {/* Subtitle */}
            <p style={{
              fontSize: 'clamp(1.15rem, 2.8vw, 1.45rem)', 
              color: '#c0c8e0',
              maxWidth: '900px', 
              margin: '0 auto 4rem',
              fontFamily: "'Inter', sans-serif", 
              lineHeight: 1.9, 
              fontWeight: 500,
              letterSpacing: '0.5px'
            }}>
              From foundational excellence to cutting-edge AI mastery — a transformative journey through innovation, technology, and academic achievement
              <br/>
              <span style={{ 
                color: '#00f5ff', 
                fontFamily: "'Space Mono', monospace",
                fontSize: '1.1rem',
                display: 'inline-block',
                marginTop: '1rem',
                padding: '0.5rem 1.5rem',
                background: 'rgba(0, 245, 255, 0.1)',
                borderRadius: '999px',
                border: '1px solid rgba(0, 245, 255, 0.3)'
              }}>
                [ 2019 → 2026 ]
              </span>
              <span style={{ 
                color: '#a855f7',
                marginLeft: '1rem',
                fontWeight: 700
              }}> • 7 Years of Innovation & Growth</span>
            </p>

            {/* Elite Stats Grid */}
            <div className="stats-grid" style={{
              display: 'grid', 
              gridTemplateColumns: 'repeat(4, 1fr)', 
              gap: '2rem',
              maxWidth: '1300px', 
              margin: '0 auto'
            }}>
              {[
                { label: "Journey", value: "7Y", icon: Calendar, color: "#00f5ff", desc: "Duration" },
                { label: "Excellence", value: "86%", icon: TrendingUp, color: "#a855f7", desc: "Avg Score" },
                { label: "Milestones", value: "20+", icon: Award, color: "#ff6b35", desc: "Achievements" },
                { label: "Tech Arsenal", value: "30+", icon: Zap, color: "#00f5ff", desc: "Technologies" }
              ].map((stat, i) => (
                <div key={i} className="stat-card scroll-reveal" style={{
                  borderColor: stat.color, 
                  color: stat.color,
                  animationDelay: `${i * 0.15}s`,
                  '--progress-gradient': `linear-gradient(135deg, ${stat.color}, ${stat.color}dd)`
                }}>
                  <div style={{ marginBottom: '1.5rem', position: 'relative' }}>
                    <div style={{
                      width: '60px',
                      height: '60px',
                      margin: '0 auto',
                      borderRadius: '16px',
                      background: `rgba(${stat.color === '#00f5ff' ? '0, 245, 255' : stat.color === '#a855f7' ? '168, 85, 247' : '255, 107, 53'}, 0.15)`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: `2px solid ${stat.color}`,
                      boxShadow: `0 0 30px ${stat.color}55`
                    }}>
                      <stat.icon size={32} strokeWidth={2.5} />
                    </div>
                  </div>
                  <div style={{
                    fontSize: 'clamp(2.8rem, 6vw, 3.5rem)', 
                    fontWeight: 900, 
                    marginBottom: '0.8rem',
                    fontFamily: "'Orbitron', sans-serif",
                    lineHeight: 1
                  }}>
                    {stat.value}
                  </div>
                  <div style={{
                    fontSize: '1rem', 
                    opacity: 0.95,
                    textTransform: 'uppercase', 
                    letterSpacing: '2px', 
                    fontWeight: 700,
                    marginBottom: '0.5rem'
                  }}>
                    {stat.label}
                  </div>
                  <div style={{
                    fontSize: '0.85rem',
                    opacity: 0.7,
                    fontFamily: "'Space Mono', monospace"
                  }}>
                    {stat.desc}
                  </div>
                  {/* Animated Progress Bar */}
                  <div className="progress-bar" style={{ 
                    marginTop: '1.5rem',
                    '--progress-gradient': `linear-gradient(90deg, ${stat.color}, ${stat.color}aa)`
                  }}>
                    <div className="progress-fill" style={{ 
                      width: `${parseInt(stat.value)}%`,
                      background: `linear-gradient(90deg, ${stat.color}, ${stat.color}dd)`
                    }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Premium Education Cards Grid */}
          <div className="edu-grid" style={{
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))',
            gap: 'clamp(3rem, 6vw, 5rem)', 
            marginBottom: '8rem'
          }}>
            {education.map((edu, i) => {
              const isHovered = hoveredId === edu.id;
              const isVisible = visibleCards[edu.id];

              return (
                <div
                  key={edu.id}
                  data-id={edu.id}
                  data-observe
                  className={`glass-card edu-card ${isVisible ? 'visible' : ''}`}
                  onMouseEnter={() => setHoveredId(edu.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onClick={() => setActiveEdu(edu)}
                  style={{
                    '--card-color': edu.color,
                    '--card-glow': `rgba(${edu.glowRGB}, 0.5)`,
                    '--card-gradient': edu.gradient,
                    animationDelay: `${i * 0.2}s`,
                    cursor: 'pointer'
                  }}
                >
                  {/* Premium Top Accent */}
                  <div style={{
                    position: 'absolute', 
                    top: 0, 
                    left: 0, 
                    right: 0, 
                    height: '6px',
                    background: `linear-gradient(90deg, transparent, ${edu.color}, transparent)`,
                    opacity: isHovered ? 1 : 0.7, 
                    transition: 'opacity 0.6s',
                    boxShadow: `0 0 20px ${edu.color}`
                  }} />

                  {/* Elite Image Section */}
                  <div className="hologram" style={{
                    height: '340px', 
                    position: 'relative', 
                    overflow: 'hidden'
                  }}>
                    <img src={edu.image} alt={edu.school} style={{
                      width: '100%', 
                      height: '100%', 
                      objectFit: 'cover',
                      transition: 'transform 1s cubic-bezier(0.16, 1, 0.3, 1)',
                      transform: isHovered ? 'scale(1.25)' : 'scale(1.1)'
                    }} />

                    {/* Multi-layer Gradient Overlay */}
                    <div style={{
                      position: 'absolute', 
                      inset: 0,
                      background: `
                        linear-gradient(to top, rgba(0,0,0,0.98) 0%, rgba(0,0,0,0.7) 30%, transparent 70%),
                        linear-gradient(135deg, rgba(${edu.glowRGB}, 0.15), transparent)
                      `
                    }} />

                    {/* Advanced Progress Circle */}
                    <div style={{
                      position: 'absolute', 
                      top: '50%', 
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      opacity: isHovered ? 1 : 0, 
                      transition: 'opacity 0.8s'
                    }}>
                      <svg width="160" height="160" className="progress-ring">
                        <circle cx="80" cy="80" r="70" fill="none"
                          stroke="rgba(0, 245, 255, 0.15)" strokeWidth="8" />
                        <circle cx="80" cy="80" r="70" fill="none"
                          stroke={edu.color} strokeWidth="8"
                          strokeDasharray={440} 
                          strokeDashoffset={440 * (1 - edu.progress / 100)}
                          strokeLinecap="round" 
                          style={{ transition: 'stroke-dashoffset 1.5s cubic-bezier(0.16, 1, 0.3, 1)' }} />
                      </svg>
                      <div style={{
                        position: 'absolute', 
                        top: '50%', 
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        textAlign: 'center'
                      }}>
                        <div style={{
                          fontSize: '2.5rem', 
                          fontWeight: 900, 
                          color: edu.color,
                          fontFamily: "'Orbitron', sans-serif",
                          textShadow: `0 0 30px ${edu.color}`
                        }}>
                          {edu.progress}%
                        </div>
                        <div style={{
                          fontSize: '0.75rem',
                          color: '#fff',
                          fontFamily: "'Space Mono', monospace",
                          marginTop: '0.3rem',
                          opacity: 0.8
                        }}>
                          COMPLETED
                        </div>
                      </div>
                    </div>

                    {/* Premium Badge */}
                    <div style={{
                      position: 'absolute', 
                      top: '25px', 
                      right: '25px',
                      padding: '0.7rem 1.6rem', 
                      background: `rgba(${edu.glowRGB}, 0.25)`,
                      backdropFilter: 'blur(15px)', 
                      border: `2.5px solid ${edu.color}`,
                      borderRadius: '999px', 
                      fontSize: '0.9rem', 
                      fontWeight: 900,
                      color: edu.color, 
                      animation: 'pulse-glow 3s infinite',
                      fontFamily: "'Space Mono', monospace",
                      letterSpacing: '1.5px',
                      boxShadow: `0 10px 40px rgba(${edu.glowRGB}, 0.4)`
                    }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}>
                        <Flame size={16} />
                        {edu.badge}
                      </div>
                    </div>

                    {/* Year Badge - Bottom Left */}
                    <div style={{
                      position: 'absolute',
                      bottom: '25px',
                      left: '25px',
                      padding: '0.6rem 1.4rem',
                      background: 'rgba(0, 0, 0, 0.8)',
                      backdropFilter: 'blur(10px)',
                      border: `2px solid ${edu.color}`,
                      borderRadius: '999px',
                      fontSize: '0.95rem',
                      fontWeight: 700,
                      color: edu.color,
                      fontFamily: "'Space Mono', monospace"
                    }}>
                      {edu.year}
                    </div>
                  </div>

                  {/* Elite Content Section */}
                  <div style={{ 
                    padding: 'clamp(2rem, 5vw, 3rem) clamp(1.8rem, 4vw, 2.8rem)' 
                  }}>
                    {/* Icon Header */}
                    <div style={{
                      display: 'flex', 
                      justifyContent: 'space-between',
                      alignItems: 'center', 
                      marginBottom: '2rem'
                    }}>
                      <div style={{
                        width: '85px', 
                        height: '85px', 
                        border: `3.5px solid ${edu.color}`,
                        borderRadius: '20px', 
                        display: 'flex', 
                        alignItems: 'center',
                        justifyContent: 'center', 
                        background: `rgba(${edu.glowRGB}, 0.1)`,
                        animation: isHovered ? 'float-3d 3.5s ease-in-out infinite' : 'none',
                        boxShadow: isHovered ? `0 0 50px ${edu.color}` : `0 0 20px ${edu.color}55`,
                        transition: 'all 0.6s',
                        position: 'relative',
                        overflow: 'hidden'
                      }}>
                        <div style={{
                          position: 'absolute',
                          inset: 0,
                          background: edu.gradient,
                          opacity: isHovered ? 0.2 : 0,
                          transition: 'opacity 0.6s'
                        }} />
                        <edu.icon size={42} style={{ color: edu.color, position: 'relative', zIndex: 1 }} strokeWidth={2.5} />
                      </div>

                      <div style={{
                        textAlign: 'right'
                      }}>
                        <div style={{
                          fontSize: '0.8rem',
                          color: '#999',
                          fontFamily: "'Space Mono', monospace",
                          marginBottom: '0.3rem',
                          textTransform: 'uppercase',
                          letterSpacing: '1px'
                        }}>
                          Performance
                        </div>
                        <div style={{
                          fontSize: '2rem',
                          fontWeight: 900,
                          color: edu.color,
                          fontFamily: "'Orbitron', sans-serif",
                          textShadow: `0 0 20px ${edu.color}`
                        }}>
                          {edu.score.split(' ')[0]}
                        </div>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 style={{
                      fontSize: 'clamp(1.7rem, 4.5vw, 2.1rem)', 
                      fontWeight: 800,
                      background: `linear-gradient(135deg, ${edu.color}, #fff)`,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      marginBottom: '1rem', 
                      lineHeight: 1.25,
                      fontFamily: "'Inter', sans-serif",
                      letterSpacing: '-0.5px'
                    }}>
                      {edu.title}
                    </h3>

                    {/* School */}
                    <div style={{
                      fontSize: '1.15rem', 
                      color: '#c0c8e0', 
                      marginBottom: '0.8rem',
                      fontFamily: "'Inter', sans-serif", 
                      fontWeight: 600,
                      letterSpacing: '0.3px'
                    }}>
                      {edu.school}
                    </div>

                    {/* Location */}
                    <div style={{
                      fontSize: '1rem', 
                      color: '#a0a8c0', 
                      marginBottom: '2rem',
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '0.6rem',
                      fontFamily: "'Space Mono', monospace"
                    }}>
                      <MapPin size={18} />
                      {edu.location}
                    </div>

                    {/* Description */}
                    <p style={{
                      fontSize: '1rem',
                      color: '#b0b8d0',
                      lineHeight: 1.8,
                      marginBottom: '2rem',
                      fontFamily: "'Inter', sans-serif"
                    }}>
                      {edu.desc}
                    </p>

                    {/* Premium Skills Section */}
                    <div style={{ marginBottom: '2.5rem' }}>
                      <div style={{
                        fontSize: '0.85rem',
                        color: edu.color,
                        fontFamily: "'Space Mono', monospace",
                        marginBottom: '1rem',
                        fontWeight: 700,
                        letterSpacing: '1.5px',
                        textTransform: 'uppercase'
                      }}>
                        &lt;Core_Competencies/&gt;
                      </div>
                      <div style={{
                        display: 'flex', 
                        flexWrap: 'wrap', 
                        gap: '0.8rem'
                      }}>
                        {edu.skills.slice(0, 6).map(skill => (
                          <span key={skill} className="skill-tag" style={{
                            color: isHovered ? edu.color : '#b0e0ff',
                            borderColor: isHovered ? edu.color : 'rgba(0, 245, 255, 0.5)'
                          }}>
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Key Achievements */}
                    <div style={{ marginBottom: '2.5rem' }}>
                      <div style={{
                        fontSize: '0.85rem',
                        color: edu.color,
                        fontFamily: "'Space Mono', monospace",
                        marginBottom: '1rem',
                        fontWeight: 700,
                        letterSpacing: '1.5px',
                        textTransform: 'uppercase'
                      }}>
                        &lt;Key_Achievements/&gt;
                      </div>
                      <div style={{
                        display: 'flex', 
                        flexDirection: 'column', 
                        gap: '1rem'
                      }}>
                        {edu.achievements.slice(0, 3).map((ach, idx) => (
                          <div key={idx} style={{
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: '1rem',
                            fontSize: '0.98rem', 
                            color: '#d8dce8',
                            fontFamily: "'Inter', sans-serif",
                            padding: '0.8rem',
                            background: 'rgba(255, 255, 255, 0.02)',
                            borderRadius: '12px',
                            border: '1px solid rgba(255, 255, 255, 0.05)',
                            transition: 'all 0.4s'
                          }}
                          onMouseEnter={e => {
                            e.currentTarget.style.background = `rgba(${edu.glowRGB}, 0.08)`;
                            e.currentTarget.style.borderColor = edu.color;
                          }}
                          onMouseLeave={e => {
                            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)';
                            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)';
                          }}>
                            <CheckCircle2 size={20} style={{ color: edu.color, flexShrink: 0 }} strokeWidth={2.5} />
                            <span>{ach}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Premium CTA Button */}
                    <button
                      className="premium-btn"
                      onClick={(e) => { e.stopPropagation(); setActiveEdu(edu); }}
                      style={{
                        '--btn-gradient': edu.gradient,
                        '--btn-glow': `rgba(${edu.glowRGB}, 0.6)`,
                        width: '100%', 
                        padding: '1.4rem',
                        borderRadius: '999px', 
                        fontSize: '1.05rem',
                        display: 'flex', 
                        alignItems: 'center',
                        justifyContent: 'center', 
                        gap: '1rem',
                        position: 'relative', 
                        zIndex: 1
                      }}
                    >
                      <BookOpen size={22} strokeWidth={2.5} />
                      <span style={{ position: 'relative', zIndex: 1 }}>EXPLORE FULL DETAILS</span>
                      <ChevronRight size={22} strokeWidth={2.5} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Elite Call to Action Section */}
          <div className="glass-card scroll-reveal" style={{
            padding: 'clamp(4rem, 10vw, 6rem) clamp(2rem, 5vw, 3.5rem)',
            textAlign: 'center', 
            marginTop: '8rem',
            borderColor: 'rgba(0, 245, 255, 0.4)',
            background: 'rgba(0, 20, 40, 0.4)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Animated Background Pattern */}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: `
                repeating-linear-gradient(90deg, rgba(0, 245, 255, 0.03) 0px, transparent 2px, transparent 40px),
                repeating-linear-gradient(0deg, rgba(0, 245, 255, 0.03) 0px, transparent 2px, transparent 40px)
              `,
              opacity: 0.5
            }} />

            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{
                fontSize: '1rem', 
                color: '#00f5ff', 
                marginBottom: '1.5rem',
                fontFamily: "'Space Mono', monospace", 
                letterSpacing: '2.5px',
                fontWeight: 700,
                display: 'inline-block',
                padding: '0.6rem 1.8rem',
                border: '2px solid rgba(0, 245, 255, 0.4)',
                borderRadius: '999px',
                background: 'rgba(0, 245, 255, 0.05)'
              }}>
                &lt;COLLABORATION_PROTOCOL.ACTIVE&gt;
              </div>

              <h2 className="neon-text" style={{
                fontSize: 'clamp(2.8rem, 8vw, 5rem)', 
                fontWeight: 900,
                fontFamily: "'Orbitron', sans-serif",
                background: 'linear-gradient(135deg, #00f5ff, #a855f7, #ff6b35, #00f5ff)',
                backgroundSize: '200% auto',
                WebkitBackgroundClip: 'text', 
                WebkitTextFillColor: 'transparent',
                marginBottom: '2.5rem',
                letterSpacing: '4px',
                animation: 'shimmer 6s linear infinite'
              }}>
                LET'S BUILD THE FUTURE TOGETHER
              </h2>

              <p style={{
                fontSize: 'clamp(1.15rem, 2.8vw, 1.4rem)', 
                color: '#c0c8e0',
                maxWidth: '850px', 
                margin: '0 auto 4rem', 
                lineHeight: 2,
                fontFamily: "'Inter', sans-serif",
                fontWeight: 500
              }}>
                Whether it's cutting-edge AI research, innovative full-stack solutions,
                or revolutionary projects that push boundaries — let's collaborate to create
                something extraordinary that shapes tomorrow's technology landscape.
              </p>

              <div style={{
                display: 'flex', 
                gap: '2.5rem', 
                justifyContent: 'center',
                flexWrap: 'wrap',
                marginBottom: '3rem'
              }}>
                <a
                  href="https://github.com/bhagavan444"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="outline-btn"
                  style={{
                    '--btn-color': '#00f5ff',
                    '--btn-glow': 'rgba(0, 245, 255, 0.6)',
                    padding: '1.5rem 3.5rem', 
                    borderRadius: '999px',
                    fontSize: '1.05rem', 
                    textDecoration: 'none',
                    display: 'inline-flex', 
                    alignItems: 'center', 
                    gap: '1.2rem',
                    position: 'relative', 
                    zIndex: 1
                  }}
                >
                  <GitBranch size={24} strokeWidth={2.5} />
                  <span>VIEW PROJECTS</span>
                  <ExternalLink size={24} strokeWidth={2.5} />
                </a>

                <a
                  href="mailto:g.sivasatyasaibhagavan@gmail.com"
                  className="premium-btn"
                  style={{
                    '--btn-gradient': 'linear-gradient(135deg, #a855f7, #7c3aed)',
                    '--btn-glow': 'rgba(168, 85, 247, 0.6)',
                    padding: '1.5rem 3.5rem', 
                    borderRadius: '999px',
                    fontSize: '1.05rem', 
                    textDecoration: 'none',
                    display: 'inline-flex', 
                    alignItems: 'center', 
                    gap: '1.2rem',
                    position: 'relative', 
                    zIndex: 1
                  }}
                >
                  <Sparkles size={24} strokeWidth={2.5} />
                  <span style={{ position: 'relative', zIndex: 1 }}>START CONVERSATION</span>
                  <Rocket size={24} strokeWidth={2.5} />
                </a>
              </div>

              {/* Tech Stack Pills */}
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '1rem',
                justifyContent: 'center',
                marginBottom: '2rem'
              }}>
                {['AI/ML', 'Full-Stack', 'Cloud', 'DevOps', 'Research'].map((tech, i) => (
                  <div key={tech} style={{
                    padding: '0.6rem 1.5rem',
                    background: 'rgba(0, 245, 255, 0.08)',
                    border: '1.5px solid rgba(0, 245, 255, 0.3)',
                    borderRadius: '999px',
                    fontSize: '0.9rem',
                    color: '#00f5ff',
                    fontFamily: "'Space Mono', monospace",
                    fontWeight: 600,
                    animation: `slide-up 0.8s ease-out ${i * 0.1}s both`
                  }}>
                    {tech}
                  </div>
                ))}
              </div>

              <div style={{
                marginTop: '3rem', 
                fontSize: '0.95rem',
                color: '#00f5ff', 
                fontFamily: "'Space Mono', monospace",
                fontWeight: 700,
                letterSpacing: '1.5px'
              }}>
                &lt;/READY_FOR_INNOVATION_2026&gt;
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Elite Modal */}
      {activeEdu && (
        <div onClick={() => setActiveEdu(null)} style={{
          position: 'fixed', 
          inset: 0, 
          background: 'rgba(0, 0, 0, 0.98)',
          backdropFilter: 'blur(25px)', 
          zIndex: 9999,
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          padding: '2rem',
          animation: 'fadeIn 0.4s ease-out'
        }}>
          <div onClick={e => e.stopPropagation()} style={{
            background: 'rgba(8, 8, 35, 0.98)', 
            border: `5px solid ${activeEdu.color}`,
            borderRadius: '32px', 
            maxWidth: '1500px', 
            width: '98%',
            maxHeight: '94vh', 
            overflowY: 'auto', 
            position: 'relative',
            boxShadow: `0 0 200px rgba(${activeEdu.glowRGB}, 0.7), 
                        0 0 100px rgba(${activeEdu.glowRGB}, 0.5) inset`,
            animation: 'expand-card 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
          }}>
            {/* Close Button */}
            <button onClick={() => setActiveEdu(null)} style={{
              position: 'absolute', 
              top: '2rem', 
              right: '2.5rem',
              background: 'rgba(255, 107, 53, 0.2)', 
              border: '2px solid #ff6b35',
              borderRadius: '50%',
              width: '60px',
              height: '60px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ff6b35',
              cursor: 'pointer', 
              zIndex: 10, 
              transition: 'all 0.4s',
              backdropFilter: 'blur(10px)'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'rotate(90deg) scale(1.1)';
              e.currentTarget.style.background = 'rgba(255, 107, 53, 0.4)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'rotate(0deg) scale(1)';
              e.currentTarget.style.background = 'rgba(255, 107, 53, 0.2)';
            }}>
              <X size={32} strokeWidth={3} />
            </button>

            {/* Modal Hero Image */}
            <div className="hologram" style={{
              height: '50vh', 
              overflow: 'hidden', 
              position: 'relative',
              borderRadius: '32px 32px 0 0'
            }}>
              <img src={activeEdu.image} alt={activeEdu.school} style={{
                width: '100%', 
                height: '100%', 
                objectFit: 'cover'
              }} />
              <div style={{
                position: 'absolute', 
                inset: 0,
                background: `
                  linear-gradient(to top, rgba(0,0,0,0.98) 0%, rgba(0,0,0,0.6) 40%, transparent 70%),
                  linear-gradient(135deg, rgba(${activeEdu.glowRGB}, 0.2), transparent)
                `
              }} />
              
              {/* Floating Stats on Image */}
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                display: 'flex',
                gap: '3rem',
                flexWrap: 'wrap',
                justifyContent: 'center'
              }}>
                {[
                  { label: 'Duration', value: activeEdu.year, icon: Calendar },
                  { label: 'Score', value: activeEdu.score, icon: Star },
                  { label: 'Progress', value: `${activeEdu.progress}%`, icon: TrendingUp }
                ].map((stat, i) => (
                  <div key={i} style={{
                    background: 'rgba(0, 0, 0, 0.8)',
                    backdropFilter: 'blur(20px)',
                    border: `3px solid ${activeEdu.color}`,
                    borderRadius: '20px',
                    padding: '1.5rem 2rem',
                    textAlign: 'center',
                    minWidth: '180px',
                    boxShadow: `0 10px 40px rgba(${activeEdu.glowRGB}, 0.4)`
                  }}>
                    <stat.icon size={28} style={{ color: activeEdu.color, marginBottom: '0.8rem' }} />
                    <div style={{
                      fontSize: '1.8rem',
                      fontWeight: 900,
                      color: activeEdu.color,
                      fontFamily: "'Orbitron', sans-serif",
                      marginBottom: '0.3rem'
                    }}>
                      {stat.value}
                    </div>
                    <div style={{
                      fontSize: '0.85rem',
                      color: '#999',
                      textTransform: 'uppercase',
                      letterSpacing: '1.5px',
                      fontFamily: "'Space Mono', monospace"
                    }}>
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Content */}
            <div style={{
              padding: 'clamp(3rem, 7vw, 5.5rem) clamp(2.5rem, 6vw, 5rem) 6rem'
            }}>
              {/* Title Section */}
              <h2 style={{
                fontSize: 'clamp(2.8rem, 7vw, 4.5rem)', 
                fontWeight: 900,
                fontFamily: "'Orbitron', sans-serif",
                background: `linear-gradient(135deg, ${activeEdu.color}, #fff, ${activeEdu.color})`,
                backgroundSize: '200% auto',
                WebkitBackgroundClip: 'text', 
                WebkitTextFillColor: 'transparent',
                marginBottom: '2rem',
                letterSpacing: '2px',
                animation: 'shimmer 6s linear infinite'
              }}>
                {activeEdu.title}
              </h2>

              {/* Meta Information */}
              <div style={{
                display: 'flex', 
                flexWrap: 'wrap', 
                gap: '2.5rem',
                marginBottom: '4rem', 
                fontSize: '1.25rem', 
                color: '#d8dce8',
                fontFamily: "'Inter', sans-serif"
              }}>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '1rem',
                  padding: '0.8rem 1.5rem',
                  background: 'rgba(255, 255, 255, 0.03)',
                  borderRadius: '12px',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}>
                  <GraduationCap size={26} style={{ color: activeEdu.color }} />
                  {activeEdu.school}
                </div>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '1rem',
                  padding: '0.8rem 1.5rem',
                  background: 'rgba(255, 255, 255, 0.03)',
                  borderRadius: '12px',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}>
                  <MapPin size={26} style={{ color: activeEdu.color }} />
                  {activeEdu.location}
                </div>
              </div>

              {/* Description */}
              <p style={{
                fontSize: 'clamp(1.2rem, 3vw, 1.5rem)', 
                lineHeight: 2,
                color: '#d0d8f0', 
                marginBottom: '5rem',
                fontFamily: "'Inter', sans-serif",
                fontWeight: 500
              }}>
                {activeEdu.desc}
              </p>

              {/* Detailed Sections Grid */}
              <div style={{
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                gap: '3.5rem', 
                marginBottom: '4rem'
              }}>
                {/* Core Subjects */}
                <div className="glass-card" style={{ 
                  padding: '2.5rem',
                  borderColor: `rgba(${activeEdu.glowRGB}, 0.3)`
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    marginBottom: '2rem'
                  }}>
                    <Database size={28} style={{ color: activeEdu.color }} />
                    <h3 style={{
                      fontSize: '1.6rem', 
                      color: activeEdu.color,
                      fontFamily: "'Space Mono', monospace",
                      fontWeight: 700,
                      letterSpacing: '1px'
                    }}>
                      CORE_SUBJECTS
                    </h3>
                  </div>
                  <div style={{ 
                    display: 'flex', 
                    flexWrap: 'wrap', 
                    gap: '1rem' 
                  }}>
                    {activeEdu.coreSubjects.map(sub => (
                      <span key={sub} className="skill-tag" style={{
                        color: activeEdu.color, 
                        borderColor: activeEdu.color
                      }}>
                        {sub}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Tools & Technologies */}
                <div className="glass-card" style={{ 
                  padding: '2.5rem',
                  borderColor: `rgba(${activeEdu.glowRGB}, 0.3)`
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    marginBottom: '2rem'
                  }}>
                    <Cpu size={28} style={{ color: activeEdu.color }} />
                    <h3 style={{
                      fontSize: '1.6rem', 
                      color: activeEdu.color,
                      fontFamily: "'Space Mono', monospace",
                      fontWeight: 700,
                      letterSpacing: '1px'
                    }}>
                      TOOLS_TECH
                    </h3>
                  </div>
                  <div style={{ 
                    display: 'flex', 
                    flexWrap: 'wrap', 
                    gap: '1rem' 
                  }}>
                    {activeEdu.tools.map(tool => (
                      <span key={tool} className="skill-tag" style={{
                        color: activeEdu.color, 
                        borderColor: activeEdu.color
                      }}>
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Key Skills */}
                <div className="glass-card" style={{ 
                  padding: '2.5rem',
                  borderColor: `rgba(${activeEdu.glowRGB}, 0.3)`
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    marginBottom: '2rem'
                  }}>
                    <Zap size={28} style={{ color: activeEdu.color }} />
                    <h3 style={{
                      fontSize: '1.6rem', 
                      color: activeEdu.color,
                      fontFamily: "'Space Mono', monospace",
                      fontWeight: 700,
                      letterSpacing: '1px'
                    }}>
                      KEY_SKILLS
                    </h3>
                  </div>
                  <div style={{ 
                    display: 'flex', 
                    flexWrap: 'wrap', 
                    gap: '1rem' 
                  }}>
                    {activeEdu.skills.map(skill => (
                      <span key={skill} className="skill-tag" style={{
                        color: activeEdu.color, 
                        borderColor: activeEdu.color
                      }}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Achievements Section */}
              <div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1.2rem',
                  marginBottom: '2.5rem'
                }}>
                  <Shield size={32} style={{ color: activeEdu.color }} />
                  <h3 style={{
                    fontSize: '2rem', 
                    color: activeEdu.color,
                    fontFamily: "'Space Mono', monospace",
                    fontWeight: 700,
                    letterSpacing: '1.5px'
                  }}>
                    ACHIEVEMENTS
                  </h3>
                </div>
                <div style={{
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))',
                  gap: '1.8rem'
                }}>
                  {activeEdu.achievements.map((ach, idx) => (
                    <div key={idx} className="glass-card" style={{
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '1.5rem',
                      padding: '1.8rem', 
                      borderColor: `rgba(${activeEdu.glowRGB}, 0.3)`,
                      transition: 'all 0.4s'
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.transform = 'translateX(10px)';
                      e.currentTarget.style.borderColor = activeEdu.color;
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.transform = 'translateX(0)';
                      e.currentTarget.style.borderColor = `rgba(${activeEdu.glowRGB}, 0.3)`;
                    }}>
                      <div style={{
                        width: '50px',
                        height: '50px',
                        borderRadius: '12px',
                        background: `rgba(${activeEdu.glowRGB}, 0.15)`,
                        border: `2px solid ${activeEdu.color}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}>
                        <Award size={26} style={{ color: activeEdu.color }} strokeWidth={2.5} />
                      </div>
                      <span style={{ 
                        fontSize: '1.1rem', 
                        color: '#f0f0ff',
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 500
                      }}>
                        {ach}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Modal CTA */}
              <div style={{ 
                marginTop: '5rem', 
                textAlign: 'center',
                paddingTop: '4rem',
                borderTop: `2px solid rgba(${activeEdu.glowRGB}, 0.2)`
              }}>
                <div style={{
                  fontSize: '1rem',
                  color: activeEdu.color,
                  fontFamily: "'Space Mono', monospace",
                  marginBottom: '2rem',
                  letterSpacing: '2px',
                  fontWeight: 700
                }}>
                  INTERESTED IN COLLABORATION?
                </div>
                <a
                  href="mailto:g.sivasatyasaibhagavan@gmail.com"
                  className="premium-btn"
                  style={{
                    '--btn-gradient': activeEdu.gradient,
                    '--btn-glow': `rgba(${activeEdu.glowRGB}, 0.7)`,
                    padding: '1.8rem 4.5rem', 
                    borderRadius: '999px',
                    fontSize: '1.3rem', 
                    textDecoration: 'none',
                    display: 'inline-flex', 
                    alignItems: 'center', 
                    gap: '1.5rem',
                    position: 'relative', 
                    zIndex: 1
                  }}
                >
                  <Rocket size={28} strokeWidth={2.5} />
                  <span style={{ position: 'relative', zIndex: 1 }}>
                    LET'S COLLABORATE
                  </span>
                  <Sparkles size={28} strokeWidth={2.5} />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}