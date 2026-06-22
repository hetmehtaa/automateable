import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { PageLayout } from '../components/PageLayout';
import { Reveal } from '../components/Reveal';

const services = [
  {
    n: '01', tag: 'Strategy', title: 'Automation Consulting',
    lead: 'Map, measure, and prioritize. Know what to automate before touching a tool.',
    desc: 'We audit your current workflow, step by step, and identify what should be automated, delegated, or redesigned. You get a ranked opportunity list with effort and impact scores Ã¢ not a generic slide deck.',
    deliverables: ['Workflow map', 'Automation opportunity report', 'Tool stack recommendation', 'Time savings estimate', 'Implementation roadmap'],
    cta: '/audit',
  },
  {
    n: '02', tag: 'Build', title: 'Custom AI Agents',
    lead: 'Task-specific agents that do the actual work. Not chatbots.',
    desc: 'Research agents that synthesize sources. Reporting agents that pull and format data. Support agents that triage and route. Each agent is built for one job and does it reliably.',
    deliverables: ['Agent architecture', 'Custom prompt engineering', 'Tool integrations', 'Testing and QA', 'Documentation'],
    cta: '/contact',
  },
  {
    n: '03', tag: 'Integration', title: 'AI Tool Implementation',
    lead: 'The tools are fine. The connections between them are the problem.',
    desc: 'We connect Notion, Slack, Google Workspace, HubSpot, Airtable, APIs, and AI models into a system that actually works end-to-end. Triggers, webhooks, transforms, and output formatting.',
    deliverables: ['Tool audit', 'Integration architecture', 'Workflow automation', 'Error handling', 'Handoff docs'],
    cta: '/contact',
  },
  {
    n: '04', tag: 'Content', title: 'Social Media Automation',
    lead: 'One input. Many outputs. Zero manual reformatting.',
    desc: 'From raw idea to scheduled post across platforms. We build the full pipeline: capture, research, draft, repurpose, schedule, analyze. You stay in the creative seat; the system handles distribution.',
    deliverables: ['Content pipeline design', 'Repurposing workflows', 'Scheduling automation', 'Analytics summary agent', 'Hook testing system'],
    cta: '/contact',
  },
  {
    n: '05', tag: 'Personal', title: 'Personal Automation',
    lead: 'Your operating system. Morning briefing to end-of-day summary.',
    desc: 'Morning briefing, reading capture, finance tracker, travel planning, habit tracking, email triage. Life admin should not consume hours that belong to actual work.',
    deliverables: ['Morning briefing agent', 'Knowledge capture system', 'Finance tracking automation', 'Email and calendar triage', 'Custom dashboard'],
    cta: '/contact',
  },
  {
    n: '06', tag: 'Ops', title: 'Business Process Automation',
    lead: 'Internal operations that run without you touching them.',
    desc: 'Lead capture, follow-up sequences, support triage, monthly reports, document processing, team handoffs. If it happens on a schedule or on a trigger, it should not require a human.',
    deliverables: ['Process audit', 'Trigger-based workflows', 'Reporting automation', 'Document processing', 'Team handoff systems'],
    cta: '/contact',
  },
];

