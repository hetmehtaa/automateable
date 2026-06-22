import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PageLayout } from '../components/PageLayout';
import { Reveal, Stagger, SI } from '../components/Reveal';
import { PipelineTrace } from '../components/PipelineTrace';

/* ---- stat bar ---- */
const stats = [
  { val: '3-5',    unit: 'days',    label: 'Audit turnaround' },
  { val: '14h',    unit: '/wk',     label: 'Avg time recovered' },
  { val: '87%',    unit: '',        label: 'Tasks automated' },
  { val: '2-6',    unit: 'wks',     label: 'Build sprint' },
];

/* ---- services preview ---- */
const services = [
  { n: '01', title: 'Automation Consulting',      tag: 'Strategy',    href: '/services' },
  { n: '02', title: 'Custom AI Agents',           tag: 'Build',       href: '/services' },
  { n: '03', title: 'AI Tool Implementation',     tag: 'Integration', href: '/services' },
  { n: '04', title: 'Social Media Automation',    tag: 'Content',     href: '/services' },
  { n: '05', title: 'Personal Automation',        tag: 'Personal',    href: '/services' },
  { n: '06', title: 'Business Process Automation',tag: 'Ops',         href: '/services' },
];

/* ---- principles ---- */
const principles = [
  { code: 'P.01', text: 'Diagnose before building. We map every workflow before touching a tool.' },
  { code: 'P.02', text: 'Systems over tools. The connections are the problem, not the software.' },
  { code: 'P.03', text: 'Measurable outcomes. Time saved, tasks reduced, ROI tracked.' },
  { code: 'P.04', text: 'Fixed scope. No surprise billing. You know what you get before you pay.' },
];

