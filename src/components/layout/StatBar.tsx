import React from 'react';
import { Music, ShoppingBag, CreditCard, Calendar } from 'lucide-react';
import timelineDataRaw from '../../data/timeline-summary.json';
import { TimelineSummary } from '../../types';

const timelineData = timelineDataRaw as TimelineSummary;

export const StatBar: React.FC = () => {
  return (
    <div
      style={{
        backgroundColor: 'var(--color-surface-elevated)',
        borderBottom: '1px solid var(--color-border)',
        padding: '0.875rem 1rem',
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ color: 'var(--color-accent-primary)' }}>
            <Calendar size={20} />
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-ink-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Life Timeline
            </div>
            <div style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--color-ink-primary)' }}>
              2013 – 2024 (11.4 Yrs)
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ color: 'var(--color-facet-spotify)' }}>
            <Music size={20} />
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-ink-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Culture & Sound
            </div>
            <div style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--color-ink-primary)' }}>
              {timelineData.totalStreams.toLocaleString()} streams ({timelineData.totalListeningHours.toLocaleString()} hrs)
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ color: 'var(--color-facet-household)' }}>
            <ShoppingBag size={20} />
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-ink-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Household Living
            </div>
            <div style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--color-ink-primary)' }}>
              ₹{timelineData.totalHouseholdSpend.toLocaleString('en-IN')} (2015–2018)
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ color: 'var(--color-facet-financial)' }}>
            <CreditCard size={20} />
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-ink-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Card Commerce
            </div>
            <div style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--color-ink-primary)' }}>
              ₹{timelineData.totalCardSpend.toLocaleString('en-IN')} (2022–2024)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
