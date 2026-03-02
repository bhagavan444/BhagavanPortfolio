"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Trophy, Award, Users, Code2, GitBranch, Briefcase,
  GraduationCap, Target, CheckCircle2, ExternalLink,
  Github, Linkedin, Download, X, ChevronRight,
  Zap, Shield, TrendingUp, Cpu, Layers, MapPin, ArrowUpRight
} from "lucide-react";

/* ═══════════════════════════════════════════════════════════════
   DESIGN TOKENS — Pure Black & White Architectural System
═══════════════════════════════════════════════════════════════ */
const C = {
  bg:        "#0B0B0B",
  surface:   "#111111",
  white:     "#151515",
  border:    "rgba(255,255,255,0.06)",
  border2:   "rgba(255,255,255,0.12)",
  text:      "#FFFFFF",
  muted:     "rgba(255,255,255,0.55)",
  muted2:    "rgba(255,255,255,0.70)",
  accent:    "#FFFFFF",
  accentSub: "rgba(255,255,255,0.04)",
};

const E = "cubic-bezier(0.16, 1, 0.3, 1)";

/* ═══════════════════════════════════════════════════════════════
   DEVICON CDN MAP
═══════════════════════════════════════════════════════════════ */
const IB = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons";
const ICONS = {
  "React":           `${IB}/react/react-original.svg`,
  "Node.js":         `${IB}/nodejs/nodejs-original.svg`,
  "Express":         `${IB}/express/express-original.svg`,
  "MongoDB":         `${IB}/mongodb/mongodb-original.svg`,
  "Socket.io":       `${IB}/socketio/socketio-original.svg`,
  "Docker":          `${IB}/docker/docker-original.svg`,
  "AWS":             `${IB}/amazonwebservices/amazonwebservices-original-wordmark.svg`,
  "Python":          `${IB}/python/python-original.svg`,
  "TensorFlow":      `${IB}/tensorflow/tensorflow-original.svg`,
  "Kubernetes":      `${IB}/kubernetes/kubernetes-original.svg`,
  "Django":          `${IB}/django/django-plain.svg`,
  "PostgreSQL":      `${IB}/postgresql/postgresql-original.svg`,
  "Git":             `${IB}/git/git-original.svg`,
  "GitHub Actions":  `${IB}/github/github-original.svg`,
  "JavaScript":      `${IB}/javascript/javascript-original.svg`,
  "Vercel":          `${IB}/vercel/vercel-original.svg`,
  "JWT":             `${IB}/nodejs/nodejs-plain.svg`,
};

const TICKER = [
  "React","Node.js","MongoDB","Docker","AWS","Python","TensorFlow",
  "JavaScript","PostgreSQL","Git","Django","Kubernetes","Express","GitHub Actions",
];

