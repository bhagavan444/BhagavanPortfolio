import { useState, useEffect, useRef, useMemo } from 'react';
import { Award, ExternalLink, Code, Cloud, Database, Terminal, Brain, Rocket, Zap, Star, Sparkles, Trophy, Target, Cpu, Shield, Box, GitBranch, Layers, CheckCircle, TrendingUp, BarChart3, Activity, Calendar, Users, Briefcase, LineChart, ChevronRight, Filter, Search, SortDesc, Grid3x3, List, LayoutGrid, Clock, Flame, Crown, Hexagon } from 'lucide-react';

// Tech stack icon mappings to CDN URLs
const techIcons = {
  'React': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
  'Node.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
  'MongoDB': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
  'Express': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg',
  'Redux': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg',
  'Python': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
  'Java': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
  'Spring Boot': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg',
  'AWS': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg',
  'Azure': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg',
  'PostgreSQL': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
  'Docker': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
  'Kubernetes': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg',
  'PyTorch': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg',
  'TensorFlow': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg',
  'Scikit-learn': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/scikitlearn/scikitlearn-original.svg',
  'Pandas': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg',
  'NumPy': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg',
  'Django': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg',
  'JavaScript': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
  'HTML5': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
  'CSS3': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
  'Jenkins': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg',
  'Git': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
  'R': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/r/r-original.svg',
  'Sass': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg',
  'SQL': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
  'Keras': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/keras/keras-original.svg',
  'Maven': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/maven/maven-original.svg',
  'TypeScript': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
};

