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
   ELITE DESIGN SYSTEM
───────────────────────────────────────────────────────────────── */
const DS = {
  // Core palette
  white:        "#ffffff",
  ink:          "#0a0a0f",
  inkMid:       "#3d3d4d",
  inkFaint:     "#7a7a8e",
  inkGhost:     "#b8b8cc",

  // Accent system — blue-violet gradient
  accent:       "#2563eb",
  accentLight:  "#3b82f6",
  accentViolet: "#7c3aed",
  accentGrad:   "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)",
  accentSoft:   "rgba(37,99,235,0.09)",
  accentGlow:   "rgba(37,99,235,0.22)",

  // Glass surfaces
  glassBg:      "rgba(255,255,255,0.78)",
  glassBgScroll:"rgba(255,255,255,0.92)",
  glassBorder:  "rgba(255,255,255,0.55)",
  glassBorderDark:"rgba(0,0,0,0.07)",
  surfHover:    "rgba(0,0,0,0.028)",
  surfActive:   "rgba(37,99,235,0.065)",

  // Typography — Syne + DM Mono
  fontDisplay:  "'Syne', system-ui, sans-serif",
  fontSans:     "'Plus Jakarta Sans', system-ui, sans-serif",
  fontMono:     "'JetBrains Mono', ui-monospace, monospace",

  // Motion
  ease:         "cubic-bezier(0.16, 1, 0.3, 1)",
  easeOut:      "cubic-bezier(0.33, 1, 0.68, 1)",
  easeIn:       "cubic-bezier(0.55, 0, 1, 0.45)",
  spring:       "cubic-bezier(0.34, 1.56, 0.64, 1)",
  ms:           "200ms",
  msFast:       "140ms",
  msSlow:       "300ms",

  // Spatial
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

  /* ── Keyframes ── */
  @keyframes __menuIn {
    from { opacity: 0; transform: translateY(-6px) scale(0.975); filter: blur(2px); }
    to   { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
  }
  @keyframes __panelIn {
    from { transform: translateX(100%); opacity: 0.6; }
    to   { transform: translateX(0); opacity: 1; }
  }
  @keyframes __backdropIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes __itemStagger {
    from { opacity: 0; transform: translateX(14px) scale(0.97); }
    to   { opacity: 1; transform: translateX(0) scale(1); }
  }
  @keyframes __paletteIn {
    from { opacity: 0; transform: translateY(-10px) scale(0.96); filter: blur(4px); }
    to   { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
  }
  @keyframes __pulseRing {
    0%   { transform: scale(1); opacity: 0.6; }
    70%  { transform: scale(2.4); opacity: 0; }
    100% { transform: scale(2.4); opacity: 0; }
  }
  @keyframes __shimmer {
    0%   { background-position: -200% center; }
    100% { background-position: 200% center; }
  }
  @keyframes __ambientFlow {
    0%, 100% { opacity: 0.25; transform: translateX(0) scale(1); }
    50%       { opacity: 0.40; transform: translateX(4px) scale(1.04); }
  }
  @keyframes __glowPulse {
    0%, 100% { box-shadow: 0 0 0 0 rgba(37,99,235,0.0); }
    50%       { box-shadow: 0 0 20px 2px rgba(37,99,235,0.15); }
  }
  @keyframes __indicatorIn {
    from { opacity: 0; transform: scaleX(0.4); }
    to   { opacity: 1; transform: scaleX(1); }
  }

  /* ── Magnetic hover lift ── */
  .nav-item-mag { transition: transform 200ms cubic-bezier(0.16,1,0.3,1); }
  .nav-item-mag:hover { transform: translateY(-1.5px); }

  /* ── Palette row highlight ── */
  .palette-row-selected {
    background: linear-gradient(90deg, rgba(37,99,235,0.08) 0%, rgba(124,58,237,0.06) 100%) !important;
    color: #2563eb !important;
  }

  /* ── Scrollbar slim ── */
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.12); border-radius: 4px; }

  /* ── Focus visible ── */
  :focus-visible { outline: 2px solid #2563eb; outline-offset: 2px; border-radius: 4px; }

  /* ── Reduced motion ── */
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      transition-duration: 0.01ms !important;
    }
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

/* ─────────────────────────────────────────────────────────────────
   SCROLL PROGRESS BAR — gradient animated
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
        height: "2px",
        background: "rgba(0,0,0,0.05)",
        overflow: "hidden",
        opacity: visible && progress > 1 ? 1 : 0,
        transition: `opacity ${DS.ms} ${DS.ease}`,
      }}
    >
      <div
        style={{
          height: "100%",
          width: `${progress}%`,
          background: "linear-gradient(90deg, #2563eb, #7c3aed, #2563eb)",
          backgroundSize: "200% auto",
          borderRadius: "0 2px 2px 0",
          transition: "width 80ms linear",
          animation: "__shimmer 3s linear infinite",
          boxShadow: "0 0 10px rgba(37,99,235,0.5), 0 0 20px rgba(124,58,237,0.3)",
        }}
      />
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   AMBIENT GLOW — decorative top accent
───────────────────────────────────────────────────────────────── */
function AmbientGlow({ visible }) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        top: "-30px",
        left: "50%",
        transform: "translateX(-50%)",
        width: "60%",
        height: "60px",
        background: "radial-gradient(ellipse at center, rgba(37,99,235,0.18) 0%, transparent 70%)",
        pointerEvents: "none",
        opacity: visible ? 1 : 0,
        transition: `opacity 500ms ${DS.ease}`,
        animation: "__ambientFlow 6s ease-in-out infinite",
        zIndex: -1,
      }}
    />
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
          background: "linear-gradient(135deg, rgba(16,185,129,0.06) 0%, rgba(16,185,129,0.1) 100%)",
          border: "1px solid rgba(16,185,129,0.22)",
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
              animation: "__pulseRing 2.4s ease-out infinite",
            }}
          />
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              background: "#10b981",
              boxShadow: "0 0 6px rgba(16,185,129,0.6)",
            }}
          />
        </div>
        <span
          style={{
            fontFamily: DS.fontSans,
            fontSize: "11.5px",
            fontWeight: 600,
            color: "#0a7c5c",
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
            background: DS.ink,
            color: "#fff",
            fontFamily: DS.fontSans,
            fontSize: "12px",
            fontWeight: 400,
            letterSpacing: "-0.01em",
            padding: "7px 12px",
            borderRadius: "8px",
            boxShadow: "0 8px 24px rgba(0,0,0,0.22), 0 2px 6px rgba(0,0,0,0.12)",
            pointerEvents: "none",
            animation: `__menuIn ${DS.msFast} ${DS.ease}`,
            zIndex: 9999,
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          Open to full-time roles · 2026 Graduate
          <div
            style={{
              position: "absolute",
              top: "-4px",
              left: "50%",
              transform: "translateX(-50%) rotate(45deg)",
              width: "8px",
              height: "8px",
              background: DS.ink,
              borderRadius: "1px",
              border: "1px solid rgba(255,255,255,0.08)",
              borderBottom: "none",
              borderRight: "none",
            }}
          />
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   LOGO
───────────────────────────────────────────────────────────────── */
function Logo({ onClick }) {
  const [hov, setHov] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
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
        transform: hov ? "translateY(-1px)" : "translateY(0)",
        transition: `transform ${DS.ms} ${DS.spring}, opacity ${DS.msFast} ${DS.ease}`,
        opacity: hov ? 0.72 : 1,
      }}
    >
      <span
        style={{
          fontFamily: DS.fontMono,
          fontSize: "12px",
          fontWeight: 400,
          color: DS.accent,
          letterSpacing: "0",
          userSelect: "none",
          opacity: 0.7,
        }}
      >
        ./
      </span>
      <span
        style={{
          fontFamily: DS.fontDisplay,
          fontSize: "15px",
          fontWeight: 700,
          color: DS.ink,
          letterSpacing: "-0.04em",
          userSelect: "none",
          background: hov ? DS.accentGrad : "none",
          WebkitBackgroundClip: hov ? "text" : "initial",
          WebkitTextFillColor: hov ? "transparent" : "initial",
          backgroundClip: hov ? "text" : "initial",
          transition: `all ${DS.ms} ${DS.ease}`,
        }}
      >
        G S S S BHAGAVAN
      </span>
    </button>
  );
}

