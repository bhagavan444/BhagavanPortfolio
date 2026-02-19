"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ChevronDown, FileText,
  GraduationCap, Trophy, Shield, Award,
  ArrowUpRight, Github, Mail, Command,
  Search, X
} from "lucide-react";

/* ─────────────────────────────────────────────────────────────────
   DESIGN SYSTEM
───────────────────────────────────────────────────────────────── */
const DS = {
  white:       "#ffffff",
  ink:         "#0d0d0d",
  inkMid:      "#454545",
  inkFaint:    "#8c8c96",
  inkGhost:    "#c8c8d0",
  accent:      "#0066ff",
  accentSoft:  "rgba(0,102,255,0.08)",
  accentPress: "#004fd6",

  surfHover:  "rgba(0,0,0,0.032)",
  surfActive: "rgba(0,102,255,0.055)",

  fontSans: "'DM Sans', system-ui, sans-serif",
  fontMono: "'DM Mono', ui-monospace, monospace",

  ease:    "cubic-bezier(0.16, 1, 0.3, 1)",
  easeOut: "cubic-bezier(0.33, 1, 0.68, 1)",
  ms:      "190ms",
  msFast:  "140ms",
  msSlow:  "280ms",

  sp: (n) => `${n * 8}px`,
};

/* ─────────────────────────────────────────────────────────────────
   NAV STRUCTURE
───────────────────────────────────────────────────────────────── */
const PRIMARY = [
  { label: "About",      path: "/home",       sectionId: "home"        },
  { label: "Skills",     path: "/myskills",   sectionId: "myskills"    },
  { label: "Projects",   path: "/projects",   sectionId: "projects"    },
  { label: "Experience", path: "/internships",sectionId: "internships" },
  { label: "Contact",    path: "/contact",    sectionId: "contact"     },
];

const SECONDARY = [
  { label: "Education",       path: "/education",      Icon: GraduationCap },
  { label: "Certifications",  path: "/certifications", Icon: Shield        },
  { label: "Competitions",    path: "/hackathons",     Icon: Trophy        },
  { label: "Achievements",    path: "/achivements",    Icon: Award         },
  { label: "Workshops",       path: "/workshops",      Icon: FileText      },
  { label: "Beyond Academics",path: "/beyondcoding",   Icon: FileText      },
  { label: "Resume",          path: "/resume",         Icon: FileText      },
];

