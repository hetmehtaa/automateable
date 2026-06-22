import React, { useState } from 'react';
import { SectionHeader } from '../design-system';

interface UseCase {
  id: string;
  label: string;
  icon: string;
  headline: string;
  desc: string;
  problems: string[];
  automations: string[];
  outcome: string;
}

const cases: UseCase[] = [
  {
    id: 'founder',
    label: 'Founders',
    icon: '\u{1F4BC}',
    headline: 'Turn scattered tasks into a founder command center.',
    desc: "You're context-switching between 12 tools, checking Slack every 10 minutes, and manually building your own reports. That's not running a company. That's operating a filing system.",
    problems: ['No single view of the business', 'Repetitive weekly reporting', 'Manual lead tracking', 'Meeting notes lost in Notion'],
    automations: ['Auto-generated weekly business digest', 'CRM pipeline updated from email', 'Meeting notes to action items to assigned tasks', 'Revenue dashboard that updates itself'],
    outcome: 'One view. Everything running. You just decide.',
  },
  {
    id: 'creator',
    label: 'Creators',
    icon: '\u{1F3AC}',
    headline: 'Turn one idea into posts, threads, newsletters, scripts, and reports.',
    desc: "You have the ideas. You're losing hours turning each one into content manually. Distribution is painful. Repurposing feels like starting over every time.",
    problems: ['One piece of content takes 4 hours', 'Platform-specific formatting is tedious', 'No consistent publishing rhythm', 'Analytics from five different places'],
    automations: ['One idea to posts, thread, newsletter, short video script', 'Auto-scheduled content calendar', 'Performance summary delivered Monday morning', 'Engagement triggers to repurpose top performers'],
    outcome: 'Create once. Ship everywhere. Measure automatically.',
  },
  {
    id: 'business',
    label: 'Small Business',
    icon: '\u{1F3E2}',
    headline: 'Automate lead capture, follow-ups, support, reporting, and admin.',
    desc: "Your team is spending half its time on work that a system could handle. Leads go cold. Reports are late. Support tickets stack up. Invoices take days.",
    problems: ['Leads not followed up in time', 'Customer emails answered manually', 'Monthly reports built by hand', 'Invoice and doc processing is slow'],
    automations: ['Lead capture to instant CRM entry + follow-up sequence', 'Support triage with auto-responses and routing', 'Monthly reports generated and sent automatically', 'Document extraction and invoice matching'],
    outcome: 'Less manual execution. More actual business.',
  },
  {
    id: 'professional',
    label: 'Professionals',
    icon: '\u{1F4BC}',
    headline: 'Automate research, emails, notes, reminders, and decision tracking.',
    desc: "Your work requires focus and judgment. Not copy-pasting data, formatting reports, or hunting down emails. Every hour on admin is an hour not spent on the actual work.",
    problems: ['Research takes all morning', 'Email inbox is unmanaged', 'Notes and knowledge scattered', 'No system for decisions and actions'],
    automations: ['Research to briefing doc in minutes', 'Email triage and smart draft suggestions', 'Notes captured and linked to projects', 'Decision log updated automatically'],
    outcome: 'Think more. Process less.',
  },
  {
    id: 'team',
    label: 'Teams',
    icon: '\u{1F465}',
    headline: 'Build shared workflows that reduce manual handoffs.',
    desc: "Work falls through the cracks between people. Status updates require a meeting. Onboarding is re-explained every time. No one knows what's actually done.",
    problems: ['Handoffs require Slack messages', 'No standard process for common tasks', 'Onboarding takes 2 weeks to explain', 'Status reports built manually'],
    automations: ['Task triggers auto-assigned on completion', 'SOPs generated and maintained in docs', 'Onboarding checklists run automatically', 'Status digest posted to Slack every morning'],
    outcome: "Everyone knows what's happening. Work moves itself.",
  },
];