export const ServicesPage: React.FC = () => {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <PageLayout title="Services">
      {/* header */}
      <section className="ph">
        <div className="w">
          <Reveal>
            <div className="eyebrow" style={{ marginBottom: 16 }}>Services</div>
            <h1 style={{ fontSize: 'clamp(var(--f40),6vw,var(--f80))', fontWeight: 900, letterSpacing: '-0.05em', lineHeight: 1.0, color: 'var(--t0)', marginBottom: 20, maxWidth: 680 }}>
              Six services.<br/>One outcome.
            </h1>
            <p style={{ fontSize: 'var(--f16)', color: 'var(--t1)', maxWidth: 480, lineHeight: 1.7, marginBottom: 32 }}>
              We work at the level your problem requires. From a single audit to a continuous retainer.
            </p>
            <Link to="/audit" className="btn btn--lg btn--primary">Start with an Audit</Link>
          </Reveal>
        </div>
      </section>

      {/* accordion list */}
      <section className="sec">
        <div className="w">
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {services.map((s, i) => {
              const open = expanded === s.n;
              return (
                <Reveal key={s.n} delay={i * 0.04}>
                  <div style={{ borderTop: i === 0 ? '1px solid var(--b1)' : 'none' }}>
                    <button
                      onClick={() => setExpanded(open ? null : s.n)}
                      aria-expanded={open}
                      style={{
                        width: '100%', display: 'flex', alignItems: 'center', gap: 24,
                        padding: '24px 0', background: 'none', border: 'none',
                        borderBottom: open ? 'none' : '1px solid var(--b1)',
                        cursor: 'pointer', textAlign: 'left',
                      }}
                    >
                      <span style={{ fontFamily: 'var(--mono)', fontSize: 'var(--f11)', fontWeight: 600, color: 'var(--t3)', width: 28, flexShrink: 0 }}>{s.n}</span>
                      <span style={{ flex: 1 }}>
                        <span style={{ fontSize: 'var(--f18)', fontWeight: 700, color: 'var(--t0)', letterSpacing: '-0.025em', display: 'block', marginBottom: 3 }}>{s.title}</span>
                        <span style={{ fontSize: 'var(--f13)', color: 'var(--t2)', display: 'block' }}>{s.lead}</span>
                      </span>
                      <span className="chip chip--muted" style={{ flexShrink: 0 }}>{s.tag}</span>
                      <motion.span
                        animate={{ rotate: open ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        style={{ flexShrink: 0, color: 'var(--t2)', display: 'flex', alignItems: 'center' }}
                      >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </motion.span>
                    </button>

                    <AnimatePresence initial={false}>
                      {open && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                          style={{ overflow: 'hidden', borderBottom: '1px solid var(--b1)' }}
                        >
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 48, padding: '0 0 32px 52px', alignItems: 'start' }} className="svc-inner">
                            <div>
                              <p style={{ fontSize: 'var(--f15)', color: 'var(--t1)', lineHeight: 1.7, marginBottom: 24, maxWidth: 560 }}>{s.desc}</p>
                              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                                {s.deliverables.map(d => (
                                  <span key={d} style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 'var(--f12)', fontWeight: 500, color: 'var(--t2)', background: 'var(--s2)', border: '1px solid var(--b1)', borderRadius: 'var(--rfull)', padding: '3px 10px' }}>
                                    <svg width="9" height="9" viewBox="0 0 9 9" fill="none"><path d="M1.5 4.5l2 2 4-4" stroke="var(--blue)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                    {d}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <Link to={s.cta} className="btn btn--md btn--ghost" style={{ flexShrink: 0 }}>
                              Get started
                              <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M2.5 6.5h8M7 3.5l3 3-3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                            </Link>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
        <style>{`.svc-inner{grid-template-columns:1fr auto}@media(max-width:640px){.svc-inner{grid-template-columns:1fr!important}}`}</style>
      </section>

      {/* CTA */}
      <section className="sec--sm" style={{ borderTop: '1px solid var(--b1)', background: 'var(--s1)' }}>
        <div className="w w--sm" style={{ textAlign: 'center' }}>
          <Reveal>
            <h2 style={{ fontSize: 'clamp(var(--f24),3vw,var(--f36))', fontWeight: 900, letterSpacing: '-0.04em', color: 'var(--t0)', marginBottom: 12 }}>
              Not sure which fits?
            </h2>
            <p style={{ color: 'var(--t2)', marginBottom: 24, fontSize: 'var(--f14)' }}>
              Start with the audit. It tells you exactly what to build next.
            </p>
            <Link to="/audit" className="btn btn--lg btn--primary">Book an Audit</Link>
          </Reveal>
        </div>
      </section>
    </PageLayout>
  );
};

export default ServicesPage;
