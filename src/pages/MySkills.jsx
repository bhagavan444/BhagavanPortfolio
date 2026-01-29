import React, { useState, useEffect, useRef } from 'react';

const skills = [
  {
    id: 1,
    category: "Full-Stack",
    title: "Full-Stack Development (MERN)",
    level: 82,
    projects: 2,
    experience: "Internship experience",
    color: "#06b6d4",
    emoji: "💻",
    techs: [
      { name: "React", icon: "devicon-react-original colored" },
      { name: "Node.js", icon: "devicon-nodejs-plain colored" },
      { name: "MongoDB", icon: "devicon-mongodb-plain colored" },
      { name: "Express", icon: "devicon-express-original" },
      { name: "JWT", icon: "devicon-json-plain" },
      { name: "OAuth", icon: "devicon-google-plain colored" },
      { name: "REST API", icon: "devicon-nodejs-plain" }
    ],
    metrics: { apps: 2, auth: "OAuth/JWT", db: "MongoDB Atlas" },
    achievements: [
      "Built ATS-friendly Resume Builder with PDF & Word export",
      "Implemented secure OAuth-based authentication",
      "Improved frontend–backend data flow using REST APIs"
    ]
  },

  {
    id: 2,
    category: "AI/ML",
    title: "Machine Learning",
    level: 80,
    projects: 2,
    experience: "Internship experience",
    color: "#a855f7",
    emoji: "🧠",
    techs: [
      { name: "Python", icon: "devicon-python-plain colored" },
      { name: "Scikit-learn", icon: "devicon-scikitlearn-plain colored" },
      { name: "Pandas", icon: "devicon-pandas-original colored" },
      { name: "NumPy", icon: "devicon-numpy-plain colored" },
      { name: "TF-IDF", icon: "devicon-python-plain colored" },
      { name: "NLP", icon: "devicon-python-plain colored" }
    ],
    metrics: { models: 4, datasets: "Medium", accuracy: "High" },
    achievements: [
      "Built Fake News Detection using TF-IDF & ML models",
      "Performed data preprocessing and feature engineering",
      "Evaluated ML models during Blackbucks internship"
    ]
  },

  {
    id: 3,
    category: "Deep Learning",
    title: "Deep Learning & Computer Vision",
    level: 78,
    projects: 2,
    experience: "Internship experience",
    color: "#3b82f6",
    emoji: "🤖",
    techs: [
      { name: "TensorFlow", icon: "devicon-tensorflow-original colored" },
      { name: "Keras", icon: "devicon-keras-plain colored" },
      { name: "Python", icon: "devicon-python-plain colored" },
      { name: "CNN", icon: "devicon-python-plain colored" },
      { name: "OpenCV", icon: "devicon-opencv-plain colored" },
      { name: "Flask", icon: "devicon-flask-original" }
    ],
    metrics: { models: 3, deployment: "Flask", accuracy: "90%+" },
    achievements: [
      "Built CNN-based image classification models",
      "Deployed deep learning models using Flask",
      "Worked on real-time inference pipelines"
    ]
  },

  {
    id: 4,
    category: "Data Science",
    title: "Data Science & Analytics",
    level: 76,
    projects: 2,
    experience: "Internship experience",
    color: "#f97316",
    emoji: "📊",
    techs: [
      { name: "Python", icon: "devicon-python-plain colored" },
      { name: "Pandas", icon: "devicon-pandas-original colored" },
      { name: "NumPy", icon: "devicon-numpy-plain colored" },
      { name: "Jupyter", icon: "devicon-jupyter-plain colored" },
      { name: "SQL", icon: "devicon-mysql-plain colored" }
    ],
    metrics: { analysis: "Data-driven", reports: "Multiple", tools: "Python" },
    achievements: [
      "Performed data analysis during ML & DS internship",
      "Created cleaned datasets for model training",
      "Extracted insights from structured data"
    ]
  },

  {
    id: 5,
    category: "Programming",
    title: "Core Programming & CS Fundamentals",
    level: 85,
    projects: 5,
    experience: "Fresher",
    color: "#8b5cf6",
    emoji: "⚡",
    techs: [
      { name: "Python", icon: "devicon-python-plain colored" },
      { name: "Java", icon: "devicon-java-plain colored" },
      { name: "SQL", icon: "devicon-mysql-plain colored" },
      { name: "JavaScript", icon: "devicon-javascript-plain colored" }
    ],
    metrics: { dsa: "Basics", oop: "Strong", problemSolving: "Good" },
    achievements: [
      "Strong foundation in OOP and problem solving",
      "Hands-on experience with DSA basics",
      "Used programming skills across all projects"
    ]
  },

  {
    id: 6,
    category: "Cloud & DevOps",
    title: "Cloud & DevOps (Basics)",
    level: 70,
    projects: 2,
    experience: "Basic hands-on",
    color: "#10b981",
    emoji: "☁️",
    techs: [
      { name: "AWS EC2", icon: "devicon-amazonwebservices-plain colored" },
      { name: "AWS S3", icon: "devicon-amazonwebservices-plain colored" },
      { name: "Docker", icon: "devicon-docker-plain colored" },
      { name: "Git", icon: "devicon-git-plain colored" },
      { name: "GitHub Actions", icon: "devicon-github-original" },
      { name: "Linux", icon: "devicon-linux-plain" }
    ],
    metrics: { cloud: "Basics", ci: "GitHub Actions", os: "Linux" },
    achievements: [
      "Used AWS EC2 & S3 for basic deployments",
      "Containerized applications using Docker",
      "Implemented CI workflows with GitHub Actions"
    ]
  }
];


