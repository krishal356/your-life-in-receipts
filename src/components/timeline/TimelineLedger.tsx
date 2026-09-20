import React, { useState, useMemo } from 'react';
import { Search, Clock, ArrowUpDown, RefreshCw } from 'lucide-react';
import { EmptyState } from '../common/EmptyState';
import curatedDataRaw from '../../data/curated-receipts.json';
import timelineDataRaw from '../../data/timeline-summary.json';
import { ReceiptItem, FacetType, TimelineSummary } from '../../types';

const curatedItems = curatedDataRaw as ReceiptItem[];
const timelineData = timelineDataRaw as TimelineSummary;

export const TimelineLedger: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedFacet, setSelectedFacet] = useState<FacetType>('all');
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');
  const [displayLimit, setDisplayLimit] = useState<number>(25);

  const filteredItems = useMemo(() => {
    let result = [...curatedItems];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (item) =>
          item.primaryLabel.toLowerCase().includes(q) ||
          item.secondaryLabel.toLowerCase().includes(q) ||
          item.categoryBadge.toLowerCase().includes(q) ||
          item.date.includes(q)
      );
    }

    if (selectedFacet !== 'all') {
      result = result.filter((item) => item.facet === selectedFacet);
    }

    if (selectedYear !== 'all') {
      result = result.filter((item) => item.date.startsWith(selectedYear));
    }

    result.sort((a, b) => {
      return sortOrder === 'desc' ? b.date.localeCompare(a.date) : a.date.localeCompare(b.date);
    });

    return result;
  }, [searchQuery, selectedFacet, selectedYear, sortOrder]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedFacet('all');
    setSelectedYear('all');
    setSortOrder('desc');
    setDisplayLimit(25);
  };

  return (
    <section aria-label="Chronological Timeline Ledger" style={{ marginBottom: '3.5rem' }}>
      <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 2rem auto' }}>
        <div className="badge" style={{ backgroundColor: 'var(--color-canvas-subtle)', color: 'var(--color-ink-secondary)', marginBottom: '0.75rem' }}>
          <Clock size={14} />
          <span>Universal Chronological Ledger</span>
        </div>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--color-ink-primary)', marginBottom: '0.5rem' }}>
          Timeline Ledger
        </h2>
        <p style={{ fontSize: '0.9375rem', color: 'var(--color-ink-secondary)' }}>
          Search and compound-filter across 11 years of music streams, household notes, and card transactions.
        </p>
      </div>

      {/* Filter Toolbar */}
      <div
        className="card"
        style={{
          marginBottom: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem',
            alignItems: 'center',
          }}
        >
          {/* Search Input */}
          <div style={{ position: 'relative', gridColumn: 'span 2' }}>
            <Search
              size={18}
              style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-ink-muted)' }}
            />
            <input
              type="text"
              placeholder="Search by artist, food note, category, or merchant (e.g., Beatles, tea, Travel)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search timeline records"
              style={{
                width: '100%',
                padding: '0.625rem 0.875rem 0.625rem 2.5rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--color-border)',
                backgroundColor: 'var(--color-canvas)',
              }}
            />
          </div>

          {/* Facet Filter */}
          <div>
            <select
              value={selectedFacet}
              onChange={(e) => setSelectedFacet(e.target.value as FacetType)}
              aria-label="Filter by data facet"
              style={{
                width: '100%',
                padding: '0.625rem 0.875rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--color-border)',
                backgroundColor: 'var(--color-canvas)',
              }}
            >
              <option value="all">All Facets</option>
              <option value="spotify">🎵 Spotify Only</option>
              <option value="household">☕ Household Spend Only</option>
              <option value="financial">💳 Card Commerce Only</option>
            </select>
          </div>

          {/* Year Filter */}
          <div>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              aria-label="Filter by timeline year"
              style={{
                width: '100%',
                padding: '0.625rem 0.875rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--color-border)',
                backgroundColor: 'var(--color-canvas)',
              }}
            >
              <option value="all">All Years (2013–2024)</option>
              {timelineData.years.map((y) => (
                <option key={y.year} value={y.year}>
                  {y.year} ({y.activeFacets.join(', ')})
                </option>
              ))}
            </select>
          </div>

          {/* Sort & Reset */}
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              onClick={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')}
              className="btn btn-secondary"
              style={{ flex: 1 }}
              aria-label={`Sort ${sortOrder === 'desc' ? 'Oldest First' : 'Newest First'}`}
            >
              <ArrowUpDown size={16} />
              <span>{sortOrder === 'desc' ? 'Newest' : 'Oldest'}</span>
            </button>
            <button
              onClick={handleResetFilters}
              className="btn btn-secondary"
              aria-label="Reset all search and filter criteria"
            >
              <RefreshCw size={16} />
            </button>
          </div>
        </div>

        {/* Active Filter Indicators */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8125rem', color: 'var(--color-ink-muted)' }}>
          <span>
            Showing <strong>{Math.min(filteredItems.length, displayLimit)}</strong> of <strong>{filteredItems.length}</strong> matching ledger entries
          </span>
          {(searchQuery || selectedFacet !== 'all' || selectedYear !== 'all') && (
            <button onClick={handleResetFilters} style={{ color: 'var(--color-accent-primary)', fontWeight: 600, textDecoration: 'underline' }}>
              Clear active filters
            </button>
          )}
        </div>
      </div>

      {/* Ledger Items List */}
      {filteredItems.length === 0 ? (
        <EmptyState
          title="No Matching Ledger Records"
          description={`No receipts found matching "${searchQuery}" for the selected facet and year scope.`}
          onReset={handleResetFilters}
        />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {filteredItems.slice(0, displayLimit).map((item) => (
            <div
              key={item.id}
              style={{
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-md)',
                padding: '1rem 1.25rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '0.75rem',
                transition: 'all var(--transition-fast)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', minWidth: '240px', flex: 1 }}>
                <span
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    padding: '0.2rem 0.5rem',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor:
                      item.facet === 'spotify'
                        ? 'var(--color-facet-spotify-bg)'
                        : item.facet === 'household'
                        ? 'var(--color-facet-household-bg)'
                        : 'var(--color-facet-financial-bg)',
                    color:
                      item.facet === 'spotify'
                        ? 'var(--color-facet-spotify)'
                        : item.facet === 'household'
                        ? 'var(--color-facet-household)'
                        : 'var(--color-facet-financial)',
                  }}
                >
                  {item.facet === 'spotify' ? '♪ SOUND' : item.facet === 'household' ? '☕ LIVING' : '💳 CARD'}
                </span>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.9375rem', color: 'var(--color-ink-primary)' }}>
                    {item.primaryLabel}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-ink-secondary)' }}>
                    {item.secondaryLabel}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', textAlign: 'right' }}>
                <span className="badge" style={{ backgroundColor: 'var(--color-canvas-subtle)', color: 'var(--color-ink-muted)' }}>
                  {item.date}
                </span>
                <span style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--color-ink-primary)', minWidth: '90px' }}>
                  {item.valueDisplay}
                </span>
              </div>
            </div>
          ))}

          {/* Load More Button */}
          {displayLimit < filteredItems.length && (
            <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
              <button
                onClick={() => setDisplayLimit((prev) => prev + 25)}
                className="btn btn-secondary"
                aria-label="Load more timeline entries"
              >
                Load More Entries ({filteredItems.length - displayLimit} remaining)
              </button>
            </div>
          )}
        </div>
      )}
    </section>
  );
};
