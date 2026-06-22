import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PageLayout } from '../components/PageLayout';
import { Reveal, Stagger, SI } from '../components/Reveal';

const plans = [
  {
    name:'Automation Audit', price:'Starting at $497', note:'Fixed-scope', timeline:'3-5 business days',
    tag:'Clarity first',
    desc:'For individuals, founders, and teams who want to understand their automation opportunities before building anything.',
    items:['Workflow map','Automation opportunity report','Tool stack recommendation','Time & cost savings estimate','Implementation roadmap','Quick-win list'],
    cta:'Book an Audit', href:'/contact', accent:'var(--blue)',
  },
  {
    name:'Build Sprint', price:'Project-based', note:'Scoped after audit', timeline:'2-6 weeks',
    tag:'Most popular',
    desc:'For founders and operators ready to implement. Includes full audit then we build the automation you need.',
    items:['Full audit included','Custom workflow implementation','AI agent setup','Tool integrations','Testing and QA','Documentation and handoff','One round of revisions'],
    cta:'Start a Sprint', href:'/contact', accent:'var(--cyan)',
  },
  {
    name:'Automation Retainer', price:'Custom monthly', note:'Ongoing', timeline:'Monthly, cancel anytime',
    tag:'Continuous improvement',
    desc:'For businesses that want continuous improvement: new workflows, optimization, and AI agent maintenance every month.',
    items:['Everything in Build Sprint','New automations monthly','Ongoing optimization','AI agent maintenance','Monthly reporting','Priority support','Quarterly review'],
    cta:'Discuss a Retainer', href:'/contact', accent:'var(--purple)',
  },
];

const faqs = [
  { q:'Is the audit price fixed?', a:'Yes. Fixed scope, fixed price. No surprise billing. You know exactly what you are getting and what it costs before you commit.' },
  { q:'What if I just want a single automation?', a:'Start with the audit. It will scope the right level of engagement. Sometimes a single automation is the right answer; sometimes the problem needs a system.' },
  { q:'Do I need the audit before a Build Sprint?', a:'Almost always yes. The audit is what tells us what to build. Skipping it means building the wrong thing.' },
  { q:'How does retainer pricing work?', a:'Custom based on scope: how many new automations per month, what level of AI agent maintenance, and whether you need ongoing reporting.' },
  { q:'Can I pause or cancel a retainer?', a:'Yes. Monthly retainers can be paused or cancelled with 30 days notice.' },
];

