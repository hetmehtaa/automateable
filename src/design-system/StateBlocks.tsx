import React from 'react';

interface EmptyStateProps {
  icon?: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ icon = 'â¬', title, description, action }) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 'var(--space-4)', padding: 'var(--space-16) var(--space-8)', textAlign: 'center' }}>
    <div style={{ fontSize: '32px', lineHeight: 1 }}>{icon}</div>
    <div>
      <div style={{ fontSize: 'var(--text-md)', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '6px' }}>{title}</div>
      {description && <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)' }}>{description}</div>}
    </div>
    {action}
  </div>
);

interface ErrorStateProps {
  title?: string;
  description?: string;
  action?: React.ReactNode;
}

export const ErrorState: React.FC<ErrorStateProps> = ({ title = 'Something went wrong', description, action }) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-4)', padding: 'var(--space-12) var(--space-8)', textAlign: 'center' }}>
    <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--color-red-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-red-500)', fontSize: '18px' }}>!</div>
    <div>
      <div style={{ fontSize: 'var(--text-md)', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '6px' }}>{title}</div>
      {description && <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)' }}>{description}</div>}
    </div>
    {action}
  </div>
);