export const HomePage: React.FC = () => {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { const t = setTimeout(() => setLoaded(true), 80); return () => clearTimeout(t); }, []);

  return (
    <PageLayout title="Automation consulting & AI systems">
      {/* âââââ HERO âââââ */}
      <section style={{
        minHeight: 'calc(100vh - var(--nav-h))',
        paddingTop: 'clamp(56px,8vh,96px)',
        paddingBottom: 'clamp(48px,6vh,80px)',
        display: 'flex', alignItems: 'center',
        position: 'relative', overflow: 'hidden',
        borderBottom: '1px solid var(--b1)',
      }}>
        {/* subtle scan line */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(37,99,235,0.4), transparent)',
          animation: 'scan-h 4s linear infinite',
          pointerEvents: 'none',
        }} aria-hidden="true"/>
        <style>{`@keyframes scan-h{0%{transform:translateY(0)}100%{transform:translateY(100vh)}}`}</style>

        <div className="w" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(32px,5vw,80px)', alignItems: 'center' }} >
          {/* left */}
          <div>
            {/* system tag */}
            <motion.div
              initial={{ opacity: 0, y: 8 }} animate={loaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, ease: [0.22,1,0.36,1] }}
              style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 28 }}
            >
              <span className="chip chip--blue">
                <span className="dot dot--live" style={{ width: 5, height: 5 }}/>
                Automation-first consulting
              </span>
              <span style={{ fontFamily: 'var(--mono)', fontSize: 'var(--f11)', color: 'var(--t3)', fontWeight: 500 }}>
                v4.0
              </span>
            </motion.div>

            {/* headline */}
            <motion.h1
              initial={{ opacity: 0, y: 16 }} animate={loaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.06, ease: [0.22,1,0.36,1] }}
              style={{
                fontSize: 'clamp(2.4rem,5.5vw,4.2rem)',
                fontWeight: 900,
                letterSpacing: '-0.055em',
                lineHeight: 0.97,
                color: 'var(--t0)',
                marginBottom: 24,
              }}
            >
              Tell us<br/>the problem.
              <br/>
              <span style={{
                background: 'linear-gradient(90deg, var(--blue-hi) 0%, #60c0ff 100%)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>
                We build<br/>the system.
              </span>
            </motion.h1>

            {/* sub */}
            <motion.p
              initial={{ opacity: 0, y: 12 }} animate={loaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.14, ease: [0.22,1,0.36,1] }}
              style={{ fontSize: 'var(--f15)', color: 'var(--t1)', lineHeight: 1.7, maxWidth: 420, marginBottom: 32 }}
            >
              Automation workflows, AI agents, and custom tools that turn repetitive manual work into deterministic systems.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 8 }} animate={loaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: 0.22, ease: [0.22,1,0.36,1] }}
              style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 40 }}
            >
              <Link to="/audit" className="btn btn--lg btn--primary">Book an Audit</Link>
              <Link to="/services" className="btn btn--lg btn--ghost">View Services</Link>
            </motion.div>

            {/* principles strip */}
            <motion.div
              initial={{ opacity: 0 }} animate={loaded ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.35 }}
              style={{ display: 'flex', flexDirection: 'column', gap: 8 }}
            >
              {principles.map(p => (
                <div key={p.code} style={{ display: 'flex', gap: 12, alignItems: 'baseline' }}>
                  <span style={{ fontFamily: 'var(--mono)', fontSize: 'var(--f11)', color: 'var(--t3)', fontWeight: 500, flexShrink: 0 }}>{p.code}</span>
                  <span style={{ fontSize: 'var(--f13)', color: 'var(--t2)', lineHeight: 1.5 }}>{p.text}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* right: pipeline */}
          <motion.div
            initial={{ opacity: 0, x: 20 }} animate={loaded ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.1, ease: [0.22,1,0.36,1] }}
            style={{ position: 'relative' }}
          >
            {/* frame */}
            <div style={{
              background: 'var(--s1)',
              border: '1px solid var(--b1)',
              borderRadius: 16,
              padding: '0 20px 20px',
              boxShadow: '0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04)',
            }}>
              {/* titlebar */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 0 12px', borderBottom: '1px solid var(--b0)', marginBottom: 16 }}>
                <div style={{ display: 'flex', gap: 6 }}>
                  {['#ff5f57','#febc2e','#28c840'].map(c => (
                    <div key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c }}/>
                  ))}
                </div>
                <span style={{ fontFamily: 'var(--mono)', fontSize: 'var(--f11)', color: 'var(--t3)', letterSpacing: '0.06em' }}>
                  automateable / processing-layer
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                  <span className="dot dot--live" style={{ width: 5, height: 5 }}/>
                  <span style={{ fontFamily: 'var(--mono)', fontSize: 'var(--f10)', color: 'var(--ok)', letterSpacing: '0.06em' }}>LIVE</span>
                </div>
              </div>
              <div style={{ height: 'clamp(220px,26vw,300px)' }}>
                <PipelineTrace />
              </div>
            </div>

            {/* floating metric */}
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                position: 'absolute', top: -14, right: -14,
                background: 'var(--s2)', border: '1px solid var(--b2)',
                borderRadius: 10, padding: '8px 14px',
                boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
              }}
            >
              <div style={{ fontFamily: 'var(--mono)', fontSize: 'var(--f11)', color: 'var(--t2)', letterSpacing: '0.06em', marginBottom: 2 }}>ROI</div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 22, fontWeight: 800, color: 'var(--ok)', letterSpacing: '-0.04em' }}>4.2x</div>
            </motion.div>
          </motion.div>
        </div>

        <style>{`@media(max-width:860px){.hero-g{grid-template-columns:1fr!important}.hero-g>div:last-child{display:none}}`}</style>
      </section>

      {/* âââââ STAT BAR âââââ */}
      <section style={{ borderBottom: '1px solid var(--b1)', background: 'var(--s1)' }}>
        <div className="w" style={{ paddingBlock: 28 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 1 }} className="stat-g">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.06}>
                <div style={{ padding: '20px 24px', borderRight: i < stats.length - 1 ? '1px solid var(--b1)' : 'none' }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 3, marginBottom: 4 }}>
                    <span style={{ fontFamily: 'var(--mono)', fontSize: 'var(--f28)', fontWeight: 800, color: 'var(--t0)', letterSpacing: '-0.04em' }}>{s.val}</span>
                    <span style={{ fontFamily: 'var(--mono)', fontSize: 'var(--f13)', fontWeight: 500, color: 'var(--t2)' }}>{s.unit}</span>
                  </div>
                  <div style={{ fontSize: 'var(--f12)', color: 'var(--t2)', fontWeight: 500 }}>{s.label}</div>
                </div>
              </Reveal>
            ))}
          </div>
          <style>{`.stat-g{grid-template-columns:repeat(4,1fr)}@media(max-width:640px){.stat-g{grid-template-columns:repeat(2,1fr)}}`}</style>
        </div>
      </section>

      {/* âââââ SERVICES PREVIEW âââââ */}
      <section className="sec" style={{ borderBottom: '1px solid var(--b1)' }}>
        <div className="w">
          <Reveal style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 48, flexWrap: 'wrap', gap: 16 }}>
            <div>
              <div className="eyebrow" style={{ marginBottom: 12 }}>What we build</div>
              <h2 style={{ fontSize: 'clamp(var(--f28),3.5vw,var(--f48))', fontWeight: 900, letterSpacing: '-0.04em', color: 'var(--t0)' }}>Services</h2>
            </div>
            <Link to="/services" className="btn btn--md btn--ghost" style={{ flexShrink: 0 }}>
              All services
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </Link>
          </Reveal>

          <Stagger style={{ display: 'flex', flexDirection: 'column' }}>
            {services.map((s) => (
              <SI key={s.n}>
                <Link to={s.href} style={{ textDecoration: 'none', display: 'block' }}>
                  <motion.div
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.15 }}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 24,
                      padding: '16px 0',
                      borderBottom: '1px solid var(--b1)',
                      cursor: 'pointer',
                    }}
                  >
                    <span style={{ fontFamily: 'var(--mono)', fontSize: 'var(--f11)', fontWeight: 600, color: 'var(--t3)', width: 32, flexShrink: 0 }}>{s.n}</span>
                    <span style={{ fontSize: 'var(--f16)', fontWeight: 600, color: 'var(--t0)', flex: 1, letterSpacing: '-0.02em' }}>{s.title}</span>
                    <span className="chip chip--muted" style={{ flexShrink: 0 }}>{s.tag}</span>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ color: 'var(--t3)', flexShrink: 0, transition: 'color 0.15s' }}>
                      <path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </motion.div>
                </Link>
              </SI>
            ))}
          </Stagger>
        </div>
      </section>

      {/* âââââ CTA âââââ */}
      <section className="sec--sm" style={{ borderBottom: '1px solid var(--b1)', background: 'var(--s1)' }}>
        <div className="w w--md" style={{ textAlign: 'center' }}>
          <Reveal>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 24, padding: '5px 14px', background: 'var(--s2)', border: '1px solid var(--b1)', borderRadius: 'var(--rfull)' }}>
              <span className="dot dot--live" style={{ width: 5, height: 5 }}/>
              <span style={{ fontFamily: 'var(--mono)', fontSize: 'var(--f11)', color: 'var(--t2)', letterSpacing: '0.06em' }}>TAKING NEW CLIENTS</span>
            </div>
            <h2 style={{ fontSize: 'clamp(var(--f24),4vw,var(--f48))', fontWeight: 900, letterSpacing: '-0.045em', color: 'var(--t0)', marginBottom: 16, lineHeight: 1.05 }}>
              Messy problem in.<br/>
              <span style={{ background: 'linear-gradient(90deg, var(--blue-hi), #60c0ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Working system out.
              </span>
            </h2>
            <p style={{ color: 'var(--t2)', fontSize: 'var(--f15)', marginBottom: 32, maxWidth: 440, margin: '0 auto 32px' }}>
              Start with a fixed-scope audit. Get clarity on what to build, what to skip, and what you save.
            </p>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/audit" className="btn btn--xl btn--primary">Book an Audit</Link>
              <Link to="/contact" className="btn btn--xl btn--ghost">Talk first</Link>
            </div>
          </Reveal>
        </div>
      </section>
    </PageLayout>
  );
};

export default HomePage;
