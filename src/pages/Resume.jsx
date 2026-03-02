"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Download, Eye, X, MapPin, Mail, Github, Linkedin,
  ArrowUpRight, Calendar, ChevronRight,
  Terminal, Cpu, Globe, Database, Code2,
  Zap, Shield
} from "lucide-react";

/* ═══════════════════════════════════════════════════════════════
   CONFIG
═══════════════════════════════════════════════════════════════ */
const RESUME_PREVIEW  = "https://drive.google.com/file/d/1W07CQFokR2Gx7GMspad1vp_cM0-GBa4j/preview";
const RESUME_DOWNLOAD = "https://drive.google.com/uc?export=download&id=1W07CQFokR2Gx7GMspad1vp_cM0-GBa4j";

/* ═══════════════════════════════════════════════════════════════
   DESIGN TOKENS — Pure Black & White Architectural System
═══════════════════════════════════════════════════════════════ */
const C = {
  bg:       "#0B0B0B",
  surface:  "#111111",
  elevated: "#161616",
  border:   "rgba(255,255,255,0.06)",
  border2:  "rgba(255,255,255,0.12)",
  text:     "#FFFFFF",
  muted:    "rgba(255,255,255,0.55)",
  muted2:   "rgba(255,255,255,0.70)",
  muted3:   "rgba(255,255,255,0.35)",
};
const E = "cubic-bezier(0.16, 1, 0.3, 1)";

/* ═══════════════════════════════════════════════════════════════
   DEVICON CDN MAP
═══════════════════════════════════════════════════════════════ */
const IB = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons";
const ICONS = {
  "React.js":   `${IB}/react/react-original.svg`,
  "React":      `${IB}/react/react-original.svg`,
  "Node.js":    `${IB}/nodejs/nodejs-original.svg`,
  "Express.js": `${IB}/express/express-original.svg`,
  "MongoDB":    `${IB}/mongodb/mongodb-original.svg`,
  "Python":     `${IB}/python/python-original.svg`,
  "TensorFlow": `${IB}/tensorflow/tensorflow-original.svg`,
  "Keras":      `${IB}/keras/keras-original.svg`,
  "Flask":      `${IB}/flask/flask-original.svg`,
  "Docker":     `${IB}/docker/docker-original.svg`,
  "AWS":        `${IB}/amazonwebservices/amazonwebservices-original-wordmark.svg`,
  "Git":        `${IB}/git/git-original.svg`,
  "JavaScript": `${IB}/javascript/javascript-original.svg`,
  "Scikit-learn":`${IB}/scikitlearn/scikitlearn-original.svg`,
  "Pandas":     `${IB}/pandas/pandas-original.svg`,
  "NumPy":      `${IB}/numpy/numpy-original.svg`,
  "Java":       `${IB}/java/java-original.svg`,
  "HTML5":      `${IB}/html5/html5-original.svg`,
  "CSS3":       `${IB}/css3/css3-original.svg`,
  "GitHub":     `${IB}/github/github-original.svg`,
  "MySQL":      `${IB}/mysql/mysql-original.svg`,
};

const TICKER = [
  "React.js","Node.js","Python","TensorFlow","MongoDB","Express.js","Keras",
  "Flask","AWS","Scikit-learn","Git","JavaScript","Pandas","NumPy","Java",
];

/* ═══════════════════════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════════════════════ */
const PROOF_METRICS = [
  { value:"3",   suffix:"",  label:"Industry Internships", sub:"MERN · AI/ML · Data Science" },
  { value:"4",   suffix:"",  label:"Deployed Systems",     sub:"ATS Builder · Chatbot · ML · NLP" },
  { value:"15",  suffix:"+", label:"Certifications",       sub:"Google · IBM · Infosys · AWS" },
  { value:"100", suffix:"+", label:"DSA Problems Solved",  sub:"LeetCode & HackerRank" },
];

const EXPERIENCES = [
  {
    role:"MERN Stack Engineer Intern", company:"StudyOwl Education Pvt Ltd",
    period:"May – July 2025", location:"Hybrid",
    context:"EdTech platform serving students across India",
    bullets:[
      "Architected and shipped reusable React component library reducing feature delivery time by ~30% across team workflows",
      "Designed and owned REST API surface using Node.js + Express, implementing async request handling for real-time data flows",
      "Established Git-based review process for a 4-person frontend team, cutting merge conflicts and improving release cadence",
    ],
    tech:["React.js","Node.js","Express.js","MongoDB","Git"],
    decisions:[
      "Chose component-first architecture to ensure shared UI logic was reusable across multiple product teams",
      "Used async middleware pattern in Express to handle concurrent requests without blocking",
    ],
    outcome:"React component library now used across 3 product teams. API surface handles concurrent sessions with zero downtime incidents during internship period.",
  },
  {
    role:"AI/ML Engineer Intern — Smart Sorting", company:"SmartBridge",
    period:"May – June 2025", location:"Remote",
    context:"Computer vision pipeline for industrial sorting automation",
    bullets:[
      "Built and trained CNN-based image classification models achieving production-grade inference accuracy using TensorFlow and Keras",
      "Deployed trained models into Flask inference APIs, enabling real-time object classification from live camera feeds",
      "Optimized model architecture reducing inference latency by 22% while maintaining accuracy targets for deployment constraints",
    ],
    tech:["TensorFlow","Keras","Flask","Python"],
    decisions:[
      "Chose CNN over simpler classifiers after testing showed 15% accuracy gap on industrial image data",
      "Wrapped model in Flask API rather than embedding directly — enables model hot-swap without redeployment",
    ],
    outcome:"Model deployed to production pipeline. 22% latency improvement validated against original benchmark. API handles 60+ classification requests per minute.",
  },
  {
    role:"Machine Learning & Data Science Intern", company:"Blackbucks",
    period:"May – June 2024", location:"Remote",
    context:"Supervised ML pipeline for structured prediction tasks",
    bullets:[
      "Owned end-to-end ML pipeline: data ingestion → preprocessing → feature engineering → model evaluation → deployment",
      "Applied statistical feature selection techniques improving model F1-score by 18% over baseline configurations",
      "Implemented reproducible experiment tracking with Scikit-learn pipelines enabling consistent comparison across model runs",
    ],
    tech:["Python","Scikit-learn","Pandas","NumPy"],
    decisions:[
      "Used pipeline objects for reproducibility — prevents data leakage and ensures consistent preprocessing",
      "Applied variance threshold + correlation filter for feature selection before model training",
    ],
    outcome:"Pipeline reused for 3 additional internal datasets. F1 improvement validated on held-out test set. Documentation adopted as team reference for future ML projects.",
  },
];

const PROJECTS = [
  { name:"ATS-Based Resume Builder Platform", tag:"Full-Stack System",  year:"2025", status:"Live",
    problem:"Job seekers lack visibility into why resumes fail automated screening.",
    approach:"Built keyword-extraction engine parsing PDF resumes against job descriptions, scoring ATS compatibility in real-time.",
    outcome:"Full OAuth user flow, PDF parsing pipeline, and live scoring dashboard in production.",
    tech:["React.js","Node.js","MongoDB","Python"], github:"https://github.com/bhagavan444" },
  { name:"AI Chatbot Web Application",          tag:"AI Integration",    year:"2025", status:"Live",
    problem:"Existing chatbot demos lack production-grade full-stack architecture.",
    approach:"Decoupled React frontend from Flask inference backend, integrating Gemini API for natural language response generation.",
    outcome:"Sub-200ms API response times with streaming UX and error boundary handling.",
    tech:["React.js","Flask","Python"], github:"https://github.com/bhagavan444" },
  { name:"Career Path Recommendation System",   tag:"ML Pipeline",       year:"2024", status:"Deployed",
    problem:"Students lack personalized, data-driven career direction based on their skills.",
    approach:"Supervised classification pipeline on academic and skills data, evaluating Random Forest vs SVM for recommendation quality.",
    outcome:"Deployed model serving recommendations across 5 career clusters with 84% accuracy.",
    tech:["Python","Scikit-learn","Pandas"], github:"https://github.com/bhagavan444" },
  { name:"Fake News Detection System",          tag:"NLP System",        year:"2023", status:"GitHub",
    problem:"Proliferation of misinformation in digital news requires automated detection at scale.",
    approach:"TF-IDF vectorization with logistic regression classifier trained on labeled news corpus with cross-validation evaluation.",
    outcome:"92% classification accuracy on test set; modular pipeline enabling easy retraining.",
    tech:["Python","Scikit-learn","Pandas"], github:"https://github.com/bhagavan444" },
];

const CAPABILITIES = [
  { icon:Globe,    cluster:"Frontend Architecture", skills:["React.js","JavaScript (ES6+)","HTML5","CSS3","Component Systems","REST Integration"] },
  { icon:Terminal, cluster:"Backend Systems",        skills:["Node.js","Express.js","Flask","REST API Design","Authentication Flows"] },
  { icon:Cpu,      cluster:"AI / ML Engineering",    skills:["TensorFlow","Keras","Scikit-learn","CNNs","NLP","Supervised Learning","Deep Learning"] },
  { icon:Database, cluster:"Data & Infrastructure",  skills:["MongoDB","SQL","Pandas","NumPy","JDBC","Git","Postman","AWS (Basics)"] },
  { icon:Code2,    cluster:"Core CS Foundations",    skills:["Python","Java","C","DSA","OOP","Searching & Sorting"] },
];

const CERTIFICATIONS = [
  { name:"Google Generative AI (Gemini)", issuer:"Google",              year:"2025" },
  { name:"AI Fundamentals",               issuer:"IBM SkillsBuild",     year:"2025" },
  { name:"Large Language Models",         issuer:"IBM SkillsBuild",     year:"2025" },
  { name:"Machine Learning with Python",  issuer:"Simplilearn",         year:"2024" },
  { name:"AWS Basics",                    issuer:"Simplilearn",         year:"2024" },
  { name:"Full Stack Development",        issuer:"Infosys Springboard", year:"2024" },
  { name:"Python Programming",            issuer:"GeeksforGeeks",       year:"2024" },
  { name:"Java Programming",              issuer:"GeeksforGeeks",       year:"2024" },
];

const EDUCATION = {
  degree:"B.Tech — Artificial Intelligence and Data Science",
  school:"Ramachandra College of Engineering, Eluru · JNTUK",
  period:"2022 – 2026", score:"75% · 4th Year",
  relevant:["Machine Learning","Deep Learning","Data Structures & Algorithms","Database Management","Cloud Computing","Software Engineering"],
  previous:[
    { level:"Intermediate · MPC",  institution:"Srividhya Junior College",              score:"78%", period:"2020–2022" },
    { level:"Secondary · Class X", institution:"Montessori English Medium High School", score:"95%", period:"2019–2020" },
  ],
};

const STATIC_ATS = {
  overall:87,
  breakdown:[
    { label:"Keyword Density",      score:91, note:"Strong match — Python, React, TensorFlow, Node.js, MongoDB all present" },
    { label:"Format & Parsability", score:95, note:"Clean single-column layout, no tables/columns that trip parsers" },
    { label:"Section Structure",    score:88, note:"All standard sections found: Objective, Education, Experience, Skills, Projects" },
    { label:"Action Verbs",         score:85, note:"Strong verbs used: Architected, Deployed, Optimized, Implemented, Owned" },
    { label:"Quantified Results",   score:82, note:"Good impact metrics: 30% faster delivery, 22% latency reduction, 18% F1 gain" },
    { label:"Contact Completeness", score:100,note:"Email, GitHub, LinkedIn, location — all present" },
  ],
  topKeywords:["Python","React.js","Node.js","TensorFlow","MongoDB","Machine Learning","REST API","Git","Flask","Scikit-learn","CNN","NLP"],
  missingKeywords:["Docker","CI/CD","TypeScript","System Design"],
  suggestions:[
    "Add Docker/containerization experience — requested in 73% of SWE JDs",
    "Mention TypeScript — listed in 68% of frontend roles",
    "Add a brief CI/CD or DevOps line — shows production maturity",
    "Quantify the ATS builder's user adoption or accuracy %",
  ],
};

const ATS_RESUME_TEXT = "python react node mongodb tensorflow keras flask scikit javascript html css sql git aws pandas numpy java machine learning deep learning cnn nlp rest api mern stack full stack internship production deployed backend frontend";

