import { useState, useEffect, useRef } from "react";
import {
  Trophy, Award, Users, Code2, GitBranch, Briefcase,
  GraduationCap, Target, CheckCircle, ExternalLink,
  Github, Linkedin, Download, X, ChevronRight,
  Calendar, Clock, Zap, Database, Server, Terminal,
  TrendingUp, Shield, Cpu, Layers
} from "lucide-react";

/* ═══════════════════════════════════════════════════════════════
   DESIGN TOKENS - WHITE THEME
═══════════════════════════════════════════════════════════════ */
const T = {
  bg: "#ffffff",
  surface: "#f8f9fa",
  raised: "#f0f2f5",
  ink: "#000000",
  inkSub: "#3a3a42",
  inkMute: "#6a6a75",
  inkFaint: "#c0c0c8",
  line: "rgba(0,0,0,0.08)",
  lineMd: "rgba(0,0,0,0.12)",
  accent: "#5b7fff",
  accentSoft: "rgba(91,127,255,0.08)",
  green: "#10b981",
  greenSoft: "rgba(16,185,129,0.08)",
  ease: "cubic-bezier(0.16, 1, 0.3, 1)",
};

/* ═══════════════════════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════════════════════ */
const achievements = [
  {
    id: 1,
    category: "Competition",
    icon: Trophy,
    title: "National Hackathon Winner",
    event: "Brainovision Talent Hunt 2024",
    rank: "1st Place National",
    context: "24-hour hackathon with 200+ teams competing nationwide. Challenged to build a production-ready e-commerce platform under extreme time constraints.",
    ownership: "Led technical architecture as team lead. Made all system design decisions, implemented core authentication & real-time features, coordinated deployment strategy.",
    contribution: "Architected MERN stack application. Designed JWT authentication flow. Implemented Socket.io for real-time notifications. Dockerized application for consistent deployment.",
    decisions: [
      "Chose MERN stack for rapid development velocity and team expertise alignment",
      "Implemented JWT with refresh tokens to balance security with UX performance",
      "Deployed Socket.io for real-time bid notifications, accepting increased server complexity for critical feature",
      "Containerized with Docker + deployed on AWS EC2 for production consistency"
    ],
    risks: [
      "Time pressure could compromise code quality → Mitigated with strict code review process",
      "Real-time features could impact performance → Load tested with simulated traffic",
      "Docker complexity for team → Documented setup extensively, provided hands-on support"
    ],
    outcome: "Won ₹50,000 prize and national recognition. Project demonstrated production-grade engineering under constraint. Judges specifically praised architectural decisions and deployment approach.",
    tech: ["React", "Node.js", "Express", "MongoDB", "Socket.io", "JWT", "Docker", "AWS"],
    color: "#5b7fff",
    year: "2024",
    duration: "24 hours",
    link: null,
    metrics: {
      team: "5 members",
      competitors: "200+ teams",
      codebase: "~6,000 lines"
    }
  },
  
  {
    id: 2,
    category: "Professional Development",
    icon: GraduationCap,
    title: "Technical Certifications",
    event: "Industry-Recognized Credentials",
    rank: "15+ Certifications Completed",
    context: "Pursued structured learning across cloud infrastructure, full-stack development, and machine learning to build production-relevant expertise.",
    ownership: "Self-directed learning path. Identified skill gaps through project work, selected certifications strategically, applied knowledge immediately in personal projects.",
    contribution: "Completed comprehensive programs from AWS, Microsoft, Coursera. Prioritized certifications that directly supported project needs. Maintained hands-on application of concepts.",
    decisions: [
      "Prioritized AWS certifications for production deployment capabilities",
      "Focused on full-stack JavaScript ecosystem for project consistency",
      "Studied ML/DL fundamentals before advanced certifications",
      "Completed DevOps certifications to understand CI/CD pipelines"
    ],
    risks: [
      "Certificate collecting without application → Mitigated by immediately implementing in projects",
      "Breadth over depth → Balanced with deep-dive projects in each domain",
      "Theoretical knowledge without practice → Every cert paired with hands-on project"
    ],
    outcome: "15+ certifications completed across 3 domains. Knowledge directly applied in 8 production projects. Contributed to successful project deployments and technical interviews.",
    tech: ["AWS", "React", "Python", "TensorFlow", "Docker", "Kubernetes", "Node.js"],
    color: "#8b5cf6",
    year: "2023-2025",
    duration: "Ongoing",
    link: "/certifications",
    metrics: {
      total: "15+ certs",
      platforms: "AWS, Coursera, Udemy",
      domains: "Cloud, Full-Stack, AI/ML"
    }
  },
  
  {
    id: 3,
    category: "Project Portfolio",
    icon: Code2,
    title: "Production Applications",
    event: "End-to-End System Development",
    rank: "8 Deployed Projects",
    context: "Built complete applications from concept to production deployment, demonstrating full-stack capabilities, system design thinking, and ownership of entire product lifecycle.",
    ownership: "Sole engineer for 6 projects, technical lead for 2. Responsible for: architecture design, implementation, testing, deployment, and ongoing maintenance. All projects publicly accessible and maintained.",
    contribution: "Architected and implemented frontend, backend, database layer, authentication, and deployment infrastructure for each system. Made technology decisions based on project requirements and constraints.",
    decisions: [
      "Selected tech stacks based on problem domain (MERN for dynamic UIs, Django for data-heavy backends)",
      "Implemented authentication/authorization patterns across all projects for security muscle memory",
      "Chose PostgreSQL for relational data integrity, MongoDB for flexible schema requirements",
      "Deployed strategically: Vercel for frontend, Railway for backend, AWS for complex infrastructure"
    ],
    risks: [
      "Solo development could create knowledge silos → Documented extensively, open-sourced everything",
      "Deployment costs for 8 projects → Used free tiers strategically, optimized for cost efficiency",
      "Maintenance burden → Automated with CI/CD, monitored with health checks"
    ],
    outcome: "All 8 projects live and accessible. Resume Builder serves 3,000+ users monthly. Fake News Detector achieves 95% accuracy in production. Each project demonstrates different technical capability.",
    tech: ["React", "Node.js", "Python", "Django", "PostgreSQL", "MongoDB", "AWS", "Vercel"],
    color: "#ec4899",
    year: "2023-2025",
    duration: "Ongoing",
    link: "/projects",
    metrics: {
      deployed: "8 projects",
      users: "3,000+ total",
      uptime: "99.5% avg"
    }
  },
  
  {
    id: 4,
    category: "Open Source",
    icon: GitBranch,
    title: "GitHub Contributions",
    event: "Code Sharing & Collaboration",
    rank: "2.1K+ Stars Earned",
    context: "Maintained public GitHub presence with comprehensive documentation, clean commit history, and responsive community engagement. Treated GitHub as professional portfolio and learning platform.",
    ownership: "Managed 12+ repositories with complete ownership. Wrote documentation, responded to issues, maintained code quality standards. Made all decisions about repository structure and contribution guidelines.",
    contribution: "Created detailed READMEs with setup instructions, architecture diagrams, and usage examples. Implemented CI/CD with GitHub Actions. Maintained conventional commit standards. Engaged with community questions.",
    decisions: [
      "Open-sourced all personal projects for transparency and community learning",
      "Wrote comprehensive documentation to reduce support burden and help contributors",
      "Used conventional commits + semantic versioning for clear project history",
      "Implemented automated testing + deployment where project complexity justified it"
    ],
    risks: [
      "Code quality scrutiny → Maintained high standards, refactored proactively",
      "Security vulnerabilities in public code → Regular dependency updates, security scanning",
      "Time investment in support → Clear docs reduced support load by ~60%"
    ],
    outcome: "2,100+ stars across repositories. Projects referenced by developers learning similar technologies. Multiple collaboration requests. GitHub profile demonstrates consistent, quality work.",
    tech: ["Git", "GitHub Actions", "Markdown", "CI/CD"],
    color: "#10b981",
    year: "2024-2025",
    duration: "Ongoing",
    link: "https://github.com/bhagavan444",
    metrics: {
      repos: "12+ public",
      stars: "2.1K+ total",
      commits: "800+ total"
    }
  },
  
  {
    id: 5,
    category: "Technical Skills",
    icon: Terminal,
    title: "Algorithm Problem Solving",
    event: "Competitive Programming Practice",
    rank: "100+ Problems Solved",
    context: "Systematic practice on LeetCode and HackerRank to strengthen data structures, algorithms knowledge, and technical interview preparation. Focus on optimal solutions and pattern recognition.",
    ownership: "Self-directed learning schedule. Identified weak areas through practice, targeted specific patterns, tracked progress. Made all decisions about problem selection and study approach.",
    contribution: "Solved 100+ problems across arrays, linked lists, trees, graphs, dynamic programming, and system design. Focused on understanding multiple solution approaches and time/space complexity tradeoffs.",
    decisions: [
      "Prioritized medium/hard problems over easy for maximum learning efficiency",
      "Studied optimal solutions from top performers to understand advanced techniques",
      "Practiced explaining solutions verbally to prepare for technical interviews",
      "Tracked patterns across problems to build mental models for quick problem categorization"
    ],
    risks: [
      "Memorization over understanding → Solved same problem multiple times from scratch",
      "Time investment without application → Applied patterns in actual project code",
      "Narrow focus on algorithms → Balanced with system design study"
    ],
    outcome: "Solved 100+ problems with focus on optimization. Improved problem-solving speed by 3x. Better prepared for technical interviews. Strengthened ability to evaluate algorithmic tradeoffs in projects.",
    tech: ["Python", "JavaScript", "Data Structures", "Algorithms"],
    color: "#f59e0b",
    year: "2024-2025",
    duration: "Ongoing",
    link: null,
    metrics: {
      problems: "100+",
      platforms: "LeetCode, HackerRank",
      focus: "Optimization, Patterns"
    }
  },
  
  {
    id: 6,
    category: "Workshops & Learning",
    icon: Briefcase,
    title: "Industry Workshops",
    event: "Hands-on Technical Training",
    rank: "4 Workshops Completed",
    context: "Attended technical workshops on AI/ML, cloud computing, and full-stack development to gain practical, hands-on experience with enterprise tools and industry best practices.",
    ownership: "Active participant in all sessions. Took ownership of learning objectives, built workshop projects independently, networked strategically with industry professionals and mentors.",
    contribution: "Completed hands-on projects during workshops. Implemented learnings in personal projects within 1 week. Connected with speakers for career advice. Documented key takeaways and shared with peers.",
    decisions: [
      "Selected workshops aligned with immediate project needs and career goals",
      "Implemented learnings immediately in personal projects to cement knowledge",
      "Networked strategically with speakers and participants for mentorship",
      "Documented workshop insights in personal knowledge base for future reference"
    ],
    risks: [
      "Workshop overload without retention → Limited to 4 strategic workshops per year",
      "Passive learning without application → Built project using each workshop's concepts",
      "Network connections without follow-up → Maintained regular contact with key connections"
    ],
    outcome: "Completed 4 high-value workshops. Gained exposure to enterprise tools and practices. Built 3 projects directly from workshop learnings. Expanded professional network with 8 industry connections.",
    tech: ["TensorFlow", "AWS", "React", "Docker"],
    color: "#06b6d4",
    year: "2023-2024",
    duration: "Various",
    link: null,
    metrics: {
      workshops: "4 completed",
      hours: "40+ training",
      projects: "3 built"
    }
  }
];

