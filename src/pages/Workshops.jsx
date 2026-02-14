"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Cpu, Brain, Cloud, Shield, Network, Terminal,
  Github, ExternalLink, X, ArrowUpRight,
  CheckCircle2, Layers, Box, TrendingUp, Database
} from "lucide-react";

/* ═══════════════════════════════════════════════════════════════
   DESIGN TOKENS
═══════════════════════════════════════════════════════════════ */
const T = {
  bg: "#F8F7F4",
  white: "#FFFFFF",
  ink: "#0C0C0C",
  ink80: "#1C1C1C",
  ink60: "#3A3A3A",
  ink40: "#737373",
  ink20: "#B8B8B8",
  ink10: "#E0E0E0",
  ink05: "#EDEDED",
  ink02: "#F5F4F1",
  blue: "#1A56FF",
  blueMid: "rgba(26,86,255,0.10)",
  blueSubtle: "rgba(26,86,255,0.06)",
};

/* ═══════════════════════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════════════════════ */
const CAPABILITIES = [
  {
    id: "fullstack", icon: Cpu, index: "01",
    title: "Full-Stack Engineering", domain: "MERN · Production",
    tagline: "End-to-end product ownership from schema to deployed UI.",
    problemSpace: "Complete system control without hand-offs. Building products where every layer — database, API, state, UI — is understood and owned.",
    architecturalPatterns: ["MVC Architecture", "REST API Design", "JWT + OAuth 2.0", "Server-Side Rendering", "Client State Management", "Schema Design"],
    engineeringFocus: ["API architecture & endpoint design", "Auth & session strategy", "MongoDB schema optimization", "Performance & caching layers", "Security best practices", "Deployment automation"],
    tradeoffs: [
      { decision: "MongoDB vs PostgreSQL", rationale: "MongoDB for flexible schema evolution in early-stage products" },
      { decision: "JWT vs Sessions", rationale: "JWT for stateless auth in distributed deployments" },
      { decision: "Monolith vs Microservices", rationale: "Monolith first, extracted to services at real scale" },
      { decision: "Client vs Server State", rationale: "Redux for complex shared state, Context for local" },
    ],
    productionEvidence: { "Deployments": "5 apps", "Active Users": "3,000+", "Scale": "Multi-region AWS", "Impact": "40% latency ↓" },
    stack: ["React", "Node.js", "Express", "MongoDB", "Redis", "JWT", "Tailwind"],
    projects: [
      { name: "ATS Resume Builder", impact: "3k+ users, 2× hire improvement", tech: ["React", "Node.js", "MongoDB"] },
      { name: "AI Chat Workspace", impact: "Real-time collaboration at scale", tech: ["WebSockets", "Redis", "Express"] },
      { name: "E-Commerce Platform", impact: "Stripe payments, full cart system", tech: ["Stripe", "MongoDB", "React"] },
    ],
  },
  {
    id: "aiml", icon: Brain, index: "02",
    title: "Machine Learning Engineering", domain: "AI / ML · Applied",
    tagline: "ML systems that solve business problems — not notebook accuracy.",
    problemSpace: "Reliability and production pipelines over experimentation. Every model ships with monitoring, drift detection, and a defined fallback.",
    architecturalPatterns: ["ETL Pipelines", "Feature Engineering", "Model Versioning", "A/B Testing", "Real-time Inference API", "Batch Prediction Jobs"],
    engineeringFocus: ["Model training & evaluation", "Feature engineering pipelines", "Serving strategy", "Drift detection", "Data validation", "SHAP explainability"],
    tradeoffs: [
      { decision: "Complexity vs Interpretability", rationale: "Simpler models where explainability matters — healthcare, finance" },
      { decision: "Real-time vs Batch", rationale: "Batch for cost efficiency, real-time only when latency is critical" },
      { decision: "Cloud ML vs Self-hosted", rationale: "Self-hosted for cost control at scale" },
      { decision: "SQL vs NoSQL for Features", rationale: "PostgreSQL for structured features, Redis for real-time lookups" },
    ],
    productionEvidence: { "Models Deployed": "6", "Predictions Served": "1M+", "Accuracy": "95%", "Inference": "50ms" },
    stack: ["Python", "Scikit-learn", "TensorFlow", "FastAPI", "Pandas", "Docker", "MLflow"],
    projects: [
      { name: "Fake News Detector", impact: "95% accuracy across 1M+ articles", tech: ["TF-IDF", "Logistic Regression", "FastAPI"] },
      { name: "Price Prediction Engine", impact: "Real estate forecasting model", tech: ["XGBoost", "Feature Engineering"] },
      { name: "Churn Detection System", impact: "SHAP-explainable predictions", tech: ["Scikit-learn", "Streamlit"] },
    ],
  },
  {
    id: "cloud", icon: Cloud, index: "03",
    title: "Cloud Architecture", domain: "DevOps · Infrastructure",
    tagline: "Reliable, cost-efficient infrastructure. Reproducibility by default.",
    problemSpace: "Automated deployments, zero-downtime releases, and infrastructure that costs less than it should — without sacrificing uptime.",
    architecturalPatterns: ["Infrastructure as Code", "Blue-Green Deployment", "Load Balancing", "Container Orchestration", "CI/CD Pipelines", "Alerting"],
    engineeringFocus: ["AWS service architecture", "Docker containerization", "CI/CD automation", "Cost optimization", "Security group config", "Zero-downtime deploys"],
    tradeoffs: [
      { decision: "EC2 vs Lambda", rationale: "EC2 for predictable workloads, Lambda for traffic spikes" },
      { decision: "Kubernetes vs Compose", rationale: "Docker Compose for simplicity until scale demands K8s" },
      { decision: "Multi-cloud vs Single", rationale: "AWS-first for team expertise — multi-cloud complexity rarely pays off early" },
      { decision: "Cost vs Availability", rationale: "Reserved instances for baseline, spot instances for batch" },
    ],
    productionEvidence: { "Deployments": "7", "Uptime": "99.9%", "Regions": "3", "Cost Saving": "40% ↓" },
    stack: ["AWS", "Docker", "Terraform", "GitHub Actions", "Nginx", "EC2", "S3"],
    projects: [
      { name: "Multi-region Infrastructure", impact: "Global availability with failover", tech: ["AWS", "Terraform", "ALB"] },
      { name: "CI/CD Pipeline", impact: "10min end-to-end deploy time", tech: ["GitHub Actions", "Docker"] },
      { name: "Cost Optimization", impact: "40% monthly cost reduction", tech: ["Reserved Instances", "Spot"] },
    ],
  },
  {
    id: "security", icon: Shield, index: "04",
    title: "Security Engineering", domain: "Cybersecurity · Applied",
    tagline: "Secure systems by design, not by audit.",
    problemSpace: "Identifying vulnerabilities before attackers do. Applied in CTF environments and integrated as a first-class concern at every layer.",
    architecturalPatterns: ["Defense in Depth", "Zero Trust", "Secure by Default", "Rate Limiting", "Input Validation", "Security Monitoring"],
    engineeringFocus: ["OWASP Top 10 mitigation", "Penetration testing", "Secure auth flows", "Network security", "Vulnerability scanning", "Audit practices"],
    tradeoffs: [
      { decision: "Security vs Usability", rationale: "MFA where critical, passwordless where it improves both" },
      { decision: "Client vs Server Validation", rationale: "Both layers — never trust client-side alone" },
      { decision: "Encrypted vs Plaintext Logs", rationale: "PII encrypted, operational logs plain for debuggability" },
      { decision: "Rate Limit Strictness", rationale: "Aggressive on auth endpoints, lenient on public read APIs" },
    ],
    productionEvidence: { "Projects": "6", "CTF Challenges": "15+", "Auth Systems": "Hardened", "Coverage": "OWASP Top 10" },
    stack: ["Kali Linux", "Burp Suite", "Metasploit", "Wireshark", "Nmap", "OWASP ZAP"],
    projects: [
      { name: "Secure Auth System", impact: "JWT + Redis rate limiting", tech: ["Node.js", "Redis"] },
      { name: "Vulnerability Scanner", impact: "Automated port analysis tool", tech: ["Python", "Nmap"] },
      { name: "CTF Write-ups", impact: "15+ documented solutions", tech: ["Web Exploitation", "Crypto"] },
    ],
  },
  {
    id: "blockchain", icon: Network, index: "05",
    title: "Blockchain Engineering", domain: "Web3 · Builder",
    tagline: "Smart contracts that are auditable, upgradeable, and gas-efficient.",
    problemSpace: "Decentralized applications with real UX. Smart contracts reviewed for security, wallet flows that don't confuse users.",
    architecturalPatterns: ["Smart Contract Design", "Gas Optimization", "Event-driven", "IPFS Storage", "Wallet Integration", "On-chain Governance"],
    engineeringFocus: ["Solidity development", "Security audits", "Gas optimization", "Ethers.js integration", "MetaMask flows", "Hardhat testing"],
    tradeoffs: [
      { decision: "Layer 1 vs Layer 2", rationale: "Polygon for lower gas costs in production DApps" },
      { decision: "On-chain vs Off-chain", rationale: "IPFS for large data, only content hashes on-chain" },
      { decision: "Upgradeable vs Immutable", rationale: "Proxy pattern for upgradeability with transparent governance" },
      { decision: "ERC-20 vs ERC-721", rationale: "Token standard chosen by use case, not default" },
    ],
    productionEvidence: { "Testnet Contracts": "5", "Gas Optimized": "Yes", "Test Coverage": "100%", "Standards": "ERC-20/721" },
    stack: ["Solidity", "Hardhat", "Ethers.js", "IPFS", "MetaMask", "OpenZeppelin", "React"],
    projects: [
      { name: "NFT Minting Platform", impact: "ERC-721 with IPFS metadata", tech: ["Solidity", "React", "IPFS"] },
      { name: "Decentralized Voting", impact: "On-chain governance protocol", tech: ["Solidity", "Hardhat"] },
      { name: "Token Staking DeFi", impact: "Yield simulation with APY calc", tech: ["ERC-20", "Hardhat"] },
    ],
  },
  {
    id: "vision", icon: Terminal, index: "06",
    title: "Deep Learning", domain: "Computer Vision · Research",
    tagline: "CNN architectures and real-time inference for real-world image data.",
    problemSpace: "Not toy demos. Transfer learning on real datasets, object detection at 30FPS, model optimization for edge deployment without accuracy collapse.",
    architecturalPatterns: ["Transfer Learning", "Data Augmentation", "Model Compression", "Ensemble Methods", "Real-time Inference", "Active Learning"],
    engineeringFocus: ["CNN architecture design", "Transfer learning", "Augmentation pipelines", "Model pruning", "YOLO inference", "Edge deployment"],
    tradeoffs: [
      { decision: "Accuracy vs Speed", rationale: "MobileNet for edge devices, ResNet where accuracy is non-negotiable" },
      { decision: "Pretrained vs Scratch", rationale: "Transfer learning as default — scratch only for genuinely novel domains" },
      { decision: "Data Quantity vs Quality", rationale: "Quality annotations consistently beat raw quantity" },
      { decision: "GPU vs CPU Inference", rationale: "GPU for batch processing, CPU-optimized for real-time edge" },
    ],
    productionEvidence: { "CV Models": "4", "Training Images": "50k+", "Inference": "30 FPS", "Detection": "Real-time" },
    stack: ["PyTorch", "TensorFlow", "OpenCV", "YOLOv5", "ResNet", "MobileNet"],
    projects: [
      { name: "Face Mask Detector", impact: "Real-time webcam detection", tech: ["MobileNetV2", "OpenCV"] },
      { name: "Plant Disease Classifier", impact: "50k+ leaf image dataset", tech: ["CNN", "PyTorch"] },
      { name: "Object Counter Pipeline", impact: "Production YOLO deployment", tech: ["YOLOv5", "Python"] },
    ],
  },
];

