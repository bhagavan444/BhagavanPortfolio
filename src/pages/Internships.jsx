"use client";

import React, { useState, useEffect, useRef } from "react";
import { ExternalLink, MapPin, Calendar, CheckCircle2, ArrowUpRight } from "lucide-react";

/* ═══════════════════════════════════════════════════════════════
   DESIGN TOKENS — WHITE BACKGROUND PREMIUM
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

    certPreview: "https://drive.google.com/uc?export=view&id=1bwbNlc9mdPYQOIyUpoiBIOhpyxaMBvbC",

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

    certPreview: "https://drive.google.com/uc?export=view&id=1-_8ZI8uZ3DcrFpfZ3pts7VSYrAqPN5Zw",

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

    certPreview: "https://drive.google.com/uc?export=view&id=18j3Go5VHISIf79vYic6-vcowNoEgg7SW",

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
   CUSTOM CURSOR
═══════════════════════════════════════════════════════════════ */
function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [currentAccent, setCurrentAccent] = useState(C.accent);

  useEffect(() => {
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
  }, []);

  return (
    <>
      <div
        style={{
          position: "fixed",
          left: position.x,
          top: position.y,
          width: isHovering ? "32px" : "8px",
          height: isHovering ? "32px" : "8px",
          borderRadius: "50%",
          background: isHovering ? "transparent" : currentAccent,
          border: isHovering ? `2px solid ${currentAccent}` : "none",
          pointerEvents: "none",
          zIndex: 10000,
          transform: "translate(-50%, -50%)",
          transition: "width 0.2s ease, height 0.2s ease, background 0.2s ease, border 0.2s ease",
          mixBlendMode: "difference",
        }}
      />
      <div
        style={{
          position: "fixed",
          left: position.x,
          top: position.y,
          width: isHovering ? "64px" : "48px",
          height: isHovering ? "64px" : "48px",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${currentAccent}15 0%, transparent 70%)`,
          pointerEvents: "none",
          zIndex: 9999,
          transform: "translate(-50%, -50%)",
          transition: "width 0.3s ease, height 0.3s ease",
        }}
      />
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════
   ANIMATED COUNTER
═══════════════════════════════════════════════════════════════ */
function AnimatedCounter({ value, duration = 2000 }) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          
          // Handle string values like "1,000+" or "100K+"
          const numericValue = parseInt(value.toString().replace(/[^0-9]/g, "")) || 0;
          const start = 0;
          const end = numericValue;
          const startTime = Date.now();

          const animate = () => {
            const now = Date.now();
            const progress = Math.min((now - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(start + (end - start) * eased));

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setCount(end);
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

  // Format the count back to original format
  const formatCount = (num) => {
    if (value.toString().includes("K")) {
      return `${(num / 1000).toFixed(0)}K+`;
    }
    if (value.toString().includes(",")) {
      return `${num.toLocaleString()}+`;
    }
    return num.toString();
  };

  return <span ref={ref}>{formatCount(count)}</span>;
}

/* ═══════════════════════════════════════════════════════════════
   SCROLL PROGRESS
═══════════════════════════════════════════════════════════════ */
function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress((window.scrollY / total) * 100);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
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
          background: `linear-gradient(90deg, ${C.accent}, ${C.purple}, ${C.green})`,
          transition: "width 0.1s linear",
        }}
      />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   STICKY TIMELINE RAIL
═══════════════════════════════════════════════════════════════ */
function TimelineRail() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("[data-experience]");
      let current = 0;

      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
          current = index;
        }
      });

      setActiveIndex(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        left: "3rem",
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 100,
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
      }}
    >
      {experiences.map((exp, i) => (
        <div
          key={exp.id}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            cursor: "pointer",
            transition: "all 0.3s ease",
          }}
          onClick={() => {
            document.getElementById(`exp-${exp.id}`)?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          <div
            style={{
              width: activeIndex === i ? "48px" : "24px",
              height: "2px",
              background: activeIndex === i ? exp.accent : C.border2,
              transition: "all 0.3s ease",
            }}
          />
          <div
            style={{
              opacity: activeIndex === i ? 1 : 0,
              transform: activeIndex === i ? "translateX(0)" : "translateX(-8px)",
              transition: "all 0.3s ease",
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
   MAGNETIC BUTTON
═══════════════════════════════════════════════════════════════ */
function MagneticButton({ children, href, accent, style }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const ref = useRef(null);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setPosition({ x: x * 0.3, y: y * 0.3 });
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
        gap: "0.5rem",
        padding: "0.75rem 1.5rem",
        background: accent + "10",
        border: `1px solid ${accent}40`,
        borderRadius: "8px",
        fontSize: "0.875rem",
        fontWeight: 600,
        color: accent,
        textDecoration: "none",
        fontFamily: "'DM Mono', monospace",
        transition: "all 0.2s ease",
        transform: `translate(${position.x}px, ${position.y}px)`,
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
   EXPERIENCE SECTION
═══════════════════════════════════════════════════════════════ */
function ExperienceSection({ data, index, isLast }) {
  const [inView, setInView] = useState(false);
  const [activeTab, setActiveTab] = useState("contributions");
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * 2, y: -x * 2 });
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
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        position: "relative",
        padding: "8rem 0",
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(60px)",
        transition: "opacity 0.8s ease, transform 0.8s ease",
        borderBottom: isLast ? "none" : `1px solid ${C.border}`,
      }}
    >
      {/* Year watermark */}
      <div
        style={{
          position: "absolute",
          left: "-2%",
          top: "20%",
          fontSize: "clamp(10rem, 18vw, 20rem)",
          fontFamily: "'Instrument Serif', serif",
          fontWeight: 400,
          color: data.accentDim,
          lineHeight: 1,
          userSelect: "none",
          pointerEvents: "none",
          opacity: 0.4,
        }}
      >
        {data.year}
      </div>

      {/* Background glow */}
      <div
        style={{
          position: "absolute",
          left: "15%",
          top: "30%",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${data.accent}10 0%, transparent 70%)`,
          filter: "blur(100px)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: "1240px",
          margin: "0 auto",
          padding: "0 2rem",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.2fr 1fr",
            gap: "6rem",
            alignItems: "start",
          }}
        >
          {/* Left: Content */}
          <div
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "translateX(0)" : "translateX(-40px)",
              transition: "opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s",
            }}
          >
            {/* Header */}
            <div style={{ marginBottom: "2rem" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  marginBottom: "1rem",
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
                  marginBottom: "0.5rem",
                }}
              >
                {data.type}
              </div>

              <h2
                style={{
                  fontFamily: "'Instrument Serif', serif",
                  fontSize: "clamp(2.5rem, 5vw, 3.5rem)",
                  fontWeight: 400,
                  color: C.text,
                  lineHeight: 1.1,
                  letterSpacing: "-0.02em",
                  marginBottom: "0.5rem",
                }}
              >
                {data.role}
              </h2>

              <div
                style={{
                  fontSize: "1.25rem",
                  fontWeight: 600,
                  color: C.muted2,
                  marginBottom: "0.75rem",
                }}
              >
                {data.company}
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
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
                width: "120px",
                height: "3px",
                background: `linear-gradient(90deg, ${data.accent}, transparent)`,
                borderRadius: "2px",
                marginBottom: "2rem",
                animation: inView ? "lineGrow 0.8s ease 0.4s both" : "none",
              }}
            />

            {/* Summary */}
            <p
              style={{
                fontSize: "1.05rem",
                color: C.muted2,
                lineHeight: 1.8,
                marginBottom: "3rem",
              }}
            >
              {data.summary}
            </p>

            {/* Tab navigation */}
            <div style={{ marginBottom: "2rem" }}>
              <div
                style={{
                  display: "flex",
                  gap: "2rem",
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
                      padding: "1rem 0",
                      fontSize: "0.875rem",
                      fontWeight: 600,
                      color: activeTab === tab ? C.text : C.muted,
                      cursor: "pointer",
                      transition: "color 0.2s ease",
                      textTransform: "capitalize",
                      position: "relative",
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
                          animation: "slideIn 0.3s ease",
                        }}
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab content */}
            <div
              style={{
                minHeight: "300px",
              }}
            >
              {activeTab === "contributions" && (
                <div
                  style={{
                    animation: "fadeSlide 0.4s ease",
                  }}
                >
                  <ul
                    style={{
                      listStyle: "none",
                      display: "flex",
                      flexDirection: "column",
                      gap: "1rem",
                    }}
                  >
                    {data.contributions.map((item, i) => (
                      <li
                        key={i}
                        style={{
                          display: "flex",
                          gap: "1rem",
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
                            lineHeight: 1.7,
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
                <div
                  style={{
                    animation: "fadeSlide 0.4s ease",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "1.5rem",
                    }}
                  >
                    {Object.entries(data.stack).map(([category, items]) => (
                      <div key={category}>
                        <div
                          style={{
                            fontSize: "0.75rem",
                            fontWeight: 700,
                            color: data.accent,
                            marginBottom: "0.75rem",
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
                            gap: "0.5rem",
                          }}
                        >
                          {items.map((tech) => (
                            <span
                              key={tech}
                              data-hover
                              style={{
                                padding: "0.5rem 1rem",
                                background: C.surface,
                                border: `1px solid ${C.border}`,
                                borderRadius: "6px",
                                fontSize: "0.85rem",
                                fontWeight: 500,
                                color: C.muted2,
                                transition: "all 0.2s ease",
                                cursor: "default",
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.background = data.accentDim;
                                e.currentTarget.style.borderColor = data.accent + "40";
                                e.currentTarget.style.color = C.text;
                                e.currentTarget.style.transform = "translateY(-2px)";
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
            <div style={{ marginTop: "3rem" }}>
              <MagneticButton href={`https://drive.google.com/file/d/${data.certId}/view`} accent={data.accent}>
                <CheckCircle2 size={16} />
                View Verified Certificate
              </MagneticButton>
            </div>
          </div>

          {/* Right: Metrics */}
          <div
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "translateX(0)" : "translateX(40px)",
              transition: "opacity 0.8s ease 0.4s, transform 0.8s ease 0.4s",
              position: "sticky",
              top: "6rem",
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <div
              style={{
                position: "relative",
                padding: "3rem 2.5rem",
                background: C.surface,
                border: `1px solid ${C.border}`,
                borderRadius: "24px",
                transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                transition: "transform 0.2s ease",
                boxShadow: `0 20px 48px rgba(0,0,0,0.06)`,
              }}
            >
              {/* Glow overlay */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: "24px",
                  background: `radial-gradient(circle at 50% 50%, ${data.accent}08 0%, transparent 60%)`,
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
                  marginBottom: "2rem",
                }}
              >
                Impact Metrics
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "2rem",
                }}
              >
                {data.impact.map((item, i) => (
                  <div
                    key={i}
                    style={{
                      paddingBottom: i < data.impact.length - 1 ? "2rem" : 0,
                      borderBottom:
                        i < data.impact.length - 1 ? `1px solid ${C.border}` : "none",
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "'Instrument Serif', serif",
                        fontSize: "3rem",
                        fontWeight: 400,
                        color: data.accent,
                        lineHeight: 1,
                        marginBottom: "0.5rem",
                        letterSpacing: "-0.03em",
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
                        lineHeight: 1.6,
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
                  marginTop: "2.5rem",
                  paddingTop: "2rem",
                  borderTop: `1px solid ${C.border}`,
                }}
              >
                <div
                  style={{
                    borderRadius: "12px",
                    overflow: "hidden",
                    border: `1px solid ${C.border}`,
                    position: "relative",
                    transition: "all 0.3s ease",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.02)";
                    e.currentTarget.querySelector(".cert-overlay").style.opacity = "1";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                    e.currentTarget.querySelector(".cert-overlay").style.opacity = "0";
                  }}
                >
                  <img
                    src={`https://drive.google.com/thumbnail?id=${data.certId}&sz=w800`}
                    alt={`${data.company} certificate`}
                    style={{
                      width: "100%",
                      display: "block",
                      transition: "all 0.3s ease",
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
                      transition: "opacity 0.3s ease",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        fontSize: "0.875rem",
                        fontWeight: 600,
                        color: "#fff",
                        padding: "0.75rem 1.25rem",
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
        { threshold: 0.2 }
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

        @keyframes lineGrow {
          from { width: 0; }
          to { width: 120px; }
        }

        @keyframes fadeSlide {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideIn {
          from {
            transform: scaleX(0);
          }
          to {
            transform: scaleX(1);
          }
        }

        @media (max-width: 768px) {
          body {
            cursor: auto;
          }
        }

        @media (max-width: 1024px) {
          [style*="gridTemplateColumns: 1.2fr 1fr"] {
            grid-template-columns: 1fr !important;
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
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.015'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
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
            padding: "10rem 2rem 6rem",
            borderBottom: `1px solid ${C.border}`,
            opacity: headerInView ? 1 : 0,
            transform: headerInView ? "translateY(0)" : "translateY(40px)",
            transition: "opacity 0.8s ease, transform 0.8s ease",
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
              width: "800px",
              height: "400px",
              borderRadius: "50%",
              background: `radial-gradient(circle, ${C.accent}08 0%, transparent 70%)`,
              filter: "blur(100px)",
              pointerEvents: "none",
            }}
          />

          {/* Overline */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              marginBottom: "2rem",
            }}
          >
            <div style={{ width: "48px", height: "2px", background: C.accent }} />
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
              fontSize: "clamp(3.5rem, 8vw, 6.5rem)",
              fontWeight: 400,
              color: C.text,
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              marginBottom: "1rem",
              maxWidth: "1000px",
            }}
          >
            Professional Experience
          </h1>

          {/* Animated underline */}
          <div
            style={{
              width: "240px",
              height: "4px",
              background: `linear-gradient(90deg, ${C.accent}, ${C.purple}, ${C.green})`,
              borderRadius: "2px",
              marginBottom: "2.5rem",
              animation: headerInView ? "lineGrow 1s ease 0.2s both" : "none",
            }}
          />

          {/* Subtitle */}
          <p
            style={{
              fontSize: "1.25rem",
              color: C.muted2,
              lineHeight: 1.8,
              maxWidth: "720px",
              marginBottom: "4rem",
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
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: "3rem",
              maxWidth: "900px",
            }}
          >
            {[
              { value: 3, label: "Industry Internships" },
              { value: 7, label: "Months Total Experience" },
              { value: 15, label: "Projects Shipped" },
              { value: 100, label: "Verified Credentials" },
            ].map((stat, i) => (
              <div key={i}>
                <div
                  style={{
                    fontFamily: "'Instrument Serif', serif",
                    fontSize: "3rem",
                    fontWeight: 400,
                    color: C.text,
                    lineHeight: 1,
                    marginBottom: "0.5rem",
                    letterSpacing: "-0.03em",
                  }}
                >
                  <AnimatedCounter value={stat.value} />
                  {stat.value === 100 && "%"}
                  {stat.value === 15 && "+"}
                  {stat.value === 7 && "+"}
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
            padding: "8rem 2rem",
            borderTop: `1px solid ${C.border}`,
            opacity: summaryInView ? 1 : 0,
            transform: summaryInView ? "translateY(0)" : "translateY(40px)",
            transition: "opacity 0.8s ease, transform 0.8s ease",
          }}
        >
          <div style={{ marginBottom: "3rem" }}>
            <div
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: "0.7rem",
                fontWeight: 700,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: C.muted,
                marginBottom: "1rem",
              }}
            >
              Combined Impact
            </div>
            <h2
              style={{
                fontFamily: "'Instrument Serif', serif",
                fontSize: "clamp(2rem, 4vw, 3rem)",
                fontWeight: 400,
                color: C.text,
                letterSpacing: "-0.02em",
              }}
            >
              Aggregate Overview
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "1.5rem",
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
                  padding: "2rem",
                  background: C.surface,
                  border: `1px solid ${C.border}`,
                  borderRadius: "16px",
                  transition: "all 0.3s ease",
                  opacity: summaryInView ? 1 : 0,
                  transform: summaryInView ? "translateY(0)" : "translateY(20px)",
                  transitionDelay: `${i * 0.1}s`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = C.accent + "40";
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = "0 12px 32px rgba(0,0,0,0.08)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = C.border;
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div
                  style={{
                    fontFamily: "'Instrument Serif', serif",
                    fontSize: "2.5rem",
                    fontWeight: 400,
                    color: C.text,
                    lineHeight: 1,
                    marginBottom: "0.75rem",
                    letterSpacing: "-0.03em",
                  }}
                >
                  {stat.value}
                </div>
                <div
                  style={{
                    fontSize: "1rem",
                    fontWeight: 600,
                    color: C.muted2,
                    marginBottom: "0.5rem",
                  }}
                >
                  {stat.label}
                </div>
                <div
                  style={{
                    fontSize: "0.875rem",
                    color: C.muted,
                    lineHeight: 1.6,
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
            padding: "4rem 2rem",
            borderTop: `1px solid ${C.border}`,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "2rem",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
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

            <div style={{ display: "flex", gap: "2rem" }}>
              {[
                { label: "Email", href: "mailto:g.sivasatyasaibhagavan@gmail.com" },
                { label: "LinkedIn", href: "https://www.linkedin.com/in/gopalajosyula-siva-satya-sai-bhagavan-1624a027b/" },
                { label: "GitHub", href: "https://github.com/bhagavan444" },
              ].map((link) => (
                <MagneticButton
                  key={link.label}
                  href={link.href}
                  accent={C.accent}
                  style={{ padding: "0.5rem 1rem", fontSize: "0.8rem" }}
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