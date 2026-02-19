import React, { useState, useEffect, useRef } from 'react';
import { motion, useSpring, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import {
  ExternalLink, Github, ArrowRight, Sparkles, TrendingUp, 
  Zap, Server, Code2, Target, AlertCircle, Eye, MousePointer2, Move
} from 'lucide-react';


// All projects data
const allProjects = [
  {
    id: 1,
    title: "ATS-Based Resume Builder",
    tagline: "MERN stack resume optimization platform",
    subtitle: "Keyword-weighted scoring against live job descriptions",
    github: "https://github.com/bhagavan444/Resumebuilderwebapp",
    live: null,
    year: "2025",
    duration: "3 months",
    color: "#2563eb",
    featured: true,

    problem:
      "Most resume builders output visually styled PDFs that fail silently inside ATS parsers — stripped of structure, losing keyword context, and ranking near the bottom of applicant queues before a recruiter ever sees them.",

    solution:
      "Built a MERN stack platform where users construct structured resumes through a form-driven interface. A Node.js backend parses the submitted content, extracts keywords from a pasted job description, and runs a weighted scoring algorithm that highlights gaps. OAuth via Google and GitHub handles identity without storing passwords.",

    impact: [
      { label: "ATS Score Achieved", value: 90, suffix: "%" },
      { label: "Resume Sections Structured", value: 8, suffix: "+" },
      { label: "Auth Providers Integrated", value: 2, suffix: "" }
    ],

    architecture: [
      { label: "Frontend", value: "React with Context API for cross-section state sync" },
      { label: "Backend", value: "Node.js + Express — REST endpoints for parse, score, export" },
      { label: "Authentication", value: "Passport.js — Google & GitHub OAuth, session-based" },
      { label: "Scoring Engine", value: "Keyword extraction + TF-weighted relevance scoring against JD" },
      { label: "Database", value: "MongoDB Atlas — flexible document schema per resume template" }
    ],

    techStack: {
      Frontend: ["React", "Context API", "CSS Modules"],
      Backend: ["Node.js", "Express", "Passport.js"],
      Database: ["MongoDB", "Mongoose"],
      Parsing_Logic: ["PDF-lib", "Keyword Tokenizer", "Regex Normalization"],
      Tools: ["Git", "Postman", "MongoDB Atlas"]
    },

    challenges: [
      {
        title: "Normalizing Job Description Variance",
        description:
          "Job descriptions across companies use wildly different phrasing for identical skills — 'React.js', 'ReactJS', 'React framework'. Naive string matching produced low scores for well-qualified candidates.",
        solution:
          "Implemented a normalization layer that strips punctuation, lowercases tokens, and maps known aliases to canonical skill terms before scoring. Weighted core skills (e.g. programming languages) higher than soft skills in the final relevance score."
      }
    ],

    results: [
      "Scoring engine consistently assigns 90%+ on resumes matching 70%+ of JD keywords",
      "Structured output passes PDF parsing without layout collapse across 3 tested ATS platforms",
      "OAuth flow handles token refresh and revocation — no plaintext credentials stored",
      "MongoDB document model supports 5 distinct resume templates without schema migration"
    ],

    learned:
      "Learned how ATS systems actually tokenize resume content — PDF formatting that looks clean visually can break machine parsing. Choosing semantic HTML structure over CSS-heavy layouts was the right call for parsability.",

    screenshot: "/images/resume.jpg"
  },

  {
    id: 2,
    title: "AI Chatbot Web Application",
    tagline: "Secure server-side AI API integration",
    subtitle: "React frontend + Flask backend with async request handling",
    github: "https://github.com/bhagavan444/chatbotwebapp",
    live: null,
    year: "2025",
    duration: "4 months",
    color: "#7c3aed",
    featured: true,

    problem:
      "Exposing AI API keys directly in frontend JavaScript is a common security mistake in student projects. Beyond security, browser-side API calls have no control over rate limits, no retry logic, and no context management — each message goes in isolation with no conversation history.",

    solution:
      "Architected a React frontend that sends messages to a Flask backend, which owns all API credentials server-side. The Flask layer manages conversation history as a rolling context window, handles exponential backoff on rate-limit errors, and returns structured responses. Users see a live typing indicator while requests are in-flight.",

    impact: [
      { label: "Avg Response Time", value: 480, suffix: "ms" },
      { label: "API Key Exposure", value: 0, suffix: " (server-isolated)" },
      { label: "Retry Success Rate", value: 97, suffix: "%" }
    ],

    architecture: [
      { label: "Frontend", value: "React — async fetch, optimistic UI, typing indicator state" },
      { label: "Backend", value: "Flask REST API — owns credentials, context window, retry logic" },
      { label: "Context Management", value: "Rolling message history passed per request to maintain multi-turn coherence" },
      { label: "Error Handling", value: "Exponential backoff on 429s, structured error responses to frontend" },
      { label: "Security", value: "API keys server-side only — never transmitted to browser" }
    ],

    techStack: {
      Frontend: ["React", "JavaScript", "Fetch API"],
      Backend: ["Flask", "Python", "python-dotenv"],
      AI: ["External LLM API", "Context window management"],
      Tools: ["Git", "Postman", "VS Code"]
    },

    challenges: [
      {
        title: "Multi-turn Context Without a Database",
        description:
          "Stateless HTTP means each request is independent. Without maintaining conversation history, the AI responded as if every message was the first — producing incoherent multi-turn conversations.",
        solution:
          "Flask session stores the rolling message array per user session. Each new message appends to history before the API call, and the response is appended on return. Session size is capped to prevent exceeding token limits on long conversations."
      }
    ],

    results: [
      "API key never leaves the server — no exposure risk in browser network tab",
      "Multi-turn conversations maintain context across 15+ message exchanges",
      "Backoff logic reduced failed requests from ~12% to under 3% under rate pressure",
      "Sub-500ms median response time on standard API latency"
    ],

    learned:
      "The most important architectural decision was keeping the API layer on the server. It made security, retry logic, and context management all easier to reason about — concerns that are nearly impossible to handle cleanly in pure frontend code.",

    screenshot: "/images/chatbot.jpg"
  },

  {
    id: 3,
    title: "Career Path Recommendation System",
    tagline: "Supervised ML career guidance engine",
    github: "https://github.com/bhagavan444/Career-Path-Recommendation",
    live: null,
    year: "2024",
    color: "#10b981",
    featured: false,

    problem:
      "Students make career decisions based on peer pressure or vague interest rather than an objective assessment of their skills, academic strengths, and aptitude — often discovering a poor fit only after committing significant time.",

    solution:
      "Trained a supervised classification model on labeled student-career mapping data. Users input academic scores, skill ratings, and interest areas. The model returns ranked career domain recommendations with confidence scores. Flask serves predictions; React renders the results.",

    impact: [
      { label: "Model Accuracy", value: 88, suffix: "%" },
      { label: "Career Domains Covered", value: 20, suffix: "+" },
      { label: "Inference Time", value: 180, suffix: "ms" }
    ],

    tech: ["Python", "Scikit-learn", "Flask", "React"],

    screenshot: "/images/carrer.jpg"
  },

  {
    id: 4,
    title: "Fake News Detection System",
    tagline: "TF-IDF + ML misinformation classifier",
    github: "https://github.com/bhagavan444/News-detector",
    live: null,
    year: "2023",
    color: "#ef4444",
    featured: false,

    problem:
      "Manually fact-checking news articles at scale is impractical. Misinformation spreads faster than human moderation can respond, requiring a pipeline that can classify articles at ingestion speed.",

    solution:
      "Built an NLP pipeline using TF-IDF vectorization to convert article text into numerical feature vectors, then trained a classification model (Logistic Regression / Passive Aggressive Classifier) to distinguish real from fabricated news. The pipeline handles preprocessing — stopword removal, stemming, lowercasing — before vectorization.",

    impact: [
      { label: "Classification Accuracy", value: 92, suffix: "%" },
      { label: "Vectorization", value: 1, suffix: " TF-IDF Pipeline" },
      { label: "Inference Latency", value: 90, suffix: "ms" }
    ],

    tech: ["Python", "Scikit-learn", "NLP", "TF-IDF"],

    screenshot: "/images/fake.jpg"
  },

  {
    id: 5,
    title: "Heart Disease Prediction System",
    tagline: "Clinical feature-based ML risk classifier",
    github: "https://github.com/bhagavan444/Heart-Disease-Prediction",
    live: null,
    year: "2024",
    color: "#f59e0b",
    featured: false,

    problem:
      "Early-stage heart disease risk is difficult to assess without specialist consultation. Primary care contexts lack tooling to flag at-risk patients early using routine diagnostic data that's already being collected.",

    solution:
      "Trained a binary classification model on the Cleveland Heart Disease dataset using features like cholesterol, resting BP, max heart rate, and chest pain type. Applied feature scaling and handled class imbalance before training. Flask exposes a prediction endpoint; SQLite logs anonymized prediction requests for audit.",

    impact: [
      { label: "Model Accuracy", value: 85, suffix: "%" },
      { label: "Input Features", value: 13, suffix: " clinical" },
      { label: "Precision (Positive Class)", value: 83, suffix: "%" }
    ],

    tech: ["Python", "Scikit-learn", "Flask", "SQLite"],

    screenshot: "/images/heart.jpg"
  }
];


// Premium Custom Cursor Component
const CustomCursor = () => {
  const cursorRef = useRef(null);
  const cursorDotRef = useRef(null);
  const cursorTrailRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [cursorVariant, setCursorVariant] = useState('default');
  
  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;
    const cursorTrail = cursorTrailRef.current;
    
    const moveCursor = (e) => {
      if (cursor && cursorDot && cursorTrail) {
        cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
        cursorDot.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
        
        // Trail effect with delay
        setTimeout(() => {
          cursorTrail.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
        }, 100);
      }
    };
    
    const handleMouseEnter = (e) => {
      if (e.target.closest('a, button, .hoverable')) {
        setIsHovering(true);
        const text = e.target.getAttribute('data-cursor-text');
        if (text) {
          setCursorText(text);
          setCursorVariant('text');
        } else {
          setCursorVariant('hover');
        }
      }
    };
    
    const handleMouseLeave = (e) => {
      if (e.target.closest('a, button, .hoverable')) {
        setIsHovering(false);
        setCursorText('');
        setCursorVariant('default');
      }
    };
    
    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseenter', handleMouseEnter, true);
    document.addEventListener('mouseleave', handleMouseLeave, true);
    
    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseenter', handleMouseEnter, true);
      document.removeEventListener('mouseleave', handleMouseLeave, true);
    };
  }, []);
  
  return (
    <>
      {/* Trail cursor */}
      <div 
        ref={cursorTrailRef} 
        className="cursor-trail"
      />
      
      {/* Main cursor ring */}
      <div 
        ref={cursorRef} 
        className={`custom-cursor ${cursorVariant}`}
      >
        {cursorText && <span className="cursor-text">{cursorText}</span>}
        {cursorVariant === 'hover' && !cursorText && (
          <motion.div
            className="cursor-icon"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
          >
            <Move size={16} />
          </motion.div>
        )}
      </div>
      
      {/* Center dot */}
      <div 
        ref={cursorDotRef} 
        className={`cursor-dot ${cursorVariant}`}
      />
    </>
  );
};

