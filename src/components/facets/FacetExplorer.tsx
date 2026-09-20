import React, { useState } from 'react';
import { Music, ShoppingBag, CreditCard, Layers } from 'lucide-react';
import { SpotifyTab } from './SpotifyTab';
import { HouseholdTab } from './HouseholdTab';
import { FinancialTab } from './FinancialTab';

export const FacetExplorer: React.FC = () => {
  const [activeFacet, setActiveFacet] = useState<'spotify' | 'household' | 'financial'>('spotify');

  return (
    <section aria-label="The Three Life Facets" style={{ marginBottom: '3.5rem' }}>
      <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 2rem auto' }}>
        <div className="badge" style={{ backgroundColor: 'var(--color-canvas-subtle)', color: 'var(--color-ink-secondary)', marginBottom: '0.75rem' }}>
          <Layers size={14} />
          <span>Tri-Facet Deep Dives</span>
        </div>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--color-ink-primary)', marginBottom: '0.5rem' }}>
          The Three Life Facets
        </h2>
        <p style={{ fontSize: '0.9375rem', color: 'var(--color-ink-secondary)' }}>
          Explore sound, daily household routines, and modern card commerce as interconnected threads of one life story.
        </p>
      </div>

      {/* Segmented Facet Tabs */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '0.75rem',
          marginBottom: '2rem',
          flexWrap: 'wrap',
        }}
        role="tablist"
        aria-label="Facet Selection Tabs"
      >
        <button
          onClick={() => setActiveFacet('spotify')}
          role="tab"
          aria-selected={activeFacet === 'spotify'}
          className="btn"
          style={{
            backgroundColor: activeFacet === 'spotify' ? 'var(--color-facet-spotify)' : 'var(--color-surface)',
            color: activeFacet === 'spotify' ? '#ffffff' : 'var(--color-ink-secondary)',
            border: `1px solid ${activeFacet === 'spotify' ? 'var(--color-facet-spotify)' : 'var(--color-border)'}`,
            boxShadow: activeFacet === 'spotify' ? '0 2px 8px rgba(5, 150, 105, 0.3)' : 'var(--shadow-sm)',
          }}
        >
          <Music size={18} />
          <span>1. Cultural Soundtrack (Spotify)</span>
        </button>

        <button
          onClick={() => setActiveFacet('household')}
          role="tab"
          aria-selected={activeFacet === 'household'}
          className="btn"
          style={{
            backgroundColor: activeFacet === 'household' ? 'var(--color-facet-household)' : 'var(--color-surface)',
            color: activeFacet === 'household' ? '#ffffff' : 'var(--color-ink-secondary)',
            border: `1px solid ${activeFacet === 'household' ? 'var(--color-facet-household)' : 'var(--color-border)'}`,
            boxShadow: activeFacet === 'household' ? '0 2px 8px rgba(37, 99, 235, 0.3)' : 'var(--shadow-sm)',
          }}
        >
          <ShoppingBag size={18} />
          <span>2. Household Living (2015–2018)</span>
        </button>

        <button
          onClick={() => setActiveFacet('financial')}
          role="tab"
          aria-selected={activeFacet === 'financial'}
          className="btn"
          style={{
            backgroundColor: activeFacet === 'financial' ? 'var(--color-facet-financial)' : 'var(--color-surface)',
            color: activeFacet === 'financial' ? '#ffffff' : 'var(--color-ink-secondary)',
            border: `1px solid ${activeFacet === 'financial' ? 'var(--color-facet-financial)' : 'var(--color-border)'}`,
            boxShadow: activeFacet === 'financial' ? '0 2px 8px rgba(124, 58, 237, 0.3)' : 'var(--shadow-sm)',
          }}
        >
          <CreditCard size={18} />
          <span>3. Card Commerce (2022–2024)</span>
        </button>
      </div>

      {/* Active Tab Body */}
      <div>
        {activeFacet === 'spotify' && <SpotifyTab />}
        {activeFacet === 'household' && <HouseholdTab />}
        {activeFacet === 'financial' && <FinancialTab />}
      </div>
    </section>
  );
};
