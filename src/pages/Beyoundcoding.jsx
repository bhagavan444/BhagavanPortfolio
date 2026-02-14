"use client";

import React, { useState, useEffect, useRef } from "react";
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
  border2: "rgba(0,0,0,0.10)",
  border3: "rgba(0,0,0,0.14)",
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
    id: 1,
    title: "Reading & Research",
    icon: BookOpen,
    color: C.accent,
    colorDim: C.accentDim,
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
    dailyRoutine: "2-3 hours daily: morning reading sessions + late-night deep dives"
  },
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

function FloatingElements() {
  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
      <div
        style={{
          position: "absolute",
          top: "10%",
          left: "15%",
          width: "1px",
          height: "200px",
          background: `linear-gradient(180deg, transparent, ${C.accent}08, transparent)`,
          animation: "floatVertical1 35s ease-in-out infinite",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "40%",
          right: "20%",
          width: "1px",
          height: "280px",
          background: `linear-gradient(180deg, transparent, ${C.purple}06, transparent)`,
          animation: "floatVertical2 40s ease-in-out infinite",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "60%",
          left: "10%",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${C.green}04 0%, transparent 70%)`,
          filter: "blur(60px)",
          animation: "floatHorizontal1 50s linear infinite",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "20%",
          right: "5%",
          width: "500px",
          height: "300px",
          borderRadius: "50%",
          background: `radial-gradient(ellipse, ${C.accent}03 0%, transparent 60%)`,
          filter: "blur(80px)",
          animation: "floatHorizontal2 60s linear infinite reverse",
        }}
      />
    </div>
  );
}

function MovingTextStrips() {
  const strip1 = "READING · MUSIC · FITNESS · GAMING · TRAVEL · PHOTOGRAPHY · ";
  const strip2 = "DISCIPLINE · CREATIVITY · GROWTH · BALANCE · EXCELLENCE · ";

  return (
    <>
      <div
        style={{
          position: "absolute",
          top: "30%",
          left: 0,
          width: "100%",
          overflow: "hidden",
          pointerEvents: "none",
          opacity: 0.03,
        }}
      >
        <div
          style={{
            display: "flex",
            whiteSpace: "nowrap",
            animation: "scrollTextRTL 45s linear infinite",
            fontFamily: "'DM Mono', monospace",
            fontSize: "3.5rem",
            fontWeight: 700,
            letterSpacing: "0.3em",
            color: C.text,
            filter: "blur(1px)",
          }}
        >
          {strip1.repeat(10)}
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          top: "65%",
          left: 0,
          width: "100%",
          overflow: "hidden",
          pointerEvents: "none",
          opacity: 0.025,
        }}
      >
        <div
          style={{
            display: "flex",
            whiteSpace: "nowrap",
            animation: "scrollTextRTL 60s linear infinite",
            fontFamily: "'DM Mono', monospace",
            fontSize: "2.5rem",
            fontWeight: 600,
            letterSpacing: "0.25em",
            color: C.text,
            filter: "blur(1.5px)",
          }}
        >
          {strip2.repeat(10)}
        </div>
      </div>
    </>
  );
}

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
  const [headerInView, setHeaderInView] = useState(false);
  const [cardsInView, setCardsInView] = useState(false);
  const headerRef = useRef(null);
  const cardsRef = useRef(null);

  useEffect(() => {
    const observers = [
      { ref: headerRef, setter: setHeaderInView },
      { ref: cardsRef, setter: setCardsInView },
    ];

    const observerInstances = observers.map(({ ref, setter }) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setter(true);
        },
        { threshold: 0.2 }
      );
      if (ref.current) observer.observe(ref.current);
      return observer;
    });

    return () => observerInstances.forEach((obs) => obs.disconnect());
  }, []);

  const filteredHobbies = hobbiesData.filter(
    (h) => filterCategory === "All" || h.category === filterCategory
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&family=DM+Mono:wght@400;500;600;700&family=Geist:wght@300;400;500;600;700&display=swap');

        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body {
          font-family: 'Geist', system-ui, sans-serif;
          background: ${C.bg};
          color: ${C.text};
          -webkit-font-smoothing: antialiased;
        }

        ::selection { background: ${C.accentDim}; color: ${C.text}; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: ${C.bg}; }
        ::-webkit-scrollbar-thumb { background: ${C.border3}; border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: ${C.muted}; }

        @keyframes slideInFromRight {
          from { opacity: 0; transform: translateX(40px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInFromBottom {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scrollTextRTL {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @keyframes shimmerSweep {
          0% { left: -100%; }
          100% { left: 100%; }
        }
        @keyframes floatAnimation {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        @keyframes floatVertical1 {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-40px); }
        }
        @keyframes floatVertical2 {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(60px); }
        }
        @keyframes floatHorizontal1 {
          from { transform: translateX(0); }
          to { transform: translateX(100vw); }
        }
        @keyframes floatHorizontal2 {
          from { transform: translateX(0); }
          to { transform: translateX(-100vw); }
        }
        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 20px currentColor; }
          50% { box-shadow: 0 0 40px currentColor; }
        }
      `}</style>

      <ScrollProgress />
      <FloatingElements />
      <MovingTextStrips />

      <div
        style={{
          position: "fixed",
          inset: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.015'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div style={{ position: "relative", zIndex: 1 }}>
        <header
          ref={headerRef}
          style={{
            maxWidth: "1240px",
            margin: "0 auto",
            padding: "8rem 2rem 6rem",
            borderBottom: `1px solid ${C.border}`,
            position: "relative",
            opacity: headerInView ? 1 : 0,
            transform: headerInView ? "translateY(0)" : "translateY(40px)",
            transition: "opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1), transform 0.8s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "30%",
              left: "50%",
              transform: "translateX(-50%)",
              width: "800px",
              height: "400px",
              borderRadius: "50%",
              background: `radial-gradient(circle, ${C.accent}08 0%, transparent 70%)`,
              filter: "blur(100px)",
              pointerEvents: "none",
            }}
          />

          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.8rem",
              padding: "0.7rem 1.8rem",
              background: C.accentDim,
              border: `2px solid ${C.accent}40`,
              borderRadius: "999px",
              marginBottom: "2rem",
              animation: "floatAnimation 3s ease-in-out infinite",
            }}
          >
            <Sparkles size={18} color={C.accent} />
            <span
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: "0.75rem",
                fontWeight: 700,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: C.accent,
              }}
            >
              The Complete Developer
            </span>
            <Flame size={18} color={C.amber} />
          </div>

          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(3rem, 8vw, 6.5rem)",
              fontWeight: 700,
              fontStyle: "italic",
              color: C.text,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              marginBottom: "1rem",
              maxWidth: "1000px",
            }}
          >
            Beyond the Code
          </h1>

          <div
            style={{
              width: "200px",
              height: "4px",
              background: `linear-gradient(90deg, ${C.accent}, ${C.purple}, ${C.green})`,
              borderRadius: "2px",
              marginBottom: "2.5rem",
              animation: headerInView ? "slideInFromRight 0.8s ease 0.2s both" : "none",
            }}
          />

          <p
            style={{
              fontSize: "1.25rem",
              color: C.muted2,
              lineHeight: 1.8,
              maxWidth: "820px",
              marginBottom: "4rem",
            }}
          >
            Elite developers aren't machines—they're multidimensional humans who fuel creativity,
            sharpen focus, and sustain excellence through intentional life design.
          </p>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "1rem",
              marginBottom: "3rem",
            }}
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                style={{
                  padding: "0.8rem 1.6rem",
                  background: filterCategory === cat ? C.accentDim : C.surface,
                  border: `2px solid ${filterCategory === cat ? C.accent + "60" : C.border}`,
                  borderRadius: "999px",
                  color: filterCategory === cat ? C.accent : C.muted2,
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  letterSpacing: "0.05em",
                  cursor: "pointer",
                  transition: "all 0.3s cubic-bezier(0.22, 1, 0.36, 1)",
                  textTransform: "uppercase",
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </header>

        <section
          ref={cardsRef}
          style={{
            maxWidth: "1240px",
            margin: "0 auto",
            padding: "4rem 2rem",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(min(360px, 100%), 1fr))",
              gap: "2rem",
            }}
          >
            {filteredHobbies.map((hobby, i) => (
              <div
                key={hobby.id}
                onMouseEnter={() => setHoveredId(hobby.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => setActiveHobby(hobby)}
                style={{
                  background: C.surface,
                  border: `1px solid ${hoveredId === hobby.id ? hobby.color + "40" : C.border}`,
                  borderRadius: "20px",
                  overflow: "hidden",
                  cursor: "pointer",
                  transition: "all 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
                  transform: hoveredId === hobby.id ? "translateY(-8px) translateX(4px)" : "translateY(0)",
                  boxShadow: hoveredId === hobby.id ? `0 20px 48px ${hobby.color}15` : "0 4px 16px rgba(0,0,0,0.04)",
                  opacity: cardsInView ? 1 : 0,
                  animation: cardsInView ? `slideInFromRight 0.7s cubic-bezier(0.22,1,0.36,1) ${i * 0.1}s both` : "none",
                  position: "relative",
                }}
              >
                {hoveredId === hobby.id && (
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: "-100%",
                      width: "100%",
                      height: "100%",
                      background: `linear-gradient(90deg, transparent, ${hobby.color}20, transparent)`,
                      animation: "shimmerSweep 1.5s ease-in-out",
                      pointerEvents: "none",
                    }}
                  />
                )}

                <div
                  style={{
                    height: "200px",
                    background: `linear-gradient(135deg, ${hobby.colorDim}, ${C.surface2})`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: `radial-gradient(circle at 50% 50%, ${hobby.color}20 0%, transparent 70%)`,
                      animation: hoveredId === hobby.id ? "pulseGlow 2s infinite" : "none",
                    }}
                  />

                  <div
                    style={{
                      width: "110px",
                      height: "110px",
                      border: `3px solid ${hobby.color}`,
                      borderRadius: "20px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: C.surface,
                      position: "relative",
                      zIndex: 1,
                      animation: hoveredId === hobby.id ? "floatAnimation 2s ease-in-out infinite" : "none",
                      boxShadow: `0 0 30px ${hobby.color}30`,
                    }}
                  >
                    <hobby.icon
                      size={56}
                      color={hobby.color}
                      style={{
                        transition: "transform 0.3s ease",
                        transform: hoveredId === hobby.id ? "scale(1.1) rotate(5deg)" : "scale(1)",
                      }}
                    />
                  </div>

                  <div
                    style={{
                      position: "absolute",
                      top: "1rem",
                      right: "1rem",
                      padding: "0.4rem 1rem",
                      background: `${rarityConfig[hobby.rarity].color}15`,
                      border: `2px solid ${rarityConfig[hobby.rarity].color}`,
                      borderRadius: "999px",
                      fontSize: "0.7rem",
                      fontWeight: 700,
                      color: rarityConfig[hobby.rarity].color,
                      display: "flex",
                      alignItems: "center",
                      gap: "0.4rem",
                      fontFamily: "'DM Mono', monospace",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {React.createElement(rarityConfig[hobby.rarity].icon, { size: 14 })}
                    {hobby.rarity}
                  </div>
                </div>

                <div style={{ padding: "2rem" }}>
                  <div
                    style={{
                      fontSize: "0.75rem",
                      color: hobby.color,
                      fontFamily: "'DM Mono', monospace",
                      marginBottom: "0.8rem",
                      fontWeight: 700,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                    }}
                  >
                    {hobby.category}
                  </div>

                  <h3
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: "1.5rem",
                      fontWeight: 700,
                      fontStyle: "italic",
                      color: C.text,
                      marginBottom: "1rem",
                      lineHeight: 1.3,
                    }}
                  >
                    {hobby.title}
                  </h3>

                  <p
                    style={{
                      fontSize: "0.95rem",
                      color: C.muted2,
                      lineHeight: 1.6,
                      marginBottom: "1.5rem",
                    }}
                  >
                    {hobby.desc}
                  </p>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(2, 1fr)",
                      gap: "0.8rem",
                      marginBottom: "1.5rem",
                    }}
                  >
                    {hobby.stats.slice(0, 4).map((stat, idx) => (
                      <div
                        key={idx}
                        style={{
                          padding: "1rem",
                          background: C.surface2,
                          border: `1px solid ${C.border}`,
                          borderRadius: "12px",
                          textAlign: "center",
                          transition: "all 0.3s ease",
                        }}
                      >
                        <stat.icon size={18} color={hobby.color} style={{ marginBottom: "0.5rem" }} />
                        <div
                          style={{
                            fontFamily: "'Playfair Display', serif",
                            fontSize: "1.4rem",
                            fontWeight: 700,
                            fontStyle: "italic",
                            color: hobby.color,
                          }}
                        >
                          {stat.value}
                        </div>
                        <div style={{ fontSize: "0.7rem", color: C.muted, marginTop: "0.25rem" }}>
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  <button
                    style={{
                      width: "100%",
                      padding: "1rem",
                      background: hobby.colorDim,
                      border: `2px solid ${hobby.color}40`,
                      borderRadius: "12px",
                      fontWeight: 700,
                      fontSize: "0.9rem",
                      color: hobby.color,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "0.8rem",
                      transition: "all 0.3s cubic-bezier(0.22, 1, 0.36, 1)",
                      fontFamily: "'DM Mono', monospace",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                  >
                    <Sparkles size={18} />
                    Explore Deep Dive
                    <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section
          style={{
            maxWidth: "1240px",
            margin: "0 auto",
            padding: "0 2rem 8rem",
          }}
        >
          <div
            style={{
              textAlign: "center",
              padding: "4rem 3rem",
              background: `linear-gradient(135deg, ${C.accentDim} 0%, ${C.purpleDim} 100%)`,
              border: `2px solid transparent`,
              backgroundImage: `linear-gradient(135deg, ${C.accentDim} 0%, ${C.purpleDim} 100%), linear-gradient(90deg, ${C.accent}40, ${C.purple}40)`,
              backgroundOrigin: "border-box",
              backgroundClip: "padding-box, border-box",
              borderRadius: "24px",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "600px",
                height: "300px",
                background: `radial-gradient(circle, ${C.accent}15 0%, transparent 70%)`,
                filter: "blur(80px)",
                pointerEvents: "none",
              }}
            />

            <div style={{ position: "relative", zIndex: 1 }}>
              <Rocket
                size={60}
                color={C.accent}
                style={{
                  margin: "0 auto 1.5rem",
                  animation: "floatAnimation 3s ease-in-out infinite",
                  filter: `drop-shadow(0 0 20px ${C.accent})`,
                }}
              />

              <h2
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(2.5rem, 5vw, 4rem)",
                  fontWeight: 700,
                  fontStyle: "italic",
                  color: C.text,
                  marginBottom: "1.5rem",
                  letterSpacing: "-0.01em",
                }}
              >
                Build a Legendary Life
              </h2>

              <p
                style={{
                  fontSize: "1.2rem",
                  color: C.muted2,
                  maxWidth: "720px",
                  margin: "0 auto 3rem",
                  lineHeight: 1.8,
                }}
              >
                Great code comes from great people. Let's connect and inspire each other
                to build exceptional software AND exceptional lives.
              </p>

              <div
                style={{
                  display: "flex",
                  gap: "1.5rem",
                  justifyContent: "center",
                  flexWrap: "wrap",
                }}
              >
                <a
                  href="https://github.com/bhagavan444"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.8rem",
                    padding: "1rem 2rem",
                    background: C.accentDim,
                    border: `2px solid ${C.accent}60`,
                    borderRadius: "12px",
                    color: C.accent,
                    fontWeight: 700,
                    fontSize: "1rem",
                    textDecoration: "none",
                    transition: "all 0.3s cubic-bezier(0.22, 1, 0.36, 1)",
                    fontFamily: "'DM Mono', monospace",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  <Github size={20} />
                  View Projects
                </a>

                <a
                  href="mailto:g.sivasatyasaibhagavan@gmail.com"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.8rem",
                    padding: "1rem 2rem",
                    background: `linear-gradient(135deg, ${C.accent}, ${C.purple})`,
                    borderRadius: "12px",
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: "1rem",
                    textDecoration: "none",
                    boxShadow: `0 15px 40px ${C.accent}40`,
                    transition: "all 0.3s cubic-bezier(0.22, 1, 0.36, 1)",
                    fontFamily: "'DM Mono', monospace",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  <Mail size={20} />
                  Let's Connect
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>

      {activeHobby && (
        <div
          onClick={() => setActiveHobby(null)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.95)",
            backdropFilter: "blur(20px)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "2rem",
            overflowY: "auto",
            animation: "slideInFromBottom 0.4s ease-out",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: "1100px",
              width: "100%",
              maxHeight: "90vh",
              overflowY: "auto",
              background: C.surface,
              borderRadius: "28px",
              position: "relative",
              border: `2px solid ${activeHobby.color}40`,
              boxShadow: `0 0 80px ${activeHobby.color}30`,
            }}
          >
            <button
              onClick={() => setActiveHobby(null)}
              style={{
                position: "absolute",
                top: "1.5rem",
                right: "1.5rem",
                background: "rgba(255,0,0,0.15)",
                border: "2px solid #ff4444",
                borderRadius: "50%",
                width: "48px",
                height: "48px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#ff4444",
                cursor: "pointer",
                zIndex: 10,
                transition: "all 0.3s ease",
              }}
            >
              <X size={24} />
            </button>

            <div style={{ padding: "clamp(2.5rem, 5vw, 4rem)" }}>
              <div style={{ textAlign: "center", marginBottom: "3rem" }}>
                <div
                  style={{
                    width: "120px",
                    height: "120px",
                    margin: "0 auto 1.5rem",
                    border: `3px solid ${activeHobby.color}`,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: activeHobby.colorDim,
                    boxShadow: `0 0 40px ${activeHobby.color}40`,
                    animation: "floatAnimation 3s ease-in-out infinite",
                  }}
                >
                  <activeHobby.icon size={60} color={activeHobby.color} />
                </div>

                <div
                  style={{
                    fontSize: "0.9rem",
                    color: activeHobby.color,
                    fontWeight: 700,
                    marginBottom: "1rem",
                    fontFamily: "'DM Mono', monospace",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                  }}
                >
                  {activeHobby.rarity} • {activeHobby.category}
                </div>

                <h2
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "clamp(2rem, 5vw, 3.5rem)",
                    fontWeight: 700,
                    fontStyle: "italic",
                    color: C.text,
                    marginBottom: "1rem",
                  }}
                >
                  {activeHobby.title}
                </h2>

                <p
                  style={{
                    fontSize: "1.1rem",
                    color: C.muted2,
                    maxWidth: "750px",
                    margin: "0 auto",
                    lineHeight: 1.7,
                  }}
                >
                  {activeHobby.fullDesc}
                </p>
              </div>

              <div style={{ marginBottom: "3rem" }}>
                <h3
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "1.8rem",
                    fontWeight: 700,
                    fontStyle: "italic",
                    color: activeHobby.color,
                    marginBottom: "1.5rem",
                    textAlign: "center",
                  }}
                >
                  Why It Matters
                </h3>
                <p
                  style={{
                    fontSize: "1.05rem",
                    color: C.muted2,
                    lineHeight: 1.7,
                    textAlign: "center",
                    maxWidth: "850px",
                    margin: "0 auto",
                  }}
                >
                  {activeHobby.whyItMatters}
                </p>
              </div>

              <div style={{ marginBottom: "3rem" }}>
                <h3
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "1.8rem",
                    fontWeight: 700,
                    fontStyle: "italic",
                    color: activeHobby.color,
                    marginBottom: "1.5rem",
                    textAlign: "center",
                  }}
                >
                  Key Learnings
                </h3>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                    gap: "1rem",
                  }}
                >
                  {activeHobby.learnings.map((item, idx) => (
                    <div
                      key={idx}
                      style={{
                        padding: "1.2rem",
                        background: activeHobby.colorDim,
                        border: `2px solid ${activeHobby.color}30`,
                        borderRadius: "12px",
                        display: "flex",
                        alignItems: "center",
                        gap: "1rem",
                        transition: "all 0.3s ease",
                      }}
                    >
                      <CheckCircle2 size={20} color={activeHobby.color} style={{ flexShrink: 0 }} />
                      <span style={{ color: C.text, fontSize: "0.95rem" }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ marginBottom: "3rem" }}>
                <h3
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "1.8rem",
                    fontWeight: 700,
                    fontStyle: "italic",
                    color: activeHobby.color,
                    marginBottom: "1.5rem",
                    textAlign: "center",
                  }}
                >
                  Measurable Impact
                </h3>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                    gap: "1.5rem",
                  }}
                >
                  {activeHobby.impact.map((item, idx) => (
                    <div
                      key={idx}
                      style={{
                        padding: "1.8rem",
                        background: C.surface2,
                        border: `2px solid ${C.border}`,
                        borderRadius: "14px",
                        textAlign: "center",
                        transition: "all 0.3s ease",
                      }}
                    >
                      <Trophy size={32} color={activeHobby.color} style={{ marginBottom: "1rem" }} />
                      <div style={{ fontSize: "1.1rem", fontWeight: 600, color: C.text, lineHeight: 1.5 }}>
                        {item}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ marginBottom: "3rem" }}>
                <h3
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "1.8rem",
                    fontWeight: 700,
                    fontStyle: "italic",
                    color: activeHobby.color,
                    marginBottom: "1.5rem",
                    textAlign: "center",
                  }}
                >
                  Stats Overview
                </h3>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                    gap: "1.5rem",
                  }}
                >
                  {activeHobby.stats.map((stat, idx) => (
                    <div
                      key={idx}
                      style={{
                        padding: "1.8rem",
                        background: C.surface2,
                        border: `2px solid ${C.border}`,
                        borderRadius: "14px",
                        textAlign: "center",
                        transition: "all 0.3s ease",
                      }}
                    >
                      <stat.icon size={28} color={activeHobby.color} style={{ marginBottom: "0.8rem" }} />
                      <div
                        style={{
                          fontFamily: "'Playfair Display', serif",
                          fontSize: "2rem",
                          fontWeight: 700,
                          fontStyle: "italic",
                          color: activeHobby.color,
                        }}
                      >
                        {stat.value}
                      </div>
                      <div style={{ color: C.muted, fontSize: "0.9rem", marginTop: "0.5rem" }}>
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div
                style={{
                  padding: "2rem",
                  background: activeHobby.colorDim,
                  border: `2px solid ${activeHobby.color}40`,
                  borderRadius: "16px",
                  marginBottom: "2rem",
                }}
              >
                <h4
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    color: activeHobby.color,
                    fontSize: "1.4rem",
                    fontWeight: 700,
                    fontStyle: "italic",
                    marginBottom: "1rem",
                    textAlign: "center",
                  }}
                >
                  Daily Routine
                </h4>
                <p
                  style={{
                    color: C.text,
                    textAlign: "center",
                    lineHeight: 1.6,
                    fontSize: "1.05rem",
                  }}
                >
                  {activeHobby.dailyRoutine}
                </p>
              </div>

              <div style={{ textAlign: "center" }}>
                <button
                  onClick={() => setActiveHobby(null)}
                  style={{
                    padding: "1rem 3rem",
                    background: "rgba(255,100,100,0.1)",
                    border: "2px solid #ff6666",
                    borderRadius: "12px",
                    color: "#ff6666",
                    fontWeight: 700,
                    fontSize: "1rem",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    fontFamily: "'DM Mono', monospace",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
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