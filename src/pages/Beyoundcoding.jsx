import React, { useState, useEffect } from "react";
import {
  BookOpen, Music, Coffee, Dumbbell, Camera, Film, Gamepad2,
  Sparkles, Zap, TrendingUp, Brain, Rocket, Crown,
  Flame, Star, Target, Award, Volume2, Timer, Activity, X, CheckCircle2,
  Headphones, Compass, Trophy, Eye,
  Github, Mail, ArrowRight
} from "lucide-react";

const C = {
  bg: "#ffffff",
  surface: "#f9fafb",
  surface2: "#f3f4f6",
  border: "rgba(0,0,0,0.06)",
  text: "#0f172a",
  muted: "#64748b",
  muted2: "#475569",
  accent: "#4f7fff",
  accentDim: "rgba(79,127,255,0.08)",
  green: "#10b981",
  greenDim: "rgba(16,185,129,0.08)",
  purple: "#a78bfa",
  purpleDim: "rgba(167,139,250,0.08)",
  amber: "#f59e0b",
  amberDim: "rgba(245,158,11,0.08)",
  rose: "#f43f5e",
  roseDim: "rgba(244,63,94,0.08)",
};

const hobbiesData = [
 
  {
    id: 2,
    title: "Music Production",
    icon: Music,
    color: C.purple,
    colorDim: C.purpleDim,
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
      { label: "Genres Explored", value: "25+", icon: Music },
      { label: "Focus Boost", value: "200%", icon: Activity }
    ],
    dailyRoutine: "Ambient for coding • Lo-fi for planning • Electronic for debugging"
  },
  {
    id: 3,
    title: "Coffee Culture",
    icon: Coffee,
    color: C.amber,
    colorDim: C.amberDim,
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
      { label: "Late Night Sprints", value: "∞", icon: Flame },
      { label: "Energy Level", value: "MAX", icon: Rocket }
    ],
    dailyRoutine: "Morning espresso • Afternoon cold brew • Evening pour-over"
  },
  {
    id: 4,
    title: "Strategic Gaming",
    icon: Gamepad2,
    color: C.green,
    colorDim: C.greenDim,
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
    dailyRoutine: "Evening strategy sessions • Weekend competitive matches"
  },
  {
    id: 5,
    title: "Cinema & Storytelling",
    icon: Film,
    color: C.rose,
    colorDim: C.roseDim,
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
    dailyRoutine: "Weekend film marathons • Evening director study sessions"
  },
  {
    id: 6,
    title: "Fitness & Discipline",
    icon: Dumbbell,
    color: "#ff6b6b",
    colorDim: "rgba(255,107,107,0.08)",
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
    dailyRoutine: "Morning strength training • Evening cardio • Daily stretching"
  },
  {
    id: 7,
    title: "Photography & Visual Arts",
    icon: Camera,
    color: "#ff9500",
    colorDim: "rgba(255,149,0,0.08)",
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
      { label: "Style", value: "Urban", icon: Star },
      { label: "Equipment", value: "Pro", icon: Award },
      { label: "Skill Level", value: "Expert", icon: Trophy }
    ],
    dailyRoutine: "Weekend photo walks • Golden hour sessions • Evening editing"
  },
  {
    id: 8,
    title: "Travel & Exploration",
    icon: Compass,
    color: "#00d4ff",
    colorDim: "rgba(0,212,255,0.08)",
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
      { label: "Cultures Explored", value: "10+", icon: Star },
      { label: "Languages", value: "3", icon: BookOpen },
      { label: "Perspective Gain", value: "∞", icon: Brain }
    ],
    dailyRoutine: "Planning next adventure • Virtual cultural exploration • Language learning"
  }
];

const categories = ["All", "Intellectual", "Creative", "Physical", "Lifestyle", "Mental Training", "Experiential"];

const rarityConfig = {
  "Legendary": { color: C.amber, icon: Crown },
  "Epic": { color: C.purple, icon: Sparkles },
  "Rare": { color: C.accent, icon: Star }
};

function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress((window.scrollY / total) * 100);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div style={{ position: "fixed", top: 0, left: 0, right: 0, height: "2px", background: C.surface2, zIndex: 9998 }}>
      <div
        style={{
          height: "100%",
          width: `${progress}%`,
          background: `linear-gradient(90deg, ${C.accent}, ${C.purple}, ${C.green})`,
          transition: "width 0.1s linear",
        }}
      />
    </div>
  );
}

