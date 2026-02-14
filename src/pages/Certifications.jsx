"use client";

import React, { useState, useEffect, useRef } from "react";
import { ExternalLink, CheckCircle2, Calendar, Award, Code2, Cloud, Brain, Database, Terminal, Shield, ArrowRight, TrendingUp } from "lucide-react";

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
  purple: "#a78bfa",
  purpleDim: "rgba(167,139,250,0.08)",
  amber: "#f59e0b",
  amberDim: "rgba(245,158,11,0.08)",
};

/* ═══════════════════════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════════════════════ */
const certificationsData = {
  featured: [
    {
      id: "fullstack-web",
      title: "Full Stack Web Development",
      issuer: "Tech Academy",
      year: "2024",
      duration: "6 months",
      link: "https://drive.google.com/file/d/1AfvPfSaXHgVK9lPOsS3MUJimynH6xlog/view",
      skills: ["React", "Node.js", "MongoDB", "Express"],
      impact: {
        metric: "3,000+",
        label: "Active Users",
        detail: "ATS Resume Builder with 2× improvement in hire rate",
      },
      appliedIn: "Powers authentication and data layer for production apps",
      verified: true,
      accent: C.accent,
      accentDim: C.accentDim,
    },
    {
      id: "ml-python",
      title: "Machine Learning with Python",
      issuer: "ML Academy",
      year: "2024",
      duration: "7 months",
      link: "https://drive.google.com/file/d/1uaTJTnijSpjCsD_ZPHKwen9i3RDYwShK/view",
      skills: ["Python", "Scikit-learn", "TensorFlow", "Keras"],
      impact: {
        metric: "95%",
        label: "Accuracy",
        detail: "Fake News Detection trained on 1M+ articles",
      },
      appliedIn: "Foundation for NLP and classification ML pipelines",
      verified: true,
      accent: C.purple,
      accentDim: C.purpleDim,
    },
    {
      id: "aws-cloud",
      title: "AWS Cloud Practitioner",
      issuer: "Amazon Web Services",
      year: "2024",
      duration: "3 months",
      link: "https://drive.google.com/file/d/17vu2Vd5QnxAHe4iEYv21ADC-Pfs-90U9/view",
      skills: ["AWS", "EC2", "S3", "Lambda"],
      impact: {
        metric: "Multi-Region",
        label: "Deployment",
        detail: "Production infrastructure for web applications",
      },
      appliedIn: "Cloud architecture for scalable application deployments",
      verified: true,
      accent: C.green,
      accentDim: C.greenDim,
    },
  ],

  domains: {
    "Web Development": {
      icon: Code2,
      accent: C.accent,
      certs: [
        {
          title: "Full Stack Web Development",
          issuer: "Tech Academy",
          year: "2024",
          link: "https://drive.google.com/file/d/1AfvPfSaXHgVK9lPOsS3MUJimynH6xlog/view",
          skills: ["React", "Node.js", "MongoDB", "Express"],
          appliedIn: "Resume Builder, AI Chat Workspace",
        },
        {
          title: "React Development",
          issuer: "Meta",
          year: "2024",
          link: "https://drive.google.com/file/d/1yy4OpoVRAX2ZGVPUH9VmorLc2kiXalYf/view",
          skills: ["React", "Hooks", "Context API", "Performance"],
          appliedIn: "Component architecture for all frontend projects",
        },
        {
          title: "JavaScript (Advanced)",
          issuer: "JS Academy",
          year: "2024",
          link: "https://drive.google.com/file/d/1zrscfW3cyWq59mMYsK399CRjgEjA-zbd/view",
          skills: ["ES6+", "Async/Await", "Closures", "Prototypes"],
          appliedIn: "Core language foundation for all web apps",
        },
        {
          title: "Django Framework",
          issuer: "Django Foundation",
          year: "2023",
          link: "https://drive.google.com/file/d/1QdiX2u-ARCZCEdEmlu4l3ChnQT-SmhKc/view",
          skills: ["Django", "ORM", "REST API", "PostgreSQL"],
          appliedIn: "Backend services for ML model serving",
        },
        {
          title: "HTML5 & Semantic Markup",
          issuer: "W3C",
          year: "2023",
          link: "https://drive.google.com/file/d/1NYtaxfhQUfxaL4n6Vv6gJSEQMySy1gqr/view",
          skills: ["HTML5", "Accessibility", "SEO", "Web Standards"],
          appliedIn: "Accessible interfaces across all projects",
        },
        {
          title: "CSS3 & Modern Layouts",
          issuer: "CSS Academy",
          year: "2023",
          link: "https://drive.google.com/file/d/1iC65FGw0MSmjeKIivdnrZVm3GfXOKVvE/view",
          skills: ["Flexbox", "Grid", "Animations", "Responsive Design"],
          appliedIn: "Responsive design system for portfolio",
        },
      ],
    },

    "Cloud & DevOps": {
      icon: Cloud,
      accent: C.green,
      certs: [
        {
          title: "AWS Cloud Practitioner",
          issuer: "Amazon Web Services",
          year: "2024",
          link: "https://drive.google.com/file/d/17vu2Vd5QnxAHe4iEYv21ADC-Pfs-90U9/view",
          skills: ["AWS", "EC2", "S3", "Lambda"],
          appliedIn: "Cloud infrastructure for production deployments",
        },
        {
          title: "Azure Fundamentals",
          issuer: "Microsoft",
          year: "2024",
          link: "https://drive.google.com/file/d/1ygiQILNjBAfcZse27n_px1_tgupajlWM/view",
          skills: ["Azure", "VMs", "Storage", "Networking"],
          appliedIn: "Multi-cloud deployment strategy",
        },
        {
          title: "Cloud Computing",
          issuer: "Cloud Academy",
          year: "2023",
          link: "https://drive.google.com/file/d/13gTq6yHm8jCOvqHKRjPpGw4hU4p7kovX/view",
          skills: ["Distributed Systems", "Scalability", "Fault Tolerance"],
          appliedIn: "Architecture design for scalable applications",
        },
        {
          title: "CI/CD Pipelines",
          issuer: "DevOps Academy",
          year: "2024",
          link: "https://drive.google.com/file/d/1xccQv29hZCWCvr-JnM-nEfE8meESrWIr/view",
          skills: ["Jenkins", "Docker", "Git", "Automation"],
          appliedIn: "Automated deployment for web applications",
        },
        {
          title: "MLOps",
          issuer: "MLOps Institute",
          year: "2024",
          link: "https://drive.google.com/file/d/1BmvjGknXs-K5wOfepFcl_CuU8DsFBApP/view",
          skills: ["Kubernetes", "Docker", "Model Deployment", "Monitoring"],
          appliedIn: "ML model deployment pipeline",
        },
      ],
    },

    "AI & Machine Learning": {
      icon: Brain,
      accent: C.purple,
      certs: [
        {
          title: "Machine Learning with Python",
          issuer: "ML Academy",
          year: "2024",
          link: "https://drive.google.com/file/d/1uaTJTnijSpjCsD_ZPHKwen9i3RDYwShK/view",
          skills: ["Scikit-learn", "TensorFlow", "Keras", "Model Tuning"],
          appliedIn: "Fake News Detection, Heart Disease Prediction",
        },
        {
          title: "Deep Learning Specialization",
          issuer: "AI Research Lab",
          year: "2024",
          link: "https://drive.google.com/file/d/19vV6Nyq8A418eDvQ2ezrek4pqyUBb6X6/view",
          skills: ["Neural Networks", "CNN", "RNN", "Transfer Learning"],
          appliedIn: "Image classification and NLP projects",
        },
        {
          title: "Large Language Models",
          issuer: "OpenAI Institute",
          year: "2024",
          link: "https://drive.google.com/file/d/1CyN6_Bm3c68R0NkQWWTOgNAXTv27In_s/view",
          skills: ["GPT", "Prompt Engineering", "Fine-tuning", "Embeddings"],
          appliedIn: "AI Chat Workspace, Resume optimization",
        },
      ],
    },

    "Programming & Foundations": {
      icon: Terminal,
      accent: C.amber,
      certs: [
        {
          title: "Python Programming",
          issuer: "Python Institute",
          year: "2024",
          link: "https://drive.google.com/file/d/1rZNRLvle0r_gUqzDjxR3_k6yApSyMxz6/view",
          skills: ["OOP", "Data Structures", "Algorithms", "Clean Code"],
          appliedIn: "Backend services and ML pipelines",
        },
        {
          title: "Java Programming",
          issuer: "Oracle",
          year: "2024",
          link: "https://drive.google.com/file/d/1esxKzHNp_cuB7G87hs2MDeMpr2LKXucM/view",
          skills: ["Java", "Spring Boot", "Maven", "Microservices"],
          appliedIn: "Enterprise application architecture",
        },
        {
          title: "Algorithmic Thinking",
          issuer: "Programming Institute",
          year: "2023",
          link: "https://drive.google.com/file/d/1SwQGo_zGZIGcTzzlMApXZU0Wt5ScyWXx/view",
          skills: ["Algorithms", "Problem Solving", "Optimization", "Design Patterns"],
          appliedIn: "Efficient code across all projects",
        },
        {
          title: "R Programming",
          issuer: "R Consortium",
          year: "2023",
          link: "https://drive.google.com/file/d/1vFclrkOAe3GaA8brE3c5Sjd0k5RMXwr-/view",
          skills: ["R", "Statistical Computing", "ggplot2", "Data Viz"],
          appliedIn: "Statistical analysis and visualization",
        },
      ],
    },

    "Data Science": {
      icon: Database,
      accent: "#6366f1",
      certs: [
        {
          title: "Data Science",
          issuer: "Data Science Institute",
          year: "2024",
          link: "https://drive.google.com/file/d/1JENKEIpZkc1Mvro1mmRVyQr5u8fdUXqv/view",
          skills: ["Python", "Pandas", "NumPy", "Data Analysis"],
          appliedIn: "Career path recommendation ML pipeline",
        },
      ],
    },
  },
};

