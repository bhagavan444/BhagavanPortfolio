"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  Mail, Phone, Github, Linkedin, Send, CheckCircle2,
  ExternalLink, ArrowRight, MapPin, Clock, Download, Briefcase
} from "lucide-react";
import resumePdf from "../assets/bhagavanresume.pdf";

/* ═══════════════════════════════════════════════════════════════
   DESIGN TOKENS — Skills Monochrome Architectural System
═══════════════════════════════════════════════════════════════ */
const C = {
  bg:        "#0B0B0B",
  surface:   "#111111",
  surfaceHi: "#151515",
  card:      "#0F0F0F",
  border:    "rgba(255,255,255,0.06)",
  border2:   "rgba(255,255,255,0.10)",
  border3:   "rgba(255,255,255,0.16)",
  text:      "#FFFFFF",
  muted:     "rgba(255,255,255,0.55)",
  muted2:    "rgba(255,255,255,0.38)",
  muted3:    "rgba(255,255,255,0.22)",
  subtle:    "rgba(255,255,255,0.05)",
  subtleHi:  "rgba(255,255,255,0.09)",
};

const E  = "cubic-bezier(0.16, 1, 0.3, 1)";
const MS = { fast:"130ms", base:"190ms", slow:"320ms", reveal:"440ms" };

/* ═══════════════════════════════════════════════════════════════
   GLOBAL CSS — Skills system, contact-extended
═══════════════════════════════════════════════════════════════ */
const GLOBAL = `
  @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@600;700&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&family=DM+Mono:wght@400;500&display=swap');

  *,*::before,*::after{margin:0;padding:0;box-sizing:border-box;}
  html{scroll-behavior:smooth;overflow-x:hidden;}
  body{
    font-family:'DM Sans',system-ui,sans-serif;
    background:#0B0B0B;color:#FFFFFF;
    -webkit-font-smoothing:antialiased;overflow-x:hidden;cursor:none;
  }
  a,button,[data-magnetic],select,input,textarea{cursor:none;}

  @keyframes _cursorIn{
    from{opacity:0;transform:translate(-50%,-50%) scale(0.2);}
    to  {opacity:1;transform:translate(-50%,-50%) scale(1);}
  }
  ::selection{background:rgba(255,255,255,0.12);}
  ::-webkit-scrollbar{width:2px;}
  ::-webkit-scrollbar-track{background:transparent;}
  ::-webkit-scrollbar-thumb{background:rgba(255,255,255,0.25);border-radius:2px;}

  @keyframes _rtl  {from{opacity:0;transform:translateX(48px);}  to{opacity:1;transform:translateX(0);}}
  @keyframes _ltr  {from{opacity:0;transform:translateX(-48px);} to{opacity:1;transform:translateX(0);}}
  @keyframes _up   {from{opacity:0;transform:translateY(18px);}  to{opacity:1;transform:translateY(0);}}
  @keyframes _fade {from{opacity:0;} to{opacity:1;}}
  @keyframes _pulse{0%,100%{opacity:0.3;transform:scale(1);}  50%{opacity:1;transform:scale(1.35);}}
  @keyframes _blink{0%,100%{opacity:1;} 50%{opacity:0;}}
  @keyframes _lx   {from{transform:scaleX(0);} to{transform:scaleX(1);}}
  @keyframes _spin {from{transform:rotate(0deg);}  to{transform:rotate(360deg);}}
  @keyframes _successIn{from{opacity:0;transform:scale(0.94) translateY(16px);}to{opacity:1;transform:scale(1) translateY(0);}}
  @keyframes _checkPop {0%{transform:scale(0);}70%{transform:scale(1.15);}100%{transform:scale(1);}}
  @keyframes _shimmer  {0%{transform:translateX(-100%);}100%{transform:translateX(200%);}}
  @keyframes _tagIn    {from{opacity:0;transform:translateX(14px) scale(0.92);}to{opacity:1;transform:translateX(0) scale(1);}}

  #sp{position:fixed;top:0;left:0;right:0;height:2px;background:rgba(255,255,255,0.05);z-index:9998;}
  #sp-bar{height:100%;background:linear-gradient(90deg,rgba(255,255,255,0.85),rgba(255,255,255,0.35));transition:width 0.1s linear;}

  .nav-a{position:relative;text-decoration:none;color:rgba(255,255,255,0.38);
    font-family:'DM Mono',monospace;font-size:0.75rem;font-weight:500;
    letter-spacing:0.07em;padding:0.28rem 0;transition:color 0.18s;}
  .nav-a::after{content:'';position:absolute;bottom:-1px;left:0;width:100%;height:1px;
    background:#FFFFFF;transform:scaleX(0);transform-origin:left;
    transition:transform 0.22s cubic-bezier(0.16,1,0.3,1);}
  .nav-a:hover,.nav-a.act{color:#FFFFFF;}
  .nav-a:hover::after,.nav-a.act::after{transform:scaleX(1);}

  .fi-wrap{position:relative;width:100%;}
  .fi-wrap input,.fi-wrap textarea,.fi-wrap select{
    width:100%;font-family:'DM Sans',system-ui,sans-serif;font-size:0.9rem;
    color:#FFFFFF;background:#141414;border:1.5px solid rgba(255,255,255,0.08);
    border-radius:8px;outline:none;-webkit-appearance:none;appearance:none;
    transition:border-color 0.18s,box-shadow 0.18s,background 0.18s;
  }
  .fi-wrap input::placeholder,.fi-wrap textarea::placeholder{color:rgba(255,255,255,0.20);}
  .fi-wrap input,.fi-wrap select{height:52px;padding:0 1rem;}
  .fi-wrap textarea{min-height:145px;padding:0.9rem 1rem;resize:vertical;line-height:1.68;}
  .fi-wrap input:focus,.fi-wrap textarea:focus,.fi-wrap select:focus{
    border-color:rgba(255,255,255,0.30);box-shadow:0 0 0 3px rgba(255,255,255,0.05);background:#1A1A1A;
  }
  .fi-wrap input.err,.fi-wrap textarea.err,.fi-wrap select.err{
    border-color:rgba(220,38,38,0.55);box-shadow:0 0 0 3px rgba(220,38,38,0.07);
  }
  .fi-wrap select option{background:#141414;color:#FFFFFF;}
  .fi-lbl{display:block;font-family:'DM Mono',monospace;font-size:0.68rem;font-weight:500;
    letter-spacing:0.12em;text-transform:uppercase;color:rgba(255,255,255,0.35);margin-bottom:0.45rem;}
  .fi-err{font-family:'DM Mono',monospace;font-size:0.70rem;color:rgba(220,38,38,0.85);margin-top:0.35rem;}
  .fi-cnt{font-family:'DM Mono',monospace;font-size:0.63rem;color:rgba(255,255,255,0.25);text-align:right;margin-top:0.3rem;}

  .cc{display:flex;align-items:center;gap:1rem;padding:1.1rem 1.25rem;background:#111111;
    border:1px solid rgba(255,255,255,0.06);border-radius:10px;text-decoration:none;
    transition:background 0.18s,border-color 0.18s,transform 0.22s;}
  .cc:hover{background:#151515;border-color:rgba(255,255,255,0.12);transform:translateY(-2px);}

  .sc{background:#111111;border:1px solid rgba(255,255,255,0.06);border-radius:12px;overflow:hidden;position:relative;}
  .sc-head{padding:1.25rem 1.5rem;border-bottom:1px solid rgba(255,255,255,0.06);background:#0F0F0F;}
  .sc-body{padding:1.1rem 1.5rem;}

  .hamburger{display:none;flex-direction:column;gap:4px;background:none;border:none;padding:4px;}
  .hamburger span{display:block;width:20px;height:1.5px;background:#FFFFFF;border-radius:2px;transition:all 0.25s;}
  .mob-menu{display:none;position:fixed;top:62px;left:0;right:0;
    background:rgba(11,11,11,0.97);backdrop-filter:blur(20px);
    border-bottom:1px solid rgba(255,255,255,0.06);z-index:999;
    padding:1rem 1.5rem;flex-direction:column;gap:0;}
  .mob-menu.open{display:flex;}
  .mob-a{display:block;padding:0.85rem 0;text-decoration:none;color:rgba(255,255,255,0.42);
    font-family:'DM Mono',monospace;font-size:0.78rem;letter-spacing:0.06em;
    border-bottom:1px solid rgba(255,255,255,0.04);transition:color 0.18s;}
  .mob-a:last-child{border-bottom:none;}
  .mob-a:hover,.mob-a.act{color:#FFFFFF;}

  .main-grid{display:grid;grid-template-columns:1.25fr 1fr;gap:3rem;align-items:start;}
  .name-email-row{display:grid;grid-template-columns:1fr 1fr;gap:1.1rem;}
  .trust-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:0.85rem;}
  .role-pills{display:flex;flex-wrap:wrap;gap:0.5rem;}
  .cta-inner{display:flex;align-items:center;justify-content:space-between;gap:2.5rem;flex-wrap:wrap;}
  .cta-btns{display:flex;flex-direction:column;gap:0.7rem;flex-shrink:0;min-width:205px;}

  @media(max-width:1024px){
    .main-grid{grid-template-columns:1fr !important;}
    .sidebar-sticky{position:static !important;top:auto !important;}
    .cta-inner{flex-direction:column !important;align-items:stretch !important;}
    .cta-btns{flex-direction:row !important;width:100% !important;}
    .cta-btns .cbtn{flex:1 !important;}
  }
  @media(max-width:768px){
    body{cursor:auto !important;}
    #mc-dot,#mc-ring{display:none !important;}
    a,button,select,input,textarea,[data-magnetic]{cursor:auto !important;}
    .desktop-nav{display:none !important;}
    .hamburger{display:flex !important;}
    .trust-grid{grid-template-columns:1fr 1fr !important;gap:0.65rem !important;}
    .cta-inner{padding:2rem 1.25rem !important;border-radius:14px !important;}
    .cta-btns{flex-direction:column !important;}
    .cta-btns .cbtn{flex:none !important;width:100% !important;}
    .name-email-row{grid-template-columns:1fr !important;}
    .role-pills-wrap{display:none !important;}
    .hero-title{font-size:clamp(2.3rem,9vw,3.4rem) !important;}
  }
  @media(max-width:480px){
    .trust-grid{grid-template-columns:1fr !important;}
    .hero-title{font-size:clamp(2rem,10vw,3rem) !important;}
  }
  @media(prefers-reduced-motion:reduce){
    *,*::before,*::after{animation-duration:0.01ms !important;transition-duration:0.01ms !important;}
  }
`;