const PALETTE_ITEMS = [
  { label: "View Resume",     shortcut: "R",  Icon: FileText,      action: "resume"   },
  { label: "GitHub",          shortcut: "G",  Icon: Github,        action: "github"   },
  { label: "Email Me",        shortcut: "E",  Icon: Mail,          action: "email"    },
  { label: "About",           shortcut: "1",  Icon: ArrowUpRight,  action: "/home"    },
  { label: "Projects",        shortcut: "2",  Icon: ArrowUpRight,  action: "/projects"},
  { label: "Experience",      shortcut: "3",  Icon: ArrowUpRight,  action: "/internships"},
  { label: "Contact",         shortcut: "4",  Icon: ArrowUpRight,  action: "/contact" },
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
  @keyframes __panelIn {
    from { transform: translateX(100%); }
    to   { transform: translateX(0);    }
  }
  @keyframes __backdropIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes __itemStagger {
    from { opacity: 0; transform: translateX(12px); }
    to   { opacity: 1; transform: translateX(0);    }
  }
  @keyframes __paletteIn {
    from { opacity: 0; transform: translateY(-8px) scale(0.97); }
    to   { opacity: 1; transform: translateY(0)    scale(1);    }
  }
  @keyframes __pulseRing {
    0%   { transform: scale(1);   opacity: 0.7; }
    70%  { transform: scale(2.2); opacity: 0;   }
    100% { transform: scale(2.2); opacity: 0;   }
  }
  @keyframes __progressGrow {
    from { opacity: 0; }
    to   { opacity: 1; }
  }

  .nav-item-magnetic:hover {
    transform: translateY(-1px);
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

function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const scrollTop = window.scrollY;
      const scrollHeight = doc.scrollHeight - doc.clientHeight;
      setProgress(scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return progress;
}

/* Scroll spy — returns the path of the section currently in viewport */
function useScrollSpy(items) {
  const [activeSection, setActiveSection] = useState(null);

  useEffect(() => {
    const ids = items.map(i => i.sectionId).filter(Boolean);
    if (ids.length === 0) return;

    const onScroll = () => {
      // Find the section whose top is closest to (but still above) 40% viewport height
      const threshold = window.innerHeight * 0.4;
      let best = null;
      let bestTop = -Infinity;

      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        // Section is "active" when its top is above the threshold
        if (rect.top <= threshold && rect.top > bestTop) {
          bestTop = rect.top;
          best = id;
        }
      }
      setActiveSection(best);
    };

    // Run once on mount
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [items]);

  return activeSection;
}

/* ─────────────────────────────────────────────────────────────────
   SCROLL PROGRESS BAR
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
        background: "rgba(0,0,0,0.06)",
        overflow: "hidden",
        opacity: visible && progress > 1 ? 1 : 0,
        transition: `opacity ${DS.ms} ${DS.ease}`,
      }}
    >
      <div
        style={{
          height: "100%",
          width: `${progress}%`,
          background: DS.accent,
          borderRadius: "0 2px 2px 0",
          transition: "width 80ms linear",
          boxShadow: `0 0 8px ${DS.accent}55`,
        }}
      />
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   AVAILABILITY BADGE (with pulse + tooltip)
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
          gap: "6px",
          padding: "4px 9px 4px 7px",
          background: "rgba(16,185,129,0.07)",
          border: "1px solid rgba(16,185,129,0.18)",
          borderRadius: "20px",
          cursor: "default",
          userSelect: "none",
        }}
      >
        {/* Pulsing dot */}
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
            }}
          />
        </div>
        <span style={{
          fontFamily: DS.fontSans,
          fontSize: "11.5px",
          fontWeight: 500,
          color: "#0d9c6e",
          letterSpacing: "-0.01em",
          lineHeight: 1,
        }}>
          Available
        </span>
      </div>

      {/* Tooltip */}
      {showTip && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 8px)",
            left: "50%",
            transform: "translateX(-50%)",
            whiteSpace: "nowrap",
            background: DS.ink,
            color: "#fff",
            fontFamily: DS.fontSans,
            fontSize: "11.5px",
            fontWeight: 400,
            letterSpacing: "-0.01em",
            padding: "5px 10px",
            borderRadius: "6px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.18)",
            pointerEvents: "none",
            animation: `__menuIn ${DS.msFast} ${DS.ease}`,
            zIndex: 9999,
          }}
        >
          Open to full-time roles · 2026 Graduate
          {/* Arrow */}
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
        G S S S BHAGAVAN
      </span>
    </button>
  );
}

/* ─────────────────────────────────────────────────────────────────
   SLIDING INDICATOR
   A single absolutely-positioned line that glides between nav items.
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
    const HPAD  = 14; // matches `DS.sp(1.75)` = 14px
    setPos({
      opacity: 1,
      left:  iRect.left  - cRect.left + HPAD,
      width: iRect.width - HPAD * 2,
    });
  }, [activeIndex, itemRefs, containerRef]);

  return (
    <span
      aria-hidden="true"
      style={{
        position:   "absolute",
        bottom:     "2px",
        left:       `${pos.left}px`,
        width:      `${pos.width}px`,
        height:     "1.5px",
        background: DS.ink,
        borderRadius: "1px",
        opacity:    pos.opacity,
        transition: [
          `left  260ms ${DS.ease}`,
          `width 260ms ${DS.ease}`,
          `opacity 180ms ${DS.ease}`,
        ].join(", "),
        pointerEvents: "none",
        zIndex: 1,
      }}
    />
  );
}

/* ─────────────────────────────────────────────────────────────────
   NAV ITEM
   Active underline is handled by SlidingIndicator above the group.
   Per-item: only the hover ghost underline lives here.
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
      className="nav-item-magnetic"
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
        transition: `color ${DS.ms} ${DS.ease}, transform ${DS.ms} ${DS.ease}`,
        outline: "none",
      }}
    >
      {label}
      {/* Hover ghost preview — hidden when active (SlidingIndicator handles that) */}
      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: "2px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "block",
          height: "1.5px",
          width: !active && hov ? "38%" : "0",
          background: DS.inkGhost,
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
      <Icon size={13} strokeWidth={1.75} style={{ flexShrink: 0, opacity: active ? 0.9 : 0.38 }} />
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
   COMMAND PALETTE OVERLAY (Ctrl+K / /)