/* ═══════════════════════════════════════════════════════════════
   CUSTOM CURSOR
═══════════════════════════════════════════════════════════════ */
function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

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
          background: isHovering ? "transparent" : C.accent,
          border: isHovering ? `2px solid ${C.accent}` : "none",
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
          background: `radial-gradient(circle, ${C.accent}15 0%, transparent 70%)`,
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

  const formatCount = (num) => {
    if (value.toString().includes("+")) {
      return `${num}+`;
    }
    return num.toString();
  };

  return <span ref={ref}>{formatCount(count)}</span>;
}

/* ═══════════════════════════════════════════════════════════════
   STAT CHIP
═══════════════════════════════════════════════════════════════ */
function StatChip({ value, label, icon: Icon }) {
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        padding: "1.25rem 1.75rem",
        background: C.surface,
        border: `1px solid ${C.border}`,
        borderRadius: "12px",
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(20px)",
        transition: "all 0.6s ease",
      }}
    >
      {Icon && (
        <div
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "10px",
            background: C.accentDim,
            border: `1px solid ${C.accent}20`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <Icon size={18} color={C.accent} />
        </div>
      )}
      <div>
        <div
          style={{
            fontFamily: "'Instrument Serif', serif",
            fontSize: "1.5rem",
            fontWeight: 400,
            color: C.text,
            lineHeight: 1,
            marginBottom: "0.25rem",
            letterSpacing: "-0.02em",
          }}
        >
          <AnimatedCounter value={value} />
        </div>
        <div
          style={{
            fontSize: "0.8rem",
            color: C.muted,
            fontFamily: "'DM Mono', monospace",
          }}
        >
          {label}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   FLAGSHIP CERTIFICATE CARD
