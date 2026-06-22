import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

/* ââ Animated SVG workflow graph ââââââââââââââââââââââââââââââ */
const WorkflowSVG: React.FC = () => (
  <svg viewBox="0 0 520 400" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
    <defs>
      <linearGradient id="lineGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#0562EF" stopOpacity="0" />
        <stop offset="50%" stopColor="#0562EF" stopOpacity="1" />
        <stop offset="100%" stopColor="#00C2D8" stopOpacity="0.6" />
      </linearGradient>
      <linearGradient id="lineGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#00C2D8" stopOpacity="0" />
        <stop offset="60%" stopColor="#00C2D8" stopOpacity="1" />
        <stop offset="100%" stopColor="#0562EF" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="nodeGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#0562EF" />
        <stop offset="100%" stopColor="#00C2D8" />
      </linearGradient>
      <linearGradient id="nodeGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#6366f1" />
        <stop offset="100%" stopColor="#a855f7" />
      </linearGradient>
      <linearGradient id="nodeGrad3" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#0562EF" />
        <stop offset="100%" stopColor="#07224F" />
      </linearGradient>
      <filter id="glow1">
        <feGaussianBlur stdDeviation="3" result="blur" />
        <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>
      <filter id="glow2">
        <feGaussianBlur stdDeviation="6" result="blur" />
        <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>
      <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M 0 2 L 9 5 L 0 8 Z" fill="#0562EF" opacity="0.6"/>
      </marker>
      <marker id="arrow2" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M 0 2 L 9 5 L 0 8 Z" fill="#00C2D8" opacity="0.6"/>
      </marker>
    </defs>

    {/* Background grid dots */}
    {Array.from({length: 10}, (_,col) => Array.from({length: 8}, (_,row) => (
      <circle key={`${col}-${row}`} cx={col*56+8} cy={row*50+8} r="1.5"
        fill="#0562EF" opacity="0.07" />
    )))}

    {/* Connection lines with animation */}
    <path d="M 80 100 L 200 100" stroke="url(#lineGrad1)" strokeWidth="1.5" markerEnd="url(#arrow)">
      <animate attributeName="stroke-dasharray" values="0,200;200,0;200,0" dur="2.5s" repeatCount="indefinite" />
      <animate attributeName="stroke-dashoffset" values="200;0;0" dur="2.5s" repeatCount="indefinite" />
    </path>
    <path d="M 280 100 L 380 100" stroke="url(#lineGrad1)" strokeWidth="1.5" markerEnd="url(#arrow)">
      <animate attributeName="stroke-dasharray" values="0,200;200,0;200,0" dur="2.5s" begin="0.5s" repeatCount="indefinite" />
      <animate attributeName="stroke-dashoffset" values="200;0;0" dur="2.5s" begin="0.5s" repeatCount="indefinite" />
    </path>
    <path d="M 200 140 L 200 220 L 280 260" stroke="url(#lineGrad2)" strokeWidth="1.5" markerEnd="url(#arrow2)">
      <animate attributeName="stroke-dasharray" values="0,300;300,0;300,0" dur="3s" begin="1s" repeatCount="indefinite" />
      <animate attributeName="stroke-dashoffset" values="300;0;0" dur="3s" begin="1s" repeatCount="indefinite" />
    </path>
    <path d="M 380 140 L 380 220 L 360 260" stroke="url(#lineGrad2)" strokeWidth="1.5" markerEnd="url(#arrow2)">
      <animate attributeName="stroke-dasharray" values="0,300;300,0;300,0" dur="3s" begin="1.5s" repeatCount="indefinite" />
      <animate attributeName="stroke-dashoffset" values="300;0;0" dur="3s" begin="1.5s" repeatCount="indefinite" />
    </path>
    <path d="M 320 300 L 320 340" stroke="url(#lineGrad1)" strokeWidth="1.5" markerEnd="url(#arrow)">
      <animate attributeName="stroke-dasharray" values="0,80;80,0;80,0" dur="2s" begin="2s" repeatCount="indefinite" />
    </path>

    {/* Node 1 - Problem */}
    <g filter="url(#glow1)">
      <rect x="40" y="72" width="80" height="56" rx="12" fill="white" stroke="rgba(5,98,239,0.2)" strokeWidth="1.5"/>
      <rect x="40" y="72" width="80" height="4" rx="2" fill="url(#nodeGrad1)"/>
      <text x="80" y="100" textAnchor="middle" fontSize="8" fontWeight="700" fill="#07224F" fontFamily="Inter, sans-serif">PROBLEM</text>
      <text x="80" y="113" textAnchor="middle" fontSize="7" fill="#405468" fontFamily="Inter, sans-serif">Submitted</text>
      <circle cx="72" cy="120" r="3" fill="#22c55e">
        <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite"/>
      </circle>
      <text x="79" y="123" fontSize="7" fill="#16a34a" fontWeight="600" fontFamily="Inter, sans-serif">Received</text>
    </g>

    {/* Node 2 - Diagnose */}
    <g filter="url(#glow1)">
      <rect x="200" y="72" width="80" height="56" rx="12" fill="white" stroke="rgba(5,98,239,0.2)" strokeWidth="1.5"/>
      <rect x="200" y="72" width="80" height="4" rx="2" fill="url(#nodeGrad1)"/>
      <text x="240" y="100" textAnchor="middle" fontSize="8" fontWeight="700" fill="#07224F" fontFamily="Inter, sans-serif">DIAGNOSE</text>
      <text x="240" y="113" textAnchor="middle" fontSize="7" fill="#405468" fontFamily="Inter, sans-serif">Workflow mapped</text>
      <rect x="208" y="116" width="48" height="5" rx="2" fill="#E4EFFD"/>
      <rect x="208" y="116" width="36" height="5" rx="2" fill="url(#nodeGrad1)">
        <animate attributeName="width" values="0;36" dur="1.5s" begin="1s" fill="freeze"/>
      </rect>
    </g>

    {/* Node 3 - Blueprint */}
    <g filter="url(#glow1)">
      <rect x="340" y="72" width="90" height="56" rx="12" fill="white" stroke="rgba(5,98,239,0.2)" strokeWidth="1.5"/>
      <rect x="340" y="72" width="90" height="4" rx="2" fill="url(#nodeGrad2)"/>
      <text x="385" y="100" textAnchor="middle" fontSize="8" fontWeight="700" fill="#07224F" fontFamily="Inter, sans-serif">BLUEPRINT</text>
      <text x="385" y="113" textAnchor="middle" fontSize="7" fill="#405468" fontFamily="Inter, sans-serif">Architecture ready</text>
      {[0,1,2].map(i => (
        <g key={i}>
          <circle cx={352 + i*16} cy="122" r="4" fill={i === 0 ? "#0562EF" : i === 1 ? "#6366f1" : "#a855f7"} opacity={i === 2 ? "0.4" : "1"}/>
        </g>
      ))}
    </g>

    {/* Node 4 - Build (center) */}
    <g filter="url(#glow2)">
      <rect x="260" y="240" width="96" height="60" rx="14" fill="url(#nodeGrad3)"/>
      <rect x="261" y="241" width="94" height="58" rx="13" fill="rgba(255,255,255,0.06)"/>
      <text x="308" y="265" textAnchor="middle" fontSize="9" fontWeight="800" fill="white" fontFamily="Inter, sans-serif">BUILD SPRINT</text>
      <text x="308" y="278" textAnchor="middle" fontSize="7" fill="rgba(255,255,255,0.7)" fontFamily="Inter, sans-serif">Agents assigned</text>
      <circle cx="308" cy="292" r="4" fill="rgba(255,255,255,0.15)">
        <animate attributeName="r" values="4;7;4" dur="2s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="1;0;1" dur="2s" repeatCount="indefinite"/>
      </circle>
      <circle cx="308" cy="292" r="3" fill="#00C2D8"/>
    </g>

    {/* Node 5 - Deployed */}
    <g filter="url(#glow1)">
      <rect x="272" y="338" width="72" height="42" rx="10" fill="white" stroke="rgba(34,197,94,0.3)" strokeWidth="1.5"/>
      <text x="308" y="356" textAnchor="middle" fontSize="8" fontWeight="700" fill="#16a34a" fontFamily="Inter, sans-serif">DEPLOYED</text>
      <text x="308" y="369" textAnchor="middle" fontSize="7" fill="#405468" fontFamily="Inter, sans-serif">14h/wk saved</text>
      <animate attributeName="opacity" values="0;1" dur="0.5s" begin="4s" fill="freeze"/>
    </g>

    {/* Floating metric chips */}
    <g>
      <rect x="430" y="200" width="78" height="32" rx="8" fill="white" stroke="rgba(5,98,239,0.15)" strokeWidth="1"/>
      <text x="439" y="213" fontSize="7" fontWeight="700" fill="#07224F" fontFamily="Inter, sans-serif">TIME SAVED</text>
      <text x="439" y="225" fontSize="11" fontWeight="800" fill="#0562EF" fontFamily="Inter, sans-serif">14h/wk</text>
      <animate attributeName="opacity" values="0;1" dur="1s" begin="2s" fill="freeze"/>
    </g>
    <g>
      <rect x="10" y="200" width="72" height="32" rx="8" fill="white" stroke="rgba(99,102,241,0.2)" strokeWidth="1"/>
      <text x="19" y="213" fontSize="7" fontWeight="700" fill="#07224F" fontFamily="Inter, sans-serif">TASKS AUTO</text>
      <text x="19" y="225" fontSize="11" fontWeight="800" fill="#6366f1" fontFamily="Inter, sans-serif">87%</text>
      <animate attributeName="opacity" values="0;1" dur="1s" begin="2.5s" fill="freeze"/>
    </g>
    <g>
      <rect x="430" y="280" width="72" height="32" rx="8" fill="white" stroke="rgba(34,197,94,0.2)" strokeWidth="1"/>
      <text x="439" y="293" fontSize="7" fontWeight="700" fill="#07224F" fontFamily="Inter, sans-serif">EST. ROI</text>
      <text x="439" y="305" fontSize="11" fontWeight="800" fill="#16a34a" fontFamily="Inter, sans-serif">4.2x</text>
      <animate attributeName="opacity" values="0;1" dur="1s" begin="3s" fill="freeze"/>
    </g>
  </svg>
);

