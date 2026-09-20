import React from 'react';
import { FinancialFraudAudit } from '../../types';
import { formatINR, formatNumber } from '../../utils/formatters';

interface FraudKpiCardsProps {
  fraudAudit: FinancialFraudAudit;
}

export const FraudKpiCards: React.FC<FraudKpiCardsProps> = ({ fraudAudit }) => {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))',
        gap: '1.25rem',
        marginBottom: '2rem',
      }}
    >
      <div className="card" style={{ borderLeft: '4px solid var(--color-status-danger)' }}>
        <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-ink-muted)' }}>
          Flagged Transactions (is_fraud = 1.0)
        </div>
        <div style={{ fontSize: '1.875rem', fontWeight: 800, color: 'var(--color-status-danger)', margin: '0.25rem 0' }}>
          {formatNumber(fraudAudit.flaggedCount)}
        </div>
        <div style={{ fontSize: '0.8125rem', color: 'var(--color-ink-secondary)' }}>
          {fraudAudit.flaggedPct}% of analyzed card volume
        </div>
      </div>

      <div className="card" style={{ borderLeft: '4px solid var(--color-status-success)' }}>
        <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-ink-muted)' }}>
          Verified Legitimate (is_fraud = 0.0)
        </div>
        <div style={{ fontSize: '1.875rem', fontWeight: 800, color: 'var(--color-status-success)', margin: '0.25rem 0' }}>
          {formatNumber(fraudAudit.legitimateCount)}
        </div>
        <div style={{ fontSize: '0.8125rem', color: 'var(--color-ink-secondary)' }}>
          44.57% legitimate transactions
        </div>
      </div>

      <div className="card" style={{ borderLeft: '4px solid var(--color-status-warning)' }}>
        <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-ink-muted)' }}>
          Unlabelled Records
        </div>
        <div style={{ fontSize: '1.875rem', fontWeight: 800, color: 'var(--color-status-warning)', margin: '0.25rem 0' }}>
          {formatNumber(fraudAudit.unlabelledCount)}
        </div>
        <div style={{ fontSize: '0.8125rem', color: 'var(--color-ink-secondary)' }}>
          6.28% missing fraud label in raw source
        </div>
      </div>

      <div className="card" style={{ borderLeft: '4px solid var(--color-facet-financial)' }}>
        <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-ink-muted)' }}>
          Total Flagged Volume
        </div>
        <div style={{ fontSize: '1.875rem', fontWeight: 800, color: 'var(--color-facet-financial)', margin: '0.25rem 0' }}>
          {formatINR(fraudAudit.flaggedVolume)}
        </div>
        <div style={{ fontSize: '0.8125rem', color: 'var(--color-ink-secondary)' }}>
          Risk exposure across merchant categories
        </div>
      </div>
    </div>
  );
};
