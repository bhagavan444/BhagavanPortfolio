"use client";

import React, { useState, useEffect, useRef } from "react";

/* ═══════════════════════════════════════════════════════
   DESIGN TOKENS — Pure Black & White Architectural System
═══════════════════════════════════════════════════════ */
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
  green:     "#FFFFFF",
  greenSub:  "rgba(255,255,255,0.04)",
  amber:     "#FFFFFF",
  ink:       "#000000",
  inkMid:    "#0F0F0F",
};

const E  = "cubic-bezier(0.16, 1, 0.3, 1)";
const MS = { fast:"130ms", base:"190ms", slow:"320ms", reveal:"420ms" };

/* ═══════════════════════════════════════════════════════
   DEVICON CDN
═══════════════════════════════════════════════════════ */
const IB = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons";
const ICONS = {
  "React":             `${IB}/react/react-original.svg`,
  "HTML5":             `${IB}/html5/html5-original.svg`,
  "CSS3":              `${IB}/css3/css3-original.svg`,
  "JavaScript":        `${IB}/javascript/javascript-original.svg`,
  "TypeScript":        `${IB}/typescript/typescript-original.svg`,
  "Node.js":           `${IB}/nodejs/nodejs-original.svg`,
  "Node":              `${IB}/nodejs/nodejs-original.svg`,
  "Express":           `${IB}/express/express-original.svg`,
  "Flask":             `${IB}/flask/flask-original.svg`,
  "Flask API":         `${IB}/flask/flask-original.svg`,
  "Flask Deploy":      `${IB}/flask/flask-original.svg`,
  "REST":              `${IB}/fastapi/fastapi-original.svg`,
  "MongoDB":           `${IB}/mongodb/mongodb-original.svg`,
  "MongoDB Atlas":     `${IB}/mongodb/mongodb-original.svg`,
  "JWT":               `${IB}/nodejs/nodejs-plain.svg`,
  "OAuth":             `${IB}/google/google-original.svg`,
  "TensorFlow":        `${IB}/tensorflow/tensorflow-original.svg`,
  "Keras":             `${IB}/keras/keras-original.svg`,
  "Scikit-learn":      `${IB}/scikitlearn/scikitlearn-original.svg`,
  "CNN":               `${IB}/tensorflow/tensorflow-original.svg`,
  "Python":            `${IB}/python/python-original.svg`,
  "Pandas":            `${IB}/pandas/pandas-original.svg`,
  "NumPy":             `${IB}/numpy/numpy-original.svg`,
  "NLTK":              `${IB}/python/python-plain.svg`,
  "Vercel":            `${IB}/vercel/vercel-original.svg`,
  "Cloud Platforms":   `${IB}/googlecloud/googlecloud-original.svg`,
  "Environment Config":`${IB}/bash/bash-original.svg`,
  "Java":              `${IB}/java/java-original.svg`,
  "C":                 `${IB}/c/c-original.svg`,
  "Data Structures":   `${IB}/python/python-original.svg`,
  "Algorithms":        `${IB}/python/python-original.svg`,
  "OOP":               `${IB}/java/java-original.svg`,
  "LeetCode":          `${IB}/python/python-original.svg`,
  "Academic":          `${IB}/c/c-original.svg`,
  "Git / GitHub":      `${IB}/github/github-original.svg`,
  "VS Code":           `${IB}/vscode/vscode-original.svg`,
  "Postman":           `${IB}/postman/postman-original.svg`,
  "Jupyter Notebook":  `${IB}/jupyter/jupyter-original.svg`,
  "Figma":             `${IB}/figma/figma-original.svg`,
};

/* ═══════════════════════════════════════════════════════
   GLOBAL CSS — Monochrome Architectural
═══════════════════════════════════════════════════════ */
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

  @keyframes _rtl {
    from { opacity:0; transform:translateX(48px); }
    to   { opacity:1; transform:translateX(0); }
  }
  @keyframes _ltr {
    from { opacity:0; transform:translateX(-48px); }
    to   { opacity:1; transform:translateX(0); }
  }
  @keyframes _up {
    from { opacity:0; transform:translateY(18px); }
    to   { opacity:1; transform:translateY(0); }
  }
  @keyframes _fade  { from{opacity:0;} to{opacity:1;} }
  @keyframes _si    { from{opacity:0;transform:scale(0.96);} to{opacity:1;transform:scale(1);} }
  @keyframes _lx    { from{transform:scaleX(0);} to{transform:scaleX(1);} }
  @keyframes _ly    { from{transform:scaleY(0);} to{transform:scaleY(1);} }

  @keyframes _marquee {
    from { transform:translateX(0); }
    to   { transform:translateX(-50%); }
  }

  @keyframes _tagPop {
    from { opacity:0; transform:translateX(14px) scale(0.92); }
    to   { opacity:1; transform:translateX(0) scale(1); }
  }
  @keyframes _iconIn {
    from { opacity:0; transform:translateX(10px) scale(0.78); }
    to   { opacity:1; transform:translateX(0) scale(1); }
  }
  @keyframes _pulse {
    0%,100% { opacity:0.3; transform:scale(1); }
    50%      { opacity:1;   transform:scale(1.35); }
  }
  @keyframes _blink {
    0%,100% { opacity:1; }
    50%      { opacity:0; }
  }
  @keyframes _countUp {
    from { opacity:0; transform:translateY(8px); }
    to   { opacity:1; transform:translateY(0); }
  }

  .di {
    transition: transform 130ms cubic-bezier(0.16,1,0.3,1), filter 130ms cubic-bezier(0.16,1,0.3,1);
    cursor:default;
  }
  .di:hover {
    transform: scale(1.25) rotate(-6deg);
    filter: drop-shadow(0 2px 8px rgba(255,255,255,0.18));
  }

  .snav-btn:hover .snav-line { width:22px !important; }

  @media (prefers-reduced-motion:reduce) {
    *, *::before, *::after {
      animation-duration:0.01ms !important;
      transition-duration:0.01ms !important;
    }
    .marquee-inner { animation:none !important; }
  }
  @media (max-width:1024px) {
    .cap-grid    { grid-template-columns:1fr !important; }
    .three-col   { grid-template-columns:1fr 1fr !important; }
    .fgrid       { grid-template-columns:1fr 1fr !important; }
  }
  @media (max-width:768px) {
    .snav        { display:none !important; }
    .three-col,
    .fgrid,
    .ovgrid,
    .pgrid,
    .hpillars    { grid-template-columns:1fr !important; }
    .fctar       { flex-direction:column !important; }
  }
