"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, useScroll, useVelocity } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import {
  FaBars, FaTimes, FaHome, FaGraduationCap, FaBriefcase,
  FaCode, FaLaptopCode, FaTrophy, FaFileAlt, FaCertificate,
  FaHeart, FaAward, FaEnvelope, FaChevronDown,
  FaRocket, FaBrain, FaStar, FaGem, FaAtom, FaCube
} from "react-icons/fa";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);

  const [menuOpen, setMenuOpen] = useState(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);
  const [activeHover, setActiveHover] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const navRef = useRef(null);
  const canvasRef = useRef(null);

  // Advanced motion values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { damping: 50, stiffness: 400 });
  const smoothMouseY = useSpring(mouseY, { damping: 50, stiffness: 400 });
  
  const navOpacity = useTransform(scrollY, [0, 100], [0.95, 1]);
  const navBlur = useTransform(scrollY, [0, 100], [20, 40]);
  const logoRotate = useTransform(scrollY, [0, 1000], [0, 360]);

  const currentPath = location.pathname === "/" ? "/home" : location.pathname;

  // Elite particle system with WebGL-like effects
  useEffect(() => {
    if (isMobile || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { alpha: true });
    let animationId;
    let particles = [];
    let connections = [];
    let time = 0;
    
    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      canvas.style.width = `${canvas.offsetWidth}px`;
      canvas.style.height = `${canvas.offsetHeight}px`;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();

    class Particle {
      constructor() {
        this.reset();
        this.y = Math.random() * canvas.height / window.devicePixelRatio;
        this.opacity = Math.random() * 0.5 + 0.3;
      }

      reset() {
        this.x = Math.random() * canvas.width / window.devicePixelRatio;
        this.y = -20;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = Math.random() * 0.3 + 0.2;
        this.size = Math.random() * 2.5 + 0.5;
        const colors = ['#00f5ff', '#7000ff', '#ff0080', '#00ff88', '#ffd700'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.life = 1;
        this.decay = Math.random() * 0.002 + 0.001;
      }

      update() {
        this.x += this.vx + Math.sin(time * 0.001 + this.x * 0.01) * 0.2;
        this.y += this.vy;
        this.life -= this.decay;
        
        const height = canvas.height / window.devicePixelRatio;
        if (this.y > height + 20 || this.life <= 0) {
          this.reset();
        }
        
        // Magnetic attraction to mouse
        const dx = mousePosition.x - this.x;
        const dy = mousePosition.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 150) {
          const force = (150 - dist) / 150;
          this.vx += dx * force * 0.001;
          this.vy += dy * force * 0.001;
        }
      }

      draw() {
        ctx.save();
        
        // Particle glow
        const gradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.size * 6
        );
        gradient.addColorStop(0, this.color + Math.floor(this.opacity * this.life * 255).toString(16).padStart(2, '0'));
        gradient.addColorStop(0.5, this.color + '40');
        gradient.addColorStop(1, 'transparent');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 6, 0, Math.PI * 2);
        ctx.fill();
        
        // Core particle
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.opacity * this.life;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.restore();
      }
    }

    particles = Array.from({ length: 60 }, () => new Particle());

    const drawConnections = () => {
      ctx.globalAlpha = 0.15;
      ctx.lineWidth = 1;
      
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < 120) {
            const opacity = (1 - dist / 120) * 0.3 * particles[i].life * particles[j].life;
            ctx.globalAlpha = opacity;
            
            const gradient = ctx.createLinearGradient(
              particles[i].x, particles[i].y,
              particles[j].x, particles[j].y
            );
            gradient.addColorStop(0, particles[i].color);
            gradient.addColorStop(1, particles[j].color);
            
            ctx.strokeStyle = gradient;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      time++;
      ctx.clearRect(0, 0, canvas.width / window.devicePixelRatio, canvas.height / window.devicePixelRatio);
      
      particles.forEach(p => {
        p.update();
        p.draw();
      });

      drawConnections();
      
      animationId = requestAnimationFrame(animate);
    };

    animate();
    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, [isMobile, mousePosition]);

  // Handle resize & scroll
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 1024;
      setIsMobile(mobile);
      if (!mobile) {
        setMenuOpen(false);
        setMoreDropdownOpen(false);
      }
    };

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
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

  // Mouse tracking
  const handleMouseMove = useCallback((e) => {
    if (!isMobile && navRef.current) {
      const rect = navRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      mouseX.set(x);
      mouseY.set(y);
      setMousePosition({ x, y });
    }
  }, [isMobile, mouseX, mouseY]);

  // Navigation items
  const navItems = [
    { label: "Home", path: "/home", icon: <FaHome />, gradient: "from-cyan-400 to-blue-500" },
    { label: "Education", path: "/education", icon: <FaGraduationCap />, gradient: "from-purple-400 to-pink-500" },
    { label: "Skills", path: "/myskills", icon: <FaCode />, gradient: "from-green-400 to-cyan-500" },
    { label: "Projects", path: "/projects", icon: <FaLaptopCode />, gradient: "from-orange-400 to-red-500" },
    { label: "Internships", path: "/internships", icon: <FaBriefcase />, gradient: "from-blue-400 to-indigo-500" },
    { label: "Hackathons", path: "/hackathons", icon: <FaTrophy />, gradient: "from-yellow-400 to-orange-500" },
    { label: "Certifications", path: "/certifications", icon: <FaCertificate />, gradient: "from-pink-400 to-purple-500" },
    { label: "Workshops", path: "/workshops", icon: <FaBrain />, gradient: "from-teal-400 to-green-500" },
    { label: "Achievements", path: "/achivements", icon: <FaAward />, gradient: "from-red-400 to-pink-500" },
    { label: "Beyond Coding", path: "/beyondcoding", icon: <FaHeart />, gradient: "from-rose-400 to-red-500" },
    { label: "Resume", path: "/resume", icon: <FaFileAlt />, gradient: "from-indigo-400 to-purple-500" },
    { label: "Contact", path: "/contact", icon: <FaEnvelope />, gradient: "from-cyan-400 to-teal-500" },
  ];

  const visibleItems = navItems.filter(item => 
    ["Home", "Education", "Skills", "Projects", "Contact"].includes(item.label)
  );

  const moreItems = navItems.filter(item => 
    !["Home", "Education", "Skills", "Projects", "Contact"].includes(item.label)
  );

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
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@300;400;500;600;700&display=swap');

        * {
          box-sizing: border-box;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        body {
          margin: 0;
          background: #000;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }

        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }

        @keyframes pulse-glow {
          0%, 100% { 
            filter: drop-shadow(0 0 8px currentColor) drop-shadow(0 0 16px currentColor);
          }
          50% { 
            filter: drop-shadow(0 0 16px currentColor) drop-shadow(0 0 32px currentColor);
          }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-12px) rotate(3deg); }
          66% { transform: translateY(-6px) rotate(-3deg); }
        }

        @keyframes morph {
          0%, 100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
          25% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
          50% { border-radius: 50% 30% 50% 60% / 30% 50% 60% 50%; }
          75% { border-radius: 40% 70% 60% 30% / 60% 40% 50% 70%; }
        }

        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        @keyframes border-dance {
          0%, 100% { 
            background-position: 0% 50%;
            transform: rotate(0deg);
          }
          50% { 
            background-position: 100% 50%;
            transform: rotate(180deg);
          }
        }

        .nav-glass {
          background: linear-gradient(
            135deg,
            rgba(0, 0, 0, 0.85) 0%,
            rgba(10, 10, 20, 0.9) 50%,
            rgba(0, 0, 0, 0.85) 100%
          );
          backdrop-filter: blur(40px) saturate(180%);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 
            0 8px 32px rgba(0, 0, 0, 0.4),
            0 0 0 1px rgba(255, 255, 255, 0.05),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
        }

        .nav-item-elite {
          position: relative;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .nav-item-elite::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.1) 0%,
            transparent 50%,
            rgba(255, 255, 255, 0.1) 100%
          );
          background-size: 200% 200%;
          animation: shimmer 3s linear infinite;
          opacity: 0;
          transition: opacity 0.3s;
        }

        .nav-item-elite:hover::before {
          opacity: 1;
        }

        .nav-item-elite::after {
          content: '';
          position: absolute;
          inset: -2px;
          background: linear-gradient(
            45deg,
            #00f5ff,
            #7000ff,
            #ff0080,
            #00ff88,
            #00f5ff
          );
          background-size: 300% 300%;
          animation: gradient-shift 4s ease infinite;
          border-radius: inherit;
          opacity: 0;
          z-index: -1;
          filter: blur(8px);
          transition: opacity 0.4s;
        }

        .nav-item-elite:hover::after {
          opacity: 0.5;
        }

        .nav-item-active {
          background: linear-gradient(
            135deg,
            rgba(0, 245, 255, 0.15) 0%,
            rgba(112, 0, 255, 0.15) 100%
          ) !important;
          border: 1px solid rgba(0, 245, 255, 0.5) !important;
          box-shadow: 
            0 0 30px rgba(0, 245, 255, 0.3),
            0 8px 32px rgba(0, 0, 0, 0.4),
            inset 0 0 20px rgba(0, 245, 255, 0.1) !important;
        }

        .nav-item-active::after {
          opacity: 0.7 !important;
        }

        .nav-item-active .nav-icon {
          animation: pulse-glow 2s ease-in-out infinite;
        }

        .morphing-bg {
          animation: morph 10s ease-in-out infinite;
        }

        .gradient-text {
          background: linear-gradient(
            90deg,
            #00f5ff 0%,
            #7000ff 25%,
            #ff0080 50%,
            #7000ff 75%,
            #00f5ff 100%
          );
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: gradient-shift 3s linear infinite;
        }

        .elite-dropdown {
          background: linear-gradient(
            135deg,
            rgba(5, 5, 15, 0.98) 0%,
            rgba(15, 5, 25, 0.98) 100%
          );
          backdrop-filter: blur(40px) saturate(180%);
          border: 1px solid rgba(0, 245, 255, 0.3);
          box-shadow: 
            0 32px 128px rgba(0, 0, 0, 0.8),
            0 0 80px rgba(0, 245, 255, 0.2),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
        }

        .mobile-menu-elite {
          background: linear-gradient(
            180deg,
            rgba(0, 0, 0, 0.98) 0%,
            rgba(10, 5, 20, 0.98) 100%
          );
          backdrop-filter: blur(40px) saturate(180%);
          border-top: 1px solid rgba(0, 245, 255, 0.3);
        }

        @media (max-width: 1024px) {
          .nav-item-elite:hover {
            transform: scale(1.02) !important;
          }
        }

        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }

        ::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.4);
        }

        ::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #00f5ff, #7000ff);
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, #7000ff, #ff0080);
        }

        .hover-lift {
          transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .hover-lift:hover {
          transform: translateY(-4px);
        }

        .magnetic-effect {
          transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>

      {/* Main Navbar */}
      <motion.nav
        ref={navRef}
        onMouseMove={handleMouseMove}
        className="nav-glass"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          padding: isScrolled ? '0.75rem 0' : '1rem 0',
          transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
        }}
      >
        {/* Particle Canvas */}
        {!isMobile && (
          <canvas
            ref={canvasRef}
            style={{
              position: 'absolute',
              inset: 0,
              pointerEvents: 'none',
              opacity: 0.8,
              zIndex: 0,
            }}
          />
        )}

        {/* Gradient Overlay following mouse */}
        {!isMobile && (
          <motion.div
            style={{
              position: 'absolute',
              inset: 0,
              background: `radial-gradient(circle 800px at ${smoothMouseX}px ${smoothMouseY}px, 
                rgba(0, 245, 255, 0.08) 0%, 
                rgba(112, 0, 255, 0.05) 30%,
                transparent 60%)`,
              pointerEvents: 'none',
              zIndex: 1,
              mixBlendMode: 'screen',
            }}
          />
        )}

        <div
          style={{
            maxWidth: '1920px',
            margin: '0 auto',
            padding: isMobile ? '0 1.5rem' : '0 3rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'relative',
            zIndex: 2,
          }}
        >
          {/* Logo Section */}
          <motion.button
            onClick={() => handleNavClick("/home")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              padding: 0,
            }}
          >
            <motion.div
              style={{
                position: 'relative',
                width: isMobile ? '48px' : '56px',
                height: isMobile ? '48px' : '56px',
              }}
            >
              {/* Rotating gradient border */}
              <motion.div
                className="morphing-bg"
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear",
                }}
                style={{
                  position: 'absolute',
                  inset: -3,
                  background: 'linear-gradient(45deg, #00f5ff, #7000ff, #ff0080, #00ff88, #00f5ff)',
                  backgroundSize: '300% 300%',
                  animation: 'gradient-shift 3s ease infinite',
                  borderRadius: '50%',
                  filter: 'blur(4px)',
                  opacity: 0.8,
                }}
              />

              {/* Logo background */}
              <motion.div
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.6 }}
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(135deg, rgba(0, 245, 255, 0.2), rgba(112, 0, 255, 0.2))',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid rgba(0, 245, 255, 0.4)',
                  boxShadow: '0 0 30px rgba(0, 245, 255, 0.4), inset 0 0 20px rgba(0, 245, 255, 0.1)',
                }}
              >
                <motion.div
                  animate={{
                    y: [0, -4, 0],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  style={{
                    fontSize: isMobile ? '1.5rem' : '1.8rem',
                    background: 'linear-gradient(135deg, #00f5ff, #7000ff)',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    color: 'transparent',
                    filter: 'drop-shadow(0 0 12px #00f5ff)',
                  }}
                >
                  <FaRocket />
                </motion.div>
              </motion.div>
            </motion.div>

            <motion.span
              className="gradient-text"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: isMobile ? '1.5rem' : '2rem',
                fontWeight: 700,
                letterSpacing: '-0.02em',
                textShadow: '0 0 30px rgba(0, 245, 255, 0.5)',
              }}
            >
              Bhagavan
            </motion.span>
          </motion.button>

          {/* Desktop Navigation */}
          {!isMobile && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
            }}>
              {visibleItems.map((item, index) => {
                const isActive = currentPath === item.path;

                return (
                  <motion.button
                    key={item.path}
                    onClick={() => handleNavClick(item.path)}
                    onMouseEnter={() => setActiveHover(item.path)}
                    onMouseLeave={() => setActiveHover(null)}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.08, duration: 0.5 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className={`nav-item-elite hover-lift ${isActive ? 'nav-item-active' : ''}`}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.6rem',
                      padding: '0.75rem 1.25rem',
                      color: isActive ? '#00f5ff' : '#fff',
                      fontSize: '0.9rem',
                      fontWeight: isActive ? 600 : 500,
                      fontFamily: "'Inter', sans-serif",
                      letterSpacing: '0.01em',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      background: isActive 
                        ? 'linear-gradient(135deg, rgba(0, 245, 255, 0.15), rgba(112, 0, 255, 0.15))'
                        : 'rgba(255, 255, 255, 0.03)',
                      backdropFilter: 'blur(20px)',
                      borderRadius: '12px',
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                      position: 'relative',
                      boxShadow: isActive 
                        ? '0 0 30px rgba(0, 245, 255, 0.3), 0 8px 32px rgba(0, 0, 0, 0.4)'
                        : '0 4px 16px rgba(0, 0, 0, 0.2)',
                    }}
                  >
                    <motion.span
                      animate={isActive ? { 
                        rotate: [0, -10, 10, 0],
                        scale: [1, 1.15, 1],
                      } : {}}
                      transition={{ duration: 2, repeat: Infinity }}
                      style={{ 
                        fontSize: '1.2rem',
                        filter: isActive ? 'drop-shadow(0 0 8px currentColor)' : 'none',
                      }}
                      className="nav-icon"
                    >
                      {item.icon}
                    </motion.span>
                    
                    <span>{item.label}</span>

                    {/* Hover indicator */}
                    {activeHover === item.path && !isActive && (
                      <motion.div
                        layoutId="navHover"
                        style={{
                          position: 'absolute',
                          inset: -1,
                          background: 'linear-gradient(135deg, rgba(0, 245, 255, 0.1), rgba(112, 0, 255, 0.1))',
                          borderRadius: '12px',
                          zIndex: -1,
                        }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </motion.button>
                );
              })}

              {/* More Dropdown */}
              <div style={{ position: 'relative' }}>
                <motion.button
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setMoreDropdownOpen(!moreDropdownOpen)}
                  className={`nav-item-elite hover-lift ${moreDropdownOpen ? 'nav-item-active' : ''}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.6rem',
                    padding: '0.75rem 1.25rem',
                    color: moreDropdownOpen ? '#00f5ff' : '#fff',
                    fontSize: '0.9rem',
                    fontWeight: moreDropdownOpen ? 600 : 500,
                    fontFamily: "'Inter', sans-serif",
                    borderRadius: '12px',
                    background: moreDropdownOpen
                      ? 'linear-gradient(135deg, rgba(0, 245, 255, 0.15), rgba(112, 0, 255, 0.15))'
                      : 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(20px)',
                    cursor: 'pointer',
                    position: 'relative',
                    boxShadow: moreDropdownOpen
                      ? '0 0 30px rgba(0, 245, 255, 0.3), 0 8px 32px rgba(0, 0, 0, 0.4)'
                      : '0 4px 16px rgba(0, 0, 0, 0.2)',
                  }}
                >
                  <motion.span
                    animate={{ rotate: moreDropdownOpen ? 180 : 0 }}
                    transition={{ duration: 0.4 }}
                    style={{ fontSize: '1.2rem' }}
                  >
                    <FaGem />
                  </motion.span>
                  
                  <span>More</span>
                  
                  <motion.div
                    animate={{ rotate: moreDropdownOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <FaChevronDown style={{ fontSize: '0.8rem' }} />
                  </motion.div>
                </motion.button>

                <AnimatePresence>
                  {moreDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -20, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -20, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      className="elite-dropdown"
                      style={{
                        position: 'absolute',
                        top: 'calc(100% + 1rem)',
                        right: 0,
                        minWidth: '300px',
                        borderRadius: '16px',
                        padding: '1rem',
                        zIndex: 1001,
                      }}
                    >
                      <div style={{
                        marginBottom: '0.75rem',
                        paddingBottom: '0.75rem',
                        borderBottom: '1px solid rgba(0, 245, 255, 0.2)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.6rem',
                      }}>
                        <FaAtom style={{ 
                          color: '#00f5ff', 
                          fontSize: '1.2rem',
                          filter: 'drop-shadow(0 0 8px #00f5ff)',
                        }} />
                        <span style={{
                          fontFamily: "'Space Grotesk', sans-serif",
                          fontSize: '1rem',
                          fontWeight: 600,
                          color: '#fff',
                        }}>
                          Explore More
                        </span>
                      </div>

                      {moreItems.map((item, index) => {
                        const isActive = currentPath === item.path;

                        return (
                          <motion.button
                            key={item.path}
                            onClick={() => handleNavClick(item.path)}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.04 }}
                            whileHover={{ x: 8, scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className={`nav-item-elite ${isActive ? 'nav-item-active' : ''}`}
                            style={{
                              width: '100%',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.8rem',
                              padding: '0.75rem 1rem',
                              color: isActive ? '#00f5ff' : '#fff',
                              fontSize: '0.9rem',
                              fontWeight: isActive ? 600 : 500,
                              fontFamily: "'Inter', sans-serif",
                              borderRadius: '10px',
                              background: isActive 
                                ? 'linear-gradient(135deg, rgba(0, 245, 255, 0.15), rgba(112, 0, 255, 0.15))'
                                : 'transparent',
                              border: 'none',
                              cursor: 'pointer',
                              textAlign: 'left',
                              marginBottom: '0.4rem',
                            }}
                          >
                            <motion.span 
                              style={{ 
                                fontSize: '1.2rem',
                                filter: isActive ? 'drop-shadow(0 0 8px currentColor)' : 'none',
                              }}
                            >
                              {item.icon}
                            </motion.span>
                            <span>{item.label}</span>
                            
                            {isActive && (
                              <FaStar style={{
                                marginLeft: 'auto',
                                color: '#ffd700',
                                fontSize: '0.9rem',
                                filter: 'drop-shadow(0 0 8px #ffd700)',
                              }} />
                            )}
                          </motion.button>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          )}

          {/* Mobile Menu Button */}
          {isMobile && (
            <motion.button
              onClick={() => setMenuOpen(!menuOpen)}
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              style={{
                background: menuOpen
                  ? 'linear-gradient(135deg, rgba(0, 245, 255, 0.3), rgba(112, 0, 255, 0.3))'
                  : 'rgba(255, 255, 255, 0.05)',
                border: `1px solid ${menuOpen ? 'rgba(0, 245, 255, 0.5)' : 'rgba(255, 255, 255, 0.1)'}`,
                color: menuOpen ? '#00f5ff' : '#fff',
                fontSize: '1.5rem',
                padding: '0.75rem',
                borderRadius: '12px',
                cursor: 'pointer',
                boxShadow: menuOpen
                  ? '0 0 30px rgba(0, 245, 255, 0.4)'
                  : '0 4px 16px rgba(0, 0, 0, 0.2)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <AnimatePresence mode="wait">
                {menuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, scale: 0 }}
                    animate={{ rotate: 0, scale: 1 }}
                    exit={{ rotate: 90, scale: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <FaTimes />
                  </motion.div>
                ) : (
                  <motion.div
                    key="open"
                    initial={{ rotate: 90, scale: 0 }}
                    animate={{ rotate: 0, scale: 1 }}
                    exit={{ rotate: -90, scale: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <FaBars />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          )}
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && isMobile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="mobile-menu-elite"
            style={{
              position: 'fixed',
              inset: 'auto 0 0 0',
              top: '80px',
              zIndex: 999,
              overflowY: 'auto',
              padding: '2rem 1.5rem',
              maxHeight: 'calc(100vh - 80px)',
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
                maxWidth: '600px',
                margin: '0 auto',
                paddingBottom: '6rem',
              }}
            >
              {navItems.map((item, index) => {
                const isActive = currentPath === item.path;

                return (
                  <motion.button
                    key={item.path}
                    onClick={() => handleNavClick(item.path)}
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.04 }}
                    whileTap={{ scale: 0.98 }}
                    className={`nav-item-elite ${isActive ? 'nav-item-active' : ''}`}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      padding: '1.25rem 1.5rem',
                      background: isActive
                        ? 'linear-gradient(135deg, rgba(0, 245, 255, 0.15), rgba(112, 0, 255, 0.15))'
                        : 'rgba(255, 255, 255, 0.05)',
                      borderRadius: '16px',
                      color: isActive ? '#00f5ff' : '#fff',
                      fontSize: '1.1rem',
                      fontWeight: isActive ? 600 : 500,
                      fontFamily: "'Inter', sans-serif",
                      border: `1px solid ${isActive ? 'rgba(0, 245, 255, 0.4)' : 'rgba(255, 255, 255, 0.1)'}`,
                      backdropFilter: 'blur(20px)',
                      cursor: 'pointer',
                      width: '100%',
                      textAlign: 'left',
                      boxShadow: isActive
                        ? '0 0 30px rgba(0, 245, 255, 0.3), 0 8px 32px rgba(0, 0, 0, 0.4)'
                        : '0 4px 16px rgba(0, 0, 0, 0.2)',
                    }}
                  >
                    <motion.span 
                      style={{ 
                        fontSize: '1.5rem',
                        filter: isActive ? 'drop-shadow(0 0 10px currentColor)' : 'none',
                      }}
                    >
                      {item.icon}
                    </motion.span>
                    <span>{item.label}</span>
                    
                    {isActive && (
                      <motion.div
                        animate={{
                          rotate: 360,
                          scale: [1, 1.2, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                        }}
                        style={{ marginLeft: 'auto' }}
                      >
                        <FaStar style={{
                          color: '#ffd700',
                          fontSize: '1rem',
                          filter: 'drop-shadow(0 0 8px #ffd700)',
                        }} />
                      </motion.div>
                    )}
                  </motion.button>
                );
              })}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;