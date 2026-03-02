"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ChevronDown, FileText, GraduationCap, Trophy, Shield,
  Award, ArrowUpRight, Github, Mail, Command, Search, X, Zap,
} from "lucide-react";

/* ═══════════════════════════════════════════════════════════════════
   DESIGN SYSTEM — Black & White Edition
═══════════════════════════════════════════════════════════════════ */
const DS = {
  // Backgrounds — dark
  bg:           "#0a0a0a",
  bgMid:        "#111111",
  bgSurf:       "#1a1a1a",
  bgCard:       "#0a0a0a",

  // Text — white
  textPrimary:  "#ffffff",
  textSub:      "#e8e8e8",
  textMuted:    "#aaaaaa",
  textGhost:    "#666666",

  // Accent system — light on dark
  accent:       "#ffffff",
  accentBright: "#cccccc",
  accentViolet: "#aaaaaa",
  accentCyan:   "#888888",
  accentGreen:  "#cccccc",

  // Gradients — white/grey on black
  gradAccent:   "linear-gradient(135deg, #ffffff 0%, #aaaaaa 100%)",
  gradAccentH:  "linear-gradient(135deg, #cccccc 0%, #888888 100%)",
  gradText:     "linear-gradient(135deg, #ffffff 0%, #cccccc 60%, #888888 100%)",
  gradBorder:   "linear-gradient(90deg, #aaaaaa, #ffffff, #cccccc, #aaaaaa)",
  gradProgress: "linear-gradient(90deg, #aaaaaa, #ffffff, #cccccc, #aaaaaa)",

  // Glass — dark
  glassBg:      "rgba(10,10,10,0.88)",
  glassBgScroll:"rgba(10,10,10,0.97)",
  glassBorder:  "rgba(255,255,255,0.10)",
  glassBorderL: "rgba(255,255,255,0.06)",
  glassSurf:    "rgba(255,255,255,0.06)",
  glassHover:   "rgba(255,255,255,0.10)",
  glassDark:    "rgba(10,10,10,0.97)",

  // Typography — Dancing Script for all text
  fontDisplay:  "'Dancing Script', cursive",
  fontSans:     "'Dancing Script', cursive",
  fontMono:     "'Dancing Script', cursive",

  // Easings
  ease:         "cubic-bezier(0.16, 1, 0.3, 1)",
  easeOut:      "cubic-bezier(0.33, 1, 0.68, 1)",
  easeIn:       "cubic-bezier(0.55, 0, 1, 0.45)",
  spring:       "cubic-bezier(0.34, 1.56, 0.64, 1)",
  linear:       "linear",

  // Durations
  ms:           "220ms",
  msFast:       "140ms",
  msSlow:       "360ms",
  msXSlow:      "500ms",

  // Spacing helper
  sp: (n) => `${n * 8}px`,
};

/* ═══════════════════════════════════════════════════════════════════
   NAV DATA
═══════════════════════════════════════════════════════════════════ */
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

/* ═══════════════════════════════════════════════════════════════════
   GLOBAL KEYFRAMES + FONT IMPORT (Dancing Script)
═══════════════════════════════════════════════════════════════════ */
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;500;600;700&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  @keyframes __menuIn {
    from { opacity: 0; transform: translateY(-10px) scale(0.96); filter: blur(4px); }
    to   { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
  }
  @keyframes __menuOut {
    from { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
    to   { opacity: 0; transform: translateY(-6px) scale(0.97); filter: blur(3px); }
  }
  @keyframes __panelIn {
    from { transform: translateX(100%); opacity: 0.8; }
    to   { transform: translateX(0);    opacity: 1; }
  }
  @keyframes __backdropIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes __itemStagger {
    from { opacity: 0; transform: translateX(20px) scale(0.95); filter: blur(3px); }
    to   { opacity: 1; transform: translateX(0)    scale(1);    filter: blur(0); }
  }
  @keyframes __paletteIn {
    from { opacity: 0; transform: translateY(-18px) scale(0.94); filter: blur(8px); }
    to   { opacity: 1; transform: translateY(0)     scale(1);    filter: blur(0); }
  }
  @keyframes __pulseRing {
    0%   { transform: scale(1);   opacity: 0.65; }
    70%  { transform: scale(2.8); opacity: 0; }
    100% { transform: scale(2.8); opacity: 0; }
  }
  @keyframes __shimmer {
    0%   { background-position: -200% center; }
    100% { background-position:  200% center; }
  }
  @keyframes __shimmerSlow {
    0%   { background-position: -400% center; }
    100% { background-position:  400% center; }
  }
  @keyframes __ambientFlow {
    0%,100% { opacity: 0.3;  transform: translateX(0)   scale(1);    }
    50%      { opacity: 0.55; transform: translateX(8px) scale(1.08); }
  }
  @keyframes __glowBreath {
    0%,100% { opacity: 0.55; transform: scale(1);    }
    50%      { opacity: 1;    transform: scale(1.06); }
  }
  @keyframes __logoBlurIn {
    from { opacity: 0; filter: blur(14px); transform: translateY(5px); }
    to   { opacity: 1; filter: blur(0);    transform: translateY(0); }
  }
  @keyframes __navStaggerIn {
    from { opacity: 0; transform: translateY(-8px); filter: blur(5px); }
    to   { opacity: 1; transform: translateY(0);    filter: blur(0); }
  }
  @keyframes __indicatorGlow {
    0%,100% { box-shadow: 0 0 8px rgba(0,0,0,0.35), 0 0 20px rgba(0,0,0,0.18); }
    50%      { box-shadow: 0 0 18px rgba(0,0,0,0.6), 0 0 36px rgba(0,0,0,0.35); }
  }
  @keyframes __borderSpin {
    from { background-position: 0%   50%; }
    to   { background-position: 200% 50%; }
  }
  @keyframes __sweepLight {
    0%   { left: -60%;  opacity: 0; }
    8%   { opacity: 1; }
    50%  { opacity: 0.7; }
    100% { left: 120%;  opacity: 0; }
  }
  @keyframes __fadeSlideUp {
    from { opacity: 0; transform: translateY(14px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes __meshMove {
    0%,100% { transform: translate(0,0)     rotate(0deg); }
    33%      { transform: translate(12px,-9px) rotate(0.6deg); }
    66%      { transform: translate(-7px,7px)  rotate(-0.4deg); }
  }
  @keyframes __ctaGlow {
    0%,100% {
      box-shadow: 0 0 14px rgba(0,0,0,0.22),
                  0 4px 18px rgba(0,0,0,0.14),
                  inset 0 1px 0 rgba(255,255,255,0.10);
    }
    50% {
      box-shadow: 0 0 28px rgba(0,0,0,0.38),
                  0 4px 32px rgba(0,0,0,0.28),
                  inset 0 1px 0 rgba(255,255,255,0.18);
    }
  }
  @keyframes __grainFloat {
    0%   { transform: translate(0,0); }
    25%  { transform: translate(-2px, 1px); }
    50%  { transform: translate(1px, -2px); }
    75%  { transform: translate(2px,  1px); }
    100% { transform: translate(0,0); }
  }
  @keyframes __sparkPulse {
    0%,100% { box-shadow: 0 0 10px 3px rgba(80,80,80,0.75), 0 0 22px 7px rgba(0,0,0,0.38); }
    50%      { box-shadow: 0 0 18px 6px rgba(80,80,80,1),    0 0 38px 12px rgba(0,0,0,0.55); }
  }
  @keyframes __indicatorPulse {
    0%   { transform: scaleX(1); }
    45%  { transform: scaleX(1.09); }
    100% { transform: scaleX(1); }
  }

  .nlift { transition: transform 200ms cubic-bezier(0.34,1.56,0.64,1); }
  .nlift:hover { transform: translateY(-2px); }

  ::-webkit-scrollbar { width: 3px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.22); border-radius: 4px; }
  :focus-visible { outline: 2px solid #ffffff; outline-offset: 2px; border-radius: 4px; }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      transition-duration: 0.01ms !important;
    }
  }
`;

/* ═══════════════════════════════════════════════════════════════════
   HOOKS
═══════════════════════════════════════════════════════════════════ */
function useMQ(query) {
  const [m, setM] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia(query).matches;
  });
  useEffect(() => {
    const mq = window.matchMedia(query);
    setM(mq.matches);
    const cb = (e) => setM(e.matches);
    mq.addEventListener("change", cb);
    return () => mq.removeEventListener("change", cb);
  }, [query]);
  return m;
}

function useScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const fn = () => {
      const d = document.documentElement;
      const h = d.scrollHeight - d.clientHeight;
      setP(h > 0 ? (window.scrollY / h) * 100 : 0);
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return p;
}

function useScrollSpy(items) {
  const [active, setActive] = useState(null);
  useEffect(() => {
    const ids = items.map((i) => i.sectionId).filter(Boolean);
    if (!ids.length) return;
    const fn = () => {
      const thr = window.innerHeight * 0.4;
      let best = null, bestTop = -Infinity;
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        const { top } = el.getBoundingClientRect();
        if (top <= thr && top > bestTop) { bestTop = top; best = id; }
      }
      setActive(best);
    };
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
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

/* ═══════════════════════════════════════════════════════════════════
   GRAIN OVERLAY
═══════════════════════════════════════════════════════════════════ */
const GRAIN_SVG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`;

function GrainOverlay() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        borderRadius: "inherit",
        backgroundImage: GRAIN_SVG,
        backgroundSize: "160px 160px",
        backgroundRepeat: "repeat",
        opacity: 0.014,
        mixBlendMode: "overlay",
        pointerEvents: "none",
        animation: "__grainFloat 7s steps(4) infinite",
        zIndex: 1,
      }}
    />
  );
}

