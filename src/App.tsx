import React, { useState, Suspense, lazy } from 'react';
import { Header } from './components/layout/Header';
import { Navbar, NavTab } from './components/layout/Navbar';
import { StatBar } from './components/layout/StatBar';
import { Footer } from './components/layout/Footer';
import { Overview } from './components/overview/Overview';

// Code-split heavy interactive sub-views for optimal First Load JS and performance
const ReceiptGenerator = lazy(() =>
  import('./components/receipt/ReceiptGenerator').then((m) => ({ default: m.ReceiptGenerator }))
);
const FacetExplorer = lazy(() =>
  import('./components/facets/FacetExplorer').then((m) => ({ default: m.FacetExplorer }))
);
const TimelineLedger = lazy(() =>
  import('./components/timeline/TimelineLedger').then((m) => ({ default: m.TimelineLedger }))
);
const FraudAudit = lazy(() =>
  import('./components/audit/FraudAudit').then((m) => ({ default: m.FraudAudit }))
);

const TabLoadingFallback: React.FC = () => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '4rem 1rem',
      gap: '1rem',
      color: 'var(--color-ink-muted)',
    }}
    role="status"
    aria-label="Loading section content..."
  >
    <div
      style={{
        width: '36px',
        height: '36px',
        borderRadius: '50%',
        border: '3px solid var(--color-border)',
        borderTopColor: 'var(--color-accent-primary)',
        animation: 'spin 1s linear infinite',
      }}
    />
    <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>Synthesizing ledger data...</span>
  </div>
);

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<NavTab>('overview');

  return (
    <div className="app-wrapper">
      {/* Header & Main Branding */}
      <Header />

      {/* Global Real-Time Stat Bar */}
      <StatBar />

      {/* Primary Section Navigation */}
      <Navbar activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Main Application Content Area */}
      <main className="main-content" id="main-content">
        <Suspense fallback={<TabLoadingFallback />}>
          {activeTab === 'overview' && (
            <Overview
              onNavigateToTab={(tab) => {
                if (tab === 'generator') setActiveTab('generator');
                else if (tab === 'facets') setActiveTab('facets');
                else if (tab === 'timeline') setActiveTab('timeline');
                else if (tab === 'audit') setActiveTab('audit');
              }}
            />
          )}

          {activeTab === 'generator' && <ReceiptGenerator />}

          {activeTab === 'facets' && <FacetExplorer />}

          {activeTab === 'timeline' && <TimelineLedger />}

          {activeTab === 'audit' && <FraudAudit />}
        </Suspense>
      </main>

      {/* Footer & Compliance Metadata */}
      <Footer />
    </div>
  );
};

export default App;
