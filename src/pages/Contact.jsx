"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  Mail, Phone, Github, Linkedin, Send, CheckCircle2,
  ExternalLink, ArrowRight, MapPin, Clock, Download, Briefcase
} from "lucide-react";
import resumePdf from "../assets/bhagavanresume.pdf";

/* ── TOKENS ── */
const T = {
  bg:      "#f9f9f8",
  white:   "#ffffff",
  ink:     "#0c0c0b",
  muted:   "#6b6b68",
  muted2:  "#3d3d3a",
  border:  "rgba(0,0,0,0.07)",
  border2: "rgba(0,0,0,0.11)",
  surface: "#f2f1ee",
  accent:  "#1d4ed8",
  accentL: "rgba(29,78,216,0.08)",
  green:   "#15803d",
  greenL:  "rgba(21,128,61,0.08)",
  red:     "#dc2626",
  redL:    "rgba(220,38,38,0.08)",
};

/* ── GLOBAL CSS ── */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,600;0,9..144,700;1,9..144,300;1,9..144,400;1,9..144,600&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&family=DM+Mono:wght@400;500&display=swap');
*,*::before,*::after{margin:0;padding:0;box-sizing:border-box;}
html{scroll-behavior:smooth;overflow-x:hidden;}
body{font-family:'DM Sans',-apple-system,sans-serif;background:#f9f9f8;color:#0c0c0b;-webkit-font-smoothing:antialiased;overflow-x:hidden;}
::selection{background:rgba(29,78,216,0.1);}
::-webkit-scrollbar{width:3px;}
::-webkit-scrollbar-thumb{background:rgba(0,0,0,0.12);border-radius:2px;}
.serif{font-family:'Fraunces',Georgia,serif;}
.mono{font-family:'DM Mono',monospace;}
select option{background:#f9f9f8;color:#0c0c0b;}

@keyframes fadeUp{from{opacity:0;transform:translateY(20px);}to{opacity:1;transform:translateY(0);}}
@keyframes pulseDot{0%,100%{opacity:1;}50%{opacity:0.35;}}
@keyframes lineGrow{from{transform:scaleX(0);}to{transform:scaleX(1);}}
@keyframes spin{from{transform:rotate(0deg);}to{transform:rotate(360deg);}}
@keyframes successIn{from{opacity:0;transform:scale(0.94) translateY(16px);}to{opacity:1;transform:scale(1) translateY(0);}}
@keyframes checkPop{0%{transform:scale(0);}70%{transform:scale(1.15);}100%{transform:scale(1);}}
@keyframes shimmer{0%{transform:translateX(-100%);}100%{transform:translateX(200%);}}

.rv{opacity:0;transform:translateY(22px);transition:opacity 0.6s cubic-bezier(0.16,1,0.3,1),transform 0.6s cubic-bezier(0.16,1,0.3,1);}
.rv.in{opacity:1;transform:translateY(0);}
.rv.d1{transition-delay:0.07s;}.rv.d2{transition-delay:0.14s;}.rv.d3{transition-delay:0.21s;}.rv.d4{transition-delay:0.28s;}

.fi-wrap{position:relative;width:100%;}
.fi-wrap input,.fi-wrap textarea,.fi-wrap select{
  width:100%;font-family:'DM Sans',-apple-system,sans-serif;
  font-size:0.9rem;color:#0c0c0b;background:#ffffff;
  border:1.5px solid rgba(0,0,0,0.11);border-radius:8px;
  outline:none;transition:border-color 0.18s,box-shadow 0.18s;
  -webkit-appearance:none;appearance:none;
}
.fi-wrap input,.fi-wrap select{height:52px;padding:0.5rem 1rem;}
.fi-wrap textarea{min-height:140px;padding:0.85rem 1rem;resize:vertical;line-height:1.65;}
.fi-wrap input:focus,.fi-wrap textarea:focus,.fi-wrap select:focus{
  border-color:#1d4ed8;box-shadow:0 0 0 3px rgba(29,78,216,0.1);
}
.fi-wrap input.err,.fi-wrap textarea.err,.fi-wrap select.err{
  border-color:#dc2626;box-shadow:0 0 0 3px rgba(220,38,38,0.08);
}
.fi-label{display:block;font-size:0.72rem;font-weight:500;color:#6b6b68;
  font-family:'DM Mono',monospace;letter-spacing:0.07em;text-transform:uppercase;margin-bottom:0.4rem;}
.fi-err{font-size:0.75rem;color:#dc2626;margin-top:0.35rem;font-family:'DM Mono',monospace;}
.fi-count{font-size:0.65rem;color:#6b6b68;font-family:'DM Mono',monospace;text-align:right;margin-top:0.3rem;}

.nav-a{position:relative;text-decoration:none;color:#3d3d3a;font-size:0.875rem;font-weight:450;
  padding:0.28rem 0;transition:color 0.18s;}
.nav-a::after{content:'';position:absolute;bottom:-1px;left:0;width:100%;height:1px;
  background:#0c0c0b;transform:scaleX(0);transform-origin:left;
  transition:transform 0.22s cubic-bezier(0.16,1,0.3,1);}
.nav-a:hover{color:#0c0c0b;}.nav-a:hover::after{transform:scaleX(1);}

.cc{display:flex;align-items:center;gap:1rem;padding:1.1rem 1.25rem;
  background:#ffffff;border:1px solid rgba(0,0,0,0.07);border-radius:10px;
  text-decoration:none;transition:background 0.18s,border-color 0.18s,transform 0.22s;}
.cc:hover{background:#f2f1ee;border-color:rgba(0,0,0,0.14);transform:translateY(-2px);}

.sc{background:#ffffff;border:1px solid rgba(0,0,0,0.07);border-radius:12px;overflow:hidden;}
.sc-head{padding:1.25rem 1.5rem;border-bottom:1px solid rgba(0,0,0,0.07);background:#f9f9f8;}

.btn{display:inline-flex;align-items:center;justify-content:center;gap:0.45rem;
  font-family:'DM Sans',-apple-system,sans-serif;font-size:0.875rem;font-weight:500;
  padding:0.8rem 1.5rem;border-radius:8px;cursor:pointer;text-decoration:none;
  white-space:nowrap;transition:all 0.2s cubic-bezier(0.16,1,0.3,1);border:none;}
.btn-primary{background:#1d4ed8;color:#fff;}
.btn-primary:hover{background:#1e3a8a;transform:translateY(-1px);box-shadow:0 6px 20px rgba(29,78,216,0.3);}
.btn-secondary{background:transparent;color:#3d3d3a;border:1px solid rgba(0,0,0,0.11);}
.btn-secondary:hover{background:#f2f1ee;color:#0c0c0b;border-color:rgba(0,0,0,0.18);}
.btn-full{width:100%;min-height:52px;}

/* ── MOBILE HAMBURGER ── */
.hamburger{display:none;flex-direction:column;gap:4px;background:none;border:none;cursor:pointer;padding:4px;}
.hamburger span{display:block;width:20px;height:1.5px;background:#0c0c0b;border-radius:2px;transition:all 0.25s;}
.mobile-menu{display:none;position:fixed;top:62px;left:0;right:0;background:rgba(249,249,248,0.97);
  backdrop-filter:blur(20px);border-bottom:1px solid rgba(0,0,0,0.07);z-index:999;
  padding:1rem 1.5rem;flex-direction:column;gap:0;}
.mobile-menu.open{display:flex;}
.mobile-nav-a{display:block;padding:0.85rem 0;text-decoration:none;color:#3d3d3a;font-size:0.95rem;
  font-weight:450;border-bottom:1px solid rgba(0,0,0,0.05);transition:color 0.18s;}
.mobile-nav-a:last-child{border-bottom:none;}
.mobile-nav-a:hover{color:#0c0c0b;}

/* ── LAYOUT ── */
.main-grid{display:grid;grid-template-columns:1.2fr 1fr;gap:3rem;align-items:start;}
.name-email-row{display:grid;grid-template-columns:1fr 1fr;gap:1.1rem;}
.trust-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1rem;max-width:680px;}
.role-pills{display:flex;flex-wrap:wrap;gap:0.5rem;}
.cta-inner{display:flex;align-items:center;justify-content:space-between;gap:2.5rem;flex-wrap:wrap;}
.cta-btns{display:flex;flex-direction:column;gap:0.7rem;flex-shrink:0;min-width:180px;}

/* ── RESPONSIVE ── */
@media(max-width:1024px){
  .main-grid{grid-template-columns:1fr !important;}
  .sidebar{position:static !important;top:auto !important;}
  .cta-inner{flex-direction:column !important;align-items:stretch !important;}
  .cta-btns{flex-direction:row !important;width:100% !important;}
  .cta-btns .btn{flex:1 !important;}
}

@media(max-width:768px){
  .desktop-nav{display:none !important;}
  .hamburger{display:flex !important;}
  header{padding:5.5rem 1.25rem 3rem !important;}
  .main-section{padding:2rem 1.25rem !important;}
  .cta-section{padding:0 1.25rem 5rem !important;}
  footer{padding:1.75rem 1.25rem !important;}
  footer-inner{flex-direction:column !important;gap:0.75rem !important;align-items:flex-start !important;}
  .trust-grid{grid-template-columns:1fr 1fr !important;gap:0.75rem !important;max-width:100% !important;}
  .form-card{border-radius:12px !important;}
  .form-body{padding:1.25rem !important;}
  .form-head{padding:1.25rem !important;}
  .sc{border-radius:12px !important;}
  .sc-head{padding:1rem 1.25rem !important;}
  .sc-body{padding:1rem 1.25rem !important;}
  .cta-inner{padding:2rem 1.25rem !important;border-radius:12px !important;}
  .cta-btns{flex-direction:column !important;}
  .cta-btns .btn{flex:none !important;width:100% !important;}
  .hero-title{font-size:clamp(2.2rem,8vw,3.2rem) !important;}
  .hero-sub{font-size:0.93rem !important;}
  .name-email-row{grid-template-columns:1fr !important;}
  .role-pills-wrap{display:none;}
}

@media(max-width:480px){
  header{padding:5rem 1rem 2.5rem !important;}
  .main-section{padding:1.75rem 1rem !important;}
  .cta-section{padding:0 1rem 4rem !important;}
  .hero-title{font-size:clamp(2rem,9vw,2.8rem) !important;}
  .trust-grid{grid-template-columns:1fr !important;}
  .cta-inner{padding:1.75rem 1.25rem !important;}
}
`;

/* ── HOOKS ── */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.rv');
    const o = new IntersectionObserver(e => {
      e.forEach(en => { if (en.isIntersecting) { en.target.classList.add('in'); o.unobserve(en.target); } });
    }, { threshold: 0.1 });
    els.forEach(el => o.observe(el));
    return () => o.disconnect();
  });
}

function SBar() {
  const [p, sp] = useState(0);
  useEffect(() => {
    const fn = () => { const m = document.documentElement.scrollHeight - window.innerHeight; sp((window.scrollY / m) * 100); };
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);
  return <div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: '2px', zIndex: 9999 }}>
    <div style={{ width: `${p}%`, height: '100%', background: T.accent, transition: 'width 0.1s linear' }} />
  </div>;
}

function FInput({ label, error, value, onChange, ...props }) {
  const [focused, setFocused] = useState(false);
  return (
    <div className="fi-wrap">
      <label className="fi-label">{label}</label>
      <input {...props} value={value} onChange={onChange}
        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
        className={error ? 'err' : ''}
        style={{ borderColor: focused && !error ? T.accent : error ? T.red : undefined }} />
      {error && <div className="fi-err">↳ {error}</div>}
    </div>
  );
}

function FTextarea({ label, error, value, onChange, maxLength, ...props }) {
  const [focused, setFocused] = useState(false);
  const count = value ? value.length : 0;
  return (
    <div className="fi-wrap">
      <label className="fi-label">{label}</label>
      <textarea {...props} value={value} onChange={onChange} maxLength={maxLength}
        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
        className={error ? 'err' : ''}
        style={{ borderColor: focused && !error ? T.accent : error ? T.red : undefined }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {error ? <div className="fi-err">↳ {error}</div> : <span />}
        {maxLength && <div className="fi-count">{count}/{maxLength}</div>}
      </div>
    </div>
  );
}

function FSelect({ label, error, value, onChange, children, ...props }) {
  const [focused, setFocused] = useState(false);
  return (
    <div className="fi-wrap">
      <label className="fi-label">{label}</label>
      <div style={{ position: 'relative' }}>
        <select {...props} value={value} onChange={onChange}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
          className={error ? 'err' : ''}
          style={{
            paddingRight: '2.5rem',
            borderColor: focused && !error ? T.accent : error ? T.red : undefined,
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%236b6b68' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
            backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.85rem center',
          }}>{children}</select>
      </div>
      {error && <div className="fi-err">↳ {error}</div>}
    </div>
  );
}

function TrustChip({ icon: Icon, label, value }) {
  const ref = useRef(null);
  const [v, sv] = useState(false);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) sv(true); }, { threshold: 0.2 });
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, []);
  return (
    <div ref={ref} style={{
      display: 'flex', alignItems: 'center', gap: '0.75rem',
      padding: '0.9rem 1rem', background: T.white, border: `1px solid ${T.border}`,
      borderRadius: '10px', opacity: v ? 1 : 0, transform: v ? 'none' : 'translateY(14px)',
      transition: 'opacity 0.5s ease, transform 0.5s ease',
    }}>
      <div style={{ width: '34px', height: '34px', borderRadius: '8px', background: T.accentL,
        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <Icon size={15} style={{ color: T.accent }} strokeWidth={1.8} />
      </div>
      <div>
        <div className="serif" style={{ fontSize: '1.2rem', fontWeight: 400, color: T.ink, lineHeight: 1, marginBottom: '0.2rem' }}>{value}</div>
        <div className="mono" style={{ fontSize: '0.63rem', color: T.muted, letterSpacing: '0.05em' }}>{label}</div>
      </div>
    </div>
  );
}

function ContactCard({ icon: Icon, label, value, href, detail }) {
  return (
    <a href={href} target={href?.startsWith('http') ? '_blank' : undefined}
      rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined} className="cc">
      <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: T.surface,
        border: `1px solid ${T.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <Icon size={17} style={{ color: T.muted2 }} strokeWidth={1.8} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div className="mono" style={{ fontSize: '0.62rem', color: T.muted, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.2rem' }}>{label}</div>
        <div style={{ fontSize: '0.88rem', fontWeight: 600, color: T.ink, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{value}</div>
        {detail && <div style={{ fontSize: '0.73rem', color: T.muted, marginTop: '0.1rem' }}>{detail}</div>}
      </div>
      <ArrowRight size={14} style={{ color: T.muted, flexShrink: 0 }} strokeWidth={1.8} />
    </a>
  );
}

function SuccessState({ onReset }) {
  return (
    <div style={{ textAlign: 'center', padding: '3rem 1.5rem', animation: 'successIn 0.6s cubic-bezier(0.16,1,0.3,1) both' }}>
      <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: T.greenL,
        border: `1.5px solid rgba(21,128,61,0.25)`, display: 'flex', alignItems: 'center', justifyContent: 'center',
        margin: '0 auto 1.5rem', animation: 'checkPop 0.5s cubic-bezier(0.34,1.56,0.64,1) 0.1s both' }}>
        <CheckCircle2 size={32} style={{ color: T.green }} strokeWidth={1.5} />
      </div>
      <h3 className="serif" style={{ fontSize: '1.6rem', fontWeight: 400, color: T.ink, marginBottom: '0.65rem', letterSpacing: '-0.02em' }}>
        Message received.
      </h3>
      <p style={{ fontSize: '0.88rem', color: T.muted2, lineHeight: 1.78, maxWidth: '320px', margin: '0 auto 1.5rem' }}>
        I'll review and respond within 24 hours.
      </p>
      <button onClick={onReset} className="btn btn-secondary" style={{ margin: '0 auto' }}>
        Send another
      </button>
    </div>
  );
}

/* ── MAIN ── */
export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useReveal();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 32);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  // Close menu on route change or outside click
  useEffect(() => {
    const fn = (e) => { if (!e.target.closest('nav')) setMenuOpen(false); };
    document.addEventListener('click', fn);
    return () => document.removeEventListener('click', fn);
  }, []);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    else if (form.name.trim().length < 2) e.name = 'Name too short';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Invalid email format';
    if (!form.subject) e.subject = 'Please select a subject';
    if (!form.message.trim()) e.message = 'Message is required';
    else if (form.message.trim().length < 10) e.message = 'Too short — min 10 characters';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(p => ({ ...p, [name]: value }));
    if (errors[name]) setErrors(p => ({ ...p, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    await new Promise(r => setTimeout(r, 1600));
    setSuccess(true);
    setForm({ name: '', email: '', subject: '', message: '' });
    setSubmitting(false);
  };

  const W = { maxWidth: '1120px', margin: '0 auto' };

  const navLinks = [['Home', '/'], ['Work', '/#work'], ['Skills', '/#skills'], ['Contact', '/contact']];

  return <>
    <style>{CSS}</style>
    <SBar />

    {/* NAVBAR */}
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000, height: '62px', padding: '0 1.5rem',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      background: scrolled ? 'rgba(249,249,248,0.93)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
      WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
      borderBottom: scrolled ? `1px solid ${T.border}` : '1px solid transparent',
      transition: 'all 0.3s ease',
    }}>
      <a href="/" className="serif" style={{ fontSize: '1.1rem', fontWeight: 400, color: T.ink, letterSpacing: '-0.02em', textDecoration: 'none' }}>
        Bhagavan<span style={{ color: T.accent, fontStyle: 'italic' }}>.</span>
      </a>

      {/* Desktop nav */}
      <div className="desktop-nav" style={{ display: 'flex', gap: '2.25rem' }}>
        {navLinks.map(([l, h]) => (
          <a key={l} href={h} className="nav-a" style={{ color: h === '/contact' ? T.ink : undefined }}>{l}</a>
        ))}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <a href={resumePdf} download className="btn btn-secondary"
          style={{ fontSize: '0.8rem', padding: '0.5rem 0.9rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', textDecoration: 'none' }}>
          <Download size={12} strokeWidth={1.8} /> Resume
        </a>
        {/* Hamburger */}
        <button className="hamburger" onClick={(e) => { e.stopPropagation(); setMenuOpen(o => !o); }}
          aria-label="Toggle menu" style={{ display: 'none' }}>
          <span style={{ transform: menuOpen ? 'rotate(45deg) translate(4px, 4px)' : 'none' }} />
          <span style={{ opacity: menuOpen ? 0 : 1 }} />
          <span style={{ transform: menuOpen ? 'rotate(-45deg) translate(4px, -4px)' : 'none' }} />
        </button>
      </div>
    </nav>

    {/* Mobile menu */}
    <div className={`mobile-menu ${menuOpen ? 'open' : ''}`} onClick={e => e.stopPropagation()}>
      {navLinks.map(([l, h]) => (
        <a key={l} href={h} className="mobile-nav-a" onClick={() => setMenuOpen(false)}
          style={{ fontWeight: h === '/contact' ? 600 : 400, color: h === '/contact' ? T.ink : T.muted2 }}>{l}</a>
      ))}
    </div>

    <div style={{ position: 'relative', background: T.bg, minHeight: '100vh' }}>

      {/* ═══════════════ HEADER ═══════════════ */}
      <header style={{ ...W, padding: '7rem 2rem 4rem', borderBottom: `1px solid ${T.border}` }}>
        {/* Overline */}
        <div className="rv" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.75rem' }}>
          <div style={{ width: '36px', height: '1.5px', background: T.accent }} />
          <span className="mono" style={{ fontSize: '0.65rem', fontWeight: 500, letterSpacing: '0.18em', textTransform: 'uppercase', color: T.accent }}>Open to Opportunities</span>
        </div>

        {/* Headline */}
        <h1 className="serif hero-title rv d1" style={{
          fontSize: 'clamp(2.6rem, 7vw, 5rem)', fontWeight: 300, color: T.ink,
          lineHeight: 1.08, letterSpacing: '-0.03em', marginBottom: '0.3rem',
        }}>
          Open to Engineering
        </h1>
        <h1 className="serif hero-title rv d2" style={{
          fontSize: 'clamp(2.6rem, 7vw, 5rem)', fontWeight: 600, color: T.accent,
          lineHeight: 1.08, letterSpacing: '-0.03em', fontStyle: 'italic', marginBottom: '1.25rem',
        }}>
          Roles — 2026 Graduate.
        </h1>

        <div className="rv d2" style={{ marginBottom: '1.5rem' }}>
          <div style={{
            width: '140px', height: '3px', background: T.accent, borderRadius: '2px',
            transformOrigin: 'left', animation: 'lineGrow 0.9s cubic-bezier(0.16,1,0.3,1) 0.3s both',
          }} />
        </div>

        {/* Subtitle — direct, recruiter-facing */}
        <p className="hero-sub rv d3" style={{
          fontSize: '1.02rem', color: T.muted2, lineHeight: 1.82, maxWidth: '520px', marginBottom: '1.75rem',
        }}>
          AI-integrated Full-Stack Engineer. Focused on deployable, production-ready systems.
          Seeking backend, AI/ML-integrated, or full-stack roles in product-driven teams.
        </p>

        {/* Availability badge */}
        <div className="rv d3" style={{ marginBottom: '1.75rem' }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            padding: '0.4rem 0.9rem', borderRadius: '6px',
            background: T.greenL, border: `1px solid rgba(21,128,61,0.2)`,
            fontSize: '0.78rem', fontWeight: 500, color: T.green,
          }}>
            <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: T.green,
              display: 'inline-block', animation: 'pulseDot 2s ease infinite' }} />
            Available for Immediate Start · B.Tech AIDS, 2026
          </span>
        </div>

        {/* Role intent pills */}
        <div className="rv d3 role-pills-wrap" style={{ marginBottom: '2rem' }}>
          <div className="mono" style={{ fontSize: '0.62rem', color: T.muted, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.6rem' }}>
            Currently open to
          </div>
          <div className="role-pills">
            {['Full-Time Software Engineering', 'Backend / AI-Integrated Systems', 'Product-Based Startups', 'Remote or Hybrid'].map((role, i) => (
              <span key={i} style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                padding: '0.35rem 0.8rem', borderRadius: '6px',
                background: T.accentL, border: `1px solid rgba(29,78,216,0.15)`,
                fontSize: '0.78rem', fontWeight: 500, color: T.accent,
              }}>
                <Briefcase size={11} strokeWidth={2} /> {role}
              </span>
            ))}
          </div>
        </div>

        {/* Trust chips */}
        <div className="trust-grid rv d4">
          <TrustChip icon={CheckCircle2} value="3" label="Industry internships" />
          <TrustChip icon={Clock} value="24h" label="Response time" />
          <TrustChip icon={MapPin} value="AP" label="India · Remote open" />
        </div>
      </header>

      {/* ═══════════════ MAIN GRID ═══════════════ */}
      <section className="main-section" style={{ ...W, padding: '4rem 2rem' }}>
        <div className="main-grid">

          {/* ── FORM ── */}
          <div className="rv">
            <div className="form-card" style={{
              background: T.white, border: `1px solid ${T.border2}`,
              borderRadius: '14px', overflow: 'hidden',
              boxShadow: '0 2px 4px rgba(0,0,0,0.04),0 8px 32px rgba(0,0,0,0.05)',
            }}>
              <div className="form-head" style={{
                padding: '1.5rem 1.75rem', borderBottom: `1px solid ${T.border}`, background: T.surface,
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              }}>
                <div>
                  <div className="mono" style={{ fontSize: '0.62rem', letterSpacing: '0.14em', color: T.muted, textTransform: 'uppercase', marginBottom: '0.3rem' }}>
                    Direct Message
                  </div>
                  <div className="serif" style={{ fontSize: '1.35rem', fontWeight: 400, color: T.ink, letterSpacing: '-0.02em' }}>
                    Send a message
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: T.green, display: 'inline-block', animation: 'pulseDot 2s ease infinite' }} />
                  <span className="mono" style={{ fontSize: '0.62rem', color: T.green, letterSpacing: '0.06em' }}>Active</span>
                </div>
              </div>

              <div className="form-body" style={{ padding: '1.75rem' }}>
                {success ? (
                  <SuccessState onReset={() => setSuccess(false)} />
                ) : (
                  <form onSubmit={handleSubmit} noValidate>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                      <div className="name-email-row">
                        <FInput label="Full Name" name="name" type="text" value={form.name}
                          onChange={handleChange} error={errors.name} autoComplete="name" placeholder="Your name" />
                        <FInput label="Work Email" name="email" type="email" value={form.email}
                          onChange={handleChange} error={errors.email} autoComplete="email" placeholder="you@company.com" />
                      </div>

                      <FSelect label="Opportunity Type" name="subject" value={form.subject}
                        onChange={handleChange} error={errors.subject}>
                        <option value="">Select type...</option>
                        <option value="fulltime">Full-Time Role</option>
                        <option value="internship">Internship</option>
                        <option value="collaboration">Technical Collaboration</option>
                        <option value="inquiry">General Inquiry</option>
                      </FSelect>

                      <FTextarea label="Message" name="message" value={form.message}
                        onChange={handleChange} error={errors.message} maxLength={800}
                        placeholder="Briefly describe the role or opportunity..." />

                      <button type="submit" disabled={submitting}
                        className="btn btn-primary btn-full"
                        style={{
                          position: 'relative', overflow: 'hidden',
                          opacity: submitting ? 0.65 : 1, cursor: submitting ? 'not-allowed' : 'pointer',
                        }}>
                        {!submitting && <div style={{
                          position: 'absolute', inset: 0,
                          background: 'linear-gradient(90deg,transparent,rgba(255,255,255,0.18),transparent)',
                          transform: 'translateX(-100%)', animation: 'shimmer 3s ease infinite',
                        }} />}
                        {submitting ? (
                          <>
                            <div style={{ width: '14px', height: '14px', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.6s linear infinite' }} />
                            Sending...
                          </>
                        ) : (
                          <><Send size={15} strokeWidth={1.8} /> Send Message</>
                        )}
                      </button>

                      <p className="mono" style={{ fontSize: '0.62rem', color: T.muted, textAlign: 'center', letterSpacing: '0.04em', lineHeight: 1.6 }}>
                        Message goes directly to my inbox · No intermediaries
                      </p>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>

          {/* ── SIDEBAR ── */}
          <div className="sidebar rv d2" style={{
            display: 'flex', flexDirection: 'column', gap: '1.25rem',
            position: 'sticky', top: '5rem',
          }}>

            {/* Direct contact */}
            <div className="sc">
              <div className="sc-head">
                <div className="mono" style={{ fontSize: '0.62rem', letterSpacing: '0.12em', color: T.muted, textTransform: 'uppercase', marginBottom: '0.3rem' }}>Direct Contact</div>
                <div className="serif" style={{ fontSize: '1.05rem', fontWeight: 400, color: T.ink, letterSpacing: '-0.02em' }}>Reach me directly</div>
              </div>
              <div className="sc-body" style={{ padding: '1.1rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
                <ContactCard icon={Mail} label="Email · Preferred" value="g.sivasatyasaibhagavan@gmail.com"
                  href="mailto:g.sivasatyasaibhagavan@gmail.com" detail="Best for interview scheduling" />
                <ContactCard icon={Phone} label="Phone" value="+91 75692 05626"
                  href="tel:+917569205626" detail="Available 9 AM – 9 PM IST" />
              </div>
            </div>

            {/* Professional links */}
            <div className="sc">
              <div className="sc-head">
                <div className="mono" style={{ fontSize: '0.62rem', letterSpacing: '0.12em', color: T.muted, textTransform: 'uppercase', marginBottom: '0.3rem' }}>Professional</div>
                <div className="serif" style={{ fontSize: '1.05rem', fontWeight: 400, color: T.ink, letterSpacing: '-0.02em' }}>Online presence</div>
              </div>
              <div className="sc-body" style={{ padding: '1.1rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
                <ContactCard icon={Linkedin} label="LinkedIn" value="Siva Satya Sai Bhagavan"
                  href="https://www.linkedin.com/in/gopalajosyula-siva-satya-sai-bhagavan-1624a027b/"
                  detail="Work history · Recommendations" />
                <ContactCard icon={Github} label="GitHub" value="@bhagavan444"
                  href="https://github.com/bhagavan444" detail="Projects · Code quality · Activity" />
              </div>
            </div>

            {/* What I bring */}
            <div className="sc">
              <div className="sc-head">
                <div className="mono" style={{ fontSize: '0.62rem', letterSpacing: '0.12em', color: T.muted, textTransform: 'uppercase', marginBottom: '0.3rem' }}>Background</div>
                <div className="serif" style={{ fontSize: '1.05rem', fontWeight: 400, color: T.ink, letterSpacing: '-0.02em' }}>Technical profile</div>
              </div>
              <div className="sc-body" style={{ padding: '1.1rem 1.5rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  {[
                    { l: 'Full-stack engineer', d: 'MERN · REST APIs · Auth systems' },
                    { l: 'AI / ML practitioner', d: 'TensorFlow · Scikit-learn · NLP' },
                    { l: '3 industry internships', d: 'StudyOwl · SmartBridge · Blackbucks' },
                    { l: 'Interview-ready', d: 'DSA · System design · Live coding' },
                  ].map((item, i) => (
                    <div key={i} style={{ display: 'flex', gap: '0.85rem', alignItems: 'flex-start' }}>
                      <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: T.accent, flexShrink: 0, marginTop: '7px' }} />
                      <div>
                        <div style={{ fontSize: '0.84rem', fontWeight: 600, color: T.ink, marginBottom: '0.1rem' }}>{item.l}</div>
                        <div className="mono" style={{ fontSize: '0.63rem', color: T.muted, letterSpacing: '0.04em' }}>{item.d}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ marginTop: '1.25rem', paddingTop: '1.25rem', borderTop: `1px solid ${T.border}` }}>
                  <a href={resumePdf} download className="btn btn-secondary"
                    style={{ width: '100%', fontSize: '0.82rem', textDecoration: 'none', padding: '0.6rem 1rem' }}>
                    <Download size={13} strokeWidth={1.8} /> Download Resume (ATS-Optimized)
                  </a>
                </div>
              </div>
            </div>

            {/* Response note */}
            <div style={{ padding: '0.9rem 1.1rem', background: T.greenL, border: `1px solid rgba(21,128,61,0.18)`, borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Clock size={15} strokeWidth={1.8} style={{ color: T.green, flexShrink: 0 }} />
              <div>
                <div style={{ fontSize: '0.82rem', fontWeight: 600, color: T.green, marginBottom: '0.1rem' }}>Responds within 24 hours</div>
                <div className="mono" style={{ fontSize: '0.62rem', color: T.green, opacity: 0.7, letterSpacing: '0.04em' }}>Mon – Sat, 9 AM – 9 PM IST</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ CTA STRIP ═══════════════ */}
      <section className="cta-section" style={{ ...W, padding: '0 2rem 7rem' }}>
        <div className="rv">
          <div className="cta-inner" style={{
            background: T.ink, borderRadius: '14px', padding: '3rem 3rem',
            position: 'relative', overflow: 'hidden',
          }}>
            <div style={{ position: 'absolute', top: '-30px', right: '-30px', width: '120px', height: '120px',
              borderRadius: '50%', background: T.accentL, filter: 'blur(50px)', pointerEvents: 'none' }} />

            <div style={{ maxWidth: '500px', position: 'relative', zIndex: 1 }}>
              <div className="mono" style={{ fontSize: '0.62rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.28)', marginBottom: '0.85rem' }}>
                2026 Graduate · Immediate Availability
              </div>
              <h3 className="serif" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.1rem)', fontWeight: 300, color: '#fff', letterSpacing: '-0.03em', marginBottom: '0.75rem', lineHeight: 1.18 }}>
                Looking for a full-stack engineer who{' '}
                <em style={{ fontWeight: 600, color: T.accent }}>ships real products?</em>
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'rgba(255,255,255,0.45)', lineHeight: 1.8 }}>
                MERN · Python · AI/ML · 3 internships · ready from day one.
              </p>
            </div>

            <div className="cta-btns" style={{ position: 'relative', zIndex: 1 }}>
              <a href="mailto:g.sivasatyasaibhagavan@gmail.com" className="btn btn-primary" style={{ textDecoration: 'none' }}>
                <Send size={14} strokeWidth={1.8} /> Schedule a Call
              </a>
              <a href="https://www.linkedin.com/in/gopalajosyula-siva-satya-sai-bhagavan-1624a027b/"
                target="_blank" rel="noopener noreferrer"
                className="btn" style={{
                  borderColor: 'rgba(255,255,255,0.18)', color: 'rgba(255,255,255,0.62)',
                  background: 'transparent', border: '1px solid rgba(255,255,255,0.18)', textDecoration: 'none',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = '#fff'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(255,255,255,0.62)'; }}>
                <ExternalLink size={14} strokeWidth={1.8} /> View LinkedIn
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ FOOTER ═══════════════ */}
      <footer style={{ ...W, padding: '1.75rem 2rem 2.5rem', borderTop: `1px solid ${T.border}` }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <MapPin size={13} strokeWidth={1.8} style={{ color: T.green }} />
            <span className="mono" style={{ fontSize: '0.72rem', color: T.muted, letterSpacing: '0.05em' }}>
              Andhra Pradesh, India · UTC +5:30
            </span>
          </div>
          <span className="mono" style={{ fontSize: '0.72rem', color: T.muted, letterSpacing: '0.04em' }}>
            © 2026 Siva Satya Sai Bhagavan
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: T.green, display: 'inline-block', animation: 'pulseDot 2s ease infinite' }} />
            <span className="mono" style={{ fontSize: '0.72rem', color: T.green, letterSpacing: '0.05em' }}>Available for hire</span>
          </div>
        </div>
      </footer>
    </div>
  </>;
}