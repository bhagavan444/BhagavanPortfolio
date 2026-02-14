"use client";

import React, { useState, useRef } from "react";
import {
  Download, Eye, X, MapPin, Mail, Github, Linkedin,
  ChevronRight, ArrowUpRight, Calendar,
} from "lucide-react";

/* ═══════════════════════════════════════════════════════════════
   CONFIG
═══════════════════════════════════════════════════════════════ */
const RESUME_PREVIEW  = "https://drive.google.com/file/d/1-Ph6umgQ6P0YfBgQGLj-9UPMX2UDoKu3/preview";
const RESUME_DOWNLOAD = "https://drive.google.com/uc?export=download&id=1-Ph6umgQ6P0YfBgQGLj-9UPMX2UDoKu3";

/* ═══════════════════════════════════════════════════════════════
   DESIGN SYSTEM (Premium Monochrome + Accent)
   8px spacing system: 8, 12, 16, 24, 32, 40, 48, 64, 80, 120
═══════════════════════════════════════════════════════════════ */
const C = {
  // Base
  bg:        "#ffffff",
  
  // Text hierarchy
  text:      "#0f0f0f",
  text2:     "#404040",
  text3:     "#737373",
  text4:     "#a3a3a3",
  
  // Accent (minimal black accent)
  accent:    "#0a0a0a",
  accentHover: "#262626",
  
  // Borders (very subtle)
  border:    "#f5f5f5",
  border2:   "#e5e5e5",
};

/* ═══════════════════════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════════════════════ */
const metrics = [
  { value: "3", label: "Industry Internships" },
  { value: "5+", label: "Production Projects" },
  { value: "10+", label: "Professional Certifications" },
  { value: "MERN", label: "Full-Stack Expertise" },
];

const experiences = [
  {
    role:     "MERN Stack Intern",
    company:  "StudyOwl Education Pvt Ltd",
    period:   "May – Jul 2025",
    location: "Hybrid",
    
    owned: [
      "Designed and implemented reusable React components and backend APIs using Node.js and Express",
      "Handled frontend–backend integration flows using REST APIs and asynchronous requests",
      "Maintained code quality and collaboration using Git and GitHub in a team environment",
    ],
    
    decisions: [
      "Selected React component architecture for maintainability and reusability across the platform",
      "Implemented RESTful API design patterns with Express.js for scalable backend services",
      "Established Git workflow practices for code review and version control in team collaboration",
      "Integrated asynchronous request handling to improve user experience and application responsiveness",
    ],
    
    impact: [
      { metric: "REST APIs", label: "Backend integration" },
      { metric: "React", label: "Component architecture" },
      { metric: "Git", label: "Team collaboration" },
    ],
    
    tech: ["React.js", "Node.js", "Express.js", "REST APIs", "Git", "GitHub"],
  },
  {
    role:     "AI/ML Intern – Smart Sorting",
    company:  "SmartBridge",
    period:   "May – Jun 2025",
    location: "Remote",
    
    owned: [
      "Built and trained CNN-based image classification models using TensorFlow and Keras",
      "Deployed trained models into Flask-based applications for real-time inference pipelines",
      "Optimized model architecture for production deployment and real-time performance",
    ],
    
    decisions: [
      "Selected CNN architecture for superior image feature extraction and classification accuracy",
      "Chose Flask framework for lightweight model deployment with real-time inference capabilities",
      "Implemented TensorFlow and Keras for efficient model training and optimization workflows",
      "Designed inference pipeline architecture to handle real-time image classification requests",
    ],
    
    impact: [
      { metric: "CNN", label: "Image classification" },
      { metric: "Flask", label: "Real-time deployment" },
      { metric: "TensorFlow", label: "Model training" },
    ],
    
    tech: ["TensorFlow", "Keras", "Flask", "Python", "CNN", "Computer Vision"],
  },
  {
    role:     "Machine Learning & Data Science Intern",
    company:  "Blackbucks",
    period:   "May – Jun 2024",
    location: "Remote",
    
    owned: [
      "Executed data preprocessing, feature engineering, and supervised model evaluation workflows using Python",
      "Implemented machine learning pipelines from data ingestion to model deployment",
      "Applied statistical techniques for data analysis and feature selection",
    ],
    
    decisions: [
      "Designed data preprocessing pipelines to handle missing values, outliers, and data normalization",
      "Selected appropriate feature engineering techniques to improve model performance and accuracy",
      "Evaluated multiple supervised learning algorithms to identify optimal models for classification tasks",
      "Implemented cross-validation strategies for robust model evaluation and hyperparameter tuning",
    ],
    
    impact: [
      { metric: "Python", label: "ML workflows" },
      { metric: "Supervised", label: "Model evaluation" },
      { metric: "Feature Eng.", label: "Data optimization" },
    ],
    
    tech: ["Python", "Scikit-learn", "Pandas", "NumPy", "Machine Learning"],
  },
];

