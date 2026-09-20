import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer
      style={{
        borderTop: '1px solid var(--color-border)',
        backgroundColor: 'var(--color-surface)',
        padding: '2rem 1rem',
        marginTop: 'auto',
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '0.75rem',
          fontSize: '0.8125rem',
          color: 'var(--color-ink-muted)',
          lineHeight: 1.5,
        }}
      >
        <div>
          <strong style={{ color: 'var(--color-ink-primary)' }}>Your Life, In Receipts 🧾</strong>
          {' '}— Personal life ledger synthesizing Spotify streaming (149k), household expenses (2.4k), and card commerce (10.2k) across 2013–2024.
        </div>
        <div style={{ color: 'var(--color-ink-muted)', fontSize: '0.75rem' }}>
          All personal data anonymized & masked.
        </div>
      </div>
    </footer>
  );
};
