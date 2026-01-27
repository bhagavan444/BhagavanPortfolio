"use client";
import { useState, useEffect, useRef } from "react";
import {
  BookOpen, Music, Coffee, Dumbbell, Camera, Film, Gamepad2,
  Sparkles, Zap, TrendingUp, Heart, Brain, Code2, Rocket, Crown,
  Flame, Star, Target, Award, Volume2, Timer, Activity, X, CheckCircle2,
  Headphones, Mountain, Palette, Globe, Users, Lightbulb, Wind,
  Moon, Sun, Compass, Trophy, Gift, Smile, Eye, Podcast, Radio,
  Github, Linkedin, Mail, ArrowRight, Play, Pause, Share2
} from "lucide-react";

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
  const [scrollY, setScrollY] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const canvasRef = useRef(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 2 + 1;
        this.color = ['#00f0ff', '#a78bfa', '#ff61d2', '#ffd700'][Math.floor(Math.random() * 4)];
        this.opacity = Math.random() * 0.5 + 0.3;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
      }

      draw() {
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 6);
        gradient.addColorStop(0, `${this.color}${Math.floor(this.opacity * 255).toString(16).padStart(2, '0')}`);
        gradient.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 6, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const particles = Array.from({ length: 60 }, () => new Particle());

    const animate = () => {
      ctx.fillStyle = 'rgba(0,0,0,0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      ctx.strokeStyle = 'rgba(0,240,255,0.1)';
      ctx.lineWidth = 1;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 150) {
            ctx.globalAlpha = (1 - distance / 150) * 0.3;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      ctx.globalAlpha = 1;

      time += 1;
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
    .filter(h => filterCategory === "All" || h.category === filterCategory);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Fira+Code:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700;800;900&display=swap');

        * { margin: 0; padding: 0; box-sizing: border-box; }

        ::-webkit-scrollbar { width: 10px; }
        ::-webkit-scrollbar-track { background: #000; }
        ::-webkit-scrollbar-thumb { 
          background: linear-gradient(180deg, #00f0ff, #a78bfa); 
          border-radius: 10px;
        }

        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          overflow-x: hidden;
        }

        @keyframes fadeInUp { 
          from { opacity: 0; transform: translateY(40px); } 
          to { opacity: 1; transform: translateY(0); } 
        }
        
        @keyframes glowPulse { 
          0%, 100% { opacity: 1; filter: brightness(1); } 
          50% { opacity: 0.8; filter: brightness(1.2); } 
        }
        
        @keyframes floatAnimation { 
          0%, 100% { transform: translateY(0) rotate(0deg); } 
          50% { transform: translateY(-12px) rotate(3deg); } 
        }
        
        @keyframes shimmerAnimation { 
          0% { background-position: -200% center; } 
          100% { background-position: 200% center; } 
        }
        
        @keyframes rotateAnimation { 
          from { transform: rotate(0deg); } 
          to { transform: rotate(360deg); } 
        }

        @keyframes scaleIn { 
          0% { transform: scale(0.9); opacity: 0; } 
          100% { transform: scale(1); opacity: 1; } 
        }

        @keyframes neonGlow {
          0%, 100% { 
            box-shadow: 0 0 10px currentColor, 0 0 20px currentColor; 
          }
          50% { 
            box-shadow: 0 0 20px currentColor, 0 0 40px currentColor; 
          }
        }

        .hobby-card {
          position: relative;
          background: linear-gradient(135deg, rgba(15,15,35,0.98) 0%, rgba(25,15,45,0.95) 100%);
          border: 2px solid rgba(0,240,255,0.2);
          border-radius: 24px;
          overflow: hidden;
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
          backdrop-filter: blur(20px);
        }

        .hobby-card:hover {
          transform: translateY(-12px) scale(1.02);
          border-color: var(--card-color);
          box-shadow: 0 20px 60px rgba(0,240,255,0.4);
        }

        .hobby-card::before {
          content: '';
          position: absolute;
          inset: -2px;
          background: linear-gradient(135deg, transparent 30%, var(--card-color-alpha) 50%, transparent 70%);
          background-size: 300% 300%;
          animation: shimmerAnimation 4s infinite;
          pointer-events: none;
          border-radius: 24px;
          opacity: 0;
          transition: opacity 0.5s;
        }

        .hobby-card:hover::before {
          opacity: 1;
        }

        .filter-btn {
          padding: 0.7rem 1.5rem;
          background: rgba(10,10,30,0.8);
          border: 2px solid rgba(0,240,255,0.2);
          border-radius: 999px;
          color: #fff;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          font-family: 'Inter', sans-serif;
          font-size: 0.85rem;
          font-weight: 600;
          position: relative;
          overflow: hidden;
        }

        .filter-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #00f0ff, #a78bfa, #ff61d2);
          opacity: 0;
          transition: opacity 0.3s;
        }

        .filter-btn:hover, .filter-btn.active {
          background: rgba(0,240,255,0.15);
          border-color: #00f0ff;
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(0,240,255,0.3);
        }

        .filter-btn.active::before {
          opacity: 1;
        }

        .modal-content {
          background: linear-gradient(135deg, rgba(10,10,30,0.98) 0%, rgba(20,10,40,0.95) 100%);
          border-radius: 28px;
          position: relative;
          overflow: hidden;
        }

        .modal-content::before {
          content: '';
          position: absolute;
          inset: -2px;
          background: conic-gradient(from 0deg, #00f0ff, #a78bfa, #ff61d2, #00f0ff);
          animation: rotateAnimation 8s linear infinite;
          z-index: -1;
        }

        .modal-content::after {
          content: '';
          position: absolute;
          inset: 3px;
          background: linear-gradient(135deg, rgba(10,10,30,0.98) 0%, rgba(20,10,40,0.95) 100%);
          border-radius: 25px;
          z-index: -1;
        }

        @media (max-width: 768px) {
          .hobby-grid { 
            grid-template-columns: 1fr !important;
            padding: 0 0.5rem;
          }
          .modal-content { 
            margin: 1rem;
            max-height: 90vh !important;
          }
        }

        @media (max-width: 480px) {
          .hobby-grid { gap: 2rem !important; }
        }
      `}</style>

      <div style={{
        minHeight: '100vh',
        background: '#000000',
        color: '#e8e8f0',
        position: 'relative',
        overflow: 'hidden',
        padding: 'clamp(3rem, 8vw, 6rem) 1.5rem 5rem',
        fontFamily: "'Inter', sans-serif"
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          background: `
            radial-gradient(ellipse at 15% 25%, rgba(0,240,255,0.06) 0%, transparent 50%),
            radial-gradient(ellipse at 85% 75%, rgba(167,139,250,0.06) 0%, transparent 50%),
            radial-gradient(ellipse at 50% 50%, rgba(255,97,210,0.04) 0%, transparent 50%)
          `,
          pointerEvents: 'none',
          opacity: 0.7
        }} />

        <canvas ref={canvasRef} style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 1
        }} />

        <div style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(circle 500px at ${mousePos.x}px ${mousePos.y}px, rgba(0,240,255,0.06) 0%, transparent 50%)`,
          pointerEvents: 'none',
          opacity: 0.5
        }} />

        <div style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: '1400px',
          margin: '0 auto',
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.6s ease-out'
        }}>
          <div style={{ 
            textAlign: 'center', 
            marginBottom: '5rem',
            transform: `translateY(${scrollY * 0.2}px)`
          }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.8rem',
              padding: '0.7rem 1.8rem',
              background: 'rgba(0,240,255,0.12)',
              border: '2px solid rgba(0,240,255,0.4)',
              borderRadius: '999px',
              marginBottom: '1.5rem',
              animation: 'scaleIn 0.6s ease-out, glowPulse 3s infinite',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 0 30px rgba(0,240,255,0.2)'
            }}>
              <Flame size={20} color="#ffd700" style={{ animation: 'floatAnimation 2s ease-in-out infinite' }} />
              <span style={{ 
                fontFamily: "'Space Grotesk', sans-serif", 
                fontSize: '0.85rem', 
                fontWeight: 700,
                letterSpacing: '2px',
                background: 'linear-gradient(135deg, #00f0ff, #a78bfa, #ff61d2)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                THE COMPLETE DEVELOPER
              </span>
              <Flame size={20} color="#ffd700" style={{ animation: 'floatAnimation 2s ease-in-out infinite' }} />
            </div>

            <h1 style={{
              fontSize: 'clamp(3.5rem, 10vw, 7rem)',
              fontWeight: 900,
              background: 'linear-gradient(135deg, #00f0ff, #a78bfa, #ff61d2)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '3px',
              marginBottom: '1.5rem',
              textTransform: 'uppercase',
              fontFamily: "'Space Grotesk', sans-serif",
              animation: 'fadeInUp 0.8s ease-out',
              lineHeight: 1.1
            }}>
              BEYOND THE<br />CODE
            </h1>

            <p style={{
              fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)',
              color: '#b8b8d8',
              maxWidth: '900px',
              margin: '0 auto',
              lineHeight: 1.8,
              animation: 'fadeInUp 1s ease-out',
              fontWeight: 400,
              letterSpacing: '0.3px'
            }}>
              Elite developers aren't machines—they're multidimensional humans who fuel creativity,
              sharpen focus, and sustain excellence through intentional life design.
            </p>
          </div>

          <div style={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
            marginBottom: '4rem',
            animation: 'fadeInUp 1.2s ease-out'
          }}>
            {categories.map(cat => (
              <button
                key={cat}
                className={`filter-btn ${filterCategory === cat ? 'active' : ''}`}
                onClick={() => setFilterCategory(cat)}
              >
                <span style={{ position: 'relative', zIndex: 1 }}>{cat}</span>
              </button>
            ))}
          </div>

          <div className="hobby-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(380px, 100%), 1fr))',
            gap: '2.5rem',
            marginBottom: '6rem',
            width: '100%'
          }}>
            {filteredHobbies.map((hobby, i) => (
              <div
                key={hobby.id}
                className="hobby-card"
                onMouseEnter={() => setHoveredId(hobby.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => setActiveHobby(hobby)}
                style={{ 
                  animation: `fadeInUp ${0.4 + i * 0.08}s ease-out`,
                  animationDelay: `${i * 0.04}s`,
                  animationFillMode: 'both',
                  '--card-color': hobby.color,
                  '--card-color-alpha': `${hobby.color}30`
                }}
              >
                <div style={{
                  height: '200px',
                  background: `linear-gradient(135deg, ${hobby.color}20, rgba(0,0,0,0.6))`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: `radial-gradient(circle at 50% 50%, ${hobby.color}30 0%, transparent 70%)`,
                    animation: hoveredId === hobby.id ? 'scaleIn 2s ease-in-out infinite' : 'none'
                  }} />

                  <div style={{
                    width: '120px',
                    height: '120px',
                    border: `3px solid ${hobby.color}`,
                    borderRadius: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    zIndex: 1,
                    animation: hoveredId === hobby.id ? 'floatAnimation 2s ease-in-out infinite' : 'none',
                    boxShadow: hoveredId === hobby.id ? `0 0 50px ${hobby.color}` : `0 0 15px ${hobby.color}`
                  }}>
                    <hobby.icon size={60} color={hobby.color} style={{ filter: `drop-shadow(0 0 8px ${hobby.color})` }} />
                  </div>

                  <div style={{
                    position: 'absolute',
                    top: '1rem',
                    left: '1rem',
                    padding: '0.4rem 1rem',
                    background: `${rarityColors[hobby.rarity]}20`,
                    border: `2px solid ${rarityColors[hobby.rarity]}`,
                    borderRadius: '999px',
                    fontSize: '0.7rem',
                    fontWeight: 800,
                    color: rarityColors[hobby.rarity],
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    animation: 'neonGlow 2s infinite'
                  }}>
                    <Star size={14} fill={rarityColors[hobby.rarity]} />
                    {hobby.rarity}
                  </div>
                </div>

                <div style={{ padding: '2rem' }}>
                  <div style={{
                    fontSize: '0.8rem',
                    color: hobby.color,
                    fontFamily: "'Fira Code', monospace",
                    marginBottom: '0.8rem',
                    fontWeight: 700,
                    letterSpacing: '1.2px',
                    textTransform: 'uppercase'
                  }}>
                    {hobby.category}
                  </div>

                  <h3 style={{
                    fontSize: '1.6rem',
                    fontWeight: 800,
                    color: '#fff',
                    marginBottom: '1rem',
                    fontFamily: "'Space Grotesk', sans-serif",
                    lineHeight: 1.3
                  }}>
                    {hobby.title}
                  </h3>

                  <p style={{
                    fontSize: '0.95rem',
                    color: '#b8b8d8',
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
                          background: 'rgba(10,10,30,0.6)',
                          borderRadius: '12px',
                          border: `1px solid ${hobby.color}25`,
                          textAlign: 'center'
                        }}
                      >
                        <stat.icon size={18} color={hobby.color} style={{ marginBottom: '0.4rem' }} />
                        <div style={{ fontSize: '1.2rem', fontWeight: 900, color: hobby.color, fontFamily: "'Space Grotesk', sans-serif" }}>
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
                    background: `linear-gradient(90deg, ${hobby.color}, ${hobby.color}CC)`,
                    color: '#000',
                    border: 'none',
                    borderRadius: '999px',
                    fontWeight: 900,
                    fontSize: '0.95rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.8rem',
                    transition: 'all 0.3s',
                    fontFamily: "'Inter', sans-serif",
                    letterSpacing: '0.5px',
                    textTransform: 'uppercase',
                    boxShadow: `0 8px 25px ${hobby.color}35`
                  }}>
                    <Sparkles size={20} />
                    Explore Deep Dive
                    <ArrowRight size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div style={{
            padding: '4rem 2.5rem',
            background: 'linear-gradient(135deg, rgba(10,10,30,0.95) 0%, rgba(25,15,45,0.85) 100%)',
            border: '3px solid rgba(0,240,255,0.3)',
            borderRadius: '32px',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
            animation: 'fadeInUp 2s ease-out'
          }}>
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(135deg, #00f0ff, #a78bfa, #ff61d2)',
              opacity: 0.06,
              pointerEvents: 'none',
              animation: 'shimmerAnimation 5s infinite'
            }} />

            <Rocket 
              size={70} 
              color="#00f0ff" 
              style={{ 
                margin: '0 auto 1.8rem',
                animation: 'floatAnimation 3s ease-in-out infinite',
                filter: 'drop-shadow(0 0 25px #00f0ff)'
              }} 
            />

            <h2 style={{
              fontSize: 'clamp(2.5rem, 7vw, 4.5rem)',
              fontWeight: 900,
              background: 'linear-gradient(135deg, #00f0ff, #a78bfa, #ff61d2)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '1.8rem',
              fontFamily: "'Space Grotesk', sans-serif",
              letterSpacing: '3px'
            }}>
              BUILD A LEGENDARY LIFE
            </h2>

            <p style={{
              fontSize: '1.3rem',
              color: '#b8b8d8',
              maxWidth: '750px',
              margin: '0 auto 3.5rem',
              lineHeight: 1.9,
              fontWeight: 400
            }}>
              Great code comes from great people. Let's connect and inspire each other
              to build exceptional software AND exceptional lives.
            </p>

            <div style={{
              display: 'flex',
              gap: '1.8rem',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              <a 
                href="https://github.com/bhagavan444" 
                target="_blank" 
                rel="noopener noreferrer" 
                style={{
                  padding: '1.3rem 3rem',
                  background: 'rgba(0,240,255,0.12)',
                  border: '2px solid #00f0ff',
                  borderRadius: '999px',
                  color: '#00f0ff',
                  fontWeight: 900,
                  fontSize: '1.1rem',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.9rem',
                  transition: 'all 0.3s',
                  fontFamily: "'Inter', sans-serif",
                  letterSpacing: '0.5px',
                  textTransform: 'uppercase',
                  backdropFilter: 'blur(10px)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px) scale(1.05)';
                  e.currentTarget.style.boxShadow = '0 15px 40px rgba(0,240,255,0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <Github size={24} />
                View Projects
              </a>

              <a 
                href="mailto:g.sivasatyasaibhagavan@gmail.com" 
                style={{
                  padding: '1.3rem 3rem',
                  background: 'linear-gradient(135deg, #00f0ff, #a78bfa, #ff61d2)',
                  borderRadius: '999px',
                  color: '#000',
                  fontWeight: 900,
                  fontSize: '1.1rem',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.9rem',
                  boxShadow: '0 15px 40px rgba(0,240,255,0.5)',
                  transition: 'all 0.3s',
                  fontFamily: "'Inter', sans-serif",
                  letterSpacing: '0.5px',
                  textTransform: 'uppercase'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px) scale(1.05)';
                  e.currentTarget.style.boxShadow = '0 25px 60px rgba(0,240,255,0.7)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = '0 15px 40px rgba(0,240,255,0.5)';
                }}
              >
                <Mail size={24} />
                Let's Connect
              </a>
            </div>
          </div>
        </div>
      </div>

      {activeHobby && (
        <div
          onClick={() => setActiveHobby(null)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.98)',
            backdropFilter: 'blur(20px)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem',
            overflowY: 'auto',
            animation: 'fadeInUp 0.4s ease-out'
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            className="modal-content"
            style={{
              maxWidth: '1200px',
              width: '100%',
              maxHeight: '95vh',
              overflowY: 'auto',
              boxShadow: `0 0 80px ${activeHobby.color}99`,
              position: 'relative'
            }}
          >
            <button
              onClick={() => setActiveHobby(null)}
              style={{
                position: 'absolute',
                top: '1.8rem',
                right: '1.8rem',
                background: 'rgba(255,0,0,0.25)',
                border: '2px solid #ff4444',
                borderRadius: '50%',
                width: '50px',
                height: '50px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ff4444',
                cursor: 'pointer',
                zIndex: 10,
                transition: 'all 0.3s',
                backdropFilter: 'blur(10px)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.1) rotate(90deg)';
                e.currentTarget.style.background = 'rgba(255,0,0,0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
                e.currentTarget.style.background = 'rgba(255,0,0,0.25)';
              }}
            >
              <X size={24} />
            </button>

            <div style={{ padding: 'clamp(2.5rem, 5vw, 4rem) clamp(2rem, 4vw, 3.5rem)' }}>
              <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
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
                  boxShadow: `0 0 60px ${activeHobby.color}`,
                  animation: 'floatAnimation 3s ease-in-out infinite'
                }}>
                  <activeHobby.icon size={70} color={activeHobby.color} />
                </div>

                <div style={{
                  fontSize: '1.2rem',
                  color: activeHobby.color,
                  fontWeight: 700,
                  marginBottom: '0.8rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '1rem',
                  flexWrap: 'wrap'
                }}>
                  <Star size={22} fill={rarityColors[activeHobby.rarity]} color={rarityColors[activeHobby.rarity]} />
                  {activeHobby.rarity} • {activeHobby.category}
                </div>

                <h2 style={{
                  fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                  fontWeight: 900,
                  background: `linear-gradient(135deg, ${activeHobby.color}, #ffffff)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  marginBottom: '1rem',
                  fontFamily: "'Space Grotesk', sans-serif"
                }}>
                  {activeHobby.title}
                </h2>

                <p style={{
                  fontSize: '1.2rem',
                  color: '#d8d8f8',
                  maxWidth: '800px',
                  margin: '0 auto',
                  lineHeight: 1.7
                }}>
                  {activeHobby.fullDesc}
                </p>
              </div>

              <div style={{ marginBottom: '3rem' }}>
                <h3 style={{
                  fontSize: '1.8rem',
                  color: activeHobby.color,
                  marginBottom: '1.5rem',
                  textAlign: 'center',
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 800
                }}>
                  Why It Matters
                </h3>
                <p style={{
                  fontSize: '1.1rem',
                  color: '#e8e8f8',
                  lineHeight: 1.7,
                  textAlign: 'center',
                  maxWidth: '900px',
                  margin: '0 auto'
                }}>
                  {activeHobby.whyItMatters}
                </p>
              </div>

              <div style={{ marginBottom: '3rem' }}>
                <h3 style={{
                  fontSize: '1.8rem',
                  color: activeHobby.color,
                  marginBottom: '1.5rem',
                  textAlign: 'center',
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 800
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
                      background: `${activeHobby.color}12`,
                      border: `2px solid ${activeHobby.color}35`,
                      borderRadius: '14px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      transition: 'all 0.3s'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateX(6px)';
                      e.currentTarget.style.borderColor = activeHobby.color;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateX(0)';
                      e.currentTarget.style.borderColor = `${activeHobby.color}35`;
                    }}
                    >
                      <CheckCircle2 size={22} color={activeHobby.color} style={{ flexShrink: 0 }} />
                      <span style={{ color: '#e8e8f8', fontSize: '0.95rem' }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ marginBottom: '3rem' }}>
                <h3 style={{
                  fontSize: '1.8rem',
                  color: activeHobby.color,
                  marginBottom: '1.5rem',
                  textAlign: 'center',
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 800
                }}>
                  Measurable Impact
                </h3>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                  gap: '1.5rem'
                }}>
                  {activeHobby.impact.map((item, idx) => (
                    <div key={idx} style={{
                      padding: '1.8rem',
                      background: 'rgba(10,10,30,0.6)',
                      border: `2px solid ${activeHobby.color}45`,
                      borderRadius: '16px',
                      textAlign: 'center',
                      transition: 'all 0.3s'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-6px)';
                      e.currentTarget.style.borderColor = activeHobby.color;
                      e.currentTarget.style.boxShadow = `0 15px 35px ${activeHobby.color}35`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.borderColor = `${activeHobby.color}45`;
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                    >
                      <Trophy size={32} color={activeHobby.color} style={{ marginBottom: '0.8rem' }} />
                      <div style={{
                        fontSize: '1.2rem',
                        fontWeight: 700,
                        color: '#e8e8f8',
                        lineHeight: 1.5
                      }}>
                        {item}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ marginBottom: '3rem' }}>
                <h3 style={{
                  fontSize: '1.8rem',
                  color: activeHobby.color,
                  marginBottom: '1.5rem',
                  textAlign: 'center',
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 800
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
                      padding: '1.8rem',
                      background: 'rgba(10,10,30,0.6)',
                      border: `2px solid ${activeHobby.color}45`,
                      borderRadius: '16px',
                      textAlign: 'center',
                      transition: 'all 0.3s'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-6px)';
                      e.currentTarget.style.borderColor = activeHobby.color;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.borderColor = `${activeHobby.color}45`;
                    }}
                    >
                      <stat.icon size={32} color={activeHobby.color} style={{ marginBottom: '0.8rem' }} />
                      <div style={{
                        fontSize: '2rem',
                        fontWeight: 900,
                        color: activeHobby.color,
                        fontFamily: "'Space Grotesk', sans-serif"
                      }}>
                        {stat.value}
                      </div>
                      <div style={{
                        color: '#c8c8e8',
                        fontSize: '0.95rem',
                        marginTop: '0.5rem'
                      }}>
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: window.innerWidth > 768 ? '1fr 1fr' : '1fr',
                gap: '2rem',
                marginBottom: '3rem'
              }}>
                <div style={{
                  padding: '2rem',
                  background: `${activeHobby.color}10`,
                  border: `2px solid ${activeHobby.color}40`,
                  borderRadius: '20px'
                }}>
                  <h4 style={{
                    color: activeHobby.color,
                    fontSize: '1.5rem',
                    marginBottom: '1rem',
                    textAlign: 'center',
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 700
                  }}>
                    Daily Routine
                  </h4>
                  <p style={{
                    color: '#e8e8f8',
                    textAlign: 'center',
                    lineHeight: 1.6,
                    fontSize: '1.05rem'
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
                      fontSize: '1.5rem',
                      marginBottom: '1rem',
                      textAlign: 'center',
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontWeight: 700
                    }}>
                      Favorite Books
                    </h4>
                    <ul style={{
                      listStyle: 'none',
                      color: '#e8e8f8',
                      lineHeight: 1.7,
                      fontSize: '1.05rem',
                      padding: 0
                    }}>
                      {activeHobby.favoriteBooks.map((book, idx) => (
                        <li key={idx} style={{ marginBottom: '0.5rem' }}>• {book}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div style={{ textAlign: 'center' }}>
                <button
                  onClick={() => setActiveHobby(null)}
                  style={{
                    padding: '1.3rem 3.5rem',
                    background: 'rgba(255,100,100,0.2)',
                    border: '2px solid #ff6666',
                    borderRadius: '999px',
                    color: '#ff6666',
                    fontWeight: 800,
                    fontSize: '1.1rem',
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    fontFamily: "'Inter', sans-serif",
                    textTransform: 'uppercase'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05)';
                    e.currentTarget.style.background = 'rgba(255,100,100,0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.background = 'rgba(255,100,100,0.2)';
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