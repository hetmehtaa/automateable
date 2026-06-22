import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { PageLayout } from '../components/PageLayout';
import { Footer } from '../sections/Footer';

/* ====================================================================
   ANIMATED COUNTER
   ==================================================================== */
const Counter: React.FC<{ val: string; unit: string; label: string }> = ({ val, unit, label }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  return (
    <div ref={ref} style={{ textAlign: 'center', padding: '20px 24px' }}>
      <motion.div initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}
        style={{ display: 'flex', alignItems: 'baseline', gap: 3, justifyContent: 'center', marginBottom: 5 }}>
        <span style={{ fontFamily: 'var(--mono)', fontSize: 'clamp(var(--f24),2.5vw,var(--f36))', fontWeight: 800, color: 'var(--ink-0)', letterSpacing: '-0.05em' }}>{val}</span>
        <span style={{ fontFamily: 'var(--mono)', fontSize: 'var(--f14)', color: 'var(--ink-4)', fontWeight: 500 }}>{unit}</span>
      </motion.div>
      <div style={{ fontSize: 'var(--f12)', color: 'var(--ink-3)', fontWeight: 500 }}>{label}</div>
    </div>
  );
};

/* ====================================================================
   ANIMATED PIPELINE SVG
   ==================================================================== */
const PipelineSVG: React.FC<{ className?: string }> = ({ className }) => {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true });
  return (
    <svg ref={ref} viewBox="0 0 560 320" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={{ width: '100%', height: '100%', overflow: 'visible' }} aria-hidden="true">
      <defs>
        <linearGradient id="pg1" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#1d4ed8" stopOpacity="0"/>
          <stop offset="50%" stopColor="#1d4ed8"/>
          <stop offset="100%" stopColor="#60a5fa" stopOpacity="0.5"/>
        </linearGradient>
        <linearGradient id="pg2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1d4ed8"/>
          <stop offset="100%" stopColor="#15803d"/>
        </linearGradient>
        <filter id="pf1"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      </defs>

      {/* Grid */}
      {Array.from({ length: 10 }, (_, c) => Array.from({ length: 7 }, (_, r) => (
        <circle key={`${c}-${r}`} cx={c * 60 + 10} cy={r * 48 + 10} r="1.2" fill="rgba(29,78,216,0.07)" />
      )))}

      {/* Connection lines */}
      {[
        { d: 'M 96 88 L 176 88',       delay: 400 },
        { d: 'M 304 88 L 380 88',      delay: 700 },
        { d: 'M 460 128 L 460 192',    delay: 1000 },
        { d: 'M 460 192 L 380 224',    delay: 1200 },
        { d: 'M 176 128 L 176 192',    delay: 900 },
        { d: 'M 176 192 L 256 224',    delay: 1100 },
        { d: 'M 320 264 L 320 304',    delay: 1500 },
      ].map((p, i) => (
        <motion.path key={i} d={p.d} stroke="url(#pg1)" strokeWidth="1.5" strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={inView ? { pathLength: 1, opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: p.delay / 1000, ease: [0.22, 1, 0.36, 1] }} />
      ))}

      {/* Nodes */}
      {[
        { x: 48,  y: 64,  w: 96,  h: 48, label: 'INPUT',     sub: 'Problem submitted', c: '#1d4ed8', done: true  },
        { x: 176, y: 64,  w: 128, h: 48, label: 'DIAGNOSE',  sub: 'Workflow mapped',   c: '#1d4ed8', done: true  },
        { x: 380, y: 64,  w: 96,  h: 48, label: 'BLUEPRINT', sub: 'Architecture',      c: '#7c3aed', done: false },
        { x: 176, y: 200, w: 160, h: 48, label: 'BUILD',     sub: 'Agents deployed',   c: '#15803d', done: false },
        { x: 380, y: 200, w: 96,  h: 48, label: 'VERIFY',    sub: 'System tested',     c: '#d97706', done: false },
        { x: 272, y: 280, w: 96,  h: 36, label: 'LIVE',      sub: '14h/wk saved',      c: '#15803d', done: true  },
      ].map((n, i) => (
        <motion.g key={n.label} filter="url(#pf1)"
          initial={{ opacity: 0, y: 12, scale: 0.92 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.5, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}>
          <rect x={n.x - n.w / 2} y={n.y - n.h / 2} width={n.w} height={n.h} rx="8"
            fill={n.done ? `${n.c}12` : 'rgba(255,255,255,0.6)'} stroke={n.c} strokeWidth={n.done ? 1.5 : 1} strokeOpacity={n.done ? 0.8 : 0.25} />
          <rect x={n.x - n.w / 2} y={n.y - n.h / 2} width={n.w} height="2.5" rx="1.2" fill={n.c} opacity={n.done ? 0.8 : 0.3} />
          <text x={n.x} y={n.y - 5} textAnchor="middle" fontSize="8.5" fontWeight="700" fill={n.done ? n.c : 'var(--ink-3)'} fontFamily="JetBrains Mono,monospace" letterSpacing="0.07em">{n.label}</text>
          <text x={n.x} y={n.y + 10} textAnchor="middle" fontSize="8" fill="var(--ink-3)" fontFamily="Inter,sans-serif">{n.sub}</text>
          {n.done && n.label !== 'LIVE' && (
            <circle cx={n.x + n.w / 2 - 10} cy={n.y - n.h / 2 + 10} r="3.5" fill={n.c} opacity="0.8">
              <animate attributeName="opacity" values="0.8;0.3;0.8" dur="2.2s" repeatCount="indefinite"/>
            </circle>
          )}
          {n.label === 'LIVE' && (
            <>
              <circle cx={n.x + n.w / 2 - 8} cy={n.y - n.h / 2 + 10} r="3.5" fill="#15803d">
                <animate attributeName="r" values="3.5;5;3.5" dur="2s" repeatCount="indefinite"/>
                <animate attributeName="opacity" values="0.9;0.2;0.9" dur="2s" repeatCount="indefinite"/>
              </circle>
            </>
          )}
        </motion.g>
      ))}

      {/* Floating metrics */}
      {[
        { x: 10,  y: 200, val: '14h/wk', sub: 'RECOVERED',  c: '#1d4ed8', delay: 1.4 },
        { x: 468, y: 268, val: '4.2x',   sub: 'ROI',        c: '#15803d', delay: 1.7 },
      ].map(m => (
        <motion.g key={m.sub} initial={{ opacity: 0, scale: 0.85 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ delay: m.delay }}>
          <rect x={m.x} y={m.y} width="72" height="38" rx="7" fill="white" stroke="rgba(0,0,0,0.07)" strokeWidth="1" />
          <text x={m.x + 36} y={m.y + 16} textAnchor="middle" fontSize="15" fontWeight="800" fill={m.c} fontFamily="JetBrains Mono,monospace" letterSpacing="-0.03em">{m.val}</text>
          <text x={m.x + 36} y={m.y + 30} textAnchor="middle" fontSize="7.5" fontWeight="600" fill="var(--ink-4)" fontFamily="Inter,sans-serif" letterSpacing="0.07em">{m.sub}</text>
        </motion.g>
      ))}
    </svg>
  );
};

