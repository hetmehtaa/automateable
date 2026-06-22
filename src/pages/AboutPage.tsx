import React from 'react';
import { Link } from 'react-router-dom';
import { PageLayout } from '../components/PageLayout';
import { Reveal, Stagger, SI } from '../components/Reveal';

const beliefs = [
  { n:'01', text:"Most people don't need more apps. They need better systems." },
  { n:'02', text:'Automation without diagnosis is expensive technical debt.' },
  { n:'03', text:'The best systems are invisible. You just stop doing the manual work.' },
  { n:'04', text:'A workflow that works is worth more than a tool that impresses.' },
];

const pillars = [
  { title:'Consulting firm', desc:'We diagnose before we prescribe. Every engagement starts with understanding the actual problem, not selling a solution.' },
  { title:'Automation lab', desc:'We build real systems using real tools. Not decks. Not strategies. Working automations that run without you.' },
  { title:'AI product studio', desc:'We build and maintain our own AI tools. Use them directly or as part of a custom engagement.' },
  { title:'Workflow partner', desc:'We embed in your operations and architect the connective tissue that makes everything run.' },
];

export const AboutPage: React.FC = () => (
  <PageLayout title="About">
    <section style={{ padding:'clamp(48px,8vw,96px) 0 clamp(32px,4vw,56px)', borderBottom:'1px solid var(--line)' }}>
      <div className="wrap">
        <Reveal>
          <div className="label" style={{ marginBottom:'var(--s4)' }}>About</div>
          <h1 style={{ fontSize:'clamp(var(--t32),5vw,var(--t64))', fontWeight:900, letterSpacing:'-0.05em', lineHeight:1.05, color:'var(--t-hi)', marginBottom:'var(--s5)', maxWidth:'680px' }}>
            Part consulting firm.<br/>Part automation lab.<br/><span className="g-text">Part AI product studio.</span>
          </h1>
        </Reveal>
      </div>
    </section>

    <section className="page-section" style={{ borderBottom:'1px solid var(--line)' }}>
      <div  style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'clamp(32px,5vw,80px)' }} className="about-g">
        <Reveal direction="left">
          <p style={{ fontSize:'var(--t16)', color:'var(--t-md)', lineHeight:1.7, marginBottom:'var(--s5)' }}>
            We started automateable because we kept seeing the same problem: smart people and capable businesses drowning in manual work that had no business being manual.
          </p>
          <p style={{ fontSize:'var(--t15)', color:'var(--t-lo)', lineHeight:1.7, marginBottom:'var(--s5)' }}>
            The tools existed. The AI was there. But nobody had put it together into a system that actually worked for the specific workflow, the specific team, the specific problem.
          </p>
          <p style={{ fontSize:'var(--t15)', color:'var(--t-lo)', lineHeight:1.7, marginBottom:'var(--s8)' }}>
            So we built the practice around doing that well. Diagnosis first. Architecture second. Build third. No guessing. No generic solutions applied to unique problems.
          </p>
          <div style={{ background:'var(--bg-2)', border:'1px solid var(--line)', borderRadius:'var(--r12)', padding:'var(--s6)' }}>
            <div style={{ fontSize:'var(--t18)', fontWeight:800, color:'var(--t-hi)', letterSpacing:'-0.02em', lineHeight:1.3, marginBottom:'var(--s2)' }}>
              "Send the messy version. We will map the system."
            </div>
            <div style={{ fontSize:'var(--t13)', color:'var(--t-lo)' }}>
              We have heard every version of "our workflow is complicated." That is fine. Complicated is our job.
            </div>
          </div>
        </Reveal>

        <Reveal direction="right">
          <Stagger style={{ display:'flex', flexDirection:'column', gap:'var(--s3)' }}>
            {pillars.map(p=>(
              <SI key={p.title}>
                <div style={{ padding:'var(--s5)', background:'var(--bg-1)', border:'1px solid var(--line)', borderRadius:'var(--r12)' }}>
                  <div style={{ fontSize:'var(--t14)', fontWeight:700, color:'var(--t-hi)', marginBottom:'4px' }}>{p.title}</div>
                  <div style={{ fontSize:'var(--t13)', color:'var(--t-lo)', lineHeight:1.55 }}>{p.desc}</div>
                </div>
              </SI>
            ))}
          </Stagger>
        </Reveal>
        <style>{`.about-g{grid-template-columns:1fr 1fr}@media(max-width:760px){.about-g{grid-template-columns:1fr!important}}`}</style>
      </div>
    </section>

    <section className="page-section" style={{ borderBottom:'1px solid var(--line)' }}>
      <div className="wrap">
        <Reveal style={{ marginBottom:'var(--s10)' }}>
          <h2 style={{ fontSize:'clamp(var(--t20),2.5vw,var(--t32))', fontWeight:800, color:'var(--t-hi)', letterSpacing:'-0.03em' }}>What we believe</h2>
        </Reveal>
        <Stagger style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:'var(--s4)' }} className="beliefs-g">
          {beliefs.map(b=>(
            <SI key={b.n}>
              <div style={{ padding:'var(--s6)', background:'var(--bg-1)', border:'1px solid var(--line)', borderRadius:'var(--r12)', display:'flex', gap:'var(--s4)' }}>
                <span style={{ fontSize:'var(--t12)', fontWeight:800, color:'var(--t-xlo)', fontFamily:'var(--mono)', flexShrink:0, paddingTop:'3px' }}>{b.n}</span>
                <span style={{ fontSize:'var(--t15)', color:'var(--t-md)', lineHeight:1.6 }}>{b.text}</span>
              </div>
            </SI>
          ))}
        </Stagger>
        <style>{`.beliefs-g{grid-template-columns:repeat(2,1fr)}@media(max-width:640px){.beliefs-g{grid-template-columns:1fr!important}}`}</style>
      </div>
    </section>

    <section style={{ padding:'clamp(48px,6vw,80px) 0' }}>
      <div className="wrap wrap--sm" style={{ textAlign:'center' }}>
        <Reveal>
          <h2 style={{ fontSize:'clamp(var(--t24),3vw,var(--t40))', fontWeight:900, letterSpacing:'-0.04em', color:'var(--t-hi)', marginBottom:'var(--s4)' }}>Work with us</h2>
          <p style={{ color:'var(--t-lo)', marginBottom:'var(--s8)', fontSize:'var(--t15)' }}>Start with an audit. Tell us the messy version. We will turn it into a system.</p>
          <Link to="/contact" className="btn btn--lg btn--primary">Get in touch</Link>
        </Reveal>
      </div>
    </section>
  </PageLayout>
);
export default AboutPage;
