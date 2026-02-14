"use client";

import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  User, Briefcase, Code2, FolderGit2, Mail,
  ChevronDown, Menu, X, FileText, Award,
  GraduationCap, Trophy, Shield
} from "lucide-react";

/* ═══════════════════════════════════════════════════════════════
   DESIGN TOKENS - UNIFIED SYSTEM
═══════════════════════════════════════════════════════════════ */
const T = {
  // Colors
  accent: "#5b7fff",
  accentDark: "#4c6fe8",
  bg: "#ffffff",
  bgGlass: "rgba(255, 255, 255, 0.95)",
  border: "rgba(0, 0, 0, 0.08)",
  text: "#000000",
  textMuted: "#4a4a52",
  textLight: "#7a7a85",
  shadow: "rgba(0, 0, 0, 0.04)",
  shadowMd: "rgba(0, 0, 0, 0.08)",
  
  // Motion System - UNIFIED
  ease: "cubic-bezier(0.16, 1, 0.3, 1)",
  duration: "300ms",
  
  // Spacing System (8px base)
  space: {
    xs: "8px",
    sm: "12px",
    md: "16px",
    lg: "24px",
    xl: "32px",
  },
  
  // Border Radius Scale
  radius: {
    sm: "8px",
    md: "10px",
    lg: "12px",
    xl: "16px",
  },
  
  // Shadows - REDUCED OPACITY
  shadows: {
    sm: "0 2px 8px rgba(0, 0, 0, 0.04)",
    md: "0 4px 16px rgba(0, 0, 0, 0.06)",
    lg: "0 8px 24px rgba(0, 0, 0, 0.08)",
  },
};

/* ═══════════════════════════════════════════════════════════════
   NAVIGATION DATA
═══════════════════════════════════════════════════════════════ */
const PRIMARY_NAV = [
  { label: "About", path: "/home", Icon: User },
  { label: "Projects", path: "/projects", Icon: FolderGit2 },
  { label: "Skills", path: "/myskills", Icon: Code2 },
  { label: "Experience", path: "/internships", Icon: Briefcase },
  { label: "Contact", path: "/contact", Icon: Mail },
];

const SECONDARY_NAV = [
  { label: "Education", path: "/education", Icon: GraduationCap },
  { label: "Certifications", path: "/certifications", Icon: Shield },
  { label: "Competitions", path: "/hackathons", Icon: Trophy },
  { label: "Achievements", path: "/achivements", Icon: Award },
  { label: "Workshops", path: "/workshops", Icon: FileText },
  { label: "Resume", path: "/resume", Icon: FileText },
];

