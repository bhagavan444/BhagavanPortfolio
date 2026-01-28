import { useState, useEffect, useRef, useMemo } from 'react';
import { Award, ExternalLink, Code, Cloud, Database, Terminal, Brain, Rocket, Zap, Star, Sparkles, Trophy, Target, Cpu, Shield, Box, GitBranch, Layers, CheckCircle, TrendingUp, BarChart3, Activity, Calendar, Users, Briefcase, LineChart, ChevronRight, Filter, Search, SortDesc, Grid3x3, List, LayoutGrid, Clock } from 'lucide-react';

const certificationsData = [
  {
    title: "Full Stack Web Development",
    image: "https://lh3.googleusercontent.com/d/1AfvPfSaXHgVK9lPOsS3MUJimynH6xlog",
    link: "https://drive.google.com/file/d/1AfvPfSaXHgVK9lPOsS3MUJimynH6xlog/view",
    category: "Web",
    level: "Advanced",
    skills: ["React", "Node.js", "MongoDB", "Express", "REST APIs", "Redux"],  
    power: 95,
    desc: "Comprehensive full-stack development certification covering modern web technologies, including front-end frameworks, server-side programming, database management, and deployment strategies. Mastered building scalable, production-ready applications from scratch.",
    year: "2024",
    issuer: "Tech Academy",
    duration: "6 months intensive program",
    projects: "15+ real-world applications"
  },
  {
    title: "Python Programming",
    image: "https://lh3.googleusercontent.com/d/1rZNRLvle0r_gUqzDjxR3_k6yApSyMxz6",
    link: "https://drive.google.com/file/d/1rZNRLvle0r_gUqzDjxR3_k6yApSyMxz6/view",
    category: "Programming",
    level: "Advanced",
    skills: ["Python", "OOP", "Algorithms", "Data Structures", "Testing", "Debugging"],
    power: 92,
    desc: "Advanced Python programming certification demonstrating expertise in object-oriented design, algorithm optimization, clean code practices, and software architecture. Includes comprehensive coverage of Python's ecosystem and best practices for enterprise applications.",
    year: "2024",
    issuer: "Python Institute",
    duration: "4 months",
    projects: "10+ algorithmic solutions"
  },
  {
    title: "Java Programming",
    image: "https://lh3.googleusercontent.com/d/1esxKzHNp_cuB7G87hs2MDeMpr2LKXucM",
    link: "https://drive.google.com/file/d/1esxKzHNp_cuB7G87hs2MDeMpr2LKXucM/view",
    category: "Programming",
    level: "Advanced",
    skills: ["Java", "Spring Boot", "Multithreading", "JPA", "Microservices", "Maven"],
    power: 90,
    desc: "Enterprise-level Java certification focusing on Spring ecosystem, concurrent programming, design patterns, and building robust microservices architectures. Specialized in developing high-performance, scalable backend systems for large-scale applications.",
    year: "2024",
    issuer: "Oracle",
    duration: "5 months",
    projects: "8+ enterprise applications"
  },
  {
    title: "AWS Cloud",
    image: "https://lh3.googleusercontent.com/d/17vu2Vd5QnxAHe4iEYv21ADC-Pfs-90U9",
    link: "https://drive.google.com/file/d/17vu2Vd5QnxAHe4iEYv21ADC-Pfs-90U9/view",
    category: "Cloud",
    level: "Professional",
    skills: ["AWS", "EC2", "S3", "Lambda", "CloudFormation", "RDS"],
    power: 88,
    desc: "Professional AWS certification validating expertise in cloud architecture, infrastructure as code, serverless computing, and cost optimization. Proven ability to design, deploy, and manage scalable cloud solutions following AWS best practices and security standards.",
    year: "2024",
    issuer: "Amazon Web Services",
    duration: "3 months preparation",
    projects: "Cloud migration & optimization"
  },
  {
    title: "Azure Fundamentals",
    image: "https://lh3.googleusercontent.com/d/1ygiQILNjBAfcZse27n_px1_tgupajlWM",
    link: "https://drive.google.com/file/d/1ygiQILNjBAfcZse27n_px1_tgupajlWM/view",
    category: "Cloud",
    level: "Professional",
    skills: ["Azure", "Cloud Services", "DevOps", "Azure CLI", "Virtual Machines", "Containers"],
    power: 85,
    desc: "Microsoft Azure certification demonstrating foundational knowledge of cloud services, pricing models, and Azure-specific tools. Expertise in deploying applications, configuring virtual networks, and implementing hybrid cloud solutions using Azure infrastructure.",
    year: "2024",
    issuer: "Microsoft",
    duration: "2 months",
    projects: "Multi-cloud deployments"
  },
  {
    title: "Data Science",
    image: "https://lh3.googleusercontent.com/d/1JENKEIpZkc1Mvro1mmRVyQr5u8fdUXqv",
    link: "https://drive.google.com/file/d/1JENKEIpZkc1Mvro1mmRVyQr5u8fdUXqv/view",
    category: "Data",
    level: "Advanced",
    skills: ["Python", "Pandas", "NumPy", "Visualization", "Statistical Analysis", "SQL"],
    power: 93,
    desc: "Comprehensive data science certification covering the entire data analysis pipeline from data collection and cleaning to visualization and insights generation. Expert in statistical modeling, exploratory data analysis, and communicating complex findings to stakeholders.",
    year: "2024",
    issuer: "Data Science Institute",
    duration: "6 months intensive",
    projects: "12+ data analysis projects"
  },
  {
    title: "Machine Learning",
    image: "https://lh3.googleusercontent.com/d/19vV6Nyq8A418eDvQ2ezrek4pqyUBb6X6",
    link: "https://drive.google.com/file/d/19vV6Nyq8A418eDvQ2ezrek4pqyUBb6X6/view",
    category: "AI/ML",
    level: "Expert",
    skills: ["ML Algorithms", "Deep Learning", "Neural Networks", "PyTorch", "Model Optimization", "Feature Engineering"],
    power: 98,
    desc: "Expert-level machine learning certification demonstrating mastery of supervised and unsupervised learning, deep neural networks, and advanced ML techniques. Specialized in building, training, and deploying production-grade ML models with proven accuracy and performance metrics.",
    year: "2024",
    issuer: "AI Research Lab",
    duration: "8 months advanced program",
    projects: "20+ ML models deployed"
  },
  {
    title: "Cloud Computing",
    image: "https://lh3.googleusercontent.com/d/13gTq6yHm8jCOvqHKRjPpGw4hU4p7kovX",
    link: "https://drive.google.com/file/d/13gTq6yHm8jCOvqHKRjPpGw4hU4p7kovX/view",
    category: "Cloud",
    level: "Professional",
    skills: ["Cloud Architecture", "Distributed Systems", "Load Balancing", "Auto-scaling", "High Availability"],
    power: 87,
    desc: "Advanced cloud computing certification focusing on distributed systems architecture, fault tolerance, and building resilient cloud-native applications. Deep understanding of cloud design patterns, multi-region deployments, and disaster recovery strategies.",
    year: "2023",
    issuer: "Cloud Academy",
    duration: "4 months",
    projects: "Global infrastructure design"
  },
  {
    title: "R Programming",
    image: "https://lh3.googleusercontent.com/d/1vFclrkOAe3GaA8brE3c5Sjd0k5RMXwr-",
    link: "https://drive.google.com/file/d/1vFclrkOAe3GaA8brE3c5Sjd0k5RMXwr-/view",
    category: "Programming",
    level: "Advanced",
    skills: ["R", "Statistics", "Data Analysis", "ggplot2", "dplyr", "Shiny"],
    power: 86,
    desc: "Advanced R programming certification specializing in statistical computing, data manipulation, and creating interactive data visualizations. Proficient in R's extensive package ecosystem for advanced analytics, reporting, and building data-driven web applications.",
    year: "2023",
    issuer: "R Consortium",
    duration: "3 months",
    projects: "Statistical modeling & dashboards"
  },
  {
    title: "Art of Programming",
    image: "https://lh3.googleusercontent.com/d/1SwQGo_zGZIGcTzzlMApXZU0Wt5ScyWXx",
    link: "https://drive.google.com/file/d/1SwQGo_zGZIGcTzzlMApXZU0Wt5ScyWXx/view",
    category: "Programming",
    level: "Advanced",
    skills: ["Algorithms", "Problem Solving", "Design Patterns", "Code Optimization", "Time Complexity"],
    power: 91,
    desc: "Comprehensive algorithmic thinking certification emphasizing problem-solving strategies, computational efficiency, and elegant code design. Mastered advanced data structures, algorithm design paradigms, and optimization techniques essential for technical interviews and complex system design.",
    year: "2023",
    issuer: "Programming Institute",
    duration: "5 months intensive",
    projects: "500+ algorithmic challenges"
  },
  {
    title: "Machine Learning with Python",
    image: "https://lh3.googleusercontent.com/d/1uaTJTnijSpjCsD_ZPHKwen9i3RDYwShK",
    link: "https://drive.google.com/file/d/1uaTJTnijSpjCsD_ZPHKwen9i3RDYwShK/view",
    category: "AI/ML",
    level: "Expert",
    skills: ["Python", "Scikit-learn", "TensorFlow", "Keras", "Model Deployment", "MLOps"],
    power: 96,
    desc: "Expert Python-based machine learning certification covering end-to-end ML pipeline implementation from data preprocessing to model deployment. Specialized in building production-ready ML systems with proper versioning, monitoring, and continuous improvement frameworks.",
    year: "2024",
    issuer: "ML Academy",
    duration: "7 months",
    projects: "18+ production ML systems"
  },
  {
    title: "Large Language Models",
    image: "https://lh3.googleusercontent.com/d/1CyN6_Bm3c68R0NkQWWTOgNAXTv27In_s",
    link: "https://drive.google.com/file/d/1CyN6_Bm3c68R0NkQWWTOgNAXTv27In_s/view",
    category: "AI/ML",
    level: "Expert",
    skills: ["LLM", "GPT", "Prompt Engineering", "Fine-tuning", "RAG", "Vector Databases"],
    power: 99,
    desc: "Cutting-edge LLM certification demonstrating expertise in working with state-of-the-art language models, prompt engineering techniques, and building AI-powered applications. Advanced knowledge of fine-tuning, retrieval-augmented generation, and optimizing LLM performance for specific use cases.",
    year: "2024",
    issuer: "OpenAI Institute",
    duration: "6 months advanced research",
    projects: "AI chatbots & content systems"
  },
  {
    title: "React",
    image: "https://lh3.googleusercontent.com/d/1yy4OpoVRAX2ZGVPUH9VmorLc2kiXalYf",
    link: "https://drive.google.com/file/d/1yy4OpoVRAX2ZGVPUH9VmorLc2kiXalYf/view",
    category: "Web",
    level: "Advanced",
    skills: ["React", "Hooks", "State Management", "Context API", "React Router", "Testing"],
    power: 94,
    desc: "Advanced React certification demonstrating mastery of modern React development including functional components, custom hooks, performance optimization, and testing strategies. Expert in building complex, maintainable single-page applications with optimal user experience and code quality.",
    year: "2024",
    issuer: "Meta",
    duration: "4 months",
    projects: "12+ React applications"
  },
  {
    title: "JavaScript",
    image: "https://lh3.googleusercontent.com/d/1zrscfW3cyWq59mMYsK399CRjgEjA-zbd",
    link: "https://drive.google.com/file/d/1zrscfW3cyWq59mMYsK399CRjgEjA-zbd/view",
    category: "Web",
    level: "Advanced",
    skills: ["JavaScript", "ES6+", "Async/Await", "Promises", "Closures", "Prototypes"],
    power: 93,
    desc: "Comprehensive modern JavaScript certification covering advanced language features, asynchronous programming patterns, and functional programming concepts. Deep understanding of JavaScript's execution model, event loop, and writing efficient, maintainable code for web applications.",
    year: "2024",
    issuer: "JS Academy",
    duration: "3 months",
    projects: "Complex web applications"
  },
  {
    title: "MLOps",
    image: "https://lh3.googleusercontent.com/d/1BmvjGknXs-K5wOfepFcl_CuU8DsFBApP",
    link: "https://drive.google.com/file/d/1BmvjGknXs-K5wOfepFcl_CuU8DsFBApP/view",
    category: "DevOps",
    level: "Professional",
    skills: ["MLOps", "CI/CD", "Kubernetes", "Docker", "Model Monitoring", "Experiment Tracking"],
    power: 89,
    desc: "Professional MLOps certification focusing on operationalizing machine learning models through automated pipelines, containerization, and continuous monitoring. Expertise in building robust ML infrastructure that enables rapid experimentation and reliable model deployment at scale.",
    year: "2024",
    issuer: "MLOps Institute",
    duration: "4 months",
    projects: "ML pipeline automation"
  },
  {
    title: "CI/CD",
    image: "https://lh3.googleusercontent.com/d/1xccQv29hZCWCvr-JnM-nEfE8meESrWIr",
    link: "https://drive.google.com/file/d/1xccQv29hZCWCvr-JnM-nEfE8meESrWIr/view",
    category: "DevOps",
    level: "Professional",
    skills: ["Jenkins", "GitHub Actions", "Docker", "Automated Testing", "Deployment Strategies", "GitOps"],
    power: 87,
    desc: "Professional CI/CD certification demonstrating expertise in building automated deployment pipelines, infrastructure as code, and implementing DevOps best practices. Skilled in creating reliable, fast, and secure software delivery processes that enable continuous integration and deployment.",
    year: "2024",
    issuer: "DevOps Academy",
    duration: "3 months",
    projects: "Enterprise CI/CD pipelines"
  },
  {
    title: "Django",
    image: "https://lh3.googleusercontent.com/d/1QdiX2u-ARCZCEdEmlu4l3ChnQT-SmhKc",
    link: "https://drive.google.com/file/d/1QdiX2u-ARCZCEdEmlu4l3ChnQT-SmhKc/view",
    category: "Web",
    level: "Advanced",
    skills: ["Django", "Python", "REST API", "PostgreSQL", "Authentication", "ORM"],
    power: 90,
    desc: "Advanced Django framework certification covering full-stack web development with Python. Expert in building secure, scalable web applications with Django's ORM, authentication systems, RESTful APIs, and integration with modern front-end frameworks for complete web solutions.",
    year: "2023",
    issuer: "Django Foundation",
    duration: "4 months",
    projects: "E-commerce & CMS platforms"
  },
  {
    title: "HTML",
    image: "https://lh3.googleusercontent.com/d/1NYtaxfhQUfxaL4n6Vv6gJSEQMySy1gqr",
    link: "https://drive.google.com/file/d/1NYtaxfhQUfxaL4n6Vv6gJSEQMySy1gqr/view",
    category: "Web",
    level: "Advanced",
    skills: ["HTML5", "Semantic Web", "Accessibility", "SEO", "Web Standards", "Forms"],
    power: 88,
    desc: "Advanced HTML certification emphasizing semantic markup, web accessibility standards (WCAG), and modern HTML5 features. Expertise in creating well-structured, SEO-friendly, and accessible web pages that provide excellent user experience across all devices and assistive technologies.",
    year: "2023",
    issuer: "W3C",
    duration: "2 months",
    projects: "Accessible web interfaces"
  },
  {
    title: "CSS",
    image: "https://lh3.googleusercontent.com/d/1iC65FGw0MSmjeKIivdnrZVm3GfXOKVvE",
    link: "https://drive.google.com/file/d/1iC65FGw0MSmjeKIivdnrZVm3GfXOKVvE/view",
    category: "Web",
    level: "Advanced",
    skills: ["CSS3", "Flexbox", "Grid", "Animations", "Responsive Design", "Sass"],
    power: 89,
    desc: "Advanced CSS certification demonstrating mastery of modern layout techniques, responsive design principles, and creating smooth animations. Expert in building pixel-perfect, mobile-first designs using CSS Grid, Flexbox, and CSS preprocessors for maintainable stylesheets.",
    year: "2023",
    issuer: "CSS Academy",
    duration: "3 months",
    projects: "Responsive design systems"
  }
];