const certificationsData = [
  {
    title: "Full Stack Web Development",
    image: "https://lh3.googleusercontent.com/d/1AfvPfSaXHgVK9lPOsS3MUJimynH6xlog",
    link: "https://drive.google.com/file/d/1AfvPfSaXHgVK9lPOsS3MUJimynH6xlog/view",
    category: "Web",
    level: "Advanced",
    skills: ["React", "Node.js", "MongoDB", "Express", "Redux"],  
    power: 95,
    desc: "Comprehensive full-stack development certification covering modern web technologies, including front-end frameworks, server-side programming, database management, and deployment strategies.",
    year: "2024",
    issuer: "Tech Academy",
    duration: "6 months intensive program",
    projects: "15+ real-world applications",
    masteryLevel: "Expert"
  },
  {
    title: "Python Programming",
    image: "https://lh3.googleusercontent.com/d/1rZNRLvle0r_gUqzDjxR3_k6yApSyMxz6",
    link: "https://drive.google.com/file/d/1rZNRLvle0r_gUqzDjxR3_k6yApSyMxz6/view",
    category: "Programming",
    level: "Advanced",
    skills: ["Python"],
    power: 92,
    desc: "Advanced Python programming certification demonstrating expertise in object-oriented design, algorithm optimization, clean code practices, and software architecture.",
    year: "2024",
    issuer: "Python Institute",
    duration: "4 months",
    projects: "10+ algorithmic solutions",
    masteryLevel: "Expert"
  },
  {
    title: "Java Programming",
    image: "https://lh3.googleusercontent.com/d/1esxKzHNp_cuB7G87hs2MDeMpr2LKXucM",
    link: "https://drive.google.com/file/d/1esxKzHNp_cuB7G87hs2MDeMpr2LKXucM/view",
    category: "Programming",
    level: "Advanced",
    skills: ["Java", "Spring Boot", "Maven"],
    power: 90,
    desc: "Enterprise-level Java certification focusing on Spring ecosystem, concurrent programming, design patterns, and building robust microservices architectures.",
    year: "2024",
    issuer: "Oracle",
    duration: "5 months",
    projects: "8+ enterprise applications",
    masteryLevel: "Expert"
  },
  {
    title: "AWS Cloud",
    image: "https://lh3.googleusercontent.com/d/17vu2Vd5QnxAHe4iEYv21ADC-Pfs-90U9",
    link: "https://drive.google.com/file/d/17vu2Vd5QnxAHe4iEYv21ADC-Pfs-90U9/view",
    category: "Cloud",
    level: "Professional",
    skills: ["AWS"],
    power: 88,
    desc: "Professional AWS certification validating expertise in cloud architecture, infrastructure as code, serverless computing, and cost optimization.",
    year: "2024",
    issuer: "Amazon Web Services",
    duration: "3 months preparation",
    projects: "Cloud migration & optimization",
    masteryLevel: "Professional"
  },
  {
    title: "Azure Fundamentals",
    image: "https://lh3.googleusercontent.com/d/1ygiQILNjBAfcZse27n_px1_tgupajlWM",
    link: "https://drive.google.com/file/d/1ygiQILNjBAfcZse27n_px1_tgupajlWM/view",
    category: "Cloud",
    level: "Professional",
    skills: ["Azure"],
    power: 85,
    desc: "Microsoft Azure certification demonstrating foundational knowledge of cloud services, pricing models, and Azure-specific tools.",
    year: "2024",
    issuer: "Microsoft",
    duration: "2 months",
    projects: "Multi-cloud deployments",
    masteryLevel: "Professional"
  },
  {
    title: "Data Science",
    image: "https://lh3.googleusercontent.com/d/1JENKEIpZkc1Mvro1mmRVyQr5u8fdUXqv",
    link: "https://drive.google.com/file/d/1JENKEIpZkc1Mvro1mmRVyQr5u8fdUXqv/view",
    category: "Data",
    level: "Advanced",
    skills: ["Python", "Pandas", "NumPy", "SQL"],
    power: 93,
    desc: "Comprehensive data science certification covering the entire data analysis pipeline from data collection and cleaning to visualization and insights generation.",
    year: "2024",
    issuer: "Data Science Institute",
    duration: "6 months intensive",
    projects: "12+ data analysis projects",
    masteryLevel: "Expert"
  },
  {
    title: "Machine Learning",
    image: "https://lh3.googleusercontent.com/d/19vV6Nyq8A418eDvQ2ezrek4pqyUBb6X6",
    link: "https://drive.google.com/file/d/19vV6Nyq8A418eDvQ2ezrek4pqyUBb6X6/view",
    category: "AI/ML",
    level: "Expert",
    skills: ["PyTorch"],
    power: 98,
    desc: "Expert-level machine learning certification demonstrating mastery of supervised and unsupervised learning, deep neural networks, and advanced ML techniques.",
    year: "2024",
    issuer: "AI Research Lab",
    duration: "8 months advanced program",
    projects: "20+ ML models deployed",
    masteryLevel: "Master"
  },
  {
    title: "Cloud Computing",
    image: "https://lh3.googleusercontent.com/d/13gTq6yHm8jCOvqHKRjPpGw4hU4p7kovX",
    link: "https://drive.google.com/file/d/13gTq6yHm8jCOvqHKRjPpGw4hU4p7kovX/view",
    category: "Cloud",
    level: "Professional",
    skills: ["AWS", "Azure"],
    power: 87,
    desc: "Advanced cloud computing certification focusing on distributed systems architecture, fault tolerance, and building resilient cloud-native applications.",
    year: "2023",
    issuer: "Cloud Academy",
    duration: "4 months",
    projects: "Global infrastructure design",
    masteryLevel: "Professional"
  },
  {
    title: "R Programming",
    image: "https://lh3.googleusercontent.com/d/1vFclrkOAe3GaA8brE3c5Sjd0k5RMXwr-",
    link: "https://drive.google.com/file/d/1vFclrkOAe3GaA8brE3c5Sjd0k5RMXwr-/view",
    category: "Programming",
    level: "Advanced",
    skills: ["R"],
    power: 86,
    desc: "Advanced R programming certification specializing in statistical computing, data manipulation, and creating interactive data visualizations.",
    year: "2023",
    issuer: "R Consortium",
    duration: "3 months",
    projects: "Statistical modeling & dashboards",
    masteryLevel: "Expert"
  },
  {
    title: "Art of Programming",
    image: "https://lh3.googleusercontent.com/d/1SwQGo_zGZIGcTzzlMApXZU0Wt5ScyWXx",
    link: "https://drive.google.com/file/d/1SwQGo_zGZIGcTzzlMApXZU0Wt5ScyWXx/view",
    category: "Programming",
    level: "Advanced",
    skills: ["Python", "Java"],
    power: 91,
    desc: "Comprehensive algorithmic thinking certification emphasizing problem-solving strategies, computational efficiency, and elegant code design.",
    year: "2023",
    issuer: "Programming Institute",
    duration: "5 months intensive",
    projects: "500+ algorithmic challenges",
    masteryLevel: "Expert"
  },
  {
    title: "Machine Learning with Python",
    image: "https://lh3.googleusercontent.com/d/1uaTJTnijSpjCsD_ZPHKwen9i3RDYwShK",
    link: "https://drive.google.com/file/d/1uaTJTnijSpjCsD_ZPHKwen9i3RDYwShK/view",
    category: "AI/ML",
    level: "Expert",
    skills: ["Python", "Scikit-learn", "TensorFlow", "Keras"],
    power: 96,
    desc: "Expert Python-based machine learning certification covering end-to-end ML pipeline implementation from data preprocessing to model deployment.",
    year: "2024",
    issuer: "ML Academy",
    duration: "7 months",
    projects: "18+ production ML systems",
    masteryLevel: "Master"
  },
  {
    title: "Large Language Models",
    image: "https://lh3.googleusercontent.com/d/1CyN6_Bm3c68R0NkQWWTOgNAXTv27In_s",
    link: "https://drive.google.com/file/d/1CyN6_Bm3c68R0NkQWWTOgNAXTv27In_s/view",
    category: "AI/ML",
    level: "Expert",
    skills: ["Python", "PyTorch", "TensorFlow"],
    power: 99,
    desc: "Cutting-edge LLM certification demonstrating expertise in working with state-of-the-art language models, prompt engineering techniques, and building AI-powered applications.",
    year: "2024",
    issuer: "OpenAI Institute",
    duration: "6 months advanced research",
    projects: "AI chatbots & content systems",
    masteryLevel: "Master"
  },
  {
    title: "React",
    image: "https://lh3.googleusercontent.com/d/1yy4OpoVRAX2ZGVPUH9VmorLc2kiXalYf",
    link: "https://drive.google.com/file/d/1yy4OpoVRAX2ZGVPUH9VmorLc2kiXalYf/view",
    category: "Web",
    level: "Advanced",
    skills: ["React", "JavaScript"],
    power: 94,
    desc: "Advanced React certification demonstrating mastery of modern React development including functional components, custom hooks, performance optimization, and testing strategies.",
    year: "2024",
    issuer: "Meta",
    duration: "4 months",
    projects: "12+ React applications",
    masteryLevel: "Expert"
  },
  {
    title: "JavaScript",
    image: "https://lh3.googleusercontent.com/d/1zrscfW3cyWq59mMYsK399CRjgEjA-zbd",
    link: "https://drive.google.com/file/d/1zrscfW3cyWq59mMYsK399CRjgEjA-zbd/view",
    category: "Web",
    level: "Advanced",
    skills: ["JavaScript"],
    power: 93,
    desc: "Comprehensive modern JavaScript certification covering advanced language features, asynchronous programming patterns, and functional programming concepts.",
    year: "2024",
    issuer: "JS Academy",
    duration: "3 months",
    projects: "Complex web applications",
    masteryLevel: "Expert"
  },
  {
    title: "MLOps",
    image: "https://lh3.googleusercontent.com/d/1BmvjGknXs-K5wOfepFcl_CuU8DsFBApP",
    link: "https://drive.google.com/file/d/1BmvjGknXs-K5wOfepFcl_CuU8DsFBApP/view",
    category: "DevOps",
    level: "Professional",
    skills: ["Kubernetes", "Docker", "Python"],
    power: 89,
    desc: "Professional MLOps certification focusing on operationalizing machine learning models through automated pipelines, containerization, and continuous monitoring.",
    year: "2024",
    issuer: "MLOps Institute",
    duration: "4 months",
    projects: "ML pipeline automation",
    masteryLevel: "Professional"
  },
  {
    title: "CI/CD",
    image: "https://lh3.googleusercontent.com/d/1xccQv29hZCWCvr-JnM-nEfE8meESrWIr",
    link: "https://drive.google.com/file/d/1xccQv29hZCWCvr-JnM-nEfE8meESrWIr/view",
    category: "DevOps",
    level: "Professional",
    skills: ["Jenkins", "Docker", "Git"],
    power: 87,
    desc: "Professional CI/CD certification demonstrating expertise in building automated deployment pipelines, infrastructure as code, and implementing DevOps best practices.",
    year: "2024",
    issuer: "DevOps Academy",
    duration: "3 months",
    projects: "Enterprise CI/CD pipelines",
    masteryLevel: "Professional"
  },
  {
    title: "Django",
    image: "https://lh3.googleusercontent.com/d/1QdiX2u-ARCZCEdEmlu4l3ChnQT-SmhKc",
    link: "https://drive.google.com/file/d/1QdiX2u-ARCZCEdEmlu4l3ChnQT-SmhKc/view",
    category: "Web",
    level: "Advanced",
    skills: ["Django", "Python", "PostgreSQL"],
    power: 90,
    desc: "Advanced Django framework certification covering full-stack web development with Python. Expert in building secure, scalable web applications.",
    year: "2023",
    issuer: "Django Foundation",
    duration: "4 months",
    projects: "E-commerce & CMS platforms",
    masteryLevel: "Expert"
  },
  {
    title: "HTML",
    image: "https://lh3.googleusercontent.com/d/1NYtaxfhQUfxaL4n6Vv6gJSEQMySy1gqr",
    link: "https://drive.google.com/file/d/1NYtaxfhQUfxaL4n6Vv6gJSEQMySy1gqr/view",
    category: "Web",
    level: "Advanced",
    skills: ["HTML5"],
    power: 88,
    desc: "Advanced HTML certification emphasizing semantic markup, web accessibility standards (WCAG), and modern HTML5 features.",
    year: "2023",
    issuer: "W3C",
    duration: "2 months",
    projects: "Accessible web interfaces",
    masteryLevel: "Expert"
  },
  {
    title: "CSS",
    image: "https://lh3.googleusercontent.com/d/1iC65FGw0MSmjeKIivdnrZVm3GfXOKVvE",
    link: "https://drive.google.com/file/d/1iC65FGw0MSmjeKIivdnrZVm3GfXOKVvE/view",
    category: "Web",
    level: "Advanced",
    skills: ["CSS3", "Sass"],
    power: 89,
    desc: "Advanced CSS certification demonstrating mastery of modern layout techniques, responsive design principles, and creating smooth animations.",
    year: "2023",
    issuer: "CSS Academy",
    duration: "3 months",
    projects: "Responsive design systems",
    masteryLevel: "Expert"
  }
];