const metrics = [
  { label: "Production Projects", value: "8", suffix: "", desc: "Designed, deployed & maintained", icon: Code2, color: "#5b7fff" },
  { label: "Hackathons", value: "3", suffix: "", desc: "National level competitions", icon: Trophy, color: "#10b981" },
  { label: "Certifications", value: "15", suffix: "+", desc: "AWS, Azure, GCP & more", icon: Award, color: "#8b5cf6" },
  { label: "DSA Problems", value: "100", suffix: "+", desc: "Optimized solutions", icon: Target, color: "#f59e0b" },
  { label: "GitHub Stars", value: "2.1", suffix: "K+", desc: "Open source contributions", icon: GitBranch, color: "#ec4899" },
  { label: "Workshops", value: "4", suffix: "", desc: "Industry training completed", icon: Users, color: "#06b6d4" }
];

const principles = [
  {
    icon: Layers,
    title: "Build for Scalability",
    description: "Design systems that gracefully handle growth. Start with clean architecture that supports horizontal scaling without rewrites.",
    color: "#5b7fff"
  },
  {
    icon: Shield,
    title: "Secure by Default",
    description: "Implement authentication, authorization, input validation, and secure communication as foundational requirements, not afterthoughts.",
    color: "#10b981"
  },
  {
    icon: TrendingUp,
    title: "Measure Performance",
    description: "Instrument systems with logging, monitoring, and metrics. Make data-driven optimization decisions based on real production behavior.",
    color: "#8b5cf6"
  },
  {
    icon: Cpu,
    title: "Optimize Under Constraints",
    description: "Balance speed, cost, and complexity. Make conscious tradeoffs between competing priorities. Document decisions and reasoning.",
    color: "#f59e0b"
  }
];

