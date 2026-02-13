"use client";

import React, { useState, useEffect, useRef } from "react";

/* ═══════════════════════════════════════════════════════════════
   DESIGN TOKENS — Monochrome authority. One accent. Nothing more.
═══════════════════════════════════════════════════════════════ */
const C = {
  bg:         "#fafaf8",
  surface:    "#f5f4f0",
  surface2:   "#eceae3",
  border:     "rgba(0,0,0,0.07)",
  border2:    "rgba(0,0,0,0.12)",
  text:       "#0c0c0a",
  muted:      "#6b6860",
  muted2:     "#44443c",
  accent:     "#1a1aff",          // ONE accent — electric blue
  accentSub:  "rgba(26,26,255,0.07)",
  accentLine: "rgba(26,26,255,0.2)",
  green:      "#0a9060",
  greenSub:   "rgba(10,144,96,0.08)",
  amber:      "#b87318",
  amberSub:   "rgba(184,115,24,0.08)",
  ink:        "#0c0c0a",
};

/* ═══════════════════════════════════════════════════════════════
   GLOBAL STYLES
═══════════════════════════════════════════════════════════════ */
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Syne:wght@400;500;600;700;800&family=DM+Mono:wght@400;500&display=swap');

  *, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }
  html { scroll-behavior: smooth; overflow-x: hidden; }
  body {
    font-family: 'Syne', system-ui, sans-serif;
    background: ${C.bg};
    color: ${C.text};
    -webkit-font-smoothing: antialiased;
    overflow-x: hidden;
  }
  ::selection { background: rgba(26,26,255,0.13); color: ${C.text}; }
  ::-webkit-scrollbar { width: 5px; }
  ::-webkit-scrollbar-track { background: ${C.bg}; }
  ::-webkit-scrollbar-thumb { background: rgba(26,26,255,0.25); border-radius: 3px; }
  ::-webkit-scrollbar-thumb:hover { background: rgba(26,26,255,0.45); }

  /* ── Keyframes ── */
  @keyframes fadeUp {
    from { opacity:0; transform: translateY(28px); }
    to   { opacity:1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity:0; }
    to   { opacity:1; }
  }
  @keyframes slideRight {
    from { opacity:0; transform: translateX(-20px); }
    to   { opacity:1; transform: translateX(0); }
  }
  @keyframes scaleIn {
    from { opacity:0; transform: scale(0.96) translateY(12px); }
    to   { opacity:1; transform: scale(1) translateY(0); }
  }
  @keyframes progressFill {
    from { width: 0%; }
    to   { width: var(--w); }
  }
  @keyframes pulseDot {
    0%,100% { box-shadow: 0 0 0 0 rgba(10,144,96,0.4); }
    60%      { box-shadow: 0 0 0 8px rgba(10,144,96,0); }
  }
  @keyframes lineReveal {
    from { transform: scaleX(0); transform-origin: left; }
    to   { transform: scaleX(1); transform-origin: left; }
  }
  @keyframes countUp {
    from { opacity:0; transform: translateY(10px); }
    to   { opacity:1; transform: translateY(0); }
  }
  @keyframes marquee {
    from { transform: translateX(0); }
    to   { transform: translateX(-50%); }
  }
  @keyframes tickerFade {
    0%   { opacity:0; transform: translateY(8px); }
    10%  { opacity:1; transform: translateY(0); }
    85%  { opacity:1; transform: translateY(0); }
    100% { opacity:0; transform: translateY(-8px); }
  }
  @keyframes shimmer {
    0%   { transform: translateX(-100%) skewX(-12deg); }
    100% { transform: translateX(250%)  skewX(-12deg); }
  }
  @keyframes borderPulse {
    0%,100% { border-color: rgba(26,26,255,0.15); }
    50%      { border-color: rgba(26,26,255,0.4); }
  }

  /* ── Utility ── */
  .mono { font-family:'DM Mono',monospace; }

  .reveal {
    opacity: 0;
    transform: translateY(28px);
    transition: opacity 0.75s cubic-bezier(0.16,1,0.3,1), transform 0.75s cubic-bezier(0.16,1,0.3,1);
  }
  .reveal.in { opacity:1; transform: translateY(0); }

  .shimmer-card { position:relative; overflow:hidden; }
  .shimmer-card::after {
    content: '';
    position: absolute; inset: 0;
    background: linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.55) 50%, transparent 60%);
    transform: translateX(-100%) skewX(-12deg);
  }
  .shimmer-card:hover::after { animation: shimmer 0.6s ease forwards; }

  .capability-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0;
    border-bottom: 1px solid ${C.border};
    transition: background 0.22s ease;
  }
  .capability-row:hover { background: ${C.accentSub}; }

  @media (max-width: 1024px) {
    .capability-row { grid-template-columns: 1fr !important; }
    .three-col { grid-template-columns: 1fr 1fr !important; }
    .stats-row { grid-template-columns: repeat(3,1fr) !important; }
  }
  @media (max-width: 768px) {
    .side-nav { display: none !important; }
    .three-col { grid-template-columns: 1fr !important; }
    .stats-row { grid-template-columns: repeat(2,1fr) !important; }
    .capability-row { grid-template-columns: 1fr !important; }
    .philosophy-grid { grid-template-columns: 1fr !important; }
    .footer-mega { grid-template-columns: 1fr !important; }
    .footer-bottom { flex-direction: column !important; gap: 1rem !important; }
  }
  @media (max-width: 480px) {
    .stats-row { grid-template-columns: 1fr 1fr !important; }
  }