/* ═══════════════════════════════════════════════════════════════════
   SCROLL PROGRESS BAR
═══════════════════════════════════════════════════════════════════ */
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
        background: "rgba(0,0,0,0.04)",
        overflow: "visible",
        opacity: visible && progress > 1 ? 1 : 0,
        transition: `opacity ${DS.ms} ${DS.ease}`,
        zIndex: 10,
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          height: "100%",
          width: `${progress}%`,
          background: `${DS.gradProgress}`,
          backgroundSize: "300% auto",
          borderRadius: "0 2px 2px 0",
          transition: "width 80ms linear",
          animation: "__shimmer 2.4s linear infinite",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            right: "-3px",
            top: "50%",
            transform: "translateY(-50%)",
            width: "9px",
            height: "9px",
            borderRadius: "50%",
            background: "#555555",
            animation: "__sparkPulse 1.8s ease-in-out infinite",
            filter: "blur(0.5px)",
          }}
        />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   GRADIENT MESH — cursor-reactive ambient orbs (greyscale)
═══════════════════════════════════════════════════════════════════ */
function GradientMesh({ cursorX }) {
  const shift = (cursorX - 0.5) * 28;
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
      <div
        style={{
          position: "absolute",
          top: "-50px",
          left: `calc(12% + ${shift * 0.35}px)`,
          width: "340px",
          height: "130px",
          background: "radial-gradient(ellipse, rgba(0,0,0,0.05) 0%, transparent 72%)",
          filter: "blur(22px)",
          transition: `left 700ms ${DS.ease}`,
          animation: "__ambientFlow 9s ease-in-out infinite",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "-35px",
          right: `calc(10% - ${shift * 0.22}px)`,
          width: "260px",
          height: "100px",
          background: "radial-gradient(ellipse, rgba(0,0,0,0.04) 0%, transparent 72%)",
          filter: "blur(20px)",
          transition: `right 700ms ${DS.ease}`,
          animation: "__ambientFlow 13s ease-in-out infinite reverse",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "-22px",
          left: "50%",
          transform: `translateX(calc(-50% + ${shift * 0.18}px))`,
          width: "460px",
          height: "90px",
          background: "radial-gradient(ellipse, rgba(0,0,0,0.03) 0%, transparent 72%)",
          filter: "blur(28px)",
          transition: `transform 550ms ${DS.ease}`,
          animation: "__meshMove 16s ease-in-out infinite",
        }}
      />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   LIGHT SWEEP
═══════════════════════════════════════════════════════════════════ */
function LightSweep({ trigger }) {
  const [on, setOn] = useState(false);
  useEffect(() => {
    if (!trigger) return;
    setOn(true);
    const t = setTimeout(() => setOn(false), 1600);
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
          width: "70px",
          background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.055) 50%, transparent 100%)",
          transform: "skewX(-14deg)",
          animation: on ? `__sweepLight 1.6s ${DS.ease} forwards` : "none",
          opacity: on ? 1 : 0,
          left: "-60%",
        }}
      />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   AVAILABILITY BADGE
