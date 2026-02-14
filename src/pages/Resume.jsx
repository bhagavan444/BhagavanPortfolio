"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Download, Eye, X, MapPin, Mail, Github, Linkedin,
  ChevronRight, ArrowUpRight, Calendar, ExternalLink, Award, Briefcase
} from "lucide-react";

/* ═══════════════════════════════════════════════════════════════
   CONFIG
═══════════════════════════════════════════════════════════════ */
const RESUME_PREVIEW  = "https://drive.google.com/file/d/1-Ph6umgQ6P0YfBgQGLj-9UPMX2UDoKu3/preview";
const RESUME_DOWNLOAD = "https://drive.google.com/uc?export=download&id=1-Ph6umgQ6P0YfBgQGLj-9UPMX2UDoKu3";

/* ═══════════════════════════════════════════════════════════════
   DESIGN SYSTEM
═══════════════════════════════════════════════════════════════ */
const C = {
  bg:        "#ffffff",
  text:      "#0f0f0f",
  text2:     "#404040",
  text3:     "#737373",
  text4:     "#a3a3a3",
  accent:    "#0a0a0a",
  accentHover: "#262626",
  border:    "#fafafa",
  border2:   "#f0f0f0",
};

/* ═══════════════════════════════════════════════════════════════
   DATA - From Your Actual Resume
═══════════════════════════════════════════════════════════════ */
const metrics = [
  { value: "3", label: "Industry Internships" },
  { value: "4", label: "Production Projects" },
  { value: "10+", label: "Certifications" },
  { value: "MERN", label: "Full-Stack" },
];

const experiences = [
  {
    role:     "MERN Stack Intern",
    company:  "StudyOwl Education Pvt Ltd",
    period:   "May – July 2025",
    location: "Hybrid",
    
    owned: [
      "Designed and implemented reusable React components and backend APIs using Node.js and Express",
      "Handled frontend–backend integration flows using REST APIs and asynchronous requests",
      "Maintained code quality and collaboration using Git and GitHub in a team environment",
    ],
    
    tech: ["React.js", "Node.js", "Express.js", "REST APIs", "Git", "MongoDB"],
  },
  {
    role:     "AI/ML Intern – Smart Sorting",
    company:  "SmartBridge",
    period:   "May – June 2025",
    location: "Remote",
    
    owned: [
      "Built and trained CNN-based image classification models using TensorFlow and Keras",
      "Deployed trained models into Flask-based applications for real-time inference pipelines",
      "Optimized model architecture for production deployment and real-time performance",
    ],
    
    tech: ["TensorFlow", "Keras", "Flask", "Python", "CNN", "Computer Vision"],
  },
  {
    role:     "Machine Learning & Data Science Intern",
    company:  "Blackbucks",
    period:   "May – June 2024",
    location: "Remote",
    
    owned: [
      "Executed data preprocessing, feature engineering, and supervised model evaluation workflows using Python",
      "Implemented machine learning pipelines from data ingestion to model deployment",
      "Applied statistical techniques for data analysis and feature selection",
    ],
    
    tech: ["Python", "Scikit-learn", "Pandas", "NumPy", "Machine Learning"],
  },
];

const projects = [
  {
    name:     "ATS-Based Resume Builder Platform",
    status:   "Live",
    year:     "2025",
    desc:     "Full-stack MERN application with OAuth integration, PDF parsing logic, and keyword-based ATS compatibility scoring mechanism",
    tech:     ["React", "Node.js", "MongoDB", "OAuth", "PDF Parsing"],
    github:   "https://github.com/bhagavan444",
  },
  {
    name:     "AI Chatbot Web Application",
    status:   "Live",
    year:     "2025",
    desc:     "End-to-end chatbot with React frontend, Flask backend, and external AI API integration for real-time conversational responses",
    tech:     ["React", "Flask", "Gemini API", "OpenAI", "Python"],
    github:   "https://github.com/bhagavan444",
  },
  {
    name:     "Career Path Recommendation System",
    status:   "Deployed",
    year:     "2024",
    desc:     "ML pipeline with supervised learning for personalized career recommendations based on user skills and academic background",
    tech:     ["Python", "Scikit-learn", "Machine Learning", "Data Analysis"],
    github:   "https://github.com/bhagavan444",
  },
  {
    name:     "Fake News Detection System",
    status:   "GitHub",
    year:     "2023",
    desc:     "NLP-based classification system using TF-IDF vectorization to detect misinformation in news articles",
    tech:     ["Python", "NLP", "TF-IDF", "Scikit-learn"],
    github:   "https://github.com/bhagavan444",
  },
];

const certifications = [
  { name: "Google Generative AI (Gemini)", issuer: "Google", year: "2025" },
  { name: "IBM SkillsBuild – Artificial Intelligence Fundamentals", issuer: "IBM", year: "2025" },
  { name: "IBM SkillsBuild – Large Language Models", issuer: "IBM", year: "2025" },
  { name: "Machine Learning with Python", issuer: "Simplilearn", year: "2024" },
  { name: "AWS Basics", issuer: "Simplilearn", year: "2024" },
  { name: "Full Stack Development (Python, Java)", issuer: "Infosys Springboard", year: "2024" },
  { name: "Python Programming", issuer: "GeeksforGeeks", year: "2024" },
  { name: "Java Programming", issuer: "GeeksforGeeks", year: "2024" },
];

const education = {
  degree:   "B.Tech – Artificial Intelligence and Data Science",
  school:   "Ramachandra College of Engineering, Eluru (JNTUK)",
  period:   "2022 – 2026",
  score:    "75%",
  
  previous: [
    { level: "Intermediate (MPC)", institution: "Srividhya Junior College", period: "2020 – 2022", score: "78%" },
    { level: "Secondary School (Class X)", institution: "Montessori English Medium High School", period: "2019 – 2020", score: "95%" },
  ],
};

const skills = {
  programming: ["Python", "Java", "C"],
  webDev: ["HTML5", "CSS3", "JavaScript", "React.js", "Node.js", "Express.js"],
  databases: ["MongoDB", "SQL", "JDBC"],
  aiml: ["Supervised Learning", "Deep Learning", "CNNs", "NLP", "TensorFlow", "Keras", "Scikit-learn"],
  tools: ["Git", "GitHub", "VS Code", "Postman"],
  dataStructures: ["Arrays", "Strings", "Searching", "Sorting"],
  oop: ["Classes", "Inheritance", "Polymorphism", "Encapsulation"],
};

/* ═══════════════════════════════════════════════════════════════
   COMPONENTS
═══════════════════════════════════════════════════════════════ */
function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const ob = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) ob.observe(ref.current);
    return () => ob.disconnect();
  }, []);
  return [ref, inView];
}

