import React from 'react';
import { ShieldCheck, Heart, Terminal } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer
      style={{
        borderTop: '1px solid var(--color-border)',
        backgroundColor: 'var(--color-surface)',
        padding: '2.5rem 1rem 3rem 1rem',
        marginTop: 'auto',
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--color-ink-primary)', marginBottom: '0.25rem' }}>
              Your Life, In Receipts 🧾
            </h3>
            <p style={{ fontSize: '0.8125rem', color: 'var(--color-ink-muted)' }}>
              A standalone interactive personal ledger synthesizing 11.4 years of streaming, household living, and card commerce
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                fontSize: '0.75rem',
                color: 'var(--color-status-success)',
                background: 'var(--color-status-success-bg)',
                padding: '0.35rem 0.75rem',
                borderRadius: 'var(--radius-full)',
                fontWeight: 600,
                border: '1px solid #bbf7d0',
              }}
            >
              <ShieldCheck size={14} />
              <span>100% Client-Side Privacy</span>
            </div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                fontSize: '0.75rem',
                color: 'var(--color-ink-secondary)',
                background: 'var(--color-canvas-subtle)',
                padding: '0.35rem 0.75rem',
                borderRadius: 'var(--radius-full)',
                fontWeight: 600,
                border: '1px solid var(--color-border)',
              }}
            >
              <Terminal size={14} />
              <span>React 18 + Vite + TypeScript</span>
            </div>
          </div>
        </div>

        <div
          style={{
            borderTop: '1px solid var(--color-border-subtle)',
            paddingTop: '1rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '0.75rem',
            fontSize: '0.75rem',
            color: 'var(--color-ink-muted)',
          }}
        >
          <div>
            Datasets: Spotify Streaming (149k) • Daily Household (2.4k) • India Multi-Facet (10.2k). All card & personal data anonymized & masked.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            Crafted with <Heart size={12} color="var(--color-accent-primary)" /> for editorial personal analytics
          </div>
        </div>
      </div>
    </footer>
  );
};
