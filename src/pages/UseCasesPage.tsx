import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { PageLayout } from '../components/PageLayout';
import { Reveal } from '../components/Reveal';

const cases = [
  {
    id: 'founder', label: 'Founders',
    headline: 'Turn scattered tasks into one command center.',
    desc: 'You are context-switching between 12 tools, checking Slack constantly, and manually building reports. That is not running a company.',
    problems: ['No single view of the business', 'Repetitive weekly reporting', 'Manual lead tracking', 'Meeting notes lost forever'],
    automations: ['Auto-generated weekly business digest', 'CRM updated from email automatically', 'Meetings to action items to assigned tasks', 'Revenue dashboard that updates itself'],
    outcome: 'One view. Everything running. You just decide.',
  },
  {
    id: 'creator', label: 'Creators',
    headline: 'One idea. Ten outputs. Zero manual reformatting.',
    desc: 'You have the ideas but lose hours turning each one into content manually. Distribution is painful. Repurposing feels like starting over.',
    problems: ['One piece of content takes 4 hours', 'Platform formatting is tedious', 'No consistent publishing rhythm', 'Analytics scattered across platforms'],
    automations: ['One idea to posts, thread, newsletter, video script', 'Auto-scheduled content calendar', 'Performance summary every Monday', 'Top performers automatically repurposed'],
    outcome: 'Create once. Ship everywhere. Measure automatically.',
  },
  {
    id: 'business', label: 'Small Business',
    headline: 'Operations that run without being touched.',
    desc: 'Your team spends half its time on work a system could handle. Leads go cold. Reports are late. Support stacks up.',
    problems: ['Leads not followed up in time', 'Customer emails answered manually', 'Monthly reports built by hand', 'Invoice processing takes days'],
    automations: ['Lead capture to CRM and follow-up instantly', 'Support triage with auto-routing', 'Monthly reports auto-generated and sent', 'Document extraction and invoice matching'],
    outcome: 'Less manual execution. More actual business.',
  },
  {
    id: 'professional', label: 'Professionals',
    headline: 'Your best hours go to thinking, not processing.',
    desc: 'Your work requires focus and judgment. Not copy-pasting data, formatting reports, or hunting down emails.',
    problems: ['Research takes all morning', 'Email inbox unmanaged', 'Notes scattered everywhere', 'No system for decisions'],
    automations: ['Research to briefing doc in minutes', 'Email triage and smart draft suggestions', 'Notes captured and linked to projects', 'Decision log updated automatically'],
    outcome: 'Think more. Process less.',
  },
  {
    id: 'team', label: 'Teams',
    headline: 'Work moves through people, not between them.',
    desc: 'Things fall through cracks. Status requires a meeting. Onboarding is re-explained every time.',
    problems: ['Handoffs require Slack messages', 'No standard process for common tasks', 'Onboarding takes 2 weeks to explain', 'Status reports built manually'],
    automations: ['Tasks auto-assigned on completion', 'SOPs generated and maintained in docs', 'Onboarding checklists run automatically', 'Status digest posted every morning'],
    outcome: 'Everyone knows what is happening. Work moves itself.',
  },
];

export const UseCasesPage: React.FC = () => {
  const [active, setActive] = useState('founder');
  const c = cases.find(x => x.id === active)!;

  return (
    <PageLayout title="Use Cases">
      <section className="ph">
        <div className="w">
          <Reveal>
            <div className="eyebrow" style={{ marginBottom: 16 }}>Use Cases</div>
            <h1 style={{ fontSize: 'clamp(var(--f40),6vw,var(--f80))', fontWeight: 900, letterSpacing: '-0.05em', lineHeight: 1.0, color: 'var(--t0)', marginBottom: 20 }}>
              Built for how<br/>you actually work.
            </h1>
            <p style={{ fontSize: 'var(--f16)', color: 'var(--t1)', maxWidth: 480, lineHeight: 1.7 }}>
              Different problems. Different workflows. Same approach: understand the mess, build the system.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="sec">
        <div className="w">
          {/* Persona tabs */}
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 40 }}>
            {cases.map(x => (
              <button key={x.id} onClick={() => setActive(x.id)}
                style={{ height: 32, padding: '0 16px', background: active === x.id ? 'var(--t0)' : 'var(--s2)', color: active === x.id ? 'var(--s0)' : 'var(--t1)', border: `1px solid ${active === x.id ? 'var(--t0)' : 'var(--b1)'}`, borderRadius: 'var(--rfull)', fontSize: 'var(--f13)', fontWeight: 600, cursor: 'pointer', transition: 'all 0.15s' }}>
                {x.label}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={active}
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22, ease: [0.22,1,0.36,1] }}
              style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(24px,4vw,64px)', background: 'var(--s1)', border: '1px solid var(--b1)', borderRadius: 'var(--r12)', padding: 'clamp(24px,4vw,48px)' }}
              className="uc-inner">
              <div>
                <h2 style={{ fontSize: 'clamp(var(--f18),2.5vw,var(--f28))', fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--t0)', lineHeight: 1.2, marginBottom: 16 }}>
                  {c.headline}
                </h2>
                <p style={{ fontSize: 'var(--f14)', color: 'var(--t1)', lineHeight: 1.7, marginBottom: 24 }}>{c.desc}</p>
                <div style={{ padding: 16, background: 'var(--blue-lo)', border: '1px solid var(--blue-b)', borderRadius: 'var(--r8)' }}>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: 'var(--f11)', color: 'var(--blue-hi)', letterSpacing: '0.08em', marginBottom: 4 }}>OUTCOME</div>
                  <div style={{ fontSize: 'var(--f14)', fontWeight: 600, color: 'var(--t0)' }}>{c.outcome}</div>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: 'var(--f11)', color: 'var(--err)', letterSpacing: '0.08em', marginBottom: 8 }}>BEFORE</div>
                  {c.problems.map(p => (
                    <div key={p} style={{ display: 'flex', gap: 8, padding: '7px 10px', background: 'var(--err-lo)', border: '1px solid rgba(220,38,38,0.12)', borderRadius: 'var(--r6)', marginBottom: 4 }}>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ flexShrink: 0, marginTop: 1 }}><path d="M1.5 1.5l9 9M10.5 1.5l-9 9" stroke="var(--err)" strokeWidth="1.3" strokeLinecap="round"/></svg>
                      <span style={{ fontSize: 'var(--f13)', color: 'var(--t1)' }}>{p}</span>
                    </div>
                  ))}
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: 'var(--f11)', color: 'var(--ok)', letterSpacing: '0.08em', marginBottom: 8 }}>AFTER</div>
                  {c.automations.map(a => (
                    <div key={a} style={{ display: 'flex', gap: 8, padding: '7px 10px', background: 'var(--ok-lo)', border: '1px solid rgba(22,163,74,0.15)', borderRadius: 'var(--r6)', marginBottom: 4 }}>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ flexShrink: 0, marginTop: 1 }}><path d="M1.5 6l3 3 6-6" stroke="var(--ok)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      <span style={{ fontSize: 'var(--f13)', color: 'var(--t1)' }}>{a}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          <style>{`.uc-inner{grid-template-columns:1fr 1fr}@media(max-width:760px){.uc-inner{grid-template-columns:1fr!important}}`}</style>

          <div style={{ marginTop: 40, textAlign: 'center' }}>
            <Link to="/contact" className="btn btn--lg btn--primary">Tell us your situation</Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default UseCasesPage;