const categoryConfig = {
  Web: { icon: Code, color: '#61DAFB', gradient: 'linear-gradient(135deg, #61DAFB, #21A1F1)', bgGlow: 'rgba(97, 218, 251, 0.15)' },
  Programming: { icon: Terminal, color: '#F7DF1E', gradient: 'linear-gradient(135deg, #F7DF1E, #F0DB4F)', bgGlow: 'rgba(247, 223, 30, 0.15)' },
  Cloud: { icon: Cloud, color: '#FF9900', gradient: 'linear-gradient(135deg, #FF9900, #EC7211)', bgGlow: 'rgba(255, 153, 0, 0.15)' },
  Data: { icon: Database, color: '#00D9FF', gradient: 'linear-gradient(135deg, #00D9FF, #00A8CC)', bgGlow: 'rgba(0, 217, 255, 0.15)' },
  "AI/ML": { icon: Brain, color: '#FF6F00', gradient: 'linear-gradient(135deg, #FF6F00, #E65100)', bgGlow: 'rgba(255, 111, 0, 0.15)' },
  DevOps: { icon: Rocket, color: '#326CE5', gradient: 'linear-gradient(135deg, #326CE5, #2563EB)', bgGlow: 'rgba(50, 108, 229, 0.15)' }
};

const masteryColors = {
  'Master': { color: '#FFD700', glow: 'rgba(255, 215, 0, 0.4)', icon: Crown },
  'Expert': { color: '#FF6B35', glow: 'rgba(255, 107, 53, 0.4)', icon: Flame },
  'Professional': { color: '#00D4FF', glow: 'rgba(0, 212, 255, 0.4)', icon: Star }
};

