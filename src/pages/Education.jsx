"use client";

import React, { useState, useEffect, useRef } from "react";
import { MapPin, CheckCircle2, ArrowUpRight } from "lucide-react";

/* ═══════════════════════════════════════════════════════════════
   DESIGN TOKENS
═══════════════════════════════════════════════════════════════ */
const C = {
  bg:        "#f8f8f7",
  surface:   "#f2f2f0",
  white:     "#ffffff",
  border:    "rgba(0,0,0,0.065)",
  border2:   "rgba(0,0,0,0.12)",
  text:      "#0c0c0c",
  muted:     "#6e6e78",
  muted2:    "#4a4a52",
  accent:    "#0057d9",
  accentSub: "rgba(0,87,217,0.045)",
  green:     "#047857",
  greenSub:  "rgba(4,120,87,0.045)",
  purple:    "#6d28d9",
  purpleSub: "rgba(109,40,217,0.045)",
};

const E = "cubic-bezier(0.16, 1, 0.3, 1)";

/* ═══════════════════════════════════════════════════════════════
   DEVICON CDN MAP
═══════════════════════════════════════════════════════════════ */
const IB = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons";
const ICONS = {
  "Python":          `${IB}/python/python-original.svg`,
  "JavaScript":      `${IB}/javascript/javascript-original.svg`,
  "React":           `${IB}/react/react-original.svg`,
  "Node.js":         `${IB}/nodejs/nodejs-original.svg`,
  "Express.js":      `${IB}/express/express-original.svg`,
  "MongoDB":         `${IB}/mongodb/mongodb-original.svg`,
  "Flask":           `${IB}/flask/flask-original.svg`,
  "TensorFlow":      `${IB}/tensorflow/tensorflow-original.svg`,
  "Keras":           `${IB}/keras/keras-original.svg`,
  "Scikit-learn":    `${IB}/scikitlearn/scikitlearn-original.svg`,
  "OpenCV":          `${IB}/opencv/opencv-original.svg`,
  "NumPy":           `${IB}/numpy/numpy-original.svg`,
  "Pandas":          `${IB}/pandas/pandas-original.svg`,
  "Matplotlib":      `${IB}/matplotlib/matplotlib-original.svg`,
  "NLTK":            `${IB}/python/python-plain.svg`,
  "Jupyter":         `${IB}/jupyter/jupyter-original.svg`,
  "Git":             `${IB}/git/git-original.svg`,
  "Docker":          `${IB}/docker/docker-original.svg`,
  "AWS":             `${IB}/amazonwebservices/amazonwebservices-original-wordmark.svg`,
  "MySQL":           `${IB}/mysql/mysql-original.svg`,
  "PostgreSQL":      `${IB}/postgresql/postgresql-original.svg`,
  "VSCode":          `${IB}/vscode/vscode-original.svg`,
  "HTML":            `${IB}/html5/html5-original.svg`,
  "CSS":             `${IB}/css3/css3-original.svg`,
};

const TICKER = [
  "Python","JavaScript","React","Node.js","TensorFlow","MongoDB","Flask",
  "Scikit-learn","Pandas","NumPy","OpenCV","Git","Docker","AWS",
  "Jupyter","MySQL","Keras","Matplotlib","NLTK","Express.js",
];

/* ═══════════════════════════════════════════════════════════════
   GLOBAL CSS  — identical to Internships.jsx, zero changes
═══════════════════════════════════════════════════════════════ */
const GLOBAL = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant:wght@500;600;700&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&family=DM+Mono:wght@400;500&display=swap');

  *, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }
  html { scroll-behavior:smooth; overflow-x:hidden; }
  body {
    font-family:'DM Sans', system-ui, sans-serif;
    background:${C.bg}; color:${C.text};
    -webkit-font-smoothing:antialiased;
    overflow-x:hidden;
    cursor: none;
  }
  ::selection { background:rgba(0,87,217,0.12); }
  ::-webkit-scrollbar { width:2px; }
  ::-webkit-scrollbar-track { background:transparent; }
  ::-webkit-scrollbar-thumb { background:rgba(0,87,217,0.22); border-radius:2px; }

  #mc-dot {
    position:fixed; top:0; left:0;
    width:10px; height:10px;
    background:${C.accent};
    border-radius:50%;
    pointer-events:none;
    z-index:99999;
    transform:translate(-50%,-50%);
    will-change:transform;
    transition:width 180ms ${E}, height 180ms ${E}, background 180ms ${E}, opacity 150ms linear;
    mix-blend-mode:multiply;
  }
  #mc-dot.hov { width:44px; height:44px; background:rgba(0,87,217,0.1); border:1.5px solid ${C.accent}; }
  #mc-dot.out { opacity:0; }

  #mc-ring {
    position:fixed; top:0; left:0;
    width:34px; height:34px;
    border:1px solid rgba(0,87,217,0.28);
    border-radius:50%;
    pointer-events:none;
    z-index:99998;
    transform:translate(-50%,-50%);
    will-change:transform;
    transition:opacity 150ms linear;
  }
  #mc-ring.out { opacity:0; }

  @media (max-width:768px) {
    body { cursor:auto; }
    #mc-dot, #mc-ring { display:none !important; }
    a, button, [role="button"] { cursor:auto !important; }
  }
  @media (min-width:769px) {
    a, button, [role="button"] { cursor:none !important; }
  }

  @keyframes _rtl  { from{opacity:0;transform:translateX(48px);}  to{opacity:1;transform:translateX(0);} }
  @keyframes _ltr  { from{opacity:0;transform:translateX(-48px);} to{opacity:1;transform:translateX(0);} }
  @keyframes _marquee { from{transform:translateX(0);} to{transform:translateX(-50%);} }
  @keyframes _tagPop  { from{opacity:0;transform:translateX(14px) scale(0.92);} to{opacity:1;transform:translateX(0) scale(1);} }
  @keyframes _iconIn  { from{opacity:0;transform:translateX(10px) scale(0.78);} to{opacity:1;transform:translateX(0) scale(1);} }
  @keyframes _pulse   { 0%,100%{opacity:0.3;transform:scale(1);} 50%{opacity:1;transform:scale(1.35);} }
  @keyframes _blink   { 0%,100%{opacity:1;} 50%{opacity:0;} }
  @keyframes _fadeSlide { from{opacity:0;transform:translateY(12px);} to{opacity:1;transform:translateY(0);} }
  @keyframes _slideIn { from{transform:scaleX(0);transform-origin:left;} to{transform:scaleX(1);transform-origin:left;} }

  .di { transition:transform 130ms ${E}, filter 130ms ${E}; }
  .di:hover { transform:scale(1.25) rotate(-6deg); filter:drop-shadow(0 2px 6px rgba(0,0,0,0.18)); }

  button:focus-visible, a:focus-visible { outline:2px solid ${C.accent}; outline-offset:2px; }

  @media (prefers-reduced-motion:reduce) {
    *, *::before, *::after { animation-duration:0.01ms !important; transition-duration:0.01ms !important; }
    .mqinner { animation:none !important; }
  }

  @media (max-width:1024px) { .edu-grid { grid-template-columns:1fr !important; } }
  @media (max-width:768px) {
    .snav { display:none !important; }
    .edu-grid { grid-template-columns:1fr !important; gap:1.75rem !important; }
    .stats-row { grid-template-columns:repeat(2,1fr) !important; gap:1rem !important; }
    .sum-grid  { grid-template-columns:1fr 1fr !important; gap:0.65rem !important; }
    .foot-row  { flex-direction:column !important; align-items:flex-start !important; }
    .cert-thumb { display:none !important; }
    .foot-links { gap:0.5rem !important; }
  }
  @media (max-width:420px) {
    .stats-row { grid-template-columns:repeat(2,1fr) !important; }
    .sum-grid  { grid-template-columns:1fr !important; }
  }
