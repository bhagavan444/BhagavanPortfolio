import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ExternalLink, Github, ArrowRight, Sparkles, TrendingUp,
  Zap, Server, Code2, Target, AlertCircle, Eye, Move
} from 'lucide-react';
import resumeImg from "../assets/resume.jpg";
import chatImg from "../assets/chat.jpeg";
import carrerImg from "../assets/carrer.jpg";
import fakeImg from "../assets/fake.jpg";
import heartImg from "../assets/heart.jpg";

/* ═══════════════════════════════════════════════════════
   TOKENS
═══════════════════════════════════════════════════════ */
const T = {
  bg:           '#080808',
  surface:      '#0F0F0F',
  surfaceEl:    '#141414',
  surfaceHov:   '#1A1A1A',
  textPri:      '#FFFFFF',
  textSec:      'rgba(255,255,255,0.62)',
  textMuted:    'rgba(255,255,255,0.36)',
  borderSoft:   'rgba(255,255,255,0.07)',
  borderStrong: 'rgba(255,255,255,0.14)',
  borderHov:    'rgba(255,255,255,0.24)',
  accent:       '#FFFFFF',
  fontScript:   "'Dancing Script', cursive",
  fontMono:     "'JetBrains Mono', monospace",
  fontBody:     "'Plus Jakarta Sans', sans-serif",
  ease:         'cubic-bezier(0.16,1,0.3,1)',
};

/* ═══════════════════════════════════════════════════════
   GLOBAL CSS
═══════════════════════════════════════════════════════ */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap');

