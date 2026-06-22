import React from 'react';
import { Link } from 'react-router-dom';
import { PageLayout } from '../components/PageLayout';
import { Reveal, Stagger, SI } from '../components/Reveal';
import { Footer } from '../sections/Footer';

const pillars = [
  { n: 'I',   title: 'Consulting firm',    desc: 'We diagnose before we prescribe. Every engagement starts with mapping the actual problem, not selling a solution.' },
  { n: 'II',  title: 'Automation lab',     desc: 'We build real systems using real tools. Not decks, not strategies. Working automations that run without you.' },
  { n: 'III', title: 'AI product studio',  desc: 'We build and maintain our own AI tools. Use them directly or as part of a custom engagement.' },
  { n: 'IV',  title: 'Workflow partner',   desc: 'We embed in your operations and architect the connective tissue that makes everything run.' },
];

const beliefs = [
  'Most people do not need more apps. They need better systems.',
  'Automation without diagnosis is expensive technical debt.',
  'The best systems are invisible. You just stop doing the manual work.',
  'A workflow that works is worth more than a tool that impresses.',
];

const principles = [
  { code: 'PR.01', title: 'Diagnose first',           desc: 'We map the workflow before recommending anything. Always.' },
  { code: 'PR.02', title: 'No mystery retainers',      desc: 'Every engagement is scoped. You know what you are paying for before you commit.' },
  { code: 'PR.03', title: 'Measurable outcomes',       desc: 'Time saved, tasks automated, ROI tracked. Not vibes.' },
  { code: 'PR.04', title: 'Human approval where needed', desc: 'We automate the predictable. Judgment stays with humans.' },
  { code: 'PR.05', title: 'Maintainable systems',      desc: 'Every automation is documented so your team can own it.' },
];

