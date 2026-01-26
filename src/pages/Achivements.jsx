"use client";
import { useState, useEffect, useRef } from "react";
import {
  Trophy, Award, Users, Target, TrendingUp, Zap, Star, Medal,
  Sparkles, X, CheckCircle2, Rocket, Brain, Code2, Flame,
  Crown, Globe, Cpu, Database, Lock, GitBranch, Terminal,
  Download, ExternalLink, Share2, Heart, Eye, Clock,
  ArrowRight, ChevronRight, BadgeCheck, ShieldCheck,
  Code, Server, Layers, GitPullRequest, GitCommit,
  Cpu as CpuIcon, Database as DatabaseIcon, Lock as LockIcon
} from "lucide-react";

const achievements = [
  {
    id: 1,
    category: "Competition",
    icon: Trophy,
    title: "National Hackathon Champion",
    subtitle: "Brainovision National Talent Hunt 2024",
    rank: "1st Place",
    description: "Led full-stack development in a 24-hour national championship. Built a production-grade MERN electronics marketplace with real-time chat (Socket.io), JWT fortress security, role-based access control, and optimized deployment.",
    highlights: [
      "Designed complete system architecture & MongoDB schemas",
      "Implemented 20+ secure REST APIs & WebSocket features",
      "Delivered responsive React frontend with Redux state management",
      "Achieved 100% uptime during live demo under extreme pressure"
    ],
    impact: [
      "Won ₹50,000 cash prize + national recognition",
      "Selected for top industry mentorship program"
    ],
    tech: ["React", "Node.js", "Express", "MongoDB", "Socket.io", "JWT", "Redux"],
    color: "#00f0ff",
    rarity: "Legendary",
    year: "2024",
    certificate: true
  },
  {
    id: 2,
    category: "Certification",
    icon: Award,
    title: "15+ Industry Certifications",
    subtitle: "Elite Developer Credential Stack",
    rank: "Multiple Specializations",
    description: "Mastered cutting-edge technologies through rigorous professional certifications from leading platforms and organizations.",
    highlights: [
      "Generative AI & Large Language Models",
      "Advanced Machine Learning & Deep Learning",
      "Full-Stack Web Development (MERN)",
      "Cloud Computing (AWS & Azure)",
      "DevOps & CI/CD Pipelines",
      "Data Structures & Algorithms Mastery"
    ],
    impact: [
      "Recognized by top 1% of certified developers globally",
      "Directly applied knowledge in production-grade projects"
    ],
    tech: ["Python", "TensorFlow", "PyTorch", "AWS", "Docker", "Kubernetes", "Git"],
    color: "#a78bfa",
    rarity: "Legendary",
    year: "2023–2025"
  },
  {
    id: 3,
    category: "Production",
    icon: Rocket,
    title: "8+ End-to-End Production Projects",
    subtitle: "Real-World Impact Delivered",
    rank: "Full Ownership",
    description: "Architected, developed, and successfully deployed 8+ complete full-stack & AI/ML projects from concept to production.",
    highlights: [
      "Secure authentication systems with JWT & OAuth 2.0",
      "Scalable REST & GraphQL APIs with rate limiting & caching",
      "Real-time features using WebSockets & Server-Sent Events",
      "CI/CD pipelines with GitHub Actions & Docker",
      "Performance optimization (Lighthouse 95+ scores)"
    ],
    impact: [
      "Used by 5000+ users across multiple platforms",
      "Zero critical security vulnerabilities in production"
    ],
    tech: ["React", "Next.js", "Node.js", "TypeScript", "PostgreSQL", "MongoDB", "AWS"],
    color: "#ff61d2",
    rarity: "Epic",
    year: "2023–2025"
  },
  {
    id: 4,
    category: "Open Source",
    icon: GitPullRequest,
    title: "Active Open Source Contributor",
    subtitle: "GitHub Impact & Community",
    rank: "Consistent Contributor",
    description: "Regularly contribute to open-source projects, create developer tools, and maintain popular repositories.",
    highlights: [
      "Created 5+ developer productivity tools (10k+ downloads)",
      "Contributed to major libraries & frameworks",
      "Maintained 3 repositories with 2k+ stars collectively",
      "Active in GitHub Discussions & Issues"
    ],
    impact: [
      "Helped 5000+ developers worldwide",
      "Featured in GitHub trending repositories"
    ],
    tech: ["TypeScript", "React", "Node.js", "Rust", "Go"],
    color: "#00ff88",
    rarity: "Epic",
    year: "2024–2025"
  }
];

