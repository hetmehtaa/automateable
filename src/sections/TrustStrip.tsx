import React from 'react';
import { motion } from 'framer-motion';

const stats = [
  { value: '200+', label: 'Teams automated' },
  { value: '14h',  label: 'Avg hrs saved/wk' },
  { value: '4.2x', label: 'Average ROI' },
  { value: '87%',  label: 'Tasks automated' },
];

const logos = ['Founders', 'Creators', 'Operators', 'Consultants', 'Teams', 'Professionals'];

export const TrustStrip: React.FC = () => (
  <section style={{ background: 'var(--bg-snow)', borderBottom: '1px solid var(--border)' }}>
    {/* Stats row */}
    <div className="container" style={{ paddingBlock: 'var(--sp-10)' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 'var(--sp-6)' }} className="stats-grid">
        {stats.map((s, i) => (
          <motion.div key={s.label}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            style={{ textAlign: 'center', padding: 'var(--sp-5)', borderRadius: 'var(--r-16)', background: 'white', border: '1px solid var(--border)', boxShadow: 'var(--sh-sm)' }}
          >
            <div style={{ fontSize: 'clamp(var(--text-28), 3vw, var(--text-40))', fontWeight: 900, color: 'var(--c-navy-700)', letterSpacing: 'var(--tracking-tighter)', lineHeight: 1, marginBottom: '6px' }}>{s.value}</div>
            <div style={{ fontSize: 'var(--text-12)', fontWeight: 600, color: 'var(--text-muted)', letterSpacing: '0.04em', textTransform: 'uppercase' }}>{s.label}</div>
          </motion.div>
        ))}
      </div>
    </div>

    {/* Built for strip */}
    <div style={{ borderTop: '1px solid var(--border)', padding: 'var(--sp-4) 0', background: 'white' }}>
      <div className="container">
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-4)', flexWrap: 'wrap', justifyContent: 'center' }}>
          <span style={{ fontSize: 'var(--text-11)', fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase', flexShrink: 0 }}>Built for</span>
          {logos.map((l, i) => (
            <React.Fragment key={l}>
              <span style={{ fontSize: 'var(--text-13)', fontWeight: 600, color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>{l}</span>
              {i < logos.length - 1 && <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--border-med)', flexShrink: 0, display: 'inline-block' }}/>}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>

    <style>{`.stats-grid { grid-template-columns: repeat(4,1fr); } @media (max-width: 640px) { .stats-grid { grid-template-columns: repeat(2,1fr) !important; } }`}</style>
  </section>
);

export default TrustStrip;
