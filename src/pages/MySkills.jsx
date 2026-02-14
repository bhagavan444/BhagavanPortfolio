"use client";

import React, { useState, useEffect, useRef } from "react";

/* ═══════════════════════════════════════════════════════════════
   DESIGN SYSTEM — Architectural precision. One accent. Zero noise.
   Inspired by: Linear, Apple HIG, Stripe Design
═══════════════════════════════════════════════════════════════ */
const C = {
  bg:         "#fafaf9",
  surface:    "#f5f5f4",
  border:     "rgba(0,0,0,0.06)",
  border2:    "rgba(0,0,0,0.10)",
  text:       "#0a0a0a",
  muted:      "#737373",
  muted2:     "#525252",
  accent:     "#0066ff",          // ONE accent — refined blue
  accentSub:  "rgba(0,102,255,0.04)",
  accentLine: "rgba(0,102,255,0.16)",
  green:      "#059669",
  greenSub:   "rgba(5,150,105,0.04)",
  ink:        "#0a0a0a",
};

/* ═══════════════════════════════════════════════════════════════
   MOTION SYSTEM — Single easing, max 180ms, structural not decorative
═══════════════════════════════════════════════════════════════ */
const EASE = "cubic-bezier(0.16, 1, 0.3, 1)";
const DURATION = "160ms";

/* ═══════════════════════════════════════════════════════════════
   GLOBAL STYLES — Minimal, structural, inevitable
═══════════════════════════════════════════════════════════════ */
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant:wght@600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

  *, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }
  html { scroll-behavior: smooth; overflow-x: hidden; }
  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    background: ${C.bg};
    color: ${C.text};
    -webkit-font-smoothing: antialiased;
    overflow-x: hidden;
  }
  ::selection { background: rgba(0,102,255,0.12); }
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: rgba(0,102,255,0.2); border-radius: 2px; }

  /* ── Keyframes — Minimal, structural ── */
  @keyframes fadeUp {
    from { opacity:0; transform: translateY(16px); }
    to   { opacity:1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity:0; }
    to   { opacity:1; }
  }
  @keyframes scaleIn {
    from { opacity:0; transform: scale(0.98); }
    to   { opacity:1; transform: scale(1); }
  }
  @keyframes lineReveal {
    from { transform: scaleX(0); }
    to   { transform: scaleX(1); }
  }
  @keyframes pulseDot {
    0%,100% { opacity: 0.4; }
    50%      { opacity: 1; }
  }

  /* ── Utility ── */
  .mono { font-family:'JetBrains Mono', monospace; }

  .reveal {
    opacity: 0;
    transform: translateY(16px);
    transition: opacity 0.6s ${EASE}, transform 0.6s ${EASE};
  }
  .reveal.in { opacity:1; transform: translateY(0); }

  @media (max-width: 1024px) {
    .capability-row { grid-template-columns: 1fr !important; }
    .three-col { grid-template-columns: 1fr 1fr !important; }
  }
  @media (max-width: 768px) {
    .side-nav { display: none !important; }
    .three-col { grid-template-columns: 1fr !important; }
    .footer-mega { grid-template-columns: 1fr !important; }
  }