const metrics = [
  { label: "Production Projects", value: "8+", icon: Rocket, color: "#00f0ff" },
  { label: "Technologies Mastered", value: "35+", icon: CpuIcon, color: "#a78bfa" },
  { label: "Total Lines of Code", value: "25K+", icon: Code2, color: "#ff61d2" },
  { label: "GitHub Stars", value: "2.1K+", icon: Star, color: "#ffd700" },
  { label: "Hackathon Wins", value: "3", icon: Trophy, color: "#00ff88" },
  { label: "Certifications", value: "15+", icon: Award, color: "#ff9500" }
];

export default function EliteAchievements() {
  const [hoveredId, setHoveredId] = useState(null);
  const [activeAchievement, setActiveAchievement] = useState(null);
  const [activeMetric, setActiveMetric] = useState(null);
  const [showCertificate, setShowCertificate] = useState(false);
  const canvasRef = useRef(null);

  // ─── BACKGROUND PARTICLES ────────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    const particles = Array.from({ length: 80 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 2.5 + 1,
      life: Math.random() * 0.8 + 0.2
    }));

    const animate = () => {
      ctx.fillStyle = 'rgba(0,0,0,0.09)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.0008;

        if (p.life <= 0 || p.x < 0 || p.x > canvas.width || p.y < 0 || p.y > canvas.height) {
          p.x = Math.random() * canvas.width;
          p.y = Math.random() * canvas.height;
          p.vx = (Math.random() - 0.5) * 0.5;
          p.vy = (Math.random() - 0.5) * 0.5;
          p.life = Math.random() * 0.8 + 0.2;
        }

        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 6);
        gradient.addColorStop(0, 'rgba(0, 240, 255, 0.4)');
        gradient.addColorStop(0.5, 'rgba(167, 139, 250, 0.2)');
        gradient.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 6, 0, Math.PI * 2);
        ctx.fill();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();
    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  const handleCertificateDownload = () => {
    const link = document.createElement("a");
    link.href = "/assets/images/Brainovision-certificate.jpg";
    link.download = "Brainovision-National-Championship-Certificate-2024.jpg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Fira+Code:wght@400;500;600;700&display=swap');

        :root {
          --neon-cyan: #00f0ff;
          --neon-purple: #a78bfa;
          --neon-pink: #ff61d2;
          --neon-gold: #ffd700;
          --neon-green: #00ff88;
          --neon-gradient: linear-gradient(135deg, #00f0ff, #a78bfa, #ff61d2, #ffd700);
          --neon-glow: 0 0 35px rgba(0, 240, 255, 0.8);
        }

        * { margin: 0; padding: 0; box-sizing: border-box; }

        @keyframes slideIn { from { opacity:0; transform:translateY(60px); } to { opacity:1; transform:translateY(0); } }
        @keyframes scan { 0% { transform:translateY(-100%); } 100% { transform:translateY(100%); } }
        @keyframes float { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-12px); } }
        @keyframes pulse { 0%,100% { opacity:1; transform:scale(1); } 50% { opacity:0.8; transform:scale(1.05); } }
        @keyframes glitch { 0%,100% { transform:translate(0); } 20% { transform:translate(-2px,2px); } 40% { transform:translate(2px,-2px); } }

        .achieve-card {
          position: relative;
          background: rgba(8,8,22,0.94);
          border: 2px solid rgba(0,240,255,0.35);
          border-radius: 24px;
          overflow: hidden;
          transition: all 0.6s cubic-bezier(0.23,1,0.32,1);
          backdrop-filter: blur(8px);
        }

        .achieve-card:hover {
          transform: translateY(-20px) scale(1.04);
          border-color: var(--neon-cyan);
          box-shadow: var(--neon-glow), 0 25px 70px rgba(0,0,0,0.5);
        }

        .achieve-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, transparent 30%, rgba(0,240,255,0.18) 50%, transparent 70%);
          animation: scan 8s linear infinite;
          pointer-events: none;
          z-index: 1;
        }

        .metric-pill {
          background: rgba(0,0,0,0.8);
          border: 2px solid var(--neon-cyan);
          padding: 0.8rem 1.4rem;
          border-radius: 999px;
          font-family: 'Fira Code',monospace;
          font-size: 0.95rem;
          transition: all 0.4s;
          color: #e0f7ff;
          backdrop-filter: blur(8px);
        }

        .metric-pill:hover {
          transform: scale(1.08) translateY(-3px);
          box-shadow: 0 0 30px var(--neon-cyan);
          background: rgba(0,240,255,0.12);
        }

        .neon-title {
          background: var(--neon-gradient);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 4s infinite linear;
          background-size: 200% 200%;
        }

        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }

        .certificate-preview {
          width: 100%;
          max-width: 900px;
          border-radius: 20px;
          border: 4px solid var(--neon-cyan);
          box-shadow: 0 0 60px rgba(0,240,255,0.6);
          transition: all 0.4s;
          cursor: pointer;
        }

        .certificate-preview:hover {
          transform: scale(1.03);
          box-shadow: 0 0 90px rgba(0,240,255,0.8);
        }

        /* ─── RESPONSIVE ──────────────────────────────────────────────── */
        @media (max-width: 1024px) {
          .achieve-grid { grid-template-columns: repeat(auto-fit, minmax(340px, 1fr)) !important; }
        }
        @media (max-width: 768px) {
          .achieve-grid { grid-template-columns: 1fr !important; gap: 3.5rem !important; }
          h1.neon-title { font-size: clamp(3.5rem, 11vw, 5.8rem) !important; }
        }
        @media (max-width: 480px) {
          .metric-pill { padding: 0.6rem 1.2rem; font-size: 0.85rem; }
        }
      `}</style>

      <div style={{
        minHeight: '100vh',
        background: '#000000',
        color: '#e0e0ff',
        position: 'relative',
        overflow: 'hidden',
        padding: 'clamp(6rem, 12vw, 10rem) 1.5rem 8rem',
        fontFamily: "'Outfit', sans-serif"
      }}>
        {/* Grid overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(0,240,255,0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,240,255,0.08) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          opacity: 0.25,
          pointerEvents: 'none'
        }} />

        {/* Particles */}
        <canvas
          ref={canvasRef}
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            zIndex: 1
          }}
        />

        <div style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: '1700px',
          margin: '0 auto'
        }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: 'clamp(5rem, 12vw, 9rem)' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '1rem',
              padding: '0.9rem 2rem',
              background: 'rgba(0,240,255,0.12)',
              border: '2.5px solid rgba(0,240,255,0.5)',
              borderRadius: '999px',
              marginBottom: '2rem',
              animation: 'pulse 4s infinite',
              backdropFilter: 'blur(8px)'
            }}>
              <Code2 size={28} color="#ffd700" />
              <span style={{ fontFamily: "'Fira Code', monospace", fontSize: '1.1rem', fontWeight: 700 }}>
                ELITE ACHIEVEMENT LOG — 2026
              </span>
              <Crown size={28} color="#ffd700" />
            </div>

            <h1 className="neon-title" style={{
              fontSize: 'clamp(4.5rem, 12vw, 9rem)',
              fontWeight: 900,
              letterSpacing: '6px',
              textTransform: 'uppercase',
              marginBottom: '1.5rem',
              lineHeight: 1.1,
              animation: 'glitch 6s infinite'
            }}>
              My Achivements
            </h1>

            <p style={{
              fontSize: 'clamp(1.3rem, 3.5vw, 1.6rem)',
              color: '#b0b0d8',
              maxWidth: '900px',
              margin: '0 auto 3rem',
              fontFamily: "'Fira Code', monospace",
              lineHeight: 1.9
            }}>
              Where code meets impact.<br/>
              National championships • Elite certifications • Production-grade delivery
            </p>
          </div>

          {/* Metrics Showcase */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '2rem',
            marginBottom: '8rem'
          }}>
            {metrics.map((metric, i) => {
              const isActive = activeMetric === i;
              return (
                <div
                  key={i}
                  onMouseEnter={() => setActiveMetric(i)}
                  onMouseLeave={() => setActiveMetric(null)}
                  style={{
                    padding: '2.2rem 1.5rem',
                    background: 'rgba(0,0,0,0.7)',
                    border: `2.5px solid ${metric.color}40`,
                    borderRadius: '20px',
                    textAlign: 'center',
                    transition: 'all 0.4s',
                    transform: isActive ? 'translateY(-12px) scale(1.05)' : 'scale(1)',
                    boxShadow: isActive ? `0 0 60px ${metric.color}70` : 'none'
                  }}
                >
                  <metric.icon size={48} style={{ color: metric.color, marginBottom: '1.2rem' }} />
                  <div style={{
                    fontSize: 'clamp(2.2rem, 5vw, 3.2rem)',
                    fontWeight: 900,
                    color: metric.color,
                    marginBottom: '0.6rem'
                  }}>
                    {metric.value}
                  </div>
                  <div style={{
                    color: '#c0c0e0',
                    fontSize: '1.1rem',
                    fontWeight: 600
                  }}>
                    {metric.label}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Achievements Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))',
            gap: 'clamp(2.5rem, 5vw, 4rem)',
            marginBottom: '8rem'
          }}>
            {achievements.map((ach) => {
              const isHovered = hoveredId === ach.id;
              return (
                <div
                  key={ach.id}
                  className="achieve-card"
                  onMouseEnter={() => setHoveredId(ach.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onClick={() => setActiveAchievement(ach)}
                  style={{
                    cursor: 'pointer',
                    animation: `slideIn ${ach.id * 0.15}s ease-out`
                  }}
                >
                  <div style={{
                    height: 'clamp(220px, 50vw, 280px)',
                    background: `linear-gradient(135deg, ${ach.color}20, transparent)`,
                    position: 'relative',
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <div style={{
                      width: '160px',
                      height: '160px',
                      border: `4px solid ${ach.color}`,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      animation: isHovered ? 'float 3.5s ease-in-out infinite' : 'none',
                      boxShadow: isHovered ? `0 0 70px ${ach.color}` : 'none',
                      transform: isHovered ? 'scale(1.15)' : 'scale(1)'
                    }}>
                      <ach.icon size={80} color={ach.color} />
                    </div>

                    <div style={{
                      position: 'absolute',
                      top: '1.5rem',
                      right: '1.5rem',
                      padding: '0.6rem 1.4rem',
                      background: `${ach.color}20`,
                      border: `2px solid ${ach.color}`,
                      borderRadius: '999px',
                      fontSize: '0.95rem',
                      fontWeight: 700,
                      color: ach.color,
                      backdropFilter: 'blur(8px)'
                    }}>
                      {ach.rarity}
                    </div>
                  </div>

                  <div style={{ padding: '2.5rem 2rem' }}>
                    <div style={{
                      fontSize: '1rem',
                      color: ach.color,
                      fontFamily: "'Fira Code', monospace",
                      marginBottom: '0.8rem',
                      fontWeight: 600
                    }}>
                      {ach.category} • {ach.year}
                    </div>

                    <h3 style={{
                      fontSize: 'clamp(1.8rem, 4.5vw, 2.2rem)',
                      fontWeight: 900,
                      color: '#ffffff',
                      marginBottom: '1rem'
                    }}>
                      {ach.title}
                    </h3>

                    <div style={{
                      fontSize: '1.35rem',
                      fontWeight: 700,
                      color: ach.color,
                      marginBottom: '1.6rem',
                      textAlign: 'center'
                    }}>
                      {ach.subtitle}
                    </div>

                    <p style={{
                      fontSize: '1.05rem',
                      color: '#d0d0ff',
                      lineHeight: 1.7,
                      marginBottom: '2rem',
                      fontFamily: "'Fira Code', monospace"
                    }}>
                      {ach.description}
                    </p>

                    <div style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '0.8rem',
                      marginBottom: '2rem',
                      justifyContent: 'center'
                    }}>
                      {ach.tech.map((t, idx) => (
                        <div key={idx} style={{
                          padding: '0.6rem 1.2rem',
                          background: `${ach.color}15`,
                          border: `1px solid ${ach.color}40`,
                          borderRadius: '12px',
                          fontSize: '0.9rem',
                          color: ach.color,
                          fontFamily: "'Fira Code', monospace"
                        }}>
                          {t}
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={() => setActiveAchievement(ach)}
                      style={{
                        width: '100%',
                        padding: '1.2rem',
                        background: `linear-gradient(90deg, ${ach.color}, #ffffff)`,
                        color: '#000',
                        fontWeight: 900,
                        border: 'none',
                        borderRadius: '999px',
                        fontSize: '1.1rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '1rem',
                        boxShadow: `0 0 40px ${ach.color}60`
                      }}
                    >
                      <Sparkles size={24} />
                      View Full Achievement
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Certificate Preview Card */}
          <div style={{
            margin: '6rem auto',
            maxWidth: '1000px',
            padding: '3rem 2rem',
            background: 'rgba(0,0,0,0.75)',
            border: '3px solid var(--neon-cyan)',
            borderRadius: '28px',
            boxShadow: '0 0 80px rgba(0,240,255,0.5)',
            textAlign: 'center'
          }}>
            <h2 style={{
              fontSize: 'clamp(2.5rem, 6vw, 4rem)',
              fontWeight: 900,
              color: 'var(--neon-cyan)',
              marginBottom: '2rem'
            }}>
              NATIONAL CHAMPIONSHIP CERTIFICATE
            </h2>

            <div
              style={{
                cursor: 'pointer',
                transition: 'all 0.4s'
              }}
              onClick={() => setShowCertificate(true)}
            >
              <img
                src="/assets/images/Brainovision-certificate.jpg"
                alt="National Championship Certificate"
                className="certificate-preview"
                style={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: '16px'
                }}
              />
            </div>

            <p style={{
              marginTop: '2rem',
              fontSize: '1.2rem',
              color: '#b0b0d8'
            }}>
              Click to view full certificate • Download available
            </p>

            <button
              onClick={handleCertificateDownload}
              style={{
                marginTop: '2.5rem',
                padding: '1.2rem 3rem',
                background: 'var(--neon-gradient)',
                border: 'none',
                borderRadius: '999px',
                color: '#000',
                fontWeight: 900,
                fontSize: '1.2rem',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '1rem',
                boxShadow: '0 0 50px rgba(0,240,255,0.7)'
              }}
            >
              <Download size={28} />
              DOWNLOAD CERTIFICATE
            </button>
          </div>

          {/* Final CTA */}
          <div style={{
            padding: 'clamp(5rem, 10vw, 7rem) 2rem',
            background: 'rgba(0,0,0,0.8)',
            border: '3px solid rgba(0,240,255,0.4)',
            borderRadius: '32px',
            textAlign: 'center'
          }}>
            <h2 style={{
              fontSize: 'clamp(3rem, 7vw, 5rem)',
              fontWeight: 900,
              background: 'var(--neon-gradient)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '2rem'
            }}>
              READY TO BUILD LEGACY?
            </h2>

            <p style={{
              fontSize: '1.3rem',
              color: '#b0b0d8',
              maxWidth: '800px',
              margin: '0 auto 3rem',
              lineHeight: 1.8
            }}>
              Let's create something extraordinary together — from vision to production-grade reality.
            </p>

            <div style={{
              display: 'flex',
              gap: '2.5rem',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              <a
                href="https://github.com/bhagavan444"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  padding: '1.4rem 3.5rem',
                  background: 'rgba(0,240,255,0.15)',
                  border: '3px solid var(--neon-cyan)',
                  borderRadius: '999px',
                  color: 'var(--neon-cyan)',
                  fontWeight: 900,
                  fontSize: '1.3rem',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1.2rem'
                }}
              >
                <Code2 size={32} />
                EXPLORE PROJECTS
              </a>

              <a
                href="https://linkedin.com/in/your-profile"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  padding: '1.4rem 3.5rem',
                  background: 'var(--neon-gradient)',
                  borderRadius: '999px',
                  color: '#000',
                  fontWeight: 900,
                  fontSize: '1.3rem',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1.2rem',
                  boxShadow: '0 0 50px rgba(0,240,255,0.7)'
                }}
              >
                <Users size={32} />
                CONNECT & COLLABORATE
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Full Certificate Modal */}
      {showCertificate && (
        <div
          onClick={() => setShowCertificate(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.96)',
            backdropFilter: 'blur(25px)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem'
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              position: 'relative',
              maxWidth: '95vw',
              maxHeight: '95vh',
              border: '5px solid var(--neon-cyan)',
              borderRadius: '28px',
              overflow: 'hidden',
              boxShadow: '0 0 120px rgba(0,240,255,0.8)'
            }}
          >
            <button
              onClick={() => setShowCertificate(false)}
              style={{
                position: 'absolute',
                top: '1.8rem',
                right: '1.8rem',
                background: 'rgba(255,80,80,0.4)',
                border: 'none',
                borderRadius: '50%',
                width: '65px',
                height: '65px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                cursor: 'pointer',
                zIndex: 10,
                transition: 'all 0.3s'
              }}
            >
              <X size={36} strokeWidth={3} />
            </button>

            <img
              src="/assets/images/Brainovision-certificate.jpg"
              alt="National Championship Certificate"
              style={{
                width: '100%',
                height: 'auto',
                display: 'block'
              }}
            />

            <div style={{
              position: 'absolute',
              bottom: '2rem',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              gap: '2.5rem'
            }}>
              <button
                onClick={handleCertificateDownload}
                style={{
                  padding: '1.2rem 3rem',
                  background: 'var(--neon-gradient)',
                  border: 'none',
                  borderRadius: '999px',
                  color: '#000',
                  fontWeight: 900,
                  fontSize: '1.2rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  boxShadow: '0 0 60px rgba(0,240,255,0.8)'
                }}
              >
                <Download size={28} />
                Download Certificate
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Achievement Detail Modal */}
      {activeAchievement && (
        <div
          onClick={() => setActiveAchievement(null)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.96)',
            backdropFilter: 'blur(25px)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem'
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: 'rgba(8,8,22,0.98)',
              border: `5px solid ${activeAchievement.color}`,
              borderRadius: '32px',
              maxWidth: '1200px',
              width: '96%',
              maxHeight: '92vh',
              overflowY: 'auto',
              boxShadow: `0 0 160px ${activeAchievement.color}80`,
              position: 'relative'
            }}
          >
            <button
              onClick={() => setActiveAchievement(null)}
              style={{
                position: 'absolute',
                top: '1.8rem',
                right: '1.8rem',
                background: 'rgba(255,80,80,0.4)',
                border: 'none',
                borderRadius: '50%',
                width: '65px',
                height: '65px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                cursor: 'pointer',
                zIndex: 10
              }}
            >
              <X size={36} strokeWidth={3} />
            </button>

            <div style={{
              padding: 'clamp(3rem, 6vw, 5rem) clamp(2rem, 5vw, 4rem) 6rem'
            }}>
              <div style={{
                textAlign: 'center',
                marginBottom: '4rem'
              }}>
                <div style={{
                  width: '180px',
                  height: '180px',
                  margin: '0 auto 2rem',
                  border: `5px solid ${activeAchievement.color}`,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: `${activeAchievement.color}20`,
                  boxShadow: `0 0 80px ${activeAchievement.color}`
                }}>
                  <activeAchievement.icon size={90} color={activeAchievement.color} />
                </div>

                <div style={{
                  fontSize: '1.6rem',
                  color: activeAchievement.color,
                  fontWeight: 700,
                  marginBottom: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '1.2rem'
                }}>
                  <Star size={32} fill={activeAchievement.rarity === "Legendary" ? "#ffd700" : activeAchievement.color} />
                  {activeAchievement.rarity} • {activeAchievement.category}
                </div>

                <h2 style={{
                  fontSize: 'clamp(3rem, 7vw, 5rem)',
                  fontWeight: 900,
                  background: `linear-gradient(135deg, ${activeAchievement.color}, #ffffff)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  marginBottom: '1.5rem'
                }}>
                  {activeAchievement.title}
                </h2>

                <div style={{
                  fontSize: '1.8rem',
                  fontWeight: 800,
                  color: activeAchievement.color,
                  marginBottom: '2rem'
                }}>
                  {activeAchievement.subtitle} — {activeAchievement.rank}
                </div>

                <p style={{
                  fontSize: '1.3rem',
                  color: '#d0d0ff',
                  maxWidth: '900px',
                  margin: '0 auto 2.5rem',
                  lineHeight: 1.8
                }}>
                  {activeAchievement.description}
                </p>
              </div>

              {/* Highlights */}
              <div style={{ marginBottom: '4rem' }}>
                <h3 style={{
                  fontSize: '2.2rem',
                  color: activeAchievement.color,
                  marginBottom: '2rem',
                  textAlign: 'center'
                }}>
                  Key Highlights
                </h3>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                  gap: '1.5rem'
                }}>
                  {activeAchievement.highlights.map((highlight, idx) => (
                    <div key={idx} style={{
                      padding: '1.6rem',
                      background: `${activeAchievement.color}15`,
                      border: `1px solid ${activeAchievement.color}40`,
                      borderRadius: '20px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1.2rem'
                    }}>
                      <CheckCircle2 size={28} style={{ color: activeAchievement.color }} />
                      <span style={{ color: '#e0e0ff', fontSize: '1.1rem' }}>{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech Stack */}
              <div style={{ marginBottom: '4rem' }}>
                <h3 style={{
                  fontSize: '2.2rem',
                  color: activeAchievement.color,
                  marginBottom: '2rem',
                  textAlign: 'center'
                }}>
                  Technology Arsenal
                </h3>
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '1.2rem',
                  justifyContent: 'center'
                }}>
                  {activeAchievement.tech.map((tech, idx) => (
                    <div key={idx} style={{
                      padding: '0.9rem 1.8rem',
                      background: `${activeAchievement.color}20`,
                      border: `2px solid ${activeAchievement.color}50`,
                      borderRadius: '999px',
                      color: activeAchievement.color,
                      fontWeight: 700,
                      fontSize: '1.1rem'
                    }}>
                      {tech}
                    </div>
                  ))}
                </div>
              </div>

              {/* Impact */}
              <div style={{ marginBottom: '4rem' }}>
                <h3 style={{
                  fontSize: '2.2rem',
                  color: activeAchievement.color,
                  marginBottom: '2rem',
                  textAlign: 'center'
                }}>
                  Real-World Impact
                </h3>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                  gap: '1.5rem'
                }}>
                  {activeAchievement.impact.map((item, idx) => (
                    <div key={idx} style={{
                      padding: '1.6rem',
                      background: 'rgba(0,0,0,0.6)',
                      border: `2px solid ${activeAchievement.color}50`,
                      borderRadius: '20px',
                      textAlign: 'center'
                    }}>
                      <div style={{
                        fontSize: '1.5rem',
                        fontWeight: 800,
                        color: activeAchievement.color,
                        marginBottom: '0.8rem'
                      }}>
                        {item}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Close Button */}
              <div style={{
                textAlign: 'center',
                marginTop: '5rem'
              }}>
                <button
                  onClick={() => setActiveAchievement(null)}
                  style={{
                    padding: '1.4rem 4rem',
                    background: 'rgba(255,80,80,0.3)',
                    border: '2.5px solid #ff6666',
                    borderRadius: '999px',
                    color: '#ff6666',
                    fontWeight: 900,
                    fontSize: '1.3rem',
                    cursor: 'pointer',
                    transition: 'all 0.3s'
                  }}
                >
                  Close Achievement
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}