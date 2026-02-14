"use client";

import React, { useState, useEffect, useRef } from "react";

/* ═══════════════════════════════════════════════════════════════
   DESIGN TOKENS — Professional with Motion
═══════════════════════════════════════════════════════════════ */
const C = {
  bg:      "#ffffff",
  surface: "#fafafa",
  raised:  "#f5f5f5",
  border:  "#e5e5e5",
  border2: "#d4d4d4",
  text:    "#0a0a0a",
  text2:   "#262626",
  text3:   "#525252",
  text4:   "#737373",
  text5:   "#a3a3a3",
  accent:  "#0a0a0a",
  accentSoft: "#f5f5f5",
};

/* ═══════════════════════════════════════════════════════════════
   GLOBAL CSS — With Advanced Animations
═══════════════════════════════════════════════════════════════ */
const GCSS = `
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:wght@600;700&family=Inter:wght@400;500;600;700&display=swap');

  *, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }
  html { scroll-behavior:smooth; overflow-x:hidden; }
  body {
    font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif;
    background:${C.bg}; color:${C.text};
    -webkit-font-smoothing:antialiased;
    -moz-osx-font-smoothing:grayscale;
    overflow-x:hidden;
  }
  
  ::selection { background:#f5f5f5; color:${C.text}; }
  ::-webkit-scrollbar { width:4px; }
  ::-webkit-scrollbar-track { background:${C.bg}; }
  ::-webkit-scrollbar-thumb { background:${C.border2}; border-radius:2px; }
  ::-webkit-scrollbar-thumb:hover { background:${C.text4}; }

  @keyframes fadeUp {
    from { opacity:0; transform:translateY(20px); }
    to   { opacity:1; transform:translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity:0; }
    to   { opacity:1; }
  }
  @keyframes marquee {
    from { transform:translateX(0); }
    to   { transform:translateX(-50%); }
  }
  @keyframes marqueeReverse {
    from { transform:translateX(-50%); }
    to   { transform:translateX(0); }
  }
  @keyframes float {
    0%, 100% { transform:translateY(0px); }
    50% { transform:translateY(-15px); }
  }
  @keyframes rotate {
    from { transform:rotate(0deg); }
    to   { transform:rotate(360deg); }
  }
  @keyframes scaleIn {
    from { transform:scale(0.95); opacity:0; }
    to   { transform:scale(1); opacity:1; }
  }
  @keyframes slideRight {
    from { transform:translateX(-20px); opacity:0; }
    to   { transform:translateX(0); opacity:1; }
  }
  @keyframes pulse {
    0%, 100% { opacity:1; }
    50% { opacity:0.5; }
  }
  @keyframes glow {
    0%, 100% { box-shadow:0 0 5px rgba(10,10,10,0.1); }
    50% { box-shadow:0 0 20px rgba(10,10,10,0.2); }
  }
  @keyframes shimmer {
    0% { background-position:-1000px 0; }
    100% { background-position:1000px 0; }
  }
  @keyframes orbit {
    0% { transform:rotate(0deg) translateX(100px) rotate(0deg); }
    100% { transform:rotate(360deg) translateX(100px) rotate(-360deg); }
  }
  @keyframes blob {
    0%, 100% { border-radius:60% 40% 30% 70% / 60% 30% 70% 40%; }
    25% { border-radius:30% 60% 70% 40% / 50% 60% 30% 60%; }
    50% { border-radius:50% 60% 30% 60% / 30% 60% 70% 40%; }
    75% { border-radius:60% 40% 60% 40% / 70% 30% 50% 60%; }
  }

  .marquee-container {
    display:flex;
    width:max-content;
    animation:marquee 30s linear infinite;
  }
  .marquee-container:hover {
    animation-play-state:paused;
  }
  .marquee-reverse {
    animation:marqueeReverse 35s linear infinite;
  }

  .floating-icon {
    animation:float 6s ease-in-out infinite;
  }

  .tech-icon {
    transition:all 0.3s cubic-bezier(0.16,1,0.3,1);
  }
  .tech-icon:hover {
    transform:translateY(-5px) scale(1.1);
    filter:grayscale(0) !important;
  }

  /* Mobile Optimizations */
  @media (max-width: 1024px) {
    .main-container {
      padding: 120px 24px 60px !important;
    }
    .hero-section {
      margin-bottom: 80px !important;
    }
    .btech-grid {
      grid-template-columns: 1fr !important;
      gap: 32px !important;
    }
    .hero-stats {
      grid-template-columns: 1fr !important;
      gap: 20px !important;
    }
    .tech-marquee-section {
      padding: 2rem 0 !important;
    }
    .floating-objects {
      display:none !important;
    }
  }

  @media (max-width: 768px) {
    .main-container {
      padding: 100px 20px 40px !important;
    }
    .hero-title {
      font-size: clamp(36px, 10vw, 56px) !important;
      line-height: 1.1 !important;
      margin-bottom: 20px !important;
    }
    .hero-description {
      font-size: 16px !important;
      margin-bottom: 40px !important;
    }
    .hero-stats {
      padding-top: 24px !important;
      gap: 16px !important;
    }
    .section-label {
      font-size: 10px !important;
    }
    .btech-card {
      padding: 28px 20px !important;
    }
    .btech-title {
      font-size: clamp(28px, 7vw, 36px) !important;
      margin-bottom: 16px !important;
    }
    .cert-thumbnail {
      height: 180px !important;
    }
    .outcomes-grid {
      gap: 20px !important;
    }
    .outcome-item {
      padding: 16px !important;
    }
    .coursework-grid {
      grid-template-columns: 1fr 1fr !important;
      gap: 8px !important;
    }
    .timeline-item {
      grid-template-columns: 1fr !important;
      padding: 20px !important;
      gap: 20px !important;
    }
    .timeline-cert {
      height: 140px !important;
    }
    .drawer-content {
      width: 100vw !important;
      border-radius: 0 !important;
    }
    .drawer-header {
      padding: 20px !important;
    }
    .drawer-body {
      padding: 24px 20px !important;
    }
    .footer-grid {
      grid-template-columns: 1fr !important;
      gap: 40px !important;
    }
    .footer-main {
      padding: 60px 0 40px !important;
    }
    .tech-icon-wrapper {
      margin: 0 1rem !important;
    }
    .tech-icon {
      width: 32px !important;
      height: 32px !important;
    }
    .tech-label {
      font-size: 10px !important;
    }
  }

  @media (max-width: 480px) {
    .hero-title {
      font-size: 32px !important;
    }
    .hero-description {
      font-size: 15px !important;
    }
    .coursework-grid {
      grid-template-columns: 1fr !important;
    }
    .stat-value {
      font-size: 14px !important;
    }
    .stat-label {
      font-size: 10px !important;
    }
    .tech-icon-wrapper {
      margin: 0 0.8rem !important;
    }
    .tech-icon {
      width: 28px !important;
      height: 28px !important;
    }
  }
`;