/* ─────────────────────────────────────────────────────────────────
   SLIDING INDICATOR — gradient pill
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
      {/* Bottom line indicator */}
      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: "2px",
          left: `${pos.left}px`,
          width: `${pos.width}px`,
          height: "2px",
          background: DS.accentGrad,
          borderRadius: "2px",
          opacity: pos.opacity,
          transition: [
            `left 280ms ${DS.ease}`,
            `width 280ms ${DS.ease}`,
            `opacity 200ms ${DS.ease}`,
          ].join(", "),
          pointerEvents: "none",
          zIndex: 1,
          boxShadow: "0 0 8px rgba(37,99,235,0.6), 0 0 16px rgba(124,58,237,0.3)",
        }}
      />
      {/* Soft background pill */}
      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: "4px",
          top: "4px",
          left: `${pos.left - 14}px`,
          width: `${pos.width + 28}px`,
          background: DS.accentSoft,
          borderRadius: "7px",
          opacity: pos.opacity * 0.7,
          transition: [
            `left 280ms ${DS.ease}`,
            `width 280ms ${DS.ease}`,
            `opacity 200ms ${DS.ease}`,
          ].join(", "),
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
    </>
  );
}

/* ─────────────────────────────────────────────────────────────────
   NAV ITEM
───────────────────────────────────────────────────────────────── */
function NavItem({ label, active, onClick, itemRef }) {
  const [hov, setHov] = useState(false);

  return (
    <button
      ref={itemRef}
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      aria-current={active ? "page" : undefined}
      className="nav-item-mag"
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
        color: active ? DS.ink : hov ? DS.inkMid : DS.inkFaint,
        letterSpacing: active ? "-0.025em" : "-0.01em",
        lineHeight: 1,
        whiteSpace: "nowrap",
        transition: `color ${DS.ms} ${DS.ease}, font-weight ${DS.ms} ${DS.ease}`,
        outline: "none",
      }}
    >
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
        padding: `${DS.sp(1)} ${DS.sp(1.75)}`,
        background: open ? DS.accentSoft : hov ? DS.surfHover : "none",
        border: open ? "1px solid rgba(37,99,235,0.15)" : "1px solid transparent",
        borderRadius: "8px",
        cursor: "pointer",
        fontFamily: DS.fontSans,
        fontSize: "13.5px",
        fontWeight: 400,
        color: open ? DS.accent : hov ? DS.inkMid : DS.inkFaint,
        letterSpacing: "-0.01em",
        lineHeight: 1,
        transition: `all ${DS.ms} ${DS.ease}`,
        outline: "none",
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
   COMMAND MENU DROPDOWN
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
        top: "calc(100% + 10px)",
        right: 0,
        minWidth: "220px",
        background: "rgba(255,255,255,0.96)",
        backdropFilter: "blur(24px) saturate(1.8)",
        WebkitBackdropFilter: "blur(24px) saturate(1.8)",
        border: "1px solid rgba(0,0,0,0.08)",
        borderRadius: "14px",
        boxShadow: "0 8px 40px rgba(0,0,0,0.1), 0 1px 3px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.9)",
        overflow: "hidden",
        animation: `__menuIn ${DS.ms} ${DS.ease}`,
        zIndex: 300,
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "10px 16px 8px",
          fontFamily: DS.fontMono,
          fontSize: "9.5px",
          fontWeight: 500,
          color: DS.inkGhost,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          borderBottom: "1px solid rgba(0,0,0,0.05)",
          background: "rgba(0,0,0,0.012)",
        }}
      >
        Pages
      </div>

      <div style={{ padding: "4px 0" }}>
        {SECONDARY.map(({ label, path, Icon }) => (
          <MenuRow
            key={path}
            label={label}
            Icon={Icon}
            active={currentRoute === path}
            onClick={() => onSelect(path)}
          />
        ))}
      </div>
    </div>
  );
}

