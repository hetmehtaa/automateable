import React from 'react';

interface Props {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  titleSize?: 'md' | 'lg' | 'xl';
  dark?: boolean;
}

export const SectionHeader: React.FC<Props> = ({ eyebrow, title, subtitle, align = 'center', titleSize = 'lg', dark = false }) => {
  const sizes = {
    md: 'clamp(var(--text-24), 2.5vw, var(--text-36))',
    lg: 'clamp(var(--text-32), 3.5vw, var(--text-56))',
    xl: 'clamp(var(--text-40), 5vw, var(--text-72))',
  };

  return (
    <div style={{ textAlign: align, maxWidth: align === 'center' ? '700px' : undefined, margin: align === 'center' ? '0 auto' : undefined }}>
      {eyebrow && (
        <div style={{ marginBottom: 'var(--sp-4)' }}>
          <span className={`badge ${dark ? 'badge--dark' : 'badge--blue'}`}>
            {eyebrow}
          </span>
        </div>
      )}
      <h2 style={{ fontSize: sizes[titleSize], fontWeight: 900, letterSpacing: 'var(--tracking-tighter)', lineHeight: 'var(--leading-tight)', color: dark ? 'white' : 'var(--c-navy-700)', marginBottom: subtitle ? 'var(--sp-5)' : 0 }}>
        {title}
      </h2>
      {subtitle && (
        <p style={{ fontSize: 'clamp(var(--text-15), 1.2vw, var(--text-18))', color: dark ? 'rgba(255,255,255,0.6)' : 'var(--text-secondary)', lineHeight: 'var(--leading-relaxed)', maxWidth: '580px', margin: align === 'center' ? '0 auto' : undefined }}>
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeader;
