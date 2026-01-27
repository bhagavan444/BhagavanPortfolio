import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import {
  Smartphone, Code, Brain, Cpu, Shield, GitBranch,
  Calendar, Users, Sparkles, Zap, Star, Award,
  Rocket, BookOpen, X, CheckCircle2, ArrowRight,
  GraduationCap, Layers, Terminal, Database, Server, Lock,
  Globe, TrendingUp, Target, Clock, Trophy, Flame,
  Microscope, Workflow, Network, Binary, ChevronRight,
  Play, Pause, Filter, Search, BarChart3, Eye, Heart,
  Share2, Bookmark, Download, FileText, MonitorPlay,
  Code2, Lightbulb, Briefcase, Medal, Activity, 
  Linkedin, Github, Mail, ExternalLink
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
    certifications: ["IBM Quantum Developer", "Quantum Computing Specialist"],
    videos: 48,
    rating: 4.9,
    reviews: 284
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
    certifications: ["Certified Blockchain Developer", "Smart Contract Auditor"],
    videos: 56,
    rating: 4.8,
    reviews: 412
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
    certifications: ["ML Systems Engineer", "MLOps Professional"],
    videos: 64,
    rating: 4.9,
    reviews: 356
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
    certifications: ["Distributed Systems Architect", "Cloud Native Developer"],
    videos: 52,
    rating: 4.7,
    reviews: 489
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
    certifications: ["Computer Vision Expert", "Deep Learning Specialist"],
    videos: 46,
    rating: 4.8,
    reviews: 378
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
    certifications: ["Cloud Security Professional", "Kubernetes Security Specialist"],
    videos: 42,
    rating: 4.6,
    reviews: 312
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
    certifications: ["Streaming Data Engineer", "Real-time Systems Architect"],
    videos: 50,
    rating: 4.7,
    reviews: 445
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
    certifications: ["Solutions Architect", "Distinguished Engineer Track"],
    videos: 68,
    rating: 5.0,
    reviews: 621
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
  const [savedWorkshops, setSavedWorkshops] = useState(new Set());
  const canvasRef = useRef(null);
  const [scrollY, setScrollY] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    const codeSnippets = [
      '{ }', '< />', '( )', '[ ]', '=>', '::',
      'fn', 'def', 'var', 'let', 'const',
      '===', '!==', '&&', '||', '++',
      'import', 'export', 'async', 'await',
      'class', 'extends', 'return', 'new'
    ];

    class CodeParticle {
      constructor() {
        this.reset();
        this.y = Math.random() * canvas.height;
        this.opacity = Math.random() * 0.5 + 0.3;
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() < 0.5 ? -20 : canvas.height + 20;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.8;
        this.text = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
        this.color = ['#00f0ff', '#a78bfa', '#ff61d2', '#00ff88', '#ffd700'][Math.floor(Math.random() * 5)];
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.02;
        this.size = Math.random() * 8 + 12;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.rotation += this.rotationSpeed;

        if (this.x < -50 || this.x > canvas.width + 50 || 
            this.y < -50 || this.y > canvas.height + 50) {
          this.reset();
        }
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.font = `${this.size}px 'Fira Code', monospace`;
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.opacity;
        ctx.textAlign = 'center';
        ctx.fillText(this.text, 0, 0);
        ctx.restore();
      }
    }

    class GeometricShape {
      constructor() {
        this.reset();
        this.y = Math.random() * canvas.height;
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
        this.size = Math.random() * 40 + 20;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.01;
        this.color = ['#00f0ff', '#a78bfa', '#ff61d2', '#00ff88'][Math.floor(Math.random() * 4)];
        this.type = Math.floor(Math.random() * 4);
        this.opacity = Math.random() * 0.15 + 0.05;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.rotation += this.rotationSpeed;

        if (this.x < -100) this.x = canvas.width + 100;
        if (this.x > canvas.width + 100) this.x = -100;
        if (this.y < -100) this.y = canvas.height + 100;
        if (this.y > canvas.height + 100) this.y = -100;
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 2;
        ctx.globalAlpha = this.opacity;

        ctx.beginPath();
        if (this.type === 0) {
          ctx.moveTo(0, -this.size / 2);
          ctx.lineTo(this.size / 2, this.size / 2);
          ctx.lineTo(-this.size / 2, this.size / 2);
          ctx.closePath();
        } else if (this.type === 1) {
          ctx.rect(-this.size / 2, -this.size / 2, this.size, this.size);
        } else if (this.type === 2) {
          for (let i = 0; i < 6; i++) {
            const angle = (Math.PI / 3) * i;
            const x = Math.cos(angle) * this.size / 2;
            const y = Math.sin(angle) * this.size / 2;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.closePath();
        } else {
          ctx.arc(0, 0, this.size / 2, 0, Math.PI * 2);
        }
        ctx.stroke();
        ctx.restore();
      }
    }

    class GridLine {
      constructor(isVertical) {
        this.isVertical = isVertical;
        this.position = Math.random() * (isVertical ? canvas.width : canvas.height);
        this.speed = Math.random() * 0.5 + 0.2;
        this.opacity = Math.random() * 0.1 + 0.05;
        this.color = ['#00f0ff', '#a78bfa', '#ff61d2'][Math.floor(Math.random() * 3)];
      }

      update() {
        if (this.isVertical) {
          this.position += this.speed;
          if (this.position > canvas.width) this.position = 0;
        } else {
          this.position += this.speed;
          if (this.position > canvas.height) this.position = 0;
        }
      }

      draw() {
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 1;
        ctx.globalAlpha = this.opacity;
        ctx.beginPath();
        if (this.isVertical) {
          ctx.moveTo(this.position, 0);
          ctx.lineTo(this.position, canvas.height);
        } else {
          ctx.moveTo(0, this.position);
          ctx.lineTo(canvas.width, this.position);
        }
        ctx.stroke();
        ctx.globalAlpha = 1;
      }
    }

    const codeParticles = Array.from({ length: 40 }, () => new CodeParticle());
    const geometricShapes = Array.from({ length: 15 }, () => new GeometricShape());
    const gridLines = [
      ...Array.from({ length: 5 }, () => new GridLine(true)),
      ...Array.from({ length: 5 }, () => new GridLine(false))
    ];

    const animate = () => {
      const bgGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      bgGradient.addColorStop(0, '#000000');
      bgGradient.addColorStop(0.5, '#0a0a1e');
      bgGradient.addColorStop(1, '#000000');
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      gridLines.forEach(line => {
        line.update();
        line.draw();
      });

      geometricShapes.forEach(shape => {
        shape.update();
        shape.draw();
      });

      codeParticles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      ctx.strokeStyle = 'rgba(0,240,255,0.15)';
      ctx.lineWidth = 1;
      for (let i = 0; i < codeParticles.length; i++) {
        for (let j = i + 1; j < codeParticles.length; j++) {
          const dx = codeParticles[i].x - codeParticles[j].x;
          const dy = codeParticles[i].y - codeParticles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 200) {
            ctx.globalAlpha = (1 - distance / 200) * 0.3;
            ctx.beginPath();
            ctx.moveTo(codeParticles[i].x, codeParticles[i].y);
            ctx.lineTo(codeParticles[j].x, codeParticles[j].y);
            ctx.stroke();
          }
        }
      }
      ctx.globalAlpha = 1;

      time += 1;
      animationId = requestAnimationFrame(animate);
    };

    animate();
    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  const Counter = ({ target, suffix = "" }) => {
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
    return <span>{count}{suffix}</span>;
  };

  const toggleSave = useCallback((index) => {
    setSavedWorkshops(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  }, []);

  const filteredWorkshops = useMemo(() => {
    return workshops
      .filter(w => filterCategory === "All" || w.category === filterCategory)
      .filter(w => 
        w.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        w.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        w.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
      )
      .sort((a, b) => {
        if (sortBy === "featured") return b.featured - a.featured;
        if (sortBy === "difficulty") return b.difficulty - a.difficulty;
        if (sortBy === "enrolled") return b.enrolled - a.enrolled;
        if (sortBy === "rating") return b.rating - a.rating;
        return 0;
      });
  }, [filterCategory, searchQuery, sortBy]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Fira+Code:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap');

        * { margin: 0; padding: 0; box-sizing: border-box; }

        ::-webkit-scrollbar { width: 10px; }
        ::-webkit-scrollbar-track { background: #000; }
        ::-webkit-scrollbar-thumb { 
          background: linear-gradient(180deg, #00f0ff, #a78bfa); 
          border-radius: 10px;
        }

        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          overflow-x: hidden;
        }

        @keyframes fadeInUp { 
          from { opacity: 0; transform: translateY(40px); } 
          to { opacity: 1; transform: translateY(0); } 
        }
        
        @keyframes fadeInLeft { 
          from { opacity: 0; transform: translateX(-40px); } 
          to { opacity: 1; transform: translateX(0); } 
        }
        
        @keyframes fadeInRight { 
          from { opacity: 0; transform: translateX(40px); } 
          to { opacity: 1; transform: translateX(0); } 
        }
        
        @keyframes glowPulse { 
          0%, 100% { opacity: 1; filter: brightness(1); } 
          50% { opacity: 0.8; filter: brightness(1.2); } 
        }
        
        @keyframes floatAnimation { 
          0%, 100% { transform: translateY(0) rotate(0deg); } 
          50% { transform: translateY(-15px) rotate(3deg); } 
        }
        
        @keyframes shimmerAnimation { 
          0% { background-position: -200% center; } 
          100% { background-position: 200% center; } 
        }
        
        @keyframes rotateAnimation { 
          from { transform: rotate(0deg); } 
          to { transform: rotate(360deg); } 
        }

        @keyframes scaleIn { 
          0% { transform: scale(0.9); opacity: 0; } 
          100% { transform: scale(1); opacity: 1; } 
        }

        @keyframes neonGlow {
          0%, 100% { 
            box-shadow: 0 0 10px currentColor, 0 0 20px currentColor, 0 0 30px currentColor; 
          }
          50% { 
            box-shadow: 0 0 20px currentColor, 0 0 40px currentColor, 0 0 60px currentColor; 
          }
        }

        .workshop-card {
          position: relative;
          background: linear-gradient(135deg, rgba(15,15,35,0.98) 0%, rgba(25,15,45,0.95) 100%);
          border: 2px solid rgba(0,240,255,0.2);
          border-radius: 24px;
          overflow: hidden;
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
          backdrop-filter: blur(20px);
        }

        .workshop-card:hover {
          transform: translateY(-12px) scale(1.02);
          border-color: var(--card-color);
          box-shadow: 
            0 20px 60px rgba(0,240,255,0.4),
            inset 0 0 40px rgba(0,240,255,0.08);
        }

        .workshop-card::before {
          content: '';
          position: absolute;
          inset: -2px;
          background: linear-gradient(135deg, transparent 30%, var(--card-color-alpha) 50%, transparent 70%);
          background-size: 300% 300%;
          animation: shimmerAnimation 4s infinite;
          pointer-events: none;
          border-radius: 24px;
          opacity: 0;
          transition: opacity 0.5s;
        }

        .workshop-card:hover::before {
          opacity: 1;
        }

        .rarity-badge {
          padding: 0.4rem 1rem;
          border-radius: 999px;
          font-size: 0.7rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          animation: neonGlow 2s infinite;
          backdrop-filter: blur(10px);
        }

        .filter-btn {
          padding: 0.7rem 1.5rem;
          background: rgba(10,10,30,0.8);
          border: 2px solid rgba(0,240,255,0.2);
          border-radius: 999px;
          color: #fff;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          font-family: 'Inter', sans-serif;
          font-size: 0.85rem;
          font-weight: 600;
          position: relative;
          overflow: hidden;
        }

        .filter-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #00f0ff, #a78bfa, #ff61d2);
          opacity: 0;
          transition: opacity 0.3s;
        }

        .filter-btn:hover, .filter-btn.active {
          background: rgba(0,240,255,0.15);
          border-color: #00f0ff;
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(0,240,255,0.3);
        }

        .filter-btn.active::before {
          opacity: 1;
        }

        .search-input {
          width: 100%;
          padding: 1rem 1.5rem 1rem 3.5rem;
          background: rgba(10,10,30,0.8);
          border: 2px solid rgba(0,240,255,0.2);
          border-radius: 999px;
          color: #fff;
          font-family: 'Inter', sans-serif;
          font-size: 0.95rem;
          outline: none;
          transition: all 0.3s;
          backdrop-filter: blur(10px);
        }

        .search-input:focus {
          border-color: #00f0ff;
          box-shadow: 0 0 25px rgba(0,240,255,0.3), inset 0 0 15px rgba(0,240,255,0.08);
        }

        .search-input::placeholder {
          color: rgba(255,255,255,0.3);
        }

        .stat-card {
          background: linear-gradient(135deg, rgba(10,10,30,0.7) 0%, rgba(25,20,50,0.5) 100%);
          border: 2px solid rgba(0,240,255,0.2);
          border-radius: 16px;
          padding: 1.8rem;
          text-align: center;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          backdrop-filter: blur(10px);
          position: relative;
          overflow: hidden;
        }

        .stat-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #00f0ff, #a78bfa, #ff61d2);
          opacity: 0;
          transition: opacity 0.3s;
        }

        .stat-card:hover {
          border-color: #00f0ff;
          transform: translateY(-6px);
          box-shadow: 0 15px 40px rgba(0,240,255,0.3);
        }

        .stat-card:hover::before {
          opacity: 0.08;
        }

        .icon-wrapper {
          width: 120px;
          height: 120px;
          border-radius: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .icon-wrapper::before {
          content: '';
          position: absolute;
          inset: -3px;
          background: conic-gradient(from 0deg, var(--icon-color), transparent, var(--icon-color));
          border-radius: 24px;
          animation: rotateAnimation 4s linear infinite;
          opacity: 0;
          transition: opacity 0.3s;
        }

        .workshop-card:hover .icon-wrapper::before {
          opacity: 1;
        }

        .icon-wrapper::after {
          content: '';
          position: absolute;
          inset: 2px;
          background: rgba(0,0,0,0.95);
          border-radius: 22px;
        }

        .action-btn {
          padding: 0.5rem;
          background: rgba(10,10,30,0.7);
          border: 2px solid rgba(255,255,255,0.15);
          border-radius: 10px;
          color: #fff;
          cursor: pointer;
          transition: all 0.3s;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .action-btn:hover {
          background: rgba(0,240,255,0.15);
          border-color: #00f0ff;
          transform: scale(1.1);
        }

        .action-btn.active {
          background: rgba(255,0,100,0.25);
          border-color: #ff0066;
          color: #ff0066;
        }

        .skill-tag {
          padding: 0.5rem 1rem;
          background: rgba(10,10,30,0.7);
          border: 2px solid currentColor;
          border-radius: 999px;
          font-size: 0.8rem;
          font-family: 'Fira Code', monospace;
          font-weight: 600;
          transition: all 0.3s;
          cursor: default;
          position: relative;
          overflow: hidden;
        }

        .skill-tag::before {
          content: '';
          position: absolute;
          inset: 0;
          background: currentColor;
          opacity: 0;
          transition: opacity 0.3s;
        }

        .skill-tag:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 16px currentColor;
        }

        .skill-tag:hover::before {
          opacity: 0.15;
        }

        .progress-bar {
          height: 6px;
          background: rgba(255,255,255,0.08);
          border-radius: 999px;
          overflow: hidden;
          position: relative;
        }

        .progress-fill {
          height: 100%;
          border-radius: 999px;
          position: relative;
          transition: width 1s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .progress-fill::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
          animation: shimmerAnimation 2s infinite;
        }

        .modal-backdrop {
          backdrop-filter: blur(20px) saturate(180%);
          background: rgba(0,0,0,0.98);
        }

        .modal-content {
          background: linear-gradient(135deg, rgba(15,15,35,0.98) 0%, rgba(25,15,45,0.95) 100%);
          border-radius: 28px;
          position: relative;
          overflow: hidden;
        }

        .modal-content::before {
          content: '';
          position: absolute;
          inset: -2px;
          background: conic-gradient(from 0deg, #00f0ff, #a78bfa, #ff61d2, #00f0ff);
          animation: rotateAnimation 8s linear infinite;
          z-index: -1;
        }

        .modal-content::after {
          content: '';
          position: absolute;
          inset: 3px;
          background: linear-gradient(135deg, rgba(15,15,35,0.98) 0%, rgba(25,15,45,0.95) 100%);
          border-radius: 25px;
          z-index: -1;
        }

        @media (max-width: 768px) {
          .workshop-grid { 
            grid-template-columns: 1fr !important;
            padding: 0 0.5rem;
          }
          .filter-container { 
            flex-direction: column !important; 
            gap: 1rem !important;
          }
          .stat-card { padding: 1.5rem; }
          .icon-wrapper { width: 90px; height: 90px; }
          .modal-content { margin: 1rem; }
        }
      `}</style>

      <div style={{
        minHeight: '100vh',
        background: '#000000',
        color: '#e8e8f0',
        position: 'relative',
        overflow: 'hidden',
        padding: 'clamp(3rem, 8vw, 6rem) 1.5rem 5rem',
        fontFamily: "'Inter', sans-serif"
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          background: `
            radial-gradient(ellipse at 15% 25%, rgba(0,240,255,0.06) 0%, transparent 50%),
            radial-gradient(ellipse at 85% 75%, rgba(167,139,250,0.06) 0%, transparent 50%),
            radial-gradient(ellipse at 50% 50%, rgba(255,97,210,0.04) 0%, transparent 50%)
          `,
          pointerEvents: 'none',
          opacity: 0.7
        }} />

        <canvas ref={canvasRef} style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 1
        }} />

        <div style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(circle 500px at ${mousePos.x}px ${mousePos.y}px, rgba(0,240,255,0.06) 0%, transparent 50%)`,
          pointerEvents: 'none',
          opacity: 0.5
        }} />

        <div style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: '1400px',
          margin: '0 auto',
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.6s ease-out'
        }}>
          <div style={{ 
            textAlign: 'center', 
            marginBottom: '5rem',
            transform: `translateY(${scrollY * 0.2}px)`
          }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.8rem',
              padding: '0.7rem 1.8rem',
              background: 'rgba(0,240,255,0.12)',
              border: '2px solid rgba(0,240,255,0.4)',
              borderRadius: '999px',
              marginBottom: '1.5rem',
              animation: 'scaleIn 0.6s ease-out, glowPulse 3s infinite',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 0 30px rgba(0,240,255,0.2)'
            }}>
              <Flame size={20} color="#ffd700" style={{ animation: 'floatAnimation 2s ease-in-out infinite' }} />
              <span style={{ 
                fontFamily: "'Space Grotesk', sans-serif", 
                fontSize: '0.85rem', 
                fontWeight: 700,
                letterSpacing: '2px',
                background: 'linear-gradient(135deg, #00f0ff, #a78bfa, #ff61d2)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                ELITE DEVELOPER ACADEMY
              </span>
              <Flame size={20} color="#ffd700" style={{ animation: 'floatAnimation 2s ease-in-out infinite' }} />
            </div>

            <h1 style={{
              fontSize: 'clamp(3.5rem, 10vw, 7rem)',
              fontWeight: 900,
              background: 'linear-gradient(135deg, #00f0ff, #a78bfa, #ff61d2)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '3px',
              marginBottom: '1.5rem',
              textTransform: 'uppercase',
              fontFamily: "'Space Grotesk', sans-serif",
              animation: 'fadeInUp 0.8s ease-out',
              lineHeight: 1.1,
              textShadow: '0 0 60px rgba(0,240,255,0.4)'
            }}>
              LEGENDARY<br />WORKSHOPS
            </h1>

            <p style={{
              fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)',
              color: '#b8b8d8',
              maxWidth: '900px',
              margin: '0 auto 3.5rem',
              lineHeight: 1.8,
              animation: 'fadeInUp 1s ease-out',
              fontWeight: 400,
              letterSpacing: '0.3px'
            }}>
              Transform your career with intensive, hands-on programs designed for elite developers.
              Master cutting-edge technologies and join the top 1% of engineering talent worldwide.
            </p>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1.8rem',
              maxWidth: '1100px',
              margin: '0 auto'
            }}>
              {[
                { icon: Users, label: "Elite Students", value: 4500, suffix: "+", color: "#00f0ff" },
                { icon: Trophy, label: "Completion Rate", value: 73, suffix: "%", color: "#ffd700" },
                { icon: TrendingUp, label: "Avg Salary Boost", value: 48, suffix: "%", color: "#00ff88" },
                { icon: Award, label: "Industry Certs", value: 16, suffix: "", color: "#a78bfa" }
              ].map((stat, i) => (
                <div 
                  key={i} 
                  className="stat-card" 
                  style={{ 
                    animation: `fadeInUp ${0.3 + i * 0.12}s ease-out`,
                    animationDelay: `${i * 0.08}s`,
                    animationFillMode: 'both'
                  }}
                >
                  <stat.icon 
                    size={36} 
                    color={stat.color} 
                    style={{ 
                      margin: '0 auto 1rem',
                      filter: `drop-shadow(0 0 10px ${stat.color})`,
                      animation: 'floatAnimation 3s ease-in-out infinite'
                    }} 
                  />
                  <div style={{ 
                    fontSize: '2.5rem', 
                    fontWeight: 900, 
                    color: stat.color, 
                    marginBottom: '0.4rem',
                    fontFamily: "'Space Grotesk', sans-serif",
                    textShadow: `0 0 15px ${stat.color}`
                  }}>
                    <Counter target={stat.value} suffix={stat.suffix} />
                  </div>
                  <div style={{ 
                    fontSize: '0.85rem', 
                    color: '#888', 
                    fontFamily: "'Fira Code', monospace",
                    letterSpacing: '0.5px',
                    textTransform: 'uppercase'
                  }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{
            marginBottom: '4rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '2rem'
          }}>
            <div style={{ 
              position: 'relative', 
              maxWidth: '650px', 
              margin: '0 auto', 
              width: '100%',
              animation: 'fadeInUp 1.2s ease-out'
            }}>
              <Search 
                size={20} 
                style={{
                  position: 'absolute',
                  left: '1.8rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#00f0ff',
                  filter: 'drop-shadow(0 0 8px #00f0ff)',
                  zIndex: 10
                }} 
              />
              <input
                type="text"
                placeholder="Search workshops, skills, technologies..."
                className="search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div style={{
              display: 'flex',
              justifyContent: 'center',
              flexWrap: 'wrap',
              gap: '1rem',
              animation: 'fadeInUp 1.4s ease-out'
            }}>
              {categories.map(cat => (
                <button
                  key={cat}
                  className={`filter-btn ${filterCategory === cat ? 'active' : ''}`}
                  onClick={() => setFilterCategory(cat)}
                >
                  <span style={{ position: 'relative', zIndex: 1 }}>{cat}</span>
                </button>
              ))}
            </div>

            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '1.8rem',
              flexWrap: 'wrap',
              fontSize: '0.9rem',
              animation: 'fadeInUp 1.6s ease-out'
            }}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '1.2rem',
                color: '#888',
                fontFamily: "'Fira Code', monospace"
              }}>
                <Filter size={18} />
                <span>Sort by:</span>
                {['featured', 'difficulty', 'enrolled', 'rating'].map(sort => (
                  <button
                    key={sort}
                    onClick={() => setSortBy(sort)}
                    style={{
                      background: sortBy === sort ? 'rgba(0,240,255,0.15)' : 'none',
                      border: sortBy === sort ? '2px solid #00f0ff' : '2px solid transparent',
                      borderRadius: '999px',
                      padding: '0.5rem 1.2rem',
                      color: sortBy === sort ? '#00f0ff' : '#666',
                      cursor: 'pointer',
                      fontFamily: "'Fira Code', monospace",
                      textTransform: 'capitalize',
                      fontWeight: sortBy === sort ? 700 : 400,
                      transition: 'all 0.3s',
                      fontSize: '0.85rem'
                    }}
                  >
                    {sort}
                  </button>
                ))}
              </div>
            </div>

            <div style={{
              textAlign: 'center',
              color: '#666',
              fontFamily: "'Fira Code', monospace",
              fontSize: '0.9rem',
              animation: 'fadeInUp 1.8s ease-out'
            }}>
              Showing {filteredWorkshops.length} of {workshops.length} elite programs
            </div>
          </div>

          <div className="workshop-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(380px, 100%), 1fr))',
            gap: '2.5rem',
            marginBottom: '6rem',
            width: '100%'
          }}>
            {filteredWorkshops.map((ws, i) => (
              <div
                key={i}
                className="workshop-card"
                onMouseEnter={() => setHoveredId(i)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => setSelected(ws)}
                style={{ 
                  animation: `fadeInUp ${0.4 + i * 0.08}s ease-out`,
                  animationDelay: `${i * 0.04}s`,
                  animationFillMode: 'both',
                  '--card-color': ws.color,
                  '--card-color-alpha': `${ws.color}30`,
                  '--icon-color': ws.color
                }}
              >
                <div style={{
                  height: '220px',
                  background: `linear-gradient(135deg, ${ws.color}20, rgba(0,0,0,0.6))`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: `radial-gradient(circle at 50% 50%, ${ws.color}35 0%, transparent 70%)`,
                    animation: hoveredId === i ? 'scaleIn 2s ease-in-out infinite' : 'none'
                  }} />

                  <div 
                    className="icon-wrapper"
                    style={{
                      border: `3px solid ${ws.color}`,
                      animation: hoveredId === i ? 'floatAnimation 2s ease-in-out infinite' : 'none',
                      boxShadow: hoveredId === i ? `0 0 50px ${ws.color}` : `0 0 15px ${ws.color}`
                    }}
                  >
                    <ws.icon 
                      size={60} 
                      color={ws.color} 
                      style={{ 
                        position: 'relative', 
                        zIndex: 1,
                        filter: `drop-shadow(0 0 8px ${ws.color})`
                      }} 
                    />
                  </div>

                  <div style={{ 
                    position: 'absolute', 
                    top: '1.3rem', 
                    left: '1.3rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.7rem'
                  }}>
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
                      top: '1.3rem',
                      right: '1.3rem',
                      padding: '0.5rem 1.1rem',
                      background: 'rgba(255,215,0,0.2)',
                      border: '2px solid #ffd700',
                      borderRadius: '999px',
                      fontSize: '0.7rem',
                      fontWeight: 900,
                      color: '#ffd700',
                      letterSpacing: '1.5px',
                      animation: 'neonGlow 2s infinite',
                      fontFamily: "'Space Grotesk', sans-serif"
                    }}>
                      ⚡ FEATURED
                    </div>
                  )}

                  <div style={{
                    position: 'absolute',
                    bottom: '1.3rem',
                    right: '1.3rem',
                    display: 'flex',
                    gap: '0.7rem'
                  }}>
                    <button 
                      className={`action-btn ${savedWorkshops.has(i) ? 'active' : ''}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSave(i);
                      }}
                    >
                      <Heart 
                        size={16} 
                        fill={savedWorkshops.has(i) ? '#ff0066' : 'none'}
                      />
                    </button>
                    <button 
                      className="action-btn"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Share2 size={16} />
                    </button>
                  </div>
                </div>

                <div style={{ padding: '2rem' }}>
                  <div style={{
                    fontSize: '0.8rem',
                    color: ws.color,
                    fontFamily: "'Fira Code', monospace",
                    marginBottom: '0.8rem',
                    fontWeight: 700,
                    letterSpacing: '1.2px',
                    textTransform: 'uppercase'
                  }}>
                    {ws.category}
                  </div>

                  <h3 style={{
                    fontSize: '1.6rem',
                    fontWeight: 800,
                    color: '#fff',
                    marginBottom: '1rem',
                    fontFamily: "'Space Grotesk', sans-serif",
                    lineHeight: 1.3
                  }}>
                    {ws.title}
                  </h3>

                  <p style={{
                    fontSize: '0.95rem',
                    color: '#b8b8d8',
                    lineHeight: 1.6,
                    marginBottom: '1.5rem'
                  }}>
                    {ws.desc}
                  </p>

                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: '0.8rem',
                    marginBottom: '1.5rem'
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.7rem 1rem',
                      background: 'rgba(10,10,30,0.6)',
                      borderRadius: '10px',
                      fontSize: '0.85rem',
                      border: `1px solid ${ws.color}25`
                    }}>
                      <Clock size={14} color={ws.color} />
                      <span>{ws.duration}</span>
                    </div>

                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.7rem 1rem',
                      background: 'rgba(10,10,30,0.6)',
                      borderRadius: '10px',
                      fontSize: '0.85rem',
                      border: `1px solid ${ws.color}25`
                    }}>
                      <MonitorPlay size={14} color={ws.color} />
                      <span>{ws.videos} Videos</span>
                    </div>

                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.7rem 1rem',
                      background: 'rgba(10,10,30,0.6)',
                      borderRadius: '10px',
                      fontSize: '0.85rem',
                      border: `1px solid ${ws.color}25`
                    }}>
                      <Target size={14} color={ws.color} />
                      <span>{ws.difficulty}% Difficulty</span>
                    </div>

                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.7rem 1rem',
                      background: 'rgba(10,10,30,0.6)',
                      borderRadius: '10px',
                      fontSize: '0.85rem',
                      border: `1px solid ${ws.color}25`
                    }}>
                      <Star size={14} color="#ffd700" fill="#ffd700" />
                      <span>{ws.rating} ({ws.reviews})</span>
                    </div>
                  </div>

                  <div style={{ marginBottom: '1.5rem' }}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginBottom: '0.7rem',
                      fontSize: '0.85rem',
                      color: '#888'
                    }}>
                      <span>Completion Rate</span>
                      <span style={{ color: ws.color, fontWeight: 700 }}>{ws.completionRate}%</span>
                    </div>
                    <div className="progress-bar">
                      <div 
                        className="progress-fill" 
                        style={{ 
                          width: hoveredId === i ? `${ws.completionRate}%` : '0%',
                          background: `linear-gradient(90deg, ${ws.color}, ${ws.color}70)`
                        }} 
                      />
                    </div>
                  </div>

                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    marginBottom: '1.8rem',
                    padding: '1.3rem',
                    background: 'rgba(10,10,30,0.5)',
                    borderRadius: '14px',
                    border: `1px solid ${ws.color}15`,
                    gap: '0.8rem'
                  }}>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ 
                        fontSize: '1.6rem', 
                        fontWeight: 900, 
                        color: ws.color,
                        fontFamily: "'Space Grotesk', sans-serif"
                      }}>
                        {ws.enrolled}+
                      </div>
                      <div style={{ fontSize: '0.7rem', color: '#666', marginTop: '0.2rem' }}>
                        Students
                      </div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ 
                        fontSize: '1.6rem', 
                        fontWeight: 900, 
                        color: ws.color,
                        fontFamily: "'Space Grotesk', sans-serif"
                      }}>
                        {ws.projects}
                      </div>
                      <div style={{ fontSize: '0.7rem', color: '#666', marginTop: '0.2rem' }}>
                        Projects
                      </div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ 
                        fontSize: '1.6rem', 
                        fontWeight: 900, 
                        color: ws.color,
                        fontFamily: "'Space Grotesk', sans-serif"
                      }}>
                        {ws.avgSalaryBoost}
                      </div>
                      <div style={{ fontSize: '0.7rem', color: '#666', marginTop: '0.2rem' }}>
                        Salary ↑
                      </div>
                    </div>
                  </div>

                  <button style={{
                    width: '100%',
                    padding: '1rem',
                    background: `linear-gradient(90deg, ${ws.color}, ${ws.color}CC)`,
                    color: '#000',
                    border: 'none',
                    borderRadius: '999px',
                    fontWeight: 900,
                    fontSize: '0.95rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.8rem',
                    transition: 'all 0.3s',
                    fontFamily: "'Inter', sans-serif",
                    letterSpacing: '0.5px',
                    textTransform: 'uppercase',
                    boxShadow: `0 8px 25px ${ws.color}35`
                  }}>
                    <Eye size={20} />
                    View Details
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredWorkshops.length === 0 && (
            <div style={{
              textAlign: 'center',
              padding: '5rem 2rem',
              color: '#666',
              fontSize: '1.3rem',
              animation: 'fadeInUp 0.6s ease-out'
            }}>
              <Search size={70} color="#333" style={{ marginBottom: '1.5rem' }} />
              <div style={{ marginBottom: '0.8rem', fontSize: '1.6rem', fontWeight: 700 }}>
                No workshops found
              </div>
              <div>Try adjusting your search or filters</div>
            </div>
          )}

          <div style={{
            padding: '4rem 2.5rem',
            background: 'linear-gradient(135deg, rgba(10,10,30,0.95) 0%, rgba(25,15,45,0.85) 100%)',
            border: '3px solid rgba(0,240,255,0.3)',
            borderRadius: '32px',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
            animation: 'fadeInUp 2s ease-out'
          }}>
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(135deg, #00f0ff, #a78bfa, #ff61d2)',
              opacity: 0.06,
              pointerEvents: 'none',
              animation: 'shimmerAnimation 5s infinite'
            }} />

            <Rocket 
              size={70} 
              color="#00f0ff" 
              style={{ 
                margin: '0 auto 1.8rem',
                animation: 'floatAnimation 3s ease-in-out infinite',
                filter: 'drop-shadow(0 0 25px #00f0ff)'
              }} 
            />

            <h2 style={{
              fontSize: 'clamp(2.5rem, 7vw, 4.5rem)',
              fontWeight: 900,
              background: 'linear-gradient(135deg, #00f0ff, #a78bfa, #ff61d2)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '1.8rem',
              fontFamily: "'Space Grotesk', sans-serif",
              letterSpacing: '3px'
            }}>
              JOIN THE ELITE
            </h2>

            <p style={{
              fontSize: '1.3rem',
              color: '#b8b8d8',
              maxWidth: '750px',
              margin: '0 auto 3.5rem',
              lineHeight: 1.9,
              fontWeight: 400
            }}>
              These programs are designed for serious developers ready to master cutting-edge 
              technologies and accelerate their careers. Your transformation starts here.
            </p>

            <div style={{
              display: 'flex',
              gap: '1.8rem',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              <a 
                href="https://github.com/bhagavan444" 
                target="_blank" 
                rel="noopener noreferrer" 
                style={{
                  padding: '1.3rem 3rem',
                  background: 'rgba(0,240,255,0.12)',
                  border: '2px solid #00f0ff',
                  borderRadius: '999px',
                  color: '#00f0ff',
                  fontWeight: 900,
                  fontSize: '1.1rem',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.9rem',
                  transition: 'all 0.3s',
                  fontFamily: "'Inter', sans-serif",
                  letterSpacing: '0.5px',
                  textTransform: 'uppercase',
                  backdropFilter: 'blur(10px)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px) scale(1.05)';
                  e.currentTarget.style.boxShadow = '0 15px 40px rgba(0,240,255,0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <Github size={24} />
                View Portfolio
              </a>

              <a 
                href="mailto:g.sivasatyasaibhagavan@gmail.com" 
                style={{
                  padding: '1.3rem 3rem',
                  background: 'linear-gradient(135deg, #00f0ff, #a78bfa, #ff61d2)',
                  borderRadius: '999px',
                  color: '#000',
                  fontWeight: 900,
                  fontSize: '1.1rem',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.9rem',
                  boxShadow: '0 15px 40px rgba(0,240,255,0.5)',
                  transition: 'all 0.3s',
                  fontFamily: "'Inter', sans-serif",
                  letterSpacing: '0.5px',
                  textTransform: 'uppercase'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px) scale(1.05)';
                  e.currentTarget.style.boxShadow = '0 25px 60px rgba(0,240,255,0.7)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = '0 15px 40px rgba(0,240,255,0.5)';
                }}
              >
                <Rocket size={24} />
                Start Your Journey
              </a>
            </div>
          </div>
        </div>
      </div>

      {selected && (
        <div
          className="modal-backdrop"
          onClick={() => setSelected(null)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem',
            overflowY: 'auto',
            animation: 'fadeInUp 0.4s ease-out'
          }}
        >
          <div
            className="modal-content"
            onClick={e => e.stopPropagation()}
            style={{
              maxWidth: '1300px',
              width: '100%',
              maxHeight: '95vh',
              overflowY: 'auto',
              boxShadow: `0 0 80px ${selected.color}AA`,
              position: 'relative'
            }}
          >
            <button
              onClick={() => setSelected(null)}
              style={{
                position: 'absolute',
                top: '1.8rem',
                right: '1.8rem',
                background: 'rgba(255,0,0,0.25)',
                border: '2px solid #ff4444',
                borderRadius: '50%',
                width: '50px',
                height: '50px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ff4444',
                cursor: 'pointer',
                zIndex: 10,
                transition: 'all 0.3s',
                backdropFilter: 'blur(10px)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.1) rotate(90deg)';
                e.currentTarget.style.background = 'rgba(255,0,0,0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
                e.currentTarget.style.background = 'rgba(255,0,0,0.25)';
              }}
            >
              <X size={24} />
            </button>

            <div style={{
              height: '300px',
              background: `linear-gradient(135deg, ${selected.color}30, rgba(0,0,0,0.7))`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              borderBottom: `3px solid ${selected.color}60`,
              overflow: 'hidden'
            }}>
              <div style={{
                position: 'absolute',
                inset: 0,
                background: `radial-gradient(circle at 50% 50%, ${selected.color}45 0%, transparent 70%)`,
                animation: 'scaleIn 3s ease-in-out infinite'
              }} />

              <div className="icon-wrapper" style={{
                width: '160px',
                height: '160px',
                border: `4px solid ${selected.color}`,
                animation: 'floatAnimation 3s ease-in-out infinite',
                boxShadow: `0 0 70px ${selected.color}`,
                '--icon-color': selected.color
              }}>
                <selected.icon 
                  size={80} 
                  color={selected.color} 
                  style={{ 
                    position: 'relative', 
                    zIndex: 1,
                    filter: `drop-shadow(0 0 15px ${selected.color})`
                  }} 
                />
              </div>

              <div style={{
                position: 'absolute',
                top: '1.8rem',
                left: '1.8rem',
                display: 'flex',
                gap: '0.9rem',
                flexWrap: 'wrap'
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
                  fontSize: '0.8rem',
                  fontWeight: 800,
                  color: selected.color,
                  letterSpacing: '1px',
                  fontFamily: "'Fira Code', monospace"
                }}>
                  {selected.category}
                </div>
              </div>
            </div>

            <div style={{ padding: '3.5rem 2.8rem' }}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                marginBottom: '1.3rem',
                flexWrap: 'wrap',
                gap: '0.9rem'
              }}>
                <h2 style={{
                  fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
                  fontWeight: 900,
                  background: 'linear-gradient(135deg, #00f0ff, #a78bfa, #ff61d2)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontFamily: "'Space Grotesk', sans-serif",
                  letterSpacing: '1.5px'
                }}>
                  {selected.title}
                </h2>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star 
                      key={i} 
                      size={22} 
                      color="#ffd700"
                      fill={i < Math.floor(selected.rating) ? '#ffd700' : 'none'}
                    />
                  ))}
                  <span style={{ 
                    marginLeft: '0.4rem', 
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    color: '#ffd700'
                  }}>
                    {selected.rating} ({selected.reviews} reviews)
                  </span>
                </div>
              </div>

              <p style={{
                fontSize: '1.3rem',
                color: '#c8c8e8',
                marginBottom: '3.5rem',
                lineHeight: 1.8,
                fontWeight: 400
              }}>
                {selected.fullDesc}
              </p>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '1.8rem',
                marginBottom: '3.5rem'
              }}>
                {[
                  { icon: Calendar, label: "Duration", value: selected.duration, color: "#00f0ff" },
                  { icon: Users, label: "Students", value: `${selected.enrolled}+`, color: "#a78bfa" },
                  { icon: Target, label: "Difficulty", value: `${selected.difficulty}%`, color: "#ff61d2" },
                  { icon: CheckCircle2, label: "Completion", value: `${selected.completionRate}%`, color: "#00ff88" },
                  { icon: Layers, label: "Projects", value: selected.projects, color: "#ffd700" },
                  { icon: TrendingUp, label: "Salary Boost", value: selected.avgSalaryBoost, color: "#ff9500" }
                ].map((stat, i) => (
                  <div key={i} style={{
                    padding: '1.8rem',
                    background: 'linear-gradient(135deg, rgba(10,10,30,0.7) 0%, rgba(25,20,50,0.5) 100%)',
                    border: `2px solid ${stat.color}35`,
                    borderRadius: '18px',
                    textAlign: 'center',
                    transition: 'all 0.3s',
                    cursor: 'default'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-6px)';
                    e.currentTarget.style.borderColor = stat.color;
                    e.currentTarget.style.boxShadow = `0 18px 35px ${stat.color}35`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.borderColor = `${stat.color}35`;
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                  >
                    <stat.icon 
                      size={32} 
                      color={stat.color} 
                      style={{ 
                        margin: '0 auto 0.9rem',
                        filter: `drop-shadow(0 0 8px ${stat.color})`
                      }} 
                    />
                    <div style={{ 
                      fontSize: '2rem', 
                      fontWeight: 900, 
                      color: '#fff', 
                      marginBottom: '0.4rem',
                      fontFamily: "'Space Grotesk', sans-serif",
                      textShadow: `0 0 15px ${stat.color}`
                    }}>
                      {stat.value}
                    </div>
                    <div style={{ 
                      fontSize: '0.9rem', 
                      color: '#888',
                      fontFamily: "'Fira Code', monospace",
                      letterSpacing: '0.5px'
                    }}>
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '2.8rem',
                marginBottom: '3.5rem'
              }}>
                <div>
                  <h3 style={{
                    fontSize: '2rem',
                    background: 'linear-gradient(135deg, #00f0ff, #a78bfa, #ff61d2)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    marginBottom: '1.8rem',
                    fontWeight: 900,
                    fontFamily: "'Space Grotesk', sans-serif",
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.9rem'
                  }}>
                    <Terminal size={26} style={{ color: selected.color }} />
                    Core Skills
                  </h3>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                    {selected.skills.map(skill => (
                      <span 
                        key={skill} 
                        className="skill-tag"
                        style={{
                          color: selected.color,
                          borderColor: `${selected.color}55`
                        }}
                      >
                        <span style={{ position: 'relative', zIndex: 1 }}>{skill}</span>
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 style={{
                    fontSize: '2rem',
                    background: 'linear-gradient(135deg, #00f0ff, #a78bfa, #ff61d2)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    marginBottom: '1.8rem',
                    fontWeight: 900,
                    fontFamily: "'Space Grotesk', sans-serif",
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.9rem'
                  }}>
                    <Award size={26} style={{ color: selected.color }} />
                    Certifications
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {selected.certifications.map(cert => (
                      <div key={cert} style={{
                        padding: '1.2rem 1.6rem',
                        background: 'rgba(10,10,30,0.6)',
                        border: `2px solid ${selected.color}55`,
                        borderRadius: '14px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        transition: 'all 0.3s'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateX(6px)';
                        e.currentTarget.style.borderColor = selected.color;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateX(0)';
                        e.currentTarget.style.borderColor = `${selected.color}55`;
                      }}
                      >
                        <Medal size={22} color={selected.color} />
                        <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>{cert}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div style={{ marginBottom: '3.5rem' }}>
                <h3 style={{
                  fontSize: '2rem',
                  background: 'linear-gradient(135deg, #00f0ff, #a78bfa, #ff61d2)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  marginBottom: '1.8rem',
                  fontWeight: 900,
                  fontFamily: "'Space Grotesk', sans-serif",
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.9rem'
                }}>
                  <GraduationCap size={26} style={{ color: selected.color }} />
                  What You'll Master
                </h3>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                  gap: '1.3rem'
                }}>
                  {selected.whatILearned.map((item, i) => (
                    <div key={i} style={{
                      padding: '1.3rem',
                      background: 'rgba(10,10,30,0.5)',
                      border: `2px solid ${selected.color}28`,
                      borderRadius: '14px',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '1rem',
                      transition: 'all 0.3s'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateX(6px)';
                      e.currentTarget.style.borderColor = selected.color;
                      e.currentTarget.style.background = `${selected.color}08`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateX(0)';
                      e.currentTarget.style.borderColor = `${selected.color}28`;
                      e.currentTarget.style.background = 'rgba(10,10,30,0.5)';
                    }}
                    >
                      <CheckCircle2 
                        size={22} 
                        color={selected.color} 
                        style={{ 
                          flexShrink: 0, 
                          marginTop: '0.1rem',
                          filter: `drop-shadow(0 0 6px ${selected.color})`
                        }} 
                      />
                      <span style={{ lineHeight: 1.6, fontSize: '0.95rem' }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{
                padding: '2.8rem',
                background: `linear-gradient(135deg, ${selected.color}12, rgba(10,10,30,0.7))`,
                border: `3px solid ${selected.color}45`,
                borderRadius: '24px',
                marginBottom: '3.5rem',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: `radial-gradient(circle at 50% 50%, ${selected.color}18 0%, transparent 70%)`,
                  pointerEvents: 'none'
                }} />

                <h3 style={{
                  fontSize: '2rem',
                  background: 'linear-gradient(135deg, #00f0ff, #a78bfa, #ff61d2)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  marginBottom: '1.8rem',
                  fontWeight: 900,
                  textAlign: 'center',
                  fontFamily: "'Space Grotesk', sans-serif",
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.9rem'
                }}>
                  <Trophy size={26} style={{ color: selected.color }} />
                  Expected Outcomes
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.3rem' }}>
                  {selected.outcomes.map((outcome, i) => (
                    <div key={i} style={{
                      padding: '1.3rem 1.8rem',
                      background: 'rgba(10,10,30,0.7)',
                      borderRadius: '14px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1.3rem',
                      fontSize: '1.05rem',
                      border: `2px solid ${selected.color}35`,
                      transition: 'all 0.3s'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateX(8px)';
                      e.currentTarget.style.borderColor = selected.color;
                      e.currentTarget.style.background = `${selected.color}12`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateX(0)';
                      e.currentTarget.style.borderColor = `${selected.color}35`;
                      e.currentTarget.style.background = 'rgba(10,10,30,0.7)';
                    }}
                    >
                      <Star 
                        size={22} 
                        color={selected.color} 
                        fill={selected.color}
                        style={{ filter: `drop-shadow(0 0 8px ${selected.color})` }}
                      />
                      <span style={{ fontWeight: 600 }}>{outcome}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{
                display: 'flex',
                gap: '1.8rem',
                justifyContent: 'center',
                flexWrap: 'wrap'
              }}>
                <button style={{
                  padding: '1.6rem 3.5rem',
                  background: `linear-gradient(90deg, ${selected.color}, ${selected.color}DD)`,
                  color: '#000',
                  border: 'none',
                  borderRadius: '999px',
                  fontWeight: 900,
                  fontSize: '1.2rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  boxShadow: `0 18px 45px ${selected.color}70`,
                  transition: 'all 0.3s',
                  fontFamily: "'Inter', sans-serif",
                  letterSpacing: '0.5px',
                  textTransform: 'uppercase'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px) scale(1.05)';
                  e.currentTarget.style.boxShadow = `0 28px 65px ${selected.color}`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = `0 18px 45px ${selected.color}70`;
                }}
                >
                  <Rocket size={28} />
                  ENROLL NOW
                </button>

                <button
                  onClick={() => setSelected(null)}
                  style={{
                    padding: '1.6rem 3.5rem',
                    background: 'rgba(10,10,30,0.8)',
                    color: '#fff',
                    border: `3px solid ${selected.color}`,
                    borderRadius: '999px',
                    fontWeight: 900,
                    fontSize: '1.2rem',
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    fontFamily: "'Inter', sans-serif",
                    letterSpacing: '0.5px',
                    textTransform: 'uppercase',
                    backdropFilter: 'blur(10px)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-3px) scale(1.05)';
                    e.currentTarget.style.background = `${selected.color}18`;
                    e.currentTarget.style.boxShadow = `0 18px 35px ${selected.color}35`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    e.currentTarget.style.background = 'rgba(10,10,30,0.8)';
                    e.currentTarget.style.boxShadow = 'none';
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