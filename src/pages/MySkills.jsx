import { useState, useEffect, useRef } from 'react';
import { Code2, Database, Brain, Cloud, Layers, Terminal, Cpu, Award, TrendingUp, Rocket } from 'lucide-react';

const skillDomains = [
  {
    id: 'fullstack',
    name: 'Full Stack Development',
    icon: Layers,
    proficiency: 92,
    color: '#61DAFB',
    description: 'Building scalable web applications with modern JavaScript ecosystem',
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'REST APIs', 'WebSockets'],
    stats: { projects: 15, experience: '3+ years' }
  },
  {
    id: 'ml',
    name: 'Machine Learning & AI',
    icon: Brain,
    proficiency: 88,
    color: '#FF6B6B',
    description: 'Developing intelligent systems with deep learning and neural networks',
    technologies: ['TensorFlow', 'PyTorch', 'Scikit-learn', 'Keras', 'OpenCV', 'NLP', 'Computer Vision'],
    stats: { projects: 12, experience: '2+ years' }
  },
  {
    id: 'data',
    name: 'Data Science & Analytics',
    icon: Database,
    proficiency: 85,
    color: '#4ECDC4',
    description: 'Extracting insights from complex datasets using statistical methods',
    technologies: ['Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'SQL', 'Data Mining', 'Statistical Analysis'],
    stats: { projects: 10, experience: '2+ years' }
  },
  {
    id: 'cloud',
    name: 'Cloud & DevOps',
    icon: Cloud,
    proficiency: 80,
    color: '#95E1D3',
    description: 'Deploying and managing scalable infrastructure on cloud platforms',
    technologies: ['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Git', 'Linux', 'Terraform'],
    stats: { projects: 8, experience: '2+ years' }
  },
  {
    id: 'programming',
    name: 'Core Programming',
    icon: Code2,
    proficiency: 90,
    color: '#FFD93D',
    description: 'Strong foundation in algorithms, data structures, and system design',
    technologies: ['Python', 'JavaScript', 'Java', 'C++', 'TypeScript', 'OOP', 'Design Patterns'],
    stats: { projects: 20, experience: '4+ years' }
  }
];

