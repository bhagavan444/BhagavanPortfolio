"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  BookOpen, Music, Coffee, Dumbbell, Camera, Film, Gamepad2,
  Sparkles, Zap, TrendingUp, Brain, Rocket, Crown,
  Flame, Star, Target, Award, Volume2, Activity,
  Headphones, Compass, Trophy, Eye, Github, Mail, ArrowRight, CheckCircle2, X
} from "lucide-react";

/* ═══════════════════════════════════════════════════════
   DESIGN TOKENS — Pure Black & White Architectural System
═══════════════════════════════════════════════════════ */
const E  = "cubic-bezier(0.16, 1, 0.3, 1)";
const MS = { fast:"130ms", base:"190ms", slow:"320ms", reveal:"420ms" };

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
  @keyframes _marquee {
    from { transform:translateX(0); }
    to   { transform:translateX(-50%); }
  }
  @keyframes _tagPop {
    from { opacity:0; transform:translateX(14px) scale(0.92); }
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
  @keyframes _cardIn {
    from { opacity:0; transform:translateY(24px); }
    to   { opacity:1; transform:translateY(0); }
  }
  @keyframes _float {
    0%,100% { transform:translateY(0); }
    50%      { transform:translateY(-8px); }
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
    .hobby-row   { grid-template-columns:1fr !important; }
    .fgrid       { grid-template-columns:1fr 1fr !important; }
    .three-col   { grid-template-columns:1fr 1fr !important; }
  }
  @media (max-width:768px) {
    .snav        { display:none !important; }
    .fgrid,
    .hpillars,
    .ovgrid,
    .pgrid,
    .three-col   { grid-template-columns:1fr !important; }
    .fctar       { flex-direction:column !important; }
  }
`;

/* ═══════════════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════════════ */
const SECTIONS = [
  { id:"intro",     number:"01", label:"Intro"      },
  { id:"hobbies",   number:"02", label:"Hobbies"    },
  { id:"connect",   number:"03", label:"Connect"    },
];

const TICKER_ITEMS = [
  "Music","Coffee","Cinema","Gaming","Fitness","Photography","Travel",
  "Focus","Discipline","Strategy","Creativity","Flow State","Endurance","Vision",
];

const CATEGORIES = ["All","Creative","Physical","Lifestyle","Mental Training","Experiential"];

const hobbiesData = [
  {
    id:1, number:"01",
    title:"Music Production",
    icon:Music,
    color:"#a78bfa",           // violet
    colorDim:"rgba(167,139,250,0.12)",
    category:"Creative",
    rarity:"Epic",
    desc:"Curating focus playlists, exploring sound engineering, and using music as a coding catalyst.",
    fullDesc:"Music isn't just background noise — it's a carefully engineered tool for flow states. Exploring multiple genres, creating custom productivity playlists, and understanding the science of audio on cognitive performance.",
    whyItMatters:"Improves concentration during long coding sessions, enhances creative problem-solving, and maintains sustained mental performance during complex tasks.",
    learnings:["Sustained deep focus techniques","Creative pattern recognition","Stress management through sound","Audio engineering basics","Flow state optimization"],
    impact:["200% productivity boost during deep work","50% reduction in context-switching time","Enhanced debugging intuition"],
    stats:[
      { label:"Daily Hours",       value:"6+",   icon:Headphones, color:"#a78bfa" },
      { label:"Playlists Created", value:"50+",  icon:Volume2,    color:"#c084fc" },
      { label:"Genres Explored",   value:"25+",  icon:Music,      color:"#a78bfa" },
      { label:"Focus Boost",       value:"200%", icon:Activity,   color:"#818cf8" },
    ],
    dailyRoutine:"Ambient for coding • Lo-fi for planning • Electronic for debugging",
  },
  {
    id:2, number:"02",
    title:"Coffee Culture",
    icon:Coffee,
    color:"#f59e0b",           // amber
    colorDim:"rgba(245,158,11,0.12)",
    category:"Lifestyle",
    rarity:"Epic",
    desc:"Mastering the art of coffee for sustained energy, focus, and hackathon endurance.",
    fullDesc:"Coffee is more than caffeine — it's a ritual, a science, and a performance optimizer. Exploring brewing methods, bean origins, and the perfect timing for peak cognitive performance.",
    whyItMatters:"Supports sustained energy during high-pressure development cycles, enables late-night debugging sessions, and provides consistent mental clarity.",
    learnings:["Endurance under pressure","Time-boxed productivity","Night-shift efficiency","Caffeine optimization science","Ritual-based focus triggers"],
    impact:["Extended productive hours by 40%","Maintained 95% accuracy during late-night coding","Won 3 hackathons with coffee-fueled sprints"],
    stats:[
      { label:"Cups/Day",          value:"4+",  icon:Coffee, color:"#f59e0b" },
      { label:"Brewing Methods",   value:"5",   icon:Zap,    color:"#fbbf24" },
      { label:"Late Night Sprints",value:"∞",   icon:Flame,  color:"#ef4444" },
      { label:"Energy Level",      value:"MAX", icon:Rocket, color:"#f97316" },
    ],
    dailyRoutine:"Morning espresso • Afternoon cold brew • Evening pour-over",
  },
  {
    id:3, number:"03",
    title:"Strategic Gaming",
    icon:Gamepad2,
    color:"#10b981",           // emerald
    colorDim:"rgba(16,185,129,0.12)",
    category:"Mental Training",
    rarity:"Epic",
    desc:"Competitive gaming to sharpen decision-making, reflexes, and strategic thinking.",
    fullDesc:"Not just entertainment — gaming is a training ground for real-time problem solving, resource management, and adapting to rapidly changing scenarios.",
    whyItMatters:"Enhances real-time decision-making under pressure, improves pattern recognition, develops strategic planning skills, and builds mental resilience.",
    learnings:["Real-time strategic thinking","Fast decision-making under uncertainty","Focus maintenance under pressure","Resource optimization","Competitive mindset"],
    impact:["Improved debugging speed by 45%","Enhanced system design thinking","Better risk assessment in architecture decisions"],
    stats:[
      { label:"Strategy Skill", value:"96%", icon:Brain,  color:"#10b981" },
      { label:"Reflex Speed",   value:"91%", icon:Zap,    color:"#34d399" },
      { label:"Focus Level",    value:"94%", icon:Target, color:"#10b981" },
      { label:"Win Rate",       value:"72%", icon:Trophy, color:"#fbbf24" },
    ],
    dailyRoutine:"Evening strategy sessions • Weekend competitive matches",
  },
  {
    id:4, number:"04",
    title:"Cinema & Storytelling",
    icon:Film,
    color:"#f43f5e",           // rose
    colorDim:"rgba(244,63,94,0.12)",
    category:"Creative",
    rarity:"Rare",
    desc:"Analyzing cinematography, narrative structure, and visual storytelling techniques.",
    fullDesc:"Movies are masterclasses in user experience, pacing, visual communication, and emotional engagement. Studying how directors guide attention, build tension, and deliver satisfying resolutions.",
    whyItMatters:"Improves understanding of UX design, narrative flow in product development, visual communication in presentations, and emotional design in interfaces.",
    learnings:["User-centric design thinking","Storytelling for product demos","Visual communication mastery","Pacing and flow optimization","Emotional engagement techniques"],
    impact:["Enhanced UI/UX design intuition","Better product pitch storytelling","Improved user journey mapping"],
    stats:[
      { label:"Films/Month",       value:"20+", icon:Film,  color:"#f43f5e" },
      { label:"Genres",            value:"All", icon:Star,  color:"#fbbf24" },
      { label:"Directors Studied", value:"50+", icon:Eye,   color:"#f43f5e" },
      { label:"UX Insights",       value:"∞",   icon:Brain, color:"#a78bfa" },
    ],
    dailyRoutine:"Weekend film marathons • Evening director study sessions",
  },
  {
    id:5, number:"05",
    title:"Fitness & Discipline",
    icon:Dumbbell,
    color:"#ef4444",           // red
    colorDim:"rgba(239,68,68,0.12)",
    category:"Physical",
    rarity:"Epic",
    desc:"Building physical resilience, mental discipline, and sustainable high performance.",
    fullDesc:"Physical fitness isn't separate from mental performance — it's foundational. Structured training focused on strength, endurance, and flexibility to support long coding sessions.",
    whyItMatters:"Boosts focus and cognitive function, reduces burnout, improves consistency in long-term projects, and builds the discipline required for mastering complex technologies.",
    learnings:["Discipline and consistency","Long-term commitment","Mental resilience building","Energy management","Stress recovery techniques"],
    impact:["100% increase in daily energy levels","60% reduction in mental fatigue","Maintained focus for 12+ hour coding sessions"],
    stats:[
      { label:"Workouts/Week", value:"6×",   icon:Dumbbell,   color:"#ef4444" },
      { label:"Strength Gain", value:"95%",  icon:TrendingUp, color:"#f97316" },
      { label:"Endurance",     value:"92%",  icon:Activity,   color:"#ef4444" },
      { label:"Mental Clarity",value:"100%", icon:Brain,      color:"#a78bfa" },
    ],
    dailyRoutine:"Morning strength training • Evening cardio • Daily stretching",
  },
  {
    id:6, number:"06",
    title:"Photography & Visual Arts",
    icon:Camera,
    color:"#ff9500",           // orange
    colorDim:"rgba(255,149,0,0.12)",
    category:"Creative",
    rarity:"Rare",
    desc:"Capturing moments with precision, exploring composition, lighting, and visual balance.",
    fullDesc:"Photography trains the eye for detail, composition, and visual hierarchy — skills that directly translate to UI/UX design. Focus on urban photography, minimalism, and the rule of thirds.",
    whyItMatters:"Sharpens visual design sense, enhances attention to detail for frontend work, improves spatial reasoning, and develops aesthetic judgment for interface design.",
    learnings:["Visual composition mastery","Attention to micro-details","Creative framing techniques","Lighting and color theory","Minimalist design principles"],
    impact:["Improved UI design aesthetic by 70%","Better component layout decisions","Enhanced visual hierarchy in designs"],
    stats:[
      { label:"Photos Taken", value:"1000+", icon:Camera, color:"#ff9500" },
      { label:"Style",        value:"Urban", icon:Star,   color:"#fbbf24" },
      { label:"Equipment",    value:"Pro",   icon:Award,  color:"#ff9500" },
      { label:"Skill Level",  value:"Expert",icon:Trophy, color:"#fbbf24" },
    ],
    dailyRoutine:"Weekend photo walks • Golden hour sessions • Evening editing",
  },
  {
    id:7, number:"07",
    title:"Travel & Exploration",
    icon:Compass,
    color:"#00d4ff",           // cyan
    colorDim:"rgba(0,212,255,0.12)",
    category:"Experiential",
    rarity:"Legendary",
    desc:"Exploring new cultures, perspectives, and expanding worldview through travel.",
    fullDesc:"Travel isn't tourism — it's perspective expansion, culture immersion, and understanding diverse approaches to problem-solving. Learning how different cultures approach technology, work, and life.",
    whyItMatters:"Broadens perspective for global product thinking, enhances adaptability, improves cross-cultural communication, and inspires innovative solutions from diverse contexts.",
    learnings:["Cultural adaptability","Global perspective","Diverse problem-solving approaches","Communication across cultures","Appreciation for different workflows"],
    impact:["Enhanced empathy in user research","Better international team collaboration","Inspired 5+ projects from travel insights"],
    stats:[
      { label:"Places Visited",    value:"15+", icon:Compass,  color:"#00d4ff" },
      { label:"Cultures Explored", value:"10+", icon:Star,     color:"#fbbf24" },
      { label:"Languages",         value:"3",   icon:BookOpen, color:"#00d4ff" },
      { label:"Perspective Gain",  value:"∞",   icon:Brain,    color:"#a78bfa" },
    ],
    dailyRoutine:"Planning next adventure • Virtual cultural exploration • Language learning",
  },
];

const rarityConfig = {
  "Legendary": { label:"Legendary", icon:Crown,    color:"#f59e0b" },
  "Epic":      { label:"Epic",      icon:Sparkles, color:"#a78bfa" },
  "Rare":      { label:"Rare",      icon:Star,     color:"#4f7fff" },
};

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

/* ═══════════════════════════════════════════════════════
   MAGNETIC CURSOR
═══════════════════════════════════════════════════════ */
function MagneticCursor() {
  const dotRef  = useRef(null);
  const ringRef = useRef(null);
  useEffect(() => {
    const dot = dotRef.current, ring = ringRef.current;
    if (!dot || !ring) return;
    let mx=-200,my=-200,rx=-200,ry=-200,rSize=36,targetRSize=36;
    let magEl=null,magOX=0,magOY=0,targetMagOX=0,targetMagOY=0;
    let rafId=null,visible=false;
    const lerp=(a,b,t)=>a+(b-a)*t;
    const onMove=(e)=>{
      mx=e.clientX;my=e.clientY;
      if(!visible){visible=true;dot.style.opacity="1";ring.style.opacity="1";}
      const els=document.querySelectorAll("[data-magnetic]");
      let found=null;
      els.forEach((el)=>{
        const r=el.getBoundingClientRect();
        const cx=r.left+r.width/2,cy=r.top+r.height/2;
        if(Math.hypot(mx-cx,my-cy)<Math.max(r.width,r.height)*0.65)found=el;
      });
      if(found){
        magEl=found;
        const r=found.getBoundingClientRect();
        const dx=mx-(r.left+r.width/2),dy=my-(r.top+r.height/2);
        targetMagOX=dx*0.38;targetMagOY=dy*0.38;targetRSize=58;
      } else {
        if(magEl){magEl.style.transform="";magEl.style.transition=`transform 400ms ${E}`;}
        magEl=null;targetMagOX=0;targetMagOY=0;targetRSize=36;
      }
    };
    const onLeave=()=>{visible=false;dot.style.opacity="0";ring.style.opacity="0";if(magEl){magEl.style.transform="";magEl=null;}};
    const onDown=()=>{targetRSize=22;dot.style.transform="translate(-50%,-50%) scale(0.5)";};
    const onUp=()=>{targetRSize=magEl?58:36;dot.style.transform="translate(-50%,-50%) scale(1)";};
    const onOver=(e)=>{
      if(e.target.closest("a,button,[data-magnetic]")){ring.style.borderColor="rgba(255,255,255,0.9)";ring.style.background="rgba(255,255,255,0.06)";}
      else{ring.style.borderColor="rgba(255,255,255,0.45)";ring.style.background="transparent";}
    };
    const tick=()=>{
      dot.style.left=mx+"px";dot.style.top=my+"px";
      rx=lerp(rx,mx,0.13);ry=lerp(ry,my,0.13);
      rSize=lerp(rSize,targetRSize,0.14);
      ring.style.left=rx+"px";ring.style.top=ry+"px";
      ring.style.width=rSize+"px";ring.style.height=rSize+"px";
      if(magEl){magOX=lerp(magOX,targetMagOX,0.14);magOY=lerp(magOY,targetMagOY,0.14);magEl.style.transform=`translate(${magOX}px,${magOY}px)`;magEl.style.transition="none";}
      else{magOX=lerp(magOX,0,0.12);magOY=lerp(magOY,0,0.12);}
      rafId=requestAnimationFrame(tick);
    };
    document.addEventListener("mousemove",onMove,{passive:true});
    document.addEventListener("mouseleave",onLeave);
    document.addEventListener("mousedown",onDown);
    document.addEventListener("mouseup",onUp);
    document.addEventListener("mouseover",onOver,{passive:true});
    rafId=requestAnimationFrame(tick);
    return ()=>{
      document.removeEventListener("mousemove",onMove);
      document.removeEventListener("mouseleave",onLeave);
      document.removeEventListener("mousedown",onDown);
      document.removeEventListener("mouseup",onUp);
      document.removeEventListener("mouseover",onOver);
      cancelAnimationFrame(rafId);
    };
  },[]);
  const BASE={position:"fixed",top:0,left:0,transform:"translate(-50%,-50%)",pointerEvents:"none",zIndex:99999,opacity:0,animation:`_cursorIn 400ms ${E} 0.5s both`};
  return(
    <>
      <div ref={dotRef} style={{...BASE,width:"8px",height:"8px",borderRadius:"50%",background:"#FFFFFF",transition:`transform 120ms ${E}, opacity 200ms ease`,willChange:"left,top,transform"}}/>
      <div ref={ringRef} style={{...BASE,width:"36px",height:"36px",borderRadius:"50%",border:"1.5px solid rgba(255,255,255,0.45)",background:"transparent",transition:"border-color 180ms ease, background 180ms ease, opacity 200ms ease",willChange:"left,top,width,height",mixBlendMode:"difference"}}/>
    </>
  );
}

/* ═══════════════════════════════════════════════════════
   MARQUEE
═══════════════════════════════════════════════════════ */
function Marquee({ speed=32 }) {
  const items=[...TICKER_ITEMS,...TICKER_ITEMS];
  return(
    <div style={{overflow:"hidden",borderTop:"1px solid rgba(255,255,255,0.06)",borderBottom:"1px solid rgba(255,255,255,0.06)",padding:"10px 0",background:"#111111",position:"relative"}}>
      <div style={{position:"absolute",left:0,top:0,bottom:0,width:"80px",background:"linear-gradient(to right, #111111, transparent)",zIndex:2,pointerEvents:"none"}}/>
      <div style={{position:"absolute",right:0,top:0,bottom:0,width:"80px",background:"linear-gradient(to left, #111111, transparent)",zIndex:2,pointerEvents:"none"}}/>
      <div className="marquee-inner" style={{display:"flex",alignItems:"center",gap:"32px",width:"max-content",animation:`_marquee ${speed}s linear infinite`,willChange:"transform"}}>
        {items.map((name,i)=>(
          <div key={`${name}-${i}`} style={{display:"flex",alignItems:"center",gap:"7px",opacity:0.45,flexShrink:0}}>
            <span style={{fontFamily:"'DM Mono',monospace",fontSize:"11px",fontWeight:500,color:"rgba(255,255,255,0.50)",letterSpacing:"0.04em",whiteSpace:"nowrap"}}>{name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   SIDE NAV
═══════════════════════════════════════════════════════ */
function SideNav({ active }) {
  return(
    <nav className="snav" style={{position:"fixed",left:"1.25rem",top:"50%",transform:"translateY(-50%)",zIndex:100,display:"flex",flexDirection:"column",gap:"14px"}}>
      {SECTIONS.map((s,i)=>(
        <button key={s.id} className="snav-btn" data-magnetic
          onClick={()=>document.getElementById(s.id)?.scrollIntoView({behavior:"smooth"})}
          aria-label={`Jump to ${s.label}`}
          style={{display:"flex",alignItems:"center",gap:"6px",background:"none",border:"none",cursor:"pointer",padding:0,outline:"none"}}
        >
          <div className="snav-line" style={{height:"1.5px",width:active===i?"22px":"10px",background:active===i?"#FFFFFF":"rgba(255,255,255,0.18)",borderRadius:"1px",transition:`all ${MS.slow} ${E}`}}/>
          <span style={{fontFamily:"'DM Mono',monospace",fontSize:"9px",fontWeight:500,color:"rgba(255,255,255,0.55)",opacity:active===i?1:0,transition:`opacity ${MS.slow} ${E}`}}>{s.number}</span>
        </button>
      ))}
    </nav>
  );
}

/* ═══════════════════════════════════════════════════════
   MONO LABEL
═══════════════════════════════════════════════════════ */
function ML({ children, color="rgba(255,255,255,0.55)", style={} }) {
  return(
    <span style={{display:"block",fontFamily:"'DM Mono',monospace",fontSize:"10px",fontWeight:500,letterSpacing:"0.14em",textTransform:"uppercase",color,...style}}>
      {children}
    </span>
  );
}

/* ═══════════════════════════════════════════════════════
   TERM CURSOR
═══════════════════════════════════════════════════════ */
function TermCursor() {
  return(
    <span style={{display:"inline-block",width:"8px",height:"1.1em",background:"#FFFFFF",marginLeft:"3px",verticalAlign:"middle",animation:"_blink 1.1s step-end infinite",borderRadius:"1px"}}/>
  );
}

/* ═══════════════════════════════════════════════════════
   SECTION HEADER
═══════════════════════════════════════════════════════ */
function SH({ eyebrow, title, sub, visible, delay=0, cursor=false }) {
  return(
    <div style={{marginBottom:"2.5rem",opacity:visible?1:0,animation:visible?`_rtl ${MS.reveal} ${E} ${delay}s both`:"none"}}>
      <ML color="rgba(255,255,255,0.45)" style={{marginBottom:"10px"}}>{eyebrow}</ML>
      <h2 style={{fontFamily:"'Dancing Script',cursive",fontSize:"clamp(2.8rem,5.5vw,4.5rem)",fontWeight:700,color:"#FFFFFF",letterSpacing:"-0.025em",marginBottom:sub?"8px":0,display:"flex",alignItems:"center"}}>
        {title}{cursor&&<TermCursor/>}
      </h2>
      {sub&&<p style={{fontSize:"14px",color:"rgba(255,255,255,0.38)",lineHeight:1.65,maxWidth:"500px"}}>{sub}</p>}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   FOOTER CTA
═══════════════════════════════════════════════════════ */
function FooterCTA({ label, sub, href, accent, visible, delay }) {
  const [hov,setHov]=useState(false);
  const [press,setPress]=useState(false);
  return(
    <a href={href} data-magnetic target={href.startsWith("http")?"_blank":undefined} rel={href.startsWith("http")?"noopener noreferrer":undefined}
      onMouseEnter={()=>setHov(true)} onMouseLeave={()=>{setHov(false);setPress(false);}}
      onMouseDown={()=>setPress(true)} onMouseUp={()=>setPress(false)}
      style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"16px 20px",borderRadius:"10px",textDecoration:"none",background:accent?(hov?"rgba(255,255,255,0.12)":"rgba(255,255,255,0.07)"):(hov?"rgba(255,255,255,0.06)":"rgba(255,255,255,0.03)"),border:`1px solid ${accent?(hov?"rgba(255,255,255,0.30)":"rgba(255,255,255,0.15)"):(hov?"rgba(255,255,255,0.12)":"rgba(255,255,255,0.07)")}`,transition:`background ${MS.fast} ${E}, border-color ${MS.fast} ${E}`,opacity:visible?1:0,transform:visible?(press?"scale(0.98)":"translateY(0)"):"translateY(10px)",animation:visible?`_up ${MS.slow} ${E} ${delay}s both`:"none"}}
    >
      <div>
        <ML color="rgba(255,255,255,0.25)" style={{marginBottom:"4px"}}>{sub}</ML>
        <div style={{fontSize:"14px",fontWeight:500,color:"#FFFFFF"}}>{label}</div>
      </div>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="2" strokeLinecap="round" style={{transform:hov?"translateX(4px)":"translateX(0)",transition:`transform ${MS.fast} ${E}`}}>
        <path d="M5 12h14M12 5l7 7-7 7"/>
      </svg>
    </a>
  );
}

/* ═══════════════════════════════════════════════════════
   HOBBY ROW — mirrors CapRow from hackathons/skills
═══════════════════════════════════════════════════════ */
function HobbyRow({ hobby, visible, delay, ri, onSelect }) {
  const [hov,setHov]=useState(false);
  const even=ri%2===0;
  const la=even?"_ltr":"_rtl";
  const ra=even?"_rtl":"_ltr";
  const Icon=hobby.icon;
  const rc=rarityConfig[hobby.rarity];
  const RarityIcon=rc.icon;
  const rarityColor=rc.color;

  return(
    <div className="hobby-row" onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:0,borderBottom:"1px solid rgba(255,255,255,0.06)",background:hov?"#141414":"transparent",transition:`background ${MS.fast} ${E}, transform ${MS.base} ${E}`,transform:hov?"translateY(-2px)":"translateY(0)"}}
    >
      {/* LEFT */}
      <div style={{padding:"2.25rem 2.5rem",borderRight:`1px solid ${hov?"rgba(255,255,255,0.10)":"rgba(255,255,255,0.06)"}`,transition:`border-color ${MS.fast} ${E}`,position:"relative",opacity:visible?1:0,animation:visible?`${la} ${MS.reveal} ${E} ${delay}s both`:"none"}}>
        {/* Colored accent bar using hobby color */}
        <div style={{position:"absolute",left:0,top:"18px",bottom:"18px",width:"2px",background:hov?hobby.color:"rgba(255,255,255,0.20)",borderRadius:"0 2px 2px 0",transformOrigin:"top",transform:visible?"scaleY(1)":"scaleY(0)",transition:`transform ${MS.slow} ${E} ${delay+0.18}s, background ${MS.fast} ${E}`}}/>

        <div style={{display:"flex",alignItems:"center",gap:"10px",marginBottom:"16px"}}>
          <ML color="rgba(255,255,255,0.45)">{hobby.number}</ML>
          <div style={{height:"1px",width:"20px",background:"rgba(255,255,255,0.30)",transformOrigin:"left",transform:visible?"scaleX(1)":"scaleX(0)",transition:`transform ${MS.base} ${E} ${delay+0.24}s`}}/>
          {/* Colored rarity badge */}
          <div style={{display:"inline-flex",alignItems:"center",gap:"4px",padding:"2px 8px",background:`${rarityColor}18`,border:`1px solid ${rarityColor}50`,borderRadius:"999px"}}>
            <RarityIcon size={10} color={rarityColor}/>
            <span style={{fontFamily:"'DM Mono',monospace",fontSize:"9px",fontWeight:500,letterSpacing:"0.10em",textTransform:"uppercase",color:rarityColor}}>{hobby.rarity}</span>
          </div>
        </div>

        {/* Icon + title — icon box uses hobby color */}
        <div style={{display:"flex",alignItems:"flex-start",gap:"16px",marginBottom:"12px"}}>
          <div style={{width:"52px",height:"52px",borderRadius:"12px",background:hov?`${hobby.color}22`:`${hobby.color}12`,border:`1px solid ${hov?`${hobby.color}60`:`${hobby.color}30`}`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,transition:`border-color ${MS.fast} ${E}, background ${MS.fast} ${E}`,boxShadow:hov?`0 0 16px ${hobby.color}25`:"none"}}>
            <Icon size={24} color={hobby.color} style={{transition:`color ${MS.fast} ${E}`}}/>
          </div>
          <div>
            <ML color={`${hobby.color}90`} style={{marginBottom:"4px"}}>{hobby.category}</ML>
            <h3 style={{fontFamily:"'Dancing Script',cursive",fontSize:"2.2rem",fontWeight:700,color:"#FFFFFF",lineHeight:1.1,letterSpacing:"-0.025em"}}>
              {hobby.title}
            </h3>
          </div>
        </div>

        <p style={{fontSize:"14px",color:"rgba(255,255,255,0.42)",lineHeight:1.75,maxWidth:"400px",marginBottom:"24px"}}>
          {hobby.desc}
        </p>

        {/* Stats mini-grid — icon + colored value */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:"6px",opacity:visible?1:0,animation:visible?`_up ${MS.slow} ${E} ${delay+0.28}s both`:"none"}}>
          {hobby.stats.slice(0,2).map((s,si)=>{
            const SI=s.icon;
            const sc=s.color||hobby.color;
            return(
              <div key={si} style={{padding:"11px 12px",background:`${sc}09`,border:`1px solid ${sc}28`,borderRadius:"9px"}}>
                <div style={{width:"28px",height:"28px",borderRadius:"7px",background:`${sc}20`,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:"7px"}}>
                  <SI size={14} color={sc}/>
                </div>
                <div style={{fontFamily:"'Dancing Script',cursive",fontSize:"1.55rem",fontWeight:700,color:sc,lineHeight:1,marginBottom:"3px"}}>{s.value}</div>
                <ML color="rgba(255,255,255,0.28)" style={{fontSize:"9px"}}>{s.label}</ML>
              </div>
            );
          })}
        </div>
      </div>

      {/* RIGHT */}
      <div style={{padding:"2.25rem 2.5rem",opacity:visible?1:0,animation:visible?`${ra} ${MS.reveal} ${E} ${delay+0.07}s both`:"none"}}>
        {/* Full stats — each icon in its own colored pill */}
        <div style={{marginBottom:"20px"}}>
          <ML color="rgba(255,255,255,0.35)" style={{marginBottom:"10px"}}>Stats</ML>
          <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:"7px"}}>
            {hobby.stats.map((s,si)=>{
              const SI=s.icon;
              const sc=s.color||hobby.color;
              return(
                <div key={si} style={{display:"flex",alignItems:"center",gap:"10px",padding:"10px 12px",background:`${sc}09`,border:`1px solid ${sc}28`,borderRadius:"9px"}}>
                  <div style={{width:"30px",height:"30px",borderRadius:"8px",background:`${sc}22`,border:`1px solid ${sc}35`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                    <SI size={15} color={sc}/>
                  </div>
                  <div>
                    <div style={{fontFamily:"'DM Mono',monospace",fontSize:"12px",fontWeight:500,color:sc,lineHeight:1,marginBottom:"2px"}}>{s.value}</div>
                    <div style={{fontFamily:"'DM Mono',monospace",fontSize:"9px",color:"rgba(255,255,255,0.28)",letterSpacing:"0.04em"}}>{s.label}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Learnings bullets */}
        <div style={{display:"flex",flexDirection:"column",gap:"6px",marginBottom:"20px"}}>
          <ML color="rgba(255,255,255,0.35)" style={{marginBottom:"6px"}}>Key Learnings</ML>
          {hobby.learnings.slice(0,3).map((l,li)=>(
            <div key={li} style={{display:"flex",gap:"10px",alignItems:"flex-start",opacity:visible?1:0,animation:visible?`_rtl ${MS.slow} ${E} ${delay+0.30+li*0.05}s both`:"none"}}>
              <div style={{width:"4px",height:"4px",borderRadius:"50%",background:hov?hobby.color:"rgba(255,255,255,0.20)",flexShrink:0,marginTop:"7px",transition:`background ${MS.fast} ${E}`}}/>
              <span style={{fontSize:"12.5px",color:"rgba(255,255,255,0.45)",lineHeight:1.65}}>{l}</span>
            </div>
          ))}
        </div>

        {/* Daily routine block */}
        <div style={{padding:"12px 14px",background:`${hobby.color}08`,border:`1px solid ${hobby.color}20`,borderRadius:"8px",marginBottom:"16px"}}>
          <ML color={`${hobby.color}90`} style={{marginBottom:"5px"}}>Daily Routine</ML>
          <p style={{fontSize:"12px",color:"rgba(255,255,255,0.50)",lineHeight:1.65,fontStyle:"italic"}}>{hobby.dailyRoutine}</p>
        </div>

        {/* Footer row */}
        <div style={{paddingTop:"14px",borderTop:"1px solid rgba(255,255,255,0.06)",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:"8px"}}>
          <div style={{display:"flex",alignItems:"center",gap:"6px"}}>
            <div style={{width:"5px",height:"5px",borderRadius:"50%",background:hobby.color}}/>
            <ML color="rgba(255,255,255,0.25)">{hobby.category} · {hobby.rarity}</ML>
          </div>
          <button data-magnetic onClick={()=>onSelect(hobby)}
            style={{fontFamily:"'DM Mono',monospace",fontSize:"10px",fontWeight:500,letterSpacing:"0.06em",color:hobby.color,background:"none",border:`1px solid ${hobby.color}40`,borderRadius:"4px",padding:"4px 10px",cursor:"pointer",transition:`border-color ${MS.fast} ${E}, color ${MS.fast} ${E}, background ${MS.fast} ${E}`}}
            onMouseEnter={(e)=>{e.currentTarget.style.borderColor=hobby.color;e.currentTarget.style.background=`${hobby.color}15`;}}
            onMouseLeave={(e)=>{e.currentTarget.style.borderColor=`${hobby.color}40`;e.currentTarget.style.background="none";}}
          >Deep Dive →</button>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   HOBBY MODAL — monochrome, mirrors PhaseModal
═══════════════════════════════════════════════════════ */
function HobbyModal({ hobby, onClose }) {
  if(!hobby)return null;
  const Icon=hobby.icon;
  const RarityIcon=rarityConfig[hobby.rarity].icon;
  return(
    <div onClick={onClose}
      style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.88)",backdropFilter:"blur(10px)",zIndex:9999,display:"flex",alignItems:"center",justifyContent:"center",padding:"32px",overflowY:"auto"}}
    >
      <div onClick={e=>e.stopPropagation()}
        style={{background:"#111111",border:`1px solid ${hobby.color}30`,borderRadius:"14px",maxWidth:"780px",width:"100%",maxHeight:"90vh",overflowY:"auto",position:"relative",animation:`_rtl ${MS.reveal} ${E} 0s both`,boxShadow:`0 0 40px ${hobby.color}15`}}
      >
        {/* Sticky header */}
        <div style={{padding:"2.5rem 2.5rem 2rem",borderBottom:`1px solid ${hobby.color}20`,position:"sticky",top:0,background:"#111111",zIndex:1,borderRadius:"14px 14px 0 0"}}>
          <button onClick={onClose} data-magnetic
            style={{position:"absolute",top:"1.5rem",right:"1.5rem",background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.10)",width:"32px",height:"32px",borderRadius:"7px",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",color:"rgba(255,255,255,0.55)",fontSize:"16px",transition:`background ${MS.fast} ${E}`}}
            onMouseEnter={(e)=>e.currentTarget.style.background="rgba(255,255,255,0.10)"}
            onMouseLeave={(e)=>e.currentTarget.style.background="rgba(255,255,255,0.05)"}
          >✕</button>

          {/* Header row — colored icon box */}
          <div style={{display:"flex",alignItems:"center",gap:"16px",marginBottom:"16px"}}>
            <div style={{width:"60px",height:"60px",borderRadius:"14px",background:`${hobby.color}18`,border:`1.5px solid ${hobby.color}50`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,boxShadow:`0 0 20px ${hobby.color}20`}}>
              <Icon size={30} color={hobby.color}/>
            </div>
            <div>
              <div style={{display:"flex",alignItems:"center",gap:"8px",marginBottom:"6px"}}>
                <div style={{display:"inline-flex",alignItems:"center",gap:"4px",padding:"2px 8px",background:`${rarityColor}18`,border:`1px solid ${rarityColor}50`,borderRadius:"999px"}}>
                  <RarityIcon size={10} color={rarityColor}/>
                  <span style={{fontFamily:"'DM Mono',monospace",fontSize:"9px",fontWeight:500,letterSpacing:"0.10em",textTransform:"uppercase",color:rarityColor}}>{hobby.rarity}</span>
                </div>
                <span style={{fontFamily:"'DM Mono',monospace",fontSize:"9px",color:`${hobby.color}90`,letterSpacing:"0.08em",textTransform:"uppercase"}}>{hobby.category}</span>
              </div>
              <h2 style={{fontFamily:"'Dancing Script',cursive",fontSize:"2.5rem",fontWeight:700,color:"#FFFFFF",lineHeight:1.1,letterSpacing:"-0.025em"}}>
                {hobby.title}
              </h2>
            </div>
          </div>
          <p style={{fontSize:"14px",color:"rgba(255,255,255,0.42)",lineHeight:1.75}}>{hobby.fullDesc}</p>
        </div>

        {/* Body */}
        <div style={{padding:"2rem 2.5rem",display:"flex",flexDirection:"column",gap:"28px"}}>

          {/* Why it matters — colored left border */}
          <div style={{padding:"16px 18px",background:`${hobby.color}08`,border:`1px solid ${hobby.color}25`,borderRadius:"8px",borderLeft:`3px solid ${hobby.color}`}}>
            <ML color={`${hobby.color}90`} style={{marginBottom:"8px"}}>Why It Matters</ML>
            <p style={{fontSize:"13.5px",color:"rgba(255,255,255,0.55)",lineHeight:1.75}}>{hobby.whyItMatters}</p>
          </div>

          {/* Key Learnings — colored dots */}
          <div>
            <ML color="rgba(255,255,255,0.30)" style={{marginBottom:"12px"}}>Key Learnings</ML>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))",gap:"8px"}}>
              {hobby.learnings.map((item,idx)=>(
                <div key={idx} style={{display:"flex",alignItems:"center",gap:"10px",padding:"10px 14px",background:`${hobby.color}06`,border:`1px solid ${hobby.color}20`,borderRadius:"8px"}}>
                  <div style={{width:"5px",height:"5px",borderRadius:"50%",background:hobby.color,flexShrink:0}}/>
                  <span style={{fontSize:"13px",color:"rgba(255,255,255,0.55)",lineHeight:1.5}}>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Measurable Impact */}
          <div>
            <ML color="rgba(255,255,255,0.30)" style={{marginBottom:"12px"}}>Measurable Impact</ML>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))",gap:"8px"}}>
              {hobby.impact.map((item,idx)=>(
                <div key={idx} style={{padding:"14px 16px",background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.06)",borderRadius:"8px",display:"flex",alignItems:"flex-start",gap:"10px"}}>
                  <div style={{width:"3px",height:"3px",borderRadius:"50%",background:hobby.color,flexShrink:0,marginTop:"7px"}}/>
                  <span style={{fontSize:"13px",color:"rgba(255,255,255,0.60)",lineHeight:1.6,fontWeight:500}}>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Stats — each uses stat.color with icon in colored box */}
          <div>
            <ML color="rgba(255,255,255,0.30)" style={{marginBottom:"12px"}}>Stats Overview</ML>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(150px,1fr))",gap:"8px"}}>
              {hobby.stats.map((s,idx)=>{
                const SI=s.icon;
                const sc=s.color||hobby.color;
                return(
                  <div key={idx} style={{padding:"16px 12px",background:`${sc}09`,border:`1px solid ${sc}30`,borderRadius:"12px",textAlign:"center"}}>
                    <div style={{width:"40px",height:"40px",borderRadius:"10px",background:`${sc}22`,border:`1px solid ${sc}40`,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 10px"}}>
                      <SI size={20} color={sc}/>
                    </div>
                    <div style={{fontFamily:"'Dancing Script',cursive",fontSize:"2.1rem",fontWeight:700,color:sc,lineHeight:1,marginBottom:"5px"}}>{s.value}</div>
                    <ML color="rgba(255,255,255,0.35)" style={{fontSize:"9px"}}>{s.label}</ML>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Daily routine — colored accent */}
          <div style={{padding:"16px 18px",background:`${hobby.color}08`,border:`1px solid ${hobby.color}25`,borderRadius:"8px",borderLeft:`3px solid ${hobby.color}`}}>
            <ML color={`${hobby.color}90`} style={{marginBottom:"6px"}}>Daily Routine</ML>
            <p style={{fontSize:"13.5px",color:"rgba(255,255,255,0.55)",lineHeight:1.75,fontStyle:"italic"}}>{hobby.dailyRoutine}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   ROOT PAGE
═══════════════════════════════════════════════════════ */
export default function BeyondCoding() {
  const [hR,hV]   = useInView(0.08);
  const [cR,cV]   = useInView(0.04);
  const [fR,fV]   = useInView(0.04);

  const [activeSection,   setActiveSection]   = useState(0);
  const [activeHobby,     setActiveHobby]     = useState(null);
  const [filterCategory,  setFilterCategory]  = useState("All");

  useEffect(()=>{
    const fn=()=>{
      const mid=window.innerHeight/2;
      SECTIONS.forEach((s,i)=>{
        const el=document.getElementById(s.id);
        if(!el)return;
        const r=el.getBoundingClientRect();
        if(r.top<=mid&&r.bottom>=mid)setActiveSection(i);
      });
    };
    window.addEventListener("scroll",fn,{passive:true});
    return()=>window.removeEventListener("scroll",fn);
  },[]);

  const filtered=hobbiesData.filter(h=>filterCategory==="All"||h.category===filterCategory);

  const W  = { maxWidth:"1200px", margin:"0 auto", padding:"0 2rem" };
  const SP = (t="5rem",b="5rem") => ({ padding:`${t} 0 ${b}` });

  return(
    <>
      <style>{GLOBAL}</style>
      <MagneticCursor/>
      <SideNav active={activeSection}/>

      {/* Background grid */}
      <div aria-hidden="true" style={{position:"fixed",inset:0,zIndex:0,pointerEvents:"none",backgroundImage:["linear-gradient(rgba(255,255,255,0.016) 1px, transparent 1px)","linear-gradient(90deg, rgba(255,255,255,0.016) 1px, transparent 1px)"].join(","),backgroundSize:"64px 64px",maskImage:"radial-gradient(ellipse 80% 55% at 50% 25%, black 10%, transparent)",WebkitMaskImage:"radial-gradient(ellipse 80% 55% at 50% 25%, black 10%, transparent)"}}/>

      <div style={{position:"relative",zIndex:1}}>

        {/* ─────────────────── HERO ─────────────────── */}
        <header ref={hR} id="intro" style={{...SP("8rem","5rem"),background:"#0B0B0B"}}>
          <div style={W}>
            {/* Eyebrow */}
            <div style={{display:"flex",alignItems:"center",gap:"12px",marginBottom:"2rem",opacity:hV?1:0,animation:hV?`_rtl ${MS.slow} ${E} 0.05s both`:"none"}}>
              <div style={{width:"20px",height:"1px",background:"rgba(255,255,255,0.55)"}}/>
              <ML>The Complete Developer · Life Beyond The Terminal</ML>
              <TermCursor/>
            </div>

            {/* Headline */}
            <h1 style={{fontFamily:"'Dancing Script',cursive",fontSize:"clamp(3.5rem,8vw,7rem)",fontWeight:700,color:"#FFFFFF",lineHeight:1.03,letterSpacing:"-0.03em",marginBottom:"1.5rem",maxWidth:"860px",opacity:hV?1:0,animation:hV?`_rtl ${MS.reveal} ${E} 0.12s both`:"none"}}>
              Beyond the Code
            </h1>

            {/* Sub */}
            <p style={{fontSize:"1rem",color:"rgba(255,255,255,0.42)",lineHeight:1.75,maxWidth:"580px",marginBottom:"3rem",opacity:hV?1:0,animation:hV?`_rtl ${MS.reveal} ${E} 0.20s both`:"none"}}>
              Elite developers aren't machines — they're multidimensional humans who fuel creativity, sharpen focus, and sustain excellence through intentional life design.
            </p>

            {/* Category filters — styled as hackathon pill nav */}
            <div style={{display:"flex",flexWrap:"wrap",gap:"8px",marginBottom:"3rem",opacity:hV?1:0,animation:hV?`_fade ${MS.slow} ${E} 0.26s both`:"none"}}>
              {CATEGORIES.map(cat=>(
                <button key={cat} data-magnetic onClick={()=>setFilterCategory(cat)}
                  style={{fontFamily:"'DM Mono',monospace",fontSize:"10px",fontWeight:500,letterSpacing:"0.10em",textTransform:"uppercase",padding:"6px 14px",borderRadius:"999px",background:filterCategory===cat?"rgba(255,255,255,0.10)":"rgba(255,255,255,0.03)",border:`1px solid ${filterCategory===cat?"rgba(255,255,255,0.30)":"rgba(255,255,255,0.08)"}`,color:filterCategory===cat?"#FFFFFF":"rgba(255,255,255,0.40)",cursor:"pointer",transition:`all ${MS.fast} ${E}`}}
                  onMouseEnter={(e)=>{if(filterCategory!==cat){e.currentTarget.style.background="rgba(255,255,255,0.06)";e.currentTarget.style.borderColor="rgba(255,255,255,0.15)";e.currentTarget.style.color="rgba(255,255,255,0.65)";}}}
                  onMouseLeave={(e)=>{if(filterCategory!==cat){e.currentTarget.style.background="rgba(255,255,255,0.03)";e.currentTarget.style.borderColor="rgba(255,255,255,0.08)";e.currentTarget.style.color="rgba(255,255,255,0.40)";}}}
                >{cat}</button>
              ))}
            </div>

            {/* Pillars */}
            <div className="hpillars" style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:"1px",background:"rgba(255,255,255,0.06)",borderRadius:"12px",overflow:"hidden",border:"1px solid rgba(255,255,255,0.06)",opacity:hV?1:0,animation:hV?`_si ${MS.slow} ${E} 0.30s both`:"none"}}>
              {[
                { label:"Creative",     desc:"Music, cinema, photography",    icon:Sparkles },
                { label:"Physical",     desc:"Fitness, discipline, endurance", icon:Dumbbell },
                { label:"Mental",       desc:"Gaming, strategy, focus",        icon:Brain    },
                { label:"Experiential", desc:"Travel, culture, perspective",   icon:Compass  },
              ].map((p,i)=>{
                const PI=p.icon;
                return(
                  <div key={i} style={{padding:"1.5rem 1.25rem",background:"#0B0B0B"}}>
                    <div style={{display:"flex",alignItems:"center",gap:"8px",marginBottom:"6px"}}>
                      <PI size={14} color="rgba(255,255,255,0.55)"/>
                      <span style={{fontSize:"13px",fontWeight:600,color:"#FFFFFF"}}>{p.label}</span>
                    </div>
                    <p style={{fontSize:"11.5px",color:"rgba(255,255,255,0.35)",lineHeight:1.6}}>{p.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </header>

        {/* Marquee */}
        <Marquee speed={34}/>

        {/* ─────────────────── HOBBIES ─────────────────── */}
        <section ref={cR} id="hobbies"
          style={{borderTop:"1px solid rgba(255,255,255,0.06)",borderBottom:"1px solid rgba(255,255,255,0.06)",background:"#0B0B0B"}}
        >
          <div style={W}>
            <div style={{padding:"4rem 0 2.5rem"}}>
              <SH eyebrow="Section 02" title="Interests & Pursuits" sub="Seven domains of intentional life design — each one feeding back into engineering excellence." visible={cV} cursor/>
            </div>
          </div>

          {filtered.map((hobby,i)=>(
            <div key={hobby.id}>
              <div style={W}>
                <HobbyRow hobby={hobby} visible={cV} delay={i*0.07} ri={i} onSelect={setActiveHobby}/>
              </div>
            </div>
          ))}

          {filtered.length===0&&(
            <div style={{...W}}>
              <div style={{padding:"4rem 0",textAlign:"center"}}>
                <ML color="rgba(255,255,255,0.25)">No hobbies in this category</ML>
              </div>
            </div>
          )}

          <div style={{height:"3rem"}}/>
        </section>

        <Marquee speed={28}/>

        {/* ─────────────────── CONNECT / FOOTER ─────────────────── */}
        <footer ref={fR} id="connect" style={{background:"#000000",position:"relative",overflow:"hidden"}}>
          {/* Wave */}
          <div style={{position:"relative",height:"56px",background:"#0B0B0B",overflow:"hidden"}}>
            <svg viewBox="0 0 1440 56" preserveAspectRatio="none" style={{position:"absolute",bottom:0,left:0,width:"100%",height:"100%"}}>
              <path d="M0,0 C360,56 720,0 1080,28 C1260,42 1380,14 1440,28 L1440,56 L0,56 Z" fill="#000000"/>
            </svg>
          </div>

          <div aria-hidden="true" style={{position:"absolute",inset:0,zIndex:0,pointerEvents:"none",backgroundImage:["linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)","linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)"].join(","),backgroundSize:"48px 48px"}}/>
          <div aria-hidden="true" style={{position:"absolute",left:"-5%",top:"15%",width:"420px",height:"420px",borderRadius:"50%",background:"radial-gradient(circle, rgba(255,255,255,0.04), transparent 70%)",filter:"blur(60px)",pointerEvents:"none"}}/>

          <div style={{...W,position:"relative",zIndex:1}}>
            {/* CTA row */}
            <div style={{borderBottom:"1px solid rgba(255,255,255,0.06)",padding:"4rem 0"}}>
              <div className="fctar" style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",gap:"2.5rem",flexWrap:"wrap"}}>
                <div style={{maxWidth:"540px"}}>
                  <div style={{display:"inline-flex",alignItems:"center",gap:"6px",padding:"5px 12px",borderRadius:"999px",background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.12)",marginBottom:"20px",opacity:fV?1:0,animation:fV?`_rtl ${MS.slow} ${E} 0.05s both`:"none"}}>
                    <div style={{width:"5px",height:"5px",borderRadius:"50%",background:"rgba(255,255,255,0.85)",animation:"_pulse 2.2s ease-in-out infinite"}}/>
                    <ML color="rgba(255,255,255,0.65)">Open to Opportunities · 2026</ML>
                  </div>
                  <h2 style={{fontFamily:"'Dancing Script',cursive",fontSize:"clamp(3rem,6vw,5.5rem)",fontWeight:700,color:"#FFFFFF",lineHeight:1.04,letterSpacing:"-0.03em",marginBottom:"14px",opacity:fV?1:0,animation:fV?`_rtl ${MS.reveal} ${E} 0.12s both`:"none"}}>
                    Build a Legendary Life
                  </h2>
                  <p style={{fontSize:"15px",color:"rgba(255,255,255,0.35)",lineHeight:1.75,maxWidth:"400px",opacity:fV?1:0,animation:fV?`_rtl ${MS.reveal} ${E} 0.20s both`:"none"}}>
                    Great code comes from great people. Let's connect and inspire each other to build exceptional software and exceptional lives.
                  </p>
                </div>
                <div style={{display:"flex",flexDirection:"column",gap:"10px",minWidth:"230px"}}>
                  <FooterCTA label="Schedule Interview" sub="Primary" href="mailto:g.sivasatyasaibhagavan@gmail.com" accent visible={fV} delay={0.16}/>
                  <FooterCTA label="View Projects"      sub="GitHub"  href="https://github.com/bhagavan444"                  accent={false} visible={fV} delay={0.22}/>
                  <FooterCTA label="View Portfolio"     sub="Work"    href="/"                                               accent={false} visible={fV} delay={0.28}/>
                </div>
              </div>
            </div>

            {/* Footer meta */}
            <div className="fgrid" style={{display:"grid",gridTemplateColumns:"2fr 1fr 1fr 1fr",gap:"2.5rem",padding:"3rem 0 2.5rem"}}>
              <div>
                <div style={{fontFamily:"'Dancing Script',cursive",fontSize:"2rem",fontWeight:700,color:"#FFFFFF",letterSpacing:"-0.03em",marginBottom:"10px"}}>
                  Bhagavan<span style={{color:"rgba(255,255,255,0.35)"}}>.</span>
                </div>
                <p style={{fontSize:"12.5px",color:"rgba(255,255,255,0.28)",lineHeight:1.75,marginBottom:"20px",maxWidth:"240px"}}>
                  B.Tech AIDS · Ramachandra College · Andhra Pradesh, India.
                </p>
                <div style={{display:"flex",gap:"6px"}}>
                  {[
                    {l:"GH",h:"https://github.com/bhagavan444"},
                    {l:"LI",h:"https://www.linkedin.com/in/gopalajosyula-siva-satya-sai-bhagavan-1624a027b/"},
                    {l:"✉", h:"mailto:g.sivasatyasaibhagavan@gmail.com"},
                  ].map((s,i)=>(
                    <a key={i} href={s.h} data-magnetic target={s.h.startsWith("http")?"_blank":undefined} rel={s.h.startsWith("http")?"noopener noreferrer":undefined}
                      style={{width:"32px",height:"32px",borderRadius:"7px",background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'DM Mono',monospace",color:"rgba(255,255,255,0.35)",textDecoration:"none",fontSize:"11px"}}
                    >{s.l}</a>
                  ))}
                </div>
              </div>
              <div>
                <ML color="rgba(255,255,255,0.18)" style={{marginBottom:"18px"}}>Navigate</ML>
                {["Intro","Hobbies","Connect"].map((l,i)=>(
                  <a key={i} href="#" style={{display:"block",fontSize:"13px",color:"rgba(255,255,255,0.32)",textDecoration:"none",marginBottom:"10px"}}>{l}</a>
                ))}
              </div>
              <div>
                <ML color="rgba(255,255,255,0.18)" style={{marginBottom:"18px"}}>Work</ML>
                {[{l:"All Projects",h:"/projects"},{l:"GitHub",h:"https://github.com/bhagavan444"},{l:"Skills Page",h:"/skills"},{l:"Resume / CV",h:"#"}].map((l,i)=>(
                  <a key={i} href={l.h} style={{display:"block",fontSize:"13px",color:"rgba(255,255,255,0.32)",textDecoration:"none",marginBottom:"10px"}}>{l.l}</a>
                ))}
              </div>
              <div>
                <ML color="rgba(255,255,255,0.18)" style={{marginBottom:"18px"}}>Contact</ML>
                {[
                  {lb:"Email",    v:"g.sivasatyasaibhagavan@gmail.com"},
                  {lb:"Phone",    v:"+91 7569205626"},
                  {lb:"Location", v:"Andhra Pradesh, IN"},
                  {lb:"Status",   v:"Available · Immediate",bright:true},
                ].map((c,i)=>(
                  <div key={i} style={{marginBottom:"14px"}}>
                    <ML color="rgba(255,255,255,0.20)" style={{fontSize:"9px",marginBottom:"3px"}}>{c.lb}</ML>
                    <div style={{fontSize:"12.5px",color:c.bright?"rgba(255,255,255,0.85)":"rgba(255,255,255,0.42)"}}>{c.v}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom bar */}
            <div style={{borderTop:"1px solid rgba(255,255,255,0.06)",padding:"1.5rem 0",display:"flex",alignItems:"center",justifyContent:"space-between",gap:"1rem",flexWrap:"wrap"}}>
              <div style={{fontFamily:"'DM Mono',monospace",fontSize:"11px",color:"rgba(255,255,255,0.20)"}}>
                © 2026 Siva Satya Sai Bhagavan
              </div>
              <div style={{display:"flex",gap:"20px"}}>
                {["Privacy","Terms","Sitemap"].map(l=>(
                  <a key={l} href="#" style={{fontFamily:"'DM Mono',monospace",fontSize:"11px",color:"rgba(255,255,255,0.20)",textDecoration:"none"}}>{l}</a>
                ))}
              </div>
              <div style={{display:"flex",alignItems:"center",gap:"6px"}}>
                <div style={{width:"5px",height:"5px",borderRadius:"50%",background:"rgba(255,255,255,0.75)",animation:"_pulse 2.2s ease-in-out infinite"}}/>
                <span style={{fontFamily:"'DM Mono',monospace",fontSize:"11px",color:"rgba(255,255,255,0.55)"}}>Available for hire</span>
              </div>
            </div>
          </div>
        </footer>
      </div>

      {/* Hobby Detail Modal */}
      <HobbyModal hobby={activeHobby} onClose={()=>setActiveHobby(null)}/>
    </>
  );
}