/* ═══════════════════════════════════════════════════════════════
   HOOKS
═══════════════════════════════════════════════════════════════ */
function useInView(threshold = 0.08) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, vis];
}

function useMob() {
  const [m, setM] = useState(false);
  useEffect(() => {
    const fn = () => setM(window.innerWidth < 768);
    fn(); window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);
  return m;
}

/* ═══════════════════════════════════════════════════════════════
   SCROLL PROGRESS — skills system
═══════════════════════════════════════════════════════════════ */
function ScrollBar() {
  const [p, sp] = useState(0);
  const raf = useRef(null);
  useEffect(() => {
    const fn = () => {
      if (raf.current) return;
      raf.current = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        sp(max > 0 ? (window.scrollY / max) * 100 : 0);
        raf.current = null;
      });
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => { window.removeEventListener("scroll", fn); if (raf.current) cancelAnimationFrame(raf.current); };
  }, []);
  return <div id="sp"><div id="sp-bar" style={{ width: `${p}%` }} /></div>;
}

/* ═══════════════════════════════════════════════════════════════
   MAGNETIC CURSOR — full skills system
═══════════════════════════════════════════════════════════════ */
function MagneticCursor() {
  const dotRef  = useRef(null);
  const ringRef = useRef(null);
  useEffect(() => {
    const dot  = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;
    let mx=-200,my=-200,rx=-200,ry=-200,rSize=36,targetRSize=36;
    let magEl=null,magOX=0,magOY=0,targetMagOX=0,targetMagOY=0,rafId=null,visible=false;
    const lerp=(a,b,t)=>a+(b-a)*t;
    const onMove=(e)=>{
      mx=e.clientX;my=e.clientY;
      if(!visible){visible=true;dot.style.opacity="1";ring.style.opacity="1";}
      const els=document.querySelectorAll("[data-magnetic]");
      let found=null;
      els.forEach((el)=>{
        const r=el.getBoundingClientRect();
        const cx=r.left+r.width/2,cy=r.top+r.height/2;
        if(Math.hypot(mx-cx,my-cy)<Math.max(r.width,r.height)*0.65) found=el;
      });
      if(found){
        magEl=found;
        const r=found.getBoundingClientRect();
        const cx=r.left+r.width/2,cy=r.top+r.height/2;
        targetMagOX=(mx-cx)*0.38;targetMagOY=(my-cy)*0.38;targetRSize=58;
      } else {
        if(magEl){magEl.style.transform="";magEl.style.transition=`transform 400ms ${E}`;}
        magEl=null;targetMagOX=0;targetMagOY=0;targetRSize=36;
      }
    };
    const onLeave=()=>{visible=false;dot.style.opacity="0";ring.style.opacity="0";if(magEl){magEl.style.transform="";magEl=null;}};
    const onDown=()=>{targetRSize=22;dot.style.transform="translate(-50%,-50%) scale(0.5)";};
    const onUp=()=>{targetRSize=magEl?58:36;dot.style.transform="translate(-50%,-50%) scale(1)";};
    const onOver=(e)=>{
      const isInt=e.target.closest("a,button,[data-magnetic],input,textarea,select");
      ring.style.borderColor=isInt?"rgba(255,255,255,0.9)":"rgba(255,255,255,0.45)";
      ring.style.background =isInt?"rgba(255,255,255,0.06)":"transparent";
    };
    const tick=()=>{
      dot.style.left=mx+"px";dot.style.top=my+"px";
      rx=lerp(rx,mx,0.13);ry=lerp(ry,my,0.13);rSize=lerp(rSize,targetRSize,0.14);
      ring.style.left=rx+"px";ring.style.top=ry+"px";
      ring.style.width=rSize+"px";ring.style.height=rSize+"px";
      if(magEl){
        magOX=lerp(magOX,targetMagOX,0.14);magOY=lerp(magOY,targetMagOY,0.14);
        magEl.style.transform=`translate(${magOX}px,${magOY}px)`;magEl.style.transition="none";
      } else {magOX=lerp(magOX,0,0.12);magOY=lerp(magOY,0,0.12);}
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
  const BASE={position:"fixed",top:0,left:0,transform:"translate(-50%,-50%)",pointerEvents:"none",zIndex:99999,opacity:0,animation:"_cursorIn 400ms cubic-bezier(0.16,1,0.3,1) 0.5s both"};
  return (
    <>
      <div id="mc-dot" ref={dotRef} style={{...BASE,width:"8px",height:"8px",borderRadius:"50%",background:"#FFFFFF",transition:"transform 120ms cubic-bezier(0.16,1,0.3,1), opacity 200ms ease",willChange:"left,top,transform"}}/>
      <div id="mc-ring" ref={ringRef} style={{...BASE,width:"36px",height:"36px",borderRadius:"50%",border:"1.5px solid rgba(255,255,255,0.45)",background:"transparent",transition:"border-color 180ms ease, background 180ms ease, opacity 200ms ease",willChange:"left,top,width,height",mixBlendMode:"difference"}}/>
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════
   ML — skills mono label
═══════════════════════════════════════════════════════════════ */
function ML({ children, color="rgba(255,255,255,0.38)", style:s={} }) {
  return (
    <span style={{display:"block",fontFamily:"'DM Mono',monospace",fontSize:"10px",fontWeight:500,letterSpacing:"0.14em",textTransform:"uppercase",color,...s}}>
      {children}
    </span>
  );
}

function TermCursor() {
  return (
    <span style={{display:"inline-block",width:"8px",height:"1.1em",background:"#FFFFFF",marginLeft:"3px",verticalAlign:"middle",animation:"_blink 1.1s step-end infinite",borderRadius:"1px"}}/>
  );
}

/* ═══════════════════════════════════════════════════════════════
   FORM FIELD COMPONENTS — dark system
═══════════════════════════════════════════════════════════════ */
function FInput({ label, error, value, onChange, ...props }) {
  return (
    <div className="fi-wrap">
      <label className="fi-lbl">{label}</label>
      <input {...props} value={value} onChange={onChange} className={error?"err":""} />
      {error && <div className="fi-err">↳ {error}</div>}
    </div>
  );
}

function FTextarea({ label, error, value, onChange, maxLength, ...props }) {
  const count = value ? value.length : 0;
  return (
    <div className="fi-wrap">
      <label className="fi-lbl">{label}</label>
      <textarea {...props} value={value} onChange={onChange} maxLength={maxLength} className={error?"err":""}/>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        {error ? <div className="fi-err">↳ {error}</div> : <span/>}
        {maxLength && <div className="fi-cnt">{count}/{maxLength}</div>}
      </div>
    </div>
  );
}

function FSelect({ label, error, value, onChange, children, ...props }) {
  return (
    <div className="fi-wrap">
      <label className="fi-lbl">{label}</label>
      <div style={{position:"relative"}}>
        <select {...props} value={value} onChange={onChange} className={error?"err":""}
          style={{paddingRight:"2.5rem",backgroundImage:`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%23ffffff' stroke-opacity='0.38' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,backgroundRepeat:"no-repeat",backgroundPosition:"right 0.85rem center"}}
        >{children}</select>
      </div>
      {error && <div className="fi-err">↳ {error}</div>}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   TRUST CHIP — skills MetCard aesthetic
═══════════════════════════════════════════════════════════════ */
function TrustChip({ icon: Icon, label, value }) {
  const [ref, vis] = useInView(0.15);
  const [hov, setHov] = useState(false);
  return (
    <div ref={ref} data-magnetic
      onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{
        display:"flex", alignItems:"center", gap:"0.9rem",
        padding:"1rem 1.1rem",
        background: hov ? "#151515" : "#111111",
        border:`1px solid ${hov?"rgba(255,255,255,0.12)":"rgba(255,255,255,0.06)"}`,
        borderRadius:"10px", position:"relative", overflow:"hidden",
        opacity: vis ? 1 : 0,
        transform: vis ? (hov ? "scale(1.016)" : "translateY(0)") : "translateY(14px)",
        transition:`opacity 0.5s ease, transform ${MS.base} ${E}, background ${MS.fast} ${E}, border-color ${MS.fast} ${E}`,
      }}
    >
      <div aria-hidden="true" style={{position:"absolute",top:0,left:"10%",right:"10%",height:"1px",background:"linear-gradient(90deg,transparent,rgba(255,255,255,0.07),transparent)",pointerEvents:"none"}}/>
      <div style={{width:"36px",height:"36px",borderRadius:"8px",background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.08)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
        <Icon size={15} style={{color:"rgba(255,255,255,0.65)"}} strokeWidth={1.8}/>
      </div>
      <div>
        <div style={{fontFamily:"'Dancing Script',cursive",fontSize:"1.5rem",fontWeight:700,color:"#FFFFFF",lineHeight:1,marginBottom:"3px"}}>{value}</div>
        <div style={{fontFamily:"'DM Mono',monospace",fontSize:"0.60rem",color:"rgba(255,255,255,0.32)",letterSpacing:"0.06em"}}>{label}</div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   CONTACT CARD — skills dark cc
═══════════════════════════════════════════════════════════════ */
function ContactCard({ icon: Icon, label, value, href, detail }) {
  return (
    <a href={href} data-magnetic
      target={href?.startsWith("http")?"_blank":undefined}
      rel={href?.startsWith("http")?"noopener noreferrer":undefined}
      className="cc"
    >
      <div style={{width:"40px",height:"40px",borderRadius:"8px",background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
        <Icon size={17} style={{color:"rgba(255,255,255,0.50)"}} strokeWidth={1.8}/>
      </div>
      <div style={{flex:1,minWidth:0}}>
        <ML color="rgba(255,255,255,0.22)" style={{marginBottom:"3px",fontSize:"0.60rem"}}>{label}</ML>
        <div style={{fontSize:"0.86rem",fontWeight:600,color:"#FFFFFF",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{value}</div>
        {detail && <div style={{fontFamily:"'DM Mono',monospace",fontSize:"0.63rem",color:"rgba(255,255,255,0.28)",marginTop:"2px",letterSpacing:"0.03em"}}>{detail}</div>}
      </div>
      <ArrowRight size={13} style={{color:"rgba(255,255,255,0.22)",flexShrink:0}} strokeWidth={1.8}/>
    </a>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SUCCESS STATE
═══════════════════════════════════════════════════════════════ */
function SuccessState({ onReset }) {
  return (
    <div style={{textAlign:"center",padding:"3.5rem 1.5rem",animation:"_successIn 0.6s cubic-bezier(0.16,1,0.3,1) both"}}>
      <div style={{width:"68px",height:"68px",borderRadius:"50%",background:"rgba(255,255,255,0.06)",border:"1.5px solid rgba(255,255,255,0.16)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 1.5rem",animation:"_checkPop 0.5s cubic-bezier(0.34,1.56,0.64,1) 0.1s both"}}>
        <CheckCircle2 size={32} style={{color:"#FFFFFF"}} strokeWidth={1.5}/>
      </div>
      <h3 style={{fontFamily:"'Dancing Script',cursive",fontSize:"2.2rem",fontWeight:700,color:"#FFFFFF",marginBottom:"0.65rem",letterSpacing:"-0.01em"}}>
        Message received.
      </h3>
      <p style={{fontSize:"0.88rem",color:"rgba(255,255,255,0.38)",lineHeight:1.78,maxWidth:"300px",margin:"0 auto 1.75rem"}}>
        I'll review and respond within 24 hours.
      </p>
      <button data-magnetic onClick={onReset}
        style={{display:"inline-flex",alignItems:"center",gap:"6px",padding:"0.75rem 1.5rem",borderRadius:"8px",background:"rgba(255,255,255,0.07)",border:"1px solid rgba(255,255,255,0.12)",color:"#FFFFFF",fontSize:"0.84rem",fontWeight:500,fontFamily:"'DM Mono',monospace",transition:`background ${MS.fast} ${E}, border-color ${MS.fast} ${E}`,margin:"0 auto"}}
        onMouseEnter={e=>{e.currentTarget.style.background="rgba(255,255,255,0.13)";e.currentTarget.style.borderColor="rgba(255,255,255,0.22)";}}
        onMouseLeave={e=>{e.currentTarget.style.background="rgba(255,255,255,0.07)";e.currentTarget.style.borderColor="rgba(255,255,255,0.12)";}}
      >
        Send another
      </button>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   ROOT PAGE
═══════════════════════════════════════════════════════════════ */
export default function Contact() {
  const [form, setForm] = useState({ name:"", email:"", subject:"", message:"" });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const [heroRef, heroVis] = useInView(0.06);
  const [formRef, formVis] = useInView(0.06);
  const [ctaRef,  ctaVis]  = useInView(0.06);
  const [fRef,    fVis]    = useInView(0.06);
  const mob = useMob();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 32);
    window.addEventListener("scroll", fn, { passive:true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    const fn = (e) => { if (!e.target.closest("nav")) setMenuOpen(false); };
    document.addEventListener("click", fn);
    return () => document.removeEventListener("click", fn);
  }, []);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    else if (form.name.trim().length < 2) e.name = "Name too short";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Invalid email format";
    if (!form.subject) e.subject = "Please select a subject";
    if (!form.message.trim()) e.message = "Message is required";
    else if (form.message.trim().length < 10) e.message = "Too short — min 10 characters";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(p => ({ ...p, [name]:value }));
    if (errors[name]) setErrors(p => ({ ...p, [name]:"" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    await new Promise(r => setTimeout(r, 1600));
    setSuccess(true);
    setForm({ name:"", email:"", subject:"", message:"" });
    setSubmitting(false);
  };

  const W = { maxWidth:"1160px", margin:"0 auto", padding: mob?"0 1.25rem":"0 2rem" };
  const navLinks = [["Home","/"],["Work","/#work"],["Skills","/#skills"],["Contact","/contact"]];

  return (
    <>
      <style>{GLOBAL}</style>
      <MagneticCursor />
      <ScrollBar />

      {/* Background grid texture — exact skills system */}
      <div aria-hidden="true" style={{
        position:"fixed", inset:0, zIndex:0, pointerEvents:"none",
        backgroundImage:["linear-gradient(rgba(255,255,255,0.016) 1px, transparent 1px)","linear-gradient(90deg, rgba(255,255,255,0.016) 1px, transparent 1px)"].join(","),
        backgroundSize:"64px 64px",
        maskImage:"radial-gradient(ellipse 80% 55% at 50% 25%, black 10%, transparent)",
        WebkitMaskImage:"radial-gradient(ellipse 80% 55% at 50% 25%, black 10%, transparent)",
      }}/>

      {/* ─── NAVBAR ─── */}
      <nav style={{
        position:"fixed",top:0,left:0,right:0,zIndex:1000,height:"62px",padding:"0 1.75rem",
        display:"flex",alignItems:"center",justifyContent:"space-between",
        background: scrolled?"rgba(11,11,11,0.92)":"transparent",
        backdropFilter: scrolled?"blur(20px) saturate(120%)":"none",
        WebkitBackdropFilter: scrolled?"blur(20px) saturate(120%)":"none",
        borderBottom: scrolled?"1px solid rgba(255,255,255,0.06)":"1px solid transparent",
        transition:"all 0.3s ease",
      }}>
        <a href="/" style={{fontFamily:"'Dancing Script',cursive",fontSize:"1.45rem",fontWeight:700,color:"#FFFFFF",letterSpacing:"-0.01em",textDecoration:"none"}}>
          Bhagavan<span style={{color:"rgba(255,255,255,0.28)"}}>.</span>
        </a>
        <div className="desktop-nav" style={{display:"flex",gap:"2.5rem"}}>
          {navLinks.map(([l,h]) => (
            <a key={l} href={h} className={`nav-a${h==="/contact"?" act":""}`}>{l}</a>
          ))}
        </div>
        <div style={{display:"flex",alignItems:"center",gap:"0.75rem"}}>
          <a href={resumePdf} download data-magnetic
            style={{display:"inline-flex",alignItems:"center",gap:"6px",padding:"0.48rem 0.9rem",borderRadius:"7px",fontSize:"0.72rem",fontWeight:500,fontFamily:"'DM Mono',monospace",letterSpacing:"0.05em",color:"rgba(255,255,255,0.55)",background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.09)",textDecoration:"none",transition:`background ${MS.fast} ${E}, border-color ${MS.fast} ${E}, color ${MS.fast} ${E}`}}
            onMouseEnter={e=>{e.currentTarget.style.background="rgba(255,255,255,0.10)";e.currentTarget.style.color="#FFFFFF";e.currentTarget.style.borderColor="rgba(255,255,255,0.18)";}}
            onMouseLeave={e=>{e.currentTarget.style.background="rgba(255,255,255,0.05)";e.currentTarget.style.color="rgba(255,255,255,0.55)";e.currentTarget.style.borderColor="rgba(255,255,255,0.09)";}}
          >
            <Download size={11} strokeWidth={1.8}/> Resume
          </a>
          <button className="hamburger" onClick={(e)=>{e.stopPropagation();setMenuOpen(o=>!o);}} aria-label="Toggle menu">
            <span style={{transform:menuOpen?"rotate(45deg) translate(4px,4px)":"none"}}/>
            <span style={{opacity:menuOpen?0:1}}/>
            <span style={{transform:menuOpen?"rotate(-45deg) translate(4px,-4px)":"none"}}/>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={`mob-menu${menuOpen?" open":""}`} onClick={e=>e.stopPropagation()}>
        {navLinks.map(([l,h]) => (
          <a key={l} href={h} className={`mob-a${h==="/contact"?" act":""}`}
            onClick={()=>setMenuOpen(false)}
            style={{fontWeight:h==="/contact"?600:undefined}}
          >{l}</a>
        ))}
      </div>

      <div style={{position:"relative",zIndex:1,minHeight:"100vh"}}>

        {/* ═══════ HERO ═══════ */}
        <header ref={heroRef} style={{
          ...W,
          paddingTop:    mob?"5.5rem":"9rem",
          paddingBottom: mob?"3rem":"5.5rem",
          borderBottom:  "1px solid rgba(255,255,255,0.06)",
          position:      "relative",
        }}>
          {/* Radial hero glow */}
          <div aria-hidden="true" style={{position:"absolute",top:"10%",left:"35%",transform:"translateX(-50%)",width:mob?"280px":"680px",height:mob?"140px":"300px",borderRadius:"50%",background:"radial-gradient(circle,rgba(255,255,255,0.04) 0%,transparent 70%)",filter:`blur(${mob?55:90}px)`,pointerEvents:"none"}}/>

          {/* Eyebrow — skills pattern */}
          <div style={{display:"flex",alignItems:"center",gap:"12px",marginBottom:mob?"1.25rem":"2rem",opacity:heroVis?1:0,animation:heroVis?`_rtl ${MS.slow} ${E} 0.05s both`:"none"}}>
            <div style={{width:"20px",height:"1px",background:"rgba(255,255,255,0.55)"}}/>
            <ML color="rgba(255,255,255,0.55)">Open to Opportunities · 2026 Graduate</ML>
            <TermCursor />
          </div>

          {/* H1 — Dancing Script, two-line, skills hero sizing */}
          <h1 className="hero-title" style={{
            fontFamily:"'Dancing Script',cursive",
            fontSize: mob?"clamp(2.4rem,9vw,3.5rem)":"clamp(3.5rem,7vw,6.5rem)",
            fontWeight:700,color:"#FFFFFF",lineHeight:1.06,letterSpacing:"-0.01em",
            marginBottom:"14px",opacity:heroVis?1:0,
            animation:heroVis?`_rtl ${MS.reveal} ${E} 0.12s both`:"none",
          }}>
            Open to Engineering<br/>
            <span style={{color:"rgba(255,255,255,0.48)",fontStyle:"italic"}}>
              Roles — 2026 Graduate.
            </span>
          </h1>

          {/* Skills gradient accent bar */}
          <div style={{
            height:"2px",width:mob?"80px":"160px",
            background:"linear-gradient(90deg,rgba(255,255,255,0.80),transparent)",
            borderRadius:"2px",marginBottom:mob?"1.5rem":"2.75rem",
            transformOrigin:"left",
            transform:heroVis?"scaleX(1)":"scaleX(0)",
            transition:`transform 320ms ${E} 0.18s`,
          }}/>

          {/* Subtitle */}
          <p style={{
            fontSize:mob?"0.9rem":"1.02rem",color:"rgba(255,255,255,0.40)",lineHeight:1.82,
            maxWidth:mob?"100%":"520px",marginBottom:mob?"1.5rem":"1.75rem",
            opacity:heroVis?1:0,animation:heroVis?`_rtl ${MS.reveal} ${E} 0.20s both`:"none",
          }}>
            AI-integrated Full-Stack Engineer. Focused on deployable, production-ready systems.
            Seeking backend, AI/ML-integrated, or full-stack roles in product-driven teams.
          </p>

          {/* Availability badge — skills status pill */}
          <div style={{marginBottom:mob?"1.5rem":"1.75rem",opacity:heroVis?1:0,animation:heroVis?`_rtl ${MS.reveal} ${E} 0.24s both`:"none"}}>
            <span style={{
              display:"inline-flex",alignItems:"center",gap:"7px",
              padding:"0.45rem 1rem",borderRadius:"999px",
              background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.12)",
              fontSize:"0.78rem",fontWeight:500,fontFamily:"'DM Mono',monospace",
              letterSpacing:"0.04em",color:"rgba(255,255,255,0.75)",
            }}>
              <span style={{width:"5px",height:"5px",borderRadius:"50%",background:"rgba(255,255,255,0.80)",display:"inline-block",animation:"_pulse 2.2s ease-in-out infinite"}}/>
              Available for Immediate Start · B.Tech AIDS, 2026
            </span>
          </div>

          {/* Role intent pills — skills tagPop animation */}
          <div className="role-pills-wrap" style={{marginBottom:mob?"1.75rem":"2.25rem",opacity:heroVis?1:0,animation:heroVis?`_rtl ${MS.reveal} ${E} 0.28s both`:"none"}}>
            <ML style={{marginBottom:"0.65rem",fontSize:"0.60rem"}}>Currently open to</ML>
            <div className="role-pills">
              {["Full-Time Software Engineering","Backend / AI-Integrated Systems","Product-Based Startups","Remote or Hybrid"].map((role,i)=>(
                <span key={i} style={{
                  display:"inline-flex",alignItems:"center",gap:"5px",
                  padding:"0.35rem 0.85rem",borderRadius:"6px",
                  background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.10)",
                  fontSize:"0.76rem",fontWeight:500,fontFamily:"'DM Mono',monospace",
                  letterSpacing:"0.03em",color:"rgba(255,255,255,0.55)",
                  opacity:heroVis?1:0,
                  animation:heroVis?`_tagIn 320ms ${E} ${0.30+i*0.06}s both`:"none",
                }}>
                  <Briefcase size={10} strokeWidth={2}/> {role}
                </span>
              ))}
            </div>
          </div>

          {/* Trust chips — skills MetCard */}
          <div className="trust-grid" style={{opacity:heroVis?1:0,animation:heroVis?`_up ${MS.reveal} ${E} 0.34s both`:"none"}}>
            <TrustChip icon={CheckCircle2} value="3"   label="Industry internships"/>
            <TrustChip icon={Clock}        value="24h" label="Response time"/>
            <TrustChip icon={MapPin}       value="AP"  label="India · Remote open"/>
          </div>
        </header>

        {/* ═══════ MAIN GRID ═══════ */}
        <section style={{...W,paddingTop:mob?"2.5rem":"4.5rem",paddingBottom:mob?"2.5rem":"4.5rem"}}>
          <div className="main-grid">

            {/* ── FORM COLUMN ── */}
            <div ref={formRef} style={{opacity:formVis?1:0,animation:formVis?`_ltr ${MS.reveal} ${E} 0.04s both`:"none"}}>
              {/* Form card — skills surface with shimmer + radial */}
              <div style={{
                background:"#111111",border:"1px solid rgba(255,255,255,0.08)",
                borderRadius:"16px",overflow:"hidden",
                boxShadow:"0 4px 32px rgba(0,0,0,0.45)",position:"relative",
              }}>
                <div aria-hidden="true" style={{position:"absolute",top:0,left:"15%",right:"15%",height:"1px",background:"linear-gradient(90deg,transparent,rgba(255,255,255,0.14),transparent)",pointerEvents:"none"}}/>
                <div aria-hidden="true" style={{position:"absolute",inset:0,borderRadius:"inherit",background:"radial-gradient(circle at 50% 0%,rgba(255,255,255,0.025) 0%,transparent 50%)",pointerEvents:"none"}}/>

                {/* Form header */}
                <div style={{
                  padding:mob?"1.25rem":"1.5rem 1.75rem",
                  borderBottom:"1px solid rgba(255,255,255,0.06)",
                  background:"#0F0F0F",
                  display:"flex",alignItems:"center",justifyContent:"space-between",
                  position:"relative",
                }}>
                  <div>
                    <ML style={{marginBottom:"5px"}}>Direct Message</ML>
                    <div style={{fontFamily:"'Dancing Script',cursive",fontSize:"1.55rem",fontWeight:700,color:"#FFFFFF",letterSpacing:"-0.01em",lineHeight:1.1}}>
                      Send a message
                    </div>
                  </div>
                  <div style={{display:"flex",alignItems:"center",gap:"6px",flexShrink:0}}>
                    <span style={{width:"5px",height:"5px",borderRadius:"50%",background:"rgba(255,255,255,0.75)",display:"inline-block",animation:"_pulse 2.2s ease-in-out infinite"}}/>
                    <ML color="rgba(255,255,255,0.55)" style={{marginBottom:0}}>Active</ML>
                  </div>
                </div>

                {/* Form body */}
                <div style={{padding:mob?"1.25rem":"1.75rem",position:"relative"}}>
                  {success ? (
                    <SuccessState onReset={()=>setSuccess(false)}/>
                  ) : (
                    <form onSubmit={handleSubmit} noValidate>
                      <div style={{display:"flex",flexDirection:"column",gap:"1.2rem"}}>
                        <div className="name-email-row">
                          <FInput label="Full Name" name="name" type="text" value={form.name} onChange={handleChange} error={errors.name} autoComplete="name" placeholder="Your name"/>
                          <FInput label="Work Email" name="email" type="email" value={form.email} onChange={handleChange} error={errors.email} autoComplete="email" placeholder="you@company.com"/>
                        </div>
                        <FSelect label="Opportunity Type" name="subject" value={form.subject} onChange={handleChange} error={errors.subject}>
                          <option value="">Select type...</option>
                          <option value="fulltime">Full-Time Role</option>
                          <option value="internship">Internship</option>
                          <option value="collaboration">Technical Collaboration</option>
                          <option value="inquiry">General Inquiry</option>
                        </FSelect>
                        <FTextarea label="Message" name="message" value={form.message} onChange={handleChange} error={errors.message} maxLength={800} placeholder="Briefly describe the role or opportunity..."/>

                        {/* Submit — skills dark primary button */}
                        <button type="submit" disabled={submitting} data-magnetic
                          style={{
                            display:"flex",alignItems:"center",justifyContent:"center",
                            gap:"8px",width:"100%",minHeight:"52px",
                            padding:"0.88rem 1.5rem",borderRadius:"8px",
                            background:submitting?"rgba(255,255,255,0.08)":"rgba(255,255,255,0.12)",
                            border:"1px solid rgba(255,255,255,0.20)",
                            color:"#FFFFFF",fontSize:"0.9rem",fontWeight:600,
                            fontFamily:"'DM Mono',monospace",letterSpacing:"0.05em",
                            opacity:submitting?0.65:1,position:"relative",overflow:"hidden",
                            transition:`background ${MS.fast} ${E}, border-color ${MS.fast} ${E}`,
                          }}
                          onMouseEnter={e=>{if(!submitting){e.currentTarget.style.background="rgba(255,255,255,0.19)";e.currentTarget.style.borderColor="rgba(255,255,255,0.32)";}}}
                          onMouseLeave={e=>{e.currentTarget.style.background=submitting?"rgba(255,255,255,0.08)":"rgba(255,255,255,0.12)";e.currentTarget.style.borderColor="rgba(255,255,255,0.20)";}}
                        >
                          {!submitting && <div style={{position:"absolute",inset:0,background:"linear-gradient(90deg,transparent,rgba(255,255,255,0.07),transparent)",transform:"translateX(-100%)",animation:"_shimmer 3s ease infinite"}}/>}
                          {submitting ? (
                            <><div style={{width:"14px",height:"14px",border:"2px solid rgba(255,255,255,0.22)",borderTopColor:"#FFFFFF",borderRadius:"50%",animation:"_spin 0.6s linear infinite"}}/> Sending...</>
                          ) : (
                            <><Send size={15} strokeWidth={1.8}/> Send Message</>
                          )}
                        </button>

                        <p style={{fontFamily:"'DM Mono',monospace",fontSize:"0.60rem",color:"rgba(255,255,255,0.22)",textAlign:"center",letterSpacing:"0.05em",lineHeight:1.6}}>
                          Message goes directly to my inbox · No intermediaries
                        </p>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>

            {/* ── SIDEBAR ── */}
            <div className="sidebar-sticky" style={{
              display:"flex",flexDirection:"column",gap:"1.1rem",
              position:"sticky",top:"5rem",
              opacity:formVis?1:0,
              animation:formVis?`_rtl ${MS.reveal} ${E} 0.10s both`:"none",
            }}>

              {/* Direct Contact */}
              <div className="sc">
                <div aria-hidden="true" style={{position:"absolute",top:0,left:"15%",right:"15%",height:"1px",background:"linear-gradient(90deg,transparent,rgba(255,255,255,0.07),transparent)",pointerEvents:"none"}}/>
                <div className="sc-head">
                  <ML style={{marginBottom:"5px"}}>Direct Contact</ML>
                  <div style={{fontFamily:"'Dancing Script',cursive",fontSize:"1.2rem",fontWeight:700,color:"#FFFFFF",letterSpacing:"-0.01em"}}>Reach me directly</div>
                </div>
                <div className="sc-body" style={{display:"flex",flexDirection:"column",gap:"0.6rem"}}>
                  <ContactCard icon={Mail} label="Email · Preferred" value="g.sivasatyasaibhagavan@gmail.com" href="mailto:g.sivasatyasaibhagavan@gmail.com" detail="Best for interview scheduling"/>
                  <ContactCard icon={Phone} label="Phone" value="+91 75692 05626" href="tel:+917569205626" detail="Available 9 AM – 9 PM IST"/>
                </div>
              </div>

              {/* Professional */}
              <div className="sc">
                <div aria-hidden="true" style={{position:"absolute",top:0,left:"15%",right:"15%",height:"1px",background:"linear-gradient(90deg,transparent,rgba(255,255,255,0.07),transparent)",pointerEvents:"none"}}/>
                <div className="sc-head">
                  <ML style={{marginBottom:"5px"}}>Professional</ML>
                  <div style={{fontFamily:"'Dancing Script',cursive",fontSize:"1.2rem",fontWeight:700,color:"#FFFFFF",letterSpacing:"-0.01em"}}>Online presence</div>
                </div>
                <div className="sc-body" style={{display:"flex",flexDirection:"column",gap:"0.6rem"}}>
                  <ContactCard icon={Linkedin} label="LinkedIn" value="Siva Satya Sai Bhagavan" href="https://www.linkedin.com/in/gopalajosyula-siva-satya-sai-bhagavan-1624a027b/" detail="Work history · Recommendations"/>
                  <ContactCard icon={Github} label="GitHub" value="@bhagavan444" href="https://github.com/bhagavan444" detail="Projects · Code quality · Activity"/>
                </div>
              </div>

              {/* Technical Profile */}
              <div className="sc">
                <div aria-hidden="true" style={{position:"absolute",top:0,left:"15%",right:"15%",height:"1px",background:"linear-gradient(90deg,transparent,rgba(255,255,255,0.07),transparent)",pointerEvents:"none"}}/>
                <div className="sc-head">
                  <ML style={{marginBottom:"5px"}}>Background</ML>
                  <div style={{fontFamily:"'Dancing Script',cursive",fontSize:"1.2rem",fontWeight:700,color:"#FFFFFF",letterSpacing:"-0.01em"}}>Technical profile</div>
                </div>
                <div className="sc-body">
                  <div style={{display:"flex",flexDirection:"column",gap:"0.9rem"}}>
                    {[
                      {l:"Full-stack engineer",    d:"MERN · REST APIs · Auth systems"},
                      {l:"AI / ML practitioner",   d:"TensorFlow · Scikit-learn · NLP"},
                      {l:"3 industry internships", d:"StudyOwl · SmartBridge · Blackbucks"},
                      {l:"Interview-ready",        d:"DSA · System design · Live coding"},
                    ].map((item,i)=>(
                      <div key={i} style={{display:"flex",gap:"10px",alignItems:"flex-start"}}>
                        <span style={{width:"3px",height:"3px",borderRadius:"50%",background:"rgba(255,255,255,0.42)",flexShrink:0,marginTop:"7px"}}/>
                        <div>
                          <div style={{fontSize:"0.84rem",fontWeight:600,color:"#FFFFFF",marginBottom:"2px"}}>{item.l}</div>
                          <div style={{fontFamily:"'DM Mono',monospace",fontSize:"0.60rem",color:"rgba(255,255,255,0.28)",letterSpacing:"0.04em"}}>{item.d}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div style={{marginTop:"1.25rem",paddingTop:"1.25rem",borderTop:"1px solid rgba(255,255,255,0.06)"}}>
                    <a href={resumePdf} download data-magnetic
                      style={{display:"flex",alignItems:"center",justifyContent:"center",gap:"7px",width:"100%",padding:"0.6rem 1rem",borderRadius:"8px",background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.10)",color:"rgba(255,255,255,0.58)",fontSize:"0.78rem",fontWeight:500,fontFamily:"'DM Mono',monospace",letterSpacing:"0.04em",textDecoration:"none",transition:`background ${MS.fast} ${E}, border-color ${MS.fast} ${E}, color ${MS.fast} ${E}`}}
                      onMouseEnter={e=>{e.currentTarget.style.background="rgba(255,255,255,0.10)";e.currentTarget.style.color="#FFFFFF";e.currentTarget.style.borderColor="rgba(255,255,255,0.18)";}}
                      onMouseLeave={e=>{e.currentTarget.style.background="rgba(255,255,255,0.05)";e.currentTarget.style.color="rgba(255,255,255,0.58)";e.currentTarget.style.borderColor="rgba(255,255,255,0.10)";}}
                    >
                      <Download size={13} strokeWidth={1.8}/> Download Resume (ATS-Optimized)
                    </a>
                  </div>
                </div>
              </div>

              {/* Response time note */}
              <div style={{padding:"1rem 1.1rem",background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:"10px",display:"flex",alignItems:"center",gap:"0.75rem"}}>
                <Clock size={15} strokeWidth={1.8} style={{color:"rgba(255,255,255,0.55)",flexShrink:0}}/>
                <div>
                  <div style={{fontSize:"0.82rem",fontWeight:600,color:"rgba(255,255,255,0.80)",marginBottom:"2px"}}>Responds within 24 hours</div>
                  <div style={{fontFamily:"'DM Mono',monospace",fontSize:"0.60rem",color:"rgba(255,255,255,0.28)",letterSpacing:"0.04em"}}>Mon – Sat, 9 AM – 9 PM IST</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════ CTA STRIP ═══════ */}
        <section ref={ctaRef} style={{...W,paddingBottom:mob?"4rem":"7rem"}}>
          <div style={{
            background:"#000000",borderRadius:mob?"14px":"18px",
            padding:mob?"2rem 1.5rem":"3.5rem",
            position:"relative",overflow:"hidden",
            border:"1px solid rgba(255,255,255,0.06)",
            opacity:ctaVis?1:0,
            animation:ctaVis?`_up ${MS.reveal} ${E} 0s both`:"none",
          }}>
            <div aria-hidden="true" style={{position:"absolute",top:"-40px",right:"-40px",width:"200px",height:"200px",borderRadius:"50%",background:"radial-gradient(circle,rgba(255,255,255,0.04),transparent 70%)",filter:"blur(50px)",pointerEvents:"none"}}/>
            <div aria-hidden="true" style={{position:"absolute",inset:0,pointerEvents:"none",backgroundImage:["linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px)","linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)"].join(","),backgroundSize:"48px 48px",borderRadius:"inherit"}}/>
            <div aria-hidden="true" style={{position:"absolute",top:0,left:"20%",right:"20%",height:"1px",background:"linear-gradient(90deg,transparent,rgba(255,255,255,0.12),transparent)"}}/>

            <div className="cta-inner" style={{position:"relative",zIndex:1}}>
              <div style={{maxWidth:"520px"}}>
                <ML color="rgba(255,255,255,0.25)" style={{marginBottom:"0.9rem"}}>
                  2026 Graduate · Immediate Availability
                </ML>
                <h3 style={{
                  fontFamily:"'Dancing Script',cursive",
                  fontSize:mob?"clamp(1.8rem,7vw,2.5rem)":"clamp(2.2rem,4vw,3.2rem)",
                  fontWeight:700,color:"#FFFFFF",letterSpacing:"-0.01em",
                  marginBottom:"0.75rem",lineHeight:1.15,
                }}>
                  Looking for a full-stack engineer who{" "}
                  <em style={{color:"rgba(255,255,255,0.58)",fontStyle:"italic"}}>ships real products?</em>
                </h3>
                <p style={{fontSize:"0.9rem",color:"rgba(255,255,255,0.36)",lineHeight:1.8}}>
                  MERN · Python · AI/ML · 3 internships · ready from day one.
                </p>
              </div>

              <div className="cta-btns" style={{position:"relative",zIndex:1}}>
                <a href="mailto:g.sivasatyasaibhagavan@gmail.com" className="cbtn" data-magnetic
                  style={{display:"flex",alignItems:"center",justifyContent:"center",gap:"8px",padding:"0.88rem 1.5rem",minHeight:"50px",borderRadius:"8px",background:"rgba(255,255,255,0.14)",border:"1px solid rgba(255,255,255,0.25)",color:"#FFFFFF",fontSize:"0.875rem",fontWeight:600,fontFamily:"'DM Mono',monospace",letterSpacing:"0.04em",textDecoration:"none",transition:`background ${MS.fast} ${E}, border-color ${MS.fast} ${E}`}}
                  onMouseEnter={e=>{e.currentTarget.style.background="rgba(255,255,255,0.22)";e.currentTarget.style.borderColor="rgba(255,255,255,0.40)";}}
                  onMouseLeave={e=>{e.currentTarget.style.background="rgba(255,255,255,0.14)";e.currentTarget.style.borderColor="rgba(255,255,255,0.25)";}}
                >
                  <Send size={14} strokeWidth={1.8}/> Schedule a Call
                </a>
                <a href="https://www.linkedin.com/in/gopalajosyula-siva-satya-sai-bhagavan-1624a027b/" target="_blank" rel="noopener noreferrer" className="cbtn" data-magnetic
                  style={{display:"flex",alignItems:"center",justifyContent:"center",gap:"8px",padding:"0.88rem 1.5rem",minHeight:"50px",borderRadius:"8px",background:"transparent",border:"1px solid rgba(255,255,255,0.14)",color:"rgba(255,255,255,0.55)",fontSize:"0.875rem",fontWeight:600,fontFamily:"'DM Mono',monospace",letterSpacing:"0.04em",textDecoration:"none",transition:`background ${MS.fast} ${E}, border-color ${MS.fast} ${E}, color ${MS.fast} ${E}`}}
                  onMouseEnter={e=>{e.currentTarget.style.background="rgba(255,255,255,0.07)";e.currentTarget.style.color="#FFFFFF";e.currentTarget.style.borderColor="rgba(255,255,255,0.22)";}}
                  onMouseLeave={e=>{e.currentTarget.style.background="transparent";e.currentTarget.style.color="rgba(255,255,255,0.55)";e.currentTarget.style.borderColor="rgba(255,255,255,0.14)";}}
                >
                  <ExternalLink size={14} strokeWidth={1.8}/> View LinkedIn
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════ FOOTER ═══════ */}
        <footer ref={fRef} style={{
          ...W,
          paddingTop:mob?"1.5rem":"2rem",paddingBottom:mob?"2rem":"2.5rem",
          borderTop:"1px solid rgba(255,255,255,0.06)",
          opacity:fVis?1:0,animation:fVis?`_fade ${MS.slow} ${E} 0s both`:"none",
        }}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:"0.75rem"}}>
            <div style={{display:"flex",alignItems:"center",gap:"6px"}}>
              <MapPin size={12} strokeWidth={1.8} style={{color:"rgba(255,255,255,0.35)"}}/>
              <span style={{fontFamily:"'DM Mono',monospace",fontSize:"0.70rem",color:"rgba(255,255,255,0.28)",letterSpacing:"0.05em"}}>
                Andhra Pradesh, India · UTC +5:30
              </span>
            </div>
            <span style={{fontFamily:"'DM Mono',monospace",fontSize:"0.70rem",color:"rgba(255,255,255,0.18)",letterSpacing:"0.04em"}}>
              © 2026 Siva Satya Sai Bhagavan
            </span>
            <div style={{display:"flex",alignItems:"center",gap:"6px"}}>
              <span style={{width:"5px",height:"5px",borderRadius:"50%",background:"rgba(255,255,255,0.70)",display:"inline-block",animation:"_pulse 2.2s ease-in-out infinite"}}/>
              <span style={{fontFamily:"'DM Mono',monospace",fontSize:"0.70rem",color:"rgba(255,255,255,0.45)",letterSpacing:"0.05em"}}>Available for hire</span>
            </div>
          </div>
        </footer>

      </div>
    </>
  );
}