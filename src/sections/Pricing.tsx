import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { StaggerContainer, StaggerItem } from '../components/Reveal';
import { SectionHeader } from '../design-system';

const plans = [
  {
    name: 'Automation Audit',
    tagline: 'Clarity before commitment.',
    bestFor: 'Individuals, founders, and teams who want to understand their automation opportunities before building anything.',
    price: 'Starting at $497',
    priceNote: 'Fixed-scope engagement',
    timeline: '3-5 business days',
    items: [
      'Workflow map of your current process',
      'Automation opportunity report',
      'Tool stack recommendation',
      'Estimated time & cost savings',
      'Implementation roadmap',
      'Quick-win automation list',
    ],
    cta: 'Book Your Audit',
    highlight: false,
    badge: null as string | null,
    accentColor: '#0562EF',
  },
  {
    name: 'Build Sprint',
    tagline: 'From blueprint to working system.',
    bestFor: 'Founders and operators ready to implement. Includes full audit, then we build the automation you actually need.',
    price: 'Project-based',
    priceNote: 'Scoped after audit',
    timeline: '2-6 weeks',
    items: [
      'Full automation audit included',
      'Custom workflow implementation',
      'AI agent setup and configuration',
      'Tool integrations and connections',
      'Testing and QA of all automations',
      'Documentation and handoff',
      'One round of revisions',
    ],
    cta: 'Start a Build Sprint',
    highlight: true,
    badge: 'Most Popular',
    accentColor: '#00C2D8',
  },
  {
    name: 'Automation Retainer',
    tagline: 'Systems that improve over time.',
    bestFor: 'Growing businesses and teams that want continuous automation improvement, new workflows, and ongoing AI agent support.',
    price: 'Custom monthly',
    priceNote: 'Ongoing engagement',
    timeline: 'Monthly, cancel anytime',
    items: [
      'Everything in Build Sprint',
      'Ongoing workflow optimization',
      'New automations each month',
      'AI agent monitoring and updates',
      'Monthly performance reporting',
      'Priority support and iteration',
      'Quarterly automation review',
    ],
    cta: 'Discuss a Retainer',
    highlight: false,
    badge: null as string | null,
    accentColor: '#6366f1',
  },
];

export const Pricing: React.FC = () => (
  <section id="pricing" className="section">
    <div className="container">
      <div style={{ marginBottom: 'var(--sp-16)' }}>
        <SectionHeader
          eyebrow="Pricing"
          title="Straightforward engagement models"
          subtitle="No retainers before we have proven value. Start with an audit. Build when you are ready. Scale when it makes sense."
        />
      </div>
      <StaggerContainer style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '20px', alignItems: 'stretch' }} className="pricing-grid">
        {plans.map(p => (
          <StaggerItem key={p.name}>
            <PricingCard {...p} />
          </StaggerItem>
        ))}
      </StaggerContainer>
      <div style={{ textAlign: 'center', marginTop: 'var(--sp-10)' }}>
        <p style={{ fontSize: 'var(--text-14)', color: 'var(--text-muted)' }}>
          Not sure which fits? Start with the audit. It will tell you exactly what you need.
        </p>
      </div>
    </div>
    <style>{`
      .pricing-grid { grid-template-columns: repeat(3,1fr); }
      @media (max-width: 1024px) { .pricing-grid { grid-template-columns: 1fr !important; max-width: 500px; margin: 0 auto; } }
    `}</style>
  </section>
);