`;

/* ═══════════════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════════════ */
const capabilities = [
  {
    id:"fullstack", number:"01",
    domain:"Full-Stack Engineering",
    outcome:"Designed and deployed scalable full-stack web applications with secure authentication, RESTful APIs, and MongoDB database integration, ensuring reliable user experiences in production environments.",
    context:"StudyOwl Education · MERN Internship", period:"2024",
    tech:{
      "Interface":   ["React","HTML5","CSS3","JavaScript"],
      "Application": ["Node.js","Express","REST APIs"],
      "Data":        ["MongoDB","JWT Authentication","OAuth"],
      "Soft Skills": ["Problem Solving","Team Collaboration","Agile Development","Communication"]
    },
    proof:[
      { name:"ATS Resume Builder",  detail:"AI-assisted resume platform with keyword scoring, PDF parsing, and ATS compatibility analysis" },
      { name:"AI Chatbot Platform", detail:"Interactive chatbot system built with React frontend and Flask ML backend integration" },
    ],
    metric:{ value:3,   suffix:"+", label:"Production Systems" },
    accent:"#FFFFFF",
  },

  {
    id:"intelligence", number:"02",
    domain:"Applied Intelligence",
    outcome:"Developed machine learning models for real-world prediction tasks, achieving over 90% accuracy in NLP classification and deploying models through scalable Flask APIs.",
    context:"Blackbucks · SmartBridge · AI/ML Internship", period:"2024",
    tech:{
      "Training":   ["TensorFlow","Keras","Scikit-learn","CNN"],
      "Processing": ["Python","Pandas","NumPy","NLTK"],
      "Deploy":     ["Flask API","REST Integration"],
      "Soft Skills":["Analytical Thinking","Research Mindset","Data Interpretation","Continuous Learning"]
    },
    proof:[
      { name:"Fake News Detector",  detail:"NLP classification system using TF-IDF vectorization achieving 90%+ prediction accuracy" },
      { name:"Career Recommender",  detail:"Supervised ML model predicting suitable career paths based on skill profiles" },
    ],
    metric:{ value:90,  suffix:"%", label:"Model Accuracy" },
    accent:"#FFFFFF",
  },

  {
    id:"infrastructure", number:"03",
    domain:"Infrastructure",
    outcome:"Implemented cloud-based deployment pipelines with environment configuration, backend services, and database hosting for reliable full-stack application delivery.",
    context:"Self-Directed Projects", period:"Ongoing",
    tech:{
      "Hosting": ["Vercel","Cloud Platforms"],
      "Backend": ["Flask","Node.js"],
      "Tooling": ["Environment Config","MongoDB Atlas"],
      "Soft Skills":["System Thinking","Debugging","Adaptability","Technical Documentation"]
    },
    proof:[
      { name:"End-to-end Deployment", detail:"Hosted full-stack applications with frontend UI and backend API integration" },
      { name:"OAuth + Database",      detail:"Secure authentication system integrated with MongoDB Atlas cloud database" },
    ],
    metric:{ value:5,   suffix:"+", label:"Live Systems" },
    accent:"#FFFFFF",
  },

  {
    id:"foundations", number:"04",
    domain:"Computational Foundations",
    outcome:"Built strong computational foundations through extensive practice in data structures, algorithms, and object-oriented programming with over 100 coding problems solved.",
    context:"B.Tech AIDS · Coursework", period:"2022–2026",
    tech:{
      "Languages": ["Python","Java","C"],
      "Concepts":  ["Data Structures","Algorithms","OOP"],
      "Practice":  ["LeetCode","Academic Labs"],
      "Soft Skills":["Logical Reasoning","Persistence","Time Management","Self Learning"]
    },
    proof:[
      { name:"LeetCode Practice",  detail:"Solved 100+ algorithmic problems covering arrays, recursion, linked lists, and dynamic programming" },
      { name:"OOP Coursework",     detail:"Implemented object-oriented design concepts through academic lab projects in Java and Python" },
    ],
    metric:{ value:100, suffix:"+", label:"Problems Solved" },
    accent:"#FFFFFF",
  },
];

const philosophy = [
  { 
    n:"01", 
    statement:"Design systems, not isolated features",       
    elaboration:"Approach every feature as part of a larger system. Define clear data flows, interfaces, and architectural boundaries before writing implementation code." 
  },
  { 
    n:"02", 
    statement:"Prefer clarity over unnecessary complexity",     
    elaboration:"Readable and predictable solutions scale better over time. Simplicity improves collaboration, debugging, and long-term maintainability." 
  },
  { 
    n:"03", 
    statement:"Prioritize maintainability and scalability", 
    elaboration:"Well-structured codebases reduce technical debt. Clean architecture and modular design enable systems to evolve without constant refactoring." 
  },
  { 
    n:"04", 
    statement:"Deliver measurable engineering impact",           
    elaboration:"Engineering decisions should translate into tangible results such as improved performance, model accuracy, user engagement, or reduced system friction." 
  },
];

const trajectory = [
  { 
    area:"System Design",
    detail:"Deepening expertise in scalable architectures including load balancing, caching strategies, distributed systems fundamentals, and high-availability design.",
    icon:"⚙️"
  },
  { 
    area:"LLM Integration",
    detail:"Building intelligent applications using RAG pipelines, prompt engineering techniques, and production-grade integration with large language model APIs.",
    icon:"🤖"
  },
  { 
    area:"Cloud Architecture",
    detail:"Developing cloud-native systems with containerization, automated deployment pipelines, and infrastructure management for scalable applications.",
    icon:"☁️"
  },
  { 
    area:"Type Safety",
    detail:"Adopting TypeScript and strict typing patterns to improve reliability, maintainability, and compile-time error detection in large codebases.",
    icon:"📘"
  },
];
const tooling = [
  { name:"Git / GitHub",      level:"Daily",      cat:"Version Control" },
  { name:"VS Code",           level:"Daily",      cat:"Core Development" },
  { name:"Postman",           level:"Daily",      cat:"API Testing" },
  { name:"MongoDB Atlas",     level:"Regular",    cat:"Database" },
  { name:"Jupyter Notebook",  level:"Regular",    cat:"Machine Learning" },
  { name:"Flask Deployment",  level:"Regular",    cat:"Backend" },
  { name:"Vercel",            level:"Occasional", cat:"Cloud Deployment" },
  { name:"Figma",             level:"Occasional", cat:"UI / UX Design" },
];

const TICKER_ITEMS = [
  "React", "Node.js", "Express.js", "MongoDB",
  "JavaScript", "TypeScript", "HTML5", "CSS3",
  "Python", "TensorFlow", "Scikit-learn", "Keras",
  "NumPy", "Pandas", "Flask",
  "JWT Authentication", "OAuth 2.0",
  "Git", "GitHub", "VS Code", "Postman",
  "MongoDB Atlas", "Vercel",
  "Jupyter Notebook", "REST APIs",
  "Java", "C"
];

/* ═══════════════════════════════════════════════════════
   HOOKS
═══════════════════════════════════════════════════════ */
function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVis(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, vis];
}

function Counter({ value, suffix = "", triggered }) {
  const [count, setCount] = useState(0);
  const fired = useRef(false);
  useEffect(() => {
    if (!triggered || fired.current) return;
    fired.current = true;
    const dur = 1200, start = Date.now();
    const tick = () => {
      const p = Math.min((Date.now() - start) / dur, 1);
      setCount(Math.floor(value * (1 - Math.pow(1 - p, 3))));
      if (p < 1) requestAnimationFrame(tick);
      else setCount(value);
    };
    requestAnimationFrame(tick);
  }, [triggered, value]);
  return <>{count}{suffix}</>;
}

/* ═══════════════════════════════════════════════════════
   MAGNETIC CURSOR
   — dot:  8px solid white, sticks exactly to pointer
   — ring: 36px outline, lags behind with lerp (0.12)
   — on [data-magnetic]: ring expands to 64px + pulls
     the element toward the cursor up to 18px
═══════════════════════════════════════════════════════ */
function MagneticCursor() {
  const dotRef  = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const dot  = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Current raw mouse position
    let mx = -200, my = -200;
    // Lagging ring position
    let rx = -200, ry = -200;
    // Current ring size (lerped)
    let rSize = 36;
    let targetRSize = 36;
    // Magnetic target element & its pull offset
    let magEl = null;
    let magOX = 0, magOY = 0; // element offset
    let targetMagOX = 0, targetMagOY = 0;

    let rafId = null;
    let visible = false;

    const lerp = (a, b, t) => a + (b - a) * t;

    const onMove = (e) => {
      mx = e.clientX;
      my = e.clientY;

      if (!visible) {
        visible = true;
        dot.style.opacity  = "1";
        ring.style.opacity = "1";
      }

      // Check if we're near a magnetic element
      const els = document.querySelectorAll("[data-magnetic]");
      let found = null;
      els.forEach((el) => {
        const r = el.getBoundingClientRect();
        const cx = r.left + r.width  / 2;
        const cy = r.top  + r.height / 2;
        const dist = Math.hypot(mx - cx, my - cy);
        const radius = Math.max(r.width, r.height) * 0.65;
        if (dist < radius) found = el;
      });

      if (found) {
        magEl = found;
        const r = found.getBoundingClientRect();
        const cx = r.left + r.width  / 2;
        const cy = r.top  + r.height / 2;
        const dx = mx - cx;
        const dy = my - cy;
        // Pull strength — closer = stronger
        const dist = Math.hypot(dx, dy);
        const pull = 0.38;
        targetMagOX = dx * pull;
        targetMagOY = dy * pull;
        targetRSize = 58;
      } else {
        if (magEl) {
          // Reset element position
          magEl.style.transform  = "";
          magEl.style.transition = `transform 400ms cubic-bezier(0.16,1,0.3,1)`;
        }
        magEl = null;
        targetMagOX = 0;
        targetMagOY = 0;
        targetRSize = 36;
      }
    };

    const onLeave = () => {
      visible = false;
      dot.style.opacity  = "0";
      ring.style.opacity = "0";
      if (magEl) {
        magEl.style.transform = "";
        magEl = null;
      }
    };

    const onDown = () => {
      targetRSize = 22;
      dot.style.transform = "translate(-50%,-50%) scale(0.5)";
    };
    const onUp = () => {
      targetRSize = magEl ? 58 : 36;
      dot.style.transform = "translate(-50%,-50%) scale(1)";
    };

    // Detect hoverable elements to switch ring style
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
      // Dot snaps instantly
      dot.style.left = mx + "px";
      dot.style.top  = my + "px";

      // Ring lerps behind
      rx = lerp(rx, mx, 0.13);
      ry = lerp(ry, my, 0.13);
      rSize = lerp(rSize, targetRSize, 0.14);

      ring.style.left   = rx + "px";
      ring.style.top    = ry + "px";
      ring.style.width  = rSize + "px";
      ring.style.height = rSize + "px";

      // Magnetic element pull
      if (magEl) {
        magOX = lerp(magOX, targetMagOX, 0.14);
        magOY = lerp(magOY, targetMagOY, 0.14);
        magEl.style.transform  = `translate(${magOX}px, ${magOY}px)`;
        magEl.style.transition = "none";
      } else {
        magOX = lerp(magOX, 0, 0.12);
        magOY = lerp(magOY, 0, 0.12);
      }

      rafId = requestAnimationFrame(tick);
    };

    document.addEventListener("mousemove",  onMove,              { passive:true });
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mousedown",  onDown);
    document.addEventListener("mouseup",    onUp);
    document.addEventListener("mouseover",  onOverInteractive,   { passive:true });
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
    position:  "fixed",
    top:       0,
    left:      0,
    transform: "translate(-50%,-50%)",
    pointerEvents: "none",
    zIndex:    99999,
    opacity:   0,
    animation: "_cursorIn 400ms cubic-bezier(0.16,1,0.3,1) 0.5s both",
  };

  return (
    <>
      {/* Dot — snaps instantly */}
      <div
        ref={dotRef}
        style={{
          ...BASE,
          width:        "8px",
          height:       "8px",
          borderRadius: "50%",
          background:   "#FFFFFF",
          transition:   "transform 120ms cubic-bezier(0.16,1,0.3,1), opacity 200ms ease",
          willChange:   "left,top,transform",
        }}
      />
      {/* Ring — lags + expands on magnetic */}
      <div
        ref={ringRef}
        style={{
          ...BASE,
          width:        "36px",
          height:       "36px",
          borderRadius: "50%",
          border:       "1.5px solid rgba(255,255,255,0.45)",
          background:   "transparent",
          transition:   "border-color 180ms ease, background 180ms ease, opacity 200ms ease",
          willChange:   "left,top,width,height",
          mixBlendMode: "difference",
        }}
      />
    </>
  );
}

/* ═══════════════════════════════════════════════════════
   DEVICON IMG
═══════════════════════════════════════════════════════ */
function DI({ name, size = 18, extraStyle = {} }) {
  const src = ICONS[name];
  if (!src) return null;
  return (
    <img
      src={src}
      alt={name}
      className="di"
      width={size}
      height={size}
      loading="lazy"
      style={{
        display: "block",
        flexShrink: 0,
        borderRadius: "3px",
        
        ...extraStyle,
      }}
    />
  );
}

/* ═══════════════════════════════════════════════════════
   MARQUEE — Monochrome continuous RTL ticker
═══════════════════════════════════════════════════════ */
function Marquee({ speed = 32 }) {
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS];
  return (
    <div style={{
      overflow: "hidden",
      borderTop:    `1px solid rgba(255,255,255,0.06)`,
      borderBottom: `1px solid rgba(255,255,255,0.06)`,
      padding: "10px 0",
      background: "#111111",
      position: "relative",
    }}>
      <div style={{
        position:"absolute", left:0, top:0, bottom:0, width:"80px",
        background:`linear-gradient(to right, #111111, transparent)`,
        zIndex:2, pointerEvents:"none",
      }}/>
      <div style={{
        position:"absolute", right:0, top:0, bottom:0, width:"80px",
        background:`linear-gradient(to left, #111111, transparent)`,
        zIndex:2, pointerEvents:"none",
      }}/>
      <div
        className="marquee-inner"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "32px",
          width: "max-content",
          animation: `_marquee ${speed}s linear infinite`,
          willChange: "transform",
        }}
      >
        {items.map((name, i) => {
          const src = ICONS[name];
          return (
            <div key={`${name}-${i}`} style={{
              display: "flex",
              alignItems: "center",
              gap: "7px",
              opacity: 0.45,
              flexShrink: 0,
            }}>
              {src && (
                <img
                  src={src}
                  alt={name}
                  className="di"
                  width={16}
                  height={16}
                  loading="lazy"
                  style={{
                    display:"block",
                    borderRadius:"2px",
                    
                  }}
                />
              )}
              <span style={{
                fontFamily: "'DM Mono',monospace",
                fontSize: "11px",
                fontWeight: 500,
                color: "rgba(255,255,255,0.50)",
                letterSpacing: "0.04em",
                whiteSpace: "nowrap",
              }}>
                {name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   TECH TAG — Monochrome
═══════════════════════════════════════════════════════ */
function Tag({ name, accent, visible, delay }) {
  const [hov, setHov] = useState(false);
  return (
    <span
      data-magnetic
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "5px",
        padding: "4px 9px 4px 6px",
        borderRadius: "5px",
        background:    hov ? "rgba(255,255,255,0.08)" : "#141414",
        border:        `1px solid ${hov ? "rgba(255,255,255,0.18)" : "rgba(255,255,255,0.07)"}`,
        fontFamily:    "'DM Mono',monospace",
        fontSize:      "11px",
        color:         hov ? "#FFFFFF" : "rgba(255,255,255,0.45)",
        cursor:        "default",
        userSelect:    "none",
        transition:    `background ${MS.fast} ${E}, border-color ${MS.fast} ${E}, color ${MS.fast} ${E}`,
        opacity:       visible ? 1 : 0,
        animation:     visible ? `_tagPop ${MS.slow} ${E} ${delay}s both` : "none",
      }}
    >
      <DI
        name={name}
        size={13}
        extraStyle={{
          opacity: hov ? 0.9 : 0.5,
          transition: `opacity ${MS.fast} ${E}`,
          
        }}
      />
      {name}
    </span>
  );
}

/* ═══════════════════════════════════════════════════════
   SIDE NAV — Monochrome dots
═══════════════════════════════════════════════════════ */
function SideNav({ active }) {
  return (
    <nav className="snav" style={{
      position: "fixed",
      left: "1.25rem",
      top: "50%",
      transform: "translateY(-50%)",
      zIndex: 100,
      display: "flex",
      flexDirection: "column",
      gap: "14px",
    }}>
      {capabilities.map((c, i) => (
        <button
          key={c.id}
          className="snav-btn"
          data-magnetic
          onClick={() => document.getElementById(c.id)?.scrollIntoView({ behavior:"smooth" })}
          aria-label={`Jump to ${c.domain}`}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 0,
            outline: "none",
          }}
        >
          <div
            className="snav-line"
            style={{
              height: "1.5px",
              width: active === i ? "22px" : "10px",
              background: active === i ? "#FFFFFF" : "rgba(255,255,255,0.18)",
              borderRadius: "1px",
              transition: `all ${MS.slow} ${E}`,
            }}
          />
          <span style={{
            fontFamily: "'DM Mono',monospace",
            fontSize: "9px",
            fontWeight: 500,
            color: "rgba(255,255,255,0.55)",
            opacity: active === i ? 1 : 0,
            transition: `opacity ${MS.slow} ${E}`,
          }}>
            {c.number}
          </span>
        </button>
      ))}
    </nav>
  );
}

/* ═══════════════════════════════════════════════════════
   MONO LABEL
═══════════════════════════════════════════════════════ */
function ML({ children, color = "rgba(255,255,255,0.55)", style = {} }) {
  return (
    <span style={{
      display: "block",
      fontFamily: "'DM Mono',monospace",
      fontSize: "10px",
      fontWeight: 500,
      letterSpacing: "0.14em",
      textTransform: "uppercase",
      color,
      ...style,
    }}>
      {children}
    </span>
  );
}

/* ═══════════════════════════════════════════════════════
   CURSOR BLINK
═══════════════════════════════════════════════════════ */
function TermCursor() {
  return (
    <span style={{
      display: "inline-block",
      width: "8px",
      height: "1.1em",
      background: "#FFFFFF",
      marginLeft: "3px",
      verticalAlign: "middle",
      animation: "_blink 1.1s step-end infinite",
      borderRadius: "1px",
    }} />
  );
}

/* ═══════════════════════════════════════════════════════
   SECTION HEADER
═══════════════════════════════════════════════════════ */
function SH({ eyebrow, title, sub, visible, dark = false, delay = 0, cursor = false }) {
  const tc = "#FFFFFF";
  const ec = "rgba(255,255,255,0.45)";
  return (
    <div style={{
      marginBottom: "2.5rem",
      opacity:   visible ? 1 : 0,
      animation: visible ? `_rtl ${MS.reveal} ${E} ${delay}s both` : "none",
    }}>
      <ML color={ec} style={{ marginBottom:"10px" }}>{eyebrow}</ML>
      <h2 style={{
        fontFamily: "'Dancing Script',cursive",
        fontSize: "clamp(2.8rem,5.5vw,4.5rem)",
        fontWeight: 700,
        color: tc,
        letterSpacing: "-0.025em",
        marginBottom: sub ? "8px" : 0,
        display: "flex",
        alignItems: "center",
      }}>
        {title}
        {cursor && <TermCursor />}
      </h2>
      {sub && (
        <p style={{
          fontSize: "14px",
          color: "rgba(255,255,255,0.38)",
          lineHeight: 1.65,
          maxWidth: "500px",
        }}>
          {sub}
        </p>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   CAPABILITY ROW — Monochrome alternating
═══════════════════════════════════════════════════════ */
function CapRow({ cap, visible, delay, ri }) {
  const [hov, setHov] = useState(false);
  const even = ri % 2 === 0;
  const la = even ? "_ltr" : "_rtl";
  const ra = even ? "_rtl" : "_ltr";

  return (
    <div
      className="cap-grid"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 0,
        borderBottom: `1px solid rgba(255,255,255,0.06)`,
        background: hov ? "#141414" : "transparent",
        transition: `background ${MS.fast} ${E}, transform ${MS.base} ${E}`,
        transform: hov ? "translateY(-2px)" : "translateY(0)",
      }}
    >
      {/* LEFT */}
      <div style={{
        padding: "2.25rem 2.5rem",
        borderRight: `1px solid ${hov ? "rgba(255,255,255,0.10)" : "rgba(255,255,255,0.06)"}`,
        transition: `border-color ${MS.fast} ${E}`,
        position: "relative",
        opacity: visible ? 1 : 0,
        animation: visible ? `${la} ${MS.reveal} ${E} ${delay}s both` : "none",
      }}>
        {/* Accent bar */}
        <div style={{
          position: "absolute", left: 0, top:"18px", bottom:"18px",
          width: "2px",
          background: hov ? "#FFFFFF" : "rgba(255,255,255,0.25)",
          borderRadius: "0 2px 2px 0",
          transformOrigin: "top",
          transform: visible ? "scaleY(1)" : "scaleY(0)",
          transition: `transform ${MS.slow} ${E} ${delay+0.18}s, background ${MS.fast} ${E}`,
        }}/>
        <div style={{ display:"flex", alignItems:"center", gap:"10px", marginBottom:"16px" }}>
          <ML color="rgba(255,255,255,0.45)">{cap.number}</ML>
          <div style={{
            height: "1px", width:"20px",
            background: "rgba(255,255,255,0.30)",
            transformOrigin: "left",
            transform: visible ? "scaleX(1)" : "scaleX(0)",
            transition: `transform ${MS.base} ${E} ${delay+0.24}s`,
          }}/>
        </div>
        <h3 style={{
          fontFamily: "'Dancing Script',cursive",
          fontSize: "2.2rem", fontWeight: 700,
          color: "#FFFFFF", lineHeight: 1.1,
          letterSpacing: "-0.025em", marginBottom: "12px",
        }}>
          {cap.domain}
        </h3>
        <p style={{ fontSize:"14px", color:"rgba(255,255,255,0.42)", lineHeight:1.75, maxWidth:"400px" }}>
          {cap.outcome}
        </p>
        {/* Metric counter */}
        <div style={{
          marginTop: "24px",
          opacity: visible ? 1 : 0,
          animation: visible ? `_countUp ${MS.slow} ${E} ${delay+0.32}s both` : "none",
        }}>
          <div style={{
            fontFamily: "'Dancing Script',cursive",
            fontSize: "3.5rem", fontWeight: 700,
            color: "#FFFFFF",
            lineHeight: 1, letterSpacing: "-0.03em",
          }}>
            <Counter value={cap.metric.value} suffix={cap.metric.suffix} triggered={visible}/>
          </div>
          <div style={{
            fontFamily: "'DM Mono',monospace",
            fontSize: "10px", color: "rgba(255,255,255,0.35)",
            letterSpacing: "0.08em", marginTop: "4px",
            opacity: hov ? 0.9 : 0.5,
            transition: `opacity ${MS.fast} ${E}`,
          }}>
            {cap.metric.label}
          </div>
        </div>
      </div>

      {/* RIGHT */}
      <div style={{
        padding: "2.25rem 2.5rem",
        opacity: visible ? 1 : 0,
        animation: visible ? `${ra} ${MS.reveal} ${E} ${delay+0.07}s both` : "none",
      }}>
        <div style={{ marginBottom:"22px" }}>
          {Object.entries(cap.tech).map(([cat, items], ci) => (
            <div key={cat} style={{
              marginBottom: "12px",
              display: "flex",
              gap: "10px",
              alignItems: "baseline",
              flexWrap: "wrap",
            }}>
              <ML
                color="rgba(255,255,255,0.35)"
                style={{ minWidth:"84px", flexShrink:0, paddingTop:"2px" }}
              >
                {cat}
              </ML>
              <div style={{ display:"flex", flexWrap:"wrap", gap:"5px" }}>
                {items.map((t, ti) => (
                  <Tag
                    key={t}
                    name={t}
                    accent="#FFFFFF"
                    visible={visible}
                    delay={delay + 0.14 + ci * 0.07 + ti * 0.035}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
        {/* Proof bullets */}
        <div style={{ display:"flex", flexDirection:"column", gap:"8px", marginBottom:"20px" }}>
          {cap.proof.map((p, pi) => (
            <div key={p.name} style={{
              display: "flex", gap:"10px", alignItems:"flex-start",
              opacity: visible ? 1 : 0,
              animation: visible ? `_rtl ${MS.slow} ${E} ${delay+0.30+pi*0.07}s both` : "none",
            }}>
              <div style={{
                width:"3px", height:"3px", borderRadius:"50%",
                background: hov ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.2)",
                flexShrink:0, marginTop:"7px",
                transition:`background ${MS.fast} ${E}`,
              }}/>
              <div>
                <span style={{ fontSize:"13px", fontWeight:500, color:"#FFFFFF" }}>{p.name}</span>
                <span style={{ fontSize:"12px", color:"rgba(255,255,255,0.38)", marginLeft:"8px" }}>— {p.detail}</span>
              </div>
            </div>
          ))}
        </div>
        {/* Context footer */}
        <div style={{
          paddingTop:"14px",
          borderTop:`1px solid rgba(255,255,255,0.06)`,
          display:"flex", gap:"8px", alignItems:"center",
        }}>
          <span style={{ fontFamily:"'DM Mono',monospace", fontSize:"11px", color:"rgba(255,255,255,0.35)" }}>
            {cap.period}
          </span>
          <span style={{ fontSize:"11px", color:"rgba(255,255,255,0.20)" }}>·</span>
          <span style={{ fontSize:"11px", color:"rgba(255,255,255,0.35)" }}>{cap.context}</span>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   METRIC CARD — Monochrome
═══════════════════════════════════════════════════════ */
function MetCard({ value, suffix, label, sub, triggered, delay }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      data-magnetic
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        padding: "2rem 1.5rem",
        background: "#111111",
        transform: hov ? "scale(1.016)" : "scale(1)",
        transition: `transform ${MS.fast} ${E}`,
        opacity: triggered ? 1 : 0,
        animation: triggered ? `_up 300ms ${E} ${delay}s both` : "none",
      }}
    >
      <div style={{
        fontFamily: "'Dancing Script',cursive",
        fontSize: "3.25rem", fontWeight: 700,
        color: "#FFFFFF",
        lineHeight: 1, letterSpacing: "-0.03em", marginBottom: "6px",
      }}>
        <Counter value={value} suffix={suffix} triggered={triggered}/>
      </div>
      <div style={{ fontSize:"13.5px", fontWeight:500, color:"#FFFFFF", marginBottom:"4px" }}>{label}</div>
      <div style={{
        fontSize: "11.5px", color: "rgba(255,255,255,0.38)", lineHeight: 1.5,
        opacity: hov ? 0.9 : 0.52,
        transition: `opacity ${MS.fast} ${E}`,
      }}>
        {sub}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   TRAJECTORY CARD — Monochrome
═══════════════════════════════════════════════════════ */
function TrajCard({ item, visible, delay }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      data-magnetic
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        padding: "1.75rem",
        background: "#111111",
        border: `1px solid ${hov ? "rgba(255,255,255,0.14)" : "rgba(255,255,255,0.06)"}`,
        borderRadius: "10px",
        position: "relative",
        transform: hov ? "translateY(-6px)" : "translateY(0)",
        transition: `transform ${MS.base} ${E}, border-color ${MS.fast} ${E}`,
        opacity: visible ? 1 : 0,
        animation: visible ? `_rtl ${MS.reveal} ${E} ${delay}s both` : "none",
      }}
    >
      <div style={{
        position: "absolute", left:0, top:"18px", bottom:"18px",
        width: "2px",
        background: hov ? "#FFFFFF" : "rgba(255,255,255,0.2)",
        borderRadius: "0 2px 2px 0", transformOrigin: "top",
        transform: visible ? "scaleY(1)" : "scaleY(0)",
        transition: `transform ${MS.slow} ${E} ${delay+0.15}s, background ${MS.fast} ${E}`,
      }}/>
      <div style={{ paddingLeft:"12px" }}>
        <div style={{ fontSize:"1.35rem", marginBottom:"10px" }}>{item.icon}</div>
        <h3 style={{
          fontFamily: "'DM Mono',monospace",
          fontSize:"13px", fontWeight:600,
          color:"#FFFFFF", marginBottom:"8px",
        }}>
          {item.area}
        </h3>
        <p style={{ fontSize:"12.5px", color:"rgba(255,255,255,0.40)", lineHeight:1.65 }}>{item.detail}</p>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   PHILOSOPHY CARD — Monochrome
═══════════════════════════════════════════════════════ */
function PhilCard({ item, visible, delay, idx }) {
  const dir = idx % 2 === 0 ? "_rtl" : "_ltr";
  return (
    <div style={{
      padding: "2rem 2.5rem",
      background: "rgba(255,255,255,0.02)",
      opacity: visible ? 1 : 0,
      animation: visible ? `${dir} ${MS.reveal} ${E} ${delay}s both` : "none",
    }}>
      <div style={{ display:"flex", alignItems:"flex-start", gap:"12px", marginBottom:"14px" }}>
        <div style={{ flexShrink:0, paddingTop:"2px" }}>
          <ML color="rgba(255,255,255,0.30)" style={{ marginBottom:"4px" }}>{item.n}</ML>
          <div style={{
            height:"1px", background:"rgba(255,255,255,0.15)",
            transformOrigin:"left",
            transform: visible ? "scaleX(1)" : "scaleX(0)",
            transition: `transform ${MS.slow} ${E} ${delay+0.2}s`,
          }}/>
        </div>
        <h3 style={{
          fontFamily: "'Dancing Script',cursive",
          fontSize:"1.75rem", fontWeight:600,
          color:"#FFFFFF", lineHeight:1.2, letterSpacing:"-0.02em",
        }}>
          {item.statement}
        </h3>
      </div>
      <p style={{
        fontSize:"13px", color:"rgba(255,255,255,0.35)",
        lineHeight:1.7, paddingLeft:"28px",
      }}>
        {item.elaboration}
      </p>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   TOOL CARD — Monochrome
═══════════════════════════════════════════════════════ */
function ToolCard({ tool, visible, delay }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      data-magnetic
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "11px 14px",
        background: "#111111",
        border: `1px solid ${hov ? "rgba(255,255,255,0.14)" : "rgba(255,255,255,0.06)"}`,
        borderRadius: "8px",
        transform: hov ? "translateX(-3px)" : "translateX(0)",
        transition: `border-color ${MS.fast} ${E}, transform ${MS.fast} ${E}`,
        opacity: visible ? 1 : 0,
        animation: visible ? `_rtl ${MS.slow} ${E} ${delay}s both` : "none",
      }}
    >
      <div style={{ display:"flex", alignItems:"center", gap:"10px" }}>
        <div style={{
          width:"6px", height:"6px", borderRadius:"50%",
          background: hov ? "#FFFFFF" : "rgba(255,255,255,0.35)",
          flexShrink:0,
          transition:`background ${MS.fast} ${E}`,
        }}/>
        <DI
          name={tool.name}
          size={16}
          extraStyle={{
            opacity: hov ? 0.9 : 0.45,
            transition:`opacity ${MS.fast} ${E}`,
            
          }}
        />
        <span style={{
          fontFamily:"'DM Mono',monospace",
          fontSize:"12px", fontWeight:500, color:"#FFFFFF",
        }}>
          {tool.name}
        </span>
      </div>
      <span style={{
        fontFamily:"'DM Mono',monospace",
        fontSize:"10px", color:"rgba(255,255,255,0.35)",
        opacity: hov ? 1 : 0.5,
        transition: `opacity ${MS.fast} ${E}`,
      }}>
        {tool.cat}
      </span>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   FOOTER CTA — Monochrome
═══════════════════════════════════════════════════════ */
function FooterCTA({ label, sub, href, accent, visible, delay }) {
  const [hov, setHov] = useState(false);
  const [press, setPress] = useState(false);
  return (
    <a
      href={href}
      data-magnetic
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => { setHov(false); setPress(false); }}
      onMouseDown={() => setPress(true)}
      onMouseUp={() => setPress(false)}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "16px 20px",
        borderRadius: "10px",
        textDecoration: "none",
        background: accent
          ? (hov ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.07)")
          : (hov ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.03)"),
        border: `1px solid ${accent
          ? (hov ? "rgba(255,255,255,0.30)" : "rgba(255,255,255,0.15)")
          : (hov ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.07)")}`,
        transition: `background ${MS.fast} ${E}, border-color ${MS.fast} ${E}`,
        opacity: visible ? 1 : 0,
        transform: visible ? (press ? "scale(0.98)" : "translateY(0)") : "translateY(10px)",
        animation: visible ? `_up ${MS.slow} ${E} ${delay}s both` : "none",
      }}
    >
      <div>
        <ML color="rgba(255,255,255,0.25)" style={{ marginBottom:"4px" }}>{sub}</ML>
        <div style={{ fontSize:"14px", fontWeight:500, color:"#FFFFFF" }}>{label}</div>
      </div>
      <svg
        width="14" height="14" viewBox="0 0 24 24" fill="none"
        stroke="rgba(255,255,255,0.55)"
        strokeWidth="2" strokeLinecap="round"
        style={{
          transform: hov ? "translateX(4px)" : "translateX(0)",
          transition: `transform ${MS.fast} ${E}`,
        }}
      >
        <path d="M5 12h14M12 5l7 7-7 7"/>
      </svg>
    </a>
  );
}

/* ═══════════════════════════════════════════════════════
   ROOT PAGE
═══════════════════════════════════════════════════════ */
export default function Skills() {
  const [hR,  hV]  = useInView(0.08);
  const [oR,  oV]  = useInView(0.10);
  const [cR,  cV]  = useInView(0.04);
  const [mR,  mV]  = useInView(0.10);
  const [pR,  pV]  = useInView(0.08);
  const [tR,  tV]  = useInView(0.08);
  const [trR, trV] = useInView(0.08);
  const [fR,  fV]  = useInView(0.04);

  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    const fn = () => {
      const mid = window.innerHeight / 2;
      capabilities.forEach((c, i) => {
        const el = document.getElementById(c.id);
        if (!el) return;
        const r = el.getBoundingClientRect();
        if (r.top <= mid && r.bottom >= mid) setActiveSection(i);
      });
    };
    window.addEventListener("scroll", fn, { passive:true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const W  = { maxWidth:"1200px", margin:"0 auto", padding:"0 2rem" };
  const SP = (t="5rem", b="5rem") => ({ padding:`${t} 0 ${b}` });

  return (
    <>
      <style>{GLOBAL}</style>
      <MagneticCursor />
      <SideNav active={activeSection} />

      {/* Background grid texture */}
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

        {/* ─────────────────── HERO ─────────────────── */}
        <header ref={hR} style={{ ...SP("8rem","5rem"), background:"#0B0B0B" }}>
          <div style={W}>
            {/* Eyebrow */}
            <div style={{
              display:"flex", alignItems:"center", gap:"12px", marginBottom:"2rem",
              opacity: hV ? 1 : 0,
              animation: hV ? `_rtl ${MS.slow} ${E} 0.05s both` : "none",
            }}>
              <div style={{ width:"20px", height:"1px", background:"rgba(255,255,255,0.55)" }}/>
              <ML>Technical Profile · B.Tech AIDS · 2026</ML>
              <TermCursor />
            </div>

            {/* Headline */}
            <h1 style={{
              fontFamily:"'Dancing Script',cursive",
              fontSize:"clamp(3.5rem,8vw,7rem)", fontWeight:700,
              color:"#FFFFFF", lineHeight:1.03, letterSpacing:"-0.03em",
              marginBottom:"1.5rem", maxWidth:"820px",
              opacity: hV ? 1 : 0,
              animation: hV ? `_rtl ${MS.reveal} ${E} 0.12s both` : "none",
            }}>
              Designing Scalable<br/>Engineering Systems
            </h1>

            {/* Sub */}
            <p style={{
              fontSize:"1rem", color:"rgba(255,255,255,0.42)", lineHeight:1.75,
              maxWidth:"580px", marginBottom:"3rem",
              opacity: hV ? 1 : 0,
              animation: hV ? `_rtl ${MS.reveal} ${E} 0.20s both` : "none",
            }}>
              End-to-end platforms integrating application logic, data systems, and ML pipelines — delivering production-ready solutions with measurable impact.
            </p>

            {/* Pillars */}
            <div className="hpillars" style={{
              display:"grid", gridTemplateColumns:"repeat(3,1fr)",
              gap:"1px", background:"rgba(255,255,255,0.06)",
              borderRadius:"12px", overflow:"hidden",
              border:"1px solid rgba(255,255,255,0.06)",
              opacity: hV ? 1 : 0,
              animation: hV ? `_si ${MS.slow} ${E} 0.28s both` : "none",
            }}>
              {[
                { 
    label:"Systems Thinking",
    desc:"Designing scalable architectures and defining system structure before implementation",
    icons:["React","Node.js","MongoDB"]
  },
  { 
    label:"Applied AI",
    desc:"Developing and integrating machine learning pipelines into real-world applications",
    icons:["Python","TensorFlow","Keras"]
  },
  { 
    label:"Production Delivery",
    desc:"Building, testing, and deploying reliable systems for real-world usage",
    icons:["Git / GitHub","Vercel","Postman"]
  },
              ].map((p, i) => (
                <div key={i} style={{ padding:"1.75rem 1.5rem", background:"#0B0B0B" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:"8px", marginBottom:"8px" }}>
                    <div style={{ width:"4px", height:"4px", borderRadius:"50%", background:"rgba(255,255,255,0.55)" }}/>
                    <span style={{ fontSize:"13.5px", fontWeight:600, color:"#FFFFFF" }}>{p.label}</span>
                  </div>
                  <p style={{ fontSize:"12px", color:"rgba(255,255,255,0.38)", lineHeight:1.6, marginBottom:"12px" }}>{p.desc}</p>
                  <div style={{ display:"flex", gap:"6px" }}>
                    {p.icons.map((ic, ii) => (
                      <img
                        key={ic}
                        src={ICONS[ic]}
                        alt={ic}
                        className="di"
                        width={18}
                        height={18}
                        loading="lazy"
                        style={{
                          display:"block", borderRadius:"2px",
                          opacity: 0.5,
                          
                          animation: hV ? `_iconIn 280ms ${E} ${0.34 + i*0.06 + ii*0.04}s both` : "none",
                        }}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </header>

        {/* ─── MARQUEE TICKER ─── */}
        <Marquee speed={34} />

        {/* ─────────────────── OVERVIEW ─────────────────── */}
        <section ref={oR} style={{ ...SP("4rem","5rem"), background:"#0B0B0B" }}>
          <div style={W}>
            <div style={{
              padding:"2.5rem 3rem", borderRadius:"14px",
              border:`1px solid rgba(255,255,255,0.08)`,
              background:"rgba(255,255,255,0.04)",
              opacity: oV ? 1 : 0,
              animation: oV ? `_rtl ${MS.reveal} ${E} 0.05s both` : "none",
            }}>
              <div className="ovgrid" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"3rem", alignItems:"center" }}>
                <div>
                  <ML style={{ marginBottom:"14px" }}>Primary Strength</ML>
                  <h2 style={{
                    fontFamily:"'Dancing Script',cursive",
                    fontSize:"2.8rem", fontWeight:700,
                    color:"#FFFFFF", letterSpacing:"-0.025em", lineHeight:1.1, marginBottom:"12px",
                  }}>
                    Full-Stack × AI Integration
                  </h2>
                  <p style={{ fontSize:"14px", color:"rgba(255,255,255,0.42)", lineHeight:1.75 }}>
                    Production web systems incorporating ML inference — from training through API deployment to interface.
                  </p>
                </div>
                <div style={{ display:"flex", flexDirection:"column", gap:"8px" }}>
                  {[
                    { pair:"React × Flask",      icons:["React","Flask"],    note:"ML inference endpoints" },
                    { pair:"MongoDB × Pipeline", icons:["MongoDB","Python"], note:"AI-driven persistence" },
                    { pair:"OAuth × JWT",        icons:["OAuth","Node.js"],  note:"Production auth" },
                  ].map((x, i) => (
                    <div key={i} style={{
                      display:"flex", alignItems:"center", justifyContent:"space-between",
                      padding:"10px 14px", borderRadius:"8px",
                      background:"rgba(255,255,255,0.04)",
                      border:`1px solid rgba(255,255,255,0.07)`,
                    }}>
                      <div style={{ display:"flex", alignItems:"center", gap:"8px" }}>
                        {x.icons.map(ic => (
                          <img
                            key={ic} src={ICONS[ic]} alt={ic} className="di"
                            width={16} height={16} loading="lazy"
                            style={{
                              display:"block", borderRadius:"2px",
                              
                            }}
                          />
                        ))}
                        <span style={{
                          fontFamily:"'DM Mono',monospace", fontSize:"12px", fontWeight:500, color:"#FFFFFF",
                        }}>
                          {x.pair}
                        </span>
                      </div>
                      <span style={{ fontSize:"11.5px", color:"rgba(255,255,255,0.38)" }}>{x.note}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─────────────────── CAPABILITIES ─────────────────── */}
        <section
          ref={cR}
          style={{
            borderTop:`1px solid rgba(255,255,255,0.06)`,
            borderBottom:`1px solid rgba(255,255,255,0.06)`,
            background:"#0B0B0B",
          }}
        >
          <div style={W}>
            <div style={{ padding:"4rem 0 2.5rem" }}>
              <SH
                eyebrow="Section 02"
                title="Capability Architecture"
                sub="Organized by domain → outcome. Not technologies — what I deliver."
                visible={cV}
                cursor
              />
            </div>
          </div>
          {capabilities.map((cap, i) => (
            <div key={cap.id} id={cap.id}>
              <div style={W}>
                <CapRow cap={cap} visible={cV} delay={i * 0.09} ri={i}/>
              </div>
            </div>
          ))}
          <div style={{ height:"3rem" }}/>
        </section>

        {/* Marquee between sections */}
        <Marquee speed={28} />

        {/* ─────────────────── METRICS ─────────────────── */}
        <section ref={mR} style={{ ...SP(), background:"#0F0F0F" }}>
          <div style={W}>
            <SH eyebrow="Section 03" title="Impact Metrics" visible={mV}/>
            <div style={{
              display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(190px,1fr))",
              gap:"1px", background:"rgba(255,255,255,0.06)",
              border:`1px solid rgba(255,255,255,0.06)`,
              borderRadius:"12px", overflow:"hidden",
            }}>
              {[
                { value:3,   suffix:"",   label:"Industry Internships", sub:"Paid, production" },
                { value:5,   suffix:"+",  label:"Systems Shipped",      sub:"Deployed, tested" },
                { value:100, suffix:"+",  label:"DSA Problems",         sub:"LeetCode + academic" },
                { value:20,  suffix:"+",  label:"Certifications",       sub:"AWS, Azure, GCP" },
                { value:90,  suffix:"%",  label:"ML Accuracy",          sub:"NLP classification" },
              ].map((m, i) => (
                <MetCard key={i} {...m} triggered={mV} delay={i * 0.06}/>
              ))}
            </div>
          </div>
        </section>

        {/* ─────────────────── PHILOSOPHY ─────────────────── */}
        <section ref={pR} style={{ ...SP(), background:"#000000", position:"relative", overflow:"hidden" }}>
          {/* Ultra-subtle white glow */}
          <div aria-hidden="true" style={{
            position:"absolute", left:"-8%", bottom:"-25%",
            width:"480px", height:"480px", borderRadius:"50%",
            background:"radial-gradient(circle, rgba(255,255,255,0.03), transparent 70%)",
            filter:"blur(70px)", pointerEvents:"none",
            opacity: pV ? 1 : 0,
            transition:`opacity 0.8s ${E}`,
          }}/>
          <div style={{ ...W, position:"relative", zIndex:1 }}>
            <SH
              eyebrow="Section 04"
              title="Engineering Philosophy"
              sub="Four principles applied on every project."
              visible={pV}
              dark
            />
            <div className="pgrid" style={{
              display:"grid", gridTemplateColumns:"repeat(2,1fr)",
              gap:"1px", background:"rgba(255,255,255,0.04)",
              border:"1px solid rgba(255,255,255,0.06)",
              borderRadius:"12px", overflow:"hidden",
            }}>
              {philosophy.map((p, i) => (
                <PhilCard key={i} item={p} visible={pV} delay={i * 0.08} idx={i}/>
              ))}
            </div>
          </div>
        </section>

        {/* ─────────────────── TOOLING ─────────────────── */}
        <section ref={tR} style={{ ...SP(), borderTop:`1px solid rgba(255,255,255,0.06)`, background:"#0B0B0B" }}>
          <div style={W}>
            <SH eyebrow="Section 05" title="Tooling Familiarity" visible={tV}/>
            {/* Legend */}
            <div style={{
              display:"flex", gap:"20px", flexWrap:"wrap",
              marginBottom:"20px", marginTop:"-10px",
              opacity: tV ? 1 : 0,
              animation: tV ? `_fade ${MS.slow} ${E} 0.08s both` : "none",
            }}>
              {[
                { label:"Daily",      opacity:"0.90" },
                { label:"Regular",    opacity:"0.55" },
                { label:"Occasional", opacity:"0.30" },
              ].map(x => (
                <div key={x.label} style={{ display:"flex", alignItems:"center", gap:"6px" }}>
                  <div style={{
                    width:"6px", height:"6px", borderRadius:"50%",
                    background:`rgba(255,255,255,${x.opacity})`,
                  }}/>
                  <span style={{
                    fontFamily:"'DM Mono',monospace", fontSize:"11px",
                    color:"rgba(255,255,255,0.45)", fontWeight:500,
                  }}>
                    {x.label}
                  </span>
                </div>
              ))}
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(230px,1fr))", gap:"8px" }}>
              {tooling.map((t, i) => (
                <ToolCard key={t.name} tool={t} visible={tV} delay={i * 0.04}/>
              ))}
            </div>
          </div>
        </section>

        {/* ─────────────────── TRAJECTORY ─────────────────── */}
        <section ref={trR} style={{ ...SP(), background:"#0F0F0F", borderTop:`1px solid rgba(255,255,255,0.06)` }}>
          <div style={W}>
            <SH
              eyebrow="Section 06"
              title="Next Evolution"
              sub="Active learning areas — moving to core capabilities within 6 months."
              visible={trV}
            />
            <div className="three-col" style={{
              display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))", gap:"12px",
            }}>
              {trajectory.map((t, i) => (
                <TrajCard key={t.area} item={t} visible={trV} delay={i * 0.09}/>
              ))}
            </div>
          </div>
        </section>

        {/* ─────────────────── FOOTER ─────────────────── */}
        <footer ref={fR} style={{ background:"#000000", position:"relative", overflow:"hidden" }}>
          {/* Wave transition */}
          <div style={{ position:"relative", height:"56px", background:"#0F0F0F", overflow:"hidden" }}>
            <svg viewBox="0 0 1440 56" preserveAspectRatio="none"
              style={{ position:"absolute", bottom:0, left:0, width:"100%", height:"100%" }}>
              <path d="M0,0 C360,56 720,0 1080,28 C1260,42 1380,14 1440,28 L1440,56 L0,56 Z" fill="#000000"/>
            </svg>
          </div>

          {/* Subtle grid */}
          <div aria-hidden="true" style={{
            position:"absolute", inset:0, zIndex:0, pointerEvents:"none",
            backgroundImage:[
              "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)",
              "linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
            ].join(","),
            backgroundSize:"48px 48px",
          }}/>
          {/* Subtle white glow */}
          <div aria-hidden="true" style={{
            position:"absolute", left:"-5%", top:"15%",
            width:"420px", height:"420px", borderRadius:"50%",
            background:"radial-gradient(circle, rgba(255,255,255,0.04), transparent 70%)",
            filter:"blur(60px)", pointerEvents:"none",
          }}/>

          <div style={{ ...W, position:"relative", zIndex:1 }}>
            {/* CTA row */}
            <div style={{ borderBottom:"1px solid rgba(255,255,255,0.06)", padding:"4rem 0" }}>
              <div className="fctar" style={{
                display:"flex", justifyContent:"space-between",
                alignItems:"flex-end", gap:"2.5rem", flexWrap:"wrap",
              }}>
                <div style={{ maxWidth:"540px" }}>
                  {/* Status badge */}
                  <div style={{
                    display:"inline-flex", alignItems:"center", gap:"6px",
                    padding:"5px 12px", borderRadius:"999px",
                    background:"rgba(255,255,255,0.06)",
                    border:"1px solid rgba(255,255,255,0.12)",
                    marginBottom:"20px",
                    opacity: fV ? 1 : 0,
                    animation: fV ? `_rtl ${MS.slow} ${E} 0.05s both` : "none",
                  }}>
                    <div style={{
                      width:"5px", height:"5px", borderRadius:"50%",
                      background:"rgba(255,255,255,0.85)",
                      animation:"_pulse 2.2s ease-in-out infinite",
                    }}/>
                    <ML color="rgba(255,255,255,0.65)">Open to Opportunities · 2026</ML>
                  </div>

                  <h2 style={{
                    fontFamily:"'Dancing Script',cursive",
                    fontSize:"clamp(3rem,6vw,5.5rem)", fontWeight:700,
                    color:"#FFFFFF", lineHeight:1.04, letterSpacing:"-0.03em", marginBottom:"14px",
                    opacity: fV ? 1 : 0,
                    animation: fV ? `_rtl ${MS.reveal} ${E} 0.12s both` : "none",
                  }}>
                    Let's Build Something<br/>Inevitable
                  </h2>

                  <p style={{
                    fontSize:"15px", color:"rgba(255,255,255,0.35)",
                    lineHeight:1.75, maxWidth:"400px",
                    opacity: fV ? 1 : 0,
                    animation: fV ? `_rtl ${MS.reveal} ${E} 0.20s both` : "none",
                  }}>
                    Systems engineer. Product thinker. AI architect. Ready to join teams that ship things that matter.
                  </p>
                </div>

                <div style={{ display:"flex", flexDirection:"column", gap:"10px", minWidth:"230px" }}>
                  <FooterCTA
                    label="Schedule Interview" sub="Primary"
                    href="mailto:g.sivasatyasaibhagavan@gmail.com"
                    accent visible={fV} delay={0.16}
                  />
                  <FooterCTA
                    label="View Portfolio" sub="Work"
                    href="/" accent={false} visible={fV} delay={0.22}
                  />
                </div>
              </div>
            </div>

            {/* Footer meta grid */}
            <div className="fgrid" style={{
              display:"grid", gridTemplateColumns:"2fr 1fr 1fr 1fr",
              gap:"2.5rem", padding:"3rem 0 2.5rem",
            }}>
              <div>
                <div style={{
                  fontFamily:"'Dancing Script',cursive",
                  fontSize:"2rem", fontWeight:700, color:"#FFFFFF",
                  letterSpacing:"-0.03em", marginBottom:"10px",
                }}>
                  Bhagavan<span style={{ color:"rgba(255,255,255,0.35)" }}>.</span>
                </div>
                <p style={{
                  fontSize:"12.5px", color:"rgba(255,255,255,0.28)",
                  lineHeight:1.75, marginBottom:"20px", maxWidth:"240px",
                }}>
                  B.Tech AIDS · Ramachandra College · Andhra Pradesh, India.
                </p>
                <div style={{ display:"flex", gap:"6px" }}>
                  {[
                    { l:"GH", h:"https://github.com/bhagavan444" },
                    { l:"LI", h:"https://www.linkedin.com/in/gopalajosyula-siva-satya-sai-bhagavan-1624a027b/" },
                    { l:"✉",  h:"mailto:g.sivasatyasaibhagavan@gmail.com" },
                  ].map((s, i) => (
                    <a key={i} href={s.h}
                      data-magnetic
                      target={s.h.startsWith("http") ? "_blank" : undefined}
                      rel={s.h.startsWith("http") ? "noopener noreferrer" : undefined}
                      style={{
                        width:"32px", height:"32px", borderRadius:"7px",
                        background:"rgba(255,255,255,0.04)",
                        border:"1px solid rgba(255,255,255,0.08)",
                        display:"flex", alignItems:"center", justifyContent:"center",
                        fontFamily:"'DM Mono',monospace",
                        color:"rgba(255,255,255,0.35)", textDecoration:"none", fontSize:"11px",
                      }}
                    >
                      {s.l}
                    </a>
                  ))}
                </div>
              </div>

              <div>
                <ML color="rgba(255,255,255,0.18)" style={{ marginBottom:"18px" }}>Navigate</ML>
                {["Overview","Capabilities","Metrics","Philosophy","Trajectory"].map((l, i) => (
                  <a key={i} href="#" style={{
                    display:"block", fontSize:"13px", color:"rgba(255,255,255,0.32)",
                    textDecoration:"none", marginBottom:"10px",
                  }}>{l}</a>
                ))}
              </div>

              <div>
                <ML color="rgba(255,255,255,0.18)" style={{ marginBottom:"18px" }}>Work</ML>
                {[
                  { l:"All Projects",   h:"/projects" },
                  { l:"GitHub",         h:"https://github.com/bhagavan444" },
                  { l:"Resume / CV",    h:"#" },
                  { l:"Certifications", h:"#" },
                ].map((l, i) => (
                  <a key={i} href={l.h} style={{
                    display:"block", fontSize:"13px", color:"rgba(255,255,255,0.32)",
                    textDecoration:"none", marginBottom:"10px",
                  }}>
                    {l.l}
                  </a>
                ))}
              </div>

              <div>
                <ML color="rgba(255,255,255,0.18)" style={{ marginBottom:"18px" }}>Contact</ML>
                {[
                  { lb:"Email",    v:"g.sivasatyasaibhagavan@gmail.com" },
                  { lb:"Phone",    v:"+91 7569205626" },
                  { lb:"Location", v:"Andhra Pradesh, IN" },
                  { lb:"Status",   v:"Available · Immediate", bright:true },
                ].map((c, i) => (
                  <div key={i} style={{ marginBottom:"14px" }}>
                    <ML color="rgba(255,255,255,0.20)" style={{ fontSize:"9px", marginBottom:"3px" }}>{c.lb}</ML>
                    <div style={{
                      fontSize:"12.5px",
                      color: c.bright ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.42)",
                    }}>
                      {c.v}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom bar */}
            <div style={{
              borderTop:"1px solid rgba(255,255,255,0.06)", padding:"1.5rem 0",
              display:"flex", alignItems:"center",
              justifyContent:"space-between", gap:"1rem", flexWrap:"wrap",
            }}>
              <div style={{
                fontFamily:"'DM Mono',monospace", fontSize:"11px",
                color:"rgba(255,255,255,0.20)",
              }}>
                © 2026 Siva Satya Sai Bhagavan
              </div>
              <div style={{ display:"flex", gap:"20px" }}>
                {["Privacy","Terms","Sitemap"].map(l => (
                  <a key={l} href="#" style={{
                    fontFamily:"'DM Mono',monospace", fontSize:"11px",
                    color:"rgba(255,255,255,0.20)", textDecoration:"none",
                  }}>
                    {l}
                  </a>
                ))}
              </div>
              <div style={{ display:"flex", alignItems:"center", gap:"6px" }}>
                <div style={{
                  width:"5px", height:"5px", borderRadius:"50%",
                  background:"rgba(255,255,255,0.75)",
                  animation:"_pulse 2.2s ease-in-out infinite",
                }}/>
                <span style={{
                  fontFamily:"'DM Mono',monospace", fontSize:"11px",
                  color:"rgba(255,255,255,0.55)",
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