// Parallax Mouse Effect Hook
const useParallax = (strength = 20) => {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const ref = useRef(null);
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = (e.clientX - centerX) / strength;
      const deltaY = (e.clientY - centerY) / strength;
      setOffset({ x: deltaX, y: deltaY });
    };
    
    const handleMouseLeave = () => {
      setOffset({ x: 0, y: 0 });
    };
    
    const element = ref.current;
    if (element) {
      element.addEventListener('mousemove', handleMouseMove);
      element.addEventListener('mouseleave', handleMouseLeave);
    }
    
    return () => {
      if (element) {
        element.removeEventListener('mousemove', handleMouseMove);
        element.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [strength]);
  
  return [ref, offset];
};

// Enhanced Magnetic Button
const MagneticButton = ({ children, href, external = false, className = "", style = {}, cursorText = "" }) => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  
  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);
  
  const handleMouse = (e) => {
    if (!ref.current || isTouchDevice) return;
    const { clientX, clientY } = e;
    const { width, height, left, top } = ref.current.getBoundingClientRect();
    const x = (clientX - (left + width / 2)) * 0.15;
    const y = (clientY - (top + height / 2)) * 0.15;
    setPosition({ x, y });
  };
  
  const reset = () => {
    setPosition({ x: 0, y: 0 });
    setIsHovered(false);
  };
  
  const buttonContent = (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 300, damping: 25, mass: 0.1 }}
      className={className}
      style={style}
      data-cursor-text={cursorText}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
      {isHovered && (
        <motion.div
          className="button-ripple"
          initial={{ scale: 0, opacity: 0.5 }}
          animate={{ scale: 2, opacity: 0 }}
          transition={{ duration: 0.6 }}
        />
      )}
    </motion.div>
  );
  
  if (href) {
    return (
      <a href={href} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined} style={{ textDecoration: 'none' }}>
        {buttonContent}
      </a>
    );
  }
  
  return buttonContent;
};