/* ââ Animated background orbs âââââââââââââââââââââââââââââââââ */
const BackgroundOrbs: React.FC = () => (
  <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
    {/* Primary blue orb */}
    <div style={{
      position: 'absolute', top: '-10%', right: '-5%',
      width: 'clamp(400px, 50vw, 800px)', height: 'clamp(400px, 50vw, 800px)',
      borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(5,98,239,0.1) 0%, rgba(5,98,239,0.04) 40%, transparent 70%)',
      filter: 'blur(1px)',
    }}/>
    {/* Cyan orb */}
    <div style={{
      position: 'absolute', bottom: '10%', left: '-10%',
      width: 'clamp(300px, 40vw, 600px)', height: 'clamp(300px, 40vw, 600px)',
      borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(0,194,216,0.08) 0%, transparent 70%)',
    }}/>
    {/* Mesh gradient top */}
    <div style={{
      position: 'absolute', top: 0, left: '30%',
      width: '40%', height: '40%',
      background: 'radial-gradient(ellipse, rgba(99,102,241,0.05) 0%, transparent 70%)',
    }}/>
    {/* Dot grid overlay */}
    <div style={{
      position: 'absolute', inset: 0,
      backgroundImage: 'radial-gradient(circle, rgba(5,98,239,0.08) 1px, transparent 1px)',
      backgroundSize: '32px 32px',
      maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)',
    }}/>
  </div>
);

