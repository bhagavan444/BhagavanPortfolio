"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import profileImg from "../assets/profile.jpeg";
import resumePdf from "../assets/bhagavanresume.pdf";
import {
  Download, Github, Linkedin, Mail, Phone, ArrowRight,
  ArrowUpRight, ChevronLeft, ChevronRight, MapPin,
  Search, Layers, GitBranch, Zap, BarChart2, Shield,
  Award, Cpu
} from "lucide-react";

/* ── TOKENS — BLACK & WHITE SYSTEM ── */
const T = {
  bg:       '#0B0B0B',
  white:    '#FFFFFF',
  ink:      '#FFFFFF',
  surface:  '#111111',
  surface2: '#141414',
  surface3: '#161616',
  muted:    'rgba(255,255,255,0.35)',
  muted2:   'rgba(255,255,255,0.65)',
  border:   'rgba(255,255,255,0.06)',
  border2:  'rgba(255,255,255,0.1)',
  border3:  'rgba(255,255,255,0.15)',
  accent:   '#FFFFFF',
  accentL:  'rgba(255,255,255,0.05)',
  accentL2: 'rgba(255,255,255,0.08)',
  green:    'rgba(255,255,255,0.8)',
  greenL:   'rgba(255,255,255,0.06)',
};

/* ── GLOBAL CSS — MONOCHROME ── */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Pacifico&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&family=DM+Mono:wght@400;500&display=swap');
*,*::before,*::after{margin:0;padding:0;box-sizing:border-box;}
html{scroll-behavior:smooth;overflow-x:hidden;}
body{font-family:'DM Sans',-apple-system,sans-serif;background:#0B0B0B;color:#FFFFFF;-webkit-font-smoothing:antialiased;overflow-x:hidden;cursor:none;}
::selection{background:rgba(255,255,255,0.12);}
::-webkit-scrollbar{width:2px;}
::-webkit-scrollbar-thumb{background:rgba(255,255,255,0.1);border-radius:2px;}
.serif{font-family:'Pacifico',cursive;}
.mono{font-family:'DM Mono',monospace;}

/* ── MAGNETIC CURSOR — WHITE ── */
#cursor-dot{
  position:fixed;width:6px;height:6px;border-radius:50%;
  background:#FFFFFF;pointer-events:none;z-index:99999;
  transform:translate(-50%,-50%);
  transition:width 0.2s ease,height 0.2s ease,opacity 0.2s ease;
  mix-blend-mode:difference;
}
#cursor-ring{
  position:fixed;width:32px;height:32px;border-radius:50%;
  border:1px solid rgba(255,255,255,0.35);pointer-events:none;z-index:99998;
  transform:translate(-50%,-50%);
  transition:width 0.35s cubic-bezier(0.16,1,0.3,1),height 0.35s cubic-bezier(0.16,1,0.3,1),border-color 0.2s,background 0.25s,border-radius 0.25s;
}
body.cursor-hover #cursor-dot{width:5px;height:5px;opacity:0.7;}
body.cursor-hover #cursor-ring{width:52px;height:52px;border-color:rgba(255,255,255,0.5);background:rgba(255,255,255,0.04);}
body.cursor-click #cursor-dot{width:4px;height:4px;}
body.cursor-click #cursor-ring{width:24px;height:24px;}
body.cursor-text #cursor-dot{width:2px;height:26px;border-radius:2px;background:#FFFFFF;}
body.cursor-text #cursor-ring{opacity:0;}
body.cursor-magnetic #cursor-ring{border-color:rgba(255,255,255,0.7);}
@media(hover:none),(pointer:coarse){
  #cursor-dot,#cursor-ring{display:none;}
  body{cursor:auto;}
}

@keyframes fadeUp{from{opacity:0;transform:translateY(22px);}to{opacity:1;transform:translateY(0);}}
@keyframes fadeIn{from{opacity:0;}to{opacity:1;}}
@keyframes cursorBlink{0%,100%{border-color:#FFFFFF;}50%{border-color:transparent;}}
@keyframes pulseDot{0%,100%{opacity:1;}50%{opacity:0.3;}}
@keyframes marquee{from{transform:translateX(0);}to{transform:translateX(-50%);}}
@keyframes marqueeRev{from{transform:translateX(-50%);}to{transform:translateX(0);}}
@keyframes floatY{0%,100%{transform:translateY(0);}50%{transform:translateY(-11px);}}
@keyframes spinRing{from{transform:rotate(0deg);}to{transform:rotate(360deg);}}
@keyframes breathe{0%,100%{transform:scale(1);opacity:0.4;}50%{transform:scale(1.12);opacity:0.9;}}
@keyframes orbitDot{0%{transform:rotate(0deg) translateX(44px) rotate(0deg);}100%{transform:rotate(360deg) translateX(44px) rotate(-360deg);}}
@keyframes gridPulse{0%,100%{opacity:0.018;}50%{opacity:0.038;}}
@keyframes accentFadeIn{0%{opacity:0;letter-spacing:-0.01em;}100%{opacity:1;letter-spacing:-0.03em;}}
@keyframes shimmerSweep{0%{background-position:200% center;}100%{background-position:-200% center;}}
@keyframes softGlow{0%,100%{opacity:0.3;}50%{opacity:0.6;}}
@keyframes noiseScroll{0%{transform:translateY(0);}100%{transform:translateY(-50%);}}


.reveal{opacity:0;transform:translateY(24px);transition:opacity 0.65s cubic-bezier(0.16,1,0.3,1),transform 0.65s cubic-bezier(0.16,1,0.3,1);}
.reveal.in{opacity:1;transform:translateY(0);}
.reveal.d1{transition-delay:0.07s;}.reveal.d2{transition-delay:0.14s;}.reveal.d3{transition-delay:0.21s;}
.reveal.d4{transition-delay:0.28s;}.reveal.d5{transition-delay:0.35s;}.reveal.d6{transition-delay:0.42s;}
.mq{display:flex;width:max-content;animation:marquee 36s linear infinite;}
.mq:hover{animation-play-state:paused;}
.mqr{display:flex;width:max-content;animation:marqueeRev 44s linear infinite;}
.mqr:hover{animation-play-state:paused;}
.nav-a{position:relative;text-decoration:none;color:rgba(255,255,255,0.45);font-size:0.875rem;font-weight:400;padding:0.28rem 0;transition:color 0.2s;}
.nav-a::after{content:'';position:absolute;bottom:-1px;left:0;width:100%;height:0.5px;background:#FFFFFF;transform:scaleX(0);transform-origin:left;transition:transform 0.25s cubic-bezier(0.16,1,0.3,1);}
.nav-a:hover{color:#FFFFFF;}.nav-a:hover::after{transform:scaleX(1);}
.fl{text-decoration:none;color:rgba(255,255,255,0.28);font-size:0.82rem;transition:color 0.18s;}
.fl:hover{color:#fff;}
.mag-target{transition:transform 0.3s cubic-bezier(0.16,1,0.3,1);}
.sec-w{max-width:1400px;margin:0 auto;padding:0 3rem;}
@media(max-width:1024px){
  .hg{grid-template-columns:1fr !important;}
  .hp{max-width:420px !important;margin:0 auto !important;order:-1 !important;}
  .pg{grid-template-columns:repeat(3,1fr) !important;}
  .fc{grid-template-columns:repeat(2,1fr) !important;}
  .pb{grid-template-columns:1fr !important;}
  .ps{border-left:none !important;border-top:1px solid rgba(255,255,255,0.06) !important;padding-left:0 !important;padding-top:1.75rem !important;margin-top:1.75rem !important;}
  .sg{grid-template-columns:1fr 1fr !important;}
  .fco{grid-template-columns:1fr 1fr !important;}
  .tg{grid-template-columns:1fr 1fr !important;}
  .ig{grid-template-columns:1fr 1fr !important;}
  .phil-grid{grid-template-columns:repeat(2,1fr) !important;}
}
@media(max-width:768px){
  .nl{display:none !important;}
  section{padding:4rem 0 !important;}
  .sec-w{padding:0 1.25rem !important;}
  .fc{grid-template-columns:1fr 1fr !important;}
  .fc>div{border-right:none !important;border-bottom:1px solid rgba(255,255,255,0.06) !important;padding:1.75rem 1.25rem !important;}
  .pg{grid-template-columns:repeat(2,1fr) !important;}
  .phil-grid{grid-template-columns:1fr !important;}
  .phil-grid>div{padding:1.4rem 1.25rem !important;}
  .sg{grid-template-columns:1fr !important;}
  .sg>div{padding:1.4rem 1.25rem !important;}
  .tg{grid-template-columns:1fr !important;}
  .tg>div{padding:1.4rem 1.25rem !important;}
  .ig{grid-template-columns:1fr 1fr !important;}
  .ig>div{padding:1.4rem 1.25rem !important;border-right:none !important;border-bottom:1px solid rgba(255,255,255,0.06) !important;}
  .fco{grid-template-columns:1fr 1fr !important;gap:2.5rem !important;}
  .fco>div:first-child{grid-column:1/-1;}
  .cp{padding:2.5rem 1.5rem !important;}
  .ctab{flex-direction:column !important;align-items:flex-start !important;}
  .fb{flex-direction:column !important;gap:0.85rem !important;}
  .proj-inner{grid-template-columns:1fr !important;}
  .proj-inner>div{border-left:none !important;padding-left:0 !important;border-top:1px solid rgba(255,255,255,0.06) !important;padding-top:1rem !important;margin-top:0.25rem !important;}
  .proj-inner>div:first-child{border-top:none !important;padding-top:0 !important;}
  .ach-row{flex-direction:column !important;align-items:flex-start !important;gap:0.6rem !important;padding:0.9rem 1rem !important;}
  .tech-marquee{padding:1.8rem 0 !important;}
  .tech-icon-wrapper{margin:0 1.2rem !important;}
  .tech-icon-wrapper img{width:32px !important;height:32px !important;}
  .tech-label{font-size:0.65rem !important;}
}
@media(max-width:480px){
  section{padding:3.5rem 0 !important;}
  .sec-w{padding:0 1rem !important;}
  .fc{grid-template-columns:1fr !important;}
  .pg{grid-template-columns:1fr !important;}
  .ig{grid-template-columns:1fr !important;}
  .ig>div{border-bottom:1px solid rgba(255,255,255,0.06) !important;}
  .fco{grid-template-columns:1fr !important;}
  .fco>div:first-child{grid-column:auto;}
  .tech-marquee{padding:1.5rem 0 !important;}
  .tech-icon-wrapper{margin:0 1rem !important;}
  .tech-icon-wrapper img{width:28px !important;height:28px !important;}
  .tech-label{font-size:0.6rem !important;}
  .cp{padding:2rem 1.25rem !important;}
}
`;

/* ── MAGNETIC CURSOR — WHITE ── */
function MagneticCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });
  const raf = useRef(null);
  const isMobile = useRef(false);

  useEffect(() => {
    isMobile.current = window.matchMedia('(hover:none),(pointer:coarse)').matches;
    if (isMobile.current) return;

    const lerp = (a, b, t) => a + (b - a) * t;
    const loop = () => {
      ring.current.x = lerp(ring.current.x, pos.current.x, 0.12);
      ring.current.y = lerp(ring.current.y, pos.current.y, 0.12);
      if (ringRef.current) {
        ringRef.current.style.left = ring.current.x + 'px';
        ringRef.current.style.top = ring.current.y + 'px';
      }
      raf.current = requestAnimationFrame(loop);
    };
    raf.current = requestAnimationFrame(loop);

    const onMove = e => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.left = e.clientX + 'px';
        dotRef.current.style.top = e.clientY + 'px';
      }
    };
    const onDown = () => document.body.classList.add('cursor-click');
    const onUp = () => document.body.classList.remove('cursor-click');

    const magneticEls = document.querySelectorAll('a,button,.mag-btn');
    const handlers = [];
    magneticEls.forEach(el => {
      const enter = () => { document.body.classList.add('cursor-hover'); document.body.classList.remove('cursor-text'); };
      const leave = () => { document.body.classList.remove('cursor-hover', 'cursor-magnetic'); el.style.transform = ''; };
      const move = e => {
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = Math.max(rect.width, rect.height) * 1.1;
        if (dist < maxDist) {
          el.style.transform = `translate(${dx * 0.28}px,${dy * 0.28}px)`;
          document.body.classList.add('cursor-magnetic');
        } else {
          el.style.transform = '';
          document.body.classList.remove('cursor-magnetic');
        }
      };
      el.addEventListener('mouseenter', enter);
      el.addEventListener('mouseleave', leave);
      el.addEventListener('mousemove', move);
      handlers.push({ el, enter, leave, move });
    });

    const textEls = document.querySelectorAll('p,h1,h2,h3,span:not(.mag-skip)');
    const textHandlers = [];
    textEls.forEach(el => {
      const enter = () => { document.body.classList.add('cursor-text'); document.body.classList.remove('cursor-hover'); };
      const leave = () => document.body.classList.remove('cursor-text');
      el.addEventListener('mouseenter', enter);
      el.addEventListener('mouseleave', leave);
      textHandlers.push({ el, enter, leave });
    });

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);

    return () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      handlers.forEach(({ el, enter, leave, move }) => {
        el.removeEventListener('mouseenter', enter);
        el.removeEventListener('mouseleave', leave);
        el.removeEventListener('mousemove', move);
        el.style.transform = '';
      });
      textHandlers.forEach(({ el, enter, leave }) => {
        el.removeEventListener('mouseenter', enter);
        el.removeEventListener('mouseleave', leave);
      });
    };
  }, []);

  return <>
    <div id="cursor-dot" ref={dotRef} />
    <div id="cursor-ring" ref={ringRef} />
  </>;
}

/* ── HOOKS ── */
function useInView(th = 0.12) {
  const r = useRef(null); const [v, sv] = useState(false);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) sv(true); }, { threshold: th });
    if (r.current) o.observe(r.current); return () => o.disconnect();
  }, [th]);
  return [r, v];
}
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const o = new IntersectionObserver(e => {
      e.forEach(en => { if (en.isIntersecting) { en.target.classList.add('in'); o.unobserve(en.target); } });
    }, { threshold: 0.1 });
    els.forEach(el => o.observe(el)); return () => o.disconnect();
  });
}

/* ── COUNTER ── */
function Counter({ target, suffix = '', triggered }) {
  const [v, sv] = useState(0); const s = useRef(false);
  useEffect(() => {
    if (!triggered || s.current) return; s.current = true;
    const n = parseInt(String(target).replace(/\D/g, ''), 10);
    if (!n) { sv(target); return; }
    let c = 0; const inc = n / 45;
    const t = setInterval(() => { c += inc; if (c >= n) { sv(n); clearInterval(t); } else sv(Math.floor(c)); }, 1100 / 45);
    return () => clearInterval(t);
  }, [triggered, target]);
  return <span>{v}{suffix}</span>;
}

/* ── BTN — MONOCHROME ── */
function Btn({ children, href, onClick, download, primary = false, style: s = {} }) {
  const [h, sh] = useState(false);
  const base = {
    display: 'inline-flex', alignItems: 'center', gap: '0.45rem',
    fontFamily: "'DM Sans',sans-serif", fontSize: '0.875rem', fontWeight: 500,
    padding: '0.72rem 1.4rem', borderRadius: '8px',
    border: primary ? 'none' : `1px solid ${T.border3}`,
    cursor: 'pointer', textDecoration: 'none', whiteSpace: 'nowrap',
    transition: 'all 0.22s cubic-bezier(0.16,1,0.3,1)',
    background: primary ? '#FFFFFF' : 'transparent',
    color: primary ? '#0B0B0B' : 'rgba(255,255,255,0.55)', ...s
  };
  const hov = h ? {
    background: primary ? 'rgba(255,255,255,0.92)' : 'rgba(255,255,255,0.06)',
    color: primary ? '#0B0B0B' : '#FFFFFF',
    borderColor: primary ? 'transparent' : 'rgba(255,255,255,0.25)',
    transform: 'translateY(-1px)',
    boxShadow: primary ? '0 6px 24px rgba(255,255,255,0.12)' : '0 2px 12px rgba(0,0,0,0.4)'
  } : {};
  const C = href ? 'a' : 'button';
  return <C href={href} onClick={onClick} download={download} style={{ ...base, ...hov }}
    onMouseEnter={() => sh(true)} onMouseLeave={() => sh(false)}
    target={href?.startsWith('http') ? '_blank' : undefined}
    rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}>{children}</C>;
}

/* ── TYPEWRITER ── */
function Typewriter({ roles }) {
  const [idx, si] = useState(0); const [txt, st] = useState('');
  const [del, sd] = useState(false); const [ch, sc] = useState(0);
  useEffect(() => {
    const cur = roles[idx]; let t;
    if (!del) {
      if (ch < cur.length) { t = setTimeout(() => { st(cur.slice(0, ch + 1)); sc(c => c + 1); }, 62); }
      else t = setTimeout(() => sd(true), 2600);
    } else {
      if (ch > 0) { t = setTimeout(() => { st(cur.slice(0, ch - 1)); sc(c => c - 1); }, 30); }
      else { sd(false); si(i => (i + 1) % roles.length); }
    }
    return () => clearTimeout(t);
  }, [ch, del, idx, roles]);
  return <span style={{ color: '#FFFFFF', fontWeight: 600 }}>{txt}
    <span style={{ borderRight: `1.5px solid #FFFFFF`, marginLeft: '1px', animation: 'cursorBlink 0.9s step-end infinite' }} />
  </span>;
}

/* ── ORBIT — MONOCHROME ── */
function Orbit({ size = 130, ca = 'rgba(255,255,255,0.04)', cd = 'rgba(255,255,255,0.2)', spd = 18, style: s = {} }) {
  return <div style={{ width: `${size}px`, height: `${size}px`, position: 'relative', ...s }}>
    <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: `1px solid ${ca}`, animation: `spinRing ${spd}s linear infinite` }} />
    <div style={{ position: 'absolute', inset: '8px', borderRadius: '50%', border: `1px dashed ${ca}`, animation: `spinRing ${spd * 1.5}s linear infinite reverse` }} />
    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '8px', height: '8px', borderRadius: '50%', background: cd, animation: 'breathe 3s ease-in-out infinite' }} />
    <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%) translateY(-4px)', width: '6px', height: '6px', borderRadius: '50%', background: cd, opacity: 0.5, animation: `orbitDot ${spd}s linear infinite` }} />
  </div>;
}

