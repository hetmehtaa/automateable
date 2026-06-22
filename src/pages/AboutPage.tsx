import React from 'react';
import { Link } from 'react-router-dom';
import { PageLayout } from '../components/PageLayout';
import { Reveal, Stagger, SI } from '../components/Reveal';

const pillars = [
  { code: 'I', title: 'Consulting firm', desc: 'We diagnose before we prescribe. Every engagement starts with mapping the actual problem, not selling a solution.' },
  { code: 'II', title: 'Automation lab', desc: 'We build real systems using real tools. Not decks, not strategies. Working automations that run without you.' },
  { code: 'III', title: 'AI product studio', desc: 'We build and maintain our own AI tools. Use them directly or as part of a custom engagement.' },
  { code: 'IV', title: 'Workflow partner', desc: 'We embed in your operations and architect the connective tissue that makes everything run.' },
];

const beliefs = [
  'Most people do not need more apps. They need better systems.',
  'Automation without diagnosis is expensive technical debt.',
  'The best systems are invisible. You just stop doing the manual work.',
  'A workflow that works is worth more than a tool that impresses.',
];

export const AboutPage: React.FC = () => (
  <PageLayout title="About">
    <section className="ph">
      <div className="w">
        <Reveal>
          <div className="eyebrow" style={{ marginBottom: 16 }}>About</div>
          <h1 style={{ fontSize: 'clamp(var(--f40),6vw,var(--f80))', fontWeight: 900, letterSpacing: '-0.05em', lineHeight: 1.0, color: 'var(--t0)', maxWidth: 680 }}>
            Part consulting firm.<br/>Part automation lab.<br/>
            <span style={{ background: 'linear-gradient(90deg, var(--blue-hi), #60c0ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Part AI product studio.
            </span>
          </h1>
        </Reveal>
      </div>
    </section>

    <section className="sec" style={{ borderBottom: '1px solid var(--b1)' }}>
      <div  style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(32px,5vw,80px)' }} className="about-g">
        <Reveal direction="left">
          <p style={{ fontSize: 'var(--f16)', color: 'var(--t1)', lineHeight: 1.75, marginBottom: 20 }}>
            We started automateable because we kept seeing the same problem: smart people and capable businesses drowning in manual work that had no business being manual.
          </p>
          <p style={{ fontSize: 'var(--f15)', color: 'var(--t2)', lineHeight: 1.7, marginBottom: 20 }}>
            The tools existed. The AI was there. But nobody had put it together into a system that actually worked for the specific workflow, the specific team, the specific problem.
          </p>
          <p style={{ fontSize: 'var(--f15)', color: 'var(--t2)', lineHeight: 1.7, marginBottom: 40 }}>
            So we built the practice around doing that well. Diagnosis first. Architecture second. Build third. No guessing. No generic solutions applied to unique problems.
          </p>
          <div style={{ padding: '24px 28px', background: 'var(--s2)', border: '1px solid var(--b1)', borderRadius: 'var(--r12)', borderLeft: `3px solid var(--blue)` }}>
            <div style={{ fontSize: 'var(--f18)', fontWeight: 700, color: 'var(--t0)', letterSpacing: '-0.025em', lineHeight: 1.4, marginBottom: 8 }}>
              "Send the messy version.<br/>We will map the system."
            </div>
            <div style={{ fontSize: 'var(--f13)', color: 'var(--t2)' }}>
              We have heard every version of "our workflow is complicated." Complicated is our job.
            </div>
          </div>
        </Reveal>

        <Stagger style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {pillars.map(p => (
            <SI key={p.code}>
              <div style={{ display: 'flex', gap: 20, padding: '20px 0', borderBottom: '1px solid var(--b1)' }}>
                <span style={{ fontFamily: 'var(--mono)', fontSize: 'var(--f11)', color: 'var(--t3)', fontWeight: 600, width: 28, flexShrink: 0, paddingTop: 3 }}>{p.code}</span>
                <div>
                  <div style={{ fontSize: 'var(--f15)', fontWeight: 700, color: 'var(--t0)', marginBottom: 5, letterSpacing: '-0.02em' }}>{p.title}</div>
                  <div style={{ fontSize: 'var(--f13)', color: 'var(--t2)', lineHeight: 1.6 }}>{p.desc}</div>
                </div>
              </div>
            </SI>
          ))}
        </Stagger>
        <style>{`.about-g{grid-template-columns:1fr 1fr}@media(max-width:760px){.about-g{grid-template-columns:1fr!important}}`}</style>
      </div>
    </section>

    <section className="sec" style={{ borderBottom: '1px solid var(--b1)' }}>
      <div className="w">
        <Reveal style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 'clamp(var(--f20),2.5vw,var(--f32))', fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--t0)' }}>What we believe</h2>
        </Reveal>
        <Stagger style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }} className="beliefs-g">
          {beliefs.map((b, i) => (
            <SI key={i}>
              <div style={{ display: 'flex', gap: 16, padding: 20, background: 'var(--s1)', border: '1px solid var(--b1)', borderRadius: 'var(--r10)' }}>
                <span style={{ fontFamily: 'var(--mono)', fontSize: 'var(--f11)', fontWeight: 700, color: 'var(--t3)', paddingTop: 3, flexShrink: 0 }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span style={{ fontSize: 'var(--f15)', color: 'var(--t1)', lineHeight: 1.65 }}>{b}</span>
              </div>
            </SI>
          ))}
        </Stagger>
        <style>{`.beliefs-g{grid-template-columns:1fr 1fr}@media(max-width:640px){.beliefs-g{grid-template-columns:1fr!important}}`}</style>
      </div>
    </section>

    <section className="sec--sm">
      <div className="w w--sm" style={{ textAlign: 'center' }}>
        <Reveal>
          <h2 style={{ fontSize: 'clamp(var(--f20),3vw,var(--f36))', fontWeight: 900, letterSpacing: '-0.04em', color: 'var(--t0)', marginBottom: 12 }}>Work with us</h2>
          <p style={{ color: 'var(--t2)', marginBottom: 24, fontSize: 'var(--f14)' }}>Start with an audit. Send the messy version.</p>
          <Link to="/contact" className="btn btn--lg btn--primary">Get in touch</Link>
        </Reveal>
      </div>
    </section>
  </PageLayout>
);

export default AboutPage;
