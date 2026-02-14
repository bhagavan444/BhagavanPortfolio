"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Trophy, Clock, Users, Terminal, Download, CheckCircle, ArrowRight, 
  Github, Zap, Server, Shield, Code, Database, ChevronRight, 
  Award, ExternalLink, X, TrendingUp, Target, Layers, GitBranch
} from "lucide-react";

export default function HackathonCaseStudy() {
  const [selectedPhase, setSelectedPhase] = useState(null);
  const [showCert, setShowCert] = useState(false);

  const certUrl = "images/Brainovision-certificate.jpg";

  // Typewriter effect component
  const TypewriterText = ({ text, delay = 0 }) => {
    const [displayText, setDisplayText] = useState('');
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
      if (!isVisible) return;

      let currentIndex = 0;
      const timer = setInterval(() => {
        if (currentIndex <= text.length) {
          setDisplayText(text.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(timer);
        }
      }, 30);

      return () => clearInterval(timer);
    }, [isVisible, text]);

    return (
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        onViewportEnter={() => setTimeout(() => setIsVisible(true), delay)}
        style={{ display: 'inline' }}
      >
        {displayText}
        {displayText.length < text.length && (
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.5, repeat: Infinity }}
            style={{ 
              display: 'inline-block',
              width: '2px',
              height: '1em',
              background: '#0066FF',
              marginLeft: '2px',
              verticalAlign: 'middle'
            }}
          />
        )}
      </motion.div>
    );
  };

  // Animated Counter Component
  const AnimatedCounter = ({ value, duration = 2000 }) => {
    const [count, setCount] = useState(0);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
      if (!isVisible) return;

      const numericValue = parseInt(value.replace(/\D/g, '')) || 0;
      const steps = 60;
      const increment = numericValue / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= numericValue) {
          setCount(numericValue);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }, [isVisible, value, duration]);

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        onViewportEnter={() => setIsVisible(true)}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        style={{
          fontFamily: "'Epilogue', sans-serif",
          fontSize: '48px',
          fontWeight: 700,
          color: '#0A0A0A',
          lineHeight: 1,
          marginBottom: '8px',
          letterSpacing: '-0.02em'
        }}
      >
        {value.includes('+') ? `${count}+` : 
         value.includes('ms') ? `${count}ms` :
         value === 'Real-time' ? value : count}
      </motion.div>
    );
  };

  const executionPhases = [
    {
      id: 1,
      time: "0-6h",
      title: "Foundation & Core Models",
      subtitle: "Data modeling and authentication architecture",
      description: "Designed database schemas for users, listings, bids, and transactions. Implemented authentication with JWT and OAuth 2.0. Established Docker deployment pipeline.",
      
      decision: "Chose MongoDB over PostgreSQL for product listings",
      risk: "NoSQL consistency issues for financial transactions (bids, payments)",
      rationale: "Electronics products have highly variable attributes (laptops vs phones vs cameras). MongoDB's flexible schema eliminates migration overhead. Critical financial operations use transactions.",
      tradeoff: "Used MongoDB transactions for bid operations, accepting 2x slower writes for data integrity",
      
      myOwnership: [
        "Designed normalized data models: User, Product, Bid, Transaction, Notification",
        "Implemented compound indexes for listing queries (category + condition + price)",
        "Built JWT authentication with access/refresh token rotation",
        "Integrated OAuth 2.0 for Google/GitHub (trust signal for sellers)",
        "Set up MongoDB Atlas with replica set for high availability",
        "Configured Docker multi-stage builds for production deployment"
      ],
      
      technicalDecisions: [
        "MongoDB transactions for bid operations - ACID guarantees where needed",
        "Separate collections vs embedded documents - optimized for query patterns",
        "JWT in httpOnly cookies - XSS protection without local storage",
        "Docker layer caching - 60% faster CI builds"
      ],
      
      technologies: ["Node.js", "Express", "MongoDB", "Mongoose", "JWT", "OAuth 2.0", "Docker"],
      color: "#0066FF"
    },
    {
      id: 2,
      time: "6-12h",
      title: "Listing & Search APIs",
      subtitle: "Product catalog and discovery engine",
      description: "Built comprehensive APIs for creating listings, uploading images, searching products, and filtering by multiple criteria. Implemented image upload to S3 with CDN delivery.",
      
      decision: "MongoDB text indexes instead of Elasticsearch",
      risk: "Limited search relevance and performance at scale",
      rationale: "For 24h MVP with <10k listings, MongoDB full-text search sufficient. Elasticsearch adds operational complexity (separate cluster, sync logic).",
      tradeoff: "Search features limited to exact/prefix matching. No fuzzy search or advanced relevance tuning.",
      
      myOwnership: [
        "Designed REST API: POST /listings, GET /listings/search, PATCH /listings/:id",
        "Implemented S3 pre-signed URLs for direct client-to-S3 uploads",
        "Built image validation (format, size, dimensions) with Sharp.js",
        "Created text indexes on product title, description, brand, category",
        "Designed aggregation pipeline for faceted search (brand counts, price ranges)",
        "Implemented pagination with cursor-based approach for consistency"
      ],
      
      technicalDecisions: [
        "S3 pre-signed URLs - reduced backend bandwidth by 80%",
        "Cursor pagination over offset - prevents duplicate results during real-time updates",
        "Joi schema validation - caught malformed uploads before S3",
        "CloudFront CDN - 200ms → 50ms image load time globally"
      ],
      
      technologies: ["Express.js", "Multer", "Sharp", "AWS S3", "CloudFront", "MongoDB Aggregation"],
      color: "#0066FF"
    },
    {
      id: 3,
      time: "12-18h",
      title: "Real-time Bidding System",
      subtitle: "WebSocket architecture for live auctions",
      description: "Architected WebSocket server for real-time bid updates. Implemented Redis pub/sub for horizontal scaling. Built bid validation logic with conflict resolution.",
      
      decision: "Socket.io with Redis adapter for multi-server scaling",
      risk: "WebSocket connection management and state synchronization",
      rationale: "Auction updates must reach all connected clients <100ms. Redis pub/sub enables multiple WebSocket servers to share state.",
      tradeoff: "Added Redis dependency and complexity. Alternative (HTTP polling) would have 5x higher latency.",
      
      myOwnership: [
        "Architected Socket.io server with Redis adapter for pub/sub",
        "Implemented bid validation: minimum increment, auction end time, user authorization",
        "Built optimistic locking: version counters prevent concurrent bid conflicts",
        "Designed event schema: 'bid:placed', 'auction:ending', 'auction:ended'",
        "Created auto-bid system: users set max price, server bids automatically",
        "Implemented connection recovery: reconnect with last known state"
      ],
      
      technicalDecisions: [
        "Redis pub/sub over RabbitMQ - simpler ops, sufficient for real-time updates",
        "Optimistic locking with version counters - prevents race conditions",
        "Socket.io rooms per listing - efficient message broadcasting",
        "JWT in WebSocket handshake - reuse HTTP auth without separate mechanism"
      ],
      
      technologies: ["Socket.io", "Redis", "Redis Adapter", "MongoDB Transactions", "Event Emitters"],
      color: "#0066FF"
    },
    {
      id: 4,
      time: "18-24h",
      title: "Payments & Production Deploy",
      subtitle: "Stripe integration and AWS deployment",
      description: "Integrated Stripe Connect for escrow payments. Implemented webhook processing for payment events. Deployed to AWS EC2 with Nginx reverse proxy and SSL.",
      
      decision: "Stripe Connect with escrow vs direct marketplace",
      risk: "Webhook reliability and idempotency requirements",
      rationale: "Escrow protects buyers (funds held until delivery confirmed). Stripe handles PCI compliance. Platform fee model enables revenue.",
      tradeoff: "7-day escrow hold increases working capital requirements for sellers.",
      
      myOwnership: [
        "Integrated Stripe Connect: onboard sellers, create connected accounts",
        "Built escrow flow: authorize → capture (on delivery) → transfer to seller",
        "Implemented webhook handlers: payment_intent.succeeded, transfer.created",
        "Designed idempotency: database constraints prevent duplicate processing",
        "Deployed to AWS EC2 t3.medium with Docker Compose",
        "Configured Nginx reverse proxy with SSL/TLS via Let's Encrypt",
        "Set up PM2 for process management and auto-restart",
        "Implemented health check endpoint: /health with DB connectivity test"
      ],
      
      technicalDecisions: [
        "Stripe Connect Standard vs Express - Standard for full customization",
        "Webhook signature verification - prevents spoofed payment events",
        "Database transactions for payment state - ensures consistency",
        "EC2 over Lambda - WebSocket persistence required long-lived connections",
        "Let's Encrypt auto-renewal - zero manual SSL management"
      ],
      
      technologies: ["Stripe API", "Stripe Connect", "Webhooks", "AWS EC2", "Nginx", "PM2", "Let's Encrypt"],
      color: "#0066FF"
    }
  ];

  const architectureDecisions = [
    {
      category: "Database Strategy",
      decision: "MongoDB + Redis hybrid",
      reasoning: "MongoDB for flexible product schemas (electronics vary widely in specs). Redis for real-time bid state, session management, and pub/sub messaging.",
      impact: "3x faster development vs rigid SQL schema",
      challenge: "Handling concurrent bid conflicts",
      solution: "Optimistic locking with version counters"
    },
    {
      category: "Real-time Architecture",
      decision: "WebSocket with Redis pub/sub",
      reasoning: "Auction updates require sub-second latency. Redis pub/sub enables horizontal scaling across multiple WebSocket servers.",
      impact: "45ms average bid propagation time",
      challenge: "Connection state management at scale",
      solution: "Sticky sessions with Redis-backed adapter"
    },
    {
      category: "Payment Processing",
      decision: "Stripe Connect with escrow pattern",
      reasoning: "Stripe handles PCI compliance and split payments. Escrow protects both buyers and sellers from fraud.",
      impact: "Zero fraud incidents during demo",
      challenge: "Webhook reliability and idempotency",
      solution: "Event deduplication with database constraints"
    },
    {
      category: "Search Implementation",
      decision: "MongoDB text indexes over Elasticsearch",
      reasoning: "For MVP scope, MongoDB full-text search sufficient. Avoided operational complexity of separate search cluster.",
      impact: "Search latency <100ms on 10k listings",
      challenge: "Limited relevance tuning vs Elasticsearch",
      solution: "Manual scoring with aggregation pipeline"
    },
    {
      category: "File Storage",
      decision: "AWS S3 with CloudFront CDN",
      reasoning: "Product images require fast delivery globally. S3 provides durability, CloudFront reduces latency.",
      impact: "70% reduction in image load time",
      challenge: "Upload progress tracking",
      solution: "Pre-signed URLs with client-side progress"
    },
    {
      category: "Authentication Design",
      decision: "JWT + refresh token + OAuth 2.0",
      reasoning: "Stateless auth for horizontal scaling. OAuth for trust signals. Refresh tokens for security without UX friction.",
      impact: "Zero session storage overhead",
      challenge: "Token revocation for banned users",
      solution: "Short-lived access tokens with blacklist check"
    }
  ];

  const productionReadiness = {
    security: [
      {
        layer: "Authentication",
        implementation: "JWT access (15min) + refresh tokens (7 days)",
        detail: "HMAC-SHA256 signing with rotating secrets. OAuth 2.0 integration for seller trust signals."
      },
      {
        layer: "Payment Security",
        implementation: "Stripe PCI-compliant processing",
        detail: "No card data touches our servers. Webhook signature verification prevents spoofed events."
      },
      {
        layer: "Rate Limiting",
        implementation: "Token bucket algorithm via Redis",
        detail: "100 requests/min per user, 1000/min per IP. Prevents bid spam and DoS attacks."
      },
      {
        layer: "Input Validation",
        implementation: "Joi schema validation on all endpoints",
        detail: "Prevents NoSQL injection, XSS, and malformed bid/listing data. Server-side image validation."
      },
      {
        layer: "Transport Security",
        implementation: "TLS 1.3 with HSTS headers",
        detail: "Helmet.js enforces 12 security headers including CSP, X-Frame-Options, and HSTS."
      },
      {
        layer: "Transaction Integrity",
        implementation: "MongoDB transactions for bids",
        detail: "ACID guarantees for concurrent bid operations. Optimistic locking prevents race conditions."
      }
    ],
    performance: [
      { metric: "API Response Time", value: "85ms", detail: "p95 latency under load" },
      { metric: "Bid Propagation", value: "45ms", detail: "WebSocket update latency" },
      { metric: "Search Query", value: "120ms", detail: "Full-text search with filters" },
      { metric: "Image Load (CDN)", value: "180ms", detail: "Global CloudFront delivery" },
      { metric: "Concurrent Users", value: "500", detail: "Load tested capacity" },
      { metric: "Database Query", value: "12ms", detail: "Indexed listing queries" }
    ]
  };

  const engineeringLessons = [
    {
      lesson: "Real-time Systems Require Different Mental Models",
      insight: "Initial WebSocket implementation had race conditions in bid handling. MongoDB transactions solved concurrency but added 40ms latency. Final solution: optimistic locking with version counters achieved both correctness and speed.",
      takeaway: "Distributed state synchronization cannot be solved with REST thinking. Event-driven architectures require explicit conflict resolution strategies."
    },
    {
      lesson: "Payments Are More Than API Integration",
      insight: "First Stripe implementation worked in happy path but failed on network errors and webhook retries. Added idempotency keys, webhook signature verification, and database-level duplicate detection. Zero payment inconsistencies in production.",
      takeaway: "Financial transactions require paranoid defensive programming. Idempotency isn't optional—it's foundational."
    },
    {
      lesson: "Search Optimization Through Query Pattern Analysis",
      insight: "Initial MongoDB queries scanned entire collection (800ms). Analyzed access patterns: 90% of searches filter by category + condition. Added compound index, reduced to 12ms. Aggregation pipeline for facets added 100ms but enabled critical UX.",
      takeaway: "Index strategy should derive from measured query patterns, not assumptions. Sometimes slower complex queries enable better UX than fast simple ones."
    },
    {
      lesson: "MVP Scope Definition Determines Architecture",
      insight: "Debated Elasticsearch vs MongoDB text search for 2 hours. Chose MongoDB because MVP had <10k listings and 24h timeline. Post-hackathon: deployed to 50k listings, search still performant. Right call.",
      takeaway: "Architecture decisions should explicitly state their validity constraints. 'MongoDB text search works for <100k documents' is better than 'MongoDB is good enough.'"
    },
    {
      lesson: "Staging Deployments Catch Configuration Drift",
      insight: "Production deployment at hour 22 failed: Nginx misconfiguration blocked WebSocket upgrades. Staging deployment at hour 18 would have caught it. Lost 90 minutes debugging under pressure.",
      takeaway: "Staging environments aren't overhead—they're risk reduction. Deploy to staging before production, always."
    },
    {
      lesson: "Horizontal Scaling Requires Stateless Design",
      insight: "First WebSocket server stored connection state in memory. Adding second server broke bid updates—clients connected to different servers couldn't see each other's bids. Redis pub/sub solved it but required rearchitecting connection management.",
      takeaway: "Design for horizontal scaling from day one, even if you start with one server. Migrating stateful systems to stateless is painful."
    }
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Epilogue:wght@600;700;800&display=swap');
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          background: #FAFAFA;
          color: #0A0A0A;
          line-height: 1.6;
          -webkit-font-smoothing: antialiased;
        }
      `}</style>

      <div style={{ minHeight: '100vh', background: '#FAFAFA', position: 'relative', overflow: 'hidden' }}>
        
        {/* Floating Particles Background */}
        <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -30, 0],
                x: [0, Math.sin(i) * 20, 0],
                opacity: [0.1, 0.3, 0.1]
              }}
              transition={{
                duration: 3 + i * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.2
              }}
              style={{
                position: 'absolute',
                left: `${(i * 5) % 100}%`,
                top: `${(i * 7) % 100}%`,
                width: `${4 + (i % 3) * 2}px`,
                height: `${4 + (i % 3) * 2}px`,
                background: '#0066FF',
                borderRadius: '50%',
                opacity: 0.1
              }}
            />
          ))}
        </div>
        
        {/* Hero Section - Editorial */}
        <section style={{
          maxWidth: '920px',
          margin: '0 auto',
          padding: '120px 32px 96px',
          position: 'relative'
        }}>
          {/* Floating Animated Badge */}
          <motion.div
            animate={{
              y: [0, -10, 0],
              rotate: [0, 5, 0, -5, 0]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{
              position: 'absolute',
              top: '60px',
              right: '32px',
              padding: '12px 20px',
              background: 'linear-gradient(135deg, #FFFFFF 0%, #F9FAFB 100%)',
              border: '1px solid #E5E5E5',
              borderRadius: '100px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
              fontSize: '13px',
              fontWeight: 600,
              color: '#0066FF',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              zIndex: 10
            }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Trophy size={16} />
            </motion.div>
            Winner 2024
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <div style={{
              fontSize: '13px',
              fontWeight: 600,
              color: '#666666',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              marginBottom: '24px'
            }}>
              Case Study · 24-Hour Hackathon
            </div>

            <h1 style={{
              fontFamily: "'Epilogue', sans-serif",
              fontSize: 'clamp(40px, 6vw, 72px)',
              fontWeight: 700,
              color: '#0A0A0A',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              marginBottom: '32px',
              maxWidth: '820px'
            }}>
              Building a{' '}
              <motion.span
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{
                  background: 'linear-gradient(90deg, #0066FF 0%, #00C9FF 25%, #0066FF 50%, #00C9FF 75%, #0066FF 100%)',
                  backgroundSize: '200% auto',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  display: 'inline-block'
                }}
              >
                Scalable Electronics Marketplace
              </motion.span>{' '}
              in 24 Hours
            </h1>

            <p style={{
              fontSize: '20px',
              lineHeight: 1.6,
              color: '#404040',
              marginBottom: '24px',
              maxWidth: '680px'
            }}>
              Architected and deployed a production-ready peer-to-peer marketplace for second-hand electronics. 
              Led backend infrastructure, real-time bidding system, and payment integration under extreme time constraints.
            </p>

            <p style={{
              fontSize: '16px',
              lineHeight: 1.6,
              color: '#737373',
              marginBottom: '64px',
              maxWidth: '680px'
            }}>
              The platform enables users to buy and sell used electronics with live auctions, secure escrow payments, 
              seller verification, and automated quality grading. Built with production-grade security, horizontal scalability, 
              and sub-100ms API response times.
            </p>
          </motion.div>

          {/* Impact Metrics - Data Dashboard Style */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '1px',
              background: '#E5E5E5',
              border: '1px solid #E5E5E5',
              borderRadius: '8px',
              overflow: 'hidden',
              marginBottom: '80px'
            }}
          >
            {[
              { value: "25+", label: "API Endpoints", context: "Listings, bids, payments" },
              { value: "Real-time", label: "Bidding System", context: "WebSocket architecture" },
              { value: "500", label: "Concurrent Users", context: "Load tested capacity" },
              { value: "85ms", label: "API Response", context: "p95 latency" }
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.4 }}
                whileHover={{ 
                  y: -4,
                  boxShadow: '0 8px 16px rgba(0, 102, 255, 0.1)',
                  borderColor: '#0066FF'
                }}
                style={{
                  padding: '32px 24px',
                  background: '#FFFFFF',
                  textAlign: 'center',
                  transition: 'all 300ms ease',
                  cursor: 'pointer',
                  border: '1px solid transparent'
                }}
              >
                <AnimatedCounter value={stat.value} />
                <motion.div 
                  style={{
                    fontSize: '14px',
                    fontWeight: 600,
                    color: '#0A0A0A',
                    marginBottom: '4px'
                  }}
                >
                  {stat.label}
                </motion.div>
                <div style={{
                  fontSize: '13px',
                  color: '#737373'
                }}>
                  {stat.context}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Achievement Badge - Understated */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              padding: '16px 24px',
              background: '#FFFFFF',
              border: '1px solid #E5E5E5',
              borderRadius: '8px',
              fontSize: '14px',
              color: '#404040'
            }}
          >
            <Trophy size={18} style={{ color: '#737373' }} />
            <span>National Championship Winner — BrainoVision 2024</span>
            <button
              onClick={() => setShowCert(true)}
              style={{
                background: 'none',
                border: 'none',
                color: '#0066FF',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
                padding: 0,
                marginLeft: '8px'
              }}
            >
              View Certificate →
            </button>
          </motion.div>
        </section>

        {/* Certificate Section - Enhanced */}
        <section style={{
          maxWidth: '920px',
          margin: '0 auto',
          padding: '64px 32px'
        }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{
              background: 'linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%)',
              border: '1px solid #FDE68A',
              borderRadius: '12px',
              padding: '48px 40px',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {/* Animated corner accents */}
            <motion.div
              animate={{
                rotate: 360,
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{
                position: 'absolute',
                top: '-50px',
                right: '-50px',
                width: '150px',
                height: '150px',
                background: 'radial-gradient(circle, rgba(251, 191, 36, 0.2) 0%, transparent 70%)',
                borderRadius: '50%',
                pointerEvents: 'none'
              }}
            />

            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              marginBottom: '32px',
              position: 'relative',
              zIndex: 1
            }}>
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <Award size={32} style={{ color: '#F59E0B' }} />
              </motion.div>
              <h3 style={{
                fontFamily: "'Epilogue', sans-serif",
                fontSize: 'clamp(24px, 4vw, 32px)',
                fontWeight: 700,
                color: '#78350F'
              }}>
                National Winner Certificate
              </h3>
              <motion.div
                animate={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              >
                <Award size={32} style={{ color: '#F59E0B' }} />
              </motion.div>
            </div>

            <motion.div
              whileHover={{ scale: 1.02, y: -4 }}
              transition={{ duration: 0.3 }}
              onClick={() => setShowCert(true)}
              style={{
                cursor: 'pointer',
                borderRadius: '8px',
                overflow: 'hidden',
                border: '2px solid #F59E0B',
                marginBottom: '24px',
                boxShadow: '0 10px 30px rgba(245, 158, 11, 0.2)',
                position: 'relative',
                zIndex: 1
              }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <img 
                  src={certUrl} 
                  alt="Winner Certificate" 
                  style={{ 
                    width: '100%', 
                    display: 'block',
                    transition: 'all 300ms ease'
                  }} 
                />
              </motion.div>
              
              {/* Hover overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'rgba(0, 0, 0, 0.5)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF',
                  fontSize: '18px',
                  fontWeight: 600,
                  backdropFilter: 'blur(2px)'
                }}
              >
                Click to view full size
              </motion.div>
            </motion.div>

            <div style={{
              display: 'flex',
              gap: '16px',
              justifyContent: 'center',
              position: 'relative',
              zIndex: 1
            }}>
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowCert(true)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 24px',
                  background: '#FFFFFF',
                  border: '1px solid #F59E0B',
                  borderRadius: '8px',
                  color: '#F59E0B',
                  fontSize: '14px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px rgba(245, 158, 11, 0.15)',
                  transition: 'all 200ms ease'
                }}
              >
                <Award size={18} />
                View Full Certificate
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  const a = document.createElement('a');
                  a.href = certUrl;
                  a.download = 'BrainoVision_Certificate.jpg';
                  a.click();
                }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 24px',
                  background: '#F59E0B',
                  border: 'none',
                  borderRadius: '8px',
                  color: '#FFFFFF',
                  fontSize: '14px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(245, 158, 11, 0.3)',
                  transition: 'all 200ms ease'
                }}
              >
                <Download size={18} />
                Download Certificate
              </motion.button>
            </div>
          </motion.div>
        </section>

        {/* Product Overview - What We Built */}
        <section style={{
          maxWidth: '920px',
          margin: '0 auto',
          padding: '96px 32px',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Animated Background Element */}
          <motion.div
            animate={{
              rotate: [0, 360],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              position: 'absolute',
              top: '-100px',
              right: '-100px',
              width: '300px',
              height: '300px',
              background: 'radial-gradient(circle, rgba(0, 102, 255, 0.03) 0%, transparent 70%)',
              borderRadius: '50%',
              pointerEvents: 'none',
              zIndex: 0
            }}
          />

          <motion.div 
            style={{ position: 'relative', zIndex: 1 }}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div style={{ marginBottom: '56px' }}>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                style={{
                  fontFamily: "'Epilogue', sans-serif",
                  fontSize: '32px',
                  fontWeight: 700,
                  color: '#0A0A0A',
                  letterSpacing: '-0.01em',
                  marginBottom: '16px'
                }}
              >
                Product Overview
              </motion.h2>
              <p style={{
                fontSize: '18px',
                color: '#404040',
                lineHeight: 1.6,
                maxWidth: '600px'
              }}>
                A full-stack marketplace platform enabling trusted peer-to-peer electronics transactions
              </p>
            </div>
          </motion.div>

          {/* Core Features Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '1px',
            background: '#E5E5E5',
            border: '1px solid #E5E5E5',
            borderRadius: '8px',
            overflow: 'hidden',
            marginBottom: '48px'
          }}>
            {[
              {
                feature: "Live Auction System",
                description: "Real-time bidding with WebSocket updates, automatic bid increments, and countdown timers",
                technical: "Socket.io with Redis pub/sub for horizontal scaling"
              },
              {
                feature: "Secure Payment Flow",
                description: "Escrow-based payments with automated release, refund handling, and dispute resolution",
                technical: "Stripe integration with webhook event processing"
              },
              {
                feature: "Seller Verification",
                description: "Multi-tier seller badges based on transaction history, ratings, and identity verification",
                technical: "OAuth 2.0 with document verification API"
              },
              {
                feature: "Quality Grading System",
                description: "Standardized condition assessment with photo validation and AI-assisted grading",
                technical: "Custom classification logic with image analysis"
              },
              {
                feature: "Smart Search & Filters",
                description: "Full-text search with faceted filtering by brand, condition, price range, and location",
                technical: "MongoDB text indexes with aggregation pipeline"
              },
              {
                feature: "Notification Engine",
                description: "Multi-channel alerts for bids, outbid events, price drops, and listing updates",
                technical: "Event-driven architecture with queue processing"
              }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 4 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                style={{
                  padding: '32px',
                  background: '#FFFFFF'
                }}
              >
                <h3 style={{
                  fontSize: '16px',
                  fontWeight: 600,
                  color: '#0A0A0A',
                  marginBottom: '12px'
                }}>
                  {item.feature}
                </h3>
                <p style={{
                  fontSize: '14px',
                  color: '#404040',
                  lineHeight: 1.6,
                  marginBottom: '16px'
                }}>
                  {item.description}
                </p>
                <div style={{
                  fontSize: '13px',
                  color: '#737373',
                  fontFamily: 'monospace',
                  background: '#FAFAFA',
                  padding: '8px 12px',
                  borderRadius: '4px'
                }}>
                  {item.technical}
                </div>
              </motion.div>
            ))}
          </div>

          {/* User Flows */}
          <div>
            <h3 style={{
              fontSize: '18px',
              fontWeight: 600,
              color: '#0A0A0A',
              marginBottom: '24px'
            }}>
              Core User Flows
            </h3>

            <div style={{
              display: 'grid',
              gap: '24px'
            }}>
              {[
                {
                  flow: "Seller Flow",
                  steps: [
                    "Create listing with photos, specs, and condition grade",
                    "Set auction parameters (starting price, reserve, duration)",
                    "Receive real-time notifications on bids and questions",
                    "Accept winning bid and initiate escrow",
                    "Ship item with tracking integration",
                    "Receive payment after buyer confirmation"
                  ]
                },
                {
                  flow: "Buyer Flow",
                  steps: [
                    "Browse listings with advanced filters and search",
                    "View detailed product specs, seller ratings, and photos",
                    "Place bid or make instant purchase offer",
                    "Complete secure checkout with escrow protection",
                    "Track shipment and delivery status",
                    "Confirm receipt or initiate dispute resolution"
                  ]
                }
              ].map((userFlow, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: '24px',
                    background: '#FAFAFA',
                    borderRadius: '8px'
                  }}
                >
                  <div style={{
                    fontSize: '14px',
                    fontWeight: 600,
                    color: '#0A0A0A',
                    marginBottom: '16px'
                  }}>
                    {userFlow.flow}
                  </div>
                  <div style={{
                    display: 'grid',
                    gap: '8px'
                  }}>
                    {userFlow.steps.map((step, stepIdx) => (
                      <div
                        key={stepIdx}
                        style={{
                          display: 'flex',
                          gap: '12px',
                          fontSize: '14px',
                          color: '#404040',
                          lineHeight: 1.6
                        }}
                      >
                        <span style={{
                          color: '#0066FF',
                          fontWeight: 600,
                          minWidth: '20px'
                        }}>
                          {stepIdx + 1}.
                        </span>
                        <span>{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Architecture Decisions - Clean Grid */}
        <section style={{
          maxWidth: '920px',
          margin: '0 auto',
          padding: '96px 32px'
        }}>
          <div style={{ marginBottom: '56px' }}>
            <h2 style={{
              fontFamily: "'Epilogue', sans-serif",
              fontSize: '32px',
              fontWeight: 700,
              color: '#0A0A0A',
              letterSpacing: '-0.01em',
              marginBottom: '16px'
            }}>
              System Architecture
            </h2>
            <p style={{
              fontSize: '18px',
              color: '#404040',
              lineHeight: 1.6,
              maxWidth: '600px'
            }}>
              Strategic technical decisions and architectural tradeoffs under time constraints
            </p>
          </div>

          <div style={{
            display: 'grid',
            gap: '1px',
            background: '#E5E5E5',
            border: '1px solid #E5E5E5',
            borderRadius: '8px',
            overflow: 'hidden'
          }}>
            {architectureDecisions.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 4 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                style={{
                  padding: '32px',
                  background: '#FFFFFF'
                }}
              >
                <div style={{
                  fontSize: '12px',
                  fontWeight: 600,
                  color: '#737373',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  marginBottom: '12px'
                }}>
                  {item.category}
                </div>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: 600,
                  color: '#0A0A0A',
                  marginBottom: '12px',
                  lineHeight: 1.4
                }}>
                  {item.decision}
                </h3>
                <p style={{
                  fontSize: '15px',
                  color: '#404040',
                  lineHeight: 1.6,
                  marginBottom: '16px'
                }}>
                  {item.reasoning}
                </p>
                
                {item.challenge && (
                  <div style={{
                    padding: '12px 16px',
                    background: '#FAFAFA',
                    borderRadius: '6px',
                    marginBottom: '12px',
                    borderLeft: '2px solid #E5E5E5'
                  }}>
                    <div style={{
                      fontSize: '12px',
                      fontWeight: 600,
                      color: '#737373',
                      marginBottom: '4px'
                    }}>
                      Challenge
                    </div>
                    <div style={{
                      fontSize: '14px',
                      color: '#404040'
                    }}>
                      {item.challenge}
                    </div>
                  </div>
                )}
                
                {item.solution && (
                  <div style={{
                    padding: '12px 16px',
                    background: '#FAFAFA',
                    borderRadius: '6px',
                    marginBottom: '16px',
                    borderLeft: '2px solid #0066FF'
                  }}>
                    <div style={{
                      fontSize: '12px',
                      fontWeight: 600,
                      color: '#0066FF',
                      marginBottom: '4px'
                    }}>
                      Solution
                    </div>
                    <div style={{
                      fontSize: '14px',
                      color: '#404040'
                    }}>
                      {item.solution}
                    </div>
                  </div>
                )}
                
                <div style={{
                  fontSize: '14px',
                  fontWeight: 600,
                  color: '#0066FF'
                }}>
                  {item.impact}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Execution Timeline - Vertical Editorial */}
        <section style={{
          background: '#FFFFFF',
          borderTop: '1px solid #E5E5E5',
          borderBottom: '1px solid #E5E5E5',
          padding: '96px 0'
        }}>
          <div style={{
            maxWidth: '920px',
            margin: '0 auto',
            padding: '0 32px'
          }}>
            <div style={{ marginBottom: '56px' }}>
              <h2 style={{
                fontFamily: "'Epilogue', sans-serif",
                fontSize: '32px',
                fontWeight: 700,
                color: '#0A0A0A',
                letterSpacing: '-0.01em',
                marginBottom: '16px'
              }}>
                Execution Timeline
              </h2>
              <p style={{
                fontSize: '18px',
                color: '#404040',
                lineHeight: 1.6,
                maxWidth: '600px'
              }}>
                Strategic decisions, technical tradeoffs, and ownership scope across 24 hours
              </p>
            </div>

            <div style={{
              display: 'grid',
              gap: '48px'
            }}>
              {executionPhases.map((phase, idx) => (
                <motion.div
                  key={phase.id}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  style={{
                    borderLeft: '2px solid #E5E5E5',
                    paddingLeft: '32px',
                    position: 'relative',
                    cursor: 'pointer'
                  }}
                  onClick={() => setSelectedPhase(phase)}
                >
                  {/* Timeline Dot */}
                  <motion.div
                    animate={{
                      boxShadow: [
                        '0 0 0 0 rgba(0, 102, 255, 0.4)',
                        '0 0 0 8px rgba(0, 102, 255, 0)',
                        '0 0 0 0 rgba(0, 102, 255, 0)'
                      ]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    style={{
                      position: 'absolute',
                      left: '-9px',
                      top: '4px',
                      width: '16px',
                      height: '16px',
                      background: '#0066FF',
                      border: '3px solid #FFFFFF',
                      borderRadius: '50%'
                    }}
                  />

                  {/* Time Badge */}
                  <div style={{
                    display: 'inline-block',
                    fontSize: '13px',
                    fontWeight: 600,
                    color: '#737373',
                    marginBottom: '16px',
                    fontVariantNumeric: 'tabular-nums'
                  }}>
                    {phase.time}
                  </div>

                  <h3 style={{
                    fontFamily: "'Epilogue', sans-serif",
                    fontSize: '24px',
                    fontWeight: 700,
                    color: '#0A0A0A',
                    marginBottom: '8px',
                    letterSpacing: '-0.01em'
                  }}>
                    {phase.title}
                  </h3>

                  <p style={{
                    fontSize: '15px',
                    color: '#404040',
                    lineHeight: 1.6,
                    marginBottom: '24px'
                  }}>
                    {phase.description}
                  </p>

                  {/* Decision Block */}
                  <div style={{
                    padding: '20px',
                    background: '#FAFAFA',
                    borderRadius: '6px',
                    marginBottom: '24px'
                  }}>
                    <div style={{
                      fontSize: '12px',
                      fontWeight: 600,
                      color: '#737373',
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      marginBottom: '8px'
                    }}>
                      Key Decision
                    </div>
                    <div style={{
                      fontSize: '15px',
                      fontWeight: 600,
                      color: '#0A0A0A',
                      marginBottom: '12px'
                    }}>
                      {phase.decision}
                    </div>
                    <div style={{
                      fontSize: '14px',
                      color: '#404040',
                      lineHeight: 1.6
                    }}>
                      {phase.rationale}
                    </div>
                  </div>

                  {/* Technologies - Inline */}
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '8px',
                    marginBottom: '16px'
                  }}>
                    {phase.technologies.slice(0, 4).map((tech, i) => (
                      <span key={i} style={{
                        fontSize: '13px',
                        color: '#737373',
                        padding: '4px 10px',
                        background: '#FFFFFF',
                        border: '1px solid #E5E5E5',
                        borderRadius: '4px'
                      }}>
                        {tech}
                      </span>
                    ))}
                  </div>

                  <button style={{
                    background: 'none',
                    border: 'none',
                    color: '#0066FF',
                    fontSize: '14px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    padding: 0,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}>
                    View Full Details
                    <motion.div
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <ArrowRight size={14} />
                    </motion.div>
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Production Readiness - Merged Security + Performance */}
        <section style={{
          maxWidth: '920px',
          margin: '0 auto',
          padding: '96px 32px'
        }}>
          <div style={{ marginBottom: '56px' }}>
            <h2 style={{
              fontFamily: "'Epilogue', sans-serif",
              fontSize: '32px',
              fontWeight: 700,
              color: '#0A0A0A',
              letterSpacing: '-0.01em',
              marginBottom: '16px'
            }}>
              Production Readiness
            </h2>
            <p style={{
              fontSize: '18px',
              color: '#404040',
              lineHeight: 1.6,
              maxWidth: '600px'
            }}>
              Security implementation and performance characteristics under load
            </p>
          </div>

          {/* Security Layers */}
          <div style={{ marginBottom: '64px' }}>
            <h3 style={{
              fontSize: '18px',
              fontWeight: 600,
              color: '#0A0A0A',
              marginBottom: '24px'
            }}>
              Security Implementation
            </h3>
            
            <div style={{
              display: 'grid',
              gap: '1px',
              background: '#E5E5E5',
              border: '1px solid #E5E5E5',
              borderRadius: '8px',
              overflow: 'hidden'
            }}>
              {productionReadiness.security.map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: '24px 32px',
                    background: '#FFFFFF',
                    display: 'grid',
                    gridTemplateColumns: '180px 1fr',
                    gap: '32px',
                    alignItems: 'center'
                  }}
                >
                  <div>
                    <div style={{
                      fontSize: '12px',
                      fontWeight: 600,
                      color: '#737373',
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      marginBottom: '6px'
                    }}>
                      {item.layer}
                    </div>
                    <div style={{
                      fontSize: '15px',
                      fontWeight: 600,
                      color: '#0A0A0A'
                    }}>
                      {item.implementation}
                    </div>
                  </div>
                  <div style={{
                    fontSize: '14px',
                    color: '#404040',
                    lineHeight: 1.6
                  }}>
                    {item.detail}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Performance Metrics */}
          <div>
            <h3 style={{
              fontSize: '18px',
              fontWeight: 600,
              color: '#0A0A0A',
              marginBottom: '24px'
            }}>
              Performance Metrics
            </h3>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '1px',
              background: '#E5E5E5',
              border: '1px solid #E5E5E5',
              borderRadius: '8px',
              overflow: 'hidden'
            }}>
              {productionReadiness.performance.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: '0 8px 20px rgba(0, 102, 255, 0.15)'
                  }}
                  style={{
                    padding: '32px',
                    background: '#FFFFFF',
                    textAlign: 'center',
                    cursor: 'pointer',
                    transition: 'all 300ms ease'
                  }}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 + 0.2 }}
                    style={{
                      fontFamily: "'Epilogue', sans-serif",
                      fontSize: '40px',
                      fontWeight: 700,
                      color: '#0A0A0A',
                      lineHeight: 1,
                      marginBottom: '12px',
                      letterSpacing: '-0.02em',
                      fontVariantNumeric: 'tabular-nums'
                    }}
                  >
                    {item.value}
                  </motion.div>
                  <div style={{
                    fontSize: '14px',
                    fontWeight: 600,
                    color: '#0A0A0A',
                    marginBottom: '4px'
                  }}>
                    {item.metric}
                  </div>
                  <div style={{
                    fontSize: '13px',
                    color: '#737373'
                  }}>
                    {item.detail}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Technical Deep Dive - Data Flows */}
        <section style={{
          background: '#FFFFFF',
          borderTop: '1px solid #E5E5E5',
          borderBottom: '1px solid #E5E5E5',
          padding: '96px 0',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Animated Morphing Background */}
          <motion.div
            animate={{
              borderRadius: ['30% 70% 70% 30% / 30% 30% 70% 70%', '70% 30% 30% 70% / 70% 70% 30% 30%', '30% 70% 70% 30% / 30% 30% 70% 70%']
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '600px',
              height: '600px',
              background: 'radial-gradient(circle, rgba(0, 102, 255, 0.02) 0%, transparent 70%)',
              pointerEvents: 'none',
              zIndex: 0
            }}
          />
          
          <div style={{
            maxWidth: '920px',
            margin: '0 auto',
            padding: '0 32px',
            position: 'relative',
            zIndex: 1
          }}>
            <div style={{ marginBottom: '56px' }}>
              <h2 style={{
                fontFamily: "'Epilogue', sans-serif",
                fontSize: '32px',
                fontWeight: 700,
                color: '#0A0A0A',
                letterSpacing: '-0.01em',
                marginBottom: '16px'
              }}>
                Technical Deep Dive
              </h2>
              <p style={{
                fontSize: '18px',
                color: '#404040',
                lineHeight: 1.6,
                maxWidth: '600px'
              }}>
                Core system flows demonstrating architecture decisions in practice
              </p>
            </div>

            <div style={{
              display: 'grid',
              gap: '48px'
            }}>
              {/* Real-time Bidding Flow */}
              <div>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: 600,
                  color: '#0A0A0A',
                  marginBottom: '24px'
                }}>
                  Real-time Bidding Architecture
                </h3>

                <div style={{
                  padding: '32px',
                  background: '#FAFAFA',
                  borderRadius: '8px',
                  fontFamily: 'monospace',
                  fontSize: '14px',
                  lineHeight: 1.8,
                  color: '#404040',
                  overflowX: 'auto'
                }}>
                  {[
                    { 
                      label: 'Client → WebSocket Server',
                      content: "{ event: 'bid:place', listingId, amount, userId }",
                      delay: 0
                    },
                    {
                      label: 'WebSocket Server → Validation Layer',
                      content: '1. Check JWT authentication\n2. Verify auction still active (endTime > now)\n3. Validate bid amount > currentHighBid + minIncrement\n4. Check user not already high bidder\n5. Verify user not listing owner',
                      delay: 0.2
                    },
                    {
                      label: 'Validation → Database Transaction',
                      content: 'START TRANSACTION\n  UPDATE listings SET currentBid = amount, highBidder = userId, version++\n  WHERE _id = listingId AND version = expectedVersion\n  INSERT INTO bids {listingId, userId, amount, timestamp}\nCOMMIT',
                      delay: 0.4
                    },
                    {
                      label: 'Database → Redis Pub/Sub',
                      content: "PUBLISH bid:updates {listingId, amount, userId, timestamp}",
                      delay: 0.6
                    },
                    {
                      label: 'Redis → All WebSocket Servers → Clients',
                      content: 'Broadcast to room:listing-{listingId}\nResult: 45ms end-to-end latency, 500 concurrent users',
                      delay: 0.8
                    }
                  ].map((section, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: section.delay }}
                      style={{ marginBottom: i < 4 ? '24px' : 0 }}
                    >
                      <div style={{ color: '#0066FF', fontWeight: 600, marginBottom: '12px' }}>
                        {section.label}
                      </div>
                      <div style={{ 
                        paddingLeft: '20px', 
                        borderLeft: '2px solid #E5E5E5',
                        whiteSpace: 'pre-wrap'
                      }}>
                        {section.content}
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div style={{
                  marginTop: '16px',
                  padding: '16px 20px',
                  background: '#FFFBEB',
                  border: '1px solid #FDE68A',
                  borderRadius: '6px',
                  fontSize: '14px',
                  color: '#92400E',
                  lineHeight: 1.6
                }}>
                  <strong>Key Insight:</strong> Optimistic locking (version counter) prevents race conditions when two users bid simultaneously. Loser gets immediate "bid too low" error instead of corrupted state.
                </div>
              </div>

              {/* Payment Escrow Flow */}
              <div>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: 600,
                  color: '#0A0A0A',
                  marginBottom: '24px'
                }}>
                  Escrow Payment Flow
                </h3>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '1px',
                  background: '#E5E5E5',
                  border: '1px solid #E5E5E5',
                  borderRadius: '8px',
                  overflow: 'hidden'
                }}>
                  {[
                    {
                      phase: "1. Auction Ends",
                      actions: [
                        "Buyer wins auction at $450",
                        "System creates payment intent (Stripe)",
                        "Buyer authorizes charge",
                        "Funds held by Stripe (not transferred)"
                      ]
                    },
                    {
                      phase: "2. Seller Ships",
                      actions: [
                        "Seller marks item shipped",
                        "Tracking number recorded",
                        "Buyer receives notification",
                        "7-day delivery window starts"
                      ]
                    },
                    {
                      phase: "3. Buyer Confirms",
                      actions: [
                        "Buyer receives item, confirms delivery",
                        "Webhook: payment_intent.succeeded",
                        "System captures charge ($450)",
                        "Platform fee deducted (e.g., 5% = $22.50)"
                      ]
                    },
                    {
                      phase: "4. Seller Paid",
                      actions: [
                        "Transfer $427.50 to seller's connected account",
                        "Webhook: transfer.created",
                        "Seller receives payout notification",
                        "Transaction marked complete"
                      ]
                    }
                  ].map((step, idx) => (
                    <div
                      key={idx}
                      style={{
                        padding: '24px',
                        background: '#FFFFFF'
                      }}
                    >
                      <div style={{
                        fontSize: '13px',
                        fontWeight: 600,
                        color: '#0066FF',
                        marginBottom: '12px'
                      }}>
                        {step.phase}
                      </div>
                      <div style={{
                        display: 'grid',
                        gap: '8px'
                      }}>
                        {step.actions.map((action, i) => (
                          <div
                            key={i}
                            style={{
                              fontSize: '14px',
                              color: '#404040',
                              lineHeight: 1.6,
                              paddingLeft: '16px',
                              position: 'relative'
                            }}
                          >
                            <span style={{
                              position: 'absolute',
                              left: 0,
                              color: '#737373'
                            }}>
                              •
                            </span>
                            {action}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{
                  marginTop: '16px',
                  padding: '16px 20px',
                  background: '#EFF6FF',
                  border: '1px solid #BFDBFE',
                  borderRadius: '6px',
                  fontSize: '14px',
                  color: '#1E40AF',
                  lineHeight: 1.6
                }}>
                  <strong>Dispute Handling:</strong> If buyer doesn't confirm within 7 days, seller can request manual release. If buyer disputes, admin reviews evidence and either refunds buyer or releases to seller.
                </div>
              </div>

              {/* Image Upload Flow */}
              <div>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: 600,
                  color: '#0A0A0A',
                  marginBottom: '24px'
                }}>
                  Image Upload Optimization
                </h3>

                <div style={{
                  padding: '24px',
                  background: '#FAFAFA',
                  borderRadius: '8px'
                }}>
                  <div style={{
                    display: 'grid',
                    gap: '16px'
                  }}>
                    {[
                      {
                        step: "Client Request",
                        detail: "POST /api/listings/:id/request-upload",
                        result: "Server returns S3 pre-signed URL (valid 5 minutes)"
                      },
                      {
                        step: "Client Upload",
                        detail: "PUT to S3 pre-signed URL (direct client-to-S3)",
                        result: "No backend bandwidth consumed. Client gets upload progress."
                      },
                      {
                        step: "Server Validation",
                        detail: "POST /api/listings/:id/confirm-upload",
                        result: "Server validates image exists in S3, runs Sharp.js validation"
                      },
                      {
                        step: "Image Processing",
                        detail: "Generate thumbnails (300x300, 800x800, 1200x1200)",
                        result: "CloudFront CDN edge caching enabled"
                      }
                    ].map((item, idx) => (
                      <div
                        key={idx}
                        style={{
                          display: 'grid',
                          gridTemplateColumns: '140px 1fr',
                          gap: '16px',
                          padding: '16px',
                          background: '#FFFFFF',
                          borderRadius: '6px'
                        }}
                      >
                        <div>
                          <div style={{
                            fontSize: '12px',
                            fontWeight: 600,
                            color: '#737373',
                            textTransform: 'uppercase',
                            letterSpacing: '0.08em',
                            marginBottom: '4px'
                          }}>
                            Step {idx + 1}
                          </div>
                          <div style={{
                            fontSize: '14px',
                            fontWeight: 600,
                            color: '#0A0A0A'
                          }}>
                            {item.step}
                          </div>
                        </div>
                        <div>
                          <div style={{
                            fontSize: '13px',
                            color: '#404040',
                            marginBottom: '8px',
                            fontFamily: 'monospace',
                            background: '#FAFAFA',
                            padding: '6px 10px',
                            borderRadius: '4px'
                          }}>
                            {item.detail}
                          </div>
                          <div style={{
                            fontSize: '13px',
                            color: '#737373'
                          }}>
                            → {item.result}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{
                  marginTop: '16px',
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '16px'
                }}>
                  <div style={{
                    padding: '16px',
                    background: '#FEF2F2',
                    border: '1px solid #FECACA',
                    borderRadius: '6px',
                    fontSize: '14px',
                    lineHeight: 1.6
                  }}>
                    <div style={{ fontWeight: 600, color: '#991B1B', marginBottom: '8px' }}>
                      Without Pre-signed URLs
                    </div>
                    <div style={{ color: '#7F1D1D' }}>
                      Client → Server → S3<br/>
                      Backend bandwidth: 100MB/image<br/>
                      Server bottleneck at 50 concurrent uploads
                    </div>
                  </div>
                  <div style={{
                    padding: '16px',
                    background: '#F0FDF4',
                    border: '1px solid #BBF7D0',
                    borderRadius: '6px',
                    fontSize: '14px',
                    lineHeight: 1.6
                  }}>
                    <div style={{ fontWeight: 600, color: '#15803D', marginBottom: '8px' }}>
                      With Pre-signed URLs
                    </div>
                    <div style={{ color: '#166534' }}>
                      Client → S3 (direct)<br/>
                      Backend bandwidth: ~0MB<br/>
                      No server bottleneck, unlimited scaling
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Challenges & Solutions */}
        <section style={{
          maxWidth: '920px',
          margin: '0 auto',
          padding: '96px 32px'
        }}>
          <div style={{ marginBottom: '56px' }}>
            <h2 style={{
              fontFamily: "'Epilogue', sans-serif",
              fontSize: '32px',
              fontWeight: 700,
              color: '#0A0A0A',
              letterSpacing: '-0.01em',
              marginBottom: '16px'
            }}>
              Challenges & Trade-offs
            </h2>
            <p style={{
              fontSize: '18px',
              color: '#404040',
              lineHeight: 1.6,
              maxWidth: '600px'
            }}>
              Critical problems encountered and engineering solutions under time pressure
            </p>
          </div>

          <div style={{
            display: 'grid',
            gap: '24px'
          }}>
            {[
              {
                challenge: "Concurrent Bid Race Conditions",
                problem: "Two users bidding simultaneously caused last-write-wins scenario. Losing bid sometimes appeared as winner in UI.",
                solution: "Implemented MongoDB transactions with optimistic locking. Each listing has version counter. Bid operation includes WHERE version = expectedVersion. Concurrent bids: one succeeds, other gets ConflictError and retries.",
                outcome: "Zero bid conflicts in 500-user load test. Added 40ms latency but ensured correctness.",
                learningCurve: "High - Required understanding distributed systems consistency models"
              },
              {
                challenge: "WebSocket Connection State at Scale",
                problem: "First implementation stored active bids in WebSocket server memory. Adding second server broke real-time updates—users on different servers couldn't see each other's bids.",
                solution: "Migrated to Redis pub/sub pattern. All servers subscribe to bid:updates channel. When bid placed, publish to Redis, all servers receive and broadcast to their connected clients. Added Redis adapter to Socket.io.",
                outcome: "Horizontal scaling achieved. Can add servers without code changes. 45ms end-to-end latency maintained.",
                learningCurve: "Medium - Required architectural redesign mid-hackathon"
              },
              {
                challenge: "Payment Webhook Idempotency",
                problem: "Stripe webhooks occasionally delivered multiple times (network retries). First implementation processed duplicates, causing double payouts.",
                solution: "Added idempotency layer: (1) Webhook signature verification, (2) Event ID uniqueness constraint in database, (3) Database transaction for payment state updates. Duplicate webhook hits constraint, returns 200 OK without processing.",
                outcome: "Zero duplicate payments. Webhook processing became safe for retries.",
                learningCurve: "Low - Well-documented Stripe pattern, but critical to implement"
              },
              {
                challenge: "Image Upload Performance Bottleneck",
                problem: "Initial flow: Client → Express → S3. Each image upload consumed backend bandwidth and CPU. Server became bottleneck at 50 concurrent uploads.",
                solution: "Switched to S3 pre-signed URLs. Client requests upload token from server, then uploads directly to S3. Server only validates post-upload. Backend bandwidth: ~100MB/upload → ~0MB.",
                outcome: "Eliminated server bottleneck. Unlimited upload concurrency. Upload progress tracking moved client-side.",
                learningCurve: "Low - Standard S3 pattern, high impact"
              },
              {
                challenge: "Search Performance on Unindexed Fields",
                problem: "Initial product search scanned entire collection. With 5k test listings, queries took 800ms. Unacceptable UX.",
                solution: "Analyzed query patterns: 90% filtered by category + condition. Created compound index {category: 1, condition: 1, createdAt: -1}. Queries dropped to 12ms. Added text index on title/description for keyword search (120ms with facets).",
                outcome: "Search became usable. Faceted navigation enabled better UX. Accepted 120ms for complex queries over 800ms for simple ones.",
                learningCurve: "Medium - Required understanding MongoDB indexing strategy"
              },
              {
                challenge: "Nginx WebSocket Configuration",
                problem: "Production deployment failed at hour 22. Nginx blocked WebSocket upgrade requests. Real-time bidding completely broken. Lost 90 minutes debugging.",
                solution: "Added Nginx config: proxy_http_version 1.1; proxy_set_header Upgrade $http_upgrade; proxy_set_header Connection 'upgrade'. Staging deployment at hour 18 would have caught this.",
                outcome: "WebSockets worked in production. Lesson learned: staging environment saves time.",
                learningCurve: "Low - Known configuration, but critical to deployment"
              }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 4 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                style={{
                  padding: '32px',
                  background: '#FFFFFF',
                  border: '1px solid #E5E5E5',
                  borderRadius: '8px'
                }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '20px'
                }}>
                  <h3 style={{
                    fontSize: '18px',
                    fontWeight: 600,
                    color: '#0A0A0A',
                    flex: 1
                  }}>
                    {item.challenge}
                  </h3>
                  <span style={{
                    fontSize: '12px',
                    fontWeight: 600,
                    color: item.learningCurve === 'High' ? '#DC2626' : item.learningCurve === 'Medium' ? '#EA580C' : '#16A34A',
                    padding: '4px 12px',
                    background: item.learningCurve === 'High' ? '#FEF2F2' : item.learningCurve === 'Medium' ? '#FFF7ED' : '#F0FDF4',
                    borderRadius: '4px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}>
                    {item.learningCurve}
                  </span>
                </div>

                <div style={{
                  display: 'grid',
                  gap: '16px'
                }}>
                  <div>
                    <div style={{
                      fontSize: '12px',
                      fontWeight: 600,
                      color: '#737373',
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      marginBottom: '6px'
                    }}>
                      Problem
                    </div>
                    <div style={{
                      fontSize: '14px',
                      color: '#404040',
                      lineHeight: 1.6
                    }}>
                      {item.problem}
                    </div>
                  </div>

                  <div>
                    <div style={{
                      fontSize: '12px',
                      fontWeight: 600,
                      color: '#0066FF',
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      marginBottom: '6px'
                    }}>
                      Solution
                    </div>
                    <div style={{
                      fontSize: '14px',
                      color: '#0A0A0A',
                      lineHeight: 1.6,
                      padding: '16px',
                      background: '#FAFAFA',
                      borderRadius: '6px',
                      borderLeft: '3px solid #0066FF'
                    }}>
                      {item.solution}
                    </div>
                  </div>

                  <div>
                    <div style={{
                      fontSize: '12px',
                      fontWeight: 600,
                      color: '#737373',
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      marginBottom: '6px'
                    }}>
                      Outcome
                    </div>
                    <div style={{
                      fontSize: '14px',
                      color: '#404040',
                      lineHeight: 1.6
                    }}>
                      {item.outcome}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Engineering Lessons */}
        <section style={{
          background: '#FFFFFF',
          borderTop: '1px solid #E5E5E5',
          padding: '96px 0'
        }}>
          <div style={{
            maxWidth: '920px',
            margin: '0 auto',
            padding: '0 32px'
          }}>
            <div style={{ marginBottom: '56px' }}>
              <h2 style={{
                fontFamily: "'Epilogue', sans-serif",
                fontSize: '32px',
                fontWeight: 700,
                color: '#0A0A0A',
                letterSpacing: '-0.01em',
                marginBottom: '16px'
              }}>
                Engineering Lessons
              </h2>
              <p style={{
                fontSize: '18px',
                color: '#404040',
                lineHeight: 1.6,
                maxWidth: '600px'
              }}>
                Strategic insights on decision-making, coordination, and execution under constraint
              </p>
            </div>

            <div style={{
              display: 'grid',
              gap: '40px'
            }}>
              {engineeringLessons.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 4 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  style={{
                    paddingBottom: '40px',
                    borderBottom: idx < engineeringLessons.length - 1 ? '1px solid #E5E5E5' : 'none'
                  }}
                >
                  <h3 style={{
                    fontSize: '18px',
                    fontWeight: 600,
                    color: '#0A0A0A',
                    marginBottom: '16px',
                    lineHeight: 1.4
                  }}>
                    {item.lesson}
                  </h3>
                  <p style={{
                    fontSize: '15px',
                    color: '#404040',
                    lineHeight: 1.7,
                    marginBottom: '20px'
                  }}>
                    {item.insight}
                  </p>
                  <div style={{
                    padding: '16px 20px',
                    background: '#FAFAFA',
                    borderLeft: '3px solid #0066FF',
                    fontSize: '15px',
                    fontWeight: 500,
                    color: '#0A0A0A',
                    lineHeight: 1.6
                  }}>
                    {item.takeaway}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer CTA */}
        <section style={{
          maxWidth: '920px',
          margin: '0 auto',
          padding: '80px 32px 120px',
          textAlign: 'center',
          position: 'relative'
        }}>
          <motion.a
            href="https://github.com/bhagavan444"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              padding: '16px 32px',
              background: '#0A0A0A',
              color: '#FFFFFF',
              fontSize: '15px',
              fontWeight: 600,
              textDecoration: 'none',
              borderRadius: '8px',
              transition: 'all 200ms ease',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {/* Shimmer effect */}
            <motion.div
              animate={{
                x: ['-100%', '200%']
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 3,
                ease: "easeInOut"
              }}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                pointerEvents: 'none'
              }}
            />
            <Github size={18} />
            <span style={{ position: 'relative', zIndex: 1 }}>View More Engineering Projects</span>
            <motion.div
              animate={{ x: [0, 3, 0] }}
              transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
            >
              <ExternalLink size={16} />
            </motion.div>
          </motion.a>
        </section>
      </div>

      {/* Certificate Modal - Enhanced */}
      <AnimatePresence>
        {showCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setShowCert(false)}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0, 0, 0, 0.9)',
              backdropFilter: 'blur(8px)',
              zIndex: 9999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '32px',
              cursor: 'zoom-out'
            }}
          >
            <motion.div
              initial={{ scale: 0.8, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.8, y: 20, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onClick={e => e.stopPropagation()}
              style={{ 
                position: 'relative', 
                maxWidth: '95vw',
                maxHeight: '90vh',
                cursor: 'default'
              }}
            >
              {/* Close button */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90, background: '#EF4444' }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowCert(false)}
                style={{
                  position: 'absolute',
                  top: '-60px',
                  right: '0',
                  width: '48px',
                  height: '48px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '50%',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
                  transition: 'all 200ms ease'
                }}
              >
                <X size={24} />
              </motion.button>

              {/* Download button in modal */}
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  const a = document.createElement('a');
                  a.href = certUrl;
                  a.download = 'BrainoVision_Certificate.jpg';
                  a.click();
                }}
                style={{
                  position: 'absolute',
                  top: '-60px',
                  right: '60px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 20px',
                  background: '#F59E0B',
                  border: 'none',
                  borderRadius: '8px',
                  color: '#FFFFFF',
                  fontSize: '14px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(245, 158, 11, 0.4)',
                  transition: 'all 200ms ease'
                }}
              >
                <Download size={18} />
                Download
              </motion.button>

              {/* Certificate image with shimmer border */}
              <motion.div
                style={{
                  position: 'relative',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)'
                }}
              >
                {/* Animated border shimmer */}
                <motion.div
                  animate={{
                    rotate: 360
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  style={{
                    position: 'absolute',
                    inset: -2,
                    background: 'conic-gradient(from 0deg, #F59E0B, #FBBF24, #FCD34D, #F59E0B)',
                    borderRadius: '12px',
                    zIndex: -1
                  }}
                />
                
                <img 
                  src={certUrl} 
                  alt="Certificate"
                  style={{
                    width: '100%',
                    height: 'auto',
                    display: 'block',
                    borderRadius: '10px',
                    position: 'relative',
                    zIndex: 1
                  }}
                />
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Phase Details Modal - Clean */}
      <AnimatePresence>
        {selectedPhase && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setSelectedPhase(null)}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0, 0, 0, 0.5)',
              backdropFilter: 'blur(4px)',
              zIndex: 9999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '32px',
              overflowY: 'auto'
            }}
          >
            <motion.div
              initial={{ scale: 0.96, y: 8 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.96, y: 8 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              onClick={e => e.stopPropagation()}
              style={{
                background: '#FFFFFF',
                borderRadius: '12px',
                maxWidth: '760px',
                width: '100%',
                maxHeight: '90vh',
                overflowY: 'auto',
                position: 'relative'
              }}
            >
              {/* Header */}
              <div style={{
                padding: '40px 40px 32px',
                borderBottom: '1px solid #E5E5E5',
                position: 'sticky',
                top: 0,
                background: '#FFFFFF',
                zIndex: 1
              }}>
                <button
                  onClick={() => setSelectedPhase(null)}
                  style={{
                    position: 'absolute',
                    top: '32px',
                    right: '32px',
                    background: '#FAFAFA',
                    border: '1px solid #E5E5E5',
                    width: '32px',
                    height: '32px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 200ms ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#F5F5F5';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#FAFAFA';
                  }}
                >
                  <X size={16} />
                </button>

                <div style={{
                  fontSize: '13px',
                  fontWeight: 600,
                  color: '#737373',
                  marginBottom: '16px',
                  fontVariantNumeric: 'tabular-nums'
                }}>
                  {selectedPhase.time}
                </div>

                <h2 style={{
                  fontFamily: "'Epilogue', sans-serif",
                  fontSize: '32px',
                  fontWeight: 700,
                  color: '#0A0A0A',
                  marginBottom: '12px',
                  letterSpacing: '-0.01em'
                }}>
                  {selectedPhase.title}
                </h2>
                <p style={{
                  fontSize: '16px',
                  color: '#404040',
                  lineHeight: 1.6
                }}>
                  {selectedPhase.description}
                </p>
              </div>

              {/* Body */}
              <div style={{ padding: '40px' }}>
                
                {/* Decision Analysis */}
                <div style={{ marginBottom: '48px' }}>
                  <h3 style={{
                    fontSize: '18px',
                    fontWeight: 600,
                    color: '#0A0A0A',
                    marginBottom: '24px'
                  }}>
                    Decision Analysis
                  </h3>
                  
                  <div style={{ display: 'grid', gap: '16px' }}>
                    {[
                      { label: 'Decision', value: selectedPhase.decision },
                      { label: 'Risk', value: selectedPhase.risk },
                      { label: 'Rationale', value: selectedPhase.rationale },
                      { label: 'Tradeoff', value: selectedPhase.tradeoff }
                    ].map((item, idx) => (
                      <div key={idx} style={{
                        padding: '20px',
                        background: '#FAFAFA',
                        borderRadius: '6px'
                      }}>
                        <div style={{
                          fontSize: '12px',
                          fontWeight: 600,
                          color: '#737373',
                          textTransform: 'uppercase',
                          letterSpacing: '0.08em',
                          marginBottom: '8px'
                        }}>
                          {item.label}
                        </div>
                        <div style={{
                          fontSize: '15px',
                          color: '#0A0A0A',
                          lineHeight: 1.6
                        }}>
                          {item.value}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Ownership */}
                <div style={{ marginBottom: '48px' }}>
                  <h3 style={{
                    fontSize: '18px',
                    fontWeight: 600,
                    color: '#0A0A0A',
                    marginBottom: '24px'
                  }}>
                    Leadership & Ownership
                  </h3>
                  <div style={{ display: 'grid', gap: '12px' }}>
                    {selectedPhase.myOwnership.map((item, idx) => (
                      <div key={idx} style={{
                        display: 'flex',
                        gap: '12px',
                        fontSize: '15px',
                        color: '#404040',
                        lineHeight: 1.6
                      }}>
                        <div style={{ color: '#0066FF', marginTop: '2px' }}>•</div>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Technical Decisions */}
                <div style={{ marginBottom: '48px' }}>
                  <h3 style={{
                    fontSize: '18px',
                    fontWeight: 600,
                    color: '#0A0A0A',
                    marginBottom: '24px'
                  }}>
                    Technical Decisions
                  </h3>
                  <div style={{ display: 'grid', gap: '12px' }}>
                    {selectedPhase.technicalDecisions.map((item, idx) => (
                      <div key={idx} style={{
                        padding: '16px',
                        background: '#FAFAFA',
                        borderRadius: '6px',
                        fontSize: '14px',
                        color: '#0A0A0A',
                        lineHeight: 1.6
                      }}>
                        {item}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Technologies */}
                <div>
                  <h3 style={{
                    fontSize: '18px',
                    fontWeight: 600,
                    color: '#0A0A0A',
                    marginBottom: '24px'
                  }}>
                    Technologies
                  </h3>
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '8px'
                  }}>
                    {selectedPhase.technologies.map((tech, idx) => (
                      <span key={idx} style={{
                        padding: '8px 16px',
                        background: '#FAFAFA',
                        border: '1px solid #E5E5E5',
                        borderRadius: '6px',
                        fontSize: '14px',
                        color: '#0A0A0A'
                      }}>
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}