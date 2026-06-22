import React from 'react';
import { motion } from 'framer-motion';
import { Reveal } from '../components/Reveal';
import { SectionHeader } from '../design-system';
import {
  IconZap, IconMonitor, IconBot, IconRepeat, IconTrendingUp, IconTarget,
  IconDatabase, IconSettings, IconGlobe, IconLayers,
} from '../design-system';

const beforeItems = [
  { Icon: IconDatabase,  text: 'Scattered tools with no connection' },
  { Icon: IconSettings,  text: 'Same manual tasks every single week' },
  { Icon: IconLayers,    text: 'No visibility into what actually runs' },
  { Icon: IconGlobe,     text: 'Follow-ups forgotten. Leads gone cold.' },
  { Icon: IconLayers,    text: 'Random content workflow, no system' },
  { Icon: IconSettings,  text: 'Wasted hours on repeatable work' },
];

const afterItems = [
  { Icon: IconZap,        text: 'Automated workflows that run without you',  color: 'var(--color-blue-500)' },
  { Icon: IconMonitor,    text: 'Live dashboards with real-time data',        color: 'var(--color-cyan-400)' },
  { Icon: IconBot,        text: 'AI agents executing routine tasks',          color: 'var(--color-violet-400)' },
  { Icon: IconRepeat,     text: 'Repeatable systems with measurable ROI',     color: 'var(--color-green-400)' },
  { Icon: IconTrendingUp, text: 'Content pipeline running on autopilot',      color: 'var(--color-blue-400)' },
  { Icon: IconTarget,     text: 'Manual effort reduced. Focus reclaimed.',    color: 'var(--color-cyan-500)' },
];

const AfterDashboard: React.FC = () => (
  <div style={{ background: 'var(--color-ink-900)', border: '1px solid var(--color-ink-700)', borderRadius: 'var(--radius-xl)', padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
      <span style={{ fontSize: '11px', fontWeight: 700, color: 'rgba(255,255,255,0.9)', letterSpacing: '0.02em' }}>System Status</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
        <span className="status-dot status-dot--active" />
        <span style={{ fontSize: '10px', fontWeight: 700, color: 'var(--color-cyan-400)', letterSpacing: '0.06em' }}>ALL SYSTEMS LIVE</span>
      </div>
    </div>
    {[
      { name: 'Report Generator', status: 'Running', time: 'Last run: 6:00 AM',  color: 'var(--color-green-400)' },
      { name: 'CRM Sync Agent',   status: 'Active',  time: 'Updated 2 min ago',  color: 'var(--color-cyan-400)' },
      { name: 'Content Pipeline', status: 'Running', time: '3 posts queued',     color: 'var(--color-green-400)' },
      { name: 'Lead Follow-ups',  status: 'Active',  time: '5 sequences live',   color: 'var(--color-cyan-400)' },
      { name: 'Support Triage',   status: 'Running', time: '0 unrouted tickets', color: 'var(--color-green-400)' },
    ].map(item => (
      <div key={item.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 10px', background: 'rgba(255,255,255,0.04)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: item.color, flexShrink: 0 }} />
          <span style={{ fontSize: '11px', fontWeight: 600, color: 'rgba(255,255,255,0.85)' }}>{item.name}</span>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '10px', fontWeight: 700, color: item.color }}>{item.status}</div>
          <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.35)', marginTop: '1px' }}>{item.time}</div>
        </div>
      </div>
    ))}
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '8px', marginTop: '4px' }}>
      {[
        { label: 'Hours Saved', value: '14h/wk' },
        { label: 'Manual Tasks', value: '-87%' },
        { label: 'ROI', value: '4.2x' },
      ].map(m => (
        <div key={m.label} style={{ textAlign: 'center', padding: '8px', background: 'rgba(6,214,240,0.06)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(6,214,240,0.12)' }}>
          <div style={{ fontSize: '14px', fontWeight: 800, color: 'var(--color-cyan-400)', letterSpacing: '-0.02em' }}>{m.value}</div>
          <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600, marginTop: '2px' }}>{m.label}</div>
        </div>
      ))}
    </div>
  </div>
);

export const BeforeAfter: React.FC = () => (
  <section id="before-after" className="section">
    <div className="container" style={{ maxWidth: 'var(--container-xl)' }}>
      <div style={{ marginBottom: 'var(--space-12)' }}>
        <SectionHeader
          eyebrow="Transformation"
          title="Messy problem in. Working system out."
          subtitle="The same business. The same team. Completely different operating reality."
        />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-6)' }} className="ba-grid">
        <Reveal direction="left">
          <div style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-2xl)', padding: 'var(--space-8)', display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: 'var(--space-2)' }}>
              <div style={{ width: '28px', height: '28px', borderRadius: 'var(--radius-md)', background: 'var(--color-red-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-red-500)' }}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
              </div>
              <span style={{ fontSize: 'var(--text-md)', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>Before</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              {beforeItems.map((item, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }} viewport={{ once: true }}
                  style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', padding: 'var(--space-4)', background: 'var(--bg-surface)', border: '1px solid var(--border-soft)', borderRadius: 'var(--radius-lg)' }}>
                  <div style={{ color: 'var(--text-muted)', flexShrink: 0, marginTop: '1px' }}><item.Icon size={16} /></div>
                  <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', lineHeight: 'var(--leading-snug)' }}>{item.text}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </Reveal>
        <Reveal direction="right">
          <div style={{ background: 'var(--color-ink-900)', border: '1px solid var(--color-ink-700)', borderRadius: 'var(--radius-2xl)', padding: 'var(--space-8)', display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: 'var(--space-2)' }}>
              <div style={{ width: '28px', height: '28px', borderRadius: 'var(--radius-md)', background: 'rgba(6,214,240,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-cyan-400)' }}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M1 6l3.5 3.5L11 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <span style={{ fontSize: 'var(--text-md)', fontWeight: 800, color: 'white', letterSpacing: '-0.02em' }}>After</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>
              {afterItems.map((item, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: 12 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }} viewport={{ once: true }}
                  style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', padding: 'var(--space-4)', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 'var(--radius-lg)' }}>
                  <div style={{ color: item.color, flexShrink: 0, marginTop: '1px' }}><item.Icon size={16} /></div>
                  <span style={{ fontSize: 'var(--text-sm)', color: 'rgba(255,255,255,0.75)', lineHeight: 'var(--leading-snug)' }}>{item.text}</span>
                </motion.div>
              ))}
            </div>
            <AfterDashboard />
          </div>
        </Reveal>
      </div>
    </div>
    <style>{`.ba-grid { grid-template-columns: 1fr 1fr; } @media (max-width: 800px) { .ba-grid { grid-template-columns: 1fr !important; } }`}</style>
  </section>
);

export default BeforeAfter;
