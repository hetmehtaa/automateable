import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { PageLayout } from '../components/PageLayout';
import { Footer } from '../sections/Footer';

const personas = [
  {
    id: 'founder',
    role: 'The Founder / CEO',
    company: 'Series A startup, 8-25 people',
    tagline: 'Running the business shouldn\'t mean running every system in it.',
    avatar: 'F',
    color: 'var(--blue)',
    day: [
      { time: '07:30', act: 'Manually compile weekly metrics from Stripe, HubSpot, and Google Analytics into a spreadsheet for the team standup.' },
      { time: '09:00', act: 'Three Slack threads asking where the latest investor deck lives. Spend 20 minutes finding and resending files.' },
      { time: '10:30', act: 'Jump into a sales call that was booked manually after a lead emailed directly â no CRM entry yet.' },
      { time: '12:00', act: 'Review 14 "FYI" emails that should have been handled by someone else. Write 6 responses that are templates at this point.' },
      { time: '14:00', act: 'Quarterly board update prep: 4 hours pulling data that should update automatically.' },
      { time: '17:00', act: 'Realize three follow-up emails to warm leads were never sent. The week slipped.' },
    ],
    problems: [
      'No single view of business health â data lives in 6 tools',
      'Repetitive reporting that takes half a day every week',
      'Leads falling through gaps between email and CRM',
      'Meeting prep is manual assembly, not decision-making',
      'Onboarding new hires takes a week of ad-hoc explanation',
      'Revenue forecasting done in a spreadsheet updated by hand',
    ],
    timeWasted: '12-18 hours/week',
    automations: [
      { fix: 'Automated weekly business digest', result: 'Revenue, pipeline, support, and team metrics delivered at 7am every Monday. Zero assembly time.' },
      { fix: 'CRM auto-capture from email + LinkedIn', result: 'Every lead conversation entered automatically. Pipeline always current.' },
      { fix: 'Board report generator', result: 'Quarterly data pulled from all sources and formatted in 3 minutes, not 4 hours.' },
      { fix: 'Follow-up sequence automation', result: 'Warm leads get timed follow-ups. No leads go cold.' },
      { fix: 'Onboarding workflow', result: 'New hire gets checklist, access, and context automatically on Day 1.' },
    ],
    outcome: 'Founders using our systems recover an average of 14 hours per week â the equivalent of nearly two full workdays.',
    cta: '/audit',
    ctaLabel: 'Map my workflow',
  },
  {
    id: 'creator',
    role: 'The Content Creator',
    company: 'Solo creator or small content team, 5K-200K audience',
    tagline: 'You have the ideas. You keep losing them to production friction.',
    avatar: 'C',
    color: '#7c3aed',
    day: [
      { time: '08:00', act: 'Write a strong LinkedIn post idea in the shower. By the time you open Notion it\'s half-gone.' },
      { time: '09:30', act: 'Spend 90 minutes reformatting a YouTube script into a newsletter â same content, completely manual work.' },
      { time: '11:00', act: 'Research five competing angles for a piece. Open 12 tabs. Synthesize nothing. Brain fried.' },
      { time: '13:00', act: 'Upload the same video clip to YouTube, then TikTok, then Instagram Reels. Manually. Three separate uploads, three sets of captions.' },
      { time: '15:00', act: 'Check analytics across four platforms. No unified view. Spend 45 minutes copy-pasting numbers into a tracker.' },
      { time: '17:30', act: 'Content calendar is three weeks behind. Posting has been inconsistent. Audience growth has stalled.' },
    ],
    problems: [
      'Ideas captured inconsistently â most are lost before execution',
      'One piece of content takes 4-6 hours when it should take 60 minutes',
      'No repurposing system â every format starts from scratch',
      'Publishing is manual and often skipped when busy',
      'No clear picture of what content actually performs',
      'Newsletter, social, and video are siloed workflows',
    ],
    timeWasted: '15-25 hours/week on production, not creation',
    automations: [
      { fix: 'Idea capture system', result: 'Voice memo or quick note automatically organized into a content brief with angles, hooks, and research prompts.' },
      { fix: 'Repurposing pipeline', result: 'One long-form piece automatically becomes LinkedIn post, X thread, newsletter section, and short-form script.' },
      { fix: 'Research agent', result: 'Brief a topic in 2 lines. Receive a synthesized research doc with sources in 10 minutes.' },
      { fix: 'Multi-platform scheduler', result: 'Content queued and published across all platforms from one submission.' },
      { fix: 'Weekly performance briefing', result: 'Every Monday: which posts performed, which hooks worked, what to double down on.' },
    ],
    outcome: 'Creators using our systems ship 3x more content in the same time â and the quality goes up because they spend time creating, not formatting.',
    cta: '/services',
    ctaLabel: 'See content automation',
  },
  {
    id: 'operator',
    role: 'The Operations Manager',
    company: 'SMB, 20-150 employees, no dedicated ops tech team',
    tagline: 'You\'re the system. That\'s the problem.',
    avatar: 'O',
    color: 'var(--green)',
    day: [
      { time: '08:30', act: 'Three Slack messages asking for the status of last week\'s report. It\'s in your head, not in a system.' },
      { time: '09:15', act: 'Manually update the project tracker because no one else has the access or the habit.' },
      { time: '10:00', act: 'Chase three approvals that were supposed to happen yesterday. They\'re still in someone\'s inbox.' },
      { time: '11:30', act: 'Generate the weekly ops report. Pull from four tools, format in Google Sheets, paste into Slides.' },
      { time: '14:00', act: 'New employee starts tomorrow. Spend two hours writing the onboarding checklist that is identical to last time.' },
      { time: '16:00', act: 'Customer support ticket escalated because no routing rule caught it. Manually reassign and apologize.' },
    ],
    problems: [
      'Processes live in people\'s heads, not documented systems',
      'Approvals happen in Slack/WhatsApp with no audit trail',
      'Weekly reporting is a 3-hour manual assembly job',
      'Onboarding is reinvented every single hire',
      'Support tickets routed by whoever notices them first',
      'No visibility into what is actually running vs. broken',
    ],
    timeWasted: '10-15 hours/week on coordination and reporting',
    automations: [
      { fix: 'Process documentation system', result: 'Every SOP captured in structured format, version-controlled, searchable.' },
      { fix: 'Approval workflow automation', result: 'Requests automatically routed to the right approver with deadline, context, and escalation path.' },
      { fix: 'Weekly ops report generator', result: 'Every Friday: automated report from all sources, formatted, and delivered to stakeholders.' },
      { fix: 'Onboarding workflow template', result: 'New hire triggers: access provisioned, checklist delivered, buddy assigned, 30/60/90 plan sent.' },
      { fix: 'Support triage agent', result: 'Incoming tickets categorized, prioritized, and assigned by content â not by whoever is watching.' },
    ],
    outcome: 'Operations teams using our systems reduce coordination overhead by 60% and recover visibility into their own workflows within the first two weeks.',
    cta: '/audit',
    ctaLabel: 'Start an ops audit',
  },
  {
    id: 'consultant',
    role: 'The Independent Consultant',
    company: 'Solo practitioner or boutique firm, client-facing work',
    tagline: 'You charge for your expertise. You shouldn\'t be spending it on admin.',
    avatar: 'K',
    color: 'var(--amber)',
    day: [
      { time: '08:00', act: 'Invoice three clients manually. Copy previous invoice, update numbers, save as PDF, email. 45 minutes.' },
      { time: '09:00', act: 'Prep for a client call: dig through three email threads, two Notion docs, and a Slack DM history to remember context.' },
      { time: '10:30', act: 'Client meeting. Good. Now write notes, extract action items, and send a follow-up summary by EOD.' },
      { time: '13:00', act: 'Proposal for a new client. Build from scratch because the last proposal is in a folder somewhere.' },
      { time: '15:00', act: 'Two research tasks a client asked for. Three hours of browser tabs, synthesized into a report.' },
      { time: '17:30', act: 'Send three overdue follow-up emails that were supposed to go out last week. Hope they are not already gone.' },
    ],
    problems: [
      'Admin (invoicing, proposals, follow-ups) eats 20-30% of billable time',
      'Client context scattered across email, Slack, Notion, and memory',
      'Research is slow and synthesis is manual',
      'Proposals built from scratch every engagement',
      'No systematic follow-up â leads and opportunities slip',
      'Meeting notes rarely become searchable action items',
    ],
    timeWasted: '8-12 hours/week on non-billable admin',
    automations: [
      { fix: 'Automated invoicing', result: 'Invoice generated from tracked time or project milestone and sent automatically. PDF, email, follow-up included.' },
      { fix: 'Client context dashboard', result: 'Before every client meeting: auto-brief with last interaction, open items, and key context.' },
      { fix: 'Research agent', result: 'Topic brief in â synthesized research report out in minutes, not hours.' },
      { fix: 'Proposal generator', result: 'Fill a short intake form â proposal draft ready in 10 minutes using your proven structure.' },
      { fix: 'Follow-up system', result: 'Every meeting creates scheduled follow-ups. Nothing falls through gaps.' },
    ],
    outcome: 'Consultants using our systems convert 10-12 hours of admin per week into either billable hours or actual rest.',
    cta: '/contact',
    ctaLabel: 'Tell us your workflow',
  },
  {
    id: 'smb',
    role: 'The Small Business Owner',
    company: 'Local or online business, 5-30 employees, owner-led',
    tagline: 'You started the business to build something. Not to run a data entry operation.',
    avatar: 'B',
    color: '#0891b2',
    day: [
      { time: '08:00', act: 'Check three inboxes: main email, support@, and the contact form. Some overlap. Some fall through.' },
      { time: '09:30', act: 'A new lead came in last night. Manually create a CRM entry, send an intro email, schedule a follow-up reminder.' },
      { time: '11:00', act: 'Social media: write, format, and post manually to three platforms. No strategy, just survival.' },
      { time: '13:00', act: 'Customer asked for an invoice from three months ago. 20 minutes to find and resend it.' },
      { time: '15:00', act: 'Monthly bookkeeping: match transactions manually to categories. Two hours minimum.' },
      { time: '17:00', act: 'Realize a customer support ticket was missed. The customer has already left a bad review.' },
    ],
    problems: [
      'Lead follow-up is inconsistent â first to reply wins and it\'s not always you',
      'Customer support happens in email, WhatsApp, and Instagram DMs â no single view',
      'Bookkeeping and invoicing consume significant owner time',
      'Social media is an afterthought, not a system',
      'No visibility into which marketing channels are actually working',
      'Reporting requires manual compilation every month',
    ],
    timeWasted: '15-20 hours/week on tasks that systems should handle',
    automations: [
      { fix: 'Lead capture and follow-up system', result: 'Every lead from every source enters one CRM automatically. Follow-up sequence starts within 5 minutes.' },
      { fix: 'Unified support inbox', result: 'Email, WhatsApp, Instagram DMs, and contact forms routed to one place with auto-triage.' },
      { fix: 'Bookkeeping automation', result: 'Transactions categorized automatically. Monthly report ready without manual work.' },
      { fix: 'Social media pipeline', result: 'Content planned, repurposed, and scheduled in one system. Post consistently without daily effort.' },
      { fix: 'Monthly business summary', result: 'Every first Monday: automated report on revenue, leads, support volume, and channel performance.' },
    ],
    outcome: 'Small business owners using our systems spend time on their business, not in it â recovering 15+ hours per week to focus on growth.',
    cta: '/audit',
    ctaLabel: 'Book a business audit',
  },
];

