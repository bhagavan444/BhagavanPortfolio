"use client";

import React, { useState, useEffect, useRef } from "react";
import { MapPin, CheckCircle2, ArrowUpRight } from "lucide-react";

/* ═══════════════════════════════════════════════════════════════
   DESIGN TOKENS  — identical to Skills page system
═══════════════════════════════════════════════════════════════ */
const C = {
  bg:         "#f8f8f7",
  surface:    "#f2f2f0",
  surfaceHi:  "#eaeae8",
  white:      "#ffffff",
  border:     "rgba(0,0,0,0.065)",
  border2:    "rgba(0,0,0,0.12)",
  text:       "#0c0c0c",
  muted:      "#6e6e78",
  muted2:     "#4a4a52",
  accent:     "#0057d9",
  accentSub:  "rgba(0,87,217,0.045)",
  accentLine: "rgba(0,87,217,0.14)",
  green:      "#047857",
  greenSub:   "rgba(4,120,87,0.045)",
  purple:     "#6d28d9",
  purpleSub:  "rgba(109,40,217,0.045)",
  ink:        "#080808",
};

/* Skills-identical easing + timing map */
const E  = "cubic-bezier(0.16, 1, 0.3, 1)";
const MS = { fast:"130ms", base:"190ms", slow:"320ms", reveal:"440ms" };

/* Spacing (8 px base) */
const SP = {
  xs:"0.5rem", sm:"1rem", md:"1.5rem", lg:"2rem",
  xl:"3rem", "2xl":"4rem", "3xl":"6rem", "4xl":"8rem",
};

/* ═══════════════════════════════════════════════════════════════
   DEVICON CDN MAP  — internship tech stack, full coverage
═══════════════════════════════════════════════════════════════ */
const IB = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons";
const ICONS = {
  /* MERN */
  "React":            `${IB}/react/react-original.svg`,
  "HTML":             `${IB}/html5/html5-original.svg`,
  "CSS":              `${IB}/css3/css3-original.svg`,
  "JavaScript":       `${IB}/javascript/javascript-original.svg`,
  "Node.js":          `${IB}/nodejs/nodejs-original.svg`,
  "Express.js":       `${IB}/express/express-original.svg`,
  "MongoDB Atlas":    `${IB}/mongodb/mongodb-original.svg`,
  "OAuth":            `${IB}/google/google-original.svg`,
  "JWT":              `${IB}/nodejs/nodejs-plain.svg`,
  "Git":              `${IB}/git/git-original.svg`,
  "Postman":          `${IB}/postman/postman-original.svg`,
  /* ML / CV */
  "TensorFlow":       `${IB}/tensorflow/tensorflow-original.svg`,
  "Keras":            `${IB}/keras/keras-original.svg`,
  "Scikit-learn":     `${IB}/scikitlearn/scikitlearn-original.svg`,
  "OpenCV":           `${IB}/opencv/opencv-original.svg`,
  "NumPy":            `${IB}/numpy/numpy-original.svg`,
  "Pandas":           `${IB}/pandas/pandas-original.svg`,
  "Flask API":        `${IB}/flask/flask-original.svg`,
  "Jupyter Notebook": `${IB}/jupyter/jupyter-original.svg`,
  "Python":           `${IB}/python/python-original.svg`,
  /* Data Science */
  "NLTK":             `${IB}/python/python-plain.svg`,
  "TF-IDF":           `${IB}/python/python-original.svg`,
  "Matplotlib":       `${IB}/matplotlib/matplotlib-original.svg`,
};

/* Marquee ticker */
const TICKER = [
  "React","Node.js","MongoDB Atlas","TensorFlow","Keras","Python","Scikit-learn",
  "Flask API","JWT","OAuth","NumPy","Pandas","OpenCV","Jupyter Notebook","Git","Postman",
  "JavaScript","Express.js","NLTK","Matplotlib",
];

