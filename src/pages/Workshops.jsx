"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  ExternalLink, CheckCircle2, Calendar, Award,
  Code2, Cloud, Brain, Database, Terminal,
  Shield, ArrowRight, TrendingUp, BookOpen, Users, Cpu,
} from "lucide-react";

/* ═══════════════════════════════════════════════════════════════
   DESIGN TOKENS  — identical to Certifications
═══════════════════════════════════════════════════════════════ */
const C = {
  bg:        "#ffffff",
  surface:   "#f9fafb",
  surface2:  "#f3f4f6",
  surface3:  "#e5e7eb",
  border:    "rgba(0,0,0,0.06)",
  border2:   "rgba(0,0,0,0.10)",
  border3:   "rgba(0,0,0,0.14)",
  text:      "#0f172a",
  muted:     "#64748b",
  muted2:    "#475569",
  accent:    "#4f7fff",
  accentDim: "rgba(79,127,255,0.08)",
  green:     "#10b981",
  greenDim:  "rgba(16,185,129,0.08)",
  purple:    "#a78bfa",
  purpleDim: "rgba(167,139,250,0.08)",
  amber:     "#f59e0b",
  amberDim:  "rgba(245,158,11,0.08)",
  rose:      "#f43f5e",
  roseDim:   "rgba(244,63,94,0.08)",
  indigo:    "#6366f1",
  indigoDim: "rgba(99,102,241,0.08)",
};

/* ═══════════════════════════════════════════════════════════════
   SKILL ICON MAPPING  — same DevIcon map as Certifications
═══════════════════════════════════════════════════════════════ */
const skillIcons = {
  "Python":           "devicon-python-plain colored",
  "TensorFlow":       "devicon-tensorflow-original colored",
  "Keras":            "devicon-keras-plain colored",
  "Scikit-learn":     "devicon-scikitlearn-plain colored",
  "NumPy":            "devicon-numpy-plain colored",
  "Pandas":           "devicon-pandas-plain colored",
  "OpenCV":           "devicon-opencv-plain colored",
  "PyTorch":          "devicon-pytorch-plain colored",
  "Docker":           "devicon-docker-plain colored",
  "AWS":              "devicon-amazonwebservices-plain-wordmark colored",
  "Azure":            "devicon-azure-plain colored",
  "Git":              "devicon-git-plain colored",
  "GitHub":           "devicon-github-original",
  "Linux":            "devicon-linux-plain colored",
  "Bash":             "devicon-bash-plain colored",
  "React":            "devicon-react-original colored",
  "Node.js":          "devicon-nodejs-plain colored",
  "MongoDB":          "devicon-mongodb-plain colored",
  "MySQL":            "devicon-mysql-plain colored",
  "PostgreSQL":       "devicon-postgresql-plain colored",
  "Java":             "devicon-java-plain colored",
  "C++":              "devicon-cplusplus-plain colored",
  "JavaScript":       "devicon-javascript-plain colored",
  "HTML":             "devicon-html5-plain colored",
  "CSS":              "devicon-css3-plain colored",
  "Flask":            "devicon-flask-original",
  "Django":           "devicon-django-plain colored",
  "Solidity":         "devicon-solidity-plain colored",
  "Ethereum":         "devicon-ethereum-original colored",
  "Kali Linux":       "devicon-linux-plain colored",
  "Wireshark":        "devicon-linux-plain colored",
  "Metasploit":       "devicon-linux-plain colored",
  "YOLO":             "devicon-python-plain colored",
  "CNN":              "devicon-tensorflow-original colored",
  "NLP":              "devicon-python-plain colored",
  "Streamlit":        "devicon-python-plain colored",
  "R":                "devicon-r-plain colored",
  "Tableau":          "devicon-python-plain colored",
  "Power BI":         "devicon-python-plain colored",
};