/* ═══════════════════════════════════════════════════════════════
   ANIMATED COUNTER HOOK
═══════════════════════════════════════════════════════════════ */
function useCounter(target, duration = 2000) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  const animate = () => {
    if (hasAnimated) return;
    setHasAnimated(true);
    
    const startTime = Date.now();
    const endValue = parseFloat(target);
    
    const updateCount = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(easeOut * endValue);
      
      if (progress < 1) {
        requestAnimationFrame(updateCount);
      } else {
        setCount(endValue);
      }
    };
    
    requestAnimationFrame(updateCount);
  };

  return [count, animate, hasAnimated];
}

/* ═══════════════════════════════════════════════════════════════
   INTERSECTION OBSERVER HOOK
═══════════════════════════════════════════════════════════════ */
function useInView(threshold = 0.2) {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return [ref, isInView];
}

/* ═══════════════════════════════════════════════════════════════
   METRIC CARD COMPONENT
═══════════════════════════════════════════════════════════════ */
function MetricCard({ metric, index }) {
  const [ref, isInView] = useInView(0.3);
  const [count, animate, hasAnimated] = useCounter(metric.value);

  useEffect(() => {
    if (isInView && !hasAnimated) {
      animate();
    }
  }, [isInView, hasAnimated, animate]);

  return (
    <div
      ref={ref}
      className="metric-card"
      style={{
        background: "#fff",
        border: `1.5px solid ${T.line}`,
        borderRadius: "16px",
        padding: "28px 24px",
        textAlign: "center",
        transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        opacity: isInView ? 1 : 0,
        transform: isInView ? "translateY(0)" : "translateY(20px)",
        transitionDelay: `${index * 80}ms`,
        boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-8px) scale(1.02)";
        e.currentTarget.style.borderColor = T.lineMd;
        e.currentTarget.style.boxShadow = `0 16px 48px rgba(0,0,0,0.08)`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0) scale(1)";
        e.currentTarget.style.borderColor = T.line;
        e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.03)";
      }}
    >
      <div
        style={{
          width: "56px",
          height: "56px",
          margin: "0 auto 16px",
          background: `${metric.color}10`,
          borderRadius: "12px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <metric.icon size={28} style={{ color: metric.color }} />
      </div>
      <div
        className="metric-value"
        style={{
          fontFamily: "'Fraunces', serif",
          fontSize: "36px",
          fontWeight: 700,
          color: metric.color,
          marginBottom: "6px",
          letterSpacing: "-0.02em",
        }}
      >
        {count.toFixed(count < 10 ? 1 : 0)}{metric.suffix}
      </div>
      <div
        className="metric-label"
        style={{
          fontSize: "15px",
          fontWeight: 600,
          color: T.ink,
          marginBottom: "4px",
        }}
      >
        {metric.label}
      </div>
      <div
        className="metric-desc"
        style={{
          fontSize: "13px",
          color: T.inkMute,
          lineHeight: 1.4,
        }}
      >
        {metric.desc}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════════════════════ */
export default function Achievements() {
  const [activeAchievement, setActiveAchievement] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [heroRef, heroInView] = useInView(0.1);

  useEffect(() => {
    if (activeAchievement) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeAchievement]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600;9..144,700&family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500;600&display=swap');
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          background: ${T.bg};
          color: ${T.ink};
          line-height: 1.6;
          -webkit-font-smoothing: antialiased;
        }

        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: transparent;
        }

        ::-webkit-scrollbar-thumb {
          background: rgba(0,0,0,0.1);
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: rgba(0,0,0,0.15);
        }

        /* Mobile Optimizations */
        @media (max-width: 1024px) {
          .main-container {
            padding: 100px 32px 80px !important;
          }
          
          .hero-section {
            margin-bottom: 60px !important;
          }
          
          .metrics-grid {
            grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)) !important;
            gap: 16px !important;
          }
          
          .achievements-grid {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
          
          .principles-grid {
            grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)) !important;
          }
        }

        @media (max-width: 768px) {
          .main-container {
            padding: 80px 24px 60px !important;
          }
          
          .hero-title {
            font-size: clamp(36px, 10vw, 56px) !important;
            line-height: 1.1 !important;
          }
          
          .hero-description {
            font-size: 16px !important;
            padding: 0 !important;
          }
          
          .hero-buttons {
            flex-direction: column !important;
            width: 100% !important;
          }
          
          .hero-buttons a,
          .hero-buttons button {
            width: 100% !important;
            justify-content: center !important;
          }
          
          .metric-card {
            padding: 20px 16px !important;
          }
          
          .metric-value {
            font-size: 28px !important;
          }
          
          .metric-label {
            font-size: 13px !important;
          }
          
          .metric-desc {
            font-size: 11px !important;
          }
          
          .achievement-card {
            border-radius: 16px !important;
          }
          
          .achievement-header {
            height: 140px !important;
          }
          
          .achievement-icon-wrapper {
            width: 70px !important;
            height: 70px !important;
          }
          
          .achievement-icon-wrapper svg {
            width: 36px !important;
            height: 36px !important;
          }
          
          .achievement-content {
            padding: 20px !important;
          }
          
          .achievement-title {
            font-size: 18px !important;
          }
          
          .achievement-event {
            font-size: 13px !important;
          }
          
          .achievement-description {
            font-size: 14px !important;
          }
          
          .metrics-row {
            grid-template-columns: 1fr 1fr 1fr !important;
            gap: 8px !important;
          }
          
          .metric-box {
            padding: 10px 8px !important;
          }
          
          .metric-box-value {
            font-size: 13px !important;
          }
          
          .metric-box-label {
            font-size: 9px !important;
          }
          
          .tech-stack {
            gap: 6px !important;
          }
          
          .tech-badge {
            padding: 4px 10px !important;
            font-size: 11px !important;
          }
          
          .view-details-btn {
            padding: 12px !important;
            font-size: 13px !important;
          }
          
          .section-title {
            font-size: clamp(28px, 6vw, 36px) !important;
            margin-bottom: 12px !important;
          }
          
          .section-description {
            font-size: 14px !important;
            margin-bottom: 40px !important;
          }
          
          .principle-card {
            padding: 24px 20px !important;
          }
          
          .principle-icon-wrapper {
            width: 48px !important;
            height: 48px !important;
            margin-bottom: 16px !important;
          }
          
          .principle-icon-wrapper svg {
            width: 24px !important;
            height: 24px !important;
          }
          
          .principle-title {
            font-size: 18px !important;
            margin-bottom: 10px !important;
          }
          
          .principle-description {
            font-size: 14px !important;
          }
        }

        @media (max-width: 480px) {
          .main-container {
            padding: 70px 20px 50px !important;
          }
          
          .hero-badge {
            font-size: 11px !important;
            padding: 6px 14px !important;
          }
          
          .metrics-grid {
            grid-template-columns: 1fr 1fr !important;
          }
          
          .metrics-row {
            grid-template-columns: 1fr !important;
            gap: 6px !important;
          }
          
          .principles-grid {
            grid-template-columns: 1fr !important;
          }
          
          .modal-content {
            border-radius: 20px !important;
            max-height: 85vh !important;
          }
          
          .modal-header {
            padding: 24px 20px !important;
            flex-direction: column !important;
            align-items: flex-start !important;
          }
          
          .modal-close-btn {
            position: absolute !important;
            top: 20px !important;
            right: 20px !important;
          }
          
          .modal-body {
            padding: 24px 20px !important;
          }
          
          .modal-section {
            margin-bottom: 24px !important;
          }
          
          .modal-section-title {
            font-size: 18px !important;
            margin-bottom: 10px !important;
          }
          
          .modal-section-text {
            font-size: 14px !important;
          }
          
          .decision-item,
          .risk-item {
            padding: 12px !important;
          }
          
          .decision-item span,
          .risk-item span {
            font-size: 13px !important;
          }
          
          .tech-tags {
            gap: 8px !important;
          }
          
          .tech-tag {
            padding: 6px 12px !important;
            font-size: 12px !important;
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(40px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>

      <div style={{ minHeight: "100vh", background: T.bg }}>
        <div
          className="main-container"
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            padding: "140px 48px 120px",
          }}
        >
          {/* HERO SECTION */}
          <div
            ref={heroRef}
            className="hero-section"
            style={{
              textAlign: "center",
              marginBottom: "100px",
              opacity: heroInView ? 1 : 0,
              transform: heroInView ? "translateY(0)" : "translateY(32px)",
              transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            <div
              className="hero-badge"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "8px 18px",
                background: T.greenSoft,
                border: `1.5px solid ${T.green}30`,
                borderRadius: "999px",
                color: T.green,
                fontSize: "13px",
                fontWeight: 600,
                letterSpacing: "0.03em",
                marginBottom: "32px",
              }}
            >
              <CheckCircle size={16} />
              Open to Software Engineering Roles • 2026 Graduate
            </div>

            <h1
              className="hero-title"
              style={{
                fontFamily: "'Fraunces', serif",
                fontSize: "clamp(48px, 7vw, 80px)",
                fontWeight: 700,
                color: T.ink,
                marginBottom: "20px",
                letterSpacing: "-0.03em",
                lineHeight: 1,
              }}
            >
              Engineering Impact
              <br />
              <span
                style={{
                  background: `linear-gradient(135deg, ${T.accent} 0%, #8b5cf6 100%)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  position: "relative",
                }}
              >
                & Execution
                <div
                  style={{
                    position: "absolute",
                    bottom: "-8px",
                    left: 0,
                    right: 0,
                    height: "3px",
                    background: `linear-gradient(90deg, ${T.accent}, #8b5cf6)`,
                    borderRadius: "2px",
                  }}
                />
              </span>
            </h1>

            <p
              className="hero-description"
              style={{
                fontSize: "18px",
                lineHeight: 1.7,
                color: T.inkSub,
                fontWeight: 400,
                maxWidth: "680px",
                margin: "0 auto 40px",
              }}
            >
              Proof of production ownership, system design thinking, and technical execution
              under constraint. Each achievement demonstrates engineering maturity and
              measurable impact.
            </p>

            <div
              className="hero-buttons"
              style={{
                display: "flex",
                gap: "16px",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <a
                href="/resume"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "14px 28px",
                  background: `linear-gradient(135deg, ${T.accent} 0%, #8b5cf6 100%)`,
                  border: "none",
                  borderRadius: "12px",
                  color: "#ffffff",
                  fontSize: "15px",
                  fontWeight: 600,
                  textDecoration: "none",
                  cursor: "pointer",
                  transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                  boxShadow: `0 4px 16px ${T.accent}30`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-3px) scale(1.02)";
                  e.currentTarget.style.boxShadow = `0 8px 24px ${T.accent}40`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0) scale(1)";
                  e.currentTarget.style.boxShadow = `0 4px 16px ${T.accent}30`;
                }}
              >
                <Download size={18} />
                Download Resume
              </a>
              <a
                href="https://github.com/bhagavan444"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "14px 28px",
                  background: "rgba(0,0,0,0.03)",
                  border: `1.5px solid ${T.lineMd}`,
                  borderRadius: "12px",
                  color: T.inkSub,
                  fontSize: "15px",
                  fontWeight: 600,
                  textDecoration: "none",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(0,0,0,0.06)";
                  e.currentTarget.style.borderColor = T.lineMd;
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(0,0,0,0.03)";
                  e.currentTarget.style.borderColor = T.lineMd;
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <Github size={18} />
                GitHub
              </a>
              <a
                href="https://linkedin.com/in/bhagavan"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "14px 28px",
                  background: "rgba(0,0,0,0.03)",
                  border: `1.5px solid ${T.lineMd}`,
                  borderRadius: "12px",
                  color: T.inkSub,
                  fontSize: "15px",
                  fontWeight: 600,
                  textDecoration: "none",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(0,0,0,0.06)";
                  e.currentTarget.style.borderColor = T.lineMd;
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(0,0,0,0.03)";
                  e.currentTarget.style.borderColor = T.lineMd;
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <Linkedin size={18} />
                LinkedIn
              </a>
            </div>
          </div>

          {/* METRICS DASHBOARD */}
          <div
            className="metrics-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "20px",
              marginBottom: "100px",
            }}
          >
            {metrics.map((metric, i) => (
              <MetricCard key={i} metric={metric} index={i} />
            ))}
          </div>

          {/* ACHIEVEMENTS SECTION */}
          <div style={{ marginBottom: "100px" }}>
            <h2
              className="section-title"
              style={{
                fontFamily: "'Fraunces', serif",
                fontSize: "clamp(32px, 4vw, 42px)",
                fontWeight: 700,
                color: T.ink,
                marginBottom: "16px",
                textAlign: "center",
                letterSpacing: "-0.02em",
              }}
            >
              Case Study Achievements
            </h2>
            <p
              className="section-description"
              style={{
                fontSize: "16px",
                color: T.inkSub,
                textAlign: "center",
                maxWidth: "600px",
                margin: "0 auto 60px",
                lineHeight: 1.7,
              }}
            >
              Evidence of engineering maturity through production ownership, technical
              decision-making, and measurable outcomes.
            </p>

            <div
              className="achievements-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(400px, 1fr))",
                gap: "24px",
              }}
            >
              {achievements.map((achievement, index) => (
                <div
                  key={achievement.id}
                  className="achievement-card"
                  onMouseEnter={() => setHoveredCard(achievement.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  onClick={() => setActiveAchievement(achievement)}
                  style={{
                    background: "#fff",
                    border: `1.5px solid ${
                      hoveredCard === achievement.id ? T.lineMd : T.line
                    }`,
                    borderRadius: "20px",
                    overflow: "hidden",
                    transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                    cursor: "pointer",
                    transform:
                      hoveredCard === achievement.id
                        ? "translateY(-8px)"
                        : "translateY(0)",
                    boxShadow:
                      hoveredCard === achievement.id
                        ? "0 20px 60px rgba(0,0,0,0.1)"
                        : "0 2px 12px rgba(0,0,0,0.03)",
                  }}
                >
                  {/* Card Header */}
                  <div
                    className="achievement-header"
                    style={{
                      height: "180px",
                      background: `linear-gradient(135deg, ${achievement.color}12 0%, ${achievement.color}05 100%)`,
                      position: "relative",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        top: "16px",
                        left: "16px",
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        padding: "6px 14px",
                        background: "rgba(255,255,255,0.95)",
                        backdropFilter: "blur(8px)",
                        border: `1.5px solid ${T.line}`,
                        borderRadius: "8px",
                        fontSize: "12px",
                        fontWeight: 600,
                        color: T.inkSub,
                      }}
                    >
                      <Calendar size={13} />
                      {achievement.year}
                    </div>
                    <div
                      className="achievement-icon-wrapper"
                      style={{
                        width: "90px",
                        height: "90px",
                        background: "rgba(255,255,255,0.95)",
                        backdropFilter: "blur(12px)",
                        border: `2px solid ${achievement.color}30`,
                        borderRadius: "18px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: `0 8px 32px ${achievement.color}20`,
                      }}
                    >
                      <achievement.icon size={44} style={{ color: achievement.color }} />
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="achievement-content" style={{ padding: "28px" }}>
                    <span
                      style={{
                        display: "inline-block",
                        padding: "6px 14px",
                        background: `${achievement.color}10`,
                        border: `1.5px solid ${achievement.color}25`,
                        borderRadius: "8px",
                        color: achievement.color,
                        fontSize: "11px",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                        marginBottom: "16px",
                      }}
                    >
                      {achievement.category}
                    </span>

                    <h3
                      className="achievement-title"
                      style={{
                        fontFamily: "'Fraunces', serif",
                        fontSize: "22px",
                        fontWeight: 700,
                        color: T.ink,
                        marginBottom: "8px",
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {achievement.title}
                    </h3>
                    <p
                      className="achievement-event"
                      style={{
                        fontSize: "15px",
                        color: T.inkMute,
                        marginBottom: "16px",
                        fontWeight: 500,
                      }}
                    >
                      {achievement.event}
                    </p>
                    <p
                      className="achievement-description"
                      style={{
                        fontSize: "15px",
                        color: T.inkSub,
                        lineHeight: 1.7,
                        marginBottom: "20px",
                      }}
                    >
                      {achievement.outcome.slice(0, 150)}...
                    </p>

                    {/* Metrics Row */}
                    <div
                      className="metrics-row"
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(3, 1fr)",
                        gap: "10px",
                        marginBottom: "20px",
                      }}
                    >
                      {Object.entries(achievement.metrics).map(([key, value]) => (
                        <div
                          key={key}
                          className="metric-box"
                          style={{
                            padding: "12px",
                            background: T.surface,
                            border: `1.5px solid ${T.line}`,
                            borderRadius: "10px",
                            textAlign: "center",
                          }}
                        >
                          <div
                            className="metric-box-value"
                            style={{
                              fontSize: "15px",
                              fontWeight: 700,
                              color: T.ink,
                              marginBottom: "3px",
                            }}
                          >
                            {value}
                          </div>
                          <div
                            className="metric-box-label"
                            style={{
                              fontSize: "10px",
                              color: T.inkMute,
                              textTransform: "uppercase",
                              letterSpacing: "0.05em",
                              fontWeight: 600,
                            }}
                          >
                            {key.replace("_", " ")}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Tech Stack */}
                    <div
                      className="tech-stack"
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "8px",
                        marginBottom: "20px",
                      }}
                    >
                      {achievement.tech.slice(0, 4).map((tech, i) => (
                        <span
                          key={i}
                          className="tech-badge"
                          style={{
                            padding: "5px 12px",
                            background: T.surface,
                            border: `1.5px solid ${T.line}`,
                            borderRadius: "6px",
                            fontSize: "12px",
                            color: T.inkSub,
                            fontWeight: 500,
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                      {achievement.tech.length > 4 && (
                        <span
                          className="tech-badge"
                          style={{
                            padding: "5px 12px",
                            background: T.surface,
                            border: `1.5px solid ${T.line}`,
                            borderRadius: "6px",
                            fontSize: "12px",
                            color: T.inkSub,
                            fontWeight: 600,
                          }}
                        >
                          +{achievement.tech.length - 4}
                        </span>
                      )}
                    </div>

                    {/* View Details Button */}
                    <button
                      className="view-details-btn"
                      style={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "8px",
                        padding: "14px",
                        background:
                          hoveredCard === achievement.id
                            ? `${achievement.color}12`
                            : `${achievement.color}08`,
                        border: `1.5px solid ${
                          hoveredCard === achievement.id
                            ? `${achievement.color}30`
                            : `${achievement.color}20`
                        }`,
                        borderRadius: "12px",
                        color: achievement.color,
                        fontSize: "14px",
                        fontWeight: 600,
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                      }}
                    >
                      View Full Case Study
                      <ChevronRight size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ENGINEERING PRINCIPLES */}
          <div style={{ marginBottom: "100px" }}>
            <h2
              className="section-title"
              style={{
                fontFamily: "'Fraunces', serif",
                fontSize: "clamp(32px, 4vw, 42px)",
                fontWeight: 700,
                color: T.ink,
                marginBottom: "16px",
                textAlign: "center",
                letterSpacing: "-0.02em",
              }}
            >
              How I Build Systems
            </h2>
            <p
              className="section-description"
              style={{
                fontSize: "16px",
                color: T.inkSub,
                textAlign: "center",
                maxWidth: "600px",
                margin: "0 auto 60px",
                lineHeight: 1.7,
              }}
            >
              The engineering principles that guide every technical decision and
              architectural choice in production systems.
            </p>

            <div
              className="principles-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "24px",
              }}
            >
              {principles.map((principle, index) => (
                <div
                  key={index}
                  className="principle-card"
                  style={{
                    background: "#fff",
                    border: `1.5px solid ${T.line}`,
                    borderRadius: "16px",
                    padding: "32px 28px",
                    transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-6px)";
                    e.currentTarget.style.borderColor = T.lineMd;
                    e.currentTarget.style.boxShadow = "0 12px 40px rgba(0,0,0,0.08)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.borderColor = T.line;
                    e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.03)";
                  }}
                >
                  <div
                    className="principle-icon-wrapper"
                    style={{
                      width: "56px",
                      height: "56px",
                      background: `${principle.color}10`,
                      borderRadius: "12px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "20px",
                    }}
                  >
                    <principle.icon size={28} style={{ color: principle.color }} />
                  </div>
                  <h3
                    className="principle-title"
                    style={{
                      fontFamily: "'Fraunces', serif",
                      fontSize: "20px",
                      fontWeight: 700,
                      color: T.ink,
                      marginBottom: "12px",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {principle.title}
                  </h3>
                  <p
                    className="principle-description"
                    style={{
                      fontSize: "15px",
                      color: T.inkSub,
                      lineHeight: 1.7,
                    }}
                  >
                    {principle.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* MODAL */}
      {activeAchievement && (
        <div
          onClick={() => setActiveAchievement(null)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            backdropFilter: "blur(12px)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
            overflowY: "auto",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="modal-content"
            style={{
              background: "#fff",
              border: `1.5px solid ${T.lineMd}`,
              borderRadius: "24px",
              maxWidth: "1000px",
              width: "100%",
              maxHeight: "90vh",
              overflowY: "auto",
              position: "relative",
              animation: "slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
              boxShadow: "0 32px 96px rgba(0,0,0,0.2)",
            }}
          >
            {/* Modal Header */}
            <div
              className="modal-header"
              style={{
                padding: "36px 40px",
                borderBottom: `1.5px solid ${T.line}`,
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                gap: "20px",
              }}
            >
              <div style={{ flex: 1 }}>
                <span
                  style={{
                    display: "inline-block",
                    padding: "6px 14px",
                    background: `${activeAchievement.color}10`,
                    border: `1.5px solid ${activeAchievement.color}25`,
                    borderRadius: "8px",
                    color: activeAchievement.color,
                    fontSize: "11px",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    marginBottom: "16px",
                  }}
                >
                  {activeAchievement.category}
                </span>
                <h2
                  style={{
                    fontFamily: "'Fraunces', serif",
                    fontSize: "32px",
                    fontWeight: 700,
                    color: T.ink,
                    marginBottom: "8px",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {activeAchievement.title}
                </h2>
                <p style={{ fontSize: "17px", color: T.inkMute, fontWeight: 500 }}>
                  {activeAchievement.event}
                </p>
              </div>
              <button
                onClick={() => setActiveAchievement(null)}
                className="modal-close-btn"
                style={{
                  width: "44px",
                  height: "44px",
                  background: "rgba(239,68,68,0.08)",
                  border: "1.5px solid rgba(239,68,68,0.2)",
                  borderRadius: "12px",
                  color: "#ef4444",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  flexShrink: 0,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(239,68,68,0.15)";
                  e.currentTarget.style.transform = "scale(1.05)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(239,68,68,0.08)";
                  e.currentTarget.style.transform = "scale(1)";
                }}
              >
                <X size={22} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="modal-body" style={{ padding: "40px" }}>
              {/* Context */}
              <div className="modal-section" style={{ marginBottom: "32px" }}>
                <h3
                  className="modal-section-title"
                  style={{
                    fontFamily: "'Fraunces', serif",
                    fontSize: "20px",
                    fontWeight: 700,
                    color: activeAchievement.color,
                    marginBottom: "12px",
                    letterSpacing: "-0.01em",
                  }}
                >
                  Context
                </h3>
                <p
                  className="modal-section-text"
                  style={{
                    fontSize: "16px",
                    color: T.inkSub,
                    lineHeight: 1.75,
                  }}
                >
                  {activeAchievement.context}
                </p>
              </div>

              {/* Ownership Scope */}
              <div className="modal-section" style={{ marginBottom: "32px" }}>
                <h3
                  className="modal-section-title"
                  style={{
                    fontFamily: "'Fraunces', serif",
                    fontSize: "20px",
                    fontWeight: 700,
                    color: activeAchievement.color,
                    marginBottom: "12px",
                    letterSpacing: "-0.01em",
                  }}
                >
                  My Ownership Scope
                </h3>
                <p
                  className="modal-section-text"
                  style={{
                    fontSize: "16px",
                    color: T.inkSub,
                    lineHeight: 1.75,
                  }}
                >
                  {activeAchievement.ownership}
                </p>
              </div>

              {/* Technical Decisions */}
              <div className="modal-section" style={{ marginBottom: "32px" }}>
                <h3
                  className="modal-section-title"
                  style={{
                    fontFamily: "'Fraunces', serif",
                    fontSize: "20px",
                    fontWeight: 700,
                    color: activeAchievement.color,
                    marginBottom: "16px",
                    letterSpacing: "-0.01em",
                  }}
                >
                  Decision → Risk → Outcome
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  {activeAchievement.decisions.map((decision, i) => (
                    <div
                      key={i}
                      className="decision-item"
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "12px",
                        padding: "16px",
                        background: T.surface,
                        border: `1.5px solid ${T.line}`,
                        borderRadius: "12px",
                      }}
                    >
                      <Zap
                        size={18}
                        style={{
                          color: activeAchievement.color,
                          flexShrink: 0,
                          marginTop: "2px",
                        }}
                      />
                      <span
                        style={{
                          fontSize: "15px",
                          color: T.inkSub,
                          lineHeight: 1.7,
                        }}
                      >
                        {decision}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Risks Managed */}
              {activeAchievement.risks && (
                <div className="modal-section" style={{ marginBottom: "32px" }}>
                  <h3
                    className="modal-section-title"
                    style={{
                      fontFamily: "'Fraunces', serif",
                      fontSize: "20px",
                      fontWeight: 700,
                      color: activeAchievement.color,
                      marginBottom: "16px",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    Risks Managed
                  </h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    {activeAchievement.risks.map((risk, i) => (
                      <div
                        key={i}
                        className="risk-item"
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: "12px",
                          padding: "16px",
                          background: "rgba(239,68,68,0.04)",
                          border: "1.5px solid rgba(239,68,68,0.12)",
                          borderRadius: "12px",
                        }}
                      >
                        <Shield
                          size={18}
                          style={{
                            color: "#ef4444",
                            flexShrink: 0,
                            marginTop: "2px",
                          }}
                        />
                        <span
                          style={{
                            fontSize: "15px",
                            color: T.inkSub,
                            lineHeight: 1.7,
                          }}
                        >
                          {risk}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Outcome */}
              <div className="modal-section" style={{ marginBottom: "32px" }}>
                <h3
                  className="modal-section-title"
                  style={{
                    fontFamily: "'Fraunces', serif",
                    fontSize: "20px",
                    fontWeight: 700,
                    color: activeAchievement.color,
                    marginBottom: "12px",
                    letterSpacing: "-0.01em",
                  }}
                >
                  Measurable Outcome
                </h3>
                <p
                  className="modal-section-text"
                  style={{
                    fontSize: "16px",
                    color: T.inkSub,
                    lineHeight: 1.75,
                  }}
                >
                  {activeAchievement.outcome}
                </p>
              </div>

              {/* Technologies */}
              <div className="modal-section" style={{ marginBottom: "32px" }}>
                <h3
                  className="modal-section-title"
                  style={{
                    fontFamily: "'Fraunces', serif",
                    fontSize: "20px",
                    fontWeight: 700,
                    color: activeAchievement.color,
                    marginBottom: "16px",
                    letterSpacing: "-0.01em",
                  }}
                >
                  Technologies
                </h3>
                <div className="tech-tags" style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                  {activeAchievement.tech.map((tech, i) => (
                    <span
                      key={i}
                      className="tech-tag"
                      style={{
                        padding: "8px 16px",
                        background: `${activeAchievement.color}10`,
                        border: `1.5px solid ${activeAchievement.color}25`,
                        borderRadius: "8px",
                        fontSize: "14px",
                        color: activeAchievement.color,
                        fontWeight: 600,
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Link */}
              {activeAchievement.link && (
                <a
                  href={activeAchievement.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "10px",
                    width: "100%",
                    padding: "16px",
                    background: `linear-gradient(135deg, ${activeAchievement.color} 0%, ${activeAchievement.color}dd 100%)`,
                    border: "none",
                    borderRadius: "12px",
                    color: "#fff",
                    fontSize: "15px",
                    fontWeight: 600,
                    textDecoration: "none",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow = `0 8px 24px ${activeAchievement.color}40`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <ExternalLink size={18} />
                  View Related Work
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}