function MenuRow({ label, Icon, active, onClick }) {
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
          ? "linear-gradient(90deg, rgba(37,99,235,0.07) 0%, rgba(124,58,237,0.05) 100%)"
          : hov
          ? DS.surfHover
          : "transparent",
        border: "none",
        cursor: "pointer",
        fontFamily: DS.fontSans,
        fontSize: "13px",
        fontWeight: active ? 600 : 400,
        color: active ? DS.accent : hov ? DS.ink : DS.inkMid,
        textAlign: "left",
        letterSpacing: "-0.01em",
        lineHeight: 1,
        transition: `background ${DS.msFast} ${DS.ease}, color ${DS.msFast} ${DS.ease}`,
        outline: "none",
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
            ? "rgba(37,99,235,0.1)"
            : hov
            ? "rgba(0,0,0,0.04)"
            : "rgba(0,0,0,0.03)",
          borderRadius: "6px",
          flexShrink: 0,
          transition: `background ${DS.msFast} ${DS.ease}`,
        }}
      >
        <Icon size={12} strokeWidth={1.75} style={{ opacity: active ? 1 : 0.45 }} />
      </div>
      {label}
      {active && (
        <span
          style={{
            marginLeft: "auto",
            width: "5px",
            height: "5px",
            borderRadius: "50%",
            background: DS.accentGrad,
            boxShadow: "0 0 6px rgba(37,99,235,0.5)",
            flexShrink: 0,
          }}
        />
      )}
    </button>
  );
}

