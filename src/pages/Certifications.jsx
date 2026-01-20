import { useState, useEffect, useRef } from 'react';
import { Award, ExternalLink, Code, Cloud, Database, Terminal, Brain, Rocket, Zap, Star, Sparkles, Circle, Hexagon, Triangle } from 'lucide-react';

const certificationsData = [
  { title: "Full Stack Web Development", image: "https://lh3.googleusercontent.com/d/1AfvPfSaXHgVK9lPOsS3MUJimynH6xlog", link: "https://drive.google.com/file/d/1AfvPfSaXHgVK9lPOsS3MUJimynH6xlog/view", category: "Web", level: "Advanced", skills: ["React", "Node.js", "MongoDB"], power: 95 },
  { title: "Python Programming", image: "https://lh3.googleusercontent.com/d/1rZNRLvle0r_gUqzDjxR3_k6yApSyMxz6", link: "https://drive.google.com/file/d/1rZNRLvle0r_gUqzDjxR3_k6yApSyMxz6/view", category: "Programming", level: "Advanced", skills: ["Python", "OOP", "Algorithms"], power: 92 },
  { title: "Java Programming", image: "https://lh3.googleusercontent.com/d/1esxKzHNp_cuB7G87hs2MDeMpr2LKXucM", link: "https://drive.google.com/file/d/1esxKzHNp_cuB7G87hs2MDeMpr2LKXucM/view", category: "Programming", level: "Advanced", skills: ["Java", "Spring", "Multithreading"], power: 90 },
  { title: "AWS Cloud", image: "https://lh3.googleusercontent.com/d/17vu2Vd5QnxAHe4iEYv21ADC-Pfs-90U9", link: "https://drive.google.com/file/d/17vu2Vd5QnxAHe4iEYv21ADC-Pfs-90U9/view", category: "Cloud", level: "Professional", skills: ["AWS", "EC2", "S3"], power: 88 },
  { title: "Azure Fundamentals", image: "https://lh3.googleusercontent.com/d/1ygiQILNjBAfcZse27n_px1_tgupajlWM", link: "https://drive.google.com/file/d/1ygiQILNjBAfcZse27n_px1_tgupajlWM/view", category: "Cloud", level: "Professional", skills: ["Azure", "Cloud", "DevOps"], power: 85 },
  { title: "Data Science", image: "https://lh3.googleusercontent.com/d/1JENKEIpZkc1Mvro1mmRVyQr5u8fdUXqv", link: "https://drive.google.com/file/d/1JENKEIpZkc1Mvro1mmRVyQr5u8fdUXqv/view", category: "Data", level: "Advanced", skills: ["Python", "Pandas", "Visualization"], power: 93 },
  { title: "Machine Learning", image: "https://lh3.googleusercontent.com/d/19vV6Nyq8A418eDvQ2ezrek4pqyUBb6X6", link: "https://drive.google.com/file/d/19vV6Nyq8A418eDvQ2ezrek4pqyUBb6X6/view", category: "AI/ML", level: "Expert", skills: ["ML", "AI", "Neural Networks"], power: 98 },
  { title: "Cloud Computing", image: "https://lh3.googleusercontent.com/d/13gTq6yHm8jCOvqHKRjPpGw4hU4p7kovX", link: "https://drive.google.com/file/d/13gTq6yHm8jCOvqHKRjPpGw4hU4p7kovX/view", category: "Cloud", level: "Professional", skills: ["Cloud", "Distributed Systems"], power: 87 },
  { title: "R Programming", image: "https://lh3.googleusercontent.com/d/1vFclrkOAe3GaA8brE3c5Sjd0k5RMXwr-", link: "https://drive.google.com/file/d/1vFclrkOAe3GaA8brE3c5Sjd0k5RMXwr-/view", category: "Programming", level: "Advanced", skills: ["R", "Statistics", "Data Analysis"], power: 86 },
  { title: "Art of Programming", image: "https://lh3.googleusercontent.com/d/1SwQGo_zGZIGcTzzlMApXZU0Wt5ScyWXx", link: "https://drive.google.com/file/d/1SwQGo_zGZIGcTzzlMApXZU0Wt5ScyWXx/view", category: "Programming", level: "Advanced", skills: ["Algorithms", "Problem Solving"], power: 91 },
  { title: "Machine Learning with Python", image: "https://lh3.googleusercontent.com/d/1uaTJTnijSpjCsD_ZPHKwen9i3RDYwShK", link: "https://drive.google.com/file/d/1uaTJTnijSpjCsD_ZPHKwen9i3RDYwShK/view", category: "AI/ML", level: "Expert", skills: ["Python", "Scikit-learn", "TensorFlow"], power: 96 },
  { title: "Large Language Models", image: "https://lh3.googleusercontent.com/d/1CyN6_Bm3c68R0NkQWWTOgNAXTv27In_s", link: "https://drive.google.com/file/d/1CyN6_Bm3c68R0NkQWWTOgNAXTv27In_s/view", category: "AI/ML", level: "Expert", skills: ["LLM", "GPT", "Prompt Engineering"], power: 99 },
  { title: "React", image: "https://lh3.googleusercontent.com/d/1yy4OpoVRAX2ZGVPUH9VmorLc2kiXalYf", link: "https://drive.google.com/file/d/1yy4OpoVRAX2ZGVPUH9VmorLc2kiXalYf/view", category: "Web", level: "Advanced", skills: ["React", "Hooks", "State Management"], power: 94 },
  { title: "JavaScript", image: "https://lh3.googleusercontent.com/d/1zrscfW3cyWq59mMYsK399CRjgEjA-zbd", link: "https://drive.google.com/file/d/1zrscfW3cyWq59mMYsK399CRjgEjA-zbd/view", category: "Web", level: "Advanced", skills: ["JavaScript", "ES6+", "Async"], power: 93 },
  { title: "MLOps", image: "https://lh3.googleusercontent.com/d/1BmvjGknXs-K5wOfepFcl_CuU8DsFBApP", link: "https://drive.google.com/file/d/1BmvjGknXs-K5wOfepFcl_CuU8DsFBApP/view", category: "DevOps", level: "Professional", skills: ["MLOps", "CI/CD", "Kubernetes"], power: 89 },
  { title: "CI/CD", image: "https://lh3.googleusercontent.com/d/1xccQv29hZCWCvr-JnM-nEfE8meESrWIr", link: "https://drive.google.com/file/d/1xccQv29hZCWCvr-JnM-nEfE8meESrWIr/view", category: "DevOps", level: "Professional", skills: ["Jenkins", "GitHub Actions", "Docker"], power: 87 },
  { title: "Django", image: "https://lh3.googleusercontent.com/d/1QdiX2u-ARCZCEdEmlu4l3ChnQT-SmhKc", link: "https://drive.google.com/file/d/1QdiX2u-ARCZCEdEmlu4l3ChnQT-SmhKc/view", category: "Web", level: "Advanced", skills: ["Django", "Python", "REST API"], power: 90 },
  { title: "HTML", image: "https://lh3.googleusercontent.com/d/1NYtaxfhQUfxaL4n6Vv6gJSEQMySy1gqr", link: "https://drive.google.com/file/d/1NYtaxfhQUfxaL4n6Vv6gJSEQMySy1gqr/view", category: "Web", level: "Advanced", skills: ["HTML5", "Semantic", "Accessibility"], power: 88 },
  { title: "CSS", image: "https://lh3.googleusercontent.com/d/1iC65FGw0MSmjeKIivdnrZVm3GfXOKVvE", link: "https://drive.google.com/file/d/1iC65FGw0MSmjeKIivdnrZVm3GfXOKVvE/view", category: "Web", level: "Advanced", skills: ["CSS3", "Flexbox", "Grid"], power: 89 },
];