function ParticleBackground() {
  const canvasRef = useRef(null);

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

    class Particle {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random() * 0.5 + 0.2;
        this.color = ['#61DAFB', '#FFD700', '#FF6B35', '#00D4FF'][Math.floor(Math.random() * 4)];
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
          this.reset();
        }
      }
      draw() {
        ctx.fillStyle = `${this.color}${Math.floor(this.opacity * 255).toString(16).padStart(2, '0')}`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 4);
        gradient.addColorStop(0, `${this.color}${Math.floor(this.opacity * 0.3 * 255).toString(16).padStart(2, '0')}`);
        gradient.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 4, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    class ConnectionLine {
      constructor(p1, p2, distance) {
        this.p1 = p1;
        this.p2 = p2;
        this.distance = distance;
      }
      draw() {
        const opacity = (1 - this.distance / 150) * 0.15;
        ctx.strokeStyle = `rgba(97, 218, 251, ${opacity})`;
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(this.p1.x, this.p1.y);
        ctx.lineTo(this.p2.x, this.p2.y);
        ctx.stroke();
      }
    }

    const particles = Array.from({ length: 100 }, () => new Particle());

    const animate = () => {
      ctx.fillStyle = 'rgba(5, 5, 15, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 150) {
            new ConnectionLine(particles[i], particles[j], distance).draw();
          }
        }
      }

      particles.forEach(particle => {
        particle.update();
        particle.draw();
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

  return <canvas ref={canvasRef} style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }} />;
}

function TechIconOrb({ skill, index, total, isHovered }) {
  const angle = (index / total) * Math.PI * 2;
  const radius = 45;
  const x = Math.cos(angle) * radius;
  const y = Math.sin(angle) * radius;
  
  const iconUrl = techIcons[skill] || techIcons[Object.keys(techIcons).find(key => skill.toLowerCase().includes(key.toLowerCase()))];

  return (
    <div
      style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: `translate(-50%, -50%) translate(${x}px, ${y}px) scale(${isHovered ? 1.2 : 1})`,
        width: '35px',
        height: '35px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, rgba(15, 15, 35, 0.9), rgba(30, 15, 45, 0.8))',
        border: '2px solid rgba(255, 255, 255, 0.2)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        animation: `float 3s ease-in-out ${index * 0.2}s infinite`,
        boxShadow: isHovered 
          ? '0 0 30px rgba(97, 218, 251, 0.6), inset 0 0 15px rgba(97, 218, 251, 0.2)' 
          : '0 4px 15px rgba(0, 0, 0, 0.3)',
        cursor: 'pointer',
        zIndex: isHovered ? 10 : 1
      }}
    >
      {iconUrl ? (
        <img 
          src={iconUrl} 
          alt={skill} 
          style={{ 
            width: '22px', 
            height: '22px', 
            filter: isHovered ? 'drop-shadow(0 0 8px rgba(97, 218, 251, 0.8))' : 'none',
            transition: 'filter 0.3s ease'
          }} 
        />
      ) : (
        <Hexagon size={18} style={{ color: '#61DAFB' }} />
      )}
      {isHovered && (
        <div style={{
          position: 'absolute',
          bottom: '-30px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'rgba(0, 0, 0, 0.9)',
          padding: '4px 10px',
          borderRadius: '6px',
          fontSize: '11px',
          fontWeight: 600,
          color: '#61DAFB',
          whiteSpace: 'nowrap',
          border: '1px solid rgba(97, 218, 251, 0.3)',
          animation: 'fadeUp 0.3s ease',
          zIndex: 100
        }}>
          {skill}
        </div>
      )}
    </div>
  );
}

