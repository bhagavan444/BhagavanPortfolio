"use client";
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import profileImg from "../assets/profile.jpeg";
import resumePdf from "../assets/bhagavanresume.pdf";
import {
  Download, Github, Linkedin, Mail, Phone, ArrowRight,
  ArrowUpRight, ChevronLeft, ChevronRight, MapPin,
  Search, Layers, GitBranch, Zap, BarChart2, Shield,
  Award, Cpu
} from "lucide-react";

/* ── TOKENS ── */
const T={
  bg:'#f9f9f8',white:'#ffffff',ink:'#0c0c0b',
  muted:'#6b6b68',muted2:'#3d3d3a',
  border:'rgba(0,0,0,0.07)',border2:'rgba(0,0,0,0.11)',
  surface:'#f2f1ee',
  accent:'#1d4ed8',accentL:'rgba(29,78,216,0.08)',
  green:'#15803d',greenL:'rgba(21,128,61,0.08)',
};

/* ── GLOBAL CSS ── */
const CSS=`
@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,600;0,9..144,700;1,9..144,300;1,9..144,400;1,9..144,600&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&family=DM+Mono:wght@400;500&display=swap');
*,*::before,*::after{margin:0;padding:0;box-sizing:border-box;}
html{scroll-behavior:smooth;overflow-x:hidden;}
body{font-family:'DM Sans',-apple-system,sans-serif;background:#f9f9f8;color:#0c0c0b;-webkit-font-smoothing:antialiased;overflow-x:hidden;}
::selection{background:rgba(29,78,216,0.12);}
::-webkit-scrollbar{width:3px;}
::-webkit-scrollbar-thumb{background:rgba(0,0,0,0.12);border-radius:2px;}
.serif{font-family:'Fraunces',Georgia,serif;}
.mono{font-family:'DM Mono',monospace;}
@keyframes fadeUp{from{opacity:0;transform:translateY(22px);}to{opacity:1;transform:translateY(0);}}
@keyframes fadeIn{from{opacity:0;}to{opacity:1;}}
@keyframes cursorBlink{0%,100%{border-color:#1d4ed8;}50%{border-color:transparent;}}
@keyframes pulseDot{0%,100%{opacity:1;}50%{opacity:0.35;}}
@keyframes marquee{from{transform:translateX(0);}to{transform:translateX(-50%);}}
@keyframes marqueeRev{from{transform:translateX(-50%);}to{transform:translateX(0);}}
@keyframes floatY{0%,100%{transform:translateY(0);}50%{transform:translateY(-11px);}}
@keyframes spinRing{from{transform:rotate(0deg);}to{transform:rotate(360deg);}}
@keyframes breathe{0%,100%{transform:scale(1);opacity:0.6;}50%{transform:scale(1.12);opacity:1;}}
@keyframes orbitDot{0%{transform:rotate(0deg) translateX(44px) rotate(0deg);}100%{transform:rotate(360deg) translateX(44px) rotate(-360deg);}}
@keyframes gridPulse{0%,100%{opacity:0.022;}50%{opacity:0.052;}}
.reveal{opacity:0;transform:translateY(24px);transition:opacity 0.6s cubic-bezier(0.16,1,0.3,1),transform 0.6s cubic-bezier(0.16,1,0.3,1);}
.reveal.in{opacity:1;transform:translateY(0);}
.reveal.d1{transition-delay:0.07s;}.reveal.d2{transition-delay:0.14s;}.reveal.d3{transition-delay:0.21s;}
.reveal.d4{transition-delay:0.28s;}.reveal.d5{transition-delay:0.35s;}.reveal.d6{transition-delay:0.42s;}
.mq{display:flex;width:max-content;animation:marquee 36s linear infinite;}
.mq:hover{animation-play-state:paused;}
.mqr{display:flex;width:max-content;animation:marqueeRev 44s linear infinite;}
.mqr:hover{animation-play-state:paused;}
.nav-a{position:relative;text-decoration:none;color:#3d3d3a;font-size:0.875rem;font-weight:450;padding:0.28rem 0;transition:color 0.18s;}
.nav-a::after{content:'';position:absolute;bottom:-1px;left:0;width:100%;height:1px;background:#0c0c0b;transform:scaleX(0);transform-origin:left;transition:transform 0.22s cubic-bezier(0.16,1,0.3,1);}
.nav-a:hover{color:#0c0c0b;}.nav-a:hover::after{transform:scaleX(1);}
.fl{text-decoration:none;color:rgba(255,255,255,0.4);font-size:0.82rem;transition:color 0.18s;}
.fl:hover{color:#fff;}
@media(max-width:1024px){
  .hg{grid-template-columns:1fr !important;}
  .hp{max-width:300px !important;margin:0 auto !important;order:-1 !important;}
  .pg{grid-template-columns:repeat(3,1fr) !important;}
  .fc{grid-template-columns:repeat(2,1fr) !important;}
  .pb{grid-template-columns:1fr !important;}
  .ps{border-left:none !important;border-top:1px solid rgba(0,0,0,0.07) !important;padding-left:0 !important;padding-top:1.75rem !important;margin-top:1.75rem !important;}
  .sg{grid-template-columns:1fr 1fr !important;}
  .fco{grid-template-columns:1fr 1fr !important;}
  .tg{grid-template-columns:1fr !important;}
  .ig{grid-template-columns:1fr 1fr !important;}
}
@media(max-width:768px){
  .nl{display:none !important;}
  .pg{grid-template-columns:repeat(2,1fr) !important;}
  .fc{grid-template-columns:1fr 1fr !important;}
  .sg{grid-template-columns:1fr !important;}
  .fco{grid-template-columns:1fr !important;gap:3rem !important;}
  .ctab{flex-direction:column !important;align-items:flex-start !important;}
  .fb{flex-direction:column !important;gap:0.85rem !important;}
  .ig{grid-template-columns:1fr 1fr !important;}
  .cp{padding:3rem 1.75rem !important;}
  section{padding:5rem 0 !important;}
}
@media(max-width:480px){
  .pg{grid-template-columns:1fr !important;}
  .fc{grid-template-columns:1fr !important;}
  .ig{grid-template-columns:1fr !important;}
  section{padding:4rem 0 !important;}
}
`;

/* ── HOOKS ── */
function useInView(th=0.12){
  const r=useRef(null);const[v,sv]=useState(false);
  useEffect(()=>{
    const o=new IntersectionObserver(([e])=>{if(e.isIntersecting)sv(true);},{threshold:th});
    if(r.current)o.observe(r.current);return()=>o.disconnect();
  },[th]);
  return[r,v];
}
function useReveal(){
  useEffect(()=>{
    const els=document.querySelectorAll('.reveal');
    const o=new IntersectionObserver(e=>{
      e.forEach(en=>{if(en.isIntersecting){en.target.classList.add('in');o.unobserve(en.target);}});
    },{threshold:0.1});
    els.forEach(el=>o.observe(el));return()=>o.disconnect();
  });
}

/* ── COUNTER ── */
function Counter({target,suffix='',triggered}){
  const[v,sv]=useState(0);const s=useRef(false);
  useEffect(()=>{
    if(!triggered||s.current)return;s.current=true;
    const n=parseInt(String(target).replace(/\D/g,''),10);
    if(!n){sv(target);return;}
    let c=0;const inc=n/45;
    const t=setInterval(()=>{c+=inc;if(c>=n){sv(n);clearInterval(t);}else sv(Math.floor(c));},1100/45);
    return()=>clearInterval(t);
  },[triggered,target]);
  return <span>{v}{suffix}</span>;
}