// Animated Counter with Glow Effect
const AnimatedCounter = ({ value, suffix = "", color }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [isInView, setIsInView] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          setIsInView(true);
          let start = 0;
          const end = parseInt(value);
          if (start === end) return;
          
          const duration = 2000;
          const increment = end / (duration / 16);
          
          const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 16);
          
          return () => clearInterval(timer);
        }
      },
      { threshold: 0.3 }
    );
    
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value, hasAnimated]);
  
  return (
    <span ref={ref} style={{ position: 'relative', display: 'inline-block' }}>
      {count}{suffix}
      {isInView && (
        <motion.span
          className="counter-glow"
          style={{ background: color }}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.3, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      )}
    </span>
  );
};

// Floating Particles Background
const FloatingParticles = ({ color }) => {
  const particles = Array.from({ length: 15 }, (_, i) => i);
  
  return (
    <div className="particles-container">
      {particles.map((i) => (
        <motion.div
          key={i}
          className="particle"
          style={{
            background: color,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [0, 0.6, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};

// Flagship Project Component
const FlagshipProject = ({ project, index }) => {
  const [activeTab, setActiveTab] = useState('architecture');
  const [isImageHovered, setIsImageHovered] = useState(false);
  const isEven = index % 2 === 0;
  const [parallaxRef, parallaxOffset] = useParallax(30);
  
  return (
    <motion.section
      ref={parallaxRef}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
      className="flagship-section hoverable"
    >
      {/* Animated Background Elements */}
      <motion.div 
        className="bg-glow" 
        style={{ 
          background: `radial-gradient(circle at ${isEven ? '20%' : '80%'} 50%, ${project.color}15 0%, transparent 60%)`,
          x: parallaxOffset.x * 0.5,
          y: parallaxOffset.y * 0.5,
        }} 
      />
      
      <FloatingParticles color={project.color} />
      
      <motion.div 
        className="bg-watermark" 
        style={{ 
          left: isEven ? '5%' : 'auto', 
          right: isEven ? 'auto' : '5%',
          x: parallaxOffset.x * -0.3,
          y: parallaxOffset.y * -0.3,
        }}
      >
        {project.title.split(' ')[0]}
      </motion.div>
      
      <div className="flagship-container">
        <div className={`flagship-grid ${isEven ? '' : 'reverse'}`}>
          {/* Image Side */}
          <motion.div 
            className="flagship-image-wrapper"
            initial={{ opacity: 0, x: isEven ? -40 : 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <motion.div 
              className="precision-badge"
              animate={{ rotate: [0, 5, 0, -5, 0] }}
              transition={{ duration: 5, repeat: Infinity }}
            >
              <Sparkles size={12} />
              <span>Built With Precision</span>
            </motion.div>
            
            <motion.div
              className="flagship-image-container hoverable"
              onHoverStart={() => setIsImageHovered(true)}
              onHoverEnd={() => setIsImageHovered(false)}
              whileHover={{ scale: 1.02, rotateY: 2, rotateX: -2 }}
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              data-cursor-text="View Project"
            >
              <motion.div 
                className="image-glow" 
                style={{ background: `${project.color}40` }}
                animate={isImageHovered ? { opacity: [0.3, 0.6, 0.3], scale: [1, 1.1, 1] } : {}}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <motion.img 
                src={project.screenshot} 
                alt={project.title} 
                className="flagship-image"
                animate={isImageHovered ? { scale: 1.05 } : { scale: 1 }}
                transition={{ duration: 0.4 }}
              />
              
              <AnimatePresence>
                {isImageHovered && (
                  <motion.div
                    className="image-overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <Eye size={32} color="#ffffff" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
            
            <motion.div 
              className="image-meta"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <motion.span whileHover={{ scale: 1.1 }}>{project.year}</motion.span>
              <span>•</span>
              <motion.span whileHover={{ scale: 1.1 }}>{project.duration}</motion.span>
            </motion.div>
          </motion.div>
          
          {/* Content Side */}
          <div className="flagship-content">
            {/* Hero */}
            <div className="project-hero">
              <motion.h2 
                className="project-title"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
              >
                {project.title}
                <motion.div 
                  className="title-underline" 
                  style={{ background: project.color }}
                  initial={{ width: 0 }}
                  whileInView={{ width: '100%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                />
              </motion.h2>
              
              <motion.p 
                className="project-subtitle"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                {project.subtitle}
              </motion.p>
              <motion.p 
                className="project-tagline"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
              >
                {project.tagline}
              </motion.p>
            </div>
            
            {/* Impact Metrics */}
            <motion.div 
              className="impact-showcase"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {project.impact.map((metric, idx) => (
                <motion.div 
                  key={idx} 
                  className="impact-metric hoverable"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + idx * 0.1, duration: 0.5 }}
                  whileHover={{ 
                    scale: 1.05,
                    y: -5,
                    transition: { duration: 0.2 }
                  }}
                >
                  <div className="metric-value" style={{ color: project.color }}>
                    <AnimatedCounter value={metric.value} suffix={metric.suffix} color={project.color} />
                  </div>
                  <div className="metric-label">{metric.label}</div>
                </motion.div>
              ))}
            </motion.div>
            
            {/* CTAs */}
            <motion.div 
              className="cta-row"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <MagneticButton 
                href={project.github} 
                external 
                className="btn-primary" 
                style={{ background: project.color }}
                cursorText="View Code"
              >
                <Github size={16} />
                <span>View Source</span>
                <ArrowRight size={16} />
              </MagneticButton>
              
              <MagneticButton 
                href={project.live} 
                external 
                className="btn-secondary"
                cursorText="Live Demo"
              >
                <ExternalLink size={16} />
                <span>Live Demo</span>
              </MagneticButton>
            </motion.div>
            
            {/* Problem & Solution */}
            <div className="ps-grid">
              <motion.div 
                className="ps-card problem hoverable"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                whileHover={{ scale: 1.02, boxShadow: "0 8px 24px rgba(239, 68, 68, 0.15)" }}
              >
                <motion.div 
                  className="ps-icon"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <AlertCircle size={16} />
                </motion.div>
                <div className="ps-label">Problem</div>
                <div className="ps-text">{project.problem}</div>
              </motion.div>
              
              <motion.div 
                className="ps-card solution hoverable"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                whileHover={{ scale: 1.02, boxShadow: "0 8px 24px rgba(34, 197, 94, 0.15)" }}
              >
                <motion.div 
                  className="ps-icon"
                  animate={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <Target size={16} />
                </motion.div>
                <div className="ps-label">Solution</div>
                <div className="ps-text">{project.solution}</div>
              </motion.div>
            </div>
            
            {/* Tab System */}
            <motion.div 
              className="tab-system"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <div className="tab-nav">
                {['architecture', 'tech', 'challenges', 'results'].map((tab, idx) => (
                  <motion.button
                    key={tab}
                    className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
                    onClick={() => setActiveTab(tab)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + idx * 0.1 }}
                  >
                    {tab === 'architecture' && <Server size={14} />}
                    {tab === 'tech' && <Code2 size={14} />}
                    {tab === 'challenges' && <TrendingUp size={14} />}
                    {tab === 'results' && <Zap size={14} />}
                    <span>{tab.charAt(0).toUpperCase() + tab.slice(1)}</span>
                  </motion.button>
                ))}
                <motion.div 
                  className="tab-indicator"
                  layoutId={`indicator-${project.id}`}
                  style={{ background: project.color }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              </div>
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="tab-content"
                >
                  {activeTab === 'architecture' && (
                    <div className="arch-grid">
                      {project.architecture.map((section, idx) => (
                        <motion.div
                          key={idx}
                          className="arch-item hoverable"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          whileHover={{ scale: 1.02, x: 5 }}
                        >
                          <div className="arch-label">{section.label}</div>
                          <div className="arch-value">{section.value}</div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                  
                  {activeTab === 'tech' && (
                    <div className="tech-categories">
                      {Object.entries(project.techStack).map(([category, techs], idx) => (
                        <motion.div
                          key={category}
                          className="tech-category"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.1 }}
                        >
                          <div className="tech-category-label">{category}</div>
                          <div className="tech-items">
                            {techs.map((tech, techIdx) => (
                              <motion.div 
                                key={techIdx} 
                                className="tech-item hoverable"
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.2 + techIdx * 0.05 }}
                                whileHover={{ 
                                  scale: 1.1, 
                                  rotate: 2,
                                  boxShadow: `0 4px 12px ${project.color}30`
                                }}
                              >
                                <motion.div 
                                  className="tech-dot" 
                                  style={{ background: project.color }}
                                  animate={{ scale: [1, 1.2, 1] }}
                                  transition={{ duration: 2, repeat: Infinity }}
                                />
                                <span>{tech}</span>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                  
                  {activeTab === 'challenges' && (
                    <div className="challenges-grid">
                      {project.challenges.map((challenge, idx) => (
                        <motion.div
                          key={idx}
                          className="challenge-card hoverable"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          whileHover={{ scale: 1.02, y: -5 }}
                        >
                          <div className="challenge-title">{challenge.title}</div>
                          <div className="challenge-desc">{challenge.description}</div>
                          <motion.div 
                            className="challenge-solution"
                            whileHover={{ backgroundColor: '#ffffff' }}
                          >
                            <div className="solution-label" style={{ color: project.color }}>Solution</div>
                            <div className="solution-text">{challenge.solution}</div>
                          </motion.div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                  
                  {activeTab === 'results' && (
                    <div className="results-grid">
                      {project.results.map((result, idx) => (
                        <motion.div
                          key={idx}
                          className="result-item hoverable"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          whileHover={{ x: 10, backgroundColor: '#ffffff' }}
                        >
                          <motion.div 
                            className="result-check" 
                            style={{ background: `${project.color}15`, color: project.color }}
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.5 }}
                          >
                            <Zap size={14} />
                          </motion.div>
                          <span>{result}</span>
                        </motion.div>
                      ))}
                      
                      <motion.div 
                        className="learned-card" 
                        style={{ borderColor: `${project.color}30` }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        whileHover={{ borderColor: project.color, scale: 1.01 }}
                      >
                        <div className="learned-label">Lesson Learned</div>
                        <div className="learned-text">{project.learned}</div>
                      </motion.div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

// Compact Project Card
const CompactProject = ({ project }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [parallaxRef, parallaxOffset] = useParallax(40);
  
  return (
    <motion.div
      ref={parallaxRef}
      className="compact-card hoverable"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ 
        y: -8, 
        boxShadow: `0 20px 40px ${project.color}15`,
        transition: { duration: 0.3 }
      }}
      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      data-cursor-text="Explore"
    >
      {/* Project Image */}
      <motion.div 
        className="compact-image-wrapper"
        style={{
          x: parallaxOffset.x * 0.5,
          y: parallaxOffset.y * 0.5,
        }}
      >
        <motion.div 
          className="compact-image-overlay" 
          style={{ background: `linear-gradient(135deg, ${project.color}20 0%, transparent 100%)` }}
          animate={isHovered ? { opacity: 0.6 } : { opacity: 0.3 }}
        />
        <motion.img 
          src={project.screenshot} 
          alt={project.title} 
          className="compact-image"
          animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
          transition={{ duration: 0.4 }}
        />
        <motion.div 
          className="compact-color-badge" 
          style={{ background: project.color }}
          animate={{ 
            scale: isHovered ? [1, 1.2, 1] : 1,
            rotate: isHovered ? [0, 10, -10, 0] : 0
          }}
          transition={{ duration: 0.6 }}
        />
      </motion.div>
      
      <div className="compact-content">
        <div className="compact-header">
          <motion.h3 
            className="compact-title"
            animate={isHovered ? { x: 5 } : { x: 0 }}
          >
            {project.title}
          </motion.h3>
          <motion.p 
            className="compact-tagline"
            animate={isHovered ? { x: 5 } : { x: 0 }}
            transition={{ delay: 0.05 }}
          >
            {project.tagline}
          </motion.p>
        </div>
        
        <div className="compact-metrics">
          {project.impact.map((metric, idx) => (
            <motion.div 
              key={idx} 
              className="compact-metric hoverable"
              whileHover={{ scale: 1.1, y: -3 }}
            >
              <div className="compact-metric-value" style={{ color: project.color }}>
                <AnimatedCounter value={metric.value} suffix={metric.suffix} color={project.color} />
              </div>
              <div className="compact-metric-label">{metric.label}</div>
            </motion.div>
          ))}
        </div>
        
        <div className="compact-tech">
          {project.tech.map((tech, idx) => (
            <motion.span 
              key={idx} 
              className="compact-tech-badge hoverable"
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + idx * 0.05 }}
              whileHover={{ 
                scale: 1.15, 
                backgroundColor: project.color,
                color: '#ffffff',
                borderColor: project.color
              }}
            >
              {tech}
            </motion.span>
          ))}
        </div>
        
        <div className="compact-links">
          <MagneticButton 
            href={project.github} 
            external 
            className="compact-link"
            cursorText="Code"
          >
            <Github size={14} />
            <span>Code</span>
          </MagneticButton>
          <MagneticButton 
            href={project.live} 
            external 
            className="compact-link" 
            style={{ borderColor: project.color }}
            cursorText="Demo"
          >
            <ExternalLink size={14} />
            <span>Demo</span>
          </MagneticButton>
        </div>
      </div>
    </motion.div>
  );
};

// Main Component
export default function Projects() {
  const featured = allProjects.filter(p => p.featured);
  const supporting = allProjects.filter(p => !p.featured);
  
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400&family=Syne:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700;800;900&display=swap');
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          background: #ffffff;
          color: #18181b;
          line-height: 1.6;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          overflow-x: hidden;
          cursor: none;
        }
        
        * {
          cursor: none !important;
        }
        
        /* Premium Custom Cursor System */
        .cursor-trail {
          position: fixed;
          top: 0;
          left: 0;
          width: 60px;
          height: 60px;
          border: 1px solid rgba(37, 99, 235, 0.15);
          border-radius: 50%;
          pointer-events: none;
          z-index: 9998;
          transform: translate(-50%, -50%);
          transition: transform 0.15s ease-out;
        }
        
        .custom-cursor {
          position: fixed;
          top: 0;
          left: 0;
          width: 50px;
          height: 50px;
          border: 2.5px solid #2563eb;
          border-radius: 50%;
          pointer-events: none;
          z-index: 10000;
          transform: translate(-50%, -50%);
          transition: all 0.2s cubic-bezier(0.25, 0.1, 0.25, 1);
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(37, 99, 235, 0.05);
          backdrop-filter: blur(10px);
        }
        
        .custom-cursor.hover {
          width: 70px;
          height: 70px;
          background: rgba(37, 99, 235, 0.1);
          border-color: #7c3aed;
        }
        
        .custom-cursor.text {
          width: 90px;
          height: 90px;
          background: rgba(37, 99, 235, 0.15);
          border-color: #2563eb;
        }
        
        .cursor-text {
          font-size: 9px;
          font-weight: 700;
          color: #2563eb;
          text-transform: uppercase;
          letter-spacing: 1px;
          font-family: 'Orbitron', monospace;
        }
        
        .cursor-icon {
          color: #7c3aed;
        }
        
        .cursor-dot {
          position: fixed;
          top: 0;
          left: 0;
          width: 6px;
          height: 6px;
          background: #2563eb;
          border-radius: 50%;
          pointer-events: none;
          z-index: 10001;
          transform: translate(-50%, -50%);
          transition: all 0.1s ease;
          box-shadow: 0 0 10px rgba(37, 99, 235, 0.5);
        }
        
        .cursor-dot.hover {
          width: 10px;
          height: 10px;
          background: #7c3aed;
          box-shadow: 0 0 20px rgba(124, 58, 237, 0.8);
        }
        
        .cursor-dot.text {
          width: 0;
          height: 0;
          opacity: 0;
        }
        
        /* Particles */
        .particles-container {
          position: absolute;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
        }
        
        .particle {
          position: absolute;
          width: 4px;
          height: 4px;
          border-radius: 50%;
          opacity: 0;
        }
        
        /* Counter Glow */
        .counter-glow {
          position: absolute;
          inset: -10px;
          border-radius: 50%;
          opacity: 0.2;
          filter: blur(20px);
          pointer-events: none;
        }
        
        /* Button Ripple */
        .button-ripple {
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background: radial-gradient(circle, rgba(255,255,255,0.4) 0%, transparent 70%);
          pointer-events: none;
        }
        
        /* Image Overlay */
        .image-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 16px;
          backdrop-filter: blur(4px);
        }
        
        /* Hero Section */
        .hero-section {
          max-width: 1280px;
          margin: 0 auto;
          padding: 100px 48px 80px;
          position: relative;
        }
        
        .hero-label {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 20px;
          background: linear-gradient(135deg, #f4f4f5 0%, #fafafa 100%);
          border: 1px solid #e4e4e7;
          border-radius: 100px;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #52525b;
          margin-bottom: 32px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
          font-family: 'Orbitron', monospace;
        }
        
        .hero-title {
          font-family: 'Syne', sans-serif;
          font-size: clamp(2.5rem, 6vw, 5.5rem);
          font-weight: 800;
          line-height: 1.05;
          letter-spacing: -0.04em;
          margin-bottom: 24px;
          color: #09090b;
        }
        
        .hero-gradient {
          font-family: 'Playfair Display', serif;
          font-style: italic;
          background: linear-gradient(135deg, #2563eb 0%, #7c3aed 50%, #ec4899 100%);
          background-size: 200% 200%;
          animation: gradientShift 8s ease infinite;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        .hero-description {
          font-size: 1.25rem;
          color: #52525b;
          max-width: 680px;
          line-height: 1.7;
          font-weight: 400;
        }
        
        .hero-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 64px;
          margin-top: 64px;
        }
        
        .hero-stat-value {
          font-family: 'Orbitron', monospace;
          font-size: 3rem;
          font-weight: 900;
          color: #09090b;
          line-height: 1;
          background: linear-gradient(135deg, #09090b 0%, #52525b 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        
        .hero-stat-label {
          font-size: 0.875rem;
          color: #71717a;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin-top: 12px;
          font-weight: 600;
          font-family: 'Orbitron', monospace;
        }
        
        /* Flagship Section */
        .flagship-section {
          position: relative;
          padding: 100px 0;
          overflow: hidden;
        }
        
        .flagship-section:not(:last-child) {
          margin-bottom: 80px;
        }
        
        .bg-glow {
          position: absolute;
          inset: 0;
          pointer-events: none;
          opacity: 1;
          transition: opacity 0.6s ease;
        }
        
        .bg-watermark {
          position: absolute;
          top: 15%;
          font-family: 'Syne', sans-serif;
          font-size: 15rem;
          font-weight: 900;
          color: rgba(0, 0, 0, 0.02);
          pointer-events: none;
          user-select: none;
          z-index: 0;
          line-height: 1;
        }
        
        .flagship-container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 48px;
          position: relative;
          z-index: 1;
        }
        
        .flagship-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
        }
        
        .flagship-grid.reverse {
          direction: rtl;
        }
        
        .flagship-grid.reverse > * {
          direction: ltr;
        }
        
        @media (max-width: 1024px) {
          .flagship-grid {
            grid-template-columns: 1fr;
            gap: 56px;
          }
          
          .flagship-grid.reverse {
            direction: ltr;
          }
        }
        
        /* Image Side */
        .flagship-image-wrapper {
          position: relative;
        }
        
        .precision-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          background: linear-gradient(135deg, #f4f4f5 0%, #ffffff 100%);
          border: 1px solid #e4e4e7;
          border-radius: 100px;
          font-size: 0.7rem;
          font-weight: 700;
          color: #18181b;
          margin-bottom: 20px;
          box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
          font-family: 'Orbitron', monospace;
          letter-spacing: 0.05em;
        }
        
        .flagship-image-container {
          position: relative;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.12);
          transform-style: preserve-3d;
          perspective: 1000px;
        }
        
        .image-glow {
          position: absolute;
          inset: -50%;
          opacity: 0.2;
          filter: blur(60px);
          z-index: -1;
        }
        
        .flagship-image {
          width: 100%;
          height: auto;
          display: block;
          border: 1px solid #e4e4e7;
          border-radius: 20px;
        }
        
        .image-meta {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-top: 20px;
          font-size: 0.875rem;
          color: #71717a;
          font-weight: 500;
          font-family: 'Orbitron', monospace;
        }
        
        /* Content Side */
        .flagship-content {
          display: flex;
          flex-direction: column;
          gap: 36px;
        }
        
        .project-hero {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        
        .project-title {
          font-family: 'Syne', sans-serif;
          font-size: clamp(1.75rem, 4vw, 3.75rem);
          font-weight: 900;
          line-height: 1.05;
          letter-spacing: -0.03em;
          color: #09090b;
          position: relative;
          display: inline-block;
          width: fit-content;
        }
        
        .title-underline {
          position: absolute;
          bottom: -12px;
          left: 0;
          height: 5px;
          border-radius: 3px;
        }
        
        .project-subtitle {
          font-size: 1.125rem;
          font-weight: 700;
          color: #3f3f46;
          margin-top: 8px;
          font-family: 'Syne', sans-serif;
        }
        
        .project-tagline {
          font-size: 1rem;
          color: #71717a;
          font-weight: 500;
        }
        
        /* Impact Metrics */
        .impact-showcase {
          display: flex;
          gap: 48px;
          padding: 28px 0;
          border-top: 2px solid #e4e4e7;
          border-bottom: 2px solid #e4e4e7;
        }
        
        .impact-metric {
          display: flex;
          flex-direction: column;
          gap: 8px;
          position: relative;
        }
        
        .metric-value {
          font-family: 'Orbitron', monospace;
          font-size: 3.25rem;
          font-weight: 900;
          line-height: 1;
          letter-spacing: -0.03em;
        }
        
        .metric-label {
          font-size: 0.75rem;
          color: #71717a;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          font-weight: 600;
          font-family: 'Orbitron', monospace;
        }
        
        /* CTAs */
        .cta-row {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
        }
        
        .btn-primary,
        .btn-secondary {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 14px 28px;
          border-radius: 12px;
          font-size: 0.9375rem;
          font-weight: 700;
          text-decoration: none;
          transition: all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1);
          min-height: 48px;
          position: relative;
          overflow: hidden;
          font-family: 'Orbitron', monospace;
          letter-spacing: 0.05em;
        }
        
        .btn-primary {
          background: #2563eb;
          color: #fff;
          border: none;
          box-shadow: 0 4px 16px rgba(37, 99, 235, 0.25);
        }
        
        .btn-primary:hover {
          box-shadow: 0 8px 24px rgba(37, 99, 235, 0.35);
        }
        
        .btn-secondary {
          background: #f4f4f5;
          border: 2px solid #e4e4e7;
          color: #18181b;
        }
        
        .btn-secondary:hover {
          background: #e4e4e7;
          border-color: #d4d4d8;
        }
        
        /* Problem & Solution */
        .ps-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }
        
        @media (max-width: 768px) {
          .ps-grid {
            grid-template-columns: 1fr;
          }
        }
        
        .ps-card {
          padding: 24px;
          border-radius: 16px;
          border: 2px solid;
          transition: all 0.3s ease;
        }
        
        .ps-card.problem {
          background: linear-gradient(135deg, #fef2f2 0%, #ffffff 100%);
          border-color: #fecaca;
        }
        
        .ps-card.solution {
          background: linear-gradient(135deg, #f0fdf4 0%, #ffffff 100%);
          border-color: #bbf7d0;
        }
        
        .ps-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 10px;
          margin-bottom: 16px;
        }
        
        .ps-card.problem .ps-icon {
          background: rgba(239, 68, 68, 0.15);
          color: #ef4444;
        }
        
        .ps-card.solution .ps-icon {
          background: rgba(34, 197, 94, 0.15);
          color: #22c55e;
        }
        
        .ps-label {
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin-bottom: 12px;
          font-family: 'Orbitron', monospace;
        }
        
        .ps-card.problem .ps-label {
          color: #ef4444;
        }
        
        .ps-card.solution .ps-label {
          color: #22c55e;
        }
        
        .ps-text {
          font-size: 0.9375rem;
          color: #27272a;
          line-height: 1.7;
          font-weight: 500;
        }
        
        /* Tab System */
        .tab-system {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        
        .tab-nav {
          display: flex;
          gap: 10px;
          padding: 8px;
          background: linear-gradient(135deg, #fafafa 0%, #f4f4f5 100%);
          border: 2px solid #e4e4e7;
          border-radius: 14px;
          position: relative;
          flex-wrap: wrap;
        }
        
        .tab-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 20px;
          background: transparent;
          border: none;
          border-radius: 10px;
          font-size: 0.875rem;
          font-weight: 700;
          color: #71717a;
          transition: color 0.2s ease;
          position: relative;
          z-index: 2;
          min-height: 48px;
          font-family: 'Orbitron', monospace;
          letter-spacing: 0.05em;
        }
        
        .tab-btn:hover {
          color: #52525b;
        }
        
        .tab-btn.active {
          color: #ffffff;
        }
        
        .tab-indicator {
          position: absolute;
          top: 8px;
          left: 8px;
          height: calc(100% - 16px);
          border-radius: 10px;
          z-index: 1;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }
        
        .tab-content {
          padding: 28px;
          background: linear-gradient(135deg, #fafafa 0%, #ffffff 100%);
          border: 2px solid #e4e4e7;
          border-radius: 16px;
        }
        
        /* Architecture */
        .arch-grid {
          display: grid;
          gap: 14px;
        }
        
        .arch-item {
          padding: 20px;
          background: #ffffff;
          border: 2px solid #e4e4e7;
          border-radius: 12px;
          transition: all 0.3s ease;
        }
        
        .arch-label {
          font-size: 0.75rem;
          font-weight: 700;
          color: #71717a;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin-bottom: 8px;
          font-family: 'Orbitron', monospace;
        }
        
        .arch-value {
          font-size: 0.9375rem;
          color: #18181b;
          line-height: 1.6;
          font-weight: 600;
        }
        
        /* Tech Stack */
        .tech-categories {
          display: grid;
          gap: 28px;
        }
        
        .tech-category {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        
        .tech-category-label {
          font-size: 0.875rem;
          font-weight: 700;
          color: #52525b;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          font-family: 'Orbitron', monospace;
        }
        
        .tech-items {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
          gap: 10px;
        }
        
        .tech-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 16px;
          background: #ffffff;
          border: 2px solid #e4e4e7;
          border-radius: 10px;
          font-size: 0.875rem;
          color: #18181b;
          transition: all 0.3s ease;
          font-weight: 600;
        }
        
        .tech-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          flex-shrink: 0;
        }
        
        /* Challenges */
        .challenges-grid {
          display: grid;
          gap: 18px;
        }
        
        .challenge-card {
          padding: 24px;
          background: #ffffff;
          border: 2px solid #e4e4e7;
          border-radius: 14px;
          transition: all 0.3s ease;
        }
        
        .challenge-title {
          font-size: 1rem;
          font-weight: 700;
          color: #09090b;
          margin-bottom: 12px;
          font-family: 'Syne', sans-serif;
        }
        
        .challenge-desc {
          font-size: 0.9375rem;
          color: #52525b;
          line-height: 1.7;
          margin-bottom: 16px;
          font-weight: 500;
        }
        
        .challenge-solution {
          padding: 16px;
          background: #f4f4f5;
          border-radius: 10px;
          transition: all 0.3s ease;
        }
        
        .solution-label {
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin-bottom: 8px;
          font-family: 'Orbitron', monospace;
        }
        
        .solution-text {
          font-size: 0.9375rem;
          color: #18181b;
          line-height: 1.7;
          font-weight: 600;
        }
        
        /* Results */
        .results-grid {
          display: grid;
          gap: 14px;
        }
        
        .result-item {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          padding: 16px;
          background: #ffffff;
          border: 2px solid #e4e4e7;
          border-radius: 10px;
          font-size: 0.9375rem;
          color: #18181b;
          line-height: 1.7;
          transition: all 0.3s ease;
          font-weight: 500;
        }
        
        .result-check {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 28px;
          height: 28px;
          flex-shrink: 0;
          border-radius: 7px;
          transition: all 0.3s ease;
        }
        
        .learned-card {
          margin-top: 20px;
          padding: 24px;
          background: linear-gradient(135deg, #fafafa 0%, #ffffff 100%);
          border: 2px solid;
          border-radius: 14px;
          transition: all 0.3s ease;
        }
        
        .learned-label {
          font-size: 0.875rem;
          font-weight: 700;
          color: #52525b;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin-bottom: 12px;
          font-family: 'Orbitron', monospace;
        }
        
        .learned-text {
          font-size: 1rem;
          color: #18181b;
          line-height: 1.7;
          font-style: italic;
          font-weight: 500;
        }
        
        /* Supporting Projects */
        .supporting-section {
          max-width: 1280px;
          margin: 0 auto;
          padding: 100px 48px;
        }
        
        .supporting-header {
          margin-bottom: 56px;
        }
        
        .supporting-title {
          font-family: 'Syne', sans-serif;
          font-size: clamp(1.75rem, 3.5vw, 2.75rem);
          font-weight: 900;
          color: #09090b;
          margin-bottom: 16px;
        }
        
        .supporting-desc {
          font-size: 1.125rem;
          color: #71717a;
          font-weight: 500;
        }
        
        .compact-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 32px;
        }
        
        .compact-card {
          background: linear-gradient(135deg, #fafafa 0%, #ffffff 100%);
          border: 2px solid #e4e4e7;
          border-radius: 18px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          transition: all 0.4s cubic-bezier(0.25, 0.1, 0.25, 1);
        }
        
        .compact-image-wrapper {
          position: relative;
          width: 100%;
          height: 220px;
          overflow: hidden;
          background: linear-gradient(135deg, #f4f4f5 0%, #fafafa 100%);
        }
        
        .compact-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s cubic-bezier(0.25, 0.1, 0.25, 1);
        }
        
        .compact-image-overlay {
          position: absolute;
          inset: 0;
          pointer-events: none;
          transition: opacity 0.4s ease;
        }
        
        .compact-color-badge {
          position: absolute;
          top: 16px;
          right: 16px;
          width: 32px;
          height: 32px;
          border-radius: 10px;
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
        }
        
        .compact-content {
          padding: 28px;
          display: flex;
          flex-direction: column;
          gap: 20px;
          flex: 1;
        }
        
        .compact-header {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        
        .compact-title {
          font-family: 'Syne', sans-serif;
          font-size: 1.375rem;
          font-weight: 900;
          color: #09090b;
          line-height: 1.3;
        }
        
        .compact-tagline {
          font-size: 0.9375rem;
          color: #71717a;
          line-height: 1.6;
          font-weight: 500;
        }
        
        .compact-metrics {
          display: flex;
          gap: 28px;
          padding: 20px 0;
          border-top: 2px solid #e4e4e7;
          border-bottom: 2px solid #e4e4e7;
        }
        
        .compact-metric {
          display: flex;
          flex-direction: column;
          gap: 6px;
          flex: 1;
        }
        
        .compact-metric-value {
          font-family: 'Orbitron', monospace;
          font-size: 1.75rem;
          font-weight: 900;
          line-height: 1;
        }
        
        .compact-metric-label {
          font-size: 0.7rem;
          color: #71717a;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          line-height: 1.4;
          font-weight: 600;
          font-family: 'Orbitron', monospace;
        }
        
        .compact-tech {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        
        .compact-tech-badge {
          padding: 8px 14px;
          background: #ffffff;
          border: 2px solid #e4e4e7;
          border-radius: 8px;
          font-size: 0.8125rem;
          color: #52525b;
          font-weight: 700;
          transition: all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1);
        }
        
        .compact-links {
          display: flex;
          gap: 14px;
          margin-top: auto;
        }
        
        .compact-link {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          flex: 1;
          padding: 14px;
          background: #ffffff;
          border: 2px solid #e4e4e7;
          border-radius: 10px;
          font-size: 0.875rem;
          font-weight: 700;
          color: #18181b;
          text-decoration: none;
          transition: all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1);
          min-height: 48px;
          font-family: 'Orbitron', monospace;
          letter-spacing: 0.03em;
        }
        
        /* Mobile Responsive */
        @media (max-width: 768px) {
          body {
            cursor: auto;
          }
          
          * {
            cursor: auto !important;
          }
          
          .custom-cursor,
          .cursor-dot,
          .cursor-trail {
            display: none;
          }
          
          .hero-section {
            padding: 80px 24px 64px;
          }
          
          .hero-title {
            font-size: 2.25rem;
          }
          
          .hero-stats {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          
          .hero-stat-value {
            font-size: 2rem;
          }
          
          .flagship-container {
            padding: 0 24px;
          }
          
          .flagship-grid {
            gap: 40px;
          }
          
          .bg-watermark {
            font-size: 5rem;
          }
          
          .impact-showcase {
            flex-direction: column;
            gap: 24px;
          }
          
          .metric-value {
            font-size: 2.25rem;
          }
          
          .supporting-section {
            padding: 80px 24px;
          }
          
          .compact-grid {
            grid-template-columns: 1fr;
          }
        }
        
        /* Scrollbar */
        ::-webkit-scrollbar {
          width: 12px;
        }
        
        ::-webkit-scrollbar-track {
          background: #fafafa;
        }
        
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(135deg, #d4d4d8 0%, #a1a1aa 100%);
          border-radius: 6px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(135deg, #a1a1aa 0%, #71717a 100%);
        }
      `}</style>

      <CustomCursor />
      
      <div style={{ minHeight: '100vh', background: '#ffffff' }}>
        {/* Hero Section */}
        <motion.div 
          className="hero-section"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <motion.div 
              className="hero-label"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles size={12} />
              </motion.div>
              <span>Engineering Portfolio</span>
            </motion.div>
            
            <h1 className="hero-title">
              Systems built to <span className="hero-gradient">solve real constraints</span>
            </h1>
            
            <p className="hero-description">
              Full-stack applications designed with architecture in mind — 
              not just features. Each project reflects real trade-offs, real constraints, and working code.
            </p>
          </motion.div>
          
          <motion.div 
            className="hero-stats"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            {[
              { value: '5+', label: 'Shipped Projects' },
              { value: '3+', label: 'Internships' },
              { value: '90%+', label: 'Avg Model Accuracy' }
            ].map((stat, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ scale: 1.05, y: -5 }}
                className="hoverable"
              >
                <div className="hero-stat-value">{stat.value}</div>
                <div className="hero-stat-label">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
        
        {/* Flagship Projects */}
        {featured.map((project, index) => (
          <FlagshipProject key={project.id} project={project} index={index} />
        ))}
        
        {/* Supporting Projects */}
        <div className="supporting-section">
          <motion.div 
            className="supporting-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="supporting-title">Additional Projects</h2>
            <p className="supporting-desc">
              ML and NLP systems covering classification, prediction, and text analysis
            </p>
          </motion.div>
          
          <div className="compact-grid">
            {supporting.map((project, idx) => (
              <CompactProject key={project.id} project={project} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}