/* ═══════════════════════════════════════════════════════════════
   GLOBAL STYLES - CLEANED UP
═══════════════════════════════════════════════════════════════ */
const GLOBAL_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap');
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-6px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(100%);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  ::-webkit-scrollbar {
    width: 8px;
  }
  
  ::-webkit-scrollbar-track {
    background: transparent;
  }
  
  ::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.1);
    border-radius: 4px;
  }
  
  ::-webkit-scrollbar-thumb:hover {
    background: rgba(0, 0, 0, 0.15);
  }
  
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
`;

/* ═══════════════════════════════════════════════════════════════
   UTILITY HOOKS
═══════════════════════════════════════════════════════════════ */
function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);
  
  useEffect(() => {
    const media = window.matchMedia(query);
    setMatches(media.matches);
    
    const listener = (e) => setMatches(e.matches);
    media.addEventListener("change", listener);
    
    return () => media.removeEventListener("change", listener);
  }, [query]);
  
  return matches;
}

function useReducedMotion() {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}

/* ═══════════════════════════════════════════════════════════════
   CUSTOM CURSOR - REFINED & CONDITIONAL
═══════════════════════════════════════════════════════════════ */
function CustomCursor() {
  const cursorDotRef = useRef(null);
  const cursorGlowRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const reducedMotion = useReducedMotion();
  const isTouch = useMediaQuery("(pointer: coarse)");
  
  useEffect(() => {
    // Don't render cursor for reduced motion or touch devices
    if (reducedMotion || isTouch) return;
    
    const moveCursor = (e) => {
      const { clientX: x, clientY: y } = e;
      
      if (cursorDotRef.current) {
        cursorDotRef.current.style.left = `${x}px`;
        cursorDotRef.current.style.top = `${y}px`;
      }
      
      if (cursorGlowRef.current) {
        cursorGlowRef.current.style.left = `${x}px`;
        cursorGlowRef.current.style.top = `${y}px`;
      }
    };
    
    const handleHoverStart = () => setIsHovering(true);
    const handleHoverEnd = () => setIsHovering(false);
    
    window.addEventListener("mousemove", moveCursor);
    
    const interactiveElements = document.querySelectorAll("a, button, [role='button']");
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleHoverStart);
      el.addEventListener("mouseleave", handleHoverEnd);
    });
    
    return () => {
      window.removeEventListener("mousemove", moveCursor);
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleHoverStart);
        el.removeEventListener("mouseleave", handleHoverEnd);
      });
    };
  }, [reducedMotion, isTouch]);
  
  if (reducedMotion || isTouch) return null;
  
  return (
    <>
      <div
        ref={cursorGlowRef}
        style={{
          position: "fixed",
          width: isHovering ? "32px" : "28px",
          height: isHovering ? "32px" : "28px",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${T.accent}12, transparent 70%)`,
          pointerEvents: "none",
          transform: "translate(-50%, -50%)",
          transition: `width ${T.duration} ${T.ease}, height ${T.duration} ${T.ease}`,
          zIndex: 10001,
          mixBlendMode: "multiply",
        }}
      />
      
      <div
        ref={cursorDotRef}
        style={{
          position: "fixed",
          width: isHovering ? "6px" : "5px",
          height: isHovering ? "6px" : "5px",
          borderRadius: "50%",
          background: T.accent,
          pointerEvents: "none",
          transform: "translate(-50%, -50%)",
          transition: `width ${T.duration} ${T.ease}, height ${T.duration} ${T.ease}`,
          zIndex: 10002,
        }}
      />
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════
   LOGO COMPONENT - SIMPLIFIED
