import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { StaggerContainer, StaggerItem } from '../components/Reveal';
import { SectionHeader } from '../design-system';
import { IconSearch, IconBot, IconSettings, IconGlobe, IconZap, IconBarChart } from '../design-system';

interface Service {
  Icon: React.FC<{ size?: number; color?: string }>;
  title: string;
  desc: string;
  tags: string[];
  highlight: boolean;
}

const services: Service[] = [
  {
    Icon: IconSearch,
    title: 'Automation Consulting',
    desc: 'We audit your current workflow and find what should be automated, delegated, or redesigned. No guesswork. Just a clear map of where your time is going.',
    tags: ['Audit', 'Strategy', 'Workflow'],
    highlight: false,
  },
  {
    Icon: IconBot,
    title: 'Custom AI Agents',
    desc: 'We build task-specific agents for research, reporting, support, content, operations, and internal workflows. Agents that actually do the work.',
    tags: ['AI Agents', 'Custom Build', 'Automation'],
    highlight: true,
  },
  {
    Icon: IconSettings,
    title: 'AI Tool Implementation',
    desc: 'We connect existing tools like Notion, Slack, Google Workspace, CRMs, APIs, and AI models into working systems. Not just integrations -- actual workflows.',
    tags: ['Integration', 'APIs', 'Toolstack'],
    highlight: false,
  },
  {
    Icon: IconGlobe,
    title: 'Social Media Automation',
    desc: "We help creators plan, repurpose, schedule, analyze, and scale content without turning into a spreadsheet goblin. One idea. Many outputs.",
    tags: ['Content', 'Scheduling', 'Repurposing'],
    highlight: false,
  },
  {
    Icon: IconZap,
    title: 'Personal Automation',
    desc: 'Automate reminders, knowledge capture, learning systems, finance tracking, travel planning, and daily workflows. Your operating system for life.',
    tags: ['Personal OS', 'Productivity', 'Life'],
    highlight: false,
  },
  {
    Icon: IconBarChart,
    title: 'Business Process Automation',
    desc: 'Turn repetitive internal work into dashboards, triggers, workflows, and AI-powered execution systems. Less firefighting. More operating.',
    tags: ['BPA', 'Operations', 'Dashboards'],
    highlight: false,
  },
];

export const Services: React.FC = () => (
  <section id="services" className="section">
    <div className="container" style={{ maxWidth: 'var(--container-xl)' }}>
      <div style={{ marginBottom: 'var(--space-12)' }}>
        <SectionHeader
          eyebrow="Services"
          title="What we build for you"
          subtitle="From a single automation to a full operating system. We work at the level your problem requires."
        />
      </div>

      <StaggerContainer style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 'var(--space-5)' }} className="services-grid">
        {services.map(s => (
          <StaggerItem key={s.title}>
            <ServiceCard {...s} />
          </StaggerItem>
        ))}
      </StaggerContainer>

      <div style={{ textAlign: 'center', marginTop: 'var(--space-12)' }}>
        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)', marginBottom: 'var(--space-5)' }}>
          Not sure which service fits your problem?
        </p>
        <button
          onClick={() => document.getElementById('audit')?.scrollIntoView({ behavior: 'smooth' })}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', height: '44px', padding: '0 24px', background: 'var(--color-ink-900)', color: 'white', border: 'none', borderRadius: 'var(--radius-md)', fontSize: 'var(--text-sm)', fontWeight: 700, cursor: 'pointer', transition: 'all var(--transition-base)' }}
          onMouseEnter={e => (e.currentTarget.style.background = 'var(--color-ink-700)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'var(--color-ink-900)')}>
          Start with an audit -- it will clarify everything
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2.5 7h9M8 3.5L11.5 7 8 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
      </div>
    </div>
    <style>{`
      .services-grid { grid-template-columns: repeat(3,1fr) !important; }
      @media (max-width: 1024px) { .services-grid { grid-template-columns: repeat(2,1fr) !important; } }
      @media (max-width: 640px)  { .services-grid { grid-template-columns: 1fr !important; } }
    `}</style>
  </section>
);

const ServiceCard: React.FC<Service> = ({ Icon, title, desc, tags, highlight }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ y: -3 }}
      style={{
        background: highlight ? 'var(--color-ink-900)' : 'var(--bg-elevated)',
        border: `1px solid ${hovered ? (highlight ? 'var(--color-cyan-400)' : 'var(--color-blue-200)') : (highlight ? 'var(--color-ink-700)' : 'var(--border-color)')}`,
        borderRadius: 'var(--radius-xl)',
        padding: 'var(--space-7)',
        display: 'flex', flexDirection: 'column', gap: 'var(--space-4)',
        transition: 'border-color var(--transition-base)',
        boxShadow: hovered ? (highlight ? '0 8px 32px rgba(6,214,240,0.15)' : 'var(--shadow-lg)') : 'var(--shadow-xs)',
        position: 'relative', overflow: 'hidden', height: '100%',
      }}
    >
      {highlight && (
        <div style={{ position: 'absolute', top: '16px', right: '16px', fontSize: '10px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', background: 'var(--color-cyan-400)', color: 'var(--color-ink-900)', borderRadius: 'var(--radius-full)', padding: '3px 10px' }}>
          Popular
        </div>
      )}

      <div style={{ width: '44px', height: '44px', borderRadius: 'var(--radius-lg)', background: highlight ? 'rgba(255,255,255,0.08)' : 'var(--bg-surface)', border: `1px solid ${highlight ? 'rgba(255,255,255,0.12)' : 'var(--border-soft)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: highlight ? 'rgba(255,255,255,0.9)' : hovered ? 'var(--accent-primary)' : 'var(--text-muted)', transition: 'color var(--transition-base)', flexShrink: 0 }}>
        <Icon size={20} />
      </div>

      <div>
        <h3 style={{ fontSize: 'var(--text-lg)', fontWeight: 700, color: highlight ? 'white' : 'var(--text-primary)', letterSpacing: '-0.02em', marginBottom: 'var(--space-3)' }}>{title}</h3>
        <p style={{ fontSize: 'var(--text-sm)', color: highlight ? 'rgba(255,255,255,0.65)' : 'var(--text-secondary)', lineHeight: 'var(--leading-relaxed)', margin: 0 }}>{desc}</p>
      </div>

      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: 'auto' }}>
        {tags.map(t => (
          <span key={t} style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.04em', padding: '3px 9px', borderRadius: 'var(--radius-full)', background: highlight ? 'rgba(255,255,255,0.08)' : 'var(--bg-surface)', border: `1px solid ${highlight ? 'rgba(255,255,255,0.12)' : 'var(--border-color)'}`, color: highlight ? 'rgba(255,255,255,0.6)' : 'var(--text-muted)' }}>{t}</span>
        ))}
      </div>
    </motion.div>
  );
};

export default Services;
