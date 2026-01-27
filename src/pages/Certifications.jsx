import { useState, useEffect, useRef } from 'react';
import { Award, ExternalLink, Code, Cloud, Database, Terminal, Brain, Rocket, Zap, Star, Sparkles, Trophy, Target, Cpu, Shield, Box, GitBranch, Layers, CheckCircle, TrendingUp, BarChart3, Activity } from 'lucide-react';

const certificationsData = [
  {
    title: "Full Stack Web Development",
    image: "https://lh3.googleusercontent.com/d/1AfvPfSaXHgVK9lPOsS3MUJimynH6xlog",
    link: "https://drive.google.com/file/d/1AfvPfSaXHgVK9lPOsS3MUJimynH6xlog/view",
    category: "Web",
    level: "Advanced",
    skills: ["React", "Node.js", "MongoDB"],  
    power: 95,
    desc: "Advanced full-stack certification focused on building complete web applications.",
    year: "2024",
    issuer: "Tech Academy"
  },
  {
    title: "Python Programming",
    image: "https://lh3.googleusercontent.com/d/1rZNRLvle0r_gUqzDjxR3_k6yApSyMxz6",
    link: "https://drive.google.com/file/d/1rZNRLvle0r_gUqzDjxR3_k6yApSyMxz6/view",
    category: "Programming",
    level: "Advanced",
    skills: ["Python", "OOP", "Algorithms"],
    power: 92,
    desc: "Comprehensive Python programming certification.",
    year: "2024",
    issuer: "Python Institute"
  },
  {
    title: "Java Programming",
    image: "https://lh3.googleusercontent.com/d/1esxKzHNp_cuB7G87hs2MDeMpr2LKXucM",
    link: "https://drive.google.com/file/d/1esxKzHNp_cuB7G87hs2MDeMpr2LKXucM/view",
    category: "Programming",
    level: "Advanced",
    skills: ["Java", "Spring", "Multithreading"],
    power: 90,
    desc: "Advanced Java certification covering core and backend concepts.",
    year: "2024",
    issuer: "Oracle"
  },
  {
    title: "AWS Cloud",
    image: "https://lh3.googleusercontent.com/d/17vu2Vd5QnxAHe4iEYv21ADC-Pfs-90U9",
    link: "https://drive.google.com/file/d/17vu2Vd5QnxAHe4iEYv21ADC-Pfs-90U9/view",
    category: "Cloud",
    level: "Professional",
    skills: ["AWS", "EC2", "S3"],
    power: 88,
    desc: "Professional certification on AWS cloud services.",
    year: "2024",
    issuer: "Amazon Web Services"
  },
  {
    title: "Azure Fundamentals",
    image: "https://lh3.googleusercontent.com/d/1ygiQILNjBAfcZse27n_px1_tgupajlWM",
    link: "https://drive.google.com/file/d/1ygiQILNjBAfcZse27n_px1_tgupajlWM/view",
    category: "Cloud",
    level: "Professional",
    skills: ["Azure", "Cloud", "DevOps"],
    power: 85,
    desc: "Fundamental certification on Microsoft Azure cloud.",
    year: "2024",
    issuer: "Microsoft"
  },
  {
    title: "Data Science",
    image: "https://lh3.googleusercontent.com/d/1JENKEIpZkc1Mvro1mmRVyQr5u8fdUXqv",
    link: "https://drive.google.com/file/d/1JENKEIpZkc1Mvro1mmRVyQr5u8fdUXqv/view",
    category: "Data",
    level: "Advanced",
    skills: ["Python", "Pandas", "Visualization"],
    power: 93,
    desc: "Advanced data science certification.",
    year: "2024",
    issuer: "Data Science Institute"
  },
  {
    title: "Machine Learning",
    image: "https://lh3.googleusercontent.com/d/19vV6Nyq8A418eDvQ2ezrek4pqyUBb6X6",
    link: "https://drive.google.com/file/d/19vV6Nyq8A418eDvQ2ezrek4pqyUBb6X6/view",
    category: "AI/ML",
    level: "Expert",
    skills: ["ML", "AI", "Neural Networks"],
    power: 98,
    desc: "Expert-level certification in machine learning.",
    year: "2024",
    issuer: "AI Research Lab"
  },
  {
    title: "Cloud Computing",
    image: "https://lh3.googleusercontent.com/d/13gTq6yHm8jCOvqHKRjPpGw4hU4p7kovX",
    link: "https://drive.google.com/file/d/13gTq6yHm8jCOvqHKRjPpGw4hU4p7kovX/view",
    category: "Cloud",
    level: "Professional",
    skills: ["Cloud", "Distributed Systems"],
    power: 87,
    desc: "Cloud computing concepts and architectures.",
    year: "2023",
    issuer: "Cloud Academy"
  },
  {
    title: "R Programming",
    image: "https://lh3.googleusercontent.com/d/1vFclrkOAe3GaA8brE3c5Sjd0k5RMXwr-",
    link: "https://drive.google.com/file/d/1vFclrkOAe3GaA8brE3c5Sjd0k5RMXwr-/view",
    category: "Programming",
    level: "Advanced",
    skills: ["R", "Statistics", "Data Analysis"],
    power: 86,
    desc: "Statistical programming using R.",
    year: "2023",
    issuer: "R Consortium"
  },
  {
    title: "Art of Programming",
    image: "https://lh3.googleusercontent.com/d/1SwQGo_zGZIGcTzzlMApXZU0Wt5ScyWXx",
    link: "https://drive.google.com/file/d/1SwQGo_zGZIGcTzzlMApXZU0Wt5ScyWXx/view",
    category: "Programming",
    level: "Advanced",
    skills: ["Algorithms", "Problem Solving"],
    power: 91,
    desc: "Algorithmic thinking and problem-solving certification.",
    year: "2023",
    issuer: "Programming Institute"
  },
  {
    title: "Machine Learning with Python",
    image: "https://lh3.googleusercontent.com/d/1uaTJTnijSpjCsD_ZPHKwen9i3RDYwShK",
    link: "https://drive.google.com/file/d/1uaTJTnijSpjCsD_ZPHKwen9i3RDYwShK/view",
    category: "AI/ML",
    level: "Expert",
    skills: ["Python", "Scikit-learn", "TensorFlow"],
    power: 96,
    desc: "Hands-on ML certification using Python.",
    year: "2024",
    issuer: "ML Academy"
  },
  {
    title: "Large Language Models",
    image: "https://lh3.googleusercontent.com/d/1CyN6_Bm3c68R0NkQWWTOgNAXTv27In_s",
    link: "https://drive.google.com/file/d/1CyN6_Bm3c68R0NkQWWTOgNAXTv27In_s/view",
    category: "AI/ML",
    level: "Expert",
    skills: ["LLM", "GPT", "Prompt Engineering"],
    power: 99,
    desc: "Advanced certification on Large Language Models.",
    year: "2024",
    issuer: "OpenAI Institute"
  },
  {
    title: "React",
    image: "https://lh3.googleusercontent.com/d/1yy4OpoVRAX2ZGVPUH9VmorLc2kiXalYf",
    link: "https://drive.google.com/file/d/1yy4OpoVRAX2ZGVPUH9VmorLc2kiXalYf/view",
    category: "Web",
    level: "Advanced",
    skills: ["React", "Hooks", "State Management"],
    power: 94,
    desc: "Advanced React development certification.",
    year: "2024",
    issuer: "Meta"
  },
  {
    title: "JavaScript",
    image: "https://lh3.googleusercontent.com/d/1zrscfW3cyWq59mMYsK399CRjgEjA-zbd",
    link: "https://drive.google.com/file/d/1zrscfW3cyWq59mMYsK399CRjgEjA-zbd/view",
    category: "Web",
    level: "Advanced",
    skills: ["JavaScript", "ES6+", "Async"],
    power: 93,
    desc: "Modern JavaScript programming certification.",
    year: "2024",
    issuer: "JS Academy"
  },
  {
    title: "MLOps",
    image: "https://lh3.googleusercontent.com/d/1BmvjGknXs-K5wOfepFcl_CuU8DsFBApP",
    link: "https://drive.google.com/file/d/1BmvjGknXs-K5wOfepFcl_CuU8DsFBApP/view",
    category: "DevOps",
    level: "Professional",
    skills: ["MLOps", "CI/CD", "Kubernetes"],
    power: 89,
    desc: "Professional certification in MLOps.",
    year: "2024",
    issuer: "MLOps Institute"
  },
  {
    title: "CI/CD",
    image: "https://lh3.googleusercontent.com/d/1xccQv29hZCWCvr-JnM-nEfE8meESrWIr",
    link: "https://drive.google.com/file/d/1xccQv29hZCWCvr-JnM-nEfE8meESrWIr/view",
    category: "DevOps",
    level: "Professional",
    skills: ["Jenkins", "GitHub Actions", "Docker"],
    power: 87,
    desc: "CI/CD pipeline automation certification.",
    year: "2024",
    issuer: "DevOps Academy"
  },
  {
    title: "Django",
    image: "https://lh3.googleusercontent.com/d/1QdiX2u-ARCZCEdEmlu4l3ChnQT-SmhKc",
    link: "https://drive.google.com/file/d/1QdiX2u-ARCZCEdEmlu4l3ChnQT-SmhKc/view",
    category: "Web",
    level: "Advanced",
    skills: ["Django", "Python", "REST API"],
    power: 90,
    desc: "Backend web development using Django.",
    year: "2023",
    issuer: "Django Foundation"
  },
  {
    title: "HTML",
    image: "https://lh3.googleusercontent.com/d/1NYtaxfhQUfxaL4n6Vv6gJSEQMySy1gqr",
    link: "https://drive.google.com/file/d/1NYtaxfhQUfxaL4n6Vv6gJSEQMySy1gqr/view",
    category: "Web",
    level: "Advanced",
    skills: ["HTML5", "Semantic", "Accessibility"],
    power: 88,
    desc: "Advanced HTML and semantic web development.",
    year: "2023",
    issuer: "W3C"
  },
  {
    title: "CSS",
    image: "https://lh3.googleusercontent.com/d/1iC65FGw0MSmjeKIivdnrZVm3GfXOKVvE",
    link: "https://drive.google.com/file/d/1iC65FGw0MSmjeKIivdnrZVm3GfXOKVvE/view",
    category: "Web",
    level: "Advanced",
    skills: ["CSS3", "Flexbox", "Grid"],
    power: 89,
    desc: "Advanced CSS layout and styling techniques.",
    year: "2023",
    issuer: "CSS Academy"
  }
];

