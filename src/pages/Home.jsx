"use client";

import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import profileImg from "../assets/profile.jpeg";
import resumePdf from "../assets/bhagavanresume.pdf";

import { 
  Terminal, Download, Github, Linkedin, Mail, Phone, ChevronRight,
  Cpu, Database, Globe, Star, Brain, Code, Zap, Cloud, Layers, Server,
  Award, TrendingUp, Briefcase, Target, Rocket, Activity, Eye, Sparkles,
  Film, Play, ArrowRight, CheckCircle, Flame, Lightbulb, Shield, Users,
  BarChart3, GitBranch, BookOpen, Trophy, Calendar, ExternalLink, FileText,
  Code2, Box, Workflow, Maximize2, MessageSquare, Coffee, Headphones,
  Settings, Monitor, Smartphone
} from "lucide-react";

export default function ModernDeveloperHome() {
  const navigate = useNavigate();
  
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [typedText, setTypedText] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [skillProgress, setSkillProgress] = useState({});
  const [visibleSections, setVisibleSections] = useState(new Set());
  const [activeMetric, setActiveMetric] = useState(0);
  
  const canvasRef = useRef(null);
  const observerRef = useRef(null);

  const roles = useMemo(() => [
    "FULL-STACK",
    "AI/ML ENGINEER",
    "SOFTWARE ENGINEER",
    "CLOUD ARCHITECT"
  ], []);

  const metrics = useMemo(() => [
    { label: "Projects", value: "15+", icon: Rocket, color: "#00f5ff" },
    { label: "Certifications", value: "20+", icon: Award, color: "#a855f7" },
    { label: "Technologies", value: "30+", icon: Code2, color: "#22c55e" },
    { label: "Success Rate", value: "100%", icon: Target, color: "#ffd700" }
  ], []);

  const skills = useMemo(() => [
    { name: "AI & Machine Learning", level: 95, icon: Brain, color: "#a855f7" },
    { name: "Full-Stack Development", level: 93, icon: Code, color: "#00f5ff" },
    { name: "Cloud & DevOps", level: 90, icon: Cloud, color: "#FF9900" },
    { name: "Data Structures & Algorithms", level: 92, icon: Terminal, color: "#22c55e" },
    { name: "Database & Architecture", level: 88, icon: Database, color: "#ffd700" }
  ], []);

  // Optimized particle system
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { alpha: true });
    let particles = [];
    let animationId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
        this.size = Math.random() * 1.5 + 0.5;
        this.opacity = Math.random() * 0.3 + 0.1;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 245, 255, ${this.opacity})`;
        ctx.fill();
      }
    }

    for (let i = 0; i < 40; i++) particles.push(new Particle());

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => { p.update(); p.draw(); });
      animationId = requestAnimationFrame(animate);
    };

    animate();
    window.addEventListener('resize', resize);
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  // Typing effect
  useEffect(() => {
    const role = roles[roleIndex];
    let char = 0;
    
    const interval = setInterval(() => {
      if (char <= role.length) {
        setTypedText(role.slice(0, char));
        char++;
      } else {
        clearInterval(interval);
        setTimeout(() => setRoleIndex((prev) => (prev + 1) % roles.length), 1500);
      }
    }, 100);
    
    return () => clearInterval(interval);
  }, [roleIndex, roles]);

  // Scroll handler
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrolled = window.scrollY;
          const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
          setScrollProgress((scrolled / maxScroll) * 100);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Intersection Observer
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections(prev => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('[data-observe]').forEach(el => {
      observerRef.current?.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  // Skill animation
  useEffect(() => {
    if (visibleSections.has('skills')) {
      skills.forEach((skill, i) => {
        setTimeout(() => {
          setSkillProgress(prev => ({ ...prev, [skill.name]: skill.level }));
        }, 100 + i * 100);
      });
    }
  }, [visibleSections, skills]);

  const handleNavigation = useCallback((path) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [navigate]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&family=Rajdhani:wght@300;400;500;600;700&family=Orbitron:wght@400;500;600;700;800;900&family=Roboto+Mono:wght@400;500;600;700&display=swap');
        
        * { margin:0; padding:0; box-sizing:border-box; }
        
        body { 
          font-family:'Poppins',sans-serif; 
          background:#000; 
          color:#fff; 
          overflow-x:hidden;
          -webkit-font-smoothing:antialiased;
        }

        @keyframes fadeIn {
          from { opacity:0; transform:translateY(30px); }
          to { opacity:1; transform:translateY(0); }
        }

        @keyframes slideIn {
          from { opacity:0; transform:translateX(-50px); }
          to { opacity:1; transform:translateX(0); }
        }

        @keyframes scaleIn {
          from { opacity:0; transform:scale(0.9); }
          to { opacity:1; transform:scale(1); }
        }

        @keyframes glow {
          0%, 100% { box-shadow:0 0 15px currentColor; }
          50% { box-shadow:0 0 30px currentColor, 0 0 50px currentColor; }
        }

        @keyframes float {
          0%, 100% { transform:translateY(0); }
          50% { transform:translateY(-15px); }
        }

        @keyframes gradient-shift {
          0%, 100% { background-position:0% 50%; }
          50% { background-position:100% 50%; }
        }

        @keyframes cursor {
          0%, 50% { opacity:1; }
          51%, 100% { opacity:0; }
        }

        .glass {
          background:rgba(255,255,255,0.03);
          backdrop-filter:blur(20px);
          border:1px solid rgba(255,255,255,0.1);
          border-radius:20px;
          transition:all 0.4s cubic-bezier(0.16,1,0.3,1);
        }

        .glass:hover {
          background:rgba(255,255,255,0.05);
          border-color:rgba(0,245,255,0.3);
          transform:translateY(-5px);
          box-shadow:0 20px 50px rgba(0,0,0,0.5), 0 0 30px rgba(0,245,255,0.2);
        }

        .btn-primary {
          background:linear-gradient(135deg, #00f5ff, #00c4ff);
          border:none;
          color:#000;
          font-weight:700;
          padding:1rem 2rem;
          border-radius:10px;
          cursor:pointer;
          font-family:'Rajdhani',sans-serif;
          text-transform:uppercase;
          letter-spacing:1px;
          font-size:1rem;
          transition:all 0.3s;
          display:inline-flex;
          align-items:center;
          gap:0.5rem;
          text-decoration:none;
        }

        .btn-primary:hover {
          transform:translateY(-3px);
          box-shadow:0 10px 30px rgba(0,245,255,0.4);
        }

        .btn-outline {
          background:transparent;
          border:2px solid currentColor;
          color:currentColor;
          font-weight:600;
          padding:1rem 2rem;
          border-radius:10px;
          cursor:pointer;
          font-family:'Rajdhani',sans-serif;
          text-transform:uppercase;
          letter-spacing:1px;
          font-size:1rem;
          transition:all 0.3s;
          display:inline-flex;
          align-items:center;
          gap:0.5rem;
          text-decoration:none;
        }

        .btn-outline:hover {
          background:currentColor;
          color:#000;
          transform:translateY(-3px);
        }

        .gradient-text {
          background:linear-gradient(135deg, #00f5ff 0%, #a855f7 50%, #ff6b35 100%);
          background-size:200% 200%;
          -webkit-background-clip:text;
          -webkit-text-fill-color:transparent;
          animation:gradient-shift 3s ease infinite;
        }

        .fade-in { animation:fadeIn 0.8s cubic-bezier(0.16,1,0.3,1) forwards; opacity:0; }
        .slide-in { animation:slideIn 0.8s cubic-bezier(0.16,1,0.3,1) forwards; opacity:0; }
        .scale-in { animation:scaleIn 0.8s cubic-bezier(0.16,1,0.3,1) forwards; opacity:0; }

        .delay-1 { animation-delay:0.1s; }
        .delay-2 { animation-delay:0.2s; }
        .delay-3 { animation-delay:0.3s; }
        .delay-4 { animation-delay:0.4s; }
        .delay-5 { animation-delay:0.5s; }
        .delay-6 { animation-delay:0.6s; }
        .delay-7 { animation-delay:0.7s; }

        ::-webkit-scrollbar { width:8px; }
        ::-webkit-scrollbar-track { background:#000; }
        ::-webkit-scrollbar-thumb { background:linear-gradient(180deg, #00f5ff, #a855f7); border-radius:4px; }

        @media(max-width:1024px) {
          .hero-grid { grid-template-columns:1fr!important; gap:3rem!important; }
          .profile-card { order:-1; max-width:100%!important; }
        }

        @media(max-width:768px) {
          h1 { font-size:2.5rem!important; }
          .btn-primary, .btn-outline { padding:0.9rem 1.5rem!important; font-size:0.9rem!important; }
        }
      `}</style>

      <div style={{ 
        background:'#0a0a14', 
        minHeight:"100vh",
        position:"relative",
        overflow:"hidden"
      }}>
        
        {/* Progress Bar */}
        <div style={{
          position:"fixed",
          top:0,
          left:0,
          width:`${scrollProgress}%`,
          height:"3px",
          background:"linear-gradient(90deg, #00f5ff, #a855f7)",
          zIndex:10000,
          transition:"width 0.1s"
        }} />

        {/* Canvas */}
        <canvas 
          ref={canvasRef} 
          style={{ 
            position:'fixed', 
            inset:0, 
            pointerEvents:'none', 
            zIndex:1,
            opacity:0.5
          }} 
        />

        {/* Gradient Overlay */}
        <div style={{
          position:"fixed",
          inset:0,
          background:`
            radial-gradient(circle at 20% 80%, rgba(0,245,255,0.08) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(168,85,247,0.08) 0%, transparent 50%)
          `,
          pointerEvents:"none",
          zIndex:2
        }} />

        {/* Content */}
        <div style={{ 
          maxWidth:"1400px", 
          margin:"0 auto", 
          padding:"0 2rem", 
          position:"relative", 
          zIndex:10 
        }}>
          
          {/* HERO */}
          <section style={{ 
            minHeight:"100vh", 
            display:"grid", 
            gridTemplateColumns:"1.2fr 1fr", 
            gap:"5rem", 
            alignItems:"center",
            paddingTop:"5rem"
          }} className="hero-grid">
            
            <div>
              {/* Status */}
              <div className="fade-in delay-1" style={{
                display:"inline-flex",
                alignItems:"center",
                gap:"0.5rem",
                background:"rgba(0,245,255,0.1)",
                border:"1px solid rgba(0,245,255,0.3)",
                borderRadius:"30px",
                padding:"0.5rem 1rem",
                marginBottom:"2rem",
                fontFamily:"'Roboto Mono',monospace",
                fontSize:"0.8rem",
                fontWeight:600,
                color:"#00f5ff"
              }}>
                <Settings size={14} style={{ animation:"glow 2s ease-in-out infinite" }} />
                2026 GRADUATE
              </div>

              {/* Name */}
              <h1 className="fade-in delay-2" style={{
                fontSize:"clamp(2.5rem, 7vw, 5rem)",
                fontWeight:900,
                lineHeight:1.1,
                marginBottom:"1rem",
                fontFamily:"'Orbitron',sans-serif",
                letterSpacing:"-0.02em"
              }}>
                <span style={{ color:'#fff' }}>SIVA SATYA SAI</span>
                <br />
                <span className="gradient-text">BHAGAVAN</span>
              </h1>

              {/* Role */}
              <div className="fade-in delay-3" style={{
                fontSize:"clamp(1.2rem, 2.5vw, 1.8rem)",
                fontWeight:700,
                marginBottom:"1.5rem",
                fontFamily:"'Roboto Mono',monospace",
                color:"#00f5ff",
                minHeight:"2.5rem",
                display:"flex",
                alignItems:"center"
              }}>
                &lt; {typedText}
                <span style={{
                  width:'2px',
                  height:'1.2em',
                  background:'#00f5ff',
                  marginLeft:'8px',
                  animation:'cursor 1s step-end infinite'
                }} />
                &nbsp;/&gt;
              </div>

              {/* Description */}
              <p className="fade-in delay-4" style={{
                fontSize:"1.1rem",
                lineHeight:1.7,
                color:"#b0b0b0",
                maxWidth:"650px",
                marginBottom:"2rem"
              }}>
                Elite <span style={{ color:'#00f5ff', fontWeight:600 }}>AI/ML Engineer</span> and{' '}
                <span style={{ color:'#00f5ff', fontWeight:600 }}>Full-Stack Developer</span> with{' '}
                <strong style={{ color:'#fff' }}>3 industry internships</strong>,{' '}
                <strong style={{ color:'#fff' }}>20+ certifications</strong>, and{' '}
                <strong style={{ color:'#fff' }}>15+ production projects</strong>.
              </p>

              {/* Buttons */}
              <div className="fade-in delay-5" style={{
                display:"flex",
                gap:"1rem",
                marginBottom:"2rem",
                flexWrap:"wrap"
              }}>
                <button 
                  onClick={() => handleNavigation('/projects')} 
                  className="btn-primary"
                >
                  <Rocket size={18} />
                  VIEW PROJECTS
                </button>
                <a 
                  href={resumePdf} 
                  download="Bhagavan_Resume.pdf" 
                  className="btn-outline" 
                  style={{ color:"#00f5ff" }}
                >
                  <Download size={18} />
                  DOWNLOAD RESUME
                </a>
              </div>

              {/* Social */}
              <div className="fade-in delay-6" style={{
                display:"flex",
                gap:"1rem"
              }}>
                {[
                  { icon:Github, href:"https://github.com/bhagavan444", color:"#fff" },
                  { icon:Linkedin, href:"https://www.linkedin.com/in/gopalajosyula-siva-satya-sai-bhagavan-1624a027b/", color:"#00f5ff" },
                  { icon:Mail, href:"mailto:g.sivasatyasaibhagavan@gmail.com", color:"#a855f7" },
                  { icon:Phone, href:"tel:+917569205626", color:"#22c55e" }
                ].map((social, i) => (
                  <a
                    key={i}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      width:"48px",
                      height:"48px",
                      background:"rgba(0,0,0,0.5)",
                      border:`2px solid ${social.color}`,
                      borderRadius:"50%",
                      display:"flex",
                      alignItems:"center",
                      justifyContent:"center",
                      color:social.color,
                      transition:"all 0.3s",
                      textDecoration:"none"
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = social.color;
                      e.currentTarget.style.color = "#000";
                      e.currentTarget.style.transform = "scale(1.2) translateY(-5px)";
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = "rgba(0,0,0,0.5)";
                      e.currentTarget.style.color = social.color;
                      e.currentTarget.style.transform = "scale(1) translateY(0)";
                    }}
                  >
                    <social.icon size={20} />
                  </a>
                ))}
              </div>
            </div>

            {/* Profile Card */}
            <div className="profile-card scale-in delay-4" style={{
              position:"relative",
              maxWidth:"450px",
              margin:"0 auto"
            }}>
              <div style={{
                position:"relative",
                aspectRatio:"4/5",
                animation:"float 6s ease-in-out infinite"
              }}>
                {/* Corners */}
                {[
                  { top:"-10px", left:"-10px", borderTop:"3px solid #00f5ff", borderLeft:"3px solid #00f5ff" },
                  { top:"-10px", right:"-10px", borderTop:"3px solid #a855f7", borderRight:"3px solid #a855f7" },
                  { bottom:"-10px", left:"-10px", borderBottom:"3px solid #22c55e", borderLeft:"3px solid #22c55e" },
                  { bottom:"-10px", right:"-10px", borderBottom:"3px solid #ffd700", borderRight:"3px solid #ffd700" }
                ].map((c, i) => (
                  <div key={i} style={{
                    position:"absolute",
                    width:"30px",
                    height:"30px",
                    ...c
                  }} />
                ))}

                {/* Image */}
                <div style={{
                  position:"relative",
                  width:"100%",
                  height:"100%",
                  borderRadius:"20px",
                  overflow:"hidden",
                  border:"2px solid rgba(0,245,255,0.4)",
                  boxShadow:"0 0 50px rgba(0,245,255,0.3)"
                }}>
                  <img src={profileImg} alt="Profile" style={{
                    width:"100%",
                    height:"100%",
                    objectFit:"cover"
                  }} />

                  <div style={{
                    position:"absolute",
                    inset:0,
                    background:"linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 60%)"
                  }} />

                  {/* Badges */}
                  {[
                    { icon:Brain, label:"AI", color:"#a855f7", pos:{ top:"15px", left:"15px" } },
                    { icon:Code, label:"Code", color:"#00f5ff", pos:{ top:"15px", right:"15px" } },
                    { icon:Database, label:"DB", color:"#22c55e", pos:{ bottom:"80px", left:"15px" } },
                    { icon:Cloud, label:"Cloud", color:"#FF9900", pos:{ bottom:"80px", right:"15px" } }
                  ].map((b, i) => (
                    <div key={i} style={{
                      position:"absolute",
                      ...b.pos,
                      width:"50px",
                      height:"50px",
                      background:"rgba(0,0,0,0.8)",
                      border:`2px solid ${b.color}`,
                      borderRadius:"10px",
                      display:"flex",
                      alignItems:"center",
                      justifyContent:"center",
                      color:b.color
                    }}>
                      <b.icon size={24} />
                    </div>
                  ))}

                  {/* Bottom */}
                  <div style={{
                    position:"absolute",
                    bottom:0,
                    left:0,
                    right:0,
                    background:"rgba(0,0,0,0.9)",
                    borderTop:"2px solid #00f5ff",
                    padding:"1rem"
                  }}>
                    <div style={{
                      display:"flex",
                      justifyContent:"space-between",
                      alignItems:"center",
                      marginBottom:"0.75rem"
                    }}>
                      <div style={{
                        fontSize:"0.85rem",
                        color:"#00f5ff",
                        fontWeight:700,
                        fontFamily:"'Roboto Mono',monospace"
                      }}>
                        2026 GRADUATE
                      </div>
                      <div style={{ display:"flex", gap:"0.5rem" }}>
                        {["AI", "Web", "Cloud"].map((t, i) => (
                          <span key={i} style={{
                            padding:"0.25rem 0.6rem",
                            background:"rgba(0,245,255,0.2)",
                            border:"1px solid #00f5ff",
                            borderRadius:"5px",
                            fontSize:"0.7rem",
                            color:"#00f5ff",
                            fontWeight:700
                          }}>
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                    <a href="mailto:g.sivasatyasaibhagavan@gmail.com" style={{
                      display:"flex",
                      alignItems:"center",
                      justifyContent:"center",
                      gap:"0.5rem",
                      padding:"0.75rem",
                      background:"linear-gradient(135deg, #00f5ff, #00c4ff)",
                      borderRadius:"8px",
                      color:"#000",
                      fontWeight:700,
                      fontSize:"0.85rem",
                      textDecoration:"none",
                      transition:"all 0.3s"
                    }}
                    onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
                    onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}>
                      <Mail size={16} />
                      LET'S COLLABORATE
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* METRICS */}
          <section id="metrics" data-observe style={{ padding:"4rem 0" }}>
            <div style={{
              display:"grid",
              gridTemplateColumns:"repeat(auto-fit, minmax(250px, 1fr))",
              gap:"2rem"
            }}>
              {metrics.map((m, i) => (
                <div key={i} className={`glass ${visibleSections.has('metrics') ? 'fade-in' : ''}`} style={{
                  padding:"2rem",
                  textAlign:"center",
                  animationDelay:`${i * 0.1}s`,
                  opacity:visibleSections.has('metrics') ? 1 : 0
                }}>
                  <div style={{
                    width:"60px",
                    height:"60px",
                    margin:"0 auto 1rem",
                    background:`${m.color}20`,
                    border:`2px solid ${m.color}`,
                    borderRadius:"50%",
                    display:"flex",
                    alignItems:"center",
                    justifyContent:"center",
                    color:m.color
                  }}>
                    <m.icon size={28} />
                  </div>
                  <div style={{
                    fontSize:"2.5rem",
                    fontWeight:900,
                    color:m.color,
                    marginBottom:"0.5rem",
                    fontFamily:"'Orbitron',sans-serif"
                  }}>
                    {m.value}
                  </div>
                  <div style={{
                    fontSize:"1rem",
                    fontWeight:600,
                    color:"#fff",
                    textTransform:"uppercase",
                    fontFamily:"'Rajdhani',sans-serif"
                  }}>
                    {m.label}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* SKILLS */}
          <section id="skills" data-observe style={{ padding:"4rem 0" }}>
            <h2 style={{
              fontSize:"clamp(2rem, 4vw, 3rem)",
              fontWeight:900,
              marginBottom:"3rem",
              textAlign:"center",
              fontFamily:"'Orbitron',sans-serif"
            }}>
              <span className="gradient-text">Technical Skills</span>
            </h2>

            <div style={{
              maxWidth:"1000px",
              margin:"0 auto",
              display:"flex",
              flexDirection:"column",
              gap:"2rem"
            }}>
              {skills.map((s, i) => (
                <div key={i} className={`glass ${visibleSections.has('skills') ? 'slide-in' : ''}`} style={{
                  padding:"2rem",
                  opacity:visibleSections.has('skills') ? 1 : 0,
                  animationDelay:`${i * 0.1}s`
                }}>
                  <div style={{
                    display:"flex",
                    alignItems:"center",
                    gap:"1rem",
                    marginBottom:"1rem"
                  }}>
                    <div style={{
                      width:"50px",
                      height:"50px",
                      background:`${s.color}20`,
                      border:`2px solid ${s.color}`,
                      borderRadius:"10px",
                      display:"flex",
                      alignItems:"center",
                      justifyContent:"center",
                      color:s.color
                    }}>
                      <s.icon size={24} />
                    </div>
                    <div style={{ flex:1 }}>
                      <div style={{
                        display:"flex",
                        justifyContent:"space-between",
                        marginBottom:"0.5rem"
                      }}>
                        <span style={{
                          fontSize:"1.1rem",
                          fontWeight:700,
                          color:"#fff",
                          fontFamily:"'Rajdhani',sans-serif"
                        }}>
                          {s.name}
                        </span>
                        <span style={{
                          fontFamily:"'Roboto Mono',monospace",
                          fontSize:"1rem",
                          color:s.color,
                          fontWeight:700
                        }}>
                          {skillProgress[s.name] || 0}%
                        </span>
                      </div>
                      <div style={{
                        height:"8px",
                        background:"rgba(255,255,255,0.05)",
                        borderRadius:"10px",
                        overflow:"hidden"
                      }}>
                        <div style={{
                          width:`${skillProgress[s.name] || 0}%`,
                          height:"100%",
                          background:s.color,
                          borderRadius:"10px",
                          transition:"width 2s cubic-bezier(0.16,1,0.3,1)"
                        }} />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section style={{ padding:"5rem 0 7rem" }}>
            <div className="glass" style={{
              padding:"4rem 3rem",
              maxWidth:"900px",
              margin:"0 auto",
              textAlign:"center"
            }}>
              <h2 style={{
                fontSize:"clamp(2rem, 4vw, 3rem)",
                fontWeight:900,
                marginBottom:"1.5rem",
                fontFamily:"'Orbitron',sans-serif"
              }}>
                <span className="gradient-text">Let's Collaborate</span>
              </h2>
              <p style={{
                fontSize:"1.1rem",
                color:"#b0b0b0",
                marginBottom:"2.5rem",
                maxWidth:"700px",
                margin:"0 auto 2.5rem"
              }}>
                Open to full-time opportunities at top tech companies. Ready to contribute from day one.
              </p>
              <div style={{
                display:"flex",
                gap:"1.5rem",
                justifyContent:"center",
                flexWrap:"wrap"
              }}>
                <a href="mailto:g.sivasatyasaibhagavan@gmail.com" className="btn-primary">
                  <Mail size={20} />
                  GET IN TOUCH
                </a>
                <button onClick={() => handleNavigation('/projects')} className="btn-outline" style={{ color:"#a855f7" }}>
                  <Eye size={20} />
                  VIEW PORTFOLIO
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}