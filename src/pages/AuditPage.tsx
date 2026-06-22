import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { PageLayout } from '../components/PageLayout';
import { Footer } from '../sections/Footer';
import { Reveal, Stagger, SI } from '../components/Reveal';

const steps = [
  { n: '01', title: 'Submit intake form',    time: 'Day 0',   desc: 'Describe your workflow, current tools, and biggest time sinks. No jargon required.' },
  { n: '02', title: 'Workflow mapping',      time: 'Day 1',   desc: 'We trace every step in your current process, identify decision points, and measure time cost per step.' },
  { n: '03', title: 'Opportunity analysis',  time: 'Day 2-3', desc: 'Each step is scored by automation potential, implementation effort, and time saved. Ranked output.' },
  { n: '04', title: 'Tool recommendation',   time: 'Day 3-4', desc: 'We recommend the exact tools, integrations, and agent types that fit your workflow and budget.' },
  { n: '05', title: 'Report delivery',       time: 'Day 5',   desc: 'Full report with workflow map, opportunity rankings, tool stack, time/cost savings, and implementation roadmap.' },
];

const deliverables = [
  { code: 'D.01', title: 'Workflow map',              desc: 'Visual diagram of every step, decision, and tool in your current process.' },
  { code: 'D.02', title: 'Opportunity report',        desc: 'Every automation ranked by weekly time saved and build effort. Prioritized.' },
  { code: 'D.03', title: 'Tool recommendation',       desc: 'Exact tools and integrations for your workflow, not generic suggestions.' },
  { code: 'D.04', title: 'Time savings estimate',     desc: 'Projected hours recovered per week, per automation identified.' },
  { code: 'D.05', title: 'Implementation roadmap',    desc: 'Step-by-step build plan with dependencies, timeline, and priorities.' },
  { code: 'D.06', title: 'Quick-win automations',     desc: 'Three specific things you can implement this week without us.' },
];

const faqs = [
  { q: 'How long does the audit take?',        a: '3-5 business days from intake form submission to full report.' },
  { q: 'Do I need to know what to automate?',  a: 'No. You describe the problem. We identify the opportunities. Most clients come knowing what hurts, not what to build.' },
  { q: 'What should I prepare?',               a: 'Fill out the intake form with your workflow description, current tools, and biggest time sinks. A 30-minute follow-up call is optional.' },
  { q: 'What happens after?',                  a: 'You decide. Implement yourself, move to a Build Sprint, or start a Retainer. The audit is a complete standalone deliverable.' },
  { q: 'Is the price fixed?',                  a: 'Yes. Fixed scope, fixed price. No surprise billing.' },
];

