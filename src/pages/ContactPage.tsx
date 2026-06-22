import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { PageLayout } from '../components/PageLayout';
import { Footer } from '../sections/Footer';

/* ====================================================================
   MINIMAL CONTACT FORM
   3 required fields + 2 optional = done. Not a government questionnaire.
   ==================================================================== */

interface FormData {
  name: string;
  email: string;
  problem: string;
  category: string;
  budget: string;
}

const empty: FormData = { name: '', email: '', problem: '', category: '', budget: '' };

const categories = [
  { v: '', l: 'What are you trying to automate?' },
  { v: 'ops',     l: 'Business operations' },
  { v: 'content', l: 'Content & social media' },
  { v: 'sales',   l: 'Sales & CRM' },
  { v: 'personal', l: 'Personal productivity' },
  { v: 'dev',     l: 'Technical / developer workflows' },
  { v: 'other',   l: 'Something else' },
];

const budgets = [
  { v: '', l: 'Rough budget range (optional)' },
  { v: 'audit',   l: 'Audit only â under $500' },
  { v: '1-3k',    l: '$1,000 â $3,000' },
  { v: '3-10k',   l: '$3,000 â $10,000' },
  { v: '10k+',    l: '$10,000+' },
  { v: 'unsure',  l: "Not sure yet" },
];

/* ---- field wrapper ---- */
const Field: React.FC<{
  label: string; id: string; error?: string; children: React.ReactNode;
}> = ({ label, id, error, children }) => (
  <div>
    <label htmlFor={id} style={{ display: 'block', fontSize: 'var(--f12)', fontWeight: 600, color: 'var(--ink-3)', letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: 6 }}>
      {label}
    </label>
    {children}
    <AnimatePresence>
      {error && (
        <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
          style={{ fontSize: 'var(--f12)', color: 'var(--red)', marginTop: 4 }}>{error}</motion.p>
      )}
    </AnimatePresence>
  </div>
);

const inputStyle = (hasError: boolean, focused: boolean): React.CSSProperties => ({
  width: '100%', height: 44, padding: '0 14px',
  background: focused ? 'white' : 'var(--paper-1)',
  border: `1.5px solid ${hasError ? 'var(--red)' : focused ? 'var(--blue)' : 'var(--border-2)'}`,
  borderRadius: 'var(--r-8)', fontSize: 'var(--f14)', color: 'var(--ink-0)',
  outline: 'none', fontFamily: 'var(--font)',
  transition: 'border-color 0.15s, background 0.15s, box-shadow 0.15s',
  boxShadow: focused ? '0 0 0 3px rgba(29,78,216,0.10)' : 'none',
});