const categoryConfig = {
  Web: { icon: Code, color: '#00ff9f', gradient: 'linear-gradient(135deg, #00ff9f, #00cc7a)' },
  Programming: { icon: Terminal, color: '#ff0080', gradient: 'linear-gradient(135deg, #ff0080, #cc0066)' },
  Cloud: { icon: Cloud, color: '#00d4ff', gradient: 'linear-gradient(135deg, #00d4ff, #0099cc)' },
  Data: { icon: Database, color: '#ffd700', gradient: 'linear-gradient(135deg, #ffd700, #ffb700)' },
  "AI/ML": { icon: Brain, color: '#a855f7', gradient: 'linear-gradient(135deg, #a855f7, #8b35d4)' },
  DevOps: { icon: Rocket, color: '#ff6b35', gradient: 'linear-gradient(135deg, #ff6b35, #e64a19)' }
};

function HollywoodBackground() {
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

    // Spotlight beams
    class Spotlight {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = -100;
        this.targetX = Math.random() * canvas.width;
        this.width = Math.random() * 150 + 100;
        this.speed = Math.random() * 0.3 + 0.2;
        this.angle = Math.random() * 0.3 - 0.15;
        this.opacity = Math.random() * 0.2 + 0.1;
        this.color = ['#ffd700', '#00d4ff', '#ff0080', '#00ff9f'][Math.floor(Math.random() * 4)];
      }
      update() {
        this.x += (this.targetX - this.x) * 0.01;
        if (Math.abs(this.targetX - this.x) < 10) {
          this.targetX = Math.random() * canvas.width;
        }
      }
      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        gradient.addColorStop(0, `${this.color}${Math.floor(this.opacity * 255).toString(16).padStart(2, '0')}`);
        gradient.addColorStop(0.5, `${this.color}${Math.floor(this.opacity * 0.5 * 255).toString(16).padStart(2, '0')}`);
        gradient.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient;
        ctx.fillRect(-this.width / 2, 0, this.width, canvas.height);
        ctx.restore();
      }
    }

    // Floating stars
    class Star {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random();
        this.twinkleSpeed = Math.random() * 0.02 + 0.01;
        this.color = ['#ffd700', '#ffffff', '#00d4ff'][Math.floor(Math.random() * 3)];
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.opacity += this.twinkleSpeed;
        if (this.opacity > 1 || this.opacity < 0) this.twinkleSpeed *= -1;
        if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
          this.reset();
        }
      }
      draw() {
        ctx.save();
        ctx.fillStyle = `${this.color}${Math.floor(Math.abs(this.opacity) * 255).toString(16).padStart(2, '0')}`;
        ctx.beginPath();
        
        // Draw 5-point star
        for (let i = 0; i < 5; i++) {
          const angle = (i * 4 * Math.PI) / 5 - Math.PI / 2;
          const x = this.x + Math.cos(angle) * this.size;
          const y = this.y + Math.sin(angle) * this.size;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.fill();
        
        // Glow effect
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 3);
        gradient.addColorStop(0, `${this.color}${Math.floor(this.opacity * 0.5 * 255).toString(16).padStart(2, '0')}`);
        gradient.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    // Film strip particles
    class FilmParticle {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height - canvas.height;
        this.width = 40;
        this.height = 30;
        this.speed = Math.random() * 0.5 + 0.3;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.02;
        this.opacity = Math.random() * 0.3 + 0.1;
      }
      update() {
        this.y += this.speed;
        this.rotation += this.rotationSpeed;
        if (this.y > canvas.height + 50) this.reset();
      }
      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.globalAlpha = this.opacity;
        
        // Film strip frame
        ctx.fillStyle = '#1a1a2e';
        ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);
        
        // Perforations
        ctx.fillStyle = '#ffd700';
        for (let i = 0; i < 3; i++) {
          const x = -this.width / 2 + (i * this.width / 2);
          ctx.fillRect(x, -this.height / 2 - 3, 4, 3);
          ctx.fillRect(x, this.height / 2, 4, 3);
        }
        
        // Frame border
        ctx.strokeStyle = '#ffd700';
        ctx.lineWidth = 1;
        ctx.strokeRect(-this.width / 2, -this.height / 2, this.width, this.height);
        
        ctx.restore();
      }
    }

    // Glowing orbs
    class GlowOrb {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.radius = Math.random() * 80 + 40;
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.speedY = (Math.random() - 0.5) * 0.3;
        this.hue = Math.random() * 360;
        this.pulseSpeed = Math.random() * 0.02 + 0.01;
        this.pulse = 0;
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.pulse += this.pulseSpeed;
        
        if (this.x < -100 || this.x > canvas.width + 100) this.speedX *= -1;
        if (this.y < -100 || this.y > canvas.height + 100) this.speedY *= -1;
      }
      draw() {
        const size = this.radius + Math.sin(this.pulse) * 15;
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, size);
        gradient.addColorStop(0, `hsla(${this.hue}, 100%, 60%, 0.15)`);
        gradient.addColorStop(0.5, `hsla(${this.hue}, 100%, 50%, 0.08)`);
        gradient.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Red carpet effect at bottom
    class CarpetShine {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.speed = Math.random() * 2 + 1;
        this.width = Math.random() * 100 + 50;
        this.opacity = Math.random() * 0.3 + 0.2;
      }
      update() {
        this.x += this.speed;
        if (this.x > canvas.width + 100) {
          this.x = -100;
        }
      }
      draw() {
        const y = canvas.height - 100;
        const gradient = ctx.createLinearGradient(this.x - this.width / 2, y, this.x + this.width / 2, y);
        gradient.addColorStop(0, 'transparent');
        gradient.addColorStop(0.5, `rgba(255, 215, 0, ${this.opacity})`);
        gradient.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient;
        ctx.fillRect(this.x - this.width / 2, y, this.width, 50);
      }
    }

    const spotlights = Array.from({ length: 4 }, () => new Spotlight());
    const stars = Array.from({ length: 80 }, () => new Star());
    const filmParticles = Array.from({ length: 12 }, () => new FilmParticle());
    const glowOrbs = Array.from({ length: 6 }, () => new GlowOrb());
    const carpetShines = Array.from({ length: 5 }, () => new CarpetShine());

    const animate = () => {
      // Dark background with gradient
      const bgGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      bgGradient.addColorStop(0, '#000000');
      bgGradient.addColorStop(0.5, '#0a0a1a');
      bgGradient.addColorStop(1, '#1a0a1a');
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw elements
      glowOrbs.forEach(orb => { orb.update(); orb.draw(); });
      spotlights.forEach(spot => { spot.update(); spot.draw(); });
      carpetShines.forEach(shine => { shine.update(); shine.draw(); });
      filmParticles.forEach(film => { film.update(); film.draw(); });
      stars.forEach(star => { star.update(); star.draw(); });

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

export default function CertificationsShowcase() {
  const [filter, setFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [hoveredCard, setHoveredCard] = useState(null);
  const [sortBy, setSortBy] = useState("power");
  const [viewMode, setViewMode] = useState("grid"); // grid, list, compact, timeline
  const [hoveredStat, setHoveredStat] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);

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
    categories: Object.keys(categoryConfig).length
  }), []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700&family=Space+Grotesk:wght@300;400;500;600;700;800;900&family=Playfair+Display:wght@400;500;600;700;800;900&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { overflow-x: hidden; }
        
        @keyframes fadeUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes scaleIn { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }
        @keyframes pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.05); } }
        @keyframes glow { 
          0%, 100% { filter: drop-shadow(0 0 10px currentColor); text-shadow: 0 0 20px currentColor; } 
          50% { filter: drop-shadow(0 0 30px currentColor); text-shadow: 0 0 40px currentColor; } 
        }
        @keyframes shimmer { 0% { background-position: -1000px 0; } 100% { background-position: 1000px 0; } }
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-15px); } }
        @keyframes spotlight { 0% { transform: translateX(-50px); opacity: 0.3; } 50% { transform: translateX(50px); opacity: 0.6; } 100% { transform: translateX(-50px); opacity: 0.3; } }
        @keyframes redCarpet { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
        @keyframes starTwinkle { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.5; transform: scale(0.8); } }
        @keyframes rotateGlow { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        @keyframes slideInLeft { from { opacity: 0; transform: translateX(-50px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes slideInRight { from { opacity: 0; transform: translateX(50px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes marquee { 0% { transform: translateX(100%); } 100% { transform: translateX(-100%); } }
        @keyframes borderGlow { 0%, 100% { border-color: rgba(255, 215, 0, 0.3); box-shadow: 0 0 20px rgba(255, 215, 0, 0.2); } 50% { border-color: rgba(255, 215, 0, 0.8); box-shadow: 0 0 40px rgba(255, 215, 0, 0.5); } }
        @keyframes ripple { 0% { transform: scale(1); opacity: 1; } 100% { transform: scale(1.5); opacity: 0; } }
        
        .glass { 
          background: linear-gradient(135deg, rgba(15, 15, 35, 0.8), rgba(30, 15, 45, 0.6)); 
          backdrop-filter: blur(30px) saturate(180%); 
          border: 2px solid rgba(255, 215, 0, 0.2); 
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.7), inset 0 1px 0 rgba(255, 215, 0, 0.1); 
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
          background: linear-gradient(90deg, transparent, rgba(255, 215, 0, 0.1), transparent);
          transition: left 0.5s;
        }
        .glass:hover::before {
          left: 100%;
        }
        .glass:hover { 
          border-color: rgba(255, 215, 0, 0.6); 
          box-shadow: 0 20px 60px rgba(255, 215, 0, 0.3), 0 0 80px rgba(255, 215, 0, 0.2); 
          transform: translateY(-4px) scale(1.02);
        }
        
        .premium-card {
          background: linear-gradient(145deg, rgba(20, 20, 40, 0.95), rgba(40, 20, 60, 0.8));
          backdrop-filter: blur(40px);
          border: 3px solid;
          border-image: linear-gradient(135deg, #ffd700, #ff0080, #00d4ff, #ffd700) 1;
          position: relative;
          overflow: hidden;
        }
        .premium-card::after {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(45deg, transparent, rgba(255, 215, 0, 0.1), transparent);
          animation: rotateGlow 8s linear infinite;
        }
        
        .neon-text {
          background: linear-gradient(135deg, #ffd700, #ffed4e);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 4s ease infinite;
          filter: drop-shadow(0 0 20px rgba(255, 215, 0, 0.6));
        }
        
        .hollywood-border {
          position: relative;
          padding: 3px;
          background: linear-gradient(45deg, #ffd700, #ff0080, #00d4ff, #00ff9f);
          background-size: 400% 400%;
          animation: shimmer 5s ease infinite;
          border-radius: inherit;
        }
        
        .cinema-glow {
          box-shadow: 
            0 0 40px rgba(255, 215, 0, 0.4),
            0 0 80px rgba(255, 215, 0, 0.2),
            0 0 120px rgba(255, 215, 0, 0.1),
            inset 0 0 40px rgba(255, 215, 0, 0.05);
        }
        
        @media (max-width: 768px) {
          .glass:hover { transform: translateY(-2px) scale(1.01); }
        }
      `}</style>

      <div style={{ 
        minHeight: '100vh', 
        background: 'linear-gradient(135deg, #000000 0%, #0a0a1a 50%, #1a0a1a 100%)', 
        color: '#fff', 
        position: 'relative', 
        fontFamily: 'Inter, sans-serif' 
      }}>
        <HollywoodBackground />

        {/* Animated top border marquee */}
        <div style={{ 
          position: 'fixed', 
          top: 0, 
          left: 0, 
          right: 0, 
          height: '4px', 
          background: 'linear-gradient(90deg, #ffd700, #ff0080, #00d4ff, #00ff9f, #ffd700)', 
          backgroundSize: '200% 100%',
          animation: 'shimmer 3s linear infinite',
          zIndex: 1000,
          boxShadow: '0 0 20px rgba(255, 215, 0, 0.5)'
        }} />

        <div style={{ position: 'relative', zIndex: 10, maxWidth: '1600px', margin: '0 auto', padding: 'clamp(2rem, 5vw, 4rem) clamp(1rem, 3vw, 2rem)' }}>
          
          {/* Premium Hero Section */}
          <div style={{ textAlign: 'center', marginBottom: 'clamp(3rem, 6vw, 5rem)', animation: 'fadeUp 1s ease', position: 'relative' }}>
            
            {/* Decorative elements */}
            <div style={{ position: 'absolute', top: '-20px', left: '50%', transform: 'translateX(-50%)', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(0, 212, 255, 0.25), transparent)', filter: 'blur(80px)', pointerEvents: 'none' }} />
            
            {/* Premium badge - Left aligned with title */}
            <div style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '0.8rem', 
              padding: '0.7rem 2rem', 
              background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.15), rgba(255, 0, 128, 0.15))',
              border: '2px solid rgba(255, 215, 0, 0.5)', 
              borderRadius: '999px', 
              marginBottom: '1.5rem', 
              fontFamily: 'JetBrains Mono', 
              fontSize: 'clamp(0.8rem, 1.8vw, 1rem)', 
              color: '#ffd700', 
              animation: 'pulse 3s infinite, borderGlow 3s infinite',
              boxShadow: '0 0 40px rgba(255, 215, 0, 0.3), inset 0 0 20px rgba(255, 215, 0, 0.1)',
              position: 'relative',
              overflow: 'hidden',
              marginLeft: 'auto',
              marginRight: 'auto'
            }}>
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)', animation: 'shimmer 3s infinite' }} />
              <Trophy size={22} style={{ animation: 'glow 2s infinite', zIndex: 1 }} />
              <span style={{ fontWeight: 700, letterSpacing: '2px', zIndex: 1, whiteSpace: 'nowrap' }}>{'> ELITE CREDENTIALS'}</span>
              <Sparkles size={22} style={{ animation: 'glow 2s infinite', zIndex: 1 }} />
            </div>

            {/* Main Title with cinematic effect */}
            <div style={{ position: 'relative', display: 'inline-block', marginBottom: '2rem' }}>
              <h1 style={{ 
                fontSize: 'clamp(3rem, 12vw, 8rem)', 
                fontWeight: 900, 
                letterSpacing: 'clamp(8px, 3vw, 20px)', 
                fontFamily: 'Space Grotesk, sans-serif', 
                lineHeight: 1, 
                textTransform: 'uppercase', 
                color: '#ffffff',
                textShadow: `
                  0 0 100px rgba(0, 212, 255, 0.7), 
                  0 0 50px rgba(0, 212, 255, 0.5), 
                  0 8px 20px rgba(0, 0, 0, 0.9),
                  0 15px 40px rgba(0, 240, 255, 0.4),
                  0 0 150px rgba(168, 85, 247, 0.3)
                `,
                animation: 'glow 4s ease-in-out infinite',
                position: 'relative',
                zIndex: 1,
                background: 'linear-gradient(135deg, #ffffff 0%, #e0f2fe 30%, #bae6fd 50%, #e0f2fe 70%, #ffffff 100%)',
                backgroundSize: '200% 200%',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                filter: 'drop-shadow(0 0 30px rgba(0, 212, 255, 0.5))'
              }}>
                CERTIFICATIONS
              </h1>
              {/* Decorative underline */}
              <div style={{ 
                position: 'absolute', 
                bottom: '-15px', 
                left: '50%', 
                transform: 'translateX(-50%)', 
                width: '70%', 
                height: '4px', 
                background: 'linear-gradient(90deg, transparent, #00d4ff, #a855f7, #00d4ff, transparent)',
                animation: 'shimmer 2s infinite',
                boxShadow: '0 0 30px rgba(0, 212, 255, 0.8), 0 0 60px rgba(168, 85, 247, 0.4)'
              }} />
            </div>

            {/* Descriptive Paragraph */}
            <p style={{
              fontSize: 'clamp(0.95rem, 2.2vw, 1.2rem)',
              lineHeight: 1.8,
              color: 'rgba(255, 255, 255, 0.9)',
              maxWidth: '1000px',
              margin: '0 auto 1.5rem',
              fontWeight: 400,
              padding: '0 1.5rem',
              textAlign: 'center',
              fontFamily: 'Inter, sans-serif',
              textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)'
            }}>
              A comprehensive collection of industry-recognized certifications showcasing expertise across multiple technology domains. 
              Each credential represents rigorous training, practical project experience, and validated proficiency in cutting-edge technologies 
              essential for modern software development and enterprise solutions.
            </p>

            {/* Subtitle with premium styling */}
            <div style={{ 
              fontSize: 'clamp(0.9rem, 2.2vw, 1.4rem)', 
              fontWeight: 700, 
              background: 'linear-gradient(135deg, #00d4ff, #a855f7, #00d4ff)',
              backgroundSize: '200% 200%',
              WebkitBackgroundClip: 'text', 
              WebkitTextFillColor: 'transparent', 
              marginBottom: '3rem',
              animation: 'shimmer 4s ease infinite',
              letterSpacing: '3px',
              fontFamily: 'Space Grotesk',
              textTransform: 'uppercase',
              filter: 'drop-shadow(0 0 20px rgba(0, 212, 255, 0.4))'
            }}>
              World-Class Technical Excellence
            </div>

            {/* Premium Stats Dashboard */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
              gap: 'clamp(1rem, 2vw, 2rem)', 
              maxWidth: '1200px', 
              margin: '0 auto' 
            }}>
              {[
                { label: 'Power Score', value: stats.avgPower, icon: Zap, color: '#ffd700', desc: 'Average' },
                { label: 'Certifications', value: stats.totalCerts, icon: Award, color: '#00ff9f', suffix: '+', desc: 'Acquired' },
                { label: 'Specializations', value: stats.categories, icon: Layers, color: '#ff0080', desc: 'Domains' },
                { label: 'Expert Level', value: stats.expertCerts, icon: Star, color: '#00d4ff', desc: 'Achieved' },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="glass cinema-glow"
                  style={{ 
                    padding: 'clamp(1.5rem, 3vw, 2.5rem) clamp(1rem, 2vw, 1.5rem)', 
                    borderRadius: '20px', 
                    textAlign: 'center', 
                    animation: `scaleIn 0.6s ease ${i * 0.15}s both, float 6s ease-in-out ${i * 0.5}s infinite`,
                    cursor: 'pointer',
                    position: 'relative',
                    transform: hoveredStat === i ? 'scale(1.1) translateY(-10px)' : 'scale(1)',
                    transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                  }}
                  onMouseEnter={() => setHoveredStat(i)}
                  onMouseLeave={() => setHoveredStat(null)}
                >
                  {/* Ripple effect on hover */}
                  {hoveredStat === i && (
                    <div style={{ 
                      position: 'absolute', 
                      inset: 0, 
                      border: `3px solid ${stat.color}`, 
                      borderRadius: '20px', 
                      animation: 'ripple 1.5s ease-out infinite' 
                    }} />
                  )}
                  
                  <div style={{ 
                    width: 'clamp(70px, 12vw, 90px)', 
                    height: 'clamp(70px, 12vw, 90px)', 
                    margin: '0 auto 1.2rem', 
                    borderRadius: '50%', 
                    background: `linear-gradient(135deg, ${stat.color}, ${stat.color}60)`,
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    boxShadow: `0 0 50px ${stat.color}70, inset 0 0 30px ${stat.color}40`,
                    animation: 'float 4s ease-in-out infinite, pulse 3s ease-in-out infinite',
                    position: 'relative',
                    overflow: 'hidden'
                  }}>
                    <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.3), transparent)` }} />
                    <stat.icon size={Math.min(44, window.innerWidth * 0.08)} style={{ color: '#000', position: 'relative', zIndex: 1 }} />
                  </div>
                  
                  <div style={{ 
                    fontSize: 'clamp(2.5rem, 6vw, 3.5rem)', 
                    fontWeight: 900, 
                    color: stat.color, 
                    marginBottom: '0.5rem', 
                    fontFamily: 'Playfair Display', 
                    textShadow: `0 0 30px ${stat.color}80, 0 5px 10px rgba(0,0,0,0.5)`,
                    animation: 'glow 3s ease-in-out infinite'
                  }}>
                    {stat.value}{stat.suffix || ''}
                  </div>
                  
                  <div style={{ 
                    fontSize: 'clamp(0.75rem, 2vw, 0.95rem)', 
                    color: 'rgba(255, 255, 255, 0.5)', 
                    fontWeight: 500,
                    marginBottom: '0.3rem',
                    textTransform: 'uppercase', 
                    letterSpacing: '2px' 
                  }}>
                    {stat.desc}
                  </div>
                  
                  <div style={{ 
                    fontSize: 'clamp(0.9rem, 2vw, 1.1rem)', 
                    color: stat.color, 
                    fontWeight: 700, 
                    textTransform: 'uppercase', 
                    letterSpacing: '1.5px',
                    fontFamily: 'Space Grotesk'
                  }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Premium Controls Section */}
          <div style={{ marginBottom: '3rem' }}>
            {/* Search and Sort */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
              <div className="glass cinema-glow" style={{ padding: '0.5rem', borderRadius: '18px', animation: 'slideInLeft 0.8s ease' }}>
                <div style={{ position: 'relative' }}>
                  <Search size={20} style={{ position: 'absolute', left: '1.2rem', top: '50%', transform: 'translateY(-50%)', color: '#ffd700', animation: 'glow 3s infinite' }} />
                  <input 
                    type="text" 
                    placeholder="Search certifications, skills..." 
                    value={searchQuery} 
                    onChange={(e) => setSearchQuery(e.target.value)} 
                    style={{ 
                      width: '100%', 
                      background: 'rgba(0, 0, 0, 0.5)', 
                      border: '2px solid rgba(255, 215, 0, 0.3)', 
                      borderRadius: '12px', 
                      padding: '1.2rem 1.5rem 1.2rem 3.5rem', 
                      fontSize: '1.05rem', 
                      outline: 'none', 
                      color: '#fff', 
                      transition: 'all 0.3s', 
                      fontFamily: 'Inter',
                      fontWeight: 500
                    }} 
                    onFocus={(e) => { 
                      e.target.style.borderColor = '#ffd700'; 
                      e.target.style.boxShadow = '0 0 40px rgba(255, 215, 0, 0.4), inset 0 0 20px rgba(255, 215, 0, 0.1)'; 
                      e.target.style.background = 'rgba(0, 0, 0, 0.7)';
                    }} 
                    onBlur={(e) => { 
                      e.target.style.borderColor = 'rgba(255, 215, 0, 0.3)'; 
                      e.target.style.boxShadow = 'none'; 
                      e.target.style.background = 'rgba(0, 0, 0, 0.5)';
                    }} 
                  />
                </div>
              </div>

              <div className="glass cinema-glow" style={{ padding: '0.5rem', borderRadius: '18px', animation: 'slideInRight 0.8s ease' }}>
                <div style={{ position: 'relative' }}>
                  <SortDesc size={20} style={{ position: 'absolute', left: '1.2rem', top: '50%', transform: 'translateY(-50%)', color: '#ffd700', animation: 'glow 3s infinite' }} />
                  <select 
                    value={sortBy} 
                    onChange={(e) => setSortBy(e.target.value)} 
                    style={{ 
                      width: '100%', 
                      background: 'rgba(0, 0, 0, 0.5)', 
                      border: '2px solid rgba(255, 215, 0, 0.3)', 
                      borderRadius: '12px', 
                      padding: '1.2rem 1.5rem 1.2rem 3.5rem', 
                      fontSize: '1.05rem', 
                      outline: 'none', 
                      color: '#fff', 
                      cursor: 'pointer', 
                      fontFamily: 'Inter', 
                      fontWeight: 600,
                      appearance: 'none',
                      backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'12\' height=\'8\' viewBox=\'0 0 12 8\' fill=\'none\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M1 1L6 6L11 1\' stroke=\'%23ffd700\' stroke-width=\'2\' stroke-linecap=\'round\'/%3E%3C/svg%3E")',
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 1.5rem center'
                    }}
                  >
                    <option value="power">⚡ Sort by Power Score</option>
                    <option value="year">📅 Sort by Year</option>
                    <option value="name">🔤 Sort by Name</option>
                  </select>
                </div>
              </div>
            </div>

            {/* View Mode Toggle - Premium Design */}
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
              <div className="glass cinema-glow" style={{ padding: '0.8rem', borderRadius: '20px', display: 'inline-flex', gap: '0.6rem', animation: 'scaleIn 0.8s ease 0.2s both' }}>
                {[
                  { mode: 'grid', icon: Grid3x3, label: 'Grid View' },
                  { mode: 'list', icon: List, label: 'List View' },
                  { mode: 'compact', icon: LayoutGrid, label: 'Compact' },
                  { mode: 'timeline', icon: Clock, label: 'Timeline' }
                ].map(({ mode, icon: Icon, label }) => (
                  <button
                    key={mode}
                    onClick={() => setViewMode(mode)}
                    style={{
                      padding: '1rem 1.8rem',
                      borderRadius: '14px',
                      fontWeight: 700,
                      fontSize: '1rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.6rem',
                      transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                      border: viewMode === mode ? '3px solid #ffd700' : '3px solid transparent',
                      background: viewMode === mode 
                        ? 'linear-gradient(135deg, rgba(255, 215, 0, 0.3), rgba(255, 0, 128, 0.2))' 
                        : 'transparent',
                      color: viewMode === mode ? '#ffd700' : 'rgba(255, 255, 255, 0.6)',
                      cursor: 'pointer',
                      transform: viewMode === mode ? 'scale(1.1)' : 'scale(1)',
                      boxShadow: viewMode === mode ? '0 0 30px rgba(255, 215, 0, 0.4), inset 0 0 20px rgba(255, 215, 0, 0.1)' : 'none',
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                    onMouseEnter={(e) => {
                      if (viewMode !== mode) {
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                        e.currentTarget.style.color = '#fff';
                        e.currentTarget.style.transform = 'scale(1.05)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (viewMode !== mode) {
                        e.currentTarget.style.background = 'transparent';
                        e.currentTarget.style.color = 'rgba(255, 255, 255, 0.6)';
                        e.currentTarget.style.transform = 'scale(1)';
                      }
                    }}
                  >
                    {viewMode === mode && (
                      <div style={{ 
                        position: 'absolute', 
                        inset: 0, 
                        background: 'linear-gradient(90deg, transparent, rgba(255, 215, 0, 0.2), transparent)',
                        animation: 'shimmer 2s infinite'
                      }} />
                    )}
                    <Icon size={20} style={{ position: 'relative', zIndex: 1, animation: viewMode === mode ? 'glow 2s infinite' : 'none' }} />
                    <span style={{ position: 'relative', zIndex: 1, display: window.innerWidth >= 640 ? 'inline' : 'none' }}>{label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Category Filters - Cinema Style */}
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
              {['All', ...Object.keys(categoryConfig)].map((cat, idx) => {
                const config = categoryConfig[cat];
                const Icon = config?.icon || Award;
                const isActive = filter === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setFilter(cat)}
                    onMouseEnter={() => setActiveCategory(cat)}
                    onMouseLeave={() => setActiveCategory(null)}
                    style={{
                      padding: '1rem 2rem',
                      borderRadius: '16px',
                      fontWeight: 800,
                      fontSize: '1.05rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.7rem',
                      transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                      border: isActive ? `3px solid ${config?.color || '#ffd700'}` : '3px solid rgba(255, 255, 255, 0.1)',
                      background: isActive 
                        ? `linear-gradient(135deg, ${config?.color || '#ffd700'}30, ${config?.color || '#ffd700'}10)` 
                        : 'rgba(0, 0, 0, 0.4)',
                      color: isActive ? config?.color || '#ffd700' : '#fff',
                      boxShadow: isActive 
                        ? `0 0 50px ${config?.color || '#ffd700'}50, inset 0 0 30px ${config?.color || '#ffd700'}20` 
                        : '0 4px 15px rgba(0, 0, 0, 0.3)',
                      transform: isActive ? 'scale(1.1) translateY(-5px)' : 'scale(1)',
                      cursor: 'pointer',
                      backdropFilter: 'blur(20px)',
                      position: 'relative',
                      overflow: 'hidden',
                      animation: `fadeUp 0.6s ease ${idx * 0.1}s both`
                    }}
                  >
                    {isActive && (
                      <>
                        <div style={{ 
                          position: 'absolute', 
                          inset: 0, 
                          background: `linear-gradient(135deg, ${config?.color}20, transparent)`,
                          animation: 'shimmer 3s infinite'
                        }} />
                        <div style={{ 
                          position: 'absolute', 
                          inset: 0, 
                          border: `2px solid ${config?.color}`, 
                          borderRadius: '16px', 
                          animation: 'pulse 2s infinite' 
                        }} />
                      </>
                    )}
                    {cat !== 'All' && <Icon size={22} style={{ position: 'relative', zIndex: 1, animation: isActive ? 'glow 2s infinite' : 'none' }} />}
                    <span style={{ position: 'relative', zIndex: 1, letterSpacing: '1px' }}>{cat}</span>
                    {(isActive || activeCategory === cat) && (
                      <div style={{ 
                        position: 'absolute', 
                        inset: -3, 
                        border: `2px solid ${config?.color || '#ffd700'}`, 
                        borderRadius: '16px', 
                        animation: 'ripple 2s ease-out infinite',
                        pointerEvents: 'none'
                      }} />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Premium Results Counter */}
          <div style={{ textAlign: 'center', marginBottom: '2.5rem', animation: 'fadeUp 0.8s ease 0.4s both' }}>
            <div className="glass cinema-glow" style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '1rem', 
              padding: '1.2rem 2.5rem', 
              borderRadius: '20px',
              fontSize: '1.15rem', 
              fontWeight: 700, 
              background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.2), rgba(255, 0, 128, 0.15))',
              border: '3px solid rgba(255, 215, 0, 0.5)',
              boxShadow: '0 0 50px rgba(255, 215, 0, 0.3), inset 0 0 30px rgba(255, 215, 0, 0.1)',
              animation: 'fadeUp 0.8s ease 0.4s both, pulse 4s ease-in-out infinite',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, transparent, rgba(255, 215, 0, 0.2), transparent)', animation: 'shimmer 3s infinite' }} />
              <CheckCircle size={24} style={{ color: '#ffd700', animation: 'glow 2s infinite', position: 'relative', zIndex: 1 }} />
              <span style={{ color: '#ffd700', letterSpacing: '1px', position: 'relative', zIndex: 1, fontFamily: 'Space Grotesk' }}>
                Displaying <span style={{ fontSize: '1.4rem', fontWeight: 900, margin: '0 0.3rem' }}>{filteredCerts.length}</span> of <span style={{ fontSize: '1.4rem', fontWeight: 900, margin: '0 0.3rem' }}>{stats.totalCerts}</span> Premium Certifications
              </span>
              <Trophy size={24} style={{ color: '#ffd700', animation: 'glow 2s infinite', position: 'relative', zIndex: 1 }} />
            </div>
          </div>

          {/* Cards - Dynamic View Modes */}
          {viewMode === 'grid' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
              {filteredCerts.map((cert, idx) => {
                const config = categoryConfig[cert.category];
                const isHovered = hoveredCard === idx;
                return (
                  <div 
                    key={idx} 
                    style={{ 
                      position: 'relative', 
                      perspective: '1500px', 
                      cursor: 'pointer', 
                      animation: `fadeUp 0.8s ease ${Math.min(idx * 0.05, 1)}s both, float 6s ease-in-out ${idx * 0.3}s infinite` 
                    }} 
                    onMouseEnter={() => setHoveredCard(idx)} 
                    onMouseLeave={() => setHoveredCard(null)} 
                    onClick={() => window.open(cert.link, '_blank')}
                  >
                    <div 
                      className="glass" 
                      style={{ 
                        borderRadius: '20px', 
                        overflow: 'hidden', 
                        transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)', 
                        transform: isHovered ? 'rotateY(5deg) rotateX(3deg) scale(1.05) translateY(-12px)' : 'none', 
                        height: '100%', 
                        display: 'flex', 
                        flexDirection: 'column',
                        boxShadow: isHovered ? `0 30px 80px ${config.color}60, 0 0 60px ${config.color}40` : '0 8px 32px rgba(0, 0, 0, 0.6)',
                        border: isHovered ? `2px solid ${config.color}` : '1px solid rgba(255, 255, 255, 0.1)'
                      }}
                    >
                      {/* Animated power bar */}
                      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: 'rgba(0, 0, 0, 0.5)', zIndex: 20, overflow: 'hidden' }}>
                        <div style={{ 
                          height: '100%', 
                          width: `${cert.power}%`, 
                          background: config.gradient, 
                          boxShadow: `0 0 15px ${config.color}`, 
                          transition: 'width 1.5s cubic-bezier(0.165, 0.84, 0.44, 1)',
                          animation: 'shimmer 3s linear infinite',
                          backgroundSize: '200% 100%'
                        }} />
                      </div>

                      {/* Shimmer overlay effect */}
                      <div style={{
                        position: 'absolute',
                        top: 0,
                        left: '-100%',
                        width: '100%',
                        height: '100%',
                        background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
                        animation: isHovered ? 'shimmer 1.5s ease-in-out' : 'none',
                        pointerEvents: 'none',
                        zIndex: 30
                      }} />

                      <div style={{ position: 'relative', height: '240px', overflow: 'hidden', flexShrink: 0 }}>
                        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)', zIndex: 10 }} />
                        <img 
                          src={cert.image} 
                          alt={cert.title} 
                          style={{ 
                            width: '100%', 
                            height: '100%', 
                            objectFit: 'cover', 
                            transition: 'transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1)', 
                            transform: isHovered ? 'scale(1.15) rotate(1deg)' : 'scale(1)',
                            filter: isHovered ? 'brightness(1.1) contrast(1.1)' : 'brightness(1)'
                          }} 
                        />
                        
                        {/* Animated category badge */}
                        <div style={{ 
                          position: 'absolute', 
                          top: '1rem', 
                          right: '1rem', 
                          padding: '0.6rem 1rem', 
                          borderRadius: '999px', 
                          backdropFilter: 'blur(15px)', 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: '0.5rem', 
                          zIndex: 20, 
                          background: `${config.color}25`, 
                          border: `2px solid ${config.color}`, 
                          boxShadow: `0 0 30px ${config.color}50`,
                          animation: 'pulse 3s ease-in-out infinite',
                          transition: 'all 0.3s ease'
                        }}>
                          <config.icon size={16} style={{ color: config.color, animation: 'glow 2s ease-in-out infinite' }} />
                          <span style={{ fontSize: '0.85rem', fontWeight: 700, color: config.color, fontFamily: 'JetBrains Mono' }}>{cert.category}</span>
                        </div>

                        {/* Animated year badge */}
                        <div style={{ 
                          position: 'absolute', 
                          top: '1rem', 
                          left: '1rem', 
                          padding: '0.5rem 0.9rem', 
                          borderRadius: '999px', 
                          background: 'rgba(0, 0, 0, 0.7)', 
                          backdropFilter: 'blur(10px)', 
                          border: '2px solid rgba(255, 255, 255, 0.2)', 
                          fontSize: '0.8rem', 
                          fontWeight: 700, 
                          color: '#fff', 
                          zIndex: 20, 
                          fontFamily: 'JetBrains Mono',
                          transition: 'all 0.3s ease',
                          transform: isHovered ? 'scale(1.1)' : 'scale(1)'
                        }}>
                          {cert.year}
                        </div>

                        {/* Sparkle effect on hover */}
                        {isHovered && (
                          <>
                            <div style={{ position: 'absolute', top: '20%', left: '20%', width: '4px', height: '4px', background: '#ffd700', borderRadius: '50%', animation: 'starTwinkle 1s ease-in-out infinite', zIndex: 15, boxShadow: '0 0 10px #ffd700' }} />
                            <div style={{ position: 'absolute', top: '60%', right: '25%', width: '3px', height: '3px', background: '#00d4ff', borderRadius: '50%', animation: 'starTwinkle 1.2s ease-in-out infinite', zIndex: 15, boxShadow: '0 0 10px #00d4ff' }} />
                            <div style={{ position: 'absolute', top: '40%', right: '15%', width: '3px', height: '3px', background: '#ff0080', borderRadius: '50%', animation: 'starTwinkle 0.8s ease-in-out infinite', zIndex: 15, boxShadow: '0 0 10px #ff0080' }} />
                          </>
                        )}
                      </div>

                      <div style={{ padding: '1.8rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                        <h3 style={{ 
                          fontSize: '1.4rem', 
                          fontWeight: 800, 
                          marginBottom: '0.8rem', 
                          color: isHovered ? config.color : '#fff', 
                          transition: 'all 0.3s ease', 
                          fontFamily: 'Space Grotesk', 
                          lineHeight: 1.3,
                          textShadow: isHovered ? `0 0 20px ${config.color}80` : 'none',
                          transform: isHovered ? 'translateX(5px)' : 'translateX(0)'
                        }}>
                          {cert.title}
                        </h3>

                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                          <span style={{ 
                            fontSize: '0.95rem', 
                            fontWeight: 600, 
                            color: config.color, 
                            padding: '0.4rem 0.8rem', 
                            background: `${config.color}15`, 
                            borderRadius: '8px', 
                            border: `1px solid ${config.color}40`,
                            transition: 'all 0.3s ease',
                            transform: isHovered ? 'scale(1.05)' : 'scale(1)'
                          }}>
                            {cert.level}
                          </span>
                          <div style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: '0.4rem', 
                            padding: '0.4rem 0.8rem', 
                            background: 'rgba(255, 215, 0, 0.15)', 
                            borderRadius: '8px', 
                            border: '1px solid rgba(255, 215, 0, 0.4)',
                            animation: 'pulse 2s ease-in-out infinite'
                          }}>
                            <Zap size={16} style={{ color: '#ffd700', animation: 'glow 2s ease-in-out infinite' }} />
                            <span style={{ fontSize: '0.95rem', fontWeight: 800, color: '#ffd700', fontFamily: 'Space Grotesk' }}>
                              {cert.power}
                            </span>
                          </div>
                        </div>

                        <p style={{ 
                          fontSize: '0.95rem', 
                          color: 'rgba(255, 255, 255, 0.7)', 
                          marginBottom: '1.2rem', 
                          lineHeight: 1.6, 
                          flex: 1,
                          transition: 'color 0.3s ease'
                        }}>
                          {cert.desc}
                        </p>

                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.2rem' }}>
                          {cert.skills.map((skill, i) => (
                            <span 
                              key={i} 
                              style={{ 
                                fontSize: '0.8rem', 
                                padding: '0.4rem 0.8rem', 
                                borderRadius: '8px', 
                                background: 'rgba(0, 0, 0, 0.5)', 
                                color: 'rgba(255, 255, 255, 0.8)', 
                                border: '1px solid rgba(255, 255, 255, 0.15)', 
                                fontFamily: 'JetBrains Mono', 
                                fontWeight: 500,
                                transition: 'all 0.3s ease',
                                transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
                                transitionDelay: `${i * 0.05}s`
                              }}
                            >
                              {skill}
                            </span>
                          ))}
                        </div>

                        <div style={{ fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.5)', marginBottom: '1rem', fontWeight: 500 }}>
                          Issued by: {cert.issuer}
                        </div>

                        {/* Additional Info */}
                        <div style={{ 
                          display: 'flex', 
                          gap: '1rem', 
                          marginBottom: '1rem', 
                          flexWrap: 'wrap',
                          paddingTop: '0.8rem',
                          borderTop: '1px solid rgba(255, 255, 255, 0.1)'
                        }}>
                          <div style={{ 
                            fontSize: '0.8rem', 
                            color: 'rgba(255, 255, 255, 0.7)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.4rem'
                          }}>
                            <Calendar size={14} style={{ color: config.color }} />
                            <span>{cert.duration}</span>
                          </div>
                          <div style={{ 
                            fontSize: '0.8rem', 
                            color: 'rgba(255, 255, 255, 0.7)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.4rem'
                          }}>
                            <Briefcase size={14} style={{ color: config.color }} />
                            <span>{cert.projects}</span>
                          </div>
                        </div>

                        <div style={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'flex-end', 
                          gap: isHovered ? '0.8rem' : '0.5rem', 
                          color: config.color, 
                          fontSize: '0.95rem', 
                          fontWeight: 700, 
                          transition: 'gap 0.3s ease', 
                          marginTop: 'auto' 
                        }}>
                          <span>View Certificate</span>
                          <ExternalLink 
                            size={16} 
                            style={{ 
                              transition: 'transform 0.3s ease', 
                              transform: isHovered ? 'translateX(5px) rotate(-15deg)' : 'translateX(0)',
                              animation: isHovered ? 'glow 1s ease-in-out infinite' : 'none'
                            }} 
                          />
                        </div>
                      </div>

                      {/* Animated holographic glow */}
                      <div style={{ 
                        position: 'absolute', 
                        inset: 0, 
                        background: `radial-gradient(circle at ${isHovered ? '50%' : '100%'} ${isHovered ? '50%' : '100%'}, ${config.color}20, transparent 70%)`, 
                        opacity: isHovered ? 1 : 0, 
                        transition: 'all 0.6s ease', 
                        pointerEvents: 'none', 
                        borderRadius: '20px',
                        animation: isHovered ? 'pulse 2s ease-in-out infinite' : 'none'
                      }} />

                      {/* Corner shine effect */}
                      {isHovered && (
                        <div style={{
                          position: 'absolute',
                          top: 0,
                          right: 0,
                          width: '100px',
                          height: '100px',
                          background: `radial-gradient(circle at top right, ${config.color}40, transparent)`,
                          borderRadius: '0 20px 0 0',
                          animation: 'pulse 1.5s ease-in-out infinite'
                        }} />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {viewMode === 'list' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {filteredCerts.map((cert, idx) => {
                const config = categoryConfig[cert.category];
                const isHovered = hoveredCard === idx;
                return (
                  <div key={idx} className="glass" style={{ borderRadius: '16px', overflow: 'hidden', cursor: 'pointer', animation: `fadeUp 0.6s ease ${Math.min(idx * 0.03, 0.5)}s both`, transition: 'all 0.3s', transform: isHovered ? 'translateX(8px)' : 'none' }} onMouseEnter={() => setHoveredCard(idx)} onMouseLeave={() => setHoveredCard(null)} onClick={() => window.open(cert.link, '_blank')}>
                    <div style={{ display: 'flex', gap: '2rem', padding: '1.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
                      <div style={{ width: '180px', height: '120px', borderRadius: '12px', overflow: 'hidden', flexShrink: 0, position: 'relative' }}>
                        <img src={cert.image} alt={cert.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s', transform: isHovered ? 'scale(1.1)' : 'scale(1)' }} />
                        <div style={{ position: 'absolute', top: '0.5rem', right: '0.5rem', padding: '0.3rem 0.6rem', borderRadius: '999px', background: 'rgba(0, 0, 0, 0.8)', fontSize: '0.7rem', fontWeight: 700, color: '#fff', fontFamily: 'JetBrains Mono' }}>{cert.year}</div>
                      </div>
                      <div style={{ flex: 1, minWidth: '250px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '0.8rem', flexWrap: 'wrap' }}>
                          <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: isHovered ? config.color : '#fff', transition: 'color 0.3s', fontFamily: 'Space Grotesk' }}>{cert.title}</h3>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', padding: '0.3rem 0.7rem', background: 'rgba(255, 215, 0, 0.15)', borderRadius: '8px', border: '1px solid rgba(255, 215, 0, 0.4)' }}>
                            <Zap size={14} style={{ color: '#ffd700' }} />
                            <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#ffd700' }}>{cert.power}</span>
                          </div>
                        </div>
                        <p style={{ fontSize: '0.95rem', color: 'rgba(255, 255, 255, 0.7)', marginBottom: '1rem', lineHeight: 1.5 }}>{cert.desc}</p>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.8rem' }}>
                          <span style={{ fontSize: '0.85rem', fontWeight: 600, color: config.color, padding: '0.3rem 0.7rem', background: `${config.color}15`, borderRadius: '6px', border: `1px solid ${config.color}40`, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                            <config.icon size={14} />
                            {cert.category}
                          </span>
                          <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'rgba(255, 255, 255, 0.7)', padding: '0.3rem 0.7rem', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '6px' }}>{cert.level}</span>
                          {cert.skills.map((skill, i) => (
                            <span key={i} style={{ fontSize: '0.75rem', padding: '0.3rem 0.6rem', borderRadius: '6px', background: 'rgba(0, 0, 0, 0.5)', color: 'rgba(255, 255, 255, 0.7)', fontFamily: 'JetBrains Mono' }}>{skill}</span>
                          ))}
                        </div>
                        <div style={{ fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.5)' }}>Issued by: {cert.issuer}</div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: config.color, fontSize: '0.9rem', fontWeight: 700 }}>
                        <span>View</span>
                        <ChevronRight size={18} style={{ transition: 'transform 0.3s', transform: isHovered ? 'translateX(5px)' : 'translateX(0)' }} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {viewMode === 'compact' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
              {filteredCerts.map((cert, idx) => {
                const config = categoryConfig[cert.category];
                const isHovered = hoveredCard === idx;
                return (
                  <div key={idx} className="glass" style={{ borderRadius: '14px', padding: '1.2rem', cursor: 'pointer', animation: `scaleIn 0.5s ease ${Math.min(idx * 0.02, 0.5)}s both`, transition: 'all 0.3s', transform: isHovered ? 'scale(1.03)' : 'scale(1)' }} onMouseEnter={() => setHoveredCard(idx)} onMouseLeave={() => setHoveredCard(null)} onClick={() => window.open(cert.link, '_blank')}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.8rem' }}>
                      <div style={{ width: '50px', height: '50px', borderRadius: '10px', background: config.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: `0 0 20px ${config.color}40` }}>
                        <config.icon size={28} style={{ color: '#000' }} />
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: isHovered ? config.color : '#fff', transition: 'color 0.3s', marginBottom: '0.3rem', fontFamily: 'Space Grotesk', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{cert.title}</h4>
                        <div style={{ fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.6)' }}>{cert.issuer}</div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.8rem' }}>
                      <span style={{ fontSize: '0.8rem', fontWeight: 600, color: config.color, padding: '0.3rem 0.6rem', background: `${config.color}15`, borderRadius: '6px' }}>{cert.level}</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        <Zap size={14} style={{ color: '#ffd700' }} />
                        <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#ffd700' }}>{cert.power}</span>
                      </div>
                      <span style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.5)' }}>{cert.year}</span>
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                      {cert.skills.slice(0, 3).map((skill, i) => (
                        <span key={i} style={{ fontSize: '0.7rem', padding: '0.25rem 0.5rem', borderRadius: '5px', background: 'rgba(0, 0, 0, 0.5)', color: 'rgba(255, 255, 255, 0.7)', fontFamily: 'JetBrains Mono' }}>{skill}</span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {viewMode === 'timeline' && (
            <div style={{ position: 'relative', paddingLeft: 'clamp(2rem, 5vw, 4rem)' }}>
              <div style={{ position: 'absolute', left: '1rem', top: 0, bottom: 0, width: '3px', background: 'linear-gradient(to bottom, #00ff9f, #00d4ff, #a855f7, #ff0080)', boxShadow: '0 0 20px rgba(0, 240, 255, 0.5)' }} />
              {filteredCerts.map((cert, idx) => {
                const config = categoryConfig[cert.category];
                const isHovered = hoveredCard === idx;
                return (
                  <div key={idx} style={{ position: 'relative', marginBottom: '3rem', animation: `fadeUp 0.7s ease ${Math.min(idx * 0.1, 1)}s both` }}>
                    <div style={{ position: 'absolute', left: '-2.7rem', top: '1.5rem', width: '1.5rem', height: '1.5rem', borderRadius: '50%', background: config.gradient, border: '4px solid #0a0a1a', boxShadow: `0 0 30px ${config.color}`, zIndex: 10, animation: 'pulse 2s infinite' }} />
                    <div className="glass" style={{ borderRadius: '16px', padding: '1.5rem', cursor: 'pointer', transition: 'all 0.3s', transform: isHovered ? 'translateX(10px)' : 'none' }} onMouseEnter={() => setHoveredCard(idx)} onMouseLeave={() => setHoveredCard(null)} onClick={() => window.open(cert.link, '_blank')}>
                      <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                        <div style={{ width: '120px', height: '80px', borderRadius: '10px', overflow: 'hidden', flexShrink: 0, position: 'relative' }}>
                          <img src={cert.image} alt={cert.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                        <div style={{ flex: 1, minWidth: '200px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
                            <span style={{ fontSize: '1rem', fontWeight: 700, color: config.color, fontFamily: 'JetBrains Mono' }}>{cert.year}</span>
                            <div style={{ height: '4px', flex: 1, minWidth: '50px', background: `${config.color}30`, borderRadius: '2px' }}>
                              <div style={{ height: '100%', width: `${cert.power}%`, background: config.gradient, borderRadius: '2px' }} />
                            </div>
                          </div>
                          <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: isHovered ? config.color : '#fff', transition: 'color 0.3s', marginBottom: '0.5rem', fontFamily: 'Space Grotesk' }}>{cert.title}</h3>
                          <p style={{ fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.7)', marginBottom: '0.8rem', lineHeight: 1.5 }}>{cert.desc}</p>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.5rem' }}>
                            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: config.color, padding: '0.3rem 0.7rem', background: `${config.color}15`, borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                              <config.icon size={14} />
                              {cert.category}
                            </span>
                            <span style={{ fontSize: '0.85rem', fontWeight: 600, padding: '0.3rem 0.7rem', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '6px', color: 'rgba(255, 255, 255, 0.8)' }}>{cert.level}</span>
                            {cert.skills.map((skill, i) => (
                              <span key={i} style={{ fontSize: '0.75rem', padding: '0.3rem 0.6rem', borderRadius: '6px', background: 'rgba(0, 0, 0, 0.5)', color: 'rgba(255, 255, 255, 0.7)', fontFamily: 'JetBrains Mono' }}>{skill}</span>
                            ))}
                          </div>
                          <div style={{ fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.5)' }}>
                            Issued by: {cert.issuer} • Power: <span style={{ color: '#ffd700', fontWeight: 700 }}>{cert.power}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {filteredCerts.length === 0 && (
            <div className="glass" style={{ textAlign: 'center', padding: '5rem 2rem', borderRadius: '24px', marginTop: '3rem', animation: 'scaleIn 0.5s ease' }}>
              <div style={{ fontSize: '5rem', marginBottom: '1.5rem', animation: 'float 3s ease-in-out infinite' }}>🔍</div>
              <h3 style={{ fontSize: '2rem', fontWeight: 800, color: '#00f0ff', marginBottom: '1rem', fontFamily: 'Space Grotesk' }}>No Certifications Found</h3>
              <p style={{ fontSize: '1.1rem', color: 'rgba(255, 255, 255, 0.6)', maxWidth: '500px', margin: '0 auto' }}>Try adjusting your search or filter criteria</p>
            </div>
          )}

          {/* Footer */}
          <div style={{ marginTop: '5rem', padding: '3rem', textAlign: 'center', background: 'linear-gradient(135deg, rgba(0, 255, 159, 0.05), rgba(0, 212, 255, 0.05))', borderRadius: '24px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
            <div style={{ fontSize: '1.8rem', fontWeight: 700, color: 'rgba(255, 255, 255, 0.8)', marginBottom: '1rem' }}>🎯 Ready for Top MNC Opportunities</div>
            <div style={{ fontSize: '1.1rem', color: 'rgba(255, 255, 255, 0.6)', maxWidth: '600px', margin: '0 auto' }}>Industry-recognized expertise across multiple high-demand technology domains</div>
          </div>
        </div>
      </div>
    </>
  );
}