export default function CertificationsShowcase() {
  const [filter, setFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [hoveredCard, setHoveredCard] = useState(null);
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [sortBy, setSortBy] = useState("power");
  const [viewMode, setViewMode] = useState("mastery");
  const [hoveredStat, setHoveredStat] = useState(null);

  const filteredCerts = useMemo(() => {
    return certificationsData
      .filter(cert => {
        const matchesFilter = filter === "All" || cert.category === filter;
        const matchesSearch = 
          cert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          cert.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
          cert.category.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesFilter && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === "power") return b.power - a.power;
        if (sortBy === "year") return b.year.localeCompare(a.year);
        if (sortBy === "name") return a.title.localeCompare(b.title);
        return 0;
      });
  }, [filter, searchQuery, sortBy]);

  const stats = useMemo(() => ({
    avgPower: Math.round(certificationsData.reduce((sum, c) => sum + c.power, 0) / certificationsData.length),
    totalCerts: certificationsData.length,
    expertCerts: certificationsData.filter(c => c.level === "Expert").length,
    categories: Object.keys(categoryConfig).length,
    masterCerts: certificationsData.filter(c => c.masteryLevel === "Master").length
  }), []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700&family=Orbitron:wght@400;500;600;700;800;900&family=Rajdhani:wght@300;400;500;600;700&display=swap');
        
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { overflow-x: hidden; }
        
        @keyframes fadeUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes scaleIn { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }
        @keyframes pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.05); } }
        @keyframes glow { 
          0%, 100% { filter: drop-shadow(0 0 10px currentColor); } 
          50% { filter: drop-shadow(0 0 25px currentColor); } 
        }
        @keyframes shimmer { 
          0% { background-position: -1000px 0; } 
          100% { background-position: 1000px 0; } 
        }
        @keyframes float { 
          0%, 100% { transform: translateY(0); } 
          50% { transform: translateY(-10px); } 
        }
        @keyframes rotate { 
          from { transform: rotate(0deg); } 
          to { transform: rotate(360deg); } 
        }
        @keyframes slideInLeft { 
          from { opacity: 0; transform: translateX(-50px); } 
          to { opacity: 1; transform: translateX(0); } 
        }
        @keyframes slideInRight { 
          from { opacity: 0; transform: translateX(50px); } 
          to { opacity: 1; transform: translateX(0); } 
        }
        @keyframes borderGlow { 
          0%, 100% { border-color: rgba(97, 218, 251, 0.3); box-shadow: 0 0 20px rgba(97, 218, 251, 0.2); } 
          50% { border-color: rgba(97, 218, 251, 0.8); box-shadow: 0 0 40px rgba(97, 218, 251, 0.5); } 
        }
        @keyframes ripple { 
          0% { transform: scale(1); opacity: 1; } 
          100% { transform: scale(1.5); opacity: 0; } 
        }
        @keyframes orbitRotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes techPulse {
          0%, 100% { box-shadow: 0 0 20px rgba(97, 218, 251, 0.3); }
          50% { box-shadow: 0 0 40px rgba(97, 218, 251, 0.6); }
        }
        
        .glass { 
          background: linear-gradient(135deg, rgba(15, 15, 35, 0.85), rgba(30, 15, 45, 0.7)); 
          backdrop-filter: blur(25px) saturate(180%); 
          border: 2px solid rgba(97, 218, 251, 0.2); 
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.7), inset 0 1px 0 rgba(97, 218, 251, 0.1); 
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          position: relative;
          overflow: hidden;
        }
        .glass::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(97, 218, 251, 0.1), transparent);
          transition: left 0.5s;
        }
        .glass:hover::before {
          left: 100%;
        }
        .glass:hover { 
          border-color: rgba(97, 218, 251, 0.5); 
          box-shadow: 0 20px 60px rgba(97, 218, 251, 0.3), 0 0 80px rgba(97, 218, 251, 0.2); 
          transform: translateY(-4px);
        }

        .mastery-card {
          background: linear-gradient(145deg, rgba(10, 10, 25, 0.95), rgba(20, 10, 35, 0.85));
          backdrop-filter: blur(30px);
          border: 2px solid;
          position: relative;
          overflow: hidden;
        }

        .tech-orbit {
          position: relative;
          width: 140px;
          height: 140px;
        }

        .mastery-badge {
          position: absolute;
          top: -10px;
          right: -10px;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 20;
          animation: pulse 3s ease-in-out infinite;
        }
      `}</style>

      <div style={{ 
        minHeight: '100vh', 
        background: 'linear-gradient(135deg, #05050F 0%, #0A0A1A 50%, #0F0A1F 100%)', 
        color: '#fff', 
        position: 'relative', 
        fontFamily: 'Inter, sans-serif' 
      }}>
        <ParticleBackground />

        <div style={{ 
          position: 'fixed', 
          top: 0, 
          left: 0, 
          right: 0, 
          height: '3px', 
          background: 'linear-gradient(90deg, #61DAFB, #FFD700, #FF6B35, #00D4FF, #61DAFB)', 
          backgroundSize: '200% 100%',
          animation: 'shimmer 3s linear infinite',
          zIndex: 1000,
          boxShadow: '0 0 20px rgba(97, 218, 251, 0.6)'
        }} />

        <div style={{ position: 'relative', zIndex: 10, maxWidth: '1600px', margin: '0 auto', padding: 'clamp(2rem, 5vw, 4rem) clamp(1rem, 3vw, 2rem)' }}>
          
          {/* Mastery Hero */}
          <div style={{ textAlign: 'center', marginBottom: 'clamp(3rem, 6vw, 5rem)', animation: 'fadeUp 1s ease' }}>
            
            <div style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '0.8rem', 
              padding: '0.7rem 2rem', 
              background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.15), rgba(255, 107, 53, 0.15))',
              border: '2px solid rgba(255, 215, 0, 0.5)', 
              borderRadius: '999px', 
              marginBottom: '2rem', 
              fontFamily: 'Orbitron', 
              fontSize: 'clamp(0.8rem, 1.8vw, 1rem)', 
              color: '#FFD700', 
              animation: 'pulse 3s infinite, borderGlow 3s infinite',
              boxShadow: '0 0 40px rgba(255, 215, 0, 0.3)',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, transparent, rgba(255, 215, 0, 0.2), transparent)', animation: 'shimmer 3s infinite' }} />
              <Crown size={22} style={{ animation: 'glow 2s infinite', zIndex: 1 }} />
              <span style={{ fontWeight: 700, letterSpacing: '3px', zIndex: 1 }}>MASTERY CREDENTIALS</span>
              <Crown size={22} style={{ animation: 'glow 2s infinite', zIndex: 1 }} />
            </div>

            <h1 style={{ 
              fontSize: 'clamp(3rem, 12vw, 7rem)', 
              fontWeight: 900, 
              letterSpacing: 'clamp(5px, 2vw, 15px)', 
              fontFamily: 'Orbitron', 
              lineHeight: 1.1, 
              textTransform: 'uppercase', 
              marginBottom: '1.5rem',
              background: 'linear-gradient(135deg, #61DAFB 0%, #FFD700 50%, #FF6B35 100%)',
              backgroundSize: '200% 200%',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              animation: 'shimmer 4s ease infinite',
              filter: 'drop-shadow(0 0 30px rgba(97, 218, 251, 0.5))',
              textShadow: '0 0 80px rgba(97, 218, 251, 0.4)'
            }}>
              TECH MASTERY
            </h1>

            <p style={{
              fontSize: 'clamp(1rem, 2.2vw, 1.3rem)',
              lineHeight: 1.8,
              color: 'rgba(255, 255, 255, 0.85)',
              maxWidth: '900px',
              margin: '0 auto 2rem',
              fontWeight: 400,
              fontFamily: 'Rajdhani'
            }}>
              Elite-level technical certifications demonstrating mastery across cutting-edge technologies, 
              frameworks, and platforms. Each credential validated through rigorous training and real-world application.
            </p>

            {/* Premium Stats */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', 
              gap: 'clamp(1rem, 2vw, 2rem)', 
              maxWidth: '1200px', 
              margin: '0 auto' 
            }}>
              {[
                { label: 'Master Level', value: stats.masterCerts, icon: Crown, color: '#FFD700' },
                { label: 'Total Skills', value: stats.totalCerts, icon: Target, color: '#61DAFB' },
                { label: 'Avg Power', value: stats.avgPower, icon: Zap, color: '#FF6B35' },
                { label: 'Categories', value: stats.categories, icon: Layers, color: '#00D4FF' },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="glass"
                  style={{ 
                    padding: 'clamp(1.5rem, 3vw, 2rem)', 
                    borderRadius: '18px', 
                    textAlign: 'center', 
                    animation: `scaleIn 0.6s ease ${i * 0.15}s both, float 6s ease-in-out ${i * 0.5}s infinite`,
                    cursor: 'pointer',
                    transform: hoveredStat === i ? 'scale(1.08) translateY(-8px)' : 'scale(1)',
                    borderColor: hoveredStat === i ? stat.color : 'rgba(97, 218, 251, 0.2)'
                  }}
                  onMouseEnter={() => setHoveredStat(i)}
                  onMouseLeave={() => setHoveredStat(null)}
                >
                  {hoveredStat === i && (
                    <div style={{ 
                      position: 'absolute', 
                      inset: 0, 
                      border: `2px solid ${stat.color}`, 
                      borderRadius: '18px', 
                      animation: 'ripple 1.5s ease-out infinite' 
                    }} />
                  )}
                  
                  <div style={{ 
                    width: 'clamp(60px, 10vw, 80px)', 
                    height: 'clamp(60px, 10vw, 80px)', 
                    margin: '0 auto 1rem', 
                    borderRadius: '50%', 
                    background: `linear-gradient(135deg, ${stat.color}, ${stat.color}60)`,
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    boxShadow: `0 0 40px ${stat.color}70`,
                    animation: 'pulse 3s ease-in-out infinite'
                  }}>
                    <stat.icon size={Math.min(40, window.innerWidth * 0.06)} style={{ color: '#000' }} />
                  </div>
                  
                  <div style={{ 
                    fontSize: 'clamp(2.5rem, 5vw, 3.2rem)', 
                    fontWeight: 900, 
                    color: stat.color, 
                    marginBottom: '0.5rem', 
                    fontFamily: 'Orbitron',
                    textShadow: `0 0 20px ${stat.color}80`
                  }}>
                    {stat.value}
                  </div>
                  
                  <div style={{ 
                    fontSize: 'clamp(0.9rem, 1.8vw, 1.1rem)', 
                    color: stat.color, 
                    fontWeight: 700, 
                    textTransform: 'uppercase', 
                    letterSpacing: '1.5px',
                    fontFamily: 'Rajdhani'
                  }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Controls */}
          <div style={{ marginBottom: '3rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
              <div className="glass" style={{ padding: '0.5rem', borderRadius: '16px', animation: 'slideInLeft 0.8s ease' }}>
                <div style={{ position: 'relative' }}>
                  <Search size={20} style={{ position: 'absolute', left: '1.2rem', top: '50%', transform: 'translateY(-50%)', color: '#61DAFB', animation: 'glow 3s infinite' }} />
                  <input 
                    type="text" 
                    placeholder="Search skills, technologies..." 
                    value={searchQuery} 
                    onChange={(e) => setSearchQuery(e.target.value)} 
                    style={{ 
                      width: '100%', 
                      background: 'rgba(0, 0, 0, 0.5)', 
                      border: '2px solid rgba(97, 218, 251, 0.3)', 
                      borderRadius: '12px', 
                      padding: '1.2rem 1.5rem 1.2rem 3.5rem', 
                      fontSize: '1.05rem', 
                      outline: 'none', 
                      color: '#fff', 
                      fontFamily: 'Rajdhani',
                      fontWeight: 500
                    }} 
                  />
                </div>
              </div>

              <div className="glass" style={{ padding: '0.5rem', borderRadius: '16px', animation: 'slideInRight 0.8s ease' }}>
                <div style={{ position: 'relative' }}>
                  <SortDesc size={20} style={{ position: 'absolute', left: '1.2rem', top: '50%', transform: 'translateY(-50%)', color: '#61DAFB' }} />
                  <select 
                    value={sortBy} 
                    onChange={(e) => setSortBy(e.target.value)} 
                    style={{ 
                      width: '100%', 
                      background: 'rgba(0, 0, 0, 0.5)', 
                      border: '2px solid rgba(97, 218, 251, 0.3)', 
                      borderRadius: '12px', 
                      padding: '1.2rem 1.5rem 1.2rem 3.5rem', 
                      fontSize: '1.05rem', 
                      outline: 'none', 
                      color: '#fff', 
                      cursor: 'pointer', 
                      fontFamily: 'Rajdhani', 
                      fontWeight: 600
                    }}
                  >
                    <option value="power">⚡ Power Score</option>
                    <option value="year">📅 Year</option>
                    <option value="name">🔤 Name</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Category Filters */}
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
              {['All', ...Object.keys(categoryConfig)].map((cat, idx) => {
                const config = categoryConfig[cat];
                const Icon = config?.icon || Award;
                const isActive = filter === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setFilter(cat)}
                    style={{
                      padding: '1rem 2rem',
                      borderRadius: '14px',
                      fontWeight: 700,
                      fontSize: '1.05rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.7rem',
                      transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                      border: isActive ? `3px solid ${config?.color || '#61DAFB'}` : '3px solid rgba(97, 218, 251, 0.1)',
                      background: isActive 
                        ? `linear-gradient(135deg, ${config?.color || '#61DAFB'}30, ${config?.color || '#61DAFB'}10)` 
                        : 'rgba(0, 0, 0, 0.4)',
                      color: isActive ? config?.color || '#61DAFB' : '#fff',
                      boxShadow: isActive 
                        ? `0 0 40px ${config?.color || '#61DAFB'}50` 
                        : 'none',
                      transform: isActive ? 'scale(1.08) translateY(-3px)' : 'scale(1)',
                      cursor: 'pointer',
                      backdropFilter: 'blur(20px)',
                      fontFamily: 'Orbitron',
                      animation: `fadeUp 0.6s ease ${idx * 0.1}s both`
                    }}
                  >
                    {cat !== 'All' && <Icon size={20} />}
                    <span>{cat}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Mastery Cards Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: '2.5rem' }}>
            {filteredCerts.map((cert, idx) => {
              const config = categoryConfig[cert.category];
              const mastery = masteryColors[cert.masteryLevel];
              const isHovered = hoveredCard === idx;
              const MasteryIcon = mastery.icon;
              
              return (
                <div 
                  key={idx} 
                  className="mastery-card"
                  style={{ 
                    borderRadius: '24px',
                    borderColor: isHovered ? config.color : 'rgba(97, 218, 251, 0.2)',
                    animation: `fadeUp 0.8s ease ${Math.min(idx * 0.05, 1)}s both`,
                    cursor: 'pointer',
                    transform: isHovered ? 'translateY(-12px) scale(1.03)' : 'none',
                    boxShadow: isHovered 
                      ? `0 30px 80px ${config.color}50, 0 0 60px ${mastery.color}40` 
                      : '0 8px 32px rgba(0, 0, 0, 0.6)'
                  }} 
                  onMouseEnter={() => setHoveredCard(idx)} 
                  onMouseLeave={() => setHoveredCard(null)} 
                  onClick={() => window.open(cert.link, '_blank')}
                >
                  {/* Animated gradient border */}
                  <div style={{
                    position: 'absolute',
                    inset: -2,
                    borderRadius: '24px',
                    background: `linear-gradient(135deg, ${config.color}, ${mastery.color}, ${config.color})`,
                    backgroundSize: '200% 200%',
                    animation: isHovered ? 'shimmer 3s ease infinite' : 'none',
                    zIndex: -1,
                    opacity: isHovered ? 1 : 0,
                    transition: 'opacity 0.4s ease'
                  }} />

                  {/* Power indicator */}
                  <div style={{ 
                    position: 'absolute', 
                    top: 0, 
                    left: 0, 
                    right: 0, 
                    height: '6px', 
                    background: 'rgba(0, 0, 0, 0.5)', 
                    borderRadius: '24px 24px 0 0',
                    overflow: 'hidden',
                    zIndex: 10
                  }}>
                    <div style={{ 
                      height: '100%', 
                      width: `${cert.power}%`, 
                      background: config.gradient,
                      boxShadow: `0 0 20px ${config.color}`,
                      transition: 'width 1.5s cubic-bezier(0.165, 0.84, 0.44, 1)',
                      animation: 'techPulse 2s ease-in-out infinite'
                    }} />
                  </div>

                  {/* Mastery Badge */}
                  <div className="mastery-badge" style={{
                    background: `linear-gradient(135deg, ${mastery.color}, ${mastery.color}80)`,
                    border: `3px solid ${mastery.color}`,
                    boxShadow: `0 0 30px ${mastery.glow}, inset 0 0 20px ${mastery.glow}`
                  }}>
                    <MasteryIcon size={28} style={{ color: '#000', animation: 'glow 2s infinite' }} />
                  </div>

                  <div style={{ padding: '2rem' }}>
                    {/* Tech Icon Orbit */}
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'center', 
                      marginBottom: '2rem',
                      position: 'relative'
                    }}>
                      <div className="tech-orbit">
                        {/* Center Category Icon */}
                        <div style={{
                          position: 'absolute',
                          left: '50%',
                          top: '50%',
                          transform: 'translate(-50%, -50%)',
                          width: '70px',
                          height: '70px',
                          borderRadius: '50%',
                          background: config.gradient,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: `0 0 40px ${config.color}60, inset 0 0 20px ${config.color}30`,
                          border: '3px solid rgba(255, 255, 255, 0.2)',
                          zIndex: 5,
                          animation: isHovered ? 'pulse 1.5s ease-in-out infinite' : 'none'
                        }}>
                          <config.icon size={36} style={{ color: '#000' }} />
                        </div>

                        {/* Orbiting Tech Icons */}
                        <div style={{
                          position: 'absolute',
                          inset: 0,
                          animation: isHovered ? 'orbitRotate 20s linear infinite' : 'none'
                        }}>
                          {cert.skills.map((skill, i) => (
                            <TechIconOrb 
                              key={i} 
                              skill={skill} 
                              index={i} 
                              total={cert.skills.length}
                              isHovered={hoveredSkill === `${idx}-${i}`}
                            />
                          ))}
                        </div>

                        {/* Orbit ring */}
                        <div style={{
                          position: 'absolute',
                          inset: '-20px',
                          borderRadius: '50%',
                          border: '2px dashed rgba(97, 218, 251, 0.2)',
                          animation: isHovered ? 'rotate 30s linear infinite reverse' : 'none'
                        }} />
                      </div>
                    </div>

                    {/* Content */}
                    <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                      <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.4rem 1rem',
                        background: `${config.color}20`,
                        border: `2px solid ${config.color}`,
                        borderRadius: '999px',
                        marginBottom: '1rem',
                        fontSize: '0.85rem',
                        fontWeight: 700,
                        color: config.color,
                        fontFamily: 'Orbitron'
                      }}>
                        <config.icon size={16} />
                        {cert.category}
                      </div>

                      <h3 style={{ 
                        fontSize: '1.5rem', 
                        fontWeight: 800, 
                        color: isHovered ? config.color : '#fff', 
                        marginBottom: '0.8rem', 
                        fontFamily: 'Orbitron',
                        transition: 'color 0.3s ease',
                        textShadow: isHovered ? `0 0 20px ${config.color}60` : 'none'
                      }}>
                        {cert.title}
                      </h3>

                      <p style={{ 
                        fontSize: '0.95rem', 
                        color: 'rgba(255, 255, 255, 0.7)', 
                        lineHeight: 1.6,
                        marginBottom: '1.2rem',
                        fontFamily: 'Rajdhani'
                      }}>
                        {cert.desc}
                      </p>

                      {/* Stats Grid */}
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, 1fr)',
                        gap: '1rem',
                        marginBottom: '1.5rem',
                        padding: '1.2rem',
                        background: 'rgba(0, 0, 0, 0.3)',
                        borderRadius: '12px',
                        border: '1px solid rgba(97, 218, 251, 0.1)'
                      }}>
                        <div style={{ textAlign: 'center' }}>
                          <Zap size={20} style={{ color: '#FFD700', marginBottom: '0.3rem' }} />
                          <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#FFD700', fontFamily: 'Orbitron' }}>{cert.power}</div>
                          <div style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.5)', fontFamily: 'Rajdhani' }}>Power</div>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                          <Calendar size={20} style={{ color: config.color, marginBottom: '0.3rem' }} />
                          <div style={{ fontSize: '1.4rem', fontWeight: 900, color: config.color, fontFamily: 'Orbitron' }}>{cert.year}</div>
                          <div style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.5)', fontFamily: 'Rajdhani' }}>Year</div>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                          <Target size={20} style={{ color: mastery.color, marginBottom: '0.3rem' }} />
                          <div style={{ fontSize: '0.9rem', fontWeight: 900, color: mastery.color, fontFamily: 'Orbitron' }}>{cert.level}</div>
                          <div style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.5)', fontFamily: 'Rajdhani' }}>Level</div>
                        </div>
                      </div>

                      {/* Issuer */}
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem',
                        padding: '0.8rem',
                        background: 'rgba(0, 0, 0, 0.3)',
                        borderRadius: '10px',
                        marginBottom: '1.2rem',
                        fontSize: '0.9rem',
                        color: 'rgba(255, 255, 255, 0.7)',
                        fontFamily: 'Rajdhani',
                        fontWeight: 600
                      }}>
                        <Award size={16} style={{ color: config.color }} />
                        {cert.issuer}
                      </div>

                      {/* View Certificate Button */}
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.6rem',
                        padding: '1rem 2rem',
                        background: isHovered ? config.gradient : 'rgba(0, 0, 0, 0.4)',
                        borderRadius: '12px',
                        border: `2px solid ${config.color}`,
                        color: isHovered ? '#000' : config.color,
                        fontWeight: 700,
                        fontSize: '1rem',
                        fontFamily: 'Orbitron',
                        transition: 'all 0.3s ease',
                        boxShadow: isHovered ? `0 0 30px ${config.color}50` : 'none'
                      }}>
                        <ExternalLink size={18} />
                        <span>VIEW CREDENTIAL</span>
                      </div>
                    </div>
                  </div>

                  {/* Glow effect */}
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: `radial-gradient(circle at 50% 50%, ${config.color}15, transparent 70%)`,
                    opacity: isHovered ? 1 : 0,
                    transition: 'opacity 0.6s ease',
                    pointerEvents: 'none',
                    borderRadius: '24px'
                  }} />
                </div>
              );
            })}
          </div>

          {/* No Results */}
          {filteredCerts.length === 0 && (
            <div className="glass" style={{ 
              textAlign: 'center', 
              padding: '5rem 2rem', 
              borderRadius: '24px', 
              marginTop: '3rem',
              animation: 'scaleIn 0.5s ease' 
            }}>
              <div style={{ fontSize: '5rem', marginBottom: '1.5rem' }}>🔍</div>
              <h3 style={{ 
                fontSize: '2rem', 
                fontWeight: 800, 
                color: '#61DAFB', 
                marginBottom: '1rem',
                fontFamily: 'Orbitron' 
              }}>
                No Certifications Found
              </h3>
              <p style={{ 
                fontSize: '1.1rem', 
                color: 'rgba(255, 255, 255, 0.6)',
                fontFamily: 'Rajdhani' 
              }}>
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}

          {/* Footer */}
          <div style={{ 
            marginTop: '5rem', 
            padding: '3rem', 
            textAlign: 'center', 
            background: 'linear-gradient(135deg, rgba(97, 218, 251, 0.05), rgba(255, 215, 0, 0.05))', 
            borderRadius: '24px',
            border: '1px solid rgba(97, 218, 251, 0.2)'
          }}>
            <div style={{ 
              fontSize: '2rem', 
              fontWeight: 700, 
              color: '#61DAFB', 
              marginBottom: '1rem',
              fontFamily: 'Orbitron' 
            }}>
              🚀 Ready for Elite Opportunities
            </div>
            <div style={{ 
              fontSize: '1.1rem', 
              color: 'rgba(255, 255, 255, 0.7)',
              fontFamily: 'Rajdhani' 
            }}>
              Industry-recognized mastery across multiple high-demand technology domains
            </div>
          </div>
        </div>
      </div>
    </>
  );
}