const TerminalPreview: React.FC = () => {
  const lines = [
    { t: 0.0,  c: 'dim',  text: '$ automateable audit --workflow "weekly reporting"' },
    { t: 0.3,  c: 'dim',  text: 'Initializing workflow analysis...' },
    { t: 0.6,  c: 'blue', text: '[1/5] Mapping workflow steps...' },
    { t: 1.0,  c: 'dim',  text: '      Found 12 steps, 4 decision points' },
    { t: 1.4,  c: 'blue', text: '[2/5] Scoring automation potential...' },
    { t: 1.8,  c: 'live', text: '      HIGH   Report compilation    3.0h/wk  effort: low' },
    { t: 2.0,  c: 'live', text: '      HIGH   CRM data entry        2.0h/wk  effort: low' },
    { t: 2.2,  c: 'ok',   text: '      MED    Email follow-ups      1.5h/wk  effort: med' },
    { t: 2.4,  c: 'ok',   text: '      MED    Social scheduling     2.0h/wk  effort: med' },
    { t: 2.6,  c: 'dim',  text: '      LOW    Invoice processing    0.8h/wk  effort: low' },
    { t: 3.0,  c: 'blue', text: '[3/5] Recommending tool stack...' },
    { t: 3.4,  c: 'dim',  text: '      n8n + Claude + Airtable + Zapier' },
    { t: 3.8,  c: 'blue', text: '[4/5] Estimating time savings...' },
    { t: 4.2,  c: 'ok',   text: '      Total recoverable: 9.3h/wk (~$1,400/mo at $150/hr)' },
    { t: 4.6,  c: 'blue', text: '[5/5] Generating roadmap...' },
    { t: 5.0,  c: 'ok',   text: '' },
    { t: 5.1,  c: 'ok',   text: 'Report ready. 6 deliverables. 3 quick wins.' },
  ];

  const colors: Record<string, string> = {
    dim:  'var(--t2)',
    blue: 'var(--blue-hi)',
    live: 'var(--live)',
    ok:   'var(--ok)',
  };

  return (
    <div style={{ background: 'var(--s0)', border: '1px solid var(--b1)', borderRadius: 'var(--r12)', overflow: 'hidden', fontFamily: 'var(--mono)' }}>
      <div style={{ padding: '10px 16px', borderBottom: '1px solid var(--b1)', display: 'flex', alignItems: 'center', gap: 8, background: 'var(--s1)' }}>
        {['#ff5f57','#febc2e','#28c840'].map(c => <div key={c} style={{ width: 9, height: 9, borderRadius: '50%', background: c }}/>)}
        <span style={{ fontSize: 'var(--f11)', color: 'var(--t3)', marginLeft: 6, letterSpacing: '0.04em' }}>audit-report.txt</span>
      </div>
      <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 4 }}>
        {lines.map((l, i) => (
          <Reveal key={i} delay={l.t * 0.12}>
            <div style={{ fontSize: 'var(--f12)', fontWeight: 500, color: colors[l.c], lineHeight: 1.6, whiteSpace: 'pre' }}>
              {l.text || ' '}
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
};

const FAQ: React.FC<{ q: string; a: string }> = ({ q, a }) => {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderTop: '1px solid var(--b1)' }}>
      <button
        onClick={() => setOpen(v => !v)}
        aria-expanded={open}
        style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, padding: '16px 0', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}
      >
        <span style={{ fontSize: 'var(--f14)', fontWeight: 600, color: 'var(--t0)' }}>{q}</span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.18 }} style={{ flexShrink: 0, color: 'var(--t2)', display: 'flex' }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 5l4 4 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }} style={{ overflow: 'hidden' }}>
            <p style={{ fontSize: 'var(--f13)', color: 'var(--t1)', lineHeight: 1.65, paddingBottom: 16, maxWidth: 560 }}>{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const AuditPage: React.FC = () => (
  <PageLayout title="Automation Audit">
    <section className="ph">
      <div className="w">
        <Reveal>
          <div className="eyebrow" style={{ marginBottom: 16 }}>Automation Audit</div>
          <h1 style={{ fontSize: 'clamp(var(--f40),6vw,var(--f80))', fontWeight: 900, letterSpacing: '-0.05em', lineHeight: 1.0, color: 'var(--t0)', marginBottom: 20, maxWidth: 680 }}>
            Before we build,<br/>we map.
          </h1>
          <p style={{ fontSize: 'var(--f16)', color: 'var(--t1)', maxWidth: 520, lineHeight: 1.7, marginBottom: 32 }}>
            Most automation projects fail because they skip diagnosis. Every engagement starts with a fixed-scope audit that tells you exactly what to build, what to skip, and what you will recover.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
            <Link to="/contact" className="btn btn--lg btn--primary">Start with an Audit</Link>
            <span style={{ fontFamily: 'var(--mono)', fontSize: 'var(--f12)', color: 'var(--t2)' }}>
              from $497 &nbsp;&#183;&nbsp; 3-5 business days
            </span>
          </div>
        </Reveal>
      </div>
    </section>

    {/* Process timeline */}
    <section className="sec" style={{ borderBottom: '1px solid var(--b1)' }}>
      <div className="w">
        <Reveal style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 'clamp(var(--f20),2.5vw,var(--f32))', fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--t0)' }}>How it runs</h2>
        </Reveal>
        <div style={{ position: 'relative' }}>
          <div style={{ position: 'absolute', left: 13, top: 16, bottom: 16, width: 1, background: 'var(--b1)' }} aria-hidden="true"/>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {steps.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.08}>
                <div style={{ display: 'flex', gap: 24, paddingBottom: i < steps.length - 1 ? 32 : 0 }}>
                  <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--s2)', border: '1px solid var(--b2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, zIndex: 1 }}>
                    <span style={{ fontFamily: 'var(--mono)', fontSize: 'var(--f10)', fontWeight: 700, color: 'var(--blue-hi)' }}>{s.n}</span>
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 4 }}>
                      <span style={{ fontSize: 'var(--f15)', fontWeight: 700, color: 'var(--t0)', letterSpacing: '-0.02em' }}>{s.title}</span>
                      <span style={{ fontFamily: 'var(--mono)', fontSize: 'var(--f11)', color: 'var(--t3)' }}>{s.time}</span>
                    </div>
                    <p style={{ fontSize: 'var(--f13)', color: 'var(--t2)', lineHeight: 1.6, maxWidth: 520 }}>{s.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* Deliverables + Terminal preview */}
    <section className="sec" style={{ borderBottom: '1px solid var(--b1)' }}>
      <div  style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(32px,5vw,64px)', alignItems: 'start' }} className="audit-split">
        <div>
          <Reveal style={{ marginBottom: 32 }}>
            <h2 style={{ fontSize: 'clamp(var(--f20),2.5vw,var(--f32))', fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--t0)' }}>What you receive</h2>
          </Reveal>
          <Stagger style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {deliverables.map(d => (
              <SI key={d.code}>
                <div style={{ display: 'flex', gap: 16 }}>
                  <span style={{ fontFamily: 'var(--mono)', fontSize: 'var(--f11)', color: 'var(--t3)', fontWeight: 600, width: 36, flexShrink: 0, paddingTop: 2 }}>{d.code}</span>
                  <div>
                    <div style={{ fontSize: 'var(--f14)', fontWeight: 600, color: 'var(--t0)', marginBottom: 3 }}>{d.title}</div>
                    <div style={{ fontSize: 'var(--f13)', color: 'var(--t2)', lineHeight: 1.55 }}>{d.desc}</div>
                  </div>
                </div>
              </SI>
            ))}
          </Stagger>
        </div>
        <Reveal direction="right">
          <TerminalPreview />
        </Reveal>
        <style>{`.audit-split{grid-template-columns:1fr 1fr}@media(max-width:800px){.audit-split{grid-template-columns:1fr!important}}`}</style>
      </div>
    </section>

    {/* FAQ */}
    <section className="sec" style={{ borderBottom: '1px solid var(--b1)' }}>
      <div className="w w--lg">
        <Reveal style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 'clamp(var(--f20),2.5vw,var(--f32))', fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--t0)' }}>Questions</h2>
        </Reveal>
        {faqs.map(f => <FAQ key={f.q} q={f.q} a={f.a} />)}
        <div style={{ borderTop: '1px solid var(--b1)' }}/>
        <Reveal style={{ textAlign: 'center', paddingTop: 48 }}>
          <Link to="/contact" className="btn btn--xl btn--primary">Book your audit now</Link>
        </Reveal>
      </div>
    </section>
        <Footer />
    </PageLayout>
);

export default AuditPage;
