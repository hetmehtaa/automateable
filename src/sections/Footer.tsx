import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const cols = {
  Product: [
    { l: 'Services',         to: '/services' },
    { l: 'AI Tools',         to: '/tools' },
    { l: 'Automation Audit', to: '/audit' },
    { l: 'Pricing',          to: '/pricing' },
    { l: 'Use Cases',        to: '/use-cases' },
  ],
  Resources: [
    { l: 'Blog',             to: '/blog' },
    { l: 'Free Resources',   to: '/resources' },
    { l: 'About',            to: '/about' },
    { l: 'Contact',          to: '/contact' },
  ],
};

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);

  return (
    <footer style={{ borderTop: '1px solid var(--border)', background: 'var(--paper-1)' }}>
      <div className="w" style={{ paddingBlock: 'var(--sp-16)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr', gap: 'var(--sp-12)', marginBottom: 'var(--sp-12)' }} className="footer-cols">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 'var(--sp-4)' }}>
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <rect width="20" height="20" rx="5" fill="var(--ink-0)"/>
                <circle cx="10" cy="10" r="2" fill="var(--paper)"/>
                <line x1="10" y1="3.5" x2="10" y2="8" stroke="var(--paper)" strokeWidth="1.3" strokeLinecap="round"/>
                <line x1="10" y1="12" x2="10" y2="16.5" stroke="var(--paper)" strokeWidth="1.3" strokeLinecap="round"/>
                <line x1="3.5" y1="10" x2="8" y2="10" stroke="var(--paper)" strokeWidth="1.3" strokeLinecap="round"/>
                <line x1="12" y1="10" x2="16.5" y2="10" stroke="var(--paper)" strokeWidth="1.3" strokeLinecap="round"/>
              </svg>
              <span style={{ fontSize: 'var(--f13)', fontWeight: 700, color: 'var(--ink-0)', letterSpacing: '-0.03em' }}>automateable</span>
            </div>
            <p style={{ fontSize: 'var(--f13)', color: 'var(--ink-3)', lineHeight: 1.65, maxWidth: 240, marginBottom: 'var(--sp-6)' }}>
              Automation consulting, AI agents, and custom tools for workflows that should not still be manual.
            </p>
            {done ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 'var(--f13)', color: 'var(--green)', fontWeight: 600 }}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.2"/><path d="M4.5 7l2 2 3-3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                On the list
              </div>
            ) : (
              <form onSubmit={e => { e.preventDefault(); if (email.trim()) setDone(true); }} style={{ display: 'flex', gap: 6 }}>
                <input type="email" placeholder="your@email.com" value={email} onChange={e => setEmail(e.target.value)} required
                  aria-label="Newsletter email"
                  style={{ flex: 1, height: 34, padding: '0 10px', background: 'var(--paper)', border: '1px solid var(--border-2)', borderRadius: 'var(--r-6)', fontSize: 'var(--f13)', color: 'var(--ink-0)', outline: 'none' }}
                  onFocus={e => (e.target.style.borderColor = 'var(--blue)')}
                  onBlur={e => (e.target.style.borderColor = 'var(--border-2)')} />
                <button type="submit" className="btn btn--sm btn--primary" style={{ height: 34, borderRadius: 'var(--r-6)' }}>
                  Subscribe
                </button>
              </form>
            )}
          </div>

          {Object.entries(cols).map(([heading, items]) => (
            <div key={heading}>
              <div className="label" style={{ marginBottom: 'var(--sp-4)' }}>{heading}</div>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-2)' }}>
                {items.map(item => (
                  <li key={item.l}>
                    <Link to={item.to} style={{ fontSize: 'var(--f13)', color: 'var(--ink-3)', transition: 'color var(--d-fast)', display: 'block', padding: '2px 0' }}
                      onMouseEnter={e => ((e.target as HTMLElement).style.color = 'var(--ink-0)')}
                      onMouseLeave={e => ((e.target as HTMLElement).style.color = 'var(--ink-3)')}>
                      {item.l}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div style={{ height: 1, background: 'var(--border)', marginBottom: 'var(--sp-6)' }} />

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 'var(--sp-3)' }}>
          <span style={{ fontFamily: 'var(--mono)', fontSize: 'var(--f11)', color: 'var(--ink-4)' }}>
            &copy; {new Date().getFullYear()} automateable
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span className="dot dot--live" style={{ width: 5, height: 5 }} />
            <span style={{ fontFamily: 'var(--mono)', fontSize: 'var(--f11)', color: 'var(--ink-4)' }}>All systems operational</span>
          </div>
        </div>
      </div>
      <style>{`.footer-cols{grid-template-columns:1.4fr 1fr 1fr}@media(max-width:640px){.footer-cols{grid-template-columns:1fr!important}}`}</style>
    </footer>
  );
};

export default Footer;
