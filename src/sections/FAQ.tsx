import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Reveal } from '../components/Reveal';
import { SectionHeader } from '../design-system';

const faqs = [
  { q: 'What kind of problems can you automate?', a: 'Almost anything that involves repetitive steps, data moving between tools, manual reporting, content creation workflows, follow-up sequences, document processing, or recurring admin. If you do the same thing more than once a week and it does not require real-time judgment, it is a candidate for automation.' },
  { q: 'Do I need to know which tools I want?', a: "No. That is what the audit is for. You describe the problem. We figure out which tools, triggers, and systems will actually solve it. Most people come to us knowing what hurts, not what to build." },
  { q: 'Do you build custom AI agents?', a: 'Yes. We build task-specific agents for research, reporting, support, content, operations, and internal workflows. These are agents designed for a specific job in your workflow, not general-purpose chatbots.' },
  { q: 'Is this only for businesses?', a: "No. We work with founders, individual professionals, creators, consultants, and anyone with a chaotic workflow they want to fix. If you are spending more than an hour a week on something repetitive, it is worth a conversation." },
  { q: 'Can you automate social media workflows?', a: 'Yes. We build full content pipelines: from idea capture and research, through drafting and repurposing, to scheduling and analytics summaries. We work with individual creators and teams managing multiple accounts.' },
  { q: 'Do you replace my existing tools?', a: 'Usually no. We connect and orchestrate the tools you already have. The problem is rarely the tools themselves. It is the lack of a system connecting them. We build that system.' },
  { q: 'How does the automation audit work?', a: 'You fill out our intake form describing your workflow, pain points, and current tools. We analyze it, map your process, and deliver a full report within 3-5 business days. The report includes a workflow map, opportunity ranking, tool recommendations, time savings estimates, and an implementation roadmap.' },
  { q: 'What happens after the audit?', a: 'You decide. Some clients take the audit and implement it themselves. Others move into a Build Sprint where we implement the automations. Others start a Retainer for ongoing improvement. The audit is designed to give you clarity regardless of what you do next.' },
  { q: 'Do you offer monthly retainers?', a: 'Yes. Retainers are for businesses and teams that want continuous automation improvement: new workflows, ongoing optimization, AI agent updates, and monthly reporting. Pricing is custom based on scope.' },
  { q: 'Can this work without a backend in the demo?', a: 'Yes. This site is a fully static frontend demo built in React and Vite with no backend. Contact form submissions, tool previews, and dashboard mockups are all frontend-only. A real implementation connects to your chosen backend, CRM, or automation platform.' },
];

export const FAQ: React.FC = () => (
  <section id="faq" className="section section--snow">
    <div className="container container--lg">
      <div style={{ marginBottom: 'var(--sp-16)' }}>
        <SectionHeader
          eyebrow="FAQ"
          title="Straight answers"
          subtitle="If you have a question not listed here, send it through the contact form."
        />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-3)' }}>
        {faqs.map((f, i) => (
          <Reveal key={i} delay={i * 0.04}>
            <FAQItem question={f.q} answer={f.a} />
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

const FAQItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      animate={{ borderColor: open ? 'rgba(5,98,239,0.2)' : 'var(--border)' }}
      style={{ background: 'white', border: '1px solid var(--border)', borderRadius: 'var(--r-16)', overflow: 'hidden', boxShadow: open ? 'var(--sh-md)' : 'var(--sh-xs)' }}
    >
      <button
        onClick={() => setOpen(v => !v)}
        aria-expanded={open}
        style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 'var(--sp-5) var(--sp-6)', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', gap: 'var(--sp-4)' }}
      >
        <span style={{ fontSize: 'var(--text-15)', fontWeight: 600, color: 'var(--c-navy-700)', lineHeight: 'var(--leading-snug)', flex: 1 }}>
          {question}
        </span>
        <motion.div
          animate={{ rotate: open ? 180 : 0, background: open ? 'var(--c-blue)' : 'var(--bg-frost)', borderColor: open ? 'var(--c-blue)' : 'var(--border)' }}
          transition={{ duration: 0.2 }}
          style={{ width: '30px', height: '30px', borderRadius: '50%', flexShrink: 0, border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2 4l4 4 4-4" stroke={open ? 'white' : 'var(--text-muted)'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{ padding: '0 var(--sp-6) var(--sp-5)', borderTop: '1px solid var(--border-soft)' }}>
              <p style={{ fontSize: 'var(--text-14)', color: 'var(--text-secondary)', lineHeight: 'var(--leading-relaxed)', margin: 0, paddingTop: 'var(--sp-4)' }}>
                {answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default FAQ;
