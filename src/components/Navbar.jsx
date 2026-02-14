"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ChevronDown, Menu, X, FileText,
  GraduationCap, Trophy, Shield, Award,
} from "lucide-react";

/* ─────────────────────────────────────────────────────────────────
   DESIGN SYSTEM
   Every value is intentional. Nothing is decorative.
───────────────────────────────────────────────────────────────── */
const DS = {
  // Palette — derived from Vercel/Linear's restraint
  white:       "#ffffff",
  ink:         "#0d0d0d",        // near-black, softer than pure #000
  inkMid:      "#454545",        // secondary text
  inkFaint:    "#8c8c96",        // tertiary / labels
  inkGhost:    "#c8c8d0",        // decorative lines
  accent:      "#0066ff",        // single saturated accent
  accentPress: "#004fd6",

  // Surface states
  surfHover:  "rgba(0,0,0,0.032)",
  surfActive: "rgba(0,102,255,0.055)",

  // Type
  fontSans: "'DM Sans', system-ui, sans-serif",
  fontMono: "'DM Mono', ui-monospace, monospace",

  // Motion — tight and intentional
  ease:   "cubic-bezier(0.16, 1, 0.3, 1)",
  ms:     "190ms",
  msFast: "140ms",

  // Grid helper
  sp: (n) => `${n * 8}px`,
};

/* ─────────────────────────────────────────────────────────────────
   NAV STRUCTURE
───────────────────────────────────────────────────────────────── */
const PRIMARY = [
  { label: "About",      path: "/home"        },
  { label: "Skills",     path: "/myskills"    },
  { label: "Projects",   path: "/projects"    },
  { label: "Experience", path: "/internships" },
  { label: "Contact",    path: "/contact"     },
];

const SECONDARY = [
  { label: "Education",      path: "/education",      Icon: GraduationCap },
  { label: "Certifications", path: "/certifications", Icon: Shield        },
  { label: "Competitions",   path: "/hackathons",     Icon: Trophy        },
  { label: "Achievements",   path: "/achivements",    Icon: Award         },
  { label: "Workshops",      path: "/workshops",      Icon: FileText      },
  { label: "Beyond Academics", path: "/beyondcoding", Icon: FileText      },
  { label: "Resume",         path: "/resume",         Icon: FileText      },
];

/* ─────────────────────────────────────────────────────────────────
   GLOBAL STYLES
───────────────────────────────────────────────────────────────── */
const GLOBAL = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&family=DM+Mono:wght@400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  @keyframes __menuIn {
    from { opacity: 0; transform: translateY(-5px) scale(0.985); }
    to   { opacity: 1; transform: translateY(0)    scale(1);     }
  }
  @keyframes __sheetIn {
    from { transform: translateY(100%); }
    to   { transform: translateY(0);    }
  }
  @keyframes __backdropIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }

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

