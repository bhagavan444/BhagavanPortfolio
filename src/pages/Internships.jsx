"use client";

import React, { useState, useEffect, useRef } from "react";
import { MapPin, CheckCircle2, ArrowUpRight } from "lucide-react";

/* ═══════════════════════════════════════════════════════════════
   DESIGN TOKENS — Monochrome Architectural (Skills System)
═══════════════════════════════════════════════════════════════ */
const C = {
  bg:        "#0B0B0B",
  surface:   "#111111",
  surfaceHi: "#151515",
  white:     "#1A1A1A",
  border:    "rgba(255,255,255,0.06)",
  border2:   "rgba(255,255,255,0.12)",
  text:      "#FFFFFF",
  muted:     "rgba(255,255,255,0.55)",
  muted2:    "rgba(255,255,255,0.40)",
  accent:    "#FFFFFF",
  accentSub: "rgba(255,255,255,0.04)",
  accentLine:"rgba(255,255,255,0.08)",
  ink:       "#000000",
  inkMid:    "#0F0F0F",
  /* internship accent palette — white-family tints */
  blue:      "#FFFFFF",
  purple:    "rgba(255,255,255,0.85)",
  green:     "rgba(255,255,255,0.70)",
};

/* Per-internship accent colors — visible as subtle tints only */
const IA = {
  1: { accent:"#FFFFFF",              sub:"rgba(255,255,255,0.04)", bar:"rgba(255,255,255,0.55)" },
  2: { accent:"rgba(255,255,255,0.85)",sub:"rgba(255,255,255,0.03)", bar:"rgba(255,255,255,0.42)" },
  3: { accent:"rgba(255,255,255,0.70)",sub:"rgba(255,255,255,0.025)",bar:"rgba(255,255,255,0.32)" },
};

const E  = "cubic-bezier(0.16, 1, 0.3, 1)";
const MS = { fast:"130ms", base:"190ms", slow:"320ms", reveal:"440ms" };

/* ═══════════════════════════════════════════════════════════════
   DEVICON CDN MAP — combined from both pages
═══════════════════════════════════════════════════════════════ */
const IB = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons";
const ICONS = {
  "React":            `${IB}/react/react-original.svg`,
  "HTML":             `${IB}/html5/html5-original.svg`,
  "CSS":              `${IB}/css3/css3-original.svg`,
  "JavaScript":       `${IB}/javascript/javascript-original.svg`,
  "TypeScript":       `${IB}/typescript/typescript-original.svg`,
  "Node.js":          `${IB}/nodejs/nodejs-original.svg`,
  "Express.js":       `${IB}/express/express-original.svg`,
  "MongoDB Atlas":    `${IB}/mongodb/mongodb-original.svg`,
  "OAuth":            `${IB}/google/google-original.svg`,
  "JWT":              `${IB}/nodejs/nodejs-plain.svg`,
  "Git":              `${IB}/git/git-original.svg`,
  "Postman":          `${IB}/postman/postman-original.svg`,
  "TensorFlow":       `${IB}/tensorflow/tensorflow-original.svg`,
  "Keras":            `${IB}/keras/keras-original.svg`,
  "Scikit-learn":     `${IB}/scikitlearn/scikitlearn-original.svg`,
  "OpenCV":           `${IB}/opencv/opencv-original.svg`,
  "NumPy":            `${IB}/numpy/numpy-original.svg`,
  "Pandas":           `${IB}/pandas/pandas-original.svg`,
  "Flask API":        `${IB}/flask/flask-original.svg`,
  "Jupyter Notebook": `${IB}/jupyter/jupyter-original.svg`,
  "Python":           `${IB}/python/python-original.svg`,
  "NLTK":             `${IB}/python/python-plain.svg`,
  "TF-IDF":           `${IB}/python/python-original.svg`,
  "Matplotlib":       `${IB}/matplotlib/matplotlib-original.svg`,
  "VS Code":          `${IB}/vscode/vscode-original.svg`,
  "Figma":            `${IB}/figma/figma-original.svg`,
};

const TICKER = [
  "React","Node.js","MongoDB Atlas","TensorFlow","Keras","Python","Scikit-learn",
  "Flask API","JWT","OAuth","NumPy","Pandas","OpenCV","Jupyter Notebook","Git","Postman",
  "JavaScript","Express.js","NLTK","Matplotlib",
];

