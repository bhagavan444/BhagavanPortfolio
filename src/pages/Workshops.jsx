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
  ArrowRight,
  Briefcase,
  Terminal,
  Database,
  Server,
  Code2,
  GitBranch,
  ExternalLink,
  Eye,
  Globe,
  Users,
  Cpu,
  Cloud,
  Smartphone,
  Play,
  Shield
} from "lucide-react";

const workshops = [
  {
    title: "Mobile App Development",
    icon: Smartphone,
    gradient: "linear-gradient(135deg, #22d3ee, #3b82f6)",
    color: "#22d3ee",
    desc: "Build production-grade cross-platform apps with React Native & Flutter.",
    fullDesc: "Master mobile development with industry-standard frameworks. Build real-world apps from scratch, implement complex UI patterns, integrate cloud services, and deploy to both App Store and Google Play. Learn advanced state management, native modules, and performance optimization techniques used by top tech companies.",
    skills: ["React Native", "Flutter", "Firebase", "App Store Deploy", "Native Modules", "Performance Tuning"],
    slots: 25,
    enrolled: 489,
    duration: "8 Weeks",
    level: "Intermediate",
    featured: true,
    projects: 6
  },
  {
    title: "Full-Stack Engineering",
    icon: Code,
    gradient: "linear-gradient(135deg, #a855f7, #ec4899)",
    color: "#a855f7",
    desc: "Master Next.js 14, TypeScript, GraphQL & cloud-native backends.",
    fullDesc: "Become a complete full-stack engineer. Build scalable web applications using the latest technologies. Master server-side rendering, API design, database optimization, authentication systems, and deployment pipelines. Work on real production-grade projects that mirror industry standards.",
    skills: ["Next.js 14", "TypeScript", "GraphQL", "PostgreSQL", "Docker", "AWS/Vercel"],
    slots: 30,
    enrolled: 642,
    duration: "12 Weeks",
    level: "Beginner → Expert",
    featured: false,
    projects: 8
  },
  {
    title: "Machine Learning Pro",
    icon: Brain,
    gradient: "linear-gradient(135deg, #10b981, #14b8a6)",
    color: "#10b981",
    desc: "Real-world ML pipelines, MLOps & production model deployment.",
    fullDesc: "Transform into an ML engineer capable of building production systems. Learn end-to-end ML workflows from data preprocessing to model deployment. Master feature engineering, model selection, hyperparameter tuning, and MLOps practices. Deploy scalable ML services used by millions.",
    skills: ["Python ML", "MLOps", "Feature Engineering", "Time Series", "Model Deployment", "A/B Testing"],
    slots: 20,
    enrolled: 573,
    duration: "10 Weeks",
    level: "Intermediate",
    featured: false,
    projects: 7
  },
  {
    title: "Deep Learning & Gen AI",
    icon: Cpu,
    gradient: "linear-gradient(135deg, #f59e0b, #f97316)",
    color: "#f59e0b",
    desc: "Transformers, Diffusion Models, LLM fine-tuning & RAG systems.",
    fullDesc: "Dive deep into cutting-edge AI technologies. Build and fine-tune large language models, create custom RAG systems, implement diffusion models for image generation, and deploy AI-powered applications. Learn prompt engineering, vector databases, and production AI architecture.",
    skills: ["PyTorch", "Transformers", "Stable Diffusion", "RAG Systems", "LangChain", "Vector DBs"],
    slots: 18,
    enrolled: 521,
    duration: "12 Weeks",
    level: "Advanced",
    featured: true,
    projects: 5
  },
  {
    title: "Cloud & DevOps Mastery",
    icon: Shield,
    gradient: "linear-gradient(135deg, #06b6d4, #0ea5e9)",
    color: "#06b6d4",
    desc: "Kubernetes, Terraform, CI/CD pipelines & cloud-native architecture.",
    fullDesc: "Master cloud infrastructure and DevOps practices. Build automated deployment pipelines, manage containerized applications, implement infrastructure as code, and design highly available systems. Learn AWS/GCP/Azure, monitoring, security, and cost optimization strategies.",
    skills: ["Kubernetes", "Terraform", "CI/CD", "AWS", "Monitoring", "Security"],
    slots: 22,
    enrolled: 438,
    duration: "10 Weeks",
    level: "Intermediate",
    featured: false,
    projects: 6
  },
  {
    title: "Blockchain Engineering",
    icon: GitBranch,
    gradient: "linear-gradient(135deg, #8b5cf6, #7c3aed)",
    color: "#8b5cf6",
    desc: "Smart contracts, Web3, DeFi protocols & decentralized applications.",
    fullDesc: "Enter the world of Web3 development. Build decentralized applications, write secure smart contracts, integrate blockchain into existing systems, and understand DeFi protocols. Master Solidity, Web3.js, and build production-ready dApps on Ethereum and other blockchains.",
    skills: ["Solidity", "Web3.js", "Ethereum", "Smart Contracts", "DeFi", "NFT Development"],
    slots: 15,
    enrolled: 367,
    duration: "8 Weeks",
    level: "Advanced",
    featured: false,
    projects: 4
  }
];

