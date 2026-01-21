import { useState, useEffect, useRef } from "react";
import {
  Mail, Phone, Send, CheckCircle2, Linkedin, Github, Twitter,
  Code, Zap, MessageCircle, User, ArrowRight, Sparkles, Award,
  Target, X, ExternalLink, Terminal
} from "lucide-react";

export default function CyberpunkContact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("idle");
  const [focusedField, setFocusedField] = useState(null);
  const canvasRef = useRef(null);

  // Typing animation
  const [currentText, setCurrentText] = useState("");
  const [charIndex, setCharIndex] = useState(0);
  const [textIndex, setTextIndex] = useState(0);

  const texts = [
    "Let's build something amazing together!",
    "Ready to collaborate on your next project?",
    "Share your ideas - I'm all ears!",
    "Connect and let's create magic 🚀",
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      if (charIndex < texts[textIndex].length) {
        setCharIndex(charIndex + 1);
      } else {
        setTimeout(() => {
          setCharIndex(0);
          setTextIndex((textIndex + 1) % texts.length);
        }, 3000);
      }
    }, 100);

    setCurrentText(texts[textIndex].slice(0, charIndex));

    return () => clearTimeout(timer);
  }, [charIndex, textIndex]);

  // ─── BACKGROUND PARTICLES ────────────────────────────────────────────────
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

    const particles = Array.from({ length: 70 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      size: Math.random() * 2.8 + 1.2
    }));

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.07)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 5);
        gradient.addColorStop(0, 'rgba(0, 255, 255, 0.38)');
        gradient.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 5, 0, Math.PI * 2);
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

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate submission (replace with real API call)
    await new Promise(resolve => setTimeout(resolve, 1800));
    setSubmitStatus("success");
    setFormData({ name: "", email: "", subject: "", message: "" });

    setTimeout(() => {
      setSubmitStatus("idle");
      setIsSubmitting(false);
    }, 4000);
  };

  const socialLinks = [
    {
      icon: Github,
      label: "GitHub",
      href: "https://github.com/bhagavan444",
      color: "#ffffff",
      stats: "8+ Repos"
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/gopalajosyula-siva-satya-sai-bhagavan-1624a027b/",
      color: "#00ffff",
      stats: "Connect"
    },
    {
      icon: Twitter,
      label: "Twitter",
      href: "https://twitter.com/bhagavan444",
      color: "#00ffff",
      stats: "Follow"
    },
    {
      icon: Mail,
      label: "Email",
      href: "mailto:g.sivasatyasaibhagavan@gmail.com",
      color: "#8a2be2",
      stats: "Direct"
    }
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Fira+Code:wght@400;500;600&display=swap');

        @keyframes slideIn { from { opacity:0; transform:translateY(60px); } to { opacity:1; transform:translateY(0); } }
        @keyframes scan     { 0% { transform:translateY(-100%); } 100% { transform:translateY(100%); } }
        @keyframes float    { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-14px); } }
        @keyframes pulse    { 0%,100% { opacity:1; } 50% { opacity:0.6; } }

        .contact-card {
          transition: all 0.4s cubic-bezier(0.23,1,0.32,1);
        }

        .contact-card:hover {
          transform: translateY(-12px);
          box-shadow: 0 0 60px currentColor;
        }

        .input-focus {
          border-color: #00ffff !important;
          box-shadow: 0 0 20px rgba(0,255,255,0.4) !important;
        }

        .neon-title {
          text-shadow: 0 0 14px currentColor, 0 0 32px currentColor, 0 0 60px currentColor;
        }
      `}</style>

      <div style={{
        minHeight: '100vh',
        background: '#000000',
        color: '#e0e0ff',
        position: 'relative',
        overflow: 'hidden',
        padding: '8rem 3rem 6rem',
        fontFamily: "'Outfit', sans-serif"
      }}>
        {/* Grid overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(0,255,255,0.09) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,255,255,0.09) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          opacity: 0.22,
          pointerEvents: 'none'
        }} />

        {/* Particles */}
        <canvas
          ref={canvasRef}
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            zIndex: 1
          }}
        />

        <div style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: '1680px',
          margin: '0 auto'
        }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '7rem' }}>
            <div style={{
              display: 'inline-block',
              fontFamily: "'Fira Code', monospace",
              color: '#00ffff',
              fontSize: '1.15rem',
              padding: '0.9rem 2rem',
              border: '2.5px solid rgba(0,255,255,0.4)',
              borderRadius: '999px',
              marginBottom: '1.8rem',
              animation: 'pulse 3.5s infinite'
            }}>
              {'>'} contact.initiate()
            </div>

            <h1 className="neon-title" style={{
              fontSize: 'clamp(4rem, 9vw, 7rem)',
              fontWeight: 900,
              color: '#00ffff',
              letterSpacing: '5px',
              textTransform: 'uppercase',
              marginBottom: '1.8rem'
            }}>
              OPEN CHANNEL
            </h1>

            <div style={{
              fontSize: 'clamp(1.6rem, 4vw, 2.4rem)',
              fontWeight: 800,
              color: '#b0b0ff',
              marginBottom: '2rem',
              minHeight: '3.2rem'
            }}>
              {currentText}
              <span style={{
                display: 'inline-block',
                width: '3px',
                height: '1.4em',
                background: '#00ffff',
                animation: 'blink 1s step-end infinite',
                marginLeft: '4px',
                verticalAlign: 'middle'
              }} />
            </div>

            <p style={{
              fontSize: 'clamp(1.15rem, 2.8vw, 1.45rem)',
              color: '#a0a0c8',
              maxWidth: '820px',
              margin: '0 auto',
              fontFamily: "'Fira Code', monospace",
              lineHeight: 1.8
            }}>
              Drop a message • Let's build the next big thing
            </p>
          </div>

          {/* Main Content - Form + Contact Info */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '4rem',
            '@media (max-width: 1024px)': {
              gridTemplateColumns: '1fr'
            }
          }}>
            {/* Contact Form */}
            <div style={{
              background: 'rgba(0,0,0,0.65)',
              border: '2px solid rgba(0,255,255,0.3)',
              borderRadius: '24px',
              padding: '3rem 2.5rem',
              boxShadow: '0 0 60px rgba(0,255,255,0.2)'
            }}>
              {submitStatus === "success" ? (
                <div style={{
                  textAlign: 'center',
                  padding: '4rem 2rem'
                }}>
                  <div style={{
                    width: '100px',
                    height: '100px',
                    margin: '0 auto 2rem',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #00ffff, #8a2be2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 0 60px #00ffff80'
                  }}>
                    <CheckCircle2 size={60} color="#000" />
                  </div>

                  <h3 style={{
                    fontSize: '2.2rem',
                    fontWeight: 900,
                    color: '#00ffff',
                    marginBottom: '1rem'
                  }}>
                    Message Received!
                  </h3>

                  <p style={{
                    fontSize: '1.3rem',
                    color: '#b0b0ff'
                  }}>
                    I'll respond within 24 hours. Let's build something epic.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div style={{ display: 'grid', gap: '2rem' }}>
                    {/* Name & Email row */}
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: '2rem',
                      '@media (max-width: 640px)': { gridTemplateColumns: '1fr' }
                    }}>
                      <div>
                        <label style={{
                          display: 'block',
                          marginBottom: '0.8rem',
                          fontSize: '1.1rem',
                          color: '#b0b0ff'
                        }}>
                          Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Your name"
                          required
                          style={{
                            width: '100%',
                            padding: '1.2rem',
                            background: 'rgba(255,255,255,0.05)',
                            border: `2px solid ${focusedField === 'name' ? '#00ffff' : 'rgba(255,255,255,0.15)'}`,
                            borderRadius: '12px',
                            color: '#ffffff',
                            fontSize: '1.1rem',
                            outline: 'none',
                            transition: 'all 0.3s'
                          }}
                          onFocus={() => setFocusedField('name')}
                          onBlur={() => setFocusedField(null)}
                        />
                      </div>

                      <div>
                        <label style={{
                          display: 'block',
                          marginBottom: '0.8rem',
                          fontSize: '1.1rem',
                          color: '#b0b0ff'
                        }}>
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="your@email.com"
                          required
                          style={{
                            width: '100%',
                            padding: '1.2rem',
                            background: 'rgba(255,255,255,0.05)',
                            border: `2px solid ${focusedField === 'email' ? '#00ffff' : 'rgba(255,255,255,0.15)'}`,
                            borderRadius: '12px',
                            color: '#ffffff',
                            fontSize: '1.1rem',
                            outline: 'none',
                            transition: 'all 0.3s'
                          }}
                          onFocus={() => setFocusedField('email')}
                          onBlur={() => setFocusedField(null)}
                        />
                      </div>
                    </div>

                    {/* Subject */}
                    <div>
                      <label style={{
                        display: 'block',
                        marginBottom: '0.8rem',
                        fontSize: '1.1rem',
                        color: '#b0b0ff'
                      }}>
                        Subject
                      </label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="Project collaboration / Job opportunity / Idea"
                        required
                        style={{
                          width: '100%',
                          padding: '1.2rem',
                          background: 'rgba(255,255,255,0.05)',
                          border: `2px solid ${focusedField === 'subject' ? '#00ffff' : 'rgba(255,255,255,0.15)'}`,
                          borderRadius: '12px',
                          color: '#ffffff',
                          fontSize: '1.1rem',
                          outline: 'none',
                          transition: 'all 0.3s'
                        }}
                        onFocus={() => setFocusedField('subject')}
                        onBlur={() => setFocusedField(null)}
                      />
                    </div>

                    {/* Message */}
                    <div>
                      <label style={{
                        display: 'block',
                        marginBottom: '0.8rem',
                        fontSize: '1.1rem',
                        color: '#b0b0ff'
                      }}>
                        Message
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={6}
                        placeholder="Tell me about your project, idea, or how we can work together..."
                        required
                        style={{
                          width: '100%',
                          padding: '1.2rem',
                          background: 'rgba(255,255,255,0.05)',
                          border: `2px solid ${focusedField === 'message' ? '#00ffff' : 'rgba(255,255,255,0.15)'}`,
                          borderRadius: '12px',
                          color: '#ffffff',
                          fontSize: '1.1rem',
                          resize: 'vertical',
                          minHeight: '140px',
                          outline: 'none',
                          transition: 'all 0.3s'
                        }}
                        onFocus={() => setFocusedField('message')}
                        onBlur={() => setFocusedField(null)}
                      />
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      style={{
                        padding: '1.4rem',
                        background: 'linear-gradient(90deg, #00ffff, #8a2be2)',
                        borderRadius: '999px',
                        color: '#000',
                        fontWeight: 900,
                        fontSize: '1.25rem',
                        border: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '1rem',
                        boxShadow: '0 0 50px #00ffff60',
                        cursor: isSubmitting ? 'not-allowed' : 'pointer',
                        opacity: isSubmitting ? 0.7 : 1,
                        transition: 'all 0.4s'
                      }}
                    >
                      {isSubmitting ? (
                        <>
                          <div style={{
                            width: '24px',
                            height: '24px',
                            border: '3px solid #000',
                            borderTopColor: '#fff',
                            borderRadius: '50%',
                            animation: 'spin 1s linear infinite'
                          }} />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send size={24} />
                          Send Transmission
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Contact Info & Social */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '3rem'
            }}>
              {/* Quick Contact Cards */}
              <div style={{
                background: 'rgba(0,0,0,0.65)',
                border: '2px solid rgba(0,255,255,0.3)',
                borderRadius: '24px',
                padding: '3rem 2.5rem'
              }}>
                <h3 style={{
                  fontSize: '1.8rem',
                  fontWeight: 800,
                  color: '#00ffff',
                  marginBottom: '2rem',
                  textAlign: 'center'
                }}>
                  Direct Channels
                </h3>

                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.8rem'
                }}>
                  <a
                    href="mailto:g.sivasatyasaibhagavan@gmail.com"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1.5rem',
                      padding: '1.5rem',
                      background: 'rgba(255,255,255,0.04)',
                      borderRadius: '16px',
                      border: '1px solid rgba(0,255,255,0.3)',
                      color: '#ffffff',
                      textDecoration: 'none',
                      transition: 'all 0.4s'
                    }}
                  >
                    <div style={{
                      width: '70px',
                      height: '70px',
                      borderRadius: '20px',
                      background: 'linear-gradient(135deg, #00ffff, #8a2be2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <Mail size={36} color="#000" />
                    </div>

                    <div>
                      <div style={{ fontSize: '1.3rem', fontWeight: 700 }}>
                        Email
                      </div>
                      <div style={{ color: '#b0b0ff' }}>
                        g.sivasatyasaibhagavan@gmail.com
                      </div>
                    </div>
                  </a>

                  <div style={{
                    display: 'flex',
                    gap: '1.5rem',
                    flexWrap: 'wrap'
                  }}>
                    <a
                      href="tel:+917569205626"
                      style={{
                        flex: 1,
                        padding: '1.5rem',
                        background: 'rgba(255,255,255,0.04)',
                        borderRadius: '16px',
                        border: '1px solid rgba(0,255,255,0.3)',
                        color: '#ffffff',
                        textDecoration: 'none',
                        textAlign: 'center',
                        transition: 'all 0.4s'
                      }}
                    >
                      <Phone size={28} style={{ marginBottom: '0.8rem' }} />
                      <div>+91 75692 05626</div>
                    </a>

                    <a
                      href="tel:+919032230626"
                      style={{
                        flex: 1,
                        padding: '1.5rem',
                        background: 'rgba(255,255,255,0.04)',
                        borderRadius: '16px',
                        border: '1px solid rgba(0,255,255,0.3)',
                        color: '#ffffff',
                        textDecoration: 'none',
                        textAlign: 'center',
                        transition: 'all 0.4s'
                      }}
                    >
                      <Phone size={28} style={{ marginBottom: '0.8rem' }} />
                      <div>+91 90322 30626</div>
                    </a>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div style={{
                background: 'rgba(0,0,0,0.65)',
                border: '2px solid rgba(0,255,255,0.3)',
                borderRadius: '24px',
                padding: '3rem 2.5rem'
              }}>
                <h3 style={{
                  fontSize: '1.8rem',
                  fontWeight: 800,
                  color: '#00ffff',
                  marginBottom: '2rem',
                  textAlign: 'center'
                }}>
                  Social Gateways
                </h3>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                  gap: '1.5rem'
                }}>
                  {socialLinks.map((link, i) => (
                    <a
                      key={i}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '1rem',
                        padding: '1.5rem',
                        background: 'rgba(255,255,255,0.04)',
                        borderRadius: '16px',
                        border: `1px solid ${link.color}40`,
                        color: '#ffffff',
                        textDecoration: 'none',
                        transition: 'all 0.4s',
                        textAlign: 'center'
                      }}
                    >
                      <div style={{
                        width: '60px',
                        height: '60px',
                        borderRadius: '20px',
                        background: link.color === '#ffffff' ? '#333' : link.color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <link.icon size={32} color={link.color === '#ffffff' ? '#fff' : '#000'} />
                      </div>
                      <div style={{ fontWeight: 700 }}>
                        {link.label}
                      </div>
                      <div style={{ fontSize: '0.9rem', color: '#b0b0ff' }}>
                        {link.stats}
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Final CTA */}
          <div style={{
            marginTop: '8rem',
            padding: '4rem',
            background: 'rgba(0,0,0,0.75)',
            border: '2.5px solid rgba(0,255,255,0.3)',
            borderRadius: '28px',
            textAlign: 'center'
          }}>
            <h2 style={{
              fontSize: 'clamp(3rem, 7vw, 4.8rem)',
              fontWeight: 900,
              color: '#00ffff',
              marginBottom: '2.5rem',
              textShadow: '0 0 40px #00ffff90'
            }}>
              TRANSMISSION READY?
            </h2>

            <div style={{ display: 'flex', gap: '2.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="https://github.com/bhagavan444" target="_blank" style={{
                padding: '1.4rem 3.2rem',
                background: 'rgba(0,255,255,0.14)',
                border: '2.5px solid #00ffff80',
                borderRadius: '999px',
                color: '#00ffff',
                fontWeight: 700,
                fontSize: '1.25rem',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '1.2rem'
              }}>
                <Github size={32} />
                VIEW REPOSITORIES
              </a>

              <a href="mailto:g.sivasatyasaibhagavan@gmail.com" style={{
                padding: '1.4rem 3.2rem',
                background: 'linear-gradient(90deg, #00ffff, #8a2be2)',
                borderRadius: '999px',
                color: '#000',
                fontWeight: 900,
                fontSize: '1.25rem',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '1.2rem'
              }}>
                <Mail size={32} />
                INITIATE CONTACT
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}