const projects = [
  {
    name:     "ATS-Based Resume Builder Platform",
    status:   "Live",
    year:     "2025",
    problem:  "Job seekers needed a tool to create ATS-optimized resumes with real-time compatibility scoring and secure authentication",
    approach: "Built full-stack MERN application with OAuth integration, PDF parsing logic, and keyword-based scoring mechanism",
    
    architecture: [
      "OAuth authentication using Google and GitHub for secure user access",
      "MongoDB schema design for user profiles and resume templates",
      "Keyword matching algorithm for ATS compatibility scoring",
      "PDF parsing logic for resume analysis and optimization",
    ],
    
    impact: [
      { metric: "OAuth", label: "Secure authentication" },
      { metric: "ATS", label: "Compatibility scoring" },
      { metric: "MERN", label: "Full-stack architecture" },
    ],
    
    tech: ["React", "Node.js", "MongoDB", "OAuth", "PDF Parsing"],
    github: "https://github.com/bhagavan444",
  },
  {
    name:     "AI Chatbot Web Application",
    status:   "Live",
    year:     "2025",
    problem:  "Need for an interactive AI chatbot with seamless frontend-backend integration and real-time response handling",
    approach: "Developed end-to-end chatbot application with React frontend, Flask backend, and external AI API integration",
    
    architecture: [
      "React UI with real-time message rendering and state management",
      "Flask backend API for handling chatbot requests and responses",
      "Asynchronous API calls to Gemini/OpenAI for AI-powered conversations",
      "Optimized request handling for improved response time and user experience",
    ],
    
    impact: [
      { metric: "AI API", label: "External integration" },
      { metric: "Async", label: "Request optimization" },
      { metric: "Flask", label: "Backend architecture" },
    ],
    
    tech: ["React", "Flask", "Gemini API", "OpenAI", "Python"],
    github: "https://github.com/bhagavan444",
  },
  {
    name:     "Career Path Recommendation System",
    status:   "Deployed",
    year:     "2024",
    problem:  "Students needed personalized career guidance based on their skills, interests, and academic background",
    approach: "Implemented ML pipeline with user data analysis and supervised learning for personalized career recommendations",
    
    architecture: [
      "Data collection and preprocessing pipeline for user profiles",
      "Feature engineering from academic and skill-based user inputs",
      "Supervised learning model for career path classification",
      "Recommendation engine generating personalized career suggestions",
    ],
    
    impact: [
      { metric: "ML Pipeline", label: "End-to-end system" },
      { metric: "Personalized", label: "Recommendations" },
      { metric: "Python", label: "Implementation" },
    ],
    
    tech: ["Python", "Scikit-learn", "Machine Learning", "Data Analysis"],
    github: "https://github.com/bhagavan444",
  },
  {
    name:     "Fake News Detection System",
    status:   "GitHub",
    year:     "2023",
    problem:  "Growing misinformation crisis required automated detection system for fake news articles",
    approach: "Applied NLP techniques with TF-IDF vectorization and classification algorithms to detect misinformation",
    
    architecture: [
      "TF-IDF vectorization for text feature extraction from news articles",
      "Classification model training using supervised learning techniques",
      "Text preprocessing pipeline for data cleaning and normalization",
      "Model evaluation framework for accuracy and performance metrics",
    ],
    
    impact: [
      { metric: "NLP", label: "Text analysis" },
      { metric: "TF-IDF", label: "Feature extraction" },
      { metric: "Classification", label: "Detection model" },
    ],
    
    tech: ["Python", "NLP", "TF-IDF", "Scikit-learn", "Machine Learning"],
    github: "https://github.com/bhagavan444",
  },
];

