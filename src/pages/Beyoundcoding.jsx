"use client";
import { useState, useEffect, useRef } from "react";
import {
  BookOpen, Music, Coffee, Dumbbell, Camera, Film, Gamepad2,
  Sparkles, Zap, TrendingUp, Heart, Brain, Code2, Rocket, Crown,
  Flame, Star, Target, Award, Volume2, Timer, Activity, X, CheckCircle2,
  Headphones, Mountain, Palette, Globe, Users, Lightbulb, Wind,
  Moon, Sun, Compass, Trophy, Gift, Smile, Eye, Podcast, Radio
} from "lucide-react";

// Data
const hobbiesData = [
  {
    id: 1,
    title: "Reading & Research",
    icon: BookOpen,
    color: "#00f0ff",
    category: "Intellectual",
    rarity: "Legendary",
    desc: "Deep dives into software architecture, system design, emerging tech, and philosophy.",
    fullDesc: "Constantly exploring cutting-edge research papers, technical documentation, and thought-provoking literature. Focus areas include distributed systems, AI/ML innovations, quantum computing, and human psychology.",
    whyItMatters: "Strengthens system-level thinking, pattern recognition, and helps design scalable, maintainable software with a philosophical approach to problem-solving.",
    learnings: [
      "Advanced system design patterns",
      "Clean architecture principles",
      "Engineering best practices",
      "Critical thinking frameworks",
      "Future tech trends"
    ],
    impact: [
      "Improved architectural decision-making by 60%",
      "Reduced code complexity through better abstractions",
      "Enhanced ability to predict tech trends"
    ],
    stats: [
      { label: "Books/Year", value: "36+", icon: BookOpen },
      { label: "Research Papers", value: "100+", icon: Target },
      { label: "Learning Hours", value: "500+", icon: Timer },
      { label: "Knowledge Growth", value: "∞", icon: Brain }
    ],
    dailyRoutine: "2-3 hours daily: morning reading sessions + late-night deep dives",
    favoriteBooks: ["Designing Data-Intensive Applications", "Clean Architecture", "The Pragmatic Programmer"]
  },
  {
    id: 2,
    title: "Music Production & Listening",
    icon: Music,
    color: "#a78bfa",
    category: "Creative",
    rarity: "Epic",
    desc: "Curating focus playlists, exploring sound engineering, and using music as a coding catalyst.",
    fullDesc: "Music isn't just background noise—it's a carefully engineered tool for flow states. Exploring multiple genres, creating custom productivity playlists, and understanding the science of audio on cognitive performance.",
    whyItMatters: "Improves concentration during long coding sessions, enhances creative problem-solving, and maintains sustained mental performance during complex tasks.",
    learnings: [
      "Sustained deep focus techniques",
      "Creative pattern recognition",
      "Stress management through sound",
      "Audio engineering basics",
      "Flow state optimization"
    ],
    impact: [
      "200% productivity boost during deep work",
      "50% reduction in context-switching time",
      "Enhanced debugging intuition"
    ],
    stats: [
      { label: "Daily Hours", value: "6+", icon: Headphones },
      { label: "Playlists Created", value: "50+", icon: Volume2 },
      { label: "Genres Explored", value: "25+", icon: Radio },
      { label: "Focus Boost", value: "200%", icon: Activity }
    ],
    dailyRoutine: "Ambient for coding • Lo-fi for planning • Electronic for debugging",
    favoriteGenres: ["Synthwave", "Lo-fi Hip Hop", "Ambient", "Electronic"]
  },
  {
    id: 3,
    title: "Coffee Culture",
    icon: Coffee,
    color: "#ff61d2",
    category: "Lifestyle",
    rarity: "Epic",
    desc: "Mastering the art of coffee for sustained energy, focus, and hackathon endurance.",
    fullDesc: "Coffee is more than caffeine—it's a ritual, a science, and a performance optimizer. Exploring brewing methods, bean origins, and the perfect timing for peak cognitive performance.",
    whyItMatters: "Supports sustained energy during high-pressure development cycles, enables late-night debugging sessions, and provides consistent mental clarity for complex problem-solving.",
    learnings: [
      "Endurance under pressure",
      "Time-boxed productivity",
      "Night-shift efficiency",
      "Caffeine optimization science",
      "Ritual-based focus triggers"
    ],
    impact: [
      "Extended productive hours by 40%",
      "Maintained 95% accuracy during late-night coding",
      "Won 3 hackathons with coffee-fueled sprints"
    ],
    stats: [
      { label: "Cups/Day", value: "4+", icon: Coffee },
      { label: "Brewing Methods", value: "5", icon: Zap },
      { label: "Late Night Sprints", value: "∞", icon: Moon },
      { label: "Energy Level", value: "MAX", icon: Rocket }
    ],
    dailyRoutine: "Morning espresso • Afternoon cold brew • Evening pour-over",
    favoriteBrands: ["Ethiopian Single Origin", "Colombian Medium Roast", "Vietnamese Robusta"]
  },
  {
    id: 4,
    title: "Strategic Gaming",
    icon: Gamepad2,
    color: "#00ff88",
    category: "Mental Training",
    rarity: "Epic",
    desc: "Competitive gaming to sharpen decision-making, reflexes, and strategic thinking.",
    fullDesc: "Not just entertainment—gaming is a training ground for real-time problem solving, resource management, and adapting to rapidly changing scenarios. Focus on strategy, RTS, and competitive multiplayer.",
    whyItMatters: "Enhances real-time decision-making under pressure, improves pattern recognition, develops strategic planning skills, and builds mental resilience.",
    learnings: [
      "Real-time strategic thinking",
      "Fast decision-making under uncertainty",
      "Focus maintenance under pressure",
      "Resource optimization",
      "Competitive mindset"
    ],
    impact: [
      "Improved debugging speed by 45%",
      "Enhanced system design thinking",
      "Better risk assessment in architecture decisions"
    ],
    stats: [
      { label: "Strategy Skill", value: "96%", icon: Brain },
      { label: "Reflex Speed", value: "91%", icon: Zap },
      { label: "Focus Level", value: "94%", icon: Target },
      { label: "Win Rate", value: "72%", icon: Trophy }
    ],
    dailyRoutine: "Evening strategy sessions • Weekend competitive matches",
    favoriteGames: ["StarCraft II", "Chess", "Civilization VI", "Valorant"]
  },
  {
    id: 5,
    title: "Cinema & Storytelling",
    icon: Film,
    color: "#ffd700",
    category: "Creative",
    rarity: "Rare",
    desc: "Analyzing cinematography, narrative structure, and visual storytelling techniques.",
    fullDesc: "Movies are masterclasses in user experience, pacing, visual communication, and emotional engagement. Studying how directors guide attention, build tension, and deliver satisfying resolutions.",
    whyItMatters: "Improves understanding of user experience design, narrative flow in product development, visual communication in presentations, and emotional design in interfaces.",
    learnings: [
      "User-centric design thinking",
      "Storytelling for product demos",
      "Visual communication mastery",
      "Pacing and flow optimization",
      "Emotional engagement techniques"
    ],
    impact: [
      "Enhanced UI/UX design intuition",
      "Better product pitch storytelling",
      "Improved user journey mapping"
    ],
    stats: [
      { label: "Films/Month", value: "20+", icon: Film },
      { label: "Genres", value: "All", icon: Star },
      { label: "Directors Studied", value: "50+", icon: Eye },
      { label: "UX Insights", value: "∞", icon: Brain }
    ],
    dailyRoutine: "Weekend film marathons • Evening director study sessions",
    favoriteDirectors: ["Christopher Nolan", "Denis Villeneuve", "Quentin Tarantino"]
  },
  {
    id: 6,
    title: "Fitness & Discipline",
    icon: Dumbbell,
    color: "#ff6b6b",
    category: "Physical",
    rarity: "Epic",
    desc: "Building physical resilience, mental discipline, and sustainable high performance.",
    fullDesc: "Physical fitness isn't separate from mental performance—it's foundational. Structured training regimen focused on strength, endurance, and flexibility to support long coding sessions and maintain peak mental clarity.",
    whyItMatters: "Boosts focus and cognitive function, reduces burnout, improves consistency in long-term projects, and builds the discipline required for mastering complex technologies.",
    learnings: [
      "Discipline and consistency",
      "Long-term commitment",
      "Mental resilience building",
      "Energy management",
      "Stress recovery techniques"
    ],
    impact: [
      "100% increase in daily energy levels",
      "60% reduction in mental fatigue",
      "Maintained focus for 12+ hour coding sessions"
    ],
    stats: [
      { label: "Workouts/Week", value: "6×", icon: Dumbbell },
      { label: "Strength Gain", value: "95%", icon: TrendingUp },
      { label: "Endurance", value: "92%", icon: Activity },
      { label: "Mental Clarity", value: "100%", icon: Brain }
    ],
    dailyRoutine: "Morning strength training • Evening cardio • Daily stretching",
    focusAreas: ["Compound Lifts", "HIIT", "Yoga", "Recovery"]
  },
  {
    id: 7,
    title: "Photography & Visual Arts",
    icon: Camera,
    color: "#ff9500",
    category: "Creative",
    rarity: "Rare",
    desc: "Capturing moments with precision, exploring composition, lighting, and visual balance.",
    fullDesc: "Photography trains the eye for detail, composition, and visual hierarchy—skills that directly translate to UI/UX design. Focus on urban photography, minimalism, and the rule of thirds.",
    whyItMatters: "Sharpens visual design sense, enhances attention to detail for frontend work, improves spatial reasoning, and develops aesthetic judgment for interface design.",
    learnings: [
      "Visual composition mastery",
      "Attention to micro-details",
      "Creative framing techniques",
      "Lighting and color theory",
      "Minimalist design principles"
    ],
    impact: [
      "Improved UI design aesthetic by 70%",
      "Better component layout decisions",
      "Enhanced visual hierarchy in designs"
    ],
    stats: [
      { label: "Photos Taken", value: "1000+", icon: Camera },
      { label: "Style", value: "Urban/Tech", icon: Star },
      { label: "Equipment", value: "Pro", icon: Award },
      { label: "Skill Level", value: "Expert", icon: Trophy }
    ],
    dailyRoutine: "Weekend photo walks • Golden hour sessions • Evening editing",
    favoriteSubjects: ["Architecture", "Urban Landscapes", "Technology", "Minimalism"]
  },
  {
    id: 8,
    title: "Travel & Exploration",
    icon: Globe,
    color: "#00d4ff",
    category: "Experiential",
    rarity: "Legendary",
    desc: "Exploring new cultures, perspectives, and expanding worldview through travel.",
    fullDesc: "Travel isn't tourism—it's perspective expansion, culture immersion, and understanding diverse approaches to problem-solving. Learning how different cultures approach technology, work, and life.",
    whyItMatters: "Broadens perspective for global product thinking, enhances adaptability, improves cross-cultural communication, and inspires innovative solutions from diverse contexts.",
    learnings: [
      "Cultural adaptability",
      "Global perspective",
      "Diverse problem-solving approaches",
      "Communication across cultures",
      "Appreciation for different workflows"
    ],
    impact: [
      "Enhanced empathy in user research",
      "Better international team collaboration",
      "Inspired 5+ projects from travel insights"
    ],
    stats: [
      { label: "Places Visited", value: "15+", icon: Compass },
      { label: "Cultures Explored", value: "10+", icon: Users },
      { label: "Languages", value: "3", icon: Globe },
      { label: "Perspective Gain", value: "∞", icon: Lightbulb }
    ],
    dailyRoutine: "Planning next adventure • Virtual cultural exploration • Language learning",
    bucketList: ["Japan (Tech Culture)", "Silicon Valley", "Iceland", "New Zealand"]
  }
];