/* ─────────────────────────────────────────────────────────────────
   LOGO
   Typographic only. The "./" is a quiet engineering signal.
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
        gap: "1px",
        lineHeight: 1,
        opacity: hov ? 0.55 : 1,
        transition: `opacity ${DS.msFast} ${DS.ease}`,
        outline: "none",
      }}
    >
      <span style={{
        fontFamily: DS.fontMono,
        fontSize: "12.5px",
        fontWeight: 400,
        color: DS.inkFaint,
        letterSpacing: "0",
        userSelect: "none",
      }}>
        ./
      </span>
      <span style={{
        fontFamily: DS.fontSans,
        fontSize: "14.5px",
        fontWeight: 600,
        color: DS.ink,
        letterSpacing: "-0.03em",
        userSelect: "none",
      }}>
        bhagavan
      </span>
    </button>
  );
}

/* ─────────────────────────────────────────────────────────────────
   NAV ITEM
   Active = weight 500, full color, visible underline.
   Hover  = color shift + partial underline preview.
   No pill. No background fill. Typography does the work.
───────────────────────────────────────────────────────────────── */
function NavItem({ label, active, onClick }) {
  const [hov, setHov] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      aria-current={active ? "page" : undefined}
      style={{
        position: "relative",
        padding: `${DS.sp(1)} ${DS.sp(1.75)}`,
        background: "none",
        border: "none",
        cursor: "pointer",
        fontFamily: DS.fontSans,
        fontSize: "13.5px",
        fontWeight: active ? 500 : 400,
        color: active ? DS.ink : hov ? DS.inkMid : DS.inkFaint,
        letterSpacing: "-0.01em",
        lineHeight: 1,
        whiteSpace: "nowrap",
        transition: `color ${DS.ms} ${DS.ease}`,
        outline: "none",
      }}
    >
      {label}

      {/* Underline — center-out animation */}
      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: "2px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "block",
          height: "1.5px",
          width: active ? "calc(100% - 28px)" : hov ? "38%" : "0",
          background: active ? DS.ink : DS.inkGhost,
          borderRadius: "1px",
          transition: `width ${DS.ms} ${DS.ease}`,
        }}
      />
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
        background: "none",
        border: "none",
        cursor: "pointer",
        fontFamily: DS.fontSans,
        fontSize: "13.5px",
        fontWeight: 400,
        color: open ? DS.inkMid : hov ? DS.inkMid : DS.inkFaint,
        letterSpacing: "-0.01em",
        lineHeight: 1,
        transition: `color ${DS.ms} ${DS.ease}`,
        outline: "none",
      }}
    >
      More
      <ChevronDown
        size={12}
        strokeWidth={2}
        style={{
          transform: open ? "rotate(180deg)" : "rotate(0deg)",
          transition: `transform ${DS.ms} ${DS.ease}`,
          opacity: 0.45,
        }}
      />
    </button>
  );
}

/* ─────────────────────────────────────────────────────────────────
   COMMAND MENU DROPDOWN
   Feels like a product command palette, not a website dropdown.
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
        top: "calc(100% + 8px)",
        right: 0,
        minWidth: "208px",
        background: DS.white,
        border: "1px solid rgba(0,0,0,0.09)",
        borderRadius: "10px",
        boxShadow: "0 4px 24px rgba(0,0,0,0.07), 0 1px 2px rgba(0,0,0,0.04)",
        overflow: "hidden",
        animation: `__menuIn ${DS.ms} ${DS.ease}`,
        zIndex: 300,
      }}
    >
      {/* Section label */}
      <div style={{
        padding: `${DS.sp(1.25)} ${DS.sp(2)} ${DS.sp(1)}`,
        fontFamily: DS.fontMono,
        fontSize: "10px",
        fontWeight: 500,
        color: DS.inkGhost,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        borderBottom: "1px solid rgba(0,0,0,0.05)",
      }}>
        Pages
      </div>

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
        gap: DS.sp(1.25),
        width: "100%",
        padding: `${DS.sp(1.125)} ${DS.sp(2)}`,
        background: active ? DS.surfActive : hov ? DS.surfHover : "transparent",
        border: "none",
        cursor: "pointer",
        fontFamily: DS.fontSans,
        fontSize: "13px",
        fontWeight: active ? 500 : 400,
        color: active ? DS.accent : hov ? DS.ink : DS.inkMid,
        textAlign: "left",
        letterSpacing: "-0.01em",
        lineHeight: 1,
        transition: `background ${DS.msFast} ${DS.ease}, color ${DS.msFast} ${DS.ease}`,
        outline: "none",
      }}
    >
      <Icon
        size={13}
        strokeWidth={1.75}
        style={{ flexShrink: 0, opacity: active ? 0.9 : 0.38 }}
      />
      {label}
      {active && (
        <span style={{
          marginLeft: "auto",
          width: "4px",
          height: "4px",
          borderRadius: "50%",
          background: DS.accent,
          flexShrink: 0,
        }} />
      )}
    </button>
  );
}

