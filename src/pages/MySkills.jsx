"use client";

import React, { useState, useEffect, useRef } from "react";

/* ═══════════════════════════════════════════════════════
   DESIGN TOKENS  —  Unix terminal × Linear precision
═══════════════════════════════════════════════════════ */
const C = {
  bg:        "#f8f8f7",
  surface:   "#f2f2f0",
  surfaceHi: "#eaeae8",
  white:     "#ffffff",
  border:    "rgba(0,0,0,0.065)",
  border2:   "rgba(0,0,0,0.12)",
  text:      "#0c0c0c",
  muted:     "#6e6e78",
  muted2:    "#4a4a52",
  accent:    "#0057d9",
  accentSub: "rgba(0,87,217,0.045)",
  accentLine:"rgba(0,87,217,0.14)",
  green:     "#047857",
  greenSub:  "rgba(4,120,87,0.045)",
  amber:     "#92400e",
  ink:       "#080808",
  inkMid:    "#1a1a1a",
};

const E  = "cubic-bezier(0.16, 1, 0.3, 1)";
const MS = { fast:"130ms", base:"190ms", slow:"320ms", reveal:"420ms" };

/* ═══════════════════════════════════════════════════════
   DEVICON CDN — exhaustive map, no broken URLs
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
   GLOBAL CSS
   — RTL / LTR / marquee keyframes
   — Unix terminal aesthetic: monospace labels, hairline
     borders, dot indicators, command-palette dropdowns
═══════════════════════════════════════════════════════ */
const GLOBAL = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant:wght@500;600;700&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&family=DM+Mono:wght@400;500&display=swap');

  *, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }
  html { scroll-behavior:smooth; overflow-x:hidden; }
  body {
    font-family:'DM Sans', system-ui, sans-serif;
    background:${C.bg};
    color:${C.text};
    -webkit-font-smoothing:antialiased;
    overflow-x:hidden;
  }
  ::selection { background:rgba(0,87,217,0.12); }
  ::-webkit-scrollbar { width:2px; }
  ::-webkit-scrollbar-track { background:transparent; }
  ::-webkit-scrollbar-thumb { background:rgba(0,87,217,0.22); border-radius:2px; }

  /* ── Directional entrances ──────────────────────── */
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

  /* ── Moving text marquee (continuous RTL scroll) ── */
  @keyframes _marquee {
    from { transform:translateX(0); }
    to   { transform:translateX(-50%); }
  }

  /* ── Tag & icon micro pops ─────────────────────── */
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

  /* ── Devicon hover micro-interaction ──────────── */
  .di {
    transition: transform ${MS.fast} ${E}, filter ${MS.fast} ${E};
    cursor:default;
  }
  .di:hover {
    transform: scale(1.25) rotate(-6deg);
    filter: drop-shadow(0 2px 6px rgba(0,0,0,0.2));
  }

  /* ── Nav link hover underline ──────────────────── */
  .snav-btn:hover .snav-line { width:22px !important; }

  /* ── Responsive breakpoints ─────────────────────── */
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
    outcome:"Production web systems with OAuth, MongoDB, REST APIs — deployed and user-tested.",
    context:"StudyOwl Education · MERN Internship", period:"2024",
    tech:{
      "Interface":   ["React","HTML5","CSS3","JavaScript"],
      "Application": ["Node.js","Express","REST"],
      "Data":        ["MongoDB","JWT","OAuth"],
    },
    proof:[
      { name:"ATS Resume Builder",  detail:"Keyword scoring, PDF parsing" },
      { name:"AI Chatbot Platform", detail:"React + Flask ML backend" },
    ],
    metric:{ value:3,   suffix:"+", label:"Production Systems" },
    accent:C.accent,
  },
  {
    id:"intelligence", number:"02",
    domain:"Applied Intelligence",
    outcome:"ML models achieving 90%+ accuracy in NLP classification, deployed via Flask APIs.",
    context:"Blackbucks · SmartBridge · AI/ML Internship", period:"2024",
    tech:{
      "Training":   ["TensorFlow","Keras","Scikit-learn","CNN"],
      "Processing": ["Python","Pandas","NumPy","NLTK"],
      "Deploy":     ["Flask API","REST"],
    },
    proof:[
      { name:"Fake News Detector",  detail:"TF-IDF + 90%+ accuracy" },
      { name:"Career Recommender",  detail:"Supervised ML prediction" },
    ],
    metric:{ value:90,  suffix:"%", label:"Model Accuracy" },
    accent:C.green,
  },
  {
    id:"infrastructure", number:"03",
    domain:"Infrastructure",
    outcome:"Full-stack deployment with environment isolation and cloud hosting.",
    context:"Self-Directed Projects", period:"Ongoing",
    tech:{
      "Hosting": ["Vercel","Cloud Platforms"],
      "Backend": ["Flask","Node"],
      "Tooling": ["Environment Config","MongoDB Atlas"],
    },
    proof:[
      { name:"End-to-end Deployment", detail:"Frontend + API hosted" },
      { name:"OAuth + Database",      detail:"MongoDB Atlas integration" },
    ],
    metric:{ value:5,   suffix:"+", label:"Live Systems" },
    accent:"#7c3aed",
  },
  {
    id:"foundations", number:"04",
    domain:"Computational Foundations",
    outcome:"100+ algorithmic problems. Strong OOP design patterns in Python and Java.",
    context:"B.Tech AIDS · Coursework", period:"2022–2026",
    tech:{
      "Languages": ["Python","Java","C"],
      "Concepts":  ["Data Structures","Algorithms","OOP"],
      "Practice":  ["LeetCode","Academic"],
    },
    proof:[
      { name:"LeetCode Practice",  detail:"100+ problems solved" },
      { name:"OOP Coursework",     detail:"Lab-grade implementations" },
    ],
    metric:{ value:100, suffix:"+", label:"Problems Solved" },
    accent:"#475569",
  },
];

