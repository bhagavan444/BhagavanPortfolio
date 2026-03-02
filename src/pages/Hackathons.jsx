"use client";

import React, { useState, useEffect, useRef } from "react";

/* ═══════════════════════════════════════════════════════
   DESIGN TOKENS — Pure Black & White Architectural System
   (Mirrored from skills.jsx)
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
  ink:       "#000000",
};

const E  = "cubic-bezier(0.16, 1, 0.3, 1)";
const MS = { fast:"130ms", base:"190ms", slow:"320ms", reveal:"420ms" };

/* ═══════════════════════════════════════════════════════
   DEVICON CDN
═══════════════════════════════════════════════════════ */
const IB = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons";
const ICONS = {
  "Node.js":     `${IB}/nodejs/nodejs-original.svg`,
  "Express":     `${IB}/express/express-original.svg`,
  "MongoDB":     `${IB}/mongodb/mongodb-original.svg`,
  "Redis":       `${IB}/redis/redis-original.svg`,
  "Docker":      `${IB}/docker/docker-original.svg`,
  "AWS":         `${IB}/amazonwebservices/amazonwebservices-original-wordmark.svg`,
  "Socket.io":   `${IB}/socketio/socketio-original.svg`,
  "Nginx":       `${IB}/nginx/nginx-original.svg`,
  "JWT":         `${IB}/nodejs/nodejs-plain.svg`,
  "Stripe":      `${IB}/nodejs/nodejs-original.svg`,
};

/* ═══════════════════════════════════════════════════════
   GLOBAL CSS
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
  @keyframes _progressFill {
    from { width:0; }
    to   { width:100%; }
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
    .stats-grid  { grid-template-columns:1fr 1fr !important; }
  }
  @media (max-width:768px) {
    .snav        { display:none !important; }
    .three-col,
    .fgrid,
    .ovgrid,
    .pgrid,
    .hpillars,
    .stats-grid  { grid-template-columns:1fr !important; }
    .fctar       { flex-direction:column !important; }
  }
`;

/* ═══════════════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════════════ */
const SECTIONS = [
  { id:"overview",      number:"01", label:"Overview"     },
  { id:"timeline",      number:"02", label:"Timeline"     },
  { id:"architecture",  number:"03", label:"Architecture" },
  { id:"challenges",    number:"04", label:"Challenges"   },
  { id:"outcome",       number:"05", label:"Outcome"      },
];

const TICKER_ITEMS = [
  "Node.js","Express","MongoDB","Redis","Docker","AWS","Socket.io","Nginx",
  "JWT","Stripe","REST","WebSocket","OAuth","Redis Pub/Sub","ACID","Escrow",
];

const executionPhases = [
  {
    id:1, number:"01", time:"0 — 6h",
    domain:"Foundation & Core Models",
    outcome:"Data modeling and authentication architecture. JWT + OAuth 2.0 with Docker pipeline.",
    context:"Database & Auth Layer", period:"Hour 0–6",
    tech:{
      "Database":   ["Node.js","MongoDB"],
      "Auth":       ["JWT","Express"],
      "DevOps":     ["Docker"],
    },
    proof:[
      { name:"Normalized Schemas",     detail:"User, Product, Bid, Transaction, Notification" },
      { name:"Auth System",            detail:"JWT rotation + OAuth 2.0 Google/GitHub" },
    ],
    metric:{ value:6, suffix:"", label:"Models Designed" },
    decision:"Chose MongoDB over PostgreSQL",
    rationale:"Electronics products have highly variable attributes. MongoDB's flexible schema eliminates migration overhead. Critical financial operations use transactions.",
    tradeoff:"Used MongoDB transactions for bid ops, accepting 2× slower writes for data integrity.",
  },
  {
    id:2, number:"02", time:"6 — 12h",
    domain:"Listing & Search APIs",
    outcome:"25+ REST endpoints with S3 image uploads, text search, and cursor pagination.",
    context:"Product Catalog & Discovery", period:"Hour 6–12",
    tech:{
      "API":      ["Express","Node.js"],
      "Storage":  ["AWS"],
      "Data":     ["MongoDB"],
    },
    proof:[
      { name:"REST API Layer",    detail:"25+ endpoints, cursor pagination" },
      { name:"Image Pipeline",    detail:"S3 pre-signed URLs + Sharp.js validation" },
    ],
    metric:{ value:25, suffix:"+", label:"API Endpoints" },
    decision:"MongoDB text indexes over Elasticsearch",
    rationale:"For 24h MVP with <10k listings, MongoDB is sufficient. Elasticsearch adds deployment complexity.",
    tradeoff:"Search limited to exact/prefix matching. No fuzzy search.",
  },
  {
    id:3, number:"03", time:"12 — 18h",
    domain:"Real-time Bidding System",
    outcome:"WebSocket architecture with Redis pub/sub achieving 45ms average bid propagation.",
    context:"Live Auction Engine", period:"Hour 12–18",
    tech:{
      "Realtime": ["Socket.io","Redis"],
      "Data":     ["MongoDB"],
      "Server":   ["Node.js"],
    },
    proof:[
      { name:"WebSocket Server",  detail:"Socket.io + Redis adapter for scale" },
      { name:"Bid Validation",    detail:"Optimistic locking + version counters" },
    ],
    metric:{ value:45, suffix:"ms", label:"Bid Latency" },
    decision:"Socket.io with Redis adapter",
    rationale:"Auction updates must reach all clients <100ms. Redis enables multi-server horizontal scaling.",
    tradeoff:"Added Redis dependency. Polling alternative would have 5× higher latency.",
  },
  {
    id:4, number:"04", time:"18 — 24h",
    domain:"Payments & Production Deploy",
    outcome:"Stripe Connect escrow deployed to AWS EC2 with Nginx SSL. 500-user load tested.",
    context:"Payment & Infrastructure", period:"Hour 18–24",
    tech:{
      "Payment":  ["Stripe","Node.js"],
      "Infra":    ["AWS","Nginx"],
      "Deploy":   ["Docker"],
    },
    proof:[
      { name:"Stripe Connect",    detail:"Escrow flow + webhook idempotency" },
      { name:"AWS EC2 Deploy",    detail:"Nginx reverse proxy + SSL" },
    ],
    metric:{ value:500, suffix:"", label:"Concurrent Users" },
    decision:"Stripe Connect with escrow model",
    rationale:"Escrow protects buyers. Stripe handles PCI compliance so the team doesn't have to.",
    tradeoff:"7-day escrow hold increases working capital requirements for sellers.",
  },
];

const architectureDecisions = [
  {
    n:"01",
    category:"Database Strategy",
    statement:"MongoDB + Redis Hybrid",
    elaboration:"MongoDB for flexible product schemas. Redis for real-time bid state and pub/sub. Each tool doing exactly what it does best.",
    challenge:"Concurrent bid conflicts under load",
    solution:"Optimistic locking with version counters — one bid wins, others retry atomically.",
  },
  {
    n:"02",
    category:"Real-time Architecture",
    statement:"WebSocket with Redis Pub/Sub",
    elaboration:"Sub-second latency is a hard requirement for auctions. Redis pub/sub enables horizontal scaling across multiple Node instances without shared memory.",
    challenge:"Connection state breaks on second server",
    solution:"Sticky sessions with Redis adapter — all servers subscribe to the same Redis channel.",
  },
  {
    n:"03",
    category:"Payment Processing",
    statement:"Stripe Connect Escrow",
    elaboration:"Stripe handles PCI compliance. Escrow protects both buyer and seller through a neutral holding period before funds release.",
    challenge:"Webhook reliability — Stripe delivers multiple times",
    solution:"Event ID uniqueness constraint in DB. Duplicates hit constraint, return 200 OK silently.",
  },
  {
    n:"04",
    category:"Search Architecture",
    statement:"MongoDB Text Indexes (MVP-first)",
    elaboration:"Elasticsearch would be overkill for a 24h hackathon with <10k listings. MongoDB text indexes cover prefix and phrase matching at zero added infrastructure cost.",
    challenge:"Relevance ranking at scale",
    solution:"Ship MVP with native indexes; migrate to Elasticsearch post-hackathon if needed.",
  },
];