/* ─────────────────────────────────────────────────────────────────
   RESUME CTA
   Solid fill. No gradient. No shadow. Scale on press.
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
        padding: "7px 14px",
        background: DS.accent,
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
        fontFamily: DS.fontSans,
        fontSize: "13px",
        fontWeight: 500,
        color: "#fff",
        letterSpacing: "-0.01em",
        lineHeight: 1,
        opacity: hov && !press ? 0.88 : 1,
        transform: press ? "scale(0.965)" : "scale(1)",
        transition: `opacity ${DS.msFast} ${DS.ease}, transform ${DS.msFast} ${DS.ease}`,
        outline: "none",
      }}
    >
      <FileText size={12} strokeWidth={2.5} />
      Resume
    </button>
  );
}

/* ─────────────────────────────────────────────────────────────────
   HAMBURGER - IMPROVED FOR MOBILE
───────────────────────────────────────────────────────────────── */
function HamburgerButton({ onClick, isOpen }) {
  const [press, setPress] = useState(false);

  const handleClick = (e) => {
    e.stopPropagation();
    onClick();
  };

  return (
    <button
      onClick={handleClick}
      onMouseDown={() => setPress(true)}
      onMouseUp={() => setPress(false)}
      onMouseLeave={() => setPress(false)}
      aria-label={isOpen ? "Close navigation" : "Open navigation"}
      aria-expanded={isOpen}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "40px",
        height: "40px",
        background: press || isOpen ? DS.surfActive : "transparent",
        border: `1.5px solid ${press || isOpen ? DS.accent + "40" : "rgba(0,0,0,0.08)"}`,
        borderRadius: "8px",
        cursor: "pointer",
        color: press || isOpen ? DS.accent : DS.inkMid,
        transform: press ? "scale(0.92)" : "scale(1)",
        transition: `all ${DS.msFast} ${DS.ease}`,
        outline: "none",
        WebkitTapHighlightColor: "transparent",
        touchAction: "manipulation",
      }}
    >
      {isOpen ? <X size={19} strokeWidth={2} /> : <Menu size={19} strokeWidth={2} />}
    </button>
  );
}

/* ─────────────────────────────────────────────────────────────────
   MOBILE BOTTOM SHEET - FIXED ROUTING
   iOS Settings-sheet feel. Sparse. Touch-native.
───────────────────────────────────────────────────────────────── */
function BottomSheet({ open, currentRoute, onNavigate, onClose }) {
  const startY  = useRef(0);
  const [dragY, setDragY] = useState(0);
  const [drag,  setDrag]  = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const fn = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", fn);
    return () => document.removeEventListener("keydown", fn);
  }, [open, onClose]);

  const onTouchStart = (e) => { startY.current = e.touches[0].clientY; setDrag(true);  };
  const onTouchMove  = (e) => { const d = e.touches[0].clientY - startY.current; if (d > 0) setDragY(d); };
  const onTouchEnd   = ()  => { setDrag(false); if (dragY > 72) onClose(); setDragY(0); };

  if (!open) return null;

  return (
    <>
      {/* Scrim */}
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.26)",
          zIndex: 9998,
          animation: `__backdropIn ${DS.ms} ${DS.ease}`,
        }}
      />

      {/* Sheet */}
      <div
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation"
        style={{
          position: "fixed",
          left: 0, right: 0, bottom: 0,
          maxHeight: "88vh",
          background: DS.white,
          borderTopLeftRadius: "14px",
          borderTopRightRadius: "14px",
          borderTop: "1px solid rgba(0,0,0,0.07)",
          overflowY: "auto",
          paddingBottom: "env(safe-area-inset-bottom, 20px)",
          zIndex: 9999,
          animation: drag ? "none" : `__sheetIn ${DS.ms} ${DS.ease}`,
          transform: `translateY(${dragY}px)`,
          transition: drag ? "none" : `transform ${DS.ms} ${DS.ease}`,
        }}
      >
        {/* Drag pill */}
        <div style={{ display: "flex", justifyContent: "center", padding: "12px 0 6px" }}>
          <div style={{ width: "36px", height: "4px", borderRadius: "2px", background: "rgba(0,0,0,0.1)" }} />
        </div>

        {/* Header */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: `${DS.sp(1)} ${DS.sp(3)} ${DS.sp(2)}`,
          borderBottom: "1px solid rgba(0,0,0,0.05)",
        }}>
          <span style={{
            fontFamily: DS.fontSans,
            fontSize: "14px",
            fontWeight: 600,
            color: DS.ink,
            letterSpacing: "-0.02em",
          }}>
            Navigation
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            aria-label="Close"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "28px",
              height: "28px",
              background: "rgba(0,0,0,0.04)",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              color: DS.inkMid,
              outline: "none",
              WebkitTapHighlightColor: "transparent",
            }}
          >
            <X size={14} strokeWidth={2} />
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: `${DS.sp(2)} ${DS.sp(2)} ${DS.sp(1)}` }}>

          {/* Primary */}
          <SheetGroupLabel>Main</SheetGroupLabel>
          {PRIMARY.map(({ label, path }) => (
            <SheetRow
              key={path}
              label={label}
              active={currentRoute === path}
              onClick={() => onNavigate(path)}
            />
          ))}

          <div style={{ height: "1px", background: "rgba(0,0,0,0.05)", margin: `${DS.sp(1.5)} ${DS.sp(1)}` }} />

          {/* Secondary */}
          <SheetGroupLabel>More</SheetGroupLabel>
          {SECONDARY.map(({ label, path, Icon }) => (
            <SheetRow
              key={path}
              label={label}
              Icon={Icon}
              active={currentRoute === path}
              onClick={() => onNavigate(path)}
            />
          ))}

          {/* CTA */}
          <div style={{ padding: `${DS.sp(2)} ${DS.sp(1)} ${DS.sp(1)}` }}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onNavigate("/resume");
              }}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                width: "100%",
                minHeight: "44px",
                background: DS.accent,
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontFamily: DS.fontSans,
                fontSize: "14px",
                fontWeight: 500,
                color: "#fff",
                letterSpacing: "-0.01em",
                outline: "none",
                WebkitTapHighlightColor: "transparent",
              }}
            >
              <FileText size={15} strokeWidth={2} />
              View Resume
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

