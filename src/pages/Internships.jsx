"use client";

import React, { useState, useEffect, useRef } from "react";
import { ExternalLink, MapPin, Calendar, CheckCircle2, ArrowUpRight } from "lucide-react";

/* ═══════════════════════════════════════════════════════════════
   DESIGN TOKENS — REFINED SYSTEM
═══════════════════════════════════════════════════════════════ */
const C = {
  bg: "#ffffff",
  surface: "#f9fafb",
  surface2: "#f3f4f6",
  surface3: "#e5e7eb",
  border: "rgba(0,0,0,0.06)",
  border2: "rgba(0,0,0,0.10)",
  border3: "rgba(0,0,0,0.14)",
  text: "#0f172a",
  muted: "#64748b",
  muted2: "#475569",
  accent: "#4f7fff",
  accentDim: "rgba(79,127,255,0.08)",
  green: "#10b981",
  greenDim: "rgba(16,185,129,0.08)",
  amber: "#f59e0b",
  amberDim: "rgba(245,158,11,0.08)",
  purple: "#a78bfa",
  purpleDim: "rgba(167,139,250,0.08)",
};

/* Refined spacing scale (8px base) */
const spacing = {
  xs: "0.5rem",    // 8px
  sm: "1rem",      // 16px
  md: "1.5rem",    // 24px
  lg: "2rem",      // 32px
  xl: "3rem",      // 48px
  "2xl": "4rem",   // 64px
  "3xl": "6rem",   // 96px
  "4xl": "8rem",   // 128px
};

/* Unified motion system */
const motion = {
  easing: "cubic-bezier(0.4, 0, 0.2, 1)",
  duration: {
    fast: "200ms",
    normal: "300ms",
    slow: "500ms",
  },
  hover: {
    translate: "translateY(-2px)",
    scale: "scale(1.01)",
  },
};

/* Depth system (3 layers) */
const elevation = {
  0: "none", // base
  1: "0 4px 12px rgba(0,0,0,0.04)", // elevated cards
  2: "0 8px 24px rgba(0,0,0,0.06)", // emphasis
};

/* ═══════════════════════════════════════════════════════════════
   DATA — TIMELINE STRUCTURE
═══════════════════════════════════════════════════════════════ */
const experiences = [
  {
    id: 1,
    year: "2025",
    role: "MERN Stack Intern",
    company: "StudyOwl Education Pvt Ltd",
    period: "May – July 2025",
    duration: "3 months",
    location: "Hybrid",
    type: "Full-Stack Development",
    accent: C.accent,
    accentDim: C.accentDim,
    certPreview: "/images/study.jpg",
    summary:
      "Worked on full-stack web applications using the MERN stack, implementing authentication systems and REST APIs while collaborating in a team environment.",
    impact: [
      { metric: "3", label: "Web Modules", detail: "Frontend–backend integrations" },
      { metric: "2", label: "OAuth Providers", detail: "Google & GitHub login" },
      { metric: "100%", label: "API Connectivity", detail: "REST-based architecture" },
    ],
    contributions: [
      "Built reusable React components and connected them to Express-based REST APIs",
      "Implemented Google and GitHub OAuth authentication with JWT handling",
      "Designed MongoDB schemas for user and application data",
      "Integrated frontend forms with backend validation and database persistence",
      "Collaborated using Git and GitHub in an agile-style workflow"
    ],
    stack: {
      Frontend: ["React", "HTML", "CSS", "JavaScript"],
      Backend: ["Node.js", "Express.js"],
      Database: ["MongoDB Atlas"],
      Auth: ["OAuth", "JWT"],
      Tools: ["Git", "Postman"]
    },
  },
  {
    id: 2,
    year: "2025",
    role: "AI / ML Intern",
    company: "SmartBridge",
    period: "May – June 2025",
    duration: "2 months",
    location: "Remote",
    type: "Machine Learning & Computer Vision",
    accent: C.purple,
    accentDim: C.purpleDim,
    certPreview: "/images/intern.png",
    summary:
      "Developed and evaluated machine learning models for image classification and applied deployment using Flask APIs.",
    impact: [
      { metric: "4", label: "ML Models", detail: "Classification pipelines built" },
      { metric: "85%", label: "CNN Accuracy", detail: "Image classification task" },
      { metric: "1", label: "API Deployment", detail: "Flask inference endpoint" },
    ],
    contributions: [
      "Built CNN-based image classification model using TensorFlow and Keras",
      "Performed preprocessing and data augmentation on labeled datasets",
      "Evaluated model performance using accuracy and confusion matrices",
      "Deployed trained model through a Flask API for real-time inference",
      "Tested endpoints using Postman for validation"
    ],
    stack: {
      Core: ["TensorFlow", "Keras", "Scikit-learn"],
      CV: ["OpenCV"],
      Data: ["NumPy", "Pandas"],
      Deployment: ["Flask API"],
      Environment: ["Jupyter Notebook", "Python"]
    },
  },
  {
    id: 3,
    year: "2024",
    role: "Machine Learning & Data Science Intern",
    company: "Blackbucks",
    period: "May – June 2024",
    duration: "2 months",
    location: "Remote",
    type: "Data Science & ML",
    accent: C.green,
    accentDim: C.greenDim,
    certPreview: "/images/blackbucks.jpeg",
    summary:
      "Worked on data preprocessing, feature engineering, and supervised learning model development using Python-based ML libraries.",
    impact: [
      { metric: "6", label: "Models Built", detail: "Supervised algorithms tested" },
      { metric: "90%+", label: "Best Accuracy", detail: "Classification tasks" },
      { metric: "1", label: "NLP Pipeline", detail: "TF-IDF implementation" },
    ],
    contributions: [
      "Cleaned and preprocessed structured datasets using Pandas",
      "Built classification models including Logistic Regression and Random Forest",
      "Applied TF-IDF vectorization for text classification tasks",
      "Compared models using cross-validation and evaluation metrics",
      "Documented experiments and findings using Jupyter Notebook"
    ],
    stack: {
      ML: ["Scikit-learn"],
      Data: ["Pandas", "NumPy"],
      NLP: ["NLTK", "TF-IDF"],
      Visualization: ["Matplotlib"],
      Tools: ["Jupyter Notebook", "Git"]
    },
  },
];

