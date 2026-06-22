import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PageLayout } from '../components/PageLayout';
import { Reveal, StaggerContainer, StaggerItem } from '../components/Reveal';
import { Badge } from '../design-system';
import { resources, resourceCategories } from '../data/resources';
import { IconDownload, IconFileText, IconBook, IconCheck, IconBarChart, IconMap } from '../design-system';

const typeIcons: Record<string, React.FC<{ size?: number; color?: string }>> = {
  template:   IconFileText,
  guide:      IconBook,
  checklist:  IconCheck,
  calculator: IconBarChart,
  framework:  IconMap,
};

const typeColors: Record<string, { bg: string; text: string; border: string }> = {
  template:   { bg: 'var(--color-blue-50)',   text: 'var(--color-blue-500)',   border: 'var(--color-blue-200)' },
  guide:      { bg: 'var(--color-violet-100)', text: 'var(--color-violet-500)', border: 'var(--color-violet-100)' },
  checklist:  { bg: 'var(--color-green-100)', text: 'var(--color-green-500)',  border: 'var(--color-green-100)' },
  calculator: { bg: 'var(--color-cyan-100)',  text: 'var(--color-cyan-500)',   border: 'var(--color-cyan-200)' },
  framework:  { bg: 'var(--color-amber-100)', text: 'var(--color-amber-500)',  border: 'var(--color-amber-100)' },
};