function SheetGroupLabel({ children }) {
  return (
    <p style={{
      fontFamily: DS.fontMono,
      fontSize: "10px",
      fontWeight: 500,
      letterSpacing: "0.07em",
      color: DS.inkGhost,
      textTransform: "uppercase",
      padding: `0 ${DS.sp(1)} ${DS.sp(0.75)}`,
    }}>
      {children}
    </p>
  );
}

function SheetRow({ label, Icon, active, onClick }) {
  const [press, setPress] = useState(false);

  const handleClick = (e) => {
    e.stopPropagation();
    setPress(false);
    onClick();
  };

  return (
    <button
      onClick={handleClick}
      onMouseDown={() => setPress(true)}
      onMouseUp={() => setPress(false)}
      onMouseLeave={() => setPress(false)}
      aria-current={active ? "page" : undefined}
      style={{
        display: "flex",
        alignItems: "center",
        gap: DS.sp(1.5),
        width: "100%",
        minHeight: "44px",
        padding: `${DS.sp(1.25)} ${DS.sp(1)}`,
        marginBottom: "1px",
        background: active ? DS.surfActive : press ? DS.surfHover : "transparent",
        border: active ? "1px solid rgba(0,102,255,0.1)" : "1px solid transparent",
        borderRadius: "8px",
        cursor: "pointer",
        fontFamily: DS.fontSans,
        fontSize: "14px",
        fontWeight: active ? 500 : 400,
        color: active ? DS.accent : DS.ink,
        textAlign: "left",
        letterSpacing: "-0.01em",
        lineHeight: 1,
        transition: `background ${DS.msFast} ${DS.ease}, color ${DS.msFast} ${DS.ease}`,
        outline: "none",
        WebkitTapHighlightColor: "transparent",
        touchAction: "manipulation",
      }}
    >
      {Icon
        ? <Icon size={16} strokeWidth={1.75} style={{ flexShrink: 0, opacity: active ? 0.9 : 0.32 }} />
        : <span style={{ width: "16px", flexShrink: 0 }} />
      }
      {label}
      {active && (
        <span style={{
          marginLeft: "auto",
          width: "5px",
          height: "5px",
          borderRadius: "50%",
          background: DS.accent,
          flexShrink: 0,
        }} />
      )}
    </button>
  );
}

