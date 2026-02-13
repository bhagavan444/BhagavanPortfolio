"use client";

import React, { useState, useEffect, useRef } from "react";

/* ═══════════════════════════════════════════════════════════════
   DESIGN TOKENS — Monochrome white. Architecture-first.
═══════════════════════════════════════════════════════════════ */
const C = {
  bg:      "#fafaf8",
  surface: "#f4f3ef",
  raised:  "#edecea",
  border:  "rgba(0,0,0,0.07)",
  border2: "rgba(0,0,0,0.11)",
  border3: "rgba(0,0,0,0.16)",
  text:    "#0c0c0a",
  sub:     "#3a3a36",
  muted:   "#6b6860",
  faint:   "#b8b6b0",
  a1:      "#1a1aff",            // electric blue  — B.Tech
  a1s:     "rgba(26,26,255,0.07)",
  a1l:     "rgba(26,26,255,0.2)",
  a2:      "#7c3aed",            // violet          — Intermediate
  a2s:     "rgba(124,58,237,0.07)",
  a3:      "#0a9060",            // green           — SSC
  a3s:     "rgba(10,144,96,0.07)",
  gn:      "#0a9060",
  gnS:     "rgba(10,144,96,0.08)",
  gnL:     "rgba(10,144,96,0.22)",
};

/* ═══════════════════════════════════════════════════════════════
   GLOBAL CSS
═══════════════════════════════════════════════════════════════ */
const GCSS = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Syne:wght@400;500;600;700;800&family=DM+Mono:wght@400;500&display=swap');

  *, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }
  html { scroll-behavior:smooth; overflow-x:hidden; }
  body {
    font-family:'Syne',system-ui,sans-serif;
    background:${C.bg}; color:${C.text};
    -webkit-font-smoothing:antialiased;
  }
  ::selection { background:rgba(26,26,255,0.1); color:${C.text}; }
  ::-webkit-scrollbar { width:5px; }
  ::-webkit-scrollbar-track { background:${C.bg}; }
  ::-webkit-scrollbar-thumb { background:rgba(26,26,255,0.2); border-radius:3px; }
  ::-webkit-scrollbar-thumb:hover { background:rgba(26,26,255,0.38); }

  @keyframes fadeUp {
    from { opacity:0; transform:translateY(24px); }
    to   { opacity:1; transform:translateY(0); }
  }
  @keyframes lineGrow {
    from { transform:scaleX(0); transform-origin:left; }
    to   { transform:scaleX(1); transform-origin:left; }
  }
  @keyframes slideIn {
    from { transform:scaleX(0); transform-origin:left; }
    to   { transform:scaleX(1); transform-origin:left; }
  }
  @keyframes pulseDot {
    0%,100% { box-shadow:0 0 0 0 rgba(10,144,96,0.4); }
    60%      { box-shadow:0 0 0 7px rgba(10,144,96,0); }
  }
  @keyframes drawerIn {
    from { transform:translateX(100%); opacity:0; }
    to   { transform:translateX(0); opacity:1; }
  }
  @keyframes shimmer {
    0%   { transform:translateX(-100%) skewX(-10deg); }
    100% { transform:translateX(280%) skewX(-10deg); }
  }

  .mono { font-family:'DM Mono',monospace; }
  .sh { position:relative; overflow:hidden; }
  .sh::after {
    content:''; position:absolute; inset:0;
    background:linear-gradient(105deg,transparent 38%,rgba(255,255,255,0.6) 50%,transparent 62%);
    transform:translateX(-100%) skewX(-10deg); pointer-events:none;
  }
  .sh:hover::after { animation:shimmer 0.55s ease forwards; }

  /* outcome row */
  .out-row {
    display:flex; gap:0.85rem; align-items:flex-start;
    padding:0.8rem 0; border-bottom:1px solid ${C.border};
    transition:all 0.2s ease;
  }
  .out-row:last-child { border-bottom:none; }
  .out-row:hover { padding-left:5px; }

  /* skill chip */
  .chip {
    padding:0.28rem 0.75rem; border-radius:5px;
    background:${C.surface}; border:1px solid ${C.border};
    font-size:0.72rem; font-family:'DM Mono',monospace; color:${C.muted};
    transition:all 0.2s ease;
  }

  @media (max-width:1024px) {
    .btech-grid { grid-template-columns:1fr !important; }
  }
  @media (max-width:768px) {
    .hero-strip { flex-direction:column !important; gap:1.2rem !important; }
    .hero-strip-item { border-right:none !important; padding-right:0 !important; margin-right:0 !important;
      border-bottom:1px solid ${C.border} !important; padding-bottom:1.2rem !important; }
    .hero-strip-item:last-child { border-bottom:none !important; padding-bottom:0 !important; }
    .drawer-inner { width:100vw !important; }
    .footer-mega  { grid-template-columns:1fr !important; }
    .footer-bot   { flex-direction:column !important; align-items:flex-start !important; }
  }
