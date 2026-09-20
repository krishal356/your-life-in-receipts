import React from 'react';
import { ShoppingBag, Coffee } from 'lucide-react';
import householdDataRaw from '../../data/household-insights.json';
import { HouseholdInsights } from '../../types';
import { formatINR } from '../../utils/formatters';

const householdData = householdDataRaw as HouseholdInsights;

export const HouseholdTab: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Top Banner */}
      <div
        style={{
          backgroundColor: 'var(--color-facet-household-bg)',
          border: '1px solid var(--color-facet-household-border)',
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
          <div className="badge badge-household" style={{ marginBottom: '0.5rem' }}>
            <ShoppingBag size={14} />
            <span>Living Spend Receipt • 2015–2018 (~3.75 Years)</span>
          </div>
          <h3 style={{ fontSize: '1.375rem', fontWeight: 800, color: 'var(--color-ink-primary)', marginBottom: '0.25rem' }}>
            {formatINR(householdData.summary.totalExpense)} in Household Outlay
          </h3>
          <p style={{ fontSize: '0.875rem', color: 'var(--color-ink-secondary)' }}>
            2,176 individual expenses and micro-moments across food, rent, transit & investments.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <div style={{ textAlign: 'center', background: '#ffffff', padding: '0.75rem 1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-facet-household-border)' }}>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-status-success)' }}>
              {formatINR(householdData.summary.totalIncome)}
            </div>
            <div style={{ fontSize: '0.6875rem', color: 'var(--color-ink-muted)', textTransform: 'uppercase' }}>Total Inflow</div>
          </div>
          <div style={{ textAlign: 'center', background: '#ffffff', padding: '0.75rem 1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-facet-household-border)' }}>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-facet-household)' }}>
              {formatINR(householdData.summary.totalTransferOut)}
            </div>
            <div style={{ fontSize: '0.6875rem', color: 'var(--color-ink-muted)', textTransform: 'uppercase' }}>Investments & PPF</div>
          </div>
        </div>
      </div>

      {/* Grid: Category Breakdown & Memorable Micro-Moments */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '1.5rem' }}>
        {/* Category Breakdown */}
        <div className="card">
          <h4 style={{ fontSize: '1.0625rem', fontWeight: 800, color: 'var(--color-ink-primary)', marginBottom: '1.25rem' }}>
            Household Expense Categories
          </h4>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {householdData.categories.slice(0, 8).map((cat) => (
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
                  <div style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--color-ink-primary)' }}>{cat.category}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-ink-muted)' }}>{cat.count} transactions ({cat.percentage}%)</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontWeight: 800, fontSize: '0.9375rem', color: 'var(--color-facet-household)' }}>
                    {formatINR(cat.totalAmount)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Memorable Micro-Moments */}
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
            <Coffee size={20} color="var(--color-facet-household)" />
            <h4 style={{ fontSize: '1.0625rem', fontWeight: 800, color: 'var(--color-ink-primary)' }}>
              Memorable Living Micro-Moments
            </h4>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxHeight: '420px', overflowY: 'auto' }}>
            {householdData.memorableMicroMoments.slice(0, 8).map((moment) => (
              <div
                key={moment.id}
                style={{
                  padding: '0.75rem',
                  backgroundColor: 'var(--color-canvas)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--color-border-subtle)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.25rem' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-facet-household)' }}>
                    {moment.category} • {moment.subcategory}
                  </span>
                  <span style={{ fontSize: '0.875rem', fontWeight: 800, color: 'var(--color-ink-primary)' }}>
                    {formatINR(moment.amount)}
                  </span>
                </div>
                <p style={{ fontSize: '0.8125rem', color: 'var(--color-ink-secondary)', fontStyle: 'italic' }}>
                  "{moment.note}"
                </p>
                <div style={{ fontSize: '0.6875rem', color: 'var(--color-ink-muted)', marginTop: '0.35rem' }}>
                  {moment.date} • Paid via {moment.mode}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
