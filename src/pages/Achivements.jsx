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
   DATA — REWRITTEN: HONEST, FACTUAL, NO HYPE
═══════════════════════════════════════════════════════════════ */
const achievements = [
  {
    id: 1,
    category: "Competition",
    icon: Trophy,
    title: "Hackathon — 1st Place",
    event: "Brainovision Talent Hunt 2024",
    rank: "1st Place · National Level",
    context: "24-hour hackathon with 200+ participating teams. Task was to build a functional e-commerce platform within the time limit. Team of 5, open to all engineering students nationally.",
    ownership: "Served as team lead and primary backend developer. Responsible for system architecture, authentication implementation, and coordinating task distribution among teammates.",
    contribution: "Built the backend using Node.js and Express. Implemented JWT-based authentication. Set up MongoDB schemas for product and order data. Containerized the application using Docker for deployment consistency.",
    decisions: [
      "Chose MERN stack based on team familiarity and development speed under time constraint",
      "Used JWT with short expiry + refresh token pattern to handle auth without over-engineering",
      "Added Socket.io for real-time bid updates — accepted the added complexity for a key feature requirement",
      "Containerized with Docker to avoid environment mismatch issues during final demo deployment"
    ],
    risks: [
      "Time constraint risked incomplete features → Prioritized core functionality first, added extras only after core was stable",
      "Real-time feature could introduce bugs under demo pressure → Tested with multiple browser sessions before submission",
      "Docker setup unfamiliar to some teammates → Documented steps and walked through setup together"
    ],
    outcome: "Placed 1st among 200+ teams. Won ₹50,000 prize. Judges noted the deployment setup and authentication flow as well-structured for a 24-hour build.",
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
    event: "AWS · Coursera · Udemy",
    rank: "15+ Certifications Completed",
    context: "Completed certifications across cloud infrastructure, full-stack development, and machine learning over two years. Certifications were selected based on gaps identified during project work, not collected arbitrarily.",
    ownership: "Self-directed. Identified which domains to study based on what was blocking project progress. Applied each certification's concepts in a personal project within the same month.",
    contribution: "Completed structured programs from AWS, Microsoft Learn, and Coursera. Prioritized applied understanding over just passing assessments. Each cert was paired with a hands-on implementation.",
    decisions: [
      "Started with AWS fundamentals before deploying any backend to production infrastructure",
      "Focused on the JavaScript/Node.js ecosystem to maintain consistency across frontend and backend projects",
      "Studied ML theory certifications before building classification projects to understand model behavior",
      "Completed a Docker + CI/CD certification after struggling with manual deployment on an early project"
    ],
    risks: [
      "Risk of completing certs without retaining knowledge → Immediately applied each topic in a project",
      "Risk of shallow breadth across too many domains → Limited to 3 core domains with deeper project work in each",
      "Risk of theoretical-only understanding → Every certification was followed by hands-on implementation"
    ],
    outcome: "15+ certifications completed across cloud, full-stack, and AI/ML. Concepts directly applied in 6 personal projects. Contributed to more structured decision-making in project architecture.",
    tech: ["AWS", "React", "Python", "TensorFlow", "Docker", "Kubernetes", "Node.js"],
    color: "#8b5cf6",
    year: "2023–2025",
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
    event: "Personal & Academic Projects",
    rank: "6 Deployed Projects",
    context: "Built and deployed 6 applications independently across full-stack web development, machine learning, and data science. Each project was scoped, built, and deployed without external scaffolding.",
    ownership: "Sole developer on all 6 projects. Handled frontend, backend, database design, authentication, and deployment for each. Made all technical and architectural decisions independently.",
    contribution: "Implemented complete application stacks including UI, REST APIs, database schemas, auth flows, and deployment configurations. Selected tech based on project requirements rather than familiarity by default.",
    decisions: [
      "Used MERN for projects requiring dynamic UIs and real-time data; Django for data-heavy or ML-backed backends",
      "Implemented auth (JWT or session-based) in every project as a consistent practice — not added as an afterthought",
      "Chose PostgreSQL for structured relational data, MongoDB where schema flexibility was justified",
      "Deployed frontend on Vercel, backend on Railway, and used AWS EC2 for projects requiring custom infrastructure"
    ],
    risks: [
      "Maintaining 6 live projects solo creates update overhead → Used GitHub Actions for automated CI/CD where feasible",
      "Free-tier hosting has uptime and resource limits → Chose hosting based on each project's traffic expectations",
      "Knowledge silos from solo work → Documented architecture decisions and kept all repos public with READMEs"
    ],
    outcome: "All 6 projects deployed and accessible. Resume Builder receives consistent monthly traffic. Fake News Detector tested at 95% accuracy on the validation set. Each project targets a distinct technical domain.",
    tech: ["React", "Node.js", "Python", "Django", "PostgreSQL", "MongoDB", "AWS", "Vercel"],
    color: "#ec4899",
    year: "2023–2025",
    duration: "Ongoing",
    link: "/projects",
    metrics: {
      deployed: "6 projects",
      domains: "Web, ML, DS",
      uptime: "Free-tier hosted"
    }
  },

  {
    id: 4,
    category: "Open Source",
    icon: GitBranch,
    title: "GitHub Activity",
    event: "Public Repositories & Code Sharing",
    rank: "12+ Public Repositories",
    context: "Maintained a public GitHub profile with projects spanning internship deliverables, personal builds, and learning exercises. Focused on clean commit history, readable READMEs, and reproducible setup instructions.",
    ownership: "Managed all repositories independently. Wrote documentation, responded to any questions, and maintained code quality across repos over time.",
    contribution: "Wrote detailed READMEs with setup steps, environment variables, and architecture notes. Used conventional commits for readable project history. Added GitHub Actions for automated testing on select projects.",
    decisions: [
      "Open-sourced all personal projects to build a reviewable code record and make work verifiable",
      "Invested time in documentation to make repos usable without direct support",
      "Used semantic versioning and conventional commits on larger projects for structured history",
      "Added automated deployment workflows on projects where manual deployment was error-prone"
    ],
    risks: [
      "Public code invites scrutiny → Maintained consistent style, refactored before making repos public",
      "Dependency vulnerabilities in public repos → Used Dependabot alerts and updated packages regularly",
      "Community questions taking time → Clear docs reduced repetitive questions significantly"
    ],
    outcome: "12+ public repositories maintained. Profile serves as a working code portfolio across multiple domains. Consistent commit history reflects active, ongoing development practice.",
    tech: ["Git", "GitHub Actions", "Markdown", "CI/CD"],
    color: "#10b981",
    year: "2024–2025",
    duration: "Ongoing",
    link: "https://github.com/bhagavan444",
    metrics: {
      repos: "12+ public",
      commits: "Consistent",
      focus: "Docs + CI/CD"
    }
  },

  {
    id: 5,
    category: "Technical Skills",
    icon: Terminal,
    title: "DSA Problem Solving",
    event: "LeetCode · HackerRank",
    rank: "100+ Problems Solved",
    context: "Practiced data structures and algorithms on LeetCode and HackerRank as part of interview preparation and to strengthen problem decomposition skills. Focus on understanding patterns, not just passing test cases.",
    ownership: "Self-directed practice schedule. Identified weak areas (graphs, DP) through failed attempts and targeted those specifically. Tracked progress manually to ensure coverage across topic categories.",
    contribution: "Solved 100+ problems across arrays, strings, linked lists, trees, graphs, and dynamic programming. Reviewed optimal solutions after solving to identify more efficient approaches.",
    decisions: [
      "Prioritized medium-difficulty problems after basics were solid, as they reflect actual interview difficulty",
      "Studied top solutions after each problem to understand alternative approaches and tradeoffs",
      "Practiced verbal explanation of solutions to prepare for interview communication, not just code output",
      "Tracked problem categories to ensure coverage rather than solving whatever appeared by default"
    ],
    risks: [
      "Pattern memorization without understanding → Re-solved problems from scratch after 2 weeks to verify retention",
      "Narrow focus on competitive problems → Balanced with system design reading to cover interview breadth",
      "Platform-specific patterns not generalizing → Applied similar patterns in real project code where applicable"
    ],
    outcome: "Solved 100+ problems with documented coverage across core DSA topics. Improved ability to recognize patterns and evaluate time/space tradeoffs during project implementation decisions.",
    tech: ["Python", "JavaScript", "Data Structures", "Algorithms"],
    color: "#f59e0b",
    year: "2024–2025",
    duration: "Ongoing",
    link: null,
    metrics: {
      problems: "100+",
      platforms: "LeetCode, HackerRank",
      focus: "Patterns, Complexity"
    }
  },

  {
    id: 6,
    category: "Workshops & Learning",
    icon: Briefcase,
    title: "Technical Workshops",
    event: "AI/ML · Cloud · Full-Stack Training",
    rank: "4 Workshops Attended",
    context: "Participated in 4 technical workshops covering AI/ML applications, cloud deployment, and full-stack development practices. Workshops were instructor-led with hands-on sessions and project components.",
    ownership: "Attended as an active participant. Completed all hands-on tasks during sessions and followed up by implementing related concepts in personal projects within the following week.",
    contribution: "Completed workshop exercises and built small projects using each workshop's focus area. Connected with instructors for questions on practical implementation. Shared key takeaways with peers in study group.",
    decisions: [
      "Selected workshops that addressed gaps in current project knowledge, not general interest topics",
      "Implemented one small project per workshop within the following week to apply and retain what was covered",
      "Focused on sessions with hands-on labs rather than lecture-only formats for better retention",
      "Documented key learnings in personal notes for future reference during project work"
    ],
    risks: [
      "Workshop content staying theoretical → Built a project using each workshop's tools within one week of completion",
      "Too many workshops diluting focus → Limited to 4 per year, selected deliberately",
      "Workshop network connections fading → Followed up with at least one question or message per contact"
    ],
    outcome: "Completed 4 workshops with hands-on project output from each. Gained working familiarity with enterprise tools (AWS console, TensorFlow pipelines, Docker Compose). Built 3 small projects directly from workshop content.",
    tech: ["TensorFlow", "AWS", "React", "Docker"],
    color: "#06b6d4",
    year: "2023–2024",
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
  { label: "Production Projects", value: "6", suffix: "", desc: "Designed, deployed & maintained", icon: Code2, color: "#5b7fff" },
  { label: "Hackathons", value: "3", suffix: "", desc: "National level competitions", icon: Trophy, color: "#10b981" },
  { label: "Certifications", value: "15", suffix: "+", desc: "AWS, Coursera, Udemy & more", icon: Award, color: "#8b5cf6" },
  { label: "DSA Problems", value: "100", suffix: "+", desc: "LeetCode & HackerRank", icon: Target, color: "#f59e0b" },
  { label: "Public Repos", value: "12", suffix: "+", desc: "Open source on GitHub", icon: GitBranch, color: "#ec4899" },
  { label: "Workshops", value: "4", suffix: "", desc: "Industry training completed", icon: Users, color: "#06b6d4" }
];

const principles = [
  {
    icon: Layers,
    title: "Build for Scalability",
    description: "Design systems that handle growth without rewrites. Start with clean architecture and clear separation of concerns — scaling becomes a configuration problem, not a rebuild.",
    color: "#5b7fff"
  },
  {
    icon: Shield,
    title: "Secure by Default",
    description: "Treat authentication, authorization, and input validation as core requirements from the start. Security added as an afterthought is harder to audit and easier to miss.",
    color: "#10b981"
  },
  {
    icon: TrendingUp,
    title: "Measure Before Optimizing",
    description: "Instrument systems with logging and basic monitoring before assuming where the bottleneck is. Optimize based on observed behavior, not guesswork.",
    color: "#8b5cf6"
  },
  {
    icon: Cpu,
    title: "Make Tradeoffs Explicit",
    description: "Every technical decision trades one thing for another. Document the reasoning behind architectural choices so the tradeoff is visible and reversible if requirements change.",
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
      if (progress < 1) requestAnimationFrame(updateCount);
      else setCount(endValue);
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
      ([entry]) => { if (entry.isIntersecting) setIsInView(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return [ref, isInView];
}

/* ═══════════════════════════════════════════════════════════════
   METRIC CARD
═══════════════════════════════════════════════════════════════ */
function MetricCard({ metric, index }) {
  const [ref, isInView] = useInView(0.3);
  const [count, animate, hasAnimated] = useCounter(metric.value);

  useEffect(() => {
    if (isInView && !hasAnimated) animate();
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
      <div style={{
        width: "56px", height: "56px", margin: "0 auto 16px",
        background: `${metric.color}10`, borderRadius: "12px",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <metric.icon size={28} style={{ color: metric.color }} />
      </div>
      <div className="metric-value" style={{
        fontFamily: "'Fraunces', serif", fontSize: "36px", fontWeight: 700,
        color: metric.color, marginBottom: "6px", letterSpacing: "-0.02em",
      }}>
        {count.toFixed(count < 10 ? 1 : 0)}{metric.suffix}
      </div>
      <div className="metric-label" style={{ fontSize: "15px", fontWeight: 600, color: T.ink, marginBottom: "4px" }}>
        {metric.label}
      </div>
      <div className="metric-desc" style={{ fontSize: "13px", color: T.inkMute, lineHeight: 1.4 }}>
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
    document.body.style.overflow = activeAchievement ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [activeAchievement]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600;9..144,700&family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500;600&display=swap');
        
        * { margin: 0; padding: 0; box-sizing: border-box; }
        
        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          background: ${T.bg};
          color: ${T.ink};
          line-height: 1.6;
          -webkit-font-smoothing: antialiased;
        }

        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.1); border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(0,0,0,0.15); }

        @media (max-width: 1024px) {
          .main-container { padding: 100px 32px 80px !important; }
          .hero-section { margin-bottom: 60px !important; }
          .metrics-grid { grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)) !important; gap: 16px !important; }
          .achievements-grid { grid-template-columns: 1fr !important; gap: 20px !important; }
          .principles-grid { grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)) !important; }
        }

        @media (max-width: 768px) {
          .main-container { padding: 80px 24px 60px !important; }
          .hero-title { font-size: clamp(36px, 10vw, 56px) !important; line-height: 1.1 !important; }
          .hero-description { font-size: 16px !important; padding: 0 !important; }
          .hero-buttons { flex-direction: column !important; width: 100% !important; }
          .hero-buttons a, .hero-buttons button { width: 100% !important; justify-content: center !important; }
          .metric-card { padding: 20px 16px !important; }
          .metric-value { font-size: 28px !important; }
          .metric-label { font-size: 13px !important; }
          .metric-desc { font-size: 11px !important; }
          .achievement-card { border-radius: 16px !important; }
          .achievement-header { height: 140px !important; }
          .achievement-icon-wrapper { width: 70px !important; height: 70px !important; }
          .achievement-icon-wrapper svg { width: 36px !important; height: 36px !important; }
          .achievement-content { padding: 20px !important; }
          .achievement-title { font-size: 18px !important; }
          .achievement-event { font-size: 13px !important; }
          .achievement-description { font-size: 14px !important; }
          .metrics-row { grid-template-columns: 1fr 1fr 1fr !important; gap: 8px !important; }
          .metric-box { padding: 10px 8px !important; }
          .metric-box-value { font-size: 13px !important; }
          .metric-box-label { font-size: 9px !important; }
          .tech-stack { gap: 6px !important; }
          .tech-badge { padding: 4px 10px !important; font-size: 11px !important; }
          .view-details-btn { padding: 12px !important; font-size: 13px !important; }
          .section-title { font-size: clamp(28px, 6vw, 36px) !important; margin-bottom: 12px !important; }
          .section-description { font-size: 14px !important; margin-bottom: 40px !important; }
          .principle-card { padding: 24px 20px !important; }
          .principle-icon-wrapper { width: 48px !important; height: 48px !important; margin-bottom: 16px !important; }
          .principle-icon-wrapper svg { width: 24px !important; height: 24px !important; }
          .principle-title { font-size: 18px !important; margin-bottom: 10px !important; }
          .principle-description { font-size: 14px !important; }
        }

        @media (max-width: 480px) {
          .main-container { padding: 70px 20px 50px !important; }
          .hero-badge { font-size: 11px !important; padding: 6px 14px !important; }
          .metrics-grid { grid-template-columns: 1fr 1fr !important; }
          .metrics-row { grid-template-columns: 1fr !important; gap: 6px !important; }
          .principles-grid { grid-template-columns: 1fr !important; }
          .modal-content { border-radius: 20px !important; max-height: 85vh !important; }
          .modal-header { padding: 24px 20px !important; flex-direction: column !important; align-items: flex-start !important; }
          .modal-close-btn { position: absolute !important; top: 20px !important; right: 20px !important; }
          .modal-body { padding: 24px 20px !important; }
          .modal-section { margin-bottom: 24px !important; }
          .modal-section-title { font-size: 18px !important; margin-bottom: 10px !important; }
          .modal-section-text { font-size: 14px !important; }
          .decision-item, .risk-item { padding: 12px !important; }
          .decision-item span, .risk-item span { font-size: 13px !important; }
          .tech-tags { gap: 8px !important; }
          .tech-tag { padding: 6px 12px !important; font-size: 12px !important; }
        }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(40px) scale(0.95); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>

      <div style={{ minHeight: "100vh", background: T.bg }}>
        <div className="main-container" style={{ maxWidth: "1400px", margin: "0 auto", padding: "140px 48px 120px" }}>

          {/* ── HERO ── */}
          <div
            ref={heroRef}
            className="hero-section"
            style={{
              textAlign: "center", marginBottom: "100px",
              opacity: heroInView ? 1 : 0,
              transform: heroInView ? "translateY(0)" : "translateY(32px)",
              transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            <div className="hero-badge" style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              padding: "8px 18px", background: T.greenSoft,
              border: `1.5px solid ${T.green}30`, borderRadius: "999px",
              color: T.green, fontSize: "13px", fontWeight: 600,
              letterSpacing: "0.03em", marginBottom: "32px",
            }}>
              <CheckCircle size={16} />
              Open to Software Engineering Roles · 2026 Graduate
            </div>

            <h1 className="hero-title" style={{
              fontFamily: "'Fraunces', serif",
              fontSize: "clamp(48px, 7vw, 80px)", fontWeight: 700,
              color: T.ink, marginBottom: "20px",
              letterSpacing: "-0.03em", lineHeight: 1,
            }}>
              Documented Work
              <br />
              <span style={{
                background: `linear-gradient(135deg, ${T.accent} 0%, #8b5cf6 100%)`,
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                backgroundClip: "text", position: "relative",
              }}>
                & Outcomes
                <div style={{
                  position: "absolute", bottom: "-8px", left: 0, right: 0,
                  height: "3px",
                  background: `linear-gradient(90deg, ${T.accent}, #8b5cf6)`,
                  borderRadius: "2px",
                }} />
              </span>
            </h1>

            <p className="hero-description" style={{
              fontSize: "18px", lineHeight: 1.7, color: T.inkSub,
              fontWeight: 400, maxWidth: "620px", margin: "0 auto 40px",
            }}>
              A record of technical work, competitive results, and learning milestones
              from internships, personal projects, and structured practice.
            </p>

            <div className="hero-buttons" style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
              <a href="/resume" style={{
                display: "inline-flex", alignItems: "center", gap: "10px",
                padding: "14px 28px",
                background: `linear-gradient(135deg, ${T.accent} 0%, #8b5cf6 100%)`,
                border: "none", borderRadius: "12px", color: "#ffffff",
                fontSize: "15px", fontWeight: 600, textDecoration: "none", cursor: "pointer",
                transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                boxShadow: `0 4px 16px ${T.accent}30`,
              }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-3px) scale(1.02)"; e.currentTarget.style.boxShadow = `0 8px 24px ${T.accent}40`; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0) scale(1)"; e.currentTarget.style.boxShadow = `0 4px 16px ${T.accent}30`; }}
              >
                <Download size={18} />Download Resume
              </a>
              <a href="https://github.com/bhagavan444" target="_blank" rel="noopener noreferrer" style={{
                display: "inline-flex", alignItems: "center", gap: "10px",
                padding: "14px 28px", background: "rgba(0,0,0,0.03)",
                border: `1.5px solid ${T.lineMd}`, borderRadius: "12px",
                color: T.inkSub, fontSize: "15px", fontWeight: 600,
                textDecoration: "none", cursor: "pointer", transition: "all 0.3s ease",
              }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(0,0,0,0.06)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(0,0,0,0.03)"; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                <Github size={18} />GitHub
              </a>
              <a href="https://www.linkedin.com/in/gopalajosyula-siva-satya-sai-bhagavan-1624a027b/" target="_blank" rel="noopener noreferrer" style={{
                display: "inline-flex", alignItems: "center", gap: "10px",
                padding: "14px 28px", background: "rgba(0,0,0,0.03)",
                border: `1.5px solid ${T.lineMd}`, borderRadius: "12px",
                color: T.inkSub, fontSize: "15px", fontWeight: 600,
                textDecoration: "none", cursor: "pointer", transition: "all 0.3s ease",
              }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(0,0,0,0.06)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(0,0,0,0.03)"; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                <Linkedin size={18} />LinkedIn
              </a>
            </div>
          </div>

          {/* ── METRICS DASHBOARD ── */}
          <div className="metrics-grid" style={{
            display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "20px", marginBottom: "100px",
          }}>
            {metrics.map((metric, i) => <MetricCard key={i} metric={metric} index={i} />)}
          </div>

          {/* ── ACHIEVEMENTS ── */}
          <div style={{ marginBottom: "100px" }}>
            <h2 className="section-title" style={{
              fontFamily: "'Fraunces', serif",
              fontSize: "clamp(32px, 4vw, 42px)", fontWeight: 700,
              color: T.ink, marginBottom: "16px", textAlign: "center", letterSpacing: "-0.02em",
            }}>
              Achievements & Case Studies
            </h2>
            <p className="section-description" style={{
              fontSize: "16px", color: T.inkSub, textAlign: "center",
              maxWidth: "560px", margin: "0 auto 60px", lineHeight: 1.7,
            }}>
              A factual account of competitions, projects, certifications, and technical
              practice with context and outcomes where measurable.
            </p>

            <div className="achievements-grid" style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(400px, 1fr))",
              gap: "24px",
            }}>
              {achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className="achievement-card"
                  onMouseEnter={() => setHoveredCard(achievement.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  onClick={() => setActiveAchievement(achievement)}
                  style={{
                    background: "#fff",
                    border: `1.5px solid ${hoveredCard === achievement.id ? T.lineMd : T.line}`,
                    borderRadius: "20px", overflow: "hidden",
                    transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)", cursor: "pointer",
                    transform: hoveredCard === achievement.id ? "translateY(-8px)" : "translateY(0)",
                    boxShadow: hoveredCard === achievement.id ? "0 20px 60px rgba(0,0,0,0.1)" : "0 2px 12px rgba(0,0,0,0.03)",
                  }}
                >
                  {/* Card Header */}
                  <div className="achievement-header" style={{
                    height: "180px",
                    background: `linear-gradient(135deg, ${achievement.color}12 0%, ${achievement.color}05 100%)`,
                    position: "relative", display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <div style={{
                      position: "absolute", top: "16px", left: "16px",
                      display: "flex", alignItems: "center", gap: "6px",
                      padding: "6px 14px", background: "rgba(255,255,255,0.95)",
                      backdropFilter: "blur(8px)", border: `1.5px solid ${T.line}`,
                      borderRadius: "8px", fontSize: "12px", fontWeight: 600, color: T.inkSub,
                    }}>
                      <Calendar size={13} />
                      {achievement.year}
                    </div>
                    <div className="achievement-icon-wrapper" style={{
                      width: "90px", height: "90px",
                      background: "rgba(255,255,255,0.95)", backdropFilter: "blur(12px)",
                      border: `2px solid ${achievement.color}30`, borderRadius: "18px",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      boxShadow: `0 8px 32px ${achievement.color}20`,
                    }}>
                      <achievement.icon size={44} style={{ color: achievement.color }} />
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="achievement-content" style={{ padding: "28px" }}>
                    <span style={{
                      display: "inline-block", padding: "6px 14px",
                      background: `${achievement.color}10`,
                      border: `1.5px solid ${achievement.color}25`,
                      borderRadius: "8px", color: achievement.color,
                      fontSize: "11px", fontWeight: 700,
                      textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "16px",
                    }}>
                      {achievement.category}
                    </span>

                    <h3 className="achievement-title" style={{
                      fontFamily: "'Fraunces', serif", fontSize: "22px", fontWeight: 700,
                      color: T.ink, marginBottom: "6px", letterSpacing: "-0.01em",
                    }}>
                      {achievement.title}
                    </h3>
                    <p className="achievement-event" style={{
                      fontSize: "14px", color: T.inkMute, marginBottom: "4px", fontWeight: 600,
                    }}>
                      {achievement.event}
                    </p>
                    <p style={{ fontSize: "13px", color: achievement.color, fontWeight: 600, marginBottom: "16px" }}>
                      {achievement.rank}
                    </p>
                    <p className="achievement-description" style={{
                      fontSize: "14.5px", color: T.inkSub, lineHeight: 1.7, marginBottom: "20px",
                    }}>
                      {achievement.context.slice(0, 140)}…
                    </p>

                    {/* Metrics Row */}
                    <div className="metrics-row" style={{
                      display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
                      gap: "10px", marginBottom: "20px",
                    }}>
                      {Object.entries(achievement.metrics).map(([key, value]) => (
                        <div key={key} className="metric-box" style={{
                          padding: "12px", background: T.surface,
                          border: `1.5px solid ${T.line}`, borderRadius: "10px", textAlign: "center",
                        }}>
                          <div className="metric-box-value" style={{
                            fontSize: "14px", fontWeight: 700, color: T.ink, marginBottom: "3px",
                          }}>
                            {value}
                          </div>
                          <div className="metric-box-label" style={{
                            fontSize: "10px", color: T.inkMute,
                            textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 600,
                          }}>
                            {key.replace("_", " ")}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Tech Stack */}
                    <div className="tech-stack" style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "20px" }}>
                      {achievement.tech.slice(0, 4).map((tech, i) => (
                        <span key={i} className="tech-badge" style={{
                          padding: "5px 12px", background: T.surface,
                          border: `1.5px solid ${T.line}`, borderRadius: "6px",
                          fontSize: "12px", color: T.inkSub, fontWeight: 500,
                        }}>
                          {tech}
                        </span>
                      ))}
                      {achievement.tech.length > 4 && (
                        <span className="tech-badge" style={{
                          padding: "5px 12px", background: T.surface,
                          border: `1.5px solid ${T.line}`, borderRadius: "6px",
                          fontSize: "12px", color: T.inkSub, fontWeight: 600,
                        }}>
                          +{achievement.tech.length - 4}
                        </span>
                      )}
                    </div>

                    {/* View Details Button */}
                    <button className="view-details-btn" style={{
                      width: "100%", display: "flex", alignItems: "center",
                      justifyContent: "center", gap: "8px", padding: "14px",
                      background: hoveredCard === achievement.id ? `${achievement.color}12` : `${achievement.color}08`,
                      border: `1.5px solid ${hoveredCard === achievement.id ? `${achievement.color}30` : `${achievement.color}20`}`,
                      borderRadius: "12px", color: achievement.color,
                      fontSize: "14px", fontWeight: 600, cursor: "pointer", transition: "all 0.3s ease",
                    }}>
                      View Full Case Study
                      <ChevronRight size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── ENGINEERING PRINCIPLES ── */}
          <div style={{ marginBottom: "100px" }}>
            <h2 className="section-title" style={{
              fontFamily: "'Fraunces', serif",
              fontSize: "clamp(32px, 4vw, 42px)", fontWeight: 700,
              color: T.ink, marginBottom: "16px", textAlign: "center", letterSpacing: "-0.02em",
            }}>
              How I Approach Building
            </h2>
            <p className="section-description" style={{
              fontSize: "16px", color: T.inkSub, textAlign: "center",
              maxWidth: "560px", margin: "0 auto 60px", lineHeight: 1.7,
            }}>
              Principles that consistently inform technical decisions across projects —
              from initial architecture to deployment and maintenance.
            </p>

            <div className="principles-grid" style={{
              display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px",
            }}>
              {principles.map((principle, index) => (
                <div key={index} className="principle-card" style={{
                  background: "#fff", border: `1.5px solid ${T.line}`,
                  borderRadius: "16px", padding: "32px 28px",
                  transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
                }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.borderColor = T.lineMd; e.currentTarget.style.boxShadow = "0 12px 40px rgba(0,0,0,0.08)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.borderColor = T.line; e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.03)"; }}
                >
                  <div className="principle-icon-wrapper" style={{
                    width: "56px", height: "56px",
                    background: `${principle.color}10`, borderRadius: "12px",
                    display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "20px",
                  }}>
                    <principle.icon size={28} style={{ color: principle.color }} />
                  </div>
                  <h3 className="principle-title" style={{
                    fontFamily: "'Fraunces', serif", fontSize: "20px", fontWeight: 700,
                    color: T.ink, marginBottom: "12px", letterSpacing: "-0.01em",
                  }}>
                    {principle.title}
                  </h3>
                  <p className="principle-description" style={{ fontSize: "15px", color: T.inkSub, lineHeight: 1.7 }}>
                    {principle.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* ── MODAL ── */}
      {activeAchievement && (
        <div
          onClick={() => setActiveAchievement(null)}
          style={{
            position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)",
            backdropFilter: "blur(12px)", zIndex: 9999,
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: "20px", overflowY: "auto",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="modal-content"
            style={{
              background: "#fff", border: `1.5px solid ${T.lineMd}`,
              borderRadius: "24px", maxWidth: "1000px", width: "100%",
              maxHeight: "90vh", overflowY: "auto", position: "relative",
              animation: "slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
              boxShadow: "0 32px 96px rgba(0,0,0,0.2)",
            }}
          >
            {/* Modal Header */}
            <div className="modal-header" style={{
              padding: "36px 40px", borderBottom: `1.5px solid ${T.line}`,
              display: "flex", alignItems: "flex-start",
              justifyContent: "space-between", gap: "20px",
            }}>
              <div style={{ flex: 1 }}>
                <span style={{
                  display: "inline-block", padding: "6px 14px",
                  background: `${activeAchievement.color}10`,
                  border: `1.5px solid ${activeAchievement.color}25`,
                  borderRadius: "8px", color: activeAchievement.color,
                  fontSize: "11px", fontWeight: 700,
                  textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "16px",
                }}>
                  {activeAchievement.category}
                </span>
                <h2 style={{
                  fontFamily: "'Fraunces', serif", fontSize: "30px", fontWeight: 700,
                  color: T.ink, marginBottom: "6px", letterSpacing: "-0.02em",
                }}>
                  {activeAchievement.title}
                </h2>
                <p style={{ fontSize: "15px", color: T.inkMute, fontWeight: 500, marginBottom: "4px" }}>
                  {activeAchievement.event}
                </p>
                <p style={{ fontSize: "14px", color: activeAchievement.color, fontWeight: 600 }}>
                  {activeAchievement.rank}
                </p>
              </div>
              <button
                onClick={() => setActiveAchievement(null)}
                className="modal-close-btn"
                style={{
                  width: "44px", height: "44px",
                  background: "rgba(239,68,68,0.08)",
                  border: "1.5px solid rgba(239,68,68,0.2)",
                  borderRadius: "12px", color: "#ef4444",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  cursor: "pointer", transition: "all 0.2s ease", flexShrink: 0,
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(239,68,68,0.15)"; e.currentTarget.style.transform = "scale(1.05)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(239,68,68,0.08)"; e.currentTarget.style.transform = "scale(1)"; }}
              >
                <X size={22} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="modal-body" style={{ padding: "40px" }}>

              {/* Context */}
              <div className="modal-section" style={{ marginBottom: "32px" }}>
                <h3 className="modal-section-title" style={{
                  fontFamily: "'Fraunces', serif", fontSize: "20px", fontWeight: 700,
                  color: activeAchievement.color, marginBottom: "12px", letterSpacing: "-0.01em",
                }}>
                  Context
                </h3>
                <p className="modal-section-text" style={{ fontSize: "16px", color: T.inkSub, lineHeight: 1.75 }}>
                  {activeAchievement.context}
                </p>
              </div>

              {/* Ownership Scope */}
              <div className="modal-section" style={{ marginBottom: "32px" }}>
                <h3 className="modal-section-title" style={{
                  fontFamily: "'Fraunces', serif", fontSize: "20px", fontWeight: 700,
                  color: activeAchievement.color, marginBottom: "12px", letterSpacing: "-0.01em",
                }}>
                  My Role & Scope
                </h3>
                <p className="modal-section-text" style={{ fontSize: "16px", color: T.inkSub, lineHeight: 1.75 }}>
                  {activeAchievement.ownership}
                </p>
              </div>

              {/* Technical Decisions */}
              <div className="modal-section" style={{ marginBottom: "32px" }}>
                <h3 className="modal-section-title" style={{
                  fontFamily: "'Fraunces', serif", fontSize: "20px", fontWeight: 700,
                  color: activeAchievement.color, marginBottom: "16px", letterSpacing: "-0.01em",
                }}>
                  Technical Decisions
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  {activeAchievement.decisions.map((decision, i) => (
                    <div key={i} className="decision-item" style={{
                      display: "flex", alignItems: "flex-start", gap: "12px",
                      padding: "16px", background: T.surface,
                      border: `1.5px solid ${T.line}`, borderRadius: "12px",
                    }}>
                      <Zap size={18} style={{ color: activeAchievement.color, flexShrink: 0, marginTop: "2px" }} />
                      <span style={{ fontSize: "15px", color: T.inkSub, lineHeight: 1.7 }}>{decision}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Risks Managed */}
              {activeAchievement.risks && (
                <div className="modal-section" style={{ marginBottom: "32px" }}>
                  <h3 className="modal-section-title" style={{
                    fontFamily: "'Fraunces', serif", fontSize: "20px", fontWeight: 700,
                    color: activeAchievement.color, marginBottom: "16px", letterSpacing: "-0.01em",
                  }}>
                    Risks & How They Were Handled
                  </h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    {activeAchievement.risks.map((risk, i) => (
                      <div key={i} className="risk-item" style={{
                        display: "flex", alignItems: "flex-start", gap: "12px",
                        padding: "16px", background: "rgba(239,68,68,0.04)",
                        border: "1.5px solid rgba(239,68,68,0.12)", borderRadius: "12px",
                      }}>
                        <Shield size={18} style={{ color: "#ef4444", flexShrink: 0, marginTop: "2px" }} />
                        <span style={{ fontSize: "15px", color: T.inkSub, lineHeight: 1.7 }}>{risk}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Outcome */}
              <div className="modal-section" style={{ marginBottom: "32px" }}>
                <h3 className="modal-section-title" style={{
                  fontFamily: "'Fraunces', serif", fontSize: "20px", fontWeight: 700,
                  color: activeAchievement.color, marginBottom: "12px", letterSpacing: "-0.01em",
                }}>
                  Outcome
                </h3>
                <p className="modal-section-text" style={{ fontSize: "16px", color: T.inkSub, lineHeight: 1.75 }}>
                  {activeAchievement.outcome}
                </p>
              </div>

              {/* Technologies */}
              <div className="modal-section" style={{ marginBottom: "32px" }}>
                <h3 className="modal-section-title" style={{
                  fontFamily: "'Fraunces', serif", fontSize: "20px", fontWeight: 700,
                  color: activeAchievement.color, marginBottom: "16px", letterSpacing: "-0.01em",
                }}>
                  Technologies Used
                </h3>
                <div className="tech-tags" style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                  {activeAchievement.tech.map((tech, i) => (
                    <span key={i} className="tech-tag" style={{
                      padding: "8px 16px",
                      background: `${activeAchievement.color}10`,
                      border: `1.5px solid ${activeAchievement.color}25`,
                      borderRadius: "8px", fontSize: "14px",
                      color: activeAchievement.color, fontWeight: 600,
                    }}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* External Link */}
              {activeAchievement.link && (
                <a href={activeAchievement.link} target="_blank" rel="noopener noreferrer" style={{
                  display: "flex", alignItems: "center", justifyContent: "center",
                  gap: "10px", width: "100%", padding: "16px",
                  background: `linear-gradient(135deg, ${activeAchievement.color} 0%, ${activeAchievement.color}dd 100%)`,
                  border: "none", borderRadius: "12px", color: "#fff",
                  fontSize: "15px", fontWeight: 600, textDecoration: "none", transition: "all 0.3s ease",
                }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = `0 8px 24px ${activeAchievement.color}40`; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
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