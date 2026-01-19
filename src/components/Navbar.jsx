"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaGithub,
  FaLinkedin,
  FaHome,
  FaGraduationCap,
  FaBriefcase,
  FaCode,
  FaEllipsisH,
  FaTrophy,
  FaLaptopCode,
  FaFileAlt,
  FaCertificate,
  FaHeart,
  FaAward,
  FaEnvelope,
  FaChevronDown,
} from "react-icons/fa";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);
  const dropdownRef = useRef(null);
  const navRef = useRef(null);

  // Spring-based mouse following glow (very subtle)
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

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        setMoreDropdownOpen(false);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setMoreDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
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
    { label: "Achivements", path: "/achivements", icon: <FaAward /> },
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

  const navContainer = {
    hidden: { opacity: 0, y: -90 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, type: "spring", stiffness: 80, damping: 14 },
    },
  };

  const itemContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.07, delayChildren: 0.3 },
    },
  };

  const itemSpring = {
    hidden: { y: 32, opacity: 0, scale: 0.92 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 260, damping: 24 },
    },
  };

  const dropdownSpring = {
    hidden: { opacity: 0, scale: 0.88, y: -16 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: "spring", stiffness: 380, damping: 28 },
    },
    exit: {
      opacity: 0,
      scale: 0.88,
      y: -16,
      transition: { duration: 0.18, ease: "easeIn" },
    },
  };

  return (
    <>
      <style>{`
        :root {
          --primary: #7c3aed;
          --primary-light: #a78bfa;
          --primary-dark: #5b21b6;
          --accent:black;
          --text: #ffffff;
          --text-dim: #e0e7ff;
          --bg-dark: #000000;
          --bg-nav: #000000;
        }

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        @keyframes breathe-glow {
          0%, 100% { opacity: 0.35; transform: scale(1); }
          50%      { opacity: 0.7;  transform: scale(1.15); }
        }

        @keyframes ultra-shimmer {
          0%   { background-position: -1200px 0; }
          100% { background-position: 1200px 0; }
        }

        @keyframes flow-border {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 200% 50%; }
          100% { background-position: 0% 50%; }
        }

        .nav-container {
          position: relative;
          overflow: hidden;
        }

        .nav-glow-core {
          position: relative;
          z-index: 1;
          transition: all 0.45s cubic-bezier(0.34, 1.56, 0.64, 1);
          color: var(--text) !important;
        }

        .nav-glow-core:hover {
          transform: translateY(-3px) scale(1.04);
        }

        .nav-active .nav-glow-core {
          background: linear-gradient(135deg, rgba(124,58,237,0.38), rgba(236,72,153,0.32), rgba(167,139,250,0.38)) !important;
          background-size: 300% 300%;
          animation: flow-border 6s ease infinite, breathe-glow 4s ease-in-out infinite;
          color: white !important;
          font-weight: 700 !important;
          box-shadow: 0 0 28px rgba(124,58,237,0.55);
        }

        .nav-active::after {
          content: '';
          position: absolute;
          inset: -3px;
          border-radius: inherit;
          background: linear-gradient(45deg, transparent, var(--accent), transparent);
          opacity: 0.6;
          filter: blur(12px);
          z-index: -1;
        }

        .logo-gradient {
          background: linear-gradient(
            90deg,
            #7c3aed 0%,
            #c084fc 25%,
            #ec4899 50%,
            #a78bfa 75%,
            #7c3aed 100%
          );
          background-size: 300% auto;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: ultra-shimmer 8s linear infinite;
        }

        .mobile-overlay {
          background: radial-gradient(circle at 30% 20%, rgba(124,58,237,0.18), transparent 40%),
                      radial-gradient(circle at 70% 80%, rgba(236,72,153,0.14), transparent 50%),
                      #000000;
        }

        .dropdown-premium {
          background: linear-gradient(145deg, rgba(20,20,20,0.96), rgba(10,10,10,0.96));
          backdrop-filter: blur(32px);
          border: 1px solid rgba(167,139,250,0.28);
        }

        .dropdown-premium::before {
          content: '';
          position: absolute;
          inset: -2px;
          border-radius: inherit;
          background: linear-gradient(90deg, transparent, rgba(167,139,250,0.45), transparent);
          animation: ultra-shimmer 7s linear infinite;
          opacity: 0.4;
          z-index: -1;
        }

        @media (max-width: 1024px) {
          .nav-items-desktop { display: none !important; }
        }

        @media (min-width: 1025px) {
          .hamburger { display: none !important; }
        }

        .nav-glow-core, .nav-glow-core * {
          color: #ffffff !important;
        }
      `}</style>

      <motion.nav
        ref={navRef}
        variants={navContainer}
        initial="hidden"
        animate="visible"
        onMouseMove={handleMouseMove}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          height: "88px",
          background: "#000000",
          backdropFilter: isScrolled ? "blur(32px) saturate(180%)" : "blur(24px) saturate(160%)",
          borderBottom: isScrolled
            ? "1px solid rgba(167,139,250,0.42)"
            : "1px solid rgba(167,139,250,0.18)",
          boxShadow: isScrolled
            ? "0 16px 60px rgba(0,0,0,0.9), 0 0 100px rgba(124,58,237,0.22)"
            : "0 10px 40px rgba(0,0,0,0.75)",
          transition: "all 0.7s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        {isScrolled && !isMobile && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(circle 800px at ${springX}px ${springY}px, rgba(167,139,250,0.08), transparent 60%)`,
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
          <motion.button
            onClick={() => handleNavClick("/home")}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.96 }}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: isMobile ? "1.8rem" : "2.2rem",
              fontWeight: "900",
              letterSpacing: "-1.1px",
              display: "flex",
              alignItems: "center",
              gap: "14px",
              padding: 0,
            }}
          >
            <motion.span
              animate={{
                rotate: [0, 18, -18, 0],
                y: [0, -8, 0],
                scale: [1, 1.12, 1],
              }}
              transition={{
                duration: 4.2,
                repeat: Infinity,
                repeatDelay: 2.8,
                ease: "easeInOut",
              }}
              style={{ fontSize: isMobile ? "2rem" : "2.4rem" }}
            >
              ⚡
            </motion.span>
            <span className="logo-gradient">Bhagavan</span>
          </motion.button>

          {!isMobile && (
            <motion.div
              variants={itemContainer}
              initial="hidden"
              animate="visible"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "14px",
              }}
              className="nav-items-desktop"
            >
              {visibleItems.map((item, i) => (
                <motion.div
                  key={item.path}
                  variants={itemSpring}
                  custom={i}
                  className={`nav-glow ${currentPath === item.path ? "nav-active" : ""}`}
                >
                  <motion.button
                    onClick={() => handleNavClick(item.path)}
                    whileHover={{ scale: 1.06, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    className="nav-glow-core"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      padding: "12px 24px",
                      color: "#ffffff",
                      fontSize: "0.97rem",
                      fontWeight: "500",
                      borderRadius: "14px",
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(167,139,250,0.16)",
                      backdropFilter: "blur(12px)",
                      cursor: "pointer",
                      whiteSpace: "nowrap",
                    }}
                  >
                    <motion.span
                      animate={
                        currentPath === item.path
                          ? { rotate: [0, 12, -12, 0], scale: [1, 1.15, 1] }
                          : {}
                      }
                      transition={{ duration: 0.6 }}
                      style={{ fontSize: "1.1rem", opacity: 0.9, color: "#ffffff" }}
                    >
                      {item.icon}
                    </motion.span>
                    <span style={{ color: "#ffffff" }}>{item.label}</span>
                  </motion.button>
                </motion.div>
              ))}

              <div ref={dropdownRef} style={{ position: "relative" }}>
                <motion.button
                  whileHover={{ scale: 1.07 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => setMoreDropdownOpen(!moreDropdownOpen)}
                  className={`nav-glow ${moreDropdownOpen ? "nav-active" : ""}`}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "12px 24px",
                    color: "#ffffff",
                    fontSize: "0.97rem",
                    fontWeight: "600",
                    borderRadius: "14px",
                    background: moreDropdownOpen
                      ? "rgba(124,58,237,0.22)"
                      : "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(167,139,250,0.22)",
                    backdropFilter: "blur(12px)",
                    cursor: "pointer",
                  }}
                >
                  <motion.span
                    animate={{ rotate: moreDropdownOpen ? 180 : 0 }}
                    transition={{ duration: 0.4 }}
                    style={{ color: "#ffffff" }}
                  >
                    <FaEllipsisH />
                  </motion.span>
                  <span style={{ color: "#ffffff" }}>More</span>
                  <FaChevronDown style={{ fontSize: "0.8rem", color: "#ffffff" }} />
                </motion.button>

                <AnimatePresence>
                  {moreDropdownOpen && (
                    <motion.div
                      variants={dropdownSpring}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="dropdown-premium"
                      style={{
                        position: "absolute",
                        top: "calc(100% + 20px)",
                        right: 0,
                        minWidth: "300px",
                        borderRadius: "20px",
                        padding: "16px",
                        boxShadow: "0 30px 90px rgba(0,0,0,0.85), 0 0 80px rgba(124,58,237,0.28)",
                        zIndex: 1001,
                      }}
                    >
                      {moreItems.map((item, i) => (
                        <motion.button
                          key={item.path}
                          onClick={() => handleNavClick(item.path)}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.05 }}
                          whileHover={{ x: 8, scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          className={`nav-glow ${currentPath === item.path ? "nav-active" : ""}`}
                          style={{
                            width: "100%",
                            display: "flex",
                            alignItems: "center",
                            gap: "16px",
                            padding: "16px 20px",
                            color: "#ffffff",
                            fontSize: "0.98rem",
                            fontWeight: "500",
                            borderRadius: "14px",
                            background: "transparent",
                            border: "none",
                            cursor: "pointer",
                            textAlign: "left",
                            marginBottom: i < moreItems.length - 1 ? "6px" : "0",
                          }}
                        >
                          <motion.span style={{ fontSize: "1.2rem", opacity: 0.9, color: "#ffffff" }}>
                            {item.icon}
                          </motion.span>
                          <span style={{ color: "#ffffff" }}>{item.label}</span>
                        </motion.button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}

          <div style={{ display: "flex", alignItems: "center", gap: isMobile ? "20px" : "32px" }}>
            <motion.a
              href="https://github.com/bhagavan444"
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.3, rotate: 12 }}
              whileTap={{ scale: 0.88 }}
              style={{
                color: "#ffffff",
                fontSize: isMobile ? "1.4rem" : "1.7rem",
                filter: "drop-shadow(0 0 10px rgba(255,255,255,0.5))",
              }}
            >
              <FaGithub />
            </motion.a>

            <motion.a
              href="https://www.linkedin.com/in/gopalajosyula-siva-satya-sai-bhagavan-1624a027b/"
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.3, rotate: -12 }}
              whileTap={{ scale: 0.88 }}
              style={{
                color: "#ffffff",
                fontSize: isMobile ? "1.4rem" : "1.7rem",
                filter: "drop-shadow(0 0 10px rgba(255,255,255,0.5))",
              }}
            >
              <FaLinkedin />
            </motion.a>

            {isMobile && (
              <motion.button
                onClick={() => setMenuOpen(!menuOpen)}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.92 }}
                style={{
                  background: menuOpen
                    ? "linear-gradient(135deg, rgba(124,58,237,0.4), rgba(236,72,153,0.35))"
                    : "rgba(255,255,255,0.07)",
                  border: "1px solid rgba(167,139,250,0.3)",
                  color: "#ffffff",
                  fontSize: "1.7rem",
                  padding: "14px",
                  borderRadius: "14px",
                  cursor: "pointer",
                  boxShadow: menuOpen
                    ? "0 0 40px rgba(124,58,237,0.45)"
                    : "0 6px 16px rgba(0,0,0,0.3)",
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
                      transition={{ duration: 0.45 }}
                    >
                      <FaTimes style={{ color: "#ffffff" }} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="open"
                      initial={{ rotate: 180, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -180, opacity: 0 }}
                      transition={{ duration: 0.45 }}
                    >
                      <FaBars style={{ color: "#ffffff" }} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            )}
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && isMobile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="mobile-overlay"
            style={{
              position: "fixed",
              inset: "88px 0 0 0",
              backdropFilter: "blur(32px) saturate(190%)",
              zIndex: 999,
              overflowY: "auto",
              padding: "2.5rem 1.8rem",
            }}
            onClick={(e) => e.target === e.currentTarget && setMenuOpen(false)}
          >
            <motion.div
              variants={itemContainer}
              initial="hidden"
              animate="visible"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                maxWidth: "540px",
                margin: "0 auto",
                paddingBottom: "4rem",
              }}
            >
              {navItems.map((item, i) => (
                <motion.button
                  key={item.path}
                  variants={itemSpring}
                  custom={i}
                  onClick={() => handleNavClick(item.path)}
                  whileHover={{ scale: 1.04, x: 10 }}
                  whileTap={{ scale: 0.97 }}
                  className={`nav-glow ${currentPath === item.path ? "nav-active" : ""}`}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "20px",
                    padding: "22px 28px",
                    background: currentPath === item.path
                      ? "rgba(124,58,237,0.32)"
                      : "rgba(255,255,255,0.06)",
                    borderRadius: "18px",
                    color: "#ffffff",
                    fontSize: "1.1rem",
                    fontWeight: "500",
                    border: "1px solid rgba(167,139,250,0.22)",
                    backdropFilter: "blur(12px)",
                    cursor: "pointer",
                    width: "100%",
                    textAlign: "left",
                  }}
                >
                  <motion.span
                    style={{ fontSize: "1.6rem", opacity: 0.92, color: "#ffffff" }}
                    animate={
                      currentPath === item.path
                        ? { rotate: [0, 18, -18, 0], scale: [1, 1.2, 1] }
                        : {}
                    }
                    transition={{ duration: 0.7 }}
                  >
                    {item.icon}
                  </motion.span>
                  <span style={{ color: "#ffffff" }}>{item.label}</span>
                </motion.button>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;