/* ── BTN ── */
function Btn({children,href,onClick,download,primary=false,style:s={}}){
  const[h,sh]=useState(false);
  const base={display:'inline-flex',alignItems:'center',gap:'0.45rem',fontFamily:"'DM Sans',sans-serif",
    fontSize:'0.875rem',fontWeight:500,padding:'0.72rem 1.4rem',borderRadius:'8px',
    border:primary?'none':`1px solid ${T.border2}`,cursor:'pointer',textDecoration:'none',
    whiteSpace:'nowrap',transition:'all 0.2s cubic-bezier(0.16,1,0.3,1)',
    background:primary?T.accent:'transparent',color:primary?'#fff':T.muted2,...s};
  const hov=h?{background:primary?'#1e3a8a':T.surface,color:primary?'#fff':T.ink,
    borderColor:primary?'transparent':'rgba(0,0,0,0.18)',transform:'translateY(-1px)',
    boxShadow:primary?'0 6px 20px rgba(29,78,216,0.25)':'0 2px 8px rgba(0,0,0,0.06)'}:{};
  const C=href?'a':'button';
  return <C href={href} onClick={onClick} download={download} style={{...base,...hov}}
    onMouseEnter={()=>sh(true)} onMouseLeave={()=>sh(false)}
    target={href?.startsWith('http')?'_blank':undefined}
    rel={href?.startsWith('http')?'noopener noreferrer':undefined}>{children}</C>;
}

/* ── TYPEWRITER ── */
function Typewriter({roles}){
  const[idx,si]=useState(0);const[txt,st]=useState('');
  const[del,sd]=useState(false);const[ch,sc]=useState(0);
  useEffect(()=>{
    const cur=roles[idx];let t;
    if(!del){
      if(ch<cur.length){t=setTimeout(()=>{st(cur.slice(0,ch+1));sc(c=>c+1);},62);}
      else t=setTimeout(()=>sd(true),2600);
    }else{
      if(ch>0){t=setTimeout(()=>{st(cur.slice(0,ch-1));sc(c=>c-1);},30);}
      else{sd(false);si(i=>(i+1)%roles.length);}
    }
    return()=>clearTimeout(t);
  },[ch,del,idx,roles]);
  return <span style={{color:T.accent,fontWeight:600}}>{txt}
    <span style={{borderRight:`2px solid ${T.accent}`,marginLeft:'1px',animation:'cursorBlink 0.9s step-end infinite'}}/>
  </span>;
}

/* ── ORBIT DECORATION ── */
function Orbit({size=130,ca='rgba(29,78,216,0.05)',cd='rgba(29,78,216,0.3)',spd=18,style:s={}}){
  return <div style={{width:`${size}px`,height:`${size}px`,position:'relative',...s}}>
    <div style={{position:'absolute',inset:0,borderRadius:'50%',border:`1px solid ${ca}`,animation:`spinRing ${spd}s linear infinite`}}/>
    <div style={{position:'absolute',inset:'8px',borderRadius:'50%',border:`1px dashed ${ca}`,animation:`spinRing ${spd*1.5}s linear infinite reverse`}}/>
    <div style={{position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)',
      width:'9px',height:'9px',borderRadius:'50%',background:cd,animation:'breathe 3s ease-in-out infinite'}}/>
    <div style={{position:'absolute',top:0,left:'50%',transform:'translateX(-50%) translateY(-4px)',
      width:'7px',height:'7px',borderRadius:'50%',background:cd,opacity:0.55,
      animation:`orbitDot ${spd}s linear infinite`}}/>
  </div>;
}

/* ── SCROLL BAR ── */
function SBar(){
  const[p,sp]=useState(0);
  useEffect(()=>{
    const fn=()=>{const m=document.documentElement.scrollHeight-window.innerHeight;sp((window.scrollY/m)*100);};
    window.addEventListener('scroll',fn,{passive:true});return()=>window.removeEventListener('scroll',fn);
  },[]);
  return <div style={{position:'fixed',top:0,left:0,right:0,height:'2px',zIndex:9999}}>
    <div style={{width:`${p}%`,height:'100%',background:T.accent,transition:'width 0.1s linear'}}/>
  </div>;
}