═══════════════════════════════════════════════════════════════════ */
function AvailabilityBadge() {
  const [tip, setTip] = useState(false);
  return (
    <div
      style={{ position: "relative", display: "inline-flex", alignItems: "center" }}
      onMouseEnter={() => setTip(true)}
      onMouseLeave={() => setTip(false)}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "7px",
          padding: "5px 12px 5px 8px",
          background: "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.10) 100%)",
          border: "1px solid rgba(255,255,255,0.18)",
          borderRadius: "20px",
          cursor: "default",
          userSelect: "none",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          boxShadow: "0 0 12px rgba(255,255,255,0.04), inset 0 1px 0 rgba(255,255,255,0.1)",
        }}
      >
        <div style={{ position: "relative", width: "8px", height: "8px", flexShrink: 0 }}>
          <div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "50%",
              background: "#ffffff",
              animation: "__pulseRing 2.4s ease-out infinite",
            }}
          />
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              background: "#ffffff",
              boxShadow: "0 0 9px rgba(255,255,255,0.6)",
              zIndex: 1,
            }}
          />
        </div>
        <span
          style={{
            fontFamily: DS.fontSans,
            fontSize: "13px",
            fontWeight: 700,
            color: "#ffffff",
            letterSpacing: "-0.015em",
            lineHeight: 1,
          }}
        >
          Available
        </span>
      </div>

      {tip && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 11px)",
            left: "50%",
            transform: "translateX(-50%)",
            whiteSpace: "nowrap",
            background: DS.glassDark,
            color: "#cccccc",
            fontFamily: DS.fontSans,
            fontSize: "13px",
            fontWeight: 400,
            letterSpacing: "-0.01em",
            lineHeight: 1.5,
            padding: "8px 14px",
            borderRadius: "10px",
            border: "1px solid rgba(255,255,255,0.18)",
            boxShadow: "0 12px 40px rgba(0,0,0,0.35), 0 2px 8px rgba(0,0,0,0.25)",
            pointerEvents: "none",
            animation: `__menuIn ${DS.msFast} ${DS.ease}`,
            zIndex: 9999,
          }}
        >
          <span style={{ color: "#ffffff", fontWeight: 700 }}>Open to full-time roles</span>
          {"  ·  "}
          <span style={{ color: "#888888" }}>2026 Graduate</span>
          <div
            style={{
              position: "absolute",
              top: "-5px",
              left: "50%",
              transform: "translateX(-50%) rotate(45deg)",
              width: "9px",
              height: "9px",
              background: DS.glassDark,
              border: "1px solid rgba(255,255,255,0.18)",
              borderBottom: "none",
              borderRight: "none",
              borderRadius: "1px",
            }}
          />
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   LOGO
═══════════════════════════════════════════════════════════════════ */
function Logo({ onClick }) {
  const [hov, setHov] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    setTilt({
      x: ((e.clientY - r.top  - r.height / 2) / r.height) * -5,
      y: ((e.clientX - r.left - r.width  / 2) / r.width ) *  5,
    });
  };

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => { setHov(false); setTilt({ x: 0, y: 0 }); }}
      onMouseMove={onMove}
      aria-label="Go to home"
      style={{
        background: "none",
        border: "none",
        cursor: "pointer",
        padding: "2px",
        display: "flex",
        alignItems: "baseline",
        gap: "3px",
        lineHeight: 1,
        outline: "none",
        animation: `__logoBlurIn 650ms ${DS.ease} 80ms backwards`,
        transform: `perspective(420px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(${hov ? -1.5 : 0}px)`,
        transition: `transform 180ms ${DS.ease}`,
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: "-10px -20px",
          background: hov
            ? "radial-gradient(ellipse, rgba(0,0,0,0.08) 0%, transparent 68%)"
            : "radial-gradient(ellipse, rgba(0,0,0,0.02) 0%, transparent 68%)",
          borderRadius: "24px",
          transition: `opacity ${DS.ms} ${DS.ease}`,
          pointerEvents: "none",
          animation: "__glowBreath 5s ease-in-out infinite",
        }}
      />
      <span
        style={{
          fontFamily: DS.fontMono,
          fontSize: "14px",
          fontWeight: 700,
          color: "#0a0a0a",
          letterSpacing: "0.02em",
          userSelect: "none",
          opacity: 0.85,
          position: "relative",
          transition: `color ${DS.ms} ${DS.ease}`,
        }}
      >
        ./
      </span>
      <span
        style={{
          fontFamily: DS.fontDisplay,
          fontSize: "18px",
          fontWeight: 700,
          letterSpacing: "-0.02em",
          userSelect: "none",
          position: "relative",
          ...(hov
            ? {
                backgroundImage: "linear-gradient(135deg, #0a0a0a 0%, #444444 45%, #888888 100%)",
                backgroundSize: "200% auto",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                color: "transparent",
                animation: "__shimmerSlow 3.5s linear infinite",
              }
            : {
                color: DS.textPrimary,
                backgroundImage: "none",
                WebkitTextFillColor: DS.textPrimary,
              }),
          transition: `letter-spacing ${DS.ms} ${DS.ease}`,
        }}
      >
        G S S S BHAGAVAN
      </span>
    </button>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   SLIDING INDICATOR — black/white
═══════════════════════════════════════════════════════════════════ */
function SlidingIndicator({ containerRef, activeIndex, itemRefs }) {
  const [pos, setPos] = useState({ opacity: 0, left: 0, width: 0 });
  const prevIndex = useRef(activeIndex);

  useEffect(() => {
    const aRef = itemRefs.current[activeIndex];
    const cEl  = containerRef.current;
    if (!aRef || !cEl || activeIndex < 0) {
      setPos((p) => ({ ...p, opacity: 0 }));
      return;
    }
    const cr = cEl.getBoundingClientRect();
    const ir = aRef.getBoundingClientRect();
    const HP = 15;
    setPos({ opacity: 1, left: ir.left - cr.left + HP, width: ir.width - HP * 2 });
    prevIndex.current = activeIndex;
  }, [activeIndex, itemRefs, containerRef]);

  const T = `${DS.ease} 310ms`;

  return (
    <>
      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "5px",
          bottom: "5px",
          left: `${pos.left - 17}px`,
          width: `${pos.width + 34}px`,
          background: "linear-gradient(135deg, rgba(0,0,0,0.06) 0%, rgba(0,0,0,0.04) 100%)",
          border: "1px solid rgba(0,0,0,0.10)",
          borderRadius: "9px",
          opacity: pos.opacity * 0.9,
          transition: [`left ${T}`, `width ${T}`, `opacity 200ms ${DS.ease}`].join(", "),
          pointerEvents: "none",
          zIndex: 0,
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06)",
        }}
      />
      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: "2px",
          left: `${pos.left}px`,
          width: `${pos.width}px`,
          height: "2px",
          background: "linear-gradient(90deg, #1a1a1a 0%, #555555 100%)",
          borderRadius: "2px",
          opacity: pos.opacity,
          transition: [`left ${T}`, `width ${T}`, `opacity 200ms ${DS.ease}`].join(", "),
          pointerEvents: "none",
          zIndex: 1,
          animation: pos.opacity > 0 ? "__indicatorGlow 3.2s ease-in-out infinite" : "none",
        }}
      />
      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: "-1px",
          left: `${pos.left - 14}px`,
          width: `${pos.width + 28}px`,
          height: "10px",
          background: "linear-gradient(90deg, rgba(0,0,0,0.3), rgba(80,80,80,0.3))",
          borderRadius: "5px",
          opacity: pos.opacity * 0.28,
          transition: [`left ${T}`, `width ${T}`, `opacity 200ms ${DS.ease}`].join(", "),
          filter: "blur(7px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   NAV ITEM