const METRICS = [
  { value: "30+", label: "Production Systems", sub: "Deployed & maintained" },
  { value: "6", label: "Technical Domains", sub: "End-to-end ownership" },
  { value: "3000+", label: "End Users Reached", sub: "Real products, real impact" },
  { value: "99.9%", label: "Uptime Maintained", sub: "Multi-region AWS" },
];

const CROSS_DOMAIN = [
  { label: "Full Stack + AI", title: "ML-Backed SaaS", body: "Resume builder with AI scoring, fake news detector as a REST API — machine learning embedded in the product layer, not bolted on." },
  { label: "Cloud + Security", title: "Secure Infrastructure", body: "Zero-trust deployment pipelines, encrypted secrets management, security baked into infrastructure-as-code from day one." },
  { label: "Blockchain + Full Stack", title: "Decentralised Applications", body: "NFT minting platform bridging Web2 UX patterns with Web3 wallet flows — no wallet confusion, no broken handoffs." },
  { label: "AI + Cloud", title: "Model Deployment at Scale", body: "Containerised inference APIs with MLflow versioning, auto-scaling, and model monitoring. Not just a notebook — a system." },
];

const PHILOSOPHY = [
  { number: "I", principle: "Build for clarity before scale", detail: "Premature optimisation is the root of all evil. Start simple. Measure the real bottleneck. Then and only then, optimise it." },
  { number: "II", principle: "Secure by default", detail: "Security is not a feature you add in the last sprint. It is a foundation every architectural decision is laid upon." },
  { number: "III", principle: "Measure everything", detail: "Gut feelings about performance are almost always wrong. Instrumentation turns opinions into actionable decisions." },
  { number: "IV", principle: "Profile before optimising", detail: "Guessing where the bottleneck lives wastes engineering cycles. Profile first. Fix exactly what hurts, nothing else." },
];

