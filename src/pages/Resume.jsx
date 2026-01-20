import { useState, useEffect, useRef } from 'react';
import { 
  Download, Eye, FileText, Award, Code, Rocket, Star, Sparkles, 
  X, CheckCircle, TrendingUp, Zap, Target, Brain, Flame, Trophy,
  Briefcase, GraduationCap, Calendar, MapPin, Linkedin, Github, Mail
} from 'lucide-react';

const RESUME_URL = "https://drive.google.com/file/d/1BfrC-GloabR5mOXuPb8mjkKQmya5luDE/preview";
const RESUME_DOWNLOAD = "https://drive.google.com/uc?export=download&id=1BfrC-GloabR5mOXuPb8mjkKQmya5luDE";

export default function FuturisticResume() {
  const [showModal, setShowModal] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleMove = (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setMousePos({
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100
      });
    };

    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  const stats = [
    { icon: GraduationCap, value: '8.5+', label: 'CGPA', color: '#fbbf24' },
    { icon: Code, value: '30+', label: 'Technologies', color: '#06b6d4' },
    { icon: Rocket, value: '6+', label: 'Projects', color: '#a855f7' },
    { icon: Award, value: '13+', label: 'Certifications', color: '#ec4899' }
  ];

  const skills = [
    { name: 'React', color: '#61DAFB' },
    { name: 'Node.js', color: '#339933' },
    { name: 'MongoDB', color: '#47A248' },
    { name: 'Python', color: '#3776AB' },
    { name: 'TensorFlow', color: '#FF6F00' },
    { name: 'TypeScript', color: '#3178C6' },
    { name: 'Next.js', color: '#000000' },
    { name: 'AWS', color: '#FF9900' }
  ];

  return (
    <div
      ref={containerRef}
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0f0f1a 0%, #000000 100%)',
        color: '#ffffff',
        overflow: 'hidden',
        position: 'relative',
        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif'
      }}
    >
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(2deg); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.85; transform: scale(1.05); }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes glow {
          0%, 100% { filter: blur(60px) brightness(1); }
          50% { filter: blur(90px) brightness(1.4); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>

      {/* Subtle Background Effects */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        {/* Gradient Orbs */}
        <div style={{
          position: 'absolute',
          width: '900px',
          height: '900px',
          top: '-15%',
          right: '-15%',
          background: 'radial-gradient(circle, rgba(59,130,246,0.22), transparent 70%)',
          filter: 'blur(100px)',
          animation: 'float 24s ease-in-out infinite'
        }} />
        
        <div style={{
          position: 'absolute',
          width: '700px',
          height: '700px',
          bottom: '-10%',
          left: '-10%',
          background: 'radial-gradient(circle, rgba(168,85,247,0.18), transparent 70%)',
          filter: 'blur(90px)',
          animation: 'float 28s ease-in-out infinite 6s'
        }} />

        {/* Grid Pattern */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(59,130,246,0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59,130,246,0.08) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
          opacity: 0.25
        }} />
      </div>

      <div ref={sectionRef} style={{
        position: 'relative',
        zIndex: 10,
        maxWidth: '1600px',
        margin: '0 auto',
        padding: 'clamp(80px, 12vh, 140px) clamp(20px, 5vw, 60px)'
      }}>
        {/* Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: 'clamp(60px, 10vh, 100px)',
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(-40px)',
          transition: 'all 1.2s cubic-bezier(0.34, 1.56, 0.64, 1)'
        }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '12px',
            padding: '12px 32px',
            background: 'rgba(255,255,255,0.05)',
            backdropFilter: 'blur(20px)',
            borderRadius: '999px',
            border: '1px solid rgba(255,255,255,0.12)',
            marginBottom: '32px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.3)'
          }}>
            <div style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: '#10b981',
              animation: 'pulse 2s infinite',
              boxShadow: '0 0 15px #10b981'
            }} />
            <span style={{
              fontSize: '13px',
              fontWeight: '900',
              letterSpacing: '3px',
              color: '#ffffff'
            }}>
              PROFESSIONAL RESUME 2026
            </span>
            <FileText size={20} style={{ color: '#3b82f6' }} />
          </div>

          <h1 style={{
            fontSize: 'clamp(3.5rem, 10vw, 7.5rem)',
            fontWeight: '900',
            lineHeight: 1,
            marginBottom: '24px',
            background: 'linear-gradient(90deg, #3b82f6, #a855f7, #ec4899, #3b82f6)',
            backgroundSize: '300%',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            animation: 'shimmer 8s linear infinite',
            textShadow: '0 0 60px rgba(59,130,246,0.4)'
          }}>
            Resume
          </h1>

          <p style={{
            fontSize: 'clamp(1.2rem, 2.8vw, 1.6rem)',
            color: '#9ca3af',
            maxWidth: '800px',
            margin: '0 auto 40px',
            lineHeight: 1.6
          }}>
            Artificial Intelligence & Data Science Engineer | Full-Stack Developer
            <br />
            <span style={{ color: '#3b82f6', fontWeight: '600' }}>
              Building intelligent systems with production-grade code
            </span>
          </p>
        </div>

        {/* Main Content Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 2fr',
          gap: 'clamp(32px, 5vw, 64px)',
          '@media (max-width: 1024px)': {
            gridTemplateColumns: '1fr'
          }
        }}>
          {/* Left Column - Stats & Actions */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'clamp(24px, 4vw, 40px)',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
            transition: 'all 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) 0.2s'
          }}>
            {/* Stats Cards */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '16px'
            }}>
              {stats.map((stat, i) => (
                <div
                  key={i}
                  style={{
                    padding: 'clamp(20px, 3vw, 28px)',
                    background: 'rgba(255,255,255,0.04)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: '20px',
                    border: '1px solid rgba(255,255,255,0.1)',
                    textAlign: 'center',
                    transition: 'all 0.4s ease',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'translateY(-6px) scale(1.03)';
                    e.currentTarget.style.boxShadow = `0 15px 40px rgba(0,0,0,0.3)`;
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <stat.icon 
                    size={32} 
                    style={{ 
                      color: stat.color,
                      marginBottom: '12px',
                      filter: `drop-shadow(0 0 8px ${stat.color}60)`
                    }} 
                  />
                  <div style={{
                    fontSize: 'clamp(1.8rem, 4vw, 2.2rem)',
                    fontWeight: '900',
                    color: '#ffffff',
                    marginBottom: '4px'
                  }}>
                    {stat.value}
                  </div>
                  <div style={{
                    fontSize: 'clamp(0.85rem, 2vw, 0.95rem)',
                    color: '#9ca3af',
                    fontWeight: '600'
                  }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Skills Snapshot */}
            <div style={{
              padding: 'clamp(24px, 4vw, 32px)',
              background: 'rgba(255,255,255,0.04)',
              backdropFilter: 'blur(20px)',
              borderRadius: '20px',
              border: '1px solid rgba(255,255,255,0.1)'
            }}>
              <h3 style={{
                fontSize: 'clamp(1.2rem, 2.5vw, 1.5rem)',
                fontWeight: '900',
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}>
                <Brain size={24} style={{ color: '#a855f7' }} />
                Core Competencies
              </h3>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
                gap: '12px'
              }}>
                {skills.map((skill, i) => (
                  <div
                    key={i}
                    style={{
                      padding: '10px 14px',
                      background: 'rgba(255,255,255,0.06)',
                      borderRadius: '12px',
                      border: `1px solid ${skill.color}30`,
                      textAlign: 'center',
                      fontSize: 'clamp(0.85rem, 2vw, 0.95rem)',
                      fontWeight: '600',
                      color: '#e2e8f0',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    {skill.name}
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px'
            }}>
              <a
                href={RESUME_DOWNLOAD}
                style={{
                  padding: 'clamp(14px, 3vw, 18px) clamp(24px, 5vw, 40px)',
                  borderRadius: '16px',
                  background: 'linear-gradient(135deg, #3b82f6, #a855f7, #ec4899)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '12px',
                  color: '#fff',
                  fontWeight: '800',
                  fontSize: 'clamp(1rem, 2.2vw, 1.2rem)',
                  textDecoration: 'none',
                  boxShadow: '0 12px 40px rgba(59,130,246,0.4)',
                  transition: 'all 0.4s ease',
                  border: 'none',
                  cursor: 'pointer'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-4px) scale(1.02)';
                  e.currentTarget.style.boxShadow = '0 20px 60px rgba(59,130,246,0.6)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = '0 12px 40px rgba(59,130,246,0.4)';
                }}
              >
                <Download size={22} />
                Download Resume
              </a>

              <button
                onClick={() => setShowModal(true)}
                style={{
                  padding: 'clamp(14px, 3vw, 18px) clamp(24px, 5vw, 40px)',
                  borderRadius: '16px',
                  background: 'rgba(255,255,255,0.08)',
                  backdropFilter: 'blur(20px)',
                  border: '2px solid rgba(255,255,255,0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '12px',
                  color: '#fff',
                  fontWeight: '800',
                  fontSize: 'clamp(1rem, 2.2vw, 1.2rem)',
                  cursor: 'pointer',
                  transition: 'all 0.4s ease'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-4px) scale(1.02)';
                  e.currentTarget.style.background = 'rgba(255,255,255,0.12)';
                  e.currentTarget.style.boxShadow = '0 20px 60px rgba(168,85,247,0.3)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <Eye size={22} />
                View Fullscreen
              </button>
            </div>
          </div>

          {/* Right Column - Resume Preview */}
          <div style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
            transition: 'all 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) 0.4s'
          }}>
            <div style={{ position: 'relative' }}>
              {/* Animated Glow Border */}
              <div style={{
                position: 'absolute',
                inset: '-6px',
                borderRadius: '28px',
                background: 'conic-gradient(from 0deg, #3b82f6, #a855f7, #ec4899, #3b82f6)',
                animation: 'rotate 8s linear infinite',
                opacity: 0.4,
                filter: 'blur(25px)'
              }} />

              <div style={{
                position: 'relative',
                borderRadius: '24px',
                overflow: 'hidden',
                border: '2px solid rgba(255,255,255,0.15)',
                background: '#000',
                boxShadow: '0 30px 80px -10px rgba(0,0,0,0.7)'
              }}>
                {/* Status Indicators */}
                <div style={{
                  position: 'absolute',
                  top: '16px',
                  left: '16px',
                  zIndex: 20,
                  padding: '8px 20px',
                  borderRadius: '999px',
                  background: 'linear-gradient(135deg, #10b981, #059669)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  fontSize: 'clamp(13px, 2vw, 15px)',
                  fontWeight: '800',
                  color: '#fff',
                  boxShadow: '0 4px 20px rgba(16,185,129,0.4)'
                }}>
                  <CheckCircle size={16} />
                  ATS Optimized • 92%
                </div>

                <div style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  zIndex: 20,
                  padding: '8px 20px',
                  borderRadius: '999px',
                  background: 'rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  fontSize: 'clamp(13px, 2vw, 15px)',
                  fontWeight: '800',
                  color: '#fff'
                }}>
                  <div style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: '#10b981',
                    animation: 'pulse 2s infinite',
                    boxShadow: '0 0 12px #10b981'
                  }} />
                  LIVE PREVIEW
                </div>

                {/* Resume iframe */}
                <div style={{
                  position: 'relative',
                  aspectRatio: '8.5 / 11',
                  background: 'linear-gradient(135deg, #111827, #000)'
                }}>
                  <iframe
                    src={RESUME_URL}
                    style={{
                      width: '100%',
                      height: '100%',
                      border: 'none',
                      background: '#fff'
                    }}
                    title="Professional Resume"
                    allowFullScreen
                  />

                  {/* Subtle Scan Effect */}
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(180deg, transparent, rgba(59,130,246,0.08), transparent)',
                    height: '120px',
                    animation: 'scan 5s ease-in-out infinite',
                    pointerEvents: 'none'
                  }} />
                </div>

                {/* Bottom Info Bar */}
                <div style={{
                  padding: '16px 24px',
                  background: 'rgba(255,255,255,0.04)',
                  backdropFilter: 'blur(12px)',
                  borderTop: '1px solid rgba(255,255,255,0.1)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '16px'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    flexWrap: 'wrap'
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontSize: 'clamp(13px, 2vw, 15px)'
                    }}>
                      <Calendar size={16} style={{ color: '#3b82f6' }} />
                      Updated Jan 2026
                    </div>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontSize: 'clamp(13px, 2vw, 15px)'
                    }}>
                      <MapPin size={16} style={{ color: '#ec4899' }} />
                      Vijayawada, India
                    </div>
                  </div>

                  <div style={{
                    display: 'flex',
                    gap: '16px'
                  }}>
                    <a
                      href="https://linkedin.com/in/bhagavan"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: '#0a66c2',
                        transition: 'transform 0.3s'
                      }}
                      onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.2)'}
                      onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                    >
                      <Linkedin size={20} />
                    </a>
                    <a
                      href="https://github.com/bhagavan444"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: '#ffffff',
                        transition: 'transform 0.3s'
                      }}
                      onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.2)'}
                      onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                    >
                      <Github size={20} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Modal */}
      {showModal && (
        <div
          onClick={() => setShowModal(false)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1000,
            background: 'rgba(0,0,0,0.97)',
            backdropFilter: 'blur(40px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 'clamp(20px, 5vw, 40px)'
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '1200px',
              height: '90vh',
              borderRadius: '24px',
              overflow: 'hidden',
              border: '3px solid rgba(255,255,255,0.2)',
              boxShadow: '0 50px 100px rgba(0,0,0,0.8)',
              background: '#000'
            }}
          >
            <iframe
              src={RESUME_URL}
              style={{
                width: '100%',
                height: '100%',
                border: 'none'
              }}
              title="Professional Resume - Fullscreen"
              allowFullScreen
            />

            <button
              onClick={() => setShowModal(false)}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                width: '56px',
                height: '56px',
                background: 'rgba(239,68,68,0.9)',
                borderRadius: '50%',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 10px 30px rgba(239,68,68,0.5)',
                transition: 'all 0.3s ease',
                zIndex: 10
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            >
              <X size={28} color="#fff" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}