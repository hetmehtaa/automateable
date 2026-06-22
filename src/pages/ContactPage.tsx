import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PageLayout } from '../components/PageLayout';
import { Footer } from '../sections/Footer';
import { Reveal } from '../components/Reveal';

interface F { name:string; email:string; what:string; category:string; tools:string; pain:string; budget:string; timeline:string; }
const empty: F = { name:'', email:'', what:'', category:'', tools:'', pain:'', budget:'', timeline:'' };

const field = (
  label: string, id: keyof F, type: string,
  val: string, set: (v:string)=>void,
  err?: string, placeholder?: string, rows?: number
) => (
  <div style={{ display:'flex', flexDirection:'column', gap:'5px' }}>
    <label htmlFor={id} style={{ fontSize:'var(--f13)', fontWeight:600, color:'var(--ink-2)' }}>{label}</label>
    {rows ? (
      <textarea id={id} rows={rows} value={val} onChange={e=>set(e.target.value)} placeholder={placeholder}
        style={{ padding:'9px 12px', background:'var(--paper-1)', border:`1px solid ${err?'var(--red)':'var(--border-2)'}`, borderRadius:'var(--r-8)', fontSize:'var(--f14)', color:'var(--ink-0)', outline:'none', resize:'vertical', lineHeight:1.55, fontFamily:'var(--font)' }}
        onFocus={e=>(e.target.style.borderColor='var(--blue)')}
        onBlur={e=>(e.target.style.borderColor=err?'var(--red)':'var(--border-2)')}/>
    ) : type === 'select' ? null : (
      <input id={id} type={type} value={val} onChange={e=>set(e.target.value)} placeholder={placeholder}
        style={{ height:'40px', padding:'0 12px', background:'var(--paper-1)', border:`1px solid ${err?'var(--red)':'var(--border-2)'}`, borderRadius:'var(--r-8)', fontSize:'var(--f14)', color:'var(--ink-0)', outline:'none' }}
        onFocus={e=>(e.target.style.borderColor='var(--blue)')}
        onBlur={e=>(e.target.style.borderColor=err?'var(--red)':'var(--border-2)')}/>
    )}
    {err && <span style={{ fontSize:'var(--t11)', color:'var(--red)' }}>{err}</span>}
  </div>
);

const sel = (label:string, id:keyof F, opts:{v:string;l:string}[], val:string, set:(v:string)=>void, err?:string) => (
  <div style={{ display:'flex', flexDirection:'column', gap:'5px' }}>
    <label htmlFor={id} style={{ fontSize:'var(--f13)', fontWeight:600, color:'var(--ink-2)' }}>{label}</label>
    <select id={id} value={val} onChange={e=>set(e.target.value)}
      style={{ height:'40px', padding:'0 12px', background:'var(--paper-1)', border:`1px solid ${err?'var(--red)':'var(--border-2)'}`, borderRadius:'var(--r-8)', fontSize:'var(--f14)', color:val?'var(--ink-0)':'var(--ink-3)', outline:'none', appearance:'none', backgroundImage:`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%235c5c69' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`, backgroundRepeat:'no-repeat', backgroundPosition:'right 12px center', cursor:'pointer' }}
      onFocus={e=>(e.target.style.borderColor='var(--blue)')}
      onBlur={e=>(e.target.style.borderColor=err?'var(--red)':'var(--border-2)')}>
      {opts.map(o=><option key={o.v} value={o.v}>{o.l}</option>)}
    </select>
    {err && <span style={{ fontSize:'var(--t11)', color:'var(--red)' }}>{err}</span>}
  </div>
);

