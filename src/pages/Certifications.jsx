"use client";

import React, { useState, useEffect, useRef } from "react";

/* ═══════════════════════════════════════════════════════
   DESIGN TOKENS — Pure Black & White Architectural System
   (identical to Skills page)
═══════════════════════════════════════════════════════ */
const C = {
  bg:        "#0B0B0B",
  surface:   "#111111",
  surfaceHi: "#151515",
  border:    "rgba(255,255,255,0.06)",
  border2:   "rgba(255,255,255,0.12)",
  text:      "#FFFFFF",
  muted:     "rgba(255,255,255,0.55)",
  muted2:    "rgba(255,255,255,0.40)",
  accent:    "#FFFFFF",
  accentSub: "rgba(255,255,255,0.04)",
  accentLine:"rgba(255,255,255,0.08)",
};

const E  = "cubic-bezier(0.16, 1, 0.3, 1)";
const MS = { fast:"130ms", base:"190ms", slow:"320ms", reveal:"420ms" };

/* ═══════════════════════════════════════════════════════
   DEVICON CDN
═══════════════════════════════════════════════════════ */
const IB = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons";
const ICONS = {
  "React":           `${IB}/react/react-original.svg`,
  "Node.js":         `${IB}/nodejs/nodejs-original.svg`,
  "MongoDB":         `${IB}/mongodb/mongodb-original.svg`,
  "Express":         `${IB}/express/express-original.svg`,
  "Hooks":           `${IB}/react/react-original.svg`,
  "Context API":     `${IB}/react/react-original.svg`,
  "Performance":     `${IB}/react/react-original.svg`,
  "ES6+":            `${IB}/javascript/javascript-original.svg`,
  "Async/Await":     `${IB}/javascript/javascript-original.svg`,
  "Closures":        `${IB}/javascript/javascript-original.svg`,
  "Prototypes":      `${IB}/javascript/javascript-original.svg`,
  "Django":          `${IB}/django/django-plain.svg`,
  "ORM":             `${IB}/django/django-plain.svg`,
  "REST API":        `${IB}/fastapi/fastapi-original.svg`,
  "PostgreSQL":      `${IB}/postgresql/postgresql-original.svg`,
  "HTML5":           `${IB}/html5/html5-original.svg`,
  "Accessibility":   `${IB}/html5/html5-original.svg`,
  "SEO":             `${IB}/html5/html5-original.svg`,
  "Web Standards":   `${IB}/html5/html5-original.svg`,
  "Flexbox":         `${IB}/css3/css3-original.svg`,
  "Grid":            `${IB}/css3/css3-original.svg`,
  "Animations":      `${IB}/css3/css3-original.svg`,
  "Responsive Design":`${IB}/css3/css3-original.svg`,
  "AWS":             `${IB}/amazonwebservices/amazonwebservices-plain-wordmark.svg`,
  "EC2":             `${IB}/amazonwebservices/amazonwebservices-plain-wordmark.svg`,
  "S3":              `${IB}/amazonwebservices/amazonwebservices-plain-wordmark.svg`,
  "Lambda":          `${IB}/amazonwebservices/amazonwebservices-plain-wordmark.svg`,
  "Azure":           `${IB}/azure/azure-original.svg`,
  "VMs":             `${IB}/azure/azure-original.svg`,
  "Storage":         `${IB}/azure/azure-original.svg`,
  "Networking":      `${IB}/azure/azure-original.svg`,
  "Jenkins":         `${IB}/jenkins/jenkins-original.svg`,
  "Docker":          `${IB}/docker/docker-original.svg`,
  "Git":             `${IB}/git/git-original.svg`,
  "Automation":      `${IB}/jenkins/jenkins-original.svg`,
  "Kubernetes":      `${IB}/kubernetes/kubernetes-original.svg`,
  "Model Deployment":`${IB}/kubernetes/kubernetes-original.svg`,
  "Monitoring":      `${IB}/prometheus/prometheus-original.svg`,
  "Python":          `${IB}/python/python-original.svg`,
  "Scikit-learn":    `${IB}/scikitlearn/scikitlearn-original.svg`,
  "TensorFlow":      `${IB}/tensorflow/tensorflow-original.svg`,
  "Keras":           `${IB}/keras/keras-original.svg`,
  "Model Tuning":    `${IB}/python/python-original.svg`,
  "Neural Networks": `${IB}/tensorflow/tensorflow-original.svg`,
  "CNN":             `${IB}/tensorflow/tensorflow-original.svg`,
  "RNN":             `${IB}/tensorflow/tensorflow-original.svg`,
  "Transfer Learning":`${IB}/tensorflow/tensorflow-original.svg`,
  "GPT":             `${IB}/openal/openal-plain.svg`,
  "Prompt Engineering":`${IB}/python/python-original.svg`,
  "Fine-tuning":     `${IB}/python/python-original.svg`,
  "Embeddings":      `${IB}/python/python-original.svg`,
  "OOP":             `${IB}/java/java-original.svg`,
  "Data Structures": `${IB}/python/python-original.svg`,
  "Algorithms":      `${IB}/python/python-original.svg`,
  "Clean Code":      `${IB}/python/python-original.svg`,
  "Java":            `${IB}/java/java-original.svg`,
  "Spring Boot":     `${IB}/spring/spring-original.svg`,
  "Maven":           `${IB}/maven/maven-original.svg`,
  "Microservices":   `${IB}/spring/spring-original.svg`,
  "Problem Solving": `${IB}/cplusplus/cplusplus-original.svg`,
  "Optimization":    `${IB}/cplusplus/cplusplus-original.svg`,
  "Design Patterns": `${IB}/cplusplus/cplusplus-original.svg`,
  "R":               `${IB}/r/r-original.svg`,
  "Statistical Computing":`${IB}/r/r-original.svg`,
  "ggplot2":         `${IB}/r/r-original.svg`,
  "Data Viz":        `${IB}/r/r-original.svg`,
  "Pandas":          `${IB}/pandas/pandas-original.svg`,
  "NumPy":           `${IB}/numpy/numpy-original.svg`,
  "Data Analysis":   `${IB}/pandas/pandas-original.svg`,
  "Distributed Systems":`${IB}/kubernetes/kubernetes-original.svg`,
  "Scalability":     `${IB}/kubernetes/kubernetes-original.svg`,
  "Fault Tolerance": `${IB}/kubernetes/kubernetes-original.svg`,
  "JavaScript":      `${IB}/javascript/javascript-original.svg`,
  "TypeScript":      `${IB}/typescript/typescript-original.svg`,
  "Git / GitHub":    `${IB}/github/github-original.svg`,
  "VS Code":         `${IB}/vscode/vscode-original.svg`,
  "Postman":         `${IB}/postman/postman-original.svg`,
  "Jupyter Notebook":`${IB}/jupyter/jupyter-original.svg`,
  "Figma":           `${IB}/figma/figma-original.svg`,
  "Vercel":          `${IB}/vercel/vercel-original.svg`,
};

