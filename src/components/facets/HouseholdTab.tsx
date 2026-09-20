import React from 'react';
import { ShoppingBag, Coffee, CreditCard } from 'lucide-react';
import householdDataRaw from '../../data/household-insights.json';
import { HouseholdInsights } from '../../types';

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
            ₹{householdData.summary.totalExpense.toLocaleString('en-IN')} in Household Outlay
          </h3>
          <p style={{ fontSize: '0.875rem', color: 'var(--color-ink-secondary)' }}>
            2,176 individual expenses and micro-moments across food, rent, transit & investments.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <div style={{ textAlign: 'center', background: '#ffffff', padding: '0.75rem 1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-facet-household-border)' }}>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-status-success)' }}>
              ₹{householdData.summary.totalIncome.toLocaleString('en-IN')}
            </div>
            <div style={{ fontSize: '0.6875rem', color: 'var(--color-ink-muted)', textTransform: 'uppercase' }}>Total Inflow</div>
          </div>
          <div style={{ textAlign: 'center', background: '#ffffff', padding: '0.75rem 1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-facet-household-border)' }}>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-facet-household)' }}>
              ₹{householdData.summary.totalTransferOut.toLocaleString('en-IN')}
            </div>
            <div style={{ fontSize: '0.6875rem', color: 'var(--color-ink-muted)', textTransform: 'uppercase' }}>Investments & PPF</div>
          </div>
        </div>
      </div>

      {/* Grid: Category Breakdown & Memorable Micro-Moments */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
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
                    ₹{cat.totalAmount.toLocaleString('en-IN')}
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
                  borderLeft: '3px solid var(--color-facet-household)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.25rem' }}>
                  <div style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--color-ink-primary)' }}>
                    "{moment.note}"
                  </div>
                  <span style={{ fontWeight: 800, fontSize: '0.875rem', color: 'var(--color-ink-primary)', whiteSpace: 'nowrap', marginLeft: '0.5rem' }}>
                    ₹{moment.amount.toLocaleString('en-IN')}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--color-ink-muted)' }}>
                  <span>{moment.category} • {moment.mode}</span>
                  <span>{moment.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Payment Modes */}
      <div className="card">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
          <CreditCard size={20} color="var(--color-facet-household)" />
          <h4 style={{ fontSize: '1.0625rem', fontWeight: 800, color: 'var(--color-ink-primary)' }}>
            Payment Channel Breakdown
          </h4>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
          {householdData.paymentModes.map((pm) => (
            <div key={pm.mode} style={{ backgroundColor: 'var(--color-canvas)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
              <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--color-ink-muted)' }}>{pm.mode}</div>
              <div style={{ fontSize: '1.125rem', fontWeight: 800, color: 'var(--color-ink-primary)', margin: '0.25rem 0' }}>
                ₹{pm.totalAmount.toLocaleString('en-IN')}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-ink-secondary)' }}>{pm.count} transactions</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