const categoryConfig = {
  Web: { icon: Code, color: '#00ff9f', gradient: 'linear-gradient(135deg, #00ff9f, #00cc7a)', bgGlow: 'rgba(0, 255, 159, 0.15)' },
  Programming: { icon: Terminal, color: '#ff0080', gradient: 'linear-gradient(135deg, #ff0080, #cc0066)', bgGlow: 'rgba(255, 0, 128, 0.15)' },
  Cloud: { icon: Cloud, color: '#00d4ff', gradient: 'linear-gradient(135deg, #00d4ff, #0099cc)', bgGlow: 'rgba(0, 212, 255, 0.15)' },
  Data: { icon: Database, color: '#ffd700', gradient: 'linear-gradient(135deg, #ffd700, #ffb700)', bgGlow: 'rgba(255, 215, 0, 0.15)' },
  "AI/ML": { icon: Brain, color: '#a855f7', gradient: 'linear-gradient(135deg, #a855f7, #8b35d4)', bgGlow: 'rgba(168, 85, 247, 0.15)' },
  DevOps: { icon: Rocket, color: '#ff6b35', gradient: 'linear-gradient(135deg, #ff6b35, #e64a19)', bgGlow: 'rgba(255, 107, 53, 0.15)' }
};

function DeveloperAnimatedBackground() {
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

    const codeSnippets = [
      'import React', 'const [state]', 'async function', 'export default',
      'npm install', 'git commit', 'docker-compose', 'kubectl apply',
      'const express', 'app.listen', 'mongoose.connect', 'JWT.verify',
      'await fetch', 'Redux.dispatch', '<Component />', 'useEffect(() => {})'
    ];

    class CodeParticle {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height - canvas.height;
        this.speed = Math.random() * 0.5 + 0.2;
        this.text = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
        this.opacity = Math.random() * 0.3 + 0.1;
        this.color = ['#00ff9f', '#00d4ff', '#a855f7', '#ff0080'][Math.floor(Math.random() * 4)];
      }
      update() {
        this.y += this.speed;
        if (this.y > canvas.height + 50) this.reset();
      }
      draw() {
        ctx.font = '11px "JetBrains Mono", monospace';
        ctx.fillStyle = `${this.color}${Math.floor(this.opacity * 255).toString(16).padStart(2, '0')}`;
        ctx.fillText(this.text, this.x, this.y);
      }
    }

    class BinaryStream {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = -100;
        this.speed = Math.random() * 1.5 + 1;
        this.length = Math.floor(Math.random() * 12) + 8;
        this.chars = Array(this.length).fill(0).map(() => Math.random() > 0.5 ? '1' : '0');
      }
      update() {
        this.y += this.speed;
        if (this.y > canvas.height + 100) this.reset();
      }
      draw() {
        ctx.font = '10px "JetBrains Mono", monospace';
        this.chars.forEach((char, i) => {
          const alpha = Math.max(0, 0.25 - (i * 0.02));
          ctx.fillStyle = `rgba(0, 212, 255, ${alpha})`;
          ctx.fillText(char, this.x, this.y - (i * 12));
        });
      }
    }

    class CircuitNode {
      constructor() {
        this.reset();
      }
      reset() {
        this.startX = Math.random() * canvas.width;
        this.startY = Math.random() * canvas.height;
        this.endX = this.startX + (Math.random() - 0.5) * 300;
        this.endY = this.startY + (Math.random() - 0.5) * 300;
        this.progress = 0;
        this.speed = Math.random() * 0.005 + 0.003;
        this.color = ['#00ff9f', '#00d4ff', '#a855f7'][Math.floor(Math.random() * 3)];
      }
      update() {
        this.progress += this.speed;
        if (this.progress > 1) this.reset();
      }
      draw() {
        const x = this.startX + (this.endX - this.startX) * this.progress;
        const y = this.startY + (this.endY - this.startY) * this.progress;
        
        ctx.strokeStyle = `${this.color}30`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(this.startX, this.startY);
        ctx.lineTo(x, y);
        ctx.stroke();
        
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, 6);
        gradient.addColorStop(0, this.color);
        gradient.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, 6, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const codeParticles = Array.from({ length: 25 }, () => new CodeParticle());
    const binaryStreams = Array.from({ length: 18 }, () => new BinaryStream());
    const circuitNodes = Array.from({ length: 15 }, () => new CircuitNode());

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      circuitNodes.forEach(c => { c.update(); c.draw(); });
      binaryStreams.forEach(b => { b.update(); b.draw(); });
      codeParticles.forEach(c => { c.update(); c.draw(); });

      animationId = requestAnimationFrame(animate);
    };
    animate();

    window.addEventListener('resize', resize);
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
        opacity: 0.6
      }}
    />
  );
}