const philosophy = [
  { n:"01", statement:"Design systems, not features",       elaboration:"Every component belongs to a larger architecture. Think in data flows and contracts before code." },
  { n:"02", statement:"Prefer clarity over complexity",     elaboration:"The most maintainable solution is usually the simplest one that solves the right problem." },
  { n:"03", statement:"Optimize for maintainability first", elaboration:"Premature optimization creates debt. Readable structure outperforms clever code at scale." },
  { n:"04", statement:"Ship measurable outcomes",           elaboration:"Engineering effort should tie to metrics — retention, accuracy, load time, friction reduction." },
];

const trajectory = [
  { area:"System Design",      detail:"Load balancing, caching, distributed fundamentals",       icon:"⚙️" },
  { area:"LLM Integration",    detail:"RAG, prompt engineering, production API integration",     icon:"🤖" },
  { area:"Cloud Architecture", detail:"Docker, cloud-native deployment, infrastructure-as-code", icon:"☁️" },
  { area:"Type Safety",        detail:"TypeScript migration, strict patterns, compile-time safety", icon:"📘" },
];

const tooling = [
  { name:"Git / GitHub",     level:"Daily",      cat:"Core"     },
  { name:"VS Code",          level:"Daily",      cat:"Core"     },
  { name:"Postman",          level:"Daily",      cat:"API"      },
  { name:"MongoDB Atlas",    level:"Regular",    cat:"Database" },
  { name:"Jupyter Notebook", level:"Regular",    cat:"ML"       },
  { name:"Flask Deploy",     level:"Regular",    cat:"Backend"  },
  { name:"Vercel",           level:"Occasional", cat:"Deploy"   },
  { name:"Figma",            level:"Occasional", cat:"Design"   },
];