───────────────────────────────────────────────────────────────── */
function CommandPalette({ open, onClose, onNavigate }) {
  const [query, setQuery] = useState("");
  const [selectedIdx, setSelectedIdx] = useState(0);
  const inputRef = useRef(null);

  const filtered = query.trim()
    ? PALETTE_ITEMS.filter(i => i.label.toLowerCase().includes(query.toLowerCase()))
    : PALETTE_ITEMS;

  useEffect(() => {
    setSelectedIdx(0);
  }, [query]);

  useEffect(() => {
    if (open) {
      setQuery("");
      setSelectedIdx(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  useEffect(() => {
    const fn = (e) => {
      if (!open) return;
      if (e.key === "Escape") { onClose(); return; }
      if (e.key === "ArrowDown") { e.preventDefault(); setSelectedIdx(i => Math.min(i + 1, filtered.length - 1)); }
      if (e.key === "ArrowUp")   { e.preventDefault(); setSelectedIdx(i => Math.max(i - 1, 0)); }
      if (e.key === "Enter" && filtered[selectedIdx]) {
        e.preventDefault();
        handleAction(filtered[selectedIdx].action);
      }
    };
    document.addEventListener("keydown", fn);
    return () => document.removeEventListener("keydown", fn);
  }, [open, filtered, selectedIdx]);

  const handleAction = useCallback((action) => {
    onClose();
    if (action === "github")  { window.open("https://github.com", "_blank"); return; }
    if (action === "email")   { window.location.href = "mailto:bhagavan@example.com"; return; }
    if (action === "resume")  { onNavigate("/resume"); return; }
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
          backdropFilter: "blur(3px)",
          WebkitBackdropFilter: "blur(3px)",
          zIndex: 9990,
          animation: `__backdropIn ${DS.msFast} ${DS.ease}`,
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
          width: "min(540px, 90vw)",
          background: DS.white,
          border: "1px solid rgba(0,0,0,0.1)",
          borderRadius: "14px",
          boxShadow: "0 20px 60px rgba(0,0,0,0.15), 0 4px 12px rgba(0,0,0,0.07)",
          overflow: "hidden",
          zIndex: 9991,
          animation: `__paletteIn ${DS.ms} ${DS.ease}`,
        }}
      >
        {/* Search bar */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: DS.sp(1.5),
          padding: `${DS.sp(2)} ${DS.sp(2.5)}`,
          borderBottom: "1px solid rgba(0,0,0,0.06)",
        }}>
          <Search size={15} strokeWidth={2} style={{ color: DS.inkFaint, flexShrink: 0 }} />
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
              color: DS.ink,
              letterSpacing: "-0.01em",
              background: "transparent",
              lineHeight: 1,
            }}
          />
          <kbd style={{
            fontFamily: DS.fontMono,
            fontSize: "10px",
            color: DS.inkFaint,
            background: "rgba(0,0,0,0.05)",
            border: "1px solid rgba(0,0,0,0.1)",
            borderRadius: "4px",
            padding: "3px 6px",
            lineHeight: 1,
          }}>
            ESC
          </kbd>
        </div>

        {/* Results */}
        <div style={{ padding: `${DS.sp(1)} 0 ${DS.sp(1)}` }}>
          <div style={{
            padding: `${DS.sp(0.75)} ${DS.sp(2.5)} ${DS.sp(0.5)}`,
            fontFamily: DS.fontMono,
            fontSize: "10px",
            fontWeight: 500,
            color: DS.inkGhost,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}>
            {query ? `Results for "${query}"` : "Quick actions"}
          </div>

          {filtered.length === 0 && (
            <div style={{
              padding: `${DS.sp(3)} ${DS.sp(2.5)}`,
              fontFamily: DS.fontSans,
              fontSize: "14px",
              color: DS.inkFaint,
              textAlign: "center",
            }}>
              No results found
            </div>
          )}

          {filtered.map((item, i) => (
            <PaletteRow
              key={item.action}
              item={item}
              selected={i === selectedIdx}
              onHover={() => setSelectedIdx(i)}
              onClick={() => handleAction(item.action)}
            />
          ))}
        </div>

        {/* Footer hint */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: DS.sp(2),
          padding: `${DS.sp(1.25)} ${DS.sp(2.5)}`,
          borderTop: "1px solid rgba(0,0,0,0.06)",
          background: "rgba(0,0,0,0.016)",
        }}>
          {[
            ["↑↓", "navigate"],
            ["↵", "select"],
            ["esc", "dismiss"],
          ].map(([key, desc]) => (
            <div key={key} style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <kbd style={{
                fontFamily: DS.fontMono,
                fontSize: "10px",
                color: DS.inkFaint,
                background: DS.white,
                border: "1px solid rgba(0,0,0,0.1)",
                borderRadius: "4px",
                padding: "2px 5px",
                lineHeight: 1.4,
              }}>{key}</kbd>
              <span style={{
                fontFamily: DS.fontSans,
                fontSize: "11px",
                color: DS.inkGhost,
                lineHeight: 1,
              }}>{desc}</span>
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
        gap: DS.sp(1.5),
        width: "100%",
        padding: `${DS.sp(1.25)} ${DS.sp(2.5)}`,
        background: selected ? DS.surfActive : "transparent",
        border: "none",
        cursor: "pointer",
        fontFamily: DS.fontSans,
        fontSize: "14px",
        fontWeight: selected ? 500 : 400,
        color: selected ? DS.accent : DS.inkMid,
        textAlign: "left",
        letterSpacing: "-0.01em",
        lineHeight: 1,
        transition: `background ${DS.msFast} ${DS.ease}, color ${DS.msFast} ${DS.ease}`,
        outline: "none",
      }}
    >
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "26px",
        height: "26px",
        background: selected ? "rgba(0,102,255,0.1)" : "rgba(0,0,0,0.04)",
        borderRadius: "6px",
        flexShrink: 0,
      }}>
        <Icon size={13} strokeWidth={1.75} style={{ opacity: selected ? 1 : 0.5 }} />
      </div>
      {label}
      <kbd style={{
        marginLeft: "auto",
        fontFamily: DS.fontMono,
        fontSize: "10px",
        color: DS.inkGhost,
        background: "rgba(0,0,0,0.04)",
        border: "1px solid rgba(0,0,0,0.08)",
        borderRadius: "4px",
        padding: "2px 6px",
        lineHeight: 1.4,
        flexShrink: 0,
      }}>
        {shortcut}
      </kbd>
    </button>
  );
}