*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{
  font-family:'Plus Jakarta Sans',sans-serif;
  background:#080808;color:#fff;
  line-height:1.6;-webkit-font-smoothing:antialiased;
  overflow-x:hidden;cursor:none!important
}
*{cursor:none!important}
::selection{background:rgba(255,255,255,0.13);color:#fff}
::-webkit-scrollbar{width:5px}
::-webkit-scrollbar-track{background:#080808}
::-webkit-scrollbar-thumb{background:rgba(255,255,255,0.16);border-radius:3px}
::-webkit-scrollbar-thumb:hover{background:rgba(255,255,255,0.3)}

@keyframes __blink{0%,100%{opacity:1}50%{opacity:0}}
@keyframes __floatY{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
@keyframes __halo{0%,100%{opacity:0.03;transform:scale(1)}50%{opacity:0.07;transform:scale(1.07)}}
@keyframes __glowBorder{0%,100%{box-shadow:0 0 0 1px rgba(255,255,255,0.07)}50%{box-shadow:0 0 0 1px rgba(255,255,255,0.16),0 0 18px rgba(255,255,255,0.04)}}
@keyframes __scan{0%{top:-2px;opacity:0}10%{opacity:1}90%{opacity:1}100%{top:102%;opacity:0}}
@keyframes __rotateSlow{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
@keyframes __shimmer{0%{background-position:-200% center}100%{background-position:200% center}}
@keyframes __inkWipe{0%{clip-path:inset(0 100% 0 0)}100%{clip-path:inset(0 0% 0 0)}}
@keyframes __particleRise{0%{opacity:0;transform:translateY(0) scale(0)}40%{opacity:.45}100%{opacity:0;transform:translateY(-38px) scale(1)}}
@keyframes __pulseRing{0%{transform:scale(1);opacity:.5}70%{transform:scale(2.2);opacity:0}100%{transform:scale(2.2);opacity:0}}
@keyframes __stagger{from{opacity:0;transform:translateY(14px) scale(.96)}to{opacity:1;transform:translateY(0) scale(1)}}
@keyframes __slideL{from{opacity:0;transform:translateX(-22px)}to{opacity:1;transform:translateX(0)}}
@keyframes __slideR{from{opacity:0;transform:translateX(22px)}to{opacity:1;transform:translateX(0)}}
@keyframes __counterGlow{0%,100%{text-shadow:0 0 0 transparent}50%{text-shadow:0 0 24px rgba(255,255,255,.18)}}

.script-reveal{
  animation:__inkWipe .7s cubic-bezier(.77,0,.18,1) both;
}

@media(max-width:768px){
  body{cursor:auto!important}
  *{cursor:auto!important}
}
@media(prefers-reduced-motion:reduce){
  *,*::before,*::after{animation-duration:.01ms!important;transition-duration:.01ms!important}
}
`;

/* ═══════════════════════════════════════════════════════
   PROJECTS DATA
═══════════════════════════════════════════════════════ */
const allProjects = [
  {
    id:1,title:"ATS-Based Resume Builder",
    tagline:"MERN stack resume optimization platform",
    subtitle:"Keyword-weighted scoring against live job descriptions",
    github:"https://github.com/bhagavan444/Resumebuilderwebapp",
    live:null,year:"2025",duration:"3 months",featured:true,
    problem:"Most resume builders output visually styled PDFs that fail silently inside ATS parsers — stripped of structure, losing keyword context, and ranking near the bottom of applicant queues before a recruiter ever sees them.",
    solution:"Built a MERN stack platform where users construct structured resumes through a form-driven interface. A Node.js backend parses the submitted content, extracts keywords from a pasted job description, and runs a weighted scoring algorithm that highlights gaps. OAuth via Google and GitHub handles identity without storing passwords.",
    impact:[{label:"ATS Score",value:90,suffix:"%"},{label:"Sections",value:8,suffix:"+"},{label:"Auth Providers",value:2,suffix:""}],
    architecture:[
      {label:"Frontend",value:"React with Context API for cross-section state sync"},
      {label:"Backend",value:"Node.js + Express — REST endpoints for parse, score, export"},
      {label:"Authentication",value:"Passport.js — Google & GitHub OAuth, session-based"},
      {label:"Scoring Engine",value:"Keyword extraction + TF-weighted relevance scoring against JD"},
      {label:"Database",value:"MongoDB Atlas — flexible document schema per resume template"}
    ],
    techStack:{
      Frontend:["React","Context API","CSS Modules"],
      Backend:["Node.js","Express","Passport.js"],
      Database:["MongoDB","Mongoose"],
      Parsing:["PDF-lib","Keyword Tokenizer","Regex Normalization"],
      Tools:["Git","Postman","MongoDB Atlas"]
    },
    challenges:[{
      title:"Normalizing Job Description Variance",
      description:"Job descriptions across companies use wildly different phrasing for identical skills — 'React.js', 'ReactJS', 'React framework'. Naive string matching produced low scores for well-qualified candidates.",
      solution:"Implemented a normalization layer that strips punctuation, lowercases tokens, and maps known aliases to canonical skill terms before scoring."
    }],
    results:[
      "Scoring engine consistently assigns 90%+ on resumes matching 70%+ of JD keywords",
      "Structured output passes PDF parsing without layout collapse across 3 tested ATS platforms",
      "OAuth flow handles token refresh and revocation — no plaintext credentials stored",
      "MongoDB document model supports 5 distinct resume templates without schema migration"
    ],
    learned:"Learned how ATS systems actually tokenize resume content — PDF formatting that looks clean visually can break machine parsing. Choosing semantic HTML structure over CSS-heavy layouts was the right call for parsability.",
    screenshot:resumeImg
  },
  {
    id:2,title:"AI Chatbot Web App",
    tagline:"Secure server-side AI API integration",
    subtitle:"React frontend + Flask backend with async request handling",
    github:"https://github.com/bhagavan444/chatbotwebapp",
    live:null,year:"2025",duration:"4 months",featured:true,
    problem:"Exposing AI API keys directly in frontend JavaScript is a common security mistake in student projects. Beyond security, browser-side API calls have no control over rate limits, no retry logic, and no context management.",
    solution:"Architected a React frontend that sends messages to a Flask backend, which owns all API credentials server-side. The Flask layer manages conversation history as a rolling context window, handles exponential backoff on rate-limit errors, and returns structured responses.",
    impact:[{label:"Response Time",value:480,suffix:"ms"},{label:"Key Exposure",value:0,suffix:""},{label:"Retry Success",value:97,suffix:"%"}],
    architecture:[
      {label:"Frontend",value:"React — async fetch, optimistic UI, typing indicator state"},
      {label:"Backend",value:"Flask REST API — owns credentials, context window, retry logic"},
      {label:"Context",value:"Rolling message history passed per request to maintain multi-turn coherence"},
      {label:"Error Handling",value:"Exponential backoff on 429s, structured error responses to frontend"},
      {label:"Security",value:"API keys server-side only — never transmitted to browser"}
    ],
    techStack:{
      Frontend:["React","JavaScript","Fetch API"],
      Backend:["Flask","Python","python-dotenv"],
      AI:["External LLM API","Context window management"],
      Tools:["Git","Postman","VS Code"]
    },
    challenges:[{
      title:"Multi-turn Context Without a Database",
      description:"Stateless HTTP means each request is independent. Without maintaining conversation history, the AI responded as if every message was the first.",
      solution:"Flask session stores the rolling message array per user session. Each new message appends to history before the API call, and the response is appended on return."
    }],
    results:[
      "API key never leaves the server — no exposure risk in browser network tab",
      "Multi-turn conversations maintain context across 15+ message exchanges",
      "Backoff logic reduced failed requests from ~12% to under 3% under rate pressure",
      "Sub-500ms median response time on standard API latency"
    ],
    learned:"The most important architectural decision was keeping the API layer on the server. It made security, retry logic, and context management all easier to reason about.",
    screenshot:chatImg
  },
  {
    id:3,title:"Career Path Recommendation",tagline:"Supervised ML career guidance engine",
    github:"https://github.com/bhagavan444/Career-Path-Recommendation",live:null,year:"2024",featured:false,
    impact:[{label:"Accuracy",value:88,suffix:"%"},{label:"Domains",value:20,suffix:"+"},{label:"Inference",value:180,suffix:"ms"}],
    tech:["Python","Scikit-learn","Flask","React"],screenshot:carrerImg
  },
  {
    id:4,title:"Fake News Detection",tagline:"TF-IDF + ML misinformation classifier",
    github:"https://github.com/bhagavan444/News-detector",live:null,year:"2023",featured:false,
    impact:[{label:"Accuracy",value:92,suffix:"%"},{label:"Pipeline",value:1,suffix:""},{label:"Latency",value:90,suffix:"ms"}],
    tech:["Python","Scikit-learn","NLP","TF-IDF"],screenshot:fakeImg
  },
  {
    id:5,title:"Heart Disease Prediction",tagline:"Clinical feature-based ML risk classifier",
    github:"https://github.com/bhagavan444/Heart-Disease-Prediction",live:null,year:"2024",featured:false,
    impact:[{label:"Accuracy",value:85,suffix:"%"},{label:"Features",value:13,suffix:""},{label:"Precision",value:83,suffix:"%"}],
    tech:["Python","Scikit-learn","Flask","SQLite"],screenshot:heartImg
  }
];

/* ═══════════════════════════════════════════════════════
   MAGNETIC CURSOR
═══════════════════════════════════════════════════════ */
const MagneticCursor = () => {
  const outerRef = useRef(null);
  const innerRef = useRef(null);
  const trailRef = useRef(null);
  const [variant,setVariant] = useState('default');
  const [label,setLabel]     = useState('');
  const mouse = useRef({x:-300,y:-300});
  const outer = useRef({x:-300,y:-300});
  const trail = useRef({x:-300,y:-300});
  const raf   = useRef(null);

  useEffect(()=>{
    const lerp=(a,b,t)=>a+(b-a)*t;
    const tick=()=>{
      outer.current.x=lerp(outer.current.x,mouse.current.x,.13);
      outer.current.y=lerp(outer.current.y,mouse.current.y,.13);
      trail.current.x=lerp(trail.current.x,mouse.current.x,.055);
      trail.current.y=lerp(trail.current.y,mouse.current.y,.055);
      if(outerRef.current) outerRef.current.style.transform=`translate(${outer.current.x}px,${outer.current.y}px) translate(-50%,-50%)`;
      if(trailRef.current) trailRef.current.style.transform=`translate(${trail.current.x}px,${trail.current.y}px) translate(-50%,-50%)`;
      raf.current=requestAnimationFrame(tick);
    };
    raf.current=requestAnimationFrame(tick);

    const onMove=e=>{
      mouse.current={x:e.clientX,y:e.clientY};
      if(innerRef.current) innerRef.current.style.transform=`translate(${e.clientX}px,${e.clientY}px) translate(-50%,-50%)`;
    };
    const onEnter=e=>{
      const el=e.target.closest('a,button,[data-cursor]');
      if(el){const t=el.getAttribute('data-cursor-text')||'';setLabel(t);setVariant(t?'text':'hover');}
    };
    const onLeave=e=>{
      if(e.target.closest('a,button,[data-cursor]')){setLabel('');setVariant('default');}
    };

    window.addEventListener('mousemove',onMove,{passive:true});
    document.addEventListener('mouseenter',onEnter,true);
    document.addEventListener('mouseleave',onLeave,true);
    return ()=>{
      cancelAnimationFrame(raf.current);
      window.removeEventListener('mousemove',onMove);
      document.removeEventListener('mouseenter',onEnter,true);
      document.removeEventListener('mouseleave',onLeave,true);
    };
  },[]);

  const isHov=variant==='hover'||variant==='text';
  const isTxt=variant==='text';
  const sz=isTxt?100:isHov?76:50;

  return(
    <>
      {/* Trail */}
      <div ref={trailRef} style={{
        position:'fixed',top:0,left:0,pointerEvents:'none',zIndex:9996,
        width:isHov?92:68,height:isHov?92:68,borderRadius:'50%',
        border:'1px solid rgba(255,255,255,0.055)',
        transition:'width .4s ease,height .4s ease',willChange:'transform',
      }}/>
      {/* Outer ring */}
      <div ref={outerRef} style={{
        position:'fixed',top:0,left:0,pointerEvents:'none',zIndex:9999,
        width:sz,height:sz,borderRadius:'50%',
        border:`2px solid ${isHov?'rgba(255,255,255,0.88)':'rgba(255,255,255,0.48)'}`,
        background:isTxt?'rgba(255,255,255,0.11)':isHov?'rgba(255,255,255,0.05)':'rgba(255,255,255,0.015)',
        backdropFilter:'blur(3px)',
        boxShadow:isHov?'0 0 20px rgba(255,255,255,0.07),inset 0 0 10px rgba(255,255,255,0.03)':'none',
        transition:'width .28s cubic-bezier(.34,1.56,.64,1),height .28s cubic-bezier(.34,1.56,.64,1),border-color .2s,background .2s',
        display:'flex',alignItems:'center',justifyContent:'center',
        willChange:'transform',
      }}>
        {isTxt&&label&&(
          <span style={{fontFamily:T.fontMono,fontSize:'9px',fontWeight:700,color:'#fff',
            textTransform:'uppercase',letterSpacing:'1.5px',textAlign:'center',lineHeight:1.2,padding:'0 6px'}}>
            {label}
          </span>
        )}
        {isHov&&!isTxt&&<Move size={13} color="rgba(255,255,255,0.78)"/>}
      </div>
      {/* Dot */}
      <div ref={innerRef} style={{
        position:'fixed',top:0,left:0,pointerEvents:'none',zIndex:10000,
        width:isTxt?0:5,height:isTxt?0:5,borderRadius:'50%',
        background:'#fff',boxShadow:'0 0 8px rgba(255,255,255,0.7)',
        opacity:isTxt?0:1,transition:'width .15s,height .15s,opacity .15s',
        willChange:'transform',
      }}/>
    </>
  );
};

/* ═══════════════════════════════════════════════════════
   PARALLAX HOOK
═══════════════════════════════════════════════════════ */
const useParallax=(strength=22)=>{
  const [off,setOff]=useState({x:0,y:0});
  const ref=useRef(null);
  useEffect(()=>{
    const el=ref.current;if(!el)return;
    const mv=e=>{const r=el.getBoundingClientRect();setOff({x:(e.clientX-(r.left+r.width/2))/strength,y:(e.clientY-(r.top+r.height/2))/strength});};
    const ml=()=>setOff({x:0,y:0});
    el.addEventListener('mousemove',mv);el.addEventListener('mouseleave',ml);
    return()=>{el.removeEventListener('mousemove',mv);el.removeEventListener('mouseleave',ml);};
  },[strength]);
  return[ref,off];
};

/* ═══════════════════════════════════════════════════════
   MAGNETIC BUTTON
═══════════════════════════════════════════════════════ */
const MagBtn=({children,href,external=false,style={},cursorText='',onClick})=>{
  const ref=useRef(null);
  const [pos,setPos]=useState({x:0,y:0});
  const [hov,setHov]=useState(false);
  const onMove=e=>{
    if(!ref.current)return;
    const{width,height,left,top}=ref.current.getBoundingClientRect();
    setPos({x:(e.clientX-(left+width/2))*.18,y:(e.clientY-(top+height/2))*.18});
  };
  const reset=()=>{setPos({x:0,y:0});setHov(false);};
  const inner=(
    <motion.div ref={ref}
      onMouseMove={onMove} onMouseEnter={()=>setHov(true)} onMouseLeave={reset}
      onClick={onClick}
      animate={{x:pos.x,y:pos.y}}
      transition={{type:'spring',stiffness:320,damping:26,mass:.1}}
      whileHover={{scale:1.035}} whileTap={{scale:.96}}
      data-cursor-text={cursorText}
      style={{position:'relative',overflow:'hidden',...style}}
    >
      {children}
      {hov&&(
        <motion.div
          initial={{scale:0,opacity:.65}} animate={{scale:3.2,opacity:0}}
          transition={{duration:.6}}
          style={{position:'absolute',inset:0,borderRadius:'inherit',pointerEvents:'none',
            background:'radial-gradient(circle,rgba(255,255,255,0.18) 0%,transparent 70%)'}}
        />
      )}
    </motion.div>
  );
  if(href)return<a href={href} target={external?'_blank':undefined} rel={external?'noopener noreferrer':undefined} style={{textDecoration:'none'}}>{inner}</a>;
  return inner;
};

/* ═══════════════════════════════════════════════════════
   ANIMATED COUNTER
═══════════════════════════════════════════════════════ */
const Counter=({value,suffix=''})=>{
  const [n,setN]=useState(0);
  const ref=useRef(null);const done=useRef(false);
  useEffect(()=>{
    const obs=new IntersectionObserver(([e])=>{
      if(e.isIntersecting&&!done.current){
        done.current=true;
        const end=parseFloat(value),dur=1900,inc=end/(dur/16);
        let s=0;
        const t=setInterval(()=>{s+=inc;if(s>=end){setN(end);clearInterval(t);}else setN(Math.floor(s));},16);
      }
    },{threshold:.4});
    if(ref.current)obs.observe(ref.current);
    return()=>obs.disconnect();
  },[value]);
  return<span ref={ref}>{n}{suffix}</span>;
};

/* ═══════════════════════════════════════════════════════
   FLOATING PARTICLES
═══════════════════════════════════════════════════════ */
const Particles=()=>(
  <div style={{position:'absolute',inset:0,overflow:'hidden',pointerEvents:'none',zIndex:0}}>
    {Array.from({length:14},(_,i)=>(
      <motion.div key={i}
        style={{
          position:'absolute',
          width:i%3===0?4:2.5,height:i%3===0?4:2.5,
          borderRadius:'50%',background:'rgba(255,255,255,0.26)',
          left:`${(i*7.4+4)%100}%`,top:`${(i*13.6+7)%100}%`,
        }}
        animate={{y:[0,-34,0],x:[0,(i%2===0?9:-9),0],opacity:[0,.48,0],scale:[0,1,0]}}
        transition={{duration:3.4+(i%4)*.9,repeat:Infinity,delay:(i%6)*.55,ease:'easeInOut'}}
      />
    ))}
  </div>
);

/* ═══════════════════════════════════════════════════════
   DANCING SCRIPT HEADING  (ink-reveal animation)
═══════════════════════════════════════════════════════ */
const ScriptHead=({children,size='clamp(2rem,4vw,3.8rem)',delay=0,italic=false,muted=false,style={}})=>{
  const ref=useRef(null);
  const [vis,setVis]=useState(false);
  useEffect(()=>{
    const obs=new IntersectionObserver(([e])=>{if(e.isIntersecting)setVis(true);},{threshold:.25});
    if(ref.current)obs.observe(ref.current);
    return()=>obs.disconnect();
  },[]);

  return(
    <div ref={ref} style={{position:'relative',display:'inline-block',overflow:'visible',...style}}>
      {/* Ink-wipe reveal bar */}
      {vis&&(
        <motion.div
          initial={{left:0,right:'100%'}}
          animate={{left:0,right:'0%'}}
          transition={{duration:.55,delay,ease:[.77,0,.18,1]}}
          style={{
            position:'absolute',top:'-4px',bottom:'-4px',
            background:T.accent,zIndex:2,pointerEvents:'none',borderRadius:4,
            transformOrigin:'left',
          }}
        />
      )}
      {/* Wipe out */}
      {vis&&(
        <motion.div
          initial={{left:0,right:'100%'}}
          animate={{left:'100%',right:'0%'}}
          transition={{duration:.55,delay:delay+.28,ease:[.77,0,.18,1]}}
          style={{
            position:'absolute',top:'-4px',bottom:'-4px',
            background:T.accent,zIndex:3,pointerEvents:'none',borderRadius:4,
            transformOrigin:'right',
          }}
        />
      )}
      <span style={{
        fontFamily:T.fontScript,fontWeight:700,
        fontSize:size,
        color:muted?T.textSec:T.textPri,
        lineHeight:1.15,letterSpacing:'0.01em',
        fontStyle:italic?'italic':'normal',
        display:'inline-block',
        opacity:vis?1:0,
        transition:`opacity 0s ${delay+.28}s`,
      }}>
        {children}
      </span>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════
   DIVIDER
═══════════════════════════════════════════════════════ */
const Divider=()=>(
  <motion.div
    initial={{scaleX:0,opacity:0}}
    whileInView={{scaleX:1,opacity:1}}
    viewport={{once:true}}
    transition={{duration:1.1,ease:[.25,.1,.25,1]}}
    style={{height:1,background:'linear-gradient(90deg,transparent,rgba(255,255,255,0.11) 30%,rgba(255,255,255,0.11) 70%,transparent)',transformOrigin:'left'}}
  />
);

/* ═══════════════════════════════════════════════════════
   FLAGSHIP PROJECT
═══════════════════════════════════════════════════════ */
const FlagshipProject=({project,index})=>{
  const [tab,setTab]=useState('architecture');
  const [imgHov,setImgHov]=useState(false);
  const isEven=index%2===0;
  const [pRef,pOff]=useParallax(28);
  const tabs=['architecture','tech','challenges','results'];

  return(
    <>
      <Divider/>
      <motion.section ref={pRef}
        initial={{opacity:0,y:55}}
        whileInView={{opacity:1,y:0}}
        viewport={{once:true,margin:'-70px'}}
        transition={{duration:.75,ease:[.25,.1,.25,1]}}
        style={{position:'relative',padding:'96px 0',overflow:'hidden'}}
      >
        <Particles/>

        {/* Ambient halo */}
        <motion.div
          animate={{opacity:[.025,.06,.025],scale:[1,1.07,1]}}
          transition={{duration:7,repeat:Infinity,ease:'easeInOut'}}
          style={{
            position:'absolute',inset:0,pointerEvents:'none',
            background:`radial-gradient(ellipse at ${isEven?'15%':'85%'} 42%, rgba(255,255,255,0.05) 0%, transparent 52%)`,
            x:pOff.x*.45,y:pOff.y*.45,
          }}
        />

        {/* Script watermark */}
        <motion.div style={{
          position:'absolute',top:'8%',
          left:isEven?'2%':'auto',right:isEven?'auto':'2%',
          fontFamily:T.fontScript,fontSize:'clamp(5rem,13vw,16rem)',
          fontWeight:700,color:'rgba(255,255,255,0.016)',
          pointerEvents:'none',userSelect:'none',lineHeight:1,
          x:pOff.x*-.28,y:pOff.y*-.28,
        }}>
          {project.title.split(' ')[0]}
        </motion.div>

        {/* Index pill */}
        <div style={{maxWidth:1280,margin:'0 auto',padding:'0 48px',position:'relative',zIndex:1}}>
          <motion.div
            initial={{opacity:0,x:isEven?-18:18}}
            whileInView={{opacity:1,x:0}}
            viewport={{once:true}}
            transition={{duration:.6}}
            style={{
              display:'inline-flex',alignItems:'center',gap:8,
              padding:'5px 14px',
              background:T.surface,border:`1px solid ${T.borderSoft}`,
              borderRadius:100,fontFamily:T.fontMono,fontSize:'0.67rem',
              fontWeight:700,color:T.textMuted,letterSpacing:'0.1em',
              textTransform:'uppercase',marginBottom:38,
            }}
          >
            <span style={{opacity:.4}}>—</span>
            <span>0{index+1}</span>
            <span style={{opacity:.28}}>·</span>
            <span>{project.year}</span>
          </motion.div>
        </div>

        <div style={{maxWidth:1280,margin:'0 auto',padding:'0 48px',position:'relative',zIndex:1}}>
          <div style={{
            display:'grid',
            gridTemplateColumns:'repeat(auto-fit,minmax(420px,1fr))',
            gap:68,alignItems:'start',
            direction:isEven?'ltr':'rtl',
          }}>

            {/* ── IMAGE ── */}
            <motion.div
              style={{direction:'ltr',position:'relative'}}
              initial={{opacity:0,x:isEven?-42:42}}
              whileInView={{opacity:1,x:0}}
              viewport={{once:true}}
              transition={{duration:.75,delay:.12}}
            >
              {/* Floating badge */}
              <motion.div
                animate={{y:[0,-5,0]}}
                transition={{duration:3.6,repeat:Infinity,ease:'easeInOut'}}
                style={{
                  display:'inline-flex',alignItems:'center',gap:7,
                  padding:'6px 14px',
                  background:T.surface,border:`1px solid ${T.borderStrong}`,
                  borderRadius:100,fontFamily:T.fontMono,fontSize:'0.68rem',
                  fontWeight:700,color:T.textSec,letterSpacing:'0.07em',
                  textTransform:'uppercase',marginBottom:15,
                  boxShadow:'0 4px 16px rgba(0,0,0,.55)',
                }}
              >
                <motion.div animate={{rotate:360}} transition={{duration:3,repeat:Infinity,ease:'linear'}}>
                  <Sparkles size={10} color={T.accent}/>
                </motion.div>
                <span>Built With Precision</span>
              </motion.div>

              {/* Image */}
              <motion.div
                onHoverStart={()=>setImgHov(true)} onHoverEnd={()=>setImgHov(false)}
                whileHover={{scale:1.018,rotateY:1.8,rotateX:-1}}
                transition={{duration:.42}}
                data-cursor-text="VIEW"
                style={{
                  position:'relative',borderRadius:22,overflow:'hidden',
                  boxShadow:'0 28px 70px rgba(0,0,0,.75)',
                  border:`1px solid ${T.borderSoft}`,
                  transformStyle:'preserve-3d',background:T.surface,
                }}
              >
                {/* Scanlines */}
                <div style={{
                  position:'absolute',inset:0,zIndex:3,pointerEvents:'none',
                  background:'repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(255,255,255,0.012) 2px,rgba(255,255,255,0.012) 4px)',
                }}/>
                {/* Scan bar on hover */}
                {imgHov&&(
                  <motion.div
                    initial={{top:'-2px',opacity:0}}
                    animate={{top:'104%',opacity:[0,.5,.5,0]}}
                    transition={{duration:1.9,ease:'linear',repeat:Infinity}}
                    style={{position:'absolute',left:0,right:0,height:2,zIndex:4,
                      background:'linear-gradient(90deg,transparent,rgba(255,255,255,.6),transparent)',pointerEvents:'none'}}
                  />
                )}
                {/* Top glint */}
                <div style={{
                  position:'absolute',top:0,left:0,right:0,height:2,zIndex:5,pointerEvents:'none',
                  background:'linear-gradient(90deg,transparent,rgba(255,255,255,.32) 50%,transparent)',
                }}/>

                <motion.img src={project.screenshot} alt={project.title}
                  style={{width:'100%',height:'auto',display:'block'}}
                  animate={imgHov?{scale:1.07}:{scale:1}} transition={{duration:.5}}
                />

                <AnimatePresence>
                  {imgHov&&(
                    <motion.div
                      initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
                      style={{
                        position:'absolute',inset:0,zIndex:4,
                        background:'rgba(0,0,0,.62)',backdropFilter:'blur(5px)',
                        display:'flex',alignItems:'center',justifyContent:'center',borderRadius:22,
                      }}
                    >
                      <motion.div
                        initial={{scale:.55,opacity:0}}
                        animate={{scale:1,opacity:1}}
                        transition={{type:'spring',stiffness:240,damping:18}}
                      >
                        <Eye size={42} color="#fff"/>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Meta */}
              <motion.div
                initial={{opacity:0}} whileInView={{opacity:1}} viewport={{once:true}} transition={{delay:.5}}
                style={{display:'flex',gap:14,marginTop:16,alignItems:'center'}}
              >
                {[project.year,project.duration].map((v,i)=>(
                  <React.Fragment key={i}>
                    <motion.span whileHover={{color:T.textPri}}
                      style={{fontFamily:T.fontMono,fontSize:'0.77rem',color:T.textMuted,transition:'color .2s',cursor:'none'}}>
                      {v}
                    </motion.span>
                    {i===0&&<span style={{color:'rgba(255,255,255,.18)',fontSize:'0.7rem'}}>·</span>}
                  </React.Fragment>
                ))}
              </motion.div>
            </motion.div>

            {/* ── CONTENT ── */}
            <div style={{direction:'ltr',display:'flex',flexDirection:'column',gap:32}}>

              {/* Title (Dancing Script) */}
              <div>
                <motion.div
                  initial={{opacity:0,y:22}}
                  whileInView={{opacity:1,y:0}}
                  viewport={{once:true}}
                  transition={{duration:.65,ease:[.25,.1,.25,1]}}
                >
                  <div style={{position:'relative',display:'inline-block',width:'fit-content'}}>
                    <h2 style={{
                      fontFamily:T.fontScript,fontWeight:700,
                      fontSize:'clamp(2.1rem,3.8vw,3.9rem)',
                      lineHeight:1.1,letterSpacing:'0.01em',
                      color:T.textPri,
                    }}>
                      {project.title}
                    </h2>
                    {/* Animated underline */}
                    <motion.div
                      initial={{width:0,opacity:0}}
                      whileInView={{width:'100%',opacity:1}}
                      viewport={{once:true}}
                      transition={{duration:1.0,delay:.35,ease:[.25,.1,.25,1]}}
                      style={{
                        position:'absolute',bottom:-10,left:0,
                        height:3,background:T.accent,borderRadius:2,
                        boxShadow:'0 0 10px rgba(255,255,255,.25)',
                        transformOrigin:'left',
                      }}
                    />
                  </div>
                </motion.div>

                <motion.p
                  initial={{opacity:0}} whileInView={{opacity:1}} viewport={{once:true}} transition={{delay:.35}}
                  style={{marginTop:22,fontFamily:T.fontScript,fontWeight:600,fontSize:'1.22rem',color:T.textSec,letterSpacing:'0.01em'}}
                >
                  {project.subtitle}
                </motion.p>
                <motion.p
                  initial={{opacity:0}} whileInView={{opacity:1}} viewport={{once:true}} transition={{delay:.45}}
                  style={{marginTop:8,fontSize:'0.9rem',color:T.textMuted,fontWeight:500,lineHeight:1.72}}
                >
                  {project.tagline}
                </motion.p>
              </div>

              {/* Impact metrics */}
              <motion.div
                initial={{opacity:0,y:16}}
                whileInView={{opacity:1,y:0}}
                viewport={{once:true}}
                transition={{delay:.18}}
                style={{
                  display:'flex',gap:0,
                  padding:'24px 0',
                  borderTop:`1px solid ${T.borderSoft}`,
                  borderBottom:`1px solid ${T.borderSoft}`,
                }}
              >
                {project.impact.map((m,i)=>(
                  <motion.div key={i}
                    initial={{opacity:0,scale:.82}}
                    whileInView={{opacity:1,scale:1}}
                    viewport={{once:true}}
                    transition={{delay:.28+i*.1}}
                    whileHover={{y:-5,scale:1.07}}
                    style={{
                      display:'flex',flexDirection:'column',gap:8,flex:1,cursor:'none',
                      borderRight:i<project.impact.length-1?`1px solid ${T.borderSoft}`:'none',
                      paddingRight:i<project.impact.length-1?20:0,
                      paddingLeft:i>0?20:0,
                    }}
                  >
                    <div style={{
                      fontFamily:T.fontMono,fontWeight:900,
                      fontSize:'clamp(1.9rem,3vw,3.1rem)',
                      lineHeight:1,color:T.textPri,letterSpacing:'-0.04em',
                      animation:'__counterGlow 3s ease-in-out infinite',
                    }}>
                      <Counter value={m.value} suffix={m.suffix}/>
                    </div>
                    <div style={{fontFamily:T.fontMono,fontSize:'0.65rem',color:T.textMuted,textTransform:'uppercase',letterSpacing:'0.1em',fontWeight:700}}>
                      {m.label}
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* CTAs */}
              <motion.div
                initial={{opacity:0,y:12}}
                whileInView={{opacity:1,y:0}}
                viewport={{once:true}}
                transition={{delay:.28}}
                style={{display:'flex',gap:13,flexWrap:'wrap'}}
              >
                <MagBtn href={project.github} external cursorText="CODE" style={{
                  display:'inline-flex',alignItems:'center',gap:10,
                  padding:'12px 24px',borderRadius:12,
                  background:T.accent,color:'#000',
                  fontFamily:T.fontMono,fontSize:'0.77rem',fontWeight:700,
                  letterSpacing:'0.07em',textTransform:'uppercase',
                  boxShadow:'0 4px 22px rgba(255,255,255,.1)',cursor:'none',
                }}>
                  <Github size={14}/><span>Source</span><ArrowRight size={14}/>
                </MagBtn>
                <MagBtn href={project.live} external cursorText="DEMO" style={{
                  display:'inline-flex',alignItems:'center',gap:10,
                  padding:'12px 24px',borderRadius:12,
                  background:'transparent',border:`1.5px solid ${T.borderStrong}`,
                  color:T.textPri,
                  fontFamily:T.fontMono,fontSize:'0.77rem',fontWeight:700,
                  letterSpacing:'0.07em',textTransform:'uppercase',
                  cursor:'none',
                }}>
                  <ExternalLink size={14}/><span>Live Demo</span>
                </MagBtn>
              </motion.div>

              {/* Problem / Solution */}
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:13}}>
                {[
                  {label:'Problem',text:project.problem,Icon:AlertCircle},
                  {label:'Solution',text:project.solution,Icon:Target},
                ].map(({label,text,Icon},i)=>(
                  <motion.div key={label}
                    initial={{opacity:0,x:i===0?-16:16}}
                    whileInView={{opacity:1,x:0}}
                    viewport={{once:true}}
                    transition={{delay:.26}}
                    whileHover={{scale:1.025,boxShadow:'0 10px 32px rgba(0,0,0,.55)'}}
                    style={{
                      padding:20,borderRadius:16,
                      background:i===0?'rgba(255,255,255,0.018)':'rgba(255,255,255,0.03)',
                      border:`1px solid ${T.borderSoft}`,
                      transition:`all .3s ${T.ease}`,
                    }}
                  >
                    <motion.div
                      animate={{rotate:[0,8,-8,0]}}
                      transition={{duration:3.8,repeat:Infinity}}
                      style={{
                        display:'inline-flex',alignItems:'center',justifyContent:'center',
                        width:33,height:33,borderRadius:9,
                        background:'rgba(255,255,255,0.055)',
                        border:`1px solid ${T.borderSoft}`,marginBottom:13,
                      }}
                    >
                      <Icon size={14} color={T.accent}/>
                    </motion.div>
                    <div style={{fontFamily:T.fontMono,fontSize:'0.65rem',fontWeight:700,textTransform:'uppercase',letterSpacing:'0.1em',color:T.textMuted,marginBottom:9}}>
                      {label}
                    </div>
                    <div style={{fontSize:'0.835rem',color:T.textSec,lineHeight:1.72,fontWeight:500}}>{text}</div>
                  </motion.div>
                ))}
              </div>

              {/* Tabs */}
              <motion.div
                initial={{opacity:0,y:14}}
                whileInView={{opacity:1,y:0}}
                viewport={{once:true}}
                transition={{delay:.4}}
                style={{display:'flex',flexDirection:'column',gap:13}}
              >
                {/* Tab nav */}
                <div style={{
                  display:'flex',gap:4,padding:5,
                  background:T.surface,border:`1px solid ${T.borderSoft}`,
                  borderRadius:14,position:'relative',flexWrap:'wrap',
                }}>
                  {tabs.map(t=>(
                    <motion.button key={t}
                      onClick={()=>setTab(t)}
                      whileHover={{scale:1.04}} whileTap={{scale:.96}}
                      data-cursor-text={t.slice(0,4).toUpperCase()}
                      style={{
                        display:'flex',alignItems:'center',gap:6,
                        padding:'10px 16px',border:'none',borderRadius:10,
                        fontFamily:T.fontMono,fontSize:'0.72rem',fontWeight:700,
                        letterSpacing:'0.06em',textTransform:'uppercase',
                        background:tab===t?T.accent:'transparent',
                        color:tab===t?'#000':T.textMuted,
                        transition:`all .22s ${T.ease}`,cursor:'none',minHeight:42,
                        boxShadow:tab===t?'0 3px 12px rgba(255,255,255,.1)':'none',
                      }}
                    >
                      {t==='architecture'&&<Server size={12}/>}
                      {t==='tech'&&<Code2 size={12}/>}
                      {t==='challenges'&&<TrendingUp size={12}/>}
                      {t==='results'&&<Zap size={12}/>}
                      <span>{t.charAt(0).toUpperCase()+t.slice(1)}</span>
                    </motion.button>
                  ))}
                </div>

                {/* Tab content */}
                <AnimatePresence mode="wait">
                  <motion.div key={tab}
                    initial={{opacity:0,y:10,filter:'blur(4px)'}}
                    animate={{opacity:1,y:0,filter:'blur(0px)'}}
                    exit={{opacity:0,y:-8,filter:'blur(3px)'}}
                    transition={{duration:.28}}
                    style={{padding:24,background:T.surfaceEl,border:`1px solid ${T.borderSoft}`,borderRadius:16}}
                  >
                    {/* Architecture */}
                    {tab==='architecture'&&(
                      <div style={{display:'grid',gap:10}}>
                        {project.architecture.map((item,i)=>(
                          <motion.div key={i}
                            initial={{opacity:0,x:-11}} animate={{opacity:1,x:0}}
                            transition={{delay:i*.07}}
                            whileHover={{scale:1.015,x:6,borderColor:T.borderStrong}}
                            style={{
                              padding:'14px 18px',background:T.surface,
                              border:`1px solid ${T.borderSoft}`,borderRadius:11,
                              transition:`all .22s ${T.ease}`,cursor:'none',
                            }}
                          >
                            <div style={{fontFamily:T.fontMono,fontSize:'0.64rem',fontWeight:700,color:T.textMuted,textTransform:'uppercase',letterSpacing:'0.1em',marginBottom:6}}>
                              {item.label}
                            </div>
                            <div style={{fontSize:'0.865rem',color:T.textSec,lineHeight:1.65,fontWeight:500}}>
                              {item.value}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    )}
                    {/* Tech */}
                    {tab==='tech'&&(
                      <div style={{display:'grid',gap:20}}>
                        {Object.entries(project.techStack).map(([cat,techs],i)=>(
                          <motion.div key={cat} initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{delay:i*.08}}>
                            <div style={{fontFamily:T.fontMono,fontSize:'0.66rem',fontWeight:700,color:T.textMuted,textTransform:'uppercase',letterSpacing:'0.1em',marginBottom:10}}>
                              {cat.replace('_',' ')}
                            </div>
                            <div style={{display:'flex',flexWrap:'wrap',gap:8}}>
                              {techs.map((tech,ti)=>(
                                <motion.div key={ti}
                                  initial={{opacity:0,scale:0}} animate={{opacity:1,scale:1}}
                                  transition={{delay:.14+ti*.05}}
                                  whileHover={{scale:1.12,y:-3,background:T.surfaceHov,borderColor:T.borderStrong}}
                                  style={{
                                    display:'flex',alignItems:'center',gap:7,
                                    padding:'8px 14px',background:T.surface,
                                    border:`1px solid ${T.borderSoft}`,borderRadius:9,
                                    fontFamily:T.fontMono,fontSize:'0.77rem',
                                    color:T.textSec,fontWeight:600,cursor:'none',
                                    transition:`all .2s ${T.ease}`,
                                  }}
                                >
                                  <motion.div
                                    animate={{scale:[1,1.4,1]}}
                                    transition={{duration:2.2,repeat:Infinity,delay:ti*.15}}
                                    style={{width:6,height:6,borderRadius:'50%',background:T.accent,flexShrink:0}}
                                  />
                                  {tech}
                                </motion.div>
                              ))}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    )}
                    {/* Challenges */}
                    {tab==='challenges'&&(
                      <div style={{display:'grid',gap:14}}>
                        {project.challenges.map((ch,i)=>(
                          <motion.div key={i}
                            initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{delay:i*.1}}
                            whileHover={{scale:1.012,y:-4,borderColor:T.borderStrong}}
                            style={{padding:22,background:T.surface,border:`1px solid ${T.borderSoft}`,borderRadius:14,transition:`all .3s ${T.ease}`,cursor:'none'}}
                          >
                            {/* Challenge title in Dancing Script */}
                            <div style={{fontFamily:T.fontScript,fontWeight:700,fontSize:'1.2rem',color:T.textPri,marginBottom:10}}>
                              {ch.title}
                            </div>
                            <div style={{fontSize:'0.855rem',color:T.textSec,lineHeight:1.72,marginBottom:14,fontWeight:500}}>
                              {ch.description}
                            </div>
                            <div style={{padding:'13px 16px',background:T.surfaceEl,borderRadius:10}}>
                              <div style={{fontFamily:T.fontMono,fontSize:'0.64rem',fontWeight:700,color:T.textMuted,textTransform:'uppercase',letterSpacing:'0.1em',marginBottom:8}}>
                                Solution
                              </div>
                              <div style={{fontSize:'0.855rem',color:T.textSec,lineHeight:1.7,fontWeight:600}}>{ch.solution}</div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    )}
                    {/* Results */}
                    {tab==='results'&&(
                      <div style={{display:'grid',gap:11}}>
                        {project.results.map((r,i)=>(
                          <motion.div key={i}
                            initial={{opacity:0,x:-11}} animate={{opacity:1,x:0}} transition={{delay:i*.09}}
                            whileHover={{x:9,borderColor:T.borderStrong}}
                            style={{
                              display:'flex',alignItems:'flex-start',gap:13,
                              padding:'13px 17px',background:T.surface,
                              border:`1px solid ${T.borderSoft}`,borderRadius:11,
                              fontSize:'0.855rem',color:T.textSec,lineHeight:1.7,fontWeight:500,
                              transition:`all .22s ${T.ease}`,cursor:'none',
                            }}
                          >
                            <motion.div whileHover={{rotate:360}} transition={{duration:.45}}
                              style={{display:'flex',alignItems:'center',justifyContent:'center',width:26,height:26,flexShrink:0,borderRadius:8,background:'rgba(255,255,255,0.065)',border:`1px solid ${T.borderSoft}`}}>
                              <Zap size={12} color={T.accent}/>
                            </motion.div>
                            {r}
                          </motion.div>
                        ))}
                        <motion.div
                          initial={{opacity:0}} animate={{opacity:1}} transition={{delay:.45}}
                          whileHover={{borderColor:T.borderStrong,scale:1.01}}
                          style={{marginTop:8,padding:20,background:T.surface,border:`1px solid ${T.borderSoft}`,borderRadius:14,transition:`all .3s ${T.ease}`,cursor:'none'}}
                        >
                          <div style={{fontFamily:T.fontMono,fontSize:'0.65rem',fontWeight:700,color:T.textMuted,textTransform:'uppercase',letterSpacing:'0.1em',marginBottom:9}}>
                            Lesson Learned
                          </div>
                          <div style={{fontSize:'0.92rem',color:T.textSec,lineHeight:1.78,fontStyle:'italic',fontWeight:500}}>
                            {project.learned}
                          </div>
                        </motion.div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>
    </>
  );
};

/* ═══════════════════════════════════════════════════════
   COMPACT CARD
═══════════════════════════════════════════════════════ */
const CompactCard=({project,delay=0})=>{
  const [hov,setHov]=useState(false);
  const [pRef,po]=useParallax(44);

  return(
    <motion.div ref={pRef}
      initial={{opacity:0,y:28,scale:.97}}
      whileInView={{opacity:1,y:0,scale:1}}
      viewport={{once:true,margin:'-40px'}}
      whileHover={{y:-10,boxShadow:'0 32px 64px rgba(0,0,0,.65)',borderColor:T.borderHov}}
      transition={{duration:.45,delay}}
      onHoverStart={()=>setHov(true)} onHoverEnd={()=>setHov(false)}
      data-cursor-text="EXPLORE"
      style={{
        background:T.surface,border:`1px solid ${T.borderSoft}`,
        borderRadius:22,overflow:'hidden',
        display:'flex',flexDirection:'column',
        transition:`border-color .3s ${T.ease}`,cursor:'none',
        animation:`__glowBorder 4s ease-in-out ${delay}s infinite`,
      }}
    >
      {/* Image */}
      <motion.div style={{position:'relative',height:210,overflow:'hidden',background:T.surfaceEl,x:po.x*.5,y:po.y*.5}}>
        {/* scanlines */}
        <div style={{position:'absolute',inset:0,zIndex:3,pointerEvents:'none',
          background:'repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,0,0,0.12) 3px,rgba(0,0,0,0.12) 4px)'}}/>
        <motion.div
          animate={hov?{opacity:.55}:{opacity:.22}}
          style={{position:'absolute',inset:0,zIndex:2,pointerEvents:'none',
            background:'linear-gradient(180deg,rgba(255,255,255,0.04) 0%,transparent 55%,rgba(0,0,0,.55) 100%)'}}
        />
        <motion.img src={project.screenshot} alt={project.title}
          animate={hov?{scale:1.11}:{scale:1}} transition={{duration:.5}}
          style={{width:'100%',height:'100%',objectFit:'cover',display:'block'}}
        />
        {/* scan line */}
        {hov&&(
          <motion.div
            initial={{top:'-2px',opacity:0}}
            animate={{top:'106%',opacity:[0,.55,.55,0]}}
            transition={{duration:1.65,ease:'linear',repeat:Infinity}}
            style={{position:'absolute',left:0,right:0,height:1.5,zIndex:5,
              background:'linear-gradient(90deg,transparent,rgba(255,255,255,.65),transparent)',pointerEvents:'none'}}
          />
        )}
        {/* Corner badge */}
        <motion.div
          animate={hov?{scale:[1,1.22,1],rotate:[0,10,-10,0]}:{}}
          transition={{duration:.65}}
          style={{position:'absolute',top:12,right:12,zIndex:6,width:27,height:27,borderRadius:8,background:T.accent,boxShadow:'0 4px 12px rgba(0,0,0,.55)'}}
        />
        {/* Year */}
        <div style={{
          position:'absolute',bottom:12,left:12,zIndex:6,
          padding:'3px 10px',background:'rgba(0,0,0,.72)',backdropFilter:'blur(8px)',
          borderRadius:20,fontFamily:T.fontMono,fontSize:'0.63rem',fontWeight:700,
          color:T.textMuted,letterSpacing:'0.1em',border:`1px solid ${T.borderSoft}`,
        }}>
          {project.year}
        </div>
      </motion.div>

      {/* Content */}
      <div style={{padding:24,display:'flex',flexDirection:'column',gap:16,flex:1}}>
        <div>
          {/* Dancing Script card title */}
          <motion.h3 animate={hov?{x:4}:{x:0}} transition={{duration:.22}}
            style={{fontFamily:T.fontScript,fontWeight:700,fontSize:'1.55rem',color:T.textPri,lineHeight:1.2,letterSpacing:'0.01em'}}>
            {project.title}
          </motion.h3>
          <motion.p animate={hov?{x:4}:{x:0}} transition={{duration:.22,delay:.04}}
            style={{marginTop:6,fontSize:'0.835rem',color:T.textMuted,lineHeight:1.65,fontWeight:500}}>
            {project.tagline}
          </motion.p>
        </div>

        {/* Metrics */}
        <div style={{
          display:'flex',gap:0,
          paddingTop:15,paddingBottom:15,
          borderTop:`1px solid ${T.borderSoft}`,borderBottom:`1px solid ${T.borderSoft}`,
        }}>
          {project.impact.map((m,i)=>(
            <motion.div key={i} whileHover={{scale:1.09,y:-3}}
              style={{
                display:'flex',flexDirection:'column',gap:5,flex:1,cursor:'none',
                borderRight:i<project.impact.length-1?`1px solid ${T.borderSoft}`:'none',
                paddingRight:i<project.impact.length-1?13:0,paddingLeft:i>0?13:0,
              }}>
              <div style={{fontFamily:T.fontMono,fontSize:'1.42rem',fontWeight:900,color:T.textPri,lineHeight:1}}>
                <Counter value={m.value} suffix={m.suffix}/>
              </div>
              <div style={{fontFamily:T.fontMono,fontSize:'0.58rem',color:T.textMuted,textTransform:'uppercase',letterSpacing:'0.08em',fontWeight:700,lineHeight:1.4}}>
                {m.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tech badges */}
        <div style={{display:'flex',flexWrap:'wrap',gap:7}}>
          {project.tech.map((t,i)=>(
            <motion.span key={i}
              initial={{opacity:0,scale:0}}
              whileInView={{opacity:1,scale:1}}
              viewport={{once:true}}
              transition={{delay:.22+i*.05}}
              whileHover={{scale:1.12,background:T.surfaceHov,borderColor:T.borderStrong,color:T.textPri}}
              style={{
                padding:'6px 12px',background:T.surfaceEl,
                border:`1px solid ${T.borderSoft}`,borderRadius:8,
                fontFamily:T.fontMono,fontSize:'0.7rem',color:T.textSec,fontWeight:700,
                cursor:'none',transition:`all .2s ${T.ease}`,
              }}
            >
              {t}
            </motion.span>
          ))}
        </div>

        {/* Links */}
        <div style={{display:'flex',gap:11,marginTop:'auto'}}>
          {[
            {href:project.github,label:'Code',Icon:Github,cur:'CODE'},
            {href:project.live,label:'Demo',Icon:ExternalLink,cur:'DEMO'},
          ].map(({href,label,Icon,cur})=>(
            <MagBtn key={label} href={href} external cursorText={cur} style={{
              display:'flex',alignItems:'center',justifyContent:'center',gap:7,
              flex:1,padding:'12px 14px',background:'transparent',
              border:`1px solid ${T.borderStrong}`,borderRadius:11,
              fontFamily:T.fontMono,fontSize:'0.72rem',fontWeight:700,
              color:T.textSec,cursor:'none',textTransform:'uppercase',
              letterSpacing:'0.05em',minHeight:44,transition:`all .22s ${T.ease}`,
            }}>
              <Icon size={13}/><span>{label}</span>
            </MagBtn>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

/* ═══════════════════════════════════════════════════════
   MAIN
═══════════════════════════════════════════════════════ */
export default function Projects(){
  const featured   = allProjects.filter(p=>p.featured);
  const supporting = allProjects.filter(p=>!p.featured);

  return(
    <>
      <style>{CSS}</style>
      <MagneticCursor/>

      <div style={{minHeight:'100vh',background:T.bg}}>

        {/* ── HERO ─────────────────────────────────── */}
        <motion.section
          initial={{opacity:0}} animate={{opacity:1}} transition={{duration:.9}}
          style={{maxWidth:1280,margin:'0 auto',padding:'108px 48px 88px',position:'relative',overflow:'hidden'}}
        >
          {/* Grain */}
          <div style={{
            position:'absolute',inset:0,pointerEvents:'none',zIndex:0,
            backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.88' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize:'180px 180px',opacity:.026,mixBlendMode:'overlay',
          }}/>

          {/* Ambient glow orb */}
          <motion.div
            animate={{opacity:[.35,.65,.35],scale:[1,1.07,1]}}
            transition={{duration:7,repeat:Infinity,ease:'easeInOut'}}
            style={{
              position:'absolute',top:'-15%',left:'62%',width:560,height:560,
              borderRadius:'50%',
              background:'radial-gradient(circle,rgba(255,255,255,0.045) 0%,transparent 70%)',
              pointerEvents:'none',zIndex:0,
            }}
          />

          <div style={{position:'relative',zIndex:1}}>

            {/* Badge */}
            <motion.div
              initial={{opacity:0,y:18}} animate={{opacity:1,y:0}} transition={{delay:.2,duration:.65}}
              style={{
                display:'inline-flex',alignItems:'center',gap:9,
                padding:'7px 18px',
                background:T.surface,border:`1px solid ${T.borderSoft}`,
                borderRadius:100,fontFamily:T.fontMono,fontSize:'0.67rem',
                fontWeight:700,color:T.textMuted,letterSpacing:'0.13em',
                textTransform:'uppercase',marginBottom:36,
                boxShadow:'0 2px 16px rgba(0,0,0,.48)',
              }}
            >
              <motion.div animate={{rotate:360}} transition={{duration:2.8,repeat:Infinity,ease:'linear'}}>
                <Sparkles size={11} color={T.accent}/>
              </motion.div>
              <span>Engineering Portfolio</span>
              {/* Blinking cursor */}
              <span style={{fontFamily:T.fontMono,animation:'__blink 1.1s step-end infinite',color:T.textMuted}}>_</span>
            </motion.div>

            {/* ── HERO HEADING — Dancing Script reveal ── */}
            <div style={{marginBottom:28,overflow:'visible'}}>
              {/* Line 1 */}
              <div style={{overflow:'hidden',marginBottom:4}}>
                <motion.h1
                  initial={{y:52,opacity:0,rotate:-1.4,filter:'blur(10px)'}}
                  animate={{y:0,opacity:1,rotate:0,filter:'blur(0px)'}}
                  transition={{delay:.32,duration:.85,ease:[.25,.1,.25,1]}}
                  style={{
                    fontFamily:T.fontScript,fontWeight:700,
                    fontSize:'clamp(2.8rem,7.2vw,7rem)',
                    lineHeight:1.08,letterSpacing:'0.01em',color:T.textPri,
                  }}
                >
                  Engineering Systems
                </motion.h1>
              </div>
              {/* Line 2 */}
              <div style={{overflow:'hidden'}}>
                <motion.h1
                  initial={{y:52,opacity:0,rotate:1.2,filter:'blur(10px)'}}
                  animate={{y:0,opacity:1,rotate:0,filter:'blur(0px)'}}
                  transition={{delay:.46,duration:.85,ease:[.25,.1,.25,1]}}
                  style={{
                    fontFamily:T.fontScript,fontWeight:700,
                    fontSize:'clamp(2.8rem,7.2vw,7rem)',
                    lineHeight:1.08,letterSpacing:'0.01em',
                    color:'rgba(255,255,255,.52)',fontStyle:'italic',
                    display:'flex',alignItems:'center',gap:28,flexWrap:'wrap',
                  }}
                >
                  That Scale
                  {/* Animated line accent */}
                  <motion.span
                    initial={{width:0}} animate={{width:80}}
                    transition={{delay:1.1,duration:.9,ease:[.25,.1,.25,1]}}
                    style={{
                      display:'inline-block',height:3,background:T.accent,
                      borderRadius:2,verticalAlign:'middle',flexShrink:0,
                      boxShadow:'0 0 12px rgba(255,255,255,.3)',
                    }}
                  />
                </motion.h1>
              </div>
            </div>

            {/* Subtext */}
            <motion.p
              initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{delay:.6,duration:.7}}
              style={{
                fontSize:'1.13rem',color:T.textSec,maxWidth:600,
                lineHeight:1.78,fontWeight:400,marginBottom:62,
              }}
            >
              Full-stack applications designed with architecture in mind — not just features.
              Each project reflects real trade-offs, real constraints, and working code.
            </motion.p>

            {/* Stats row */}
            <div style={{display:'flex',gap:0,flexWrap:'wrap'}}>
              {[
                {value:'5+',label:'Shipped Projects'},
                {value:'3+',label:'Internships'},
                {value:'90%+',label:'Avg Model Accuracy'},
              ].map((s,i)=>(
                <motion.div key={i}
                  initial={{opacity:0,y:24}} animate={{opacity:1,y:0}}
                  transition={{delay:.54+i*.12,duration:.7,ease:[.25,.1,.25,1]}}
                  whileHover={{scale:1.07,y:-5}}
                  data-cursor=""
                  style={{
                    cursor:'none',position:'relative',
                    paddingRight:i<2?56:0,paddingLeft:i>0?56:0,
                  }}
                >
                  {i>0&&(
                    <div style={{
                      position:'absolute',left:0,top:'10%',bottom:'10%',width:1,
                      background:`linear-gradient(180deg,transparent,${T.borderSoft} 40%,${T.borderSoft} 60%,transparent)`,
                    }}/>
                  )}
                  <div style={{fontFamily:T.fontMono,fontSize:'clamp(2rem,3.5vw,3.3rem)',fontWeight:900,color:T.textPri,lineHeight:1,textShadow:'0 0 30px rgba(255,255,255,.1)'}}>
                    {s.value}
                  </div>
                  <div style={{marginTop:10,fontFamily:T.fontMono,fontSize:'0.68rem',color:T.textMuted,textTransform:'uppercase',letterSpacing:'0.11em',fontWeight:700}}>
                    {s.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* ── FLAGSHIP PROJECTS ────────────────────── */}
        {featured.map((p,i)=>(
          <FlagshipProject key={p.id} project={p} index={i}/>
        ))}

        {/* ── SUPPORTING ───────────────────────────── */}
        <Divider/>
        <section style={{maxWidth:1280,margin:'0 auto',padding:'92px 48px 108px'}}>
          <motion.div
            initial={{opacity:0,y:20}}
            whileInView={{opacity:1,y:0}}
            viewport={{once:true}}
            transition={{duration:.7}}
            style={{marginBottom:52}}
          >
            {/* Dancing Script section heading */}
            <div style={{display:'flex',alignItems:'center',gap:22,marginBottom:14}}>
              <ScriptHead size="clamp(2rem,4vw,3.4rem)">
                Additional Projects
              </ScriptHead>
              <motion.div
                initial={{scaleX:0}} whileInView={{scaleX:1}}
                viewport={{once:true}} transition={{duration:.9,delay:.55}}
                style={{
                  flex:1,height:1,
                  background:'linear-gradient(90deg,rgba(255,255,255,.12),transparent)',
                  transformOrigin:'left',maxWidth:220,
                }}
              />
            </div>
            <p style={{fontSize:'1.02rem',color:T.textMuted,fontWeight:500,maxWidth:460}}>
              ML and NLP systems covering classification, prediction, and text analysis
            </p>
          </motion.div>

          <div style={{
            display:'grid',
            gridTemplateColumns:'repeat(auto-fit,minmax(295px,1fr))',
            gap:26,
          }}>
            {supporting.map((p,i)=>(
              <CompactCard key={p.id} project={p} delay={i*.09}/>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}