/* ====================================================================
   PROBLEM CARDS (jitter chaos)
   ==================================================================== */
const problems = [
  { text: '6 hrs/week on reports',         rotate: -2.1, x: '6%',  y: '12%', delay: 0.05 },
  { text: 'Leads in 5 different tools',     rotate: 1.8,  x: '58%', y: '8%',  delay: 0.15 },
  { text: 'Content dies after week one',    rotate: -1.3, x: '28%', y: '26%', delay: 0.28 },
  { text: 'Approvals on WhatsApp',          rotate: 2.4,  x: '70%', y: '30%', delay: 0.10 },
  { text: 'CRM entry still manual',         rotate: -0.9, x: '12%', y: '46%', delay: 0.42 },
  { text: 'Dashboards take a full day',     rotate: 1.6,  x: '52%', y: '50%', delay: 0.20 },
  { text: 'Onboarding in someone\'s head',  rotate: -2.3, x: '4%',  y: '62%', delay: 0.33 },
  { text: 'Follow-ups fall through gaps',   rotate: 1.2,  x: '74%', y: '60%', delay: 0.48 },
  { text: 'SOPs in 3 places, all outdated', rotate: -1.6, x: '36%', y: '74%', delay: 0.22 },
  { text: 'Invoicing still copy-paste',     rotate: 0.8,  x: '20%', y: '80%', delay: 0.38 },
];

