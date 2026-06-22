import React from 'react';

interface ProcessStepProps {
  step: number;
  title: string;
  description: string;
  status?: 'done' | 'active' | 'pending';
  isLast?: boolean;
}

export const ProcessStep: React.FC<ProcessStepProps> = ({ step, title, description, status = 'pending', isLast = false }) => {
  const statusColors = {
    done:    { bg: 'var(--color-blue-500)', border: 'var(--color-blue-500)', text: 'white' },
    active:  { bg: 'var(--color-cyan-100)', border: 'var(--color-cyan-400)', text: 'var(--color-cyan-500)' },
    pending: { bg: 'var(--bg-surface)', border: 'var(--border-med)', text: 'var(--text-muted)' },
  };
  const s = statusColors[status];

  return (
    <div style={{ display: 'flex', gap: 'var(--space-5)', position: 'relative' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
        <div style={{
          width: '36px', height: '36px', borderRadius: '50%',
          background: s.bg, border: `2px solid ${s.border}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 'var(--text-xs)', fontWeight: 800, color: s.text,
          fontFamily: 'var(--font-mono)', transition: 'all var(--transition-base)',
          flexShrink: 0, zIndex: 1,
        }}>
          {status === 'done' ? 'â' : step}
        </div>
        {!isLast && (
          <div style={{
            width: '2px', flex: 1, minHeight: '32px',
            background: status === 'done' ? 'var(--color-blue-200)' : 'var(--border-color)',
            marginTop: '4px',
          }} />
        )}
      </div>
      <div style={{ paddingBottom: isLast ? 0 : 'var(--space-8)', paddingTop: '6px' }}>
        <div style={{ fontSize: 'var(--text-sm)', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px' }}>{title}</div>
        <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', lineHeight: 'var(--leading-relaxed)' }}>{description}</div>
      </div>
    </div>
  );
};

export default ProcessStep;