/* ââ Ticker strip ââââââââââââââââââââââââââââââââââââââââââââââ */
const tickers = [
  'Workflow automation', 'AI agents', 'Content pipelines', 'CRM automation',
  'Personal OS', 'Business ops', 'Social media', 'Document AI', 'Reporting', 'SOPs',
];

const TickerStrip: React.FC = () => (
  <div style={{ overflow: 'hidden', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', background: 'var(--bg-snow)', padding: '12px 0', position: 'relative' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '48px', animation: 'ticker 30s linear infinite', width: 'max-content' }}>
      {[...tickers, ...tickers, ...tickers].map((t, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
          <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'var(--c-blue)', opacity: 0.5 }}/>
          <span style={{ fontSize: 'var(--text-12)', fontWeight: 600, color: 'var(--text-muted)', whiteSpace: 'nowrap', letterSpacing: '0.04em', textTransform: 'uppercase' }}>{t}</span>
        </div>
      ))}
    </div>
    <style>{`
      @keyframes ticker { from { transform: translateX(0); } to { transform: translateX(-33.33%); } }
    `}</style>
  </div>
);

/* ââ Social proof avatars ââââââââââââââââââââââââââââââââââââââ */
const SocialProof: React.FC = () => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {['#0562EF','#6366f1','#ec4899','#f97316','#22c55e'].map((c, i) => (
        <div key={i} style={{ width: '28px', height: '28px', borderRadius: '50%', background: c, border: '2px solid white', marginLeft: i === 0 ? 0 : '-8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 700, color: 'white', zIndex: 5 - i }}>{String.fromCharCode(65+i)}</div>
      ))}
    </div>
    <div>
      <div style={{ display: 'flex', gap: '2px', marginBottom: '2px' }}>
        {Array(5).fill(0).map((_,i) => (
          <svg key={i} width="11" height="11" viewBox="0 0 12 12"><polygon points="6,1 7.5,4.5 11,5 8.5,7.5 9,11 6,9.5 3,11 3.5,7.5 1,5 4.5,4.5" fill="#f59e0b"/></svg>
        ))}
      </div>
      <span style={{ fontSize: 'var(--text-11)', color: 'var(--text-muted)', fontWeight: 500 }}>Trusted by 200+ founders &amp; teams</span>
    </div>
  </div>
);

/* ââ Hero ââââââââââââââââââââââââââââââââââââââââââââââââââââââ */
export const Hero: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  useEffect(() => { setTimeout(() => setMounted(true), 100); }, []);

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <>
      <section ref={ref} id="home" style={{
        minHeight: '100vh',
        paddingTop: 'calc(var(--nav-h) + clamp(40px, 6vw, 80px))',
        paddingBottom: 'clamp(48px, 6vw, 80px)',
        position: 'relative',
        background: 'linear-gradient(170deg, #F9FCFF 0%, #F0F5FF 40%, #EDF3FC 100%)',
        overflow: 'hidden',
      }}>
        <BackgroundOrbs />

        <div className="container container--2xl" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 'clamp(32px, 5vw, 80px)',
            alignItems: 'center',
            minHeight: 'calc(100vh - var(--nav-h) - 80px)',
          }} className="hero-grid">

            {/* Left: Copy */}
            <motion.div style={{ y, opacity }}>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={mounted ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
                <div style={{ marginBottom: 'var(--sp-6)' }}>
                  <span className="badge badge--blue">
                    <span className="dot dot--live" style={{ width: '6px', height: '6px' }}/>
                    Automation-first consulting
                  </span>
                </div>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={mounted ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  fontSize: 'clamp(2.4rem, 5vw, 4.5rem)',
                  fontWeight: 900,
                  letterSpacing: 'var(--tracking-tightest)',
                  lineHeight: 1.05,
                  color: 'var(--c-navy-700)',
                  marginBottom: 'var(--sp-6)',
                }}
              >
                Tell us the{' '}
                <span style={{ position: 'relative', display: 'inline-block' }}>
                  <span className="grad-text">problem.</span>
                  <svg style={{ position: 'absolute', bottom: '-4px', left: 0, width: '100%' }} viewBox="0 0 200 8" fill="none" preserveAspectRatio="none">
                    <path d="M 0 6 Q 50 2 100 5 Q 150 8 200 4" stroke="url(#underlineGrad)" strokeWidth="2.5" strokeLinecap="round" fill="none">
                      <animate attributeName="stroke-dasharray" values="0,400;400,0" dur="1.2s" begin="0.8s" fill="freeze"/>
                    </path>
                    <defs>
                      <linearGradient id="underlineGrad" x1="0" y1="0" x2="1" y2="0" gradientUnits="objectBoundingBox">
                        <stop offset="0%" stopColor="#0562EF"/>
                        <stop offset="100%" stopColor="#00C2D8"/>
                      </linearGradient>
                    </defs>
                  </svg>
                </span>
                <br />
                We'll build the{' '}
                <span className="grad-text">system.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={mounted ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
                style={{ fontSize: 'clamp(var(--text-15), 1.3vw, var(--text-18))', color: 'var(--text-secondary)', lineHeight: 'var(--leading-relaxed)', marginBottom: 'var(--sp-10)', maxWidth: '480px' }}
              >
                We design automation workflows, AI agents, and custom tools for work, life, business, and social media. Repetitive chaos turns into repeatable systems.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={mounted ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.38, ease: [0.22, 1, 0.36, 1] }}
                style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: 'var(--sp-10)' }}
              >
                <button className="btn btn--lg btn--primary" onClick={() => scrollTo('audit')}
                  style={{ gap: '10px' }}>
                  Book Automation Audit
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4.5L13 8l-4 3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
                <button className="btn btn--lg btn--ghost" onClick={() => scrollTo('tools')}>
                  Explore AI Tools
                </button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={mounted ? { opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.55 }}
              >
                <SocialProof />
              </motion.div>
            </motion.div>

            {/* Right: SVG dashboard */}
            <motion.div
              initial={{ opacity: 0, x: 32, scale: 0.96 }}
              animate={mounted ? { opacity: 1, x: 0, scale: 1 } : {}}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              style={{ position: 'relative' }}
            >
              {/* Main dashboard card */}
              <div style={{
                background: 'rgba(255,255,255,0.85)',
                backdropFilter: 'blur(24px)',
                border: '1px solid rgba(255,255,255,0.9)',
                borderRadius: 'var(--r-24)',
                padding: 'clamp(16px, 2vw, 28px)',
                boxShadow: '0 32px 80px rgba(7,34,79,0.12), 0 8px 24px rgba(5,98,239,0.08), inset 0 1px 0 rgba(255,255,255,0.8)',
                position: 'relative',
                overflow: 'hidden',
              }}>
                {/* Card header */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ display: 'flex', gap: '5px' }}>
                      {['#FF6058','#FFBD2E','#28C840'].map(c => <div key={c} style={{ width: '10px', height: '10px', borderRadius: '50%', background: c }}/>)}
                    </div>
                    <span style={{ fontSize: 'var(--text-11)', fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.06em', textTransform: 'uppercase', marginLeft: '6px' }}>Automation Console</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)', borderRadius: 'var(--r-full)', padding: '3px 10px' }}>
                    <span className="dot dot--green" style={{ width: '6px', height: '6px' }}/>
                    <span style={{ fontSize: 'var(--text-10)', fontWeight: 700, color: '#16a34a', letterSpacing: '0.06em' }}>LIVE</span>
                  </div>
                </div>

                {/* SVG workflow */}
                <div style={{ height: 'clamp(240px, 30vw, 380px)' }}>
                  <WorkflowSVG />
                </div>
              </div>

              {/* Floating chips */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                style={{ position: 'absolute', top: '-16px', right: '-12px', background: 'white', borderRadius: 'var(--r-12)', padding: '10px 14px', boxShadow: 'var(--sh-lg)', border: '1px solid var(--border)' }}
              >
                <div style={{ fontSize: 'var(--text-10)', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '3px' }}>Manual tasks</div>
                <div style={{ fontSize: 'var(--text-20)', fontWeight: 900, color: '#16a34a', letterSpacing: 'var(--tracking-tighter)' }}>-87%</div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                style={{ position: 'absolute', bottom: '-16px', left: '-16px', background: 'white', borderRadius: 'var(--r-12)', padding: '10px 14px', boxShadow: 'var(--sh-lg)', border: '1px solid var(--border)' }}
              >
                <div style={{ fontSize: 'var(--text-10)', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '3px' }}>Hours saved / wk</div>
                <div style={{ fontSize: 'var(--text-20)', fontWeight: 900, color: 'var(--c-blue)', letterSpacing: 'var(--tracking-tighter)' }}>14h</div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Ticker */}
      <TickerStrip />

      <style>{`
        .hero-grid { grid-template-columns: 1fr 1fr; }
        @media (max-width: 960px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .hero-grid > div:last-child { display: none; }
        }
      `}</style>
    </>
  );
};

export default Hero;