export const ResourcesPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeType, setActiveType]         = useState('All');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState<string | null>(null);

  const filtered = resources.filter(r => {
    const catOk  = activeCategory === 'All' || r.category === activeCategory;
    const typeOk = activeType === 'All' || r.type === activeType;
    return catOk && typeOk;
  });

  const featured = resources.filter(r => r.featured);

  return (
    <PageLayout title="Resources">
      {/* Hero */}
      <section style={{ padding: 'var(--space-20) 0 var(--space-12)', background: 'var(--bg-surface)', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container" style={{ maxWidth: 'var(--container-xl)' }}>
          <Reveal>
            <div style={{ maxWidth: '640px' }}>
              <div style={{ marginBottom: 'var(--space-4)' }}>
                <Badge variant="cyan">Free Resources</Badge>
              </div>
              <h1 style={{ fontSize: 'clamp(var(--text-3xl), 4vw, var(--text-6xl))', fontWeight: 800, letterSpacing: 'var(--tracking-tight)', lineHeight: 'var(--leading-tight)', marginBottom: 'var(--space-5)', color: 'var(--text-primary)' }}>
                Templates, guides,<br />and frameworks.
              </h1>
              <p style={{ fontSize: 'var(--text-lg)', color: 'var(--text-secondary)', lineHeight: 'var(--leading-relaxed)' }}>
                Free tools to help you diagnose your workflows, plan your automations, and start building better systems today.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Featured */}
      <section style={{ padding: 'var(--space-16) 0', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container" style={{ maxWidth: 'var(--container-xl)' }}>
          <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 'var(--space-6)' }}>Featured resources</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 'var(--space-5)' }} className="featured-res-grid">
            {featured.map((res, i) => (
              <Reveal key={res.slug} delay={i * 0.1}>
                <FeaturedResourceCard res={res} email={email} setEmail={setEmail} submitted={submitted} setSubmitted={setSubmitted} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Filters + all */}
      <section style={{ padding: 'var(--space-16) 0' }}>
        <div className="container" style={{ maxWidth: 'var(--container-xl)' }}>
          <div style={{ display: 'flex', gap: 'var(--space-8)', marginBottom: 'var(--space-8)', flexWrap: 'wrap', alignItems: 'flex-start' }}>
            <div>
              <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 'var(--space-2)' }}>Category</div>
              <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
                {resourceCategories.map(cat => (
                  <button key={cat} onClick={() => setActiveCategory(cat)}
                    style={{ height: '32px', padding: '0 14px', background: activeCategory === cat ? 'var(--color-ink-900)' : 'var(--bg-elevated)', color: activeCategory === cat ? 'white' : 'var(--text-secondary)', border: `1px solid ${activeCategory === cat ? 'var(--color-ink-900)' : 'var(--border-color)'}`, borderRadius: 'var(--radius-full)', fontSize: 'var(--text-xs)', fontWeight: 600, cursor: 'pointer', transition: 'all var(--transition-fast)' }}>
                    {cat}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 'var(--space-2)' }}>Type</div>
              <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
                {['All', 'template', 'guide', 'checklist', 'calculator', 'framework'].map(t => (
                  <button key={t} onClick={() => setActiveType(t)}
                    style={{ height: '32px', padding: '0 14px', background: activeType === t ? 'var(--color-ink-900)' : 'var(--bg-elevated)', color: activeType === t ? 'white' : 'var(--text-secondary)', border: `1px solid ${activeType === t ? 'var(--color-ink-900)' : 'var(--border-color)'}`, borderRadius: 'var(--radius-full)', fontSize: 'var(--text-xs)', fontWeight: 600, cursor: 'pointer', transition: 'all var(--transition-fast)', textTransform: 'capitalize' }}>
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <StaggerContainer style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 'var(--space-4)' }} className="res-grid">
            {filtered.map(res => (
              <StaggerItem key={res.slug}>
                <ResourceCard res={res} email={email} setEmail={setEmail} submitted={submitted} setSubmitted={setSubmitted} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>
      <style>{`
        .featured-res-grid { grid-template-columns: repeat(3,1fr); }
        .res-grid { grid-template-columns: repeat(2,1fr); }
        @media (max-width: 1024px) { .featured-res-grid { grid-template-columns: repeat(2,1fr) !important; } }
        @media (max-width: 768px) { .res-grid { grid-template-columns: 1fr !important; } }
        @media (max-width: 640px) { .featured-res-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </PageLayout>
  );
};

interface CardProps {
  res: typeof resources[0];
  email: string;
  setEmail: (v: string) => void;
  submitted: string | null;
  setSubmitted: (v: string) => void;
}

const FeaturedResourceCard: React.FC<CardProps> = ({ res }) => {
  const [hov, setHov] = useState(false);
  const [localEmail, setLocalEmail] = useState('');
  const [done, setDone] = useState(false);
  const c = typeColors[res.type];
  const Icon = typeIcons[res.type] || IconFileText;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (localEmail.trim()) { setDone(true); }
  };

  return (
    <motion.div whileHover={{ y: -3 }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ background: 'var(--bg-elevated)', border: `1px solid ${hov ? 'var(--color-blue-200)' : 'var(--border-color)'}`, borderRadius: 'var(--radius-2xl)', padding: 'var(--space-7)', boxShadow: hov ? 'var(--shadow-lg)' : 'var(--shadow-sm)', transition: 'all var(--transition-base)', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div style={{ width: '44px', height: '44px', borderRadius: 'var(--radius-lg)', background: c.bg, border: `1px solid ${c.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: c.text, flexShrink: 0 }}>
          <Icon size={20} />
        </div>
        <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'capitalize', background: c.bg, color: c.text, border: `1px solid ${c.border}`, borderRadius: 'var(--radius-full)', padding: '3px 9px' }}>{res.type}</span>
      </div>
      <div>
        <h3 style={{ fontSize: 'var(--text-lg)', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em', marginBottom: '6px' }}>{res.title}</h3>
        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', lineHeight: 'var(--leading-relaxed)' }}>{res.desc}</p>
      </div>
      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
        {res.tags.map(tag => <span key={tag} style={{ fontSize: '10px', fontWeight: 600, background: 'var(--bg-surface)', border: '1px solid var(--border-color)', color: 'var(--text-muted)', borderRadius: 'var(--radius-full)', padding: '2px 8px' }}>{tag}</span>)}
      </div>
      {done ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 14px', background: 'var(--color-green-100)', borderRadius: 'var(--radius-md)', fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--color-green-500)' }}>
          <IconCheck size={14} color="currentColor" /> Check your email for the download link
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '8px' }}>
          <input type="email" placeholder="your@email.com" value={localEmail} onChange={e => setLocalEmail(e.target.value)} required
            style={{ flex: 1, height: '38px', padding: '0 12px', background: 'var(--bg-surface)', border: '1px solid var(--border-med)', borderRadius: 'var(--radius-md)', fontSize: 'var(--text-sm)', color: 'var(--text-primary)', outline: 'none', transition: 'border-color var(--transition-fast)' }}
            onFocus={e => (e.target.style.borderColor = 'var(--border-focus)')}
            onBlur={e => (e.target.style.borderColor = 'var(--border-med)')} />
          <button type="submit" style={{ height: '38px', padding: '0 14px', background: 'var(--color-ink-900)', color: 'white', border: 'none', borderRadius: 'var(--radius-md)', fontSize: 'var(--text-xs)', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', whiteSpace: 'nowrap', transition: 'background var(--transition-fast)' }}
            onMouseEnter={e => (e.currentTarget.style.background = 'var(--color-ink-700)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'var(--color-ink-900)')}>
            <IconDownload size={12} color="white" /> {res.downloadLabel}
          </button>
        </form>
      )}
    </motion.div>
  );
};

const ResourceCard: React.FC<CardProps> = ({ res }) => {
  const [hov, setHov] = useState(false);
  const [localEmail, setLocalEmail] = useState('');
  const [done, setDone] = useState(false);
  const c = typeColors[res.type];
  const Icon = typeIcons[res.type] || IconFileText;

  return (
    <motion.div whileHover={{ y: -2 }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ background: 'var(--bg-elevated)', border: `1px solid ${hov ? 'var(--color-blue-200)' : 'var(--border-color)'}`, borderRadius: 'var(--radius-xl)', padding: 'var(--space-6)', boxShadow: hov ? 'var(--shadow-md)' : 'var(--shadow-xs)', transition: 'all var(--transition-base)', display: 'flex', gap: 'var(--space-5)', alignItems: 'flex-start' }}>
      <div style={{ width: '40px', height: '40px', borderRadius: 'var(--radius-lg)', background: c.bg, border: `1px solid ${c.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: c.text, flexShrink: 0 }}>
        <Icon size={18} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 'var(--space-3)', marginBottom: '6px', flexWrap: 'wrap' }}>
          <h3 style={{ fontSize: 'var(--text-base)', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>{res.title}</h3>
          <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.04em', textTransform: 'capitalize', background: c.bg, color: c.text, border: `1px solid ${c.border}`, borderRadius: 'var(--radius-full)', padding: '2px 8px', flexShrink: 0 }}>{res.type}</span>
        </div>
        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', lineHeight: 'var(--leading-relaxed)', marginBottom: 'var(--space-4)' }}>{res.desc}</p>
        {done ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--color-green-500)' }}>
            <IconCheck size={12} color="currentColor" /> Sent to your email
          </div>
        ) : (
          <form onSubmit={e => { e.preventDefault(); if (localEmail.trim()) setDone(true); }} style={{ display: 'flex', gap: '8px' }}>
            <input type="email" placeholder="your@email.com" value={localEmail} onChange={e => setLocalEmail(e.target.value)} required
              style={{ flex: 1, height: '34px', padding: '0 10px', background: 'var(--bg-surface)', border: '1px solid var(--border-med)', borderRadius: 'var(--radius-md)', fontSize: 'var(--text-xs)', color: 'var(--text-primary)', outline: 'none' }}
              onFocus={e => (e.target.style.borderColor = 'var(--border-focus)')}
              onBlur={e => (e.target.style.borderColor = 'var(--border-med)')} />
            <button type="submit" style={{ height: '34px', padding: '0 12px', background: 'var(--color-ink-900)', color: 'white', border: 'none', borderRadius: 'var(--radius-md)', fontSize: '11px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', whiteSpace: 'nowrap' }}
              onMouseEnter={e => (e.currentTarget.style.background = 'var(--color-ink-700)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'var(--color-ink-900)')}>
              <IconDownload size={11} color="white" /> Get it
            </button>
          </form>
        )}
      </div>
    </motion.div>
  );
};

export default ResourcesPage;
