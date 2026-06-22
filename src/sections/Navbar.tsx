import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Logo = () => (
  <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 9, textDecoration: 'none' }}>
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
      <rect width="22" height="22" rx="5" fill="var(--blue)"/>
      <circle cx="11" cy="11" r="2" fill="white"/>
      <line x1="11" y1="4" x2="11" y2="9" stroke="white" strokeWidth="1.4" strokeLinecap="round"/>
      <line x1="11" y1="13" x2="11" y2="18" stroke="white" strokeWidth="1.4" strokeLinecap="round"/>
      <line x1="4" y1="11" x2="9" y2="11" stroke="white" strokeWidth="1.4" strokeLinecap="round"/>
      <line x1="13" y1="11" x2="18" y2="11" stroke="white" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
    <span style={{ fontSize: 'var(--f14)', fontWeight: 700, color: 'var(--t0)', letterSpacing: '-0.03em' }}>
      automateable
    </span>
  </Link>
);

const links = [
  { label: 'Services',  to: '/services'  },
  { label: 'AI Tools',  to: '/tools'     },
  { label: 'Audit',     to: '/audit'     },
  { label: 'Use Cases', to: '/use-cases' },
  { label: 'Pricing',   to: '/pricing'   },
  { label: 'Blog',      to: '/blog'      },
  { label: 'Resources', to: '/resources' },
  { label: 'About',     to: '/about'     },
];

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const loc = useLocation();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const close = () => {
    setOpen(false);
    document.body.style.overflow = '';
  };

  const toggle = () => {
    const next = !open;
    setOpen(next);
    document.body.style.overflow = next ? 'hidden' : '';
  };

  // body overflow cleanup only - no setState
  useEffect(() => { return () => { document.body.style.overflow = ''; }; }, []);

  return (
    <>
      <nav
        role="navigation"
        aria-label="Main"
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
          height: 'var(--nav-h)',
          background: scrolled ? 'rgba(7,7,10,0.88)' : 'transparent',
          backdropFilter: scrolled ? 'blur(24px)' : 'none',
          borderBottom: `1px solid ${scrolled ? 'var(--b1)' : 'transparent'}`,
          transition: 'background 0.3s, border-color 0.3s, backdrop-filter 0.3s',
        }}
      >
        <div className="w" style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Logo />

          {/* desktop links */}
          <ul style={{ display: 'flex', alignItems: 'center', gap: 2, listStyle: 'none', margin: 0, padding: 0 }} className="nav-d">
            {links.map(l => {
              const active = loc.pathname === l.to;
              return (
                <li key={l.to} style={{ position: 'relative' }}>
                  <Link
                    to={l.to}
                    style={{
                      fontSize: 'var(--f13)', fontWeight: active ? 600 : 400,
                      color: active ? 'var(--t0)' : 'var(--t1)',
                      padding: '5px 10px', borderRadius: 'var(--r6)', display: 'block',
                      transition: 'color 0.15s, background 0.15s',
                    }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--t0)'; (e.currentTarget as HTMLElement).style.background = 'var(--s2)'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = active ? 'var(--t0)' : 'var(--t1)'; (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
                  >
                    {l.label}
                  </Link>
                  {active && (
                    <motion.span
                      layoutId="nav-dot"
                      style={{
                        position: 'absolute', bottom: 2, left: '50%', transform: 'translateX(-50%)',
                        width: 3, height: 3, borderRadius: '50%', background: 'var(--blue)', display: 'block',
                      }}
                    />
                  )}
                </li>
              );
            })}
          </ul>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div className="nav-d">
              <Link to="/contact" className="btn btn--md btn--primary" style={{ fontSize: 'var(--f13)', height: 34, padding: '0 16px' }}>
                Book Audit
              </Link>
            </div>

            {/* hamburger */}
            <button
              className="nav-m"
              onClick={toggle}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              style={{
                width: 34, height: 34, display: 'none', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center', gap: 5,
                background: 'var(--s2)', border: '1px solid var(--b1)',
                borderRadius: 'var(--r6)', cursor: 'pointer', padding: 0,
              }}
            >
              <span style={{ width: 15, height: 1.5, background: 'var(--t0)', display: 'block', transition: 'all 0.2s', transform: open ? 'translateY(6.5px) rotate(45deg)' : 'none' }}/>
              <span style={{ width: 15, height: 1.5, background: 'var(--t0)', display: 'block', opacity: open ? 0 : 1, transition: 'opacity 0.15s' }}/>
              <span style={{ width: 15, height: 1.5, background: 'var(--t0)', display: 'block', transition: 'all 0.2s', transform: open ? 'translateY(-6.5px) rotate(-45deg)' : 'none' }}/>
            </button>
          </div>
        </div>
      </nav>

      {/* mobile overlay */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={close}
              style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(4px)', zIndex: 198 }}
            />
            <motion.div
              key="drawer"
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              style={{
                position: 'fixed', top: 0, right: 0, bottom: 0, width: 280,
                background: 'var(--s1)', borderLeft: '1px solid var(--b1)',
                zIndex: 199, padding: 24, overflowY: 'auto',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32 }}>
                <Logo />
                <button
                  onClick={close}
                  aria-label="Close menu"
                  style={{ width: 28, height: 28, background: 'var(--s3)', border: '1px solid var(--b1)', borderRadius: 'var(--r6)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--t1)' }}
                >
                  <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><path d="M1 1l9 9M10 1L1 10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>
                </button>
              </div>

              <nav style={{ display: 'flex', flexDirection: 'column', gap: 2, marginBottom: 24 }}>
                {links.map((l, i) => (
                  <motion.div key={l.to} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.035 }}>
                    <Link
                      to={l.to}
                      style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        padding: '10px 12px', fontSize: 'var(--f14)', fontWeight: loc.pathname === l.to ? 600 : 400,
                        color: loc.pathname === l.to ? 'var(--t0)' : 'var(--t1)',
                        borderRadius: 'var(--r8)', transition: 'background 0.12s',
                      }}
                      onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'var(--s3)'}
                      onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}
                    >
                      {l.label}
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2.5 6h7M6.5 3l3 3-3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <Link to="/contact" className="btn btn--lg btn--primary" style={{ width: '100%', justifyContent: 'center' }}>
                Book an Audit
              </Link>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style>{`
        .nav-m { display: none !important; }
        @media (max-width: 1020px) {
          .nav-d { display: none !important; }
          .nav-m { display: flex !important; }
        }
      `}</style>
    </>
  );
};

export default Navbar;