/* ═══════════════════════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════════════════════ */
const ACHIEVEMENTS = [
  {
    id: 1,
    year: "2024",
    category: "Competition",
    icon: Trophy,
    title: "Hackathon — 1st Place",
    event: "Brainovision Talent Hunt 2024",
    rank: "1st Place · National Level",
    duration: "24 hours",
    location: "National",
    context: "24-hour hackathon with 200+ participating teams. Task was to build a functional e-commerce platform within the time limit. Team of 5, open to all engineering students nationally.",
    ownership: "Served as team lead and primary backend developer. Responsible for system architecture, authentication implementation, and coordinating task distribution among teammates.",
    decisions: [
      "Chose MERN stack based on team familiarity and development speed under time constraint",
      "Used JWT with short expiry + refresh token pattern to handle auth without over-engineering",
      "Added Socket.io for real-time bid updates — accepted the added complexity for a key feature requirement",
      "Containerized with Docker to avoid environment mismatch issues during final demo deployment",
    ],
    risks: [
      "Time constraint risked incomplete features → Prioritized core functionality first, added extras only after core was stable",
      "Real-time feature could introduce bugs under demo pressure → Tested with multiple browser sessions before submission",
      "Docker setup unfamiliar to some teammates → Documented steps and walked through setup together",
    ],
    outcome: "Placed 1st among 200+ teams. Won ₹50,000 prize. Judges noted the deployment setup and authentication flow as well-structured for a 24-hour build.",
    tech: ["React", "Node.js", "MongoDB", "Socket.io", "JWT", "Docker", "AWS"],
    metrics: { team: "5 members", competitors: "200+ teams", codebase: "~6,000 lines" },
    impact: [
      { metric: "1st",   label: "National Rank",   detail: "Among 200+ competing teams across India" },
      { metric: "₹50K",  label: "Prize Won",       detail: "Cash prize awarded by judges" },
      { metric: "24h",   label: "Build Window",    detail: "Full working solution delivered in 24 hours" },
    ],
  },
  {
    id: 2,
    year: "2023–25",
    category: "Professional Development",
    icon: GraduationCap,
    title: "Technical Certifications",
    event: "AWS · Coursera · Udemy",
    rank: "15+ Certifications Completed",
    duration: "Ongoing",
    location: "Self-directed",
    context: "Completed certifications across cloud infrastructure, full-stack development, and machine learning over two years. Certifications were selected based on gaps identified during project work, not collected arbitrarily.",
    ownership: "Self-directed. Identified which domains to study based on what was blocking project progress. Applied each certification's concepts in a personal project within the same month.",
    decisions: [
      "Started with AWS fundamentals before deploying any backend to production infrastructure",
      "Focused on the JavaScript/Node.js ecosystem to maintain consistency across frontend and backend projects",
      "Studied ML theory certifications before building classification projects to understand model behavior",
      "Completed a Docker + CI/CD certification after struggling with manual deployment on an early project",
    ],
    risks: [
      "Risk of completing certs without retaining knowledge → Immediately applied each topic in a project",
      "Risk of shallow breadth across too many domains → Limited to 3 core domains with deeper project work in each",
      "Risk of theoretical-only understanding → Every certification was followed by hands-on implementation",
    ],
    outcome: "15+ certifications completed across cloud, full-stack, and AI/ML. Concepts directly applied in 6 personal projects. Contributed to more structured decision-making in project architecture.",
    tech: ["AWS", "React", "Python", "TensorFlow", "Docker", "Kubernetes", "Node.js"],
    metrics: { total: "15+ certs", platforms: "AWS, Coursera, Udemy", domains: "Cloud, Full-Stack, AI/ML" },
    impact: [
      { metric: "15+",  label: "Certifications",   detail: "Across cloud, full-stack, and AI/ML domains" },
      { metric: "3",    label: "Core Domains",     detail: "Cloud · Full-Stack · AI/ML" },
      { metric: "6",    label: "Projects Applied", detail: "Each cert concept applied hands-on" },
    ],
  },
  {
    id: 3,
    year: "2023–25",
    category: "Project Portfolio",
    icon: Code2,
    title: "Production Applications",
    event: "Personal & Academic Projects",
    rank: "6 Deployed Projects",
    duration: "Ongoing",
    location: "Deployed",
    context: "Built and deployed 6 applications independently across full-stack web development, machine learning, and data science. Each project was scoped, built, and deployed without external scaffolding.",
    ownership: "Sole developer on all 6 projects. Handled frontend, backend, database design, authentication, and deployment for each. Made all technical and architectural decisions independently.",
    decisions: [
      "Used MERN for projects requiring dynamic UIs and real-time data; Django for data-heavy or ML-backed backends",
      "Implemented auth (JWT or session-based) in every project as a consistent practice",
      "Chose PostgreSQL for structured relational data, MongoDB where schema flexibility was justified",
      "Deployed frontend on Vercel, backend on Railway, and used AWS EC2 for projects requiring custom infrastructure",
    ],
    risks: [
      "Maintaining 6 live projects solo creates update overhead → Used GitHub Actions for automated CI/CD where feasible",
      "Free-tier hosting has uptime and resource limits → Chose hosting based on each project's traffic expectations",
      "Knowledge silos from solo work → Documented architecture decisions and kept all repos public with READMEs",
    ],
    outcome: "All 6 projects deployed and accessible. Resume Builder receives consistent monthly traffic. Fake News Detector tested at 95% accuracy on the validation set. Each project targets a distinct technical domain.",
    tech: ["React", "Node.js", "Python", "Django", "PostgreSQL", "MongoDB", "AWS", "Vercel"],
    metrics: { deployed: "6 projects", domains: "Web, ML, DS", uptime: "Free-tier hosted" },
    impact: [
      { metric: "6",    label: "Deployed Apps",    detail: "Production apps across Web, ML, and DS" },
      { metric: "95%",  label: "Model Accuracy",   detail: "Fake News Detector validation accuracy" },
      { metric: "3",    label: "Tech Domains",     detail: "Full-stack · ML · Data Science" },
    ],
  },
  {
    id: 4,
    year: "2024–25",
    category: "Open Source",
    icon: GitBranch,
    title: "GitHub Activity",
    event: "Public Repositories & Code Sharing",
    rank: "12+ Public Repositories",
    duration: "Ongoing",
    location: "github.com/bhagavan444",
    context: "Maintained a public GitHub profile with projects spanning internship deliverables, personal builds, and learning exercises. Focused on clean commit history, readable READMEs, and reproducible setup instructions.",
    ownership: "Managed all repositories independently. Wrote documentation, responded to any questions, and maintained code quality across repos over time.",
    decisions: [
      "Open-sourced all personal projects to build a reviewable code record and make work verifiable",
      "Invested time in documentation to make repos usable without direct support",
      "Used semantic versioning and conventional commits on larger projects for structured history",
      "Added automated deployment workflows on projects where manual deployment was error-prone",
    ],
    risks: [
      "Public code invites scrutiny → Maintained consistent style, refactored before making repos public",
      "Dependency vulnerabilities in public repos → Used Dependabot alerts and updated packages regularly",
      "Community questions taking time → Clear docs reduced repetitive questions significantly",
    ],
    outcome: "12+ public repositories maintained. Profile serves as a working code portfolio across multiple domains. Consistent commit history reflects active, ongoing development practice.",
    tech: ["Git", "GitHub Actions", "JavaScript", "Python"],
    metrics: { repos: "12+ public", commits: "Consistent", focus: "Docs + CI/CD" },
    impact: [
      { metric: "12+",  label: "Public Repos",    detail: "Open-source profile across multiple domains" },
      { metric: "CI",   label: "GitHub Actions",  detail: "Automated deployment on select repos" },
      { metric: "100%", label: "Documented",      detail: "All repos have READMEs with setup steps" },
    ],
  },
  {
    id: 5,
    year: "2024–25",
    category: "Technical Skills",
    icon: Target,
    title: "DSA Problem Solving",
    event: "LeetCode · HackerRank",
    rank: "100+ Problems Solved",
    duration: "Ongoing",
    location: "LeetCode / HackerRank",
    context: "Practiced data structures and algorithms on LeetCode and HackerRank as part of interview preparation and to strengthen problem decomposition skills. Focus on understanding patterns, not just passing test cases.",
    ownership: "Self-directed practice schedule. Identified weak areas (graphs, DP) through failed attempts and targeted those specifically. Tracked progress manually to ensure coverage across topic categories.",
    decisions: [
      "Prioritized medium-difficulty problems after basics were solid, as they reflect actual interview difficulty",
      "Studied top solutions after each problem to understand alternative approaches and tradeoffs",
      "Practiced verbal explanation of solutions to prepare for interview communication",
      "Tracked problem categories to ensure coverage rather than solving whatever appeared by default",
    ],
    risks: [
      "Pattern memorization without understanding → Re-solved problems from scratch after 2 weeks to verify retention",
      "Narrow focus on competitive problems → Balanced with system design reading to cover interview breadth",
      "Platform-specific patterns not generalizing → Applied similar patterns in real project code where applicable",
    ],
    outcome: "Solved 100+ problems with documented coverage across core DSA topics. Improved ability to recognize patterns and evaluate time/space tradeoffs during project implementation decisions.",
    tech: ["Python", "JavaScript"],
    metrics: { problems: "100+", platforms: "LeetCode, HackerRank", focus: "Patterns, Complexity" },
    impact: [
      { metric: "100+", label: "Problems Solved",  detail: "Across arrays, trees, graphs, DP" },
      { metric: "2",    label: "Platforms",        detail: "LeetCode and HackerRank" },
      { metric: "Med",  label: "Difficulty Focus", detail: "Medium problems aligned to interview level" },
    ],
  },
  {
    id: 6,
    year: "2023–24",
    category: "Workshops & Learning",
    icon: Briefcase,
    title: "Technical Workshops",
    event: "AI/ML · Cloud · Full-Stack Training",
    rank: "4 Workshops Attended",
    duration: "Various",
    location: "Multiple venues",
    context: "Participated in 4 technical workshops covering AI/ML applications, cloud deployment, and full-stack development practices. Workshops were instructor-led with hands-on sessions and project components.",
    ownership: "Attended as an active participant. Completed all hands-on tasks during sessions and followed up by implementing related concepts in personal projects within the following week.",
    decisions: [
      "Selected workshops that addressed gaps in current project knowledge, not general interest topics",
      "Implemented one small project per workshop within the following week to apply and retain what was covered",
      "Focused on sessions with hands-on labs rather than lecture-only formats for better retention",
      "Documented key learnings in personal notes for future reference during project work",
    ],
    risks: [
      "Workshop content staying theoretical → Built a project using each workshop's tools within one week of completion",
      "Too many workshops diluting focus → Limited to 4 per year, selected deliberately",
      "Workshop network connections fading → Followed up with at least one question or message per contact",
    ],
    outcome: "Completed 4 workshops with hands-on project output from each. Gained working familiarity with enterprise tools (AWS console, TensorFlow pipelines, Docker Compose). Built 3 small projects directly from workshop content.",
    tech: ["TensorFlow", "AWS", "React", "Docker"],
    metrics: { workshops: "4 completed", hours: "40+ training", projects: "3 built" },
    impact: [
      { metric: "4",   label: "Workshops",      detail: "AI/ML · Cloud · Full-Stack tracks" },
      { metric: "40+", label: "Training Hours",  detail: "Instructor-led hands-on sessions" },
      { metric: "3",   label: "Projects Built",  detail: "Built from workshop content directly" },
    ],
  },
];

const METRICS = [
  { label: "Production Projects", value: "6",   suffix: "",  icon: Code2,        },
  { label: "National Hackathons", value: "3",   suffix: "",  icon: Trophy,       },
  { label: "Certifications",      value: "15",  suffix: "+", icon: Award,        },
  { label: "DSA Problems",        value: "100", suffix: "+", icon: Target,       },
  { label: "Public Repos",        value: "12",  suffix: "+", icon: GitBranch,    },
  { label: "Workshops",           value: "4",   suffix: "",  icon: Users,        },
];

const PRINCIPLES = [
  { icon: Layers,    title: "Build for Scalability",       description: "Design systems that handle growth without rewrites. Start with clean architecture and clear separation of concerns — scaling becomes a configuration problem, not a rebuild." },
  { icon: Shield,    title: "Secure by Default",           description: "Treat authentication, authorization, and input validation as core requirements from the start. Security added as an afterthought is harder to audit and easier to miss." },
  { icon: TrendingUp, title: "Measure Before Optimizing",  description: "Instrument systems with logging and basic monitoring before assuming where the bottleneck is. Optimize based on observed behavior, not guesswork." },
  { icon: Cpu,       title: "Make Tradeoffs Explicit",     description: "Every technical decision trades one thing for another. Document the reasoning behind architectural choices so the tradeoff is visible and reversible if requirements change." },
];

