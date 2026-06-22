import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PageLayout } from '../components/PageLayout';
import { Reveal, Stagger, SI } from '../components/Reveal';

/* ---- Animated workflow SVG ---- */
const FlowSVG: React.FC = () => (
  <svg viewBox="0 0 480 320" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:'100%',height:'100%'}}>
    <defs>
      <linearGradient id="hg1" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#3b82f6" stopOpacity="0"/>
        <stop offset="50%" stopColor="#3b82f6"/>
        <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.5"/>
      </linearGradient>
      <linearGradient id="hg2" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3b82f6"/>
        <stop offset="100%" stopColor="#06b6d4"/>
      </linearGradient>
      <filter id="hglow"><feGaussianBlur stdDeviation="4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
    </defs>

    {/* Grid */}
    {Array.from({length:8},(_,c)=>Array.from({length:6},(_,r)=>(
      <circle key={`${c}-${r}`} cx={c*68+8} cy={r*56+8} r="1.5" fill="rgba(255,255,255,0.05)"/>
    )))}

    {/* Lines */}
    <path d="M 72 80 L 160 80" stroke="url(#hg1)" strokeWidth="1.5">
      <animate attributeName="stroke-dasharray" values="0,120;120,0" dur="2s" fill="freeze"/>
    </path>
    <path d="M 240 80 L 328 80" stroke="url(#hg1)" strokeWidth="1.5">
      <animate attributeName="stroke-dasharray" values="0,120;120,0" dur="2s" begin="0.4s" fill="freeze"/>
    </path>
    <path d="M 160 120 L 160 200 L 220 230" stroke="rgba(59,130,246,0.3)" strokeWidth="1.5">
      <animate attributeName="stroke-dasharray" values="0,200;200,0" dur="2.5s" begin="0.8s" fill="freeze"/>
    </path>
    <path d="M 328 120 L 328 200 L 268 230" stroke="rgba(6,182,212,0.3)" strokeWidth="1.5">
      <animate attributeName="stroke-dasharray" values="0,200;200,0" dur="2.5s" begin="1s" fill="freeze"/>
    </path>
    <path d="M 244 264 L 244 300" stroke="rgba(34,197,94,0.4)" strokeWidth="1.5">
      <animate attributeName="stroke-dasharray" values="0,60;60,0" dur="1.5s" begin="2s" fill="freeze"/>
    </path>

    {/* Node: Problem */}
    <g filter="url(#hglow)">
      <rect x="8" y="56" width="64" height="48" rx="10" fill="var(--bg-2)" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
      <rect x="8" y="56" width="64" height="3" rx="1.5" fill="url(#hg2)"/>
      <text x="40" y="79" textAnchor="middle" fontSize="9" fontWeight="700" fill="var(--t-hi)" fontFamily="Inter,sans-serif">PROBLEM</text>
      <text x="40" y="91" textAnchor="middle" fontSize="8" fill="var(--t-lo)" fontFamily="Inter,sans-serif">Submitted</text>
      <circle cx="35" cy="98" r="2.5" fill="#22c55e"><animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite"/></circle>
      <text x="41" y="100.5" fontSize="7.5" fill="#22c55e" fontWeight="600" fontFamily="Inter,sans-serif">Live</text>
    </g>

    {/* Node: Diagnose */}
    <g filter="url(#hglow)">
      <rect x="160" y="56" width="80" height="48" rx="10" fill="var(--bg-2)" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
      <rect x="160" y="56" width="80" height="3" rx="1.5" fill="url(#hg2)"/>
      <text x="200" y="79" textAnchor="middle" fontSize="9" fontWeight="700" fill="var(--t-hi)" fontFamily="Inter,sans-serif">DIAGNOSE</text>
      <text x="200" y="91" textAnchor="middle" fontSize="8" fill="var(--t-lo)" fontFamily="Inter,sans-serif">Workflow mapped</text>
      <rect x="168" y="96" width="48" height="4" rx="2" fill="var(--bg-4)"/>
      <rect x="168" y="96" width="38" height="4" rx="2" fill="url(#hg2)">
        <animate attributeName="width" from="0" to="38" dur="1.5s" begin="1.2s" fill="freeze"/>
      </rect>
    </g>

    {/* Node: Blueprint */}
    <g filter="url(#hglow)">
      <rect x="328" y="56" width="80" height="48" rx="10" fill="var(--bg-2)" stroke="rgba(139,92,246,0.25)" strokeWidth="1"/>
      <rect x="328" y="56" width="80" height="3" rx="1.5" fill="linear-gradient(90deg,#8b5cf6,#06b6d4)"/>
      <text x="368" y="79" textAnchor="middle" fontSize="9" fontWeight="700" fill="var(--t-hi)" fontFamily="Inter,sans-serif">BLUEPRINT</text>
      <text x="368" y="91" textAnchor="middle" fontSize="8" fill="var(--t-lo)" fontFamily="Inter,sans-serif">Architecture ready</text>
      {[0,1,2].map(i=><circle key={i} cx={340+i*14} cy={100} r="4" fill={['#3b82f6','#8b5cf6','#06b6d4'][i]} opacity={i===2?0.4:1}/>)}
    </g>

    {/* Node: Build (center, highlighted) */}
    <g filter="url(#hglow)">
      <rect x="192" y="216" width="104" height="56" rx="12" fill="url(#hg2)"/>
      <rect x="193" y="217" width="102" height="54" rx="11" fill="rgba(255,255,255,0.06)"/>
      <text x="244" y="240" textAnchor="middle" fontSize="10" fontWeight="800" fill="white" fontFamily="Inter,sans-serif">BUILD SPRINT</text>
      <text x="244" y="254" textAnchor="middle" fontSize="8" fill="rgba(255,255,255,0.65)" fontFamily="Inter,sans-serif">Agents deployed</text>
      <circle cx="244" cy="265" r="4" fill="rgba(255,255,255,0.15)">
        <animate attributeName="r" values="4;8;4" dur="2s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0.6;0;0.6" dur="2s" repeatCount="indefinite"/>
      </circle>
      <circle cx="244" cy="265" r="3" fill="white" opacity="0.8"/>
    </g>

    {/* Node: Deployed */}
    <g>
      <rect x="208" y="298" width="72" height="36" rx="8" fill="var(--bg-2)" stroke="rgba(34,197,94,0.3)" strokeWidth="1">
        <animate attributeName="opacity" values="0;1" dur="0.5s" begin="3s" fill="freeze"/>
      </rect>
      <text x="244" y="314" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#22c55e" fontFamily="Inter,sans-serif">DEPLOYED</text>
      <text x="244" y="326" textAnchor="middle" fontSize="7.5" fill="var(--t-lo)" fontFamily="Inter,sans-serif">14h/wk saved</text>
    </g>

    {/* Metric chips */}
    {[
      {x:400,y:190,label:'TIME SAVED',val:'14h/wk',c:'#3b82f6',d:'1.8s'},
      {x:8,y:190,label:'TASKS AUTO',val:'87%',c:'#8b5cf6',d:'2.2s'},
      {x:400,y:260,label:'ROI',val:'4.2x',c:'#22c55e',d:'2.6s'},
    ].map(m=>(
      <g key={m.label}>
        <rect x={m.x} y={m.y} width="68" height="30" rx="7" fill="var(--bg-2)" stroke="rgba(255,255,255,0.08)" strokeWidth="1">
          <animate attributeName="opacity" values="0;1" dur="0.4s" begin={m.d} fill="freeze"/>
        </rect>
        <text x={m.x+34} y={m.y+11} textAnchor="middle" fontSize="7" fontWeight="700" fill="var(--t-lo)" fontFamily="Inter,sans-serif">{m.label}</text>
        <text x={m.x+34} y={m.y+23} textAnchor="middle" fontSize="12" fontWeight="800" fill={m.c} fontFamily="Inter,sans-serif">{m.val}</text>
      </g>
    ))}
  </svg>
);