/* ── HOME ── */
export default function Home(){
  const navigate=useNavigate();
  const[scrolled,ss]=useState(false);
  const[tIdx,sti]=useState(0);
  const[mRef,mIn]=useInView();
  const[iRef,iIn]=useInView();
  useReveal();
  useEffect(()=>{const fn=()=>ss(window.scrollY>32);window.addEventListener('scroll',fn,{passive:true});return()=>window.removeEventListener('scroll',fn);},[]);
  useEffect(()=>{const t=setInterval(()=>sti(p=>(p+1)%testimonials.length),6200);return()=>clearInterval(t);},[]);

  /* DATA */
  const metrics=[
    {v:'3', sx:'',  l:'Internships',      s:'MERN · AI/ML · Data Science'},
    {v:'4', sx:'+', l:'Projects Shipped', s:'Full-stack & AI delivered'},
    {v:'10',sx:'+', l:'Technologies',     s:'Python · MERN · TensorFlow'},
    {v:'75',sx:'%', l:'B.Tech CGPA',      s:'AIDS · Ramachandra College'},
  ];
  const philosophy=[
    {icon:Search,  n:'01',t:'Problem First',      b:"I don't start with solutions. I start with constraints — understanding what problem is worth solving, for whom, and why now."},
    {icon:Layers,  n:'02',t:'Systems Thinking',   b:'Every feature is a contract. I design data flows, API surfaces, and state management before UI. Readable systems outlast clever code.'},
    {icon:GitBranch,n:'03',t:'Evidence-Driven',   b:'Decisions backed by data, not opinion. I build with real user pain points in mind, using feedback loops and documented constraints.'},
    {icon:Zap,     n:'04',t:'Ship Small, Often',  b:'Prototype early, fail cheap. I bias toward working software in the smallest scope that tests the core assumption — then iterate.'},
    {icon:BarChart2,n:'05',t:'Measure Everything',b:"I tie every engineering effort to a metric that moves. If it can't be measured, it isn't done."},
    {icon:Shield,  n:'06',t:'Restraint Is Craft', b:'The best systems have less — less coupling, less state, less surface area. Elegance is what you remove, not what you add.'},
  ];
  const process=[
    {n:'01',l:'Discover', d:'User interviews, stakeholder goals, competitive analysis'},
    {n:'02',l:'Define',   d:'Problem statement, constraints, success metrics'},
    {n:'03',l:'Design',   d:'Architecture, API contracts, component breakdown'},
    {n:'04',l:'Test',     d:'Unit tests, E2E, usability feedback, edge cases'},
    {n:'05',l:'Ship',     d:'CI/CD deployment, feature flags, rollout strategy'},
    {n:'06',l:'Measure',  d:'Analytics, error monitoring, iteration backlog'},
  ];
  const impactStats=[
    {v:'3',    l:'Internships',      s:'MERN · AI/ML · Data Science', icon:Award},
    {v:'CNN',  l:'Models Deployed',  s:'Real-time inference pipelines',icon:Cpu},
    {v:'OAuth',l:'Secure Auth',      s:'Google + GitHub OAuth in ATS', icon:Shield},
    {v:'<1s',  l:'API Response Time',s:'AI chatbot backend latency',   icon:Zap},
  ];
  const projects=[
    {n:'01',tag:'Enterprise Automation · Final Year Project · 2025',
     title:'Automated Leave Management System',
     stack:['Power Apps','Power Automate','SharePoint','Power BI','Microsoft 365'],
     problem:'HR teams processed 200+ monthly leave requests manually — 3–5 day approval delays, zero audit trail, no employee visibility.',
     approach:'Multi-tier approval workflow via Power Apps + Power Automate. SharePoint as data layer. Role-based dashboards. Automated Teams & Outlook notifications.',
     result:'60–70% approval time reduction. 85–90% cut in manual HR processing. Full audit trail and real-time Power BI analytics.',
     stats:[{v:'60–70%',l:'Approval time cut'},{v:'85–90%',l:'Manual work reduced'},{v:'100+',l:'Users simulated'}],
     github:'https://github.com/bhagavan444'},
    {n:'02',tag:'AI Application · Full-Stack · 2025',
     title:'AI Chatbot Web Application',
     stack:['React.js','Flask','Gemini API','OpenAI API','Python','Async Architecture'],
     problem:'Existing AI chat tools exposed API keys on the client, had no conversation history — unusable for real production.',
     approach:'React + Flask with 100% server-side API handling for Gemini and OpenAI. Multi-turn conversation context per session. Async streaming.',
     result:'Sub-1s average response latency. 100% server-side API key security. Multi-provider fallback with graceful error recovery.',
     stats:[{v:'<1s',l:'Avg API response'},{v:'2',l:'AI providers'},{v:'100%',l:'Key safety'}],
     github:'https://github.com/bhagavan444'},
  ];
  const tradeoffs=[
    {d:'MongoDB over SQL for ATS Resume Builder',r:"Resume data is inherently unstructured. MongoDB's flexible schema meant no migrations every sprint — the right constraint for a moving target."},
    {d:'Flask over FastAPI for ML inference',r:"Team familiarity with Flask and the performance delta didn't justify migration cost. Predictability and faster delivery over marginal speed gains."},
    {d:'TF-IDF over deep NLP for Fake News Detection',r:'TF-IDF + Logistic Regression gave interpretable, accurate results without GPU infrastructure. Deep NLP would have added complexity without meaningful accuracy gain.'},
    {d:'Async requests over WebSockets for AI Chatbot',r:"Single-user sessions didn't warrant stateful WebSocket infrastructure. Polling-style async calls simplified the backend enormously with no UX cost."},
  ];
  const skillGroups=[
    {l:'AI & Machine Learning',sk:['TensorFlow','Keras','Scikit-learn','CNN','NLP / TF-IDF','Supervised Learning','Deep Learning']},
    {l:'Full-Stack Engineering',sk:['React.js','Node.js','Express.js','MongoDB','JavaScript','REST APIs','OAuth']},
    {l:'Backend & Integration', sk:['Flask','Python','PDF Parsing','API Integration','Async Architecture','SQL']},
    {l:'Foundations & Tools',   sk:['Java','C','Git','GitHub','Postman','OOP','DSA','JDBC']},
  ];
  const achievements=[
    {y:'2025',t:'MERN Stack Internship',        i:'StudyOwl Education Pvt Ltd · May–July 2025'},
    {y:'2025',t:'AI/ML Internship — Smart Sorting',i:'SmartBridge (Remote) · May–June 2025'},
    {y:'2024',t:'ML & Data Science Internship',  i:'Blackbucks (Remote) · May–June 2024'},
    {y:'2025',t:'24-Hour Hackathon Finalist',     i:'Brainovision × Ramachandra College of Engineering'},
    {y:'2025',t:'Google Generative AI (Gemini)',  i:'Google · Generative AI Fundamentals'},
    {y:'2025',t:'IBM SkillsBuild — AI & LLMs',   i:'IBM · AI Fundamentals + LLM Certificate'},
    {y:'2025',t:'AWS & Azure Cloud Basics',       i:'Simplilearn · ML with Python + AWS Basics'},
    {y:'2025',t:'Full Stack Dev — Infosys',       i:'Infosys Springboard · Python & Java Full Stack'},
  ];
  const testimonials=[
    {q:"Bhagavan led backend architecture during our 24-hour hackathon. He handled MongoDB integration and REST API setup under real time pressure and ensured deployment worked before submission.",nm:'M Dhana Pujitha',r:'Team Lead, 24hr Hackathon · Ramachandra College × Brainovision'},
    {q:"During his AI/ML internship, Bhagavan quickly grasped TensorFlow CNN workflows and independently implemented model evaluation pipelines in Flask. Strong self-directed learning mindset.",nm:'Internship Mentor',r:'SmartBridge (Remote) — AI/ML Intern, Smart Sorting Project'},
    {q:"He consistently takes ownership beyond assigned tasks — particularly the OAuth integration and PDF parsing for the ATS Resume Builder. Shows strong initiative and product ownership.",nm:'Project Guide',r:'Faculty Advisor · B.Tech AIDS, Ramachandra College of Engineering'},
  ];
  const techStack=['React.js','Node.js','Express.js','MongoDB','JavaScript','Python','TensorFlow','Keras','Flask','Scikit-learn','Git','REST APIs','Postman','Java','SQL','OAuth'];

  const W={maxWidth:'1120px',margin:'0 auto',padding:'0 2rem'};
  const SH=({label,title})=>(
    <div className="reveal" style={{marginBottom:'3.5rem'}}>
      <div className="mono" style={{fontSize:'0.65rem',letterSpacing:'0.16em',textTransform:'uppercase',color:T.muted,marginBottom:'1.2rem'}}>{label}</div>
      <h2 className="serif" style={{fontSize:'clamp(2rem,3.8vw,2.8rem)',fontWeight:300,color:T.ink,
        letterSpacing:'-0.03em',lineHeight:1.1,maxWidth:'480px'}}
        dangerouslySetInnerHTML={{__html:title}}/>
    </div>
  );

  return <>
  <style>{CSS}</style>
  <SBar/>

  {/* NAVBAR */}
  <nav style={{position:'fixed',top:0,left:0,right:0,zIndex:1000,height:'62px',padding:'0 2rem',
    display:'flex',alignItems:'center',justifyContent:'space-between',
    background:scrolled?'rgba(249,249,248,0.93)':'transparent',
    backdropFilter:scrolled?'blur(20px) saturate(180%)':'none',
    WebkitBackdropFilter:scrolled?'blur(20px) saturate(180%)':'none',
    borderBottom:scrolled?`1px solid ${T.border}`:'1px solid transparent',
    transition:'all 0.3s ease'}}>
    <div className="serif" style={{fontSize:'1.1rem',fontWeight:400,color:T.ink,letterSpacing:'-0.02em'}}>
      Bhagavan<span style={{color:T.accent,fontStyle:'italic'}}>.</span>
    </div>
    <div className="nl" style={{display:'flex',gap:'2.25rem'}}>
      {[['About','#about'],['Work','#work'],['Skills','#skills'],['Contact','#contact']].map(([l,h])=>(
        <a key={l} href={h} className="nav-a">{l}</a>
      ))}
    </div>
    <div style={{display:'flex',alignItems:'center',gap:'0.9rem'}}>
      <div style={{display:'flex',alignItems:'center',gap:'0.4rem'}}>
        <span style={{width:'6px',height:'6px',borderRadius:'50%',background:T.green,display:'inline-block',animation:'pulseDot 2s ease infinite'}}/>
        <span className="mono" style={{fontSize:'0.67rem',color:T.green,fontWeight:500,letterSpacing:'0.04em'}}>Available</span>
      </div>
      <Btn href={resumePdf} download><Download size={13} strokeWidth={1.8}/> Resume</Btn>
    </div>
  </nav>

  <main>
  {/* ═══ HERO ═══ */}
  <section id="about" style={{minHeight:'100vh',display:'flex',alignItems:'center',paddingTop:'62px',
    background:T.bg,position:'relative',overflow:'hidden'}}>
    {/* Animated grid */}
    <div style={{position:'absolute',inset:0,pointerEvents:'none',zIndex:0,
      backgroundImage:`linear-gradient(rgba(0,0,0,0.028) 1px,transparent 1px),linear-gradient(90deg,rgba(0,0,0,0.028) 1px,transparent 1px)`,
      backgroundSize:'64px 64px',animation:'gridPulse 8s ease-in-out infinite',
      maskImage:'radial-gradient(ellipse 80% 70% at 50% 50%,black,transparent)',
      WebkitMaskImage:'radial-gradient(ellipse 80% 70% at 50% 50%,black,transparent)'}}/>
    {/* Orbit decorations */}
    <Orbit size={190} ca="rgba(29,78,216,0.045)" cd="rgba(29,78,216,0.22)" spd={20}
      style={{position:'absolute',top:'8%',right:'2%',zIndex:0,pointerEvents:'none'}}/>
    <Orbit size={90} ca="rgba(21,128,61,0.06)" cd="rgba(21,128,61,0.28)" spd={14}
      style={{position:'absolute',bottom:'12%',left:'1%',zIndex:0,pointerEvents:'none'}}/>
    {/* Floating dots */}
    {[[{t:'28%',r:'24%',c:T.accent,d:'5s'},{t:'62%',r:'14%',c:T.green,d:'7s'},{t:'18%',l:'28%',c:'#6366f1',d:'6s'}]].flat().map((p,i)=>(
      <div key={i} style={{position:'absolute',top:p.t,right:p.r,left:p.l,width:'5px',height:'5px',
        borderRadius:'50%',background:p.c,opacity:0.22,animation:`floatY ${p.d} ease-in-out infinite`,zIndex:0,pointerEvents:'none'}}/>
    ))}

    <div style={{...W,padding:'4rem 2rem 5.5rem',width:'100%',position:'relative',zIndex:1}}>
      <div className="hg" style={{display:'grid',gridTemplateColumns:'1fr 310px',gap:'5rem',alignItems:'center'}}>
        {/* LEFT */}
        <div>
          <div style={{marginBottom:'2rem',animation:'fadeUp 0.5s cubic-bezier(0.16,1,0.3,1) 0.05s both'}}>
            <span style={{display:'inline-flex',alignItems:'center',gap:'0.5rem',padding:'0.32rem 0.8rem',
              borderRadius:'6px',background:T.greenL,border:`1px solid rgba(21,128,61,0.2)`,
              fontSize:'0.73rem',fontWeight:500,color:T.green}}>
              <span style={{width:'5px',height:'5px',borderRadius:'50%',background:T.green,display:'inline-block',animation:'pulseDot 2s ease infinite'}}/>
              Open to full-time roles · 2026 Graduate · Andhra Pradesh / Remote
            </span>
          </div>
          <h1 className="serif" style={{fontSize:'clamp(2.8rem,5.5vw,4.6rem)',fontWeight:300,color:T.ink,
            lineHeight:1.07,letterSpacing:'-0.03em',marginBottom:'0.35rem',
            animation:'fadeUp 0.6s cubic-bezier(0.16,1,0.3,1) 0.1s both'}}>
            Building deployable
          </h1>
          <h1 className="serif" style={{fontSize:'clamp(2.8rem,5.5vw,4.6rem)',fontWeight:600,color:T.accent,
            lineHeight:1.07,letterSpacing:'-0.03em',fontStyle:'italic',marginBottom:'2rem',
            animation:'fadeUp 0.6s cubic-bezier(0.16,1,0.3,1) 0.18s both'}}>
            AI-powered systems.
          </h1>
          <div style={{marginBottom:'1.6rem',fontSize:'1rem',color:T.muted2,
            animation:'fadeUp 0.6s cubic-bezier(0.16,1,0.3,1) 0.26s both'}}>
            <Typewriter roles={['Full-Stack Engineer','AI/ML Developer','Python Engineer','MERN Stack Developer','Deep Learning Practitioner']}/>
          </div>
          <p style={{fontSize:'1rem',lineHeight:1.82,color:T.muted2,maxWidth:'500px',marginBottom:'2.25rem',fontWeight:400,
            animation:'fadeUp 0.6s cubic-bezier(0.16,1,0.3,1) 0.34s both'}}>
            Entry-level Software / AI Engineer with hands-on experience in Python, MERN stack, and deep learning. 3 internships. 4+ projects shipped. Focused on building systems that are deployable, maintainable, and genuinely useful.
          </p>
          <div className="ctab" style={{display:'flex',gap:'0.7rem',marginBottom:'2.8rem',flexWrap:'wrap',alignItems:'center',
            animation:'fadeUp 0.6s cubic-bezier(0.16,1,0.3,1) 0.42s both'}}>
            <Btn primary href="mailto:g.sivasatyasaibhagavan@gmail.com">Get in touch <ArrowRight size={14} strokeWidth={1.8}/></Btn>
            <Btn onClick={()=>navigate('/projects')}>View work</Btn>
            <Btn href={resumePdf} download><Download size={13} strokeWidth={1.8}/> Resume</Btn>
          </div>
          <div style={{display:'flex',gap:'2rem',paddingTop:'1.75rem',borderTop:`1px solid ${T.border}`,flexWrap:'wrap',
            animation:'fadeUp 0.6s cubic-bezier(0.16,1,0.3,1) 0.5s both'}}>
            {['B.Tech AIDS · 2026 · 75%','3 Internships','CNN · NLP · MERN · Flask'].map((x,i)=>(
              <span key={i} className="mono" style={{fontSize:'0.68rem',color:T.muted,letterSpacing:'0.05em'}}>{x}</span>
            ))}
          </div>
        </div>
        {/* RIGHT — portrait */}
        <div className="hp" style={{animation:'fadeIn 0.7s ease 0.3s both'}}>
          <div style={{borderRadius:'14px',overflow:'hidden',border:`1px solid ${T.border2}`,
            boxShadow:'0 2px 4px rgba(0,0,0,0.05),0 12px 40px rgba(0,0,0,0.08)',position:'relative',
            transition:'transform 0.3s ease,box-shadow 0.3s ease'}}
            onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-5px)';e.currentTarget.style.boxShadow='0 20px 60px rgba(0,0,0,0.12)';}}
            onMouseLeave={e=>{e.currentTarget.style.transform='translateY(0)';e.currentTarget.style.boxShadow='0 2px 4px rgba(0,0,0,0.05),0 12px 40px rgba(0,0,0,0.08)';}}>
            <img src={profileImg} alt="Siva Satya Sai Bhagavan"
              style={{width:'100%',display:'block',aspectRatio:'4/5',objectFit:'cover'}}/>
            <div style={{position:'absolute',inset:0,
              background:'linear-gradient(to top,rgba(249,249,248,0.97) 0%,rgba(249,249,248,0.4) 55%,transparent 100%)'}}/>
            <div style={{position:'absolute',bottom:0,left:0,right:0,padding:'1.5rem 1.5rem 1.4rem'}}>
              <div className="serif" style={{fontSize:'1.05rem',color:T.ink,fontWeight:400,marginBottom:'0.15rem'}}>Bhagavan</div>
              <div className="mono" style={{fontSize:'0.62rem',color:T.muted,letterSpacing:'0.08em',marginBottom:'0.9rem'}}>FULL-STACK · AI/ML · PYTHON</div>
              <div style={{display:'flex',gap:'0.5rem'}}>
                {[{icon:Github,href:'https://github.com/bhagavan444'},{icon:Linkedin,href:'https://www.linkedin.com/in/gopalajosyula-siva-satya-sai-bhagavan-1624a027b/'},{icon:Mail,href:'mailto:g.sivasatyasaibhagavan@gmail.com'}].map((s,i)=>(
                  <a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
                    style={{width:'30px',height:'30px',borderRadius:'6px',background:T.white,border:`1px solid ${T.border}`,
                      display:'flex',alignItems:'center',justifyContent:'center',color:T.muted2,textDecoration:'none',transition:'all 0.18s'}}
                    onMouseEnter={e=>{e.currentTarget.style.background=T.accentL;e.currentTarget.style.color=T.accent;}}
                    onMouseLeave={e=>{e.currentTarget.style.background=T.white;e.currentTarget.style.color=T.muted2;}}>
                    <s.icon size={13} strokeWidth={1.8}/>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  {/* ═══ METRICS ═══ */}
  <section ref={mRef} style={{padding:'0',background:T.white,borderTop:`1px solid ${T.border}`,borderBottom:`1px solid ${T.border}`}}>
    <div style={W}>
      <div className="fc" style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)'}}>
        {metrics.map((m,i)=>(
          <div key={i} style={{padding:'2.5rem 2rem',borderRight:i<3?`1px solid ${T.border}`:'none',
            opacity:mIn?1:0,transform:mIn?'none':'translateY(12px)',
            transition:`opacity 0.55s ease ${i*0.09}s,transform 0.55s ease ${i*0.09}s`}}>
            <div className="serif" style={{fontSize:'3rem',color:T.ink,lineHeight:1,marginBottom:'0.6rem',fontWeight:400,letterSpacing:'-0.03em'}}>
              <Counter target={m.v} suffix={m.sx} triggered={mIn}/>
            </div>
            <div style={{fontSize:'0.88rem',fontWeight:600,color:T.ink,marginBottom:'0.25rem'}}>{m.l}</div>
            <div className="mono" style={{fontSize:'0.65rem',color:T.muted,letterSpacing:'0.04em'}}>{m.s}</div>
          </div>
        ))}
      </div>
    </div>
  </section>

  {/* ═══ TECH MARQUEE — dark band ═══ */}
  <div style={{padding:'1.3rem 0',background:T.ink,overflow:'hidden'}}>
    <div className="mq">
      {[...Array(3)].map((_,r)=>techStack.map((t,i)=>(
        <span key={`${r}-${i}`} style={{display:'inline-flex',alignItems:'center',gap:'1.1rem',margin:'0 1.8rem',whiteSpace:'nowrap'}}>
          <span className="mono" style={{fontSize:'0.7rem',color:'rgba(255,255,255,0.42)',letterSpacing:'0.14em',textTransform:'uppercase'}}>{t}</span>
          <span style={{width:'3px',height:'3px',borderRadius:'50%',background:'rgba(255,255,255,0.15)',display:'inline-block'}}/>
        </span>
      )))}
    </div>
  </div>

  {/* ═══ PHILOSOPHY ═══ */}
  <section id="philosophy" style={{padding:'8rem 0',background:T.bg}}>
    <div style={W}>
      <SH label="Design Philosophy" title="How I think about<br/><em style='font-weight:600;color:#1d4ed8'>building software</em>"/>
      <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'1px',
        border:`1px solid ${T.border}`,borderRadius:'12px',overflow:'hidden',background:T.border}}>
        {philosophy.map((p,i)=>(
          <div key={i} className={`reveal d${(i%3)+1}`} style={{padding:'1.9rem',background:T.white,transition:'background 0.2s'}}
            onMouseEnter={e=>e.currentTarget.style.background=T.surface}
            onMouseLeave={e=>e.currentTarget.style.background=T.white}>
            <div style={{display:'flex',alignItems:'center',gap:'0.7rem',marginBottom:'1rem'}}>
              <div style={{width:'32px',height:'32px',borderRadius:'8px',background:T.accentL,
                display:'flex',alignItems:'center',justifyContent:'center'}}>
                <p.icon size={15} style={{color:T.accent}} strokeWidth={1.8}/>
              </div>
              <span className="mono" style={{fontSize:'0.6rem',color:T.muted,letterSpacing:'0.1em'}}>{p.n}</span>
            </div>
            <div style={{fontSize:'0.88rem',fontWeight:600,color:T.ink,marginBottom:'0.7rem'}}>{p.t}</div>
            <p style={{fontSize:'0.79rem',color:T.muted2,lineHeight:1.78}}>{p.b}</p>
          </div>
        ))}
      </div>
    </div>
  </section>

  {/* ═══ PROCESS ═══ */}
  <section id="process" style={{padding:'8rem 0',background:T.white,borderTop:`1px solid ${T.border}`}}>
    <div style={W}>
      <SH label="Process" title="From ambiguity to<br/><em style='font-weight:600;color:#1d4ed8'>shipped product</em>"/>
      <div style={{height:'2px',background:T.border,borderRadius:'2px',marginBottom:'2.5rem',overflow:'hidden',position:'relative'}}>
        <div className="reveal" style={{position:'absolute',inset:0,background:`linear-gradient(90deg,${T.accent},${T.green})`,
          transformOrigin:'left',transform:'scaleX(0)',transition:'transform 1.1s cubic-bezier(0.16,1,0.3,1) 0.3s'}}
          ref={el=>{if(el){const o=new IntersectionObserver(([e])=>{if(e.isIntersecting)el.style.transform='scaleX(1)';},{threshold:0.2});o.observe(el);}}}/>
      </div>
      <div className="pg" style={{display:'grid',gridTemplateColumns:'repeat(6,1fr)',gap:'1.5rem'}}>
        {process.map((s,i)=>(
          <div key={i} className={`reveal d${i+1}`}>
            <div style={{width:'44px',height:'44px',borderRadius:'50%',border:`1px solid ${T.border2}`,
              background:T.white,display:'flex',alignItems:'center',justifyContent:'center',
              marginBottom:'1.1rem',transition:'all 0.22s',cursor:'default'}}
              onMouseEnter={e=>{e.currentTarget.style.borderColor=T.accent;e.currentTarget.style.background=T.accentL;e.currentTarget.style.transform='scale(1.1)';}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor=T.border2;e.currentTarget.style.background=T.white;e.currentTarget.style.transform='scale(1)';}}>
              <span className="mono" style={{fontSize:'0.6rem',fontWeight:500,color:T.accent}}>{s.n}</span>
            </div>
            <div style={{fontSize:'0.88rem',fontWeight:600,color:T.ink,marginBottom:'0.45rem'}}>{s.l}</div>
            <div style={{fontSize:'0.76rem',color:T.muted,lineHeight:1.65}}>{s.d}</div>
          </div>
        ))}
      </div>
    </div>
  </section>

  {/* ═══ IMPACT — DARK ═══ */}
  <section ref={iRef} style={{padding:'8rem 0',background:T.ink,position:'relative',overflow:'hidden'}}>
    {/* Moving headline bg */}
    <div style={{position:'absolute',top:'50%',left:0,right:0,transform:'translateY(-50%)',overflow:'hidden',
      opacity:0.032,pointerEvents:'none',userSelect:'none'}}>
      <div className="mqr">
        {[...Array(4)].map((_,r)=>['IMPACT','RESULTS','SHIPPED','REAL WORK','DEPLOYED','MEASURED'].map((w,i)=>(
          <span key={`${r}-${i}`} className="serif" style={{fontSize:'8rem',fontWeight:700,color:'#fff',
            whiteSpace:'nowrap',margin:'0 3rem',letterSpacing:'-0.04em'}}>{w}</span>
        )))}
      </div>
    </div>
    <div style={{...W,position:'relative',zIndex:1}}>
      <div className="reveal" style={{marginBottom:'3.5rem'}}>
        <div className="mono" style={{fontSize:'0.65rem',letterSpacing:'0.16em',textTransform:'uppercase',color:'rgba(255,255,255,0.28)',marginBottom:'1.2rem'}}>Impact</div>
        <h2 className="serif" style={{fontSize:'clamp(2rem,3.8vw,2.8rem)',fontWeight:300,color:'#fff',
          letterSpacing:'-0.03em',lineHeight:1.1,maxWidth:'440px'}}>
          Real work,<br/><em style={{fontWeight:600,color:T.accent}}>measurable results</em>
        </h2>
      </div>
      <div className="ig" style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'1px',
        border:'1px solid rgba(255,255,255,0.06)',borderRadius:'12px',overflow:'hidden',background:'rgba(255,255,255,0.03)'}}>
        {impactStats.map((s,i)=>(
          <div key={i} style={{padding:'2rem 1.75rem',borderRight:i<3?'1px solid rgba(255,255,255,0.05)':'none',
            background:'rgba(255,255,255,0)',opacity:iIn?1:0,transform:iIn?'none':'translateY(14px)',
            transition:`opacity 0.55s ease ${i*0.1}s,transform 0.55s ease ${i*0.1}s,background 0.2s`}}
            onMouseEnter={e=>e.currentTarget.style.background='rgba(255,255,255,0.04)'}
            onMouseLeave={e=>e.currentTarget.style.background='rgba(255,255,255,0)'}>
            <s.icon size={18} strokeWidth={1.5} style={{color:'rgba(29,78,216,0.65)',marginBottom:'1.1rem',display:'block'}}/>
            <div className="serif" style={{fontSize:'2.2rem',fontWeight:400,color:'#fff',letterSpacing:'-0.03em',marginBottom:'0.5rem'}}>{s.v}</div>
            <div style={{fontSize:'0.85rem',fontWeight:500,color:'rgba(255,255,255,0.78)',marginBottom:'0.3rem'}}>{s.l}</div>
            <div style={{fontSize:'0.72rem',color:'rgba(255,255,255,0.32)',lineHeight:1.6}}>{s.s}</div>
          </div>
        ))}
      </div>
    </div>
  </section>

  {/* ═══ PROJECTS ═══ */}
  <section id="work" style={{padding:'8rem 0',background:T.bg,borderTop:`1px solid ${T.border}`}}>
    <div style={W}>
      <div style={{display:'flex',alignItems:'flex-end',justifyContent:'space-between',marginBottom:'3.5rem',flexWrap:'wrap',gap:'1rem'}}>
        <SH label="Selected Work" title="Projects built for<br/><em style='font-weight:600;color:#1d4ed8'>real problems</em>"/>
        <div className="reveal" style={{display:'flex',gap:'0.6rem',marginBottom:'3.5rem'}}>
          <Btn onClick={()=>navigate('/projects')}>All projects <ArrowRight size={13} strokeWidth={1.8}/></Btn>
          <Btn href="https://github.com/bhagavan444">GitHub <ArrowUpRight size={13} strokeWidth={1.8}/></Btn>
        </div>
      </div>
      {projects.map((p,pi)=>(
        <div key={pi} className={`reveal d${pi+1}`} style={{background:T.white,border:`1px solid ${T.border2}`,
          borderRadius:'12px',overflow:'hidden',marginBottom:'1.5rem',
          transition:'border-color 0.2s,box-shadow 0.25s'}}
          onMouseEnter={e=>{e.currentTarget.style.borderColor='rgba(0,0,0,0.16)';e.currentTarget.style.boxShadow='0 8px 40px rgba(0,0,0,0.07)';}}
          onMouseLeave={e=>{e.currentTarget.style.borderColor=T.border2;e.currentTarget.style.boxShadow='none';}}>
          <div style={{padding:'1.4rem 2rem',borderBottom:`1px solid ${T.border}`,background:T.surface,
            display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:'0.9rem'}}>
            <div style={{display:'flex',alignItems:'center',gap:'1.1rem'}}>
              <span className="mono" style={{fontSize:'0.62rem',color:T.muted,letterSpacing:'0.1em'}}>{p.n}</span>
              <div>
                <div className="mono" style={{fontSize:'0.62rem',color:T.muted,letterSpacing:'0.08em',marginBottom:'0.2rem'}}>{p.tag}</div>
                <div style={{fontSize:'1rem',fontWeight:600,color:T.ink}}>{p.title}</div>
              </div>
            </div>
            <div style={{display:'flex',flexWrap:'wrap',gap:'0.4rem'}}>
              {p.stack.map((t,j)=>(
                <span key={j} className="mono" style={{fontSize:'0.62rem',color:T.muted,padding:'0.18rem 0.55rem',
                  borderRadius:'4px',border:`1px solid ${T.border}`,background:T.white}}>{t}</span>
              ))}
            </div>
          </div>
          <div className="pb" style={{display:'grid',gridTemplateColumns:'1fr 240px'}}>
            <div style={{padding:'2rem',borderRight:`1px solid ${T.border}`}}>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:'0'}}>
                {[{label:'Problem',text:p.problem},{label:'Approach',text:p.approach},{label:'Result',text:p.result}].map((s,j)=>(
                  <div key={j} style={{paddingLeft:j>0?'1.25rem':0,borderLeft:j>0?`1px solid ${T.border}`:'none'}}>
                    <span className="mono" style={{fontSize:'0.6rem',letterSpacing:'0.12em',color:T.muted,display:'block',marginBottom:'0.65rem'}}>{s.label}</span>
                    <p style={{fontSize:'0.79rem',color:T.muted2,lineHeight:1.78}}>{s.text}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="ps" style={{padding:'2rem',display:'flex',flexDirection:'column',justifyContent:'space-between',borderLeft:`1px solid ${T.border}`}}>
              <div>
                {p.stats.map((s,j)=>(
                  <div key={j} style={{paddingBottom:j<p.stats.length-1?'1rem':0,marginBottom:j<p.stats.length-1?'1rem':0,
                    borderBottom:j<p.stats.length-1?`1px solid ${T.border}`:'none'}}>
                    <div className="serif" style={{fontSize:'1.7rem',color:T.ink,fontWeight:400,lineHeight:1,marginBottom:'0.25rem'}}>{s.v}</div>
                    <div style={{fontSize:'0.74rem',color:T.muted}}>{s.l}</div>
                  </div>
                ))}
              </div>
              <div style={{display:'flex',flexDirection:'column',gap:'0.45rem',marginTop:'1.4rem'}}>
                <Btn primary href={p.github} style={{justifyContent:'center',fontSize:'0.8rem'}}>GitHub <ArrowUpRight size={12} strokeWidth={1.8}/></Btn>
                <Btn onClick={()=>navigate('/projects')} style={{justifyContent:'center',fontSize:'0.8rem'}}>Case study</Btn>
              </div>
            </div>
          </div>
        </div>
      ))}
      <div className="reveal" style={{padding:'1.25rem 1.5rem',border:`1px solid ${T.border}`,borderRadius:'8px',background:T.white,
        display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:'1rem'}}>
        <div>
          <span style={{fontSize:'0.875rem',fontWeight:500,color:T.ink}}>More projects on GitHub</span>
          <span className="mono" style={{fontSize:'0.65rem',color:T.muted,display:'block',marginTop:'0.2rem',letterSpacing:'0.04em'}}>
            ATS Resume Builder · Fake News Detector · Career Recommender · CNN Plant Classifier
          </span>
        </div>
        <Btn href="https://github.com/bhagavan444">github.com/bhagavan444 <ArrowUpRight size={13} strokeWidth={1.8}/></Btn>
      </div>
    </div>
  </section>

  {/* ═══ TRADE-OFFS ═══ */}
  <section style={{padding:'8rem 0',background:T.white,borderTop:`1px solid ${T.border}`}}>
    <div style={W}>
      <SH label="Engineering Maturity" title="Trade-offs I've made<br/><em style='font-weight:600;color:#1d4ed8'>consciously</em>"/>
      <div className="tg" style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:'1px',
        border:`1px solid ${T.border}`,borderRadius:'12px',overflow:'hidden',background:T.border}}>
        {tradeoffs.map((t,i)=>(
          <div key={i} className={`reveal d${(i%2)+1}`} style={{padding:'2rem',background:T.bg,transition:'background 0.2s'}}
            onMouseEnter={e=>e.currentTarget.style.background=T.surface}
            onMouseLeave={e=>e.currentTarget.style.background=T.bg}>
            <div style={{display:'flex',gap:'0.7rem',marginBottom:'0.9rem',alignItems:'flex-start'}}>
              <div style={{width:'4px',height:'4px',borderRadius:'50%',background:T.accent,flexShrink:0,marginTop:'8px'}}/>
              <div style={{fontSize:'0.88rem',fontWeight:600,color:T.ink,lineHeight:1.42}}>{t.d}</div>
            </div>
            <p style={{fontSize:'0.79rem',color:T.muted2,lineHeight:1.8,paddingLeft:'0.85rem'}}>{t.r}</p>
          </div>
        ))}
      </div>
    </div>
  </section>

  {/* ═══ SKILLS ═══ */}
  <section id="skills" style={{padding:'8rem 0',background:T.bg,borderTop:`1px solid ${T.border}`}}>
    <div style={W}>
      <SH label="Expertise" title="Skills &amp;<br/><em style='font-weight:600;color:#1d4ed8'>competencies</em>"/>
      <div className="sg" style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'1px',
        border:`1px solid ${T.border}`,borderRadius:'12px',overflow:'hidden',background:T.border}}>
        {skillGroups.map((g,i)=>(
          <div key={i} className={`reveal d${i+1}`} style={{padding:'1.9rem',background:T.white,transition:'background 0.2s'}}
            onMouseEnter={e=>e.currentTarget.style.background=T.surface}
            onMouseLeave={e=>e.currentTarget.style.background=T.white}>
            <div style={{fontSize:'0.82rem',fontWeight:600,color:T.ink,marginBottom:'1.1rem',paddingBottom:'0.85rem',borderBottom:`1px solid ${T.border}`}}>{g.l}</div>
            <div style={{display:'flex',flexDirection:'column',gap:'0.55rem'}}>
              {g.sk.map((sk,j)=>(
                <span key={j} style={{fontSize:'0.78rem',color:T.muted2,display:'flex',alignItems:'center',gap:'0.5rem'}}>
                  <span style={{width:'3px',height:'3px',borderRadius:'50%',background:T.border2,display:'inline-block',flexShrink:0}}/>
                  {sk}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>

  {/* ═══ ACHIEVEMENTS ═══ */}
  <section id="achievements" style={{padding:'8rem 0',background:T.white,borderTop:`1px solid ${T.border}`}}>
    <div style={W}>
      <SH label="Credentials" title="Internships, awards<br/><em style='font-weight:600;color:#1d4ed8'>&amp; certifications</em>"/>
      <div style={{border:`1px solid ${T.border}`,borderRadius:'12px',overflow:'hidden'}}>
        {achievements.map((a,i)=>(
          <div key={i} className={`reveal d${Math.min(i+1,6)}`} style={{padding:'1rem 1.5rem',
            borderBottom:i<achievements.length-1?`1px solid ${T.border}`:'none',
            display:'flex',alignItems:'center',justifyContent:'space-between',gap:'1.2rem',
            background:T.white,transition:'background 0.18s'}}
            onMouseEnter={e=>e.currentTarget.style.background=T.surface}
            onMouseLeave={e=>e.currentTarget.style.background=T.white}>
            <div style={{display:'flex',alignItems:'center',gap:'1.2rem',flex:1,minWidth:0}}>
              <span className="mono" style={{fontSize:'0.62rem',color:T.muted,letterSpacing:'0.06em',flexShrink:0}}>{a.y}</span>
              <div>
                <div style={{fontSize:'0.875rem',fontWeight:500,color:T.ink,marginBottom:'0.12rem'}}>{a.t}</div>
                <div className="mono" style={{fontSize:'0.64rem',color:T.muted,letterSpacing:'0.03em'}}>{a.i}</div>
              </div>
            </div>
            <div style={{padding:'0.18rem 0.6rem',borderRadius:'4px',border:`1px solid ${T.accentL}`,background:T.accentL,flexShrink:0}}>
              <span className="mono" style={{fontSize:'0.58rem',color:T.accent,fontWeight:500,letterSpacing:'0.1em'}}>VERIFIED</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>

  {/* ═══ TESTIMONIALS ═══ */}
  <section style={{padding:'8rem 0',background:T.surface,borderTop:`1px solid ${T.border}`}}>
    <div style={{...W,textAlign:'center'}}>
      <div style={{maxWidth:'660px',margin:'0 auto'}}>
        <div className="mono reveal" style={{fontSize:'0.65rem',letterSpacing:'0.16em',textTransform:'uppercase',color:T.muted,marginBottom:'3rem'}}>Social Proof</div>
        <div style={{position:'relative',minHeight:'190px',marginBottom:'2.5rem'}}>
          {testimonials.map((t,i)=>(
            <div key={i} style={{position:i===tIdx?'relative':'absolute',top:0,left:0,right:0,
              opacity:i===tIdx?1:0,transform:i===tIdx?'none':'translateY(8px)',
              visibility:i===tIdx?'visible':'hidden',transition:'opacity 0.45s ease,transform 0.45s ease'}}>
              <blockquote className="serif" style={{fontSize:'clamp(1.1rem,2.2vw,1.42rem)',fontStyle:'italic',
                color:T.ink,lineHeight:1.65,letterSpacing:'-0.02em',marginBottom:'1.8rem',fontWeight:300}}>
                "{t.q}"
              </blockquote>
              <div style={{fontSize:'0.88rem',fontWeight:600,color:T.ink,marginBottom:'0.2rem'}}>{t.nm}</div>
              <div className="mono" style={{fontSize:'0.65rem',color:T.muted,letterSpacing:'0.04em'}}>{t.r}</div>
            </div>
          ))}
        </div>
        <div style={{display:'flex',alignItems:'center',justifyContent:'center',gap:'0.9rem'}}>
          <button onClick={()=>sti(p=>(p-1+testimonials.length)%testimonials.length)}
            style={{width:'30px',height:'30px',borderRadius:'6px',border:`1px solid ${T.border2}`,
              background:T.white,cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',
              color:T.muted,transition:'all 0.18s'}}
            onMouseEnter={e=>{e.currentTarget.style.borderColor=T.ink;e.currentTarget.style.color=T.ink;}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor=T.border2;e.currentTarget.style.color=T.muted;}}>
            <ChevronLeft size={14} strokeWidth={1.8}/>
          </button>
          <div style={{display:'flex',gap:'0.45rem'}}>
            {testimonials.map((_,i)=>(
              <button key={i} onClick={()=>sti(i)}
                style={{width:i===tIdx?'20px':'6px',height:'6px',borderRadius:'3px',border:'none',
                  cursor:'pointer',background:i===tIdx?T.accent:T.border2,transition:'all 0.25s'}}/>
            ))}
          </div>
          <button onClick={()=>sti(p=>(p+1)%testimonials.length)}
            style={{width:'30px',height:'30px',borderRadius:'6px',border:`1px solid ${T.border2}`,
              background:T.white,cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',
              color:T.muted,transition:'all 0.18s'}}
            onMouseEnter={e=>{e.currentTarget.style.borderColor=T.ink;e.currentTarget.style.color=T.ink;}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor=T.border2;e.currentTarget.style.color=T.muted;}}>
            <ChevronRight size={14} strokeWidth={1.8}/>
          </button>
        </div>
      </div>
    </div>
  </section>

  {/* ═══ CTA ═══ */}
  <section id="contact" style={{padding:'8rem 0',background:T.bg,borderTop:`1px solid ${T.border}`}}>
    <div style={W}>
      <div className="cp reveal" style={{background:T.ink,borderRadius:'14px',padding:'5rem 4rem',
        position:'relative',overflow:'hidden'}}>
        <Orbit size={170} ca="rgba(29,78,216,0.09)" cd="rgba(29,78,216,0.38)" spd={22}
          style={{position:'absolute',right:'-1.5rem',top:'-1.5rem',pointerEvents:'none',opacity:0.8}}/>
        <Orbit size={80} ca="rgba(21,128,61,0.09)" cd="rgba(21,128,61,0.32)" spd={15}
          style={{position:'absolute',right:'20%',bottom:'-0.5rem',pointerEvents:'none',opacity:0.55}}/>
        <div style={{position:'absolute',top:'35%',right:'8%',width:'5px',height:'5px',borderRadius:'50%',
          background:'rgba(255,255,255,0.15)',animation:'floatY 5s ease-in-out infinite'}}/>
        <div style={{position:'relative',zIndex:1,maxWidth:'580px'}}>
          <div className="mono" style={{fontSize:'0.65rem',letterSpacing:'0.16em',textTransform:'uppercase',
            color:'rgba(255,255,255,0.28)',marginBottom:'1.75rem'}}>Let's build something real</div>
          <h2 className="serif" style={{fontSize:'clamp(2.4rem,4.5vw,3.6rem)',fontWeight:300,color:'#fff',
            lineHeight:1.06,letterSpacing:'-0.03em',marginBottom:'1.4rem'}}>
            Ready to contribute<br/>
            <em style={{fontWeight:600,color:T.accent}}>from day one.</em>
          </h2>
          <p style={{fontSize:'0.95rem',color:'rgba(255,255,255,0.48)',lineHeight:1.82,marginBottom:'2.5rem',maxWidth:'440px'}}>
            Seeking full-time junior engineering roles to apply MERN, Python, and AI/ML skills to real products. 3 internships, strong CS fundamentals, genuine curiosity.
          </p>
          <div style={{display:'flex',gap:'0.75rem',flexWrap:'wrap',marginBottom:'2.5rem'}}>
            <Btn primary href="mailto:g.sivasatyasaibhagavan@gmail.com">Schedule interview <ArrowRight size={14} strokeWidth={1.8}/></Btn>
            <Btn onClick={()=>navigate('/projects')}
              style={{borderColor:'rgba(255,255,255,0.15)',color:'rgba(255,255,255,0.62)',background:'transparent'}}>
              View projects
            </Btn>
          </div>
          <div style={{display:'flex',gap:'2rem',flexWrap:'wrap',paddingTop:'1.75rem',borderTop:'1px solid rgba(255,255,255,0.08)'}}>
            {[{icon:Mail,href:'mailto:g.sivasatyasaibhagavan@gmail.com',l:'g.sivasatyasaibhagavan@gmail.com'},
              {icon:Phone,href:'tel:+917569205626',l:'+91 7569205626'}].map((c,i)=>(
              <a key={i} href={c.href} style={{display:'flex',alignItems:'center',gap:'0.5rem',
                color:'rgba(255,255,255,0.36)',textDecoration:'none',fontSize:'0.82rem',transition:'color 0.18s'}}
                onMouseEnter={e=>e.currentTarget.style.color='#fff'}
                onMouseLeave={e=>e.currentTarget.style.color='rgba(255,255,255,0.36)'}>
                <c.icon size={13} strokeWidth={1.8} style={{color:T.accent}}/>{c.l}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>

  {/* ═══ FOOTER ═══ */}
  <footer style={{background:T.ink,borderTop:'1px solid rgba(255,255,255,0.05)',overflow:'hidden'}}>
    {/* Moving text band */}
    <div style={{borderBottom:'1px solid rgba(255,255,255,0.05)',padding:'1.2rem 0',overflow:'hidden'}}>
      <div className="mqr" style={{opacity:0.22}}>
        {[...Array(3)].map((_,r)=>['Full-Stack Engineering','AI/ML Development','Product Thinking','System Design','Python & MERN','Flask & TensorFlow','API Design','MongoDB','CNN & NLP'].map((t,i)=>(
          <span key={`${r}-${i}`} className="mono" style={{display:'inline-block',margin:'0 2.5rem',
            fontSize:'0.68rem',color:'#fff',letterSpacing:'0.16em',textTransform:'uppercase',whiteSpace:'nowrap'}}>
            {t}<span style={{color:T.accent,margin:'0 1rem'}}>·</span>
          </span>
        )))}
      </div>
    </div>

    <div style={{...W,padding:'0 2rem'}}>
      <div className="fco" style={{display:'grid',gridTemplateColumns:'2fr 1fr 1fr 1.2fr',gap:'4rem 3.5rem',padding:'4rem 0 3rem'}}>
        <div>
          <div className="serif" style={{fontSize:'1.15rem',color:'#fff',fontWeight:400,letterSpacing:'-0.02em',marginBottom:'1rem'}}>
            Bhagavan<span style={{color:T.accent,fontStyle:'italic'}}>.</span>
          </div>
          <p style={{fontSize:'0.8rem',color:'rgba(255,255,255,0.3)',lineHeight:1.82,maxWidth:'240px',marginBottom:'1.5rem'}}>
            B.Tech AIDS · Ramachandra College of Engineering, Eluru · Class of 2026.
          </p>
          <div style={{display:'flex',gap:'0.5rem'}}>
            {[{icon:Github,href:'https://github.com/bhagavan444'},{icon:Linkedin,href:'https://www.linkedin.com/in/gopalajosyula-siva-satya-sai-bhagavan-1624a027b/'},{icon:Mail,href:'mailto:g.sivasatyasaibhagavan@gmail.com'}].map((s,i)=>(
              <a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
                style={{width:'34px',height:'34px',borderRadius:'7px',border:'1px solid rgba(255,255,255,0.08)',
                  background:'rgba(255,255,255,0.04)',display:'flex',alignItems:'center',justifyContent:'center',
                  color:'rgba(255,255,255,0.36)',textDecoration:'none',transition:'all 0.18s'}}
                onMouseEnter={e=>{e.currentTarget.style.background='rgba(255,255,255,0.1)';e.currentTarget.style.color='#fff';}}
                onMouseLeave={e=>{e.currentTarget.style.background='rgba(255,255,255,0.04)';e.currentTarget.style.color='rgba(255,255,255,0.36)';}}>
                <s.icon size={14} strokeWidth={1.8}/>
              </a>
            ))}
          </div>
        </div>
        <div>
          <div className="mono" style={{fontSize:'0.6rem',letterSpacing:'0.16em',color:'rgba(255,255,255,0.18)',textTransform:'uppercase',marginBottom:'1.25rem'}}>Navigate</div>
          <div style={{display:'flex',flexDirection:'column',gap:'0.75rem'}}>
            {[['About','#about'],['Work','#work'],['Skills','#skills'],['Contact','#contact'],['Achievements','#achievements']].map(([l,h])=>(
              <a key={l} href={h} className="fl">{l}</a>
            ))}
          </div>
        </div>
        <div>
          <div className="mono" style={{fontSize:'0.6rem',letterSpacing:'0.16em',color:'rgba(255,255,255,0.18)',textTransform:'uppercase',marginBottom:'1.25rem'}}>Work</div>
          <div style={{display:'flex',flexDirection:'column',gap:'0.75rem'}}>
            {[{l:'All Projects',h:'/projects'},{l:'GitHub',h:'https://github.com/bhagavan444',ext:true},{l:'Resume / CV',h:resumePdf,dl:true},{l:'Certifications',h:'#achievements'}].map(x=>(
              <a key={x.l} href={x.h} className="fl" download={x.dl||undefined}
                target={x.ext?'_blank':undefined} rel={x.ext?'noopener noreferrer':undefined}
                style={{display:'inline-flex',alignItems:'center',gap:'0.3rem',textDecoration:'none',color:'rgba(255,255,255,0.4)',fontSize:'0.82rem',transition:'color 0.18s'}}
                onMouseEnter={e=>e.currentTarget.style.color='#fff'} onMouseLeave={e=>e.currentTarget.style.color='rgba(255,255,255,0.4)'}>
                {x.l}{x.ext&&<ArrowUpRight size={10} strokeWidth={1.8}/>}
              </a>
            ))}
          </div>
        </div>
        <div>
          <div className="mono" style={{fontSize:'0.6rem',letterSpacing:'0.16em',color:'rgba(255,255,255,0.18)',textTransform:'uppercase',marginBottom:'1.25rem'}}>Contact</div>
          <div style={{display:'flex',flexDirection:'column',gap:'1rem'}}>
            {[{icon:Mail,label:'Email',value:'g.sivasatyasaibhagavan@gmail.com',href:'mailto:g.sivasatyasaibhagavan@gmail.com'},
              {icon:Phone,label:'Phone',value:'+91 7569205626',href:'tel:+917569205626'},
              {icon:MapPin,label:'Location',value:'Andhra Pradesh · Remote',href:'#'}].map(c=>(
              <a key={c.label} href={c.href} style={{textDecoration:'none',display:'flex',alignItems:'flex-start',gap:'0.55rem',transition:'opacity 0.18s'}}
                onMouseEnter={e=>e.currentTarget.style.opacity='0.72'} onMouseLeave={e=>e.currentTarget.style.opacity='1'}>
                <c.icon size={11} strokeWidth={1.8} style={{color:T.accent,marginTop:'3px',flexShrink:0}}/>
                <div>
                  <div className="mono" style={{fontSize:'0.57rem',color:'rgba(255,255,255,0.18)',letterSpacing:'0.1em',textTransform:'uppercase',marginBottom:'0.15rem'}}>{c.label}</div>
                  <div style={{fontSize:'0.76rem',color:'rgba(255,255,255,0.4)',wordBreak:'break-word'}}>{c.value}</div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="fb" style={{borderTop:'1px solid rgba(255,255,255,0.06)',padding:'1.75rem 0',
        display:'flex',alignItems:'center',justifyContent:'space-between',gap:'1rem'}}>
        <span className="mono" style={{fontSize:'0.65rem',color:'rgba(255,255,255,0.17)',letterSpacing:'0.04em'}}>
          © 2026 Siva Satya Sai Bhagavan Gopalajosyula
        </span>
        <div style={{display:'flex',alignItems:'center',gap:'0.45rem'}}>
          <span style={{width:'5px',height:'5px',borderRadius:'50%',background:T.green,display:'inline-block',animation:'pulseDot 2s ease infinite'}}/>
          <span className="mono" style={{fontSize:'0.65rem',color:T.green,letterSpacing:'0.06em'}}>Available for hire · 2026</span>
        </div>
      </div>
    </div>
  </footer>
  </main>
  </>;
}