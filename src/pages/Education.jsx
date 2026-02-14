"use client";

import React, { useState, useEffect, useRef } from "react";

/* ═══════════════════════════════════════════════════════════════
   DESIGN TOKENS — Architectural monochrome. Single accent.
═══════════════════════════════════════════════════════════════ */
const C = {
  bg:      "#ffffff",
  surface: "#fafafa",
  raised:  "#f5f5f5",
  border:  "#ebebeb",
  border2: "#d4d4d4",
  text:    "#0a0a0a",
  text2:   "#262626",
  text3:   "#525252",
  text4:   "#737373",
  text5:   "#a3a3a3",
  accent:  "#0a0a0a",           // Single black accent — architectural
  accentS: "#f5f5f5",
  accentL: "#e5e5e5",
};

/* ═══════════════════════════════════════════════════════════════
   GLOBAL CSS — Minimal, architectural
═══════════════════════════════════════════════════════════════ */
const GCSS = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant:wght@600;700&family=Inter:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap');

  *, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }
  html { scroll-behavior:smooth; overflow-x:hidden; }
  body {
    font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif;
    background:${C.bg}; color:${C.text};
    -webkit-font-smoothing:antialiased;
    -moz-osx-font-smoothing:grayscale;
  }
  ::selection { background:#f5f5f5; color:${C.text}; }
  ::-webkit-scrollbar { width:4px; }
  ::-webkit-scrollbar-track { background:${C.bg}; }
  ::-webkit-scrollbar-thumb { background:${C.border2}; border-radius:2px; }
  ::-webkit-scrollbar-thumb:hover { background:${C.text4}; }

  @keyframes fadeUp {
    from { opacity:0; transform:translateY(16px); }
    to   { opacity:1; transform:translateY(0); }
  }
  @keyframes slideRight {
    from { opacity:0; transform:translateX(-8px); }
    to   { opacity:1; transform:translateX(0); }
  }
  @keyframes scaleIn {
    from { opacity:0; transform:scale(0.98); }
    to   { opacity:1; transform:scale(1); }
  }
  @keyframes lineExpand {
    from { transform:scaleX(0); transform-origin:left; }
    to   { transform:scaleX(1); transform-origin:left; }
  }
  @keyframes floatSlow {
    0%, 100% { transform:translateY(0); }
    50% { transform:translateY(-4px); }
  }
  @keyframes shimmerSubtle {
    0% { background-position:-200% center; }
    100% { background-position:200% center; }
  }
  @keyframes pulseRing {
    0% { box-shadow:0 0 0 0 rgba(10,10,10,0.2); }
    70% { box-shadow:0 0 0 8px rgba(10,10,10,0); }
    100% { box-shadow:0 0 0 0 rgba(10,10,10,0); }
  }
  @keyframes countUp {
    from { opacity:0; transform:translateY(8px); }
    to { opacity:1; transform:translateY(0); }
  }
  @keyframes gradientShift {
    0% { background-position:0% 50%; }
    50% { background-position:100% 50%; }
    100% { background-position:0% 50%; }
  }
  @keyframes rotate {
    from { transform:rotate(0deg); }
    to { transform:rotate(360deg); }
  }
  @keyframes scaleUp {
    from { transform:scale(0.95); opacity:0; }
    to { transform:scale(1); opacity:1; }
  }
  @keyframes slideDown {
    from { transform:translateY(-12px); opacity:0; }
    to { transform:translateY(0); opacity:1; }
  }
  @keyframes borderGlow {
    0%, 100% { border-color:${C.border}; }
    50% { border-color:${C.border2}; }
  }
  @keyframes textReveal {
    from { clip-path:inset(0 100% 0 0); }
    to { clip-path:inset(0 0 0 0); }
  }
  @keyframes beamScan {
    0% { transform:translateX(-100%) skewX(-15deg); }
    100% { transform:translateX(200%) skewX(-15deg); }
  }
  @keyframes ripple {
    to { transform:scale(2); opacity:0; }
  }
  @keyframes typewriter {
    from { width:0; }
    to { width:100%; }
  }
  @keyframes blink {
    50% { opacity:0; }
  }
  @keyframes morphBlob {
    0%, 100% { border-radius:60% 40% 30% 70% / 60% 30% 70% 40%; }
    25% { border-radius:30% 60% 70% 40% / 50% 60% 30% 60%; }
    50% { border-radius:50% 60% 30% 60% / 30% 60% 70% 40%; }
    75% { border-radius:60% 40% 60% 40% / 70% 30% 50% 60%; }
  }
  @keyframes particles {
    0% { transform:translateY(0) translateX(0) scale(1); opacity:1; }
    100% { transform:translateY(-100px) translateX(20px) scale(0); opacity:0; }
  }
  @keyframes glitch {
    0% { transform:translate(0); }
    20% { transform:translate(-2px, 2px); }
    40% { transform:translate(-2px, -2px); }
    60% { transform:translate(2px, 2px); }
    80% { transform:translate(2px, -2px); }
    100% { transform:translate(0); }
  }
  @keyframes scanline {
    0% { transform:translateY(-100%); }
    100% { transform:translateY(100%); }
  }

  .mono { font-family:'DM Mono',monospace; }

  /* Advanced hover glow with gradient border */
  .card-glow {
    position:relative;
    transition:all 0.3s cubic-bezier(0.16,1,0.3,1);
  }
  .card-glow::before {
    content:'';
    position:absolute;
    inset:-1px;
    border-radius:inherit;
    padding:1px;
    background:linear-gradient(135deg, transparent, rgba(10,10,10,0.15), transparent);
    -webkit-mask:linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite:xor;
    mask-composite:exclude;
    opacity:0;
    transition:opacity 0.3s ease;
    pointer-events:none;
  }
  .card-glow:hover::before {
    opacity:1;
  }

  /* Shimmer text effect */
  .shimmer-text {
    background:linear-gradient(90deg, ${C.text} 0%, ${C.text2} 50%, ${C.text} 100%);
    background-size:200% 100%;
    -webkit-background-clip:text;
    -webkit-text-fill-color:transparent;
    background-clip:text;
    animation:shimmerSubtle 3s ease-in-out infinite;
  }

  /* Magnetic button */
  .magnetic {
    transition:transform 0.2s cubic-bezier(0.16,1,0.3,1);
  }

  /* Beam scan effect - Stripe-inspired */
  .beam-scan {
    position:relative;
    overflow:hidden;
  }
  .beam-scan::after {
    content:'';
    position:absolute;
    top:0;
    left:0;
    width:100%;
    height:100%;
    background:linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
    transform:translateX(-100%) skewX(-15deg);
    pointer-events:none;
  }
  .beam-scan:hover::after {
    animation:beamScan 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  }

  /* Ripple effect on click - Material Design inspired */
  .ripple-effect {
    position:relative;
    overflow:hidden;
  }

  /* Morphing blob background - Apple-inspired */
  .morph-blob {
    animation:morphBlob 10s ease-in-out infinite;
  }

  /* Gradient background animation - Vercel-inspired */
  .gradient-animate {
    background:linear-gradient(135deg, rgba(10,10,10,0.02), rgba(10,10,10,0.05), rgba(10,10,10,0.02));
    background-size:200% 200%;
    animation:gradientShift 6s ease infinite;
  }

  /* Text reveal animation - Linear-inspired */
  .text-reveal {
    animation:textReveal 0.6s cubic-bezier(0.16,1,0.3,1) both;
  }

  /* Floating particles */
  .particle {
    position:absolute;
    width:4px;
    height:4px;
    background:${C.accent};
    border-radius:50%;
    opacity:0;
    animation:particles 3s ease-out infinite;
  }

  /* Scanline effect */
  .scanline {
    position:absolute;
    inset:0;
    background:linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.05) 50%, transparent 100%);
    pointer-events:none;
    animation:scanline 4s linear infinite;
    opacity:0.4;
  }

  /* 3D tilt effect */
  .tilt-3d {
    transform-style:preserve-3d;
    transition:transform 0.3s cubic-bezier(0.16,1,0.3,1);
  }

  /* Glass morphism */
  .glass {
    background:rgba(255,255,255,0.7);
    backdrop-filter:blur(12px) saturate(180%);
    -webkit-backdrop-filter:blur(12px) saturate(180%);
    border:1px solid rgba(255,255,255,0.3);
  }

  /* Neon glow effect */
  .neon-glow {
    text-shadow:0 0 10px rgba(10,10,10,0.3), 0 0 20px rgba(10,10,10,0.2), 0 0 30px rgba(10,10,10,0.1);
  }

  /* Parallax layers */
  .parallax-layer {
    will-change:transform;
    transition:transform 0.1s ease-out;
  }

  @media (max-width:1024px) {
    .btech-grid { grid-template-columns:1fr !important; }
  }
  @media (max-width:768px) {
    .hero-strip { grid-template-columns:1fr !important; }
    .drawer-inner { width:100vw !important; }
    .footer-grid { grid-template-columns:1fr !important; }
  }
