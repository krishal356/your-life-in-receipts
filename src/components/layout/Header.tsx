import React from 'react';
import { Receipt } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header
      style={{
        borderBottom: '1px solid var(--color-border)',
        backgroundColor: 'var(--color-surface)',
        padding: '1.25rem 1rem',
        position: 'sticky',
        top: 0,
        zIndex: 40,
        boxShadow: 'var(--shadow-sm)',
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div
            style={{
              width: '42px',
              height: '42px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--color-accent-subtle)',
              color: 'var(--color-accent-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid #fed7aa',
            }}
          >
            <Receipt size={24} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <h1 style={{ fontSize: '1.25rem', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--color-ink-primary)' }}>
                Your Life, In Receipts
              </h1>
              <span className="badge" style={{ backgroundColor: 'var(--color-canvas-subtle)', color: 'var(--color-ink-secondary)' }}>
                2013–2024
              </span>
            </div>
            <p style={{ fontSize: '0.8125rem', color: 'var(--color-ink-muted)' }}>
              Editorial life ledger synthesizing sound, daily living & modern commerce
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};