export const AboutPage: React.FC = () => (
  <PageLayout title="About">
    {/* Header */}
    <section className="ph" style={{ background: 'var(--paper)' }} >
      <div className="w">
        <Reveal>
          <div className="label" style={{ marginBottom: 16 }}>About</div>
          <h1 style={{ fontSize: 'clamp(var(--f40),6vw,var(--f80))', fontWeight: 900, letterSpacing: '-0.05em', lineHeight: 1.0, color: 'var(--ink-0)', marginBottom: 20, maxWidth: 680 }}>
            We exist because
            <br />
            <span className="g-text-blue">systems beat tools.</span>
          </h1>
          <p style={{ fontSize: 'var(--f16)', color: 'var(--ink-2)', maxWidth: 520, lineHeight: 1.7 }}>
            Most people do not need another AI tool. They need a system that connects the tools they already have.
          </p>
        </Reveal>
      </div>
    </section>

    {/* Story + pillars */}
    <section className="sec" style={{ borderBottom: '1px solid var(--border)', background: 'white' }}>
      <div  style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(32px,5vw,80px)' }} className="about-g">
        <Reveal direction="left">
          <p style={{ fontSize: 'var(--f16)', color: 'var(--ink-1)', lineHeight: 1.75, marginBottom: 20 }}>
            We started automateable because we kept seeing the same problem: smart people drowning in manual work that had no business being manual.
          </p>
          <p style={{ fontSize: 'var(--f15)', color: 'var(--ink-2)', lineHeight: 1.7, marginBottom: 20 }}>
            The tools existed. The AI was there. But nobody had put it together into a system that actually worked for the specific workflow, the specific team, the specific problem.
          </p>
          <p style={{ fontSize: 'var(--f15)', color: 'var(--ink-2)', lineHeight: 1.7, marginBottom: 40 }}>
            So we built the practice around doing that well. Diagnosis first. Architecture second. Build third. No guessing.
          </p>
          <div style={{ padding: '20px 24px', background: 'var(--paper-1)', border: '1px solid var(--border-2)', borderLeft: '3px solid var(--blue)', borderRadius: 'var(--r-8)' }}>
            <div style={{ fontSize: 'var(--f18)', fontWeight: 700, color: 'var(--ink-0)', letterSpacing: '-0.025em', lineHeight: 1.4, marginBottom: 6 }}>
              "Send the messy version. We will map the system."
            </div>
            <div style={{ fontSize: 'var(--f13)', color: 'var(--ink-3)' }}>
              We have heard every version of "our workflow is complicated." That is fine. Complicated is our job.
            </div>
          </div>
        </Reveal>

        <Stagger style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {pillars.map((p, i) => (
            <SI key={p.n}>
              <div style={{ display: 'flex', gap: 20, padding: '20px 0', borderBottom: i < pillars.length - 1 ? '1px solid var(--border)' : 'none' }}>
                <span style={{ fontFamily: 'var(--mono)', fontSize: 'var(--f11)', color: 'var(--ink-4)', fontWeight: 600, width: 32, flexShrink: 0, paddingTop: 3 }}>{p.n}</span>
                <div>
                  <div style={{ fontSize: 'var(--f14)', fontWeight: 700, color: 'var(--ink-0)', marginBottom: 4 }}>{p.title}</div>
                  <div style={{ fontSize: 'var(--f13)', color: 'var(--ink-3)', lineHeight: 1.6 }}>{p.desc}</div>
                </div>
              </div>
            </SI>
          ))}
        </Stagger>
        <style>{`.about-g{grid-template-columns:1fr 1fr}@media(max-width:760px){.about-g{grid-template-columns:1fr!important}}`}</style>
      </div>
    </section>

    {/* Operating Principles */}
    <section className="sec" style={{ borderBottom: '1px solid var(--border)', background: 'var(--paper)' }}>
      <div className="w">
        <Reveal style={{ marginBottom: 40 }}>
          <div className="label" style={{ marginBottom: 12 }}>Operating principles</div>
          <h2 style={{ fontSize: 'clamp(var(--f24),3vw,var(--f40))', fontWeight: 900, letterSpacing: '-0.04em', color: 'var(--ink-0)' }}>How we work</h2>
        </Reveal>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {principles.map((p, i) => (
            <Reveal key={p.code} delay={i * 0.06}>
              <div style={{ display: 'flex', gap: 24, padding: '18px 0', borderBottom: i < principles.length - 1 ? '1px solid var(--border)' : 'none' }}>
                <span style={{ fontFamily: 'var(--mono)', fontSize: 'var(--f10)', color: 'var(--ink-4)', fontWeight: 600, width: 44, flexShrink: 0, paddingTop: 3 }}>{p.code}</span>
                <div>
                  <div style={{ fontSize: 'var(--f15)', fontWeight: 700, color: 'var(--ink-0)', marginBottom: 3 }}>{p.title}</div>
                  <div style={{ fontSize: 'var(--f13)', color: 'var(--ink-3)', lineHeight: 1.6 }}>{p.desc}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>

    {/* Beliefs */}
    <section className="sec" style={{ borderBottom: '1px solid var(--border)', background: 'white' }}>
      <div className="w">
        <Reveal style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 'clamp(var(--f24),3vw,var(--f36))', fontWeight: 900, letterSpacing: '-0.04em', color: 'var(--ink-0)' }}>What we believe</h2>
        </Reveal>
        <Stagger style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }} className="beliefs-g">
          {beliefs.map((b, i) => (
            <SI key={i}>
              <div style={{ display: 'flex', gap: 16, padding: 20, background: 'var(--paper-1)', border: '1px solid var(--border)', borderRadius: 'var(--r-10)' }}>
                <span style={{ fontFamily: 'var(--mono)', fontSize: 'var(--f11)', fontWeight: 700, color: 'var(--ink-4)', paddingTop: 3, flexShrink: 0 }}>{String(i + 1).padStart(2, '0')}</span>
                <span style={{ fontSize: 'var(--f14)', color: 'var(--ink-1)', lineHeight: 1.65 }}>{b}</span>
              </div>
            </SI>
          ))}
        </Stagger>
        <style>{`.beliefs-g{grid-template-columns:1fr 1fr}@media(max-width:640px){.beliefs-g{grid-template-columns:1fr!important}}`}</style>
      </div>
    </section>

    <section className="sec--sm" style={{ background: 'var(--paper)' }}>
      <div className="w w--sm" style={{ textAlign: 'center' }}>
        <Reveal>
          <h2 style={{ fontSize: 'clamp(var(--f20),3vw,var(--f32))', fontWeight: 900, letterSpacing: '-0.04em', color: 'var(--ink-0)', marginBottom: 12 }}>Work with us</h2>
          <p style={{ color: 'var(--ink-3)', marginBottom: 24, fontSize: 'var(--f14)' }}>Start with an audit. Send the messy version.</p>
          <Link to="/contact" className="btn btn--lg btn--primary">Get in touch</Link>
        </Reveal>
      </div>
    </section>

    <Footer />
  </PageLayout>
);

export default AboutPage;