/* ─────────────────────────────────────────────────────────────────
   COMMAND PALETTE TRIGGER BUTTON
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
        padding: "5px 10px",
        background: hov ? DS.surfHover : "rgba(0,0,0,0.028)",
        border: "1px solid rgba(0,0,0,0.08)",
        borderRadius: "7px",
        cursor: "pointer",
        fontFamily: DS.fontSans,
        fontSize: "12px",
        fontWeight: 400,
        color: DS.inkFaint,
        letterSpacing: "-0.01em",
        lineHeight: 1,
        transition: `all ${DS.msFast} ${DS.ease}`,
        outline: "none",
      }}
    >
      <Command size={12} strokeWidth={1.75} />
      <span>K</span>
    </button>
  );
}

/* ─────────────────────────────────────────────────────────────────
   RESUME CTA (with soft glow + arrow slide)
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
        gap: "5px",
        padding: "7px 14px",
        background: DS.accent,
        border: "none",
        borderRadius: "7px",
        cursor: "pointer",
        fontFamily: DS.fontSans,
        fontSize: "13px",
        fontWeight: 500,
        color: "#fff",
        letterSpacing: "-0.01em",
        lineHeight: 1,
        transform: press ? "scale(0.965)" : "scale(1)",
        boxShadow: hov && !press
          ? `0 0 0 3px rgba(0,102,255,0.15), 0 2px 8px rgba(0,102,255,0.28)`
          : `0 1px 3px rgba(0,102,255,0.2)`,
        transition: `transform ${DS.msFast} ${DS.ease}, box-shadow ${DS.ms} ${DS.ease}, opacity ${DS.msFast} ${DS.ease}`,
        opacity: press ? 0.9 : 1,
        outline: "none",
        overflow: "hidden",
      }}
    >
      <FileText size={12} strokeWidth={2.5} />
      Resume
      <ArrowUpRight
        size={11}
        strokeWidth={2.5}
        style={{
          transform: hov ? "translate(1px, -1px)" : "translate(0, 0)",
          transition: `transform ${DS.ms} ${DS.ease}`,
          opacity: 0.8,
        }}
      />
    </button>
  );
}

/* ─────────────────────────────────────────────────────────────────
   ANIMATED MENU BUTTON (HAMBURGER → X)
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
        background: press || isOpen ? DS.surfActive : "transparent",
        border: `1.5px solid ${isOpen ? DS.accent + "30" : "rgba(0,0,0,0.07)"}`,
        borderRadius: "9px",
        cursor: "pointer",
        transform: press ? "scale(0.94)" : "scale(1)",
        transition: `all ${DS.msFast} ${DS.ease}`,
        outline: "none",
        WebkitTapHighlightColor: "transparent",
        touchAction: "manipulation",
      }}
    >
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"
        style={{ color: isOpen ? DS.accent : DS.inkMid, transition: `color ${DS.msFast} ${DS.ease}` }}>
        <line x1="3" y1="5" x2="17" y2="5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
          style={{ transformOrigin: "center", transform: isOpen ? "rotate(45deg) translateY(5px)" : "rotate(0deg) translateY(0)", transition: `transform ${DS.ms} ${DS.ease}` }} />
        <line x1="3" y1="10" x2="17" y2="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
          style={{ opacity: isOpen ? 0 : 1, transition: `opacity ${DS.msFast} ${DS.ease}` }} />
        <line x1="3" y1="15" x2="17" y2="15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
          style={{ transformOrigin: "center", transform: isOpen ? "rotate(-45deg) translateY(-5px)" : "rotate(0deg) translateY(0)", transition: `transform ${DS.ms} ${DS.ease}` }} />
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
          background: "rgba(0,0,0,0.36)",
          backdropFilter: "blur(2px)",
          WebkitBackdropFilter: "blur(2px)",
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
          top: 0,
          right: 0,
          bottom: 0,
          width: "min(340px, 85vw)",
          background: DS.white,
          borderLeft: "1px solid rgba(0,0,0,0.06)",
          boxShadow: "-8px 0 32px rgba(0,0,0,0.08)",
          overflowY: "auto",
          zIndex: 9999,
          animation: `__panelIn ${DS.msSlow} ${DS.easeOut}`,
        }}
      >
        {/* Header */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: `${DS.sp(3)} ${DS.sp(3)} ${DS.sp(2)}`,
          borderBottom: "1px solid rgba(0,0,0,0.05)",
        }}>
          <div>
            <div style={{ fontFamily: DS.fontSans, fontSize: "17px", fontWeight: 600, color: DS.ink, letterSpacing: "-0.02em", marginBottom: "2px" }}>
              Navigation
            </div>
            <div style={{ fontFamily: DS.fontMono, fontSize: "11px", fontWeight: 400, color: DS.inkFaint }}>
              ./bhagavan
            </div>
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); onClose(); }}
            aria-label="Close menu"
            style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              width: "36px", height: "36px",
              background: "rgba(0,0,0,0.04)", border: "none", borderRadius: "7px",
              cursor: "pointer", color: DS.inkMid, outline: "none",
              WebkitTapHighlightColor: "transparent", touchAction: "manipulation",
            }}
          >
            <X size={14} strokeWidth={2} />
          </button>
        </div>

        {/* Availability in mobile panel */}
        <div style={{ padding: `${DS.sp(2)} ${DS.sp(3)} 0` }}>
          <AvailabilityBadge />
        </div>

        {/* Content */}
        <div style={{ padding: `${DS.sp(2.5)} ${DS.sp(2.5)}` }}>
          <PanelSection label="Main">
            {PRIMARY.map(({ label, path }, i) => (
              <PanelItem
                key={path}
                label={label}
                active={currentRoute === path}
                onClick={() => onNavigate(path)}
                delay={i * 35}
              />
            ))}
          </PanelSection>

          <div style={{ height: "1px", background: "rgba(0,0,0,0.06)", margin: `${DS.sp(2.5)} ${DS.sp(1)}` }} />

          <PanelSection label="More">
            {SECONDARY.map(({ label, path, Icon }, i) => (
              <PanelItem
                key={path}
                label={label}
                Icon={Icon}
                active={currentRoute === path}
                onClick={() => onNavigate(path)}
                delay={(PRIMARY.length + i) * 35}
              />
            ))}
          </PanelSection>

          <div style={{
            padding: `${DS.sp(3)} ${DS.sp(1)} ${DS.sp(1)}`,
            animation: `__itemStagger ${DS.msSlow} ${DS.easeOut} ${(PRIMARY.length + SECONDARY.length) * 35}ms backwards`,
          }}>
            <button
              onClick={(e) => { e.stopPropagation(); onNavigate("/resume"); }}
              style={{
                display: "flex", alignItems: "center", justifyContent: "center",
                gap: "8px", width: "100%", minHeight: "48px",
                background: DS.accent, border: "none", borderRadius: "9px",
                cursor: "pointer", fontFamily: DS.fontSans, fontSize: "14.5px",
                fontWeight: 500, color: "#fff", letterSpacing: "-0.01em",
                outline: "none", WebkitTapHighlightColor: "transparent",
                touchAction: "manipulation",
                boxShadow: "0 2px 8px rgba(0,102,255,0.22)",
              }}
            >
              <FileText size={16} strokeWidth={2} />
              View Resume
              <ArrowUpRight size={14} strokeWidth={2} style={{ opacity: 0.8 }} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

