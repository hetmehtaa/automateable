import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Command } from 'cmdk';

/* ============================================================
   STAGE RAIL DATA
   ============================================================ */
const stages = [
  { id: '01', label: 'INPUT',     short: 'IN',  routes: ['/', '/contact'],           color: 'var(--blue)' },
  { id: '02', label: 'MAP',       short: 'MAP', routes: ['/audit'],                  color: 'var(--blue-mid)' },
  { id: '03', label: 'DESIGN',    short: 'DES', routes: ['/services'],               color: 'var(--ink-0)' },
  { id: '04', label: 'BUILD',     short: 'BLD', routes: ['/tools', '/use-cases'],    color: 'var(--green)' },
  { id: '05', label: 'VERIFY',    short: 'VRF', routes: ['/pricing'],                color: 'var(--amber)' },
  { id: '06', label: 'SCALE',     short: 'SCL', routes: ['/about', '/blog', '/resources'], color: 'var(--ink-2)' },
];

const navItems = [
  { label: 'Home',          to: '/',            group: 'Core' },
  { label: 'Services',      to: '/services',    group: 'Core' },
  { label: 'AI Tools',      to: '/tools',       group: 'Core' },
  { label: 'Audit',         to: '/audit',       group: 'Core' },
  { label: 'Use Cases',     to: '/use-cases',   group: 'Core' },
  { label: 'Pricing',       to: '/pricing',     group: 'Core' },
  { label: 'About',         to: '/about',       group: 'Company' },
  { label: 'Blog',          to: '/blog',        group: 'Company' },
  { label: 'Resources',     to: '/resources',   group: 'Company' },
  { label: 'Contact',       to: '/contact',     group: 'Company' },
];

const ctaByStage: Record<string, { label: string; to: string }> = {
  '01': { label: 'Map my workflow',         to: '/audit' },
  '02': { label: 'Start audit',             to: '/contact' },
  '03': { label: 'Design my system',        to: '/contact' },
  '04': { label: 'Build my automation',     to: '/contact' },
  '05': { label: 'Calculate ROI',           to: '/pricing' },
  '06': { label: 'Start a retainer',        to: '/contact' },
};

function getActiveStage(pathname: string) {
  return stages.find(s => s.routes.some(r => pathname === r || pathname.startsWith(r + '/'))) ?? stages[0];
}

/* ============================================================
   LOGO
   ============================================================ */
const Logo = () => (
  <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none', flexShrink: 0 }}>
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <rect width="20" height="20" rx="5" fill="var(--ink-0)"/>
      <circle cx="10" cy="10" r="2" fill="var(--paper)"/>
      <line x1="10" y1="3.5" x2="10" y2="8" stroke="var(--paper)" strokeWidth="1.3" strokeLinecap="round"/>
      <line x1="10" y1="12" x2="10" y2="16.5" stroke="var(--paper)" strokeWidth="1.3" strokeLinecap="round"/>
      <line x1="3.5" y1="10" x2="8" y2="10" stroke="var(--paper)" strokeWidth="1.3" strokeLinecap="round"/>
      <line x1="12" y1="10" x2="16.5" y2="10" stroke="var(--paper)" strokeWidth="1.3" strokeLinecap="round"/>
    </svg>
    <span style={{ fontFamily: 'var(--font)', fontSize: 'var(--f13)', fontWeight: 700, color: 'var(--ink-0)', letterSpacing: '-0.03em' }}>
      automateable
    </span>
  </Link>
);

/* ============================================================
   AUTOMATION RAIL
   ============================================================ */