/* Marquee ticker content */
const TICKER_ITEMS = [
  "React", "Node.js", "Python", "TensorFlow", "MongoDB", "Express",
  "Flask", "Scikit-learn", "JavaScript", "TypeScript", "NumPy", "Pandas",
  "Keras", "JWT", "OAuth", "Vercel", "Postman", "Git / GitHub",
  "VS Code", "Jupyter Notebook", "Java", "C", "HTML5", "CSS3",
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
   DEVICON IMG  — FIXED: correct default param syntax
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
   MARQUEE — continuous RTL ticker with devicons
═══════════════════════════════════════════════════════ */
function Marquee({ speed = 32 }) {
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS]; // duplicate for seamless loop
  return (
    <div style={{
      overflow: "hidden",
      borderTop:    `1px solid ${C.border}`,
      borderBottom: `1px solid ${C.border}`,
      padding: "10px 0",
      background: C.surface,
      position: "relative",
    }}>
      {/* Fade edges */}
      <div style={{
        position:"absolute", left:0, top:0, bottom:0, width:"80px",
        background:`linear-gradient(to right, ${C.surface}, transparent)`,
        zIndex:2, pointerEvents:"none",
      }}/>
      <div style={{
        position:"absolute", right:0, top:0, bottom:0, width:"80px",
        background:`linear-gradient(to left, ${C.surface}, transparent)`,
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
              opacity: 0.55,
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
                  style={{ display:"block", borderRadius:"2px" }}
                />
              )}
              <span style={{
                fontFamily: "'DM Mono',monospace",
                fontSize: "11px",
                fontWeight: 500,
                color: C.muted2,
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
   TECH TAG — RTL pop-in + devicon + hover tint
═══════════════════════════════════════════════════════ */
function Tag({ name, accent, visible, delay }) {
  const [hov, setHov] = useState(false);
  return (
    <span
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "5px",
        padding: "4px 9px 4px 6px",
        borderRadius: "5px",
        background:    hov ? `${accent}14` : C.surface,
        border:        `1px solid ${hov ? `${accent}38` : C.border}`,
        fontFamily:    "'DM Mono',monospace",
        fontSize:      "11px",
        color:         hov ? accent : C.muted2,
        cursor:        "default",
        userSelect:    "none",
        transition:    `background ${MS.fast} ${E}, border-color ${MS.fast} ${E}, color ${MS.fast} ${E}`,
        opacity:       visible ? 1 : 0,
        animation:     visible ? `_tagPop ${MS.slow} ${E} ${delay}s both` : "none",
      }}
    >
      <DI name={name} size={13} extraStyle={{ opacity: hov ? 1 : 0.65, transition: `opacity ${MS.fast} ${E}` }} />
      {name}
    </span>
  );
}

/* ═══════════════════════════════════════════════════════
   SIDE NAV — Unix dot indicators
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
              background: active === i ? C.accent : C.border2,
              borderRadius: "1px",
              transition: `all ${MS.slow} ${E}`,
            }}
          />
          <span style={{
            fontFamily: "'DM Mono',monospace",
            fontSize: "9px",
            fontWeight: 500,
            color: C.muted,
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
   MONO LABEL — Unix section identifier
═══════════════════════════════════════════════════════ */
function ML({ children, color = C.accent, style = {} }) {
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
   CURSOR BLINK — terminal aesthetic detail
═══════════════════════════════════════════════════════ */
function TermCursor() {
  return (
    <span style={{
      display: "inline-block",
      width: "8px",
      height: "1.1em",
      background: C.accent,
      marginLeft: "3px",
      verticalAlign: "middle",
      animation: "_blink 1.1s step-end infinite",
      borderRadius: "1px",
    }} />
  );
}

/* ═══════════════════════════════════════════════════════
   SECTION HEADER — RTL entry
═══════════════════════════════════════════════════════ */
function SH({ eyebrow, title, sub, visible, dark = false, delay = 0, cursor = false }) {
  const tc = dark ? "#fff" : C.text;
  const ec = dark ? "rgba(0,87,217,0.55)" : C.accent;
  return (
    <div style={{
      marginBottom: "2.5rem",
      opacity:   visible ? 1 : 0,
      animation: visible ? `_rtl ${MS.reveal} ${E} ${delay}s both` : "none",
    }}>
      <ML color={ec} style={{ marginBottom:"10px" }}>{eyebrow}</ML>
      <h2 style={{
        fontFamily: "'Cormorant',Georgia,serif",
        fontSize: "clamp(1.75rem,4vw,2.75rem)",
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
          color: dark ? "rgba(255,255,255,0.42)" : C.muted,
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
   CAPABILITY ROW — alternating RTL / LTR per row
═══════════════════════════════════════════════════════ */
function CapRow({ cap, visible, delay, ri }) {
  const [hov, setHov] = useState(false);
  const even = ri % 2 === 0;
  const la = even ? "_ltr" : "_rtl";
  const ra = even ? "_rtl" : "_ltr";
  const abg =
    cap.accent === C.accent   ? "rgba(0,87,217,0.04)"   :
    cap.accent === C.green    ? "rgba(4,120,87,0.04)"   :
    cap.accent === "#7c3aed"  ? "rgba(124,58,237,0.04)" :
    "rgba(71,85,105,0.04)";

  return (
    <div
      className="cap-grid"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 0,
        borderBottom: `1px solid ${C.border}`,
        background: hov ? abg : "transparent",
        transition: `background ${MS.fast} ${E}, transform ${MS.base} ${E}`,
        transform: hov ? "translateY(-2px)" : "translateY(0)",
      }}
    >
      {/* LEFT */}
      <div style={{
        padding: "2.25rem 2.5rem",
        borderRight: `1px solid ${hov ? C.border2 : C.border}`,
        transition: `border-color ${MS.fast} ${E}`,
        position: "relative",
        opacity: visible ? 1 : 0,
        animation: visible ? `${la} ${MS.reveal} ${E} ${delay}s both` : "none",
      }}>
        {/* Accent bar — scaleY entry */}
        <div style={{
          position: "absolute", left: 0, top:"18px", bottom:"18px",
          width: "2px",
          background: cap.accent,
          borderRadius: "0 2px 2px 0",
          transformOrigin: "top",
          transform: visible ? "scaleY(1)" : "scaleY(0)",
          transition: `transform ${MS.slow} ${E} ${delay+0.18}s`,
        }}/>
        {/* Number + expanding line */}
        <div style={{ display:"flex", alignItems:"center", gap:"10px", marginBottom:"16px" }}>
          <ML color={cap.accent}>{cap.number}</ML>
          <div style={{
            height: "1px", width:"20px",
            background: cap.accent,
            transformOrigin: "left",
            transform: visible ? "scaleX(1)" : "scaleX(0)",
            transition: `transform ${MS.base} ${E} ${delay+0.24}s`,
          }}/>
        </div>
        <h3 style={{
          fontFamily: "'Cormorant',Georgia,serif",
          fontSize: "1.65rem", fontWeight: 700,
          color: C.text, lineHeight: 1.1,
          letterSpacing: "-0.025em", marginBottom: "12px",
        }}>
          {cap.domain}
        </h3>
        <p style={{ fontSize:"14px", color:C.muted2, lineHeight:1.75, maxWidth:"400px" }}>
          {cap.outcome}
        </p>
        {/* Metric counter */}
        <div style={{
          marginTop: "24px",
          opacity: visible ? 1 : 0,
          animation: visible ? `_countUp ${MS.slow} ${E} ${delay+0.32}s both` : "none",
        }}>
          <div style={{
            fontFamily: "'Cormorant',Georgia,serif",
            fontSize: "2.6rem", fontWeight: 700,
            color: hov ? cap.accent : C.text,
            lineHeight: 1, letterSpacing: "-0.03em",
            transition: `color ${MS.base} ${E}`,
          }}>
            <Counter value={cap.metric.value} suffix={cap.metric.suffix} triggered={visible}/>
          </div>
          <div style={{
            fontFamily: "'DM Mono',monospace",
            fontSize: "10px", color: C.muted,
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
        {/* Tech tag rows */}
        <div style={{ marginBottom:"22px" }}>
          {Object.entries(cap.tech).map(([cat, items], ci) => (
            <div key={cat} style={{
              marginBottom: "12px",
              display: "flex",
              gap: "10px",
              alignItems: "baseline",
              flexWrap: "wrap",
            }}>
              <ML color={cap.accent} style={{ minWidth:"84px", flexShrink:0, paddingTop:"2px" }}>
                {cat}
              </ML>
              <div style={{ display:"flex", flexWrap:"wrap", gap:"5px" }}>
                {items.map((t, ti) => (
                  <Tag
                    key={t}
                    name={t}
                    accent={cap.accent}
                    visible={visible}
                    delay={delay + 0.14 + ci * 0.07 + ti * 0.035}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
        {/* Proof bullets — RTL stagger */}
        <div style={{ display:"flex", flexDirection:"column", gap:"8px", marginBottom:"20px" }}>
          {cap.proof.map((p, pi) => (
            <div key={p.name} style={{
              display: "flex", gap:"10px", alignItems:"flex-start",
              opacity: visible ? 1 : 0,
              animation: visible ? `_rtl ${MS.slow} ${E} ${delay+0.30+pi*0.07}s both` : "none",
            }}>
              <div style={{
                width:"3px", height:"3px", borderRadius:"50%",
                background: hov ? cap.accent : C.border2,
                flexShrink:0, marginTop:"7px",
                transition:`background ${MS.fast} ${E}`,
              }}/>
              <div>
                <span style={{ fontSize:"13px", fontWeight:500, color:C.text }}>{p.name}</span>
                <span style={{ fontSize:"12px", color:C.muted, marginLeft:"8px" }}>— {p.detail}</span>
              </div>
            </div>
          ))}
        </div>
        {/* Context footer */}
        <div style={{
          paddingTop:"14px",
          borderTop:`1px solid ${C.border}`,
          display:"flex", gap:"8px", alignItems:"center",
        }}>
          <span style={{ fontFamily:"'DM Mono',monospace", fontSize:"11px", color:C.muted }}>
            {cap.period}
          </span>
          <span style={{ fontSize:"11px", color:C.muted, opacity:0.35 }}>·</span>
          <span style={{ fontSize:"11px", color:C.muted }}>{cap.context}</span>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   METRIC CARD
═══════════════════════════════════════════════════════ */
function MetCard({ value, suffix, label, sub, triggered, delay }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        padding: "2rem 1.5rem",
        background: C.white,
        transform: hov ? "scale(1.016)" : "scale(1)",
        transition: `transform ${MS.fast} ${E}`,
        opacity: triggered ? 1 : 0,
        animation: triggered ? `_up 300ms ${E} ${delay}s both` : "none",
      }}
    >
      <div style={{
        fontFamily: "'Cormorant',Georgia,serif",
        fontSize: "2.75rem", fontWeight: 700,
        color: hov ? C.accent : C.text,
        lineHeight: 1, letterSpacing: "-0.03em", marginBottom: "6px",
        transition: `color ${MS.base} ${E}`,
      }}>
        <Counter value={value} suffix={suffix} triggered={triggered}/>
      </div>
      <div style={{ fontSize:"13.5px", fontWeight:500, color:C.text, marginBottom:"4px" }}>{label}</div>
      <div style={{
        fontSize: "11.5px", color: C.muted, lineHeight: 1.5,
        opacity: hov ? 0.9 : 0.52,
        transition: `opacity ${MS.fast} ${E}`,
      }}>
        {sub}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   TRAJECTORY CARD — RTL + scaleY side line
═══════════════════════════════════════════════════════ */
function TrajCard({ item, visible, delay }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        padding: "1.75rem",
        background: C.white,
        border: `1px solid ${hov ? C.border2 : C.border}`,
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
        width: "2px", background: C.accent,
        borderRadius: "0 2px 2px 0", transformOrigin: "top",
        transform: visible ? "scaleY(1)" : "scaleY(0)",
        transition: `transform ${MS.slow} ${E} ${delay+0.15}s`,
      }}/>
      <div style={{ paddingLeft:"12px" }}>
        <div style={{ fontSize:"1.35rem", marginBottom:"10px" }}>{item.icon}</div>
        <h3 style={{
          fontFamily: "'DM Mono',monospace",
          fontSize:"13px", fontWeight:600,
          color:C.text, marginBottom:"8px",
        }}>
          {item.area}
        </h3>
        <p style={{ fontSize:"12.5px", color:C.muted, lineHeight:1.65 }}>{item.detail}</p>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   PHILOSOPHY CARD — alternating RTL / LTR
═══════════════════════════════════════════════════════ */
function PhilCard({ item, visible, delay, idx }) {
  const dir = idx % 2 === 0 ? "_rtl" : "_ltr";
  return (
    <div style={{
      padding: "2rem 2.5rem",
      background: "rgba(255,255,255,0.025)",
      opacity: visible ? 1 : 0,
      animation: visible ? `${dir} ${MS.reveal} ${E} ${delay}s both` : "none",
    }}>
      <div style={{ display:"flex", alignItems:"flex-start", gap:"12px", marginBottom:"14px" }}>
        <div style={{ flexShrink:0, paddingTop:"2px" }}>
          <ML color="rgba(0,87,217,0.55)" style={{ marginBottom:"4px" }}>{item.n}</ML>
          <div style={{
            height:"1px", background:"rgba(0,87,217,0.3)",
            transformOrigin:"left",
            transform: visible ? "scaleX(1)" : "scaleX(0)",
            transition: `transform ${MS.slow} ${E} ${delay+0.2}s`,
          }}/>
        </div>
        <h3 style={{
          fontFamily: "'Cormorant',Georgia,serif",
          fontSize:"1.3rem", fontWeight:600,
          color:"#fff", lineHeight:1.2, letterSpacing:"-0.02em",
        }}>
          {item.statement}
        </h3>
      </div>
      <p style={{
        fontSize:"13px", color:"rgba(255,255,255,0.4)",
        lineHeight:1.7, paddingLeft:"28px",
      }}>
        {item.elaboration}
      </p>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   TOOL CARD — RTL entry, devicon, translateX hover
═══════════════════════════════════════════════════════ */
function ToolCard({ tool, visible, delay }) {
  const [hov, setHov] = useState(false);
  const lc = tool.level==="Daily" ? C.accent : tool.level==="Regular" ? C.green : "#475569";
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "11px 14px",
        background: C.white,
        border: `1px solid ${hov ? C.border2 : C.border}`,
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
          background:lc, flexShrink:0,
        }}/>
        <DI
          name={tool.name}
          size={16}
          extraStyle={{ opacity: hov ? 1 : 0.62, transition:`opacity ${MS.fast} ${E}` }}
        />
        <span style={{
          fontFamily:"'DM Mono',monospace",
          fontSize:"12px", fontWeight:500, color:C.text,
        }}>
          {tool.name}
        </span>
      </div>
      <span style={{
        fontFamily:"'DM Mono',monospace",
        fontSize:"10px", color:C.muted,
        opacity: hov ? 1 : 0.5,
        transition: `opacity ${MS.fast} ${E}`,
      }}>
        {tool.cat}
      </span>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   FOOTER CTA
═══════════════════════════════════════════════════════ */
function FooterCTA({ label, sub, href, accent, visible, delay }) {
  const [hov, setHov] = useState(false);
  const [press, setPress] = useState(false);
  return (
    <a
      href={href}
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
          ? (hov ? "rgba(0,87,217,0.15)" : "rgba(0,87,217,0.10)")
          : (hov ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.03)"),
        border: `1px solid ${accent
          ? (hov ? "rgba(0,87,217,0.4)" : "rgba(0,87,217,0.25)")
          : (hov ? "rgba(255,255,255,0.14)" : "rgba(255,255,255,0.07)")}`,
        transition: `background ${MS.fast} ${E}, border-color ${MS.fast} ${E}`,
        opacity: visible ? 1 : 0,
        transform: visible ? (press ? "scale(0.98)" : "translateY(0)") : "translateY(10px)",
        animation: visible ? `_up ${MS.slow} ${E} ${delay}s both` : "none",
      }}
    >
      <div>
        <ML color="rgba(255,255,255,0.25)" style={{ marginBottom:"4px" }}>{sub}</ML>
        <div style={{ fontSize:"14px", fontWeight:500, color:"#fff" }}>{label}</div>
      </div>
      {/* Arrow — translates right on hover (horizontal only) */}
      <svg
        width="14" height="14" viewBox="0 0 24 24" fill="none"
        stroke={accent ? C.accent : "rgba(255,255,255,0.3)"}
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
      <SideNav active={activeSection} />

      {/* Subtle grid texture — composited layer */}
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

        {/* ─────────────────── HERO ─────────────────── */}
        <header ref={hR} style={SP("8rem","5rem")}>
          <div style={W}>
            {/* Eyebrow — RTL */}
            <div style={{
              display:"flex", alignItems:"center", gap:"12px", marginBottom:"2rem",
              opacity: hV ? 1 : 0,
              animation: hV ? `_rtl ${MS.slow} ${E} 0.05s both` : "none",
            }}>
              <div style={{ width:"20px", height:"1px", background:C.accent }}/>
              <ML>Technical Profile · B.Tech AIDS · 2026</ML>
              <TermCursor />
            </div>

            {/* Headline — RTL */}
            <h1 style={{
              fontFamily:"'Cormorant',Georgia,serif",
              fontSize:"clamp(2.75rem,6.5vw,5.25rem)", fontWeight:700,
              color:C.text, lineHeight:1.03, letterSpacing:"-0.03em",
              marginBottom:"1.5rem", maxWidth:"820px",
              opacity: hV ? 1 : 0,
              animation: hV ? `_rtl ${MS.reveal} ${E} 0.12s both` : "none",
            }}>
              Engineering Systems<br/>That Scale
            </h1>

            {/* Sub — RTL */}
            <p style={{
              fontSize:"1rem", color:C.muted2, lineHeight:1.75,
              maxWidth:"580px", marginBottom:"3rem",
              opacity: hV ? 1 : 0,
              animation: hV ? `_rtl ${MS.reveal} ${E} 0.20s both` : "none",
            }}>
              End-to-end platforms integrating application logic, data systems, and ML pipelines — with production context and measurable outcomes.
            </p>

            {/* Pillars with devicons — scale-in */}
            <div className="hpillars" style={{
              display:"grid", gridTemplateColumns:"repeat(3,1fr)",
              gap:"1px", background:C.border,
              borderRadius:"12px", overflow:"hidden",
              opacity: hV ? 1 : 0,
              animation: hV ? `_si ${MS.slow} ${E} 0.28s both` : "none",
            }}>
              {[
                { label:"Systems Thinking",    desc:"Architecture before implementation", icons:["React","Node.js","MongoDB"] },
                { label:"Applied AI",          desc:"ML pipelines in real applications",  icons:["Python","TensorFlow","Keras"] },
                { label:"Production Delivery", desc:"Shipped, deployed, tested",          icons:["Git / GitHub","Vercel","Postman"] },
              ].map((p, i) => (
                <div key={i} style={{ padding:"1.75rem 1.5rem", background:C.bg }}>
                  <div style={{ display:"flex", alignItems:"center", gap:"8px", marginBottom:"8px" }}>
                    <div style={{ width:"4px", height:"4px", borderRadius:"50%", background:C.accent }}/>
                    <span style={{ fontSize:"13.5px", fontWeight:600, color:C.text }}>{p.label}</span>
                  </div>
                  <p style={{ fontSize:"12px", color:C.muted, lineHeight:1.6, marginBottom:"12px" }}>{p.desc}</p>
                  {/* Icon row — RTL stagger */}
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
                          display:"block", borderRadius:"2px", opacity: 0.6,
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

        {/* ─── MARQUEE TICKER (continuous RTL) ─── */}
        <Marquee speed={34} />

        {/* ─────────────────── OVERVIEW ─────────────────── */}
        <section ref={oR} style={SP("4rem","5rem")}>
          <div style={W}>
            <div style={{
              padding:"2.5rem 3rem", borderRadius:"14px",
              border:`1px solid ${C.accentLine}`, background:C.accentSub,
              opacity: oV ? 1 : 0,
              animation: oV ? `_rtl ${MS.reveal} ${E} 0.05s both` : "none",
            }}>
              <div className="ovgrid" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"3rem", alignItems:"center" }}>
                <div>
                  <ML style={{ marginBottom:"14px" }}>Primary Strength</ML>
                  <h2 style={{
                    fontFamily:"'Cormorant',Georgia,serif",
                    fontSize:"2rem", fontWeight:700,
                    color:C.text, letterSpacing:"-0.025em", lineHeight:1.1, marginBottom:"12px",
                  }}>
                    Full-Stack × AI Integration
                  </h2>
                  <p style={{ fontSize:"14px", color:C.muted2, lineHeight:1.75 }}>
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
                      background:"rgba(255,255,255,0.58)", border:`1px solid ${C.border}`,
                    }}>
                      <div style={{ display:"flex", alignItems:"center", gap:"8px" }}>
                        {x.icons.map(ic => (
                          <img key={ic} src={ICONS[ic]} alt={ic} className="di" width={16} height={16}
                            loading="lazy" style={{ display:"block", borderRadius:"2px" }} />
                        ))}
                        <span style={{
                          fontFamily:"'DM Mono',monospace", fontSize:"12px", fontWeight:500, color:C.text,
                        }}>
                          {x.pair}
                        </span>
                      </div>
                      <span style={{ fontSize:"11.5px", color:C.muted }}>{x.note}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─────────────────── CAPABILITIES ─────────────────── */}
        <section ref={cR} style={{ borderTop:`1px solid ${C.border}`, borderBottom:`1px solid ${C.border}` }}>
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
        <section ref={mR} style={{ ...SP(), background:C.surface }}>
          <div style={W}>
            <SH eyebrow="Section 03" title="Impact Metrics" visible={mV}/>
            <div style={{
              display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(190px,1fr))",
              gap:"1px", background:C.border,
              border:`1px solid ${C.border}`, borderRadius:"12px", overflow:"hidden",
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
        <section ref={pR} style={{ ...SP(), background:C.ink, position:"relative", overflow:"hidden" }}>
          <div aria-hidden="true" style={{
            position:"absolute", left:"-8%", bottom:"-25%",
            width:"480px", height:"480px", borderRadius:"50%",
            background:"radial-gradient(circle, rgba(0,87,217,0.07), transparent 70%)",
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
              gap:"1px", background:"rgba(255,255,255,0.042)",
              border:"1px solid rgba(255,255,255,0.065)",
              borderRadius:"12px", overflow:"hidden",
            }}>
              {philosophy.map((p, i) => (
                <PhilCard key={i} item={p} visible={pV} delay={i * 0.08} idx={i}/>
              ))}
            </div>
          </div>
        </section>

        {/* ─────────────────── TOOLING ─────────────────── */}
        <section ref={tR} style={{ ...SP(), borderTop:`1px solid ${C.border}` }}>
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
                { label:"Daily",      c:C.accent },
                { label:"Regular",    c:C.green },
                { label:"Occasional", c:"#475569" },
              ].map(x => (
                <div key={x.label} style={{ display:"flex", alignItems:"center", gap:"6px" }}>
                  <div style={{ width:"6px", height:"6px", borderRadius:"50%", background:x.c }}/>
                  <span style={{ fontFamily:"'DM Mono',monospace", fontSize:"11px", color:C.muted2, fontWeight:500 }}>
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
        <section ref={trR} style={{ ...SP(), background:C.surface, borderTop:`1px solid ${C.border}` }}>
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
        <footer ref={fR} style={{ background:C.ink, position:"relative", overflow:"hidden" }}>
          {/* Wave */}
          <div style={{ position:"relative", height:"56px", background:C.surface, overflow:"hidden" }}>
            <svg viewBox="0 0 1440 56" preserveAspectRatio="none"
              style={{ position:"absolute", bottom:0, left:0, width:"100%", height:"100%" }}>
              <path d="M0,0 C360,56 720,0 1080,28 C1260,42 1380,14 1440,28 L1440,56 L0,56 Z" fill={C.ink}/>
            </svg>
          </div>

          {/* Grid + radial */}
          <div aria-hidden="true" style={{
            position:"absolute", inset:0, zIndex:0, pointerEvents:"none",
            backgroundImage:[
              "linear-gradient(rgba(0,87,217,0.028) 1px, transparent 1px)",
              "linear-gradient(90deg, rgba(0,87,217,0.028) 1px, transparent 1px)",
            ].join(","),
            backgroundSize:"48px 48px",
          }}/>
          <div aria-hidden="true" style={{
            position:"absolute", left:"-5%", top:"15%",
            width:"420px", height:"420px", borderRadius:"50%",
            background:"radial-gradient(circle, rgba(0,87,217,0.06), transparent 70%)",
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
                    background:"rgba(4,120,87,0.09)", border:"1px solid rgba(4,120,87,0.22)",
                    marginBottom:"20px",
                    opacity: fV ? 1 : 0,
                    animation: fV ? `_rtl ${MS.slow} ${E} 0.05s both` : "none",
                  }}>
                    <div style={{
                      width:"5px", height:"5px", borderRadius:"50%", background:C.green,
                      animation:"_pulse 2.2s ease-in-out infinite",
                    }}/>
                    <ML color={C.green}>Open to Opportunities · 2026</ML>
                  </div>

                  <h2 style={{
                    fontFamily:"'Cormorant',Georgia,serif",
                    fontSize:"clamp(2.25rem,5vw,4.25rem)", fontWeight:700,
                    color:"#fff", lineHeight:1.04, letterSpacing:"-0.03em", marginBottom:"14px",
                    opacity: fV ? 1 : 0,
                    animation: fV ? `_rtl ${MS.reveal} ${E} 0.12s both` : "none",
                  }}>
                    Let's Build Something<br/>Inevitable
                  </h2>

                  <p style={{
                    fontSize:"15px", color:"rgba(255,255,255,0.38)",
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
                  fontFamily:"'Cormorant',Georgia,serif",
                  fontSize:"1.4rem", fontWeight:700, color:"#fff",
                  letterSpacing:"-0.03em", marginBottom:"10px",
                }}>
                  Bhagavan<span style={{ color:C.accent }}>.</span>
                </div>
                <p style={{
                  fontSize:"12.5px", color:"rgba(255,255,255,0.32)",
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
                      target={s.h.startsWith("http") ? "_blank" : undefined}
                      rel={s.h.startsWith("http") ? "noopener noreferrer" : undefined}
                      style={{
                        width:"32px", height:"32px", borderRadius:"7px",
                        background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.07)",
                        display:"flex", alignItems:"center", justifyContent:"center",
                        fontFamily:"'DM Mono',monospace",
                        color:"rgba(255,255,255,0.3)", textDecoration:"none", fontSize:"11px",
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
                    display:"block", fontSize:"13px", color:"rgba(255,255,255,0.38)",
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
                    display:"block", fontSize:"13px", color:"rgba(255,255,255,0.38)",
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
                  { lb:"Status",   v:"Available · Immediate", g:true },
                ].map((c, i) => (
                  <div key={i} style={{ marginBottom:"14px" }}>
                    <ML color="rgba(255,255,255,0.2)" style={{ fontSize:"9px", marginBottom:"3px" }}>{c.lb}</ML>
                    <div style={{ fontSize:"12.5px", color: c.g ? C.green : "rgba(255,255,255,0.45)" }}>
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
                color:"rgba(255,255,255,0.2)",
              }}>
                © 2026 Siva Satya Sai Bhagavan
              </div>
              <div style={{ display:"flex", gap:"20px" }}>
                {["Privacy","Terms","Sitemap"].map(l => (
                  <a key={l} href="#" style={{
                    fontFamily:"'DM Mono',monospace", fontSize:"11px",
                    color:"rgba(255,255,255,0.2)", textDecoration:"none",
                  }}>
                    {l}
                  </a>
                ))}
              </div>
              <div style={{ display:"flex", alignItems:"center", gap:"6px" }}>
                <div style={{
                  width:"5px", height:"5px", borderRadius:"50%", background:C.green,
                  animation:"_pulse 2.2s ease-in-out infinite",
                }}/>
                <span style={{
                  fontFamily:"'DM Mono',monospace", fontSize:"11px", color:C.green,
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