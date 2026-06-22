import React from 'react';
import { motion } from 'framer-motion';
import { Reveal } from '../components/Reveal';
import { SectionHeader } from '../design-system';

const steps = [
  {
    num: '01', title: 'Tell us the problem',
    desc: 'Describe your workflow, bottleneck, or pain point in plain language. No technical jargon needed. The messier the better.',
    output: 'Problem brief',
    status: 'done' as const,
    color: '#0562EF',
  },
  {
    num: '02', title: 'We diagnose the workflow',
    desc: 'We map your current process, identify friction, and find what should be automated, delegated, or redesigned entirely.',
    output: 'Workflow map',
    status: 'done' as const,
    color: '#0562EF',
  },
  {
    num: '03', title: 'We design the blueprint',
    desc: 'A clear architecture showing tools, triggers, agents, and data flows required to solve the problem. Before a single line is written.',
    output: 'Automation blueprint',
    status: 'done' as const,
    color: '#6366f1',
  },
  {
    num: '04', title: 'We build or recommend',
    desc: 'Custom automations, configured tools, or ready-made AI products. Whatever the problem actually requires.',
    output: 'Working system',
    status: 'active' as const,
    color: '#00C2D8',
  },
  {
    num: '05', title: 'You get a repeatable system',
    desc: 'Documented, tested, and measurable. With clear outcomes: time saved, tasks reduced, ROI tracked.',
    output: 'Deployed + docs',
    status: 'pending' as const,
    color: '#22c55e',
  },
];

const PipelineSVG: React.FC = () => (
  <svg viewBox="0 0 600 80" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '80px' }}>
    <defs>
      <linearGradient id="pipeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#0562EF"/>
        <stop offset="60%" stopColor="#6366f1"/>
        <stop offset="100%" stopColor="#00C2D8" stopOpacity="0.4"/>
      </linearGradient>
    </defs>
    {/* Main pipeline track */}
    <rect x="40" y="36" width="520" height="8" rx="4" fill="rgba(5,98,239,0.08)"/>
    <rect x="40" y="36" width="320" height="8" rx="4" fill="url(#pipeGrad)">
      <animate attributeName="width" from="0" to="320" dur="2s" fill="freeze"/>
    </rect>
    {/* Node circles */}
    {[0,1,2,3,4].map(i => {
      const x = 40 + i * 130;
      const active = i < 3;
      const current = i === 3;
      return (
        <g key={i}>
          <circle cx={x} cy="40" r="14" fill={active ? '#0562EF' : current ? 'white' : 'white'} stroke={active ? '#0562EF' : current ? '#00C2D8' : 'rgba(11,16,21,0.12)'} strokeWidth={current ? "2.5" : "1.5"}>
            {current && <animate attributeName="r" values="14;17;14" dur="2s" repeatCount="indefinite"/>}
          </circle>
          {active ? (
            <path d={`M ${x-5} 40 l4 4 7-7`} stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          ) : current ? (
            <circle cx={x} cy="40" r="4" fill="#00C2D8">
              <animate attributeName="opacity" values="1;0.3;1" dur="1.5s" repeatCount="indefinite"/>
            </circle>
          ) : (
            <text x={x} y="44" textAnchor="middle" fontSize="10" fontWeight="700" fill="rgba(11,16,21,0.3)" fontFamily="Inter">{i+1}</text>
          )}
        </g>
      );
    })}
  </svg>
);