`;

/* ═══════════════════════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════════════════════ */
const EDU = [
  {
    id:"btech",
    level:"Undergraduate Program",
    degree:"B.Tech in Artificial Intelligence & Data Science",
    institution:"Ramachandra College of Engineering",
    affiliation:"JNTUK",
    duration:"2022 – 2026",
    score:"7.9 CGPA",
    location:"Eluru, Andhra Pradesh",
    status:"current",
    certId:"1wxnzvsS3MA7xWSxuXKeIkS8GaQoG4Y1a",

    synopsis:"Focused on applied machine learning and full-stack system design. Academic foundation built through three industry internships, production-grade project implementations, and peer-reviewed certifications across AWS, TensorFlow, and modern web frameworks.",

    outcomes:[
      { label:"Industry internship experience",       detail:"MERN stack development, AI/ML engineering, and data science roles at StudyOwl, SmartBridge, and Blackbucks" },
      { label:"Production system implementations",    detail:"Built and deployed ATS resume builder, AI chatbot, career recommendation engine, and fake news detection system" },
      { label:"Professional certification portfolio", detail:"20+ credentials including AWS, Google AI, IBM certifications — applied through project work" },
    ],

    coursework:["Machine Learning","Deep Learning","Computer Vision","Natural Language Processing","Data Structures & Algorithms","Database Systems","Full-Stack Development","Cloud Computing","Probability & Statistics"],
  },
  {
    id:"inter",
    level:"Pre-University",
    degree:"Intermediate — MPC",
    stream:"Mathematics, Physics, Chemistry",
    institution:"Srividhya Junior College",
    duration:"2020 – 2022",
    score:"7.8 CGPA",
    location:"Gudivada, Andhra Pradesh",
    status:"completed",
    certId:"1N1K1j6QGrgNPNL2D9UmfJAL2PVSulhPJ",

    synopsis:"Pre-engineering foundation in calculus, analytical geometry, and physical reasoning.",
    outcomes:[
      { label:"Mathematics foundation for ML optimization" },
      { label:"Applied physics and analytical reasoning" },
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

    synopsis:"Graduated with distinction. 100% score in Mathematics.",
    outcomes:[
      { label:"9.5 GPA — top academic performance" },
      { label:"Perfect mathematics score" },
    ],
  },
];

const thumbUrl  = (id) => `https://lh3.googleusercontent.com/d/${id}`;
const driveUrl  = (id) => `https://drive.google.com/file/d/${id}/view`;

/* ═══════════════════════════════════════════════════════════════
   HOOKS
═══════════════════════════════════════════════════════════════ */
function useInView(thresh = 0.1) {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold:thresh });
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
    <div style={{ position:"fixed",top:0,left:0,right:0,height:"1px",background:C.border,zIndex:9999 }}>
      <div style={{ height:"100%",width:`${p}%`,background:C.accent,transition:"width 0.1s linear" }} />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   CERTIFICATE THUMBNAIL
