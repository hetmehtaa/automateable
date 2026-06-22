import React, { useState } from 'react';
import { Input, Textarea, Select } from '../design-system';

interface FormState {
  name: string;
  email: string;
  what: string;
  category: string;
  tools: string;
  pain: string;
  budget: string;
  timeline: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  what?: string;
  category?: string;
}

const initialForm: FormState = {
  name: '', email: '', what: '', category: '',
  tools: '', pain: '', budget: '', timeline: '',
};

const budgetOptions = [
  { value: '', label: 'Select a range...' },
  { value: 'audit', label: 'Audit only (under $500)' },
  { value: '500-2k', label: '$500 - $2,000' },
  { value: '2k-5k', label: '$2,000 - $5,000' },
  { value: '5k-15k', label: '$5,000 - $15,000' },
  { value: '15k+', label: '$15,000+' },
  { value: 'unsure', label: "Not sure yet" },
];

const timelineOptions = [
  { value: '', label: 'Select a timeline...' },
  { value: 'asap', label: 'As soon as possible' },
  { value: '1mo', label: 'Within 1 month' },
  { value: '3mo', label: 'Within 3 months' },
  { value: 'flexible', label: "Flexible / just exploring" },
];

const categoryOptions = [
  { value: '', label: 'Select one...' },
  { value: 'work', label: 'Work / professional productivity' },
  { value: 'business', label: 'Business operations' },
  { value: 'social', label: 'Social media / content' },
  { value: 'life', label: 'Personal life / admin' },
  { value: 'multiple', label: 'Multiple areas' },
];

function validate(form: FormState): FormErrors {
  const errors: FormErrors = {};
  if (!form.name.trim()) errors.name = 'Name is required';
  if (!form.email.trim()) errors.email = 'Email is required';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = 'Enter a valid email';
  if (!form.what.trim()) errors.what = 'Tell us what you want to automate';
  if (!form.category) errors.category = 'Select a category';
  return errors;
}