export const UseCases: React.FC = () => {
  const [active, setActive] = useState('founder');
  const current = cases.find(c => c.id === active)!;

  return (
    <section id="use-cases" className="section section--surface">
      <div className="container" style={{ maxWidth: 'var(--container-xl)' }}>
        <div style={{ marginBottom: 'var(--space-12)' }}>
          <SectionHeader
            eyebrow="Use Cases"
            title="Built for how you actually work"
            subtitle="Different problems. Different workflows. Same approach: understand the mess, build the system."
          />
        </div>

        {/* Tab bar */}
        <div style={{ display: 'flex', gap: 'var(--space-2)', justifyContent: 'center', flexWrap: 'wrap', marginBottom: 'var(--space-10)' }}>
          {cases.map(c => (
            <button
              key={c.id}
              onClick={() => setActive(c.id)}
              style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                height: '40px', padding: '0 18px',
                background: active === c.id ? 'var(--color-ink-900)' : 'var(--bg-elevated)',
                color: active === c.id ? 'white' : 'var(--text-secondary)',
                border: `1px solid ${active === c.id ? 'var(--color-ink-900)' : 'var(--border-color)'}`,
                borderRadius: 'var(--radius-full)',
                fontSize: 'var(--text-sm)', fontWeight: 600, cursor: 'pointer',
                transition: 'all var(--transition-fast)',
              }}
              onMouseEnter={e => { if (active !== c.id) (e.currentTarget.style.borderColor = 'var(--border-med)'); }}
              onMouseLeave={e => { if (active !== c.id) (e.currentTarget.style.borderColor = 'var(--border-color)'); }}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Content panel */}
        <div
          key={active}
          style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-10)',
            background: 'var(--bg-elevated)', border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-2xl)', padding: 'var(--space-10)',
            boxShadow: 'var(--shadow-md)',
            animation: 'fadeIn 0.3s ease',
          }}
          className="use-case-grid"
        >
          <div>
            <h3 style={{
              fontSize: 'clamp(var(--text-xl), 2vw, var(--text-3xl))',
              fontWeight: 800, color: 'var(--text-primary)',
              letterSpacing: 'var(--tracking-tight)', lineHeight: 'var(--leading-snug)',
              marginBottom: 'var(--space-4)',
            }}>
              {current.headline}
            </h3>
            <p style={{
              fontSize: 'var(--text-base)', color: 'var(--text-secondary)',
              lineHeight: 'var(--leading-relaxed)', marginBottom: 'var(--space-6)',
            }}>
              {current.desc}
            </p>
            <div style={{
              padding: 'var(--space-4)',
              background: 'var(--color-blue-50)', border: '1px solid var(--color-blue-200)',
              borderRadius: 'var(--radius-lg)',
            }}>
              <div style={{
                fontSize: 'var(--text-xs)', fontWeight: 700, letterSpacing: '0.08em',
                textTransform: 'uppercase', color: 'var(--color-blue-500)', marginBottom: '6px',
              }}>Outcome</div>
              <div style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--color-blue-700)' }}>
                {current.outcome}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <ProblemVsAutomation problems={current.problems} automations={current.automations} />
          </div>
        </div>
      </div>

      <style>{`
        .use-case-grid { grid-template-columns: 1fr 1fr; }
        @media (max-width: 800px) {
          .use-case-grid { grid-template-columns: 1fr !important; padding: var(--space-6) !important; }
        }
      `}</style>
    </section>
  );
};

const ProblemVsAutomation: React.FC<{ problems: string[]; automations: string[] }> = ({ problems, automations }) => (
  <>
    <div>
      <div style={{
        fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase',
        color: 'var(--color-red-500)', marginBottom: '10px',
      }}>
        Current pain points
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {problems.map(p => (
          <div key={p} style={{
            display: 'flex', alignItems: 'flex-start', gap: '8px',
            padding: '8px 12px',
            background: 'var(--color-red-100)', borderRadius: 'var(--radius-md)',
            border: '1px solid rgba(220,38,38,0.1)',
          }}>
            <span style={{ fontSize: '12px', flexShrink: 0, marginTop: '1px', color: 'var(--color-red-500)' }}>&#x2715;</span>
            <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-red-500)', fontWeight: 500 }}>{p}</span>
          </div>
        ))}
      </div>
    </div>

    <div>
      <div style={{
        fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase',
        color: 'var(--color-green-500)', marginBottom: '10px',
      }}>
        After automation
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {automations.map(a => (
          <div key={a} style={{
            display: 'flex', alignItems: 'flex-start', gap: '8px',
            padding: '8px 12px',
            background: 'var(--color-green-100)', borderRadius: 'var(--radius-md)',
            border: '1px solid rgba(5,150,105,0.1)',
          }}>
            <span style={{ fontSize: '12px', flexShrink: 0, marginTop: '1px', color: 'var(--color-green-500)' }}>&#x2713;</span>
            <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-green-500)', fontWeight: 500 }}>{a}</span>
          </div>
        ))}
      </div>
    </div>
  </>
);

export default UseCases;
