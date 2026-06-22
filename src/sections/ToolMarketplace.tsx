import React, { useState } from 'react';
import { SectionHeader, Badge } from '../design-system';

type ToolStatus = 'live' | 'beta' | 'soon';

const tools: {
  name: string; benefit: string; tag: string; status: ToolStatus; icon: string;
}[] = [
  { icon: 'âï¸', name: 'Content Repurposer',       benefit: 'Turn one piece of content into ten',        tag: 'Content',      status: 'live' },
  { icon: 'ð', name: 'Meeting-to-Action Bot',     benefit: 'Every meeting ends with a clear action list', tag: 'Productivity',  status: 'live' },
  { icon: 'ð', name: 'Personal Research Agent',   benefit: 'Research any topic and get a briefing',     tag: 'Research',     status: 'live' },
  { icon: 'ð¡', name: 'Social Media Idea Engine',  benefit: 'Never run out of content ideas again',      tag: 'Social Media', status: 'beta' },
  { icon: 'ðºï¸', name: 'Workflow Mapper',           benefit: 'Visualize and document any process fast',   tag: 'Operations',   status: 'beta' },
  { icon: 'âï¸', name: 'Daily Briefing Agent',      benefit: 'Start every day with context, not chaos',   tag: 'Personal',     status: 'live' },
  { icon: 'ð', name: 'CRM Follow-up Assistant',   benefit: 'No lead goes cold. No follow-up forgotten', tag: 'Sales',        status: 'beta' },
  { icon: 'ð', name: 'Invoice/Doc Extractor',     benefit: 'Pull structured data from any document',    tag: 'Operations',   status: 'live' },
  { icon: 'ð', name: 'SOP Generator',             benefit: 'Document any process in minutes',           tag: 'Operations',   status: 'soon' },
  { icon: 'ð¯', name: 'Founder Command Center',    benefit: 'Your business dashboard. Always current.',  tag: 'Founders',     status: 'soon' },
];

const statusLabel: Record<ToolStatus, string> = { live: 'Live', beta: 'Beta', soon: 'Coming Soon' };
const statusVariant: Record<ToolStatus, 'live' | 'beta' | 'soon'> = { live: 'live', beta: 'beta', soon: 'soon' };

const filters = ['All', 'Content', 'Productivity', 'Research', 'Social Media', 'Operations', 'Sales', 'Personal', 'Founders'];

export const ToolMarketplace: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered = activeFilter === 'All' ? tools : tools.filter(t => t.tag === activeFilter);

  return (
    <section id="tools" className="section section--surface">
      <div className="container" style={{ maxWidth: 'var(--container-xl)' }}>
        <div style={{ marginBottom: 'var(--space-10)' }}>
          <SectionHeader
            eyebrow="AI Tools"
            title="Ready-to-use automation tools"
            subtitle="Productized tools built for specific workflows. Use them directly or as part of a custom system."
          />
        </div>

        {/* Filter tabs */}
        <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap', justifyContent: 'center', marginBottom: 'var(--space-10)' }}>
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              style={{
                height: '34px', padding: '0 16px',
                background: activeFilter === f ? 'var(--color-ink-900)' : 'var(--bg-elevated)',
                color: activeFilter === f ? 'white' : 'var(--text-secondary)',
                border: `1px solid ${activeFilter === f ? 'var(--color-ink-900)' : 'var(--border-color)'}`,
                borderRadius: 'var(--radius-full)',
                fontSize: 'var(--text-xs)', fontWeight: 600, cursor: 'pointer',
                transition: 'all var(--transition-fast)',
                letterSpacing: '0.02em',
              }}
              onMouseEnter={e => { if (activeFilter !== f) { (e.currentTarget.style.borderColor = 'var(--border-med)'); (e.currentTarget.style.color = 'var(--text-primary)'); }}}
              onMouseLeave={e => { if (activeFilter !== f) { (e.currentTarget.style.borderColor = 'var(--border-color)'); (e.currentTarget.style.color = 'var(--text-secondary)'); }}}
            >
              {f}
            </button>
          ))}
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: 'var(--space-4)',
        }}>
          {filtered.map(tool => <ToolCard key={tool.name} {...tool} />)}
        </div>

        <div style={{ textAlign: 'center', marginTop: 'var(--space-12)' }}>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)', marginBottom: 'var(--space-5)' }}>
            Need a tool that doesn't exist yet?
          </p>
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              height: '44px', padding: '0 24px',
              background: 'transparent', color: 'var(--accent-primary)',
              border: '1px solid var(--color-blue-300)', borderRadius: 'var(--radius-md)',
              fontSize: 'var(--text-sm)', fontWeight: 600, cursor: 'pointer',
              transition: 'all var(--transition-base)',
            }}
            onMouseEnter={e => { (e.currentTarget.style.background = 'var(--color-blue-50)'); }}
            onMouseLeave={e => { (e.currentTarget.style.background = 'transparent'); }}
          >
            Submit your problem â we'll build it
          </button>
        </div>
      </div>
    </section>
  );
};

const ToolCard: React.FC<typeof tools[0]> = ({ icon, name, benefit, tag, status }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'var(--bg-elevated)',
        border: `1px solid ${hovered ? 'var(--color-blue-200)' : 'var(--border-color)'}`,
        borderRadius: 'var(--radius-xl)',
        padding: 'var(--space-6)',
        display: 'flex', flexDirection: 'column', gap: 'var(--space-4)',
        transition: 'all var(--transition-base)',
        transform: hovered ? 'translateY(-2px)' : 'none',
        boxShadow: hovered ? 'var(--shadow-md)' : 'var(--shadow-xs)',
        opacity: status === 'soon' ? 0.75 : 1,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div style={{
          width: '42px', height: '42px', borderRadius: 'var(--radius-lg)',
          background: 'var(--bg-surface)', border: '1px solid var(--border-soft)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '18px', flexShrink: 0,
        }}>
          {icon}
        </div>
        <Badge variant={statusVariant[status]} dot size="sm">
          {statusLabel[status]}
        </Badge>
      </div>

      <div>
        <h3 style={{ fontSize: 'var(--text-md)', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.01em', marginBottom: '6px' }}>
          {name}
        </h3>
        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', lineHeight: 'var(--leading-relaxed)', margin: 0 }}>
          {benefit}
        </p>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto' }}>
        <span style={{
          fontSize: '10px', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase',
          background: 'var(--bg-surface)', border: '1px solid var(--border-color)',
          color: 'var(--text-muted)', borderRadius: 'var(--radius-full)', padding: '2px 8px',
        }}>{tag}</span>

        {status !== 'soon' ? (
          <button
            style={{
              fontSize: 'var(--text-xs)', fontWeight: 600,
              color: hovered ? 'var(--accent-primary)' : 'var(--text-muted)',
              background: 'none', border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: '4px',
              transition: 'color var(--transition-fast)', padding: 0,
            }}
          >
            Try it
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        ) : (
          <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', fontWeight: 500 }}>Notify me</span>
        )}
      </div>
    </div>
  );
};

export default ToolMarketplace;
