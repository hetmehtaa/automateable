import React from 'react';
import { motion } from 'framer-motion';
import { Reveal } from '../components/Reveal';
import { Badge } from '../design-system';
import {
  IconMap, IconBarChart, IconDatabase, IconClock,
  IconLayout, IconZap,
} from '../design-system';

interface Deliverable {
  Icon: React.FC<{ size?: number; color?: string }>;
  label: string;
  desc: string;
}

const deliverables: Deliverable[] = [
  { Icon: IconMap,      label: 'Workflow map',                 desc: 'Visual diagram of your current process' },
  { Icon: IconBarChart, label: 'Automation opportunity report', desc: 'Ranked list of what to automate first' },
  { Icon: IconDatabase, label: 'Tool stack recommendation',    desc: 'Right tools for your specific workflow' },
  { Icon: IconClock,    label: 'Time & cost savings estimate', desc: 'Projected hours saved per week' },
  { Icon: IconLayout,   label: 'Implementation roadmap',       desc: 'Step-by-step build plan with timeline' },
  { Icon: IconZap,      label: 'Quick-win automations',        desc: 'Things you can fix in under a week' },
];

const auditItems = [
  { label: 'Manual report compilation',  severity: 'high',   saving: '3h/week' },
  { label: 'CRM data entry',             severity: 'high',   saving: '2h/week' },
  { label: 'Email follow-up sequences',  severity: 'medium', saving: '1.5h/week' },
  { label: 'Social media scheduling',    severity: 'medium', saving: '2h/week' },
  { label: 'Invoice processing',         severity: 'low',    saving: '45min/week' },
];

const severityColor: Record<string, { bg: string; text: string; border: string; label: string }> = {
  high:   { bg: 'var(--color-red-100)',   text: 'var(--color-red-500)',   border: 'var(--color-red-100)',   label: 'High priority' },
  medium: { bg: 'var(--color-amber-100)', text: 'var(--color-amber-500)', border: 'var(--color-amber-100)', label: 'Medium' },
  low:    { bg: 'var(--color-green-100)', text: 'var(--color-green-500)', border: 'var(--color-green-100)', label: 'Quick win' },
};

const AuditReportPreview: React.FC = () => (
  <motion.div
    initial={{ opacity: 0, x: 24 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, ease: 'easeOut' }}
    style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-2xl)', boxShadow: 'var(--shadow-xl)', overflow: 'hidden', width: '100%', maxWidth: '520px' }}
  >
    {/* Header */}
    <div style={{ padding: '14px 20px', borderBottom: '1px solid var(--border-soft)', background: 'var(--bg-surface)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div>
        <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>Automation Audit Report</div>
        <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '2px' }}>Generated for: example@company.com</div>
      </div>
      <Badge variant="primary" size="sm">Draft</Badge>
    </div>

    {/* Score row */}
    <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border-soft)', display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '12px' }}>
      {[
        { label: 'Automation Score', value: '34/100', color: 'var(--color-amber-500)', note: 'High opportunity' },
        { label: 'Time Wasted/Week', value: '9.25h',  color: 'var(--color-red-500)',   note: 'Recoverable' },
        { label: 'Quick Wins Found', value: '5',       color: 'var(--color-green-500)', note: 'Start this week' },
      ].map(m => (
        <div key={m.label} style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '18px', fontWeight: 800, color: m.color, letterSpacing: '-0.03em' }}>{m.value}</div>
          <div style={{ fontSize: '9px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: '2px' }}>{m.label}</div>
          <div style={{ fontSize: '9px', color: m.color, fontWeight: 600, marginTop: '2px' }}>{m.note}</div>
        </div>
      ))}
    </div>

    {/* Opportunities */}
    <div style={{ padding: '14px 20px' }}>
      <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '10px' }}>Automation Opportunities</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {auditItems.map((item, i) => {
          const sc = severityColor[item.severity];
          return (
            <motion.div key={i}
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 10px', background: 'var(--bg-surface)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-soft)' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: sc.text, flexShrink: 0 }} />
                <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-primary)' }}>{item.label}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '10px', fontWeight: 700, color: 'var(--color-green-500)' }}>+{item.saving}</span>
                <span style={{ fontSize: '9px', fontWeight: 700, background: sc.bg, color: sc.text, border: `1px solid ${sc.border}`, borderRadius: 'var(--radius-full)', padding: '2px 7px' }}>{sc.label}</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>

    {/* CTA bar */}
    <div style={{ padding: '12px 20px', borderTop: '1px solid var(--border-soft)', background: 'linear-gradient(135deg, var(--color-blue-50), var(--color-cyan-100))', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div>
        <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-blue-700)' }}>Your full roadmap is ready</div>
        <div style={{ fontSize: '10px', color: 'var(--color-blue-400)' }}>6 deliverables included in your audit</div>
      </div>
      <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
        style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-blue-600)', display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer', background: 'none', border: 'none', padding: 0 }}>
        View roadmap
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5h6M5 2l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </button>
    </div>
  </motion.div>
);