/* ═══════════════════════════════════════════════════════
   GLOBAL CSS
═══════════════════════════════════════════════════════ */
const GLOBAL = `
  @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@600;700&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&family=DM+Mono:wght@400;500&display=swap');

  *, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }
  html { scroll-behavior:smooth; overflow-x:hidden; }
  body {
    font-family:'DM Sans', system-ui, sans-serif;
    background:#0B0B0B;
    color:#FFFFFF;
    -webkit-font-smoothing:antialiased;
    overflow-x:hidden;
    cursor:none;
  }
  a, button, [data-magnetic] { cursor:none; }
  @keyframes _cursorIn {
    from { opacity:0; transform:translate(-50%,-50%) scale(0.2); }
    to   { opacity:1; transform:translate(-50%,-50%) scale(1); }
  }
  ::selection { background:rgba(255,255,255,0.12); }
  ::-webkit-scrollbar { width:2px; }
  ::-webkit-scrollbar-track { background:transparent; }
  ::-webkit-scrollbar-thumb { background:rgba(255,255,255,0.25); border-radius:2px; }

  @keyframes _rtl  { from{opacity:0;transform:translateX(48px);} to{opacity:1;transform:translateX(0);} }
  @keyframes _ltr  { from{opacity:0;transform:translateX(-48px);} to{opacity:1;transform:translateX(0);} }
  @keyframes _up   { from{opacity:0;transform:translateY(18px);} to{opacity:1;transform:translateY(0);} }
  @keyframes _fade { from{opacity:0;} to{opacity:1;} }
  @keyframes _si   { from{opacity:0;transform:scale(0.96);} to{opacity:1;transform:scale(1);} }
  @keyframes _lx   { from{transform:scaleX(0);} to{transform:scaleX(1);} }
  @keyframes _ly   { from{transform:scaleY(0);} to{transform:scaleY(1);} }
  @keyframes _tagPop { from{opacity:0;transform:translateX(14px) scale(0.92);} to{opacity:1;transform:translateX(0) scale(1);} }
  @keyframes _iconIn { from{opacity:0;transform:translateX(10px) scale(0.78);} to{opacity:1;transform:translateX(0) scale(1);} }
  @keyframes _pulse  { 0%,100%{opacity:0.3;transform:scale(1);} 50%{opacity:1;transform:scale(1.35);} }
  @keyframes _blink  { 0%,100%{opacity:1;} 50%{opacity:0;} }
  @keyframes _countUp{ from{opacity:0;transform:translateY(8px);} to{opacity:1;transform:translateY(0);} }
  @keyframes _marquee{ from{transform:translateX(0);} to{transform:translateX(-50%);} }
  @keyframes _expand { 0%{opacity:0;transform:scaleY(0.94) translateY(-8px);} 100%{opacity:1;transform:scaleY(1) translateY(0);} }

  .di {
    transition: transform 130ms cubic-bezier(0.16,1,0.3,1), filter 130ms cubic-bezier(0.16,1,0.3,1);
    cursor:default;
  }
  .di:hover {
    transform: scale(1.25) rotate(-6deg);
    filter: drop-shadow(0 2px 8px rgba(255,255,255,0.18));
  }
  .snav-btn:hover .snav-line { width:22px !important; }

  @media (prefers-reduced-motion:reduce) {
    *, *::before, *::after { animation-duration:0.01ms !important; transition-duration:0.01ms !important; }
    .marquee-inner { animation:none !important; }
  }
  @media (max-width:1024px) {
    .cert-grid    { grid-template-columns:1fr !important; }
    .hero-pillars { grid-template-columns:1fr 1fr !important; }
    .stats-grid   { grid-template-columns:repeat(2,1fr) !important; }
    .domain-grid  { grid-template-columns:1fr 1fr !important; }
  }
  @media (max-width:768px) {
    .snav         { display:none !important; }
    .cert-grid, .hero-pillars, .stats-grid, .domain-grid { grid-template-columns:1fr !important; }
    .footer-row   { flex-direction:column !important; }
    .fgrid        { grid-template-columns:1fr 1fr !important; }
  }
`;

/* ═══════════════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════════════ */
const TICKER_ITEMS = [
  "React","Node.js","Python","TensorFlow","MongoDB","Django",
  "Docker","Kubernetes","AWS","Azure","Scikit-learn","Java",
  "Spring Boot","PostgreSQL","HTML5","CSS3","JavaScript","Git",
  "Pandas","NumPy","Keras","Jenkins","R","Express",
];

const domainsData = [
  {
    id: "web",
    number: "01",
    domain: "Web Development",
    outcome:
      "Full-stack application development through real projects — building scalable MERN applications, designing REST APIs, managing databases, and implementing responsive UI systems with modern JavaScript frameworks.",

    context:
      "Tech Academy · Meta · JS Academy · Django Foundation · W3C · CSS Academy",

    period: "2023–2024",

    metric: { value: 6, suffix: "", label: "Certifications" },

    tech: {
      "Frontend": [
        "React",
        "HTML5",
        "CSS3",
        "Tailwind",
        "Flexbox",
        "Animations",
        "Responsive Design"
      ],
      "JavaScript": [
        "ES6+",
        "Async/Await",
        "Closures",
        "Prototypes",
        "DOM Manipulation",
        "Fetch API"
      ],
      "Backend": [
        "Node.js",
        "Express",
        "Django",
        "REST APIs",
        "JWT Authentication",
        "PostgreSQL"
      ],
      "Databases": [
        "MongoDB",
        "PostgreSQL",
        "Mongoose",
        "Data Modeling"
      ]
    },

    certs: [
      {
        title: "Full Stack Web Development",
        issuer: "Tech Academy",
        year: "2024",
        link:
          "https://drive.google.com/file/d/1AfvPfSaXHgVK9lPOsS3MUJimynH6xlog/view",
        note:
          "End-to-end web development including frontend architecture, backend APIs, and database integration applied in the ATS Resume Builder project."
      },

      {
        title: "React Development",
        issuer: "Meta",
        year: "2024",
        link:
          "https://drive.google.com/file/d/1yy4OpoVRAX2ZGVPUH9VmorLc2kiXalYf/view",
        note:
          "Modern React development using hooks, component composition, state management, and reusable UI architecture."
      },

      {
        title: "JavaScript (Advanced)",
        issuer: "JS Academy",
        year: "2024",
        link:
          "https://drive.google.com/file/d/1zrscfW3cyWq59mMYsK399CRjgEjA-zbd/view",
        note:
          "Deep understanding of asynchronous programming, event loops, closures, and modular JavaScript architecture."
      },

      {
        title: "Django Framework",
        issuer: "Django Foundation",
        year: "2023",
        link:
          "https://drive.google.com/file/d/1QdiX2u-ARCZCEdEmlu4l3ChnQT-SmhKc/view",
        note:
          "Backend development using Django ORM, model-view architecture, authentication systems, and REST API integration."
      },

      {
        title: "HTML5 & Semantic Markup",
        issuer: "W3C",
        year: "2023",
        link:
          "https://drive.google.com/file/d/1NYtaxfhQUfxaL4n6Vv6gJSEQMySy1gqr/view",
        note:
          "Accessibility-focused semantic HTML structure improving SEO, readability, and browser compatibility."
      },

      {
        title: "CSS3 & Modern Layouts",
        issuer: "CSS Academy",
        year: "2023",
        link:
          "https://drive.google.com/file/d/1iC65FGw0MSmjeKIivdnrZVm3GfXOKVvE/view",
        note:
          "Modern CSS layout systems including Flexbox, Grid, responsive breakpoints, and animation techniques."
      }
    ]
  },

  {
    id: "cloud",
    number: "02",
    domain: "Cloud & DevOps",

    outcome:
      "Practical understanding of cloud infrastructure, containerization, CI/CD automation, and deployment pipelines used for modern scalable applications and machine learning services.",

    context:
      "Amazon Web Services · Microsoft · Cloud Academy · DevOps Academy · MLOps Institute",

    period: "2023–2024",

    metric: { value: 5, suffix: "", label: "Certifications" },

    tech: {
      "AWS": ["AWS", "EC2", "S3", "Lambda", "IAM", "CloudWatch"],

      "Azure": [
        "Azure",
        "Virtual Machines",
        "Storage",
        "Networking",
        "Azure Functions"
      ],

      "DevOps": [
        "Docker",
        "Jenkins",
        "GitHub Actions",
        "CI/CD",
        "Automation"
      ],

      "Deployment": [
        "Vercel",
        "Render",
        "Netlify",
        "Cloud Deployment"
      ]
    },

    certs: [
      {
        title: "AWS Cloud Practitioner",
        issuer: "Amazon Web Services",
        year: "2024",
        link:
          "https://drive.google.com/file/d/17vu2Vd5QnxAHe4iEYv21ADC-Pfs-90U9/view",
        note:
          "Fundamentals of cloud infrastructure, compute services, object storage, and scalable system design."
      },

      {
        title: "Azure Fundamentals",
        issuer: "Microsoft",
        year: "2024",
        link:
          "https://drive.google.com/file/d/1ygiQILNjBAfcZse27n_px1_tgupajlWM/view",
        note:
          "Azure cloud architecture including networking, compute resources, and storage solutions."
      },

      {
        title: "Cloud Computing",
        issuer: "Cloud Academy",
        year: "2023",
        link:
          "https://drive.google.com/file/d/13gTq6yHm8jCOvqHKRjPpGw4hU4p7kovX/view",
        note:
          "Distributed systems principles, virtualization, and cloud service models."
      },

      {
        title: "CI/CD Pipelines",
        issuer: "DevOps Academy",
        year: "2024",
        link:
          "https://drive.google.com/file/d/1xccQv29hZCWCvr-JnM-nEfE8meESrWIr/view",
        note:
          "Continuous integration and delivery pipelines using Jenkins and containerized workflows."
      },

      {
        title: "MLOps",
        issuer: "MLOps Institute",
        year: "2024",
        link:
          "https://drive.google.com/file/d/1BmvjGknXs-K5wOfepFcl_CuU8DsFBApP/view",
        note:
          "Machine learning lifecycle management including model packaging, deployment, and monitoring."
      }
    ]
  },

  {
    id: "ai",
    number: "03",
    domain: "AI & Machine Learning",

    outcome:
      "Hands-on machine learning development including model training, evaluation, and deployment for real applications such as classification systems, recommendation engines, and intelligent assistants.",

    context: "ML Academy · AI Research Lab · OpenAI Institute",

    period: "2024",

    metric: { value: 3, suffix: "", label: "Certifications" },

    tech: {
      "ML Libraries": [
        "Python",
        "Scikit-learn",
        "TensorFlow",
        "Keras",
        "Pandas"
      ],

      "Deep Learning": [
        "Neural Networks",
        "CNN",
        "Transfer Learning",
        "Image Classification"
      ],

      "LLM": [
        "Prompt Engineering",
        "Embeddings",
        "Fine-tuning",
        "Chatbot Systems"
      ]
    },

    certs: [
      {
        title: "Machine Learning with Python",
        issuer: "ML Academy",
        year: "2024",
        link:
          "https://drive.google.com/file/d/1uaTJTnijSpjCsD_ZPHKwen9i3RDYwShK/view",
        note:
          "Supervised learning algorithms including regression, classification, and model evaluation techniques."
      },

      {
        title: "Deep Learning Specialization",
        issuer: "AI Research Lab",
        year: "2024",
        link:
          "https://drive.google.com/file/d/19vV6Nyq8A418eDvQ2ezrek4pqyUBb6X6/view",
        note:
          "Neural network fundamentals and convolutional networks applied in image classification systems."
      },

      {
        title: "Large Language Models",
        issuer: "OpenAI Institute",
        year: "2024",
        link:
          "https://drive.google.com/file/d/1CyN6_Bm3c68R0NkQWWTOgNAXTv27In_s/view",
        note:
          "Understanding transformer models, prompt design, embeddings, and conversational AI systems."
      }
    ]
  },

  {
    id: "foundations",
    number: "04",
    domain: "Programming & Foundations",

    outcome:
      "Strong programming foundation including data structures, algorithms, object-oriented design, and multi-language development across Python, Java, and R.",

    context:
      "Python Institute · Oracle · Programming Institute · R Consortium",

    period: "2023–2024",

    metric: { value: 4, suffix: "", label: "Certifications" },

    tech: {
      "Python": [
        "OOP",
        "Data Structures",
        "Algorithms",
        "Clean Code",
        "Problem Solving"
      ],

      "Java": [
        "Java",
        "Spring Boot",
        "Maven",
        "Object-Oriented Design"
      ],

      "Other": [
        "R",
        "Statistical Computing",
        "Optimization",
        "Data Visualization"
      ]
    },

    certs: [
      {
        title: "Python Programming",
        issuer: "Python Institute",
        year: "2024",
        link:
          "https://drive.google.com/file/d/1rZNRLvle0r_gUqzDjxR3_k6yApSyMxz6/view",
        note:
          "Core programming principles including OOP, algorithms, and data structures in Python."
      },

      {
        title: "Java Programming",
        issuer: "Oracle",
        year: "2024",
        link:
          "https://drive.google.com/file/d/1esxKzHNp_cuB7G87hs2MDeMpr2LKXucM/view",
        note:
          "Object-oriented programming, Java fundamentals, and backend service architecture."
      },

      {
        title: "Algorithmic Thinking",
        issuer: "Programming Institute",
        year: "2023",
        link:
          "https://drive.google.com/file/d/1SwQGo_zGZIGcTzzlMApXZU0Wt5ScyWXx/view",
        note:
          "Problem decomposition, algorithm design patterns, and complexity analysis."
      },

      {
        title: "R Programming",
        issuer: "R Consortium",
        year: "2023",
        link:
          "https://drive.google.com/file/d/1vFclrkOAe3GaA8brE3c5Sjd0k5RMXwr-/view",
        note:
          "Statistical computing, exploratory data analysis, and visualization with ggplot2."
      }
    ]
  },

  {
    id: "data",
    number: "05",
    domain: "Data Science",

    outcome:
      "Data analysis and visualization using Python libraries for data cleaning, transformation, statistical analysis, and exploratory insights on real datasets.",

    context: "Data Science Institute",

    period: "2024",

    metric: { value: 1, suffix: "", label: "Certification" },

    tech: {
      "Libraries": [
        "Pandas",
        "NumPy",
        "Matplotlib",
        "Seaborn",
        "Data Visualization"
      ]
    },

    certs: [
      {
        title: "Data Science",
        issuer: "Data Science Institute",
        year: "2024",
        link:
          "https://drive.google.com/file/d/1JENKEIpZkc1Mvro1mmRVyQr5u8fdUXqv/view",
        note:
          "Practical data analysis, visualization, and feature engineering using Python."
      }
    ]
  }
];