/* ─────────────────────────────────────────────────────────────────
   COMMAND PALETTE OVERLAY
───────────────────────────────────────────────────────────────── */
function CommandPalette({ open, onClose, onNavigate }) {
  const [query, setQuery]         = useState("");
  const [selectedIdx, setIdx]     = useState(0);
  const inputRef                  = useRef(null);

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
    if (action === "github")         { window.open("https://github.com", "_blank"); return; }
    if (action === "email")          { window.location.href = "mailto:bhagavan@example.com"; return; }
    if (action === "resume")         { onNavigate("/resume"); return; }
    if (action.startsWith("/"))      { onNavigate(action); }
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
          background: "rgba(5,5,15,0.55)",
          backdropFilter: "blur(6px) saturate(0.8)",
          WebkitBackdropFilter: "blur(6px) saturate(0.8)",
          zIndex: 9990,
          animation: `__backdropIn ${DS.msFast} ${DS.ease}`,
        }}
      />

      {/* Spotlight glow behind dialog */}
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          top: "calc(18% - 60px)",
          left: "50%",
          transform: "translateX(-50%)",
          width: "min(600px, 90vw)",
          height: "200px",
          background: "radial-gradient(ellipse at center, rgba(37,99,235,0.25) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 9990,
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
          width: "min(560px, 92vw)",
          background: "rgba(255,255,255,0.97)",
          backdropFilter: "blur(32px) saturate(2)",
          WebkitBackdropFilter: "blur(32px) saturate(2)",
          border: "1px solid rgba(37,99,235,0.15)",
          borderRadius: "18px",
          boxShadow: [
            "0 24px 80px rgba(0,0,0,0.18)",
            "0 8px 24px rgba(0,0,0,0.1)",
            "0 2px 6px rgba(0,0,0,0.06)",
            "inset 0 1px 0 rgba(255,255,255,0.95)",
          ].join(", "),
          overflow: "hidden",
          zIndex: 9991,
          animation: `__paletteIn ${DS.ms} ${DS.ease}`,
        }}
      >
        {/* Top accent strip */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: 0, left: 0, right: 0,
            height: "2px",
            background: DS.accentGrad,
            opacity: 0.7,
          }}
        />

        {/* Search bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            padding: "18px 22px",
            borderBottom: "1px solid rgba(0,0,0,0.06)",
          }}
        >
          <Search size={16} strokeWidth={2} style={{ color: DS.accent, flexShrink: 0 }} />
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
              fontSize: "15.5px",
              fontWeight: 400,
              color: DS.ink,
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
              color: DS.inkFaint,
              background: "rgba(0,0,0,0.04)",
              border: "1px solid rgba(0,0,0,0.1)",
              borderRadius: "5px",
              padding: "3px 7px",
              lineHeight: 1,
              letterSpacing: "0.02em",
            }}
          >
            ESC
          </kbd>
        </div>

        {/* Results */}
        <div style={{ padding: "6px 0 4px" }}>
          <div
            style={{
              padding: "6px 22px 5px",
              fontFamily: DS.fontMono,
              fontSize: "9.5px",
              fontWeight: 500,
              color: DS.inkGhost,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            {query ? `Results for "${query}"` : "Quick actions"}
          </div>

          {filtered.length === 0 && (
            <div
              style={{
                padding: "28px 22px",
                fontFamily: DS.fontSans,
                fontSize: "14px",
                color: DS.inkFaint,
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

        {/* Footer */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            padding: "10px 22px",
            borderTop: "1px solid rgba(0,0,0,0.05)",
            background: "rgba(0,0,0,0.014)",
          }}
        >
          {[
            ["↑↓", "navigate"],
            ["↵",  "select"],
            ["esc","dismiss"],
          ].map(([key, desc]) => (
            <div key={key} style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <kbd
                style={{
                  fontFamily: DS.fontMono,
                  fontSize: "10px",
                  color: DS.inkMid,
                  background: DS.white,
                  border: "1px solid rgba(0,0,0,0.1)",
                  borderRadius: "5px",
                  padding: "2px 6px",
                  lineHeight: 1.4,
                  boxShadow: "0 1px 2px rgba(0,0,0,0.06)",
                }}
              >
                {key}
              </kbd>
              <span
                style={{
                  fontFamily: DS.fontSans,
                  fontSize: "11px",
                  color: DS.inkGhost,
                  lineHeight: 1,
                }}
              >
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
        padding: "9px 22px",
        background: selected
          ? "linear-gradient(90deg, rgba(37,99,235,0.08) 0%, rgba(124,58,237,0.05) 100%)"
          : "transparent",
        border: "none",
        borderLeft: selected ? "2px solid rgba(37,99,235,0.5)" : "2px solid transparent",
        cursor: "pointer",
        fontFamily: DS.fontSans,
        fontSize: "13.5px",
        fontWeight: selected ? 600 : 400,
        color: selected ? DS.accent : DS.inkMid,
        textAlign: "left",
        letterSpacing: "-0.01em",
        lineHeight: 1,
        transition: `background ${DS.msFast} ${DS.ease}, color ${DS.msFast} ${DS.ease}, border-color ${DS.msFast} ${DS.ease}`,
        outline: "none",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "28px",
          height: "28px",
          background: selected
            ? "linear-gradient(135deg, rgba(37,99,235,0.12) 0%, rgba(124,58,237,0.1) 100%)"
            : "rgba(0,0,0,0.04)",
          borderRadius: "7px",
          flexShrink: 0,
          transition: `background ${DS.msFast} ${DS.ease}`,
          border: selected ? "1px solid rgba(37,99,235,0.2)" : "1px solid transparent",
        }}
      >
        <Icon size={13} strokeWidth={1.75} style={{ opacity: selected ? 0.9 : 0.45 }} />
      </div>
      {label}
      <kbd
        style={{
          marginLeft: "auto",
          fontFamily: DS.fontMono,
          fontSize: "9.5px",
          color: selected ? DS.accent : DS.inkGhost,
          background: selected ? "rgba(37,99,235,0.08)" : "rgba(0,0,0,0.04)",
          border: `1px solid ${selected ? "rgba(37,99,235,0.2)" : "rgba(0,0,0,0.07)"}`,
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
        padding: "6px 11px",
        background: hov ? DS.accentSoft : "rgba(0,0,0,0.025)",
        border: `1px solid ${hov ? "rgba(37,99,235,0.2)" : "rgba(0,0,0,0.07)"}`,
        borderRadius: "8px",
        cursor: "pointer",
        fontFamily: DS.fontMono,
        fontSize: "11.5px",
        fontWeight: 500,
        color: hov ? DS.accent : DS.inkFaint,
        letterSpacing: "0.01em",
        lineHeight: 1,
        transition: `all ${DS.msFast} ${DS.ease}`,
        outline: "none",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
      }}
    >
      <Command size={11} strokeWidth={2} />
      K
    </button>
  );
}

/* ─────────────────────────────────────────────────────────────────
   RESUME CTA
───────────────────────────────────────────────────────────────── */
function ResumeButton({ onClick }) {
  const [hov,   setHov]   = useState(false);
  const [press, setPress] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => { setHov(false); setPress(false); }}
      onMouseDown={() => setPress(true)}
      onMouseUp={() => setPress(false)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "6px",
        padding: "8px 16px",
        background: DS.accentGrad,
        backgroundSize: "200% 100%",
        backgroundPosition: hov ? "100% 0" : "0 0",
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
        boxShadow: hov && !press
          ? [
              "0 0 0 3px rgba(37,99,235,0.18)",
              "0 4px 16px rgba(37,99,235,0.35)",
              "0 1px 4px rgba(124,58,237,0.2)",
              "inset 0 1px 0 rgba(255,255,255,0.15)",
            ].join(", ")
          : [
              "0 2px 8px rgba(37,99,235,0.25)",
              "inset 0 1px 0 rgba(255,255,255,0.1)",
            ].join(", "),
        transition: [
          `transform ${DS.msFast} ${DS.spring}`,
          `box-shadow ${DS.ms} ${DS.ease}`,
          `background-position ${DS.msSlow} ${DS.ease}`,
          `opacity ${DS.msFast} ${DS.ease}`,
        ].join(", "),
        opacity: press ? 0.88 : 1,
        outline: "none",
      }}
    >
      <FileText size={12} strokeWidth={2.5} style={{ flexShrink: 0 }} />
      Resume
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
  );
}

/* ─────────────────────────────────────────────────────────────────
   ANIMATED HAMBURGER → X
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
          ? "linear-gradient(135deg, rgba(37,99,235,0.1) 0%, rgba(124,58,237,0.08) 100%)"
          : press
          ? DS.surfHover
          : "rgba(0,0,0,0.03)",
        border: `1.5px solid ${isOpen ? "rgba(37,99,235,0.25)" : "rgba(0,0,0,0.08)"}`,
        borderRadius: "11px",
        cursor: "pointer",
        transform: press ? "scale(0.93)" : "scale(1)",
        transition: `all ${DS.msFast} ${DS.ease}`,
        outline: "none",
        WebkitTapHighlightColor: "transparent",
        touchAction: "manipulation",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
      }}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          color: isOpen ? DS.accent : DS.inkMid,
          transition: `color ${DS.msFast} ${DS.ease}`,
        }}
      >
        <line
          x1="3" y1="5" x2="17" y2="5"
          stroke="currentColor" strokeWidth="2" strokeLinecap="round"
          style={{
            transformOrigin: "center",
            transform: isOpen ? "rotate(45deg) translateY(5px)" : "rotate(0deg) translateY(0)",
            transition: `transform ${DS.ms} ${DS.ease}`,
          }}
        />
        <line
          x1="3" y1="10" x2="17" y2="10"
          stroke="currentColor" strokeWidth="2" strokeLinecap="round"
          style={{
            opacity: isOpen ? 0 : 1,
            transform: isOpen ? "scaleX(0)" : "scaleX(1)",
            transition: `opacity ${DS.msFast} ${DS.ease}, transform ${DS.msFast} ${DS.ease}`,
          }}
        />
        <line
          x1="3" y1="15" x2="17" y2="15"
          stroke="currentColor" strokeWidth="2" strokeLinecap="round"
          style={{
            transformOrigin: "center",
            transform: isOpen ? "rotate(-45deg) translateY(-5px)" : "rotate(0deg) translateY(0)",
            transition: `transform ${DS.ms} ${DS.ease}`,
          }}
        />
      </svg>
    </button>
  );
}

/* ─────────────────────────────────────────────────────────────────
   MOBILE PANEL
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
          background: "rgba(5,5,15,0.45)",
          backdropFilter: "blur(4px) saturate(0.8)",
          WebkitBackdropFilter: "blur(4px) saturate(0.8)",
          zIndex: 9998,
          animation: `__backdropIn ${DS.ms} ${DS.ease}`,
        }}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        style={{
          position: "fixed",
          top: 0, right: 0, bottom: 0,
          width: "min(340px, 86vw)",
          background: "rgba(255,255,255,0.97)",
          backdropFilter: "blur(32px) saturate(1.8)",
          WebkitBackdropFilter: "blur(32px) saturate(1.8)",
          borderLeft: "1px solid rgba(37,99,235,0.1)",
          boxShadow: [
            "-12px 0 40px rgba(0,0,0,0.1)",
            "-4px 0 12px rgba(0,0,0,0.05)",
          ].join(", "),
          overflowY: "auto",
          zIndex: 9999,
          animation: `__panelIn ${DS.msSlow} ${DS.easeOut}`,
        }}
      >
        {/* Top accent */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: 0, left: 0, right: 0,
            height: "3px",
            background: DS.accentGrad,
          }}
        />

        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "28px 24px 18px",
            borderBottom: "1px solid rgba(0,0,0,0.05)",
          }}
        >
          <div>
            <div
              style={{
                fontFamily: DS.fontDisplay,
                fontSize: "18px",
                fontWeight: 700,
                color: DS.ink,
                letterSpacing: "-0.03em",
                marginBottom: "3px",
              }}
            >
              Navigation
            </div>
            <div
              style={{
                fontFamily: DS.fontMono,
                fontSize: "11px",
                fontWeight: 400,
                color: DS.inkFaint,
                letterSpacing: "0.02em",
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
              background: "rgba(0,0,0,0.04)",
              border: "1px solid rgba(0,0,0,0.07)",
              borderRadius: "9px",
              cursor: "pointer",
              color: DS.inkMid,
              outline: "none",
              WebkitTapHighlightColor: "transparent",
              touchAction: "manipulation",
              transition: `all ${DS.msFast} ${DS.ease}`,
            }}
          >
            <X size={14} strokeWidth={2.5} />
          </button>
        </div>

        {/* Badge row */}
        <div style={{ padding: "16px 24px 0" }}>
          <AvailabilityBadge />
        </div>

        {/* Content */}
        <div style={{ padding: "16px 18px" }}>
          {/* Main section */}
          <div style={{ marginBottom: "8px" }}>
            <div
              style={{
                fontFamily: DS.fontMono,
                fontSize: "9.5px",
                fontWeight: 500,
                letterSpacing: "0.1em",
                color: DS.inkGhost,
                textTransform: "uppercase",
                padding: "0 8px 10px",
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
              background: "linear-gradient(90deg, transparent, rgba(0,0,0,0.07) 30%, rgba(0,0,0,0.07) 70%, transparent)",
              margin: "12px 8px 16px",
            }}
          />

          {/* More section */}
          <div>
            <div
              style={{
                fontFamily: DS.fontMono,
                fontSize: "9.5px",
                fontWeight: 500,
                letterSpacing: "0.1em",
                color: DS.inkGhost,
                textTransform: "uppercase",
                padding: "0 8px 10px",
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
              padding: "20px 8px 8px",
              animation: `__itemStagger ${DS.msSlow} ${DS.easeOut} ${(PRIMARY.length + SECONDARY.length) * 40}ms backwards`,
            }}
          >
            <button
              onClick={(e) => { e.stopPropagation(); onNavigate("/resume"); }}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "9px",
                width: "100%",
                minHeight: "50px",
                background: DS.accentGrad,
                border: "none",
                borderRadius: "12px",
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
                  "0 4px 16px rgba(37,99,235,0.3)",
                  "0 1px 4px rgba(0,0,0,0.1)",
                  "inset 0 1px 0 rgba(255,255,255,0.15)",
                ].join(", "),
              }}
            >
              <FileText size={16} strokeWidth={2.5} />
              View Resume
              <ArrowUpRight size={15} strokeWidth={2.5} style={{ opacity: 0.85 }} />
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
          ? "linear-gradient(90deg, rgba(37,99,235,0.08) 0%, rgba(124,58,237,0.05) 100%)"
          : press
          ? DS.surfHover
          : "transparent",
        border: active
          ? "1px solid rgba(37,99,235,0.15)"
          : "1px solid transparent",
        borderLeft: active
          ? "3px solid rgba(37,99,235,0.7)"
          : "3px solid transparent",
        borderRadius: "10px",
        cursor: "pointer",
        fontFamily: DS.fontSans,
        fontSize: "15px",
        fontWeight: active ? 600 : 400,
        color: active ? DS.accent : DS.ink,
        textAlign: "left",
        letterSpacing: "-0.015em",
        lineHeight: 1.2,
        transition: `background ${DS.msFast} ${DS.ease}, color ${DS.msFast} ${DS.ease}, border-color ${DS.msFast} ${DS.ease}`,
        outline: "none",
        WebkitTapHighlightColor: "transparent",
        touchAction: "manipulation",
        animation: `__itemStagger ${DS.msSlow} ${DS.easeOut} ${delay}ms backwards`,
      }}
    >
      {Icon
        ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "28px",
              height: "28px",
              background: active
                ? "rgba(37,99,235,0.1)"
                : "rgba(0,0,0,0.03)",
              borderRadius: "7px",
              flexShrink: 0,
              border: active ? "1px solid rgba(37,99,235,0.2)" : "1px solid transparent",
            }}
          >
            <Icon size={14} strokeWidth={1.75} style={{ opacity: active ? 1 : 0.4 }} />
          </div>
        )
        : <span style={{ width: "28px", flexShrink: 0 }} />
      }
      {label}
      {active && (
        <span
          style={{
            marginLeft: "auto",
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            background: DS.accentGrad,
            boxShadow: "0 0 6px rgba(37,99,235,0.5)",
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

  const prevY             = useRef(0);
  const rafId             = useRef(null);
  const moreRef           = useRef(null);
  const navContainerRef   = useRef(null);
  const itemRefs          = useRef([]);

  const isMobile       = useMQ("(max-width: 1023px)");
  const isTiny         = useMQ("(max-width: 599px)");
  const scrollProgress = useScrollProgress();
  const activeSection  = useScrollSpy(PRIMARY);

  const route       = location.pathname === "/" ? "/home" : location.pathname;
  const spyPath     = activeSection ? PRIMARY.find(p => p.sectionId === activeSection)?.path : null;
  const activePath  = spyPath ?? route;
  const activeIndex = PRIMARY.findIndex(p => p.path === activePath);

  /* ── Scroll hide/show ── */
  useEffect(() => {
    const onScroll = () => {
      if (rafId.current) return;
      rafId.current = requestAnimationFrame(() => {
        const y = window.scrollY;
        setScrolled(y > 24);
        if (isMobile) {
          if      (y < 8)                  setVisible(true);
          else if (y < prevY.current - 2)  setVisible(true);
          else if (y > prevY.current + 2 && y > 60) setVisible(false);
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
  const navH   = scrolled ? (isTiny ? "60px" : "66px") : (isTiny ? "68px" : "76px");
  const bg     = scrolled
    ? "rgba(255,255,255,0.94)"
    : "rgba(255,255,255,0.82)";
  const border = scrolled ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.6)";
  const blur   = scrolled ? "blur(24px) saturate(1.8)" : "blur(12px) saturate(1.4)";
  const shadow = scrolled
    ? [
        "0 1px 0 rgba(0,0,0,0.06)",
        "0 4px 24px rgba(0,0,0,0.06)",
        "0 1px 3px rgba(0,0,0,0.04)",
      ].join(", ")
    : "none";
  const padX   = isTiny ? "18px" : "40px";

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
          ].join(", "),
          zIndex: 8000,
          isolation: "isolate",
        }}
      >
        {/* Ambient top glow */}
        <AmbientGlow visible={scrolled} />

        {/* Inner top highlight */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "1px",
            background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.9) 30%, rgba(255,255,255,0.9) 70%, transparent 100%)",
            opacity: scrolled ? 0.7 : 0.9,
            transition: `opacity ${DS.ms} ${DS.ease}`,
            pointerEvents: "none",
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

          {/* Center — Primary nav (absolutely centered) */}
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
                gap: "0",
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
                />
              ))}
            </div>
          )}

          {/* Right — Desktop controls */}
          <div
            style={{
              marginLeft: "auto",
              display: "flex",
              alignItems: "center",
              gap: "6px",
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
                    background: "linear-gradient(180deg, transparent, rgba(0,0,0,0.12), transparent)",
                    margin: "0 4px",
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

      {/* Mobile panel */}
      {isMobile && (
        <MobilePanel
          open={mobileOpen}
          currentRoute={route}
          onNavigate={go}
          onClose={() => setMobileOpen(false)}
        />
      )}

      {/* Command palette */}
      <CommandPalette
        open={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        onNavigate={go}
      />
    </>
  );
}