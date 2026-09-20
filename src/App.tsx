import React, { useState } from 'react';
import { Header } from './components/layout/Header';
import { Navbar, NavTab } from './components/layout/Navbar';
import { StatBar } from './components/layout/StatBar';
import { Footer } from './components/layout/Footer';
import { Overview } from './components/overview/Overview';
import { ReceiptGenerator } from './components/receipt/ReceiptGenerator';
import { FacetExplorer } from './components/facets/FacetExplorer';
import { TimelineLedger } from './components/timeline/TimelineLedger';
import { FraudAudit } from './components/audit/FraudAudit';

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
      </main>

      {/* Footer & Compliance Metadata */}
      <Footer />
    </div>
  );
};

export default App;