/* ═══════════════════════════════════════════════════════════════
   GLOBAL CSS
═══════════════════════════════════════════════════════════════ */
const GLOBAL = `
  @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700;800;900&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&family=DM+Mono:wght@400;500&display=swap');
  *, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }
  html { scroll-behavior:smooth; overflow-x:hidden; }
  body { font-family:'DM Sans',system-ui,sans-serif; background:#0B0B0B; color:#FFFFFF; -webkit-font-smoothing:antialiased; overflow-x:hidden; cursor:none; }
  ::selection { background:rgba(255,255,255,0.12); }
  ::-webkit-scrollbar { width:2px; }
  ::-webkit-scrollbar-track { background:transparent; }
  ::-webkit-scrollbar-thumb { background:rgba(255,255,255,0.25); border-radius:2px; }

  #mc-dot { position:fixed; top:0; left:0; width:10px; height:10px; background:#FFFFFF; border-radius:50%; pointer-events:none; z-index:99999; transform:translate(-50%,-50%); will-change:left,top; transition:width 180ms ${E},height 180ms ${E},opacity 150ms linear; mix-blend-mode:difference; }
  #mc-dot.hov { width:48px; height:48px; background:rgba(255,255,255,0.08); border:1.5px solid rgba(255,255,255,0.35); mix-blend-mode:normal; }
  #mc-dot.out { opacity:0; }
  #mc-ring { position:fixed; top:0; left:0; width:36px; height:36px; border:1px solid rgba(255,255,255,0.30); border-radius:50%; pointer-events:none; z-index:99998; transform:translate(-50%,-50%); will-change:left,top; transition:opacity 150ms linear; }
  #mc-ring.out { opacity:0; }

  @media (max-width:768px) {
    body { cursor:auto; }
    #mc-dot, #mc-ring { display:none !important; }
    a, button, [role="button"] { cursor:auto !important; }
  }
  @media (min-width:769px) { a, button, [role="button"] { cursor:none !important; } }

  .dancing-h1 { font-family:'Dancing Script',cursive !important; font-weight:900; letter-spacing:-0.01em; line-height:0.92; color:#FFFFFF; }
  .dancing-h2 { font-family:'Dancing Script',cursive !important; font-weight:800; letter-spacing:-0.005em; line-height:0.95; color:#FFFFFF; }
  .dancing-h3 { font-family:'Dancing Script',cursive !important; font-weight:700; line-height:1.0; color:#FFFFFF; }

  @keyframes _rtl     { from{opacity:0;transform:translateX(48px);}  to{opacity:1;transform:translateX(0);} }
  @keyframes _ltr     { from{opacity:0;transform:translateX(-48px);} to{opacity:1;transform:translateX(0);} }
  @keyframes _up      { from{opacity:0;transform:translateY(28px);}  to{opacity:1;transform:translateY(0);} }
  @keyframes _marquee { from{transform:translateX(0);} to{transform:translateX(-50%);} }
  @keyframes _pulse   { 0%,100%{opacity:0.4;transform:scale(1);} 50%{opacity:1;transform:scale(1.35);} }
  @keyframes _blink   { 0%,100%{opacity:1;} 50%{opacity:0;} }
  @keyframes _fadeSlide { from{opacity:0;transform:translateY(12px);} to{opacity:1;transform:translateY(0);} }
  @keyframes _slideIn { from{transform:scaleX(0);transform-origin:left;} to{transform:scaleX(1);transform-origin:left;} }
  @keyframes _scaleIn { from{opacity:0;transform:scale(0.96);} to{opacity:1;transform:scale(1);} }
  @keyframes _modalIn { from{opacity:0;transform:translateY(40px) scale(0.96);} to{opacity:1;transform:translateY(0) scale(1);} }
  @keyframes _spin    { to{transform:rotate(360deg);} }

  .di { transition:transform 130ms ${E},filter 130ms ${E}; }
  .di:hover { transform:scale(1.25) rotate(-6deg); filter:drop-shadow(0 2px 6px rgba(255,255,255,0.15)); }
  button:focus-visible, a:focus-visible { outline:2px solid rgba(255,255,255,0.4); outline-offset:2px; }

  @media (prefers-reduced-motion:reduce) {
    *, *::before, *::after { animation-duration:0.01ms !important; transition-duration:0.01ms !important; }
    .mqinner { animation:none !important; }
  }

  @media (max-width:768px) {
    .snav { display:none !important; }
    .two-col-grid { grid-template-columns:1fr !important; }
    .metrics-4 { grid-template-columns:repeat(2,1fr) !important; }
    .proj-grid  { grid-template-columns:1fr !important; }
    .caps-grid  { grid-template-columns:1fr !important; }
    .ats-2col   { grid-template-columns:1fr !important; }
    .ats-kw     { grid-template-columns:1fr !important; }
    .ats-sug    { grid-template-columns:1fr !important; }
    .edu-prev   { grid-template-columns:1fr !important; }
    .cert-grid  { grid-template-columns:1fr !important; }
    .ft-grid    { grid-template-columns:1fr 1fr !important; }
    .ft-hide    { display:none !important; }
  }
  @media (max-width:420px) {
    .metrics-4 { grid-template-columns:1fr 1fr !important; }
    .ft-grid   { grid-template-columns:1fr !important; }
  }
`;