const ProblemCard: React.FC<{ text: string; rotate: number; x: string; y: string; delay: number; absorbed: boolean }> = ({ text, rotate, x, y, delay, absorbed }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={absorbed ? { opacity: 0, scale: 0.4, y: -80, filter: 'blur(4px)' } : { opacity: 1, scale: 1, filter: 'blur(0px)' }}
    transition={absorbed ? { duration: 0.45, ease: [0.55, 0, 0.78, 0] } : { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    style={{
      position: 'absolute', left: x, top: y,
      background: 'white',
      border: '1px solid rgba(0,0,0,0.08)',
      borderLeft: '2.5px solid var(--amber)',
      borderRadius: 'var(--r-6)',
      padding: '7px 12px',
      fontSize: 'var(--f12)',
      color: 'var(--ink-1)',
      rotate: `${rotate}deg`,
      boxShadow: '0 2px 8px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)',
      cursor: 'default', whiteSpace: 'nowrap', userSelect: 'none',
      animation: !absorbed ? 'jitter 4s ease-in-out infinite' : 'none',
      animationDelay: `${delay + 0.6}s`,
    }}
  >
    {text}
  </motion.div>
);

/* ====================================================================
   ANIMATED LOG TERMINAL
   ==================================================================== */
const logs = [
  { t: 'dim',    time: '09:04:12', msg: '$ automateable scan --workflow "weekly reporting"' },
  { t: 'active', time: '09:04:13', msg: 'Initializing workflow analysis' },
  { t: 'warn',   time: '09:04:13', msg: 'Manual delay detected: report compilation (3.0h/wk)' },
  { t: 'ok',     time: '09:04:14', msg: 'Automation candidate: CRM data entry (2.0h/wk)' },
  { t: 'warn',   time: '09:04:14', msg: 'Bottleneck: approval loop via WhatsApp (avg 4.2h)' },
  { t: 'ok',     time: '09:04:15', msg: 'Quick win: follow-up sequences (saves 1.5h/wk)' },
  { t: 'ok',     time: '09:04:16', msg: 'ROI estimate: $2,340/mo @ $75/hr avg' },
  { t: 'ok',     time: '09:04:17', msg: 'Blueprint ready ÃÂ¢ 6 automations, 3 quick wins' },
];
const logColors: Record<string, string> = { dim: 'var(--ink-4)', active: 'var(--blue)', warn: 'var(--amber)', ok: 'var(--green)' };

const Terminal: React.FC = () => (
  <div style={{ background: 'var(--ink-0)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 'var(--r-12)', overflow: 'hidden', boxShadow: '0 24px 64px rgba(0,0,0,0.3)' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '10px 16px', borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.03)' }}>
      {['#ff5f57','#febc2e','#28c840'].map(c => <div key={c} style={{ width: 9, height: 9, borderRadius: '50%', background: c }}/>)}
      <span style={{ fontFamily: 'var(--mono)', fontSize: 'var(--f10)', color: 'rgba(255,255,255,0.3)', marginLeft: 6 }}>workflow-scan.log</span>
    </div>
    <div style={{ padding: '14px 18px', display: 'flex', flexDirection: 'column', gap: 3 }}>
      {logs.map((l, i) => (
        <motion.div key={i} initial={{ opacity: 0, x: -8 }} whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.3 }}
          style={{ display: 'flex', gap: 10, alignItems: 'baseline' }}>
          <span style={{ fontFamily: 'var(--mono)', fontSize: 'var(--f10)', color: 'rgba(255,255,255,0.2)', flexShrink: 0 }}>{l.time}</span>
          <span style={{ fontFamily: 'var(--mono)', fontSize: 'var(--f12)', color: logColors[l.t], lineHeight: 1.6 }}>{l.msg}</span>
        </motion.div>
      ))}
    </div>
  </div>
);

/* ====================================================================
   SERVICES LIST
   ==================================================================== */
