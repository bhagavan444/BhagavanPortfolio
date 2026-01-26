import { useState, useEffect, useRef } from "react";
import {
  Smartphone, Code, Brain, Cpu, Shield, GitBranch,
  Calendar, Users, Sparkles, Zap, Star, Award,
  Rocket, BookOpen, X, CheckCircle2, ArrowRight,
  GraduationCap, Layers, Terminal, Database, Server, Lock,
  Globe, TrendingUp, Target, Clock, Trophy, Flame,
  Microscope, Workflow, Network, Binary, ChevronRight,
  Play, Pause, Filter, Search, BarChart3
} from "lucide-react";

const workshops = [
  {
    title: "Quantum Computing Fundamentals",
    icon: Cpu,
    color: "#00f0ff",
    category: "Emerging Tech",
    rarity: "Legendary",
    desc: "Master quantum algorithms, qubits, and quantum circuit design for next-gen computing.",
    fullDesc: "Dive deep into quantum mechanics, quantum gates, entanglement, and quantum algorithms. Build real quantum circuits using Qiskit and explore quantum machine learning applications.",
    skills: ["Qiskit", "Quantum Gates", "Superposition", "Entanglement", "Q-Algorithms", "IBM Quantum"],
    whatILearned: [
      "Understanding quantum mechanics principles",
      "Designing and simulating quantum circuits",
      "Implementing Grover's and Shor's algorithms",
      "Quantum machine learning applications",
      "Working with IBM Quantum Experience"
    ],
    outcomes: [
      "Built 5+ quantum algorithms from scratch",
      "Created quantum ML models",
      "Achieved 95% quantum circuit efficiency"
    ],
    duration: "14 Weeks",
    level: "Advanced",
    projects: 9,
    enrolled: 342,
    featured: true,
    difficulty: 95,
    completionRate: 68,
    avgSalaryBoost: "+45%",
    certifications: ["IBM Quantum Developer", "Quantum Computing Specialist"]
  },
  {
    title: "Advanced Blockchain Architecture",
    icon: Lock,
    color: "#a78bfa",
    category: "Web3",
    rarity: "Epic",
    desc: "Design decentralized systems, smart contracts, and build production-grade blockchain solutions.",
    fullDesc: "Master blockchain fundamentals, consensus algorithms, smart contract security, DeFi protocols, and build scalable decentralized applications on multiple chains.",
    skills: ["Solidity", "Rust", "Smart Contracts", "Web3.js", "DeFi Protocols", "Layer 2"],
    whatILearned: [
      "Building secure smart contracts",
      "Implementing consensus mechanisms",
      "DeFi protocol architecture",
      "Cross-chain interoperability",
      "Smart contract auditing"
    ],
    outcomes: [
      "Deployed 12+ production smart contracts",
      "Built DeFi lending protocol",
      "Passed smart contract security audits"
    ],
    duration: "16 Weeks",
    level: "Advanced",
    projects: 11,
    enrolled: 567,
    featured: true,
    difficulty: 88,
    completionRate: 72,
    avgSalaryBoost: "+52%",
    certifications: ["Certified Blockchain Developer", "Smart Contract Auditor"]
  },
  {
    title: "AI/ML System Design at Scale",
    icon: Brain,
    color: "#ff61d2",
    category: "AI/ML",
    rarity: "Legendary",
    desc: "Build production ML systems handling millions of predictions with advanced MLOps practices.",
    fullDesc: "Learn to design, deploy, and maintain large-scale ML systems. Master MLOps, model monitoring, A/B testing, feature stores, and real-time inference at scale.",
    skills: ["MLOps", "Kubeflow", "Feature Engineering", "Model Monitoring", "A/B Testing", "Real-time ML"],
    whatILearned: [
      "Building scalable ML pipelines",
      "Implementing feature stores",
      "Real-time model serving",
      "ML system monitoring and observability",
      "Advanced model optimization"
    ],
    outcomes: [
      "Built ML systems serving 10M+ requests/day",
      "Reduced model latency by 80%",
      "Implemented automated retraining pipelines"
    ],
    duration: "18 Weeks",
    level: "Expert",
    projects: 14,
    enrolled: 423,
    featured: true,
    difficulty: 92,
    completionRate: 65,
    avgSalaryBoost: "+58%",
    certifications: ["ML Systems Engineer", "MLOps Professional"]
  },
  {
    title: "Distributed Systems Engineering",
    icon: Network,
    color: "#00ff88",
    category: "Backend",
    rarity: "Epic",
    desc: "Design fault-tolerant distributed systems with microservices, event-driven architecture.",
    fullDesc: "Master distributed computing patterns, consensus algorithms, distributed databases, message queues, and build highly available, fault-tolerant systems.",
    skills: ["Kafka", "Redis", "Kubernetes", "gRPC", "Distributed Databases", "Service Mesh"],
    whatILearned: [
      "Designing distributed architectures",
      "Implementing consensus algorithms",
      "Building event-driven systems",
      "Distributed tracing and monitoring",
      "Handling distributed transactions"
    ],
    outcomes: [
      "Built systems handling 100K+ RPS",
      "Achieved 99.99% uptime",
      "Implemented zero-downtime deployments"
    ],
    duration: "16 Weeks",
    level: "Advanced",
    projects: 12,
    enrolled: 678,
    featured: false,
    difficulty: 89,
    completionRate: 71,
    avgSalaryBoost: "+48%",
    certifications: ["Distributed Systems Architect", "Cloud Native Developer"]
  },
  {
    title: "Advanced Computer Vision",
    icon: Microscope,
    color: "#ffd700",
    category: "AI/ML",
    rarity: "Epic",
    desc: "Build state-of-the-art CV models for object detection, segmentation, and recognition.",
    fullDesc: "Master CNNs, Vision Transformers, object detection (YOLO, R-CNN), semantic segmentation, and deploy CV models at scale using TensorRT and ONNX.",
    skills: ["PyTorch", "YOLO", "Vision Transformers", "OpenCV", "TensorRT", "ONNX"],
    whatILearned: [
      "Training custom object detection models",
      "Implementing semantic segmentation",
      "Optimizing CV models for edge devices",
      "Building real-time video processing pipelines",
      "Transfer learning and fine-tuning"
    ],
    outcomes: [
      "Built models with 98%+ accuracy",
      "Deployed real-time inference systems",
      "Optimized models for 30+ FPS on edge"
    ],
    duration: "14 Weeks",
    level: "Advanced",
    projects: 10,
    enrolled: 534,
    featured: false,
    difficulty: 87,
    completionRate: 74,
    avgSalaryBoost: "+44%",
    certifications: ["Computer Vision Expert", "Deep Learning Specialist"]
  },
  {
    title: "Cloud Native Security",
    icon: Shield,
    color: "#ff4d6d",
    category: "Security",
    rarity: "Rare",
    desc: "Master zero-trust architecture, container security, and cloud security best practices.",
    fullDesc: "Learn advanced security patterns for cloud-native applications including secrets management, identity and access management, security scanning, and incident response.",
    skills: ["Zero Trust", "IAM", "Vault", "Container Security", "SIEM", "Penetration Testing"],
    whatILearned: [
      "Implementing zero-trust architecture",
      "Securing Kubernetes clusters",
      "Automated security scanning",
      "Threat modeling and risk assessment",
      "Incident response procedures"
    ],
    outcomes: [
      "Reduced security vulnerabilities by 90%",
      "Achieved SOC 2 compliance",
      "Built automated security pipelines"
    ],
    duration: "12 Weeks",
    level: "Advanced",
    projects: 8,
    enrolled: 445,
    featured: false,
    difficulty: 82,
    completionRate: 79,
    avgSalaryBoost: "+41%",
    certifications: ["Cloud Security Professional", "Kubernetes Security Specialist"]
  },
  {
    title: "Real-Time Data Engineering",
    icon: Zap,
    color: "#ff9500",
    category: "Data",
    rarity: "Epic",
    desc: "Build streaming data pipelines processing millions of events per second at scale.",
    fullDesc: "Master real-time data processing with Apache Kafka, Flink, and Spark Streaming. Build event-driven architectures and real-time analytics systems.",
    skills: ["Kafka", "Apache Flink", "Spark Streaming", "Debezium", "ClickHouse", "Real-time Analytics"],
    whatILearned: [
      "Building streaming data pipelines",
      "Implementing exactly-once semantics",
      "Real-time data transformations",
      "Stream processing patterns",
      "Building real-time dashboards"
    ],
    outcomes: [
      "Built pipelines processing 5M+ events/sec",
      "Achieved sub-second latency",
      "Implemented real-time fraud detection"
    ],
    duration: "14 Weeks",
    level: "Advanced",
    projects: 11,
    enrolled: 512,
    featured: false,
    difficulty: 86,
    completionRate: 73,
    avgSalaryBoost: "+46%",
    certifications: ["Streaming Data Engineer", "Real-time Systems Architect"]
  },
  {
    title: "Advanced System Design",
    icon: Workflow,
    color: "#00d4ff",
    category: "Architecture",
    rarity: "Legendary",
    desc: "Master designing systems like Netflix, Uber, Twitter at massive scale.",
    fullDesc: "Learn to design complex distributed systems handling billions of requests. Master trade-offs, scalability patterns, database sharding, caching strategies, and more.",
    skills: ["System Design", "Scalability", "CAP Theorem", "Load Balancing", "Caching", "Database Design"],
    whatILearned: [
      "Designing systems for massive scale",
      "Making architectural trade-offs",
      "Database sharding strategies",
      "Building globally distributed systems",
      "Performance optimization at scale"
    ],
    outcomes: [
      "Designed 15+ complex systems",
      "Passed FAANG system design interviews",
      "Built systems serving 100M+ users"
    ],
    duration: "12 Weeks",
    level: "Expert",
    projects: 15,
    enrolled: 892,
    featured: true,
    difficulty: 94,
    completionRate: 67,
    avgSalaryBoost: "+62%",
    certifications: ["Solutions Architect", "Distinguished Engineer Track"]
  }
];