export const PricingPage: React.FC = () => (
  <PageLayout title="Pricing">
    <section style={{ padding:'clamp(48px,8vw,96px) 0 clamp(32px,4vw,56px)', borderBottom:'1px solid var(--line)' }}>
      <div className="wrap">
        <Reveal>
          <div className="label" style={{ marginBottom:'var(--s4)' }}>Pricing</div>
          <h1 style={{ fontSize:'clamp(var(--t32),5vw,var(--t64))', fontWeight:900, letterSpacing:'-0.05em', lineHeight:1.05, color:'var(--t-hi)', marginBottom:'var(--s5)' }}>
            Simple, honest pricing.
          </h1>
          <p style={{ fontSize:'var(--t16)', color:'var(--t-md)', maxWidth:'480px', lineHeight:1.65 }}>
            No retainers before we have proven value. Start with an audit. Build when you are ready. Scale when it makes sense.
          </p>
        </Reveal>
      </div>
    </section>

    <section className="page-section" style={{ borderBottom:'1px solid var(--line)' }}>
      <div className="wrap">
        <Stagger style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'16px', alignItems:'start' }} className="price-g">
          {plans.map(p=>(
            <SI key={p.name}>
              <PriceCard {...p} />
            </SI>
          ))}
        </Stagger>
        <style>{`.price-g{grid-template-columns:repeat(3,1fr)}@media(max-width:900px){.price-g{grid-template-columns:1fr!important;max-width:440px;margin:0 auto}}`}</style>
      </div>
    </section>

    {/* Comparison note */}
    <section className="page-section--sm" style={{ borderBottom:'1px solid var(--line)' }}>
      <div className="wrap wrap--md" style={{ textAlign:'center' }}>
        <Reveal>
          <p style={{ fontSize:'var(--t15)', color:'var(--t-lo)', lineHeight:1.65 }}>
            Not sure which level fits your situation? Start with the audit. It will tell you exactly what you need.
          </p>
        </Reveal>
      </div>
    </section>

    {/* FAQs */}
    <section className="page-section">
      <div className="wrap wrap--lg">
        <Reveal style={{ marginBottom:'var(--s10)' }}>
          <h2 style={{ fontSize:'clamp(var(--t20),2.5vw,var(--t32))', fontWeight:800, color:'var(--t-hi)', letterSpacing:'-0.03em' }}>Pricing questions</h2>
        </Reveal>
        <div style={{ display:'flex', flexDirection:'column', gap:'var(--s2)' }}>
          {faqs.map((f,i)=>(
            <Reveal key={i} delay={i*0.05}>
              <PricingFAQ q={f.q} a={f.a} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  </PageLayout>
);

const PriceCard: React.FC<typeof plans[0]> = ({ name, price, note, timeline, tag, desc, items, cta, href, accent }) => {
  const highlight = tag === 'Most popular';
  return (
    <motion.div whileHover={{ y: -3 }}
      style={{
        background: highlight ? 'var(--bg-2)' : 'var(--bg-1)',
        border: `1px solid ${highlight ? 'var(--line-2)' : 'var(--line)'}`,
        borderRadius: 'var(--r16)', padding: 'var(--s7)',
        display: 'flex', flexDirection: 'column', gap: 'var(--s5)',
        boxShadow: highlight ? 'var(--sh-lg)' : 'var(--sh-sm)',
        position: 'relative', overflow: 'hidden',
      }}>
      <div style={{ position:'absolute', top:0, left:0, right:0, height:'2px', background:`linear-gradient(90deg,${accent},${accent}66)` }}/>
      <div>
        <div style={{ fontSize:'var(--t11)', fontWeight:700, letterSpacing:'0.08em', textTransform:'uppercase', color:accent, marginBottom:'var(--s3)' }}>{tag}</div>
        <div style={{ fontSize:'var(--t18)', fontWeight:800, color:'var(--t-hi)', letterSpacing:'-0.02em', marginBottom:'4px' }}>{name}</div>
        <div style={{ fontSize:'var(--t13)', color:'var(--t-lo)', fontStyle:'italic' }}>{desc.slice(0,80)}...</div>
      </div>
      <div style={{ background:'var(--bg-3)', borderRadius:'var(--r10)', padding:'var(--s4)', border:'1px solid var(--line)' }}>
        <div style={{ fontSize:'clamp(var(--t18),2vw,var(--t24))', fontWeight:900, color:'var(--t-hi)', letterSpacing:'-0.04em', marginBottom:'3px' }}>{price}</div>
        <div style={{ fontSize:'var(--t12)', color:'var(--t-xlo)', display:'flex', alignItems:'center', gap:'8px' }}>
          <span>{note}</span>
          <span style={{ width:'3px', height:'3px', borderRadius:'50%', background:'var(--t-xlo)', display:'inline-block' }}/>
          <span>{timeline}</span>
        </div>
      </div>
      <ul style={{ display:'flex', flexDirection:'column', gap:'var(--s2)', flex:1 }}>
        {items.map(item=>(
          <li key={item} style={{ display:'flex', alignItems:'flex-start', gap:'8px', fontSize:'var(--t13)', color:'var(--t-md)', lineHeight:1.5 }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink:0, marginTop:'1px' }}>
              <circle cx="7" cy="7" r="6" fill={`${accent}18`} stroke={`${accent}40`} strokeWidth="1"/>
              <path d="M4 7l2 2 4-4" stroke={accent} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {item}
          </li>
        ))}
      </ul>
      <Link to={href} className="btn btn--md" style={{ background:accent, color:'white', border:'none', borderRadius:'var(--r8)', justifyContent:'center', display:'flex', alignItems:'center', gap:'6px' }}>
        {cta}
        <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M2.5 6.5h8M7 3.5l3 3-3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </Link>
    </motion.div>
  );
};

const PricingFAQ: React.FC<{q:string;a:string}> = ({q,a}) => {
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
      {open && (
        <motion.div initial={{height:0,opacity:0}} animate={{height:'auto',opacity:1}} transition={{duration:0.22}} style={{overflow:'hidden'}}>
          <div style={{ padding:'0 var(--s5) var(--s4)', borderTop:'1px solid var(--line)' }}>
            <p style={{ fontSize:'var(--t13)', color:'var(--t-md)', lineHeight:1.6, paddingTop:'var(--s3)', margin:0 }}>{a}</p>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default PricingPage;