═══════════════════════════════════════════════════════════════════ */
function NavItem({ label, active, onClick, itemRef, animDelay }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      ref={itemRef}
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      aria-current={active ? "page" : undefined}
      className="nlift"
      style={{
        position: "relative",
        zIndex: 2,
        padding: "8px 15px",
        background: "none",
        border: "none",
        cursor: "pointer",
        fontFamily: DS.fontSans,
        fontSize: "16px",
        fontWeight: active ? 700 : 400,
        color: active ? DS.textPrimary : hov ? DS.textPrimary : DS.textMuted,
        letterSpacing: active ? "-0.01em" : hov ? "-0.005em" : "0em",
        lineHeight: 1,
        whiteSpace: "nowrap",
        transition: [
          `color ${DS.ms} ${DS.ease}`,
          `letter-spacing ${DS.ms} ${DS.ease}`,
          `font-weight ${DS.ms} ${DS.ease}`,
        ].join(", "),
        outline: "none",
        animation: `__navStaggerIn 520ms ${DS.ease} ${animDelay}ms backwards`,
      }}
    >
      {hov && !active && (
        <span
          style={{
            position: "absolute",
            inset: "2px 5px",
            background: "radial-gradient(ellipse, rgba(0,0,0,0.04) 0%, transparent 72%)",
            borderRadius: "7px",
            pointerEvents: "none",
          }}
        />
      )}
      {label}
    </button>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   MORE TRIGGER
═══════════════════════════════════════════════════════════════════ */
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
        gap: "4px",
        padding: "7px 13px",
        background: open
          ? "linear-gradient(135deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.06) 100%)"
          : hov ? DS.glassHover : DS.glassSurf,
        border: `1px solid ${open ? "rgba(255,255,255,0.22)" : "rgba(255,255,255,0.08)"}`,
        borderRadius: "9px",
        cursor: "pointer",
        fontFamily: DS.fontSans,
        fontSize: "15px",
        fontWeight: 600,
        color: open ? DS.textPrimary : hov ? DS.textPrimary : DS.textMuted,
        letterSpacing: "-0.015em",
        lineHeight: 1,
        transition: `all ${DS.ms} ${DS.ease}`,
        outline: "none",
        boxShadow: open
          ? "0 0 14px rgba(255,255,255,0.06), inset 0 1px 0 rgba(255,255,255,0.06)"
          : "inset 0 1px 0 rgba(255,255,255,0.05)",
      }}
    >
      More
      <ChevronDown
        size={12}
        strokeWidth={2.5}
        style={{
          transform: open ? "rotate(180deg)" : "rotate(0deg)",
          transition: `transform ${DS.ms} ${DS.spring}`,
          opacity: 0.5,
          marginTop: "1px",
          color: "currentColor",
        }}
      />
    </button>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   COMMAND DROPDOWN MENU
═══════════════════════════════════════════════════════════════════ */
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
        top: "calc(100% + 13px)",
        right: 0,
        minWidth: "236px",
        background: "rgba(10,10,10,0.98)",
        backdropFilter: "blur(36px) saturate(1.8)",
        WebkitBackdropFilter: "blur(36px) saturate(1.8)",
        border: "1px solid rgba(255,255,255,0.10)",
        borderRadius: "16px",
        boxShadow: [
          "0 0 0 1px rgba(255,255,255,0.03) inset",
          "0 14px 48px rgba(0,0,0,0.55)",
          "0 4px 14px rgba(0,0,0,0.35)",
        ].join(", "),
        overflow: "hidden",
        animation: `__menuIn ${DS.ms} ${DS.ease}`,
        zIndex: 300,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0, left: 0, right: 0,
          height: "1px",
          background: "linear-gradient(90deg, transparent, rgba(0,0,0,0.4) 35%, rgba(80,80,80,0.45) 65%, transparent)",
        }}
      />
      <div
        style={{
          padding: "11px 17px 9px",
          fontFamily: DS.fontMono,
          fontSize: "11px",
          fontWeight: 700,
          color: "#666666",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          background: "rgba(255,255,255,0.03)",
        }}
      >
        Pages
      </div>

      <div style={{ padding: "5px 0" }}>
        {SECONDARY.map(({ label, path, Icon }, i) => (
          <MenuRow
            key={path}
            label={label}
            Icon={Icon}
            active={currentRoute === path}
            onClick={() => onSelect(path)}
            delay={i * 32}
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
        padding: "9px 17px",
        background: active
          ? "linear-gradient(90deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.04) 100%)"
          : hov ? "rgba(255,255,255,0.05)" : "transparent",
        border: "none",
        borderLeft: active ? "2.5px solid rgba(255,255,255,0.6)" : "2.5px solid transparent",
        cursor: "pointer",
        fontFamily: DS.fontSans,
        fontSize: "15px",
        fontWeight: active ? 700 : 600,
        color: active ? DS.textPrimary : hov ? DS.textPrimary : DS.textSub,
        textAlign: "left",
        letterSpacing: "-0.015em",
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
          width: "25px",
          height: "25px",
          background: active
            ? "rgba(255,255,255,0.12)"
            : hov ? "rgba(255,255,255,0.07)" : "rgba(255,255,255,0.04)",
          borderRadius: "7px",
          flexShrink: 0,
          border: active ? "1px solid rgba(255,255,255,0.22)" : "1px solid rgba(255,255,255,0.07)",
          transition: `all ${DS.msFast} ${DS.ease}`,
          boxShadow: active ? "0 0 10px rgba(0,0,0,0.1)" : "none",
        }}
      >
        <Icon
          size={11}
          strokeWidth={1.8}
          style={{ color: active ? DS.textPrimary : hov ? DS.textPrimary : DS.textMuted }}
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
            background: "linear-gradient(135deg, #1a1a1a, #555555)",
            boxShadow: "0 0 9px rgba(0,0,0,0.5)",
            flexShrink: 0,
          }}
        />
      )}
    </button>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   COMMAND PALETTE