const categories = ["All", "AI/ML", "Web3", "Backend", "Security", "Data", "Architecture", "Emerging Tech"];
const rarityColors = {
  "Legendary": "#ffd700",
  "Epic": "#a78bfa",
  "Rare": "#00f0ff"
};

export default function EliteWorkshops() {
  const [selected, setSelected] = useState(null);
  const [hoveredId, setHoveredId] = useState(null);
  const [filterCategory, setFilterCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [showFilters, setShowFilters] = useState(false);
  const canvasRef = useRef(null);

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

    const particles = Array.from({ length: 80 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      size: Math.random() * 2.5 + 1,
      color: ['#00f0ff', '#a78bfa', '#ff61d2'][Math.floor(Math.random() * 3)]
    }));

    const animate = () => {
      ctx.fillStyle = 'rgba(0,0,0,0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 6);
        gradient.addColorStop(0, `${p.color}40`);
        gradient.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 6, 0, Math.PI * 2);
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

  const Counter = ({ target }) => {
    const [count, setCount] = useState(0);
    useEffect(() => {
      let start = 0;
      const duration = 1500;
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
    return <span>{count}</span>;
  };

  const filteredWorkshops = workshops
    .filter(w => filterCategory === "All" || w.category === filterCategory)
    .filter(w => w.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                 w.desc.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === "featured") return b.featured - a.featured;
      if (sortBy === "difficulty") return b.difficulty - a.difficulty;
      if (sortBy === "enrolled") return b.enrolled - a.enrolled;
      return 0;
    });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Fira+Code:wght@400;500;600&display=swap');

        * { margin: 0; padding: 0; box-sizing: border-box; }

        :root {
          --neon-cyan: #00f0ff;
          --neon-purple: #a78bfa;
          --neon-pink: #ff61d2;
          --neon-gold: #ffd700;
          --neon-gradient: linear-gradient(135deg, #00f0ff, #a78bfa, #ff61d2);
        }

        @keyframes slideUp { from { opacity:0; transform:translateY(40px); } to { opacity:1; transform:translateY(0); } }
        @keyframes glow { 0%,100% { opacity:1; } 50% { opacity:0.6; } }
        @keyframes float { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-12px); } }
        @keyframes shimmer { 0% { background-position: -200%; } 100% { background-position: 200%; } }
        @keyframes rotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

        .workshop-card {
          position: relative;
          background: rgba(10,10,30,0.95);
          border: 2px solid rgba(0,240,255,0.3);
          border-radius: 24px;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.4,0,0.2,1);
          cursor: pointer;
        }

        .workshop-card:hover {
          transform: translateY(-12px);
          border-color: var(--neon-cyan);
          box-shadow: 0 20px 60px rgba(0,240,255,0.4);
        }

        .workshop-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, transparent 30%, rgba(0,240,255,0.1) 50%, transparent 70%);
          background-size: 200% 200%;
          animation: shimmer 3s infinite;
          pointer-events: none;
        }

        .rarity-badge {
          padding: 0.4rem 1rem;
          border-radius: 999px;
          font-size: 0.75rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 1px;
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
        }

        .filter-btn {
          padding: 0.7rem 1.5rem;
          background: rgba(0,0,0,0.6);
          border: 2px solid rgba(0,240,255,0.3);
          border-radius: 999px;
          color: #fff;
          cursor: pointer;
          transition: all 0.3s;
          font-family: 'Fira Code', monospace;
          font-size: 0.9rem;
        }

        .filter-btn:hover, .filter-btn.active {
          background: rgba(0,240,255,0.2);
          border-color: var(--neon-cyan);
          transform: scale(1.05);
        }

        .search-input {
          width: 100%;
          padding: 1rem 1.5rem 1rem 3.5rem;
          background: rgba(0,0,0,0.6);
          border: 2px solid rgba(0,240,255,0.3);
          border-radius: 999px;
          color: #fff;
          font-family: 'Fira Code', monospace;
          font-size: 1rem;
          outline: none;
          transition: all 0.3s;
        }

        .search-input:focus {
          border-color: var(--neon-cyan);
          box-shadow: 0 0 20px rgba(0,240,255,0.3);
        }

        .stat-card {
          background: rgba(0,0,0,0.4);
          border: 2px solid rgba(0,240,255,0.2);
          border-radius: 16px;
          padding: 1.5rem;
          text-align: center;
          transition: all 0.3s;
        }

        .stat-card:hover {
          border-color: var(--neon-cyan);
          transform: translateY(-4px);
        }

        @media (max-width: 768px) {
          .workshop-grid { 
            grid-template-columns: 1fr !important;
            padding: 0 0.5rem;
          }
          .filter-container { flex-direction: column !important; }
          .search-container { margin-bottom: 1rem; }
          .workshop-card {
            max-width: 100%;
            margin: 0 auto;
          }
        }

        @media (max-width: 480px) {
          .workshop-grid {
            gap: 2rem !important;
          }
        }
      `}</style>

      <div style={{
        minHeight: '100vh',
        background: '#000000',
        color: '#e0e0ff',
        position: 'relative',
        overflow: 'hidden',
        padding: 'clamp(4rem, 10vw, 8rem) 1.5rem 6rem',
        fontFamily: "'Outfit', sans-serif"
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(0,240,255,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,240,255,0.05) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          opacity: 0.3,
          pointerEvents: 'none'
        }} />

        <canvas ref={canvasRef} style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 1
        }} />

        <div style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: '1600px',
          margin: '0 auto'
        }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.8rem',
              padding: '0.6rem 1.5rem',
              background: 'rgba(0,240,255,0.1)',
              border: '2px solid rgba(0,240,255,0.4)',
              borderRadius: '999px',
              marginBottom: '1.5rem',
              animation: 'glow 2s infinite'
            }}>
              <Flame size={20} color="#ffd700" />
              <span style={{ fontFamily: "'Fira Code', monospace", fontSize: '0.9rem', fontWeight: 600 }}>
                ELITE DEVELOPER PROGRAMS
              </span>
            </div>

            <h1 style={{
              fontSize: 'clamp(3.5rem, 10vw, 7rem)',
              fontWeight: 900,
              background: 'var(--neon-gradient)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '2px',
              marginBottom: '1.5rem',
              textTransform: 'uppercase'
            }}>
              LEGENDARY WORKSHOPS
            </h1>

            <p style={{
              fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)',
              color: '#a0a0d0',
              maxWidth: '900px',
              margin: '0 auto 3rem',
              lineHeight: 1.8
            }}>
              Master cutting-edge technologies through intensive, hands-on programs designed for elite developers. 
              Join the top 1% of engineering talent worldwide.
            </p>

            {/* Global Stats */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1.5rem',
              maxWidth: '1000px',
              margin: '0 auto'
            }}>
              {[
                { icon: Users, label: "Elite Students", value: 4500, suffix: "+" },
                { icon: Trophy, label: "Completion Rate", value: 73, suffix: "%" },
                { icon: Rocket, label: "Avg Salary Boost", value: 48, suffix: "%" },
                { icon: Award, label: "Industry Certs", value: 16, suffix: "" }
              ].map((stat, i) => (
                <div key={i} className="stat-card" style={{ animation: `slideUp ${0.3 + i * 0.1}s ease-out` }}>
                  <stat.icon size={32} color="#00f0ff" style={{ margin: '0 auto 0.8rem' }} />
                  <div style={{ fontSize: '2.5rem', fontWeight: 900, color: '#fff', marginBottom: '0.3rem' }}>
                    <Counter target={stat.value} />{stat.suffix}
                  </div>
                  <div style={{ fontSize: '0.9rem', color: '#888', fontFamily: "'Fira Code', monospace" }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Filters & Search */}
          <div style={{
            marginBottom: '4rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '2rem'
          }}>
            <div style={{ position: 'relative', maxWidth: '600px', margin: '0 auto', width: '100%' }}>
              <Search size={20} style={{
                position: 'absolute',
                left: '1.5rem',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#00f0ff'
              }} />
              <input
                type="text"
                placeholder="Search workshops..."
                className="search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div style={{
              display: 'flex',
              justifyContent: 'center',
              flexWrap: 'wrap',
              gap: '1rem'
            }}>
              {categories.map(cat => (
                <button
                  key={cat}
                  className={`filter-btn ${filterCategory === cat ? 'active' : ''}`}
                  onClick={() => setFilterCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '1rem',
              fontSize: '0.9rem'
            }}>
              <span style={{ color: '#888' }}>Sort by:</span>
              {['featured', 'difficulty', 'enrolled'].map(sort => (
                <button
                  key={sort}
                  onClick={() => setSortBy(sort)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: sortBy === sort ? '#00f0ff' : '#666',
                    cursor: 'pointer',
                    fontFamily: "'Fira Code', monospace",
                    textTransform: 'capitalize',
                    fontWeight: sortBy === sort ? 700 : 400
                  }}
                >
                  {sort}
                </button>
              ))}
            </div>
          </div>

          {/* Workshops Grid */}
          <div className="workshop-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(380px, 100%), 1fr))',
            gap: '2.5rem',
            marginBottom: '6rem',
            width: '100%',
            maxWidth: '100%'
          }}>
            {filteredWorkshops.map((ws, i) => (
              <div
                key={i}
                className="workshop-card"
                onMouseEnter={() => setHoveredId(i)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => setSelected(ws)}
                style={{ animation: `slideUp ${0.4 + i * 0.1}s ease-out` }}
              >
                <div style={{
                  height: '200px',
                  background: `linear-gradient(135deg, ${ws.color}20, transparent)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative'
                }}>
                  <div style={{
                    width: '120px',
                    height: '120px',
                    border: `3px solid ${ws.color}`,
                    borderRadius: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    animation: hoveredId === i ? 'float 2s ease-in-out infinite' : 'none',
                    boxShadow: hoveredId === i ? `0 0 40px ${ws.color}` : 'none'
                  }}>
                    <ws.icon size={60} color={ws.color} />
                  </div>

                  <div style={{ position: 'absolute', top: '1rem', left: '1rem' }}>
                    <div className="rarity-badge" style={{
                      background: `${rarityColors[ws.rarity]}20`,
                      border: `2px solid ${rarityColors[ws.rarity]}`,
                      color: rarityColors[ws.rarity]
                    }}>
                      <Star size={14} fill={rarityColors[ws.rarity]} />
                      {ws.rarity}
                    </div>
                  </div>

                  {ws.featured && (
                    <div style={{
                      position: 'absolute',
                      top: '1rem',
                      right: '1rem',
                      padding: '0.4rem 1rem',
                      background: 'rgba(255,215,0,0.2)',
                      border: '2px solid #ffd700',
                      borderRadius: '999px',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      color: '#ffd700'
                    }}>
                      FEATURED
                    </div>
                  )}
                </div>

                <div style={{ padding: '2rem' }}>
                  <div style={{
                    fontSize: '0.85rem',
                    color: ws.color,
                    fontFamily: "'Fira Code', monospace",
                    marginBottom: '0.8rem',
                    fontWeight: 600
                  }}>
                    {ws.category}
                  </div>

                  <h3 style={{
                    fontSize: '1.6rem',
                    fontWeight: 800,
                    color: '#fff',
                    marginBottom: '1rem'
                  }}>
                    {ws.title}
                  </h3>

                  <p style={{
                    fontSize: '0.95rem',
                    color: '#a0a0c0',
                    lineHeight: 1.6,
                    marginBottom: '1.5rem'
                  }}>
                    {ws.desc}
                  </p>

                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '0.8rem',
                    marginBottom: '1.5rem'
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.5rem 1rem',
                      background: 'rgba(0,0,0,0.5)',
                      borderRadius: '999px',
                      fontSize: '0.85rem',
                      border: `1px solid ${ws.color}30`
                    }}>
                      <Clock size={14} color={ws.color} />
                      {ws.duration}
                    </div>

                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.5rem 1rem',
                      background: 'rgba(0,0,0,0.5)',
                      borderRadius: '999px',
                      fontSize: '0.85rem',
                      border: `1px solid ${ws.color}30`
                    }}>
                      <Target size={14} color={ws.color} />
                      {ws.difficulty}% Difficulty
                    </div>
                  </div>

                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '1.5rem',
                    padding: '1rem',
                    background: 'rgba(0,0,0,0.3)',
                    borderRadius: '12px',
                    border: `1px solid ${ws.color}20`
                  }}>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '1.5rem', fontWeight: 800, color: ws.color }}>
                        {ws.enrolled}+
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#666' }}>Students</div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '1.5rem', fontWeight: 800, color: ws.color }}>
                        {ws.completionRate}%
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#666' }}>Complete</div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '1.5rem', fontWeight: 800, color: ws.color }}>
                        {ws.avgSalaryBoost}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#666' }}>Salary ↑</div>
                    </div>
                  </div>

                  <button style={{
                    width: '100%',
                    padding: '1rem',
                    background: `linear-gradient(90deg, ${ws.color}, #fff)`,
                    color: '#000',
                    border: 'none',
                    borderRadius: '999px',
                    fontWeight: 800,
                    fontSize: '1rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.8rem',
                    transition: 'all 0.3s'
                  }}>
                    <ChevronRight size={20} />
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredWorkshops.length === 0 && (
            <div style={{
              textAlign: 'center',
              padding: '4rem',
              color: '#666',
              fontSize: '1.2rem'
            }}>
              No workshops found matching your criteria
            </div>
          )}

          {/* CTA Section */}
          <div style={{
            padding: '4rem 2rem',
            background: 'rgba(0,0,0,0.8)',
            border: '3px solid rgba(0,240,255,0.3)',
            borderRadius: '32px',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'var(--neon-gradient)',
              opacity: 0.05,
              pointerEvents: 'none'
            }} />

            <h2 style={{
              fontSize: 'clamp(2.5rem, 6vw, 4rem)',
              fontWeight: 900,
              background: 'var(--neon-gradient)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '1.5rem'
            }}>
              JOIN THE ELITE
            </h2>

            <p style={{
              fontSize: '1.2rem',
              color: '#a0a0d0',
              maxWidth: '700px',
              margin: '0 auto 3rem',
              lineHeight: 1.8
            }}>
              These programs are designed for serious developers ready to master cutting-edge technologies 
              and accelerate their careers to the next level.
            </p>

            <div style={{
              display: 'flex',
              gap: '2rem',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              <a href="https://github.com/bhagavan444" target="_blank" rel="noopener noreferrer" style={{
                padding: '1.2rem 3rem',
                background: 'rgba(0,240,255,0.1)',
                border: '3px solid var(--neon-cyan)',
                borderRadius: '999px',
                color: 'var(--neon-cyan)',
                fontWeight: 800,
                fontSize: '1.1rem',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                transition: 'all 0.3s'
              }}>
                <Code size={24} />
                VIEW PORTFOLIO
              </a>

              <a href="mailto:g.sivasatyasaibhagavan@gmail.com" style={{
                padding: '1.2rem 3rem',
                background: 'var(--neon-gradient)',
                borderRadius: '999px',
                color: '#000',
                fontWeight: 900,
                fontSize: '1.1rem',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                boxShadow: '0 0 30px rgba(0,240,255,0.5)',
                transition: 'all 0.3s'
              }}>
                <Rocket size={24} />
                START YOUR JOURNEY
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Workshop Detail Modal */}
      {selected && (
        <div
          onClick={() => setSelected(null)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.97)',
            backdropFilter: 'blur(20px)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem',
            overflowY: 'auto'
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: 'rgba(10,10,30,0.98)',
              border: `4px solid ${selected.color}`,
              borderRadius: '32px',
              maxWidth: '1400px',
              width: '100%',
              maxHeight: '95vh',
              overflowY: 'auto',
              boxShadow: `0 0 100px ${selected.color}80`,
              position: 'relative'
            }}
          >
            <button
              onClick={() => setSelected(null)}
              style={{
                position: 'absolute',
                top: '1.5rem',
                right: '1.5rem',
                background: 'rgba(255,0,0,0.2)',
                border: '2px solid #ff4444',
                borderRadius: '50%',
                width: '48px',
                height: '48px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ff4444',
                cursor: 'pointer',
                zIndex: 10,
                transition: 'all 0.3s'
              }}
            >
              <X size={24} />
            </button>

            <div style={{
              height: '280px',
              background: `linear-gradient(135deg, ${selected.color}30, transparent)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              borderBottom: `2px solid ${selected.color}50`
            }}>
              <div style={{
                width: '160px',
                height: '160px',
                border: `4px solid ${selected.color}`,
                borderRadius: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                animation: 'float 3s ease-in-out infinite',
                boxShadow: `0 0 60px ${selected.color}`
              }}>
                <selected.icon size={80} color={selected.color} />
              </div>

              <div style={{
                position: 'absolute',
                top: '2rem',
                left: '2rem',
                display: 'flex',
                gap: '1rem'
              }}>
                <div className="rarity-badge" style={{
                  background: `${rarityColors[selected.rarity]}20`,
                  border: `2px solid ${rarityColors[selected.rarity]}`,
                  color: rarityColors[selected.rarity]
                }}>
                  <Star size={16} fill={rarityColors[selected.rarity]} />
                  {selected.rarity}
                </div>
                <div style={{
                  padding: '0.5rem 1.2rem',
                  background: `${selected.color}20`,
                  border: `2px solid ${selected.color}`,
                  borderRadius: '999px',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  color: selected.color
                }}>
                  {selected.category}
                </div>
              </div>
            </div>

            <div style={{ padding: '3rem' }}>
              <h2 style={{
                fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
                fontWeight: 900,
                background: 'var(--neon-gradient)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: '1rem',
                textAlign: 'center'
              }}>
                {selected.title}
              </h2>

              <p style={{
                fontSize: '1.3rem',
                color: '#c0c0e0',
                textAlign: 'center',
                marginBottom: '3rem',
                lineHeight: 1.8
              }}>
                {selected.fullDesc}
              </p>

              {/* Stats Grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '1.5rem',
                marginBottom: '3rem'
              }}>
                {[
                  { icon: Calendar, label: "Duration", value: selected.duration },
                  { icon: Users, label: "Students", value: `${selected.enrolled}+` },
                  { icon: Target, label: "Difficulty", value: `${selected.difficulty}%` },
                  { icon: CheckCircle2, label: "Completion", value: `${selected.completionRate}%` },
                  { icon: Layers, label: "Projects", value: selected.projects },
                  { icon: TrendingUp, label: "Salary Boost", value: selected.avgSalaryBoost }
                ].map((stat, i) => (
                  <div key={i} style={{
                    padding: '1.5rem',
                    background: 'rgba(0,0,0,0.4)',
                    border: `2px solid ${selected.color}30`,
                    borderRadius: '16px',
                    textAlign: 'center'
                  }}>
                    <stat.icon size={28} color={selected.color} style={{ margin: '0 auto 0.8rem' }} />
                    <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#fff', marginBottom: '0.3rem' }}>
                      {stat.value}
                    </div>
                    <div style={{ fontSize: '0.9rem', color: '#666' }}>{stat.label}</div>
                  </div>
                ))}
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '2.5rem',
                marginBottom: '3rem'
              }}>
                {/* Skills */}
                <div>
                  <h3 style={{
                    fontSize: '2rem',
                    background: 'var(--neon-gradient)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    marginBottom: '1.5rem',
                    fontWeight: 800
                  }}>
                    <Terminal size={24} style={{ display: 'inline', marginRight: '0.5rem' }} />
                    Core Skills
                  </h3>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                    {selected.skills.map(skill => (
                      <span key={skill} style={{
                        padding: '0.7rem 1.3rem',
                        background: `${selected.color}15`,
                        border: `2px solid ${selected.color}40`,
                        borderRadius: '999px',
                        fontSize: '0.95rem',
                        fontFamily: "'Fira Code', monospace",
                        fontWeight: 600
                      }}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Certifications */}
                <div>
                  <h3 style={{
                    fontSize: '2rem',
                    background: 'var(--neon-gradient)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    marginBottom: '1.5rem',
                    fontWeight: 800
                  }}>
                    <Award size={24} style={{ display: 'inline', marginRight: '0.5rem' }} />
                    Certifications
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {selected.certifications.map(cert => (
                      <div key={cert} style={{
                        padding: '1rem 1.5rem',
                        background: 'rgba(0,0,0,0.4)',
                        border: `2px solid ${selected.color}50`,
                        borderRadius: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem'
                      }}>
                        <CheckCircle2 size={20} color={selected.color} />
                        <span style={{ fontWeight: 600 }}>{cert}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* What You'll Learn */}
              <div style={{ marginBottom: '3rem' }}>
                <h3 style={{
                  fontSize: '2rem',
                  background: 'var(--neon-gradient)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  marginBottom: '1.5rem',
                  fontWeight: 800
                }}>
                  <GraduationCap size={24} style={{ display: 'inline', marginRight: '0.5rem' }} />
                  What You'll Master
                </h3>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                  gap: '1rem'
                }}>
                  {selected.whatILearned.map((item, i) => (
                    <div key={i} style={{
                      padding: '1.2rem',
                      background: 'rgba(0,0,0,0.3)',
                      border: `1px solid ${selected.color}30`,
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '1rem'
                    }}>
                      <CheckCircle2 size={20} color={selected.color} style={{ flexShrink: 0, marginTop: '0.2rem' }} />
                      <span style={{ lineHeight: 1.6 }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Outcomes */}
              <div style={{
                padding: '2.5rem',
                background: `${selected.color}10`,
                border: `2px solid ${selected.color}40`,
                borderRadius: '24px',
                marginBottom: '3rem'
              }}>
                <h3 style={{
                  fontSize: '2rem',
                  background: 'var(--neon-gradient)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  marginBottom: '1.5rem',
                  fontWeight: 800,
                  textAlign: 'center'
                }}>
                  <Trophy size={24} style={{ display: 'inline', marginRight: '0.5rem' }} />
                  Expected Outcomes
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {selected.outcomes.map((outcome, i) => (
                    <div key={i} style={{
                      padding: '1.2rem 1.5rem',
                      background: 'rgba(0,0,0,0.5)',
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      fontSize: '1.1rem'
                    }}>
                      <Star size={20} color={selected.color} fill={selected.color} />
                      <span>{outcome}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Buttons */}
              <div style={{
                display: 'flex',
                gap: '2rem',
                justifyContent: 'center',
                flexWrap: 'wrap'
              }}>
                <button style={{
                  padding: '1.5rem 3.5rem',
                  background: `linear-gradient(90deg, ${selected.color}, #fff)`,
                  color: '#000',
                  border: 'none',
                  borderRadius: '999px',
                  fontWeight: 900,
                  fontSize: '1.2rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  boxShadow: `0 0 40px ${selected.color}80`,
                  transition: 'all 0.3s'
                }}>
                  <Rocket size={28} />
                  ENROLL NOW
                </button>

                <button
                  onClick={() => setSelected(null)}
                  style={{
                    padding: '1.5rem 3.5rem',
                    background: 'rgba(0,0,0,0.6)',
                    color: '#fff',
                    border: `2px solid ${selected.color}`,
                    borderRadius: '999px',
                    fontWeight: 800,
                    fontSize: '1.2rem',
                    cursor: 'pointer',
                    transition: 'all 0.3s'
                  }}
                >
                  BACK TO WORKSHOPS
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}