═══════════════════════════════════════════════════════════════ */
function CertThumb({ edu, height="240px", onClick }) {
  const [loaded, setLoaded] = useState(false);
  const [err,    setErr]    = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!onClick) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
    const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
    setTilt({ x: y * 10, y: -x * 10 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="beam-scan tilt-3d"
      style={{ position:"relative", height, borderRadius:"8px", overflow:"hidden",
        background:C.raised, border:`1px solid ${C.border}`,
        cursor: onClick ? "pointer" : "default", flexShrink:0,
        transition:"all 0.3s cubic-bezier(0.16,1,0.3,1)",
        transform: onClick ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` : "none",
        boxShadow: onClick && (tilt.x !== 0 || tilt.y !== 0) ? "0 20px 40px rgba(0,0,0,0.1)" : "none",
      }}
      onMouseEnter={e => onClick && (e.currentTarget.style.borderColor = C.border2)}
    >
      {!err ? (
        <img src={thumbUrl(edu.certId)} alt={`${edu.degree} certificate`}
          onLoad={() => setLoaded(true)} onError={() => setErr(true)}
          style={{ width:"100%", height:"100%", objectFit:"cover", display:"block",
            opacity: loaded ? 1 : 0, transition:"opacity 0.3s ease" }} />
      ) : (
        <div style={{ width:"100%", height:"100%", display:"flex", flexDirection:"column",
          alignItems:"center", justifyContent:"center", gap:"8px" }}>
          <span style={{ fontFamily:"'DM Mono',monospace", fontSize:"32px", color:C.text5 }}>◱</span>
          <span className="mono" style={{ fontSize:"10px", letterSpacing:"0.12em", color:C.text4, textTransform:"uppercase" }}>Certificate</span>
        </div>
      )}

      {/* Status badge */}
      {edu.status === "current" ? (
        <div style={{ position:"absolute", top:"12px", right:"12px",
          display:"flex", alignItems:"center", gap:"6px",
          padding:"4px 10px", borderRadius:"4px",
          background:"rgba(255,255,255,0.95)", border:`1px solid ${C.border}`,
          animation:"floatSlow 3s ease-in-out infinite" }}>
          <div style={{ width:"5px", height:"5px", borderRadius:"50%", background:C.accent,
            animation:"pulseRing 2s cubic-bezier(0.4, 0, 0.6, 1) infinite" }} />
          <span className="mono" style={{ fontSize:"9px", letterSpacing:"0.08em", color:C.text3, textTransform:"uppercase", fontWeight:500 }}>Active</span>
        </div>
      ) : null}

      {/* View link */}
      {onClick && (
        <div style={{ position:"absolute", bottom:"12px", right:"12px" }}>
          <a href={driveUrl(edu.certId)} target="_blank" rel="noopener noreferrer"
            onClick={e => e.stopPropagation()}
            style={{ display:"inline-flex", alignItems:"center", gap:"4px",
              padding:"6px 12px", borderRadius:"4px",
              background:"rgba(255,255,255,0.95)", border:`1px solid ${C.border}`,
              color:C.text3, fontFamily:"'DM Mono',monospace", fontSize:"10px",
              letterSpacing:"0.06em", textDecoration:"none",
              transition:"all 0.2s ease", fontWeight:500 }}
            onMouseEnter={e => { e.currentTarget.style.background = C.bg; e.currentTarget.style.borderColor = C.border2; e.currentTarget.style.color = C.text; }}
            onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.95)"; e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.text3; }}
          >VIEW ↗</a>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   DRAWER — Documentation-style
═══════════════════════════════════════════════════════════════ */
function Drawer({ edu, onClose }) {
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const raf = requestAnimationFrame(() => setOpen(true));
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    
    // Progress bar animation
    if (open) {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 2;
        });
      }, 10);
      return () => clearInterval(interval);
    }
    
    return () => { cancelAnimationFrame(raf); document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [onClose, open]);

  return (
    <div onClick={onClose} style={{
      position:"fixed", inset:0, zIndex:9000,
      background:"rgba(0,0,0,0.4)",
      backdropFilter:"blur(8px)",
      opacity: open ? 1 : 0, transition:"opacity 0.25s ease",
    }}>
      <div onClick={e => e.stopPropagation()} className="drawer-inner glass" style={{
        position:"fixed", top:0, right:0, bottom:0, width:"min(520px,100vw)",
        background:"rgba(255,255,255,0.95)", 
        backdropFilter:"blur(20px) saturate(180%)",
        borderLeft:`1px solid rgba(255,255,255,0.3)`,
        display:"flex", flexDirection:"column", overflowY:"auto",
        transform: open ? "translateX(0)" : "translateX(40px)",
        opacity: open ? 1 : 0,
        transition:"transform 0.3s cubic-bezier(0.16,1,0.3,1), opacity 0.25s ease",
        boxShadow:"-20px 0 60px rgba(0,0,0,0.1)",
      }}>
        {/* Header */}
        <div style={{ position:"sticky", top:0, zIndex:10, 
          background:"rgba(255,255,255,0.98)",
          backdropFilter:"blur(20px)",
          borderBottom:`1px solid ${C.border}`,
          padding:"24px 32px", display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:"16px" }}>
          {/* Animated progress bar with gradient */}
          <div style={{ position:"absolute", bottom:0, left:0, right:0, height:"2px", 
            background:`linear-gradient(90deg, ${C.accent}, ${C.text4}, ${C.accent})`,
            backgroundSize:"200% 100%",
            animation:"gradientShift 3s ease infinite" }}>
            <div style={{ height:"100%", width:`${progress}%`, 
              background:C.accent, 
              transition:"width 0.1s linear",
              boxShadow:`0 0 10px ${C.accent}` }} />
          </div>
          
          <div style={{ flex:1 }}>
            <span className="mono" style={{ fontSize:"10px", letterSpacing:"0.12em", textTransform:"uppercase",
              color:C.text4, display:"block", marginBottom:"8px" }}>{edu.level}</span>
            <div style={{ fontFamily:"'Cormorant',Georgia,serif", fontSize:"28px", fontWeight:700,
              color:C.text, letterSpacing:"-0.02em", lineHeight:1.2 }}>{edu.degree}</div>
          </div>
          <button onClick={onClose} style={{ width:"32px", height:"32px", borderRadius:"4px",
            border:`1px solid ${C.border}`, background:"transparent", color:C.text4,
            cursor:"pointer", fontSize:"20px", display:"flex", alignItems:"center",
            justifyContent:"center", transition:"all 0.2s ease", lineHeight:1, flexShrink:0 }}
          onMouseEnter={e => { e.currentTarget.style.background = C.surface; e.currentTarget.style.color = C.text; }}
          onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = C.text4; }}
          >×</button>
        </div>

        {/* Body */}
        <div style={{ padding:"32px", display:"flex", flexDirection:"column", gap:"32px" }}>
          <CertThumb edu={edu} height="180px" />

          {/* Meta */}
          <div style={{ display:"flex", flexDirection:"column", gap:"16px" }}>
            {[
              ["Institution", edu.institution],
              ["Score", edu.score],
              ["Duration", edu.duration],
              ["Location", edu.location],
            ].map(([k,v]) => (
              <div key={k} style={{ paddingBottom:"16px", borderBottom:`1px solid ${C.border}` }}>
                <div className="mono" style={{ fontSize:"10px", letterSpacing:"0.12em", textTransform:"uppercase",
                  color:C.text4, marginBottom:"6px" }}>{k}</div>
                <div style={{ fontSize:"15px", fontWeight:600, color:C.text2, lineHeight:1.4 }}>{v}</div>
              </div>
            ))}
          </div>

          {/* Synopsis */}
          <div style={{ borderLeft:`2px solid ${C.accent}`, paddingLeft:"16px" }}>
            <p style={{ fontSize:"15px", color:C.text3, lineHeight:1.7 }}>{edu.synopsis}</p>
          </div>

          {/* Outcomes */}
          <div>
            <div className="mono" style={{ fontSize:"10px", letterSpacing:"0.12em", textTransform:"uppercase",
              color:C.text4, marginBottom:"16px" }}>Key Outcomes</div>
            {edu.outcomes.map((o,i) => (
              <div key={i} style={{ display:"flex", gap:"12px", alignItems:"flex-start",
                paddingBottom:"16px", marginBottom:"16px",
                borderBottom: i < edu.outcomes.length - 1 ? `1px solid ${C.border}` : "none" }}>
                <div style={{ width:"4px", height:"4px", borderRadius:"50%", background:C.accent,
                  flexShrink:0, marginTop:"7px" }} />
                <div>
                  <div style={{ fontSize:"14px", fontWeight:600, color:C.text2, marginBottom:"4px", lineHeight:1.4 }}>{o.label}</div>
                  {o.detail && <div style={{ fontSize:"13px", color:C.text4, lineHeight:1.6 }}>{o.detail}</div>}
                </div>
              </div>
            ))}
          </div>

          {/* Coursework (B.Tech only) */}
          {edu.coursework && (
            <div>
              <div className="mono" style={{ fontSize:"10px", letterSpacing:"0.12em", textTransform:"uppercase",
                color:C.text4, marginBottom:"12px" }}>Core Coursework</div>
              <div style={{ display:"flex", flexWrap:"wrap", gap:"6px" }}>
                {edu.coursework.map(s => (
                  <span key={s} style={{
                    padding:"6px 12px", borderRadius:"4px",
                    background:C.surface, border:`1px solid ${C.border}`,
                    fontSize:"12px", fontFamily:"'DM Mono',monospace", color:C.text3 }}>{s}</span>
                ))}
              </div>
            </div>
          )}

          {/* Certificate link */}
          <a href={driveUrl(edu.certId)} target="_blank" rel="noopener noreferrer"
            style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:"8px",
              padding:"14px", borderRadius:"6px", background:C.surface, border:`1px solid ${C.border}`,
              color:C.text2, textDecoration:"none", fontFamily:"'DM Mono',monospace",
              fontSize:"12px", letterSpacing:"0.06em", transition:"all 0.2s ease", fontWeight:500 }}
            onMouseEnter={e => { e.currentTarget.style.background = C.raised; e.currentTarget.style.borderColor = C.border2; }}
            onMouseLeave={e => { e.currentTarget.style.background = C.surface; e.currentTarget.style.borderColor = C.border; }}
          >VIEW FULL CERTIFICATE ↗</a>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   B.TECH BLOCK — Case study format
═══════════════════════════════════════════════════════════════ */
function BtechBlock({ edu, onOpen }) {
  const [ref, inView] = useInView(0.06);
  const [count, setCount] = useState(0);
  const targetScore = parseFloat(edu.score.replace(" CGPA", ""));

  useEffect(() => {
    if (inView && count < targetScore) {
      const timer = setTimeout(() => {
        setCount(prev => Math.min(prev + 0.1, targetScore));
      }, 30);
      return () => clearTimeout(timer);
    }
  }, [inView, count, targetScore]);

  return (
    <div ref={ref} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0)" : "translateY(20px)",
      transition:"opacity 0.6s cubic-bezier(0.16,1,0.3,1), transform 0.6s cubic-bezier(0.16,1,0.3,1)",
      marginBottom:"80px",
    }}>
      {/* Label */}
      <div style={{ display:"flex", alignItems:"center", gap:"12px", marginBottom:"24px" }}>
        <div style={{ width:"24px", height:"1px", background:C.accent }} />
        <span className="mono" style={{ fontSize:"10px", letterSpacing:"0.12em", textTransform:"uppercase", color:C.text4 }}>{edu.level}</span>
        {edu.status === "current" && (
          <span style={{ display:"inline-flex", alignItems:"center", gap:"6px", padding:"4px 10px", borderRadius:"4px",
            background:C.surface, border:`1px solid ${C.border}` }}>
            <div style={{ width:"5px", height:"5px", borderRadius:"50%", background:C.accent }} />
            <span className="mono" style={{ fontSize:"9px", color:C.text3, letterSpacing:"0.08em", fontWeight:500 }}>IN PROGRESS</span>
          </span>
        )}
      </div>

      {/* Title */}
      <div style={{ marginBottom:"40px" }}>
        <div className="mono" style={{ fontSize:"12px", color:C.text4, marginBottom:"8px" }}>
          {edu.duration} · {edu.institution}
        </div>
        <h2 style={{ fontFamily:"'Cormorant',Georgia,serif", fontSize:"clamp(40px,6vw,64px)",
          fontWeight:700, color:C.text, lineHeight:1.05, letterSpacing:"-0.03em", marginBottom:"12px" }}>
          {edu.degree.replace(" in ", " in<br/>").split("<br/>").map((line, i) => (
            <React.Fragment key={i}>{i > 0 && <br />}{line}</React.Fragment>
          ))}
        </h2>
        <div style={{ fontSize:"16px", color:C.text3, marginBottom:"16px" }}>{edu.affiliation} · {edu.location}</div>
        <div style={{ width:"80px", height:"2px", background:C.accent }} />
      </div>

      {/* Main layout */}
      <div className="btech-grid card-glow gradient-animate" style={{ display:"grid", gridTemplateColumns:"220px 1fr", gap:"40px",
        padding:"40px", background:C.bg, borderRadius:"8px", border:`1px solid ${C.border}`,
        animation: inView ? "scaleIn 0.6s cubic-bezier(0.16,1,0.3,1) 0.2s both" : "none",
        position:"relative",
        overflow:"hidden" }}>
        
        {/* Scanline effect */}
        <div className="scanline" />
        
        {/* Glass morphism overlay on hover */}
        <div style={{
          position:"absolute",
          inset:0,
          background:"linear-gradient(135deg, rgba(255,255,255,0.05), transparent)",
          opacity:0,
          transition:"opacity 0.3s ease",
          pointerEvents:"none",
        }} />

        {/* Left: Certificate */}
        <div>
          <CertThumb edu={edu} height="280px" onClick={() => onOpen(edu)} />
        </div>

        {/* Right: Content */}
        <div style={{ display:"flex", flexDirection:"column", gap:"32px" }}>

          {/* Score + synopsis */}
          <div>
            <div style={{ display:"flex", alignItems:"baseline", gap:"8px", marginBottom:"16px" }}>
              <span className="mono" style={{ fontSize:"10px", letterSpacing:"0.1em", textTransform:"uppercase", color:C.text4 }}>CGPA</span>
              <span style={{ fontFamily:"'Cormorant',Georgia,serif", fontSize:"36px", fontWeight:700,
                color:C.text, letterSpacing:"-0.03em", lineHeight:1,
                animation: inView ? "countUp 0.6s cubic-bezier(0.16,1,0.3,1) 0.4s both" : "none" }}>
                {count.toFixed(1)}
              </span>
            </div>
            <p style={{ fontSize:"16px", color:C.text3, lineHeight:1.7, maxWidth:"520px" }}>{edu.synopsis}</p>
          </div>

          {/* Outcomes */}
          <div>
            <div className="mono" style={{ fontSize:"10px", letterSpacing:"0.12em", textTransform:"uppercase",
              color:C.text4, marginBottom:"16px" }}>Outcomes</div>
            {edu.outcomes.map((o, i) => (
              <div key={i} style={{ display:"flex", gap:"12px", alignItems:"flex-start",
                paddingBottom:"16px", marginBottom:"16px",
                borderBottom: i < edu.outcomes.length - 1 ? `1px solid ${C.border}` : "none",
                opacity: inView ? 1 : 0,
                animation: inView ? `slideRight 0.5s cubic-bezier(0.16,1,0.3,1) ${0.5 + i * 0.1}s both` : "none" }}>
                <div style={{ width:"4px", height:"4px", borderRadius:"50%", background:C.accent, flexShrink:0, marginTop:"7px" }} />
                <div>
                  <div style={{ fontSize:"15px", fontWeight:600, color:C.text2, marginBottom:"4px" }}>{o.label}</div>
                  <div style={{ fontSize:"14px", color:C.text4, lineHeight:1.6 }}>{o.detail}</div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div style={{ paddingTop:"24px", borderTop:`1px solid ${C.border}` }}>
            <button onClick={(e) => {
              onOpen(edu);
              // Create ripple effect
              const ripple = document.createElement('span');
              ripple.style.position = 'absolute';
              ripple.style.width = ripple.style.height = '100px';
              ripple.style.left = (e.clientX - e.currentTarget.offsetLeft - 50) + 'px';
              ripple.style.top = (e.clientY - e.currentTarget.offsetTop - 50) + 'px';
              ripple.style.background = 'rgba(10,10,10,0.1)';
              ripple.style.borderRadius = '50%';
              ripple.style.transform = 'scale(0)';
              ripple.style.animation = 'ripple 0.6s ease-out';
              ripple.style.pointerEvents = 'none';
              e.currentTarget.appendChild(ripple);
              setTimeout(() => ripple.remove(), 600);
            }}
              className="magnetic ripple-effect beam-scan"
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                e.currentTarget.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translate(0, 0)";
              }}
              style={{ display:"inline-flex", alignItems:"center", gap:"8px",
                padding:"12px 24px", borderRadius:"6px",
                border:`1px solid ${C.border}`, background:"transparent",
                color:C.text2, fontFamily:"'DM Mono',monospace", fontSize:"12px",
                letterSpacing:"0.06em", cursor:"pointer", transition:"all 0.2s ease", fontWeight:500,
                position:"relative", overflow:"hidden" }}
              onMouseEnter={e => { e.currentTarget.style.background = C.surface; e.currentTarget.style.borderColor = C.border2; e.currentTarget.style.color = C.text; }}
            >VIEW FULL DETAILS →</button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SECONDARY ROW — Archival, quiet
═══════════════════════════════════════════════════════════════ */
function SecondaryRow({ edu, delay, onOpen }) {
  const [ref, inView] = useInView(0.1);
  const [isHovered, setIsHovered] = useState(false);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!isHovered) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
    const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
    setParallax({ x: x * 5, y: y * 5 });
  };

  const handleMouseLeave = () => {
    setParallax({ x: 0, y: 0 });
  };

  return (
    <div ref={ref} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0)" : "translateY(16px)",
      transition:`opacity 0.5s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.5s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
      marginBottom:"24px",
    }}>
      <div 
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => { setIsHovered(false); handleMouseLeave(); }}
        onMouseMove={handleMouseMove}
        className="beam-scan"
        style={{ display:"grid", gridTemplateColumns:"140px 1fr", gap:"32px",
        padding:"24px 32px", background:C.bg, border:`1px solid ${C.border}`, borderRadius:"6px",
        transform: isHovered ? `translateY(-4px)` : "translateY(0)",
        boxShadow: isHovered ? "0 12px 32px rgba(0,0,0,0.06)" : "none",
        transition:"all 0.3s cubic-bezier(0.16,1,0.3,1)",
        position:"relative",
        overflow:"hidden" }}>
        
        {/* Parallax background layer */}
        <div className="parallax-layer" style={{
          position:"absolute",
          inset:"-20%",
          background:"radial-gradient(circle at center, rgba(10,10,10,0.01), transparent 70%)",
          transform:`translate(${parallax.x}px, ${parallax.y}px)`,
          pointerEvents:"none",
        }} />

        {/* Left: small thumb */}
        <div style={{ minHeight:"120px" }}>
          <CertThumb edu={edu} height="100%" onClick={() => onOpen(edu)} />
        </div>

        {/* Right: compact content */}
        <div style={{ display:"flex", flexDirection:"column", justifyContent:"space-between", gap:"12px" }}>
          <div>
            <div className="mono" style={{ fontSize:"10px", letterSpacing:"0.1em", textTransform:"uppercase", color:C.text4, marginBottom:"8px" }}>
              {edu.level} · {edu.duration}
            </div>
            <h3 style={{ fontFamily:"'Cormorant',Georgia,serif", fontSize:"24px", fontWeight:700,
              color:C.text, letterSpacing:"-0.02em", lineHeight:1.2, marginBottom:"6px" }}>{edu.degree}</h3>
            <div style={{ fontSize:"14px", color:C.text3 }}>
              {edu.stream && <>{edu.stream} · </>}
              {edu.institution}
            </div>
          </div>

          {/* Outcomes labels */}
          <div style={{ display:"flex", flexDirection:"column", gap:"6px" }}>
            {edu.outcomes.map((o,i) => (
              <div key={i} style={{ display:"flex", alignItems:"center", gap:"8px" }}>
                <div style={{ width:"3px", height:"3px", borderRadius:"50%", background:C.accent, flexShrink:0 }} />
                <span style={{ fontSize:"13px", fontWeight:600, color:C.text3 }}>{o.label}</span>
              </div>
            ))}
          </div>

          {/* Score + view */}
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", paddingTop:"12px", borderTop:`1px solid ${C.border}` }}>
            <span style={{ fontFamily:"'Cormorant',Georgia,serif", fontSize:"20px", fontWeight:700,
              color:C.text, letterSpacing:"-0.02em" }}>{edu.score}</span>
            <button onClick={() => onOpen(edu)}
              style={{ padding:"6px 14px", borderRadius:"4px",
                border:`1px solid ${C.border}`, background:"transparent",
                color:C.text3, fontFamily:"'DM Mono',monospace", fontSize:"11px",
                letterSpacing:"0.06em", cursor:"pointer", transition:"all 0.2s ease", fontWeight:500 }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = C.border2; e.currentTarget.style.color = C.text; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.text3; }}
            >VIEW →</button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   FOOTER — Calm, grounded
