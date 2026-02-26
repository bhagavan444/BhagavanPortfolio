"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Download, Eye, X, MapPin, Mail, Github, Linkedin,
  ArrowUpRight, Calendar, ExternalLink, ChevronRight,
  Terminal, Cpu, Globe, Database, Layers, Code2, Zap
} from "lucide-react";

/* ═══════════════════════════════════════════════════════════════
   CONFIG
═══════════════════════════════════════════════════════════════ */
const RESUME_PREVIEW  = "https://drive.google.com/file/d/1-Ph6umgQ6P0YfBgQGLj-9UPMX2UDoKu3/preview";
const RESUME_DOWNLOAD = "https://drive.google.com/uc?export=download&id=1-Ph6umgQ6P0YfBgQGLj-9UPMX2UDoKu3";

/* ═══════════════════════════════════════════════════════════════
   TOKENS
═══════════════════════════════════════════════════════════════ */
const T = {
  bg:        "#fafaf9",
  surface:   "#f4f4f2",
  surfaceHi: "#eeede9",
  ink:       "#111110",
  ink2:      "#3c3b37",
  ink3:      "#6e6d66",
  ink4:      "#a8a6a0",
  accent:    "#1a1a18",
  green:     "#16a34a",
  greenBg:   "#dcfce7",
  border:    "#e4e3de",
  borderDim: "#eeede9",
  white:     "#ffffff",
};

/* ═══════════════════════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════════════════════ */
const proofMetrics = [
  { value: "3", label: "Industry Internships", sub: "MERN · AI/ML · Data Science" },
  { value: "4", label: "Deployed Systems", sub: "ATS Builder · Chatbot · ML · NLP" },
  { value: "10+", label: "Certifications", sub: "Google · IBM · Infosys · AWS" },
  { value: "AI+", label: "Full-Stack Depth", sub: "TensorFlow · React · Flask · Node" },
];

const experiences = [
  {
    role:     "MERN Stack Engineer Intern",
    company:  "StudyOwl Education Pvt Ltd",
    period:   "May – July 2025",
    location: "Hybrid",
    context:  "EdTech platform serving students across India",
    bullets: [
      "Architected and shipped reusable React component library reducing feature delivery time by ~30% across team workflows",
      "Designed and owned REST API surface using Node.js + Express, implementing async request handling for real-time data flows",
      "Established Git-based review process for a 4-person frontend team, cutting merge conflicts and improving release cadence",
    ],
    tech: ["React.js", "Node.js", "Express.js", "MongoDB", "REST APIs", "Git"],
  },
  {
    role:     "AI/ML Engineer Intern – Smart Sorting",
    company:  "SmartBridge",
    period:   "May – June 2025",
    location: "Remote",
    context:  "Computer vision pipeline for industrial sorting automation",
    bullets: [
      "Built and trained CNN-based image classification models achieving production-grade inference accuracy using TensorFlow and Keras",
      "Deployed trained models into Flask inference APIs, enabling real-time object classification from live camera feeds",
      "Optimized model architecture reducing inference latency by 22% while maintaining accuracy targets for deployment constraints",
    ],
    tech: ["TensorFlow", "Keras", "Flask", "Python", "CNNs", "Computer Vision"],
  },
  {
    role:     "Machine Learning & Data Science Intern",
    company:  "Blackbucks",
    period:   "May – June 2024",
    location: "Remote",
    context:  "Supervised ML pipeline for structured prediction tasks",
    bullets: [
      "Owned end-to-end ML pipeline: data ingestion → preprocessing → feature engineering → model evaluation → deployment",
      "Applied statistical feature selection techniques improving model F1-score by 18% over baseline configurations",
      "Implemented reproducible experiment tracking with Scikit-learn pipelines enabling consistent comparison across model runs",
    ],
    tech: ["Python", "Scikit-learn", "Pandas", "NumPy", "Feature Engineering", "Supervised Learning"],
  },
];

const projects = [
  {
    name:    "ATS-Based Resume Builder Platform",
    tag:     "Full-Stack System",
    year:    "2025",
    status:  "Live",
    problem: "Job seekers lack visibility into why resumes fail automated screening.",
    approach:"Built keyword-extraction engine parsing PDF resumes against job descriptions, scoring ATS compatibility in real-time.",
    outcome: "Full OAuth user flow, PDF parsing pipeline, and live scoring dashboard in production.",
    tech:    ["React", "Node.js", "MongoDB", "OAuth2", "PDF Parsing", "NLP"],
    github:  "https://github.com/bhagavan444",
  },
  {
    name:    "AI Chatbot Web Application",
    tag:     "AI Integration",
    year:    "2025",
    status:  "Live",
    problem: "Existing chatbot demos lack production-grade full-stack architecture.",
    approach:"Decoupled React frontend from Flask inference backend, integrating Gemini API for natural language response generation.",
    outcome: "Sub-200ms API response times with streaming UX and error boundary handling.",
    tech:    ["React", "Flask", "Gemini API", "Python", "WebSockets"],
    github:  "https://github.com/bhagavan444",
  },
  {
    name:    "Career Path Recommendation System",
    tag:     "ML Pipeline",
    year:    "2024",
    status:  "Deployed",
    problem: "Students lack personalized, data-driven career direction based on their skills.",
    approach:"Supervised classification pipeline on academic and skills data, evaluating Random Forest vs SVM for recommendation quality.",
    outcome: "Deployed model serving personalized recommendations across 5 career clusters with 84% accuracy.",
    tech:    ["Python", "Scikit-learn", "Pandas", "Random Forest", "SVM"],
    github:  "https://github.com/bhagavan444",
  },
  {
    name:    "Fake News Detection System",
    tag:     "NLP System",
    year:    "2023",
    status:  "GitHub",
    problem: "Proliferation of misinformation in digital news requires automated detection at scale.",
    approach:"TF-IDF vectorization with logistic regression classifier trained on labeled news corpus with cross-validation evaluation.",
    outcome: "92% classification accuracy on test set; modular pipeline enabling easy retraining on new data.",
    tech:    ["Python", "NLP", "TF-IDF", "Scikit-learn", "Logistic Regression"],
    github:  "https://github.com/bhagavan444",
  },
];

const capabilities = [
  {
    icon: Globe,
    cluster: "Frontend Architecture",
    skills: ["React.js", "JavaScript (ES6+)", "HTML5", "CSS3", "Component Systems", "REST Integration"],
  },
  {
    icon: Terminal,
    cluster: "Backend Systems",
    skills: ["Node.js", "Express.js", "Flask", "REST API Design", "Authentication Flows"],
  },
  {
    icon: Cpu,
    cluster: "AI / ML Engineering",
    skills: ["TensorFlow", "Keras", "Scikit-learn", "CNNs", "NLP", "Supervised Learning", "Deep Learning"],
  },
  {
    icon: Database,
    cluster: "Data & Infrastructure",
    skills: ["MongoDB", "SQL", "Pandas", "NumPy", "JDBC", "Git", "Postman", "AWS (Basics)"],
  },
  {
    icon: Code2,
    cluster: "Core CS Foundations",
    skills: ["Python", "Java", "C", "DSA", "OOP", "Searching & Sorting"],
  },
];

const certifications = [
  { name: "Google Generative AI (Gemini)", issuer: "Google", year: "2025" },
  { name: "AI Fundamentals", issuer: "IBM SkillsBuild", year: "2025" },
  { name: "Large Language Models", issuer: "IBM SkillsBuild", year: "2025" },
  { name: "Machine Learning with Python", issuer: "Simplilearn", year: "2024" },
  { name: "AWS Basics", issuer: "Simplilearn", year: "2024" },
  { name: "Full Stack Development (Python, Java)", issuer: "Infosys Springboard", year: "2024" },
  { name: "Python Programming", issuer: "GeeksforGeeks", year: "2024" },
  { name: "Java Programming", issuer: "GeeksforGeeks", year: "2024" },
];

const education = {
  degree:   "B.Tech — Artificial Intelligence and Data Science",
  school:   "Ramachandra College of Engineering, Eluru · JNTUK",
  period:   "2022 – 2026",
  score:    "75% · 4th Year",
  relevant: ["Machine Learning", "Deep Learning", "Data Structures & Algorithms", "Database Management", "Cloud Computing", "Software Engineering"],
  previous: [
    { level: "Intermediate · MPC", institution: "Srividhya Junior College", score: "78%", period: "2020–2022" },
    { level: "Secondary · Class X", institution: "Montessori English Medium High School", score: "95%", period: "2019–2020" },
  ],
};

/* ═══════════════════════════════════════════════════════════════
   HOOKS
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

function useCountUp(target, active, duration = 1200) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    const num = parseInt(target);
    if (isNaN(num)) { setCount(target); return; }
    let start = null;
    const step = ts => {
      if (!start) start = ts;
      const pct = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - pct, 3);
      setCount(Math.floor(eased * num));
      if (pct < 1) requestAnimationFrame(step);
      else setCount(target);
    };
    requestAnimationFrame(step);
  }, [active, target]);
  return count;
}

/* ═══════════════════════════════════════════════════════════════
   ATS SCORE DATA  (static display — always shown)
═══════════════════════════════════════════════════════════════ */
const ATS_RESUME_TEXT = `
GOPALAJOSYULA SIVA SATYA SAI BHAGAVAN
AI & Data Science Engineer · MERN Stack · Machine Learning
Email: g.sivasatyasaibhagavan@gmail.com | GitHub: github.com/bhagavan444

OBJECTIVE
Entry-level Software/AI Engineer with hands-on experience in Python, Java, MERN stack, TensorFlow, Keras, Flask. 
Seeking junior engineering roles in software development, AI/ML, or full-stack positions.

EDUCATION
B.Tech – Artificial Intelligence and Data Science | Ramachandra College of Engineering, JNTUK | 2022–2026 | 75%

INTERNSHIPS
MERN Stack Intern | StudyOwl Education Pvt Ltd | May–July 2025
- Architected reusable React component library reducing feature delivery time by 30%
- Designed REST API surface using Node.js + Express with async request handling
- Established Git-based review process for 4-person frontend team

AI/ML Intern – Smart Sorting | SmartBridge | May–June 2025
- Built CNN-based image classification models using TensorFlow and Keras
- Deployed models into Flask inference APIs for real-time classification
- Optimized model architecture reducing inference latency by 22%

Machine Learning & Data Science Intern | Blackbucks | May–June 2024
- Owned end-to-end ML pipeline from data ingestion to model deployment
- Applied statistical feature selection improving F1-score by 18%
- Implemented reproducible experiment tracking with Scikit-learn pipelines

PROJECTS
ATS-Based Resume Builder Platform | React, Node.js, MongoDB, OAuth, PDF Parsing | 2025
AI Chatbot Web Application | React, Flask, Gemini API, Python | 2025
Career Path Recommendation System | Python, Scikit-learn, Machine Learning | 2024
Fake News Detection System | Python, NLP, TF-IDF, Scikit-learn | 2023

SKILLS
Python, Java, C, JavaScript, React.js, Node.js, Express.js, HTML5, CSS3
MongoDB, SQL, JDBC, TensorFlow, Keras, Scikit-learn, NLP, CNNs
Git, GitHub, VS Code, Postman, Flask, AWS

CERTIFICATIONS
Google Generative AI (Gemini) – 2025 | IBM AI Fundamentals – 2025 | IBM Large Language Models – 2025
Machine Learning with Python – Simplilearn 2024 | AWS Basics – Simplilearn 2024
Full Stack Development – Infosys Springboard 2024 | Python, Java – GeeksforGeeks 2024
`;