/* ═══════════════════════════════════════════════════════════════
   WORKSHOP DATA
   Tone: honest, factual, concise. Exposure ≠ mastery.
═══════════════════════════════════════════════════════════════ */
const workshopsData = {

  /* Three "highlight" workshops — shown as cards at the top.
     Chosen for technical relevance, not prestige.             */
  featured: [
    {
      id: "dl-workshop",
      title: "Deep Learning Fundamentals",
      organizer: "APSSDC",
      year: "2024",
      duration: "3 days",
      format: "Hands-on",
      skills: ["Python", "TensorFlow", "Keras", "CNN"],
      accent:    C.purple,
      accentDim: C.purpleDim,
      description: "Attended a 3-day workshop covering neural network basics, activation functions, and model training. Practiced building simple image classifiers using Keras on provided datasets.",
      connection:  "Provided introductory exposure that supported later coursework on classification models.",
    },
    {
      id: "cloud-devops",
      title: "Cloud Computing & DevOps Basics",
      organizer: "NASSCOM FutureSkills",
      year: "2024",
      duration: "2 days",
      format: "Demonstration",
      skills: ["AWS", "Docker", "Git", "Linux"],
      accent:    C.green,
      accentDim: C.greenDim,
      description: "Participated in sessions introducing AWS fundamentals, containerisation with Docker, and basic CI/CD concepts through guided demonstrations.",
      connection:  "Helped contextualise cloud concepts covered in AWS Cloud Practitioner coursework.",
    },
    {
      id: "cv-workshop",
      title: "Computer Vision with OpenCV",
      organizer: "IIT Hyderabad Outreach",
      year: "2023",
      duration: "2 days",
      format: "Hands-on",
      skills: ["Python", "OpenCV", "CNN", "YOLO"],
      accent:    C.accent,
      accentDim: C.accentDim,
      description: "Explored image processing basics, edge detection, and object detection concepts using OpenCV. Followed along with a simple face detection demo.",
      connection:  "Introduced foundational computer vision ideas referenced in subsequent deep learning study.",
    },
  ],

  /* Domain-grouped list of all workshops */
  domains: {
    "AI & Machine Learning": {
      icon:   Brain,
      accent: C.purple,
      workshops: [
        {
          title:      "Deep Learning Fundamentals",
          organizer:  "APSSDC",
          year:       "2024",
          duration:   "3 days",
          skills:     ["Python", "TensorFlow", "Keras", "CNN"],
          description: "Covered neural network architecture basics and practiced training simple models using Keras on image datasets.",
        },
        {
          title:      "Natural Language Processing Overview",
          organizer:  "Analytics Vidhya",
          year:       "2024",
          duration:   "1 day",
          skills:     ["Python", "NLP", "Scikit-learn"],
          description: "Attended a session introducing tokenisation, text vectorisation, and basic sentiment classification techniques.",
        },
        {
          title:      "Computer Vision with OpenCV",
          organizer:  "IIT Hyderabad Outreach",
          year:       "2023",
          duration:   "2 days",
          skills:     ["Python", "OpenCV", "CNN", "YOLO"],
          description: "Explored image processing fundamentals and followed along with object detection demonstrations using OpenCV and YOLO.",
        },
        {
          title:      "Machine Learning Model Deployment",
          organizer:  "Great Learning",
          year:       "2024",
          duration:   "1 day",
          skills:     ["Python", "Flask", "Streamlit"],
          description: "Introduced to basic model serving patterns using Flask and Streamlit through guided walkthroughs.",
        },
      ],
    },

    "Cloud & DevOps": {
      icon:   Cloud,
      accent: C.green,
      workshops: [
        {
          title:      "Cloud Computing & DevOps Basics",
          organizer:  "NASSCOM FutureSkills",
          year:       "2024",
          duration:   "2 days",
          skills:     ["AWS", "Docker", "Git", "Linux"],
          description: "Participated in demonstrations covering AWS core services, Docker basics, and introductory CI/CD pipeline concepts.",
        },
        {
          title:      "Linux & Shell Scripting",
          organizer:  "APSSDC",
          year:       "2023",
          duration:   "2 days",
          skills:     ["Linux", "Bash", "Git"],
          description: "Covered Linux filesystem navigation, basic shell scripting, and version control fundamentals using Git.",
        },
      ],
    },

    "Cybersecurity": {
      icon:   Shield,
      accent: C.rose,
      workshops: [
        {
          title:      "Ethical Hacking Fundamentals",
          organizer:  "EC-Council Academia",
          year:       "2024",
          duration:   "2 days",
          skills:     ["Kali Linux", "Wireshark", "Metasploit"],
          description: "Introduced to penetration testing concepts, network scanning, and basic vulnerability identification in a lab environment.",
        },
        {
          title:      "Web Application Security",
          organizer:  "OWASP Student Chapter",
          year:       "2023",
          duration:   "1 day",
          skills:     ["JavaScript", "Linux", "Python"],
          description: "Attended a session covering OWASP Top 10 vulnerabilities with demonstrations of common web security issues.",
        },
      ],
    },

    "Web Development": {
      icon:   Code2,
      accent: C.accent,
      workshops: [
        {
          title:      "Full-Stack Web Development Bootcamp",
          organizer:  "APSSDC",
          year:       "2023",
          duration:   "3 days",
          skills:     ["React", "Node.js", "MongoDB", "HTML", "CSS"],
          description: "Participated in guided sessions on MERN stack fundamentals, building a simple CRUD application as a hands-on exercise.",
        },
        {
          title:      "React.js Component Architecture",
          organizer:  "Scaler School of Technology",
          year:       "2024",
          duration:   "1 day",
          skills:     ["React", "JavaScript"],
          description: "Attended a session covering React component design, props, state, and basic hooks through coding exercises.",
        },
      ],
    },

    "Data Science": {
      icon:   Database,
      accent: C.indigo,
      workshops: [
        {
          title:      "Data Analysis with Python",
          organizer:  "Internshala Trainings",
          year:       "2023",
          duration:   "2 days",
          skills:     ["Python", "Pandas", "NumPy", "Tableau"],
          description: "Covered data cleaning, exploratory analysis, and basic visualisation using Pandas and Tableau in guided exercises.",
        },
        {
          title:      "Statistics for Data Science",
          organizer:  "Analytics Vidhya",
          year:       "2023",
          duration:   "1 day",
          skills:     ["Python", "R", "NumPy"],
          description: "Participated in a session introducing descriptive statistics, probability distributions, and hypothesis testing concepts.",
        },
      ],
    },

    "Blockchain & Web3": {
      icon:   Cpu,
      accent: C.amber,
      workshops: [
        {
          title:      "Blockchain Technology Introduction",
          organizer:  "IEEE Student Branch",
          year:       "2024",
          duration:   "1 day",
          skills:     ["Solidity", "Ethereum"],
          description: "Attended an introductory session on blockchain architecture, consensus mechanisms, and a basic smart contract demonstration.",
        },
      ],
    },
  },
};

