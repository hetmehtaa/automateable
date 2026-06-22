import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const Input: React.FC<InputProps> = ({ label, error, hint, id, ...props }) => {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      {label && (
        <label htmlFor={inputId} style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--text-primary)' }}>
          {label}
        </label>
      )}
      <input
        id={inputId}
        style={{
          height: '42px', padding: '0 14px',
          background: 'var(--bg-elevated)', border: `1px solid ${error ? 'var(--color-red-500)' : 'var(--border-med)'}`,
          borderRadius: 'var(--radius-md)', fontSize: 'var(--text-sm)', color: 'var(--text-primary)',
          transition: 'border-color var(--transition-fast), box-shadow var(--transition-fast)',
          outline: 'none', width: '100%',
        }}
        onFocus={e => { e.target.style.borderColor = 'var(--border-focus)'; e.target.style.boxShadow = 'var(--shadow-glow-blue)'; }}
        onBlur={e => { e.target.style.borderColor = error ? 'var(--color-red-500)' : 'var(--border-med)'; e.target.style.boxShadow = 'none'; }}
        {...props}
      />
      {error && <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-red-500)' }}>{error}</span>}
      {hint && !error && <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>{hint}</span>}
    </div>
  );
};

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const Textarea: React.FC<TextareaProps> = ({ label, error, hint, id, ...props }) => {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      {label && (
        <label htmlFor={inputId} style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--text-primary)' }}>
          {label}
        </label>
      )}
      <textarea
        id={inputId}
        style={{
          padding: '12px 14px', minHeight: '100px',
          background: 'var(--bg-elevated)', border: `1px solid ${error ? 'var(--color-red-500)' : 'var(--border-med)'}`,
          borderRadius: 'var(--radius-md)', fontSize: 'var(--text-sm)', color: 'var(--text-primary)',
          transition: 'border-color var(--transition-fast), box-shadow var(--transition-fast)',
          outline: 'none', width: '100%', resize: 'vertical', lineHeight: 'var(--leading-relaxed)',
        }}
        onFocus={e => { e.target.style.borderColor = 'var(--border-focus)'; e.target.style.boxShadow = 'var(--shadow-glow-blue)'; }}
        onBlur={e => { e.target.style.borderColor = error ? 'var(--color-red-500)' : 'var(--border-med)'; e.target.style.boxShadow = 'none'; }}
        {...props}
      />
      {error && <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-red-500)' }}>{error}</span>}
      {hint && !error && <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>{hint}</span>}
    </div>
  );
};

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
}

export const Select: React.FC<SelectProps> = ({ label, error, options, id, ...props }) => {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      {label && (
        <label htmlFor={inputId} style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--text-primary)' }}>
          {label}
        </label>
      )}
      <select
        id={inputId}
        style={{
          height: '42px', padding: '0 14px',
          background: 'var(--bg-elevated)', border: `1px solid ${error ? 'var(--color-red-500)' : 'var(--border-med)'}`,
          borderRadius: 'var(--radius-md)', fontSize: 'var(--text-sm)', color: 'var(--text-primary)',
          transition: 'border-color var(--transition-fast)', outline: 'none', width: '100%', cursor: 'pointer',
          appearance: 'none',
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%236e7a96' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center',
        }}
        onFocus={e => { e.target.style.borderColor = 'var(--border-focus)'; }}
        onBlur={e => { e.target.style.borderColor = error ? 'var(--color-red-500)' : 'var(--border-med)'; }}
        {...props}
      >
        {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
      {error && <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-red-500)' }}>{error}</span>}
    </div>
  );
};
