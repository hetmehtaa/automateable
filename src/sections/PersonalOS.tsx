import React from 'react';
import { motion } from 'framer-motion';
import { Reveal, StaggerContainer, StaggerItem } from '../components/Reveal';
import {
  IconZap, IconClock, IconBarChart, IconBook,
  IconCalendar, IconTarget, IconDatabase, IconMail,
} from '../design-system';

interface AutoItem {
  Icon: React.FC<{ size?: number; color?: string }>;
  label: string;
  desc: string;
}

const automations: AutoItem[] = [
  { Icon: IconZap,      label: 'Daily Briefing',    desc: 'Weather, calendar, priorities, and news digest delivered at 7 AM.' },
  { Icon: IconClock,    label: 'Smart Reminders',   desc: 'Context-aware reminders that trigger on time, location, or event.' },
  { Icon: IconBarChart, label: 'Finance Tracker',   desc: 'Transactions auto-categorized. Weekly spend summary to your inbox.' },
  { Icon: IconBook,     label: 'Reading Capture',   desc: 'Save articles, highlights, and ideas into a searchable knowledge base.' },
  { Icon: IconCalendar, label: 'Travel Planning',   desc: 'Flights, hotels, and itineraries compiled and confirmed automatically.' },
  { Icon: IconTarget,   label: 'Habit Tracking',    desc: 'Daily check-ins logged. Progress trends surfaced weekly.' },
  { Icon: IconDatabase, label: 'Knowledge Base',    desc: 'Notes, bookmarks, and research linked and searchable by topic.' },
  { Icon: IconMail,     label: 'Email & Calendar',  desc: 'Inbox triaged. Low-priority filtered. High-priority surfaced.' },
];

const BriefingPreview: React.FC = () => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, ease: 'easeOut' }}
    style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-xl)', padding: '20px', boxShadow: 'var(--shadow-md)', maxWidth: '380px', width: '100%' }}
  >
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
      <div>
        <div style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>Morning Briefing</div>
        <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>Monday, Jun 22 &ndash; 7:00 AM</div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '5px', background: 'var(--color-green-100)', border: '1px solid var(--color-green-100)', borderRadius: 'var(--radius-full)', padding: '3px 10px' }}>
        <span className="status-dot status-dot--live" />
        <span style={{ fontSize: '10px', fontWeight: 700, color: 'var(--color-green-500)' }}>Delivered</span>
      </div>
    </div>

    {[
      { label: 'Weather',       content: '24°C, partly cloudy. No rain this week.' },
      { label: "Today's focus", content: '3 meetings. Proposal due at 3 PM. Follow up with Alex.' },
      { label: 'Top news',      content: '3 articles matching your interests. 1 industry update.' },
      { label: 'Finance',       content: '$340 spent this week. 12% under budget.' },
    ].map(item => (
      <div key={item.label} style={{ padding: '10px 0', borderBottom: '1px solid var(--border-soft)' }}>
        <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '4px' }}>{item.label}</div>
        <div style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{item.content}</div>
      </div>
    ))}

    <div style={{ marginTop: '12px', padding: '10px', background: 'var(--color-blue-50)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-blue-100)' }}>
      <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-blue-600)', marginBottom: '3px' }}>AI Insight</div>
      <div style={{ fontSize: '11px', color: 'var(--color-blue-500)', lineHeight: 1.5 }}>Your most productive hours are 9&ndash;11 AM. Your 3 PM meeting conflicts with your focus block.</div>
    </div>
  </motion.div>
);

export const PersonalOS: React.FC = () => (
  <section id="personal" className="section">
    <div className="container" style={{ maxWidth: 'var(--container-xl)' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-16)', alignItems: 'center' }} className="personal-grid">
        <Reveal direction="left">
          <div>
            <div style={{ marginBottom: 'var(--space-3)' }}>
              <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--accent-primary)' }}>Personal Automation</span>
            </div>
            <h2 style={{ fontSize: 'clamp(var(--text-3xl), 3vw, var(--text-5xl))', fontWeight: 800, letterSpacing: 'var(--tracking-tight)', lineHeight: 'var(--leading-tight)', marginBottom: 'var(--space-5)', color: 'var(--text-primary)' }}>
              Your personal<br />
              <span style={{ background: 'linear-gradient(135deg, var(--color-blue-500), var(--color-cyan-400))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                operating system.
              </span>
            </h2>
            <p style={{ fontSize: 'var(--text-base)', color: 'var(--text-secondary)', lineHeight: 'var(--leading-relaxed)', marginBottom: 'var(--space-8)', maxWidth: '440px' }}>
              Life admin is still admin. We build personal automation systems that keep your day organized, your information current, and your attention on what matters.
            </p>
            <StaggerContainer style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-2)' }}>
              {automations.map(a => (
                <StaggerItem key={a.label}>
                  <AutoItemCard {...a} />
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </Reveal>

        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-start', gap: 'var(--space-4)', flexDirection: 'column' }}>
          <BriefingPreview />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '8px', width: '100%', maxWidth: '380px' }}>
            {[
              { value: '2.5h', label: 'Saved daily' },
              { value: '100%', label: 'Context ready' },
              { value: '0',    label: 'Missed reminders' },
            ].map(m => (
              <div key={m.label} style={{ textAlign: 'center', padding: '12px 8px', background: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)' }}>
                <div style={{ fontSize: 'var(--text-lg)', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.03em' }}>{m.value}</div>
                <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 600, marginTop: '2px' }}>{m.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    <style>{`
      .personal-grid { grid-template-columns: 1fr 1fr; }
      @media (max-width: 900px) {
        .personal-grid { grid-template-columns: 1fr !important; }
        .personal-grid > div:last-child { align-items: flex-start !important; }
      }
    `}</style>
  </section>
);

const AutoItemCard: React.FC<AutoItem> = ({ Icon, label, desc }) => {
  const [hov, setHov] = React.useState(false);
  return (
    <motion.div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      whileHover={{ scale: 1.02 }}
      style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', padding: 'var(--space-4)', borderRadius: 'var(--radius-lg)', background: hov ? 'var(--bg-surface)' : 'transparent', border: `1px solid ${hov ? 'var(--border-color)' : 'transparent'}`, transition: 'all var(--transition-fast)', cursor: 'default' }}
    >
      <div style={{ color: hov ? 'var(--accent-primary)' : 'var(--text-muted)', flexShrink: 0, marginTop: '2px', transition: 'color var(--transition-fast)' }}>
        <Icon size={15} />
      </div>
      <div>
        <div style={{ fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '2px' }}>{label}</div>
        <div style={{ fontSize: '11px', color: 'var(--text-muted)', lineHeight: 1.4 }}>{desc}</div>
      </div>
    </motion.div>
  );
};

export default PersonalOS;
