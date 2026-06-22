import React from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  icon?: React.ReactNode;
  iconRight?: React.ReactNode;
  fullWidth?: boolean;
  as?: 'button' | 'a';
  href?: string;
}


export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  icon,
  iconRight,
  fullWidth = false,
  children,
  disabled,
  className,
  as: Tag = 'button',
  href,
  ...props
}) => {
  const isDisabled = disabled || loading;

  const baseStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    fontFamily: 'var(--font-sans)',
    fontWeight: 600,
    letterSpacing: '-0.01em',
    border: '1px solid transparent',
    cursor: isDisabled ? 'not-allowed' : 'pointer',
    opacity: isDisabled ? 0.5 : 1,
    transition: 'all var(--transition-base)',
    whiteSpace: 'nowrap',
    textDecoration: 'none',
    position: 'relative',
    overflow: 'hidden',
    width: fullWidth ? '100%' : undefined,
    borderRadius: 'var(--radius-md)',
  };

  const sizeStyles: Record<ButtonSize, React.CSSProperties> = {
    sm:  { fontSize: 'var(--text-sm)',  padding: '6px 14px',  height: '34px' },
    md:  { fontSize: 'var(--text-sm)',  padding: '9px 20px',  height: '40px' },
    lg:  { fontSize: 'var(--text-base)', padding: '12px 28px', height: '48px' },
  };

  const variantStyles: Record<ButtonVariant, React.CSSProperties> = {
    primary: {
      background: 'var(--accent-primary)',
      color: 'var(--color-white)',
      borderColor: 'var(--accent-primary)',
    },
    secondary: {
      background: 'var(--bg-surface)',
      color: 'var(--text-primary)',
      borderColor: 'var(--border-color)',
    },
    ghost: {
      background: 'transparent',
      color: 'var(--text-secondary)',
      borderColor: 'transparent',
    },
    outline: {
      background: 'transparent',
      color: 'var(--accent-primary)',
      borderColor: 'var(--accent-primary)',
    },
    danger: {
      background: 'var(--color-red-500)',
      color: 'var(--color-white)',
      borderColor: 'var(--color-red-500)',
    },
  };

  const combined: React.CSSProperties = {
    ...baseStyle,
    ...sizeStyles[size],
    ...variantStyles[variant],
  };

  const content = (
    <>
      {loading ? <Spinner /> : icon && <span style={{ display: 'flex', alignItems: 'center' }}>{icon}</span>}
      {children}
      {!loading && iconRight && <span style={{ display: 'flex', alignItems: 'center' }}>{iconRight}</span>}
    </>
  );

  if (Tag === 'a') {
    return (
      <a href={href} style={combined} className={`btn btn--${variant} btn--${size}${className ? ' ' + className : ''}`}>
        {content}
      </a>
    );
  }

  return (
    <button
      style={combined}
      disabled={isDisabled}
      className={`btn btn--${variant} btn--${size}${className ? ' ' + className : ''}`}
      {...props}
    >
      {content}
    </button>
  );
};

const Spinner: React.FC = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ animation: 'spin 0.7s linear infinite' }}>
    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="8 16" />
  </svg>
);

export default Button;