/* ═══════════════════════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════════════════════ */
const EDU = [
  {
    id:"btech",
    level:"Undergraduate Degree",
    degree:"B.Tech in Artificial Intelligence & Data Science",
    institution:"Ramachandra College of Engineering",
    affiliation:"JNTUK",
    duration:"2022 – 2026",
    score:"7.9 CGPA",
    location:"Eluru, Andhra Pradesh",
    status:"current",
    certId:"1wxnzvsS3MA7xWSxuXKeIkS8GaQoG4Y1a",

    synopsis:"Comprehensive AI and Data Science program with focus on production machine learning, full-stack development, and system design. Academic foundation strengthened through three industry internships and 8+ deployed production projects.",

    outcomes:[
      { label:"Industry Experience", detail:"3 internships (MERN Stack, AI/ML, Data Science) at StudyOwl, SmartBridge, Blackbucks" },
      { label:"Production Systems", detail:"Built 8 deployed applications including ATS Resume Builder, AI Chatbot, Career Recommender" },
      { label:"Professional Certifications", detail:"20+ credentials from AWS, Google AI, IBM, Microsoft — applied in project work" },
      { label:"Technical Leadership", detail:"Led hackathon team to 1st place national (200+ teams), ₹50,000 prize" },
    ],

    coursework:["Machine Learning","Deep Learning","Computer Vision","Natural Language Processing","Data Structures & Algorithms","Database Management","Full-Stack Web Development","Cloud Computing","Software Engineering","Statistics & Probability"],
  },
  {
    id:"inter",
    level:"Pre-University",
    degree:"Intermediate — MPC Stream",
    stream:"Mathematics, Physics, Chemistry",
    institution:"Srividhya Junior College",
    duration:"2020 – 2022",
    score:"7.8 CGPA",
    location:"Gudivada, Andhra Pradesh",
    status:"completed",
    certId:"1N1K1j6QGrgNPNL2D9UmfJAL2PVSulhPJ",

    synopsis:"Pre-engineering foundation with focus on advanced mathematics, physics, and analytical problem-solving.",
    outcomes:[
      { label:"Mathematics foundation for ML optimization and algorithms" },
      { label:"Physics principles applied to computational modeling" },
    ],
  },
  {
    id:"ssc",
    level:"Secondary School",
    degree:"SSC Board Examination",
    institution:"Montessori English Medium High School",
    duration:"2019 – 2020",
    score:"9.5 GPA",
    location:"Gudivada, Andhra Pradesh",
    status:"completed",
    certId:"1p1RXnVn9jySamu8OiIWF0WFhe7G6QxiL",

    synopsis:"Secondary education completed with distinction. Perfect score in Mathematics.",
    outcomes:[
      { label:"9.5 GPA — Top academic performance" },
      { label:"100/100 in Mathematics" },
    ],
  },
];

// Tech stack with dev icons
const TECH_STACK = [
  { name:"Python", icon:"python" },
  { name:"JavaScript", icon:"javascript" },
  { name:"React", icon:"react" },
  { name:"Node.js", icon:"nodejs" },
  { name:"TensorFlow", icon:"tensorflow" },
  { name:"MongoDB", icon:"mongodb" },
  { name:"Express", icon:"express" },
  { name:"Flask", icon:"flask" },
  { name:"Git", icon:"git" },
  { name:"Docker", icon:"docker" },
  { name:"AWS", icon:"amazonwebservices" },
  { name:"MySQL", icon:"mysql" },
  { name:"PostgreSQL", icon:"postgresql" },
  { name:"VSCode", icon:"vscode" },
];

const thumbUrl  = (id) => `https://lh3.googleusercontent.com/d/${id}`;
const driveUrl  = (id) => `https://drive.google.com/file/d/${id}/view`;

/* ═══════════════════════════════════════════════════════════════
   HOOKS & UTILITY COMPONENTS
═══════════════════════════════════════════════════════════════ */
function useInView(thresh = 0.1) {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { 
      if (e.isIntersecting) setV(true); 
    }, { threshold:thresh });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [thresh]);
  return [ref, v];
}

function ScrollBar() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const fn = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setP((window.scrollY / max) * 100);
    };
    window.addEventListener("scroll", fn, { passive:true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <div style={{ position:"fixed",top:0,left:0,right:0,height:"2px",background:C.border,zIndex:9999 }}>
      <div style={{ height:"100%",width:`${p}%`,background:C.accent,transition:"width 0.1s linear" }} />
    </div>
  );
}

function FloatingObjects() {
  return (
    <div className="floating-objects" style={{ 
      position:"absolute", 
      inset:0, 
      pointerEvents:"none",
      overflow:"hidden",
      zIndex:0
    }}>
      <div style={{ 
        position:"absolute", 
        top:"10%", 
        right:"8%",
        width:"80px",
        height:"80px",
        borderRadius:"50%",
        background:"rgba(10,10,10,0.02)",
        animation:"float 8s ease-in-out infinite"
      }} />
      <div style={{ 
        position:"absolute", 
        top:"25%", 
        left:"5%",
        width:"60px",
        height:"60px",
        borderRadius:"12px",
        background:"rgba(10,10,10,0.015)",
        animation:"float 10s ease-in-out infinite 1s"
      }} />
      <div style={{ 
        position:"absolute", 
        bottom:"20%", 
        right:"12%",
        width:"100px",
        height:"100px",
        borderRadius:"50%",
        background:"rgba(10,10,10,0.01)",
        animation:"float 12s ease-in-out infinite 2s"
      }} />
      <div style={{ 
        position:"absolute",
        top:"50%",
        left:"50%",
        width:"200px",
        height:"200px",
        marginLeft:"-100px",
        marginTop:"-100px"
      }}>
        <div style={{
          position:"absolute",
          top:"50%",
          left:"50%",
          width:"8px",
          height:"8px",
          marginLeft:"-4px",
          marginTop:"-4px",
          borderRadius:"50%",
          background:"rgba(10,10,10,0.08)",
          animation:"orbit 20s linear infinite"
        }} />
      </div>
    </div>
  );
}