const principles = [
  {
    title: "Full-stack development with modern frameworks",
    desc: "Proficient in MERN stack development with React.js, Node.js, Express.js, and MongoDB for building scalable web applications.",
  },
  {
    title: "AI/ML model development and deployment",
    desc: "Experience with TensorFlow, Keras, and Scikit-learn for training models and deploying them in production environments.",
  },
  {
    title: "Data-driven problem solving",
    desc: "Strong foundation in data preprocessing, feature engineering, and supervised learning for building intelligent systems.",
  },
  {
    title: "Clean code and collaboration practices",
    desc: "Emphasis on code quality, version control with Git, and team collaboration for maintainable software development.",
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

const additionalSkills = {
  programming: ["Python", "Java", "C"],
  dataStructures: "Arrays, Strings, Searching, Sorting",
  oop: "Classes, Inheritance, Polymorphism, Encapsulation",
  webDev: ["HTML5", "CSS3", "JavaScript", "React.js", "Node.js", "Express.js"],
  databases: ["MongoDB", "SQL", "JDBC"],
  aiml: ["Supervised Learning", "Deep Learning", "CNNs", "NLP", "TensorFlow", "Keras", "Scikit-learn"],
  tools: ["Git", "GitHub", "VS Code", "Postman"],
  soft: ["Analytical Thinking", "Debugging", "Communication", "Team Collaboration"],
};

const education = {
  degree:   "B.Tech – Artificial Intelligence and Data Science",
  school:   "Ramachandra College of Engineering, Eluru (JNTUK)",
  period:   "2022 – 2026",
  score:    "75%",
  location: "Eluru, Andhra Pradesh",
  
  previous: [
    {
      level: "Intermediate (MPC)",
      institution: "Srividhya Junior College",
      period: "2020 – 2022",
      score: "78%",
    },
    {
      level: "Secondary School (Class X)",
      institution: "Montessori English Medium High School",
      period: "2019 – 2020",
      score: "95%",
    },
  ],
};

/* ═══════════════════════════════════════════════════════════════
   HOOK
═══════════════════════════════════════════════════════════════ */
function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [inView, setInView] = React.useState(false);
  React.useEffect(() => {
    const ob = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) ob.observe(ref.current);
    return () => ob.disconnect();
  }, []);
  return [ref, inView];
}