export default function CertificationsShowcase() {
  const [filter, setFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [hoveredCard, setHoveredCard] = useState(null);
  const [statsAnimated, setStatsAnimated] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [sortBy, setSortBy] = useState("power");
  const statsRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 8,
        y: (e.clientY / window.innerHeight - 0.5) * 8
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setStatsAnimated(true);
      },
      { threshold: 0.2 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  const filteredCerts = certificationsData
    .filter(cert => {
      const matchesFilter = filter === "All" || cert.category === filter;
      const matchesSearch = 
        cert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cert.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
        cert.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesFilter && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === "power") return b.power - a.power;
      if (sortBy === "year") return b.year.localeCompare(a.year);
      if (sortBy === "name") return a.title.localeCompare(b.title);
      return 0;
    });

  const avgPower = Math.round(filteredCerts.reduce((sum, c) => sum + c.power, 0) / filteredCerts.length) || 0;
  const totalCerts = certificationsData.length;
  const expertCerts = certificationsData.filter(c => c.level === "Expert").length;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700&family=Space+Grotesk:wght@300;400;500;600;700;800;900&display=swap');

        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { overflow-x: hidden; }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.85); }
          to { opacity: 1; transform: scale(1); }
        }

        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(60px); }
          to { opacity: 1; transform: translateX(0); }
        }

        @keyframes pulse3d {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }

        @keyframes glow {
          0%, 100% { filter: drop-shadow(0 0 8px currentColor); }
          50% { filter: drop-shadow(0 0 25px currentColor); }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }

        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }

        @keyframes rotate3d {
          from { transform: rotateY(0deg); }
          to { transform: rotateY(360deg); }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .glass-card {
          background: rgba(15, 15, 35, 0.7);
          backdrop-filter: blur(20px) saturate(180%);
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 
            0 8px 32px 0 rgba(0, 0, 0, 0.6),
            inset 0 1px 0 0 rgba(255, 255, 255, 0.05);
          transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
        }

        .glass-card:hover {
          border-color: rgba(0, 240, 255, 0.5);
          box-shadow: 
            0 20px 60px 0 rgba(0, 240, 255, 0.4),
            0 0 80px rgba(0, 240, 255, 0.2),
            inset 0 1px 0 0 rgba(255, 255, 255, 0.1);
          transform: translateY(-2px);
        }

        .neon-text {
          background: linear-gradient(135deg, #00ff9f, #00d4ff, #a855f7, #ff0080);
          background-size: 300% 300%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 8s ease infinite;
        }

        .holographic {
          background: linear-gradient(135deg, 
            rgba(0, 255, 159, 0.1) 0%,
            rgba(0, 212, 255, 0.1) 25%,
            rgba(168, 85, 247, 0.1) 50%,
            rgba(255, 0, 128, 0.1) 75%,
            rgba(0, 255, 159, 0.1) 100%);
          background-size: 400% 400%;
          animation: shimmer 10s ease infinite;
        }

        @media (max-width: 768px) {
          .glass-card:hover {
            transform: translateY(-4px) !important;
          }
        }

        @media (max-width: 640px) {
          body { overflow-x: hidden; }
        }
      `}</style>

      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(to bottom, #000000, #0a0a1a)',
        color: '#ffffff',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: "'Inter', sans-serif"
      }}>
        <DeveloperAnimatedBackground />

        <div style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: '1600px',
          margin: '0 auto',
          padding: 'clamp(2rem, 5vw, 4rem) clamp(1rem, 3vw, 2rem)'
        }}>
          {/* Hero Header */}
          <div style={{
            textAlign: 'center',
            marginBottom: 'clamp(3rem, 6vw, 5rem)',
            animation: 'fadeInUp 1s ease-out',
            transform: `translate3d(${mousePosition.x}px, ${mousePosition.y}px, 0)`,
            transition: 'transform 0.3s ease-out'
          }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 'clamp(0.5rem, 2vw, 1rem)',
              padding: 'clamp(0.6rem, 2vw, 0.8rem) clamp(1rem, 3vw, 2rem)',
              background: 'rgba(0, 240, 255, 0.12)',
              border: '2px solid rgba(0, 240, 255, 0.35)',
              borderRadius: '999px',
              marginBottom: 'clamp(1.5rem, 3vw, 2rem)',
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 'clamp(0.85rem, 2vw, 1.1rem)',
              color: '#00f0ff',
              animation: 'pulse3d 3s infinite',
              flexWrap: 'wrap',
              justifyContent: 'center'
            }}>
              <Trophy size={20} style={{ animation: 'glow 2s infinite', flexShrink: 0 }} />
              <span style={{ whiteSpace: 'nowrap' }}>{'> certificates.showcase()'}</span>
              <Sparkles size={20} style={{ animation: 'glow 2s infinite', flexShrink: 0 }} />
            </div>

            <h1 className="neon-text" style={{
              fontSize: 'clamp(3rem, 12vw, 9rem)',
              fontWeight: 900,
              letterSpacing: 'clamp(2px, 1vw, 8px)',
              marginBottom: 'clamp(0.5rem, 2vw, 1rem)',
              fontFamily: "'Space Grotesk', sans-serif",
              lineHeight: 1.1,
              textTransform: 'uppercase',
              textShadow: '0 0 80px rgba(0, 240, 255, 0.5)',
              wordWrap: 'break-word'
            }}>
              CERTIFICATIONS
            </h1>

            <div style={{
              fontSize: 'clamp(1rem, 3vw, 2rem)',
              fontWeight: 600,
              background: 'linear-gradient(135deg, #00ff9f, #00d4ff)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: 'clamp(2rem, 4vw, 3rem)'
            }}>
              Professional Technical Credentials & Achievements
            </div>

            {/* Enhanced Stats Dashboard */}
            <div 
              ref={statsRef}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(180px, 100%), 1fr))',
                gap: 'clamp(1rem, 2vw, 2rem)',
                maxWidth: '1100px',
                margin: '0 auto'
              }}
            >
              {[
                { label: 'Avg Power', value: avgPower, icon: Zap, color: '#ffd700', suffix: '' },
                { label: 'Total Certs', value: totalCerts, icon: Award, color: '#00ff9f', suffix: '+' },
                { label: 'Categories', value: 6, icon: Layers, color: '#ff0080', suffix: '' },
                { label: 'Expert Level', value: expertCerts, icon: Star, color: '#00d4ff', suffix: '' },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="glass-card"
                  style={{
                    padding: 'clamp(1.2rem, 3vw, 2rem) clamp(1rem, 2vw, 1.5rem)',
                    borderRadius: '18px',
                    textAlign: 'center',
                    animation: statsAnimated ? `scaleIn 0.6s ease-out ${i * 0.1}s both` : 'none',
                    cursor: 'pointer',
                    position: 'relative'
                  }}
                  onMouseEnter={(e) => {
                    if (window.innerWidth >= 768) {
                      e.currentTarget.style.transform = 'scale(1.05) translateY(-5px)';
                      e.currentTarget.style.borderColor = stat.color;
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'none';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                  }}
                >
                  <div style={{
                    width: 'clamp(50px, 10vw, 70px)',
                    height: 'clamp(50px, 10vw, 70px)',
                    margin: '0 auto clamp(0.5rem, 2vw, 1rem)',
                    borderRadius: '50%',
                    background: `linear-gradient(135deg, ${stat.color}, ${stat.color}80)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: `0 0 40px ${stat.color}60`,
                    animation: 'float 3s ease-in-out infinite'
                  }}>
                    <stat.icon size={Math.min(36, window.innerWidth * 0.06)} style={{ color: '#000' }} />
                  </div>
                  <div style={{
                    fontSize: 'clamp(1.8rem, 5vw, 2.5rem)',
                    fontWeight: 900,
                    color: stat.color,
                    marginBottom: '0.3rem',
                    fontFamily: "'Space Grotesk', sans-serif",
                    textShadow: `0 0 20px ${stat.color}60`
                  }}>
                    {stat.value}{stat.suffix}
                  </div>
                  <div style={{
                    fontSize: 'clamp(0.75rem, 2vw, 0.9rem)',
                    color: 'rgba(255, 255, 255, 0.6)',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '1.5px'
                  }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Search, Sort & Filter */}
          <div style={{ marginBottom: 'clamp(2rem, 4vw, 3rem)' }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))',
              gap: 'clamp(1rem, 2vw, 1.5rem)',
              marginBottom: 'clamp(1rem, 2vw, 1.5rem)'
            }}>
              {/* Search Bar */}
              <div className="glass-card" style={{
                padding: 'clamp(0.8rem, 2vw, 1.2rem)',
                borderRadius: '16px'
              }}>
                <input
                  type="text"
                  placeholder="🔍 Search certifications..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    width: '100%',
                    background: 'rgba(0, 0, 0, 0.4)',
                    border: '2px solid rgba(0, 240, 255, 0.2)',
                    borderRadius: '10px',
                    padding: 'clamp(0.8rem, 2vw, 1.1rem) clamp(1rem, 2vw, 1.3rem)',
                    fontSize: 'clamp(0.9rem, 2vw, 1.05rem)',
                    outline: 'none',
                    color: '#fff',
                    transition: 'all 0.3s ease',
                    fontFamily: "'Inter', sans-serif"
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#00f0ff';
                    e.target.style.boxShadow = '0 0 30px rgba(0, 240, 255, 0.3)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(0, 240, 255, 0.2)';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>

              {/* Sort Dropdown */}
              <div className="glass-card" style={{
                padding: 'clamp(0.8rem, 2vw, 1.2rem)',
                borderRadius: '16px'
              }}>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  style={{
                    width: '100%',
                    background: 'rgba(0, 0, 0, 0.4)',
                    border: '2px solid rgba(0, 240, 255, 0.2)',
                    borderRadius: '10px',
                    padding: 'clamp(0.8rem, 2vw, 1.1rem) clamp(1rem, 2vw, 1.3rem)',
                    fontSize: 'clamp(0.9rem, 2vw, 1.05rem)',
                    outline: 'none',
                    color: '#fff',
                    cursor: 'pointer',
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 600
                  }}
                >
                  <option value="power">⚡ Sort by Power</option>
                  <option value="year">📅 Sort by Year</option>
                  <option value="name">🔤 Sort by Name</option>
                </select>
              </div>
            </div>

            {/* Category Filters */}
            <div style={{
              display: 'flex',
              gap: 'clamp(0.6rem, 2vw, 1rem)',
              flexWrap: 'wrap',
              justifyContent: 'center'
            }}>
              {['All', ...Object.keys(categoryConfig)].map(cat => {
                const config = categoryConfig[cat];
                const Icon = config?.icon || Award;
                const isActive = filter === cat;
                
                return (
                  <button
                    key={cat}
                    onClick={() => setFilter(cat)}
                    style={{
                      padding: 'clamp(0.7rem, 2vw, 0.9rem) clamp(1.2rem, 3vw, 1.8rem)',
                      borderRadius: '12px',
                      fontWeight: 700,
                      fontSize: 'clamp(0.85rem, 2vw, 1rem)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      transition: 'all 0.3s ease',
                      border: `2px solid ${isActive ? config?.color || '#00f0ff' : 'rgba(255, 255, 255, 0.2)'}`,
                      background: isActive 
                        ? `${config?.gradient || 'linear-gradient(135deg, #00f0ff, #00cc7a)'}20`
                        : 'rgba(0, 0, 0, 0.3)',
                      color: isActive ? config?.color || '#00f0ff' : '#fff',
                      boxShadow: isActive ? `0 0 40px ${config?.color || '#00f0ff'}40` : 'none',
                      transform: isActive ? 'scale(1.05)' : 'scale(1)',
                      cursor: 'pointer',
                      backdropFilter: 'blur(10px)',
                      whiteSpace: 'nowrap'
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive && window.innerWidth >= 768) {
                        e.currentTarget.style.transform = 'scale(1.03)';
                        e.currentTarget.style.borderColor = config?.color || '#00f0ff';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.transform = 'scale(1)';
                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                      }
                    }}
                  >
                    {cat !== 'All' && <Icon size={18} />}
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Results Count */}
          <div style={{
            textAlign: 'center',
            marginBottom: 'clamp(1.5rem, 3vw, 2rem)',
            animation: 'fadeIn 0.5s ease-out'
          }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.8rem',
              padding: '0.8rem 1.5rem',
              background: 'rgba(0, 240, 255, 0.1)',
              border: '2px solid rgba(0, 240, 255, 0.3)',
              borderRadius: '12px',
              fontSize: 'clamp(0.9rem, 2vw, 1.05rem)',
              fontWeight: 600,
              color: '#00f0ff'
            }}>
              <CheckCircle size={20} />
              <span>Showing {filteredCerts.length} of {totalCerts} Certifications</span>
            </div>
          </div>

          {/* Certification Cards Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(320px, 100%), 1fr))',
            gap: 'clamp(1.5rem, 3vw, 2rem)'
          }}>
            {filteredCerts.map((cert, idx) => {
              const config = categoryConfig[cert.category];
              const isHovered = hoveredCard === idx;
              
              return (
                <div
                  key={idx}
                  style={{
                    position: 'relative',
                    perspective: '1500px',
                    transformStyle: 'preserve-3d',
                    cursor: 'pointer',
                    animation: `fadeInUp 0.8s ease-out ${Math.min(idx * 0.05, 1)}s both`
                  }}
                  onMouseEnter={() => setHoveredCard(idx)}
                  onMouseLeave={() => setHoveredCard(null)}
                  onClick={() => window.open(cert.link, '_blank')}
                >
                  <div className="glass-card" style={{
                    borderRadius: '20px',
                    overflow: 'hidden',
                    transition: 'all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)',
                    transform: isHovered && window.innerWidth >= 768 
                      ? 'rotateY(3deg) rotateX(2deg) scale(1.03) translateY(-8px)' 
                      : 'none',
                    transformStyle: 'preserve-3d',
                    position: 'relative',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column'
                  }}>
                    {/* Power Score Bar */}
                    <div style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '4px',
                      background: 'rgba(0, 0, 0, 0.5)',
                      zIndex: 20
                    }}>
                      <div style={{
                        height: '100%',
                        width: `${cert.power}%`,
                        background: config.gradient,
                        boxShadow: `0 0 15px ${config.color}`,
                        transition: 'width 1.5s ease-out'
                      }} />
                    </div>

                    {/* Certificate Image */}
                    <div style={{
                      position: 'relative',
                      height: 'clamp(200px, 30vw, 240px)',
                      overflow: 'hidden',
                      flexShrink: 0
                    }}>
                      <div style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
                        zIndex: 10
                      }} />
                      <img 
                        src={cert.image} 
                        alt={cert.title}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          transition: 'transform 0.6s ease',
                          transform: isHovered && window.innerWidth >= 768 ? 'scale(1.12)' : 'scale(1)'
                        }}
                      />
                      
                      {/* Category Badge */}
                      <div style={{
                        position: 'absolute',
                        top: 'clamp(0.8rem, 2vw, 1rem)',
                        right: 'clamp(0.8rem, 2vw, 1rem)',
                        padding: 'clamp(0.5rem, 1.5vw, 0.6rem) clamp(0.8rem, 2vw, 1rem)',
                        borderRadius: '999px',
                        backdropFilter: 'blur(15px)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        zIndex: 20,
                        background: `${config.color}25`,
                        border: `2px solid ${config.color}`,
                        boxShadow: `0 0 30px ${config.color}50`
                      }}>
                        <config.icon size={16} style={{ color: config.color }} />
                        <span style={{ 
                          fontSize: 'clamp(0.75rem, 2vw, 0.85rem)', 
                          fontWeight: 700, 
                          color: config.color,
                          fontFamily: "'JetBrains Mono', monospace"
                        }}>
                          {cert.category}
                        </span>
                      </div>

                      {/* Year Badge */}
                      <div style={{
                        position: 'absolute',
                        top: 'clamp(0.8rem, 2vw, 1rem)',
                        left: 'clamp(0.8rem, 2vw, 1rem)',
                        padding: 'clamp(0.4rem, 1.5vw, 0.5rem) clamp(0.7rem, 2vw, 0.9rem)',
                        borderRadius: '999px',
                        background: 'rgba(0, 0, 0, 0.7)',
                        backdropFilter: 'blur(10px)',
                        border: '2px solid rgba(255, 255, 255, 0.2)',
                        fontSize: 'clamp(0.7rem, 2vw, 0.8rem)',
                        fontWeight: 700,
                        color: '#fff',
                        zIndex: 20,
                        fontFamily: "'JetBrains Mono', monospace"
                      }}>
                        {cert.year}
                      </div>
                    </div>

                    {/* Card Content */}
                    <div style={{ 
                      padding: 'clamp(1.2rem, 3vw, 1.8rem)',
                      flex: 1,
                      display: 'flex',
                      flexDirection: 'column'
                    }}>
                      <h3 style={{
                        fontSize: 'clamp(1.1rem, 3vw, 1.4rem)',
                        fontWeight: 800,
                        marginBottom: 'clamp(0.6rem, 2vw, 0.8rem)',
                        color: isHovered ? config.color : '#fff',
                        transition: 'color 0.3s ease',
                        fontFamily: "'Space Grotesk', sans-serif",
                        lineHeight: 1.3
                      }}>
                        {cert.title}
                      </h3>
                      
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: 'clamp(0.8rem, 2vw, 1rem)',
                        flexWrap: 'wrap',
                        gap: '0.5rem'
                      }}>
                        <span style={{ 
                          fontSize: 'clamp(0.8rem, 2vw, 0.95rem)', 
                          fontWeight: 600, 
                          color: config.color,
                          padding: '0.4rem 0.8rem',
                          background: `${config.color}15`,
                          borderRadius: '8px',
                          border: `1px solid ${config.color}40`
                        }}>
                          {cert.level}
                        </span>
                        <div style={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: '0.4rem',
                          padding: '0.4rem 0.8rem',
                          background: 'rgba(255, 215, 0, 0.15)',
                          borderRadius: '8px',
                          border: '1px solid rgba(255, 215, 0, 0.4)'
                        }}>
                          <Zap size={16} style={{ color: '#ffd700' }} />
                          <span style={{ 
                            fontSize: 'clamp(0.8rem, 2vw, 0.95rem)', 
                            fontWeight: 800, 
                            color: '#ffd700',
                            fontFamily: "'Space Grotesk', sans-serif"
                          }}>
                            {cert.power}
                          </span>
                        </div>
                      </div>

                      <p style={{
                        fontSize: 'clamp(0.85rem, 2vw, 0.95rem)',
                        color: 'rgba(255, 255, 255, 0.7)',
                        marginBottom: 'clamp(0.8rem, 2vw, 1.2rem)',
                        lineHeight: 1.6,
                        flex: 1
                      }}>
                        {cert.desc}
                      </p>

                      {/* Skills Tags */}
                      <div style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '0.5rem',
                        marginBottom: 'clamp(0.8rem, 2vw, 1.2rem)'
                      }}>
                        {cert.skills.map((skill, i) => (
                          <span 
                            key={i}
                            style={{
                              fontSize: 'clamp(0.7rem, 2vw, 0.8rem)',
                              padding: '0.4rem 0.8rem',
                              borderRadius: '8px',
                              background: 'rgba(0, 0, 0, 0.5)',
                              color: 'rgba(255, 255, 255, 0.8)',
                              border: '1px solid rgba(255, 255, 255, 0.15)',
                              fontFamily: "'JetBrains Mono', monospace",
                              fontWeight: 500
                            }}
                          >
                            {skill}
                          </span>
                        ))}
                      </div>

                      {/* Issuer */}
                      <div style={{
                        fontSize: 'clamp(0.75rem, 2vw, 0.85rem)',
                        color: 'rgba(255, 255, 255, 0.5)',
                        marginBottom: 'clamp(0.8rem, 2vw, 1rem)',
                        fontWeight: 500
                      }}>
                        Issued by: {cert.issuer}
                      </div>

                      {/* View Certificate Link */}
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        gap: isHovered ? '0.8rem' : '0.5rem',
                        color: config.color,
                        fontSize: 'clamp(0.85rem, 2vw, 0.95rem)',
                        fontWeight: 700,
                        transition: 'gap 0.3s ease',
                        marginTop: 'auto'
                      }}>
                        <span>View Certificate</span>
                        <ExternalLink size={16} style={{
                          transition: 'transform 0.3s ease',
                          transform: isHovered ? 'translateX(3px)' : 'translateX(0)'
                        }} />
                      </div>
                    </div>

                    {/* Holographic Glow Effect */}
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      background: `radial-gradient(circle at center, ${config.color}20, transparent 60%)`,
                      opacity: isHovered ? 1 : 0,
                      transition: 'opacity 0.4s ease',
                      pointerEvents: 'none',
                      borderRadius: '20px'
                    }} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* No Results State */}
          {filteredCerts.length === 0 && (
            <div className="glass-card" style={{
              textAlign: 'center',
              padding: 'clamp(3rem, 8vw, 5rem) clamp(1.5rem, 4vw, 2rem)',
              borderRadius: '24px',
              marginTop: 'clamp(2rem, 4vw, 3rem)',
              animation: 'scaleIn 0.5s ease-out'
            }}>
              <div style={{ 
                fontSize: 'clamp(3rem, 10vw, 5rem)', 
                marginBottom: 'clamp(1rem, 3vw, 1.5rem)',
                animation: 'float 3s ease-in-out infinite'
              }}>
                🔍
              </div>
              <h3 style={{
                fontSize: 'clamp(1.5rem, 4vw, 2rem)',
                fontWeight: 800,
                color: '#00f0ff',
                marginBottom: 'clamp(0.8rem, 2vw, 1rem)',
                fontFamily: "'Space Grotesk', sans-serif"
              }}>
                No Certifications Found
              </h3>
              <p style={{
                fontSize: 'clamp(0.95rem, 2vw, 1.1rem)',
                color: 'rgba(255, 255, 255, 0.6)',
                maxWidth: '500px',
                margin: '0 auto'
              }}>
                Try adjusting your search or filter criteria to find what you're looking for
              </p>
            </div>
          )}

          {/* Footer Stats */}
          <div style={{
            marginTop: 'clamp(3rem, 6vw, 5rem)',
            padding: 'clamp(2rem, 4vw, 3rem)',
            textAlign: 'center',
            background: 'linear-gradient(135deg, rgba(0, 255, 159, 0.05), rgba(0, 212, 255, 0.05))',
            borderRadius: '24px',
            border: '1px solid rgba(255, 255, 255, 0.05)'
          }}>
            <div style={{
              fontSize: 'clamp(1.2rem, 3vw, 1.8rem)',
              fontWeight: 700,
              color: 'rgba(255, 255, 255, 0.8)',
              marginBottom: '1rem'
            }}>
              🎯 Continuously Learning & Growing
            </div>
            <div style={{
              fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
              color: 'rgba(255, 255, 255, 0.6)',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              Building expertise across multiple domains with industry-recognized certifications
            </div>
          </div>
        </div>
      </div>
    </>
  );
}