/* ---- Value propositions ---- */
const props = [
  { icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="2" y="2" width="14" height="14" rx="3" stroke="currentColor" strokeWidth="1.3"/><path d="M6 9l2 2 4-4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>, title:'Diagnosis first', desc:'We map before we build. Every engagement starts with a workflow audit.' },
  { icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="1.3"/><path d="M9 5v4l3 2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>, title:'Fast turnaround', desc:'Audit in 3-5 days. Build sprints in 2-6 weeks. Retainers that ship monthly.' },
  { icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M9 2l2 4h4l-3 3 1 4-4-2-4 2 1-4-3-3h4z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/></svg>, title:'Measurable outcomes', desc:'Time saved, tasks automated, ROI tracked. Not vibes. Actual numbers.' },
  { icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M3 9h3M12 9h3M9 3v3M9 12v3M5.5 5.5l2 2M10.5 10.5l2 2M5.5 12.5l2-2M10.5 7.5l2-2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>, title:'Systems, not tools', desc:'We architect the connective tissue between your tools that makes everything work.' },
];

/* ---- Services preview ---- */
const services = [
  { title:'Automation Consulting', desc:'Audit your workflow. Find what to cut, automate, or redesign.', href:'/services', tag:'Strategy' },
  { title:'Custom AI Agents',      desc:'Task-specific agents for research, support, content, and ops.', href:'/services', tag:'Build' },
  { title:'Social Media Automation', desc:'Idea to post. One input, many outputs, zero manual formatting.', href:'/services', tag:'Content' },
  { title:'Business Operations',   desc:'Dashboards, triggers, SOPs, and reporting that run themselves.', href:'/services', tag:'Ops' },
  { title:'Personal Automation',   desc:'Morning briefing, knowledge capture, finance, travel, reminders.', href:'/services', tag:'Personal' },
  { title:'AI Tool Implementation', desc:'Connect Notion, Slack, CRMs, APIs into a working system.', href:'/services', tag:'Integration' },
];

/* ---- Ticker ---- */
const ticks = ['Workflow automation','AI agents','Content pipelines','CRM automation','Personal OS','Business ops','Social media','Document AI','Reporting','SOPs','Research agents','Lead automation'];

const Ticker = () => (
  <div style={{ overflow:'hidden', borderTop:'1px solid var(--line)', borderBottom:'1px solid var(--line)', padding:'11px 0' }}>
    <div style={{ display:'flex', alignItems:'center', gap:'40px', animation:'ticker 28s linear infinite', width:'max-content' }}>
      {[...ticks,...ticks,...ticks].map((t,i)=>(
        <div key={i} style={{ display:'flex', alignItems:'center', gap:'10px', flexShrink:0 }}>
          <div style={{ width:'4px', height:'4px', borderRadius:'50%', background:'var(--t-xlo)' }}/>
          <span style={{ fontSize:'var(--t11)', fontWeight:600, color:'var(--t-lo)', letterSpacing:'0.08em', textTransform:'uppercase', whiteSpace:'nowrap' }}>{t}</span>
        </div>
      ))}
    </div>
  </div>
);

export const HomePage: React.FC = () => (
  <PageLayout title="Automation consulting, AI agents, and custom workflows">
    {/* Hero */}
    <section style={{ paddingTop:'clamp(64px,10vh,120px)', paddingBottom:'clamp(48px,6vh,80px)', position:'relative', overflow:'hidden' }}>
      {/* Subtle radial bg */}
      <div style={{ position:'absolute', top:'-20%', right:'-10%', width:'60vw', height:'60vw', maxWidth:'800px', background:'radial-gradient(ellipse,rgba(59,130,246,0.07) 0%,transparent 70%)', pointerEvents:'none' }}/>
      <div style={{ position:'absolute', bottom:'-10%', left:'-5%', width:'40vw', height:'40vw', maxWidth:'600px', background:'radial-gradient(ellipse,rgba(139,92,246,0.05) 0%,transparent 70%)', pointerEvents:'none' }}/>

      <div className="wrap">
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'clamp(32px,5vw,80px)', alignItems:'center' }} className="hero-g">
          {/* Left */}
          <div>
            <motion.div initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{duration:0.6,ease:[0.22,1,0.36,1]}}>
              <div style={{ marginBottom:'var(--s5)' }}>
                <span className="chip chip--blue">
                  <span className="dot dot--live"/>
                  Automation-first consulting
                </span>
              </div>
            </motion.div>

            <motion.h1 initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.7,delay:0.08,ease:[0.22,1,0.36,1]}}
              style={{ fontSize:'clamp(2.2rem,5vw,4rem)', fontWeight:900, letterSpacing:'-0.05em', lineHeight:1.05, color:'var(--t-hi)', marginBottom:'var(--s5)' }}>
              Tell us the problem.
              <br/>
              <span className="g-text">We build the system.</span>
            </motion.h1>

            <motion.p initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{duration:0.6,delay:0.18,ease:[0.22,1,0.36,1]}}
              style={{ fontSize:'clamp(var(--t15),1.4vw,var(--t18))', color:'var(--t-md)', lineHeight:1.65, marginBottom:'var(--s8)', maxWidth:'440px' }}>
              We design automation workflows, AI agents, and custom tools for work, life, business, and social media. Repetitive chaos becomes repeatable systems.
            </motion.p>

            <motion.div initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{duration:0.5,delay:0.28,ease:[0.22,1,0.36,1]}}
              style={{ display:'flex', gap:'10px', flexWrap:'wrap', marginBottom:'var(--s10)' }}>
              <Link to="/audit" className="btn btn--lg btn--primary">Book an Audit</Link>
              <Link to="/tools" className="btn btn--lg btn--ghost">Explore AI Tools</Link>
            </motion.div>

            <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.45}} style={{ display:'flex', gap:'var(--s6)', flexWrap:'wrap' }}>
              {['3-5 day audit','Fixed-scope pricing','Diagnosis first'].map(t=>(
                <div key={t} style={{ display:'flex', alignItems:'center', gap:'6px', fontSize:'var(--t12)', color:'var(--t-lo)', fontWeight:500 }}>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="var(--blue)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  {t}
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: dashboard */}
          <motion.div initial={{opacity:0,x:24,scale:0.97}} animate={{opacity:1,x:0,scale:1}} transition={{duration:0.8,delay:0.15,ease:[0.22,1,0.36,1]}}
            style={{ position:'relative' }}>
            <div style={{ background:'var(--bg-1)', border:'1px solid var(--line)', borderRadius:'var(--r20)', padding:'20px', boxShadow:'0 32px 80px rgba(0,0,0,0.6),0 8px 20px rgba(59,130,246,0.08)' }}>
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'16px' }}>
                <div style={{ display:'flex', alignItems:'center', gap:'8px' }}>
                  <div style={{ display:'flex', gap:'4px' }}>{['#ff5f57','#febc2e','#28c840'].map(c=><div key={c} style={{ width:'10px', height:'10px', borderRadius:'50%', background:c }}/>)}</div>
                  <span style={{ fontSize:'var(--t11)', color:'var(--t-lo)', fontWeight:600, letterSpacing:'0.06em', textTransform:'uppercase' }}>Automation Console</span>
                </div>
                <div style={{ display:'flex', alignItems:'center', gap:'5px' }}>
                  <span className="dot dot--live"/>
                  <span style={{ fontSize:'var(--t10)', color:'var(--green)', fontWeight:700, letterSpacing:'0.06em' }}>LIVE</span>
                </div>
              </div>
              <div style={{ height:'clamp(220px,28vw,320px)' }}><FlowSVG /></div>
            </div>

            {/* Floating chips */}
            <motion.div animate={{y:[0,-5,0]}} transition={{duration:3.5,repeat:Infinity,ease:'easeInOut'}}
              style={{ position:'absolute', top:'-12px', right:'-10px', background:'var(--bg-2)', border:'1px solid var(--line-2)', borderRadius:'var(--r10)', padding:'8px 12px', boxShadow:'var(--sh-lg)' }}>
              <div style={{ fontSize:'var(--t10)', color:'var(--t-lo)', textTransform:'uppercase', letterSpacing:'0.06em', fontWeight:700, marginBottom:'2px' }}>Tasks automated</div>
              <div style={{ fontSize:'var(--t20)', fontWeight:900, color:'var(--green)', letterSpacing:'-0.03em' }}>-87%</div>
            </motion.div>

            <motion.div animate={{y:[0,5,0]}} transition={{duration:4,repeat:Infinity,ease:'easeInOut',delay:1}}
              style={{ position:'absolute', bottom:'-12px', left:'-12px', background:'var(--bg-2)', border:'1px solid var(--line-2)', borderRadius:'var(--r10)', padding:'8px 12px', boxShadow:'var(--sh-lg)' }}>
              <div style={{ fontSize:'var(--t10)', color:'var(--t-lo)', textTransform:'uppercase', letterSpacing:'0.06em', fontWeight:700, marginBottom:'2px' }}>Hours saved/wk</div>
              <div style={{ fontSize:'var(--t20)', fontWeight:900, color:'var(--blue-hi)', letterSpacing:'-0.03em' }}>14h</div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>

    <Ticker />

    {/* Value props */}
    <section className="page-section--sm" style={{ borderBottom:'1px solid var(--line)' }}>
      <div className="wrap">
        <Stagger style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'var(--s4)' }} className="props-g">
          {props.map(p=>(
            <SI key={p.title}>
              <div style={{ padding:'var(--s5)', borderRadius:'var(--r12)', background:'var(--bg-1)', border:'1px solid var(--line)' }}>
                <div style={{ color:'var(--blue-hi)', marginBottom:'var(--s3)' }}>{p.icon}</div>
                <div style={{ fontSize:'var(--t14)', fontWeight:700, color:'var(--t-hi)', marginBottom:'4px' }}>{p.title}</div>
                <div style={{ fontSize:'var(--t13)', color:'var(--t-lo)', lineHeight:1.55 }}>{p.desc}</div>
              </div>
            </SI>
          ))}
        </Stagger>
      </div>
      <style>{`.props-g{grid-template-columns:repeat(4,1fr)}@media(max-width:800px){.props-g{grid-template-columns:repeat(2,1fr)!important}}@media(max-width:480px){.props-g{grid-template-columns:1fr!important}}`}</style>
    </section>

    {/* Services preview */}
    <section className="page-section" style={{ borderBottom:'1px solid var(--line)' }}>
      <div className="wrap">
        <Reveal style={{ marginBottom:'var(--s12)' }}>
          <div style={{ display:'flex', alignItems:'flex-end', justifyContent:'space-between', flexWrap:'wrap', gap:'var(--s4)' }}>
            <div>
              <div className="label" style={{ marginBottom:'var(--s3)' }}>What we do</div>
              <h2 style={{ fontSize:'clamp(var(--t28),3.5vw,var(--t48))', fontWeight:900, letterSpacing:'-0.04em', color:'var(--t-hi)' }}>Services</h2>
            </div>
            <Link to="/services" className="btn btn--md btn--ghost">View all services
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </Link>
          </div>
        </Reveal>
        <Stagger style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'var(--s4)' }} className="svc-g">
          {services.map(s=>(
            <SI key={s.title}>
              <Link to={s.href} style={{ textDecoration:'none', display:'block', height:'100%' }}>
                <motion.div whileHover={{y:-3,borderColor:'var(--line-2)'}}
                  style={{ padding:'var(--s6)', background:'var(--bg-1)', border:'1px solid var(--line)', borderRadius:'var(--r16)', height:'100%', transition:'border-color 0.2s' }}>
                  <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'var(--s4)' }}>
                    <span style={{ fontSize:'var(--t11)', fontWeight:700, letterSpacing:'0.06em', textTransform:'uppercase', color:'var(--t-xlo)' }}>{s.tag}</span>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ color:'var(--t-xlo)', transition:'color 0.2s' }}><path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                  <div style={{ fontSize:'var(--t16)', fontWeight:700, color:'var(--t-hi)', marginBottom:'var(--s2)', letterSpacing:'-0.02em' }}>{s.title}</div>
                  <div style={{ fontSize:'var(--t13)', color:'var(--t-lo)', lineHeight:1.55 }}>{s.desc}</div>
                </motion.div>
              </Link>
            </SI>
          ))}
        </Stagger>
        <style>{`.svc-g{grid-template-columns:repeat(3,1fr)}@media(max-width:800px){.svc-g{grid-template-columns:repeat(2,1fr)!important}}@media(max-width:520px){.svc-g{grid-template-columns:1fr!important}}`}</style>
      </div>
    </section>

    {/* CTA strip */}
    <section style={{ padding:'clamp(48px,6vw,80px) 0', background:'var(--bg-1)', borderBottom:'1px solid var(--line)' }}>
      <div className="wrap wrap--md" style={{ textAlign:'center' }}>
        <Reveal>
          <div className="label" style={{ marginBottom:'var(--s4)' }}>Ready to start</div>
          <h2 style={{ fontSize:'clamp(var(--t24),4vw,var(--t48))', fontWeight:900, letterSpacing:'-0.04em', color:'var(--t-hi)', marginBottom:'var(--s5)' }}>
            Messy problem in.
            <br/><span className="g-text">Working system out.</span>
          </h2>
          <p style={{ color:'var(--t-lo)', fontSize:'var(--t15)', marginBottom:'var(--s8)', maxWidth:'440px', margin:'0 auto var(--s8)' }}>
            Start with a fixed-scope audit. Get a workflow map, opportunity report, tool recommendation, and implementation roadmap in 3-5 days.
          </p>
          <div style={{ display:'flex', gap:'10px', justifyContent:'center', flexWrap:'wrap' }}>
            <Link to="/audit" className="btn btn--xl btn--primary">Book an Automation Audit</Link>
            <Link to="/contact" className="btn btn--xl btn--ghost">Talk to us first</Link>
          </div>
        </Reveal>
      </div>
    </section>

    <style>{`.hero-g{grid-template-columns:1fr 1fr}@media(max-width:880px){.hero-g{grid-template-columns:1fr!important}.hero-g>div:last-child{display:none}}`}</style>
  </PageLayout>
);

export default HomePage;