const services = [
  { n: '01', title: 'Automation Consulting',       tag: 'Strategy',    href: '/services' },
  { n: '02', title: 'Custom AI Agents',            tag: 'Build',       href: '/services' },
  { n: '03', title: 'AI Tool Implementation',      tag: 'Integration', href: '/services' },
  { n: '04', title: 'Social Media Automation',     tag: 'Content',     href: '/services' },
  { n: '05', title: 'Personal Automation',         tag: 'Personal',    href: '/services' },
  { n: '06', title: 'Business Process Automation', tag: 'Ops',         href: '/services' },
];

/* ====================================================================
   HOME PAGE
   ==================================================================== */
export const HomePage: React.FC = () => {
  const [absorbed, setAbsorbed] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '14%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  useEffect(() => { setTimeout(() => setLoaded(true), 60); }, []);
  useEffect(() => {
    return scrollYProgress.on('change', v => { if (v > 0.22 && !absorbed) setAbsorbed(true); });
  }, [absorbed, scrollYProgress]);

  return (
    <PageLayout title="Turn messy workflows into automated systems">
      {/* ===== HERO ===== */}
      <section ref={heroRef} style={{ minHeight: '100vh', position: 'relative', overflow: 'hidden', background: 'var(--paper)' }} className="blueprint-bg">
        <div className="scan-line" aria-hidden="true" />

        <motion.div style={{ y: heroY, opacity: heroOpacity }}>
          <div className="w" style={{ paddingTop: 'clamp(52px,8vh,88px)', paddingBottom: 'clamp(40px,5vh,64px)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(32px,5vw,72px)', alignItems: 'center', minHeight: 'calc(100vh - var(--topbar-h) - 100px)' }} className="hero-g">

              {/* LEFT */}
              <div>
                <motion.div initial={{ opacity: 0, y: 12 }} animate={loaded ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.4 }}
                  style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 28 }}>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 12px', background: 'white', border: '1px solid var(--border-2)', borderRadius: 'var(--r-full)', boxShadow: 'var(--sh-sm)' }}>
                    <span className="dot dot--live" style={{ width: 5, height: 5 }} />
                    <span style={{ fontFamily: 'var(--mono)', fontSize: 'var(--f10)', color: 'var(--ink-3)', letterSpacing: '0.07em' }}>Accepting new clients</span>
                  </div>
                </motion.div>

                <motion.h1 initial={{ opacity: 0, y: 22 }} animate={loaded ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.65, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
                  style={{ fontSize: 'clamp(2.6rem,5.5vw,4.6rem)', fontWeight: 900, letterSpacing: '-0.055em', lineHeight: 0.96, color: 'var(--ink-0)', marginBottom: 24 }}>
                  Bring the mess.
                  <br />
                  <span style={{ background: 'linear-gradient(125deg,#1d4ed8 0%,#3b82f6 50%,#0ea5e9 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                    We build
                    <br />
                    the system.
                  </span>
                </motion.h1>

                <motion.p initial={{ opacity: 0, y: 14 }} animate={loaded ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, delay: 0.18 }}
                  style={{ fontSize: 'var(--f16)', color: 'var(--ink-2)', lineHeight: 1.7, maxWidth: 420, marginBottom: 32 }}>
                  Automation consulting, AI agents, and custom tools for workflows that should not still be manual.
                </motion.p>

                <motion.div initial={{ opacity: 0, y: 10 }} animate={loaded ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.28 }}
                  style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 36 }}>
                  <Link to="/audit" className="btn btn--xl btn--primary">Map my workflow</Link>
                  <Link to="/services" className="btn btn--xl btn--ghost">See services</Link>
                </motion.div>

                <motion.div initial={{ opacity: 0 }} animate={loaded ? { opacity: 1 } : {}} transition={{ delay: 0.45 }}
                  style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {[
                    { code: 'P.01', text: 'Diagnose before building' },
                    { code: 'P.02', text: 'Systems over tools' },
                    { code: 'P.03', text: 'Measurable outcomes only' },
                    { code: 'P.04', text: 'Fixed scope, honest pricing' },
                  ].map((p, i) => (
                    <motion.div key={p.code} initial={{ opacity: 0, x: -8 }} animate={loaded ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.45 + i * 0.07 }}
                      style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                      <span style={{ fontFamily: 'var(--mono)', fontSize: 'var(--f10)', color: 'var(--ink-4)', fontWeight: 600, flexShrink: 0, width: 32 }}>{p.code}</span>
                      <span style={{ width: 3, height: 3, borderRadius: '50%', background: 'var(--border-3)', flexShrink: 0 }} aria-hidden="true" />
                      <span style={{ fontSize: 'var(--f13)', color: 'var(--ink-3)' }}>{p.text}</span>
                    </motion.div>
                  ))}
                </motion.div>
              </div>

              {/* RIGHT: problem intake */}
              <motion.div initial={{ opacity: 0, x: 28, scale: 0.96 }} animate={loaded ? { opacity: 1, x: 0, scale: 1 } : {}} transition={{ duration: 0.75, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
                style={{ position: 'relative', height: 'clamp(380px,45vw,500px)' }}>

                {/* Central intake orb */}
                <motion.div
                  animate={{ scale: absorbed ? [1, 1.15, 1] : 1, boxShadow: absorbed ? '0 0 60px rgba(29,78,216,0.3)' : '0 0 20px rgba(29,78,216,0.1)' }}
                  transition={{ duration: 0.6 }}
                  style={{ position: 'absolute', left: '50%', top: '46%', transform: 'translate(-50%,-50%)', width: 84, height: 84, borderRadius: '50%', background: 'white', border: '1.5px solid var(--border-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 32px rgba(0,0,0,0.08)', zIndex: 10 }}>
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <circle cx="16" cy="16" r="5" fill="var(--ink-0)" opacity="0.9"/>
                    <circle cx="16" cy="16" r="11" stroke="var(--border-2)" strokeWidth="1.5" fill="none"/>
                    <circle cx="16" cy="16" r="15" stroke="rgba(0,0,0,0.04)" strokeWidth="1" fill="none"/>
                    {absorbed && <circle cx="16" cy="16" r="8" stroke="var(--blue)" strokeWidth="1" fill="none" strokeDasharray="4 4">
                      <animateTransform attributeName="transform" type="rotate" from="0 16 16" to="360 16 16" dur="3s" repeatCount="indefinite"/>
                    </circle>}
                  </svg>
                </motion.div>

                <div style={{ position: 'absolute', left: '50%', top: 'calc(46% + 52px)', transform: 'translateX(-50%)', textAlign: 'center', zIndex: 10 }}>
                  <span style={{ fontFamily: 'var(--mono)', fontSize: 'var(--f10)', color: 'var(--ink-4)', letterSpacing: '0.07em', whiteSpace: 'nowrap' }}>
                    {absorbed ? 'PROCESSING' : 'Workflow Intake'}
                  </span>
                </div>

                {/* Floating problem cards */}
                {problems.map((p, i) => <ProblemCard key={i} {...p} absorbed={absorbed} />)}
              </motion.div>
            </div>
          </div>

          {/* Scroll cue */}
          <motion.div initial={{ opacity: 0 }} animate={loaded ? { opacity: 1 } : {}} transition={{ delay: 1.4 }}
            style={{ position: 'absolute', bottom: 28, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5 }}>
            <span style={{ fontFamily: 'var(--mono)', fontSize: 'var(--f9)', color: 'var(--ink-4)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Scroll</span>
            <motion.div animate={{ y: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 5.5l4 4 4-4" stroke="var(--ink-4)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* ===== STAT BAR ===== */}
      <section style={{ background: 'white', borderBlock: '1px solid var(--border)' }}>
        <div className="w" style={{ paddingBlock: 0 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)' }} className="stat-g">
            {[
              { val: '14h',  unit: '/wk',  label: 'Avg time recovered'   },
              { val: '87%',  unit: '',     label: 'Tasks automated'       },
              { val: '3-5',  unit: ' days',label: 'Audit to blueprint'    },
              { val: '4.2x', unit: '',     label: 'Average ROI'           },
            ].map((s, i) => (
              <div key={s.label} style={{ borderRight: i < 3 ? '1px solid var(--border)' : 'none' }}>
                <Counter {...s} />
              </div>
            ))}
          </div>
        </div>
        <style>{`.stat-g{grid-template-columns:repeat(4,1fr)}@media(max-width:640px){.stat-g{grid-template-columns:repeat(2,1fr)}}`}</style>
      </section>

      {/* ===== PIPELINE VISUALIZATION ===== */}
      <section style={{ background: 'var(--paper)', borderBottom: '1px solid var(--border)', padding: 'clamp(64px,8vw,112px) 0' }}>
        <div className="w">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(32px,5vw,72px)', alignItems: 'center' }} className="pipeline-g">
            <motion.div initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}>
              <div className="label" style={{ marginBottom: 14 }}>The transformation</div>
              <h2 style={{ fontSize: 'clamp(var(--f28),3.5vw,var(--f48))', fontWeight: 900, letterSpacing: '-0.045em', lineHeight: 1.05, color: 'var(--ink-0)', marginBottom: 16 }}>
                Messy input.<br />Clean system output.
              </h2>
              <p style={{ fontSize: 'var(--f15)', color: 'var(--ink-2)', lineHeight: 1.7, marginBottom: 28, maxWidth: 400 }}>
                We map every step in your current workflow, find what to automate, build the system, and verify it works. Every engagement starts with diagnosis.
              </p>
              <Link to="/audit" className="btn btn--lg btn--primary">Start with an audit</Link>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.1 }}
              style={{ height: 'clamp(260px,32vw,340px)' }}>
              <PipelineSVG />
            </motion.div>
          </div>
        </div>
        <style>{`.pipeline-g{grid-template-columns:1fr 1fr}@media(max-width:800px){.pipeline-g{grid-template-columns:1fr!important}}`}</style>
      </section>

      {/* ===== TERMINAL LOG ===== */}
      <section style={{ background: 'white', borderBottom: '1px solid var(--border)', padding: 'clamp(64px,8vw,112px) 0' }}>
        <div className="w">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(32px,5vw,72px)', alignItems: 'center' }} className="terminal-g">
            <motion.div initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}>
              <Terminal />
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}>
              <div className="label" style={{ marginBottom: 14 }}>Workflow diagnosis</div>
              <h2 style={{ fontSize: 'clamp(var(--f28),3.5vw,var(--f48))', fontWeight: 900, letterSpacing: '-0.045em', lineHeight: 1.05, color: 'var(--ink-0)', marginBottom: 16 }}>
                We find what is broken<br />before we build.
              </h2>
              <p style={{ fontSize: 'var(--f15)', color: 'var(--ink-2)', lineHeight: 1.7, marginBottom: 28, maxWidth: 400 }}>
                Every automation audit maps your current process step by step, finds bottlenecks, quantifies time lost, and ranks opportunities by impact vs. effort.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 32 }}>
                {['Workflow map of every step', 'Automation opportunities ranked', 'Tool recommendations', 'ROI and time savings estimate'].map((item, i) => (
                  <motion.div key={item} initial={{ opacity: 0, x: -8 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 + i * 0.07 }}
                    style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0 }}>
                      <circle cx="7" cy="7" r="6" fill="var(--blue-lo)" stroke="var(--blue-line)" strokeWidth="1"/>
                      <path d="M4 7l2.5 2.5L10 4.5" stroke="var(--blue)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span style={{ fontSize: 'var(--f13)', color: 'var(--ink-2)' }}>{item}</span>
                  </motion.div>
                ))}
              </div>
              <Link to="/audit" className="btn btn--lg btn--ghost">See audit deliverables</Link>
            </motion.div>
          </div>
        </div>
        <style>{`.terminal-g{grid-template-columns:1fr 1fr}@media(max-width:800px){.terminal-g{grid-template-columns:1fr!important}}`}</style>
      </section>

      {/* ===== SERVICES ===== */}
      <section style={{ background: 'var(--paper)', borderBottom: '1px solid var(--border)', padding: 'clamp(64px,8vw,112px) 0' }}>
        <div className="w">
          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 48, flexWrap: 'wrap', gap: 16 }}>
            <div>
              <div className="label" style={{ marginBottom: 12 }}>What we build</div>
              <h2 style={{ fontSize: 'clamp(var(--f28),3.5vw,var(--f48))', fontWeight: 900, letterSpacing: '-0.045em', color: 'var(--ink-0)' }}>Services</h2>
            </div>
            <Link to="/services" className="btn btn--md btn--ghost">
              View all
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M3 6.5h7M7 4l3 2.5-3 2.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </Link>
          </motion.div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {services.map((s, i) => (
              <motion.div key={s.n} initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                <Link to={s.href} style={{ textDecoration: 'none', display: 'block' }}>
                  <motion.div whileHover={{ x: 6, backgroundColor: 'rgba(255,255,255,0.8)' }} transition={{ duration: 0.15 }}
                    style={{ display: 'flex', alignItems: 'center', gap: 20, padding: '16px 12px', borderBottom: '1px solid var(--border)', cursor: 'pointer', borderRadius: 'var(--r-6)', transition: 'background 0.15s' }}>
                    <span style={{ fontFamily: 'var(--mono)', fontSize: 'var(--f11)', fontWeight: 600, color: 'var(--ink-4)', width: 28, flexShrink: 0 }}>{s.n}</span>
                    <span style={{ fontSize: 'var(--f16)', fontWeight: 600, color: 'var(--ink-0)', flex: 1, letterSpacing: '-0.02em' }}>{s.title}</span>
                    <span className="chip chip--muted">{s.tag}</span>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ color: 'var(--ink-4)', flexShrink: 0 }}>
                      <path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== DARK CTA ===== */}
      <section style={{ background: 'var(--ink-0)', position: 'relative', overflow: 'hidden', padding: 'clamp(72px,9vw,120px) 0' }} className="dark-section">
        <div className="blueprint-bg-anim" style={{ position: 'absolute', inset: 0, opacity: 0.15 }} aria-hidden="true" />

        {/* Floating accent orbs */}
        <div style={{ position: 'absolute', top: '20%', right: '8%', width: 240, height: 240, borderRadius: '50%', background: 'radial-gradient(circle,rgba(29,78,216,0.2) 0%,transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '15%', left: '5%', width: 180, height: 180, borderRadius: '50%', background: 'radial-gradient(circle,rgba(21,128,61,0.15) 0%,transparent 70%)', pointerEvents: 'none' }} />

        <div className="w w--md" style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '5px 14px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.09)', borderRadius: 'var(--r-full)', marginBottom: 28 }}>
              <span className="dot dot--live" style={{ width: 5, height: 5 }} />
              <span style={{ fontFamily: 'var(--mono)', fontSize: 'var(--f10)', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.08em' }}>Taking new clients</span>
            </div>

            <h2 style={{ fontSize: 'clamp(var(--f28),4.5vw,var(--f56))', fontWeight: 900, letterSpacing: '-0.05em', lineHeight: 1.0, color: 'white', marginBottom: 16 }}>
              Your workflow is the product.
              <br />
              <span style={{ background: 'linear-gradient(125deg,#60a5fa 0%,#34d399 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Let us build a better one.
              </span>
            </h2>

            <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 'var(--f15)', marginBottom: 36, maxWidth: 420, margin: '0 auto 36px' }}>
              Fixed-scope audit. Clear deliverables. Diagnosis before building. Starting at $497.
            </p>

            <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/audit" className="btn btn--xl" style={{ background: 'white', color: 'var(--ink-0)', border: 'none', borderRadius: 'var(--r-8)' }}>
                Book an Audit
              </Link>
              <Link to="/contact" className="btn btn--xl" style={{ background: 'transparent', color: 'rgba(255,255,255,0.75)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 'var(--r-8)' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.35)'; (e.currentTarget as HTMLElement).style.color = 'white'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.15)'; (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.75)'; }}>
                Talk first
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />

      <style>{`
        .hero-g { grid-template-columns: 1fr 1fr; }
        @media (max-width: 880px) {
          .hero-g { grid-template-columns: 1fr !important; }
          .hero-g > div:last-child { display: none; }
        }
      `}</style>
    </PageLayout>
  );
};

export default HomePage;