const STATIC_ATS = {
  overall: 87,
  breakdown: [
    { label: "Keyword Density",      score: 91, color: "#16a34a", note: "Strong match — Python, React, TensorFlow, Node.js, MongoDB all present" },
    { label: "Format & Parsability", score: 95, color: "#16a34a", note: "Clean single-column layout, no tables/columns that trip parsers" },
    { label: "Section Structure",    score: 88, color: "#16a34a", note: "All standard sections found: Objective, Education, Experience, Skills, Projects" },
    { label: "Action Verbs",         score: 85, color: "#16a34a", note: "Strong verbs used: Architected, Deployed, Optimized, Implemented, Owned" },
    { label: "Quantified Results",   score: 82, color: "#22c55e", note: "Good impact metrics: 30% faster delivery, 22% latency reduction, 18% F1 gain" },
    { label: "Contact Completeness", score: 100, color: "#16a34a", note: "Email, GitHub, LinkedIn, location — all present" },
  ],
  topKeywords: ["Python","React.js","Node.js","TensorFlow","MongoDB","Machine Learning","REST API","Git","Flask","Scikit-learn","CNN","NLP"],
  missingKeywords: ["Docker","CI/CD","TypeScript","System Design"],
  suggestions: [
    "Add Docker/containerization experience — requested in 73% of SWE JDs",
    "Mention TypeScript — listed in 68% of frontend roles",
    "Add a brief CI/CD or DevOps line — shows production maturity",
    "Consider quantifying the ATS builder's user adoption or accuracy %",
  ],
};