const AutomationRail: React.FC<{ activeStage: typeof stages[0]; scrollProgress: number }> = ({ activeStage, scrollProgress }) => {
  return (
    <nav
      aria-label="Automation stages"
      style={{
        position: 'fixed', left: 0, top: 0, bottom: 0, width: 'var(--rail-w)',
        background: 'var(--paper)', borderRight: '1px solid var(--border)',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        paddingTop: 'var(--topbar-h)', paddingBottom: 16,
        zIndex: 110,
      }}
      className="rail-desktop"
    >
      {/* Progress fill */}
      <div style={{ position: 'absolute', left: 0, top: 'var(--topbar-h)', width: 2, height: `${scrollProgress * 100}%`, background: activeStage.color, transition: 'height 0.1s linear, background 0.3s', maxHeight: 'calc(100% - var(--topbar-h) - 16px)' }} aria-hidden="true"/>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 4, flex: 1, justifyContent: 'center', width: '100%', paddingInline: 6 }}>
        {stages.map(stage => {
          const active = stage.id === activeStage.id;
          return (
            <Link
              key={stage.id}
              to={stage.routes[0]}
              title={stage.label}
              aria-label={`Stage ${stage.id}: ${stage.label}`}
              style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
                padding: '8px 4px', borderRadius: 'var(--r-6)',
                background: active ? 'var(--paper-2)' : 'transparent',
                textDecoration: 'none', transition: 'background var(--d-fast)',
              }}
              onMouseEnter={e => { if (!active) (e.currentTarget as HTMLElement).style.background = 'var(--paper-1)'; }}
              onMouseLeave={e => { if (!active) (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
            >
              <span style={{
                fontFamily: 'var(--mono)', fontSize: '9px', fontWeight: 600,
                color: active ? stage.color : 'var(--ink-5)', letterSpacing: '0.04em',
              }}>{stage.id}</span>
              <span style={{
                fontFamily: 'var(--mono)', fontSize: '7.5px', fontWeight: active ? 700 : 400,
                color: active ? 'var(--ink-0)' : 'var(--ink-4)', letterSpacing: '0.06em',
              }}>{stage.short}</span>
            </Link>
          );
        })}
      </div>

      {/* Bottom system indicator */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
        <div className="dot dot--live" style={{ width: 5, height: 5 }}/>
        <span style={{ fontFamily: 'var(--mono)', fontSize: '7px', color: 'var(--ink-4)', letterSpacing: '0.06em', writingMode: 'vertical-lr', transform: 'rotate(180deg)' }}>LIVE</span>
      </div>
    </nav>
  );
};

/* ============================================================
   COMMAND PALETTE
   ============================================================ */
const CommandPalette: React.FC<{ open: boolean; onClose: () => void }> = ({ open, onClose }) => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');



  const go = (to: string) => { navigate(to); setSearch(''); onClose(); };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            style={{ position: 'fixed', inset: 0, background: 'rgba(26,20,16,0.35)', backdropFilter: 'blur(6px)', zIndex: 500 }}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: -8 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'fixed', top: '18vh', left: '50%', transform: 'translateX(-50%)',
              width: 'min(560px, calc(100vw - 32px))', zIndex: 501,
              background: 'white', borderRadius: 'var(--r-12)', border: '1px solid var(--border-2)',
              boxShadow: '0 24px 64px rgba(26,20,16,0.18), 0 4px 16px rgba(26,20,16,0.08)',
              overflow: 'hidden',
            }}
            role="dialog" aria-label="Command palette" aria-modal="true"
          >
            <Command shouldFilter={true}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px', borderBottom: '1px solid var(--border)' }}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <circle cx="6" cy="6" r="4.5" stroke="var(--ink-3)" strokeWidth="1.3"/>
                  <path d="M9.5 9.5L12.5 12.5" stroke="var(--ink-3)" strokeWidth="1.3" strokeLinecap="round"/>
                </svg>
                <Command.Input
                  value={search}
                  onValueChange={setSearch}
                  placeholder="Search pages, services, tools..."
                  style={{ flex: 1, background: 'none', border: 'none', outline: 'none', fontSize: 'var(--f14)', color: 'var(--ink-0)', fontFamily: 'var(--font)' }}
                />
                <kbd style={{ fontFamily: 'var(--mono)', fontSize: 'var(--f11)', color: 'var(--ink-4)', background: 'var(--paper-2)', border: '1px solid var(--border-2)', borderRadius: 'var(--r-4)', padding: '2px 6px' }}>ESC</kbd>
              </div>
              <Command.List style={{ maxHeight: 320, overflow: 'auto', padding: '8px 0' }}>
                <Command.Empty style={{ padding: '24px 16px', textAlign: 'center', fontSize: 'var(--f13)', color: 'var(--ink-4)' }}>
                  No results found.
                </Command.Empty>
                {['Core', 'Company'].map(group => (
                  <Command.Group key={group} heading={group}
                    style={{ '--cmdk-group-heading-color': 'var(--ink-4)', '--cmdk-group-heading-font-size': 'var(--f10)' } as React.CSSProperties}>
                    {navItems.filter(n => n.group === group).map(item => (
                      <Command.Item key={item.to} value={item.label} onSelect={() => go(item.to)}
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '9px 16px', cursor: 'pointer', borderRadius: 'var(--r-6)', margin: '1px 6px', fontSize: 'var(--f14)', color: 'var(--ink-0)' }}
                        onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'var(--paper-1)'}
                        onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = ''}
                      >
                        <span>{item.label}</span>
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2.5 6h7M6.5 3l3 3-3 3" stroke="var(--ink-4)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </Command.Item>
                    ))}
                  </Command.Group>
                ))}
              </Command.List>
            </Command>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

