"use client";

import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import profileImg from "../assets/profile.jpeg";
import resumePdf from "../assets/bhagavanresume.pdf";

import { 
  Terminal, Download, Github, Linkedin, Mail, Phone, ChevronRight,
  Cpu, Database, Globe, Star, Brain, Code, Zap, Cloud, Layers, Server,
  Award, TrendingUp, Briefcase, Target, Rocket, Activity, Eye, Sparkles,
  Film, Play, ArrowRight, CheckCircle, Flame, Lightbulb, Shield, Users,
  BarChart3, GitBranch, BookOpen, Trophy, Calendar, ExternalLink, FileText,
  Code2, Box, Workflow
} from "lucide-react";

export default function EliteHomePage() {
  const navigate = useNavigate();
  
  // State Management
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [typedText, setTypedText] = useState("");
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [skillProgress, setSkillProgress] = useState({});
  const [isVisible, setIsVisible] = useState({});
  const [activeMetric, setActiveMetric] = useState(0);
  const [glitchActive, setGlitchActive] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  
  // Refs
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  // ATS-Optimized Content for Freshers
  const roles = [
    "AI/ML ENGINEER",
    "FULL-STACK DEVELOPER",
    "SOFTWARE ENGINEER",
    "CLOUD SOLUTIONS ARCHITECT",
    "DATA ENGINEER"
  ];

  // What top MNCs look for in freshers - Critical Success Factors
  const fresherStrengths = [
    { 
      title: "Strong Academic Foundation",
      description: "B.Tech Computer Science with specialization in AI/ML. Solid understanding of DSA, algorithms, system design, and core CS fundamentals.",
      icon: BookOpen,
      color: "#00f5ff",
      keywords: ["DSA", "Algorithms", "System Design", "CS Fundamentals"]
    },
    { 
      title: "3 Industry Internships",
      description: "Real-world experience in AI/ML, MERN Stack, and Cloud technologies. Delivered production-ready code in agile environments.",
      icon: Briefcase,
      color: "#FF9900",
      keywords: ["Production Code", "Agile", "Team Collaboration"]
    },
    { 
      title: "15+ Certifications",
      description: "Industry-verified credentials from AWS, Google Cloud, TensorFlow, and Meta. Continuous learning mindset demonstrated.",
      icon: Award,
      color: "#a855f7",
      keywords: ["AWS", "Google Cloud", "Meta", "Verified Skills"]
    },
    { 
      title: "Problem-Solving Excellence",
      description: "Strong competitive programming background. Regular hackathon participation with proven track record of delivering innovative solutions.",
      icon: Trophy,
      color: "#22c55e",
      keywords: ["LeetCode", "Hackathons", "Innovation", "Quick Learner"]
    },
    { 
      title: "10+ Production Projects",
      description: "Portfolio of live applications serving real users. Experience with full SDLC, from ideation to deployment and maintenance.",
      icon: Rocket,
      color: "#61DAFB",
      keywords: ["GitHub", "Live Projects", "Full Stack", "Deployment"]
    },
    { 
      title: "Fast Learner & Adaptable",
      description: "Self-taught advanced technologies. Quick to master new frameworks, tools, and methodologies. Growth-oriented mindset.",
      icon: Lightbulb,
      color: "#ff6b35",
      keywords: ["Self-Starter", "Adaptable", "Growth Mindset", "Initiative"]
    }
  ];

  // Core Technical Competencies - FAANG Interview Ready
  const coreCompetencies = [
    { 
      category: "Data Structures & Algorithms",
      skills: ["Arrays", "Trees", "Graphs", "DP", "Sorting", "Searching", "Recursion", "Backtracking"],
      level: 90,
      icon: Code2,
      color: "#00f5ff",
      priority: "FAANG ESSENTIAL"
    },
    { 
      category: "AI & Machine Learning",
      skills: ["TensorFlow", "PyTorch", "Scikit-Learn", "Computer Vision", "NLP", "Deep Learning", "Model Optimization"],
      level: 95,
      icon: Brain,
      color: "#a855f7",
      priority: "HIGH DEMAND"
    },
    { 
      category: "Full-Stack Development",
      skills: ["React", "Node.js", "Express", "MongoDB", "REST APIs", "TypeScript", "Redux", "Next.js"],
      level: 93,
      icon: Code,
      color: "#61DAFB",
      priority: "PRODUCTION READY"
    },
    { 
      category: "Cloud & DevOps",
      skills: ["AWS", "Docker", "Kubernetes", "CI/CD", "Jenkins", "Terraform", "Microservices"],
      level: 88,
      icon: Cloud,
      color: "#FF9900",
      priority: "ENTERPRISE GRADE"
    },
    { 
      category: "Programming Languages",
      skills: ["Python", "JavaScript", "TypeScript", "Java", "C++", "SQL", "Bash"],
      level: 92,
      icon: Terminal,
      color: "#22c55e",
      priority: "POLYGLOT"
    },
    { 
      category: "Database & Systems",
      skills: ["MongoDB", "PostgreSQL", "MySQL", "Redis", "System Design", "Scalability"],
      level: 87,
      icon: Database,
      color: "#ff6b35",
      priority: "ARCHITECTURE"
    }
  ];

  // Impact Metrics
  const impactMetrics = [
    { label: "Production Projects", value: "10+", icon: Rocket, color: "#00f5ff", description: "Live applications", subtext: "Serving real users" },
    { label: "Certifications", value: "15+", icon: Award, color: "#a855f7", description: "Industry verified", subtext: "AWS, GCP, Meta" },
    { label: "Tech Stack", value: "25+", icon: Layers, color: "#22c55e", description: "Technologies", subtext: "Frontend to ML" },
    { label: "Success Rate", value: "100%", icon: Target, color: "#ff6b35", description: "Completion", subtext: "On-time delivery" },
  ];

  // Professional Excellence Beyond Code
  const technicalExcellence = [
    {
      title: "System Design",
      description: "Understanding of scalable architectures, microservices, load balancing, caching, and distributed systems design patterns.",
      icon: Box,
      color: "#00f5ff",
      tags: ["Scalability", "Architecture", "Microservices", "Performance"]
    },
    {
      title: "Clean Code",
      description: "SOLID principles, design patterns, comprehensive documentation, unit testing, and industry-standard coding practices.",
      icon: FileText,
      color: "#22c55e",
      tags: ["SOLID", "Patterns", "Testing", "Documentation"]
    },
    {
      title: "Agile & Team",
      description: "Scrum methodology, JIRA proficiency, Git workflows, code reviews, pair programming, and excellent communication skills.",
      icon: Users,
      color: "#a855f7",
      tags: ["Agile", "Scrum", "Git", "Collaboration"]
    },
    {
      title: "Optimization",
      description: "Code optimization, database indexing, caching strategies, lazy loading, and comprehensive performance tuning expertise.",
      icon: Zap,
      color: "#FF9900",
      tags: ["Performance", "Speed", "Efficiency", "Best Practices"]
    }
  ];

  // Education Journey
  const educationHighlights = [
    {
      degree: "B.Tech CS",
      institution: "AI/ML Specialization",
      year: "2022-2026",
      focus: "Top Academic Performance",
      icon: BookOpen,
      color: "#00f5ff",
      achievements: ["Dean's List", "Research Projects", "95+ Score"]
    },
    {
      degree: "Internships",
      institution: "3 Companies",
      year: "2023-2026",
      focus: "Real-World Experience",
      icon: Briefcase,
      color: "#FF9900",
      achievements: ["Production Code", "Agile Teams", "Positive Reviews"]
    },
    {
      degree: "Hackathons",
      institution: "Multiple Wins",
      year: "2022-2026",
      focus: "Innovation & Speed",
      icon: Trophy,
      color: "#22c55e",
      achievements: ["Team Lead", "24hr Builds", "Awards"]
    },
    {
      degree: "Certifications",
      institution: "AWS, GCP, Meta",
      year: "2023-2026",
      focus: "Continuous Learning",
      icon: Award,
      color: "#a855f7",
      achievements: ["15+ Credentials", "Verified", "Industry Recognition"]
    }
  ];

  // Quick Navigation
  const quickLinks = [
    { label: "Projects", icon: Eye, path: "/projects", color: "#00f5ff" },
    { label: "Certifications", icon: Award, path: "/certifications", color: "#a855f7" },
    { label: "Internships", icon: Briefcase, path: "/internships", color: "#FF9900" },
    { label: "Hackathons", icon: Trophy, path: "/hackathons", color: "#22c55e" },
    { label: "Skills", icon: Code, path: "/myskills", color: "#61DAFB" },
    { label: "Resume", icon: FileText, path: "/resume", color: "#ff6b35" }
  ];

  // Particle System
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationId;
    let particleArray = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 2 + 1;
        const colors = ['0,245,255', '168,85,247', '34,197,94', '255,107,53'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.opacity = Math.random() * 0.5 + 0.2;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

        const dx = mousePosition.x - this.x;
        const dy = mousePosition.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 200) {
          const force = (200 - distance) / 200 * 0.5;
          this.x += dx * force * 0.02;
          this.y += dy * force * 0.02;
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`;
        ctx.fill();

        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 5);
        gradient.addColorStop(0, `rgba(${this.color}, ${this.opacity * 0.8})`);
        gradient.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 5, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    for (let i = 0; i < 80; i++) particleArray.push(new Particle());

    const connectParticles = () => {
      for (let a = 0; a < particleArray.length; a++) {
        for (let b = a + 1; b < particleArray.length; b++) {
          const dx = particleArray[a].x - particleArray[b].x;
          const dy = particleArray[a].y - particleArray[b].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 150) {
            ctx.strokeStyle = `rgba(0,245,255,${(1-distance/150)*0.15})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particleArray[a].x, particleArray[a].y);
            ctx.lineTo(particleArray[b].x, particleArray[b].y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particleArray.forEach(p => { p.update(); p.draw(); });
      connectParticles();
      animationId = requestAnimationFrame(animate);
    };

    animate();
    window.addEventListener('resize', resize);
    return () => { cancelAnimationFrame(animationId); window.removeEventListener('resize', resize); };
  }, [mousePosition]);

  // Event Handlers
  useEffect(() => {
    const handleMouseMove = (e) => setMousePosition({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const currentRole = roles[currentRoleIndex];
    let charIndex = 0;
    const typingInterval = setInterval(() => {
      if (charIndex <= currentRole.length) {
        setTypedText(currentRole.slice(0, charIndex));
        charIndex++;
      } else {
        clearInterval(typingInterval);
        setTimeout(() => setCurrentRoleIndex((prev) => (prev + 1) % roles.length), 2500);
      }
    }, 100);
    return () => clearInterval(typingInterval);
  }, [currentRoleIndex]);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress((scrolled / maxScroll) * 100);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.target.id) setIsVisible((prev) => ({ ...prev, [entry.target.id]: entry.isIntersecting }));
      });
    }, { threshold: 0.15 });
    document.querySelectorAll("[data-observe]").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible.skills) {
      coreCompetencies.forEach((comp, index) => {
        setTimeout(() => setSkillProgress((prev) => ({ ...prev, [comp.category]: comp.level })), 200 + index * 150);
      });
    }
  }, [isVisible.skills]);

  useEffect(() => {
    const interval = setInterval(() => setActiveMetric((prev) => (prev + 1) % impactMetrics.length), 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 150);
    }, 12000);
    return () => clearInterval(glitchInterval);
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@300;400;500;600;700;800&display=swap');
        * { margin:0; padding:0; box-sizing:border-box; -webkit-font-smoothing:antialiased; -moz-osx-font-smoothing:grayscale; }
        body { font-family:'Inter',sans-serif; background:#000; color:#fff; overflow-x:hidden; }
        @keyframes elite-reveal { from{opacity:0;transform:translateY(60px);filter:blur(10px)} to{opacity:1;transform:translateY(0);filter:blur(0)} }
        @keyframes slide-in-left { from{transform:translateX(-100px);opacity:0} to{transform:translateX(0);opacity:1} }
        @keyframes glitch { 0%{transform:translate(0)} 20%{transform:translate(-2px,2px)} 40%{transform:translate(-2px,-2px)} 60%{transform:translate(2px,2px)} 80%{transform:translate(2px,-2px)} 100%{transform:translate(0)} }
        @keyframes pulse-border { 0%,100%{box-shadow:0 0 20px currentColor,0 0 40px currentColor,inset 0 0 20px rgba(0,245,255,0.1)} 50%{box-shadow:0 0 40px currentColor,0 0 80px currentColor,inset 0 0 40px rgba(0,245,255,0.2)} }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-20px)} }
        @keyframes shimmer { 0%{transform:translateX(-100%)} 100%{transform:translateX(100%)} }
        @keyframes gradient-flow { 0%,100%{background-position:0% 50%} 50%{background-position:100% 50%} }
        @keyframes typing-cursor { 0%,50%{opacity:1} 51%,100%{opacity:0} }
        @keyframes scale-pulse { 0%,100%{transform:scale(1)} 50%{transform:scale(1.05)} }
        .elite-reveal { animation:elite-reveal 1s cubic-bezier(0.16,1,0.3,1) forwards; opacity:0; }
        .slide-left { animation:slide-in-left 0.8s cubic-bezier(0.16,1,0.3,1) forwards; }
        .glitch-effect { animation:glitch 0.2s cubic-bezier(0.25,0.46,0.45,0.94); }
        .delay-1{animation-delay:0.1s} .delay-2{animation-delay:0.2s} .delay-3{animation-delay:0.3s} .delay-4{animation-delay:0.4s} .delay-5{animation-delay:0.5s} .delay-6{animation-delay:0.6s} .delay-7{animation-delay:0.7s}
        .glass-elite { background:rgba(255,255,255,0.02); backdrop-filter:blur(30px)saturate(180%); border:1px solid rgba(255,255,255,0.08); border-radius:20px; position:relative; overflow:hidden; transition:all 0.5s cubic-bezier(0.16,1,0.3,1); }
        .glass-elite::before { content:''; position:absolute; inset:0; background:linear-gradient(135deg,rgba(255,255,255,0.1)0%,transparent 50%,rgba(255,255,255,0.1)100%); opacity:0; transition:opacity 0.5s; }
        .glass-elite:hover::before { opacity:1; }
        .glass-elite:hover { transform:translateY(-8px)scale(1.01); border-color:rgba(0,245,255,0.3); box-shadow:0 20px 60px rgba(0,0,0,0.6),0 0 60px rgba(0,245,255,0.2); }
        .btn-primary-elite { position:relative; background:linear-gradient(135deg,#00f5ff 0%,#0077ff 100%); border:none; color:#000; font-weight:700; padding:1rem 2.5rem; border-radius:10px; cursor:pointer; overflow:hidden; font-family:'Space Grotesk',sans-serif; text-transform:uppercase; letter-spacing:1px; font-size:0.9rem; transition:all 0.4s cubic-bezier(0.16,1,0.3,1); text-decoration:none; display:inline-flex; align-items:center; gap:0.6rem; }
        .btn-primary-elite::before { content:''; position:absolute; inset:0; background:linear-gradient(90deg,transparent,rgba(255,255,255,0.6),transparent); transform:translateX(-100%); transition:transform 0.6s; }
        .btn-primary-elite:hover::before { transform:translateX(100%); }
        .btn-primary-elite:hover { transform:translateY(-3px); box-shadow:0 15px 40px rgba(0,245,255,0.4),0 0 0 2px #000,0 0 0 4px #00f5ff; }
        .btn-outline-elite { background:transparent; border:2px solid currentColor; color:currentColor; font-weight:600; padding:1rem 2.5rem; border-radius:10px; cursor:pointer; position:relative; overflow:hidden; font-family:'Space Grotesk',sans-serif; text-transform:uppercase; letter-spacing:1px; font-size:0.9rem; transition:all 0.4s cubic-bezier(0.16,1,0.3,1); text-decoration:none; display:inline-flex; align-items:center; gap:0.6rem; }
        .btn-outline-elite::before { content:''; position:absolute; inset:0; background:currentColor; transform:scaleX(0); transform-origin:left; transition:transform 0.5s cubic-bezier(0.16,1,0.3,1); z-index:-1; }
        .btn-outline-elite:hover::before { transform:scaleX(1); }
        .btn-outline-elite:hover { color:#000; transform:translateY(-3px); box-shadow:0 15px 40px currentColor; }
        .skill-bar-container { height:8px; background:rgba(255,255,255,0.05); border-radius:10px; overflow:hidden; position:relative; border:1px solid rgba(255,255,255,0.1); }
        .skill-bar-fill { height:100%; background:linear-gradient(90deg,currentColor 0%,rgba(255,255,255,0.6)100%); border-radius:10px; transition:width 2s cubic-bezier(0.16,1,0.3,1); position:relative; overflow:hidden; }
        .skill-bar-fill::after { content:''; position:absolute; inset:0; background:linear-gradient(90deg,transparent,rgba(255,255,255,0.6),transparent); animation:shimmer 2s infinite; }
        .gradient-text { background:linear-gradient(90deg,#00f5ff 0%,#0077ff 50%,#a855f7 100%); background-size:200% auto; -webkit-background-clip:text; background-clip:text; -webkit-text-fill-color:transparent; animation:gradient-flow 3s ease infinite; }
        @media(max-width:1024px){ .hero-grid{grid-template-columns:1fr!important;gap:4rem!important} .profile-rectangle{order:-1;max-width:100%!important} }
        @media(max-width:768px){ h1{font-size:2.5rem!important} h2{font-size:1.8rem!important} .btn-primary-elite,.btn-outline-elite{padding:0.9rem 2rem!important;font-size:0.85rem!important} }
        ::-webkit-scrollbar{width:8px} ::-webkit-scrollbar-track{background:rgba(0,0,0,0.4)} ::-webkit-scrollbar-thumb{background:linear-gradient(180deg,#00f5ff,#a855f7);border-radius:4px} ::-webkit-scrollbar-thumb:hover{background:linear-gradient(180deg,#a855f7,#ff6b35)}
      `}</style>

      <div style={{ background:'linear-gradient(180deg,#000 0%,#0a0a14 50%,#000 100%)', minHeight:"100vh", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"fixed", top:0, left:0, width:`${scrollProgress}%`, height:"3px", background:"linear-gradient(90deg,#00f5ff 0%,#0077ff 50%,#a855f7 100%)", zIndex:10000, transition:"width 0.1s", boxShadow:"0 0 20px currentColor" }} />
        <canvas ref={canvasRef} style={{ position:'fixed', inset:0, pointerEvents:'none', zIndex:1, opacity:0.6 }} />
        <div style={{ position:"fixed", inset:0, background:"radial-gradient(circle at 20% 80%,rgba(0,245,255,0.08)0%,transparent 50%),radial-gradient(circle at 80% 20%,rgba(168,85,247,0.08)0%,transparent 50%),radial-gradient(circle at 50% 50%,rgba(0,119,255,0.05)0%,transparent 50%)", pointerEvents:"none", zIndex:2 }} />

        <div ref={containerRef} style={{ maxWidth:"1600px", margin:"0 auto", padding:"0 3rem", position:"relative", zIndex:10 }}>
          
          {/* HERO */}
          <section style={{ minHeight:"100vh", display:"grid", gridTemplateColumns:"1.3fr 1fr", gap:"6rem", alignItems:"center", paddingTop:"6rem" }} className="hero-grid">
            <div>
              <div className="elite-reveal delay-1" style={{ display:"inline-flex", alignItems:"center", gap:"0.6rem", background:"rgba(0,245,255,0.1)", border:"1px solid rgba(0,245,255,0.3)", borderRadius:"30px", padding:"0.6rem 1.2rem", marginBottom:"2rem", fontFamily:"'JetBrains Mono',monospace", fontSize:"0.85rem", color:"#00f5ff", fontWeight:600 }}>
                <div style={{ width:"8px", height:"8px", background:"#00f5ff", borderRadius:"50%", animation:"scale-pulse 2s ease-in-out infinite" }} />
                OPEN TO OPPORTUNITIES • 2026 GRADUATE
              </div>

              <h1 className={`elite-reveal delay-2 ${glitchActive?'glitch-effect':''}`} style={{ fontSize:"clamp(2.5rem,6vw,5rem)", fontWeight:900, lineHeight:1.1, marginBottom:"1.5rem", fontFamily:"'Space Grotesk',sans-serif", letterSpacing:"-0.02em" }}>
                <span style={{color:'#fff'}}>SIVA SATYA SAI</span><br/><span className="gradient-text">BHAGAVAN</span>
              </h1>

              <div className="elite-reveal delay-3" style={{ fontSize:"clamp(1.2rem,2.5vw,1.8rem)", fontWeight:700, marginBottom:"2rem", fontFamily:"'JetBrains Mono',monospace", color:"#00f5ff", minHeight:"2.5rem", display:"flex", alignItems:"center" }}>
                &lt; {typedText}<span style={{ display:'inline-block', width:'2px', height:'1.2em', background:'#00f5ff', marginLeft:'8px', animation:'typing-cursor 1s step-end infinite' }} />&nbsp;/&gt;
              </div>

              <p className="elite-reveal delay-4" style={{ fontSize:"1.15rem", lineHeight:1.7, color:"#b0b0b0", maxWidth:"650px", marginBottom:"2rem", fontWeight:400 }}>
                Fresh graduate specializing in <span style={{color:'#00f5ff',fontWeight:600}}>AI/ML Engineering</span> and <span style={{color:'#0077ff',fontWeight:600}}>Full-Stack Development</span>. <strong style={{color:'#fff'}}>3 industry internships</strong>, <strong style={{color:'#fff'}}>15+ certifications</strong>, and <strong style={{color:'#fff'}}>10+ production projects</strong>. Ready to contribute from day one at top tech companies.
              </p>

              <div className="elite-reveal delay-5" style={{ display:"flex", gap:"1.2rem", marginBottom:"2rem", flexWrap:"wrap" }}>
                <button onClick={() => handleNavigation('/projects')} className="btn-primary-elite">
                  <Play size={18} />VIEW PROJECTS
                </button>
                <a href={resumePdf} download="Bhagavan_Resume.pdf" className="btn-outline-elite" style={{color:"#00f5ff"}}>
                  <Download size={18} />DOWNLOAD RESUME
                </a>
              </div>

              <div className="elite-reveal delay-6" style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(150px,1fr))", gap:"0.8rem", marginBottom:"2rem" }}>
                {quickLinks.slice(0,4).map((link,i) => (
                  <button key={i} onClick={() => handleNavigation(link.path)} style={{ display:"flex", alignItems:"center", gap:"0.5rem", padding:"0.7rem 1rem", background:"rgba(255,255,255,0.03)", border:`1px solid ${link.color}40`, borderRadius:"8px", color:link.color, fontSize:"0.8rem", fontWeight:600, cursor:"pointer", transition:"all 0.3s cubic-bezier(0.16,1,0.3,1)", fontFamily:"'Inter',sans-serif" }}
                    onMouseEnter={e=>{ e.currentTarget.style.background=`${link.color}20`; e.currentTarget.style.borderColor=link.color; e.currentTarget.style.transform="translateY(-2px)"; }}
                    onMouseLeave={e=>{ e.currentTarget.style.background="rgba(255,255,255,0.03)"; e.currentTarget.style.borderColor=`${link.color}40`; e.currentTarget.style.transform="translateY(0)"; }}>
                    <link.icon size={14}/>{link.label}
                  </button>
                ))}
              </div>

              <div className="elite-reveal delay-7" style={{ display:"flex", gap:"1rem", flexWrap:"wrap" }}>
                {[
                  {icon:Github,href:"https://github.com/bhagavan444",color:"#fff",label:"GitHub"},
                  {icon:Linkedin,href:"https://www.linkedin.com/in/gopalajosyula-siva-satya-sai-bhagavan-1624a027b/",color:"#00f5ff",label:"LinkedIn"},
                  {icon:Mail,href:"mailto:g.sivasatyasaibhagavan@gmail.com",color:"#0077ff",label:"Email"},
                  {icon:Phone,href:"tel:+917569205626",color:"#a855f7",label:"Phone"}
                ].map((link,i) => (
                  <a key={i} href={link.href} target="_blank" rel="noopener noreferrer" title={link.label} style={{ display:"flex", alignItems:"center", justifyContent:"center", width:"48px", height:"48px", background:"rgba(0,0,0,0.6)", border:`2px solid ${link.color}`, borderRadius:"50%", color:link.color, transition:"all 0.3s cubic-bezier(0.16,1,0.3,1)", textDecoration:"none" }}
                    onMouseEnter={e=>{ e.currentTarget.style.transform="scale(1.2) translateY(-5px)"; e.currentTarget.style.boxShadow=`0 10px 30px ${link.color}`; e.currentTarget.style.background=link.color; e.currentTarget.style.color="#000"; }}
                    onMouseLeave={e=>{ e.currentTarget.style.transform="scale(1) translateY(0)"; e.currentTarget.style.boxShadow="none"; e.currentTarget.style.background="rgba(0,0,0,0.6)"; e.currentTarget.style.color=link.color; }}>
                    <link.icon size={20}/>
                  </a>
                ))}
              </div>
            </div>

            {/* RECTANGLE PROFILE */}
            <div className="profile-rectangle elite-reveal delay-4" style={{ position:"relative", display:"flex", justifyContent:"center", alignItems:"center", maxWidth:"500px" }}>
              <div style={{ position:"relative", width:"100%", aspectRatio:"4/5", animation:"float 6s ease-in-out infinite" }}>
                {[
                  {top:"-10px",left:"-10px",borderTop:"3px solid #00f5ff",borderLeft:"3px solid #00f5ff"},
                  {top:"-10px",right:"-10px",borderTop:"3px solid #0077ff",borderRight:"3px solid #0077ff"},
                  {bottom:"-10px",left:"-10px",borderBottom:"3px solid #a855f7",borderLeft:"3px solid #a855f7"},
                  {bottom:"-10px",right:"-10px",borderBottom:"3px solid #22c55e",borderRight:"3px solid #22c55e"}
                ].map((corner,i)=><div key={i} style={{position:"absolute",width:"40px",height:"40px",...corner,transition:"all 0.3s"}}/>)}

                <div style={{ position:"relative", width:"100%", height:"100%", borderRadius:"20px", overflow:"hidden", border:"3px solid rgba(0,245,255,0.4)", boxShadow:"0 0 60px rgba(0,245,255,0.3),0 0 100px rgba(0,119,255,0.2),inset 0 0 60px rgba(0,0,0,0.5)", transform:`translate(${mousePosition.x*0.008}px,${mousePosition.y*0.008}px)`, transition:"transform 0.1s ease-out" }}>
                  <img src={profileImg} alt="Siva Satya Sai Bhagavan - AI/ML Engineer & Full-Stack Developer" style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"center" }}/>
                  <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top,rgba(0,0,0,0.95)0%,transparent 60%)" }}/>

                  {[
                    {icon:Brain,label:"AI/ML",color:"#00f5ff",position:{top:"15px",left:"15px"}},
                    {icon:Code,label:"React",color:"#61DAFB",position:{top:"15px",right:"15px"}},
                    {icon:Database,label:"MongoDB",position:{bottom:"80px",left:"15px"},color:"#47A248"},
                    {icon:Cloud,label:"AWS",position:{bottom:"80px",right:"15px"},color:"#FF9900"}
                  ].map((badge,idx)=>(
                    <div key={idx} title={badge.label} style={{ position:"absolute", ...badge.position, width:"55px", height:"55px", background:"rgba(0,0,0,0.9)", backdropFilter:"blur(10px)", border:`2px solid ${badge.color}`, borderRadius:"12px", display:"flex", alignItems:"center", justifyContent:"center", color:badge.color, boxShadow:`0 0 25px ${badge.color}`, transition:"all 0.4s cubic-bezier(0.16,1,0.3,1)", zIndex:5 }}
                      onMouseEnter={e=>{ e.currentTarget.style.transform="scale(1.3)"; e.currentTarget.style.boxShadow=`0 0 50px ${badge.color}`; }}
                      onMouseLeave={e=>{ e.currentTarget.style.transform="scale(1)"; e.currentTarget.style.boxShadow=`0 0 25px ${badge.color}`; }}>
                      <badge.icon size={26}/>
                    </div>
                  ))}

                  <div style={{ position:"absolute", bottom:0, left:0, right:0, background:"rgba(0,0,0,0.95)", backdropFilter:"blur(20px)", borderTop:"2px solid #00f5ff", padding:"1.2rem", display:"flex", flexDirection:"column", gap:"0.8rem", zIndex:10 }}>
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                      <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"0.9rem", color:"#00f5ff", fontWeight:700, display:"flex", alignItems:"center", gap:"0.5rem" }}>
                        <Sparkles size={16}/>Fresh Graduate 2026
                      </div>
                      <div style={{ display:"flex", gap:"0.5rem" }}>
                        {[{color:"#00f5ff",label:"AI"},{color:"#61DAFB",label:"Web"},{color:"#FF9900",label:"Cloud"}].map((tag,i)=>(
                          <span key={i} style={{ padding:"0.3rem 0.6rem", background:`${tag.color}20`, border:`1px solid ${tag.color}`, borderRadius:"6px", fontSize:"0.7rem", color:tag.color, fontWeight:700, fontFamily:"'JetBrains Mono',monospace" }}>{tag.label}</span>
                        ))}
                      </div>
                    </div>
                    <a href="mailto:g.sivasatyasaibhagavan@gmail.com" style={{ color:"#fff", textDecoration:"none", display:"flex", alignItems:"center", justifyContent:"center", gap:"0.5rem", padding:"0.7rem", background:"linear-gradient(135deg,#00f5ff,#0077ff)", borderRadius:"8px", fontWeight:700, fontSize:"0.85rem", transition:"all 0.3s", fontFamily:"'Space Grotesk',sans-serif" }}
                      onMouseEnter={e=>{ e.currentTarget.style.transform="scale(1.05)"; e.currentTarget.style.boxShadow="0 5px 20px rgba(0,245,255,0.5)"; }}
                      onMouseLeave={e=>{ e.currentTarget.style.transform="scale(1)"; e.currentTarget.style.boxShadow="none"; }}>
                      <Mail size={16}/>LET'S COLLABORATE
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* METRICS */}
          <section id="metrics" data-observe style={{padding:"5rem 0"}}>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:"2rem" }}>
              {impactMetrics.map((m,i)=>(
                <div key={i} className={`glass-elite ${isVisible.metrics?'elite-reveal':''}`} style={{ padding:"2.5rem 2rem", textAlign:"center", animationDelay:`${i*0.1}s`, opacity:isVisible.metrics?1:0, borderColor:i===activeMetric?m.color:'rgba(255,255,255,0.08)', transform:i===activeMetric?'scale(1.05)':'scale(1)', transition:'all 0.5s cubic-bezier(0.16,1,0.3,1)' }}>
                  <div style={{ width:"70px", height:"70px", margin:"0 auto 1.5rem", background:`rgba(${m.color==='#00f5ff'?'0,245,255':m.color==='#a855f7'?'168,85,247':m.color==='#22c55e'?'34,197,94':'255,107,53'},0.1)`, border:`2px solid ${m.color}`, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", color:m.color, boxShadow:`0 0 30px ${m.color}40`, animation:i===activeMetric?"pulse-border 2s ease-in-out infinite":"none" }}>
                    <m.icon size={35}/>
                  </div>
                  <div style={{ fontSize:"2.8rem", fontWeight:900, marginBottom:"0.5rem", fontFamily:"'Space Grotesk',sans-serif", color:m.color }}>{m.value}</div>
                  <div style={{ fontSize:"1.05rem", fontWeight:700, marginBottom:"0.5rem", color:"#fff", textTransform:"uppercase", letterSpacing:"0.5px" }}>{m.label}</div>
                  <div style={{ fontSize:"0.9rem", color:"#888", fontWeight:500, marginBottom:"0.3rem" }}>{m.description}</div>
                  <div style={{ fontSize:"0.8rem", color:"#666", fontStyle:"italic" }}>{m.subtext}</div>
                </div>
              ))}
            </div>
          </section>

          {/* STRENGTHS */}
          <section id="strengths" data-observe style={{padding:"5rem 0"}}>
            <h2 style={{ fontSize:"clamp(2rem,4vw,3rem)", fontWeight:900, marginBottom:"1rem", textAlign:"center", fontFamily:"'Space Grotesk',sans-serif", letterSpacing:"-0.02em" }}>
              <span className="gradient-text">Why Hire Me?</span>
            </h2>
            <p style={{ textAlign:"center", color:"#888", fontSize:"1.1rem", marginBottom:"4rem", maxWidth:"700px", marginLeft:"auto", marginRight:"auto" }}>
              What top MNC companies value in fresh graduates
            </p>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(350px,1fr))", gap:"2.5rem" }}>
              {fresherStrengths.map((s,i)=>(
                <div key={i} className={`glass-elite ${isVisible.strengths?'elite-reveal':''}`} style={{ padding:"2.5rem", animationDelay:`${i*0.15}s`, opacity:isVisible.strengths?1:0, cursor:"pointer" }}
                  onMouseEnter={()=>setHoveredCard(i)} onMouseLeave={()=>setHoveredCard(null)}>
                  <div style={{ width:"60px", height:"60px", background:`${s.color}15`, border:`2px solid ${s.color}`, borderRadius:"16px", display:"flex", alignItems:"center", justifyContent:"center", marginBottom:"1.5rem", color:s.color, transition:"all 0.3s", transform:hoveredCard===i?"scale(1.1) rotate(5deg)":"scale(1)" }}>
                    <s.icon size={30}/>
                  </div>
                  <h3 style={{ fontSize:"1.4rem", fontWeight:700, marginBottom:"1rem", color:"#fff", fontFamily:"'Space Grotesk',sans-serif" }}>{s.title}</h3>
                  <p style={{ fontSize:"1rem", lineHeight:1.7, color:"#b0b0b0", marginBottom:"1.5rem" }}>{s.description}</p>
                  <div style={{ display:"flex", flexWrap:"wrap", gap:"0.6rem" }}>
                    {s.keywords.map((k,idx)=>(
                      <span key={idx} style={{ padding:"0.4rem 0.9rem", background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:"20px", fontSize:"0.8rem", color:"#888", fontWeight:600, fontFamily:"'JetBrains Mono',monospace" }}>{k}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* SKILLS */}
          <section id="skills" data-observe style={{padding:"5rem 0"}}>
            <h2 style={{ fontSize:"clamp(2rem,4vw,3rem)", fontWeight:900, marginBottom:"4rem", textAlign:"center", fontFamily:"'Space Grotesk',sans-serif", letterSpacing:"-0.02em" }}>
              <span className="gradient-text">Technical Expertise</span>
            </h2>
            <div style={{ maxWidth:"1100px", margin:"0 auto", display:"flex", flexDirection:"column", gap:"2.5rem" }}>
              {coreCompetencies.map((c,i)=>(
                <div key={i} className={`glass-elite ${isVisible.skills?'slide-left':''}`} style={{ padding:"2rem 2.5rem", opacity:isVisible.skills?1:0, animationDelay:`${i*0.1}s` }}>
                  <div style={{ display:"flex", alignItems:"center", gap:"1rem", marginBottom:"1.5rem" }}>
                    <div style={{ width:"50px", height:"50px", background:`${c.color}15`, border:`2px solid ${c.color}`, borderRadius:"12px", display:"flex", alignItems:"center", justifyContent:"center", color:c.color }}>
                      <c.icon size={26}/>
                    </div>
                    <div style={{flex:1}}>
                      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"0.5rem" }}>
                        <div style={{ display:"flex", alignItems:"center", gap:"1rem" }}>
                          <span style={{ fontSize:"1.2rem", fontWeight:700, color:"#fff", fontFamily:"'Space Grotesk',sans-serif" }}>{c.category}</span>
                          <span style={{ padding:"0.3rem 0.8rem", background:`${c.color}20`, border:`1px solid ${c.color}`, borderRadius:"20px", fontSize:"0.7rem", color:c.color, fontWeight:700, fontFamily:"'JetBrains Mono',monospace" }}>{c.priority}</span>
                        </div>
                        <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"1.1rem", color:c.color, fontWeight:800 }}>{skillProgress[c.category]||0}%</span>
                      </div>
                      <div className="skill-bar-container">
                        <div className="skill-bar-fill" style={{ width:`${skillProgress[c.category]||0}%`, color:c.color }}/>
                      </div>
                    </div>
                  </div>
                  <div style={{ display:"flex", flexWrap:"wrap", gap:"0.6rem", paddingLeft:"4rem" }}>
                    {c.skills.map((sk,idx)=>(
                      <span key={idx} style={{ padding:"0.4rem 0.9rem", background:`${c.color}10`, border:`1px solid ${c.color}40`, borderRadius:"20px", fontSize:"0.85rem", color:c.color, fontWeight:600, fontFamily:"'JetBrains Mono',monospace" }}>{sk}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* EXCELLENCE */}
          <section id="excellence" data-observe style={{padding:"5rem 0"}}>
            <h2 style={{ fontSize:"clamp(2rem,4vw,3rem)", fontWeight:900, marginBottom:"4rem", textAlign:"center", fontFamily:"'Space Grotesk',sans-serif", letterSpacing:"-0.02em" }}>
              <span className="gradient-text">Beyond Technical Skills</span>
            </h2>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(320px,1fr))", gap:"2rem" }}>
              {technicalExcellence.map((t,i)=>(
                <div key={i} className={`glass-elite ${isVisible.excellence?'elite-reveal':''}`} style={{ padding:"2.5rem 2rem", animationDelay:`${i*0.15}s`, opacity:isVisible.excellence?1:0, borderColor:t.color }}>
                  <div style={{ width:"65px", height:"65px", margin:"0 auto 1.5rem", background:`${t.color}10`, border:`2px solid ${t.color}`, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", color:t.color, boxShadow:`0 0 30px ${t.color}40` }}>
                    <t.icon size={32}/>
                  </div>
                  <h3 style={{ fontSize:"1.3rem", fontWeight:800, color:t.color, marginBottom:"1rem", textAlign:"center", fontFamily:"'Space Grotesk',sans-serif" }}>{t.title}</h3>
                  <p style={{ fontSize:"1rem", lineHeight:1.7, color:"#b0b0b0", textAlign:"center", marginBottom:"1.5rem" }}>{t.description}</p>
                  <div style={{ display:"flex", flexWrap:"wrap", gap:"0.5rem", justifyContent:"center" }}>
                    {t.tags.map((tag,idx)=>(
                      <span key={idx} style={{ padding:"0.3rem 0.8rem", background:`${t.color}15`, border:`1px solid ${t.color}40`, borderRadius:"20px", fontSize:"0.75rem", color:t.color, fontWeight:600, fontFamily:"'JetBrains Mono',monospace" }}>{tag}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* EDUCATION */}
          <section id="education" data-observe style={{padding:"5rem 0"}}>
            <h2 style={{ fontSize:"clamp(2rem,4vw,3rem)", fontWeight:900, marginBottom:"4rem", textAlign:"center", fontFamily:"'Space Grotesk',sans-serif", letterSpacing:"-0.02em" }}>
              <span className="gradient-text">Journey to Excellence</span>
            </h2>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))", gap:"2rem", maxWidth:"1200px", margin:"0 auto" }}>
              {educationHighlights.map((e,i)=>(
                <div key={i} className={`glass-elite ${isVisible.education?'elite-reveal':''}`} style={{ padding:"2.5rem 2rem", animationDelay:`${i*0.15}s`, opacity:isVisible.education?1:0, textAlign:"center" }}>
                  <div style={{ width:"70px", height:"70px", margin:"0 auto 1.5rem", background:`${e.color}10`, border:`2px solid ${e.color}`, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", color:e.color, boxShadow:`0 0 30px ${e.color}40` }}>
                    <e.icon size={35}/>
                  </div>
                  <div style={{ fontSize:"1.8rem", fontWeight:900, color:e.color, marginBottom:"0.5rem", fontFamily:"'Space Grotesk',sans-serif" }}>{e.year}</div>
                  <h3 style={{ fontSize:"1.3rem", fontWeight:800, color:"#fff", marginBottom:"0.5rem", fontFamily:"'Space Grotesk',sans-serif" }}>{e.degree}</h3>
                  <div style={{ fontSize:"1rem", color:"#888", marginBottom:"0.5rem" }}>{e.institution}</div>
                  <div style={{ fontSize:"0.95rem", color:e.color, marginBottom:"1.5rem", fontWeight:600 }}>{e.focus}</div>
                  <div style={{ display:"flex", flexDirection:"column", gap:"0.5rem", alignItems:"center" }}>
                    {e.achievements.map((a,idx)=>(
                      <div key={idx} style={{ display:"flex", alignItems:"center", gap:"0.5rem", fontSize:"0.85rem", color:"#b0b0b0" }}>
                        <CheckCircle size={14} style={{color:e.color}}/>{a}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section style={{padding:"6rem 0 8rem"}}>
            <div className="glass-elite" style={{ padding:"5rem 3rem", maxWidth:"1000px", margin:"0 auto", textAlign:"center", borderColor:"rgba(0,245,255,0.3)" }}>
              <div style={{ display:"inline-flex", alignItems:"center", gap:"0.6rem", background:"rgba(0,245,255,0.1)", border:"1px solid rgba(0,245,255,0.3)", borderRadius:"30px", padding:"0.6rem 1.2rem", marginBottom:"2rem", fontFamily:"'JetBrains Mono',monospace", fontSize:"0.85rem", color:"#00f5ff", fontWeight:600 }}>
                <Flame size={16}/>READY TO CONTRIBUTE • 2026 GRADUATE
              </div>
              <h2 style={{ fontSize:"clamp(2rem,4vw,3rem)", fontWeight:900, marginBottom:"1.5rem", fontFamily:"'Space Grotesk',sans-serif", letterSpacing:"-0.02em" }}>
                <span className="gradient-text">Let's Build the Future Together</span>
              </h2>
              <p style={{ fontSize:"1.15rem", color:"#b0b0b0", marginBottom:"3rem", lineHeight:1.8, maxWidth:"750px", marginLeft:"auto", marginRight:"auto" }}>
                Seeking full-time opportunities at <strong style={{color:'#00f5ff'}}>FAANG</strong> or <strong style={{color:'#0077ff'}}>top MNC companies</strong>. Ready to contribute from day one with strong fundamentals in <strong style={{color:'#a855f7'}}>AI/ML</strong>, <strong style={{color:'#22c55e'}}>Full-Stack Development</strong>, and <strong style={{color:'#FF9900'}}>Cloud Computing</strong>.
              </p>
              <div style={{ display:"flex", gap:"1.5rem", justifyContent:"center", flexWrap:"wrap", marginBottom:"3rem" }}>
                <a href="mailto:g.sivasatyasaibhagavan@gmail.com" className="btn-primary-elite">
                  <Mail size={20}/>START CONVERSATION
                </a>
                <button onClick={()=>handleNavigation('/projects')} className="btn-outline-elite" style={{color:"#a855f7"}}>
                  <Eye size={20}/>VIEW PORTFOLIO
                </button>
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))", gap:"1rem", marginTop:"3rem", paddingTop:"2rem", borderTop:"1px solid rgba(255,255,255,0.1)" }}>
                {quickLinks.map((l,i)=>(
                  <button key={i} onClick={()=>handleNavigation(l.path)} style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:"0.5rem", padding:"0.9rem 1.2rem", background:"rgba(255,255,255,0.03)", border:`1px solid ${l.color}40`, borderRadius:"10px", color:l.color, fontSize:"0.85rem", fontWeight:600, cursor:"pointer", transition:"all 0.3s cubic-bezier(0.16,1,0.3,1)", fontFamily:"'Space Grotesk',sans-serif" }}
                    onMouseEnter={e=>{ e.currentTarget.style.background=`${l.color}20`; e.currentTarget.style.borderColor=l.color; e.currentTarget.style.transform="translateY(-3px)"; e.currentTarget.style.boxShadow=`0 10px 30px ${l.color}40`; }}
                    onMouseLeave={e=>{ e.currentTarget.style.background="rgba(255,255,255,0.03)"; e.currentTarget.style.borderColor=`${l.color}40`; e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="none"; }}>
                    <l.icon size={16}/>{l.label}
                  </button>
                ))}
              </div>
              <div style={{ marginTop:"2rem", fontSize:"0.9rem", color:"#00f5ff", fontFamily:"'JetBrains Mono',monospace", display:"flex", justifyContent:"center", alignItems:"center", gap:"0.5rem" }}>
                <CheckCircle size={16}/>OPEN TO FULL-TIME OPPORTUNITIES • CLASS OF 2026
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}