function TechMarquee({ reverse = false }) {
  return (
    <div style={{ 
      width:"100%", 
      overflow:"hidden",
      background:C.text,
      padding:"2.5rem 0",
      borderTop:`1px solid rgba(255,255,255,0.1)`,
      borderBottom:`1px solid rgba(255,255,255,0.1)`
    }}>
      <div className={reverse ? "marquee-container marquee-reverse" : "marquee-container"}>
        {[...Array(3)].map((_, setIdx) => 
          TECH_STACK.map((tech, i) => (
            <div 
              key={`${setIdx}-${i}`}
              className="tech-icon-wrapper"
              style={{ 
                display:"inline-flex",
                flexDirection:"column",
                alignItems:"center",
                gap:"0.8rem",
                margin:"0 1.5rem",
                minWidth:"80px"
              }}
            >
              <img 
                src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${tech.icon}/${tech.icon}-original.svg`}
                alt={tech.name}
                className="tech-icon"
                style={{ 
                  width:"40px",
                  height:"40px",
                  filter:"invert(1) opacity(0.4)",
                  transition:"all 0.3s cubic-bezier(0.16,1,0.3,1)"
                }}
                onMouseEnter={e => e.currentTarget.style.filter = "invert(1) opacity(0.9)"}
                onMouseLeave={e => e.currentTarget.style.filter = "invert(1) opacity(0.4)"}
              />
              <span 
                className="tech-label"
                style={{ 
                  fontSize:"11px",
                  color:"rgba(255,255,255,0.3)",
                  letterSpacing:"0.05em",
                  textTransform:"uppercase",
                  fontWeight:600,
                  whiteSpace:"nowrap"
                }}
              >
                {tech.name}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function CertThumb({ edu, height="240px", onClick }) {
  const [loaded, setLoaded] = useState(false);
  const [err, setErr] = useState(false);

  return (
    <div 
      onClick={onClick}
      className="cert-thumbnail"
      style={{ 
        position:"relative", 
        height, 
        borderRadius:"8px", 
        overflow:"hidden",
        background:C.raised, 
        border:`1px solid ${C.border}`,
        cursor: onClick ? "pointer" : "default",
        transition:"all 0.3s cubic-bezier(0.16,1,0.3,1)",
      }}
      onMouseEnter={e => onClick && (e.currentTarget.style.borderColor = C.border2, e.currentTarget.style.transform = "translateY(-2px)")}
      onMouseLeave={e => onClick && (e.currentTarget.style.borderColor = C.border, e.currentTarget.style.transform = "translateY(0)")}
    >
      {!err ? (
        <img 
          src={thumbUrl(edu.certId)} 
          alt={`${edu.degree} certificate`}
          onLoad={() => setLoaded(true)} 
          onError={() => setErr(true)}
          style={{ 
            width:"100%", 
            height:"100%", 
            objectFit:"cover", 
            display:"block",
            opacity: loaded ? 1 : 0, 
            transition:"opacity 0.4s ease" 
          }} 
        />
      ) : (
        <div style={{ 
          width:"100%", 
          height:"100%", 
          display:"flex", 
          flexDirection:"column",
          alignItems:"center", 
          justifyContent:"center", 
          gap:"8px" 
        }}>
          <span style={{ fontSize:"32px", color:C.text5 }}>📜</span>
          <span style={{ fontSize:"11px", color:C.text4, textTransform:"uppercase", letterSpacing:"0.1em" }}>
            Certificate
          </span>
        </div>
      )}

      {edu.status === "current" && (
        <div className="floating-icon" style={{ 
          position:"absolute", 
          top:"12px", 
          right:"12px",
          display:"flex", 
          alignItems:"center", 
          gap:"6px",
          padding:"6px 12px", 
          borderRadius:"4px",
          background:"rgba(255,255,255,0.95)", 
          border:`1px solid ${C.border}`,
          boxShadow:"0 2px 8px rgba(0,0,0,0.06)"
        }}>
          <div style={{ 
            width:"6px", 
            height:"6px", 
            borderRadius:"50%", 
            background:C.accent,
            animation:"pulse 2s ease-in-out infinite"
          }} />
          <span style={{ 
            fontSize:"10px", 
            letterSpacing:"0.08em", 
            color:C.text3, 
            textTransform:"uppercase", 
            fontWeight:600 
          }}>
            Active
          </span>
        </div>
      )}

      {onClick && (
        <div style={{ position:"absolute", bottom:"12px", right:"12px" }}>
          <a 
            href={driveUrl(edu.certId)} 
            target="_blank" 
            rel="noopener noreferrer"
            onClick={e => e.stopPropagation()}
            style={{ 
              display:"inline-flex", 
              alignItems:"center", 
              gap:"6px",
              padding:"8px 14px", 
              borderRadius:"4px",
              background:"rgba(255,255,255,0.95)", 
              border:`1px solid ${C.border}`,
              color:C.text3, 
              fontSize:"11px",
              letterSpacing:"0.05em", 
              textDecoration:"none",
              transition:"all 0.25s cubic-bezier(0.16,1,0.3,1)", 
              fontWeight:600,
              boxShadow:"0 2px 8px rgba(0,0,0,0.06)"
            }}
            onMouseEnter={e => { 
              e.currentTarget.style.background = C.bg;
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.color = C.text; 
            }}
            onMouseLeave={e => { 
              e.currentTarget.style.background = "rgba(255,255,255,0.95)";
              e.currentTarget.style.transform = "translateY(0)"; 
              e.currentTarget.style.color = C.text3; 
            }}
          >
            VIEW ↗
          </a>
        </div>
      )}
    </div>
  );
}

function Drawer({ edu, onClose }) {
  const [open, setOpen] = useState(false);
  
  useEffect(() => {
    const raf = requestAnimationFrame(() => setOpen(true));
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    
    return () => { 
      cancelAnimationFrame(raf); 
      document.removeEventListener("keydown", onKey); 
      document.body.style.overflow = ""; 
    };
  }, [onClose]);

  return (
    <div 
      onClick={onClose} 
      style={{
        position:"fixed", 
        inset:0, 
        zIndex:9000,
        background:"rgba(0,0,0,0.4)",
        backdropFilter:"blur(8px)",
        WebkitBackdropFilter:"blur(8px)",
        opacity: open ? 1 : 0, 
        transition:"opacity 0.3s ease",
      }}
    >
      <div 
        onClick={e => e.stopPropagation()} 
        className="drawer-content"
        style={{
          position:"fixed", 
          top:0, 
          right:0, 
          bottom:0, 
          width:"min(520px,100vw)",
          background:C.bg,
          borderLeft:`1px solid ${C.border}`,
          display:"flex", 
          flexDirection:"column", 
          overflowY:"auto",
          transform: open ? "translateX(0)" : "translateX(100%)",
          transition:"transform 0.4s cubic-bezier(0.16,1,0.3,1)",
          boxShadow:"-8px 0 24px rgba(0,0,0,0.08)",
        }}
      >
        <div 
          className="drawer-header"
          style={{ 
            position:"sticky", 
            top:0, 
            zIndex:10, 
            background:C.bg,
            borderBottom:`1px solid ${C.border}`,
            padding:"28px 32px", 
            display:"flex", 
            alignItems:"flex-start", 
            justifyContent:"space-between", 
            gap:"16px" 
          }}
        >
          <div style={{ flex:1 }}>
            <span style={{ 
              fontSize:"11px", 
              letterSpacing:"0.1em", 
              textTransform:"uppercase",
              color:C.text4, 
              display:"block", 
              marginBottom:"8px",
              fontWeight:600
            }}>
              {edu.level}
            </span>
            <div style={{ 
              fontFamily:"'Fraunces',Georgia,serif", 
              fontSize:"24px", 
              fontWeight:700,
              color:C.text, 
              letterSpacing:"-0.02em", 
              lineHeight:1.2 
            }}>
              {edu.degree}
            </div>
          </div>
          <button 
            onClick={onClose} 
            style={{ 
              width:"36px", 
              height:"36px", 
              borderRadius:"6px",
              border:`1px solid ${C.border}`, 
              background:"transparent", 
              color:C.text4,
              cursor:"pointer", 
              fontSize:"20px", 
              display:"flex", 
              alignItems:"center",
              justifyContent:"center", 
              transition:"all 0.25s cubic-bezier(0.16,1,0.3,1)", 
              lineHeight:1, 
              flexShrink:0 
            }}
            onMouseEnter={e => { 
              e.currentTarget.style.background = C.surface; 
              e.currentTarget.style.color = C.text;
              e.currentTarget.style.transform = "rotate(90deg)";
            }}
            onMouseLeave={e => { 
              e.currentTarget.style.background = "transparent"; 
              e.currentTarget.style.color = C.text4;
              e.currentTarget.style.transform = "rotate(0deg)";
            }}
          >
            ×
          </button>
        </div>

        <div className="drawer-body" style={{ padding:"32px", display:"flex", flexDirection:"column", gap:"32px" }}>
          <CertThumb edu={edu} height="200px" />

          <div style={{ display:"flex", flexDirection:"column", gap:"16px" }}>
            {[
              ["Institution", edu.institution],
              ["Score", edu.score],
              ["Duration", edu.duration],
              ["Location", edu.location],
            ].map(([k,v]) => (
              <div key={k} style={{ paddingBottom:"16px", borderBottom:`1px solid ${C.border}` }}>
                <div style={{ 
                  fontSize:"11px", 
                  letterSpacing:"0.1em", 
                  textTransform:"uppercase",
                  color:C.text4, 
                  marginBottom:"6px",
                  fontWeight:600
                }}>
                  {k}
                </div>
                <div style={{ fontSize:"15px", fontWeight:600, color:C.text2, lineHeight:1.4 }}>
                  {v}
                </div>
              </div>
            ))}
          </div>

          <div style={{ 
            borderLeft:`3px solid ${C.accent}`, 
            paddingLeft:"16px",
            background:C.surface,
            padding:"16px",
            borderRadius:"4px"
          }}>
            <p style={{ fontSize:"15px", color:C.text3, lineHeight:1.7 }}>
              {edu.synopsis}
            </p>
          </div>

          <div>
            <div style={{ 
              fontSize:"11px", 
              letterSpacing:"0.1em", 
              textTransform:"uppercase",
              color:C.text4, 
              marginBottom:"16px",
              fontWeight:600
            }}>
              Key Outcomes
            </div>
            {edu.outcomes.map((o,i) => (
              <div 
                key={i} 
                style={{ 
                  display:"flex", 
                  gap:"12px", 
                  alignItems:"flex-start",
                  paddingBottom:"16px", 
                  marginBottom:"16px",
                  borderBottom: i < edu.outcomes.length - 1 ? `1px solid ${C.border}` : "none" 
                }}
              >
                <div style={{ 
                  width:"5px", 
                  height:"5px", 
                  borderRadius:"50%", 
                  background:C.accent,
                  flexShrink:0, 
                  marginTop:"7px" 
                }} />
                <div>
                  <div style={{ 
                    fontSize:"14px", 
                    fontWeight:600, 
                    color:C.text2, 
                    marginBottom:"4px", 
                    lineHeight:1.4 
                  }}>
                    {o.label}
                  </div>
                  {o.detail && (
                    <div style={{ fontSize:"13px", color:C.text4, lineHeight:1.6 }}>
                      {o.detail}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {edu.coursework && (
            <div>
              <div style={{ 
                fontSize:"11px", 
                letterSpacing:"0.1em", 
                textTransform:"uppercase",
                color:C.text4, 
                marginBottom:"12px",
                fontWeight:600
              }}>
                Core Coursework
              </div>
              <div style={{ display:"flex", flexWrap:"wrap", gap:"8px" }}>
                {edu.coursework.map(s => (
                  <span 
                    key={s} 
                    style={{
                      padding:"8px 14px", 
                      borderRadius:"4px",
                      background:C.surface, 
                      border:`1px solid ${C.border}`,
                      fontSize:"12px", 
                      color:C.text3,
                      fontWeight:500
                    }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          )}

          <a 
            href={driveUrl(edu.certId)} 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ 
              display:"flex", 
              alignItems:"center", 
              justifyContent:"center", 
              gap:"8px",
              padding:"16px", 
              borderRadius:"6px", 
              background:C.accent, 
              color:"#fff",
              textDecoration:"none", 
              fontSize:"13px", 
              letterSpacing:"0.05em", 
              transition:"all 0.3s cubic-bezier(0.16,1,0.3,1)", 
              fontWeight:600 
            }}
            onMouseEnter={e => { 
              e.currentTarget.style.background = C.text2;
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.15)";
            }}
            onMouseLeave={e => { 
              e.currentTarget.style.background = C.accent;
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            VIEW FULL CERTIFICATE ↗
          </a>
        </div>
      </div>
    </div>
  );
}

function BtechBlock({ edu, onOpen }) {
  const [ref, inView] = useInView(0.06);

  return (
    <div 
      ref={ref} 
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(20px)",
        transition:"opacity 0.6s cubic-bezier(0.16,1,0.3,1), transform 0.6s cubic-bezier(0.16,1,0.3,1)",
        marginBottom:"80px",
        position:"relative"
      }}
    >
      <FloatingObjects />
      
      <div style={{ display:"flex", alignItems:"center", gap:"12px", marginBottom:"24px", position:"relative", zIndex:1 }}>
        <div style={{ width:"32px", height:"2px", background:C.accent }} />
        <span className="section-label" style={{ 
          fontSize:"11px", 
          letterSpacing:"0.1em", 
          textTransform:"uppercase", 
          color:C.text4,
          fontWeight:600
        }}>
          {edu.level}
        </span>
        {edu.status === "current" && (
          <span className="floating-icon" style={{ 
            display:"inline-flex", 
            alignItems:"center", 
            gap:"6px", 
            padding:"6px 12px", 
            borderRadius:"4px",
            background:C.surface, 
            border:`1px solid ${C.border}` 
          }}>
            <div style={{ 
              width:"6px", 
              height:"6px", 
              borderRadius:"50%", 
              background:C.accent,
              animation:"pulse 2s ease-in-out infinite"
            }} />
            <span style={{ 
              fontSize:"10px", 
              color:C.text3, 
              letterSpacing:"0.08em", 
              fontWeight:600,
              textTransform:"uppercase"
            }}>
              In Progress
            </span>
          </span>
        )}
      </div>

      <div style={{ marginBottom:"40px", position:"relative", zIndex:1 }}>
        <div style={{ 
          fontSize:"13px", 
          color:C.text4, 
          marginBottom:"12px",
          fontWeight:500
        }}>
          {edu.duration} · {edu.institution}
        </div>
        <h2 className="btech-title" style={{ 
          fontFamily:"'Fraunces',Georgia,serif", 
          fontSize:"clamp(40px,6vw,56px)",
          fontWeight:700, 
          color:C.text, 
          lineHeight:1.1, 
          letterSpacing:"-0.03em", 
          marginBottom:"16px" 
        }}>
          {edu.degree}
        </h2>
        <div style={{ fontSize:"16px", color:C.text3, marginBottom:"20px" }}>
          {edu.affiliation} · {edu.location}
        </div>
        <div style={{ 
          width:"80px", 
          height:"3px", 
          background:C.accent,
          animation: inView ? "shimmer 2s ease-in-out" : "none",
          backgroundImage:"linear-gradient(90deg, #0a0a0a 0%, #525252 50%, #0a0a0a 100%)",
          backgroundSize:"200% 100%"
        }} />
      </div>

      <div 
        className="btech-grid btech-card" 
        style={{ 
          display:"grid", 
          gridTemplateColumns:"260px 1fr", 
          gap:"48px",
          padding:"40px", 
          background:C.bg, 
          borderRadius:"8px", 
          border:`1px solid ${C.border}`,
          position:"relative",
          zIndex:1,
          transition:"all 0.4s cubic-bezier(0.16,1,0.3,1)"
        }}
        onMouseEnter={e => {
          e.currentTarget.style.borderColor = C.border2;
          e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.06)";
        }}
        onMouseLeave={e => {
          e.currentTarget.style.borderColor = C.border;
          e.currentTarget.style.boxShadow = "none";
        }}
      >
        <div>
          <CertThumb edu={edu} height="320px" onClick={() => onOpen(edu)} />
        </div>

        <div style={{ display:"flex", flexDirection:"column", gap:"32px" }}>
          <div>
            <div style={{ display:"flex", alignItems:"baseline", gap:"10px", marginBottom:"16px" }}>
              <span style={{ 
                fontSize:"11px", 
                letterSpacing:"0.1em", 
                textTransform:"uppercase", 
                color:C.text4,
                fontWeight:600
              }}>
                CGPA
              </span>
              <span style={{ 
                fontFamily:"'Fraunces',Georgia,serif", 
                fontSize:"40px", 
                fontWeight:700,
                color:C.text, 
                letterSpacing:"-0.03em", 
                lineHeight:1
              }}>
                {edu.score.replace(" CGPA", "")}
              </span>
            </div>
            <p style={{ 
              fontSize:"16px", 
              color:C.text3, 
              lineHeight:1.7, 
              maxWidth:"560px" 
            }}>
              {edu.synopsis}
            </p>
          </div>

          <div className="outcomes-grid">
            <div style={{ 
              fontSize:"11px", 
              letterSpacing:"0.1em", 
              textTransform:"uppercase",
              color:C.text4, 
              marginBottom:"16px",
              fontWeight:600
            }}>
              Key Achievements
            </div>
            {edu.outcomes.map((o, i) => (
              <div 
                key={i} 
                className="outcome-item"
                style={{ 
                  display:"flex", 
                  gap:"12px", 
                  alignItems:"flex-start",
                  padding:"20px",
                  background:C.surface,
                  border:`1px solid ${C.border}`,
                  borderRadius:"6px",
                  marginBottom:"12px",
                  transition:"all 0.3s cubic-bezier(0.16,1,0.3,1)"
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = "translateX(4px)";
                  e.currentTarget.style.borderColor = C.border2;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = "translateX(0)";
                  e.currentTarget.style.borderColor = C.border;
                }}
              >
                <div style={{ 
                  width:"5px", 
                  height:"5px", 
                  borderRadius:"50%", 
                  background:C.accent, 
                  flexShrink:0, 
                  marginTop:"8px" 
                }} />
                <div>
                  <div style={{ 
                    fontSize:"15px", 
                    fontWeight:600, 
                    color:C.text2, 
                    marginBottom:"6px" 
                  }}>
                    {o.label}
                  </div>
                  <div style={{ 
                    fontSize:"14px", 
                    color:C.text4, 
                    lineHeight:1.6 
                  }}>
                    {o.detail}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ paddingTop:"24px", borderTop:`1px solid ${C.border}` }}>
            <button 
              onClick={() => onOpen(edu)}
              style={{ 
                display:"inline-flex", 
                alignItems:"center", 
                gap:"8px",
                padding:"14px 28px", 
                borderRadius:"6px",
                border:`1px solid ${C.border}`, 
                background:C.accent,
                color:"#fff",
                fontSize:"13px",
                letterSpacing:"0.05em", 
                cursor:"pointer", 
                transition:"all 0.3s cubic-bezier(0.16,1,0.3,1)", 
                fontWeight:600
              }}
              onMouseEnter={e => { 
                e.currentTarget.style.background = C.text2;
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.15)";
              }}
              onMouseLeave={e => { 
                e.currentTarget.style.background = C.accent;
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              VIEW FULL DETAILS →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function TimelineItem({ edu, delay, onOpen }) {
  const [ref, inView] = useInView(0.1);

  return (
    <div 
      ref={ref} 
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(16px)",
        transition:`opacity 0.5s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.5s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
        marginBottom:"20px",
      }}
    >
      <div 
        className="timeline-item"
        style={{ 
          display:"grid", 
          gridTemplateColumns:"180px 1fr", 
          gap:"32px",
          padding:"28px 32px", 
          background:C.bg, 
          border:`1px solid ${C.border}`, 
          borderRadius:"6px",
          transition:"all 0.3s cubic-bezier(0.16,1,0.3,1)"
        }}
        onMouseEnter={e => {
          e.currentTarget.style.borderColor = C.border2;
          e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.04)";
          e.currentTarget.style.transform = "translateX(4px)";
        }}
        onMouseLeave={e => {
          e.currentTarget.style.borderColor = C.border;
          e.currentTarget.style.boxShadow = "none";
          e.currentTarget.style.transform = "translateX(0)";
        }}
      >
        <div>
          <CertThumb edu={edu} height="140px" onClick={() => onOpen(edu)} />
        </div>

        <div style={{ display:"flex", flexDirection:"column", gap:"16px" }}>
          <div>
            <div style={{ 
              fontSize:"11px", 
              letterSpacing:"0.1em", 
              textTransform:"uppercase", 
              color:C.text4, 
              marginBottom:"8px",
              fontWeight:600
            }}>
              {edu.level} · {edu.duration}
            </div>
            <h3 style={{ 
              fontFamily:"'Fraunces',Georgia,serif", 
              fontSize:"22px", 
              fontWeight:700,
              color:C.text, 
              letterSpacing:"-0.02em", 
              lineHeight:1.2, 
              marginBottom:"6px" 
            }}>
              {edu.degree}
            </h3>
            <div style={{ fontSize:"14px", color:C.text3 }}>
              {edu.stream && <>{edu.stream} · </>}
              {edu.institution}
            </div>
          </div>

          <div style={{ display:"flex", flexDirection:"column", gap:"8px" }}>
            {edu.outcomes.map((o,i) => (
              <div key={i} style={{ display:"flex", alignItems:"center", gap:"10px" }}>
                <div style={{ 
                  width:"4px", 
                  height:"4px", 
                  borderRadius:"50%", 
                  background:C.accent, 
                  flexShrink:0 
                }} />
                <span style={{ fontSize:"13px", fontWeight:600, color:C.text3 }}>
                  {o.label}
                </span>
              </div>
            ))}
          </div>

          <div style={{ 
            display:"flex", 
            alignItems:"center", 
            justifyContent:"space-between", 
            paddingTop:"16px", 
            borderTop:`1px solid ${C.border}` 
          }}>
            <span style={{ 
              fontFamily:"'Fraunces',Georgia,serif", 
              fontSize:"20px", 
              fontWeight:700,
              color:C.text, 
              letterSpacing:"-0.02em" 
            }}>
              {edu.score}
            </span>
            <button 
              onClick={() => onOpen(edu)}
              style={{ 
                padding:"8px 16px", 
                borderRadius:"4px",
                border:`1px solid ${C.border}`, 
                background:"transparent",
                color:C.text3, 
                fontSize:"12px",
                letterSpacing:"0.05em", 
                cursor:"pointer", 
                transition:"all 0.25s cubic-bezier(0.16,1,0.3,1)", 
                fontWeight:600 
              }}
              onMouseEnter={e => { 
                e.currentTarget.style.borderColor = C.accent; 
                e.currentTarget.style.color = C.accent;
                e.currentTarget.style.transform = "translateX(4px)";
              }}
              onMouseLeave={e => { 
                e.currentTarget.style.borderColor = C.border; 
                e.currentTarget.style.color = C.text3;
                e.currentTarget.style.transform = "translateX(0)";
              }}
            >
              VIEW →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Footer() {
  const [ref, inView] = useInView(0.05);

  return (
    <footer 
      ref={ref} 
      style={{ 
        background:C.text, 
        marginTop:"120px", 
        color:"#fff"
      }}
    >
      <div style={{ maxWidth:"960px", margin:"0 auto", padding:"0 32px" }}>
        <div className="footer-main" style={{ 
          padding:"80px 0 60px", 
          borderBottom:"1px solid rgba(255,255,255,0.1)" 
        }}>
          <div style={{ 
            display:"flex", 
            justifyContent:"space-between", 
            alignItems:"flex-start", 
            flexWrap:"wrap", 
            gap:"48px" 
          }}>
            <div style={{ maxWidth:"480px" }}>
              <div className="floating-icon" style={{ 
                display:"inline-flex", 
                alignItems:"center", 
                gap:"6px",
                padding:"6px 12px", 
                borderRadius:"4px",
                background:"rgba(255,255,255,0.08)", 
                border:"1px solid rgba(255,255,255,0.12)", 
                marginBottom:"24px" 
              }}>
                <div style={{ 
                  width:"6px", 
                  height:"6px", 
                  borderRadius:"50%", 
                  background:"#fff",
                  animation:"pulse 2s ease-in-out infinite"
                }} />
                <span style={{ 
                  fontSize:"10px", 
                  color:"rgba(255,255,255,0.7)", 
                  letterSpacing:"0.08em",
                  fontWeight:600
                }}>
                  GRADUATING JUNE 2026
                </span>
              </div>
              <h2 style={{ 
                fontFamily:"'Fraunces',Georgia,serif", 
                fontSize:"42px",
                fontWeight:700, 
                color:"#fff", 
                lineHeight:1.1, 
                letterSpacing:"-0.03em", 
                marginBottom:"20px" 
              }}>
                Academic Foundation.<br />Engineering Trajectory.
              </h2>
              <p style={{ 
                fontSize:"15px", 
                color:"rgba(255,255,255,0.5)", 
                lineHeight:1.7 
              }}>
                Four years of AI & Data Science education through industry internships, professional certifications, and production system implementations.
              </p>
            </div>
            <div style={{ 
              display:"flex", 
              flexDirection:"column", 
              gap:"12px", 
              minWidth:"200px" 
            }}>
              <a 
                href="mailto:g.sivasatyasaibhagavan@gmail.com"
                style={{ 
                  display:"flex", 
                  alignItems:"center", 
                  justifyContent:"space-between",
                  padding:"14px 20px", 
                  borderRadius:"6px", 
                  textDecoration:"none",
                  background:"rgba(255,255,255,0.95)", 
                  border:"1px solid rgba(255,255,255,0.2)",
                  transition:"all 0.3s cubic-bezier(0.16,1,0.3,1)", 
                  color:C.text
                }}
                onMouseEnter={e => { 
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.2)";
                }}
                onMouseLeave={e => { 
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div>
                  <div style={{ 
                    fontSize:"10px", 
                    color:C.text4, 
                    letterSpacing:"0.1em", 
                    marginBottom:"4px",
                    fontWeight:600
                  }}>
                    PRIMARY
                  </div>
                  <div style={{ fontSize:"14px", fontWeight:600 }}>
                    Schedule Interview
                  </div>
                </div>
                <span style={{ fontSize:"16px" }}>→</span>
              </a>
              <a 
                href="#"
                style={{ 
                  display:"flex", 
                  alignItems:"center", 
                  justifyContent:"space-between",
                  padding:"14px 20px", 
                  borderRadius:"6px", 
                  textDecoration:"none",
                  background:"rgba(255,255,255,0.08)", 
                  border:"1px solid rgba(255,255,255,0.15)",
                  transition:"all 0.3s cubic-bezier(0.16,1,0.3,1)", 
                  color:"#fff"
                }}
                onMouseEnter={e => { 
                  e.currentTarget.style.background = "rgba(255,255,255,0.12)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={e => { 
                  e.currentTarget.style.background = "rgba(255,255,255,0.08)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div>
                  <div style={{ 
                    fontSize:"10px", 
                    color:"rgba(255,255,255,0.5)", 
                    letterSpacing:"0.1em", 
                    marginBottom:"4px",
                    fontWeight:600
                  }}>
                    CV
                  </div>
                  <div style={{ fontSize:"14px", fontWeight:600 }}>
                    View Resume
                  </div>
                </div>
                <span style={{ fontSize:"16px" }}>→</span>
              </a>
            </div>
          </div>
        </div>

        <div className="footer-grid" style={{ 
          display:"grid", 
          gridTemplateColumns:"2fr 1fr 1fr 1fr",
          gap:"48px", 
          padding:"48px 0" 
        }}>
          <div>
            <div style={{ 
              fontFamily:"'Fraunces',Georgia,serif", 
              fontSize:"24px", 
              fontWeight:700,
              color:"#fff", 
              letterSpacing:"-0.03em", 
              marginBottom:"12px" 
            }}>
              Bhagavan.
            </div>
            <p style={{ 
              fontSize:"13px", 
              color:"rgba(255,255,255,0.4)", 
              lineHeight:1.7, 
              marginBottom:"20px", 
              maxWidth:"240px" 
            }}>
              B.Tech AIDS · Ramachandra College of Engineering · AI systems engineer in training.
            </p>
            <div style={{ display:"flex", gap:"8px" }}>
              {[
                { label:"GH", href:"https://github.com/bhagavan444" },
                { label:"LI", href:"https://www.linkedin.com/in/gopalajosyula-siva-satya-sai-bhagavan-1624a027b/" },
                { label:"✉",  href:"mailto:g.sivasatyasaibhagavan@gmail.com" },
              ].map((s,i) => (
                <a 
                  key={i} 
                  href={s.href} 
                  target={s.href.startsWith("http")?"_blank":undefined}
                  rel={s.href.startsWith("http")?"noopener noreferrer":undefined}
                  style={{ 
                    width:"36px", 
                    height:"36px", 
                    borderRadius:"4px",
                    background:"rgba(255,255,255,0.06)", 
                    border:"1px solid rgba(255,255,255,0.1)",
                    display:"flex", 
                    alignItems:"center", 
                    justifyContent:"center",
                    color:"rgba(255,255,255,0.4)", 
                    textDecoration:"none", 
                    fontSize:"12px",
                    transition:"all 0.25s cubic-bezier(0.16,1,0.3,1)",
                    fontWeight:600
                  }}
                  onMouseEnter={e => { 
                    e.currentTarget.style.background = "rgba(255,255,255,0.1)"; 
                    e.currentTarget.style.color = "#fff";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={e => { 
                    e.currentTarget.style.background = "rgba(255,255,255,0.06)"; 
                    e.currentTarget.style.color = "rgba(255,255,255,0.4)";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {["Navigate","Work","Contact"].map((col, ci) => {
            const links = ci === 0
              ? [{l:"Home",h:"/"},{l:"Experience",h:"/experience"},{l:"Skills",h:"/skills"},{l:"Projects",h:"/projects"},{l:"Education",h:"/education"}]
              : ci === 1
              ? [{l:"GitHub",h:"https://github.com/bhagavan444",ext:true},{l:"LinkedIn",h:"https://www.linkedin.com/in/gopalajosyula-siva-satya-sai-bhagavan-1624a027b/",ext:true},{l:"Resume",h:"#"}]
              : [{l:"Email",h:"mailto:g.sivasatyasaibhagavan@gmail.com"},{l:"+91 7569205626",h:"tel:+917569205626"},{l:"Andhra Pradesh",h:"#"}];
            return (
              <div key={col}>
                <div style={{ 
                  fontSize:"10px", 
                  letterSpacing:"0.12em",
                  textTransform:"uppercase", 
                  color:"rgba(255,255,255,0.3)", 
                  marginBottom:"16px",
                  fontWeight:600
                }}>
                  {col}
                </div>
                {links.map((ln,li) => (
                  <a 
                    key={li} 
                    href={ln.h} 
                    target={ln.ext?"_blank":undefined}
                    rel={ln.ext?"noopener noreferrer":undefined}
                    style={{ 
                      display:"block", 
                      fontSize:"13px", 
                      color:"rgba(255,255,255,0.5)",
                      textDecoration:"none", 
                      marginBottom:"10px", 
                      transition:"all 0.2s ease" 
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.color = "#fff";
                      e.currentTarget.style.transform = "translateX(4px)";
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.color = "rgba(255,255,255,0.5)";
                      e.currentTarget.style.transform = "translateX(0)";
                    }}
                  >
                    {ln.l}
                  </a>
                ))}
              </div>
            );
          })}
        </div>

        <div style={{ 
          borderTop:"1px solid rgba(255,255,255,0.1)", 
          padding:"24px 0",
          display:"flex", 
          alignItems:"center", 
          justifyContent:"space-between", 
          flexWrap:"wrap", 
          gap:"16px" 
        }}>
          <span style={{ 
            fontSize:"11px", 
            color:"rgba(255,255,255,0.3)",
            fontWeight:500
          }}>
            © 2026 Siva Satya Sai Bhagavan
          </span>
          <span style={{ 
            fontSize:"11px", 
            color:"rgba(255,255,255,0.3)",
            fontWeight:500
          }}>
            Graduating June 2026
          </span>
        </div>
      </div>
    </footer>
  );
}

export default function Education() {
  const [drawer, setDrawer] = useState(null);
  const [heroIn, setHeroIn] = useState(false);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setHeroIn(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  const btech = EDU[0];
  const secondary = EDU.slice(1);

  return (
    <>
      <style>{GCSS}</style>
      <ScrollBar />

      <div style={{ background:C.bg, minHeight:"100vh" }}>
        <main className="main-container" style={{ maxWidth:"960px", margin:"0 auto", padding:"140px 32px 0" }}>
          <header 
            className="hero-section"
            style={{ 
              marginBottom:"100px",
              opacity: heroIn ? 1 : 0,
              transform: heroIn ? "none" : "translateY(20px)",
              transition:"opacity 0.6s cubic-bezier(0.16,1,0.3,1), transform 0.6s cubic-bezier(0.16,1,0.3,1)",
              position:"relative"
            }}
          >
            <FloatingObjects />
            
            <div style={{ display:"flex", alignItems:"center", gap:"12px", marginBottom:"28px", position:"relative", zIndex:1 }}>
              <div style={{ width:"40px", height:"2px", background:C.accent }} />
              <span style={{ 
                fontSize:"11px", 
                letterSpacing:"0.1em",
                textTransform:"uppercase", 
                color:C.text4,
                fontWeight:600
              }}>
                Academic Record · 2019 – 2026
              </span>
            </div>

            <h1 className="hero-title" style={{ 
              fontFamily:"'Fraunces',Georgia,serif",
              fontSize:"clamp(48px,9vw,72px)", 
              fontWeight:700,
              letterSpacing:"-0.035em", 
              lineHeight:1, 
              marginBottom:"24px",
              color:C.text,
              position:"relative",
              zIndex:1
            }}>
              Academic Foundation
            </h1>

            <p className="hero-description" style={{ 
              fontSize:"18px", 
              color:C.text3, 
              lineHeight:1.7, 
              maxWidth:"600px", 
              marginBottom:"48px",
              position:"relative",
              zIndex:1
            }}>
              Formal education in Artificial Intelligence and Data Science. Each stage built the analytical infrastructure for production system design and deployment.
            </p>

            <div className="hero-stats" style={{ 
              display:"grid", 
              gridTemplateColumns:"repeat(3, 1fr)", 
              gap:"32px",
              paddingTop:"32px", 
              borderTop:`1px solid ${C.border}`,
              position:"relative",
              zIndex:1
            }}>
              {[
                ["B.Tech, AI & DS",    "Current Program"],
                ["2022 – 2026",        "Duration"],
                ["JNTUK Affiliated",   "University"],
              ].map(([v,l]) => (
                <div key={l} className="stat-item">
                  <div className="stat-value" style={{ 
                    fontSize:"16px", 
                    fontWeight:600, 
                    color:C.text2, 
                    marginBottom:"6px" 
                  }}>
                    {v}
                  </div>
                  <div className="stat-label" style={{ 
                    fontSize:"11px", 
                    letterSpacing:"0.08em",
                    textTransform:"uppercase", 
                    color:C.text4,
                    fontWeight:600
                  }}>
                    {l}
                  </div>
                </div>
              ))}
            </div>
          </header>

          <div className="tech-marquee-section" style={{ margin:"80px -32px" }}>
            <TechMarquee />
          </div>

          <div style={{ 
            display:"flex", 
            alignItems:"center", 
            gap:"16px", 
            marginBottom:"60px" 
          }}>
            <span style={{ 
              fontSize:"11px", 
              letterSpacing:"0.1em",
              textTransform:"uppercase", 
              color:C.text4, 
              flexShrink:0,
              fontWeight:600
            }}>
              Chronological
            </span>
            <div style={{ flex:1, height:"1px", background:C.border }} />
          </div>

          <BtechBlock edu={btech} onOpen={setDrawer} />

          <div style={{ 
            display:"flex", 
            alignItems:"center", 
            gap:"16px", 
            marginBottom:"40px" 
          }}>
            <span style={{ 
              fontSize:"11px", 
              letterSpacing:"0.1em",
              textTransform:"uppercase", 
              color:C.text5, 
              flexShrink:0,
              fontWeight:600
            }}>
              Prior Education
            </span>
            <div style={{ flex:1, height:"1px", background:C.border }} />
          </div>

          {secondary.map((edu, i) => (
            <TimelineItem key={edu.id} edu={edu} delay={i * 0.08} onOpen={setDrawer} />
          ))}

          <div style={{ 
            marginTop:"80px", 
            paddingTop:"32px", 
            borderTop:`1px solid ${C.border}`,
            display:"flex", 
            justifyContent:"space-between", 
            alignItems:"center", 
            flexWrap:"wrap", 
            gap:"16px" 
          }}>
            <p style={{ 
              fontSize:"13px", 
              color:C.text4, 
              lineHeight:1.6,
              fontWeight:500
            }}>
              All credentials verifiable via linked certificates.
            </p>
            <span style={{ 
              fontSize:"11px", 
              color:C.text5, 
              letterSpacing:"0.08em",
              fontWeight:600
            }}>
              2019–2026
            </span>
          </div>
        </main>

        <Footer />
      </div>

      {drawer && <Drawer edu={drawer} onClose={() => setDrawer(null)} />}
    </>
  );
}