import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'spotify' | 'household' | 'financial' | 'danger' | 'success' | 'warning' | 'default';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'default', className = '' }) => {
  const variantClass = {
    spotify: 'badge-spotify',
    household: 'badge-household',
    financial: 'badge-financial',
    danger: 'badge-danger',
    success: 'badge-success',
    warning: 'badge-warning',
    default: 'badge-secondary',
  }[variant];

  return <span className={`badge ${variantClass} ${className}`}>{children}</span>;
};