export const ContactForm: React.FC = () => {
  const [form, setForm]       = useState<FormState>(initialForm);
  const [errors, setErrors]   = useState<FormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormState, boolean>>>({});
  const [status, setStatus]   = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const set = (field: keyof FormState) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm(f => ({ ...f, [field]: e.target.value }));
    if (touched[field]) {
      const errs = validate({ ...form, [field]: e.target.value });
      setErrors(errs);
    }
  };

  const blur = (field: keyof FormState) => () => {
    setTouched(t => ({ ...t, [field]: true }));
    setErrors(validate(form));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const allTouched = Object.fromEntries(Object.keys(form).map(k => [k, true]));
    setTouched(allTouched as Partial<Record<keyof FormState, boolean>>);
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setStatus('loading');
    await new Promise(r => setTimeout(r, 1400));
    setStatus('success');
  };

  if (status === 'success') {
    return (
      <section id="contact" className="section">
        <div className="container" style={{ maxWidth: '640px' }}>
          <div style={{
            background: 'var(--bg-elevated)', border: '1px solid var(--color-blue-200)',
            borderRadius: 'var(--radius-2xl)', padding: 'var(--space-16)',
            textAlign: 'center', boxShadow: 'var(--shadow-lg)',
          }}>
            <div style={{
              width: '64px', height: '64px', borderRadius: '50%', margin: '0 auto var(--space-6)',
              background: 'var(--color-green-100)', border: '2px solid var(--color-green-400)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px',
            }}>
              â
            </div>
            <h3 style={{ fontSize: 'var(--text-2xl)', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: 'var(--tracking-tight)', marginBottom: 'var(--space-4)' }}>
              Problem received.
            </h3>
            <p style={{ fontSize: 'var(--text-base)', color: 'var(--text-secondary)', lineHeight: 'var(--leading-relaxed)', marginBottom: 'var(--space-8)' }}>
              We'll review your workflow and reach out within 1-2 business days with next steps. Check your inbox for a confirmation.
            </p>
            <button
              onClick={() => { setForm(initialForm); setStatus('idle'); setTouched({}); setErrors({}); }}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                height: '42px', padding: '0 20px',
                background: 'var(--bg-surface)', color: 'var(--text-secondary)',
                border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)',
                fontSize: 'var(--text-sm)', fontWeight: 600, cursor: 'pointer',
                transition: 'all var(--transition-fast)',
              }}
            >
              Submit another problem
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="section">
      <div className="container" style={{ maxWidth: 'var(--container-xl)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-20)', alignItems: 'start' }} className="contact-grid">
          {/* Left: copy */}
          <div>
            <div style={{ marginBottom: 'var(--space-3)' }}>
              <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--accent-primary)' }}>Contact</span>
            </div>
            <h2 style={{ fontSize: 'clamp(var(--text-3xl), 3vw, var(--text-5xl))', fontWeight: 800, letterSpacing: 'var(--tracking-tight)', lineHeight: 'var(--leading-tight)', marginBottom: 'var(--space-5)', color: 'var(--text-primary)' }}>
              Send the messy version.
            </h2>
            <p style={{ fontSize: 'var(--text-base)', color: 'var(--text-secondary)', lineHeight: 'var(--leading-relaxed)', marginBottom: 'var(--space-8)' }}>
              We'll help turn it into a system. You don't need to have it figured out. Describe the problem in whatever form it's currently in â we'll ask follow-up questions if we need more.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              {[
                { icon: 'â¡', title: 'Fast turnaround', desc: 'First response within 1-2 business days' },
                { icon: 'ð', title: 'Diagnosis first', desc: 'We always start by understanding before suggesting' },
                { icon: 'ð', title: 'No pitch calls', desc: 'We won\'t waste your time with a sales process' },
              ].map(item => (
                <div key={item.title} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <div style={{
                    width: '36px', height: '36px', borderRadius: 'var(--radius-md)', flexShrink: 0,
                    background: 'var(--bg-surface)', border: '1px solid var(--border-color)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '15px',
                  }}>{item.icon}</div>
                  <div>
                    <div style={{ fontSize: 'var(--text-sm)', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '2px' }}>{item.title}</div>
                    <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)' }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: form */}
          <div style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-2xl)', padding: 'var(--space-8)', boxShadow: 'var(--shadow-md)' }}>
            <form onSubmit={submit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
                <Input
                  label="Name" placeholder="Your name"
                  value={form.name} onChange={set('name')} onBlur={blur('name')}
                  error={touched.name ? errors.name : undefined}
                  required aria-required="true"
                />
                <Input
                  label="Email" type="email" placeholder="you@company.com"
                  value={form.email} onChange={set('email')} onBlur={blur('email')}
                  error={touched.email ? errors.email : undefined}
                  required aria-required="true"
                />
              </div>

              <Textarea
                label="What do you want to automate?"
                placeholder="Describe the workflow, task, or pain point. The messier the better â we'll sort it out."
                value={form.what} onChange={set('what')} onBlur={blur('what')}
                error={touched.what ? errors.what : undefined}
                required aria-required="true"
                style={{ minHeight: '110px' }}
              />

              <Select
                label="Is this for work, business, life, or social media?"
                options={categoryOptions}
                value={form.category} onChange={set('category')} onBlur={blur('category')}
                error={touched.category ? errors.category : undefined}
              />

              <Input
                label="Current tools you use"
                placeholder="e.g. Notion, Slack, Gmail, HubSpot, Zapier..."
                value={form.tools} onChange={set('tools')} onBlur={blur('tools')}
              />

              <Textarea
                label="Biggest manual pain right now"
                placeholder="What's the one thing eating your time that shouldn't?"
                value={form.pain} onChange={set('pain')} onBlur={blur('pain')}
                style={{ minHeight: '80px' }}
              />

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
                <Select
                  label="Budget range"
                  options={budgetOptions}
                  value={form.budget} onChange={set('budget')}
                />
                <Select
                  label="Timeline"
                  options={timelineOptions}
                  value={form.timeline} onChange={set('timeline')}
                />
              </div>

              <div style={{ paddingTop: 'var(--space-2)' }}>
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  style={{
                    width: '100%', height: '50px',
                    background: status === 'loading' ? 'var(--color-ink-700)' : 'var(--color-ink-900)',
                    color: 'white', border: 'none', borderRadius: 'var(--radius-md)',
                    fontSize: 'var(--text-base)', fontWeight: 700, cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                    transition: 'all var(--transition-base)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                    letterSpacing: '-0.01em',
                  }}
                  onMouseEnter={e => { if (status !== 'loading') (e.currentTarget.style.background = 'var(--color-ink-700)'); }}
                  onMouseLeave={e => { if (status !== 'loading') (e.currentTarget.style.background = 'var(--color-ink-900)'); }}
                >
                  {status === 'loading' ? (
                    <>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ animation: 'spin 0.7s linear infinite' }}>
                        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                        <circle cx="8" cy="8" r="6" stroke="rgba(255,255,255,0.3)" strokeWidth="2"/>
                        <path d="M8 2a6 6 0 0 1 6 6" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send My Problem
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </>
                  )}
                </button>
                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', textAlign: 'center', marginTop: 'var(--space-3)', fontStyle: 'italic' }}>
                  Send the messy version. We'll help turn it into a system.
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>

      <style>{`
        .contact-grid { grid-template-columns: 1fr 1fr; }
        @media (max-width: 900px) { .contact-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
};

export default ContactForm;