`;

/* ═══════════════════════════════════════════════════════════════
   DATA — Education (same shape as EXP in Internships.jsx)
═══════════════════════════════════════════════════════════════ */
const EDU = [
  {
    id: 1,
    year: "2026",
    role: "B.Tech in Artificial Intelligence & Data Science",
    company: "Ramachandra College of Engineering",
    period: "2022 – 2026",
    duration: "4 years",
    location: "Eluru, Andhra Pradesh",
    type: "AI & Data Science · JNTUK Affiliated",
    status: "current",
    accent: C.accent,
    accentSub: C.accentSub,
    certId: "1wxnzvsS3MA7xWSxuXKeIkS8GaQoG4Y1a",
    score: "7.9 CGPA",
    alignment: "Aligned to: Backend Engineering · AI-Integrated Systems · Full-Stack Development",
    summary:
      "Four-year programme in Applied AI and Data Science. Coursework spans statistical ML, deep learning architectures, NLP, and full-stack web engineering. Academic work reinforced through three industry internships, 8+ production deployments, and a national hackathon win.",
    impact: [
      { metric: "7.9",  label: "CGPA",               detail: "Consistent academic performance across all semesters" },
      { metric: "3",    label: "Industry Internships", detail: "MERN at StudyOwl · AI/ML at SmartBridge · DS at Blackbucks" },
      { metric: "8+",   label: "Projects Shipped",     detail: "Production apps — not academic prototypes" },
    ],
    contributions: [
      "Built ATS Resume Builder on MERN stack — keyword scoring engine compares resume tokens against job descriptions, achieving 90%+ ATS pass rate across 3 platforms",
      "Developed AI Chatbot with server-side API key isolation via Flask — rolling context window management and exponential backoff reduced 429 failures from 12% to under 3%",
      "Led hackathon team to 1st place nationally among 200+ teams — deployed a working solution in 24 hours, awarded ₹50,000 prize",
      "Applied TF-IDF vectorization pipeline for fake news classification using Passive Aggressive Classifier — achieved 92% accuracy on held-out test set",
      "Completed 20+ professional certifications from AWS, Google AI, IBM, and Microsoft — each applied directly in project work and internship deliverables",
    ],
    stack: {
      "Full-Stack":   ["React", "Node.js", "Express.js", "MongoDB"],
      "AI / ML":      ["TensorFlow", "Keras", "Scikit-learn", "Pandas", "NumPy"],
      "Data Science": ["Matplotlib", "NLTK", "Jupyter"],
      "Tools":        ["Git", "Docker", "AWS", "Flask"],
    },
  },
  {
    id: 2,
    year: "2022",
    role: "Intermediate — MPC Stream",
    company: "Srividhya Junior College",
    period: "2020 – 2022",
    duration: "2 years",
    location: "Gudivada, Andhra Pradesh",
    type: "Mathematics, Physics, Chemistry · Board of Intermediate Education, AP",
    status: "completed",
    accent: C.purple,
    accentSub: C.purpleSub,
    certId: "1N1K1j6QGrgNPNL2D9UmfJAL2PVSulhPJ",
    score: "7.8 CGPA",
    alignment: "Foundation for: ML optimization · Algorithm design · Computational modelling",
    summary:
      "Pre-engineering programme covering advanced Mathematics, Physics, and Chemistry. The quantitative rigour of this foundation directly underpins machine learning mathematics — linear algebra, calculus for gradient descent, probability theory, and algorithm complexity analysis.",
    impact: [
      { metric: "7.8",  label: "CGPA",             detail: "Strong performance across core science subjects" },
      { metric: "3",    label: "Core Sciences",     detail: "Maths · Physics · Chemistry — engineering-track stream" },
      { metric: "2",    label: "Years Foundation",  detail: "Rigorous quantitative base before engineering entry" },
    ],
    contributions: [
      "Mastered advanced calculus and linear algebra — direct mathematical foundation for gradient descent, backpropagation, and loss function optimization in ML",
      "Studied probability theory and statistics: the quantitative basis for Bayesian inference, classification loss functions, and model evaluation metrics",
      "Applied physics-based computational reasoning applicable to simulation, numerical methods, and scientific programming workflows",
      "Developed rigorous analytical problem-solving discipline that translates directly to algorithm design, debugging, and breaking down complex engineering problems",
      "Built strong examination performance under time constraints — a mental model that carries directly into live coding rounds and technical interviews",
    ],
    stack: {
      "Mathematics": ["HTML", "CSS"],
      "Sciences":    ["Python", "Jupyter"],
    },
  },
  {
    id: 3,
    year: "2020",
    role: "SSC — State Board Examination",
    company: "Montessori English Medium High School",
    period: "2019 – 2020",
    duration: "1 year",
    location: "Gudivada, Andhra Pradesh",
    type: "Secondary Education · Board of Secondary Education, AP",
    status: "completed",
    accent: C.green,
    accentSub: C.greenSub,
    certId: "1p1RXnVn9jySamu8OiIWF0WFhe7G6QxiL",
    score: "9.5 GPA",
    alignment: "Achievement: Top academic performance · 100/100 in Mathematics",
    summary:
      "Secondary education completed with distinction — 9.5 GPA across all subjects with a perfect 100/100 in Mathematics. This early quantitative aptitude was the starting point of the AI and engineering career direction.",
    impact: [
      { metric: "9.5",  label: "GPA",          detail: "Top academic performance — distinction across all subjects" },
      { metric: "100",  label: "Maths Score",   detail: "Perfect 100/100 — established early quantitative aptitude" },
      { metric: "1",    label: "Class Standing", detail: "Graduated at top of academic cohort" },
    ],
    contributions: [
      "Achieved perfect 100/100 in Mathematics — demonstrating early quantitative aptitude that shaped the decision to pursue engineering and AI",
      "Scored 9.5 GPA overall — highest academic performance across the full secondary curriculum in all core subjects",
      "Built strong English language foundation enabling clear technical documentation, structured communication, and professional code commenting",
      "Developed disciplined study habits and structured problem-solving approach that carried directly through to professional internship delivery",
      "Identified early interest in computational thinking and logical reasoning — the origin point of the AI/ML career path now being pursued",
    ],
    stack: {
      "Core Subjects": ["HTML", "CSS", "Python"],
      "Achievements":  ["Git", "VSCode"],
    },
  },
];

/* ═══════════════════════════════════════════════════════════════
   MAGNETIC CURSOR  — copy-pasted exactly from Internships.jsx
═══════════════════════════════════════════════════════════════ */
function MagneticCursor() {
  const dotRef  = useRef(null);
  const ringRef = useRef(null);
  const mouse   = useRef({ x: -200, y: -200 });
  const smooth  = useRef({ x: -200, y: -200 });
  const rafRef  = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined" || window.innerWidth <= 768) return;
    const dot  = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const move = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      dot.style.transform = `translate(${e.clientX}px,${e.clientY}px) translate(-50%,-50%)`;
    };
    const enter     = (e) => { if (e.target.closest("a, button, [role='button'], .card-hover")) dot.classList.add("hov"); };
    const leave     = (e) => { if (e.target.closest("a, button, [role='button'], .card-hover")) dot.classList.remove("hov"); };
    const bodyLeave = () => { dot.classList.add("out"); ring.classList.add("out"); };
    const bodyEnter = () => { dot.classList.remove("out"); ring.classList.remove("out"); };

    document.addEventListener("mousemove",  move,      { passive: true });
    document.addEventListener("mouseover",  enter);
    document.addEventListener("mouseout",   leave);
    document.addEventListener("mouseleave", bodyLeave);
    document.addEventListener("mouseenter", bodyEnter);

    const tick = () => {
      smooth.current.x += (mouse.current.x - smooth.current.x) * 0.10;
      smooth.current.y += (mouse.current.y - smooth.current.y) * 0.10;
      ring.style.transform = `translate(${smooth.current.x}px,${smooth.current.y}px) translate(-50%,-50%)`;
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      document.removeEventListener("mousemove",  move);
      document.removeEventListener("mouseover",  enter);
      document.removeEventListener("mouseout",   leave);
      document.removeEventListener("mouseleave", bodyLeave);
      document.removeEventListener("mouseenter", bodyEnter);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      <div id="mc-dot"  ref={dotRef}  />
      <div id="mc-ring" ref={ringRef} />
    </>
  );
}

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
   COUNTER — identical to Internships.jsx
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
   DEVICON
═══════════════════════════════════════════════════════════════ */
function DI({ name, size = 18, extraStyle = {} }) {
  const src = ICONS[name];
  if (!src) return null;
  return (
    <img src={src} alt={name} className="di" width={size} height={size} loading="lazy"
      style={{ display: "block", flexShrink: 0, borderRadius: "3px", ...extraStyle }} />
  );
}

/* ═══════════════════════════════════════════════════════════════
   MARQUEE — identical to Internships.jsx
═══════════════════════════════════════════════════════════════ */
function Marquee({ speed = 36 }) {
  const items = [...TICKER, ...TICKER];
  return (
    <div style={{
      overflow: "hidden", borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`,
      padding: "9px 0", background: C.surface, position: "relative",
    }}>
      {["left", "right"].map(s => (
        <div key={s} style={{
          position: "absolute", [s]: 0, top: 0, bottom: 0, width: "64px",
          background: `linear-gradient(to ${s === "left" ? "right" : "left"}, ${C.surface}, transparent)`,
          zIndex: 2, pointerEvents: "none",
        }} />
      ))}
      <div className="mqinner" style={{
        display: "flex", alignItems: "center", gap: "40px", width: "max-content",
        animation: `_marquee ${speed}s linear infinite`, willChange: "transform",
      }}>
        {items.map((name, i) => (
          <div key={`${name}-${i}`} style={{ display: "flex", alignItems: "center", gap: "9px", opacity: 0.52, flexShrink: 0 }}>
            {ICONS[name] && (
              <img src={ICONS[name]} alt={name} className="di" width={20} height={20} loading="lazy"
                style={{ display: "block", borderRadius: "3px" }} />
            )}
            <span style={{ fontFamily: "'DM Mono',monospace", fontSize: "13px", fontWeight: 500, color: C.muted2, letterSpacing: "0.04em", whiteSpace: "nowrap" }}>
              {name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SCROLL PROGRESS — identical to Internships.jsx
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
    window.addEventListener("scroll", fn, { passive: true });
    return () => { window.removeEventListener("scroll", fn); if (raf.current) cancelAnimationFrame(raf.current); };
  }, []);
  return (
    <div style={{ position: "fixed", top: 0, left: 0, right: 0, height: "2px", background: C.surface, zIndex: 9998 }}>
      <div style={{
        height: "100%", width: `${pct}%`,
        background: `linear-gradient(90deg, ${C.accent}, ${C.purple}, ${C.green})`,
        transition: "width 0.1s linear",
      }} />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SIDE NAV — same as Internships.jsx, keyed to EDU
═══════════════════════════════════════════════════════════════ */
function SideNav({ active }) {
  return (
    <nav className="snav" style={{
      position: "fixed", left: "1.25rem", top: "50%", transform: "translateY(-50%)",
      zIndex: 100, display: "flex", flexDirection: "column", gap: "14px",
    }}>
      {EDU.map((e, i) => (
        <button key={e.id}
          onClick={() => document.getElementById(`edu-${e.id}`)?.scrollIntoView({ behavior: "smooth" })}
          aria-label={`Jump to ${e.role}`}
          style={{ display: "flex", alignItems: "center", gap: "6px", background: "none", border: "none", cursor: "none", padding: 0 }}
        >
          <div style={{
            height: "1.5px", width: active === i ? "22px" : "10px",
            background: active === i ? e.accent : C.border2,
            borderRadius: "1px", transition: `all 320ms ${E}`,
          }} />
          <span style={{
            fontFamily: "'DM Mono',monospace", fontSize: "9px", fontWeight: 500, color: C.muted,
            opacity: active === i ? 1 : 0, transition: `opacity 320ms ${E}`,
          }}>{String(i + 1).padStart(2, "0")}</span>
        </button>
      ))}
    </nav>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MONO LABEL + TERM CURSOR — identical
═══════════════════════════════════════════════════════════════ */
function ML({ children, color = C.accent, style = {} }) {
  return (
    <span style={{
      display: "block", fontFamily: "'DM Mono',monospace", fontSize: "10px",
      fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase", color, ...style,
    }}>{children}</span>
  );
}

function TermCursor() {
  return (
    <span style={{
      display: "inline-block", width: "8px", height: "1.1em",
      background: C.accent, marginLeft: "3px", verticalAlign: "middle",
      animation: "_blink 1.1s step-end infinite", borderRadius: "1px",
    }} />
  );
}

/* ═══════════════════════════════════════════════════════════════
   TAG — identical to Internships.jsx
═══════════════════════════════════════════════════════════════ */
function Tag({ name, accent, visible, delay }) {
  const [h, sh] = useState(false);
  return (
    <span onMouseEnter={() => sh(true)} onMouseLeave={() => sh(false)} style={{
      display: "inline-flex", alignItems: "center", gap: "8px",
      padding: "7px 14px 7px 10px", borderRadius: "7px",
      background:  h ? `${accent}14` : C.surface,
      border:      `1px solid ${h ? `${accent}38` : C.border}`,
      fontFamily:  "'DM Mono',monospace", fontSize: "13px",
      color:       h ? accent : C.muted2,
      userSelect:  "none",
      transition:  `background 130ms ${E}, border-color 130ms ${E}, color 130ms ${E}`,
      opacity:     visible ? 1 : 0,
      animation:   visible ? `_tagPop 320ms ${E} ${delay}s both` : "none",
    }}>
      <DI name={name} size={18} extraStyle={{ opacity: h ? 1 : 0.65, transition: `opacity 130ms ${E}` }} />
      {name}
    </span>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAG BUTTON — identical to Internships.jsx
═══════════════════════════════════════════════════════════════ */
function MagBtn({ children, href, accent, extraStyle = {} }) {
  const [pos, sp] = useState({ x: 0, y: 0 });
  const [h, sh]   = useState(false);
  const ref = useRef(null);
  const mob = useMob();
  return (
    <a ref={ref} href={href} target="_blank" rel="noopener noreferrer"
      onMouseMove={(e) => {
        if (mob || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        sp({ x: (e.clientX - r.left - r.width / 2) * 0.22, y: (e.clientY - r.top - r.height / 2) * 0.22 });
      }}
      onMouseEnter={() => sh(true)}
      onMouseLeave={() => { sh(false); sp({ x: 0, y: 0 }); }}
      style={{
        display: "inline-flex", alignItems: "center", gap: "8px",
        padding: "10px 18px", minHeight: "44px",
        background: h ? `${accent}20` : `${accent}10`,
        border: `1px solid ${h ? `${accent}60` : `${accent}35`}`,
        borderRadius: "8px", fontSize: "13px", fontWeight: 600,
        color: accent, textDecoration: "none",
        fontFamily: "'DM Mono',monospace",
        transition: `all 190ms ${E}`,
        transform: mob ? "none" : `translate(${pos.x}px,${pos.y}px)`,
        ...extraStyle,
      }}
    >{children}</a>
  );
}

/* ═══════════════════════════════════════════════════════════════
   EDUCATION SECTION — mirrors ExpSection exactly
═══════════════════════════════════════════════════════════════ */
function EduSection({ data, ri, isLast }) {
  const [ref, vis] = useInView(0.07);
  const [tab, st]  = useState("contributions");
  const [tilt, tt] = useState({ x: 0, y: 0 });
  const mob  = useMob();
  const even = ri % 2 === 0;
  const driveUrl = `https://drive.google.com/file/d/${data.certId}/view`;

  return (
    <section id={`edu-${data.id}`} ref={ref} data-education style={{
      minHeight: mob ? "auto" : "100vh",
      display: "flex", alignItems: "center", position: "relative",
      padding: mob ? "3rem 0 3.5rem" : "8rem 0",
      borderBottom: isLast ? "none" : `1px solid ${C.border}`,
    }}>

      {/* Year watermark */}
      <div style={{
        position: "absolute",
        left: mob ? "-3%" : "-2%",
        top:  mob ? "2%"  : "16%",
        fontSize: mob ? "clamp(4.5rem,20vw,6.5rem)" : "clamp(10rem,18vw,20rem)",
        fontFamily: "'Cormorant',Georgia,serif", fontWeight: 700,
        color: data.accentSub, lineHeight: 1,
        userSelect: "none", pointerEvents: "none", opacity: 0.3,
      }}>{data.year}</div>

      {/* Glow */}
      <div style={{
        position: "absolute", left: "12%", top: "28%",
        width: mob ? "180px" : "420px", height: mob ? "180px" : "420px",
        borderRadius: "50%",
        background: `radial-gradient(circle, ${data.accent}${mob ? "07" : "10"} 0%, transparent 70%)`,
        filter: `blur(${mob ? 50 : 80}px)`, pointerEvents: "none",
      }} />

      <div style={{
        maxWidth: "1240px", margin: "0 auto",
        padding: mob ? "0 1rem" : "0 2rem",
        width: "100%",
      }}>
        <div className="edu-grid" style={{
          display: "grid",
          gridTemplateColumns: mob ? "1fr" : "1.45fr 0.85fr",
          gap: mob ? "1.75rem" : "4rem",
          alignItems: "start",
        }}>

          {/* ── LEFT ── */}
          <div style={{
            opacity: vis ? 1 : 0,
            animation: vis ? `${even ? "_ltr" : "_rtl"} 440ms ${E} 0.04s both` : "none",
          }}>
            <div style={{ marginBottom: mob ? "1rem" : "2rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
                <div style={{
                  width: "2px", height: mob ? "28px" : "34px", background: data.accent,
                  transformOrigin: "top",
                  transform: vis ? "scaleY(1)" : "scaleY(0)",
                  transition: `transform 320ms ${E} 0.2s`,
                }} />
                <div>
                  <ML color={data.accent} style={{ marginBottom: "2px" }}>
                    {data.period} · {data.duration}
                  </ML>
                  <span style={{ fontFamily: "'DM Mono',monospace", fontSize: "9px", color: C.muted, letterSpacing: "0.06em" }}>
                    {data.type}
                  </span>
                </div>
              </div>

              {/* Degree as "role" */}
              <h2 style={{
                fontFamily: "'Cormorant',Georgia,serif",
                fontSize: mob ? "clamp(1.7rem,7.5vw,2.3rem)" : "clamp(2.4rem,5vw,3.4rem)",
                fontWeight: 700, color: C.text,
                lineHeight: 1.08, letterSpacing: "-0.025em", marginBottom: "6px",
              }}>{data.role}</h2>

              {/* Institution as "company" */}
              <div style={{ fontSize: mob ? "0.95rem" : "1.15rem", fontWeight: 600, color: C.muted2, marginBottom: "7px" }}>
                {data.company}
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "12px", color: C.muted }}>
                <MapPin size={11} />{data.location}
              </div>

              {/* Status pill — only for current */}
              {data.status === "current" && (
                <div style={{
                  marginTop: "10px", display: "inline-flex", alignItems: "center", gap: "6px",
                  padding: "4px 10px", borderRadius: "5px",
                  background: `${data.accent}10`, border: `1px solid ${data.accent}30`,
                }}>
                  <div style={{
                    width: "5px", height: "5px", borderRadius: "50%", background: data.accent,
                    animation: "_pulse 2s ease-in-out infinite",
                  }} />
                  <span style={{
                    fontFamily: "'DM Mono',monospace", fontSize: "9px",
                    color: data.accent, letterSpacing: "0.08em", textTransform: "uppercase",
                  }}>Graduating 2026</span>
                </div>
              )}
            </div>

            {/* Animated underline */}
            <div style={{
              height: "2px", width: "80px", marginBottom: mob ? "1.1rem" : "2rem",
              background: `linear-gradient(90deg, ${data.accent}, transparent)`,
              borderRadius: "2px", transformOrigin: "left",
              transform: vis ? "scaleX(1)" : "scaleX(0)",
              transition: `transform 320ms ${E} 0.22s`,
            }} />

            {/* Alignment tag */}
            <div style={{ marginBottom: mob ? "1rem" : "1.5rem" }}>
              <span style={{
                fontFamily: "'DM Mono',monospace", fontSize: "11px", color: C.muted,
                padding: "5px 10px", borderRadius: "5px",
                background: C.surface, border: `1px solid ${C.border}`,
                display: "inline-block",
              }}>{data.alignment}</span>
            </div>

            {/* Summary */}
            <p style={{
              fontSize: mob ? "0.875rem" : "0.97rem",
              color: C.muted2, lineHeight: 1.72,
              marginBottom: mob ? "1.25rem" : "3rem",
              maxWidth: "100%",
            }}>{data.summary}</p>

            {/* Tabs */}
            <div style={{ marginBottom: mob ? "0.9rem" : "2rem" }}>
              <div style={{ display: "flex", gap: mob ? "1.25rem" : "2rem", borderBottom: `1px solid ${C.border}` }}>
                {["contributions", "stack"].map(t => (
                  <button key={t} onClick={() => st(t)} style={{
                    background: "none", border: "none",
                    padding: mob ? "0.55rem 0" : "0.75rem 0",
                    minHeight: "38px",
                    fontSize: mob ? "12.5px" : "13.5px", fontWeight: 600,
                    color: tab === t ? C.text : C.muted,
                    cursor: "none", textTransform: "capitalize",
                    transition: `color 190ms ${E}`, position: "relative",
                  }}>
                    {t}
                    {tab === t && (
                      <div style={{
                        position: "absolute", bottom: -1, left: 0, right: 0,
                        height: "2px", background: data.accent,
                        animation: `_slideIn 190ms ${E}`,
                      }} />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab content */}
            <div style={{ minHeight: mob ? "auto" : "250px" }}>
              {tab === "contributions" && (
                <ul style={{
                  listStyle: "none", display: "flex", flexDirection: "column",
                  gap: mob ? "0.7rem" : "1rem",
                  animation: `_fadeSlide 320ms ${E}`,
                }}>
                  {data.contributions.map((item, i) => (
                    <li key={i} style={{ display: "flex", gap: "0.8rem", alignItems: "flex-start" }}>
                      <div style={{
                        marginTop: "0.44rem", width: "4px", height: "4px", borderRadius: "50%",
                        background: data.accent, flexShrink: 0,
                        animation: vis ? `_iconIn 280ms ${E} ${0.1 + i * 0.06}s both` : "none",
                      }} />
                      <span style={{ fontSize: mob ? "13px" : "13.5px", color: C.muted2, lineHeight: 1.65 }}>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
              {tab === "stack" && (
                <div style={{
                  display: "flex", flexDirection: "column", gap: mob ? "1.1rem" : "1.75rem",
                  animation: `_fadeSlide 320ms ${E}`,
                }}>
                  {Object.entries(data.stack).map(([cat, items], ci) => (
                    <div key={cat}>
                      <ML color={data.accent} style={{ marginBottom: "10px" }}>{cat}</ML>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                        {items.map((t, ti) => (
                          <Tag key={t} name={t} accent={data.accent}
                            visible={tab === "stack"} delay={ci * 0.06 + ti * 0.035} />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Certificate button */}
            <div style={{ marginTop: mob ? "1.4rem" : "3rem" }}>
              <MagBtn href={driveUrl} accent={data.accent}
                extraStyle={mob ? { padding: "8px 13px", fontSize: "12px", minHeight: "38px" } : {}}>
                <CheckCircle2 size={13} />
                View 
              </MagBtn>
            </div>
          </div>

          {/* ── RIGHT — Impact Card (identical structure to Internships) ── */}
          <div
            className="card-hover"
            onMouseMove={(e) => {
              if (mob || !ref.current) return;
              const r = ref.current.getBoundingClientRect();
              tt({ x: ((e.clientY - r.top) / r.height - 0.5) * 1.5, y: -((e.clientX - r.left) / r.width - 0.5) * 1.5 });
            }}
            onMouseLeave={() => tt({ x: 0, y: 0 })}
            style={{
              opacity: vis ? 1 : 0,
              animation: vis ? `${even ? "_rtl" : "_ltr"} 440ms ${E} 0.10s both` : "none",
              position: mob ? "relative" : "sticky",
              top: mob ? "auto" : "6rem",
            }}
          >
            <div style={{
              position: "relative",
              padding: mob ? "1.1rem" : "2.5rem 2rem",
              background: C.white,
              border: `1px solid ${C.border}`,
              borderRadius: mob ? "14px" : "18px",
              boxShadow: "0 4px 16px rgba(0,0,0,0.04)",
              transform: mob ? "none" : `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
              transition: `transform 190ms ${E}`,
            }}>
              {/* Inner radial */}
              <div style={{
                position: "absolute", inset: 0, borderRadius: "inherit",
                background: `radial-gradient(circle at 50% 30%, ${data.accent}06 0%, transparent 65%)`,
                pointerEvents: "none",
              }} />
              {/* Top shimmer */}
              <div style={{
                position: "absolute", top: 0, left: "20%", right: "20%", height: "2px",
                background: `linear-gradient(90deg, transparent, ${data.accent}50, transparent)`,
                borderRadius: "0 0 2px 2px",
              }} />

              <ML color={C.muted} style={{ marginBottom: mob ? "0.9rem" : "2rem" }}>Academic Metrics</ML>

              <div style={{ display: "flex", flexDirection: "column", gap: mob ? "0.9rem" : "2rem" }}>
                {data.impact.map((item, i) => (
                  <div key={i} style={{
                    paddingBottom: i < data.impact.length - 1 ? (mob ? "0.9rem" : "2rem") : 0,
                    borderBottom:  i < data.impact.length - 1 ? `1px solid ${C.border}` : "none",
                    opacity: vis ? 1 : 0,
                    animation: vis ? `_rtl 320ms ${E} ${0.2 + i * 0.08}s both` : "none",
                  }}>
                    <div style={{
                      fontFamily: "'Cormorant',Georgia,serif",
                      fontSize: mob ? "2rem" : "3rem", fontWeight: 700,
                      color: data.accent, lineHeight: 1,
                      marginBottom: "4px", letterSpacing: "-0.02em",
                    }}>
                      <Counter value={item.metric} triggered={vis} />
                    </div>
                    <div style={{ fontSize: mob ? "12.5px" : "15px", fontWeight: 600, color: C.text, marginBottom: "2px" }}>{item.label}</div>
                    <div style={{ fontSize: mob ? "11px" : "12.5px", color: C.muted, lineHeight: 1.5 }}>{item.detail}</div>
                  </div>
                ))}
              </div>

              {/* Score strip */}
              <div style={{
                marginTop: mob ? "1rem" : "1.75rem",
                paddingTop: mob ? "0.9rem" : "1.5rem",
                borderTop: `1px solid ${C.border}`,
                display: "flex", alignItems: "center", justifyContent: "space-between",
              }}>
                <div>
                  <ML color={C.muted} style={{ marginBottom: "4px", fontSize: "9px" }}>Score</ML>
                  <div style={{
                    fontFamily: "'Cormorant',Georgia,serif",
                    fontSize: mob ? "1.4rem" : "1.8rem", fontWeight: 700,
                    color: data.accent, letterSpacing: "-0.02em",
                  }}>{data.score}</div>
                </div>
                {data.status === "current" && (
                  <div style={{ textAlign: "right" }}>
                    <ML color={C.muted} style={{ marginBottom: "4px", fontSize: "9px" }}>Status</ML>
                    <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                      <div style={{
                        width: "5px", height: "5px", borderRadius: "50%", background: data.accent,
                        animation: "_pulse 2s ease-in-out infinite",
                      }} />
                      <span style={{ fontFamily: "'DM Mono',monospace", fontSize: "10px", color: data.accent }}>Active</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Cert thumbnail */}
              <div className="cert-thumb" style={{ marginTop: "2rem", paddingTop: "1.5rem", borderTop: `1px solid ${C.border}` }}>
                <a href={`https://drive.google.com/file/d/${data.certId}/view`} target="_blank" rel="noopener noreferrer"
                  style={{ display: "block", textDecoration: "none" }}>
                  <div style={{
                    borderRadius: "8px", overflow: "hidden", border: `1px solid ${C.border}`,
                    position: "relative", transition: `all 190ms ${E}`,
                    background: C.surface,
                    minHeight: "90px",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "scale(1.015)";
                      const ov = e.currentTarget.querySelector(".cov");
                      if (ov) ov.style.opacity = "1";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "scale(1)";
                      const ov = e.currentTarget.querySelector(".cov");
                      if (ov) ov.style.opacity = "0";
                    }}
                  >
                    <img
                      src={`https://lh3.googleusercontent.com/d/${data.certId}`}
                      alt={`${data.company} certificate`}
                      style={{ width: "100%", display: "block" }} loading="lazy"
                      onError={e => {
                        e.currentTarget.style.display = "none";
                        const fallback = e.currentTarget.nextSibling;
                        if (fallback) fallback.style.display = "flex";
                      }}
                    />
                    {/* Fallback */}
                    <div style={{
                      display: "none", flexDirection: "column", alignItems: "center",
                      justifyContent: "center", gap: "6px", padding: "24px",
                      fontFamily: "'DM Mono',monospace", fontSize: "11px", color: C.muted,
                    }}>
                      <CheckCircle2 size={20} color={data.accent} />
                      View Certificate ↗
                    </div>
                    <div className="cov" style={{
                      position: "absolute", inset: 0, background: "rgba(0,0,0,0.56)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      opacity: 0, transition: `opacity 190ms ${E}`,
                    }}>
                      <div style={{
                        display: "flex", alignItems: "center", gap: "6px",
                        fontSize: "12px", fontWeight: 600, color: "#fff",
                        padding: "8px 14px", background: "rgba(0,0,0,0.72)",
                        borderRadius: "6px", border: `1px solid ${data.accent}55`,
                      }}>
                        <ArrowUpRight size={13} />View Certificate
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SUM CARD — identical to Internships.jsx
═══════════════════════════════════════════════════════════════ */
function SumCard({ stat, accent, vis, delay }) {
  const [h, sh] = useState(false);
  const mob = useMob();
  return (
    <div onMouseEnter={() => sh(true)} onMouseLeave={() => sh(false)} style={{
      padding: mob ? "0.9rem" : "2rem",
      background: C.white,
      border: `1px solid ${h ? `${accent}30` : C.border}`,
      borderRadius: "12px",
      transform: h && !mob ? "translateY(-4px)" : "translateY(0)",
      boxShadow: h && !mob ? "0 8px 24px rgba(0,0,0,0.06)" : "none",
      transition: `transform 190ms ${E}, border-color 130ms ${E}, box-shadow 190ms ${E}`,
      opacity: vis ? 1 : 0,
      animation: vis ? `_rtl 440ms ${E} ${delay}s both` : "none",
    }}>
      <div style={{
        fontFamily: "'Cormorant',Georgia,serif",
        fontSize: mob ? "1.65rem" : "2.5rem", fontWeight: 700,
        color: h ? accent : C.text,
        lineHeight: 1, marginBottom: "0.45rem", letterSpacing: "-0.02em",
        transition: `color 190ms ${E}`,
      }}>{stat.value}</div>
      <div style={{ fontSize: mob ? "11.5px" : "14px", fontWeight: 600, color: C.muted2, marginBottom: "3px" }}>{stat.label}</div>
      <div style={{ fontSize: mob ? "10.5px" : "12.5px", color: C.muted, lineHeight: 1.5 }}>{stat.detail}</div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   ROOT — Education version of Internships root
═══════════════════════════════════════════════════════════════ */
export default function Education() {
  const [heroRef, heroVis] = useInView(0.06);
  const [sumRef,  sumVis]  = useInView(0.06);
  const mob = useMob();
  const [active, sa] = useState(0);

  useEffect(() => {
    const fn = () => {
      const mid = window.innerHeight / 2;
      EDU.forEach((e, i) => {
        const el = document.getElementById(`edu-${e.id}`);
        if (!el) return;
        const r = el.getBoundingClientRect();
        if (r.top <= mid && r.bottom >= mid) sa(i);
      });
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const pad = mob ? "0 1rem" : "0 2rem";

  return (
    <>
      <style>{GLOBAL}</style>
      <MagneticCursor />
      <ScrollBar />
      <SideNav active={active} />

      {/* Grid texture */}
      <div aria-hidden="true" style={{
        position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
        backgroundImage: [
          "linear-gradient(rgba(0,0,0,0.016) 1px, transparent 1px)",
          "linear-gradient(90deg, rgba(0,0,0,0.016) 1px, transparent 1px)",
        ].join(","),
        backgroundSize: "64px 64px",
        maskImage: "radial-gradient(ellipse 80% 55% at 50% 25%, black 10%, transparent)",
        WebkitMaskImage: "radial-gradient(ellipse 80% 55% at 50% 25%, black 10%, transparent)",
      }} />

      <div style={{ position: "relative", zIndex: 1 }}>

        {/* ═══════ HERO ═══════ */}
        <header ref={heroRef} style={{
          maxWidth: "1240px", margin: "0 auto", padding: pad,
          paddingTop:    mob ? "3.5rem" : "8rem",
          paddingBottom: mob ? "2rem"   : "6rem",
          borderBottom: `1px solid ${C.border}`,
          position: "relative",
        }}>
          <div aria-hidden="true" style={{
            position: "absolute", top: "20%", left: "50%", transform: "translateX(-50%)",
            width: mob ? "280px" : "640px", height: mob ? "140px" : "300px",
            borderRadius: "50%",
            background: `radial-gradient(circle, ${C.accent}06 0%, transparent 70%)`,
            filter: `blur(${mob ? 50 : 80}px)`, pointerEvents: "none",
          }} />

          {/* Eyebrow */}
          <div style={{
            display: "flex", alignItems: "center", gap: "10px",
            marginBottom: mob ? "0.9rem" : "2rem",
            opacity: heroVis ? 1 : 0,
            animation: heroVis ? `_rtl 320ms ${E} 0.05s both` : "none",
          }}>
            <div style={{ width: "14px", height: "1px", background: C.accent }} />
            <ML>Academic Record · 2019 – 2026</ML>
            <TermCursor />
          </div>

          {/* H1 */}
          <h1 style={{
            fontFamily: "'Cormorant',Georgia,serif",
            fontSize: mob ? "clamp(2rem,9.5vw,3rem)" : "clamp(3.5rem,8vw,6.5rem)",
            fontWeight: 700, color: C.text,
            lineHeight: 1.03, letterSpacing: "-0.03em",
            marginBottom: "10px", maxWidth: "1000px",
            opacity: heroVis ? 1 : 0,
            animation: heroVis ? `_rtl 440ms ${E} 0.12s both` : "none",
          }}>
            Academic Foundation
          </h1>

          {/* Gradient bar */}
          <div style={{
            height: "3px", width: mob ? "120px" : "200px",
            background: `linear-gradient(90deg, ${C.accent}, ${C.purple}, ${C.green})`,
            borderRadius: "2px", marginBottom: mob ? "1.25rem" : "3rem",
            transformOrigin: "left",
            transform: heroVis ? "scaleX(1)" : "scaleX(0)",
            transition: `transform 320ms ${E} 0.18s`,
          }} />

          {/* Subtitle */}
          <p style={{
            fontSize: mob ? "0.875rem" : "1.12rem", color: C.muted2, lineHeight: 1.75,
            maxWidth: mob ? "100%" : "640px",
            marginBottom: mob ? "1.75rem" : "4rem",
            opacity: heroVis ? 1 : 0,
            animation: heroVis ? `_rtl 440ms ${E} 0.22s both` : "none",
          }}>
            Formal education in Artificial Intelligence and Data Science — built on a rigorous
            quantitative foundation. Each academic stage was a deliberate step toward production
            engineering, not just degree completion.
          </p>

          {/* Hero stats */}
          <div className="stats-row" style={{
            display: "grid", gridTemplateColumns: "repeat(4,1fr)",
            gap: mob ? "0.9rem" : "3rem", maxWidth: mob ? "100%" : "860px",
          }}>
            {[
              { value: "7.9",   label: "B.Tech CGPA"        },
              { value: "9.5",   label: "SSC GPA"            },
              { value: "2026",  label: "Graduating"         },
              { value: "20+",   label: "Certifications"     },
            ].map((s, i) => (
              <div key={i} style={{
                opacity: heroVis ? 1 : 0,
                animation: heroVis ? `_rtl 440ms ${E} ${0.28 + i * 0.06}s both` : "none",
              }}>
                <div style={{
                  fontFamily: "'Cormorant',Georgia,serif",
                  fontSize: mob ? "1.9rem" : "3rem", fontWeight: 700,
                  color: C.text, lineHeight: 1, marginBottom: "4px", letterSpacing: "-0.03em",
                }}>
                  <Counter value={s.value} triggered={heroVis} />
                </div>
                <div style={{ fontSize: mob ? "9px" : "12px", color: C.muted, fontWeight: 500, letterSpacing: "0.02em" }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </header>

        <Marquee speed={36} />

        {EDU.map((edu, i) => (
          <EduSection key={edu.id} data={edu} ri={i} isLast={i === EDU.length - 1} />
        ))}

        <Marquee speed={28} />

        {/* ═══════ AGGREGATE SUMMARY ═══════ */}
        <section ref={sumRef} style={{
          maxWidth: "1240px", margin: "0 auto", padding: pad,
          paddingTop:    mob ? "3rem" : "8rem",
          paddingBottom: mob ? "3rem" : "8rem",
          borderTop: `1px solid ${C.border}`,
        }}>
          <div style={{
            marginBottom: "2rem",
            opacity: sumVis ? 1 : 0,
            animation: sumVis ? `_rtl 440ms ${E} 0s both` : "none",
          }}>
            <ML style={{ marginBottom: "10px" }}>Full Academic Profile</ML>
            <h2 style={{
              fontFamily: "'Cormorant',Georgia,serif",
              fontSize: mob ? "clamp(1.5rem,5vw,2.2rem)" : "clamp(1.75rem,4vw,2.6rem)",
              fontWeight: 700, color: C.text,
              letterSpacing: "-0.025em", marginBottom: "7px",
              display: "flex", alignItems: "center",
            }}>
              Aggregate Overview<TermCursor />
            </h2>
            <p style={{ fontSize: mob ? "12.5px" : "13.5px", color: C.muted, lineHeight: 1.65, maxWidth: "440px" }}>
              Across all three academic stages — secondary, pre-university, and undergraduate.
            </p>
          </div>

          <div className="sum-grid" style={{
            display: "grid",
            gridTemplateColumns: mob ? "1fr 1fr" : "repeat(auto-fit,minmax(240px,1fr))",
            gap: mob ? "0.65rem" : "1.25rem",
          }}>
            {[
              { value: "7.9",      label: "B.Tech CGPA",          detail: "AI & Data Science · Ramachandra College of Engineering", accent: C.accent  },
              { value: "8+",       label: "Projects Shipped",      detail: "Production apps and ML pipelines — not academic prototypes", accent: C.purple  },
              { value: "3",        label: "Industry Internships",  detail: "Full-stack · Computer Vision · Data Science",             accent: C.green   },
              { value: "20+",      label: "Certifications",        detail: "AWS · Google AI · IBM · Microsoft — applied in projects",  accent: C.accent  },
              { value: "9.5",      label: "SSC GPA",               detail: "100/100 in Mathematics · top academic cohort",            accent: C.green   },
              { value: "1st",      label: "National Hackathon",    detail: "1st place among 200+ teams · ₹50,000 prize",             accent: C.purple  },
            ].map((s, i) => (
              <SumCard key={i} stat={s} accent={s.accent} vis={sumVis} delay={i * 0.06} />
            ))}
          </div>
        </section>

        {/* ═══════ FOOTER ═══════ */}
        <footer style={{
          maxWidth: "1240px", margin: "0 auto", padding: pad,
          paddingTop:    mob ? "2rem" : "4rem",
          paddingBottom: mob ? "2rem" : "4rem",
          borderTop: `1px solid ${C.border}`,
        }}>
          <div className="foot-row" style={{
            display: "flex", alignItems: "center",
            justifyContent: "space-between", gap: "1rem", flexWrap: "wrap",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div style={{
                width: "5px", height: "5px", borderRadius: "50%", background: C.green,
                animation: "_pulse 2.2s ease-in-out infinite",
              }} />
              <span style={{ fontFamily: "'DM Mono',monospace", fontSize: mob ? "10px" : "12.5px", color: C.muted2 }}>
                All certificates independently verifiable
              </span>
            </div>

            <div className="foot-links" style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem" }}>
              {[
                { label: "Email",    href: "mailto:g.sivasatyasaibhagavan@gmail.com" },
                { label: "LinkedIn", href: "https://www.linkedin.com/in/gopalajosyula-siva-satya-sai-bhagavan-1624a027b/" },
                { label: "GitHub",   href: "https://github.com/bhagavan444" },
              ].map(l => (
                <MagBtn key={l.label} href={l.href} accent={C.accent}
                  extraStyle={{ padding: "6px 12px", fontSize: "11px", minHeight: "34px" }}>
                  {l.label}
                </MagBtn>
              ))}
            </div>
          </div>

          <div style={{
            marginTop: mob ? "1.25rem" : "3rem",
            paddingTop: mob ? "0.9rem" : "1.5rem",
            borderTop: `1px solid ${C.border}`,
            display: "flex", justifyContent: "space-between", alignItems: "center",
            flexWrap: "wrap", gap: "0.4rem",
          }}>
            <div style={{ fontFamily: "'DM Mono',monospace", fontSize: "10px", color: C.muted }}>
              © 2026 Siva Satya Sai Bhagavan
            </div>
            <div style={{ display: "flex", gap: "14px" }}>
              {["Privacy", "Terms", "Sitemap"].map(l => (
                <a key={l} href="#" style={{
                  fontFamily: "'DM Mono',monospace", fontSize: "10px",
                  color: C.muted, textDecoration: "none",
                }}>{l}</a>
              ))}
            </div>
          </div>
        </footer>

      </div>
    </>
  );
}