/* ============================================================
   TOP BAR
   ============================================================ */
const TopBar: React.FC<{ onCommandOpen: () => void; activeStage: typeof stages[0]; mobileMenuOpen: boolean; onMobileMenuToggle: () => void }> = ({ onCommandOpen, activeStage, mobileMenuOpen, onMobileMenuToggle }) => {
  const cta = ctaByStage[activeStage.id];
  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, height: 'var(--topbar-h)',
      background: 'rgba(250,248,245,0.92)', backdropFilter: 'blur(20px)',
      borderBottom: '1px solid var(--border)', zIndex: 111,
      display: 'flex', alignItems: 'center',
      paddingLeft: 'var(--rail-w)', paddingRight: 20,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', paddingLeft: 16 }}>
        <Logo />

        {/* Stage breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }} className="topbar-stage">
          <span style={{ fontFamily: 'var(--mono)', fontSize: 'var(--f10)', color: 'var(--ink-4)', letterSpacing: '0.06em' }}>{activeStage.id}</span>
          <span style={{ width: 16, height: 1, background: 'var(--border-2)' }} aria-hidden="true"/>
          <span style={{ fontFamily: 'var(--mono)', fontSize: 'var(--f11)', color: activeStage.color, fontWeight: 600, letterSpacing: '0.08em' }}>{activeStage.label}</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {/* Command trigger */}
          <button
            onClick={onCommandOpen}
            aria-label="Open command palette (Ctrl+K)"
            style={{
              display: 'flex', alignItems: 'center', gap: 8,
              height: 30, padding: '0 10px',
              background: 'var(--paper-2)', border: '1px solid var(--border-2)',
              borderRadius: 'var(--r-6)', cursor: 'pointer',
              color: 'var(--ink-3)', fontSize: 'var(--f12)', fontFamily: 'var(--font)',
              transition: 'all var(--d-fast)',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'var(--paper-3)'; (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-3)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'var(--paper-2)'; (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-2)'; }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <circle cx="5.5" cy="5.5" r="4" stroke="currentColor" strokeWidth="1.2"/>
              <path d="M8.5 8.5L11 11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
            <span className="topbar-search-label">Search</span>
            <kbd style={{ fontFamily: 'var(--mono)', fontSize: '9px', color: 'var(--ink-4)', background: 'var(--paper-3)', border: '1px solid var(--border-2)', borderRadius: 'var(--r-2)', padding: '1px 5px', lineHeight: '14px' }} className="topbar-kbd">âK</kbd>
          </button>

          {/* Contextual CTA */}
          <Link to={cta.to} className="btn btn--md btn--primary topbar-cta" style={{ fontSize: 'var(--f12)', height: 30, padding: '0 14px' }}>
            {cta.label}
          </Link>

          {/* Mobile hamburger */}
          <button
            className="mobile-menu-btn"
            onClick={onMobileMenuToggle}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
            style={{
              width: 30, height: 30, display: 'none', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center', gap: 4,
              background: 'var(--paper-2)', border: '1px solid var(--border-2)',
              borderRadius: 'var(--r-6)', cursor: 'pointer', padding: 0,
            }}
          >
            <span style={{ width: 14, height: 1.5, background: 'var(--ink-0)', display: 'block', transition: 'transform 0.2s', transform: mobileMenuOpen ? 'translateY(5.5px) rotate(45deg)' : 'none' }}/>
            <span style={{ width: 14, height: 1.5, background: 'var(--ink-0)', display: 'block', opacity: mobileMenuOpen ? 0 : 1, transition: 'opacity 0.15s' }}/>
            <span style={{ width: 14, height: 1.5, background: 'var(--ink-0)', display: 'block', transition: 'transform 0.2s', transform: mobileMenuOpen ? 'translateY(-5.5px) rotate(-45deg)' : 'none' }}/>
          </button>
        </div>
      </div>
    </header>
  );
};

/* ============================================================
   MOBILE MENU
   ============================================================ */
const MobileMenu: React.FC<{ open: boolean; onClose: () => void; activeStage: typeof stages[0] }> = ({ open, onClose, activeStage }) => {
  const cta = ctaByStage[activeStage.id];
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}
            style={{ position: 'fixed', inset: 0, background: 'rgba(26,20,16,0.3)', backdropFilter: 'blur(4px)', zIndex: 200 }}/>
          <motion.div
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            style={{ position: 'fixed', top: 0, right: 0, bottom: 0, width: 280, background: 'white', borderLeft: '1px solid var(--border)', zIndex: 201, overflow: 'auto', padding: 20 }}
            role="dialog" aria-modal="true" aria-label="Navigation menu"
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
              <Logo />
              <button onClick={onClose} aria-label="Close menu" style={{ width: 28, height: 28, background: 'var(--paper-2)', border: '1px solid var(--border)', borderRadius: 'var(--r-6)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--ink-2)' }}>
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M1 1l8 8M9 1L1 9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>
              </button>
            </div>

            <nav>
              {navItems.map((item, i) => (
                <motion.div key={item.to} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }}>
                  <Link to={item.to} onClick={onClose} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 12px', fontSize: 'var(--f14)', color: 'var(--ink-0)', borderRadius: 'var(--r-8)', transition: 'background 0.12s', fontWeight: 500 }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'var(--paper-1)'}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}>
                    {item.label}
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2.5 6h7M6.5 3l3 3-3 3" stroke="var(--ink-4)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div style={{ marginTop: 20 }}>
              <Link to={cta.to} onClick={onClose} className="btn btn--lg btn--primary" style={{ width: '100%', justifyContent: 'center' }}>
                {cta.label}
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

/* ============================================================
   APP SHELL
   ============================================================ */
interface AppShellProps { children: React.ReactNode; }

export const AppShell: React.FC<AppShellProps> = ({ children }) => {
  const loc = useLocation();
  const [cmdOpen, setCmdOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const activeStage = getActiveStage(loc.pathname);

  // Keyboard shortcut
  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); setCmdOpen(v => !v); }
      if (e.key === 'Escape') { setTimeout(() => { setCmdOpen(false); setMobileMenuOpen(false); }, 0); }
    };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, []);

  // Scroll progress
  useEffect(() => {
    const fn = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(total > 0 ? window.scrollY / total : 0);
    };
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  // Close menu on route change
  // Sync body overflow, no setState needed here
  useEffect(() => {
    document.body.style.overflow = '';
  }, [loc.pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
  }, [mobileMenuOpen]);

  return (
    <>
      <AutomationRail activeStage={activeStage} scrollProgress={scrollProgress} />
      <TopBar onCommandOpen={() => setCmdOpen(true)} activeStage={activeStage} mobileMenuOpen={mobileMenuOpen} onMobileMenuToggle={() => setMobileMenuOpen(v => !v)} />
      <CommandPalette open={cmdOpen} onClose={() => setCmdOpen(false)} />
      <MobileMenu open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} activeStage={activeStage} />
      <main style={{ marginLeft: 'var(--rail-w)', marginTop: 'var(--topbar-h)' }} className="main-content">
        {children}
      </main>

      <style>{`
        .rail-desktop { display: flex !important; }
        .topbar-stage { display: flex !important; }
        .topbar-cta   { display: inline-flex !important; }
        .topbar-search-label { display: inline !important; }
        .topbar-kbd   { display: inline !important; }
        .mobile-menu-btn { display: none !important; }
        @media (max-width: 768px) {
          .rail-desktop { display: none !important; }
          .topbar-stage { display: none !important; }
          .topbar-search-label { display: none !important; }
          .topbar-kbd { display: none !important; }
          .topbar-cta { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
          .main-content { margin-left: 0 !important; }
        }
        /* cmdk group heading styles */
        [cmdk-group-heading] {
          font-family: var(--mono);
          font-size: var(--f10);
          font-weight: 600;
          color: var(--ink-4);
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 8px 16px 4px;
        }
        [cmdk-item][data-selected] {
          background: var(--paper-1);
        }
      `}</style>
    </>
  );
};

export default AppShell;