export default function EliteSkillsOrbital() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [rotation, setRotation] = useState(0);
  const [isAutoRotate, setIsAutoRotate] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredOrbit, setHoveredOrbit] = useState(null);
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  const activeSkill = skillDomains[activeIndex];

  useEffect(() => {
    if (!isAutoRotate) return;
    
    const interval = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % skillDomains.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoRotate]);

  useEffect(() => {
    setRotation(activeIndex * (360 / skillDomains.length));
  }, [activeIndex]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const updateSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    updateSize();

    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      radius: Math.random() * 2 + 1,
      opacity: Math.random() * 0.4 + 0.2
    }));

    let animationId;
    const animate = () => {
      ctx.fillStyle = 'rgba(5, 5, 15, 0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${activeSkill.color}${Math.floor(p.opacity * 255).toString(16).padStart(2, '0')}`;
        ctx.fill();
      });

      animationId = requestAnimationFrame(animate);
    };
    animate();

    window.addEventListener('resize', updateSize);
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', updateSize);
    };
  }, [activeSkill.color]);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePosition({
      x: (e.clientX - rect.left - rect.width / 2) / 50,
      y: (e.clientY - rect.top - rect.height / 2) / 50
    });
  };

  const handleSkillClick = (index) => {
    setActiveIndex(index);
    setIsAutoRotate(false);
  };

  return (
    <div ref={containerRef} onMouseMove={handleMouseMove} style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom, #050510, #0a0a18)',
      color: '#fff',
      position: 'relative',
      overflow: 'hidden',
      fontFamily: '"Inter", -apple-system, sans-serif',
      padding: 'clamp(2rem, 5vh, 4rem) clamp(1rem, 3vw, 2rem)'
    }}>
      <style>{`
        @keyframes orbitalPulse {
          0%, 100% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(1.1); opacity: 1; }
        }
        @keyframes coreGlow {
          0%, 100% { box-shadow: 0 0 60px currentColor, 0 0 120px currentColor, inset 0 0 40px currentColor; }
          50% { box-shadow: 0 0 80px currentColor, 0 0 160px currentColor, inset 0 0 60px currentColor; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes techFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @keyframes scanLine {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        @keyframes progressFill {
          from { width: 0; }
        }
        @keyframes rotateGlow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>

      <canvas ref={canvasRef} style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1
      }} />

      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: `radial-gradient(circle at 50% 50%, ${activeSkill.color}15, transparent 60%)`,
        pointerEvents: 'none',
        transition: 'background 0.8s ease',
        zIndex: 2
      }} />

      <div style={{
        position: 'relative',
        zIndex: 10,
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        <header style={{
          textAlign: 'center',
          marginBottom: 'clamp(3rem, 8vh, 6rem)',
          animation: 'slideUp 0.8s ease-out'
        }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '0.5rem 1.5rem',
            background: 'rgba(255,255,255,0.03)',
            backdropFilter: 'blur(20px)',
            borderRadius: '999px',
            border: `1px solid ${activeSkill.color}40`,
            marginBottom: '1.5rem',
            transition: 'all 0.5s ease'
          }}>
            <div style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: activeSkill.color,
              boxShadow: `0 0 12px ${activeSkill.color}`,
              animation: 'orbitalPulse 2s infinite'
            }} />
            <span style={{
              fontSize: '0.75rem',
              fontWeight: '800',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: '#94a3b8'
            }}>
              Technical Expertise
            </span>
          </div>

          <h1 style={{
            fontSize: 'clamp(2.5rem, 8vw, 5rem)',
            fontWeight: '900',
            lineHeight: '1.1',
            marginBottom: '1rem',
            letterSpacing: '-0.02em'
          }}>
            Core <span style={{
              background: `linear-gradient(135deg, ${activeSkill.color}, #fff)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              transition: 'background 0.6s ease'
            }}>Skills</span>
          </h1>

          <p style={{
            fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
            color: '#94a3b8',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            AI Engineer specializing in <strong style={{ color: activeSkill.color, transition: 'color 0.6s' }}>Full Stack Development</strong>, <strong style={{ color: activeSkill.color }}>Machine Learning</strong>, and <strong style={{ color: activeSkill.color }}>Cloud Infrastructure</strong>
          </p>
        </header>

        <div style={{
          display: 'grid',
          gridTemplateColumns: window.innerWidth > 1024 ? '1fr 400px' : '1fr',
          gap: 'clamp(2rem, 4vw, 3rem)',
          alignItems: 'center',
          marginBottom: 'clamp(3rem, 6vh, 5rem)'
        }}>
          <div style={{
            position: 'relative',
            aspectRatio: '1',
            maxWidth: '600px',
            margin: '0 auto',
            width: '100%'
          }}>
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: `translate(-50%, -50%) translate(${mousePosition.x}px, ${mousePosition.y}px)`,
              transition: 'transform 0.3s ease'
            }}>
              <div style={{
                position: 'relative',
                width: 'clamp(200px, 30vw, 280px)',
                height: 'clamp(200px, 30vw, 280px)',
                borderRadius: '50%',
                background: `radial-gradient(circle, ${activeSkill.color}20, ${activeSkill.color}05)`,
                border: `3px solid ${activeSkill.color}`,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                animation: 'coreGlow 3s infinite',
                color: activeSkill.color,
                transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
                backdropFilter: 'blur(20px)'
              }}>
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: '50%',
                  background: `conic-gradient(from 0deg, transparent 0%, ${activeSkill.color}30 50%, transparent 100%)`,
                  animation: 'rotateGlow 6s linear infinite',
                  opacity: 0.4
                }} />

                <div style={{
                  position: 'relative',
                  zIndex: 2,
                  textAlign: 'center',
                  padding: '2rem'
                }}>
                  {(() => {
                    const Icon = activeSkill.icon;
                    return <Icon size={window.innerWidth > 768 ? 64 : 48} style={{ marginBottom: '1rem' }} />;
                  })()}
                  
                  <div style={{
                    fontSize: 'clamp(2rem, 6vw, 3.5rem)',
                    fontWeight: '900',
                    marginBottom: '0.5rem'
                  }}>
                    {activeSkill.proficiency}%
                  </div>
                  
                  <div style={{
                    fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
                    fontWeight: '700',
                    color: '#fff',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}>
                    Proficiency
                  </div>
                </div>

                <div style={{
                  position: 'absolute',
                  inset: '-2px',
                  borderRadius: '50%',
                  background: 'transparent',
                  overflow: 'hidden',
                  pointerEvents: 'none'
                }}>
                  <div style={{
                    position: 'absolute',
                    width: '100%',
                    height: '4px',
                    background: `linear-gradient(90deg, transparent, ${activeSkill.color}, transparent)`,
                    animation: 'scanLine 3s ease-in-out infinite'
                  }} />
                </div>
              </div>

              <svg style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: 'clamp(400px, 60vw, 560px)',
                height: 'clamp(400px, 60vw, 560px)',
                transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
                transition: 'transform 1s cubic-bezier(0.34, 1.56, 0.64, 1)',
                pointerEvents: 'none'
              }} viewBox="0 0 560 560">
                <circle cx="280" cy="280" r="240" fill="none" stroke={`${activeSkill.color}20`} strokeWidth="1" strokeDasharray="4 8" />
                <circle cx="280" cy="280" r="200" fill="none" stroke={`${activeSkill.color}15`} strokeWidth="1" strokeDasharray="4 8" />
              </svg>

              {skillDomains.map((skill, index) => {
                const angle = (index * 360) / skillDomains.length;
                const radius = window.innerWidth > 768 ? 240 : 180;
                const x = Math.cos((angle - 90) * (Math.PI / 180)) * radius;
                const y = Math.sin((angle - 90) * (Math.PI / 180)) * radius;
                const isActive = index === activeIndex;
                const Icon = skill.icon;

                return (
                  <button
                    key={skill.id}
                    onClick={() => handleSkillClick(index)}
                    onMouseEnter={() => setHoveredOrbit(index)}
                    onMouseLeave={() => setHoveredOrbit(null)}
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      width: isActive ? '80px' : '64px',
                      height: isActive ? '80px' : '64px',
                      transform: `translate(-50%, -50%) translate(${x}px, ${y}px) rotate(-${rotation}deg) scale(${hoveredOrbit === index ? 1.1 : 1})`,
                      borderRadius: '50%',
                      background: isActive 
                        ? `radial-gradient(circle, ${skill.color}40, ${skill.color}20)`
                        : 'rgba(15, 15, 25, 0.8)',
                      backdropFilter: 'blur(20px)',
                      border: `2px solid ${isActive ? skill.color : `${skill.color}40`}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
                      boxShadow: isActive 
                        ? `0 0 30px ${skill.color}60, 0 0 60px ${skill.color}30`
                        : hoveredOrbit === index 
                        ? `0 0 20px ${skill.color}40`
                        : 'none',
                      zIndex: isActive ? 10 : 5,
                      pointerEvents: 'auto'
                    }}
                  >
                    <Icon size={isActive ? 36 : 28} style={{
                      color: isActive ? skill.color : '#94a3b8',
                      transition: 'all 0.4s ease'
                    }} />
                    {isActive && (
                      <div style={{
                        position: 'absolute',
                        inset: '-3px',
                        borderRadius: '50%',
                        border: `2px solid ${skill.color}`,
                        animation: 'orbitalPulse 2s infinite'
                      }} />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div style={{
            background: 'rgba(15, 15, 25, 0.6)',
            backdropFilter: 'blur(30px)',
            borderRadius: '1.5rem',
            border: `2px solid ${activeSkill.color}30`,
            padding: 'clamp(1.5rem, 4vw, 2.5rem)',
            transition: 'all 0.6s ease',
            animation: 'slideUp 0.6s ease-out',
            boxShadow: `0 20px 60px ${activeSkill.color}20`
          }}>
            <h2 style={{
              fontSize: 'clamp(1.5rem, 4vw, 2rem)',
              fontWeight: '900',
              marginBottom: '1rem',
              color: activeSkill.color,
              transition: 'color 0.6s ease'
            }}>
              {activeSkill.name}
            </h2>

            <p style={{
              fontSize: 'clamp(0.95rem, 2vw, 1.05rem)',
              color: '#cbd5e1',
              lineHeight: '1.7',
              marginBottom: '1.5rem'
            }}>
              {activeSkill.description}
            </p>

            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '1rem',
              marginBottom: '1.5rem'
            }}>
              <div style={{
                padding: '1rem',
                background: `${activeSkill.color}10`,
                borderRadius: '0.75rem',
                border: `1px solid ${activeSkill.color}30`,
                transition: 'all 0.4s ease'
              }}>
                <div style={{
                  fontSize: '0.75rem',
                  color: '#94a3b8',
                  marginBottom: '0.25rem',
                  fontWeight: '700',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  Projects
                </div>
                <div style={{
                  fontSize: '1.8rem',
                  fontWeight: '900',
                  color: activeSkill.color,
                  transition: 'color 0.4s ease'
                }}>
                  {activeSkill.stats.projects}+
                </div>
              </div>

              <div style={{
                padding: '1rem',
                background: `${activeSkill.color}10`,
                borderRadius: '0.75rem',
                border: `1px solid ${activeSkill.color}30`,
                transition: 'all 0.4s ease'
              }}>
                <div style={{
                  fontSize: '0.75rem',
                  color: '#94a3b8',
                  marginBottom: '0.25rem',
                  fontWeight: '700',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  Experience
                </div>
                <div style={{
                  fontSize: '1.8rem',
                  fontWeight: '900',
                  color: activeSkill.color,
                  transition: 'color 0.4s ease'
                }}>
                  {activeSkill.stats.experience}
                </div>
              </div>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '0.75rem'
              }}>
                <span style={{
                  fontSize: '0.75rem',
                  fontWeight: '700',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  color: '#94a3b8'
                }}>
                  Mastery Level
                </span>
                <span style={{
                  fontSize: '1.5rem',
                  fontWeight: '900',
                  color: activeSkill.color,
                  transition: 'color 0.4s ease'
                }}>
                  {activeSkill.proficiency}%
                </span>
              </div>
              <div style={{
                height: '12px',
                background: 'rgba(255,255,255,0.05)',
                borderRadius: '999px',
                overflow: 'hidden',
                position: 'relative'
              }}>
                <div style={{
                  height: '100%',
                  width: `${activeSkill.proficiency}%`,
                  background: `linear-gradient(90deg, ${activeSkill.color}, ${activeSkill.color}80)`,
                  borderRadius: '999px',
                  boxShadow: `0 0 20px ${activeSkill.color}60`,
                  animation: 'progressFill 1s ease-out',
                  transition: 'width 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)'
                }} />
              </div>
            </div>

            <div>
              <div style={{
                fontSize: '0.85rem',
                fontWeight: '700',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                color: '#94a3b8',
                marginBottom: '1rem'
              }}>
                Tech Stack
              </div>
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.5rem'
              }}>
                {activeSkill.technologies.map((tech, i) => (
                  <div key={tech} style={{
                    padding: '0.5rem 1rem',
                    background: 'rgba(255,255,255,0.05)',
                    borderRadius: '999px',
                    border: `1px solid ${activeSkill.color}30`,
                    fontSize: '0.85rem',
                    fontWeight: '600',
                    color: '#e2e8f0',
                    animation: `techFloat 3s ease-in-out ${i * 0.2}s infinite`,
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = `${activeSkill.color}20`;
                    e.currentTarget.style.borderColor = activeSkill.color;
                    e.currentTarget.style.color = activeSkill.color;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                    e.currentTarget.style.borderColor = `${activeSkill.color}30`;
                    e.currentTarget.style.color = '#e2e8f0';
                  }}>
                    {tech}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '0.75rem',
          marginBottom: 'clamp(3rem, 6vh, 5rem)',
          flexWrap: 'wrap'
        }}>
          {skillDomains.map((skill, index) => (
            <button
              key={skill.id}
              onClick={() => handleSkillClick(index)}
              style={{
                padding: '0.75rem 1.5rem',
                background: index === activeIndex 
                  ? `${skill.color}20` 
                  : 'rgba(255,255,255,0.03)',
                backdropFilter: 'blur(20px)',
                border: `2px solid ${index === activeIndex ? skill.color : 'rgba(255,255,255,0.1)'}`,
                borderRadius: '999px',
                color: index === activeIndex ? skill.color : '#94a3b8',
                fontSize: '0.9rem',
                fontWeight: '700',
                cursor: 'pointer',
                transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                boxShadow: index === activeIndex ? `0 10px 30px ${skill.color}30` : 'none',
                transform: index === activeIndex ? 'scale(1.05)' : 'scale(1)'
              }}
              onMouseEnter={(e) => {
                if (index !== activeIndex) {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
                  e.currentTarget.style.borderColor = `${skill.color}40`;
                }
              }}
              onMouseLeave={(e) => {
                if (index !== activeIndex) {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                }
              }}
            >
              {skill.name.split(' ')[0]}
            </button>
          ))}
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 'clamp(1rem, 2vw, 1.5rem)'
        }}>
          {[
            { label: 'Total Projects', value: '45+', icon: Rocket, color: '#61DAFB' },
            { label: 'Technologies', value: '25+', icon: Layers, color: '#FF6B6B' },
            { label: 'Experience', value: '4+ years', icon: TrendingUp, color: '#4ECDC4' },
            { label: 'Code Quality', value: '95%', icon: Award, color: '#FFD93D' }
          ].map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div key={i} style={{
                padding: 'clamp(1.5rem, 3vw, 2rem)',
                background: 'rgba(15, 15, 25, 0.6)',
                backdropFilter: 'blur(30px)',
                borderRadius: '1rem',
                border: `2px solid ${stat.color}30`,
                textAlign: 'center',
                transition: 'all 0.4s ease',
                animation: `slideUp ${0.6 + i * 0.1}s ease-out`
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.borderColor = stat.color;
                e.currentTarget.style.boxShadow = `0 20px 40px ${stat.color}30`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = `${stat.color}30`;
                e.currentTarget.style.boxShadow = 'none';
              }}>
                <Icon size={32} style={{ color: stat.color, marginBottom: '0.75rem' }} />
                <div style={{
                  fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
                  fontWeight: '900',
                  color: stat.color,
                  marginBottom: '0.5rem'
                }}>
                  {stat.value}
                </div>
                <div style={{
                  fontSize: '0.9rem',
                  color: '#94a3b8',
                  fontWeight: '600'
                }}>
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}