`;

/* ═══════════════════════════════════════════════════════════════
   DATA — Capability-architecture language, outcome-first
═══════════════════════════════════════════════════════════════ */
const capabilities = [
  {
    id: "fullstack",
    number: "01",
    domain: "Full-Stack Application Engineering",
    outcome: "Built production-grade web systems with OAuth authentication, MongoDB data layers, and REST API integration — deployed and user-tested.",
    internship: "StudyOwl Education Pvt Ltd",
    period: "MERN Internship · 2024",
    tech: {
      "Interface Layer":   ["React.js","HTML5","CSS3","JavaScript"],
      "Application Layer": ["Node.js","Express.js","REST APIs"],
      "Data Layer":        ["MongoDB","JWT","OAuth (Google/GitHub)"],
    },
    proof: [
      { name:"ATS Resume Builder",      detail:"Keyword scoring, PDF parsing, template engine" },
      { name:"AI Chatbot Web App",       detail:"React frontend + Flask ML backend integration" },
    ],
    metric:  { value:3,   suffix:"+", label:"Production Projects" },
    accent: C.accent,
    sub:    C.accentSub,
  },
  {
    id: "intelligence",
    number: "02",
    domain: "Applied Intelligence Systems",
    outcome: "Trained, evaluated, and deployed ML models achieving 90%+ accuracy in NLP classification tasks, integrated via Flask inference APIs into live web interfaces.",
    internship: "Blackbucks · SmartBridge",
    period: "AI/ML Internship · 2024",
    tech: {
      "Model Training":  ["TensorFlow","Keras","Scikit-learn","CNN"],
      "Data Processing": ["Python","Pandas","NumPy","NLTK","TF-IDF"],
      "Deployment":      ["Flask API","REST Endpoints"],
    },
    proof: [
      { name:"Fake News Detector",        detail:"TF-IDF vectorization + classifier, 90%+ accuracy" },
      { name:"Career Path Recommender",   detail:"Supervised ML prediction system" },
    ],
    metric:  { value:90, suffix:"%+", label:"NLP Model Accuracy" },
    accent: C.green,
    sub:    C.greenSub,
  },
  {
    id: "infrastructure",
    number: "03",
    domain: "Infrastructure & Deployment",
    outcome: "Configured, deployed, and managed full-stack applications with environment isolation, cloud hosting, and production-ready API configuration for demo usage.",
    internship: "Personal Projects",
    period: "Self-Directed · Ongoing",
    tech: {
      "Hosting":   ["Vercel","Cloud Platforms"],
      "Backend":   ["Flask Deployment","Node Deployment"],
      "Tooling":   ["Environment Config","GitHub Actions","MongoDB Atlas"],
    },
    proof: [
      { name:"AI Chatbot Deployment",   detail:"Frontend + Flask API hosted end-to-end" },
      { name:"Resume Builder Deployment", detail:"OAuth + MongoDB Atlas + live demo" },
    ],
    metric:  { value:5,  suffix:"+", label:"Apps Deployed" },
    accent: C.amber,
    sub:    C.amberSub,
  },
  {
    id: "foundations",
    number: "04",
    domain: "Computational Foundations",
    outcome: "100+ structured algorithmic problem solutions across arrays, graphs, and dynamic programming. Strong OOP design patterns in Python and Java.",
    internship: "College Coursework",
    period: "B.Tech AIDS · 2022–2026",
    tech: {
      "Languages": ["Python","Java","C"],
      "Concepts":  ["Data Structures","Algorithms","OOP Design","Recursion"],
      "Practice":  ["LeetCode","Academic Implementations"],
    },
    proof: [
      { name:"LeetCode Practice",   detail:"100+ problems — arrays, strings, DP, graphs" },
      { name:"Academic Coursework", detail:"OOP and DSA implementations, lab-grade work" },
    ],
    metric:  { value:100, suffix:"+", label:"Problems Solved" },
    accent: "#7c3aed",
    sub:    "rgba(124,58,237,0.07)",
  },
];

const philosophy = [
  { statement: "I design systems, not features.",            elaboration: "Every component belongs to a larger architecture. I think in data flows and contracts before writing a line of code." },
  { statement: "I prefer clarity over complexity.",          elaboration: "The most maintainable solution is usually the simplest one that solves the right problem. Clever code is a liability." },
  { statement: "I optimize for maintainability before speed.",elaboration: "Premature optimization creates technical debt. Readable, well-structured systems outperform clever ones at scale." },
  { statement: "I ship measurable outcomes.",                elaboration: "Every engineering effort should tie to a metric that moves — retention, accuracy, load time, or friction reduction." },
];

const trajectory = [
  { area:"System Design",       detail:"Load balancing, database indexing, caching strategies, and distributed system fundamentals.",          icon:"🏗️" },
  { area:"LLM Systems",         detail:"Prompt engineering, retrieval-augmented generation, and API-based LLM integration in production apps.", icon:"🤖" },
  { area:"Cloud Architecture",  detail:"Containerization with Docker, cloud-native deployment workflows, and infrastructure-as-code basics.",   icon:"☁️" },
  { area:"Type Safety",         detail:"TypeScript migration strategies, strict type patterns in React, and compile-time safety at scale.",       icon:"📘" },
];

const tooling = [
  { name:"Git / GitHub",           level:"Daily",      cat:"Core"       },
  { name:"VS Code",                level:"Daily",      cat:"Core"       },
  { name:"Postman",                level:"Daily",      cat:"API"        },
  { name:"MongoDB Atlas",          level:"Regular",    cat:"Database"   },
  { name:"Jupyter Notebook",       level:"Regular",    cat:"ML"         },
  { name:"Flask (Local Deploy)",   level:"Regular",    cat:"Backend"    },
  { name:"Vercel",                 level:"Occasional", cat:"Deployment" },
  { name:"Figma (UI Mockups)",     level:"Occasional", cat:"Design"     },
];

/* ═══════════════════════════════════════════════════════════════
   INTERSECTION OBSERVER HOOK
═══════════════════════════════════════════════════════════════ */
function useInView(threshold = 0.15) {
  const ref   = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

/* ═══════════════════════════════════════════════════════════════
   ANIMATED COUNTER
═══════════════════════════════════════════════════════════════ */
function Counter({ value, suffix = "", triggered }) {
  const [count, setCount] = useState(0);
  const done = useRef(false);
  useEffect(() => {
    if (!triggered || done.current) return;
    done.current = true;
    const dur = 1400, start = Date.now();
    const run = () => {
      const p = Math.min((Date.now() - start) / dur, 1);
      const e = 1 - Math.pow(1 - p, 3);
      setCount(Math.floor(value * e));
      if (p < 1) requestAnimationFrame(run);
      else setCount(value);
    };
    requestAnimationFrame(run);
  }, [triggered, value]);
  return <>{count}{suffix}</>;
}

/* ═══════════════════════════════════════════════════════════════
   SCROLL PROGRESS BAR
═══════════════════════════════════════════════════════════════ */
function ScrollBar() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const fn = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setPct((window.scrollY / max) * 100);
    };
    window.addEventListener("scroll", fn, { passive:true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <div style={{ position:"fixed", top:0, left:0, right:0, height:"2px", background:C.surface2, zIndex:9999 }}>
      <div style={{ height:"100%", width:`${pct}%`, background:C.accent, transition:"width 0.1s linear" }} />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SIDE NAVIGATION (minimal dots)
═══════════════════════════════════════════════════════════════ */
function SideNav({ sections, active }) {
  return (
    <nav className="side-nav" style={{
      position:"fixed", left:"2rem", top:"50%", transform:"translateY(-50%)",
      zIndex:100, display:"flex", flexDirection:"column", gap:"0.9rem",
    }}>
      {sections.map((s, i) => (
        <button key={s.id} onClick={() => document.getElementById(s.id)?.scrollIntoView({ behavior:"smooth" })}
          style={{ display:"flex", alignItems:"center", gap:"0.6rem", background:"none", border:"none", cursor:"pointer", padding:0 }}>
          <div style={{
            width: active === i ? "28px" : "14px", height:"2px",
            background: active === i ? C.accent : C.border2,
            transition:"all 0.3s cubic-bezier(0.16,1,0.3,1)",
            borderRadius:"1px",
          }} />
          <span style={{
            fontFamily:"'DM Mono',monospace", fontSize:"0.62rem", color:C.muted,
            opacity: active === i ? 1 : 0, transition:"opacity 0.3s ease", whiteSpace:"nowrap",
          }}>{s.number}</span>
        </button>
      ))}
    </nav>
  );
}

/* ═══════════════════════════════════════════════════════════════
   CAPABILITY ROW COMPONENT
═══════════════════════════════════════════════════════════════ */
function CapabilityRow({ cap, inView, delay = 0 }) {
  const [hov, setHov] = useState(false);
  return (
    <div className="capability-row shimmer-card" style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0)" : "translateY(20px)",
      transition: `opacity 0.65s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.65s cubic-bezier(0.16,1,0.3,1) ${delay}s, background 0.22s ease`,
      background: hov ? cap.sub : "transparent",
    }}
    onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
    >
      {/* Left — Domain */}
      <div style={{ padding:"2.2rem 2.5rem", borderRight:`1px solid ${C.border}` }}>
        <div style={{ display:"flex", alignItems:"center", gap:"0.75rem", marginBottom:"1rem" }}>
          <span style={{ fontFamily:"'DM Mono',monospace", fontSize:"0.62rem", color:cap.accent, letterSpacing:"0.18em" }}>{cap.number}</span>
          <div style={{ width:"20px", height:"1.5px", background:cap.accent, borderRadius:"1px",
            animation: inView ? `lineReveal 0.5s ease ${delay+0.3}s both` : "none" }} />
        </div>
        <h3 style={{ fontFamily:"'Cormorant',Georgia,serif", fontSize:"1.7rem", fontWeight:600,
          color:C.text, lineHeight:1.15, letterSpacing:"-0.02em", marginBottom:"0.9rem" }}>
          {cap.domain}
        </h3>
        <p style={{ fontSize:"0.875rem", color:C.muted2, lineHeight:1.78, maxWidth:"440px" }}>
          {cap.outcome}
        </p>
      </div>

      {/* Right — Tech stack + proof */}
      <div style={{ padding:"2.2rem 2.5rem" }}>
        {/* Tech categories */}
        <div style={{ marginBottom:"1.8rem" }}>
          {Object.entries(cap.tech).map(([cat, items]) => (
            <div key={cat} style={{ marginBottom:"0.9rem", display:"flex", gap:"0.75rem", alignItems:"baseline", flexWrap:"wrap" }}>
              <span style={{ fontFamily:"'DM Mono',monospace", fontSize:"0.62rem", color:cap.accent,
                letterSpacing:"0.12em", textTransform:"uppercase", minWidth:"120px", flexShrink:0 }}>{cat}</span>
              <div style={{ display:"flex", flexWrap:"wrap", gap:"0.4rem" }}>
                {items.map(t => (
                  <span key={t} style={{ padding:"0.2rem 0.65rem", borderRadius:"5px",
                    background: hov ? `rgba(${cap.accent === C.accent ? "26,26,255" : cap.accent === C.green ? "10,144,96" : cap.accent === C.amber ? "184,115,24" : "124,58,237"},0.1)` : C.surface,
                    border:`1px solid ${hov ? cap.accent+"25" : C.border}`,
                    fontSize:"0.72rem", fontFamily:"'DM Mono',monospace", color:C.muted2,
                    transition:"all 0.2s ease" }}>{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Proof work */}
        <div style={{ display:"flex", flexDirection:"column", gap:"0.55rem" }}>
          {cap.proof.map(p => (
            <div key={p.name} style={{ display:"flex", gap:"0.75rem", alignItems:"baseline" }}>
              <div style={{ width:"4px", height:"4px", borderRadius:"50%", background:cap.accent, flexShrink:0, marginTop:"6px" }} />
              <div>
                <span style={{ fontSize:"0.82rem", fontWeight:600, color:C.text }}>{p.name}</span>
                <span style={{ fontSize:"0.78rem", color:C.muted, marginLeft:"0.5rem" }}>— {p.detail}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Source */}
        <div style={{ marginTop:"1.5rem", paddingTop:"1.2rem", borderTop:`1px solid ${C.border}`,
          fontFamily:"'DM Mono',monospace", fontSize:"0.68rem", color:C.muted }}>
          {cap.period} · {cap.internship}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════════════════════ */
export default function Skills() {
  /* observers */
  const [heroRef,    heroIn]    = useInView(0.1);
  const [overviewRef,overviewIn]= useInView(0.1);
  const [capRef,     capIn]     = useInView(0.05);
  const [metricsRef, metricsIn] = useInView(0.15);
  const [philRef,    philIn]    = useInView(0.1);
  const [trajRef,    trajIn]    = useInView(0.1);
  const [toolRef,    toolIn]    = useInView(0.1);
  const [footerRef,  footerIn]  = useInView(0.05);

  /* side nav active section */
  const [activeSection, setActiveSection] = useState(0);
  const navSections = capabilities.map((c,i) => ({ id:c.id, number:c.number }));

  useEffect(() => {
    const fn = () => {
      const mid = window.innerHeight / 2;
      capabilities.forEach((c, i) => {
        const el = document.getElementById(c.id);
        if (!el) return;
        const rect = el.getBoundingClientRect();
        if (rect.top <= mid && rect.bottom >= mid) setActiveSection(i);
      });
    };
    window.addEventListener("scroll", fn, { passive:true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  /* ── shared layout props ── */
  const wrap = { maxWidth:"1240px", margin:"0 auto", padding:"0 2.5rem" };
  const sectionPad = { padding:"7rem 0" };

  return (
    <>
      <style>{GLOBAL_CSS}</style>
      <ScrollBar />
      <SideNav sections={navSections} active={activeSection} />

      {/* subtle grid background */}
      <div style={{ position:"fixed", inset:0, zIndex:0, pointerEvents:"none",
        backgroundImage:`linear-gradient(rgba(0,0,0,0.025) 1px,transparent 1px), linear-gradient(90deg,rgba(0,0,0,0.025) 1px,transparent 1px)`,
        backgroundSize:"72px 72px",
        maskImage:"radial-gradient(ellipse 90% 70% at 50% 30%, black, transparent)",
        WebkitMaskImage:"radial-gradient(ellipse 90% 70% at 50% 30%, black, transparent)",
      }} />

      <div style={{ position:"relative", zIndex:1 }}>

        {/* ══════════════════════════════════════════════════════
            HERO — Strategic Overview
        ══════════════════════════════════════════════════════ */}
        <header ref={heroRef} style={{ ...sectionPad, paddingTop:"9rem" }}>
          <div style={wrap}>
            {/* Label */}
            <div style={{
              display:"flex", alignItems:"center", gap:"0.75rem", marginBottom:"2.5rem",
              opacity: heroIn ? 1 : 0,
              animation: heroIn ? "slideRight 0.6s cubic-bezier(0.16,1,0.3,1) 0.05s both" : "none",
            }}>
              <div style={{ width:"28px", height:"1.5px", background:C.accent }} />
              <span className="mono" style={{ fontSize:"0.68rem", letterSpacing:"0.2em", textTransform:"uppercase", color:C.accent }}>
                Technical Profile · B.Tech AIDS · 2026
              </span>
            </div>

            {/* Headline */}
            <h1 style={{
              fontFamily:"'Cormorant',Georgia,serif", fontSize:"clamp(3rem,7vw,5.8rem)",
              fontWeight:600, color:C.text, lineHeight:1.02, letterSpacing:"-0.03em",
              marginBottom:"2rem", maxWidth:"900px",
              opacity: heroIn ? 1 : 0,
              animation: heroIn ? "fadeUp 0.75s cubic-bezier(0.16,1,0.3,1) 0.1s both" : "none",
            }}>
              Engineering Systems<br />
              <em style={{ fontStyle:"italic", color:C.muted2 }}>That Scale.</em>
            </h1>

            {/* Sub */}
            <p style={{
              fontSize:"1.1rem", color:C.muted2, lineHeight:1.8, maxWidth:"660px", marginBottom:"4rem",
              opacity: heroIn ? 1 : 0,
              animation: heroIn ? "fadeUp 0.75s cubic-bezier(0.16,1,0.3,1) 0.2s both" : "none",
            }}>
              I build end-to-end platforms integrating application logic, data systems, and machine learning pipelines — with production context, measurable outcomes, and structured thinking at every layer.
            </p>

            {/* Three Pillars */}
            <div style={{
              display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"1px",
              background:C.border2, borderRadius:"14px", overflow:"hidden",
              opacity: heroIn ? 1 : 0,
              animation: heroIn ? "scaleIn 0.7s cubic-bezier(0.16,1,0.3,1) 0.3s both" : "none",
            }}>
              {[
                { label:"Systems Thinking",   desc:"Architecture before implementation. Contracts before components." },
                { label:"Applied AI",          desc:"ML pipelines that integrate with real applications end-to-end." },
                { label:"Production Delivery", desc:"Shipped, deployed, and tested — not just prototyped." },
              ].map((p, i) => (
                <div key={i} className="shimmer-card" style={{
                  padding:"2rem 1.8rem", background:C.bg, transition:"background 0.22s ease",
                }}
                onMouseEnter={e => e.currentTarget.style.background = C.accentSub}
                onMouseLeave={e => e.currentTarget.style.background = C.bg}
                >
                  <div style={{ display:"flex", alignItems:"center", gap:"0.6rem", marginBottom:"0.75rem" }}>
                    <div style={{ width:"6px", height:"6px", borderRadius:"50%", background:C.accent, flexShrink:0 }} />
                    <span style={{ fontSize:"0.88rem", fontWeight:700, color:C.text }}>{p.label}</span>
                  </div>
                  <p style={{ fontSize:"0.82rem", color:C.muted, lineHeight:1.65 }}>{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </header>

        {/* ══════════════════════════════════════════════════════
            STRATEGIC OVERVIEW (Primary Strength Banner)
        ══════════════════════════════════════════════════════ */}
        <section ref={overviewRef} style={{ padding:"0 0 7rem" }}>
          <div style={wrap}>
            <div style={{
              padding:"3.5rem 4rem", borderRadius:"20px", border:`1px solid ${C.accentLine}`,
              background:`linear-gradient(135deg, ${C.accentSub} 0%, rgba(26,26,255,0.03) 100%)`,
              position:"relative", overflow:"hidden",
              opacity: overviewIn ? 1 : 0,
              animation: overviewIn ? "scaleIn 0.7s cubic-bezier(0.16,1,0.3,1) both" : "none",
              transition:"border-color 0.3s ease",
              animation:"borderPulse 4s ease-in-out infinite",
            }}>
              {/* diagonal rule */}
              <div style={{ position:"absolute", top:0, right:"38%", bottom:0, width:"1px",
                background:`linear-gradient(180deg, transparent, ${C.accentLine}, transparent)`, opacity:0.5 }} />

              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"4rem", alignItems:"center" }}>
                <div>
                  <span className="mono" style={{ fontSize:"0.65rem", letterSpacing:"0.18em", textTransform:"uppercase",
                    color:C.accent, display:"block", marginBottom:"1.2rem" }}>Primary Strength</span>
                  <h2 style={{ fontFamily:"'Cormorant',Georgia,serif", fontSize:"2.4rem", fontWeight:600,
                    color:C.text, letterSpacing:"-0.025em", lineHeight:1.1, marginBottom:"1.2rem" }}>
                    Full-Stack × AI Integration
                  </h2>
                  <p style={{ fontSize:"0.9rem", color:C.muted2, lineHeight:1.8 }}>
                    The highest-leverage combination in my stack: production-grade web systems that incorporate ML inference — from model training through REST API deployment to user-facing interface. Demonstrated across three industry internships.
                  </p>
                </div>
                <div style={{ display:"flex", flexDirection:"column", gap:"0.8rem" }}>
                  {[
                    { pair:"React × Flask API",             note:"Frontend integrates ML inference endpoints" },
                    { pair:"MongoDB × Python Pipeline",     note:"Data persistence for AI-driven applications" },
                    { pair:"OAuth × JWT Security",          note:"Production-grade authentication layer" },
                  ].map((x,i) => (
                    <div key={i} style={{ display:"flex", justifyContent:"space-between", alignItems:"center",
                      padding:"0.9rem 1.2rem", borderRadius:"9px", background:"rgba(255,255,255,0.6)",
                      border:`1px solid ${C.border}`, transition:"all 0.2s ease",
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.transform = "translateX(4px)"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.6)"; e.currentTarget.style.transform = "translateX(0)"; }}
                    >
                      <span className="mono" style={{ fontSize:"0.78rem", fontWeight:500, color:C.text }}>{x.pair}</span>
                      <span style={{ fontSize:"0.73rem", color:C.muted }}>{x.note}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            CAPABILITY ARCHITECTURE
        ══════════════════════════════════════════════════════ */}
        <section ref={capRef} style={{ borderTop:`1px solid ${C.border}`, borderBottom:`1px solid ${C.border}` }}>
          <div style={wrap}>
            {/* Section header */}
            <div style={{ padding:"5rem 0 3rem",
              opacity: capIn ? 1 : 0,
              animation: capIn ? "fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) both" : "none",
            }}>
              <span className="mono" style={{ fontSize:"0.65rem", letterSpacing:"0.2em", textTransform:"uppercase",
                color:C.accent, display:"block", marginBottom:"1rem" }}>Section 02</span>
              <h2 style={{ fontFamily:"'Cormorant',Georgia,serif", fontSize:"clamp(2rem,4.5vw,3rem)",
                fontWeight:600, color:C.text, letterSpacing:"-0.025em", marginBottom:"0.75rem" }}>
                Capability Architecture
              </h2>
              <p style={{ fontSize:"0.9rem", color:C.muted, lineHeight:1.7, maxWidth:"560px" }}>
                Organized by domain → business outcome. Not a list of technologies — a map of what I can deliver.
              </p>
            </div>
          </div>

          {/* Full-width capability rows */}
          {capabilities.map((cap, i) => (
            <div key={cap.id} id={cap.id} data-section>
              <div style={wrap}>
                <CapabilityRow cap={cap} inView={capIn} delay={i * 0.1} />
              </div>
            </div>
          ))}

          <div style={{ height:"4rem" }} />
        </section>

        {/* ══════════════════════════════════════════════════════
            IMPACT METRICS — Executive-style board
        ══════════════════════════════════════════════════════ */}
        <section ref={metricsRef} style={{ ...sectionPad, background:C.surface }}>
          <div style={wrap}>
            <div style={{
              opacity: metricsIn ? 1 : 0,
              animation: metricsIn ? "fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) both" : "none",
              marginBottom:"4rem",
            }}>
              <span className="mono" style={{ fontSize:"0.65rem", letterSpacing:"0.2em", textTransform:"uppercase",
                color:C.accent, display:"block", marginBottom:"1rem" }}>Section 03</span>
              <h2 style={{ fontFamily:"'Cormorant',Georgia,serif", fontSize:"clamp(2rem,4.5vw,3rem)",
                fontWeight:600, color:C.text, letterSpacing:"-0.025em" }}>Impact Metrics</h2>
            </div>

            {/* Metric board */}
            <div className="stats-row" style={{ display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:"1px",
              background:C.border2, border:`1px solid ${C.border2}`, borderRadius:"16px", overflow:"hidden" }}>
              {[
                { value:3,   suffix:"",    label:"Industry Internships",  sub:"Paid, production environments" },
                { value:5,   suffix:"+",   label:"Systems Shipped",        sub:"Deployed, user-tested" },
                { value:100, suffix:"+",   label:"DSA Problems",           sub:"LeetCode + academic" },
                { value:20,  suffix:"+",   label:"Certifications",         sub:"AWS, Azure, GCP" },
                { value:90,  suffix:"%+",  label:"ML Accuracy",            sub:"NLP classification tasks" },
              ].map((m, i) => (
                <div key={i} style={{
                  padding:"2.5rem 2rem", background:"#fff", cursor:"default",
                  transition:"background 0.22s ease",
                  opacity: metricsIn ? 1 : 0,
                  animation: metricsIn ? `fadeUp 0.6s cubic-bezier(0.16,1,0.3,1) ${i*0.08}s both` : "none",
                }}
                onMouseEnter={e => e.currentTarget.style.background = C.accentSub}
                onMouseLeave={e => e.currentTarget.style.background = "#fff"}
                >
                  <div style={{ fontFamily:"'Cormorant',Georgia,serif", fontSize:"3.2rem", fontWeight:700,
                    color:C.accent, lineHeight:1, letterSpacing:"-0.04em", marginBottom:"0.5rem" }}>
                    <Counter value={m.value} suffix={m.suffix} triggered={metricsIn} />
                  </div>
                  <div style={{ fontSize:"0.88rem", fontWeight:600, color:C.text, marginBottom:"0.3rem" }}>{m.label}</div>
                  <div style={{ fontSize:"0.74rem", color:C.muted, lineHeight:1.5 }}>{m.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            ENGINEERING PHILOSOPHY
        ══════════════════════════════════════════════════════ */}
        <section ref={philRef} style={{ ...sectionPad, background:C.ink, position:"relative", overflow:"hidden" }}>
          {/* accent tone */}
          <div style={{ position:"absolute", left:"-8%", bottom:"-20%", width:"500px", height:"500px",
            borderRadius:"50%", background:"radial-gradient(circle, rgba(26,26,255,0.16), transparent 70%)",
            filter:"blur(80px)", pointerEvents:"none" }} />

          <div style={{ ...wrap, position:"relative", zIndex:1 }}>
            <div style={{
              opacity: philIn ? 1 : 0,
              animation: philIn ? "fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) both" : "none",
              marginBottom:"4rem",
            }}>
              <span className="mono" style={{ fontSize:"0.65rem", letterSpacing:"0.2em", textTransform:"uppercase",
                color:"rgba(26,26,255,0.7)", display:"block", marginBottom:"1rem" }}>Section 04</span>
              <h2 style={{ fontFamily:"'Cormorant',Georgia,serif", fontSize:"clamp(2rem,4.5vw,3rem)",
                fontWeight:600, color:"#fff", letterSpacing:"-0.025em" }}>Engineering Philosophy</h2>
              <p style={{ marginTop:"0.75rem", fontSize:"0.9rem", color:"rgba(255,255,255,0.45)", maxWidth:"480px", lineHeight:1.7 }}>
                What separates engineers who grow from engineers who plateau. Four principles I apply on every project.
              </p>
            </div>

            <div className="philosophy-grid" style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:"1px",
              background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.06)",
              borderRadius:"16px", overflow:"hidden" }}>
              {philosophy.map((p, i) => (
                <div key={i} style={{
                  padding:"2.8rem 3rem", background:"rgba(255,255,255,0.02)",
                  transition:"background 0.22s ease",
                  opacity: philIn ? 1 : 0,
                  animation: philIn ? `fadeUp 0.65s cubic-bezier(0.16,1,0.3,1) ${i*0.1}s both` : "none",
                  cursor:"default",
                }}
                onMouseEnter={e => e.currentTarget.style.background = "rgba(26,26,255,0.1)"}
                onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.02)"}
                >
                  <div style={{ display:"flex", alignItems:"flex-start", gap:"1rem", marginBottom:"1.2rem" }}>
                    <span className="mono" style={{ fontSize:"0.62rem", color:"rgba(26,26,255,0.7)",
                      letterSpacing:"0.15em", paddingTop:"3px", flexShrink:0 }}>0{i+1}</span>
                    <h3 style={{ fontFamily:"'Cormorant',Georgia,serif", fontSize:"1.45rem", fontWeight:600,
                      color:"#fff", lineHeight:1.2, letterSpacing:"-0.02em" }}>{p.statement}</h3>
                  </div>
                  <p style={{ fontSize:"0.85rem", color:"rgba(255,255,255,0.45)", lineHeight:1.75, paddingLeft:"2rem" }}>
                    {p.elaboration}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            TOOLING FAMILIARITY
        ══════════════════════════════════════════════════════ */}
        <section ref={toolRef} style={{ ...sectionPad, borderTop:`1px solid ${C.border}` }}>
          <div style={wrap}>
            <div style={{
              opacity: toolIn ? 1 : 0, animation: toolIn ? "fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) both" : "none",
              marginBottom:"3rem",
            }}>
              <span className="mono" style={{ fontSize:"0.65rem", letterSpacing:"0.2em", textTransform:"uppercase",
                color:C.accent, display:"block", marginBottom:"1rem" }}>Section 05</span>
              <h2 style={{ fontFamily:"'Cormorant',Georgia,serif", fontSize:"clamp(2rem,4.5vw,3rem)",
                fontWeight:600, color:C.text, letterSpacing:"-0.025em", marginBottom:"1rem" }}>Tooling Familiarity</h2>
              <div style={{ display:"flex", gap:"2rem", flexWrap:"wrap" }}>
                {[{ label:"Daily", c:C.accent },{ label:"Regular", c:C.green },{ label:"Occasional", c:C.amber }].map(x => (
                  <div key={x.label} style={{ display:"flex", alignItems:"center", gap:"0.5rem" }}>
                    <div style={{ width:"7px", height:"7px", borderRadius:"50%", background:x.c }} />
                    <span className="mono" style={{ fontSize:"0.72rem", color:C.muted2 }}>{x.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="three-col" style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"1rem" }}>
              {tooling.map((t, i) => {
                const lc = t.level==="Daily" ? C.accent : t.level==="Regular" ? C.green : C.amber;
                const lb = t.level==="Daily" ? C.accentSub : t.level==="Regular" ? C.greenSub : C.amberSub;
                return (
                  <div key={t.name} className="shimmer-card" style={{
                    display:"flex", alignItems:"center", justifyContent:"space-between",
                    padding:"1rem 1.25rem", background:"#fff", border:`1px solid ${C.border}`,
                    borderRadius:"10px", transition:"all 0.25s ease", cursor:"default",
                    opacity: toolIn ? 1 : 0,
                    animation: toolIn ? `fadeUp 0.6s cubic-bezier(0.16,1,0.3,1) ${i*0.05}s both` : "none",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = lb; e.currentTarget.style.borderColor = lc+"35"; e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.07)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.borderColor = C.border; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
                  >
                    <div style={{ display:"flex", alignItems:"center", gap:"0.65rem" }}>
                      <div style={{ width:"7px", height:"7px", borderRadius:"50%", background:lc, flexShrink:0 }} />
                      <span className="mono" style={{ fontSize:"0.8rem", fontWeight:500, color:C.text }}>{t.name}</span>
                    </div>
                    <span className="mono" style={{ fontSize:"0.65rem", color:C.muted }}>{t.cat}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            NEXT EVOLUTION (Forward Trajectory)
        ══════════════════════════════════════════════════════ */}
        <section ref={trajRef} style={{ ...sectionPad, background:C.surface, borderTop:`1px solid ${C.border}` }}>
          <div style={wrap}>
            <div style={{
              opacity: trajIn ? 1 : 0, animation: trajIn ? "fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) both" : "none",
              marginBottom:"3rem",
            }}>
              <span className="mono" style={{ fontSize:"0.65rem", letterSpacing:"0.2em", textTransform:"uppercase",
                color:C.accent, display:"block", marginBottom:"1rem" }}>Section 06</span>
              <h2 style={{ fontFamily:"'Cormorant',Georgia,serif", fontSize:"clamp(2rem,4.5vw,3rem)",
                fontWeight:600, color:C.text, letterSpacing:"-0.025em", marginBottom:"0.75rem" }}>Next Evolution</h2>
              <p style={{ fontSize:"0.88rem", color:C.muted, lineHeight:1.7, maxWidth:"520px" }}>
                Active learning areas with intentional focus — these move to core capabilities within 6 months.
              </p>
            </div>

            <div className="three-col" style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"1.25rem" }}>
              {trajectory.map((t, i) => (
                <div key={t.area} className="shimmer-card" style={{
                  padding:"2rem", background:"#fff", border:`1px solid ${C.border}`,
                  borderRadius:"14px", position:"relative", overflow:"hidden",
                  transition:"all 0.28s ease",
                  opacity: trajIn ? 1 : 0,
                  animation: trajIn ? `fadeUp 0.65s cubic-bezier(0.16,1,0.3,1) ${i*0.1}s both` : "none",
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-5px)"; e.currentTarget.style.boxShadow = "0 14px 40px rgba(0,0,0,0.08)"; e.currentTarget.style.borderColor = C.accentLine; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = C.border; }}
                >
                  {/* left accent line */}
                  <div style={{ position:"absolute", left:0, top:"20%", bottom:"20%", width:"3px",
                    background:C.accent, borderRadius:"0 2px 2px 0",
                    animation: trajIn ? `lineReveal 0.4s ease ${i*0.1+0.3}s both` : "none" }} />
                  <div style={{ paddingLeft:"1rem" }}>
                    <div style={{ fontSize:"1.6rem", marginBottom:"1rem" }}>{t.icon}</div>
                    <h3 className="mono" style={{ fontSize:"0.88rem", fontWeight:600, color:C.text, marginBottom:"0.65rem" }}>{t.area}</h3>
                    <p style={{ fontSize:"0.8rem", color:C.muted, lineHeight:1.7 }}>{t.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            MEGA FOOTER — Dominant, dark, structured
        ══════════════════════════════════════════════════════ */}
        <footer ref={footerRef} style={{ background:C.ink, position:"relative", overflow:"hidden" }}>

          {/* Wave top */}
          <div style={{ position:"relative", height:"72px", background:C.surface, overflow:"hidden" }}>
            <svg viewBox="0 0 1440 72" preserveAspectRatio="none"
              style={{ position:"absolute", bottom:0, left:0, width:"100%", height:"100%" }}>
              <path d="M0,0 C360,72 720,0 1080,40 C1260,60 1380,20 1440,36 L1440,72 L0,72 Z" fill={C.ink} />
            </svg>
          </div>

          {/* Background grid */}
          <div style={{ position:"absolute", inset:0, pointerEvents:"none", zIndex:0,
            backgroundImage:`linear-gradient(rgba(26,26,255,0.05) 1px,transparent 1px), linear-gradient(90deg,rgba(26,26,255,0.05) 1px,transparent 1px)`,
            backgroundSize:"60px 60px" }} />

          {/* Glow blobs */}
          <div style={{ position:"absolute", left:"-6%", top:"15%", width:"480px", height:"480px", borderRadius:"50%",
            background:"radial-gradient(circle, rgba(26,26,255,0.12), transparent 70%)",
            filter:"blur(80px)", pointerEvents:"none" }} />
          <div style={{ position:"absolute", right:"0", bottom:"5%", width:"320px", height:"320px", borderRadius:"50%",
            background:"radial-gradient(circle, rgba(10,144,96,0.09), transparent 70%)",
            filter:"blur(60px)", pointerEvents:"none" }} />

          <div style={{ ...wrap, position:"relative", zIndex:1 }}>

            {/* Brand statement */}
            <div style={{
              borderBottom:"1px solid rgba(255,255,255,0.07)", padding:"5rem 0",
              opacity: footerIn ? 1 : 0,
              animation: footerIn ? "fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) both" : "none",
            }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", flexWrap:"wrap", gap:"3rem" }}>
                <div style={{ maxWidth:"580px" }}>
                  <div style={{ display:"inline-flex", alignItems:"center", gap:"0.5rem",
                    padding:"0.4rem 0.9rem", borderRadius:"999px",
                    background:"rgba(10,144,96,0.1)", border:"1px solid rgba(10,144,96,0.25)",
                    marginBottom:"2rem" }}>
                    <div style={{ width:"5px", height:"5px", borderRadius:"50%", background:C.green, animation:"pulseDot 2s ease-in-out infinite" }} />
                    <span className="mono" style={{ fontSize:"0.65rem", color:C.green }}>OPEN TO OPPORTUNITIES · 2026</span>
                  </div>
                  <h2 style={{ fontFamily:"'Cormorant',Georgia,serif", fontSize:"clamp(2.8rem,5.5vw,5rem)",
                    fontWeight:600, color:"#fff", lineHeight:1.02, letterSpacing:"-0.03em", marginBottom:"1.2rem" }}>
                    Let's Build Something<br />
                    <span style={{ color:C.accent }}>Inevitable.</span>
                  </h2>
                  <p style={{ fontSize:"1rem", color:"rgba(255,255,255,0.45)", lineHeight:1.8, maxWidth:"440px" }}>
                    Systems engineer. Product thinker. AI architect. Ready to join a team that ships things that matter at scale.
                  </p>
                </div>
                {/* CTA cards */}
                <div style={{ display:"flex", flexDirection:"column", gap:"0.85rem", minWidth:"260px" }}>
                  {[
                    { label:"Schedule an Interview", sub:"PRIMARY", href:"mailto:g.sivasatyasaibhagavan@gmail.com", accent:true },
                    { label:"View Full Portfolio",    sub:"WORK",    href:"/",   accent:false },
                  ].map((x,i) => (
                    <a key={i} href={x.href} style={{
                      display:"flex", alignItems:"center", justifyContent:"space-between",
                      padding:"1.2rem 1.5rem", borderRadius:"12px", textDecoration:"none",
                      background: x.accent ? "rgba(26,26,255,0.15)" : "rgba(255,255,255,0.04)",
                      border: `1px solid ${x.accent ? "rgba(26,26,255,0.35)" : "rgba(255,255,255,0.08)"}`,
                      transition:"all 0.25s ease",
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = x.accent ? "rgba(26,26,255,0.28)" : "rgba(255,255,255,0.09)"; e.currentTarget.style.transform = "translateX(5px)"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = x.accent ? "rgba(26,26,255,0.15)" : "rgba(255,255,255,0.04)"; e.currentTarget.style.transform = "translateX(0)"; }}
                    >
                      <div>
                        <div className="mono" style={{ fontSize:"0.6rem", color:"rgba(255,255,255,0.3)", letterSpacing:"0.12em", marginBottom:"0.3rem" }}>{x.sub}</div>
                        <div style={{ fontSize:"0.9rem", fontWeight:600, color:"#fff" }}>{x.label}</div>
                      </div>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={x.accent ? C.accent : "rgba(255,255,255,0.35)"} strokeWidth="2" strokeLinecap="round"><path d="M7 17L17 7M17 7H7M17 7v10"/></svg>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer grid */}
            <div className="footer-mega" style={{ display:"grid", gridTemplateColumns:"2fr 1fr 1fr 1fr", gap:"4rem", padding:"4rem 0 3.5rem" }}>

              {/* Brand col */}
              <div>
                <div style={{ fontFamily:"'Cormorant',Georgia,serif", fontSize:"1.5rem", fontWeight:600,
                  color:"#fff", letterSpacing:"-0.04em", marginBottom:"1rem" }}>
                  Bhagavan<span style={{ color:C.accent }}>.</span>
                </div>
                <p style={{ fontSize:"0.82rem", color:"rgba(255,255,255,0.38)", lineHeight:1.8, marginBottom:"1.8rem", maxWidth:"280px" }}>
                  B.Tech AIDS · Ramachandra College of Engineering · Andhra Pradesh, India. Building AI-powered systems with structured thinking.
                </p>
                <div style={{ display:"flex", gap:"0.6rem" }}>
                  {[
                    { label:"GH", href:"https://github.com/bhagavan444", hc:"#e5e7eb" },
                    { label:"LI", href:"https://www.linkedin.com/in/gopalajosyula-siva-satya-sai-bhagavan-1624a027b/", hc:"#0a91fb" },
                    { label:"✉",  href:"mailto:g.sivasatyasaibhagavan@gmail.com", hc:C.accent },
                  ].map((s,i) => (
                    <a key={i} href={s.href} target={s.href.startsWith("http")?"_blank":undefined}
                      rel={s.href.startsWith("http")?"noopener noreferrer":undefined}
                      className="mono"
                      style={{ width:"38px", height:"38px", borderRadius:"9px",
                        background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.1)",
                        display:"flex", alignItems:"center", justifyContent:"center",
                        color:"rgba(255,255,255,0.4)", textDecoration:"none", fontSize:"0.7rem",
                        transition:"all 0.22s ease" }}
                      onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.12)"; e.currentTarget.style.color = s.hc; e.currentTarget.style.borderColor = s.hc+"44"; e.currentTarget.style.transform = "translateY(-3px)"; }}
                      onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.color = "rgba(255,255,255,0.4)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.transform = "translateY(0)"; }}
                    >{s.label}</a>
                  ))}
                </div>
              </div>

              {/* Navigate */}
              <div>
                <div className="mono" style={{ fontSize:"0.62rem", letterSpacing:"0.18em",
                  color:"rgba(255,255,255,0.22)", textTransform:"uppercase", marginBottom:"1.4rem" }}>Navigate</div>
                {[
                  { label:"Overview",     href:"#" },
                  { label:"Capabilities", href:"#fullstack" },
                  { label:"Metrics",      href:"#" },
                  { label:"Philosophy",   href:"#" },
                  { label:"Trajectory",   href:"#" },
                ].map((l,i) => (
                  <a key={i} href={l.href} style={{
                    display:"block", fontSize:"0.85rem", color:"rgba(255,255,255,0.42)",
                    textDecoration:"none", marginBottom:"0.75rem", transition:"all 0.2s ease",
                    position:"relative", paddingLeft:"0",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.color = "#fff"; e.currentTarget.style.paddingLeft = "6px"; }}
                  onMouseLeave={e => { e.currentTarget.style.color = "rgba(255,255,255,0.42)"; e.currentTarget.style.paddingLeft = "0"; }}
                  >{l.label}</a>
                ))}
              </div>

              {/* Work */}
              <div>
                <div className="mono" style={{ fontSize:"0.62rem", letterSpacing:"0.18em",
                  color:"rgba(255,255,255,0.22)", textTransform:"uppercase", marginBottom:"1.4rem" }}>Work</div>
                {[
                  { label:"All Projects",    href:"/projects", ext:false },
                  { label:"GitHub",          href:"https://github.com/bhagavan444", ext:true },
                  { label:"Resume / CV",     href:"#", dl:true },
                  { label:"Certifications",  href:"#" },
                ].map((l,i) => (
                  <a key={i} href={l.href} target={l.ext?"_blank":undefined}
                    rel={l.ext?"noopener noreferrer":undefined}
                    style={{ display:"block", fontSize:"0.85rem", color:"rgba(255,255,255,0.42)",
                      textDecoration:"none", marginBottom:"0.75rem", transition:"all 0.2s ease",
                      paddingLeft:"0" }}
                    onMouseEnter={e => { e.currentTarget.style.color = "#fff"; e.currentTarget.style.paddingLeft = "6px"; }}
                    onMouseLeave={e => { e.currentTarget.style.color = "rgba(255,255,255,0.42)"; e.currentTarget.style.paddingLeft = "0"; }}
                  >{l.label}</a>
                ))}
              </div>

              {/* Contact */}
              <div>
                <div className="mono" style={{ fontSize:"0.62rem", letterSpacing:"0.18em",
                  color:"rgba(255,255,255,0.22)", textTransform:"uppercase", marginBottom:"1.4rem" }}>Contact</div>
                {[
                  { label:"Email",    value:"g.sivasatyasaibhagavan@gmail.com", href:"mailto:g.sivasatyasaibhagavan@gmail.com" },
                  { label:"Phone",    value:"+91 7569205626",                   href:"tel:+917569205626" },
                  { label:"Location", value:"Andhra Pradesh, India",            href:"#" },
                  { label:"Status",   value:"Available · Immediate",            href:"#", green:true },
                ].map((c,i) => (
                  <div key={i} style={{ marginBottom:"1.1rem" }}>
                    <div className="mono" style={{ fontSize:"0.6rem", color:"rgba(255,255,255,0.25)", letterSpacing:"0.12em", textTransform:"uppercase", marginBottom:"0.2rem" }}>{c.label}</div>
                    <a href={c.href} style={{ fontSize:"0.8rem", color: c.green ? C.green : "rgba(255,255,255,0.55)", textDecoration:"none", transition:"color 0.2s" }}
                      onMouseEnter={e => e.currentTarget.style.color = "#fff"}
                      onMouseLeave={e => e.currentTarget.style.color = c.green ? C.green : "rgba(255,255,255,0.55)"}
                    >{c.value}</a>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom bar */}
            <div className="footer-bottom" style={{ borderTop:"1px solid rgba(255,255,255,0.06)", padding:"1.75rem 0",
              display:"flex", alignItems:"center", justifyContent:"space-between", gap:"1.2rem", flexWrap:"wrap" }}>
              <div className="mono" style={{ fontSize:"0.7rem", color:"rgba(255,255,255,0.25)" }}>
                © 2026 Siva Satya Sai Bhagavan · All rights reserved
              </div>
              <div style={{ display:"flex", gap:"1.8rem" }}>
                {["Privacy","Terms","Sitemap"].map(l => (
                  <a key={l} href="#" className="mono" style={{ fontSize:"0.7rem", color:"rgba(255,255,255,0.25)", textDecoration:"none", transition:"color 0.2s" }}
                    onMouseEnter={e => e.currentTarget.style.color = "rgba(255,255,255,0.6)"}
                    onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.25)"}
                  >{l}</a>
                ))}
              </div>
              <div style={{ display:"flex", alignItems:"center", gap:"0.5rem" }}>
                <div style={{ width:"5px", height:"5px", borderRadius:"50%", background:C.green, animation:"pulseDot 2s ease-in-out infinite" }} />
                <span className="mono" style={{ fontSize:"0.7rem", color:C.green }}>Available for hire</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}