const categoryConfig = {
  Web: { icon: Code, color: '#00ff9f', bg: 'from-emerald-500/20 to-green-500/20' },
  Programming: { icon: Terminal, color: '#ff0080', bg: 'from-pink-500/20 to-rose-500/20' },
  Cloud: { icon: Cloud, color: '#00d4ff', bg: 'from-cyan-500/20 to-blue-500/20' },
  Data: { icon: Database, color: '#ffd700', bg: 'from-yellow-500/20 to-amber-500/20' },
  "AI/ML": { icon: Brain, color: '#a855f7', bg: 'from-purple-500/20 to-violet-500/20' },
  DevOps: { icon: Rocket, color: '#ff6b35', bg: 'from-orange-500/20 to-red-500/20' }
};

export default function TalentHuntShowcase() {
  const [selectedCert, setSelectedCert] = useState(null);
  const [filter, setFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [particles, setParticles] = useState([]);
  const canvasRef = useRef(null);
  const [time, setTime] = useState(0);

  // Animated particles
  useEffect(() => {
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: (Math.random() - 0.5) * 0.5,
      opacity: Math.random() * 0.5 + 0.3,
    }));
    setParticles(newParticles);

    const interval = setInterval(() => {
      setTime(t => t + 1);
      setParticles(prev => prev.map(p => ({
        ...p,
        x: (p.x + p.speedX + 100) % 100,
        y: (p.y + p.speedY + 100) % 100,
      })));
    }, 50);

    return () => clearInterval(interval);
  }, []);

  // DNA Helix Canvas Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    let frame = 0;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // DNA Helix
      for (let i = 0; i < 100; i++) {
        const x = canvas.width / 2 + Math.sin(i * 0.1 + frame * 0.02) * 200;
        const y = i * (canvas.height / 100);
        const x2 = canvas.width / 2 + Math.sin(i * 0.1 + frame * 0.02 + Math.PI) * 200;
        
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 255, 159, ${0.3 + Math.sin(frame * 0.05 + i * 0.1) * 0.2})`;
        ctx.fill();
        
        ctx.beginPath();
        ctx.arc(x2, y, 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 0, 128, ${0.3 + Math.cos(frame * 0.05 + i * 0.1) * 0.2})`;
        ctx.fill();
        
        if (i % 10 === 0) {
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(x2, y);
          ctx.strokeStyle = 'rgba(0, 212, 255, 0.2)';
          ctx.lineWidth = 2;
          ctx.stroke();
        }
      }
      
      frame++;
      requestAnimationFrame(animate);
    };
    animate();

    return () => window.removeEventListener('resize', resize);
  }, []);

  const filteredCerts = certificationsData.filter(cert => {
    const matchesFilter = filter === "All" || cert.category === filter;
    const matchesSearch = cert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         cert.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  const avgPower = Math.round(filteredCerts.reduce((sum, c) => sum + c.power, 0) / filteredCerts.length);

  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <div style={{
      minHeight: '100vh',
      background: '#000',
      color: '#fff',
      overflow: 'hidden',
      position: 'relative',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <style>{`
        @keyframes glitch {
          0%, 100% { clip-path: inset(0 0 0 0); transform: translate(0); }
          20% { clip-path: inset(20% 0 30% 0); transform: translate(-5px, 5px); }
          40% { clip-path: inset(60% 0 10% 0); transform: translate(5px, -5px); }
          60% { clip-path: inset(10% 0 60% 0); transform: translate(-3px, 3px); }
          80% { clip-path: inset(40% 0 20% 0); transform: translate(3px, -3px); }
        }
        @keyframes dataStream {
          0% { transform: translateY(-100%); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(100vh); opacity: 0; }
        }
        @keyframes pulse3d {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
      `}</style>

      {/* DNA Helix Canvas */}
      <canvas ref={canvasRef} style={{ position: 'fixed', inset: 0, opacity: 0.2, pointerEvents: 'none', zIndex: 0 }} />

      {/* Floating Particles */}
      {particles.map(p => (
        <div
          key={p.id}
          style={{
            position: 'fixed',
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            borderRadius: '50%',
            background: `rgba(0, 212, 255, ${p.opacity})`,
            boxShadow: `0 0 ${p.size * 3}px rgba(0, 212, 255, ${p.opacity})`,
            pointerEvents: 'none',
            zIndex: 10,
            transition: 'all 0.05s linear'
          }}
        />
      ))}

      {/* Data Stream Lines */}
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          style={{
            position: 'fixed',
            left: `${20 + i * 15}%`,
            width: '2px',
            height: '80px',
            zIndex: 10,
            pointerEvents: 'none',
            background: 'linear-gradient(to bottom, transparent, #00ff9f, transparent)',
            animation: 'dataStream 3s linear infinite',
            animationDelay: `${i * 0.6}s`
          }}
        />
      ))}

      <div style={{ position: 'relative', zIndex: 20, maxWidth: '1280px', margin: '0 auto', padding: '2rem 1rem' }}>
        
        {/* Hero Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem', position: 'relative' }}>
          <div style={{ display: 'inline-block', marginBottom: '1.5rem', position: 'relative' }}>
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to right, #06b6d4, #a855f7, #ec4899)',
              filter: 'blur(60px)',
              opacity: 0.5,
              animation: 'pulse3d 3s ease-in-out infinite'
            }} />
            <h1 style={{
              fontSize: 'clamp(3rem, 15vw, 7rem)',
              fontWeight: 900,
              position: 'relative',
              background: 'linear-gradient(to right, #22d3ee, #a78bfa, #f472b6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              animation: 'glitch 0.3s infinite',
              letterSpacing: '0.05em'
            }}>
              My Certifications
            </h1>
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  background: ['#00ff9f', '#ff0080', '#00d4ff', '#ffd700', '#a855f7', '#ff6b35'][i],
                  boxShadow: `0 0 20px ${['#00ff9f', '#ff0080', '#00d4ff', '#ffd700', '#a855f7', '#ff6b35'][i]}`,
                  animation: 'pulse3d 2s ease-in-out infinite',
                  animationDelay: `${i * 0.2}s`
                }}
              />
            ))}
          </div>

          {/* Live Stats Dashboard */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: '1rem',
            maxWidth: '56rem',
            margin: '0 auto'
          }}>
            {[
              { label: 'Total Power', value: avgPower, icon: Zap, color: '#ffd700' },
              { label: 'Certifications', value: filteredCerts.length, icon: Award, color: '#00ff9f' },
              { label: 'Categories', value: Object.keys(categoryConfig).length, icon: Sparkles, color: '#ff0080' },
              { label: 'Skill Level', value: 'Expert', icon: Star, color: '#00d4ff' },
            ].map((stat, i) => (
              <div
                key={i}
                style={{
                  position: 'relative',
                  background: 'linear-gradient(135deg, #111827, #000)',
                  border: '2px solid #1f2937',
                  borderRadius: '1rem',
                  padding: '1rem',
                  perspective: '1000px',
                  transformStyle: 'preserve-3d',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'rotateY(5deg) rotateX(5deg) scale(1.05)';
                  e.currentTarget.style.borderColor = stat.color;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'none';
                  e.currentTarget.style.borderColor = '#1f2937';
                }}
              >
                <div style={{
                  width: '3rem',
                  height: '3rem',
                  margin: '0 auto 0.5rem',
                  borderRadius: '50%',
                  background: `linear-gradient(135deg, ${stat.color}, ${stat.color}80)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: `0 0 30px ${stat.color}60`
                }}>
                  <stat.icon style={{ width: '1.5rem', height: '1.5rem', color: '#fff' }} />
                </div>
                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: stat.color, marginBottom: '0.25rem' }}>
                  {stat.value}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#9ca3af', letterSpacing: '0.1em', fontWeight: 600 }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Search & Filter */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ position: 'relative', marginBottom: '1rem' }}>
            <input
              type="text"
              placeholder="Search skills, technologies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                background: 'rgba(17, 24, 39, 0.5)',
                border: '2px solid rgba(6, 182, 212, 0.3)',
                borderRadius: '0.75rem',
                padding: '1rem 1.5rem',
                fontSize: '1.125rem',
                outline: 'none',
                color: '#fff',
                transition: 'all 0.3s ease',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 0 30px rgba(0, 212, 255, 0.1)'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#06b6d4';
                e.target.style.boxShadow = '0 0 40px rgba(6, 182, 212, 0.3)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgba(6, 182, 212, 0.3)';
                e.target.style.boxShadow = '0 0 30px rgba(0, 212, 255, 0.1)';
              }}
            />
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            {['All', ...Object.keys(categoryConfig)].map(cat => {
              const config = categoryConfig[cat];
              const Icon = config?.icon || Code;
              const isActive = filter === cat;
              
              return (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  style={{
                    padding: '0.75rem 1.5rem',
                    borderRadius: '0.75rem',
                    fontWeight: 700,
                    fontSize: '0.875rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    transition: 'all 0.3s ease',
                    border: `2px solid ${isActive ? config?.color : '#374151'}`,
                    background: isActive 
                      ? `linear-gradient(135deg, ${config?.color}20, ${config?.color}10)`
                      : 'rgba(17, 24, 39, 0.3)',
                    color: isActive ? config?.color : '#fff',
                    boxShadow: isActive ? `0 0 30px ${config?.color}40` : 'none',
                    transform: isActive ? 'scale(1.1)' : 'scale(1)',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) e.currentTarget.style.borderColor = '#6b7280';
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) e.currentTarget.style.borderColor = '#374151';
                  }}
                >
                  {cat !== 'All' && <Icon style={{ width: '1rem', height: '1rem' }} />}
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Certification Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 320px), 1fr))',
          gap: '1.5rem'
        }}>
          {filteredCerts.map((cert, idx) => {
            const config = categoryConfig[cert.category];
            const isHovered = hoveredCard === idx;
            
            return (
              <div
                key={idx}
                style={{
                  position: 'relative',
                  perspective: '1000px',
                  transformStyle: 'preserve-3d',
                  cursor: 'pointer'
                }}
                onMouseEnter={() => setHoveredCard(idx)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => window.open(cert.link, '_blank')}
              >
                <div style={{
                  position: 'relative',
                  background: 'linear-gradient(135deg, #111827, #000)',
                  borderRadius: '1rem',
                  overflow: 'hidden',
                  border: `2px solid ${isHovered ? config.color + '80' : '#1f2937'}`,
                  transition: 'all 0.3s ease',
                  transform: isHovered ? 'rotateY(5deg) rotateX(2deg) scale(1.03)' : 'none',
                  transformStyle: 'preserve-3d'
                }}>
                  {/* Power Bar */}
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '4px',
                    background: '#1f2937',
                    zIndex: 20
                  }}>
                    <div style={{
                      height: '100%',
                      width: `${cert.power}%`,
                      background: `linear-gradient(90deg, ${config.color}, ${config.color}80)`,
                      boxShadow: `0 0 10px ${config.color}`,
                      transition: 'width 1s ease'
                    }} />
                  </div>

                  {/* Image */}
                  <div style={{ position: 'relative', height: '12rem', overflow: 'hidden' }}>
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to top, #000, transparent)',
                      zIndex: 10
                    }} />
                    <img 
                      src={cert.image} 
                      alt={cert.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.5s ease',
                        transform: isHovered ? 'scale(1.1)' : 'scale(1)'
                      }}
                    />
                    
                    {/* Category Badge */}
                    <div style={{
                      position: 'absolute',
                      top: '1rem',
                      right: '1rem',
                      padding: '0.5rem 0.75rem',
                      borderRadius: '9999px',
                      backdropFilter: 'blur(10px)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      zIndex: 20,
                      background: `${config.color}20`,
                      border: `1px solid ${config.color}`,
                      boxShadow: `0 0 20px ${config.color}40`
                    }}>
                      <config.icon style={{ width: '1rem', height: '1rem', color: config.color }} />
                      <span style={{ fontSize: '0.75rem', fontWeight: 'bold', color: config.color }}>
                        {cert.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div style={{ padding: '1.25rem' }}>
                    <h3 style={{
                      fontSize: '1.25rem',
                      fontWeight: 'bold',
                      marginBottom: '0.5rem',
                      color: isHovered ? '#22d3ee' : '#fff',
                      transition: 'color 0.3s ease'
                    }}>
                      {cert.title}
                    </h3>
                    
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '0.75rem'
                    }}>
                      <span style={{ fontSize: '0.875rem', fontWeight: 600, color: config.color }}>
                        {cert.level}
                      </span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <Zap style={{ width: '1rem', height: '1rem', color: '#fbbf24' }} />
                        <span style={{ fontSize: '0.875rem', fontWeight: 'bold', color: '#fbbf24' }}>
                          {cert.power}
                        </span>
                      </div>
                    </div>

                    <div style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '0.5rem',
                      marginBottom: '1rem'
                    }}>
                      {cert.skills.map((skill, i) => (
                        <span 
                          key={i}
                          style={{
                            fontSize: '0.75rem',
                            padding: '0.375rem 0.625rem',
                            borderRadius: '0.5rem',
                            background: 'rgba(31, 41, 55, 0.5)',
                            color: '#d1d5db',
                            border: '1px solid #374151'
                          }}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'flex-end',
                      gap: isHovered ? '0.75rem' : '0.5rem',
                      color: '#22d3ee',
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      transition: 'gap 0.3s ease'
                    }}>
                      <span>View Certificate</span>
                      <ExternalLink style={{ width: '1rem', height: '1rem' }} />
                    </div>
                  </div>

                  {/* Glow Effect */}
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: `radial-gradient(circle at center, ${config.color}15, transparent 70%)`,
                    opacity: isHovered ? 1 : 0,
                    transition: 'opacity 0.3s ease',
                    pointerEvents: 'none'
                  }} />
                </div>
              </div>
            );
          })}
        </div>

        {filteredCerts.length === 0 && (
          <div style={{ textAlign: 'center', padding: '5rem 0' }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🔍</div>
            <p style={{ fontSize: '1.5rem', color: '#9ca3af' }}>No certifications found</p>
          </div>
        )}
      </div>
    </div>
  );
}