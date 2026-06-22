import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const cols = {
  Product: [
    { l:'Services', to:'/services' },
    { l:'AI Tools', to:'/tools' },
    { l:'Automation Audit', to:'/audit' },
    { l:'Pricing', to:'/pricing' },
    { l:'Use Cases', to:'/use-cases' },
  ],
  Resources: [
    { l:'Blog', to:'/blog' },
    { l:'Free Resources', to:'/resources' },
    { l:'About', to:'/about' },
    { l:'Contact', to:'/contact' },
  ],
};

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);

  return (
    <footer style={{ background:'var(--bg-1)', borderTop:'1px solid var(--line)' }}>
      <div className="wrap" style={{ paddingBlock:'var(--s16)' }}>
        <div style={{ display:'grid', gridTemplateColumns:'1.5fr 1fr 1fr', gap:'var(--s12)', marginBottom:'var(--s12)' }} className="footer-cols">
          {/* Brand */}
          <div>
            <Link to="/" style={{ display:'flex', alignItems:'center', gap:'8px', textDecoration:'none', marginBottom:'var(--s5)' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <defs><linearGradient id="flg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#3b82f6"/><stop offset="100%" stopColor="#06b6d4"/></linearGradient></defs>
                <rect width="24" height="24" rx="6" fill="url(#flg)"/>
                <circle cx="12" cy="12" r="2.5" fill="white"/>
                <line x1="12" y1="5" x2="12" y2="9.5" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                <line x1="12" y1="14.5" x2="12" y2="19" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                <line x1="5" y1="12" x2="9.5" y2="12" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                <line x1="14.5" y1="12" x2="19" y2="12" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              <span style={{ fontSize:'var(--t15)', fontWeight:700, color:'var(--t-hi)', letterSpacing:'-0.03em' }}>automateable</span>
            </Link>
            <p style={{ fontSize:'var(--t13)', color:'var(--t-lo)', lineHeight:1.65, maxWidth:'240px', marginBottom:'var(--s6)' }}>
              Part consulting firm. Part automation lab. Part AI product studio.
            </p>
            {done ? (
              <motion.div initial={{opacity:0,y:4}} animate={{opacity:1,y:0}} style={{ display:'flex', alignItems:'center', gap:'6px', fontSize:'var(--t13)', color:'var(--green)', fontWeight:600 }}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.2"/><path d="M4.5 7l2 2 3-3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                You are on the list
              </motion.div>
            ) : (
              <form onSubmit={e => { e.preventDefault(); if(email.trim()) setDone(true); }} style={{ display:'flex', gap:'6px' }}>
                <input type="email" placeholder="your@email.com" value={email} onChange={e=>setEmail(e.target.value)} required
                  style={{ flex:1, height:'34px', padding:'0 10px', background:'var(--bg-3)', border:'1px solid var(--line-2)', borderRadius:'var(--r6)', fontSize:'var(--t13)', color:'var(--t-hi)', outline:'none' }}
                  onFocus={e=>(e.target.style.borderColor='var(--blue)')}
                  onBlur={e=>(e.target.style.borderColor='var(--line-2)')}/>
                <button type="submit" className="btn btn--sm btn--blue" style={{ borderRadius:'var(--r6)', height:'34px' }}>Subscribe</button>
              </form>
            )}
          </div>

          {Object.entries(cols).map(([heading, items]) => (
            <div key={heading}>
              <div className="label" style={{ marginBottom:'var(--s4)' }}>{heading}</div>
              <ul style={{ display:'flex', flexDirection:'column', gap:'var(--s2)' }}>
                {items.map(item => (
                  <li key={item.l}>
                    <Link to={item.to} style={{ fontSize:'var(--t13)', color:'var(--t-lo)', transition:'color 0.15s' }}
                      onMouseEnter={e=>((e.target as HTMLElement).style.color='var(--t-hi)')}
                      onMouseLeave={e=>((e.target as HTMLElement).style.color='var(--t-lo)')}>
                      {item.l}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div style={{ height:'1px', background:'var(--line)', marginBottom:'var(--s6)' }}/>

        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:'var(--s3)' }}>
          <span style={{ fontSize:'var(--t12)', color:'var(--t-xlo)' }}>&copy; {new Date().getFullYear()} automateable</span>
          <div style={{ display:'flex', alignItems:'center', gap:'var(--s2)' }}>
            <span className="dot dot--live"/>
            <span style={{ fontSize:'var(--t12)', color:'var(--t-xlo)' }}>All systems operational</span>
          </div>
        </div>
      </div>
      <style>{`.footer-cols{grid-template-columns:1.5fr 1fr 1fr}@media(max-width:640px){.footer-cols{grid-template-columns:1fr!important}}`}</style>
    </footer>
  );
};
export default Footer;