const FEATURED = [
  { domain:"Web Development",  cert:"Full Stack Web Development",   issuer:"Tech Academy",       year:"2024", link:"https://drive.google.com/file/d/1AfvPfSaXHgVK9lPOsS3MUJimynH6xlog/view", skills:["React","Node.js","MongoDB","Express"], scope:"MERN Stack", scopeLabel:"Practical Training", detail:"Covered full-stack fundamentals. Concepts applied while building the ATS Resume Builder and AI Chat Workspace." },
  { domain:"AI & ML",           cert:"Machine Learning with Python", issuer:"ML Academy",          year:"2024", link:"https://drive.google.com/file/d/1uaTJTnijSpjCsD_ZPHKwen9i3RDYwShK/view", skills:["Python","Scikit-learn","TensorFlow","Keras"], scope:"Core ML", scopeLabel:"Concepts Covered", detail:"Supervised and unsupervised learning. Applied in Fake News Detector and Career Recommender projects." },
  { domain:"Cloud",             cert:"AWS Cloud Practitioner",       issuer:"Amazon Web Services", year:"2024", link:"https://drive.google.com/file/d/17vu2Vd5QnxAHe4iEYv21ADC-Pfs-90U9/view", skills:["AWS","EC2","S3","Lambda"], scope:"Cloud Basics", scopeLabel:"Practitioner Level", detail:"Entry-level coverage of AWS compute, storage, and networking. Referenced during deployment work." },
];

/* ═══════════════════════════════════════════════════════
   HOOKS
═══════════════════════════════════════════════════════ */
function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVis(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, vis];
}

function Counter({ value, suffix = "", triggered }) {
  const [count, setCount] = useState(0);
  const fired = useRef(false);
  useEffect(() => {
    if (!triggered || fired.current) return;
    fired.current = true;
    const dur = 1200, start = Date.now();
    const tick = () => {
      const p = Math.min((Date.now() - start) / dur, 1);
      setCount(Math.floor(value * (1 - Math.pow(1 - p, 3))));
      if (p < 1) requestAnimationFrame(tick);
      else setCount(value);
    };
    requestAnimationFrame(tick);
  }, [triggered, value]);
  return <>{count}{suffix}</>;
}