/* ═══════════════════════════════════════════════════════════════
   UTILITY: MOBILE DETECTION
═══════════════════════════════════════════════════════════════ */
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile;
}

/* ═══════════════════════════════════════════════════════════════
   CUSTOM CURSOR (DISABLED ON MOBILE)
═══════════════════════════════════════════════════════════════ */
function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [currentAccent, setCurrentAccent] = useState(C.accent);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isMobile) return;

    const handleMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });

      const target = e.target;
      const isInteractive =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("[data-magnetic]") ||
        target.closest("[data-hover]");
      setIsHovering(!!isInteractive);

      const section = target.closest("[data-accent]");
      if (section) {
        setCurrentAccent(section.dataset.accent);
      }
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <>
      <div
        style={{
          position: "fixed",
          left: position.x,
          top: position.y,
          width: isHovering ? "24px" : "6px",
          height: isHovering ? "24px" : "6px",
          borderRadius: "50%",
          background: isHovering ? "transparent" : currentAccent,
          border: isHovering ? `2px solid ${currentAccent}` : "none",
          pointerEvents: "none",
          zIndex: 10000,
          transform: "translate(-50%, -50%)",
          transition: `all ${motion.duration.fast} ${motion.easing}`,
          mixBlendMode: "difference",
        }}
      />
      <div
        style={{
          position: "fixed",
          left: position.x,
          top: position.y,
          width: isHovering ? "48px" : "32px",
          height: isHovering ? "48px" : "32px",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${currentAccent}10 0%, transparent 70%)`,
          pointerEvents: "none",
          zIndex: 9999,
          transform: "translate(-50%, -50%)",
          transition: `all ${motion.duration.normal} ${motion.easing}`,
        }}
      />
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════
   ANIMATED COUNTER (OPTIMIZED)
═══════════════════════════════════════════════════════════════ */
function AnimatedCounter({ value, duration = 1500 }) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          
          const numericValue = parseInt(value.toString().replace(/[^0-9]/g, "")) || 0;
          const startTime = Date.now();

          const animate = () => {
            const now = Date.now();
            const progress = Math.min((now - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(numericValue * eased));

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setCount(numericValue);
            }
          };

          animate();
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value, duration, hasAnimated]);

  const formatCount = (num) => {
    if (value.toString().includes("K")) return `${(num / 1000).toFixed(0)}K+`;
    if (value.toString().includes(",")) return `${num.toLocaleString()}+`;
    if (value.toString().includes("%")) return `${num}%`;
    if (value.toString().includes("+")) return `${num}+`;
    if (value.toString().includes("–")) return value.toString();
    return num.toString();
  };

  return <span ref={ref}>{formatCount(count)}</span>;
}

/* ═══════════════════════════════════════════════════════════════
   SCROLL PROGRESS (SIMPLIFIED ON MOBILE)
═══════════════════════════════════════════════════════════════ */
function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  const isMobile = useIsMobile();
  const rafRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current) return;
      
      rafRef.current = requestAnimationFrame(() => {
        const total = document.documentElement.scrollHeight - window.innerHeight;
        setProgress((window.scrollY / total) * 100);
        rafRef.current = null;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "2px",
        background: C.surface2,
        zIndex: 9998,
      }}
    >
      <div
        style={{
          height: "100%",
          width: `${progress}%`,
          background: isMobile 
            ? C.accent 
            : `linear-gradient(90deg, ${C.accent}, ${C.purple}, ${C.green})`,
          transition: "width 0.1s linear",
        }}
      />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   STICKY TIMELINE RAIL (HIDDEN ON MOBILE)
═══════════════════════════════════════════════════════════════ */
function TimelineRail() {
  const [activeIndex, setActiveIndex] = useState(0);
  const isMobile = useIsMobile();
  const rafRef = useRef(null);

  useEffect(() => {
    if (isMobile) return;

    const handleScroll = () => {
      if (rafRef.current) return;
      
      rafRef.current = requestAnimationFrame(() => {
        const sections = document.querySelectorAll("[data-experience]");
        let current = 0;

        sections.forEach((section, index) => {
          const rect = section.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            current = index;
          }
        });

        setActiveIndex(current);
        rafRef.current = null;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <div
      style={{
        position: "fixed",
        left: spacing.xl,
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 100,
        display: "flex",
        flexDirection: "column",
        gap: spacing.lg,
      }}
    >
      {experiences.map((exp, i) => (
        <div
          key={exp.id}
          style={{
            display: "flex",
            alignItems: "center",
            gap: spacing.sm,
            cursor: "pointer",
            transition: `all ${motion.duration.normal} ${motion.easing}`,
          }}
          onClick={() => {
            document.getElementById(`exp-${exp.id}`)?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          <div
            style={{
              width: activeIndex === i ? "40px" : "20px",
              height: "2px",
              background: activeIndex === i ? exp.accent : C.border2,
              transition: `all ${motion.duration.normal} ${motion.easing}`,
            }}
          />
          <div
            style={{
              opacity: activeIndex === i ? 1 : 0,
              transform: activeIndex === i ? "translateX(0)" : "translateX(-8px)",
              transition: `all ${motion.duration.normal} ${motion.easing}`,
            }}
          >
            <div
              style={{
                fontSize: "0.7rem",
                fontFamily: "'DM Mono', monospace",
                color: exp.accent,
                fontWeight: 600,
                whiteSpace: "nowrap",
              }}
            >
              {exp.year}
            </div>
            <div
              style={{
                fontSize: "0.65rem",
                fontFamily: "'DM Mono', monospace",
                color: C.muted,
                whiteSpace: "nowrap",
              }}
            >
              {exp.company.split(" ")[0]}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAGNETIC BUTTON (DISABLED ON MOBILE)
═══════════════════════════════════════════════════════════════ */
function MagneticButton({ children, href, accent, style }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const ref = useRef(null);
  const isMobile = useIsMobile();

  const handleMouseMove = (e) => {
    if (isMobile || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setPosition({ x: x * 0.2, y: y * 0.2 }); // Reduced from 0.3
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <a
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      data-magnetic
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: spacing.xs,
        padding: `${spacing.sm} ${spacing.md}`,
        minHeight: "44px", // Accessibility tap target
        background: accent + "10",
        border: `1px solid ${accent}40`,
        borderRadius: "8px",
        fontSize: "0.875rem",
        fontWeight: 600,
        color: accent,
        textDecoration: "none",
        fontFamily: "'DM Mono', monospace",
        transition: `all ${motion.duration.normal} ${motion.easing}`,
        transform: isMobile ? "none" : `translate(${position.x}px, ${position.y}px)`,
        ...style,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = accent + "20";
        e.currentTarget.style.borderColor = accent + "60";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = accent + "10";
        e.currentTarget.style.borderColor = accent + "40";
      }}
    >
      {children}
    </a>
  );
}

/* ═══════════════════════════════════════════════════════════════
   EXPERIENCE SECTION (MOBILE OPTIMIZED)
═══════════════════════════════════════════════════════════════ */
function ExperienceSection({ data, index, isLast }) {
  const [inView, setInView] = useState(false);
  const [activeTab, setActiveTab] = useState("contributions");
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const ref = useRef(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (e) => {
    if (isMobile || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * 1.5, y: -x * 1.5 }); // Reduced from 2
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <section
      id={`exp-${data.id}`}
      ref={ref}
      data-experience
      data-accent={data.accent}
      style={{
        minHeight: isMobile ? "auto" : "100vh",
        display: "flex",
        alignItems: "center",
        position: "relative",
        padding: isMobile ? `${spacing["3xl"]} 0` : `${spacing["4xl"]} 0`,
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(40px)",
        transition: `opacity ${motion.duration.slow} ${motion.easing}, transform ${motion.duration.slow} ${motion.easing}`,
        borderBottom: isLast ? "none" : `1px solid ${C.border}`,
      }}
    >
      {/* Year watermark */}
      <div
        style={{
          position: "absolute",
          left: isMobile ? "-10%" : "-2%",
          top: isMobile ? "10%" : "20%",
          fontSize: isMobile ? "clamp(6rem, 25vw, 8rem)" : "clamp(10rem, 18vw, 20rem)",
          fontFamily: "'Instrument Serif', serif",
          fontWeight: 400,
          color: data.accentDim,
          lineHeight: 1,
          userSelect: "none",
          pointerEvents: "none",
          opacity: 0.3,
        }}
      >
        {data.year}
      </div>

      {/* Background glow (reduced on mobile) */}
      <div
        style={{
          position: "absolute",
          left: "15%",
          top: "30%",
          width: isMobile ? "240px" : "400px",
          height: isMobile ? "240px" : "400px",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${data.accent}${isMobile ? '08' : '10'} 0%, transparent 70%)`,
          filter: isMobile ? "blur(60px)" : "blur(80px)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: "1240px",
          margin: "0 auto",
          padding: `0 ${isMobile ? spacing.sm : spacing.lg}`,
          width: "100%",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1.2fr 1fr",
            gap: isMobile ? spacing.xl : spacing["3xl"],
            alignItems: "start",
          }}
        >
          {/* Left: Content */}
          <div
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "translateX(0)" : "translateX(-30px)",
              transition: `opacity ${motion.duration.slow} ${motion.easing} 0.1s, transform ${motion.duration.slow} ${motion.easing} 0.1s`,
            }}
          >
            {/* Header */}
            <div style={{ marginBottom: spacing.lg }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: spacing.sm,
                  marginBottom: spacing.sm,
                }}
              >
                <div style={{ width: "32px", height: "2px", background: data.accent }} />
                <span
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: "0.7rem",
                    fontWeight: 600,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: data.accent,
                  }}
                >
                  {data.period} · {data.duration}
                </span>
              </div>

              <div
                style={{
                  fontSize: "0.875rem",
                  color: C.muted,
                  fontFamily: "'DM Mono', monospace",
                  marginBottom: spacing.xs,
                }}
              >
                {data.type}
              </div>

              <h2
                style={{
                  fontFamily: "'Instrument Serif', serif",
                  fontSize: isMobile ? "clamp(2rem, 10vw, 2.5rem)" : "clamp(2.5rem, 5vw, 3.5rem)",
                  fontWeight: 400,
                  color: C.text,
                  lineHeight: 1.1,
                  letterSpacing: "-0.01em",
                  marginBottom: spacing.xs,
                }}
              >
                {data.role}
              </h2>

              <div
                style={{
                  fontSize: isMobile ? "1.1rem" : "1.25rem",
                  fontWeight: 600,
                  color: C.muted2,
                  marginBottom: spacing.sm,
                }}
              >
                {data.company}
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: spacing.xs,
                  fontSize: "0.875rem",
                  color: C.muted,
                }}
              >
                <MapPin size={14} />
                {data.location}
              </div>
            </div>

            {/* Animated underline */}
            <div
              style={{
                width: "96px",
                height: "3px",
                background: `linear-gradient(90deg, ${data.accent}, transparent)`,
                borderRadius: "2px",
                marginBottom: spacing.lg,
                animation: inView ? `lineGrow ${motion.duration.slow} ${motion.easing} 0.2s both` : "none",
              }}
            />

            {/* Summary */}
            <p
              style={{
                fontSize: isMobile ? "1rem" : "1.05rem",
                color: C.muted2,
                lineHeight: 1.7,
                marginBottom: spacing.xl,
                maxWidth: isMobile ? "100%" : "640px",
              }}
            >
              {data.summary}
            </p>

            {/* Tab navigation */}
            <div style={{ marginBottom: spacing.lg }}>
              <div
                style={{
                  display: "flex",
                  gap: spacing.lg,
                  borderBottom: `1px solid ${C.border}`,
                  position: "relative",
                }}
              >
                {["contributions", "stack"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    style={{
                      background: "none",
                      border: "none",
                      padding: `${spacing.sm} 0`,
                      fontSize: "0.875rem",
                      fontWeight: 600,
                      color: activeTab === tab ? C.text : C.muted,
                      cursor: "pointer",
                      transition: `color ${motion.duration.normal} ${motion.easing}`,
                      textTransform: "capitalize",
                      position: "relative",
                      minHeight: "44px", // Accessibility
                    }}
                  >
                    {tab}
                    {activeTab === tab && (
                      <div
                        style={{
                          position: "absolute",
                          bottom: -1,
                          left: 0,
                          right: 0,
                          height: "2px",
                          background: data.accent,
                          animation: `slideIn ${motion.duration.normal} ${motion.easing}`,
                        }}
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab content */}
            <div style={{ minHeight: isMobile ? "auto" : "300px" }}>
              {activeTab === "contributions" && (
                <div style={{ animation: `fadeSlide ${motion.duration.normal} ${motion.easing}` }}>
                  <ul
                    style={{
                      listStyle: "none",
                      display: "flex",
                      flexDirection: "column",
                      gap: spacing.sm,
                    }}
                  >
                    {data.contributions.map((item, i) => (
                      <li
                        key={i}
                        style={{
                          display: "flex",
                          gap: spacing.sm,
                          alignItems: "flex-start",
                        }}
                      >
                        <div
                          style={{
                            marginTop: "0.4rem",
                            width: "6px",
                            height: "6px",
                            borderRadius: "50%",
                            background: data.accent,
                            flexShrink: 0,
                          }}
                        />
                        <span
                          style={{
                            fontSize: "0.95rem",
                            color: C.muted2,
                            lineHeight: 1.6,
                          }}
                        >
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {activeTab === "stack" && (
                <div style={{ animation: `fadeSlide ${motion.duration.normal} ${motion.easing}` }}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: spacing.md,
                    }}
                  >
                    {Object.entries(data.stack).map(([category, items]) => (
                      <div key={category}>
                        <div
                          style={{
                            fontSize: "0.75rem",
                            fontWeight: 700,
                            color: data.accent,
                            marginBottom: spacing.sm,
                            fontFamily: "'DM Mono', monospace",
                            letterSpacing: "0.1em",
                            textTransform: "uppercase",
                          }}
                        >
                          {category}
                        </div>
                        <div
                          style={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: spacing.xs,
                          }}
                        >
                          {items.map((tech) => (
                            <span
                              key={tech}
                              data-hover
                              style={{
                                padding: `${spacing.xs} ${spacing.sm}`,
                                background: C.surface,
                                border: `1px solid ${C.border}`,
                                borderRadius: "6px",
                                fontSize: "0.85rem",
                                fontWeight: 500,
                                color: C.muted2,
                                transition: `all ${motion.duration.normal} ${motion.easing}`,
                                cursor: "default",
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.background = data.accentDim;
                                e.currentTarget.style.borderColor = data.accent + "40";
                                e.currentTarget.style.color = C.text;
                                e.currentTarget.style.transform = motion.hover.translate;
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.background = C.surface;
                                e.currentTarget.style.borderColor = C.border;
                                e.currentTarget.style.color = C.muted2;
                                e.currentTarget.style.transform = "translateY(0)";
                              }}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Certificate button */}
            <div style={{ marginTop: spacing.xl }}>
              <MagneticButton href={data.certPreview} accent={data.accent}>
                <CheckCircle2 size={16} />
                View Verified Certificate
              </MagneticButton>
            </div>
          </div>

          {/* Right: Metrics (moved below on mobile) */}
          <div
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "translateX(0)" : "translateX(30px)",
              transition: `opacity ${motion.duration.slow} ${motion.easing} 0.2s, transform ${motion.duration.slow} ${motion.easing} 0.2s`,
              position: isMobile ? "relative" : "sticky",
              top: isMobile ? "auto" : spacing["3xl"],
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <div
              style={{
                position: "relative",
                padding: isMobile ? spacing.lg : `${spacing.xl} ${spacing.lg}`,
                background: C.surface,
                border: `1px solid ${C.border}`,
                borderRadius: "20px",
                transform: isMobile ? "none" : `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                transition: `transform ${motion.duration.normal} ${motion.easing}`,
                boxShadow: elevation[1],
              }}
            >
              {/* Glow overlay (reduced) */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: "20px",
                  background: `radial-gradient(circle at 50% 50%, ${data.accent}06 0%, transparent 60%)`,
                  pointerEvents: "none",
                }}
              />

              <div
                style={{
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  color: C.muted,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  fontFamily: "'DM Mono', monospace",
                  marginBottom: spacing.lg,
                }}
              >
                Impact Metrics
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: spacing.lg,
                }}
              >
                {data.impact.map((item, i) => (
                  <div
                    key={i}
                    style={{
                      paddingBottom: i < data.impact.length - 1 ? spacing.lg : 0,
                      borderBottom: i < data.impact.length - 1 ? `1px solid ${C.border}` : "none",
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "'Instrument Serif', serif",
                        fontSize: isMobile ? "2.5rem" : "3rem",
                        fontWeight: 400,
                        color: data.accent,
                        lineHeight: 1,
                        marginBottom: spacing.xs,
                        letterSpacing: "-0.02em",
                      }}
                    >
                      <AnimatedCounter value={item.metric} />
                    </div>
                    <div
                      style={{
                        fontSize: "1rem",
                        fontWeight: 600,
                        color: C.text,
                        marginBottom: "0.25rem",
                      }}
                    >
                      {item.label}
                    </div>
                    <div
                      style={{
                        fontSize: "0.85rem",
                        color: C.muted,
                        lineHeight: 1.5,
                      }}
                    >
                      {item.detail}
                    </div>
                  </div>
                ))}
              </div>

              {/* Certificate thumbnail */}
              <div
                style={{
                  marginTop: spacing.lg,
                  paddingTop: spacing.lg,
                  borderTop: `1px solid ${C.border}`,
                }}
              >
                <div
                  style={{
                    borderRadius: "12px",
                    overflow: "hidden",
                    border: `1px solid ${C.border}`,
                    position: "relative",
                    transition: `all ${motion.duration.normal} ${motion.easing}`,
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    if (!isMobile) {
                      e.currentTarget.style.transform = motion.hover.scale;
                      e.currentTarget.querySelector(".cert-overlay").style.opacity = "1";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isMobile) {
                      e.currentTarget.style.transform = "scale(1)";
                      e.currentTarget.querySelector(".cert-overlay").style.opacity = "0";
                    }
                  }}
                >
                  <img
                    src={data.certPreview}
                    alt={`${data.company} certificate`}
                    style={{
                      width: "100%",
                      display: "block",
                      transition: `all ${motion.duration.normal} ${motion.easing}`,
                    }}
                    loading="lazy"
                  />
                  <div
                    className="cert-overlay"
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "rgba(0,0,0,0.6)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      opacity: 0,
                      transition: `opacity ${motion.duration.normal} ${motion.easing}`,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: spacing.xs,
                        fontSize: "0.875rem",
                        fontWeight: 600,
                        color: "#fff",
                        padding: `${spacing.sm} ${spacing.md}`,
                        background: "rgba(0,0,0,0.8)",
                        borderRadius: "8px",
                        border: `1px solid ${data.accent}60`,
                      }}
                    >
                      <ArrowUpRight size={16} />
                      View Certificate
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════════════════════ */
export default function Internships() {
  const [headerInView, setHeaderInView] = useState(false);
  const [summaryInView, setSummaryInView] = useState(false);
  const headerRef = useRef(null);
  const summaryRef = useRef(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    const observers = [
      { ref: headerRef, setter: setHeaderInView },
      { ref: summaryRef, setter: setSummaryInView },
    ];

    const observerInstances = observers.map(({ ref, setter }) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setter(true);
        },
        { threshold: 0.1 }
      );
      if (ref.current) observer.observe(ref.current);
      return observer;
    });

    return () => observerInstances.forEach((obs) => obs.disconnect());
  }, []);

  return (
    <>
      {/* ═══════ GLOBAL STYLES ═══════ */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Mono:wght@400;500;600;700&family=Geist:wght@300;400;500;600;700&display=swap');

        *, *::before, *::after {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          font-family: 'Geist', system-ui, sans-serif;
          background: ${C.bg};
          color: ${C.text};
          -webkit-font-smoothing: antialiased;
          cursor: none;
        }

        @media (max-width: 768px) {
          body {
            cursor: auto;
          }
        }

        ::selection {
          background: ${C.accentDim};
          color: ${C.text};
        }

        ::-webkit-scrollbar {
          width: 6px;
        }

        ::-webkit-scrollbar-track {
          background: ${C.bg};
        }

        ::-webkit-scrollbar-thumb {
          background: ${C.border3};
          border-radius: 3px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: ${C.muted};
        }

        /* Accessibility: focus-visible states */
        button:focus-visible,
        a:focus-visible {
          outline: 2px solid ${C.accent};
          outline-offset: 2px;
        }

        @keyframes lineGrow {
          from { width: 0; }
          to { width: 96px; }
        }

        @keyframes fadeSlide {
          from {
            opacity: 0;
            transform: translateY(16px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideIn {
          from {
            transform: scaleX(0);
            transform-origin: left;
          }
          to {
            transform: scaleX(1);
            transform-origin: left;
          }
        }
      `}</style>

      {/* Custom cursor */}
      <CustomCursor />

      {/* Scroll progress */}
      <ScrollProgress />

      {/* Timeline rail */}
      <TimelineRail />

      {/* Background texture */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.012'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* ═══════ PAGE WRAPPER ═══════ */}
      <div style={{ position: "relative", zIndex: 1 }}>
        {/* ═══════ HERO HEADER ═══════ */}
        <header
          ref={headerRef}
          style={{
            maxWidth: "1240px",
            margin: "0 auto",
            padding: isMobile 
              ? `${spacing["3xl"]} ${spacing.sm} ${spacing.xl}` 
              : `${spacing["4xl"]} ${spacing.lg} ${spacing["3xl"]}`,
            borderBottom: `1px solid ${C.border}`,
            opacity: headerInView ? 1 : 0,
            transform: headerInView ? "translateY(0)" : "translateY(30px)",
            transition: `opacity ${motion.duration.slow} ${motion.easing}, transform ${motion.duration.slow} ${motion.easing}`,
            position: "relative",
          }}
        >
          {/* Background glow */}
          <div
            style={{
              position: "absolute",
              top: "20%",
              left: "50%",
              transform: "translateX(-50%)",
              width: isMobile ? "400px" : "600px",
              height: isMobile ? "200px" : "300px",
              borderRadius: "50%",
              background: `radial-gradient(circle, ${C.accent}06 0%, transparent 70%)`,
              filter: isMobile ? "blur(60px)" : "blur(80px)",
              pointerEvents: "none",
            }}
          />

          {/* Overline */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: spacing.sm,
              marginBottom: spacing.lg,
            }}
          >
            <div style={{ width: isMobile ? "32px" : "48px", height: "2px", background: C.accent }} />
            <span
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: "0.7rem",
                fontWeight: 600,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: C.accent,
              }}
            >
              Industry Experience · 2024 – 2025
            </span>
          </div>

          {/* Main headline */}
          <h1
            style={{
              fontFamily: "'Instrument Serif', serif",
              fontSize: isMobile ? "clamp(2.5rem, 12vw, 4rem)" : "clamp(3.5rem, 8vw, 6.5rem)",
              fontWeight: 400,
              color: C.text,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              marginBottom: spacing.sm,
              maxWidth: "1000px",
            }}
          >
            Professional Experience
          </h1>

          {/* Animated underline */}
          <div
            style={{
              width: isMobile ? "160px" : "200px",
              height: "4px",
              background: `linear-gradient(90deg, ${C.accent}, ${C.purple}, ${C.green})`,
              borderRadius: "2px",
              marginBottom: spacing.xl,
              animation: headerInView ? `lineGrow ${motion.duration.slow} ${motion.easing} 0.1s both` : "none",
            }}
          />

          {/* Subtitle */}
          <p
            style={{
              fontSize: isMobile ? "1.05rem" : "1.25rem",
              color: C.muted2,
              lineHeight: 1.7,
              maxWidth: isMobile ? "100%" : "700px",
              marginBottom: spacing["2xl"],
            }}
          >
            Three industry internships across full-stack engineering, machine learning, and
            data science — each resulting in production-deployed or independently validated
            outcomes.
          </p>

          {/* Stats grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile 
                ? "repeat(2, 1fr)" 
                : "repeat(auto-fit, minmax(180px, 1fr))",
              gap: isMobile ? spacing.lg : spacing.xl,
              maxWidth: "900px",
            }}
          >
            {[
              { value: 3, label: "Industry Internships" },
              { value: "7+", label: "Months Total Experience" },
              { value: "15+", label: "Projects Shipped" },
              { value: "100%", label: "Verified Credentials" },
            ].map((stat, i) => (
              <div key={i}>
                <div
                  style={{
                    fontFamily: "'Instrument Serif', serif",
                    fontSize: isMobile ? "2.5rem" : "3rem",
                    fontWeight: 400,
                    color: C.text,
                    lineHeight: 1,
                    marginBottom: spacing.xs,
                    letterSpacing: "-0.02em",
                  }}
                >
                  <AnimatedCounter value={stat.value} />
                </div>
                <div
                  style={{
                    fontSize: "0.85rem",
                    color: C.muted,
                    fontWeight: 500,
                    letterSpacing: "0.02em",
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </header>

        {/* ═══════ EXPERIENCE SECTIONS ═══════ */}
        {experiences.map((exp, i) => (
          <ExperienceSection
            key={exp.id}
            data={exp}
            index={i}
            isLast={i === experiences.length - 1}
          />
        ))}

        {/* ═══════ AGGREGATE SUMMARY ═══════ */}
        <section
          ref={summaryRef}
          style={{
            maxWidth: "1240px",
            margin: "0 auto",
            padding: isMobile 
              ? `${spacing["3xl"]} ${spacing.sm}` 
              : `${spacing["4xl"]} ${spacing.lg}`,
            borderTop: `1px solid ${C.border}`,
            opacity: summaryInView ? 1 : 0,
            transform: summaryInView ? "translateY(0)" : "translateY(30px)",
            transition: `opacity ${motion.duration.slow} ${motion.easing}, transform ${motion.duration.slow} ${motion.easing}`,
          }}
        >
          <div style={{ marginBottom: spacing.xl }}>
            <div
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: "0.7rem",
                fontWeight: 700,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: C.muted,
                marginBottom: spacing.sm,
              }}
            >
              Combined Impact
            </div>
            <h2
              style={{
                fontFamily: "'Instrument Serif', serif",
                fontSize: isMobile ? "clamp(1.75rem, 8vw, 2.5rem)" : "clamp(2rem, 4vw, 3rem)",
                fontWeight: 400,
                color: C.text,
                letterSpacing: "-0.01em",
              }}
            >
              Aggregate Overview
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile 
                ? "1fr" 
                : "repeat(auto-fit, minmax(280px, 1fr))",
              gap: spacing.md,
            }}
          >
            {[
              { value: "5+", label: "Major Projects", detail: "Full-stack & ML applications built" },
              { value: "50K+", label: "Records Processed", detail: "Across structured & text datasets" },
              { value: "6", label: "ML Models", detail: "Classification & NLP pipelines" },
              { value: "85–90%", label: "Best Model Accuracy", detail: "Image & text classification tasks" },
              { value: "Multiple", label: "API Integrations", detail: "REST-based frontend–backend connectivity" },
              { value: "2", label: "OAuth Providers", detail: "Google & GitHub authentication" },
            ].map((stat, i) => (
              <div
                key={i}
                style={{
                  padding: spacing.lg,
                  background: C.surface,
                  border: `1px solid ${C.border}`,
                  borderRadius: "16px",
                  transition: `all ${motion.duration.normal} ${motion.easing}`,
                  opacity: summaryInView ? 1 : 0,
                  transform: summaryInView ? "translateY(0)" : "translateY(16px)",
                  transitionDelay: `${i * 0.05}s`,
                }}
                onMouseEnter={(e) => {
                  if (!isMobile) {
                    e.currentTarget.style.borderColor = C.accent + "40";
                    e.currentTarget.style.transform = motion.hover.translate;
                    e.currentTarget.style.boxShadow = elevation[1];
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isMobile) {
                    e.currentTarget.style.borderColor = C.border;
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                  }
                }}
              >
                <div
                  style={{
                    fontFamily: "'Instrument Serif', serif",
                    fontSize: isMobile ? "2rem" : "2.5rem",
                    fontWeight: 400,
                    color: C.text,
                    lineHeight: 1,
                    marginBottom: spacing.sm,
                    letterSpacing: "-0.02em",
                  }}
                >
                  {stat.value}
                </div>
                <div
                  style={{
                    fontSize: "1rem",
                    fontWeight: 600,
                    color: C.muted2,
                    marginBottom: spacing.xs,
                  }}
                >
                  {stat.label}
                </div>
                <div
                  style={{
                    fontSize: "0.875rem",
                    color: C.muted,
                    lineHeight: 1.5,
                  }}
                >
                  {stat.detail}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ═══════ FOOTER ═══════ */}
        <footer
          style={{
            maxWidth: "1240px",
            margin: "0 auto",
            padding: isMobile 
              ? `${spacing.xl} ${spacing.sm}` 
              : `${spacing["2xl"]} ${spacing.lg}`,
            borderTop: `1px solid ${C.border}`,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              alignItems: isMobile ? "flex-start" : "center",
              justifyContent: "space-between",
              gap: spacing.lg,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: spacing.sm,
              }}
            >
              <CheckCircle2 size={18} color={C.green} />
              <span
                style={{
                  fontSize: "0.875rem",
                  color: C.muted2,
                  fontFamily: "'DM Mono', monospace",
                }}
              >
                All certificates independently verifiable via Google Drive
              </span>
            </div>

            <div 
              style={{ 
                display: "flex", 
                flexWrap: "wrap",
                gap: spacing.sm,
              }}
            >
              {[
                { label: "Email", href: "mailto:g.sivasatyasaibhagavan@gmail.com" },
                { label: "LinkedIn", href: "https://www.linkedin.com/in/gopalajosyula-siva-satya-sai-bhagavan-1624a027b/" },
                { label: "GitHub", href: "https://github.com/bhagavan444" },
              ].map((link) => (
                <MagneticButton
                  key={link.label}
                  href={link.href}
                  accent={C.accent}
                  style={{ 
                    padding: `${spacing.xs} ${spacing.sm}`, 
                    fontSize: "0.8rem" 
                  }}
                >
                  {link.label}
                </MagneticButton>
              ))}
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}