/* ═══════════════════════════════════════════════════════════════
   GLOBAL CSS — Skills System Applied
═══════════════════════════════════════════════════════════════ */
const GLOBAL = `
  @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@600;700&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&family=DM+Mono:wght@400;500&display=swap');

  *, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }
  html { scroll-behavior:smooth; overflow-x:hidden; }
  body {
    font-family:'DM Sans', system-ui, sans-serif;
    background:#0B0B0B;
    color:#FFFFFF;
    -webkit-font-smoothing:antialiased;
    overflow-x:hidden;
    cursor:none;
  }
  a, button, [data-magnetic] { cursor:none; }

  @keyframes _cursorIn {
    from { opacity:0; transform:translate(-50%,-50%) scale(0.2); }
    to   { opacity:1; transform:translate(-50%,-50%) scale(1); }
  }

  ::selection { background:rgba(255,255,255,0.12); }
  ::-webkit-scrollbar { width:2px; }
  ::-webkit-scrollbar-track { background:transparent; }
  ::-webkit-scrollbar-thumb { background:rgba(255,255,255,0.25); border-radius:2px; }

  /* ── Keyframes ────────────────────────────────────── */
  @keyframes _rtl       { from{opacity:0;transform:translateX(48px);}  to{opacity:1;transform:translateX(0);} }
  @keyframes _ltr       { from{opacity:0;transform:translateX(-48px);} to{opacity:1;transform:translateX(0);} }
  @keyframes _up        { from{opacity:0;transform:translateY(18px);}  to{opacity:1;transform:translateY(0);} }
  @keyframes _fade      { from{opacity:0;} to{opacity:1;} }
  @keyframes _si        { from{opacity:0;transform:scale(0.96);} to{opacity:1;transform:scale(1);} }
  @keyframes _marquee   { from{transform:translateX(0);} to{transform:translateX(-50%);} }
  @keyframes _tagPop    { from{opacity:0;transform:translateX(14px) scale(0.92);} to{opacity:1;transform:translateX(0) scale(1);} }
  @keyframes _iconIn    { from{opacity:0;transform:translateX(10px) scale(0.78);} to{opacity:1;transform:translateX(0) scale(1);} }
  @keyframes _pulse     { 0%,100%{opacity:0.3;transform:scale(1);} 50%{opacity:1;transform:scale(1.35);} }
  @keyframes _blink     { 0%,100%{opacity:1;} 50%{opacity:0;} }
  @keyframes _fadeSlide { from{opacity:0;transform:translateY(12px);} to{opacity:1;transform:translateY(0);} }
  @keyframes _slideIn   { from{transform:scaleX(0);transform-origin:left;} to{transform:scaleX(1);transform-origin:left;} }
  @keyframes _countUp   { from{opacity:0;transform:translateY(8px);} to{opacity:1;transform:translateY(0);} }

  /* ── Devicon hover ──────────────────────────────── */
  .di {
    transition: transform 130ms cubic-bezier(0.16,1,0.3,1), filter 130ms cubic-bezier(0.16,1,0.3,1);
    cursor:default;
  }
  .di:hover {
    transform: scale(1.25) rotate(-6deg);
    filter: drop-shadow(0 2px 8px rgba(255,255,255,0.18));
  }

  /* ── Scroll progress gradient ───────────────────── */
  #scroll-prog {
    position:fixed; top:0; left:0; right:0; height:2px;
    background:rgba(255,255,255,0.06); z-index:9998;
  }
  #scroll-prog-bar {
    height:100%;
    background:linear-gradient(90deg, rgba(255,255,255,0.9), rgba(255,255,255,0.5), rgba(255,255,255,0.2));
    transition:width 0.1s linear;
  }

  .snav-btn:hover .snav-line { width:22px !important; }

  button:focus-visible, a:focus-visible { outline:1px solid rgba(255,255,255,0.4); outline-offset:2px; }

  @media (prefers-reduced-motion:reduce) {
    *, *::before, *::after { animation-duration:0.01ms !important; transition-duration:0.01ms !important; }
    .mqinner { animation:none !important; }
  }
  @media (max-width:1024px) { .exp-grid { grid-template-columns:1fr !important; } }
  @media (max-width:768px) {
    body { cursor:auto !important; }
    #mc-dot, #mc-ring { display:none !important; }
    a, button, [data-magnetic] { cursor:auto !important; }
    .snav        { display:none !important; }
    .exp-grid    { grid-template-columns:1fr !important; gap:1.75rem !important; }
    .stats-row   { grid-template-columns:repeat(2,1fr) !important; gap:1rem !important; }
    .sum-grid    { grid-template-columns:1fr 1fr !important; gap:0.65rem !important; }
    .foot-row    { flex-direction:column !important; align-items:flex-start !important; }
    .cert-thumb  { display:none !important; }
    .foot-links  { gap:0.5rem !important; }
  }
  @media (max-width:420px) {
    .stats-row { grid-template-columns:repeat(2,1fr) !important; }
    .sum-grid  { grid-template-columns:1fr !important; }
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
    certPreview:"/images/study.jpg",
    summary:"Contributed to a production-grade EdTech platform built on the MERN stack. Worked within a cross-functional team to deliver user-facing features, authentication flows, and API-driven data handling — operating under a real-world sprint structure with code review cycles.",
    impact:[
      { metric:"3",    label:"Web Modules Delivered",  detail:"Scoped, built, and integrated end-to-end" },
      { metric:"2",    label:"OAuth Providers",         detail:"Google & GitHub login with JWT session handling" },
      { metric:"100%", label:"API Connectivity",        detail:"All frontend modules backed by documented REST APIs" },
    ],
    contributions:[
      "Architected reusable React components with controlled state management, reducing duplicate UI logic across three feature modules",
      "Implemented Google and GitHub OAuth flows end-to-end, including token exchange, JWT generation, and protected route enforcement on the Express layer",
      "Designed normalized MongoDB schemas for user profiles and application data, accounting for relational lookups and indexing requirements",
      "Built and validated REST API endpoints handling form submission, file references, and user session data — tested via Postman collections",
      "Managed version control via Git with feature branches, pull requests, and peer review under an agile-style sprint workflow",
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
    certPreview:"/images/intern.png",
    summary:"Worked on an industrial computer vision project — Smart Sorting — focused on building and evaluating CNN-based classification models. Covered the full ML pipeline from data ingestion and preprocessing through to model evaluation and Flask-based API deployment for real-time inference.",
    impact:[
      { metric:"2",   label:"ML Pipelines Built",  detail:"End-to-end classification workflows" },
      { metric:"85%", label:"CNN Accuracy",          detail:"Achieved on held-out image classification set" },
      { metric:"1",   label:"Inference Endpoint",    detail:"Flask API serving real-time model predictions" },
    ],
    contributions:[
      "Built a CNN image classification model using TensorFlow and Keras, iterating on layer configurations to improve validation accuracy to 85% on the target dataset",
      "Executed preprocessing pipelines including resizing, normalization, and augmentation (flipping, rotation, zoom) to improve model generalization on limited training data",
      "Evaluated model performance using accuracy curves, confusion matrices, and per-class precision/recall — identifying and addressing class imbalance issues",
      "Packaged the trained model into a Flask REST API with a /predict endpoint accepting image uploads and returning class labels with confidence scores",
      "Validated inference pipeline end-to-end using Postman, verifying response accuracy and latency under simulated real-world input conditions",
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
    certPreview:"/images/blackbucks.jpeg",
    summary:"Focused on structured data analysis, feature engineering, and supervised model development across real-world datasets. Applied an experimental mindset — iterating on preprocessing decisions and model selection based on evaluation metrics rather than defaults.",
    impact:[
      { metric:"6",    label:"Models Evaluated",  detail:"Supervised classifiers benchmarked and compared" },
      { metric:"90%+", label:"Best Accuracy",      detail:"Achieved across classification tasks with tuned pipelines" },
      { metric:"1",    label:"NLP Pipeline",       detail:"TF-IDF vectorization for text classification" },
    ],
    contributions:[
      "Cleaned and preprocessed structured datasets in Pandas — handling missing values, encoding categorical features, and removing outliers to improve downstream model reliability",
      "Engineered derived features from raw columns, applying domain reasoning to select variables with higher predictive signal for classification targets",
      "Built and benchmarked six supervised classifiers including Logistic Regression, Decision Tree, and Random Forest — selecting the best-performing model via stratified cross-validation",
      "Applied TF-IDF vectorization to text data, building a baseline NLP classification pipeline that achieved consistent performance across validation folds",
      "Documented experimental results using Jupyter Notebooks — tracking accuracy, precision, recall, and F1-score across model iterations for reproducibility",
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
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) sv(true); }, { threshold: t });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [t]);
  return [ref, vis];
}

function useMob() {
  const [m, sm] = useState(false);
  useEffect(() => {
    const fn = () => sm(window.innerWidth < 768);
    fn();
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);
  return m;
}

/* ═══════════════════════════════════════════════════════════════
   COUNTER — parses suffix from value string
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
    if (s.includes("K"))  return `${Math.floor(x / 1000)}K+`;
    if (s.includes("%"))  return `${x}%`;
    if (s.endsWith("+"))  return `${x}+`;
    if (s.includes("–"))  return s;
    return `${x}`;
  };
  return <>{fmt(n)}</>;
}

/* ═══════════════════════════════════════════════════════════════
   MAGNETIC CURSOR — from skills system
═══════════════════════════════════════════════════════════════ */
function MagneticCursor() {
  const dotRef  = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const dot  = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mx = -200, my = -200;
    let rx = -200, ry = -200;
    let rSize = 36, targetRSize = 36;
    let magEl = null;
    let magOX = 0, magOY = 0, targetMagOX = 0, targetMagOY = 0;
    let rafId = null;
    let visible = false;
    const lerp = (a, b, t) => a + (b - a) * t;

    const onMove = (e) => {
      mx = e.clientX; my = e.clientY;
      if (!visible) {
        visible = true;
        dot.style.opacity  = "1";
        ring.style.opacity = "1";
      }
      const els = document.querySelectorAll("[data-magnetic]");
      let found = null;
      els.forEach((el) => {
        const r = el.getBoundingClientRect();
        const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
        const dist = Math.hypot(mx - cx, my - cy);
        if (dist < Math.max(r.width, r.height) * 0.65) found = el;
      });
      if (found) {
        magEl = found;
        const r = found.getBoundingClientRect();
        const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
        targetMagOX = (mx - cx) * 0.38;
        targetMagOY = (my - cy) * 0.38;
        targetRSize = 58;
      } else {
        if (magEl) { magEl.style.transform = ""; magEl.style.transition = `transform 400ms ${E}`; }
        magEl = null; targetMagOX = 0; targetMagOY = 0; targetRSize = 36;
      }
    };

    const onLeave = () => {
      visible = false;
      dot.style.opacity = "0"; ring.style.opacity = "0";
      if (magEl) { magEl.style.transform = ""; magEl = null; }
    };

    const onDown = () => {
      targetRSize = 22;
      dot.style.transform = "translate(-50%,-50%) scale(0.5)";
    };
    const onUp = () => {
      targetRSize = magEl ? 58 : 36;
      dot.style.transform = "translate(-50%,-50%) scale(1)";
    };

    const onOverInteractive = (e) => {
      if (e.target.closest("a,button,[data-magnetic]")) {
        ring.style.borderColor = "rgba(255,255,255,0.9)";
        ring.style.background  = "rgba(255,255,255,0.06)";
      } else {
        ring.style.borderColor = "rgba(255,255,255,0.45)";
        ring.style.background  = "transparent";
      }
    };

    const tick = () => {
      dot.style.left = mx + "px"; dot.style.top = my + "px";
      rx = lerp(rx, mx, 0.13); ry = lerp(ry, my, 0.13);
      rSize = lerp(rSize, targetRSize, 0.14);
      ring.style.left = rx + "px"; ring.style.top = ry + "px";
      ring.style.width = rSize + "px"; ring.style.height = rSize + "px";
      if (magEl) {
        magOX = lerp(magOX, targetMagOX, 0.14);
        magOY = lerp(magOY, targetMagOY, 0.14);
        magEl.style.transform = `translate(${magOX}px, ${magOY}px)`;
        magEl.style.transition = "none";
      } else {
        magOX = lerp(magOX, 0, 0.12);
        magOY = lerp(magOY, 0, 0.12);
      }
      rafId = requestAnimationFrame(tick);
    };

    document.addEventListener("mousemove",  onMove,            { passive:true });
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mousedown",  onDown);
    document.addEventListener("mouseup",    onUp);
    document.addEventListener("mouseover",  onOverInteractive, { passive:true });
    rafId = requestAnimationFrame(tick);
    return () => {
      document.removeEventListener("mousemove",  onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mousedown",  onDown);
      document.removeEventListener("mouseup",    onUp);
      document.removeEventListener("mouseover",  onOverInteractive);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const BASE = {
    position:"fixed", top:0, left:0,
    transform:"translate(-50%,-50%)",
    pointerEvents:"none", zIndex:99999,
    opacity:0,
    animation:"_cursorIn 400ms cubic-bezier(0.16,1,0.3,1) 0.5s both",
  };

  return (
    <>
      <div id="mc-dot" ref={dotRef} style={{
        ...BASE,
        width:"8px", height:"8px", borderRadius:"50%",
        background:"#FFFFFF",
        transition:"transform 120ms cubic-bezier(0.16,1,0.3,1), opacity 200ms ease",
        willChange:"left,top,transform",
      }}/>
      <div id="mc-ring" ref={ringRef} style={{
        ...BASE,
        width:"36px", height:"36px", borderRadius:"50%",
        border:"1.5px solid rgba(255,255,255,0.45)",
        background:"transparent",
        transition:"border-color 180ms ease, background 180ms ease, opacity 200ms ease",
        willChange:"left,top,width,height",
        mixBlendMode:"difference",
      }}/>
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════
   DEVICON IMG — colored icons (no grayscale)
═══════════════════════════════════════════════════════════════ */
function DI({ name, size = 18, extraStyle = {} }) {
  const src = ICONS[name];
  if (!src) return null;
  return (
    <img src={src} alt={name} className="di" width={size} height={size} loading="lazy"
      style={{ display:"block", flexShrink:0, borderRadius:"3px", ...extraStyle }} />
  );
}

/* ═══════════════════════════════════════════════════════════════
   MARQUEE — dark theme with colored icons
═══════════════════════════════════════════════════════════════ */
function Marquee({ speed = 36 }) {
  const items = [...TICKER, ...TICKER];
  return (
    <div style={{
      overflow:"hidden",
      borderTop:"1px solid rgba(255,255,255,0.06)",
      borderBottom:"1px solid rgba(255,255,255,0.06)",
      padding:"10px 0", background:"#111111", position:"relative",
    }}>
      {["left","right"].map(s => (
        <div key={s} style={{
          position:"absolute", [s]:0, top:0, bottom:0, width:"80px",
          background:`linear-gradient(to ${s==="left"?"right":"left"}, #111111, transparent)`,
          zIndex:2, pointerEvents:"none",
        }}/>
      ))}
      <div className="mqinner" style={{
        display:"flex", alignItems:"center", gap:"36px", width:"max-content",
        animation:`_marquee ${speed}s linear infinite`, willChange:"transform",
      }}>
        {items.map((name, i) => (
          <div key={`${name}-${i}`} style={{
            display:"flex", alignItems:"center", gap:"8px", opacity:0.50, flexShrink:0,
          }}>
            {ICONS[name] && (
              <img src={ICONS[name]} alt={name} className="di" width={17} height={17} loading="lazy"
                style={{ display:"block", borderRadius:"2px" }} />
            )}
            <span style={{
              fontFamily:"'DM Mono',monospace", fontSize:"11px", fontWeight:500,
              color:"rgba(255,255,255,0.50)", letterSpacing:"0.04em", whiteSpace:"nowrap",
            }}>{name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SCROLL PROGRESS BAR
═══════════════════════════════════════════════════════════════ */
function ScrollBar() {
  const [pct, sp] = useState(0);
  const raf = useRef(null);
  useEffect(() => {
    const fn = () => {
      if (raf.current) return;
      raf.current = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        sp(max > 0 ? (window.scrollY / max) * 100 : 0);
        raf.current = null;
      });
    };
    window.addEventListener("scroll", fn, { passive:true });
    return () => { window.removeEventListener("scroll", fn); if (raf.current) cancelAnimationFrame(raf.current); };
  }, []);
  return (
    <div id="scroll-prog">
      <div id="scroll-prog-bar" style={{ width:`${pct}%` }}/>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SIDE NAV — skills style dots
═══════════════════════════════════════════════════════════════ */
function SideNav({ active }) {
  return (
    <nav className="snav" style={{
      position:"fixed", left:"1.25rem", top:"50%", transform:"translateY(-50%)",
      zIndex:100, display:"flex", flexDirection:"column", gap:"14px",
    }}>
      {EXP.map((e, i) => (
        <button key={e.id}
          className="snav-btn"
          data-magnetic
          onClick={() => document.getElementById(`exp-${e.id}`)?.scrollIntoView({ behavior:"smooth" })}
          aria-label={`Jump to ${e.role}`}
          style={{
            display:"flex", alignItems:"center", gap:"6px",
            background:"none", border:"none", cursor:"none", padding:0, outline:"none",
          }}
        >
          <div className="snav-line" style={{
            height:"1.5px",
            width: active===i ? "22px" : "10px",
            background: active===i ? "#FFFFFF" : "rgba(255,255,255,0.18)",
            borderRadius:"1px", transition:`all 320ms ${E}`,
          }}/>
          <span style={{
            fontFamily:"'DM Mono',monospace", fontSize:"9px", fontWeight:500,
            color:"rgba(255,255,255,0.55)",
            opacity: active===i ? 1 : 0, transition:`opacity 320ms ${E}`,
          }}>{String(i+1).padStart(2,"0")}</span>
        </button>
      ))}
    </nav>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MONO LABEL — skills system
═══════════════════════════════════════════════════════════════ */
function ML({ children, color = "rgba(255,255,255,0.55)", style = {} }) {
  return (
    <span style={{
      display:"block", fontFamily:"'DM Mono',monospace", fontSize:"10px",
      fontWeight:500, letterSpacing:"0.14em", textTransform:"uppercase", color, ...style,
    }}>{children}</span>
  );
}

function TermCursor() {
  return (
    <span style={{
      display:"inline-block", width:"8px", height:"1.1em",
      background:"#FFFFFF", marginLeft:"3px", verticalAlign:"middle",
      animation:"_blink 1.1s step-end infinite", borderRadius:"1px",
    }}/>
  );
}

/* ═══════════════════════════════════════════════════════════════
   TECH TAG — colored icons, dark monochrome styling
═══════════════════════════════════════════════════════════════ */
function Tag({ name, visible, delay }) {
  const [h, sh] = useState(false);
  return (
    <span
      data-magnetic
      onMouseEnter={() => sh(true)}
      onMouseLeave={() => sh(false)}
      style={{
        display:"inline-flex", alignItems:"center", gap:"7px",
        padding:"6px 12px 6px 8px", borderRadius:"6px",
        background:  h ? "rgba(255,255,255,0.09)" : "#141414",
        border:      `1px solid ${h ? "rgba(255,255,255,0.20)" : "rgba(255,255,255,0.07)"}`,
        fontFamily:  "'DM Mono',monospace", fontSize:"12px",
        color:       h ? "#FFFFFF" : "rgba(255,255,255,0.45)",
        userSelect:"none",
        transition:  `background 130ms ${E}, border-color 130ms ${E}, color 130ms ${E}`,
        opacity:     visible ? 1 : 0,
        animation:   visible ? `_tagPop 320ms ${E} ${delay}s both` : "none",
      }}
    >
      <DI name={name} size={15} extraStyle={{ opacity: h?1:0.70, transition:`opacity 130ms ${E}` }} />
      {name}
    </span>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAG BUTTON — skills dark style
═══════════════════════════════════════════════════════════════ */
function MagBtn({ children, href, extraStyle = {} }) {
  const [pos, sp] = useState({ x:0, y:0 });
  const [h, sh]   = useState(false);
  const ref = useRef(null);
  const mob = useMob();
  return (
    <a
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      data-magnetic
      onMouseMove={(e) => {
        if (mob || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        sp({ x:(e.clientX-r.left-r.width/2)*0.20, y:(e.clientY-r.top-r.height/2)*0.20 });
      }}
      onMouseEnter={() => sh(true)}
      onMouseLeave={() => { sh(false); sp({ x:0, y:0 }); }}
      style={{
        display:"inline-flex", alignItems:"center", gap:"7px",
        padding:"10px 18px", minHeight:"44px",
        background: h ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.07)",
        border: `1px solid ${h ? "rgba(255,255,255,0.28)" : "rgba(255,255,255,0.12)"}`,
        borderRadius:"8px", fontSize:"13px", fontWeight:600,
        color:"#FFFFFF", textDecoration:"none",
        fontFamily:"'DM Mono',monospace",
        transition:`background 190ms ${E}, border-color 190ms ${E}`,
        transform: mob ? "none" : `translate(${pos.x}px,${pos.y}px)`,
        ...extraStyle,
      }}
    >{children}</a>
  );
}

/* ═══════════════════════════════════════════════════════════════
   EXPERIENCE SECTION — skills CapRow aesthetic applied
═══════════════════════════════════════════════════════════════ */
function ExpSection({ data, ri, isLast }) {
  const [ref, vis] = useInView(0.06);
  const [tab, st]  = useState("contributions");
  const [tilt, tt] = useState({ x:0, y:0 });
  const mob = useMob();
  const even = ri % 2 === 0;
  const ia = IA[data.id];

  return (
    <section
      id={`exp-${data.id}`}
      ref={ref}
      style={{
        minHeight: mob ? "auto" : "100vh",
        display:"flex", alignItems:"center", position:"relative",
        padding: mob ? "3rem 0 3.5rem" : "8rem 0",
        borderBottom: isLast ? "none" : "1px solid rgba(255,255,255,0.06)",
        background:"#0B0B0B",
      }}
    >
      {/* Year watermark */}
      <div aria-hidden="true" style={{
        position:"absolute",
        left: mob ? "-3%" : "-2%",
        top:  mob ? "2%" : "14%",
        fontSize: mob ? "clamp(4.5rem,20vw,6.5rem)" : "clamp(9rem,17vw,18rem)",
        fontFamily:"'Dancing Script',cursive", fontWeight:700,
        color:"rgba(255,255,255,0.025)",
        lineHeight:1, userSelect:"none", pointerEvents:"none",
      }}>{data.year}</div>

      {/* Subtle radial glow */}
      <div aria-hidden="true" style={{
        position:"absolute", left:"10%", top:"25%",
        width: mob ? "200px" : "440px", height: mob ? "200px" : "440px",
        borderRadius:"50%",
        background:`radial-gradient(circle, rgba(255,255,255,0.025) 0%, transparent 70%)`,
        filter:`blur(${mob?50:90}px)`, pointerEvents:"none",
      }}/>

      <div style={{
        maxWidth:"1240px", margin:"0 auto",
        padding: mob ? "0 1rem" : "0 2rem",
        width:"100%",
      }}>
        <div className="exp-grid" style={{
          display:"grid",
          gridTemplateColumns: mob ? "1fr" : "1.45fr 0.85fr",
          gap: mob ? "1.75rem" : "4rem",
          alignItems:"start",
        }}>

          {/* ── LEFT PANEL ── */}
          <div style={{
            opacity: vis ? 1 : 0,
            animation: vis ? `${even?"_ltr":"_rtl"} ${MS.reveal} ${E} 0.04s both` : "none",
          }}>
            {/* Header block */}
            <div style={{ marginBottom: mob ? "1.1rem" : "2.25rem" }}>
              <div style={{ display:"flex", alignItems:"center", gap:"12px", marginBottom:"14px" }}>
                {/* Accent side bar — skills CapRow style */}
                <div style={{
                  width:"2px",
                  height: mob ? "30px" : "40px",
                  background: ia.accent,
                  borderRadius:"0 2px 2px 0",
                  transformOrigin:"top",
                  transform: vis ? "scaleY(1)" : "scaleY(0)",
                  transition:`transform 320ms ${E} 0.2s`,
                  flexShrink:0,
                }}/>
                <div>
                  <div style={{ display:"flex", alignItems:"center", gap:"8px", marginBottom:"3px" }}>
                    <ML color={ia.bar} style={{ marginBottom:0 }}>{data.period} · {data.duration}</ML>
                    <div style={{
                      height:"1px", width:"16px",
                      background:"rgba(255,255,255,0.25)",
                      transformOrigin:"left",
                      transform: vis ? "scaleX(1)" : "scaleX(0)",
                      transition:`transform ${MS.base} ${E} 0.24s`,
                    }}/>
                  </div>
                  <span style={{ fontFamily:"'DM Mono',monospace", fontSize:"9px", color:"rgba(255,255,255,0.30)", letterSpacing:"0.06em" }}>
                    {data.type}
                  </span>
                </div>
              </div>

              {/* Role — Dancing Script large */}
              <h2 style={{
                fontFamily:"'Dancing Script',cursive",
                fontSize: mob ? "clamp(2rem,8vw,2.8rem)" : "clamp(2.8rem,5.5vw,4rem)",
                fontWeight:700, color:"#FFFFFF",
                lineHeight:1.08, letterSpacing:"-0.01em", marginBottom:"8px",
              }}>{data.role}</h2>

              <div style={{
                fontSize: mob ? "0.92rem" : "1.05rem",
                fontWeight:600, color:"rgba(255,255,255,0.55)",
                marginBottom:"8px",
              }}>{data.company}</div>

              <div style={{ display:"flex", alignItems:"center", gap:"5px", fontSize:"12px", color:"rgba(255,255,255,0.30)" }}>
                <MapPin size={11} style={{ opacity:0.6 }} />{data.location}
              </div>
            </div>

            {/* Gradient underline bar */}
            <div style={{
              height:"2px", width:"80px",
              marginBottom: mob ? "1.25rem" : "2.25rem",
              background:`linear-gradient(90deg, ${ia.accent}, transparent)`,
              borderRadius:"2px", transformOrigin:"left",
              transform: vis ? "scaleX(1)" : "scaleX(0)",
              transition:`transform 320ms ${E} 0.22s`,
            }}/>

            {/* Summary */}
            <p style={{
              fontSize: mob ? "0.86rem" : "0.95rem",
              color:"rgba(255,255,255,0.40)",
              lineHeight:1.75,
              marginBottom: mob ? "1.4rem" : "2.75rem",
            }}>{data.summary}</p>

            {/* Tabs — skills system style */}
            <div style={{ marginBottom: mob ? "1rem" : "2rem" }}>
              <div style={{
                display:"flex", gap: mob ? "1.5rem" : "2.5rem",
                borderBottom:"1px solid rgba(255,255,255,0.06)",
              }}>
                {["contributions","stack"].map(t => (
                  <button key={t} data-magnetic onClick={() => st(t)} style={{
                    background:"none", border:"none",
                    padding: mob ? "0.55rem 0" : "0.7rem 0",
                    minHeight:"36px",
                    fontSize: mob ? "12px" : "13px",
                    fontWeight:600,
                    fontFamily:"'DM Mono',monospace",
                    color: tab===t ? "#FFFFFF" : "rgba(255,255,255,0.35)",
                    cursor:"none", textTransform:"capitalize",
                    letterSpacing:"0.05em",
                    transition:`color 190ms ${E}`,
                    position:"relative",
                  }}>
                    {t}
                    {tab===t && (
                      <div style={{
                        position:"absolute", bottom:-1, left:0, right:0,
                        height:"1.5px",
                        background:"#FFFFFF",
                        animation:`_slideIn 190ms ${E}`,
                      }}/>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab content */}
            <div style={{ minHeight: mob ? "auto" : "260px" }}>
              {tab === "contributions" && (
                <ul style={{
                  listStyle:"none", display:"flex", flexDirection:"column",
                  gap: mob ? "0.8rem" : "1.1rem",
                  animation:`_fadeSlide 320ms ${E}`,
                }}>
                  {data.contributions.map((item, i) => (
                    <li key={i} style={{ display:"flex", gap:"10px", alignItems:"flex-start" }}>
                      <div style={{
                        marginTop:"0.46rem", width:"3px", height:"3px", borderRadius:"50%",
                        background:"rgba(255,255,255,0.45)", flexShrink:0,
                        animation: vis ? `_iconIn 280ms ${E} ${0.10+i*0.06}s both` : "none",
                      }}/>
                      <span style={{
                        fontSize: mob ? "13px" : "13.5px",
                        color:"rgba(255,255,255,0.42)", lineHeight:1.70,
                      }}>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
              {tab === "stack" && (
                <div style={{
                  display:"flex", flexDirection:"column",
                  gap: mob ? "1.25rem" : "1.75rem",
                  animation:`_fadeSlide 320ms ${E}`,
                }}>
                  {Object.entries(data.stack).map(([cat, items], ci) => (
                    <div key={cat}>
                      <ML color="rgba(255,255,255,0.35)" style={{ marginBottom:"10px" }}>{cat}</ML>
                      <div style={{ display:"flex", flexWrap:"wrap", gap:"7px" }}>
                        {items.map((t, ti) => (
                          <Tag key={t} name={t} visible={tab==="stack"} delay={ci*0.06+ti*0.035} />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Certificate button */}
            <div style={{ marginTop: mob ? "1.5rem" : "3rem" }}>
              <MagBtn
                href={data.certPreview}
                extraStyle={ mob ? { padding:"8px 14px", fontSize:"12px", minHeight:"38px" } : {} }
              >
                <CheckCircle2 size={13} style={{ opacity:0.7 }} />
                View Verified Certificate
              </MagBtn>
            </div>
          </div>

          {/* ── RIGHT PANEL — Impact Card ── */}
          <div
            onMouseMove={(e) => {
              if (mob) return;
              const el = e.currentTarget;
              const r = el.getBoundingClientRect();
              tt({ x:((e.clientY-r.top)/r.height-0.5)*2, y:-((e.clientX-r.left)/r.width-0.5)*2 });
            }}
            onMouseLeave={() => tt({ x:0, y:0 })}
            style={{
              opacity: vis ? 1 : 0,
              animation: vis ? `${even?"_rtl":"_ltr"} ${MS.reveal} ${E} 0.10s both` : "none",
              position: mob ? "relative" : "sticky",
              top: mob ? "auto" : "6rem",
            }}
          >
            {/* Impact card — skills white surface equivalent in dark */}
            <div style={{
              position:"relative",
              padding: mob ? "1.25rem" : "2.5rem 2.25rem",
              background:"#111111",
              border:"1px solid rgba(255,255,255,0.08)",
              borderRadius: mob ? "14px" : "16px",
              boxShadow:"0 4px 32px rgba(0,0,0,0.4)",
              transform: mob ? "none" : `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
              transition:`transform 190ms ${E}`,
            }}>
              {/* Top shimmer line */}
              <div aria-hidden="true" style={{
                position:"absolute", top:0, left:"15%", right:"15%", height:"1px",
                background:`linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)`,
                borderRadius:"0 0 2px 2px",
              }}/>
              {/* Inner radial glow */}
              <div aria-hidden="true" style={{
                position:"absolute", inset:0, borderRadius:"inherit",
                background:"radial-gradient(circle at 50% 28%, rgba(255,255,255,0.03) 0%, transparent 65%)",
                pointerEvents:"none",
              }}/>

              <ML color="rgba(255,255,255,0.25)" style={{ marginBottom: mob ? "1rem" : "2rem" }}>
                Impact Metrics
              </ML>

              <div style={{ display:"flex", flexDirection:"column", gap: mob ? "1rem" : "2rem" }}>
                {data.impact.map((item, i) => (
                  <div key={i} style={{
                    paddingBottom: i < data.impact.length-1 ? (mob?"1rem":"2rem") : 0,
                    borderBottom:  i < data.impact.length-1 ? "1px solid rgba(255,255,255,0.06)" : "none",
                    opacity: vis ? 1 : 0,
                    animation: vis ? `_rtl 320ms ${E} ${0.22+i*0.08}s both` : "none",
                  }}>
                    {/* Big metric number — Dancing Script */}
                    <div style={{
                      fontFamily:"'Dancing Script',cursive",
                      fontSize: mob ? "2.4rem" : "3.4rem",
                      fontWeight:700, color:"#FFFFFF",
                      lineHeight:1, marginBottom:"6px", letterSpacing:"-0.01em",
                    }}>
                      <Counter value={item.metric} triggered={vis} />
                    </div>
                    <div style={{
                      fontSize: mob?"12.5px":"14px",
                      fontWeight:600, color:"#FFFFFF",
                      marginBottom:"3px",
                    }}>{item.label}</div>
                    <div style={{
                      fontSize: mob?"11px":"12px",
                      color:"rgba(255,255,255,0.35)", lineHeight:1.55,
                    }}>{item.detail}</div>
                  </div>
                ))}
              </div>

              {/* Certificate thumbnail */}
              <div className="cert-thumb" style={{ marginTop:"2rem", paddingTop:"1.5rem", borderTop:"1px solid rgba(255,255,255,0.06)" }}>
                <div style={{
                  borderRadius:"8px", overflow:"hidden",
                  border:"1px solid rgba(255,255,255,0.08)",
                  position:"relative",
                  transition:`all 190ms ${E}`,
                }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform="scale(1.015)";
                    const ov=e.currentTarget.querySelector(".cov");
                    if(ov) ov.style.opacity="1";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform="scale(1)";
                    const ov=e.currentTarget.querySelector(".cov");
                    if(ov) ov.style.opacity="0";
                  }}
                >
                  <img src={data.certPreview} alt={`${data.company} certificate`}
                    style={{ width:"100%", display:"block", filter:"brightness(0.85)" }} loading="lazy" />
                  <div className="cov" style={{
                    position:"absolute", inset:0,
                    background:"rgba(0,0,0,0.65)",
                    display:"flex", alignItems:"center", justifyContent:"center",
                    opacity:0, transition:`opacity 190ms ${E}`,
                  }}>
                    <div style={{
                      display:"flex", alignItems:"center", gap:"6px",
                      fontSize:"12px", fontWeight:600, color:"#FFFFFF",
                      padding:"8px 14px",
                      background:"rgba(255,255,255,0.08)",
                      borderRadius:"6px",
                      border:"1px solid rgba(255,255,255,0.18)",
                      fontFamily:"'DM Mono',monospace",
                    }}>
                      <ArrowUpRight size={12} />View Certificate
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
   SUMMARY CARD — skills MetCard aesthetic
═══════════════════════════════════════════════════════════════ */
function SumCard({ stat, vis, delay }) {
  const [h, sh] = useState(false);
  const mob = useMob();
  return (
    <div
      data-magnetic
      onMouseEnter={() => sh(true)}
      onMouseLeave={() => sh(false)}
      style={{
        padding: mob ? "1rem" : "2rem 1.75rem",
        background:"#111111",
        border:`1px solid ${h ? "rgba(255,255,255,0.14)" : "rgba(255,255,255,0.06)"}`,
        borderRadius:"12px",
        transform: h && !mob ? "scale(1.016)" : "scale(1)",
        transition:`transform ${MS.fast} ${E}, border-color ${MS.fast} ${E}`,
        opacity: vis ? 1 : 0,
        animation: vis ? `_rtl ${MS.reveal} ${E} ${delay}s both` : "none",
        position:"relative", overflow:"hidden",
      }}
    >
      {/* Top shimmer */}
      <div aria-hidden="true" style={{
        position:"absolute", top:0, left:"15%", right:"15%", height:"1px",
        background:"linear-gradient(90deg, transparent, rgba(255,255,255,0.10), transparent)",
      }}/>
      <div style={{
        fontFamily:"'Dancing Script',cursive",
        fontSize: mob ? "1.85rem" : "2.75rem", fontWeight:700,
        color:"#FFFFFF",
        lineHeight:1, marginBottom:"0.5rem", letterSpacing:"-0.01em",
      }}>{stat.value}</div>
      <div style={{ fontSize: mob?"12px":"14px", fontWeight:600, color:"#FFFFFF", marginBottom:"4px" }}>
        {stat.label}
      </div>
      <div style={{ fontSize: mob?"10.5px":"12px", color:"rgba(255,255,255,0.35)", lineHeight:1.55 }}>
        {stat.detail}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   ROOT PAGE
═══════════════════════════════════════════════════════════════ */
export default function Internships() {
  const [heroRef, heroVis] = useInView(0.06);
  const [sumRef,  sumVis]  = useInView(0.06);
  const [fRef,    fVis]    = useInView(0.06);
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

  const W   = { maxWidth:"1240px", margin:"0 auto", padding: mob ? "0 1rem" : "0 2rem" };
  const pad = mob ? "0 1rem" : "0 2rem";

  return (
    <>
      <style>{GLOBAL}</style>
      <MagneticCursor />
      <ScrollBar />
      <SideNav active={active} />

      {/* Background grid texture — skills system */}
      <div aria-hidden="true" style={{
        position:"fixed", inset:0, zIndex:0, pointerEvents:"none",
        backgroundImage:[
          "linear-gradient(rgba(255,255,255,0.016) 1px, transparent 1px)",
          "linear-gradient(90deg, rgba(255,255,255,0.016) 1px, transparent 1px)",
        ].join(","),
        backgroundSize:"64px 64px",
        maskImage:"radial-gradient(ellipse 80% 55% at 50% 25%, black 10%, transparent)",
        WebkitMaskImage:"radial-gradient(ellipse 80% 55% at 50% 25%, black 10%, transparent)",
      }}/>

      <div style={{ position:"relative", zIndex:1 }}>

        {/* ═══════════ HERO ═══════════ */}
        <header ref={heroRef} style={{
          ...W,
          paddingTop:    mob ? "3.5rem" : "8rem",
          paddingBottom: mob ? "2.5rem" : "6rem",
          borderBottom:"1px solid rgba(255,255,255,0.06)",
          position:"relative",
        }}>
          {/* Hero radial glow */}
          <div aria-hidden="true" style={{
            position:"absolute", top:"20%", left:"50%", transform:"translateX(-50%)",
            width: mob?"300px":"700px", height: mob?"150px":"320px",
            borderRadius:"50%",
            background:"radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%)",
            filter:`blur(${mob?55:90}px)`, pointerEvents:"none",
          }}/>

          {/* Eyebrow — skills RTL entry */}
          <div style={{
            display:"flex", alignItems:"center", gap:"12px",
            marginBottom: mob ? "1rem" : "2rem",
            opacity: heroVis?1:0,
            animation: heroVis?`_rtl ${MS.slow} ${E} 0.05s both`:"none",
          }}>
            <div style={{ width:"20px", height:"1px", background:"rgba(255,255,255,0.55)" }}/>
            <ML>Industry Experience · 2024 – 2025</ML>
            <TermCursor />
          </div>

          {/* H1 — Dancing Script large */}
          <h1 style={{
            fontFamily:"'Dancing Script',cursive",
            fontSize: mob ? "clamp(2.5rem,10vw,3.5rem)" : "clamp(3.5rem,8vw,7rem)",
            fontWeight:700, color:"#FFFFFF",
            lineHeight:1.03, letterSpacing:"-0.01em",
            marginBottom:"12px", maxWidth:"900px",
            opacity: heroVis?1:0,
            animation: heroVis?`_rtl ${MS.reveal} ${E} 0.12s both`:"none",
          }}>
            Professional Experience
          </h1>

          {/* Accent bar — skills style */}
          <div style={{
            height:"2px", width: mob ? "80px" : "160px",
            background:"linear-gradient(90deg, rgba(255,255,255,0.8), transparent)",
            borderRadius:"2px",
            marginBottom: mob ? "1.25rem" : "3rem",
            transformOrigin:"left",
            transform: heroVis?"scaleX(1)":"scaleX(0)",
            transition:`transform 320ms ${E} 0.18s`,
          }}/>

          {/* Sub */}
          <p style={{
            fontSize: mob?"0.875rem":"1rem",
            color:"rgba(255,255,255,0.40)", lineHeight:1.75,
            maxWidth: mob?"100%":"620px",
            marginBottom: mob?"2rem":"4rem",
            opacity: heroVis?1:0,
            animation: heroVis?`_rtl ${MS.reveal} ${E} 0.22s both`:"none",
          }}>
            Three industry internships spanning full-stack engineering, computer vision, and data science — each with hands-on ownership of real systems, deployed models, and production-grade codebases.
          </p>

          {/* Stats row — skills counter aesthetic */}
          <div className="stats-row" style={{
            display:"grid", gridTemplateColumns:"repeat(4,1fr)",
            gap: mob ? "0.9rem" : "3rem",
            maxWidth: mob ? "100%" : "880px",
          }}>
            {[
              { value:3,      label:"Industry Internships" },
              { value:"7+",   label:"Months Experience" },
              { value:6,      label:"Projects Shipped" },
              { value:"100%", label:"Verified Credentials" },
            ].map((s, i) => (
              <div key={i} style={{
                opacity: heroVis?1:0,
                animation: heroVis?`_rtl ${MS.reveal} ${E} ${0.28+i*0.06}s both`:"none",
              }}>
                <div style={{
                  fontFamily:"'Dancing Script',cursive",
                  fontSize: mob?"2rem":"3.2rem", fontWeight:700,
                  color:"#FFFFFF", lineHeight:1,
                  marginBottom:"5px", letterSpacing:"-0.01em",
                }}>
                  <Counter value={s.value} triggered={heroVis} />
                </div>
                <div style={{
                  fontFamily:"'DM Mono',monospace",
                  fontSize: mob?"9px":"11px",
                  color:"rgba(255,255,255,0.35)", fontWeight:500,
                  letterSpacing:"0.06em",
                }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </header>

        <Marquee speed={36} />

        {/* ═══════════ EXPERIENCE SECTIONS ═══════════ */}
        {EXP.map((exp, i) => (
          <ExpSection key={exp.id} data={exp} ri={i} isLast={i === EXP.length - 1} />
        ))}

        <Marquee speed={28} />

        {/* ═══════════ AGGREGATE SUMMARY ═══════════ */}
        <section ref={sumRef} style={{
          background:"#0F0F0F",
          borderTop:"1px solid rgba(255,255,255,0.06)",
        }}>
          <div style={{ ...W, paddingTop: mob?"3rem":"8rem", paddingBottom: mob?"3rem":"8rem" }}>
            {/* Header */}
            <div style={{
              marginBottom: mob ? "1.5rem" : "2.75rem",
              opacity: sumVis?1:0,
              animation: sumVis?`_rtl ${MS.reveal} ${E} 0s both`:"none",
            }}>
              <ML color="rgba(255,255,255,0.35)" style={{ marginBottom:"12px" }}>Combined Impact</ML>
              <h2 style={{
                fontFamily:"'Dancing Script',cursive",
                fontSize: mob?"clamp(2rem,7vw,2.8rem)":"clamp(2.8rem,5vw,4.2rem)",
                fontWeight:700, color:"#FFFFFF",
                letterSpacing:"-0.01em", marginBottom:"8px",
                display:"flex", alignItems:"center",
              }}>
                Aggregate Overview<TermCursor />
              </h2>
              <p style={{
                fontSize: mob?"12px":"13.5px",
                color:"rgba(255,255,255,0.35)", lineHeight:1.65, maxWidth:"420px",
              }}>
                Across all three internships — full-stack, ML, and data science.
              </p>
            </div>

            <div className="sum-grid" style={{
              display:"grid",
              gridTemplateColumns: mob?"1fr 1fr":"repeat(auto-fit,minmax(240px,1fr))",
              gap: mob ? "0.7rem" : "1.1rem",
            }}>
              {[
                { value:"6",       label:"Projects Shipped",     detail:"Full-stack apps and ML pipelines built end-to-end"       },
                { value:"50K+",    label:"Records Processed",    detail:"Structured and text datasets cleaned and modelled"       },
                { value:"6",       label:"ML Models Evaluated",  detail:"Supervised classifiers trained and benchmarked"          },
                { value:"85–90%",  label:"Best Accuracy",        detail:"Image and text classification across held-out test sets" },
                { value:"Multiple",label:"API Integrations",     detail:"REST endpoints serving frontend and inference consumers" },
                { value:"2",       label:"OAuth Providers",      detail:"Google & GitHub auth with JWT session management"        },
              ].map((s, i) => (
                <SumCard key={i} stat={s} vis={sumVis} delay={i*0.055} />
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════ FOOTER ═══════════ */}
        <footer ref={fRef} style={{ background:"#000000", position:"relative", overflow:"hidden" }}>
          {/* Wave */}
          <div style={{ position:"relative", height:"48px", background:"#0F0F0F", overflow:"hidden" }}>
            <svg viewBox="0 0 1440 48" preserveAspectRatio="none"
              style={{ position:"absolute", bottom:0, left:0, width:"100%", height:"100%" }}>
              <path d="M0,0 C360,48 720,0 1080,24 C1260,36 1380,12 1440,24 L1440,48 L0,48 Z" fill="#000000"/>
            </svg>
          </div>

          {/* Footer grid texture */}
          <div aria-hidden="true" style={{
            position:"absolute", inset:0, zIndex:0, pointerEvents:"none",
            backgroundImage:[
              "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px)",
              "linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
            ].join(","),
            backgroundSize:"48px 48px",
          }}/>
          <div aria-hidden="true" style={{
            position:"absolute", left:"-5%", top:"20%",
            width:"380px", height:"380px", borderRadius:"50%",
            background:"radial-gradient(circle, rgba(255,255,255,0.03), transparent 70%)",
            filter:"blur(60px)", pointerEvents:"none",
          }}/>

          <div style={{ ...W, position:"relative", zIndex:1 }}>
            {/* CTA row */}
            <div style={{
              borderBottom:"1px solid rgba(255,255,255,0.06)",
              paddingTop: mob ? "2.5rem" : "4rem",
              paddingBottom: mob ? "2.5rem" : "4rem",
            }}>
              <div className="foot-row" style={{
                display:"flex", alignItems:"flex-end",
                justifyContent:"space-between", gap:"2rem", flexWrap:"wrap",
              }}>
                <div style={{ maxWidth:"500px" }}>
                  {/* Status badge */}
                  <div style={{
                    display:"inline-flex", alignItems:"center", gap:"6px",
                    padding:"5px 12px", borderRadius:"999px",
                    background:"rgba(255,255,255,0.06)",
                    border:"1px solid rgba(255,255,255,0.12)",
                    marginBottom:"18px",
                    opacity: fVis?1:0,
                    animation: fVis?`_rtl ${MS.slow} ${E} 0.05s both`:"none",
                  }}>
                    <div style={{
                      width:"5px", height:"5px", borderRadius:"50%",
                      background:"rgba(255,255,255,0.80)",
                      animation:"_pulse 2.2s ease-in-out infinite",
                    }}/>
                    <ML color="rgba(255,255,255,0.60)">Open to Opportunities · 2026</ML>
                  </div>

                  <h2 style={{
                    fontFamily:"'Dancing Script',cursive",
                    fontSize: mob?"clamp(2rem,8vw,3rem)":"clamp(3rem,5.5vw,5rem)",
                    fontWeight:700, color:"#FFFFFF",
                    lineHeight:1.05, letterSpacing:"-0.01em",
                    marginBottom:"12px",
                    opacity: fVis?1:0,
                    animation: fVis?`_rtl ${MS.reveal} ${E} 0.12s both`:"none",
                  }}>
                    Let's Build Something<br/>Inevitable
                  </h2>

                  <p style={{
                    fontSize: mob?"13px":"15px",
                    color:"rgba(255,255,255,0.32)", lineHeight:1.75, maxWidth:"380px",
                    opacity: fVis?1:0,
                    animation: fVis?`_rtl ${MS.reveal} ${E} 0.20s both`:"none",
                  }}>
                    Systems engineer. Product thinker. AI architect. Ready to join teams that ship things that matter.
                  </p>
                </div>

                {/* CTA links */}
                <div className="foot-links" style={{
                  display:"flex", flexDirection:"column", gap:"10px", minWidth:"220px",
                  opacity: fVis?1:0,
                  animation: fVis?`_rtl ${MS.reveal} ${E} 0.22s both`:"none",
                }}>
                  {[
                    { label:"Schedule Interview", href:"mailto:g.sivasatyasaibhagavan@gmail.com", primary:true },
                    { label:"View Portfolio",     href:"/", primary:false },
                  ].map(l => {
                    const [h2, sh2] = [false, () => {}]; // simplified for footer
                    return (
                      <a
                        key={l.label}
                        href={l.href}
                        data-magnetic
                        style={{
                          display:"flex", alignItems:"center", justifyContent:"space-between",
                          padding:"14px 18px", borderRadius:"10px", textDecoration:"none",
                          background: l.primary ? "rgba(255,255,255,0.10)" : "rgba(255,255,255,0.04)",
                          border: `1px solid ${l.primary ? "rgba(255,255,255,0.22)" : "rgba(255,255,255,0.08)"}`,
                          color:"#FFFFFF", fontSize:"13px", fontWeight:500,
                          transition:`background ${MS.fast} ${E}, border-color ${MS.fast} ${E}`,
                        }}
                        onMouseEnter={e => {
                          e.currentTarget.style.background = l.primary ? "rgba(255,255,255,0.16)" : "rgba(255,255,255,0.08)";
                          e.currentTarget.style.borderColor = l.primary ? "rgba(255,255,255,0.35)" : "rgba(255,255,255,0.14)";
                        }}
                        onMouseLeave={e => {
                          e.currentTarget.style.background = l.primary ? "rgba(255,255,255,0.10)" : "rgba(255,255,255,0.04)";
                          e.currentTarget.style.borderColor = l.primary ? "rgba(255,255,255,0.22)" : "rgba(255,255,255,0.08)";
                        }}
                      >
                        <div>
                          <ML color="rgba(255,255,255,0.25)" style={{ marginBottom:"3px", fontSize:"9px" }}>
                            {l.primary ? "Primary" : "Work"}
                          </ML>
                          {l.label}
                        </div>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                          stroke="rgba(255,255,255,0.45)" strokeWidth="2" strokeLinecap="round">
                          <path d="M5 12h14M12 5l7 7-7 7"/>
                        </svg>
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Footer meta */}
            <div style={{
              display:"flex", alignItems:"center",
              justifyContent:"space-between", gap:"1rem", flexWrap:"wrap",
              paddingTop: mob?"1.25rem":"2rem",
              paddingBottom: mob?"1.5rem":"2.5rem",
            }}>
              <div style={{ display:"flex", alignItems:"center", gap:"8px" }}>
                <div style={{
                  width:"5px", height:"5px", borderRadius:"50%",
                  background:"rgba(255,255,255,0.70)",
                  animation:"_pulse 2.2s ease-in-out infinite",
                }}/>
                <span style={{
                  fontFamily:"'DM Mono',monospace",
                  fontSize: mob?"10px":"12px",
                  color:"rgba(255,255,255,0.35)",
                }}>
                  All certificates independently verifiable
                </span>
              </div>

              <div className="foot-links" style={{ display:"flex", flexWrap:"wrap", gap:"8px" }}>
                {[
                  { label:"Email",    href:"mailto:g.sivasatyasaibhagavan@gmail.com" },
                  { label:"LinkedIn", href:"https://www.linkedin.com/in/gopalajosyula-siva-satya-sai-bhagavan-1624a027b/" },
                  { label:"GitHub",   href:"https://github.com/bhagavan444" },
                ].map(l => (
                  <MagBtn key={l.label} href={l.href}
                    extraStyle={{ padding:"6px 12px", fontSize:"11px", minHeight:"34px" }}>
                    {l.label}
                  </MagBtn>
                ))}
              </div>
            </div>

            {/* Bottom copyright */}
            <div style={{
              paddingTop: mob?"0.9rem":"1.25rem",
              paddingBottom: mob?"1.25rem":"2rem",
              borderTop:"1px solid rgba(255,255,255,0.05)",
              display:"flex", justifyContent:"space-between", alignItems:"center",
              flexWrap:"wrap", gap:"0.4rem",
            }}>
              <div style={{ fontFamily:"'DM Mono',monospace", fontSize:"10px", color:"rgba(255,255,255,0.20)" }}>
                © 2026 Siva Satya Sai Bhagavan
              </div>
              <div style={{ display:"flex", gap:"16px" }}>
                {["Privacy","Terms","Sitemap"].map(l => (
                  <a key={l} href="#" style={{
                    fontFamily:"'DM Mono',monospace", fontSize:"10px",
                    color:"rgba(255,255,255,0.20)", textDecoration:"none",
                  }}>{l}</a>
                ))}
              </div>
              <div style={{ display:"flex", alignItems:"center", gap:"6px" }}>
                <div style={{
                  width:"5px", height:"5px", borderRadius:"50%",
                  background:"rgba(255,255,255,0.70)",
                  animation:"_pulse 2.2s ease-in-out infinite",
                }}/>
                <span style={{
                  fontFamily:"'DM Mono',monospace", fontSize:"11px",
                  color:"rgba(255,255,255,0.50)",
                }}>
                  Available for hire
                </span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}