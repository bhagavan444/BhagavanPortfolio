// src/pages/Home.jsx
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Mail,
  Phone,
  Linkedin,
  Github,
  ExternalLink,
  Code2,
  Brain,
  Database,
  Server,
  Zap,
  Award,
  Briefcase,
  Terminal,
  Globe,
  Rocket,
} from "lucide-react";

export default function Home() {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [currentRole, setCurrentRole] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const canvasRef = useRef(null);

  const roles = [
    "AI & Data Science Engineer",
    "Full-Stack Developer",
    "Machine Learning Specialist",
    "MERN Stack Expert",
  ];

  // Typing animation
  useEffect(() => {
    setIsVisible(true);

    const typingSpeed = isDeleting ? 30 : 80;
    const currentText = roles[currentRole];

    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentText.length) {
          setDisplayText(currentText.substring(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(currentText.substring(0, displayText.length - 1));
        } else {
          setIsDeleting(false);
          setCurrentRole((prev) => (prev + 1) % roles.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentRole]);

  // Particle network background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    setCanvasSize();

    const particles = Array.from({ length: 140 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
      radius: Math.random() * 2 + 0.7,
    }));

    let animationId;

    const animate = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.07)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        const alpha = 0.5 + Math.sin(Date.now() / 1400 + i) * 0.3;
        ctx.fillStyle = `rgba(96, 165, 250, ${alpha})`;
        ctx.fill();

        particles.forEach((p2, j) => {
          if (i <= j) return;
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 200) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            const opacity = (1 - dist / 200) * 0.3;
            ctx.strokeStyle = `rgba(96, 165, 250, ${opacity})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        });
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => setCanvasSize();
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleMouseMove = (e) => {
    const x = (e.clientX / window.innerWidth) * 2 - 1;
    const y = (e.clientY / window.innerHeight) * 2 - 1;
    setMousePos({ x, y });
  };

  const techStack = [
    { icon: Code2, label: "MERN Stack", color: "from-blue-400 to-cyan-400" },
    { icon: Brain, label: "TensorFlow", color: "from-purple-400 to-pink-400" },
    { icon: Database, label: "MongoDB", color: "from-green-400 to-emerald-400" },
    { icon: Server, label: "AWS Cloud", color: "from-orange-400 to-red-400" },
    { icon: Terminal, label: "Python", color: "from-yellow-400 to-orange-400" },
    { icon: Globe, label: "REST APIs", color: "from-indigo-400 to-blue-400" },
  ];

  const stats = [
    { icon: Briefcase, value: "3", label: "Internships", desc: "Production Experience" },
    { icon: Rocket, value: "5+", label: "Projects", desc: "Live Deployments" },
    { icon: Award, value: "13+", label: "Certifications", desc: "Google, IBM, AWS" },
  ];

  const links = [
    { icon: Github, label: "GitHub", href: "https://github.com/bhagavan444", color: "hover:text-purple-400" },
    { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/in/bhagavan", color: "hover:text-blue-400" },
    { icon: Mail, label: "Email", href: "mailto:g.sivasatyasaibhagavan@gmail.com", color: "hover:text-cyan-400" },
    { icon: Phone, label: "+91 7569205626", href: "tel:+917569205626", color: "hover:text-green-400" },
  ];

  // Handle CTA clicks
  const handleViewProjects = () => {
    navigate("/projects");
  };

  const handleDownloadResume = () => {
    const link = document.createElement("a");
    link.href = "/assets/bhagavanresume.pdf";
    link.download = "Bhagavan_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      style={{
        position: "relative",
        minHeight: "100vh",
        background: "linear-gradient(to bottom right, #0f172a, #020617, #000000)",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
      }}
    >
      {/* Particle Canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          opacity: 0.7,
        }}
      />

      {/* Glowing Gradient Orbs */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
        <div
          style={{
            position: "absolute",
            top: "5%",
            left: "10%",
            width: "32rem",
            height: "32rem",
            backgroundColor: "#3b82f6",
            borderRadius: "9999px",
            mixBlendMode: "multiply",
            filter: "blur(100px)",
            opacity: 0.14,
            animation: "blob 15s infinite",
            transform: `translate(${mousePos.x * 40}px, ${mousePos.y * 40}px)`,
            transition: "transform 0.5s ease-out",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "15%",
            right: "5%",
            width: "36rem",
            height: "36rem",
            backgroundColor: "#a855f7",
            borderRadius: "9999px",
            mixBlendMode: "multiply",
            filter: "blur(110px)",
            opacity: 0.14,
            animation: "blob 18s infinite",
            animationDelay: "4s",
            transform: `translate(${-mousePos.x * 50}px, ${mousePos.y * 50}px)`,
            transition: "transform 0.5s ease-out",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "10%",
            left: "45%",
            width: "34rem",
            height: "34rem",
            backgroundColor: "#ec4899",
            borderRadius: "9999px",
            mixBlendMode: "multiply",
            filter: "blur(105px)",
            opacity: 0.2,
            animation: "blob 20s infinite",
            animationDelay: "8s",
            transform: `translate(${mousePos.x * 60}px, ${-mousePos.y * 40}px)`,
            transition: "transform 0.5s ease-out",
          }}
        />
      </div>

      {/* Main Hero Container */}
      <div style={{ position: "relative", zIndex: 10, width: "100%", maxWidth: "95rem", margin: "0 auto", padding: "7rem 2.5rem" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "6rem",
            alignItems: "center",
            "@media (min-width: 1024px)": {
              flexDirection: "row",
              gap: "10rem",
              alignItems: "flex-start",
            },
          }}
        >
          {/* Profile Image Card - MOBILE: Top | DESKTOP: Right */}
          <div
            style={{
              width: "100%",
              maxWidth: "420px",
              order: 1,
              "@media (min-width: 1024px)": {
                order: 2,
                flex: "0 0 420px",
              },
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(70px)",
              transition: "all 1.4s cubic-bezier(0.4, 0, 0.2, 1) 0.4s",
            }}
          >
            <div style={{ position: "relative" }}>
              <div
                style={{
                  position: "relative",
                  borderRadius: "2rem",
                  overflow: "hidden",
                  border: "3px solid rgba(34,211,238,0.5)",
                  boxShadow: "0 30px 70px -20px rgba(34,211,238,0.6)",
                  transition: "all 0.6s ease",
                  aspectRatio: "4 / 5",
                }}
                className="group hover:scale-[1.04] hover:shadow-[0_40px_100px_-25px_rgba(34,211,238,0.8)]"
              >
                <img
                  src="https://lh3.googleusercontent.com/d/1hFtkcydF2n7kk2XtWqD9hSGcLGiDRKuB"
                  alt="Siva Satya Sai Bhagavan"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center 20%",
                    transition: "transform 1s ease",
                  }}
                  className="group-hover:scale-115"
                />

                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(135deg, rgba(34,211,238,0.2) 0%, rgba(168,85,247,0.2) 50%, rgba(236,72,153,0.2) 100%)",
                    backdropFilter: "blur(6px)",
                    opacity: 0.7,
                    transition: "opacity 0.7s",
                  }}
                  className="group-hover:opacity-90"
                />

                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    opacity: 0.15,
                    pointerEvents: "none",
                    backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 4px, rgba(96,165,250,0.08) 4px, rgba(96,165,250,0.08) 8px)",
                  }}
                />

                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 60%, transparent 100%)",
                    opacity: 0,
                    transition: "opacity 0.8s",
                  }}
                  className="group-hover:opacity-100"
                />
              </div>

              {/* Floating Badges */}
              {[
                { text: "React Expert", pos: { top: "-2rem", left: "1rem" }, color: "from-cyan-500 to-blue-600", delay: 0 },
                { text: "AI/ML Pro", pos: { top: "-1.5rem", right: "1rem" }, color: "from-purple-500 to-pink-600", delay: 0.4 },
                { text: "Python Dev", pos: { bottom: "7rem", left: "-4rem" }, color: "from-yellow-500 to-orange-600", delay: 0.8 },
                { text: "AWS Cloud", pos: { bottom: "6rem", right: "-4rem" }, color: "from-orange-500 to-red-600", delay: 1.2 },
              ].map((badge, i) => (
                <div
                  key={i}
                  style={{
                    position: "absolute",
                    ...badge.pos,
                    animation: `floatBadge 6s ease-in-out infinite ${badge.delay}s`,
                    opacity: isVisible ? 1 : 0,
                    transition: `opacity 0.8s ease ${badge.delay + 0.8}s`,
                  }}
                >
                  <div
                    style={{
                      padding: "0.8rem 1.6rem",
                      borderRadius: "9999px",
                      background: `linear-gradient(to right, ${badge.color.split(" ")[1]}, ${badge.color.split(" ")[3]})`,
                      color: "white",
                      fontSize: "1rem",
                      fontWeight: 700,
                      boxShadow: "0 15px 30px -8px rgba(0,0,0,0.5)",
                      border: "1px solid rgba(255,255,255,0.3)",
                      backdropFilter: "blur(12px)",
                      transition: "all 0.5s",
                    }}
                    className="hover:scale-115 hover:shadow-2xl"
                  >
                    {badge.text}
                  </div>
                </div>
              ))}

              {/* Open to Work Badge */}
              <div
                style={{
                  position: "absolute",
                  bottom: "-4rem",
                  left: "50%",
                  transform: "translateX(-50%)",
                  opacity: isVisible ? 1 : 0,
                  transition: "opacity 0.8s ease 1.5s",
                }}
              >
                <div style={{ position: "relative" }}>
                  <div
                    style={{
                      position: "absolute",
                      inset: "-0.5rem",
                      background: "linear-gradient(to right, #22c55e, #10b981)",
                      borderRadius: "9999px",
                      filter: "blur(15px)",
                      opacity: 0.85,
                      animation: "pulse-slow 5s ease-in-out infinite",
                    }}
                    className="group-hover:opacity-100"
                  />
                  <div
                    style={{
                      position: "relative",
                      padding: "1.2rem 2.5rem",
                      background: "linear-gradient(to right, #16a34a, #059669)",
                      borderRadius: "9999px",
                      boxShadow: "0 20px 40px -10px rgba(16,185,129,0.6)",
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem",
                      color: "white",
                      fontWeight: 900,
                      fontSize: "1.1rem",
                      letterSpacing: "0.1em",
                    }}
                  >
                    <span style={{ position: "relative", display: "flex", width: "1.2rem", height: "1.2rem" }}>
                      <span
                        style={{
                          position: "absolute",
                          inset: 0,
                          borderRadius: "9999px",
                          backgroundColor: "white",
                          opacity: 0.85,
                          animation: "ping 2.5s cubic-bezier(0, 0, 0.2, 1) infinite",
                        }}
                      />
                      <span
                        style={{
                          position: "relative",
                          borderRadius: "9999px",
                          width: "1.2rem",
                          height: "1.2rem",
                          backgroundColor: "white",
                        }}
                      />
                    </span>
                    OPEN TO WORK
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Text Content - MOBILE: Below image | DESKTOP: Left side */}
          <div
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(70px)",
              transition: "all 1.3s cubic-bezier(0.4, 0, 0.2, 1)",
              display: "flex",
              flexDirection: "column",
              gap: "3rem",
              order: 2,
              "@media (min-width: 1024px)": {
                order: 1,
              },
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.8rem",
                padding: "0.7rem 1.4rem",
                borderRadius: "9999px",
                background: "linear-gradient(to right, rgba(34,197,94,0.18), rgba(16,185,129,0.18))",
                border: "1px solid rgba(34,197,94,0.35)",
                backdropFilter: "blur(14px)",
              }}
            >
              <span style={{ position: "relative", display: "flex", width: "1rem", height: "1rem" }}>
                <span
                  style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: "9999px",
                    backgroundColor: "#4ade80",
                    opacity: 0.85,
                    animation: "ping 2.5s cubic-bezier(0, 0, 0.2, 1) infinite",
                  }}
                />
                <span
                  style={{
                    position: "relative",
                    borderRadius: "9999px",
                    width: "1rem",
                    height: "1rem",
                    backgroundColor: "#22c55e",
                  }}
                />
              </span>
              <span style={{ color: "#4ade80", fontSize: "1rem", fontWeight: 600 }}>Available for Opportunities</span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <h1
                style={{
                  fontSize: "4rem",
                  lineHeight: 1.1,
                  fontWeight: 900,
                  letterSpacing: "-0.025em",
                  "@media (min-width: 640px)": { fontSize: "5rem" },
                  "@media (min-width: 1024px)": { fontSize: "6.2rem" },
                }}
              >
                <span
                  style={{
                    display: "block",
                    background: "linear-gradient(to right, #60a5fa, #22d3ee, #60a5fa)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                    backgroundSize: "200% 200%",
                    animation: "gradient 5s ease infinite",
                  }}
                >
                  Siva Satya Sai
                </span>
                <span
                  style={{
                    display: "block",
                    background: "linear-gradient(to right, #c084fc, #ec4899, #c084fc)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                    backgroundSize: "200% 200%",
                    animation: "gradient 5s ease infinite",
                    animationDelay: "1.5s",
                  }}
                >
                  Bhagavan
                </span>
              </h1>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  fontSize: "1.8rem",
                  fontWeight: 700,
                  color: "white",
                  minHeight: "3.5rem",
                  "@media (min-width: 640px)": { fontSize: "2.2rem" },
                }}
              >
                <span style={{ color: "#22d3ee", fontSize: "2rem" }}>&gt;</span>
                <span>{displayText}</span>
                <span
                  style={{
                    display: "inline-block",
                    width: "0.25rem",
                    height: "3rem",
                    backgroundColor: "#22d3ee",
                    animation: "pulse 1.3s infinite",
                  }}
                />
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              <p style={{ fontSize: "1.3rem", color: "#cbd5e1", lineHeight: "2rem" }}>
                AI & Data Science undergraduate with hands-on experience in{" "}
                <span style={{ color: "#22d3ee", fontWeight: 600 }}>machine learning</span> and{" "}
                <span style={{ color: "#c084fc", fontWeight: 600 }}>full-stack development</span>.
                <br />
                Building intelligent, scalable solutions with modern tech stacks.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {[
                  "3 production internships in Full-Stack & AI/ML",
                  "13+ professional certifications (Google, IBM, AWS)",
                  "Expertise in MERN stack & TensorFlow",
                  "Building real-world ML & web applications",
                ].map((item, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "1rem",
                      color: "#94a3b8",
                      opacity: isVisible ? 1 : 0,
                      transform: isVisible ? "translateX(0)" : "translateX(-40px)",
                      transition: `all 0.9s cubic-bezier(0.4, 0, 0.2, 1) ${i * 0.2 + 0.5}s`,
                    }}
                  >
                    <Zap size={24} style={{ color: "#22d3ee", marginTop: "0.25rem" }} />
                    <span style={{ fontSize: "1.1rem" }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "1.2rem" }}>
              {techStack.map((tech, i) => {
                const [start, end] = tech.color.split(" to-").map((s) => s.replace("from-", "").replace("to-", ""));
                return (
                  <div
                    key={i}
                    style={{
                      position: "relative",
                      opacity: isVisible ? 1 : 0,
                      transform: isVisible ? "scale(1)" : "scale(0.6)",
                      transition: `all 0.7s cubic-bezier(0.4, 0, 0.2, 1) ${i * 0.1 + 0.7}s`,
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        inset: "-0.25rem",
                        background: `linear-gradient(to right, ${start}, ${end})`,
                        borderRadius: "1rem",
                        filter: "blur(8px)",
                        opacity: 0,
                        transition: "opacity 0.5s",
                      }}
                      className="group-hover:opacity-75"
                    />
                    <div
                      style={{
                        position: "relative",
                        padding: "0.8rem 1.5rem",
                        backgroundColor: "rgba(15, 23, 42, 0.9)",
                        border: "1px solid rgba(51, 65, 85, 0.7)",
                        borderRadius: "1rem",
                        backdropFilter: "blur(12px)",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.7rem",
                        transition: "all 0.5s",
                      }}
                      className="group-hover:scale-115 group-hover:shadow-xl"
                    >
                      <tech.icon size={20} style={{ color: "#94a3b8" }} />
                      <span style={{ fontSize: "1rem", fontWeight: 600, color: "#cbd5e1" }}>{tech.label}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem" }}>
              {stats.map((stat, i) => (
                <div
                  key={i}
                  style={{
                    position: "relative",
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? "translateY(0)" : "translateY(40px)",
                    transition: `all 0.9s cubic-bezier(0.4, 0, 0.2, 1) ${i * 0.2 + 0.9}s`,
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      inset: "-0.25rem",
                      background: "linear-gradient(to right, #3b82f6, #22d3ee)",
                      borderRadius: "1.25rem",
                      filter: "blur(12px)",
                      opacity: 0,
                      transition: "opacity 0.5s",
                    }}
                    className="group-hover:opacity-85"
                  />
                  <div
                    style={{
                      position: "relative",
                      padding: "1.75rem",
                      backgroundColor: "rgba(15, 23, 42, 0.9)",
                      border: "1px solid rgba(51, 65, 85, 0.7)",
                      borderRadius: "1.25rem",
                      backdropFilter: "blur(12px)",
                      transition: "all 0.5s",
                    }}
                    className="group-hover:border-cyan-400/70 group-hover:scale-110"
                  >
                    <stat.icon size={32} style={{ color: "#22d3ee", marginBottom: "1rem" }} />
                    <div style={{ fontSize: "2.25rem", fontWeight: 900, color: "white", marginBottom: "0.4rem" }}>{stat.value}</div>
                    <div
                      style={{
                        fontSize: "0.9rem",
                        fontWeight: 600,
                        color: "#94a3b8",
                        textTransform: "uppercase",
                        letterSpacing: "0.07em",
                      }}
                    >
                      {stat.label}
                    </div>
                    <div style={{ fontSize: "0.85rem", color: "#64748b", marginTop: "0.4rem" }}>{stat.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", "@media (min-width: 640px)": { flexDirection: "row" } }}>
              <button
                onClick={handleViewProjects}
                style={{
                  position: "relative",
                  padding: "1.4rem 3rem",
                  borderRadius: "1.25rem",
                  overflow: "hidden",
                  background: "linear-gradient(to right, #2563eb, #06b6d4)",
                  color: "white",
                  fontWeight: 700,
                  fontSize: "1.2rem",
                  boxShadow: "0 20px 40px -10px rgba(6,182,212,0.5)",
                  transition: "all 0.5s",
                  cursor: "pointer",
                }}
                className="hover:from-blue-500 hover:to-cyan-500 hover:shadow-cyan-700/60 hover:scale-105 hover:translate-y-[-3px]"
              >
                <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem" }}>
                  <Rocket size={24} />
                  View Projects
                  <ExternalLink size={20} />
                </div>
              </button>

              <button
                onClick={handleDownloadResume}
                style={{
                  padding: "1.4rem 3rem",
                  borderRadius: "1.25rem",
                  border: "2px solid #475569",
                  backgroundColor: "rgba(15, 23, 42, 0.7)",
                  backdropFilter: "blur(14px)",
                  color: "white",
                  fontWeight: 700,
                  fontSize: "1.2rem",
                  transition: "all 0.5s",
                  cursor: "pointer",
                }}
                className="hover:border-cyan-400 hover:bg-slate-800/70 hover:scale-105 hover:translate-y-[-3px]"
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem" }}>
                  Download Resume
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                  </svg>
                </div>
              </button>
            </div>

            {/* Social Links */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "2.5rem" }}>
              {links.map((link, i) => (
                <a
                  key={i}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                    color: "#94a3b8",
                    transition: "all 0.5s",
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? "translateY(0)" : "translateY(30px)",
                    transitionDelay: `${i * 0.15 + 1.4}s`,
                  }}
                  className={link.color}
                >
                  <link.icon size={28} className="group-hover:scale-130 transition-transform" />
                  <span style={{ fontSize: "1.1rem", fontWeight: 500 }}>{link.label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Global Keyframes */}
      <style jsx global>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(80px, -100px) scale(1.2); }
          66% { transform: translate(-70px, 80px) scale(0.9); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-30px); }
        }
        @keyframes floatBadge {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(4deg); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 1; }
        }
        @keyframes ping {
          75%, 100% { transform: scale(3); opacity: 0; }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}