export const PersonasPage: React.FC = () => {
  const [active, setActive] = useState(personas[0].id);
  const p = personas.find(x => x.id === active)!;

  return (
    <PageLayout title="Who We Work With">
      {/* Header */}
      <section style={{ background: 'var(--paper)', borderBottom: '1px solid var(--border)', padding: 'clamp(56px,8vw,96px) 0 clamp(32px,4vw,48px)' }}>
        <div className="w">
          <div className="label" style={{ marginBottom: 16 }}>Who we work with</div>
          <h1 style={{ fontSize: 'clamp(var(--f40),6vw,var(--f72))', fontWeight: 900, letterSpacing: '-0.05em', lineHeight: 1.0, color: 'var(--ink-0)', marginBottom: 20, maxWidth: 720 }}>
            Real people. Real workflows.<br />
            <span className="g-text-blue">Real time being wasted.</span>
          </h1>
          <p style={{ fontSize: 'var(--f16)', color: 'var(--ink-2)', maxWidth: 560, lineHeight: 1.7 }}>
            We have mapped hundreds of workflows across these five personas. The problems are specific. The solutions are too. Pick the one that sounds like you.
          </p>
        </div>
      </section>

      {/* Persona selector */}
      <section style={{ background: 'white', borderBottom: '1px solid var(--border)', position: 'sticky', top: 'var(--topbar-h)', zIndex: 50 }}>
        <div className="w" style={{ paddingBlock: 0, overflowX: 'auto' }}>
          <div style={{ display: 'flex', gap: 0, minWidth: 'max-content' }}>
            {personas.map(ps => (
              <button key={ps.id} onClick={() => setActive(ps.id)}
                aria-pressed={active === ps.id}
                style={{ padding: '14px 20px', background: 'none', border: 'none', borderBottom: `2px solid ${active === ps.id ? ps.color : 'transparent'}`, cursor: 'pointer', fontSize: 'var(--f13)', fontWeight: active === ps.id ? 700 : 500, color: active === ps.id ? 'var(--ink-0)' : 'var(--ink-3)', transition: 'all 0.15s', whiteSpace: 'nowrap' }}>
                {ps.role.split(' / ')[0].replace('The ', '')}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Content */}
      <AnimatePresence mode="wait">
        <motion.div key={active} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.22 }}>

          {/* Persona header */}
          <section style={{ background: 'var(--paper)', borderBottom: '1px solid var(--border)', padding: 'clamp(40px,5vw,64px) 0' }}>
            <div className="w">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(32px,5vw,64px)', alignItems: 'center' }} className="persona-header">
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                    <div style={{ width: 48, height: 48, borderRadius: '50%', background: p.color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 'var(--f18)', fontWeight: 800, flexShrink: 0 }}>{p.avatar}</div>
                    <div>
                      <div style={{ fontSize: 'var(--f16)', fontWeight: 700, color: 'var(--ink-0)' }}>{p.role}</div>
                      <div style={{ fontSize: 'var(--f13)', color: 'var(--ink-3)' }}>{p.company}</div>
                    </div>
                  </div>
                  <h2 style={{ fontSize: 'clamp(var(--f24),3vw,var(--f40))', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1.1, color: 'var(--ink-0)', marginBottom: 16 }}>{p.tagline}</h2>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 14px', background: 'rgba(220,38,38,0.06)', border: '1px solid rgba(220,38,38,0.15)', borderRadius: 'var(--r-full)' }}>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><circle cx="6" cy="6" r="5" stroke="var(--red)" strokeWidth="1.2"/><path d="M6 3.5v3" stroke="var(--red)" strokeWidth="1.3" strokeLinecap="round"/><circle cx="6" cy="9" r="0.75" fill="var(--red)"/></svg>
                    <span style={{ fontFamily: 'var(--mono)', fontSize: 'var(--f11)', color: 'var(--red)', fontWeight: 600 }}>{p.timeWasted} wasted on manual work</span>
                  </div>
                </div>
                <div style={{ background: 'white', border: '1px solid var(--border-2)', borderRadius: 'var(--r-12)', padding: 20 }}>
                  <div className="label" style={{ marginBottom: 12 }}>Core problems</div>
                  {p.problems.map((prob, i) => (
                    <div key={i} style={{ display: 'flex', gap: 10, padding: '8px 0', borderBottom: i < p.problems.length - 1 ? '1px solid var(--border)' : 'none' }}>
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0, marginTop: 2 }}><circle cx="7" cy="7" r="6" stroke="var(--amber)" strokeWidth="1.2"/><path d="M7 4v3.5" stroke="var(--amber)" strokeWidth="1.3" strokeLinecap="round"/><circle cx="7" cy="10" r="0.8" fill="var(--amber)"/></svg>
                      <span style={{ fontSize: 'var(--f13)', color: 'var(--ink-1)', lineHeight: 1.5 }}>{prob}</span>
                    </div>
                  ))}
                </div>
                <style>{`.persona-header{grid-template-columns:1fr 1fr}@media(max-width:800px){.persona-header{grid-template-columns:1fr!important}}`}</style>
              </div>
            </div>
          </section>

          {/* Day in the life */}
          <section style={{ background: 'white', borderBottom: '1px solid var(--border)', padding: 'clamp(48px,6vw,80px) 0' }}>
            <div className="w">
              <div className="label" style={{ marginBottom: 24 }}>A day in the life</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 0, maxWidth: 720 }}>
                {p.day.map((item, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -8 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                    style={{ display: 'flex', gap: 20, padding: '14px 0', borderBottom: '1px solid var(--border)' }}>
                    <span style={{ fontFamily: 'var(--mono)', fontSize: 'var(--f12)', color: 'var(--ink-4)', width: 44, flexShrink: 0, paddingTop: 2 }}>{item.time}</span>
                    <span style={{ fontSize: 'var(--f14)', color: 'var(--ink-1)', lineHeight: 1.6 }}>{item.act}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Automation fixes */}
          <section style={{ background: 'var(--paper)', borderBottom: '1px solid var(--border)', padding: 'clamp(48px,6vw,80px) 0' }}>
            <div className="w">
              <div className="label" style={{ marginBottom: 12 }}>The fix</div>
              <h2 style={{ fontSize: 'clamp(var(--f24),3vw,var(--f36))', fontWeight: 900, letterSpacing: '-0.04em', color: 'var(--ink-0)', marginBottom: 40 }}>
                What changes when we automate this workflow
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {p.automations.map((a, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                    style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 24, padding: 20, background: 'white', border: '1px solid var(--border)', borderLeft: `3px solid ${p.color}`, borderRadius: 'var(--r-8)' }}
                    className="fix-row">
                    <div style={{ fontSize: 'var(--f14)', fontWeight: 700, color: 'var(--ink-0)' }}>{a.fix}</div>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0, marginTop: 2 }}><circle cx="7" cy="7" r="6" fill="var(--green-lo)" stroke="var(--green-line)" strokeWidth="1"/><path d="M4 7l2.5 2.5L10 4.5" stroke="var(--green)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      <span style={{ fontSize: 'var(--f13)', color: 'var(--ink-2)', lineHeight: 1.6 }}>{a.result}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
              <style>{`.fix-row{grid-template-columns:280px 1fr}@media(max-width:640px){.fix-row{grid-template-columns:1fr!important}}`}</style>
            </div>
          </section>

          {/* Outcome + CTA */}
          <section style={{ background: 'var(--dark-0)', padding: 'clamp(48px,6vw,80px) 0' }} className="dark-section">
            <div className="w w--md" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 'clamp(var(--f18),2vw,var(--f24))', fontWeight: 700, color: 'var(--dark-t0)', lineHeight: 1.5, marginBottom: 32, maxWidth: 600, margin: '0 auto 32px' }}>
                "{p.outcome}"
              </div>
              <Link to={p.cta} className="btn btn--xl" style={{ background: 'var(--dark-t0)', color: 'var(--dark-0)', border: 'none', borderRadius: 'var(--r-8)' }}>
                {p.ctaLabel}
              </Link>
            </div>
          </section>

        </motion.div>
      </AnimatePresence>

      <Footer />
    </PageLayout>
  );
};

export default PersonasPage;