`;

/* ═══════════════════════════════════════════════════════════════
   DATA — Credibility-calibrated. No inflated claims.
═══════════════════════════════════════════════════════════════ */
const EDU = [
  {
    id:"btech", idx:"01",
    level:"Undergraduate", primary:true,
    degree:"B.Tech",
    stream:"Artificial Intelligence & Data Science",
    institution:"Ramachandra College of Engineering",
    affiliation:"JNTUK — Jawaharlal Nehru Technological University",
    duration:"2022 – 2026",
    score:"7.9 CGPA",
    location:"Eluru, Andhra Pradesh",
    status:"current",
    certId:"1wxnzvsS3MA7xWSxuXKeIkS8GaQoG4Y1a",
    accent: C.a1, accentS: C.a1s, accentL: C.a1l,

    synopsis:"Focused on applied machine learning and full-stack system design, with emphasis on deploying models beyond academic experimentation into working web interfaces.",

    outcomes:[
      { label:"10+ ML systems implemented",       detail:"NLP, computer vision & recommendation pipelines — built and deployed to demo environments" },
      { label:"AI/ML internships at tech firms",   detail:"Blackbucks, SmartBridge & StudyOwl — industry codebases, real data, production constraints" },
      { label:"20+ professional certifications",   detail:"AWS cloud practitioner, TensorFlow, React — applied through projects, not collected for show" },
      { label:"Hackathon finalist recognition",    detail:"Placed in 24-hour multi-institution competitive builds" },
    ],

    coursework:["Machine Learning","Deep Learning","Computer Vision","NLP","Data Structures","MERN Stack","Python","Probability & Statistics","Database Systems","Cloud Computing"],

    stats:[ { v:"7.9", l:"CGPA" }, { v:"10+", l:"Systems Built" }, { v:"20+", l:"Certifications" } ],
  },
  {
    id:"inter", idx:"02",
    level:"Pre-University", primary:false,
    degree:"Intermediate — MPC",
    stream:"Mathematics, Physics & Chemistry",
    institution:"Srividhya Junior College",
    affiliation:"Board of Intermediate Education, AP",
    duration:"2020 – 2022",
    score:"7.8 CGPA",
    location:"Gudivada, Andhra Pradesh",
    status:"completed",
    certId:"1N1K1j6QGrgNPNL2D9UmfJAL2PVSulhPJ",
    accent: C.a2, accentS: C.a2s, accentL:"rgba(124,58,237,0.2)",

    synopsis:"Pre-engineering foundation grounded in calculus, analytical geometry, and physical reasoning — the mathematical instincts that drive every optimization decision today.",
    outcomes:[
      { label:"Strong mathematics foundation",    detail:"Calculus, algebra, analytical geometry — core to ML optimization" },
      { label:"Applied physics grounding",         detail:"First-principles thinking transferred directly to systems reasoning" },
    ],
    stats:[ { v:"7.8", l:"CGPA" } ],
  },
  {
    id:"ssc", idx:"03",
    level:"Secondary School", primary:false,
    degree:"Secondary — SSC",
    stream:"SSC Board Examination",
    institution:"Montessori English Medium High School",
    affiliation:"SSC Board of AP",
    duration:"2019 – 2020",
    score:"9.5 GPA",
    location:"Gudivada, Andhra Pradesh",
    status:"completed",
    certId:"1p1RXnVn9jySamu8OiIWF0WFhe7G6QxiL",
    accent: C.a3, accentS: C.a3s, accentL:"rgba(10,144,96,0.2)",

    synopsis:"Completed with distinction. A full score in Mathematics was the first signal of an aptitude for structured, logical reasoning.",
    outcomes:[
      { label:"9.5 GPA — graduation with distinction",   detail:"Ranked among top performers in graduating class" },
      { label:"100% score in Mathematics",               detail:"The subject that anchors every technical decision since" },
    ],
    stats:[ { v:"9.5", l:"GPA" } ],
  },
];

const thumbUrl  = (id) => `https://lh3.googleusercontent.com/d/${id}`;
const driveUrl  = (id) => `https://drive.google.com/file/d/${id}/view`;

/* ═══════════════════════════════════════════════════════════════
   INTERSECTION OBSERVER
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

/* ═══════════════════════════════════════════════════════════════
   SCROLL PROGRESS
═══════════════════════════════════════════════════════════════ */
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
    <div style={{ position:"fixed",top:0,left:0,right:0,height:"2px",background:C.surface,zIndex:9999,pointerEvents:"none" }}>
      <div style={{ height:"100%",width:`${p}%`,background:C.a1,transition:"width 0.1s linear" }} />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   CERTIFICATE THUMBNAIL
