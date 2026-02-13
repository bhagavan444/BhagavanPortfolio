"use client";

import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import profileImg from "../assets/profile.jpeg";
import resumePdf from "../assets/bhagavanresume.pdf";
import {
  Download, Github, Linkedin, Mail, Phone, ArrowRight,
  ExternalLink, CheckCircle, Verified, ChevronRight, ChevronLeft,
  MapPin, TrendingUp, Layers, Search, GitBranch, BarChart2,
  Zap, Shield, Clock, Twitter, Code2, BookOpen, Coffee,
  Globe, Send, Heart, Star, Award, Cpu, Terminal, FileCode,
  ArrowUpRight, ChevronUp
} from "lucide-react";

/* ═══════════════════════════════════════════════════════════════
   DESIGN TOKENS — Editorial Monochrome + Electric Accent
═══════════════════════════════════════════════════════════════ */
const T = {
  bg:       "#fafaf9",
  surface:  "#f4f3f0",
  surface2: "#eceae4",
  border:   "rgba(0,0,0,0.07)",
  border2:  "rgba(0,0,0,0.13)",
  text:     "#0d0d0b",
  muted:    "#6b6960",
  muted2:   "#44443e",
  accent:   "#1a1aff",        // electric blue — single bold accent
  accentSub:"rgba(26,26,255,0.08)",
  green:    "#0d9b6b",
  gold:     "#c4882a",
  ink:      "#0d0d0b",
};

/* ═══════════════════════════════════════════════════════════════
   GLOBAL CSS
═══════════════════════════════════════════════════════════════ */
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,600&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=DM+Mono:wght@400;500&display=swap');

  *, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }
  html { scroll-behavior: smooth; overflow-x: hidden; }

  body {
    font-family: 'DM Sans', -apple-system, sans-serif;
    background: ${T.bg};
    color: ${T.text};
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
    cursor: none;
  }

  /* ── Custom Cursor ── */
  .cursor-dot {
    position: fixed;
    width: 8px; height: 8px;
    background: ${T.accent};
    border-radius: 50%;
    pointer-events: none;
    z-index: 99999;
    transform: translate(-50%,-50%);
    transition: width 0.2s, height 0.2s, opacity 0.2s;
    mix-blend-mode: multiply;
  }
  .cursor-ring {
    position: fixed;
    width: 36px; height: 36px;
    border: 1.5px solid rgba(26,26,255,0.45);
    border-radius: 50%;
    pointer-events: none;
    z-index: 99998;
    transform: translate(-50%,-50%);
    transition: all 0.12s cubic-bezier(0.16,1,0.3,1);
  }
  .cursor-ring.hovering {
    width: 56px; height: 56px;
    border-color: rgba(26,26,255,0.7);
    background: rgba(26,26,255,0.06);
  }
  a, button, [data-hover] { cursor: none; }

  ::selection { background: rgba(26,26,255,0.15); color: ${T.text}; }
  ::-webkit-scrollbar { width: 5px; }
  ::-webkit-scrollbar-track { background: ${T.bg}; }
  ::-webkit-scrollbar-thumb { background: rgba(26,26,255,0.3); border-radius: 3px; }
  ::-webkit-scrollbar-thumb:hover { background: rgba(26,26,255,0.55); }

  /* ══════════════════════════════════════════════
     KEYFRAMES — Professional UX Motion System
  ══════════════════════════════════════════════ */

  @keyframes fadeUp {
    from { opacity:0; transform: translateY(30px) scale(0.99); }
    to   { opacity:1; transform: translateY(0) scale(1); }
  }
  @keyframes fadeIn {
    from { opacity:0; }
    to   { opacity:1; }
  }
  @keyframes slideInLeft {
    from { opacity:0; transform: translateX(-24px); }
    to   { opacity:1; transform: translateX(0); }
  }
  @keyframes slideInRight {
    from { opacity:0; transform: translateX(24px); }
    to   { opacity:1; transform: translateX(0); }
  }
  @keyframes scaleReveal {
    from { opacity:0; transform: scale(0.94) translateY(16px); }
    to   { opacity:1; transform: scale(1) translateY(0); }
  }
  @keyframes pulseDot {
    0%,100% { box-shadow: 0 0 0 0 rgba(13,155,107,0.45); }
    60%      { box-shadow: 0 0 0 9px rgba(13,155,107,0); }
  }
  @keyframes pulseAccent {
    0%,100% { box-shadow: 0 0 0 0 rgba(26,26,255,0.35); }
    60%      { box-shadow: 0 0 0 12px rgba(26,26,255,0); }
  }
  @keyframes marquee {
    from { transform: translateX(0); }
    to   { transform: translateX(-50%); }
  }
  @keyframes marqueeReverse {
    from { transform: translateX(-50%); }
    to   { transform: translateX(0); }
  }
  @keyframes floatCard {
    0%,100% { transform: translateY(0px); }
    50%      { transform: translateY(-7px); }
  }
  @keyframes shimmerPass {
    0%   { transform: translateX(-100%) skewX(-12deg); }
    100% { transform: translateX(250%) skewX(-12deg); }
  }
  @keyframes borderReveal {
    from { transform: scaleX(0); transform-origin: left; }
    to   { transform: scaleX(1); transform-origin: left; }
  }
  @keyframes typewriter {
    from { width: 0; }
    to   { width: 100%; }
  }
  @keyframes blink {
    0%,100% { opacity:1; }
    50%      { opacity:0; }
  }
  @keyframes footerWave {
    0%   { d: path("M0,60 C200,0 400,120 600,60 C800,0 1000,80 1200,60 L1200,0 L0,0 Z"); }
    50%  { d: path("M0,80 C200,40 400,100 600,40 C800,-20 1000,100 1200,80 L1200,0 L0,0 Z"); }
    100% { d: path("M0,60 C200,0 400,120 600,60 C800,0 1000,80 1200,60 L1200,0 L0,0 Z"); }
  }
  @keyframes gridFade {
    0%,100% { opacity: 0.03; }
    50%      { opacity: 0.07; }
  }
  @keyframes counterReveal {
    from { opacity:0; transform: translateY(12px); }
    to   { opacity:1; transform: translateY(0); }
  }
  @keyframes rotateSlow {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }
  @keyframes drawLine {
    from { stroke-dashoffset: 1000; }
    to   { stroke-dashoffset: 0; }
  }
  @keyframes ripple {
    0%   { transform: scale(0); opacity: 0.4; }
    100% { transform: scale(4); opacity: 0; }
  }
  @keyframes textClip {
    from { clip-path: inset(0 100% 0 0); }
    to   { clip-path: inset(0 0% 0 0); }
  }
  @keyframes staggerFade {
    from { opacity:0; transform: translateY(20px); }
    to   { opacity:1; transform: translateY(0); }
  }
  @keyframes haloBreath {
    0%,100% { opacity:0.12; transform:scale(1); }
    50%      { opacity:0.22; transform:scale(1.06); }
  }

  /* ── Utility classes ── */
  .fade-up   { animation: fadeUp  0.75s cubic-bezier(0.16,1,0.3,1) both; }
  .fade-in   { animation: fadeIn  0.6s ease both; }
  .scale-rev { animation: scaleReveal 0.7s cubic-bezier(0.16,1,0.3,1) both; }

  .d1 { animation-delay: 0.05s; }  .d2 { animation-delay: 0.13s; }
  .d3 { animation-delay: 0.22s; }  .d4 { animation-delay: 0.32s; }
  .d5 { animation-delay: 0.44s; }  .d6 { animation-delay: 0.58s; }
  .d7 { animation-delay: 0.72s; }  .d8 { animation-delay: 0.88s; }

  .card {
    background: #fff;
    border: 1px solid ${T.border};
    border-radius: 16px;
    box-shadow: 0 2px 12px rgba(0,0,0,0.04);
  }
  .display {
    font-family: 'Playfair Display', Georgia, serif;
    letter-spacing: -0.03em;
    line-height: 1.05;
  }
  .mono { font-family: 'DM Mono', monospace; }
  .label {
    font-family: 'DM Mono', monospace;
    font-size: 0.68rem;
    font-weight: 500;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: ${T.accent};
  }

  /* Marquee */
  .marquee-track { display:flex; width:max-content; animation: marquee 38s linear infinite; }
  .marquee-track:hover { animation-play-state: paused; }
  .marquee-track-rev { display:flex; width:max-content; animation: marqueeReverse 42s linear infinite; }
  .marquee-track-rev:hover { animation-play-state: paused; }

  /* Shimmer sweep on cards */
  .shimmer-card { position: relative; overflow: hidden; }
  .shimmer-card::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.6) 50%, transparent 60%);
    transform: translateX(-100%) skewX(-12deg);
    transition: none;
  }
  .shimmer-card:hover::after {
    animation: shimmerPass 0.65s ease forwards;
  }

  /* Footer link hover underline */
  .footer-link {
    position: relative;
    text-decoration: none;
    color: rgba(255,255,255,0.45);
    font-size: 0.875rem;
    transition: color 0.22s ease;
    display: inline-block;
  }
  .footer-link::after {
    content: '';
    position: absolute;
    bottom: -2px; left: 0;
    width: 0; height: 1px;
    background: ${T.accent};
    transition: width 0.28s cubic-bezier(0.16,1,0.3,1);
  }
  .footer-link:hover { color: #fff; }
  .footer-link:hover::after { width: 100%; }

  /* Smooth scroll reveal for sections */
  .reveal-section {
    opacity: 0;
    transform: translateY(32px);
    transition: opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1);
  }
  .reveal-section.visible {
    opacity: 1;
    transform: translateY(0);
  }

  /* Button ripple */
  .btn-ripple {
    position: relative;
    overflow: hidden;
  }
  .btn-ripple .ripple-effect {
    position: absolute;
    border-radius: 50%;
    background: rgba(255,255,255,0.3);
    animation: ripple 0.6s ease-out forwards;
    pointer-events: none;
  }

  @media (max-width: 1024px) {
    .hero-cols { grid-template-columns: 1fr !important; }
    .hero-img-col { max-width: 360px !important; margin: 0 auto !important; }
    .four-col { grid-template-columns: repeat(2,1fr) !important; }
    .philosophy-grid { grid-template-columns: 1fr !important; }
    .project-inner { grid-template-columns: 1fr !important; }
    .footer-mega { grid-template-columns: 1fr 1fr !important; }
  }
  @media (max-width: 768px) {
    .nav-links { display: none !important; }
    .cta-row { flex-direction: column; width: 100%; }
    .four-col { grid-template-columns: 1fr 1fr !important; }
    .timeline-row { grid-template-columns: repeat(2,1fr) !important; }
    .impact-grid { grid-template-columns: 1fr 1fr !important; }
    .tradeoffs-grid { grid-template-columns: 1fr !important; }
    .footer-mega { grid-template-columns: 1fr !important; gap: 3rem !important; }
    .footer-bottom { flex-direction: column !important; align-items: flex-start !important; gap:1rem !important; }
    .cursor-dot, .cursor-ring { display: none; }
    body { cursor: auto; }
    a, button { cursor: pointer; }
  }
  @media (max-width: 480px) {
    .four-col { grid-template-columns: 1fr !important; }
    .impact-grid { grid-template-columns: 1fr !important; }
    .timeline-row { grid-template-columns: 1fr !important; }
  }
