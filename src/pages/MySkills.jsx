import React, { useState, useEffect, useRef } from "react";
import {
  Code2, Database, Brain, Cloud, Layers, Zap, Cpu, Globe, Terminal,
  TrendingUp, Award, Star, ExternalLink, CheckCircle2, Rocket,
  GitBranch, Server, Lock, BarChart2, Settings, FileCode,
  Network, Wrench, Sparkles, Trophy, Target, Flame, Shield, Crown, 
  Hexagon, Activity, Box, Eye, Film, Play, Gauge, Crosshair, 
  Command, Briefcase, Code, ArrowRight, TrendingDown, Users,
  Lightbulb, Package, Workflow
} from "lucide-react";

const skills = [
  {
    id: 1,
    name: "Full-Stack Development",
    icon: Layers,
    level: 92,
    color: "#00f5ff",
    glowRGB: "0, 245, 255",
    rarity: "LEGENDARY",
    yearsActive: "4+",
    masteryRank: "S+",
    gradient: "linear-gradient(135deg, #00f5ff 0%, #0099ff 100%)",
    technologies: [
      "React", "Next.js", "Node.js", "Express", "MongoDB",
      "JWT", "OAuth 2.0", "REST APIs", "TypeScript", "Tailwind CSS"
    ],
    projects: 24,
    completionRate: 98,
    impact: "Built 24 production apps serving 10K+ users",
    usedIn: [
      "ATS Resume Builder Platform",
      "NexusAI – Multi-Modal AI Workspace",
      "Project Forge – AI Project Generator",
      "ArchMind – AI System Design Platform",
      "Production-Style AI Chatbot",
      "Hackathon Electronics Marketplace",
      "Internship Projects (StudyOwl)"
    ],
    howUsed: [
      "Built responsive & performant UI using React + Next.js",
      "Developed secure RESTful APIs with Node.js & Express",
      "Implemented JWT & OAuth authentication flows",
      "Designed MongoDB schemas with proper indexing & aggregation",
      "Integrated frontend with backend using Axios & fetch",
      "Used TypeScript for type-safe development",
      "Styled components with Tailwind CSS & custom animations"
    ],
    keyAchievements: [
      "🏆 Reduced load time by 60% through optimization",
      "🚀 Deployed 24 production-grade applications",
      "⚡ Achieved 98% uptime across all projects",
      "💎 Built real-time features with WebSocket"
    ],
    description:
      "Designed and developed end-to-end full-stack web applications with modern authentication, database integration, responsive UI, and production-ready architecture."
  },

  {
    id: 2,
    name: "Machine Learning",
    icon: Brain,
    level: 88,
    color: "#a855f7",
    glowRGB: "168, 85, 247",
    rarity: "EPIC",
    yearsActive: "3+",
    masteryRank: "S",
    gradient: "linear-gradient(135deg, #a855f7 0%, #7c3aed 100%)",
    technologies: [
      "Scikit-learn", "Pandas", "NumPy", "Matplotlib", "Seaborn",
      "Jupyter Notebook", "TF-IDF", "Feature Engineering", "Hyperparameter Tuning"
    ],
    projects: 18,
    completionRate: 94,
    impact: "Achieved 95%+ accuracy across 18 ML models",
    usedIn: [
      "TruthGuard AI – Fake News Detection",
      "Career Path Recommendation System",
      "Heart Disease Prediction Platform",
      "Blackbucks Internship Projects",
      "Academic ML Assignments"
    ],
    howUsed: [
      "Performed comprehensive data preprocessing & feature engineering",
      "Built classification & regression models using Scikit-learn",
      "Implemented TF-IDF for NLP-based text classification",
      "Evaluated models using accuracy, precision, recall, F1-score & ROC-AUC",
      "Optimized models with GridSearchCV & RandomizedSearchCV",
      "Visualized data insights using Matplotlib & Seaborn",
      "Documented experiments in Jupyter Notebooks"
    ],
    keyAchievements: [
      "🎯 95%+ accuracy on fake news detection",
      "📊 Processed 500K+ data points efficiently",
      "🔬 Published research-quality notebooks",
      "⚙️ Optimized models for 3x faster inference"
    ],
    description:
      "Developed high-accuracy machine learning models for classification, regression, and prediction tasks using structured and unstructured data."
  },

  {
    id: 3,
    name: "Deep Learning & AI",
    icon: Star,
    level: 87,
    color: "#ff6b35",
    glowRGB: "255, 107, 53",
    rarity: "LEGENDARY",
    yearsActive: "3+",
    masteryRank: "S",
    gradient: "linear-gradient(135deg, #ff6b35 0%, #ff8c42 100%)",
    technologies: [
      "TensorFlow", "Keras", "PyTorch", "CNN", "Computer Vision",
      "OpenCV", "Neural Networks", "Transfer Learning", "Image Augmentation"
    ],
    projects: 14,
    completionRate: 92,
    impact: "Deployed AI models with 92% accuracy in production",
    usedIn: [
      "Smart Sorting (AI/ML Internship)",
      "Image Classification Projects",
      "Healthy vs Rotten Fruit Detection",
      "Object Detection Experiments",
      "Deep Learning Academic Projects"
    ],
    howUsed: [
      "Designed custom CNN architectures for image classification",
      "Implemented transfer learning using pre-trained models (ResNet, VGG, EfficientNet)",
      "Performed image preprocessing, augmentation & normalization",
      "Trained & validated deep learning models with GPU acceleration",
      "Integrated trained models into Flask & React applications",
      "Deployed AI models for real-time inference",
      "Used OpenCV for image processing pipelines"
    ],
    keyAchievements: [
      "🧠 Built custom CNN architectures from scratch",
      "🎨 Real-time object detection at 30 FPS",
      "💫 Transfer learning with 92% accuracy",
      "🔥 GPU-accelerated training pipelines"
    ],
    description:
      "Built powerful deep learning models for computer vision and intelligent automation with real-world deployment experience."
  },

  {
    id: 4,
    name: "Cloud & DevOps",
    icon: Cloud,
    level: 85,
    color: "#00d4ff",
    glowRGB: "0, 212, 255",
    rarity: "EPIC",
    yearsActive: "3+",
    masteryRank: "A+",
    gradient: "linear-gradient(135deg, #00d4ff 0%, #0099cc 100%)",
    technologies: [
      "AWS EC2", "AWS S3", "AWS Lambda", "Docker", "GitHub Actions",
      "Linux Server Management", "Nginx", "CI/CD Basics"
    ],
    projects: 16,
    completionRate: 96,
    impact: "Managed infrastructure serving 50K+ requests/day",
    usedIn: [
      "AI Chatbot Deployment",
      "ML Flask Applications",
      "Portfolio & Web Projects",
      "Internship Deployment Tasks"
    ],
    howUsed: [
      "Deployed full-stack & ML applications on AWS EC2",
      "Stored & served assets using AWS S3",
      "Containerized applications with Docker",
      "Set up basic CI/CD pipelines using GitHub Actions",
      "Managed Linux servers (Ubuntu) for production deployment",
      "Configured Nginx as reverse proxy & SSL setup",
      "Optimized deployment for cost & performance"
    ],
    keyAchievements: [
      "☁️ Zero-downtime deployments achieved",
      "🐳 Containerized 16 production apps",
      "⚡ 40% cost reduction through optimization",
      "🔒 Implemented SSL/TLS security protocols"
    ],
    description:
      "Deployed and managed scalable, production-ready applications using cloud platforms and containerization tools."
  },

  {
    id: 5,
    name: "Data Science & Analytics",
    icon: Database,
    level: 90,
    color: "#b844f7",
    glowRGB: "184, 68, 247",
    rarity: "LEGENDARY",
    yearsActive: "3+",
    masteryRank: "S",
    gradient: "linear-gradient(135deg, #b844f7 0%, #9333ea 100%)",
    technologies: [
      "Pandas", "NumPy", "Matplotlib", "Seaborn", "Plotly",
      "SQL", "MySQL", "PostgreSQL", "Data Cleaning", "EDA"
    ],
    projects: 22,
    completionRate: 95,
    impact: "Analyzed 1M+ records to drive business insights",
    usedIn: [
      "ML Model Training Pipelines",
      "Internship Data Analysis Assignments",
      "Academic Data Science Projects",
      "Hackathon Data Challenges"
    ],
    howUsed: [
      "Cleaned & transformed large raw datasets using Pandas & NumPy",
      "Performed in-depth Exploratory Data Analysis (EDA)",
      "Visualized complex trends & insights using Matplotlib, Seaborn & Plotly",
      "Wrote efficient SQL queries for data extraction & analysis",
      "Prepared high-quality datasets for ML & DL pipelines",
      "Created interactive dashboards for data storytelling"
    ],
    keyAchievements: [
      "📈 Processed 1M+ data records efficiently",
      "🎨 Created 50+ interactive visualizations",
      "💡 Uncovered insights that drove key decisions",
      "⚡ Optimized queries for 10x faster execution"
    ],
    description:
      "Analyzed and processed complex datasets to extract meaningful insights and support advanced machine learning models."
  },

  {
    id: 6,
    name: "Core Programming & CS",
    icon: Code2,
    level: 94,
    color: "#ff4d6d",
    glowRGB: "255, 77, 109",
    rarity: "MYTHIC",
    yearsActive: "5+",
    masteryRank: "S++",
    gradient: "linear-gradient(135deg, #ff4d6d 0%, #ff6b8a 100%)",
    technologies: [
      "Python", "Java", "JavaScript", "TypeScript", "C++",
      "Data Structures & Algorithms", "OOP", "System Design Basics"
    ],
    projects: 32,
    completionRate: 97,
    impact: "Solved 500+ algorithmic problems, built 32 projects",
    usedIn: [
      "All Academic & Internship Projects",
      "LeetCode & HackerRank Practice",
      "Coding Competitions",
      "Technical Interview Preparation"
    ],
    howUsed: [
      "Implemented complex algorithms & data structures in Python & Java",
      "Applied OOP principles across multiple large-scale projects",
      "Solved 500+ coding problems on LeetCode & HackerRank",
      "Used JavaScript & TypeScript for modern web development",
      "Built strong foundation for scalable & maintainable systems",
      "Prepared for technical interviews with system design concepts"
    ],
    keyAchievements: [
      "🏅 500+ LeetCode problems solved",
      "🎖️ Top 5% on HackerRank",
      "🧩 Master of algorithms & data structures",
      "🌟 Built scalable system architectures"
    ],
    description:
      "Strong programming foundation with deep understanding of algorithms, data structures, OOP, and software design principles."
  }
];