const ScrollingTechStrip = () => (
  <div style={{
    position: 'absolute',
    top: '50%',
    left: 0,
    width: '100%',
    height: '100px',
    transform: 'translateY(-50%)',
    overflow: 'hidden',
    opacity: 0.02,
    pointerEvents: 'none',
    zIndex: 0
  }}>
    <div style={{
      display: 'flex',
      gap: '60px',
      animation: 'scrollTech 40s linear infinite',
      whiteSpace: 'nowrap',
      fontFamily: "'Playfair Display', serif",
      fontSize: '40px',
      fontWeight: 700,
      letterSpacing: '0.02em'
    }}>
      {['SOFTWARE', 'AI', 'SYSTEM DESIGN', 'MERN', 'MACHINE LEARNING', 'ARCHITECTURE',
        'SOFTWARE', 'AI', 'SYSTEM DESIGN', 'MERN', 'MACHINE LEARNING', 'ARCHITECTURE'].map((text, i) => (
        <span key={i}>{text}</span>
      ))}
    </div>
  </div>
);

/* ═══════════════════════════════════════════════════════════════
   MAIN PAGE
═══════════════════════════════════════════════════════════════ */
export default function Resume() {
  const [showModal, setShowModal] = useState(false);
  const [scrollPct, setScrollPct] = useState(0);

  useEffect(() => {
    const fn = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrollPct(max > 0 ? (window.scrollY / max) * 100 : 0);
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const [heroRef, heroIn] = useInView(0.2);
  const [metricsRef, metricsIn] = useInView(0.15);
  const [expRef, expIn] = useInView(0.1);
  const [projRef, projIn] = useInView(0.1);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,600;0,700;1,700&display=swap');

        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          background: ${C.bg};
          color: ${C.text};
          -webkit-font-smoothing: antialiased;
          overflow-x: hidden;
        }
        ::selection { background: #f5f5f5; }

        @keyframes scrollTech {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes slideRight {
          from { opacity: 0; transform: translateX(48px); }
          to { opacity: 1; transform: translateX(0); }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes scrollFooter {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        @keyframes float {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(20px, -20px); }
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        @keyframes shimmer {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }

        @keyframes particleFloat {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.3; }
          50% { transform: translate(30px, -30px) scale(1.2); opacity: 0.6; }
        }

        @keyframes lineFloat {
          0%, 100% { transform: translateY(0); opacity: 0.3; }
          50% { transform: translateY(-50px); opacity: 0.6; }
        }

        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        @media (max-width: 1024px) {
          .footer-hero-grid { grid-template-columns: 1fr !important; }
          .footer-main-grid { grid-template-columns: repeat(6, 1fr) !important; }
          .footer-col-full { grid-column: span 6 !important; }
          .footer-col { grid-column: span 3 !important; }
        }

        @media (max-width: 768px) {
          .metrics-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .hide-mobile { display: none !important; }
          .show-mobile { display: block !important; }
          .resume-grid { grid-template-columns: 1fr !important; }
          .footer-main-grid { grid-template-columns: 1fr !important; }
          .footer-col-full, .footer-col { grid-column: span 1 !important; }
          .footer-bottom { flex-direction: column; align-items: flex-start !important; }
          footer { margin-top: 80px !important; }
        }
      `}</style>

      {/* Scroll Progress */}
      <div style={{
        position: "fixed", top: 0, left: 0, right: 0, height: "2px",
        background: C.border2, zIndex: 9999,
      }}>
        <div style={{
          width: `${scrollPct}%`, height: "100%",
          background: 'linear-gradient(90deg, #0f0f0f, #404040)',
          transition: "width 0.1s linear",
        }} />
      </div>

      <div style={{ maxWidth: "920px", margin: "0 auto", padding: "0 32px" }}>

        {/* ══════ HERO ══════ */}
        <header ref={heroRef} style={{ 
          paddingTop: "120px", 
          paddingBottom: "96px",
          position: 'relative',
          overflow: 'hidden'
        }}>
          <ScrollingTechStrip />

          {/* Status Badge */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            marginBottom: "40px",
            opacity: heroIn ? 1 : 0,
            animation: heroIn ? "slideRight 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0s both" : "none",
            position: 'relative', zIndex: 1
          }}>
            <div style={{
              width: "6px", height: "6px", borderRadius: "50%",
              background: C.accent,
            }} />
            <span style={{
              fontSize: "13px", letterSpacing: "0.02em",
              color: C.text3, fontWeight: 500,
            }}>
              Available for 2026 Graduate Roles
            </span>
          </div>

          {/* Headline */}
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(48px, 7vw, 72px)",
            fontWeight: 700,
            fontStyle: 'italic',
            color: C.text,
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
            marginBottom: "24px",
            opacity: heroIn ? 1 : 0,
            animation: heroIn ? "slideRight 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both" : "none",
            position: 'relative', zIndex: 1
          }}>
            Software & AI<br />Engineer
          </h1>

          {/* Positioning */}
          <p style={{
            fontSize: "19px", color: C.text2, fontWeight: 500,
            lineHeight: 1.6, marginBottom: "40px", maxWidth: "620px",
            opacity: heroIn ? 1 : 0,
            animation: heroIn ? "slideRight 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.2s both" : "none",
            position: 'relative', zIndex: 1
          }}>
            Entry-level Software/AI Engineer with hands-on experience in Python, Java, and full-stack web development. 
            Proven ability to take ownership of features across web and machine learning projects through internships and academic work.
          </p>

          {/* Contact Info */}
          <div style={{
            display: "flex", flexDirection: "column", gap: "12px",
            marginBottom: "48px",
            opacity: heroIn ? 1 : 0,
            animation: heroIn ? "slideRight 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.3s both" : "none",
            position: 'relative', zIndex: 1
          }}>
            {[
              { icon: MapPin, text: "Eluru, Andhra Pradesh", href: null },
              { icon: Mail, text: "g.sivasatyasaibhagavan@gmail.com", href: "mailto:g.sivasatyasaibhagavan@gmail.com" },
              { icon: Github, text: "github.com/bhagavan444", href: "https://github.com/bhagavan444" },
              { icon: Linkedin, text: "linkedin.com/in/bhagavan", href: "https://www.linkedin.com/in/gopalajosyula-siva-satya-sai-bhagavan-1624a027b/" },
            ].map((item, i) => {
              const Tag = item.href ? "a" : "div";
              return (
                <Tag
                  key={i}
                  href={item.href || undefined}
                  target={item.href?.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex", alignItems: "center", gap: "10px",
                    fontSize: "14px", color: C.text3, textDecoration: "none",
                    transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                    width: "fit-content",
                  }}
                  onMouseEnter={item.href ? e => {
                    e.currentTarget.style.color = C.text;
                    e.currentTarget.style.transform = 'translateX(4px)';
                  } : undefined}
                  onMouseLeave={item.href ? e => {
                    e.currentTarget.style.color = C.text3;
                    e.currentTarget.style.transform = 'translateX(0)';
                  } : undefined}
                >
                  <item.icon size={15} strokeWidth={1.5} /> {item.text}
                </Tag>
              );
            })}
          </div>

          {/* CTAs */}
          <div style={{
            display: "flex", gap: "12px", flexWrap: "wrap",
            opacity: heroIn ? 1 : 0,
            animation: heroIn ? "slideRight 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.4s both" : "none",
            position: 'relative', zIndex: 1
          }}>
            <a
              href={RESUME_DOWNLOAD}
              style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                padding: "14px 28px", borderRadius: "8px",
                background: C.accent, color: "#fff",
                fontSize: "15px", fontWeight: 600,
                textDecoration: "none", border: "none",
                transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                position: 'relative', overflow: 'hidden'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <Download size={16} strokeWidth={2} /> Download Resume
            </a>
            <button
              onClick={() => setShowModal(true)}
              style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                padding: "14px 28px", borderRadius: "8px",
                background: "transparent", color: C.text2,
                border: `1px solid ${C.border2}`,
                fontSize: "15px", fontWeight: 500, cursor: "pointer",
                transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.color = C.text;
                e.currentTarget.style.borderColor = C.text3;
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color = C.text2;
                e.currentTarget.style.borderColor = C.border2;
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <Eye size={16} strokeWidth={2} /> Preview
            </button>
          </div>
        </header>

        {/* ══════ RESUME PREVIEW - ENHANCED ══════ */}
        <section style={{ paddingBottom: "96px" }}>
          <div className="resume-grid" style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '48px',
            alignItems: 'start',
            position: 'relative'
          }}>
            {/* Left Column - Resume Info */}
            <div style={{
              opacity: heroIn ? 1 : 0,
              animation: heroIn ? "slideRight 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.5s both" : "none",
            }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                background: C.border,
                borderRadius: '6px',
                marginBottom: '24px'
              }}>
                <Briefcase size={16} strokeWidth={1.5} style={{ color: C.text3 }} />
                <span style={{
                  fontSize: '13px',
                  fontWeight: 600,
                  color: C.text2,
                  letterSpacing: '0.02em'
                }}>
                  Resume Document
                </span>
              </div>

              <h3 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '32px',
                fontWeight: 700,
                fontStyle: 'italic',
                color: C.text,
                letterSpacing: '-0.02em',
                lineHeight: 1.2,
                marginBottom: '16px'
              }}>
                One-page technical resume
              </h3>

              <p style={{
                fontSize: '16px',
                color: C.text2,
                lineHeight: 1.6,
                marginBottom: '32px',
                maxWidth: '460px'
              }}>
                Structured for ATS compatibility with clear sections: objective, education, internships, 
                projects, skills, and certifications. Ready for technical recruiting systems.
              </p>

              {/* Key Highlights */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                marginBottom: '32px'
              }}>
                {[
                  { label: 'Format', value: 'PDF • ATS-Optimized' },
                  { label: 'Sections', value: '8 Key Areas' },
                  { label: 'Experience', value: '3 Technical Internships' },
                  { label: 'Projects', value: '4 Production Systems' }
                ].map((item, i) => (
                  <div 
                    key={i}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '12px 0',
                      borderBottom: i < 3 ? `1px solid ${C.border}` : 'none'
                    }}
                  >
                    <span style={{
                      fontSize: '14px',
                      fontWeight: 500,
                      color: C.text3
                    }}>
                      {item.label}
                    </span>
                    <span style={{
                      fontSize: '14px',
                      fontWeight: 600,
                      color: C.text
                    }}>
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div style={{
                display: 'flex',
                gap: '12px',
                flexWrap: 'wrap'
              }}>
                <a
                  href={RESUME_DOWNLOAD}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '12px 24px',
                    borderRadius: '8px',
                    background: C.accent,
                    color: '#fff',
                    fontSize: '14px',
                    fontWeight: 600,
                    textDecoration: 'none',
                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <Download size={16} strokeWidth={2} />
                  Download PDF
                </a>
                <button
                  onClick={() => setShowModal(true)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '12px 24px',
                    borderRadius: '8px',
                    background: 'transparent',
                    color: C.text2,
                    border: `1px solid ${C.border2}`,
                    fontSize: '14px',
                    fontWeight: 500,
                    cursor: 'pointer',
                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.color = C.text;
                    e.currentTarget.style.borderColor = C.text3;
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.color = C.text2;
                    e.currentTarget.style.borderColor = C.border2;
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <Eye size={16} strokeWidth={2} />
                  View Fullscreen
                </button>
              </div>
            </div>

            {/* Right Column - Resume Preview */}
            <div style={{
              opacity: heroIn ? 1 : 0,
              animation: heroIn ? "slideRight 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.6s both" : "none",
              position: 'sticky',
              top: '80px'
            }}>
              <div style={{
                borderRadius: '12px',
                overflow: 'hidden',
                border: `1px solid ${C.border2}`,
                boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
                transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                cursor: 'pointer'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 12px 48px rgba(0,0,0,0.12)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.08)';
              }}
              onClick={() => setShowModal(true)}
              >
                <div style={{
                  padding: '16px 20px',
                  background: C.bg,
                  borderBottom: `1px solid ${C.border}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <div style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      background: C.accent
                    }} />
                    <span style={{
                      fontSize: '13px',
                      fontWeight: 600,
                      color: C.text2
                    }}>
                      G_S_S_S_Bhagavan_Resume.pdf
                    </span>
                  </div>
                  <span style={{
                    fontSize: '12px',
                    color: C.text4
                  }}>
                    1 page
                  </span>
                </div>
                <div style={{
                  height: '600px',
                  background: C.bg,
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  <iframe
                    src={RESUME_PREVIEW}
                    style={{ 
                      width: '100%', 
                      height: '100%', 
                      border: 'none',
                      pointerEvents: 'none'
                    }}
                    title="Resume Preview"
                  />
                  {/* Hover Overlay */}
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'rgba(0,0,0,0)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.3s ease',
                    pointerEvents: 'none'
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'rgba(0,0,0,0.5)';
                  }}>
                    <div style={{
                      padding: '12px 24px',
                      background: '#fff',
                      borderRadius: '8px',
                      fontSize: '14px',
                      fontWeight: 600,
                      color: C.text,
                      opacity: 0,
                      transform: 'scale(0.95)',
                      transition: 'all 0.3s ease'
                    }}>
                      Click to expand
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Resume Preview */}
          <div style={{
            display: 'none'
          }}
          className="show-mobile">
            <div style={{
              marginTop: '48px',
              borderRadius: '12px',
              overflow: 'hidden',
              border: `1px solid ${C.border2}`,
            }}>
              <div style={{
                padding: '16px 20px',
                background: C.bg,
                borderBottom: `1px solid ${C.border}`,
              }}>
                <span style={{
                  fontSize: '13px',
                  fontWeight: 600,
                  color: C.text2
                }}>
                  Resume Preview
                </span>
              </div>
              <div style={{
                height: '500px',
                background: C.bg,
              }}>
                <iframe
                  src={RESUME_PREVIEW}
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    border: 'none',
                  }}
                  title="Resume Preview Mobile"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ══════ METRICS ══════ */}
        <section ref={metricsRef} style={{ paddingBottom: "96px" }}>
          <div className="metrics-grid" style={{
            display: "grid", gridTemplateColumns: "repeat(4, 1fr)",
            gap: "1px", background: C.border2,
            border: `1px solid ${C.border2}`,
            borderRadius: "8px", overflow: "hidden"
          }}>
            {metrics.map((metric, i) => (
              <div
                key={i}
                style={{
                  padding: "40px 24px",
                  background: C.bg,
                  textAlign: "center",
                  opacity: metricsIn ? 1 : 0,
                  animation: metricsIn ? `slideRight 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.08}s both` : "none",
                  transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                  cursor: 'pointer'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.background = C.border;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.background = C.bg;
                }}
              >
                <div style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "48px", fontWeight: 700,
                  color: C.text, letterSpacing: "-0.02em",
                  marginBottom: "8px", lineHeight: 1,
                }}>
                  {metric.value}
                </div>
                <div style={{
                  fontSize: "14px", color: C.text3,
                  lineHeight: 1.5, fontWeight: 500,
                }}>
                  {metric.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ══════ EXPERIENCE ══════ */}
        <section ref={expRef} style={{ paddingBottom: "96px" }}>
          <div style={{ marginBottom: "56px" }}>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "42px", fontWeight: 700, fontStyle: 'italic',
              color: C.text, letterSpacing: "-0.02em",
              lineHeight: 1.2, marginBottom: "16px",
            }}>
              Internships
            </h2>
            <p style={{
              fontSize: "17px", color: C.text3,
              lineHeight: 1.6, maxWidth: "600px",
            }}>
              Three technical internships spanning MERN stack development, AI/ML engineering, and data science
            </p>
          </div>
          
          <div style={{ 
            display: "flex", 
            flexDirection: "column", 
            gap: "64px",
            position: 'relative'
          }}>
            {/* Timeline line */}
            <div className="hide-mobile" style={{
              position: 'absolute',
              left: '0',
              top: '0',
              width: '2px',
              height: '100%',
              background: C.border2,
              zIndex: 0
            }}>
              <div style={{
                width: '100%',
                height: `${expIn ? '100' : '0'}%`,
                background: 'linear-gradient(180deg, #0f0f0f, #737373)',
                transition: 'height 1.5s cubic-bezier(0.16, 1, 0.3, 1)'
              }} />
            </div>

            {experiences.map((exp, i) => (
              <div
                key={i}
                style={{
                  opacity: expIn ? 1 : 0,
                  animation: expIn ? `slideRight 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.15}s both` : "none",
                  position: 'relative',
                  paddingLeft: '32px',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateX(4px)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateX(0)';
                }}
              >
                {/* Timeline dot */}
                <div className="hide-mobile" style={{
                  position: 'absolute',
                  left: '-5px',
                  top: '8px',
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  background: C.accent,
                  border: `3px solid ${C.bg}`,
                  zIndex: 1,
                  transition: 'all 0.3s ease'
                }} />

                {/* Header */}
                <div style={{
                  display: "flex", justifyContent: "space-between",
                  alignItems: "baseline", gap: "24px",
                  marginBottom: "24px", flexWrap: "wrap",
                }}>
                  <div>
                    <div style={{
                      fontSize: "24px", fontWeight: 700,
                      color: C.text, letterSpacing: "-0.01em",
                      marginBottom: "6px",
                    }}>
                      {exp.role}
                    </div>
                    <div style={{
                      fontSize: "17px", fontWeight: 600,
                      color: C.text2,
                    }}>
                      {exp.company}
                    </div>
                  </div>
                  <div style={{
                    display: "flex", flexDirection: "column",
                    gap: "4px", alignItems: "flex-end",
                  }}>
                    <div style={{
                      fontSize: "13px", color: C.text3,
                      display: "flex", alignItems: "center", gap: "6px",
                    }}>
                      <Calendar size={13} strokeWidth={1.5} /> {exp.period}
                    </div>
                    <div style={{
                      fontSize: "13px", color: C.text4,
                    }}>
                      {exp.location}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div style={{ marginBottom: "24px" }}>
                  <ul style={{ 
                    listStyle: "none", 
                    display: "flex", 
                    flexDirection: "column", 
                    gap: "10px" 
                  }}>
                    {exp.owned.map((item, idx) => (
                      <li key={idx} style={{ 
                        display: "flex", 
                        gap: "12px", 
                        alignItems: "flex-start" 
                      }}>
                        <ChevronRight 
                          size={14} 
                          strokeWidth={2} 
                          style={{ 
                            color: C.text3, 
                            flexShrink: 0, 
                            marginTop: "4px" 
                          }} 
                        />
                        <span style={{ 
                          fontSize: "15px", 
                          color: C.text2, 
                          lineHeight: 1.6 
                        }}>
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech Stack */}
                <div style={{ 
                  display: "flex", 
                  flexWrap: "wrap", 
                  gap: "8px" 
                }}>
                  {exp.tech.map((tech, idx) => (
                    <span
                      key={idx}
                      style={{
                        padding: "6px 12px",
                        background: C.border,
                        fontSize: "13px",
                        fontWeight: 500,
                        color: C.text3,
                        borderRadius: "4px",
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.background = C.border2;
                        e.currentTarget.style.color = C.text;
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.background = C.border;
                        e.currentTarget.style.color = C.text3;
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ══════ PROJECTS ══════ */}
        <section ref={projRef} style={{ paddingBottom: "96px" }}>
          <div style={{ marginBottom: "56px" }}>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "42px", fontWeight: 700, fontStyle: 'italic',
              color: C.text, letterSpacing: "-0.02em",
              lineHeight: 1.2, marginBottom: "16px",
            }}>
              Projects
            </h2>
            <p style={{
              fontSize: "17px", color: C.text3,
              lineHeight: 1.6, maxWidth: "600px",
            }}>
              Production systems with measurable outcomes and architectural depth
            </p>
          </div>

          <div style={{ 
            display: "grid", 
            gap: "24px",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 400px), 1fr))"
          }}>
            {projects.map((proj, i) => (
              <div
                key={i}
                style={{
                  padding: "32px",
                  background: C.bg,
                  border: `1px solid ${C.border2}`,
                  borderRadius: "8px",
                  opacity: projIn ? 1 : 0,
                  animation: projIn ? `slideRight 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.1}s both` : "none",
                  transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                  cursor: 'pointer'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.06)";
                  e.currentTarget.style.borderColor = C.text4;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.borderColor = C.border2;
                }}
              >
                {/* Header */}
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  gap: "12px",
                  marginBottom: "20px",
                }}>
                  <div style={{ flex: 1 }}>
                    <div style={{
                      fontSize: "20px",
                      fontWeight: 700,
                      color: C.text,
                      letterSpacing: "-0.01em",
                      marginBottom: "4px"
                    }}>
                      {proj.name}
                    </div>
                    <div style={{
                      fontSize: "13px",
                      color: C.text4,
                    }}>
                      {proj.year}
                    </div>
                  </div>
                  <span style={{
                    padding: "4px 10px",
                    background: C.border,
                    fontSize: "12px",
                    fontWeight: 600,
                    color: C.text3,
                    borderRadius: "4px",
                    flexShrink: 0
                  }}>
                    {proj.status}
                  </span>
                </div>

                {/* Description */}
                <p style={{
                  fontSize: "15px",
                  color: C.text2,
                  lineHeight: 1.6,
                  marginBottom: "24px",
                }}>
                  {proj.desc}
                </p>

                {/* Tech */}
                <div style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "8px",
                  marginBottom: "20px"
                }}>
                  {proj.tech.map((tech, idx) => (
                    <span
                      key={idx}
                      style={{
                        padding: "4px 10px",
                        background: C.border,
                        fontSize: "12px",
                        fontWeight: 500,
                        color: C.text3,
                        borderRadius: "4px",
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* GitHub Link */}
                <a
                  href={proj.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    fontSize: "14px",
                    color: C.text3,
                    textDecoration: "none",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.color = C.text;
                    e.currentTarget.style.transform = 'translateX(4px)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.color = C.text3;
                    e.currentTarget.style.transform = 'translateX(0)';
                  }}
                  onClick={e => e.stopPropagation()}
                >
                  View on GitHub <ArrowUpRight size={14} strokeWidth={2} />
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* ══════ EDUCATION & CERTIFICATIONS ══════ */}
        <section style={{ paddingBottom: "96px" }}>
          <div style={{ marginBottom: "56px" }}>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "42px", fontWeight: 700, fontStyle: 'italic',
              color: C.text, letterSpacing: "-0.02em",
              lineHeight: 1.2, marginBottom: "16px",
            }}>
              Education & Certifications
            </h2>
          </div>

          {/* Education */}
          <div style={{
            marginBottom: "48px",
            padding: "32px",
            background: C.border,
            borderRadius: "8px",
          }}>
            <div style={{
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: C.text4,
              marginBottom: "24px",
            }}>
              Education
            </div>
            
            <div style={{ marginBottom: "32px" }}>
              <div style={{
                fontSize: "20px",
                fontWeight: 700,
                color: C.text,
                marginBottom: "8px",
              }}>
                {education.degree}
              </div>
              <div style={{
                fontSize: "16px",
                color: C.text2,
                marginBottom: "8px",
              }}>
                {education.school}
              </div>
              <div style={{
                display: "flex",
                gap: "16px",
                fontSize: "14px",
                color: C.text3,
              }}>
                <span>{education.period}</span>
                <span>·</span>
                <span style={{ fontWeight: 600 }}>{education.score}</span>
              </div>
            </div>

            <div style={{
              paddingTop: "24px",
              borderTop: `1px solid ${C.border2}`,
              display: "flex",
              flexDirection: "column",
              gap: "16px",
            }}>
              {education.previous.map((edu, i) => (
                <div key={i}>
                  <div style={{
                    fontSize: "16px",
                    fontWeight: 600,
                    color: C.text2,
                    marginBottom: "4px",
                  }}>
                    {edu.level}
                  </div>
                  <div style={{
                    fontSize: "14px",
                    color: C.text3,
                    marginBottom: "4px",
                  }}>
                    {edu.institution}
                  </div>
                  <div style={{
                    display: "flex",
                    gap: "12px",
                    fontSize: "13px",
                    color: C.text4,
                  }}>
                    <span>{edu.period}</span>
                    <span>·</span>
                    <span style={{ fontWeight: 600, color: C.text3 }}>{edu.score}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 380px), 1fr))",
            gap: "1px",
            background: C.border2,
            border: `1px solid ${C.border2}`,
            borderRadius: "8px",
            overflow: "hidden",
            marginBottom: "48px"
          }}>
            {certifications.map((cert, i) => (
              <div
                key={i}
                style={{
                  padding: "20px 24px",
                  background: C.bg,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  gap: "16px",
                  transition: 'all 0.2s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = C.border;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = C.bg;
                }}
              >
                <div style={{ flex: 1 }}>
                  <div style={{
                    fontSize: "15px",
                    fontWeight: 600,
                    color: C.text,
                    marginBottom: "4px",
                  }}>
                    {cert.name}
                  </div>
                  <div style={{
                    fontSize: "13px",
                    color: C.text3,
                  }}>
                    {cert.issuer}
                  </div>
                </div>
                <div style={{
                  fontSize: "13px",
                  color: C.text4,
                  flexShrink: 0,
                }}>
                  {cert.year}
                </div>
              </div>
            ))}
          </div>

          {/* Skills */}
          <div style={{
            padding: "32px",
            background: C.border,
            borderRadius: "8px",
          }}>
            <div style={{
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: C.text4,
              marginBottom: "24px",
            }}>
              Technical Skills
            </div>
            
            <div style={{ 
              display: "flex", 
              flexDirection: "column", 
              gap: "16px" 
            }}>
              {[
                { label: "Programming", values: skills.programming },
                { label: "Web Development", values: skills.webDev },
                { label: "Databases", values: skills.databases },
                { label: "AI/ML", values: skills.aiml },
                { label: "Tools", values: skills.tools },
              ].map((category, i) => (
                <div key={i}>
                  <span style={{ 
                    fontSize: "14px", 
                    fontWeight: 600, 
                    color: C.text2, 
                    marginRight: "8px" 
                  }}>
                    {category.label}:
                  </span>
                  <span style={{ 
                    fontSize: "14px", 
                    color: C.text3 
                  }}>
                    {category.values.join(", ")}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════ CTA ══════ */}
        <section style={{ paddingBottom: "96px" }}>
          <div style={{
            padding: "64px 48px",
            background: 'linear-gradient(135deg, #fafafa 0%, #f5f5f5 100%)',
            borderRadius: "12px",
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{
              maxWidth: "520px",
              position: 'relative',
              zIndex: 1
            }}>
              <div style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "36px",
                fontWeight: 700,
                fontStyle: 'italic',
                color: C.text,
                letterSpacing: "-0.02em",
                marginBottom: "16px",
                lineHeight: 1.2,
              }}>
                Let's build together
              </div>

              <p style={{
                fontSize: "17px",
                color: C.text2,
                lineHeight: 1.6,
                marginBottom: "32px",
              }}>
                Seeking junior engineering roles in software development, AI/ML, or full-stack positions. 
                Ready to contribute to real-world systems.
              </p>

              <div style={{
                display: "flex",
                gap: "12px",
                flexWrap: "wrap",
              }}>
                <a
                  href={RESUME_DOWNLOAD}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "14px 28px",
                    borderRadius: "8px",
                    background: C.accent,
                    color: "#fff",
                    fontSize: "15px",
                    fontWeight: 600,
                    textDecoration: "none",
                    transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow = "0 6px 16px rgba(0,0,0,0.15)";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <Download size={16} strokeWidth={2} /> Download Resume
                </a>
                <a
                  href="mailto:g.sivasatyasaibhagavan@gmail.com"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "14px 28px",
                    borderRadius: "8px",
                    background: C.bg,
                    color: C.text2,
                    border: `1px solid ${C.border2}`,
                    fontSize: "15px",
                    fontWeight: 500,
                    textDecoration: "none",
                    transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.color = C.text;
                    e.currentTarget.style.borderColor = C.text3;
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.color = C.text2;
                    e.currentTarget.style.borderColor = C.border2;
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <Mail size={16} strokeWidth={2} /> Get in Touch
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* ══════ SCHEDULE CALL SECTION ══════ */}
      <section style={{
          padding: '120px 32px',
          background: 'linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Animated background grid */}
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(0,0,0,0.03) 1px, transparent 0)',
            backgroundSize: '40px 40px',
            opacity: 0.5,
            pointerEvents: 'none'
          }} />

          <div style={{
            maxWidth: '1000px',
            margin: '0 auto',
            position: 'relative',
            zIndex: 1
          }}>
            <div style={{
              textAlign: 'center',
              marginBottom: '64px'
            }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 20px',
                background: '#fff',
                border: `1px solid ${C.border2}`,
                borderRadius: '100px',
                fontSize: '13px',
                fontWeight: 600,
                color: C.text3,
                marginBottom: '32px'
              }}>
                <Calendar size={14} strokeWidth={2} />
                Open for Opportunities
              </div>

              <h2 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(36px, 5vw, 56px)',
                fontWeight: 700,
                fontStyle: 'italic',
                color: C.text,
                letterSpacing: '-0.02em',
                lineHeight: 1.1,
                marginBottom: '24px'
              }}>
                Let's discuss how I can<br />contribute to your team
              </h2>

              <p style={{
                fontSize: '19px',
                color: C.text2,
                lineHeight: 1.6,
                maxWidth: '640px',
                margin: '0 auto 48px'
              }}>
                Available for technical interviews, portfolio reviews, or casual conversations about 
                full-stack development and AI/ML projects.
              </p>

              <div style={{
                display: 'flex',
                gap: '16px',
                justifyContent: 'center',
                flexWrap: 'wrap'
              }}>
                <a
                  href="mailto:g.sivasatyasaibhagavan@gmail.com?subject=Schedule%20a%20Call&body=Hi%20Bhagavan,%0A%0AI'd%20like%20to%20schedule%20a%20call%20to%20discuss..."
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '16px 32px',
                    background: C.accent,
                    color: '#fff',
                    borderRadius: '10px',
                    fontSize: '16px',
                    fontWeight: 600,
                    textDecoration: 'none',
                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.1)'
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'translateY(-3px)';
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.15)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.1)';
                  }}
                >
                  <Mail size={18} strokeWidth={2} />
                  Schedule a Call
                </a>

                <a
                  href={RESUME_DOWNLOAD}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '16px 32px',
                    background: '#fff',
                    color: C.text,
                    border: `2px solid ${C.border2}`,
                    borderRadius: '10px',
                    fontSize: '16px',
                    fontWeight: 600,
                    textDecoration: 'none',
                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'translateY(-3px)';
                    e.currentTarget.style.borderColor = C.text3;
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.08)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.borderColor = C.border2;
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <Download size={18} strokeWidth={2} />
                  Download Resume
                </a>
              </div>
            </div>

            {/* Response Time Info */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '24px',
              padding: '48px',
              background: '#fff',
              border: `1px solid ${C.border2}`,
              borderRadius: '16px',
              boxShadow: '0 4px 24px rgba(0,0,0,0.04)'
            }}>
              {[
                { icon: Mail, label: 'Email Response', value: '< 24 hours' },
                { icon: Calendar, label: 'Call Availability', value: 'Flexible schedule' },
                { icon: MapPin, label: 'Time Zone', value: 'IST (UTC+5:30)' }
              ].map((item, i) => (
                <div key={i} style={{
                  textAlign: 'center',
                  padding: '20px'
                }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    margin: '0 auto 16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: C.border,
                    borderRadius: '12px'
                  }}>
                    <item.icon size={24} strokeWidth={1.5} style={{ color: C.text2 }} />
                  </div>
                  <div style={{
                    fontSize: '14px',
                    fontWeight: 600,
                    color: C.text,
                    marginBottom: '6px'
                  }}>
                    {item.label}
                  </div>
                  <div style={{
                    fontSize: '13px',
                    color: C.text3
                  }}>
                    {item.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════ NEXT-LEVEL BIG FOOTER WITH CURVES ══════ */}
        <footer style={{
          background: '#000',
          color: '#fff',
          position: 'relative',
          overflow: 'hidden',
          marginLeft: '-100vw',
          marginRight: '-100vw',
          paddingLeft: '100vw',
          paddingRight: '100vw'
        }}>
          {/* Curved Wave Top */}
          <div style={{
            position: 'absolute',
            top: '-1px',
            left: 0,
            width: '100%',
            overflow: 'hidden',
            lineHeight: 0,
            transform: 'rotate(180deg)'
          }}>
            <svg
              style={{
                position: 'relative',
                display: 'block',
                width: 'calc(100% + 1.3px)',
                height: '120px'
              }}
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
            >
              <path
                d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
                style={{ fill: '#fafafa' }}
              />
            </svg>
          </div>

          {/* Animated mesh gradient background */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(circle at 20% 50%, rgba(99, 102, 241, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(168, 85, 247, 0.15) 0%, transparent 50%), radial-gradient(circle at 50% 20%, rgba(236, 72, 153, 0.1) 0%, transparent 50%)',
            opacity: 0.8,
            pointerEvents: 'none'
          }} />

          {/* Floating particles */}
          <div style={{
            position: 'absolute',
            inset: 0,
            opacity: 0.04,
            pointerEvents: 'none'
          }}>
            {[...Array(25)].map((_, i) => (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: `${2 + Math.random() * 6}px`,
                  height: `${2 + Math.random() * 6}px`,
                  background: '#fff',
                  borderRadius: '50%',
                  animation: `particleFloat ${10 + Math.random() * 10}s ease-in-out infinite`,
                  animationDelay: `${Math.random() * 5}s`
                }}
              />
            ))}
          </div>

          {/* Animated lines */}
          <div style={{
            position: 'absolute',
            inset: 0,
            opacity: 0.02,
            pointerEvents: 'none'
          }}>
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  left: `${i * 25}%`,
                  top: 0,
                  width: '1px',
                  height: '100%',
                  background: 'linear-gradient(180deg, transparent, #fff, transparent)',
                  animation: `lineFloat ${8 + i * 2}s ease-in-out infinite`,
                  animationDelay: `${i * 0.5}s`
                }}
              />
            ))}
          </div>

          {/* Scrolling tech text - top */}
          <div style={{
            borderBottom: '1px solid rgba(255,255,255,0.08)',
            padding: '40px 0',
            overflow: 'hidden',
            marginTop: '80px'
          }}>
            <div style={{
              display: 'flex',
              gap: '80px',
              animation: 'scrollFooter 40s linear infinite',
              whiteSpace: 'nowrap',
              fontSize: '14px',
              fontWeight: 700,
              letterSpacing: '0.15em',
              color: 'rgba(255,255,255,0.25)',
              textTransform: 'uppercase'
            }}>
              {['REACT.JS', 'NODE.JS', 'PYTHON', 'TENSORFLOW', 'MONGODB', 'EXPRESS', 'KERAS', 'FLASK', 'AWS', 'MACHINE LEARNING',
                'REACT.JS', 'NODE.JS', 'PYTHON', 'TENSORFLOW', 'MONGODB', 'EXPRESS', 'KERAS', 'FLASK', 'AWS', 'MACHINE LEARNING'].map((text, i) => (
                <span key={i} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <span style={{ 
                    width: '6px', 
                    height: '6px', 
                    background: 'rgba(255,255,255,0.25)', 
                    borderRadius: '50%' 
                  }} />
                  {text}
                </span>
              ))}
            </div>
          </div>

          {/* Main footer content */}
          <div style={{
            maxWidth: '1400px',
            margin: '0 auto',
            padding: '100px 48px 60px',
            position: 'relative',
            zIndex: 1
          }}>
            {/* Top section - Brand + CTA */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1.5fr 1fr',
              gap: '80px',
              marginBottom: '100px',
              alignItems: 'center'
            }}
            className="footer-hero-grid">
              <div>
                <div style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 'clamp(42px, 6vw, 72px)',
                  fontWeight: 700,
                  fontStyle: 'italic',
                  lineHeight: 1.1,
                  letterSpacing: '-0.02em',
                  marginBottom: '32px',
                  background: 'linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.5) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}>
                  Ready to build<br />something great?
                </div>
                <p style={{
                  fontSize: '19px',
                  lineHeight: 1.7,
                  color: 'rgba(255,255,255,0.65)',
                  maxWidth: '540px',
                  marginBottom: '40px'
                }}>
                  Full-stack engineer with expertise in MERN stack and AI/ML. 
                  Let's create intelligent, scalable applications that make a difference.
                </p>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '12px 24px',
                  background: 'rgba(74, 222, 128, 0.12)',
                  border: '1px solid rgba(74, 222, 128, 0.25)',
                  borderRadius: '100px',
                  fontSize: '14px',
                  fontWeight: 600,
                  color: '#4ade80'
                }}>
                  <div style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: '#4ade80',
                    animation: 'pulse 2s ease-in-out infinite',
                    boxShadow: '0 0 12px rgba(74, 222, 128, 0.6)'
                  }} />
                  Available for Full-Time Roles • Starting 2026
                </div>
              </div>

              {/* CTA Card - Enhanced */}
              <div style={{
                padding: '48px',
                background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.04) 100%)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: '24px',
                transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.3)'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.06) 100%)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.boxShadow = '0 16px 48px rgba(0,0,0,0.4)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.04) 100%)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.3)';
              }}>
                <div style={{
                  fontSize: '24px',
                  fontWeight: 700,
                  marginBottom: '12px',
                  letterSpacing: '-0.01em'
                }}>
                  Get My Resume
                </div>
                <p style={{
                  fontSize: '15px',
                  color: 'rgba(255,255,255,0.6)',
                  marginBottom: '32px',
                  lineHeight: 1.7
                }}>
                  ATS-optimized PDF with complete technical experience, 
                  projects, certifications, and contact information
                </p>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px'
                }}>
                  <a
                    href={RESUME_DOWNLOAD}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '10px',
                      padding: '16px 32px',
                      background: '#fff',
                      color: '#000',
                      borderRadius: '12px',
                      fontSize: '15px',
                      fontWeight: 600,
                      textDecoration: 'none',
                      transition: 'all 0.3s ease',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.transform = 'translateX(4px)';
                      e.currentTarget.style.boxShadow = '0 8px 24px rgba(255,255,255,0.25)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.transform = 'translateX(0)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <Download size={18} strokeWidth={2} />
                    Download Resume
                    <ArrowUpRight size={16} strokeWidth={2.5} />
                  </a>
                  <button
                    onClick={() => setShowModal(true)}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '10px',
                      padding: '14px 32px',
                      background: 'rgba(255,255,255,0.08)',
                      color: '#fff',
                      border: '1px solid rgba(255,255,255,0.2)',
                      borderRadius: '12px',
                      fontSize: '14px',
                      fontWeight: 500,
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.12)';
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
                    }}
                  >
                    <Eye size={16} strokeWidth={2} />
                    Preview Resume
                  </button>
                </div>
              </div>
            </div>

            {/* Main grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(12, 1fr)',
              gap: '56px',
              marginBottom: '100px'
            }}
            className="footer-main-grid">
              {/* About - spans 5 columns */}
              <div style={{ gridColumn: 'span 5' }} className="footer-col-full">
                <h4 style={{
                  fontSize: '13px',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.35)',
                  marginBottom: '28px'
                }}>
                  About Me
                </h4>
                <p style={{
                  fontSize: '16px',
                  lineHeight: 1.8,
                  color: 'rgba(255,255,255,0.65)',
                  marginBottom: '40px'
                }}>
                  B.Tech student specializing in Artificial Intelligence and Data Science at 
                  Ramachandra College of Engineering. Experienced through technical internships 
                  at StudyOwl, SmartBridge, and Blackbucks. Built production systems using 
                  MERN stack, TensorFlow, and Flask with a focus on scalable architecture.
                </p>
                <div style={{
                  display: 'flex',
                  gap: '12px'
                }}>
                  {[
                    { icon: Github, href: 'https://github.com/bhagavan444', label: 'GitHub' },
                    { icon: Linkedin, href: 'https://www.linkedin.com/in/gopalajosyula-siva-satya-sai-bhagavan-1624a027b/', label: 'LinkedIn' },
                    { icon: Mail, href: 'mailto:g.sivasatyasaibhagavan@gmail.com', label: 'Email' }
                  ].map((social, i) => (
                    <a
                      key={i}
                      href={social.href}
                      target={social.href.startsWith('http') ? '_blank' : undefined}
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      style={{
                        width: '48px',
                        height: '48px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'rgba(255,255,255,0.06)',
                        border: '1px solid rgba(255,255,255,0.12)',
                        borderRadius: '12px',
                        color: 'rgba(255,255,255,0.6)',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.background = 'rgba(255,255,255,0.12)';
                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)';
                        e.currentTarget.style.color = '#fff';
                        e.currentTarget.style.transform = 'translateY(-6px)';
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)';
                        e.currentTarget.style.color = 'rgba(255,255,255,0.6)';
                        e.currentTarget.style.transform = 'translateY(0)';
                      }}
                    >
                      <social.icon size={20} strokeWidth={1.5} />
                    </a>
                  ))}
                </div>
              </div>

              {/* Navigation columns */}
              {[
                {
                  title: 'Navigation',
                  links: [
                    { label: 'About', href: '#' },
                    { label: 'Experience', href: '#experience' },
                    { label: 'Projects', href: '#projects' },
                    { label: 'Education', href: '#education' },
                    { label: 'Skills', href: '#skills' }
                  ]
                },
                {
                  title: 'Projects',
                  links: [
                    { label: 'ATS Resume Builder', href: 'https://github.com/bhagavan444' },
                    { label: 'AI Chatbot App', href: 'https://github.com/bhagavan444' },
                    { label: 'Career Recommender', href: 'https://github.com/bhagavan444' },
                    { label: 'Fake News Detection', href: 'https://github.com/bhagavan444' }
                  ]
                },
                {
                  title: 'Technologies',
                  links: [
                    { label: 'MERN Stack', href: null },
                    { label: 'Python & ML', href: null },
                    { label: 'TensorFlow', href: null },
                    { label: 'AWS Cloud', href: null },
                    { label: 'Docker', href: null }
                  ]
                },
                {
                  title: 'Contact',
                  links: [
                    { label: 'Schedule Call', href: 'mailto:g.sivasatyasaibhagavan@gmail.com?subject=Schedule%20a%20Call' },
                    { label: 'Send Email', href: 'mailto:g.sivasatyasaibhagavan@gmail.com' },
                    { label: 'Eluru, AP, India', href: null },
                    { label: '+91 7569205626', href: 'tel:+917569205626' }
                  ]
                }
              ].map((section, i) => (
                <div key={i} style={{ gridColumn: 'span 2' }} className="footer-col">
                  <h4 style={{
                    fontSize: '13px',
                    fontWeight: 700,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.35)',
                    marginBottom: '28px'
                  }}>
                    {section.title}
                  </h4>
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px'
                  }}>
                    {section.links.map((link, j) => {
                      const Tag = link.href ? 'a' : 'span';
                      return (
                        <Tag
                          key={j}
                          href={link.href || undefined}
                          target={link.href?.startsWith('http') ? '_blank' : undefined}
                          rel="noopener noreferrer"
                          style={{
                            fontSize: '15px',
                            color: 'rgba(255,255,255,0.6)',
                            textDecoration: 'none',
                            transition: 'all 0.3s ease',
                            cursor: link.href ? 'pointer' : 'default',
                            width: 'fit-content',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                          }}
                          onMouseEnter={link.href ? e => {
                            e.currentTarget.style.color = '#fff';
                            e.currentTarget.style.transform = 'translateX(6px)';
                          } : undefined}
                          onMouseLeave={link.href ? e => {
                            e.currentTarget.style.color = 'rgba(255,255,255,0.6)';
                            e.currentTarget.style.transform = 'translateX(0)';
                          } : undefined}
                        >
                          {link.href && <ChevronRight size={14} strokeWidth={2} style={{ opacity: 0.5 }} />}
                          {link.label}
                        </Tag>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom bar */}
            <div style={{
              paddingTop: '48px',
              borderTop: '1px solid rgba(255,255,255,0.1)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '32px'
            }}
            className="footer-bottom">
              <div style={{
                fontSize: '14px',
                color: 'rgba(255,255,255,0.4)',
                lineHeight: 1.6
              }}>
                © 2026 Gopalajosyula Siva Satya Sai Bhagavan.<br />
                <span style={{ fontSize: '13px', opacity: 0.7 }}>Designed & built with precision and care.</span>
              </div>
              <div style={{
                display: 'flex',
                gap: '40px',
                alignItems: 'center',
                flexWrap: 'wrap'
              }}>
                <span style={{
                  fontSize: '13px',
                  color: 'rgba(255,255,255,0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <span style={{
                    width: '4px',
                    height: '4px',
                    background: 'rgba(255,255,255,0.4)',
                    borderRadius: '50%'
                  }} />
                  Built with React, Next.js & Framer Motion
                </span>
                <a
                  href="#"
                  onClick={e => {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '12px 24px',
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    borderRadius: '10px',
                    fontSize: '14px',
                    fontWeight: 600,
                    color: 'rgba(255,255,255,0.7)',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.12)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)';
                    e.currentTarget.style.color = '#fff';
                    e.currentTarget.style.transform = 'translateY(-3px)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)';
                    e.currentTarget.style.color = 'rgba(255,255,255,0.7)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  Back to top
                  <ArrowUpRight size={14} strokeWidth={2.5} />
                </a>
              </div>
            </div>
          </div>

          {/* Bottom multi-gradient shimmer */}
          <div style={{
            height: '4px',
            background: 'linear-gradient(90deg, #6366f1, #8b5cf6, #ec4899, #f59e0b, #10b981, #6366f1)',
            backgroundSize: '200% 100%',
            animation: 'gradientShift 8s ease-in-out infinite'
          }} />
        </footer>

      {showModal && (
        <div
          onClick={() => setShowModal(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0, 0, 0, 0.96)",
            backdropFilter: "blur(8px)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            animation: 'fadeIn 0.2s ease'
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              width: "100%",
              maxWidth: "1000px",
              height: "90vh",
              margin: "0 auto",
              padding: "0 24px",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              animation: 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          >
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}>
              <span style={{
                fontSize: "13px",
                color: "#a3a3a3",
                letterSpacing: "0.02em",
              }}>
                Resume Preview
              </span>
              <div style={{ display: "flex", gap: "12px" }}>
                <a
                  href={RESUME_DOWNLOAD}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "10px 20px",
                    borderRadius: "8px",
                    background: "#fff",
                    color: "#0f0f0f",
                    fontSize: "14px",
                    fontWeight: 600,
                    textDecoration: "none",
                    transition: "all 0.25s ease",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = "#f5f5f5";
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = "#fff";
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <Download size={14} strokeWidth={2} /> Download
                </a>
                <button
                  onClick={() => setShowModal(false)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "10px 20px",
                    borderRadius: "8px",
                    background: "rgba(255, 255, 255, 0.1)",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    color: "#fff",
                    fontSize: "14px",
                    cursor: "pointer",
                    transition: "all 0.25s ease",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = "rgba(255, 255, 255, 0.15)";
                    e.currentTarget.style.transform = 'rotate(90deg)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
                    e.currentTarget.style.transform = 'rotate(0)';
                  }}
                >
                  <X size={14} strokeWidth={2} />
                </button>
              </div>
            </div>
            <div style={{
              flex: 1,
              borderRadius: "12px",
              overflow: "hidden",
              border: "1px solid rgba(255, 255, 255, 0.1)",
            }}>
              <iframe
                src={RESUME_PREVIEW}
                style={{ width: "100%", height: "100%", border: "none" }}
                title="Resume Fullscreen"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}