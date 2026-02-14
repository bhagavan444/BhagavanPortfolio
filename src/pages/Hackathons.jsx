"use client";

import { useState, useEffect, useRef } from "react";
import {
  Trophy, Clock, Users, Download, ArrowRight, 
  ExternalLink, X, Target, Award, ChevronRight
} from "lucide-react";

export default function HackathonCaseStudy() {
  const [selectedPhase, setSelectedPhase] = useState(null);
  const [showCert, setShowCert] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const certUrl = "images/Brainovision-certificate.jpg";

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const techIcons = {
    nodejs: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    express: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
    mongodb: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
    redis: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg",
    docker: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
    aws: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
    socketio: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/socketio/socketio-original.svg",
    nginx: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg"
  };

  const executionPhases = [
    {
      id: 1,
      time: "0-6h",
      title: "Foundation & Core Models",
      subtitle: "Data modeling and authentication architecture",
      description: "Designed database schemas for users, listings, bids, and transactions. Implemented authentication with JWT and OAuth 2.0. Established Docker deployment pipeline.",
      decision: "Chose MongoDB over PostgreSQL for product listings",
      risk: "NoSQL consistency issues for financial transactions",
      rationale: "Electronics products have highly variable attributes. MongoDB's flexible schema eliminates migration overhead. Critical financial operations use transactions.",
      tradeoff: "Used MongoDB transactions for bid operations, accepting 2x slower writes for data integrity",
      myOwnership: [
        "Designed normalized data models: User, Product, Bid, Transaction, Notification",
        "Implemented compound indexes for listing queries",
        "Built JWT authentication with access/refresh token rotation",
        "Integrated OAuth 2.0 for Google/GitHub",
        "Set up MongoDB Atlas with replica set",
        "Configured Docker multi-stage builds"
      ],
      technologies: ["nodejs", "express", "mongodb", "docker"]
    },
    {
      id: 2,
      time: "6-12h",
      title: "Listing & Search APIs",
      subtitle: "Product catalog and discovery engine",
      description: "Built comprehensive APIs for creating listings, uploading images, searching products, and filtering by multiple criteria.",
      decision: "MongoDB text indexes instead of Elasticsearch",
      risk: "Limited search relevance at scale",
      rationale: "For 24h MVP with <10k listings, MongoDB sufficient. Elasticsearch adds complexity.",
      tradeoff: "Search limited to exact/prefix matching. No fuzzy search.",
      myOwnership: [
        "Designed REST API endpoints",
        "Implemented S3 pre-signed URLs",
        "Built image validation with Sharp.js",
        "Created text indexes on product fields",
        "Designed aggregation pipeline",
        "Implemented cursor pagination"
      ],
      technologies: ["express", "aws", "mongodb"]
    },
    {
      id: 3,
      time: "12-18h",
      title: "Real-time Bidding System",
      subtitle: "WebSocket architecture for live auctions",
      description: "Architected WebSocket server for real-time bid updates. Implemented Redis pub/sub for horizontal scaling.",
      decision: "Socket.io with Redis adapter",
      risk: "WebSocket connection management",
      rationale: "Auction updates must reach all clients <100ms. Redis enables multi-server scaling.",
      tradeoff: "Added Redis dependency. Alternative (polling) would have 5x higher latency.",
      myOwnership: [
        "Architected Socket.io with Redis adapter",
        "Implemented bid validation logic",
        "Built optimistic locking with version counters",
        "Designed event schema",
        "Created auto-bid system",
        "Implemented connection recovery"
      ],
      technologies: ["socketio", "redis", "mongodb"]
    },
    {
      id: 4,
      time: "18-24h",
      title: "Payments & Production Deploy",
      subtitle: "Stripe integration and AWS deployment",
      description: "Integrated Stripe Connect for escrow payments. Deployed to AWS EC2 with Nginx reverse proxy and SSL.",
      decision: "Stripe Connect with escrow",
      risk: "Webhook reliability and idempotency",
      rationale: "Escrow protects buyers. Stripe handles PCI compliance.",
      tradeoff: "7-day escrow hold increases working capital requirements.",
      myOwnership: [
        "Integrated Stripe Connect",
        "Built escrow flow",
        "Implemented webhook handlers",
        "Designed idempotency system",
        "Deployed to AWS EC2",
        "Configured Nginx with SSL"
      ],
      technologies: ["aws", "nginx", "docker"]
    }
  ];

  const architectureDecisions = [
    {
      category: "Database Strategy",
      decision: "MongoDB + Redis hybrid",
      reasoning: "MongoDB for flexible product schemas. Redis for real-time bid state and pub/sub.",
      impact: "3x faster development",
      challenge: "Concurrent bid conflicts",
      solution: "Optimistic locking with version counters"
    },
    {
      category: "Real-time Architecture",
      decision: "WebSocket with Redis pub/sub",
      reasoning: "Sub-second latency required. Redis enables horizontal scaling.",
      impact: "45ms average propagation time",
      challenge: "Connection state at scale",
      solution: "Sticky sessions with Redis adapter"
    },
    {
      category: "Payment Processing",
      decision: "Stripe Connect with escrow",
      reasoning: "Stripe handles PCI compliance. Escrow protects both parties.",
      impact: "Zero fraud incidents",
      challenge: "Webhook reliability",
      solution: "Event deduplication with DB constraints"
    }
  ];

  const challenges = [
    {
      challenge: "Concurrent Bid Race Conditions",
      problem: "Two users bidding simultaneously caused last-write-wins. Losing bid appeared as winner.",
      solution: "MongoDB transactions with optimistic locking. Version counter ensures one succeeds, other retries.",
      outcome: "Zero bid conflicts in 500-user load test.",
      learningCurve: "High"
    },
    {
      challenge: "WebSocket State at Scale",
      problem: "Memory-based state broke when adding second server. Users on different servers couldn't see bids.",
      solution: "Redis pub/sub pattern. All servers subscribe, publish to Redis, broadcast to clients.",
      outcome: "Horizontal scaling achieved. 45ms latency maintained.",
      learningCurve: "Medium"
    },
    {
      challenge: "Payment Webhook Idempotency",
      problem: "Stripe webhooks delivered multiple times. First implementation processed duplicates, causing double payouts.",
      solution: "Event ID uniqueness constraint in database. Duplicate hits constraint, returns 200 OK.",
      outcome: "Zero duplicate payments.",
      learningCurve: "Low"
    }
  ];

  const TechIcon = ({ name, size = 32 }) => (
    <img 
      src={techIcons[name]} 
      alt={name}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        objectFit: 'contain',
        filter: 'grayscale(20%)',
        transition: 'all 300ms cubic-bezier(0.16, 1, 0.3, 1)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.filter = 'grayscale(0%)';
        e.currentTarget.style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.filter = 'grayscale(20%)';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    />
  );

  const AnimatedText = ({ children, delay = 0 }) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setTimeout(() => setIsVisible(true), delay);
          }
        },
        { threshold: 0.1 }
      );

      if (ref.current) observer.observe(ref.current);
      return () => observer.disconnect();
    }, [delay]);

    return (
      <div
        ref={ref}
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateX(0)' : 'translateX(48px)',
          transition: 'all 600ms cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {children}
      </div>
    );
  };

  const ScrollingTechStrip = () => (
    <div style={{
      position: 'absolute',
      top: '50%',
      left: 0,
      width: '100%',
      height: '120px',
      transform: 'translateY(-50%)',
      overflow: 'hidden',
      opacity: 0.03,
      pointerEvents: 'none',
      zIndex: 0
    }}>
      <div style={{
        display: 'flex',
        gap: '80px',
        animation: 'scrollTech 40s linear infinite',
        whiteSpace: 'nowrap',
        fontFamily: "'Epilogue', sans-serif",
        fontSize: '48px',
        fontWeight: 700,
        letterSpacing: '-0.02em'
      }}>
        {['REAL-TIME', 'REDIS', 'STRIPE', 'SCALABLE', 'WEBSOCKETS', 'ACID', 'DEPLOYED', 
          'REAL-TIME', 'REDIS', 'STRIPE', 'SCALABLE', 'WEBSOCKETS', 'ACID', 'DEPLOYED'].map((text, i) => (
          <span key={i}>{text}</span>
        ))}
      </div>
    </div>
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Epilogue:wght@600;700;800&family=Playfair+Display:ital,wght@0,700;0,800;1,700&display=swap');
        
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

        @keyframes scrollTech {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        @keyframes slideAccent {
          0% { width: 0; }
          100% { width: 100%; }
        }

        /* Mobile Responsive */
        @media (max-width: 1024px) {
          section {
            padding: 72px 24px !important;
          }
        }

        @media (max-width: 768px) {
          h1 {
            font-size: 36px !important;
          }
          h2 {
            font-size: 32px !important;
          }
          h3 {
            font-size: 22px !important;
          }
          p {
            font-size: 16px !important;
          }
          .metrics-grid {
            grid-template-columns: 1fr !important;
          }
          .two-col-grid {
            grid-template-columns: 1fr !important;
          }
          .timeline-line {
            display: none;
          }
        }

        @media (max-width: 480px) {
          section {
            padding: 60px 20px !important;
          }
          .card-padding {
            padding: 20px !important;
          }
        }
      `}</style>

      <div style={{ minHeight: '100vh', background: '#FAFAFA', position: 'relative' }}>
        
        {/* Scroll Progress Bar */}
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: `${scrollProgress}%`,
          height: '2px',
          background: 'linear-gradient(90deg, #0066FF, #00C9FF)',
          zIndex: 9999,
          transition: 'width 100ms ease-out'
        }} />
        
        {/* Hero Section */}
        <section style={{
          maxWidth: '920px',
          margin: '0 auto',
          padding: '120px 32px 96px',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <ScrollingTechStrip />

          <div style={{ position: 'relative', zIndex: 1 }}>
            <AnimatedText>
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
            </AnimatedText>

            <AnimatedText delay={100}>
              <h1 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(40px, 6vw, 72px)',
                fontWeight: 800,
                color: '#0A0A0A',
                lineHeight: 1.2,
                letterSpacing: '-0.01em',
                marginBottom: '32px',
                maxWidth: '820px',
                fontStyle: 'italic'
              }}>
                Building a{' '}
                <span style={{
                  background: 'linear-gradient(90deg, #0066FF 0%, #00C9FF 50%, #0066FF 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  display: 'inline-block'
                }}>
                  Scalable Electronics Marketplace
                </span>{' '}
                in 24 Hours
              </h1>
            </AnimatedText>

            <AnimatedText delay={200}>
              <p style={{
                fontSize: '20px',
                lineHeight: 1.6,
                color: '#404040',
                marginBottom: '24px',
                maxWidth: '680px'
              }}>
                Architected and deployed a production-ready peer-to-peer marketplace for second-hand electronics. 
                Led backend infrastructure, real-time bidding system, and payment integration.
              </p>
            </AnimatedText>

            <AnimatedText delay={300}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 24px',
                background: 'linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%)',
                border: '1px solid #FDE68A',
                borderRadius: '8px',
                marginBottom: '64px'
              }}>
                <Trophy size={18} style={{ color: '#F59E0B' }} />
                <span style={{ fontSize: '14px', color: '#92400E', fontWeight: 600 }}>
                  National Championship Winner — BrainoVision 2024
                </span>
                <button
                  onClick={() => setShowCert(true)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#F59E0B',
                    fontSize: '14px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    padding: 0,
                    marginLeft: '8px',
                    transition: 'transform 200ms ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'translateX(3px)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'translateX(0)'}
                >
                  View Certificate →
                </button>
              </div>
            </AnimatedText>

            {/* Impact Metrics */}
            <div className="metrics-grid" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '1px',
              background: '#E5E5E5',
              border: '1px solid #E5E5E5',
              borderRadius: '8px',
              overflow: 'hidden'
            }}>
              {[
                { value: "25+", label: "API Endpoints", context: "REST + WebSocket" },
                { value: "45ms", label: "Bid Latency", context: "Real-time updates" },
                { value: "500", label: "Concurrent Users", context: "Load tested" },
                { value: "85ms", label: "API Response", context: "p95 latency" }
              ].map((stat, idx) => (
                <AnimatedText key={idx} delay={400 + idx * 50}>
                  <div
                    className="card-padding"
                    style={{
                      padding: '32px 24px',
                      background: '#FFFFFF',
                      textAlign: 'center',
                      cursor: 'pointer',
                      transition: 'all 300ms cubic-bezier(0.16, 1, 0.3, 1)',
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-4px)';
                      const accent = e.currentTarget.querySelector('.accent-line');
                      if (accent) accent.style.width = '100%';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      const accent = e.currentTarget.querySelector('.accent-line');
                      if (accent) accent.style.width = '0';
                    }}
                  >
                    <div className="accent-line" style={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      width: '0',
                      height: '100%',
                      borderRight: '2px solid #0066FF',
                      transition: 'width 400ms cubic-bezier(0.16, 1, 0.3, 1)'
                    }} />
                    <div style={{
                      fontFamily: "'Epilogue', sans-serif",
                      fontSize: '48px',
                      fontWeight: 700,
                      color: '#0A0A0A',
                      lineHeight: 1,
                      marginBottom: '8px',
                      letterSpacing: '-0.02em'
                    }}>
                      {stat.value}
                    </div>
                    <div style={{ fontSize: '14px', fontWeight: 600, color: '#0A0A0A', marginBottom: '4px' }}>
                      {stat.label}
                    </div>
                    <div style={{ fontSize: '13px', color: '#737373' }}>
                      {stat.context}
                    </div>
                  </div>
                </AnimatedText>
              ))}
            </div>
          </div>
        </section>

        {/* Certificate Section - Enhanced */}
        <section style={{
          maxWidth: '920px',
          margin: '0 auto',
          padding: '64px 32px'
        }}>
          <AnimatedText>
            <div style={{
              background: 'linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%)',
              border: '1px solid #FDE68A',
              borderRadius: '12px',
              padding: '48px 40px',
              position: 'relative',
              overflow: 'hidden'
            }}>
              {/* Animated corner accents */}
              <div style={{
                position: 'absolute',
                top: '-50px',
                right: '-50px',
                width: '150px',
                height: '150px',
                background: 'radial-gradient(circle, rgba(251, 191, 36, 0.2) 0%, transparent 70%)',
                borderRadius: '50%',
                pointerEvents: 'none'
              }} />

              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px',
                marginBottom: '32px',
                position: 'relative',
                zIndex: 1
              }}>
                <Award size={32} style={{ color: '#F59E0B' }} />
                <h3 style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 'clamp(24px, 4vw, 32px)',
                  fontWeight: 700,
                  color: '#78350F',
                  fontStyle: 'italic'
                }}>
                  National Winner Certificate
                </h3>
                <Award size={32} style={{ color: '#F59E0B' }} />
              </div>

              <div
                onClick={() => setShowCert(true)}
                style={{
                  cursor: 'pointer',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  border: '2px solid #F59E0B',
                  marginBottom: '24px',
                  boxShadow: '0 10px 30px rgba(245, 158, 11, 0.2)',
                  position: 'relative',
                  zIndex: 1,
                  transition: 'all 300ms cubic-bezier(0.16, 1, 0.3, 1)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 15px 40px rgba(245, 158, 11, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(245, 158, 11, 0.2)';
                }}
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
                
                {/* Hover overlay */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'rgba(0, 0, 0, 0)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF',
                  fontSize: '18px',
                  fontWeight: 600,
                  backdropFilter: 'blur(0px)',
                  transition: 'all 300ms ease',
                  pointerEvents: 'none'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(0, 0, 0, 0.5)';
                  e.currentTarget.style.backdropFilter = 'blur(2px)';
                }}
                >
                  Click to view full size
                </div>
              </div>

              <div style={{
                display: 'flex',
                gap: '16px',
                justifyContent: 'center',
                position: 'relative',
                zIndex: 1,
                flexWrap: 'wrap'
              }}>
                <button
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
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(245, 158, 11, 0.25)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(245, 158, 11, 0.15)';
                  }}
                >
                  <Award size={18} />
                  View Full Certificate
                </button>

                <button
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
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 6px 16px rgba(245, 158, 11, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(245, 158, 11, 0.3)';
                  }}
                >
                  <Download size={18} />
                  Download Certificate
                </button>
              </div>
            </div>
          </AnimatedText>
        </section>

        {/* Tech Stack Section */}
        <section style={{
          background: '#FFFFFF',
          borderTop: '1px solid #E5E5E5',
          borderBottom: '1px solid #E5E5E5',
          padding: '96px 0'
        }}>
          <div style={{ maxWidth: '920px', margin: '0 auto', padding: '0 32px' }}>
            <AnimatedText>
              <h2 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '42px',
                fontWeight: 800,
                color: '#0A0A0A',
                letterSpacing: '-0.01em',
                marginBottom: '48px',
                textAlign: 'center',
                fontStyle: 'italic'
              }}>
                Technology Stack
              </h2>
            </AnimatedText>

            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '48px',
              flexWrap: 'wrap'
            }}>
              {['nodejs', 'express', 'mongodb', 'redis', 'socketio', 'docker', 'aws', 'nginx'].map((tech, idx) => (
                <AnimatedText key={tech} delay={idx * 50}>
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '12px'
                  }}>
                    <TechIcon name={tech} size={48} />
                    <span style={{
                      fontSize: '13px',
                      color: '#737373',
                      fontWeight: 500,
                      textTransform: 'capitalize'
                    }}>
                      {tech === 'socketio' ? 'Socket.io' : tech === 'aws' ? 'AWS' : tech}
                    </span>
                  </div>
                </AnimatedText>
              ))}
            </div>
          </div>
        </section>

        {/* Execution Timeline */}
        <section style={{
          maxWidth: '920px',
          margin: '0 auto',
          padding: '96px 32px',
          position: 'relative'
        }}>
          <AnimatedText>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '42px',
              fontWeight: 800,
              color: '#0A0A0A',
              letterSpacing: '-0.01em',
              marginBottom: '16px',
              fontStyle: 'italic'
            }}>
              Execution Timeline
            </h2>
            <p style={{
              fontSize: '18px',
              color: '#404040',
              lineHeight: 1.6,
              maxWidth: '600px',
              marginBottom: '56px'
            }}>
              Strategic decisions and technical tradeoffs across 24 hours
            </p>
          </AnimatedText>

          <div style={{ position: 'relative' }}>
            {/* Scroll indicator */}
            <div style={{
              position: 'absolute',
              left: '0',
              top: '0',
              width: '2px',
              height: '100%',
              background: '#E5E5E5',
              zIndex: 0
            }}>
              <div style={{
                width: '100%',
                height: `${Math.min(scrollProgress * 2, 100)}%`,
                background: 'linear-gradient(180deg, #0066FF, #00C9FF)',
                transition: 'height 100ms ease-out'
              }} />
            </div>

            <div style={{ display: 'grid', gap: '48px' }}>
              {executionPhases.map((phase, idx) => (
                <AnimatedText key={phase.id} delay={idx * 100}>
                  <div
                    onClick={() => setSelectedPhase(phase)}
                    className="timeline-line"
                    style={{
                      borderLeft: '2px solid transparent',
                      paddingLeft: '32px',
                      position: 'relative',
                      cursor: 'pointer',
                      transition: 'all 300ms cubic-bezier(0.16, 1, 0.3, 1)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateX(4px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateX(0)';
                    }}
                  >
                    {/* Timeline Dot */}
                    <div style={{
                      position: 'absolute',
                      left: '-9px',
                      top: '4px',
                      width: '16px',
                      height: '16px',
                      background: '#0066FF',
                      border: '3px solid #FFFFFF',
                      borderRadius: '50%',
                      boxShadow: '0 0 0 1px #E5E5E5'
                    }} />

                    <div style={{
                      fontSize: '13px',
                      fontWeight: 600,
                      color: '#737373',
                      marginBottom: '16px'
                    }}>
                      {phase.time}
                    </div>

                    <h3 style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: '28px',
                      fontWeight: 700,
                      color: '#0A0A0A',
                      marginBottom: '8px',
                      letterSpacing: '-0.01em',
                      fontStyle: 'italic'
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

                    {/* Tech Icons */}
                    <div style={{
                      display: 'flex',
                      gap: '16px',
                      marginBottom: '16px'
                    }}>
                      {phase.technologies.map(tech => (
                        <TechIcon key={tech} name={tech} size={28} />
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
                      gap: '6px',
                      transition: 'transform 200ms ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateX(4px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateX(0)';
                    }}
                    >
                      View Full Details
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </AnimatedText>
              ))}
            </div>
          </div>
        </section>

        {/* Architecture Decisions */}
        <section style={{
          background: '#FFFFFF',
          borderTop: '1px solid #E5E5E5',
          borderBottom: '1px solid #E5E5E5',
          padding: '96px 0'
        }}>
          <div style={{ maxWidth: '920px', margin: '0 auto', padding: '0 32px' }}>
            <AnimatedText>
              <h2 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '42px',
                fontWeight: 800,
                color: '#0A0A0A',
                letterSpacing: '-0.01em',
                marginBottom: '16px',
                fontStyle: 'italic'
              }}>
                System Architecture
              </h2>
              <p style={{
                fontSize: '18px',
                color: '#404040',
                lineHeight: 1.6,
                maxWidth: '600px',
                marginBottom: '56px'
              }}>
                Strategic technical decisions and architectural tradeoffs
              </p>
            </AnimatedText>

            <div style={{
              display: 'grid',
              gap: '1px',
              background: '#E5E5E5',
              border: '1px solid #E5E5E5',
              borderRadius: '8px',
              overflow: 'hidden'
            }}>
              {architectureDecisions.map((item, idx) => (
                <AnimatedText key={idx} delay={idx * 100}>
                  <div style={{
                    padding: '32px',
                    background: '#FFFFFF',
                    position: 'relative',
                    overflow: 'hidden'
                  }}>
                    {/* Top accent line - draws on hover */}
                    <div 
                      className="top-accent"
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '0',
                        height: '2px',
                        background: 'linear-gradient(90deg, #0066FF, #00C9FF)',
                        transition: 'width 600ms cubic-bezier(0.16, 1, 0.3, 1)'
                      }}
                    />
                    
                    <div
                      onMouseEnter={(e) => {
                        const accent = e.currentTarget.parentElement.querySelector('.top-accent');
                        if (accent) accent.style.width = '100%';
                      }}
                      onMouseLeave={(e) => {
                        const accent = e.currentTarget.parentElement.querySelector('.top-accent');
                        if (accent) accent.style.width = '0';
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
                        marginBottom: '12px'
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

                      <div style={{
                        padding: '12px 16px',
                        background: '#FAFAFA',
                        borderRadius: '6px',
                        marginBottom: '12px',
                        borderLeft: '2px solid #E5E5E5'
                      }}>
                        <div style={{ fontSize: '12px', fontWeight: 600, color: '#737373', marginBottom: '4px' }}>
                          Challenge
                        </div>
                        <div style={{ fontSize: '14px', color: '#404040' }}>
                          {item.challenge}
                        </div>
                      </div>

                      <div style={{
                        padding: '12px 16px',
                        background: '#FAFAFA',
                        borderRadius: '6px',
                        marginBottom: '16px',
                        borderLeft: '2px solid #0066FF'
                      }}>
                        <div style={{ fontSize: '12px', fontWeight: 600, color: '#0066FF', marginBottom: '4px' }}>
                          Solution
                        </div>
                        <div style={{ fontSize: '14px', color: '#404040' }}>
                          {item.solution}
                        </div>
                      </div>

                      <div style={{
                        fontSize: '14px',
                        fontWeight: 600,
                        color: '#0066FF'
                      }}>
                        {item.impact}
                      </div>
                    </div>
                  </div>
                </AnimatedText>
              ))}
            </div>
          </div>
        </section>

        {/* Challenges */}
        <section style={{
          maxWidth: '920px',
          margin: '0 auto',
          padding: '96px 32px'
        }}>
          <AnimatedText>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '42px',
              fontWeight: 800,
              color: '#0A0A0A',
              letterSpacing: '-0.01em',
              marginBottom: '16px',
              fontStyle: 'italic'
            }}>
              Challenges & Solutions
            </h2>
            <p style={{
              fontSize: '18px',
              color: '#404040',
              lineHeight: 1.6,
              maxWidth: '600px',
              marginBottom: '56px'
            }}>
              Critical problems encountered and engineering solutions
            </p>
          </AnimatedText>

          <div style={{ display: 'grid', gap: '24px' }}>
            {challenges.map((item, idx) => (
              <AnimatedText key={idx} delay={idx * 100}>
                <div
                  className="card-padding"
                  style={{
                    padding: '32px',
                    background: '#FFFFFF',
                    border: '1px solid #E5E5E5',
                    borderRadius: '8px',
                    transition: 'all 300ms cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateX(4px)';
                    e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 102, 255, 0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateX(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '20px',
                    flexWrap: 'wrap',
                    gap: '12px'
                  }}>
                    <h3 style={{
                      fontSize: '18px',
                      fontWeight: 600,
                      color: '#0A0A0A'
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

                  <div style={{ display: 'grid', gap: '16px' }}>
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
                </div>
              </AnimatedText>
            ))}
          </div>
        </section>

        {/* Footer CTA */}
        <section style={{
          maxWidth: '920px',
          margin: '0 auto',
          padding: '80px 32px 120px',
          textAlign: 'center'
        }}>
          <AnimatedText>
            <a
              href="https://github.com/bhagavan444"
              target="_blank"
              rel="noopener noreferrer"
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
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.2)';
                const overlay = e.currentTarget.querySelector('.hover-overlay');
                if (overlay) overlay.style.transform = 'translateX(0)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
                const overlay = e.currentTarget.querySelector('.hover-overlay');
                if (overlay) overlay.style.transform = 'translateX(-100%)';
              }}
            >
              <div 
                className="hover-overlay"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
                  transform: 'translateX(-100%)',
                  transition: 'transform 400ms cubic-bezier(0.16, 1, 0.3, 1)',
                  pointerEvents: 'none'
                }}
              />
              <span style={{ position: 'relative', zIndex: 1 }}>View More Engineering Projects</span>
              <ExternalLink size={16} style={{ position: 'relative', zIndex: 1 }} />
            </a>
          </AnimatedText>
        </section>
      </div>

      {/* Certificate Modal */}
      {showCert && (
        <div
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
            cursor: 'zoom-out',
            animation: 'fadeIn 300ms ease'
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{ 
              position: 'relative', 
              maxWidth: '95vw',
              maxHeight: '90vh',
              cursor: 'default',
              animation: 'slideUp 300ms cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          >
            <button
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
                transition: 'all 200ms ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#EF4444';
                e.currentTarget.style.transform = 'rotate(90deg)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.transform = 'rotate(0)';
              }}
            >
              <X size={24} />
            </button>

            <button
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
                transition: 'all 200ms ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 20px rgba(245, 158, 11, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <Download size={18} />
              Download
            </button>

            <div style={{
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
              border: '2px solid #F59E0B'
            }}>
              <img 
                src={certUrl} 
                alt="Certificate"
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block'
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Phase Details Modal */}
      {selectedPhase && (
        <div
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
            overflowY: 'auto',
            animation: 'fadeIn 200ms ease'
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: '#FFFFFF',
              borderRadius: '12px',
              maxWidth: '760px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              position: 'relative',
              animation: 'slideRight 200ms cubic-bezier(0.16, 1, 0.3, 1)',
              transformOrigin: 'right center'
            }}
          >
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
                onMouseEnter={(e) => e.currentTarget.style.background = '#F5F5F5'}
                onMouseLeave={(e) => e.currentTarget.style.background = '#FAFAFA'}
              >
                <X size={16} />
              </button>

              <div style={{
                fontSize: '13px',
                fontWeight: 600,
                color: '#737373',
                marginBottom: '16px'
              }}>
                {selectedPhase.time}
              </div>

              <h2 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '36px',
                fontWeight: 800,
                color: '#0A0A0A',
                marginBottom: '12px',
                letterSpacing: '-0.01em',
                fontStyle: 'italic'
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

            <div style={{ padding: '40px' }}>
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
                  gap: '24px',
                  flexWrap: 'wrap'
                }}>
                  {selectedPhase.technologies.map(tech => (
                    <TechIcon key={tech} name={tech} size={40} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideUp {
          from { 
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to { 
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes slideRight {
          from {
            opacity: 0;
            transform: translateX(48px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </>
  );
}