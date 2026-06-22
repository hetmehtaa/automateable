import React from 'react';

interface MetricCardProps {
  label: string;
  value: string;
  delta?: string;
  deltaPositive?: boolean;
  icon?: React.ReactNode;
  color?: 'blue' | 'cyan' | 'green' | 'violet' | 'amber';
}

export const MetricCard: React.FC<MetricCardProps> = ({ label, value, delta, deltaPositive = true, icon, color = 'blue' }) => {
  const colorMap = {
    blue:   { bg: 'var(--color-blue-50)',   accent: 'var(--color-blue-500)',   border: 'var(--color-blue-200)' },
    cyan:   { bg: 'var(--color-cyan-100)',  accent: 'var(--color-cyan-500)',   border: 'var(--color-cyan-200)' },
    green:  { bg: 'var(--color-green-100)', accent: 'var(--color-green-500)',  border: 'var(--color-green-100)' },
    violet: { bg: 'var(--color-violet-100)',accent: 'var(--color-violet-500)', border: 'var(--color-violet-100)' },
    amber:  { bg: 'var(--color-amber-100)', accent: 'var(--color-amber-500)',  border: 'var(--color-amber-100)' },
  };
  const c = colorMap[color];

  return (
    <div style={{
      background: 'var(--bg-elevated)', border: '1px solid var(--border-color)',
      borderRadius: 'var(--radius-lg)', padding: 'var(--space-5)',
      display: 'flex', flexDirection: 'column', gap: 'var(--space-3)',
      boxShadow: 'var(--shadow-sm)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: 'var(--text-xs)', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
          {label}
        </span>
        {icon && (
          <span style={{ width: '28px', height: '28px', borderRadius: 'var(--radius-md)', background: c.bg, border: `1px solid ${c.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: c.accent, fontSize: '13px' }}>
            {icon}
          </span>
        )}
      </div>
      <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: 'var(--tracking-tight)' }}>
        {value}
      </div>
      {delta && (
        <div style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: deltaPositive ? 'var(--color-green-500)' : 'var(--color-red-500)', display: 'flex', alignItems: 'center', gap: '3px' }}>
          <span>{deltaPositive ? 'â' : 'â'}</span>
          {delta}
        </div>
      )}
    </div>
  );
};

export default MetricCard;
