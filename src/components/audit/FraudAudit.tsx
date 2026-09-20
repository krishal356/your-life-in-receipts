import React from 'react';
import { Lock } from 'lucide-react';
import { FraudKpiCards } from './FraudKpiCards';
import { FraudSampleTable } from './FraudSampleTable';
import financialDataRaw from '../../data/financial-insights.json';
import { FinancialInsights } from '../../types';

const financialData = financialDataRaw as FinancialInsights;

export const FraudAudit: React.FC = () => {
  const { fraudAudit, sampleFlaggedRecords } = financialData;

  return (
    <section aria-label="Dataset Risk and Fraud Audit" style={{ marginBottom: '3.5rem' }}>
      <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 2rem auto' }}>
        <h2
          style={{
            fontSize: '1.75rem',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            color: 'var(--color-ink-primary)',
            marginBottom: '0.5rem',
          }}
        >
          Dataset Risk & Fraud Audit
        </h2>
        <p style={{ fontSize: '0.9375rem', color: 'var(--color-ink-secondary)' }}>
          Auditing pre-existing anomaly labels and risk indicators in the India Multi-Facet Dataset (2022–2024).
        </p>
      </div>

      {/* Safety Notice Card */}
      <div
        style={{
          backgroundColor: 'var(--color-surface)',
          border: '1px solid #fecaca',
          borderRadius: 'var(--radius-lg)',
          padding: '1.25rem 1.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          marginBottom: '2rem',
        }}
      >
        <div style={{ color: 'var(--color-status-danger)', display: 'flex', alignItems: 'center' }}>
          <Lock size={28} />
        </div>
        <div>
          <div style={{ fontWeight: 700, fontSize: '0.9375rem', color: 'var(--color-ink-primary)', marginBottom: '0.2rem' }}>
            Data Privacy & Scope Notice
          </div>
          <p style={{ fontSize: '0.8125rem', color: 'var(--color-ink-secondary)', lineHeight: 1.5 }}>
            This section visualizes and audits the <strong>is_fraud</strong> labels present in the source dataset. It does not run an active predictive machine-learning model. All credit card numbers are strictly masked (e.g. <code>**** **** **** 1234</code>) and all raw customer identifiers and street addresses are suppressed.
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <FraudKpiCards fraudAudit={fraudAudit} />

      {/* Sample Records Table */}
      <FraudSampleTable records={sampleFlaggedRecords} />
    </section>
  );
};