/* ═══════════════════════════════════════════════════════════════
   MAGNETIC CURSOR
═══════════════════════════════════════════════════════════════ */
function MagneticCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const pos = useRef({ x: -100, y: -100 });
  const ring = useRef({ x: -100, y: -100 });
  const [isLink, setIsLink] = useState(false);
  const rafRef = useRef(null);

  useEffect(() => {
    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      const el = document.elementFromPoint(e.clientX, e.clientY);
      setIsLink(!!(el && (el.closest("a") || el.closest("button") || el.closest("[data-cursor]"))));
      if (dotRef.current) {
        dotRef.current.style.left = e.clientX + "px";
        dotRef.current.style.top = e.clientY + "px";
      }
    };
    const animate = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.11;
      ring.current.y += (pos.current.y - ring.current.y) * 0.11;
      if (ringRef.current) {
        ringRef.current.style.left = ring.current.x + "px";
        ringRef.current.style.top = ring.current.y + "px";
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    window.addEventListener("mousemove", onMove);
    rafRef.current = requestAnimationFrame(animate);
    return () => { window.removeEventListener("mousemove", onMove); cancelAnimationFrame(rafRef.current); };
  }, []);

  return (
    <>
      <div ref={dotRef} style={{
        position: "fixed", pointerEvents: "none", zIndex: 99999,
        width: isLink ? "8px" : "5px", height: isLink ? "8px" : "5px",
        borderRadius: "50%", background: isLink ? T.blue : T.ink,
        transform: "translate(-50%,-50%)",
        transition: "width 0.2s, height 0.2s, background 0.2s",
      }} />
      <div ref={ringRef} style={{
        position: "fixed", pointerEvents: "none", zIndex: 99998,
        width: isLink ? "48px" : "30px", height: isLink ? "48px" : "30px",
        borderRadius: "50%",
        border: `1.5px solid ${isLink ? T.blue : "rgba(60,60,60,0.45)"}`,
        transform: "translate(-50%,-50%)",
        transition: "width 0.35s cubic-bezier(0.16,1,0.3,1), height 0.35s cubic-bezier(0.16,1,0.3,1), border-color 0.25s",
      }} />
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SCROLL PROGRESS
═══════════════════════════════════════════════════════════════ */
function ScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const h = () => {
      const t = document.documentElement.scrollHeight - window.innerHeight;
      setP(t > 0 ? (window.scrollY / t) * 100 : 0);
    };
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);
  return (
    <div style={{ position: "fixed", top: 0, left: 0, right: 0, height: "2px", zIndex: 9900 }}>
      <div style={{ height: "100%", width: p + "%", background: T.blue, transition: "width 0.08s linear" }} />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SPLIT TEXT WORD REVEAL
═══════════════════════════════════════════════════════════════ */
function SplitReveal({ text, tag = "div", style = {}, delay = 0, stagger = 0.045 }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);
  const words = text.split(" ");
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  const Tag = tag;
  return (
    <Tag ref={ref} style={{ ...style }}>
      {words.map((word, i) => (
        <span key={i} style={{ display: "inline-block", overflow: "hidden", marginRight: "0.27em", verticalAlign: "bottom" }}>
          <span style={{
            display: "inline-block",
            transform: visible ? "translateY(0)" : "translateY(110%)",
            opacity: visible ? 1 : 0,
            transition: `transform 0.8s cubic-bezier(0.16,1,0.3,1) ${delay + i * stagger}s, opacity 0.5s ease ${delay + i * stagger}s`,
          }}>{word}</span>
        </span>
      ))}
    </Tag>
  );
}

