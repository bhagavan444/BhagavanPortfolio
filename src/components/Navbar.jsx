"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, useScroll, useVelocity } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import {
  FaBars, FaTimes, FaHome, FaGraduationCap, FaBriefcase,
  FaCode, FaLaptopCode, FaTrophy, FaFileAlt, FaCertificate,
  FaHeart, FaAward, FaEnvelope, FaChevronDown,
  FaRocket, FaBrain, FaStar, FaGem, FaAtom, FaCube,
  FaChartLine, FaShieldAlt, FaBolt, FaMicrochip
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
  const [scrollProgress, setScrollProgress] = useState(0);
  const [performanceMode, setPerformanceMode] = useState(false);
  const navRef = useRef(null);
  const canvasRef = useRef(null);

  // Elite motion values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { damping: 50, stiffness: 400 });
  const smoothMouseY = useSpring(mouseY, { damping: 50, stiffness: 400 });
  
  const navOpacity = useTransform(scrollY, [0, 100], [0.95, 1]);
  const navBlur = useTransform(scrollY, [0, 100], [30, 50]);
  const logoScale = useTransform(scrollY, [0, 100], [1, 0.9]);

  const currentPath = location.pathname === "/" ? "/home" : location.pathname;

  // Advanced particle system with neural network visualization
  useEffect(() => {
    if (isMobile || !canvasRef.current || performanceMode) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { 
      alpha: true,
      desynchronized: true,
      willReadFrequently: false
    });
    let animationId;
    let particles = [];
    let neurons = [];
    let time = 0;
    
    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      canvas.style.width = `${canvas.offsetWidth}px`;
      canvas.style.height = `${canvas.offsetHeight}px`;
      ctx.scale(dpr, dpr);
    };
    resize();

    // Neural network nodes
    class Neuron {
      constructor() {
        this.x = Math.random() * canvas.width / window.devicePixelRatio;
        this.y = Math.random() * canvas.height / window.devicePixelRatio;
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
        this.size = Math.random() * 3 + 2;
        this.pulse = Math.random() * Math.PI * 2;
        this.pulseSpeed = Math.random() * 0.02 + 0.01;
        const colors = ['#00f5ff', '#7000ff', '#ff0080', '#00ff88', '#ffd700'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.pulse += this.pulseSpeed;

        const width = canvas.width / window.devicePixelRatio;
        const height = canvas.height / window.devicePixelRatio;

        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.y = Math.random() * height;

        // Attraction to mouse
        const dx = mousePosition.x - this.x;
        const dy = mousePosition.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 200 && dist > 0) {
          const force = (200 - dist) / 200;
          this.vx += dx * force * 0.0008;
          this.vy += dy * force * 0.0008;
        }

        // Velocity damping
        this.vx *= 0.99;
        this.vy *= 0.99;
      }

      draw() {
        const pulseValue = Math.sin(this.pulse) * 0.5 + 0.5;
        const size = this.size * (0.7 + pulseValue * 0.3);

        // Outer glow
        const gradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, size * 8
        );
        gradient.addColorStop(0, this.color + 'AA');
        gradient.addColorStop(0.3, this.color + '44');
        gradient.addColorStop(1, 'transparent');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, size * 8, 0, Math.PI * 2);
        ctx.fill();

        // Core
        ctx.fillStyle = this.color;
        ctx.globalAlpha = 0.8 + pulseValue * 0.2;
        ctx.beginPath();
        ctx.arc(this.x, this.y, size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    }

    // Data flow particles
    class DataParticle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width / window.devicePixelRatio;
        this.y = -20;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = Math.random() * 0.4 + 0.3;
        this.size = Math.random() * 1.5 + 0.5;
        this.life = 1;
        this.decay = Math.random() * 0.002 + 0.001;
        const colors = ['#00f5ff', '#7000ff', '#ff0080', '#00ff88'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        this.x += this.vx + Math.sin(time * 0.002 + this.x * 0.01) * 0.15;
        this.y += this.vy;
        this.life -= this.decay;
        
        const height = canvas.height / window.devicePixelRatio;
        if (this.y > height + 20 || this.life <= 0) {
          this.reset();
        }
      }

      draw() {
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.life * 0.6;
        ctx.fillRect(this.x, this.y, this.size, this.size * 3);
        ctx.globalAlpha = 1;
      }
    }

    // Initialize
    neurons = Array.from({ length: 20 }, () => new Neuron());
    particles = Array.from({ length: 40 }, () => new DataParticle());

    const drawNeuralConnections = () => {
      ctx.lineWidth = 1;
      
      for (let i = 0; i < neurons.length; i++) {
        for (let j = i + 1; j < neurons.length; j++) {
          const dx = neurons[i].x - neurons[j].x;
          const dy = neurons[i].y - neurons[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < 150) {
            const opacity = (1 - dist / 150) * 0.4;
            ctx.globalAlpha = opacity;
            
            // Gradient line
            const gradient = ctx.createLinearGradient(
              neurons[i].x, neurons[i].y,
              neurons[j].x, neurons[j].y
            );
            gradient.addColorStop(0, neurons[i].color);
            gradient.addColorStop(1, neurons[j].color);
            
            ctx.strokeStyle = gradient;
            ctx.beginPath();
            ctx.moveTo(neurons[i].x, neurons[i].y);
            ctx.lineTo(neurons[j].x, neurons[j].y);
            ctx.stroke();

            // Signal pulse
            if (Math.random() > 0.98) {
              const progress = (time % 100) / 100;
              const px = neurons[i].x + (neurons[j].x - neurons[i].x) * progress;
              const py = neurons[i].y + (neurons[j].y - neurons[i].y) * progress;
              
              ctx.globalAlpha = 0.8;
              ctx.fillStyle = '#00f5ff';
              ctx.beginPath();
              ctx.arc(px, py, 2, 0, Math.PI * 2);
              ctx.fill();
            }
          }
        }
      }
      ctx.globalAlpha = 1;
    };

    const animate = () => {
      time++;
      ctx.clearRect(0, 0, canvas.width / window.devicePixelRatio, canvas.height / window.devicePixelRatio);
      
      // Draw data particles
      particles.forEach(p => {
        p.update();
        p.draw();
      });

      // Draw neural network
      drawNeuralConnections();
      neurons.forEach(n => {
        n.update();
        n.draw();
      });
      
      animationId = requestAnimationFrame(animate);
    };

    animate();
    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, [isMobile, mousePosition, performanceMode]);

  // Scroll progress indicator
  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollPx = window.scrollY;
      const winHeightPx = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (scrollPx / winHeightPx) * 100;
      setScrollProgress(scrolled);
    };

    window.addEventListener('scroll', updateScrollProgress, { passive: true });
    return () => window.removeEventListener('scroll', updateScrollProgress);
  }, []);

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

  // Mouse tracking with performance optimization
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

  // Navigation items with enhanced metadata
  const navItems = [
    { 
      label: "Home", 
      path: "/home", 
      icon: <FaHome />, 
      gradient: "from-cyan-400 to-blue-600",
      description: "Portfolio Hub"
    },
    { 
      label: "Education", 
      path: "/education", 
      icon: <FaGraduationCap />, 
      gradient: "from-purple-400 to-pink-600",
      description: "Academic Excellence"
    },
    { 
      label: "Skills", 
      path: "/myskills", 
      icon: <FaCode />, 
      gradient: "from-green-400 to-cyan-600",
      description: "Technical Arsenal"
    },
    { 
      label: "Projects", 
      path: "/projects", 
      icon: <FaLaptopCode />, 
      gradient: "from-orange-400 to-red-600",
      description: "Production Work"
    },
    { 
      label: "Contact", 
      path: "/contact", 
      icon: <FaEnvelope />, 
      gradient: "from-cyan-400 to-teal-600",
      description: "Get In Touch"
    },
  ];

  const moreItems = [
    { 
      label: "Internships", 
      path: "/internships", 
      icon: <FaBriefcase />, 
      gradient: "from-blue-400 to-indigo-600",
      description: "Industry Experience"
    },
    { 
      label: "Hackathons", 
      path: "/hackathons", 
      icon: <FaTrophy />, 
      gradient: "from-yellow-400 to-orange-600",
      description: "Competition Wins"
    },
    { 
      label: "Certifications", 
      path: "/certifications", 
      icon: <FaCertificate />, 
      gradient: "from-pink-400 to-purple-600",
      description: "20+ Credentials"
    },
    { 
      label: "Workshops", 
      path: "/workshops", 
      icon: <FaBrain />, 
      gradient: "from-teal-400 to-green-600",
      description: "Learning Journey"
    },
    { 
      label: "Achievements", 
      path: "/achivements", 
      icon: <FaAward />, 
      gradient: "from-red-400 to-pink-600",
      description: "Recognition"
    },
    { 
      label: "Beyond Coding", 
      path: "/beyondcoding", 
      icon: <FaHeart />, 
      gradient: "from-rose-400 to-red-600",
      description: "Holistic Growth"
    },
    { 
      label: "Resume", 
      path: "/resume", 
      icon: <FaFileAlt />, 
      gradient: "from-indigo-400 to-purple-600",
      description: "Full Profile"
    },
  ];

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
            filter: drop-shadow(0 0 10px currentColor) drop-shadow(0 0 20px currentColor);
          }
          50% { 
            filter: drop-shadow(0 0 20px currentColor) drop-shadow(0 0 40px currentColor);
          }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-10px) rotate(2deg); }
          66% { transform: translateY(-5px) rotate(-2deg); }
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

        @keyframes data-flow {
          0% { transform: translateY(-100%) scaleY(0); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(100vh) scaleY(1); opacity: 0; }
        }

        @keyframes neural-pulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.1); }
        }

        @keyframes text-glow {
          0%, 100% { text-shadow: 0 0 10px currentColor, 0 0 20px currentColor; }
          50% { text-shadow: 0 0 20px currentColor, 0 0 40px currentColor, 0 0 60px currentColor; }
        }

        .nav-glass {
          background: linear-gradient(
            135deg,
            rgba(0, 0, 0, 0.92) 0%,
            rgba(10, 10, 25, 0.95) 50%,
            rgba(0, 0, 0, 0.92) 100%
          );
          backdrop-filter: blur(50px) saturate(200%);
          border-bottom: 1px solid rgba(0, 245, 255, 0.2);
          box-shadow: 
            0 8px 32px rgba(0, 0, 0, 0.6),
            0 0 0 1px rgba(255, 255, 255, 0.05),
            inset 0 1px 0 rgba(255, 255, 255, 0.1),
            0 20px 60px rgba(0, 245, 255, 0.1);
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
            rgba(255, 255, 255, 0.15) 0%,
            transparent 50%,
            rgba(255, 255, 255, 0.15) 100%
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
            #ffd700,
            #00f5ff
          );
          background-size: 300% 300%;
          animation: gradient-shift 4s ease infinite;
          border-radius: inherit;
          opacity: 0;
          z-index: -1;
          filter: blur(10px);
          transition: opacity 0.4s;
        }

        .nav-item-elite:hover::after {
          opacity: 0.6;
        }

        .nav-item-active {
          background: linear-gradient(
            135deg,
            rgba(0, 245, 255, 0.2) 0%,
            rgba(112, 0, 255, 0.2) 100%
          ) !important;
          border: 1px solid rgba(0, 245, 255, 0.6) !important;
          box-shadow: 
            0 0 40px rgba(0, 245, 255, 0.4),
            0 10px 40px rgba(0, 0, 0, 0.5),
            inset 0 0 30px rgba(0, 245, 255, 0.15) !important;
        }

        .nav-item-active::after {
          opacity: 0.8 !important;
        }

        .nav-item-active .nav-icon {
          animation: pulse-glow 2s ease-in-out infinite;
        }

        .morphing-bg {
          animation: morph 12s ease-in-out infinite;
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
            rgba(5, 5, 20, 0.98) 0%,
            rgba(15, 5, 30, 0.98) 100%
          );
          backdrop-filter: blur(50px) saturate(200%);
          border: 1px solid rgba(0, 245, 255, 0.4);
          box-shadow: 
            0 40px 160px rgba(0, 0, 0, 0.9),
            0 0 100px rgba(0, 245, 255, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
        }

        .mobile-menu-elite {
          background: linear-gradient(
            180deg,
            rgba(0, 0, 0, 0.98) 0%,
            rgba(10, 5, 25, 0.98) 100%
          );
          backdrop-filter: blur(50px) saturate(200%);
          border-top: 1px solid rgba(0, 245, 255, 0.4);
          box-shadow: 0 -10px 50px rgba(0, 245, 255, 0.2);
        }

        .scroll-progress {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(
            90deg,
            #00f5ff 0%,
            #7000ff 25%,
            #ff0080 50%,
            #00ff88 75%,
            #ffd700 100%
          );
          transform-origin: left;
          z-index: 10000;
          box-shadow: 0 0 20px rgba(0, 245, 255, 0.8);
        }

        @media (max-width: 1024px) {
          .nav-item-elite:hover {
            transform: scale(1.02) !important;
          }
        }

        ::-webkit-scrollbar {
          width: 10px;
          height: 10px;
        }

        ::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.6);
        }

        ::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #00f5ff, #7000ff, #ff0080);
          border-radius: 5px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, #7000ff, #ff0080, #ffd700);
        }

        .hover-lift {
          transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .hover-lift:hover {
          transform: translateY(-5px);
        }

        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>

      {/* Scroll Progress Indicator */}
      <motion.div
        className="scroll-progress"
        style={{
          scaleX: scrollProgress / 100,
        }}
      />

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
          padding: isScrolled ? '0.7rem 0' : '1rem 0',
          transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
        }}
      >
        {/* Neural Network Canvas */}
        {!isMobile && !performanceMode && (
          <canvas
            ref={canvasRef}
            style={{
              position: 'absolute',
              inset: 0,
              pointerEvents: 'none',
              opacity: 0.7,
              zIndex: 0,
            }}
          />
        )}

        {/* Dynamic Gradient Overlay */}
        {!isMobile && (
          <motion.div
            style={{
              position: 'absolute',
              inset: 0,
              background: `radial-gradient(circle 900px at ${smoothMouseX}px ${smoothMouseY}px, 
                rgba(0, 245, 255, 0.1) 0%, 
                rgba(112, 0, 255, 0.06) 30%,
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
          {/* Elite Logo Section */}
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
                width: isMobile ? '50px' : '60px',
                height: isMobile ? '50px' : '60px',
                scale: logoScale,
              }}
            >
              {/* Multi-layer rotating border */}
              <motion.div
                className="morphing-bg"
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "linear",
                }}
                style={{
                  position: 'absolute',
                  inset: -4,
                  background: 'linear-gradient(45deg, #00f5ff, #7000ff, #ff0080, #00ff88, #ffd700, #00f5ff)',
                  backgroundSize: '300% 300%',
                  animation: 'gradient-shift 3s ease infinite',
                  borderRadius: '50%',
                  filter: 'blur(6px)',
                  opacity: 0.9,
                }}
              />

              {/* Secondary counter-rotating border */}
              <motion.div
                animate={{
                  rotate: -360,
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear",
                }}
                style={{
                  position: 'absolute',
                  inset: -2,
                  background: 'linear-gradient(135deg, rgba(0, 245, 255, 0.5), rgba(255, 0, 128, 0.5))',
                  borderRadius: '50%',
                  filter: 'blur(3px)',
                }}
              />

              {/* Logo core */}
              <motion.div
                whileHover={{ rotate: 180, scale: 1.1 }}
                transition={{ duration: 0.6 }}
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(135deg, rgba(0, 245, 255, 0.3), rgba(112, 0, 255, 0.3))',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '2px solid rgba(0, 245, 255, 0.6)',
                  boxShadow: '0 0 40px rgba(0, 245, 255, 0.6), inset 0 0 30px rgba(0, 245, 255, 0.2)',
                }}
              >
                <motion.div
                  animate={{
                    y: [0, -5, 0],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  style={{
                    fontSize: isMobile ? '1.6rem' : '2rem',
                    background: 'linear-gradient(135deg, #00f5ff, #7000ff)',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    color: 'transparent',
                    filter: 'drop-shadow(0 0 15px #00f5ff)',
                  }}
                >
                  <FaMicrochip />
                </motion.div>

                {/* Orbital particles */}
                {[0, 120, 240].map((angle, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      rotate: 360,
                    }}
                    transition={{
                      duration: 3 + i,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    style={{
                      position: 'absolute',
                      width: '100%',
                      height: '100%',
                    }}
                  >
                    <div style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      width: '6px',
                      height: '6px',
                      background: ['#00f5ff', '#ff0080', '#00ff88'][i],
                      borderRadius: '50%',
                      transform: `translate(-50%, -50%) translateX(${isMobile ? 28 : 35}px)`,
                      boxShadow: `0 0 15px ${['#00f5ff', '#ff0080', '#00ff88'][i]}`,
                    }} />
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                gap: '0.2rem',
              }}
            >
              <motion.span
                className="gradient-text"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: isMobile ? '1.4rem' : '2rem',
                  fontWeight: 800,
                  letterSpacing: '-0.02em',
                  textShadow: '0 0 40px rgba(0, 245, 255, 0.6)',
                }}
              >
                BHAGAVAN
              </motion.span>
              <span style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: isMobile ? '0.65rem' : '0.75rem',
                color: '#00f5ff',
                letterSpacing: '0.1em',
                fontWeight: 600,
                textTransform: 'uppercase',
                opacity: 0.9,
              }}>
                &lt; Elite Developer /&gt;
              </span>
            </motion.div>
          </motion.button>

          {/* Desktop Navigation */}
          {!isMobile && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.8rem',
            }}>
              {navItems.map((item, index) => {
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
                    whileHover={{ scale: 1.05, y: -3 }}
                    whileTap={{ scale: 0.98 }}
                    className={`nav-item-elite hover-lift ${isActive ? 'nav-item-active' : ''}`}
                    title={item.description}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.7rem',
                      padding: '0.8rem 1.4rem',
                      color: isActive ? '#00f5ff' : '#fff',
                      fontSize: '0.95rem',
                      fontWeight: isActive ? 700 : 500,
                      fontFamily: "'Inter', sans-serif",
                      letterSpacing: '0.02em',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      background: isActive 
                        ? 'linear-gradient(135deg, rgba(0, 245, 255, 0.2), rgba(112, 0, 255, 0.2))'
                        : 'rgba(255, 255, 255, 0.04)',
                      backdropFilter: 'blur(25px)',
                      borderRadius: '14px',
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                      position: 'relative',
                      boxShadow: isActive 
                        ? '0 0 40px rgba(0, 245, 255, 0.4), 0 10px 40px rgba(0, 0, 0, 0.5)'
                        : '0 5px 20px rgba(0, 0, 0, 0.3)',
                    }}
                  >
                    <motion.span
                      animate={isActive ? { 
                        rotate: [0, -12, 12, 0],
                        scale: [1, 1.2, 1],
                      } : {}}
                      transition={{ duration: 2, repeat: Infinity }}
                      style={{ 
                        fontSize: '1.3rem',
                        filter: isActive ? 'drop-shadow(0 0 10px currentColor)' : 'none',
                      }}
                      className="nav-icon"
                    >
                      {item.icon}
                    </motion.span>
                    
                    <span>{item.label}</span>

                    {/* Active indicator dot */}
                    {isActive && (
                      <motion.div
                        animate={{
                          scale: [1, 1.3, 1],
                          opacity: [0.7, 1, 0.7],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                        }}
                        style={{
                          width: '6px',
                          height: '6px',
                          background: '#00f5ff',
                          borderRadius: '50%',
                          boxShadow: '0 0 15px #00f5ff',
                        }}
                      />
                    )}

                    {/* Hover indicator */}
                    {activeHover === item.path && !isActive && (
                      <motion.div
                        layoutId="navHover"
                        style={{
                          position: 'absolute',
                          inset: -2,
                          background: 'linear-gradient(135deg, rgba(0, 245, 255, 0.15), rgba(112, 0, 255, 0.15))',
                          borderRadius: '14px',
                          zIndex: -1,
                        }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </motion.button>
                );
              })}

              {/* Enhanced More Dropdown */}
              <div style={{ position: 'relative' }}>
                <motion.button
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setMoreDropdownOpen(!moreDropdownOpen)}
                  className={`nav-item-elite hover-lift ${moreDropdownOpen ? 'nav-item-active' : ''}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.7rem',
                    padding: '0.8rem 1.4rem',
                    color: moreDropdownOpen ? '#00f5ff' : '#fff',
                    fontSize: '0.95rem',
                    fontWeight: moreDropdownOpen ? 700 : 500,
                    fontFamily: "'Inter', sans-serif",
                    borderRadius: '14px',
                    background: moreDropdownOpen
                      ? 'linear-gradient(135deg, rgba(0, 245, 255, 0.2), rgba(112, 0, 255, 0.2))'
                      : 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(25px)',
                    cursor: 'pointer',
                    position: 'relative',
                    boxShadow: moreDropdownOpen
                      ? '0 0 40px rgba(0, 245, 255, 0.4), 0 10px 40px rgba(0, 0, 0, 0.5)'
                      : '0 5px 20px rgba(0, 0, 0, 0.3)',
                  }}
                >
                  <motion.span
                    animate={{ 
                      rotate: moreDropdownOpen ? [0, 360] : 0,
                      scale: moreDropdownOpen ? [1, 1.2, 1] : 1,
                    }}
                    transition={{ duration: 0.6 }}
                    style={{ fontSize: '1.3rem' }}
                  >
                    <FaGem />
                  </motion.span>
                  
                  <span>More</span>
                  
                  <motion.div
                    animate={{ rotate: moreDropdownOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <FaChevronDown style={{ fontSize: '0.85rem' }} />
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
                        minWidth: '320px',
                        borderRadius: '18px',
                        padding: '1.2rem',
                        zIndex: 1001,
                      }}
                    >
                      <div style={{
                        marginBottom: '1rem',
                        paddingBottom: '1rem',
                        borderBottom: '1px solid rgba(0, 245, 255, 0.3)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.7rem',
                      }}>
                        <motion.div
                          animate={{
                            rotate: 360,
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                        >
                          <FaAtom style={{ 
                            color: '#00f5ff', 
                            fontSize: '1.4rem',
                            filter: 'drop-shadow(0 0 10px #00f5ff)',
                          }} />
                        </motion.div>
                        <div>
                          <div style={{
                            fontFamily: "'Space Grotesk', sans-serif",
                            fontSize: '1.1rem',
                            fontWeight: 700,
                            color: '#fff',
                            marginBottom: '0.2rem',
                          }}>
                            Explore More
                          </div>
                          <div style={{
                            fontSize: '0.75rem',
                            color: '#888',
                            fontFamily: "'JetBrains Mono', monospace",
                          }}>
                            Complete Portfolio
                          </div>
                        </div>
                      </div>

                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr',
                        gap: '0.5rem',
                      }}>
                        {moreItems.map((item, index) => {
                          const isActive = currentPath === item.path;

                          return (
                            <motion.button
                              key={item.path}
                              onClick={() => handleNavClick(item.path)}
                              initial={{ opacity: 0, x: -30 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.05 }}
                              whileHover={{ x: 10, scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              className={`nav-item-elite ${isActive ? 'nav-item-active' : ''}`}
                              title={item.description}
                              style={{
                                width: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1rem',
                                padding: '0.9rem 1.2rem',
                                color: isActive ? '#00f5ff' : '#fff',
                                fontSize: '0.95rem',
                                fontWeight: isActive ? 600 : 500,
                                fontFamily: "'Inter', sans-serif",
                                borderRadius: '12px',
                                background: isActive 
                                  ? 'linear-gradient(135deg, rgba(0, 245, 255, 0.2), rgba(112, 0, 255, 0.2))'
                                  : 'transparent',
                                border: 'none',
                                cursor: 'pointer',
                                textAlign: 'left',
                              }}
                            >
                              <motion.span 
                                style={{ 
                                  fontSize: '1.3rem',
                                  filter: isActive ? 'drop-shadow(0 0 10px currentColor)' : 'none',
                                }}
                              >
                                {item.icon}
                              </motion.span>
                              
                              <div style={{ flex: 1 }}>
                                <div>{item.label}</div>
                                <div style={{
                                  fontSize: '0.7rem',
                                  color: isActive ? '#00d4ff' : '#666',
                                  marginTop: '0.2rem',
                                }}>
                                  {item.description}
                                </div>
                              </div>
                              
                              {isActive && (
                                <motion.div
                                  animate={{
                                    rotate: 360,
                                    scale: [1, 1.3, 1],
                                  }}
                                  transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                  }}
                                >
                                  <FaStar style={{
                                    color: '#ffd700',
                                    fontSize: '1rem',
                                    filter: 'drop-shadow(0 0 10px #ffd700)',
                                  }} />
                                </motion.div>
                              )}
                            </motion.button>
                          );
                        })}
                      </div>
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
                  : 'rgba(255, 255, 255, 0.06)',
                border: `2px solid ${menuOpen ? 'rgba(0, 245, 255, 0.6)' : 'rgba(255, 255, 255, 0.15)'}`,
                color: menuOpen ? '#00f5ff' : '#fff',
                fontSize: '1.6rem',
                padding: '0.8rem',
                borderRadius: '14px',
                cursor: 'pointer',
                boxShadow: menuOpen
                  ? '0 0 40px rgba(0, 245, 255, 0.5)'
                  : '0 5px 20px rgba(0, 0, 0, 0.3)',
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
              top: '85px',
              zIndex: 999,
              overflowY: 'auto',
              padding: '2rem 1.5rem',
              maxHeight: 'calc(100vh - 85px)',
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.8rem',
                maxWidth: '600px',
                margin: '0 auto',
                paddingBottom: '6rem',
              }}
            >
              {[...navItems, ...moreItems].map((item, index) => {
                const isActive = currentPath === item.path;

                return (
                  <motion.button
                    key={item.path}
                    onClick={() => handleNavClick(item.path)}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.04 }}
                    whileTap={{ scale: 0.98 }}
                    className={`nav-item-elite ${isActive ? 'nav-item-active' : ''}`}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1.2rem',
                      padding: '1.3rem 1.6rem',
                      background: isActive
                        ? 'linear-gradient(135deg, rgba(0, 245, 255, 0.2), rgba(112, 0, 255, 0.2))'
                        : 'rgba(255, 255, 255, 0.06)',
                      borderRadius: '18px',
                      color: isActive ? '#00f5ff' : '#fff',
                      fontSize: '1.1rem',
                      fontWeight: isActive ? 700 : 500,
                      fontFamily: "'Inter', sans-serif",
                      border: `2px solid ${isActive ? 'rgba(0, 245, 255, 0.5)' : 'rgba(255, 255, 255, 0.1)'}`,
                      backdropFilter: 'blur(25px)',
                      cursor: 'pointer',
                      width: '100%',
                      textAlign: 'left',
                      boxShadow: isActive
                        ? '0 0 40px rgba(0, 245, 255, 0.4), 0 10px 40px rgba(0, 0, 0, 0.5)'
                        : '0 5px 20px rgba(0, 0, 0, 0.3)',
                    }}
                  >
                    <motion.span 
                      style={{ 
                        fontSize: '1.6rem',
                        filter: isActive ? 'drop-shadow(0 0 12px currentColor)' : 'none',
                      }}
                    >
                      {item.icon}
                    </motion.span>
                    
                    <div style={{ flex: 1 }}>
                      <div>{item.label}</div>
                      {item.description && (
                        <div style={{
                          fontSize: '0.75rem',
                          color: isActive ? '#00d4ff' : '#666',
                          marginTop: '0.3rem',
                          fontWeight: 400,
                        }}>
                          {item.description}
                        </div>
                      )}
                    </div>
                    
                    {isActive && (
                      <motion.div
                        animate={{
                          rotate: 360,
                          scale: [1, 1.3, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                        }}
                      >
                        <FaStar style={{
                          color: '#ffd700',
                          fontSize: '1.1rem',
                          filter: 'drop-shadow(0 0 10px #ffd700)',
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