import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PageLayout } from '../components/PageLayout';
import { Reveal } from '../components/Reveal';

const services = [
  {
    tag:'Strategy', title:'Automation Consulting',
    desc:'We audit your current workflow, map every step, and identify what should be automated, delegated, or cut. You get a ranked opportunity list with effort and impact scores.',
    deliverables:['Workflow map','Automation opportunity report','Tool stack recommendation','Time savings estimate','Implementation roadmap'],
    cta:'/audit',
  },
  {
    tag:'Build', title:'Custom AI Agents',
    desc:'Task-specific agents built for your exact workflow. Research agents that synthesize sources. Reporting agents that pull and format data. Support agents that triage and respond.',
    deliverables:['Agent architecture','Custom prompt engineering','Tool integrations','Testing and QA','Documentation'],
    cta:'/contact',
  },
  {
    tag:'Integration', title:'AI Tool Implementation',
    desc:'We connect your existing tools into a working system. Notion, Slack, Google Workspace, HubSpot, Airtable, APIs, AI models. The tools are fine. The connections are the problem.',
    deliverables:['Tool audit','Integration architecture','Workflow automation','Error handling','Handoff docs'],
    cta:'/contact',
  },
  {
    tag:'Content', title:'Social Media Automation',
    desc:'From raw idea to scheduled post across platforms. We build the pipeline: capture, research, draft, repurpose, schedule, analyze. One input. Many outputs.',
    deliverables:['Content pipeline design','Repurposing workflows','Scheduling automation','Analytics summary agent','Hook testing system'],
    cta:'/contact',
  },
  {
    tag:'Personal', title:'Personal Automation',
    desc:'Your personal operating system. Morning briefing, reading capture, finance tracker, travel planning, habit tracking, email triage. Life admin should not consume your best hours.',
    deliverables:['Morning briefing agent','Knowledge capture system','Finance tracking automation','Email and calendar triage','Custom dashboard'],
    cta:'/contact',
  },
  {
    tag:'Ops', title:'Business Process Automation',
    desc:'Internal operations that run without you. Lead capture, follow-up sequences, support triage, monthly reports, document processing, team handoffs. Dashboards, triggers, and execution systems.',
    deliverables:['Process audit','Trigger-based workflows','Reporting automation','Document processing','Team handoff systems'],
    cta:'/contact',
  },
];

export const ServicesPage: React.FC = () => (
  <PageLayout title="Services">
    {/* Header */}
    <section style={{ padding:'clamp(48px,8vw,96px) 0 clamp(32px,4vw,56px)', borderBottom:'1px solid var(--line)' }}>
      <div className="wrap">
        <Reveal>
          <div className="label" style={{ marginBottom:'var(--s4)' }}>What we do</div>
          <h1 style={{ fontSize:'clamp(var(--t32),5vw,var(--t64))', fontWeight:900, letterSpacing:'-0.05em', lineHeight:1.05, color:'var(--t-hi)', marginBottom:'var(--s5)', maxWidth:'680px' }}>
            Six services.<br/>One goal: fewer manual tasks.
          </h1>
          <p style={{ fontSize:'var(--t16)', color:'var(--t-md)', maxWidth:'520px', lineHeight:1.65, marginBottom:'var(--s8)' }}>
            We work at the level your problem requires. A single automation audit. A full build sprint. An ongoing retainer. Whatever it takes to turn the bottleneck into a system.
          </p>
          <Link to="/audit" className="btn btn--lg btn--primary">Start with an audit</Link>
        </Reveal>
      </div>
    </section>

    {/* Services */}
    <section className="page-section">
      <div className="wrap">
        <div style={{ display:'flex', flexDirection:'column', gap:'var(--s4)' }}>
          {services.map((s,i) => (
            <Reveal key={s.title} delay={i*0.06}>
              <motion.div whileHover={{ borderColor:'var(--line-3)' }}
                style={{ background:'var(--bg-1)', border:'1px solid var(--line)', borderRadius:'var(--r16)', padding:'var(--s8)', transition:'border-color 0.2s', display:'grid', gridTemplateColumns:'1fr auto', gap:'var(--s8)', alignItems:'start' }}
                className="svc-card">
                <div>
                  <div style={{ display:'flex', alignItems:'center', gap:'var(--s3)', marginBottom:'var(--s4)' }}>
                    <span className="chip chip--muted">{s.tag}</span>
                  </div>
                  <h2 style={{ fontSize:'clamp(var(--t20),2vw,var(--t28))', fontWeight:800, color:'var(--t-hi)', letterSpacing:'-0.03em', marginBottom:'var(--s3)' }}>{s.title}</h2>
                  <p style={{ fontSize:'var(--t15)', color:'var(--t-md)', lineHeight:1.65, maxWidth:'580px', marginBottom:'var(--s6)' }}>{s.desc}</p>
                  <div style={{ display:'flex', flexWrap:'wrap', gap:'var(--s2)' }}>
                    {s.deliverables.map(d => (
                      <span key={d} style={{ display:'inline-flex', alignItems:'center', gap:'5px', fontSize:'var(--t12)', fontWeight:500, color:'var(--t-lo)', background:'var(--bg-3)', border:'1px solid var(--line)', borderRadius:'var(--rfull)', padding:'3px 10px' }}>
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5l2 2 4-4" stroke="var(--blue)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        {d}
                      </span>
                    ))}
                  </div>
                </div>
                <div style={{ flexShrink:0 }}>
                  <Link to={s.cta} className="btn btn--md btn--ghost" style={{ whiteSpace:'nowrap' }}>
                    Get started
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M2.5 6.5h8M7 3.5l3 3-3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </Link>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section style={{ padding:'clamp(48px,6vw,80px) 0', borderTop:'1px solid var(--line)', background:'var(--bg-1)' }}>
      <div className="wrap wrap--sm" style={{ textAlign:'center' }}>
        <Reveal>
          <h2 style={{ fontSize:'clamp(var(--t24),3vw,var(--t40))', fontWeight:900, letterSpacing:'-0.04em', color:'var(--t-hi)', marginBottom:'var(--s4)' }}>Not sure which fits?</h2>
          <p style={{ color:'var(--t-lo)', marginBottom:'var(--s8)', fontSize:'var(--t15)' }}>Start with an audit. It diagnoses the problem and tells you exactly what to build next.</p>
          <Link to="/audit" className="btn btn--lg btn--primary">Book an Automation Audit</Link>
        </Reveal>
      </div>
    </section>
    <style>{`.svc-card{grid-template-columns:1fr auto}@media(max-width:640px){.svc-card{grid-template-columns:1fr!important}}`}</style>
  </PageLayout>
);
export default ServicesPage;
