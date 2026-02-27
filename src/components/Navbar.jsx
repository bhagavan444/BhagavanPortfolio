"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ChevronDown, FileText,
  GraduationCap, Trophy, Shield, Award,
  ArrowUpRight, Github, Mail, Command,
  Search, X, Zap
} from "lucide-react";

/* ─────────────────────────────────────────────────────────────────
   FLAGSHIP DARK DESIGN SYSTEM
───────────────────────────────────────────────────────────────── */
const DS = {
  // Light white base
  bg:           "#ffffff",
  bgMid:        "#f8f9ff",
  bgSurf:       "#f3f4fb",
  bgCard:       "#ffffff",
  bgHover:      "#eef0fa",

  // Text system
  textPrimary:  "#000000",
  textSub:      "#111111",
  textMuted:    "#111111",
  textGhost:    "#555555",

  // Accent system — blue + violet
  accent:       "#2563eb",
  accentBright: "#3b7fff",
  accentViolet: "#7c3aed",
  accentCyan:   "#06b6d4",
  accentGrad:   "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)",
  accentGradH:  "linear-gradient(135deg, #3b7fff 0%, #9b6fff 100%)",
  accentSoft:   "rgba(37,99,235,0.07)",
  accentGlow:   "rgba(37,99,235,0.20)",
  accentGlow2:  "rgba(124,58,237,0.15)",

  // Glass system (light)
  glassBg:      "rgba(255,255,255,0.82)",
  glassBgScroll:"rgba(255,255,255,0.96)",
  glassBorder:  "rgba(37,99,235,0.10)",
  glassBorderL: "rgba(0,0,0,0.06)",
  glassSurf:    "rgba(0,0,0,0.03)",
  glassHover:   "rgba(0,0,0,0.05)",

  // Typography
  fontDisplay:  "'Syne', system-ui, sans-serif",
  fontSans:     "'Plus Jakarta Sans', system-ui, sans-serif",
  fontMono:     "'JetBrains Mono', ui-monospace, monospace",

  // Motion
  ease:         "cubic-bezier(0.16, 1, 0.3, 1)",
  easeOut:      "cubic-bezier(0.33, 1, 0.68, 1)",
  easeIn:       "cubic-bezier(0.55, 0, 1, 0.45)",
  spring:       "cubic-bezier(0.34, 1.56, 0.64, 1)",
  ms:           "220ms",
  msFast:       "150ms",
  msSlow:       "340ms",

  sp: (n) => `${n * 8}px`,
};

/* ─────────────────────────────────────────────────────────────────
   NAV STRUCTURE
───────────────────────────────────────────────────────────────── */
const PRIMARY = [
  { label: "About",      path: "/home",        sectionId: "home"        },
  { label: "Skills",     path: "/myskills",    sectionId: "myskills"    },
  { label: "Projects",   path: "/projects",    sectionId: "projects"    },
  { label: "Experience", path: "/internships", sectionId: "internships" },
  { label: "Contact",    path: "/contact",     sectionId: "contact"     },
];

const SECONDARY = [
  { label: "Education",        path: "/education",      Icon: GraduationCap },
  { label: "Certifications",   path: "/certifications", Icon: Shield        },
  { label: "Competitions",     path: "/hackathons",     Icon: Trophy        },
  { label: "Achievements",     path: "/achivements",    Icon: Award         },
  { label: "Workshops",        path: "/workshops",      Icon: FileText      },
  { label: "Beyond Academics", path: "/beyondcoding",   Icon: Zap           },
  { label: "Resume",           path: "/resume",         Icon: FileText      },
];

const PALETTE_ITEMS = [
  { label: "View Resume",  shortcut: "R", Icon: FileText,     action: "resume"       },
  { label: "GitHub",       shortcut: "G", Icon: Github,       action: "github"       },
  { label: "Email Me",     shortcut: "E", Icon: Mail,         action: "email"        },
  { label: "About",        shortcut: "1", Icon: ArrowUpRight, action: "/home"        },
  { label: "Projects",     shortcut: "2", Icon: ArrowUpRight, action: "/projects"    },
  { label: "Experience",   shortcut: "3", Icon: ArrowUpRight, action: "/internships" },
  { label: "Contact",      shortcut: "4", Icon: ArrowUpRight, action: "/contact"     },
];