/* ═══════════════════════════════════════════════════════
   MAGNETIC CURSOR (identical to Skills page)
═══════════════════════════════════════════════════════ */
function MagneticCursor() {
  const dotRef  = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const dot  = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mx = -200, my = -200, rx = -200, ry = -200;
    let rSize = 36, targetRSize = 36;
    let magEl = null, magOX = 0, magOY = 0, targetMagOX = 0, targetMagOY = 0;
    let rafId = null, visible = false;
    const lerp = (a, b, t) => a + (b - a) * t;

    const onMove = (e) => {
      mx = e.clientX; my = e.clientY;
      if (!visible) { visible = true; dot.style.opacity = "1"; ring.style.opacity = "1"; }
      const els = document.querySelectorAll("[data-magnetic]");
      let found = null;
      els.forEach((el) => {
        const r = el.getBoundingClientRect();
        const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
        const dist = Math.hypot(mx - cx, my - cy);
        if (dist < Math.max(r.width, r.height) * 0.65) found = el;
      });
      if (found) {
        magEl = found;
        const r = found.getBoundingClientRect();
        const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
        const dx = mx - cx, dy = my - cy;
        targetMagOX = dx * 0.38; targetMagOY = dy * 0.38; targetRSize = 58;
      } else {
        if (magEl) { magEl.style.transform = ""; magEl.style.transition = `transform 400ms ${E}`; }
        magEl = null; targetMagOX = 0; targetMagOY = 0; targetRSize = 36;
      }
    };
    const onLeave = () => { visible = false; dot.style.opacity = "0"; ring.style.opacity = "0"; if (magEl) { magEl.style.transform = ""; magEl = null; } };
    const onDown  = () => { targetRSize = 22; dot.style.transform = "translate(-50%,-50%) scale(0.5)"; };
    const onUp    = () => { targetRSize = magEl ? 58 : 36; dot.style.transform = "translate(-50%,-50%) scale(1)"; };
    const onOver  = (e) => {
      if (e.target.closest("a,button,[data-magnetic]")) {
        ring.style.borderColor = "rgba(255,255,255,0.9)"; ring.style.background = "rgba(255,255,255,0.06)";
      } else { ring.style.borderColor = "rgba(255,255,255,0.45)"; ring.style.background = "transparent"; }
    };
    const tick = () => {
      dot.style.left = mx + "px"; dot.style.top = my + "px";
      rx = lerp(rx, mx, 0.13); ry = lerp(ry, my, 0.13); rSize = lerp(rSize, targetRSize, 0.14);
      ring.style.left = rx + "px"; ring.style.top = ry + "px";
      ring.style.width = rSize + "px"; ring.style.height = rSize + "px";
      if (magEl) { magOX = lerp(magOX, targetMagOX, 0.14); magOY = lerp(magOY, targetMagOY, 0.14); magEl.style.transform = `translate(${magOX}px,${magOY}px)`; magEl.style.transition = "none"; }
      else { magOX = lerp(magOX, 0, 0.12); magOY = lerp(magOY, 0, 0.12); }
      rafId = requestAnimationFrame(tick);
    };
    document.addEventListener("mousemove",  onMove,  { passive:true });
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mousedown",  onDown);
    document.addEventListener("mouseup",    onUp);
    document.addEventListener("mouseover",  onOver,  { passive:true });
    rafId = requestAnimationFrame(tick);
    return () => {
      document.removeEventListener("mousemove",  onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mousedown",  onDown);
      document.removeEventListener("mouseup",    onUp);
      document.removeEventListener("mouseover",  onOver);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const BASE = { position:"fixed", top:0, left:0, transform:"translate(-50%,-50%)", pointerEvents:"none", zIndex:99999, opacity:0, animation:"_cursorIn 400ms cubic-bezier(0.16,1,0.3,1) 0.5s both" };
  return (
    <>
      <div ref={dotRef} style={{ ...BASE, width:"8px", height:"8px", borderRadius:"50%", background:"#FFFFFF", transition:`transform 120ms ${E}, opacity 200ms ease`, willChange:"left,top,transform" }}/>
      <div ref={ringRef} style={{ ...BASE, width:"36px", height:"36px", borderRadius:"50%", border:"1.5px solid rgba(255,255,255,0.45)", background:"transparent", transition:"border-color 180ms ease, background 180ms ease, opacity 200ms ease", willChange:"left,top,width,height", mixBlendMode:"difference" }}/>
    </>
  );
}

/* ═══════════════════════════════════════════════════════
   MARQUEE
═══════════════════════════════════════════════════════ */
function Marquee({ speed = 32 }) {
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS];
  return (
    <div style={{ overflow:"hidden", borderTop:`1px solid rgba(255,255,255,0.06)`, borderBottom:`1px solid rgba(255,255,255,0.06)`, padding:"10px 0", background:"#111111", position:"relative" }}>
      <div style={{ position:"absolute", left:0, top:0, bottom:0, width:"80px", background:`linear-gradient(to right, #111111, transparent)`, zIndex:2, pointerEvents:"none" }}/>
      <div style={{ position:"absolute", right:0, top:0, bottom:0, width:"80px", background:`linear-gradient(to left, #111111, transparent)`, zIndex:2, pointerEvents:"none" }}/>
      <div className="marquee-inner" style={{ display:"flex", alignItems:"center", gap:"32px", width:"max-content", animation:`_marquee ${speed}s linear infinite`, willChange:"transform" }}>
        {items.map((name, i) => {
          const src = ICONS[name];
          return (
            <div key={`${name}-${i}`} style={{ display:"flex", alignItems:"center", gap:"7px", opacity:0.45, flexShrink:0 }}>
              {src && <img src={src} alt={name} className="di" width={16} height={16} loading="lazy" style={{ display:"block", borderRadius:"2px" }}/>}
              <span style={{ fontFamily:"'DM Mono',monospace", fontSize:"11px", fontWeight:500, color:"rgba(255,255,255,0.50)", letterSpacing:"0.04em", whiteSpace:"nowrap" }}>{name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   DEVICON IMG
═══════════════════════════════════════════════════════ */
function DI({ name, size = 18, extraStyle = {} }) {
  const src = ICONS[name];
  if (!src) return null;
  return <img src={src} alt={name} className="di" width={size} height={size} loading="lazy" style={{ display:"block", flexShrink:0, borderRadius:"3px", ...extraStyle }}/>;
}

/* ═══════════════════════════════════════════════════════
   TAG
═══════════════════════════════════════════════════════ */
function Tag({ name, visible, delay }) {
  const [hov, setHov] = useState(false);
  return (
    <span
      data-magnetic
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{ display:"inline-flex", alignItems:"center", gap:"5px", padding:"4px 9px 4px 6px", borderRadius:"5px", background:hov?"rgba(255,255,255,0.08)":"#141414", border:`1px solid ${hov?"rgba(255,255,255,0.18)":"rgba(255,255,255,0.07)"}`, fontFamily:"'DM Mono',monospace", fontSize:"11px", color:hov?"#FFFFFF":"rgba(255,255,255,0.45)", cursor:"default", userSelect:"none", transition:`background ${MS.fast} ${E}, border-color ${MS.fast} ${E}, color ${MS.fast} ${E}`, opacity:visible?1:0, animation:visible?`_tagPop ${MS.slow} ${E} ${delay}s both`:"none" }}
    >
      <DI name={name} size={13} extraStyle={{ opacity:hov?0.9:0.5, transition:`opacity ${MS.fast} ${E}` }}/>
      {name}
    </span>
  );
}

/* ═══════════════════════════════════════════════════════
   SIDE NAV
═══════════════════════════════════════════════════════ */
function SideNav({ active }) {
  return (
    <nav className="snav" style={{ position:"fixed", left:"1.25rem", top:"50%", transform:"translateY(-50%)", zIndex:100, display:"flex", flexDirection:"column", gap:"14px" }}>
      {domainsData.map((d, i) => (
        <button
          key={d.id}
          className="snav-btn"
          data-magnetic
          onClick={() => document.getElementById(d.id)?.scrollIntoView({ behavior:"smooth" })}
          aria-label={`Jump to ${d.domain}`}
          style={{ display:"flex", alignItems:"center", gap:"6px", background:"none", border:"none", cursor:"pointer", padding:0, outline:"none" }}
        >
          <div className="snav-line" style={{ height:"1.5px", width:active===i?"22px":"10px", background:active===i?"#FFFFFF":"rgba(255,255,255,0.18)", borderRadius:"1px", transition:`all ${MS.slow} ${E}` }}/>
          <span style={{ fontFamily:"'DM Mono',monospace", fontSize:"9px", fontWeight:500, color:"rgba(255,255,255,0.55)", opacity:active===i?1:0, transition:`opacity ${MS.slow} ${E}` }}>{d.number}</span>
        </button>
      ))}
    </nav>
  );
}

/* ═══════════════════════════════════════════════════════
   MONO LABEL
═══════════════════════════════════════════════════════ */
function ML({ children, color = "rgba(255,255,255,0.55)", style = {} }) {
  return (
    <span style={{ display:"block", fontFamily:"'DM Mono',monospace", fontSize:"10px", fontWeight:500, letterSpacing:"0.14em", textTransform:"uppercase", color, ...style }}>
      {children}
    </span>
  );
}

/* ═══════════════════════════════════════════════════════
   TERM CURSOR
═══════════════════════════════════════════════════════ */
function TermCursor() {
  return <span style={{ display:"inline-block", width:"8px", height:"1.1em", background:"#FFFFFF", marginLeft:"3px", verticalAlign:"middle", animation:"_blink 1.1s step-end infinite", borderRadius:"1px" }}/>;
}

/* ═══════════════════════════════════════════════════════
   SECTION HEADER
═══════════════════════════════════════════════════════ */
function SH({ eyebrow, title, sub, visible, delay = 0, cursor = false }) {
  return (
    <div style={{ marginBottom:"2.5rem", opacity:visible?1:0, animation:visible?`_rtl ${MS.reveal} ${E} ${delay}s both`:"none" }}>
      <ML color="rgba(255,255,255,0.45)" style={{ marginBottom:"10px" }}>{eyebrow}</ML>
      <h2 style={{ fontFamily:"'Dancing Script',cursive", fontSize:"clamp(2.8rem,5.5vw,4.5rem)", fontWeight:700, color:"#FFFFFF", letterSpacing:"-0.025em", marginBottom:sub?"8px":0, display:"flex", alignItems:"center" }}>
        {title}
        {cursor && <TermCursor />}
      </h2>
      {sub && <p style={{ fontSize:"14px", color:"rgba(255,255,255,0.38)", lineHeight:1.65, maxWidth:"500px" }}>{sub}</p>}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   DOMAIN ROW  (mirrors CapRow from Skills)
═══════════════════════════════════════════════════════ */
function DomainRow({ dom, visible, delay, ri }) {
  const [hov, setHov] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const even = ri % 2 === 0;
  const la = even ? "_ltr" : "_rtl";
  const ra = even ? "_rtl" : "_ltr";

  return (
    <div id={dom.id}>
      {/* Main row */}
      <div
        className="cert-grid"
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:0, borderBottom:`1px solid rgba(255,255,255,0.06)`, background:hov?"#141414":"transparent", transition:`background ${MS.fast} ${E}, transform ${MS.base} ${E}`, transform:hov?"translateY(-2px)":"translateY(0)" }}
      >
        {/* LEFT */}
        <div style={{ padding:"2.25rem 2.5rem", borderRight:`1px solid ${hov?"rgba(255,255,255,0.10)":"rgba(255,255,255,0.06)"}`, transition:`border-color ${MS.fast} ${E}`, position:"relative", opacity:visible?1:0, animation:visible?`${la} ${MS.reveal} ${E} ${delay}s both`:"none" }}>
          <div style={{ position:"absolute", left:0, top:"18px", bottom:"18px", width:"2px", background:hov?"#FFFFFF":"rgba(255,255,255,0.25)", borderRadius:"0 2px 2px 0", transformOrigin:"top", transform:visible?"scaleY(1)":"scaleY(0)", transition:`transform ${MS.slow} ${E} ${delay+0.18}s, background ${MS.fast} ${E}` }}/>
          <div style={{ display:"flex", alignItems:"center", gap:"10px", marginBottom:"16px" }}>
            <ML color="rgba(255,255,255,0.45)">{dom.number}</ML>
            <div style={{ height:"1px", width:"20px", background:"rgba(255,255,255,0.30)", transformOrigin:"left", transform:visible?"scaleX(1)":"scaleX(0)", transition:`transform ${MS.base} ${E} ${delay+0.24}s` }}/>
          </div>
          <h3 style={{ fontFamily:"'Dancing Script',cursive", fontSize:"2.2rem", fontWeight:700, color:"#FFFFFF", lineHeight:1.1, letterSpacing:"-0.025em", marginBottom:"12px" }}>{dom.domain}</h3>
          <p style={{ fontSize:"14px", color:"rgba(255,255,255,0.42)", lineHeight:1.75, maxWidth:"400px" }}>{dom.outcome}</p>
          {/* Metric counter */}
          <div style={{ marginTop:"24px", opacity:visible?1:0, animation:visible?`_countUp ${MS.slow} ${E} ${delay+0.32}s both`:"none" }}>
            <div style={{ fontFamily:"'Dancing Script',cursive", fontSize:"3.5rem", fontWeight:700, color:"#FFFFFF", lineHeight:1, letterSpacing:"-0.03em" }}>
              <Counter value={dom.metric.value} suffix={dom.metric.suffix} triggered={visible}/>
            </div>
            <div style={{ fontFamily:"'DM Mono',monospace", fontSize:"10px", color:"rgba(255,255,255,0.35)", letterSpacing:"0.08em", marginTop:"4px", opacity:hov?0.9:0.5, transition:`opacity ${MS.fast} ${E}` }}>
              {dom.metric.label}
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div style={{ padding:"2.25rem 2.5rem", opacity:visible?1:0, animation:visible?`${ra} ${MS.reveal} ${E} ${delay+0.07}s both`:"none" }}>
          <div style={{ marginBottom:"22px" }}>
            {Object.entries(dom.tech).map(([cat, items], ci) => (
              <div key={cat} style={{ marginBottom:"12px", display:"flex", gap:"10px", alignItems:"baseline", flexWrap:"wrap" }}>
                <ML color="rgba(255,255,255,0.35)" style={{ minWidth:"84px", flexShrink:0, paddingTop:"2px" }}>{cat}</ML>
                <div style={{ display:"flex", flexWrap:"wrap", gap:"5px" }}>
                  {items.map((t, ti) => (
                    <Tag key={t} name={t} visible={visible} delay={delay + 0.14 + ci * 0.07 + ti * 0.035}/>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Individual certs preview */}
          <div style={{ display:"flex", flexDirection:"column", gap:"6px", marginBottom:"18px" }}>
            {dom.certs.slice(0, 3).map((c, ci) => (
              <div key={c.title} style={{ display:"flex", gap:"10px", alignItems:"flex-start", opacity:visible?1:0, animation:visible?`_rtl ${MS.slow} ${E} ${delay+0.30+ci*0.06}s both`:"none" }}>
                <div style={{ width:"3px", height:"3px", borderRadius:"50%", background:hov?"rgba(255,255,255,0.7)":"rgba(255,255,255,0.2)", flexShrink:0, marginTop:"7px", transition:`background ${MS.fast} ${E}` }}/>
                <div>
                  <span style={{ fontSize:"13px", fontWeight:500, color:"#FFFFFF" }}>{c.title}</span>
                  <span style={{ fontSize:"12px", color:"rgba(255,255,255,0.38)", marginLeft:"8px" }}>— {c.issuer} · {c.year}</span>
                </div>
              </div>
            ))}
            {dom.certs.length > 3 && !expanded && (
              <div style={{ display:"flex", gap:"10px", alignItems:"center" }}>
                <div style={{ width:"3px", height:"3px", borderRadius:"50%", background:"rgba(255,255,255,0.12)", flexShrink:0 }}/>
                <button onClick={() => setExpanded(true)} style={{ fontSize:"12px", color:"rgba(255,255,255,0.30)", background:"none", border:"none", cursor:"pointer", padding:0, fontFamily:"'DM Mono',monospace", letterSpacing:"0.05em" }}>
                  +{dom.certs.length - 3} more
                </button>
              </div>
            )}
            {expanded && dom.certs.slice(3).map((c, ci) => (
              <div key={c.title} style={{ display:"flex", gap:"10px", alignItems:"flex-start", animation:`_rtl ${MS.slow} ${E} ${ci*0.05}s both` }}>
                <div style={{ width:"3px", height:"3px", borderRadius:"50%", background:"rgba(255,255,255,0.2)", flexShrink:0, marginTop:"7px" }}/>
                <div>
                  <span style={{ fontSize:"13px", fontWeight:500, color:"#FFFFFF" }}>{c.title}</span>
                  <span style={{ fontSize:"12px", color:"rgba(255,255,255,0.38)", marginLeft:"8px" }}>— {c.issuer} · {c.year}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Context footer */}
          <div style={{ paddingTop:"14px", borderTop:`1px solid rgba(255,255,255,0.06)`, display:"flex", gap:"8px", alignItems:"center" }}>
            <span style={{ fontFamily:"'DM Mono',monospace", fontSize:"11px", color:"rgba(255,255,255,0.35)" }}>{dom.period}</span>
            <span style={{ fontSize:"11px", color:"rgba(255,255,255,0.20)" }}>·</span>
            <span style={{ fontSize:"11px", color:"rgba(255,255,255,0.35)" }}>{dom.context}</span>
          </div>
        </div>
      </div>

      {/* Expanded cert cards */}
      <ExpandedCerts dom={dom} expanded={expanded} setExpanded={setExpanded}/>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   EXPANDED CERT CARDS (toggled panel under domain row)
═══════════════════════════════════════════════════════ */
function ExpandedCerts({ dom, expanded, setExpanded }) {
  const [showAll, setShowAll] = useState(false);

  useEffect(() => { if (!expanded) setShowAll(false); }, [expanded]);

  const certsToShow = showAll ? dom.certs : dom.certs.slice(0, 4);

  if (!expanded) return null;

  return (
    <div style={{ background:"#0D0D0D", borderBottom:`1px solid rgba(255,255,255,0.06)`, padding:"2rem 2.5rem", animation:`_expand ${MS.reveal} ${E} both` }}>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))", gap:"12px", marginBottom:"16px" }}>
        {certsToShow.map((cert, ci) => (
          <CertCard key={cert.title} cert={cert} delay={ci * 0.04}/>
        ))}
      </div>
      <div style={{ display:"flex", gap:"12px", alignItems:"center" }}>
        {dom.certs.length > 4 && !showAll && (
          <button onClick={() => setShowAll(true)} style={{ fontFamily:"'DM Mono',monospace", fontSize:"11px", color:"rgba(255,255,255,0.35)", background:"none", border:"1px solid rgba(255,255,255,0.07)", borderRadius:"5px", padding:"6px 14px", cursor:"pointer" }}>
            Show all {dom.certs.length} certs
          </button>
        )}
        <button onClick={() => setExpanded(false)} style={{ fontFamily:"'DM Mono',monospace", fontSize:"11px", color:"rgba(255,255,255,0.25)", background:"none", border:"none", cursor:"pointer", padding:0 }}>
          Collapse ↑
        </button>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   CERT CARD
═══════════════════════════════════════════════════════ */
function CertCard({ cert, delay = 0 }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      data-magnetic
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{ padding:"1.5rem", background:hov?"#141414":"#111111", border:`1px solid ${hov?"rgba(255,255,255,0.14)":"rgba(255,255,255,0.06)"}`, borderRadius:"10px", transform:hov?"translateY(-4px)":"translateY(0)", transition:`background ${MS.fast} ${E}, border-color ${MS.fast} ${E}, transform ${MS.base} ${E}`, opacity:0, animation:`_rtl ${MS.slow} ${E} ${delay}s both`, position:"relative", overflow:"hidden" }}
    >
      {/* Left accent bar */}
      <div style={{ position:"absolute", left:0, top:"12px", bottom:"12px", width:"2px", background:hov?"#FFFFFF":"rgba(255,255,255,0.20)", borderRadius:"0 2px 2px 0", transition:`background ${MS.fast} ${E}` }}/>
      <div style={{ paddingLeft:"12px" }}>
        <h4 style={{ fontSize:"13.5px", fontWeight:600, color:"#FFFFFF", marginBottom:"6px", lineHeight:1.35 }}>{cert.title}</h4>
        <div style={{ display:"flex", gap:"8px", alignItems:"center", marginBottom:"10px" }}>
          <span style={{ fontFamily:"'DM Mono',monospace", fontSize:"11px", color:"rgba(255,255,255,0.40)" }}>{cert.issuer}</span>
          <span style={{ fontSize:"11px", color:"rgba(255,255,255,0.20)" }}>·</span>
          <span style={{ fontFamily:"'DM Mono',monospace", fontSize:"11px", color:"rgba(255,255,255,0.30)" }}>{cert.year}</span>
        </div>
        {cert.note && (
          <p style={{ fontSize:"12px", color:"rgba(255,255,255,0.30)", lineHeight:1.6, marginBottom:"12px" }}>{cert.note}</p>
        )}
        <a
          href={cert.link}
          target="_blank"
          rel="noopener noreferrer"
          style={{ display:"inline-flex", alignItems:"center", gap:"5px", fontFamily:"'DM Mono',monospace", fontSize:"10px", color:hov?"rgba(255,255,255,0.75)":"rgba(255,255,255,0.30)", textDecoration:"none", transition:`color ${MS.fast} ${E}` }}
        >
          View Credential
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </a>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   FEATURED CARD  (hero-style, mirrors MetCard feel)
═══════════════════════════════════════════════════════ */
function FeaturedCard({ cert, visible, delay, ri }) {
  const [hov, setHov] = useState(false);
  const even = ri % 2 === 0;
  return (
    <div
      data-magnetic
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{ padding:"2rem", background:hov?"#161616":"#111111", border:`1px solid ${hov?"rgba(255,255,255,0.14)":"rgba(255,255,255,0.06)"}`, borderRadius:"12px", transform:hov?"scale(1.014)":"scale(1)", transition:`background ${MS.base} ${E}, border-color ${MS.fast} ${E}, transform ${MS.base} ${E}`, opacity:visible?1:0, animation:visible?`_${even?"ltr":"rtl"} ${MS.reveal} ${E} ${delay}s both`:"none", position:"relative", overflow:"hidden" }}
    >
      {/* Top bar */}
      <div style={{ position:"absolute", top:0, left:0, right:0, height:"2px", background:hov?"rgba(255,255,255,0.35)":"rgba(255,255,255,0.10)", transition:`background ${MS.base} ${E}` }}/>

      <div style={{ display:"flex", alignItems:"center", gap:"10px", marginBottom:"14px" }}>
        <ML color="rgba(255,255,255,0.35)">{cert.domain}</ML>
        <div style={{ height:"1px", flex:1, background:"rgba(255,255,255,0.06)" }}/>
        <span style={{ fontFamily:"'DM Mono',monospace", fontSize:"10px", color:"rgba(255,255,255,0.25)" }}>{cert.year}</span>
      </div>

      <h3 style={{ fontFamily:"'Dancing Script',cursive", fontSize:"1.85rem", fontWeight:700, color:"#FFFFFF", lineHeight:1.15, letterSpacing:"-0.02em", marginBottom:"8px" }}>
        {cert.cert}
      </h3>
      <div style={{ fontFamily:"'DM Mono',monospace", fontSize:"11px", color:"rgba(255,255,255,0.35)", marginBottom:"16px" }}>{cert.issuer}</div>

      {/* Skills */}
      <div style={{ display:"flex", flexWrap:"wrap", gap:"5px", marginBottom:"18px" }}>
        {cert.skills.map((s, si) => (
          <Tag key={s} name={s} visible={visible} delay={delay + 0.12 + si * 0.04}/>
        ))}
      </div>

      {/* Scope block */}
      <div style={{ padding:"14px 16px", background:"rgba(255,255,255,0.03)", border:`1px solid rgba(255,255,255,0.06)`, borderRadius:"8px", marginBottom:"16px" }}>
        <ML color="rgba(255,255,255,0.25)" style={{ marginBottom:"6px" }}>Training Scope</ML>
        <div style={{ display:"flex", alignItems:"baseline", gap:"8px", marginBottom:"4px" }}>
          <span style={{ fontFamily:"'Dancing Script',cursive", fontSize:"1.6rem", fontWeight:700, color:"#FFFFFF", letterSpacing:"-0.02em" }}>{cert.scope}</span>
          <span style={{ fontSize:"12px", fontWeight:500, color:"rgba(255,255,255,0.60)" }}>{cert.scopeLabel}</span>
        </div>
        <p style={{ fontSize:"12.5px", color:"rgba(255,255,255,0.35)", lineHeight:1.65 }}>{cert.detail}</p>
      </div>

      <a
        href={cert.link}
        target="_blank"
        rel="noopener noreferrer"
        style={{ display:"inline-flex", alignItems:"center", gap:"6px", fontFamily:"'DM Mono',monospace", fontSize:"11px", color:hov?"rgba(255,255,255,0.80)":"rgba(255,255,255,0.35)", textDecoration:"none", padding:"8px 14px", background:hov?"rgba(255,255,255,0.07)":"transparent", border:`1px solid ${hov?"rgba(255,255,255,0.12)":"rgba(255,255,255,0.06)"}`, borderRadius:"6px", transition:`all ${MS.fast} ${E}` }}
      >
        View Credential
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" style={{ transform:hov?"translateX(3px)":"translateX(0)", transition:`transform ${MS.fast} ${E}` }}><path d="M5 12h14M12 5l7 7-7 7"/></svg>
      </a>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   STATS CARD
═══════════════════════════════════════════════════════ */
function StatCard({ value, suffix, label, sub, triggered, delay }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      data-magnetic
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{ padding:"2rem 1.5rem", background:"#111111", transform:hov?"scale(1.016)":"scale(1)", transition:`transform ${MS.fast} ${E}`, opacity:triggered?1:0, animation:triggered?`_up 300ms ${E} ${delay}s both`:"none" }}
    >
      <div style={{ fontFamily:"'Dancing Script',cursive", fontSize:"3.25rem", fontWeight:700, color:"#FFFFFF", lineHeight:1, letterSpacing:"-0.03em", marginBottom:"6px" }}>
        <Counter value={value} suffix={suffix} triggered={triggered}/>
      </div>
      <div style={{ fontSize:"13.5px", fontWeight:500, color:"#FFFFFF", marginBottom:"4px" }}>{label}</div>
      <div style={{ fontSize:"11.5px", color:"rgba(255,255,255,0.38)", lineHeight:1.5, opacity:hov?0.9:0.52, transition:`opacity ${MS.fast} ${E}` }}>{sub}</div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   FOOTER CTA
═══════════════════════════════════════════════════════ */
function FooterCTA({ label, sub, href, accent, visible, delay }) {
  const [hov, setHov] = useState(false);
  const [press, setPress] = useState(false);
  return (
    <a
      href={href}
      data-magnetic
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => { setHov(false); setPress(false); }}
      onMouseDown={() => setPress(true)}
      onMouseUp={() => setPress(false)}
      style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"16px 20px", borderRadius:"10px", textDecoration:"none", background:accent?(hov?"rgba(255,255,255,0.12)":"rgba(255,255,255,0.07)"):(hov?"rgba(255,255,255,0.06)":"rgba(255,255,255,0.03)"), border:`1px solid ${accent?(hov?"rgba(255,255,255,0.30)":"rgba(255,255,255,0.15)"):(hov?"rgba(255,255,255,0.12)":"rgba(255,255,255,0.07)")}`, transition:`background ${MS.fast} ${E}, border-color ${MS.fast} ${E}`, opacity:visible?1:0, transform:visible?(press?"scale(0.98)":"translateY(0)"):"translateY(10px)", animation:visible?`_up ${MS.slow} ${E} ${delay}s both`:"none" }}
    >
      <div>
        <ML color="rgba(255,255,255,0.25)" style={{ marginBottom:"4px" }}>{sub}</ML>
        <div style={{ fontSize:"14px", fontWeight:500, color:"#FFFFFF" }}>{label}</div>
      </div>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="2" strokeLinecap="round" style={{ transform:hov?"translateX(4px)":"translateX(0)", transition:`transform ${MS.fast} ${E}` }}>
        <path d="M5 12h14M12 5l7 7-7 7"/>
      </svg>
    </a>
  );
}

/* ═══════════════════════════════════════════════════════
   ROOT PAGE
═══════════════════════════════════════════════════════ */
export default function Certifications() {
  const [hR, hV]   = useInView(0.08);
  const [fR, fV]   = useInView(0.08);
  const [cR, cV]   = useInView(0.04);
  const [mR, mV]   = useInView(0.10);
  const [foR, foV] = useInView(0.04);

  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    const fn = () => {
      const mid = window.innerHeight / 2;
      domainsData.forEach((d, i) => {
        const el = document.getElementById(d.id);
        if (!el) return;
        const r = el.getBoundingClientRect();
        if (r.top <= mid && r.bottom >= mid) setActiveSection(i);
      });
    };
    window.addEventListener("scroll", fn, { passive:true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const W  = { maxWidth:"1200px", margin:"0 auto", padding:"0 2rem" };
  const SP = (t="5rem", b="5rem") => ({ padding:`${t} 0 ${b}` });

  const totalCerts = domainsData.reduce((s, d) => s + d.certs.length, 0);

  return (
    <>
      <style>{GLOBAL}</style>
      <MagneticCursor />
      <SideNav active={activeSection} />

      {/* Background grid texture */}
      <div aria-hidden="true" style={{ position:"fixed", inset:0, zIndex:0, pointerEvents:"none", backgroundImage:["linear-gradient(rgba(255,255,255,0.016) 1px, transparent 1px)","linear-gradient(90deg, rgba(255,255,255,0.016) 1px, transparent 1px)"].join(","), backgroundSize:"64px 64px", maskImage:"radial-gradient(ellipse 80% 55% at 50% 25%, black 10%, transparent)", WebkitMaskImage:"radial-gradient(ellipse 80% 55% at 50% 25%, black 10%, transparent)" }}/>

      <div style={{ position:"relative", zIndex:1 }}>

        {/* ─────────────────── HERO ─────────────────── */}
        <header ref={hR} style={{ ...SP("8rem","5rem"), background:"#0B0B0B" }}>
          <div style={W}>
            {/* Eyebrow */}
            <div style={{ display:"flex", alignItems:"center", gap:"12px", marginBottom:"2rem", opacity:hV?1:0, animation:hV?`_rtl ${MS.slow} ${E} 0.05s both`:"none" }}>
              <div style={{ width:"20px", height:"1px", background:"rgba(255,255,255,0.55)" }}/>
              <ML>Certifications · B.Tech AIDS · 2026</ML>
              <TermCursor />
            </div>

            {/* Headline */}
            <h1 style={{ fontFamily:"'Dancing Script',cursive", fontSize:"clamp(3.5rem,8vw,7rem)", fontWeight:700, color:"#FFFFFF", lineHeight:1.03, letterSpacing:"-0.03em", marginBottom:"1.5rem", maxWidth:"820px", opacity:hV?1:0, animation:hV?`_rtl ${MS.reveal} ${E} 0.12s both`:"none" }}>
              Courses &<br/>Credentials
            </h1>

            {/* Sub */}
            <p style={{ fontSize:"1rem", color:"rgba(255,255,255,0.42)", lineHeight:1.75, maxWidth:"560px", marginBottom:"3rem", opacity:hV?1:0, animation:hV?`_rtl ${MS.reveal} ${E} 0.20s both`:"none" }}>
              Structured training across web development, cloud computing, and machine learning, with each course directly connected to practical projects and measurable outcomes. The learning process focused on building real applications, implementing scalable architectures, and applying modern development practices such as REST API design, cloud deployment, and machine learning model evaluation. This approach ensured that theoretical knowledge was consistently reinforced through hands-on development, resulting in production-ready systems and portfolio-grade projects.
            </p>

            {/* Pillars */}
            <div className="hero-pillars" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"1px", background:"rgba(255,255,255,0.06)", borderRadius:"12px", overflow:"hidden", border:"1px solid rgba(255,255,255,0.06)", opacity:hV?1:0, animation:hV?`_si ${MS.slow} ${E} 0.28s both`:"none" }}>
              {[
                { label:"Web & Frontend",     desc:"React, Django, HTML5, CSS3",        icons:["React","HTML5","Django","Flexbox"] },
                { label:"AI & Cloud",         desc:"TensorFlow, AWS, Azure, Docker",    icons:["TensorFlow","AWS","Azure","Docker"] },
                { label:"Languages & Data",   desc:"Python, Java, Pandas, R",           icons:["Python","Java","Pandas","R"] },
              ].map((p, i) => (
                <div key={i} style={{ padding:"1.75rem 1.5rem", background:"#0B0B0B" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:"8px", marginBottom:"8px" }}>
                    <div style={{ width:"4px", height:"4px", borderRadius:"50%", background:"rgba(255,255,255,0.55)" }}/>
                    <span style={{ fontSize:"13.5px", fontWeight:600, color:"#FFFFFF" }}>{p.label}</span>
                  </div>
                  <p style={{ fontSize:"12px", color:"rgba(255,255,255,0.38)", lineHeight:1.6, marginBottom:"12px" }}>{p.desc}</p>
                  <div style={{ display:"flex", gap:"6px" }}>
                    {p.icons.map((ic, ii) => (
                      <img key={ic} src={ICONS[ic]} alt={ic} className="di" width={18} height={18} loading="lazy" style={{ display:"block", borderRadius:"2px", opacity:0.5, animation:hV?`_iconIn 280ms ${E} ${0.34 + i*0.06 + ii*0.04}s both`:"none" }}/>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </header>

        {/* ─── MARQUEE ─── */}
        <Marquee speed={34} />

        {/* ─────────────────── FEATURED ─────────────────── */}
        <section ref={fR} style={{ ...SP("4rem","5rem"), background:"#0B0B0B" }}>
          <div style={W}>
            <SH eyebrow="Section 01" title="Most Relevant" sub="Three credentials most directly tied to shipped project work." visible={fV} cursor/>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))", gap:"12px" }}>
              {FEATURED.map((cert, i) => (
                <FeaturedCard key={cert.cert} cert={cert} visible={fV} delay={i * 0.10} ri={i}/>
              ))}
            </div>
          </div>
        </section>

        {/* ─── MARQUEE ─── */}
        <Marquee speed={28} />

        {/* ─────────────────── DOMAIN ROWS ─────────────────── */}
        <section
          ref={cR}
          style={{ borderTop:`1px solid rgba(255,255,255,0.06)`, borderBottom:`1px solid rgba(255,255,255,0.06)`, background:"#0B0B0B" }}
        >
          <div style={W}>
            <div style={{ padding:"4rem 0 2.5rem" }}>
              <SH eyebrow="Section 02" title="All Certifications" sub="Organized by domain. Click rows to expand individual credentials." visible={cV} cursor/>
            </div>
          </div>
          {domainsData.map((dom, i) => (
            <div key={dom.id}>
              <div style={W}>
                <DomainRow dom={dom} visible={cV} delay={i * 0.09} ri={i}/>
              </div>
            </div>
          ))}
          <div style={{ height:"3rem" }}/>
        </section>

        {/* ─── MARQUEE ─── */}
        <Marquee speed={30} />

        {/* ─────────────────── METRICS ─────────────────── */}
        <section ref={mR} style={{ ...SP(), background:"#0F0F0F" }}>
          <div style={W}>
            <SH eyebrow="Section 03" title="Credential Metrics" visible={mV}/>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(190px,1fr))", gap:"1px", background:"rgba(255,255,255,0.06)", border:`1px solid rgba(255,255,255,0.06)`, borderRadius:"12px", overflow:"hidden" }}>
              {[
                { value:totalCerts, suffix:"",  label:"Total Certifications", sub:"Across 5 domains" },
                { value:5,          suffix:"",  label:"Technical Domains",    sub:"Web · Cloud · AI · Code · Data" },
                { value:3,          suffix:"",  label:"Industry Internships", sub:"Applied certificate concepts" },
                { value:5,          suffix:"+", label:"Live Projects",        sub:"Deployed systems" },
                { value:20,         suffix:"+", label:"Certifications",       sub:"Including AWS · Azure · GCP" },
              ].map((m, i) => (
                <StatCard key={i} {...m} triggered={mV} delay={i * 0.06}/>
              ))}
            </div>
          </div>
        </section>

        {/* ─────────────────── FOOTER ─────────────────── */}
        <footer ref={foR} style={{ background:"#000000", position:"relative", overflow:"hidden" }}>
          {/* Wave transition */}
          <div style={{ position:"relative", height:"56px", background:"#0F0F0F", overflow:"hidden" }}>
            <svg viewBox="0 0 1440 56" preserveAspectRatio="none" style={{ position:"absolute", bottom:0, left:0, width:"100%", height:"100%" }}>
              <path d="M0,0 C360,56 720,0 1080,28 C1260,42 1380,14 1440,28 L1440,56 L0,56 Z" fill="#000000"/>
            </svg>
          </div>

          <div aria-hidden="true" style={{ position:"absolute", inset:0, zIndex:0, pointerEvents:"none", backgroundImage:["linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)","linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)"].join(","), backgroundSize:"48px 48px" }}/>
          <div aria-hidden="true" style={{ position:"absolute", left:"-5%", top:"15%", width:"420px", height:"420px", borderRadius:"50%", background:"radial-gradient(circle, rgba(255,255,255,0.04), transparent 70%)", filter:"blur(60px)", pointerEvents:"none" }}/>

          <div style={{ ...W, position:"relative", zIndex:1 }}>
            <div style={{ borderBottom:"1px solid rgba(255,255,255,0.06)", padding:"4rem 0" }}>
              <div className="footer-row" style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", gap:"2.5rem", flexWrap:"wrap" }}>
                <div style={{ maxWidth:"540px" }}>
                  <div style={{ display:"inline-flex", alignItems:"center", gap:"6px", padding:"5px 12px", borderRadius:"999px", background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.12)", marginBottom:"20px", opacity:foV?1:0, animation:foV?`_rtl ${MS.slow} ${E} 0.05s both`:"none" }}>
                    <div style={{ width:"5px", height:"5px", borderRadius:"50%", background:"rgba(255,255,255,0.85)", animation:"_pulse 2.2s ease-in-out infinite" }}/>
                    <ML color="rgba(255,255,255,0.65)">Open to Opportunities · 2026</ML>
                  </div>
                  <h2 style={{ fontFamily:"'Dancing Script',cursive", fontSize:"clamp(3rem,6vw,5.5rem)", fontWeight:700, color:"#FFFFFF", lineHeight:1.04, letterSpacing:"-0.03em", marginBottom:"14px", opacity:foV?1:0, animation:foV?`_rtl ${MS.reveal} ${E} 0.12s both`:"none" }}>
                    Let's Build Something<br/>Inevitable
                  </h2>
                  <p style={{ fontSize:"15px", color:"rgba(255,255,255,0.35)", lineHeight:1.75, maxWidth:"400px", opacity:foV?1:0, animation:foV?`_rtl ${MS.reveal} ${E} 0.20s both`:"none" }}>
                    Systems engineer. Product thinker. AI architect. Ready to join teams that ship things that matter.
                  </p>
                </div>
                <div style={{ display:"flex", flexDirection:"column", gap:"10px", minWidth:"230px" }}>
                  <FooterCTA label="Schedule Interview" sub="Primary" href="mailto:g.sivasatyasaibhagavan@gmail.com" accent visible={foV} delay={0.16}/>
                  <FooterCTA label="View Skills"        sub="Profile" href="/skills"                                  accent={false} visible={foV} delay={0.22}/>
                </div>
              </div>
            </div>

            {/* Footer meta */}
            <div className="fgrid" style={{ display:"grid", gridTemplateColumns:"2fr 1fr 1fr 1fr", gap:"2.5rem", padding:"3rem 0 2.5rem" }}>
              <div>
                <div style={{ fontFamily:"'Dancing Script',cursive", fontSize:"2rem", fontWeight:700, color:"#FFFFFF", letterSpacing:"-0.03em", marginBottom:"10px" }}>
                  Bhagavan<span style={{ color:"rgba(255,255,255,0.35)" }}>.</span>
                </div>
                <p style={{ fontSize:"12.5px", color:"rgba(255,255,255,0.28)", lineHeight:1.75, marginBottom:"20px", maxWidth:"240px" }}>
                  B.Tech AIDS · Ramachandra College · Andhra Pradesh, India.
                </p>
                <div style={{ display:"flex", gap:"6px" }}>
                  {[
                    { l:"GH", h:"https://github.com/bhagavan444" },
                    { l:"LI", h:"https://www.linkedin.com/in/gopalajosyula-siva-satya-sai-bhagavan-1624a027b/" },
                    { l:"✉",  h:"mailto:g.sivasatyasaibhagavan@gmail.com" },
                  ].map((s, i) => (
                    <a key={i} href={s.h} data-magnetic target={s.h.startsWith("http")?"_blank":undefined} rel={s.h.startsWith("http")?"noopener noreferrer":undefined} style={{ width:"32px", height:"32px", borderRadius:"7px", background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.08)", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'DM Mono',monospace", color:"rgba(255,255,255,0.35)", textDecoration:"none", fontSize:"11px" }}>
                      {s.l}
                    </a>
                  ))}
                </div>
              </div>
              <div>
                <ML color="rgba(255,255,255,0.18)" style={{ marginBottom:"18px" }}>Navigate</ML>
                {["Overview","Web Dev","Cloud","AI & ML","Foundations","Data"].map((l, i) => (
                  <a key={i} href="#" style={{ display:"block", fontSize:"13px", color:"rgba(255,255,255,0.32)", textDecoration:"none", marginBottom:"10px" }}>{l}</a>
                ))}
              </div>
              <div>
                <ML color="rgba(255,255,255,0.18)" style={{ marginBottom:"18px" }}>Work</ML>
                {[
                  { l:"All Projects",   h:"/projects" },
                  { l:"GitHub",         h:"https://github.com/bhagavan444" },
                  { l:"Resume / CV",    h:"#" },
                  { l:"Skills Profile", h:"/skills" },
                ].map((l, i) => (
                  <a key={i} href={l.h} style={{ display:"block", fontSize:"13px", color:"rgba(255,255,255,0.32)", textDecoration:"none", marginBottom:"10px" }}>{l.l}</a>
                ))}
              </div>
              <div>
                <ML color="rgba(255,255,255,0.18)" style={{ marginBottom:"18px" }}>Contact</ML>
                {[
                  { lb:"Email",    v:"g.sivasatyasaibhagavan@gmail.com" },
                  { lb:"Phone",    v:"+91 7569205626" },
                  { lb:"Location", v:"Andhra Pradesh, IN" },
                  { lb:"Status",   v:"Available · Immediate", bright:true },
                ].map((c, i) => (
                  <div key={i} style={{ marginBottom:"14px" }}>
                    <ML color="rgba(255,255,255,0.20)" style={{ fontSize:"9px", marginBottom:"3px" }}>{c.lb}</ML>
                    <div style={{ fontSize:"12.5px", color:c.bright?"rgba(255,255,255,0.85)":"rgba(255,255,255,0.42)" }}>{c.v}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom bar */}
            <div style={{ borderTop:"1px solid rgba(255,255,255,0.06)", padding:"1.5rem 0", display:"flex", alignItems:"center", justifyContent:"space-between", gap:"1rem", flexWrap:"wrap" }}>
              <div style={{ fontFamily:"'DM Mono',monospace", fontSize:"11px", color:"rgba(255,255,255,0.20)" }}>
                © 2026 Siva Satya Sai Bhagavan
              </div>
              <div style={{ display:"flex", gap:"20px" }}>
                {["Privacy","Terms","Sitemap"].map(l => (
                  <a key={l} href="#" style={{ fontFamily:"'DM Mono',monospace", fontSize:"11px", color:"rgba(255,255,255,0.20)", textDecoration:"none" }}>{l}</a>
                ))}
              </div>
              <div style={{ display:"flex", alignItems:"center", gap:"6px" }}>
                <div style={{ width:"5px", height:"5px", borderRadius:"50%", background:"rgba(255,255,255,0.75)", animation:"_pulse 2.2s ease-in-out infinite" }}/>
                <span style={{ fontFamily:"'DM Mono',monospace", fontSize:"11px", color:"rgba(255,255,255,0.55)" }}>Available for hire</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}