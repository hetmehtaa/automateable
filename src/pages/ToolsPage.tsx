import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { PageLayout } from '../components/PageLayout';
import { Footer } from '../sections/Footer';
import { Reveal, Stagger, SI } from '../components/Reveal';

type Status = 'live'|'beta'|'soon';

const tools: { name:string; desc:string; tag:string; status:Status; detail:string }[] = [
  { name:'Content Repurposer',     desc:'Turn one piece of content into posts, threads, newsletters, and scripts.',  tag:'Content',     status:'live', detail:'Input a long-form piece. Get platform-specific formats for LinkedIn, X, newsletter, and short-form video.' },
  { name:'Meeting-to-Action Bot',  desc:'Every meeting ends with a clear, assigned action list.',                    tag:'Productivity', status:'live', detail:'Paste transcript or connect your meeting tool. Outputs structured action items with owners and deadlines.' },
  { name:'Personal Research Agent',desc:'Research any topic and get a structured briefing in minutes.',              tag:'Research',     status:'live', detail:'Give it a question or topic. It searches, synthesizes, and formats a readable brief with sources.' },
  { name:'Social Idea Engine',     desc:'Never run out of content ideas for your niche.',                            tag:'Social',       status:'beta', detail:'Input your niche and recent posts. Get 30 content angles ranked by engagement potential.' },
  { name:'Workflow Mapper',        desc:'Visualize and document any process in minutes.',                            tag:'Ops',          status:'beta', detail:'Describe your process in plain language. Get a structured flow diagram and SOP draft.' },
  { name:'Daily Briefing Agent',   desc:'Start every day with context, not chaos.',                                  tag:'Personal',     status:'live', detail:'Aggregates your calendar, priorities, messages, news, and finance into a single morning summary.' },
  { name:'CRM Follow-up Assistant',desc:'No lead goes cold. No follow-up forgotten.',                               tag:'Sales',        status:'beta', detail:'Monitors your CRM, drafts follow-up messages, and alerts you to stale deals.' },
  { name:'Invoice/Doc Extractor',  desc:'Pull structured data from any document automatically.',                     tag:'Ops',          status:'live', detail:'Upload any PDF, invoice, or form. Get structured JSON, CSV, or CRM-ready data.' },
  { name:'SOP Generator',          desc:'Document any process in minutes.',                                          tag:'Ops',          status:'soon', detail:'Describe how you do something. Get a formatted, versioned SOP ready to share.' },
  { name:'Founder Command Center', desc:'Your business dashboard. Always current.',                                  tag:'Founders',     status:'soon', detail:'Connects revenue, pipeline, support, and team metrics into one auto-updating view.' },
];

const tags = ['All','Content','Productivity','Research','Social','Ops','Personal','Sales','Founders'];
const statusMeta: Record<Status,{label:string;cls:string}> = {
  live:  { label:'Live',        cls:'chip--green' },
  beta:  { label:'Beta',        cls:'chip--amber' },
  soon:  { label:'Coming soon', cls:'chip--muted' },
};

