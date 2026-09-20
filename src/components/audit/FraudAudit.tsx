import React from 'react';
import { Lock, EyeOff } from 'lucide-react';
import financialDataRaw from '../../data/financial-insights.json';
import { FinancialInsights } from '../../types';

const financialData = financialDataRaw as FinancialInsights;

export const FraudAudit: React.FC = () => {
  const { fraudAudit, sampleFlaggedRecords } = financialData;

  return (
    <section aria-label="Dataset Risk and Fraud Audit" style={{ marginBottom: '3.5rem' }}>
      <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 2rem auto' }}>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--color-ink-primary)', marginBottom: '0.5rem' }}>
          Dataset Risk & Fraud Audit
        </h2>
        <p style={{ fontSize: '0.9375rem', color: 'var(--color-ink-secondary)' }}>
          Auditing the pre-existing fraud labels and risk anomalies in the India Multi-Facet Dataset (2022–2024).
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
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '1.25rem',
          marginBottom: '2rem',
        }}
      >
        <div className="card" style={{ borderLeft: '4px solid var(--color-status-danger)' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-ink-muted)' }}>
            Flagged Transactions (is_fraud = 1.0)
          </div>
          <div style={{ fontSize: '1.875rem', fontWeight: 800, color: 'var(--color-status-danger)', margin: '0.25rem 0' }}>
            {fraudAudit.flaggedCount.toLocaleString()}
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
            {fraudAudit.legitimateCount.toLocaleString()}
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
            {fraudAudit.unlabelledCount.toLocaleString()}
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
            ₹{fraudAudit.flaggedVolume.toLocaleString('en-IN')}
          </div>
          <div style={{ fontSize: '0.8125rem', color: 'var(--color-ink-secondary)' }}>
            Value associated with flagged transactions
          </div>
        </div>
      </div>

      {/* Yearly Fraud Breakdown */}
      <div className="card" style={{ marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.0625rem', fontWeight: 800, color: 'var(--color-ink-primary)', marginBottom: '1rem' }}>
          Yearly Flagged Risk Distribution
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
          {fraudAudit.yearlyFraud.map((yf) => (
            <div key={yf.year} style={{ backgroundColor: 'var(--color-canvas)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
              <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--color-ink-muted)' }}>Year {yf.year}</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-status-danger)', margin: '0.25rem 0' }}>
                {yf.flagged.toLocaleString()} Flagged
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-ink-secondary)' }}>
                out of {yf.total.toLocaleString()} total ({((yf.flagged / yf.total) * 100).toFixed(1)}%)
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Masked Flagged Records Table */}
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div>
            <h3 style={{ fontSize: '1.0625rem', fontWeight: 800, color: 'var(--color-ink-primary)' }}>
              Sample Flagged Transaction Records (Masked)
            </h3>
            <p style={{ fontSize: '0.8125rem', color: 'var(--color-ink-muted)' }}>
              Anonymized records demonstrating dataset audit classification
            </p>
          </div>
          <span className="badge badge-danger">
            <EyeOff size={14} />
            <span>PII Masked</span>
          </span>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--color-border)', color: 'var(--color-ink-muted)', fontSize: '0.75rem', textTransform: 'uppercase' }}>
                <th style={{ padding: '0.75rem 0.5rem' }}>Status</th>
                <th style={{ padding: '0.75rem 0.5rem' }}>Date</th>
                <th style={{ padding: '0.75rem 0.5rem' }}>Merchant Name</th>
                <th style={{ padding: '0.75rem 0.5rem' }}>Category</th>
                <th style={{ padding: '0.75rem 0.5rem' }}>Location</th>
                <th style={{ padding: '0.75rem 0.5rem' }}>Masked Card</th>
                <th style={{ padding: '0.75rem 0.5rem', textAlign: 'right' }}>Amount</th>
              </tr>
            </thead>
            <tbody>
              {sampleFlaggedRecords.slice(0, 10).map((rec) => (
                <tr key={rec.id} style={{ borderBottom: '1px solid var(--color-border-subtle)' }}>
                  <td style={{ padding: '0.75rem 0.5rem' }}>
                    <span className="badge badge-danger">Flagged</span>
                  </td>
                  <td style={{ padding: '0.75rem 0.5rem', color: 'var(--color-ink-secondary)', whiteSpace: 'nowrap' }}>
                    {rec.date}
                  </td>
                  <td style={{ padding: '0.75rem 0.5rem', fontWeight: 700, color: 'var(--color-ink-primary)' }}>
                    {rec.merchant}
                  </td>
                  <td style={{ padding: '0.75rem 0.5rem', textTransform: 'capitalize', color: 'var(--color-ink-secondary)' }}>
                    {rec.category.replace(/_/g, ' ')}
                  </td>
                  <td style={{ padding: '0.75rem 0.5rem', color: 'var(--color-ink-secondary)' }}>
                    {rec.locationState}
                  </td>
                  <td style={{ padding: '0.75rem 0.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.8125rem', color: 'var(--color-ink-muted)' }}>
                    {rec.maskedCard}
                  </td>
                  <td style={{ padding: '0.75rem 0.5rem', textAlign: 'right', fontWeight: 800, color: 'var(--color-ink-primary)' }}>
                    ₹{rec.amount.toLocaleString('en-IN')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