/* ═══════════════════════════════════════════════════════════════
   MAIN PAGE
═══════════════════════════════════════════════════════════════ */
export default function Resume() {
  const [showModal, setShowModal] = useState(false);
  const [scrollPct, setScrollPct] = useState(0);

  React.useEffect(() => {
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
  const [principlesRef, principlesIn] = useInView(0.15);
  const [certRef, certIn] = useInView(0.15);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Newsreader:wght@600;700&display=swap');

        *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          background: ${C.bg};
          color: ${C.text};
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          overflow-x: hidden;
        }
        ::selection { background: #f5f5f5; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: ${C.border2}; border-radius: 2px; }
        ::-webkit-scrollbar-thumb:hover { background: ${C.text4}; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 768px) {
          .metrics-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .project-arch { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* Minimal Scroll Progress */}
      <div style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "1px",
        background: C.border,
        zIndex: 9999,
      }}>
        <div style={{
          width: `${scrollPct}%`,
          height: "100%",
          background: C.accent,
          transition: "width 0.1s linear",
        }} />
      </div>

      <div style={{ maxWidth: "840px", margin: "0 auto", padding: "0 24px" }}>

        {/* ══════ HERO SECTION ══════ */}
        <header ref={heroRef} style={{ paddingTop: "120px", paddingBottom: "120px" }}>
          
          {/* Status Badge - Minimal */}
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "40px",
            opacity: heroIn ? 1 : 0,
            animation: heroIn ? "fadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0s both" : "none",
          }}>
            <div style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: C.accent,
            }} />
            <span style={{
              fontSize: "13px",
              letterSpacing: "0.02em",
              color: C.text3,
              fontWeight: 500,
            }}>
              Available for 2026 Graduate Roles
            </span>
          </div>

          {/* Editorial Headline */}
          <h1 style={{
            fontFamily: "'Newsreader', Georgia, serif",
            fontSize: "clamp(48px, 7vw, 72px)",
            fontWeight: 700,
            color: C.text,
            letterSpacing: "-0.04em",
            lineHeight: 1.05,
            marginBottom: "24px",
            opacity: heroIn ? 1 : 0,
            animation: heroIn ? "fadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both" : "none",
          }}>
            Software & AI<br />Engineer
          </h1>

          {/* Positioning Statement */}
          <p style={{
            fontSize: "19px",
            color: C.text2,
            fontWeight: 500,
            lineHeight: 1.6,
            marginBottom: "48px",
            maxWidth: "620px",
            opacity: heroIn ? 1 : 0,
            animation: heroIn ? "fadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.2s both" : "none",
          }}>
            Entry-level Software/AI Engineer with hands-on experience in Python, Java, and full-stack web development. Proven ability to take ownership of features across web and machine learning projects through internships and academic work.
          </p>

          {/* Clean Metadata */}
          <div style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            marginBottom: "48px",
            opacity: heroIn ? 1 : 0,
            animation: heroIn ? "fadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.3s both" : "none",
          }}>
            {[
              { icon: MapPin, text: "Eluru, Andhra Pradesh", href: null },
              { icon: Mail, text: "g.sivasatyasaibhagavan@gmail.com", href: "mailto:g.sivasatyasaibhagavan@gmail.com" },
              { icon: Github, text: "github.com/bhagavan444", href: "https://github.com/bhagavan444" },
              { icon: Linkedin, text: "linkedin.com/in/bhagavan", href: "https://linkedin.com/in/bhagavan" },
            ].map((item, i) => {
              const Tag = item.href ? "a" : "div";
              return (
                <Tag
                  key={i}
                  href={item.href || undefined}
                  target={item.href?.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "10px",
                    fontSize: "14px",
                    color: C.text3,
                    textDecoration: "none",
                    transition: "color 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
                    width: "fit-content",
                  }}
                  onMouseEnter={item.href ? e => e.currentTarget.style.color = C.text : undefined}
                  onMouseLeave={item.href ? e => e.currentTarget.style.color = C.text3 : undefined}
                >
                  <item.icon size={15} strokeWidth={1.5} /> {item.text}
                </Tag>
              );
            })}
          </div>

          {/* Premium CTAs */}
          <div style={{
            display: "flex",
            gap: "12px",
            flexWrap: "wrap",
            opacity: heroIn ? 1 : 0,
            animation: heroIn ? "fadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.4s both" : "none",
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
                border: "none",
                transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = "translateY(-1px)";
                e.currentTarget.style.background = C.accentHover;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.background = C.accent;
              }}
            >
              <Download size={16} strokeWidth={2} /> Download Resume
            </a>
            <button
              onClick={() => setShowModal(true)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "14px 28px",
                borderRadius: "8px",
                background: "transparent",
                color: C.text2,
                border: `1px solid ${C.border2}`,
                fontSize: "15px",
                fontWeight: 500,
                cursor: "pointer",
                transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.color = C.text;
                e.currentTarget.style.borderColor = C.text4;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color = C.text2;
                e.currentTarget.style.borderColor = C.border2;
              }}
            >
              <Eye size={16} strokeWidth={2} /> Preview
            </button>
          </div>
        </header>

        {/* ══════ RESUME PREVIEW ══════ */}
        <section style={{ paddingBottom: "120px" }}>
          <div style={{
            borderRadius: "12px",
            overflow: "hidden",
            border: `1px solid ${C.border2}`,
          }}>
            <div style={{
              padding: "16px 24px",
              background: C.bg,
              borderBottom: `1px solid ${C.border}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "12px",
            }}>
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}>
                <div style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: C.accent,
                }} />
                <span style={{
                  fontSize: "13px",
                  fontWeight: 600,
                  color: C.text2,
                  letterSpacing: "0.01em",
                }}>
                  Resume Preview
                </span>
              </div>
              <div style={{ display: "flex", gap: "8px" }}>
                <a
                  href={RESUME_DOWNLOAD}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "8px 16px",
                    borderRadius: "6px",
                    background: C.accent,
                    color: "#fff",
                    fontSize: "13px",
                    fontWeight: 600,
                    textDecoration: "none",
                    transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = "translateY(-1px)";
                    e.currentTarget.style.background = C.accentHover;
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.background = C.accent;
                  }}
                >
                  <Download size={13} strokeWidth={2} /> Download PDF
                </a>
                <button
                  onClick={() => setShowModal(true)}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "8px 16px",
                    borderRadius: "6px",
                    background: "transparent",
                    color: C.text3,
                    border: `1px solid ${C.border2}`,
                    fontSize: "13px",
                    fontWeight: 500,
                    cursor: "pointer",
                    transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.color = C.text;
                    e.currentTarget.style.borderColor = C.text4;
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.color = C.text3;
                    e.currentTarget.style.borderColor = C.border2;
                  }}
                >
                  <Eye size={13} strokeWidth={2} /> Fullscreen
                </button>
              </div>
            </div>
            <div style={{
              height: "600px",
              background: C.bg,
              padding: "0 20px",
            }}>
              <iframe
                src={RESUME_PREVIEW}
                style={{ 
                  width: "100%", 
                  height: "100%", 
                  border: "none",
                }}
                title="Resume Preview"
                allowFullScreen
              />
            </div>
          </div>
        </section>

        {/* ══════ IMPACT METRICS ══════ */}
        <section ref={metricsRef} style={{ paddingBottom: "120px" }}>
          <div className="metrics-grid" style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "48px",
          }}>
            {metrics.map((metric, i) => (
              <div
                key={i}
                style={{
                  opacity: metricsIn ? 1 : 0,
                  animation: metricsIn ? `fadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.08}s both` : "none",
                }}
              >
                <div style={{
                  fontFamily: "'Newsreader', Georgia, serif",
                  fontSize: "48px",
                  fontWeight: 700,
                  color: C.text,
                  letterSpacing: "-0.03em",
                  marginBottom: "8px",
                  lineHeight: 1,
                }}>
                  {metric.value}
                </div>
                <div style={{
                  fontSize: "14px",
                  color: C.text3,
                  lineHeight: 1.5,
                  fontWeight: 500,
                }}>
                  {metric.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ══════ EXPERIENCE - EDITORIAL LAYOUT ══════ */}
        <section ref={expRef} style={{ paddingBottom: "120px" }}>
          <div style={{
            marginBottom: "64px",
          }}>
            <h2 style={{
              fontFamily: "'Newsreader', Georgia, serif",
              fontSize: "40px",
              fontWeight: 700,
              color: C.text,
              letterSpacing: "-0.03em",
              lineHeight: 1.2,
              marginBottom: "16px",
            }}>
              Internships
            </h2>
            <p style={{
              fontSize: "17px",
              color: C.text3,
              lineHeight: 1.6,
              maxWidth: "600px",
            }}>
              Three technical internships spanning MERN stack development, AI/ML engineering, and data science from May 2024 to July 2025.
            </p>
          </div>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "80px" }}>
            {experiences.map((exp, i) => (
              <div
                key={i}
                style={{
                  opacity: expIn ? 1 : 0,
                  animation: expIn ? `fadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.1}s both` : "none",
                }}
              >
                {/* Header */}
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  gap: "32px",
                  marginBottom: "32px",
                  flexWrap: "wrap",
                }}>
                  <div>
                    <div style={{
                      fontSize: "28px",
                      fontWeight: 700,
                      color: C.text,
                      letterSpacing: "-0.02em",
                      marginBottom: "6px",
                    }}>
                      {exp.role}
                    </div>
                    <div style={{
                      fontSize: "18px",
                      fontWeight: 600,
                      color: C.text2,
                    }}>
                      {exp.company}
                    </div>
                  </div>
                  <div style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "4px",
                    alignItems: "flex-end",
                  }}>
                    <div style={{
                      fontSize: "13px",
                      color: C.text3,
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}>
                      <Calendar size={13} strokeWidth={1.5} /> {exp.period}
                    </div>
                    <div style={{
                      fontSize: "13px",
                      color: C.text4,
                    }}>
                      {exp.location}
                    </div>
                  </div>
                </div>

                {/* Content Grid */}
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "1fr",
                  gap: "40px",
                }}>
                  
                  {/* Ownership */}
                  <div>
                    <div style={{
                      fontSize: "11px",
                      fontWeight: 700,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: C.text4,
                      marginBottom: "16px",
                    }}>
                      Ownership
                    </div>
                    <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "12px" }}>
                      {exp.owned.map((item, idx) => (
                        <li key={idx} style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                          <div style={{
                            width: "4px",
                            height: "4px",
                            borderRadius: "50%",
                            background: C.text,
                            flexShrink: 0,
                            marginTop: "9px",
                          }} />
                          <span style={{ fontSize: "16px", color: C.text2, lineHeight: 1.6 }}>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Key Decisions */}
                  <div>
                    <div style={{
                      fontSize: "11px",
                      fontWeight: 700,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: C.text4,
                      marginBottom: "16px",
                    }}>
                      Key Engineering Decisions
                    </div>
                    <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "10px" }}>
                      {exp.decisions.map((item, idx) => (
                        <li key={idx} style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                          <ChevronRight size={14} strokeWidth={2} style={{ color: C.text3, flexShrink: 0, marginTop: "4px" }} />
                          <span style={{ fontSize: "15px", color: C.text3, lineHeight: 1.6 }}>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Impact + Tech */}
                  <div>
                    <div style={{
                      fontSize: "11px",
                      fontWeight: 700,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: C.text4,
                      marginBottom: "16px",
                    }}>
                      Impact
                    </div>
                    <div style={{
                      display: "flex",
                      gap: "40px",
                      marginBottom: "24px",
                      flexWrap: "wrap",
                    }}>
                      {exp.impact.map((item, idx) => (
                        <div key={idx}>
                          <div style={{
                            fontSize: "32px",
                            fontWeight: 700,
                            color: C.text,
                            letterSpacing: "-0.02em",
                            marginBottom: "4px",
                            lineHeight: 1,
                          }}>
                            {item.metric}
                          </div>
                          <div style={{
                            fontSize: "13px",
                            color: C.text3,
                          }}>
                            {item.label}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Tech Stack */}
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
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
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Subtle Divider */}
                {i < experiences.length - 1 && (
                  <div style={{
                    height: "1px",
                    background: C.border,
                    marginTop: "80px",
                  }} />
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ══════ PROJECTS - CLEANER CASE STUDIES ══════ */}
        <section ref={projRef} style={{ paddingBottom: "120px" }}>
          <div style={{
            marginBottom: "64px",
          }}>
            <h2 style={{
              fontFamily: "'Newsreader', Georgia, serif",
              fontSize: "40px",
              fontWeight: 700,
              color: C.text,
              letterSpacing: "-0.03em",
              lineHeight: 1.2,
              marginBottom: "16px",
            }}>
              Projects
            </h2>
            <p style={{
              fontSize: "17px",
              color: C.text3,
              lineHeight: 1.6,
              maxWidth: "600px",
            }}>
              Production systems with measurable outcomes and architectural depth.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "80px" }}>
            {projects.map((proj, i) => (
              <div
                key={i}
                style={{
                  opacity: projIn ? 1 : 0,
                  animation: projIn ? `fadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.1}s both` : "none",
                }}
              >
                {/* Header */}
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  gap: "24px",
                  marginBottom: "32px",
                  flexWrap: "wrap",
                }}>
                  <div>
                    <div style={{
                      fontSize: "28px",
                      fontWeight: 700,
                      color: C.text,
                      letterSpacing: "-0.02em",
                    }}>
                      {proj.name}
                    </div>
                    <div style={{
                      fontSize: "13px",
                      color: C.text4,
                      marginTop: "4px",
                    }}>
                      {proj.year}
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                    <span style={{
                      padding: "4px 10px",
                      background: C.border,
                      fontSize: "12px",
                      fontWeight: 600,
                      color: C.text3,
                      borderRadius: "4px",
                      letterSpacing: "0.02em",
                    }}>
                      {proj.status}
                    </span>
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
                        transition: "color 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
                      }}
                      onMouseEnter={e => e.currentTarget.style.color = C.text}
                      onMouseLeave={e => e.currentTarget.style.color = C.text3}
                    >
                      View on GitHub <ArrowUpRight size={14} strokeWidth={2} />
                    </a>
                  </div>
                </div>

                {/* Problem → Approach */}
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "1fr",
                  gap: "32px",
                  marginBottom: "40px",
                }}>
                  <div>
                    <div style={{
                      fontSize: "11px",
                      fontWeight: 700,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: C.text4,
                      marginBottom: "12px",
                    }}>
                      Problem
                    </div>
                    <p style={{ fontSize: "16px", color: C.text2, lineHeight: 1.6 }}>
                      {proj.problem}
                    </p>
                  </div>

                  <div>
                    <div style={{
                      fontSize: "11px",
                      fontWeight: 700,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: C.text4,
                      marginBottom: "12px",
                    }}>
                      Approach
                    </div>
                    <p style={{ fontSize: "15px", color: C.text3, lineHeight: 1.6 }}>
                      {proj.approach}
                    </p>
                  </div>
                </div>

                {/* Architecture Highlights */}
                <div style={{ marginBottom: "40px" }}>
                  <div style={{
                    fontSize: "11px",
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: C.text4,
                    marginBottom: "16px",
                  }}>
                    Architecture
                  </div>
                  <div className="project-arch" style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, 1fr)",
                    gap: "12px",
                  }}>
                    {proj.architecture.map((arch, idx) => (
                      <div
                        key={idx}
                        style={{
                          padding: "16px",
                          background: C.border,
                          borderRadius: "6px",
                          fontSize: "14px",
                          color: C.text2,
                          lineHeight: 1.5,
                        }}
                      >
                        {arch}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Impact Metrics + Tech */}
                <div>
                  <div style={{
                    fontSize: "11px",
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: C.text4,
                    marginBottom: "16px",
                  }}>
                    Impact
                  </div>
                  <div style={{ display: "flex", gap: "40px", marginBottom: "24px", flexWrap: "wrap" }}>
                    {proj.impact.map((item, idx) => (
                      <div key={idx}>
                        <div style={{
                          fontSize: "32px",
                          fontWeight: 700,
                          color: C.text,
                          letterSpacing: "-0.02em",
                          marginBottom: "4px",
                          lineHeight: 1,
                        }}>
                          {item.metric}
                        </div>
                        <div style={{
                          fontSize: "13px",
                          color: C.text3,
                        }}>
                          {item.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                    {proj.tech.map((tech, idx) => (
                      <span
                        key={idx}
                        style={{
                          padding: "6px 12px",
                          background: C.border,
                          fontSize: "13px",
                          fontWeight: 500,
                          color: C.text3,
                          borderRadius: "4px",
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Subtle Divider */}
                {i < projects.length - 1 && (
                  <div style={{
                    height: "1px",
                    background: C.border,
                    marginTop: "80px",
                  }} />
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ══════ PRINCIPLES ══════ */}
        <section ref={principlesRef} style={{ paddingBottom: "120px" }}>
          <div style={{
            marginBottom: "64px",
          }}>
            <h2 style={{
              fontFamily: "'Newsreader', Georgia, serif",
              fontSize: "40px",
              fontWeight: 700,
              color: C.text,
              letterSpacing: "-0.03em",
              lineHeight: 1.2,
            }}>
              Technical Approach
            </h2>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 360px), 1fr))",
            gap: "32px",
          }}>
            {principles.map((principle, i) => (
              <div
                key={i}
                style={{
                  opacity: principlesIn ? 1 : 0,
                  animation: principlesIn ? `fadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.08}s both` : "none",
                }}
              >
                <div style={{
                  fontSize: "18px",
                  fontWeight: 600,
                  color: C.text,
                  marginBottom: "12px",
                  lineHeight: 1.4,
                }}>
                  {principle.title}
                </div>
                <p style={{
                  fontSize: "15px",
                  color: C.text3,
                  lineHeight: 1.6,
                }}>
                  {principle.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ══════ CERTIFICATIONS ══════ */}
        <section ref={certRef} style={{ paddingBottom: "120px" }}>
          <div style={{
            marginBottom: "64px",
          }}>
            <h2 style={{
              fontFamily: "'Newsreader', Georgia, serif",
              fontSize: "40px",
              fontWeight: 700,
              color: C.text,
              letterSpacing: "-0.03em",
              lineHeight: 1.2,
              marginBottom: "16px",
            }}>
              Certifications & Skills
            </h2>
            <p style={{
              fontSize: "17px",
              color: C.text3,
              lineHeight: 1.6,
            }}>
              Professional certifications from Google, IBM, Simplilearn, Infosys, and GeeksforGeeks.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            {certifications.map((cert, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  gap: "24px",
                  paddingBottom: "24px",
                  borderBottom: i < certifications.length - 1 ? `1px solid ${C.border}` : "none",
                  opacity: certIn ? 1 : 0,
                  animation: certIn ? `fadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.06}s both` : "none",
                }}
              >
                <div style={{ flex: 1 }}>
                  <div style={{
                    fontSize: "17px",
                    fontWeight: 600,
                    color: C.text,
                    marginBottom: "4px",
                  }}>
                    {cert.name}
                  </div>
                  <div style={{
                    fontSize: "14px",
                    color: C.text3,
                  }}>
                    {cert.issuer}
                  </div>
                </div>
                <div style={{
                  fontSize: "14px",
                  color: C.text4,
                  flexShrink: 0,
                }}>
                  {cert.year}
                </div>
              </div>
            ))}
          </div>

          {/* Education */}
          <div style={{
            marginTop: "64px",
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
            
            {/* Current Degree */}
            <div style={{ marginBottom: "32px" }}>
              <div style={{
                fontSize: "18px",
                fontWeight: 600,
                color: C.text,
                marginBottom: "8px",
              }}>
                {education.degree}
              </div>
              <div style={{
                fontSize: "15px",
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

            {/* Previous Education */}
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
                    fontSize: "15px",
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

          {/* Technical Skills */}
          <div style={{
            marginTop: "24px",
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
              marginBottom: "20px",
            }}>
              Technical Skills
            </div>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <span style={{ fontSize: "14px", fontWeight: 600, color: C.text2, marginRight: "8px" }}>
                  Programming:
                </span>
                <span style={{ fontSize: "14px", color: C.text3 }}>
                  {additionalSkills.programming.join(", ")}
                </span>
              </div>
              
              <div>
                <span style={{ fontSize: "14px", fontWeight: 600, color: C.text2, marginRight: "8px" }}>
                  Web Development:
                </span>
                <span style={{ fontSize: "14px", color: C.text3 }}>
                  {additionalSkills.webDev.join(", ")}
                </span>
              </div>
              
              <div>
                <span style={{ fontSize: "14px", fontWeight: 600, color: C.text2, marginRight: "8px" }}>
                  AI/ML:
                </span>
                <span style={{ fontSize: "14px", color: C.text3 }}>
                  {additionalSkills.aiml.join(", ")}
                </span>
              </div>
              
              <div>
                <span style={{ fontSize: "14px", fontWeight: 600, color: C.text2, marginRight: "8px" }}>
                  Databases:
                </span>
                <span style={{ fontSize: "14px", color: C.text3 }}>
                  {additionalSkills.databases.join(", ")}
                </span>
              </div>
              
              <div>
                <span style={{ fontSize: "14px", fontWeight: 600, color: C.text2, marginRight: "8px" }}>
                  Tools:
                </span>
                <span style={{ fontSize: "14px", color: C.text3 }}>
                  {additionalSkills.tools.join(", ")}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ══════ CTA SECTION ══════ */}
        <section style={{ paddingBottom: "120px" }}>
          <div style={{
            padding: "64px 48px",
            background: C.border,
            borderRadius: "12px",
          }}>
            <div style={{
              maxWidth: "520px",
            }}>
              <div style={{
                fontFamily: "'Newsreader', Georgia, serif",
                fontSize: "36px",
                fontWeight: 700,
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
                Seeking junior engineering roles in software development, AI/ML, or full-stack positions. Ready to contribute to real-world systems while continuing to strengthen core computer science skills.
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
                    transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = "translateY(-1px)";
                    e.currentTarget.style.background = C.accentHover;
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.background = C.accent;
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
                    fontSize: "15px",
                    fontWeight: 500,
                    textDecoration: "none",
                    transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = C.text}
                  onMouseLeave={e => e.currentTarget.style.color = C.text2}
                >
                  <Mail size={16} strokeWidth={2} /> Get in Touch
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ══════ FOOTER ══════ */}
        <footer style={{
          paddingTop: "48px",
          paddingBottom: "48px",
          borderTop: `1px solid ${C.border}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "24px",
        }}>
          <span style={{
            fontSize: "14px",
            color: C.text4,
          }}>
            © 2026 Siva Satya Sai Bhagavan
          </span>
          <div style={{ display: "flex", gap: "24px" }}>
            {[
              { label: "GitHub", href: "https://github.com/bhagavan444" },
              { label: "LinkedIn", href: "https://www.linkedin.com/in/gopalajosyula-siva-satya-sai-bhagavan-1624a027b/" },
              { label: "Email", href: "mailto:g.sivasatyasaibhagavan@gmail.com" },
            ].map((link, i) => (
              <a
                key={i}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                style={{
                  fontSize: "14px",
                  color: C.text3,
                  textDecoration: "none",
                  transition: "color 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
                onMouseEnter={e => e.currentTarget.style.color = C.text}
                onMouseLeave={e => e.currentTarget.style.color = C.text3}
              >
                {link.label}
              </a>
            ))}
          </div>
        </footer>
      </div>

      {/* ══════ FULLSCREEN MODAL ══════ */}
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
                    transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = "#f5f5f5"}
                  onMouseLeave={e => e.currentTarget.style.background = "#fff"}
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
                    transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = "rgba(255, 255, 255, 0.15)"}
                  onMouseLeave={e => e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)"}
                >
                  <X size={14} strokeWidth={2} /> Close
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