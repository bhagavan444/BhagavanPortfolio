import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ExternalLink, Github, ArrowRight, Sparkles, TrendingUp,
  Zap, Server, Code2, Target, AlertCircle, Eye, Move,
  Calendar, Mail, MapPin, Star, Award, Cpu,
  BrainCircuit, Layers, Rocket, ChevronRight, Clock,
  CheckCircle2, Globe, Send
} from 'lucide-react';
import resumeImg from "../assets/resume.jpg";
import chatImg from "../assets/chat.jpeg";
import carrerImg from "../assets/carrer.jpg";
import fakeImg from "../assets/fake.jpg";
import heartImg from "../assets/heart.jpg";
import leaveImg from "../assets/leave.jpg";

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
body{font-family:'Plus Jakarta Sans',sans-serif;background:#080808;color:#fff;line-height:1.6;-webkit-font-smoothing:antialiased;overflow-x:hidden;cursor:none!important}
*{cursor:none!important}
::selection{background:rgba(255,255,255,0.13);color:#fff}
::-webkit-scrollbar{width:5px}
::-webkit-scrollbar-track{background:#080808}
::-webkit-scrollbar-thumb{background:rgba(255,255,255,0.16);border-radius:3px}
::-webkit-scrollbar-thumb:hover{background:rgba(255,255,255,0.3)}
@keyframes __blink{0%,100%{opacity:1}50%{opacity:0}}
@keyframes __glowBorder{0%,100%{box-shadow:0 0 0 1px rgba(255,255,255,0.07)}50%{box-shadow:0 0 0 1px rgba(255,255,255,0.18),0 0 22px rgba(255,255,255,0.05)}}
@keyframes __counterGlow{0%,100%{text-shadow:0 0 0 transparent}50%{text-shadow:0 0 24px rgba(255,255,255,.18)}}
@keyframes __marquee{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
@keyframes __marqueeRev{0%{transform:translateX(-50%)}100%{transform:translateX(0)}}
@keyframes __orbFloat{0%,100%{transform:translate(0,0) scale(1)}33%{transform:translate(30px,-20px) scale(1.05)}66%{transform:translate(-20px,15px) scale(0.97)}}
.marquee-track{animation:__marquee 28s linear infinite}
.marquee-track-rev{animation:__marqueeRev 32s linear infinite}
input,select{color-scheme:dark}
@media(max-width:768px){body{cursor:auto!important}*{cursor:auto!important}}
@media(prefers-reduced-motion:reduce){*,*::before,*::after{animation-duration:.01ms!important;transition-duration:.01ms!important}}
`;

/* ═══════════════════════════════════════════════════════
   ALL 6 PROJECTS
═══════════════════════════════════════════════════════ */
const allProjects = [
  {
    id:1,title:"Automated Leave Management System",
    tagline:"Enterprise workflow automation using Microsoft PowerApps",
    subtitle:"Low-code HR leave approval system integrated with Microsoft 365",
    github:null,live:null,year:"2025",duration:"3 months",
    problem:"Many organizations still manage leave requests through emails or spreadsheets, resulting in delays, approval confusion, and lack of centralized tracking for HR teams.",
    solution:"Built an automated leave approval system using Microsoft PowerApps integrated with SharePoint and Power Automate. Employees submit requests via a responsive interface while approval workflows automatically notify managers and HR.",
    impact:[{label:"Workflow Automation",value:100,suffix:"%"},{label:"Approval Steps",value:3,suffix:""},{label:"Users Supported",value:50,suffix:"+"}],
    architecture:[{label:"Frontend",value:"Microsoft PowerApps responsive employee portal"},{label:"Workflow Engine",value:"Power Automate approval pipelines"},{label:"Database",value:"SharePoint Lists storing leave records"},{label:"Notifications",value:"Automated Outlook email alerts"},{label:"Security",value:"Role-based Microsoft 365 permissions"}],
    techStack:{Frontend:["Microsoft PowerApps"],Backend:["Power Automate"],Database:["SharePoint"],Integration:["Microsoft 365","Outlook"],Tools:["Power Platform"]},
    challenges:[{title:"Multi-Level Approval Workflow",description:"Different departments required multiple approval layers.",solution:"Designed dynamic conditional approval flows using Power Automate."}],
    results:["Automated leave request submission and approval process","Centralized leave database for HR teams","Reduced manual email approvals","Improved transparency for employees and managers"],
    learned:"Enterprise workflow automation requires careful design of approval hierarchies and access control.",
    screenshot:leaveImg
  },
  {
    id:2,title:"ATS-Based Resume Builder",
    tagline:"MERN stack resume optimization platform",
    subtitle:"Keyword-weighted scoring against job descriptions",
    github:"https://github.com/bhagavan444/Resumebuilderwebapp",live:null,year:"2025",duration:"3 months",
    problem:"Most resume builders create visually appealing resumes but fail ATS parsing systems used by recruiters, causing qualified candidates to be filtered out before a human even reviews their application.",
    solution:"Developed a MERN platform where users create structured resumes and compare them against job descriptions using keyword scoring algorithms, with real-time ATS score feedback and improvement suggestions.",
    impact:[{label:"ATS Score",value:90,suffix:"%"},{label:"Templates",value:5,suffix:""},{label:"Auth Providers",value:2,suffix:""}],
    architecture:[{label:"Frontend",value:"React resume builder with real-time preview"},{label:"Backend",value:"Node.js + Express scoring API"},{label:"Authentication",value:"Google & GitHub OAuth via Passport.js"},{label:"Scoring Engine",value:"Keyword relevance and density matching"},{label:"Database",value:"MongoDB Atlas with flexible resume schema"}],
    techStack:{Frontend:["React","CSS","JavaScript"],Backend:["Node.js","Express"],Database:["MongoDB"],Auth:["OAuth","JWT"],Tools:["Git","Postman"]},
    challenges:[{title:"Keyword Matching Accuracy",description:"Job descriptions use inconsistent skill naming across industries.",solution:"Implemented token normalization and synonym mapping before keyword scoring."}],
    results:["ATS score calculation based on job descriptions","Multiple resume templates supported","Secure OAuth login via Google & GitHub","Flexible MongoDB schema for dynamic resume sections"],
    learned:"Semantic resume structure and keyword density matter far more than visual design for ATS compatibility.",
    screenshot:resumeImg
  },
  {
    id:3,title:"AI Chatbot Web Application",
    tagline:"AI-powered conversational assistant",
    subtitle:"React frontend with Flask backend and AI API integration",
    github:"https://github.com/bhagavan444/chatbotwebapp",live:null,year:"2025",duration:"4 months",
    problem:"Client-side chatbot implementations expose API keys in browser code and cannot maintain multi-turn conversation context, creating both security risks and poor user experiences.",
    solution:"Implemented a Flask backend that manages all AI API communication and server-side session state, while the React frontend handles only UI rendering and WebSocket streaming for real-time token delivery.",
    impact:[{label:"Response Time",value:500,suffix:"ms"},{label:"Security Breaches",value:0,suffix:""},{label:"Conversation Turns",value:15,suffix:"+"}],
    architecture:[{label:"Frontend",value:"React chat interface with SSE streaming"},{label:"Backend",value:"Flask REST API with session management"},{label:"Security",value:"Server-side API key vault — zero client exposure"},{label:"Context",value:"Session-based multi-turn conversation memory"}],
    techStack:{Frontend:["React","JavaScript"],Backend:["Flask","Python"],AI:["LLM API"],Tools:["Git","Postman"]},
    challenges:[{title:"Maintaining Conversation Context",description:"Stateless HTTP APIs lose chat history between requests, breaking coherent multi-turn dialogue.",solution:"Implemented Flask session-based context arrays that persist conversation history server-side across requests."}],
    results:["Secure AI API integration with zero key exposure","Multi-turn conversation support up to 15+ turns","Sub-500ms streamed response latency","Clean separation between UI and AI logic layers"],
    learned:"Backend-controlled API layers are essential for both security and maintaining stateful AI conversations.",
    screenshot:chatImg
  },
  {
    id:4,title:"Career Path Recommendation System",
    tagline:"Machine learning based career advisor",
    subtitle:"Predicts career domains based on user skills and interests",
    github:"https://github.com/bhagavan444/Career-Path-Recommendation",live:null,year:"2024",duration:"2 months",
    problem:"Students and fresh graduates often struggle to identify suitable career paths from their skill sets and academic backgrounds, leading to poor major and role choices with long-term career consequences.",
    solution:"Built a supervised ML classification model trained on a curated career-skills dataset that maps user skill profiles and academic scores to the most compatible career domains, served via a Flask API with React UI.",
    impact:[{label:"Accuracy",value:88,suffix:"%"},{label:"Career Domains",value:20,suffix:"+"},{label:"Prediction Time",value:180,suffix:"ms"}],
    architecture:[{label:"Frontend",value:"React skill input UI with domain result display"},{label:"Backend",value:"Flask ML inference REST API"},{label:"Model",value:"Random Forest supervised classifier — 20+ classes"},{label:"Dataset",value:"Curated career-skills dataset with balanced sampling"},{label:"Evaluation",value:"5-fold cross-validation, F1 and accuracy metrics"}],
    techStack:{Frontend:["React"],Backend:["Flask","Python"],ML:["Scikit-learn","Random Forest"],DataProcessing:["Pandas","NumPy"],Tools:["Jupyter","Matplotlib"]},
    challenges:[{title:"Dataset Labeling & Class Imbalance",description:"Mapping diverse skill sets to 20+ career domains required manual curation, and some domains had significantly fewer training samples.",solution:"Built structured labeled datasets and applied SMOTE oversampling on minority career classes to balance the training distribution."}],
    results:["88% accuracy across 20+ career domain classifications","Sub-200ms prediction response via optimized Flask API","Clear confidence score breakdown per career domain","Reusable sklearn pipeline for future model retraining"],
    learned:"Feature selection and class balance are the two biggest levers for ML classification accuracy — more than model choice.",
    screenshot:carrerImg
  },
  {
    id:5,title:"Fake News Detection System",
    tagline:"NLP-based misinformation classifier",
    subtitle:"Classifies news articles using TF-IDF and ML algorithms",
    github:"https://github.com/bhagavan444/News-detector",live:null,year:"2023",duration:"2 months",
    problem:"Online misinformation spreads virally due to the absence of accessible, real-time automated classification tools that ordinary users and platforms can deploy at scale.",
    solution:"Developed an NLP classification pipeline using TF-IDF vectorization and Logistic Regression trained on 40K labeled articles to classify news as real or fake, with a web interface for live article analysis.",
    impact:[{label:"Accuracy",value:92,suffix:"%"},{label:"Dataset Size",value:40,suffix:"K"},{label:"Prediction Time",value:90,suffix:"ms"}],
    architecture:[{label:"Text Processing",value:"TF-IDF with unigram and bigram feature extraction"},{label:"Model",value:"Logistic Regression with L2 regularization"},{label:"Dataset",value:"40K labeled real and fake news articles (ISOT)"},{label:"Preprocessing",value:"Tokenization, stopword removal, and lemmatization"},{label:"Evaluation",value:"Accuracy, precision, recall, F1 — confusion matrix analysis"}],
    techStack:{NLP:["TF-IDF","NLTK","Tokenization"],ML:["Scikit-learn","Logistic Regression"],Language:["Python"],DataProcessing:["Pandas","NumPy"],Tools:["Jupyter","Seaborn"]},
    challenges:[{title:"Text Noise & Preprocessing Pipeline",description:"Raw news articles contain HTML artifacts, special characters, domain slang, and inconsistent vocabulary that severely distort raw feature extraction.",solution:"Built a robust multi-stage preprocessing pipeline: HTML stripping → lowercasing → tokenization → stopword removal → punctuation filtering → lemmatization before TF-IDF vectorization."}],
    results:["92% classification accuracy on 40K article dataset","Sub-100ms inference time per article","Robust preprocessing pipeline handles real-world noisy text","Reusable NLP feature extraction module for future text tasks"],
    learned:"Preprocessing pipeline quality is the single most impactful factor in NLP model performance — far more than model selection.",
    screenshot:fakeImg
  },
  {
    id:6,title:"Heart Disease Prediction System",
    tagline:"Clinical ML model for cardiovascular risk prediction",
    subtitle:"Predicts heart disease risk using patient clinical data",
    github:"https://github.com/bhagavan444/Heart-Disease-Prediction",live:null,year:"2024",duration:"2 months",
    problem:"Early-stage heart disease detection is life-critical yet depends on slow, expensive clinical interpretation of multiple diagnostic parameters — a process that benefits enormously from automated risk screening.",
    solution:"Trained a Random Forest classifier on 13 clinical features from the UCI Heart Disease dataset with cross-validation, deployed via a Flask form interface enabling real-time cardiovascular risk screening assistance.",
    impact:[{label:"Accuracy",value:85,suffix:"%"},{label:"Clinical Features",value:13,suffix:""},{label:"Precision",value:83,suffix:"%"}],
    architecture:[{label:"Frontend",value:"Flask-rendered clinical input form"},{label:"Model",value:"Random Forest with feature importance ranking"},{label:"Dataset",value:"UCI Heart Disease — 303 patient records, 13 features"},{label:"Prediction",value:"Real-time binary cardiovascular risk classification"},{label:"Validation",value:"5-fold stratified cross-validation for generalization"}],
    techStack:{ML:["Scikit-learn","Random Forest"],Backend:["Flask","Python"],Database:["SQLite"],DataProcessing:["Pandas","NumPy"],Visualization:["Matplotlib","Seaborn"]},
    challenges:[{title:"Overfitting on Small Medical Dataset",description:"The UCI dataset has only 303 records — a tiny sample for a clinical prediction task, causing high model variance and poor generalization in early iterations.",solution:"Applied 5-fold stratified cross-validation, max_depth tuning, and feature importance-guided selection to reduce overfitting while preserving the most clinically relevant input features."}],
    results:["85% test accuracy with 83% precision on held-out data","Feature importance identified top 5 clinical predictors (chest pain, thalach, ca, thal, oldpeak)","Lightweight Flask UI for real-time clinical screening","Documented cross-validation results for reproducibility"],
    learned:"For small medical datasets, proper cross-validation and regularization matter far more than model complexity.",
    screenshot:heartImg
  }
];

/* ═══════════════════════════════════════════════════════
   MAGNETIC CURSOR
═══════════════════════════════════════════════════════ */
const MagneticCursor = () => {
  const outerRef=useRef(null);const innerRef=useRef(null);const trailRef=useRef(null);
  const [variant,setVariant]=useState('default');const [label,setLabel]=useState('');
  const mouse=useRef({x:-300,y:-300});const outer=useRef({x:-300,y:-300});const trail=useRef({x:-300,y:-300});const raf=useRef(null);
  useEffect(()=>{
    const lerp=(a,b,t)=>a+(b-a)*t;
    const tick=()=>{
      outer.current.x=lerp(outer.current.x,mouse.current.x,.13);outer.current.y=lerp(outer.current.y,mouse.current.y,.13);
      trail.current.x=lerp(trail.current.x,mouse.current.x,.055);trail.current.y=lerp(trail.current.y,mouse.current.y,.055);
      if(outerRef.current)outerRef.current.style.transform=`translate(${outer.current.x}px,${outer.current.y}px) translate(-50%,-50%)`;
      if(trailRef.current)trailRef.current.style.transform=`translate(${trail.current.x}px,${trail.current.y}px) translate(-50%,-50%)`;
      raf.current=requestAnimationFrame(tick);
    };
    raf.current=requestAnimationFrame(tick);
    const onMove=e=>{mouse.current={x:e.clientX,y:e.clientY};if(innerRef.current)innerRef.current.style.transform=`translate(${e.clientX}px,${e.clientY}px) translate(-50%,-50%)`;};
    const onEnter=e=>{const el=e.target.closest('a,button,[data-cursor]');if(el){const t=el.getAttribute('data-cursor-text')||'';setLabel(t);setVariant(t?'text':'hover');}};
    const onLeave=e=>{if(e.target.closest('a,button,[data-cursor]')){setLabel('');setVariant('default');}};
    window.addEventListener('mousemove',onMove,{passive:true});
    document.addEventListener('mouseenter',onEnter,true);document.addEventListener('mouseleave',onLeave,true);
    return()=>{cancelAnimationFrame(raf.current);window.removeEventListener('mousemove',onMove);document.removeEventListener('mouseenter',onEnter,true);document.removeEventListener('mouseleave',onLeave,true);};
  },[]);
  const isHov=variant==='hover'||variant==='text';const isTxt=variant==='text';const sz=isTxt?100:isHov?76:50;
  return(<>
    <div ref={trailRef} style={{position:'fixed',top:0,left:0,pointerEvents:'none',zIndex:9996,width:isHov?92:68,height:isHov?92:68,borderRadius:'50%',border:'1px solid rgba(255,255,255,0.055)',transition:'width .4s ease,height .4s ease',willChange:'transform'}}/>
    <div ref={outerRef} style={{position:'fixed',top:0,left:0,pointerEvents:'none',zIndex:9999,width:sz,height:sz,borderRadius:'50%',border:`2px solid ${isHov?'rgba(255,255,255,0.88)':'rgba(255,255,255,0.48)'}`,background:isTxt?'rgba(255,255,255,0.11)':isHov?'rgba(255,255,255,0.05)':'rgba(255,255,255,0.015)',backdropFilter:'blur(3px)',boxShadow:isHov?'0 0 20px rgba(255,255,255,0.07)':'none',transition:'width .28s cubic-bezier(.34,1.56,.64,1),height .28s cubic-bezier(.34,1.56,.64,1),border-color .2s,background .2s',display:'flex',alignItems:'center',justifyContent:'center',willChange:'transform'}}>
      {isTxt&&label&&<span style={{fontFamily:T.fontMono,fontSize:'9px',fontWeight:700,color:'#fff',textTransform:'uppercase',letterSpacing:'1.5px',textAlign:'center',lineHeight:1.2,padding:'0 6px'}}>{label}</span>}
      {isHov&&!isTxt&&<Move size={13} color="rgba(255,255,255,0.78)"/>}
    </div>
    <div ref={innerRef} style={{position:'fixed',top:0,left:0,pointerEvents:'none',zIndex:10000,width:isTxt?0:5,height:isTxt?0:5,borderRadius:'50%',background:'#fff',boxShadow:'0 0 8px rgba(255,255,255,0.7)',opacity:isTxt?0:1,transition:'width .15s,height .15s,opacity .15s',willChange:'transform'}}/>
  </>);
};

/* ═══════════════════════════════════════════════════════
   PARALLAX HOOK
═══════════════════════════════════════════════════════ */
const useParallax=(strength=22)=>{
  const [off,setOff]=useState({x:0,y:0});const ref=useRef(null);
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
   MAG BUTTON
═══════════════════════════════════════════════════════ */
const MagBtn=({children,href,external=false,style={},cursorText='',onClick})=>{
  const ref=useRef(null);const [pos,setPos]=useState({x:0,y:0});const [hov,setHov]=useState(false);
  const onMove=e=>{if(!ref.current)return;const{width,height,left,top}=ref.current.getBoundingClientRect();setPos({x:(e.clientX-(left+width/2))*.18,y:(e.clientY-(top+height/2))*.18});};
  const reset=()=>{setPos({x:0,y:0});setHov(false);};
  const inner=(
    <motion.div ref={ref} onMouseMove={onMove} onMouseEnter={()=>setHov(true)} onMouseLeave={reset} onClick={onClick}
      animate={{x:pos.x,y:pos.y}} transition={{type:'spring',stiffness:320,damping:26,mass:.1}}
      whileHover={{scale:1.035}} whileTap={{scale:.96}} data-cursor-text={cursorText}
      style={{position:'relative',overflow:'hidden',...style}}>
      {children}
      {hov&&<motion.div initial={{scale:0,opacity:.65}} animate={{scale:3.2,opacity:0}} transition={{duration:.6}} style={{position:'absolute',inset:0,borderRadius:'inherit',pointerEvents:'none',background:'radial-gradient(circle,rgba(255,255,255,0.18) 0%,transparent 70%)'}}/>}
    </motion.div>
  );
  if(href)return<a href={href} target={external?'_blank':undefined} rel={external?'noopener noreferrer':undefined} style={{textDecoration:'none'}}>{inner}</a>;
  return inner;
};

/* ═══════════════════════════════════════════════════════
   COUNTER
═══════════════════════════════════════════════════════ */
const Counter=({value,suffix=''})=>{
  const [n,setN]=useState(0);const ref=useRef(null);const done=useRef(false);
  useEffect(()=>{
    const obs=new IntersectionObserver(([e])=>{if(e.isIntersecting&&!done.current){done.current=true;const end=parseFloat(value),inc=end/(1900/16);let s=0;const t=setInterval(()=>{s+=inc;if(s>=end){setN(end);clearInterval(t);}else setN(Math.floor(s));},16);}},{threshold:.4});
    if(ref.current)obs.observe(ref.current);return()=>obs.disconnect();
  },[value]);
  return<span ref={ref}>{n}{suffix}</span>;
};

/* ═══════════════════════════════════════════════════════
   PARTICLES
═══════════════════════════════════════════════════════ */
const Particles=()=>(
  <div style={{position:'absolute',inset:0,overflow:'hidden',pointerEvents:'none',zIndex:0}}>
    {Array.from({length:14},(_,i)=>(
      <motion.div key={i} style={{position:'absolute',width:i%3===0?4:2.5,height:i%3===0?4:2.5,borderRadius:'50%',background:'rgba(255,255,255,0.26)',left:`${(i*7.4+4)%100}%`,top:`${(i*13.6+7)%100}%`}}
        animate={{y:[0,-34,0],x:[0,(i%2===0?9:-9),0],opacity:[0,.48,0],scale:[0,1,0]}} transition={{duration:3.4+(i%4)*.9,repeat:Infinity,delay:(i%6)*.55,ease:'easeInOut'}}/>
    ))}
  </div>
);

/* ═══════════════════════════════════════════════════════
   SCRIPT HEAD  — simple fade-up reveal, zero white-bar issues
═══════════════════════════════════════════════════════ */
const ScriptHead=({children,size='clamp(2rem,4vw,3.8rem)',delay=0,italic=false,muted=false,style={}})=>{
  const ref=useRef(null);
  const [vis,setVis]=useState(false);
  useEffect(()=>{
    const obs=new IntersectionObserver(([e])=>{if(e.isIntersecting)setVis(true);},{threshold:.15});
    if(ref.current)obs.observe(ref.current);
    return()=>obs.disconnect();
  },[]);
  return(
    <div ref={ref} style={{display:'inline-block',overflow:'hidden',...style}}>
      <motion.span
        initial={{y:'105%',opacity:0}}
        animate={vis?{y:'0%',opacity:1}:{y:'105%',opacity:0}}
        transition={{duration:.65,delay,ease:[.22,1,.36,1]}}
        style={{
          fontFamily:T.fontScript,fontWeight:700,fontSize:size,
          color:muted?T.textSec:T.textPri,
          lineHeight:1.15,letterSpacing:'0.01em',
          fontStyle:italic?'italic':'normal',
          display:'inline-block',
        }}
      >
        {children}
      </motion.span>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════
   DIVIDER
═══════════════════════════════════════════════════════ */
const Divider=()=>(
  <motion.div initial={{scaleX:0,opacity:0}} whileInView={{scaleX:1,opacity:1}} viewport={{once:true}} transition={{duration:1.1,ease:[.25,.1,.25,1]}}
    style={{height:1,background:'linear-gradient(90deg,transparent,rgba(255,255,255,0.11) 30%,rgba(255,255,255,0.11) 70%,transparent)',transformOrigin:'left'}}/>
);

/* ═══════════════════════════════════════════════════════
   FLAGSHIP PROJECT  — same style for all 6
═══════════════════════════════════════════════════════ */
const FlagshipProject=({project,index})=>{
  const [tab,setTab]=useState('architecture');
  const [imgHov,setImgHov]=useState(false);
  const isEven=index%2===0;
  const [pRef,pOff]=useParallax(28);
  const tabs=['architecture','tech','challenges','results'];

  return(<>
    <Divider/>
    <motion.section ref={pRef} initial={{opacity:0,y:55}} whileInView={{opacity:1,y:0}} viewport={{once:true,margin:'-70px'}} transition={{duration:.75,ease:[.25,.1,.25,1]}}
      style={{position:'relative',padding:'96px 0',overflow:'hidden'}}>
      <Particles/>
      <motion.div animate={{opacity:[.025,.06,.025],scale:[1,1.07,1]}} transition={{duration:7,repeat:Infinity,ease:'easeInOut'}}
        style={{position:'absolute',inset:0,pointerEvents:'none',background:`radial-gradient(ellipse at ${isEven?'15%':'85%'} 42%,rgba(255,255,255,0.05) 0%,transparent 52%)`,x:pOff.x*.45,y:pOff.y*.45}}/>
      <motion.div style={{position:'absolute',top:'8%',left:isEven?'2%':'auto',right:isEven?'auto':'2%',fontFamily:T.fontScript,fontSize:'clamp(5rem,13vw,16rem)',fontWeight:700,color:'rgba(255,255,255,0.016)',pointerEvents:'none',userSelect:'none',lineHeight:1,x:pOff.x*-.28,y:pOff.y*-.28}}>
        {project.title.split(' ')[0]}
      </motion.div>

      <div style={{maxWidth:1280,margin:'0 auto',padding:'0 48px',position:'relative',zIndex:1}}>
        <motion.div initial={{opacity:0,x:isEven?-18:18}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{duration:.6}}
          style={{display:'inline-flex',alignItems:'center',gap:8,padding:'5px 14px',background:T.surface,border:`1px solid ${T.borderSoft}`,borderRadius:100,fontFamily:T.fontMono,fontSize:'0.67rem',fontWeight:700,color:T.textMuted,letterSpacing:'0.1em',textTransform:'uppercase',marginBottom:38}}>
          <span style={{opacity:.4}}>—</span><span>0{index+1}</span><span style={{opacity:.28}}>·</span><span>{project.year}</span>
        </motion.div>
      </div>

      <div style={{maxWidth:1280,margin:'0 auto',padding:'0 48px',position:'relative',zIndex:1}}>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(420px,1fr))',gap:68,alignItems:'start',direction:isEven?'ltr':'rtl'}}>

          {/* IMAGE SIDE */}
          <motion.div style={{direction:'ltr',position:'relative'}} initial={{opacity:0,x:isEven?-42:42}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{duration:.75,delay:.12}}>
            <motion.div animate={{y:[0,-5,0]}} transition={{duration:3.6,repeat:Infinity,ease:'easeInOut'}}
              style={{display:'inline-flex',alignItems:'center',gap:7,padding:'6px 14px',background:T.surface,border:`1px solid ${T.borderStrong}`,borderRadius:100,fontFamily:T.fontMono,fontSize:'0.68rem',fontWeight:700,color:T.textSec,letterSpacing:'0.07em',textTransform:'uppercase',marginBottom:15,boxShadow:'0 4px 16px rgba(0,0,0,.55)'}}>
              <motion.div animate={{rotate:360}} transition={{duration:3,repeat:Infinity,ease:'linear'}}><Sparkles size={10} color={T.accent}/></motion.div>
              <span>Built With Precision</span>
            </motion.div>

            <motion.div onHoverStart={()=>setImgHov(true)} onHoverEnd={()=>setImgHov(false)} whileHover={{scale:1.018,rotateY:1.8,rotateX:-1}} transition={{duration:.42}} data-cursor-text="VIEW"
              style={{position:'relative',borderRadius:22,overflow:'hidden',boxShadow:'0 28px 70px rgba(0,0,0,.75)',border:`1px solid ${T.borderSoft}`,transformStyle:'preserve-3d',background:T.surface}}>
              <div style={{position:'absolute',inset:0,zIndex:3,pointerEvents:'none',background:'repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(255,255,255,0.012) 2px,rgba(255,255,255,0.012) 4px)'}}/>
              {imgHov&&<motion.div initial={{top:'-2px',opacity:0}} animate={{top:'104%',opacity:[0,.5,.5,0]}} transition={{duration:1.9,ease:'linear',repeat:Infinity}} style={{position:'absolute',left:0,right:0,height:2,zIndex:4,background:'linear-gradient(90deg,transparent,rgba(255,255,255,.6),transparent)',pointerEvents:'none'}}/>}
              <div style={{position:'absolute',top:0,left:0,right:0,height:2,zIndex:5,pointerEvents:'none',background:'linear-gradient(90deg,transparent,rgba(255,255,255,.32) 50%,transparent)'}}/>
              <motion.img src={project.screenshot} alt={project.title} style={{width:'100%',height:'auto',display:'block'}} animate={imgHov?{scale:1.07}:{scale:1}} transition={{duration:.5}}/>
              <AnimatePresence>
                {imgHov&&<motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} style={{position:'absolute',inset:0,zIndex:4,background:'rgba(0,0,0,.62)',backdropFilter:'blur(5px)',display:'flex',alignItems:'center',justifyContent:'center',borderRadius:22}}>
                  <motion.div initial={{scale:.55,opacity:0}} animate={{scale:1,opacity:1}} transition={{type:'spring',stiffness:240,damping:18}}><Eye size={42} color="#fff"/></motion.div>
                </motion.div>}
              </AnimatePresence>
            </motion.div>

            <motion.div initial={{opacity:0}} whileInView={{opacity:1}} viewport={{once:true}} transition={{delay:.5}} style={{display:'flex',gap:14,marginTop:16,alignItems:'center'}}>
              {[project.year,project.duration].map((v,i)=>(
                <React.Fragment key={i}>
                  <motion.span whileHover={{color:T.textPri}} style={{fontFamily:T.fontMono,fontSize:'0.77rem',color:T.textMuted,transition:'color .2s',cursor:'none'}}>{v}</motion.span>
                  {i===0&&<span style={{color:'rgba(255,255,255,.18)',fontSize:'0.7rem'}}>·</span>}
                </React.Fragment>
              ))}
            </motion.div>
          </motion.div>

          {/* CONTENT SIDE */}
          <div style={{direction:'ltr',display:'flex',flexDirection:'column',gap:32}}>
            {/* Title */}
            <div>
              <motion.div initial={{opacity:0,y:22}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:.65}}>
                <div style={{position:'relative',display:'inline-block',width:'fit-content'}}>
                  <h2 style={{fontFamily:T.fontScript,fontWeight:700,fontSize:'clamp(2.1rem,3.8vw,3.9rem)',lineHeight:1.1,color:T.textPri}}>{project.title}</h2>
                  <motion.div initial={{width:0,opacity:0}} whileInView={{width:'100%',opacity:1}} viewport={{once:true}} transition={{duration:1.0,delay:.35}} style={{position:'absolute',bottom:-10,left:0,height:3,background:T.accent,borderRadius:2,boxShadow:'0 0 10px rgba(255,255,255,.25)',transformOrigin:'left'}}/>
                </div>
              </motion.div>
              <motion.p initial={{opacity:0}} whileInView={{opacity:1}} viewport={{once:true}} transition={{delay:.35}} style={{marginTop:22,fontFamily:T.fontScript,fontWeight:600,fontSize:'1.22rem',color:T.textSec}}>{project.subtitle}</motion.p>
              <motion.p initial={{opacity:0}} whileInView={{opacity:1}} viewport={{once:true}} transition={{delay:.45}} style={{marginTop:8,fontSize:'0.9rem',color:T.textMuted,fontWeight:500,lineHeight:1.72}}>{project.tagline}</motion.p>
            </div>

            {/* Impact */}
            <motion.div initial={{opacity:0,y:16}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:.18}} style={{display:'flex',padding:'24px 0',borderTop:`1px solid ${T.borderSoft}`,borderBottom:`1px solid ${T.borderSoft}`}}>
              {project.impact.map((m,i)=>(
                <motion.div key={i} initial={{opacity:0,scale:.82}} whileInView={{opacity:1,scale:1}} viewport={{once:true}} transition={{delay:.28+i*.1}} whileHover={{y:-5,scale:1.07}}
                  style={{display:'flex',flexDirection:'column',gap:8,flex:1,cursor:'none',borderRight:i<project.impact.length-1?`1px solid ${T.borderSoft}`:'none',paddingRight:i<project.impact.length-1?20:0,paddingLeft:i>0?20:0}}>
                  <div style={{fontFamily:T.fontMono,fontWeight:900,fontSize:'clamp(1.9rem,3vw,3.1rem)',lineHeight:1,color:T.textPri,animation:'__counterGlow 3s ease-in-out infinite'}}>
                    <Counter value={m.value} suffix={m.suffix}/>
                  </div>
                  <div style={{fontFamily:T.fontMono,fontSize:'0.65rem',color:T.textMuted,textTransform:'uppercase',letterSpacing:'0.1em',fontWeight:700}}>{m.label}</div>
                </motion.div>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div initial={{opacity:0,y:12}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:.28}} style={{display:'flex',gap:13,flexWrap:'wrap'}}>
              {project.github
                ? <MagBtn href={project.github} external cursorText="CODE" style={{display:'inline-flex',alignItems:'center',gap:10,padding:'12px 24px',borderRadius:12,background:T.accent,color:'#000',fontFamily:T.fontMono,fontSize:'0.77rem',fontWeight:700,letterSpacing:'0.07em',textTransform:'uppercase',boxShadow:'0 4px 22px rgba(255,255,255,.1)',cursor:'none'}}><Github size={14}/><span>Source</span><ArrowRight size={14}/></MagBtn>
                : <div style={{display:'inline-flex',alignItems:'center',gap:10,padding:'12px 24px',borderRadius:12,background:'rgba(255,255,255,0.04)',color:T.textMuted,fontFamily:T.fontMono,fontSize:'0.77rem',fontWeight:700,letterSpacing:'0.07em',textTransform:'uppercase',border:`1px solid ${T.borderSoft}`,opacity:.5}}><Github size={14}/><span>Private</span></div>}
              {project.live
                ? <MagBtn href={project.live} external cursorText="DEMO" style={{display:'inline-flex',alignItems:'center',gap:10,padding:'12px 24px',borderRadius:12,background:'transparent',border:`1.5px solid ${T.borderStrong}`,color:T.textPri,fontFamily:T.fontMono,fontSize:'0.77rem',fontWeight:700,letterSpacing:'0.07em',textTransform:'uppercase',cursor:'none'}}><ExternalLink size={14}/><span>Live Demo</span></MagBtn>
                : <div style={{display:'inline-flex',alignItems:'center',gap:10,padding:'12px 24px',borderRadius:12,background:'transparent',border:`1.5px solid rgba(255,255,255,0.06)`,color:T.textMuted,fontFamily:T.fontMono,fontSize:'0.77rem',fontWeight:700,letterSpacing:'0.07em',textTransform:'uppercase',opacity:.45}}><ExternalLink size={14}/><span>No Demo</span></div>}
            </motion.div>

            {/* Problem / Solution */}
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:13}}>
              {[{label:'Problem',text:project.problem,Icon:AlertCircle},{label:'Solution',text:project.solution,Icon:Target}].map(({label,text,Icon},i)=>(
                <motion.div key={label} initial={{opacity:0,x:i===0?-16:16}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{delay:.26}} whileHover={{scale:1.025,boxShadow:'0 10px 32px rgba(0,0,0,.55)'}}
                  style={{padding:20,borderRadius:16,background:i===0?'rgba(255,255,255,0.018)':'rgba(255,255,255,0.03)',border:`1px solid ${T.borderSoft}`,transition:`all .3s ${T.ease}`}}>
                  <motion.div animate={{rotate:[0,8,-8,0]}} transition={{duration:3.8,repeat:Infinity}} style={{display:'inline-flex',alignItems:'center',justifyContent:'center',width:33,height:33,borderRadius:9,background:'rgba(255,255,255,0.055)',border:`1px solid ${T.borderSoft}`,marginBottom:13}}>
                    <Icon size={14} color={T.accent}/>
                  </motion.div>
                  <div style={{fontFamily:T.fontMono,fontSize:'0.65rem',fontWeight:700,textTransform:'uppercase',letterSpacing:'0.1em',color:T.textMuted,marginBottom:9}}>{label}</div>
                  <div style={{fontSize:'0.835rem',color:T.textSec,lineHeight:1.72,fontWeight:500}}>{text}</div>
                </motion.div>
              ))}
            </div>

            {/* Tabs */}
            <motion.div initial={{opacity:0,y:14}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:.4}} style={{display:'flex',flexDirection:'column',gap:13}}>
              <div style={{display:'flex',gap:4,padding:5,background:T.surface,border:`1px solid ${T.borderSoft}`,borderRadius:14,flexWrap:'wrap'}}>
                {tabs.map(t=>(
                  <motion.button key={t} onClick={()=>setTab(t)} whileHover={{scale:1.04}} whileTap={{scale:.96}} data-cursor-text={t.slice(0,4).toUpperCase()}
                    style={{display:'flex',alignItems:'center',gap:6,padding:'10px 16px',border:'none',borderRadius:10,fontFamily:T.fontMono,fontSize:'0.72rem',fontWeight:700,letterSpacing:'0.06em',textTransform:'uppercase',background:tab===t?T.accent:'transparent',color:tab===t?'#000':T.textMuted,transition:`all .22s ${T.ease}`,cursor:'none',minHeight:42,boxShadow:tab===t?'0 3px 12px rgba(255,255,255,.1)':'none'}}>
                    {t==='architecture'&&<Server size={12}/>}{t==='tech'&&<Code2 size={12}/>}{t==='challenges'&&<TrendingUp size={12}/>}{t==='results'&&<Zap size={12}/>}
                    <span>{t.charAt(0).toUpperCase()+t.slice(1)}</span>
                  </motion.button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                <motion.div key={tab} initial={{opacity:0,y:10,filter:'blur(4px)'}} animate={{opacity:1,y:0,filter:'blur(0px)'}} exit={{opacity:0,y:-8,filter:'blur(3px)'}} transition={{duration:.28}}
                  style={{padding:24,background:T.surfaceEl,border:`1px solid ${T.borderSoft}`,borderRadius:16}}>
                  {tab==='architecture'&&(
                    <div style={{display:'grid',gap:10}}>
                      {project.architecture.map((item,i)=>(
                        <motion.div key={i} initial={{opacity:0,x:-11}} animate={{opacity:1,x:0}} transition={{delay:i*.07}} whileHover={{scale:1.015,x:6,borderColor:T.borderStrong}}
                          style={{padding:'14px 18px',background:T.surface,border:`1px solid ${T.borderSoft}`,borderRadius:11,transition:`all .22s ${T.ease}`,cursor:'none'}}>
                          <div style={{fontFamily:T.fontMono,fontSize:'0.64rem',fontWeight:700,color:T.textMuted,textTransform:'uppercase',letterSpacing:'0.1em',marginBottom:6}}>{item.label}</div>
                          <div style={{fontSize:'0.865rem',color:T.textSec,lineHeight:1.65,fontWeight:500}}>{item.value}</div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                  {tab==='tech'&&(
                    <div style={{display:'grid',gap:20}}>
                      {Object.entries(project.techStack).map(([cat,techs],i)=>(
                        <motion.div key={cat} initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{delay:i*.08}}>
                          <div style={{fontFamily:T.fontMono,fontSize:'0.66rem',fontWeight:700,color:T.textMuted,textTransform:'uppercase',letterSpacing:'0.1em',marginBottom:10}}>{cat.replace('_',' ')}</div>
                          <div style={{display:'flex',flexWrap:'wrap',gap:8}}>
                            {(techs||[]).map((tech,ti)=>(
                              <motion.div key={ti} initial={{opacity:0,scale:0}} animate={{opacity:1,scale:1}} transition={{delay:.14+ti*.05}} whileHover={{scale:1.12,y:-3,background:T.surfaceHov,borderColor:T.borderStrong}}
                                style={{display:'flex',alignItems:'center',gap:7,padding:'8px 14px',background:T.surface,border:`1px solid ${T.borderSoft}`,borderRadius:9,fontFamily:T.fontMono,fontSize:'0.77rem',color:T.textSec,fontWeight:600,cursor:'none',transition:`all .2s ${T.ease}`}}>
                                <motion.div animate={{scale:[1,1.4,1]}} transition={{duration:2.2,repeat:Infinity,delay:ti*.15}} style={{width:6,height:6,borderRadius:'50%',background:T.accent,flexShrink:0}}/>
                                {tech}
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                  {tab==='challenges'&&(
                    <div style={{display:'grid',gap:14}}>
                      {project.challenges.map((ch,i)=>(
                        <motion.div key={i} initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{delay:i*.1}} whileHover={{scale:1.012,y:-4,borderColor:T.borderStrong}}
                          style={{padding:22,background:T.surface,border:`1px solid ${T.borderSoft}`,borderRadius:14,transition:`all .3s ${T.ease}`,cursor:'none'}}>
                          <div style={{fontFamily:T.fontScript,fontWeight:700,fontSize:'1.2rem',color:T.textPri,marginBottom:10}}>{ch.title}</div>
                          <div style={{fontSize:'0.855rem',color:T.textSec,lineHeight:1.72,marginBottom:14,fontWeight:500}}>{ch.description}</div>
                          <div style={{padding:'13px 16px',background:T.surfaceEl,borderRadius:10}}>
                            <div style={{fontFamily:T.fontMono,fontSize:'0.64rem',fontWeight:700,color:T.textMuted,textTransform:'uppercase',letterSpacing:'0.1em',marginBottom:8}}>Solution</div>
                            <div style={{fontSize:'0.855rem',color:T.textSec,lineHeight:1.7,fontWeight:600}}>{ch.solution}</div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                  {tab==='results'&&(
                    <div style={{display:'grid',gap:11}}>
                      {project.results.map((r,i)=>(
                        <motion.div key={i} initial={{opacity:0,x:-11}} animate={{opacity:1,x:0}} transition={{delay:i*.09}} whileHover={{x:9,borderColor:T.borderStrong}}
                          style={{display:'flex',alignItems:'flex-start',gap:13,padding:'13px 17px',background:T.surface,border:`1px solid ${T.borderSoft}`,borderRadius:11,fontSize:'0.855rem',color:T.textSec,lineHeight:1.7,fontWeight:500,transition:`all .22s ${T.ease}`,cursor:'none'}}>
                          <motion.div whileHover={{rotate:360}} transition={{duration:.45}} style={{display:'flex',alignItems:'center',justifyContent:'center',width:26,height:26,flexShrink:0,borderRadius:8,background:'rgba(255,255,255,0.065)',border:`1px solid ${T.borderSoft}`}}>
                            <Zap size={12} color={T.accent}/>
                          </motion.div>
                          {r}
                        </motion.div>
                      ))}
                      <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:.45}} whileHover={{borderColor:T.borderStrong,scale:1.01}}
                        style={{marginTop:8,padding:20,background:T.surface,border:`1px solid ${T.borderSoft}`,borderRadius:14,transition:`all .3s ${T.ease}`,cursor:'none'}}>
                        <div style={{fontFamily:T.fontMono,fontSize:'0.65rem',fontWeight:700,color:T.textMuted,textTransform:'uppercase',letterSpacing:'0.1em',marginBottom:9}}>Lesson Learned</div>
                        <div style={{fontSize:'0.92rem',color:T.textSec,lineHeight:1.78,fontStyle:'italic',fontWeight:500}}>{project.learned}</div>
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
  </>);
};

/* ═══════════════════════════════════════════════════════
   MARQUEE TECH STRIP
═══════════════════════════════════════════════════════ */
const row1=['React','Node.js','MongoDB','Express','Python','Flask','Scikit-learn','TF-IDF','NLTK','PowerApps','Power Automate','SharePoint','OAuth','JWT','Random Forest','Pandas','NumPy'];
const row2=['Matplotlib','Seaborn','Jupyter','Git','Postman','REST APIs','Machine Learning','NLP','Deep Learning','SQL','SQLite','JavaScript','TypeScript','Logistic Regression','Cross-Validation','Feature Engineering'];

const MarqueeTech=()=>(
  <div style={{overflow:'hidden',borderTop:`1px solid ${T.borderSoft}`,borderBottom:`1px solid ${T.borderSoft}`,background:'rgba(255,255,255,0.012)'}}>
    {[{items:row1,cls:'marquee-track'},{items:row2,cls:'marquee-track-rev'}].map((row,ri)=>(
      <div key={ri} style={{display:'flex',overflow:'hidden',padding:'12px 0'}}>
        <div className={row.cls} style={{display:'flex',gap:0,whiteSpace:'nowrap',flexShrink:0}}>
          {[...row.items,...row.items].map((tech,i)=>(
            <motion.span key={i} whileHover={{scale:1.1,color:T.textPri}}
              style={{display:'inline-flex',alignItems:'center',gap:10,padding:'7px 20px',fontFamily:T.fontMono,fontSize:'0.78rem',fontWeight:600,color:T.textSec,cursor:'none',flexShrink:0,transition:`color .2s ${T.ease}`}}>
              <span style={{width:5,height:5,borderRadius:'50%',background:'rgba(255,255,255,0.28)',display:'inline-block',flexShrink:0}}/>
              {tech}
            </motion.span>
          ))}
        </div>
      </div>
    ))}
  </div>
);

/* ═══════════════════════════════════════════════════════
   CONCLUSION SECTION
═══════════════════════════════════════════════════════ */
const conclusionStats=[
  {value:6,suffix:'',label:'Projects Shipped',Icon:Rocket},
  {value:3,suffix:'+',label:'Internships',Icon:Award},
  {value:90,suffix:'%+',label:'Avg ML Accuracy',Icon:BrainCircuit},
  {value:5,suffix:'+',label:'Tech Stacks',Icon:Layers},
];
const pillars=[
  {icon:Code2,title:"Full-Stack Engineering",body:"From React UIs to Flask and Node.js backends — each project was built end-to-end with clean architecture, RESTful API design, and scalable data models across MongoDB, SQLite, and SharePoint."},
  {icon:BrainCircuit,title:"Applied Machine Learning",body:"Trained, validated, and deployed four production ML models across NLP, classification, and clinical prediction — averaging 88%+ accuracy with proper cross-validation and feature engineering."},
  {icon:Cpu,title:"Enterprise Automation",body:"Designed Microsoft Power Platform workflows adopted by 50+ users, with automated approval chains, email pipelines, and role-based access systems replacing manual processes entirely."},
  {icon:Target,title:"Problem-First Mindset",body:"Every project started with a real pain point — job seekers failing ATS, students unsure about careers, fake news spreading unchecked. Technology was always the tool, never the goal."},
  {icon:Layers,title:"Depth Over Breadth",body:"Rather than collecting frameworks, each project demanded mastery of a specific domain — TF-IDF for NLP, Random Forest tuning for medical data, OAuth flows for auth, SSE streaming for real-time AI."},
  {icon:Rocket,title:"Production Thinking",body:"Security, performance, and maintainability were first-class concerns — server-side API keys, cross-validation to prevent overfitting, preprocessing pipelines, and modular component design throughout."},
];

const ConclusionSection=()=>(
  <section style={{position:'relative',overflow:'hidden',padding:'120px 0 100px',background:T.bg}}>
    <Divider/>
    <div style={{position:'absolute',inset:0,pointerEvents:'none',overflow:'hidden',zIndex:0}}>
      {[{left:'8%',top:'18%',s:420},{left:'72%',top:'55%',s:360},{left:'40%',top:'5%',s:280}].map((o,i)=>(
        <div key={i} style={{position:'absolute',left:o.left,top:o.top,width:o.s,height:o.s,borderRadius:'50%',background:'radial-gradient(circle,rgba(255,255,255,0.028) 0%,transparent 70%)',animation:`__orbFloat ${12+i*4}s ease-in-out infinite`,animationDelay:`${i*2.5}s`}}/>
      ))}
    </div>

    <div style={{maxWidth:1280,margin:'0 auto',padding:'0 48px',position:'relative',zIndex:1}}>

      {/* Heading */}
      <motion.div initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:.8}} style={{textAlign:'center',marginBottom:80}}>
        <motion.div initial={{opacity:0,scale:.9}} whileInView={{opacity:1,scale:1}} viewport={{once:true}} transition={{delay:.1}}
          style={{display:'inline-flex',alignItems:'center',gap:8,padding:'6px 16px',background:T.surface,border:`1px solid ${T.borderSoft}`,borderRadius:100,fontFamily:T.fontMono,fontSize:'0.67rem',fontWeight:700,color:T.textMuted,letterSpacing:'0.12em',textTransform:'uppercase',marginBottom:32}}>
          <Star size={10} color={T.accent}/><span>Portfolio Summary</span>
        </motion.div>
        <div style={{marginBottom:12}}><ScriptHead size="clamp(2.6rem,6vw,6.2rem)">What These Projects</ScriptHead></div>
        <div><ScriptHead size="clamp(2.6rem,6vw,6.2rem)" italic muted delay={0.15}>Say About Me</ScriptHead></div>
        <motion.p initial={{opacity:0,y:16}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:.5}}
          style={{marginTop:28,fontSize:'1.1rem',color:T.textSec,maxWidth:700,margin:'28px auto 0',lineHeight:1.88,fontWeight:400}}>
          Across six projects spanning enterprise automation, full-stack web development, and applied machine learning — a consistent pattern emerges: I build things that <em>actually solve real problems</em>, not just things that look impressive on paper. Each project was driven by genuine frustration, constrained by real-world limitations, and shipped with production-quality engineering decisions. Whether it was eliminating manual HR emails with Power Automate, helping job seekers beat ATS filters with keyword intelligence, or saving lives by flagging cardiovascular risk early — the throughline is always the same: <em>purpose before technology</em>.
        </motion.p>
      </motion.div>

      {/* Stats */}
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))',gap:20,marginBottom:80}}>
        {conclusionStats.map(({value,suffix,label,Icon},i)=>(
          <motion.div key={i} initial={{opacity:0,y:22,scale:.94}} whileInView={{opacity:1,y:0,scale:1}} viewport={{once:true}} transition={{delay:.1+i*.1}} whileHover={{y:-8,scale:1.04,borderColor:T.borderStrong}}
            style={{padding:'28px 24px',background:T.surface,border:`1px solid ${T.borderSoft}`,borderRadius:20,textAlign:'center',cursor:'none',transition:`all .3s ${T.ease}`,position:'relative',overflow:'hidden'}}>
            <motion.div animate={{opacity:[.04,.09,.04]}} transition={{duration:4,repeat:Infinity,delay:i*.8}} style={{position:'absolute',inset:0,background:'radial-gradient(circle at 50% 0%,rgba(255,255,255,0.08),transparent 65%)',pointerEvents:'none'}}/>
            <motion.div animate={{rotate:[0,5,-5,0],scale:[1,1.1,1]}} transition={{duration:4,repeat:Infinity,delay:i*.6}} style={{display:'inline-flex',alignItems:'center',justifyContent:'center',width:44,height:44,borderRadius:14,background:'rgba(255,255,255,0.06)',border:`1px solid ${T.borderSoft}`,marginBottom:16}}>
              <Icon size={18} color={T.accent}/>
            </motion.div>
            <div style={{fontFamily:T.fontMono,fontSize:'clamp(2.2rem,3.5vw,3rem)',fontWeight:900,color:T.textPri,lineHeight:1,marginBottom:10,animation:'__counterGlow 3.5s ease-in-out infinite'}}>
              <Counter value={value} suffix={suffix}/>
            </div>
            <div style={{fontFamily:T.fontMono,fontSize:'0.67rem',color:T.textMuted,textTransform:'uppercase',letterSpacing:'0.1em',fontWeight:700}}>{label}</div>
          </motion.div>
        ))}
      </div>

      {/* 6 pillars */}
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(320px,1fr))',gap:22,marginBottom:80}}>
        {pillars.map(({icon:Icon,title,body},i)=>(
          <motion.div key={i} initial={{opacity:0,y:26,scale:.96}} whileInView={{opacity:1,y:0,scale:1}} viewport={{once:true,margin:'-30px'}} transition={{delay:.06*i,duration:.6}} whileHover={{y:-7,borderColor:T.borderStrong,boxShadow:'0 22px 55px rgba(0,0,0,.55)'}}
            style={{padding:28,background:T.surface,border:`1px solid ${T.borderSoft}`,borderRadius:20,cursor:'none',transition:`all .35s ${T.ease}`,position:'relative',overflow:'hidden'}}>
            <motion.div animate={{opacity:[.03,.07,.03]}} transition={{duration:5,repeat:Infinity,delay:i*.7}} style={{position:'absolute',top:0,left:0,right:0,height:120,background:'linear-gradient(180deg,rgba(255,255,255,0.05),transparent)',pointerEvents:'none'}}/>
            <div style={{display:'flex',alignItems:'center',gap:14,marginBottom:18}}>
              <motion.div whileHover={{rotate:15,scale:1.15}} style={{display:'flex',alignItems:'center',justifyContent:'center',width:42,height:42,borderRadius:12,background:'rgba(255,255,255,0.07)',border:`1px solid ${T.borderSoft}`,flexShrink:0}}>
                <Icon size={18} color={T.accent}/>
              </motion.div>
              <h3 style={{fontFamily:T.fontScript,fontWeight:700,fontSize:'1.35rem',color:T.textPri,lineHeight:1.2}}>{title}</h3>
            </div>
            <p style={{fontSize:'0.9rem',color:T.textSec,lineHeight:1.78,fontWeight:400}}>{body}</p>
            <motion.div initial={{width:0}} whileInView={{width:'55%'}} viewport={{once:true}} transition={{delay:.3+i*.06,duration:.8}} style={{height:2,background:'linear-gradient(90deg,rgba(255,255,255,0.2),transparent)',borderRadius:1,marginTop:22}}/>
          </motion.div>
        ))}
      </div>

      {/* Quote */}
      <motion.div initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:.9,delay:.2}}
        style={{textAlign:'center',padding:'52px 40px',background:T.surface,border:`1px solid ${T.borderSoft}`,borderRadius:28,position:'relative',overflow:'hidden'}}>
        <motion.div animate={{opacity:[.03,.07,.03],scale:[1,1.04,1]}} transition={{duration:6,repeat:Infinity}} style={{position:'absolute',inset:0,background:'radial-gradient(ellipse at 50% 0%,rgba(255,255,255,0.07),transparent 60%)',pointerEvents:'none'}}/>
        <motion.div animate={{rotate:360}} transition={{duration:8,repeat:Infinity,ease:'linear'}} style={{display:'inline-flex',marginBottom:22}}><Sparkles size={22} color="rgba(255,255,255,0.5)"/></motion.div>
        <blockquote style={{fontFamily:T.fontScript,fontSize:'clamp(1.6rem,3.2vw,2.8rem)',fontWeight:700,color:T.textPri,lineHeight:1.35,fontStyle:'italic',maxWidth:880,margin:'0 auto 20px',position:'relative',zIndex:1}}>
          "I don't just write code — I engineer solutions. Every commit is a decision, every architecture choice is a trade-off, and every project is a story of turning real problems into working software that ships."
        </blockquote>
        <p style={{fontFamily:T.fontMono,fontSize:'0.77rem',color:T.textMuted,letterSpacing:'0.1em',textTransform:'uppercase',fontWeight:700,position:'relative',zIndex:1}}>— Bhagavan · Full Stack & ML Engineer</p>
      </motion.div>
    </div>
  </section>
);

/* ═══════════════════════════════════════════════════════
   BIG FOOTER
═══════════════════════════════════════════════════════ */
const Footer=()=>{
  const [form,setForm]=useState({name:'',email:'',date:'',time:'',type:''});
  const [submitted,setSubmitted]=useState(false);
  const [hovC,setHovC]=useState(null);

  const contacts=[
    {Icon:Mail,label:'Email',value:'bhagavan444@gmail.com',href:'mailto:bhagavan444@gmail.com'},
    {Icon:Globe,label:'GitHub',value:'github.com/bhagavan444',href:'https://github.com/bhagavan444'},
    {Icon:MapPin,label:'Location',value:'India · Open to Remote',href:null},
    {Icon:Clock,label:'Availability',value:'Immediate Joiner · 0 Days Notice',href:null},
  ];
  const timeSlots=['9:00 AM','10:00 AM','11:00 AM','2:00 PM','3:00 PM','4:00 PM','5:00 PM'];
  const interviewTypes=['Technical Round','HR Discussion','System Design','Project Walkthrough','General Intro'];

  return(
    <footer style={{background:T.bg,position:'relative',overflow:'hidden'}}>
      <MarqueeTech/>

      <div style={{position:'relative',overflow:'hidden',paddingTop:100,paddingBottom:80}}>
        <motion.div animate={{opacity:[.04,.1,.04]}} transition={{duration:8,repeat:Infinity}} style={{position:'absolute',top:'-20%',left:'50%',transform:'translateX(-50%)',width:900,height:600,borderRadius:'50%',background:'radial-gradient(ellipse,rgba(255,255,255,0.06) 0%,transparent 65%)',pointerEvents:'none',zIndex:0}}/>

        <div style={{maxWidth:1280,margin:'0 auto',padding:'0 48px',position:'relative',zIndex:1}}>

          {/* Two column layout */}
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:80,marginBottom:72,alignItems:'start'}}>

            {/* LEFT: CTA + contacts */}
            <motion.div initial={{opacity:0,x:-36}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{duration:.75}}>
              <motion.div initial={{opacity:0,scale:.9}} whileInView={{opacity:1,scale:1}} viewport={{once:true}} transition={{delay:.1}}
                style={{display:'inline-flex',alignItems:'center',gap:8,padding:'6px 16px',background:T.surface,border:`1px solid ${T.borderSoft}`,borderRadius:100,fontFamily:T.fontMono,fontSize:'0.67rem',fontWeight:700,color:T.textMuted,letterSpacing:'0.12em',textTransform:'uppercase',marginBottom:32}}>
                <motion.div animate={{scale:[1,1.4,1]}} transition={{duration:1.5,repeat:Infinity}} style={{width:7,height:7,borderRadius:'50%',background:'#4ade80'}}/>
                <span>Available for Opportunities</span>
              </motion.div>

              <div style={{marginBottom:10}}><ScriptHead size="clamp(2.4rem,5.5vw,5.5rem)">Let's Build</ScriptHead></div>
              <div><ScriptHead size="clamp(2.4rem,5.5vw,5.5rem)" italic muted delay={0.12}>Something Great</ScriptHead></div>

              <motion.p initial={{opacity:0,y:12}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:.5}} style={{marginTop:28,fontSize:'1.02rem',color:T.textSec,lineHeight:1.88,fontWeight:400,maxWidth:480}}>
                I'm actively looking for full-time roles in Full-Stack Development and ML Engineering. Whether it's a quick intro call, a technical interview, or a project deep-dive — I'm ready. Let's see what we can build together.
              </motion.p>

              {/* Contacts */}
              <div style={{display:'flex',flexDirection:'column',gap:13,marginTop:38}}>
                {contacts.map(({Icon,label,value,href},i)=>(
                  <motion.div key={i} initial={{opacity:0,x:-18}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{delay:.2+i*.08}} onHoverStart={()=>setHovC(i)} onHoverEnd={()=>setHovC(null)}
                    style={{display:'flex',alignItems:'center',gap:14,cursor:href?'none':'default'}}>
                    <motion.div animate={hovC===i?{scale:1.2,rotate:8}:{scale:1,rotate:0}} style={{display:'flex',alignItems:'center',justifyContent:'center',width:38,height:38,borderRadius:11,background:T.surface,border:`1px solid ${hovC===i?T.borderStrong:T.borderSoft}`,flexShrink:0,transition:`border-color .2s ${T.ease}`}}>
                      <Icon size={15} color={hovC===i?T.accent:T.textMuted}/>
                    </motion.div>
                    <div>
                      <div style={{fontFamily:T.fontMono,fontSize:'0.6rem',color:T.textMuted,textTransform:'uppercase',letterSpacing:'0.1em',fontWeight:700,marginBottom:2}}>{label}</div>
                      {href
                        ? <a href={href} target="_blank" rel="noopener noreferrer" data-cursor-text="OPEN" style={{fontFamily:T.fontMono,fontSize:'0.85rem',color:hovC===i?T.textPri:T.textSec,fontWeight:600,textDecoration:'none',transition:`color .2s`}}>{value}</a>
                        : <span style={{fontFamily:T.fontMono,fontSize:'0.85rem',color:T.textSec,fontWeight:600}}>{value}</span>}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Resume */}
              <motion.div initial={{opacity:0,y:12}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:.7}} style={{marginTop:38}}>
                <MagBtn cursorText="GET" style={{display:'inline-flex',alignItems:'center',gap:11,padding:'14px 28px',borderRadius:14,background:T.accent,color:'#000',fontFamily:T.fontMono,fontSize:'0.8rem',fontWeight:700,letterSpacing:'0.07em',textTransform:'uppercase',boxShadow:'0 6px 28px rgba(255,255,255,0.12)',cursor:'none'}}>
                  <Send size={15}/><span>Download Resume</span><ArrowRight size={15}/>
                </MagBtn>
              </motion.div>
            </motion.div>

            {/* RIGHT: Schedule Interview */}
            <motion.div initial={{opacity:0,x:36}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{duration:.75}}>
              <div style={{padding:36,background:T.surface,border:`1px solid ${T.borderSoft}`,borderRadius:24,position:'relative',overflow:'hidden'}}>
                <motion.div animate={{opacity:[.03,.07,.03]}} transition={{duration:5,repeat:Infinity}} style={{position:'absolute',top:0,left:0,right:0,height:160,background:'linear-gradient(180deg,rgba(255,255,255,0.06),transparent)',pointerEvents:'none'}}/>

                <div style={{position:'relative',zIndex:1}}>
                  <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:6}}>
                    <motion.div animate={{rotate:360}} transition={{duration:6,repeat:Infinity,ease:'linear'}} style={{display:'flex',alignItems:'center',justifyContent:'center',width:40,height:40,borderRadius:12,background:'rgba(255,255,255,0.07)',border:`1px solid ${T.borderSoft}`}}>
                      <Calendar size={16} color={T.accent}/>
                    </motion.div>
                    <div>
                      <h3 style={{fontFamily:T.fontScript,fontWeight:700,fontSize:'1.9rem',color:T.textPri,lineHeight:1}}>Schedule Interview</h3>
                      <p style={{fontFamily:T.fontMono,fontSize:'0.65rem',color:T.textMuted,letterSpacing:'0.08em',marginTop:3}}>Book a time that works for you</p>
                    </div>
                  </div>
                  <div style={{height:1,background:`linear-gradient(90deg,${T.borderSoft},transparent)`,margin:'18px 0 24px'}}/>

                  {!submitted ? (
                    <div style={{display:'flex',flexDirection:'column',gap:15}}>
                      {[{key:'name',label:'Your Name *',ph:'John Smith',type:'text'},{key:'email',label:'Company Email *',ph:'hr@company.com',type:'email'}].map(({key,label,ph,type})=>(
                        <div key={key}>
                          <label style={{display:'block',fontFamily:T.fontMono,fontSize:'0.62rem',fontWeight:700,color:T.textMuted,textTransform:'uppercase',letterSpacing:'0.1em',marginBottom:7}}>{label}</label>
                          <input type={type} value={form[key]} onChange={e=>setForm(p=>({...p,[key]:e.target.value}))} placeholder={ph}
                            style={{width:'100%',padding:'11px 15px',background:T.surfaceEl,border:`1px solid ${T.borderSoft}`,borderRadius:10,fontFamily:T.fontMono,fontSize:'0.83rem',color:T.textPri,outline:'none'}}
                            onFocus={e=>e.target.style.borderColor=T.borderStrong} onBlur={e=>e.target.style.borderColor=T.borderSoft}/>
                        </div>
                      ))}

                      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
                        <div>
                          <label style={{display:'block',fontFamily:T.fontMono,fontSize:'0.62rem',fontWeight:700,color:T.textMuted,textTransform:'uppercase',letterSpacing:'0.1em',marginBottom:7}}>Preferred Date</label>
                          <input type="date" value={form.date} onChange={e=>setForm(p=>({...p,date:e.target.value}))}
                            style={{width:'100%',padding:'11px 15px',background:T.surfaceEl,border:`1px solid ${T.borderSoft}`,borderRadius:10,fontFamily:T.fontMono,fontSize:'0.8rem',color:form.date?T.textPri:T.textMuted,outline:'none',colorScheme:'dark'}}
                            onFocus={e=>e.target.style.borderColor=T.borderStrong} onBlur={e=>e.target.style.borderColor=T.borderSoft}/>
                        </div>
                        <div>
                          <label style={{display:'block',fontFamily:T.fontMono,fontSize:'0.62rem',fontWeight:700,color:T.textMuted,textTransform:'uppercase',letterSpacing:'0.1em',marginBottom:7}}>Preferred Time</label>
                          <select value={form.time} onChange={e=>setForm(p=>({...p,time:e.target.value}))}
                            style={{width:'100%',padding:'11px 15px',background:T.surfaceEl,border:`1px solid ${T.borderSoft}`,borderRadius:10,fontFamily:T.fontMono,fontSize:'0.8rem',color:form.time?T.textPri:T.textMuted,outline:'none',appearance:'none',cursor:'none'}}
                            onFocus={e=>e.target.style.borderColor=T.borderStrong} onBlur={e=>e.target.style.borderColor=T.borderSoft}>
                            <option value="" style={{background:T.surfaceEl}}>Select time</option>
                            {timeSlots.map(t=><option key={t} value={t} style={{background:T.surfaceEl}}>{t} IST</option>)}
                          </select>
                        </div>
                      </div>

                      <div>
                        <label style={{display:'block',fontFamily:T.fontMono,fontSize:'0.62rem',fontWeight:700,color:T.textMuted,textTransform:'uppercase',letterSpacing:'0.1em',marginBottom:9}}>Interview Type</label>
                        <div style={{display:'flex',gap:7,flexWrap:'wrap'}}>
                          {interviewTypes.map(type=>(
                            <motion.button key={type} whileHover={{scale:1.05}} whileTap={{scale:.96}} onClick={()=>setForm(p=>({...p,type}))}
                              style={{padding:'8px 13px',borderRadius:9,fontFamily:T.fontMono,fontSize:'0.68rem',fontWeight:700,background:form.type===type?T.accent:'transparent',color:form.type===type?'#000':T.textMuted,border:`1px solid ${form.type===type?T.accent:T.borderSoft}`,cursor:'none',transition:`all .2s ${T.ease}`}}>
                              {type}
                            </motion.button>
                          ))}
                        </div>
                      </div>

                      <div style={{padding:'13px 15px',background:T.surfaceEl,borderRadius:11,border:`1px solid ${T.borderSoft}`}}>
                        <div style={{fontFamily:T.fontMono,fontSize:'0.6rem',fontWeight:700,color:T.textMuted,textTransform:'uppercase',letterSpacing:'0.1em',marginBottom:9}}>Quick Notes</div>
                        <div style={{display:'flex',flexWrap:'wrap',gap:6}}>
                          {['Open to Relocation','Remote Ready','Immediate Joiner','B.Tech CSE 2025','0 Days Notice'].map((tag,i)=>(
                            <span key={i} style={{padding:'4px 10px',background:T.surface,border:`1px solid ${T.borderSoft}`,borderRadius:6,fontFamily:T.fontMono,fontSize:'0.66rem',color:T.textSec,fontWeight:600,display:'flex',alignItems:'center',gap:5}}>
                              <CheckCircle2 size={8} color="rgba(74,222,128,0.75)"/>{tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      <MagBtn onClick={()=>form.name&&form.email&&setSubmitted(true)} cursorText="BOOK" style={{display:'flex',alignItems:'center',justifyContent:'center',gap:10,width:'100%',padding:'14px 24px',borderRadius:13,background:T.accent,color:'#000',fontFamily:T.fontMono,fontSize:'0.8rem',fontWeight:700,letterSpacing:'0.08em',textTransform:'uppercase',boxShadow:'0 6px 28px rgba(255,255,255,0.12)',cursor:'none',marginTop:4}}>
                        <Calendar size={14}/><span>Confirm Interview Request</span><ChevronRight size={14}/>
                      </MagBtn>
                      <p style={{textAlign:'center',fontFamily:T.fontMono,fontSize:'0.63rem',color:T.textMuted,letterSpacing:'0.05em'}}>
                        Or reach me at <a href="mailto:bhagavan444@gmail.com" style={{color:T.textSec,textDecoration:'none',cursor:'none'}} data-cursor-text="MAIL">bhagavan444@gmail.com</a>
                      </p>
                    </div>
                  ) : (
                    <motion.div initial={{opacity:0,scale:.88}} animate={{opacity:1,scale:1}} transition={{type:'spring',stiffness:220,damping:18}} style={{textAlign:'center',padding:'40px 20px'}}>
                      <motion.div animate={{scale:[1,1.2,1],rotate:[0,10,-10,0]}} transition={{duration:1.2}} style={{display:'inline-flex',alignItems:'center',justifyContent:'center',width:70,height:70,borderRadius:20,background:'rgba(74,222,128,0.12)',border:'1px solid rgba(74,222,128,0.3)',marginBottom:22}}>
                        <CheckCircle2 size={32} color="#4ade80"/>
                      </motion.div>
                      <h4 style={{fontFamily:T.fontScript,fontWeight:700,fontSize:'2rem',color:T.textPri,marginBottom:12}}>Request Sent!</h4>
                      <p style={{fontFamily:T.fontMono,fontSize:'0.82rem',color:T.textSec,lineHeight:1.7,marginBottom:18}}>
                        Thank you, <strong style={{color:T.textPri}}>{form.name}</strong>! I'll confirm the schedule at <strong style={{color:T.textPri}}>{form.email}</strong> within 24 hours.
                      </p>
                      <div style={{display:'inline-flex',alignItems:'center',gap:7,padding:'8px 18px',background:T.surfaceEl,borderRadius:100,fontFamily:T.fontMono,fontSize:'0.67rem',color:T.textMuted,border:`1px solid ${T.borderSoft}`}}>
                        <motion.div animate={{scale:[1,1.4,1]}} transition={{duration:1.2,repeat:Infinity}} style={{width:7,height:7,borderRadius:'50%',background:'#4ade80'}}/>
                        Looking forward to connecting
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Second marquee strip */}
          <div style={{marginBottom:68}}><MarqueeTech/></div>

          {/* Bottom bar */}
          <Divider/>
          <motion.div initial={{opacity:0,y:16}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:.2}}
            style={{display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:20,paddingTop:32}}>
            <div style={{display:'flex',alignItems:'center',gap:16}}>
              <span style={{fontFamily:T.fontScript,fontSize:'1.9rem',fontWeight:700,color:T.textPri}}>Bhagavan</span>
              <span style={{color:T.textMuted,fontSize:'0.75rem'}}>·</span>
              <span style={{fontFamily:T.fontMono,fontSize:'0.7rem',color:T.textMuted,fontWeight:600}}>Full Stack & ML Engineer</span>
            </div>
            <div style={{display:'flex',gap:22,alignItems:'center'}}>
              {[{l:'GitHub',h:'https://github.com/bhagavan444'},{l:'LinkedIn',h:'#'},{l:'Email',h:'mailto:bhagavan444@gmail.com'}].map(({l,h})=>(
                <a key={l} href={h} target="_blank" rel="noopener noreferrer" data-cursor-text={l.slice(0,4).toUpperCase()}
                  style={{fontFamily:T.fontMono,fontSize:'0.73rem',color:T.textMuted,textDecoration:'none',fontWeight:700,letterSpacing:'0.07em',textTransform:'uppercase',transition:`color .2s ${T.ease}`}}
                  onMouseEnter={e=>e.target.style.color=T.textPri} onMouseLeave={e=>e.target.style.color=T.textMuted}>{l}</a>
              ))}
            </div>
            <div style={{fontFamily:T.fontMono,fontSize:'0.67rem',color:T.textMuted,fontWeight:600,letterSpacing:'0.06em'}}>© 2025 · Crafted with precision</div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

/* ═══════════════════════════════════════════════════════
   MAIN
═══════════════════════════════════════════════════════ */
export default function Projects(){
  return(
    <>
      <style>{CSS}</style>
      <MagneticCursor/>
      <div style={{minHeight:'100vh',background:T.bg}}>

        {/* HERO */}
        <motion.section initial={{opacity:0}} animate={{opacity:1}} transition={{duration:.9}}
          style={{maxWidth:1280,margin:'0 auto',padding:'108px 48px 88px',position:'relative',overflow:'hidden'}}>
          <div style={{position:'absolute',inset:0,pointerEvents:'none',zIndex:0,backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.88' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,backgroundSize:'180px 180px',opacity:.026,mixBlendMode:'overlay'}}/>
          <motion.div animate={{opacity:[.35,.65,.35],scale:[1,1.07,1]}} transition={{duration:7,repeat:Infinity,ease:'easeInOut'}}
            style={{position:'absolute',top:'-15%',left:'62%',width:560,height:560,borderRadius:'50%',background:'radial-gradient(circle,rgba(255,255,255,0.045) 0%,transparent 70%)',pointerEvents:'none',zIndex:0}}/>

          <div style={{position:'relative',zIndex:1}}>
            <motion.div initial={{opacity:0,y:18}} animate={{opacity:1,y:0}} transition={{delay:.2,duration:.65}}
              style={{display:'inline-flex',alignItems:'center',gap:9,padding:'7px 18px',background:T.surface,border:`1px solid ${T.borderSoft}`,borderRadius:100,fontFamily:T.fontMono,fontSize:'0.67rem',fontWeight:700,color:T.textMuted,letterSpacing:'0.13em',textTransform:'uppercase',marginBottom:36,boxShadow:'0 2px 16px rgba(0,0,0,.48)'}}>
              <motion.div animate={{rotate:360}} transition={{duration:2.8,repeat:Infinity,ease:'linear'}}><Sparkles size={11} color={T.accent}/></motion.div>
              <span>Engineering Portfolio</span>
              <span style={{fontFamily:T.fontMono,animation:'__blink 1.1s step-end infinite',color:T.textMuted}}>_</span>
            </motion.div>

            <div style={{marginBottom:28}}>
              <div style={{overflow:'hidden',marginBottom:4}}>
                <motion.h1 initial={{y:52,opacity:0,rotate:-1.4,filter:'blur(10px)'}} animate={{y:0,opacity:1,rotate:0,filter:'blur(0px)'}} transition={{delay:.32,duration:.85,ease:[.25,.1,.25,1]}}
                  style={{fontFamily:T.fontScript,fontWeight:700,fontSize:'clamp(2.8rem,7.2vw,7rem)',lineHeight:1.08,color:T.textPri}}>
                  Projects
                </motion.h1>
              </div>
              <div style={{overflow:'hidden'}}>
                <motion.h1 initial={{y:52,opacity:0,rotate:1.2,filter:'blur(10px)'}} animate={{y:0,opacity:1,rotate:0,filter:'blur(0px)'}} transition={{delay:.46,duration:.85,ease:[.25,.1,.25,1]}}
                  style={{fontFamily:T.fontScript,fontWeight:700,fontSize:'clamp(2.8rem,7.2vw,7rem)',lineHeight:1.08,color:'rgba(255,255,255,.52)',fontStyle:'italic',display:'flex',alignItems:'center',gap:28,flexWrap:'wrap'}}>
                  That Solve Real Problems
                  <motion.span initial={{width:0}} animate={{width:80}} transition={{delay:1.1,duration:.9}} style={{display:'inline-block',height:3,background:T.accent,borderRadius:2,verticalAlign:'middle',flexShrink:0,boxShadow:'0 0 12px rgba(255,255,255,.3)'}}/>
                </motion.h1>
              </div>
            </div>

            <motion.p initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{delay:.6,duration:.7}}
              style={{fontSize:'1.13rem',color:T.textSec,maxWidth:600,lineHeight:1.78,fontWeight:400,marginBottom:62}}>
              Full-stack applications engineered with scalable architecture in mind — not just features. Each project demonstrates real-world trade-offs, practical constraints, and production-ready code.
            </motion.p>

            <div style={{display:'flex',gap:0,flexWrap:'wrap'}}>
              {[{v:'6',l:'Total Projects'},{v:'3+',l:'Internships'},{v:'90%+',l:'Avg ML Accuracy'}].map((s,i)=>(
                <motion.div key={i} initial={{opacity:0,y:24}} animate={{opacity:1,y:0}} transition={{delay:.54+i*.12}} whileHover={{scale:1.07,y:-5}} data-cursor=""
                  style={{cursor:'none',position:'relative',paddingRight:i<2?56:0,paddingLeft:i>0?56:0}}>
                  {i>0&&<div style={{position:'absolute',left:0,top:'10%',bottom:'10%',width:1,background:`linear-gradient(180deg,transparent,${T.borderSoft} 40%,${T.borderSoft} 60%,transparent)`}}/>}
                  <div style={{fontFamily:T.fontMono,fontSize:'clamp(2rem,3.5vw,3.3rem)',fontWeight:900,color:T.textPri,lineHeight:1}}>{s.v}</div>
                  <div style={{marginTop:10,fontFamily:T.fontMono,fontSize:'0.68rem',color:T.textMuted,textTransform:'uppercase',letterSpacing:'0.11em',fontWeight:700}}>{s.l}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* ALL 6 FLAGSHIP PROJECTS */}
        {allProjects.map((p,i)=>(
          <FlagshipProject key={p.id} project={p} index={i}/>
        ))}

        {/* CONCLUSION */}
        <ConclusionSection/>

        {/* FOOTER */}
        <Footer/>
      </div>
    </>
  );
}