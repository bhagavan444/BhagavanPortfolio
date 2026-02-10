"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Gauge, Cpu, CircuitBoard, GraduationCap, Radio,
  Briefcase, Trophy, Shield, Brain, Heart, FileText,
  Star, Layers, Terminal, Zap, Clock, ChevronDown,
  Menu, X
} from "lucide-react";

const ModernCyberNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [hoveredPath, setHoveredPath] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentTime, setCurrentTime] = useState(new Date());
  const [scanTrigger, setScanTrigger] = useState(null);

  const navContainerRef = useRef(null);
  const moreButtonRef = useRef(null);
  const matrixCanvasRef = useRef(null);

  const currentRoute = location.pathname === "/" ? "/home" : location.pathname;

  // ────────────────────────────────────────────────
  // Navigation structure
  // ────────────────────────────────────────────────
  const primaryLinks = [
    {
      label: "Dashboard",
      short: "HOME",
      path: "/home",
      icon: Gauge,
      color: "#00d4ff",
      desc: "System Overview"
    },
    {
      label: "Tech Stack",
      short: "Skills",
      path: "/myskills",
      icon: Cpu,
      color: "#34d399",
      desc: "Core Technologies"
    },
    {
      label: "Projects",
      short: "Projects",
      path: "/projects",
      icon: CircuitBoard,
      color: "#a78bfa",
      desc: "Showcase & Case Studies"
    },
    {
      label: "Education",
      short: "Stydy",
      path: "/education",
      icon: GraduationCap,
      color: "#fbbf24",
      desc: "Academic Background"
    },
    {
      label: "Connect",
      short: "Contact",
      path: "/contact",
      icon: Radio,
      color: "#f87171",
      desc: "Get in Touch"
    },
  ];

  const extendedLinks = [
    {
      label: "Experience",
      path: "/internships",
      icon: Briefcase,
      color: "#00d4ff",
      badge: "3+",
      desc: "Professional Timeline"
    },
    {
      label: "Competitions",
      path: "/hackathons",
      icon: Trophy,
      color: "#fbbf24",
      badge: "15+",
      desc: "Hackathon History"
    },
    {
      label: "Credentials",
      path: "/certifications",
      icon: Shield,
      color: "#a78bfa",
      badge: "20+",
      desc: "Verified Certificates"
    },
    {
      label: "Workshops",
      path: "/workshops",
      icon: Brain,
      color: "#34d399",
      desc: "Knowledge Transfer Sessions"
    },
    {
      label: "Milestones",
      path: "/achivements",
      icon: Star,
      color: "#f87171",
      desc: "Recognition & Awards"
    },
    {
      label: "Beyond Code",
      path: "/beyondcoding",
      icon: Heart,
      color: "#fb7185",
      desc: "Life & Interests"
    },
    {
      label: "Curriculum Vitae",
      path: "/resume",
      icon: FileText,
      color: "#60a5fa",
      badge: "v2025",
      desc: "Download PDF"
    },
  ];

  // ────────────────────────────────────────────────
  // Real-time clock + periodic scanline trigger
  // ────────────────────────────────────────────────
  useEffect(() => {
    const clockInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    const scanInterval = setInterval(() => {
      if (Math.random() > 0.65) {
        setScanTrigger(Date.now());
      }
    }, 4200);

    return () => {
      clearInterval(clockInterval);
      clearInterval(scanInterval);
    };
  }, []);

  // ────────────────────────────────────────────────
  // Very subtle matrix rain background
  // ────────────────────────────────────────────────
  useEffect(() => {
    if (!matrixCanvasRef.current || isMobile) return;

    const canvas = matrixCanvasRef.current;
    const ctx = canvas.getContext("2d");
    let frameId;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resizeCanvas();

    const fontSize = 13;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = new Array(columns).fill(1);

    const katakana = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン".split("");
    const latin = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    const nums = "0123456789".split("");
    const chars = [...katakana, ...latin, ...nums];

    const drawMatrix = () => {
      ctx.fillStyle = "rgba(5, 5, 20, 0.08)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "rgba(96, 165, 250, 0.28)";
      ctx.font = `${fontSize}px 'Roboto Mono', monospace`;

      drops.forEach((y, i) => {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const xPos = i * fontSize;

        ctx.fillText(char, xPos, y * fontSize);

        if (y * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        drops[i]++;
      });

      frameId = requestAnimationFrame(drawMatrix);
    };

    drawMatrix();

    window.addEventListener("resize", resizeCanvas);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [isMobile]);

  // ────────────────────────────────────────────────
  // Scroll & mobile detection
  // ────────────────────────────────────────────────
  useEffect(() => {
    const updateLayout = () => {
      setIsMobile(window.innerWidth < 1024);
      setScrolled(window.scrollY > 40);
    };

    updateLayout();
    window.addEventListener("resize", updateLayout);
    window.addEventListener("scroll", updateLayout, { passive: true });

    return () => {
      window.removeEventListener("resize", updateLayout);
      window.removeEventListener("scroll", updateLayout);
    };
  }, []);

  // Close more dropdown when clicking outside
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (moreButtonRef.current && !moreButtonRef.current.contains(e.target)) {
        setMoreOpen(false);
      }
    };

    if (moreOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [moreOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
    setMoreOpen(false);
  }, [location.pathname]);

  // Mouse position tracking → holographic lighting
  const handleMouseMove = useCallback((e) => {
    if (isMobile || !navContainerRef.current) return;

    const rect = navContainerRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }, [isMobile]);

  const navigateTo = (path) => {
    if (path !== currentRoute) {
      navigate(path);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    setMenuOpen(false);
    setMoreOpen(false);
  };

  // ────────────────────────────────────────────────
  // RENDER
  // ────────────────────────────────────────────────
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@500;700;900&family=Roboto+Mono:wght@300;400;500;700&family=Rajdhani:wght@500;600;700&family=Inter:wght@400;500;600;700;800&display=swap');

        :root {
          --primary:   #00d4ff;
          --secondary: #a78bfa;
          --success:   #34d399;
          --warning:   #fbbf24;
          --danger:    #f87171;
          --dark-bg:   #0f0e1a;
          --glass:     rgba(15, 14, 35, 0.86);
          --text:      #e2e8f0;
          --text-dim:  #94a3b8;
        }

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Inter', system-ui, sans-serif;
          background: #0a0814;
          color: var(--text);
          cursor: none;
          overflow-x: hidden;
        }

        .cyber-cursor {
          position: fixed;
          width: 26px;
          height: 26px;
          border: 1px solid var(--primary);
          border-radius: 50%;
          pointer-events: none;
          z-index: 99999;
          mix-blend-mode: difference;
          transition: transform 0.09s ease-out, width 0.18s, height 0.18s;
          box-shadow: 0 0 14px var(--primary);
        }

        .cursor-core {
          position: fixed;
          width: 7px;
          height: 7px;
          background: var(--primary);
          border-radius: 50%;
          pointer-events: none;
          z-index: 100000;
          transform: translate(-50%, -50%);
          box-shadow: 0 0 18px var(--primary), 0 0 36px rgba(0,212,255,0.6);
        }

        .glass-navbar {
          position: fixed;
          inset: 0 0 auto 0;
          z-index: 9998;
          height: 86px;
          background: var(--glass);
          backdrop-filter: blur(38px) saturate(190%);
          -webkit-backdrop-filter: blur(38px) saturate(190%);
          border-bottom: 1px solid rgba(0, 212, 255, 0.16);
          box-shadow: 0 10px 50px rgba(0,0,0,0.65), 0 0 70px rgba(0,212,255,0.1);
          transition: all 0.55s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .glass-navbar.scrolled {
          height: 74px;
          background: rgba(10, 9, 22, 0.94);
          border-bottom-color: rgba(0, 212, 255, 0.26);
          box-shadow: 0 18px 70px rgba(0,0,0,0.75), 0 0 90px rgba(0,212,255,0.16);
        }

        .scan-effect {
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, transparent, rgba(0,212,255,0.06) 50%, transparent);
          pointer-events: none;
          animation: scan-move 7s linear infinite;
          opacity: 0.55;
        }

        @keyframes scan-move {
          0%   { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }

        .nav-item {
          position: relative;
          padding: 0.82rem 1.5rem;
          border-radius: 14px;
          color: var(--text);
          font-family: 'Rajdhani', sans-serif;
          font-weight: 600;
          letter-spacing: 1.15px;
          text-transform: uppercase;
          font-size: 0.94rem;
          border: 1px solid transparent;
          transition: all 0.38s cubic-bezier(0.16,1,0.3,1);
          overflow: hidden;
        }

        .nav-item:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(0,212,255,0.22);
          border-color: rgba(0,212,255,0.38);
        }

        .nav-item.active {
          background: rgba(0,212,255,0.13);
          border-color: var(--primary);
          color: var(--primary);
          font-weight: 700;
          box-shadow: 0 0 32px rgba(0,212,255,0.38), inset 0 0 14px rgba(0,212,255,0.18);
        }

        .active-scanning::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent, rgba(0,212,255,0.22), transparent);
          animation: quick-scan 1.6s ease-out forwards;
        }

        @keyframes quick-scan {
          0%   { transform: translateX(-120%); }
          100% { transform: translateX(120%); }
        }

        .more-dropdown {
          position: absolute;
          top: calc(100% + 14px);
          right: 0;
          min-width: 370px;
          background: rgba(15, 14, 35, 0.96);
          backdrop-filter: blur(40px);
          border: 1px solid rgba(0,212,255,0.28);
          border-radius: 18px;
          box-shadow: 0 24px 90px rgba(0,0,0,0.8), 0 0 70px rgba(0,212,255,0.18);
          padding: 1.1rem;
          z-index: 9999;
          animation: dropdown-appear 0.38s cubic-bezier(0.16,1,0.3,1);
        }

        @keyframes dropdown-appear {
          from { opacity: 0; transform: translateY(-18px) scale(0.95); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        .dropdown-entry {
          display: flex;
          align-items: center;
          gap: 1.1rem;
          padding: 1.05rem 1.4rem;
          border-radius: 12px;
          transition: all 0.3s ease;
          color: var(--text);
        }

        .dropdown-entry:hover {
          background: rgba(0,212,255,0.1);
          transform: translateX(7px);
          box-shadow: 0 8px 24px rgba(0,212,255,0.16);
        }

        .icon-container {
          width: 50px;
          height: 50px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, var(--c1), var(--c2));
          box-shadow: 0 6px 22px rgba(0,0,0,0.45);
        }

        .mobile-fullscreen-menu {
          position: fixed;
          inset: 86px 0 0 0;
          background: rgba(8, 7, 20, 0.98);
          backdrop-filter: blur(44px);
          z-index: 9997;
          overflow-y: auto;
          padding: 2.2rem 1.6rem;
          animation: menu-open 0.42s ease-out;
        }

        @keyframes menu-open {
          from { opacity: 0; transform: translateY(-40px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 1023px) {
          body { cursor: default; }
          .cyber-cursor, .cursor-core { display: none !important; }
        }
      `}</style>

      {/* Futuristic cursor */}
      {!isMobile && (
        <>
          <div
            className="cyber-cursor"
            style={{ left: mousePosition.x, top: mousePosition.y }}
          />
          <div
            className="cursor-core"
            style={{ left: mousePosition.x, top: mousePosition.y }}
          />
        </>
      )}

      {/* ─── NAVBAR ─────────────────────────────────────────── */}
      <nav
        ref={navContainerRef}
        onMouseMove={handleMouseMove}
        className={`glass-navbar ${scrolled ? "scrolled" : ""}`}
        style={{
          "--mx": `${mousePosition.x}px`,
          "--my": `${mousePosition.y}px`
        }}
      >
        {/* Subtle matrix canvas */}
        <canvas
          ref={matrixCanvasRef}
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.22,
            pointerEvents: "none",
          }}
        />

        {/* Scan line when triggered */}
        {scanTrigger && <div className="scan-effect" key={scanTrigger} />}

        <div
          style={{
            maxWidth: "1720px",
            margin: "0 auto",
            padding: isMobile ? "0 1.6rem" : "0 4rem",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "relative",
          }}
        >
          {/* Logo area */}
          <button
            onClick={() => navigateTo("/home")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1.2rem",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0,
            }}
          >
            <div
              style={{
                position: "relative",
                width: isMobile ? 56 : scrolled ? 60 : 68,
                height: isMobile ? 56 : scrolled ? 60 : 68,
                transition: "all 0.55s ease",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #00d4ff, #a78bfa, #34d399)",
                  opacity: 0.75,
                  filter: "blur(14px)",
                  animation: "breathe 9s ease-in-out infinite",
                }}
              />
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  height: "100%",
                  background: "linear-gradient(145deg, #1a1733, #121025)",
                  borderRadius: "50%",
                  border: "2px solid #00d4ff",
                  boxShadow: "inset 0 0 24px rgba(0,212,255,0.35)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Terminal size={isMobile ? 26 : scrolled ? 30 : 34} color="#00d4ff" strokeWidth={2.3} />
              </div>
            </div>

            <div>
              <div
                style={{
                  fontFamily: "'Orbitron', sans-serif",
                  fontSize: isMobile ? "1.55rem" : scrolled ? "1.65rem" : "1.95rem",
                  fontWeight: 900,
                  background: "linear-gradient(90deg, #00d4ff, #a78bfa, #fbbf24)",
                  backgroundSize: "220% 100%",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                  letterSpacing: "3.5px",
                  animation: "gradientFlow 12s linear infinite",
                }}
              >
                BHAGAVAN
              </div>
              <div
                style={{
                  fontFamily: "'Roboto Mono', monospace",
                  fontSize: "0.74rem",
                  color: "#a5b4fc",
                  letterSpacing: "2.2px",
                  fontWeight: 500,
                  textTransform: "uppercase",
                  marginTop: "3px",
                }}
              >
                FULL-STACK ENGINEER • 2025
              </div>
            </div>
          </button>

          {/* ─── DESKTOP NAVIGATION ──────────────────────────────── */}
          {!isMobile && (
            <div style={{ display: "flex", alignItems: "center", gap: "0.7rem" }}>
              {primaryLinks.map((item) => {
                const isActive = currentRoute === item.path;
                const Icon = item.icon;

                return (
                  <button
                    key={item.path}
                    onClick={() => navigateTo(item.path)}
                    onMouseEnter={() => setHoveredPath(item.path)}
                    onMouseLeave={() => setHoveredPath(null)}
                    className={`nav-item ${isActive ? "active" : ""} ${isActive && scanTrigger ? "active-scanning" : ""}`}
                  >
                    <Icon size={19} strokeWidth={isActive ? 2.7 : 2.1} />
                    <span>{item.short}</span>

                    {isActive && (
                      <div
                        style={{
                          marginLeft: "auto",
                          width: 9,
                          height: 9,
                          borderRadius: "50%",
                          background: item.color,
                          boxShadow: `0 0 14px ${item.color}90`,
                          animation: "blink 2.2s infinite",
                        }}
                      />
                    )}
                  </button>
                );
              })}

              {/* MORE dropdown trigger */}
              <div ref={moreButtonRef} style={{ position: "relative" }}>
                <button
                  onClick={() => setMoreOpen(!moreOpen)}
                  className={`nav-item ${moreOpen ? "active" : ""}`}
                  style={{ color: moreOpen ? "#a78bfa" : "var(--text)" }}
                >
                  <Layers size={19} />
                  <span>MORE</span>
                  <ChevronDown
                    size={17}
                    style={{
                      transform: moreOpen ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform 0.45s ease",
                    }}
                  />
                </button>

                {moreOpen && (
                  <div className="more-dropdown">
                    {extendedLinks.map((item) => {
                      const isActive = currentRoute === item.path;
                      const Icon = item.icon;

                      return (
                        <button
                          key={item.path}
                          onClick={() => navigateTo(item.path)}
                          className="dropdown-entry"
                          style={{
                            "--c1": item.color,
                            "--c2": `${item.color}b0`,
                          }}
                        >
                          <div className="icon-container">
                            <Icon size={23} color="#0f0e1a" strokeWidth={2.5} />
                          </div>

                          <div style={{ flex: 1 }}>
                            <div
                              style={{
                                fontFamily: "'Rajdhani', sans-serif",
                                fontSize: "1.08rem",
                                fontWeight: 700,
                                color: isActive ? item.color : "var(--text)",
                              }}
                            >
                              {item.label}
                            </div>
                            <div
                              style={{
                                fontSize: "0.8rem",
                                color: "var(--text-dim)",
                                marginTop: "4px",
                              }}
                            >
                              {item.desc}
                            </div>
                          </div>

                          {item.badge && (
                            <span
                              style={{
                                background: "rgba(255,255,255,0.08)",
                                padding: "5px 11px",
                                borderRadius: "14px",
                                fontSize: "0.74rem",
                                fontFamily: "'Roboto Mono', monospace",
                                color: "#c4b5fd",
                                border: "1px solid rgba(0,212,255,0.25)",
                              }}
                            >
                              {item.badge}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Live time display */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.8rem",
                  padding: "0.8rem 1.4rem",
                  background: "rgba(0,212,255,0.07)",
                  border: "1px solid rgba(0,212,255,0.32)",
                  borderRadius: "14px",
                  fontFamily: "'Roboto Mono', monospace",
                  fontSize: "0.87rem",
                  color: "#00d4ff",
                  boxShadow: "0 0 28px rgba(0,212,255,0.18)",
                }}
              >
                <Clock size={17} />
                {currentTime.toLocaleTimeString("en-US", {
                  hour12: false,
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                })}
              </div>
            </div>
          )}

          {/* Mobile menu toggle */}
          {isMobile && (
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              style={{
                background: menuOpen
                  ? "linear-gradient(90deg, #00d4ff, #a78bfa)"
                  : "rgba(255,255,255,0.07)",
                border: menuOpen ? "2px solid #fff" : "1px solid rgba(0,212,255,0.35)",
                borderRadius: "14px",
                padding: "1rem",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: menuOpen ? "0 0 40px rgba(0,212,255,0.45)" : "none",
                transition: "all 0.45s ease",
              }}
            >
              {menuOpen ? <X size={30} /> : <Menu size={30} />}
            </button>
          )}
        </div>
      </nav>

      {/* ─── MOBILE MENU ──────────────────────────────────────── */}
      {isMobile && menuOpen && (
        <div className="mobile-fullscreen-menu">
          <div style={{ maxWidth: "720px", margin: "0 auto" }}>
            {/* Time in mobile menu */}
            <div
              style={{
                textAlign: "center",
                padding: "1.6rem",
                background: "rgba(0,212,255,0.07)",
                borderRadius: "18px",
                border: "1px solid rgba(0,212,255,0.28)",
                marginBottom: "2.4rem",
                fontFamily: "'Roboto Mono', monospace",
                color: "#00d4ff",
                fontSize: "1.15rem",
                boxShadow: "0 0 35px rgba(0,212,255,0.22)",
              }}
            >
              SYSTEM CLOCK : {currentTime.toLocaleTimeString("en-US", { hour12: false })}
            </div>

            {/* Primary links */}
            {primaryLinks.map((item, index) => {
              const active = currentRoute === item.path;
              const Icon = item.icon;

              return (
                <button
                  key={item.path}
                  onClick={() => navigateTo(item.path)}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    gap: "1.5rem",
                    padding: "1.4rem 1.7rem",
                    marginBottom: "1.1rem",
                    background: active ? "rgba(0,212,255,0.14)" : "rgba(255,255,255,0.04)",
                    border: active ? `2px solid ${item.color}` : "1px solid rgba(0,212,255,0.18)",
                    borderRadius: "18px",
                    color: active ? item.color : "var(--text)",
                    fontSize: "1.15rem",
                    fontWeight: active ? 700 : 500,
                    fontFamily: "'Rajdhani', sans-serif",
                    letterSpacing: "0.9px",
                    boxShadow: active ? `0 12px 40px rgba(0,212,255,0.28)` : "none",
                    transition: "all 0.38s ease",
                    animation: `fadeInUp 0.6s ease-out forwards`,
                    animationDelay: `${index * 0.06}s`,
                    opacity: 0,
                  }}
                >
                  <div
                    style={{
                      width: 62,
                      height: 62,
                      borderRadius: "14px",
                      background: `linear-gradient(135deg, ${item.color}, ${item.color}b0)`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: "0 8px 28px rgba(0,0,0,0.5)",
                    }}
                  >
                    <Icon size={30} color="#0f0e1a" strokeWidth={2.5} />
                  </div>

                  <div style={{ flex: 1, textAlign: "left" }}>
                    <div style={{ fontSize: "1.3rem", fontWeight: 700 }}>
                      {item.label}
                    </div>
                    <div style={{ fontSize: "0.94rem", color: "var(--text-dim)", marginTop: "5px" }}>
                      {item.desc}
                    </div>
                  </div>
                </button>
              );
            })}

            <div
              style={{
                height: 1,
                background: "linear-gradient(90deg, transparent, #00d4ff80, transparent)",
                margin: "2.8rem 0",
                boxShadow: "0 0 24px rgba(0,212,255,0.35)",
              }}
            />

            {/* Extended links */}
            {extendedLinks.map((item, index) => {
              const active = currentRoute === item.path;
              const Icon = item.icon;

              return (
                <button
                  key={item.path}
                  onClick={() => navigateTo(item.path)}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    gap: "1.5rem",
                    padding: "1.4rem 1.7rem",
                    marginBottom: "1.1rem",
                    background: active ? "rgba(0,212,255,0.14)" : "rgba(255,255,255,0.04)",
                    border: active ? `2px solid ${item.color}` : "1px solid rgba(0,212,255,0.18)",
                    borderRadius: "18px",
                    color: active ? item.color : "var(--text)",
                    fontSize: "1.15rem",
                    fontWeight: active ? 700 : 500,
                    fontFamily: "'Rajdhani', sans-serif",
                    letterSpacing: "0.9px",
                    boxShadow: active ? `0 12px 40px rgba(0,212,255,0.28)` : "none",
                    animation: `fadeInUp 0.6s ease-out forwards`,
                    animationDelay: `${(primaryLinks.length + index) * 0.05}s`,
                    opacity: 0,
                  }}
                >
                  <div
                    style={{
                      width: 62,
                      height: 62,
                      borderRadius: "14px",
                      background: `linear-gradient(135deg, ${item.color}, ${item.color}b0)`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: "0 8px 28px rgba(0,0,0,0.5)",
                    }}
                  >
                    <Icon size={30} color="#0f0e1a" strokeWidth={2.5} />
                  </div>

                  <div style={{ flex: 1, textAlign: "left" }}>
                    <div style={{ fontSize: "1.3rem", fontWeight: 700 }}>
                      {item.label}
                    </div>
                    <div style={{ fontSize: "0.94rem", color: "var(--text-dim)", marginTop: "5px" }}>
                      {item.desc}
                    </div>
                  </div>

                  {item.badge && (
                    <div
                      style={{
                        background: "rgba(0,212,255,0.12)",
                        padding: "7px 13px",
                        borderRadius: "14px",
                        fontSize: "0.84rem",
                        color: "#c4b5fd",
                        border: "1px solid rgba(0,212,255,0.35)",
                      }}
                    >
                      {item.badge}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Simple fade-in animation for mobile items */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes breathe {
          0%, 100% { opacity: 0.75; transform: scale(1); }
          50%      { opacity: 0.95; transform: scale(1.08); }
        }
        @keyframes gradientFlow {
          0%   { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50%      { opacity: 0.4; }
        }
      `}</style>
    </>
  );
};

export default ModernCyberNav;