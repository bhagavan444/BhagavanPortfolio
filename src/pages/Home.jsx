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
  accent:   "#1a1aff",
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
  @keyframes ripple {
    0%   { transform: scale(0); opacity: 0.4; }
    100% { transform: scale(4); opacity: 0; }
  }
  @keyframes staggerFade {
    from { opacity:0; transform: translateY(20px); }
    to   { opacity:1; transform: translateY(0); }
  }
  @keyframes haloBreath {
    0%,100% { opacity:0.12; transform:scale(1); }
    50%      { opacity:0.22; transform:scale(1.06); }
  }
  @keyframes slideUp {
    from { opacity:0; transform: translateY(40px); }
    to   { opacity:1; transform: translateY(0); }
  }
  @keyframes revealWidth {
    from { width: 0; }
    to   { width: 100%; }
  }
  @keyframes pulseRing {
    0%   { transform: scale(1);   opacity: 0.6; }
    100% { transform: scale(2.2); opacity: 0; }
  }
  @keyframes scanLine {
    0%   { top: 0%; }
    100% { top: 100%; }
  }
  @keyframes numberFlip {
    0%  { opacity:0; transform: translateY(12px); }
    20% { opacity:1; transform: translateY(0); }
    80% { opacity:1; transform: translateY(0); }
    100%{ opacity:0; transform: translateY(-12px); }
  }
  @keyframes glowPulse {
    0%,100% { box-shadow: 0 0 0 0 rgba(26,26,255,0); }
    50%     { box-shadow: 0 0 32px 8px rgba(26,26,255,0.15); }
  }
  @keyframes floatY {
    0%,100% { transform: translateY(0px) rotate(0deg); }
    33%     { transform: translateY(-10px) rotate(1deg); }
    66%     { transform: translateY(-6px) rotate(-1deg); }
  }
  @keyframes textGradientShift {
    0%   { background-position: 0% 50%; }
    50%  { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  @keyframes borderGlow {
    0%,100% { border-color: rgba(26,26,255,0.15); }
    50%     { border-color: rgba(26,26,255,0.45); }
  }
  @keyframes slideInFromLeft {
    from { opacity:0; transform: translateX(-32px); }
    to   { opacity:1; transform: translateX(0); }
  }
  @keyframes slideInFromRight {
    from { opacity:0; transform: translateX(32px); }
    to   { opacity:1; transform: translateX(0); }
  }
  @keyframes statReveal {
    from { opacity:0; transform: translateY(16px) scale(0.92); }
    to   { opacity:1; transform: translateY(0) scale(1); }
  }

  /* Shimmer sweep for project cards */
  .project-shimmer {
    position: relative;
    overflow: hidden;
  }
  .project-shimmer::before {
    content: '';
    position: absolute;
    top: 0; left: -100%; width: 60%; height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.035), transparent);
    transition: none;
    z-index: 0;
  }
  .project-shimmer:hover::before {
    animation: shimmerPass 1s ease forwards;
  }

  /* Stat hover pulse */
  .stat-hover:hover {
    animation: glowPulse 1.2s ease-in-out;
  }

  /* Gradient text */
  .gradient-text {
    background: linear-gradient(135deg, #1a1aff 0%, #0d9b6b 100%);
    background-size: 200% 200%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: textGradientShift 4s ease infinite;
  }

  /* Scroll reveal stagger classes */
  .sr-1 { animation: slideUp 0.65s cubic-bezier(0.16,1,0.3,1) 0.05s both; }
  .sr-2 { animation: slideUp 0.65s cubic-bezier(0.16,1,0.3,1) 0.15s both; }
  .sr-3 { animation: slideUp 0.65s cubic-bezier(0.16,1,0.3,1) 0.25s both; }
  .sr-4 { animation: slideUp 0.65s cubic-bezier(0.16,1,0.3,1) 0.35s both; }

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

  .marquee-track { display:flex; width:max-content; animation: marquee 38s linear infinite; }
  .marquee-track:hover { animation-play-state: paused; }
  .marquee-track-rev { display:flex; width:max-content; animation: marqueeReverse 42s linear infinite; }
  .marquee-track-rev:hover { animation-play-state: paused; }

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

  .reveal-section {
    opacity: 0;
    transform: translateY(32px);
    transition: opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1);
  }
  .reveal-section.visible {
    opacity: 1;
    transform: translateY(0);
  }

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
      onMouseEnter={e => { e.currentTarget.style.background = T.accent; e.currentTarget.style.transform = "translateY(-4px) scale(1.1) rotate(-8deg)"; e.currentTarget.style.boxShadow = "0 12px 32px rgba(26,26,255,0.4)"; }}
      onMouseLeave={e => { e.currentTarget.style.background = T.ink; e.currentTarget.style.transform = "translateY(0) scale(1) rotate(0deg)"; e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.25)"; }}
    ><ChevronUp size={18} /></button>
  );
}
/* ═══════════════════════════════════════════════════════════════
   FLOATING PARTICLES — subtle ambient motion
═══════════════════════════════════════════════════════════════ */
function FloatingParticles() {
  const particles = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    left: `${5 + (i * 17 + i * i * 3) % 88}%`,
    top:  `${10 + (i * 23 + i * 7) % 80}%`,
    size: 2 + (i % 3),
    dur:  8 + (i % 7) * 2,
    delay: (i % 5) * 1.5,
    opacity: 0.04 + (i % 4) * 0.02,
    color: i % 3 === 0 ? "#1a1aff" : i % 3 === 1 ? "#0d9b6b" : "#c4882a",
  }));
  return (
    <div style={{ position:"fixed", inset:0, zIndex:0, pointerEvents:"none", overflow:"hidden" }}>
      {particles.map(p => (
        <div key={p.id} style={{
          position:"absolute", left:p.left, top:p.top,
          width:`${p.size}px`, height:`${p.size}px`,
          borderRadius:"50%", background:p.color,
          opacity:p.opacity,
          animation:`floatY ${p.dur}s ease-in-out ${p.delay}s infinite`,
        }} />
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   ANIMATED SECTION DIVIDER
═══════════════════════════════════════════════════════════════ */
function SectionDivider({ flip = false }) {
  return (
    <div style={{ position:"relative", height:"1px", overflow:"visible",
      margin: flip ? "-1px 0 0" : "0 0 -1px" }}>
      <div style={{ position:"absolute", left:"50%", top:"-12px", transform:"translateX(-50%)",
        display:"flex", alignItems:"center", gap:"12px" }}>
        <div style={{ width:"40px", height:"1px", background:`linear-gradient(90deg, transparent, rgba(26,26,255,0.3))` }} />
        <div style={{ width:"4px", height:"4px", borderRadius:"50%", background:"rgba(26,26,255,0.3)",
          animation:"pulseDot 3s ease-in-out infinite" }} />
        <div style={{ width:"40px", height:"1px", background:`linear-gradient(90deg, rgba(26,26,255,0.3), transparent)` }} />
      </div>
    </div>
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
      <div style={{ display:"flex", alignItems:"center", gap:"0.75rem", marginBottom:"1rem" }}>
        <div style={{ width:"28px", height:"1.5px", background: light ? "rgba(26,26,255,0.6)" : T.accent,
          animation:"revealWidth 0.8s cubic-bezier(0.16,1,0.3,1) 0.1s both" }} />
        <span className="label" style={{ color: light ? "rgba(26,26,255,0.7)" : T.accent }}>
          {label}
        </span>
      </div>
      <h2 className="display" style={{
        fontSize: "clamp(2.2rem,4.5vw,3.2rem)",
        color: light ? "#fff" : T.text,
        maxWidth: "620px",
        fontWeight: 700,
        animation: "slideUp 0.7s cubic-bezier(0.16,1,0.3,1) 0.15s both",
      }}>{title}</h2>
      {sub && <p style={{ marginTop: "1rem", fontSize: "1.05rem", color: light ? "rgba(255,255,255,0.65)" : T.muted, maxWidth: "520px", lineHeight: 1.7,
        animation: "slideUp 0.7s cubic-bezier(0.16,1,0.3,1) 0.25s both" }}>{sub}</p>}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   HOME
═══════════════════════════════════════════════════════════════ */
/* ═══════════════════════════════════════════════════════════════
   TYPEWRITER ROLE BADGE
═══════════════════════════════════════════════════════════════ */
function TypewriterRole({ roles }) {
  const [roleIdx, setRoleIdx] = useState(0);
  const [display, setDisplay] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [charIdx, setCharIdx] = useState(0);

  useEffect(() => {
    const current = roles[roleIdx];
    let timer;
    if (!deleting) {
      if (charIdx < current.length) {
        timer = setTimeout(() => { setDisplay(current.slice(0, charIdx + 1)); setCharIdx(c => c + 1); }, 65);
      } else {
        timer = setTimeout(() => setDeleting(true), 2200);
      }
    } else {
      if (charIdx > 0) {
        timer = setTimeout(() => { setDisplay(current.slice(0, charIdx - 1)); setCharIdx(c => c - 1); }, 35);
      } else {
        setDeleting(false);
        setRoleIdx(r => (r + 1) % roles.length);
      }
    }
    return () => clearTimeout(timer);
  }, [charIdx, deleting, roleIdx, roles]);

  return (
    <span style={{ fontWeight:700, color:T.text }}>
      {display}
      <span style={{ borderRight:`2px solid ${T.accent}`, marginLeft:"1px", animation:"blink 0.8s step-end infinite" }} />
    </span>
  );
}

export default function Home() {
  const navigate = useNavigate();
  const [scrolled, setScrolled]   = useState(false);
  const [scrollPct, setScrollPct] = useState(0);
  const [testIdx, setTestIdx]     = useState(0);

  useEffect(() => {
    const fn = () => {
      setScrolled(window.scrollY > 40);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrollPct((window.scrollY / max) * 100);
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setTestIdx(p => (p + 1) % testimonials.length), 6000);
    return () => clearInterval(t);
  }, []);

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

  /* ────────────────── DATA (Updated from resume) ────────────────── */

  const metrics = [
    { value: "3",  suffix: "",  label: "Industry Internships",   sub: "MERN, AI/ML, Data Science",          color: T.accent },
    { value: "4",  suffix: "+", label: "Production Projects",    sub: "Full-stack & AI shipped",            color: T.gold   },
    { value: "10", suffix: "+", label: "Technologies",           sub: "Python, MERN, TensorFlow & more",    color: T.green  },
    { value: "95", suffix: "%", label: "Class X Score",          sub: "Montessori English Medium School",   color: "#b45309"},
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
    { value: "3",    label: "Internships Completed",        sub: "MERN · AI/ML · Data Science",       icon: Award      },
    { value: "CNN",  label: "Models Deployed to Flask",     sub: "Real-time inference pipelines",      icon: Cpu        },
    { value: "OAuth",label: "Secure Auth Implemented",      sub: "Google + GitHub OAuth in ATS app",   icon: Shield     },
    { value: "<1s",  label: "Async API Response Time",      sub: "AI chatbot backend latency target",  icon: Zap        },
  ];

  const tradeoffs = [
    { decision: "Chose MongoDB over SQL for ATS Resume Builder",         reason: "Resume data is inherently unstructured — sections, skills, and experience blocks vary per user. MongoDB's flexible schema meant no migrations every sprint as features evolved." },
    { decision: "Flask over FastAPI for ML inference",                   reason: "Team familiarity with Flask and the performance delta didn't justify migration cost at our internship scale. Predictability and faster delivery > marginal speed gains." },
    { decision: "TF-IDF over deep NLP for Fake News Detection",          reason: "TF-IDF + Logistic Regression gave interpretable, accurate results without GPU infrastructure. Deep NLP would've added complexity without meaningful accuracy gain on our dataset." },
    { decision: "Async requests over WebSockets for AI Chatbot",         reason: "Given single-user chat sessions, polling-style async calls simplified the backend enormously. WebSockets would have added stateful infra overhead without UX benefit at this scale." },
  ];

  const skillGroups = [
    { category: "AI & Machine Learning", color: "#7c3aed", dot: "#7c3aed",
      skills: ["TensorFlow","Keras","Scikit-learn","CNN","NLP (TF-IDF)","Supervised Learning","Deep Learning Fundamentals"],
      desc: "Built and deployed CNN image classifiers, fake news detectors, and career recommendation pipelines." },
    { category: "Full-Stack Engineering", color: T.accent, dot: T.accent,
      skills: ["React.js","Node.js","Express.js","MongoDB","JavaScript","REST APIs","OAuth (Google/GitHub)"],
      desc: "End-to-end MERN applications with secure auth, PDF parsing, and ATS-compatible resume scoring." },
    { category: "Backend & Integration", color: T.green, dot: T.green,
      skills: ["Flask","PDF Parsing","API Integration","Async Requests","JDBC","SQL"],
      desc: "Backend services connecting ML models to web frontends via RESTful Flask APIs." },
    { category: "Tools & Foundations",  color: T.gold, dot: T.gold,
      skills: ["Python","Java","C","Git","GitHub","Postman","VS Code","OOP","DSA Fundamentals"],
      desc: "Strong CS fundamentals — OOP in Java/Python, DSA practice, and collaborative engineering workflows." },
  ];

  const techStack = [
    "React.js","Node.js","Express.js","MongoDB","JavaScript","Python",
    "TensorFlow","Keras","Flask","Scikit-learn","HTML5","CSS3",
    "Git","GitHub","REST APIs","Postman","Java","SQL",
  ];

  const achievements = [
    { year:"2025", title:"MERN Stack Internship",               issuer:"StudyOwl Education Pvt Ltd · May–July 2025",                    color: T.accent },
    { year:"2025", title:"AI/ML Internship – Smart Sorting",    issuer:"SmartBridge (Remote) · May–June 2025",                          color: "#7c3aed"},
    { year:"2024", title:"ML & Data Science Internship",        issuer:"Blackbucks (Remote) · May–June 2024",                           color: T.green  },
    { year:"2025", title:"24-Hour Hackathon Finalist",          issuer:"Brainovision × Ramachandra College of Engineering",             color: T.gold   },
    { year:"2025", title:"Google Generative AI (Gemini) Cert",  issuer:"Google · Generative AI Fundamentals",                           color: T.accent },
    { year:"2025", title:"IBM SkillsBuild – AI & LLMs",         issuer:"IBM · Artificial Intelligence Fundamentals + LLM Certificate",  color: "#7c3aed"},
    { year:"2025", title:"AWS & Azure Cloud Basics",            issuer:"Simplilearn · Machine Learning with Python + AWS Basics",       color: T.green  },
    { year:"2025", title:"Full Stack Dev – Infosys Springboard",issuer:"Infosys Springboard · Python & Java Full Stack Certification",  color: T.gold   },
  ];

  const testimonials = [
    { quote: "Bhagavan led the backend architecture during our 24-hour hackathon at Ramachandra College. He handled MongoDB integration and REST API setup under pressure and ensured deployment worked before submission.",
      name: "M Dhana Pujitha", role: "Team Lead – 24hr Hackathon, Ramachandra College × Brainovision", avatar: "DP", color: T.accent },
    { quote: "During his AIML internship, Bhagavan quickly grasped TensorFlow CNN workflows and independently implemented model evaluation pipelines in Flask. Strong self-directed learning mindset.",
      name: "Internship Mentor", role: "SmartBridge (Remote) – AI/ML Intern, Smart Sorting Project", avatar: "IM", color: "#7c3aed" },
    { quote: "He consistently takes ownership beyond assigned tasks in MERN stack features — particularly the OAuth integration and PDF parsing for the ATS Resume Builder. Shows strong initiative.",
      name: "Project Guide", role: "Faculty Advisor – B.Tech AIDS, Ramachandra College of Engineering", avatar: "PG", color: T.green },
  ];

  const featuredProjects = [
    {
      id: "leave",
      label: "01 — Enterprise Automation",
      tag: "Microsoft Power Apps · Power Automate · SharePoint · Power BI",
      title: "Automated Leave Management System",
      subtitle: "Final Year Project · B.Tech 4-2 · 2025",
      accent: "#1a1aff",
      accentDim: "rgba(26,26,255,0.07)",
      accentGlow: "rgba(26,26,255,0.18)",
      icon: "🏢",
      badge: "Enterprise · Low-Code",
      problem: "HR teams processed 200+ monthly leave requests manually — 3 to 5 day approval delays, zero audit trail, no visibility for employees or management. Approval chains broke whenever a manager was unavailable.",
      solution: "Designed a multi-tier approval workflow using Power Apps + Power Automate with SharePoint as the data layer. Role-based dashboards for employees, managers, and HR. Automated Teams & Outlook notifications. Real-time Power BI analytics for HR reporting.",
      impact: [
        { value: "60–70%", label: "Approval time reduced" },
        { value: "85–90%", label: "Manual processing cut" },
        { value: "100+",   label: "Pilot users simulated" },
      ],
      tech: ["Microsoft Power Apps","Power Automate","SharePoint Online","Dataverse","Microsoft Teams","Outlook Integration","Power BI","Microsoft 365"],
      outcome: "Multi-tier role-based approval system with full audit trail, real-time HR dashboard, and zero-code employee self-service portal.",
      github: "https://github.com/bhagavan444",
    },
    {
      id: "chatbot",
      label: "02 — AI Application",
      tag: "React · Flask · Gemini API · OpenAI · Async Architecture",
      title: "AI Chatbot Web Application",
      subtitle: "Full-Stack AI Project · 2025",
      accent: "#0d9b6b",
      accentDim: "rgba(13,155,107,0.07)",
      accentGlow: "rgba(13,155,107,0.18)",
      icon: "🤖",
      badge: "AI · Full-Stack",
      problem: "Existing AI chat interfaces required API keys exposed on the client, had no conversation history, and couldn't handle streaming responses gracefully — making them unusable for real products.",
      solution: "Built an end-to-end AI chatbot with a React frontend and Flask backend. Async request handling for external Gemini/OpenAI APIs. Conversation context preserved per session. Clean streaming response UX with loading states and error recovery.",
      impact: [
        { value: "<1s",   label: "Average API response time" },
        { value: "2",     label: "AI providers integrated" },
        { value: "100%",  label: "Server-side API key safety" },
      ],
      tech: ["React.js","Flask","Gemini API","OpenAI API","Python","Async Requests","REST APIs","Session Management"],
      outcome: "Production-ready AI chat interface with server-side API handling, streaming responses, multi-turn conversation context, and graceful fallback between AI providers.",
      github: "https://github.com/bhagavan444",
    },
  ];

  /* ────────────────── RENDER ────────────────── */
  return (
    <>
      <style>{GLOBAL_CSS}</style>

      <div style={{ position:"fixed", top:0, left:0, right:0, height:"2px", background:T.surface2, zIndex:10000 }}>
        <div style={{ width:`${scrollPct}%`, height:"100%",
          background:"linear-gradient(90deg, #1a1aff, #0d9b6b)",
          boxShadow:"0 0 8px rgba(26,26,255,0.6), 0 0 20px rgba(26,26,255,0.3)",
          transition:"width 0.1s linear" }} />
      </div>

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
            onMouseEnter={e => { e.currentTarget.style.color = T.text; e.currentTarget.style.background = T.surface; e.currentTarget.style.transform = "translateY(-1px)"; }}
            onMouseLeave={e => { e.currentTarget.style.color = T.muted2; e.currentTarget.style.background = "transparent"; e.currentTarget.style.transform = "translateY(0)"; }}
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

      <main style={{ position:"relative", zIndex:1 }}>

        {/* ── HERO ── */}
        <section id="about" style={{ minHeight:"100vh", display:"flex", alignItems:"center", paddingTop:"68px", position:"relative", zIndex:1 }}>
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
                <div className="fade-up d1" style={{ marginBottom:"2.5rem" }}>
                  <span style={{
                    display:"inline-flex", alignItems:"center", gap:"0.55rem",
                    padding:"0.45rem 1rem", borderRadius:"999px",
                    background:"rgba(13,155,107,0.08)", border:`1px solid rgba(13,155,107,0.25)`,
                    fontSize:"0.8rem", fontWeight:600, color:T.green,
                  }}>
                    <div style={{ position:"relative", display:"inline-flex", alignItems:"center", justifyContent:"center" }}>
                      <div style={{ width:"6px", height:"6px", borderRadius:"50%", background:T.green, animation:"pulseDot 2s ease-in-out infinite", position:"relative", zIndex:1 }} />
                      <div style={{ position:"absolute", width:"6px", height:"6px", borderRadius:"50%", background:T.green, animation:"pulseRing 2s ease-out infinite", opacity:0.5 }} />
                    </div>
                    Open to full-time roles · 2026 Graduate
                    <MapPin size={11} />
                    Andhra Pradesh, India / Remote
                  </span>
                </div>

                <h1 className="display fade-up d2" style={{ fontSize:"clamp(3.2rem,6.5vw,5.5rem)", color:T.text, marginBottom:"0.3rem", fontWeight:700 }}>
                  Siva Satya Sai
                </h1>
                <h1 className="display fade-up d3" style={{
                  fontSize:"clamp(3.2rem,6.5vw,5.5rem)", fontWeight:700, marginBottom:"2rem",
                  background:"linear-gradient(135deg, #1a1aff 0%, #0055ff 50%, #0d9b6b 100%)",
                  backgroundSize:"200% 200%",
                  WebkitBackgroundClip:"text",
                  WebkitTextFillColor:"transparent",
                  backgroundClip:"text",
                  animation:"textGradientShift 5s ease infinite, fadeUp 0.75s cubic-bezier(0.16,1,0.3,1) 0.22s both",
                }}>
                  Bhagavan
                </h1>

                <div className="fade-up d4" style={{ marginBottom:"2rem" }}>
                  <span className="mono" style={{ fontSize:"0.78rem", color:T.muted, letterSpacing:"0.12em" }}>CURRENTLY → </span>
                  <TypewriterRole roles={[
                    "Full-Stack Engineer",
                    "AI/ML Developer",
                    "Python Engineer",
                    "MERN Stack Developer",
                    "Deep Learning Practitioner",
                  ]} />
                </div>

                <p className="fade-up d5" style={{ fontSize:"1.1rem", lineHeight:1.8, color:T.muted2, maxWidth:"580px", marginBottom:"3rem", fontWeight:400 }}>
                  Entry-level Software / AI Engineer with hands-on experience in <strong style={{ color:T.text, fontWeight:600 }}>Python, MERN stack, and deep learning.</strong>{" "}
                  3 internships. 4+ projects shipped. Focused on building AI-powered systems that are deployable, maintainable, and genuinely useful — not just impressive in notebooks.
                </p>

                <div className="cta-row fade-up d6" style={{ display:"flex", gap:"0.9rem", marginBottom:"3rem", flexWrap:"wrap", alignItems:"center" }}>
                  <Btn primary onClick={() => navigate("/projects")} style={{ position:"relative", overflow:"hidden" }}>
                    View Projects <ArrowRight size={15} style={{ transition:"transform 0.25s cubic-bezier(0.16,1,0.3,1)" }} />
                  </Btn>
                  <Btn onClick={() => document.getElementById("process")?.scrollIntoView({ behavior:"smooth" })}>See Process</Btn>
                  <Btn href={resumePdf} download><Download size={14} /> Resume</Btn>
                </div>

                <div className="fade-up d7" style={{ display:"flex", gap:"2rem", flexWrap:"wrap", paddingTop:"2rem", borderTop:`1px solid ${T.border}` }}>
                  {[
                    { icon:"🎓", label:"B.Tech AIDS · 2026 · 75%" },
                    { icon:"🚀", label:"3 Internships Completed" },
                    { icon:"🧠", label:"CNN · NLP · MERN · Flask" },
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
                <div style={{ position:"absolute", inset:"-12px", borderRadius:"28px", border:`1.5px solid ${T.accentSub}`, zIndex:0 }} />
                <div style={{ position:"absolute", top:"-24px", right:"-24px", width:"80px", height:"80px", borderRadius:"50%",
                  background:`radial-gradient(circle, rgba(26,26,255,0.12), transparent 70%)`, zIndex:0, filter:"blur(16px)" }} />

                <div style={{
                  position:"relative", zIndex:1, borderRadius:"20px", overflow:"hidden",
                  background:"#fff", border:`1px solid ${T.border2}`,
                  boxShadow:"0 32px 80px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.04)",
                  animation:"floatY 8s ease-in-out infinite",
                }}
                onMouseEnter={e => { e.currentTarget.style.animation = "none"; e.currentTarget.style.transform = "scale(1.02) translateY(-8px)"; e.currentTarget.style.boxShadow = "0 48px 100px rgba(0,0,0,0.18), 0 0 0 1px rgba(26,26,255,0.12)"; }}
                onMouseLeave={e => { e.currentTarget.style.animation = "floatY 8s ease-in-out infinite"; e.currentTarget.style.transform = "scale(1) translateY(0)"; e.currentTarget.style.boxShadow = "0 32px 80px rgba(0,0,0,0.12)"; }}
                style={{ transition:"transform 0.35s ease, box-shadow 0.35s ease", borderRadius:"20px", overflow:"hidden", position:"relative", zIndex:1, border:`1px solid ${T.border2}`, boxShadow:"0 32px 80px rgba(0,0,0,0.12)", animation:"floatCard 9s ease-in-out infinite" }}
                >
                  <img src={profileImg} alt="Siva Satya Sai Bhagavan" style={{ width:"100%", display:"block", aspectRatio:"4/5", objectFit:"cover" }} />

                  <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top, rgba(255,255,255,0.96) 0%, rgba(255,255,255,0.25) 55%, transparent 100%)" }} />

                  <div style={{ position:"absolute", top:"20px", left:"50%", transform:"translateX(-50%)",
                    background:"rgba(255,255,255,0.96)", border:`1px solid ${T.border2}`,
                    backdropFilter:"blur(20px)", borderRadius:"999px", padding:"0.4rem 1rem",
                    display:"flex", alignItems:"center", gap:"0.45rem", whiteSpace:"nowrap",
                    boxShadow:"0 2px 12px rgba(0,0,0,0.08)",
                  }}>
                    <div style={{ width:"5px", height:"5px", borderRadius:"50%", background:T.green, animation:"pulseDot 2s ease-in-out infinite" }} />
                    <span className="mono" style={{ fontSize:"0.65rem", fontWeight:500, color:T.text }}>AVAILABLE · 2026 GRADUATE</span>
                  </div>

                  <div style={{ position:"absolute", bottom:0, left:0, right:0, padding:"1.5rem 1.75rem" }}>
                    <div className="display" style={{ fontSize:"1.3rem", color:T.ink, marginBottom:"0.3rem", fontWeight:600 }}>Bhagavan</div>
                    <div style={{ fontSize:"0.8rem", color:T.muted2, marginBottom:"1rem" }}>Full-Stack · AI/ML · Python · MERN</div>
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
                  animation: metricsIn ? `statReveal 0.7s cubic-bezier(0.16,1,0.3,1) ${i*0.12}s both` : "none",
                  transition:"transform 0.32s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.32s ease",
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

        {/* ── DESIGN PHILOSOPHY ── */}
        <section id="philosophy" ref={philRef} style={{ padding:"8rem 0", position:"relative", zIndex:1 }}>
          <div style={{ maxWidth:"1280px", margin:"0 auto", padding:"0 2.5rem" }}>
            <SectionHead label="Design Philosophy" title="How I Think"
              sub="Good engineering is rooted in product thinking. Here's the mental model I bring to every system I build." />

            <div className="philosophy-grid" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"1.25rem" }}>
              {philosophy.map((p,i) => (
                <div key={i} className="card" style={{
                  padding:"2.2rem",
                  opacity: philIn ? 1 : 0,
                  animation: philIn ? `${i % 2 === 0 ? "slideInFromLeft" : "slideInFromRight"} 0.65s cubic-bezier(0.16,1,0.3,1) ${i*0.1}s both` : "none",
                  transition:"all 0.3s ease",
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

            <div className="timeline-row" style={{ display:"grid", gridTemplateColumns:"repeat(6,1fr)", gap:"0", position:"relative" }}>
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
                  <div style={{ width:"56px", height:"56px", borderRadius:"50%", background:"#fff",
                    border:`2px solid ${i === 0 ? T.accent : i === 5 ? T.green : T.border2}`,
                    display:"flex", alignItems:"center", justifyContent:"center",
                    marginBottom:"1.2rem", boxShadow:"0 0 0 5px "+T.surface,
                    transition:"all 0.25s ease", cursor:"default",
                    position:"relative", zIndex:1,
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = T.accent; e.currentTarget.style.transform = "scale(1.18)"; e.currentTarget.style.background = T.accentSub; e.currentTarget.style.boxShadow = `0 0 0 10px ${T.accentSub}, 0 0 0 5px ${T.surface}, 0 8px 24px rgba(26,26,255,0.2)`; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = i===0?T.accent:i===5?T.green:T.border2; e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.background = "#fff"; e.currentTarget.style.boxShadow = "0 0 0 5px "+T.surface; }}
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
          <div style={{ position:"absolute", left:"-10%", top:"20%", width:"450px", height:"450px", borderRadius:"50%",
            background:"radial-gradient(circle, rgba(26,26,255,0.2), transparent 70%)", filter:"blur(80px)", pointerEvents:"none" }} />
          <div style={{ position:"absolute", right:"-8%", bottom:"10%", width:"350px", height:"350px", borderRadius:"50%",
            background:"radial-gradient(circle, rgba(13,155,107,0.18), transparent 70%)", filter:"blur(70px)", pointerEvents:"none" }} />

          <div style={{ maxWidth:"1280px", margin:"0 auto", padding:"0 2.5rem", position:"relative", zIndex:1 }}>
            <SectionHead light label="Impact" title="Real Work, Measurable Results"
              sub="Every project I've built has shipped to real users or production environments — not just academic submissions." />

            <div className="impact-grid" style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"1.25rem" }}>
              {impactStats.map((s,i) => (
                <div key={i} style={{
                  padding:"2.5rem 2rem",
                  background:"rgba(255,255,255,0.04)",
                  border:"1px solid rgba(255,255,255,0.08)",
                  borderRadius:"16px",
                  opacity: impactIn ? 1 : 0,
                  animation: impactIn ? `statReveal 0.7s cubic-bezier(0.16,1,0.3,1) ${i*0.13}s both` : "none",
                  transition:"all 0.3s ease",
                  cursor:"default",
                }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.07)"; e.currentTarget.style.transform = "translateY(-6px) scale(1.02)"; e.currentTarget.style.borderColor = "rgba(26,26,255,0.4)"; e.currentTarget.style.boxShadow = "0 20px 60px rgba(0,0,0,0.3), 0 0 24px rgba(26,26,255,0.12)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.transform = "translateY(0) scale(1)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.boxShadow = "none"; }}
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
          <div style={{ textAlign:"center", marginBottom:"1.8rem", animation:"slideUp 0.6s cubic-bezier(0.16,1,0.3,1) 0.1s both" }}>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:"1rem", marginBottom:"0.5rem" }}>
              <div style={{ width:"24px", height:"1px", background:"rgba(26,26,255,0.3)" }} />
              <span className="label">Technology Arsenal</span>
              <div style={{ width:"24px", height:"1px", background:"rgba(26,26,255,0.3)" }} />
            </div>
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

        {/* ── FEATURED PROJECTS — DUAL SHOWCASE ── */}
        <section id="work" ref={projectRef} style={{ padding:"8rem 0", position:"relative", zIndex:1, overflow:"hidden" }}>

          {/* Floating ambient orbs */}
          <div style={{ position:"absolute", left:"-12%", top:"15%", width:"600px", height:"600px", borderRadius:"50%",
            background:"radial-gradient(circle, rgba(26,26,255,0.045) 0%, transparent 65%)", filter:"blur(90px)", pointerEvents:"none",
            animation:"haloBreath 9s ease-in-out infinite" }} />
          <div style={{ position:"absolute", right:"-8%", bottom:"5%", width:"450px", height:"450px", borderRadius:"50%",
            background:"radial-gradient(circle, rgba(13,155,107,0.04) 0%, transparent 65%)", filter:"blur(80px)", pointerEvents:"none",
            animation:"haloBreath 11s ease-in-out infinite 3s" }} />

          <div style={{ maxWidth:"1280px", margin:"0 auto", padding:"0 2.5rem" }}>

            {/* ─ Header ─ */}
            <div style={{ marginBottom:"5rem",
              opacity: projectIn ? 1 : 0,
              animation: projectIn ? "fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) both" : "none" }}>
              <div style={{ display:"flex", alignItems:"center", gap:"0.75rem", marginBottom:"1.2rem" }}>
                <div style={{ width:"36px", height:"1.5px", background:T.accent }} />
                <span className="label">Selected Work — Case Studies</span>
              </div>
              <h2 className="display" style={{ fontSize:"clamp(2.4rem,4.5vw,3.4rem)", color:T.text, fontWeight:700,
                maxWidth:"600px", lineHeight:1.08, marginBottom:"1.2rem" }}>
                Projects Built<br />for Real Problems
              </h2>
              <p style={{ fontSize:"1.05rem", color:T.muted, lineHeight:1.75, maxWidth:"500px" }}>
                Two case studies — enterprise workflow automation and full-stack AI product engineering. Each examined to depth.
              </p>
            </div>

            {/* ─ PROJECT 1: Leave Automation ─ */}
            <div style={{
              borderRadius:"24px", overflow:"hidden",
              border:`1.5px solid ${T.border2}`,
              background:"#fff",
              marginBottom:"2rem",
              boxShadow:"0 4px 40px rgba(0,0,0,0.06)",
              opacity: projectIn ? 1 : 0,
              animation: projectIn ? "fadeUp 0.75s cubic-bezier(0.16,1,0.3,1) 0.1s both" : "none",
              transition:"transform 0.35s ease, box-shadow 0.35s ease",
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-5px)"; e.currentTarget.style.boxShadow = "0 32px 80px rgba(0,0,0,0.12)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 40px rgba(0,0,0,0.06)"; }}>

              {/* Banner */}
              <div style={{ height:"220px", position:"relative", overflow:"hidden",
                background:"linear-gradient(135deg, rgba(26,26,255,0.07) 0%, rgba(26,26,255,0.02) 50%, rgba(13,155,107,0.04) 100%)",
                borderBottom:`1px solid ${T.border}` }}>
                {/* Grid overlay */}
                <div style={{ position:"absolute", inset:0,
                  backgroundImage:`linear-gradient(rgba(26,26,255,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(26,26,255,0.06) 1px,transparent 1px)`,
                  backgroundSize:"40px 40px" }} />
                {/* Glow circle */}
                <div style={{ position:"absolute", right:"10%", top:"-30%", width:"320px", height:"320px", borderRadius:"50%",
                  background:"radial-gradient(circle, rgba(26,26,255,0.12), transparent 65%)", filter:"blur(40px)" }} />
                {/* Bottom accent line */}
                <div style={{ position:"absolute", bottom:0, left:0, right:0, height:"3px",
                  background:"linear-gradient(90deg, #1a1aff 0%, rgba(26,26,255,0.2) 100%)" }} />
                {/* Content */}
                <div style={{ position:"relative", zIndex:1, padding:"2.5rem 3rem", height:"100%", display:"flex", flexDirection:"column", justifyContent:"space-between" }}>
                  <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                    <div style={{ display:"flex", alignItems:"center", gap:"0.75rem" }}>
                      <div style={{ width:"44px", height:"44px", borderRadius:"12px",
                        background:"rgba(26,26,255,0.1)", border:"1px solid rgba(26,26,255,0.2)",
                        display:"flex", alignItems:"center", justifyContent:"center", fontSize:"1.3rem" }}>🏢</div>
                      <div>
                        <div className="mono" style={{ fontSize:"0.62rem", color:T.accent, letterSpacing:"0.15em", fontWeight:600 }}>01 — ENTERPRISE AUTOMATION</div>
                        <div style={{ fontSize:"0.85rem", fontWeight:600, color:T.muted2, marginTop:"2px" }}>Final Year Project · B.Tech 4-2 · 2025</div>
                      </div>
                    </div>
                    <span style={{ padding:"0.35rem 1rem", borderRadius:"999px",
                      background:"rgba(26,26,255,0.08)", border:"1px solid rgba(26,26,255,0.18)",
                      fontSize:"0.72rem", fontWeight:600, color:T.accent, fontFamily:"'DM Mono',monospace" }}>
                      Enterprise · Low-Code
                    </span>
                  </div>
                  <div>
                    <div className="mono" style={{ fontSize:"0.65rem", color:T.muted, letterSpacing:"0.12em", marginBottom:"0.6rem" }}>
                      Microsoft Power Apps · Power Automate · SharePoint · Power BI
                    </div>
                    <div className="display" style={{ fontSize:"clamp(1.6rem,3vw,2.3rem)", fontWeight:700, color:T.text, letterSpacing:"-0.02em", lineHeight:1.1 }}>
                      Automated Leave Management System
                    </div>
                  </div>
                </div>
              </div>

              {/* Body */}
              <div style={{ display:"grid", gridTemplateColumns:"1fr 280px", gap:"3rem", padding:"2.8rem 3rem", alignItems:"start" }}>
                <div>
                  {/* Problem + Solution */}
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1.25rem", marginBottom:"2rem" }}>
                    {[
                      { label:"The Problem", body:"HR teams processed 200+ monthly leave requests manually — 3 to 5 day approval delays, zero audit trail, no employee visibility. Approval chains broke whenever a manager was unavailable.", c:"#dc2626" },
                      { label:"The Solution", body:"Multi-tier approval workflow via Power Apps + Power Automate with SharePoint as data layer. Role-based dashboards for employees, managers and HR. Automated Teams & Outlook notifications. Power BI HR analytics.", c:T.green },
                    ].map((x,i) => (
                      <div key={i} style={{ padding:"1.5rem", borderRadius:"14px", background:T.surface, border:`1px solid ${T.border}`,
                        transition:"border-color 0.2s, transform 0.2s" }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = x.c+"44"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.transform = "translateY(0)"; }}>
                        <div style={{ display:"flex", alignItems:"center", gap:"0.45rem", marginBottom:"0.75rem" }}>
                          <div style={{ width:"6px", height:"6px", borderRadius:"50%", background:x.c, flexShrink:0 }} />
                          <span className="mono" style={{ fontSize:"0.62rem", letterSpacing:"0.14em", color:x.c, fontWeight:600 }}>{x.label}</span>
                        </div>
                        <p style={{ fontSize:"0.87rem", color:T.muted2, lineHeight:1.78 }}>{x.body}</p>
                      </div>
                    ))}
                  </div>

                  {/* Outcome */}
                  <div style={{ padding:"1.2rem 1.5rem", borderRadius:"10px",
                    background:"rgba(13,155,107,0.05)", border:"1px solid rgba(13,155,107,0.18)",
                    marginBottom:"2rem", display:"flex", alignItems:"flex-start", gap:"0.75rem" }}>
                    <div style={{ fontSize:"1rem", marginTop:"1px" }}>✅</div>
                    <div>
                      <div className="mono" style={{ fontSize:"0.62rem", color:T.green, letterSpacing:"0.12em", marginBottom:"0.35rem" }}>OUTCOME</div>
                      <p style={{ fontSize:"0.85rem", color:T.muted2, lineHeight:1.7 }}>
                        Multi-tier role-based approval system with full audit trail, real-time HR dashboard, and employee self-service portal — all deployed within Microsoft 365 with zero custom backend.
                      </p>
                    </div>
                  </div>

                  {/* Tech stack */}
                  <div style={{ display:"flex", flexWrap:"wrap", gap:"0.5rem" }}>
                    {["Microsoft Power Apps","Power Automate","SharePoint Online","Dataverse","Microsoft Teams","Outlook Integration","Power BI","Microsoft 365"].map((t,i) => (
                      <span key={i} style={{ padding:"0.3rem 0.85rem", borderRadius:"7px",
                        background:T.surface, border:`1px solid ${T.border}`,
                        fontSize:"0.73rem", color:T.muted2, fontFamily:"'DM Mono',monospace",
                        transition:"all 0.18s ease" }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = T.accent+"44"; e.currentTarget.style.color = T.accent; e.currentTarget.style.background = "rgba(26,26,255,0.04)"; }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.color = T.muted2; e.currentTarget.style.background = T.surface; }}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Stats + CTA */}
                <div style={{ display:"flex", flexDirection:"column", gap:"0" }}>
                  {[
                    { value:"60–70%", label:"Approval time reduced", sub:"vs. manual 3-5 day process", c:T.accent },
                    { value:"85–90%", label:"Manual processing cut", sub:"HR overhead eliminated", c:T.green },
                    { value:"100+",   label:"Pilot users simulated", sub:"Stress-tested at scale", c:"#c4882a" },
                  ].map((s,i) => (
                    <div key={i} style={{ padding:"1.5rem 0", borderBottom: i < 2 ? `1px solid ${T.border}` : "none",
                      transition:"all 0.2s" }}
                      onMouseEnter={e => e.currentTarget.style.paddingLeft = "6px"}
                      onMouseLeave={e => e.currentTarget.style.paddingLeft = "0"}>
                      <div className="display" style={{ fontSize:"2rem", fontWeight:700, color:s.c, letterSpacing:"-0.04em", lineHeight:1 }}>{s.value}</div>
                      <div style={{ fontSize:"0.85rem", fontWeight:600, color:T.text, marginTop:"0.4rem" }}>{s.label}</div>
                      <div style={{ fontSize:"0.73rem", color:T.muted, marginTop:"0.2rem" }}>{s.sub}</div>
                    </div>
                  ))}
                  <div style={{ marginTop:"1.75rem", display:"flex", flexDirection:"column", gap:"0.6rem" }}>
                    <Btn primary href="https://github.com/bhagavan444" style={{ justifyContent:"center" }}>
                      View on GitHub <ArrowRight size={14} />
                    </Btn>
                    <Btn onClick={() => navigate("/projects")} style={{ justifyContent:"center" }}>
                      Full Case Study
                    </Btn>
                  </div>
                </div>
              </div>
            </div>

            {/* ─ PROJECT 2: AI Chatbot ─ */}
            <div style={{
              borderRadius:"24px", overflow:"hidden",
              border:`1.5px solid ${T.border2}`,
              background:"#fff",
              marginBottom:"2rem",
              boxShadow:"0 4px 40px rgba(0,0,0,0.06)",
              opacity: projectIn ? 1 : 0,
              animation: projectIn ? "fadeUp 0.75s cubic-bezier(0.16,1,0.3,1) 0.22s both" : "none",
              transition:"transform 0.35s ease, box-shadow 0.35s ease",
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-5px)"; e.currentTarget.style.boxShadow = "0 32px 80px rgba(0,0,0,0.12)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 40px rgba(0,0,0,0.06)"; }}>

              {/* Banner */}
              <div style={{ height:"220px", position:"relative", overflow:"hidden",
                background:"linear-gradient(135deg, rgba(13,155,107,0.07) 0%, rgba(13,155,107,0.02) 50%, rgba(26,26,255,0.04) 100%)",
                borderBottom:`1px solid ${T.border}` }}>
                <div style={{ position:"absolute", inset:0,
                  backgroundImage:`linear-gradient(rgba(13,155,107,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(13,155,107,0.06) 1px,transparent 1px)`,
                  backgroundSize:"40px 40px" }} />
                <div style={{ position:"absolute", right:"10%", top:"-30%", width:"320px", height:"320px", borderRadius:"50%",
                  background:"radial-gradient(circle, rgba(13,155,107,0.12), transparent 65%)", filter:"blur(40px)" }} />
                <div style={{ position:"absolute", bottom:0, left:0, right:0, height:"3px",
                  background:"linear-gradient(90deg, #0d9b6b 0%, rgba(13,155,107,0.2) 100%)" }} />
                <div style={{ position:"relative", zIndex:1, padding:"2.5rem 3rem", height:"100%", display:"flex", flexDirection:"column", justifyContent:"space-between" }}>
                  <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                    <div style={{ display:"flex", alignItems:"center", gap:"0.75rem" }}>
                      <div style={{ width:"44px", height:"44px", borderRadius:"12px",
                        background:"rgba(13,155,107,0.1)", border:"1px solid rgba(13,155,107,0.2)",
                        display:"flex", alignItems:"center", justifyContent:"center", fontSize:"1.3rem" }}>🤖</div>
                      <div>
                        <div className="mono" style={{ fontSize:"0.62rem", color:T.green, letterSpacing:"0.15em", fontWeight:600 }}>02 — AI APPLICATION</div>
                        <div style={{ fontSize:"0.85rem", fontWeight:600, color:T.muted2, marginTop:"2px" }}>Full-Stack AI Project · 2025</div>
                      </div>
                    </div>
                    <span style={{ padding:"0.35rem 1rem", borderRadius:"999px",
                      background:"rgba(13,155,107,0.08)", border:"1px solid rgba(13,155,107,0.22)",
                      fontSize:"0.72rem", fontWeight:600, color:T.green, fontFamily:"'DM Mono',monospace" }}>
                      AI · Full-Stack
                    </span>
                  </div>
                  <div>
                    <div className="mono" style={{ fontSize:"0.65rem", color:T.muted, letterSpacing:"0.12em", marginBottom:"0.6rem" }}>
                      React · Flask · Gemini API · OpenAI · Async Architecture
                    </div>
                    <div className="display" style={{ fontSize:"clamp(1.6rem,3vw,2.3rem)", fontWeight:700, color:T.text, letterSpacing:"-0.02em", lineHeight:1.1 }}>
                      AI Chatbot Web Application
                    </div>
                  </div>
                </div>
              </div>

              {/* Body */}
              <div style={{ display:"grid", gridTemplateColumns:"1fr 280px", gap:"3rem", padding:"2.8rem 3rem", alignItems:"start" }}>
                <div>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1.25rem", marginBottom:"2rem" }}>
                    {[
                      { label:"The Problem", body:"Existing AI chat tools exposed API keys on the client, had no conversation history, and couldn't handle streaming responses — making them unsuitable for real production use.", c:"#dc2626" },
                      { label:"The Solution", body:"End-to-end chatbot with React frontend and Flask backend. Server-side Gemini/OpenAI API handling for security. Multi-turn conversation context per session. Async streaming response UX with loading states and error recovery.", c:T.green },
                    ].map((x,i) => (
                      <div key={i} style={{ padding:"1.5rem", borderRadius:"14px", background:T.surface, border:`1px solid ${T.border}`,
                        transition:"border-color 0.2s, transform 0.2s" }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = x.c+"44"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.transform = "translateY(0)"; }}>
                        <div style={{ display:"flex", alignItems:"center", gap:"0.45rem", marginBottom:"0.75rem" }}>
                          <div style={{ width:"6px", height:"6px", borderRadius:"50%", background:x.c, flexShrink:0 }} />
                          <span className="mono" style={{ fontSize:"0.62rem", letterSpacing:"0.14em", color:x.c, fontWeight:600 }}>{x.label}</span>
                        </div>
                        <p style={{ fontSize:"0.87rem", color:T.muted2, lineHeight:1.78 }}>{x.body}</p>
                      </div>
                    ))}
                  </div>

                  {/* Outcome */}
                  <div style={{ padding:"1.2rem 1.5rem", borderRadius:"10px",
                    background:"rgba(13,155,107,0.05)", border:"1px solid rgba(13,155,107,0.18)",
                    marginBottom:"2rem", display:"flex", alignItems:"flex-start", gap:"0.75rem" }}>
                    <div style={{ fontSize:"1rem", marginTop:"1px" }}>✅</div>
                    <div>
                      <div className="mono" style={{ fontSize:"0.62rem", color:T.green, letterSpacing:"0.12em", marginBottom:"0.35rem" }}>OUTCOME</div>
                      <p style={{ fontSize:"0.85rem", color:T.muted2, lineHeight:1.7 }}>
                        Production-ready AI chat interface with 100% server-side API key security, streaming responses, multi-turn conversation context, and graceful fallback between Gemini and OpenAI providers.
                      </p>
                    </div>
                  </div>

                  {/* Tech stack */}
                  <div style={{ display:"flex", flexWrap:"wrap", gap:"0.5rem" }}>
                    {["React.js","Flask","Python","Gemini API","OpenAI API","Async Requests","REST APIs","Session Management"].map((t,i) => (
                      <span key={i} style={{ padding:"0.3rem 0.85rem", borderRadius:"7px",
                        background:T.surface, border:`1px solid ${T.border}`,
                        fontSize:"0.73rem", color:T.muted2, fontFamily:"'DM Mono',monospace",
                        transition:"all 0.18s ease" }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = T.green+"44"; e.currentTarget.style.color = T.green; e.currentTarget.style.background = "rgba(13,155,107,0.04)"; }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.color = T.muted2; e.currentTarget.style.background = T.surface; }}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Stats + CTA */}
                <div style={{ display:"flex", flexDirection:"column", gap:"0" }}>
                  {[
                    { value:"<1s",    label:"Avg API response time",  sub:"Async optimised latency",      c:T.green },
                    { value:"2",      label:"AI providers integrated", sub:"Gemini + OpenAI with fallback",c:T.accent },
                    { value:"100%",   label:"Server-side key safety",  sub:"No client-side API exposure",  c:"#c4882a" },
                  ].map((s,i) => (
                    <div key={i} style={{ padding:"1.5rem 0", borderBottom: i < 2 ? `1px solid ${T.border}` : "none",
                      transition:"all 0.2s" }}
                      onMouseEnter={e => e.currentTarget.style.paddingLeft = "6px"}
                      onMouseLeave={e => e.currentTarget.style.paddingLeft = "0"}>
                      <div className="display" style={{ fontSize:"2rem", fontWeight:700, color:s.c, letterSpacing:"-0.04em", lineHeight:1 }}>{s.value}</div>
                      <div style={{ fontSize:"0.85rem", fontWeight:600, color:T.text, marginTop:"0.4rem" }}>{s.label}</div>
                      <div style={{ fontSize:"0.73rem", color:T.muted, marginTop:"0.2rem" }}>{s.sub}</div>
                    </div>
                  ))}
                  <div style={{ marginTop:"1.75rem", display:"flex", flexDirection:"column", gap:"0.6rem" }}>
                    <Btn primary href="https://github.com/bhagavan444" style={{ justifyContent:"center" }}>
                      View on GitHub <ArrowRight size={14} />
                    </Btn>
                    <Btn onClick={() => navigate("/projects")} style={{ justifyContent:"center" }}>
                      Full Case Study
                    </Btn>
                  </div>
                </div>
              </div>
            </div>

            {/* ─ More Projects CTA strip ─ */}
            <div style={{
              padding:"2.2rem 2.8rem",
              background:`linear-gradient(135deg, ${T.surface} 0%, ${T.bg} 100%)`,
              border:`1px solid ${T.border2}`, borderRadius:"16px",
              display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:"1.5rem",
              opacity: projectIn ? 1 : 0,
              animation: projectIn ? "fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) 0.38s both" : "none",
            }}>
              <div>
                <div style={{ fontSize:"1.05rem", fontWeight:700, color:T.text, marginBottom:"0.3rem" }}>More projects on GitHub</div>
                <div style={{ fontSize:"0.83rem", color:T.muted }}>ATS Resume Builder · Fake News Detector · Career Path Recommender · CNN Plant Disease Classifier</div>
              </div>
              <div style={{ display:"flex", gap:"0.75rem" }}>
                <Btn primary onClick={() => navigate("/projects")}>All Projects <ArrowRight size={14} /></Btn>
                <Btn href="https://github.com/bhagavan444">GitHub</Btn>
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
                onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(26,26,255,0.25)"; e.currentTarget.style.transform = "translateY(-5px) translateX(3px)"; e.currentTarget.style.boxShadow = "0 20px 56px rgba(0,0,0,0.09), -4px 0 0 rgba(26,26,255,0.3)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.transform = "translateY(0) translateX(0)"; e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.04)"; }}
                >
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
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-8px) scale(1.01)"; e.currentTarget.style.borderColor = `${g.color}45`; e.currentTarget.style.boxShadow = `0 24px 64px rgba(0,0,0,0.1), 0 0 0 1px ${g.color}20`; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0) scale(1)"; e.currentTarget.style.borderColor = T.border; e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.04)"; }}
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
            <SectionHead label="Credentials" title="Internships, Awards & Certifications" />
            <div style={{ position:"relative", paddingLeft:"4px" }}>
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
                    onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px) translateX(4px)"; e.currentTarget.style.boxShadow = "0 14px 40px rgba(0,0,0,0.07)"; e.currentTarget.style.borderColor = `${a.color}55`; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0) translateX(0)"; e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.04)"; e.currentTarget.style.borderColor = T.border; }}
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
              border:`1px solid rgba(255,255,255,0.08)`,
              position:"relative", overflow:"hidden",
              opacity: ctaIn ? 1 : 0,
              animation: ctaIn ? "fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) both" : "none",
              boxShadow: ctaIn ? "0 0 80px rgba(26,26,255,0.08), 0 40px 120px rgba(0,0,0,0.3)" : "none",
              transition:"box-shadow 0.5s ease",
            }}>
              <div style={{ position:"absolute", right:"-8%", top:"-30%", width:"420px", height:"420px", borderRadius:"50%",
                background:"radial-gradient(circle, rgba(26,26,255,0.18), transparent 70%)", filter:"blur(70px)", pointerEvents:"none" }} />
              <div style={{ position:"absolute", left:"30%", bottom:"-20%", width:"300px", height:"300px", borderRadius:"50%",
                background:"radial-gradient(circle, rgba(13,155,107,0.15), transparent 70%)", filter:"blur(60px)", pointerEvents:"none" }} />

              <div style={{ position:"relative", zIndex:1, maxWidth:"680px" }}>
                <span className="label" style={{ display:"block", marginBottom:"1.5rem", color:"rgba(26,26,255,0.7)" }}>Let's build something real</span>

                <h2 className="display" style={{ fontSize:"clamp(2.5rem,5vw,3.6rem)", color:"#fff", marginBottom:"1.5rem", lineHeight:1.05, fontWeight:700 }}>
                  Ready to Contribute
                  <br />
                  <span style={{ color:T.accent }}>From Day One.</span>
                </h2>

                <p style={{ fontSize:"1rem", color:"rgba(255,255,255,0.6)", lineHeight:1.8, marginBottom:"3rem", maxWidth:"520px" }}>
                  Seeking full-time junior engineering roles where I can apply my MERN, Python, and AI/ML skills to real products. I bring strong CS fundamentals, 3 internships of hands-on experience, and genuine curiosity about building systems that matter.
                </p>

                <div style={{ display:"flex", gap:"1rem", flexWrap:"wrap", marginBottom:"3rem" }}>
                  <Btn primary href="mailto:g.sivasatyasaibhagavan@gmail.com">Schedule Interview <ArrowRight size={15} /></Btn>
                  <Btn onClick={() => navigate("/projects")} style={{ borderColor:"rgba(255,255,255,0.18)", color:"rgba(255,255,255,0.75)", background:"transparent" }}>
                    View Projects <ExternalLink size={14} />
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

        {/* ══════ MEGA FOOTER ══════ */}
        <footer style={{ background: T.ink, position:"relative", zIndex:1, overflow:"hidden" }}>
          <div style={{ position:"relative", height:"80px", overflow:"hidden", background: T.bg }}>
            <svg viewBox="0 0 1440 80" preserveAspectRatio="none"
              style={{ position:"absolute", bottom:0, left:0, width:"100%", height:"100%" }}>
              <path d="M0,0 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80 Z" fill={T.ink} />
            </svg>
          </div>

          <div style={{ position:"absolute", inset:0, pointerEvents:"none", zIndex:0,
            backgroundImage:`linear-gradient(rgba(26,26,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(26,26,255,0.06) 1px, transparent 1px)`,
            backgroundSize:"64px 64px", animation:"gridFade 6s ease-in-out infinite" }} />

          <div style={{ position:"absolute", left:"-5%", top:"20%", width:"500px", height:"500px", borderRadius:"50%",
            background:"radial-gradient(circle, rgba(26,26,255,0.14), transparent 70%)", filter:"blur(90px)", pointerEvents:"none",
            animation:"haloBreath 7s ease-in-out infinite" }} />
          <div style={{ position:"absolute", right:"0%", bottom:"10%", width:"380px", height:"380px", borderRadius:"50%",
            background:"radial-gradient(circle, rgba(13,155,107,0.1), transparent 70%)", filter:"blur(70px)", pointerEvents:"none",
            animation:"haloBreath 9s ease-in-out infinite 2s" }} />
          <div style={{ position:"absolute", right:"35%", top:"30%", width:"260px", height:"260px", borderRadius:"50%",
            background:"radial-gradient(circle, rgba(196,136,42,0.08), transparent 70%)", filter:"blur(50px)", pointerEvents:"none" }} />

          <div style={{ maxWidth:"1280px", margin:"0 auto", padding:"0 2.5rem", position:"relative", zIndex:1 }}>

            <div style={{ borderBottom:"1px solid rgba(255,255,255,0.07)", paddingBottom:"5rem", paddingTop:"5rem" }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", flexWrap:"wrap", gap:"3rem" }}>
                <div style={{ maxWidth:"640px" }}>
                  <div style={{ display:"inline-flex", alignItems:"center", gap:"0.55rem",
                    padding:"0.4rem 1rem", borderRadius:"999px",
                    background:"rgba(13,155,107,0.12)", border:"1px solid rgba(13,155,107,0.28)",
                    marginBottom:"2rem" }}>
                    <div style={{ width:"6px", height:"6px", borderRadius:"50%", background:T.green, animation:"pulseDot 2s ease-in-out infinite" }} />
                    <span className="mono" style={{ fontSize:"0.7rem", color:T.green, fontWeight:500 }}>OPEN TO OPPORTUNITIES · 2026 GRADUATE</span>
                  </div>
                  <h2 className="display" style={{ fontSize:"clamp(3rem,6vw,5.5rem)", color:"#fff", fontWeight:700, lineHeight:1.02, marginBottom:"1.5rem" }}>
                    Let's Build Something
                    <br />
                    <span style={{ color:T.accent }}>Remarkable.</span>
                  </h2>
                  <p style={{ fontSize:"1.05rem", color:"rgba(255,255,255,0.5)", lineHeight:1.8, maxWidth:"480px" }}>
                    Full-stack engineer. AI/ML developer. Python practitioner. Ready to join a team that ships real products and solves real problems.
                  </p>
                </div>
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

            <div className="footer-mega" style={{ display:"grid", gridTemplateColumns:"2fr 1fr 1fr 1fr", gap:"4rem 5rem", padding:"5rem 0 4rem" }}>
              <div>
                <div className="display" style={{ fontSize:"1.6rem", fontWeight:700, color:"#fff", letterSpacing:"-0.04em", marginBottom:"1.2rem" }}>
                  Bhagavan<span style={{ color:T.accent }}>.</span>
                </div>
                <p style={{ fontSize:"0.875rem", color:"rgba(255,255,255,0.42)", lineHeight:1.8, marginBottom:"2rem", maxWidth:"300px" }}>
                  B.Tech AIDS · Ramachandra College of Engineering, Eluru (JNTUK) · Class of 2026. Building AI-powered systems with product thinking at the core.
                </p>
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
                    <a key={i} href={l.href} className="footer-link">{l.label}</a>
                  ))}
                </div>
              </div>

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

              <div>
                <div style={{ fontSize:"0.7rem", fontFamily:"'DM Mono',monospace", letterSpacing:"0.18em",
                  color:"rgba(255,255,255,0.25)", textTransform:"uppercase", marginBottom:"1.5rem" }}>Contact</div>
                <div style={{ display:"flex", flexDirection:"column", gap:"1.2rem" }}>
                  {[
                    { icon:Mail,  label:"Email",    value:"g.sivasatyasaibhagavan@gmail.com", href:"mailto:g.sivasatyasaibhagavan@gmail.com" },
                    { icon:Phone, label:"Phone",    value:"+91 7569205626", href:"tel:+917569205626" },
                    { icon:MapPin,label:"Location", value:"Andhra Pradesh, India", href:"#" },
                    { icon:Globe, label:"Available", value:"Remote · Relocation Open", href:"#" },
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

            <div style={{ borderTop:"1px solid rgba(255,255,255,0.06)", paddingTop:"2.5rem", paddingBottom:"2.5rem", overflow:"hidden", position:"relative" }}>
              {["left","right"].map(side => (
                <div key={side} style={{ position:"absolute", [side]:0, top:0, bottom:0, width:"80px",
                  background:`linear-gradient(${side==="left"?"90deg":"270deg"}, ${T.ink}, transparent)`, zIndex:2, pointerEvents:"none" }} />
              ))}
              <div className="marquee-track-rev" style={{ opacity:0.3 }}>
                {["Full-Stack Engineering","AI/ML Development","Product Thinking","System Design","Python & MERN",
                  "Flask & TensorFlow","API Design","MongoDB Architecture","CNN & NLP","OOP & DSA",
                  "Full-Stack Engineering","AI/ML Development","Product Thinking","System Design","Python & MERN",
                  "Flask & TensorFlow","API Design","MongoDB Architecture","CNN & NLP","OOP & DSA",
                ].map((t,i) => (
                  <span key={i} style={{ display:"inline-block", margin:"0 2rem", fontSize:"0.78rem", fontFamily:"'DM Mono',monospace",
                    color:"rgba(255,255,255,0.5)", letterSpacing:"0.12em", textTransform:"uppercase", whiteSpace:"nowrap" }}>
                    {t} <span style={{ color:T.accent, margin:"0 0.5rem" }}>✦</span>
                  </span>
                ))}
              </div>
            </div>

            <div style={{ borderTop:"1px solid rgba(255,255,255,0.06)", padding:"2.5rem 0", display:"grid",
              gridTemplateColumns:"repeat(4,1fr)", gap:"2rem" }}>
              {[
                { value:"3",    label:"Internships Done",     icon:Award,    c:T.accent },
                { value:"4+",   label:"Projects Shipped",     icon:Terminal, c:T.gold   },
                { value:"75%",  label:"B.Tech CGPA Score",    icon:BookOpen, c:T.green  },
                { value:"8+",   label:"Certifications Earned",icon:Code2,    c:"#7c3aed"},
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

            <div className="footer-bottom" style={{ borderTop:"1px solid rgba(255,255,255,0.06)", padding:"2rem 0",
              display:"flex", alignItems:"center", justifyContent:"space-between", gap:"1.5rem", flexWrap:"wrap" }}>
              <div style={{ display:"flex", alignItems:"center", gap:"0.7rem" }}>
                <div className="mono" style={{ fontSize:"0.73rem", color:"rgba(255,255,255,0.28)" }}>
                  © 2026 Siva Satya Sai Bhagavan Gopalajosyula · All rights reserved
                </div>
                <span style={{ color:"rgba(255,255,255,0.15)", fontSize:"0.7rem" }}>·</span>
                <div className="mono" style={{ fontSize:"0.73rem", color:"rgba(255,255,255,0.2)" }}>
                  Designed & engineered with <Heart size={10} style={{ display:"inline", color:"#e55", margin:"0 2px" }} /> precision
                </div>
              </div>
              <div style={{ display:"flex", alignItems:"center", gap:"1.5rem" }}>
                {[{ label:"Privacy", href:"#" },{ label:"Terms", href:"#" },{ label:"Sitemap", href:"#" }].map((l,i) => (
                  <a key={i} href={l.href} className="footer-link" style={{ fontSize:"0.73rem" }}>{l.label}</a>
                ))}
              </div>
              <div style={{ display:"flex", alignItems:"center", gap:"0.5rem" }}>
                <div style={{ width:"6px", height:"6px", borderRadius:"50%", background:T.green, animation:"pulseDot 2s ease-in-out infinite" }} />
                <span className="mono" style={{ fontSize:"0.72rem", color:T.green }}>Available for hire · 2026</span>
              </div>
            </div>
          </div>
        </footer>
      </main>

      <CustomCursor />
      <ScrollToTop />
      <FloatingParticles />
    </>
  );
}