═══════════════════════════════════════════════════════════════════ */
function CommandPalette({ open, onClose, onNavigate }) {
  const [query, setQuery]   = useState("");
  const [sel, setSel]       = useState(0);
  const inputRef            = useRef(null);

  const filtered = query.trim()
    ? PALETTE_ITEMS.filter((i) => i.label.toLowerCase().includes(query.toLowerCase()))
    : PALETTE_ITEMS;

  useEffect(() => { setSel(0); }, [query]);
  useEffect(() => {
    if (open) {
      setQuery(""); setSel(0);
      setTimeout(() => inputRef.current?.focus(), 55);
    }
  }, [open]);

  useEffect(() => {
    const fn = (e) => {
      if (!open) return;
      if (e.key === "Escape")    { onClose(); return; }
      if (e.key === "ArrowDown") { e.preventDefault(); setSel((i) => Math.min(i + 1, filtered.length - 1)); }
      if (e.key === "ArrowUp")   { e.preventDefault(); setSel((i) => Math.max(i - 1, 0)); }
      if (e.key === "Enter" && filtered[sel]) { e.preventDefault(); doAction(filtered[sel].action); }
    };
    document.addEventListener("keydown", fn);
    return () => document.removeEventListener("keydown", fn);
  }, [open, filtered, sel]);

  const doAction = useCallback((action) => {
    onClose();
    if (action === "github") { window.open("https://github.com", "_blank"); return; }
    if (action === "email")  { window.location.href = "mailto:bhagavan@example.com"; return; }
    if (action === "resume") { onNavigate("/resume"); return; }
    if (action.startsWith("/")) onNavigate(action);
  }, [onClose, onNavigate]);

  if (!open) return null;

  return (
    <>
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.48)",
          backdropFilter: "blur(12px) saturate(0.65)",
          WebkitBackdropFilter: "blur(12px) saturate(0.65)",
          zIndex: 9990,
          animation: `__backdropIn ${DS.msFast} ${DS.ease}`,
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          top: "calc(17% - 90px)",
          left: "50%",
          transform: "translateX(-50%)",
          width: "min(680px, 92vw)",
          height: "260px",
          background: "radial-gradient(ellipse at center, rgba(0,0,0,0.07) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 9990,
          filter: "blur(10px)",
          animation: "__glowBreath 3s ease-in-out infinite",
        }}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        style={{
          position: "fixed",
          top: "17%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "min(580px, 92vw)",
          background: "rgba(10,10,10,0.98)",
          backdropFilter: "blur(44px) saturate(2.2)",
          WebkitBackdropFilter: "blur(44px) saturate(2.2)",
          border: "1px solid rgba(255,255,255,0.10)",
          borderRadius: "22px",
          boxShadow: [
            "0 0 0 1px rgba(255,255,255,0.03) inset",
            "0 28px 72px rgba(0,0,0,0.7)",
            "0 8px 28px rgba(0,0,0,0.45)",
          ].join(", "),
          overflow: "hidden",
          zIndex: 9991,
          animation: `__paletteIn ${DS.ms} ${DS.ease}`,
        }}
      >
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: 0, left: 0, right: 0,
            height: "2px",
            background: "linear-gradient(90deg, transparent 4%, #aaaaaa 28%, #ffffff 72%, transparent 96%)",
            opacity: 0.85,
          }}
        />
        <GrainOverlay />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
            padding: "20px 26px",
            borderBottom: "1px solid rgba(255,255,255,0.07)",
            background: "rgba(255,255,255,0.03)",
          }}
        >
          <Search size={15} strokeWidth={2} style={{ color: DS.textPrimary, flexShrink: 0 }} />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search pages, actions..."
            style={{
              flex: 1,
              border: "none",
              outline: "none",
              fontFamily: DS.fontSans,
              fontSize: "17px",
              fontWeight: 400,
              color: DS.textPrimary,
              letterSpacing: "-0.01em",
              background: "transparent",
              lineHeight: 1,
              caretColor: DS.textPrimary,
            }}
          />
          <kbd
            style={{
              fontFamily: DS.fontMono,
              fontSize: "11px",
              color: DS.textGhost,
              background: "rgba(255,255,255,0.07)",
              border: "1px solid rgba(255,255,255,0.10)",
              borderRadius: "5px",
              padding: "3px 8px",
              lineHeight: 1,
              letterSpacing: "0.04em",
              boxShadow: "0 1px 2px rgba(0,0,0,0.3)",
            }}
          >
            ESC
          </kbd>
        </div>

        <div style={{ padding: "6px 0 4px" }}>
          <div
            style={{
              padding: "6px 26px 7px",
              fontFamily: DS.fontMono,
              fontSize: "11px",
              fontWeight: 700,
              color: DS.textGhost,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            {query ? `Results for "${query}"` : "Quick actions"}
          </div>

          {filtered.length === 0 && (
            <div
              style={{
                padding: "34px 26px",
                fontFamily: DS.fontSans,
                fontSize: "16px",
                color: DS.textGhost,
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
              selected={i === sel}
              onHover={() => setSel(i)}
              onClick={() => doAction(item.action)}
            />
          ))}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "18px",
            padding: "10px 26px",
            borderTop: "1px solid rgba(255,255,255,0.06)",
            background: "rgba(255,255,255,0.02)",
          }}
        >
          {[["↑↓", "navigate"], ["↵", "select"], ["esc", "dismiss"]].map(([k, d]) => (
            <div key={k} style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <kbd
                style={{
                  fontFamily: DS.fontMono,
                  fontSize: "11px",
                  color: DS.textSub,
                  background: "rgba(255,255,255,0.07)",
                  border: "1px solid rgba(255,255,255,0.10)",
                  borderRadius: "5px",
                  padding: "2px 7px",
                  lineHeight: 1.5,
                  boxShadow: "0 1px 2px rgba(0,0,0,0.3)",
                }}
              >
                {k}
              </kbd>
              <span
                style={{
                  fontFamily: DS.fontSans,
                  fontSize: "13px",
                  color: DS.textGhost,
                  lineHeight: 1,
                }}
              >
                {d}
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
        padding: "10px 26px",
        background: selected
          ? "linear-gradient(90deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.04) 100%)"
          : "transparent",
        border: "none",
        borderLeft: selected ? "2.5px solid rgba(255,255,255,0.7)" : "2.5px solid transparent",
        cursor: "pointer",
        fontFamily: DS.fontSans,
        fontSize: "15px",
        fontWeight: selected ? 700 : 400,
        color: selected ? DS.textPrimary : DS.textSub,
        textAlign: "left",
        letterSpacing: "-0.015em",
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
            right: 0, top: 0, bottom: 0,
            width: "45%",
            background: "linear-gradient(90deg, transparent, rgba(0,0,0,0.02))",
            pointerEvents: "none",
          }}
        />
      )}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "29px",
          height: "29px",
          background: selected
            ? "linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.08) 100%)"
            : "rgba(255,255,255,0.05)",
          borderRadius: "8px",
          flexShrink: 0,
          border: selected ? "1px solid rgba(255,255,255,0.22)" : "1px solid rgba(255,255,255,0.08)",
          transition: `all ${DS.msFast} ${DS.ease}`,
          boxShadow: selected ? "0 0 14px rgba(0,0,0,0.1)" : "none",
        }}
      >
        <Icon
          size={12}
          strokeWidth={1.8}
          style={{ color: selected ? DS.textPrimary : DS.textGhost }}
        />
      </div>
      {label}
      <kbd
        style={{
          marginLeft: "auto",
          fontFamily: DS.fontMono,
          fontSize: "11px",
          color: selected ? DS.textPrimary : DS.textMuted,
          background: selected ? "rgba(255,255,255,0.10)" : "rgba(255,255,255,0.05)",
          border: `1px solid ${selected ? "rgba(255,255,255,0.22)" : "rgba(255,255,255,0.08)"}`,
          borderRadius: "4px",
          padding: "2px 7px",
          lineHeight: 1.5,
          flexShrink: 0,
          letterSpacing: "0.05em",
          transition: `all ${DS.msFast} ${DS.ease}`,
        }}
      >
        {shortcut}
      </kbd>
    </button>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   ⌘K TRIGGER BUTTON
