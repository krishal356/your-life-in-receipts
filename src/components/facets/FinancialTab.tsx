import React from 'react';
import { CreditCard, MapPin } from 'lucide-react';
import financialDataRaw from '../../data/financial-insights.json';
import { FinancialInsights } from '../../types';
import { formatINR, formatNumber } from '../../utils/formatters';

const financialData = financialDataRaw as FinancialInsights;

export const FinancialTab: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Top Banner */}
      <div
        style={{
          backgroundColor: 'var(--color-facet-financial-bg)',
          border: '1px solid var(--color-facet-financial-border)',
          borderRadius: 'var(--radius-lg)',
          padding: '1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        <div>
          <div className="badge badge-financial" style={{ marginBottom: '0.5rem' }}>
            <CreditCard size={14} />
            <span>Modern Commerce Receipt • 2022–2024 (2 Years)</span>
          </div>
          <h3 style={{ fontSize: '1.375rem', fontWeight: 800, color: 'var(--color-ink-primary)', marginBottom: '0.25rem' }}>
            {formatINR(financialData.summary.totalVolume)} in Card Transactions
          </h3>
          <p style={{ fontSize: '0.875rem', color: 'var(--color-ink-secondary)' }}>
            {formatNumber(financialData.summary.transactionCount)} card transactions across travel, entertainment, e-commerce & medical services.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <div style={{ textAlign: 'center', background: '#ffffff', padding: '0.75rem 1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-facet-financial-border)' }}>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-facet-financial)' }}>
              {formatINR(financialData.summary.averageAmount)}
            </div>
            <div style={{ fontSize: '0.6875rem', color: 'var(--color-ink-muted)', textTransform: 'uppercase' }}>Average Ticket</div>
          </div>
          <div style={{ textAlign: 'center', background: '#ffffff', padding: '0.75rem 1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-facet-financial-border)' }}>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-ink-primary)' }}>
              {formatINR(financialData.summary.medianAmount)}
            </div>
            <div style={{ fontSize: '0.6875rem', color: 'var(--color-ink-muted)', textTransform: 'uppercase' }}>Median Ticket</div>
          </div>
        </div>
      </div>

      {/* Grid: Merchant Categories & Top States */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '1.5rem' }}>
        {/* Categories */}
        <div className="card">
          <h4 style={{ fontSize: '1.0625rem', fontWeight: 800, color: 'var(--color-ink-primary)', marginBottom: '1.25rem' }}>
            Merchant Category Distribution
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {financialData.categories.map((cat) => (
              <div
                key={cat.category}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '0.625rem 0.75rem',
                  backgroundColor: 'var(--color-canvas)',
                  borderRadius: 'var(--radius-md)',
                }}
              >
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--color-ink-primary)', textTransform: 'capitalize' }}>
                    {cat.category.replace(/_/g, ' ')}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-ink-muted)' }}>
                    {formatNumber(cat.count)} transactions ({cat.percentage}%)
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontWeight: 800, fontSize: '0.9375rem', color: 'var(--color-facet-financial)' }}>
                    {formatINR(cat.totalAmount)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top States */}
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
            <MapPin size={20} color="var(--color-facet-financial)" />
            <h4 style={{ fontSize: '1.0625rem', fontWeight: 800, color: 'var(--color-ink-primary)' }}>
              Geographic Transaction Footprint
            </h4>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {financialData.topStates.slice(0, 8).map((st) => (
              <div
                key={st.state}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '0.625rem 0.75rem',
                  backgroundColor: 'var(--color-canvas)',
                  borderRadius: 'var(--radius-md)',
                }}
              >
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--color-ink-primary)' }}>{st.state}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-ink-muted)' }}>{formatNumber(st.count)} transactions</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontWeight: 800, fontSize: '0.9375rem', color: 'var(--color-facet-financial)' }}>
                    {formatINR(st.totalAmount)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
