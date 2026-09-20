import React from 'react';
import { Receipt, RefreshCw } from 'lucide-react';

interface EmptyStateProps {
  title?: string;
  description?: string;
  onReset?: () => void;
  resetLabel?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'No Records Found',
  description = 'No receipts match your current filter and search criteria.',
  onReset,
  resetLabel = 'Reset All Filters',
}) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '3.5rem 1.5rem',
        textAlign: 'center',
        background: 'var(--color-surface)',
        border: '1.5px dashed var(--color-border)',
        borderRadius: 'var(--radius-lg)',
        margin: '1.5rem 0',
      }}
    >
      <div
        style={{
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          background: 'var(--color-canvas-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '1rem',
          color: 'var(--color-ink-muted)',
        }}
      >
        <Receipt size={28} />
      </div>
      <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--color-ink-primary)', marginBottom: '0.5rem' }}>
        {title}
      </h3>
      <p style={{ fontSize: '0.875rem', color: 'var(--color-ink-secondary)', maxWidth: '400px', marginBottom: '1.5rem' }}>
        {description}
      </p>
      {onReset && (
        <button
          onClick={onReset}
          className="btn btn-secondary"
          aria-label={resetLabel}
        >
          <RefreshCw size={16} />
          {resetLabel}
        </button>
      )}
    </div>
  );
};