function PanelSection({ label, children }) {
  return (
    <div style={{ marginBottom: DS.sp(1) }}>
      <div style={{
        fontFamily: DS.fontMono, fontSize: "10px", fontWeight: 500,
        letterSpacing: "0.08em", color: DS.inkGhost, textTransform: "uppercase",
        padding: `0 ${DS.sp(1)} ${DS.sp(1.25)}`,
      }}>
        {label}
      </div>
      {children}
    </div>
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
        display: "flex", alignItems: "center",
        gap: DS.sp(1.75), width: "100%", minHeight: "48px",
        padding: `${DS.sp(1.5)} ${DS.sp(1.25)}`, marginBottom: "2px",
        background: active ? DS.surfActive : press ? DS.surfHover : "transparent",
        border: active ? "1px solid rgba(0,102,255,0.12)" : "1px solid transparent",
        borderRadius: "9px", cursor: "pointer",
        fontFamily: DS.fontSans, fontSize: "15px",
        fontWeight: active ? 500 : 400,
        color: active ? DS.accent : DS.ink,
        textAlign: "left", letterSpacing: "-0.015em", lineHeight: 1.2,
        transition: `background ${DS.msFast} ${DS.ease}, color ${DS.msFast} ${DS.ease}, border-color ${DS.msFast} ${DS.ease}`,
        outline: "none",
        WebkitTapHighlightColor: "transparent", touchAction: "manipulation",
        animation: `__itemStagger ${DS.msSlow} ${DS.easeOut} ${delay}ms backwards`,
      }}
    >
      {Icon
        ? <Icon size={17} strokeWidth={1.75} style={{ flexShrink: 0, opacity: active ? 0.95 : 0.35 }} />
        : <span style={{ width: "17px", flexShrink: 0 }} />
      }
      {label}
      {active && (
        <span style={{
          marginLeft: "auto", width: "6px", height: "6px",
          borderRadius: "50%", background: DS.accent, flexShrink: 0,
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

  const [scrolled,      setScrolled]      = useState(false);
  const [visible,       setVisible]       = useState(true);
  const [moreOpen,      setMoreOpen]      = useState(false);
  const [mobileOpen,    setMobileOpen]    = useState(false);
  const [paletteOpen,   setPaletteOpen]   = useState(false);

  const prevY          = useRef(0);
  const rafId          = useRef(null);
  const moreRef        = useRef(null);
  const navContainerRef = useRef(null);
  const itemRefs       = useRef([]);  // refs to each NavItem button

  const isMobile = useMQ("(max-width: 1023px)");
  const isTiny   = useMQ("(max-width: 599px)");
  const scrollProgress = useScrollProgress();
  const activeSection  = useScrollSpy(PRIMARY);

  const route = location.pathname === "/" ? "/home" : location.pathname;

  // Resolve the active index for SlidingIndicator:
  // Priority: scroll spy (if we found a section in viewport), else route match.
  const spyPath    = activeSection ? PRIMARY.find(p => p.sectionId === activeSection)?.path : null;
  const activePath = spyPath ?? route;
  const activeIndex = PRIMARY.findIndex(p => p.path === activePath);

  /* ── Scroll hide/show ── */
  useEffect(() => {
    const onScroll = () => {
      if (rafId.current) return;
      rafId.current = requestAnimationFrame(() => {
        const y = window.scrollY;
        setScrolled(y > 20);

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

  /* ── Keyboard shortcut: Ctrl+K or "/" ── */
  useEffect(() => {
    const fn = (e) => {
      // Don't trigger if typing in an input
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;

      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || e.key === "/") {
        e.preventDefault();
        setPaletteOpen(p => !p);
      }
    };
    document.addEventListener("keydown", fn);
    return () => document.removeEventListener("keydown", fn);
  }, []);

  /* ── Outside click for More menu ── */
  useEffect(() => {
    if (!moreOpen) return;
    const fn = (e) => {
      if (moreRef.current && !moreRef.current.contains(e.target)) setMoreOpen(false);
    };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, [moreOpen]);

  /* ── Close everything on route change ── */
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

  /* ── Computed layout values ── */
  const navH   = scrolled ? (isTiny ? "60px" : "66px") : (isTiny ? "68px" : "76px");
  const bg     = scrolled ? "rgba(255,255,255,0.96)" : "rgba(255,255,255,0.86)";
  const border = scrolled ? "rgba(0,0,0,0.08)"       : "rgba(0,0,0,0.03)";
  const blur   = scrolled ? "blur(18px) saturate(1.5)" : "blur(8px)";
  const shadow = scrolled ? "0 1px 12px rgba(0,0,0,0.06)" : "none";
  const padX   = isTiny   ? "20px" : "40px";

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
            `background ${DS.ms} ${DS.ease}`,
            `border-color ${DS.ms} ${DS.ease}`,
            `box-shadow ${DS.ms} ${DS.ease}`,
            `transform ${DS.ms} ${DS.ease}`,
          ].join(", "),
          zIndex: 8000,
        }}
      >
        {/* Scroll progress bar */}
        <ScrollProgressBar progress={scrollProgress} visible={scrolled} />

        <div style={{
          maxWidth: "1280px",
          height: "100%",
          margin: "0 auto",
          padding: `0 ${padX}`,
          display: "flex",
          alignItems: "center",
          position: "relative",
        }}>

          {/* Left — Logo + Badge */}
          <div style={{ display: "flex", alignItems: "center", gap: DS.sp(2) }}>
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
                gap: "0px",
              }}
            >
              {/* Sliding active indicator */}
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
          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: DS.sp(0.75) }}>
            {!isMobile && (
              <>
                {/* Command palette trigger */}
                <PaletteTrigger onClick={() => setPaletteOpen(true)} />

                {/* More dropdown */}
                <div ref={moreRef} style={{ position: "relative" }}>
                  <MoreTrigger open={moreOpen} onClick={() => setMoreOpen(p => !p)} />
                  <CommandMenu
                    open={moreOpen}
                    currentRoute={route}
                    onSelect={(p) => { setMoreOpen(false); if (p) go(p); }}
                  />
                </div>

                {/* Pipe divider */}
                <span aria-hidden="true" style={{
                  display: "inline-block",
                  width: "1px", height: "16px",
                  background: DS.inkGhost,
                  margin: `0 ${DS.sp(0.5)}`,
                  opacity: 0.4,
                }} />

                <ResumeButton onClick={() => go("/resume")} />
              </>
            )}

            {isMobile && (
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <AvailabilityBadge />
                <AnimatedMenuButton isOpen={mobileOpen} onClick={() => setMobileOpen(prev => !prev)} />
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