/* ─────────────────────────────────────────────────────────────────
   ROOT NAVBAR
───────────────────────────────────────────────────────────────── */
export default function Navbar() {
  const location = useLocation();
  const navigate  = useNavigate();

  const [scrolled,   setScrolled]   = useState(false);
  const [visible,    setVisible]    = useState(true);
  const [moreOpen,   setMoreOpen]   = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const prevY   = useRef(0);
  const rafId   = useRef(null);
  const moreRef = useRef(null);

  const isMobile = useMQ("(max-width: 1023px)");
  const isTiny   = useMQ("(max-width: 599px)");

  const route = location.pathname === "/" ? "/home" : location.pathname;

  /* ── Scroll ── */
  useEffect(() => {
    const onScroll = () => {
      if (rafId.current) return;
      rafId.current = requestAnimationFrame(() => {
        const y = window.scrollY;
        setScrolled(y > 20);

        if (isMobile) {
          if      (y < 8)                setVisible(true);
          else if (y < prevY.current - 2) setVisible(true);
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

  /* ── Outside click ── */
  useEffect(() => {
    if (!moreOpen) return;
    const fn = (e) => {
      if (moreRef.current && !moreRef.current.contains(e.target)) setMoreOpen(false);
    };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, [moreOpen]);

  /* ── Route change ── */
  useEffect(() => {
    setMoreOpen(false);
    setMobileOpen(false);
  }, [location.pathname]);

  const go = useCallback((path) => {
    if (!path) {
      setMobileOpen(false);
      return;
    }
    
    // Close mobile menu first
    setMobileOpen(false);
    setMoreOpen(false);
    
    // Navigate
    navigate(path);
    
    // Scroll to top after a brief delay
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 100);
  }, [navigate]);

  /* ── Computed values ── */
  const navH   = scrolled ? (isTiny ? "56px" : "62px") : (isTiny ? "62px" : "72px");
  const bg     = scrolled ? "rgba(255,255,255,0.94)" : "rgba(255,255,255,0.82)";
  const border = scrolled ? "rgba(0,0,0,0.07)"       : "rgba(0,0,0,0)";
  const blur   = scrolled ? "blur(12px)"              : "blur(6px)";
  const padX   = isTiny   ? "20px"                    : "40px";

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
          transform: visible ? "translateY(0)" : "translateY(-100%)",
          transition: [
            `height ${DS.ms} ${DS.ease}`,
            `background ${DS.ms} ${DS.ease}`,
            `border-color ${DS.ms} ${DS.ease}`,
            `transform ${DS.ms} ${DS.ease}`,
          ].join(", "),
          zIndex: 8000,
        }}
      >
        <div style={{
          maxWidth: "1280px",
          height: "100%",
          margin: "0 auto",
          padding: `0 ${padX}`,
          display: "flex",
          alignItems: "center",
          position: "relative",
        }}>

          {/* Left — Logo */}
          <Logo onClick={() => go("/home")} />

          {/* Center — Primary nav (absolutely centered) */}
          {!isMobile && (
            <div style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              display: "flex",
              alignItems: "center",
              gap: "0px",
            }}>
              {PRIMARY.map(({ label, path }) => (
                <NavItem
                  key={path}
                  label={label}
                  active={route === path}
                  onClick={() => go(path)}
                />
              ))}
            </div>
          )}

          {/* Right — More + divider + CTA */}
          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: DS.sp(0.75) }}>
            {!isMobile && (
              <>
                {/* More dropdown */}
                <div ref={moreRef} style={{ position: "relative" }}>
                  <MoreTrigger
                    open={moreOpen}
                    onClick={() => setMoreOpen(p => !p)}
                  />
                  <CommandMenu
                    open={moreOpen}
                    currentRoute={route}
                    onSelect={(p) => { setMoreOpen(false); if (p) go(p); }}
                  />
                </div>

                {/* Pipe divider */}
                <span aria-hidden="true" style={{
                  display: "inline-block",
                  width: "1px",
                  height: "16px",
                  background: DS.inkGhost,
                  margin: `0 ${DS.sp(0.5)}`,
                  opacity: 0.4,
                }} />

                <ResumeButton onClick={() => go("/resume")} />
              </>
            )}

            {isMobile && (
              <HamburgerButton 
                onClick={() => setMobileOpen(prev => !prev)} 
                isOpen={mobileOpen}
              />
            )}
          </div>
        </div>
      </nav>

      {/* Mobile sheet */}
      {isMobile && (
        <BottomSheet
          open={mobileOpen}
          currentRoute={route}
          onNavigate={go}
          onClose={() => setMobileOpen(false)}
        />
      )}
    </>
  );
}