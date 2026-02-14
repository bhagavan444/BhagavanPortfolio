import React, { useState, useEffect, useRef } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import {
  ExternalLink, Github, ArrowRight, Sparkles, TrendingUp, 
  Zap, Server, Code2, Target, AlertCircle
} from 'lucide-react';


// All projects data
const allProjects = [
 {
  id: 1,
  title: "ATS-Based Resume Builder",
  tagline: "Full-stack resume optimization platform",
  subtitle: "Improving ATS compatibility using keyword analysis",
  github: "https://github.com/bhagavan444/Resumebuilderwebapp",
  live: null,
  year: "2025",
  duration: "3 months",
  color: "#2563eb",
  featured: true,

  problem:
    "Many candidates lose job opportunities due to poorly formatted resumes and missing keywords required by Applicant Tracking Systems (ATS).",

  solution:
    "Built a MERN stack application that allows users to create structured resumes and analyze keyword relevance against job descriptions using backend parsing logic and scoring algorithms.",

  impact: [
    { label: "ATS Score Achieved", value: 90, suffix: "%+" },
    { label: "Resume Templates", value: 5, suffix: "+" },
    { label: "OAuth Providers", value: 2, suffix: "" }
  ],

  architecture: [
    { label: "Frontend", value: "React with Context API" },
    { label: "Backend", value: "Node.js + Express REST APIs" },
    { label: "Authentication", value: "Google & GitHub OAuth" },
    { label: "Resume Scoring", value: "Keyword Matching + PDF Parsing" },
    { label: "Database", value: "MongoDB Atlas" }
  ],

  techStack: {
    Frontend: ["React", "HTML", "CSS"],
    Backend: ["Node.js", "Express"],
    Database: ["MongoDB"],
    AI_Logic: ["Keyword Extraction", "PDF Parsing"],
    Tools: ["Git", "Postman"]
  },

  challenges: [
    {
      title: "Real-time ATS Scoring",
      description: "Implementing accurate keyword matching across varying job description formats.",
      solution: "Built a normalized scoring algorithm with weighted keyword importance and context awareness."
    }
  ],

  results: [
    "90%+ ATS compatibility score across test resumes",
    "Reduced resume creation time by 60%",
    "Successful OAuth integration with zero security incidents"
  ],

  learned:
    "Strengthened full-stack development skills, authentication workflows, and backend parsing logic for real-world applications.",

  screenshot: "/images/resume.jpg"
},

  {
    id: 2,
    title: "AI Chatbot Web Application",
    tagline: "AI-powered conversational assistant",
    subtitle: "Frontend–backend AI API integration",
    github: "https://github.com/bhagavan444/chatbotwebapp",
    live: null,
    year: "2025",
    duration: "4 months",
    color: "#7c3aed",
    featured: true,

    problem:
      "Users require an accessible web interface to interact with AI models without complex setup.",

    solution:
      "Developed a React frontend integrated with a Flask backend that connects to external AI APIs to generate real-time conversational responses.",

    impact: [
      { label: "Average Response Time", value: 500, suffix: "ms" },
      { label: "AI Integration", value: 1, suffix: " Provider" },
      { label: "Async Handling", value: 100, suffix: "%" }
    ],

    architecture: [
      { label: "Frontend", value: "React with asynchronous API calls" },
      { label: "Backend", value: "Flask REST API" },
      { label: "AI Service", value: "External AI API Integration" }
    ],

    techStack: {
      Frontend: ["React", "JavaScript"],
      Backend: ["Flask", "Python"],
      AI: ["External AI API"],
      Tools: ["Git"]
    },

    challenges: [
      {
        title: "API Rate Limiting",
        description: "Managing external API quota while maintaining responsive user experience.",
        solution: "Implemented request queuing with exponential backoff and user-facing status indicators."
      }
    ],

    results: [
      "Sub-500ms average response time maintained",
      "100% async operation success rate",
      "Zero API timeout errors in production"
    ],

    learned:
      "Improved understanding of API orchestration, async request handling, and frontend–backend communication.",

    screenshot:
      "/images/chatbot.jpg"
  },

  {
    id: 3,
    title: "Career Path Recommendation System",
    tagline: "Machine learning-based career guidance",
    github: "https://github.com/bhagavan444/Career-Path-Recommendation",
    live: null,
    year: "2024",
    color: "#10b981",
    featured: false,

    problem:
      "Students often struggle to identify suitable career paths based on their interests and skill levels.",

    solution:
      "Implemented a supervised machine learning model to analyze user inputs and recommend relevant career domains.",

    impact: [
      { label: "Model Accuracy", value: 90, suffix: "%+" },
      { label: "Career Domains", value: 20, suffix: "+" },
      { label: "Prediction Time", value: 200, suffix: "ms" }
    ],

    tech: ["Python", "Scikit-learn", "Flask", "React"],

    screenshot:
      "/images/carrer.jpg"
  },

  {
    id: 4,
    title: "Fake News Detection System",
    tagline: "NLP-based misinformation classifier",
    github: "https://github.com/bhagavan444/News-detector",
    live: null,
    year: "2023",
    color: "#ef4444",
    featured: false,

    problem:
      "Rapid spread of misinformation requires automated text classification systems.",

    solution:
      "Built an NLP pipeline using TF-IDF vectorization and classification algorithms to detect fake news articles.",

    impact: [
      { label: "Model Accuracy", value: 90, suffix: "%+" },
      { label: "Vectorization", value: 1, suffix: " TF-IDF Pipeline" },
      { label: "Processing Speed", value: 100, suffix: "ms" }
    ],

    tech: ["Python", "Scikit-learn", "NLP", "TF-IDF"],

    screenshot:
      "/images/fake.jpg"
  },

  {
    id: 5,
    title: "Heart Disease Prediction System",
    tagline: "ML-based medical risk assessment tool",
    github: "https://github.com/bhagavan444/Heart-Disease-Prediction",
    live: null,
    year: "2024",
    color: "#f59e0b",
    featured: false,

    problem:
      "Early detection of heart disease risk can assist preventive healthcare decisions.",

    solution:
      "Developed a supervised learning classification model to predict heart disease probability using medical dataset features.",

    impact: [
      { label: "Model Accuracy", value: 85, suffix: "%+" },
      { label: "Dataset Records", value: 300, suffix: "+" },
      { label: "Precision", value: 80, suffix: "%+" }
    ],

    tech: ["Python", "Scikit-learn", "Flask", "SQLite"],

    screenshot:
      "/images/heart.jpg"
  }
];