/* ── HERO BTN — MONOCHROME ── */
function HeroBtn({ children, href, onClick, download, primary = false }) {
  const [h, sh] = useState(false);
  const [arrowShift, setArrow] = useState(false);
  const base = {
    display: 'inline-flex', alignItems: 'center', gap: '0.48rem',
    fontFamily: "'DM Sans',sans-serif", fontSize: '0.875rem', fontWeight: 500,
    padding: '0.76rem 1.5rem', borderRadius: '8px', cursor: 'pointer',
    textDecoration: 'none', whiteSpace: 'nowrap', position: 'relative', overflow: 'hidden',
    transition: 'all 0.25s cubic-bezier(0.16,1,0.3,1)',
    border: primary ? '1px solid rgba(255,255,255,0.9)' : `1px solid ${T.border3}`,
    background: primary ? '#FFFFFF' : 'transparent',
    color: primary ? '#0B0B0B' : 'rgba(255,255,255,0.55)',
  };
  const hov = h ? {
    background: primary ? 'rgba(255,255,255,0.92)' : 'rgba(255,255,255,0.06)',
    color: primary ? '#0B0B0B' : '#FFFFFF',
    borderColor: primary ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.25)',
    transform: 'translateY(-2px)',
    boxShadow: primary ? '0 8px 32px rgba(255,255,255,0.1)' : '0 4px 16px rgba(0,0,0,0.5)',
  } : {};
  const C = href ? 'a' : 'button';
  return (
    <C href={href} onClick={onClick} download={download}
      target={href?.startsWith('http') ? '_blank' : undefined}
      rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
      style={{ ...base, ...hov }}
      onMouseEnter={() => { sh(true); setArrow(true); }}
      onMouseLeave={() => { sh(false); setArrow(false); }}>
      {primary && <span style={{
        position: 'absolute', inset: 0, borderRadius: '8px',
        background: 'linear-gradient(105deg,transparent 35%,rgba(255,255,255,0.06) 50%,transparent 65%)',
        backgroundSize: '200% 100%',
        animation: h ? 'shimmerSweep 1.6s ease infinite' : 'none',
        pointerEvents: 'none',
      }} />}
      {React.Children.map(children, child => {
        if (child?.type === ArrowRight) {
          return <span style={{ display: 'inline-flex', transform: arrowShift ? 'translateX(2px)' : 'translateX(0)', transition: 'transform 0.2s ease' }}>{child}</span>;
        }
        return child;
      })}
    </C>
  );
}