const PricingCard: React.FC<typeof plans[0]> = ({ name, tagline, bestFor, price, priceNote, timeline, items, cta, highlight, badge, accentColor }) => {
  const [hov, setHov] = useState(false);

  return (
    <motion.div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      whileHover={{ y: -4 }}
      style={{
        background: highlight ? `linear-gradient(160deg, var(--c-navy-800) 0%, var(--c-navy-700) 100%)` : 'white',
        border: `1px solid ${highlight ? 'rgba(255,255,255,0.08)' : hov ? 'rgba(5,98,239,0.2)' : 'var(--border)'}`,
        borderRadius: 'var(--r-24)',
        padding: 'var(--sp-8)',
        display: 'flex', flexDirection: 'column', gap: 'var(--sp-6)',
        boxShadow: highlight ? '0 24px 64px rgba(7,34,79,0.3)' : hov ? 'var(--sh-xl)' : 'var(--sh-sm)',
        transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
        position: 'relative', overflow: 'hidden', height: '100%',
      }}
    >
      {/* Top gradient line */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: `linear-gradient(90deg, ${accentColor}, ${accentColor}88)`, borderRadius: 'var(--r-24) var(--r-24) 0 0' }}/>

      {badge && (
        <div style={{ position: 'absolute', top: '20px', right: '20px', fontSize: 'var(--text-10)', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', background: `linear-gradient(135deg, var(--c-blue), var(--c-cyan, #00C2D8))`, color: 'white', borderRadius: 'var(--r-full)', padding: '4px 12px' }}>
          {badge}
        </div>
      )}

      <div style={{ paddingTop: badge ? 'var(--sp-4)' : 0 }}>
        <div style={{ fontSize: 'var(--text-18)', fontWeight: 800, color: highlight ? 'white' : 'var(--c-navy-700)', letterSpacing: 'var(--tracking-tight)', marginBottom: '4px' }}>{name}</div>
        <div style={{ fontSize: 'var(--text-13)', color: highlight ? 'rgba(255,255,255,0.5)' : 'var(--text-muted)', fontStyle: 'italic' }}>{tagline}</div>
      </div>

      {/* Price block */}
      <div style={{ padding: 'var(--sp-5)', background: highlight ? 'rgba(255,255,255,0.05)' : 'var(--bg-frost)', borderRadius: 'var(--r-16)', border: `1px solid ${highlight ? 'rgba(255,255,255,0.08)' : 'var(--border)'}` }}>
        <div style={{ fontSize: 'clamp(var(--text-20), 2vw, var(--text-28))', fontWeight: 900, color: highlight ? 'white' : 'var(--c-navy-700)', letterSpacing: 'var(--tracking-tighter)', marginBottom: '4px' }}>{price}</div>
        <div style={{ fontSize: 'var(--text-12)', color: highlight ? 'rgba(255,255,255,0.4)' : 'var(--text-muted)', marginBottom: '10px' }}>{priceNote}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><circle cx="6" cy="6" r="5" stroke={highlight ? 'rgba(255,255,255,0.3)' : accentColor} strokeWidth="1.2" opacity="0.6"/><path d="M6 3v3l2 1" stroke={highlight ? 'rgba(255,255,255,0.3)' : accentColor} strokeWidth="1.2" strokeLinecap="round"/></svg>
          <span style={{ fontSize: 'var(--text-12)', color: highlight ? 'rgba(255,255,255,0.4)' : 'var(--text-secondary)' }}>{timeline}</span>
        </div>
      </div>

      {/* Items */}
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 'var(--text-11)', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: highlight ? 'rgba(255,255,255,0.35)' : 'var(--text-muted)', marginBottom: 'var(--sp-4)' }}>Included</div>
        <ul style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-2)', listStyle: 'none', margin: 0, padding: 0 }}>
          {items.map(item => (
            <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: 'var(--text-13)', color: highlight ? 'rgba(255,255,255,0.65)' : 'var(--text-secondary)', lineHeight: 'var(--leading-snug)' }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, marginTop: '1px' }}>
                <circle cx="8" cy="8" r="7" fill={`${accentColor}15`} stroke={`${accentColor}40`} strokeWidth="1"/>
                <path d="M5 8l2.5 2.5L11 5.5" stroke={accentColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Best for */}
      <div style={{ fontSize: 'var(--text-12)', color: highlight ? 'rgba(255,255,255,0.35)' : 'var(--text-muted)', borderTop: `1px solid ${highlight ? 'rgba(255,255,255,0.07)' : 'var(--border)'}`, paddingTop: 'var(--sp-4)', lineHeight: 'var(--leading-relaxed)' }}>
        <strong style={{ color: highlight ? 'rgba(255,255,255,0.5)' : 'var(--text-secondary)' }}>Best for: </strong>{bestFor}
      </div>

      <button
        onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
        style={{ width: '100%', height: '46px', background: highlight ? `linear-gradient(135deg, var(--c-blue), #00C2D8)` : 'var(--c-navy-700)', color: 'white', border: 'none', borderRadius: 'var(--r-12)', fontSize: 'var(--text-14)', fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s ease', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', letterSpacing: 'var(--tracking-snug)' }}
        onMouseEnter={e => { (e.currentTarget.style.opacity = '0.9'); (e.currentTarget.style.transform = 'translateY(-1px)'); }}
        onMouseLeave={e => { (e.currentTarget.style.opacity = '1'); (e.currentTarget.style.transform = 'none'); }}>
        {cta}
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2.5 7h9M8 3.5L11.5 7 8 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </button>
    </motion.div>
  );
};

export default Pricing;