// Magnetic Button Component (with touch device detection)
const MagneticButton = ({ children, href, external = false, className = "", style = {} }) => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  
  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);
  
  const handleMouse = (e) => {
    if (!ref.current || isTouchDevice) return;
    const { clientX, clientY } = e;
    const { width, height, left, top } = ref.current.getBoundingClientRect();
    const x = (clientX - (left + width / 2)) * 0.1;
    const y = (clientY - (top + height / 2)) * 0.1;
    setPosition({ x, y });
  };
  
  const reset = () => setPosition({ x: 0, y: 0 });
  
  const buttonContent = (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 200, damping: 20, mass: 0.1 }}
      className={className}
      style={style}
    >
      {children}
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

// Animated Counter
const AnimatedCounter = ({ value, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let start = 0;
          const end = parseInt(value);
          if (start === end) return;
          
          const duration = 1600;
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
  
  return <span ref={ref}>{count}{suffix}</span>;
};

// Flagship Project Component
const FlagshipProject = ({ project, index }) => {
  const [activeTab, setActiveTab] = useState('architecture');
  const isEven = index % 2 === 0;
  
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      className="flagship-section"
    >
      {/* Background Elements */}
      <div className="bg-glow" style={{ 
        background: `radial-gradient(circle at ${isEven ? '20%' : '80%'} 50%, ${project.color}0D 0%, transparent 50%)` 
      }} />
      <div className="bg-watermark" style={{ left: isEven ? '5%' : 'auto', right: isEven ? 'auto' : '5%' }}>
        {project.title.split(' ')[0]}
      </div>
      
      <div className="flagship-container">
        <div className={`flagship-grid ${isEven ? '' : 'reverse'}`}>
          {/* Image Side */}
          <motion.div 
            className="flagship-image-wrapper"
            initial={{ opacity: 0, x: isEven ? -24 : 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="precision-badge">
              <Sparkles size={12} />
              <span>Built With Precision</span>
            </div>
            
            <motion.div
              className="flagship-image-container"
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <div className="image-glow" style={{ background: `${project.color}30` }} />
              <img src={project.screenshot} alt={project.title} className="flagship-image" />
            </motion.div>
            
            <div className="image-meta">
              <span>{project.year}</span>
              <span>•</span>
              <span>{project.duration}</span>
            </div>
          </motion.div>
          
          {/* Content Side */}
          <div className="flagship-content">
            {/* Hero */}
            <div className="project-hero">
              <motion.h2 
                className="project-title"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
              >
                {project.title}
                <div className="title-underline" style={{ background: project.color }} />
              </motion.h2>
              
              <p className="project-subtitle">{project.subtitle}</p>
              <p className="project-tagline">{project.tagline}</p>
            </div>
            
            {/* Impact Metrics */}
            <motion.div 
              className="impact-showcase"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            >
              {project.impact.map((metric, idx) => (
                <div key={idx} className="impact-metric">
                  <div className="metric-value" style={{ color: project.color }}>
                    <AnimatedCounter value={metric.value} suffix={metric.suffix} />
                  </div>
                  <div className="metric-label">{metric.label}</div>
                </div>
              ))}
            </motion.div>
            
            {/* CTAs */}
            <div className="cta-row">
              <MagneticButton href={project.github} external className="btn-primary" style={{ background: project.color }}>
                <Github size={16} />
                <span>View Source</span>
                <ArrowRight size={16} />
              </MagneticButton>
              
              <MagneticButton href={project.live} external className="btn-secondary">
                <ExternalLink size={16} />
                <span>Live Demo</span>
              </MagneticButton>
            </div>
            
            {/* Problem & Solution */}
            <div className="ps-grid">
              <motion.div 
                className="ps-card problem"
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <div className="ps-icon">
                  <AlertCircle size={16} />
                </div>
                <div className="ps-label">Problem</div>
                <div className="ps-text">{project.problem}</div>
              </motion.div>
              
              <motion.div 
                className="ps-card solution"
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <div className="ps-icon">
                  <Target size={16} />
                </div>
                <div className="ps-label">Solution</div>
                <div className="ps-text">{project.solution}</div>
              </motion.div>
            </div>
            
            {/* Tab System */}
            <div className="tab-system">
              <div className="tab-nav">
                {['architecture', 'tech', 'challenges', 'results'].map((tab) => (
                  <button
                    key={tab}
                    className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab === 'architecture' && <Server size={14} />}
                    {tab === 'tech' && <Code2 size={14} />}
                    {tab === 'challenges' && <TrendingUp size={14} />}
                    {tab === 'results' && <Zap size={14} />}
                    <span>{tab.charAt(0).toUpperCase() + tab.slice(1)}</span>
                  </button>
                ))}
                <motion.div 
                  className="tab-indicator"
                  layoutId={`indicator-${project.id}`}
                  style={{ background: project.color }}
                  transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                />
              </div>
              
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
                className="tab-content"
              >
                {activeTab === 'architecture' && (
                  <div className="arch-grid">
                    {project.architecture.map((section, idx) => (
                      <motion.div
                        key={idx}
                        className="arch-item"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.08, duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
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
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.08, duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
                      >
                        <div className="tech-category-label">{category}</div>
                        <div className="tech-items">
                          {techs.map((tech, techIdx) => (
                            <div key={techIdx} className="tech-item">
                              <div className="tech-dot" style={{ background: project.color }} />
                              <span>{tech}</span>
                            </div>
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
                        className="challenge-card"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.08, duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
                      >
                        <div className="challenge-title">{challenge.title}</div>
                        <div className="challenge-desc">{challenge.description}</div>
                        <div className="challenge-solution">
                          <div className="solution-label" style={{ color: project.color }}>Solution</div>
                          <div className="solution-text">{challenge.solution}</div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
                
                {activeTab === 'results' && (
                  <div className="results-grid">
                    {project.results.map((result, idx) => (
                      <motion.div
                        key={idx}
                        className="result-item"
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.08, duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
                      >
                        <div className="result-check" style={{ background: `${project.color}15`, color: project.color }}>
                          <Zap size={14} />
                        </div>
                        <span>{result}</span>
                      </motion.div>
                    ))}
                    
                    <div className="learned-card" style={{ borderColor: `${project.color}20` }}>
                      <div className="learned-label">Lesson Learned</div>
                      <div className="learned-text">{project.learned}</div>
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

// Compact Project Card
const CompactProject = ({ project }) => {
  return (
    <motion.div
      className="compact-card"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      whileHover={{ y: -4, boxShadow: "0 16px 32px rgba(0, 0, 0, 0.08)" }}
      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {/* Project Image */}
      <motion.div 
        className="compact-image-wrapper"
        whileHover={{ scale: 1.03 }}
        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <div className="compact-image-overlay" style={{ background: `linear-gradient(135deg, ${project.color}15 0%, transparent 100%)` }} />
        <img 
          src={project.screenshot} 
          alt={project.title} 
          className="compact-image"
        />
        <div className="compact-color-badge" style={{ background: project.color }} />
      </motion.div>
      
      <div className="compact-content">
        <div className="compact-header">
          <motion.h3 
            className="compact-title"
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08, duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {project.title}
          </motion.h3>
          <motion.p 
            className="compact-tagline"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.12, duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {project.tagline}
          </motion.p>
        </div>
        
        <motion.div 
          className="compact-metrics"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.16, duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {project.impact.map((metric, idx) => (
            <motion.div 
              key={idx} 
              className="compact-metric"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + idx * 0.06, duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <div className="compact-metric-value" style={{ color: project.color }}>
                <AnimatedCounter value={metric.value} suffix={metric.suffix} />
              </div>
              <div className="compact-metric-label">{metric.label}</div>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          className="compact-tech"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.24, duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {project.tech.map((tech, idx) => (
            <motion.span 
              key={idx} 
              className="compact-tech-badge"
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.28 + idx * 0.04, duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
              whileHover={{ scale: 1.05, backgroundColor: '#ffffff', borderColor: project.color }}
            >
              {tech}
            </motion.span>
          ))}
        </motion.div>
        
        <motion.div 
          className="compact-links"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.32, duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <MagneticButton href={project.github} external className="compact-link">
            <Github size={14} />
            <span>Code</span>
          </MagneticButton>
          <MagneticButton href={project.live} external className="compact-link" style={{ borderColor: project.color }}>
            <ExternalLink size={14} />
            <span>Demo</span>
          </MagneticButton>
        </motion.div>
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
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Space+Grotesk:wght@500;600;700&display=swap');
        
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
        }
        
        /* Hero Section */
        .hero-section {
          max-width: 1280px;
          margin: 0 auto;
          padding: 80px 48px 64px;
          position: relative;
        }
        
        .hero-label {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          background: #f4f4f5;
          border: 1px solid #e4e4e7;
          border-radius: 100px;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          color: #52525b;
          margin-bottom: 24px;
        }
        
        .hero-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(2.5rem, 6vw, 4.5rem);
          font-weight: 700;
          line-height: 1.1;
          letter-spacing: -0.025em;
          margin-bottom: 16px;
          color: #09090b;
        }
        
        .hero-gradient {
          background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .hero-description {
          font-size: 1.125rem;
          color: #52525b;
          max-width: 640px;
          line-height: 1.65;
        }
        
        .hero-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 48px;
          margin-top: 48px;
        }
        
        .hero-stat-value {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 2.25rem;
          font-weight: 700;
          color: #09090b;
          line-height: 1;
        }
        
        .hero-stat-label {
          font-size: 0.8125rem;
          color: #71717a;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-top: 8px;
        }
        
        /* Flagship Section */
        .flagship-section {
          position: relative;
          padding: 80px 0;
          overflow: hidden;
        }
        
        .flagship-section:not(:last-child) {
          margin-bottom: 64px;
        }
        
        .bg-glow {
          position: absolute;
          inset: 0;
          pointer-events: none;
          opacity: 1;
        }
        
        .bg-watermark {
          position: absolute;
          top: 20%;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 12rem;
          font-weight: 900;
          color: rgba(0, 0, 0, 0.015);
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
          gap: 64px;
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
            gap: 48px;
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
          gap: 6px;
          padding: 6px 12px;
          background: #f4f4f5;
          border: 1px solid #e4e4e7;
          border-radius: 100px;
          font-size: 0.6875rem;
          font-weight: 600;
          color: #18181b;
          margin-bottom: 16px;
        }
        
        .flagship-image-container {
          position: relative;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.08);
        }
        
        .image-glow {
          position: absolute;
          inset: -40%;
          opacity: 0.15;
          filter: blur(48px);
          z-index: -1;
        }
        
        .flagship-image {
          width: 100%;
          height: auto;
          display: block;
          border: 1px solid #e4e4e7;
          border-radius: 16px;
        }
        
        .image-meta {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-top: 16px;
          font-size: 0.8125rem;
          color: #71717a;
        }
        
        /* Content Side */
        .flagship-content {
          display: flex;
          flex-direction: column;
          gap: 32px;
        }
        
        .project-hero {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        
        .project-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(1.75rem, 3.5vw, 3rem);
          font-weight: 700;
          line-height: 1.15;
          letter-spacing: -0.02em;
          color: #09090b;
          position: relative;
          display: inline-block;
          width: fit-content;
        }
        
        .title-underline {
          position: absolute;
          bottom: -8px;
          left: 0;
          width: 100%;
          height: 3px;
          border-radius: 2px;
          animation: expandLine 0.6s cubic-bezier(0.25, 0.1, 0.25, 1) forwards;
        }
        
        @keyframes expandLine {
          from { width: 0; }
          to { width: 100%; }
        }
        
        .project-subtitle {
          font-size: 1.0625rem;
          font-weight: 600;
          color: #3f3f46;
          margin-top: 8px;
        }
        
        .project-tagline {
          font-size: 0.9375rem;
          color: #71717a;
        }
        
        /* Impact Metrics */
        .impact-showcase {
          display: flex;
          gap: 40px;
          padding: 24px 0;
          border-top: 1px solid #e4e4e7;
          border-bottom: 1px solid #e4e4e7;
        }
        
        .impact-metric {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        
        .metric-value {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 2.5rem;
          font-weight: 700;
          line-height: 1;
          letter-spacing: -0.015em;
        }
        
        .metric-label {
          font-size: 0.75rem;
          color: #71717a;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          font-weight: 500;
        }
        
        /* CTAs */
        .cta-row {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }
        
        .btn-primary,
        .btn-secondary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 20px;
          border-radius: 10px;
          font-size: 0.875rem;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.25s cubic-bezier(0.25, 0.1, 0.25, 1);
          cursor: pointer;
          min-height: 44px;
        }
        
        .btn-primary {
          background: #2563eb;
          color: #fff;
          border: none;
          box-shadow: 0 2px 8px rgba(37, 99, 235, 0.15);
        }
        
        .btn-primary:hover {
          box-shadow: 0 4px 12px rgba(37, 99, 235, 0.25);
          transform: translateY(-1px);
        }
        
        .btn-secondary {
          background: #f4f4f5;
          border: 1px solid #e4e4e7;
          color: #18181b;
        }
        
        .btn-secondary:hover {
          background: #e4e4e7;
          border-color: #d4d4d8;
          transform: translateY(-1px);
        }
        
        /* Problem & Solution */
        .ps-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        
        @media (max-width: 768px) {
          .ps-grid {
            grid-template-columns: 1fr;
          }
        }
        
        .ps-card {
          padding: 20px;
          border-radius: 12px;
          border: 1px solid #e4e4e7;
        }
        
        .ps-card.problem {
          background: #fef2f2;
          border-color: #fecaca;
        }
        
        .ps-card.solution {
          background: #f0fdf4;
          border-color: #bbf7d0;
        }
        
        .ps-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border-radius: 8px;
          margin-bottom: 12px;
        }
        
        .ps-card.problem .ps-icon {
          background: rgba(239, 68, 68, 0.1);
          color: #ef4444;
        }
        
        .ps-card.solution .ps-icon {
          background: rgba(34, 197, 94, 0.1);
          color: #22c55e;
        }
        
        .ps-label {
          font-size: 0.6875rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 8px;
        }
        
        .ps-card.problem .ps-label {
          color: #ef4444;
        }
        
        .ps-card.solution .ps-label {
          color: #22c55e;
        }
        
        .ps-text {
          font-size: 0.875rem;
          color: #27272a;
          line-height: 1.6;
        }
        
        /* Tab System */
        .tab-system {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        
        .tab-nav {
          display: flex;
          gap: 8px;
          padding: 6px;
          background: #fafafa;
          border: 1px solid #e4e4e7;
          border-radius: 10px;
          position: relative;
          flex-wrap: wrap;
        }
        
        .tab-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 10px 16px;
          background: transparent;
          border: none;
          border-radius: 7px;
          font-size: 0.8125rem;
          font-weight: 600;
          color: #71717a;
          cursor: pointer;
          transition: color 0.2s ease;
          position: relative;
          z-index: 2;
          min-height: 44px;
        }
        
        .tab-btn:hover {
          color: #52525b;
        }
        
        .tab-btn.active {
          color: #ffffff;
        }
        
        .tab-btn:focus-visible {
          outline: 2px solid #2563eb;
          outline-offset: 2px;
        }
        
        .tab-indicator {
          position: absolute;
          top: 6px;
          left: 6px;
          height: calc(100% - 12px);
          border-radius: 7px;
          z-index: 1;
        }
        
        .tab-content {
          padding: 24px;
          background: #fafafa;
          border: 1px solid #e4e4e7;
          border-radius: 12px;
        }
        
        /* Architecture */
        .arch-grid {
          display: grid;
          gap: 12px;
        }
        
        .arch-item {
          padding: 16px;
          background: #ffffff;
          border: 1px solid #e4e4e7;
          border-radius: 10px;
        }
        
        .arch-label {
          font-size: 0.6875rem;
          font-weight: 600;
          color: #71717a;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 6px;
        }
        
        .arch-value {
          font-size: 0.875rem;
          color: #18181b;
          line-height: 1.5;
        }
        
        /* Tech Stack */
        .tech-categories {
          display: grid;
          gap: 24px;
        }
        
        .tech-category {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        
        .tech-category-label {
          font-size: 0.8125rem;
          font-weight: 600;
          color: #52525b;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        
        .tech-items {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
          gap: 8px;
        }
        
        .tech-item {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 12px;
          background: #ffffff;
          border: 1px solid #e4e4e7;
          border-radius: 7px;
          font-size: 0.8125rem;
          color: #18181b;
          transition: all 0.2s ease;
        }
        
        .tech-item:hover {
          background: #f4f4f5;
          border-color: #d4d4d8;
        }
        
        .tech-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          flex-shrink: 0;
        }
        
        /* Challenges */
        .challenges-grid {
          display: grid;
          gap: 16px;
        }
        
        .challenge-card {
          padding: 20px;
          background: #ffffff;
          border: 1px solid #e4e4e7;
          border-radius: 10px;
        }
        
        .challenge-title {
          font-size: 0.9375rem;
          font-weight: 600;
          color: #09090b;
          margin-bottom: 8px;
        }
        
        .challenge-desc {
          font-size: 0.875rem;
          color: #52525b;
          line-height: 1.6;
          margin-bottom: 12px;
        }
        
        .challenge-solution {
          padding: 12px;
          background: #f4f4f5;
          border-radius: 7px;
        }
        
        .solution-label {
          font-size: 0.6875rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 6px;
        }
        
        .solution-text {
          font-size: 0.875rem;
          color: #18181b;
          line-height: 1.6;
        }
        
        /* Results */
        .results-grid {
          display: grid;
          gap: 12px;
        }
        
        .result-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 12px;
          background: #ffffff;
          border: 1px solid #e4e4e7;
          border-radius: 7px;
          font-size: 0.875rem;
          color: #18181b;
          line-height: 1.6;
        }
        
        .result-check {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 24px;
          height: 24px;
          flex-shrink: 0;
          border-radius: 5px;
        }
        
        .learned-card {
          margin-top: 16px;
          padding: 20px;
          background: #fafafa;
          border: 1px solid;
          border-radius: 10px;
        }
        
        .learned-label {
          font-size: 0.8125rem;
          font-weight: 600;
          color: #52525b;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 8px;
        }
        
        .learned-text {
          font-size: 0.9375rem;
          color: #18181b;
          line-height: 1.6;
          font-style: italic;
        }
        
        /* Supporting Projects */
        .supporting-section {
          max-width: 1280px;
          margin: 0 auto;
          padding: 80px 48px;
        }
        
        .supporting-header {
          margin-bottom: 48px;
        }
        
        .supporting-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(1.5rem, 3vw, 2.25rem);
          font-weight: 700;
          color: #09090b;
          margin-bottom: 12px;
        }
        
        .supporting-desc {
          font-size: 1rem;
          color: #71717a;
        }
        
        .compact-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 24px;
        }
        
        .compact-card {
          background: #fafafa;
          border: 1px solid #e4e4e7;
          border-radius: 14px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          transition: all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1);
        }
        
        .compact-image-wrapper {
          position: relative;
          width: 100%;
          height: 200px;
          overflow: hidden;
          background: #f4f4f5;
        }
        
        .compact-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s cubic-bezier(0.25, 0.1, 0.25, 1);
        }
        
        .compact-card:hover .compact-image {
          transform: scale(1.04);
        }
        
        .compact-image-overlay {
          position: absolute;
          inset: 0;
          opacity: 0.3;
          pointer-events: none;
          transition: opacity 0.3s ease;
        }
        
        .compact-card:hover .compact-image-overlay {
          opacity: 0.5;
        }
        
        .compact-color-badge {
          position: absolute;
          top: 12px;
          right: 12px;
          width: 28px;
          height: 28px;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
          animation: pulse 2.4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.85;
            transform: scale(1.03);
          }
        }
        
        .compact-content {
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 16px;
          flex: 1;
        }
        
        .compact-header {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        
        .compact-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 1.25rem;
          font-weight: 700;
          color: #09090b;
          line-height: 1.3;
        }
        
        .compact-tagline {
          font-size: 0.875rem;
          color: #71717a;
          line-height: 1.5;
        }
        
        .compact-metrics {
          display: flex;
          gap: 24px;
          padding: 16px 0;
          border-top: 1px solid #e4e4e7;
          border-bottom: 1px solid #e4e4e7;
        }
        
        .compact-metric {
          display: flex;
          flex-direction: column;
          gap: 4px;
          flex: 1;
        }
        
        .compact-metric-value {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 1.5rem;
          font-weight: 700;
          line-height: 1;
        }
        
        .compact-metric-label {
          font-size: 0.6875rem;
          color: #71717a;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          line-height: 1.3;
        }
        
        .compact-tech {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }
        
        .compact-tech-badge {
          padding: 6px 10px;
          background: #ffffff;
          border: 1px solid #e4e4e7;
          border-radius: 6px;
          font-size: 0.75rem;
          color: #52525b;
          font-weight: 500;
          transition: all 0.2s cubic-bezier(0.25, 0.1, 0.25, 1);
        }
        
        .compact-tech-badge:hover {
          transform: translateY(-1px);
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);
        }
        
        .compact-links {
          display: flex;
          gap: 12px;
          margin-top: auto;
        }
        
        .compact-link {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          flex: 1;
          padding: 12px;
          background: #ffffff;
          border: 1px solid #e4e4e7;
          border-radius: 8px;
          font-size: 0.8125rem;
          font-weight: 600;
          color: #18181b;
          text-decoration: none;
          transition: all 0.2s cubic-bezier(0.25, 0.1, 0.25, 1);
          cursor: pointer;
          min-height: 44px;
        }
        
        .compact-link:hover {
          background: #f4f4f5;
          transform: translateY(-1px);
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.06);
        }
        
        .compact-link:first-child:hover {
          background: #ffffff;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        }
        
        /* Mobile Responsive */
        @media (max-width: 768px) {
          .hero-section {
            padding: 64px 24px 48px;
          }
          
          .hero-title {
            font-size: 2rem;
          }
          
          .hero-stats {
            grid-template-columns: repeat(2, 1fr);
            gap: 32px;
          }
          
          .hero-stat-value {
            font-size: 1.75rem;
          }
          
          .flagship-container {
            padding: 0 24px;
          }
          
          .flagship-grid {
            gap: 32px;
          }
          
          .bg-watermark {
            font-size: 4rem;
            opacity: 0.5;
          }
          
          .impact-showcase {
            flex-direction: column;
            gap: 20px;
          }
          
          .metric-value {
            font-size: 2rem;
          }
          
          .tab-nav {
            flex-wrap: wrap;
          }
          
          .supporting-section {
            padding: 64px 24px;
          }
          
          .compact-grid {
            grid-template-columns: 1fr;
          }
        }
        
        /* Scrollbar */
        ::-webkit-scrollbar {
          width: 10px;
        }
        
        ::-webkit-scrollbar-track {
          background: #fafafa;
        }
        
        ::-webkit-scrollbar-thumb {
          background: #d4d4d8;
          border-radius: 5px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: #a1a1aa;
        }
      `}</style>

      <div style={{ minHeight: '100vh', background: '#ffffff' }}>
        {/* Hero Section */}
        <motion.div 
          className="hero-section"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="hero-label">
              <Sparkles size={12} />
              Engineering Portfolio
            </div>
            
            <h1 className="hero-title">
              Building products that <span className="hero-gradient">solve real problems</span>
            </h1>
            
            <p className="hero-description">
              Production-grade applications with measurable business impact. 
              Full-stack development meets rigorous system design.
            </p>
          </motion.div>
          
          <motion.div 
            className="hero-stats"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div>
              <div className="hero-stat-value">5+</div>
              <div className="hero-stat-label">Production Apps</div>
            </div>
            <div>
              <div className="hero-stat-value">100+</div>
              <div className="hero-stat-label">Active Users</div>
            </div>
            <div>
              <div className="hero-stat-value">90%+</div>
              <div className="hero-stat-label">Client Satisfaction</div>
            </div>
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
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <h2 className="supporting-title">Additional Projects</h2>
            <p className="supporting-desc">
              More production applications demonstrating versatility across domains
            </p>
          </motion.div>
          
          <div className="compact-grid">
            {supporting.map(project => (
              <CompactProject key={project.id} project={project} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}