/* ═══════════════════════════════════════════════════════════════
   GLOBAL CSS — identical system to Education.jsx
═══════════════════════════════════════════════════════════════ */
const GLOBAL = `
  @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700;800;900&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&family=DM+Mono:wght@400;500&display=swap');

  *, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }
  html { scroll-behavior:smooth; overflow-x:hidden; }
  body {
    font-family:'DM Sans', system-ui, sans-serif;
    background:#0B0B0B; color:#FFFFFF;
    -webkit-font-smoothing:antialiased;
    overflow-x:hidden;
    cursor:none;
  }
  ::selection { background:rgba(255,255,255,0.12); }
  ::-webkit-scrollbar { width:2px; }
  ::-webkit-scrollbar-track { background:transparent; }
  ::-webkit-scrollbar-thumb { background:rgba(255,255,255,0.25); border-radius:2px; }

  /* ── MAGNETIC CURSOR ── */
  #mc-dot {
    position:fixed; top:0; left:0;
    width:10px; height:10px;
    background:#FFFFFF;
    border-radius:50%;
    pointer-events:none;
    z-index:99999;
    transform:translate(-50%,-50%);
    will-change:left,top;
    transition:width 180ms ${E}, height 180ms ${E}, opacity 150ms linear;
    mix-blend-mode:difference;
  }
  #mc-dot.hov { width:48px; height:48px; background:rgba(255,255,255,0.08); border:1.5px solid rgba(255,255,255,0.35); mix-blend-mode:normal; }
  #mc-dot.out { opacity:0; }
  #mc-ring {
    position:fixed; top:0; left:0;
    width:36px; height:36px;
    border:1px solid rgba(255,255,255,0.30);
    border-radius:50%;
    pointer-events:none;
    z-index:99998;
    transform:translate(-50%,-50%);
    will-change:left,top;
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

  .dancing-h1 { font-family:'Dancing Script',cursive !important; font-weight:900; letter-spacing:-0.01em; line-height:0.92; color:#FFFFFF; }
  .dancing-h2 { font-family:'Dancing Script',cursive !important; font-weight:800; letter-spacing:-0.005em; line-height:0.95; color:#FFFFFF; }
  .dancing-h3 { font-family:'Dancing Script',cursive !important; font-weight:700; line-height:1.0; color:#FFFFFF; }

  @keyframes _rtl      { from{opacity:0;transform:translateX(48px);}  to{opacity:1;transform:translateX(0);} }
  @keyframes _ltr      { from{opacity:0;transform:translateX(-48px);} to{opacity:1;transform:translateX(0);} }
  @keyframes _up       { from{opacity:0;transform:translateY(28px);}  to{opacity:1;transform:translateY(0);} }
  @keyframes _marquee  { from{transform:translateX(0);} to{transform:translateX(-50%);} }
  @keyframes _pulse    { 0%,100%{opacity:0.3;transform:scale(1);} 50%{opacity:1;transform:scale(1.35);} }
  @keyframes _blink    { 0%,100%{opacity:1;} 50%{opacity:0;} }
  @keyframes _fadeSlide{ from{opacity:0;transform:translateY(12px);} to{opacity:1;transform:translateY(0);} }
  @keyframes _slideIn  { from{transform:scaleX(0);transform-origin:left;} to{transform:scaleX(1);transform-origin:left;} }
  @keyframes _modalIn  { from{opacity:0;transform:translateY(40px) scale(0.96);} to{opacity:1;transform:translateY(0) scale(1);} }

  .di { transition:transform 130ms ${E}, filter 130ms ${E}; }
  .di:hover { transform:scale(1.25) rotate(-6deg); filter:drop-shadow(0 2px 6px rgba(255,255,255,0.15)); }

  button:focus-visible, a:focus-visible { outline:2px solid rgba(255,255,255,0.4); outline-offset:2px; }

  @media (prefers-reduced-motion:reduce) {
    *, *::before, *::after { animation-duration:0.01ms !important; transition-duration:0.01ms !important; }
    .mqinner { animation:none !important; }
  }

  @media (max-width:768px) {
    .snav { display:none !important; }
    .ach-grid { grid-template-columns:1fr !important; }
    .stats-row { grid-template-columns:repeat(2,1fr) !important; gap:1rem !important; }
    .sum-grid  { grid-template-columns:1fr 1fr !important; gap:0.65rem !important; }
    .foot-row  { flex-direction:column !important; align-items:flex-start !important; }
    .foot-links { gap:0.5rem !important; }
    .modal-inner { border-radius:16px !important; max-height:90vh !important; }
    .modal-head  { padding:1.25rem !important; flex-direction:column !important; align-items:flex-start !important; }
    .modal-body  { padding:1.25rem !important; }
  }
  @media (max-width:420px) {
    .stats-row { grid-template-columns:1fr 1fr !important; }
    .sum-grid  { grid-template-columns:1fr !important; }
  }
`;

/* ═══════════════════════════════════════════════════════════════
   MAGNETIC CURSOR
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
      dot.style.left = `${e.clientX}px`;
      dot.style.top  = `${e.clientY}px`;
    };
    const enter = (e) => { if (e.target.closest("a, button, [role='button'], .card-hover")) dot.classList.add("hov"); };
    const leave = (e) => { if (e.target.closest("a, button, [role='button'], .card-hover")) dot.classList.remove("hov"); };
    const bodyLeave = () => { dot.classList.add("out"); ring.classList.add("out"); };
    const bodyEnter = () => { dot.classList.remove("out"); ring.classList.remove("out"); };

    document.addEventListener("mousemove",  move,  { passive: true });
    document.addEventListener("mouseover",  enter);
    document.addEventListener("mouseout",   leave);
    document.addEventListener("mouseleave", bodyLeave);
    document.addEventListener("mouseenter", bodyEnter);

    const tick = () => {
      smooth.current.x += (mouse.current.x - smooth.current.x) * 0.10;
      smooth.current.y += (mouse.current.y - smooth.current.y) * 0.10;
      ring.style.left = `${smooth.current.x}px`;
      ring.style.top  = `${smooth.current.y}px`;
      rafRef.current  = requestAnimationFrame(tick);
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
    if (s.endsWith("+")) return `${x}+`;
    if (s.includes("K")) return `${Math.floor(x / 1000)}K+`;
    return `${x}`;
  };
  return <>{fmt(n)}</>;
}

/* ═══════════════════════════════════════════════════════════════
   DEVICON
═══════════════════════════════════════════════════════════════ */
function DI({ name, size = 18, style = {} }) {
  const src = ICONS[name];
  if (!src) return null;
  return (
    <img src={src} alt={name} className="di" width={size} height={size} loading="lazy"
      style={{ display: "block", flexShrink: 0, borderRadius: "3px", ...style }} />
  );
}