═══════════════════════════════════════════════════════════════ */
function FlagshipCard({ cert, index }) {
  const [inView, setInView] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
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
    setTilt({ x: y * 3, y: -x * 3 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setHovered(false);
  };

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        background: C.surface,
        border: `1px solid ${hovered ? cert.accent + "40" : C.border}`,
        borderRadius: "20px",
        overflow: "hidden",
        transition: "all 0.3s ease",
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(${hovered ? "-8px" : "0"})`,
        boxShadow: hovered ? "0 20px 48px rgba(0,0,0,0.08)" : "0 4px 16px rgba(0,0,0,0.04)",
        opacity: inView ? 1 : 0,
        animation: inView ? `cardReveal 0.6s cubic-bezier(0.22,1,0.36,1) ${index * 0.15}s both` : "none",
      }}
    >
      {/* Top accent */}
      <div
        style={{
          height: "3px",
          background: `linear-gradient(90deg, ${cert.accent}, transparent)`,
        }}
      />

      <div
        style={{
          padding: "2.5rem",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: "1.5rem",
            marginBottom: "2rem",
          }}
        >
          <div style={{ flex: 1 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                marginBottom: "1rem",
              }}
            >
              <div
                style={{
                  padding: "0.4rem 0.9rem",
                  background: cert.accentDim,
                  border: `1px solid ${cert.accent}30`,
                  borderRadius: "6px",
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  color: cert.accent,
                  fontFamily: "'DM Mono', monospace",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                Applied in Production
              </div>
              {cert.verified && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.4rem",
                    padding: "0.4rem 0.9rem",
                    background: C.greenDim,
                    border: `1px solid ${C.green}30`,
                    borderRadius: "6px",
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    color: C.green,
                    fontFamily: "'DM Mono', monospace",
                  }}
                >
                  <Shield size={12} />
                  Verified
                </div>
              )}
            </div>

            <h3
              style={{
                fontFamily: "'Instrument Serif', serif",
                fontSize: "1.75rem",
                fontWeight: 400,
                color: C.text,
                lineHeight: 1.2,
                letterSpacing: "-0.02em",
                marginBottom: "0.5rem",
              }}
            >
              {cert.title}
            </h3>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                fontSize: "0.875rem",
                color: C.muted,
                marginBottom: "1.5rem",
              }}
            >
              <span>{cert.issuer}</span>
              <span>•</span>
              <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                <Calendar size={14} />
                {cert.year}
              </div>
              <span>•</span>
              <span>{cert.duration}</span>
            </div>

            {/* Skills */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "0.5rem",
                marginBottom: "2rem",
              }}
            >
              {cert.skills.map((skill) => (
                <span
                  key={skill}
                  style={{
                    padding: "0.4rem 0.9rem",
                    background: C.surface2,
                    border: `1px solid ${C.border}`,
                    borderRadius: "6px",
                    fontSize: "0.8rem",
                    fontWeight: 500,
                    color: C.muted2,
                    fontFamily: "'DM Mono', monospace",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = cert.accentDim;
                    e.currentTarget.style.borderColor = cert.accent + "40";
                    e.currentTarget.style.color = C.text;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = C.surface2;
                    e.currentTarget.style.borderColor = C.border;
                    e.currentTarget.style.color = C.muted2;
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>

            {/* Impact metric */}
            <div
              style={{
                padding: "1.5rem",
                background: `linear-gradient(135deg, ${cert.accentDim} 0%, transparent 100%)`,
                border: `1px solid ${cert.accent}20`,
                borderRadius: "12px",
                marginBottom: "1.5rem",
              }}
            >
              <div
                style={{
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  color: C.muted,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  fontFamily: "'DM Mono', monospace",
                  marginBottom: "0.75rem",
                }}
              >
                Production Impact
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: "0.75rem",
                  marginBottom: "0.5rem",
                }}
              >
                <div
                  style={{
                    fontFamily: "'Instrument Serif', serif",
                    fontSize: "2.5rem",
                    fontWeight: 400,
                    color: cert.accent,
                    lineHeight: 1,
                    letterSpacing: "-0.03em",
                  }}
                >
                  {cert.impact.metric}
                </div>
                <div
                  style={{
                    fontSize: "1rem",
                    fontWeight: 600,
                    color: C.text,
                  }}
                >
                  {cert.impact.label}
                </div>
              </div>
              <div
                style={{
                  fontSize: "0.875rem",
                  color: C.muted2,
                  lineHeight: 1.6,
                }}
              >
                {cert.impact.detail}
              </div>
            </div>

            {/* Applied in */}
            <div
              style={{
                padding: "1.25rem",
                background: C.surface2,
                border: `1px solid ${C.border}`,
                borderRadius: "10px",
                marginBottom: "1.5rem",
              }}
            >
              <div
                style={{
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  color: C.muted,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  fontFamily: "'DM Mono', monospace",
                  marginBottom: "0.5rem",
                }}
              >
                Applied Knowledge
              </div>
              <div
                style={{
                  fontSize: "0.9rem",
                  color: C.muted2,
                  lineHeight: 1.6,
                }}
              >
                {cert.appliedIn}
              </div>
            </div>

            {/* View button */}
            <a
              href={cert.link}
              target="_blank"
              rel="noopener noreferrer"
              data-magnetic
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.875rem 1.5rem",
                background: cert.accentDim,
                border: `1px solid ${cert.accent}40`,
                borderRadius: "10px",
                fontSize: "0.875rem",
                fontWeight: 600,
                color: cert.accent,
                textDecoration: "none",
                transition: "all 0.2s ease",
                fontFamily: "'DM Mono', monospace",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = cert.accent + "20";
                e.currentTarget.style.borderColor = cert.accent + "60";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = cert.accentDim;
                e.currentTarget.style.borderColor = cert.accent + "40";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <ExternalLink size={16} />
              View Credential
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   DOMAIN SECTION
═══════════════════════════════════════════════════════════════ */
function DomainSection({ domain, data, isActive, onClick }) {
  const Icon = data.icon;

  return (
    <div>
      {/* Domain header */}
      <div
        onClick={onClick}
        data-hover
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          padding: "1.5rem 2rem",
          background: isActive ? `${data.accent}08` : C.surface,
          border: `1px solid ${isActive ? data.accent + "30" : C.border}`,
          borderRadius: "16px",
          cursor: "pointer",
          transition: "all 0.3s ease",
          marginBottom: isActive ? "1.5rem" : 0,
        }}
        onMouseEnter={(e) => {
          if (!isActive) {
            e.currentTarget.style.background = C.surface2;
            e.currentTarget.style.borderColor = C.border2;
          }
        }}
        onMouseLeave={(e) => {
          if (!isActive) {
            e.currentTarget.style.background = C.surface;
            e.currentTarget.style.borderColor = C.border;
          }
        }}
      >
        <div
          style={{
            width: "48px",
            height: "48px",
            borderRadius: "12px",
            background: isActive ? `${data.accent}15` : C.surface2,
            border: `1px solid ${isActive ? data.accent + "40" : C.border}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            transition: "all 0.3s ease",
          }}
        >
          <Icon size={22} style={{ color: isActive ? data.accent : C.muted }} />
        </div>

        <div style={{ flex: 1 }}>
          <div
            style={{
              fontFamily: "'Instrument Serif', serif",
              fontSize: "1.25rem",
              fontWeight: 400,
              color: C.text,
              marginBottom: "0.25rem",
              letterSpacing: "-0.01em",
            }}
          >
            {domain}
          </div>
          <div
            style={{
              fontSize: "0.8rem",
              color: C.muted,
              fontFamily: "'DM Mono', monospace",
            }}
          >
            {data.certs.length} {data.certs.length === 1 ? "certification" : "certifications"}
          </div>
        </div>

        <ArrowRight
          size={20}
          style={{
            color: isActive ? data.accent : C.muted,
            transform: isActive ? "rotate(90deg)" : "rotate(0)",
            transition: "all 0.3s ease",
          }}
        />
      </div>

      {/* Certificates grid */}
      {isActive && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: "1.25rem",
            marginBottom: "2rem",
            animation: "expandDown 0.4s ease both",
          }}
        >
          {data.certs.map((cert, i) => (
            <div
              key={i}
              data-hover
              style={{
                padding: "1.75rem",
                background: C.surface,
                border: `1px solid ${C.border}`,
                borderRadius: "14px",
                transition: "all 0.3s ease",
                opacity: 0,
                animation: `cardReveal 0.5s ease ${i * 0.08}s both`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = data.accent + "40";
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "0 12px 32px rgba(0,0,0,0.08)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = C.border;
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <h4
                style={{
                  fontFamily: "'Instrument Serif', serif",
                  fontSize: "1.125rem",
                  fontWeight: 400,
                  color: C.text,
                  marginBottom: "0.75rem",
                  letterSpacing: "-0.01em",
                }}
              >
                {cert.title}
              </h4>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  fontSize: "0.8rem",
                  color: C.muted,
                  marginBottom: "1.25rem",
                }}
              >
                <span>{cert.issuer}</span>
                <span>•</span>
                <span>{cert.year}</span>
              </div>

              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "0.4rem",
                  marginBottom: "1.25rem",
                }}
              >
                {cert.skills.map((skill) => (
                  <span
                    key={skill}
                    style={{
                      padding: "0.35rem 0.75rem",
                      background: C.surface2,
                      border: `1px solid ${C.border}`,
                      borderRadius: "6px",
                      fontSize: "0.75rem",
                      fontWeight: 500,
                      color: C.muted2,
                      fontFamily: "'DM Mono', monospace",
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <div
                style={{
                  padding: "1rem",
                  background: C.surface2,
                  border: `1px solid ${C.border}`,
                  borderRadius: "8px",
                  marginBottom: "1.25rem",
                }}
              >
                <div
                  style={{
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    color: C.muted,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    fontFamily: "'DM Mono', monospace",
                    marginBottom: "0.4rem",
                  }}
                >
                  Applied In
                </div>
                <div
                  style={{
                    fontSize: "0.85rem",
                    color: C.muted2,
                    lineHeight: 1.5,
                  }}
                >
                  {cert.appliedIn}
                </div>
              </div>

              <a
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                data-magnetic
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem",
                  padding: "0.75rem",
                  background: "transparent",
                  border: `1px solid ${C.border2}`,
                  borderRadius: "8px",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  color: C.text,
                  textDecoration: "none",
                  transition: "all 0.2s ease",
                  fontFamily: "'DM Mono', monospace",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = C.surface2;
                  e.currentTarget.style.borderColor = C.border3;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.borderColor = C.border2;
                }}
              >
                <ExternalLink size={14} />
                View Credential
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════════════════════ */
export default function Certifications() {
  const [activeDomain, setActiveDomain] = useState(null);
  const [headerInView, setHeaderInView] = useState(false);
  const [featuredInView, setFeaturedInView] = useState(false);
  const [domainsInView, setDomainsInView] = useState(false);
  const [summaryInView, setSummaryInView] = useState(false);

  const headerRef = useRef(null);
  const featuredRef = useRef(null);
  const domainsRef = useRef(null);
  const summaryRef = useRef(null);

  useEffect(() => {
    const observers = [
      { ref: headerRef, setter: setHeaderInView },
      { ref: featuredRef, setter: setFeaturedInView },
      { ref: domainsRef, setter: setDomainsInView },
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

  const totalCerts = Object.values(certificationsData.domains).reduce((sum, d) => sum + d.certs.length, 0);

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

        @keyframes cardReveal {
          from {
            opacity: 0;
            transform: translateY(24px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes lineGrow {
          from { width: 0; }
          to { width: 200px; }
        }

        @keyframes expandDown {
          from {
            opacity: 0;
            transform: translateY(-12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 768px) {
          body {
            cursor: auto;
          }
        }
      `}</style>

      {/* Custom cursor */}
      <CustomCursor />

      {/* Scroll progress */}
      <ScrollProgress />

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
            position: "relative",
            opacity: headerInView ? 1 : 0,
            transform: headerInView ? "translateY(0)" : "translateY(40px)",
            transition: "opacity 0.8s ease, transform 0.8s ease",
          }}
        >
          {/* Background glow */}
          <div
            style={{
              position: "absolute",
              top: "30%",
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
              Professional Development
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
            Capability Infrastructure
          </h1>

          {/* Animated underline */}
          <div
            style={{
              width: "200px",
              height: "4px",
              background: `linear-gradient(90deg, ${C.accent}, ${C.purple}, ${C.green})`,
              borderRadius: "2px",
              marginBottom: "2.5rem",
              animation: headerInView ? "lineGrow 0.8s ease 0.2s both" : "none",
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
            Industry-recognized credentials validating technical expertise across web development,
            cloud infrastructure, and machine learning — all applied to production systems.
          </p>

          {/* Stat chips */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "1.5rem",
              maxWidth: "900px",
            }}
          >
            <StatChip value={totalCerts} label="Certifications" icon={Award} />
            <StatChip value={5} label="Technical Domains" icon={TrendingUp} />
            <StatChip value="5+" label="Projects" icon={CheckCircle2} />
          </div>
        </header>

        {/* ═══════ FEATURED SECTION ═══════ */}
        <section
          ref={featuredRef}
          style={{
            maxWidth: "1240px",
            margin: "0 auto",
            padding: "6rem 2rem",
            opacity: featuredInView ? 1 : 0,
            transform: featuredInView ? "translateY(0)" : "translateY(40px)",
            transition: "opacity 0.8s ease, transform 0.8s ease",
          }}
        >
          <div style={{ marginBottom: "3rem" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                marginBottom: "1rem",
              }}
            >
              <Award size={20} color={C.accent} />
              <span
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: C.muted,
                }}
              >
                Flagship Credentials
              </span>
            </div>
            <h2
              style={{
                fontFamily: "'Instrument Serif', serif",
                fontSize: "clamp(2rem, 4vw, 2.75rem)",
                fontWeight: 400,
                color: C.text,
                letterSpacing: "-0.02em",
                marginBottom: "0.75rem",
              }}
            >
              Most Relevant to Current Engineering Focus
            </h2>
            <p
              style={{
                fontSize: "1rem",
                color: C.muted2,
                lineHeight: 1.8,
                maxWidth: "680px",
              }}
            >
              These credentials directly power production systems serving thousands of users
            </p>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "2rem",
            }}
          >
            {certificationsData.featured.map((cert, i) => (
              <FlagshipCard key={cert.id} cert={cert} index={i} />
            ))}
          </div>
        </section>

        {/* ═══════ ALL DOMAINS ═══════ */}
        <section
          ref={domainsRef}
          style={{
            maxWidth: "1240px",
            margin: "0 auto",
            padding: "6rem 2rem",
            borderTop: `1px solid ${C.border}`,
            opacity: domainsInView ? 1 : 0,
            transform: domainsInView ? "translateY(0)" : "translateY(40px)",
            transition: "opacity 0.8s ease, transform 0.8s ease",
          }}
        >
          <div style={{ marginBottom: "3rem" }}>
            <div
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: "0.7rem",
                fontWeight: 700,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: C.muted,
                marginBottom: "1rem",
              }}
            >
              Complete Credential Archive
            </div>
            <h2
              style={{
                fontFamily: "'Instrument Serif', serif",
                fontSize: "clamp(2rem, 4vw, 2.75rem)",
                fontWeight: 400,
                color: C.text,
                letterSpacing: "-0.02em",
                marginBottom: "0.75rem",
              }}
            >
              All Certifications by Domain
            </h2>
            <p
              style={{
                fontSize: "1rem",
                color: C.muted2,
                lineHeight: 1.8,
              }}
            >
              Organized by technical domain and skill category
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {Object.entries(certificationsData.domains).map(([domain, data]) => (
              <DomainSection
                key={domain}
                domain={domain}
                data={data}
                isActive={activeDomain === domain}
                onClick={() => setActiveDomain(activeDomain === domain ? null : domain)}
              />
            ))}
          </div>
        </section>

        {/* ═══════ SUMMARY FOOTER ═══════ */}
        <section
          ref={summaryRef}
          style={{
            maxWidth: "1240px",
            margin: "0 auto",
            padding: "0 2rem 8rem",
            opacity: summaryInView ? 1 : 0,
            transform: summaryInView ? "translateY(0)" : "translateY(40px)",
            transition: "opacity 0.8s ease, transform 0.8s ease",
          }}
        >
          <div
            style={{
              textAlign: "center",
              padding: "4rem 3rem",
              background: `linear-gradient(135deg, ${C.accentDim} 0%, ${C.purpleDim} 100%)`,
              border: `2px solid transparent`,
              backgroundImage: `linear-gradient(135deg, ${C.accentDim} 0%, ${C.purpleDim} 100%), linear-gradient(90deg, ${C.accent}40, ${C.purple}40)`,
              backgroundOrigin: "border-box",
              backgroundClip: "padding-box, border-box",
              borderRadius: "24px",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Background glow */}
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "600px",
                height: "300px",
                background: `radial-gradient(circle, ${C.accent}15 0%, transparent 70%)`,
                filter: "blur(80px)",
                pointerEvents: "none",
              }}
            />

            <div style={{ position: "relative", zIndex: 1 }}>
              <div
                style={{
                  fontFamily: "'Instrument Serif', serif",
                  fontSize: "4rem",
                  fontWeight: 400,
                  color: C.text,
                  lineHeight: 1,
                  marginBottom: "1rem",
                  letterSpacing: "-0.03em",
                }}
              >
                <AnimatedCounter value={totalCerts} />
              </div>
              <div
                style={{
                  fontSize: "1.25rem",
                  fontWeight: 600,
                  color: C.text,
                  marginBottom: "0.75rem",
                }}
              >
                Total Certifications
              </div>
              <div
                style={{
                  fontSize: "1rem",
                  color: C.muted2,
                  lineHeight: 1.8,
                  maxWidth: "560px",
                  margin: "0 auto 2rem",
                }}
              >
                Validated expertise applied across production applications serving thousands of users
              </div>

              <a
                href="#projects"
                data-magnetic
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.875rem 1.75rem",
                  background: C.accent,
                  borderRadius: "12px",
                  fontSize: "0.9rem",
                  fontWeight: 600,
                  color: "#fff",
                  textDecoration: "none",
                  transition: "all 0.2s ease",
                  fontFamily: "'Geist', sans-serif",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 8px 28px rgba(79,127,255,0.4)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                Explore Projects
                <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}