export const ContactPage: React.FC = () => {
  const [form, setForm]   = useState<FormData>(empty);
  const [errs, setErrs]   = useState<Partial<FormData>>({});
  const [touched, setT]   = useState<Partial<Record<keyof FormData, boolean>>>({});
  const [focused, setFoc] = useState<string | null>(null);
  const [status, setSt]   = useState<'idle' | 'loading' | 'done'>('idle');

  const set = (k: keyof FormData) => (v: string) => {
    setForm(p => ({ ...p, [k]: v }));
    if (touched[k]) validate({ ...form, [k]: v });
  };

  const validate = (data: FormData) => {
    const e: Partial<FormData> = {};
    if (!data.name.trim())    e.name    = 'Your name';
    if (!data.email.trim())   e.email   = 'Your email';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) e.email = 'Valid email address';
    if (!data.problem.trim()) e.problem = 'Describe what you want to automate';
    setErrs(e);
    return e;
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const all = Object.fromEntries(Object.keys(form).map(k => [k, true]));
    setT(all as typeof touched);
    const e2 = validate(form);
    if (Object.keys(e2).length) return;
    setSt('loading');
    await new Promise(r => setTimeout(r, 1200));
    setSt('done');
  };

  if (status === 'done') return (
    <PageLayout title="Message sent">
      <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
        <motion.div initial={{ opacity: 0, scale: 0.94, y: 16 }} animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{ textAlign: 'center', maxWidth: 400 }}>
          <motion.div
            initial={{ scale: 0 }} animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.15, ease: [0.34, 1.56, 0.64, 1] }}
            style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--green-lo)', border: '1.5px solid var(--green-line)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
            <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
              <path d="M5 13l6 6L21 7" stroke="var(--green)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.div>
          <h2 style={{ fontSize: 'var(--f28)', fontWeight: 900, letterSpacing: '-0.04em', color: 'var(--ink-0)', marginBottom: 10 }}>
            Problem received.
          </h2>
          <p style={{ fontSize: 'var(--f15)', color: 'var(--ink-3)', lineHeight: 1.65, marginBottom: 28 }}>
            We will review your workflow and reply within 1Ã¢2 business days.
          </p>
          <button onClick={() => { setForm(empty); setSt('idle'); setT({}); setErrs({}); }} className="btn btn--md btn--ghost">
            Submit another
          </button>
        </motion.div>
      </div>
      <Footer />
    </PageLayout>
  );

  return (
    <PageLayout title="Start a project">
      <div style={{ minHeight: '100vh', display: 'grid', gridTemplateRows: '1fr auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: 'calc(100vh - var(--topbar-h))' }} className="contact-shell">

          {/* ---- LEFT: intent + trust ---- */}
          <div style={{ padding: 'clamp(48px,6vw,80px) clamp(32px,5vw,64px)', borderRight: '1px solid var(--border)', display: 'flex', flexDirection: 'column', justifyContent: 'center', background: 'var(--paper)', position: 'relative', overflow: 'hidden' }}>
            <div className="blueprint-bg-anim" style={{ position: 'absolute', inset: 0, opacity: 0.4 }} aria-hidden="true" />
            <div className="scan-line" aria-hidden="true" />

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }} style={{ position: 'relative', zIndex: 1 }}>

              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '4px 12px', background: 'white', border: '1px solid var(--border-2)', borderRadius: 'var(--r-full)', marginBottom: 28 }}>
                <span className="dot dot--live" style={{ width: 5, height: 5 }} />
                <span style={{ fontFamily: 'var(--mono)', fontSize: 'var(--f10)', color: 'var(--ink-3)', letterSpacing: '0.07em' }}>Accepting new clients</span>
              </div>

              <h1 style={{ fontSize: 'clamp(2.4rem,5vw,3.8rem)', fontWeight: 900, letterSpacing: '-0.05em', lineHeight: 1.0, color: 'var(--ink-0)', marginBottom: 16 }}>
                Send the
                <br />
                <span style={{ background: 'linear-gradient(135deg, var(--blue) 0%, #60a5fa 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  messy version.
                </span>
              </h1>

              <p style={{ fontSize: 'var(--f15)', color: 'var(--ink-2)', lineHeight: 1.7, marginBottom: 40, maxWidth: 360 }}>
                Describe what hurts. We will map the system that fixes it. You do not need to know the solution before you contact us.
              </p>

              {/* Trust signals */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {[
                  { metric: '1-2 days', label: 'Response time', icon: 'â±' },
                  { metric: 'Diagnosis first', label: 'Before any recommendation', icon: 'ð' },
                  { metric: 'Fixed scope', label: 'No surprise billing', icon: 'ð' },
                ].map((t, i) => (
                  <motion.div key={t.label} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.1 }}
                    style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                    <div style={{ width: 40, height: 40, borderRadius: 'var(--r-8)', background: 'white', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0, boxShadow: 'var(--sh-sm)' }}>
                      {t.icon}
                    </div>
                    <div>
                      <div style={{ fontSize: 'var(--f14)', fontWeight: 700, color: 'var(--ink-0)', lineHeight: 1.2 }}>{t.metric}</div>
                      <div style={{ fontSize: 'var(--f12)', color: 'var(--ink-3)' }}>{t.label}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* ---- RIGHT: compact form ---- */}
          <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            style={{ padding: 'clamp(48px,6vw,80px) clamp(32px,5vw,64px)', display: 'flex', flexDirection: 'column', justifyContent: 'center', background: 'white' }}>

            <div style={{ maxWidth: 440 }}>
              <div className="label" style={{ marginBottom: 20 }}>Get in touch</div>

              <form onSubmit={submit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>

                {/* Name + Email row */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }} className="name-email-row">
                  <Field label="Name *" id="name" error={touched.name ? errs.name : undefined}>
                    <input id="name" type="text" value={form.name} placeholder="Alex Chen"
                      onChange={e => set('name')(e.target.value)}
                      onFocus={() => setFoc('name')} onBlur={() => { setFoc(null); setT(t => ({ ...t, name: true })); validate(form); }}
                      style={inputStyle(!!errs.name && !!touched.name, focused === 'name')} />
                  </Field>
                  <Field label="Email *" id="email" error={touched.email ? errs.email : undefined}>
                    <input id="email" type="email" value={form.email} placeholder="alex@company.com"
                      onChange={e => set('email')(e.target.value)}
                      onFocus={() => setFoc('email')} onBlur={() => { setFoc(null); setT(t => ({ ...t, email: true })); validate(form); }}
                      style={inputStyle(!!errs.email && !!touched.email, focused === 'email')} />
                  </Field>
                </div>

                {/* The problem */}
                <Field label="What do you want to automate? *" id="problem" error={touched.problem ? errs.problem : undefined}>
                  <textarea id="problem" rows={4} value={form.problem}
                    placeholder="I spend 3 hours every Monday compiling reports from Stripe, HubSpot, and GA. It's the same thing every week..."
                    onChange={e => set('problem')(e.target.value)}
                    onFocus={() => setFoc('problem')} onBlur={() => { setFoc(null); setT(t => ({ ...t, problem: true })); validate(form); }}
                    style={{ ...inputStyle(!!errs.problem && !!touched.problem, focused === 'problem'), height: 'auto', padding: '10px 14px', resize: 'none', lineHeight: 1.6 }} />
                </Field>

                {/* Category + Budget row */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }} className="cat-budget-row">
                  <Field label="Area" id="category">
                    <div style={{ position: 'relative' }}>
                      <select id="category" value={form.category} onChange={e => set('category')(e.target.value)}
                        onFocus={() => setFoc('category')} onBlur={() => setFoc(null)}
                        style={{ ...inputStyle(false, focused === 'category'), paddingRight: 36, appearance: 'none', cursor: 'pointer', color: form.category ? 'var(--ink-0)' : 'var(--ink-3)' }}>
                        {categories.map(c => <option key={c.v} value={c.v}>{c.l}</option>)}
                      </select>
                      <svg width="12" height="8" viewBox="0 0 12 8" fill="none" style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
                        <path d="M1 1l5 5 5-5" stroke="var(--ink-3)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </Field>
                  <Field label="Budget" id="budget">
                    <div style={{ position: 'relative' }}>
                      <select id="budget" value={form.budget} onChange={e => set('budget')(e.target.value)}
                        onFocus={() => setFoc('budget')} onBlur={() => setFoc(null)}
                        style={{ ...inputStyle(false, focused === 'budget'), paddingRight: 36, appearance: 'none', cursor: 'pointer', color: form.budget ? 'var(--ink-0)' : 'var(--ink-3)' }}>
                        {budgets.map(b => <option key={b.v} value={b.v}>{b.l}</option>)}
                      </select>
                      <svg width="12" height="8" viewBox="0 0 12 8" fill="none" style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
                        <path d="M1 1l5 5 5-5" stroke="var(--ink-3)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </Field>
                </div>

                {/* Submit */}
                <motion.button
                  type="submit"
                  disabled={status === 'loading'}
                  whileHover={status !== 'loading' ? { scale: 1.01, y: -1 } : {}}
                  whileTap={status !== 'loading' ? { scale: 0.99 } : {}}
                  style={{ height: 50, background: 'var(--ink-0)', color: 'white', border: 'none', borderRadius: 'var(--r-8)', fontSize: 'var(--f15)', fontWeight: 700, cursor: status === 'loading' ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, letterSpacing: '-0.01em', opacity: status === 'loading' ? 0.7 : 1, position: 'relative', overflow: 'hidden' }}
                >
                  {status === 'loading' ? (
                    <>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ animation: 'spin 0.7s linear infinite' }}>
                        <style>{'@keyframes spin{to{transform:rotate(360deg)}}'}</style>
                        <circle cx="8" cy="8" r="6" stroke="rgba(255,255,255,0.25)" strokeWidth="2"/>
                        <path d="M8 2a6 6 0 0 1 6 6" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                      Sending&hellip;
                    </>
                  ) : (
                    <>
                      Send my problem
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M2 8h12M9 4l5 4-5 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </>
                  )}
                </motion.button>

                <p style={{ fontSize: 'var(--f12)', color: 'var(--ink-4)', textAlign: 'center', fontStyle: 'italic' }}>
                  No pitch call. No sales pressure. We diagnose before we recommend.
                </p>

              </form>

              {/* Quick audit link */}
              <div style={{ marginTop: 28, paddingTop: 24, borderTop: '1px solid var(--border)', textAlign: 'center' }}>
                <span style={{ fontSize: 'var(--f13)', color: 'var(--ink-3)' }}>Want a structured output? </span>
                <Link to="/audit" className="link-underline" style={{ fontSize: 'var(--f13)', fontWeight: 600 }}>
                  Book a formal audit instead
                </Link>
              </div>
            </div>
          </motion.div>
        </div>

        <Footer />
      </div>

      <style>{`
        .contact-shell { grid-template-columns: 1fr 1fr; }
        .name-email-row { grid-template-columns: 1fr 1fr; }
        .cat-budget-row { grid-template-columns: 1fr 1fr; }
        @media (max-width: 860px) {
          .contact-shell { grid-template-columns: 1fr !important; }
          .contact-shell > div:first-child { min-height: 280px; }
        }
        @media (max-width: 480px) {
          .name-email-row { grid-template-columns: 1fr !important; }
          .cat-budget-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </PageLayout>
  );
};

export default ContactPage;