export default function UltimateSkillsShowcase() {
  const [viewMode, setViewMode] = useState('grid');
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [hoveredTech, setHoveredTech] = useState(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    for (let i = 0; i < 100; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 2.5 + 0.5
      });
    }

    let animationId;
    const animate = () => {
      ctx.fillStyle = 'rgba(3, 7, 18, 0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        particles.forEach((other, j) => {
          if (i < j) {
            const dx = p.x - other.x;
            const dy = p.y - other.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 100) {
              ctx.strokeStyle = `rgba(139, 92, 246, ${0.2 * (1 - dist / 100)})`;
              ctx.lineWidth = 0.8;
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(other.x, other.y);
              ctx.stroke();
            }
          }
        });

        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
        gradient.addColorStop(0, 'rgba(139, 92, 246, 0.8)');
        gradient.addColorStop(1, 'rgba(139, 92, 246, 0)');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationId = requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const renderGridView = (skill, index) => {
    const isHovered = hoveredSkill === skill.id;
    const isSelected = selectedSkill === skill.id;
    
    return (
      <div
        key={skill.id}
        style={{
          background: 'linear-gradient(135deg, rgba(17, 24, 39, 0.95), rgba(31, 41, 55, 0.85))',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: isHovered ? `2px solid ${skill.color}` : '2px solid rgba(55, 65, 81, 0.6)',
          borderRadius: '28px',
          padding: '32px',
          position: 'relative',
          overflow: 'hidden',
          transform: isHovered ? 'translateY(-12px) scale(1.02)' : 'translateY(0) scale(1)',
          boxShadow: isHovered 
            ? `0 30px 60px -12px ${skill.color}40, 0 0 0 1px ${skill.color}20, inset 0 1px 0 rgba(255,255,255,0.1)` 
            : '0 10px 30px -10px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)',
          transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
          cursor: 'pointer',
          animation: `slideUp 0.6s ease-out ${index * 0.08}s both`,
          minHeight: '520px',
          display: 'flex',
          flexDirection: 'column'
        }}
        onMouseEnter={() => setHoveredSkill(skill.id)}
        onMouseLeave={() => setHoveredSkill(null)}
        onClick={() => setSelectedSkill(isSelected ? null : skill.id)}
      >
        {/* Animated gradient overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(circle at 50% 0%, ${skill.color}15, transparent 70%)`,
          opacity: isHovered ? 1 : 0,
          transition: 'opacity 0.5s ease',
          pointerEvents: 'none',
          zIndex: 1
        }} />

        {/* Top glow line */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '2px',
          background: `linear-gradient(90deg, transparent, ${skill.color}, transparent)`,
          opacity: isHovered ? 1 : 0,
          transition: 'opacity 0.5s ease',
          boxShadow: `0 0 20px ${skill.color}`
        }} />

        <div style={{ position: 'relative', zIndex: 2, flex: 1, display: 'flex', flexDirection: 'column' }}>
          {/* Header */}
          <div style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            marginBottom: '24px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flex: 1 }}>
              <div style={{
                width: '88px',
                height: '88px',
                background: `linear-gradient(135deg, ${skill.color}25, ${skill.color}05)`,
                borderRadius: '22px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '48px',
                border: `2px solid ${skill.color}30`,
                boxShadow: isHovered ? `0 10px 40px ${skill.color}40, inset 0 1px 0 rgba(255,255,255,0.1)` : 'none',
                transform: isHovered ? 'scale(1.1) rotate(5deg)' : 'scale(1) rotate(0deg)',
                transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                position: 'relative'
              }}>
                {skill.emoji}
                <div style={{
                  position: 'absolute',
                  inset: '-4px',
                  borderRadius: '22px',
                  background: `linear-gradient(135deg, ${skill.color}40, transparent)`,
                  opacity: isHovered ? 1 : 0,
                  transition: 'opacity 0.4s ease',
                  zIndex: -1,
                  filter: 'blur(12px)'
                }} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{
                  fontSize: '11px',
                  fontFamily: 'JetBrains Mono, monospace',
                  color: skill.color,
                  fontWeight: 700,
                  letterSpacing: '2px',
                  marginBottom: '8px',
                  textTransform: 'uppercase',
                  opacity: 0.9
                }}>
                  {skill.category}
                </div>
                <h3 style={{
                  fontSize: '26px',
                  fontWeight: 800,
                  color: '#ffffff',
                  marginBottom: '8px',
                  lineHeight: 1.2,
                  letterSpacing: '-0.5px'
                }}>
                  {skill.title}
                </h3>
                <div style={{
                  fontSize: '13px',
                  color: 'rgba(156, 163, 175, 0.9)',
                  fontWeight: 500,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <div style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: skill.color,
                    boxShadow: `0 0 10px ${skill.color}`
                  }} />
                  {skill.experience}
                </div>
              </div>
            </div>

            {/* Level badge */}
            <div style={{
              background: skill.color,
              color: '#000000',
              padding: '12px 20px',
              borderRadius: '100px',
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '18px',
              fontWeight: 900,
              boxShadow: isHovered 
                ? `0 8px 24px ${skill.color}60, 0 0 0 4px ${skill.color}20` 
                : `0 4px 12px ${skill.color}40`,
              transform: isHovered ? 'scale(1.1)' : 'scale(1)',
              transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
              letterSpacing: '0.5px'
            }}>
              {skill.level}%
            </div>
          </div>

          {/* Circular progress */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: '28px',
            position: 'relative'
          }}>
            <svg width="160" height="160" style={{ transform: 'rotate(-90deg)' }}>
              <defs>
                <linearGradient id={`gradient-${skill.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: skill.color, stopOpacity: 1 }} />
                  <stop offset="100%" style={{ stopColor: skill.color, stopOpacity: 0.4 }} />
                </linearGradient>
                <filter id={`glow-${skill.id}`}>
                  <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              <circle
                cx="80"
                cy="80"
                r="70"
                fill="none"
                stroke="rgba(55, 65, 81, 0.4)"
                strokeWidth="12"
              />
              <circle
                cx="80"
                cy="80"
                r="70"
                fill="none"
                stroke={`url(#gradient-${skill.id})`}
                strokeWidth="12"
                strokeLinecap="round"
                strokeDasharray={440}
                strokeDashoffset={440 - (440 * (isHovered ? skill.level : 0) / 100)}
                style={{
                  transition: 'stroke-dashoffset 1.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  filter: `url(#glow-${skill.id})`
                }}
              />
            </svg>
            <div style={{
              position: 'absolute',
              textAlign: 'center'
            }}>
              <div style={{
                fontSize: '36px',
                fontWeight: 900,
                color: skill.color,
                fontFamily: 'JetBrains Mono, monospace',
                lineHeight: 1,
                textShadow: `0 0 20px ${skill.color}60`
              }}>
                {skill.level}
              </div>
              <div style={{
                fontSize: '14px',
                color: 'rgba(156, 163, 175, 0.8)',
                fontWeight: 600,
                marginTop: '4px',
                letterSpacing: '1px'
              }}>
                EXPERT
              </div>
            </div>
          </div>

          {/* Metrics */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '12px',
            marginBottom: '24px'
          }}>
            {Object.entries(skill.metrics).map(([key, value], idx) => (
              <div
                key={key}
                style={{
                  background: 'rgba(0, 0, 0, 0.3)',
                  border: '1px solid rgba(55, 65, 81, 0.5)',
                  borderRadius: '16px',
                  padding: '16px 12px',
                  textAlign: 'center',
                  transition: 'all 0.3s ease',
                  transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
                  transitionDelay: `${idx * 0.05}s`
                }}
              >
                <div style={{
                  fontSize: '22px',
                  fontWeight: 900,
                  color: skill.color,
                  marginBottom: '6px',
                  fontFamily: 'JetBrains Mono, monospace'
                }}>
                  {value}
                </div>
                <div style={{
                  fontSize: '10px',
                  color: 'rgba(156, 163, 175, 0.8)',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}>
                  {key}
                </div>
              </div>
            ))}
          </div>

          {/* Tech stack - scrollable */}
          <div style={{
            background: 'rgba(0, 0, 0, 0.25)',
            border: '1px solid rgba(55, 65, 81, 0.4)',
            borderRadius: '18px',
            padding: '20px',
            marginBottom: '20px'
          }}>
            <div style={{
              fontSize: '11px',
              fontFamily: 'JetBrains Mono, monospace',
              color: 'rgba(156, 163, 175, 0.9)',
              fontWeight: 700,
              letterSpacing: '1.5px',
              marginBottom: '16px',
              textTransform: 'uppercase',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <div style={{
                width: '4px',
                height: '4px',
                borderRadius: '50%',
                background: skill.color,
                boxShadow: `0 0 8px ${skill.color}`
              }} />
              Tech Stack
            </div>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '10px',
              maxHeight: '140px',
              overflowY: 'auto',
              overflowX: 'hidden',
              paddingRight: '8px'
            }}>
              {skill.techs.map((tech, idx) => (
                <div
                  key={tech.name}
                  style={{
                    background: hoveredTech === `${skill.id}-${tech.name}` 
                      ? `${skill.color}20` 
                      : 'rgba(31, 41, 55, 0.6)',
                    border: hoveredTech === `${skill.id}-${tech.name}` 
                      ? `1px solid ${skill.color}60` 
                      : '1px solid rgba(55, 65, 81, 0.5)',
                    borderRadius: '12px',
                    padding: '10px 14px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                    cursor: 'default',
                    transform: hoveredTech === `${skill.id}-${tech.name}` 
                      ? 'translateY(-3px) scale(1.05)' 
                      : 'translateY(0) scale(1)',
                    boxShadow: hoveredTech === `${skill.id}-${tech.name}` 
                      ? `0 8px 16px ${skill.color}30` 
                      : 'none',
                    animation: `slideUp 0.4s ease-out ${idx * 0.03}s both`
                  }}
                  onMouseEnter={() => setHoveredTech(`${skill.id}-${tech.name}`)}
                  onMouseLeave={() => setHoveredTech(null)}
                >
                  <i 
                    className={tech.icon}
                    style={{
                      fontSize: '22px',
                      transition: 'transform 0.3s ease',
                      transform: hoveredTech === `${skill.id}-${tech.name}` 
                        ? 'scale(1.2) rotate(5deg)' 
                        : 'scale(1) rotate(0deg)'
                    }}
                  />
                  <span style={{
                    fontSize: '13px',
                    fontWeight: 600,
                    color: hoveredTech === `${skill.id}-${tech.name}` ? '#ffffff' : 'rgba(209, 213, 219, 0.9)',
                    transition: 'color 0.3s ease'
                  }}>
                    {tech.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Expandable achievements */}
          {isSelected && (
            <div style={{
              background: `linear-gradient(135deg, ${skill.color}15, ${skill.color}05)`,
              border: `1px solid ${skill.color}30`,
              borderRadius: '18px',
              padding: '20px',
              animation: 'slideUp 0.4s ease-out'
            }}>
              <div style={{
                fontSize: '11px',
                fontFamily: 'JetBrains Mono, monospace',
                color: skill.color,
                fontWeight: 700,
                letterSpacing: '1.5px',
                marginBottom: '14px',
                textTransform: 'uppercase',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                🏆 Key Achievements
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {skill.achievements.map((achievement, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '12px',
                      fontSize: '14px',
                      color: 'rgba(229, 231, 235, 0.95)',
                      lineHeight: 1.6,
                      animation: `slideUp 0.3s ease-out ${idx * 0.1}s both`
                    }}
                  >
                    <div style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      background: skill.color,
                      marginTop: '8px',
                      flexShrink: 0,
                      boxShadow: `0 0 8px ${skill.color}`
                    }} />
                    <span>{achievement}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderListView = (skill, index) => {
    const isHovered = hoveredSkill === skill.id;
    
    return (
      <div
        key={skill.id}
        style={{
          background: 'linear-gradient(135deg, rgba(17, 24, 39, 0.95), rgba(31, 41, 55, 0.85))',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: isHovered ? `2px solid ${skill.color}` : '2px solid rgba(55, 65, 81, 0.6)',
          borderLeft: `6px solid ${skill.color}`,
          borderRadius: '24px',
          padding: '28px',
          display: 'flex',
          alignItems: 'center',
          gap: '32px',
          transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
          transform: isHovered ? 'translateX(12px)' : 'translateX(0)',
          boxShadow: isHovered 
            ? `0 20px 40px -12px ${skill.color}40, 0 0 0 1px ${skill.color}20` 
            : '0 8px 24px -8px rgba(0,0,0,0.3)',
          cursor: 'pointer',
          animation: `slideUp 0.5s ease-out ${index * 0.06}s both`,
          position: 'relative',
          overflow: 'hidden'
        }}
        onMouseEnter={() => setHoveredSkill(skill.id)}
        onMouseLeave={() => setHoveredSkill(null)}
        onClick={() => setSelectedSkill(selectedSkill === skill.id ? null : skill.id)}
      >
        {/* Glow effect */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(circle at 0% 50%, ${skill.color}15, transparent 60%)`,
          opacity: isHovered ? 1 : 0,
          transition: 'opacity 0.5s ease',
          pointerEvents: 'none'
        }} />

        {/* Icon */}
        <div style={{
          width: '80px',
          height: '80px',
          background: `linear-gradient(135deg, ${skill.color}25, ${skill.color}05)`,
          borderRadius: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '44px',
          border: `2px solid ${skill.color}30`,
          flexShrink: 0,
          position: 'relative',
          zIndex: 1,
          transform: isHovered ? 'scale(1.15) rotate(-5deg)' : 'scale(1) rotate(0deg)',
          transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
          boxShadow: isHovered ? `0 10px 30px ${skill.color}40` : 'none'
        }}>
          {skill.emoji}
        </div>

        {/* Content */}
        <div style={{ flex: 1, position: 'relative', zIndex: 1 }}>
          <div style={{
            fontSize: '11px',
            fontFamily: 'JetBrains Mono, monospace',
            color: skill.color,
            fontWeight: 700,
            letterSpacing: '2px',
            marginBottom: '8px',
            textTransform: 'uppercase'
          }}>
            {skill.category}
          </div>
          <h3 style={{
            fontSize: '28px',
            fontWeight: 800,
            color: '#ffffff',
            marginBottom: '10px',
            letterSpacing: '-0.5px'
          }}>
            {skill.title}
          </h3>
          <p style={{
            fontSize: '15px',
            color: 'rgba(156, 163, 175, 0.9)',
            lineHeight: 1.6,
            marginBottom: '16px'
          }}>
            {skill.achievements[0]}
          </p>
          
          {/* Tech icons inline */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '10px',
            alignItems: 'center'
          }}>
            {skill.techs.slice(0, 6).map((tech) => (
              <div
                key={tech.name}
                style={{
                  width: '42px',
                  height: '42px',
                  background: 'rgba(31, 41, 55, 0.6)',
                  border: '1px solid rgba(55, 65, 81, 0.5)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.3s ease'
                }}
                title={tech.name}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = `${skill.color}20`;
                  e.currentTarget.style.borderColor = `${skill.color}60`;
                  e.currentTarget.style.transform = 'translateY(-3px) scale(1.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(31, 41, 55, 0.6)';
                  e.currentTarget.style.borderColor = 'rgba(55, 65, 81, 0.5)';
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                }}
              >
                <i className={tech.icon} style={{ fontSize: '24px' }} />
              </div>
            ))}
            {skill.techs.length > 6 && (
              <div style={{
                padding: '10px 16px',
                background: 'rgba(31, 41, 55, 0.6)',
                border: '1px solid rgba(55, 65, 81, 0.5)',
                borderRadius: '12px',
                fontSize: '13px',
                color: skill.color,
                fontWeight: 600
              }}>
                +{skill.techs.length - 6}
              </div>
            )}
          </div>
        </div>

        {/* Stats */}
        <div style={{
          display: 'flex',
          gap: '24px',
          position: 'relative',
          zIndex: 1,
          flexShrink: 0
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              fontSize: '32px',
              fontWeight: 900,
              color: skill.color,
              fontFamily: 'JetBrains Mono, monospace',
              lineHeight: 1
            }}>
              {skill.level}%
            </div>
            <div style={{
              fontSize: '11px',
              color: 'rgba(156, 163, 175, 0.8)',
              fontWeight: 600,
              marginTop: '6px',
              letterSpacing: '1px',
              textTransform: 'uppercase'
            }}>
              Level
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              fontSize: '32px',
              fontWeight: 900,
              color: skill.color,
              fontFamily: 'JetBrains Mono, monospace',
              lineHeight: 1
            }}>
              {skill.projects}
            </div>
            <div style={{
              fontSize: '11px',
              color: 'rgba(156, 163, 175, 0.8)',
              fontWeight: 600,
              marginTop: '6px',
              letterSpacing: '1px',
              textTransform: 'uppercase'
            }}>
              Projects
            </div>
          </div>
        </div>

        {/* Badge */}
        <div style={{
          background: skill.color,
          color: '#000000',
          padding: '12px 20px',
          borderRadius: '100px',
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '13px',
          fontWeight: 900,
          letterSpacing: '1px',
          textTransform: 'uppercase',
          flexShrink: 0,
          position: 'relative',
          zIndex: 1,
          boxShadow: `0 4px 16px ${skill.color}60`
        }}>
          Expert
        </div>
      </div>
    );
  };

  const renderCompactView = (skill, index) => {
    const isHovered = hoveredSkill === skill.id;
    
    return (
      <div
        key={skill.id}
        style={{
          background: 'linear-gradient(135deg, rgba(17, 24, 39, 0.95), rgba(31, 41, 55, 0.85))',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: isHovered ? `2px solid ${skill.color}` : '2px solid rgba(55, 65, 81, 0.6)',
          borderRadius: '24px',
          padding: '24px',
          transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
          transform: isHovered ? 'translateY(-8px) scale(1.03)' : 'translateY(0) scale(1)',
          boxShadow: isHovered 
            ? `0 24px 48px -12px ${skill.color}40` 
            : '0 8px 24px -8px rgba(0,0,0,0.3)',
          cursor: 'pointer',
          animation: `slideUp 0.5s ease-out ${index * 0.06}s both`,
          position: 'relative',
          overflow: 'hidden'
        }}
        onMouseEnter={() => setHoveredSkill(skill.id)}
        onMouseLeave={() => setHoveredSkill(null)}
      >
        {/* Top bar */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: `linear-gradient(90deg, transparent, ${skill.color}, transparent)`,
          opacity: isHovered ? 1 : 0.5,
          transition: 'opacity 0.4s ease'
        }} />

        {/* Icon centered */}
        <div style={{
          width: '80px',
          height: '80px',
          margin: '0 auto 20px',
          background: `linear-gradient(135deg, ${skill.color}25, ${skill.color}05)`,
          borderRadius: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '44px',
          border: `2px solid ${skill.color}30`,
          transform: isHovered ? 'scale(1.1) rotate(5deg)' : 'scale(1) rotate(0deg)',
          transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
          boxShadow: isHovered ? `0 10px 30px ${skill.color}40` : 'none',
          position: 'relative'
        }}>
          {skill.emoji}
          <div style={{
            position: 'absolute',
            inset: '-6px',
            borderRadius: '20px',
            background: `radial-gradient(circle, ${skill.color}40, transparent 70%)`,
            opacity: isHovered ? 1 : 0,
            transition: 'opacity 0.4s ease',
            filter: 'blur(16px)',
            zIndex: -1
          }} />
        </div>

        {/* Title */}
        <h3 style={{
          fontSize: '22px',
          fontWeight: 800,
          color: '#ffffff',
          textAlign: 'center',
          marginBottom: '12px',
          letterSpacing: '-0.5px'
        }}>
          {skill.title}
        </h3>

        {/* Stats */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '32px',
          marginBottom: '20px'
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              fontSize: '28px',
              fontWeight: 900,
              color: skill.color,
              fontFamily: 'JetBrains Mono, monospace',
              lineHeight: 1
            }}>
              {skill.level}%
            </div>
            <div style={{
              fontSize: '11px',
              color: 'rgba(156, 163, 175, 0.8)',
              fontWeight: 600,
              marginTop: '4px',
              letterSpacing: '1px',
              textTransform: 'uppercase'
            }}>
              Expertise
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              fontSize: '28px',
              fontWeight: 900,
              color: skill.color,
              fontFamily: 'JetBrains Mono, monospace',
              lineHeight: 1
            }}>
              {skill.projects}
            </div>
            <div style={{
              fontSize: '11px',
              color: 'rgba(156, 163, 175, 0.8)',
              fontWeight: 600,
              marginTop: '4px',
              letterSpacing: '1px',
              textTransform: 'uppercase'
            }}>
              Projects
            </div>
          </div>
        </div>

        {/* Tech grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '8px',
          marginBottom: '16px'
        }}>
          {skill.techs.slice(0, 8).map((tech, idx) => (
            <div
              key={tech.name}
              style={{
                width: '100%',
                aspectRatio: '1',
                background: 'rgba(31, 41, 55, 0.6)',
                border: '1px solid rgba(55, 65, 81, 0.5)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s ease',
                animation: `slideUp 0.3s ease-out ${idx * 0.03}s both`
              }}
              title={tech.name}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = `${skill.color}20`;
                e.currentTarget.style.borderColor = `${skill.color}60`;
                e.currentTarget.style.transform = 'scale(1.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(31, 41, 55, 0.6)';
                e.currentTarget.style.borderColor = 'rgba(55, 65, 81, 0.5)';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <i className={tech.icon} style={{ fontSize: '26px' }} />
            </div>
          ))}
        </div>

        {/* Badge */}
        <div style={{
          background: skill.color,
          color: '#000000',
          padding: '10px',
          borderRadius: '100px',
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '12px',
          fontWeight: 900,
          letterSpacing: '1px',
          textTransform: 'uppercase',
          textAlign: 'center',
          boxShadow: `0 4px 16px ${skill.color}60`
        }}>
          {skill.category}
        </div>
      </div>
    );
  };

  const renderKanbanView = (skill, index) => {
    const isHovered = hoveredSkill === skill.id;
    
    return (
      <div
        key={skill.id}
        style={{
          background: 'linear-gradient(135deg, rgba(17, 24, 39, 0.95), rgba(31, 41, 55, 0.85))',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: isHovered ? `2px solid ${skill.color}` : '2px solid rgba(55, 65, 81, 0.6)',
          borderRadius: '20px',
          padding: '20px',
          transition: 'all 0.3s ease',
          transform: isHovered ? 'translateY(-6px)' : 'translateY(0)',
          boxShadow: isHovered 
            ? `0 16px 32px -8px ${skill.color}40` 
            : '0 6px 16px -6px rgba(0,0,0,0.3)',
          cursor: 'pointer',
          animation: `slideUp 0.4s ease-out ${index * 0.05}s both`,
          height: '100%',
          display: 'flex',
          flexDirection: 'column'
        }}
        onMouseEnter={() => setHoveredSkill(skill.id)}
        onMouseLeave={() => setHoveredSkill(null)}
      >
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '16px'
        }}>
          <div style={{
            width: '56px',
            height: '56px',
            background: `linear-gradient(135deg, ${skill.color}25, ${skill.color}05)`,
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '32px',
            border: `2px solid ${skill.color}30`
          }}>
            {skill.emoji}
          </div>
          <div style={{
            background: skill.color,
            color: '#000000',
            padding: '6px 14px',
            borderRadius: '100px',
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '14px',
            fontWeight: 900
          }}>
            {skill.level}%
          </div>
        </div>

        {/* Title */}
        <h3 style={{
          fontSize: '20px',
          fontWeight: 800,
          color: '#ffffff',
          marginBottom: '8px'
        }}>
          {skill.title}
        </h3>

        {/* Meta */}
        <div style={{
          display: 'flex',
          gap: '16px',
          marginBottom: '16px',
          fontSize: '13px',
          color: 'rgba(156, 163, 175, 0.9)',
          fontWeight: 500
        }}>
          <span>⚡ {skill.experience}</span>
          <span>🚀 {skill.projects} projects</span>
        </div>

        {/* Description */}
        <p style={{
          fontSize: '14px',
          color: 'rgba(156, 163, 175, 0.9)',
          lineHeight: 1.6,
          marginBottom: '16px',
          flex: 1
        }}>
          {skill.achievements[0].slice(0, 80)}...
        </p>

        {/* Tech icons */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '8px'
        }}>
          {skill.techs.slice(0, 5).map((tech) => (
            <div
              key={tech.name}
              style={{
                width: '36px',
                height: '36px',
                background: 'rgba(31, 41, 55, 0.6)',
                border: '1px solid rgba(55, 65, 81, 0.5)',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s ease'
              }}
              title={tech.name}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = `${skill.color}20`;
                e.currentTarget.style.transform = 'scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(31, 41, 55, 0.6)';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <i className={tech.icon} style={{ fontSize: '20px' }} />
            </div>
          ))}
          {skill.techs.length > 5 && (
            <div style={{
              width: '36px',
              height: '36px',
              background: 'rgba(31, 41, 55, 0.6)',
              border: '1px solid rgba(55, 65, 81, 0.5)',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '12px',
              color: skill.color,
              fontWeight: 700
            }}>
              +{skill.techs.length - 5}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700;800;900&display=swap"
        rel="stylesheet"
      />

      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Inter', sans-serif;
          background: #030712;
          overflow-x: hidden;
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.05);
            opacity: 0.8;
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-15px);
          }
        }

        @keyframes glow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(139, 92, 246, 0.4);
          }
          50% {
            box-shadow: 0 0 40px rgba(139, 92, 246, 0.7);
          }
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }

        ::-webkit-scrollbar-track {
          background: rgba(17, 24, 39, 0.5);
          border-radius: 10px;
        }

        ::-webkit-scrollbar-thumb {
          background: rgba(139, 92, 246, 0.5);
          border-radius: 10px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: rgba(139, 92, 246, 0.7);
        }
      `}</style>

      <div style={{
        minHeight: '100vh',
        background: '#030712',
        color: '#fff',
        position: 'relative'
      }}>
        {/* Canvas background */}
        <canvas
          ref={canvasRef}
          style={{
            position: 'fixed',
            inset: 0,
            pointerEvents: 'none',
            opacity: 0.5,
            zIndex: 0
          }}
        />

        {/* Gradient orbs */}
        <div style={{
          position: 'fixed',
          inset: 0,
          overflow: 'hidden',
          pointerEvents: 'none',
          zIndex: 0
        }}>
          <div style={{
            position: 'absolute',
            width: '600px',
            height: '600px',
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15), transparent 70%)',
            borderRadius: '50%',
            top: '-200px',
            right: '-200px',
            animation: 'float 8s ease-in-out infinite'
          }} />
          <div style={{
            position: 'absolute',
            width: '500px',
            height: '500px',
            background: 'radial-gradient(circle, rgba(6, 182, 212, 0.15), transparent 70%)',
            borderRadius: '50%',
            bottom: '-150px',
            left: '-150px',
            animation: 'float 10s ease-in-out infinite 2s'
          }} />
          <div style={{
            position: 'absolute',
            width: '400px',
            height: '400px',
            background: 'radial-gradient(circle, rgba(168, 85, 247, 0.12), transparent 70%)',
            borderRadius: '50%',
            top: '40%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            animation: 'float 12s ease-in-out infinite 4s'
          }} />
        </div>

        {/* Main content */}
        <div style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 24px'
        }}>
          {/* Header */}
          <header style={{
            padding: '80px 0 60px',
            textAlign: 'center'
          }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px 28px',
              background: 'rgba(17, 24, 39, 0.8)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '2px solid rgba(139, 92, 246, 0.3)',
              borderRadius: '100px',
              marginBottom: '32px',
              animation: 'glow 3s ease-in-out infinite'
            }}>
              <div style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: '#10b981',
                boxShadow: '0 0 12px #10b981',
                animation: 'pulse 2s ease-in-out infinite'
              }} />
              <span style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '13px',
                fontWeight: 700,
                color: 'rgba(139, 92, 246, 0.9)',
                letterSpacing: '1.5px',
                textTransform: 'uppercase'
              }}>
                System Operational • All Skills Active
              </span>
            </div>

            <h1 style={{
              fontSize: 'clamp(56px, 10vw, 96px)',
              fontWeight: 900,
              background: 'linear-gradient(135deg, #ffffff 0%, #8b5cf6 50%, #06b6d4 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: '24px',
              letterSpacing: '-3px',
              lineHeight: 1,
              animation: 'slideUp 0.8s ease-out'
            }}>
              MASTERY
              <br />
              SHOWCASE
            </h1>

            <p style={{
              fontSize: 'clamp(18px, 2.5vw, 22px)',
              color: 'rgba(156, 163, 175, 0.9)',
              maxWidth: '800px',
              margin: '0 auto 40px',
              lineHeight: 1.7,
              fontWeight: 500,
              animation: 'slideUp 0.8s ease-out 0.2s both'
            }}>
              Elite-level engineering expertise across full-stack, AI/ML, cloud infrastructure, and data science.
              <br />
              <span style={{
                color: '#8b5cf6',
                fontWeight: 700
              }}>
                Building enterprise solutions that scale globally.
              </span>
            </p>

            {/* Stats */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '24px',
              flexWrap: 'wrap',
              animation: 'slideUp 0.8s ease-out 0.4s both'
            }}>
              {[
                { emoji: '⚡', label: 'Experience', value: '0+' },
                { emoji: '🚀', label: 'Projects', value: '8+' },
                { emoji: '💎', label: 'Problems', value: '100+' },
                { emoji: '🎯', label: 'Success', value: '96%' }
              ].map((stat, i) => (
                <div
                  key={i}
                  style={{
                    background: 'rgba(17, 24, 39, 0.8)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    border: '2px solid rgba(55, 65, 81, 0.6)',
                    borderRadius: '20px',
                    padding: '20px 32px',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-6px)';
                    e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.6)';
                    e.currentTarget.style.boxShadow = '0 12px 32px rgba(139, 92, 246, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.borderColor = 'rgba(55, 65, 81, 0.6)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div style={{
                    fontSize: '32px',
                    marginBottom: '8px'
                  }}>
                    {stat.emoji}
                  </div>
                  <div style={{
                    fontSize: '28px',
                    fontWeight: 900,
                    color: '#ffffff',
                    marginBottom: '4px',
                    fontFamily: 'JetBrains Mono, monospace'
                  }}>
                    {stat.value}
                  </div>
                  <div style={{
                    fontSize: '12px',
                    color: 'rgba(156, 163, 175, 0.8)',
                    fontWeight: 600,
                    letterSpacing: '1px',
                    textTransform: 'uppercase'
                  }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </header>

          {/* View mode selector */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '12px',
            marginBottom: '48px',
            animation: 'slideUp 0.8s ease-out 0.6s both'
          }}>
            {[
              { mode: 'grid', icon: '▦', label: 'Grid' },
              { mode: 'list', icon: '☰', label: 'List' },
              { mode: 'compact', icon: '⊞', label: 'Compact' },
              { mode: 'kanban', icon: '▥', label: 'Kanban' }
            ].map(({ mode, icon, label }) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                style={{
                  padding: '14px 28px',
                  background: viewMode === mode 
                    ? 'linear-gradient(135deg, #8b5cf6, #06b6d4)' 
                    : 'rgba(17, 24, 39, 0.8)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border: viewMode === mode 
                    ? '2px solid rgba(139, 92, 246, 0.6)' 
                    : '2px solid rgba(55, 65, 81, 0.6)',
                  borderRadius: '16px',
                  color: viewMode === mode ? '#000000' : '#ffffff',
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '14px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  letterSpacing: '0.5px',
                  textTransform: 'uppercase',
                  boxShadow: viewMode === mode 
                    ? '0 8px 24px rgba(139, 92, 246, 0.4)' 
                    : 'none'
                }}
                onMouseEnter={(e) => {
                  if (viewMode !== mode) {
                    e.currentTarget.style.transform = 'translateY(-3px)';
                    e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.6)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (viewMode !== mode) {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.borderColor = 'rgba(55, 65, 81, 0.6)';
                  }
                }}
              >
                <span style={{ fontSize: '18px' }}>{icon}</span>
                <span>{label}</span>
              </button>
            ))}
          </div>

          {/* Skills container */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 
              viewMode === 'grid' ? 'repeat(auto-fit, minmax(min(100%, 480px), 1fr))' :
              viewMode === 'list' ? '1fr' :
              viewMode === 'compact' ? 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))' :
              'repeat(auto-fit, minmax(min(100%, 360px), 1fr))',
            gap: viewMode === 'list' ? '20px' : '28px',
            marginBottom: '80px'
          }}>
            {skills.map((skill, index) => {
              if (viewMode === 'grid') return renderGridView(skill, index);
              if (viewMode === 'list') return renderListView(skill, index);
              if (viewMode === 'compact') return renderCompactView(skill, index);
              if (viewMode === 'kanban') return renderKanbanView(skill, index);
              return null;
            })}
          </div>

          {/* CTA */}
          <section style={{
            background: 'linear-gradient(135deg, rgba(17, 24, 39, 0.95), rgba(31, 41, 55, 0.85))',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '2px solid rgba(55, 65, 81, 0.6)',
            borderRadius: '32px',
            padding: '64px 48px',
            textAlign: 'center',
            marginBottom: '80px',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'radial-gradient(circle at 50% 0%, rgba(139, 92, 246, 0.15), transparent 70%)',
              pointerEvents: 'none'
            }} />

            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '4px',
              background: 'linear-gradient(90deg, transparent, #8b5cf6, #06b6d4, transparent)'
            }} />

            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                padding: '10px 24px',
                background: 'rgba(139, 92, 246, 0.15)',
                border: '2px solid rgba(139, 92, 246, 0.3)',
                borderRadius: '100px',
                marginBottom: '28px'
              }}>
                <span style={{ fontSize: '20px' }}>🚀</span>
                <span style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '13px',
                  fontWeight: 700,
                  color: '#8b5cf6',
                  letterSpacing: '1.5px',
                  textTransform: 'uppercase'
                }}>
                  Ready to Collaborate
                </span>
              </div>

              <h2 style={{
                fontSize: 'clamp(40px, 6vw, 64px)',
                fontWeight: 900,
                background: 'linear-gradient(135deg, #ffffff, #8b5cf6)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                marginBottom: '24px',
                letterSpacing: '-1px',
                lineHeight: 1.1
              }}>
                Let's Build the Future
              </h2>

              <p style={{
                fontSize: '20px',
                color: 'rgba(156, 163, 175, 0.9)',
                maxWidth: '700px',
                margin: '0 auto 40px',
                lineHeight: 1.7,
                fontWeight: 500
              }}>
                Transform your vision into scalable, production-ready solutions with cutting-edge technology and proven expertise.
              </p>

              <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '20px',
                flexWrap: 'wrap'
              }}>
                <a
                  href="https://github.com/bhagavan444"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    padding: '18px 40px',
                    background: 'linear-gradient(135deg, #8b5cf6, #06b6d4)',
                    border: '2px solid transparent',
                    borderRadius: '100px',
                    color: '#000000',
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '16px',
                    fontWeight: 800,
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '12px',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 10px 30px rgba(139, 92, 246, 0.4)',
                    letterSpacing: '0.5px',
                    textTransform: 'uppercase'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px) scale(1.05)';
                    e.currentTarget.style.boxShadow = '0 20px 50px rgba(139, 92, 246, 0.6)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(139, 92, 246, 0.4)';
                  }}
                >
                  <span>View Projects</span>
                  <span>→</span>
                </a>
                <a
                  href="mailto:g.sivasatyasaibhagavan@gmail.com"
                  style={{
                    padding: '18px 40px',
                    background: 'transparent',
                    border: '2px solid rgba(139, 92, 246, 0.6)',
                    borderRadius: '100px',
                    color: '#ffffff',
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '16px',
                    fontWeight: 800,
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '12px',
                    transition: 'all 0.3s ease',
                    letterSpacing: '0.5px',
                    textTransform: 'uppercase'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px) scale(1.05)';
                    e.currentTarget.style.background = 'rgba(139, 92, 246, 0.15)';
                    e.currentTarget.style.borderColor = '#8b5cf6';
                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(139, 92, 246, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.6)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <span>Start Project</span>
                  <span>✉</span>
                </a>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer style={{
            textAlign: 'center',
            paddingBottom: '60px'
          }}>
            <div style={{
              fontSize: '14px',
              color: 'rgba(156, 163, 175, 0.6)',
              fontFamily: 'JetBrains Mono, monospace',
              letterSpacing: '1px'
            }}>
              Engineered with precision • Powered by innovation
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}