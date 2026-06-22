import React from 'react';
import { motion } from 'framer-motion';
import { Reveal, StaggerContainer, StaggerItem } from '../components/Reveal';
import { SectionHeader, Badge } from '../design-system';
import {
  IconZap, IconSearch, IconFileText, IconRepeat,
  IconCalendar, IconBarChart, IconTrendingUp,
  IconBook, IconGlobe, IconMessageSquare,
} from '../design-system';

const pipelineStages = [
  { label: 'Idea',      Icon: IconZap,        desc: 'Capture raw ideas from voice, text, or browsing' },
  { label: 'Research',  Icon: IconSearch,     desc: 'Auto-research angles, trends, and data' },
  { label: 'Draft',     Icon: IconFileText,   desc: 'First draft generated for review' },
  { label: 'Repurpose', Icon: IconRepeat,     desc: 'Split into thread, post, newsletter, script' },
  { label: 'Schedule',  Icon: IconCalendar,   desc: 'Auto-queued across platforms at peak times' },
  { label: 'Analyze',   Icon: IconBarChart,   desc: 'Performance pulled into weekly summary' },
  { label: 'Improve',   Icon: IconTrendingUp, desc: 'Top hooks identified and fed back in' },
];

const automations = [
  { Icon: IconZap,          label: 'Content ideation',       desc: 'Daily idea prompts based on your niche and trends' },
  { Icon: IconFileText,     label: 'Long-form repurposing',  desc: 'One article becomes posts, threads, shorts, and quotes' },
  { Icon: IconCalendar,     label: 'Post scheduling',        desc: 'Queue built and sent without manual uploads' },
  { Icon: IconBarChart,     label: 'Analytics summary',      desc: 'Weekly digest of what worked and why' },
  { Icon: IconTrendingUp,   label: 'Hook testing',           desc: 'A/B hooks generated and tracked automatically' },
  { Icon: IconBook,         label: 'Newsletter generation',  desc: 'Curated digest built from your content and sources' },
  { Icon: IconGlobe,        label: 'Cross-platform sync',    desc: 'One post adapted to every platform format' },
  { Icon: IconMessageSquare,label: 'Engagement tracking',    desc: 'Replies and comments surfaced for quick response' },
];

export const SocialMediaPipeline: React.FC = () => (
  <section id="social" className="section section--surface">
    <div className="container" style={{ maxWidth: 'var(--container-xl)' }}>
      <div style={{ marginBottom: 'var(--space-12)' }}>
        <SectionHeader
          eyebrow="Social Media Automation"
          title="Create once. Ship everywhere."
          subtitle="We build content pipelines that take your ideas from raw thought to published post without you touching a scheduler."
        />
      </div>

      {/* Pipeline visual */}
      <Reveal>
        <div style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-2xl)', padding: 'var(--space-8)', marginBottom: 'var(--space-12)', boxShadow: 'var(--shadow-md)', overflowX: 'auto' }}>
          <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 'var(--space-6)' }}>Content Pipeline</div>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 0, minWidth: '600px' }}>
            {pipelineStages.map((stage, i) => (
              <React.Fragment key={stage.label}>
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-3)', flex: 1 }}
                >
                  <div style={{
                    width: '52px', height: '52px', borderRadius: '50%',
                    background: i === 0 ? 'var(--color-blue-500)' : i < 3 ? 'var(--color-cyan-100)' : 'var(--bg-surface)',
                    border: `2px solid ${i === 0 ? 'var(--color-blue-500)' : i < 3 ? 'var(--color-cyan-300)' : 'var(--border-med)'}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: i === 0 ? 'white' : i < 3 ? 'var(--color-cyan-500)' : 'var(--text-muted)',
                    boxShadow: i === 0 ? '0 0 0 4px var(--color-blue-100)' : 'none',
                  }}>
                    <stage.Icon size={20} />
                  </div>
                  <div style={{ textAlign: 'center', maxWidth: '80px' }}>
                    <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '3px' }}>{stage.label}</div>
                    <div style={{ fontSize: '10px', color: 'var(--text-muted)', lineHeight: 1.4 }}>{stage.desc}</div>
                  </div>
                </motion.div>
                {i < pipelineStages.length - 1 && (
                  <div style={{ height: '2px', flex: 1, alignSelf: 'flex-start', marginTop: '25px', background: i < 2 ? 'linear-gradient(90deg, var(--color-blue-300), var(--color-cyan-300))' : 'var(--border-color)' }} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </Reveal>

      {/* Automations grid */}
      <StaggerContainer style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 'var(--space-4)', marginBottom: 'var(--space-12)' }} className="social-grid">
        {automations.map(a => (
          <StaggerItem key={a.label}>
            <motion.div
              whileHover={{ borderColor: 'var(--color-blue-200)', y: -2, boxShadow: 'var(--shadow-md)' }}
              style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', padding: 'var(--space-5)', background: 'var(--bg-elevated)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-xl)', transition: 'border-color var(--transition-base)' }}
            >
              <div style={{ width: '36px', height: '36px', borderRadius: 'var(--radius-md)', background: 'var(--color-blue-50)', border: '1px solid var(--color-blue-200)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-blue-500)', flexShrink: 0 }}>
                <a.Icon size={16} />
              </div>
              <div>
                <div style={{ fontSize: 'var(--text-sm)', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px' }}>{a.label}</div>
                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{a.desc}</div>
              </div>
            </motion.div>
          </StaggerItem>
        ))}
      </StaggerContainer>

      <div style={{ textAlign: 'center' }}>
        <Badge variant="default">Stop buying tools. Start building systems.</Badge>
        <div style={{ marginTop: 'var(--space-6)' }}>
          <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', height: '46px', padding: '0 24px', background: 'var(--color-ink-900)', color: 'white', border: 'none', borderRadius: 'var(--radius-md)', fontSize: 'var(--text-sm)', fontWeight: 700, cursor: 'pointer', transition: 'all var(--transition-base)' }}
            onMouseEnter={e => (e.currentTarget.style.background = 'var(--color-ink-700)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'var(--color-ink-900)')}>
            Build my content system
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2.5 7h9M8 3.5L11.5 7 8 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        </div>
      </div>
    </div>
    <style>{`
      .social-grid { grid-template-columns: repeat(4,1fr); }
      @media (max-width: 1024px) { .social-grid { grid-template-columns: repeat(2,1fr) !important; } }
      @media (max-width: 560px)  { .social-grid { grid-template-columns: 1fr !important; } }
    `}</style>
  </section>
);

export default SocialMediaPipeline;