/* ═══════════════════════════════════════════════════════════════
   FLOATING BACKGROUND  — identical to Certifications
═══════════════════════════════════════════════════════════════ */
function FloatingElements() {
  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "10%",  left: "15%",  width: "1px", height: "200px", background: `linear-gradient(180deg, transparent, ${C.accent}08, transparent)`,  animation: "floatV1 35s ease-in-out infinite" }} />
      <div style={{ position: "absolute", top: "40%",  right: "20%", width: "1px", height: "280px", background: `linear-gradient(180deg, transparent, ${C.purple}06, transparent)`,  animation: "floatV2 40s ease-in-out infinite" }} />
      <div style={{ position: "absolute", top: "70%",  left: "40%",  width: "1px", height: "180px", background: `linear-gradient(180deg, transparent, ${C.green}05, transparent)`,   animation: "floatV1 45s ease-in-out infinite reverse" }} />
      <div style={{ position: "absolute", top: "60%",  left: "10%",  width: "400px", height: "400px", borderRadius: "50%", background: `radial-gradient(circle, ${C.green}04 0%, transparent 70%)`,  filter: "blur(60px)", animation: "floatH1 50s linear infinite" }} />
      <div style={{ position: "absolute", top: "20%",  right: "5%",  width: "500px", height: "300px", borderRadius: "50%", background: `radial-gradient(ellipse, ${C.accent}03 0%, transparent 60%)`, filter: "blur(80px)", animation: "floatH2 60s linear infinite reverse" }} />
      <div style={{ position: "absolute", bottom: "15%", right: "30%", width: "350px", height: "350px", borderRadius: "50%", background: `radial-gradient(circle, ${C.purple}03 0%, transparent 65%)`, filter: "blur(70px)", animation: "floatH1 55s linear infinite" }} />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MOVING TEXT STRIPS  — identical to Certifications
═══════════════════════════════════════════════════════════════ */
function MovingTextStrips() {
  const s1 = "WORKSHOP · LEARNING · EXPOSURE · FUNDAMENTALS · TRAINING · ";
  const s2 = "DEEP LEARNING · CLOUD · SECURITY · WEB · DATA SCIENCE · ";
  return (
    <>
      <div style={{ position: "absolute", top: "35%", left: 0, width: "100%", overflow: "hidden", pointerEvents: "none", opacity: 0.04 }}>
        <div style={{ display: "flex", whiteSpace: "nowrap", animation: "scrollRTL 40s linear infinite", fontFamily: "'DM Mono', monospace", fontSize: "4rem", fontWeight: 700, letterSpacing: "0.3em", color: C.text, filter: "blur(1px)" }}>
          {s1.repeat(10)}
        </div>
      </div>
      <div style={{ position: "absolute", top: "60%", left: 0, width: "100%", overflow: "hidden", pointerEvents: "none", opacity: 0.03 }}>
        <div style={{ display: "flex", whiteSpace: "nowrap", animation: "scrollRTL 55s linear infinite", fontFamily: "'DM Mono', monospace", fontSize: "3rem", fontWeight: 600, letterSpacing: "0.25em", color: C.text, filter: "blur(1.5px)" }}>
          {s2.repeat(10)}
        </div>
      </div>
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════
   CUSTOM CURSOR  — identical to Certifications
═══════════════════════════════════════════════════════════════ */
function CustomCursor() {
  const [pos, setPos]   = useState({ x: 0, y: 0 });
  const [hov, setHov]   = useState(false);
  useEffect(() => {
    const fn = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
      const t = e.target;
      setHov(!!(t.tagName === "A" || t.tagName === "BUTTON" || t.closest("[data-magnetic]") || t.closest("[data-hover]")));
    };
    window.addEventListener("mousemove", fn);
    return () => window.removeEventListener("mousemove", fn);
  }, []);
  return (
    <>
      <div style={{ position: "fixed", left: pos.x, top: pos.y, width: hov ? "32px" : "8px", height: hov ? "32px" : "8px", borderRadius: "50%", background: hov ? "transparent" : C.accent, border: hov ? `2px solid ${C.accent}` : "none", pointerEvents: "none", zIndex: 10000, transform: "translate(-50%,-50%)", transition: "width .2s,height .2s,background .2s,border .2s", mixBlendMode: "difference" }} />
      <div style={{ position: "fixed", left: pos.x, top: pos.y, width: hov ? "64px" : "48px", height: hov ? "64px" : "48px", borderRadius: "50%", background: `radial-gradient(circle,${C.accent}15 0%,transparent 70%)`, pointerEvents: "none", zIndex: 9999, transform: "translate(-50%,-50%)", transition: "width .3s,height .3s" }} />
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SCROLL PROGRESS  — identical to Certifications
═══════════════════════════════════════════════════════════════ */
function ScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const fn = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setP(total > 0 ? (window.scrollY / total) * 100 : 0);
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <div style={{ position: "fixed", top: 0, left: 0, right: 0, height: "2px", background: C.surface2, zIndex: 9998 }}>
      <div style={{ height: "100%", width: `${p}%`, background: `linear-gradient(90deg,${C.accent},${C.purple},${C.green})`, transition: "width .1s linear" }} />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   ANIMATED COUNTER  — identical to Certifications
═══════════════════════════════════════════════════════════════ */
function AnimatedCounter({ value, duration = 2000 }) {
  const [count, setCount] = useState(0);
  const [fired, setFired] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !fired) {
        setFired(true);
        const num = parseInt(value.toString().replace(/[^0-9]/g, "")) || 0;
        const start = Date.now();
        const tick = () => {
          const prog = Math.min((Date.now() - start) / duration, 1);
          const eased = 1 - Math.pow(1 - prog, 3);
          setCount(Math.floor(num * eased));
          if (prog < 1) requestAnimationFrame(tick); else setCount(num);
        };
        tick();
      }
    }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [value, duration, fired]);
  const fmt = (n) => value.toString().includes("+") ? `${n}+` : `${n}`;
  return <span ref={ref}>{fmt(count)}</span>;
}