═══════════════════════════════════════════════════════════════════ */
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
          ? "linear-gradient(135deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.06) 100%)"
          : DS.glassSurf,
        border: `1px solid ${hov ? "rgba(255,255,255,0.22)" : "rgba(255,255,255,0.08)"}`,
        borderRadius: "9px",
        cursor: "pointer",
        fontFamily: DS.fontMono,
        fontSize: "13px",
        fontWeight: 700,
        color: hov ? DS.textPrimary : DS.textMuted,
        letterSpacing: "0.03em",
        lineHeight: 1,
        transition: `all ${DS.msFast} ${DS.ease}`,
        outline: "none",
        boxShadow: hov
          ? "0 0 18px rgba(255,255,255,0.06), inset 0 1px 0 rgba(255,255,255,0.08)"
          : "inset 0 1px 0 rgba(255,255,255,0.05)",
        transform: hov ? "scale(1.04)" : "scale(1)",
      }}
    >
      <Command size={11} strokeWidth={2} />
      K
    </button>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   RESUME CTA — black/white spinning border
═══════════════════════════════════════════════════════════════════ */
function ResumeButton({ onClick }) {
  const [hov,   setHov]   = useState(false);
  const [press, setPress] = useState(false);

  return (
    <div style={{ position: "relative", display: "inline-flex" }}>
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: "-1.5px",
          borderRadius: "11px",
          background: "linear-gradient(135deg, #1a1a1a, #555555, #aaaaaa, #1a1a1a)",
          backgroundSize: "300% 300%",
          animation: "__borderSpin 3.8s linear infinite",
          opacity: hov ? 0.95 : 0.52,
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
          padding: "8px 17px",
          background: press
            ? "rgba(14,14,14,0.99)"
            : hov ? "rgba(16,16,16,0.97)" : "rgba(12,12,12,0.97)",
          border: "none",
          borderRadius: "10px",
          cursor: "pointer",
          fontFamily: DS.fontSans,
          fontSize: "15px",
          fontWeight: 700,
          color: "#fff",
          letterSpacing: "-0.01em",
          lineHeight: 1,
          transform: press ? "scale(0.96)" : hov ? "scale(1.025)" : "scale(1)",
          boxShadow: press
            ? "none"
            : hov
            ? "0 0 26px rgba(0,0,0,0.32), 0 8px 26px rgba(0,0,0,0.18)"
            : "none",
          animation: !hov && !press ? "__ctaGlow 3.2s ease-in-out infinite" : "none",
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
        {hov && (
          <div
            style={{
              position: "absolute",
              top: 0, bottom: 0,
              left: "-48px",
              width: "48px",
              background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.14), transparent)",
              transform: "skewX(-14deg)",
              animation: `__sweepLight 1.3s ${DS.ease} forwards`,
              pointerEvents: "none",
            }}
          />
        )}
        <FileText size={12} strokeWidth={2.5} style={{ flexShrink: 0 }} />
        <span
          style={{
            backgroundImage: "linear-gradient(90deg, #ffffff 0%, #cccccc 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Resume
        </span>
        <ArrowUpRight
          size={12}
          strokeWidth={2.5}
          style={{
            transform: hov ? "translate(2px,-2px)" : "translate(0,0)",
            transition: `transform ${DS.ms} ${DS.ease}`,
            opacity: 0.85,
          }}
        />
      </button>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   ANIMATED HAMBURGER
═══════════════════════════════════════════════════════════════════ */
function Hamburger({ isOpen, onClick }) {
  const [press, setPress] = useState(false);
  const touchFired = useRef(false);

  const handleClick = (e) => {
    e.stopPropagation();
    if (touchFired.current) { touchFired.current = false; return; }
    onClick();
  };

  const handleTouchEnd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setPress(false);
    touchFired.current = true;
    onClick();
  };

  return (
    <button
      onClick={handleClick}
      onMouseDown={() => setPress(true)}
      onMouseUp={() => setPress(false)}
      onMouseLeave={() => setPress(false)}
      onTouchStart={(e) => { e.stopPropagation(); setPress(true); touchFired.current = false; }}
      onTouchEnd={handleTouchEnd}
      aria-label={isOpen ? "Close navigation" : "Open navigation"}
      aria-expanded={isOpen}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "44px",
        height: "44px",
        background: isOpen
          ? "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.05) 100%)"
          : press ? DS.glassHover : DS.glassSurf,
        border: `1.5px solid ${isOpen ? "rgba(255,255,255,0.22)" : "rgba(255,255,255,0.10)"}`,
        borderRadius: "12px",
        cursor: "pointer",
        transform: press ? "scale(0.93)" : "scale(1)",
        transition: `all ${DS.msFast} ${DS.ease}`,
        outline: "none",
        WebkitTapHighlightColor: "transparent",
        touchAction: "manipulation",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        boxShadow: isOpen
          ? "0 0 18px rgba(255,255,255,0.08), inset 0 1px 0 rgba(255,255,255,0.08)"
          : "inset 0 1px 0 rgba(255,255,255,0.05)",
      }}
    >
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <line
          x1="3" y1="5" x2="17" y2="5"
          stroke={isOpen ? "#1a1a1a" : DS.textSub}
          strokeWidth="1.75"
          strokeLinecap="round"
          style={{
            transformOrigin: "10px 5px",
            transform: isOpen ? "rotate(45deg) translate(0px, 5px)" : "none",
            transition: `transform ${DS.ms} ${DS.ease}, stroke ${DS.ms} ${DS.ease}`,
          }}
        />
        <line
          x1="3" y1="10" x2="17" y2="10"
          stroke={isOpen ? "#1a1a1a" : DS.textSub}
          strokeWidth="1.75"
          strokeLinecap="round"
          style={{
            opacity: isOpen ? 0 : 1,
            transform: isOpen ? "scaleX(0)" : "scaleX(1)",
            transition: `opacity ${DS.msFast} ${DS.ease}, transform ${DS.msFast} ${DS.ease}`,
          }}
        />
        <line
          x1="3" y1="15" x2="17" y2="15"
          stroke={isOpen ? "#1a1a1a" : DS.textSub}
          strokeWidth="1.75"
          strokeLinecap="round"
          style={{
            transformOrigin: "10px 15px",
            transform: isOpen ? "rotate(-45deg) translate(0px, -5px)" : "none",
            transition: `transform ${DS.ms} ${DS.ease}, stroke ${DS.ms} ${DS.ease}`,
          }}
        />
      </svg>
    </button>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   MOBILE PANEL
═══════════════════════════════════════════════════════════════════ */
function MobilePanel({ open, currentRoute, onNavigate, onClose }) {
  const savedScrollY = useRef(0);

  useEffect(() => {
    if (open) {
      savedScrollY.current = window.scrollY;
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.top      = `-${savedScrollY.current}px`;
      document.body.style.left     = "0";
      document.body.style.right    = "0";
    } else {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top      = "";
      document.body.style.left     = "";
      document.body.style.right    = "";
      window.scrollTo({ top: savedScrollY.current, behavior: "instant" });
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top      = "";
      document.body.style.left     = "";
      document.body.style.right    = "";
      if (savedScrollY.current) {
        window.scrollTo({ top: savedScrollY.current, behavior: "instant" });
      }
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
          background: "rgba(0,0,0,0.38)",
          backdropFilter: "blur(7px) saturate(0.65)",
          WebkitBackdropFilter: "blur(7px) saturate(0.65)",
          zIndex: 9998,
          animation: `__backdropIn ${DS.ms} ${DS.ease}`,
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0, right: 0,
          width: "420px",
          height: "560px",
          background: "radial-gradient(ellipse at 90% 20%, rgba(0,0,0,0.05) 0%, transparent 62%)",
          pointerEvents: "none",
          zIndex: 9998,
        }}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "fixed",
          top: 0, right: 0, bottom: 0,
          width: "min(350px, 90vw)",
          background: "rgba(10,10,10,0.985)",
          backdropFilter: "blur(44px) saturate(1.7)",
          WebkitBackdropFilter: "blur(44px) saturate(1.7)",
          borderLeft: "1px solid rgba(255,255,255,0.08)",
          boxShadow: [
            "-14px 0 44px rgba(0,0,0,0.12)",
            "-4px 0 14px rgba(0,0,0,0.06)",
          ].join(", "),
          overflowY: "auto",
          zIndex: 9999,
          animation: `__panelIn ${DS.msSlow} ${DS.easeOut}`,
        }}
      >
        <GrainOverlay />
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: 0, left: 0, right: 0,
            height: "3px",
            background: "linear-gradient(90deg, #1a1a1a, #555555, #aaaaaa)",
          }}
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "32px 26px 22px",
            borderBottom: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <div>
            <div
              style={{
                fontFamily: DS.fontDisplay,
                fontSize: "22px",
                fontWeight: 700,
                letterSpacing: "-0.02em",
                marginBottom: "5px",
                backgroundImage: "linear-gradient(135deg, #0a0a0a 0%, #444444 100%)",
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
                fontSize: "13px",
                fontWeight: 400,
                color: DS.textGhost,
                letterSpacing: "0.02em",
              }}
            >
              ./bhagavan
            </div>
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); onClose(); }}
            onTouchEnd={(e) => { e.preventDefault(); e.stopPropagation(); onClose(); }}
            aria-label="Close menu"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "36px",
              height: "36px",
              background: DS.glassSurf,
              border: "1px solid rgba(255,255,255,0.10)",
              borderRadius: "9px",
              cursor: "pointer",
              color: DS.textGhost,
              outline: "none",
              WebkitTapHighlightColor: "transparent",
              touchAction: "manipulation",
              transition: `all ${DS.msFast} ${DS.ease}`,
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05)",
            }}
          >
            <X size={13} strokeWidth={2.5} />
          </button>
        </div>

        <div style={{ padding: "20px 26px 0" }}>
          <AvailabilityBadge />
        </div>

        <div style={{ padding: "20px 20px 32px" }}>
          <div style={{ marginBottom: "6px" }}>
            <div
              style={{
                fontFamily: DS.fontMono,
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.08em",
                color: DS.textGhost,
                textTransform: "uppercase",
                padding: "0 8px 13px",
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
                delay={i * 42}
              />
            ))}
          </div>

          <div
            style={{
              height: "1px",
              background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.14) 35%, rgba(255,255,255,0.14) 65%, transparent)",
              margin: "16px 8px 20px",
            }}
          />

          <div>
            <div
              style={{
                fontFamily: DS.fontMono,
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.08em",
                color: DS.textGhost,
                textTransform: "uppercase",
                padding: "0 8px 13px",
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
                delay={(PRIMARY.length + i) * 42}
              />
            ))}
          </div>

          <div
            style={{
              padding: "24px 8px 10px",
              position: "relative",
              animation: `__fadeSlideUp ${DS.msSlow} ${DS.easeOut} ${(PRIMARY.length + SECONDARY.length) * 42 + 100}ms backwards`,
            }}
          >
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                inset: "12px",
                background: "radial-gradient(ellipse, rgba(0,0,0,0.08) 0%, transparent 72%)",
                filter: "blur(18px)",
                pointerEvents: "none",
              }}
            />
            <button
              onClick={(e) => { e.stopPropagation(); onNavigate("/resume"); }}
              onTouchEnd={(e) => { e.preventDefault(); e.stopPropagation(); onNavigate("/resume"); }}
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "9px",
                width: "100%",
                minHeight: "54px",
                background: "linear-gradient(135deg, rgba(20,20,20,0.92) 0%, rgba(60,60,60,0.9) 100%)",
                border: "1px solid rgba(0,0,0,0.38)",
                borderRadius: "14px",
                cursor: "pointer",
                fontFamily: DS.fontSans,
                fontSize: "17px",
                fontWeight: 700,
                color: "#fff",
                letterSpacing: "-0.01em",
                outline: "none",
                WebkitTapHighlightColor: "transparent",
                touchAction: "manipulation",
                boxShadow: [
                  "0 0 26px rgba(0,0,0,0.22)",
                  "0 8px 26px rgba(0,0,0,0.14)",
                  "inset 0 1px 0 rgba(255,255,255,0.12)",
                ].join(", "),
                animation: "__ctaGlow 3s ease-in-out infinite",
                overflow: "hidden",
              }}
            >
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  top: 0, bottom: 0,
                  left: "-90px",
                  width: "90px",
                  background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)",
                  transform: "skewX(-14deg)",
                  animation: "__sweepLight 4.5s ease-in-out 0.8s infinite",
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
  const touchFired = useRef(false);

  const handleClick = (e) => {
    if (touchFired.current) { touchFired.current = false; return; }
    e.stopPropagation();
    setPress(false);
    onClick();
  };

  const handleTouchStart = (e) => {
    setPress(true);
    touchFired.current = false;
  };

  const handleTouchEnd = (e) => {
    e.preventDefault();
    setPress(false);
    touchFired.current = true;
    onClick();
  };

  return (
    <button
      onClick={handleClick}
      onMouseDown={() => setPress(true)}
      onMouseUp={() => setPress(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseLeave={() => setPress(false)}
      aria-current={active ? "page" : undefined}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        width: "100%",
        minHeight: "50px",
        padding: "12px 12px",
        marginBottom: "2px",
        background: active
          ? "linear-gradient(90deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.04) 100%)"
          : press ? DS.glassHover : "transparent",
        border: active
          ? "1px solid rgba(255,255,255,0.10)"
          : "1px solid transparent",
        borderLeft: active ? "3px solid rgba(255,255,255,0.6)" : "3px solid transparent",
        borderRadius: "11px",
        cursor: "pointer",
        fontFamily: DS.fontSans,
        fontSize: "17px",
        fontWeight: active ? 700 : 500,
        color: active ? DS.textPrimary : DS.textSub,
        textAlign: "left",
        letterSpacing: "-0.01em",
        lineHeight: 1.2,
        transition: `all ${DS.msFast} ${DS.ease}`,
        outline: "none",
        WebkitTapHighlightColor: "transparent",
        touchAction: "manipulation",
        animation: `__itemStagger ${DS.msSlow} ${DS.easeOut} ${delay}ms backwards`,
        boxShadow: active
          ? "0 0 18px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.55)"
          : "none",
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
            background: active ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.04)",
            borderRadius: "8px",
            flexShrink: 0,
            border: active ? "1px solid rgba(255,255,255,0.18)" : "1px solid rgba(255,255,255,0.07)",
            boxShadow: active ? "inset 0 1px 0 rgba(255,255,255,0.1)" : "none",
          }}
        >
          <Icon
            size={13}
            strokeWidth={1.75}
            style={{ color: active ? DS.textPrimary : DS.textMuted }}
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
            background: "linear-gradient(135deg, #1a1a1a, #555555)",
            boxShadow: "0 0 9px rgba(0,0,0,0.4)",
            flexShrink: 0,
          }}
        />
      )}
    </button>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   ROOT NAVBAR COMPONENT
