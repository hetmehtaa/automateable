import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { PageLayout } from '../components/PageLayout';
import { Footer } from '../sections/Footer';
import { Reveal, Stagger, SI } from '../components/Reveal';

const plans = [
  {
    n: '01', name: 'Automation Audit',
    price: 'From $497', note: 'Fixed scope', timeline: '3-5 days',
    tag: 'Start here', accent: 'var(--blue-hi)',
    desc: 'For anyone who wants clarity before committing to a build.',
    items: ['Workflow map', 'Automation opportunity report', 'Tool stack recommendation', 'Time & cost savings estimate', 'Implementation roadmap', 'Quick-win list (3 items)'],
    href: '/contact',
  },
  {
    n: '02', name: 'Build Sprint',
    price: 'Project-based', note: 'Scoped after audit', timeline: '2-6 weeks',
    tag: 'Most chosen', accent: '#4ade80',
    desc: 'For founders and operators ready to implement.',
    items: ['Full audit included', 'Custom workflow implementation', 'AI agent setup', 'Tool integrations', 'Testing and QA', 'Documentation and handoff', 'One revision round'],
    href: '/contact',
  },
  {
    n: '03', name: 'Automation Retainer',
    price: 'Custom monthly', note: 'Cancel anytime', timeline: 'Ongoing',
    tag: 'For teams', accent: 'var(--purple)',
    desc: 'For businesses that want continuous improvement.',
    items: ['Everything in Build Sprint', 'New automations monthly', 'Ongoing optimization', 'AI agent maintenance', 'Monthly performance report', 'Priority support', 'Quarterly review call'],
    href: '/contact',
  },
];

const faqs = [
  { q: 'Is the audit price fixed?',               a: 'Yes. Fixed scope, fixed price. No surprise billing.' },
  { q: 'Do I need the audit before a Build Sprint?', a: 'Almost always yes. The audit tells us what to build. Skipping it means building the wrong thing.' },
  { q: 'How does retainer pricing work?',          a: 'Custom based on scope: automations per month, agent maintenance level, and reporting cadence.' },
  { q: 'Can I pause or cancel a retainer?',        a: 'Yes. Monthly retainers pause or cancel with 30 days notice.' },
];

const FAQ: React.FC<{ q: string; a: string }> = ({ q, a }) => {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderTop: '1px solid var(--b1)' }}>
      <button onClick={() => setOpen(v => !v)} aria-expanded={open}
        style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, padding: '16px 0', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}>
        <span style={{ fontSize: 'var(--f14)', fontWeight: 600, color: 'var(--t0)' }}>{q}</span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.18 }} style={{ flexShrink: 0, color: 'var(--t2)', display: 'flex' }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 5l4 4 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.22 }} style={{ overflow: 'hidden' }}>
            <p style={{ fontSize: 'var(--f13)', color: 'var(--t1)', lineHeight: 1.65, paddingBottom: 16, maxWidth: 560 }}>{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const PricingPage: React.FC = () => (
  <PageLayout title="Pricing">
    <section className="ph">
      <div className="w">
        <Reveal>
          <div className="eyebrow" style={{ marginBottom: 16 }}>Pricing</div>
          <h1 style={{ fontSize: 'clamp(var(--f40),6vw,var(--f80))', fontWeight: 900, letterSpacing: '-0.05em', lineHeight: 1.0, color: 'var(--t0)', marginBottom: 20 }}>
            Fixed scope.<br/>Honest pricing.
          </h1>
          <p style={{ fontSize: 'var(--f16)', color: 'var(--t1)', maxWidth: 480, lineHeight: 1.7 }}>
            No retainers before proven value. Start with an audit. Build when ready.
          </p>
        </Reveal>
      </div>
    </section>

    <section className="sec" style={{ borderBottom: '1px solid var(--b1)' }}>
      <div className="w">
        <Stagger style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }} className="price-g">
          {plans.map(p => (
            <SI key={p.n}>
              <motion.div whileHover={{ y: -2 }}
                style={{ background: 'var(--s1)', border: '1px solid var(--b1)', borderRadius: 'var(--r12)', overflow: 'hidden', display: 'flex', flexDirection: 'column', height: '100%' }}>
                {/* accent top */}
                <div style={{ height: 2, background: p.accent }}/>
                <div style={{ padding: '24px 24px 20px', flex: 1, display: 'flex', flexDirection: 'column', gap: 20 }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                      <span style={{ fontFamily: 'var(--mono)', fontSize: 'var(--f11)', fontWeight: 600, color: 'var(--t3)' }}>{p.n}</span>
                      <span style={{ fontSize: 'var(--f11)', fontWeight: 600, letterSpacing: '0.07em', textTransform: 'uppercase', color: p.accent, background: `${p.accent}18`, border: `1px solid ${p.accent}30`, borderRadius: 'var(--rfull)', padding: '2px 8px' }}>{p.tag}</span>
                    </div>
                    <div style={{ fontSize: 'var(--f18)', fontWeight: 800, color: 'var(--t0)', letterSpacing: '-0.025em', marginBottom: 4 }}>{p.name}</div>
                    <div style={{ fontSize: 'var(--f13)', color: 'var(--t2)' }}>{p.desc}</div>
                  </div>

                  <div style={{ padding: 16, background: 'var(--s2)', borderRadius: 'var(--r8)', border: '1px solid var(--b1)' }}>
                    <div style={{ fontFamily: 'var(--mono)', fontSize: 'var(--f20)', fontWeight: 800, color: 'var(--t0)', letterSpacing: '-0.04em', marginBottom: 4 }}>{p.price}</div>
                    <div style={{ fontFamily: 'var(--mono)', fontSize: 'var(--f11)', color: 'var(--t3)', display: 'flex', gap: 8 }}>
                      <span>{p.note}</span>
                      <span>&#183;</span>
                      <span>{p.timeline}</span>
                    </div>
                  </div>

                  <ul style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
                    {p.items.map(item => (
                      <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 'var(--f13)', color: 'var(--t1)' }}>
                        <svg width="13" height="13" viewBox="0 0 13 13" fill="none" style={{ flexShrink: 0, marginTop: 1 }}>
                          <circle cx="6.5" cy="6.5" r="5.5" fill={`${p.accent}15`} stroke={`${p.accent}40`} strokeWidth="1"/>
                          <path d="M4 6.5l2 2 3-3" stroke={p.accent} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>

                  <Link to={p.href} className="btn btn--md"
                    style={{ background: p.accent, color: p.accent === '#4ade80' ? '#0a0a0b' : 'white', border: 'none', justifyContent: 'center', borderRadius: 'var(--r8)', fontSize: 'var(--f13)', height: 38 }}>
                    Get started
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M2.5 6.5h8M7 3.5l3 3-3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </Link>
                </div>
              </motion.div>
            </SI>
          ))}
        </Stagger>
        <style>{`.price-g{grid-template-columns:repeat(3,1fr)}@media(max-width:880px){.price-g{grid-template-columns:1fr!important;max-width:440px;margin:0 auto}}`}</style>
      </div>
    </section>

    <section className="sec">
      <div className="w w--lg">
        <Reveal style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 'clamp(var(--f20),2.5vw,var(--f28))', fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--t0)' }}>Pricing questions</h2>
        </Reveal>
        {faqs.map(f => <FAQ key={f.q} q={f.q} a={f.a} />)}
        <div style={{ borderTop: '1px solid var(--b1)' }}/>
      </div>
    </section>
        <Footer />
    </PageLayout>
);

export default PricingPage;
