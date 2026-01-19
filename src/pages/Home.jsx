import { useState, useEffect } from "react";
import profileImage from "../assets/profile.jpeg";
import resumePDF from "../assets/bhagavanresume.pdf";


import { Award, Briefcase, Rocket, Download, ChevronRight, Terminal, GraduationCap } from "lucide-react";

export default function FuturisticDevHero() {
  const [visible, setVisible] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [roleIndex, setRoleIndex] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState([]);

  const roles = [
    "AI ENGINEER",
    "FULL-STACK ARCHITECT", 
    "ML SPECIALIST",
    "MERN EXPERT"
  ];

  const techStack = [
    { name: "React", color: "#61DAFB", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
    { name: "Python", color: "#3776AB", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
    { name: "TensorFlow", color: "#FF6F00", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg" },
    { name: "Node.js", color: "#339933", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
    { name: "MongoDB", color: "#47A248", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
    { name: "Docker", color: "#2496ED", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
    { name: "JavaScript", color: "#F7DF1E", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
    { name: "Git", color: "#F05032", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
  ];

  useEffect(() => {
    setTimeout(() => setVisible(true), 300);
    
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: (Math.random() - 0.5) * 0.5,
      opacity: Math.random() * 0.5 + 0.3
    }));
    setParticles(newParticles);
  }, []);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    const speed = isDeleting ? 30 : 100;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (typedText.length < currentRole.length) {
          setTypedText(currentRole.substring(0, typedText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (typedText.length > 0) {
          setTypedText(currentRole.substring(0, typedText.length - 1));
        } else {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [typedText, isDeleting, roleIndex]);

  const handleMouseMove = (e) => {
    const x = (e.clientX / window.innerWidth) * 100;
    const y = (e.clientY / window.innerHeight) * 100;
    setMousePos({ x, y });
  };

  const stats = [
    { icon: Briefcase, value: "3+", label: "Internships", color: "#22d3ee" },
    { icon: Rocket, value: "5+", label: "Live Projects", color: "#a78bfa" },
    { icon: Award, value: "13+", label: "Certifications", color: "#34d399" }
  ];
  const handleResumeDownload = () => {
  const link = document.createElement("a");
  link.href = resumePDF;
  link.download = "Bhagavan-Resume.pdf"; // download file name
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};


  return (
    <div
      onMouseMove={handleMouseMove}
      style={{
        position: 'relative',
        minHeight: '100vh',
        background: '#000000',
        color: 'white',
        overflow: 'hidden',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        paddingTop: '80px'
      }}
    >
      {/* Animated Grid Background */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `
          linear-gradient(rgba(34, 211, 238, 0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(34, 211, 238, 0.03) 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px',
        animation: 'gridMove 20s linear infinite',
        maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)'
      }} />

      {/* Dynamic Gradient Orbs */}
      <div style={{
        position: 'absolute',
        width: '600px',
        height: '600px',
        top: `${mousePos.y - 50}%`,
        left: `${mousePos.x - 50}%`,
        background: 'radial-gradient(circle, rgba(34,211,238,0.15), transparent 70%)',
        filter: 'blur(80px)',
        transition: 'all 0.3s ease-out',
        pointerEvents: 'none'
      }} />
      
      <div style={{
        position: 'absolute',
        width: '500px',
        height: '500px',
        bottom: '10%',
        right: '10%',
        background: 'radial-gradient(circle, rgba(167,139,250,0.12), transparent 70%)',
        filter: 'blur(90px)',
        animation: 'float 15s ease-in-out infinite',
        pointerEvents: 'none'
      }} />

      {/* Floating Particles */}
      {particles.map(p => (
        <div
          key={p.id}
          style={{
            position: 'absolute',
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            borderRadius: '50%',
            background: '#22d3ee',
            opacity: p.opacity,
            boxShadow: '0 0 10px rgba(34,211,238,0.5)',
            animation: `particleFloat ${10 + p.id % 10}s ease-in-out infinite`,
            animationDelay: `${p.id * 0.1}s`
          }}
        />
      ))}

      {/* Main Content */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '4rem 1.5rem',
        minHeight: 'calc(100vh - 80px)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }}>
        
        {/* Status Badge */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '10px',
          padding: '12px 24px',
          borderRadius: '100px',
          background: 'rgba(34,211,238,0.1)',
          border: '1px solid rgba(34,211,238,0.3)',
          backdropFilter: 'blur(20px)',
          marginBottom: '2rem',
          alignSelf: 'flex-start',
          animation: 'glow 3s ease-in-out infinite',
          fontSize: 'clamp(0.75rem, 2vw, 0.875rem)',
          fontWeight: '700',
          letterSpacing: '1.5px'
        }}>
          <div style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: '#22d3ee',
            boxShadow: '0 0 10px #22d3ee',
            animation: 'pulse 2s ease-in-out infinite'
          }} />
          <span style={{ color: '#22d3ee' }}>AVAILABLE FOR 2026</span>
        </div>

        {/* Main Hero Section */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: window.innerWidth < 1024 ? '1fr' : '1fr 1fr',
          gap: 'clamp(3rem, 6vw, 5rem)',
          alignItems: 'center'
        }}>
          
          {/* Left Content */}
          <div style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateX(0)' : 'translateX(-50px)',
            transition: 'all 1s cubic-bezier(0.34, 1.56, 0.64, 1)',
            order: window.innerWidth < 1024 ? 2 : 1
          }}>
            
            {/* Name */}
            <h1 style={{
              fontSize: 'clamp(2.5rem, 8vw, 6rem)',
              fontWeight: '900',
              lineHeight: 1.1,
              marginBottom: '1rem',
              letterSpacing: '-0.02em'
            }}>
              <div style={{
                background: 'linear-gradient(135deg, #ffffff 0%, #22d3ee 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                marginBottom: '0.5rem'
              }}>
                SIVA SATYA SAI
              </div>
              <div style={{
                background: 'linear-gradient(135deg, #22d3ee 0%, #a78bfa 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                BHAGAVAN
              </div>
            </h1>

            {/* Typing Effect */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '2rem',
              flexWrap: 'wrap'
            }}>
              <Terminal size={window.innerWidth < 768 ? 24 : 32} color="#22d3ee" />
              <span style={{
                fontFamily: 'monospace',
                fontSize: 'clamp(1.25rem, 4vw, 2rem)',
                fontWeight: '700',
                color: '#22d3ee',
                textShadow: '0 0 20px rgba(34,211,238,0.5)'
              }}>
                {typedText}
              </span>
              <span style={{
                width: '3px',
                height: '1.5em',
                background: '#22d3ee',
                animation: 'blink 1s step-end infinite',
                boxShadow: '0 0 10px #22d3ee'
              }} />
            </div>

            {/* Description */}
            <p style={{
              fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
              color: '#9ca3af',
              lineHeight: 1.8,
              marginBottom: '2.5rem',
              maxWidth: '600px'
            }}>
              Final-year <span style={{ color: '#22d3ee', fontWeight: '600' }}>AI & Data Science</span> engineer
              crafting intelligent systems and scalable solutions with cutting-edge technology.
            </p>

            {/* Tech Stack Chips */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '12px',
              marginBottom: '3rem'
            }}>
              {techStack.slice(0, 5).map((tech, i) => (
                <div
                  key={i}
                  style={{
                    padding: '10px 18px',
                    borderRadius: '12px',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    backdropFilter: 'blur(10px)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: 'clamp(0.875rem, 2vw, 1rem)',
                    fontWeight: '600',
                    color: tech.color,
                    animation: `fadeInUp 0.6s ease-out ${i * 0.1}s both`,
                    transition: 'all 0.3s ease',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px) scale(1.05)';
                    e.currentTarget.style.borderColor = tech.color;
                    e.currentTarget.style.boxShadow = `0 8px 25px ${tech.color}40`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div style={{ width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <img src={tech.url} alt={tech.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                  </div>
                  {tech.name}
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1rem'
            }}>
              <button
                style={{
                  padding: 'clamp(14px, 3vw, 18px) clamp(28px, 5vw, 40px)',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #22d3ee, #06b6d4)',
                  color: 'white',
                  fontWeight: '700',
                  fontSize: 'clamp(1rem, 2.5vw, 1.125rem)',
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 10px 40px rgba(34,211,238,0.3)',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 15px 50px rgba(34,211,238,0.5)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 10px 40px rgba(34,211,238,0.3)';
                }}
              >
                View Projects
                <ChevronRight size={20} />
              </button>

              <button
                style={{
                  padding: 'clamp(14px, 3vw, 18px) clamp(28px, 5vw, 40px)',
                  borderRadius: '12px',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(34,211,238,0.5)',
                  backdropFilter: 'blur(10px)',
                  color: '#22d3ee',
                  fontWeight: '700',
                  fontSize: 'clamp(1rem, 2.5vw, 1.125rem)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(34,211,238,0.1)';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <Download size={20} />
                Download Resume
              </button>
            </div>
          </div>

          {/* Right - Square Profile with Orbiting Tech Icons */}
          <div style={{
            position: 'relative',
            opacity: visible ? 1 : 0,
            transform: visible ? 'scale(1)' : 'scale(0.8)',
            transition: 'all 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) 0.3s',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '600px',
            order: window.innerWidth < 1024 ? 1 : 2,
            padding: '2rem'
          }}>
            
            {/* Animated Square Borders - Multiple Layers */}
            {[0, 1, 2].map((i) => (
              <div
                key={`border-${i}`}
                style={{
                  position: 'absolute',
                  width: `${320 + i * 60}px`,
                  height: `${320 + i * 60}px`,
                  border: `2px solid ${i === 0 ? 'rgba(34,211,238,0.5)' : i === 1 ? 'rgba(168,139,250,0.4)' : 'rgba(52,211,153,0.3)'}`,
                  borderRadius: '28px',
                  animation: `spinSquare ${20 + i * 10}s linear infinite ${i % 2 === 0 ? '' : 'reverse'}`,
                  boxShadow: `0 0 40px ${i === 0 ? 'rgba(34,211,238,0.3)' : i === 1 ? 'rgba(168,139,250,0.2)' : 'rgba(52,211,153,0.15)'}`
                }}
              />
            ))}

            {/* Corner Accent Borders */}
            {[0, 1].map((i) => (
              <div
                key={`accent-${i}`}
                style={{
                  position: 'absolute',
                  width: `${380 + i * 40}px`,
                  height: `${380 + i * 40}px`,
                  border: '2px solid transparent',
                  borderRadius: '32px',
                  borderTop: `2px solid rgba(${i === 0 ? '34,211,238' : '168,139,250'},0.6)`,
                  borderRight: `2px solid rgba(${i === 0 ? '34,211,238' : '168,139,250'},0.6)`,
                  animation: `spinSquare ${15 + i * 8}s linear infinite ${i === 0 ? 'reverse' : ''}`,
                  opacity: 0.5
                }}
              />
            ))}

            {/* Orbiting Tech Icons */}
            <div style={{ 
              position: 'absolute', 
              width: '100%', 
              height: '100%',
              maxWidth: '600px',
              maxHeight: '600px'
            }}>
              {techStack.map((tech, i) => {
                const angle = (i / techStack.length) * Math.PI * 2;
                const radius = window.innerWidth < 768 ? 200 : 280;
                return (
                  <div
                    key={i}
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      width: 'clamp(64px, 8vw, 80px)',
                      height: 'clamp(64px, 8vw, 80px)',
                      transform: `translate(-50%, -50%)`,
                      animation: `orbit 25s linear infinite`,
                      animationDelay: `${-i * (25 / techStack.length)}s`,
                    }}
                  >
                    <div style={{
                      width: '100%',
                      height: '100%',
                      borderRadius: '18px',
                      background: 'rgba(10,10,25,0.95)',
                      backdropFilter: 'blur(20px)',
                      border: `2px solid ${tech.color}50`,
                      boxShadow: `0 10px 40px ${tech.color}40, inset 0 0 20px ${tech.color}15`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '14px',
                      transition: 'all 0.4s ease',
                      cursor: 'pointer',
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.2)';
                        e.currentTarget.style.boxShadow = `0 15px 50px ${tech.color}70, inset 0 0 30px ${tech.color}40`;
                        e.currentTarget.style.borderColor = tech.color;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                        e.currentTarget.style.boxShadow = `0 10px 40px ${tech.color}40, inset 0 0 20px ${tech.color}15`;
                        e.currentTarget.style.borderColor = `${tech.color}50`;
                      }}
                    >
                      <div style={{
                        position: 'absolute',
                        inset: 0,
                        background: `linear-gradient(135deg, transparent, ${tech.color}15)`,
                        animation: 'shimmer 3s ease-in-out infinite'
                      }} />
                      <img 
                        src={tech.url} 
                        alt={tech.name}
                        style={{ 
                          width: '100%', 
                          height: '100%', 
                          objectFit: 'contain',
                          filter: `drop-shadow(0 0 8px ${tech.color})`,
                          position: 'relative',
                          zIndex: 1
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Central Square Profile Image */}
            <div style={{
              position: 'relative',
              width: 'clamp(300px, 40vw, 380px)',
              height: 'clamp(300px, 40vw, 380px)',
              borderRadius: '24px',
              overflow: 'hidden',
              border: '4px solid rgba(34,211,238,0.6)',
              boxShadow: '0 0 60px rgba(34,211,238,0.5), inset 0 0 40px rgba(34,211,238,0.15)',
              background: 'linear-gradient(135deg, rgba(34,211,238,0.15), rgba(167,139,250,0.15))',
              animation: 'profileFloat 6s ease-in-out infinite',
              zIndex: 5
            }}>
              {/* Shimmer Effect */}
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                backgroundSize: '200% 100%',
                animation: 'shimmer 3s linear infinite',
                zIndex: 2
              }} />
              
              {/* Profile Image */}
             <img
  src={profileImage}
  alt="Siva Satya Sai Bhagavan"
  style={{
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: 'center'
  }}
/>

            </div>

            {/* Stats Cards Around Profile */}
            <div style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              maxWidth: '700px',
              maxHeight: '700px'
            }}>
              {stats.map((stat, i) => {
                const angles = [-50, 50, 180];
                const angle = angles[i] * (Math.PI / 180);
                const radius = window.innerWidth < 768 ? 180 : 260;
                const Icon = stat.icon;
                
                return (
                  <div
                    key={i}
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: `translate(-50%, -50%) translate(${Math.cos(angle) * radius}px, ${Math.sin(angle) * radius}px)`,
                      width: 'clamp(120px, 15vw, 150px)',
                      animation: `fadeInUp 0.8s ease-out ${i * 0.2 + 0.5}s both`
                    }}
                  >
                    <div
                      style={{
                        background: 'rgba(5,5,15,0.9)',
                        borderRadius: '18px',
                        border: `2px solid ${stat.color}50`,
                        boxShadow: `0 15px 40px ${stat.color}40`,
                        padding: 'clamp(1rem, 3vw, 1.5rem)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem',
                        backdropFilter: 'blur(20px)',
                        transition: 'all 0.4s ease',
                        cursor: 'pointer'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.15) translateY(-8px)';
                        e.currentTarget.style.borderColor = stat.color;
                        e.currentTarget.style.boxShadow = `0 20px 60px ${stat.color}70`;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1) translateY(0)';
                        e.currentTarget.style.borderColor = `${stat.color}50`;
                        e.currentTarget.style.boxShadow = `0 15px 40px ${stat.color}40`;
                      }}
                    >
                      <Icon size={window.innerWidth < 768 ? 28 : 36} color={stat.color} />
                      <div style={{
                        fontSize: 'clamp(1.75rem, 5vw, 2.5rem)',
                        fontWeight: '900',
                        color: stat.color,
                        textShadow: `0 0 20px ${stat.color}80`,
                        lineHeight: 1
                      }}>
                        {stat.value}
                      </div>
                      <div style={{
                        fontSize: 'clamp(0.7rem, 2vw, 0.85rem)',
                        color: '#9ca3af',
                        fontWeight: '600',
                        textAlign: 'center'
                      }}>
                        {stat.label}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Talent Badge */}
            <div style={{
              position: 'absolute',
              bottom: 'clamp(-10px, 2vw, 20px)',
              left: '50%',
              transform: 'translateX(-50%)',
              padding: 'clamp(10px, 2.5vw, 14px) clamp(20px, 4vw, 32px)',
              background: 'linear-gradient(135deg, rgba(34,211,238,0.2), rgba(168,139,250,0.2))',
              border: '2px solid rgba(34,211,238,0.5)',
              borderRadius: '100px',
              fontSize: 'clamp(0.75rem, 2vw, 0.95rem)',
              fontWeight: '800',
              color: '#22d3ee',
              backdropFilter: 'blur(20px)',
              boxShadow: '0 10px 40px rgba(34,211,238,0.4)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              animation: 'glow 4s ease-in-out infinite',
              zIndex: 10,
              whiteSpace: 'nowrap',
              letterSpacing: '1px'
            }}>
              <GraduationCap size={window.innerWidth < 768 ? 16 : 20} />
              FINAL YEAR TALENT
            </div>
          </div>
        </div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes gridMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        @keyframes particleFloat {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(20px, -30px); }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.5); opacity: 0.5; }
        }
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        @keyframes spinSquare { 
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes orbit {  
          0% { transform: translate(-50%, -50%) rotate(0deg) translateX(280px) rotate(0deg); }
          100% { transform: translate(-50%, -50%) rotate(360deg) translateX(280px) rotate(-360deg); }
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; } 
        }
        @keyframes profileFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        @keyframes fadeInUp {

          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(34,211,238,0.5); }
          50% { box-shadow: 0 0 40px rgba(34,211,238,1); }
        }
      `}</style>
    </div>
  );
}