export default function EliteWorkshops() {
  const [selected, setSelected] = useState(null);
  const [hover, setHover] = useState(null);
  const [visible, setVisible] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  useEffect(() => {
    setTimeout(() => setVisible(true), 150);
  }, []);

  const handleMouseMove = (e) => {
    if (!containerRef.current || window.innerWidth < 1024) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 40;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 40;
    setMousePos({ x, y });
  };

  const Counter = ({ target }) => {
    const [count, setCount] = useState(0);
    useEffect(() => {
      let start = 0;
      const duration = 2000;
      const step = target / (duration / 16);
      const timer = setInterval(() => {
        start += step;
        if (start >= target) {
          setCount(target);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }, [target]);
    return <span>{count.toLocaleString()}</span>;
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      style={{
        position: 'relative',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0a0015 0%, #001428 50%, #0a001f 100%)',
        color: 'white',
        overflow: 'hidden',
        padding: 'clamp(70px, 12vw, 120px) clamp(20px, 5vw, 32px)'
      }}
    >
      <style>{`
        @keyframes floatGentle { 0%, 100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-18px) rotate(2deg); } }
        @keyframes rotateGradient { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(60px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes glowPulse { 0%, 100% { boxShadow: 0 5px 30px rgba(168,85,247,0.35); } 50% { boxShadow: 0 15px 60px rgba(168,85,247,0.65); } }
        @keyframes shimmerMove { 0% { transform: translateX(-100%); } 100% { transform: translateX(200%); } }
        @keyframes iconFloat { 0%, 100% { transform: translateY(0) scale(1); } 50% { transform: translateY(-12px) scale(1.08); } }
        @keyframes scaleIn { from { opacity: 0; transform: scale(0.92); } to { opacity: 1; transform: scale(1); } }
        @keyframes gradientShift { 0%, 100% { backgroundPosition: 0% 50%; } 50% { backgroundPosition: 100% 50%; } }
      `}</style>

      {/* Dynamic Background */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        {/* Gradient Orbs */}
        <div style={{
          position: 'absolute',
          width: '800px',
          height: '800px',
          top: '-12%',
          right: '-8%',
          background: 'radial-gradient(circle, rgba(168,85,247,0.38), transparent 68%)',
          filter: 'blur(110px)',
          animation: 'floatGentle 22s ease-in-out infinite',
          transform: `translate(${mousePos.x}px, ${mousePos.y}px)`,
          transition: 'transform 0.6s ease-out'
        }} />
        <div style={{
          position: 'absolute',
          width: '700px',
          height: '700px',
          bottom: '-8%',
          left: '-6%',
          background: 'radial-gradient(circle, rgba(34,211,238,0.32), transparent 68%)',
          filter: 'blur(100px)',
          animation: 'floatGentle 28s ease-in-out infinite',
          animationDelay: '4s',
          transform: `translate(${-mousePos.x}px, ${-mousePos.y}px)`,
          transition: 'transform 0.6s ease-out'
        }} />
        <div style={{
          position: 'absolute',
          width: '600px',
          height: '600px',
          top: '40%',
          right: '30%',
          background: 'radial-gradient(circle, rgba(236,72,153,0.25), transparent 70%)',
          filter: 'blur(95px)',
          animation: 'floatGentle 32s ease-in-out infinite',
          animationDelay: '8s'
        }} />

        {/* Grid Pattern */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `linear-gradient(rgba(168,85,247,0.08) 1.2px, transparent 1.2px),
                           linear-gradient(90deg, rgba(168,85,247,0.08) 1.2px, transparent 1.2px)`,
          backgroundSize: '70px 70px',
          opacity: 0.35
        }} />

        {/* Floating Geometric Shapes */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: `${45 + Math.random() * 70}px`,
              height: `${45 + Math.random() * 70}px`,
              borderRadius: Math.random() > 0.5 ? '50%' : '20%',
              background: `${workshops[i % workshops.length].color}12`,
              border: `2.5px solid ${workshops[i % workshops.length].color}28`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `floatGentle ${18 + Math.random() * 18}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 6}s`,
              opacity: 0.45,
              backdropFilter: 'blur(2px)'
            }}
          />
        ))}
      </div>

      <div style={{ position: 'relative', maxWidth: '1500px', margin: '0 auto', zIndex: 1 }}>
        {/* Hero Section */}
        <div style={{
          textAlign: 'center',
          marginBottom: 'clamp(60px, 10vw, 100px)',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(-60px)',
          transition: 'all 1.4s cubic-bezier(0.34, 1.56, 0.64, 1)'
        }}>
          {/* Animated Icon */}
          <div style={{
            fontSize: 'clamp(4.5rem, 14vw, 8rem)',
            marginBottom: '32px',
            animation: 'iconFloat 5s ease-in-out infinite',
            filter: 'drop-shadow(0 0 50px rgba(168,85,247,0.7))'
          }}>
            🎓
          </div>

          {/* Title */}
          <h1 style={{
            fontSize: 'clamp(3rem, 10vw, 6.5rem)',
            fontWeight: '900',
            lineHeight: 1,
            margin: '0 0 28px 0',
            background: 'linear-gradient(135deg, #22d3ee, #a855f7, #ec4899, #22d3ee)',
            backgroundSize: '300% auto',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            animation: 'gradientShift 5s ease infinite',
            letterSpacing: '-0.02em'
          }}>
            Elite Workshops
          </h1>

          <p style={{
            fontSize: 'clamp(1.1rem, 3.5vw, 1.5rem)',
            color: '#cbd5e1',
            maxWidth: '800px',
            margin: '0 auto 60px',
            lineHeight: 1.8,
            fontWeight: 400
          }}>
            Transform into an <span style={{ color: '#a855f7', fontWeight: '700' }}>industry-leading engineer</span> through 
            intensive, <span style={{ color: '#22d3ee', fontWeight: '700' }}>mentor-led programs</span> designed for real-world impact
          </p>

          {/* Stats Grid */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 'clamp(16px, 5vw, 32px)',
            flexWrap: 'wrap',
            marginBottom: '50px'
          }}>
            {[
              { icon: Users, value: 2225, label: 'Engineers Trained', color: '#a855f7' },
              { icon: Award, value: 98, label: 'Success Rate', color: '#22d3ee', suffix: '%' },
              { icon: Rocket, value: 42, label: 'Live Projects', color: '#10b981', suffix: '+' }
            ].map((stat, i) => (
              <div
                key={i}
                style={{
                  position: 'relative',
                  padding: 'clamp(18px, 5vw, 26px) clamp(28px, 7vw, 44px)',
                  background: 'rgba(255,255,255,0.04)',
                  backdropFilter: 'blur(30px)',
                  border: `2.5px solid ${stat.color}45`,
                  borderRadius: '24px',
                  animation: `glowPulse 4s ease-in-out ${i * 0.4}s infinite`,
                  overflow: 'hidden'
                }}
              >
                {/* Rotating Gradient Border */}
                <div style={{
                  position: 'absolute',
                  inset: '-100%',
                  background: `conic-gradient(from 0deg, transparent, ${stat.color}35, transparent)`,
                  animation: 'rotateGradient 8s linear infinite'
                }} />
                
                <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <stat.icon size={window.innerWidth < 640 ? 22 : 28} color={stat.color} strokeWidth={2.5} />
                  <div>
                    <div style={{
                      fontSize: 'clamp(1.8rem, 5vw, 2.6rem)',
                      fontWeight: '900',
                      color: stat.color,
                      letterSpacing: '-0.02em'
                    }}>
                      <Counter target={stat.value} />{stat.suffix || ''}
                    </div>
                    <div style={{
                      fontSize: 'clamp(11px, 2.5vw, 13px)',
                      color: '#94a3b8',
                      fontWeight: '600',
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase'
                    }}>
                      {stat.label}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Workshops Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 360px), 1fr))',
          gap: 'clamp(28px, 6vw, 48px)'
        }}>
          {workshops.map((ws, idx) => (
            <div
              key={idx}
              onMouseEnter={() => setHover(idx)}
              onMouseLeave={() => setHover(null)}
              onClick={() => setSelected(ws)}
              style={{
                position: 'relative',
                cursor: 'pointer',
                opacity: visible ? 1 : 0,
                animation: `fadeInUp 1s ease ${idx * 0.18}s backwards`,
                transform: hover === idx ? 'translateY(-14px) scale(1.03)' : 'scale(1)',
                transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)'
              }}
            >
              {/* Glow Effect */}
              <div style={{
                position: 'absolute',
                inset: '-50px',
                background: `radial-gradient(circle at 50% 50%, ${ws.color}45, transparent 68%)`,
                filter: 'blur(70px)',
                opacity: hover === idx ? 1 : 0,
                transition: 'opacity 0.6s',
                pointerEvents: 'none'
              }} />

              {/* Card */}
              <div style={{
                position: 'relative',
                padding: 'clamp(32px, 7vw, 48px)',
                background: 'rgba(15,15,45,0.75)',
                backdropFilter: 'blur(35px)',
                borderRadius: '32px',
                border: hover === idx ? `2.5px solid ${ws.color}` : '2.5px solid rgba(168,85,247,0.18)',
                overflow: 'hidden',
                boxShadow: hover === idx 
                  ? `0 50px 120px ${ws.color}55` 
                  : '0 25px 70px rgba(0,0,0,0.5)',
                transition: 'all 0.6s'
              }}>
                {/* Background Gradient Overlay */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: ws.gradient,
                  opacity: hover === idx ? 0.18 : 0.08,
                  transition: 'opacity 0.6s',
                  mixBlendMode: 'screen'
                }} />

                {/* Shimmer Effect */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)',
                  backgroundSize: '200% 100%',
                  animation: hover === idx ? 'shimmerMove 2.5s infinite' : 'none',
                  pointerEvents: 'none'
                }} />

                {/* Featured Badge */}
                {ws.featured && (
                  <div style={{
                    position: 'absolute',
                    top: '24px',
                    right: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '10px 20px',
                    background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
                    borderRadius: '24px',
                    fontSize: 'clamp(11px, 2.8vw, 13px)',
                    fontWeight: '800',
                    color: '#000',
                    boxShadow: '0 8px 32px rgba(251,191,36,0.7)',
                    animation: 'glowPulse 3s ease-in-out infinite',
                    zIndex: 10,
                    letterSpacing: '0.05em'
                  }}>
                    <Crown size={16} strokeWidth={3} />
                    FEATURED
                  </div>
                )}

                {/* Icon Container */}
                <div style={{
                  position: 'relative',
                  width: 'clamp(100px, 22vw, 140px)',
                  height: 'clamp(100px, 22vw, 140px)',
                  background: ws.gradient,
                  borderRadius: '28px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 32px',
                  boxShadow: `0 25px 70px ${ws.color}65`,
                  transform: hover === idx ? 'scale(1.18) rotate(6deg)' : 'scale(1)',
                  transition: 'transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  overflow: 'hidden'
                }}>
                  {/* Rotating Glow */}
                  <div style={{
                    position: 'absolute',
                    inset: '-60%',
                    background: `conic-gradient(from 0deg, transparent, ${ws.color}85, transparent)`,
                    animation: hover === idx ? 'rotateGradient 4s linear infinite' : 'none'
                  }} />
                  
                  <ws.icon 
                    size={window.innerWidth < 640 ? 56 : 70} 
                    color="white" 
                    strokeWidth={2.5}
                    style={{ position: 'relative', zIndex: 1 }}
                  />
                </div>

                {/* Title */}
                <h3 style={{
                  fontSize: 'clamp(1.6rem, 5vw, 2.3rem)',
                  fontWeight: '900',
                  background: ws.gradient,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  marginBottom: '20px',
                  textAlign: 'center',
                  lineHeight: 1.2,
                  letterSpacing: '-0.01em'
                }}>
                  {ws.title}
                </h3>

                {/* Description */}
                <p style={{
                  color: '#cbd5e1',
                  fontSize: 'clamp(1rem, 2.8vw, 1.15rem)',
                  lineHeight: 1.75,
                  marginBottom: '28px',
                  textAlign: 'center',
                  opacity: hover === idx ? 1 : 0.92,
                  transition: 'opacity 0.5s'
                }}>
                  {ws.desc}
                </p>

                {/* Stats Row */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: 'clamp(12px, 4vw, 20px)',
                  marginBottom: '32px',
                  flexWrap: 'wrap'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '10px 18px',
                    background: 'rgba(255,255,255,0.06)',
                    borderRadius: '14px',
                    border: `1.5px solid ${ws.color}35`
                  }}>
                    <Calendar size={18} color={ws.color} strokeWidth={2.5} />
                    <span style={{ 
                      fontWeight: '700', 
                      fontSize: 'clamp(13px, 2.8vw, 15px)',
                      color: '#e2e8f0'
                    }}>
                      {ws.duration}
                    </span>
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '10px 18px',
                    background: 'rgba(255,255,255,0.06)',
                    borderRadius: '14px',
                    border: `1.5px solid ${ws.color}35`
                  }}>
                    <Users size={18} color={ws.color} strokeWidth={2.5} />
                    <span style={{ 
                      fontWeight: '700', 
                      fontSize: 'clamp(13px, 2.8vw, 15px)',
                      color: '#e2e8f0'
                    }}>
                      <Counter target={ws.enrolled} />+
                    </span>
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '10px 18px',
                    background: 'rgba(255,255,255,0.06)',
                    borderRadius: '14px',
                    border: `1.5px solid ${ws.color}35`
                  }}>
                    <Sparkles size={18} color={ws.color} strokeWidth={2.5} />
                    <span style={{ 
                      fontWeight: '700', 
                      fontSize: 'clamp(13px, 2.8vw, 15px)',
                      color: '#e2e8f0'
                    }}>
                      {ws.level}
                    </span>
                  </div>
                </div>

                {/* CTA Button */}
                <div style={{ textAlign: 'center' }}>
                  <button
                    style={{
                      padding: 'clamp(14px, 3.5vw, 18px) clamp(32px, 7vw, 48px)',
                      background: ws.gradient,
                      borderRadius: '999px',
                      color: 'white',
                      fontWeight: '800',
                      fontSize: 'clamp(14px, 3.5vw, 17px)',
                      border: 'none',
                      cursor: 'pointer',
                      boxShadow: `0 12px 48px ${ws.color}65`,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '12px',
                      transition: 'all 0.4s',
                      transform: hover === idx ? 'scale(1.06)' : 'scale(1)',
                      letterSpacing: '0.02em'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  >
                    View Details <ArrowRight size={20} strokeWidth={2.5} />
                  </button>
                </div>

                {/* Corner Accents */}
                <div style={{
                  position: 'absolute',
                  top: '20px',
                  left: '20px',
                  width: '35px',
                  height: '35px',
                  borderTop: `3px solid ${ws.color}`,
                  borderLeft: `3px solid ${ws.color}`,
                  borderTopLeftRadius: '18px',
                  opacity: hover === idx ? 1 : 0.35,
                  transition: 'opacity 0.5s'
                }} />
                <div style={{
                  position: 'absolute',
                  bottom: '20px',
                  right: '20px',
                  width: '35px',
                  height: '35px',
                  borderBottom: `3px solid ${ws.color}`,
                  borderRight: `3px solid ${ws.color}`,
                  borderBottomRightRadius: '18px',
                  opacity: hover === idx ? 1 : 0.35,
                  transition: 'opacity 0.5s'
                }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Workshop Detail Modal */}
      {selected && (
        <div
          onClick={() => setSelected(null)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.95)',
            backdropFilter: 'blur(40px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 'clamp(20px, 6vw, 48px)',
            zIndex: 1000,
            animation: 'scaleIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)'
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'relative',
              maxWidth: '1000px',
              width: '100%',
              background: 'rgba(15,15,45,0.98)',
              backdropFilter: 'blur(50px)',
              borderRadius: '40px',
              padding: 'clamp(40px, 8vw, 80px)',
              border: `3px solid ${selected.color}`,
              boxShadow: `0 60px 150px ${selected.color}75`,
              maxHeight: '92vh',
              overflowY: 'auto'
            }}
          >
            {/* Animated Background Glow */}
            <div style={{
              position: 'absolute',
              inset: '-100px',
              background: `radial-gradient(circle at 50% 0%, ${selected.color}35, transparent 68%)`,
              filter: 'blur(120px)',
              animation: 'glowPulse 5s ease-in-out infinite',
              pointerEvents: 'none'
            }} />

            {/* Close Button */}
            <button
              onClick={() => setSelected(null)}
              style={{
                position: 'absolute',
                top: '28px',
                right: '28px',
                width: '52px',
                height: '52px',
                borderRadius: '50%',
                background: 'rgba(239,68,68,0.95)',
                border: '3px solid rgba(255,255,255,0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 12px 40px rgba(239,68,68,0.6)',
                transition: 'all 0.3s',
                zIndex: 10
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.1) rotate(90deg)';
                e.currentTarget.style.background = 'rgba(239,68,68,1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
                e.currentTarget.style.background = 'rgba(239,68,68,0.95)';
              }}
            >
              <X size={28} color="#fff" />
            </button>

            {/* Workshop Icon */}
            <div style={{
              width: 'clamp(120px, 25vw, 160px)',
              height: 'clamp(120px, 25vw, 160px)',
              margin: '0 auto 32px',
              background: selected.gradient,
              borderRadius: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: `0 25px 70px ${selected.color}65`,
              transform: 'rotate(6deg)'
            }}>
              <selected.icon size={window.innerWidth < 640 ? 60 : 80} color="white" strokeWidth={2.5} />
            </div>

            {/* Title */}
            <h1 style={{
              fontSize: 'clamp(2.5rem, 7vw, 4rem)',
              fontWeight: '900',
              background: selected.gradient,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textAlign: 'center',
              marginBottom: '24px',
              lineHeight: 1.2
            }}>
              {selected.title}
            </h1>

            {/* Description */}
            <p style={{
              fontSize: 'clamp(1.1rem, 3vw, 1.4rem)',
              color: '#cbd5e1',
              lineHeight: 1.8,
              textAlign: 'center',
              marginBottom: '40px'
            }}>
              {selected.fullDesc}
            </p>

            {/* Stats Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: 'clamp(20px, 4vw, 32px)',
              marginBottom: '40px'
            }}>
              <div style={{
                padding: '20px',
                background: 'rgba(255,255,255,0.08)',
                borderRadius: '20px',
                border: `2px solid ${selected.color}40`,
                textAlign: 'center'
              }}>
                <Calendar size={32} color={selected.color} style={{ marginBottom: '12px' }} />
                <div style={{ fontSize: '1.6rem', fontWeight: '900', color: '#fff' }}>
                  {selected.duration}
                </div>
                <div style={{ fontSize: '0.9rem', color: '#94a3b8', marginTop: '8px' }}>
                  Duration
                </div>
              </div>

              <div style={{
                padding: '20px',
                background: 'rgba(255,255,255,0.08)',
                borderRadius: '20px',
                border: `2px solid ${selected.color}40`,
                textAlign: 'center'
              }}>
                <Users size={32} color={selected.color} style={{ marginBottom: '12px' }} />
                <div style={{ fontSize: '1.6rem', fontWeight: '900', color: '#fff' }}>
                  <Counter target={selected.enrolled} />+
                </div>
                <div style={{ fontSize: '0.9rem', color: '#94a3b8', marginTop: '8px' }}>
                  Enrolled Students
                </div>
              </div>

              <div style={{
                padding: '20px',
                background: 'rgba(255,255,255,0.08)',
                borderRadius: '20px',
                border: `2px solid ${selected.color}40`,
                textAlign: 'center'
              }}>
                <Layers size={32} color={selected.color} style={{ marginBottom: '12px' }} />
                <div style={{ fontSize: '1.6rem', fontWeight: '900', color: '#fff' }}>
                  {selected.projects}
                </div>
                <div style={{ fontSize: '0.9rem', color: '#94a3b8', marginTop: '8px' }}>
                  Real Projects
                </div>
              </div>

              <div style={{
                padding: '20px',
                background: 'rgba(255,255,255,0.08)',
                borderRadius: '20px',
                border: `2px solid ${selected.color}40`,
                textAlign: 'center'
              }}>
                <Star size={32} color={selected.color} style={{ marginBottom: '12px' }} />
                <div style={{ fontSize: '1.6rem', fontWeight: '900', color: '#fff' }}>
                  {selected.level}
                </div>
                <div style={{ fontSize: '0.9rem', color: '#94a3b8', marginTop: '8px' }}>
                  Difficulty
                </div>
              </div>
            </div>

            {/* Skills List */}
            <div style={{
              marginTop: '40px'
            }}>
              <h3 style={{
                fontSize: 'clamp(1.6rem, 4vw, 2rem)',
                fontWeight: '900',
                color: selected.color,
                marginBottom: '24px',
                textAlign: 'center'
              }}>
                Key Skills You'll Master
              </h3>

              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '12px',
                justifyContent: 'center'
              }}>
                {selected.skills.map((skill, i) => (
                  <div
                    key={i}
                    style={{
                      padding: '12px 24px',
                      background: 'rgba(255,255,255,0.08)',
                      borderRadius: '999px',
                      border: `2px solid ${selected.color}40`,
                      fontSize: 'clamp(0.95rem, 2.5vw, 1.1rem)',
                      fontWeight: '700',
                      color: '#e2e8f0',
                      transition: 'all 0.3s'
                    }}
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <div style={{
              textAlign: 'center',
              marginTop: '60px'
            }}>
              <button
                style={{
                  padding: 'clamp(16px, 4vw, 20px) clamp(40px, 8vw, 60px)',
                  background: selected.gradient,
                  borderRadius: '999px',
                  color: 'white',
                  fontWeight: '800',
                  fontSize: 'clamp(1.1rem, 3vw, 1.3rem)',
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: `0 15px 50px ${selected.color}75`,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '14px',
                  transition: 'all 0.4s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.08)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                Enroll Now <ArrowRight size={24} strokeWidth={2.5} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}