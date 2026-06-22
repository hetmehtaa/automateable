import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { PageLayout } from '../components/PageLayout';
import { Reveal } from '../components/Reveal';

const cases = [
  {
    id:'founder', label:'Founders',
    headline:'Turn scattered tasks into a founder command center.',
    desc:'You are context-switching between 12 tools, checking Slack every 10 minutes, and manually building your own reports. That is not running a company. That is operating a filing system.',
    problems:['No single view of the business','Repetitive weekly reporting','Manual lead tracking','Meeting notes lost forever'],
    automations:['Auto-generated weekly business digest','CRM pipeline updated from email','Meeting notes to action items','Revenue dashboard that updates itself'],
    outcome:'One view. Everything running. You just decide.',
  },
  {
    id:'creator', label:'Creators',
    headline:'Turn one idea into posts, threads, newsletters, and scripts.',
    desc:'You have the ideas. You lose hours turning each one into content manually. Distribution is painful. Repurposing feels like starting over every single time.',
    problems:['One piece of content takes 4 hours','Platform formatting is tedious','No consistent publishing rhythm','Analytics scattered everywhere'],
    automations:['One idea to posts, thread, newsletter, video script','Auto-scheduled content calendar','Performance summary every Monday','Top performers auto-repurposed'],
    outcome:'Create once. Ship everywhere. Measure automatically.',
  },
  {
    id:'business', label:'Small Business',
    headline:'Automate lead capture, follow-ups, support, and reporting.',
    desc:'Your team spends half its time on work a system could handle. Leads go cold. Reports are late. Support stacks up. Invoices take days.',
    problems:['Leads not followed up in time','Customer emails answered manually','Monthly reports built by hand','Invoice processing is slow'],
    automations:['Lead capture to CRM + follow-up instantly','Support triage with auto-routing','Monthly reports auto-generated','Document extraction and matching'],
    outcome:'Less manual execution. More actual business.',
  },
  {
    id:'professional', label:'Professionals',
    headline:'Automate research, emails, notes, and decision tracking.',
    desc:'Your work requires focus. Not copy-pasting data, formatting reports, or hunting emails. Every hour on admin is an hour not on actual work.',
    problems:['Research takes all morning','Email inbox unmanaged','Notes scattered everywhere','No system for decisions'],
    automations:['Research to briefing doc in minutes','Email triage and smart drafts','Notes linked to projects auto','Decision log updated automatically'],
    outcome:'Think more. Process less.',
  },
  {
    id:'team', label:'Teams',
    headline:'Build shared workflows that eliminate manual handoffs.',
    desc:'Work falls through cracks between people. Status requires a meeting. Onboarding is re-explained every time. Nobody knows what is actually done.',
    problems:['Handoffs require Slack messages','No standard process for common tasks','Onboarding takes 2 weeks','Status reports built manually'],
    automations:['Tasks auto-assigned on completion','SOPs generated and maintained','Onboarding checklists auto-run','Status digest posted daily'],
    outcome:'Everyone knows what is happening. Work moves itself.',
  },
];