/* ─────────────────────────────────────────────────────────────────
   GLOBAL STYLES
───────────────────────────────────────────────────────────────── */
const GLOBAL = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@500;600;700;800&family=Plus+Jakarta+Sans:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  @keyframes __menuIn {
    from { opacity: 0; transform: translateY(-8px) scale(0.97); filter: blur(3px); }
    to   { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
  }
  @keyframes __panelIn {
    from { transform: translateX(100%); opacity: 0.7; }
    to   { transform: translateX(0); opacity: 1; }
  }
  @keyframes __backdropIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes __itemStagger {
    from { opacity: 0; transform: translateX(18px) scale(0.96); }
    to   { opacity: 1; transform: translateX(0) scale(1); }
  }
  @keyframes __paletteIn {
    from { opacity: 0; transform: translateY(-14px) scale(0.95); filter: blur(6px); }
    to   { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
  }
  @keyframes __pulseRing {
    0%   { transform: scale(1); opacity: 0.6; }
    70%  { transform: scale(2.6); opacity: 0; }
    100% { transform: scale(2.6); opacity: 0; }
  }
  @keyframes __shimmer {
    0%   { background-position: -200% center; }
    100% { background-position: 200% center; }
  }
  @keyframes __shimmerSlow {
    0%   { background-position: -400% center; }
    100% { background-position: 400% center; }
  }
  @keyframes __ambientFlow {
    0%, 100% { opacity: 0.35; transform: translateX(0) scale(1); }
    50%       { opacity: 0.55; transform: translateX(6px) scale(1.06); }
  }
  @keyframes __glowBreath {
    0%, 100% { opacity: 0.6; transform: scale(1); }
    50%       { opacity: 1; transform: scale(1.04); }
  }
  @keyframes __logoBlurIn {
    from { opacity: 0; filter: blur(12px); transform: translateY(4px); }
    to   { opacity: 1; filter: blur(0); transform: translateY(0); }
  }
  @keyframes __navStaggerIn {
    from { opacity: 0; transform: translateY(-6px); filter: blur(4px); }
    to   { opacity: 1; transform: translateY(0); filter: blur(0); }
  }
  @keyframes __indicatorGlow {
    0%, 100% { box-shadow: 0 0 8px rgba(79,139,255,0.6), 0 0 20px rgba(155,127,255,0.3); }
    50%       { box-shadow: 0 0 16px rgba(79,139,255,0.9), 0 0 32px rgba(155,127,255,0.5); }
  }
  @keyframes __borderSpin {
    from { background-position: 0% 50%; }
    to   { background-position: 200% 50%; }
  }
  @keyframes __sparkTrail {
    0%   { opacity: 1; transform: scaleX(1); }
    100% { opacity: 0; transform: scaleX(0.1); }
  }
  @keyframes __grainFloat {
    0%   { transform: translate(0, 0); }
    33%  { transform: translate(-2px, 1px); }
    66%  { transform: translate(1px, -2px); }
    100% { transform: translate(0, 0); }
  }
  @keyframes __ctaGlow {
    0%, 100% { box-shadow: 0 0 16px rgba(79,139,255,0.35), 0 4px 20px rgba(79,139,255,0.2), inset 0 1px 0 rgba(255,255,255,0.12); }
    50%       { box-shadow: 0 0 28px rgba(79,139,255,0.55), 0 4px 32px rgba(155,127,255,0.35), inset 0 1px 0 rgba(255,255,255,0.18); }
  }
  @keyframes __sweepLight {
    0%   { left: -60%; opacity: 0; }
    10%  { opacity: 1; }
    50%  { opacity: 0.6; }
    100% { left: 120%; opacity: 0; }
  }
  @keyframes __fadeSlideUp {
    from { opacity: 0; transform: translateY(12px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes __meshMove {
    0%, 100% { transform: translate(0, 0) rotate(0deg); }
    33%       { transform: translate(10px, -8px) rotate(0.5deg); }
    66%       { transform: translate(-6px, 6px) rotate(-0.3deg); }
  }

  .nav-lift:hover { transform: translateY(-2px) !important; }
  .nav-lift { transition: transform 200ms cubic-bezier(0.34,1.56,0.64,1); }

  ::-webkit-scrollbar { width: 3px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: rgba(79,139,255,0.25); border-radius: 4px; }
  :focus-visible { outline: 2px solid #4f8bff; outline-offset: 2px; border-radius: 4px; }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
  }
`;

/* ─────────────────────────────────────────────────────────────────
   HOOKS
───────────────────────────────────────────────────────────────── */
function useMQ(query) {
  const [match, setMatch] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(query);
    setMatch(mq.matches);
    const cb = (e) => setMatch(e.matches);
    mq.addEventListener("change", cb);
    return () => mq.removeEventListener("change", cb);
  }, [query]);
  return match;
}

function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const h = doc.scrollHeight - doc.clientHeight;
      setProgress(h > 0 ? (window.scrollY / h) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return progress;
}

function useScrollSpy(items) {
  const [active, setActive] = useState(null);
  useEffect(() => {
    const ids = items.map(i => i.sectionId).filter(Boolean);
    if (!ids.length) return;
    const onScroll = () => {
      const threshold = window.innerHeight * 0.4;
      let best = null, bestTop = -Infinity;
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        const { top } = el.getBoundingClientRect();
        if (top <= threshold && top > bestTop) { bestTop = top; best = id; }
      }
      setActive(best);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [items]);
  return active;
}

function useCursorX() {
  const [x, setX] = useState(0.5);
  useEffect(() => {
    const fn = (e) => setX(e.clientX / window.innerWidth);
    window.addEventListener("mousemove", fn, { passive: true });
    return () => window.removeEventListener("mousemove", fn);
  }, []);
  return x;
}

/* ─────────────────────────────────────────────────────────────────
   NOISE GRAIN OVERLAY
───────────────────────────────────────────────────────────────── */
function GrainOverlay() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        borderRadius: "inherit",
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
        backgroundSize: "180px 180px",
        backgroundRepeat: "repeat",
        opacity: 0.012,
        mixBlendMode: "overlay",
        pointerEvents: "none",
        animation: "__grainFloat 8s steps(4) infinite",
        zIndex: 1,
      }}
    />
  );
}

/* ─────────────────────────────────────────────────────────────────
   SCROLL PROGRESS BAR — cinematic
───────────────────────────────────────────────────────────────── */
function ScrollProgressBar({ progress, visible }) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: "1.5px",
        background: "rgba(0,0,0,0.03)",
        overflow: "visible",
        opacity: visible && progress > 1 ? 1 : 0,
        transition: `opacity ${DS.ms} ${DS.ease}`,
        zIndex: 10,
      }}
    >
      {/* Main bar */}
      <div
        style={{
          height: "100%",
          width: `${progress}%`,
          background: "linear-gradient(90deg, #4f8bff, #9b7fff, #38d9f5, #4f8bff)",
          backgroundSize: "300% auto",
          borderRadius: "0 2px 2px 0",
          transition: "width 80ms linear",
          animation: "__shimmer 2.5s linear infinite",
          position: "relative",
        }}
      >
        {/* Spark glow at tip */}
        <div
          style={{
            position: "absolute",
            right: "-2px",
            top: "50%",
            transform: "translateY(-50%)",
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            background: "#9b7fff",
            boxShadow: "0 0 12px 4px rgba(155,127,255,0.8), 0 0 24px 8px rgba(79,139,255,0.4)",
            filter: "blur(1px)",
          }}
        />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   ANIMATED GRADIENT MESH BACKGROUND
───────────────────────────────────────────────────────────────── */
function GradientMesh({ cursorX }) {
  const shift = (cursorX - 0.5) * 24;
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        borderRadius: "inherit",
        pointerEvents: "none",
        zIndex: 0,
      }}
    >
      {/* Left orb */}
      <div
        style={{
          position: "absolute",
          top: "-40px",
          left: `calc(15% + ${shift * 0.3}px)`,
          width: "300px",
          height: "120px",
          background: "radial-gradient(ellipse, rgba(37,99,235,0.07) 0%, transparent 70%)",
          filter: "blur(20px)",
          transition: `left 800ms cubic-bezier(0.16,1,0.3,1)`,
          animation: "__ambientFlow 8s ease-in-out infinite",
        }}
      />
      {/* Right orb */}
      <div
        style={{
          position: "absolute",
          top: "-30px",
          right: `calc(15% - ${shift * 0.2}px)`,
          width: "220px",
          height: "90px",
          background: "radial-gradient(ellipse, rgba(124,58,237,0.05) 0%, transparent 70%)",
          filter: "blur(18px)",
          transition: `right 800ms cubic-bezier(0.16,1,0.3,1)`,
          animation: "__ambientFlow 11s ease-in-out infinite reverse",
        }}
      />
      {/* Center orb */}
      <div
        style={{
          position: "absolute",
          top: "-20px",
          left: "50%",
          transform: `translateX(calc(-50% + ${shift * 0.15}px))`,
          width: "400px",
          height: "80px",
          background: "radial-gradient(ellipse, rgba(6,182,212,0.04) 0%, transparent 70%)",
          filter: "blur(24px)",
          transition: `transform 600ms cubic-bezier(0.16,1,0.3,1)`,
          animation: "__meshMove 14s ease-in-out infinite",
        }}
      />
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   LIGHT SWEEP EFFECT
───────────────────────────────────────────────────────────────── */
function LightSweep({ trigger }) {
  const [sweeping, setSweeping] = useState(false);
  useEffect(() => {
    if (!trigger) return;
    setSweeping(true);
    const t = setTimeout(() => setSweeping(false), 1400);
    return () => clearTimeout(t);
  }, [trigger]);

  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 2,
        borderRadius: "inherit",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          width: "60px",
          background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.05) 50%, transparent 100%)",
          transform: "skewX(-15deg)",
          animation: sweeping ? `__sweepLight 1.4s ${DS.ease} forwards` : "none",
          opacity: sweeping ? 1 : 0,
          left: "-60%",
        }}
      />
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   AVAILABILITY BADGE
───────────────────────────────────────────────────────────────── */
function AvailabilityBadge() {
  const [showTip, setShowTip] = useState(false);
  return (
    <div
      style={{ position: "relative", display: "flex", alignItems: "center" }}
      onMouseEnter={() => setShowTip(true)}
      onMouseLeave={() => setShowTip(false)}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "7px",
          padding: "5px 11px 5px 8px",
          background: "linear-gradient(135deg, rgba(16,185,129,0.08) 0%, rgba(16,185,129,0.14) 100%)",
          border: "1px solid rgba(16,185,129,0.25)",
          borderRadius: "20px",
          cursor: "default",
          userSelect: "none",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
        }}
      >
        <div style={{ position: "relative", width: "7px", height: "7px", flexShrink: 0 }}>
          <div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "50%",
              background: "#10b981",
              animation: "__pulseRing 2.2s ease-out infinite",
            }}
          />
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              background: "#10b981",
              boxShadow: "0 0 8px rgba(16,185,129,0.8)",
            }}
          />
        </div>
        <span
          style={{
            fontFamily: DS.fontSans,
            fontSize: "11px",
            fontWeight: 600,
            color: "#047857",
            letterSpacing: "-0.01em",
            lineHeight: 1,
          }}
        >
          Available
        </span>
      </div>

      {showTip && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 10px)",
            left: "50%",
            transform: "translateX(-50%)",
            whiteSpace: "nowrap",
            background: "#1a1f2e",
            color: "#c8cfe8",
            fontFamily: DS.fontSans,
            fontSize: "12px",
            fontWeight: 400,
            letterSpacing: "-0.01em",
            padding: "7px 13px",
            borderRadius: "9px",
            boxShadow: "0 8px 32px rgba(0,0,0,0.4), 0 2px 8px rgba(0,0,0,0.3), 0 0 0 1px rgba(79,139,255,0.15)",
            pointerEvents: "none",
            animation: `__menuIn ${DS.msFast} ${DS.ease}`,
            zIndex: 9999,
          }}
        >
          <span style={{ color: DS.textPrimary }}>Open to full-time roles</span> · 2026 Graduate
          <div
            style={{
              position: "absolute",
              top: "-4px",
              left: "50%",
              transform: "translateX(-50%) rotate(45deg)",
              width: "8px",
              height: "8px",
              background: DS.bgCard,
              borderRadius: "1px",
              boxShadow: "-1px -1px 0 rgba(79,139,255,0.15)",
            }}
          />
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   LOGO — with blur-in reveal + glow
───────────────────────────────────────────────────────────────── */
function Logo({ onClick }) {
  const [hov, setHov] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    setTilt({
      x: ((e.clientY - cy) / rect.height) * -4,
      y: ((e.clientX - cx) / rect.width) * 4,
    });
  };

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => { setHov(false); setTilt({ x: 0, y: 0 }); }}
      onMouseMove={handleMouseMove}
      aria-label="Home"
      style={{
        background: "none",
        border: "none",
        cursor: "pointer",
        padding: "0",
        display: "flex",
        alignItems: "baseline",
        gap: "2px",
        lineHeight: 1,
        outline: "none",
        animation: `__logoBlurIn 600ms ${DS.ease} 100ms backwards`,
        transform: `perspective(400px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(${hov ? -1.5 : 0}px)`,
        transition: `transform 200ms ${DS.ease}`,
        position: "relative",
      }}
    >
      {/* Glow behind logo */}
      <div
        style={{
          position: "absolute",
          inset: "-8px -16px",
          background: hov
            ? "radial-gradient(ellipse, rgba(37,99,235,0.12) 0%, transparent 70%)"
            : "radial-gradient(ellipse, rgba(37,99,235,0.05) 0%, transparent 70%)",
          borderRadius: "20px",
          transition: `opacity ${DS.ms} ${DS.ease}`,
          pointerEvents: "none",
          animation: "__glowBreath 4s ease-in-out infinite",
        }}
      />
      <span
        style={{
          fontFamily: DS.fontMono,
          fontSize: "12px",
          fontWeight: 400,
          color: DS.accent,
          letterSpacing: "0",
          userSelect: "none",
          opacity: 0.8,
          position: "relative",
        }}
      >
        ./
      </span>
      <span
        style={{
          fontFamily: DS.fontDisplay,
          fontSize: "15px",
          fontWeight: 700,
          letterSpacing: "-0.04em",
          userSelect: "none",
          position: "relative",
          backgroundImage: hov
            ? "linear-gradient(135deg, #000000 0%, #2563eb 50%, #7c3aed 100%)"
            : "none",
          backgroundSize: hov ? "200% auto" : "100% auto",
          WebkitBackgroundClip: hov ? "text" : "initial",
          WebkitTextFillColor: hov ? "transparent" : "#000000",
          backgroundClip: hov ? "text" : "initial",
          color: hov ? "transparent" : "#000000",
          animation: hov ? "__shimmerSlow 3s linear infinite" : "none",
          transition: `all ${DS.ms} ${DS.ease}`,
        }}
      >
        G S S S BHAGAVAN
      </span>
    </button>
  );
}

/* ─────────────────────────────────────────────────────────────────
   SLIDING INDICATOR — glowing light system
───────────────────────────────────────────────────────────────── */
function SlidingIndicator({ containerRef, activeIndex, itemRefs }) {
  const [pos, setPos] = useState({ opacity: 0, left: 0, width: 0 });

  useEffect(() => {
    const activeRef = itemRefs.current[activeIndex];
    const container = containerRef.current;
    if (!activeRef || !container || activeIndex < 0) {
      setPos(p => ({ ...p, opacity: 0 }));
      return;
    }
    const cRect = container.getBoundingClientRect();
    const iRect = activeRef.getBoundingClientRect();
    const HPAD = 14;
    setPos({
      opacity: 1,
      left: iRect.left - cRect.left + HPAD,
      width: iRect.width - HPAD * 2,
    });
  }, [activeIndex, itemRefs, containerRef]);

  return (
    <>
      {/* Capsule background */}
      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: "5px",
          top: "5px",
          left: `${pos.left - 16}px`,
          width: `${pos.width + 32}px`,
          background: "linear-gradient(135deg, rgba(79,139,255,0.10) 0%, rgba(155,127,255,0.08) 100%)",
          border: "1px solid rgba(0,0,0,0.08)",
          borderRadius: "8px",
          opacity: pos.opacity * 0.85,
          transition: [
            `left 300ms ${DS.ease}`,
            `width 300ms ${DS.ease}`,
            `opacity 220ms ${DS.ease}`,
          ].join(", "),
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      {/* Glowing bottom line */}
      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: "2px",
          left: `${pos.left}px`,
          width: `${pos.width}px`,
          height: "2px",
          background: "linear-gradient(90deg, #4f8bff, #9b7fff)",
          borderRadius: "2px",
          opacity: pos.opacity,
          transition: [
            `left 300ms ${DS.ease}`,
            `width 300ms ${DS.ease}`,
            `opacity 220ms ${DS.ease}`,
          ].join(", "),
          pointerEvents: "none",
          zIndex: 1,
          animation: pos.opacity > 0 ? "__indicatorGlow 3s ease-in-out infinite" : "none",
        }}
      />
      {/* Wide diffuse glow */}
      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: "0px",
          left: `${pos.left - 12}px`,
          width: `${pos.width + 24}px`,
          height: "8px",
          background: "linear-gradient(90deg, rgba(79,139,255,0.5), rgba(155,127,255,0.5))",
          borderRadius: "4px",
          opacity: pos.opacity * 0.3,
          transition: [
            `left 300ms ${DS.ease}`,
            `width 300ms ${DS.ease}`,
            `opacity 220ms ${DS.ease}`,
          ].join(", "),
          filter: "blur(6px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
    </>
  );
}

/* ─────────────────────────────────────────────────────────────────
   NAV ITEM — with proximity glow
───────────────────────────────────────────────────────────────── */
function NavItem({ label, active, onClick, itemRef, animDelay }) {
  const [hov, setHov] = useState(false);

  return (
    <button
      ref={itemRef}
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      aria-current={active ? "page" : undefined}
      className="nav-lift"
      style={{
        position: "relative",
        zIndex: 2,
        padding: `${DS.sp(1)} ${DS.sp(1.75)}`,
        background: "none",
        border: "none",
        cursor: "pointer",
        fontFamily: DS.fontSans,
        fontSize: "13.5px",
        fontWeight: active ? 600 : 400,
      color: active ? "#000000" : hov ? "#000000" : "#111111",
        letterSpacing: active ? "-0.025em" : "-0.01em",
        lineHeight: 1,
        whiteSpace: "nowrap",
        transition: `color ${DS.ms} ${DS.ease}, font-weight ${DS.ms} ${DS.ease}`,
        outline: "none",
        animation: `__navStaggerIn 500ms ${DS.ease} ${animDelay}ms backwards`,
      }}
    >
      {/* Hover micro glow */}
      {hov && !active && (
        <span
          style={{
            position: "absolute",
            inset: "2px 4px",
            background: "radial-gradient(ellipse, rgba(79,139,255,0.08) 0%, transparent 70%)",
            borderRadius: "6px",
            pointerEvents: "none",
          }}
        />
      )}
      {label}
    </button>
  );
}

/* ─────────────────────────────────────────────────────────────────
   MORE TRIGGER
───────────────────────────────────────────────────────────────── */
function MoreTrigger({ open, onClick }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      aria-expanded={open}
      aria-haspopup="menu"
      style={{
        display: "flex",
        alignItems: "center",
        gap: "3px",
        padding: "7px 13px",
        background: open
          ? "linear-gradient(135deg, rgba(79,139,255,0.12) 0%, rgba(155,127,255,0.09) 100%)"
          : hov
          ? DS.glassHover
          : DS.glassSurf,
        border: `1px solid ${open ? "rgba(79,139,255,0.25)" : "rgba(0,0,0,0.04)"}`,
        borderRadius: "9px",
        cursor: "pointer",
        fontFamily: DS.fontSans,
        fontSize: "13px",
        fontWeight: 500,
        color: open ? "#2563eb" : hov ? "#000000" : "#111111",
        letterSpacing: "-0.01em",
        lineHeight: 1,
        transition: `all ${DS.ms} ${DS.ease}`,
        outline: "none",
        boxShadow: open ? "0 0 12px rgba(79,139,255,0.15), inset 0 1px 0 rgba(255,255,255,0.06)" : "none",
      }}
    >
      More
      <ChevronDown
        size={12}
        strokeWidth={2.5}
        style={{
          transform: open ? "rotate(180deg)" : "rotate(0deg)",
          transition: `transform ${DS.ms} ${DS.ease}`,
          opacity: 0.5,
          marginTop: "1px",
        }}
      />
    </button>
  );
}

/* ─────────────────────────────────────────────────────────────────
   COMMAND DROPDOWN
───────────────────────────────────────────────────────────────── */
function CommandMenu({ open, currentRoute, onSelect }) {
  useEffect(() => {
    if (!open) return;
    const fn = (e) => { if (e.key === "Escape") onSelect(null); };
    document.addEventListener("keydown", fn);
    return () => document.removeEventListener("keydown", fn);
  }, [open, onSelect]);

  if (!open) return null;

  return (
    <div
      role="menu"
      aria-label="More pages"
      style={{
        position: "absolute",
        top: "calc(100% + 12px)",
        right: 0,
        minWidth: "228px",
        background: "rgba(255,255,255,0.97)",
        backdropFilter: "blur(32px) saturate(1.6)",
        WebkitBackdropFilter: "blur(32px) saturate(1.6)",
        border: "1px solid rgba(0,0,0,0.08)",
        borderRadius: "15px",
        boxShadow: [
          "0 0 0 1px rgba(0,0,0,0.04) inset",
          "0 12px 40px rgba(0,0,0,0.12)",
          "0 4px 12px rgba(0,0,0,0.08)",
          "0 0 30px rgba(37,99,235,0.06)",
        ].join(", "),
        overflow: "hidden",
        animation: `__menuIn ${DS.ms} ${DS.ease}`,
        zIndex: 300,
      }}
    >
      {/* Top glow accent */}
      <div
        style={{
          position: "absolute",
          top: 0, left: 0, right: 0,
          height: "1px",
          background: "linear-gradient(90deg, transparent, rgba(79,139,255,0.5) 40%, rgba(155,127,255,0.5) 60%, transparent)",
        }}
      />

      <div
        style={{
          padding: "10px 16px 8px",
          fontFamily: DS.fontMono,
          fontSize: "9px",
          fontWeight: 500,
          color: "#8b92ae",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          borderBottom: "1px solid rgba(255,255,255,0.04)",
          background: "rgba(0,0,0,0.015)",
        }}
      >
        Pages
      </div>

      <div style={{ padding: "4px 0" }}>
        {SECONDARY.map(({ label, path, Icon }, i) => (
          <MenuRow
            key={path}
            label={label}
            Icon={Icon}
            active={currentRoute === path}
            onClick={() => onSelect(path)}
            delay={i * 35}
          />
        ))}
      </div>
    </div>
  );
}

function MenuRow({ label, Icon, active, onClick, delay }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      role="menuitem"
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        width: "100%",
        padding: "9px 16px",
        background: active
          ? "linear-gradient(90deg, rgba(79,139,255,0.1) 0%, rgba(155,127,255,0.06) 100%)"
          : hov
          ? "rgba(0,0,0,0.03)"
          : "transparent",
        border: "none",
        borderLeft: active ? "2px solid rgba(79,139,255,0.6)" : "2px solid transparent",
        cursor: "pointer",
        fontFamily: DS.fontSans,
        fontSize: "13px",
        fontWeight: active ? 700 : 500,
        color: active ? "#2563eb" : hov ? "#000000" : "#111111",
        textAlign: "left",
        letterSpacing: "-0.01em",
        lineHeight: 1,
        transition: `all ${DS.msFast} ${DS.ease}`,
        outline: "none",
        animation: `__itemStagger ${DS.msSlow} ${DS.easeOut} ${delay}ms backwards`,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "24px",
          height: "24px",
          background: active
            ? "rgba(79,139,255,0.15)"
            : hov
            ? "rgba(0,0,0,0.04)"
            : "rgba(0,0,0,0.03)",
          borderRadius: "6px",
          flexShrink: 0,
          border: active ? "1px solid rgba(79,139,255,0.25)" : "1px solid rgba(255,255,255,0.05)",
          transition: `all ${DS.msFast} ${DS.ease}`,
        }}
      >
        <Icon
          size={11}
          strokeWidth={1.75}
          style={{ color: active ? '#2563eb' : '#111111', opacity: 1 }}
        />
      </div>
      {label}
      {active && (
        <span
          style={{
            marginLeft: "auto",
            width: "5px",
            height: "5px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #4f8bff, #9b7fff)",
            boxShadow: "0 0 8px rgba(79,139,255,0.7)",
            flexShrink: 0,
          }}
        />
      )}
    </button>
  );
}

/* ─────────────────────────────────────────────────────────────────
   COMMAND PALETTE OVERLAY — premium OS mode
───────────────────────────────────────────────────────────────── */
function CommandPalette({ open, onClose, onNavigate }) {
  const [query, setQuery]     = useState("");
  const [selectedIdx, setIdx] = useState(0);
  const inputRef              = useRef(null);

  const filtered = query.trim()
    ? PALETTE_ITEMS.filter(i => i.label.toLowerCase().includes(query.toLowerCase()))
    : PALETTE_ITEMS;

  useEffect(() => { setIdx(0); }, [query]);
  useEffect(() => {
    if (open) {
      setQuery(""); setIdx(0);
      setTimeout(() => inputRef.current?.focus(), 60);
    }
  }, [open]);

  useEffect(() => {
    const fn = (e) => {
      if (!open) return;
      if (e.key === "Escape")     { onClose(); return; }
      if (e.key === "ArrowDown")  { e.preventDefault(); setIdx(i => Math.min(i + 1, filtered.length - 1)); }
      if (e.key === "ArrowUp")    { e.preventDefault(); setIdx(i => Math.max(i - 1, 0)); }
      if (e.key === "Enter" && filtered[selectedIdx]) { e.preventDefault(); handleAction(filtered[selectedIdx].action); }
    };
    document.addEventListener("keydown", fn);
    return () => document.removeEventListener("keydown", fn);
  }, [open, filtered, selectedIdx]);

  const handleAction = useCallback((action) => {
    onClose();
    if (action === "github")    { window.open("https://github.com", "_blank"); return; }
    if (action === "email")     { window.location.href = "mailto:bhagavan@example.com"; return; }
    if (action === "resume")    { onNavigate("/resume"); return; }
    if (action.startsWith("/")) { onNavigate(action); }
  }, [onClose, onNavigate]);

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.45)",
          backdropFilter: "blur(10px) saturate(0.7)",
          WebkitBackdropFilter: "blur(10px) saturate(0.7)",
          zIndex: 9990,
          animation: `__backdropIn ${DS.msFast} ${DS.ease}`,
        }}
      />

      {/* Spotlight radial behind dialog */}
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          top: "calc(18% - 80px)",
          left: "50%",
          transform: "translateX(-50%)",
          width: "min(700px, 92vw)",
          height: "250px",
          background: "radial-gradient(ellipse at center, rgba(37,99,235,0.12) 0%, rgba(155,127,255,0.09) 40%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 9990,
          filter: "blur(8px)",
          animation: "__glowBreath 3s ease-in-out infinite",
        }}
      />

      {/* Dialog */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        style={{
          position: "fixed",
          top: "18%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "min(572px, 92vw)",
          background: "rgba(255,255,255,0.97)",
          backdropFilter: "blur(40px) saturate(2)",
          WebkitBackdropFilter: "blur(40px) saturate(2)",
          border: "1px solid rgba(37,99,235,0.15)",
          borderRadius: "20px",
          boxShadow: [
            "0 0 0 1px rgba(0,0,0,0.04) inset",
            "0 24px 64px rgba(0,0,0,0.15)",
            "0 8px 24px rgba(0,0,0,0.08)",
            "0 0 40px rgba(37,99,235,0.06)",
            "0 0 120px rgba(155,127,255,0.05)",
          ].join(", "),
          overflow: "hidden",
          zIndex: 9991,
          animation: `__paletteIn ${DS.ms} ${DS.ease}`,
        }}
      >
        {/* Top gradient accent */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: 0, left: 0, right: 0,
            height: "2px",
            background: "linear-gradient(90deg, transparent 5%, #4f8bff 30%, #9b7fff 70%, transparent 95%)",
            opacity: 0.8,
          }}
        />
        {/* Grain */}
        <GrainOverlay />

        {/* Search */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "13px",
            padding: "20px 24px",
            borderBottom: "1px solid rgba(255,255,255,0.05)",
            background: "rgba(0,0,0,0.015)",
          }}
        >
          <Search size={15} strokeWidth={2} style={{ color: DS.accent, flexShrink: 0 }} />
          <input
            ref={inputRef}
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search pages, actions..."
            style={{
              flex: 1,
              border: "none",
              outline: "none",
              fontFamily: DS.fontSans,
              fontSize: "15px",
              fontWeight: 400,
              color: "#0a0c14",
              letterSpacing: "-0.02em",
              background: "transparent",
              lineHeight: 1,
              caretColor: DS.accent,
            }}
          />
          <kbd
            style={{
              fontFamily: DS.fontMono,
              fontSize: "10px",
              color: "#5a6280",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.09)",
              borderRadius: "5px",
              padding: "3px 8px",
              lineHeight: 1,
              letterSpacing: "0.02em",
            }}
          >
            ESC
          </kbd>
        </div>

        <div style={{ padding: "6px 0 4px" }}>
          <div
            style={{
              padding: "6px 24px 6px",
              fontFamily: DS.fontMono,
              fontSize: "9px",
              fontWeight: 500,
              color: DS.textGhost,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            {query ? `Results for "${query}"` : "Quick actions"}
          </div>

          {filtered.length === 0 && (
            <div
              style={{
                padding: "32px 24px",
                fontFamily: DS.fontSans,
                fontSize: "14px",
                color: "#5a6280",
                textAlign: "center",
              }}
            >
              No results found
            </div>
          )}

          {filtered.map((item, i) => (
            <PaletteRow
              key={item.action}
              item={item}
              selected={i === selectedIdx}
              onHover={() => setIdx(i)}
              onClick={() => handleAction(item.action)}
            />
          ))}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            padding: "10px 24px",
            borderTop: "1px solid rgba(255,255,255,0.04)",
            background: "rgba(0,0,0,0.015)",
          }}
        >
          {[["↑↓", "navigate"], ["↵", "select"], ["esc", "dismiss"]].map(([key, desc]) => (
            <div key={key} style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <kbd
                style={{
                  fontFamily: DS.fontMono,
                  fontSize: "10px",
                  color: DS.textSub,
                  background: "rgba(0,0,0,0.04)",
                  border: "1px solid rgba(255,255,255,0.09)",
                  borderRadius: "5px",
                  padding: "2px 6px",
                  lineHeight: 1.4,
                  boxShadow: "0 1px 2px rgba(0,0,0,0.3)",
                }}
              >
                {key}
              </kbd>
              <span style={{ fontFamily: DS.fontSans, fontSize: "11px", color: DS.textGhost, lineHeight: 1 }}>
                {desc}
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function PaletteRow({ item, selected, onHover, onClick }) {
  const { label, shortcut, Icon } = item;
  return (
    <button
      onClick={onClick}
      onMouseEnter={onHover}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        width: "100%",
        padding: "10px 24px",
        background: selected
          ? "linear-gradient(90deg, rgba(79,139,255,0.1) 0%, rgba(155,127,255,0.07) 100%)"
          : "transparent",
        border: "none",
        borderLeft: selected ? "2px solid rgba(79,139,255,0.7)" : "2px solid transparent",
        cursor: "pointer",
        fontFamily: DS.fontSans,
        fontSize: "13.5px",
        fontWeight: selected ? 600 : 400,
        color: selected ? "#2563eb" : "#333333",
        textAlign: "left",
        letterSpacing: "-0.01em",
        lineHeight: 1,
        transition: `all ${DS.msFast} ${DS.ease}`,
        outline: "none",
        position: "relative",
      }}
    >
      {selected && (
        <div
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            bottom: 0,
            width: "40%",
            background: "linear-gradient(90deg, transparent, rgba(155,127,255,0.04))",
            pointerEvents: "none",
          }}
        />
      )}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "28px",
          height: "28px",
          background: selected
            ? "linear-gradient(135deg, rgba(37,99,235,0.12) 0%, rgba(155,127,255,0.14) 100%)"
            : "rgba(0,0,0,0.03)",
          borderRadius: "7px",
          flexShrink: 0,
          border: selected ? "1px solid rgba(79,139,255,0.3)" : "1px solid rgba(255,255,255,0.06)",
          transition: `all ${DS.msFast} ${DS.ease}`,
          boxShadow: selected ? "0 0 12px rgba(79,139,255,0.2)" : "none",
        }}
      >
        <Icon
          size={12}
          strokeWidth={1.75}
          style={{ color: selected ? "#2563eb" : "#333333", opacity: selected ? 1 : 0.5 }}
        />
      </div>
      {label}
      <kbd
        style={{
          marginLeft: "auto",
          fontFamily: DS.fontMono,
          fontSize: "9.5px",
          color: selected ? "#2563eb" : "#111111",
          background: selected ? "rgba(79,139,255,0.1)" : "rgba(0,0,0,0.03)",
          border: `1px solid ${selected ? "rgba(79,139,255,0.25)" : "rgba(0,0,0,0.04)"}`,
          borderRadius: "4px",
          padding: "2px 6px",
          lineHeight: 1.4,
          flexShrink: 0,
          letterSpacing: "0.04em",
          transition: `all ${DS.msFast} ${DS.ease}`,
        }}
      >
        {shortcut}
      </kbd>
    </button>
  );
}

/* ─────────────────────────────────────────────────────────────────
   COMMAND PALETTE TRIGGER
───────────────────────────────────────────────────────────────── */
function PaletteTrigger({ onClick }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      aria-label="Open command palette (Ctrl+K)"
      title="Ctrl+K"
      style={{
        display: "flex",
        alignItems: "center",
        gap: "5px",
        padding: "7px 12px",
        background: hov
          ? "linear-gradient(135deg, rgba(79,139,255,0.1) 0%, rgba(155,127,255,0.08) 100%)"
          : DS.glassSurf,
        border: `1px solid ${hov ? "rgba(79,139,255,0.3)" : "rgba(255,255,255,0.07)"}`,
        borderRadius: "9px",
        cursor: "pointer",
        fontFamily: DS.fontMono,
        fontSize: "11px",
        fontWeight: 500,
        color: hov ? "#2563eb" : "#111111",
        letterSpacing: "0.02em",
        lineHeight: 1,
        transition: `all ${DS.msFast} ${DS.ease}`,
        outline: "none",
        boxShadow: hov ? "0 0 16px rgba(79,139,255,0.12), inset 0 1px 0 rgba(255,255,255,0.06)" : "none",
      }}
    >
      <Command size={11} strokeWidth={2} />
      K
    </button>
  );
}

/* ─────────────────────────────────────────────────────────────────
   RESUME BUTTON — flagship CTA with animated border
───────────────────────────────────────────────────────────────── */
function ResumeButton({ onClick }) {
  const [hov,   setHov]   = useState(false);
  const [press, setPress] = useState(false);

  return (
    <div style={{ position: "relative", display: "inline-flex" }}>
      {/* Animated border gradient wrapper */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: "-1px",
          borderRadius: "10px",
          background: "linear-gradient(135deg, #4f8bff, #9b7fff, #38d9f5, #4f8bff)",
          backgroundSize: "300% 300%",
          animation: "__borderSpin 4s linear infinite",
          opacity: hov ? 0.9 : 0.55,
          transition: `opacity ${DS.ms} ${DS.ease}`,
        }}
      />
      <button
        onClick={onClick}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => { setHov(false); setPress(false); }}
        onMouseDown={() => setPress(true)}
        onMouseUp={() => setPress(false)}
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          gap: "6px",
          padding: "8px 16px",
          background: press
            ? "rgba(13,17,28,0.98)"
            : hov
            ? "rgba(16,20,34,0.96)"
            : "rgba(12,16,26,0.96)",
          border: "none",
          borderRadius: "9px",
          cursor: "pointer",
          fontFamily: DS.fontSans,
          fontSize: "13px",
          fontWeight: 600,
          color: "#fff",
          letterSpacing: "-0.015em",
          lineHeight: 1,
          transform: press ? "scale(0.96)" : hov ? "scale(1.02)" : "scale(1)",
          boxShadow: press
            ? "none"
            : hov
            ? "0 0 24px rgba(79,139,255,0.4), 0 8px 24px rgba(79,139,255,0.2)"
            : "none",
          animation: !hov && !press ? "__ctaGlow 3s ease-in-out infinite" : "none",
          transition: [
            `transform ${DS.msFast} ${DS.spring}`,
            `box-shadow ${DS.ms} ${DS.ease}`,
            `background ${DS.msFast} ${DS.ease}`,
          ].join(", "),
          outline: "none",
          zIndex: 1,
          overflow: "hidden",
        }}
      >
        {/* Light sweep on hover */}
        {hov && (
          <div
            style={{
              position: "absolute",
              top: 0, bottom: 0,
              left: "-40px",
              width: "40px",
              background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)",
              transform: "skewX(-15deg)",
              animation: `__sweepLight 1.2s ${DS.ease} forwards`,
              pointerEvents: "none",
            }}
          />
        )}
        <FileText size={12} strokeWidth={2.5} style={{ flexShrink: 0 }} />
        <span style={{
          background: "linear-gradient(90deg, #ffffff, #c8daff)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}>
          Resume
        </span>
        <ArrowUpRight
          size={12}
          strokeWidth={2.5}
          style={{
            transform: hov ? "translate(2px, -2px)" : "translate(0,0)",
            transition: `transform ${DS.ms} ${DS.ease}`,
            opacity: 0.85,
          }}
        />
      </button>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   ANIMATED HAMBURGER
───────────────────────────────────────────────────────────────── */
function AnimatedMenuButton({ isOpen, onClick }) {
  const [press, setPress] = useState(false);
  return (
    <button
      onClick={(e) => { e.stopPropagation(); onClick(); }}
      onMouseDown={() => setPress(true)}
      onMouseUp={() => setPress(false)}
      onTouchStart={() => setPress(true)}
      onTouchEnd={() => setPress(false)}
      onMouseLeave={() => setPress(false)}
      aria-label={isOpen ? "Close navigation" : "Open navigation"}
      aria-expanded={isOpen}
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "44px",
        height: "44px",
        background: isOpen
          ? "linear-gradient(135deg, rgba(37,99,235,0.07) 0%, rgba(124,58,237,0.05) 100%)"
          : press
          ? DS.glassHover
          : DS.glassSurf,
        border: `1.5px solid ${isOpen ? "rgba(79,139,255,0.3)" : "rgba(255,255,255,0.08)"}`,
        borderRadius: "12px",
        cursor: "pointer",
        transform: press ? "scale(0.93)" : "scale(1)",
        transition: `all ${DS.msFast} ${DS.ease}`,
        outline: "none",
        WebkitTapHighlightColor: "transparent",
        touchAction: "manipulation",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        boxShadow: isOpen ? "0 0 16px rgba(79,139,255,0.15)" : "none",
      }}
    >
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <line x1="3" y1="5" x2="17" y2="5"
          stroke={isOpen ? DS.accentBright : DS.textSub} strokeWidth="1.75" strokeLinecap="round"
          style={{
            transformOrigin: "center",
            transform: isOpen ? "rotate(45deg) translateY(5px)" : "rotate(0deg) translateY(0)",
            transition: `transform ${DS.ms} ${DS.ease}, stroke ${DS.ms} ${DS.ease}`,
          }}
        />
        <line x1="3" y1="10" x2="17" y2="10"
          stroke={isOpen ? DS.accentBright : DS.textSub} strokeWidth="1.75" strokeLinecap="round"
          style={{
            opacity: isOpen ? 0 : 1,
            transform: isOpen ? "scaleX(0)" : "scaleX(1)",
            transition: `opacity ${DS.msFast} ${DS.ease}, transform ${DS.msFast} ${DS.ease}`,
          }}
        />
        <line x1="3" y1="15" x2="17" y2="15"
          stroke={isOpen ? DS.accentBright : DS.textSub} strokeWidth="1.75" strokeLinecap="round"
          style={{
            transformOrigin: "center",
            transform: isOpen ? "rotate(-45deg) translateY(-5px)" : "rotate(0deg) translateY(0)",
            transition: `transform ${DS.ms} ${DS.ease}, stroke ${DS.ms} ${DS.ease}`,
          }}
        />
      </svg>
    </button>
  );
}

/* ─────────────────────────────────────────────────────────────────
   MOBILE PANEL — cinematic drawer
───────────────────────────────────────────────────────────────── */
function MobilePanel({ open, currentRoute, onNavigate, onClose }) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
    } else {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const fn = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", fn);
    return () => document.removeEventListener("keydown", fn);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <>
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.35)",
          backdropFilter: "blur(6px) saturate(0.7)",
          WebkitBackdropFilter: "blur(6px) saturate(0.7)",
          zIndex: 9998,
          animation: `__backdropIn ${DS.ms} ${DS.ease}`,
        }}
      />

      {/* Right radial glow */}
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          top: "0",
          right: "0",
          width: "400px",
          height: "600px",
          background: "radial-gradient(ellipse at 90% 20%, rgba(79,139,255,0.12) 0%, transparent 60%)",
          pointerEvents: "none",
          zIndex: 9998,
        }}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        style={{
          position: "fixed",
          top: 0, right: 0, bottom: 0,
          width: "min(340px, 88vw)",
          background: "rgba(255,255,255,0.98)",
          backdropFilter: "blur(40px) saturate(1.6)",
          WebkitBackdropFilter: "blur(40px) saturate(1.6)",
          borderLeft: "1px solid rgba(0,0,0,0.08)",
          boxShadow: [
            "-12px 0 40px rgba(0,0,0,0.12)",
            "-4px 0 12px rgba(0,0,0,0.06)",
            "0 0 40px rgba(37,99,235,0.04)",
          ].join(", "),
          overflowY: "auto",
          zIndex: 9999,
          animation: `__panelIn ${DS.msSlow} ${DS.easeOut}`,
        }}
      >
        {/* Grain */}
        <GrainOverlay />
        {/* Top accent gradient */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: 0, left: 0, right: 0,
            height: "3px",
            background: "linear-gradient(90deg, #4f8bff, #9b7fff, #38d9f5)",
          }}
        />

        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "30px 24px 20px",
            borderBottom: "1px solid rgba(255,255,255,0.04)",
          }}
        >
          <div>
            <div
              style={{
                fontFamily: DS.fontDisplay,
                fontSize: "18px",
                fontWeight: 700,
                letterSpacing: "-0.04em",
                marginBottom: "4px",
                backgroundImage: "linear-gradient(135deg, #0a0c14 0%, #2563eb 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Navigation
            </div>
            <div
              style={{
                fontFamily: DS.fontMono,
                fontSize: "11px",
                fontWeight: 400,
                color: DS.textGhost,
                letterSpacing: "0.04em",
              }}
            >
              ./bhagavan
            </div>
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); onClose(); }}
            aria-label="Close menu"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "36px",
              height: "36px",
              background: DS.glassSurf,
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: "9px",
              cursor: "pointer",
              color: "#5a6280",
              outline: "none",
              WebkitTapHighlightColor: "transparent",
              touchAction: "manipulation",
              transition: `all ${DS.msFast} ${DS.ease}`,
            }}
          >
            <X size={13} strokeWidth={2.5} />
          </button>
        </div>

        {/* Badge */}
        <div style={{ padding: "18px 24px 0" }}>
          <AvailabilityBadge />
        </div>

        <div style={{ padding: "18px 18px" }}>
          <div style={{ marginBottom: "8px" }}>
            <div
              style={{
                fontFamily: DS.fontMono,
                fontSize: "9px",
                fontWeight: 500,
                letterSpacing: "0.12em",
                color: DS.textGhost,
                textTransform: "uppercase",
                padding: "0 8px 12px",
              }}
            >
              Main
            </div>
            {PRIMARY.map(({ label, path }, i) => (
              <PanelItem
                key={path}
                label={label}
                active={currentRoute === path}
                onClick={() => onNavigate(path)}
                delay={i * 40}
              />
            ))}
          </div>

          <div
            style={{
              height: "1px",
              background: "linear-gradient(90deg, transparent, rgba(79,139,255,0.15) 40%, rgba(79,139,255,0.15) 60%, transparent)",
              margin: "14px 8px 18px",
            }}
          />

          <div>
            <div
              style={{
                fontFamily: DS.fontMono,
                fontSize: "9px",
                fontWeight: 500,
                letterSpacing: "0.12em",
                color: DS.textGhost,
                textTransform: "uppercase",
                padding: "0 8px 12px",
              }}
            >
              More
            </div>
            {SECONDARY.map(({ label, path, Icon }, i) => (
              <PanelItem
                key={path}
                label={label}
                Icon={Icon}
                active={currentRoute === path}
                onClick={() => onNavigate(path)}
                delay={(PRIMARY.length + i) * 40}
              />
            ))}
          </div>

          {/* CTA */}
          <div
            style={{
              padding: "22px 8px 10px",
              position: "relative",
              animation: `__fadeSlideUp ${DS.msSlow} ${DS.easeOut} ${(PRIMARY.length + SECONDARY.length) * 40 + 80}ms backwards`,
            }}
          >
            {/* Glow behind CTA */}
            <div
              style={{
                position: "absolute",
                inset: "10px",
                background: "radial-gradient(ellipse, rgba(79,139,255,0.15) 0%, transparent 70%)",
                filter: "blur(16px)",
                pointerEvents: "none",
              }}
            />
            <button
              onClick={(e) => { e.stopPropagation(); onNavigate("/resume"); }}
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "9px",
                width: "100%",
                minHeight: "52px",
                background: "linear-gradient(135deg, rgba(79,139,255,0.9) 0%, rgba(155,127,255,0.9) 100%)",
                border: "1px solid rgba(79,139,255,0.5)",
                borderRadius: "13px",
                cursor: "pointer",
                fontFamily: DS.fontSans,
                fontSize: "14.5px",
                fontWeight: 600,
                color: "#fff",
                letterSpacing: "-0.02em",
                outline: "none",
                WebkitTapHighlightColor: "transparent",
                touchAction: "manipulation",
                boxShadow: [
                  "0 0 24px rgba(79,139,255,0.35)",
                  "0 8px 24px rgba(79,139,255,0.2)",
                  "inset 0 1px 0 rgba(255,255,255,0.2)",
                ].join(", "),
                animation: "__ctaGlow 3s ease-in-out infinite",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0, bottom: 0,
                  left: "-80px",
                  width: "80px",
                  background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)",
                  transform: "skewX(-15deg)",
                  animation: "__sweepLight 4s ease-in-out 1s infinite",
                  pointerEvents: "none",
                }}
              />
              <FileText size={16} strokeWidth={2.5} />
              View Resume
              <ArrowUpRight size={15} strokeWidth={2.5} style={{ opacity: 0.9 }} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

function PanelItem({ label, Icon, active, onClick, delay }) {
  const [press, setPress] = useState(false);
  return (
    <button
      onClick={(e) => { e.stopPropagation(); setPress(false); onClick(); }}
      onMouseDown={() => setPress(true)}
      onMouseUp={() => setPress(false)}
      onTouchStart={() => setPress(true)}
      onTouchEnd={() => setPress(false)}
      onMouseLeave={() => setPress(false)}
      aria-current={active ? "page" : undefined}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        width: "100%",
        minHeight: "50px",
        padding: "12px 10px",
        marginBottom: "2px",
        background: active
          ? "linear-gradient(90deg, rgba(79,139,255,0.1) 0%, rgba(155,127,255,0.07) 100%)"
          : press
          ? DS.glassHover
          : "transparent",
        border: active
          ? "1px solid rgba(37,99,235,0.12)"
          : "1px solid transparent",
        borderLeft: active
          ? "3px solid rgba(79,139,255,0.7)"
          : "3px solid transparent",
        borderRadius: "10px",
        cursor: "pointer",
        fontFamily: DS.fontSans,
        fontSize: "15px",
        fontWeight: active ? 700 : 500,
        color: active ? "#2563eb" : "#111111",
        textAlign: "left",
        letterSpacing: "-0.015em",
        lineHeight: 1.2,
        transition: `all ${DS.msFast} ${DS.ease}`,
        outline: "none",
        WebkitTapHighlightColor: "transparent",
        touchAction: "manipulation",
        animation: `__itemStagger ${DS.msSlow} ${DS.easeOut} ${delay}ms backwards`,
        boxShadow: active ? "0 0 16px rgba(79,139,255,0.08)" : "none",
      }}
    >
      {Icon ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "28px",
            height: "28px",
            background: active ? "rgba(37,99,235,0.07)" : "rgba(0,0,0,0.03)",
            borderRadius: "7px",
            flexShrink: 0,
            border: active ? "1px solid rgba(79,139,255,0.25)" : "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <Icon
            size={13}
            strokeWidth={1.75}
        style={{ color: selected ? '#2563eb' : '#333333', opacity: 1 }}
          />
        </div>
      ) : (
        <span style={{ width: "28px", flexShrink: 0 }} />
      )}
      {label}
      {active && (
        <span
          style={{
            marginLeft: "auto",
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #4f8bff, #9b7fff)",
            boxShadow: "0 0 8px rgba(79,139,255,0.7)",
            flexShrink: 0,
          }}
        />
      )}
    </button>
  );
}

/* ─────────────────────────────────────────────────────────────────
   ROOT NAVBAR
───────────────────────────────────────────────────────────────── */
export default function Navbar() {
  const location  = useLocation();
  const navigate  = useNavigate();

  const [scrolled,    setScrolled]    = useState(false);
  const [visible,     setVisible]     = useState(true);
  const [moreOpen,    setMoreOpen]    = useState(false);
  const [mobileOpen,  setMobileOpen]  = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [sweepTick,   setSweepTick]   = useState(0);

  const prevY           = useRef(0);
  const rafId           = useRef(null);
  const moreRef         = useRef(null);
  const navContainerRef = useRef(null);
  const itemRefs        = useRef([]);

  const isMobile       = useMQ("(max-width: 1023px)");
  const isTiny         = useMQ("(max-width: 599px)");
  const scrollProgress = useScrollProgress();
  const activeSection  = useScrollSpy(PRIMARY);
  const cursorX        = useCursorX();

  const route       = location.pathname === "/" ? "/home" : location.pathname;
  const spyPath     = activeSection ? PRIMARY.find(p => p.sectionId === activeSection)?.path : null;
  const activePath  = spyPath ?? route;
  const activeIndex = PRIMARY.findIndex(p => p.path === activePath);

  /* ── Periodic light sweep ── */
  useEffect(() => {
    const t = setInterval(() => setSweepTick(n => n + 1), 12000);
    return () => clearInterval(t);
  }, []);

  /* ── Scroll behavior ── */
  useEffect(() => {
    const onScroll = () => {
      if (rafId.current) return;
      rafId.current = requestAnimationFrame(() => {
        const y = window.scrollY;
        setScrolled(y > 24);
        if (isMobile) {
          if      (y < 8)                                setVisible(true);
          else if (y < prevY.current - 2)               setVisible(true);
          else if (y > prevY.current + 2 && y > 60)     setVisible(false);
        } else {
          setVisible(true);
        }
        prevY.current = y;
        rafId.current = null;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [isMobile]);

  /* ── Keyboard shortcuts ── */
  useEffect(() => {
    const fn = (e) => {
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || e.key === "/") {
        e.preventDefault();
        setPaletteOpen(p => !p);
      }
    };
    document.addEventListener("keydown", fn);
    return () => document.removeEventListener("keydown", fn);
  }, []);

  /* ── Outside click for More ── */
  useEffect(() => {
    if (!moreOpen) return;
    const fn = (e) => {
      if (moreRef.current && !moreRef.current.contains(e.target)) setMoreOpen(false);
    };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, [moreOpen]);

  /* ── Close on route change ── */
  useEffect(() => {
    setMoreOpen(false);
    setMobileOpen(false);
  }, [location.pathname]);

  const go = useCallback((path) => {
    if (!path) { setMobileOpen(false); return; }
    setMobileOpen(false);
    setMoreOpen(false);
    setPaletteOpen(false);
    navigate(path);
    setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 100);
  }, [navigate]);

  /* ── Layout values ── */
  const navH   = scrolled ? (isTiny ? "58px" : "64px") : (isTiny ? "66px" : "74px");
  const bg     = scrolled ? "rgba(255,255,255,0.96)" : "rgba(255,255,255,0.82)";
  const blur   = scrolled ? "blur(28px) saturate(1.8)" : "blur(16px) saturate(1.4)";
  const border = scrolled ? "rgba(0,0,0,0.08)" : "rgba(0,0,0,0.05)";
  const shadow = scrolled
    ? [
        "0 1px 0 rgba(37,99,235,0.06)",
        "0 8px 32px rgba(0,0,0,0.08)",
        "0 2px 6px rgba(0,0,0,0.05)",
        "0 0 40px rgba(37,99,235,0.04)",
      ].join(", ")
    : "none";
  const padX   = isTiny ? "18px" : "44px";

  return (
    <>
      <style>{GLOBAL}</style>

      <nav
        role="navigation"
        aria-label="Main navigation"
        style={{
          position: "fixed",
          inset: "0 0 auto 0",
          height: navH,
          background: bg,
          backdropFilter: blur,
          WebkitBackdropFilter: blur,
          borderBottom: `1px solid ${border}`,
          boxShadow: shadow,
          transform: visible ? "translateY(0)" : "translateY(-100%)",
          transition: [
            `height ${DS.ms} ${DS.ease}`,
            `background ${DS.msSlow} ${DS.ease}`,
            `border-color ${DS.msSlow} ${DS.ease}`,
            `box-shadow ${DS.msSlow} ${DS.ease}`,
            `transform ${DS.ms} ${DS.ease}`,
            `backdrop-filter ${DS.msSlow} ${DS.ease}`,
          ].join(", "),
          zIndex: 8000,
          isolation: "isolate",
          overflow: "visible",
        }}
      >
        {/* Grain texture */}
        <GrainOverlay />

        {/* Animated gradient mesh */}
        <GradientMesh cursorX={cursorX} />

        {/* Periodic light sweep */}
        <LightSweep trigger={sweepTick} />

        {/* Inner top highlight line */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: 0, left: 0, right: 0,
            height: "1px",
            background: `linear-gradient(90deg, transparent 0%, rgba(37,99,235,${scrolled ? "0.30" : "0.15"}) 30%, rgba(155,127,255,${scrolled ? "0.35" : "0.2"}) 70%, transparent 100%)`,
            transition: `all ${DS.ms} ${DS.ease}`,
            pointerEvents: "none",
            zIndex: 3,
          }}
        />

        {/* Scroll progress */}
        <ScrollProgressBar progress={scrollProgress} visible={scrolled} />

        <div
          style={{
            maxWidth: "1280px",
            height: "100%",
            margin: "0 auto",
            padding: `0 ${padX}`,
            display: "flex",
            alignItems: "center",
            position: "relative",
            zIndex: 4,
          }}
        >
          {/* Left — Logo + Badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "14px",
              flexShrink: 0,
            }}
          >
            <Logo onClick={() => go("/home")} />
            {!isMobile && !isTiny && <AvailabilityBadge />}
          </div>

          {/* Center — Absolutely positioned primary nav */}
          {!isMobile && (
            <div
              ref={navContainerRef}
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
                display: "flex",
                alignItems: "center",
              }}
            >
              <SlidingIndicator
                containerRef={navContainerRef}
                activeIndex={activeIndex}
                itemRefs={itemRefs}
              />
              {PRIMARY.map(({ label, path }, i) => (
                <NavItem
                  key={path}
                  label={label}
                  active={activePath === path}
                  onClick={() => go(path)}
                  itemRef={el => { itemRefs.current[i] = el; }}
                  animDelay={200 + i * 60}
                />
              ))}
            </div>
          )}

          {/* Right — Controls */}
          <div
            style={{
              marginLeft: "auto",
              display: "flex",
              alignItems: "center",
              gap: "7px",
              flexShrink: 0,
            }}
          >
            {!isMobile && (
              <>
                <PaletteTrigger onClick={() => setPaletteOpen(true)} />

                <div ref={moreRef} style={{ position: "relative" }}>
                  <MoreTrigger open={moreOpen} onClick={() => setMoreOpen(p => !p)} />
                  <CommandMenu
                    open={moreOpen}
                    currentRoute={route}
                    onSelect={(p) => { setMoreOpen(false); if (p) go(p); }}
                  />
                </div>

                {/* Divider */}
                <span
                  aria-hidden="true"
                  style={{
                    display: "inline-block",
                    width: "1px",
                    height: "18px",
                    background: "linear-gradient(180deg, transparent, rgba(79,139,255,0.25), transparent)",
                    margin: "0 5px",
                  }}
                />

                <ResumeButton onClick={() => go("/resume")} />
              </>
            )}

            {isMobile && (
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <AvailabilityBadge />
                <AnimatedMenuButton
                  isOpen={mobileOpen}
                  onClick={() => setMobileOpen(prev => !prev)}
                />
              </div>
            )}
          </div>
        </div>
      </nav>

      {isMobile && (
        <MobilePanel
          open={mobileOpen}
          currentRoute={route}
          onNavigate={go}
          onClose={() => setMobileOpen(false)}
        />
      )}

      <CommandPalette
        open={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        onNavigate={go}
      />
    </>
  );
}