`;

/* ═══════════════════════════════════════════════════════════════
   DATA — Capability-architecture language
═══════════════════════════════════════════════════════════════ */
const capabilities = [
  {
    id: "fullstack",
    number: "01",
    domain: "Full-Stack Engineering",
    outcome: "Production web systems with OAuth, MongoDB, REST APIs — deployed and user-tested.",
    context: "StudyOwl Education · MERN Internship",
    period: "2024",
    tech: {
      "Interface":   ["React","HTML5","CSS3","JavaScript"],
      "Application": ["Node.js","Express","REST"],
      "Data":        ["MongoDB","JWT","OAuth"],
    },
    proof: [
      { name:"ATS Resume Builder",  detail:"Keyword scoring, PDF parsing" },
      { name:"AI Chatbot Platform", detail:"React + Flask ML backend" },
    ],
    metric:  { value:3, suffix:"+", label:"Production Systems" },
    accent: C.accent,
  },
  {
    id: "intelligence",
    number: "02",
    domain: "Applied Intelligence",
    outcome: "ML models achieving 90%+ accuracy in NLP classification, deployed via Flask APIs.",
    context: "Blackbucks · SmartBridge · AI/ML Internship",
    period: "2024",
    tech: {
      "Training":  ["TensorFlow","Keras","Scikit-learn","CNN"],
      "Processing": ["Python","Pandas","NumPy","NLTK"],
      "Deploy":      ["Flask API","REST"],
    },
    proof: [
      { name:"Fake News Detector",      detail:"TF-IDF + 90%+ accuracy" },
      { name:"Career Recommender",      detail:"Supervised ML prediction" },
    ],
    metric:  { value:90, suffix:"%", label:"Model Accuracy" },
    accent: C.green,
  },
  {
    id: "infrastructure",
    number: "03",
    domain: "Infrastructure",
    outcome: "Full-stack deployment with environment isolation and cloud hosting.",
    context: "Self-Directed Projects",
    period: "Ongoing",
    tech: {
      "Hosting":   ["Vercel","Cloud Platforms"],
      "Backend":   ["Flask","Node"],
      "Tooling":   ["Environment Config","MongoDB Atlas"],
    },
    proof: [
      { name:"End-to-end Deployment",   detail:"Frontend + API hosted" },
      { name:"OAuth + Database",        detail:"MongoDB Atlas integration" },
    ],
    metric:  { value:5, suffix:"+", label:"Live Systems" },
    accent: "#8b5cf6",
  },
  {
    id: "foundations",
    number: "04",
    domain: "Computational Foundations",
    outcome: "100+ algorithmic problems. Strong OOP design patterns in Python and Java.",
    context: "B.Tech AIDS · Coursework",
    period: "2022–2026",
    tech: {
      "Languages": ["Python","Java","C"],
      "Concepts":  ["Data Structures","Algorithms","OOP"],
      "Practice":  ["LeetCode","Academic"],
    },
    proof: [
      { name:"LeetCode Practice",   detail:"100+ problems solved" },
      { name:"OOP Coursework",      detail:"Lab-grade implementations" },
    ],
    metric:  { value:100, suffix:"+", label:"Problems Solved" },
    accent: "#64748b",
  },
];

const philosophy = [
  { statement: "Design systems, not features",         elaboration: "Every component belongs to a larger architecture. Think in data flows and contracts before code." },
  { statement: "Prefer clarity over complexity",       elaboration: "The most maintainable solution is usually the simplest one that solves the right problem." },
  { statement: "Optimize for maintainability first",   elaboration: "Premature optimization creates debt. Readable structure outperforms clever code at scale." },
  { statement: "Ship measurable outcomes",             elaboration: "Engineering effort should tie to metrics — retention, accuracy, load time, friction reduction." },
];

const trajectory = [
  { area:"System Design",      detail:"Load balancing, caching, distributed fundamentals",         icon:"⚙️" },
  { area:"LLM Integration",    detail:"RAG, prompt engineering, production API integration",      icon:"🤖" },
  { area:"Cloud Architecture", detail:"Docker, cloud-native deployment, infrastructure-as-code", icon:"☁️" },
  { area:"Type Safety",        detail:"TypeScript migration, strict patterns, compile-time safety", icon:"📘" },
];

const tooling = [
  { name:"Git / GitHub",         level:"Daily",      cat:"Core"     },
  { name:"VS Code",              level:"Daily",      cat:"Core"     },
  { name:"Postman",              level:"Daily",      cat:"API"      },
  { name:"MongoDB Atlas",        level:"Regular",    cat:"Database" },
  { name:"Jupyter Notebook",     level:"Regular",    cat:"ML"       },
  { name:"Flask Deployment",     level:"Regular",    cat:"Backend"  },
  { name:"Vercel",               level:"Occasional", cat:"Deploy"   },
  { name:"Figma",                level:"Occasional", cat:"Design"   },
];

/* ═══════════════════════════════════════════════════════════════
   HOOKS
═══════════════════════════════════════════════════════════════ */
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { 
      if (e.isIntersecting) setInView(true); 
    }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

function Counter({ value, suffix = "", triggered }) {
  const [count, setCount] = useState(0);
  const done = useRef(false);
  useEffect(() => {
    if (!triggered || done.current) return;
    done.current = true;
    const dur = 1200, start = Date.now();
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
   SCROLL PROGRESS
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
    <div style={{ position:"fixed", top:0, left:0, right:0, height:"1px", background:"transparent", zIndex:9999 }}>
      <div style={{ height:"100%", width:`${pct}%`, background:C.accent, transition:"width 0.08s linear" }} />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SIDE NAV — Minimal dots
═══════════════════════════════════════════════════════════════ */
function SideNav({ sections, active }) {
  return (
    <nav className="side-nav" style={{
      position:"fixed", left:"1.5rem", top:"50%", transform:"translateY(-50%)",
      zIndex:100, display:"flex", flexDirection:"column", gap:"1rem",
    }}>
      {sections.map((s, i) => (
        <button 
          key={s.id} 
          onClick={() => document.getElementById(s.id)?.scrollIntoView({ behavior:"smooth" })}
          style={{ 
            display:"flex", alignItems:"center", gap:"0.5rem", 
            background:"none", border:"none", cursor:"pointer", padding:0 
          }}
        >
          <div style={{
            width: active === i ? "24px" : "12px", 
            height:"1.5px",
            background: active === i ? C.accent : C.border2,
            transition:`all 0.3s ${EASE}`,
            borderRadius:"1px",
          }} />
          <span className="mono" style={{
            fontSize:"0.6rem", 
            color:C.muted,
            opacity: active === i ? 1 : 0, 
            transition:`opacity 0.3s ${EASE}`, 
            whiteSpace:"nowrap",
          }}>{s.number}</span>
        </button>
      ))}
    </nav>
  );
}

/* ═══════════════════════════════════════════════════════════════
   CAPABILITY ROW — Clean, structural
═══════════════════════════════════════════════════════════════ */
function CapabilityRow({ cap, inView, delay = 0 }) {
  const [hov, setHov] = useState(false);
  return (
    <div 
      className="capability-row" 
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 0,
        borderBottom: `1px solid ${C.border}`,
        transition: `background ${DURATION} ${EASE}`,
        background: hov ? cap.accent === C.accent ? C.accentSub : cap.accent === C.green ? C.greenSub : "rgba(139,92,246,0.04)" : "transparent",
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(12px)",
        transition: `opacity 0.5s ${EASE} ${delay}s, transform 0.5s ${EASE} ${delay}s, background ${DURATION} ${EASE}`,
      }}
      onMouseEnter={() => setHov(true)} 
      onMouseLeave={() => setHov(false)}
    >
      {/* Left — Domain */}
      <div style={{ padding:"2rem 2.5rem", borderRight:`1px solid ${C.border}` }}>
        <div style={{ display:"flex", alignItems:"center", gap:"0.75rem", marginBottom:"1rem" }}>
          <span className="mono" style={{ 
            fontSize:"0.6rem", 
            color:cap.accent, 
            letterSpacing:"0.12em",
            fontWeight:500,
          }}>{cap.number}</span>
          <div style={{ 
            width:"16px", 
            height:"1px", 
            background:cap.accent, 
            borderRadius:"1px",
            transformOrigin:"left",
            animation: inView ? `lineReveal 0.4s ${EASE} ${delay+0.2}s both` : "none",
          }} />
        </div>
        <h3 style={{ 
          fontFamily:"'Cormorant',Georgia,serif", 
          fontSize:"1.65rem", 
          fontWeight:600,
          color:C.text, 
          lineHeight:1.15, 
          letterSpacing:"-0.02em", 
          marginBottom:"0.75rem",
        }}>
          {cap.domain}
        </h3>
        <p style={{ 
          fontSize:"0.875rem", 
          color:C.muted2, 
          lineHeight:1.7, 
          maxWidth:"420px",
        }}>
          {cap.outcome}
        </p>
      </div>

      {/* Right — Tech + Proof */}
      <div style={{ padding:"2rem 2.5rem" }}>
        {/* Tech categories */}
        <div style={{ marginBottom:"1.5rem" }}>
          {Object.entries(cap.tech).map(([cat, items]) => (
            <div key={cat} style={{ 
              marginBottom:"0.75rem", 
              display:"flex", 
              gap:"0.75rem", 
              alignItems:"baseline", 
              flexWrap:"wrap",
            }}>
              <span className="mono" style={{ 
                fontSize:"0.6rem", 
                color:cap.accent,
                letterSpacing:"0.08em", 
                textTransform:"uppercase", 
                minWidth:"100px", 
                flexShrink:0,
                fontWeight:500,
              }}>{cat}</span>
              <div style={{ display:"flex", flexWrap:"wrap", gap:"0.35rem" }}>
                {items.map(t => (
                  <span key={t} className="mono" style={{ 
                    padding:"0.2rem 0.6rem", 
                    borderRadius:"4px",
                    background: C.surface,
                    border:`1px solid ${C.border}`,
                    fontSize:"0.7rem", 
                    color:C.muted2,
                    transition:`all ${DURATION} ${EASE}`,
                  }}>{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Proof */}
        <div style={{ display:"flex", flexDirection:"column", gap:"0.5rem", marginBottom:"1.25rem" }}>
          {cap.proof.map(p => (
            <div key={p.name} style={{ display:"flex", gap:"0.75rem", alignItems:"baseline" }}>
              <div style={{ 
                width:"3px", 
                height:"3px", 
                borderRadius:"50%", 
                background:cap.accent, 
                flexShrink:0, 
                marginTop:"6px",
              }} />
              <div>
                <span style={{ fontSize:"0.8rem", fontWeight:500, color:C.text }}>{p.name}</span>
                <span style={{ fontSize:"0.75rem", color:C.muted, marginLeft:"0.5rem" }}>— {p.detail}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Context */}
        <div style={{ 
          paddingTop:"1rem", 
          borderTop:`1px solid ${C.border}`,
          fontSize:"0.7rem", 
          color:C.muted,
        }}>
          <span className="mono">{cap.period}</span>
          <span style={{ margin:"0 0.5rem", opacity:0.4 }}>·</span>
          <span>{cap.context}</span>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════════════════════ */
export default function Skills() {
  const [heroRef,    heroIn]    = useInView(0.1);
  const [overviewRef,overviewIn]= useInView(0.1);
  const [capRef,     capIn]     = useInView(0.05);
  const [metricsRef, metricsIn] = useInView(0.15);
  const [philRef,    philIn]    = useInView(0.1);
  const [trajRef,    trajIn]    = useInView(0.1);
  const [toolRef,    toolIn]    = useInView(0.1);
  const [footerRef,  footerIn]  = useInView(0.05);

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

  const wrap = { maxWidth:"1200px", margin:"0 auto", padding:"0 2rem" };
  const sectionPad = { padding:"6rem 0" };

  return (
    <>
      <style>{GLOBAL_CSS}</style>
      <ScrollBar />
      <SideNav sections={navSections} active={activeSection} />

      {/* Subtle grid */}
      <div style={{ 
        position:"fixed", 
        inset:0, 
        zIndex:0, 
        pointerEvents:"none",
        backgroundImage:`
          linear-gradient(rgba(0,0,0,0.02) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,0,0,0.02) 1px, transparent 1px)
        `,
        backgroundSize:"64px 64px",
        maskImage:"radial-gradient(ellipse 80% 60% at 50% 30%, black 20%, transparent)",
        WebkitMaskImage:"radial-gradient(ellipse 80% 60% at 50% 30%, black 20%, transparent)",
      }} />

      <div style={{ position:"relative", zIndex:1 }}>

        {/* ══════════════════════════════════════════════════════
            HERO
        ══════════════════════════════════════════════════════ */}
        <header ref={heroRef} style={{ ...sectionPad, paddingTop:"8rem" }}>
          <div style={wrap}>
            {/* Label */}
            <div style={{
              display:"flex", 
              alignItems:"center", 
              gap:"0.75rem", 
              marginBottom:"2rem",
              opacity: heroIn ? 1 : 0,
              animation: heroIn ? `fadeIn 0.5s ${EASE} 0.1s both` : "none",
            }}>
              <div style={{ width:"24px", height:"1px", background:C.accent }} />
              <span className="mono" style={{ 
                fontSize:"0.65rem", 
                letterSpacing:"0.16em", 
                textTransform:"uppercase", 
                color:C.accent,
                fontWeight:500,
              }}>
                Technical Profile · B.Tech AIDS · 2026
              </span>
            </div>

            {/* Headline */}
            <h1 style={{
              fontFamily:"'Cormorant',Georgia,serif", 
              fontSize:"clamp(2.5rem, 6vw, 5rem)",
              fontWeight:700, 
              color:C.text, 
              lineHeight:1.05, 
              letterSpacing:"-0.03em",
              marginBottom:"1.5rem", 
              maxWidth:"840px",
              opacity: heroIn ? 1 : 0,
              animation: heroIn ? `fadeUp 0.6s ${EASE} 0.15s both` : "none",
            }}>
              Engineering Systems<br />
              That Scale
            </h1>

            {/* Subhead */}
            <p style={{
              fontSize:"1.05rem", 
              color:C.muted2, 
              lineHeight:1.7, 
              maxWidth:"600px", 
              marginBottom:"3rem",
              opacity: heroIn ? 1 : 0,
              animation: heroIn ? `fadeUp 0.6s ${EASE} 0.2s both` : "none",
            }}>
              End-to-end platforms integrating application logic, data systems, and ML pipelines — with production context and measurable outcomes.
            </p>

            {/* Pillars */}
            <div style={{
              display:"grid", 
              gridTemplateColumns:"repeat(3, 1fr)", 
              gap:"1px",
              background:C.border, 
              borderRadius:"12px", 
              overflow:"hidden",
              opacity: heroIn ? 1 : 0,
              animation: heroIn ? `scaleIn 0.5s ${EASE} 0.25s both` : "none",
            }}>
              {[
                { label:"Systems Thinking",   desc:"Architecture before implementation" },
                { label:"Applied AI",          desc:"ML pipelines in real applications" },
                { label:"Production Delivery", desc:"Shipped, deployed, tested" },
              ].map((p, i) => (
                <div 
                  key={i} 
                  style={{
                    padding:"1.75rem 1.5rem", 
                    background:C.bg,
                  }}
                >
                  <div style={{ 
                    display:"flex", 
                    alignItems:"center", 
                    gap:"0.5rem", 
                    marginBottom:"0.5rem",
                  }}>
                    <div style={{ 
                      width:"4px", 
                      height:"4px", 
                      borderRadius:"50%", 
                      background:C.accent,
                    }} />
                    <span style={{ 
                      fontSize:"0.85rem", 
                      fontWeight:600, 
                      color:C.text,
                    }}>{p.label}</span>
                  </div>
                  <p style={{ 
                    fontSize:"0.8rem", 
                    color:C.muted, 
                    lineHeight:1.6,
                  }}>{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </header>

        {/* ══════════════════════════════════════════════════════
            OVERVIEW
        ══════════════════════════════════════════════════════ */}
        <section ref={overviewRef} style={{ padding:"0 0 6rem" }}>
          <div style={wrap}>
            <div style={{
              padding:"2.5rem 3rem", 
              borderRadius:"16px", 
              border:`1px solid ${C.accentLine}`,
              background:C.accentSub,
              position:"relative",
              opacity: overviewIn ? 1 : 0,
              animation: overviewIn ? `scaleIn 0.5s ${EASE} both` : "none",
            }}>
              <div style={{ 
                display:"grid", 
                gridTemplateColumns:"1fr 1fr", 
                gap:"3rem", 
                alignItems:"center",
              }}>
                <div>
                  <span className="mono" style={{ 
                    fontSize:"0.6rem", 
                    letterSpacing:"0.14em", 
                    textTransform:"uppercase",
                    color:C.accent, 
                    display:"block", 
                    marginBottom:"1rem",
                    fontWeight:500,
                  }}>Primary Strength</span>
                  <h2 style={{ 
                    fontFamily:"'Cormorant',Georgia,serif", 
                    fontSize:"2.2rem", 
                    fontWeight:700,
                    color:C.text, 
                    letterSpacing:"-0.025em", 
                    lineHeight:1.1, 
                    marginBottom:"1rem",
                  }}>
                    Full-Stack × AI Integration
                  </h2>
                  <p style={{ 
                    fontSize:"0.875rem", 
                    color:C.muted2, 
                    lineHeight:1.7,
                  }}>
                    Production web systems incorporating ML inference — from training through API deployment to interface.
                  </p>
                </div>
                <div style={{ display:"flex", flexDirection:"column", gap:"0.65rem" }}>
                  {[
                    { pair:"React × Flask",       note:"ML inference endpoints" },
                    { pair:"MongoDB × Pipeline",  note:"AI-driven persistence" },
                    { pair:"OAuth × JWT",         note:"Production auth" },
                  ].map((x,i) => (
                    <div 
                      key={i} 
                      style={{ 
                        display:"flex", 
                        justifyContent:"space-between", 
                        alignItems:"center",
                        padding:"0.75rem 1rem", 
                        borderRadius:"8px", 
                        background:"rgba(255,255,255,0.5)",
                        border:`1px solid ${C.border}`,
                      }}
                    >
                      <span className="mono" style={{ 
                        fontSize:"0.75rem", 
                        fontWeight:500, 
                        color:C.text,
                      }}>{x.pair}</span>
                      <span style={{ 
                        fontSize:"0.7rem", 
                        color:C.muted,
                      }}>{x.note}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            CAPABILITIES
        ══════════════════════════════════════════════════════ */}
        <section ref={capRef} style={{ 
          borderTop:`1px solid ${C.border}`, 
          borderBottom:`1px solid ${C.border}`,
        }}>
          <div style={wrap}>
            <div style={{ 
              padding:"4rem 0 2.5rem",
              opacity: capIn ? 1 : 0,
              animation: capIn ? `fadeUp 0.6s ${EASE} both` : "none",
            }}>
              <span className="mono" style={{ 
                fontSize:"0.6rem", 
                letterSpacing:"0.16em", 
                textTransform:"uppercase",
                color:C.accent, 
                display:"block", 
                marginBottom:"0.75rem",
                fontWeight:500,
              }}>Section 02</span>
              <h2 style={{ 
                fontFamily:"'Cormorant',Georgia,serif", 
                fontSize:"clamp(1.75rem, 4vw, 2.75rem)",
                fontWeight:700, 
                color:C.text, 
                letterSpacing:"-0.025em", 
                marginBottom:"0.5rem",
              }}>
                Capability Architecture
              </h2>
              <p style={{ 
                fontSize:"0.875rem", 
                color:C.muted, 
                lineHeight:1.6, 
                maxWidth:"520px",
              }}>
                Organized by domain → outcome. Not technologies — what I deliver.
              </p>
            </div>
          </div>

          {capabilities.map((cap, i) => (
            <div key={cap.id} id={cap.id}>
              <div style={wrap}>
                <CapabilityRow cap={cap} inView={capIn} delay={i * 0.08} />
              </div>
            </div>
          ))}

          <div style={{ height:"3rem" }} />
        </section>

        {/* ══════════════════════════════════════════════════════
            METRICS
        ══════════════════════════════════════════════════════ */}
        <section ref={metricsRef} style={{ ...sectionPad, background:C.surface }}>
          <div style={wrap}>
            <div style={{
              opacity: metricsIn ? 1 : 0,
              animation: metricsIn ? `fadeUp 0.6s ${EASE} both` : "none",
              marginBottom:"3rem",
            }}>
              <span className="mono" style={{ 
                fontSize:"0.6rem", 
                letterSpacing:"0.16em", 
                textTransform:"uppercase",
                color:C.accent, 
                display:"block", 
                marginBottom:"0.75rem",
                fontWeight:500,
              }}>Section 03</span>
              <h2 style={{ 
                fontFamily:"'Cormorant',Georgia,serif", 
                fontSize:"clamp(1.75rem, 4vw, 2.75rem)",
                fontWeight:700, 
                color:C.text, 
                letterSpacing:"-0.025em",
              }}>Impact Metrics</h2>
            </div>

            <div style={{ 
              display:"grid", 
              gridTemplateColumns:"repeat(auto-fit, minmax(200px, 1fr))", 
              gap:"1px",
              background:C.border, 
              border:`1px solid ${C.border}`, 
              borderRadius:"12px", 
              overflow:"hidden",
            }}>
              {[
                { value:3,   suffix:"",   label:"Industry Internships", sub:"Paid, production" },
                { value:5,   suffix:"+",  label:"Systems Shipped",      sub:"Deployed, tested" },
                { value:100, suffix:"+",  label:"DSA Problems",         sub:"LeetCode + academic" },
                { value:20,  suffix:"+",  label:"Certifications",       sub:"AWS, Azure, GCP" },
                { value:90,  suffix:"%",  label:"ML Accuracy",          sub:"NLP classification" },
              ].map((m, i) => (
                <div 
                  key={i} 
                  style={{
                    padding:"2rem 1.5rem", 
                    background:"#fff",
                    opacity: metricsIn ? 1 : 0,
                    animation: metricsIn ? `fadeUp 0.5s ${EASE} ${i*0.05}s both` : "none",
                  }}
                >
                  <div style={{ 
                    fontFamily:"'Cormorant',Georgia,serif", 
                    fontSize:"2.75rem", 
                    fontWeight:700,
                    color:C.accent, 
                    lineHeight:1, 
                    letterSpacing:"-0.03em", 
                    marginBottom:"0.4rem",
                  }}>
                    <Counter value={m.value} suffix={m.suffix} triggered={metricsIn} />
                  </div>
                  <div style={{ 
                    fontSize:"0.85rem", 
                    fontWeight:600, 
                    color:C.text, 
                    marginBottom:"0.25rem",
                  }}>{m.label}</div>
                  <div style={{ 
                    fontSize:"0.72rem", 
                    color:C.muted, 
                    lineHeight:1.4,
                  }}>{m.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            PHILOSOPHY
        ══════════════════════════════════════════════════════ */}
        <section ref={philRef} style={{ 
          ...sectionPad, 
          background:C.ink, 
          position:"relative", 
          overflow:"hidden",
        }}>
          {/* Subtle accent */}
          <div style={{ 
            position:"absolute", 
            left:"-10%", 
            bottom:"-30%", 
            width:"450px", 
            height:"450px",
            borderRadius:"50%", 
            background:"radial-gradient(circle, rgba(0,102,255,0.08), transparent 70%)",
            filter:"blur(60px)", 
            pointerEvents:"none",
          }} />

          <div style={{ ...wrap, position:"relative", zIndex:1 }}>
            <div style={{
              opacity: philIn ? 1 : 0,
              animation: philIn ? `fadeUp 0.6s ${EASE} both` : "none",
              marginBottom:"3rem",
            }}>
              <span className="mono" style={{ 
                fontSize:"0.6rem", 
                letterSpacing:"0.16em", 
                textTransform:"uppercase",
                color:"rgba(0,102,255,0.6)", 
                display:"block", 
                marginBottom:"0.75rem",
                fontWeight:500,
              }}>Section 04</span>
              <h2 style={{ 
                fontFamily:"'Cormorant',Georgia,serif", 
                fontSize:"clamp(1.75rem, 4vw, 2.75rem)",
                fontWeight:700, 
                color:"#fff", 
                letterSpacing:"-0.025em", 
                marginBottom:"0.5rem",
              }}>Engineering Philosophy</h2>
              <p style={{ 
                fontSize:"0.875rem", 
                color:"rgba(255,255,255,0.4)", 
                maxWidth:"480px", 
                lineHeight:1.6,
              }}>
                Four principles applied on every project.
              </p>
            </div>

            <div style={{ 
              display:"grid", 
              gridTemplateColumns:"repeat(2, 1fr)", 
              gap:"1px",
              background:"rgba(255,255,255,0.04)", 
              border:"1px solid rgba(255,255,255,0.06)",
              borderRadius:"12px", 
              overflow:"hidden",
            }}>
              {philosophy.map((p, i) => (
                <div 
                  key={i} 
                  style={{
                    padding:"2rem 2.5rem", 
                    background:"rgba(255,255,255,0.02)",
                    opacity: philIn ? 1 : 0,
                    animation: philIn ? `fadeUp 0.5s ${EASE} ${i*0.08}s both` : "none",
                  }}
                >
                  <div style={{ 
                    display:"flex", 
                    alignItems:"flex-start", 
                    gap:"0.75rem", 
                    marginBottom:"1rem",
                  }}>
                    <span className="mono" style={{ 
                      fontSize:"0.6rem", 
                      color:"rgba(0,102,255,0.6)",
                      letterSpacing:"0.12em", 
                      paddingTop:"2px", 
                      flexShrink:0,
                      fontWeight:500,
                    }}>0{i+1}</span>
                    <h3 style={{ 
                      fontFamily:"'Cormorant',Georgia,serif", 
                      fontSize:"1.35rem", 
                      fontWeight:600,
                      color:"#fff", 
                      lineHeight:1.2, 
                      letterSpacing:"-0.02em",
                    }}>{p.statement}</h3>
                  </div>
                  <p style={{ 
                    fontSize:"0.825rem", 
                    color:"rgba(255,255,255,0.4)", 
                    lineHeight:1.65, 
                    paddingLeft:"1.75rem",
                  }}>
                    {p.elaboration}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            TOOLING
        ══════════════════════════════════════════════════════ */}
        <section ref={toolRef} style={{ ...sectionPad, borderTop:`1px solid ${C.border}` }}>
          <div style={wrap}>
            <div style={{
              opacity: toolIn ? 1 : 0, 
              animation: toolIn ? `fadeUp 0.6s ${EASE} both` : "none",
              marginBottom:"2.5rem",
            }}>
              <span className="mono" style={{ 
                fontSize:"0.6rem", 
                letterSpacing:"0.16em", 
                textTransform:"uppercase",
                color:C.accent, 
                display:"block", 
                marginBottom:"0.75rem",
                fontWeight:500,
              }}>Section 05</span>
              <h2 style={{ 
                fontFamily:"'Cormorant',Georgia,serif", 
                fontSize:"clamp(1.75rem, 4vw, 2.75rem)",
                fontWeight:700, 
                color:C.text, 
                letterSpacing:"-0.025em", 
                marginBottom:"0.75rem",
              }}>Tooling Familiarity</h2>
              <div style={{ display:"flex", gap:"1.5rem", flexWrap:"wrap" }}>
                {[
                  { label:"Daily",      c:C.accent },
                  { label:"Regular",    c:C.green },
                  { label:"Occasional", c:"#64748b" },
                ].map(x => (
                  <div key={x.label} style={{ display:"flex", alignItems:"center", gap:"0.4rem" }}>
                    <div style={{ width:"6px", height:"6px", borderRadius:"50%", background:x.c }} />
                    <span className="mono" style={{ fontSize:"0.7rem", color:C.muted2, fontWeight:500 }}>{x.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ 
              display:"grid", 
              gridTemplateColumns:"repeat(auto-fill, minmax(240px, 1fr))", 
              gap:"0.75rem",
            }}>
              {tooling.map((t, i) => {
                const lc = t.level==="Daily" ? C.accent : t.level==="Regular" ? C.green : "#64748b";
                return (
                  <div 
                    key={t.name} 
                    style={{
                      display:"flex", 
                      alignItems:"center", 
                      justifyContent:"space-between",
                      padding:"0.85rem 1rem", 
                      background:"#fff", 
                      border:`1px solid ${C.border}`,
                      borderRadius:"8px",
                      opacity: toolIn ? 1 : 0,
                      animation: toolIn ? `fadeUp 0.5s ${EASE} ${i*0.03}s both` : "none",
                    }}
                  >
                    <div style={{ display:"flex", alignItems:"center", gap:"0.5rem" }}>
                      <div style={{ 
                        width:"6px", 
                        height:"6px", 
                        borderRadius:"50%", 
                        background:lc, 
                        flexShrink:0,
                      }} />
                      <span className="mono" style={{ 
                        fontSize:"0.75rem", 
                        fontWeight:500, 
                        color:C.text,
                      }}>{t.name}</span>
                    </div>
                    <span className="mono" style={{ 
                      fontSize:"0.65rem", 
                      color:C.muted,
                    }}>{t.cat}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            TRAJECTORY
        ══════════════════════════════════════════════════════ */}
        <section ref={trajRef} style={{ 
          ...sectionPad, 
          background:C.surface, 
          borderTop:`1px solid ${C.border}`,
        }}>
          <div style={wrap}>
            <div style={{
              opacity: trajIn ? 1 : 0, 
              animation: trajIn ? `fadeUp 0.6s ${EASE} both` : "none",
              marginBottom:"2.5rem",
            }}>
              <span className="mono" style={{ 
                fontSize:"0.6rem", 
                letterSpacing:"0.16em", 
                textTransform:"uppercase",
                color:C.accent, 
                display:"block", 
                marginBottom:"0.75rem",
                fontWeight:500,
              }}>Section 06</span>
              <h2 style={{ 
                fontFamily:"'Cormorant',Georgia,serif", 
                fontSize:"clamp(1.75rem, 4vw, 2.75rem)",
                fontWeight:700, 
                color:C.text, 
                letterSpacing:"-0.025em", 
                marginBottom:"0.5rem",
              }}>Next Evolution</h2>
              <p style={{ 
                fontSize:"0.875rem", 
                color:C.muted, 
                lineHeight:1.6, 
                maxWidth:"500px",
              }}>
                Active learning areas — moving to core capabilities within 6 months.
              </p>
            </div>

            <div style={{ 
              display:"grid", 
              gridTemplateColumns:"repeat(auto-fit, minmax(260px, 1fr))", 
              gap:"1rem",
            }}>
              {trajectory.map((t, i) => (
                <div 
                  key={t.area} 
                  style={{
                    padding:"1.75rem", 
                    background:"#fff", 
                    border:`1px solid ${C.border}`,
                    borderRadius:"10px", 
                    position:"relative",
                    opacity: trajIn ? 1 : 0,
                    animation: trajIn ? `fadeUp 0.5s ${EASE} ${i*0.08}s both` : "none",
                  }}
                >
                  <div style={{ 
                    position:"absolute", 
                    left:0, 
                    top:"20%", 
                    bottom:"20%", 
                    width:"2px",
                    background:C.accent, 
                    borderRadius:"0 2px 2px 0",
                    transformOrigin:"top",
                    animation: trajIn ? `lineReveal 0.4s ${EASE} ${i*0.08+0.2}s both` : "none",
                  }} />
                  <div style={{ paddingLeft:"0.75rem" }}>
                    <div style={{ fontSize:"1.5rem", marginBottom:"0.75rem" }}>{t.icon}</div>
                    <h3 className="mono" style={{ 
                      fontSize:"0.85rem", 
                      fontWeight:600, 
                      color:C.text, 
                      marginBottom:"0.5rem",
                    }}>{t.area}</h3>
                    <p style={{ 
                      fontSize:"0.78rem", 
                      color:C.muted, 
                      lineHeight:1.6,
                    }}>{t.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            FOOTER
        ══════════════════════════════════════════════════════ */}
        <footer ref={footerRef} style={{ 
          background:C.ink, 
          position:"relative", 
          overflow:"hidden",
        }}>
          {/* Wave */}
          <div style={{ 
            position:"relative", 
            height:"64px", 
            background:C.surface, 
            overflow:"hidden",
          }}>
            <svg 
              viewBox="0 0 1440 64" 
              preserveAspectRatio="none"
              style={{ 
                position:"absolute", 
                bottom:0, 
                left:0, 
                width:"100%", 
                height:"100%",
              }}
            >
              <path 
                d="M0,0 C360,64 720,0 1080,32 C1260,48 1380,16 1440,32 L1440,64 L0,64 Z" 
                fill={C.ink} 
              />
            </svg>
          </div>

          {/* Grid */}
          <div style={{ 
            position:"absolute", 
            inset:0, 
            pointerEvents:"none", 
            zIndex:0,
            backgroundImage:`
              linear-gradient(rgba(0,102,255,0.04) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,102,255,0.04) 1px, transparent 1px)
            `,
            backgroundSize:"48px 48px",
          }} />

          {/* Accent glow */}
          <div style={{ 
            position:"absolute", 
            left:"0", 
            top:"20%", 
            width:"400px", 
            height:"400px", 
            borderRadius:"50%",
            background:"radial-gradient(circle, rgba(0,102,255,0.06), transparent 70%)",
            filter:"blur(60px)", 
            pointerEvents:"none",
          }} />

          <div style={{ ...wrap, position:"relative", zIndex:1 }}>
            {/* CTA */}
            <div style={{
              borderBottom:"1px solid rgba(255,255,255,0.06)", 
              padding:"4rem 0",
              opacity: footerIn ? 1 : 0,
              animation: footerIn ? `fadeUp 0.6s ${EASE} both` : "none",
            }}>
              <div style={{ 
                display:"flex", 
                justifyContent:"space-between", 
                alignItems:"flex-end", 
                flexWrap:"wrap", 
                gap:"2.5rem",
              }}>
                <div style={{ maxWidth:"560px" }}>
                  <div style={{ 
                    display:"inline-flex", 
                    alignItems:"center", 
                    gap:"0.4rem",
                    padding:"0.35rem 0.75rem", 
                    borderRadius:"999px",
                    background:"rgba(5,150,105,0.1)", 
                    border:"1px solid rgba(5,150,105,0.2)",
                    marginBottom:"1.5rem",
                  }}>
                    <div style={{ 
                      width:"4px", 
                      height:"4px", 
                      borderRadius:"50%", 
                      background:C.green, 
                      animation:"pulseDot 2s ease-in-out infinite",
                    }} />
                    <span className="mono" style={{ 
                      fontSize:"0.62rem", 
                      color:C.green,
                      fontWeight:500,
                    }}>OPEN TO OPPORTUNITIES · 2026</span>
                  </div>
                  <h2 style={{ 
                    fontFamily:"'Cormorant',Georgia,serif", 
                    fontSize:"clamp(2.5rem, 5vw, 4.5rem)",
                    fontWeight:700, 
                    color:"#fff", 
                    lineHeight:1.05, 
                    letterSpacing:"-0.03em", 
                    marginBottom:"1rem",
                  }}>
                    Let's Build Something<br />
                    Inevitable
                  </h2>
                  <p style={{ 
                    fontSize:"0.95rem", 
                    color:"rgba(255,255,255,0.4)", 
                    lineHeight:1.7, 
                    maxWidth:"420px",
                  }}>
                    Systems engineer. Product thinker. AI architect. Ready to join teams that ship things that matter.
                  </p>
                </div>

                {/* CTA buttons */}
                <div style={{ 
                  display:"flex", 
                  flexDirection:"column", 
                  gap:"0.75rem", 
                  minWidth:"240px",
                }}>
                  {[
                    { 
                      label:"Schedule Interview", 
                      sub:"PRIMARY", 
                      href:"mailto:g.sivasatyasaibhagavan@gmail.com", 
                      accent:true,
                    },
                    { 
                      label:"View Portfolio",    
                      sub:"WORK",    
                      href:"/",   
                      accent:false,
                    },
                  ].map((x,i) => (
                    <a 
                      key={i} 
                      href={x.href} 
                      style={{
                        display:"flex", 
                        alignItems:"center", 
                        justifyContent:"space-between",
                        padding:"1rem 1.25rem", 
                        borderRadius:"10px", 
                        textDecoration:"none",
                        background: x.accent ? "rgba(0,102,255,0.12)" : "rgba(255,255,255,0.04)",
                        border: `1px solid ${x.accent ? "rgba(0,102,255,0.3)" : "rgba(255,255,255,0.08)"}`,
                        transition:`all ${DURATION} ${EASE}`,
                      }}
                    >
                      <div>
                        <div className="mono" style={{ 
                          fontSize:"0.58rem", 
                          color:"rgba(255,255,255,0.3)", 
                          letterSpacing:"0.1em", 
                          marginBottom:"0.25rem",
                          fontWeight:500,
                        }}>{x.sub}</div>
                        <div style={{ 
                          fontSize:"0.875rem", 
                          fontWeight:600, 
                          color:"#fff",
                        }}>{x.label}</div>
                      </div>
                      <svg 
                        width="14" 
                        height="14" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke={x.accent ? C.accent : "rgba(255,255,255,0.3)"} 
                        strokeWidth="2" 
                        strokeLinecap="round"
                      >
                        <path d="M7 17L17 7M17 7H7M17 7v10"/>
                      </svg>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer grid */}
            <div className="footer-mega" style={{ 
              display:"grid", 
              gridTemplateColumns:"2fr 1fr 1fr 1fr", 
              gap:"3rem", 
              padding:"3rem 0 2.5rem",
            }}>
              {/* Brand */}
              <div>
                <div style={{ 
                  fontFamily:"'Cormorant',Georgia,serif", 
                  fontSize:"1.4rem", 
                  fontWeight:700,
                  color:"#fff", 
                  letterSpacing:"-0.03em", 
                  marginBottom:"0.75rem",
                }}>
                  Bhagavan<span style={{ color:C.accent }}>.</span>
                </div>
                <p style={{ 
                  fontSize:"0.8rem", 
                  color:"rgba(255,255,255,0.35)", 
                  lineHeight:1.7, 
                  marginBottom:"1.5rem", 
                  maxWidth:"260px",
                }}>
                  B.Tech AIDS · Ramachandra College · Andhra Pradesh, India.
                </p>
                <div style={{ display:"flex", gap:"0.5rem" }}>
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
                      className="mono"
                      style={{ 
                        width:"34px", 
                        height:"34px", 
                        borderRadius:"8px",
                        background:"rgba(255,255,255,0.04)", 
                        border:"1px solid rgba(255,255,255,0.08)",
                        display:"flex", 
                        alignItems:"center", 
                        justifyContent:"center",
                        color:"rgba(255,255,255,0.35)", 
                        textDecoration:"none", 
                        fontSize:"0.7rem",
                        transition:`all ${DURATION} ${EASE}`,
                      }}
                    >{s.label}</a>
                  ))}
                </div>
              </div>

              {/* Navigate */}
              <div>
                <div className="mono" style={{ 
                  fontSize:"0.6rem", 
                  letterSpacing:"0.14em",
                  color:"rgba(255,255,255,0.2)", 
                  textTransform:"uppercase", 
                  marginBottom:"1.25rem",
                  fontWeight:500,
                }}>Navigate</div>
                {[
                  { label:"Overview",     href:"#" },
                  { label:"Capabilities", href:"#fullstack" },
                  { label:"Metrics",      href:"#" },
                  { label:"Philosophy",   href:"#" },
                  { label:"Trajectory",   href:"#" },
                ].map((l,i) => (
                  <a 
                    key={i} 
                    href={l.href} 
                    style={{
                      display:"block", 
                      fontSize:"0.82rem", 
                      color:"rgba(255,255,255,0.4)",
                      textDecoration:"none", 
                      marginBottom:"0.65rem", 
                      transition:`color ${DURATION} ${EASE}`,
                    }}
                  >{l.label}</a>
                ))}
              </div>

              {/* Work */}
              <div>
                <div className="mono" style={{ 
                  fontSize:"0.6rem", 
                  letterSpacing:"0.14em",
                  color:"rgba(255,255,255,0.2)", 
                  textTransform:"uppercase", 
                  marginBottom:"1.25rem",
                  fontWeight:500,
                }}>Work</div>
                {[
                  { label:"All Projects",    href:"/projects" },
                  { label:"GitHub",          href:"https://github.com/bhagavan444" },
                  { label:"Resume / CV",     href:"#" },
                  { label:"Certifications",  href:"#" },
                ].map((l,i) => (
                  <a 
                    key={i} 
                    href={l.href}
                    style={{ 
                      display:"block", 
                      fontSize:"0.82rem", 
                      color:"rgba(255,255,255,0.4)",
                      textDecoration:"none", 
                      marginBottom:"0.65rem", 
                      transition:`color ${DURATION} ${EASE}`,
                    }}
                  >{l.label}</a>
                ))}
              </div>

              {/* Contact */}
              <div>
                <div className="mono" style={{ 
                  fontSize:"0.6rem", 
                  letterSpacing:"0.14em",
                  color:"rgba(255,255,255,0.2)", 
                  textTransform:"uppercase", 
                  marginBottom:"1.25rem",
                  fontWeight:500,
                }}>Contact</div>
                {[
                  { label:"Email",    value:"g.sivasatyasaibhagavan@gmail.com" },
                  { label:"Phone",    value:"+91 7569205626" },
                  { label:"Location", value:"Andhra Pradesh, IN" },
                  { label:"Status",   value:"Available · Immediate", green:true },
                ].map((c,i) => (
                  <div key={i} style={{ marginBottom:"1rem" }}>
                    <div className="mono" style={{ 
                      fontSize:"0.58rem", 
                      color:"rgba(255,255,255,0.22)", 
                      letterSpacing:"0.1em", 
                      textTransform:"uppercase", 
                      marginBottom:"0.15rem",
                      fontWeight:500,
                    }}>{c.label}</div>
                    <div style={{ 
                      fontSize:"0.78rem", 
                      color: c.green ? C.green : "rgba(255,255,255,0.5)",
                    }}>{c.value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom bar */}
            <div style={{ 
              borderTop:"1px solid rgba(255,255,255,0.06)", 
              padding:"1.5rem 0",
              display:"flex", 
              alignItems:"center", 
              justifyContent:"space-between", 
              gap:"1rem", 
              flexWrap:"wrap",
            }}>
              <div className="mono" style={{ 
                fontSize:"0.68rem", 
                color:"rgba(255,255,255,0.22)",
                fontWeight:500,
              }}>
                © 2026 Siva Satya Sai Bhagavan
              </div>
              <div style={{ display:"flex", gap:"1.5rem" }}>
                {["Privacy","Terms","Sitemap"].map(l => (
                  <a 
                    key={l} 
                    href="#" 
                    className="mono" 
                    style={{ 
                      fontSize:"0.68rem", 
                      color:"rgba(255,255,255,0.22)", 
                      textDecoration:"none", 
                      transition:`color ${DURATION} ${EASE}`,
                      fontWeight:500,
                    }}
                  >{l}</a>
                ))}
              </div>
              <div style={{ display:"flex", alignItems:"center", gap:"0.4rem" }}>
                <div style={{ 
                  width:"4px", 
                  height:"4px", 
                  borderRadius:"50%", 
                  background:C.green, 
                  animation:"pulseDot 2s ease-in-out infinite",
                }} />
                <span className="mono" style={{ 
                  fontSize:"0.68rem", 
                  color:C.green,
                  fontWeight:500,
                }}>Available for hire</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}