═══════════════════════════════════════════════════════════════════ */
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
  const spyPath     = activeSection ? PRIMARY.find((p) => p.sectionId === activeSection)?.path : null;
  const activePath  = spyPath ?? route;
  const activeIndex = PRIMARY.findIndex((p) => p.path === activePath);

  useEffect(() => {
    const t = setInterval(() => setSweepTick((n) => n + 1), 13000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const fn = () => {
      if (rafId.current) return;
      rafId.current = requestAnimationFrame(() => {
        const y = window.scrollY;
        setScrolled(y > 24);
        if (isMobile) {
          if      (y < 8)                             setVisible(true);
          else if (y < prevY.current - 2)             setVisible(true);
          else if (y > prevY.current + 2 && y > 60)   setVisible(false);
        } else {
          setVisible(true);
        }
        prevY.current = y;
        rafId.current = null;
      });
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => {
      window.removeEventListener("scroll", fn);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [isMobile]);

  useEffect(() => {
    const fn = (e) => {
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || e.key === "/") {
        e.preventDefault();
        setPaletteOpen((p) => !p);
      }
    };
    document.addEventListener("keydown", fn);
    return () => document.removeEventListener("keydown", fn);
  }, []);

  useEffect(() => {
    if (!moreOpen) return;
    const fn = (e) => {
      if (moreRef.current && !moreRef.current.contains(e.target)) setMoreOpen(false);
    };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, [moreOpen]);

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
    setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 80);
  }, [navigate]);

  const navH   = scrolled ? (isTiny ? "58px" : "64px") : (isTiny ? "68px" : "76px");
  const bg     = scrolled ? DS.glassBgScroll : DS.glassBg;
  const blur   = scrolled ? "blur(32px) saturate(2)" : "blur(18px) saturate(1.5)";
  const borderC= scrolled ? "rgba(255,255,255,0.10)" : "rgba(255,255,255,0.06)";
  const shadow = scrolled
    ? [
        "0 1px 0 rgba(255,255,255,0.05)",
        "0 8px 36px rgba(0,0,0,0.5)",
        "0 2px 8px rgba(0,0,0,0.35)",
      ].join(", ")
    : "none";
  const padX   = isTiny ? "18px" : "48px";

  return (
    <>
      <style>{GLOBAL_CSS}</style>

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
          borderBottom: `1px solid ${borderC}`,
          boxShadow: shadow,
          transform: visible ? "translateY(0)" : "translateY(-110%)",
          transition: [
            `height ${DS.ms} ${DS.ease}`,
            `background ${DS.msSlow} ${DS.ease}`,
            `border-color ${DS.msSlow} ${DS.ease}`,
            `box-shadow ${DS.msSlow} ${DS.ease}`,
            `transform ${DS.ms} ${visible ? DS.ease : DS.easeIn}`,
            `backdrop-filter ${DS.msSlow} ${DS.ease}`,
          ].join(", "),
          zIndex: 8000,
          isolation: "isolate",
          overflow: "visible",
          WebkitOverflowScrolling: "touch",
        }}
      >
        <GrainOverlay />
        <GradientMesh cursorX={cursorX} />
        <LightSweep trigger={sweepTick} />

        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: 0, left: 0, right: 0,
            height: "1px",
            background: `linear-gradient(90deg, transparent 0%, rgba(255,255,255,${scrolled ? "0.22" : "0.09"}) 28%, rgba(180,180,180,${scrolled ? "0.28" : "0.14"}) 72%, transparent 100%)`,
            transition: `all ${DS.ms} ${DS.ease}`,
            pointerEvents: "none",
            zIndex: 3,
          }}
        />

        <ScrollProgressBar progress={scrollProgress} visible={scrolled} />

        <div
          style={{
            maxWidth: "1300px",
            height: "100%",
            margin: "0 auto",
            padding: `0 ${padX}`,
            display: "flex",
            alignItems: "center",
            position: "relative",
            zIndex: 4,
          }}
        >
          {/* LEFT: Logo + Badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "14px",
              flexShrink: 0,
            }}
          >
            <Logo onClick={() => go("/home")} />
            {!isMobile && <AvailabilityBadge />}
          </div>

          {/* CENTER: Primary nav */}
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
                  itemRef={(el) => { itemRefs.current[i] = el; }}
                  animDelay={200 + i * 58}
                />
              ))}
            </div>
          )}

          {/* RIGHT: Controls */}
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
                  <MoreTrigger open={moreOpen} onClick={() => setMoreOpen((p) => !p)} />
                  <CommandMenu
                    open={moreOpen}
                    currentRoute={route}
                    onSelect={(p) => { setMoreOpen(false); if (p) go(p); }}
                  />
                </div>

                <span
                  aria-hidden="true"
                  style={{
                    display: "inline-block",
                    width: "1px",
                    height: "20px",
                    background: "linear-gradient(180deg, transparent, rgba(255,255,255,0.22), transparent)",
                    margin: "0 5px",
                    flexShrink: 0,
                  }}
                />

                <ResumeButton onClick={() => go("/resume")} />
              </>
            )}

            {isMobile && (
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <AvailabilityBadge />
                <Hamburger isOpen={mobileOpen} onClick={() => setMobileOpen((p) => !p)} />
              </div>
            )}
          </div>
        </div>
      </nav>

      <MobilePanel
        open={isMobile && mobileOpen}
        currentRoute={route}
        onNavigate={go}
        onClose={() => setMobileOpen(false)}
      />

      <CommandPalette
        open={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        onNavigate={go}
      />
    </>
  );
}