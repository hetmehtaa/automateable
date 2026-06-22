import React from 'react';
import { motion } from 'framer-motion';
import { Reveal } from '../components/Reveal';

const AnimatedGrid: React.FC = () => (
  <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.15 }} viewBox="0 0 800 400" preserveAspectRatio="xMidYMid slice" fill="none">
    <defs>
      <linearGradient id="ctaGridGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#0562EF" stopOpacity="0"/>
        <stop offset="50%" stopColor="#00C2D8" stopOpacity="1"/>
        <stop offset="100%" stopColor="#6366f1" stopOpacity="0"/>
      </linearGradient>
    </defs>
    {/* Horizontal lines */}
    {[80,160,240,320].map(y => (
      <line key={y} x1="0" y1={y} x2="800" y2={y} stroke="rgba(255,255,255,0.12)" strokeWidth="1">
        <animate attributeName="opacity" values="0.5;1;0.5" dur={`${3 + y/100}s`} repeatCount="indefinite"/>
      </line>
    ))}
    {/* Vertical lines */}
    {[100,200,300,400,500,600,700].map(x => (
      <line key={x} x1={x} y1="0" x2={x} y2="400" stroke="rgba(255,255,255,0.08)" strokeWidth="1"/>
    ))}
    {/* Flowing path */}
    <path d="M 0 200 Q 200 100 400 200 Q 600 300 800 200" stroke="url(#ctaGridGrad)" strokeWidth="2" fill="none" strokeDasharray="20 10">
      <animate attributeName="stroke-dashoffset" from="0" to="-120" dur="4s" repeatCount="indefinite"/>
    </path>
    {/* Node dots */}
    {[[100,200],[300,150],[500,250],[700,180]].map(([x,y],i) => (
      <circle key={i} cx={x} cy={y} r="4" fill="rgba(5,98,239,0.4)">
        <animate attributeName="r" values="4;7;4" dur={`${2+i*0.5}s`} repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0.4;0.9;0.4" dur={`${2+i*0.5}s`} repeatCount="indefinite"/>
      </circle>
    ))}
  </svg>
);

export const CTASection: React.FC = () => (
  <section style={{ background: `linear-gradient(160deg, var(--c-navy-800) 0%, var(--c-navy-900, #040810) 100%)`, padding: 'var(--sec-py) 0', position: 'relative', overflow: 'hidden' }}>
    <AnimatedGrid />
    {/* Glow orb */}
    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '600px', height: '300px', background: 'radial-gradient(ellipse, rgba(5,98,239,0.12) 0%, transparent 70%)', pointerEvents: 'none' }}/>

    <div className="container container--lg" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
      <Reveal>
        <div style={{ marginBottom: 'var(--sp-6)' }}>
          <span className="badge badge--dark">
            <span className="dot dot--live" style={{ width: '6px', height: '6px' }}/>
            Taking new clients
          </span>
        </div>

        <h2 style={{ fontSize: 'clamp(var(--text-32), 5vw, var(--text-64))', fontWeight: 900, letterSpacing: 'var(--tracking-tightest)', lineHeight: 'var(--leading-tight)', color: 'white', marginBottom: 'var(--sp-6)' }}>
          Your workflow is the product.
          <br/>
          <span style={{ background: 'linear-gradient(135deg, #89BDFF 0%, #00C2D8 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            Let us build a better one.
          </span>
        </h2>

        <p style={{ fontSize: 'clamp(var(--text-15), 1.3vw, var(--text-18))', color: 'rgba(255,255,255,0.5)', lineHeight: 'var(--leading-relaxed)', marginBottom: 'var(--sp-10)', maxWidth: '520px', margin: '0 auto var(--sp-10)' }}>
          Start with an audit. Get clarity on exactly what to automate, which tools to use, and what you will save. No commitment required.
        </p>

        <div style={{ display: 'flex', gap: 'var(--sp-4)', justifyContent: 'center', flexWrap: 'wrap', marginBottom: 'var(--sp-12)' }}>
          <motion.button
            whileHover={{ y: -2, boxShadow: '0 12px 40px rgba(255,255,255,0.2)' }}
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', height: '54px', padding: '0 32px', background: 'white', color: 'var(--c-navy-700)', border: 'none', borderRadius: 'var(--r-12)', fontSize: 'var(--text-15)', fontWeight: 800, cursor: 'pointer', letterSpacing: 'var(--tracking-snug)' }}>
            Book an Automation Audit
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4.5L13 8l-4 3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </motion.button>
          <motion.button
            whileHover={{ y: -2, borderColor: 'rgba(255,255,255,0.4)' }}
            onClick={() => document.getElementById('tools')?.scrollIntoView({ behavior: 'smooth' })}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', height: '54px', padding: '0 28px', background: 'transparent', color: 'rgba(255,255,255,0.75)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 'var(--r-12)', fontSize: 'var(--text-15)', fontWeight: 600, cursor: 'pointer', letterSpacing: 'var(--tracking-snug)', transition: 'border-color 0.2s ease' }}>
            Explore AI Tools
          </motion.button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'clamp(24px, 4vw, 60px)', flexWrap: 'wrap' }}>
          {[
            { value: '3-5 days', label: 'Audit turnaround' },
            { value: 'Fixed scope', label: 'No surprise billing' },
            { value: 'Diagnosis first', label: 'Always' },
          ].map(m => (
            <div key={m.label} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 'clamp(var(--text-18), 2vw, var(--text-24))', fontWeight: 800, color: 'white', letterSpacing: 'var(--tracking-tight)', marginBottom: '4px' }}>{m.value}</div>
              <div style={{ fontSize: 'var(--text-11)', color: 'rgba(255,255,255,0.3)', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{m.label}</div>
            </div>
          ))}
        </div>
      </Reveal>
    </div>
  </section>
);

export default CTASection;