═══════════════════════════════════════════════════════════════ */
function CertThumb({ edu, height="240px", onClick }) {
  const [loaded, setLoaded] = useState(false);
  const [err,    setErr]    = useState(false);
  const [hov,    setHov]    = useState(false);

  return (
    <div onClick={onClick}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ position:"relative", height, borderRadius:"14px", overflow:"hidden",
        background:C.raised, border:`1px solid ${C.border}`,
        cursor: onClick ? "pointer" : "default", flexShrink:0,
        transition:"all 0.38s cubic-bezier(0.16,1,0.3,1)",
        transform: hov ? "scale(1.02) translateY(-3px)" : "scale(1)",
        boxShadow: hov ? "0 18px 52px rgba(0,0,0,0.09)" : "0 3px 12px rgba(0,0,0,0.04)",
      }}>
      {!err ? (
        <img src={thumbUrl(edu.certId)} alt={`${edu.degree} certificate`}
          onLoad={() => setLoaded(true)} onError={() => setErr(true)}
          style={{ width:"100%", height:"100%", objectFit:"cover", display:"block",
            opacity: loaded ? 1 : 0, transition:"opacity 0.4s ease, transform 0.5s cubic-bezier(0.16,1,0.3,1)",
            transform: hov ? "scale(1.04)" : "scale(1)" }} />
      ) : (
        <div style={{ width:"100%", height:"100%", display:"flex", flexDirection:"column",
          alignItems:"center", justifyContent:"center", gap:"10px" }}>
          <span style={{ fontFamily:"'DM Mono',monospace", fontSize:"36px", color:C.faint }}>◱</span>
          <span className="mono" style={{ fontSize:"10px", letterSpacing:"0.15em", color:C.muted, textTransform:"uppercase" }}>Certificate</span>
        </div>
      )}

      {/* Gradient fade */}
      <div style={{ position:"absolute", inset:0,
        background:"linear-gradient(to top,rgba(250,250,248,0.9) 0%,rgba(250,250,248,0.2) 55%,transparent 100%)",
        pointerEvents:"none" }} />

      {/* Top accent line */}
      <div style={{ position:"absolute", top:0, left:0, right:0, height:"2.5px",
        background:`linear-gradient(90deg, ${edu.accent}, transparent 75%)` }} />

      {/* Status badge */}
      {edu.status === "current" ? (
        <div style={{ position:"absolute", top:"12px", right:"12px",
          display:"flex", alignItems:"center", gap:"6px",
          padding:"5px 12px", borderRadius:"999px",
          background:C.gnS, border:`1px solid ${C.gnL}` }}>
          <div style={{ width:"6px", height:"6px", borderRadius:"50%", background:C.gn, animation:"pulseDot 2s ease-in-out infinite" }} />
          <span className="mono" style={{ fontSize:"9px", letterSpacing:"0.12em", color:C.gn, textTransform:"uppercase", fontWeight:500 }}>Active</span>
        </div>
      ) : (
        <div style={{ position:"absolute", top:"12px", right:"12px",
          padding:"5px 12px", borderRadius:"999px",
          background:"rgba(0,0,0,0.04)", border:`1px solid ${C.border}` }}>
          <span className="mono" style={{ fontSize:"9px", letterSpacing:"0.12em", color:C.muted, textTransform:"uppercase" }}>Completed</span>
        </div>
      )}

      {/* View link */}
      {onClick && (
        <div style={{ position:"absolute", bottom:"12px", right:"12px" }}>
          <a href={driveUrl(edu.certId)} target="_blank" rel="noopener noreferrer"
            onClick={e => e.stopPropagation()}
            className="sh"
            style={{ display:"inline-flex", alignItems:"center", gap:"5px",
              padding:"7px 14px", borderRadius:"8px",
              background:"rgba(255,255,255,0.92)", border:`1px solid ${C.border2}`,
              color:C.sub, fontFamily:"'DM Mono',monospace", fontSize:"10px",
              letterSpacing:"0.08em", textDecoration:"none",
              transition:"all 0.25s ease", fontWeight:500 }}
            onMouseEnter={e => { e.currentTarget.style.background = edu.accentS; e.currentTarget.style.borderColor = edu.accentL; e.currentTarget.style.color = edu.accent; }}
            onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.92)"; e.currentTarget.style.borderColor = C.border2; e.currentTarget.style.color = C.sub; }}
          >VIEW ↗</a>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   DRAWER
═══════════════════════════════════════════════════════════════ */
function Drawer({ edu, onClose }) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const raf = requestAnimationFrame(() => setOpen(true));
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { cancelAnimationFrame(raf); document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [onClose]);

  return (
    <div onClick={onClose} style={{
      position:"fixed", inset:0, zIndex:9000,
      background:"rgba(0,0,0,0.38)", backdropFilter:"blur(10px)",
      opacity: open ? 1 : 0, transition:"opacity 0.3s ease",
    }}>
      <div onClick={e => e.stopPropagation()} className="drawer-inner" style={{
        position:"fixed", top:0, right:0, bottom:0, width:"min(560px,100vw)",
        background:"#fff", borderLeft:`1px solid ${C.border2}`,
        display:"flex", flexDirection:"column", overflowY:"auto",
        transform: open ? "translateX(0)" : "translateX(60px)",
        opacity: open ? 1 : 0,
        transition:"transform 0.4s cubic-bezier(0.16,1,0.3,1), opacity 0.35s ease",
        boxShadow:"-12px 0 52px rgba(0,0,0,0.12)",
      }}>
        {/* top accent */}
        <div style={{ position:"absolute", top:0, left:0, right:0, height:"2.5px",
          background:`linear-gradient(90deg, ${edu.accent}, transparent 65%)` }} />

        {/* Header */}
        <div style={{ position:"sticky", top:0, zIndex:10, background:"rgba(255,255,255,0.97)",
          backdropFilter:"blur(16px)", borderBottom:`1px solid ${C.border}`,
          padding:"1.6rem 2rem", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <div>
            <span className="mono" style={{ fontSize:"0.62rem", letterSpacing:"0.16em", textTransform:"uppercase",
              color:C.muted, display:"block", marginBottom:"0.4rem" }}>{edu.level} · {edu.affiliation.split(" — ")[0] || edu.affiliation}</span>
            <div style={{ fontFamily:"'Cormorant',Georgia,serif", fontSize:"1.8rem", fontWeight:600,
              color:C.text, letterSpacing:"-0.025em" }}>{edu.degree}</div>
          </div>
          <button onClick={onClose} style={{ width:"38px", height:"38px", borderRadius:"9px",
            border:`1px solid ${C.border}`, background:"transparent", color:C.muted,
            cursor:"pointer", fontSize:"1.25rem", display:"flex", alignItems:"center",
            justifyContent:"center", transition:"all 0.2s ease", lineHeight:1 }}
          onMouseEnter={e => { e.currentTarget.style.background = C.surface; e.currentTarget.style.borderColor = C.border2; e.currentTarget.style.color = C.text; }}
          onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.muted; }}
          >×</button>
        </div>

        {/* Body */}
        <div style={{ padding:"2rem", display:"flex", flexDirection:"column", gap:"2rem" }}>
          <CertThumb edu={edu} height="200px" />

          {/* Meta grid */}
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1px",
            background:C.border, borderRadius:"12px", overflow:"hidden" }}>
            {[["Institution",edu.institution],["Score",edu.score],["Duration",edu.duration],["Location",edu.location]].map(([k,v]) => (
              <div key={k} style={{ background:"#fff", padding:"1rem 1.2rem" }}>
                <div className="mono" style={{ fontSize:"0.6rem", letterSpacing:"0.15em", textTransform:"uppercase",
                  color:C.muted, marginBottom:"0.4rem" }}>{k}</div>
                <div style={{ fontSize:"0.88rem", fontWeight:600, color:C.text, lineHeight:1.4 }}>{v}</div>
              </div>
            ))}
          </div>

          {/* Synopsis */}
          <div style={{ borderLeft:`3px solid ${edu.accent}`, paddingLeft:"1.2rem",
            background:C.surface, padding:"1.2rem 1.2rem 1.2rem 1.4rem", borderRadius:"0 10px 10px 0" }}>
            <p style={{ fontSize:"0.875rem", color:C.sub, lineHeight:1.8 }}>{edu.synopsis}</p>
          </div>

          {/* Outcomes */}
          <div>
            <div className="mono" style={{ fontSize:"0.6rem", letterSpacing:"0.16em", textTransform:"uppercase",
              color:C.muted, marginBottom:"1rem" }}>Key Outcomes</div>
            {edu.outcomes.map((o,i) => (
              <div key={i} style={{ display:"flex", gap:"0.85rem", alignItems:"flex-start",
                padding:"0.85rem 1rem", background:"#fff", border:`1px solid ${C.border}`,
                borderRadius:"9px", marginBottom:"0.5rem", transition:"all 0.2s ease" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = C.border2; e.currentTarget.style.transform = "translateX(4px)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.transform = "translateX(0)"; }}
              >
                <div style={{ width:"5px", height:"5px", borderRadius:"50%", background:edu.accent,
                  flexShrink:0, marginTop:"6px" }} />
                <div>
                  <div style={{ fontSize:"0.82rem", fontWeight:600, color:C.text, marginBottom:"0.2rem" }}>{o.label}</div>
                  <div style={{ fontSize:"0.77rem", color:C.muted, lineHeight:1.65 }}>{o.detail}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Coursework (B.Tech only) */}
          {edu.coursework && (
            <div>
              <div className="mono" style={{ fontSize:"0.6rem", letterSpacing:"0.16em", textTransform:"uppercase",
                color:C.muted, marginBottom:"0.9rem" }}>Core Coursework</div>
              <div style={{ display:"flex", flexWrap:"wrap", gap:"0.45rem" }}>
                {edu.coursework.map(s => (
                  <span key={s} className="chip">{s}</span>
                ))}
              </div>
            </div>
          )}

          {/* Full certificate link */}
          <a href={driveUrl(edu.certId)} target="_blank" rel="noopener noreferrer"
            className="sh"
            style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:"0.6rem",
              padding:"1rem", borderRadius:"10px", background:edu.accentS, border:`1px solid ${edu.accentL}`,
              color:edu.accent, textDecoration:"none", fontFamily:"'DM Mono',monospace",
              fontSize:"0.72rem", letterSpacing:"0.1em", transition:"all 0.25s ease", fontWeight:500 }}
            onMouseEnter={e => { e.currentTarget.style.opacity = "0.85"; e.currentTarget.style.transform = "translateY(-2px)"; }}
            onMouseLeave={e => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "translateY(0)"; }}
          >OPEN FULL CERTIFICATE ↗</a>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   B.TECH BLOCK — Large, dominant, structured
═══════════════════════════════════════════════════════════════ */
function BtechBlock({ edu, onOpen }) {
  const [ref, inView] = useInView(0.06);
  const [hov, setHov] = useState(false);

  return (
    <div ref={ref} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0)" : "translateY(28px)",
      transition:"opacity 0.75s cubic-bezier(0.16,1,0.3,1), transform 0.75s cubic-bezier(0.16,1,0.3,1)",
      marginBottom:"6rem",
    }}>
      {/* Section label */}
      <div style={{ display:"flex", alignItems:"center", gap:"0.7rem", marginBottom:"1.8rem" }}>
        <span className="mono" style={{ fontSize:"0.62rem", letterSpacing:"0.2em", textTransform:"uppercase", color:edu.accent }}>{edu.idx}</span>
        <div style={{ width:"22px", height:"1.5px", background:edu.accent, borderRadius:"1px",
          animation: inView ? "lineGrow 0.5s ease 0.2s both" : "none" }} />
        <span className="mono" style={{ fontSize:"0.62rem", letterSpacing:"0.15em", textTransform:"uppercase", color:C.muted }}>{edu.level}</span>
        <span style={{ display:"flex", alignItems:"center", gap:"5px", padding:"3px 10px", borderRadius:"999px",
          background:C.gnS, border:`1px solid ${C.gnL}`, marginLeft:"0.3rem" }}>
          <div style={{ width:"5px", height:"5px", borderRadius:"50%", background:C.gn, animation:"pulseDot 2s ease-in-out infinite" }} />
          <span className="mono" style={{ fontSize:"0.6rem", color:C.gn, letterSpacing:"0.1em" }}>In Progress</span>
        </span>
      </div>

      {/* Meta row */}
      <div style={{ marginBottom:"1.5rem" }}>
        <div className="mono" style={{ fontSize:"0.72rem", color:C.muted, marginBottom:"0.5rem" }}>
          {edu.duration} · {edu.institution}
        </div>
        <h2 style={{ fontFamily:"'Cormorant',Georgia,serif", fontSize:"clamp(2.6rem,6vw,4.5rem)",
          fontWeight:700, color:C.text, lineHeight:1.03, letterSpacing:"-0.03em", marginBottom:"0.3rem" }}>
          {edu.degree}
        </h2>
        <div style={{ fontSize:"1.1rem", fontWeight:700, color:edu.accent, marginBottom:"0.3rem" }}>{edu.stream}</div>
        <div style={{ fontSize:"0.88rem", color:C.muted }}>{edu.affiliation}</div>
        {/* underline */}
        <div style={{ width:"110px", height:"2.5px", background:edu.accent, borderRadius:"1.5px", marginTop:"1.2rem",
          animation: inView ? "lineGrow 0.55s ease 0.25s both" : "none" }} />
      </div>

      {/* Main 2-column card */}
      <div
        className="btech-grid sh"
        onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
        style={{ display:"grid", gridTemplateColumns:"260px 1fr", gap:0,
          background:"#fff", borderRadius:"18px",
          border:`1px solid ${hov ? C.border2 : C.border}`,
          overflow:"hidden",
          transition:"all 0.35s cubic-bezier(0.16,1,0.3,1)",
          boxShadow: hov ? "0 20px 64px rgba(0,0,0,0.08)" : "0 4px 18px rgba(0,0,0,0.03)",
        }}>

        {/* Left: Certificate */}
        <div style={{ minHeight:"340px" }}>
          <CertThumb edu={edu} height="100%" onClick={() => onOpen(edu)} />
        </div>

        {/* Right: Content */}
        <div style={{ padding:"2.2rem 2.5rem", display:"flex", flexDirection:"column",
          justifyContent:"space-between", gap:"1.5rem", borderLeft:`1px solid ${C.border}` }}>

          {/* Score + synopsis */}
          <div>
            <div style={{ display:"flex", alignItems:"baseline", gap:"0.6rem", marginBottom:"0.75rem" }}>
              <span className="mono" style={{ fontSize:"0.62rem", letterSpacing:"0.14em", textTransform:"uppercase", color:C.muted }}>CGPA</span>
              <span style={{ fontFamily:"'Cormorant',Georgia,serif", fontSize:"2rem", fontWeight:700,
                color:edu.accent, letterSpacing:"-0.03em", lineHeight:1 }}>{edu.score.replace(" CGPA","")}</span>
            </div>
            <p style={{ fontSize:"0.875rem", color:C.sub, lineHeight:1.78, maxWidth:"420px" }}>{edu.synopsis}</p>
          </div>

          {/* Outcomes */}
          <div>
            <div className="mono" style={{ fontSize:"0.6rem", letterSpacing:"0.16em", textTransform:"uppercase",
              color:C.muted, marginBottom:"0.75rem" }}>Outcomes</div>
            {edu.outcomes.map((o, i) => (
              <div key={i} className="out-row">
                <div style={{ width:"5px", height:"5px", borderRadius:"50%", background:edu.accent, flexShrink:0, marginTop:"7px" }} />
                <div>
                  <div style={{ fontSize:"0.82rem", fontWeight:600, color:C.text, marginBottom:"0.15rem" }}>{o.label}</div>
                  <div style={{ fontSize:"0.75rem", color:C.muted, lineHeight:1.6 }}>{o.detail}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Stats + CTA */}
          <div style={{ paddingTop:"1.4rem", borderTop:`1px solid ${C.border}`,
            display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:"1rem" }}>
            <div style={{ display:"flex", gap:"2rem" }}>
              {edu.stats.map(s => (
                <div key={s.l} style={{ textAlign:"center" }}>
                  <div style={{ fontFamily:"'Cormorant',Georgia,serif", fontSize:"1.7rem", fontWeight:700,
                    color:edu.accent, lineHeight:1, letterSpacing:"-0.03em" }}>{s.v}</div>
                  <div className="mono" style={{ fontSize:"0.58rem", letterSpacing:"0.14em",
                    textTransform:"uppercase", color:C.muted, marginTop:"4px" }}>{s.l}</div>
                </div>
              ))}
            </div>
            <button onClick={() => onOpen(edu)}
              className="sh"
              style={{ display:"inline-flex", alignItems:"center", gap:"0.5rem",
                padding:"0.7rem 1.3rem", borderRadius:"9px",
                border:`1px solid ${C.border2}`, background:"transparent",
                color:C.sub, fontFamily:"'DM Mono',monospace", fontSize:"0.7rem",
                letterSpacing:"0.08em", cursor:"pointer", transition:"all 0.25s ease", fontWeight:500 }}
              onMouseEnter={e => { e.currentTarget.style.background = edu.accentS; e.currentTarget.style.borderColor = edu.accentL; e.currentTarget.style.color = edu.accent; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = C.border2; e.currentTarget.style.color = C.sub; e.currentTarget.style.transform = "translateY(0)"; }}
            >FULL DETAILS →</button>
          </div>
        </div>
      </div>

      {/* Coursework chips */}
      <div style={{ display:"flex", flexWrap:"wrap", gap:"0.4rem", marginTop:"1.2rem" }}>
        {edu.coursework.map(s => (
          <span key={s} className="chip"
            onMouseEnter={e => { e.currentTarget.style.background = edu.accentS; e.currentTarget.style.borderColor = edu.accentL; e.currentTarget.style.color = edu.accent; }}
            onMouseLeave={e => { e.currentTarget.style.background = C.surface; e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.muted; }}
          >{s}</span>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SECONDARY ROW — Compact, lower visual weight
═══════════════════════════════════════════════════════════════ */
function SecondaryRow({ edu, delay, onOpen }) {
  const [ref, inView] = useInView(0.1);
  const [hov, setHov] = useState(false);

  return (
    <div ref={ref} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0)" : "translateY(20px)",
      transition:`opacity 0.65s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.65s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
      marginBottom:"2rem",
    }}>
      <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
        className="sh"
        style={{ display:"grid", gridTemplateColumns:"150px 1fr", gap:0,
          background:"#fff", border:`1px solid ${hov ? C.border2 : C.border}`,
          borderRadius:"14px", overflow:"hidden",
          transition:"all 0.3s cubic-bezier(0.16,1,0.3,1)",
          boxShadow: hov ? "0 12px 40px rgba(0,0,0,0.06)" : "0 2px 10px rgba(0,0,0,0.02)",
        }}>

        {/* Left: small thumb */}
        <div style={{ minHeight:"140px" }}>
          <CertThumb edu={edu} height="100%" onClick={() => onOpen(edu)} />
        </div>

        {/* Right: compact content */}
        <div style={{ padding:"1.4rem 1.8rem", display:"flex", flexDirection:"column",
          justifyContent:"space-between", gap:"0.8rem", borderLeft:`1px solid ${C.border}` }}>
          <div>
            <div style={{ display:"flex", alignItems:"center", gap:"0.6rem", marginBottom:"0.4rem", flexWrap:"wrap" }}>
              <span className="mono" style={{ fontSize:"0.6rem", letterSpacing:"0.14em", textTransform:"uppercase", color:edu.accent }}>{edu.idx}</span>
              <span className="mono" style={{ fontSize:"0.6rem", letterSpacing:"0.12em", textTransform:"uppercase", color:C.muted }}>· {edu.level} · {edu.duration}</span>
            </div>
            <h3 style={{ fontFamily:"'Cormorant',Georgia,serif", fontSize:"1.5rem", fontWeight:600,
              color:C.text, letterSpacing:"-0.02em", lineHeight:1.1, marginBottom:"0.2rem" }}>{edu.degree}</h3>
            <div style={{ fontSize:"0.8rem", color:C.sub }}>
              {edu.stream}
              <span style={{ color:C.faint, margin:"0 0.4rem" }}>·</span>
              <span style={{ color:C.muted }}>{edu.institution}</span>
            </div>
          </div>

          {/* Outcomes (label only) */}
          <div style={{ display:"flex", flexDirection:"column", gap:"0.3rem" }}>
            {edu.outcomes.map((o,i) => (
              <div key={i} style={{ display:"flex", alignItems:"center", gap:"0.6rem" }}>
                <div style={{ width:"4px", height:"4px", borderRadius:"50%", background:edu.accent, flexShrink:0 }} />
                <span style={{ fontSize:"0.78rem", fontWeight:600, color:C.sub }}>{o.label}</span>
              </div>
            ))}
          </div>

          {/* Score + view */}
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:"0.6rem" }}>
            <span style={{ fontFamily:"'Cormorant',Georgia,serif", fontSize:"1.3rem", fontWeight:700,
              color:edu.accent, letterSpacing:"-0.03em" }}>{edu.score}</span>
            <button onClick={() => onOpen(edu)}
              style={{ padding:"6px 14px", borderRadius:"7px",
                border:`1px solid ${C.border}`, background:"transparent",
                color:C.muted, fontFamily:"'DM Mono',monospace", fontSize:"0.65rem",
                letterSpacing:"0.08em", cursor:"pointer", transition:"all 0.22s ease", fontWeight:500 }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = C.border2; e.currentTarget.style.color = C.text; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.muted; }}
            >VIEW →</button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MEGA FOOTER
═══════════════════════════════════════════════════════════════ */
function MegaFooter() {
  const [ref, inView] = useInView(0.05);
  return (
    <footer ref={ref} style={{ background:"#0c0c0a", marginTop:"6rem", position:"relative", overflow:"hidden" }}>
      {/* wave */}
      <div style={{ position:"relative", height:"60px", background:C.bg, overflow:"hidden" }}>
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none"
          style={{ position:"absolute", bottom:0, left:0, width:"100%", height:"100%" }}>
          <path d="M0,0 C360,60 720,0 1080,30 C1260,48 1380,15 1440,30 L1440,60 L0,60 Z" fill="#0c0c0a" />
        </svg>
      </div>

      {/* glow */}
      <div style={{ position:"absolute", left:"-5%", top:"20%", width:"420px", height:"420px",
        borderRadius:"50%", background:"radial-gradient(circle,rgba(26,26,255,0.11),transparent 70%)",
        filter:"blur(70px)", pointerEvents:"none" }} />
      <div style={{ position:"absolute", right:"0", bottom:"0", width:"280px", height:"280px",
        borderRadius:"50%", background:"radial-gradient(circle,rgba(10,144,96,0.08),transparent 70%)",
        filter:"blur(55px)", pointerEvents:"none" }} />

      <div style={{ maxWidth:"1240px", margin:"0 auto", padding:"0 2.5rem", position:"relative", zIndex:1 }}>

        {/* Brand statement */}
        <div style={{ borderBottom:"1px solid rgba(255,255,255,0.07)", padding:"4rem 0",
          opacity: inView ? 1 : 0,
          animation: inView ? "fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) both" : "none" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", flexWrap:"wrap", gap:"2.5rem" }}>
            <div style={{ maxWidth:"520px" }}>
              <div style={{ display:"inline-flex", alignItems:"center", gap:"0.5rem",
                padding:"0.38rem 0.9rem", borderRadius:"999px",
                background:"rgba(10,144,96,0.1)", border:"1px solid rgba(10,144,96,0.25)", marginBottom:"1.5rem" }}>
                <div style={{ width:"5px", height:"5px", borderRadius:"50%", background:C.gn, animation:"pulseDot 2s ease-in-out infinite" }} />
                <span className="mono" style={{ fontSize:"0.62rem", color:C.gn }}>FINAL YEAR · GRADUATING JUNE 2026</span>
              </div>
              <h2 style={{ fontFamily:"'Cormorant',Georgia,serif", fontSize:"clamp(2.5rem,5vw,4.2rem)",
                fontWeight:700, color:"#fff", lineHeight:1.02, letterSpacing:"-0.03em", marginBottom:"1rem" }}>
                Academic Foundation.<br />
                <span style={{ color:C.a1 }}>Engineering Trajectory.</span>
              </h2>
              <p style={{ fontSize:"0.9rem", color:"rgba(255,255,255,0.42)", lineHeight:1.8, maxWidth:"400px" }}>
                Four years of formal AI & Data Science education, delivered through 3 industry internships, 20+ certifications, and 10+ implemented systems.
              </p>
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:"0.75rem", minWidth:"240px" }}>
              {[
                { label:"Schedule Interview", sub:"PRIMARY", href:"mailto:g.sivasatyasaibhagavan@gmail.com", accent:true },
                { label:"View Resume",         sub:"CV",      href:"#",   accent:false },
              ].map((x,i) => (
                <a key={i} href={x.href} style={{ display:"flex", alignItems:"center", justifyContent:"space-between",
                  padding:"1.1rem 1.4rem", borderRadius:"11px", textDecoration:"none",
                  background: x.accent ? "rgba(26,26,255,0.14)" : "rgba(255,255,255,0.04)",
                  border:`1px solid ${x.accent ? "rgba(26,26,255,0.32)" : "rgba(255,255,255,0.08)"}`,
                  transition:"all 0.25s ease" }}
                onMouseEnter={e => { e.currentTarget.style.background = x.accent ? "rgba(26,26,255,0.25)" : "rgba(255,255,255,0.09)"; e.currentTarget.style.transform = "translateX(4px)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = x.accent ? "rgba(26,26,255,0.14)" : "rgba(255,255,255,0.04)"; e.currentTarget.style.transform = "translateX(0)"; }}
                >
                  <div>
                    <div className="mono" style={{ fontSize:"0.58rem", color:"rgba(255,255,255,0.28)", letterSpacing:"0.12em", marginBottom:"0.25rem" }}>{x.sub}</div>
                    <div style={{ fontSize:"0.88rem", fontWeight:600, color:"#fff" }}>{x.label}</div>
                  </div>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                    stroke={x.accent ? C.a1 : "rgba(255,255,255,0.35)"} strokeWidth="2" strokeLinecap="round">
                    <path d="M7 17L17 7M17 7H7M17 7v10"/>
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Footer grid */}
        <div className="footer-mega" style={{ display:"grid", gridTemplateColumns:"2fr 1fr 1fr 1fr",
          gap:"3.5rem", padding:"3.5rem 0 3rem" }}>
          <div>
            <div style={{ fontFamily:"'Cormorant',Georgia,serif", fontSize:"1.4rem", fontWeight:700,
              color:"#fff", letterSpacing:"-0.04em", marginBottom:"0.9rem" }}>
              Bhagavan<span style={{ color:C.a1 }}>.</span>
            </div>
            <p style={{ fontSize:"0.8rem", color:"rgba(255,255,255,0.36)", lineHeight:1.8, marginBottom:"1.5rem", maxWidth:"260px" }}>
              B.Tech AIDS · Ramachandra College of Engineering · Andhra Pradesh. AI systems engineer in training.
            </p>
            <div style={{ display:"flex", gap:"0.55rem" }}>
              {[
                { label:"GH", href:"https://github.com/bhagavan444", hc:"#e5e7eb" },
                { label:"LI", href:"https://www.linkedin.com/in/gopalajosyula-siva-satya-sai-bhagavan-1624a027b/", hc:"#0a91fb" },
                { label:"✉",  href:"mailto:g.sivasatyasaibhagavan@gmail.com", hc:C.a1 },
              ].map((s,i) => (
                <a key={i} href={s.href} target={s.href.startsWith("http")?"_blank":undefined}
                  rel={s.href.startsWith("http")?"noopener noreferrer":undefined}
                  className="mono"
                  style={{ width:"36px", height:"36px", borderRadius:"8px",
                    background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.1)",
                    display:"flex", alignItems:"center", justifyContent:"center",
                    color:"rgba(255,255,255,0.38)", textDecoration:"none", fontSize:"0.68rem",
                    transition:"all 0.22s ease" }}
                  onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.11)"; e.currentTarget.style.color = s.hc; e.currentTarget.style.borderColor = s.hc+"44"; e.currentTarget.style.transform = "translateY(-3px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.color = "rgba(255,255,255,0.38)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.transform = "translateY(0)"; }}
                >{s.label}</a>
              ))}
            </div>
          </div>

          {["Navigate","Work","Contact"].map((col, ci) => {
            const links = ci === 0
              ? [{l:"Home",h:"/"},{l:"Internships",h:"/internships"},{l:"Skills",h:"/skills"},{l:"Projects",h:"/projects"},{l:"Education",h:"/education"}]
              : ci === 1
              ? [{l:"GitHub",h:"https://github.com/bhagavan444",ext:true},{l:"LinkedIn",h:"https://www.linkedin.com/in/gopalajosyula-siva-satya-sai-bhagavan-1624a027b/",ext:true},{l:"Resume",h:"#"},{l:"Certs",h:"#"}]
              : [{l:"Email",h:"mailto:g.sivasatyasaibhagavan@gmail.com"},{l:"+91 7569205626",h:"tel:+917569205626"},{l:"Andhra Pradesh, IN",h:"#"},{l:"Remote Ready",h:"#"}];
            return (
              <div key={col}>
                <div className="mono" style={{ fontSize:"0.58rem", letterSpacing:"0.18em",
                  textTransform:"uppercase", color:"rgba(255,255,255,0.2)", marginBottom:"1.3rem" }}>{col}</div>
                {links.map((ln,li) => (
                  <a key={li} href={ln.h} target={ln.ext?"_blank":undefined}
                    rel={ln.ext?"noopener noreferrer":undefined}
                    style={{ display:"block", fontSize:"0.82rem", color:"rgba(255,255,255,0.4)",
                      textDecoration:"none", marginBottom:"0.65rem", transition:"all 0.2s ease", paddingLeft:0 }}
                    onMouseEnter={e => { e.currentTarget.style.color = "#fff"; e.currentTarget.style.paddingLeft = "5px"; }}
                    onMouseLeave={e => { e.currentTarget.style.color = "rgba(255,255,255,0.4)"; e.currentTarget.style.paddingLeft = "0"; }}
                  >{ln.l}</a>
                ))}
              </div>
            );
          })}
        </div>

        {/* Bottom bar */}
        <div className="footer-bot" style={{ borderTop:"1px solid rgba(255,255,255,0.06)", padding:"1.5rem 0",
          display:"flex", alignItems:"center", justifyContent:"space-between", gap:"1rem", flexWrap:"wrap" }}>
          <span className="mono" style={{ fontSize:"0.68rem", color:"rgba(255,255,255,0.22)" }}>
            © 2026 Siva Satya Sai Bhagavan · All credentials verifiable via linked certificates
          </span>
          <div style={{ display:"flex", alignItems:"center", gap:"0.5rem" }}>
            <div style={{ width:"5px", height:"5px", borderRadius:"50%", background:C.gn, animation:"pulseDot 2s ease-in-out infinite" }} />
            <span className="mono" style={{ fontSize:"0.68rem", color:C.gn }}>Graduating June 2026</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN COMPONENT
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
        <main style={{ maxWidth:"1100px", margin:"0 auto", padding:"9rem 2.5rem 0" }}>

          {/* ── HERO ── */}
          <header style={{ marginBottom:"6rem",
            opacity: heroIn ? 1 : 0,
            transform: heroIn ? "none" : "translateY(22px)",
            transition:"opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)",
          }}>
            {/* Overline */}
            <div style={{ display:"flex", alignItems:"center", gap:"0.75rem", marginBottom:"2rem" }}>
              <div style={{ width:"26px", height:"1.5px", background:C.a1 }} />
              <span className="mono" style={{ fontSize:"0.65rem", letterSpacing:"0.2em",
                textTransform:"uppercase", color:C.a1 }}>Academic Record · 2019 – 2026</span>
            </div>

            {/* Title */}
            <div style={{ marginBottom:"1.8rem" }}>
              <div style={{ fontFamily:"'Cormorant',Georgia,serif",
                fontSize:"clamp(3.5rem,9vw,7rem)", fontWeight:700, color:C.text,
                letterSpacing:"-0.035em", lineHeight:0.95, display:"block" }}>Academic</div>
              <div style={{ fontFamily:"'Cormorant',Georgia,serif",
                fontSize:"clamp(3.5rem,9vw,7rem)", fontWeight:700, color:"transparent",
                letterSpacing:"-0.035em", lineHeight:0.95,
                WebkitTextStroke:`1.5px rgba(0,0,0,0.1)`, display:"block" }}>Foundation</div>
            </div>

            <p style={{ fontSize:"1rem", color:C.sub, lineHeight:1.8, maxWidth:"560px", marginBottom:"3rem" }}>
              Formal education in Artificial Intelligence and Data Science, grounded in mathematical rigor and applied systems engineering. Each stage built the analytical infrastructure for the next.
            </p>

            {/* Summary strip */}
            <div className="hero-strip" style={{ display:"flex", gap:0,
              borderTop:`1px solid ${C.border}`, paddingTop:"2.2rem" }}>
              {[
                ["B.Tech, AI & DS",    "Current Specialisation"],
                ["2022 – 2026",        "Program Duration"],
                ["JNTUK Affiliated",   "University Board"],
              ].map(([v,l], i) => (
                <div key={l} className="hero-strip-item" style={{
                  paddingRight:"2.5rem", marginRight:"2.5rem",
                  borderRight: i < 2 ? `1px solid ${C.border}` : "none",
                }}>
                  <div style={{ fontSize:"1rem", fontWeight:700, color:C.text, marginBottom:"0.4rem" }}>{v}</div>
                  <div className="mono" style={{ fontSize:"0.62rem", letterSpacing:"0.12em",
                    textTransform:"uppercase", color:C.muted }}>{l}</div>
                </div>
              ))}
            </div>
          </header>

          {/* ── SECTION DIVIDER ── */}
          <div style={{ display:"flex", alignItems:"center", gap:"1.2rem", marginBottom:"4rem",
            opacity: heroIn ? 1 : 0, transition:"opacity 0.7s ease 0.35s" }}>
            <span className="mono" style={{ fontSize:"0.62rem", letterSpacing:"0.16em",
              textTransform:"uppercase", color:C.muted, flexShrink:0 }}>Chronological · Latest First</span>
            <div style={{ flex:1, height:"1px", background:C.border }} />
            <span className="mono" style={{ fontSize:"0.62rem", color:C.faint }}>{EDU.length} entries</span>
          </div>

          {/* ── B.TECH — DOMINANT ── */}
          <BtechBlock edu={btech} onOpen={setDrawer} />

          {/* ── SECONDARY DIVIDER ── */}
          <div style={{ display:"flex", alignItems:"center", gap:"1rem", marginBottom:"2.5rem" }}>
            <span className="mono" style={{ fontSize:"0.6rem", letterSpacing:"0.15em",
              textTransform:"uppercase", color:C.faint, flexShrink:0 }}>Prior Education</span>
            <div style={{ flex:1, height:"1px", background:C.border }} />
          </div>

          {/* ── SECONDARY ROWS — Compact ── */}
          {secondary.map((edu, i) => (
            <SecondaryRow key={edu.id} edu={edu} delay={i * 0.1} onOpen={setDrawer} />
          ))}

          {/* ── FOOTER NOTE ── */}
          <div style={{ marginTop:"4rem", paddingTop:"2rem", borderTop:`1px solid ${C.border}`,
            display:"flex", justifyContent:"space-between", alignItems:"flex-end",
            flexWrap:"wrap", gap:"1rem" }}>
            <p className="mono" style={{ fontSize:"0.7rem", color:C.muted, lineHeight:1.75 }}>
              All credentials verifiable via linked certificates.<br />
              Currently in final year — graduating June 2026.
            </p>
            <span className="mono" style={{ fontSize:"0.65rem", color:C.faint, letterSpacing:"0.1em" }}>
              EDU · 2019–2026
            </span>
          </div>
        </main>

        <MegaFooter />
      </div>

      {drawer && <Drawer edu={drawer} onClose={() => setDrawer(null)} />}
    </>
  );
}