/* ═══════════════════════════════════════════════════════════════
   STAT CHIP  — identical to Certifications
═══════════════════════════════════════════════════════════════ */
function StatChip({ value, label, icon: Icon, delay = 0 }) {
  const [inView, setInView] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ display: "flex", alignItems: "center", gap: "1rem", padding: "1.25rem 1.75rem", background: C.surface, border: `1px solid ${C.border}`, borderRadius: "12px", opacity: inView ? 1 : 0, transform: inView ? "translateX(0)" : "translateX(40px)", transition: `all .7s cubic-bezier(.22,1,.36,1) ${delay}s` }}>
      {Icon && (
        <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: C.accentDim, border: `1px solid ${C.accent}20`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <Icon size={18} color={C.accent} />
        </div>
      )}
      <div>
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.6rem", fontWeight: 600, fontStyle: "italic", color: C.text, lineHeight: 1, marginBottom: ".25rem", letterSpacing: "-0.01em" }}>
          <AnimatedCounter value={value} />
        </div>
        <div style={{ fontSize: "0.8rem", color: C.muted, fontFamily: "'DM Mono', monospace" }}>{label}</div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SKILL TAG  — identical to Certifications
═══════════════════════════════════════════════════════════════ */
function SkillTag({ skill, accent, isHovered, onHover, onLeave }) {
  const iconClass = skillIcons[skill] || "devicon-code-plain";
  return (
    <span
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      style={{ display: "inline-flex", alignItems: "center", gap: ".5rem", padding: ".5rem 1rem", background: isHovered ? accent + "15" : C.surface2, border: `1px solid ${isHovered ? accent + "40" : C.border}`, borderRadius: "8px", fontSize: ".8rem", fontWeight: 500, color: isHovered ? C.text : C.muted2, fontFamily: "'DM Mono', monospace", transition: "all .35s cubic-bezier(.22,1,.36,1)", transform: isHovered ? "translateX(6px)" : "none", position: "relative", overflow: "hidden", cursor: "default" }}
    >
      <i className={iconClass} style={{ fontSize: "1.2rem", transition: "all .35s cubic-bezier(.22,1,.36,1)", transform: isHovered ? "scale(1.15) rotate(5deg)" : "none" }} />
      {skill}
      {isHovered && <div style={{ position: "absolute", bottom: 0, left: 0, height: "2px", background: accent, animation: "underlineSweep .4s ease-out both" }} />}
      {isHovered && <div style={{ position: "absolute", top: 0, left: "-100%", width: "100%", height: "100%", background: "linear-gradient(90deg,transparent,rgba(255,255,255,.3),transparent)", animation: "shimmerSweep .8s ease-out" }} />}
    </span>
  );
}