/* ═══════════════════════════════════════════════════════════════
   GLOBAL CSS  — Skills-identical keyframe set + extras
═══════════════════════════════════════════════════════════════ */
const GLOBAL = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant:wght@500;600;700&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&family=DM+Mono:wght@400;500&display=swap');

  *, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }
  html { scroll-behavior:smooth; overflow-x:hidden; }
  body {
    font-family:'DM Sans', system-ui, sans-serif;
    background:${C.bg}; color:${C.text};
    -webkit-font-smoothing:antialiased; overflow-x:hidden;
  }
  ::selection { background:rgba(0,87,217,0.12); }
  ::-webkit-scrollbar  { width:2px; }
  ::-webkit-scrollbar-track  { background:transparent; }
  ::-webkit-scrollbar-thumb  { background:rgba(0,87,217,0.22); border-radius:2px; }

  /* ── Directional entrances ── */
  @keyframes _rtl  { from{opacity:0;transform:translateX(48px);}  to{opacity:1;transform:translateX(0);} }
  @keyframes _ltr  { from{opacity:0;transform:translateX(-48px);} to{opacity:1;transform:translateX(0);} }
  @keyframes _up   { from{opacity:0;transform:translateY(18px);}  to{opacity:1;transform:translateY(0);} }
  @keyframes _fade { from{opacity:0;} to{opacity:1;} }
  @keyframes _si   { from{opacity:0;transform:scale(0.96);} to{opacity:1;transform:scale(1);} }
  @keyframes _lx   { from{transform:scaleX(0);} to{transform:scaleX(1);} }
  @keyframes _ly   { from{transform:scaleY(0);} to{transform:scaleY(1);} }

  /* ── Marquee (RTL continuous) ── */
  @keyframes _marquee { from{transform:translateX(0);} to{transform:translateX(-50%);} }

  /* ── Tag / icon micro-pops ── */
  @keyframes _tagPop  { from{opacity:0;transform:translateX(14px) scale(0.92);} to{opacity:1;transform:translateX(0) scale(1);} }
  @keyframes _iconIn  { from{opacity:0;transform:translateX(10px) scale(0.78);} to{opacity:1;transform:translateX(0) scale(1);} }
  @keyframes _pulse   { 0%,100%{opacity:0.3;transform:scale(1);} 50%{opacity:1;transform:scale(1.35);} }
  @keyframes _blink   { 0%,100%{opacity:1;} 50%{opacity:0;} }
  @keyframes _fadeSlide { from{opacity:0;transform:translateY(14px);} to{opacity:1;transform:translateY(0);} }
  @keyframes _slideIn { from{transform:scaleX(0);transform-origin:left;} to{transform:scaleX(1);transform-origin:left;} }

  /* ── Devicon hover ── */
  .di { transition:transform ${MS.fast} ${E}, filter ${MS.fast} ${E}; cursor:default; }
  .di:hover { transform:scale(1.25) rotate(-6deg); filter:drop-shadow(0 2px 6px rgba(0,0,0,0.2)); }

  button:focus-visible, a:focus-visible { outline:2px solid ${C.accent}; outline-offset:2px; }

  @media (prefers-reduced-motion:reduce) {
    *, *::before, *::after { animation-duration:0.01ms !important; transition-duration:0.01ms !important; }
    .mqinner { animation:none !important; }
  }

  /* ── Responsive ── */
  @media (max-width:1024px) { .exp-grid { grid-template-columns:1fr !important; } }
  @media (max-width:768px)  {
    .snav { display:none !important; }
    .exp-grid, .sum-grid, .stats-row { grid-template-columns:1fr !important; }
    .foot-row { flex-direction:column !important; align-items:flex-start !important; }
  }
  @media (max-width:640px) {
    .stats-row { grid-template-columns:repeat(2,1fr) !important; }
  }