/* ═══════════════════════════════════════════════════════════════
   MARQUEE
═══════════════════════════════════════════════════════════════ */
function Marquee({ speed = 36 }) {
  const items = [...TICKER, ...TICKER];
  return (
    <div style={{ overflow:"hidden", borderTop:`1px solid ${C.border}`, borderBottom:`1px solid ${C.border}`, padding:"10px 0", background:C.surface, position:"relative" }}>
      {["left","right"].map(s => (
        <div key={s} style={{ position:"absolute", [s]:0, top:0, bottom:0, width:"64px", background:`linear-gradient(to ${s==="left"?"right":"left"}, ${C.surface}, transparent)`, zIndex:2, pointerEvents:"none" }} />
      ))}
      <div className="mqinner" style={{ display:"flex", alignItems:"center", gap:"40px", width:"max-content", animation:`_marquee ${speed}s linear infinite`, willChange:"transform" }}>
        {items.map((name, i) => (
          <div key={`${name}-${i}`} style={{ display:"flex", alignItems:"center", gap:"9px", opacity:0.4, flexShrink:0 }}>
            {ICONS[name] && <img src={ICONS[name]} alt={name} className="di" width={20} height={20} loading="lazy" style={{ display:"block", borderRadius:"3px" }} />}
            <span style={{ fontFamily:"'DM Mono',monospace", fontSize:"12px", fontWeight:500, color:"rgba(255,255,255,0.6)", letterSpacing:"0.05em", whiteSpace:"nowrap" }}>{name}</span>
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
    window.addEventListener("scroll", fn, { passive: true });
    return () => { window.removeEventListener("scroll", fn); if (raf.current) cancelAnimationFrame(raf.current); };
  }, []);
  return (
    <div style={{ position:"fixed", top:0, left:0, right:0, height:"2px", background:"rgba(255,255,255,0.06)", zIndex:9998 }}>
      <div style={{ height:"100%", width:`${pct}%`, background:"#FFFFFF", transition:"width 0.1s linear" }} />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SIDE NAV
═══════════════════════════════════════════════════════════════ */
function SideNav({ active }) {
  return (
    <nav className="snav" style={{ position:"fixed", left:"1.25rem", top:"50%", transform:"translateY(-50%)", zIndex:100, display:"flex", flexDirection:"column", gap:"14px" }}>
      {ACHIEVEMENTS.map((a, i) => (
        <button key={a.id}
          onClick={() => document.getElementById(`ach-${a.id}`)?.scrollIntoView({ behavior:"smooth" })}
          aria-label={`Jump to ${a.title}`}
          style={{ display:"flex", alignItems:"center", gap:"6px", background:"none", border:"none", cursor:"none", padding:0 }}
        >
          <div style={{ height:"1.5px", width:active===i?"22px":"10px", background:active===i?"#FFFFFF":"rgba(255,255,255,0.18)", borderRadius:"1px", transition:`all 320ms ${E}` }} />
          <span style={{ fontFamily:"'DM Mono',monospace", fontSize:"9px", fontWeight:500, color:C.muted, opacity:active===i?1:0, transition:`opacity 320ms ${E}` }}>{String(i+1).padStart(2,"0")}</span>
        </button>
      ))}
    </nav>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MONO LABEL + TERM CURSOR
═══════════════════════════════════════════════════════════════ */
function ML({ children, color = C.muted, style = {} }) {
  return (
    <span style={{ display:"block", fontFamily:"'DM Mono',monospace", fontSize:"10px", fontWeight:500, letterSpacing:"0.14em", textTransform:"uppercase", color, ...style }}>{children}</span>
  );
}
function TermCursor() {
  return <span style={{ display:"inline-block", width:"8px", height:"1.1em", background:"#FFFFFF", marginLeft:"3px", verticalAlign:"middle", animation:"_blink 1.1s step-end infinite", borderRadius:"1px" }} />;
}

/* ═══════════════════════════════════════════════════════════════
   MAG BUTTON
═══════════════════════════════════════════════════════════════ */
function MagBtn({ children, href, extraStyle = {} }) {
  const [pos, sp] = useState({ x:0, y:0 });
  const [h, sh]   = useState(false);
  const ref = useRef(null);
  const mob = useMob();
  return (
    <a ref={ref} href={href} target="_blank" rel="noopener noreferrer"
      onMouseMove={(e) => {
        if (mob || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        sp({ x:(e.clientX-r.left-r.width/2)*0.22, y:(e.clientY-r.top-r.height/2)*0.22 });
      }}
      onMouseEnter={() => sh(true)}
      onMouseLeave={() => { sh(false); sp({ x:0,y:0 }); }}
      style={{
        display:"inline-flex", alignItems:"center", gap:"8px",
        padding:"10px 18px", minHeight:"44px",
        background: h?"rgba(255,255,255,0.12)":"rgba(255,255,255,0.06)",
        border:`1px solid ${h?"rgba(255,255,255,0.25)":"rgba(255,255,255,0.15)"}`,
        borderRadius:"8px", fontSize:"13px", fontWeight:600,
        color:"#FFFFFF", textDecoration:"none",
        fontFamily:"'DM Mono',monospace",
        transition:`all 190ms ${E}`,
        transform: mob?"none":`translate(${pos.x}px,${pos.y}px)`,
        ...extraStyle,
      }}
    >{children}</a>
  );
}

/* ═══════════════════════════════════════════════════════════════
   TECH TAG — colored devicons
═══════════════════════════════════════════════════════════════ */
function TechTag({ name, visible, delay = 0 }) {
  const [h, sh] = useState(false);
  return (
    <span onMouseEnter={() => sh(true)} onMouseLeave={() => sh(false)}
      style={{
        display:"inline-flex", alignItems:"center", gap:"7px",
        padding:"6px 12px 6px 9px", borderRadius:"7px",
        background: h?"#1A1A1A":C.surface,
        border:`1px solid ${h?"rgba(255,255,255,0.15)":"rgba(255,255,255,0.08)"}`,
        fontFamily:"'DM Mono',monospace", fontSize:"12px",
        color: h?"#FFFFFF":"rgba(255,255,255,0.70)",
        userSelect:"none",
        transition:`background 130ms ${E}, border-color 130ms ${E}, color 130ms ${E}`,
        opacity: visible?1:0,
        animation: visible?`_tagPop 320ms ${E} ${delay}s both`:"none",
      }}
    >
      <DI name={name} size={16} style={{ opacity: h?1:0.85, transition:`opacity 130ms ${E}` }} />
      {name}
    </span>
  );
}

/* ═══════════════════════════════════════════════════════════════
   ACHIEVEMENT SECTION — mirrors EduSection structure exactly
═══════════════════════════════════════════════════════════════ */
function AchSection({ data, ri, isLast, onOpen }) {
  const [ref, vis] = useInView(0.07);
  const [tab, st]  = useState("decisions");
  const [tilt, tt] = useState({ x:0, y:0 });
  const mob  = useMob();
  const even = ri % 2 === 0;

  return (
    <section id={`ach-${data.id}`} ref={ref} style={{
      minHeight: mob?"auto":"100vh",
      display:"flex", alignItems:"center", position:"relative",
      padding: mob?"3rem 0 3.5rem":"8rem 0",
      borderBottom: isLast?"none":`1px solid ${C.border}`,
    }}>

      {/* Year watermark */}
      <div style={{
        position:"absolute",
        left: mob?"-3%":"-2%",
        top:  mob?"2%":"16%",
        fontSize: mob?"clamp(4.5rem,20vw,6.5rem)":"clamp(10rem,18vw,20rem)",
        fontFamily:"'Dancing Script',cursive",
        fontWeight:900,
        color:"rgba(255,255,255,0.025)",
        lineHeight:1,
        userSelect:"none", pointerEvents:"none",
      }}>{data.year}</div>

      {/* Glow */}
      <div style={{
        position:"absolute", left:"12%", top:"28%",
        width: mob?"180px":"420px", height: mob?"180px":"420px",
        borderRadius:"50%",
        background:`radial-gradient(circle, rgba(255,255,255,${mob?"0.025":"0.03"}) 0%, transparent 70%)`,
        filter:`blur(${mob?50:80}px)`, pointerEvents:"none",
      }} />

      <div style={{ maxWidth:"1240px", margin:"0 auto", padding:mob?"0 1rem":"0 2rem", width:"100%" }}>
        <div style={{
          display:"grid",
          gridTemplateColumns: mob?"1fr":"1.45fr 0.85fr",
          gap: mob?"1.75rem":"4rem",
          alignItems:"start",
        }}>

          {/* ── LEFT ── */}
          <div style={{ opacity:vis?1:0, animation:vis?`${even?"_ltr":"_rtl"} 440ms ${E} 0.04s both`:"none" }}>
            <div style={{ marginBottom: mob?"1rem":"2rem" }}>

              {/* Period + type */}
              <div style={{ display:"flex", alignItems:"center", gap:"10px", marginBottom:"10px" }}>
                <div style={{
                  width:"2px", height: mob?"28px":"34px",
                  background:"rgba(255,255,255,0.5)",
                  transformOrigin:"top",
                  transform:vis?"scaleY(1)":"scaleY(0)",
                  transition:`transform 320ms ${E} 0.2s`,
                }} />
                <div>
                  <ML style={{ marginBottom:"2px" }}>{data.year} · {data.duration}</ML>
                  <span style={{ fontFamily:"'DM Mono',monospace", fontSize:"9px", color:C.muted, letterSpacing:"0.06em" }}>{data.category}</span>
                </div>
              </div>

              {/* Title — Dancing Script */}
              <h2 className="dancing-h2" style={{
                fontSize: mob?"clamp(1.8rem,7.5vw,2.5rem)":"clamp(2.8rem,4.5vw,4rem)",
                marginBottom:"8px",
              }}>{data.title}</h2>

              {/* Event */}
              <div style={{ fontSize:mob?"0.95rem":"1.1rem", fontWeight:600, color:"rgba(255,255,255,0.65)", marginBottom:"7px" }}>
                {data.event}
              </div>

              {/* Location row */}
              <div style={{ display:"flex", alignItems:"center", gap:"5px", fontSize:"12px", color:C.muted }}>
                <MapPin size={11} />{data.location}
              </div>

              {/* Rank pill */}
              <div style={{
                marginTop:"10px", display:"inline-flex", alignItems:"center", gap:"6px",
                padding:"4px 10px", borderRadius:"5px",
                background:"rgba(255,255,255,0.05)", border:`1px solid rgba(255,255,255,0.12)`,
              }}>
                <div style={{ width:"5px", height:"5px", borderRadius:"50%", background:"#FFFFFF", animation:"_pulse 2s ease-in-out infinite" }} />
                <span style={{ fontFamily:"'DM Mono',monospace", fontSize:"9px", color:"rgba(255,255,255,0.7)", letterSpacing:"0.08em", textTransform:"uppercase" }}>
                  {data.rank}
                </span>
              </div>
            </div>

            {/* Animated underline */}
            <div style={{
              height:"1px", width:"80px", marginBottom: mob?"1.1rem":"2rem",
              background:"rgba(255,255,255,0.3)",
              borderRadius:"2px", transformOrigin:"left",
              transform:vis?"scaleX(1)":"scaleX(0)",
              transition:`transform 320ms ${E} 0.22s`,
            }} />

            {/* Context summary */}
            <p style={{
              fontSize: mob?"0.875rem":"0.97rem",
              color:"rgba(255,255,255,0.65)", lineHeight:1.72,
              marginBottom: mob?"1.25rem":"2.5rem",
            }}>{data.context}</p>

            {/* Tabs */}
            <div style={{ marginBottom: mob?"0.9rem":"2rem" }}>
              <div style={{ display:"flex", gap: mob?"1.25rem":"2rem", borderBottom:`1px solid ${C.border}` }}>
                {["decisions","risks","tech"].map(t => (
                  <button key={t} onClick={() => st(t)} style={{
                    background:"none", border:"none",
                    padding: mob?"0.55rem 0":"0.75rem 0",
                    minHeight:"38px",
                    fontSize: mob?"12.5px":"13.5px", fontWeight:600,
                    color: tab===t?"#FFFFFF":"rgba(255,255,255,0.5)",
                    cursor:"none", textTransform:"capitalize",
                    transition:`color 190ms ${E}`, position:"relative",
                  }}>
                    {t}
                    {tab===t && <div style={{ position:"absolute", bottom:-1, left:0, right:0, height:"1px", background:"#FFFFFF", animation:`_slideIn 190ms ${E}` }} />}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab content */}
            <div style={{ minHeight: mob?"auto":"220px" }}>
              {tab==="decisions" && (
                <ul style={{ listStyle:"none", display:"flex", flexDirection:"column", gap: mob?"0.7rem":"0.9rem", animation:`_fadeSlide 320ms ${E}` }}>
                  {data.decisions.map((item, i) => (
                    <li key={i} style={{ display:"flex", gap:"0.8rem", alignItems:"flex-start" }}>
                      <Zap size={13} style={{ color:"rgba(255,255,255,0.5)", flexShrink:0, marginTop:"3px" }} />
                      <span style={{ fontSize: mob?"13px":"13.5px", color:"rgba(255,255,255,0.65)", lineHeight:1.65 }}>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
              {tab==="risks" && (
                <ul style={{ listStyle:"none", display:"flex", flexDirection:"column", gap: mob?"0.7rem":"0.9rem", animation:`_fadeSlide 320ms ${E}` }}>
                  {data.risks.map((item, i) => (
                    <li key={i} style={{ display:"flex", gap:"0.8rem", alignItems:"flex-start" }}>
                      <Shield size={13} style={{ color:"rgba(255,255,255,0.45)", flexShrink:0, marginTop:"3px" }} />
                      <span style={{ fontSize: mob?"13px":"13.5px", color:"rgba(255,255,255,0.65)", lineHeight:1.65 }}>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
              {tab==="tech" && (
                <div style={{ display:"flex", flexWrap:"wrap", gap:"8px", animation:`_fadeSlide 320ms ${E}` }}>
                  {data.tech.map((t, ti) => (
                    <TechTag key={t} name={t} visible={tab==="tech"} delay={ti * 0.04} />
                  ))}
                </div>
              )}
            </div>

            {/* View full case study */}
            <div style={{ marginTop: mob?"1.4rem":"3rem" }}>
              <button
                className="card-hover"
                onClick={() => onOpen(data)}
                style={{
                  display:"inline-flex", alignItems:"center", gap:"8px",
                  padding: mob?"8px 13px":"10px 18px", minHeight:"44px",
                  background:"rgba(255,255,255,0.06)",
                  border:`1px solid rgba(255,255,255,0.15)`,
                  borderRadius:"8px", fontSize: mob?"12px":"13px", fontWeight:600,
                  color:"#FFFFFF", fontFamily:"'DM Mono',monospace",
                  cursor:"none", transition:`all 190ms ${E}`,
                }}
                onMouseEnter={(e)=>{ e.currentTarget.style.background="rgba(255,255,255,0.12)"; e.currentTarget.style.borderColor="rgba(255,255,255,0.25)"; }}
                onMouseLeave={(e)=>{ e.currentTarget.style.background="rgba(255,255,255,0.06)"; e.currentTarget.style.borderColor="rgba(255,255,255,0.15)"; }}
              >
                <ArrowUpRight size={13} />
                View Full Case Study
              </button>
            </div>
          </div>

          {/* ── RIGHT — Impact Card ── */}
          <div
            className="card-hover"
            onMouseMove={(e) => {
              if (mob || !ref.current) return;
              const r = ref.current.getBoundingClientRect();
              tt({ x:((e.clientY-r.top)/r.height-0.5)*1.5, y:-((e.clientX-r.left)/r.width-0.5)*1.5 });
            }}
            onMouseLeave={() => tt({ x:0, y:0 })}
            style={{
              opacity:vis?1:0,
              animation:vis?`${even?"_rtl":"_ltr"} 440ms ${E} 0.10s both`:"none",
              position: mob?"relative":"sticky",
              top: mob?"auto":"6rem",
            }}
          >
            <div style={{
              position:"relative",
              padding: mob?"1.1rem":"2.5rem 2rem",
              background:C.surface,
              border:`1px solid rgba(255,255,255,0.08)`,
              borderRadius: mob?"14px":"18px",
              transform: mob?"none":`perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
              transition:`transform 190ms ${E}`,
            }}>
              {/* Inner radial */}
              <div style={{ position:"absolute", inset:0, borderRadius:"inherit", background:"radial-gradient(circle at 50% 30%, rgba(255,255,255,0.03) 0%, transparent 65%)", pointerEvents:"none" }} />
              {/* Top shimmer */}
              <div style={{ position:"absolute", top:0, left:"20%", right:"20%", height:"1px", background:"linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)", borderRadius:"0 0 2px 2px" }} />

              <ML style={{ marginBottom: mob?"0.9rem":"2rem" }}>Impact Metrics</ML>

              <div style={{ display:"flex", flexDirection:"column", gap: mob?"0.9rem":"2rem" }}>
                {data.impact.map((item, i) => (
                  <div key={i} style={{
                    paddingBottom: i<data.impact.length-1?(mob?"0.9rem":"2rem"):0,
                    borderBottom:  i<data.impact.length-1?`1px solid ${C.border}`:"none",
                    opacity:vis?1:0,
                    animation:vis?`_rtl 320ms ${E} ${0.2+i*0.08}s both`:"none",
                  }}>
                    <div style={{
                      fontFamily:"'Dancing Script',cursive",
                      fontWeight:900,
                      fontSize: mob?"2.2rem":"3.2rem",
                      color:"#FFFFFF", lineHeight:1,
                      marginBottom:"4px", letterSpacing:"-0.01em",
                    }}>
                      <Counter value={item.metric} triggered={vis} />
                    </div>
                    <div style={{ fontSize: mob?"12.5px":"15px", fontWeight:600, color:"#FFFFFF", marginBottom:"2px" }}>{item.label}</div>
                    <div style={{ fontSize: mob?"11px":"12.5px", color:C.muted, lineHeight:1.5 }}>{item.detail}</div>
                  </div>
                ))}
              </div>

              {/* Outcome strip */}
              <div style={{
                marginTop: mob?"1rem":"1.75rem",
                paddingTop: mob?"0.9rem":"1.5rem",
                borderTop:`1px solid ${C.border}`,
              }}>
                <ML style={{ marginBottom:"6px", fontSize:"9px" }}>Outcome</ML>
                <p style={{ fontSize: mob?"11px":"12px", color:"rgba(255,255,255,0.6)", lineHeight:1.6 }}>
                  {data.outcome.slice(0, 120)}…
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   METRIC SUMMARY CARD
═══════════════════════════════════════════════════════════════ */
function SumCard({ stat, vis, delay }) {
  const [h, sh] = useState(false);
  const mob = useMob();
  const IconComp = stat.icon;
  return (
    <div onMouseEnter={() => sh(true)} onMouseLeave={() => sh(false)} style={{
      padding: mob?"0.9rem":"2rem",
      background:C.surface,
      border:`1px solid ${h?"rgba(255,255,255,0.15)":"rgba(255,255,255,0.08)"}`,
      borderRadius:"12px",
      transform: h&&!mob?"translateY(-4px)":"translateY(0)",
      transition:`transform 190ms ${E}, border-color 130ms ${E}`,
      opacity:vis?1:0,
      animation:vis?`_up 440ms ${E} ${delay}s both`:"none",
      display:"flex", flexDirection:"column", gap:"12px",
    }}>
      <div style={{
        width:"42px", height:"42px",
        background:"rgba(255,255,255,0.06)",
        borderRadius:"10px",
        display:"flex", alignItems:"center", justifyContent:"center",
        flexShrink:0,
      }}>
        <IconComp size={20} style={{ color:"rgba(255,255,255,0.7)" }} />
      </div>
      <div>
        <div style={{
          fontFamily:"'Dancing Script',cursive",
          fontWeight:900,
          fontSize: mob?"2rem":"2.8rem",
          color:"#FFFFFF", lineHeight:1, marginBottom:"0.35rem", letterSpacing:"-0.02em",
        }}>{stat.value}{stat.suffix}</div>
        <div style={{ fontSize: mob?"11.5px":"14px", fontWeight:600, color:"rgba(255,255,255,0.80)", marginBottom:"3px" }}>{stat.label}</div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   CASE STUDY MODAL
═══════════════════════════════════════════════════════════════ */
function Modal({ data, onClose }) {
  const mob = useMob();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", onKey); };
  }, [onClose]);

  const Section = ({ title, children }) => (
    <div className="modal-section" style={{ marginBottom:"2rem" }}>
      <h3 style={{
        fontFamily:"'Dancing Script',cursive",
        fontWeight:800,
        fontSize: mob?"1.5rem":"2rem",
        color:"#FFFFFF", marginBottom:"0.9rem", letterSpacing:"-0.01em",
      }}>{title}</h3>
      {children}
    </div>
  );

  return (
    <div
      onClick={onClose}
      style={{
        position:"fixed", inset:0,
        background:"rgba(0,0,0,0.75)",
        backdropFilter:"blur(16px)",
        zIndex:9999,
        display:"flex", alignItems:"center", justifyContent:"center",
        padding:"20px",
        overflowY:"auto",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="modal-inner"
        style={{
          background:"#111111",
          border:`1px solid rgba(255,255,255,0.10)`,
          borderRadius:"24px",
          maxWidth:"860px", width:"100%",
          maxHeight:"88vh", overflowY:"auto",
          position:"relative",
          animation:`_modalIn 360ms ${E}`,
          boxShadow:"0 32px 96px rgba(0,0,0,0.6)",
        }}
      >
        {/* Shimmer top */}
        <div style={{ position:"absolute", top:0, left:"20%", right:"20%", height:"1px", background:"linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)" }} />

        {/* Modal Header */}
        <div className="modal-head" style={{
          padding: mob?"1.5rem":"2.5rem 2.5rem 2rem",
          borderBottom:`1px solid ${C.border}`,
          display:"flex", alignItems:"flex-start",
          justifyContent:"space-between", gap:"20px",
        }}>
          <div style={{ flex:1 }}>
            <ML style={{ marginBottom:"10px" }}>{data.category} · {data.year}</ML>
            <h2 className="dancing-h2" style={{
              fontSize: mob?"clamp(1.8rem,6vw,2.6rem)":"clamp(2.4rem,4vw,3.2rem)",
              marginBottom:"6px",
            }}>{data.title}</h2>
            <div style={{ fontSize: mob?"0.9rem":"1rem", color:"rgba(255,255,255,0.65)", fontWeight:600, marginBottom:"4px" }}>{data.event}</div>
            <div style={{
              display:"inline-flex", alignItems:"center", gap:"6px", marginTop:"8px",
              padding:"4px 10px", borderRadius:"5px",
              background:"rgba(255,255,255,0.05)", border:`1px solid rgba(255,255,255,0.12)`,
              fontFamily:"'DM Mono',monospace", fontSize:"10px", color:"rgba(255,255,255,0.7)",
              letterSpacing:"0.06em",
            }}>{data.rank}</div>
          </div>
          <button
            onClick={onClose}
            style={{
              width:"44px", height:"44px",
              background:"rgba(255,255,255,0.05)",
              border:`1px solid rgba(255,255,255,0.12)`,
              borderRadius:"12px", color:"rgba(255,255,255,0.7)",
              display:"flex", alignItems:"center", justifyContent:"center",
              cursor:"none", transition:`all 190ms ${E}`, flexShrink:0,
            }}
            onMouseEnter={(e)=>{ e.currentTarget.style.background="rgba(255,255,255,0.12)"; e.currentTarget.style.color="#FFFFFF"; }}
            onMouseLeave={(e)=>{ e.currentTarget.style.background="rgba(255,255,255,0.05)"; e.currentTarget.style.color="rgba(255,255,255,0.7)"; }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="modal-body" style={{ padding: mob?"1.5rem":"2.5rem" }}>

          <Section title="Context">
            <p style={{ fontSize: mob?"14px":"15px", color:"rgba(255,255,255,0.65)", lineHeight:1.75 }}>{data.context}</p>
          </Section>

          <Section title="My Role & Scope">
            <p style={{ fontSize: mob?"14px":"15px", color:"rgba(255,255,255,0.65)", lineHeight:1.75 }}>{data.ownership}</p>
          </Section>

          <Section title="Technical Decisions">
            <div style={{ display:"flex", flexDirection:"column", gap:"10px" }}>
              {data.decisions.map((d, i) => (
                <div key={i} style={{
                  display:"flex", alignItems:"flex-start", gap:"12px",
                  padding:"14px 16px",
                  background:C.bg,
                  border:`1px solid rgba(255,255,255,0.07)`,
                  borderRadius:"10px",
                }}>
                  <Zap size={15} style={{ color:"rgba(255,255,255,0.55)", flexShrink:0, marginTop:"2px" }} />
                  <span style={{ fontSize: mob?"13px":"14px", color:"rgba(255,255,255,0.70)", lineHeight:1.7 }}>{d}</span>
                </div>
              ))}
            </div>
          </Section>

          <Section title="Risks & How They Were Handled">
            <div style={{ display:"flex", flexDirection:"column", gap:"10px" }}>
              {data.risks.map((r, i) => (
                <div key={i} style={{
                  display:"flex", alignItems:"flex-start", gap:"12px",
                  padding:"14px 16px",
                  background:"rgba(255,255,255,0.02)",
                  border:`1px solid rgba(255,255,255,0.06)`,
                  borderRadius:"10px",
                }}>
                  <Shield size={15} style={{ color:"rgba(255,255,255,0.45)", flexShrink:0, marginTop:"2px" }} />
                  <span style={{ fontSize: mob?"13px":"14px", color:"rgba(255,255,255,0.70)", lineHeight:1.7 }}>{r}</span>
                </div>
              ))}
            </div>
          </Section>

          <Section title="Outcome">
            <p style={{ fontSize: mob?"14px":"15px", color:"rgba(255,255,255,0.65)", lineHeight:1.75 }}>{data.outcome}</p>
          </Section>

          <Section title="Technologies Used">
            <div style={{ display:"flex", flexWrap:"wrap", gap:"8px" }}>
              {data.tech.map((t, i) => (
                <TechTag key={t} name={t} visible={true} delay={i * 0.03} />
              ))}
            </div>
          </Section>

        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   ROOT
═══════════════════════════════════════════════════════════════ */
export default function Achievements() {
  const [heroRef, heroVis] = useInView(0.06);
  const [sumRef,  sumVis]  = useInView(0.06);
  const [priRef,  priVis]  = useInView(0.06);
  const [activeModal, setActiveModal] = useState(null);
  const mob = useMob();
  const [active, sa] = useState(0);

  useEffect(() => {
    const fn = () => {
      const mid = window.innerHeight / 2;
      ACHIEVEMENTS.forEach((a, i) => {
        const el = document.getElementById(`ach-${a.id}`);
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
        position:"fixed", inset:0, zIndex:0, pointerEvents:"none",
        backgroundImage:[
          "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)",
          "linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
        ].join(","),
        backgroundSize:"64px 64px",
        maskImage:"radial-gradient(ellipse 80% 55% at 50% 25%, black 10%, transparent)",
        WebkitMaskImage:"radial-gradient(ellipse 80% 55% at 50% 25%, black 10%, transparent)",
      }} />

      <div style={{ position:"relative", zIndex:1 }}>

        {/* ═══════ HERO ═══════ */}
        <header ref={heroRef} style={{
          maxWidth:"1240px", margin:"0 auto", padding:pad,
          paddingTop:    mob?"3.5rem":"8rem",
          paddingBottom: mob?"2rem":"6rem",
          borderBottom:`1px solid ${C.border}`,
          position:"relative",
        }}>
          <div aria-hidden="true" style={{
            position:"absolute", top:"20%", left:"50%", transform:"translateX(-50%)",
            width: mob?"280px":"640px", height: mob?"140px":"300px",
            borderRadius:"50%",
            background:"radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%)",
            filter:`blur(${mob?50:80}px)`, pointerEvents:"none",
          }} />

          {/* Eyebrow */}
          <div style={{
            display:"flex", alignItems:"center", gap:"10px",
            marginBottom: mob?"0.9rem":"2rem",
            opacity:heroVis?1:0, animation:heroVis?`_rtl 320ms ${E} 0.05s both`:"none",
          }}>
            <div style={{ width:"14px", height:"1px", background:"rgba(255,255,255,0.4)" }} />
            <ML>Documented Work & Outcomes · 2023 – 2025</ML>
            <TermCursor />
          </div>

          {/* H1 — Dancing Script */}
          <h1 className="dancing-h1" style={{
            fontSize: mob?"clamp(2.8rem,12vw,4.5rem)":"clamp(5rem,9vw,8.5rem)",
            marginBottom:"16px",
            maxWidth:"1000px",
            opacity:heroVis?1:0, animation:heroVis?`_rtl 440ms ${E} 0.12s both`:"none",
          }}>
            Achievements<br />
            <span style={{ fontWeight:700, fontSize:"0.72em", opacity:0.55 }}>& Case Studies</span>
          </h1>

          {/* Bar */}
          <div style={{
            height:"2px", width: mob?"80px":"140px",
            background:"rgba(255,255,255,0.35)",
            borderRadius:"2px", marginBottom: mob?"1.25rem":"3rem",
            transformOrigin:"left",
            transform:heroVis?"scaleX(1)":"scaleX(0)",
            transition:`transform 320ms ${E} 0.18s`,
          }} />

          {/* Subtitle */}
          <p style={{
            fontSize: mob?"0.875rem":"1.05rem", color:"rgba(255,255,255,0.6)", lineHeight:1.75,
            maxWidth: mob?"100%":"580px",
            marginBottom: mob?"1.75rem":"4rem",
            opacity:heroVis?1:0, animation:heroVis?`_rtl 440ms ${E} 0.22s both`:"none",
          }}>
            A factual record of competitions, projects, certifications, and technical
            practice — with context, decisions, risks, and measurable outcomes.
          </p>

          {/* Hero stats */}
          <div className="stats-row" style={{
            display:"grid", gridTemplateColumns:"repeat(4,1fr)",
            gap: mob?"0.9rem":"3rem", maxWidth: mob?"100%":"860px",
          }}>
            {[
              { value:"6",   label:"Projects Deployed"  },
              { value:"15+", label:"Certifications"     },
              { value:"100+",label:"DSA Problems"       },
              { value:"1st", label:"National Hackathon"  },
            ].map((s, i) => (
              <div key={i} style={{
                opacity:heroVis?1:0,
                animation:heroVis?`_rtl 440ms ${E} ${0.28+i*0.06}s both`:"none",
              }}>
                <div style={{
                  fontFamily:"'Dancing Script',cursive",
                  fontWeight:900,
                  fontSize: mob?"2rem":"3.4rem",
                  color:"#FFFFFF", lineHeight:1, marginBottom:"4px", letterSpacing:"-0.02em",
                }}>
                  <Counter value={s.value} triggered={heroVis} />
                </div>
                <div style={{ fontSize: mob?"9px":"11px", color:C.muted, fontWeight:500, letterSpacing:"0.03em", fontFamily:"'DM Mono',monospace", textTransform:"uppercase" }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div style={{
            display:"flex", gap:"0.75rem", flexWrap:"wrap", marginTop: mob?"1.75rem":"3.5rem",
            opacity:heroVis?1:0, animation:heroVis?`_rtl 440ms ${E} 0.42s both`:"none",
          }}>
            <MagBtn href="/resume" extraStyle={mob?{padding:"8px 13px",fontSize:"12px",minHeight:"38px"}:{}}>
              <Download size={14} />Download Resume
            </MagBtn>
            <MagBtn href="https://github.com/bhagavan444" extraStyle={mob?{padding:"8px 13px",fontSize:"12px",minHeight:"38px"}:{}}>
              <Github size={14} />GitHub
            </MagBtn>
            <MagBtn href="https://www.linkedin.com/in/gopalajosyula-siva-satya-sai-bhagavan-1624a027b/" extraStyle={mob?{padding:"8px 13px",fontSize:"12px",minHeight:"38px"}:{}}>
              <Linkedin size={14} />LinkedIn
            </MagBtn>
          </div>
        </header>

        <Marquee speed={36} />

        {/* ═══════ ACHIEVEMENT SECTIONS ═══════ */}
        {ACHIEVEMENTS.map((ach, i) => (
          <AchSection key={ach.id} data={ach} ri={i} isLast={i===ACHIEVEMENTS.length-1} onOpen={setActiveModal} />
        ))}

        <Marquee speed={28} />

        {/* ═══════ METRICS SUMMARY ═══════ */}
        <section ref={sumRef} style={{
          maxWidth:"1240px", margin:"0 auto", padding:pad,
          paddingTop:    mob?"3rem":"8rem",
          paddingBottom: mob?"3rem":"8rem",
          borderTop:`1px solid ${C.border}`,
        }}>
          <div style={{ marginBottom:"2rem", opacity:sumVis?1:0, animation:sumVis?`_rtl 440ms ${E} 0s both`:"none" }}>
            <ML style={{ marginBottom:"10px" }}>Full Achievement Profile</ML>
            <h2 className="dancing-h2" style={{
              fontSize: mob?"clamp(2rem,7vw,3rem)":"clamp(2.8rem,5vw,4.5rem)",
              marginBottom:"10px",
              display:"flex", alignItems:"center",
            }}>
              Aggregate Overview<TermCursor />
            </h2>
            <p style={{ fontSize: mob?"12.5px":"13.5px", color:C.muted, lineHeight:1.65, maxWidth:"440px" }}>
              Across competitions, certifications, open source, and structured practice.
            </p>
          </div>

          <div className="sum-grid" style={{
            display:"grid",
            gridTemplateColumns: mob?"1fr 1fr":"repeat(auto-fit,minmax(200px,1fr))",
            gap: mob?"0.65rem":"1.25rem",
          }}>
            {METRICS.map((s, i) => (
              <SumCard key={i} stat={s} vis={sumVis} delay={i*0.06} />
            ))}
          </div>
        </section>

        <Marquee speed={32} />

        {/* ═══════ ENGINEERING PRINCIPLES ═══════ */}
        <section ref={priRef} style={{
          maxWidth:"1240px", margin:"0 auto", padding:pad,
          paddingTop:    mob?"3rem":"8rem",
          paddingBottom: mob?"3rem":"8rem",
          borderTop:`1px solid ${C.border}`,
        }}>
          <div style={{ marginBottom:"2.5rem", opacity:priVis?1:0, animation:priVis?`_rtl 440ms ${E} 0s both`:"none" }}>
            <ML style={{ marginBottom:"10px" }}>Engineering Philosophy</ML>
            <h2 className="dancing-h2" style={{
              fontSize: mob?"clamp(2rem,7vw,3rem)":"clamp(2.8rem,5vw,4.5rem)",
              marginBottom:"10px",
            }}>
              How I Approach Building
            </h2>
            <p style={{ fontSize: mob?"12.5px":"13.5px", color:C.muted, lineHeight:1.65, maxWidth:"480px" }}>
              Principles that consistently inform technical decisions across projects —
              from initial architecture to deployment and maintenance.
            </p>
          </div>

          <div style={{
            display:"grid",
            gridTemplateColumns: mob?"1fr":"repeat(auto-fit,minmax(280px,1fr))",
            gap: mob?"0.9rem":"1.5rem",
          }}>
            {PRINCIPLES.map((p, i) => {
              const IconComp = p.icon;
              return (
                <div key={i} style={{
                  padding: mob?"1.25rem":"2rem 1.75rem",
                  background:C.surface,
                  border:`1px solid rgba(255,255,255,0.08)`,
                  borderRadius:"14px",
                  opacity:priVis?1:0,
                  animation:priVis?`_up 440ms ${E} ${i*0.08}s both`:"none",
                  transition:`border-color 190ms ${E}, transform 190ms ${E}`,
                }}
                  onMouseEnter={(e)=>{ e.currentTarget.style.borderColor="rgba(255,255,255,0.16)"; e.currentTarget.style.transform="translateY(-4px)"; }}
                  onMouseLeave={(e)=>{ e.currentTarget.style.borderColor="rgba(255,255,255,0.08)"; e.currentTarget.style.transform="translateY(0)"; }}
                >
                  <div style={{
                    width:"48px", height:"48px",
                    background:"rgba(255,255,255,0.06)",
                    borderRadius:"10px",
                    display:"flex", alignItems:"center", justifyContent:"center",
                    marginBottom:"1.25rem",
                  }}>
                    <IconComp size={22} style={{ color:"rgba(255,255,255,0.7)" }} />
                  </div>
                  <h3 className="dancing-h3" style={{ fontSize: mob?"1.4rem":"1.7rem", marginBottom:"0.6rem" }}>{p.title}</h3>
                  <p style={{ fontSize: mob?"13px":"14px", color:"rgba(255,255,255,0.60)", lineHeight:1.72 }}>{p.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* ═══════ FOOTER ═══════ */}
        <footer style={{
          maxWidth:"1240px", margin:"0 auto", padding:pad,
          paddingTop:    mob?"2rem":"4rem",
          paddingBottom: mob?"2rem":"4rem",
          borderTop:`1px solid ${C.border}`,
        }}>
          <div className="foot-row" style={{
            display:"flex", alignItems:"center",
            justifyContent:"space-between", gap:"1rem", flexWrap:"wrap",
          }}>
            <div style={{ display:"flex", alignItems:"center", gap:"8px" }}>
              <div style={{ width:"5px", height:"5px", borderRadius:"50%", background:"#FFFFFF", animation:"_pulse 2.2s ease-in-out infinite" }} />
              <span style={{ fontFamily:"'DM Mono',monospace", fontSize: mob?"10px":"12.5px", color:"rgba(255,255,255,0.65)" }}>
                All work independently verifiable
              </span>
            </div>
            <div className="foot-links" style={{ display:"flex", flexWrap:"wrap", gap:"0.6rem" }}>
              {[
                { label:"Email",    href:"mailto:g.sivasatyasaibhagavan@gmail.com" },
                { label:"LinkedIn", href:"https://www.linkedin.com/in/gopalajosyula-siva-satya-sai-bhagavan-1624a027b/" },
                { label:"GitHub",   href:"https://github.com/bhagavan444" },
              ].map(l => (
                <MagBtn key={l.label} href={l.href} extraStyle={{ padding:"6px 12px", fontSize:"11px", minHeight:"34px" }}>
                  {l.label}
                </MagBtn>
              ))}
            </div>
          </div>
          <div style={{
            marginTop: mob?"1.25rem":"3rem",
            paddingTop: mob?"0.9rem":"1.5rem",
            borderTop:`1px solid ${C.border}`,
            display:"flex", justifyContent:"space-between", alignItems:"center",
            flexWrap:"wrap", gap:"0.4rem",
          }}>
            <div style={{ fontFamily:"'DM Mono',monospace", fontSize:"10px", color:C.muted }}>
              © 2026 Siva Satya Sai Bhagavan
            </div>
            <div style={{ display:"flex", gap:"14px" }}>
              {["Privacy","Terms","Sitemap"].map(l => (
                <a key={l} href="#" style={{ fontFamily:"'DM Mono',monospace", fontSize:"10px", color:C.muted, textDecoration:"none" }}>{l}</a>
              ))}
            </div>
          </div>
        </footer>

      </div>

      {/* ═══════ CASE STUDY MODAL ═══════ */}
      {activeModal && <Modal data={activeModal} onClose={() => setActiveModal(null)} />}
    </>
  );
}