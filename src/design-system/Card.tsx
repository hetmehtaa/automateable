import React from 'react';

interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'elevated' | 'bordered' | 'surface' | 'highlight';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hover?: boolean;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  children, variant = 'default', padding = 'md', hover = false, className, style, onClick,
}) => {
  const padMap = { none: '0', sm: 'var(--space-4)', md: 'var(--space-6)', lg: 'var(--space-8)' };

  const base: React.CSSProperties = {
    borderRadius: 'var(--radius-xl)',
    padding: padMap[padding],
    transition: 'all var(--transition-base)',
    cursor: onClick ? 'pointer' : undefined,
    position: 'relative',
    overflow: 'hidden',
  };

  const variants: Record<string, React.CSSProperties> = {
    default:   { background: 'var(--bg-elevated)', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' },
    elevated:  { background: 'var(--bg-elevated)', border: '1px solid var(--border-soft)',  boxShadow: 'var(--shadow-lg)' },
    bordered:  { background: 'var(--bg-elevated)', border: '1px solid var(--border-med)',   boxShadow: 'none' },
    surface:   { background: 'var(--bg-surface)',  border: '1px solid var(--border-soft)',  boxShadow: 'none' },
    highlight: { background: 'var(--color-blue-50)', border: '1px solid var(--color-blue-200)', boxShadow: 'var(--shadow-sm)' },
  };


  return (
    <div
      className={`card card--${variant}${hover ? ' card--hover' : ''}${className ? ' ' + className : ''}`}
      style={{ ...base, ...variants[variant], ...style }}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Card;
