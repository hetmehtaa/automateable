import React from 'react';
import { motion } from 'framer-motion';
import { Reveal, StaggerContainer, StaggerItem } from '../components/Reveal';
import { SectionHeader } from '../design-system';
import {
  IconTarget, IconMail, IconMessageSquare, IconBarChart,
  IconUsers, IconBook, IconFileText, IconBell,
} from '../design-system';

const metrics = [
  { label: 'Open Leads',      value: '48',  delta: '+12 this week', color: 'var(--color-blue-500)' },
  { label: 'Follow-ups Due',  value: '7',   delta: '2 overdue',     color: 'var(--color-amber-500)' },
  { label: 'Support Tickets', value: '3',   delta: 'Down from 19',  color: 'var(--color-green-500)' },
  { label: 'Docs Processed',  value: '124', delta: 'This month',    color: 'var(--color-cyan-500)' },
];

const activities = [
  { text: 'New lead from Contact Form',     time: '2 min ago',   status: 'new' },
  { text: 'CRM updated: Acme Corp',         time: '14 min ago',  status: 'done' },
  { text: 'Ticket #204 auto-routed',        time: '31 min ago',  status: 'done' },
  { text: 'Weekly digest sent to 5 people', time: '1 hour ago',  status: 'done' },
  { text: 'Invoice extracted: $4,200',      time: '2 hours ago', status: 'done' },
];

const capabilities = [
  { Icon: IconTarget,         label: 'Lead management',     desc: 'Capture, score, and route leads automatically' },
  { Icon: IconMail,           label: 'Follow-up sequences', desc: 'Timed sequences triggered without manual sends' },
  { Icon: IconMessageSquare,  label: 'Support triage',      desc: 'Tickets categorized, prioritized, and routed' },
  { Icon: IconBarChart,       label: 'Auto reporting',      desc: 'Reports built and delivered on schedule' },
  { Icon: IconUsers,          label: 'Team handoffs',       desc: 'Work assigned automatically on trigger events' },
  { Icon: IconBook,           label: 'SOP management',      desc: 'Processes documented, versioned, and followed' },
  { Icon: IconFileText,       label: 'Document processing', desc: 'Data extracted from invoices, forms, and PDFs' },
  { Icon: IconBell,           label: 'Customer updates',    desc: 'Proactive updates sent at the right moments' },
];

const CommandDashboard: React.FC = () => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    style={{ background: 'var(--color-ink-900)', border: '1px solid var(--color-ink-700)', borderRadius: 'var(--radius-2xl)', padding: '20px', boxShadow: 'var(--shadow-xl)' }}
  >
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
      <div>
        <div style={{ fontSize: '13px', fontWeight: 800, color: 'white', letterSpacing: '-0.02em' }}>Business Command Center</div>
        <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)', marginTop: '2px' }}>All systems automated â live view</div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
        <span className="status-dot status-dot--active" />
        <span style={{ fontSize: '10px', fontWeight: 700, color: 'var(--color-cyan-400)', letterSpacing: '0.06em' }}>LIVE</span>
      </div>
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '8px', marginBottom: '16px' }}>
      {metrics.map((m, i) => (
        <motion.div key={m.label} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} viewport={{ once: true }}
          style={{ padding: '10px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
          <div style={{ fontSize: '20px', fontWeight: 800, color: m.color, letterSpacing: '-0.03em' }}>{m.value}</div>
          <div style={{ fontSize: '9px', fontWeight: 700, color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: '2px' }}>{m.label}</div>
          <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.3)', marginTop: '2px' }}>{m.delta}</div>
        </motion.div>
      ))}
    </div>
    <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.06)' }}>
      <div style={{ padding: '8px 14px', borderBottom: '1px solid rgba(255,255,255,0.06)', fontSize: '10px', fontWeight: 700, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Activity Feed</div>
      {activities.map((a, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '9px 14px', borderBottom: i < activities.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: a.status === 'new' ? 'var(--color-blue-400)' : 'var(--color-green-400)', flexShrink: 0 }} />
            <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.75)', fontWeight: 500 }}>{a.text}</span>
          </div>
          <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)', flexShrink: 0, marginLeft: '12px' }}>{a.time}</span>
        </div>
      ))}
    </div>
  </motion.div>
);

export const BusinessCommandCenter: React.FC = () => (
  <section id="business" className="section section--surface">
    <div className="container" style={{ maxWidth: 'var(--container-xl)' }}>
      <div style={{ marginBottom: 'var(--space-12)' }}>
        <SectionHeader
          eyebrow="Business Automation"
          title="Run the business. Not the spreadsheets."
          subtitle="We build command centers that keep your operations running without constant manual input from your team."
        />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-16)', alignItems: 'center' }} className="bcc-grid">
        <Reveal direction="left">
          <div>
            <StaggerContainer style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-3)', marginBottom: 'var(--space-8)' }}>
              {capabilities.map(c => (
                <StaggerItem key={c.label}>
                  <motion.div
                    whileHover={{ borderColor: 'var(--color-blue-200)', y: -1 }}
                    style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', padding: 'var(--space-4)', background: 'var(--bg-elevated)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', transition: 'border-color var(--transition-fast)' }}
                  >
                    <div style={{ color: 'var(--accent-primary)', flexShrink: 0, marginTop: '1px' }}><c.Icon size={16} /></div>
                    <div>
                      <div style={{ fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '2px' }}>{c.label}</div>
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)', lineHeight: 1.4 }}>{c.desc}</div>
                    </div>
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerContainer>
            <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', height: '46px', padding: '0 24px', background: 'var(--color-ink-900)', color: 'white', border: 'none', borderRadius: 'var(--radius-md)', fontSize: 'var(--text-sm)', fontWeight: 700, cursor: 'pointer', transition: 'all var(--transition-base)' }}
              onMouseEnter={e => (e.currentTarget.style.background = 'var(--color-ink-700)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'var(--color-ink-900)')}>
              Build my command center
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2.5 7h9M8 3.5L11.5 7 8 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          </div>
        </Reveal>
        <CommandDashboard />
      </div>
    </div>
    <style>{`.bcc-grid { grid-template-columns: 1fr 1fr; } @media (max-width: 900px) { .bcc-grid { grid-template-columns: 1fr !important; } }`}</style>
  </section>
);

export default BusinessCommandCenter;