const categories = ["All", "Intellectual", "Creative", "Physical", "Lifestyle", "Mental Training", "Experiential"];

const rarityColors = {
  "Legendary": "#ffd700",
  "Epic": "#a78bfa",
  "Rare": "#00f0ff"
};

export default function EliteBeyondCoding() {
  const [activeHobby, setActiveHobby] = useState(null);
  const [hoveredId, setHoveredId] = useState(null);
  const [filterCategory, setFilterCategory] = useState("All");
  const [sortBy, setSortBy] = useState("rarity");
  const canvasRef = useRef(null);

  // Particle background
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
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      size: Math.random() * 2.5 + 1,
      color: ['#00f0ff', '#a78bfa', '#ff61d2', '#ffd700'][Math.floor(Math.random() * 4)]
    }));

    const animate = () => {
      ctx.fillStyle = 'rgba(0,0,0,0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 6);
        gradient.addColorStop(0, `${p.color}50`);
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

  const filteredHobbies = hobbiesData
    .filter(h => filterCategory === "All" || h.category === filterCategory)
    .sort((a, b) => {
      if (sortBy === "rarity") {
        const rarityOrder = { "Legendary": 3, "Epic": 2, "Rare": 1 };
        return rarityOrder[b.rarity] - rarityOrder[a.rarity];
      }
      return 0;
    });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Fira+Code:wght@400;500;600&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        :root {
          --neon-cyan: #00f0ff;
          --neon-purple: #a78bfa;
          --neon-pink: #ff61d2;
          --neon-gold: #ffd700;
          --neon-gradient: linear-gradient(135deg, #00f0ff, #a78bfa, #ff61d2);
        }
        @keyframes slideUp { from { opacity:0; transform:translateY(40px); } to { opacity:1; transform:translateY(0); } }
        @keyframes glow { 0%,100% { opacity:1; } 50% { opacity:0.7; } }
        @keyframes float { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-12px); } }
        @keyframes shimmer { 0% { background-position: -200%; } 100% { background-position: 200%; } }
        @keyframes pulse-ring { 0% { transform: scale(0.8); opacity: 1; } 100% { transform: scale(1.4); opacity: 0; } }
        .hobby-card {
          position: relative;
          background: rgba(10,10,30,0.95);
          border: 2px solid rgba(0,240,255,0.3);
          border-radius: 24px;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.4,0,0.2,1);
          cursor: pointer;
        }
        .hobby-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, transparent 30%, rgba(0,240,255,0.1) 50%, transparent 70%);
          background-size: 200% 200%;
          animation: shimmer 3s infinite;
          pointer-events: none;
        }
        .hobby-card:hover {
          transform: translateY(-12px);
          border-color: var(--neon-cyan);
          box-shadow: 0 20px 60px rgba(0,240,255,0.4);
        }
        .filter-btn {
          padding: 0.7rem 1.5rem;
          background: rgba(0,0,0,0.6);
          border: 2px solid rgba(0,240,255,0.3);
          border-radius: 999px;
          color: #fff;
          cursor: pointer;
          transition: all 0.3s;
          font-family: 'Fira Code', monospace;
          font-size: 0.9rem;
        }
        .filter-btn:hover, .filter-btn.active {
          background: rgba(0,240,255,0.2);
          border-color: var(--neon-cyan);
          transform: scale(1.05);
        }
        .modal-content {
          background: rgba(8,8,22,0.98);
          border: 4px solid var(--neon-cyan);
          border-radius: 32px;
          max-width: 1100px;
          width: 96%;
          max-height: 92vh;
          overflow-y: auto;
          box-shadow: 0 0 140px rgba(0,240,255,0.7);
          position: relative;
        }
        @media (max-width: 768px) {
          .hobby-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <div style={{
        minHeight: '100vh',
        background: '#000000',
        color: '#e0e0ff',
        position: 'relative',
        overflow: 'hidden',
        padding: 'clamp(4rem, 10vw, 8rem) clamp(1rem, 3vw, 1.5rem) 6rem',
        fontFamily: "'Outfit', sans-serif",
        width: '100%',
        maxWidth: '100vw',
        boxSizing: 'border-box'
      }}>
        {/* Background Grid */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(0,240,255,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,240,255,0.05) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          opacity: 0.3,
          pointerEvents: 'none'
        }} />

        {/* Particle Canvas */}
        <canvas ref={canvasRef} style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 1
        }} />

        <div style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: '1600px',
          margin: '0 auto',
          width: '100%',
          boxSizing: 'border-box'
        }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.8rem',
              padding: '0.6rem 1.5rem',
              background: 'rgba(0,240,255,0.1)',
              border: '2px solid rgba(0,240,255,0.4)',
              borderRadius: '999px',
              marginBottom: '1.5rem',
              animation: 'glow 2s infinite'
            }}>
              <Flame size={20} color="#ffd700" />
              <span style={{ fontFamily: "'Fira Code', monospace", fontSize: '0.9rem', fontWeight: 600 }}>
                THE COMPLETE HUMAN
              </span>
            </div>

            <h1 style={{
              fontSize: 'clamp(3.5rem, 10vw, 7rem)',
              fontWeight: 900,
              background: 'var(--neon-gradient)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '2px',
              marginBottom: '1.5rem',
              textTransform: 'uppercase'
            }}>
              BEYOND THE CODE
            </h1>

            <p style={{
              fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)',
              color: '#a0a0d0',
              maxWidth: '900px',
              margin: '0 auto 3rem',
              lineHeight: 1.8
            }}>
              Elite developers aren't machines—they're multidimensional humans who fuel creativity,
              sharpen focus, and sustain excellence through intentional life design.
            </p>
          </div>

          {/* Filters */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
            marginBottom: '4rem'
          }}>
            {categories.map(cat => (
              <button
                key={cat}
                className={`filter-btn ${filterCategory === cat ? 'active' : ''}`}
                onClick={() => setFilterCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Hobbies Grid */}
          <div className="hobby-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(380px, 100%), 1fr))',
            gap: '2.5rem',
            marginBottom: '6rem',
            width: '100%',
            maxWidth: '100%'
          }}>
            {filteredHobbies.map((hobby, i) => (
              <div
                key={hobby.id}
                className="hobby-card"
                onMouseEnter={() => setHoveredId(hobby.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => setActiveHobby(hobby)}
                style={{ animation: `slideUp ${0.3 + i * 0.1}s ease-out` }}
              >
                <div style={{
                  height: '200px',
                  background: `linear-gradient(135deg, ${hobby.color}20, transparent)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative'
                }}>
                  <div style={{
                    width: '120px',
                    height: '120px',
                    border: `3px solid ${hobby.color}`,
                    borderRadius: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    animation: hoveredId === hobby.id ? 'float 2s ease-in-out infinite' : 'none',
                    boxShadow: hoveredId === hobby.id ? `0 0 40px ${hobby.color}` : 'none'
                  }}>
                    <hobby.icon size={60} color={hobby.color} />
                  </div>

                  <div style={{
                    position: 'absolute',
                    top: '1rem',
                    left: '1rem',
                    padding: '0.4rem 1rem',
                    background: `${rarityColors[hobby.rarity]}20`,
                    border: `2px solid ${rarityColors[hobby.rarity]}`,
                    borderRadius: '999px',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    color: rarityColors[hobby.rarity],
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem'
                  }}>
                    <Star size={14} fill={rarityColors[hobby.rarity]} />
                    {hobby.rarity}
                  </div>
                </div>

                <div style={{ padding: '2rem' }}>
                  <div style={{
                    fontSize: '0.85rem',
                    color: hobby.color,
                    fontFamily: "'Fira Code', monospace",
                    marginBottom: '0.8rem',
                    fontWeight: 600
                  }}>
                    {hobby.category}
                  </div>

                  <h3 style={{
                    fontSize: '1.6rem',
                    fontWeight: 800,
                    color: '#fff',
                    marginBottom: '1rem'
                  }}>
                    {hobby.title}
                  </h3>

                  <p style={{
                    fontSize: '0.95rem',
                    color: '#a0a0c0',
                    lineHeight: 1.6,
                    marginBottom: '1.5rem'
                  }}>
                    {hobby.desc}
                  </p>

                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: '0.8rem',
                    marginBottom: '1.5rem'
                  }}>
                    {hobby.stats.slice(0, 4).map((stat, idx) => (
                      <div
                        key={idx}
                        style={{
                          padding: '0.8rem',
                          background: 'rgba(0,0,0,0.5)',
                          borderRadius: '12px',
                          border: `1px solid ${hobby.color}30`,
                          textAlign: 'center'
                        }}
                      >
                        <stat.icon size={20} color={hobby.color} style={{ marginBottom: '0.4rem' }} />
                        <div style={{ fontSize: '1.2rem', fontWeight: 800, color: hobby.color }}>
                          {stat.value}
                        </div>
                        <div style={{ fontSize: '0.7rem', color: '#666' }}>
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  <button style={{
                    width: '100%',
                    padding: '1rem',
                    background: `linear-gradient(90deg, ${hobby.color}, #fff)`,
                    color: '#000',
                    border: 'none',
                    borderRadius: '999px',
                    fontWeight: 800,
                    fontSize: '1rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.8rem'
                  }}>
                    <Sparkles size={20} />
                    Explore Deep Dive
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div style={{
            padding: '4rem 2rem',
            background: 'rgba(0,0,0,0.8)',
            border: '3px solid rgba(0,240,255,0.3)',
            borderRadius: '32px',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'var(--neon-gradient)',
              opacity: 0.05,
              pointerEvents: 'none'
            }} />

            <h2 style={{
              fontSize: 'clamp(2.5rem, 6vw, 4rem)',
              fontWeight: 900,
              background: 'var(--neon-gradient)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '1.5rem'
            }}>
              BUILD A LEGENDARY LIFE
            </h2>

            <p style={{
              fontSize: '1.2rem',
              color: '#a0a0d0',
              maxWidth: '700px',
              margin: '0 auto 2.5rem',
              lineHeight: 1.8
            }}>
              Great code comes from great people. Let's connect and inspire each other
              to build exceptional software AND exceptional lives.
            </p>

            <div style={{
              display: 'flex',
              gap: '2rem',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              <a
                href="https://github.com/bhagavan444"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  padding: '1.3rem 3rem',
                  background: 'rgba(0,240,255,0.1)',
                  border: '3px solid var(--neon-cyan)',
                  borderRadius: '999px',
                  color: 'var(--neon-cyan)',
                  fontWeight: 800,
                  fontSize: '1.15rem',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem'
                }}
              >
                <Code2 size={24} />
                VIEW PROJECTS
              </a>

              <a
                href="https://linkedin.com/in/your-linkedin-profile"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  padding: '1.3rem 3rem',
                  background: 'var(--neon-gradient)',
                  borderRadius: '999px',
                  color: '#000',
                  fontWeight: 900,
                  fontSize: '1.15rem',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  boxShadow: '0 0 30px rgba(0,240,255,0.6)'
                }}
              >
                <Users size={24} />
                CONNECT ON LINKEDIN
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Deep Dive Modal */}
      {activeHobby && (
        <div
          onClick={() => setActiveHobby(null)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.95)',
            backdropFilter: 'blur(20px)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem'
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            className="modal-content"
          >
            <button
              onClick={() => setActiveHobby(null)}
              style={{
                position: 'absolute',
                top: '1.5rem',
                right: '1.8rem',
                background: 'rgba(255,100,100,0.2)',
                border: '2px solid #ff6666',
                borderRadius: '50%',
                width: '55px',
                height: '55px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ff6666',
                cursor: 'pointer',
                zIndex: 10,
                transition: 'all 0.3s'
              }}
            >
              <X size={32} strokeWidth={3} />
            </button>

            <div style={{
              padding: 'clamp(2.5rem, 6vw, 4.5rem) clamp(2rem, 5vw, 4rem) 5rem'
            }}>
              <div style={{
                textAlign: 'center',
                marginBottom: '3rem'
              }}>
                <div style={{
                  width: '140px',
                  height: '140px',
                  margin: '0 auto 1.5rem',
                  border: `4px solid ${activeHobby.color}`,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: `${activeHobby.color}20`,
                  boxShadow: `0 0 60px ${activeHobby.color}`
                }}>
                  <activeHobby.icon size={70} color={activeHobby.color} />
                </div>

                <div style={{
                  fontSize: '1.4rem',
                  color: activeHobby.color,
                  fontWeight: 700,
                  marginBottom: '0.8rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '1rem'
                }}>
                  <Star size={24} fill={rarityColors[activeHobby.rarity]} />
                  {activeHobby.rarity} • {activeHobby.category}
                </div>

                <h2 style={{
                  fontSize: 'clamp(2.5rem, 6vw, 4.2rem)',
                  fontWeight: 900,
                  background: `linear-gradient(135deg, ${activeHobby.color}, #ffffff)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  marginBottom: '1rem'
                }}>
                  {activeHobby.title}
                </h2>

                <p style={{
                  fontSize: '1.3rem',
                  color: '#d0d0ff',
                  maxWidth: '800px',
                  margin: '0 auto 2rem'
                }}>
                  {activeHobby.fullDesc}
                </p>
              </div>

              {/* Why It Matters */}
              <div style={{ marginBottom: '3rem' }}>
                <h3 style={{
                  fontSize: '2rem',
                  color: activeHobby.color,
                  marginBottom: '1.5rem',
                  textAlign: 'center'
                }}>
                  Why It Matters
                </h3>
                <p style={{
                  fontSize: '1.15rem',
                  color: '#e0e0ff',
                  lineHeight: 1.8,
                  textAlign: 'center',
                  maxWidth: '900px',
                  margin: '0 auto'
                }}>
                  {activeHobby.whyItMatters}
                </p>
              </div>

              {/* Key Learnings */}
              <div style={{ marginBottom: '3rem' }}>
                <h3 style={{
                  fontSize: '1.8rem',
                  color: activeHobby.color,
                  marginBottom: '1.5rem',
                  textAlign: 'center'
                }}>
                  Key Learnings
                </h3>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                  gap: '1.2rem'
                }}>
                  {activeHobby.learnings.map((item, idx) => (
                    <div key={idx} style={{
                      padding: '1.2rem',
                      background: `${activeHobby.color}15`,
                      border: `1px solid ${activeHobby.color}40`,
                      borderRadius: '16px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem'
                    }}>
                      <CheckCircle2 size={24} style={{ color: activeHobby.color }} />
                      <span style={{ color: '#e0e0ff' }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Impact Stats */}
              <div style={{ marginBottom: '3rem' }}>
                <h3 style={{
                  fontSize: '1.8rem',
                  color: activeHobby.color,
                  marginBottom: '1.5rem',
                  textAlign: 'center'
                }}>
                  Measurable Impact
                </h3>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                  gap: '1.5rem'
                }}>
                  {activeHobby.impact.map((item, idx) => (
                    <div key={idx} style={{
                      padding: '1.5rem',
                      background: 'rgba(0,0,0,0.5)',
                      border: `2px solid ${activeHobby.color}50`,
                      borderRadius: '16px',
                      textAlign: 'center'
                    }}>
                      <div style={{
                        fontSize: '1.4rem',
                        fontWeight: 800,
                        color: activeHobby.color,
                        marginBottom: '0.5rem'
                      }}>
                        {item}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stats Grid */}
              <div style={{ marginBottom: '3rem' }}>
                <h3 style={{
                  fontSize: '1.8rem',
                  color: activeHobby.color,
                  marginBottom: '1.5rem',
                  textAlign: 'center'
                }}>
                  Quantitative Stats
                </h3>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                  gap: '1.5rem'
                }}>
                  {activeHobby.stats.map((stat, idx) => (
                    <div key={idx} style={{
                      padding: '1.5rem',
                      background: 'rgba(0,0,0,0.5)',
                      border: `2px solid ${activeHobby.color}50`,
                      borderRadius: '16px',
                      textAlign: 'center'
                    }}>
                      <stat.icon size={32} color={activeHobby.color} style={{ marginBottom: '0.8rem' }} />
                      <div style={{
                        fontSize: '2rem',
                        fontWeight: 900,
                        color: activeHobby.color
                      }}>
                        {stat.value}
                      </div>
                      <div style={{
                        color: '#c0c0e0',
                        fontSize: '1rem',
                        marginTop: '0.5rem'
                      }}>
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Daily Routine & Favorites */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: window.innerWidth > 768 ? '1fr 1fr' : '1fr',
                gap: '2rem'
              }}>
                <div style={{
                  padding: '2rem',
                  background: `${activeHobby.color}10`,
                  border: `2px solid ${activeHobby.color}40`,
                  borderRadius: '20px'
                }}>
                  <h4 style={{
                    color: activeHobby.color,
                    fontSize: '1.6rem',
                    marginBottom: '1rem',
                    textAlign: 'center'
                  }}>
                    Daily Routine
                  </h4>
                  <p style={{
                    color: '#e0e0ff',
                    textAlign: 'center',
                    lineHeight: 1.7
                  }}>
                    {activeHobby.dailyRoutine}
                  </p>
                </div>

                {activeHobby.favoriteBooks && (
                  <div style={{
                    padding: '2rem',
                    background: `${activeHobby.color}10`,
                    border: `2px solid ${activeHobby.color}40`,
                    borderRadius: '20px'
                  }}>
                    <h4 style={{
                      color: activeHobby.color,
                      fontSize: '1.6rem',
                      marginBottom: '1rem',
                      textAlign: 'center'
                    }}>
                      Favorite Books
                    </h4>
                    <ul style={{
                      listStyle: 'none',
                      color: '#e0e0ff',
                      lineHeight: 1.8
                    }}>
                      {activeHobby.favoriteBooks.map((book, idx) => (
                        <li key={idx}>• {book}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Close Button */}
              <div style={{
                textAlign: 'center',
                marginTop: '4rem'
              }}>
                <button
                  onClick={() => setActiveHobby(null)}
                  style={{
                    padding: '1.2rem 3rem',
                    background: 'rgba(255,100,100,0.2)',
                    border: '2px solid #ff6666',
                    borderRadius: '999px',
                    color: '#ff6666',
                    fontWeight: 700,
                    fontSize: '1.2rem',
                    cursor: 'pointer',
                    transition: 'all 0.3s'
                  }}
                >
                  Close Deep Dive
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}