export const AuditSection: React.FC = () => (
  <section id="audit" className="section" style={{ background: 'var(--bg-page)' }}>
    <div className="container" style={{ maxWidth: 'var(--container-xl)' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-20)', alignItems: 'center' }} className="audit-grid">
        {/* Left */}
        <Reveal direction="left">
          <div>
            <div style={{ marginBottom: 'var(--space-4)' }}>
              <Badge variant="primary">Automation Audit</Badge>
            </div>
            <h2 style={{ fontSize: 'clamp(var(--text-3xl), 3vw, var(--text-5xl))', fontWeight: 800, letterSpacing: 'var(--tracking-tight)', lineHeight: 'var(--leading-tight)', marginBottom: 'var(--space-5)', color: 'var(--text-primary)' }}>
              Before we build anything,<br />
              <span style={{ background: 'linear-gradient(135deg, var(--color-blue-500), var(--color-cyan-400))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                we map the workflow.
              </span>
            </h2>
            <p style={{ fontSize: 'var(--text-base)', color: 'var(--text-secondary)', lineHeight: 'var(--leading-relaxed)', marginBottom: 'var(--space-8)', maxWidth: '460px' }}>
              Most automation projects fail because they skip diagnosis. We start every engagement with an audit so we know exactly what to build, what to skip, and what will actually save you time.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-3)', marginBottom: 'var(--space-8)' }}>
              {deliverables.map(d => (
                <motion.div key={d.label} whileHover={{ borderColor: 'var(--color-blue-200)' }}
                  style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', padding: 'var(--space-4)', background: 'var(--bg-surface)', border: '1px solid var(--border-soft)', borderRadius: 'var(--radius-lg)', transition: 'border-color var(--transition-fast)' }}>
                  <div style={{ color: 'var(--accent-primary)', flexShrink: 0, marginTop: '1px' }}><d.Icon size={15} /></div>
                  <div>
                    <div style={{ fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '2px' }}>{d.label}</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)', lineHeight: 1.4 }}>{d.desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', height: '50px', padding: '0 28px', background: 'var(--color-ink-900)', color: 'white', border: 'none', borderRadius: 'var(--radius-md)', fontSize: 'var(--text-sm)', fontWeight: 700, cursor: 'pointer', transition: 'all var(--transition-base)', boxShadow: '0 4px 14px rgba(12,14,20,0.2)' }}
              onMouseEnter={e => { (e.currentTarget.style.background = 'var(--color-ink-700)'); (e.currentTarget.style.transform = 'translateY(-1px)'); }}
              onMouseLeave={e => { (e.currentTarget.style.background = 'var(--color-ink-900)'); (e.currentTarget.style.transform = 'none'); }}>
              Start with an Audit
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2.5 7h9M8 3.5L11.5 7 8 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          </div>
        </Reveal>

        {/* Right */}
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <AuditReportPreview />
        </div>
      </div>
    </div>
    <style>{`.audit-grid { grid-template-columns: 1fr 1fr; } @media (max-width: 900px) { .audit-grid { grid-template-columns: 1fr !important; } .audit-grid > div:last-child { justify-content: center !important; } }`}</style>
  </section>
);

export default AuditSection;
