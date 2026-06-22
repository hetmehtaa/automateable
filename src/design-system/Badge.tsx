import React from 'react';

export type BadgeVariant = 'default' | 'primary' | 'success' | 'warning' | 'error' | 'cyan' | 'violet' | 'live' | 'beta' | 'soon';

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  dot?: boolean;
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({ variant = 'default', children, dot = false, size = 'md' }) => {
  const base: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '5px',
    fontFamily: 'var(--font-sans)',
    fontWeight: 600,
    letterSpacing: '0.03em',
    textTransform: 'uppercase',
    borderRadius: 'var(--radius-full)',
    border: '1px solid transparent',
    whiteSpace: 'nowrap',
    fontSize: size === 'sm' ? '10px' : '11px',
    padding: size === 'sm' ? '2px 8px' : '3px 10px',
  };

  const variants: Record<BadgeVariant, React.CSSProperties> = {
    default:  { background: 'var(--bg-surface-2)', color: 'var(--text-muted)',      borderColor: 'var(--border-color)' },
    primary:  { background: 'var(--color-blue-50)', color: 'var(--color-blue-600)', borderColor: 'var(--color-blue-200)' },
    success:  { background: 'var(--color-green-100)', color: 'var(--color-green-500)', borderColor: 'var(--color-green-100)' },
    warning:  { background: 'var(--color-amber-100)', color: 'var(--color-amber-500)', borderColor: 'var(--color-amber-100)' },
    error:    { background: 'var(--color-red-100)', color: 'var(--color-red-500)', borderColor: 'var(--color-red-100)' },
    cyan:     { background: 'var(--color-cyan-100)', color: 'var(--color-cyan-500)', borderColor: 'var(--color-cyan-200)' },
    violet:   { background: 'var(--color-violet-100)', color: 'var(--color-violet-500)', borderColor: 'var(--color-violet-100)' },
    live:     { background: 'var(--color-green-100)', color: 'var(--color-green-500)', borderColor: 'var(--color-green-100)' },
    beta:     { background: 'var(--color-amber-100)', color: 'var(--color-amber-500)', borderColor: 'var(--color-amber-100)' },
    soon:     { background: 'var(--bg-surface-2)', color: 'var(--text-muted)', borderColor: 'var(--border-color)' },
  };

  const dotColors: Partial<Record<BadgeVariant, string>> = {
    live: 'var(--color-green-400)',
    beta: 'var(--color-amber-400)',
    soon: 'var(--color-ink-300)',
    success: 'var(--color-green-400)',
    warning: 'var(--color-amber-400)',
    error: 'var(--color-red-500)',
    cyan: 'var(--color-cyan-400)',
  };

  return (
    <span style={{ ...base, ...variants[variant] }}>
      {dot && (
        <span style={{
          width: '6px', height: '6px', borderRadius: '50%',
          background: dotColors[variant] || 'currentColor',
          flexShrink: 0,
          ...(variant === 'live' ? { animation: 'pulse 2s ease infinite' } : {}),
        }} />
      )}
      {children}
    </span>
  );
};

export default Badge;
