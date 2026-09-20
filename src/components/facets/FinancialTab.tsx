import React from 'react';
import { CreditCard, MapPin, Briefcase } from 'lucide-react';
import financialDataRaw from '../../data/financial-insights.json';
import { FinancialInsights } from '../../types';

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
            ₹{financialData.summary.totalVolume.toLocaleString('en-IN')} in Card Transactions
          </h3>
          <p style={{ fontSize: '0.875rem', color: 'var(--color-ink-secondary)' }}>
            10,267 card transactions across travel, entertainment, e-commerce & medical services.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <div style={{ textAlign: 'center', background: '#ffffff', padding: '0.75rem 1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-facet-financial-border)' }}>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-facet-financial)' }}>
              ₹{financialData.summary.averageAmount.toLocaleString('en-IN')}
            </div>
            <div style={{ fontSize: '0.6875rem', color: 'var(--color-ink-muted)', textTransform: 'uppercase' }}>Average Ticket</div>
          </div>
          <div style={{ textAlign: 'center', background: '#ffffff', padding: '0.75rem 1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-facet-financial-border)' }}>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-ink-primary)' }}>
              ₹{financialData.summary.medianAmount.toLocaleString('en-IN')}
            </div>
            <div style={{ fontSize: '0.6875rem', color: 'var(--color-ink-muted)', textTransform: 'uppercase' }}>Median Ticket</div>
          </div>
        </div>
      </div>

      {/* Grid: Merchant Categories & Top States */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
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
                    {cat.count.toLocaleString()} transactions ({cat.percentage}%)
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontWeight: 800, fontSize: '0.9375rem', color: 'var(--color-facet-financial)' }}>
                    ₹{cat.totalAmount.toLocaleString('en-IN')}
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
            {financialData.topStates.slice(0, 7).map((st) => (
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
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-ink-muted)' }}>{st.count} card transactions</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontWeight: 800, fontSize: '0.9375rem', color: 'var(--color-ink-primary)' }}>
                    ₹{st.totalAmount.toLocaleString('en-IN')}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Occupations */}
      <div className="card">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
          <Briefcase size={20} color="var(--color-facet-financial)" />
          <h4 style={{ fontSize: '1.0625rem', fontWeight: 800, color: 'var(--color-ink-primary)' }}>
            Demographic Occupation Spend Aggregates
          </h4>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem' }}>
          {financialData.topOccupations.slice(0, 8).map((job) => (
            <div key={job.job} style={{ backgroundColor: 'var(--color-canvas)', padding: '0.75rem', borderRadius: 'var(--radius-md)' }}>
              <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--color-ink-primary)' }}>{job.job}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-ink-muted)', marginTop: '0.2rem' }}>
                {job.count} transactions in cohort
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