export const ToolsPage: React.FC = () => {
  const [tag,    setTag]    = useState('All');
  const [active, setActive] = useState<string|null>(null);
  const filtered = tag === 'All' ? tools : tools.filter(t=>t.tag===tag);

  return (
    <PageLayout title="AI Tools">
      <section style={{ padding:'clamp(48px,8vw,96px) 0 clamp(32px,4vw,56px)', borderBottom:'1px solid var(--line)' }}>
        <div className="wrap">
          <Reveal>
            <div className="label" style={{ marginBottom:'var(--s4)' }}>AI Tools</div>
            <h1 style={{ fontSize:'clamp(var(--t32),5vw,var(--t64))', fontWeight:900, letterSpacing:'-0.05em', lineHeight:1.05, color:'var(--t-hi)', marginBottom:'var(--s5)' }}>
              Productized tools<br/>for specific workflows.
            </h1>
            <p style={{ fontSize:'var(--t16)', color:'var(--t-md)', maxWidth:'480px', lineHeight:1.65 }}>
              Use them directly or as part of a custom engagement. Each tool is built for one job and does it well.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="page-section">
        <div className="wrap">
          {/* Filter */}
          <div style={{ display:'flex', gap:'6px', flexWrap:'wrap', marginBottom:'var(--s10)' }}>
            {tags.map(t=>(
              <button key={t} onClick={()=>setTag(t)}
                style={{ height:'30px', padding:'0 12px', background:tag===t?'var(--t-hi)':'var(--bg-2)', color:tag===t?'#0a0a0b':'var(--t-md)', border:`1px solid ${tag===t?'var(--t-hi)':'var(--line)'}`, borderRadius:'var(--rfull)', fontSize:'var(--t12)', fontWeight:600, cursor:'pointer', transition:'all 0.15s' }}>
                {t}
              </button>
            ))}
          </div>

          <Stagger style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:'var(--s3)' }} className="tools-g">
            {filtered.map(tool=>{
              const sm = statusMeta[tool.status];
              const isActive = active === tool.name;
              return (
                <SI key={tool.name}>
                  <motion.div whileHover={{ borderColor:'var(--line-3)' }}
                    style={{ background:'var(--bg-1)', border:`1px solid ${isActive?'var(--line-2)':'var(--line)'}`, borderRadius:'var(--r12)', overflow:'hidden', cursor:'pointer', transition:'border-color 0.2s', opacity:tool.status==='soon'?0.65:1 }}
                    onClick={()=>setActive(isActive?null:tool.name)}>
                    <div style={{ padding:'var(--s5) var(--s6)', display:'flex', alignItems:'flex-start', justifyContent:'space-between', gap:'var(--s4)' }}>
                      <div style={{ flex:1 }}>
                        <div style={{ display:'flex', alignItems:'center', gap:'var(--s2)', marginBottom:'var(--s2)' }}>
                          <span className={`chip ${sm.cls}`} style={{ fontSize:'var(--t10)' }}>{sm.label}</span>
                          <span style={{ fontSize:'var(--t11)', color:'var(--t-xlo)', fontWeight:600, letterSpacing:'0.06em', textTransform:'uppercase' }}>{tool.tag}</span>
                        </div>
                        <div style={{ fontSize:'var(--t16)', fontWeight:700, color:'var(--t-hi)', letterSpacing:'-0.02em', marginBottom:'3px' }}>{tool.name}</div>
                        <div style={{ fontSize:'var(--t13)', color:'var(--t-lo)' }}>{tool.desc}</div>
                      </div>
                      <motion.div animate={{ rotate: isActive ? 180 : 0 }} transition={{ duration:0.2 }}
                        style={{ color:'var(--t-xlo)', flexShrink:0, marginTop:'2px' }}>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </motion.div>
                    </div>
                    <AnimatePresence initial={false}>
                      {isActive && (
                        <motion.div initial={{height:0,opacity:0}} animate={{height:'auto',opacity:1}} exit={{height:0,opacity:0}} transition={{duration:0.25,ease:[0.22,1,0.36,1]}} style={{overflow:'hidden'}}>
                          <div style={{ padding:'var(--s4) var(--s6) var(--s5)', borderTop:'1px solid var(--line)', background:'var(--bg-2)' }}>
                            <p style={{ fontSize:'var(--t13)', color:'var(--t-md)', lineHeight:1.6, marginBottom:'var(--s4)' }}>{tool.detail}</p>
                            {tool.status !== 'soon' ? (
                              <Link to="/contact" className="btn btn--sm btn--blue">Try this tool</Link>
                            ) : (
                              <span style={{ fontSize:'var(--t12)', color:'var(--t-lo)', fontStyle:'italic' }}>Notify me when available</span>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </SI>
              );
            })}
          </Stagger>
          <style>{`.tools-g{grid-template-columns:repeat(2,1fr)}@media(max-width:640px){.tools-g{grid-template-columns:1fr!important}}`}</style>

          <Reveal style={{ marginTop:'var(--s16)', textAlign:'center' }}>
            <p style={{ fontSize:'var(--t14)', color:'var(--t-lo)', marginBottom:'var(--s5)' }}>Need a tool that does not exist yet?</p>
            <Link to="/contact" className="btn btn--lg btn--ghost">Submit your problem</Link>
          </Reveal>
        </div>
      </section>
          <Footer />
    </PageLayout>
  );
};
export default ToolsPage;