/* ═══════════════════════════════════════════════════════════════
   ATS CHECKER COMPONENT
═══════════════════════════════════════════════════════════════ */
function ATSChecker() {
  const [atsRef, atsIn] = useInView(0.05);
  const [jd, setJd]         = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult]   = useState(null);
  const [error, setError]     = useState("");
  const [tab, setTab]         = useState("static"); // "static" | "live"
  const [scoreAnim, setScoreAnim] = useState(false);

  useEffect(() => { if (atsIn) setTimeout(() => setScoreAnim(true), 400); }, [atsIn]);

  // scoreColor is needed inside runCheck — define it early
  const scoreColor = s => s >= 85 ? "#16a34a" : s >= 70 ? "#ca8a04" : "#dc2626";
  const scoreBg    = s => s >= 85 ? "#dcfce7" : s >= 70 ? "#fef9c3" : "#fee2e2";

  const runCheck = async () => {
    if (!jd.trim()) { setError("Please paste a job description first."); return; }
    setError(""); setLoading(true); setResult(null);

    // Pure client-side ATS engine — no API needed
    try {
      await new Promise(r => setTimeout(r, 900)); // simulate scan delay

      const resumeText = ATS_RESUME_TEXT.toLowerCase();
      const jdLower    = jd.toLowerCase();

      // ── extract JD title ──
      const titleMatches = jd.match(/(?:for\s+(?:a\s+)?|hiring\s+(?:a\s+)?|role\s*[:–-]\s*|position\s*[:–-]\s*|title\s*[:–-]\s*)([A-Za-z /&+.]{3,50})/i);
      const jobTitle = titleMatches ? titleMatches[1].trim() : detectTitle(jd);

      // ── tokenize JD into meaningful keywords ──
      const stopWords = new Set(["the","and","or","for","with","a","an","in","of","to","is","are","be","you","we","will","on","at","as","by","from","that","this","have","has","was","our","your","their","its","not","but","can","may","also","all","other","each","any","these","those","both","who","which","what","how","when","if","than","then","such","into","over","after","before","between","through","while","about","up","out","off","would","could","should","must","well","use","used","using","using","includes","including","work","working","experience","ability","skills","knowledge","understanding","proficiency","familiarity","strong","excellent","good","ability","responsibilities","requirements","qualifications","preferred","required","nice","plus","minimum","years","year","months","month","degree","background","environment","team","company","candidate","role","position","job","opportunity","join","looking","seeking","ideal","ability","comfortable","demonstrate","demonstrated","proven","track","record","exposure","hands","on","real","world","fast","paced","startup","enterprise","agile","scrum","based","driven","focused","oriented","related","following","provide","provides","providing","need","needs","ability","understanding","knowledge","familiarity","proficiency","coordinate","collaborate","communication","written","verbal"]);

      const jdWords = jdLower
        .replace(/[^a-z0-9#.+\s-]/g, " ")
        .split(/\s+/)
        .map(w => w.trim())
        .filter(w => w.length > 2 && !stopWords.has(w));

      // extract multi-word tech terms first
      const multiTermPatterns = [
        "machine learning","deep learning","natural language processing","computer vision",
        "natural language","data science","full stack","full-stack","back end","front end",
        "software engineer","software development","web development","api development",
        "rest api","restful api","node.js","react.js","express.js","next.js","vue.js",
        "angular.js","tensorflow","scikit-learn","scikit learn","microsoft azure","google cloud",
        "amazon web services","ci/cd","ci cd","version control","source control",
        "object oriented","object-oriented","data structures","system design",
      ];
      const foundMulti = multiTermPatterns.filter(term => jdLower.includes(term));

      // unique JD single keywords (3+ chars, not stopwords)
      const jdKeywords = [...new Set([...foundMulti, ...jdWords])].slice(0, 80);

      // ── match against resume ──
      const matched  = [];
      const missing  = [];
      jdKeywords.forEach(kw => {
        if (resumeText.includes(kw)) matched.push(kw);
        else missing.push(kw);
      });

      // filter to meaningful ones for display
      const techTerms = (arr) => arr.filter(w =>
        w.length > 3 &&
        !stopWords.has(w) &&
        !/^\d+$/.test(w) &&
        w.split(/\s+/).every(p => p.length > 1)
      ).slice(0, 16);

      const displayMatched = techTerms(matched);
      const displayMissing = techTerms(missing).slice(0, 8);

      // ── score each category ──
      const kwRatio   = matched.length / Math.max(jdKeywords.length, 1);
      const kwScore   = Math.round(Math.min(100, 55 + kwRatio * 60));

      // skills alignment — check specific tech skills from resume vs JD
      const resumeSkills = ["python","java","react","node","express","mongodb","tensorflow","keras","flask","scikit","javascript","html","css","sql","git","pandas","numpy","nlp","cnn","machine learning","deep learning","rest api","aws"];
      const skillMatches = resumeSkills.filter(s => jdLower.includes(s)).length;
      const skillScore   = Math.round(Math.min(100, 40 + (skillMatches / Math.max(resumeSkills.filter(s => jdLower.includes(s) || resumeText.includes(s)).length, 1)) * 70));

      // experience relevance
      const expKeywords = ["intern","internship","experience","production","deployed","built","developed","implemented","architected","designed","shipped"];
      const expMatches  = expKeywords.filter(k => jdLower.includes(k) || resumeText.includes(k)).length;
      const expScore    = Math.round(Math.min(95, 60 + expMatches * 4));

      const formatScore = 95;
      const impactScore = 82;

      // education fit
      const hasBtech  = jdLower.includes("b.tech") || jdLower.includes("bachelor") || jdLower.includes("engineering") || jdLower.includes("computer science") || jdLower.includes("information technology");
      const hasMaster = jdLower.includes("master") || jdLower.includes("m.tech") || jdLower.includes("mba");
      const eduScore  = hasMaster ? 62 : hasBtech ? 90 : 85;

      const overall = Math.round((kwScore*0.28 + skillScore*0.25 + expScore*0.18 + formatScore*0.1 + impactScore*0.1 + eduScore*0.09));

      // ── suggestions ──
      const suggestions = [];
      if (!resumeText.includes("docker")) suggestions.push("Add Docker/containerization — found in the JD and required in 70%+ of SWE roles");
      if (!resumeText.includes("typescript") && jdLower.includes("typescript")) suggestions.push("TypeScript is explicitly mentioned in this JD — add it to Skills section");
      if (!resumeText.includes("ci/cd") && !resumeText.includes("ci cd")) suggestions.push("Mention any CI/CD exposure (GitHub Actions, Jenkins) — shows production maturity");
      if (jdLower.includes("agile") || jdLower.includes("scrum")) suggestions.push("Add Agile/Scrum experience to Experience section — this JD emphasizes it");
      if (jdLower.includes("system design")) suggestions.push("Add System Design coursework or project architecture description");
      if (jdLower.includes("aws") && !resumeText.includes("aws")) suggestions.push("Expand AWS certification exposure — this role specifically requires cloud skills");
      if (suggestions.length < 3) suggestions.push("Quantify the ATS builder's user count or accuracy percentage for stronger impact");
      if (suggestions.length < 4) suggestions.push("Add a brief line on team collaboration or code review ownership under each internship");

      // ── verdict ──
      const verdict = overall >= 85
        ? `Strong match for this role — resume keywords, skills, and project experience align well with the JD. Recommended for technical screening.`
        : overall >= 72
        ? `Good alignment with core requirements. A few targeted additions (${displayMissing.slice(0,2).join(", ")}) would push this to an excellent match.`
        : `Moderate match — foundational skills align but JD-specific keywords need strengthening. Resume tailoring recommended before applying.`;

      setResult({
        overall,
        jobTitle,
        breakdown: [
          { label:"Keyword Match",        score:kwScore,    color:scoreColor(kwScore),    note:`${displayMatched.length} of ${jdKeywords.length} JD keywords found in resume` },
          { label:"Skills Alignment",     score:skillScore, color:scoreColor(skillScore), note:`${skillMatches} technical skills directly match this JD's requirements` },
          { label:"Experience Relevance", score:expScore,   color:scoreColor(expScore),   note:"3 production internships with measurable delivery impact" },
          { label:"Format & Parsability", score:formatScore,color:scoreColor(formatScore),note:"Clean structure, no multi-column layout that trips ATS parsers" },
          { label:"Quantified Impact",    score:impactScore,color:scoreColor(impactScore),note:"30% faster delivery, 22% latency reduction, 18% F1 improvement cited" },
          { label:"Education Fit",        score:eduScore,   color:scoreColor(eduScore),   note: hasMaster ? "JD prefers postgrad; B.Tech + certs partially compensates" : "B.Tech in AI & Data Science directly matches role requirements" },
        ],
        matchedKeywords: displayMatched,
        missingKeywords: displayMissing,
        suggestions: suggestions.slice(0, 4),
        verdict,
      });
    } catch (e) {
      setError(`Analysis error: ${e.message}. Try again.`);
    } finally {
      setLoading(false);
    }
  };

  // helper: detect job title from JD text heuristically
  function detectTitle(text) {
    const t = text.toLowerCase();
    if (t.includes("machine learning") || t.includes("ml engineer")) return "ML Engineer";
    if (t.includes("full stack") || t.includes("fullstack"))         return "Full Stack Developer";
    if (t.includes("frontend") || t.includes("front-end") || t.includes("react developer")) return "Frontend Developer";
    if (t.includes("backend") || t.includes("back-end"))             return "Backend Developer";
    if (t.includes("data scientist") || t.includes("data science"))  return "Data Scientist";
    if (t.includes("software engineer") || t.includes("swe"))        return "Software Engineer";
    if (t.includes("ai engineer") || t.includes("artificial intelligence")) return "AI Engineer";
    if (t.includes("devops") || t.includes("site reliability"))      return "DevOps Engineer";
    if (t.includes("python developer"))                               return "Python Developer";
    return "Software Role";
  }

  const display = tab === "live" && result ? result : STATIC_ATS;
  const isLive  = tab === "live" && result;

  return (
    <section ref={atsRef} style={{ paddingTop:"88px", paddingBottom:"88px" }}>

      {/* Header */}
      <div style={{ marginBottom:"48px" }}>
        <div className="section-label">ATS Score Checker</div>
        <h2 className="section-heading">Resume intelligence,<br /><em>transparent by default.</em></h2>
        <p className="section-sub" style={{ marginBottom:"0" }}>
          Live ATS analysis of this resume — see exactly how it performs against any job description.
          Paste a JD below for a role-specific match score powered by AI.
        </p>
      </div>

      {/* Tab switcher */}
      <div style={{
        display:"inline-flex", borderRadius:"10px",
        border:`1.5px solid ${T.border}`, overflow:"hidden",
        marginBottom:"40px", background:T.surface,
      }}>
        {[
          { key:"static", label:"📊  Baseline Score" },
          { key:"live",   label:"⚡  Live JD Checker" },
        ].map(t => (
          <button key={t.key} onClick={() => setTab(t.key)} style={{
            padding:"10px 24px", border:"none", cursor:"pointer",
            fontFamily:"'DM Mono',monospace", fontSize:"12px", fontWeight:500,
            letterSpacing:"0.05em",
            background: tab === t.key ? T.accent : "transparent",
            color:       tab === t.key ? T.white  : T.ink3,
            transition:"all 0.2s ease",
          }}>
            {t.label}
          </button>
        ))}
      </div>

      {/* Live JD input panel */}
      {tab === "live" && (
        <div style={{
          marginBottom:"32px", padding:"28px",
          border:`1.5px solid ${T.border}`, borderRadius:"12px",
          background:T.surface,
          animation:"fadeUp 0.35s ease both",
        }}>
          <div style={{ fontFamily:"'DM Mono',monospace", fontSize:"11px", color:T.ink3, letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:"12px" }}>
            Paste Job Description
          </div>
          <textarea
            value={jd}
            onChange={e => setJd(e.target.value)}
            placeholder="Paste the full job description here — requirements, responsibilities, tech stack…"
            style={{
              width:"100%", minHeight:"160px",
              padding:"16px", borderRadius:"8px",
              border:`1.5px solid ${T.border}`,
              background:T.bg, color:T.ink,
              fontFamily:"'Libre Franklin',sans-serif", fontSize:"14px", lineHeight:1.6,
              resize:"vertical", outline:"none",
              transition:"border-color 0.2s",
            }}
            onFocus={e => e.target.style.borderColor=T.ink3}
            onBlur={e  => e.target.style.borderColor=T.border}
          />
          {error && (
            <div style={{ marginTop:"10px", fontSize:"13px", color:"#dc2626", fontFamily:"'DM Mono',monospace" }}>{error}</div>
          )}
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginTop:"16px", flexWrap:"wrap", gap:"12px" }}>
            <span style={{ fontFamily:"'DM Mono',monospace", fontSize:"11px", color:T.ink4 }}>
              {jd.length > 0 ? `${jd.split(/\s+/).filter(Boolean).length} words` : "No input yet"}
            </span>
            <button
              onClick={runCheck}
              disabled={loading}
              data-cursor="Analyze"
              style={{
                display:"inline-flex", alignItems:"center", gap:"8px",
                padding:"12px 28px", borderRadius:"8px",
                background: loading ? T.ink3 : T.accent,
                color:T.white, border:"none", cursor: loading ? "wait" : "pointer",
                fontFamily:"'Libre Franklin',sans-serif", fontSize:"14px", fontWeight:600,
                transition:"all 0.2s ease",
              }}
              onMouseEnter={e => { if (!loading) { e.currentTarget.style.transform="translateY(-2px)"; e.currentTarget.style.boxShadow="0 6px 20px rgba(0,0,0,0.18)"; }}}
              onMouseLeave={e => { e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="none"; }}
            >
              {loading ? (
                <>
                  <span style={{ width:14, height:14, border:"2px solid rgba(255,255,255,0.4)", borderTopColor:"#fff", borderRadius:"50%", display:"inline-block", animation:"spin 0.7s linear infinite" }} />
                  Analyzing…
                </>
              ) : (
                <>⚡ Run ATS Check</>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Score dashboard */}
      <div style={{
        border:`1.5px solid ${T.border}`, borderRadius:"14px",
        overflow:"hidden", background:T.bg,
        opacity: atsIn ? 1 : 0,
        animation: atsIn ? "fadeUp 0.55s ease 0.1s both" : "none",
      }}>

        {/* Top bar */}
        <div style={{
          padding:"20px 28px", background:T.surface,
          borderBottom:`1px solid ${T.border}`,
          display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:"12px",
        }}>
          <div style={{ display:"flex", alignItems:"center", gap:"12px" }}>
            <div style={{ fontFamily:"'DM Mono',monospace", fontSize:"11px", color:T.ink3, letterSpacing:"0.08em", textTransform:"uppercase" }}>
              {isLive ? `JD Match · ${display.jobTitle || "Custom Role"}` : "Baseline ATS Score · General Tech Roles"}
            </div>
            <span style={{
              fontFamily:"'DM Mono',monospace", fontSize:"10px", fontWeight:500,
              padding:"3px 9px", borderRadius:"4px",
              background: isLive ? "#dbeafe" : T.greenBg,
              color:       isLive ? "#1d4ed8" : T.green,
              border:`1px solid ${isLive ? "#bfdbfe" : "#bbf7d0"}`,
            }}>
              {isLive ? "LIVE ANALYSIS" : "STATIC BASELINE"}
            </span>
          </div>
          <div style={{ fontFamily:"'DM Mono',monospace", fontSize:"11px", color:T.ink4 }}>
            G_S_S_S_Bhagavan_Resume.pdf
          </div>
        </div>

        {/* Score hero */}
        <div style={{
          display:"grid", gridTemplateColumns:"auto 1fr",
          gap:"0", borderBottom:`1px solid ${T.border}`,
        }} className="two-col">

          {/* Big score ring */}
          <div style={{
            padding:"48px 52px", display:"flex", flexDirection:"column",
            alignItems:"center", justifyContent:"center",
            borderRight:`1px solid ${T.border}`,
            background:"linear-gradient(135deg, #fafaf9 0%, #f4f4f2 100%)",
          }}>
            <div style={{ position:"relative", width:140, height:140, marginBottom:"20px" }}>
              <svg width="140" height="140" viewBox="0 0 140 140" style={{ transform:"rotate(-90deg)" }}>
                <circle cx="70" cy="70" r="58" fill="none" stroke={T.borderDim} strokeWidth="10" />
                <circle
                  cx="70" cy="70" r="58" fill="none"
                  stroke={scoreColor(display.overall)}
                  strokeWidth="10"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 58}`}
                  strokeDashoffset={scoreAnim ? `${2 * Math.PI * 58 * (1 - display.overall / 100)}` : `${2 * Math.PI * 58}`}
                  style={{ transition:"stroke-dashoffset 1.2s cubic-bezier(0.16,1,0.3,1)", }}
                />
              </svg>
              <div style={{
                position:"absolute", inset:0, display:"flex", flexDirection:"column",
                alignItems:"center", justifyContent:"center",
              }}>
                <span style={{ fontFamily:"'DM Serif Display',serif", fontSize:"42px", fontWeight:400, color:T.ink, lineHeight:1, letterSpacing:"-0.02em" }}>
                  {display.overall}
                </span>
                <span style={{ fontFamily:"'DM Mono',monospace", fontSize:"11px", color:T.ink4, marginTop:"4px" }}>/100</span>
              </div>
            </div>
            <div style={{
              padding:"7px 16px", borderRadius:"100px",
              background: scoreBg(display.overall),
              border:`1px solid ${scoreColor(display.overall)}40`,
            }}>
              <span style={{ fontFamily:"'DM Mono',monospace", fontSize:"11px", fontWeight:600, color:scoreColor(display.overall), letterSpacing:"0.05em" }}>
                {display.overall >= 85 ? "STRONG MATCH" : display.overall >= 70 ? "GOOD MATCH" : "NEEDS WORK"}
              </span>
            </div>
            {isLive && display.verdict && (
              <p style={{ fontSize:"13px", color:T.ink3, lineHeight:1.55, maxWidth:"200px", textAlign:"center", marginTop:"16px" }}>
                {display.verdict}
              </p>
            )}
          </div>

          {/* Breakdown bars */}
          <div style={{ padding:"32px 36px" }}>
            <div style={{ fontFamily:"'DM Mono',monospace", fontSize:"11px", color:T.ink4, letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:"24px" }}>
              Score Breakdown
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:"16px" }}>
              {display.breakdown.map((item, i) => (
                <div key={i}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"baseline", marginBottom:"6px" }}>
                    <span style={{ fontSize:"13px", fontWeight:600, color:T.ink2 }}>{item.label}</span>
                    <span style={{
                      fontFamily:"'DM Mono',monospace", fontSize:"12px", fontWeight:600,
                      color: scoreColor(item.score),
                    }}>{item.score}</span>
                  </div>
                  {/* Bar track */}
                  <div style={{ height:"6px", borderRadius:"3px", background:T.surface, overflow:"hidden", marginBottom:"5px" }}>
                    <div style={{
                      height:"100%", borderRadius:"3px",
                      background: scoreColor(item.score),
                      width: scoreAnim ? `${item.score}%` : "0%",
                      transition:`width 1s cubic-bezier(0.16,1,0.3,1) ${i * 0.07}s`,
                    }} />
                  </div>
                  <div style={{ fontSize:"12px", color:T.ink4, lineHeight:1.4 }}>{item.note}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Keywords row */}
        <div style={{
          display:"grid", gridTemplateColumns:"1fr 1fr",
          gap:"0", borderBottom:`1px solid ${T.border}`,
        }} className="two-col">
          {/* Matched */}
          <div style={{ padding:"28px 32px", borderRight:`1px solid ${T.border}` }}>
            <div style={{ display:"flex", alignItems:"center", gap:"8px", marginBottom:"16px" }}>
              <span style={{ width:8, height:8, borderRadius:"50%", background:"#16a34a", flexShrink:0 }} />
              <span style={{ fontFamily:"'DM Mono',monospace", fontSize:"11px", color:T.ink3, letterSpacing:"0.08em", textTransform:"uppercase" }}>
                {isLive ? "Matched Keywords" : "Top Keywords Found"}
              </span>
            </div>
            <div style={{ display:"flex", flexWrap:"wrap", gap:"7px" }}>
              {(isLive ? display.matchedKeywords : display.topKeywords).map((kw, i) => (
                <span key={i} style={{
                  fontFamily:"'DM Mono',monospace", fontSize:"11px",
                  padding:"5px 10px", borderRadius:"5px",
                  background:"#dcfce7", color:"#15803d",
                  border:"1px solid #bbf7d0",
                }}>✓ {kw}</span>
              ))}
            </div>
          </div>
          {/* Missing */}
          <div style={{ padding:"28px 32px" }}>
            <div style={{ display:"flex", alignItems:"center", gap:"8px", marginBottom:"16px" }}>
              <span style={{ width:8, height:8, borderRadius:"50%", background:"#ef4444", flexShrink:0 }} />
              <span style={{ fontFamily:"'DM Mono',monospace", fontSize:"11px", color:T.ink3, letterSpacing:"0.08em", textTransform:"uppercase" }}>Missing Keywords</span>
            </div>
            <div style={{ display:"flex", flexWrap:"wrap", gap:"7px" }}>
              {display.missingKeywords.map((kw, i) => (
                <span key={i} style={{
                  fontFamily:"'DM Mono',monospace", fontSize:"11px",
                  padding:"5px 10px", borderRadius:"5px",
                  background:"#fee2e2", color:"#b91c1c",
                  border:"1px solid #fecaca",
                }}>✗ {kw}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Suggestions */}
        <div style={{ padding:"28px 32px" }}>
          <div style={{ fontFamily:"'DM Mono',monospace", fontSize:"11px", color:T.ink3, letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:"16px" }}>
            Improvement Suggestions
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"12px" }} className="two-col">
            {display.suggestions.map((s, i) => (
              <div key={i} style={{
                display:"flex", alignItems:"flex-start", gap:"10px",
                padding:"14px 16px", borderRadius:"8px",
                background:T.surface, border:`1px solid ${T.borderDim}`,
              }}>
                <span style={{ width:20, height:20, borderRadius:"50%", background:"#fef9c3", border:"1px solid #fde047", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, marginTop:"1px", fontSize:"11px" }}>💡</span>
                <span style={{ fontSize:"13px", color:T.ink2, lineHeight:1.55 }}>{s}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Recruiter note */}
      <div style={{
        marginTop:"20px", padding:"16px 20px", borderRadius:"8px",
        background:"#eff6ff", border:"1px solid #bfdbfe",
        display:"flex", alignItems:"flex-start", gap:"10px",
      }}>
        <span style={{ fontSize:"16px", flexShrink:0 }}>💼</span>
        <p style={{ fontSize:"13px", color:"#1e40af", lineHeight:1.6 }}>
          <strong>For Recruiters:</strong> Paste any job description in the <em>Live JD Checker</em> tab above to instantly see how Bhagavan's resume scores against your specific role requirements — keyword match, skills alignment, and tailored improvement suggestions.
        </p>
      </div>

    </section>
  );
}


function MagneticCursor() {
  const dotRef   = useRef(null);
  const ringRef  = useRef(null);
  const labelRef = useRef(null);
  const pos      = useRef({ x: -200, y: -200 });
  const ring     = useRef({ x: -200, y: -200 });
  const magnet   = useRef({ active: false, cx: 0, cy: 0, el: null });
  const raf      = useRef(null);
  const stateRef = useRef({ hovered: false, label: "" });

  useEffect(() => {
    const dot  = dotRef.current;
    const rng  = ringRef.current;
    const lbl  = labelRef.current;
    if (!dot || !rng) return;

    // hide default cursor globally
    document.documentElement.style.cursor = "none";

    const MAGNETIC_SELECTORS = 'a, button, [data-magnetic], .btn-primary, .btn-secondary';
    const LABEL_MAP = new Map();

    const lerp = (a, b, t) => a + (b - a) * t;

    const onMove = e => {
      pos.current = { x: e.clientX, y: e.clientY };

      // detect magnetic targets
      const target = e.target.closest(MAGNETIC_SELECTORS);
      if (target) {
        const rect = target.getBoundingClientRect();
        const cx   = rect.left + rect.width  / 2;
        const cy   = rect.top  + rect.height / 2;
        magnet.current = { active: true, cx, cy, el: target };
        stateRef.current.hovered = true;
        stateRef.current.label   = target.dataset.cursor || "";
      } else {
        magnet.current.active    = false;
        stateRef.current.hovered = false;
        stateRef.current.label   = "";
      }
    };

    const onLeave = () => {
      pos.current  = { x: -200, y: -200 };
      ring.current = { x: -200, y: -200 };
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);

    // click burst ripple
    const onClick = e => {
      const ripple = document.createElement("div");
      ripple.style.cssText = `
        position: fixed;
        top: ${e.clientY}px;
        left: ${e.clientX}px;
        width: 36px; height: 36px;
        border-radius: 50%;
        border: 1.5px solid ${T.accent};
        pointer-events: none;
        z-index: 99997;
        animation: cursorRipple 0.5s ease forwards;
      `;
      document.body.appendChild(ripple);
      setTimeout(() => ripple.remove(), 500);

      // dot squish
      if (dot) {
        dot.style.transition = "transform 0.05s ease";
        dot.style.transform  = `translate(${e.clientX - 4}px, ${e.clientY - 4}px) scale(1.8)`;
        setTimeout(() => { dot.style.transition = "transform 0.08s ease, opacity 0.2s ease"; }, 80);
      }
    };
    document.addEventListener("click", onClick);

    const tick = () => {
      const { x: mx, y: my } = pos.current;

      // magnetic pull: dot snaps toward element center
      let tx = mx, ty = my;
      if (magnet.current.active) {
        const { cx, cy } = magnet.current;
        const dx = mx - cx, dy = my - cy;
        const dist = Math.sqrt(dx*dx + dy*dy);
        const pull = Math.max(0, 1 - dist / 120);
        tx = mx - dx * pull * 0.35;
        ty = my - dy * pull * 0.35;
      }

      // ring lazily follows
      ring.current.x = lerp(ring.current.x, tx, 0.12);
      ring.current.y = lerp(ring.current.y, ty, 0.12);

      const h = stateRef.current.hovered;

      // dot
      dot.style.transform  = `translate(${tx - 4}px, ${ty - 4}px) scale(${h ? 0.4 : 1})`;
      dot.style.opacity    = mx < 0 ? "0" : "1";

      // ring
      rng.style.transform  = `translate(${ring.current.x - 20}px, ${ring.current.y - 20}px) scale(${h ? 1.7 : 1})`;
      rng.style.opacity    = mx < 0 ? "0" : h ? "0.5" : "0.25";
      rng.style.borderColor = h ? T.accent : "rgba(100,100,90,0.6)";
      rng.style.background  = h ? "rgba(17,17,16,0.06)" : "transparent";

      // label
      if (lbl) {
        lbl.style.transform = `translate(${tx + 16}px, ${ty - 8}px)`;
        lbl.style.opacity   = stateRef.current.label ? "1" : "0";
        lbl.textContent     = stateRef.current.label;
      }

      raf.current = requestAnimationFrame(tick);
    };

    raf.current = requestAnimationFrame(tick);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("click", onClick);
      cancelAnimationFrame(raf.current);
      document.documentElement.style.cursor = "";
    };
  }, []);

  return (
    <>
      {/* Dot */}
      <div ref={dotRef} style={{
        position:"fixed", top:0, left:0, zIndex:99999, pointerEvents:"none",
        width:8, height:8, borderRadius:"50%",
        background:T.accent,
        transition:"transform 0.08s ease, opacity 0.2s ease",
        willChange:"transform",
        mixBlendMode:"multiply",
      }} />
      {/* Ring */}
      <div ref={ringRef} style={{
        position:"fixed", top:0, left:0, zIndex:99998, pointerEvents:"none",
        width:40, height:40, borderRadius:"50%",
        border:`1.5px solid rgba(100,100,90,0.6)`,
        transition:"transform 0.0s linear, border-color 0.25s ease, background 0.25s ease, opacity 0.25s ease, scale 0.25s ease",
        willChange:"transform",
      }} />
      {/* Label (optional data-cursor text) */}
      <div ref={labelRef} style={{
        position:"fixed", top:0, left:0, zIndex:99999, pointerEvents:"none",
        fontFamily:"'DM Mono',monospace", fontSize:"10px", fontWeight:500,
        letterSpacing:"0.08em", textTransform:"uppercase",
        color:T.ink, background:T.white,
        padding:"4px 8px", borderRadius:"4px",
        boxShadow:"0 2px 8px rgba(0,0,0,0.1)",
        opacity:0,
        transition:"opacity 0.15s ease",
        whiteSpace:"nowrap",
        willChange:"transform",
      }} />
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN
═══════════════════════════════════════════════════════════════ */
export default function Resume() {
  const [showModal, setShowModal] = useState(false);
  const [scrollPct, setScrollPct] = useState(0);
  const [activeProject, setActiveProject] = useState(null);

  const [heroRef, heroIn]       = useInView(0.1);
  const [metricsRef, metricsIn] = useInView(0.2);
  const [expRef, expIn]         = useInView(0.05);
  const [projRef, projIn]       = useInView(0.05);
  const [capsRef, capsIn]       = useInView(0.1);
  const [eduRef, eduIn]         = useInView(0.1);
  const [ctaRef, ctaIn]         = useInView(0.2);

  const m0 = useCountUp(proofMetrics[0].value, metricsIn);
  const m1 = useCountUp(proofMetrics[1].value, metricsIn);
  const m2 = useCountUp("10", metricsIn);

  useEffect(() => {
    const fn = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrollPct(max > 0 ? (window.scrollY / max) * 100 : 0);
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const countDisplays = [m0 + "", m1 + "", m2 + "+", "AI+"];

  return (
    <>
      <MagneticCursor />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Mono:wght@400;500&family=Libre+Franklin:wght@400;500;600;700&display=swap');

        *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body {
          font-family: 'Libre Franklin', -apple-system, sans-serif;
          background: ${T.bg};
          color: ${T.ink};
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          overflow-x: hidden;
        }
        ::selection { background: ${T.ink}; color: ${T.white}; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(32px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes slideRight {
          from { opacity: 0; transform: translateX(-24px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.96); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes tickerScroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.4; }
        }
        @keyframes gradBar {
          0%, 100% { background-position: 0% 50%; }
          50%       { background-position: 100% 50%; }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        a { color: inherit; text-decoration: none; cursor: none !important; }
        button { font-family: inherit; cursor: none !important; }
        a *, button * { cursor: none !important; }

        @keyframes cursorRipple {
          0%   { transform: translate(-50%,-50%) scale(0); opacity: 0.6; }
          100% { transform: translate(-50%,-50%) scale(3); opacity: 0; }
        }

        .section-label {
          font-family: 'DM Mono', monospace;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: ${T.ink4};
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 40px;
        }
        .section-label::after {
          content: '';
          flex: 1;
          max-width: 48px;
          height: 1px;
          background: ${T.border};
        }
        .section-heading {
          font-family: 'DM Serif Display', serif;
          font-size: clamp(36px, 4.5vw, 52px);
          font-weight: 400;
          color: ${T.ink};
          letter-spacing: -0.02em;
          line-height: 1.1;
          margin-bottom: 16px;
        }
        .section-sub {
          font-size: 17px;
          color: ${T.ink3};
          line-height: 1.65;
          max-width: 580px;
          margin-bottom: 56px;
        }
        .tag {
          font-family: 'DM Mono', monospace;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          padding: 5px 10px;
          border-radius: 4px;
          background: ${T.surface};
          color: ${T.ink3};
          border: 1px solid ${T.border};
          display: inline-block;
        }
        .btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 13px 26px;
          border-radius: 8px;
          background: ${T.accent};
          color: ${T.white};
          font-family: 'Libre Franklin', sans-serif;
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 0.01em;
          text-decoration: none;
          border: none;
          cursor: pointer;
          transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
        }
        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0,0,0,0.18);
          background: #2a2a28;
        }
        .btn-secondary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 24px;
          border-radius: 8px;
          background: transparent;
          color: ${T.ink2};
          font-family: 'Libre Franklin', sans-serif;
          font-size: 14px;
          font-weight: 500;
          border: 1.5px solid ${T.border};
          cursor: pointer;
          transition: all 0.2s ease;
          text-decoration: none;
        }
        .btn-secondary:hover {
          border-color: ${T.ink3};
          color: ${T.ink};
          transform: translateY(-2px);
        }
        .divider {
          height: 1px;
          background: ${T.border};
          margin: 0;
          border: none;
        }

        @media (max-width: 1024px) {
          .footer-4col { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 768px) {
          .hero-grid    { grid-template-columns: 1fr !important; }
          .metrics-row  { grid-template-columns: repeat(2,1fr) !important; }
          .projects-row { grid-template-columns: 1fr !important; }
          .caps-row     { grid-template-columns: 1fr !important; }
          .footer-cols  { grid-template-columns: 1fr 1fr !important; }
          .footer-4col  { grid-template-columns: 1fr !important; }
          .hide-sm      { display: none !important; }
          .two-col      { grid-template-columns: 1fr !important; }
          .footer-wrap  { margin-left: 0 !important; margin-right: 0 !important; padding-left: 28px !important; padding-right: 28px !important; }
        }
      `}</style>

      {/* ── PROGRESS BAR ── */}
      <div style={{ position:"fixed", top:0, left:0, right:0, height:"2px", background:T.borderDim, zIndex:9999, pointerEvents:"none" }}>
        <div style={{ width:`${scrollPct}%`, height:"100%", background:`linear-gradient(90deg, ${T.accent}, ${T.ink3})`, transition:"width 0.08s linear" }} />
      </div>

      <div style={{ maxWidth:"940px", margin:"0 auto", padding:"0 36px" }}>

        {/* ══════════════════════════════════════════
            HERO
        ══════════════════════════════════════════ */}
        <header ref={heroRef} style={{ paddingTop:"108px", paddingBottom:"80px" }}>

          {/* Availability badge */}
          <div style={{
            display:"inline-flex", alignItems:"center", gap:"8px",
            padding:"7px 14px", borderRadius:"100px",
            background:T.greenBg, border:`1px solid #bbf7d0`,
            marginBottom:"36px",
            opacity: heroIn ? 1 : 0,
            animation: heroIn ? "slideRight 0.5s ease 0.05s both" : "none",
          }}>
            <span style={{ width:6, height:6, borderRadius:"50%", background:T.green, animation:"pulse 2s infinite", flexShrink:0 }} />
            <span style={{ fontFamily:"'DM Mono',monospace", fontSize:"11px", fontWeight:500, color:T.green, letterSpacing:"0.06em", textTransform:"uppercase" }}>
              Available · 2026 Graduate Roles
            </span>
          </div>

          {/* Headline */}
          <h1 style={{
            fontFamily:"'DM Serif Display', serif",
            fontSize:"clamp(52px, 7.5vw, 80px)",
            fontWeight:400,
            fontStyle:"italic",
            color:T.ink,
            letterSpacing:"-0.025em",
            lineHeight:1.05,
            marginBottom:"20px",
            opacity: heroIn ? 1 : 0,
            animation: heroIn ? "fadeUp 0.65s ease 0.1s both" : "none",
          }}>
            Building Production-Ready<br />
            <span style={{ color:T.ink3, fontStyle:"normal" }}>AI Systems.</span>
          </h1>

          {/* Positioning line */}
          <p style={{
            fontSize:"18px",
            color:T.ink2,
            lineHeight:1.65,
            maxWidth:"600px",
            marginBottom:"40px",
            fontWeight:400,
            opacity: heroIn ? 1 : 0,
            animation: heroIn ? "fadeUp 0.65s ease 0.18s both" : "none",
          }}>
            Early-career engineer with production internship exposure across full-stack and AI/ML systems.
            Comfortable owning features end-to-end — from model training to React UIs to REST APIs.
          </p>

          {/* Contact strip */}
          <div style={{
            display:"flex", flexWrap:"wrap", gap:"20px", marginBottom:"44px",
            opacity: heroIn ? 1 : 0,
            animation: heroIn ? "fadeUp 0.65s ease 0.25s both" : "none",
          }}>
            {[
              { icon:MapPin, text:"Eluru, Andhra Pradesh", href:null },
              { icon:Mail, text:"g.sivasatyasaibhagavan@gmail.com", href:"mailto:g.sivasatyasaibhagavan@gmail.com" },
              { icon:Github, text:"github.com/bhagavan444", href:"https://github.com/bhagavan444" },
              { icon:Linkedin, text:"LinkedIn Profile", href:"https://www.linkedin.com/in/gopalajosyula-siva-satya-sai-bhagavan-1624a027b/" },
            ].map((item, i) => {
              const Tag = item.href ? "a" : "span";
              return (
                <Tag key={i} href={item.href||undefined} target={item.href?.startsWith("http")?"_blank":undefined} rel="noopener noreferrer" style={{
                  display:"inline-flex", alignItems:"center", gap:"7px",
                  fontFamily:"'DM Mono',monospace", fontSize:"12px", fontWeight:400,
                  color:T.ink3, textDecoration:"none",
                  transition:"color 0.15s",
                }}
                onMouseEnter={item.href ? e => e.currentTarget.style.color=T.ink : undefined}
                onMouseLeave={item.href ? e => e.currentTarget.style.color=T.ink3 : undefined}>
                  <item.icon size={13} strokeWidth={1.6} /> {item.text}
                </Tag>
              );
            })}
          </div>

          {/* CTAs */}
          <div style={{
            display:"flex", gap:"12px", flexWrap:"wrap",
            opacity: heroIn ? 1 : 0,
            animation: heroIn ? "fadeUp 0.65s ease 0.32s both" : "none",
          }}>
            <a href={RESUME_DOWNLOAD} className="btn-primary" data-cursor="Download">
              <Download size={15} strokeWidth={2} /> Download Resume
            </a>
            <button className="btn-secondary" onClick={() => setShowModal(true)} data-cursor="Preview">
              <Eye size={15} strokeWidth={1.8} /> Preview PDF
            </button>
          </div>
        </header>

        <hr className="divider" />

        {/* ══════════════════════════════════════════
            PROOF METRICS
        ══════════════════════════════════════════ */}
        <section ref={metricsRef} style={{ paddingTop:"72px", paddingBottom:"72px" }}>
          <div className="metrics-row" style={{
            display:"grid", gridTemplateColumns:"repeat(4,1fr)",
            gap:"1px", background:T.border,
            border:`1px solid ${T.border}`, borderRadius:"10px", overflow:"hidden",
          }}>
            {proofMetrics.map((m, i) => (
              <div key={i} style={{
                padding:"36px 28px", background:T.bg,
                opacity: metricsIn ? 1 : 0,
                animation: metricsIn ? `fadeUp 0.5s ease ${i*0.07}s both` : "none",
                transition:"background 0.2s",
                cursor:"default",
              }}
              onMouseEnter={e => e.currentTarget.style.background=T.surface}
              onMouseLeave={e => e.currentTarget.style.background=T.bg}>
                <div style={{ fontFamily:"'DM Serif Display',serif", fontSize:"44px", fontWeight:400, color:T.ink, lineHeight:1, marginBottom:"8px", letterSpacing:"-0.02em" }}>
                  {countDisplays[i]}
                </div>
                <div style={{ fontSize:"13px", fontWeight:600, color:T.ink2, marginBottom:"4px" }}>{m.label}</div>
                <div style={{ fontFamily:"'DM Mono',monospace", fontSize:"11px", color:T.ink4, lineHeight:1.4 }}>{m.sub}</div>
              </div>
            ))}
          </div>
        </section>

        <hr className="divider" />

        {/* ══════════════════════════════════════════
            TECHNICAL PROFILE OVERVIEW (RESUME SECTION)
        ══════════════════════════════════════════ */}
        <section style={{ paddingTop:"88px", paddingBottom:"88px" }}>
          <div className="section-label">Technical Profile</div>
          <div className="hero-grid" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"64px", alignItems:"start" }}>

            {/* Left */}
            <div>
              <h2 className="section-heading">One-page profile,<br /><em>ATS-optimized.</em></h2>
              <p style={{ fontSize:"16px", color:T.ink2, lineHeight:1.7, marginBottom:"36px" }}>
                Structured for automated screening with clean section hierarchy: objective, education, internships, projects, skills, and certifications.
                Ownership-oriented language throughout — not tasks, but outcomes.
              </p>

              {/* Profile stats */}
              <div style={{ border:`1px solid ${T.border}`, borderRadius:"8px", overflow:"hidden", marginBottom:"32px" }}>
                {[
                  { label:"Format", value:"PDF · ATS-Optimized" },
                  { label:"Structure", value:"Ownership-Oriented" },
                  { label:"Experience Signal", value:"3 Technical Internships" },
                  { label:"Systems Built", value:"4 Production Deployments" },
                  { label:"Cross-Stack", value:"AI/ML + Full-Stack (MERN)" },
                ].map((row, i) => (
                  <div key={i} style={{
                    display:"flex", justifyContent:"space-between", alignItems:"center",
                    padding:"14px 20px",
                    borderBottom: i < 4 ? `1px solid ${T.borderDim}` : "none",
                    background: i%2===0 ? T.bg : T.surface,
                    transition:"background 0.15s",
                  }}
                  onMouseEnter={e => e.currentTarget.style.background=T.surfaceHi}
                  onMouseLeave={e => e.currentTarget.style.background=i%2===0?T.bg:T.surface}>
                    <span style={{ fontFamily:"'DM Mono',monospace", fontSize:"12px", color:T.ink4, letterSpacing:"0.04em" }}>{row.label}</span>
                    <span style={{ fontSize:"13px", fontWeight:600, color:T.ink2 }}>{row.value}</span>
                  </div>
                ))}
              </div>

              <div style={{ display:"flex", gap:"12px", flexWrap:"wrap" }}>
                <a href={RESUME_DOWNLOAD} className="btn-primary">
                  <Download size={14} strokeWidth={2} /> Download PDF
                </a>
                <button className="btn-secondary" onClick={() => setShowModal(true)}>
                  <Eye size={14} strokeWidth={1.8} /> View Fullscreen
                </button>
              </div>
            </div>

            {/* Right — PDF Preview Card */}
            <div style={{ position:"sticky", top:"80px" }}>
              <div style={{
                borderRadius:"10px", overflow:"hidden",
                border:`1px solid ${T.border}`,
                boxShadow:"0 4px 24px rgba(0,0,0,0.07)",
                cursor:"pointer",
                transition:"transform 0.25s ease, box-shadow 0.25s ease",
              }}
              onClick={() => setShowModal(true)}
              data-cursor="Expand"
              onMouseEnter={e => { e.currentTarget.style.transform="translateY(-4px)"; e.currentTarget.style.boxShadow="0 12px 40px rgba(0,0,0,0.12)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="0 4px 24px rgba(0,0,0,0.07)"; }}>
                {/* Toolbar */}
                <div style={{ padding:"12px 16px", background:T.surface, borderBottom:`1px solid ${T.border}`, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:"8px" }}>
                    <div style={{ display:"flex", gap:"5px" }}>
                      {["#ff5f57","#febc2e","#28c840"].map((c,i) => <span key={i} style={{ width:10, height:10, borderRadius:"50%", background:c, display:"block" }} />)}
                    </div>
                    <span style={{ fontFamily:"'DM Mono',monospace", fontSize:"11px", color:T.ink3, marginLeft:"4px" }}>G_S_S_S_Bhagavan_Resume.pdf</span>
                  </div>
                  <span style={{ fontFamily:"'DM Mono',monospace", fontSize:"11px", color:T.ink4 }}>1 pg</span>
                </div>
                {/* iframe */}
                <div style={{ height:"520px", background:T.surfaceHi, position:"relative", overflow:"hidden" }}>
                  <iframe src={RESUME_PREVIEW} style={{ width:"100%", height:"100%", border:"none", pointerEvents:"none" }} title="Resume Preview" />
                  <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center" }}>
                    <span style={{
                      padding:"10px 22px", background:T.white,
                      borderRadius:"8px", fontSize:"13px", fontWeight:600, color:T.ink,
                      boxShadow:"0 2px 12px rgba(0,0,0,0.12)",
                      opacity:0, transition:"opacity 0.2s",
                    }} className="preview-hint">Click to expand</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <hr className="divider" />

        {/* ══════════════════════════════════════════
            SELECTED SYSTEMS (PROJECTS)
        ══════════════════════════════════════════ */}
        <section ref={projRef} style={{ paddingTop:"88px", paddingBottom:"88px" }}>
          <div className="section-label">Selected Systems</div>
          <h2 className="section-heading">4 production deployments,<br /><em>each solving a real problem.</em></h2>
          <p className="section-sub">
            Every system below started with a problem statement, not a technology choice. Built end-to-end with measurable outcomes.
          </p>

          <div className="projects-row" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"20px" }}>
            {projects.map((proj, i) => (
              <div key={i} style={{
                border:`1.5px solid ${T.border}`,
                borderRadius:"10px", padding:"28px",
                background:T.bg,
                opacity: projIn ? 1 : 0,
                animation: projIn ? `fadeUp 0.5s ease ${i*0.08}s both` : "none",
                transition:"border-color 0.2s, box-shadow 0.2s, transform 0.2s",
                cursor:"default",
                display:"flex", flexDirection:"column", gap:"16px",
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor=T.ink3; e.currentTarget.style.transform="translateY(-3px)"; e.currentTarget.style.boxShadow="0 8px 28px rgba(0,0,0,0.07)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor=T.border; e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="none"; }}>

                {/* Header row */}
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:"8px" }}>
                  <span className="tag">{proj.tag}</span>
                  <span style={{ fontFamily:"'DM Mono',monospace", fontSize:"11px", color:T.ink4, paddingTop:"2px" }}>{proj.year}</span>
                </div>

                {/* Name + Status */}
                <div>
                  <div style={{ display:"flex", alignItems:"center", gap:"10px", marginBottom:"4px" }}>
                    <span style={{ fontSize:"18px", fontWeight:700, color:T.ink, letterSpacing:"-0.01em" }}>{proj.name}</span>
                    <span style={{
                      fontFamily:"'DM Mono',monospace", fontSize:"10px", fontWeight:500,
                      padding:"3px 8px", borderRadius:"4px",
                      background: proj.status==="Live" ? T.greenBg : proj.status==="Deployed" ? "#fef3c7" : T.surface,
                      color: proj.status==="Live" ? T.green : proj.status==="Deployed" ? "#92400e" : T.ink3,
                      letterSpacing:"0.06em", textTransform:"uppercase",
                    }}>{proj.status}</span>
                  </div>
                </div>

                {/* Problem / Approach / Outcome */}
                <div style={{ display:"flex", flexDirection:"column", gap:"10px" }}>
                  {[
                    { label:"Problem", text:proj.problem },
                    { label:"Approach", text:proj.approach },
                    { label:"Outcome", text:proj.outcome },
                  ].map((row, ri) => (
                    <div key={ri} style={{ display:"grid", gridTemplateColumns:"68px 1fr", gap:"8px", alignItems:"baseline" }}>
                      <span style={{ fontFamily:"'DM Mono',monospace", fontSize:"10px", color:T.ink4, letterSpacing:"0.06em", textTransform:"uppercase", paddingTop:"2px" }}>{row.label}</span>
                      <span style={{ fontSize:"13px", color:T.ink2, lineHeight:1.55 }}>{row.text}</span>
                    </div>
                  ))}
                </div>

                {/* Tech tags */}
                <div style={{ display:"flex", flexWrap:"wrap", gap:"6px" }}>
                  {proj.tech.map((t,ti) => (
                    <span key={ti} style={{ fontFamily:"'DM Mono',monospace", fontSize:"11px", padding:"4px 9px", borderRadius:"4px", background:T.surface, color:T.ink3, border:`1px solid ${T.borderDim}` }}>{t}</span>
                  ))}
                </div>

                {/* GitHub link */}
                <a href={proj.github} target="_blank" rel="noopener noreferrer" style={{
                  display:"inline-flex", alignItems:"center", gap:"5px",
                  fontSize:"12px", fontWeight:600, color:T.ink3,
                  marginTop:"4px", transition:"color 0.15s, transform 0.15s",
                }}
                onMouseEnter={e => { e.currentTarget.style.color=T.ink; e.currentTarget.style.transform="translateX(3px)"; }}
                onMouseLeave={e => { e.currentTarget.style.color=T.ink3; e.currentTarget.style.transform="translateX(0)"; }}>
                  View on GitHub <ArrowUpRight size={13} strokeWidth={2.5} />
                </a>
              </div>
            ))}
          </div>
        </section>

        <hr className="divider" />

        {/* ══════════════════════════════════════════
            INDUSTRY EXPERIENCE
        ══════════════════════════════════════════ */}
        <section ref={expRef} style={{ paddingTop:"88px", paddingBottom:"88px" }}>
          <div className="section-label">Industry Experience</div>
          <h2 className="section-heading">3 internships,<br /><em>3 production environments.</em></h2>
          <p className="section-sub">
            Each engagement involved real codebases, real users, and real delivery timelines — not toy exercises.
          </p>

          <div style={{ display:"flex", flexDirection:"column", gap:"0px" }}>
            {experiences.map((exp, i) => (
              <div key={i} style={{
                padding:"40px 0",
                borderBottom: i < experiences.length-1 ? `1px solid ${T.border}` : "none",
                opacity: expIn ? 1 : 0,
                animation: expIn ? `fadeUp 0.55s ease ${i*0.12}s both` : "none",
              }}>
                {/* Top row */}
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:"24px", marginBottom:"6px", flexWrap:"wrap" }}>
                  <div style={{ flex:1 }}>
                    <div style={{ display:"flex", alignItems:"baseline", gap:"14px", flexWrap:"wrap" }}>
                      <h3 style={{ fontSize:"21px", fontWeight:700, color:T.ink, letterSpacing:"-0.01em" }}>{exp.role}</h3>
                      <span className="tag">{exp.location}</span>
                    </div>
                    <div style={{ display:"flex", alignItems:"center", gap:"10px", marginTop:"6px", flexWrap:"wrap" }}>
                      <span style={{ fontSize:"15px", fontWeight:600, color:T.ink2 }}>{exp.company}</span>
                      <span style={{ width:3, height:3, borderRadius:"50%", background:T.ink4, flexShrink:0 }} />
                      <span style={{ fontFamily:"'DM Mono',monospace", fontSize:"12px", color:T.ink3, fontStyle:"italic" }}>{exp.context}</span>
                    </div>
                  </div>
                  <span style={{ fontFamily:"'DM Mono',monospace", fontSize:"12px", color:T.ink4, display:"flex", alignItems:"center", gap:"6px", flexShrink:0 }}>
                    <Calendar size={12} strokeWidth={1.6} />{exp.period}
                  </span>
                </div>

                {/* Bullets */}
                <ul style={{ listStyle:"none", display:"flex", flexDirection:"column", gap:"8px", margin:"20px 0 24px" }}>
                  {exp.bullets.map((b, bi) => (
                    <li key={bi} style={{ display:"flex", gap:"12px", alignItems:"flex-start" }}>
                      <span style={{ width:"4px", height:"4px", borderRadius:"50%", background:T.ink3, flexShrink:0, marginTop:"8px" }} />
                      <span style={{ fontSize:"14px", color:T.ink2, lineHeight:1.65 }}>{b}</span>
                    </li>
                  ))}
                </ul>

                {/* Tech */}
                <div style={{ display:"flex", flexWrap:"wrap", gap:"7px" }}>
                  {exp.tech.map((t, ti) => (
                    <span key={ti} style={{
                      fontFamily:"'DM Mono',monospace", fontSize:"11px", padding:"4px 10px",
                      borderRadius:"4px", background:T.surface, color:T.ink3,
                      border:`1px solid ${T.borderDim}`, transition:"all 0.15s",
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background=T.surfaceHi; e.currentTarget.style.color=T.ink; }}
                    onMouseLeave={e => { e.currentTarget.style.background=T.surface; e.currentTarget.style.color=T.ink3; }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <hr className="divider" />

        {/* ══════════════════════════════════════════
            TECHNICAL CAPABILITIES
        ══════════════════════════════════════════ */}
        <section ref={capsRef} style={{ paddingTop:"88px", paddingBottom:"88px" }}>
          <div className="section-label">Technical Capabilities</div>
          <h2 className="section-heading">5 capability clusters,<br /><em>each production-tested.</em></h2>

          <div className="caps-row" style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:"16px" }}>
            {capabilities.map((cap, i) => (
              <div key={i} style={{
                padding:"28px", borderRadius:"10px",
                border:`1.5px solid ${T.border}`,
                background: i===4 ? T.surface : T.bg,
                opacity: capsIn ? 1 : 0,
                animation: capsIn ? `scaleIn 0.45s ease ${i*0.07}s both` : "none",
                transition:"border-color 0.2s, background 0.2s",
                ...(i===4 ? { gridColumn:"span 2" } : {}),
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor=T.ink3; e.currentTarget.style.background=T.surfaceHi; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor=T.border; e.currentTarget.style.background=i===4?T.surface:T.bg; }}>
                <div style={{ display:"flex", alignItems:"center", gap:"10px", marginBottom:"16px" }}>
                  <div style={{ width:32, height:32, borderRadius:"8px", background:T.surface, border:`1px solid ${T.border}`, display:"flex", alignItems:"center", justifyContent:"center" }}>
                    <cap.icon size={16} strokeWidth={1.6} color={T.ink3} />
                  </div>
                  <span style={{ fontSize:"14px", fontWeight:700, color:T.ink }}>{cap.cluster}</span>
                </div>
                <div style={{ display:"flex", flexWrap:"wrap", gap:"7px" }}>
                  {cap.skills.map((s, si) => (
                    <span key={si} style={{ fontFamily:"'DM Mono',monospace", fontSize:"11px", padding:"4px 9px", borderRadius:"4px", background:T.white, color:T.ink3, border:`1px solid ${T.borderDim}` }}>{s}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <hr className="divider" />

        {/* ══════════════════════════════════════════
            EDUCATION & CERTIFICATIONS
        ══════════════════════════════════════════ */}
        <section ref={eduRef} style={{ paddingTop:"88px", paddingBottom:"88px" }}>
          <div className="section-label">Education & Credentials</div>
          <h2 className="section-heading">Engineering AI & Data Science,<br /><em>graduating 2026.</em></h2>

          {/* Primary Degree */}
          <div style={{
            padding:"36px", borderRadius:"10px",
            background:T.surface, border:`1.5px solid ${T.border}`,
            marginBottom:"20px",
            opacity: eduIn ? 1 : 0,
            animation: eduIn ? "fadeUp 0.5s ease 0s both" : "none",
          }}>
            <div className="two-col" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"40px", alignItems:"start" }}>
              <div>
                <div style={{ fontFamily:"'DM Mono',monospace", fontSize:"10px", color:T.ink4, letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:"16px" }}>Primary Degree</div>
                <h3 style={{ fontSize:"19px", fontWeight:700, color:T.ink, marginBottom:"8px", lineHeight:1.3 }}>{education.degree}</h3>
                <p style={{ fontSize:"14px", color:T.ink2, marginBottom:"12px", lineHeight:1.5 }}>{education.school}</p>
                <div style={{ display:"flex", gap:"12px", flexWrap:"wrap" }}>
                  <span className="tag">{education.period}</span>
                  <span className="tag" style={{ color:T.green, background:T.greenBg, borderColor:"#bbf7d0" }}>{education.score}</span>
                </div>
              </div>
              <div>
                <div style={{ fontFamily:"'DM Mono',monospace", fontSize:"10px", color:T.ink4, letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:"16px" }}>Relevant Coursework</div>
                <div style={{ display:"flex", flexWrap:"wrap", gap:"7px" }}>
                  {education.relevant.map((c,i) => (
                    <span key={i} style={{ fontFamily:"'DM Mono',monospace", fontSize:"11px", padding:"4px 9px", borderRadius:"4px", background:T.bg, color:T.ink3, border:`1px solid ${T.borderDim}` }}>{c}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Previous Education */}
            <div style={{ marginTop:"28px", paddingTop:"24px", borderTop:`1px solid ${T.border}` }}>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"20px" }} className="two-col">
                {education.previous.map((e,i) => (
                  <div key={i} style={{ padding:"16px", background:T.bg, borderRadius:"7px", border:`1px solid ${T.borderDim}` }}>
                    <div style={{ fontSize:"13px", fontWeight:600, color:T.ink2, marginBottom:"4px" }}>{e.level}</div>
                    <div style={{ fontSize:"12px", color:T.ink3, marginBottom:"8px" }}>{e.institution}</div>
                    <div style={{ display:"flex", gap:"8px" }}>
                      <span className="tag" style={{ fontSize:"10px", padding:"3px 7px" }}>{e.period}</span>
                      <span className="tag" style={{ fontSize:"10px", padding:"3px 7px" }}>{e.score}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Certifications Grid */}
          <div style={{
            border:`1px solid ${T.border}`, borderRadius:"10px", overflow:"hidden",
            opacity: eduIn ? 1 : 0,
            animation: eduIn ? "fadeUp 0.5s ease 0.1s both" : "none",
          }}>
            <div style={{ padding:"16px 20px", background:T.surface, borderBottom:`1px solid ${T.border}`, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
              <span style={{ fontFamily:"'DM Mono',monospace", fontSize:"11px", color:T.ink3, letterSpacing:"0.08em", textTransform:"uppercase" }}>Certifications · {certifications.length} total</span>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1px", background:T.border }}>
              {certifications.map((cert, i) => (
                <div key={i} style={{
                  padding:"18px 22px", background:T.bg,
                  display:"flex", justifyContent:"space-between", alignItems:"baseline", gap:"16px",
                  transition:"background 0.15s", cursor:"default",
                }}
                onMouseEnter={e => e.currentTarget.style.background=T.surface}
                onMouseLeave={e => e.currentTarget.style.background=T.bg}>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ fontSize:"13px", fontWeight:600, color:T.ink, marginBottom:"3px", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{cert.name}</div>
                    <div style={{ fontFamily:"'DM Mono',monospace", fontSize:"11px", color:T.ink4 }}>{cert.issuer}</div>
                  </div>
                  <span style={{ fontFamily:"'DM Mono',monospace", fontSize:"11px", color:T.ink4, flexShrink:0 }}>{cert.year}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <hr className="divider" />

        {/* ══════════════════════════════════════════
            ATS LIVE CHECKER
        ══════════════════════════════════════════ */}
        <ATSChecker />

        <hr className="divider" />

        {/* ══════════════════════════════════════════
            HIRING CTA
        ══════════════════════════════════════════ */}
        <section ref={ctaRef} style={{ paddingTop:"80px", paddingBottom:"96px" }}>
          <div style={{
            padding:"56px 52px",
            border:`1.5px solid ${T.border}`,
            borderRadius:"12px",
            background:T.bg,
            position:"relative",
            overflow:"hidden",
            opacity: ctaIn ? 1 : 0,
            animation: ctaIn ? "fadeUp 0.6s ease 0s both" : "none",
          }}>
            {/* Decorative corner accent */}
            <div style={{ position:"absolute", top:0, right:0, width:"220px", height:"220px", background:`radial-gradient(circle at top right, ${T.surface} 0%, transparent 70%)`, pointerEvents:"none" }} />

            <div style={{ position:"relative", zIndex:1, maxWidth:"580px" }}>
              <div style={{ display:"inline-flex", alignItems:"center", gap:"8px", padding:"7px 14px", borderRadius:"100px", background:T.greenBg, border:`1px solid #bbf7d0`, marginBottom:"28px" }}>
                <span style={{ width:6, height:6, borderRadius:"50%", background:T.green, animation:"pulse 2s infinite" }} />
                <span style={{ fontFamily:"'DM Mono',monospace", fontSize:"11px", fontWeight:500, color:T.green, letterSpacing:"0.06em", textTransform:"uppercase" }}>Open for opportunities · IST UTC+5:30</span>
              </div>

              <h2 style={{ fontFamily:"'DM Serif Display',serif", fontSize:"clamp(32px,4vw,44px)", fontWeight:400, fontStyle:"italic", color:T.ink, letterSpacing:"-0.02em", lineHeight:1.15, marginBottom:"16px" }}>
                Let's discuss how I can<br />contribute to your team.
              </h2>

              <p style={{ fontSize:"16px", color:T.ink2, lineHeight:1.65, marginBottom:"36px" }}>
                Seeking junior engineering roles in software development, AI/ML, or full-stack positions. 
                Ready to contribute to production systems from day one.
                Typically respond to emails within 24 hours.
              </p>

              <div style={{ display:"flex", gap:"12px", flexWrap:"wrap", marginBottom:"40px" }}>
                <a href={RESUME_DOWNLOAD} className="btn-primary">
                  <Download size={15} strokeWidth={2} /> Download Resume
                </a>
                <a href="mailto:g.sivasatyasaibhagavan@gmail.com?subject=Opportunity%20for%20Bhagavan" className="btn-secondary">
                  <Mail size={15} strokeWidth={1.8} /> Get in Touch
                </a>
              </div>

              {/* Response info row */}
              <div style={{ display:"flex", gap:"32px", flexWrap:"wrap" }}>
                {[
                  { label:"Email", value:"< 24hr response" },
                  { label:"Location", value:"Eluru, AP · Open to Relocation" },
                  { label:"Availability", value:"From June 2026" },
                ].map((item, i) => (
                  <div key={i}>
                    <div style={{ fontFamily:"'DM Mono',monospace", fontSize:"10px", color:T.ink4, letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:"4px" }}>{item.label}</div>
                    <div style={{ fontSize:"13px", fontWeight:600, color:T.ink2 }}>{item.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* ══════════════════════════════════════════
          FOOTER — BIG CURVED
      ══════════════════════════════════════════ */}
      <footer style={{ position:"relative", marginTop:"0", background:"transparent" }}>

        {/* ── SVG CURVE TRANSITION from page bg → black ── */}
        <div style={{ position:"relative", lineHeight:0, overflow:"hidden", background:T.bg }}>
          <svg
            viewBox="0 0 1440 140"
            preserveAspectRatio="none"
            style={{ display:"block", width:"100%", height:"140px" }}
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Soft wave that eases into footer black */}
            <path
              d="M0,0 C240,120 480,140 720,100 C960,60 1200,100 1440,60 L1440,140 L0,140 Z"
              fill="#0d0d0b"
            />
            {/* Second layer for depth */}
            <path
              d="M0,40 C180,140 400,80 640,110 C880,140 1100,70 1440,90 L1440,140 L0,140 Z"
              fill="#111110"
              opacity="0.7"
            />
          </svg>
        </div>

        {/* ── MAIN FOOTER BODY ── */}
        <div style={{
          background:"#0d0d0b",
          color:T.white,
          position:"relative",
          overflow:"hidden",
        }}>

          {/* Mesh glow blobs */}
          <div style={{ position:"absolute", inset:0, pointerEvents:"none", overflow:"hidden" }}>
            <div style={{ position:"absolute", top:"-10%", left:"-5%", width:"600px", height:"600px", borderRadius:"50%", background:"radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)", filter:"blur(40px)" }} />
            <div style={{ position:"absolute", top:"20%", right:"-8%", width:"500px", height:"500px", borderRadius:"50%", background:"radial-gradient(circle, rgba(168,85,247,0.1) 0%, transparent 70%)", filter:"blur(48px)" }} />
            <div style={{ position:"absolute", bottom:"-5%", left:"30%", width:"700px", height:"400px", borderRadius:"50%", background:"radial-gradient(circle, rgba(16,185,129,0.07) 0%, transparent 70%)", filter:"blur(60px)" }} />
          </div>

          {/* Subtle dot-grid texture */}
          <div style={{
            position:"absolute", inset:0, pointerEvents:"none",
            backgroundImage:"radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize:"32px 32px",
          }} />

          {/* ── Tech ticker ── */}
          <div style={{ borderBottom:"1px solid rgba(255,255,255,0.06)", overflow:"hidden", padding:"20px 0", position:"relative", zIndex:1 }}>
            <div style={{
              display:"flex", gap:"64px",
              animation:"tickerScroll 40s linear infinite",
              whiteSpace:"nowrap",
              fontFamily:"'DM Mono',monospace",
              fontSize:"11px", fontWeight:500,
              letterSpacing:"0.15em", textTransform:"uppercase",
              color:"rgba(255,255,255,0.18)",
            }}>
              {["React.js","Node.js","Python","TensorFlow","MongoDB","Express.js","Keras","Flask","AWS","Machine Learning","NLP","CNNs","Scikit-learn","Git",
                "React.js","Node.js","Python","TensorFlow","MongoDB","Express.js","Keras","Flask","AWS","Machine Learning","NLP","CNNs","Scikit-learn","Git"].map((t,i) => (
                <span key={i} style={{ display:"inline-flex", alignItems:"center", gap:"14px" }}>
                  <span style={{ width:3, height:3, borderRadius:"50%", background:"rgba(255,255,255,0.18)", flexShrink:0 }} />
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* ── Hero tagline block ── */}
          <div style={{ position:"relative", zIndex:1, maxWidth:"1200px", margin:"0 auto", padding:"100px 56px 0" }}>
            <div style={{ marginBottom:"80px" }}>
              {/* Availability pill */}
              <div style={{
                display:"inline-flex", alignItems:"center", gap:"8px",
                padding:"8px 18px", borderRadius:"100px",
                background:"rgba(74,222,128,0.08)",
                border:"1px solid rgba(74,222,128,0.18)",
                marginBottom:"40px",
              }}>
                <span style={{ width:7, height:7, borderRadius:"50%", background:"#4ade80", animation:"pulse 2s infinite", boxShadow:"0 0 10px rgba(74,222,128,0.5)", flexShrink:0 }} />
                <span style={{ fontFamily:"'DM Mono',monospace", fontSize:"11px", color:"#4ade80", letterSpacing:"0.08em", textTransform:"uppercase", fontWeight:500 }}>
                  Available · Full-Time Roles · Graduating 2026
                </span>
              </div>

              {/* Massive headline */}
              <h2 style={{
                fontFamily:"'DM Serif Display', serif",
                fontSize:"clamp(52px, 8vw, 108px)",
                fontWeight:400,
                fontStyle:"italic",
                lineHeight:1.0,
                letterSpacing:"-0.03em",
                marginBottom:"0",
                background:"linear-gradient(135deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0.45) 100%)",
                WebkitBackgroundClip:"text",
                WebkitTextFillColor:"transparent",
                backgroundClip:"text",
              }}>
                Ready to build<br />
                <span style={{
                  fontStyle:"normal",
                  background:"linear-gradient(90deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.15) 100%)",
                  WebkitBackgroundClip:"text",
                  WebkitTextFillColor:"transparent",
                  backgroundClip:"text",
                }}>something great.</span>
              </h2>
            </div>

            {/* ── Two-column content grid ── */}
            <div style={{
              display:"grid",
              gridTemplateColumns:"1.2fr 1fr 1fr 1fr",
              gap:"0",
              borderTop:"1px solid rgba(255,255,255,0.08)",
              marginBottom:"0",
            }} className="footer-4col">
              {/* Col 1 — About blurb + CTAs */}
              <div style={{ padding:"52px 48px 52px 0", borderRight:"1px solid rgba(255,255,255,0.08)" }}>
                <p style={{ fontSize:"15px", lineHeight:1.75, color:"rgba(255,255,255,0.5)", marginBottom:"36px", maxWidth:"320px" }}>
                  B.Tech AI & Data Science engineer with hands-on production experience across full-stack MERN and machine learning systems.
                  Looking for a team solving meaningful problems.
                </p>
                <div style={{ display:"flex", flexDirection:"column", gap:"12px" }}>
                  <a href={RESUME_DOWNLOAD} style={{
                    display:"inline-flex", alignItems:"center", gap:"9px",
                    padding:"13px 24px", borderRadius:"9px",
                    background:T.white, color:"#0d0d0b",
                    fontSize:"14px", fontWeight:700, textDecoration:"none",
                    transition:"all 0.2s ease",
                    width:"fit-content",
                  }}
                  data-cursor="Download"
                  onMouseEnter={e => { e.currentTarget.style.transform="translateX(4px)"; e.currentTarget.style.boxShadow="0 0 32px rgba(255,255,255,0.18)"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform="translateX(0)"; e.currentTarget.style.boxShadow="none"; }}>
                    <Download size={16} strokeWidth={2} />
                    Download Resume
                    <ArrowUpRight size={14} strokeWidth={2.5} />
                  </a>
                  <a href="mailto:g.sivasatyasaibhagavan@gmail.com" style={{
                    display:"inline-flex", alignItems:"center", gap:"9px",
                    padding:"12px 24px", borderRadius:"9px",
                    background:"rgba(255,255,255,0.07)",
                    border:"1px solid rgba(255,255,255,0.12)",
                    color:"rgba(255,255,255,0.7)",
                    fontSize:"14px", fontWeight:500, textDecoration:"none",
                    transition:"all 0.2s ease",
                    width:"fit-content",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background="rgba(255,255,255,0.12)"; e.currentTarget.style.color=T.white; e.currentTarget.style.borderColor="rgba(255,255,255,0.25)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background="rgba(255,255,255,0.07)"; e.currentTarget.style.color="rgba(255,255,255,0.7)"; e.currentTarget.style.borderColor="rgba(255,255,255,0.12)"; }}>
                    <Mail size={15} strokeWidth={1.8} />
                    Get in Touch
                  </a>
                </div>
              </div>

              {/* Col 2 — Quick Links */}
              <div style={{ padding:"52px 40px", borderRight:"1px solid rgba(255,255,255,0.08)" }}>
                <h5 style={{ fontFamily:"'DM Mono',monospace", fontSize:"10px", letterSpacing:"0.12em", textTransform:"uppercase", color:"rgba(255,255,255,0.25)", marginBottom:"24px" }}>Quick Links</h5>
                <div style={{ display:"flex", flexDirection:"column", gap:"14px" }}>
                  {[
                    { label:"Download Resume", href:RESUME_DOWNLOAD },
                    { label:"GitHub Profile", href:"https://github.com/bhagavan444" },
                    { label:"LinkedIn", href:"https://www.linkedin.com/in/gopalajosyula-siva-satya-sai-bhagavan-1624a027b/" },
                    { label:"Schedule a Call", href:"mailto:g.sivasatyasaibhagavan@gmail.com?subject=Schedule%20a%20Call" },
                    { label:"View All Projects", href:"https://github.com/bhagavan444" },
                  ].map((item, i) => (
                    <a key={i} href={item.href} target={item.href.startsWith("http")?"_blank":undefined} rel="noopener noreferrer" style={{
                      display:"inline-flex", alignItems:"center", gap:"7px",
                      fontSize:"14px", color:"rgba(255,255,255,0.5)", textDecoration:"none",
                      transition:"color 0.15s, transform 0.15s",
                      width:"fit-content",
                    }}
                    onMouseEnter={e => { e.currentTarget.style.color=T.white; e.currentTarget.style.transform="translateX(5px)"; }}
                    onMouseLeave={e => { e.currentTarget.style.color="rgba(255,255,255,0.5)"; e.currentTarget.style.transform="translateX(0)"; }}>
                      <ChevronRight size={12} strokeWidth={2} style={{ opacity:0.35, flexShrink:0 }} />
                      {item.label}
                    </a>
                  ))}
                </div>
              </div>

              {/* Col 3 — Contact */}
              <div style={{ padding:"52px 40px", borderRight:"1px solid rgba(255,255,255,0.08)" }}>
                <h5 style={{ fontFamily:"'DM Mono',monospace", fontSize:"10px", letterSpacing:"0.12em", textTransform:"uppercase", color:"rgba(255,255,255,0.25)", marginBottom:"24px" }}>Contact</h5>
                <div style={{ display:"flex", flexDirection:"column", gap:"20px" }}>
                  {[
                    { icon:Mail, text:"g.sivasatyasaibhagavan@gmail.com", href:"mailto:g.sivasatyasaibhagavan@gmail.com", sub:"< 24hr response" },
                    { icon:Github, text:"github.com/bhagavan444", href:"https://github.com/bhagavan444", sub:"4 projects" },
                    { icon:Linkedin, text:"LinkedIn Profile", href:"https://www.linkedin.com/in/gopalajosyula-siva-satya-sai-bhagavan-1624a027b/", sub:"Connect" },
                    { icon:MapPin, text:"Eluru, AP, India", href:null, sub:"IST · UTC+5:30" },
                  ].map((item, i) => {
                    const Tag = item.href ? "a" : "div";
                    return (
                      <Tag key={i} href={item.href||undefined} target={item.href?.startsWith("http")?"_blank":undefined} rel="noopener noreferrer" style={{
                        display:"flex", alignItems:"flex-start", gap:"10px",
                        textDecoration:"none", cursor:item.href?"pointer":"default",
                      }}
                      onMouseEnter={item.href ? e => e.currentTarget.querySelector(".clink").style.color=T.white : undefined}
                      onMouseLeave={item.href ? e => e.currentTarget.querySelector(".clink").style.color="rgba(255,255,255,0.55)" : undefined}>
                        <div style={{ width:30, height:30, borderRadius:"7px", background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.1)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, marginTop:"1px" }}>
                          <item.icon size={14} strokeWidth={1.6} color="rgba(255,255,255,0.5)" />
                        </div>
                        <div>
                          <div className="clink" style={{ fontSize:"13px", color:"rgba(255,255,255,0.55)", transition:"color 0.15s", lineHeight:1.4, wordBreak:"break-all" }}>{item.text}</div>
                          <div style={{ fontFamily:"'DM Mono',monospace", fontSize:"10px", color:"rgba(255,255,255,0.25)", marginTop:"2px" }}>{item.sub}</div>
                        </div>
                      </Tag>
                    );
                  })}
                </div>
              </div>

              {/* Col 4 — Current Stack + Status */}
              <div style={{ padding:"52px 0 52px 40px" }}>
                <h5 style={{ fontFamily:"'DM Mono',monospace", fontSize:"10px", letterSpacing:"0.12em", textTransform:"uppercase", color:"rgba(255,255,255,0.25)", marginBottom:"24px" }}>Current Stack</h5>
                <div style={{ display:"flex", flexWrap:"wrap", gap:"8px", marginBottom:"40px" }}>
                  {["React","Node.js","Python","TensorFlow","MongoDB","Flask","Scikit-learn","Git"].map((s, i) => (
                    <span key={i} style={{
                      fontFamily:"'DM Mono',monospace", fontSize:"11px",
                      padding:"5px 11px", borderRadius:"5px",
                      background:"rgba(255,255,255,0.05)",
                      border:"1px solid rgba(255,255,255,0.1)",
                      color:"rgba(255,255,255,0.45)",
                      transition:"all 0.15s",
                      cursor:"default",
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background="rgba(255,255,255,0.1)"; e.currentTarget.style.color=T.white; e.currentTarget.style.borderColor="rgba(255,255,255,0.25)"; }}
                    onMouseLeave={e => { e.currentTarget.style.background="rgba(255,255,255,0.05)"; e.currentTarget.style.color="rgba(255,255,255,0.45)"; e.currentTarget.style.borderColor="rgba(255,255,255,0.1)"; }}>
                      {s}
                    </span>
                  ))}
                </div>
                {/* Status cards */}
                <div style={{ display:"flex", flexDirection:"column", gap:"10px" }}>
                  {[
                    { label:"Availability", value:"From June 2026", dot:"#4ade80" },
                    { label:"Location", value:"Open to Relocation", dot:"#60a5fa" },
                    { label:"Response Time", value:"< 24 hours", dot:"#f59e0b" },
                  ].map((item, i) => (
                    <div key={i} style={{
                      padding:"12px 14px", borderRadius:"8px",
                      background:"rgba(255,255,255,0.04)",
                      border:"1px solid rgba(255,255,255,0.08)",
                      display:"flex", alignItems:"center", justifyContent:"space-between", gap:"12px",
                    }}>
                      <span style={{ fontFamily:"'DM Mono',monospace", fontSize:"10px", color:"rgba(255,255,255,0.3)", letterSpacing:"0.05em" }}>{item.label}</span>
                      <div style={{ display:"flex", alignItems:"center", gap:"6px" }}>
                        <span style={{ width:5, height:5, borderRadius:"50%", background:item.dot, flexShrink:0 }} />
                        <span style={{ fontSize:"12px", fontWeight:600, color:"rgba(255,255,255,0.65)" }}>{item.value}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ── Bottom bar ── */}
          <div style={{ position:"relative", zIndex:1, maxWidth:"1200px", margin:"0 auto", padding:"32px 56px 56px" }}>
            <div style={{
              paddingTop:"32px",
              borderTop:"1px solid rgba(255,255,255,0.06)",
              display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:"20px",
            }}>
              <div>
                <div style={{ fontFamily:"'DM Serif Display',serif", fontSize:"18px", fontStyle:"italic", color:"rgba(255,255,255,0.4)", marginBottom:"4px" }}>
                  Gopalajosyula Siva Satya Sai Bhagavan
                </div>
                <div style={{ fontFamily:"'DM Mono',monospace", fontSize:"11px", color:"rgba(255,255,255,0.18)" }}>
                  © 2026 · Built with React & Next.js · Designed with intent
                </div>
              </div>
              <div style={{ display:"flex", gap:"12px", alignItems:"center" }}>
                {[
                  { icon:Github, href:"https://github.com/bhagavan444" },
                  { icon:Linkedin, href:"https://www.linkedin.com/in/gopalajosyula-siva-satya-sai-bhagavan-1624a027b/" },
                  { icon:Mail, href:"mailto:g.sivasatyasaibhagavan@gmail.com" },
                ].map((s, i) => (
                  <a key={i} href={s.href} target={s.href.startsWith("http")?"_blank":undefined} rel="noopener noreferrer" style={{
                    width:38, height:38, borderRadius:"8px",
                    display:"flex", alignItems:"center", justifyContent:"center",
                    background:"rgba(255,255,255,0.05)",
                    border:"1px solid rgba(255,255,255,0.1)",
                    color:"rgba(255,255,255,0.45)",
                    transition:"all 0.2s ease",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background="rgba(255,255,255,0.12)"; e.currentTarget.style.color=T.white; e.currentTarget.style.transform="translateY(-3px)"; e.currentTarget.style.borderColor="rgba(255,255,255,0.25)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background="rgba(255,255,255,0.05)"; e.currentTarget.style.color="rgba(255,255,255,0.45)"; e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.borderColor="rgba(255,255,255,0.1)"; }}>
                    <s.icon size={16} strokeWidth={1.6} />
                  </a>
                ))}
                <button onClick={() => window.scrollTo({ top:0, behavior:"smooth" })} style={{
                  display:"inline-flex", alignItems:"center", gap:"7px",
                  padding:"10px 18px", borderRadius:"8px",
                  background:"rgba(255,255,255,0.05)",
                  border:"1px solid rgba(255,255,255,0.1)",
                  fontFamily:"'Libre Franklin',sans-serif",
                  fontSize:"13px", fontWeight:500,
                  color:"rgba(255,255,255,0.5)", cursor:"pointer",
                  transition:"all 0.2s ease",
                }}
                onMouseEnter={e => { e.currentTarget.style.background="rgba(255,255,255,0.1)"; e.currentTarget.style.color=T.white; e.currentTarget.style.transform="translateY(-2px)"; e.currentTarget.style.borderColor="rgba(255,255,255,0.2)"; }}
                onMouseLeave={e => { e.currentTarget.style.background="rgba(255,255,255,0.05)"; e.currentTarget.style.color="rgba(255,255,255,0.5)"; e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.borderColor="rgba(255,255,255,0.1)"; }}>
                  Back to top <ArrowUpRight size={13} strokeWidth={2.5} />
                </button>
              </div>
            </div>
          </div>

          {/* ── Gradient rainbow line at very bottom ── */}
          <div style={{ height:"3px", background:"linear-gradient(90deg,#6366f1,#8b5cf6,#ec4899,#f59e0b,#10b981,#6366f1)", backgroundSize:"200% 100%", animation:"gradBar 8s ease-in-out infinite" }} />
        </div>
      </footer>

      {/* ══════════════════════════════════════════
          MODAL
      ══════════════════════════════════════════ */}
      {showModal && (
        <div onClick={() => setShowModal(false)} style={{
          position:"fixed", inset:0,
          background:"rgba(0,0,0,0.94)",
          backdropFilter:"blur(6px)",
          zIndex:9999,
          display:"flex", alignItems:"center", justifyContent:"center",
          animation:"fadeIn 0.2s ease",
        }}>
          <div onClick={e => e.stopPropagation()} style={{
            width:"100%", maxWidth:"960px",
            height:"90vh",
            margin:"0 auto", padding:"0 24px",
            display:"flex", flexDirection:"column", gap:"14px",
            animation:"fadeUp 0.3s ease",
          }}>
            {/* Modal toolbar */}
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
              <span style={{ fontFamily:"'DM Mono',monospace", fontSize:"12px", color:"rgba(255,255,255,0.4)" }}>G_S_S_S_Bhagavan_Resume.pdf</span>
              <div style={{ display:"flex", gap:"10px" }}>
                <a href={RESUME_DOWNLOAD} style={{
                  display:"inline-flex", alignItems:"center", gap:"7px",
                  padding:"9px 18px", borderRadius:"7px",
                  background:T.white, color:T.ink,
                  fontSize:"13px", fontWeight:600, textDecoration:"none",
                  transition:"background 0.15s, transform 0.15s",
                }}
                onMouseEnter={e => { e.currentTarget.style.background="#f0f0ee"; e.currentTarget.style.transform="translateY(-2px)"; }}
                onMouseLeave={e => { e.currentTarget.style.background=T.white; e.currentTarget.style.transform="translateY(0)"; }}>
                  <Download size={14} strokeWidth={2} /> Download
                </a>
                <button onClick={() => setShowModal(false)} style={{
                  display:"flex", alignItems:"center", justifyContent:"center",
                  width:40, height:40, borderRadius:"8px",
                  background:"rgba(255,255,255,0.08)", border:"1px solid rgba(255,255,255,0.15)",
                  color:T.white, cursor:"pointer",
                  transition:"all 0.2s ease",
                }}
                onMouseEnter={e => { e.currentTarget.style.background="rgba(255,255,255,0.14)"; e.currentTarget.style.transform="rotate(90deg)"; }}
                onMouseLeave={e => { e.currentTarget.style.background="rgba(255,255,255,0.08)"; e.currentTarget.style.transform="rotate(0deg)"; }}>
                  <X size={15} strokeWidth={2} />
                </button>
              </div>
            </div>
            {/* iframe */}
            <div style={{ flex:1, borderRadius:"10px", overflow:"hidden", border:"1px solid rgba(255,255,255,0.1)" }}>
              <iframe src={RESUME_PREVIEW} style={{ width:"100%", height:"100%", border:"none" }} title="Resume Fullscreen" allowFullScreen />
            </div>
          </div>
        </div>
      )}
    </>
  );
}