import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { PageLayout } from '../components/PageLayout';
import { Footer } from '../sections/Footer';

/* ============================================================
   MESSY PROBLEMS - float and jitter
   ============================================================ */
const messyProblems = [
  { text: 'I spend 6 hrs/week on reports',     rotate: -2.1, x: '8%',  y: '18%', delay: 0    },
  { text: 'Leads spread across 5 tools',        rotate: 1.4,  x: '62%', y: '12%', delay: 0.15 },
  { text: 'Content dies after the first post',  rotate: -1.2, x: '32%', y: '28%', delay: 0.3  },
  { text: 'Approvals happen on WhatsApp',        rotate: 2.3,  x: '72%', y: '32%', delay: 0.1  },
  { text: 'CRM data entry still manual',         rotate: -0.8, x: '18%', y: '48%', delay: 0.45 },
  { text: 'Monthly dashboards take a day',       rotate: 1.7,  x: '55%', y: '52%', delay: 0.2  },
  { text: 'Onboarding lives in someone\'s head', rotate: -2.5, x: '5%',  y: '65%', delay: 0.35 },
  { text: 'Follow-ups slip through cracks',      rotate: 1.1,  x: '78%', y: '62%', delay: 0.5  },
  { text: 'SOPs exist in 3 places, outdated',   rotate: -1.5, x: '40%', y: '75%', delay: 0.25 },
  { text: 'Invoicing still copy-paste',          rotate: 0.9,  x: '22%', y: '82%', delay: 0.4  },
];

const ProblemCard: React.FC<{ text: string; rotate: number; x: string; y: string; delay: number; absorbed: boolean }> = ({ text, rotate, x, y, delay, absorbed }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.85 }}
    animate={absorbed ? { opacity: 0, scale: 0.5, y: -60 } : { opacity: 1, scale: 1 }}
    transition={absorbed
      ? { duration: 0.4, ease: [0.55, 0, 0.78, 0] }
      : { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }
    }
    style={{
      position: 'absolute', left: x, top: y,
      background: 'white',
      border: '1px solid var(--border-2)',
      borderRadius: 'var(--r-8)',
      padding: '8px 12px',
      fontSize: 'var(--f12)',
      color: 'var(--ink-1)',
      fontFamily: 'var(--font)',
      rotate: `${rotate}deg`,
      boxShadow: 'var(--sh-sm)',
      cursor: 'default',
      whiteSpace: 'nowrap',
      userSelect: 'none',
      animation: !absorbed ? 'jitter 3.5s ease-in-out infinite' : 'none',
      animationDelay: `${delay + 0.5}s`,
      maxWidth: 220,
      lineHeight: 1.3,
    }}
  >
    <span style={{ marginRight: 6, color: 'var(--amber)', fontSize: 10 }}>!</span>
    {text}
  </motion.div>
);

/* ============================================================
   WORKFLOW NODE (for the "after" visualization)
   ============================================================ */
