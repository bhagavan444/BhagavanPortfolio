"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import {
  FaBars, FaTimes, FaHome, FaGraduationCap,
  FaBriefcase, FaCode, FaEllipsisH, FaTrophy, FaLaptopCode, FaFileAlt,
  FaCertificate, FaHeart, FaAward, FaEnvelope, FaChevronDown
} from "react-icons/fa";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);
  const navRef = useRef(null);

  // Mouse-following subtle glow
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { damping: 50, stiffness: 300 });
  const springY = useSpring(mouseY, { damping: 50, stiffness: 300 });

  const currentPath = location.pathname === "/" ? "/home" : location.pathname;

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 1024;
      setIsMobile(mobile);
      if (!mobile) setMenuOpen(false);
    };

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll, { passive: true });

    handleResize();
    handleScroll();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleMouseMove = useCallback(
    (e) => {
      if (!isMobile && navRef.current) {
        const rect = navRef.current.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
      }
    },
    [isMobile, mouseX, mouseY]
  );

  const navItems = [
    { label: "Home", path: "/home", icon: <FaHome /> },
    { label: "Education", path: "/education", icon: <FaGraduationCap /> },
    { label: "Skills", path: "/myskills", icon: <FaCode /> },
    { label: "Internships", path: "/internships", icon: <FaBriefcase /> },
    { label: "Projects", path: "/projects", icon: <FaLaptopCode /> },
    { label: "Hackathons", path: "/hackathons", icon: <FaTrophy /> },
    { label: "Workshops", path: "/workshops", icon: <FaLaptopCode /> },
    { label: "Resume", path: "/resume", icon: <FaFileAlt /> },
    { label: "Certifications", path: "/certifications", icon: <FaCertificate /> },
    { label: "Beyond Coding", path: "/beyondcoding", icon: <FaHeart /> },
    { label: "Achievements", path: "/achivements", icon: <FaAward /> },
    { label: "Contact", path: "/contact", icon: <FaEnvelope /> },
  ];

  const visibleItems = navItems.slice(0, 6);
  const moreItems = navItems.slice(6);

  const handleNavClick = (path) => {
    if (path !== currentPath) {
      navigate(path);
    }
    setMenuOpen(false);
    setMoreDropdownOpen(false);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Fira+Code:wght@400;500;600&display=swap');

        :root {
          --neon-cyan: #00ffff;
          --neon-purple: #8a2be2;
          --bg-dark: #000000;
          --glass: rgba(8,8,22,0.84);
          --border-glow: rgba(0,255,255,0.24);
        }

        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }

        @keyframes float {
          0%,100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }

        @keyframes pulse {
          0%,100% { opacity: 1; }
          50% { opacity: 0.7; }
        }

        .nav-item {
          position: relative;
          overflow: hidden;
          transition: all 0.45s cubic-bezier(0.23,1,0.32,1);
        }

        .nav-item:hover {
          transform: translateY(-4px) scale(1.05);
        }

        .nav-item::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, transparent 35%, rgba(0,255,255,0.18) 50%, transparent 65%);
          animation: scan 7s linear infinite;
          pointer-events: none;
          z-index: 1;
          opacity: 0;
          transition: opacity 0.4s;
        }

        .nav-item:hover::before,
        .nav-active::before {
          opacity: 0.8;
        }

        .nav-active {
          background: rgba(0,255,255,0.18) !important;
          border-color: var(--neon-cyan) !important;
          box-shadow: 0 0 40px var(--neon-cyan) !important;
          color: var(--neon-cyan) !important;
          font-weight: 700 !important;
        }

        .nav-active .icon {
          animation: float 3s ease-in-out infinite;
        }

        .mobile-menu {
          background: rgba(0,0,0,0.92);
          backdrop-filter: blur(16px);
          border-top: 2px solid rgba(0,255,255,0.3);
        }

        .logo-glow {
          text-shadow: 0 0 20px var(--neon-cyan), 0 0 40px var(--neon-cyan);
        }

        .blink {
          animation: blink 1s step-end infinite;
        }

        @keyframes blink {
          50% { opacity: 0; }
        }
      `}</style>

      <motion.nav
        ref={navRef}
        onMouseMove={handleMouseMove}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          height: "88px",
          background: 'var(--bg-dark)',
          backdropFilter: isScrolled ? "blur(32px) saturate(180%)" : "blur(24px) saturate(160%)",
          borderBottom: isScrolled
            ? "2px solid rgba(0,255,255,0.35)"
            : "1px solid rgba(0,255,255,0.18)",
          boxShadow: isScrolled
            ? "0 16px 60px rgba(0,0,0,0.9), 0 0 100px rgba(0,255,255,0.22)"
            : "0 10px 40px rgba(0,0,0,0.75)",
          transition: "all 0.7s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        {/* Subtle mouse-follow glow */}
        {!isMobile && isScrolled && (
          <motion.div
            style={{
              position: "absolute",
              inset: 0,
              background: `radial-gradient(circle 600px at ${springX}px ${springY}px, rgba(0,255,255,0.12), transparent 60%)`,
              pointerEvents: "none",
              opacity: 0.7,
            }}
          />
        )}

        <div
          style={{
            maxWidth: "1680px",
            margin: "0 auto",
            padding: "0 40px",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "relative",
          }}
        >
          {/* Logo */}
          <motion.button
            onClick={() => handleNavClick("/home")}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.96 }}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: isMobile ? "2.2rem" : "2.6rem",
              fontWeight: "900",
              letterSpacing: "-1.2px",
              display: "flex",
              alignItems: "center",
              gap: "14px",
              padding: 0,
            }}
          >
            <motion.span
              animate={{
                rotate: [0, 12, -12, 0],
                y: [0, -6, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 4.2,
                repeat: Infinity,
                repeatDelay: 2.8,
                ease: "easeInOut",
              }}
              className="logo-glow"
              style={{ color: "#00ffff" }}
            >
              ⚡
            </motion.span>
            <span style={{
              background: "linear-gradient(90deg, #00ffff, #8a2be2, #00ffff)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
              fontSize: isMobile ? "1.8rem" : "2.2rem",
            }}>
              Bhagavan 
            </span>
          </motion.button>

          {/* Desktop Nav */}
          {!isMobile && (
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}>
              {visibleItems.map((item) => {
                const isActive = currentPath === item.path;

                return (
                  <motion.button
                    key={item.path}
                    onClick={() => handleNavClick(item.path)}
                    whileHover={{ scale: 1.06, y: -3 }}
                    whileTap={{ scale: 0.97 }}
                    className={`nav-item ${isActive ? "nav-active" : ""}`}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      padding: "12px 22px",
                      color: "#ffffff",
                      fontSize: "0.98rem",
                      fontWeight: isActive ? "700" : "500",
                      borderRadius: "14px",
                      background: isActive ? "rgba(0,255,255,0.16)" : "rgba(255,255,255,0.04)",
                      border: isActive
                        ? "1.5px solid rgba(0,255,255,0.5)"
                        : "1px solid rgba(0,255,255,0.18)",
                      backdropFilter: "blur(12px)",
                      cursor: "pointer",
                      whiteSpace: "nowrap",
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    <motion.span
                      animate={isActive ? { rotate: [0, 12, -12, 0], scale: [1, 1.15, 1] } : {}}
                      transition={{ duration: 0.7 }}
                      style={{ fontSize: "1.2rem", color: isActive ? "#00ffff" : "#e0e0ff" }}
                    >
                      {item.icon}
                    </motion.span>
                    <span style={{ color: isActive ? "#00ffff" : "#e0e0ff" }}>
                      {item.label}
                    </span>
                  </motion.button>
                );
              })}

              {/* More Dropdown */}
              <div style={{ position: "relative" }}>
                <motion.button
                  whileHover={{ scale: 1.07 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => setMoreDropdownOpen(!moreDropdownOpen)}
                  className={`nav-item ${moreDropdownOpen ? "nav-active" : ""}`}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "12px 22px",
                    color: "#ffffff",
                    fontSize: "0.98rem",
                    fontWeight: moreDropdownOpen ? "700" : "500",
                    borderRadius: "14px",
                    background: moreDropdownOpen ? "rgba(0,255,255,0.16)" : "rgba(255,255,255,0.04)",
                    border: moreDropdownOpen
                      ? "1.5px solid rgba(0,255,255,0.5)"
                      : "1px solid rgba(0,255,255,0.18)",
                    backdropFilter: "blur(12px)",
                    cursor: "pointer",
                  }}
                >
                  <motion.span
                    animate={{ rotate: moreDropdownOpen ? 180 : 0 }}
                    transition={{ duration: 0.4 }}
                    style={{ color: moreDropdownOpen ? "#00ffff" : "#e0e0ff" }}
                  >
                    <FaEllipsisH />
                  </motion.span>
                  <span style={{ color: moreDropdownOpen ? "#00ffff" : "#e0e0ff" }}>
                    More
                  </span>
                  <FaChevronDown style={{ fontSize: "0.8rem" }} />
                </motion.button>

                <AnimatePresence>
                  {moreDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -20, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -20, scale: 0.95 }}
                      transition={{ duration: 0.25 }}
                      style={{
                        position: "absolute",
                        top: "calc(100% + 16px)",
                        right: 0,
                        minWidth: "280px",
                        background: "rgba(8,8,22,0.94)",
                        backdropFilter: "blur(20px)",
                        border: "2px solid rgba(0,255,255,0.4)",
                        borderRadius: "16px",
                        boxShadow: "0 20px 80px rgba(0,0,0,0.9), 0 0 60px rgba(0,255,255,0.25)",
                        padding: "1rem",
                        zIndex: 1001,
                      }}
                    >
                      {moreItems.map((item) => {
                        const isActive = currentPath === item.path;

                        return (
                          <motion.button
                            key={item.path}
                            onClick={() => handleNavClick(item.path)}
                            whileHover={{ x: 8, scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            className={`nav-item ${isActive ? "nav-active" : ""}`}
                            style={{
                              width: "100%",
                              display: "flex",
                              alignItems: "center",
                              gap: "16px",
                              padding: "14px 20px",
                              color: isActive ? "#00ffff" : "#e0e0ff",
                              fontSize: "0.98rem",
                              fontWeight: isActive ? "700" : "500",
                              borderRadius: "12px",
                              background: "transparent",
                              border: "none",
                              cursor: "pointer",
                              textAlign: "left",
                              marginBottom: "6px",
                            }}
                          >
                            <motion.span style={{ fontSize: "1.3rem", color: isActive ? "#00ffff" : "#e0e0ff" }}>
                              {item.icon}
                            </motion.span>
                            <span>{item.label}</span>
                          </motion.button>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          )}

          {/* Right Side - Hamburger (only) */}
          <div style={{ display: "flex", alignItems: "center" }}>
            {isMobile && (
              <motion.button
                onClick={() => setMenuOpen(!menuOpen)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                style={{
                  background: menuOpen
                    ? "linear-gradient(135deg, rgba(0,255,255,0.35), rgba(138,43,226,0.3))"
                    : "rgba(255,255,255,0.08)",
                  border: menuOpen
                    ? "2px solid rgba(0,255,255,0.6)"
                    : "1.5px solid rgba(0,255,255,0.3)",
                  color: "#00ffff",
                  fontSize: "1.8rem",
                  padding: "14px",
                  borderRadius: "14px",
                  cursor: "pointer",
                  boxShadow: menuOpen
                    ? "0 0 50px rgba(0,255,255,0.5)"
                    : "0 6px 20px rgba(0,0,0,0.4)",
                }}
                aria-label="Toggle menu"
              >
                <AnimatePresence mode="wait">
                  {menuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -180, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 180, opacity: 0 }}
                      transition={{ duration: 0.4 }}
                    >
                      <FaTimes />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="open"
                      initial={{ rotate: 180, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -180, opacity: 0 }}
                      transition={{ duration: 0.4 }}
                    >
                      <FaBars />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            )}
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && isMobile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            style={{
              position: "fixed",
              inset: "88px 0 0 0",
              background: "rgba(0,0,0,0.94)",
              backdropFilter: "blur(20px)",
              zIndex: 999,
              overflowY: "auto",
              padding: "2.5rem 1.8rem",
              borderTop: "2px solid rgba(0,255,255,0.4)",
            }}
            onClick={(e) => e.target === e.currentTarget && setMenuOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1.2rem",
                maxWidth: "540px",
                margin: "0 auto",
                paddingBottom: "5rem",
              }}
            >
              {navItems.map((item) => {
                const isActive = currentPath === item.path;

                return (
                  <motion.button
                    key={item.path}
                    onClick={() => handleNavClick(item.path)}
                    whileHover={{ scale: 1.04, x: 10 }}
                    whileTap={{ scale: 0.97 }}
                    className={`nav-item ${isActive ? "nav-active" : ""}`}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "18px",
                      padding: "22px 28px",
                      background: isActive ? "rgba(0,255,255,0.22)" : "rgba(255,255,255,0.06)",
                      borderRadius: "18px",
                      color: isActive ? "#00ffff" : "#e0e0ff",
                      fontSize: "1.15rem",
                      fontWeight: isActive ? "700" : "500",
                      border: isActive
                        ? "1.5px solid rgba(0,255,255,0.6)"
                        : "1px solid rgba(0,255,255,0.22)",
                      backdropFilter: "blur(12px)",
                      cursor: "pointer",
                      width: "100%",
                      textAlign: "left",
                    }}
                  >
                    <motion.span style={{ fontSize: "1.7rem", color: isActive ? "#00ffff" : "#e0e0ff" }}>
                      {item.icon}
                    </motion.span>
                    <span>{item.label}</span>
                  </motion.button>
                );
              })}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;