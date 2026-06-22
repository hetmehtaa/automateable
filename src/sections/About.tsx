import React from 'react';
import { motion } from 'framer-motion';
import { Reveal, StaggerContainer, StaggerItem } from '../components/Reveal';
import { IconTarget, IconCpu, IconPackage, IconLayout } from '../design-system';

const pillars = [
  { Icon: IconTarget,  title: 'Consulting firm',    desc: 'We diagnose before we prescribe. Every engagement starts with understanding the actual problem.' },
  { Icon: IconCpu,     title: 'Automation lab',     desc: 'We build real systems using real tools. Not slide decks. Not strategy docs. Working automations.' },
  { Icon: IconPackage, title: 'AI product studio',  desc: 'We build and maintain our own AI tools. Use them directly or as part of a custom engagement.' },
  { Icon: IconLayout,  title: 'Workflow partner',   desc: 'We embed in your operations and architect the systems layer that keeps everything running.' },
];

const beliefs = [
  "Most people don't need more apps. They need better systems.",
  "Automation without diagnosis is just expensive technical debt.",
  "The best systems are invisible. You just stop doing the manual work.",
  "A workflow that works is worth more than a tool that impresses.",
];

export const About: React.FC = () => (
  <section id="about" className="section section--surface">
    <div className="container" style={{ maxWidth: 'var(--container-xl)' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-20)', alignItems: 'start' }} className="about-grid">
        <Reveal>
          <div>
            <div style={{ marginBottom: 'var(--space-3)' }}>
              <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--accent-primary)' }}>About</span>
            </div>
            <h2 style={{ fontSize: 'clamp(var(--text-3xl), 3vw, var(--text-5xl))', fontWeight: 800, letterSpacing: 'var(--tracking-tight)', lineHeight: 'var(--leading-tight)', marginBottom: 'var(--space-6)', color: 'var(--text-primary)' }}>
              Part consulting firm.<br />Part automation lab.<br />
              <span style={{ background: 'linear-gradient(135deg, var(--color-blue-500), var(--color-cyan-400))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Part AI product studio.
              </span>
            </h2>
            <p style={{ fontSize: 'var(--text-base)', color: 'var(--text-secondary)', lineHeight: 'var(--leading-relaxed)', marginBottom: 'var(--space-6)' }}>
              We started automateable because we kept seeing the same problem: smart people and capable businesses drowning in manual work that had no business being manual.
            </p>
            <p style={{ fontSize: 'var(--text-base)', color: 'var(--text-secondary)', lineHeight: 'var(--leading-relaxed)', marginBottom: 'var(--space-8)' }}>
              The tools existed. The AI was there. But nobody had put it together into a system that actually worked for the specific workflow, the specific team, the specific problem.
            </p>
            <div style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-xl)', padding: 'var(--space-6)' }}>
              <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 'var(--space-4)' }}>What we believe</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                {beliefs.map((b, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    <span style={{ color: 'var(--color-blue-500)', fontWeight: 700, fontSize: 'var(--text-sm)', flexShrink: 0, marginTop: '2px' }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', lineHeight: 'var(--leading-relaxed)' }}>{b}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        <StaggerContainer style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          {pillars.map(p => (
            <StaggerItem key={p.title}>
              <PillarCard {...p} />
            </StaggerItem>
          ))}
          <StaggerItem>
            <div style={{ padding: 'var(--space-6)', background: 'var(--color-ink-900)', border: '1px solid var(--color-ink-700)', borderRadius: 'var(--radius-xl)' }}>
              <div style={{ fontSize: 'var(--text-lg)', fontWeight: 800, color: 'white', letterSpacing: '-0.02em', lineHeight: 'var(--leading-snug)', marginBottom: 'var(--space-3)' }}>
                "Send the messy version.<br />We'll map the system."
              </div>
              <div style={{ fontSize: 'var(--text-sm)', color: 'rgba(255,255,255,0.5)' }}>
                We've heard every version of "our workflow is complicated." That's fine. Complicated is our job.
              </div>
            </div>
          </StaggerItem>
        </StaggerContainer>
      </div>
    </div>
    <style>{`
      .about-grid { grid-template-columns: 1fr 1fr; }
      @media (max-width: 900px) { .about-grid { grid-template-columns: 1fr !important; } }
    `}</style>
  </section>
);

const PillarCard: React.FC<{ Icon: React.FC<{ size?: number; color?: string }>; title: string; desc: string }> = ({ Icon, title, desc }) => {
  const [hov, setHov] = React.useState(false);
  return (
    <motion.div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      whileHover={{ y: -2 }}
      style={{
        display: 'flex', alignItems: 'flex-start', gap: 'var(--space-4)',
        padding: 'var(--space-5)', background: 'var(--bg-elevated)',
        border: `1px solid ${hov ? 'var(--color-blue-200)' : 'var(--border-color)'}`,
        borderRadius: 'var(--radius-xl)', transition: 'border-color var(--transition-base)',
        boxShadow: hov ? 'var(--shadow-md)' : 'var(--shadow-xs)',
      }}
    >
      <div style={{
        width: '40px', height: '40px', borderRadius: 'var(--radius-lg)',
        background: hov ? 'var(--color-blue-50)' : 'var(--bg-surface)',
        border: `1px solid ${hov ? 'var(--color-blue-200)' : 'var(--border-soft)'}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: hov ? 'var(--color-blue-500)' : 'var(--text-muted)',
        flexShrink: 0, transition: 'all var(--transition-base)',
      }}>
        <Icon size={18} />
      </div>
      <div>
        <div style={{ fontSize: 'var(--text-base)', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px', letterSpacing: '-0.01em' }}>{title}</div>
        <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', lineHeight: 'var(--leading-relaxed)' }}>{desc}</div>
      </div>
    </motion.div>
  );
};

export default About;
