import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PageLayout } from '../components/PageLayout';
import { Reveal, Stagger, SI } from '../components/Reveal';

const deliverables = [
  { title:'Workflow map', desc:'Visual diagram of every step in your current process.', icon:<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="2" y="2" width="4" height="4" rx="1" stroke="currentColor" strokeWidth="1.2"/><rect x="10" y="2" width="4" height="4" rx="1" stroke="currentColor" strokeWidth="1.2"/><rect x="6" y="10" width="4" height="4" rx="1" stroke="currentColor" strokeWidth="1.2"/><path d="M4 6v2h4v2M12 6v2H8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg> },
  { title:'Opportunity report', desc:'Every automation ranked by time saved and build effort.', icon:<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 12l4-4 3 3 5-7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg> },
  { title:'Tool recommendations', desc:'The exact tools that fit your workflow and budget.', icon:<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M13 2l-5 5M2 13l5-5M10 6l4-4-4 0 0 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg> },
  { title:'Time savings estimate', desc:'Projected hours saved per week, per automation.', icon:<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.2"/><path d="M8 5v3l2 2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg> },
  { title:'Implementation roadmap', desc:'A step-by-step build plan with timeline and priorities.', icon:<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 4h10M3 8h7M3 12h4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg> },
  { title:'Quick-win automations', desc:'Three things you can implement this week.', icon:<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 2v4M4.5 4.5l2.5 2.5M2 8h4M4.5 11.5l2.5-2.5M8 14v-4M11.5 11.5L9 9M14 8h-4M11.5 4.5L9 7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg> },
];

const faqs = [
  { q:'How long does the audit take?', a:'3-5 business days from intake form submission to full report delivery.' },
  { q:'Do I need to know what to automate?', a:'No. You describe the problem. We identify the opportunities. Most people come to us knowing what hurts, not what to build.' },
  { q:'What do I need to prepare?', a:'Fill out the intake form with your workflow description, current tools, and biggest time sinks. A 30-minute follow-up call is optional but often useful.' },
  { q:'What happens after the audit?', a:'You decide. Implement it yourself, move into a Build Sprint, or start a Retainer. The audit stands alone as a complete deliverable.' },
  { q:'Is the audit price fixed?', a:'Yes. Fixed scope, fixed price. No surprise billing.' },
];

export const AuditPage: React.FC = () => (
  <PageLayout title="Automation Audit">
    <section style={{ padding:'clamp(48px,8vw,96px) 0 clamp(32px,4vw,56px)', borderBottom:'1px solid var(--line)' }}>
      <div className="wrap">
        <Reveal>
          <div className="label" style={{ marginBottom:'var(--s4)' }}>Automation Audit</div>
          <h1 style={{ fontSize:'clamp(var(--t32),5vw,var(--t64))', fontWeight:900, letterSpacing:'-0.05em', lineHeight:1.05, color:'var(--t-hi)', marginBottom:'var(--s5)', maxWidth:'700px' }}>
            Before we build anything,<br/>we map the workflow.
          </h1>
          <p style={{ fontSize:'var(--t16)', color:'var(--t-md)', maxWidth:'520px', lineHeight:1.65, marginBottom:'var(--s8)' }}>
            Most automation projects fail because they skip diagnosis. We start every engagement with a fixed-scope audit that tells you exactly what to build, what to skip, and what you will save.
          </p>
          <div style={{ display:'flex', alignItems:'center', gap:'var(--s4)', flexWrap:'wrap' }}>
            <Link to="/contact" className="btn btn--lg btn--primary">Start with an audit</Link>
            <span style={{ fontSize:'var(--t13)', color:'var(--t-lo)' }}>Starting at $497 &middot; 3-5 business days</span>
          </div>
        </Reveal>
      </div>
    </section>

    {/* Deliverables */}
    <section className="page-section" style={{ borderBottom:'1px solid var(--line)' }}>
      <div className="wrap">
        <Reveal style={{ marginBottom:'var(--s10)' }}>
          <h2 style={{ fontSize:'clamp(var(--t20),2.5vw,var(--t32))', fontWeight:800, color:'var(--t-hi)', letterSpacing:'-0.03em' }}>What you get</h2>
        </Reveal>
        <Stagger style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'var(--s4)' }} className="del-g">
          {deliverables.map(d=>(
            <SI key={d.title}>
              <div style={{ padding:'var(--s5)', background:'var(--bg-1)', border:'1px solid var(--line)', borderRadius:'var(--r12)' }}>
                <div style={{ color:'var(--blue-hi)', marginBottom:'var(--s3)' }}>{d.icon}</div>
                <div style={{ fontSize:'var(--t14)', fontWeight:700, color:'var(--t-hi)', marginBottom:'4px' }}>{d.title}</div>
                <div style={{ fontSize:'var(--t13)', color:'var(--t-lo)', lineHeight:1.55 }}>{d.desc}</div>
              </div>
            </SI>
          ))}
        </Stagger>
        <style>{`.del-g{grid-template-columns:repeat(3,1fr)}@media(max-width:720px){.del-g{grid-template-columns:repeat(2,1fr)!important}}@media(max-width:480px){.del-g{grid-template-columns:1fr!important}}`}</style>
      </div>
    </section>

    {/* Audit report preview */}
    <section className="page-section" style={{ borderBottom:'1px solid var(--line)' }}>
      <div  style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'clamp(32px,5vw,80px)', alignItems:'center' }} className="audit-split">
        <Reveal direction="left">
          <div className="label" style={{ marginBottom:'var(--s4)' }}>Sample output</div>
          <h2 style={{ fontSize:'clamp(var(--t20),2.5vw,var(--t36))', fontWeight:800, color:'var(--t-hi)', letterSpacing:'-0.03em', marginBottom:'var(--s4)' }}>
            This is what the report looks like.
          </h2>
          <p style={{ fontSize:'var(--t14)', color:'var(--t-md)', lineHeight:1.65, marginBottom:'var(--s6)' }}>
            Every opportunity ranked by weekly time saved. Every item assigned a priority level. Quick wins you can act on immediately.
          </p>
          <Link to="/contact" className="btn btn--md btn--primary">Get yours in 5 days</Link>
        </Reveal>

        <Reveal direction="right">
          <div style={{ background:'var(--bg-1)', border:'1px solid var(--line)', borderRadius:'var(--r16)', overflow:'hidden', boxShadow:'var(--sh-xl)' }}>
            <div style={{ padding:'14px 18px', borderBottom:'1px solid var(--line)', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
              <span style={{ fontSize:'var(--t12)', fontWeight:700, color:'var(--t-hi)' }}>Automation Audit Report</span>
              <span className="chip chip--blue" style={{ fontSize:'var(--t10)' }}>Draft</span>
            </div>
            <div style={{ padding:'16px 18px', borderBottom:'1px solid var(--line)', display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'12px' }}>
              {[{l:'Score',v:'34/100',c:'var(--amber)'},{l:'Time/wk',v:'9.25h',c:'var(--red)'},{l:'Quick wins',v:'5',c:'var(--green)'}].map(m=>(
                <div key={m.l} style={{ textAlign:'center' }}>
                  <div style={{ fontSize:'22px', fontWeight:900, color:m.c, letterSpacing:'-0.04em' }}>{m.v}</div>
                  <div style={{ fontSize:'9px', color:'var(--t-xlo)', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.07em', marginTop:'2px' }}>{m.l}</div>
                </div>
              ))}
            </div>
            <div style={{ padding:'14px 18px' }}>
              <div style={{ fontSize:'10px', fontWeight:700, color:'var(--t-xlo)', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:'10px' }}>Top opportunities</div>
              {[
                {l:'Manual report compilation',s:'3h/wk',p:'high'},
                {l:'CRM data entry',s:'2h/wk',p:'high'},
                {l:'Email follow-ups',s:'1.5h/wk',p:'medium'},
                {l:'Social scheduling',s:'2h/wk',p:'medium'},
                {l:'Invoice processing',s:'45min/wk',p:'low'},
              ].map((item,i)=>(
                <motion.div key={i} initial={{opacity:0,x:-8}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{delay:i*0.06}}
                  style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'7px 10px', background:'var(--bg-2)', borderRadius:'var(--r6)', marginBottom:'5px', border:'1px solid var(--line)' }}>
                  <div style={{ display:'flex', alignItems:'center', gap:'8px' }}>
                    <div style={{ width:'6px', height:'6px', borderRadius:'50%', background:item.p==='high'?'var(--red)':item.p==='medium'?'var(--amber)':'var(--green)', flexShrink:0 }}/>
                    <span style={{ fontSize:'11px', fontWeight:600, color:'var(--t-hi)' }}>{item.l}</span>
                  </div>
                  <span style={{ fontSize:'11px', fontWeight:700, color:'var(--green)' }}>+{item.s}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </Reveal>
        <style>{`.audit-split{grid-template-columns:1fr 1fr}@media(max-width:800px){.audit-split{grid-template-columns:1fr!important}}`}</style>
      </div>
    </section>

    {/* FAQ */}
    <section className="page-section">
      <div className="wrap wrap--lg">
        <Reveal style={{ marginBottom:'var(--s10)' }}>
          <h2 style={{ fontSize:'clamp(var(--t20),2.5vw,var(--t32))', fontWeight:800, color:'var(--t-hi)', letterSpacing:'-0.03em' }}>Questions</h2>
        </Reveal>
        <div style={{ display:'flex', flexDirection:'column', gap:'var(--s2)' }}>
          {faqs.map((f,i)=>(
            <Reveal key={i} delay={i*0.05}>
              <AuditFAQ q={f.q} a={f.a} />
            </Reveal>
          ))}
        </div>
        <Reveal style={{ marginTop:'var(--s12)', textAlign:'center' }}>
          <Link to="/contact" className="btn btn--xl btn--primary">Book your audit now</Link>
        </Reveal>
      </div>
    </section>
  </PageLayout>
);

const AuditFAQ: React.FC<{q:string;a:string}> = ({q,a}) => {
  const [open,setOpen] = React.useState(false);
  return (
    <div style={{ background:'var(--bg-1)', border:`1px solid ${open?'var(--line-2)':'var(--line)'}`, borderRadius:'var(--r10)', overflow:'hidden' }}>
      <button onClick={()=>setOpen(v=>!v)}
        style={{ width:'100%', display:'flex', alignItems:'center', justifyContent:'space-between', padding:'var(--s4) var(--s5)', background:'none', border:'none', cursor:'pointer', textAlign:'left', gap:'var(--s4)' }}>
        <span style={{ fontSize:'var(--t14)', fontWeight:600, color:'var(--t-hi)', lineHeight:1.4 }}>{q}</span>
        <motion.div animate={{rotate:open?180:0}} transition={{duration:0.2}} style={{ flexShrink:0, color:'var(--t-lo)' }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 5l4 4 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{height:0,opacity:0}} animate={{height:'auto',opacity:1}} exit={{height:0,opacity:0}} transition={{duration:0.25,ease:[0.22,1,0.36,1]}} style={{overflow:'hidden'}}>
            <div style={{ padding:'0 var(--s5) var(--s4)', borderTop:'1px solid var(--line)' }}>
              <p style={{ fontSize:'var(--t13)', color:'var(--t-md)', lineHeight:1.6, paddingTop:'var(--s3)', margin:0 }}>{a}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

import { AnimatePresence } from 'framer-motion';
export default AuditPage;