const WorkflowNode: React.FC<{ label: string; sub: string; color: string; delay: number }> = ({ label, sub, color, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    style={{
      background: 'white',
      border: `1px solid ${color}40`,
      borderTop: `2px solid ${color}`,
      borderRadius: 'var(--r-8)',
      padding: '12px 16px',
      minWidth: 140,
    }}
  >
    <div style={{ fontFamily: 'var(--mono)', fontSize: 'var(--f10)', color, fontWeight: 600, letterSpacing: '0.08em', marginBottom: 4 }}>{label}</div>
    <div style={{ fontSize: 'var(--f12)', color: 'var(--ink-2)', lineHeight: 1.4 }}>{sub}</div>
  </motion.div>
);

/* ============================================================
   LOG STREAM
   ============================================================ */
const logLines = [
  { time: '09:04:12', msg: 'Workflow scan initiated', tag: 'INFO',   tagCls: 'log-tag--active' },
  { time: '09:04:13', msg: 'Step 1: Report generation ÃÂ¢ manual delay detected', tag: 'WARN', tagCls: 'log-tag--warn' },
  { time: '09:04:13', msg: 'Step 2: CRM entry ÃÂ¢ automation candidate', tag: 'OK',   tagCls: 'log-tag--ok' },
  { time: '09:04:14', msg: 'Bottleneck found: approval on WhatsApp (avg 4.2h)', tag: 'WARN', tagCls: 'log-tag--warn' },
  { time: '09:04:15', msg: 'Duplicate step removed: 2 redundant data transfers', tag: 'OK',  tagCls: 'log-tag--ok' },
  { time: '09:04:16', msg: 'Agent assigned: Report builder (saves 5.8h/wk)', tag: 'OK',  tagCls: 'log-tag--ok' },
  { time: '09:04:17', msg: 'ROI estimate: $2,340/mo at $75/hr avg', tag: 'OK',  tagCls: 'log-tag--ok' },
  { time: '09:04:18', msg: 'Blueprint ready. 6 automations identified.', tag: 'DONE', tagCls: 'log-tag--ok' },
];

/* ============================================================
   STATS
   ============================================================ */
const stats = [
  { val: '14h', unit: '/wk',   label: 'Avg time recovered' },
  { val: '87%', unit: '',      label: 'Tasks automated' },
  { val: '3-5', unit: 'days',  label: 'Audit to blueprint' },
  { val: '4.2x', unit: '',     label: 'Average ROI' },
];

/* ============================================================
   SERVICES PREVIEW
   ============================================================ */
const services = [
  { n: '01', title: 'Automation Consulting',       tag: 'Strategy',    href: '/services' },
  { n: '02', title: 'Custom AI Agents',            tag: 'Build',       href: '/services' },
  { n: '03', title: 'AI Tool Implementation',      tag: 'Integration', href: '/services' },
  { n: '04', title: 'Social Media Automation',     tag: 'Content',     href: '/services' },
  { n: '05', title: 'Personal Automation',         tag: 'Personal',    href: '/services' },
  { n: '06', title: 'Business Process Automation', tag: 'Ops',         href: '/services' },
];

/* ============================================================
   HOME PAGE
   ============================================================ */
export const HomePage: React.FC = () => {
  const [absorbed, setAbsorbed] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '12%']);

  useEffect(() => { setTimeout(() => setLoaded(true), 80); }, []);

  // Absorb problem cards on scroll
  useEffect(() => {
    const unsub = scrollYProgress.on('change', v => {
      if (v > 0.25 && !absorbed) { setAbsorbed(true); }
    });
    return unsub;
  }, [absorbed, scrollYProgress]);

  return (
    <PageLayout title="The Automation Foundry">
      {/* Hero section */}
      <section
        ref={heroRef}
        style={{
          minHeight: '100vh',
          position: 'relative',
          overflow: 'hidden',
          background: 'var(--paper)',
        }}
        className="blueprint-bg"
      >
        {/* Scan beam */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 1,
          background: 'linear-gradient(90deg, transparent 0%, var(--blue) 50%, transparent 100%)',
          animation: 'beam-scan 3s linear infinite',
          opacity: 0.3, pointerEvents: 'none',
        }} aria-hidden="true" />

        <motion.div style={{ opacity: heroOpacity, y: heroY }} className="w" >
          {/* System header */}
          <motion.div
            initial={{ opacity: 0, y: 8 }} animate={loaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4 }}
            style={{ paddingTop: 'clamp(48px,7vh,80px)', display: 'flex', alignItems: 'center', gap: 12, marginBottom: 40 }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '4px 10px', background: 'white', border: '1px solid var(--border-2)', borderRadius: 'var(--r-full)' }}>
              <span className="dot dot--live" style={{ width: 5, height: 5 }} />
              <span style={{ fontFamily: 'var(--mono)', fontSize: 'var(--f10)', color: 'var(--ink-3)', letterSpacing: '0.08em' }}>Workflow Intake</span>
            </div>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(32px,5vw,80px)', alignItems: 'start', paddingBottom: 'clamp(40px,6vh,80px)' }} className="hero-grid">
            {/* Left: headline + CTA */}
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }} animate={loaded ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
                style={{ fontSize: 'clamp(2.8rem,6vw,5.2rem)', fontWeight: 900, letterSpacing: '-0.055em', lineHeight: 0.95, color: 'var(--ink-0)', marginBottom: 24 }}
              >
                Bring the mess.
                <br />
                <span style={{ background: 'linear-gradient(135deg, var(--blue) 0%, #60a5fa 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  We turn it into
                </span>
                <br />
                <span style={{ background: 'linear-gradient(135deg, var(--blue) 0%, #60a5fa 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  a system.
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 12 }} animate={loaded ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.18 }}
                style={{ fontSize: 'var(--f16)', color: 'var(--ink-2)', lineHeight: 1.7, maxWidth: 440, marginBottom: 32 }}
              >
                Automation consulting, AI agents, and custom tools for workflows that should not still be manual.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 8 }} animate={loaded ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.45, delay: 0.26 }}
                style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 40 }}
              >
                <Link to="/audit" className="btn btn--xl btn--primary">Map my workflow</Link>
                <Link to="/services" className="btn btn--xl btn--ghost">See how it works</Link>
              </motion.div>

              {/* Principles */}
              <motion.div
                initial={{ opacity: 0 }} animate={loaded ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.4 }}
                style={{ display: 'flex', flexDirection: 'column', gap: 8 }}
              >
                {[
                  { code: 'P.01', text: 'Diagnose before building' },
                  { code: 'P.02', text: 'Systems over tools' },
                  { code: 'P.03', text: 'Measurable outcomes only' },
                  { code: 'P.04', text: 'Fixed scope, no surprises' },
                ].map(p => (
                  <div key={p.code} style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                    <span style={{ fontFamily: 'var(--mono)', fontSize: 'var(--f10)', color: 'var(--ink-4)', fontWeight: 600, flexShrink: 0 }}>{p.code}</span>
                    <span style={{ fontSize: 'var(--f13)', color: 'var(--ink-3)' }}>{p.text}</span>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right: floating problem cards */}
            <div style={{ position: 'relative', height: 480, overflow: 'hidden' }}>
              {/* Center intake pipe */}
              <motion.div
                initial={{ opacity: 0 }} animate={loaded ? { opacity: 1 } : {}}
                transition={{ delay: 0.6 }}
                style={{
                  position: 'absolute', left: '50%', top: '45%', transform: 'translate(-50%,-50%)',
                  width: 80, height: 80, borderRadius: '50%',
                  background: 'white', border: '2px solid var(--border-2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: 'var(--sh-md)', zIndex: 10,
                }}
              >
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <circle cx="14" cy="14" r="5" fill="var(--ink-0)" opacity="0.9"/>
                  <circle cx="14" cy="14" r="10" stroke="var(--border-2)" strokeWidth="1.5" fill="none"/>
                  <circle cx="14" cy="14" r="13" stroke="var(--border)" strokeWidth="1" fill="none"/>
                </svg>
              </motion.div>

              {/* Label */}
              <motion.div
                initial={{ opacity: 0 }} animate={loaded ? { opacity: 1 } : {}}
                transition={{ delay: 0.8 }}
                style={{ position: 'absolute', left: '50%', top: 'calc(45% + 50px)', transform: 'translateX(-50%)', textAlign: 'center', zIndex: 10 }}
              >
                <div style={{ fontFamily: 'var(--mono)', fontSize: 'var(--f10)', color: 'var(--ink-4)', letterSpacing: '0.08em', whiteSpace: 'nowrap' }}>
                  {absorbed ? 'PROCESSING...' : 'INTAKE SCANNER'}
                </div>
              </motion.div>

              {/* Floating problem cards */}
              {messyProblems.map((p, i) => (
                <ProblemCard key={i} {...p} absorbed={absorbed} />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }} animate={loaded ? { opacity: 1 } : {}}
          transition={{ delay: 1.2 }}
          style={{ position: 'absolute', bottom: 28, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}
        >
          <span style={{ fontFamily: 'var(--mono)', fontSize: 'var(--f10)', color: 'var(--ink-4)', letterSpacing: '0.08em' }}>SCROLL TO PROCESS</span>
          <motion.div animate={{ y: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 6l4 4 4-4" stroke="var(--ink-4)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </motion.div>
        </motion.div>
      </section>

      {/* ======================================================
          STAT BAR
          ====================================================== */}
      <section style={{ borderBlock: '1px solid var(--border)', background: 'white' }}>
        <div className="w" style={{ paddingBlock: 24 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)' }} className="stat-g">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.07, duration: 0.45 }}
                style={{ padding: '20px 24px', borderRight: i < stats.length - 1 ? '1px solid var(--border)' : 'none' }}
              >
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 3, marginBottom: 4 }}>
                  <span style={{ fontFamily: 'var(--mono)', fontSize: 'clamp(var(--f24),2.5vw,var(--f32))', fontWeight: 800, color: 'var(--ink-0)', letterSpacing: '-0.04em' }}>{s.val}</span>
                  <span style={{ fontFamily: 'var(--mono)', fontSize: 'var(--f13)', color: 'var(--ink-4)' }}>{s.unit}</span>
                </div>
                <div style={{ fontSize: 'var(--f12)', color: 'var(--ink-3)', fontWeight: 500 }}>{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
        <style>{`.stat-g{grid-template-columns:repeat(4,1fr)}@media(max-width:640px){.stat-g{grid-template-columns:repeat(2,1fr)}}`}</style>
      </section>

      {/* ======================================================
          SYSTEM LOG - the workflow being processed
          ====================================================== */}
      <section style={{ background: 'var(--paper)', borderBottom: '1px solid var(--border)' }}>
        <div className="w" style={{ paddingBlock: 'clamp(64px,8vw,112px)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(32px,5vw,80px)', alignItems: 'center' }} className="log-grid">
            <motion.div initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <div className="label" style={{ marginBottom: 16 }}>Workflow diagnosis</div>
              <h2 style={{ fontSize: 'clamp(var(--f28),3.5vw,var(--f48))', fontWeight: 900, letterSpacing: '-0.045em', lineHeight: 1.05, color: 'var(--ink-0)', marginBottom: 16 }}>
                We find what's broken<br />before we build.
              </h2>
              <p style={{ fontSize: 'var(--f15)', color: 'var(--ink-2)', lineHeight: 1.7, maxWidth: 400, marginBottom: 24 }}>
                Every engagement starts with a workflow audit. We map every step, find bottlenecks, and rank automation opportunities by time saved vs. build effort.
              </p>
              <Link to="/audit" className="btn btn--lg btn--primary">Start with an audit</Link>
            </motion.div>

            {/* System log terminal */}
            <motion.div initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}>
              <div style={{ background: 'var(--paper)', border: '1px solid var(--border-2)', borderRadius: 'var(--r-12)', overflow: 'hidden', boxShadow: 'var(--sh-md)' }}>
                {/* Terminal header */}
                <div style={{ padding: '10px 16px', borderBottom: '1px solid var(--border)', background: 'white', display: 'flex', alignItems: 'center', gap: 8 }}>
                  {['#ff5f57','#febc2e','#28c840'].map(c => <div key={c} style={{ width: 9, height: 9, borderRadius: '50%', background: c }} />)}
                  <span style={{ fontFamily: 'var(--mono)', fontSize: 'var(--f10)', color: 'var(--ink-4)', marginLeft: 6, letterSpacing: '0.04em' }}>workflow-scan.log</span>
                </div>
                <div style={{ padding: 16 }}>
                  {logLines.map((l, i) => (
                    <motion.div
                      key={i} className="log-line"
                      initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                      viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.3 }}
                    >
                      <span className="log-time">{l.time}</span>
                      <span className={`log-tag ${l.tagCls}`}>{l.tag}</span>
                      <span className="log-msg">{l.msg}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        <style>{`.log-grid{grid-template-columns:1fr 1fr}@media(max-width:800px){.log-grid{grid-template-columns:1fr!important}}`}</style>
      </section>

      {/* ======================================================
          WORKFLOW TRANSFORM VISUALIZATION
          ====================================================== */}
      <section style={{ background: 'white', borderBottom: '1px solid var(--border)', overflow: 'hidden' }}>
        <div className="w" style={{ paddingBlock: 'clamp(64px,8vw,112px)' }}>
          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            style={{ marginBottom: 48 }}>
            <div className="label" style={{ marginBottom: 12 }}>The transformation</div>
            <h2 style={{ fontSize: 'clamp(var(--f28),3.5vw,var(--f48))', fontWeight: 900, letterSpacing: '-0.045em', lineHeight: 1.05, color: 'var(--ink-0)' }}>
              Chaos in. System out.
            </h2>
          </motion.div>

          {/* Transform flow */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, overflowX: 'auto', paddingBottom: 16 }}>
            {/* Input cluster */}
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <div style={{ padding: '16px 20px', background: 'var(--paper-1)', border: '1px solid var(--border-2)', borderRadius: 'var(--r-10)', display: 'flex', flexDirection: 'column', gap: 6, minWidth: 180 }}>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 'var(--f10)', color: 'var(--amber)', fontWeight: 600, letterSpacing: '0.08em', marginBottom: 4 }}>MESSY INPUT</div>
                {['Manual reports', 'WhatsApp approvals', 'Scattered leads', 'Copy-paste tasks'].map(t => (
                  <div key={t} style={{ display: 'flex', gap: 6, alignItems: 'center', fontSize: 'var(--f12)', color: 'var(--ink-2)' }}>
                    <span style={{ width: 4, height: 4, borderRadius: 1, background: 'var(--amber)', flexShrink: 0 }} />
                    {t}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Arrow */}
            <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.2 }} style={{ display: 'flex', alignItems: 'center', gap: 0, flexShrink: 0 }}>
              <div style={{ width: 40, height: 1, background: 'var(--border-3)' }} />
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M1 6h10M7 2l4 4-4 4" stroke="var(--ink-3)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </motion.div>

            {/* Nodes */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <WorkflowNode label="DIAGNOSE" sub="Map every step" color="var(--blue)" delay={0.25} />
              <WorkflowNode label="BLUEPRINT" sub="Design system" color="var(--ink-0)" delay={0.35} />
            </div>

            {/* Arrow */}
            <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.45 }} style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
              <div style={{ width: 40, height: 1, background: 'var(--border-3)' }} />
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M1 6h10M7 2l4 4-4 4" stroke="var(--ink-3)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </motion.div>

            {/* Build nodes */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <WorkflowNode label="BUILD" sub="Agents + tools" color="var(--green)" delay={0.5} />
              <WorkflowNode label="VERIFY" sub="Test + measure" color="var(--amber)" delay={0.6} />
            </div>

            {/* Arrow */}
            <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.65 }} style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
              <div style={{ width: 40, height: 1, background: 'var(--border-3)' }} />
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M1 6h10M7 2l4 4-4 4" stroke="var(--ink-3)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </motion.div>

            {/* Output */}
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.7 }}>
              <div style={{ padding: '16px 20px', background: 'var(--green-lo)', border: '1px solid var(--green-line)', borderRadius: 'var(--r-10)', minWidth: 180 }}>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 'var(--f10)', color: 'var(--green)', fontWeight: 600, letterSpacing: '0.08em', marginBottom: 4 }}>CLEAN OUTPUT</div>
                {['14h/wk recovered', '87% automated', 'ROI tracked', 'System running'].map(t => (
                  <div key={t} style={{ display: 'flex', gap: 6, alignItems: 'center', fontSize: 'var(--f12)', color: 'var(--ink-1)', marginTop: 6 }}>
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M1.5 5l2.5 2.5 4.5-4.5" stroke="var(--green)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    {t}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ======================================================
          SERVICES PREVIEW
          ====================================================== */}
      <section style={{ background: 'var(--paper)', borderBottom: '1px solid var(--border)' }}>
        <div className="w" style={{ paddingBlock: 'clamp(64px,8vw,112px)' }}>
          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 40, flexWrap: 'wrap', gap: 16 }}>
            <div>
              <div className="label" style={{ marginBottom: 12 }}>Service modules</div>
              <h2 style={{ fontSize: 'clamp(var(--f28),3.5vw,var(--f48))', fontWeight: 900, letterSpacing: '-0.045em', lineHeight: 1.05, color: 'var(--ink-0)' }}>
                What we build for you
              </h2>
            </div>
            <Link to="/services" className="btn btn--md btn--ghost">
              All services
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M3 6.5h7M7 4l3 2.5-3 2.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </Link>
          </motion.div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {services.map((s, i) => (
              <motion.div key={s.n} initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05, duration: 0.4 }}>
                <Link to={s.href} style={{ textDecoration: 'none', display: 'block' }}>
                  <motion.div whileHover={{ x: 6 }} transition={{ duration: 0.15 }}
                    style={{ display: 'flex', alignItems: 'center', gap: 20, padding: '16px 0', borderBottom: '1px solid var(--border)', cursor: 'pointer' }}>
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

      {/* ======================================================
          DARK CTA SECTION
          ====================================================== */}
      <section style={{ background: 'var(--dark-0)', borderBottom: '1px solid var(--dark-b1)', position: 'relative', overflow: 'hidden' }} className="dark-section">
        {/* Blueprint grid on dark */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle, rgba(37,99,235,0.08) 1px, transparent 1px)', backgroundSize: '28px 28px', pointerEvents: 'none' }} aria-hidden="true" />
        <div className="w w--md" style={{ paddingBlock: 'clamp(64px,8vw,96px)', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '4px 12px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 'var(--r-full)', marginBottom: 24 }}>
              <span className="dot dot--live" style={{ width: 5, height: 5 }} />
              <span style={{ fontFamily: 'var(--mono)', fontSize: 'var(--f10)', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.08em' }}>TAKING NEW CLIENTS</span>
            </div>
            <h2 style={{ fontSize: 'clamp(var(--f28),4vw,var(--f56))', fontWeight: 900, letterSpacing: '-0.05em', lineHeight: 1.0, color: 'var(--dark-t0)', marginBottom: 16 }}>
              Your workflow is the product.<br />
              <span style={{ background: 'linear-gradient(90deg, #60a5fa, #34d399)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Let us build a better one.
              </span>
            </h2>
            <p style={{ color: 'var(--dark-t2)', fontSize: 'var(--f15)', marginBottom: 32, maxWidth: 420, margin: '0 auto 32px' }}>
              Start with a fixed-scope audit. Get clarity on exactly what to automate, what to skip, and what you will save.
            </p>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/audit" className="btn btn--xl" style={{ background: 'var(--dark-t0)', color: 'var(--dark-0)', border: 'none', borderRadius: 'var(--r-8)' }}>
                Book an Automation Audit
              </Link>
              <Link to="/contact" className="btn btn--xl btn--ghost-dark">
                Talk first
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
      <style>{`.hero-grid{grid-template-columns:1fr 1fr}@media(max-width:880px){.hero-grid{grid-template-columns:1fr!important}.hero-grid>div:last-child{display:none}}`}</style>
    </PageLayout>
  );
};

export default HomePage;