export const UseCasesPage: React.FC = () => {
  const [active, setActive] = useState('founder');
  const c = cases.find(x=>x.id===active)!;

  return (
    <PageLayout title="Use Cases">
      <section style={{ padding:'clamp(48px,8vw,96px) 0 clamp(32px,4vw,56px)', borderBottom:'1px solid var(--line)' }}>
        <div className="wrap">
          <Reveal>
            <div className="label" style={{ marginBottom:'var(--s4)' }}>Use Cases</div>
            <h1 style={{ fontSize:'clamp(var(--t32),5vw,var(--t64))', fontWeight:900, letterSpacing:'-0.05em', lineHeight:1.05, color:'var(--t-hi)', marginBottom:'var(--s5)' }}>
              Built for how<br/>you actually work.
            </h1>
            <p style={{ fontSize:'var(--t16)', color:'var(--t-md)', maxWidth:'480px', lineHeight:1.65 }}>
              Different problems. Different workflows. Same approach: understand the mess, build the system.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="page-section">
        <div className="wrap">
          {/* Persona tabs */}
          <div style={{ display:'flex', gap:'6px', flexWrap:'wrap', marginBottom:'var(--s10)' }}>
            {cases.map(x=>(
              <button key={x.id} onClick={()=>setActive(x.id)}
                style={{ height:'32px', padding:'0 16px', background:active===x.id?'var(--t-hi)':'var(--bg-2)', color:active===x.id?'#0a0a0b':'var(--t-md)', border:`1px solid ${active===x.id?'var(--t-hi)':'var(--line)'}`, borderRadius:'var(--rfull)', fontSize:'var(--t13)', fontWeight:600, cursor:'pointer', transition:'all 0.15s' }}>
                {x.label}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={active}
              initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-10}}
              transition={{duration:0.25,ease:[0.22,1,0.36,1]}}
              style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'var(--s8)', background:'var(--bg-1)', border:'1px solid var(--line)', borderRadius:'var(--r20)', padding:'var(--s10)' }}
              className="uc-grid">
              <div>
                <h2 style={{ fontSize:'clamp(var(--t20),2.5vw,var(--t32))', fontWeight:800, color:'var(--t-hi)', letterSpacing:'-0.03em', lineHeight:1.2, marginBottom:'var(--s4)' }}>{c.headline}</h2>
                <p style={{ fontSize:'var(--t14)', color:'var(--t-md)', lineHeight:1.65, marginBottom:'var(--s6)' }}>{c.desc}</p>
                <div style={{ padding:'var(--s4)', background:'var(--blue-lo)', border:'1px solid var(--blue-line)', borderRadius:'var(--r10)' }}>
                  <div style={{ fontSize:'var(--t11)', fontWeight:700, letterSpacing:'0.08em', textTransform:'uppercase', color:'var(--blue-hi)', marginBottom:'5px' }}>Outcome</div>
                  <div style={{ fontSize:'var(--t14)', fontWeight:600, color:'var(--t-hi)' }}>{c.outcome}</div>
                </div>
              </div>
              <div style={{ display:'flex', flexDirection:'column', gap:'var(--s5)' }}>
                <div>
                  <div style={{ fontSize:'var(--t11)', fontWeight:700, letterSpacing:'0.08em', textTransform:'uppercase', color:'var(--red)', marginBottom:'var(--s3)' }}>Current pain</div>
                  <div style={{ display:'flex', flexDirection:'column', gap:'6px' }}>
                    {c.problems.map(p=>(
                      <div key={p} style={{ display:'flex', alignItems:'center', gap:'8px', padding:'7px 10px', background:'rgba(239,68,68,0.06)', border:'1px solid rgba(239,68,68,0.12)', borderRadius:'var(--r8)' }}>
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M1 1l10 10M11 1L1 11" stroke="var(--red)" strokeWidth="1.3" strokeLinecap="round"/></svg>
                        <span style={{ fontSize:'var(--t13)', color:'var(--t-md)' }}>{p}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize:'var(--t11)', fontWeight:700, letterSpacing:'0.08em', textTransform:'uppercase', color:'var(--green)', marginBottom:'var(--s3)' }}>After automation</div>
                  <div style={{ display:'flex', flexDirection:'column', gap:'6px' }}>
                    {c.automations.map(a=>(
                      <div key={a} style={{ display:'flex', alignItems:'center', gap:'8px', padding:'7px 10px', background:'rgba(34,197,94,0.06)', border:'1px solid rgba(34,197,94,0.12)', borderRadius:'var(--r8)' }}>
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M1.5 6l3 3 6-6" stroke="var(--green)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        <span style={{ fontSize:'var(--t13)', color:'var(--t-md)' }}>{a}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          <style>{`.uc-grid{grid-template-columns:1fr 1fr;padding:var(--s10)}@media(max-width:760px){.uc-grid{grid-template-columns:1fr!important;padding:var(--s6)!important}}`}</style>

          <div style={{ marginTop:'var(--s10)', textAlign:'center' }}>
            <Link to="/contact" className="btn btn--lg btn--primary">Tell us your situation</Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};
export default UseCasesPage;