/* ═══════════════════════════════════════════════════════════════
   FEATURED WORKSHOP CARD
   Same structure as FlagshipCard in Certifications.
   Badge says "Workshop Attended" instead of "Training Completed".
═══════════════════════════════════════════════════════════════ */
function FeaturedCard({ ws, index }) {
  const [inView,  setInView]  = useState(false);
  const [tilt,    setTilt]    = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [hovSkill,setHovSkill]= useState(null);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.2 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const onMouseMove = (e) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    setTilt({ x: ((e.clientY - r.top)  / r.height - 0.5) * 3,
              y: -((e.clientX - r.left) / r.width  - 0.5) * 3 });
  };

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseMove={onMouseMove}
      onMouseLeave={() => { setTilt({ x: 0, y: 0 }); setHovered(false); }}
      style={{ background: C.surface, border: `1px solid ${hovered ? ws.accent + "40" : C.border}`, borderRadius: "20px", overflow: "hidden", transition: "all .4s cubic-bezier(.22,1,.36,1)", transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(${hovered ? "-8px" : "0"})`, boxShadow: hovered ? "0 20px 48px rgba(0,0,0,0.08)" : "0 4px 16px rgba(0,0,0,0.04)", opacity: inView ? 1 : 0, animation: inView ? `slideInFromRight .7s cubic-bezier(.22,1,.36,1) ${index * .15}s both` : "none" }}
    >
      {/* Top accent bar */}
      <div style={{ height: "3px", background: `linear-gradient(90deg,${ws.accent},transparent)`, position: "relative", overflow: "hidden" }}>
        {hovered && <div style={{ position: "absolute", top: 0, left: "-100%", width: "100%", height: "100%", background: "linear-gradient(90deg,transparent,rgba(255,255,255,.6),transparent)", animation: "shimmerSweep 1.5s ease-in-out" }} />}
      </div>

      <div style={{ padding: "2.5rem" }}>
        {/* Badge row */}
        <div style={{ display: "flex", alignItems: "center", gap: ".75rem", marginBottom: "1rem" }}>
          <div style={{ padding: ".4rem .9rem", background: ws.accentDim, border: `1px solid ${ws.accent}30`, borderRadius: "6px", fontSize: ".7rem", fontWeight: 700, color: ws.accent, fontFamily: "'DM Mono', monospace", letterSpacing: ".08em", textTransform: "uppercase" }}>
            Workshop Attended
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: ".4rem", padding: ".4rem .9rem", background: C.greenDim, border: `1px solid ${C.green}30`, borderRadius: "6px", fontSize: ".7rem", fontWeight: 700, color: C.green, fontFamily: "'DM Mono', monospace" }}>
            {ws.format}
          </div>
        </div>

        {/* Title */}
        <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", fontWeight: 700, fontStyle: "italic", color: C.text, lineHeight: 1.2, letterSpacing: "-0.01em", marginBottom: ".5rem" }}>
          {ws.title}
        </h3>

        {/* Meta */}
        <div style={{ display: "flex", alignItems: "center", gap: ".75rem", fontSize: ".875rem", color: C.muted, marginBottom: "1.5rem", flexWrap: "wrap" }}>
          <span>{ws.organizer}</span>
          <span>•</span>
          <div style={{ display: "flex", alignItems: "center", gap: ".4rem" }}>
            <Calendar size={14} />{ws.year}
          </div>
          <span>•</span>
          <span>{ws.duration}</span>
        </div>

        {/* Skill tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: ".6rem", marginBottom: "2rem" }}>
          {ws.skills.map((skill, i) => (
            <SkillTag key={skill} skill={skill} accent={ws.accent}
              isHovered={hovSkill === i}
              onHover={() => setHovSkill(i)}
              onLeave={() => setHovSkill(null)} />
          ))}
        </div>

        {/* Description block */}
        <div style={{ padding: "1.5rem", background: `linear-gradient(135deg,${ws.accentDim} 0%,transparent 100%)`, border: `1px solid ${ws.accent}20`, borderRadius: "12px", marginBottom: "1.5rem" }}>
          <div style={{ fontSize: ".7rem", fontWeight: 700, color: C.muted, letterSpacing: ".1em", textTransform: "uppercase", fontFamily: "'DM Mono', monospace", marginBottom: ".75rem" }}>
            What Was Covered
          </div>
          <div style={{ fontSize: ".9rem", color: C.muted2, lineHeight: 1.7 }}>{ws.description}</div>
        </div>

        {/* Connection block */}
        <div style={{ padding: "1.25rem", background: C.surface2, border: `1px solid ${C.border}`, borderRadius: "10px" }}>
          <div style={{ fontSize: ".7rem", fontWeight: 700, color: C.muted, letterSpacing: ".1em", textTransform: "uppercase", fontFamily: "'DM Mono', monospace", marginBottom: ".5rem" }}>
            How It Connects
          </div>
          <div style={{ fontSize: ".9rem", color: C.muted2, lineHeight: 1.6 }}>{ws.connection}</div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   DOMAIN SECTION  — same accordion as Certifications DomainSection
═══════════════════════════════════════════════════════════════ */
function DomainSection({ domain, data, isActive, onClick }) {
  const Icon = data.icon;
  const [hovIdx, setHovIdx] = useState(null);

  return (
    <div>
      {/* Header row */}
      <div
        onClick={onClick}
        data-hover
        style={{ display: "flex", alignItems: "center", gap: "1rem", padding: "1.5rem 2rem", background: isActive ? `${data.accent}08` : C.surface, border: `1px solid ${isActive ? data.accent + "30" : C.border}`, borderRadius: "16px", cursor: "pointer", transition: "all .3s cubic-bezier(.22,1,.36,1)", marginBottom: isActive ? "1.5rem" : 0 }}
        onMouseEnter={(e) => { if (!isActive) { e.currentTarget.style.background = C.surface2; e.currentTarget.style.borderColor = C.border2; e.currentTarget.style.transform = "translateX(4px)"; } }}
        onMouseLeave={(e) => { if (!isActive) { e.currentTarget.style.background = C.surface; e.currentTarget.style.borderColor = C.border; e.currentTarget.style.transform = "translateX(0)"; } }}
      >
        <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: isActive ? `${data.accent}15` : C.surface2, border: `1px solid ${isActive ? data.accent + "40" : C.border}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all .3s cubic-bezier(.22,1,.36,1)", transform: isActive ? "rotate(5deg)" : "none" }}>
          <Icon size={22} style={{ color: isActive ? data.accent : C.muted }} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.4rem", fontWeight: 700, fontStyle: "italic", color: C.text, marginBottom: ".25rem", letterSpacing: "-0.01em" }}>{domain}</div>
          <div style={{ fontSize: ".8rem", color: C.muted, fontFamily: "'DM Mono', monospace" }}>
            {data.workshops.length} {data.workshops.length === 1 ? "workshop" : "workshops"}
          </div>
        </div>
        <ArrowRight size={20} style={{ color: isActive ? data.accent : C.muted, transform: isActive ? "rotate(90deg)" : "none", transition: "all .4s cubic-bezier(.22,1,.36,1)" }} />
      </div>

      {/* Workshop cards grid */}
      {isActive && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px,1fr))", gap: "1.25rem", marginBottom: "2rem", animation: "elasticExpand .5s cubic-bezier(.22,1,.36,1) both" }}>
          {data.workshops.map((ws, i) => (
            <WorkshopCard key={i} ws={ws} data={data} index={i}
              hovered={hovIdx === i}
              onHover={() => setHovIdx(i)}
              onLeave={() => setHovIdx(null)} />
          ))}
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   WORKSHOP CARD  — compact card used inside domain accordion
   Mirrors Certifications domain cert card exactly.
═══════════════════════════════════════════════════════════════ */
function WorkshopCard({ ws, data, index, hovered, onHover, onLeave }) {
  return (
    <div
      data-hover
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      style={{ padding: "1.75rem", background: C.surface, border: `1px solid ${hovered ? data.accent + "40" : C.border}`, borderRadius: "14px", transition: "all .35s cubic-bezier(.22,1,.36,1)", opacity: 0, animation: `slideInFromRight .5s cubic-bezier(.22,1,.36,1) ${index * .08}s both`, transform: hovered ? "translateY(-4px) translateX(4px)" : "none", boxShadow: hovered ? "0 12px 32px rgba(0,0,0,0.08)" : "none" }}
    >
      {/* Title */}
      <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.2rem", fontWeight: 700, fontStyle: "italic", color: C.text, marginBottom: ".75rem", letterSpacing: "-0.01em" }}>
        {ws.title}
      </h4>

      {/* Meta */}
      <div style={{ display: "flex", alignItems: "center", gap: ".5rem", fontSize: ".8rem", color: C.muted, marginBottom: "1.25rem", flexWrap: "wrap" }}>
        <span>{ws.organizer}</span>
        <span>•</span>
        <span>{ws.year}</span>
        <span>•</span>
        <span>{ws.duration}</span>
      </div>

      {/* Skills */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: ".5rem", marginBottom: "1.25rem" }}>
        {ws.skills.map((skill) => {
          const iconClass = skillIcons[skill] || "devicon-code-plain";
          return (
            <span key={skill}
              style={{ display: "inline-flex", alignItems: "center", gap: ".4rem", padding: ".4rem .8rem", background: C.surface2, border: `1px solid ${C.border}`, borderRadius: "6px", fontSize: ".75rem", fontWeight: 500, color: C.muted2, fontFamily: "'DM Mono', monospace", transition: "all .3s cubic-bezier(.22,1,.36,1)" }}
              onMouseEnter={(e) => { e.currentTarget.style.background = data.accent + "10"; e.currentTarget.style.borderColor = data.accent + "30"; e.currentTarget.style.transform = "translateX(3px)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = C.surface2; e.currentTarget.style.borderColor = C.border; e.currentTarget.style.transform = "translateX(0)"; }}
            >
              <i className={iconClass} style={{ fontSize: "1rem" }} />
              {skill}
            </span>
          );
        })}
      </div>

      {/* Description */}
      <div style={{ padding: "1rem", background: C.surface2, border: `1px solid ${C.border}`, borderRadius: "8px" }}>
        <div style={{ fontSize: ".7rem", fontWeight: 700, color: C.muted, letterSpacing: ".08em", textTransform: "uppercase", fontFamily: "'DM Mono', monospace", marginBottom: ".4rem" }}>
          What Was Covered
        </div>
        <div style={{ fontSize: ".85rem", color: C.muted2, lineHeight: 1.55 }}>{ws.description}</div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════════════════════ */
export default function Workshops() {
  const [activeDomain, setActiveDomain] = useState(null);
  const [headerInView,   setHeaderInView]   = useState(false);
  const [featuredInView, setFeaturedInView] = useState(false);
  const [domainsInView,  setDomainsInView]  = useState(false);
  const [summaryInView,  setSummaryInView]  = useState(false);
  const [scrollDir, setScrollDir] = useState("down");
  const lastY = useRef(0);

  const headerRef  = useRef(null);
  const featuredRef = useRef(null);
  const domainsRef = useRef(null);
  const summaryRef = useRef(null);

  useEffect(() => {
    const fn = () => {
      const y = window.scrollY;
      setScrollDir(y > lastY.current ? "down" : "up");
      lastY.current = y;
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    const pairs = [
      { ref: headerRef,   setter: setHeaderInView   },
      { ref: featuredRef, setter: setFeaturedInView  },
      { ref: domainsRef,  setter: setDomainsInView   },
      { ref: summaryRef,  setter: setSummaryInView   },
    ];
    const instances = pairs.map(({ ref, setter }) => {
      const obs = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting && scrollDir === "down") setter(true); },
        { threshold: 0.2 }
      );
      if (ref.current) obs.observe(ref.current);
      return obs;
    });
    return () => instances.forEach(o => o.disconnect());
  }, [scrollDir]);

  const totalWorkshops = Object.values(workshopsData.domains)
    .reduce((sum, d) => sum + d.workshops.length, 0);

  const totalDomains = Object.keys(workshopsData.domains).length;

  const fade = (inView) => ({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(40px)",
    transition: "opacity .8s cubic-bezier(.22,1,.36,1), transform .8s cubic-bezier(.22,1,.36,1)",
  });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&family=DM+Mono:wght@400;500;600;700&family=Geist:wght@300;400;500;600;700&display=swap');
        @import url('https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css');

        *,*::before,*::after{margin:0;padding:0;box-sizing:border-box;}
        html{scroll-behavior:smooth;}
        body{font-family:'Geist',system-ui,sans-serif;background:${C.bg};color:${C.text};-webkit-font-smoothing:antialiased;cursor:none;}
        ::selection{background:${C.accentDim};color:${C.text};}
        ::-webkit-scrollbar{width:6px;}
        ::-webkit-scrollbar-track{background:${C.bg};}
        ::-webkit-scrollbar-thumb{background:${C.border3};border-radius:3px;}
        ::-webkit-scrollbar-thumb:hover{background:${C.muted};}

        @keyframes slideInFromRight{from{opacity:0;transform:translateX(40px);}to{opacity:1;transform:translateX(0);}}
        @keyframes elasticExpand{0%{opacity:0;transform:translateY(-12px) scaleY(.95);}60%{transform:translateY(0) scaleY(1.02);}100%{opacity:1;transform:translateY(0) scaleY(1);}}
        @keyframes scrollRTL{from{transform:translateX(0);}to{transform:translateX(-50%);}}
        @keyframes shimmerSweep{0%{left:-100%;}100%{left:100%;}}
        @keyframes underlineSweep{from{width:0;}to{width:100%;}}
        @keyframes floatV1{0%,100%{transform:translateY(0);}50%{transform:translateY(-40px);}}
        @keyframes floatV2{0%,100%{transform:translateY(0);}50%{transform:translateY(60px);}}
        @keyframes floatH1{from{transform:translateX(0);}to{transform:translateX(100vw);}}
        @keyframes floatH2{from{transform:translateX(0);}to{transform:translateX(-100vw);}}
        @keyframes lineGrow{from{width:0;}to{width:200px;}}

        @media(max-width:768px){body{cursor:auto;}}
      `}</style>

      <CustomCursor />
      <ScrollProgress />
      <FloatingElements />

      {/* Dot grid texture */}
      <div style={{ position: "fixed", inset: 0, backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.015'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`, pointerEvents: "none", zIndex: 0 }} />

      <div style={{ position: "relative", zIndex: 1 }}>

        {/* ═══ HERO HEADER ═══ */}
        <header
          ref={headerRef}
          style={{ maxWidth: "1240px", margin: "0 auto", padding: "10rem 2rem 6rem", borderBottom: `1px solid ${C.border}`, position: "relative", ...fade(headerInView) }}
        >
          <MovingTextStrips />
          <div style={{ position: "absolute", top: "30%", left: "50%", transform: "translateX(-50%)", width: "800px", height: "400px", borderRadius: "50%", background: `radial-gradient(circle,${C.accent}08 0%,transparent 70%)`, filter: "blur(100px)", pointerEvents: "none" }} />

          {/* Overline */}
          <div style={{ display: "flex", alignItems: "center", gap: ".75rem", marginBottom: "2rem" }}>
            <div style={{ width: "48px", height: "2px", background: C.accent }} />
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: ".7rem", fontWeight: 600, letterSpacing: ".2em", textTransform: "uppercase", color: C.accent }}>
              Workshops & Training
            </span>
          </div>

          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(3.5rem,8vw,6.5rem)", fontWeight: 700, fontStyle: "italic", color: C.text, lineHeight: 1.05, letterSpacing: "-0.02em", marginBottom: "1rem", maxWidth: "1000px" }}>
            Structured Learning
          </h1>

          {/* Gradient underline */}
          <div style={{ width: "200px", height: "4px", background: `linear-gradient(90deg,${C.accent},${C.purple},${C.green})`, borderRadius: "2px", marginBottom: "2.5rem", animation: headerInView ? "lineGrow .8s ease .2s both" : "none" }} />

          <p style={{ fontSize: "1.25rem", color: C.muted2, lineHeight: 1.8, maxWidth: "720px", marginBottom: "4rem" }}>
            Short-format workshops and training sessions attended across AI, cloud, security, and web development.
            These represent structured exposure and introductory practice — not professional proficiency.
          </p>

          {/* Stat chips */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: "1.5rem", maxWidth: "900px" }}>
            <StatChip value={totalWorkshops} label="Workshops Attended" icon={BookOpen}  delay={0}   />
            <StatChip value={totalDomains}   label="Technical Areas"   icon={TrendingUp} delay={0.1} />
            <StatChip value="2023–2024"      label="Period"            icon={Calendar}   delay={0.2} />
          </div>
        </header>

        {/* ═══ FEATURED WORKSHOPS ═══ */}
        <section
          ref={featuredRef}
          style={{ maxWidth: "1240px", margin: "0 auto", padding: "6rem 2rem", ...fade(featuredInView) }}
        >
          <div style={{ marginBottom: "3rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: ".75rem", marginBottom: "1rem" }}>
              <BookOpen size={20} color={C.accent} />
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: ".7rem", fontWeight: 700, letterSpacing: ".15em", textTransform: "uppercase", color: C.muted }}>
                Most Relevant
              </span>
            </div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 700, fontStyle: "italic", color: C.text, letterSpacing: "-0.01em", marginBottom: ".75rem" }}>
              Workshops Tied to Project Areas
            </h2>
            <p style={{ fontSize: "1rem", color: C.muted2, lineHeight: 1.8, maxWidth: "680px" }}>
              Three workshops with the most direct overlap with skills practiced in personal projects.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            {workshopsData.featured.map((ws, i) => (
              <FeaturedCard key={ws.id} ws={ws} index={i} />
            ))}
          </div>
        </section>

        {/* ═══ ALL DOMAINS ═══ */}
        <section
          ref={domainsRef}
          style={{ maxWidth: "1240px", margin: "0 auto", padding: "6rem 2rem", borderTop: `1px solid ${C.border}`, ...fade(domainsInView) }}
        >
          <div style={{ marginBottom: "3rem" }}>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: ".7rem", fontWeight: 700, letterSpacing: ".15em", textTransform: "uppercase", color: C.muted, marginBottom: "1rem" }}>
              Full List
            </div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 700, fontStyle: "italic", color: C.text, letterSpacing: "-0.01em", marginBottom: ".75rem" }}>
              All Workshops by Domain
            </h2>
            <p style={{ fontSize: "1rem", color: C.muted2, lineHeight: 1.8 }}>
              Organised by technical area. Click a domain to expand.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {Object.entries(workshopsData.domains).map(([domain, data]) => (
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

        {/* ═══ SUMMARY FOOTER ═══ */}
        <section
          ref={summaryRef}
          style={{ maxWidth: "1240px", margin: "0 auto", padding: "0 2rem 8rem", ...fade(summaryInView) }}
        >
          <div style={{ textAlign: "center", padding: "4rem 3rem", background: `linear-gradient(135deg,${C.accentDim} 0%,${C.purpleDim} 100%)`, border: "2px solid transparent", backgroundImage: `linear-gradient(135deg,${C.accentDim} 0%,${C.purpleDim} 100%),linear-gradient(90deg,${C.accent}40,${C.purple}40)`, backgroundOrigin: "border-box", backgroundClip: "padding-box,border-box", borderRadius: "24px", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "600px", height: "300px", background: `radial-gradient(circle,${C.accent}15 0%,transparent 70%)`, filter: "blur(80px)", pointerEvents: "none" }} />
            <div style={{ position: "relative", zIndex: 1 }}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "4.5rem", fontWeight: 700, fontStyle: "italic", color: C.text, lineHeight: 1, marginBottom: "1rem", letterSpacing: "-0.02em" }}>
                <AnimatedCounter value={totalWorkshops} />
              </div>
              <div style={{ fontSize: "1.25rem", fontWeight: 600, color: C.text, marginBottom: ".75rem" }}>
                Workshops Attended
              </div>
              <div style={{ fontSize: "1rem", color: C.muted2, lineHeight: 1.8, maxWidth: "560px", margin: "0 auto 2rem" }}>
                Short-format learning across six technical domains. These complement self-directed study and academic coursework — not a substitute for project experience.
              </div>
              <a
                href="#projects"
                data-magnetic
                style={{ display: "inline-flex", alignItems: "center", gap: ".5rem", padding: ".875rem 1.75rem", background: C.accent, borderRadius: "12px", fontSize: ".9rem", fontWeight: 600, color: "#fff", textDecoration: "none", transition: "all .3s cubic-bezier(.22,1,.36,1)", fontFamily: "'Geist',sans-serif" }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px) translateX(4px)"; e.currentTarget.style.boxShadow = "0 8px 28px rgba(79,127,255,0.3)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0) translateX(0)"; e.currentTarget.style.boxShadow = "none"; }}
              >
                See the Projects
                <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}