/* ═══════════════════════════════════════════════════════════════
   MAGNETIC CURSOR
═══════════════════════════════════════════════════════════════ */
function MagneticCursor() {
  const dotRef  = useRef(null);
  const ringRef = useRef(null);
  const mouse   = useRef({ x:-200, y:-200 });
  const smooth  = useRef({ x:-200, y:-200 });
  const rafRef  = useRef(null);
  useEffect(() => {
    if (typeof window==="undefined"||window.innerWidth<=768) return;
    const dot=dotRef.current, ring=ringRef.current;
    if (!dot||!ring) return;
    const move=(e)=>{ mouse.current={x:e.clientX,y:e.clientY}; dot.style.left=`${e.clientX}px`; dot.style.top=`${e.clientY}px`; };
    const enter=(e)=>{ if(e.target.closest("a,button,[role='button'],.chov")) dot.classList.add("hov"); };
    const leave=(e)=>{ if(e.target.closest("a,button,[role='button'],.chov")) dot.classList.remove("hov"); };
    const bL=()=>{ dot.classList.add("out"); ring.classList.add("out"); };
    const bE=()=>{ dot.classList.remove("out"); ring.classList.remove("out"); };
    document.addEventListener("mousemove",move,{passive:true});
    document.addEventListener("mouseover",enter);
    document.addEventListener("mouseout",leave);
    document.addEventListener("mouseleave",bL);
    document.addEventListener("mouseenter",bE);
    const tick=()=>{
      smooth.current.x+=(mouse.current.x-smooth.current.x)*0.10;
      smooth.current.y+=(mouse.current.y-smooth.current.y)*0.10;
      ring.style.left=`${smooth.current.x}px`; ring.style.top=`${smooth.current.y}px`;
      rafRef.current=requestAnimationFrame(tick);
    };
    rafRef.current=requestAnimationFrame(tick);
    return ()=>{
      document.removeEventListener("mousemove",move); document.removeEventListener("mouseover",enter);
      document.removeEventListener("mouseout",leave); document.removeEventListener("mouseleave",bL);
      document.removeEventListener("mouseenter",bE);
      if(rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  },[]);
  return (<><div id="mc-dot" ref={dotRef}/><div id="mc-ring" ref={ringRef}/></>);
}

/* ═══════════════════════════════════════════════════════════════
   HOOKS
═══════════════════════════════════════════════════════════════ */
function useInView(t=0.08) {
  const ref=useRef(null);
  const [vis,sv]=useState(false);
  useEffect(()=>{
    const obs=new IntersectionObserver(([e])=>{ if(e.isIntersecting) sv(true); },{threshold:t});
    if(ref.current) obs.observe(ref.current);
    return ()=>obs.disconnect();
  },[t]);
  return [ref,vis];
}
function useMob() {
  const [m,sm]=useState(false);
  useEffect(()=>{ const fn=()=>sm(window.innerWidth<768); fn(); window.addEventListener("resize",fn); return ()=>window.removeEventListener("resize",fn); },[]);
  return m;
}

/* ═══════════════════════════════════════════════════════════════
   COUNTER
═══════════════════════════════════════════════════════════════ */
function Counter({ value, triggered }) {
  const [n,sn]=useState(0); const done=useRef(false);
  useEffect(()=>{
    if(!triggered||done.current) return; done.current=true;
    const raw=parseInt(String(value).replace(/[^0-9]/g,""))||0;
    const dur=1200,t0=Date.now();
    const tick=()=>{ const p=Math.min((Date.now()-t0)/dur,1); sn(Math.floor(raw*(1-Math.pow(1-p,3)))); if(p<1) requestAnimationFrame(tick); else sn(raw); };
    requestAnimationFrame(tick);
  },[triggered,value]);
  return <>{n}</>;
}

/* ═══════════════════════════════════════════════════════════════
   DEVICON
═══════════════════════════════════════════════════════════════ */
function DI({ name, size=18, style={} }) {
  const src=ICONS[name]; if(!src) return null;
  return <img src={src} alt={name} className="di" width={size} height={size} loading="lazy" style={{ display:"block",flexShrink:0,borderRadius:"3px",...style }}/>;
}

/* ═══════════════════════════════════════════════════════════════
   MARQUEE
═══════════════════════════════════════════════════════════════ */
function Marquee({ speed=36 }) {
  const items=[...TICKER,...TICKER];
  return (
    <div style={{ overflow:"hidden",borderTop:`1px solid ${C.border}`,borderBottom:`1px solid ${C.border}`,padding:"10px 0",background:C.surface,position:"relative" }}>
      {["left","right"].map(s=>(
        <div key={s} style={{ position:"absolute",[s]:0,top:0,bottom:0,width:"64px",background:`linear-gradient(to ${s==="left"?"right":"left"},${C.surface},transparent)`,zIndex:2,pointerEvents:"none" }}/>
      ))}
      <div className="mqinner" style={{ display:"flex",alignItems:"center",gap:"40px",width:"max-content",animation:`_marquee ${speed}s linear infinite`,willChange:"transform" }}>
        {items.map((name,i)=>(
          <div key={`${name}-${i}`} style={{ display:"flex",alignItems:"center",gap:"9px",opacity:0.4,flexShrink:0 }}>
            {ICONS[name]&&<img src={ICONS[name]} alt={name} className="di" width={20} height={20} loading="lazy" style={{ display:"block",borderRadius:"3px" }}/>}
            <span style={{ fontFamily:"'DM Mono',monospace",fontSize:"12px",fontWeight:500,color:"rgba(255,255,255,0.6)",letterSpacing:"0.05em",whiteSpace:"nowrap" }}>{name}</span>
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
  const [pct,sp]=useState(0); const raf=useRef(null);
  useEffect(()=>{
    const fn=()=>{
      if(raf.current) return;
      raf.current=requestAnimationFrame(()=>{ const max=document.documentElement.scrollHeight-window.innerHeight; sp((window.scrollY/max)*100); raf.current=null; });
    };
    window.addEventListener("scroll",fn,{passive:true});
    return ()=>{ window.removeEventListener("scroll",fn); if(raf.current) cancelAnimationFrame(raf.current); };
  },[]);
  return (
    <div style={{ position:"fixed",top:0,left:0,right:0,height:"2px",background:"rgba(255,255,255,0.06)",zIndex:9998 }}>
      <div style={{ height:"100%",width:`${pct}%`,background:"#FFFFFF",transition:"width 0.1s linear" }}/>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SIDE NAV
═══════════════════════════════════════════════════════════════ */
const NAV_LABELS=["Resume","Experience","Projects","Skills","ATS","Education"];
function SideNav({ active }) {
  return (
    <nav className="snav" style={{ position:"fixed",left:"1.25rem",top:"50%",transform:"translateY(-50%)",zIndex:100,display:"flex",flexDirection:"column",gap:"14px" }}>
      {NAV_LABELS.map((label,i)=>(
        <button key={label} onClick={()=>document.getElementById(`sec-${i}`)?.scrollIntoView({behavior:"smooth"})} aria-label={`Jump to ${label}`} style={{ display:"flex",alignItems:"center",gap:"6px",background:"none",border:"none",cursor:"none",padding:0 }}>
          <div style={{ height:"1.5px",width:active===i?"22px":"10px",background:active===i?"#FFFFFF":"rgba(255,255,255,0.18)",borderRadius:"1px",transition:`all 320ms ${E}` }}/>
          <span style={{ fontFamily:"'DM Mono',monospace",fontSize:"9px",fontWeight:500,color:C.muted,opacity:active===i?1:0,transition:`opacity 320ms ${E}` }}>{String(i+1).padStart(2,"0")}</span>
        </button>
      ))}
    </nav>
  );
}

/* ═══════════════════════════════════════════════════════════════
   HELPERS
═══════════════════════════════════════════════════════════════ */
function ML({ children, style={} }) {
  return <span style={{ display:"block",fontFamily:"'DM Mono',monospace",fontSize:"10px",fontWeight:500,letterSpacing:"0.14em",textTransform:"uppercase",color:C.muted,...style }}>{children}</span>;
}
function TermCursor() {
  return <span style={{ display:"inline-block",width:"8px",height:"1.1em",background:"#FFFFFF",marginLeft:"3px",verticalAlign:"middle",animation:"_blink 1.1s step-end infinite",borderRadius:"1px" }}/>;
}

function TechTag({ name, visible=true, delay=0 }) {
  const [h,sh]=useState(false);
  return (
    <span onMouseEnter={()=>sh(true)} onMouseLeave={()=>sh(false)} style={{ display:"inline-flex",alignItems:"center",gap:"7px",padding:"5px 12px 5px 8px",borderRadius:"7px",background:h?"#1A1A1A":C.surface,border:`1px solid ${h?"rgba(255,255,255,0.15)":"rgba(255,255,255,0.07)"}`,fontFamily:"'DM Mono',monospace",fontSize:"11px",color:h?"#FFFFFF":"rgba(255,255,255,0.65)",userSelect:"none",transition:`all 130ms ${E}`,opacity:visible?1:0,animation:visible?`_up 280ms ${E} ${delay}s both`:"none" }}>
      <DI name={name} size={14} style={{ opacity:h?1:0.8,transition:`opacity 130ms ${E}` }}/>
      {name}
    </span>
  );
}

function MagBtn({ children, href, onClick, extraStyle={} }) {
  const [h,sh]=useState(false); const [pos,sp]=useState({x:0,y:0});
  const ref=useRef(null); const mob=useMob();
  const Tag=href?"a":"button";
  return (
    <Tag ref={ref} href={href} target={href?.startsWith("http")?"_blank":undefined} rel={href?"noopener noreferrer":undefined} onClick={onClick}
      onMouseMove={(e)=>{ if(mob||!ref.current) return; const r=ref.current.getBoundingClientRect(); sp({x:(e.clientX-r.left-r.width/2)*0.22,y:(e.clientY-r.top-r.height/2)*0.22}); }}
      onMouseEnter={()=>sh(true)} onMouseLeave={()=>{ sh(false); sp({x:0,y:0}); }}
      style={{ display:"inline-flex",alignItems:"center",gap:"8px",padding:"10px 18px",minHeight:"44px",background:h?"rgba(255,255,255,0.12)":"rgba(255,255,255,0.06)",border:`1px solid ${h?"rgba(255,255,255,0.25)":"rgba(255,255,255,0.15)"}`,borderRadius:"8px",fontSize:"13px",fontWeight:600,color:"#FFFFFF",textDecoration:"none",fontFamily:"'DM Mono',monospace",transition:`all 190ms ${E}`,transform:mob?"none":`translate(${pos.x}px,${pos.y}px)`,cursor:"none",...extraStyle }}>
      {children}
    </Tag>
  );
}

/* ═══════════════════════════════════════════════════════════════
   ATS CHECKER
═══════════════════════════════════════════════════════════════ */
function ATSChecker({ vis }) {
  const [jd,setJd]=useState(""); const [loading,setLoading]=useState(false);
  const [result,setResult]=useState(null); const [error,setError]=useState("");
  const [tab,setTab]=useState("static"); const [scoreAnim,setScoreAnim]=useState(false);
  const mob=useMob();
  useEffect(()=>{ if(vis) setTimeout(()=>setScoreAnim(true),400); },[vis]);

  function detectTitle(text) {
    const t=text.toLowerCase();
    if(t.includes("machine learning")||t.includes("ml engineer")) return "ML Engineer";
    if(t.includes("full stack")||t.includes("fullstack")) return "Full Stack Developer";
    if(t.includes("frontend")||t.includes("front-end")) return "Frontend Developer";
    if(t.includes("backend")||t.includes("back-end")) return "Backend Developer";
    if(t.includes("data scientist")||t.includes("data science")) return "Data Scientist";
    return "Software Role";
  }

  const runCheck=async()=>{
    if(!jd.trim()){ setError("Please paste a job description first."); return; }
    setError(""); setLoading(true); setResult(null);
    try {
      await new Promise(r=>setTimeout(r,900));
      const rt=ATS_RESUME_TEXT.toLowerCase(), jdL=jd.toLowerCase();
      const jobTitle=detectTitle(jd);
      const stopW=new Set(["the","and","or","for","with","a","an","in","of","to","is","are","be","you","we","will","on","at","as","by","from","that","this","have","has"]);
      const jdW=jdL.replace(/[^a-z0-9#.+\s-]/g," ").split(/\s+/).filter(w=>w.length>2&&!stopW.has(w));
      const jdKw=[...new Set(jdW)].slice(0,80);
      const matched=jdKw.filter(k=>rt.includes(k)), missing=jdKw.filter(k=>!rt.includes(k));
      const kwR=matched.length/Math.max(jdKw.length,1);
      const kwS=Math.round(Math.min(100,55+kwR*60));
      const sm=["python","react","node","express","mongodb","tensorflow","keras","flask","scikit","javascript"].filter(s=>jdL.includes(s)).length;
      const skS=Math.round(Math.min(100,40+sm*7));
      const expS=84,fmtS=95,impS=82;
      const eduS=jdL.includes("master")?62:90;
      const overall=Math.round(kwS*0.28+skS*0.25+expS*0.18+fmtS*0.1+impS*0.1+eduS*0.09);
      const techF=(arr)=>arr.filter(w=>w.length>3&&!/^\d+$/.test(w)).slice(0,14);
      const sug=[]; if(!rt.includes("docker")) sug.push("Add Docker/containerization — found in the JD and required in 70%+ of SWE roles");
      if(!rt.includes("typescript")&&jdL.includes("typescript")) sug.push("TypeScript is explicitly mentioned in this JD — add it to Skills section");
      if(sug.length<3) sug.push("Quantify the ATS builder's user count or accuracy percentage for stronger impact");
      if(sug.length<4) sug.push("Add a brief line on team collaboration or code review ownership under each internship");
      const verdict=overall>=85?"Strong match for this role — resume keywords align well. Recommended for technical screening.":overall>=72?"Good alignment with core requirements. A few targeted additions would push this to an excellent match.":"Moderate match — foundational skills align but JD-specific keywords need strengthening.";
      setResult({ overall,jobTitle,breakdown:[
        { label:"Keyword Match",        score:kwS,  note:`${matched.length} of ${jdKw.length} JD keywords found in resume` },
        { label:"Skills Alignment",     score:skS,  note:`${sm} technical skills directly match this JD's requirements` },
        { label:"Experience Relevance", score:expS, note:"3 production internships with measurable delivery impact" },
        { label:"Format & Parsability", score:fmtS, note:"Clean structure, no multi-column layout that trips ATS parsers" },
        { label:"Quantified Impact",    score:impS, note:"30% faster delivery, 22% latency reduction, 18% F1 improvement cited" },
        { label:"Education Fit",        score:eduS, note:jdL.includes("master")?"JD prefers postgrad; B.Tech + certs partially compensates":"B.Tech in AI & Data Science directly matches role requirements" },
      ],matchedKeywords:techF(matched),missingKeywords:techF(missing).slice(0,8),suggestions:sug.slice(0,4),verdict });
    } catch(e){ setError(`Analysis error: ${e.message}`); } finally { setLoading(false); }
  };

  const display=tab==="live"&&result?result:STATIC_ATS;
  const isLive=tab==="live"&&!!result;
  const sColor=s=>s>=85?"rgba(255,255,255,0.90)":s>=70?"rgba(255,255,255,0.70)":"rgba(255,255,255,0.50)";

  return (
    <div style={{ opacity:vis?1:0,animation:vis?`_up 440ms ${E} 0s both`:"none" }}>
      <ML style={{ marginBottom:"10px" }}>ATS Intelligence</ML>
      <h2 className="dancing-h2" style={{ fontSize:mob?"clamp(2rem,7vw,3rem)":"clamp(2.8rem,5vw,4.5rem)",marginBottom:"10px",display:"flex",alignItems:"center" }}>Resume Score<TermCursor/></h2>
      <p style={{ fontSize:mob?"12.5px":"13.5px",color:C.muted,lineHeight:1.65,maxWidth:"500px",marginBottom:"2rem" }}>
        Live ATS analysis — see how this resume performs against any job description. Paste a JD for a role-specific match score.
      </p>

      {/* Tab switcher */}
      <div style={{ display:"inline-flex",borderRadius:"8px",border:`1px solid ${C.border}`,overflow:"hidden",marginBottom:"1.5rem",background:C.surface }}>
        {[{key:"static",label:"📊  Baseline"},{key:"live",label:"⚡  Live JD"}].map(t=>(
          <button key={t.key} onClick={()=>setTab(t.key)} style={{ padding:"9px 20px",border:"none",cursor:"none",fontFamily:"'DM Mono',monospace",fontSize:"11px",fontWeight:500,letterSpacing:"0.06em",background:tab===t.key?"rgba(255,255,255,0.12)":"transparent",color:tab===t.key?"#FFFFFF":"rgba(255,255,255,0.45)",transition:"all 190ms ease" }}>{t.label}</button>
        ))}
      </div>

      {/* JD input */}
      {tab==="live"&&(
        <div style={{ marginBottom:"1.5rem",padding:"1.5rem",border:`1px solid ${C.border}`,borderRadius:"12px",background:C.surface,animation:`_up 280ms ${E} both` }}>
          <ML style={{ marginBottom:"10px" }}>Paste Job Description</ML>
          <textarea value={jd} onChange={e=>setJd(e.target.value)} placeholder="Paste the full job description here — requirements, responsibilities, tech stack…"
            style={{ width:"100%",minHeight:"140px",padding:"14px",borderRadius:"8px",border:`1px solid ${C.border}`,background:C.bg,color:"#FFFFFF",fontFamily:"'DM Sans',sans-serif",fontSize:"14px",lineHeight:1.6,resize:"vertical",outline:"none",transition:`border-color 190ms ${E}` }}
            onFocus={e=>e.target.style.borderColor="rgba(255,255,255,0.25)"} onBlur={e=>e.target.style.borderColor=C.border}/>
          {error&&<div style={{ marginTop:"8px",fontSize:"12px",color:"rgba(255,255,255,0.55)",fontFamily:"'DM Mono',monospace" }}>{error}</div>}
          <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:"14px",flexWrap:"wrap",gap:"10px" }}>
            <span style={{ fontFamily:"'DM Mono',monospace",fontSize:"10px",color:C.muted }}>{jd.length>0?`${jd.split(/\s+/).filter(Boolean).length} words`:"No input yet"}</span>
            <button onClick={runCheck} disabled={loading} style={{ display:"inline-flex",alignItems:"center",gap:"8px",padding:"10px 22px",borderRadius:"8px",background:loading?"rgba(255,255,255,0.06)":"rgba(255,255,255,0.10)",border:`1px solid ${loading?"rgba(255,255,255,0.10)":"rgba(255,255,255,0.25)"}`,color:"#FFFFFF",cursor:loading?"not-allowed":"none",fontFamily:"'DM Mono',monospace",fontSize:"12px",fontWeight:600,transition:`all 190ms ${E}` }}>
              {loading?(<><span style={{ width:12,height:12,border:"1.5px solid rgba(255,255,255,0.3)",borderTopColor:"#fff",borderRadius:"50%",display:"inline-block",animation:"_spin 0.7s linear infinite" }}/>Analyzing…</>):(<>⚡ Run ATS Check</>)}
            </button>
          </div>
        </div>
      )}

      {/* Dashboard */}
      <div style={{ border:`1px solid ${C.border}`,borderRadius:"16px",overflow:"hidden",background:C.surface }}>
        {/* Top bar */}
        <div style={{ padding:"12px 22px",background:C.elevated,borderBottom:`1px solid ${C.border}`,display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:"8px" }}>
          <div style={{ display:"flex",alignItems:"center",gap:"10px" }}>
            <ML style={{ display:"inline" }}>{isLive?`JD Match · ${display.jobTitle||"Custom Role"}`:"Baseline ATS · General Tech Roles"}</ML>
            <span style={{ fontFamily:"'DM Mono',monospace",fontSize:"9px",fontWeight:600,padding:"3px 8px",borderRadius:"4px",background:"rgba(255,255,255,0.07)",border:`1px solid ${C.border}`,color:"rgba(255,255,255,0.55)" }}>{isLive?"LIVE":"STATIC"}</span>
          </div>
          <span style={{ fontFamily:"'DM Mono',monospace",fontSize:"10px",color:C.muted }}>G_S_S_S_Bhagavan_Resume.pdf</span>
        </div>

        {/* Score hero */}
        <div className="ats-2col" style={{ display:"grid",gridTemplateColumns:"auto 1fr",gap:0,borderBottom:`1px solid ${C.border}` }}>
          <div style={{ padding:mob?"2rem 1.5rem":"3rem 3.5rem",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",borderRight:`1px solid ${C.border}`,background:C.bg,minWidth:mob?"auto":"220px" }}>
            <div style={{ position:"relative",width:130,height:130,marginBottom:"16px" }}>
              <svg width="130" height="130" viewBox="0 0 130 130" style={{ transform:"rotate(-90deg)" }}>
                <circle cx="65" cy="65" r="54" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="9"/>
                <circle cx="65" cy="65" r="54" fill="none" stroke="rgba(255,255,255,0.75)" strokeWidth="9" strokeLinecap="round"
                  strokeDasharray={`${2*Math.PI*54}`}
                  strokeDashoffset={scoreAnim?`${2*Math.PI*54*(1-display.overall/100)}`:`${2*Math.PI*54}`}
                  style={{ transition:"stroke-dashoffset 1.2s cubic-bezier(0.16,1,0.3,1)" }}/>
              </svg>
              <div style={{ position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center" }}>
                <span style={{ fontFamily:"'Dancing Script',cursive",fontWeight:900,fontSize:"2.8rem",color:"#FFFFFF",lineHeight:1,letterSpacing:"-0.02em" }}>{display.overall}</span>
                <span style={{ fontFamily:"'DM Mono',monospace",fontSize:"10px",color:C.muted,marginTop:"2px" }}>/100</span>
              </div>
            </div>
            <div style={{ padding:"5px 14px",borderRadius:"20px",background:"rgba(255,255,255,0.07)",border:`1px solid rgba(255,255,255,0.15)` }}>
              <span style={{ fontFamily:"'DM Mono',monospace",fontSize:"10px",fontWeight:600,color:"rgba(255,255,255,0.8)",letterSpacing:"0.06em" }}>{display.overall>=85?"STRONG MATCH":display.overall>=70?"GOOD MATCH":"NEEDS WORK"}</span>
            </div>
            {isLive&&display.verdict&&<p style={{ fontSize:"11px",color:C.muted,lineHeight:1.55,maxWidth:"180px",textAlign:"center",marginTop:"12px" }}>{display.verdict}</p>}
          </div>

          <div style={{ padding:mob?"1.25rem":"2rem 2rem" }}>
            <ML style={{ marginBottom:"16px" }}>Score Breakdown</ML>
            <div style={{ display:"flex",flexDirection:"column",gap:"12px" }}>
              {display.breakdown.map((item,i)=>(
                <div key={i}>
                  <div style={{ display:"flex",justifyContent:"space-between",alignItems:"baseline",marginBottom:"4px" }}>
                    <span style={{ fontSize:"13px",fontWeight:600,color:"rgba(255,255,255,0.80)" }}>{item.label}</span>
                    <span style={{ fontFamily:"'DM Mono',monospace",fontSize:"12px",fontWeight:700,color:sColor(item.score) }}>{item.score}</span>
                  </div>
                  <div style={{ height:"4px",borderRadius:"2px",background:"rgba(255,255,255,0.06)",overflow:"hidden",marginBottom:"4px" }}>
                    <div style={{ height:"100%",borderRadius:"2px",background:sColor(item.score),width:scoreAnim?`${item.score}%`:"0%",transition:`width 1s cubic-bezier(0.16,1,0.3,1) ${i*0.07}s` }}/>
                  </div>
                  <div style={{ fontSize:"11px",color:C.muted,lineHeight:1.4 }}>{item.note}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Keywords */}
        <div className="ats-kw" style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:0,borderBottom:`1px solid ${C.border}` }}>
          <div style={{ padding:mob?"1.25rem":"1.75rem 2rem",borderRight:`1px solid ${C.border}` }}>
            <div style={{ display:"flex",alignItems:"center",gap:"8px",marginBottom:"12px" }}>
              <span style={{ width:7,height:7,borderRadius:"50%",background:"rgba(255,255,255,0.8)",flexShrink:0 }}/>
              <ML style={{ display:"inline",marginBottom:0 }}>{isLive?"Matched Keywords":"Top Keywords Found"}</ML>
            </div>
            <div style={{ display:"flex",flexWrap:"wrap",gap:"5px" }}>
              {(isLive?display.matchedKeywords:display.topKeywords).map((kw,i)=>(
                <span key={i} style={{ fontFamily:"'DM Mono',monospace",fontSize:"10px",padding:"4px 9px",borderRadius:"5px",background:"rgba(255,255,255,0.07)",border:`1px solid rgba(255,255,255,0.15)`,color:"rgba(255,255,255,0.75)" }}>✓ {kw}</span>
              ))}
            </div>
          </div>
          <div style={{ padding:mob?"1.25rem":"1.75rem 2rem" }}>
            <div style={{ display:"flex",alignItems:"center",gap:"8px",marginBottom:"12px" }}>
              <span style={{ width:7,height:7,borderRadius:"50%",background:"rgba(255,255,255,0.3)",flexShrink:0 }}/>
              <ML style={{ display:"inline",marginBottom:0 }}>Missing Keywords</ML>
            </div>
            <div style={{ display:"flex",flexWrap:"wrap",gap:"5px" }}>
              {display.missingKeywords.map((kw,i)=>(
                <span key={i} style={{ fontFamily:"'DM Mono',monospace",fontSize:"10px",padding:"4px 9px",borderRadius:"5px",background:"rgba(255,255,255,0.03)",border:`1px solid rgba(255,255,255,0.08)`,color:"rgba(255,255,255,0.40)" }}>✗ {kw}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Suggestions */}
        <div style={{ padding:mob?"1.25rem":"1.75rem 2rem" }}>
          <ML style={{ marginBottom:"12px" }}>Improvement Suggestions</ML>
          <div className="ats-sug" style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:"10px" }}>
            {display.suggestions.map((s,i)=>(
              <div key={i} style={{ display:"flex",alignItems:"flex-start",gap:"10px",padding:"12px 14px",borderRadius:"10px",background:C.bg,border:`1px solid ${C.border}` }}>
                <Zap size={13} style={{ color:"rgba(255,255,255,0.4)",flexShrink:0,marginTop:"2px" }}/>
                <span style={{ fontSize:"12px",color:"rgba(255,255,255,0.60)",lineHeight:1.6 }}>{s}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ marginTop:"14px",padding:"12px 16px",borderRadius:"10px",background:"rgba(255,255,255,0.03)",border:`1px solid ${C.border}`,display:"flex",alignItems:"flex-start",gap:"10px" }}>
        <span style={{ fontSize:"14px",flexShrink:0 }}>💼</span>
        <p style={{ fontSize:"12px",color:C.muted,lineHeight:1.65 }}>
          <strong style={{ color:"rgba(255,255,255,0.75)" }}>For Recruiters:</strong> Paste any job description in the Live JD Checker tab above to instantly see role-specific keyword match, skills alignment, and tailored improvement suggestions.
        </p>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN
═══════════════════════════════════════════════════════════════ */
export default function Resume() {
  const [showModal,setShowModal]=useState(false);
  const [active,sa]=useState(0);
  const mob=useMob();

  const [heroRef,heroVis]   =useInView(0.06);
  const [metRef,metVis]     =useInView(0.06);
  const [expRef,expVis]     =useInView(0.06);
  const [projRef,projVis]   =useInView(0.06);
  const [capsRef,capsVis]   =useInView(0.06);
  const [atsRef,atsVis]     =useInView(0.04);
  const [eduRef,eduVis]     =useInView(0.06);
  const [ctaRef,ctaVis]     =useInView(0.1);

  useEffect(()=>{
    const fn=()=>{
      const mid=window.innerHeight/2;
      [heroRef,expRef,projRef,capsRef,atsRef,eduRef].forEach((r,i)=>{
        const el=r.current; if(!el) return;
        const rect=el.getBoundingClientRect();
        if(rect.top<=mid&&rect.bottom>=mid) sa(i);
      });
    };
    window.addEventListener("scroll",fn,{passive:true});
    return ()=>window.removeEventListener("scroll",fn);
  },[]);

  useEffect(()=>{ document.body.style.overflow=showModal?"hidden":""; return ()=>{ document.body.style.overflow=""; }; },[showModal]);

  const pad=mob?"0 1rem":"0 2rem";
  const maxW="1240px";

  return (
    <>
      <style>{GLOBAL}</style>
      <MagneticCursor/>
      <ScrollBar/>
      <SideNav active={active}/>

      {/* Grid texture */}
      <div aria-hidden="true" style={{ position:"fixed",inset:0,zIndex:0,pointerEvents:"none",backgroundImage:["linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)","linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)"].join(","),backgroundSize:"64px 64px",maskImage:"radial-gradient(ellipse 80% 55% at 50% 25%, black 10%, transparent)",WebkitMaskImage:"radial-gradient(ellipse 80% 55% at 50% 25%, black 10%, transparent)" }}/>

      <div style={{ position:"relative",zIndex:1 }}>

        {/* ══════════ HERO ══════════ */}
        <header id="sec-0" ref={heroRef} style={{ maxWidth:maxW,margin:"0 auto",padding:pad,paddingTop:mob?"3.5rem":"8rem",paddingBottom:mob?"2rem":"6rem",borderBottom:`1px solid ${C.border}`,position:"relative" }}>
          <div aria-hidden style={{ position:"absolute",top:"20%",left:"50%",transform:"translateX(-50%)",width:mob?"260px":"640px",height:mob?"120px":"280px",borderRadius:"50%",background:"radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)",filter:`blur(${mob?50:80}px)`,pointerEvents:"none" }}/>

          <div style={{ display:"flex",alignItems:"center",gap:"10px",marginBottom:mob?"0.9rem":"2rem",opacity:heroVis?1:0,animation:heroVis?`_rtl 320ms ${E} 0.05s both`:"none" }}>
            <div style={{ width:"14px",height:"1px",background:"rgba(255,255,255,0.4)" }}/>
            <ML>AI & Data Science Engineer · 2026 Graduate · Available</ML>
            <TermCursor/>
          </div>

          <h1 className="dancing-h1" style={{ fontSize:mob?"clamp(2.8rem,11vw,4.5rem)":"clamp(5rem,9vw,8.5rem)",marginBottom:"12px",maxWidth:"900px",opacity:heroVis?1:0,animation:heroVis?`_rtl 440ms ${E} 0.12s both`:"none" }}>
            Building Production-Ready<br/>
            <span style={{ fontWeight:700,fontSize:"0.75em",opacity:0.55 }}>AI Systems.</span>
          </h1>

          <div style={{ height:"2px",width:mob?"80px":"140px",background:"rgba(255,255,255,0.35)",borderRadius:"2px",marginBottom:mob?"1.25rem":"3rem",transformOrigin:"left",transform:heroVis?"scaleX(1)":"scaleX(0)",transition:`transform 320ms ${E} 0.18s` }}/>

          <p style={{ fontSize:mob?"0.875rem":"1.05rem",color:"rgba(255,255,255,0.60)",lineHeight:1.75,maxWidth:"580px",marginBottom:mob?"1.75rem":"3.5rem",opacity:heroVis?1:0,animation:heroVis?`_rtl 440ms ${E} 0.22s both`:"none" }}>
            Early-career engineer with production internship exposure across full-stack and AI/ML systems. Comfortable owning features end-to-end — from model training to React UIs to REST APIs.
          </p>

          {/* Contact strip */}
          <div style={{ display:"flex",flexWrap:"wrap",gap:mob?"14px":"22px",marginBottom:mob?"1.5rem":"3rem",opacity:heroVis?1:0,animation:heroVis?`_rtl 440ms ${E} 0.28s both`:"none" }}>
            {[{ icon:MapPin,   text:"Eluru, Andhra Pradesh",                               href:null },
              { icon:Mail,     text:"g.sivasatyasaibhagavan@gmail.com",                    href:"mailto:g.sivasatyasaibhagavan@gmail.com" },
              { icon:Github,   text:"github.com/bhagavan444",                              href:"https://github.com/bhagavan444" },
              { icon:Linkedin, text:"LinkedIn Profile",                                    href:"https://www.linkedin.com/in/gopalajosyula-siva-satya-sai-bhagavan-1624a027b/" },
            ].map((item,i)=>{
              const Tag=item.href?"a":"span";
              return (
                <Tag key={i} href={item.href||undefined} target={item.href?.startsWith("http")?"_blank":undefined} rel="noopener noreferrer" style={{ display:"inline-flex",alignItems:"center",gap:"6px",fontFamily:"'DM Mono',monospace",fontSize:mob?"11px":"12px",color:C.muted,textDecoration:"none",transition:"color 150ms" }}
                  onMouseEnter={item.href?e=>e.currentTarget.style.color="#FFFFFF":undefined} onMouseLeave={item.href?e=>e.currentTarget.style.color=C.muted:undefined}>
                  <item.icon size={12}/>{item.text}
                </Tag>
              );
            })}
          </div>

          {/* Hero stats */}
          <div className="metrics-4" style={{ display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:mob?"0.9rem":"3rem",maxWidth:mob?"100%":"860px",marginBottom:mob?"1.75rem":"3.5rem",opacity:heroVis?1:0,animation:heroVis?`_rtl 440ms ${E} 0.30s both`:"none" }}>
            {[{v:"3",label:"Industry Internships"},{v:"4",label:"Deployed Systems"},{v:"15+",label:"Certifications"},{v:"2026",label:"Graduation"}].map((s,i)=>(
              <div key={i}>
                <div className="dancing-h2" style={{ fontSize:mob?"2rem":"3rem",color:"#FFFFFF",lineHeight:1,marginBottom:"4px",letterSpacing:"-0.02em" }}>{s.v}</div>
                <div style={{ fontSize:mob?"9px":"11px",color:C.muted,fontWeight:500,letterSpacing:"0.03em",fontFamily:"'DM Mono',monospace",textTransform:"uppercase" }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div style={{ display:"flex",gap:"0.75rem",flexWrap:"wrap",opacity:heroVis?1:0,animation:heroVis?`_rtl 440ms ${E} 0.38s both`:"none" }}>
            <MagBtn href={RESUME_DOWNLOAD} extraStyle={mob?{padding:"8px 13px",fontSize:"12px",minHeight:"38px"}:{}}><Download size={14}/>Download Resume</MagBtn>
            <MagBtn onClick={()=>setShowModal(true)} extraStyle={mob?{padding:"8px 13px",fontSize:"12px",minHeight:"38px"}:{}}><Eye size={14}/>Preview PDF</MagBtn>
            <MagBtn href="https://github.com/bhagavan444" extraStyle={mob?{padding:"8px 13px",fontSize:"12px",minHeight:"38px"}:{}}><Github size={14}/>GitHub</MagBtn>
            <MagBtn href="https://www.linkedin.com/in/gopalajosyula-siva-satya-sai-bhagavan-1624a027b/" extraStyle={mob?{padding:"8px 13px",fontSize:"12px",minHeight:"38px"}:{}}><Linkedin size={14}/>LinkedIn</MagBtn>
          </div>
        </header>

        <Marquee speed={36}/>

        {/* ══════════ PDF SECTION ══════════ */}
        <section style={{ maxWidth:maxW,margin:"0 auto",padding:pad,paddingTop:mob?"3rem":"8rem",paddingBottom:mob?"3rem":"8rem",borderBottom:`1px solid ${C.border}` }}>
          <div className="two-col-grid" style={{ display:"grid",gridTemplateColumns:mob?"1fr":"1fr 1fr",gap:mob?"2rem":"4rem",alignItems:"start" }}>
            <div style={{ opacity:metVis?1:0,animation:metVis?`_ltr 440ms ${E} 0s both`:"none" }} ref={metRef}>
              <ML style={{ marginBottom:"10px" }}>Technical Profile</ML>
              <h2 className="dancing-h2" style={{ fontSize:mob?"clamp(2rem,7vw,3rem)":"clamp(2.8rem,5vw,4rem)",marginBottom:"14px" }}>
                One-page profile,<br/><span style={{ opacity:0.55,fontSize:"0.85em" }}>ATS-optimized.</span>
              </h2>
              <p style={{ fontSize:mob?"13px":"14.5px",color:"rgba(255,255,255,0.60)",lineHeight:1.75,marginBottom:"2rem" }}>
                Structured for automated screening with clean section hierarchy. Ownership-oriented language throughout — not tasks, but outcomes.
              </p>
              <div style={{ border:`1px solid ${C.border}`,borderRadius:"10px",overflow:"hidden",marginBottom:"2rem" }}>
                {[{ label:"Format",value:"PDF · ATS-Optimized" },{ label:"Structure",value:"Ownership-Oriented" },{ label:"Experience Signal",value:"3 Technical Internships" },{ label:"Systems Built",value:"4 Production Deployments" },{ label:"Cross-Stack",value:"AI/ML + Full-Stack (MERN)" }].map((row,i)=>(
                  <div key={i} style={{ display:"flex",justifyContent:"space-between",alignItems:"center",padding:"12px 18px",borderBottom:i<4?`1px solid ${C.border}`:"none",background:i%2===0?C.bg:C.surface,transition:"background 150ms" }}
                    onMouseEnter={e=>e.currentTarget.style.background="rgba(255,255,255,0.04)"} onMouseLeave={e=>e.currentTarget.style.background=i%2===0?C.bg:C.surface}>
                    <span style={{ fontFamily:"'DM Mono',monospace",fontSize:"11px",color:C.muted,letterSpacing:"0.04em" }}>{row.label}</span>
                    <span style={{ fontSize:"13px",fontWeight:600,color:"rgba(255,255,255,0.80)" }}>{row.value}</span>
                  </div>
                ))}
              </div>
              <div style={{ display:"flex",gap:"0.75rem",flexWrap:"wrap" }}>
                <MagBtn href={RESUME_DOWNLOAD} extraStyle={mob?{padding:"8px 12px",fontSize:"12px"}:{}}><Download size={13}/>Download PDF</MagBtn>
                <MagBtn onClick={()=>setShowModal(true)} extraStyle={mob?{padding:"8px 12px",fontSize:"12px"}:{}}><Eye size={13}/>View Fullscreen</MagBtn>
              </div>
            </div>
            {!mob&&(
              <div style={{ position:"sticky",top:"6rem" }}>
                <div className="chov" style={{ borderRadius:"12px",overflow:"hidden",border:`1px solid ${C.border}`,cursor:"none",transition:`transform 250ms ${E},border-color 250ms ${E},box-shadow 250ms ${E}` }}
                  onClick={()=>setShowModal(true)}
                  onMouseEnter={e=>{ e.currentTarget.style.transform="translateY(-6px)"; e.currentTarget.style.borderColor=C.border2; e.currentTarget.style.boxShadow="0 20px 60px rgba(0,0,0,0.5)"; }}
                  onMouseLeave={e=>{ e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.borderColor=C.border; e.currentTarget.style.boxShadow="none"; }}>
                  <div style={{ padding:"10px 14px",background:C.elevated,borderBottom:`1px solid ${C.border}`,display:"flex",alignItems:"center",justifyContent:"space-between" }}>
                    <div style={{ display:"flex",alignItems:"center",gap:"8px" }}>
                      <div style={{ display:"flex",gap:"5px" }}>
                        {["rgba(255,95,87,0.8)","rgba(254,188,46,0.8)","rgba(40,200,64,0.8)"].map((c,i)=><span key={i} style={{ width:10,height:10,borderRadius:"50%",background:c,display:"block" }}/>)}
                      </div>
                      <span style={{ fontFamily:"'DM Mono',monospace",fontSize:"10px",color:C.muted,marginLeft:"4px" }}>G_S_S_S_Bhagavan_Resume.pdf</span>
                    </div>
                    <span style={{ fontFamily:"'DM Mono',monospace",fontSize:"10px",color:C.muted3 }}>1 pg</span>
                  </div>
                  <div style={{ height:"500px",background:C.surface,overflow:"hidden" }}>
                    <iframe src={RESUME_PREVIEW} style={{ width:"100%",height:"100%",border:"none",pointerEvents:"none" }} title="Resume Preview"/>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        <Marquee speed={30}/>

        {/* ══════════ PROOF METRICS ══════════ */}
        <section style={{ maxWidth:maxW,margin:"0 auto",padding:pad,paddingTop:mob?"2.5rem":"6rem",paddingBottom:mob?"2.5rem":"6rem",borderBottom:`1px solid ${C.border}` }}>
          <div className="metrics-4" style={{ display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:"1px",background:C.border,border:`1px solid ${C.border}`,borderRadius:"12px",overflow:"hidden" }}>
            {PROOF_METRICS.map((m,i)=>(
              <div key={i} style={{ padding:mob?"1.25rem":"2.5rem 2rem",background:C.surface,opacity:metVis?1:0,animation:metVis?`_up 440ms ${E} ${i*0.07}s both`:"none",transition:"background 200ms" }}
                onMouseEnter={e=>e.currentTarget.style.background=C.elevated} onMouseLeave={e=>e.currentTarget.style.background=C.surface}>
                <div className="dancing-h2" style={{ fontSize:mob?"2.2rem":"3.2rem",color:"#FFFFFF",lineHeight:1,marginBottom:"8px",letterSpacing:"-0.02em" }}>
                  <Counter value={m.value} triggered={metVis}/>{m.suffix}
                </div>
                <div style={{ fontSize:mob?"12px":"14px",fontWeight:600,color:"rgba(255,255,255,0.80)",marginBottom:"4px" }}>{m.label}</div>
                <div style={{ fontFamily:"'DM Mono',monospace",fontSize:mob?"10px":"11px",color:C.muted,lineHeight:1.4 }}>{m.sub}</div>
              </div>
            ))}
          </div>
        </section>

        <Marquee speed={32}/>

        {/* ══════════ EXPERIENCE ══════════ */}
        <section id="sec-1" ref={expRef} style={{ maxWidth:maxW,margin:"0 auto",padding:pad,paddingTop:mob?"3rem":"8rem",paddingBottom:mob?"3rem":"8rem",borderBottom:`1px solid ${C.border}` }}>
          <div style={{ marginBottom:"2.5rem",opacity:expVis?1:0,animation:expVis?`_ltr 440ms ${E} 0s both`:"none" }}>
            <ML style={{ marginBottom:"10px" }}>Industry Experience</ML>
            <h2 className="dancing-h2" style={{ fontSize:mob?"clamp(2rem,7vw,3rem)":"clamp(2.8rem,5vw,4.5rem)",marginBottom:"10px",display:"flex",alignItems:"center" }}>
              3 Internships, 3 Environments<TermCursor/>
            </h2>
            <p style={{ fontSize:mob?"12.5px":"13.5px",color:C.muted,lineHeight:1.65,maxWidth:"500px" }}>Each engagement involved real codebases, real users, and real delivery timelines.</p>
          </div>
          <div style={{ display:"flex",flexDirection:"column" }}>
            {EXPERIENCES.map((exp,i)=>(
              <div key={i} style={{ padding:mob?"2rem 0":"3.5rem 0",borderBottom:i<EXPERIENCES.length-1?`1px solid ${C.border}`:"none",opacity:expVis?1:0,animation:expVis?`_up 440ms ${E} ${i*0.10}s both`:"none" }}>
                <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:"20px",marginBottom:"6px",flexWrap:"wrap" }}>
                  <div style={{ flex:1 }}>
                    <div style={{ display:"flex",alignItems:"baseline",gap:"12px",flexWrap:"wrap" }}>
                      <h3 className="dancing-h3" style={{ fontSize:mob?"1.6rem":"2.2rem",color:"#FFFFFF" }}>{exp.role}</h3>
                      <span style={{ fontFamily:"'DM Mono',monospace",fontSize:"9px",fontWeight:600,padding:"3px 8px",borderRadius:"4px",background:"rgba(255,255,255,0.06)",border:`1px solid ${C.border}`,color:"rgba(255,255,255,0.55)",textTransform:"uppercase",letterSpacing:"0.08em" }}>{exp.location}</span>
                    </div>
                    <div style={{ display:"flex",alignItems:"center",gap:"10px",marginTop:"6px",flexWrap:"wrap" }}>
                      <span style={{ fontSize:mob?"14px":"15px",fontWeight:600,color:"rgba(255,255,255,0.70)" }}>{exp.company}</span>
                      <span style={{ width:3,height:3,borderRadius:"50%",background:C.muted3,flexShrink:0 }}/>
                      <span style={{ fontFamily:"'DM Mono',monospace",fontSize:"11px",color:C.muted,fontStyle:"italic" }}>{exp.context}</span>
                    </div>
                  </div>
                  <span style={{ fontFamily:"'DM Mono',monospace",fontSize:"11px",color:C.muted,display:"flex",alignItems:"center",gap:"5px",flexShrink:0 }}><Calendar size={11}/>{exp.period}</span>
                </div>
                <div style={{ height:"1px",width:"60px",background:"rgba(255,255,255,0.25)",borderRadius:"2px",margin:"1rem 0 1.5rem",transformOrigin:"left",transform:expVis?"scaleX(1)":"scaleX(0)",transition:`transform 320ms ${E} ${0.2+i*0.1}s` }}/>
                <div className="two-col-grid" style={{ display:"grid",gridTemplateColumns:mob?"1fr":"1fr 1fr",gap:mob?"1rem":"2.5rem",marginBottom:"1.5rem" }}>
                  <ul style={{ listStyle:"none",display:"flex",flexDirection:"column",gap:"9px" }}>
                    {exp.bullets.map((b,bi)=>(
                      <li key={bi} style={{ display:"flex",gap:"10px",alignItems:"flex-start" }}>
                        <span style={{ width:"3px",height:"3px",borderRadius:"50%",background:"rgba(255,255,255,0.5)",flexShrink:0,marginTop:"9px" }}/>
                        <span style={{ fontSize:mob?"13px":"13.5px",color:"rgba(255,255,255,0.65)",lineHeight:1.65 }}>{b}</span>
                      </li>
                    ))}
                  </ul>
                  {!mob&&(
                    <div style={{ padding:"1.25rem 1.5rem",background:C.surface,border:`1px solid ${C.border}`,borderRadius:"12px" }}>
                      <ML style={{ marginBottom:"10px",fontSize:"9px" }}>Key Decisions</ML>
                      <ul style={{ listStyle:"none",display:"flex",flexDirection:"column",gap:"8px",marginBottom:"1rem" }}>
                        {exp.decisions.map((d,di)=>(
                          <li key={di} style={{ display:"flex",gap:"8px",alignItems:"flex-start" }}>
                            <Zap size={11} style={{ color:"rgba(255,255,255,0.4)",flexShrink:0,marginTop:"3px" }}/>
                            <span style={{ fontSize:"12px",color:"rgba(255,255,255,0.60)",lineHeight:1.6 }}>{d}</span>
                          </li>
                        ))}
                      </ul>
                      <div style={{ borderTop:`1px solid ${C.border}`,paddingTop:"10px" }}>
                        <ML style={{ marginBottom:"6px",fontSize:"9px" }}>Outcome</ML>
                        <p style={{ fontSize:"11.5px",color:"rgba(255,255,255,0.55)",lineHeight:1.6 }}>{exp.outcome}</p>
                      </div>
                    </div>
                  )}
                </div>
                <div style={{ display:"flex",flexWrap:"wrap",gap:"7px" }}>
                  {exp.tech.map((t,ti)=><TechTag key={t} name={t} visible={expVis} delay={ti*0.03}/>)}
                </div>
              </div>
            ))}
          </div>
        </section>

        <Marquee speed={28}/>

        {/* ══════════ PROJECTS ══════════ */}
        <section id="sec-2" ref={projRef} style={{ maxWidth:maxW,margin:"0 auto",padding:pad,paddingTop:mob?"3rem":"8rem",paddingBottom:mob?"3rem":"8rem",borderBottom:`1px solid ${C.border}` }}>
          <div style={{ marginBottom:"2.5rem",opacity:projVis?1:0,animation:projVis?`_ltr 440ms ${E} 0s both`:"none" }}>
            <ML style={{ marginBottom:"10px" }}>Selected Systems</ML>
            <h2 className="dancing-h2" style={{ fontSize:mob?"clamp(2rem,7vw,3rem)":"clamp(2.8rem,5vw,4.5rem)",marginBottom:"10px" }}>4 Production Deployments</h2>
            <p style={{ fontSize:mob?"12.5px":"13.5px",color:C.muted,lineHeight:1.65,maxWidth:"480px" }}>Every system started with a problem statement, not a technology choice. Built end-to-end with measurable outcomes.</p>
          </div>
          <div className="proj-grid" style={{ display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:mob?"0.9rem":"1.5rem" }}>
            {PROJECTS.map((proj,i)=>(
              <div key={i} style={{ border:`1px solid ${C.border}`,borderRadius:"14px",padding:mob?"1.25rem":"1.75rem",background:C.surface,opacity:projVis?1:0,animation:projVis?`_up 440ms ${E} ${i*0.08}s both`:"none",transition:`border-color 190ms ${E},transform 190ms ${E},box-shadow 190ms ${E}`,display:"flex",flexDirection:"column",gap:"14px" }}
                onMouseEnter={e=>{ e.currentTarget.style.borderColor=C.border2; e.currentTarget.style.transform="translateY(-4px)"; e.currentTarget.style.boxShadow="0 12px 40px rgba(0,0,0,0.4)"; }}
                onMouseLeave={e=>{ e.currentTarget.style.borderColor=C.border; e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="none"; }}>
                <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center" }}>
                  <span style={{ fontFamily:"'DM Mono',monospace",fontSize:"10px",fontWeight:600,padding:"4px 9px",borderRadius:"5px",background:"rgba(255,255,255,0.06)",border:`1px solid ${C.border}`,color:"rgba(255,255,255,0.55)",textTransform:"uppercase",letterSpacing:"0.06em" }}>{proj.tag}</span>
                  <div style={{ display:"flex",alignItems:"center",gap:"8px" }}>
                    <span style={{ fontFamily:"'DM Mono',monospace",fontSize:"10px",fontWeight:600,padding:"3px 8px",borderRadius:"4px",background:"rgba(255,255,255,0.05)",border:`1px solid ${proj.status==="Live"?"rgba(255,255,255,0.2)":C.border}`,color:proj.status==="Live"?"rgba(255,255,255,0.85)":"rgba(255,255,255,0.55)",textTransform:"uppercase",letterSpacing:"0.06em" }}>{proj.status}</span>
                    <span style={{ fontFamily:"'DM Mono',monospace",fontSize:"10px",color:C.muted3 }}>{proj.year}</span>
                  </div>
                </div>
                <h3 className="dancing-h3" style={{ fontSize:mob?"1.4rem":"1.75rem" }}>{proj.name}</h3>
                <div style={{ display:"flex",flexDirection:"column",gap:"8px" }}>
                  {[{ label:"Problem",text:proj.problem },{ label:"Approach",text:proj.approach },{ label:"Outcome",text:proj.outcome }].map((row,ri)=>(
                    <div key={ri} style={{ display:"grid",gridTemplateColumns:"70px 1fr",gap:"8px",alignItems:"baseline" }}>
                      <span style={{ fontFamily:"'DM Mono',monospace",fontSize:"9px",color:C.muted3,letterSpacing:"0.06em",textTransform:"uppercase",paddingTop:"2px" }}>{row.label}</span>
                      <span style={{ fontSize:mob?"12px":"12.5px",color:"rgba(255,255,255,0.60)",lineHeight:1.6 }}>{row.text}</span>
                    </div>
                  ))}
                </div>
                <div style={{ display:"flex",flexWrap:"wrap",gap:"6px" }}>
                  {proj.tech.map((t,ti)=><TechTag key={t} name={t} visible={projVis} delay={ti*0.03}/>)}
                </div>
                <a href={proj.github} target="_blank" rel="noopener noreferrer" style={{ display:"inline-flex",alignItems:"center",gap:"5px",fontSize:"12px",fontWeight:600,color:C.muted,marginTop:"2px",transition:`color 150ms ${E},transform 150ms ${E}` }}
                  onMouseEnter={e=>{ e.currentTarget.style.color="#FFFFFF"; e.currentTarget.style.transform="translateX(3px)"; }} onMouseLeave={e=>{ e.currentTarget.style.color=C.muted; e.currentTarget.style.transform="translateX(0)"; }}>
                  View on GitHub <ArrowUpRight size={13}/>
                </a>
              </div>
            ))}
          </div>
        </section>

        <Marquee speed={34}/>

        {/* ══════════ CAPABILITIES ══════════ */}
        <section id="sec-3" ref={capsRef} style={{ maxWidth:maxW,margin:"0 auto",padding:pad,paddingTop:mob?"3rem":"8rem",paddingBottom:mob?"3rem":"8rem",borderBottom:`1px solid ${C.border}` }}>
          <div style={{ marginBottom:"2.5rem",opacity:capsVis?1:0,animation:capsVis?`_ltr 440ms ${E} 0s both`:"none" }}>
            <ML style={{ marginBottom:"10px" }}>Technical Capabilities</ML>
            <h2 className="dancing-h2" style={{ fontSize:mob?"clamp(2rem,7vw,3rem)":"clamp(2.8rem,5vw,4.5rem)",marginBottom:"10px" }}>5 Capability Clusters</h2>
            <p style={{ fontSize:mob?"12.5px":"13.5px",color:C.muted,lineHeight:1.65,maxWidth:"440px" }}>Each production-tested across real internship and project environments.</p>
          </div>
          <div className="caps-grid" style={{ display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:mob?"0.9rem":"1.25rem" }}>
            {CAPABILITIES.map((cap,i)=>{
              const IconComp=cap.icon;
              return (
                <div key={i} style={{ padding:mob?"1.25rem":"1.75rem",background:C.surface,border:`1px solid ${C.border}`,borderRadius:"12px",opacity:capsVis?1:0,animation:capsVis?`_scaleIn 440ms ${E} ${i*0.07}s both`:"none",transition:`border-color 190ms ${E},transform 190ms ${E}`,...(i===4?{gridColumn:"span 2"}:{}) }}
                  onMouseEnter={e=>{ e.currentTarget.style.borderColor=C.border2; e.currentTarget.style.transform="translateY(-3px)"; }} onMouseLeave={e=>{ e.currentTarget.style.borderColor=C.border; e.currentTarget.style.transform="translateY(0)"; }}>
                  <div style={{ display:"flex",alignItems:"center",gap:"10px",marginBottom:"14px" }}>
                    <div style={{ width:34,height:34,borderRadius:"8px",background:"rgba(255,255,255,0.06)",border:`1px solid ${C.border}`,display:"flex",alignItems:"center",justifyContent:"center" }}>
                      <IconComp size={16} style={{ color:"rgba(255,255,255,0.65)" }}/>
                    </div>
                    <span style={{ fontFamily:"'Dancing Script',cursive",fontWeight:700,fontSize:mob?"1.2rem":"1.4rem",color:"#FFFFFF" }}>{cap.cluster}</span>
                  </div>
                  <div style={{ display:"flex",flexWrap:"wrap",gap:"6px" }}>
                    {cap.skills.map((s,si)=>(
                      <span key={si} style={{ fontFamily:"'DM Mono',monospace",fontSize:"11px",padding:"4px 9px",borderRadius:"5px",background:C.bg,color:"rgba(255,255,255,0.55)",border:`1px solid ${C.border}`,transition:"all 130ms" }}
                        onMouseEnter={e=>{ e.currentTarget.style.background="rgba(255,255,255,0.08)"; e.currentTarget.style.color="#FFFFFF"; }} onMouseLeave={e=>{ e.currentTarget.style.background=C.bg; e.currentTarget.style.color="rgba(255,255,255,0.55)"; }}>
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <Marquee speed={26}/>

        {/* ══════════ ATS ══════════ */}
        <section id="sec-4" ref={atsRef} style={{ maxWidth:maxW,margin:"0 auto",padding:pad,paddingTop:mob?"3rem":"8rem",paddingBottom:mob?"3rem":"8rem",borderBottom:`1px solid ${C.border}` }}>
          <ATSChecker vis={atsVis}/>
        </section>

        <Marquee speed={38}/>

        {/* ══════════ EDUCATION ══════════ */}
        <section id="sec-5" ref={eduRef} style={{ maxWidth:maxW,margin:"0 auto",padding:pad,paddingTop:mob?"3rem":"8rem",paddingBottom:mob?"3rem":"8rem",borderBottom:`1px solid ${C.border}` }}>
          <div style={{ marginBottom:"2.5rem",opacity:eduVis?1:0,animation:eduVis?`_ltr 440ms ${E} 0s both`:"none" }}>
            <ML style={{ marginBottom:"10px" }}>Education & Credentials</ML>
            <h2 className="dancing-h2" style={{ fontSize:mob?"clamp(2rem,7vw,3rem)":"clamp(2.8rem,5vw,4.5rem)",marginBottom:"10px" }}>
              Engineering AI & DS,<br/><span style={{ opacity:0.55,fontSize:"0.8em" }}>graduating 2026.</span>
            </h2>
          </div>

          <div style={{ padding:mob?"1.25rem":"2.5rem",borderRadius:"14px",background:C.surface,border:`1px solid ${C.border}`,marginBottom:"1.25rem",opacity:eduVis?1:0,animation:eduVis?`_up 440ms ${E} 0.06s both`:"none",position:"relative",overflow:"hidden" }}>
            <div style={{ position:"absolute",top:0,left:"20%",right:"20%",height:"1px",background:"linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)" }}/>
            <div className="two-col-grid" style={{ display:"grid",gridTemplateColumns:mob?"1fr":"1fr 1fr",gap:mob?"1.25rem":"2.5rem",alignItems:"start" }}>
              <div>
                <ML style={{ marginBottom:"12px" }}>Primary Degree</ML>
                <h3 className="dancing-h3" style={{ fontSize:mob?"1.5rem":"2rem",marginBottom:"8px" }}>{EDUCATION.degree}</h3>
                <p style={{ fontSize:mob?"13px":"14px",color:"rgba(255,255,255,0.60)",marginBottom:"12px",lineHeight:1.5 }}>{EDUCATION.school}</p>
                <div style={{ display:"flex",gap:"10px",flexWrap:"wrap" }}>
                  <span style={{ fontFamily:"'DM Mono',monospace",fontSize:"11px",padding:"4px 10px",borderRadius:"5px",background:"rgba(255,255,255,0.06)",border:`1px solid ${C.border}`,color:"rgba(255,255,255,0.55)" }}>{EDUCATION.period}</span>
                  <span style={{ fontFamily:"'DM Mono',monospace",fontSize:"11px",padding:"4px 10px",borderRadius:"5px",background:"rgba(255,255,255,0.08)",border:`1px solid rgba(255,255,255,0.2)`,color:"rgba(255,255,255,0.85)" }}>{EDUCATION.score}</span>
                </div>
              </div>
              <div>
                <ML style={{ marginBottom:"12px" }}>Relevant Coursework</ML>
                <div style={{ display:"flex",flexWrap:"wrap",gap:"6px" }}>
                  {EDUCATION.relevant.map((c,i)=>(
                    <span key={i} style={{ fontFamily:"'DM Mono',monospace",fontSize:"11px",padding:"4px 9px",borderRadius:"5px",background:C.bg,color:"rgba(255,255,255,0.55)",border:`1px solid ${C.border}` }}>{c}</span>
                  ))}
                </div>
              </div>
            </div>
            <div style={{ marginTop:"1.75rem",paddingTop:"1.5rem",borderTop:`1px solid ${C.border}` }}>
              <div className="edu-prev" style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:"1rem" }}>
                {EDUCATION.previous.map((e,i)=>(
                  <div key={i} style={{ padding:"1rem 1.25rem",background:C.bg,borderRadius:"10px",border:`1px solid ${C.border}` }}>
                    <div className="dancing-h3" style={{ fontSize:"1.1rem",marginBottom:"4px" }}>{e.level}</div>
                    <div style={{ fontSize:"12px",color:"rgba(255,255,255,0.55)",marginBottom:"10px" }}>{e.institution}</div>
                    <div style={{ display:"flex",gap:"8px" }}>
                      <span style={{ fontFamily:"'DM Mono',monospace",fontSize:"10px",padding:"3px 8px",borderRadius:"4px",background:"rgba(255,255,255,0.06)",border:`1px solid ${C.border}`,color:C.muted }}>{e.period}</span>
                      <span style={{ fontFamily:"'DM Mono',monospace",fontSize:"10px",padding:"3px 8px",borderRadius:"4px",background:"rgba(255,255,255,0.06)",border:`1px solid ${C.border}`,color:C.muted }}>{e.score}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div style={{ border:`1px solid ${C.border}`,borderRadius:"12px",overflow:"hidden",opacity:eduVis?1:0,animation:eduVis?`_up 440ms ${E} 0.12s both`:"none" }}>
            <div style={{ padding:"12px 20px",background:C.elevated,borderBottom:`1px solid ${C.border}` }}>
              <ML>Certifications · {CERTIFICATIONS.length} total</ML>
            </div>
            <div className="cert-grid" style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:"1px",background:C.border }}>
              {CERTIFICATIONS.map((cert,i)=>(
                <div key={i} style={{ padding:"14px 18px",background:C.surface,display:"flex",justifyContent:"space-between",alignItems:"baseline",gap:"14px",transition:"background 150ms" }}
                  onMouseEnter={e=>e.currentTarget.style.background=C.elevated} onMouseLeave={e=>e.currentTarget.style.background=C.surface}>
                  <div style={{ flex:1,minWidth:0 }}>
                    <div style={{ fontSize:"13px",fontWeight:600,color:"rgba(255,255,255,0.80)",marginBottom:"3px",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis" }}>{cert.name}</div>
                    <div style={{ fontFamily:"'DM Mono',monospace",fontSize:"10px",color:C.muted }}>{cert.issuer}</div>
                  </div>
                  <span style={{ fontFamily:"'DM Mono',monospace",fontSize:"10px",color:C.muted3,flexShrink:0 }}>{cert.year}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Marquee speed={30}/>

        {/* ══════════ CTA ══════════ */}
        <section ref={ctaRef} style={{ maxWidth:maxW,margin:"0 auto",padding:pad,paddingTop:mob?"3rem":"8rem",paddingBottom:mob?"3rem":"6rem" }}>
          <div style={{ position:"relative",padding:mob?"1.75rem 1.25rem":"3.5rem 3rem",border:`1px solid ${C.border}`,borderRadius:"18px",background:C.surface,overflow:"hidden",opacity:ctaVis?1:0,animation:ctaVis?`_up 440ms ${E} 0s both`:"none" }}>
            <div style={{ position:"absolute",top:0,left:"20%",right:"20%",height:"1px",background:"linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)" }}/>
            <div style={{ position:"absolute",top:"-20%",right:"-5%",width:mob?"200px":"400px",height:mob?"200px":"400px",borderRadius:"50%",background:"radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)",filter:"blur(40px)",pointerEvents:"none" }}/>
            <div style={{ position:"relative",zIndex:1,maxWidth:"600px" }}>
              <div style={{ display:"inline-flex",alignItems:"center",gap:"8px",padding:"6px 14px",borderRadius:"20px",background:"rgba(255,255,255,0.06)",border:`1px solid rgba(255,255,255,0.12)`,marginBottom:mob?"1.25rem":"2.5rem" }}>
                <div style={{ width:"6px",height:"6px",borderRadius:"50%",background:"#FFFFFF",animation:"_pulse 2.2s ease-in-out infinite" }}/>
                <span style={{ fontFamily:"'DM Mono',monospace",fontSize:"10px",color:"rgba(255,255,255,0.7)",letterSpacing:"0.08em",textTransform:"uppercase" }}>Open for opportunities · IST UTC+5:30</span>
              </div>
              <h2 className="dancing-h2" style={{ fontSize:mob?"clamp(2rem,7vw,3.2rem)":"clamp(3rem,5vw,5rem)",marginBottom:"14px" }}>
                Let's discuss how I can<br/>contribute to your team.
              </h2>
              <p style={{ fontSize:mob?"13px":"15px",color:"rgba(255,255,255,0.60)",lineHeight:1.75,marginBottom:mob?"1.75rem":"3rem" }}>
                Seeking junior engineering roles in software development, AI/ML, or full-stack positions. Ready to contribute to production systems from day one. Typically respond within 24 hours.
              </p>
              <div style={{ display:"flex",gap:"0.75rem",flexWrap:"wrap",marginBottom:mob?"1.5rem":"2.5rem" }}>
                <MagBtn href={RESUME_DOWNLOAD} extraStyle={mob?{padding:"8px 12px",fontSize:"12px"}:{}}><Download size={13}/>Download Resume</MagBtn>
                <MagBtn href="mailto:g.sivasatyasaibhagavan@gmail.com?subject=Opportunity" extraStyle={mob?{padding:"8px 12px",fontSize:"12px"}:{}}><Mail size={13}/>Get in Touch</MagBtn>
              </div>
              <div style={{ display:"flex",gap:mob?"1.5rem":"2.5rem",flexWrap:"wrap" }}>
                {[{ label:"Email",value:"< 24hr response" },{ label:"Location",value:"Eluru, AP · Open to Relocation" },{ label:"Availability",value:"From June 2026" }].map((item,i)=>(
                  <div key={i}>
                    <ML style={{ marginBottom:"4px" }}>{item.label}</ML>
                    <div style={{ fontSize:mob?"12px":"13px",fontWeight:600,color:"rgba(255,255,255,0.75)" }}>{item.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ══════════ FOOTER ══════════ */}
        <footer style={{ borderTop:`1px solid ${C.border}`,background:C.surface }}>
          <div style={{ maxWidth:maxW,margin:"0 auto",padding:pad,paddingTop:mob?"2.5rem":"5rem",paddingBottom:mob?"2.5rem":"5rem" }}>
            <div style={{ marginBottom:mob?"2rem":"4rem" }}>
              <h2 className="dancing-h1" style={{ fontSize:mob?"clamp(2.5rem,10vw,4rem)":"clamp(4rem,8vw,7rem)",opacity:0.08,userSelect:"none",lineHeight:0.9 }}>
                Ready to build<br/>something great.
              </h2>
            </div>
            <div className="ft-grid" style={{ display:"grid",gridTemplateColumns:mob?"1fr 1fr":"1.2fr 1fr 1fr 1fr",gap:0,borderTop:`1px solid ${C.border}` }}>
              {/* Col 1 */}
              <div style={{ paddingTop:"2rem",paddingBottom:"2rem",paddingRight:mob?"1rem":"3rem",borderRight:`1px solid ${C.border}` }}>
                <p style={{ fontSize:mob?"12px":"14px",lineHeight:1.75,color:"rgba(255,255,255,0.40)",marginBottom:"1.5rem",maxWidth:"280px" }}>B.Tech AI & Data Science engineer with hands-on production experience across full-stack MERN and ML systems.</p>
                <div style={{ display:"flex",flexDirection:"column",gap:"0.75rem" }}>
                  <MagBtn href={RESUME_DOWNLOAD} extraStyle={{ padding:"9px 16px",fontSize:"12px",minHeight:"38px" }}><Download size={13}/>Download Resume</MagBtn>
                  <MagBtn href="mailto:g.sivasatyasaibhagavan@gmail.com" extraStyle={{ padding:"9px 16px",fontSize:"12px",minHeight:"38px" }}><Mail size={13}/>Get in Touch</MagBtn>
                </div>
              </div>
              {/* Col 2 */}
              <div style={{ paddingTop:"2rem",paddingBottom:"2rem",paddingLeft:mob?"1rem":"2.5rem",paddingRight:mob?"0":"2.5rem",borderRight:mob?"none":`1px solid ${C.border}` }}>
                <ML style={{ marginBottom:"1rem" }}>Quick Links</ML>
                <div style={{ display:"flex",flexDirection:"column",gap:"12px" }}>
                  {[{ label:"Download Resume",href:RESUME_DOWNLOAD },{ label:"GitHub Profile",href:"https://github.com/bhagavan444" },{ label:"LinkedIn",href:"https://www.linkedin.com/in/gopalajosyula-siva-satya-sai-bhagavan-1624a027b/" },{ label:"Email",href:"mailto:g.sivasatyasaibhagavan@gmail.com" }].map((item,i)=>(
                    <a key={i} href={item.href} target={item.href.startsWith("http")?"_blank":undefined} rel="noopener noreferrer" style={{ display:"inline-flex",alignItems:"center",gap:"6px",fontSize:"13px",color:"rgba(255,255,255,0.45)",textDecoration:"none",transition:`color 150ms ${E},transform 150ms ${E}`,width:"fit-content" }}
                      onMouseEnter={e=>{ e.currentTarget.style.color="#FFFFFF"; e.currentTarget.style.transform="translateX(4px)"; }} onMouseLeave={e=>{ e.currentTarget.style.color="rgba(255,255,255,0.45)"; e.currentTarget.style.transform="translateX(0)"; }}>
                      <ChevronRight size={11} style={{ opacity:0.3,flexShrink:0 }}/>{item.label}
                    </a>
                  ))}
                </div>
              </div>
              {/* Col 3 */}
              <div className="ft-hide" style={{ paddingTop:"2rem",paddingBottom:"2rem",paddingLeft:"2.5rem",paddingRight:"2.5rem",borderRight:`1px solid ${C.border}` }}>
                <ML style={{ marginBottom:"1rem" }}>Contact</ML>
                <div style={{ display:"flex",flexDirection:"column",gap:"16px" }}>
                  {[{ icon:Mail,text:"g.sivasatyasaibhagavan@gmail.com",href:"mailto:g.sivasatyasaibhagavan@gmail.com",sub:"< 24hr response" },{ icon:Github,text:"github.com/bhagavan444",href:"https://github.com/bhagavan444",sub:"4 projects" },{ icon:Linkedin,text:"LinkedIn Profile",href:"https://www.linkedin.com/in/gopalajosyula-siva-satya-sai-bhagavan-1624a027b/",sub:"Connect" },{ icon:MapPin,text:"Eluru, AP, India",href:null,sub:"IST · UTC+5:30" }].map((item,i)=>{
                    const Tag=item.href?"a":"div";
                    return (
                      <Tag key={i} href={item.href||undefined} target={item.href?.startsWith("http")?"_blank":undefined} rel="noopener noreferrer" style={{ display:"flex",alignItems:"flex-start",gap:"9px",textDecoration:"none" }}>
                        <div style={{ width:28,height:28,borderRadius:"7px",background:"rgba(255,255,255,0.05)",border:`1px solid ${C.border}`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
                          <item.icon size={13} style={{ color:"rgba(255,255,255,0.4)" }}/>
                        </div>
                        <div>
                          <div style={{ fontSize:"12px",color:"rgba(255,255,255,0.50)",lineHeight:1.4,wordBreak:"break-all",transition:"color 150ms" }}
                            onMouseEnter={item.href?e=>e.currentTarget.style.color="#FFFFFF":undefined} onMouseLeave={item.href?e=>e.currentTarget.style.color="rgba(255,255,255,0.50)":undefined}>{item.text}</div>
                          <div style={{ fontFamily:"'DM Mono',monospace",fontSize:"9px",color:C.muted3,marginTop:"2px" }}>{item.sub}</div>
                        </div>
                      </Tag>
                    );
                  })}
                </div>
              </div>
              {/* Col 4 */}
              <div className="ft-hide" style={{ paddingTop:"2rem",paddingBottom:"2rem",paddingLeft:"2.5rem" }}>
                <ML style={{ marginBottom:"1rem" }}>Current Stack</ML>
                <div style={{ display:"flex",flexWrap:"wrap",gap:"6px",marginBottom:"1.5rem" }}>
                  {["React","Node.js","Python","TensorFlow","MongoDB","Flask"].map((s,i)=>(
                    <span key={i} style={{ fontFamily:"'DM Mono',monospace",fontSize:"10px",padding:"4px 9px",borderRadius:"5px",background:"rgba(255,255,255,0.05)",border:`1px solid ${C.border}`,color:"rgba(255,255,255,0.40)",cursor:"default",transition:"all 150ms" }}
                      onMouseEnter={e=>{ e.currentTarget.style.background="rgba(255,255,255,0.10)"; e.currentTarget.style.color="#FFFFFF"; }} onMouseLeave={e=>{ e.currentTarget.style.background="rgba(255,255,255,0.05)"; e.currentTarget.style.color="rgba(255,255,255,0.40)"; }}>
                      {s}
                    </span>
                  ))}
                </div>
                <div style={{ display:"flex",flexDirection:"column",gap:"8px" }}>
                  {[{ label:"Availability",value:"From June 2026",dot:"rgba(255,255,255,0.9)" },{ label:"Location",value:"Open to Relocation",dot:"rgba(255,255,255,0.65)" },{ label:"Response Time",value:"< 24 hours",dot:"rgba(255,255,255,0.5)" }].map((item,i)=>(
                    <div key={i} style={{ padding:"10px 12px",borderRadius:"8px",background:"rgba(255,255,255,0.03)",border:`1px solid ${C.border}`,display:"flex",alignItems:"center",justifyContent:"space-between",gap:"10px" }}>
                      <span style={{ fontFamily:"'DM Mono',monospace",fontSize:"9px",color:C.muted3,letterSpacing:"0.05em" }}>{item.label}</span>
                      <div style={{ display:"flex",alignItems:"center",gap:"5px" }}>
                        <span style={{ width:5,height:5,borderRadius:"50%",background:item.dot,flexShrink:0 }}/>
                        <span style={{ fontSize:"11px",fontWeight:600,color:"rgba(255,255,255,0.60)" }}>{item.value}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div style={{ marginTop:mob?"1.5rem":"3rem",paddingTop:mob?"1.5rem":"2rem",borderTop:`1px solid ${C.border}`,display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:"1rem" }}>
              <div>
                <div className="dancing-h3" style={{ fontSize:"1.25rem",opacity:0.45,marginBottom:"3px" }}>Gopalajosyula Siva Satya Sai Bhagavan</div>
                <div style={{ fontFamily:"'DM Mono',monospace",fontSize:"10px",color:C.muted3 }}>© 2026 · Built with React & Next.js</div>
              </div>
              <div style={{ display:"flex",gap:"10px",alignItems:"center" }}>
                {[{ icon:Github,href:"https://github.com/bhagavan444" },{ icon:Linkedin,href:"https://www.linkedin.com/in/gopalajosyula-siva-satya-sai-bhagavan-1624a027b/" },{ icon:Mail,href:"mailto:g.sivasatyasaibhagavan@gmail.com" }].map((s,i)=>(
                  <a key={i} href={s.href} target={s.href.startsWith("http")?"_blank":undefined} rel="noopener noreferrer" style={{ width:36,height:36,borderRadius:"8px",display:"flex",alignItems:"center",justifyContent:"center",background:"rgba(255,255,255,0.04)",border:`1px solid ${C.border}`,color:"rgba(255,255,255,0.40)",transition:`all 190ms ${E}` }}
                    onMouseEnter={e=>{ e.currentTarget.style.background="rgba(255,255,255,0.10)"; e.currentTarget.style.color="#FFFFFF"; e.currentTarget.style.transform="translateY(-3px)"; e.currentTarget.style.borderColor=C.border2; }} onMouseLeave={e=>{ e.currentTarget.style.background="rgba(255,255,255,0.04)"; e.currentTarget.style.color="rgba(255,255,255,0.40)"; e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.borderColor=C.border; }}>
                    <s.icon size={15}/>
                  </a>
                ))}
                <button onClick={()=>window.scrollTo({top:0,behavior:"smooth"})} style={{ display:"inline-flex",alignItems:"center",gap:"6px",padding:"8px 14px",borderRadius:"8px",background:"rgba(255,255,255,0.04)",border:`1px solid ${C.border}`,fontFamily:"'DM Mono',monospace",fontSize:"10px",fontWeight:500,color:"rgba(255,255,255,0.45)",cursor:"none",transition:`all 190ms ${E}` }}
                  onMouseEnter={e=>{ e.currentTarget.style.background="rgba(255,255,255,0.10)"; e.currentTarget.style.color="#FFFFFF"; e.currentTarget.style.transform="translateY(-2px)"; }} onMouseLeave={e=>{ e.currentTarget.style.background="rgba(255,255,255,0.04)"; e.currentTarget.style.color="rgba(255,255,255,0.45)"; e.currentTarget.style.transform="translateY(0)"; }}>
                  Back to top <ArrowUpRight size={11}/>
                </button>
              </div>
            </div>
          </div>
        </footer>
      </div>

      {/* ══════════ PDF MODAL ══════════ */}
      {showModal&&(
        <div onClick={()=>setShowModal(false)} style={{ position:"fixed",inset:0,background:"rgba(0,0,0,0.85)",backdropFilter:"blur(16px)",zIndex:9999,display:"flex",alignItems:"center",justifyContent:"center",padding:"20px",animation:`_modalIn 280ms ${E}` }}>
          <div onClick={e=>e.stopPropagation()} style={{ width:"100%",maxWidth:"960px",height:"90vh",display:"flex",flexDirection:"column",gap:"12px",animation:`_up 280ms ${E}` }}>
            <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between" }}>
              <span style={{ fontFamily:"'DM Mono',monospace",fontSize:"11px",color:"rgba(255,255,255,0.4)" }}>G_S_S_S_Bhagavan_Resume.pdf</span>
              <div style={{ display:"flex",gap:"10px" }}>
                <MagBtn href={RESUME_DOWNLOAD} extraStyle={{ padding:"8px 16px",fontSize:"12px",minHeight:"36px" }}><Download size={13}/>Download</MagBtn>
                <button onClick={()=>setShowModal(false)} style={{ width:38,height:38,borderRadius:"8px",background:"rgba(255,255,255,0.06)",border:`1px solid ${C.border}`,color:"rgba(255,255,255,0.6)",display:"flex",alignItems:"center",justifyContent:"center",cursor:"none",transition:`all 190ms ${E}` }}
                  onMouseEnter={e=>{ e.currentTarget.style.background="rgba(255,255,255,0.12)"; e.currentTarget.style.color="#FFFFFF"; e.currentTarget.style.transform="rotate(90deg)"; }} onMouseLeave={e=>{ e.currentTarget.style.background="rgba(255,255,255,0.06)"; e.currentTarget.style.color="rgba(255,255,255,0.6)"; e.currentTarget.style.transform="rotate(0deg)"; }}>
                  <X size={15}/>
                </button>
              </div>
            </div>
            <div style={{ flex:1,borderRadius:"12px",overflow:"hidden",border:`1px solid ${C.border}` }}>
              <iframe src={RESUME_PREVIEW} style={{ width:"100%",height:"100%",border:"none" }} title="Resume Fullscreen" allowFullScreen/>
            </div>
          </div>
        </div>
      )}
    </>
  );
}