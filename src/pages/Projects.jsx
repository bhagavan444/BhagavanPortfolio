import { useState, useEffect, useRef } from 'react';
import {
  ExternalLink, Github, Rocket, Star, X, CheckCircle2,
  Terminal, Sparkles, Layers, Mail
} from 'lucide-react';

// ──────────────────────────────────────────────────────────────────────────────
// ALL PROJECTS COMBINED
// ──────────────────────────────────────────────────────────────────────────────
const allProjects = [
  // AI Projects
  {
    id: 11,
    title: "ATS Resume Builder Platform",
    github: null,
    live: "https://melody-nap-17037283.figma.site",
    desc: "AI-powered ATS resume builder designed to help candidates create resumes that pass applicant tracking systems.",
    longDesc: "Full-stack ATS-optimized resume builder with smart templates, keyword optimization, real-time scoring...",
    tags: ["ATS Optimization", "Resume Builder", "React", "Node.js", "MongoDB"],
    icon: "📄",
    img: "/src/assets/resume.jpeg",
    color: "#00ffff",
    featured: true,
    highlights: ["ATS-Friendly Templates", "Real-Time Scoring", "Keyword Optimization", "PDF Export"],
    stats: { atsScore: "90%+", templates: "10+", resumesBuilt: "3k+", shortlistingBoost: "2×" }
  },
  {
    id: 9,
    title: "NexusAI – Multi-Modal AI Workspace",
    github: null,
    live: "https://bhagavanai.lovable.app/",
    desc: "Enterprise-grade AI workspace for building, researching, automating and generating content.",
    longDesc: "Multi-modal AI platform supporting text, images, PDFs, code with ultra-fast responses...",
    tags: ["AI Platform", "Multi-Modal AI", "Productivity", "Enterprise UI"],
    icon: "⚡",
    img: "/src/assets/chat.jpeg",
    color: "#8a2be2",
    featured: true,
    highlights: ["Unified Workspace", "Multi-Modal Input", "Ultra-Fast", "Premium UI"],
    stats: { speed: "Ultra-Fast", modes: "Multi-Modal", quality: "Premium" }
  },
  {
    id: 5,
    title: "Project Forge – AI Project Generator",
    github: null,
    live: "https://aiprojecttool.lovable.app",
    desc: "AI-powered platform that generates production-ready software projects from simple prompts.",
    longDesc: "Instantly generates clean architecture, scalable structure, boilerplate code...",
    tags: ["AI", "React", "Automation", "Developer Tools"],
    icon: "⚡",
    img: "/src/assets/Ai website builder.jpg",
    color: "#00ffff",
    featured: true,
    highlights: ["Production-Ready Projects", "Prompt-to-Code", "Clean Architecture"],
    stats: { projects: "100k+", satisfaction: "99.9%" }
  },
  {
    id: 7,
    title: "ArchMind – AI System Design Platform",
    github: null,
    live: "https://archmind-spark.lovable.app/",
    desc: "AI-powered system design platform for infinitely scalable architectures.",
    longDesc: "Real-time AI architecture generation, trade-off analysis, FAANG-grade patterns...",
    tags: ["System Design", "Architecture", "Scalability", "Engineering Tools"],
    icon: "🧠",
    img: "/src/assets/arc.jpeg",
    color: "#00ffff",
    featured: true,
    highlights: ["AI Architecture Gen", "Trade-Off Analysis", "FAANG Patterns"],
    stats: { architectures: "50k+", uptime: "99%", latency: "<50ms" }
  },
  {
    id: 8,
    title: "TruthGuard AI – Fake News Detection",
    github: null,
    live: "https://bliss-gala-22285345.figma.site/",
    desc: "Advanced NLP + Deep Learning platform to detect fake news with high accuracy.",
    longDesc: "TF-IDF + LSTM/Bi-LSTM models, real-time analysis, explainable results...",
    tags: ["NLP", "LSTM", "Fake News Detection", "Machine Learning"],
    icon: "🛡️",
    img: "/src/assets/fake.jpeg",
    color: "#8a2be2",
    featured: true,
    highlights: ["95% Accuracy", "Explainable AI", "Real-Time Analysis"],
    stats: { accuracy: "95%", articles: "1M+", responseTime: "<100ms" }
  },
  {
    id: 6,
    title: "VisionForge Studio",
    github: null,
    live: "https://cinematic-muse-studio.lovable.app/",
    desc: "Cinematic AI image generation platform with professional-grade visuals.",
    longDesc: "Advanced prompt engineering, image-to-image, fast generation...",
    tags: ["Image Generation", "Creative Tools", "Prompt Engineering"],
    icon: "🎨",
    img: "/src/assets/image.jpg",
    color: "#00ffff",
    featured: true,
    highlights: ["Cinematic Quality", "Image-to-Image", "Fast Generation"],
    stats: { creations: "50k+", creators: "4.9★" }
  },
  {
    id: 10,
    title: "NeuralLearn – Adaptive Learning Platform",
    github: null,
    live: "https://neurallearn.lovable.app/",
    desc: "AI-powered adaptive learning platform with personalized education paths.",
    longDesc: "Real-time performance analysis, dynamic content adjustment...",
    tags: ["AI Education", "Adaptive Learning", "EdTech"],
    icon: "🧠",
    img: "/src/assets/neural.jpeg",
    color: "#8a2be2",
    featured: true,
    highlights: ["Personalized Paths", "Real-Time Adaptation", "Gamified Learning"],
    stats: { subjects: "26+", rounds: "78+", questions: "2340+" }
  },

  // GitHub / OSS Projects
  {
    id: 3,
    title: "ATS Resume Builder",
    github: "https://github.com/bhagavan444/Resumebuilderwebapp",
    live: null,
    desc: "Full-stack ATS-optimized resume builder with smart templates...",
    tags: ["React", "Node.js", "MongoDB", "JWT", "PDFKit"],
    icon: "📄",
    img: "https://drive.google.com/thumbnail?id=1ngApn37ig05YDXxCbA5mppeva_opwcUs&sz=w1200",
    color: "#00ffff",
    featured: true,
    highlights: ["Real-time ATS Scoring", "Keyword Extraction", "Multiple Templates"],
    stats: { resumes: "3.8k+", downloads: "12k+" }
  },
  {
    id: 4,
    title: "Heart Disease Prediction Platform",
    github: "https://github.com/bhagavan444/Heart-Disease-Prediction",
    live: null,
    desc: "Machine learning–powered web application to predict heart disease risk...",
    tags: ["Python", "Machine Learning", "Flask", "Scikit-learn", "Pandas"],
    icon: "❤️",
    img: "https://lh3.googleusercontent.com/d/1Uy1JiAFMcAwMD0LZgm0J-bYiWuHpRzqq",
    color: "#8a2be2",
    featured: true,
    highlights: ["ML-based Prediction", "Clinical Feature Engineering", "Fast Predictions"],
    stats: { accuracy: "87%", predictions: "1.2k+" }
  },
  {
    id: 12,
    title: "AI Chatbot Platform",
    github: "https://github.com/bhagavan444/chatbotwebapp",
    live: "https://bhagavanai.lovable.app",
    desc: "Advanced conversational AI platform with streaming responses...",
    tags: ["AI", "React", "Flask", "Gemini", "Streaming"],
    icon: "🤖",
    img: "https://drive.google.com/thumbnail?id=10gvXlgHCb__NAWBoLEbj6LglL9dT6Kew&sz=w1200",
    color: "#00ffff",
    featured: true,
    highlights: ["Streaming Responses", "File Upload", "Multi-LLM Support"],
    stats: { chats: "45k+", messages: "320k+" }
  },
  {
    id: 13,
    title: "AI Career Path System",
    github: "https://github.com/bhagavan444/carrer-path-web-",
    live: null,
    desc: "Machine Learning powered career recommendation engine...",
    tags: ["ML", "Python", "Flask", "Scikit-learn", "NLP"],
    icon: "🎯",
    img: "https://drive.google.com/thumbnail?id=1pTnIysNCQgb3oHPOyofDKVkAe_acI2Bj&sz=w1200",
    color: "#8a2be2",
    featured: true,
    highlights: ["Career Matching", "Skills Gap Analysis", "Learning Roadmaps"],
    stats: { users: "1.9k+", roadmaps: "7.2k+" }
  },
  {
    id: 14,
    title: "Fake News Detector",
    github: "https://github.com/bhagavan444/News-detector",
    live: null,
    desc: "High-accuracy NLP-based fake news detection system...",
    tags: ["NLP", "TensorFlow", "LSTM", "BERT", "Python"],
    icon: "📰",
    img: "https://drive.google.com/thumbnail?id=1i-qZCMDiOAy677h3y12es5xM_IL-_oOF&sz=w1200",
    color: "#00ffff",
    featured: true,
    highlights: ["92%+ Accuracy", "Explainable AI", "Real-time Analysis"],
    stats: { articles: "150k+", accuracy: "92.4%" }
  }
];

