import React from 'react';

interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  borderRadius?: string;
  style?: React.CSSProperties;
}

export const Skeleton: React.FC<SkeletonProps> = ({ width = '100%', height = '16px', borderRadius = 'var(--radius-md)', style }) => (
  <div className="skeleton" style={{ width, height, borderRadius, flexShrink: 0, ...style }} aria-hidden="true" />
);

export const SkeletonCard: React.FC = () => (
  <div style={{ padding: 'var(--space-6)', background: 'var(--bg-elevated)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-xl)', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
    <Skeleton height="12px" width="60px" />
    <Skeleton height="20px" width="80%" />
    <Skeleton height="14px" width="100%" />
    <Skeleton height="14px" width="75%" />
    <Skeleton height="32px" width="120px" borderRadius="var(--radius-md)" />
  </div>
);

export default Skeleton;
