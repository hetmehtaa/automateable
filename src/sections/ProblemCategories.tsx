import React from 'react';
import { motion } from 'framer-motion';
import { StaggerContainer, StaggerItem } from '../components/Reveal';
import { SectionHeader } from '../design-system';

const problems = [
  {
    title: 'Business Operations',
    desc: 'Recurring admin, approvals, handoffs, and internal reporting eating your week.',
    tag: 'Ops',
    color: '#0562EF',
    bg: 'rgba(5,98,239,0.06)',
    border: 'rgba(5,98,239,0.12)',
    svg: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="3" width="8" height="8" rx="2" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="13" y="3" width="8" height="8" rx="2" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="3" y="13" width="8" height="8" rx="2" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M17 13v8M13 17h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    title: 'Sales & CRM',
    desc: 'Leads falling through the cracks. Follow-ups forgotten. Pipeline visibility zero.',
    tag: 'Sales',
    color: '#6366f1',
    bg: 'rgba(99,102,241,0.06)',
    border: 'rgba(99,102,241,0.15)',
    svg: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    title: 'Social Media',
    desc: 'Posting manually, running out of ideas, no system for consistency or repurposing.',
    tag: 'Content',
    color: '#ec4899',
    bg: 'rgba(236,72,153,0.06)',
    border: 'rgba(236,72,153,0.15)',
    svg: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M21 2H3v16h5v4l4-4h5l4-4V2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8 10h8M8 6h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    title: 'Content Creation',
    desc: 'One idea that should become ten pieces of content. Instead it becomes one, if that.',
    tag: 'Content',
    color: '#f97316',
    bg: 'rgba(249,115,22,0.06)',
    border: 'rgba(249,115,22,0.15)',
    svg: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M12 20h9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    title: 'Personal Productivity',
    desc: 'Tasks scattered across apps. No morning briefing. No system. Just chaos and tabs.',
    tag: 'Personal',
    color: '#0562EF',
    bg: 'rgba(5,98,239,0.06)',
    border: 'rgba(5,98,239,0.12)',
    svg: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    title: 'Research & Knowledge',
    desc: 'Hours spent finding, reading, and synthesizing information that could be automated.',
    tag: 'Research',
    color: '#00C2D8',
    bg: 'rgba(0,194,216,0.06)',
    border: 'rgba(0,194,216,0.15)',
    svg: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M11 8v3h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    title: 'Customer Support',
    desc: 'Repetitive questions, slow response times, no routing system or ticket triage.',
    tag: 'Support',
    color: '#22c55e',
    bg: 'rgba(34,197,94,0.06)',
    border: 'rgba(34,197,94,0.15)',
    svg: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8 10h8M8 14h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    title: 'Reporting & Dashboards',
    desc: 'Manually pulling data from five tools every Friday. Same report. Every week.',
    tag: 'Data',
    color: '#6366f1',
    bg: 'rgba(99,102,241,0.06)',
    border: 'rgba(99,102,241,0.15)',
    svg: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M3 9h18M9 21V9" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
  },
  {
    title: 'Security & Compliance',
    desc: 'Manual audit trails, access reviews, and compliance checks that should run themselves.',
    tag: 'Security',
    color: '#f97316',
    bg: 'rgba(249,115,22,0.06)',
    border: 'rgba(249,115,22,0.15)',
    svg: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    title: 'Life Admin',
    desc: 'Finance tracking, travel planning, reminders, and subscriptions, all done manually.',
    tag: 'Personal',
    color: '#ec4899',
    bg: 'rgba(236,72,153,0.06)',
    border: 'rgba(236,72,153,0.15)',
    svg: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9 22V12h6v10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
];

export const ProblemCategories: React.FC = () => (
  <section id="problems" className="section" style={{ background: 'var(--bg-page)' }}>
    <div className="container">
      <div style={{ marginBottom: 'var(--sp-16)' }}>
        <SectionHeader
          eyebrow="Problem Areas"
          title="What kind of problem do you have?"
          subtitle="We work across every domain where manual, repetitive work is costing you time, money, or clarity."
        />
      </div>
      <StaggerContainer style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px' }} className="problems-grid">
        {problems.map(p => (
          <StaggerItem key={p.title}>
            <ProblemCard {...p} />
          </StaggerItem>
        ))}
      </StaggerContainer>
    </div>
    <style>{`
      .problems-grid { grid-template-columns: repeat(5,1fr); }
      @media (max-width: 1200px) { .problems-grid { grid-template-columns: repeat(4,1fr) !important; } }
      @media (max-width: 900px)  { .problems-grid { grid-template-columns: repeat(3,1fr) !important; } }
      @media (max-width: 640px)  { .problems-grid { grid-template-columns: repeat(2,1fr) !important; } }
    `}</style>
  </section>
);

const ProblemCard: React.FC<typeof problems[0]> = ({ title, desc, tag, color, bg, border, svg }) => (
  <motion.div
    whileHover={{ y: -4, boxShadow: `0 16px 40px ${color}18` }}
    style={{
      background: 'white',
      border: `1px solid var(--border)`,
      borderRadius: 'var(--r-20)',
      padding: 'var(--sp-5)',
      cursor: 'default',
      transition: 'border-color 0.2s ease',
      height: '100%',
    }}
    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = border; }}
    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'; }}
  >
    <div style={{ width: '44px', height: '44px', borderRadius: 'var(--r-12)', background: bg, border: `1px solid ${border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color, marginBottom: 'var(--sp-4)', flexShrink: 0 }}>
      {svg}
    </div>
    <div style={{ fontSize: 'var(--text-11)', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color, background: bg, border: `1px solid ${border}`, borderRadius: 'var(--r-full)', padding: '2px 8px', display: 'inline-block', marginBottom: 'var(--sp-3)' }}>{tag}</div>
    <h3 style={{ fontSize: 'var(--text-14)', fontWeight: 700, color: 'var(--c-navy-700)', letterSpacing: 'var(--tracking-snug)', marginBottom: 'var(--sp-2)', lineHeight: 'var(--leading-snug)' }}>{title}</h3>
    <p style={{ fontSize: 'var(--text-12)', color: 'var(--text-secondary)', lineHeight: 'var(--leading-relaxed)', margin: 0 }}>{desc}</p>
  </motion.div>
);

export default ProblemCategories;