const challenges = [
  {
    n:"01",
    challenge:"Concurrent Bid Race Conditions",
    problem:"Two users bidding simultaneously caused last-write-wins. Losing bid appeared as the winner.",
    solution:"MongoDB transactions with optimistic locking. Version counter ensures one bid succeeds; the other retries automatically.",
    outcome:"Zero bid conflicts across 500-user load test.",
  },
  {
    n:"02",
    challenge:"WebSocket State at Scale",
    problem:"Memory-based state broke when adding a second server. Users on different servers couldn't see real-time bids.",
    solution:"Redis pub/sub pattern. All servers subscribe to Redis, broadcast to their own clients — no shared process memory needed.",
    outcome:"Horizontal scaling achieved. 45ms latency maintained under load.",
  },
  {
    n:"03",
    challenge:"Payment Webhook Idempotency",
    problem:"Stripe webhooks delivered multiple times. First implementation processed duplicates, causing double payouts.",
    solution:"Event ID uniqueness constraint in the database. A duplicate hit constraints and returns 200 OK — Stripe stops retrying.",
    outcome:"Zero duplicate payments. Zero fraud incidents during judging.",
  },
];

const CERT_DRIVE_LINK   = "https://drive.google.com/file/d/1CQaoA9V93Lg4XS1FmcG-0gVUaKvw2zUq/view?usp=sharing";
const CERT_EMBED_URL    = "https://drive.google.com/file/d/1CQaoA9V93Lg4XS1FmcG-0gVUaKvw2zUq/preview";
const certUrl           = CERT_EMBED_URL; // kept for backward compat

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
═══════════════════════════════════════════════════════ */
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
    let magOX = 0, magOY = 0;
    let targetMagOX = 0, targetMagOY = 0;
    let rafId = null;
    let visible = false;
    const lerp = (a, b, t) => a + (b - a) * t;

    const onMove = (e) => {
      mx = e.clientX; my = e.clientY;
      if (!visible) { visible = true; dot.style.opacity = "1"; ring.style.opacity = "1"; }
      const els = document.querySelectorAll("[data-magnetic]");
      let found = null;
      els.forEach((el) => {
        const r = el.getBoundingClientRect();
        const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
        if (Math.hypot(mx - cx, my - cy) < Math.max(r.width, r.height) * 0.65) found = el;
      });
      if (found) {
        magEl = found;
        const r = found.getBoundingClientRect();
        const dx = mx - (r.left + r.width / 2), dy = my - (r.top + r.height / 2);
        targetMagOX = dx * 0.38; targetMagOY = dy * 0.38; targetRSize = 58;
      } else {
        if (magEl) { magEl.style.transform = ""; magEl.style.transition = `transform 400ms ${E}`; }
        magEl = null; targetMagOX = 0; targetMagOY = 0; targetRSize = 36;
      }
    };
    const onLeave = () => {
      visible = false; dot.style.opacity = "0"; ring.style.opacity = "0";
      if (magEl) { magEl.style.transform = ""; magEl = null; }
    };
    const onDown = () => { targetRSize = 22; dot.style.transform = "translate(-50%,-50%) scale(0.5)"; };
    const onUp   = () => { targetRSize = magEl ? 58 : 36; dot.style.transform = "translate(-50%,-50%) scale(1)"; };
    const onOver = (e) => {
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
        magOX = lerp(magOX, targetMagOX, 0.14); magOY = lerp(magOY, targetMagOY, 0.14);
        magEl.style.transform = `translate(${magOX}px,${magOY}px)`;
        magEl.style.transition = "none";
      } else { magOX = lerp(magOX, 0, 0.12); magOY = lerp(magOY, 0, 0.12); }
      rafId = requestAnimationFrame(tick);
    };
    document.addEventListener("mousemove",  onMove,  { passive:true });
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mousedown",  onDown);
    document.addEventListener("mouseup",    onUp);
    document.addEventListener("mouseover",  onOver,  { passive:true });
    rafId = requestAnimationFrame(tick);
    return () => {
      document.removeEventListener("mousemove",  onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mousedown",  onDown);
      document.removeEventListener("mouseup",    onUp);
      document.removeEventListener("mouseover",  onOver);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const BASE = { position:"fixed", top:0, left:0, transform:"translate(-50%,-50%)", pointerEvents:"none", zIndex:99999, opacity:0, animation:`_cursorIn 400ms ${E} 0.5s both` };
  return (
    <>
      <div ref={dotRef} style={{ ...BASE, width:"8px", height:"8px", borderRadius:"50%", background:"#FFFFFF", transition:`transform 120ms ${E}, opacity 200ms ease`, willChange:"left,top,transform" }}/>
      <div ref={ringRef} style={{ ...BASE, width:"36px", height:"36px", borderRadius:"50%", border:"1.5px solid rgba(255,255,255,0.45)", background:"transparent", transition:`border-color 180ms ease, background 180ms ease, opacity 200ms ease`, willChange:"left,top,width,height", mixBlendMode:"difference" }}/>
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
    <img src={src} alt={name} className="di" width={size} height={size} loading="lazy"
      style={{ display:"block", flexShrink:0, borderRadius:"3px", ...extraStyle }}
    />
  );
}

/* ═══════════════════════════════════════════════════════
   MARQUEE
═══════════════════════════════════════════════════════ */
function Marquee({ speed = 32 }) {
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS];
  return (
    <div style={{ overflow:"hidden", borderTop:`1px solid rgba(255,255,255,0.06)`, borderBottom:`1px solid rgba(255,255,255,0.06)`, padding:"10px 0", background:"#111111", position:"relative" }}>
      <div style={{ position:"absolute", left:0, top:0, bottom:0, width:"80px", background:`linear-gradient(to right, #111111, transparent)`, zIndex:2, pointerEvents:"none" }}/>
      <div style={{ position:"absolute", right:0, top:0, bottom:0, width:"80px", background:`linear-gradient(to left, #111111, transparent)`, zIndex:2, pointerEvents:"none" }}/>
      <div className="marquee-inner" style={{ display:"flex", alignItems:"center", gap:"32px", width:"max-content", animation:`_marquee ${speed}s linear infinite`, willChange:"transform" }}>
        {items.map((name, i) => {
          const src = ICONS[name];
          return (
            <div key={`${name}-${i}`} style={{ display:"flex", alignItems:"center", gap:"7px", opacity:0.45, flexShrink:0 }}>
              {src && <img src={src} alt={name} className="di" width={16} height={16} loading="lazy" style={{ display:"block", borderRadius:"2px" }}/>}
              <span style={{ fontFamily:"'DM Mono',monospace", fontSize:"11px", fontWeight:500, color:"rgba(255,255,255,0.50)", letterSpacing:"0.04em", whiteSpace:"nowrap" }}>{name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   TECH TAG
═══════════════════════════════════════════════════════ */
function Tag({ name, visible, delay }) {
  const [hov, setHov] = useState(false);
  return (
    <span data-magnetic onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ display:"inline-flex", alignItems:"center", gap:"5px", padding:"4px 9px 4px 6px", borderRadius:"5px", background:hov?"rgba(255,255,255,0.08)":"#141414", border:`1px solid ${hov?"rgba(255,255,255,0.18)":"rgba(255,255,255,0.07)"}`, fontFamily:"'DM Mono',monospace", fontSize:"11px", color:hov?"#FFFFFF":"rgba(255,255,255,0.45)", cursor:"default", userSelect:"none", transition:`background ${MS.fast} ${E}, border-color ${MS.fast} ${E}, color ${MS.fast} ${E}`, opacity:visible?1:0, animation:visible?`_tagPop ${MS.slow} ${E} ${delay}s both`:"none" }}
    >
      <DI name={name} size={13} extraStyle={{ opacity:hov?0.9:0.5, transition:`opacity ${MS.fast} ${E}` }}/>
      {name}
    </span>
  );
}

/* ═══════════════════════════════════════════════════════
   SIDE NAV
═══════════════════════════════════════════════════════ */
function SideNav({ active }) {
  return (
    <nav className="snav" style={{ position:"fixed", left:"1.25rem", top:"50%", transform:"translateY(-50%)", zIndex:100, display:"flex", flexDirection:"column", gap:"14px" }}>
      {SECTIONS.map((s, i) => (
        <button key={s.id} className="snav-btn" data-magnetic
          onClick={() => document.getElementById(s.id)?.scrollIntoView({ behavior:"smooth" })}
          aria-label={`Jump to ${s.label}`}
          style={{ display:"flex", alignItems:"center", gap:"6px", background:"none", border:"none", cursor:"pointer", padding:0, outline:"none" }}
        >
          <div className="snav-line" style={{ height:"1.5px", width:active===i?"22px":"10px", background:active===i?"#FFFFFF":"rgba(255,255,255,0.18)", borderRadius:"1px", transition:`all ${MS.slow} ${E}` }}/>
          <span style={{ fontFamily:"'DM Mono',monospace", fontSize:"9px", fontWeight:500, color:"rgba(255,255,255,0.55)", opacity:active===i?1:0, transition:`opacity ${MS.slow} ${E}` }}>{s.number}</span>
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
    <span style={{ display:"block", fontFamily:"'DM Mono',monospace", fontSize:"10px", fontWeight:500, letterSpacing:"0.14em", textTransform:"uppercase", color, ...style }}>
      {children}
    </span>
  );
}

/* ═══════════════════════════════════════════════════════
   CURSOR BLINK
═══════════════════════════════════════════════════════ */
function TermCursor() {
  return (
    <span style={{ display:"inline-block", width:"8px", height:"1.1em", background:"#FFFFFF", marginLeft:"3px", verticalAlign:"middle", animation:"_blink 1.1s step-end infinite", borderRadius:"1px" }}/>
  );
}

/* ═══════════════════════════════════════════════════════
   SECTION HEADER
═══════════════════════════════════════════════════════ */
function SH({ eyebrow, title, sub, visible, delay = 0, cursor = false }) {
  return (
    <div style={{ marginBottom:"2.5rem", opacity:visible?1:0, animation:visible?`_rtl ${MS.reveal} ${E} ${delay}s both`:"none" }}>
      <ML color="rgba(255,255,255,0.45)" style={{ marginBottom:"10px" }}>{eyebrow}</ML>
      <h2 style={{ fontFamily:"'Dancing Script',cursive", fontSize:"clamp(2.8rem,5.5vw,4.5rem)", fontWeight:700, color:"#FFFFFF", letterSpacing:"-0.025em", marginBottom:sub?"8px":0, display:"flex", alignItems:"center" }}>
        {title}{cursor && <TermCursor/>}
      </h2>
      {sub && <p style={{ fontSize:"14px", color:"rgba(255,255,255,0.38)", lineHeight:1.65, maxWidth:"500px" }}>{sub}</p>}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   CAPABILITY ROW (Phase Row) — same layout as skills.jsx
═══════════════════════════════════════════════════════ */
function PhaseRow({ phase, visible, delay, ri, onSelect }) {
  const [hov, setHov] = useState(false);
  const even = ri % 2 === 0;
  const la = even ? "_ltr" : "_rtl";
  const ra = even ? "_rtl" : "_ltr";

  return (
    <div className="cap-grid" onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:0, borderBottom:`1px solid rgba(255,255,255,0.06)`, background:hov?"#141414":"transparent", transition:`background ${MS.fast} ${E}, transform ${MS.base} ${E}`, transform:hov?"translateY(-2px)":"translateY(0)" }}
    >
      {/* LEFT */}
      <div style={{ padding:"2.25rem 2.5rem", borderRight:`1px solid ${hov?"rgba(255,255,255,0.10)":"rgba(255,255,255,0.06)"}`, transition:`border-color ${MS.fast} ${E}`, position:"relative", opacity:visible?1:0, animation:visible?`${la} ${MS.reveal} ${E} ${delay}s both`:"none" }}>
        {/* Accent bar */}
        <div style={{ position:"absolute", left:0, top:"18px", bottom:"18px", width:"2px", background:hov?"#FFFFFF":"rgba(255,255,255,0.25)", borderRadius:"0 2px 2px 0", transformOrigin:"top", transform:visible?"scaleY(1)":"scaleY(0)", transition:`transform ${MS.slow} ${E} ${delay+0.18}s, background ${MS.fast} ${E}` }}/>
        <div style={{ display:"flex", alignItems:"center", gap:"10px", marginBottom:"16px" }}>
          <ML color="rgba(255,255,255,0.45)">{phase.number}</ML>
          <div style={{ height:"1px", width:"20px", background:"rgba(255,255,255,0.30)", transformOrigin:"left", transform:visible?"scaleX(1)":"scaleX(0)", transition:`transform ${MS.base} ${E} ${delay+0.24}s` }}/>
          <ML color="rgba(255,255,255,0.30)">{phase.time}</ML>
        </div>
        <h3 style={{ fontFamily:"'Dancing Script',cursive", fontSize:"2.2rem", fontWeight:700, color:"#FFFFFF", lineHeight:1.1, letterSpacing:"-0.025em", marginBottom:"12px" }}>
          {phase.domain}
        </h3>
        <p style={{ fontSize:"14px", color:"rgba(255,255,255,0.42)", lineHeight:1.75, maxWidth:"400px" }}>
          {phase.outcome}
        </p>
        {/* Metric counter */}
        <div style={{ marginTop:"24px", opacity:visible?1:0, animation:visible?`_countUp ${MS.slow} ${E} ${delay+0.32}s both`:"none" }}>
          <div style={{ fontFamily:"'Dancing Script',cursive", fontSize:"3.5rem", fontWeight:700, color:"#FFFFFF", lineHeight:1, letterSpacing:"-0.03em" }}>
            <Counter value={phase.metric.value} suffix={phase.metric.suffix} triggered={visible}/>
          </div>
          <div style={{ fontFamily:"'DM Mono',monospace", fontSize:"10px", color:"rgba(255,255,255,0.35)", letterSpacing:"0.08em", marginTop:"4px", opacity:hov?0.9:0.5, transition:`opacity ${MS.fast} ${E}` }}>
            {phase.metric.label}
          </div>
        </div>
      </div>

      {/* RIGHT */}
      <div style={{ padding:"2.25rem 2.5rem", opacity:visible?1:0, animation:visible?`${ra} ${MS.reveal} ${E} ${delay+0.07}s both`:"none" }}>
        {/* Tech tags */}
        <div style={{ marginBottom:"22px" }}>
          {Object.entries(phase.tech).map(([cat, items], ci) => (
            <div key={cat} style={{ marginBottom:"12px", display:"flex", gap:"10px", alignItems:"baseline", flexWrap:"wrap" }}>
              <ML color="rgba(255,255,255,0.35)" style={{ minWidth:"84px", flexShrink:0, paddingTop:"2px" }}>{cat}</ML>
              <div style={{ display:"flex", flexWrap:"wrap", gap:"5px" }}>
                {items.map((t, ti) => (
                  <Tag key={t} name={t} visible={visible} delay={delay+0.14+ci*0.07+ti*0.035}/>
                ))}
              </div>
            </div>
          ))}
        </div>
        {/* Proof bullets */}
        <div style={{ display:"flex", flexDirection:"column", gap:"8px", marginBottom:"20px" }}>
          {phase.proof.map((p, pi) => (
            <div key={p.name} style={{ display:"flex", gap:"10px", alignItems:"flex-start", opacity:visible?1:0, animation:visible?`_rtl ${MS.slow} ${E} ${delay+0.30+pi*0.07}s both`:"none" }}>
              <div style={{ width:"3px", height:"3px", borderRadius:"50%", background:hov?"rgba(255,255,255,0.7)":"rgba(255,255,255,0.2)", flexShrink:0, marginTop:"7px", transition:`background ${MS.fast} ${E}` }}/>
              <div>
                <span style={{ fontSize:"13px", fontWeight:500, color:"#FFFFFF" }}>{p.name}</span>
                <span style={{ fontSize:"12px", color:"rgba(255,255,255,0.38)", marginLeft:"8px" }}>— {p.detail}</span>
              </div>
            </div>
          ))}
        </div>
        {/* Decision block */}
        <div style={{ padding:"14px 16px", background:"rgba(255,255,255,0.03)", border:`1px solid rgba(255,255,255,0.06)`, borderRadius:"8px", marginBottom:"16px" }}>
          <ML color="rgba(255,255,255,0.30)" style={{ marginBottom:"6px" }}>Key Decision</ML>
          <p style={{ fontSize:"12px", color:"rgba(255,255,255,0.50)", lineHeight:1.65 }}>{phase.rationale}</p>
        </div>
        {/* Context footer */}
        <div style={{ paddingTop:"14px", borderTop:`1px solid rgba(255,255,255,0.06)`, display:"flex", gap:"8px", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap" }}>
          <div style={{ display:"flex", gap:"8px", alignItems:"center" }}>
            <span style={{ fontFamily:"'DM Mono',monospace", fontSize:"11px", color:"rgba(255,255,255,0.35)" }}>{phase.period}</span>
            <span style={{ fontSize:"11px", color:"rgba(255,255,255,0.20)" }}>·</span>
            <span style={{ fontSize:"11px", color:"rgba(255,255,255,0.35)" }}>{phase.context}</span>
          </div>
          <button data-magnetic onClick={() => onSelect(phase)}
            style={{ fontFamily:"'DM Mono',monospace", fontSize:"10px", fontWeight:500, letterSpacing:"0.06em", color:"rgba(255,255,255,0.50)", background:"none", border:"1px solid rgba(255,255,255,0.10)", borderRadius:"4px", padding:"4px 10px", cursor:"pointer", transition:`border-color ${MS.fast} ${E}, color ${MS.fast} ${E}` }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor="rgba(255,255,255,0.30)"; e.currentTarget.style.color="#FFFFFF"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor="rgba(255,255,255,0.10)"; e.currentTarget.style.color="rgba(255,255,255,0.50)"; }}
          >
            View Details →
          </button>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   ARCHITECTURE CARD (mirrors PhilCard)
═══════════════════════════════════════════════════════ */
function ArchCard({ item, visible, delay, idx }) {
  const dir = idx % 2 === 0 ? "_rtl" : "_ltr";
  return (
    <div style={{ padding:"2rem 2.5rem", background:"rgba(255,255,255,0.02)", opacity:visible?1:0, animation:visible?`${dir} ${MS.reveal} ${E} ${delay}s both`:"none" }}>
      <div style={{ display:"flex", alignItems:"flex-start", gap:"12px", marginBottom:"14px" }}>
        <div style={{ flexShrink:0, paddingTop:"2px" }}>
          <ML color="rgba(255,255,255,0.30)" style={{ marginBottom:"4px" }}>{item.n}</ML>
          <div style={{ height:"1px", background:"rgba(255,255,255,0.15)", transformOrigin:"left", transform:visible?"scaleX(1)":"scaleX(0)", transition:`transform ${MS.slow} ${E} ${delay+0.2}s` }}/>
        </div>
        <div>
          <ML color="rgba(255,255,255,0.30)" style={{ marginBottom:"6px" }}>{item.category}</ML>
          <h3 style={{ fontFamily:"'Dancing Script',cursive", fontSize:"1.75rem", fontWeight:600, color:"#FFFFFF", lineHeight:1.2, letterSpacing:"-0.02em" }}>
            {item.statement}
          </h3>
        </div>
      </div>
      <p style={{ fontSize:"13px", color:"rgba(255,255,255,0.35)", lineHeight:1.7, paddingLeft:"28px", marginBottom:"14px" }}>
        {item.elaboration}
      </p>
      <div style={{ paddingLeft:"28px", display:"flex", flexDirection:"column", gap:"6px" }}>
        <div style={{ display:"flex", gap:"8px" }}>
          <span style={{ fontFamily:"'DM Mono',monospace", fontSize:"10px", color:"rgba(255,255,255,0.25)", minWidth:"70px" }}>CHALLENGE</span>
          <span style={{ fontSize:"12px", color:"rgba(255,255,255,0.35)", lineHeight:1.5 }}>{item.challenge}</span>
        </div>
        <div style={{ display:"flex", gap:"8px" }}>
          <span style={{ fontFamily:"'DM Mono',monospace", fontSize:"10px", color:"rgba(255,255,255,0.40)", minWidth:"70px" }}>SOLUTION</span>
          <span style={{ fontSize:"12px", color:"rgba(255,255,255,0.55)", lineHeight:1.5 }}>{item.solution}</span>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   CHALLENGE CARD (mirrors TrajCard)
═══════════════════════════════════════════════════════ */
function ChallengeCard({ item, visible, delay }) {
  const [hov, setHov] = useState(false);
  return (
    <div data-magnetic onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ padding:"1.75rem", background:"#111111", border:`1px solid ${hov?"rgba(255,255,255,0.14)":"rgba(255,255,255,0.06)"}`, borderRadius:"10px", position:"relative", transform:hov?"translateY(-6px)":"translateY(0)", transition:`transform ${MS.base} ${E}, border-color ${MS.fast} ${E}`, opacity:visible?1:0, animation:visible?`_rtl ${MS.reveal} ${E} ${delay}s both`:"none" }}
    >
      <div style={{ position:"absolute", left:0, top:"18px", bottom:"18px", width:"2px", background:hov?"#FFFFFF":"rgba(255,255,255,0.2)", borderRadius:"0 2px 2px 0", transformOrigin:"top", transform:visible?"scaleY(1)":"scaleY(0)", transition:`transform ${MS.slow} ${E} ${delay+0.15}s, background ${MS.fast} ${E}` }}/>
      <div style={{ paddingLeft:"12px" }}>
        <div style={{ display:"flex", alignItems:"center", gap:"8px", marginBottom:"10px" }}>
          <ML color="rgba(255,255,255,0.30)">{item.n}</ML>
        </div>
        <h3 style={{ fontFamily:"'DM Mono',monospace", fontSize:"13px", fontWeight:600, color:"#FFFFFF", marginBottom:"14px" }}>
          {item.challenge}
        </h3>
        <div style={{ display:"flex", flexDirection:"column", gap:"10px" }}>
          <div>
            <ML color="rgba(255,255,255,0.25)" style={{ fontSize:"9px", marginBottom:"4px" }}>Problem</ML>
            <p style={{ fontSize:"12px", color:"rgba(255,255,255,0.40)", lineHeight:1.65 }}>{item.problem}</p>
          </div>
          <div>
            <ML color="rgba(255,255,255,0.45)" style={{ fontSize:"9px", marginBottom:"4px" }}>Solution</ML>
            <p style={{ fontSize:"12px", color:"rgba(255,255,255,0.55)", lineHeight:1.65 }}>{item.solution}</p>
          </div>
          <div style={{ paddingTop:"10px", borderTop:`1px solid rgba(255,255,255,0.06)` }}>
            <p style={{ fontSize:"11.5px", color:hov?"rgba(255,255,255,0.70)":"rgba(255,255,255,0.35)", lineHeight:1.5, transition:`color ${MS.fast} ${E}`, fontStyle:"italic" }}>{item.outcome}</p>
          </div>
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
    <div data-magnetic onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ padding:"2rem 1.5rem", background:"#111111", transform:hov?"scale(1.016)":"scale(1)", transition:`transform ${MS.fast} ${E}`, opacity:triggered?1:0, animation:triggered?`_up 300ms ${E} ${delay}s both`:"none" }}
    >
      <div style={{ fontFamily:"'Dancing Script',cursive", fontSize:"3.25rem", fontWeight:700, color:"#FFFFFF", lineHeight:1, letterSpacing:"-0.03em", marginBottom:"6px" }}>
        <Counter value={value} suffix={suffix} triggered={triggered}/>
      </div>
      <div style={{ fontSize:"13.5px", fontWeight:500, color:"#FFFFFF", marginBottom:"4px" }}>{label}</div>
      <div style={{ fontSize:"11.5px", color:"rgba(255,255,255,0.38)", lineHeight:1.5, opacity:hov?0.9:0.52, transition:`opacity ${MS.fast} ${E}` }}>{sub}</div>
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
    <a href={href} data-magnetic target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => { setHov(false); setPress(false); }}
      onMouseDown={() => setPress(true)} onMouseUp={() => setPress(false)}
      style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"16px 20px", borderRadius:"10px", textDecoration:"none", background:accent?(hov?"rgba(255,255,255,0.12)":"rgba(255,255,255,0.07)"):(hov?"rgba(255,255,255,0.06)":"rgba(255,255,255,0.03)"), border:`1px solid ${accent?(hov?"rgba(255,255,255,0.30)":"rgba(255,255,255,0.15)"):(hov?"rgba(255,255,255,0.12)":"rgba(255,255,255,0.07)")}`, transition:`background ${MS.fast} ${E}, border-color ${MS.fast} ${E}`, opacity:visible?1:0, transform:visible?(press?"scale(0.98)":"translateY(0)"):"translateY(10px)", animation:visible?`_up ${MS.slow} ${E} ${delay}s both`:"none" }}
    >
      <div>
        <ML color="rgba(255,255,255,0.25)" style={{ marginBottom:"4px" }}>{sub}</ML>
        <div style={{ fontSize:"14px", fontWeight:500, color:"#FFFFFF" }}>{label}</div>
      </div>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="2" strokeLinecap="round" style={{ transform:hov?"translateX(4px)":"translateX(0)", transition:`transform ${MS.fast} ${E}` }}>
        <path d="M5 12h14M12 5l7 7-7 7"/>
      </svg>
    </a>
  );
}

/* ═══════════════════════════════════════════════════════
   PHASE DETAIL MODAL
═══════════════════════════════════════════════════════ */
function PhaseModal({ phase, onClose }) {
  if (!phase) return null;
  return (
    <div onClick={onClose}
      style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.85)", backdropFilter:"blur(8px)", zIndex:9999, display:"flex", alignItems:"center", justifyContent:"center", padding:"32px", overflowY:"auto" }}
    >
      <div onClick={e => e.stopPropagation()}
        style={{ background:"#111111", border:`1px solid rgba(255,255,255,0.10)`, borderRadius:"14px", maxWidth:"680px", width:"100%", maxHeight:"90vh", overflowY:"auto", position:"relative", animation:`_rtl ${MS.reveal} ${E} 0s both` }}
      >
        {/* Header */}
        <div style={{ padding:"2.5rem 2.5rem 2rem", borderBottom:`1px solid rgba(255,255,255,0.06)`, position:"sticky", top:0, background:"#111111", zIndex:1, borderRadius:"14px 14px 0 0" }}>
          <button onClick={onClose} data-magnetic
            style={{ position:"absolute", top:"1.5rem", right:"1.5rem", background:"rgba(255,255,255,0.05)", border:`1px solid rgba(255,255,255,0.10)`, width:"32px", height:"32px", borderRadius:"7px", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", color:"rgba(255,255,255,0.55)", fontSize:"16px", transition:`background ${MS.fast} ${E}` }}
            onMouseEnter={(e) => e.currentTarget.style.background="rgba(255,255,255,0.10)"}
            onMouseLeave={(e) => e.currentTarget.style.background="rgba(255,255,255,0.05)"}
          >✕</button>
          <div style={{ display:"flex", alignItems:"center", gap:"10px", marginBottom:"12px" }}>
            <ML color="rgba(255,255,255,0.45)">{phase.number}</ML>
            <div style={{ height:"1px", width:"16px", background:"rgba(255,255,255,0.20)" }}/>
            <ML color="rgba(255,255,255,0.30)">{phase.time}</ML>
          </div>
          <h2 style={{ fontFamily:"'Dancing Script',cursive", fontSize:"2.5rem", fontWeight:700, color:"#FFFFFF", lineHeight:1.1, letterSpacing:"-0.025em", marginBottom:"8px" }}>
            {phase.domain}
          </h2>
          <p style={{ fontSize:"14px", color:"rgba(255,255,255,0.42)", lineHeight:1.7 }}>{phase.outcome}</p>
        </div>
        {/* Body */}
        <div style={{ padding:"2rem 2.5rem", display:"flex", flexDirection:"column", gap:"24px" }}>
          {[
            { label:"Key Decision", value:phase.decision },
            { label:"Rationale",    value:phase.rationale },
            { label:"Tradeoff",     value:phase.tradeoff },
          ].map((item, i) => (
            <div key={i} style={{ padding:"16px 18px", background:"rgba(255,255,255,0.03)", border:`1px solid rgba(255,255,255,0.06)`, borderRadius:"8px" }}>
              <ML color="rgba(255,255,255,0.30)" style={{ marginBottom:"6px" }}>{item.label}</ML>
              <p style={{ fontSize:"13.5px", color:"rgba(255,255,255,0.60)", lineHeight:1.7 }}>{item.value}</p>
            </div>
          ))}
          {/* Tech */}
          <div>
            <ML color="rgba(255,255,255,0.30)" style={{ marginBottom:"12px" }}>Technologies Used</ML>
            <div style={{ display:"flex", flexWrap:"wrap", gap:"6px" }}>
              {Object.values(phase.tech).flat().map((t, i) => (
                <span key={i} style={{ display:"inline-flex", alignItems:"center", gap:"5px", padding:"4px 9px 4px 6px", borderRadius:"5px", background:"#141414", border:`1px solid rgba(255,255,255,0.07)`, fontFamily:"'DM Mono',monospace", fontSize:"11px", color:"rgba(255,255,255,0.45)" }}>
                  <DI name={t} size={13} extraStyle={{ opacity:0.5 }}/>{t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   CERT MODAL — Google Drive iframe
═══════════════════════════════════════════════════════ */
function CertModal({ onClose }) {
  return (
    <div onClick={onClose}
      style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.92)", backdropFilter:"blur(8px)", zIndex:9999, display:"flex", alignItems:"center", justifyContent:"center", padding:"32px", cursor:"zoom-out" }}
    >
      <div onClick={e => e.stopPropagation()} style={{ position:"relative", width:"min(860px,95vw)", cursor:"default", animation:`_si ${MS.reveal} ${E} 0s both` }}>
        <button onClick={onClose} data-magnetic
          style={{ position:"absolute", top:"-50px", right:0, width:"40px", height:"40px", background:"rgba(255,255,255,0.08)", border:`1px solid rgba(255,255,255,0.15)`, borderRadius:"50%", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", color:"rgba(255,255,255,0.70)", fontSize:"16px", transition:`background ${MS.fast} ${E}` }}
          onMouseEnter={(e) => e.currentTarget.style.background="rgba(255,255,255,0.16)"}
          onMouseLeave={(e) => e.currentTarget.style.background="rgba(255,255,255,0.08)"}
        >✕</button>
        <div style={{ borderRadius:"12px", overflow:"hidden", border:`1px solid rgba(255,255,255,0.12)`, background:"#111" }}>
          <iframe
            src={CERT_EMBED_URL}
            title="BrainoVision Winner Certificate"
            allow="autoplay"
            style={{ display:"block", width:"100%", height:"min(75vh,620px)", border:"none" }}
          />
        </div>
        <div style={{ marginTop:"16px", display:"flex", gap:"10px", justifyContent:"center" }}>
          <a href={CERT_DRIVE_LINK} target="_blank" rel="noopener noreferrer" data-magnetic
            style={{ fontFamily:"'DM Mono',monospace", fontSize:"11px", fontWeight:500, letterSpacing:"0.08em", color:"rgba(255,255,255,0.55)", background:"rgba(255,255,255,0.05)", border:`1px solid rgba(255,255,255,0.10)`, borderRadius:"6px", padding:"8px 18px", textDecoration:"none", display:"inline-flex", alignItems:"center", gap:"6px", transition:`background ${MS.fast} ${E}, color ${MS.fast} ${E}` }}
            onMouseEnter={(e) => { e.currentTarget.style.background="rgba(255,255,255,0.10)"; e.currentTarget.style.color="#FFFFFF"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background="rgba(255,255,255,0.05)"; e.currentTarget.style.color="rgba(255,255,255,0.55)"; }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            Open in Drive
          </a>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   CERT BUTTON PRIMARY — needs showCert setter passed via prop
   (rendered inside ROOT PAGE via closure instead)
═══════════════════════════════════════════════════════ */
function CertButtonPrimary({ onOpen }) {
  const [hov, setHov] = useState(false);
  return (
    <button data-magnetic onClick={onOpen}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"13px 16px", borderRadius:"8px", background:hov?"rgba(255,255,255,0.12)":"rgba(255,255,255,0.07)", border:`1px solid ${hov?"rgba(255,255,255,0.25)":"rgba(255,255,255,0.12)"}`, cursor:"pointer", transition:`background ${MS.fast} ${E}, border-color ${MS.fast} ${E}`, width:"100%" }}
    >
      <div style={{ display:"flex", alignItems:"center", gap:"10px" }}>
        <span style={{ fontSize:"13px" }}>🏆</span>
        <span style={{ fontFamily:"'DM Mono',monospace", fontSize:"11px", fontWeight:500, letterSpacing:"0.06em", color:hov?"#FFFFFF":"rgba(255,255,255,0.65)" }}>View Full Certificate</span>
      </div>
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={hov?"rgba(255,255,255,0.80)":"rgba(255,255,255,0.35)"} strokeWidth="2" strokeLinecap="round" style={{ transform:hov?"translateX(3px)":"translateX(0)", transition:`transform ${MS.fast} ${E}` }}><path d="M5 12h14M12 5l7 7-7 7"/></svg>
    </button>
  );
}

/* ═══════════════════════════════════════════════════════
   ROOT PAGE
═══════════════════════════════════════════════════════ */
export default function Hackathons() {
  const [hR, hV]   = useInView(0.08);
  const [oR, oV]   = useInView(0.10);
  const [cR, cV]   = useInView(0.04);
  const [mR, mV]   = useInView(0.10);
  const [pR, pV]   = useInView(0.08);
  const [chR, chV] = useInView(0.08);
  const [fR, fV]   = useInView(0.04);

  const [activeSection, setActiveSection] = useState(0);
  const [selectedPhase, setSelectedPhase] = useState(null);
  const [showCert, setShowCert]           = useState(false);

  useEffect(() => {
    const fn = () => {
      const mid = window.innerHeight / 2;
      SECTIONS.forEach((s, i) => {
        const el = document.getElementById(s.id);
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
      <MagneticCursor/>
      <SideNav active={activeSection}/>

      {/* Background grid texture */}
      <div aria-hidden="true" style={{ position:"fixed", inset:0, zIndex:0, pointerEvents:"none", backgroundImage:["linear-gradient(rgba(255,255,255,0.016) 1px, transparent 1px)","linear-gradient(90deg, rgba(255,255,255,0.016) 1px, transparent 1px)"].join(","), backgroundSize:"64px 64px", maskImage:"radial-gradient(ellipse 80% 55% at 50% 25%, black 10%, transparent)", WebkitMaskImage:"radial-gradient(ellipse 80% 55% at 50% 25%, black 10%, transparent)" }}/>

      <div style={{ position:"relative", zIndex:1 }}>

        {/* ─────────────────── HERO ─────────────────── */}
        <header ref={hR} id="overview" style={{ ...SP("8rem","5rem"), background:"#0B0B0B" }}>
          <div style={W}>
            {/* Eyebrow */}
            <div style={{ display:"flex", alignItems:"center", gap:"12px", marginBottom:"2rem", opacity:hV?1:0, animation:hV?`_rtl ${MS.slow} ${E} 0.05s both`:"none" }}>
              <div style={{ width:"20px", height:"1px", background:"rgba(255,255,255,0.55)" }}/>
              <ML>Hackathon Case Study · BrainoVision 2024 · National Champion</ML>
              <TermCursor/>
            </div>

            {/* Headline */}
            <h1 style={{ fontFamily:"'Dancing Script',cursive", fontSize:"clamp(3.5rem,8vw,7rem)", fontWeight:700, color:"#FFFFFF", lineHeight:1.03, letterSpacing:"-0.03em", marginBottom:"1.5rem", maxWidth:"860px", opacity:hV?1:0, animation:hV?`_rtl ${MS.reveal} ${E} 0.12s both`:"none" }}>
              Building a Scalable<br/>Marketplace in 24 Hours
            </h1>

            {/* Sub */}
            <p style={{ fontSize:"1rem", color:"rgba(255,255,255,0.42)", lineHeight:1.75, maxWidth:"580px", marginBottom:"3rem", opacity:hV?1:0, animation:hV?`_rtl ${MS.reveal} ${E} 0.20s both`:"none" }}>
              Architected and deployed a production-ready peer-to-peer marketplace for second-hand electronics. Led backend infrastructure, real-time bidding system, and Stripe payments — from zero to 500 concurrent users.
            </p>

            {/* Award badge */}
            <div style={{ display:"inline-flex", alignItems:"center", gap:"10px", padding:"10px 18px", background:"rgba(255,255,255,0.05)", border:`1px solid rgba(255,255,255,0.12)`, borderRadius:"999px", marginBottom:"3rem", opacity:hV?1:0, animation:hV?`_rtl ${MS.slow} ${E} 0.24s both`:"none" }}>
              <div style={{ width:"5px", height:"5px", borderRadius:"50%", background:"#FFFFFF", animation:"_pulse 2.2s ease-in-out infinite" }}/>
              <ML color="rgba(255,255,255,0.65)">National Championship Winner — BrainoVision 2024</ML>
              <button data-magnetic onClick={() => setShowCert(true)}
                style={{ fontFamily:"'DM Mono',monospace", fontSize:"10px", fontWeight:500, letterSpacing:"0.06em", color:"rgba(255,255,255,0.50)", background:"none", border:"1px solid rgba(255,255,255,0.15)", borderRadius:"4px", padding:"3px 9px", cursor:"pointer", transition:`border-color ${MS.fast} ${E}, color ${MS.fast} ${E}` }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor="rgba(255,255,255,0.35)"; e.currentTarget.style.color="#FFFFFF"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor="rgba(255,255,255,0.15)"; e.currentTarget.style.color="rgba(255,255,255,0.50)"; }}
              >View Certificate →</button>
            </div>

            {/* Pillars */}
            <div className="hpillars" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"1px", background:"rgba(255,255,255,0.06)", borderRadius:"12px", overflow:"hidden", border:`1px solid rgba(255,255,255,0.06)`, opacity:hV?1:0, animation:hV?`_si ${MS.slow} ${E} 0.28s both`:"none" }}>
              {[
                { label:"Production Backend",  desc:"REST + WebSocket APIs, fully deployed",      icons:["Node.js","Express","MongoDB"]     },
                { label:"Real-time Systems",   desc:"Sub-50ms bid propagation at scale",           icons:["Socket.io","Redis","Docker"]      },
                { label:"Secure Payments",     desc:"Stripe Connect escrow + OAuth 2.0 auth",     icons:["Stripe","JWT","AWS"]              },
              ].map((p, i) => (
                <div key={i} style={{ padding:"1.75rem 1.5rem", background:"#0B0B0B" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:"8px", marginBottom:"8px" }}>
                    <div style={{ width:"4px", height:"4px", borderRadius:"50%", background:"rgba(255,255,255,0.55)" }}/>
                    <span style={{ fontSize:"13.5px", fontWeight:600, color:"#FFFFFF" }}>{p.label}</span>
                  </div>
                  <p style={{ fontSize:"12px", color:"rgba(255,255,255,0.38)", lineHeight:1.6, marginBottom:"12px" }}>{p.desc}</p>
                  <div style={{ display:"flex", gap:"6px" }}>
                    {p.icons.map((ic, ii) => (
                      <img key={ic} src={ICONS[ic]} alt={ic} className="di" width={18} height={18} loading="lazy"
                        style={{ display:"block", borderRadius:"2px", opacity:0.5, animation:hV?`_iconIn 280ms ${E} ${0.34+i*0.06+ii*0.04}s both`:"none" }}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </header>

        {/* Marquee */}
        <Marquee speed={34}/>

        {/* ─────────────────── CERTIFICATE SECTION ─────────────────── */}
        <section ref={oR} style={{ ...SP("4rem","4rem"), background:"#0B0B0B" }}>
          <div style={W}>
            {/* Two-column: left = text+buttons, right = live iframe */}
            <div className="ovgrid" style={{ display:"grid", gridTemplateColumns:"1fr 1.4fr", gap:"3rem", alignItems:"stretch", opacity:oV?1:0, animation:oV?`_rtl ${MS.reveal} ${E} 0.05s both`:"none" }}>

              {/* LEFT — info + CTA buttons */}
              <div style={{ display:"flex", flexDirection:"column", justifyContent:"center", gap:"0" }}>
                <div style={{ padding:"2.5rem 2.5rem 2rem", borderRadius:"14px 14px 0 0", border:`1px solid rgba(255,255,255,0.08)`, borderBottom:"none", background:"rgba(255,255,255,0.03)" }}>
                  {/* Trophy icon row */}
                  <div style={{ display:"flex", alignItems:"center", gap:"8px", marginBottom:"20px" }}>
                    <div style={{ width:"28px", height:"28px", borderRadius:"7px", background:"rgba(255,255,255,0.06)", border:`1px solid rgba(255,255,255,0.10)`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"14px" }}>🏆</div>
                    <ML color="rgba(255,255,255,0.45)">National Winner Certificate</ML>
                  </div>
                  <h2 style={{ fontFamily:"'Dancing Script',cursive", fontSize:"2.4rem", fontWeight:700, color:"#FFFFFF", lineHeight:1.1, letterSpacing:"-0.025em", marginBottom:"12px" }}>
                    BrainoVision 2024
                  </h2>
                  <p style={{ fontSize:"13.5px", color:"rgba(255,255,255,0.38)", lineHeight:1.75, marginBottom:"0" }}>
                    First place at the national championship. Awarded for engineering execution, architecture decisions, and live production deployment — all within 24 hours.
                  </p>
                </div>

                {/* Stat strip */}
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1px", background:"rgba(255,255,255,0.06)", border:`1px solid rgba(255,255,255,0.08)`, borderTop:"none", borderBottom:"none" }}>
                  {[
                    { v:"24h",        l:"Build Time"     },
                    { v:"1st Place",  l:"Rank"           },
                    { v:"National",   l:"Scope"          },
                    { v:"2024",       l:"Year"           },
                  ].map((s, i) => (
                    <div key={i} style={{ padding:"1rem 1.25rem", background:"rgba(255,255,255,0.02)" }}>
                      <div style={{ fontFamily:"'Dancing Script',cursive", fontSize:"1.6rem", fontWeight:700, color:"#FFFFFF", lineHeight:1, marginBottom:"3px" }}>{s.v}</div>
                      <ML color="rgba(255,255,255,0.30)" style={{ fontSize:"9px" }}>{s.l}</ML>
                    </div>
                  ))}
                </div>

                {/* Buttons */}
                <div style={{ display:"flex", flexDirection:"column", gap:"8px", padding:"1.5rem 2rem", border:`1px solid rgba(255,255,255,0.08)`, borderTop:"none", borderRadius:"0 0 14px 14px", background:"rgba(255,255,255,0.02)" }}>
                  {/* Primary — open modal */}
                  <CertButtonPrimary onOpen={() => setShowCert(true)} />
                  {/* Secondary — open drive */}
                  <a href={CERT_DRIVE_LINK} target="_blank" rel="noopener noreferrer" data-magnetic
                    style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"13px 16px", borderRadius:"8px", textDecoration:"none", background:"rgba(255,255,255,0.03)", border:`1px solid rgba(255,255,255,0.07)`, transition:`background ${MS.fast} ${E}, border-color ${MS.fast} ${E}` }}
                    onMouseEnter={(e) => { e.currentTarget.style.background="rgba(255,255,255,0.07)"; e.currentTarget.style.borderColor="rgba(255,255,255,0.14)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background="rgba(255,255,255,0.03)"; e.currentTarget.style.borderColor="rgba(255,255,255,0.07)"; }}
                  >
                    <div style={{ display:"flex", alignItems:"center", gap:"10px" }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.50)" strokeWidth="2" strokeLinecap="round"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                      <span style={{ fontFamily:"'DM Mono',monospace", fontSize:"11px", fontWeight:500, letterSpacing:"0.06em", color:"rgba(255,255,255,0.45)" }}>Open in Google Drive</span>
                    </div>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="2" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </a>
                </div>
              </div>

              {/* RIGHT — live Google Drive iframe */}
              <div style={{ borderRadius:"14px", overflow:"hidden", border:`1px solid rgba(255,255,255,0.08)`, background:"#0A0A0A", position:"relative", minHeight:"420px" }}>
                {/* Corner label */}
                <div style={{ position:"absolute", top:"12px", left:"12px", zIndex:2, display:"flex", alignItems:"center", gap:"6px", padding:"4px 10px", background:"rgba(0,0,0,0.70)", borderRadius:"999px", backdropFilter:"blur(6px)", border:`1px solid rgba(255,255,255,0.08)` }}>
                  <div style={{ width:"5px", height:"5px", borderRadius:"50%", background:"rgba(255,255,255,0.80)", animation:"_pulse 2.2s ease-in-out infinite" }}/>
                  <ML color="rgba(255,255,255,0.55)" style={{ fontSize:"9px" }}>Live Preview</ML>
                </div>
                <iframe
                  src={CERT_EMBED_URL}
                  title="BrainoVision Certificate Live Preview"
                  allow="autoplay"
                  style={{ display:"block", width:"100%", height:"100%", minHeight:"420px", border:"none" }}
                />
              </div>
            </div>
          </div>
        </section>

        <Marquee speed={40}/>

        {/* ─────────────────── OVERVIEW PANEL ─────────────────── */}
        <section style={{ ...SP("4rem","5rem"), background:"#0B0B0B" }}>
          <div style={W}>
            <div style={{ padding:"2.5rem 3rem", borderRadius:"14px", border:`1px solid rgba(255,255,255,0.08)`, background:"rgba(255,255,255,0.04)" }}>
              <div className="ovgrid" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"3rem", alignItems:"center" }}>
                <div>
                  <ML style={{ marginBottom:"14px" }}>Primary Achievement</ML>
                  <h2 style={{ fontFamily:"'Dancing Script',cursive", fontSize:"2.8rem", fontWeight:700, color:"#FFFFFF", letterSpacing:"-0.025em", lineHeight:1.1, marginBottom:"12px" }}>
                    Full-Stack × Real-time × Payments
                  </h2>
                  <p style={{ fontSize:"14px", color:"rgba(255,255,255,0.42)", lineHeight:1.75 }}>
                    A production architecture decision made every 15 minutes — database strategy, auth model, WebSocket scaling, payment escrow — all under a 24-hour clock.
                  </p>
                </div>
                <div style={{ display:"flex", flexDirection:"column", gap:"8px" }}>
                  {[
                    { pair:"Node.js × Socket.io",  icons:["Node.js","Socket.io"],  note:"Real-time bidding engine" },
                    { pair:"MongoDB × Redis",       icons:["MongoDB","Redis"],      note:"Hybrid persistence layer" },
                    { pair:"Stripe × AWS EC2",      icons:["Stripe","AWS"],         note:"Payments + production deploy" },
                  ].map((x, i) => (
                    <div key={i} style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"10px 14px", borderRadius:"8px", background:"rgba(255,255,255,0.04)", border:`1px solid rgba(255,255,255,0.07)` }}>
                      <div style={{ display:"flex", alignItems:"center", gap:"8px" }}>
                        {x.icons.map(ic => (
                          <img key={ic} src={ICONS[ic]} alt={ic} className="di" width={16} height={16} loading="lazy" style={{ display:"block", borderRadius:"2px" }}/>
                        ))}
                        <span style={{ fontFamily:"'DM Mono',monospace", fontSize:"12px", fontWeight:500, color:"#FFFFFF" }}>{x.pair}</span>
                      </div>
                      <span style={{ fontSize:"11.5px", color:"rgba(255,255,255,0.38)" }}>{x.note}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─────────────────── EXECUTION TIMELINE ─────────────────── */}
        <section ref={cR} id="timeline"
          style={{ borderTop:`1px solid rgba(255,255,255,0.06)`, borderBottom:`1px solid rgba(255,255,255,0.06)`, background:"#0B0B0B" }}
        >
          <div style={W}>
            <div style={{ padding:"4rem 0 2.5rem" }}>
              <SH eyebrow="Section 02" title="Execution Timeline" sub="Four engineering phases across 24 hours. Every row is a decision under pressure." visible={cV} cursor/>
            </div>
          </div>
          {executionPhases.map((phase, i) => (
            <div key={phase.id} id={`phase-${phase.id}`}>
              <div style={W}>
                <PhaseRow phase={phase} visible={cV} delay={i*0.09} ri={i} onSelect={setSelectedPhase}/>
              </div>
            </div>
          ))}
          <div style={{ height:"3rem" }}/>
        </section>

        <Marquee speed={28}/>

        {/* ─────────────────── METRICS ─────────────────── */}
        <section ref={mR} id="outcome" style={{ ...SP(), background:"#0F0F0F" }}>
          <div style={W}>
            <SH eyebrow="Section 03" title="Impact Metrics" visible={mV}/>
            <div className="stats-grid" style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(190px,1fr))", gap:"1px", background:"rgba(255,255,255,0.06)", border:`1px solid rgba(255,255,255,0.06)`, borderRadius:"12px", overflow:"hidden" }}>
              {[
                { value:25,  suffix:"+",  label:"API Endpoints",       sub:"REST + WebSocket layer"  },
                { value:45,  suffix:"ms", label:"Bid Latency",          sub:"Real-time propagation"  },
                { value:500, suffix:"",   label:"Concurrent Users",     sub:"Load-tested live"       },
                { value:85,  suffix:"ms", label:"API Response p95",     sub:"Under full auction load" },
                { value:0,   suffix:"",   label:"Fraud Incidents",      sub:"Zero duplicate payments"},
              ].map((m, i) => (
                <MetCard key={i} {...m} triggered={mV} delay={i*0.06}/>
              ))}
            </div>
          </div>
        </section>

        {/* ─────────────────── ARCHITECTURE ─────────────────── */}
        <section ref={pR} id="architecture"
          style={{ ...SP(), background:"#000000", position:"relative", overflow:"hidden" }}
        >
          <div aria-hidden="true" style={{ position:"absolute", left:"-8%", bottom:"-25%", width:"480px", height:"480px", borderRadius:"50%", background:"radial-gradient(circle, rgba(255,255,255,0.03), transparent 70%)", filter:"blur(70px)", pointerEvents:"none", opacity:pV?1:0, transition:`opacity 0.8s ${E}` }}/>
          <div style={{ ...W, position:"relative", zIndex:1 }}>
            <SH eyebrow="Section 04" title="Architecture Decisions" sub="Four strategic choices that determined the outcome." visible={pV} dark/>
            <div className="pgrid" style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:"1px", background:"rgba(255,255,255,0.04)", border:`1px solid rgba(255,255,255,0.06)`, borderRadius:"12px", overflow:"hidden" }}>
              {architectureDecisions.map((item, i) => (
                <ArchCard key={i} item={item} visible={pV} delay={i*0.08} idx={i}/>
              ))}
            </div>
          </div>
        </section>

        {/* ─────────────────── CHALLENGES ─────────────────── */}
        <section ref={chR} id="challenges"
          style={{ ...SP(), borderTop:`1px solid rgba(255,255,255,0.06)`, background:"#0B0B0B" }}
        >
          <div style={W}>
            <SH eyebrow="Section 05" title="Challenges & Resolutions" sub="Three critical problems — each caught and solved under the 24h clock." visible={chV}/>
            <div className="three-col" style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))", gap:"12px" }}>
              {challenges.map((c, i) => (
                <ChallengeCard key={c.n} item={c} visible={chV} delay={i*0.09}/>
              ))}
            </div>
          </div>
        </section>

        {/* ─────────────────── FOOTER ─────────────────── */}
        <footer ref={fR} style={{ background:"#000000", position:"relative", overflow:"hidden" }}>
          {/* Wave */}
          <div style={{ position:"relative", height:"56px", background:"#0B0B0B", overflow:"hidden" }}>
            <svg viewBox="0 0 1440 56" preserveAspectRatio="none" style={{ position:"absolute", bottom:0, left:0, width:"100%", height:"100%" }}>
              <path d="M0,0 C360,56 720,0 1080,28 C1260,42 1380,14 1440,28 L1440,56 L0,56 Z" fill="#000000"/>
            </svg>
          </div>

          <div aria-hidden="true" style={{ position:"absolute", inset:0, zIndex:0, pointerEvents:"none", backgroundImage:["linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)","linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)"].join(","), backgroundSize:"48px 48px" }}/>
          <div aria-hidden="true" style={{ position:"absolute", left:"-5%", top:"15%", width:"420px", height:"420px", borderRadius:"50%", background:"radial-gradient(circle, rgba(255,255,255,0.04), transparent 70%)", filter:"blur(60px)", pointerEvents:"none" }}/>

          <div style={{ ...W, position:"relative", zIndex:1 }}>
            {/* CTA row */}
            <div style={{ borderBottom:`1px solid rgba(255,255,255,0.06)`, padding:"4rem 0" }}>
              <div className="fctar" style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", gap:"2.5rem", flexWrap:"wrap" }}>
                <div style={{ maxWidth:"540px" }}>
                  <div style={{ display:"inline-flex", alignItems:"center", gap:"6px", padding:"5px 12px", borderRadius:"999px", background:"rgba(255,255,255,0.06)", border:`1px solid rgba(255,255,255,0.12)`, marginBottom:"20px", opacity:fV?1:0, animation:fV?`_rtl ${MS.slow} ${E} 0.05s both`:"none" }}>
                    <div style={{ width:"5px", height:"5px", borderRadius:"50%", background:"rgba(255,255,255,0.85)", animation:"_pulse 2.2s ease-in-out infinite" }}/>
                    <ML color="rgba(255,255,255,0.65)">Open to Opportunities · 2026</ML>
                  </div>
                  <h2 style={{ fontFamily:"'Dancing Script',cursive", fontSize:"clamp(3rem,6vw,5.5rem)", fontWeight:700, color:"#FFFFFF", lineHeight:1.04, letterSpacing:"-0.03em", marginBottom:"14px", opacity:fV?1:0, animation:fV?`_rtl ${MS.reveal} ${E} 0.12s both`:"none" }}>
                    Let's Build Something<br/>That Scales
                  </h2>
                  <p style={{ fontSize:"15px", color:"rgba(255,255,255,0.35)", lineHeight:1.75, maxWidth:"400px", opacity:fV?1:0, animation:fV?`_rtl ${MS.reveal} ${E} 0.20s both`:"none" }}>
                    Systems engineer. Product thinker. Built a national-winning marketplace in 24 hours. Ready to do it at scale with the right team.
                  </p>
                </div>
                <div style={{ display:"flex", flexDirection:"column", gap:"10px", minWidth:"230px" }}>
                  <FooterCTA label="Schedule Interview" sub="Primary" href="mailto:g.sivasatyasaibhagavan@gmail.com" accent visible={fV} delay={0.16}/>
                  <FooterCTA label="View Portfolio"     sub="Work"    href="/"                                           accent={false} visible={fV} delay={0.22}/>
                  <FooterCTA label="GitHub Projects"    sub="Code"    href="https://github.com/bhagavan444"             accent={false} visible={fV} delay={0.28}/>
                </div>
              </div>
            </div>

            {/* Footer meta */}
            <div className="fgrid" style={{ display:"grid", gridTemplateColumns:"2fr 1fr 1fr 1fr", gap:"2.5rem", padding:"3rem 0 2.5rem" }}>
              <div>
                <div style={{ fontFamily:"'Dancing Script',cursive", fontSize:"2rem", fontWeight:700, color:"#FFFFFF", letterSpacing:"-0.03em", marginBottom:"10px" }}>
                  Bhagavan<span style={{ color:"rgba(255,255,255,0.35)" }}>.</span>
                </div>
                <p style={{ fontSize:"12.5px", color:"rgba(255,255,255,0.28)", lineHeight:1.75, marginBottom:"20px", maxWidth:"240px" }}>
                  B.Tech AIDS · Ramachandra College · Andhra Pradesh, India.
                </p>
                <div style={{ display:"flex", gap:"6px" }}>
                  {[
                    { l:"GH", h:"https://github.com/bhagavan444" },
                    { l:"LI", h:"https://www.linkedin.com/in/gopalajosyula-siva-satya-sai-bhagavan-1624a027b/" },
                    { l:"✉",  h:"mailto:g.sivasatyasaibhagavan@gmail.com" },
                  ].map((s, i) => (
                    <a key={i} href={s.h} data-magnetic target={s.h.startsWith("http")?"_blank":undefined} rel={s.h.startsWith("http")?"noopener noreferrer":undefined}
                      style={{ width:"32px", height:"32px", borderRadius:"7px", background:"rgba(255,255,255,0.04)", border:`1px solid rgba(255,255,255,0.08)`, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'DM Mono',monospace", color:"rgba(255,255,255,0.35)", textDecoration:"none", fontSize:"11px" }}
                    >{s.l}</a>
                  ))}
                </div>
              </div>
              <div>
                <ML color="rgba(255,255,255,0.18)" style={{ marginBottom:"18px" }}>Navigate</ML>
                {["Overview","Timeline","Architecture","Challenges","Outcome"].map((l, i) => (
                  <a key={i} href="#" style={{ display:"block", fontSize:"13px", color:"rgba(255,255,255,0.32)", textDecoration:"none", marginBottom:"10px" }}>{l}</a>
                ))}
              </div>
              <div>
                <ML color="rgba(255,255,255,0.18)" style={{ marginBottom:"18px" }}>Work</ML>
                {[{ l:"All Projects", h:"/projects" },{ l:"GitHub", h:"https://github.com/bhagavan444" },{ l:"Skills Page", h:"/skills" },{ l:"Resume / CV", h:"#" }].map((l, i) => (
                  <a key={i} href={l.h} style={{ display:"block", fontSize:"13px", color:"rgba(255,255,255,0.32)", textDecoration:"none", marginBottom:"10px" }}>{l.l}</a>
                ))}
              </div>
              <div>
                <ML color="rgba(255,255,255,0.18)" style={{ marginBottom:"18px" }}>Contact</ML>
                {[
                  { lb:"Email",    v:"g.sivasatyasaibhagavan@gmail.com" },
                  { lb:"Phone",    v:"+91 7569205626"                   },
                  { lb:"Location", v:"Andhra Pradesh, IN"               },
                  { lb:"Status",   v:"Available · Immediate", bright:true },
                ].map((c, i) => (
                  <div key={i} style={{ marginBottom:"14px" }}>
                    <ML color="rgba(255,255,255,0.20)" style={{ fontSize:"9px", marginBottom:"3px" }}>{c.lb}</ML>
                    <div style={{ fontSize:"12.5px", color:c.bright?"rgba(255,255,255,0.85)":"rgba(255,255,255,0.42)" }}>{c.v}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom bar */}
            <div style={{ borderTop:`1px solid rgba(255,255,255,0.06)`, padding:"1.5rem 0", display:"flex", alignItems:"center", justifyContent:"space-between", gap:"1rem", flexWrap:"wrap" }}>
              <div style={{ fontFamily:"'DM Mono',monospace", fontSize:"11px", color:"rgba(255,255,255,0.20)" }}>
                © 2026 Siva Satya Sai Bhagavan
              </div>
              <div style={{ display:"flex", gap:"20px" }}>
                {["Privacy","Terms","Sitemap"].map(l => (
                  <a key={l} href="#" style={{ fontFamily:"'DM Mono',monospace", fontSize:"11px", color:"rgba(255,255,255,0.20)", textDecoration:"none" }}>{l}</a>
                ))}
              </div>
              <div style={{ display:"flex", alignItems:"center", gap:"6px" }}>
                <div style={{ width:"5px", height:"5px", borderRadius:"50%", background:"rgba(255,255,255,0.75)", animation:"_pulse 2.2s ease-in-out infinite" }}/>
                <span style={{ fontFamily:"'DM Mono',monospace", fontSize:"11px", color:"rgba(255,255,255,0.55)" }}>Available for hire</span>
              </div>
            </div>
          </div>
        </footer>
      </div>

      {/* Modals */}
      <PhaseModal phase={selectedPhase} onClose={() => setSelectedPhase(null)}/>
      {showCert && <CertModal onClose={() => setShowCert(false)}/>}
    </>
  );
}