`;

/* ═══════════════════════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════════════════════ */
const EXP = [
  {
    id:1, year:"2025",
    role:"MERN Stack Intern",
    company:"StudyOwl Education Pvt Ltd",
    period:"May – July 2025", duration:"3 months",
    location:"Hybrid", type:"Full-Stack Development",
    accent:C.accent, accentSub:C.accentSub,
    certPreview:"/images/study.jpg",
    summary:"Worked on full-stack web applications using the MERN stack, implementing authentication systems and REST APIs while collaborating in a team environment.",
    impact:[
      { metric:"3",    label:"Web Modules",      detail:"Frontend–backend integrations" },
      { metric:"2",    label:"OAuth Providers",   detail:"Google & GitHub login" },
      { metric:"100%", label:"API Connectivity",  detail:"REST-based architecture" },
    ],
    contributions:[
      "Built reusable React components and connected them to Express-based REST APIs",
      "Implemented Google and GitHub OAuth authentication with JWT handling",
      "Designed MongoDB schemas for user and application data",
      "Integrated frontend forms with backend validation and database persistence",
      "Collaborated using Git and GitHub in an agile-style workflow",
    ],
    stack:{
      Frontend: ["React","HTML","CSS","JavaScript"],
      Backend:  ["Node.js","Express.js"],
      Database: ["MongoDB Atlas"],
      Auth:     ["OAuth","JWT"],
      Tools:    ["Git","Postman"],
    },
  },
  {
    id:2, year:"2025",
    role:"AI / ML Intern",
    company:"SmartBridge",
    period:"May – June 2025", duration:"2 months",
    location:"Remote", type:"Machine Learning & Computer Vision",
    accent:C.purple, accentSub:C.purpleSub,
    certPreview:"/images/intern.png",
    summary:"Developed and evaluated machine learning models for image classification and applied deployment using Flask APIs.",
    impact:[
      { metric:"4",   label:"ML Models",      detail:"Classification pipelines built" },
      { metric:"85%", label:"CNN Accuracy",    detail:"Image classification task" },
      { metric:"1",   label:"API Deployment",  detail:"Flask inference endpoint" },
    ],
    contributions:[
      "Built CNN-based image classification model using TensorFlow and Keras",
      "Performed preprocessing and data augmentation on labeled datasets",
      "Evaluated model performance using accuracy and confusion matrices",
      "Deployed trained model through a Flask API for real-time inference",
      "Tested endpoints using Postman for validation",
    ],
    stack:{
      Core:        ["TensorFlow","Keras","Scikit-learn"],
      CV:          ["OpenCV"],
      Data:        ["NumPy","Pandas"],
      Deployment:  ["Flask API"],
      Environment: ["Jupyter Notebook","Python"],
    },
  },
  {
    id:3, year:"2024",
    role:"Machine Learning & Data Science Intern",
    company:"Blackbucks",
    period:"May – June 2024", duration:"2 months",
    location:"Remote", type:"Data Science & ML",
    accent:C.green, accentSub:C.greenSub,
    certPreview:"/images/blackbucks.jpeg",
    summary:"Worked on data preprocessing, feature engineering, and supervised learning model development using Python-based ML libraries.",
    impact:[
      { metric:"6",    label:"Models Built",  detail:"Supervised algorithms tested" },
      { metric:"90%+", label:"Best Accuracy", detail:"Classification tasks" },
      { metric:"1",    label:"NLP Pipeline",  detail:"TF-IDF implementation" },
    ],
    contributions:[
      "Cleaned and preprocessed structured datasets using Pandas",
      "Built classification models including Logistic Regression and Random Forest",
      "Applied TF-IDF vectorization for text classification tasks",
      "Compared models using cross-validation and evaluation metrics",
      "Documented experiments and findings using Jupyter Notebook",
    ],
    stack:{
      ML:            ["Scikit-learn"],
      Data:          ["Pandas","NumPy"],
      NLP:           ["NLTK","TF-IDF"],
      Visualization: ["Matplotlib"],
      Tools:         ["Jupyter Notebook","Git"],
    },
  },
];

/* ═══════════════════════════════════════════════════════════════
   HOOKS
═══════════════════════════════════════════════════════════════ */
function useInView(t = 0.08) {
  const ref = useRef(null);
  const [vis, sv] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) sv(true); }, { threshold:t });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [t]);
  return [ref, vis];
}

function useMob() {
  const [m, sm] = useState(false);
  useEffect(() => {
    const fn = () => sm(window.innerWidth < 768);
    fn(); window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);
  return m;
}

/* ═══════════════════════════════════════════════════════════════
   COUNTER
═══════════════════════════════════════════════════════════════ */
function Counter({ value, triggered }) {
  const [n, sn] = useState(0);
  const done = useRef(false);
  useEffect(() => {
    if (!triggered || done.current) return;
    done.current = true;
    const raw = parseInt(String(value).replace(/[^0-9]/g, "")) || 0;
    const dur = 1200, t0 = Date.now();
    const tick = () => {
      const p = Math.min((Date.now() - t0) / dur, 1);
      sn(Math.floor(raw * (1 - Math.pow(1 - p, 3))));
      if (p < 1) requestAnimationFrame(tick); else sn(raw);
    };
    requestAnimationFrame(tick);
  }, [triggered, value]);

  const fmt = (x) => {
    const s = String(value);
    if (s.includes("K"))  return `${Math.floor(x/1000)}K+`;
    if (s.includes("%"))  return `${x}%`;
    if (s.endsWith("+"))  return `${x}+`;
    if (s.includes("–"))  return s;
    return `${x}`;
  };
  return <>{fmt(n)}</>;
}

/* ═══════════════════════════════════════════════════════════════
   DEVICON IMG  — correct prop signature (no style:{} bug)
═══════════════════════════════════════════════════════════════ */
function DI({ name, size = 18, extraStyle = {} }) {
  const src = ICONS[name];
  if (!src) return null;
  return (
    <img src={src} alt={name} className="di"
      width={size} height={size} loading="lazy"
      style={{ display:"block", flexShrink:0, borderRadius:"3px", ...extraStyle }} />
  );
}

/* ═══════════════════════════════════════════════════════════════
   MARQUEE  — continuous RTL, devicons + names
═══════════════════════════════════════════════════════════════ */
function Marquee({ speed = 36 }) {
  const items = [...TICKER, ...TICKER];
  return (
    <div style={{
      overflow:"hidden", borderTop:`1px solid ${C.border}`, borderBottom:`1px solid ${C.border}`,
      padding:"10px 0", background:C.surface, position:"relative",
    }}>
      {["left","right"].map(side => (
        <div key={side} style={{
          position:"absolute", [side]:0, top:0, bottom:0, width:"80px",
          background:`linear-gradient(to ${side==="left"?"right":"left"}, ${C.surface}, transparent)`,
          zIndex:2, pointerEvents:"none",
        }}/>
      ))}
      <div className="mqinner" style={{
        display:"flex", alignItems:"center", gap:"32px",
        width:"max-content",
        animation:`_marquee ${speed}s linear infinite`,
        willChange:"transform",
      }}>
        {items.map((name, i) => (
          <div key={`${name}-${i}`} style={{ display:"flex", alignItems:"center", gap:"7px", opacity:0.5, flexShrink:0 }}>
            {ICONS[name] && (
              <img src={ICONS[name]} alt={name} className="di"
                width={15} height={15} loading="lazy"
                style={{ display:"block", borderRadius:"2px" }} />
            )}
            <span style={{
              fontFamily:"'DM Mono',monospace", fontSize:"11px",
              fontWeight:500, color:C.muted2, letterSpacing:"0.04em", whiteSpace:"nowrap",
            }}>{name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SCROLL PROGRESS
═══════════════════════════════════════════════════════════════ */
function ScrollBar() {
  const [pct, sp] = useState(0);
  const raf = useRef(null);
  useEffect(() => {
    const fn = () => {
      if (raf.current) return;
      raf.current = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        sp((window.scrollY / max) * 100);
        raf.current = null;
      });
    };
    window.addEventListener("scroll", fn, { passive:true });
    return () => { window.removeEventListener("scroll", fn); if (raf.current) cancelAnimationFrame(raf.current); };
  }, []);
  return (
    <div style={{ position:"fixed", top:0, left:0, right:0, height:"2px", background:C.surface, zIndex:9998 }}>
      <div style={{
        height:"100%", width:`${pct}%`,
        background:`linear-gradient(90deg, ${C.accent}, ${C.purple}, ${C.green})`,
        transition:"width 0.1s linear",
      }}/>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SIDE NAV  — Skills-style line indicators
═══════════════════════════════════════════════════════════════ */
function SideNav({ active }) {
  return (
    <nav className="snav" style={{
      position:"fixed", left:"1.25rem", top:"50%",
      transform:"translateY(-50%)", zIndex:100,
      display:"flex", flexDirection:"column", gap:"14px",
    }}>
      {EXP.map((e, i) => (
        <button key={e.id}
          onClick={() => document.getElementById(`exp-${e.id}`)?.scrollIntoView({ behavior:"smooth" })}
          aria-label={`Jump to ${e.role}`}
          style={{ display:"flex", alignItems:"center", gap:"6px", background:"none", border:"none", cursor:"pointer", padding:0, outline:"none" }}
        >
          <div style={{
            height:"1.5px", width: active===i ? "22px" : "10px",
            background: active===i ? e.accent : C.border2,
            borderRadius:"1px", transition:`all ${MS.slow} ${E}`,
          }}/>
          <span style={{
            fontFamily:"'DM Mono',monospace", fontSize:"9px", fontWeight:500, color:C.muted,
            opacity: active===i ? 1 : 0, transition:`opacity ${MS.slow} ${E}`,
          }}>{String(i+1).padStart(2,"0")}</span>
        </button>
      ))}
    </nav>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MONO LABEL
═══════════════════════════════════════════════════════════════ */
function ML({ children, color = C.accent, style = {} }) {
  return (
    <span style={{
      display:"block", fontFamily:"'DM Mono',monospace",
      fontSize:"10px", fontWeight:500,
      letterSpacing:"0.14em", textTransform:"uppercase",
      color, ...style,
    }}>{children}</span>
  );
}

/* ═══════════════════════════════════════════════════════════════
   TERMINAL CURSOR BLINK
═══════════════════════════════════════════════════════════════ */
function TermCursor() {
  return (
    <span style={{
      display:"inline-block", width:"8px", height:"1.1em",
      background:C.accent, marginLeft:"3px", verticalAlign:"middle",
      animation:"_blink 1.1s step-end infinite", borderRadius:"1px",
    }}/>
  );
}

/* ═══════════════════════════════════════════════════════════════
   TECH TAG  — RTL pop + devicon + hover tint
═══════════════════════════════════════════════════════════════ */
function Tag({ name, accent, visible, delay }) {
  const [h, sh] = useState(false);
  return (
    <span onMouseEnter={() => sh(true)} onMouseLeave={() => sh(false)} style={{
      display:"inline-flex", alignItems:"center", gap:"5px",
      padding:"4px 9px 4px 6px", borderRadius:"5px",
      background:    h ? `${accent}14` : C.surface,
      border:        `1px solid ${h ? `${accent}38` : C.border}`,
      fontFamily:    "'DM Mono',monospace", fontSize:"11px",
      color:         h ? accent : C.muted2,
      cursor:"default", userSelect:"none",
      transition:    `background ${MS.fast} ${E}, border-color ${MS.fast} ${E}, color ${MS.fast} ${E}`,
      opacity:       visible ? 1 : 0,
      animation:     visible ? `_tagPop ${MS.slow} ${E} ${delay}s both` : "none",
    }}>
      <DI name={name} size={13} extraStyle={{ opacity:h?1:0.65, transition:`opacity ${MS.fast} ${E}` }} />
      {name}
    </span>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAGNETIC BUTTON
═══════════════════════════════════════════════════════════════ */
function MagBtn({ children, href, accent, extraStyle = {} }) {
  const [pos, sp] = useState({ x:0, y:0 });
  const [h, sh]   = useState(false);
  const ref = useRef(null);
  const mob = useMob();
  const onMove = (e) => {
    if (mob || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    sp({ x:(e.clientX - r.left - r.width/2)*0.2, y:(e.clientY - r.top - r.height/2)*0.2 });
  };
  return (
    <a ref={ref} href={href} target="_blank" rel="noopener noreferrer"
      onMouseMove={onMove}
      onMouseEnter={() => sh(true)}
      onMouseLeave={() => { sh(false); sp({ x:0, y:0 }); }}
      style={{
        display:"inline-flex", alignItems:"center", gap:"8px",
        padding:"10px 18px", minHeight:"44px",
        background: h ? `${accent}20` : `${accent}10`,
        border: `1px solid ${h ? `${accent}60` : `${accent}35`}`,
        borderRadius:"8px", fontSize:"13px", fontWeight:600,
        color:accent, textDecoration:"none",
        fontFamily:"'DM Mono',monospace",
        transition:`all ${MS.base} ${E}`,
        transform: mob ? "none" : `translate(${pos.x}px, ${pos.y}px)`,
        ...extraStyle,
      }}
    >{children}</a>
  );
}

/* ═══════════════════════════════════════════════════════════════
   EXPERIENCE SECTION
   Even rows  → left panel: _ltr,  right panel: _rtl
   Odd rows   → left panel: _rtl,  right panel: _ltr
═══════════════════════════════════════════════════════════════ */
function ExpSection({ data, ri, isLast }) {
  const [ref, vis] = useInView(0.07);
  const [tab, st]  = useState("contributions");
  const [tilt, tt] = useState({ x:0, y:0 });
  const mob = useMob();

  const even = ri % 2 === 0;
  const la   = even ? "_ltr" : "_rtl";
  const ra   = even ? "_rtl" : "_ltr";

  const onMove = (e) => {
    if (mob || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    tt({ x:((e.clientY - r.top)  / r.height - 0.5) * 1.5,
         y:-((e.clientX - r.left) / r.width  - 0.5) * 1.5 });
  };

  return (
    <section id={`exp-${data.id}`} ref={ref} data-experience
      style={{
        minHeight: mob ? "auto" : "100vh",
        display:"flex", alignItems:"center", position:"relative",
        padding: mob ? `${SP["3xl"]} 0` : `${SP["4xl"]} 0`,
        borderBottom: isLast ? "none" : `1px solid ${C.border}`,
      }}
    >
      {/* Year watermark */}
      <div style={{
        position:"absolute", left: mob ? "-8%" : "-2%", top: mob ? "8%" : "18%",
        fontSize: mob ? "clamp(6rem,25vw,8rem)" : "clamp(10rem,18vw,20rem)",
        fontFamily:"'Cormorant',Georgia,serif", fontWeight:700,
        color: data.accentSub, lineHeight:1,
        userSelect:"none", pointerEvents:"none", opacity:0.35,
      }}>{data.year}</div>

      {/* Ambient glow */}
      <div style={{
        position:"absolute", left:"15%", top:"30%",
        width: mob ? "240px" : "420px", height: mob ? "240px" : "420px",
        borderRadius:"50%",
        background:`radial-gradient(circle, ${data.accent}${mob?"08":"10"} 0%, transparent 70%)`,
        filter: mob ? "blur(60px)" : "blur(80px)", pointerEvents:"none",
      }}/>

      <div style={{ maxWidth:"1240px", margin:"0 auto", padding:`0 ${mob ? SP.sm : SP.lg}`, width:"100%" }}>
        <div className="exp-grid" style={{
          display:"grid", gridTemplateColumns: mob ? "1fr" : "1.2fr 1fr",
          gap: mob ? SP.xl : SP["3xl"], alignItems:"start",
        }}>

          {/* ── LEFT PANEL ── */}
          <div style={{
            opacity: vis ? 1 : 0,
            animation: vis ? `${la} ${MS.reveal} ${E} 0.04s both` : "none",
          }}>
            {/* Role header */}
            <div style={{ marginBottom:SP.lg }}>
              <div style={{ display:"flex", alignItems:"center", gap:"12px", marginBottom:"14px" }}>
                {/* Accent bar — scaleY entry */}
                <div style={{
                  width:"2px", height:"36px", background:data.accent,
                  transformOrigin:"top",
                  transform: vis ? "scaleY(1)" : "scaleY(0)",
                  transition:`transform ${MS.slow} ${E} 0.2s`,
                }}/>
                <div>
                  <ML color={data.accent} style={{ marginBottom:"3px" }}>
                    {data.period} · {data.duration}
                  </ML>
                  <span style={{ fontFamily:"'DM Mono',monospace", fontSize:"10px", color:C.muted, letterSpacing:"0.06em" }}>
                    {data.type}
                  </span>
                </div>
              </div>

              <h2 style={{
                fontFamily:"'Cormorant',Georgia,serif",
                fontSize: mob ? "clamp(2rem,10vw,2.6rem)" : "clamp(2.5rem,5vw,3.5rem)",
                fontWeight:700, color:C.text,
                lineHeight:1.08, letterSpacing:"-0.025em", marginBottom:"8px",
              }}>{data.role}</h2>

              <div style={{ fontSize: mob ? "1.05rem" : "1.2rem", fontWeight:600, color:C.muted2, marginBottom:"10px" }}>
                {data.company}
              </div>

              <div style={{ display:"flex", alignItems:"center", gap:"6px", fontSize:"13px", color:C.muted }}>
                <MapPin size={13} />
                {data.location}
              </div>
            </div>

            {/* Gradient underline — scaleX entry */}
            <div style={{
              height:"2px", width:"96px", marginBottom:SP.lg,
              background:`linear-gradient(90deg, ${data.accent}, transparent)`,
              borderRadius:"2px", transformOrigin:"left",
              transform: vis ? "scaleX(1)" : "scaleX(0)",
              transition:`transform ${MS.slow} ${E} 0.22s`,
            }}/>

            {/* Summary */}
            <p style={{
              fontSize: mob ? "0.95rem" : "1rem",
              color:C.muted2, lineHeight:1.75, marginBottom:SP.xl, maxWidth:"600px",
            }}>{data.summary}</p>

            {/* Tabs */}
            <div style={{ marginBottom:SP.lg }}>
              <div style={{ display:"flex", gap:SP.lg, borderBottom:`1px solid ${C.border}` }}>
                {["contributions","stack"].map(t => (
                  <button key={t} onClick={() => st(t)} style={{
                    background:"none", border:"none", padding:`${SP.sm} 0`, minHeight:"44px",
                    fontSize:"13.5px", fontWeight:600, color: tab===t ? C.text : C.muted,
                    cursor:"pointer", textTransform:"capitalize",
                    transition:`color ${MS.base} ${E}`, position:"relative",
                  }}>
                    {t}
                    {tab===t && (
                      <div style={{
                        position:"absolute", bottom:-1, left:0, right:0,
                        height:"2px", background:data.accent,
                        animation:`_slideIn ${MS.base} ${E}`,
                      }}/>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab content */}
            <div style={{ minHeight: mob ? "auto" : "280px" }}>
              {tab === "contributions" && (
                <ul style={{
                  listStyle:"none", display:"flex", flexDirection:"column", gap:SP.sm,
                  animation:`_fadeSlide ${MS.slow} ${E}`,
                }}>
                  {data.contributions.map((item, i) => (
                    <li key={i} style={{ display:"flex", gap:SP.sm, alignItems:"flex-start" }}>
                      <div style={{
                        marginTop:"0.4rem", width:"5px", height:"5px", borderRadius:"50%",
                        background:data.accent, flexShrink:0,
                        animation: vis ? `_iconIn 280ms ${E} ${0.1+i*0.06}s both` : "none",
                      }}/>
                      <span style={{ fontSize:"14px", color:C.muted2, lineHeight:1.65 }}>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
              {tab === "stack" && (
                <div style={{
                  display:"flex", flexDirection:"column", gap:SP.md,
                  animation:`_fadeSlide ${MS.slow} ${E}`,
                }}>
                  {Object.entries(data.stack).map(([cat, items], ci) => (
                    <div key={cat}>
                      <ML color={data.accent} style={{ marginBottom:"10px" }}>{cat}</ML>
                      <div style={{ display:"flex", flexWrap:"wrap", gap:"5px" }}>
                        {items.map((t, ti) => (
                          <Tag key={t} name={t} accent={data.accent}
                            visible={tab==="stack"}
                            delay={ci*0.06 + ti*0.035}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Cert button */}
            <div style={{ marginTop:SP.xl }}>
              <MagBtn href={data.certPreview} accent={data.accent}>
                <CheckCircle2 size={15} />
                View Verified Certificate
              </MagBtn>
            </div>
          </div>

          {/* ── RIGHT PANEL — Impact card ── */}
          <div
            onMouseMove={onMove}
            onMouseLeave={() => tt({ x:0, y:0 })}
            style={{
              opacity: vis ? 1 : 0,
              animation: vis ? `${ra} ${MS.reveal} ${E} 0.10s both` : "none",
              position: mob ? "relative" : "sticky",
              top: mob ? "auto" : SP["3xl"],
            }}
          >
            <div style={{
              position:"relative",
              padding: mob ? SP.lg : `${SP.xl} ${SP.lg}`,
              background:C.white,
              border:`1px solid ${C.border}`,
              borderRadius:"18px",
              boxShadow:"0 4px 16px rgba(0,0,0,0.04)",
              transform: mob ? "none" : `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
              transition:`transform ${MS.base} ${E}`,
            }}>
              {/* Inner glow */}
              <div style={{
                position:"absolute", inset:0, borderRadius:"18px",
                background:`radial-gradient(circle at 50% 30%, ${data.accent}06 0%, transparent 65%)`,
                pointerEvents:"none",
              }}/>
              {/* Top accent shimmer */}
              <div style={{
                position:"absolute", top:0, left:"20%", right:"20%", height:"2px",
                background:`linear-gradient(90deg, transparent, ${data.accent}50, transparent)`,
                borderRadius:"0 0 2px 2px",
              }}/>

              <ML color={C.muted} style={{ marginBottom:SP.lg }}>Impact Metrics</ML>

              <div style={{ display:"flex", flexDirection:"column", gap:SP.lg }}>
                {data.impact.map((item, i) => (
                  <div key={i} style={{
                    paddingBottom: i < data.impact.length-1 ? SP.lg : 0,
                    borderBottom:  i < data.impact.length-1 ? `1px solid ${C.border}` : "none",
                    opacity: vis ? 1 : 0,
                    animation: vis ? `_rtl ${MS.slow} ${E} ${0.2+i*0.08}s both` : "none",
                  }}>
                    <div style={{
                      fontFamily:"'Cormorant',Georgia,serif",
                      fontSize: mob ? "2.5rem" : "3rem", fontWeight:700,
                      color:data.accent, lineHeight:1,
                      marginBottom:"6px", letterSpacing:"-0.02em",
                    }}>
                      <Counter value={item.metric} triggered={vis} />
                    </div>
                    <div style={{ fontSize:"15px", fontWeight:600, color:C.text, marginBottom:"3px" }}>{item.label}</div>
                    <div style={{ fontSize:"12.5px", color:C.muted, lineHeight:1.5 }}>{item.detail}</div>
                  </div>
                ))}
              </div>

              {/* Certificate thumbnail */}
              <div style={{ marginTop:SP.lg, paddingTop:SP.lg, borderTop:`1px solid ${C.border}` }}>
                <div
                  style={{ borderRadius:"10px", overflow:"hidden", border:`1px solid ${C.border}`,
                    position:"relative", transition:`all ${MS.base} ${E}`, cursor:"pointer" }}
                  onMouseEnter={(e) => {
                    if (!mob) {
                      e.currentTarget.style.transform = "scale(1.01)";
                      const ov = e.currentTarget.querySelector(".cov");
                      if (ov) ov.style.opacity = "1";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!mob) {
                      e.currentTarget.style.transform = "scale(1)";
                      const ov = e.currentTarget.querySelector(".cov");
                      if (ov) ov.style.opacity = "0";
                    }
                  }}
                >
                  <img src={data.certPreview} alt={`${data.company} certificate`}
                    style={{ width:"100%", display:"block" }} loading="lazy" />
                  <div className="cov" style={{
                    position:"absolute", inset:0, background:"rgba(0,0,0,0.58)",
                    display:"flex", alignItems:"center", justifyContent:"center",
                    opacity:0, transition:`opacity ${MS.base} ${E}`,
                  }}>
                    <div style={{
                      display:"flex", alignItems:"center", gap:"7px",
                      fontSize:"13px", fontWeight:600, color:"#fff",
                      padding:"10px 18px", background:"rgba(0,0,0,0.75)",
                      borderRadius:"8px", border:`1px solid ${data.accent}55`,
                    }}>
                      <ArrowUpRight size={15} />
                      View Certificate
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SECTION HEAD
═══════════════════════════════════════════════════════════════ */
function SH({ eyebrow, title, sub, vis, dark = false, cursor = false, delay = 0 }) {
  return (
    <div style={{
      marginBottom:"2.5rem",
      opacity: vis ? 1 : 0,
      animation: vis ? `_rtl ${MS.reveal} ${E} ${delay}s both` : "none",
    }}>
      <ML color={dark ? "rgba(0,87,217,0.55)" : C.accent} style={{ marginBottom:"10px" }}>{eyebrow}</ML>
      <h2 style={{
        fontFamily:"'Cormorant',Georgia,serif",
        fontSize:"clamp(1.75rem,4vw,2.75rem)", fontWeight:700,
        color: dark ? "#fff" : C.text,
        letterSpacing:"-0.025em", marginBottom: sub ? "8px" : 0,
        display:"flex", alignItems:"center",
      }}>
        {title}{cursor && <TermCursor />}
      </h2>
      {sub && <p style={{ fontSize:"14px", color: dark ? "rgba(255,255,255,0.42)" : C.muted, lineHeight:1.65, maxWidth:"500px" }}>{sub}</p>}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SUMMARY CARD  — RTL entry + hover lift
═══════════════════════════════════════════════════════════════ */
function SumCard({ stat, accent, vis, delay }) {
  const [h, sh] = useState(false);
  const mob = useMob();
  return (
    <div onMouseEnter={() => sh(true)} onMouseLeave={() => sh(false)} style={{
      padding:SP.lg, background:C.white,
      border:`1px solid ${h ? `${accent}30` : C.border}`,
      borderRadius:"14px",
      transform: h && !mob ? "translateY(-4px)" : "translateY(0)",
      boxShadow: h && !mob ? "0 8px 24px rgba(0,0,0,0.06)" : "none",
      transition:`transform ${MS.base} ${E}, border-color ${MS.fast} ${E}, box-shadow ${MS.base} ${E}`,
      opacity: vis ? 1 : 0,
      animation: vis ? `_rtl ${MS.reveal} ${E} ${delay}s both` : "none",
    }}>
      <div style={{
        fontFamily:"'Cormorant',Georgia,serif",
        fontSize: mob ? "2rem" : "2.5rem", fontWeight:700,
        color: h ? accent : C.text,
        lineHeight:1, marginBottom:SP.sm, letterSpacing:"-0.02em",
        transition:`color ${MS.base} ${E}`,
      }}>{stat.value}</div>
      <div style={{ fontSize:"14px", fontWeight:600, color:C.muted2, marginBottom:"5px" }}>{stat.label}</div>
      <div style={{ fontSize:"12.5px", color:C.muted, lineHeight:1.55 }}>{stat.detail}</div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   ROOT
═══════════════════════════════════════════════════════════════ */
export default function Internships() {
  const [heroRef,    heroVis]    = useInView(0.06);
  const [sumRef,     sumVis]     = useInView(0.06);
  const mob = useMob();
  const [active, sa] = useState(0);

  useEffect(() => {
    const fn = () => {
      const mid = window.innerHeight / 2;
      EXP.forEach((e, i) => {
        const el = document.getElementById(`exp-${e.id}`);
        if (!el) return;
        const r = el.getBoundingClientRect();
        if (r.top <= mid && r.bottom >= mid) sa(i);
      });
    };
    window.addEventListener("scroll", fn, { passive:true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const W = { maxWidth:"1240px", margin:"0 auto", padding:`0 ${mob ? SP.sm : SP.lg}` };

  return (
    <>
      <style>{GLOBAL}</style>
      <ScrollBar />
      <SideNav active={active} />

      {/* Grid texture */}
      <div aria-hidden="true" style={{
        position:"fixed", inset:0, zIndex:0, pointerEvents:"none",
        backgroundImage:[
          "linear-gradient(rgba(0,0,0,0.016) 1px, transparent 1px)",
          "linear-gradient(90deg, rgba(0,0,0,0.016) 1px, transparent 1px)",
        ].join(","),
        backgroundSize:"64px 64px",
        maskImage:"radial-gradient(ellipse 80% 55% at 50% 25%, black 10%, transparent)",
        WebkitMaskImage:"radial-gradient(ellipse 80% 55% at 50% 25%, black 10%, transparent)",
      }}/>

      <div style={{ position:"relative", zIndex:1 }}>

        {/* ═══════ HERO ═══════ */}
        <header ref={heroRef} style={{
          ...W,
          paddingTop:    mob ? SP["3xl"] : SP["4xl"],
          paddingBottom: mob ? SP.xl     : SP["3xl"],
          borderBottom:`1px solid ${C.border}`,
          position:"relative",
        }}>
          {/* Ambient glow */}
          <div aria-hidden="true" style={{
            position:"absolute", top:"20%", left:"50%", transform:"translateX(-50%)",
            width: mob ? "400px" : "640px", height: mob ? "200px" : "320px",
            borderRadius:"50%",
            background:`radial-gradient(circle, ${C.accent}06 0%, transparent 70%)`,
            filter: mob ? "blur(60px)" : "blur(80px)", pointerEvents:"none",
          }}/>

          {/* Eyebrow — RTL */}
          <div style={{
            display:"flex", alignItems:"center", gap:"12px", marginBottom:SP.lg,
            opacity: heroVis ? 1 : 0,
            animation: heroVis ? `_rtl ${MS.slow} ${E} 0.05s both` : "none",
          }}>
            <div style={{ width:"20px", height:"1px", background:C.accent }}/>
            <ML>Industry Experience · 2024 – 2025</ML>
            <TermCursor />
          </div>

          {/* Headline — RTL */}
          <h1 style={{
            fontFamily:"'Cormorant',Georgia,serif",
            fontSize: mob ? "clamp(2.5rem,12vw,4rem)" : "clamp(3.5rem,8vw,6.5rem)",
            fontWeight:700, color:C.text,
            lineHeight:1.03, letterSpacing:"-0.03em",
            marginBottom:"14px", maxWidth:"1000px",
            opacity: heroVis ? 1 : 0,
            animation: heroVis ? `_rtl ${MS.reveal} ${E} 0.12s both` : "none",
          }}>
            Professional Experience
          </h1>

          {/* Gradient underline — scaleX transition */}
          <div style={{
            height:"3px", width: mob ? "160px" : "210px",
            background:`linear-gradient(90deg, ${C.accent}, ${C.purple}, ${C.green})`,
            borderRadius:"2px", marginBottom:SP.xl, transformOrigin:"left",
            transform: heroVis ? "scaleX(1)" : "scaleX(0)",
            transition:`transform ${MS.slow} ${E} 0.18s`,
          }}/>

          {/* Subtitle — RTL */}
          <p style={{
            fontSize: mob ? "1rem" : "1.2rem", color:C.muted2, lineHeight:1.75,
            maxWidth: mob ? "100%" : "680px", marginBottom:SP["2xl"],
            opacity: heroVis ? 1 : 0,
            animation: heroVis ? `_rtl ${MS.reveal} ${E} 0.22s both` : "none",
          }}>
            Three industry internships across full-stack engineering, machine learning, and
            data science — each resulting in production-deployed or independently validated outcomes.
          </p>

          {/* Stats — staggered RTL */}
          <div className="stats-row" style={{
            display:"grid", gridTemplateColumns:"repeat(4,1fr)",
            gap: mob ? SP.lg : SP.xl, maxWidth:"900px",
          }}>
            {[
              { value:3,      label:"Industry Internships" },
              { value:"7+",   label:"Months Experience" },
              { value:"15+",  label:"Projects Shipped" },
              { value:"100%", label:"Verified Credentials" },
            ].map((s, i) => (
              <div key={i} style={{
                opacity: heroVis ? 1 : 0,
                animation: heroVis ? `_rtl ${MS.reveal} ${E} ${0.28+i*0.06}s both` : "none",
              }}>
                <div style={{
                  fontFamily:"'Cormorant',Georgia,serif",
                  fontSize: mob ? "2.5rem" : "3rem", fontWeight:700,
                  color:C.text, lineHeight:1, marginBottom:"6px", letterSpacing:"-0.03em",
                }}>
                  <Counter value={s.value} triggered={heroVis} />
                </div>
                <div style={{ fontSize:"12px", color:C.muted, fontWeight:500, letterSpacing:"0.02em" }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </header>

        {/* ═══════ MARQUEE ═══════ */}
        <Marquee speed={36} />

        {/* ═══════ EXPERIENCE SECTIONS ═══════ */}
        {EXP.map((exp, i) => (
          <ExpSection key={exp.id} data={exp} ri={i} isLast={i === EXP.length - 1} />
        ))}

        {/* ═══════ MARQUEE BREAK ═══════ */}
        <Marquee speed={28} />

        {/* ═══════ AGGREGATE SUMMARY ═══════ */}
        <section ref={sumRef} style={{
          ...W,
          paddingTop:    mob ? SP["3xl"] : SP["4xl"],
          paddingBottom: mob ? SP["3xl"] : SP["4xl"],
          borderTop:`1px solid ${C.border}`,
        }}>
          <SH
            eyebrow="Combined Impact"
            title="Aggregate Overview"
            sub="Across all three internships — full-stack, ML, and data science."
            vis={sumVis}
            cursor
          />

          <div className="sum-grid" style={{
            display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:SP.md,
          }}>
            {[
              { value:"5+",      label:"Major Projects",    detail:"Full-stack & ML applications built",       accent:C.accent  },
              { value:"50K+",    label:"Records Processed", detail:"Across structured & text datasets",        accent:C.green   },
              { value:"6",       label:"ML Models",         detail:"Classification & NLP pipelines",           accent:C.purple  },
              { value:"85–90%",  label:"Best Accuracy",     detail:"Image & text classification tasks",        accent:C.accent  },
              { value:"Multiple",label:"API Integrations",  detail:"REST-based frontend–backend connectivity", accent:C.green   },
              { value:"2",       label:"OAuth Providers",   detail:"Google & GitHub authentication",           accent:C.purple  },
            ].map((s, i) => (
              <SumCard key={i} stat={s} accent={s.accent} vis={sumVis} delay={i*0.06} />
            ))}
          </div>
        </section>

        {/* ═══════ FOOTER ═══════ */}
        <footer style={{
          ...W,
          paddingTop:    mob ? SP.xl   : SP["2xl"],
          paddingBottom: mob ? SP.xl   : SP["2xl"],
          borderTop:`1px solid ${C.border}`,
        }}>
          <div className="foot-row" style={{
            display:"flex", alignItems:"center",
            justifyContent:"space-between", gap:SP.lg, flexWrap:"wrap",
          }}>
            <div style={{ display:"flex", alignItems:"center", gap:"10px" }}>
              <div style={{
                width:"5px", height:"5px", borderRadius:"50%", background:C.green,
                animation:"_pulse 2.2s ease-in-out infinite",
              }}/>
              <span style={{ fontFamily:"'DM Mono',monospace", fontSize:"13px", color:C.muted2 }}>
                All certificates independently verifiable via Google Drive
              </span>
            </div>

            <div style={{ display:"flex", flexWrap:"wrap", gap:SP.sm }}>
              {[
                { label:"Email",    href:"mailto:g.sivasatyasaibhagavan@gmail.com" },
                { label:"LinkedIn", href:"https://www.linkedin.com/in/gopalajosyula-siva-satya-sai-bhagavan-1624a027b/" },
                { label:"GitHub",   href:"https://github.com/bhagavan444" },
              ].map(l => (
                <MagBtn key={l.label} href={l.href} accent={C.accent}
                  extraStyle={{ padding:"7px 14px", fontSize:"12px" }}>
                  {l.label}
                </MagBtn>
              ))}
            </div>
          </div>

          {/* Bottom bar */}
          <div style={{
            marginTop:SP.xl, paddingTop:SP.lg,
            borderTop:`1px solid ${C.border}`,
            display:"flex", justifyContent:"space-between", alignItems:"center",
            flexWrap:"wrap", gap:SP.sm,
          }}>
            <div style={{ fontFamily:"'DM Mono',monospace", fontSize:"11px", color:C.muted }}>
              © 2026 Siva Satya Sai Bhagavan
            </div>
            <div style={{ display:"flex", gap:"20px" }}>
              {["Privacy","Terms","Sitemap"].map(l => (
                <a key={l} href="#" style={{
                  fontFamily:"'DM Mono',monospace", fontSize:"11px",
                  color:C.muted, textDecoration:"none",
                }}>{l}</a>
              ))}
            </div>
          </div>
        </footer>

      </div>
    </>
  );
}