export const HowItWorks: React.FC = () => (
  <section id="how-it-works" className="section section--snow">
    <div className="container">
      <div style={{ marginBottom: 'var(--sp-16)' }}>
        <SectionHeader
          eyebrow="Process"
          title="How it works"
          subtitle="A technical pipeline, not a vague checklist. Every step has a clear input, output, and measurable outcome."
        />
      </div>

      {/* SVG Pipeline */}
      <Reveal>
        <div style={{ padding: 'var(--sp-8) var(--sp-6)', background: 'white', border: '1px solid var(--border)', borderRadius: 'var(--r-20)', marginBottom: 'var(--sp-12)', boxShadow: 'var(--sh-sm)', overflow: 'hidden' }}>
          <PipelineSVG />
          <div style={{ display: 'flex', justifyContent: 'space-between', paddingInline: '26px', marginTop: '8px' }}>
            {steps.map(s => (
              <div key={s.num} style={{ textAlign: 'center', flex: 1 }}>
                <div style={{ fontSize: 'var(--text-11)', fontWeight: 700, color: s.status === 'done' ? 'var(--c-blue)' : s.status === 'active' ? '#00C2D8' : 'var(--text-muted)', letterSpacing: '0.04em' }}>{s.title.split(' ')[0]}</div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* Step cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-3)' }}>
        {steps.map((step, i) => (
          <Reveal key={step.num} delay={i * 0.07}>
            <StepCard {...step} index={i} />
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

const StepCard: React.FC<typeof steps[0] & { index?: number }> = ({ num, title, desc, output, status, color }) => {
  const [hov, setHov] = React.useState(false);
  return (
    <motion.div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      whileHover={{ x: 4 }}
      style={{
        display: 'flex', alignItems: 'flex-start', gap: 'var(--sp-6)',
        padding: 'var(--sp-6)', borderRadius: 'var(--r-16)',
        background: hov ? 'white' : 'transparent',
        border: `1px solid ${hov ? 'rgba(5,98,239,0.15)' : 'transparent'}`,
        boxShadow: hov ? 'var(--sh-md)' : 'none',
        transition: 'all 0.2s ease',
      }}
    >
      {/* Number */}
      <div style={{
        width: '48px', height: '48px', borderRadius: '50%', flexShrink: 0,
        background: status === 'done' ? color : status === 'active' ? `${color}15` : 'var(--bg-frost)',
        border: `2px solid ${status === 'done' ? color : status === 'active' ? color : 'var(--border-med)'}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: 'var(--font-mono)', fontSize: 'var(--text-12)', fontWeight: 800,
        color: status === 'done' ? 'white' : status === 'active' ? color : 'var(--text-muted)',
        boxShadow: status === 'active' ? `0 0 0 4px ${color}20` : 'none',
        transition: 'all 0.2s ease',
      }}>
        {status === 'done' ? (
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M4 9l4 4 6-7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        ) : num}
      </div>

      {/* Content */}
      <div style={{ flex: 1, paddingTop: '4px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-3)', flexWrap: 'wrap', marginBottom: 'var(--sp-2)' }}>
          <h3 style={{ fontSize: 'var(--text-16)', fontWeight: 700, color: 'var(--c-navy-700)', letterSpacing: 'var(--tracking-snug)' }}>{title}</h3>
          {status === 'active' && (
            <span style={{ fontSize: 'var(--text-11)', fontWeight: 700, background: 'rgba(0,194,216,0.1)', color: '#0694a2', border: '1px solid rgba(0,194,216,0.25)', borderRadius: 'var(--r-full)', padding: '2px 10px', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              Current
            </span>
          )}
        </div>
        <p style={{ fontSize: 'var(--text-14)', color: 'var(--text-secondary)', lineHeight: 'var(--leading-relaxed)', margin: 0, maxWidth: '560px' }}>{desc}</p>
      </div>

      {/* Output chip */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0, alignSelf: 'center',
        padding: '6px 14px', borderRadius: 'var(--r-full)',
        background: status === 'pending' ? 'var(--bg-frost)' : `${color}10`,
        border: `1px solid ${status === 'pending' ? 'var(--border)' : `${color}25`}`,
        fontSize: 'var(--text-12)', fontWeight: 600,
        color: status === 'pending' ? 'var(--text-muted)' : color,
      }}>
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M1 5h8M6 2l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        {output}
      </div>
    </motion.div>
  );
};

export default HowItWorks;