═══════════════════════════════════════════════════════════════ */
function Logo({ onClick, isScrolled }) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label="Navigate to home"
      style={{
        display: "flex",
        alignItems: "center",
        gap: T.space.sm,
        background: "none",
        border: "none",
        cursor: "pointer",
        padding: 0,
        transition: `transform ${T.duration} ${T.ease}`,
        transform: isHovered ? "scale(1.01)" : "scale(1)",
      }}
    >
      <div
        style={{
          width: isScrolled ? "32px" : "36px",
          height: isScrolled ? "32px" : "36px",
          borderRadius: T.radius.md,
          background: `linear-gradient(135deg, ${T.accent} 0%, ${T.accentDark} 100%)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: isHovered ? T.shadows.md : T.shadows.sm,
          transition: `all ${T.duration} ${T.ease}`,
        }}
      >
        <Code2 
          size={isScrolled ? 16 : 18} 
          color="#ffffff" 
          strokeWidth={2.5}
          style={{ transition: `all ${T.duration} ${T.ease}` }}
        />
      </div>
      <span
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: isScrolled ? "16px" : "17px",
          fontWeight: 700,
          color: T.text,
          letterSpacing: "-0.02em",
          transition: `all ${T.duration} ${T.ease}`,
        }}
      >
        Bhagavan - Developer
      </span>
    </button>
  );
}

/* ═══════════════════════════════════════════════════════════════
   NAV LINK - REDUCED MAGNETIC EFFECT
═══════════════════════════════════════════════════════════════ */
function NavLink({ item, active, onClick }) {
  const [isHovered, setIsHovered] = useState(false);
  const linkRef = useRef(null);
  const isTouch = useMediaQuery("(pointer: coarse)");
  
  const handleMouseMove = (e) => {
    if (!linkRef.current || isTouch) return;
    
    const rect = linkRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    const distance = Math.sqrt(x * x + y * y);
    const maxDistance = 40; // Reduced from 60
    
    if (distance < maxDistance) {
      const strength = (maxDistance - distance) / maxDistance;
      const moveX = x * strength * 0.075; // Reduced by 50%
      const moveY = y * strength * 0.075;
      linkRef.current.style.transform = `translate(${moveX}px, ${moveY}px)`;
    }
  };
  
  const handleMouseLeave = () => {
    if (linkRef.current) {
      linkRef.current.style.transform = "translate(0, 0)";
    }
    setIsHovered(false);
  };
  
  return (
    <button
      ref={linkRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      aria-current={active ? "page" : undefined}
      style={{
        position: "relative",
        padding: `${T.space.sm} 18px`,
        background: "none",
        border: "none",
        color: active ? T.text : T.textMuted,
        fontSize: "15px",
        fontWeight: active ? 600 : 500,
        fontFamily: "'Inter', sans-serif",
        cursor: "pointer",
        transition: `color ${T.duration} ${T.ease}, transform ${T.duration} ${T.ease}`,
        whiteSpace: "nowrap",
      }}
    >
      {item.label}
      
      <div
        style={{
          position: "absolute",
          bottom: "6px",
          left: "50%",
          width: active ? "50%" : isHovered ? "30%" : "0%",
          height: "2px",
          background: T.accent,
          borderRadius: "2px",
          transform: "translateX(-50%)",
          transition: `width ${T.duration} ${T.ease}`,
        }}
      />
    </button>
  );
}

/* ═══════════════════════════════════════════════════════════════
   DROPDOWN MENU - REFINED
═══════════════════════════════════════════════════════════════ */
function Dropdown({ isOpen, currentRoute, onNavigate }) {
  useEffect(() => {
    if (!isOpen) return;
    
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onNavigate(null);
      }
    };
    
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onNavigate]);
  
  if (!isOpen) return null;
  
  return (
    <div
      role="menu"
      aria-label="More navigation options"
      style={{
        position: "absolute",
        top: "calc(100% + 12px)",
        right: 0,
        width: "240px",
        background: "rgba(255, 255, 255, 0.98)",
        backdropFilter: "blur(16px) saturate(180%)",
        border: `1px solid ${T.border}`,
        borderRadius: T.radius.xl,
        boxShadow: T.shadows.lg,
        overflow: "hidden",
        animation: `slideDown ${T.duration} ${T.ease}`,
        zIndex: 100,
      }}
    >
      <div
        style={{
          padding: `${T.space.sm} ${T.space.md} ${T.space.xs}`,
          fontSize: "11px",
          fontWeight: 700,
          letterSpacing: "0.08em",
          color: T.textLight,
          textTransform: "uppercase",
          borderBottom: `1px solid ${T.border}`,
        }}
      >
        More
      </div>
      
      {SECONDARY_NAV.map((item) => (
        <DropdownItem
          key={item.path}
          item={item}
          active={currentRoute === item.path}
          onClick={() => onNavigate(item.path)}
        />
      ))}
    </div>
  );
}

function DropdownItem({ item, active, onClick }) {
  const [isHovered, setIsHovered] = useState(false);
  const { Icon } = item;
  
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="menuitem"
      aria-current={active ? "page" : undefined}
      style={{
        display: "flex",
        alignItems: "center",
        gap: T.space.sm,
        width: "100%",
        padding: `${T.space.sm} ${T.space.md}`,
        background: active 
          ? `${T.accent}06` 
          : isHovered 
          ? "rgba(0, 0, 0, 0.02)" 
          : "transparent",
        border: "none",
        color: active ? T.accent : T.text,
        fontSize: "14.5px",
        fontWeight: active ? 600 : 500,
        textAlign: "left",
        cursor: "pointer",
        transition: `all ${T.duration} ${T.ease}`,
        transform: isHovered && !active ? "translateX(3px)" : "translateX(0)",
      }}
    >
      <Icon 
        size={16} 
        strokeWidth={2}
        style={{ 
          flexShrink: 0,
          opacity: active ? 1 : 0.6,
          transition: `opacity ${T.duration} ${T.ease}`,
        }} 
      />
      <span>{item.label}</span>
      
      {active && (
        <div
          style={{
            marginLeft: "auto",
            width: "5px",
            height: "5px",
            borderRadius: "50%",
            background: T.accent,
          }}
        />
      )}
    </button>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MOBILE BOTTOM SHEET - NEXT-GEN REDESIGN
═══════════════════════════════════════════════════════════════ */
function MobileBottomSheet({ isOpen, currentRoute, onNavigate, onClose }) {
  const [dragY, setDragY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startY = useRef(0);
  const sheetRef = useRef(null);
  
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);
  
  // Handle drag gestures
  const handleTouchStart = (e) => {
    startY.current = e.touches[0].clientY;
    setIsDragging(true);
  };
  
  const handleTouchMove = (e) => {
    if (!isDragging) return;
    
    const currentY = e.touches[0].clientY;
    const deltaY = currentY - startY.current;
    
    if (deltaY > 0) {
      setDragY(deltaY);
    }
  };
  
  const handleTouchEnd = () => {
    setIsDragging(false);
    
    if (dragY > 100) {
      onClose();
    }
    
    setDragY(0);
  };
  
  // ESC key to close
  useEffect(() => {
    if (!isOpen) return;
    
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);
  
  if (!isOpen) return null;
  
  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0, 0, 0, 0.4)",
          backdropFilter: "blur(4px)",
          zIndex: 9998,
          animation: `fadeIn ${T.duration} ${T.ease}`,
        }}
      />
      
      {/* Bottom Sheet */}
      <div
        ref={sheetRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        style={{
          position: "fixed",
          left: 0,
          right: 0,
          bottom: 0,
          maxHeight: "85vh",
          background: "#ffffff",
          borderTopLeftRadius: T.radius.xl,
          borderTopRightRadius: T.radius.xl,
          boxShadow: "0 -4px 24px rgba(0, 0, 0, 0.12)",
          zIndex: 9999,
          overflowY: "auto",
          paddingBottom: "env(safe-area-inset-bottom, 20px)",
          animation: `slideUp ${T.duration} ${T.ease}`,
          transform: `translateY(${dragY}px)`,
          transition: isDragging ? "none" : `transform ${T.duration} ${T.ease}`,
        }}
      >
        {/* Drag Handle */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            padding: `${T.space.sm} 0`,
            position: "sticky",
            top: 0,
            background: "#ffffff",
            zIndex: 1,
          }}
        >
          <div
            style={{
              width: "40px",
              height: "4px",
              borderRadius: "2px",
              background: "rgba(0, 0, 0, 0.15)",
            }}
          />
        </div>
        
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: `0 ${T.space.lg} ${T.space.md}`,
            borderBottom: `1px solid ${T.border}`,
          }}
        >
          <span
            style={{
              fontSize: "18px",
              fontWeight: 700,
              color: T.text,
              fontFamily: "'Space Grotesk', sans-serif",
              letterSpacing: "-0.01em",
            }}
          >
            Navigation
          </span>
          <button
            onClick={onClose}
            aria-label="Close menu"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "40px",
              height: "40px",
              background: "rgba(0, 0, 0, 0.04)",
              border: "none",
              borderRadius: T.radius.md,
              color: T.text,
              cursor: "pointer",
              transition: `all ${T.duration} ${T.ease}`,
            }}
          >
            <X size={20} strokeWidth={2.5} />
          </button>
        </div>
        
        {/* Content */}
        <div style={{ padding: T.space.lg }}>
          {/* Primary Nav */}
          <div style={{ marginBottom: T.space.xl }}>
            <div
              style={{
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.08em",
                color: T.textLight,
                textTransform: "uppercase",
                marginBottom: T.space.md,
                paddingLeft: T.space.xs,
              }}
            >
              Main
            </div>
            {PRIMARY_NAV.map((item) => (
              <MobileMenuItem
                key={item.path}
                item={item}
                active={currentRoute === item.path}
                onClick={() => {
                  onNavigate(item.path);
                  onClose();
                }}
              />
            ))}
          </div>
          
          {/* Divider */}
          <div
            style={{
              height: "1px",
              background: T.border,
              margin: `${T.space.lg} 0`,
            }}
          />
          
          {/* Secondary Nav */}
          <div>
            <div
              style={{
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.08em",
                color: T.textLight,
                textTransform: "uppercase",
                marginBottom: T.space.md,
                paddingLeft: T.space.xs,
              }}
            >
              More
            </div>
            {SECONDARY_NAV.map((item) => (
              <MobileMenuItem
                key={item.path}
                item={item}
                active={currentRoute === item.path}
                onClick={() => {
                  onNavigate(item.path);
                  onClose();
                }}
              />
            ))}
          </div>
          
          {/* CTA */}
          <div 
            style={{ 
              marginTop: T.space.xl,
              paddingTop: T.space.lg,
              borderTop: `1px solid ${T.border}`,
            }}
          >
            <button
              onClick={() => {
                onNavigate("/resume");
                onClose();
              }}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: T.space.sm,
                width: "100%",
                minHeight: "48px",
                padding: `14px ${T.space.md}`,
                background: `linear-gradient(135deg, ${T.accent} 0%, ${T.accentDark} 100%)`,
                border: "none",
                borderRadius: T.radius.lg,
                color: "#ffffff",
                fontSize: "16px",
                fontWeight: 600,
                cursor: "pointer",
                boxShadow: T.shadows.md,
                transition: `all ${T.duration} ${T.ease}`,
              }}
            >
              <FileText size={20} strokeWidth={2.5} />
              View Resume
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

function MobileMenuItem({ item, active, onClick }) {
  const { Icon } = item;
  
  return (
    <button
      onClick={onClick}
      aria-current={active ? "page" : undefined}
      style={{
        display: "flex",
        alignItems: "center",
        gap: T.space.md,
        width: "100%",
        minHeight: "48px",
        padding: `${T.space.md} ${T.space.md}`,
        marginBottom: T.space.xs,
        background: active ? `${T.accent}06` : "transparent",
        border: active ? `1.5px solid ${T.accent}20` : "1.5px solid transparent",
        borderRadius: T.radius.lg,
        color: active ? T.accent : T.text,
        fontSize: "16px",
        fontWeight: active ? 600 : 500,
        textAlign: "left",
        cursor: "pointer",
        transition: `all ${T.duration} ${T.ease}`,
      }}
    >
      <Icon 
        size={20} 
        strokeWidth={2}
        style={{ 
          flexShrink: 0,
          opacity: active ? 1 : 0.6,
        }} 
      />
      <span>{item.label}</span>
      
      {active && (
        <div
          style={{
            marginLeft: "auto",
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            background: T.accent,
          }}
        />
      )}
    </button>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN NAVBAR - NEXT-GEN
═══════════════════════════════════════════════════════════════ */
export default function NextGenNavbar() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [moreOpen, setMoreOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [navVisible, setNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  
  const moreRef = useRef(null);
  const currentRoute = location.pathname === "/" ? "/home" : location.pathname;
  
  const isMobile = useMediaQuery("(max-width: 1023px)");
  const isSmallMobile = useMediaQuery("(max-width: 639px)");
  
  /* ───────────────────────────────────────────────────────────
     SCROLL EFFECTS - SMART HIDE/SHOW
  ─────────────────────────────────────────────────────────── */
  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollTop = window.scrollY;
          const docHeight = document.documentElement.scrollHeight - window.innerHeight;
          const progress = (scrollTop / docHeight) * 100;
          
          setScrolled(scrollTop > 30);
          setScrollProgress(progress);
          
          // Smart hide/show on mobile
          if (isMobile) {
            if (scrollTop < 10) {
              setNavVisible(true);
            } else if (scrollTop < lastScrollY || Math.abs(scrollTop - lastScrollY) < 5) {
              // Scrolling up or minimal movement
              setNavVisible(true);
            } else if (scrollTop > lastScrollY && scrollTop > 100) {
              // Scrolling down
              setNavVisible(false);
            }
          } else {
            setNavVisible(true);
          }
          
          setLastScrollY(scrollTop);
          ticking = false;
        });
        
        ticking = true;
      }
    };
    
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY, isMobile]);
  
  /* ───────────────────────────────────────────────────────────
     CLOSE DROPDOWN ON OUTSIDE CLICK
  ─────────────────────────────────────────────────────────── */
  useEffect(() => {
    if (!moreOpen) return;
    
    const handleClick = (e) => {
      if (moreRef.current && !moreRef.current.contains(e.target)) {
        setMoreOpen(false);
      }
    };
    
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [moreOpen]);
  
  /* ───────────────────────────────────────────────────────────
     CLOSE MENUS ON ROUTE CHANGE
  ─────────────────────────────────────────────────────────── */
  useEffect(() => {
    setMoreOpen(false);
    setMobileOpen(false);
  }, [location.pathname]);
  
  const handleNavigate = (path) => {
    if (path && path !== currentRoute) {
      navigate(path);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };
  
  const navHeight = scrolled 
    ? (isSmallMobile ? "60px" : "68px")
    : (isSmallMobile ? "72px" : "80px");
  
  const navBlur = scrolled 
    ? (isSmallMobile ? "12px" : "16px")
    : (isSmallMobile ? "8px" : "12px");
  
  return (
    <>
      {/* Global Styles */}
      <style>{GLOBAL_STYLES}</style>
      
      {/* Custom Cursor (Desktop Only, No Reduced Motion) */}
      {!isMobile && <CustomCursor />}
      
      {/* Scroll Progress Bar */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: `${scrollProgress}%`,
          height: "2px",
          background: `linear-gradient(90deg, ${T.accent}, ${T.accentDark})`,
          zIndex: 10000,
          transition: "width 0.1s linear",
        }}
      />
      
      {/* Navbar */}
      <nav
        role="navigation"
        aria-label="Main navigation"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: navHeight,
          background: scrolled 
            ? "rgba(255, 255, 255, 0.95)"
            : "rgba(255, 255, 255, 0.85)",
          backdropFilter: `blur(${navBlur}) saturate(180%)`,
          borderBottom: `1px solid ${scrolled ? T.border : "rgba(0, 0, 0, 0.04)"}`,
          boxShadow: scrolled ? T.shadows.md : T.shadows.sm,
          transition: `all ${T.duration} ${T.ease}, transform ${T.duration} ${T.ease}`,
          transform: navVisible ? "translateY(0)" : "translateY(-100%)",
          zIndex: 9000,
        }}
      >
        <div
          style={{
            maxWidth: "1440px",
            height: "100%",
            margin: "0 auto",
            padding: isSmallMobile ? "0 20px" : "0 36px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: isSmallMobile ? T.space.lg : "56px",
          }}
        >
          {/* Logo */}
          <Logo onClick={() => handleNavigate("/home")} isScrolled={scrolled} />
          
          {/* Desktop Navigation */}
          {!isMobile && (
            <>
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: T.space.xs,
                }}
              >
                {PRIMARY_NAV.map((item) => (
                  <NavLink
                    key={item.path}
                    item={item}
                    active={currentRoute === item.path}
                    onClick={() => handleNavigate(item.path)}
                  />
                ))}
              </div>
              
              <div style={{ display: "flex", alignItems: "center", gap: T.space.md }}>
                {/* More Dropdown */}
                <div style={{ position: "relative" }} ref={moreRef}>
                  <button
                    onClick={() => setMoreOpen(!moreOpen)}
                    aria-expanded={moreOpen}
                    aria-haspopup="menu"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      padding: `${T.space.sm} ${T.space.md}`,
                      background: moreOpen ? "rgba(0, 0, 0, 0.04)" : "transparent",
                      border: "none",
                      borderRadius: T.radius.md,
                      color: T.textMuted,
                      fontSize: "15px",
                      fontWeight: 500,
                      cursor: "pointer",
                      transition: `all ${T.duration} ${T.ease}`,
                    }}
                  >
                    More
                    <ChevronDown
                      size={16}
                      strokeWidth={2.5}
                      style={{
                        transform: moreOpen ? "rotate(180deg)" : "rotate(0deg)",
                        transition: `transform ${T.duration} ${T.ease}`,
                      }}
                    />
                  </button>
                  
                  <Dropdown
                    isOpen={moreOpen}
                    currentRoute={currentRoute}
                    onNavigate={handleNavigate}
                  />
                </div>
                
                {/* Resume CTA - MATURED */}
                <button
                  onClick={() => handleNavigate("/resume")}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: T.space.sm,
                    padding: `11px 22px`,
                    background: `linear-gradient(135deg, ${T.accent} 0%, ${T.accentDark} 100%)`,
                    border: "none",
                    borderRadius: T.radius.lg,
                    color: "#ffffff",
                    fontSize: "14.5px",
                    fontWeight: 600,
                    cursor: "pointer",
                    boxShadow: T.shadows.md,
                    transition: `all ${T.duration} ${T.ease}`,
                  }}
                >
                  <FileText size={16} strokeWidth={2.5} />
                  Resume
                </button>
              </div>
            </>
          )}
          
          {/* Mobile Menu Button */}
          {isMobile && (
            <button
              onClick={() => setMobileOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={mobileOpen}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "44px",
                height: "44px",
                background: "rgba(0, 0, 0, 0.04)",
                border: "none",
                borderRadius: T.radius.lg,
                color: T.text,
                cursor: "pointer",
                transition: `all ${T.duration} ${T.ease}`,
              }}
            >
              <Menu size={22} strokeWidth={2.5} />
            </button>
          )}
        </div>
      </nav>
      
      {/* Mobile Bottom Sheet */}
      {isMobile && (
        <MobileBottomSheet
          isOpen={mobileOpen}
          currentRoute={currentRoute}
          onNavigate={handleNavigate}
          onClose={() => setMobileOpen(false)}
        />
      )}
    </>
  );
}