export default function BeyondCoding() {
  const [activeHobby, setActiveHobby] = useState(null);
  const [hoveredId, setHoveredId] = useState(null);
  const [filterCategory, setFilterCategory] = useState("All");

  const filteredHobbies = hobbiesData.filter(
    (h) => filterCategory === "All" || h.category === filterCategory
  );

  return (
    <div style={{ minHeight: "100vh", background: C.bg, color: C.text, fontFamily: "'Geist', system-ui, sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,700&family=Inter:wght@400;600;700&display=swap');

        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { -webkit-font-smoothing: antialiased; }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        @keyframes shimmer {
          0% { left: -100%; }
          100% { left: 100%; }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>

      <ScrollProgress />

      <div style={{ position: "relative", zIndex: 1 }}>
        {/* Header */}
        <header style={{ maxWidth: "1240px", margin: "0 auto", padding: "6rem 2rem 4rem", borderBottom: `1px solid ${C.border}` }}>
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.8rem",
            padding: "0.6rem 1.5rem",
            background: C.accentDim,
            border: `2px solid ${C.accent}40`,
            borderRadius: "999px",
            marginBottom: "2rem",
          }}>
            <Sparkles size={16} color={C.accent} />
            <span style={{
              fontFamily: "'Inter', monospace",
              fontSize: "0.7rem",
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: C.accent,
            }}>
              The Complete Developer
            </span>
            <Flame size={16} color={C.amber} />
          </div>

          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(2.5rem, 7vw, 5.5rem)",
            fontWeight: 700,
            fontStyle: "italic",
            color: C.text,
            lineHeight: 1.1,
            marginBottom: "1rem",
            maxWidth: "900px",
          }}>
            Beyond the Code
          </h1>

          <div style={{
            width: "180px",
            height: "4px",
            background: `linear-gradient(90deg, ${C.accent}, ${C.purple}, ${C.green})`,
            borderRadius: "2px",
            marginBottom: "2rem",
          }} />

          <p style={{
            fontSize: "1.15rem",
            color: C.muted2,
            lineHeight: 1.7,
            maxWidth: "750px",
            marginBottom: "3rem",
          }}>
            Elite developers aren&apos;t machines—they&apos;re multidimensional humans who fuel creativity,
            sharpen focus, and sustain excellence through intentional life design.
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.8rem" }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                style={{
                  padding: "0.7rem 1.4rem",
                  background: filterCategory === cat ? C.accentDim : C.surface,
                  border: `2px solid ${filterCategory === cat ? C.accent + "60" : C.border}`,
                  borderRadius: "999px",
                  color: filterCategory === cat ? C.accent : C.muted2,
                  fontFamily: "'Inter', monospace",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  letterSpacing: "0.04em",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  textTransform: "uppercase",
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </header>

        {/* Cards Section */}
        <section style={{ maxWidth: "1240px", margin: "0 auto", padding: "3rem 2rem" }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(340px, 100%), 1fr))",
            gap: "2rem",
          }}>
            {filteredHobbies.map((hobby, i) => {
              const IconComponent = hobby.icon;
              const RarityIcon = rarityConfig[hobby.rarity].icon;
              
              return (
                <div
                  key={hobby.id}
                  onMouseEnter={() => setHoveredId(hobby.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onClick={() => setActiveHobby(hobby)}
                  style={{
                    background: C.surface,
                    border: `1px solid ${hoveredId === hobby.id ? hobby.color + "40" : C.border}`,
                    borderRadius: "18px",
                    overflow: "hidden",
                    cursor: "pointer",
                    transition: "all 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
                    transform: hoveredId === hobby.id ? "translateY(-6px)" : "translateY(0)",
                    boxShadow: hoveredId === hobby.id ? `0 16px 40px ${hobby.color}20` : "0 2px 12px rgba(0,0,0,0.04)",
                    position: "relative",
                    animation: `slideIn 0.6s ease ${i * 0.08}s both`,
                  }}
                >
                  {/* Card Header with Icon */}
                  <div style={{
                    height: "180px",
                    background: `linear-gradient(135deg, ${hobby.colorDim}, ${C.surface2})`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                  }}>
                    <div style={{
                      width: "100px",
                      height: "100px",
                      border: `3px solid ${hobby.color}`,
                      borderRadius: "18px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: C.surface,
                      boxShadow: `0 0 25px ${hobby.color}30`,
                    }}>
                      <IconComponent size={50} color={hobby.color} />
                    </div>

                    <div style={{
                      position: "absolute",
                      top: "1rem",
                      right: "1rem",
                      padding: "0.35rem 0.9rem",
                      background: `${rarityConfig[hobby.rarity].color}15`,
                      border: `2px solid ${rarityConfig[hobby.rarity].color}`,
                      borderRadius: "999px",
                      fontSize: "0.65rem",
                      fontWeight: 700,
                      color: rarityConfig[hobby.rarity].color,
                      display: "flex",
                      alignItems: "center",
                      gap: "0.35rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.04em",
                    }}>
                      <RarityIcon size={12} />
                      {hobby.rarity}
                    </div>
                  </div>

                  {/* Card Content */}
                  <div style={{ padding: "1.8rem" }}>
                    <div style={{
                      fontSize: "0.7rem",
                      color: hobby.color,
                      marginBottom: "0.7rem",
                      fontWeight: 700,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                    }}>
                      {hobby.category}
                    </div>

                    <h3 style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: "1.4rem",
                      fontWeight: 700,
                      fontStyle: "italic",
                      color: C.text,
                      marginBottom: "0.9rem",
                      lineHeight: 1.3,
                    }}>
                      {hobby.title}
                    </h3>

                    <p style={{
                      fontSize: "0.9rem",
                      color: C.muted2,
                      lineHeight: 1.6,
                      marginBottom: "1.3rem",
                    }}>
                      {hobby.desc}
                    </p>

                    {/* Stats Grid */}
                    <div style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(2, 1fr)",
                      gap: "0.7rem",
                      marginBottom: "1.3rem",
                    }}>
                      {hobby.stats.slice(0, 4).map((stat, idx) => {
                        const StatIcon = stat.icon;
                        return (
                          <div key={idx} style={{
                            padding: "0.9rem",
                            background: C.surface2,
                            border: `1px solid ${C.border}`,
                            borderRadius: "10px",
                            textAlign: "center",
                          }}>
                            <div style={{ display: "flex", justifyContent: "center", marginBottom: "0.4rem" }}>
                              <StatIcon size={16} color={hobby.color} />
                            </div>
                            <div style={{
                              fontFamily: "'Playfair Display', serif",
                              fontSize: "1.3rem",
                              fontWeight: 700,
                              fontStyle: "italic",
                              color: hobby.color,
                            }}>
                              {stat.value}
                            </div>
                            <div style={{ fontSize: "0.65rem", color: C.muted, marginTop: "0.2rem" }}>
                              {stat.label}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Explore Button */}
                    <button style={{
                      width: "100%",
                      padding: "0.9rem",
                      background: hobby.colorDim,
                      border: `2px solid ${hobby.color}40`,
                      borderRadius: "10px",
                      fontWeight: 700,
                      fontSize: "0.85rem",
                      color: hobby.color,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "0.7rem",
                      transition: "all 0.3s ease",
                      textTransform: "uppercase",
                      letterSpacing: "0.04em",
                    }}>
                      <Sparkles size={16} />
                      Explore Deep Dive
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* CTA Section */}
        <section style={{ maxWidth: "1240px", margin: "0 auto", padding: "0 2rem 6rem" }}>
          <div style={{
            textAlign: "center",
            padding: "3.5rem 2.5rem",
            background: `linear-gradient(135deg, ${C.accentDim} 0%, ${C.purpleDim} 100%)`,
            border: `2px solid ${C.accent}40`,
            borderRadius: "22px",
            position: "relative",
          }}>
            <div style={{ position: "relative", zIndex: 1 }}>
              <div style={{ display: "flex", justifyContent: "center", marginBottom: "1.3rem" }}>
                <Rocket size={52} color={C.accent} style={{ animation: "float 3s ease-in-out infinite" }} />
              </div>

              <h2 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(2rem, 4.5vw, 3.5rem)",
                fontWeight: 700,
                fontStyle: "italic",
                color: C.text,
                marginBottom: "1.3rem",
              }}>
                Build a Legendary Life
              </h2>

              <p style={{
                fontSize: "1.1rem",
                color: C.muted2,
                maxWidth: "650px",
                margin: "0 auto 2.5rem",
                lineHeight: 1.7,
              }}>
                Great code comes from great people. Let&apos;s connect and inspire each other
                to build exceptional software AND exceptional lives.
              </p>

              <div style={{ display: "flex", gap: "1.2rem", justifyContent: "center", flexWrap: "wrap" }}>
                <a
                  href="https://github.com/bhagavan444"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.7rem",
                    padding: "0.9rem 1.8rem",
                    background: C.accentDim,
                    border: `2px solid ${C.accent}60`,
                    borderRadius: "10px",
                    color: C.accent,
                    fontWeight: 700,
                    fontSize: "0.95rem",
                    textDecoration: "none",
                    transition: "all 0.3s ease",
                    textTransform: "uppercase",
                    letterSpacing: "0.04em",
                  }}
                >
                  <Github size={18} />
                  View Projects
                </a>

                <a
                  href="mailto:g.sivasatyasaibhagavan@gmail.com"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.7rem",
                    padding: "0.9rem 1.8rem",
                    background: `linear-gradient(135deg, ${C.accent}, ${C.purple})`,
                    borderRadius: "10px",
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: "0.95rem",
                    textDecoration: "none",
                    boxShadow: `0 12px 32px ${C.accent}35`,
                    transition: "all 0.3s ease",
                    textTransform: "uppercase",
                    letterSpacing: "0.04em",
                  }}
                >
                  <Mail size={18} />
                  Let&apos;s Connect
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Modal */}
      {activeHobby && (
        <div
          onClick={() => setActiveHobby(null)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.92)",
            backdropFilter: "blur(12px)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "2rem",
            overflowY: "auto",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: "1000px",
              width: "100%",
              maxHeight: "90vh",
              overflowY: "auto",
              background: C.surface,
              borderRadius: "24px",
              position: "relative",
              border: `2px solid ${activeHobby.color}40`,
              boxShadow: `0 0 60px ${activeHobby.color}25`,
            }}
          >
            <button
              onClick={() => setActiveHobby(null)}
              style={{
                position: "absolute",
                top: "1.3rem",
                right: "1.3rem",
                background: "rgba(255,0,0,0.12)",
                border: "2px solid #ff4444",
                borderRadius: "50%",
                width: "44px",
                height: "44px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#ff4444",
                cursor: "pointer",
                zIndex: 10,
              }}
            >
              <X size={22} />
            </button>

            <div style={{ padding: "3rem 2.5rem" }}>
              {/* Modal Header */}
              <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
                <div style={{
                  width: "110px",
                  height: "110px",
                  margin: "0 auto 1.2rem",
                  border: `3px solid ${activeHobby.color}`,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: activeHobby.colorDim,
                  boxShadow: `0 0 35px ${activeHobby.color}35`,
                }}>
                  <activeHobby.icon size={55} color={activeHobby.color} />
                </div>

                <div style={{
                  fontSize: "0.85rem",
                  color: activeHobby.color,
                  fontWeight: 700,
                  marginBottom: "0.9rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                }}>
                  {activeHobby.rarity} • {activeHobby.category}
                </div>

                <h2 style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(1.8rem, 4.5vw, 3rem)",
                  fontWeight: 700,
                  fontStyle: "italic",
                  color: C.text,
                  marginBottom: "0.9rem",
                }}>
                  {activeHobby.title}
                </h2>

                <p style={{
                  fontSize: "1.05rem",
                  color: C.muted2,
                  maxWidth: "700px",
                  margin: "0 auto",
                  lineHeight: 1.65,
                }}>
                  {activeHobby.fullDesc}
                </p>
              </div>

              {/* Why It Matters */}
              <div style={{ marginBottom: "2.5rem" }}>
                <h3 style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "1.7rem",
                  fontWeight: 700,
                  fontStyle: "italic",
                  color: activeHobby.color,
                  marginBottom: "1.2rem",
                  textAlign: "center",
                }}>
                  Why It Matters
                </h3>
                <p style={{
                  fontSize: "1rem",
                  color: C.muted2,
                  lineHeight: 1.65,
                  textAlign: "center",
                  maxWidth: "800px",
                  margin: "0 auto",
                }}>
                  {activeHobby.whyItMatters}
                </p>
              </div>

              {/* Key Learnings */}
              <div style={{ marginBottom: "2.5rem" }}>
                <h3 style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "1.7rem",
                  fontWeight: 700,
                  fontStyle: "italic",
                  color: activeHobby.color,
                  marginBottom: "1.2rem",
                  textAlign: "center",
                }}>
                  Key Learnings
                </h3>
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                  gap: "0.9rem",
                }}>
                  {activeHobby.learnings.map((item, idx) => (
                    <div key={idx} style={{
                      padding: "1.1rem",
                      background: activeHobby.colorDim,
                      border: `2px solid ${activeHobby.color}28`,
                      borderRadius: "10px",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.9rem",
                    }}>
                      <CheckCircle2 size={18} color={activeHobby.color} style={{ flexShrink: 0 }} />
                      <span style={{ color: C.text, fontSize: "0.9rem" }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Measurable Impact */}
              <div style={{ marginBottom: "2.5rem" }}>
                <h3 style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "1.7rem",
                  fontWeight: 700,
                  fontStyle: "italic",
                  color: activeHobby.color,
                  marginBottom: "1.2rem",
                  textAlign: "center",
                }}>
                  Measurable Impact
                </h3>
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                  gap: "1.2rem",
                }}>
                  {activeHobby.impact.map((item, idx) => (
                    <div key={idx} style={{
                      padding: "1.6rem",
                      background: C.surface2,
                      border: `2px solid ${C.border}`,
                      borderRadius: "12px",
                      textAlign: "center",
                    }}>
                      <div style={{ display: "flex", justifyContent: "center", marginBottom: "0.9rem" }}>
                        <Trophy size={30} color={activeHobby.color} />
                      </div>
                      <div style={{ fontSize: "1.05rem", fontWeight: 600, color: C.text, lineHeight: 1.5 }}>
                        {item}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stats Overview */}
              <div style={{ marginBottom: "2.5rem" }}>
                <h3 style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "1.7rem",
                  fontWeight: 700,
                  fontStyle: "italic",
                  color: activeHobby.color,
                  marginBottom: "1.2rem",
                  textAlign: "center",
                }}>
                  Stats Overview
                </h3>
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
                  gap: "1.2rem",
                }}>
                  {activeHobby.stats.map((stat, idx) => {
                    const StatIcon = stat.icon;
                    return (
                      <div key={idx} style={{
                        padding: "1.6rem",
                        background: C.surface2,
                        border: `2px solid ${C.border}`,
                        borderRadius: "12px",
                        textAlign: "center",
                      }}>
                        <div style={{ display: "flex", justifyContent: "center", marginBottom: "0.7rem" }}>
                          <StatIcon size={26} color={activeHobby.color} />
                        </div>
                        <div style={{
                          fontFamily: "'Playfair Display', serif",
                          fontSize: "1.9rem",
                          fontWeight: 700,
                          fontStyle: "italic",
                          color: activeHobby.color,
                        }}>
                          {stat.value}
                        </div>
                        <div style={{ color: C.muted, fontSize: "0.85rem", marginTop: "0.4rem" }}>
                          {stat.label}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Daily Routine */}
              <div style={{
                padding: "1.8rem",
                background: activeHobby.colorDim,
                border: `2px solid ${activeHobby.color}38`,
                borderRadius: "14px",
                marginBottom: "1.8rem",
              }}>
                <h4 style={{
                  fontFamily: "'Playfair Display', serif",
                  color: activeHobby.color,
                  fontSize: "1.3rem",
                  fontWeight: 700,
                  fontStyle: "italic",
                  marginBottom: "0.9rem",
                  textAlign: "center",
                }}>
                  Daily Routine
                </h4>
                <p style={{
                  color: C.text,
                  textAlign: "center",
                  lineHeight: 1.6,
                  fontSize: "1rem",
                }}>
                  {activeHobby.dailyRoutine}
                </p>
              </div>

              {/* Close Button */}
              <div style={{ textAlign: "center" }}>
                <button
                  onClick={() => setActiveHobby(null)}
                  style={{
                    padding: "0.9rem 2.8rem",
                    background: "rgba(255,100,100,0.1)",
                    border: "2px solid #ff6666",
                    borderRadius: "10px",
                    color: "#ff6666",
                    fontWeight: 700,
                    fontSize: "0.95rem",
                    cursor: "pointer",
                    textTransform: "uppercase",
                    letterSpacing: "0.04em",
                  }}
                >
                  Close Deep Dive
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}