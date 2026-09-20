import React from 'react';
import timelineDataRaw from '../../data/timeline-summary.json';
import spotifyDataRaw from '../../data/spotify-insights.json';
import householdDataRaw from '../../data/household-insights.json';
import financialDataRaw from '../../data/financial-insights.json';
import { TimelineSummary, SpotifyInsights, HouseholdInsights, FinancialInsights } from '../../types';

const timelineData = timelineDataRaw as TimelineSummary;
const spotifyData = spotifyDataRaw as SpotifyInsights;
const householdData = householdDataRaw as HouseholdInsights;
const financialData = financialDataRaw as FinancialInsights;

interface OverviewProps {
  onNavigateToTab: (tab: 'generator' | 'facets' | 'timeline' | 'audit') => void;
}

export const Overview: React.FC<OverviewProps> = ({ onNavigateToTab }) => {
  return (
    <section aria-label="Executive Overview Ledger" style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
      {/* Hero Intro */}
      <div
        style={{
          background: 'linear-gradient(135deg, #ffffff 0%, var(--color-surface-elevated) 100%)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-xl)',
          padding: '2.5rem 2rem',
          boxShadow: 'var(--shadow-md)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{ maxWidth: '780px', position: 'relative', zIndex: 2 }}>
          <h2 style={{ fontSize: '2.25rem', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.2, color: 'var(--color-ink-primary)', marginBottom: '1rem' }}>
            Your Life, Itemized in Receipts.
          </h2>
          <p style={{ fontSize: '1.0625rem', color: 'var(--color-ink-secondary)', lineHeight: 1.6, marginBottom: '1.75rem' }}>
            Transforming <strong>149,860 music streams</strong>, <strong>2,461 daily household expenses</strong>, and <strong>10,267 card commerce transactions</strong> into an editorial, tactile personal ledger. Discover how your soundtrack, spending habits, and digital footprints evolved over a decade.
          </p>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <button onClick={() => onNavigateToTab('generator')} className="btn btn-primary" aria-label="Open Thermal Receipt Generator">
              Generate Life Receipt
            </button>
            <button onClick={() => onNavigateToTab('facets')} className="btn btn-secondary" aria-label="Explore the Three Facets">
              Explore 3 Facets
            </button>
          </div>
        </div>
      </div>

      {/* 4 KPI Summary Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1.25rem',
        }}
      >
        {/* KPI 1: Spotify */}
        <div className="card" style={{ borderTop: '4px solid var(--color-facet-spotify)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
            <div style={{ fontSize: '0.8125rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-ink-muted)', letterSpacing: '0.05em' }}>
              🎵 Cultural Soundtrack
            </div>
            <span className="badge badge-spotify">2013–2024</span>
          </div>
          <div style={{ fontSize: '1.875rem', fontWeight: 800, color: 'var(--color-ink-primary)', marginBottom: '0.25rem' }}>
            {spotifyData.overall.totalHours.toLocaleString()} hrs
          </div>
          <div style={{ fontSize: '0.8125rem', color: 'var(--color-ink-secondary)', marginBottom: '0.75rem' }}>
            Across {spotifyData.overall.totalStreams.toLocaleString()} streams • Top: <strong>{spotifyData.topArtists[0].name}</strong> ({spotifyData.topArtists[0].hours}h)
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-ink-muted)', borderTop: '1px solid var(--color-border-subtle)', paddingTop: '0.5rem' }}>
            {spotifyData.overall.uniqueArtists.toLocaleString()} artists • {spotifyData.overall.skipRatePct}% skip rate
          </div>
        </div>

        {/* KPI 2: Household Spend */}
        <div className="card" style={{ borderTop: '4px solid var(--color-facet-household)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
            <div style={{ fontSize: '0.8125rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-ink-muted)', letterSpacing: '0.05em' }}>
              ☕ Household Living
            </div>
            <span className="badge badge-household">2015–2018</span>
          </div>
          <div style={{ fontSize: '1.875rem', fontWeight: 800, color: 'var(--color-ink-primary)', marginBottom: '0.25rem' }}>
            ₹{householdData.summary.totalExpense.toLocaleString('en-IN')}
          </div>
          <div style={{ fontSize: '0.8125rem', color: 'var(--color-ink-secondary)', marginBottom: '0.75rem' }}>
            2,176 daily expenses • Top: <strong>{householdData.categories[0].category}</strong>
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-ink-muted)', borderTop: '1px solid var(--color-border-subtle)', paddingTop: '0.5rem' }}>
            ₹{householdData.summary.totalIncome.toLocaleString('en-IN')} income • 50+ micro-notes
          </div>
        </div>

        {/* KPI 3: Card Commerce */}
        <div className="card" style={{ borderTop: '4px solid var(--color-facet-financial)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
            <div style={{ fontSize: '0.8125rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-ink-muted)', letterSpacing: '0.05em' }}>
              💳 Card Commerce
            </div>
            <span className="badge badge-financial">2022–2024</span>
          </div>
          <div style={{ fontSize: '1.875rem', fontWeight: 800, color: 'var(--color-ink-primary)', marginBottom: '0.25rem' }}>
            ₹{financialData.summary.totalVolume.toLocaleString('en-IN')}
          </div>
          <div style={{ fontSize: '0.8125rem', color: 'var(--color-ink-secondary)', marginBottom: '0.75rem' }}>
            10,267 transactions • Avg: <strong>₹{financialData.summary.averageAmount.toLocaleString('en-IN')}</strong>
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-ink-muted)', borderTop: '1px solid var(--color-border-subtle)', paddingTop: '0.5rem' }}>
            Top: {financialData.categories[0].category} (₹{financialData.categories[0].totalAmount.toLocaleString('en-IN')})
          </div>
        </div>

        {/* KPI 4: Dataset Risk Audit */}
        <div className="card" style={{ borderTop: '4px solid var(--color-status-danger)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
            <div style={{ fontSize: '0.8125rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-ink-muted)', letterSpacing: '0.05em' }}>
              🛡️ Dataset Risk Audit
            </div>
            <span className="badge badge-danger">5,046 Flagged</span>
          </div>
          <div style={{ fontSize: '1.875rem', fontWeight: 800, color: 'var(--color-status-danger)', marginBottom: '0.25rem' }}>
            {financialData.fraudAudit.flaggedPct}%
          </div>
          <div style={{ fontSize: '0.8125rem', color: 'var(--color-ink-secondary)', marginBottom: '0.75rem' }}>
            Flagged vs 4,576 verified legitimate records
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-ink-muted)', borderTop: '1px solid var(--color-border-subtle)', paddingTop: '0.5rem' }}>
            Card numbers masked (**** **** **** 1234)
          </div>
        </div>
      </div>

      {/* Dataset Coverage Timeline Matrix */}
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 800, color: 'var(--color-ink-primary)' }}>
              Chronological Facet Coverage (2013–2024)
            </h3>
            <p style={{ fontSize: '0.8125rem', color: 'var(--color-ink-muted)' }}>
              Transparent timeline indicating exact dataset representation across life eras
            </p>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <span className="badge badge-spotify">🎵 Spotify (11.4y)</span>
            <span className="badge badge-household">☕ Household (3.75y)</span>
            <span className="badge badge-financial">💳 Multi-Facet (2y)</span>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '0.75rem' }}>
          {timelineData.years.map((y) => (
            <div
              key={y.year}
              style={{
                backgroundColor: 'var(--color-canvas)',
                borderRadius: 'var(--radius-md)',
                padding: '0.875rem',
                border: '1px solid var(--color-border-subtle)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                <span style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--color-ink-primary)' }}>{y.year}</span>
                <div style={{ display: 'flex', gap: '0.2rem' }}>
                  {y.hasSpotify && <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--color-facet-spotify)' }} title="Spotify Available" />}
                  {y.hasHousehold && <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--color-facet-household)' }} title="Household Available" />}
                  {y.hasFinancial && <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--color-facet-financial)' }} title="Financial Available" />}
                </div>
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-ink-secondary)', fontWeight: 600, minHeight: '32px' }}>
                {y.highlightText}
              </div>
              <div style={{ fontSize: '0.6875rem', color: 'var(--color-ink-muted)', marginTop: '0.4rem', borderTop: '1px solid var(--color-border-subtle)', paddingTop: '0.3rem' }}>
                {y.totalListeningHours > 0 && `${y.totalListeningHours}h sound`}
                {y.totalHouseholdSpend > 0 && ` • ₹${(y.totalHouseholdSpend / 1000).toFixed(0)}k spend`}
                {y.totalCardSpend > 0 && ` • ₹${(y.totalCardSpend / 100000).toFixed(1)}L card`}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