`;

/* ═══════════════════════════════════════════════════════════════
   ANIMATED COUNTER
═══════════════════════════════════════════════════════════════ */
function Counter({ target, suffix = "", triggered }) {
  const [val, setVal] = useState(0);
  const started = useRef(false);
  useEffect(() => {
    if (!triggered || started.current) return;
    started.current = true;
    const num = parseInt(target.replace(/\D/g, ""), 10);
    const steps = 50;
    const step = num / steps;
    let cur = 0;
    const t = setInterval(() => {
      cur += step;
      if (cur >= num) { setVal(num); clearInterval(t); }
      else setVal(Math.floor(cur));
    }, 1400 / steps);
    return () => clearInterval(t);
  }, [triggered, target]);
  return <span>{val}{suffix}</span>;
}

/* ═══════════════════════════════════════════════════════════════
   INTERSECTION OBSERVER
═══════════════════════════════════════════════════════════════ */
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

/* ═══════════════════════════════════════════════════════════════
   BUTTON
═══════════════════════════════════════════════════════════════ */
function Btn({ children, href, onClick, primary = false, download, style: extStyle = {} }) {
  const [hov, setHov] = useState(false);
  const base = {
    display: "inline-flex", alignItems: "center", gap: "0.5rem",
    fontFamily: "'DM Sans', sans-serif", fontWeight: 600,
    fontSize: "0.875rem", letterSpacing: "-0.01em",
    padding: "0.8rem 1.6rem", borderRadius: "10px",
    border: primary ? "none" : `1.5px solid ${T.border2}`,
    cursor: "pointer", textDecoration: "none",
    whiteSpace: "nowrap", transition: "all 0.25s cubic-bezier(0.34,1.56,0.64,1)",
    background: primary ? T.accent : "transparent",
    color: primary ? "#fff" : T.muted2,
    boxShadow: primary ? "0 4px 20px rgba(26,26,255,0.28)" : "none",
    ...extStyle,
  };
  const hovStyle = hov ? {
    transform: "translateY(-2px)",
    boxShadow: primary ? "0 8px 28px rgba(26,26,255,0.42)" : "0 4px 16px rgba(0,0,0,0.08)",
    background: primary ? "#0000e5" : T.accentSub,
    color: primary ? "#fff" : T.text,
    borderColor: primary ? "transparent" : T.accent,
  } : {};
  const C = href ? "a" : "button";
  return (
    <C href={href} onClick={onClick} download={download}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ ...base, ...hovStyle }}
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
    >{children}</C>
  );
}

/* ═══════════════════════════════════════════════════════════════
   CUSTOM CURSOR
═══════════════════════════════════════════════════════════════ */
function CustomCursor() {
  const dotRef  = useRef(null);
  const ringRef = useRef(null);
  const pos     = useRef({ x: 0, y: 0 });
  const ring    = useRef({ x: 0, y: 0 });
  const raf     = useRef(null);

  useEffect(() => {
    const onMove = (e) => { pos.current = { x: e.clientX, y: e.clientY }; };
    const onEnter = () => ringRef.current?.classList.add("hovering");
    const onLeave = () => ringRef.current?.classList.remove("hovering");
    window.addEventListener("mousemove", onMove);
    const els = document.querySelectorAll("a,button,[data-hover]");
    els.forEach(el => { el.addEventListener("mouseenter", onEnter); el.addEventListener("mouseleave", onLeave); });
    const animate = () => {
      if (dotRef.current) { dotRef.current.style.left = pos.current.x + "px"; dotRef.current.style.top = pos.current.y + "px"; }
      if (ringRef.current) {
        ring.current.x += (pos.current.x - ring.current.x) * 0.13;
        ring.current.y += (pos.current.y - ring.current.y) * 0.13;
        ringRef.current.style.left = ring.current.x + "px";
        ringRef.current.style.top  = ring.current.y + "px";
      }
      raf.current = requestAnimationFrame(animate);
    };
    raf.current = requestAnimationFrame(animate);
    return () => { window.removeEventListener("mousemove", onMove); cancelAnimationFrame(raf.current); };
  }, []);
  return (<><div ref={dotRef} className="cursor-dot" /><div ref={ringRef} className="cursor-ring" /></>);
}

/* ═══════════════════════════════════════════════════════════════
   SCROLL TO TOP
═══════════════════════════════════════════════════════════════ */
function ScrollToTop() {
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const fn = () => setVis(window.scrollY > 600);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <button onClick={() => window.scrollTo({ top:0, behavior:"smooth" })}
      style={{ position:"fixed", bottom:"2rem", right:"2rem", zIndex:500,
        width:"46px", height:"46px", borderRadius:"12px",
        background:T.ink, border:"1px solid rgba(255,255,255,0.1)",
        color:"#fff", cursor:"none", display:"flex", alignItems:"center", justifyContent:"center",
        boxShadow:"0 8px 32px rgba(0,0,0,0.25)",
        opacity: vis ? 1 : 0, transform: vis ? "translateY(0) scale(1)" : "translateY(16px) scale(0.85)",
        transition:"all 0.35s cubic-bezier(0.16,1,0.3,1)", pointerEvents: vis ? "auto" : "none",
      }}
      onMouseEnter={e => { e.currentTarget.style.background = T.accent; e.currentTarget.style.transform = "translateY(-3px) scale(1.08)"; }}
      onMouseLeave={e => { e.currentTarget.style.background = T.ink; e.currentTarget.style.transform = "translateY(0) scale(1)"; }}
    ><ChevronUp size={18} /></button>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SECTION WRAPPER
═══════════════════════════════════════════════════════════════ */
function Section({ children, id, style: s = {}, ref: r }) {
  return (
    <section id={id} ref={r} style={{ padding: "7rem 0", position: "relative", zIndex: 1, ...s }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 2.5rem" }}>
        {children}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SECTION HEADER
═══════════════════════════════════════════════════════════════ */
function SectionHead({ label, title, sub, light = false }) {
  return (
    <div style={{ marginBottom: "4rem" }}>
      <span className="label" style={{ display: "block", marginBottom: "1rem", color: light ? "rgba(26,26,255,0.7)" : T.accent }}>
        {label}
      </span>
      <h2 className="display" style={{
        fontSize: "clamp(2.2rem,4.5vw,3.2rem)",
        color: light ? "#fff" : T.text,
        maxWidth: "620px",
        fontWeight: 700,
      }}>{title}</h2>
      {sub && <p style={{ marginTop: "1rem", fontSize: "1.05rem", color: light ? "rgba(255,255,255,0.65)" : T.muted, maxWidth: "520px", lineHeight: 1.7 }}>{sub}</p>}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   HOME
═══════════════════════════════════════════════════════════════ */
export default function Home() {
  const navigate = useNavigate();
  const [scrolled, setScrolled]   = useState(false);
  const [scrollPct, setScrollPct] = useState(0);
  const [testIdx, setTestIdx]     = useState(0);

  /* scroll */
  useEffect(() => {
    const fn = () => {
      setScrolled(window.scrollY > 40);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrollPct((window.scrollY / max) * 100);
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  /* testimonials auto */
  useEffect(() => {
    const t = setInterval(() => setTestIdx(p => (p + 1) % testimonials.length), 6000);
    return () => clearInterval(t);
  }, []);

  /* observers */
  const [metricsRef,   metricsIn]   = useInView();
  const [skillsRef,    skillsIn]    = useInView();
  const [achievRef,    achievIn]    = useInView();
  const [testRef,      testIn]      = useInView();
  const [projectRef,   projectIn]   = useInView();
  const [ctaRef,       ctaIn]       = useInView();
  const [philRef,      philIn]      = useInView();
  const [timelineRef,  timelineIn]  = useInView();
  const [impactRef,    impactIn]    = useInView();
  const [tradeoffRef,  tradeoffIn]  = useInView();

  /* ────────────────── DATA ────────────────── */
  const metrics = [
    { value: "5",  suffix: "+", label: "Production Systems", sub: "Shipped across 3 internships", color: T.accent },
    { value: "20", suffix: "+", label: "Certifications",      sub: "AWS, Azure, GCP & more",        color: T.gold   },
    { value: "15", suffix: "+", label: "Technologies",        sub: "Languages, frameworks, cloud",  color: T.green  },
    { value: "80", suffix: "%", label: "Satisfaction Rate",   sub: "Zero critical-bug record",      color: "#b45309"},
  ];

  const philosophy = [
    { icon: Search,    title: "Problem Framing",    body: "I don't start with solutions. I start with constraints — understanding what problem is worth solving, for whom, and why now. Most engineering failures begin with solving the wrong problem." },
    { icon: Layers,    title: "Systems Thinking",   body: "Every feature is a contract. I design data flows, API surfaces, and state management before UI. Readable, extendable systems outlast clever code." },
    { icon: GitBranch, title: "Research & Evidence",body: "Decisions backed by data, not opinions. I build with real user pain points in mind, using feedback loops, usage metrics, and documented constraints." },
    { icon: Zap,       title: "Rapid Validation",   body: "Prototype early, fail cheap. I bias toward working software in the smallest scope that tests the core assumption — then iterate." },
    { icon: BarChart2, title: "Measurable Outcomes",body: "I tie every engineering effort to a metric that moves — retention, load time, error rate, task completion. If it can't be measured, it isn't done." },
  ];

  const processSteps = [
    { step: "01", label: "Discover",  desc: "User interviews, stakeholder goals, competitive analysis" },
    { step: "02", label: "Define",    desc: "Problem statement, constraints, success metrics" },
    { step: "03", label: "Design",    desc: "Architecture, wireframes, API contracts, component breakdown" },
    { step: "04", label: "Test",      desc: "Unit tests, E2E, usability feedback, edge cases" },
    { step: "05", label: "Ship",      desc: "CI/CD deployment, feature flags, rollout strategy" },
    { step: "06", label: "Measure",   desc: "Analytics, error monitoring, iteration backlog" },
  ];

  const impactStats = [
    { value: "60–70%", label: "Approval time reduced",   sub: "Leave automation (Power Apps)", icon: Clock  },
    { value: "85–90%", label: "Manual processing cut",   sub: "Enterprise workflow redesign",  icon: TrendingUp },
    { value: "100+",   label: "Simulated users piloted", sub: "System stress-tested at scale", icon: Shield },
    { value: "<0.1%",  label: "Critical bug rate",       sub: "Across all production deploys", icon: Zap    },
  ];

  const tradeoffs = [
    { decision: "Chose Power Apps over custom React",    reason: "Power Apps cut time-to-ship by 60%. A custom UI would've taken 3× longer with no user benefit — the value was in workflow automation, not UI novelty." },
    { decision: "Flask over FastAPI for ML inference",   reason: "The team was familiar with Flask and the performance delta didn't justify the migration cost at our scale. Predictability > marginal speed gains." },
    { decision: "MongoDB over PostgreSQL for resume app",reason: "Unstructured resume data changes constantly. A rigid schema would have required migrations every sprint. Flexibility was worth the trade-off." },
    { decision: "Polling over WebSockets for real-time", reason: "Given our user concurrency, polling every 5s was operationally simpler and cost-effective. WebSockets would've added infra overhead without meaningful UX gain." },
  ];

  const skillGroups = [
    { category: "AI & Machine Learning", color: "#7c3aed", dot: "#7c3aed",
      skills: ["TensorFlow","Keras","Scikit-learn","CNN","NLP (TF-IDF)","Supervised Learning"],
      desc: "ML model design, training pipelines, and Flask-based inference APIs." },
    { category: "Full-Stack Engineering", color: T.accent, dot: T.accent,
      skills: ["React.js","Node.js","Express.js","MongoDB","JavaScript","REST APIs"],
      desc: "End-to-end applications with secure auth, clean APIs, and production-ready code." },
    { category: "Backend & Integration", color: T.green, dot: T.green,
      skills: ["Flask","OAuth (Google/GitHub)","PDF Parsing","API Integration","Async Requests"],
      desc: "Backend services and third-party integrations powering AI-driven products." },
    { category: "Tools & Foundations",  color: T.gold, dot: T.gold,
      skills: ["Git","GitHub","Postman","VS Code","OOP (Java/Python)","DSA Fundamentals"],
      desc: "Strong programming foundations with collaborative engineering practices." },
  ];

  const techStack = [
    "React.js","Node.js","Express.js","MongoDB","JavaScript","Python",
    "TensorFlow","Keras","Flask","Scikit-learn","HTML5","CSS3",
    "Git","REST APIs","Power Apps","Power Automate","SharePoint","Power BI",
  ];

  const achievements = [
    { year:"2025", title:"AWS Certified Cloud Practitioner",        issuer:"Amazon Web Services",                          color: T.gold   },
    { year:"2025", title:"24-Hour Hackathon Finalist",              issuer:"Brainovision × Ramachandra College",           color: T.accent },
    { year:"2024", title:"AIML Internship Completion",              issuer:"Blackbucks Paid Online",                       color: T.green  },
    { year:"2025", title:"100+ DSA Problems Solved",                issuer:"LeetCode & Practice Platforms",                color: "#7c3aed"},
    { year:"2024", title:"300+ Day Consistent Coding Streak",       issuer:"GitHub Activity & Daily Practice",             color: T.gold   },
  ];

  const testimonials = [
    { quote: "Bhagavan led the backend architecture during our 24-hour hackathon. He handled MongoDB integration and authentication under pressure and ensured the deployment worked before submission.",
      name: "M Dhana Pujitha", role: "Team Lead – 24hr Hackathon, Ramachandra College", avatar: "DP", color: T.accent },
    { quote: "During his AIML internship, he quickly understood TensorFlow concepts and independently implemented model evaluation pipelines. Strong learning mindset.",
      name: "Internship Mentor", role: "Blackbucks Paid Online – AIML & Data Science", avatar: "IM", color: "#7c3aed" },
    { quote: "He consistently takes ownership of MERN stack features instead of just implementing assigned tasks. Shows initiative beyond academics.",
      name: "Project Guide", role: "Faculty – B.Tech AIDS", avatar: "PG", color: T.green },
  ];

  const featuredProject = {
    title: "Real-Time Leave Automation System",
    subtitle: "Final Year Project (B.Tech 4-2)",
    tag: "Enterprise Workflow Automation × Microsoft 365 × Low-Code",
    problem: "Manual leave management created 3–5 day approval bottlenecks, paper trails, and zero visibility for HR. HR teams were processing 200+ leave requests monthly with no audit trail.",
    solution: "Designed a multi-tier approval workflow using Power Apps + Power Automate, backed by SharePoint as a data layer. Role-based access, Teams/Outlook notifications, and a Power BI dashboard for HR analytics.",
    stats: [
      { label: "Approval Time Reduced", value: "60–70%" },
      { label: "Manual Processing Cut",  value: "85–90%" },
      { label: "Pilot Scale",            value: "100+ Users" },
    ],
    tech: ["Microsoft Power Apps","Power Automate","SharePoint Online","Dataverse","Microsoft 365","Power BI"],
  };

  /* ────────────────── RENDER ────────────────── */
  return (
    <>
      <style>{GLOBAL_CSS}</style>

      {/* Scroll progress bar */}
      <div style={{ position:"fixed", top:0, left:0, right:0, height:"2px", background:T.surface2, zIndex:10000 }}>
        <div style={{ width:`${scrollPct}%`, height:"100%", background:T.accent, transition:"width 0.1s linear" }} />
      </div>

      {/* Background texture — very subtle */}
      <div style={{ position:"fixed", inset:0, zIndex:0, pointerEvents:"none",
        backgroundImage:`radial-gradient(ellipse 70% 55% at 15% 15%, rgba(26,26,255,0.035) 0%, transparent 65%),
          radial-gradient(ellipse 50% 45% at 85% 85%, rgba(13,155,107,0.03) 0%, transparent 60%)` }} />

      {/* ══════ NAVBAR ══════ */}
      <nav style={{
        position:"fixed", top:0, left:0, right:0, zIndex:1000,
        height:"68px", padding:"0 2.5rem",
        display:"flex", alignItems:"center", justifyContent:"space-between",
        background: scrolled ? "rgba(250,250,249,0.94)" : "transparent",
        backdropFilter: scrolled ? "blur(20px) saturate(160%)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(20px) saturate(160%)" : "none",
        borderBottom: scrolled ? `1px solid ${T.border}` : "1px solid transparent",
        transition: "all 0.35s ease",
      }}>
        <div className="display" style={{ fontSize:"1.2rem", fontWeight:700, color:T.text, letterSpacing:"-0.04em" }}>
          Bhagavan<span style={{ color:T.accent }}>.</span>
        </div>

        <div className="nav-links" style={{ display:"flex", gap:"0.25rem", alignItems:"center" }}>
          {["About","Process","Work","Skills","Contact"].map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} style={{
              fontSize:"0.875rem", fontWeight:500, color:T.muted2,
              textDecoration:"none", padding:"0.45rem 0.9rem", borderRadius:"8px",
              transition:"all 0.2s",
            }}
            onMouseEnter={e => { e.currentTarget.style.color = T.text; e.currentTarget.style.background = T.surface; }}
            onMouseLeave={e => { e.currentTarget.style.color = T.muted2; e.currentTarget.style.background = "transparent"; }}
            >{l}</a>
          ))}
        </div>

        <div style={{ display:"flex", alignItems:"center", gap:"1rem" }}>
          <div style={{
            display:"flex", alignItems:"center", gap:"0.45rem",
            padding:"0.35rem 0.85rem", borderRadius:"999px",
            background:"rgba(13,155,107,0.08)", border:`1px solid rgba(13,155,107,0.25)`,
          }}>
            <div style={{ width:"6px", height:"6px", borderRadius:"50%", background:T.green, animation:"pulseDot 2s ease-in-out infinite" }} />
            <span className="mono" style={{ fontSize:"0.7rem", fontWeight:500, color:T.green }}>Available</span>
          </div>
          <Btn href={resumePdf} download><Download size={13} /> Resume</Btn>
        </div>
      </nav>

      {/* ══════════════════════════════════════════════════════════
          MAIN
      ══════════════════════════════════════════════════════════ */}
      <main style={{ position:"relative", zIndex:1 }}>

        {/* ── HERO ── */}
        <section id="about" style={{ minHeight:"100vh", display:"flex", alignItems:"center", paddingTop:"68px", position:"relative", zIndex:1 }}>
          {/* Subtle grid */}
          <div style={{ position:"absolute", inset:0, zIndex:0, pointerEvents:"none",
            backgroundImage:`linear-gradient(rgba(0,0,0,0.025) 1px,transparent 1px), linear-gradient(90deg,rgba(0,0,0,0.025) 1px,transparent 1px)`,
            backgroundSize:"72px 72px",
            maskImage:"radial-gradient(ellipse 85% 65% at 50% 50%, black, transparent)",
            WebkitMaskImage:"radial-gradient(ellipse 85% 65% at 50% 50%, black, transparent)",
          }} />

          <div style={{ maxWidth:"1280px", margin:"0 auto", padding:"4rem 2.5rem 6rem", width:"100%", position:"relative", zIndex:1 }}>
            <div className="hero-cols" style={{ display:"grid", gridTemplateColumns:"1fr 400px", gap:"6rem", alignItems:"center" }}>

              {/* LEFT */}
              <div>
                {/* Status pill */}
                <div className="fade-up d1" style={{ marginBottom:"2.5rem" }}>
                  <span style={{
                    display:"inline-flex", alignItems:"center", gap:"0.55rem",
                    padding:"0.45rem 1rem", borderRadius:"999px",
                    background:"rgba(13,155,107,0.08)", border:`1px solid rgba(13,155,107,0.25)`,
                    fontSize:"0.8rem", fontWeight:600, color:T.green,
                  }}>
                    <div style={{ width:"6px", height:"6px", borderRadius:"50%", background:T.green, animation:"pulseDot 2s ease-in-out infinite" }} />
                    Open to full-time roles · 2026 Graduate
                    <MapPin size={11} />
                    India / Remote
                  </span>
                </div>

                {/* Headline */}
                <h1 className="display fade-up d2" style={{ fontSize:"clamp(3.2rem,6.5vw,5.5rem)", color:T.text, marginBottom:"0.3rem", fontWeight:700 }}>
                  Siva Satya Sai
                </h1>
                <h1 className="display fade-up d3" style={{
                  fontSize:"clamp(3.2rem,6.5vw,5.5rem)", fontWeight:700, marginBottom:"2rem",
                  color: T.accent,
                }}>
                  Bhagavan
                </h1>

                {/* Role label */}
                <div className="fade-up d4" style={{ marginBottom:"2rem" }}>
                  <span className="mono" style={{ fontSize:"0.78rem", color:T.muted, letterSpacing:"0.12em" }}>CURRENTLY → </span>
                  <span style={{ fontSize:"1.05rem", fontWeight:600, color:T.text }}>
                    Full-Stack Engineer · AI/ML Architect · Systems Designer
                  </span>
                </div>

                {/* Strategic sub-headline */}
                <p className="fade-up d5" style={{ fontSize:"1.1rem", lineHeight:1.8, color:T.muted2, maxWidth:"580px", marginBottom:"3rem", fontWeight:400 }}>
                  I build <strong style={{ color:T.text, fontWeight:600 }}>AI-powered products that reduce friction and move metrics.</strong>{" "}
                  3 industry internships. 5+ systems shipped. Focused on engineering that creates measurable business outcomes — not just clean interfaces.
                </p>

                {/* CTAs */}
                <div className="cta-row fade-up d6" style={{ display:"flex", gap:"0.9rem", marginBottom:"3rem", flexWrap:"wrap", alignItems:"center" }}>
                  <Btn primary onClick={() => navigate("/projects")}>View Case Studies <ArrowRight size={15} /></Btn>
                  <Btn onClick={() => document.getElementById("process")?.scrollIntoView({ behavior:"smooth" })}>See Process</Btn>
                  <Btn href={resumePdf} download><Download size={14} /> Resume</Btn>
                </div>

                {/* Trust row */}
                <div className="fade-up d7" style={{ display:"flex", gap:"2rem", flexWrap:"wrap", paddingTop:"2rem", borderTop:`1px solid ${T.border}` }}>
                  {[
                    { icon:"🏅", label:"20+ Certifications" },
                    { icon:"🚀", label:"5+ Production Systems" },
                    { icon:"🧠", label:"100+ DSA Problems" },
                  ].map((x,i) => (
                    <div key={i} style={{ display:"flex", alignItems:"center", gap:"0.55rem" }}>
                      <span style={{ fontSize:"1rem" }}>{x.icon}</span>
                      <span style={{ fontSize:"0.82rem", fontWeight:500, color:T.muted }}>{x.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* RIGHT — portrait */}
              <div className="hero-img-col fade-in d4" style={{ position:"relative" }}>
                {/* Accent frame */}
                <div style={{ position:"absolute", inset:"-12px", borderRadius:"28px", border:`1.5px solid ${T.accentSub}`, zIndex:0 }} />
                <div style={{ position:"absolute", top:"-24px", right:"-24px", width:"80px", height:"80px", borderRadius:"50%",
                  background:`radial-gradient(circle, rgba(26,26,255,0.12), transparent 70%)`, zIndex:0, filter:"blur(16px)" }} />

                <div style={{
                  position:"relative", zIndex:1, borderRadius:"20px", overflow:"hidden",
                  background:"#fff", border:`1px solid ${T.border2}`,
                  boxShadow:"0 32px 80px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.04)",
                  animation:"floatCard 9s ease-in-out infinite",
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.015) translateY(-6px)"; e.currentTarget.style.boxShadow = "0 48px 100px rgba(0,0,0,0.18)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "scale(1) translateY(0)"; e.currentTarget.style.boxShadow = "0 32px 80px rgba(0,0,0,0.12)"; }}
                style={{ transition:"transform 0.35s ease, box-shadow 0.35s ease", borderRadius:"20px", overflow:"hidden", position:"relative", zIndex:1, border:`1px solid ${T.border2}`, boxShadow:"0 32px 80px rgba(0,0,0,0.12)", animation:"floatCard 9s ease-in-out infinite" }}
                >
                  <img src={profileImg} alt="Siva Satya Sai Bhagavan" style={{ width:"100%", display:"block", aspectRatio:"4/5", objectFit:"cover" }} />

                  {/* Gradient overlay */}
                  <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top, rgba(255,255,255,0.96) 0%, rgba(255,255,255,0.25) 55%, transparent 100%)" }} />

                  {/* Status chip */}
                  <div style={{ position:"absolute", top:"20px", left:"50%", transform:"translateX(-50%)",
                    background:"rgba(255,255,255,0.96)", border:`1px solid ${T.border2}`,
                    backdropFilter:"blur(20px)", borderRadius:"999px", padding:"0.4rem 1rem",
                    display:"flex", alignItems:"center", gap:"0.45rem", whiteSpace:"nowrap",
                    boxShadow:"0 2px 12px rgba(0,0,0,0.08)",
                  }}>
                    <div style={{ width:"5px", height:"5px", borderRadius:"50%", background:T.green, animation:"pulseDot 2s ease-in-out infinite" }} />
                    <span className="mono" style={{ fontSize:"0.65rem", fontWeight:500, color:T.text }}>AVAILABLE · IMMEDIATE</span>
                  </div>

                  {/* Bottom info */}
                  <div style={{ position:"absolute", bottom:0, left:0, right:0, padding:"1.5rem 1.75rem" }}>
                    <div className="display" style={{ fontSize:"1.3rem", color:T.ink, marginBottom:"0.3rem", fontWeight:600 }}>Bhagavan</div>
                    <div style={{ fontSize:"0.8rem", color:T.muted2, marginBottom:"1rem" }}>Full-Stack · AI/ML · Cloud · Power Platform</div>
                    <div style={{ display:"flex", gap:"0.6rem" }}>
                      {[
                        { icon:Github,   href:"https://github.com/bhagavan444", c:T.text },
                        { icon:Linkedin, href:"https://www.linkedin.com/in/gopalajosyula-siva-satya-sai-bhagavan-1624a027b/", c:"#0a91fb" },
                        { icon:Mail,     href:"mailto:g.sivasatyasaibhagavan@gmail.com", c:T.accent },
                      ].map((s,i) => (
                        <a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
                          style={{ width:"34px", height:"34px", borderRadius:"8px", background:T.surface,
                            border:`1px solid ${T.border}`, display:"flex", alignItems:"center", justifyContent:"center",
                            color:s.c, textDecoration:"none", transition:"all 0.2s" }}
                          onMouseEnter={e => { e.currentTarget.style.background = T.accentSub; e.currentTarget.style.transform = "scale(1.12)"; }}
                          onMouseLeave={e => { e.currentTarget.style.background = T.surface; e.currentTarget.style.transform = "scale(1)"; }}
                        ><s.icon size={14} /></a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── METRICS ── */}
        <section ref={metricsRef} style={{ padding:"5rem 0", position:"relative", zIndex:1, background:T.surface }}>
          <div style={{ maxWidth:"1280px", margin:"0 auto", padding:"0 2.5rem" }}>
            <div className="four-col" style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"1.25rem" }}>
              {metrics.map((m,i) => (
                <div key={i} className="card" style={{
                  padding:"2.2rem 2rem", cursor:"default",
                  opacity: metricsIn ? 1 : 0,
                  animation: metricsIn ? `fadeUp 0.65s cubic-bezier(0.16,1,0.3,1) ${i*0.1}s both` : "none",
                  transition:"transform 0.3s ease, box-shadow 0.3s ease",
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = "0 20px 56px rgba(0,0,0,0.09)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.04)"; }}
                >
                  <div style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"2.8rem", fontWeight:700,
                    color:m.color, marginBottom:"0.5rem", letterSpacing:"-0.04em", lineHeight:1 }}>
                    <Counter target={m.value} suffix={m.suffix} triggered={metricsIn} />
                  </div>
                  <div style={{ fontSize:"0.9rem", fontWeight:600, color:T.text, marginBottom:"0.3rem" }}>{m.label}</div>
                  <div style={{ fontSize:"0.77rem", color:T.muted, lineHeight:1.6 }}>{m.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── DESIGN PHILOSOPHY ("How I Think") ── */}
        <section id="philosophy" ref={philRef} style={{ padding:"8rem 0", position:"relative", zIndex:1 }}>
          <div style={{ maxWidth:"1280px", margin:"0 auto", padding:"0 2.5rem" }}>
            <SectionHead label="Design Philosophy" title="How I Think"
              sub="Good engineering is rooted in product thinking. Here's the mental model I bring to every system I build." />

            <div className="philosophy-grid" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"1.25rem" }}>
              {philosophy.map((p,i) => (
                <div key={i} className="card" style={{
                  padding:"2.2rem",
                  opacity: philIn ? 1 : 0,
                  animation: philIn ? `fadeUp 0.65s cubic-bezier(0.16,1,0.3,1) ${i*0.1}s both` : "none",
                  transition:"all 0.3s ease",
                  ...(i === 0 ? { gridColumn:"span 1" } : {}),
                  ...(i === 4 ? { gridColumn:"span 3" } : {}),
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(26,26,255,0.25)"; e.currentTarget.style.transform = "translateY(-5px)"; e.currentTarget.style.boxShadow = "0 16px 48px rgba(0,0,0,0.08)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.04)"; }}
                >
                  <div style={{ width:"36px", height:"36px", borderRadius:"10px", background:T.accentSub,
                    display:"flex", alignItems:"center", justifyContent:"center", marginBottom:"1.2rem" }}>
                    <p.icon size={17} style={{ color:T.accent }} />
                  </div>
                  <div style={{ fontSize:"1rem", fontWeight:600, color:T.text, marginBottom:"0.75rem" }}>{p.title}</div>
                  <p style={{ fontSize:"0.875rem", color:T.muted2, lineHeight:1.75 }}>{p.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PROCESS TIMELINE ── */}
        <section id="process" ref={timelineRef} style={{ padding:"8rem 0", background:T.surface, position:"relative", zIndex:1 }}>
          <div style={{ maxWidth:"1280px", margin:"0 auto", padding:"0 2.5rem" }}>
            <SectionHead label="Process" title="How I Reduce Risk"
              sub="A repeatable system that moves from ambiguity to shipped product without skipping the steps that matter." />

            {/* Timeline */}
            <div className="timeline-row" style={{ display:"grid", gridTemplateColumns:"repeat(6,1fr)", gap:"0", position:"relative" }}>
              {/* connector line */}
              <div style={{ position:"absolute", top:"28px", left:"calc(100%/12)", right:"calc(100%/12)", height:"1.5px",
                background:`linear-gradient(90deg, ${T.accent}, ${T.green})`,
                opacity: timelineIn ? 1 : 0,
                animation: timelineIn ? "fadeIn 1.2s ease 0.4s both" : "none",
              }} />

              {processSteps.map((s,i) => (
                <div key={i} style={{
                  padding:"0 1rem",
                  opacity: timelineIn ? 1 : 0,
                  animation: timelineIn ? `fadeUp 0.6s cubic-bezier(0.16,1,0.3,1) ${0.2+i*0.1}s both` : "none",
                  position:"relative",
                }}>
                  {/* dot */}
                  <div style={{ width:"56px", height:"56px", borderRadius:"50%", background:"#fff",
                    border:`2px solid ${i === 0 ? T.accent : i === 5 ? T.green : T.border2}`,
                    display:"flex", alignItems:"center", justifyContent:"center",
                    marginBottom:"1.2rem", boxShadow:"0 0 0 5px "+T.surface,
                    transition:"all 0.25s ease", cursor:"default",
                    position:"relative", zIndex:1,
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = T.accent; e.currentTarget.style.transform = "scale(1.1)"; e.currentTarget.style.boxShadow = `0 0 0 8px ${T.accentSub}, 0 0 0 5px ${T.surface}`; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = i===0?T.accent:i===5?T.green:T.border2; e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 0 0 5px "+T.surface; }}
                  >
                    <span className="mono" style={{ fontSize:"0.7rem", fontWeight:600, color:T.accent }}>{s.step}</span>
                  </div>
                  <div style={{ fontSize:"0.95rem", fontWeight:700, color:T.text, marginBottom:"0.5rem" }}>{s.label}</div>
                  <div style={{ fontSize:"0.78rem", color:T.muted, lineHeight:1.65 }}>{s.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── IMPACT SECTION ── */}
        <section id="impact" ref={impactRef} style={{ padding:"8rem 0", background:T.ink, position:"relative", zIndex:1, overflow:"hidden" }}>
          {/* accent blobs */}
          <div style={{ position:"absolute", left:"-10%", top:"20%", width:"450px", height:"450px", borderRadius:"50%",
            background:"radial-gradient(circle, rgba(26,26,255,0.2), transparent 70%)", filter:"blur(80px)", pointerEvents:"none" }} />
          <div style={{ position:"absolute", right:"-8%", bottom:"10%", width:"350px", height:"350px", borderRadius:"50%",
            background:"radial-gradient(circle, rgba(13,155,107,0.18), transparent 70%)", filter:"blur(70px)", pointerEvents:"none" }} />

          <div style={{ maxWidth:"1280px", margin:"0 auto", padding:"0 2.5rem", position:"relative", zIndex:1 }}>
            <SectionHead light label="Impact" title={"Design That\nMoves Metrics"}
              sub="Every system I build is measured. Here's what that looks like in numbers." />

            <div className="impact-grid" style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"1.25rem" }}>
              {impactStats.map((s,i) => (
                <div key={i} style={{
                  padding:"2.5rem 2rem",
                  background:"rgba(255,255,255,0.04)",
                  border:"1px solid rgba(255,255,255,0.08)",
                  borderRadius:"16px",
                  opacity: impactIn ? 1 : 0,
                  animation: impactIn ? `fadeUp 0.65s cubic-bezier(0.16,1,0.3,1) ${i*0.1}s both` : "none",
                  transition:"all 0.3s ease",
                  cursor:"default",
                }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.07)"; e.currentTarget.style.transform = "translateY(-5px)"; e.currentTarget.style.borderColor = "rgba(26,26,255,0.35)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; }}
                >
                  <s.icon size={20} style={{ color:"rgba(26,26,255,0.75)", marginBottom:"1.2rem", display:"block" }} />
                  <div style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"2.2rem", fontWeight:700,
                    color:"#fff", marginBottom:"0.5rem", letterSpacing:"-0.03em" }}>{s.value}</div>
                  <div style={{ fontSize:"0.88rem", fontWeight:600, color:"rgba(255,255,255,0.85)", marginBottom:"0.35rem" }}>{s.label}</div>
                  <div style={{ fontSize:"0.75rem", color:"rgba(255,255,255,0.4)", lineHeight:1.6 }}>{s.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TECH MARQUEE ── */}
        <section style={{ padding:"4rem 0", overflow:"hidden", position:"relative", zIndex:1 }}>
          <div style={{ textAlign:"center", marginBottom:"1.8rem" }}>
            <span className="label">Technology Arsenal</span>
          </div>
          <div style={{ position:"relative" }}>
            {["left","right"].map(side => (
              <div key={side} style={{
                position:"absolute", [side]:0, top:0, bottom:0, width:"140px",
                background:`linear-gradient(${side === "left" ? "90deg" : "270deg"}, ${T.bg}, transparent)`,
                zIndex:2, pointerEvents:"none",
              }} />
            ))}
            <div style={{ overflow:"hidden" }}>
              <div className="marquee-track">
                {[...techStack, ...techStack].map((t,i) => (
                  <div key={i} style={{
                    display:"inline-flex", alignItems:"center", gap:"0.6rem",
                    margin:"0 0.7rem", padding:"0.6rem 1.25rem",
                    background:"#fff", border:`1px solid ${T.border}`, borderRadius:"999px",
                    fontSize:"0.83rem", fontWeight:500, color:T.muted2, whiteSpace:"nowrap",
                    transition:"all 0.25s ease", cursor:"default",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.color = T.accent; e.currentTarget.style.borderColor = T.accent; e.currentTarget.style.background = T.accentSub; }}
                  onMouseLeave={e => { e.currentTarget.style.color = T.muted2; e.currentTarget.style.borderColor = T.border; e.currentTarget.style.background = "#fff"; }}
                  >{t}</div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── FEATURED PROJECT ── */}
        <section id="work" ref={projectRef} style={{ padding:"8rem 0", position:"relative", zIndex:1 }}>
          <div style={{ maxWidth:"1280px", margin:"0 auto", padding:"0 2.5rem" }}>
            <SectionHead label="Featured Work" title="Selected Case Study"
              sub="One project, examined deeply. Problem → constraints → decisions → trade-offs → outcome." />

            <div style={{
              borderRadius:"20px", overflow:"hidden",
              border:`1.5px solid ${T.border2}`, background:"#fff",
              boxShadow:"0 4px 28px rgba(0,0,0,0.06)",
              opacity: projectIn ? 1 : 0,
              animation: projectIn ? "fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) both" : "none",
              transition:"transform 0.35s ease, box-shadow 0.35s ease",
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 24px 70px rgba(0,0,0,0.11)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 28px rgba(0,0,0,0.06)"; }}
            >
              {/* Banner */}
              <div style={{ height:"200px", background:`linear-gradient(135deg, rgba(26,26,255,0.06), rgba(13,155,107,0.04))`,
                borderBottom:`1px solid ${T.border}`, display:"flex", alignItems:"center", justifyContent:"center",
                position:"relative", overflow:"hidden" }}>
                {/* grid */}
                <div style={{ position:"absolute", inset:0, backgroundImage:`linear-gradient(rgba(26,26,255,0.05) 1px,transparent 1px), linear-gradient(90deg,rgba(26,26,255,0.05) 1px,transparent 1px)`, backgroundSize:"44px 44px" }} />
                {/* accent line */}
                <div style={{ position:"absolute", bottom:0, left:0, right:0, height:"3px", background:`linear-gradient(90deg,${T.accent},${T.green})`, opacity:0.4 }} />
                <div style={{ position:"relative", zIndex:1, textAlign:"center" }}>
                  <span className="label" style={{ display:"block", marginBottom:"0.75rem" }}>{featuredProject.tag}</span>
                  <div className="display" style={{ fontSize:"1.9rem", fontWeight:700, color:T.text }}>{featuredProject.title}</div>
                </div>
              </div>

              {/* Content */}
              <div className="project-inner" style={{ padding:"2.5rem 3rem", display:"grid", gridTemplateColumns:"1fr 240px", gap:"3rem", alignItems:"start" }}>
                <div>
                  {/* Problem + Solution */}
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"2rem", marginBottom:"2rem" }}>
                    {[
                      { label:"The Problem", body: featuredProject.problem, c: "#dc2626" },
                      { label:"The Solution", body: featuredProject.solution, c: T.green },
                    ].map((x,i) => (
                      <div key={i} style={{ padding:"1.5rem", borderRadius:"12px", background:T.surface, border:`1px solid ${T.border}` }}>
                        <div className="mono" style={{ fontSize:"0.65rem", letterSpacing:"0.15em", color:x.c, marginBottom:"0.7rem" }}>{x.label}</div>
                        <p style={{ fontSize:"0.875rem", color:T.muted2, lineHeight:1.75 }}>{x.body}</p>
                      </div>
                    ))}
                  </div>

                  {/* Tech */}
                  <div style={{ display:"flex", flexWrap:"wrap", gap:"0.55rem" }}>
                    {featuredProject.tech.map((t,i) => (
                      <span key={i} style={{ padding:"0.3rem 0.8rem", borderRadius:"7px",
                        background:T.surface, border:`1px solid ${T.border}`,
                        fontSize:"0.75rem", color:T.muted2, fontFamily:"'DM Mono',monospace" }}>{t}</span>
                    ))}
                  </div>
                </div>

                {/* Stats + CTA */}
                <div style={{ display:"flex", flexDirection:"column", gap:"1.25rem" }}>
                  {featuredProject.stats.map((s,i) => (
                    <div key={i} style={{ textAlign:"right", paddingBottom:"1.25rem", borderBottom: i < 2 ? `1px solid ${T.border}` : "none" }}>
                      <div style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"1.9rem", fontWeight:700, color:T.accent, letterSpacing:"-0.03em" }}>{s.value}</div>
                      <div style={{ fontSize:"0.77rem", color:T.muted, marginTop:"0.2rem" }}>{s.label}</div>
                    </div>
                  ))}
                  <Btn primary onClick={() => navigate("/projects")} style={{ justifyContent:"center", marginTop:"0.5rem" }}>
                    See All Work <ArrowRight size={14} />
                  </Btn>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── DESIGN TRADE-OFFS ── */}
        <section id="tradeoffs" ref={tradeoffRef} style={{ padding:"8rem 0", background:T.surface, position:"relative", zIndex:1 }}>
          <div style={{ maxWidth:"1280px", margin:"0 auto", padding:"0 2.5rem" }}>
            <SectionHead label="Engineering Maturity" title="Trade-offs I've Made"
              sub="Real product decisions involve real constraints. Here's how I think about them." />

            <div className="tradeoffs-grid" style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:"1.25rem" }}>
              {tradeoffs.map((t,i) => (
                <div key={i} className="card" style={{
                  padding:"2.2rem",
                  opacity: tradeoffIn ? 1 : 0,
                  animation: tradeoffIn ? `fadeUp 0.65s cubic-bezier(0.16,1,0.3,1) ${i*0.1}s both` : "none",
                  transition:"all 0.3s ease",
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(26,26,255,0.2)"; e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 16px 48px rgba(0,0,0,0.07)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.04)"; }}
                >
                  {/* Decision badge */}
                  <div style={{ display:"inline-flex", alignItems:"center", gap:"0.5rem", padding:"0.35rem 0.85rem",
                    borderRadius:"999px", background:T.accentSub, border:`1px solid rgba(26,26,255,0.15)`,
                    marginBottom:"1.2rem" }}>
                    <span className="mono" style={{ fontSize:"0.65rem", color:T.accent, letterSpacing:"0.1em" }}>DECISION</span>
                  </div>
                  <div style={{ fontSize:"0.95rem", fontWeight:700, color:T.text, marginBottom:"0.9rem", lineHeight:1.4 }}>{t.decision}</div>
                  <p style={{ fontSize:"0.875rem", color:T.muted2, lineHeight:1.75 }}>{t.reason}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SKILLS ── */}
        <section id="skills" ref={skillsRef} style={{ padding:"8rem 0", position:"relative", zIndex:1 }}>
          <div style={{ maxWidth:"1280px", margin:"0 auto", padding:"0 2.5rem" }}>
            <SectionHead label="Expertise" title="Skills & Competencies" />
            <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:"1.25rem" }}>
              {skillGroups.map((g,i) => (
                <div key={i} className="card" style={{
                  padding:"2.2rem",
                  opacity: skillsIn ? 1 : 0,
                  animation: skillsIn ? `fadeUp 0.65s cubic-bezier(0.16,1,0.3,1) ${i*0.12}s both` : "none",
                  transition:"all 0.3s ease",
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.borderColor = `${g.color}35`; e.currentTarget.style.boxShadow = "0 20px 56px rgba(0,0,0,0.09)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.borderColor = T.border; e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.04)"; }}
                >
                  <div style={{ display:"flex", alignItems:"center", gap:"0.75rem", marginBottom:"1rem" }}>
                    <div style={{ width:"9px", height:"9px", borderRadius:"50%", background:g.dot, boxShadow:`0 0 12px ${g.dot}` }} />
                    <span style={{ fontSize:"0.93rem", fontWeight:700, color:T.text }}>{g.category}</span>
                  </div>
                  <p style={{ fontSize:"0.85rem", color:T.muted, lineHeight:1.7, marginBottom:"1.4rem" }}>{g.desc}</p>
                  <div style={{ display:"flex", flexWrap:"wrap", gap:"0.5rem" }}>
                    {g.skills.map((sk,j) => (
                      <span key={j} style={{
                        padding:"0.3rem 0.75rem", borderRadius:"7px",
                        background:`${g.color}0d`, border:`1px solid ${g.color}28`,
                        fontSize:"0.73rem", fontWeight:500, color:g.color,
                        fontFamily:"'DM Mono',monospace",
                      }}>{sk}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── ACHIEVEMENTS ── */}
        <section id="achievements" ref={achievRef} style={{ padding:"8rem 0", background:T.surface, position:"relative", zIndex:1 }}>
          <div style={{ maxWidth:"1280px", margin:"0 auto", padding:"0 2.5rem" }}>
            <SectionHead label="Credentials" title="Certifications & Awards" />
            <div style={{ position:"relative", paddingLeft:"4px" }}>
              {/* line */}
              <div style={{ position:"absolute", left:"19px", top:"20px", bottom:"20px", width:"1.5px",
                background:`linear-gradient(180deg,${T.accent},${T.green})`,
                opacity: achievIn ? 1 : 0, animation: achievIn ? "fadeIn 1s ease 0.3s both" : "none" }} />
              <div style={{ display:"flex", flexDirection:"column" }}>
                {achievements.map((a,i) => (
                  <div key={i} style={{ display:"flex", gap:"2.2rem", alignItems:"center", padding:"0.9rem 0",
                    opacity: achievIn ? 1 : 0,
                    animation: achievIn ? `fadeUp 0.6s cubic-bezier(0.16,1,0.3,1) ${i*0.1}s both` : "none",
                  }}>
                    <div style={{ width:"38px", height:"38px", minWidth:"38px", borderRadius:"50%",
                      background:"#fff", border:`2px solid ${a.color}`,
                      display:"flex", alignItems:"center", justifyContent:"center",
                      position:"relative", zIndex:1, boxShadow:`0 0 0 5px ${T.surface}`,
                      transition:"all 0.25s ease", cursor:"default",
                    }}
                    onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.12)"; e.currentTarget.style.boxShadow = `0 0 0 10px ${a.color}18, 0 0 0 5px ${T.surface}`; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = `0 0 0 5px ${T.surface}`; }}
                    ><CheckCircle size={16} style={{ color:a.color }} /></div>

                    <div className="card" style={{ flex:1, padding:"1.1rem 1.6rem",
                      display:"flex", alignItems:"center", justifyContent:"space-between", gap:"1.2rem",
                      transition:"all 0.3s ease",
                    }}
                    onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 14px 40px rgba(0,0,0,0.07)"; e.currentTarget.style.borderColor = `${a.color}35`; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.04)"; e.currentTarget.style.borderColor = T.border; }}
                    >
                      <div>
                        <div style={{ fontSize:"0.93rem", fontWeight:600, color:T.text, marginBottom:"0.25rem" }}>{a.title}</div>
                        <div style={{ fontSize:"0.78rem", color:T.muted }}>{a.issuer}</div>
                      </div>
                      <div style={{ display:"flex", alignItems:"center", gap:"0.9rem", flexShrink:0 }}>
                        <span className="mono" style={{ fontSize:"0.72rem", color:T.muted, fontWeight:500 }}>{a.year}</span>
                        <span style={{ display:"inline-flex", alignItems:"center", gap:"0.35rem",
                          padding:"0.25rem 0.7rem", borderRadius:"999px",
                          background:`${a.color}10`, border:`1px solid ${a.color}35`,
                          fontSize:"0.68rem", fontWeight:600, color:a.color,
                        }}><Verified size={10} /> Verified</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── TESTIMONIALS ── */}
        <section ref={testRef} style={{ padding:"8rem 0", position:"relative", zIndex:1 }}>
          <div style={{ maxWidth:"1280px", margin:"0 auto", padding:"0 2.5rem" }}>
            <div style={{ marginBottom:"4rem", display:"flex", alignItems:"flex-end", justifyContent:"space-between", flexWrap:"wrap", gap:"1.5rem" }}>
              <SectionHead label="Social Proof" title="What Leaders Say" />
              <div style={{ display:"flex", gap:"0.6rem" }}>
                {[ChevronLeft,ChevronRight].map((Icon,i) => (
                  <button key={i} onClick={() => setTestIdx(p => i===0 ? (p-1+testimonials.length)%testimonials.length : (p+1)%testimonials.length)}
                    style={{ width:"42px", height:"42px", borderRadius:"10px", background:T.surface,
                      border:`1px solid ${T.border2}`, cursor:"pointer", display:"flex", alignItems:"center",
                      justifyContent:"center", color:T.muted2, transition:"all 0.25s ease" }}
                    onMouseEnter={e => { e.currentTarget.style.background = T.accentSub; e.currentTarget.style.borderColor = T.accent; e.currentTarget.style.color = T.accent; }}
                    onMouseLeave={e => { e.currentTarget.style.background = T.surface; e.currentTarget.style.borderColor = T.border2; e.currentTarget.style.color = T.muted2; }}
                  ><Icon size={17} /></button>
                ))}
              </div>
            </div>

            <div style={{ position:"relative", minHeight:"240px" }}>
              {testimonials.map((t,i) => (
                <div key={i} className="card" style={{
                  position: i === testIdx ? "relative" : "absolute",
                  top:0, left:0, right:0,
                  padding:"2.8rem",
                  opacity: i === testIdx ? 1 : 0,
                  visibility: i === testIdx ? "visible" : "hidden",
                  transform: i === testIdx ? "translateY(0) scale(1)" : "translateY(20px) scale(0.97)",
                  transition:"all 0.55s cubic-bezier(0.16,1,0.3,1)",
                  boxShadow: i === testIdx ? "0 20px 64px rgba(0,0,0,0.09)" : "none",
                }}>
                  <div style={{ display:"flex", gap:"2.2rem", alignItems:"flex-start", flexWrap:"wrap" }}>
                    <div style={{ width:"58px", height:"58px", minWidth:"58px", borderRadius:"14px",
                      background:`${t.color}10`, border:`2px solid ${t.color}30`,
                      display:"flex", alignItems:"center", justifyContent:"center",
                      fontSize:"1rem", fontWeight:700, color:t.color,
                      fontFamily:"'Playfair Display',serif" }}>{t.avatar}</div>
                    <div style={{ flex:1 }}>
                      <blockquote style={{ fontSize:"1.05rem", lineHeight:1.8, color:T.muted2, marginBottom:"1.5rem",
                        fontStyle:"italic", maxWidth:"700px" }}>"{t.quote}"</blockquote>
                      <div style={{ fontSize:"0.92rem", fontWeight:600, color:T.text }}>{t.name}</div>
                      <div style={{ fontSize:"0.82rem", color:T.muted }}>{t.role}</div>
                    </div>
                  </div>
                  {/* dots */}
                  <div style={{ display:"flex", gap:"0.5rem", marginTop:"2rem", justifyContent:"flex-end" }}>
                    {testimonials.map((_,di) => (
                      <button key={di} onClick={() => setTestIdx(di)} style={{
                        width: di===testIdx?"24px":"7px", height:"7px", borderRadius:"4px",
                        border:"none", cursor:"pointer",
                        background: di===testIdx ? t.color : T.border2,
                        transition:"all 0.35s cubic-bezier(0.16,1,0.3,1)",
                      }} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA SECTION ── */}
        <section id="contact" ref={ctaRef} style={{ padding:"8rem 0 10rem", position:"relative", zIndex:1 }}>
          <div style={{ maxWidth:"1280px", margin:"0 auto", padding:"0 2.5rem" }}>
            <div style={{
              borderRadius:"24px", padding:"5rem 4.5rem",
              background:`linear-gradient(135deg, ${T.ink} 0%, #0a0a3a 100%)`,
              border:`1px solid rgba(255,255,255,0.06)`,
              position:"relative", overflow:"hidden",
              opacity: ctaIn ? 1 : 0,
              animation: ctaIn ? "fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) both" : "none",
            }}>
              {/* accent blobs */}
              <div style={{ position:"absolute", right:"-8%", top:"-30%", width:"420px", height:"420px", borderRadius:"50%",
                background:"radial-gradient(circle, rgba(26,26,255,0.18), transparent 70%)", filter:"blur(70px)", pointerEvents:"none" }} />
              <div style={{ position:"absolute", left:"30%", bottom:"-20%", width:"300px", height:"300px", borderRadius:"50%",
                background:"radial-gradient(circle, rgba(13,155,107,0.15), transparent 70%)", filter:"blur(60px)", pointerEvents:"none" }} />

              <div style={{ position:"relative", zIndex:1, maxWidth:"680px" }}>
                <span className="label" style={{ display:"block", marginBottom:"1.5rem", color:"rgba(26,26,255,0.7)" }}>Let's build something that scales</span>

                <h2 className="display" style={{ fontSize:"clamp(2.5rem,5vw,3.6rem)", color:"#fff", marginBottom:"1.5rem", lineHeight:1.05, fontWeight:700 }}>
                  Ready to Design
                  <br />
                  <span style={{ color:T.accent }}>Something That Scales.</span>
                </h2>

                <p style={{ fontSize:"1rem", color:"rgba(255,255,255,0.6)", lineHeight:1.8, marginBottom:"3rem", maxWidth:"520px" }}>
                  Seeking full-time engineering roles where I can ship AI-powered products, architect scalable systems, and grow alongside exceptional teams. I bring product thinking to every line of code.
                </p>

                <div style={{ display:"flex", gap:"1rem", flexWrap:"wrap", marginBottom:"3rem" }}>
                  <Btn primary href="mailto:g.sivasatyasaibhagavan@gmail.com">Schedule Interview <ArrowRight size={15} /></Btn>
                  <Btn onClick={() => navigate("/projects")} style={{ borderColor:"rgba(255,255,255,0.18)", color:"rgba(255,255,255,0.75)", background:"transparent" }}>
                    View Portfolio <ExternalLink size={14} />
                  </Btn>
                </div>

                <div style={{ display:"flex", gap:"2.5rem", flexWrap:"wrap", paddingTop:"2.5rem", borderTop:"1px solid rgba(255,255,255,0.08)" }}>
                  {[
                    { icon:Mail,  href:"mailto:g.sivasatyasaibhagavan@gmail.com", label:"g.sivasatyasaibhagavan@gmail.com" },
                    { icon:Phone, href:"tel:+917569205626",                        label:"+91 7569205626" },
                  ].map((c,i) => (
                    <a key={i} href={c.href} style={{ display:"flex", alignItems:"center", gap:"0.55rem",
                      color:"rgba(255,255,255,0.5)", textDecoration:"none", fontSize:"0.88rem", transition:"color 0.2s" }}
                    onMouseEnter={e => e.currentTarget.style.color = "#fff"}
                    onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.5)"}
                    ><c.icon size={15} style={{ color:T.accent, flexShrink:0 }} />{c.label}</a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            MEGA FOOTER
        ══════════════════════════════════════════════════════════ */}
        <footer style={{ background: T.ink, position:"relative", zIndex:1, overflow:"hidden" }}>

          {/* ── Top wave separator ── */}
          <div style={{ position:"relative", height:"80px", overflow:"hidden", background: T.bg }}>
            <svg viewBox="0 0 1440 80" preserveAspectRatio="none"
              style={{ position:"absolute", bottom:0, left:0, width:"100%", height:"100%" }}>
              <path d="M0,0 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80 Z"
                fill={T.ink} />
            </svg>
          </div>

          {/* ── Animated background grid ── */}
          <div style={{ position:"absolute", inset:0, pointerEvents:"none", zIndex:0,
            backgroundImage:`linear-gradient(rgba(26,26,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(26,26,255,0.06) 1px, transparent 1px)`,
            backgroundSize:"64px 64px", animation:"gridFade 6s ease-in-out infinite" }} />

          {/* ── Glow blobs ── */}
          <div style={{ position:"absolute", left:"-5%", top:"20%", width:"500px", height:"500px", borderRadius:"50%",
            background:"radial-gradient(circle, rgba(26,26,255,0.14), transparent 70%)", filter:"blur(90px)", pointerEvents:"none",
            animation:"haloBreath 7s ease-in-out infinite" }} />
          <div style={{ position:"absolute", right:"0%", bottom:"10%", width:"380px", height:"380px", borderRadius:"50%",
            background:"radial-gradient(circle, rgba(13,155,107,0.1), transparent 70%)", filter:"blur(70px)", pointerEvents:"none",
            animation:"haloBreath 9s ease-in-out infinite 2s" }} />
          <div style={{ position:"absolute", right:"35%", top:"30%", width:"260px", height:"260px", borderRadius:"50%",
            background:"radial-gradient(circle, rgba(196,136,42,0.08), transparent 70%)", filter:"blur(50px)", pointerEvents:"none" }} />

          {/* ── Main content ── */}
          <div style={{ maxWidth:"1280px", margin:"0 auto", padding:"0 2.5rem", position:"relative", zIndex:1 }}>

            {/* ── BIG BRAND STATEMENT ── */}
            <div style={{ borderBottom:"1px solid rgba(255,255,255,0.07)", paddingBottom:"5rem", paddingTop:"5rem" }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", flexWrap:"wrap", gap:"3rem" }}>
                <div style={{ maxWidth:"640px" }}>
                  {/* Rotating availability badge */}
                  <div style={{ display:"inline-flex", alignItems:"center", gap:"0.55rem",
                    padding:"0.4rem 1rem", borderRadius:"999px",
                    background:"rgba(13,155,107,0.12)", border:"1px solid rgba(13,155,107,0.28)",
                    marginBottom:"2rem" }}>
                    <div style={{ width:"6px", height:"6px", borderRadius:"50%", background:T.green, animation:"pulseDot 2s ease-in-out infinite" }} />
                    <span className="mono" style={{ fontSize:"0.7rem", color:T.green, fontWeight:500 }}>OPEN TO OPPORTUNITIES · 2026</span>
                  </div>
                  <h2 className="display" style={{ fontSize:"clamp(3rem,6vw,5.5rem)", color:"#fff", fontWeight:700, lineHeight:1.02, marginBottom:"1.5rem" }}>
                    Let's Build Something
                    <br />
                    <span style={{ color:T.accent }}>Remarkable.</span>
                  </h2>
                  <p style={{ fontSize:"1.05rem", color:"rgba(255,255,255,0.5)", lineHeight:1.8, maxWidth:"480px" }}>
                    Full-stack engineer. Product thinker. AI systems architect. Ready to join a team that ships things that matter.
                  </p>
                </div>
                {/* Big CTA block */}
                <div style={{ display:"flex", flexDirection:"column", gap:"1rem", minWidth:"240px" }}>
                  <a href="mailto:g.sivasatyasaibhagavan@gmail.com"
                    className="shimmer-card"
                    style={{ display:"flex", alignItems:"center", gap:"1rem", justifyContent:"space-between",
                      padding:"1.3rem 1.6rem", borderRadius:"14px",
                      background:"rgba(26,26,255,0.15)", border:"1px solid rgba(26,26,255,0.35)",
                      textDecoration:"none", transition:"all 0.3s ease" }}
                    onMouseEnter={e => { e.currentTarget.style.background = "rgba(26,26,255,0.28)"; e.currentTarget.style.transform = "translateX(5px)"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "rgba(26,26,255,0.15)"; e.currentTarget.style.transform = "translateX(0)"; }}
                  >
                    <div>
                      <div style={{ fontSize:"0.7rem", color:"rgba(255,255,255,0.4)", fontFamily:"'DM Mono',monospace", letterSpacing:"0.1em", marginBottom:"0.3rem" }}>PRIMARY</div>
                      <div style={{ fontSize:"0.95rem", fontWeight:600, color:"#fff" }}>Schedule an Interview</div>
                    </div>
                    <ArrowUpRight size={18} style={{ color:T.accent, flexShrink:0 }} />
                  </a>
                  <a href={resumePdf} download
                    className="shimmer-card"
                    style={{ display:"flex", alignItems:"center", gap:"1rem", justifyContent:"space-between",
                      padding:"1.3rem 1.6rem", borderRadius:"14px",
                      background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.09)",
                      textDecoration:"none", transition:"all 0.3s ease" }}
                    onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.09)"; e.currentTarget.style.transform = "translateX(5px)"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.transform = "translateX(0)"; }}
                  >
                    <div>
                      <div style={{ fontSize:"0.7rem", color:"rgba(255,255,255,0.4)", fontFamily:"'DM Mono',monospace", letterSpacing:"0.1em", marginBottom:"0.3rem" }}>DOWNLOAD</div>
                      <div style={{ fontSize:"0.95rem", fontWeight:600, color:"#fff" }}>Full Resume / CV</div>
                    </div>
                    <Download size={17} style={{ color:"rgba(255,255,255,0.5)", flexShrink:0 }} />
                  </a>
                </div>
              </div>
            </div>

            {/* ── FOOTER MEGA GRID ── */}
            <div className="footer-mega" style={{ display:"grid", gridTemplateColumns:"2fr 1fr 1fr 1fr", gap:"4rem 5rem", padding:"5rem 0 4rem" }}>

              {/* Col 1 — Brand / About */}
              <div>
                <div className="display" style={{ fontSize:"1.6rem", fontWeight:700, color:"#fff", letterSpacing:"-0.04em", marginBottom:"1.2rem" }}>
                  Bhagavan<span style={{ color:T.accent }}>.</span>
                </div>
                <p style={{ fontSize:"0.875rem", color:"rgba(255,255,255,0.42)", lineHeight:1.8, marginBottom:"2rem", maxWidth:"300px" }}>
                  B.Tech AIDS · Ramachandra College of Engineering · Class of 2026. Building AI-powered systems with product thinking at the core.
                </p>
                {/* Social icons */}
                <div style={{ display:"flex", gap:"0.7rem" }}>
                  {[
                    { icon:Github,   href:"https://github.com/bhagavan444",    title:"GitHub",   hc:"#e5e7eb" },
                    { icon:Linkedin, href:"https://www.linkedin.com/in/gopalajosyula-siva-satya-sai-bhagavan-1624a027b/", title:"LinkedIn", hc:"#0a91fb" },
                    { icon:Mail,     href:"mailto:g.sivasatyasaibhagavan@gmail.com", title:"Email", hc:T.accent },
                    { icon:Globe,    href:"#",                                  title:"Portfolio", hc:T.green  },
                  ].map((s,i) => (
                    <a key={i} href={s.href} target={s.href.startsWith("http")?"_blank":undefined}
                      rel={s.href.startsWith("http")?"noopener noreferrer":undefined}
                      title={s.title}
                      style={{ width:"40px", height:"40px", borderRadius:"10px",
                        background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.1)",
                        display:"flex", alignItems:"center", justifyContent:"center",
                        color:"rgba(255,255,255,0.4)", textDecoration:"none",
                        transition:"all 0.25s cubic-bezier(0.16,1,0.3,1)" }}
                      onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.12)"; e.currentTarget.style.color = s.hc; e.currentTarget.style.borderColor = s.hc+"55"; e.currentTarget.style.transform = "translateY(-3px)"; }}
                      onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.color = "rgba(255,255,255,0.4)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.transform = "translateY(0)"; }}
                    ><s.icon size={16} /></a>
                  ))}
                </div>
              </div>

              {/* Col 2 — Navigation */}
              <div>
                <div style={{ fontSize:"0.7rem", fontFamily:"'DM Mono',monospace", letterSpacing:"0.18em",
                  color:"rgba(255,255,255,0.25)", textTransform:"uppercase", marginBottom:"1.5rem" }}>Navigate</div>
                <div style={{ display:"flex", flexDirection:"column", gap:"0.85rem" }}>
                  {[
                    { label:"About",        href:"#about"       },
                    { label:"Philosophy",   href:"#philosophy"  },
                    { label:"Process",      href:"#process"     },
                    { label:"Work",         href:"#work"        },
                    { label:"Skills",       href:"#skills"      },
                    { label:"Contact",      href:"#contact"     },
                  ].map((l,i) => (
                    <a key={i} href={l.href} className="footer-link"
                      style={{ animationDelay:`${i*0.05}s` }}>
                      {l.label}
                    </a>
                  ))}
                </div>
              </div>

              {/* Col 3 — Work */}
              <div>
                <div style={{ fontSize:"0.7rem", fontFamily:"'DM Mono',monospace", letterSpacing:"0.18em",
                  color:"rgba(255,255,255,0.25)", textTransform:"uppercase", marginBottom:"1.5rem" }}>Work</div>
                <div style={{ display:"flex", flexDirection:"column", gap:"0.85rem" }}>
                  {[
                    { label:"All Projects",       href:"/projects"  },
                    { label:"Case Studies",        href:"/projects"  },
                    { label:"GitHub Repos",        href:"https://github.com/bhagavan444", ext:true },
                    { label:"Resume / CV",         href:resumePdf, dl:true },
                    { label:"Certifications",      href:"#achievements" },
                    { label:"Tech Stack",          href:"#skills"    },
                  ].map((l,i) => (
                    <a key={i} href={l.href} className="footer-link"
                      download={l.dl || undefined}
                      target={l.ext?"_blank":undefined} rel={l.ext?"noopener noreferrer":undefined}>
                      <span style={{ display:"flex", alignItems:"center", gap:"0.4rem" }}>
                        {l.label}
                        {l.ext && <ArrowUpRight size={11} style={{ opacity:0.5 }} />}
                      </span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Col 4 — Contact */}
              <div>
                <div style={{ fontSize:"0.7rem", fontFamily:"'DM Mono',monospace", letterSpacing:"0.18em",
                  color:"rgba(255,255,255,0.25)", textTransform:"uppercase", marginBottom:"1.5rem" }}>Contact</div>
                <div style={{ display:"flex", flexDirection:"column", gap:"1.2rem" }}>
                  {[
                    { icon:Mail,  label:"Email",    value:"g.sivasatyasaibhagavan@gmail.com", href:"mailto:g.sivasatyasaibhagavan@gmail.com", short:"Send Email" },
                    { icon:Phone, label:"Phone",    value:"+91 7569205626", href:"tel:+917569205626", short:"Call Now" },
                    { icon:MapPin,label:"Location", value:"Andhra Pradesh, India", href:"#", short:"India / Remote" },
                    { icon:Globe, label:"Available", value:"Remote · Relocation Open", href:"#", short:"Open to Work" },
                  ].map((c,i) => (
                    <a key={i} href={c.href} style={{ textDecoration:"none", display:"block", transition:"all 0.2s" }}
                      onMouseEnter={e => e.currentTarget.style.transform = "translateX(4px)"}
                      onMouseLeave={e => e.currentTarget.style.transform = "translateX(0)"}
                    >
                      <div style={{ display:"flex", alignItems:"flex-start", gap:"0.7rem" }}>
                        <div style={{ width:"30px", height:"30px", borderRadius:"8px", background:"rgba(26,26,255,0.12)",
                          border:"1px solid rgba(26,26,255,0.2)", display:"flex", alignItems:"center", justifyContent:"center",
                          flexShrink:0, marginTop:"1px" }}>
                          <c.icon size={13} style={{ color:T.accent }} />
                        </div>
                        <div>
                          <div style={{ fontSize:"0.68rem", color:"rgba(255,255,255,0.3)", fontFamily:"'DM Mono',monospace",
                            letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:"0.2rem" }}>{c.label}</div>
                          <div style={{ fontSize:"0.82rem", color:"rgba(255,255,255,0.6)", lineHeight:1.4, wordBreak:"break-word" }}>{c.value}</div>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* ── SKILLS MARQUEE (footer) ── */}
            <div style={{ borderTop:"1px solid rgba(255,255,255,0.06)", paddingTop:"2.5rem", paddingBottom:"2.5rem", overflow:"hidden", position:"relative" }}>
              {["left","right"].map(side => (
                <div key={side} style={{ position:"absolute", [side]:0, top:0, bottom:0, width:"80px",
                  background:`linear-gradient(${side==="left"?"90deg":"270deg"}, ${T.ink}, transparent)`, zIndex:2, pointerEvents:"none" }} />
              ))}
              <div className="marquee-track-rev" style={{ opacity:0.3 }}>
                {["Full-Stack Engineering","AI/ML Architecture","Product Thinking","System Design","Cloud Infrastructure",
                  "UI/UX Engineering","API Design","Database Architecture","Performance Optimization","DevOps Fundamentals",
                  "Full-Stack Engineering","AI/ML Architecture","Product Thinking","System Design","Cloud Infrastructure",
                  "UI/UX Engineering","API Design","Database Architecture","Performance Optimization","DevOps Fundamentals",
                ].map((t,i) => (
                  <span key={i} style={{ display:"inline-block", margin:"0 2rem", fontSize:"0.78rem", fontFamily:"'DM Mono',monospace",
                    color:"rgba(255,255,255,0.5)", letterSpacing:"0.12em", textTransform:"uppercase", whiteSpace:"nowrap" }}>
                    {t} <span style={{ color:T.accent, margin:"0 0.5rem" }}>✦</span>
                  </span>
                ))}
              </div>
            </div>

            {/* ── STATS ROW ── */}
            <div style={{ borderTop:"1px solid rgba(255,255,255,0.06)", padding:"2.5rem 0", display:"grid",
              gridTemplateColumns:"repeat(4,1fr)", gap:"2rem" }}>
              {[
                { value:"5+",    label:"Systems Shipped",    icon:Cpu,      c:T.accent },
                { value:"20+",   label:"Certifications",     icon:Award,    c:T.gold   },
                { value:"300+",  label:"Coding Streak Days", icon:Terminal, c:T.green  },
                { value:"100+",  label:"DSA Problems",       icon:Code2,    c:"#7c3aed"},
              ].map((s,i) => (
                <div key={i} style={{ display:"flex", alignItems:"center", gap:"1rem" }}>
                  <div style={{ width:"40px", height:"40px", borderRadius:"10px",
                    background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.08)",
                    display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                    <s.icon size={17} style={{ color:s.c }} />
                  </div>
                  <div>
                    <div style={{ fontFamily:"'Playfair Display',serif", fontSize:"1.4rem", fontWeight:700,
                      color:"#fff", letterSpacing:"-0.03em", lineHeight:1 }}>{s.value}</div>
                    <div style={{ fontSize:"0.75rem", color:"rgba(255,255,255,0.35)", marginTop:"0.2rem" }}>{s.label}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* ── BOTTOM BAR ── */}
            <div className="footer-bottom" style={{ borderTop:"1px solid rgba(255,255,255,0.06)", padding:"2rem 0",
              display:"flex", alignItems:"center", justifyContent:"space-between", gap:"1.5rem", flexWrap:"wrap" }}>

              <div style={{ display:"flex", alignItems:"center", gap:"0.7rem" }}>
                <div className="mono" style={{ fontSize:"0.73rem", color:"rgba(255,255,255,0.28)" }}>
                  © 2026 Siva Satya Sai Bhagavan · All rights reserved
                </div>
                <span style={{ color:"rgba(255,255,255,0.15)", fontSize:"0.7rem" }}>·</span>
                <div className="mono" style={{ fontSize:"0.73rem", color:"rgba(255,255,255,0.2)" }}>
                  Designed & engineered with <Heart size={10} style={{ display:"inline", color:"#e55", margin:"0 2px" }} /> precision
                </div>
              </div>

              <div style={{ display:"flex", alignItems:"center", gap:"1.5rem" }}>
                {[
                  { label:"Privacy", href:"#" },
                  { label:"Terms",   href:"#" },
                  { label:"Sitemap", href:"#" },
                ].map((l,i) => (
                  <a key={i} href={l.href} className="footer-link"
                    style={{ fontSize:"0.73rem" }}>{l.label}</a>
                ))}
              </div>

              <div style={{ display:"flex", alignItems:"center", gap:"0.5rem" }}>
                <div style={{ width:"6px", height:"6px", borderRadius:"50%", background:T.green, animation:"pulseDot 2s ease-in-out infinite" }} />
                <span className="mono" style={{ fontSize:"0.72rem", color:T.green }}>Available for hire</span>
              </div>
            </div>
          </div>
        </footer>
      </main>

      {/* Floating utilities */}
      <CustomCursor />
      <ScrollToTop />
    </>
  );
}