/* ═══════════════════════════════════════════════════════════════
   ANIMATED COUNTER
═══════════════════════════════════════════════════════════════ */
function Counter({ raw }) {
  const [count, setCount] = useState(0);
  const [fired, setFired] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !fired) {
        setFired(true);
        const num = parseFloat(raw.replace(/[^0-9.]/g, "")) || 0;
        const dur = 1800;
        const start = Date.now();
        const tick = () => {
          const prog = Math.min((Date.now() - start) / dur, 1);
          const eased = prog < 0.5 ? 4 * prog * prog * prog : 1 - Math.pow(-2 * prog + 2, 3) / 2;
          setCount(Math.floor(num * eased));
          if (prog < 1) requestAnimationFrame(tick); else setCount(num);
        };
        tick();
      }
    }, { threshold: 0.4 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [raw, fired]);

  const suffix = raw.includes("%") ? "%" : raw.includes("+") ? "+" : "";
  return <span ref={ref}>{count}{suffix}</span>;
}

/* ═══════════════════════════════════════════════════════════════
   FADE UP
═══════════════════════════════════════════════════════════════ */
function FadeUp({ children, delay = 0, style = {} }) {
  const [v, setV] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold: 0.08 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{
      ...style,
      opacity: v ? 1 : 0,
      transform: v ? "translateY(0)" : "translateY(28px)",
      transition: `opacity 0.75s ease ${delay}s, transform 0.75s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
    }}>{children}</div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MARQUEE STRIP
═══════════════════════════════════════════════════════════════ */
function MarqueeStrip() {
  const items = ["Full-Stack Engineering", "Machine Learning", "Cloud Architecture", "Security Engineering", "Blockchain", "Computer Vision", "Production Systems", "System Design", "API Architecture", "DevOps"];
  const doubled = [...items, ...items];
  return (
    <div style={{ overflow: "hidden", borderTop: `1px solid ${T.ink10}`, borderBottom: `1px solid ${T.ink10}`, padding: "18px 0", background: T.ink02 }}>
      <div style={{ display: "flex", animation: "marquee 32s linear infinite", width: "max-content" }}>
        {doubled.map((item, i) => (
          <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: "28px", padding: "0 36px", fontFamily: "'DM Mono', monospace", fontSize: "11px", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: i % 4 === 0 ? T.blue : T.ink40, whiteSpace: "nowrap" }}>
            {item}<span style={{ fontSize: "5px", color: T.ink20 }}>◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   DETAIL PANEL
═══════════════════════════════════════════════════════════════ */
function DetailPanel({ cap, onClose }) {
  const [visible, setVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const Icon = cap.icon;
  const tabs = ["overview", "tradeoffs", "projects"];

  useEffect(() => {
    const raf = requestAnimationFrame(() => setVisible(true));
    const esc = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", esc);
    document.body.style.overflow = "hidden";
    return () => { cancelAnimationFrame(raf); document.removeEventListener("keydown", esc); document.body.style.overflow = ""; };
  }, [onClose]);

  const PanelSec = ({ label, Icon: SI, children }) => (
    <div style={{ paddingTop: "32px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "20px" }}>
        {SI && <SI size={12} style={{ color: T.ink40 }} />}
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: T.ink40 }}>{label}</span>
      </div>
      {children}
    </div>
  );

  return (
    <div onClick={onClose} style={{
      position: "fixed", inset: 0, zIndex: 9000,
      background: "rgba(8,8,8,0.5)", backdropFilter: "blur(8px) saturate(0.7)",
      opacity: visible ? 1 : 0, transition: "opacity 0.3s ease-out",
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        position: "fixed", top: 0, right: 0, bottom: 0,
        width: "min(660px, 100vw)", background: T.white,
        display: "flex", flexDirection: "column",
        transform: visible ? "translateX(0)" : "translateX(56px)",
        opacity: visible ? 1 : 0,
        transition: "transform 0.45s cubic-bezier(0.16,1,0.3,1), opacity 0.3s ease-out",
        boxShadow: "-48px 0 128px rgba(0,0,0,0.14)",
        overflowY: "auto",
      }}>
        <div style={{ height: "3px", background: `linear-gradient(90deg, ${T.blue} 0%, transparent 55%)`, flexShrink: 0 }} />

        {/* Header */}
        <div style={{ position: "sticky", top: 0, zIndex: 10, background: "rgba(255,255,255,0.96)", backdropFilter: "blur(12px)", padding: "28px 40px", borderBottom: `1px solid ${T.ink10}`, display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div style={{ width: "44px", height: "44px", borderRadius: "12px", background: T.ink05, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Icon size={22} style={{ color: T.ink80 }} />
            </div>
            <div>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px", color: T.ink40, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "4px" }}>{cap.domain}</div>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "22px", fontWeight: 600, color: T.ink, lineHeight: 1.15 }}>{cap.title}</div>
            </div>
          </div>
          <button onClick={onClose} data-cursor style={{ width: "36px", height: "36px", border: `1px solid ${T.ink10}`, borderRadius: "8px", background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: T.ink60, transition: "all 0.15s ease-out" }}
            onMouseEnter={e => { e.currentTarget.style.background = T.ink05; e.currentTarget.style.borderColor = T.ink20; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = T.ink10; }}>
            <X size={16} />
          </button>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", padding: "0 40px", borderBottom: `1px solid ${T.ink10}`, flexShrink: 0 }}>
          {tabs.map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} data-cursor style={{ padding: "16px 20px 13px", background: "transparent", border: "none", borderBottom: `2px solid ${activeTab === tab ? T.ink : "transparent"}`, cursor: "pointer", fontFamily: "'DM Mono', monospace", fontSize: "11px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: activeTab === tab ? T.ink : T.ink40, transition: "all 0.18s ease-out" }}>
              {tab}
            </button>
          ))}
        </div>

        {/* Body */}
        <div style={{ padding: "40px", display: "flex", flexDirection: "column", gap: 0 }}>
          {/* Meta chips */}
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "32px" }}>
            {[["Depth", cap.depth], ["Since", cap.since], ["Maturity", cap.maturity]].map(([k, v]) => (
              <div key={k} style={{ padding: "8px 16px", background: T.ink02, borderRadius: "100px", display: "flex", gap: "8px", alignItems: "center" }}>
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px", color: T.ink40, letterSpacing: "0.08em" }}>{k}</span>
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px", fontWeight: 700, color: T.ink80 }}>{v}</span>
              </div>
            ))}
          </div>

          {activeTab === "overview" && (
            <div style={{ animation: "panelIn 0.3s ease-out" }}>
              <PanelSec label="Problem Space" Icon={Box}>
                <p style={{ fontSize: "17px", fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", color: T.ink60, lineHeight: 1.8, paddingLeft: "20px", borderLeft: `2px solid ${T.ink10}` }}>{cap.problemSpace}</p>
              </PanelSec>
              <PanelSec label="Architectural Patterns" Icon={Layers}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                  {cap.architecturalPatterns.map(p => (
                    <div key={p} style={{ padding: "12px 14px", borderRadius: "8px", fontSize: "14px", color: T.ink60, background: T.ink02, cursor: "default", transition: "all 0.15s" }}
                      onMouseEnter={e => { e.currentTarget.style.background = T.blueMid; e.currentTarget.style.color = T.blue; }}
                      onMouseLeave={e => { e.currentTarget.style.background = T.ink02; e.currentTarget.style.color = T.ink60; }}>
                      {p}
                    </div>
                  ))}
                </div>
              </PanelSec>
              <PanelSec label="Production Evidence" Icon={CheckCircle2}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "10px" }}>
                  {Object.entries(cap.productionEvidence).map(([k, v]) => (
                    <div key={k} style={{ padding: "20px", background: T.blueSubtle, borderRadius: "10px" }}>
                      <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px", color: T.ink40, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "8px" }}>{k}</div>
                      <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "28px", fontWeight: 600, color: T.blue, lineHeight: 1 }}>{v}</div>
                    </div>
                  ))}
                </div>
              </PanelSec>
              <PanelSec label="Tech Stack">
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {cap.stack.map(s => (
                    <span key={s} style={{ padding: "6px 14px", background: T.ink05, borderRadius: "6px", fontFamily: "'DM Mono', monospace", fontSize: "12px", color: T.ink60 }}>{s}</span>
                  ))}
                </div>
              </PanelSec>
            </div>
          )}

          {activeTab === "tradeoffs" && (
            <div style={{ animation: "panelIn 0.3s ease-out" }}>
              {cap.tradeoffs.map((t, i) => (
                <div key={i} style={{ padding: "24px 0", borderBottom: `1px solid ${T.ink10}`, animation: `panelIn 0.4s ease-out ${i * 0.07}s both` }}>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "21px", fontWeight: 600, color: T.ink, marginBottom: "10px", lineHeight: 1.2 }}>{t.decision}</div>
                  <div style={{ fontSize: "15px", color: T.ink60, lineHeight: 1.7 }}>{t.rationale}</div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "projects" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "14px", animation: "panelIn 0.3s ease-out" }}>
              {cap.projects.map((proj, i) => (
                <div key={i} style={{ padding: "24px", borderRadius: "12px", background: T.ink02, transition: "transform 0.2s ease-out, background 0.2s", cursor: "default", animation: `panelIn 0.4s ease-out ${i * 0.08}s both` }}
                  onMouseEnter={e => { e.currentTarget.style.background = T.ink05; e.currentTarget.style.transform = "translateX(6px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = T.ink02; e.currentTarget.style.transform = "translateX(0)"; }}>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "22px", fontWeight: 600, color: T.ink, marginBottom: "6px" }}>{proj.name}</div>
                  <div style={{ fontSize: "14px", color: T.ink60, marginBottom: "16px", lineHeight: 1.6 }}>{proj.impact}</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                    {proj.tech.map(tech => (
                      <span key={tech} style={{ padding: "3px 10px", background: T.white, border: `1px solid ${T.ink10}`, borderRadius: "4px", fontFamily: "'DM Mono', monospace", fontSize: "11px", color: T.ink60 }}>{tech}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div style={{ marginTop: "40px", paddingTop: "32px", borderTop: `1px solid ${T.ink10}` }}>
            <a href="https://github.com/bhagavan444" target="_blank" rel="noopener noreferrer" data-cursor style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", padding: "14px 24px", border: `1px solid ${T.ink10}`, borderRadius: "10px", color: T.ink60, textDecoration: "none", fontFamily: "'DM Mono', monospace", fontSize: "12px", fontWeight: 700, letterSpacing: "0.1em", background: T.white, transition: "all 0.18s ease-out" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = T.ink; e.currentTarget.style.color = T.ink; e.currentTarget.style.background = T.ink02; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = T.ink10; e.currentTarget.style.color = T.ink60; e.currentTarget.style.background = T.white; }}>
              <Github size={16} /> VIEW ON GITHUB <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   CAPABILITY ROW
═══════════════════════════════════════════════════════════════ */
function CapabilityRow({ cap, index, onClick }) {
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);
  const Icon = cap.icon;

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.08 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} onClick={() => onClick(cap)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      data-cursor
      style={{
        display: "grid", gridTemplateColumns: "72px 1fr auto",
        alignItems: "center", gap: "40px",
        padding: "36px 0", borderBottom: `1px solid ${T.ink10}`,
        cursor: "pointer", position: "relative",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateX(0)" : "translateX(-24px)",
        transition: `opacity 0.55s ease ${index * 0.07}s, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${index * 0.07}s`,
      }}>
      {/* Index + icon */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "10px" }}>
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px", color: T.ink20, letterSpacing: "0.05em" }}>{cap.index}</span>
        <div style={{ width: "46px", height: "46px", borderRadius: "12px", background: hovered ? T.ink : T.ink05, display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.25s ease-out, transform 0.25s ease-out", transform: hovered ? "scale(1.08) rotate(-4deg)" : "scale(1) rotate(0deg)" }}>
          <Icon size={20} style={{ color: hovered ? T.white : T.ink60, transition: "color 0.2s" }} />
        </div>
      </div>

      {/* Content */}
      <div>
        <div style={{ display: "flex", alignItems: "baseline", gap: "16px", marginBottom: "8px", flexWrap: "wrap" }}>
          <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(22px, 3vw, 34px)", fontWeight: 600, color: T.ink, lineHeight: 1.1, letterSpacing: "-0.01em" }}>{cap.title}</h3>
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "12px", color: T.ink40 }}>{cap.domain}</span>
        </div>
        <p style={{ fontSize: "15px", color: T.ink60, lineHeight: 1.65, maxWidth: "540px" }}>{cap.tagline}</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", maxHeight: hovered ? "48px" : "0", marginTop: hovered ? "16px" : "0", overflow: "hidden", opacity: hovered ? 1 : 0, transition: "max-height 0.35s cubic-bezier(0.16,1,0.3,1), margin-top 0.3s ease, opacity 0.2s ease" }}>
          {cap.stack.slice(0, 5).map(s => (
            <span key={s} style={{ padding: "4px 12px", background: T.ink05, border: `1px solid ${T.ink10}`, borderRadius: "4px", fontFamily: "'DM Mono', monospace", fontSize: "11px", color: T.ink60 }}>{s}</span>
          ))}
        </div>
      </div>

      {/* Right */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "10px", flexShrink: 0 }}>
        <span style={{ padding: "5px 14px", borderRadius: "100px", background: hovered ? T.ink : T.ink05, fontFamily: "'DM Mono', monospace", fontSize: "10px", color: hovered ? T.white : T.ink60, letterSpacing: "0.07em", transition: "all 0.22s ease-out" }}>{cap.depth}</span>
        <div style={{ display: "flex", alignItems: "center", gap: "5px", fontFamily: "'DM Mono', monospace", fontSize: "11px", fontWeight: 700, color: hovered ? T.blue : T.ink20, transition: "color 0.2s ease-out" }}>
          OPEN
          <ArrowUpRight size={14} style={{ transform: hovered ? "translate(3px,-3px)" : "none", transition: "transform 0.25s cubic-bezier(0.16,1,0.3,1)" }} />
        </div>
      </div>

      {/* Animated underline sweep */}
      <div style={{ position: "absolute", bottom: "-1px", left: 0, height: "1px", background: T.ink, width: hovered ? "100%" : "0%", transition: "width 0.45s cubic-bezier(0.16,1,0.3,1)" }} />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   CROSS CARD
═══════════════════════════════════════════════════════════════ */
function CrossCard({ item, index }) {
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} style={{ padding: "32px 28px", background: hovered ? T.white : T.ink02, border: `1px solid ${hovered ? T.ink10 : "transparent"}`, borderRadius: "14px", cursor: "default", boxShadow: hovered ? "0 8px 40px rgba(0,0,0,0.06)" : "none", opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(24px)", transition: `all 0.4s ease ${index * 0.09}s` }}>
      <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px", color: T.blue, letterSpacing: "0.14em", fontWeight: 700, marginBottom: "14px", textTransform: "uppercase" }}>{item.label}</div>
      <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "26px", fontWeight: 600, color: T.ink, lineHeight: 1.25, letterSpacing: "-0.01em", marginBottom: "16px" }}>{item.title}</h3>
      <p style={{ fontSize: "15px", color: T.ink40, lineHeight: 1.75 }}>{item.body}</p>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PHILOSOPHY CARD
═══════════════════════════════════════════════════════════════ */
function PhiloCard({ item, index }) {
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} style={{ padding: "32px", background: T.white, border: `1px solid ${hovered ? T.ink20 : T.ink10}`, borderRadius: "14px", opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(24px)", transition: `opacity 0.55s ease ${index * 0.1}s, transform 0.55s cubic-bezier(0.16,1,0.3,1) ${index * 0.1}s, border-color 0.2s` }}>
      <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "56px", fontWeight: 400, color: hovered ? T.blue : T.ink10, lineHeight: 1, marginBottom: "20px", userSelect: "none", transition: "color 0.3s ease-out" }}>{item.number}</div>
      <h3 style={{ fontSize: "18px", fontWeight: 600, color: T.ink80, lineHeight: 1.4, marginBottom: "12px" }}>{item.principle}</h3>
      <p style={{ fontSize: "15px", color: T.ink40, lineHeight: 1.75 }}>{item.detail}</p>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   CTA BUTTON
═══════════════════════════════════════════════════════════════ */
function CTABtn({ href, primary, icon, label }) {
  const [h, setH] = useState(false);
  return (
    <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} data-cursor
      style={{ display: "inline-flex", alignItems: "center", gap: "9px", padding: "13px 26px", background: primary ? (h ? T.ink60 : T.ink) : T.white, border: primary ? "none" : `1px solid ${h ? T.ink40 : T.ink10}`, borderRadius: "9px", fontSize: "12px", fontWeight: 700, letterSpacing: "0.1em", color: primary ? T.white : (h ? T.ink : T.ink60), textDecoration: "none", fontFamily: "'DM Mono', monospace", transition: "all 0.18s ease-out", transform: h ? "translateY(-2px)" : "none", boxShadow: primary && h ? "0 8px 32px rgba(0,0,0,0.22)" : "none" }}>
      {icon}{label}
    </a>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN
═══════════════════════════════════════════════════════════════ */
export default function Workshops() {
  const [activeCapability, setActiveCapability] = useState(null);
  const [heroReady, setHeroReady] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHeroReady(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=DM+Mono:wght@400;500;600&family=Geist:wght@300;400;500;600&display=swap');

        *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body {
          font-family: 'Geist', system-ui, sans-serif;
          background: ${T.bg};
          color: ${T.ink};
          -webkit-font-smoothing: antialiased;
          cursor: none;
        }
        ::selection { background: ${T.blueMid}; color: ${T.ink}; }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: ${T.ink10}; border-radius: 2px; }

        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes panelIn {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes lineExpand {
          from { width: 0; }
          to   { width: 100%; }
        }

        @media (max-width: 800px) {
          body { cursor: auto; }
        }
      `}</style>

      <MagneticCursor />
      <ScrollProgress />

      <div style={{ maxWidth: "1120px", margin: "0 auto", padding: "0 clamp(24px, 5vw, 60px)" }}>

        {/* ═══ HERO ═══ */}
        <header style={{ padding: "clamp(100px, 14vw, 160px) 0 clamp(80px, 10vw, 120px)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "48px", opacity: heroReady ? 1 : 0, transform: heroReady ? "none" : "translateY(14px)", transition: "opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s" }}>
            <div style={{ width: "32px", height: "1px", background: T.blue }} />
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: T.blue }}>Technical Depth — System-Level Thinking</span>
          </div>

          <div style={{ marginBottom: "28px" }}>
            <SplitReveal text="Engineering" tag="div" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(60px, 11vw, 120px)", fontWeight: 600, color: T.ink, lineHeight: 0.92, letterSpacing: "-0.04em" }} delay={0.18} />
            <SplitReveal text="Capabilities" tag="div" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(60px, 11vw, 120px)", fontWeight: 600, color: "transparent", WebkitTextStroke: `1.5px ${T.ink20}`, lineHeight: 0.92, letterSpacing: "-0.04em" }} delay={0.26} />
          </div>

          <div style={{ height: "1px", background: T.ink, animation: heroReady ? "lineExpand 1s cubic-bezier(0.16,1,0.3,1) 0.7s both" : "none", marginBottom: "40px" }} />

          <FadeUp delay={0.85}>
            <p style={{ fontSize: "clamp(16px, 2vw, 20px)", color: T.ink40, lineHeight: 1.75, maxWidth: "580px" }}>
              Production systems across Full Stack, AI/ML, Cloud, and Security —
              built, deployed, and maintained in real environments. Not demos.
            </p>
          </FadeUp>
        </header>
      </div>

      <MarqueeStrip />

      <div style={{ maxWidth: "1120px", margin: "0 auto", padding: "0 clamp(24px, 5vw, 60px)" }}>

        {/* ═══ METRICS ═══ */}
        <section style={{ padding: "96px 0", borderBottom: `1px solid ${T.ink10}` }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 0, borderLeft: `1px solid ${T.ink10}` }}>
            {METRICS.map((m, i) => (
              <FadeUp key={i} delay={i * 0.1} style={{ padding: "0 clamp(24px, 4vw, 48px) 0 clamp(20px, 3vw, 40px)", borderRight: `1px solid ${T.ink10}` }}>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(36px, 5vw, 68px)", fontWeight: 600, color: T.ink, lineHeight: 1, letterSpacing: "-0.04em", marginBottom: "12px" }}>
                  <Counter raw={m.value} />
                </div>
                <div style={{ fontSize: "15px", fontWeight: 600, color: T.ink80, marginBottom: "4px" }}>{m.label}</div>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px", color: T.ink40, letterSpacing: "0.05em" }}>{m.sub}</div>
              </FadeUp>
            ))}
          </div>
        </section>

        {/* ═══ CAPABILITIES ═══ */}
        <section style={{ padding: "96px 0" }}>
          <FadeUp style={{ marginBottom: "64px" }}>
            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "24px" }}>
              <div>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: T.ink40, marginBottom: "14px" }}>Engineering Capability Matrix</div>
                <SplitReveal text="Domain Architecture" tag="h2" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(30px, 4vw, 52px)", fontWeight: 600, color: T.ink, letterSpacing: "-0.03em", lineHeight: 1.05 }} delay={0.05} stagger={0.05} />
              </div>
              <p style={{ fontSize: "15px", color: T.ink40, lineHeight: 1.75, maxWidth: "340px" }}>Click any row for architectural decisions, trade-offs, and production evidence.</p>
            </div>
          </FadeUp>
          <div style={{ borderTop: `1px solid ${T.ink10}` }}>
            {CAPABILITIES.map((cap, i) => <CapabilityRow key={cap.id} cap={cap} index={i} onClick={setActiveCapability} />)}
          </div>
        </section>

        {/* ═══ CROSS-DOMAIN ═══ */}
        <section style={{ padding: "96px 0", borderTop: `1px solid ${T.ink10}` }}>
          <FadeUp style={{ marginBottom: "64px" }}>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: T.ink40, marginBottom: "14px" }}>Systems Thinking</div>
            <SplitReveal text="Cross-Domain Engineering" tag="h2" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(30px, 4vw, 52px)", fontWeight: 600, color: T.ink, letterSpacing: "-0.03em", lineHeight: 1.05, marginBottom: "20px" }} delay={0.05} stagger={0.04} />
            <p style={{ fontSize: "15px", color: T.ink40, lineHeight: 1.75, maxWidth: "500px" }}>Real problems don't fit single domains. These integrations show how capabilities combine.</p>
          </FadeUp>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "16px" }}>
            {CROSS_DOMAIN.map((item, i) => <CrossCard key={i} item={item} index={i} />)}
          </div>
        </section>

        {/* ═══ PHILOSOPHY ═══ */}
        <section style={{ padding: "96px 0", borderTop: `1px solid ${T.ink10}` }}>
          <FadeUp style={{ marginBottom: "64px" }}>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: T.ink40, marginBottom: "14px" }}>Engineering Mindset</div>
            <SplitReveal text="How I Approach Systems" tag="h2" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(30px, 4vw, 52px)", fontWeight: 600, color: T.ink, letterSpacing: "-0.03em", lineHeight: 1.05, marginBottom: "20px" }} delay={0.05} stagger={0.04} />
            <p style={{ fontSize: "15px", color: T.ink40, lineHeight: 1.75, maxWidth: "440px" }}>Principles that guide every technical decision, trade-off, and system design choice.</p>
          </FadeUp>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "16px" }}>
            {PHILOSOPHY.map((item, i) => <PhiloCard key={i} item={item} index={i} />)}
          </div>
        </section>

        {/* ═══ CTA ═══ */}
        <section style={{ padding: "96px 0 clamp(100px, 14vw, 160px)", borderTop: `1px solid ${T.ink10}` }}>
          <FadeUp>
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: "48px" }}>
              <div style={{ maxWidth: "560px" }}>
                <SplitReveal text="All implementations live on GitHub." tag="h2" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(30px, 5vw, 60px)", fontWeight: 600, color: T.ink, letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: "20px" }} delay={0.05} stagger={0.04} />
                <p style={{ fontSize: "17px", color: T.ink40, lineHeight: 1.75 }}>Source code, deployment configs, CI/CD pipelines, and production evidence. Not descriptions — implementations.</p>
              </div>
              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                <CTABtn href="https://github.com/bhagavan444" primary icon={<Github size={16} />} label="GITHUB" />
                <CTABtn href="mailto:g.sivasatyasaibhagavan@gmail.com" icon={<ArrowUpRight size={16} />} label="GET IN TOUCH" />
              </div>
            </div>
          </FadeUp>
        </section>
      </div>

      {activeCapability && <DetailPanel cap={activeCapability} onClose={() => setActiveCapability(null)} />}
    </>
  );
}