export const ContactPage: React.FC = () => {
  const [f, setF] = useState<F>(empty);
  const set = (k:keyof F) => (v:string) => setF(p=>({...p,[k]:v}));
  const [errs, setErrs] = useState<Partial<F>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof F,boolean>>>({});
  const [status, setStatus] = useState<'idle'|'loading'|'done'>('idle');

  const validate = (data:F) => {
    const e: Partial<F> = {};
    if (!data.name.trim())  e.name  = 'Name is required';
    if (!data.email.trim()) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) e.email = 'Enter a valid email';
    if (!data.what.trim())  e.what  = 'Tell us what you want to automate';
    if (!data.category)     e.category = 'Select a category';
    return e;
  };

  const submit = async (e:React.FormEvent) => {
    e.preventDefault();
    const allTouched = Object.fromEntries(Object.keys(f).map(k=>[k,true])) as Partial<Record<keyof F,boolean>>;
    setTouched(allTouched);
    const e2 = validate(f);
    setErrs(e2);
    if (Object.keys(e2).length) return;
    setStatus('loading');
    await new Promise(r=>setTimeout(r,1400));
    setStatus('done');
  };

  if (status === 'done') return (
    <PageLayout title="Contact">
      <div style={{ minHeight:'80vh', display:'flex', alignItems:'center', justifyContent:'center', padding:'var(--sp-8)' }}>
        <motion.div initial={{opacity:0,scale:0.95}} animate={{opacity:1,scale:1}} transition={{duration:0.4}}
          style={{ textAlign:'center', maxWidth:'440px' }}>
          <div style={{ width:'56px', height:'56px', borderRadius:'50%', background:'rgba(34,197,94,0.12)', border:'1px solid rgba(34,197,94,0.25)', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto var(--sp-6)' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M5 12l5 5L20 7" stroke="var(--green)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
          <h2 style={{ fontSize:'var(--f28)', fontWeight:800, color:'var(--ink-0)', letterSpacing:'-0.03em', marginBottom:'var(--sp-3)' }}>Problem received.</h2>
          <p style={{ fontSize:'var(--f15)', color:'var(--ink-3)', lineHeight:1.65, marginBottom:'var(--sp-8)' }}>
            We will review your workflow and reply within 1-2 business days with next steps.
          </p>
          <button onClick={()=>{setF(empty);setStatus('idle');setTouched({});setErrs({});}} className="btn btn--md btn--ghost">Submit another</button>
        </motion.div>
      </div>
          <Footer />
    </PageLayout>
  );

  return (
    <PageLayout title="Contact">
      <section style={{ padding:'clamp(48px,8vw,96px) 0 clamp(32px,4vw,56px)', borderBottom:'1px solid var(--border)' }}>
        <div className="wrap">
          <Reveal>
            <div className="label" style={{ marginBottom:'var(--sp-4)' }}>Contact</div>
            <h1 style={{ fontSize:'clamp(var(--f32),5vw,var(--f56))', fontWeight:900, letterSpacing:'-0.05em', lineHeight:1.05, color:'var(--ink-0)', marginBottom:'var(--sp-4)' }}>
              Send the messy version.
            </h1>
            <p style={{ fontSize:'var(--f16)', color:'var(--ink-2)', maxWidth:'480px', lineHeight:1.65 }}>
              Describe the problem in whatever form it is in. We will ask follow-up questions if we need more. You do not need to have it figured out.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="page-section">
        <div  style={{ display:'grid', gridTemplateColumns:'1fr 1.6fr', gap:'clamp(32px,5vw,80px)', alignItems:'start' }} className="contact-g">
          <Reveal direction="left">
            <div style={{ position:'sticky', top:'calc(var(--nav-h) + 24px)' }}>
              {[
                { icon:<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.2"/><path d="M8 5v3l2 1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>, title:'Fast turnaround', desc:'First response within 1-2 business days.' },
                { icon:<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 2l1.8 4h4l-3.2 2.5 1.2 4L8 10.5l-3.8 2 1.2-4L2.2 6h4z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/></svg>, title:'Diagnosis first', desc:'We understand before we suggest.' },
                { icon:<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 4h12M2 8h8M2 12h5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>, title:'No pitch calls', desc:'We will not waste your time.' },
              ].map(i=>(
                <div key={i.title} style={{ display:'flex', gap:'12px', marginBottom:'var(--sp-5)' }}>
                  <div style={{ width:'32px', height:'32px', borderRadius:'var(--r-8)', background:'var(--paper-1)', border:'1px solid var(--border)', display:'flex', alignItems:'center', justifyContent:'center', color:'var(--blue-hi)', flexShrink:0 }}>{i.icon}</div>
                  <div>
                    <div style={{ fontSize:'var(--f14)', fontWeight:700, color:'var(--ink-0)', marginBottom:'2px' }}>{i.title}</div>
                    <div style={{ fontSize:'var(--f13)', color:'var(--ink-3)' }}>{i.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal direction="right">
            <form onSubmit={submit} noValidate style={{ background:'var(--bg-1)', border:'1px solid var(--border)', borderRadius:'var(--r16)', padding:'var(--sp-8)', display:'flex', flexDirection:'column', gap:'var(--sp-5)' }}>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'var(--sp-4)' }}>
                {field('Name','name','text',f.name,set('name'),touched.name?errs.name:undefined,'Your name')}
                {field('Email','email','email',f.email,set('email'),touched.email?errs.email:undefined,'you@company.com')}
              </div>
              {field('What do you want to automate?','what','text',f.what,set('what'),touched.what?errs.what:undefined,'Describe the workflow or pain point. The messier the better.',4)}
              {sel('Is this for work, business, life, or social media?','category',[
                {v:'',l:'Select one...'},
                {v:'work',l:'Work / professional productivity'},
                {v:'business',l:'Business operations'},
                {v:'social',l:'Social media / content'},
                {v:'life',l:'Personal life / admin'},
                {v:'multiple',l:'Multiple areas'},
              ],f.category,set('category'),touched.category?errs.category:undefined)}
              {field('Current tools you use','tools','text',f.tools,set('tools'),undefined,'Notion, Slack, Gmail, HubSpot...')}
              {field('Biggest manual pain right now','pain','text',f.pain,set('pain'),undefined,'What one thing is eating your time that should not?',3)}
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'var(--sp-4)' }}>
                {sel('Budget range','budget',[
                  {v:'',l:'Select a range...'},
                  {v:'audit',l:'Audit only (under $500)'},
                  {v:'500-2k',l:'$500 - $2,000'},
                  {v:'2k-5k',l:'$2,000 - $5,000'},
                  {v:'5k-15k',l:'$5,000 - $15,000'},
                  {v:'15k+',l:'$15,000+'},
                  {v:'unsure',l:'Not sure yet'},
                ],f.budget,set('budget'))}
                {sel('Timeline','timeline',[
                  {v:'',l:'Select a timeline...'},
                  {v:'asap',l:'As soon as possible'},
                  {v:'1mo',l:'Within 1 month'},
                  {v:'3mo',l:'Within 3 months'},
                  {v:'flex',l:'Flexible / exploring'},
                ],f.timeline,set('timeline'))}
              </div>
              <button type="submit" disabled={status==='loading'}
                style={{ height:'46px', background:status==='loading'?'var(--paper-2)':'var(--ink-0)', color:status==='loading'?'var(--ink-3)':'var(--ink-0)', border:'none', borderRadius:'var(--r-8)', fontSize:'var(--f15)', fontWeight:700, cursor:status==='loading'?'not-allowed':'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:'8px', transition:'all 0.2s', letterSpacing:'-0.01em' }}>
                {status==='loading' ? (
                  <><svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{animation:'spin 0.7s linear infinite'}}><style>{'@keyframes spin{to{transform:rotate(360deg)}}'}</style><circle cx="8" cy="8" r="6" stroke="rgba(255,255,255,0.2)" strokeWidth="2"/><path d="M8 2a6 6 0 0 1 6 6" stroke="var(--ink-2)" strokeWidth="2" strokeLinecap="round"/></svg>Sending...</>
                ) : <>Send My Problem <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2.5 7h9M8 3.5L11.5 7 8 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></>}
              </button>
              <p style={{ fontSize:'var(--t12)', color:'var(--ink-4)', textAlign:'center', fontStyle:'italic' }}>Send the messy version. We will help turn it into a system.</p>
            </form>
          </Reveal>
          <style>{`.contact-g{grid-template-columns:1fr 1.6fr}@media(max-width:760px){.contact-g{grid-template-columns:1fr!important}}`}</style>
        </div>
      </section>
          <Footer />
    </PageLayout>
  );
};
export default ContactPage;