/* ── PROFILE CARD — MATTE GLASS ── */
function ProfileCard({ profileImg }) {
  const [hov, setHov] = useState(false);
  const cardRef = useRef(null);
  const handleMove = useCallback(e => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / rect.width;
    const dy = (e.clientY - cy) / rect.height;
    cardRef.current.style.transform = `perspective(900px) rotateY(${dx * 4}deg) rotateX(${-dy * 3}deg) translateY(-6px)`;
  }, []);
  const handleLeave = useCallback(() => {
    setHov(false);
    if (cardRef.current) cardRef.current.style.transform = 'perspective(900px) rotateY(0deg) rotateX(0deg) translateY(0)';
  }, []);
  return (
    <div className="hp" style={{ animation: 'fadeIn 0.7s ease 0.3s both' }}>
      <div style={{
        borderRadius: '18px', padding: '1px',
        background: hov
          ? 'linear-gradient(135deg,rgba(255,255,255,0.18),rgba(255,255,255,0.04),rgba(255,255,255,0.1))'
          : 'linear-gradient(135deg,rgba(255,255,255,0.1),rgba(255,255,255,0.03),rgba(255,255,255,0.07))',
        boxShadow: hov
          ? '0 0 0 1px rgba(255,255,255,0.06),0 16px 48px rgba(0,0,0,0.8),0 40px 80px rgba(0,0,0,0.6)'
          : '0 4px 8px rgba(0,0,0,0.6),0 16px 40px rgba(0,0,0,0.5),0 40px 80px rgba(0,0,0,0.4)',
        transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
      }}>
        <div ref={cardRef}
          style={{
            borderRadius: '17px', overflow: 'hidden', background: '#0F0F0F', position: 'relative',
            transition: 'transform 0.35s cubic-bezier(0.16,1,0.3,1)', willChange: 'transform',
          }}
          onMouseEnter={() => setHov(true)}
          onMouseMove={handleMove}
          onMouseLeave={handleLeave}>
          {/* Shimmer line on hover */}
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: '1px', zIndex: 3, pointerEvents: 'none',
            background: 'linear-gradient(90deg,transparent,rgba(255,255,255,0.4),transparent)',
            backgroundSize: '200% 100%',
            opacity: hov ? 1 : 0,
            animation: hov ? 'shimmerSweep 3s ease-in-out infinite' : 'none',
            transition: 'opacity 0.3s ease',
          }} />
          <img src={profileImg} alt="Siva Satya Sai Bhagavan"
            style={{
              width: '100%', display: 'block', aspectRatio: '3/4',
              objectFit: 'cover', objectPosition: 'center top',
              filter: hov
                ? 'grayscale(1) contrast(1.18) brightness(1.05) saturate(0)'
                : 'grayscale(1) contrast(1.12) brightness(0.96) saturate(0)',
              transition: 'filter 0.45s cubic-bezier(0.16,1,0.3,1)',
            }} />
          {/* Dark gradient overlay */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to top,rgba(10,10,10,0.98) 0%,rgba(10,10,10,0.75) 38%,rgba(10,10,10,0.2) 62%,transparent 100%)',
          }} />
          {/* Top edge */}
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: '40%', pointerEvents: 'none', zIndex: 1,
            background: 'linear-gradient(to bottom,rgba(255,255,255,0.03),transparent)',
          }} />
          {/* Identity layer */}
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '1.6rem 1.6rem 1.5rem', zIndex: 2 }}>
            <div className="mono mag-skip" style={{ fontSize: '0.57rem', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.12em', marginBottom: '0.55rem', textTransform: 'uppercase' }}>
              Building deployable AI products
            </div>
            <div style={{ fontSize: '1.25rem', color: '#FFFFFF', fontWeight: 400, marginBottom: '0.2rem', fontFamily: "'Pacifico',cursive" }}>
              Bhagavan
            </div>
            <div className="mono mag-skip" style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1rem', fontWeight: 500 }}>
              AI Systems · Backend Eng · Applied ML
            </div>
            <div style={{ display: 'flex', gap: '0.45rem' }}>
              {[
                { icon: Github, href: 'https://github.com/bhagavan444' },
                { icon: Linkedin, href: 'https://www.linkedin.com/in/gopalajosyula-siva-satya-sai-bhagavan-1624a027b/' },
                { icon: Mail, href: 'mailto:g.sivasatyasaibhagavan@gmail.com' },
              ].map((s, i) => (
                <a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
                  style={{
                    width: '30px', height: '30px', borderRadius: '6px',
                    background: 'rgba(255,255,255,0.06)', border: `1px solid rgba(255,255,255,0.1)`,
                    backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center',
                    justifyContent: 'center', color: 'rgba(255,255,255,0.45)', textDecoration: 'none',
                    transition: 'all 0.2s cubic-bezier(0.16,1,0.3,1)',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.12)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'; e.currentTarget.style.color = '#FFFFFF'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = 'rgba(255,255,255,0.45)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
                  <s.icon size={12} strokeWidth={1.8} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── SCROLL BAR ── */
function SBar() {
  const [p, sp] = useState(0);
  useEffect(() => {
    const fn = () => { const m = document.documentElement.scrollHeight - window.innerHeight; sp((window.scrollY / m) * 100); };
    window.addEventListener('scroll', fn, { passive: true }); return () => window.removeEventListener('scroll', fn);
  }, []);
  return <div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: '1.5px', zIndex: 9999 }}>
    <div style={{ width: `${p}%`, height: '100%', background: '#FFFFFF', transition: 'width 0.1s linear', opacity: 0.6 }} />
  </div>;
}

/* ════════════════════════════════════════════════
   RESUME INTELLIGENCE ASSISTANT — DARK THEME
════════════════════════════════════════════════ */

const PROFILE = {
  name: 'Siva Satya Sai Bhagavan Gopalajosyula',
  short: 'Bhagavan',
  role: 'AI-Integrated Full-Stack Engineer',
  graduation: 'B.Tech AIDS · Ramachandra College of Engineering · 2026 · 75% CGPA',
  email: 'g.sivasatyasaibhagavan@gmail.com',
  phone: '+91 7569205626',
  github: 'github.com/bhagavan444',
  linkedin: 'linkedin.com/in/gopalajosyula-siva-satya-sai-bhagavan-1624a027b',
  availability: 'Open to full-time junior engineering roles · On-site or Remote · Andhra Pradesh',
  objective: 'Entry-level Software / AI Engineer with hands-on delivery in Python, MERN, and production ML systems. 3 internships. 4 deployed projects. Focused on maintainable, measurable engineering.',
  internships: {
    mern: { title: 'MERN Stack Intern', company: 'StudyOwl Education Pvt Ltd', period: 'May–July 2025', detail: ['Designed and implemented reusable React components and backend APIs using Node.js + Express.', 'Handled frontend–backend integration via REST APIs and asynchronous request patterns.', 'Maintained code quality using Git/GitHub in a collaborative team environment.'] },
    aiml: { title: 'AI/ML Intern – Smart Sorting', company: 'SmartBridge (Remote)', period: 'May–June 2025', detail: ['Built and trained CNN-based image classification models using TensorFlow and Keras.', 'Deployed trained models into Flask applications for real-time inference pipelines.'] },
    ml: { title: 'ML & Data Science Intern', company: 'Blackbucks (Remote)', period: 'May–June 2024', detail: ['Executed data preprocessing, feature engineering, and supervised model evaluation using Python.', 'Worked with Scikit-learn pipelines on structured datasets.'] },
  },
  projects: {
    ats: { title: 'ATS-Based Resume Builder Platform', year: '2025', stack: 'MERN Stack · MongoDB · OAuth 2.0', overview: 'Full-stack resume builder optimized for ATS compatibility. Enables structured resume generation, scoring, and secure user management.', architecture: 'React frontend → Express REST API → MongoDB document store. Stateless JWT auth layer. Google and GitHub OAuth via Passport.js. PDF generation + keyword-matching engine on backend.', security: 'OAuth 2.0 with Google and GitHub — no plaintext password storage. JWT tokens for session management. Server-side PDF parsing.', tradeoffs: 'Chose MongoDB over SQL because resume data schema is inherently variable per candidate. Relational constraints would have required migrations every sprint.', challenges: 'Building a keyword-matching algorithm that reliably scores resumes against job descriptions without over-fitting to formatting variations.' },
    chatbot: { title: 'AI Chatbot Web Application', year: '2025', stack: 'React.js · Flask · Gemini API · OpenAI API', overview: 'End-to-end AI chatbot with React frontend and Flask backend. Supports multi-turn conversations with stateful session context.', architecture: 'React UI → Flask REST backend → Gemini/OpenAI APIs. 100% server-side API key handling. Async request architecture with provider fallback logic.', security: 'Zero client-side key exposure. All API credentials handled server-side via Flask environment variables.', tradeoffs: 'Used async polling over WebSockets — single-user sessions had no concurrent stream requirement. WebSocket infrastructure adds complexity without UX benefit at this scale.', challenges: 'Maintaining multi-turn conversation context per session and implementing graceful fallback between two AI providers.' },
    career: { title: 'Career Path Recommendation System', year: '2024', stack: 'Python · Scikit-learn · Machine Learning', overview: 'ML pipeline that generates personalized career recommendations based on user skill and interest input.', architecture: 'Data preprocessing → feature encoding → supervised classification → ranked recommendation output.', tradeoffs: 'Used Scikit-learn over deep learning — dataset size did not justify neural network complexity. Interpretable results were a requirement.', challenges: 'Encoding categorical career features in a way that preserved semantic relationships.' },
    fakenews: { title: 'Fake News Detection System', year: '2023', stack: 'Python · NLP · TF-IDF · Logistic Regression', overview: 'NLP-based classifier to detect misinformation in news articles using TF-IDF feature extraction.', architecture: 'Text corpus → TF-IDF vectorization → Logistic Regression classifier → prediction output.', tradeoffs: 'TF-IDF over deep NLP — interpretable, accurate, and required no GPU infrastructure.', challenges: 'Handling news article variability and reducing false positive rates on borderline-credible sources.' },
  },
  skills: {
    languages: ['Python', 'Java', 'C', 'JavaScript (ES6+)'],
    frontend: ['React.js', 'HTML5', 'CSS3'],
    backend: ['Node.js', 'Express.js', 'Flask', 'REST API Design'],
    databases: ['MongoDB', 'SQL', 'JDBC'],
    ml: ['TensorFlow', 'Keras', 'Scikit-learn', 'CNN', 'NLP', 'TF-IDF', 'Supervised Learning'],
    tools: ['Git', 'GitHub', 'VS Code', 'Postman'],
    concepts: ['OOP', 'DSA Fundamentals', 'OAuth 2.0', 'JWT', 'Async Architecture', 'PDF Parsing'],
  },
  certifications: ['Google Generative AI (Gemini) – Generative AI Fundamentals', 'IBM SkillsBuild – AI Fundamentals + Large Language Models', 'Simplilearn – Machine Learning with Python + AWS Basics', 'Infosys Springboard – Full Stack Development (Python & Java)', 'GeeksforGeeks – Python and Java Programming'],
  differentiators: ['3 internships across MERN, AI/ML, and Data Science domains — cross-stack real delivery.', 'Deployed CNN inference pipelines and full-stack apps — not just notebooks.', 'Security-first thinking: OAuth 2.0, server-side API keys, JWT — built into projects from day one.', 'Conscious trade-off reasoning: MongoDB vs SQL, Flask vs FastAPI, TF-IDF vs deep NLP.', 'Ready to contribute from day one — zero ramp-up on core MERN + Python stack.'],
};

const INTENTS = [
  { keys: ['walk me through', 'tell me about', 'who is', 'about bhagavan', 'summary', 'overview', 'profile', 'introduce yourself', 'introduction'], fn: () => ({ title: 'Profile Summary', sections: [{ label: 'Identity', text: PROFILE.role }, { label: 'Education', text: PROFILE.graduation }, { label: 'Objective', text: PROFILE.objective }, { label: 'Availability', text: PROFILE.availability }] }) },
  { keys: ['strongest project', 'best project', 'main project', 'flagship', 'most impressive', 'complex project', 'hardest project', 'proudest'], fn: () => ({ title: 'Strongest Project — ATS Resume Builder', sections: [{ label: 'Overview', text: PROFILE.projects.ats.overview }, { label: 'Architecture', text: PROFILE.projects.ats.architecture }, { label: 'Security Layer', text: PROFILE.projects.ats.security }, { label: 'Key Trade-off', text: PROFILE.projects.ats.tradeoffs }, { label: 'Challenge Solved', text: PROFILE.projects.ats.challenges }, { label: 'Stack', text: PROFILE.projects.ats.stack }] }) },
  { keys: ['ats', 'resume builder', 'keyword matching', 'pdf parsing', 'passport', 'oauth ats'], fn: () => ({ title: 'ATS Resume Builder Platform', sections: [{ label: 'Overview', text: PROFILE.projects.ats.overview }, { label: 'Architecture', text: PROFILE.projects.ats.architecture }, { label: 'Security', text: PROFILE.projects.ats.security }, { label: 'Trade-off', text: PROFILE.projects.ats.tradeoffs }, { label: 'Stack', text: PROFILE.projects.ats.stack }] }) },
  { keys: ['chatbot', 'ai chatbot', 'gemini', 'openai', 'flask api', 'multi-turn', 'multi turn', 'server side key', 'api key safety'], fn: () => ({ title: 'AI Chatbot Web Application', sections: [{ label: 'Overview', text: PROFILE.projects.chatbot.overview }, { label: 'Architecture', text: PROFILE.projects.chatbot.architecture }, { label: 'Security', text: PROFILE.projects.chatbot.security }, { label: 'Trade-off', text: PROFILE.projects.chatbot.tradeoffs }, { label: 'Challenge', text: PROFILE.projects.chatbot.challenges }, { label: 'Stack', text: PROFILE.projects.chatbot.stack }] }) },
  { keys: ['fake news', 'nlp', 'tf-idf', 'tfidf', 'text classification', 'misinformation', 'logistic regression', 'news detection'], fn: () => ({ title: 'Fake News Detection System', sections: [{ label: 'Overview', text: PROFILE.projects.fakenews.overview }, { label: 'Architecture', text: PROFILE.projects.fakenews.architecture }, { label: 'Trade-off', text: PROFILE.projects.fakenews.tradeoffs }, { label: 'Challenge', text: PROFILE.projects.fakenews.challenges }, { label: 'Stack', text: PROFILE.projects.fakenews.stack }] }) },
  { keys: ['career', 'recommendation', 'career system', 'recommender', 'career path'], fn: () => ({ title: 'Career Path Recommendation System', sections: [{ label: 'Overview', text: PROFILE.projects.career.overview }, { label: 'Architecture', text: PROFILE.projects.career.architecture }, { label: 'Trade-off', text: PROFILE.projects.career.tradeoffs }, { label: 'Challenge', text: PROFILE.projects.career.challenges }, { label: 'Stack', text: PROFILE.projects.career.stack }] }) },
  { keys: ['project', 'projects', 'all projects', 'what projects', 'list projects', 'show projects', 'how many projects'], fn: () => ({ title: 'All Projects (4 Deployed)', sections: [{ label: PROFILE.projects.ats.title, text: PROFILE.projects.ats.stack + ' · ' + PROFILE.projects.ats.year }, { label: PROFILE.projects.chatbot.title, text: PROFILE.projects.chatbot.stack + ' · ' + PROFILE.projects.chatbot.year }, { label: PROFILE.projects.career.title, text: PROFILE.projects.career.stack + ' · ' + PROFILE.projects.career.year }, { label: PROFILE.projects.fakenews.title, text: PROFILE.projects.fakenews.stack + ' · ' + PROFILE.projects.fakenews.year }, { label: 'GitHub', text: 'All source code available at github.com/bhagavan444' }] }) },
  { keys: ['architecture', 'backend architecture', 'system design', 'how built', 'how did you build', 'design pattern', 'api design', 'rest api', 'microservice', 'monolith'], fn: () => ({ title: 'Backend Architecture Overview', sections: [{ label: 'ATS Resume Builder', text: PROFILE.projects.ats.architecture }, { label: 'AI Chatbot', text: PROFILE.projects.chatbot.architecture }, { label: 'Design Approach', text: 'React frontend decoupled from Express/Flask backends via REST APIs. Server-side secret management. Stateless JWT auth. Async request patterns throughout.' }, { label: 'Primary Stack', text: 'React → Express/Flask → MongoDB/SQL. Deployed models served via Flask REST endpoints.' }] }) },
  { keys: ['internship', 'internships', 'experience', 'work experience', 'industrial training', 'company', 'where did you work', 'studyowl', 'smartbridge', 'blackbucks'], fn: () => ({ title: 'Internship Experience (3 Roles)', sections: [{ label: PROFILE.internships.mern.title + ' · ' + PROFILE.internships.mern.period, text: PROFILE.internships.mern.company + ' — ' + PROFILE.internships.mern.detail.join(' ') }, { label: PROFILE.internships.aiml.title + ' · ' + PROFILE.internships.aiml.period, text: PROFILE.internships.aiml.company + ' — ' + PROFILE.internships.aiml.detail.join(' ') }, { label: PROFILE.internships.ml.title + ' · ' + PROFILE.internships.ml.period, text: PROFILE.internships.ml.company + ' — ' + PROFILE.internships.ml.detail.join(' ') }] }) },
  { keys: ['mern', 'react', 'node', 'nodejs', 'express', 'mongodb mern', 'full stack', 'fullstack', 'frontend backend'], fn: () => ({ title: 'MERN Stack Capability', sections: [{ label: 'Frontend', text: 'React.js — component architecture, hooks, state management, REST API integration.' }, { label: 'Backend', text: 'Node.js + Express.js — RESTful API design, middleware, async/await, error handling.' }, { label: 'Database', text: 'MongoDB — document modeling, Mongoose ODM, schema design, aggregation pipelines.' }, { label: 'Real Experience', text: 'MERN Stack Intern at StudyOwl (May–July 2025). Built reusable components and production APIs.' }, { label: 'Stack', text: PROFILE.skills.frontend.join(' · ') + ' · ' + PROFILE.skills.backend.slice(0, 3).join(' · ') + ' · MongoDB' }] }) },
  { keys: ['python', 'flask', 'scripting', 'python developer', 'backend python'], fn: () => ({ title: 'Python Engineering', sections: [{ label: 'Usage', text: 'Primary language for ML pipelines, Flask APIs, data preprocessing, and scripting.' }, { label: 'Flask', text: 'Built Flask REST backends for AI chatbot (server-side Gemini/OpenAI) and ML model inference.' }, { label: 'ML with Python', text: 'TensorFlow/Keras for CNNs. Scikit-learn for supervised pipelines. Pandas/NumPy for data work.' }, { label: 'Internship Proof', text: 'ML & Data Science Intern at Blackbucks. AI/ML Intern at SmartBridge — CNN training and Flask deployment.' }] }) },
  { keys: ['skill', 'skills', 'tech stack', 'technologies', 'what can you do', 'what do you know', 'tech', 'capability', 'abilities', 'toolset'], fn: () => ({ title: 'Technical Skills', sections: [{ label: 'Languages', text: PROFILE.skills.languages.join(' · ') }, { label: 'Frontend', text: PROFILE.skills.frontend.join(' · ') }, { label: 'Backend & APIs', text: PROFILE.skills.backend.join(' · ') }, { label: 'Databases', text: PROFILE.skills.databases.join(' · ') }, { label: 'AI / ML', text: PROFILE.skills.ml.join(' · ') }, { label: 'Tools', text: PROFILE.skills.tools.join(' · ') }, { label: 'Concepts', text: PROFILE.skills.concepts.join(' · ') }] }) },
  { keys: ['machine learning', 'ml', 'cnn', 'tensorflow', 'deep learning', 'ai/ml', 'keras', 'neural network', 'scikit', 'sklearn', 'model training', 'model deployment', 'inference'], fn: () => ({ title: 'AI & Machine Learning Capability', sections: [{ label: 'Core Stack', text: 'TensorFlow · Keras · Scikit-learn · Python' }, { label: 'CNN Work', text: 'Built and trained CNN image classifiers at SmartBridge internship. Models deployed via Flask for real-time inference.' }, { label: 'NLP Work', text: 'TF-IDF based text classification for fake news detection. Logistic Regression classifier on vectorized corpus.' }, { label: 'Supervised ML', text: 'End-to-end supervised learning pipeline at Blackbucks internship and Career Recommender project.' }, { label: 'Deployment', text: 'All ML models deployed as Flask REST API endpoints — production-style, not just notebook experiments.' }, { label: 'Design Philosophy', text: "Prefer interpretable, deployable models when dataset scale doesn't justify complexity." }] }) },
  { keys: ['security', 'oauth', 'auth', 'authentication', 'jwt', 'token', 'passport', 'google login', 'github login', 'authorization'], fn: () => ({ title: 'Security Architecture', sections: [{ label: 'OAuth 2.0', text: 'Google + GitHub OAuth via Passport.js in ATS Resume Builder. No plaintext passwords stored at any point.' }, { label: 'API Key Security', text: 'All third-party API keys (Gemini, OpenAI) stored server-side in Flask environment variables. Zero client-side exposure.' }, { label: 'Session Management', text: 'JWT tokens for stateless session handling. Short-lived access tokens with server-side validation.' }, { label: 'Why It Matters', text: 'Security was a first-class design concern, not an afterthought.' }] }) },
  { keys: ['tradeoff', 'trade-off', 'decision', 'why mongodb', 'why flask', 'why tfidf', 'why not', 'engineering decision', 'why did you choose', 'database choice', 'stack choice'], fn: () => ({ title: 'Engineering Trade-offs', sections: [{ label: 'MongoDB over SQL', text: PROFILE.projects.ats.tradeoffs }, { label: 'Flask over FastAPI', text: "Team proficiency with Flask outweighed FastAPI's async performance delta. Predictability and faster delivery were the right constraints." }, { label: 'TF-IDF over Deep NLP', text: PROFILE.projects.fakenews.tradeoffs }, { label: 'Async Polling over WebSockets', text: PROFILE.projects.chatbot.tradeoffs }, { label: 'Scikit-learn over DL', text: "Dataset size didn't justify neural network complexity. Interpretable results were a requirement." }] }) },
  { keys: ['dsa', 'data structure', 'algorithm', 'arrays', 'strings', 'sorting', 'searching', 'complexity', 'time complexity', 'coding round', 'leetcode', 'competitive'], fn: () => ({ title: 'DSA & Algorithms', sections: [{ label: 'Foundation', text: 'Solid understanding of Arrays, Strings, Searching, and Sorting algorithms. OOP principles — Classes, Inheritance, Polymorphism, Encapsulation.' }, { label: 'Languages', text: 'Practiced in Python and Java.' }, { label: 'Applied', text: 'DSA knowledge applied in building keyword-matching algorithms for ATS Resume Builder.' }, { label: 'Honest Assessment', text: 'Continuing to strengthen competitive DSA skills. Focus is on applied engineering with strong fundamentals.' }] }) },
  { keys: ['oop', 'object oriented', 'class', 'inheritance', 'polymorphism', 'encapsulation', 'abstraction', 'oops'], fn: () => ({ title: 'Object-Oriented Programming', sections: [{ label: 'Core Concepts', text: 'Classes, Inheritance, Polymorphism, Encapsulation, Abstraction — applied in Java and Python.' }, { label: 'Applied in Projects', text: 'React component architecture follows OOP design principles. Flask API class structure. MongoDB schema modeling.' }, { label: 'Java OOP', text: 'Certified via Infosys Springboard Full Stack Development — Python & Java track including OOP patterns.' }] }) },
  { keys: ['database', 'sql', 'mongodb', 'nosql', 'mysql', 'schema', 'query', 'jdbc', 'relational', 'document store', 'data modeling'], fn: () => ({ title: 'Database Skills', sections: [{ label: 'MongoDB', text: 'Document store used in ATS Resume Builder. Flexible schema for variable resume structures. Mongoose ODM for data modeling.' }, { label: 'SQL', text: 'Relational database querying — used in academic projects and data preprocessing pipelines.' }, { label: 'JDBC', text: 'Java Database Connectivity — covered in Infosys Springboard Full Stack certification.' }, { label: 'Design Thinking', text: 'MongoDB chosen over SQL when schema variability is high. SQL preferred when relational integrity is needed.' }] }) },
  { keys: ['git', 'github', 'version control', 'branching', 'pull request', 'collaboration', 'team', 'repository', 'commit'], fn: () => ({ title: 'Git & Collaboration', sections: [{ label: 'Tools', text: 'Git + GitHub — used across all internships and projects.' }, { label: 'Internship Usage', text: 'At StudyOwl — maintained code quality using Git in a team environment with branch management and code reviews.' }, { label: 'Project Repos', text: 'All 4 projects version-controlled and available at github.com/bhagavan444.' }, { label: 'Workflow', text: 'Feature branching, descriptive commits, pull-request style workflow even in solo projects.' }] }) },
  { keys: ['deploy', 'deployment', 'devops', 'hosting', 'production', 'cloud', 'docker', 'ci/cd', 'server', 'flask deploy', 'vercel', 'heroku'], fn: () => ({ title: 'Deployment & Production Thinking', sections: [{ label: 'Flask Deployments', text: 'ML models served via Flask REST APIs — production-style inference, not just local notebooks.' }, { label: 'MERN Deployment', text: 'ATS Resume Builder built with deployment-ready architecture — environment variables, server-side secrets, stateless JWT.' }, { label: 'Cloud Exposure', text: 'AWS Basics and Azure fundamentals via Simplilearn certification.' }, { label: 'Next Step', text: 'Actively learning Docker containerization and CI/CD pipeline setup.' }] }) },
  { keys: ['role', 'roles', 'looking for', 'job', 'position', 'hire', 'available', 'availability', 'open to', 'joining', 'notice period', 'when can you join', 'salary', 'package', 'ctc'], fn: () => ({ title: 'Roles & Availability', sections: [{ label: 'Status', text: PROFILE.availability }, { label: 'Target Roles', text: 'Junior Software Engineer · Junior AI/ML Engineer · Full-Stack Developer (MERN) · Python Developer · Backend Engineer' }, { label: 'Stack Fit', text: 'MERN · Python · Flask · TensorFlow · REST APIs · MongoDB · SQL · OAuth' }, { label: 'Joining', text: 'Available immediately upon offer.' }, { label: 'Contact', text: PROFILE.email + ' · ' + PROFILE.phone }] }) },
  { keys: ['strength', 'strengths', 'strong at', 'good at', 'best at', 'core strength', 'key strength'], fn: () => ({ title: 'Core Strengths', sections: [{ label: '01', text: 'Cross-stack delivery — MERN, Python/Flask, and AI/ML in the same internship cycle.' }, { label: '02', text: 'Deployment mindset — ML models served via Flask REST APIs, not just notebooks.' }, { label: '03', text: 'Security-first architecture — OAuth 2.0, server-side API keys, JWT from day one.' }, { label: '04', text: 'Conscious trade-off reasoning — MongoDB vs SQL, Flask vs FastAPI, TF-IDF vs deep NLP.' }, { label: '05', text: 'Fast learner — picked up CNN workflows and deployed production Flask inference within a 1-month internship.' }] }) },
  { keys: ['weakness', 'weaknesses', 'areas of improvement', 'limitation', 'what you lack', 'gap', 'honest', 'shortcoming'], fn: () => ({ title: 'Areas of Active Improvement', sections: [{ label: 'Competitive DSA', text: 'Strengthening problem-solving speed and advanced algorithm patterns — active daily practice.' }, { label: 'DevOps / CI/CD', text: 'Docker and CI/CD pipeline knowledge is foundational — actively learning.' }, { label: 'System Design at Scale', text: 'Large-scale distributed system design is an area of growth.' }, { label: 'Approach', text: 'All gaps are being addressed with deliberate practice and structured learning.' }] }) },
  { keys: ['different', 'unique', 'stand out', 'why you', 'why bhagavan', 'what makes you', 'competitive advantage', 'why hire', 'value add'], fn: () => ({ title: 'What Makes Bhagavan Different', sections: PROFILE.differentiators.map((d, i) => ({ label: `0${i + 1}`, text: d })) }) },
  { keys: ['achievement', 'hackathon', 'award', 'winner', 'competition', 'extracurricular', 'activity', 'beyond coding', 'hobby'], fn: () => ({ title: 'Achievements & Activities', sections: [{ label: 'Hackathon', text: '24-Hour Hackathon Finalist — Brainovision × Ramachandra College. Led backend architecture, MongoDB integration, and REST API setup.' }, { label: 'Certifications', text: PROFILE.certifications.join(' · ') }, { label: 'Beyond Coding', text: 'Consistent side-project building in MERN and AI/ML. Technical workshop participation.' }] }) },
  { keys: ['certification', 'certificates', 'google', 'ibm', 'aws', 'infosys', 'simplilearn', 'geeksforgeeks', 'certified'], fn: () => ({ title: 'Certifications', sections: PROFILE.certifications.map((c, i) => ({ label: `0${i + 1}`, text: c })) }) },
  { keys: ['education', 'degree', 'college', 'cgpa', 'gpa', 'qualification', 'btech', 'b.tech', 'jntuk', 'ramachandra', 'aids', '10th', 'intermediate', 'school'], fn: () => ({ title: 'Academic Background', sections: [{ label: 'B.Tech', text: 'Artificial Intelligence & Data Science · Ramachandra College of Engineering, Eluru (JNTUK) · 2022–2026 · 75% CGPA' }, { label: 'Intermediate', text: 'MPC · Srividhya Junior College · 2020–2022 · 78%' }, { label: 'Secondary', text: 'Class X · Montessori English Medium High School · 2019–2020 · 95%' }] }) },
  { keys: ['team', 'teamwork', 'collaboration', 'work with others', 'communication', 'soft skill', 'interpersonal', 'leadership', 'group', 'conflict'], fn: () => ({ title: 'Teamwork & Collaboration', sections: [{ label: 'Internship', text: 'At StudyOwl — maintained code quality in a team using Git/GitHub. Followed branch management and review workflows.' }, { label: 'Hackathon', text: 'Led backend architecture and REST API setup as team lead during 24-hour hackathon.' }, { label: 'Communication', text: 'Comfortable in technical discussions, code reviews, and requirement analysis sessions.' }, { label: 'Approach', text: 'Prefers clear written specs and documented APIs when collaborating.' }] }) },
  { keys: ['problem solving', 'problem-solving', 'debugging', 'troubleshoot', 'analytical', 'approach', 'how do you solve', 'methodology', 'think through'], fn: () => ({ title: 'Problem-Solving Approach', sections: [{ label: 'Step 01', text: 'Understand constraints first — what are the data requirements, performance bounds, and security needs?' }, { label: 'Step 02', text: 'Break into smallest testable unit. Validate core assumption before building full system.' }, { label: 'Step 03', text: 'Build with observability in mind — log meaningful states, handle errors explicitly, avoid silent failures.' }, { label: 'Step 04', text: 'Measure before optimizing. Solve the right problem, then make it faster.' }, { label: 'Real Example', text: 'AI Chatbot — discovered API key exposure risk before implementation. Redesigned to server-side Flask architecture.' }] }) },
  { keys: ['final year', 'fyp', 'final year project', 'major project', 'leave management', 'power apps', 'power automate', 'sharepoint', 'power bi', 'microsoft'], fn: () => ({ title: 'Final Year Project — Leave Management System', sections: [{ label: 'Overview', text: 'Automated Leave Management System built using Microsoft Power Platform for enterprise-scale HR automation.' }, { label: 'Stack', text: 'Power Apps · Power Automate · SharePoint · Power BI · Microsoft 365' }, { label: 'Problem Solved', text: 'HR teams processed 200+ monthly leave requests manually with 3–5 day delays and no audit trail.' }, { label: 'Impact', text: '60–70% approval cycle reduction. 85–90% manual processing eliminated. Real-time Power BI analytics.' }, { label: 'Scale', text: '100+ users simulated across employee, manager, and HR admin roles.' }] }) },
  { keys: ['what is ai', 'what is machine learning', 'explain ml', 'what is deep learning', 'what is nlp', 'what is neural network', 'explain cnn', 'basics of ml'], fn: () => ({ title: 'AI/ML Fundamentals (As Applied in Projects)', sections: [{ label: 'Machine Learning', text: 'Building systems that learn patterns from data without explicit programming.' }, { label: 'Deep Learning / CNN', text: 'Neural networks with multiple layers. CNNs excel at image data. Used TensorFlow/Keras CNNs in Smart Sorting internship.' }, { label: 'NLP', text: 'Natural Language Processing — applied TF-IDF for fake news classification.' }, { label: 'Practical Context', text: 'These are not textbook definitions — every concept here has been applied in a deployed, functional system.' }] }) },
  { keys: ['how to learn', 'learning path', 'roadmap', 'advice', 'tips', 'how to become', 'resources', 'suggest', 'guidance', 'student advice', 'for freshers', 'beginner'], fn: () => ({ title: 'Learning & Growth Advice', sections: [{ label: 'Strategy', text: 'Build something real at every learning stage — not just tutorials.' }, { label: 'Stack to Start', text: 'Python fundamentals → JavaScript/React basics → Backend with Node.js or Flask → Databases → Deploy something.' }, { label: 'AI/ML Path', text: 'Python → NumPy/Pandas → Scikit-learn → TensorFlow/Keras → Build a classifier → Deploy via Flask.' }, { label: 'Key Habit', text: 'Version control from day one (Git). Write README files. Make your GitHub look like an engineer\'s GitHub.' }, { label: 'Internships', text: 'Apply early and often. Even a 1-month remote internship adds real signal to a resume.' }] }) },
  { keys: ['resume tips', 'how to write resume', 'ats resume', 'resume format', 'resume advice', 'cv tips', 'how to make resume'], fn: () => ({ title: 'Resume & ATS Advice', sections: [{ label: 'Why ATS Matters', text: 'Most company applicant tracking systems filter resumes before a human sees them.' }, { label: 'Key Sections', text: 'Summary → Education → Internships/Experience → Projects → Skills. Keep it 1 page for freshers.' }, { label: 'Projects', text: 'Every project entry needs: Tech Stack · Problem Solved · Measurable Result.' }, { label: 'Skills', text: 'List actual tools you can use, not aspirational skills.' }, { label: 'Proof', text: 'This insight is why the ATS Resume Builder project was built.' }] }) },
  { keys: ['fresher', 'campus placement', 'off campus', 'placement', 'hr round', 'technical round', 'interview tips', 'how to prepare', 'aptitude', 'placement preparation'], fn: () => ({ title: 'Campus & Placement Preparation', sections: [{ label: 'Technical Round', text: 'DSA fundamentals (arrays, strings, sorting) + 1-2 strong projects you can explain end-to-end.' }, { label: 'HR Round', text: 'Be honest about your experience level. Know your projects deeply — every line of code, every design decision.' }, { label: 'What Companies Look For', text: 'Can you code? Can you explain what you built? Do you understand trade-offs? Do you show initiative?' }, { label: 'Bhagavan\'s Preparation', text: '3 internships, 4 deployed projects, architecture awareness, and 7 certifications.' }] }) },
  { keys: ['resume', 'cv', 'download', 'pdf', 'get resume'], fn: () => ({ title: 'Resume / CV', sections: [{ label: 'Format', text: 'Single-page professional resume optimized for ATS systems.' }, { label: 'Highlights', text: '3 internships · 4 deployed projects · CNN · NLP · MERN · Flask · OAuth · 75% CGPA · 7 certifications' }], action: { label: 'Download Resume', href: null, isResume: true } }) },
  { keys: ['github', 'repository', 'code', 'source', 'open source', 'repo'], fn: () => ({ title: 'GitHub Profile', sections: [{ label: 'Profile', text: 'github.com/bhagavan444' }, { label: 'Projects', text: 'ATS Resume Builder · AI Chatbot · Fake News Detector · Career Recommender · CNN Plant Classifier' }, { label: 'Quality', text: 'All repos include README documentation, clear commit history, and structured project architecture.' }], action: { label: 'Open GitHub', href: 'https://github.com/bhagavan444' } }) },
  { keys: ['contact', 'email', 'phone', 'reach', 'get in touch', 'connect', 'linkedin', 'message'], fn: () => ({ title: 'Contact Information', sections: [{ label: 'Email', text: PROFILE.email }, { label: 'Phone', text: PROFILE.phone }, { label: 'Location', text: 'Andhra Pradesh · Open to Remote' }, { label: 'LinkedIn', text: PROFILE.linkedin }], action: { label: 'Send Email', href: 'mailto:' + PROFILE.email } }) },
];

const SUGGESTIONS = ['Walk me through your resume.', 'Explain your strongest project.', 'What internship experience do you have?', 'Describe your backend architecture.', 'What roles are you looking for?', 'What makes you different from other candidates?', 'Show me your trade-off decisions.', 'What are your AI/ML capabilities?', 'Tell me about your DSA skills.', 'What is your final year project?', 'How do you approach problem solving?', 'What are your strengths and weaknesses?', 'How to learn full stack development?', 'What certifications do you have?', 'Tell me about your teamwork experience.', 'How can I contact you?'];

const QUICK_CATEGORIES = [
  { label: '🏢 For Recruiters', qs: ['Walk me through your resume.', 'What roles are you looking for?', 'What makes you different from other candidates?', 'What are your strengths and weaknesses?'] },
  { label: '⚙️ Technical', qs: ['Explain your strongest project.', 'Describe your backend architecture.', 'Show me your trade-off decisions.', 'What are your AI/ML capabilities?'] },
  { label: '🎓 For Students', qs: ['How to learn full stack development?', 'What is your final year project?', 'Tell me about your DSA skills.', 'Resume tips for freshers?'] },
];

const FALLBACK = { title: 'Out of Scope', sections: [{ label: 'Note', text: "I'm designed to answer questions about Bhagavan's technical profile, projects, internships, and skills. Try one of the suggested questions below." }] };

function detectIntent(input) {
  const lower = input.toLowerCase().trim();
  for (const intent of INTENTS) { if (intent.keys.some(k => lower.includes(k))) return intent.fn(); }
  return FALLBACK;
}

/* ── ASSISTANT — DARK MONOCHROME ── */
function ResumeAssistant({ resumePdf }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [history, setHistory] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const inputRef = useRef(null);
  const bodyRef = useRef(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check(); window.addEventListener('resize', check); return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    if (isMobile) { document.body.style.overflow = open ? 'hidden' : ''; }
    return () => { document.body.style.overflow = ''; };
  }, [open, isMobile]);

  const submit = useCallback((q) => {
    const text = (q || query).trim(); if (!text) return;
    const res = detectIntent(text);
    setHistory(h => [...h, { q: text, res }]);
    setQuery('');
    setTimeout(() => { if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight; }, 80);
  }, [query]);

  useEffect(() => { if (open && inputRef.current) setTimeout(() => inputRef.current?.focus(), 100); }, [open]);

  const panelStyle = isMobile
    ? { position: 'fixed', inset: 0, zIndex: 9100, borderRadius: 0, maxHeight: '100%', animation: 'fadeIn 0.22s ease both' }
    : { position: 'fixed', bottom: '5.5rem', right: '1.75rem', width: 'min(440px,calc(100vw - 2rem))', zIndex: 9100, borderRadius: '16px', maxHeight: 'min(640px,82vh)', animation: 'fadeUp 0.28s cubic-bezier(0.16,1,0.3,1) both' };

  return (
    <>
      {/* TRIGGER */}
      <div style={{ position: 'fixed', bottom: '1.6rem', right: '1.6rem', zIndex: 9200, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.45rem' }}>
        {!open && (
          <div style={{ background: '#111111', color: 'rgba(255,255,255,0.45)', padding: '0.3rem 0.7rem', borderRadius: '6px', fontSize: '0.66rem', fontFamily: "'DM Mono',monospace", letterSpacing: '0.07em', whiteSpace: 'nowrap', boxShadow: '0 4px 20px rgba(0,0,0,0.6)', border: '1px solid rgba(255,255,255,0.08)', animation: 'fadeUp 0.4s ease both', pointerEvents: 'none' }}>
            Ask about my profile
          </div>
        )}
        <button onClick={() => setOpen(o => !o)}
          style={{ width: '52px', height: '52px', borderRadius: '14px', background: open ? '#141414' : '#FFFFFF', border: `1px solid ${open ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.15)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.25s cubic-bezier(0.16,1,0.3,1)', boxShadow: open ? '0 2px 16px rgba(0,0,0,0.5)' : '0 8px 32px rgba(0,0,0,0.4)' }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px) scale(1.04)'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0) scale(1)'; }}>
          {open
            ? <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2.2" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12" /></svg>
            : <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0B0B0B" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 8v4l3 3" /><path d="M8 12h.01M12 12h.01M16 12h.01" /></svg>
          }
        </button>
      </div>

      {/* PANEL */}
      {open && (
        <div style={{ ...panelStyle, background: '#0E0E0E', border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 4px 8px rgba(0,0,0,0.8),0 24px 60px rgba(0,0,0,0.7)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

          {/* HEADER */}
          <div style={{ padding: isMobile ? '0.9rem 1rem' : '0.9rem 1.2rem', borderBottom: '1px solid rgba(255,255,255,0.07)', background: '#0B0B0B', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '9px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="2" strokeLinecap="round"><path d="M9 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V10" /><path d="M15 3h6v6M10 14l11-11" /></svg>
              </div>
              <div>
                <div style={{ fontSize: '0.83rem', fontWeight: 700, color: '#FFFFFF', letterSpacing: '-0.01em', lineHeight: 1.2 }}>Profile Assistant</div>
                <div style={{ fontSize: '0.58rem', color: 'rgba(255,255,255,0.25)', fontFamily: "'DM Mono',monospace", letterSpacing: '0.06em', marginTop: '0.1rem' }}>STRUCTURED · ACCURATE · NO HALLUCINATION</div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#FFFFFF', display: 'inline-block', animation: 'pulseDot 2s ease infinite', opacity: 0.7 }} />
                <span style={{ fontSize: '0.62rem', color: 'rgba(255,255,255,0.4)', fontFamily: "'DM Mono',monospace", letterSpacing: '0.05em' }}>Online</span>
              </div>
              {history.length > 0 && (
                <button onClick={() => setHistory([])}
                  style={{ padding: '0.28rem 0.55rem', borderRadius: '5px', cursor: 'pointer', border: '1px solid rgba(255,255,255,0.08)', background: 'transparent', fontSize: '0.62rem', color: 'rgba(255,255,255,0.3)', fontFamily: "'DM Sans',sans-serif", transition: 'all 0.15s' }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = 'rgba(255,255,255,0.7)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(255,255,255,0.3)'; }}>
                  Clear
                </button>
              )}
              {isMobile && (
                <button onClick={() => setOpen(false)} style={{ width: '30px', height: '30px', borderRadius: '7px', cursor: 'pointer', border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="2.2" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12" /></svg>
                </button>
              )}
            </div>
          </div>

          {/* BODY */}
          <div ref={bodyRef} style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0', WebkitOverflowScrolling: 'touch' }}>

            {/* WELCOME */}
            {history.length === 0 && (
              <div style={{ padding: isMobile ? '1rem' : '1rem 1.2rem' }}>
                <div style={{ fontSize: '0.83rem', color: 'rgba(255,255,255,0.55)', lineHeight: 1.75, marginBottom: '1rem', padding: '0.85rem 1rem', background: '#111111', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.07)' }}>
                  Ask anything about <strong style={{ color: '#FFFFFF' }}>Bhagavan's</strong> technical profile — projects, internships, skills, trade-offs, or career advice.
                </div>
                {/* Tabs */}
                <div style={{ display: 'flex', gap: '0.35rem', marginBottom: '0.75rem', overflowX: 'auto', WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none', paddingBottom: '2px' }}>
                  {QUICK_CATEGORIES.map((cat, ci) => (
                    <button key={ci} onClick={() => setActiveTab(ci)}
                      style={{ padding: '0.38rem 0.75rem', borderRadius: '20px', cursor: 'pointer', border: `1px solid ${activeTab === ci ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.08)'}`, background: activeTab === ci ? 'rgba(255,255,255,0.08)' : 'transparent', fontSize: '0.7rem', color: activeTab === ci ? '#FFFFFF' : 'rgba(255,255,255,0.35)', fontFamily: "'DM Sans',sans-serif", fontWeight: activeTab === ci ? 600 : 400, whiteSpace: 'nowrap', transition: 'all 0.18s', flexShrink: 0 }}>
                      {cat.label}
                    </button>
                  ))}
                </div>
                {/* Questions */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.32rem' }}>
                  {QUICK_CATEGORIES[activeTab].qs.map((q, qi) => (
                    <button key={qi} onClick={() => submit(q)}
                      style={{ padding: '0.65rem 0.85rem', borderRadius: '9px', cursor: 'pointer', border: '1px solid rgba(255,255,255,0.07)', background: '#111111', fontSize: '0.78rem', color: 'rgba(255,255,255,0.5)', textAlign: 'left', lineHeight: 1.45, transition: 'all 0.16s', fontFamily: "'DM Sans',sans-serif", display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem' }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)'; e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = '#FFFFFF'; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; e.currentTarget.style.background = '#111111'; e.currentTarget.style.color = 'rgba(255,255,255,0.5)'; }}>
                      <span>{q}</span>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" style={{ flexShrink: 0, opacity: 0.35 }}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                    </button>
                  ))}
                </div>
                <div style={{ marginTop: '0.75rem', padding: '0.6rem 0.85rem', borderRadius: '8px', background: 'rgba(255,255,255,0.02)', border: '1px dashed rgba(255,255,255,0.08)' }}>
                  <div style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.28)', fontFamily: "'DM Sans',sans-serif", lineHeight: 1.6 }}>💡 Or type anything — DSA, trade-offs, deployment, weaknesses, placement tips…</div>
                </div>
              </div>
            )}

            {/* CONVERSATION */}
            {history.length > 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', padding: isMobile ? '0.85rem' : '1rem 1.2rem', gap: '1.1rem' }}>
                {history.map((entry, hi) => (
                  <div key={hi} style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <div style={{ background: '#FFFFFF', color: '#0B0B0B', padding: '0.55rem 0.9rem', borderRadius: '12px 12px 3px 12px', fontSize: isMobile ? '0.82rem' : '0.78rem', maxWidth: '82%', lineHeight: 1.55, fontFamily: "'DM Sans',sans-serif", boxShadow: '0 2px 12px rgba(0,0,0,0.4)' }}>
                        {entry.q}
                      </div>
                    </div>
                    <AssistantResponseBlock res={entry.res} resumePdf={resumePdf} isMobile={isMobile} />
                  </div>
                ))}
                {/* Follow-ups */}
                <div style={{ paddingTop: '0.25rem' }}>
                  <div style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.2)', fontFamily: "'DM Mono',monospace", letterSpacing: '0.08em', marginBottom: '0.5rem' }}>QUICK FOLLOW-UPS</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                    {SUGGESTIONS.slice(0, 6).map((s, i) => (
                      <button key={i} onClick={() => submit(s)}
                        style={{ padding: '0.32rem 0.65rem', borderRadius: '20px', cursor: 'pointer', border: '1px solid rgba(255,255,255,0.08)', background: 'transparent', fontSize: isMobile ? '0.72rem' : '0.68rem', color: 'rgba(255,255,255,0.3)', transition: 'all 0.15s', fontFamily: "'DM Sans',sans-serif" }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.22)'; e.currentTarget.style.color = '#FFFFFF'; e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = 'rgba(255,255,255,0.3)'; e.currentTarget.style.background = 'transparent'; }}>
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* INPUT BAR */}
          <div style={{ padding: isMobile ? '0.75rem' : '0.7rem 1rem', borderTop: '1px solid rgba(255,255,255,0.07)', background: '#0B0B0B', flexShrink: 0 }}>
            <div style={{ display: 'flex', gap: '0.45rem', alignItems: 'flex-end' }}>
              <input ref={inputRef}
                value={query}
                onChange={e => setQuery(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && !e.shiftKey && submit()}
                placeholder="Ask about projects, skills, internships…"
                style={{ flex: 1, padding: isMobile ? '0.72rem 0.9rem' : '0.62rem 0.85rem', borderRadius: '10px', border: '1.5px solid rgba(255,255,255,0.1)', background: '#111111', fontSize: isMobile ? '0.9rem' : '0.8rem', color: '#FFFFFF', outline: 'none', fontFamily: "'DM Sans',sans-serif", transition: 'border-color 0.18s', WebkitAppearance: 'none', lineHeight: 1.5 }}
                onFocus={e => e.target.style.borderColor = 'rgba(255,255,255,0.3)'}
                onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'} />
              <button onClick={() => submit()}
                style={{ width: isMobile ? '44px' : '38px', height: isMobile ? '44px' : '38px', borderRadius: '10px', background: '#FFFFFF', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all 0.18s', boxShadow: '0 2px 12px rgba(255,255,255,0.1)' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.88)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = '#FFFFFF'; e.currentTarget.style.transform = 'translateY(0)'; }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#0B0B0B" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19V5M5 12l7-7 7 7" /></svg>
              </button>
            </div>
            <div style={{ marginTop: '0.4rem', fontSize: '0.58rem', color: 'rgba(255,255,255,0.15)', fontFamily: "'DM Mono',monospace", letterSpacing: '0.05em', textAlign: 'center' }}>
              KNOWLEDGE-BASE POWERED · ZERO HALLUCINATION
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/* ── ASSISTANT RESPONSE BLOCK — DARK ── */
function AssistantResponseBlock({ res, resumePdf, isMobile }) {
  return (
    <div style={{ background: '#111111', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '3px 12px 12px 12px', fontSize: isMobile ? '0.82rem' : '0.77rem', color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, overflow: 'hidden' }}>
      <div style={{ padding: '0.6rem 0.9rem', background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.07)', fontSize: '0.73rem', fontWeight: 700, color: '#FFFFFF', letterSpacing: '-0.01em', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
        <div style={{ width: '3px', height: '14px', borderRadius: '2px', background: '#FFFFFF', opacity: 0.7, flexShrink: 0 }} />
        {res.title}
      </div>
      <div style={{ padding: '0.75rem 0.9rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
        {res.sections.map((s, i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '0.15rem' }}>
            <div style={{ fontSize: '0.58rem', fontFamily: "'DM Mono',monospace", letterSpacing: '0.1em', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', fontWeight: 600 }}>{s.label}</div>
            <div style={{ fontSize: isMobile ? '0.8rem' : '0.76rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.7 }}>{s.text}</div>
          </div>
        ))}
      </div>
      {res.action && (
        <div style={{ padding: '0 0.9rem 0.85rem' }}>
          {res.action.isResume ? (
            <a href={resumePdf} download style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.5rem 1rem', borderRadius: '8px', background: '#FFFFFF', color: '#0B0B0B', textDecoration: 'none', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer', fontFamily: "'DM Sans',sans-serif", transition: 'background 0.18s', boxShadow: '0 2px 12px rgba(255,255,255,0.1)' }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.88)'}
              onMouseLeave={e => e.currentTarget.style.background = '#FFFFFF'}>
              <Download size={13} strokeWidth={2} /> {res.action.label}
            </a>
          ) : (
            <a href={res.action.href} target="_blank" rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.48rem 0.95rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.45)', textDecoration: 'none', fontSize: '0.75rem', fontWeight: 500, fontFamily: "'DM Sans',sans-serif", cursor: 'pointer', transition: 'all 0.18s' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'; e.currentTarget.style.color = '#FFFFFF'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; e.currentTarget.style.color = 'rgba(255,255,255,0.45)'; }}>
              <ArrowUpRight size={13} strokeWidth={2} /> {res.action.label}
            </a>
          )}
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════
   HOME — BLACK & WHITE DESIGN SYSTEM
═══════════════════════════════════════ */
export default function Home() {
  const navigate = useNavigate();
  const [scrolled, ss] = useState(false);
  const [tIdx, sti] = useState(0);
  const [mRef, mIn] = useInView();
  const [iRef, iIn] = useInView();
  useReveal();
  useEffect(() => { const fn = () => ss(window.scrollY > 32); window.addEventListener('scroll', fn, { passive: true }); return () => window.removeEventListener('scroll', fn); }, []);
  useEffect(() => { const t = setInterval(() => sti(p => (p + 1) % testimonials.length), 6200); return () => clearInterval(t); }, []);

  const metrics = [
    { v: '3', sx: '', l: 'Internships Completed', s: 'MERN · AI/ML · Data Science' },
    { v: '4', sx: '+', l: 'Production-Ready Systems', s: 'Full-stack & AI deployed' },
    { v: '10', sx: '+', l: 'Cross-Stack Capabilities', s: 'Python · MERN · TensorFlow' },
    { v: '75', sx: '%', l: 'B.Tech CGPA', s: 'AIDS · Ramachandra College' },
  ];
  const philosophy = [
  {
    icon: Search,
    n: '01',
    t: 'Constraint-Led Design',
    b: 'Every system begins with constraints — performance ceilings, user friction, and operational limits. Features emerge only after boundaries are understood.'
  },
  {
    icon: Layers,
    n: '02',
    t: 'Architecture Precedes Interface',
    b: 'Data models, API contracts, and state ownership are defined before UI polish. Durable structure outlives visual trends.'
  },
  {
    icon: GitBranch,
    n: '03',
    t: 'Decisions Backed by Evidence',
    b: 'Technology choices, schema design, and deployment patterns are justified by measurable requirements — not familiarity or preference.'
  },
  {
    icon: Zap,
    n: '04',
    t: 'Validate the Core Assumption',
    b: 'Ship the smallest unit that tests the primary hypothesis. Fast feedback loops reduce risk and sharpen direction.'
  },
  {
    icon: BarChart2,
    n: '05',
    t: 'Observability from Day One',
    b: 'Metrics, logging, and instrumentation are not afterthoughts. Systems should explain themselves under load.'
  },
  {
    icon: Shield,
    n: '06',
    t: 'Simplicity as Discipline',
    b: 'Reduced coupling, controlled state, and clear boundaries create resilient systems. Elegance is achieved through restraint.'
  },
];
  const process = [
  {
    n: '01',
    l: 'Discovery',
    d: 'Map user constraints, operational limits, stakeholder objectives, and competitive signals before proposing solutions.'
  },
  {
    n: '02',
    l: 'Problem Definition',
    d: 'Formalize the problem statement, define measurable success criteria, and establish clear acceptance thresholds.'
  },
  {
    n: '03',
    l: 'System Design',
    d: 'Architect data models, API contracts, state boundaries, and scalability strategy prior to implementation.'
  },
  {
    n: '04',
    l: 'Implementation',
    d: 'Develop modular, testable components with version control discipline, structured reviews, and performance awareness.'
  },
  {
    n: '05',
    l: 'Deployment',
    d: 'Automate CI/CD workflows, manage environment isolation, and execute controlled, zero-downtime releases.'
  },
  {
    n: '06',
    l: 'Observability & Iteration',
    d: 'Instrument metrics, monitor failures, analyze usage patterns, and refine through structured feedback loops.'
  },
];
  const impactStats = [
  {
    v: '3',
    l: 'Industry Internships',
    s: 'Delivered production features across full-stack and ML teams.',
    icon: Award
  },
  {
    v: '2+',
    l: 'ML Models Deployed',
    s: 'Computer vision & NLP systems running in live environments.',
    icon: Cpu
  },
  {
    v: 'OAuth 2.0',
    l: 'Secure Authentication',
    s: 'Google & GitHub login with token validation and server-side session control.',
    icon: Shield
  },
  {
    v: '<1s',
    l: 'Optimized API Latency',
    s: 'Async backend pipelines with efficient inference handling.',
    icon: Zap
  },
];
 const projects = [
  {
    n: '01',
    tag: 'Enterprise Automation · Final Year Project · 2025',
    title: 'Automated Leave Management System',
    stack: ['Power Apps', 'Power Automate', 'SharePoint', 'Power BI', 'Microsoft 365'],

    problem:
      'HR teams manually processed 200+ monthly leave requests via email and spreadsheets. Approval cycles averaged 3–5 days with no structured audit logs, poor visibility, and inconsistent policy enforcement.',

    approach:
      'Designed a multi-tier approval workflow using Power Apps as the UI layer and Power Automate for rule-driven orchestration. Structured leave records in SharePoint lists with normalized schema. Implemented role-based dashboards for HR, managers, and employees. Automated Teams + Outlook notifications. Integrated Power BI for real-time leave trend analytics.',

    result:
      'Reduced approval cycle time by 60–70%. Eliminated 85–90% of manual processing effort. Created full audit traceability. Simulated 100+ users across hierarchical roles with concurrent approval routing.',

    stats: [
      { v: '60–70%', l: 'Approval time reduced' },
      { v: '85–90%', l: 'Manual effort removed' },
      { v: '100+', l: 'Users simulated' }
    ],

    github: 'https://github.com/bhagavan444'
  },

  {
    n: '02',
    tag: 'AI Application · Full-Stack · 2025',
    title: 'AI Chatbot Web Application',
    stack: ['React.js', 'Flask', 'Gemini API', 'OpenAI API', 'Python', 'Async Streaming'],

    problem:
      'Most AI chatbot wrappers expose API keys client-side and fail to maintain multi-session context. This leads to security risks and stateless conversations unsuitable for production.',

    approach:
      'Built a React frontend with a Flask backend handling 100% server-side API key isolation. Implemented session-based memory management with rolling context windows. Designed async streaming architecture for low-latency response handling. Integrated dual-provider fallback (Gemini + OpenAI) for resilience.',

    result:
      'Achieved sub-1 second average response latency. Zero client-side key exposure. Stable multi-provider fallback under simulated rate limits. Production-ready security model with scalable backend pattern.',

    stats: [
      { v: '<1s', l: 'Avg response latency' },
      { v: '2', l: 'AI providers integrated' },
      { v: '100%', l: 'Server-side key protection' }
    ],

    github: 'https://github.com/bhagavan444'
  }
];
  const tradeoffs = [
  {
    d: 'MongoDB over relational SQL for ATS Resume Builder',
    r: 'Resume structures vary significantly across candidates — dynamic sections, nested skill blocks, optional experience segments. A document model avoided recurring schema migrations and reduced iteration friction. The flexibility of MongoDB aligned better with the evolving, semi-structured data domain.'
  },
  {
    d: 'Flask over FastAPI for ML inference services',
    r: 'Given expected traffic and team familiarity, Flask offered predictable development velocity with minimal operational overhead. FastAPI’s async advantages were not a bottleneck at our scale. Delivery speed and maintainability outweighed theoretical performance gains.'
  },
  {
    d: 'TF-IDF + Logistic Regression over deep transformer models',
    r: 'For the dataset size and classification scope, TF-IDF provided strong baseline performance with interpretability and low infrastructure cost. Transformer-based models would have introduced GPU dependency and increased deployment complexity without proportionate accuracy gains.'
  },
  {
    d: 'Async request-response over persistent WebSocket streams',
    r: 'Single-user conversational sessions did not require bidirectional real-time streaming. Async HTTP calls simplified infrastructure, reduced state synchronization complexity, and avoided persistent connection management overhead.'
  },
];
  const skillGroups = [
  {
    l: 'Machine Learning & AI Systems',
    sk: [
      'TensorFlow',
      'Keras',
      'Scikit-learn',
      'Convolutional Neural Networks (CNNs)',
      'Natural Language Processing (TF-IDF)',
      'Supervised Learning',
      'Model Evaluation & Validation'
    ]
  },
  {
    l: 'Full-Stack Development',
    sk: [
      'React.js',
      'Node.js',
      'Express.js',
      'MongoDB',
      'JavaScript (ES6+)',
      'RESTful API Design',
      'JWT & OAuth 2.0 Authentication'
    ]
  },
  {
    l: 'Backend & System Integration',
    sk: [
      'Python',
      'Flask',
      'Asynchronous Request Handling',
      'Multi-provider API Integration',
      'PDF Parsing & Data Extraction',
      'SQL Querying'
    ]
  },
  {
    l: 'Computer Science Foundations',
    sk: [
      'Data Structures & Algorithms',
      'Object-Oriented Design',
      'Java',
      'C',
      'Git & GitHub',
      'Postman',
      'JDBC'
    ]
  },
];
 const achievements = [
  {
    y: '2025',
    t: 'MERN Stack Engineering Intern',
    i: 'StudyOwl Education Pvt Ltd · Backend & Full-Stack Delivery'
  },
  {
    y: '2025',
    t: 'AI/ML Intern — Computer Vision Systems',
    i: 'SmartBridge (Remote) · Smart Sorting Solution Development'
  },
  {
    y: '2024',
    t: 'Machine Learning & Data Science Intern',
    i: 'Blackbucks (Remote) · Applied ML Projects'
  },
  {
    y: '2025',
    t: '24-Hour National Hackathon Finalist',
    i: 'Brainovision × Ramachandra College of Engineering'
  },
  {
    y: '2025',
    t: 'Google Generative AI — Gemini Certification',
    i: 'Google · Generative AI Fundamentals'
  },
  {
    y: '2025',
    t: 'IBM SkillsBuild — AI & LLM Foundations',
    i: 'IBM · Artificial Intelligence & Large Language Models'
  },
  {
    y: '2025',
    t: 'Cloud Engineering Foundations',
    i: 'AWS Fundamentals + Microsoft Azure Basics'
  },
  {
    y: '2025',
    t: 'Full-Stack Development Certification',
    i: 'Infosys Springboard · Python & Java Full-Stack Track'
  },
];
  const testimonials = [
  {
    q: "Bhagavan took responsibility for backend architecture during our 24-hour hackathon. He structured the MongoDB schema and REST API cleanly under tight time constraints, ensuring the deployment was stable before the final submission.",
    nm: 'M Dhana Pujitha',
    r: 'Team Lead · 24-Hour National Hackathon, Ramachandra College × Brainovision'
  },
  {
    q: "During his AI/ML internship, Bhagavan adapted quickly to TensorFlow-based CNN workflows and implemented model evaluation pipelines with a Flask integration layer. He works independently and approaches problems methodically.",
    nm: 'Internship Mentor',
    r: 'SmartBridge (Remote) · AI/ML Internship — Smart Sorting Project'
  },
  {
    q: "He consistently extended project scope where necessary, particularly in implementing secure OAuth flows and structured PDF parsing for the ATS Resume Builder. Shows initiative and ownership beyond assigned tasks.",
    nm: 'Project Guide',
    r: 'Faculty Advisor · B.Tech Artificial Intelligence & Data Science'
  },
];
  const techStack = [
  // Frontend
  { name: 'React.js', icon: 'react' },
  { name: 'JavaScript (ES6+)', icon: 'javascript' },

  // Backend
  { name: 'Node.js', icon: 'nodejs' },
  { name: 'Express.js', icon: 'express' },
  { name: 'Flask', icon: 'flask' },

  // Databases
  { name: 'MongoDB', icon: 'mongodb' },
  { name: 'MySQL', icon: 'mysql' },

  // AI / ML
  { name: 'Python', icon: 'python' },
  { name: 'TensorFlow', icon: 'tensorflow' },
  { name: 'Scikit-learn', icon: 'scikitlearn' },

  // DevOps & Tools
  { name: 'Git', icon: 'git' },
  { name: 'GitHub', icon: 'github' },
  { name: 'Docker', icon: 'docker' }
];

  /* Section Header — with dancing emphasis on bold word */
  const SH = ({ label, title }) => {
    // Extract plain and italic parts from HTML title string
    // title uses <em style='...'> for the dancing word
    return (
      <div className="reveal" style={{ marginBottom: '3.5rem' }}>
        <div className="mono" style={{ fontSize: '0.65rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', marginBottom: '1.2rem' }}>{label}</div>
        <h2 className="serif" style={{ fontSize: 'clamp(1.8rem,3.2vw,2.6rem)', fontWeight: 400, color: '#FFFFFF', letterSpacing: '0.01em', lineHeight: 1.28, maxWidth: '520px' }}
          dangerouslySetInnerHTML={{ __html: title }} />
      </div>
    );
  };

  return <>
    <style>{CSS}</style>
    <MagneticCursor />
    <SBar />

    {/* ── NAVBAR ── */}
    <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000, height: '62px', padding: '0 3rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: scrolled ? 'rgba(11,11,11,0.92)' : 'transparent', backdropFilter: scrolled ? 'blur(24px) saturate(120%)' : 'none', WebkitBackdropFilter: scrolled ? 'blur(24px) saturate(120%)' : 'none', borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent', transition: 'all 0.3s ease' }}>
      <div className="serif" style={{ fontSize: '1.35rem', fontWeight: 400, color: '#FFFFFF', letterSpacing: '0em' }}>
        Bhagavan<span style={{ color: 'rgba(255,255,255,0.4)' }}>.</span>
      </div>
      <div className="nl" style={{ display: 'flex', gap: '2.25rem' }}>
        {[['About', '#about'], ['Work', '#work'], ['Skills', '#skills'], ['Contact', '#contact']].map(([l, h]) => (
          <a key={l} href={h} className="nav-a">{l}</a>
        ))}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <span className="mag-skip" style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#FFFFFF', display: 'inline-block', animation: 'pulseDot 2s ease infinite', opacity: 0.7 }} />
          <span className="mono mag-skip" style={{ fontSize: '0.67rem', color: 'rgba(255,255,255,0.45)', fontWeight: 500, letterSpacing: '0.04em' }}>Available</span>
        </div>
        <Btn href={resumePdf} download><Download size={13} strokeWidth={1.8} /> Resume</Btn>
      </div>
    </nav>

    <main>
      {/* ═══ HERO ═══ */}
      <section id="about" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', paddingTop: '62px', background: '#0B0B0B', position: 'relative', overflow: 'hidden' }}>

        {/* Noise grain texture overlay */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0, opacity: 0.025, backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`, backgroundRepeat: 'repeat', backgroundSize: '180px 180px' }} />

        {/* Subtle grid */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0, backgroundImage: `linear-gradient(rgba(255,255,255,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.02) 1px,transparent 1px)`, backgroundSize: '64px 64px', animation: 'gridPulse 8s ease-in-out infinite', maskImage: 'radial-gradient(ellipse 80% 70% at 50% 50%,black,transparent)', WebkitMaskImage: 'radial-gradient(ellipse 80% 70% at 50% 50%,black,transparent)' }} />

        {/* Orbs — white version */}
        <Orbit size={190} ca="rgba(255,255,255,0.04)" cd="rgba(255,255,255,0.15)" spd={20} style={{ position: 'absolute', top: '8%', right: '2%', zIndex: 0, pointerEvents: 'none' }} />
        <Orbit size={90} ca="rgba(255,255,255,0.03)" cd="rgba(255,255,255,0.18)" spd={14} style={{ position: 'absolute', bottom: '12%', left: '1%', zIndex: 0, pointerEvents: 'none' }} />

        {/* Floating dots */}
        {[{ t: '28%', r: '24%', d: '5s' }, { t: '62%', r: '14%', d: '7s' }, { t: '18%', l: '28%', d: '6s' }].map((p, i) => (
          <div key={i} style={{ position: 'absolute', top: p.t, right: p.r, left: p.l, width: '4px', height: '4px', borderRadius: '50%', background: '#FFFFFF', opacity: 0.1, animation: `floatY ${p.d} ease-in-out infinite`, zIndex: 0, pointerEvents: 'none' }} />
        ))}

        {/* Horizontal rule — thin white */}
        <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: '0.5px', background: 'rgba(255,255,255,0.03)', pointerEvents: 'none', zIndex: 0 }} />

        <div className="sec-w" style={{ padding: '4rem 3rem 5.5rem', width: '100%', position: 'relative', zIndex: 1 }}>
          <div className="hg" style={{ display: 'grid', gridTemplateColumns: '1fr 420px', gap: '6rem', alignItems: 'center' }}>

            {/* LEFT */}
            <div>
              <div style={{ marginBottom: '2rem', animation: 'fadeUp 0.5s cubic-bezier(0.16,1,0.3,1) 0.05s both' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.32rem 0.8rem', borderRadius: '6px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', fontSize: '0.73rem', fontWeight: 400, color: 'rgba(255,255,255,0.5)' }}>
                  <span className="mag-skip" style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#FFFFFF', display: 'inline-block', animation: 'pulseDot 2s ease infinite', opacity: 0.7 }} />
                  Open to full-time roles · 2026 Graduate · Andhra Pradesh / Remote
                </span>
              </div>

              <h1
  className="serif"
  style={{
    fontSize: 'clamp(2.6rem,5.2vw,4.5rem)',
    fontWeight: 400,
    color: 'rgba(255,255,255,0.92)',
    lineHeight: 1.12,
    letterSpacing: '-0.01em',
    marginBottom: '0.3rem',
    animation: 'fadeUp 0.6s cubic-bezier(0.16,1,0.3,1) 0.1s both'
  }}
>
  Designing intelligent
</h1>
<h1
  className="serif"
  style={{
    fontSize: 'clamp(2.6rem,5.2vw,4.5rem)',
    fontWeight: 400,
    color: '#FFFFFF',
    lineHeight: 1.12,
    letterSpacing: '-0.01em',
    marginBottom: '2.25rem',
    animation: 'fadeUp 0.6s cubic-bezier(0.16,1,0.3,1) 0.18s both'
  }}
>
  systems built for production.
</h1>

              <div style={{ marginBottom: '1.6rem', fontSize: '1rem', color: 'rgba(255,255,255,0.6)', animation: 'fadeUp 0.6s cubic-bezier(0.16,1,0.3,1) 0.26s both' }}>
                <Typewriter roles={['Full-Stack Engineer', 'AI/ML Systems Developer', 'Python Engineer', 'MERN Stack Developer', 'Deep Learning Practitioner']} />
              </div>

              <p
  style={{
    fontSize: '1rem',
    lineHeight: 1.88,
    color: 'rgba(255,255,255,0.55)',
    maxWidth: '520px',
    marginBottom: '2.4rem',
    fontWeight: 400,
    letterSpacing: '0.005em',
    animation: 'fadeUp 0.6s cubic-bezier(0.16,1,0.3,1) 0.34s both'
  }}
>
  AI-integrated full-stack engineer building production-ready systems across Python and the MERN stack. Experienced in taking ideas from model design to deployment, with a focus on scalability, clarity, and measurable impact.
</p>

              <div className="ctab" style={{ display: 'flex', gap: '0.7rem', marginBottom: '2.8rem', flexWrap: 'wrap', alignItems: 'center', animation: 'fadeUp 0.6s cubic-bezier(0.16,1,0.3,1) 0.42s both' }}>
                <HeroBtn primary href="mailto:g.sivasatyasaibhagavan@gmail.com">Get in touch <ArrowRight size={14} strokeWidth={1.8} /></HeroBtn>
                <HeroBtn onClick={() => navigate('/projects')}>View work</HeroBtn>
                <HeroBtn href={resumePdf} download><Download size={13} strokeWidth={1.8} /> Resume</HeroBtn>
              </div>

              <div style={{ display: 'flex', gap: '2rem', paddingTop: '1.75rem', borderTop: '1px solid rgba(255,255,255,0.07)', flexWrap: 'wrap', animation: 'fadeUp 0.6s cubic-bezier(0.16,1,0.3,1) 0.5s both' }}>
                {['B.Tech AIDS · 2026 · 75%', '3 Internships Completed', 'CNN · NLP · MERN · Flask'].map((x, i) => (
                  <span key={i} className="mono mag-skip" style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.2)', letterSpacing: '0.05em' }}>{x}</span>
                ))}
              </div>
            </div>

            {/* RIGHT — profile card */}
            <ProfileCard profileImg={profileImg} />
          </div>
        </div>
      </section>

      {/* ═══ METRICS ═══ */}
      <section ref={mRef} style={{ padding: '0', background: '#111111', borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="sec-w">
          <div className="fc" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)' }}>
            {metrics.map((m, i) => (
              <div key={i} style={{ padding: '2.5rem 2rem', borderRight: i < 3 ? '1px solid rgba(255,255,255,0.06)' : 'none', opacity: mIn ? 1 : 0, transform: mIn ? 'none' : 'translateY(12px)', transition: `opacity 0.55s ease ${i * 0.09}s,transform 0.55s ease ${i * 0.09}s` }}>
                <div className="serif" style={{ fontSize: '3rem', color: '#FFFFFF', lineHeight: 1, marginBottom: '0.6rem', fontWeight: 400, letterSpacing: '0.02em' }}>
                  <Counter target={m.v} suffix={m.sx} triggered={mIn} />
                </div>
                <div style={{ fontSize: '0.88rem', fontWeight: 500, color: 'rgba(255,255,255,0.7)', marginBottom: '0.25rem' }}>{m.l}</div>
                <div className="mono mag-skip" style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.04em' }}>{m.s}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TECH MARQUEE ═══ */}
      <div className="tech-marquee" style={{ padding: '2rem 0', background: '#0D0D0D', overflow: 'hidden', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="mq">
          {[...Array(3)].map((_, r) => techStack.map((tech, i) => (
            <div key={`${r}-${i}`} className="tech-icon-wrapper" style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: '0.6rem', margin: '0 1.5rem' }}>
              <img
                src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${tech.icon}/${tech.icon}-original.svg`}
                alt={tech.name}
                style={{ width: '40px', height: '40px', filter: 'invert(1) opacity(0.28)', transition: 'filter 0.25s ease' }}
                onMouseEnter={e => e.currentTarget.style.filter = 'invert(1) opacity(0.65)'}
                onMouseLeave={e => e.currentTarget.style.filter = 'invert(1) opacity(0.28)'}
              />
              <span className="mono tech-label mag-skip" style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.18)', letterSpacing: '0.08em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
                {tech.name}
              </span>
            </div>
          )))}
        </div>
      </div>

      {/* ═══ PHILOSOPHY ═══ */}
      <section id="philosophy" style={{ padding: '8rem 0', background: '#0B0B0B' }}>
        <div className="sec-w">
          <SH label="Design Philosophy" title="How I think about<br/><em style='font-family:'Pacifico',cursive;color:#FFFFFF'>building software</em>" />
          <div className="phil-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1px', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', overflow: 'hidden', background: 'rgba(255,255,255,0.04)' }}>
            {philosophy.map((p, i) => (
              <div key={i} className={`reveal d${(i % 3) + 1}`} style={{ padding: '1.9rem', background: '#111111', transition: 'background 0.22s' }}
                onMouseEnter={e => e.currentTarget.style.background = '#141414'}
                onMouseLeave={e => e.currentTarget.style.background = '#111111'}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', marginBottom: '1rem' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <p.icon size={15} style={{ color: 'rgba(255,255,255,0.6)' }} strokeWidth={1.6} />
                  </div>
                  <span className="mono mag-skip" style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.2)', letterSpacing: '0.1em' }}>{p.n}</span>
                </div>
                <div style={{ fontSize: '0.88rem', fontWeight: 600, color: '#FFFFFF', marginBottom: '0.7rem' }}>{p.t}</div>
                <p style={{ fontSize: '0.79rem', color: 'rgba(255,255,255,0.45)', lineHeight: 1.78 }}>{p.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PROCESS ═══ */}
      <section id="process" style={{ padding: '8rem 0', background: '#0E0E0E', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="sec-w">
          <SH label="Process" title="From ambiguity to<br/><em style='font-family:'Pacifico',cursive;color:#FFFFFF'>shipped product</em>" />
          <div style={{ height: '1px', background: 'rgba(255,255,255,0.07)', borderRadius: '1px', marginBottom: '2.5rem', overflow: 'hidden', position: 'relative' }}>
            <div className="reveal" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg,rgba(255,255,255,0.6),rgba(255,255,255,0.15))', transformOrigin: 'left', transform: 'scaleX(0)', transition: 'transform 1.1s cubic-bezier(0.16,1,0.3,1) 0.3s' }}
              ref={el => { if (el) { const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) el.style.transform = 'scaleX(1)'; }, { threshold: 0.2 }); o.observe(el); } }} />
          </div>
          <div className="pg" style={{ display: 'grid', gridTemplateColumns: 'repeat(6,1fr)', gap: '1.5rem' }}>
            {process.map((s, i) => (
              <div key={i} className={`reveal d${i + 1}`}>
                <div style={{ width: '44px', height: '44px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.1)', background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.1rem', transition: 'all 0.22s', cursor: 'pointer' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)'; e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.transform = 'scale(1.1)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.background = 'transparent'; e.currentTarget.style.transform = 'scale(1)'; }}>
                  <span className="mono mag-skip" style={{ fontSize: '0.6rem', fontWeight: 500, color: 'rgba(255,255,255,0.5)' }}>{s.n}</span>
                </div>
                <div style={{ fontSize: '0.88rem', fontWeight: 600, color: '#FFFFFF', marginBottom: '0.45rem' }}>{s.l}</div>
                <div style={{ fontSize: '0.76rem', color: 'rgba(255,255,255,0.3)', lineHeight: 1.65 }}>{s.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ IMPACT — DEEP BLACK ═══ */}
      <section ref={iRef} style={{ padding: '8rem 0', background: '#080808', position: 'relative', overflow: 'hidden', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        {/* Background scrolling words */}
        <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, transform: 'translateY(-50%)', overflow: 'hidden', opacity: 0.018, pointerEvents: 'none', userSelect: 'none' }}>
          <div className="mqr">
            {[...Array(4)].map((_, r) => ['IMPACT', 'RESULTS', 'SHIPPED', 'REAL WORK', 'DEPLOYED', 'MEASURED'].map((w, i) => (
              <span key={`${r}-${i}`} className="serif" style={{ fontSize: '8rem', fontWeight: 400, color: '#fff', whiteSpace: 'nowrap', margin: '0 3rem', letterSpacing: '0.02em' }}>{w}</span>
            )))}
          </div>
        </div>
        <div className="sec-w" style={{ position: 'relative', zIndex: 1 }}>
          <div className="reveal" style={{ marginBottom: '3.5rem' }}>
            <div className="mono mag-skip" style={{ fontSize: '0.65rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)', marginBottom: '1.2rem' }}>Impact</div>
            <h2 className="serif" style={{ fontSize: 'clamp(1.8rem,3.2vw,2.6rem)', fontWeight: 400, color: '#fff', letterSpacing: '0.01em', lineHeight: 1.28, maxWidth: '440px' }}>
              Real work,<br /><span style={{ fontFamily: "'Pacifico',cursive", color: '#FFFFFF' }}>verifiable outcomes</span>
            </h2>
          </div>
          <div className="ig" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '1px', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px', overflow: 'hidden', background: 'rgba(255,255,255,0.025)' }}>
            {impactStats.map((s, i) => (
              <div key={i} style={{ padding: '2rem 1.75rem', borderRight: i < 3 ? '1px solid rgba(255,255,255,0.04)' : 'none', background: 'rgba(255,255,255,0)', opacity: iIn ? 1 : 0, transform: iIn ? 'none' : 'translateY(14px)', transition: `opacity 0.55s ease ${i * 0.1}s,transform 0.55s ease ${i * 0.1}s,background 0.2s` }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0)'}>
                <s.icon size={18} strokeWidth={1.4} style={{ color: 'rgba(255,255,255,0.3)', marginBottom: '1.1rem', display: 'block' }} />
                <div className="serif" style={{ fontSize: '2.2rem', fontWeight: 400, color: '#fff', letterSpacing: '0.02em', marginBottom: '0.5rem' }}>{s.v}</div>
                <div style={{ fontSize: '0.85rem', fontWeight: 500, color: 'rgba(255,255,255,0.65)', marginBottom: '0.3rem' }}>{s.l}</div>
                <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.25)', lineHeight: 1.6 }}>{s.s}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PROJECTS ═══ */}
      <section id="work" style={{ padding: '8rem 0', background: '#0B0B0B', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="sec-w">
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '3.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <SH label="Selected Work" title="Systems built for<br/><em style='font-family:'Pacifico',cursive;color:#FFFFFF'>real problems</em>" />
            <div className="reveal" style={{ display: 'flex', gap: '0.6rem', marginBottom: '3.5rem' }}>
              <Btn onClick={() => navigate('/projects')}>All projects <ArrowRight size={13} strokeWidth={1.8} /></Btn>
              <Btn href="https://github.com/bhagavan444">GitHub <ArrowUpRight size={13} strokeWidth={1.8} /></Btn>
            </div>
          </div>
          {projects.map((p, pi) => (
            <div key={pi} className={`reveal d${pi + 1}`} style={{ background: '#111111', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '12px', overflow: 'hidden', marginBottom: '1.5rem', transition: 'border-color 0.22s,box-shadow 0.25s' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.14)'; e.currentTarget.style.boxShadow = '0 12px 48px rgba(0,0,0,0.6)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; e.currentTarget.style.boxShadow = 'none'; }}>
              <div style={{ padding: '1.4rem 2rem', borderBottom: '1px solid rgba(255,255,255,0.06)', background: '#0F0F0F', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.9rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.1rem' }}>
                  <span className="mono mag-skip" style={{ fontSize: '0.62rem', color: 'rgba(255,255,255,0.2)', letterSpacing: '0.1em' }}>{p.n}</span>
                  <div>
                    <div className="mono mag-skip" style={{ fontSize: '0.62rem', color: 'rgba(255,255,255,0.2)', letterSpacing: '0.08em', marginBottom: '0.2rem' }}>{p.tag}</div>
                    <div style={{ fontSize: '1rem', fontWeight: 600, color: '#FFFFFF' }}>{p.title}</div>
                  </div>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                  {p.stack.map((t, j) => (
                    <span key={j} className="mono mag-skip" style={{ fontSize: '0.62rem', color: 'rgba(255,255,255,0.35)', padding: '0.18rem 0.55rem', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.1)', background: 'transparent' }}>{t}</span>
                  ))}
                </div>
              </div>
              <div className="pb" style={{ display: 'grid', gridTemplateColumns: '1fr 240px' }}>
                <div style={{ padding: '2rem', borderRight: '1px solid rgba(255,255,255,0.06)' }}>
                  <div className="proj-inner" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0' }}>
                    {[{ label: 'Problem', text: p.problem }, { label: 'Approach', text: p.approach }, { label: 'Outcome', text: p.result }].map((s, j) => (
                      <div key={j} style={{ paddingLeft: j > 0 ? '1.25rem' : 0, borderLeft: j > 0 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
                        <span className="mono mag-skip" style={{ fontSize: '0.6rem', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.2)', display: 'block', marginBottom: '0.65rem' }}>{s.label}</span>
                        <p style={{ fontSize: '0.79rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.78 }}>{s.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="ps" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderLeft: '1px solid rgba(255,255,255,0.06)' }}>
                  <div>
                    {p.stats.map((s, j) => (
                      <div key={j} style={{ paddingBottom: j < p.stats.length - 1 ? '1rem' : 0, marginBottom: j < p.stats.length - 1 ? '1rem' : 0, borderBottom: j < p.stats.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
                        <div className="serif" style={{ fontSize: '1.7rem', color: '#FFFFFF', fontWeight: 400, lineHeight: 1, marginBottom: '0.25rem' }}>{s.v}</div>
                        <div style={{ fontSize: '0.74rem', color: 'rgba(255,255,255,0.3)' }}>{s.l}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', marginTop: '1.4rem' }}>
                    <Btn primary href={p.github} style={{ justifyContent: 'center', fontSize: '0.8rem' }}>GitHub <ArrowUpRight size={12} strokeWidth={1.8} /></Btn>
                    <Btn onClick={() => navigate('/projects')} style={{ justifyContent: 'center', fontSize: '0.8rem' }}>Case study</Btn>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className="reveal" style={{ padding: '1.25rem 1.5rem', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '8px', background: '#111111', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <span style={{ fontSize: '0.875rem', fontWeight: 500, color: '#FFFFFF' }}>More deployed systems on GitHub</span>
              <span className="mono mag-skip" style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.25)', display: 'block', marginTop: '0.2rem', letterSpacing: '0.04em' }}>ATS Resume Builder · Fake News Detector · Career Recommender · CNN Plant Classifier</span>
            </div>
            <Btn href="https://github.com/bhagavan444">github.com/bhagavan444 <ArrowUpRight size={13} strokeWidth={1.8} /></Btn>
          </div>
        </div>
      </section>

      {/* ═══ TRADE-OFFS ═══ */}
      <section style={{ padding: '8rem 0', background: '#0E0E0E', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="sec-w">
          <SH label="Engineering Maturity" title="Trade-offs made<br/><em style='font-family:'Pacifico',cursive;color:#FFFFFF'>with intent</em>" />
          <div className="tg" style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '1px', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', overflow: 'hidden', background: 'rgba(255,255,255,0.03)' }}>
            {tradeoffs.map((t, i) => (
              <div key={i} className={`reveal d${(i % 2) + 1}`} style={{ padding: '2rem', background: '#111111', transition: 'background 0.22s' }}
                onMouseEnter={e => e.currentTarget.style.background = '#141414'}
                onMouseLeave={e => e.currentTarget.style.background = '#111111'}>
                <div style={{ display: 'flex', gap: '0.7rem', marginBottom: '0.9rem', alignItems: 'flex-start' }}>
                  <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'rgba(255,255,255,0.4)', flexShrink: 0, marginTop: '8px' }} />
                  <div style={{ fontSize: '0.88rem', fontWeight: 600, color: '#FFFFFF', lineHeight: 1.42 }}>{t.d}</div>
                </div>
                <p style={{ fontSize: '0.79rem', color: 'rgba(255,255,255,0.42)', lineHeight: 1.8, paddingLeft: '0.85rem' }}>{t.r}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SKILLS ═══ */}
      <section id="skills" style={{ padding: '8rem 0', background: '#0B0B0B', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="sec-w">
          <SH label="Expertise" title="Technical capabilities<br/><em style='font-family:'Pacifico',cursive;color:#FFFFFF'>&amp; stack depth</em>" />
          <div className="sg" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '1px', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', overflow: 'hidden', background: 'rgba(255,255,255,0.03)' }}>
            {skillGroups.map((g, i) => (
              <div key={i} className={`reveal d${i + 1}`} style={{ padding: '1.9rem', background: '#111111', transition: 'background 0.22s' }}
                onMouseEnter={e => e.currentTarget.style.background = '#141414'}
                onMouseLeave={e => e.currentTarget.style.background = '#111111'}>
                <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#FFFFFF', marginBottom: '1.1rem', paddingBottom: '0.85rem', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>{g.l}</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
                  {g.sk.map((sk, j) => (
                    <span key={j} style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.45)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span className="mag-skip" style={{ width: '3px', height: '3px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'inline-block', flexShrink: 0 }} />
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
      <section id="achievements" style={{ padding: '8rem 0', background: '#0E0E0E', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="sec-w">
          <SH label="Credentials" title="Internships, awards<br/><em style='font-family:'Pacifico',cursive;color:#FFFFFF'>&amp; certifications</em>" />
          <div style={{ border: '1px solid rgba(255,255,255,0.07)', borderRadius: '12px', overflow: 'hidden' }}>
            {achievements.map((a, i) => (
              <div key={i} className={`reveal d${Math.min(i + 1, 6)}`} style={{ padding: '1rem 1.5rem', borderBottom: i < achievements.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1.2rem', background: '#111111', transition: 'background 0.18s' }}
                onMouseEnter={e => e.currentTarget.style.background = '#141414'}
                onMouseLeave={e => e.currentTarget.style.background = '#111111'}>
                <div className="ach-row" style={{ display: 'flex', alignItems: 'center', gap: '1.2rem', flex: 1, minWidth: 0 }}>
                  <span className="mono mag-skip" style={{ fontSize: '0.62rem', color: 'rgba(255,255,255,0.2)', letterSpacing: '0.06em', flexShrink: 0 }}>{a.y}</span>
                  <div>
                    <div style={{ fontSize: '0.875rem', fontWeight: 500, color: '#FFFFFF', marginBottom: '0.12rem' }}>{a.t}</div>
                    <div className="mono mag-skip" style={{ fontSize: '0.64rem', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.03em' }}>{a.i}</div>
                  </div>
                </div>
                <div style={{ padding: '0.18rem 0.6rem', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.04)', flexShrink: 0 }}>
                  <span className="mono mag-skip" style={{ fontSize: '0.58rem', color: 'rgba(255,255,255,0.45)', fontWeight: 500, letterSpacing: '0.1em' }}>VERIFIED</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TESTIMONIALS ═══ */}
      <section style={{ padding: '8rem 0', background: '#090909', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="sec-w" style={{ textAlign: 'center' }}>
          <div style={{ maxWidth: '660px', margin: '0 auto' }}>
            <div className="mono reveal" style={{ fontSize: '0.65rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)', marginBottom: '3rem' }}>Peer Feedback</div>
            <div style={{ position: 'relative', minHeight: '190px', marginBottom: '2.5rem' }}>
              {testimonials.map((t, i) => (
                <div key={i} style={{ position: i === tIdx ? 'relative' : 'absolute', top: 0, left: 0, right: 0, opacity: i === tIdx ? 1 : 0, transform: i === tIdx ? 'none' : 'translateY(8px)', visibility: i === tIdx ? 'visible' : 'hidden', transition: 'opacity 0.45s ease,transform 0.45s ease' }}>
                  <blockquote className="serif" style={{ fontSize: 'clamp(1.05rem,2vw,1.32rem)', color: 'rgba(255,255,255,0.82)', lineHeight: 1.7, letterSpacing: '0.01em', marginBottom: '1.8rem', fontWeight: 400 }}>
                    "{t.q}"
                  </blockquote>
                  <div style={{ fontSize: '0.88rem', fontWeight: 600, color: '#FFFFFF', marginBottom: '0.2rem' }}>{t.nm}</div>
                  <div className="mono mag-skip" style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.04em' }}>{t.r}</div>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.9rem' }}>
              <button onClick={() => sti(p => (p - 1 + testimonials.length) % testimonials.length)}
                style={{ width: '30px', height: '30px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.1)', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.3)', transition: 'all 0.18s' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'; e.currentTarget.style.color = '#FFFFFF'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = 'rgba(255,255,255,0.3)'; }}>
                <ChevronLeft size={14} strokeWidth={1.8} />
              </button>
              <div style={{ display: 'flex', gap: '0.45rem' }}>
                {testimonials.map((_, i) => (
                  <button key={i} onClick={() => sti(i)} style={{ width: i === tIdx ? '20px' : '6px', height: '6px', borderRadius: '3px', border: 'none', cursor: 'pointer', background: i === tIdx ? '#FFFFFF' : 'rgba(255,255,255,0.15)', transition: 'all 0.25s' }} />
                ))}
              </div>
              <button onClick={() => sti(p => (p + 1) % testimonials.length)}
                style={{ width: '30px', height: '30px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.1)', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.3)', transition: 'all 0.18s' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'; e.currentTarget.style.color = '#FFFFFF'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = 'rgba(255,255,255,0.3)'; }}>
                <ChevronRight size={14} strokeWidth={1.8} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section id="contact" style={{ padding: '8rem 0', background: '#0B0B0B', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="sec-w">
          <div className="cp reveal" style={{ background: '#0F0F0F', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '14px', padding: '5rem 4rem', position: 'relative', overflow: 'hidden' }}>
            {/* Subtle noise texture on CTA */}
            <div style={{ position: 'absolute', inset: 0, opacity: 0.03, backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`, backgroundSize: '180px', pointerEvents: 'none', borderRadius: '14px' }} />
            <Orbit size={170} ca="rgba(255,255,255,0.05)" cd="rgba(255,255,255,0.2)" spd={22} style={{ position: 'absolute', right: '-1.5rem', top: '-1.5rem', pointerEvents: 'none', opacity: 0.6 }} />
            <Orbit size={80} ca="rgba(255,255,255,0.04)" cd="rgba(255,255,255,0.15)" spd={15} style={{ position: 'absolute', right: '20%', bottom: '-0.5rem', pointerEvents: 'none', opacity: 0.4 }} />
            <div style={{ position: 'absolute', top: '35%', right: '8%', width: '4px', height: '4px', borderRadius: '50%', background: 'rgba(255,255,255,0.12)', animation: 'floatY 5s ease-in-out infinite' }} />
            <div style={{ position: 'relative', zIndex: 1, maxWidth: '580px' }}>
              <div className="mono mag-skip" style={{ fontSize: '0.65rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)', marginBottom: '1.75rem' }}>Open to production-focused teams</div>
              <h2 className="serif" style={{ fontSize: 'clamp(2.2rem,4.2vw,3.4rem)', fontWeight: 400, color: '#fff', lineHeight: 1.18, letterSpacing: '-0.01em', marginBottom: '1.4rem' }}>
                Ready to contribute<br />
                from day one.
              </h2>
              <p style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.38)', lineHeight: 1.82, marginBottom: '2.5rem', maxWidth: '440px' }}>
                Seeking full-time junior engineering roles to apply MERN, Python, and AI/ML expertise to real products. 3 internships, strong CS fundamentals, zero ramp-up on core stack. Available for on-site or remote.
              </p>
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
                <Btn primary href="mailto:g.sivasatyasaibhagavan@gmail.com">Schedule interview <ArrowRight size={14} strokeWidth={1.8} /></Btn>
                <Btn onClick={() => navigate('/projects')} style={{ borderColor: 'rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.5)', background: 'transparent' }}>View projects</Btn>
              </div>
              <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', paddingTop: '1.75rem', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
                {[{ icon: Mail, href: 'mailto:g.sivasatyasaibhagavan@gmail.com', l: 'g.sivasatyasaibhagavan@gmail.com' }, { icon: Phone, href: 'tel:+917569205626', l: '+91 7569205626' }].map((c, i) => (
                  <a key={i} href={c.href} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'rgba(255,255,255,0.25)', textDecoration: 'none', fontSize: '0.82rem', transition: 'color 0.18s' }}
                    onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.7)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.25)'}>
                    <c.icon size={13} strokeWidth={1.8} style={{ color: 'rgba(255,255,255,0.4)' }} />{c.l}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer style={{ background: 'transparent', position: 'relative', marginTop: '-1px' }}>
        {/* Wave top */}
        <div style={{ lineHeight: 0, background: '#0B0B0B' }}>
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none" style={{ display: 'block', width: '100%', height: '80px' }}>
            <path d="M0,0 C360,80 1080,80 1440,0 L1440,80 L0,80 Z" fill="#080808" />
          </svg>
        </div>

        <div style={{ background: '#080808', overflow: 'hidden' }}>
          {/* Ticker */}
          <div style={{ borderBottom: '1px solid rgba(255,255,255,0.04)', padding: '1rem 0', overflow: 'hidden' }}>
            <div className="mqr" style={{ opacity: 0.12 }}>
              {[...Array(3)].map((_, r) => ['Full-Stack Engineering', 'AI/ML Systems', 'API Architecture', 'System Design', 'Python & MERN', 'Flask & TensorFlow', 'Deep Learning', 'MongoDB', 'CNN & NLP', 'React.js', 'Internships'].map((t, i) => (
                <span key={`${r}-${i}`} className="mono mag-skip" style={{ display: 'inline-block', margin: '0 2rem', fontSize: '0.67rem', color: '#fff', letterSpacing: '0.16em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
                  {t}<span className="mag-skip" style={{ color: 'rgba(255,255,255,0.3)', margin: '0 0.9rem' }}>·</span>
                </span>
              )))}
            </div>
          </div>

          {/* Main grid */}
          <div className="sec-w" style={{ padding: '0 3rem' }}>
            <div className="fco" style={{ display: 'grid', gridTemplateColumns: '1.8fr 1fr 1fr 1fr 1.2fr', gap: '3rem 2.5rem', padding: '4rem 0 3rem' }}>
              {/* Brand */}
              <div>
                <div className="serif" style={{ fontSize: '1.25rem', color: '#fff', fontWeight: 400, letterSpacing: '-0.02em', marginBottom: '0.85rem', cursor: 'default' }}>
                  <span style={{ fontFamily: "'Pacifico',cursive", fontWeight: 400, fontSize: '1.35rem', color: '#FFFFFF' }}>Bhagavan</span>
                  <span style={{ color: 'rgba(255,255,255,0.35)' }}>.</span>
                </div>
                <p style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.22)', lineHeight: 1.9, maxWidth: '220px', marginBottom: '1.6rem' }}>
                  B.Tech AIDS · Ramachandra College of Engineering, Eluru · Class of 2026.
                </p>
                <div style={{ display: 'flex', gap: '0.45rem', marginBottom: '1.5rem' }}>
                  {[{ icon: Github, href: 'https://github.com/bhagavan444' }, { icon: Linkedin, href: 'https://www.linkedin.com/in/gopalajosyula-siva-satya-sai-bhagavan-1624a027b/' }, { icon: Mail, href: 'mailto:g.sivasatyasaibhagavan@gmail.com' }, { icon: Phone, href: 'tel:+917569205626' }].map((s, i) => (
                    <a key={i} href={s.href} target={s.href.startsWith('http') ? '_blank' : undefined}
                      rel={s.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      style={{ width: '34px', height: '34px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.03)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.25)', textDecoration: 'none', transition: 'all 0.2s' }}
                      onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; e.currentTarget.style.color = '#FFFFFF'; }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; e.currentTarget.style.color = 'rgba(255,255,255,0.25)'; }}>
                      <s.icon size={13} strokeWidth={1.8} />
                    </a>
                  ))}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <span className="mag-skip" style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#FFFFFF', display: 'inline-block', animation: 'pulseDot 2s ease infinite', opacity: 0.6 }} />
                  <span className="mono mag-skip" style={{ fontSize: '0.63rem', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.06em' }}>Available for hire · 2026</span>
                </div>
              </div>

              {/* Navigate */}
              <div>
                <div className="mono mag-skip" style={{ fontSize: '0.58rem', letterSpacing: '0.18em', color: 'rgba(255,255,255,0.14)', textTransform: 'uppercase', marginBottom: '1.25rem' }}>Navigate</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
                  {[{ l: 'Home', h: '/home' }, { l: 'About', h: '/about' }, { l: 'Projects', h: '/projects' }, { l: 'Resume', h: '/resume' }, { l: 'Contact', h: '/contact' }].map(x => (
                    <a key={x.l} href={x.h} style={{ textDecoration: 'none', color: 'rgba(255,255,255,0.28)', fontSize: '0.81rem', transition: 'color 0.18s', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}
                      onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                      onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.28)'}>{x.l}</a>
                  ))}
                </div>
              </div>

              {/* Profile */}
              <div>
                <div className="mono mag-skip" style={{ fontSize: '0.58rem', letterSpacing: '0.18em', color: 'rgba(255,255,255,0.14)', textTransform: 'uppercase', marginBottom: '1.25rem' }}>Profile</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
                  {[{ l: 'Education', h: '/education' }, { l: 'My Skills', h: '/myskills' }, { l: 'Personal Details', h: '/personaldetails' }, { l: 'Internships', h: '/internships' }, { l: 'Certifications', h: '/certifications' }].map(x => (
                    <a key={x.l} href={x.h} style={{ textDecoration: 'none', color: 'rgba(255,255,255,0.28)', fontSize: '0.81rem', transition: 'color 0.18s' }}
                      onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                      onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.28)'}>{x.l}</a>
                  ))}
                </div>
              </div>

              {/* Highlights */}
              <div>
                <div className="mono mag-skip" style={{ fontSize: '0.58rem', letterSpacing: '0.18em', color: 'rgba(255,255,255,0.14)', textTransform: 'uppercase', marginBottom: '1.25rem' }}>Highlights</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
                  {[{ l: 'Achievements', h: '/achivements' }, { l: 'Hackathons', h: '/hackathons' }, { l: 'Workshops', h: '/workshops' }, { l: 'Beyond Coding', h: '/beyondcoding' }, { l: 'GitHub', h: 'https://github.com/bhagavan444', ext: true }].map(x => (
                    <a key={x.l} href={x.h} target={x.ext ? '_blank' : undefined} rel={x.ext ? 'noopener noreferrer' : undefined}
                      style={{ textDecoration: 'none', color: 'rgba(255,255,255,0.28)', fontSize: '0.81rem', transition: 'color 0.18s', display: 'inline-flex', alignItems: 'center', gap: '0.28rem' }}
                      onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                      onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.28)'}>
                      {x.l}{x.ext && <ArrowUpRight size={10} strokeWidth={1.8} />}
                    </a>
                  ))}
                </div>
              </div>

              {/* Contact */}
              <div>
                <div className="mono mag-skip" style={{ fontSize: '0.58rem', letterSpacing: '0.18em', color: 'rgba(255,255,255,0.14)', textTransform: 'uppercase', marginBottom: '1.25rem' }}>Contact</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
                  {[{ icon: Mail, label: 'Email', value: 'g.sivasatyasaibhagavan@gmail.com', href: 'mailto:g.sivasatyasaibhagavan@gmail.com' }, { icon: Phone, label: 'Phone', value: '+91 7569205626', href: 'tel:+917569205626' }, { icon: MapPin, label: 'Location', value: 'Andhra Pradesh · Remote', href: '#' }].map(c => (
                    <a key={c.label} href={c.href} style={{ textDecoration: 'none', display: 'flex', alignItems: 'flex-start', gap: '0.55rem', transition: 'opacity 0.18s' }}
                      onMouseEnter={e => e.currentTarget.style.opacity = '0.6'}
                      onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
                      <c.icon size={11} strokeWidth={1.8} style={{ color: 'rgba(255,255,255,0.3)', marginTop: '3px', flexShrink: 0 }} />
                      <div>
                        <div className="mono mag-skip" style={{ fontSize: '0.56rem', color: 'rgba(255,255,255,0.14)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.18rem' }}>{c.label}</div>
                        <div style={{ fontSize: '0.74rem', color: 'rgba(255,255,255,0.28)', wordBreak: 'break-word', lineHeight: 1.5 }}>{c.value}</div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom bar */}
            <div className="fb" style={{ borderTop: '1px solid rgba(255,255,255,0.05)', padding: '1.5rem 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
              <span className="mono mag-skip" style={{ fontSize: '0.63rem', color: 'rgba(255,255,255,0.12)', letterSpacing: '0.04em' }}>
                © 2026 Siva Satya Sai Bhagavan Gopalajosyula · All rights reserved
              </span>
              <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.55rem 1.1rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.03)', color: 'rgba(255,255,255,0.35)', cursor: 'pointer', fontSize: '0.75rem', fontFamily: "'DM Sans',sans-serif", fontWeight: 500, transition: 'all 0.22s cubic-bezier(0.16,1,0.3,1)', letterSpacing: '0.02em' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; e.currentTarget.style.color = '#FFFFFF'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = 'rgba(255,255,255,0.35)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19V5M5 12l7-7 7 7" /></svg>
                Back to top
              </button>
            </div>
          </div>
        </div>
      </footer>
    </main>
    <ResumeAssistant resumePdf={resumePdf} />
  </>;
}