export default function AdvancedSkills() {
  const [activeSkill, setActiveSkill] = useState(null);
  const [hoveredTech, setHoveredTech] = useState(null);
  const [filterRarity, setFilterRarity] = useState('ALL');
  const [particles, setParticles] = useState([]);
  const [cursorTrail, setCursorTrail] = useState([]);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [expandedSkill, setExpandedSkill] = useState(null);
  const canvasRef = useRef(null);
  const matrixCanvasRef = useRef(null);

  // Advanced Particle System
  useEffect(() => {
    const newParticles = Array.from({ length: 100 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      duration: Math.random() * 35 + 25,
      delay: Math.random() * 8,
      opacity: Math.random() * 0.8 + 0.3
    }));
    setParticles(newParticles);
  }, []);

  // Enhanced Mouse Movement
  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 50;
      const y = (e.clientY / window.innerHeight - 0.5) * 50;
      setMousePosition({ x, y });

      setCursorTrail(prev => [
        ...prev.slice(-15),
        { x: e.clientX, y: e.clientY, id: Date.now() }
      ]);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Scroll Progress
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress((scrolled / maxScroll) * 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Neural Network Canvas
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

    const nodes = Array.from({ length: 150 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 1,
      vy: (Math.random() - 0.5) * 1,
      radius: Math.random() * 2.5 + 1,
      hue: Math.random() * 60 + 180
    }));

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.06)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      nodes.forEach((node, i) => {
        node.x += node.vx;
        node.y += node.vy;
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

        // Draw connections
        nodes.forEach((other, j) => {
          if (i < j) {
            const dx = node.x - other.x;
            const dy = node.y - other.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 140) {
              ctx.strokeStyle = `hsla(${node.hue}, 100%, 60%, ${0.2 * (1 - dist / 140)})`;
              ctx.lineWidth = 0.8;
              ctx.beginPath();
              ctx.moveTo(node.x, node.y);
              ctx.lineTo(other.x, other.y);
              ctx.stroke();
            }
          }
        });

        // Draw node
        const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, node.radius * 5);
        gradient.addColorStop(0, `hsla(${node.hue}, 100%, 60%, 0.6)`);
        gradient.addColorStop(1, 'transparent');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * 5, 0, Math.PI * 2);
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
      
      ctx.fillStyle = 'rgba(0, 245, 255, 0.12)';
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

  const getRarityColor = (rarity) => {
    const colors = {
      'MYTHIC': '#ff00ff',
      'LEGENDARY': '#ffd700',
      'EPIC': '#a855f7',
      'RARE': '#00f5ff'
    };
    return colors[rarity] || '#00f5ff';
  };

  const filteredSkills = filterRarity === 'ALL' 
    ? skills 
    : skills.filter(s => s.rarity === filterRarity);

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
        /* CUSTOM CURSOR */
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
          transition: transform 0.15s ease-out;
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
          to { opacity: 0; transform: scale(0.3); }
        }

        /* ═══════════════════════════════════════════════════════════ */
        /* CINEMATIC ANIMATIONS */
        /* ═══════════════════════════════════════════════════════════ */
        @keyframes cinematic-reveal {
          0% { 
            opacity: 0; 
            transform: translateY(100px) scale(0.9) rotateX(-10deg);
            filter: blur(12px);
          }
          100% { 
            opacity: 1; 
            transform: translateY(0) scale(1) rotateX(0);
            filter: blur(0);
          }
        }

        @keyframes float-3d {
          0%, 100% { transform: translateY(0) rotateZ(0deg); }
          50% { transform: translateY(-20px) rotateZ(5deg); }
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

        @keyframes shimmer {
          0% { transform: translateX(-100%) skewX(-15deg); }
          100% { transform: translateX(200%) skewX(-15deg); }
        }

        @keyframes particle-float {
          0% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-100vh) rotate(720deg); opacity: 0; }
        }

        @keyframes expand-card {
          0% { transform: scale(0.8) rotateY(-20deg); opacity: 0; }
          100% { transform: scale(1) rotateY(0); opacity: 1; }
        }

        @keyframes slide-up {
          from { transform: translateY(50px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
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
          transform: translateY(-25px) scale(1.03);
          border-color: var(--card-color);
          box-shadow: 
            0 50px 120px var(--card-glow),
            0 0 80px var(--card-glow) inset;
        }

        /* ═══════════════════════════════════════════════════════════ */
        /* TECH TAGS */
        /* ═══════════════════════════════════════════════════════════ */
        .tech-tag {
          background: rgba(0, 0, 0, 0.8);
          border: 2px solid;
          padding: 0.75rem 1.5rem;
          border-radius: 999px;
          font-family: 'Space Mono', monospace;
          font-size: 0.875rem;
          font-weight: 600;
          transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative;
          overflow: hidden;
          cursor: pointer;
        }

        .tech-tag::before {
          content: '';
          position: absolute;
          inset: 0;
          background: currentColor;
          opacity: 0;
          transition: opacity 0.5s;
        }

        .tech-tag::after {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
          transition: left 0.5s;
        }

        .tech-tag:hover::before {
          opacity: 0.25;
        }

        .tech-tag:hover::after {
          left: 100%;
        }

        .tech-tag:hover {
          transform: translateY(-6px) scale(1.12);
          box-shadow: 0 18px 50px currentColor;
        }

        /* ═══════════════════════════════════════════════════════════ */
        /* FILTER BUTTONS */
        /* ═══════════════════════════════════════════════════════════ */
        .filter-btn {
          background: rgba(0, 0, 0, 0.8);
          border: 3px solid;
          padding: 1rem 2.5rem;
          border-radius: 999px;
          font-family: 'Orbitron', sans-serif;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
          color: white;
          font-size: 1rem;
          letter-spacing: 1.5px;
          position: relative;
          overflow: hidden;
        }

        .filter-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: currentColor;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
          z-index: -1;
        }

        .filter-btn::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
          transform: translateX(-100%);
          animation: shimmer 3s infinite;
        }

        .filter-btn:hover::before,
        .filter-btn.active::before {
          transform: scaleX(1);
        }

        .filter-btn:hover,
        .filter-btn.active {
          color: #000;
          transform: translateY(-8px) scale(1.05);
          box-shadow: 0 25px 70px currentColor;
        }

        /* ═══════════════════════════════════════════════════════════ */
        /* HEXAGON */
        /* ═══════════════════════════════════════════════════════════ */
        .hexagon {
          clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* ═══════════════════════════════════════════════════════════ */
        /* STAT CARDS */
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

        .stat-card:hover::before {
          width: 500px;
          height: 500px;
        }

        .stat-card:hover {
          transform: translateY(-20px) scale(1.08);
          box-shadow: 0 40px 100px currentColor;
        }

        /* ═══════════════════════════════════════════════════════════ */
        /* NEON TEXT */
        /* ═══════════════════════════════════════════════════════════ */
        .neon-text {
          text-shadow: 
            0 0 15px currentColor,
            0 0 30px currentColor,
            0 0 60px currentColor,
            0 0 120px currentColor;
          animation: neon-flicker 5s linear infinite;
        }

        /* ═══════════════════════════════════════════════════════════ */
        /* RESPONSIVE */
        /* ═══════════════════════════════════════════════════════════ */
        @media (max-width: 1024px) {
          .skills-grid { grid-template-columns: 1fr !important; }
        }

        @media (max-width: 768px) {
          body { cursor: default; }
          .custom-cursor, .cursor-trail { display: none; }
          .stat-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }

        @media (max-width: 480px) {
          .filter-btn {
            padding: 0.8rem 1.5rem !important;
            font-size: 0.85rem !important;
          }
          .stat-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* Enterprise Cursor */}
      <div 
        className="custom-cursor"
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

      <div style={{
        minHeight: '100vh',
        background: '#000',
        color: '#ffffff',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Progress Bar */}
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
              boxShadow: '0 0 15px rgba(0, 245, 255, 0.9)',
              zIndex: 1
            }}
          />
        ))}

        {/* Neural Network Canvas */}
        <canvas ref={canvasRef} style={{ 
          position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 2,
          opacity: 0.6
        }} />

        {/* Matrix Rain */}
        <canvas ref={matrixCanvasRef} style={{ 
          position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 1,
          opacity: 0.25
        }} />

        {/* Floating Orbs */}
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
        }} />

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
        }} />

        <div style={{
          position: 'relative', zIndex: 10, maxWidth: '1700px',
          margin: '0 auto', padding: '0 clamp(1rem, 4vw, 3rem)',
          paddingTop: 'clamp(5rem, 12vw, 8rem)',
          paddingBottom: '8rem'
        }}>
          {/* Header Section */}
          <div style={{ textAlign: 'center', marginBottom: 'clamp(5rem, 10vw, 8rem)' }}>
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
              animation: 'pulse-glow 3.5s infinite',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 10px 40px rgba(0, 245, 255, 0.3)'
            }}>
              <Terminal size={20} strokeWidth={2.5} />
              <span style={{ fontWeight: 700, letterSpacing: '1.5px' }}>
                ELITE_DEVELOPER.SKILLS_MATRIX.LOADED
              </span>
              <Activity size={20} strokeWidth={2.5} />
            </div>

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
              `
            }}>
              SKILLS ARSENAL
            </h1>

            <p style={{
              fontSize: 'clamp(1.15rem, 2.8vw, 1.45rem)', 
              color: '#c0c8e0',
              maxWidth: '1000px', 
              margin: '0 auto 4rem',
              fontFamily: "'Inter', sans-serif", 
              lineHeight: 1.9, 
              fontWeight: 500,
              letterSpacing: '0.5px'
            }}>
              Master-level proficiency across full-stack development, AI/ML, 
              cloud architecture, and data science — powering next-generation solutions
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
                [ 50+ projects | 500+ problems | 5+ years ]
              </span>
            </p>

            {/* Filter Buttons */}
            <div style={{
              display: 'flex', 
              justifyContent: 'center',
              gap: '1.5rem', 
              flexWrap: 'wrap', 
              marginBottom: '4rem'
            }}>
              {['ALL', 'MYTHIC', 'LEGENDARY', 'EPIC'].map(rarity => (
                <button
                  key={rarity}
                  className={`filter-btn ${filterRarity === rarity ? 'active' : ''}`}
                  onClick={() => setFilterRarity(rarity)}
                  style={{
                    borderColor: getRarityColor(rarity),
                    color: filterRarity === rarity ? '#000' : 'white'
                  }}
                >
                  {rarity === 'ALL' ? '🌟 ALL SKILLS' : `✨ ${rarity}`}
                </button>
              ))}
            </div>
          </div>

          {/* Skills Grid */}
          <div className="skills-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))',
            gap: 'clamp(3rem, 6vw, 4rem)',
            marginBottom: '8rem'
          }}>
            {filteredSkills.map((skill, index) => {
              const Icon = skill.icon;
              const isActive = activeSkill === skill.id;
              const rarityColor = getRarityColor(skill.rarity);
              const isExpanded = expandedSkill === skill.id;

              return (
                <div
                  key={skill.id}
                  className="glass-card"
                  onMouseEnter={() => setActiveSkill(skill.id)}
                  onMouseLeave={() => setActiveSkill(null)}
                  style={{
                    '--card-color': skill.color,
                    '--card-glow': `rgba(${skill.glowRGB}, 0.5)`,
                    padding: 'clamp(2rem, 5vw, 3rem)',
                    animation: `cinematic-reveal ${1 + index * 0.15}s cubic-bezier(0.16, 1, 0.3, 1) forwards`,
                    animationDelay: `${index * 0.15}s`,
                    opacity: 0
                  }}
                >
                  {/* Top Accent */}
                  <div style={{
                    position: 'absolute', 
                    top: 0, 
                    left: 0, 
                    right: 0, 
                    height: '6px',
                    background: skill.gradient,
                    opacity: isActive ? 1 : 0.7, 
                    transition: 'opacity 0.6s',
                    boxShadow: `0 0 25px ${skill.color}`
                  }} />

                  {/* Rarity Badge */}
                  <div style={{
                    position: 'absolute', 
                    top: '1.5rem', 
                    right: '1.5rem',
                    padding: '0.7rem 1.5rem', 
                    background: rarityColor,
                    color: '#000', 
                    borderRadius: '999px',
                    fontSize: '0.8rem', 
                    fontWeight: 900,
                    fontFamily: "'Orbitron', sans-serif",
                    letterSpacing: '1.5px', 
                    border: `3px solid ${rarityColor}`,
                    animation: 'pulse-glow 3s infinite',
                    boxShadow: `0 10px 40px ${rarityColor}`,
                    zIndex: 10
                  }}>
                    {skill.rarity}
                  </div>

                  {/* Header Section */}
                  <div style={{
                    display: 'flex', 
                    alignItems: 'flex-start',
                    justifyContent: 'space-between', 
                    marginBottom: '2rem',
                    gap: '1.5rem', 
                    flexWrap: 'wrap'
                  }}>
                    <div style={{
                      display: 'flex', 
                      alignItems: 'center',
                      gap: '1.5rem', 
                      flex: 1
                    }}>
                      <div className="hexagon" style={{
                        width: '90px', 
                        height: '90px',
                        background: skill.gradient,
                        boxShadow: isActive ? `0 0 60px ${skill.color}` : `0 0 30px ${skill.color}55`,
                        transition: 'all 0.6s',
                        animation: isActive ? 'float-3d 3s ease-in-out infinite' : 'none'
                      }}>
                        <Icon size={42} style={{ 
                          color: '#fff',
                          filter: 'drop-shadow(0 0 10px currentColor)'
                        }} strokeWidth={2.5} />
                      </div>

                      <div style={{ flex: 1 }}>
                        <div style={{
                          color: skill.color,
                          fontFamily: "'Orbitron', sans-serif",
                          fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
                          fontWeight: 900, 
                          letterSpacing: '4px',
                          textShadow: isActive ? `0 0 40px ${skill.color}` : 'none',
                          marginBottom: '0.8rem'
                        }}>
                          {skill.masteryRank}
                        </div>
                        <div style={{
                          fontFamily: "'Space Mono', monospace",
                          fontSize: '1rem', 
                          color: '#999',
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: '0.6rem',
                          fontWeight: 600
                        }}>
                          <Zap size={18} style={{ color: skill.color }} />
                          {skill.yearsActive} Experience
                        </div>
                      </div>
                    </div>

                    {/* Progress Circle */}
                    <svg width="110" height="110" style={{ flexShrink: 0 }}>
                      <defs>
                        <linearGradient id={`gradient-${skill.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor={skill.color} />
                          <stop offset="100%" stopColor={skill.color} stopOpacity="0.5" />
                        </linearGradient>
                      </defs>
                      <g transform="rotate(-90 55 55)">
                        <circle cx="55" cy="55" r="45" fill="none"
                          stroke="rgba(255,255,255,0.1)" strokeWidth="10" />
                        <circle cx="55" cy="55" r="45" fill="none"
                          stroke={`url(#gradient-${skill.id})`} strokeWidth="10"
                          strokeDasharray={`${2 * Math.PI * 45}`}
                          strokeDashoffset={`${2 * Math.PI * 45 * (1 - skill.level / 100)}`}
                          strokeLinecap="round"
                          style={{
                            transition: 'stroke-dashoffset 2s cubic-bezier(0.16, 1, 0.3, 1)',
                            filter: `drop-shadow(0 0 ${isActive ? '20px' : '10px'} ${skill.color})`
                          }}
                        />
                      </g>
                      <text x="55" y="55" textAnchor="middle" dy="10"
                        fill={skill.color} fontSize="24" fontWeight="900"
                        fontFamily="'Orbitron', sans-serif">
                        {skill.level}%
                      </text>
                    </svg>
                  </div>

                  {/* Title */}
                  <h3 style={{
                    fontSize: 'clamp(1.8rem, 4vw, 2.3rem)', 
                    fontWeight: 900,
                    background: `linear-gradient(135deg, ${skill.color}, #fff)`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    marginBottom: '1.5rem',
                    textTransform: 'uppercase', 
                    letterSpacing: '2px',
                    fontFamily: "'Orbitron', sans-serif"
                  }}>
                    {skill.name}
                  </h3>

                  {/* Impact Badge */}
                  <div style={{
                    background: `linear-gradient(135deg, rgba(${skill.glowRGB}, 0.2), rgba(${skill.glowRGB}, 0.08))`,
                    border: `2px solid rgba(${skill.glowRGB}, 0.4)`,
                    borderRadius: '18px', 
                    padding: '1.3rem',
                    marginBottom: '2rem', 
                    display: 'flex',
                    alignItems: 'center', 
                    gap: '1rem'
                  }}>
                    <Trophy size={28} style={{ color: skill.color, flexShrink: 0 }} strokeWidth={2.5} />
                    <span style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '1.1rem', 
                      fontWeight: 600,
                      color: '#f0f0ff'
                    }}>
                      {skill.impact}
                    </span>
                  </div>

                  {/* Description */}
                  <p style={{
                    fontSize: '1.08rem', 
                    color: '#c8d0ff',
                    lineHeight: 1.8, 
                    marginBottom: '2.5rem',
                    fontFamily: "'Inter', sans-serif"
                  }}>
                    {skill.description}
                  </p>

                  {/* Stats Grid */}
                  <div style={{
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: '1.2rem', 
                    marginBottom: '2.5rem'
                  }}>
                    <div style={{
                      background: 'rgba(0, 0, 0, 0.7)',
                      border: `2px solid rgba(${skill.glowRGB}, 0.4)`,
                      borderRadius: '16px', 
                      padding: '1.5rem',
                      textAlign: 'center', 
                      transition: 'all 0.5s'
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.transform = 'scale(1.05)';
                      e.currentTarget.style.background = `rgba(${skill.glowRGB}, 0.1)`;
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.transform = 'scale(1)';
                      e.currentTarget.style.background = 'rgba(0, 0, 0, 0.7)';
                    }}>
                      <div style={{
                        fontSize: '2.5rem', 
                        fontWeight: 900,
                        color: skill.color, 
                        fontFamily: "'Orbitron', sans-serif",
                        marginBottom: '0.5rem',
                        textShadow: `0 0 20px ${skill.color}`
                      }}>
                        {skill.projects}
                      </div>
                      <div style={{
                        fontSize: '0.9rem', 
                        color: '#b0b0d0',
                        textTransform: 'uppercase', 
                        letterSpacing: '1.5px',
                        fontWeight: 700
                      }}>
                        Projects
                      </div>
                    </div>

                    <div style={{
                      background: 'rgba(0, 0, 0, 0.7)',
                      border: `2px solid rgba(${skill.glowRGB}, 0.4)`,
                      borderRadius: '16px', 
                      padding: '1.5rem',
                      textAlign: 'center', 
                      transition: 'all 0.5s'
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.transform = 'scale(1.05)';
                      e.currentTarget.style.background = `rgba(${skill.glowRGB}, 0.1)`;
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.transform = 'scale(1)';
                      e.currentTarget.style.background = 'rgba(0, 0, 0, 0.7)';
                    }}>
                      <div style={{
                        fontSize: '2.5rem', 
                        fontWeight: 900,
                        color: skill.color, 
                        fontFamily: "'Orbitron', sans-serif",
                        marginBottom: '0.5rem',
                        textShadow: `0 0 20px ${skill.color}`
                      }}>
                        {skill.completionRate}%
                      </div>
                      <div style={{
                        fontSize: '0.9rem', 
                        color: '#b0b0d0',
                        textTransform: 'uppercase', 
                        letterSpacing: '1.5px',
                        fontWeight: 700
                      }}>
                        Success
                      </div>
                    </div>
                  </div>

                  {/* Technologies */}
                  <div style={{
                    background: 'rgba(0, 0, 0, 0.6)',
                    border: `2px solid rgba(${skill.glowRGB}, 0.4)`,
                    borderRadius: '20px', 
                    padding: '2rem',
                    marginBottom: '2rem'
                  }}>
                    <h4 style={{
                      color: skill.color, 
                      fontSize: '1.3rem',
                      fontWeight: 800, 
                      marginBottom: '1.5rem',
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '1rem',
                      fontFamily: "'Orbitron', sans-serif",
                      letterSpacing: '1px'
                    }}>
                      <Code2 size={24} strokeWidth={2.5} /> TECH STACK
                    </h4>
                    <div style={{
                      display: 'flex', 
                      flexWrap: 'wrap', 
                      gap: '1rem'
                    }}>
                      {skill.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="tech-tag"
                          style={{
                            color: hoveredTech === tech ? '#000' : (isActive ? skill.color : '#aaa'),
                            borderColor: hoveredTech === tech ? skill.color : (isActive ? skill.color : '#555'),
                            background: hoveredTech === tech ? skill.color : 'rgba(0,0,0,0.8)'
                          }}
                          onMouseEnter={() => setHoveredTech(tech)}
                          onMouseLeave={() => setHoveredTech(null)}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Key Achievements */}
                  <div style={{
                    background: 'rgba(0, 0, 0, 0.6)',
                    border: `2px solid rgba(${skill.glowRGB}, 0.4)`,
                    borderRadius: '20px', 
                    padding: '2rem',
                    marginBottom: '2rem'
                  }}>
                    <h4 style={{
                      color: skill.color, 
                      fontSize: '1.3rem',
                      fontWeight: 800, 
                      marginBottom: '1.5rem',
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '1rem',
                      fontFamily: "'Orbitron', sans-serif",
                      letterSpacing: '1px'
                    }}>
                      <Star size={24} strokeWidth={2.5} /> KEY ACHIEVEMENTS
                    </h4>
                    <div style={{
                      display: 'flex', 
                      flexDirection: 'column', 
                      gap: '1rem'
                    }}>
                      {skill.keyAchievements.map((achievement, idx) => (
                        <div
                          key={idx}
                          style={{
                            background: isActive ? `rgba(${skill.glowRGB}, 0.12)` : 'rgba(255,255,255,0.03)',
                            border: `1px solid rgba(${skill.glowRGB}, 0.3)`,
                            borderRadius: '14px', 
                            padding: '1rem 1.2rem',
                            transition: 'all 0.4s',
                            fontSize: '1rem', 
                            color: '#f0f0ff',
                            fontFamily: "'Inter', sans-serif",
                            fontWeight: 500
                          }}
                          onMouseEnter={e => {
                            e.currentTarget.style.background = `rgba(${skill.glowRGB}, 0.2)`;
                            e.currentTarget.style.transform = 'translateX(10px)';
                          }}
                          onMouseLeave={e => {
                            e.currentTarget.style.background = isActive ? `rgba(${skill.glowRGB}, 0.12)` : 'rgba(255,255,255,0.03)';
                            e.currentTarget.style.transform = 'translateX(0)';
                          }}
                        >
                          {achievement}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Expandable Sections */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {/* Projects Used In */}
                    <details 
                      open={isExpanded}
                      style={{
                        background: 'rgba(0, 0, 0, 0.6)',
                        border: `2px solid rgba(${skill.glowRGB}, 0.4)`,
                        borderRadius: '20px', 
                        padding: '2rem',
                        cursor: 'pointer'
                      }}
                    >
                      <summary style={{
                        color: skill.color, 
                        fontSize: '1.3rem',
                        fontWeight: 800, 
                        display: 'flex',
                        alignItems: 'center', 
                        gap: '1rem',
                        fontFamily: "'Orbitron', sans-serif",
                        userSelect: 'none', 
                        listStyle: 'none',
                        letterSpacing: '1px'
                      }}>
                        <Rocket size={24} strokeWidth={2.5} /> FEATURED PROJECTS ({skill.usedIn.length})
                      </summary>
                      <ul style={{
                        color: '#e8f0ff', 
                        fontSize: '1.05rem',
                        listStyleType: 'none', 
                        padding: 0,
                        margin: '1.5rem 0 0 0'
                      }}>
                        {skill.usedIn.map((proj, idx) => (
                          <li key={idx} style={{
                            marginBottom: '1rem', 
                            display: 'flex',
                            alignItems: 'center', 
                            gap: '1rem',
                            padding: '0.8rem', 
                            borderRadius: '12px',
                            transition: 'all 0.4s',
                            fontFamily: "'Inter', sans-serif"
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = `rgba(${skill.glowRGB}, 0.18)`;
                            e.currentTarget.style.transform = 'translateX(15px)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'transparent';
                            e.currentTarget.style.transform = 'translateX(0)';
                          }}>
                            <CheckCircle2 size={20} style={{ 
                              color: skill.color, 
                              minWidth: '20px' 
                            }} strokeWidth={2.5} />
                            {proj}
                          </li>
                        ))}
                      </ul>
                    </details>

                    {/* Implementation Details */}
                    <details style={{
                      background: 'rgba(0, 0, 0, 0.6)',
                      border: `2px solid rgba(${skill.glowRGB}, 0.4)`,
                      borderRadius: '20px', 
                      padding: '2rem',
                      cursor: 'pointer'
                    }}>
                      <summary style={{
                        color: skill.color, 
                        fontSize: '1.3rem',
                        fontWeight: 800, 
                        display: 'flex',
                        alignItems: 'center', 
                        gap: '1rem',
                        fontFamily: "'Orbitron', sans-serif",
                        userSelect: 'none', 
                        listStyle: 'none',
                        letterSpacing: '1px'
                      }}>
                        <Wrench size={24} strokeWidth={2.5} /> IMPLEMENTATION
                      </summary>
                      <ul style={{
                        color: '#e8f0ff', 
                        fontSize: '1.05rem',
                        listStyleType: 'none', 
                        padding: 0,
                        margin: '1.5rem 0 0 0'
                      }}>
                        {skill.howUsed.map((use, idx) => (
                          <li key={idx} style={{
                            marginBottom: '1rem', 
                            display: 'flex',
                            alignItems: 'flex-start', 
                            gap: '1rem',
                            padding: '0.8rem', 
                            borderRadius: '12px',
                            transition: 'all 0.4s',
                            fontFamily: "'Inter', sans-serif"
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = `rgba(${skill.glowRGB}, 0.18)`;
                            e.currentTarget.style.transform = 'translateX(15px)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'transparent';
                            e.currentTarget.style.transform = 'translateX(0)';
                          }}>
                            <GitBranch size={20} style={{ 
                              color: skill.color, 
                              minWidth: '20px', 
                              marginTop: '3px' 
                            }} strokeWidth={2.5} />
                            {use}
                          </li>
                        ))}
                      </ul>
                    </details>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Stats Dashboard */}
          <div className="glass-card" style={{
            padding: 'clamp(3.5rem, 8vw, 5.5rem) clamp(2rem, 5vw, 3.5rem)',
            marginBottom: '6rem', 
            borderColor: 'rgba(0, 245, 255, 0.4)',
            background: 'rgba(0, 20, 40, 0.4)'
          }}>
            <div style={{
              position: 'absolute', 
              top: 0, 
              left: 0, 
              right: 0, 
              height: '6px',
              background: 'linear-gradient(90deg, #00f5ff, #a855f7, #ff6b35, #00f5ff)',
              backgroundSize: '200% 100%', 
              animation: 'shimmer 4s linear infinite'
            }} />

            <h2 className="neon-text" style={{
              fontSize: 'clamp(2.5rem, 7vw, 4rem)', 
              fontWeight: 900,
              color: '#00f5ff', 
              textAlign: 'center',
              marginBottom: '4rem', 
              fontFamily: "'Orbitron', sans-serif",
              textTransform: 'uppercase', 
              letterSpacing: '6px'
            }}>
              🏆 ACHIEVEMENTS UNLOCKED
            </h2>

            <div className="stat-grid" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
              gap: 'clamp(2rem, 4vw, 3rem)'
            }}>
              {[
                { label: 'Experience', value: '5+Y', icon: Cpu, color: '#00f5ff', desc: 'Years Active' },
                { label: 'Projects', value: '50+', icon: Layers, color: '#a855f7', desc: 'Production Apps' },
                { label: 'Technologies', value: '38+', icon: Globe, color: '#ff6b35', desc: 'Mastered' },
                { label: 'Certifications', value: '15+', icon: Award, color: '#ffd700', desc: 'Recognized' },
                { label: 'Problems', value: '500+', icon: Target, color: '#ff00ff', desc: 'Solved' },
                { label: 'Success', value: '96%', icon: TrendingUp, color: '#00ff88', desc: 'Completion' }
              ].map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={i}
                    className="stat-card"
                    style={{
                      borderColor: stat.color,
                      animation: `slide-up ${1 + i * 0.15}s ease-out forwards`,
                      animationDelay: `${i * 0.1}s`,
                      opacity: 0
                    }}
                  >
                    <div style={{
                      width: '95px', 
                      height: '95px',
                      margin: '0 auto 2rem',
                      border: `3px solid ${stat.color}`,
                      borderRadius: '20px', 
                      display: 'flex',
                      alignItems: 'center', 
                      justifyContent: 'center',
                      animation: 'float-3d 4s ease-in-out infinite',
                      animationDelay: `${i * 0.4}s`,
                      boxShadow: `0 0 50px ${stat.color}55`,
                      background: `linear-gradient(135deg, ${stat.color}12, transparent)`
                    }}>
                      <Icon size={42} style={{ color: stat.color }} strokeWidth={2.5} />
                    </div>
                    <div style={{
                      fontSize: 'clamp(2.8rem, 6vw, 4rem)',
                      fontWeight: 900, 
                      color: stat.color,
                      marginBottom: '0.8rem',
                      fontFamily: "'Orbitron', sans-serif",
                      textShadow: `0 0 40px ${stat.color}`
                    }}>
                      {stat.value}
                    </div>
                    <div style={{
                      fontSize: '1.2rem', 
                      color: '#ffffff',
                      fontWeight: 800, 
                      textTransform: 'uppercase',
                      letterSpacing: '1.5px', 
                      marginBottom: '0.6rem',
                      fontFamily: "'Rajdhani', sans-serif"
                    }}>
                      {stat.label}
                    </div>
                    <div style={{
                      fontSize: '0.95rem', 
                      color: '#b8c0d8',
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 500
                    }}>
                      {stat.desc}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Final CTA */}
          <div className="glass-card" style={{
            padding: 'clamp(4rem, 8vw, 5.5rem) clamp(2.5rem, 5vw, 4rem)',
            textAlign: 'center', 
            borderColor: 'rgba(0, 245, 255, 0.4)',
            background: 'rgba(0, 20, 40, 0.4)',
            position: 'relative',
            overflow: 'hidden'
          }}>
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
                padding: '0.7rem 2rem',
                border: '2px solid rgba(0, 245, 255, 0.4)',
                borderRadius: '999px',
                background: 'rgba(0, 245, 255, 0.05)'
              }}>
                &lt;COLLABORATION.PROTOCOL.ACTIVE&gt;
              </div>

              <h2 className="neon-text" style={{
                fontSize: 'clamp(2.8rem, 8vw, 4.5rem)', 
                fontWeight: 900,
                fontFamily: "'Orbitron', sans-serif",
                color: '#00f5ff',
                marginBottom: '2.5rem',
                letterSpacing: '4px',
                textTransform: 'uppercase'
              }}>
                BUILD SOMETHING EXTRAORDINARY
              </h2>

              <p style={{
                fontSize: 'clamp(1.15rem, 2.8vw, 1.4rem)',
                color: '#c8d0f0', 
                marginBottom: '4rem',
                fontFamily: "'Inter', sans-serif",
                maxWidth: '900px', 
                margin: '0 auto 4rem',
                lineHeight: 2,
                fontWeight: 500
              }}>
                Let's leverage these elite skills to create cutting-edge solutions
                that push the boundaries of technology and drive innovation forward.
              </p>

              <div style={{
                display: 'flex', 
                gap: '2.5rem',
                justifyContent: 'center', 
                flexWrap: 'wrap'
              }}>
                <a
                  href="https://github.com/bhagavan444"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="filter-btn"
                  style={{
                    borderColor: '#00f5ff', 
                    color: 'white',
                    fontSize: '1.08rem', 
                    padding: '1.4rem 3.5rem',
                    display: 'flex', 
                    alignItems: 'center',
                    gap: '1rem',
                    textDecoration: 'none'
                  }}
                >
                  <Eye size={24} strokeWidth={2.5} />
                  VIEW PROJECTS
                </a>
                <a
                  href="mailto:g.sivasatyasaibhagavan@gmail.com"
                  className="filter-btn"
                  style={{
                    borderColor: '#a855f7', 
                    color: 'white',
                    fontSize: '1.08rem', 
                    padding: '1.4rem 3.5rem',
                    display: 'flex', 
                    alignItems: 'center',
                    gap: '1rem',
                    textDecoration: 'none'
                  }}
                >
                  <Rocket size={24} strokeWidth={2.5} />
                  START PROJECT
                </a>
              </div>

              <div style={{
                marginTop: '3rem', 
                fontSize: '1rem',
                color: '#00f5ff', 
                fontFamily: "'Space Mono', monospace",
                fontWeight: 700,
                letterSpacing: '1.5px'
              }}>
                &lt;/ELITE_DEVELOPER_2026&gt;
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}