═══════════════════════════════════════════════════════════════ */
function Footer() {
  const [ref, inView] = useInView(0.05);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const parallaxOffset = scrollY * 0.05;

  return (
    <footer ref={ref} style={{ background:C.text, marginTop:"120px", color:"#fff", position:"relative", overflow:"hidden" }}>
      {/* Rotating gradient orb */}
      <div style={{ 
        position:"absolute", 
        top:"10%", 
        left:"-10%", 
        width:"600px", 
        height:"600px",
        borderRadius:"50%",
        background:"radial-gradient(circle, rgba(255,255,255,0.03), transparent 60%)",
        animation:"rotate 40s linear infinite",
        transform:`translateY(${parallaxOffset * 0.3}px)`,
        pointerEvents:"none"
      }} />
      
      {/* Floating background element with morphing */}
      <div className="morph-blob" style={{ 
        position:"absolute", 
        top:"20%", 
        right:"-10%", 
        width:"500px", 
        height:"500px",
        background:"radial-gradient(circle, rgba(255,255,255,0.02), transparent 70%)",
        transform:`translateY(${parallaxOffset}px) rotate(${scrollY * 0.02}deg)`,
        pointerEvents:"none"
      }} />
      
      {/* Scanline effect */}
      <div className="scanline" style={{ opacity:0.2 }} />
      <div style={{ maxWidth:"960px", margin:"0 auto", padding:"0 32px" }}>

        {/* Main section */}
        <div style={{ padding:"80px 0 64px", borderBottom:"1px solid rgba(255,255,255,0.1)" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", flexWrap:"wrap", gap:"48px" }}>
            <div style={{ maxWidth:"480px" }}>
              <div style={{ display:"inline-flex", alignItems:"center", gap:"6px",
                padding:"6px 12px", borderRadius:"4px",
                background:"rgba(255,255,255,0.08)", border:"1px solid rgba(255,255,255,0.12)", marginBottom:"24px" }}>
                <div style={{ width:"5px", height:"5px", borderRadius:"50%", background:"#fff" }} />
                <span className="mono" style={{ fontSize:"10px", color:"rgba(255,255,255,0.7)", letterSpacing:"0.08em" }}>GRADUATING JUNE 2026</span>
              </div>
              <h2 style={{ fontFamily:"'Cormorant',Georgia,serif", fontSize:"48px",
                fontWeight:700, color:"#fff", lineHeight:1.1, letterSpacing:"-0.03em", marginBottom:"20px" }}>
                Academic Foundation.<br />Engineering Trajectory.
              </h2>
              <p style={{ fontSize:"15px", color:"rgba(255,255,255,0.5)", lineHeight:1.7 }}>
                Four years of AI & Data Science education through industry internships, professional certifications, and production system implementations.
              </p>
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:"12px", minWidth:"200px" }}>
              <a href="mailto:g.sivasatyasaibhagavan@gmail.com" 
                className="beam-scan"
                style={{ display:"flex", alignItems:"center", justifyContent:"space-between",
                padding:"14px 20px", borderRadius:"6px", textDecoration:"none",
                background:"rgba(255,255,255,0.95)", border:"1px solid rgba(255,255,255,0.2)",
                transition:"all 0.3s cubic-bezier(0.16,1,0.3,1)", color:C.text,
                opacity: inView ? 1 : 0,
                animation: inView ? "scaleIn 0.5s cubic-bezier(0.16,1,0.3,1) 0.3s both, borderGlow 2s ease-in-out infinite" : "none",
                position:"relative",
                overflow:"hidden" }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px) scale(1.02)"; e.currentTarget.style.boxShadow = "0 12px 32px rgba(0,0,0,0.2)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0) scale(1)"; e.currentTarget.style.boxShadow = "none"; }}
              >
                <div>
                  <div className="mono" style={{ fontSize:"9px", color:C.text4, letterSpacing:"0.1em", marginBottom:"4px" }}>PRIMARY</div>
                  <div style={{ fontSize:"14px", fontWeight:600 }}>Schedule Interview</div>
                </div>
                <span style={{ fontSize:"16px", transition:"transform 0.3s ease" }}>→</span>
              </a>
              <a href="#" 
                className="beam-scan glass"
                style={{ display:"flex", alignItems:"center", justifyContent:"space-between",
                padding:"14px 20px", borderRadius:"6px", textDecoration:"none",
                background:"rgba(255,255,255,0.08)", 
                backdropFilter:"blur(10px)",
                border:"1px solid rgba(255,255,255,0.15)",
                transition:"all 0.3s cubic-bezier(0.16,1,0.3,1)", color:"#fff",
                opacity: inView ? 1 : 0,
                animation: inView ? "scaleIn 0.5s cubic-bezier(0.16,1,0.3,1) 0.4s both" : "none",
                position:"relative",
                overflow:"hidden" }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.12)"; e.currentTarget.style.transform = "translateY(-3px)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.08)"; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                <div>
                  <div className="mono" style={{ fontSize:"9px", color:"rgba(255,255,255,0.5)", letterSpacing:"0.1em", marginBottom:"4px" }}>CV</div>
                  <div style={{ fontSize:"14px", fontWeight:600 }}>View Resume</div>
                </div>
                <span style={{ fontSize:"16px" }}>→</span>
              </a>
            </div>
          </div>
        </div>

        {/* Footer grid */}
        <div className="footer-grid" style={{ display:"grid", gridTemplateColumns:"2fr 1fr 1fr 1fr",
          gap:"48px", padding:"48px 0" }}>
          <div>
            <div style={{ fontFamily:"'Cormorant',Georgia,serif", fontSize:"24px", fontWeight:700,
              color:"#fff", letterSpacing:"-0.03em", marginBottom:"12px" }}>
              Bhagavan.
            </div>
            <p style={{ fontSize:"13px", color:"rgba(255,255,255,0.4)", lineHeight:1.7, marginBottom:"20px", maxWidth:"240px" }}>
              B.Tech AIDS · Ramachandra College of Engineering · AI systems engineer in training.
            </p>
            <div style={{ display:"flex", gap:"8px" }}>
              {[
                { label:"GH", href:"https://github.com/bhagavan444" },
                { label:"LI", href:"https://www.linkedin.com/in/gopalajosyula-siva-satya-sai-bhagavan-1624a027b/" },
                { label:"✉",  href:"mailto:g.sivasatyasaibhagavan@gmail.com" },
              ].map((s,i) => (
                <a key={i} href={s.href} target={s.href.startsWith("http")?"_blank":undefined}
                  rel={s.href.startsWith("http")?"noopener noreferrer":undefined}
                  className="mono"
                  style={{ width:"32px", height:"32px", borderRadius:"4px",
                    background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.1)",
                    display:"flex", alignItems:"center", justifyContent:"center",
                    color:"rgba(255,255,255,0.4)", textDecoration:"none", fontSize:"11px",
                    transition:"all 0.2s ease" }}
                  onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.1)"; e.currentTarget.style.color = "#fff"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.color = "rgba(255,255,255,0.4)"; }}
                >{s.label}</a>
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
                <div className="mono" style={{ fontSize:"10px", letterSpacing:"0.12em",
                  textTransform:"uppercase", color:"rgba(255,255,255,0.3)", marginBottom:"16px" }}>{col}</div>
                {links.map((ln,li) => (
                  <a key={li} href={ln.h} target={ln.ext?"_blank":undefined}
                    rel={ln.ext?"noopener noreferrer":undefined}
                    style={{ display:"block", fontSize:"13px", color:"rgba(255,255,255,0.5)",
                      textDecoration:"none", marginBottom:"10px", transition:"color 0.2s ease" }}
                    onMouseEnter={e => e.currentTarget.style.color = "#fff"}
                    onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.5)"}
                  >{ln.l}</a>
                ))}
              </div>
            );
          })}
        </div>

        {/* Bottom */}
        <div style={{ borderTop:"1px solid rgba(255,255,255,0.1)", padding:"24px 0",
          display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:"16px" }}>
          <span className="mono" style={{ fontSize:"11px", color:"rgba(255,255,255,0.3)" }}>
            © 2026 Siva Satya Sai Bhagavan
          </span>
          <span className="mono" style={{ fontSize:"11px", color:"rgba(255,255,255,0.3)" }}>
            Graduating June 2026
          </span>
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN
═══════════════════════════════════════════════════════════════ */
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
        <main style={{ maxWidth:"960px", margin:"0 auto", padding:"160px 32px 0" }}>

          {/* ── HERO ── */}
          <header style={{ marginBottom:"120px", position:"relative",
            opacity: heroIn ? 1 : 0,
            transform: heroIn ? "none" : "translateY(20px)",
            transition:"opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1)",
          }}>
            {/* Morphing blob background */}
            <div className="morph-blob" style={{
              position:"absolute",
              top:"-10%",
              right:"-5%",
              width:"400px",
              height:"400px",
              background:"radial-gradient(circle, rgba(10,10,10,0.02), transparent 70%)",
              filter:"blur(60px)",
              pointerEvents:"none",
              zIndex:-1,
            }} />
            
            {/* Floating particles */}
            {[...Array(5)].map((_, i) => (
              <div key={i} className="particle" style={{
                left:`${20 + i * 15}%`,
                bottom:"20%",
                animationDelay:`${i * 0.8}s`,
                animationDuration:`${3 + i * 0.5}s`,
              }} />
            ))}
            {/* Overline */}
            <div style={{ display:"flex", alignItems:"center", gap:"12px", marginBottom:"32px" }}>
              <div style={{ width:"32px", height:"1px", background:C.accent,
                animation: heroIn ? "lineExpand 0.6s cubic-bezier(0.16,1,0.3,1) 0.3s both" : "none" }} />
              <span className="mono" style={{ fontSize:"11px", letterSpacing:"0.12em",
                textTransform:"uppercase", color:C.text4 }}>Academic Record · 2019 – 2026</span>
            </div>

            {/* Title */}
            <div style={{ marginBottom:"32px" }}>
              <h1 className="shimmer-text text-reveal neon-glow" style={{ fontFamily:"'Cormorant',Georgia,serif",
                fontSize:"clamp(56px,10vw,80px)", fontWeight:700,
                letterSpacing:"-0.035em", lineHeight:0.95, marginBottom:"8px" }}>Academic Foundation</h1>
            </div>

            <p style={{ fontSize:"18px", color:C.text3, lineHeight:1.7, maxWidth:"600px", marginBottom:"64px" }}>
              Formal education in Artificial Intelligence and Data Science. Each stage built the analytical infrastructure for production system design and deployment.
            </p>

            {/* Summary strip */}
            <div className="hero-strip" style={{ display:"grid", gridTemplateColumns:"repeat(3, 1fr)", gap:"32px",
              paddingTop:"32px", borderTop:`1px solid ${C.border}` }}>
              {[
                ["B.Tech, AI & DS",    "Current Program"],
                ["2022 – 2026",        "Duration"],
                ["JNTUK Affiliated",   "University"],
              ].map(([v,l], i) => (
                <div key={l} style={{
                  opacity: heroIn ? 1 : 0,
                  animation: heroIn ? `slideRight 0.5s cubic-bezier(0.16,1,0.3,1) ${0.5 + i * 0.1}s both` : "none"
                }}>
                  <div style={{ fontSize:"16px", fontWeight:600, color:C.text2, marginBottom:"6px" }}>{v}</div>
                  <div className="mono" style={{ fontSize:"11px", letterSpacing:"0.08em",
                    textTransform:"uppercase", color:C.text4 }}>{l}</div>
                </div>
              ))}
            </div>
          </header>

          {/* ── DIVIDER ── */}
          <div style={{ display:"flex", alignItems:"center", gap:"16px", marginBottom:"80px" }}>
            <span className="mono" style={{ fontSize:"11px", letterSpacing:"0.12em",
              textTransform:"uppercase", color:C.text4, flexShrink:0 }}>Chronological</span>
            <div style={{ flex:1, height:"1px", background:C.border }} />
          </div>

          {/* ── B.TECH ── */}
          <BtechBlock edu={btech} onOpen={setDrawer} />

          {/* ── SECONDARY DIVIDER ── */}
          <div style={{ display:"flex", alignItems:"center", gap:"16px", marginBottom:"40px" }}>
            <span className="mono" style={{ fontSize:"11px", letterSpacing:"0.12em",
              textTransform:"uppercase", color:C.text5, flexShrink:0 }}>Prior Education</span>
            <div style={{ flex:1, height:"1px", background:C.border }} />
          </div>

          {/* ── SECONDARY ── */}
          {secondary.map((edu, i) => (
            <SecondaryRow key={edu.id} edu={edu} delay={i * 0.08} onOpen={setDrawer} />
          ))}

          {/* ── FOOTER NOTE ── */}
          <div style={{ marginTop:"80px", paddingTop:"32px", borderTop:`1px solid ${C.border}`,
            display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:"16px" }}>
            <p className="mono" style={{ fontSize:"12px", color:C.text4, lineHeight:1.6 }}>
              All credentials verifiable via linked certificates.
            </p>
            <span className="mono" style={{ fontSize:"11px", color:C.text5, letterSpacing:"0.08em" }}>
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