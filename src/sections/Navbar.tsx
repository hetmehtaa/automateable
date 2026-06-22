import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Logo = () => (
  <Link to="/" style={{ display:'flex', alignItems:'center', gap:'8px', textDecoration:'none' }}>
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <defs>
        <linearGradient id="lg1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#3b82f6"/>
          <stop offset="100%" stopColor="#06b6d4"/>
        </linearGradient>
      </defs>
      <rect width="24" height="24" rx="6" fill="url(#lg1)"/>
      <circle cx="12" cy="12" r="2.5" fill="white"/>
      <line x1="12" y1="5" x2="12" y2="9.5" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="12" y1="14.5" x2="12" y2="19" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="5" y1="12" x2="9.5" y2="12" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="14.5" y1="12" x2="19" y2="12" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
    <span style={{ fontSize:'var(--t15)', fontWeight:700, color:'var(--t-hi)', letterSpacing:'-0.03em' }}>
      automateable
    </span>
  </Link>
);

const links = [
  { label:'Services',  to:'/services'  },
  { label:'AI Tools',  to:'/tools'     },
  { label:'Audit',     to:'/audit'     },
  { label:'Use Cases', to:'/use-cases' },
  { label:'Pricing',   to:'/pricing'   },
  { label:'Blog',      to:'/blog'      },
  { label:'Resources', to:'/resources' },
  { label:'About',     to:'/about'     },
];

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const loc = useLocation();
  useNavigate();

  useEffect(() => {
    const s = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', s, { passive:true });
    return () => window.removeEventListener('scroll', s);
  }, []);



  const toggleMenu = () => {
    setOpen(v => {
      document.body.style.overflow = v ? '' : 'hidden';
      return !v;
    });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22,1,0.36,1] }}
        style={{
          position:'fixed', top:0, left:0, right:0, zIndex:100,
          height:'var(--nav-h)',
          background: scrolled ? 'rgba(10,10,11,0.92)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
          borderBottom: scrolled ? '1px solid var(--line)' : '1px solid transparent',
          transition:'all 0.3s ease',
        }}
      >
        <div className="wrap" style={{ height:'100%', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          <Logo />

          <ul className="nav-links" style={{ display:'flex', alignItems:'center', gap:'2px', listStyle:'none', margin:0, padding:0 }}>
            {links.map(l => {
              const active = loc.pathname === l.to || loc.pathname.startsWith(l.to + '/');
              return (
                <li key={l.to}>
                  <Link to={l.to} style={{
                    fontSize:'var(--t13)', fontWeight: active ? 600 : 400,
                    color: active ? 'var(--t-hi)' : 'var(--t-md)',
                    padding:'5px 10px', borderRadius:'var(--r6)', display:'block',
                    transition:'color 0.15s, background 0.15s', position:'relative',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color='var(--t-hi)'; (e.currentTarget as HTMLElement).style.background='var(--bg-2)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color=active?'var(--t-hi)':'var(--t-md)'; (e.currentTarget as HTMLElement).style.background='transparent'; }}>
                    {l.label}
                    {active && <motion.span layoutId="nav-dot" style={{ position:'absolute', bottom:'3px', left:'50%', transform:'translateX(-50%)', width:'3px', height:'3px', borderRadius:'50%', background:'var(--blue)', display:'block' }}/>}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div style={{ display:'flex', alignItems:'center', gap:'8px' }}>
            <div className="nav-cta">
              <Link to="/contact" className="btn btn--md btn--primary">Book Audit</Link>
            </div>
            <button className="nav-ham" onClick={toggleMenu} aria-label={open ? 'Close' : 'Menu'}
              style={{ width:'36px', height:'36px', display:'none', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:'5px', background:'var(--bg-2)', border:'1px solid var(--line)', borderRadius:'var(--r8)', cursor:'pointer', padding:0 }}>
              <span style={{ width:'16px', height:'1.5px', background:'var(--t-hi)', display:'block', transition:'all 0.2s', transform:open?'translateY(6.5px) rotate(45deg)':'' }}/>
              <span style={{ width:'16px', height:'1.5px', background:'var(--t-hi)', display:'block', opacity:open?0:1, transition:'opacity 0.15s' }}/>
              <span style={{ width:'16px', height:'1.5px', background:'var(--t-hi)', display:'block', transition:'all 0.2s', transform:open?'translateY(-6.5px) rotate(-45deg)':'' }}/>
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <>
            <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={() => { setOpen(false); document.body.style.overflow=''; }}
              style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.7)', backdropFilter:'blur(4px)', zIndex:98 }}/>
            <motion.div initial={{x:'100%'}} animate={{x:0}} exit={{x:'100%'}} transition={{type:'spring',damping:26,stiffness:280}}
              style={{ position:'fixed', top:0, right:0, bottom:0, width:'280px', background:'var(--bg-1)', border:'left 1px solid var(--line)', zIndex:99, padding:'var(--s6)', overflow:'auto', borderLeft:'1px solid var(--line)' }}>
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'var(--s8)' }}>
                <Logo />
                <button onClick={() => { setOpen(false); document.body.style.overflow=''; }}
                  style={{ width:'30px', height:'30px', background:'var(--bg-3)', border:'1px solid var(--line)', borderRadius:'var(--r6)', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', color:'var(--t-md)' }}>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                </button>
              </div>
              <nav style={{ display:'flex', flexDirection:'column', gap:'2px' }}>
                {links.map((l,i) => (
                  <motion.div key={l.to} initial={{opacity:0,x:12}} animate={{opacity:1,x:0}} transition={{delay:i*0.04}}>
                    <Link to={l.to} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'var(--s3) var(--s4)', fontSize:'var(--t15)', fontWeight:500, color:loc.pathname===l.to?'var(--t-hi)':'var(--t-md)', borderRadius:'var(--r8)', transition:'all 0.15s' }}
                      onMouseEnter={e=>(e.currentTarget as HTMLElement).style.background='var(--bg-3)'}
                      onMouseLeave={e=>(e.currentTarget as HTMLElement).style.background='transparent'}>
                      {l.label}
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2.5 6h7M6.5 3l3 3-3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </Link>
                  </motion.div>
                ))}
              </nav>
              <div style={{ marginTop:'var(--s8)' }}>
                <Link to="/contact" className="btn btn--lg btn--primary" style={{ width:'100%', justifyContent:'center' }}>Book an Audit</Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style>{`
        .nav-ham { display: none !important; }
        @media (max-width: 1024px) {
          .nav-links { display: none !important; }
          .nav-cta { display: none !important; }
          .nav-ham { display: flex !important; }
        }
      `}</style>
    </>
  );
};
export default Navbar;