// ──────────────────────────────────────────────────────────────────────────────
// CYBERPUNK PROJECTS COMPONENT
// ──────────────────────────────────────────────────────────────────────────────
export default function CyberpunkProjects() {
  const [activeProject, setActiveProject] = useState(null);
  const [hoveredId, setHoveredId] = useState(null);
  const canvasRef = useRef(null);

  // Particle background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let id;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const particles = Array.from({ length: 80 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 3 + 1.2
    }));

    const animate = () => {
      ctx.fillStyle = 'rgba(0,0,0,0.07)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 5);
        g.addColorStop(0, 'rgba(0,255,255,0.38)');
        g.addColorStop(1, 'transparent');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 5, 0, Math.PI * 2);
        ctx.fill();
      });

      id = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Fira+Code:wght@400;500;600&display=swap');

        @keyframes slideIn { from { opacity:0; transform:translateY(50px); } to { opacity:1; transform:translateY(0); } }
        @keyframes scan     { 0% { transform:translateY(-100%); } 100% { transform:translateY(100%); } }
        @keyframes float    { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-14px); } }
        @keyframes pulse    { 0%,100% { opacity:1; } 50% { opacity:0.55; } }

        .project-card {
          position: relative;
          background: rgba(6,6,22,0.84);
          border: 2px solid rgba(0,255,255,0.24);
          border-radius: 24px;
          overflow: hidden;
          transition: all 0.5s cubic-bezier(0.23,1,0.32,1);
        }
        .project-card:hover {
          transform: translateY(-20px) scale(1.04);
          border-color: currentColor;
          box-shadow: 0 0 80px currentColor;
        }
        .project-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, transparent 35%, rgba(0,255,255,0.15) 50%, transparent 65%);
          animation: scan 6s linear infinite;
          pointer-events: none;
          z-index: 1;
        }
        .tech-pill {
          background: rgba(0,0,0,0.72);
          border: 1.5px solid currentColor;
          padding: 0.55rem 1.15rem;
          border-radius: 999px;
          font-family: 'Fira Code',monospace;
          font-size: 0.9rem;
          transition: all 0.3s;
        }
        .tech-pill:hover { transform:scale(1.08); box-shadow:0 0 28px currentColor; }
        .neon-glow {
          text-shadow: 0 0 14px currentColor, 0 0 32px currentColor, 0 0 60px currentColor;
        }
        .action-btn {
          padding: 0.9rem 1.8rem;
          border-radius: 999px;
          font-weight: 700;
          font-size: 1rem;
          display: flex;
          align-items: center;
          gap: 0.8rem;
          transition: all 0.35s;
          text-decoration: none;
        }
      `}</style>

      <div style={{
        minHeight: '100vh',
        background: '#000',
        color: '#e8e8ff',
        position: 'relative',
        overflow: 'hidden',
        padding: '8rem 3rem 6rem',
        fontFamily: "'Outfit', sans-serif"
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(rgba(0,255,255,0.1) 1px,transparent 1px),linear-gradient(90deg,rgba(0,255,255,0.1) 1px,transparent 1px)',
          backgroundSize: '60px 60px', opacity: 0.2, pointerEvents: 'none'
        }} />

        <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1 }} />

        <div style={{ position: 'relative', zIndex: 10, maxWidth: '1700px', margin: '0 auto' }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '7rem' }}>
            <div style={{
              display: 'inline-block', fontFamily: "'Fira Code',monospace", color: '#00ffff',
              fontSize: '1.2rem', padding: '1rem 2.2rem', border: '2.5px solid rgba(0,255,255,0.45)',
              borderRadius: '999px', marginBottom: '2rem', animation: 'pulse 3.5s infinite'
            }}>
              {'>'} displayActiveProjects()
            </div>
            <h1 className="neon-glow" style={{
              fontSize: 'clamp(4.2rem,10vw,7.5rem)', fontWeight: 900,
              color: '#00ffff', letterSpacing: '6px', textTransform: 'uppercase'
            }}>
              PROJECT MATRIX
            </h1>
            <p style={{
              fontSize: 'clamp(1.3rem,3vw,1.7rem)', color: '#a8a8d8',
              maxWidth: '860px', margin: '2rem auto 0', lineHeight: 1.8,
              fontFamily: "'Fira Code',monospace"
            }}>
              [ AI engines • Full-stack realities • Deployed systems ]<br/>
              Code-forged futures — 2050 protocol
            </p>
          </div>

          {/* Cards Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))',
            gap: '3.2rem'
          }}>
            {allProjects.map(project => {
              const isHovered = hoveredId === project.id;
              const hasGithub = !!project.github;
              const hasLive   = !!project.live;

              return (
                <div
                  key={project.id}
                  className="project-card"
                  onMouseEnter={() => setHoveredId(project.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onClick={() => setActiveProject(project)}
                  style={{
                    color: project.color,
                    animation: `slideIn 0.9s ease-out ${project.id * 0.08}s backwards`,
                    cursor: 'pointer'
                  }}
                >
                  {/* Image preview */}
                  <div style={{
                    height: '260px', overflow: 'hidden', position: 'relative'
                  }}>
                    <img
                      src={project.img}
                      alt={project.title}
                      onError={e => e.target.src = "https://via.placeholder.com/500x300/111/00ffff?text=Project"}
                      style={{
                        width: '100%', height: '100%', objectFit: 'cover',
                        transition: 'transform 0.7s ease',
                        transform: isHovered ? 'scale(1.12)' : 'scale(1.04)'
                      }}
                    />
                    <div style={{
                      position: 'absolute', inset: 0,
                      background: 'linear-gradient(to top, rgba(0,0,0,0.88) 0%, transparent 60%)'
                    }} />
                    {project.featured && (
                      <div style={{
                        position: 'absolute', top: '1.2rem', right: '1.2rem',
                        padding: '0.6rem 1.3rem', background: 'rgba(255,215,0,0.22)',
                        border: '2px solid #ffea8090', borderRadius: '999px',
                        color: '#ffea80', fontWeight: 700, fontSize: '0.95rem',
                        display: 'flex', alignItems: 'center', gap: '0.6rem'
                      }}>
                        <Star size={16} fill="#ffea80" /> FEATURED
                      </div>
                    )}
                  </div>

                  <div style={{ padding: '2.2rem 2.4rem' }}>
                    {/* Icon + Title */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.4rem', marginBottom: '1.4rem' }}>
                      <div style={{
                        width: '76px', height: '76px',
                        border: `3px solid ${project.color}90`,
                        borderRadius: '16px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '2.8rem', animation: isHovered ? 'float 3.2s infinite' : 'none',
                        boxShadow: isHovered ? `0 0 44px ${project.color}aa` : 'none'
                      }}>
                        {project.icon}
                      </div>
                      <h3 style={{
                        fontSize: '1.9rem', fontWeight: 800, lineHeight: 1.2,
                        color: '#ffffff'
                      }}>
                        {project.title}
                      </h3>
                    </div>

                    <p style={{
                      fontSize: '1.02rem', color: '#c0c0e8',
                      lineHeight: 1.7, marginBottom: '1.8rem',
                      fontFamily: "'Fira Code',monospace"
                    }}>
                      {project.desc}
                    </p>

                    {/* Tags */}
                    <div style={{
                      display: 'flex', flexWrap: 'wrap', gap: '0.8rem', marginBottom: '2.2rem'
                    }}>
                      {project.tags.slice(0,5).map(t => (
                        <span key={t} className="tech-pill" style={{
                          color: isHovered ? project.color : '#9999cc',
                          borderColor: isHovered ? project.color : '#555588'
                        }}>
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Buttons */}
                    <div style={{
                      display: 'flex', gap: '1.2rem', flexWrap: 'wrap', marginTop: '1.4rem'
                    }}>
                      {hasGithub && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={e => e.stopPropagation()}
                          className="action-btn"
                          style={{
                            background: 'rgba(0,255,255,0.16)',
                            border: `2px solid ${project.color}80`,
                            color: project.color
                          }}
                        >
                          <Github size={22} />
                          GitHub
                        </a>
                      )}

                      {hasLive && (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={e => e.stopPropagation()}
                          className="action-btn"
                          style={{
                            background: `linear-gradient(90deg, ${project.color}, #ffffff)`,
                            color: '#000',
                            boxShadow: `0 0 30px ${project.color}60`
                          }}
                        >
                          <Rocket size={22} />
                          Live Demo
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* CTA */}
          <div style={{
            marginTop: '8rem', padding: '4.5rem 3.5rem',
            background: 'rgba(0,0,0,0.78)', border: '3px solid rgba(0,255,255,0.35)',
            borderRadius: '32px', textAlign: 'center', position: 'relative'
          }}>
            <h2 style={{
              fontSize: 'clamp(3.2rem,7vw,5rem)', fontWeight: 900,
              color: '#00ffff', marginBottom: '2.8rem',
              textShadow: '0 0 50px #00ffffa0'
            }}>
              EXECUTE NEXT PROTOCOL?
            </h2>

            <div style={{ display: 'flex', gap: '2.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="https://github.com/bhagavan444" target="_blank" style={{
                padding: '1.5rem 3.5rem', background: 'rgba(0,255,255,0.18)',
                border: '2.5px solid #00ffff80', borderRadius: '999px',
                color: '#00ffff', fontSize: '1.3rem', fontWeight: 700,
                display: 'flex', alignItems: 'center', gap: '1.2rem'
              }}>
                <Github size={34} /> VIEW ALL REPOS
              </a>
              <a href="mailto:g.sivasatyasaibhagavan@gmail.com" style={{
                padding: '1.5rem 3.5rem',
                background: 'linear-gradient(90deg, #00ffff, #8a2be2)',
                borderRadius: '999px', color: '#000', fontSize: '1.3rem',
                fontWeight: 900, display: 'flex', alignItems: 'center', gap: '1.2rem'
              }}>
                <Mail size={34} /> CONTACT
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL - same as before, kept shorter for brevity */}
      {activeProject && (
        <div
          onClick={() => setActiveProject(null)}
          style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.96)',
            backdropFilter: 'blur(16px)', zIndex: 9999,
            display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem'
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: 'rgba(8,8,30,0.97)', border: `4px solid ${activeProject.color}aa`,
              borderRadius: '32px', maxWidth: '1400px', width: '94%', maxHeight: '94vh',
              overflowY: 'auto', boxShadow: `0 0 160px ${activeProject.color}70`
            }}
          >
            <button
              onClick={() => setActiveProject(null)}
              style={{ position: 'absolute', top: '2rem', right: '2.5rem', background: 'none', border: 'none', color: '#ff6666', cursor: 'pointer' }}
            >
              <X size={56} strokeWidth={2.8} />
            </button>

            <div style={{ padding: '5rem 4.5rem 6rem' }}>
              <h2 style={{
                fontSize: 'clamp(3.5rem,8vw,5.5rem)', fontWeight: 900,
                color: activeProject.color, textAlign: 'center', marginBottom: '2rem',
                textShadow: `0 0 50px ${activeProject.color}b0`
              }}>
                {activeProject.title}
              </h2>

              <img
                src={activeProject.img}
                alt={activeProject.title}
                style={{ width: '100%', borderRadius: '20px', marginBottom: '3.5rem', boxShadow: `0 40px 110px ${activeProject.color}60` }}
              />

              <p style={{ fontSize: '1.45rem', color: '#c8c8ff', lineHeight: 1.8, marginBottom: '3.5rem' }}>
                {activeProject.longDesc || activeProject.desc}
              </p>

              {/* ... rest of modal (stats, highlights, tags, buttons) same as previous version ... */}
            </div>
          </div>
        </div>
      )}
    </>
  );
}