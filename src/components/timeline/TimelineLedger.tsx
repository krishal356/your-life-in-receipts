import React, { useState, useMemo } from 'react';
import { TimelineToolbar } from './TimelineToolbar';
import { TimelineItemCard } from './TimelineItemCard';
import { EmptyState } from '../common/EmptyState';
import curatedDataRaw from '../../data/curated-receipts.json';
import timelineDataRaw from '../../data/timeline-summary.json';
import { ReceiptItem, FacetType, TimelineSummary } from '../../types';
import { filterTimelineItems } from '../../selectors/timelineSelectors';

const curatedItems = curatedDataRaw as ReceiptItem[];
const timelineData = timelineDataRaw as TimelineSummary;

export const TimelineLedger: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedFacet, setSelectedFacet] = useState<FacetType>('all');
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');
  const [displayLimit, setDisplayLimit] = useState<number>(25);

  const filteredItems = useMemo(() => {
    return filterTimelineItems({
      items: curatedItems,
      searchQuery,
      selectedFacet,
      selectedYear,
      sortOrder,
    });
  }, [searchQuery, selectedFacet, selectedYear, sortOrder]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedFacet('all');
    setSelectedYear('all');
    setSortOrder('desc');
    setDisplayLimit(25);
  };

  const visibleItems = filteredItems.slice(0, displayLimit);
  const hasMore = visibleItems.length < filteredItems.length;

  return (
    <section aria-label="Chronological Timeline Ledger" style={{ marginBottom: '3.5rem' }}>
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
          Timeline Ledger
        </h2>
        <p style={{ fontSize: '0.9375rem', color: 'var(--color-ink-secondary)' }}>
          Search and compound-filter across 11 years of music streams, household notes, and card transactions.
        </p>
      </div>

      {/* Filter Toolbar */}
      <TimelineToolbar
        searchQuery={searchQuery}
        selectedFacet={selectedFacet}
        selectedYear={selectedYear}
        sortOrder={sortOrder}
        timelineYears={timelineData.years}
        onSearchChange={setSearchQuery}
        onFacetChange={setSelectedFacet}
        onYearChange={setSelectedYear}
        onSortToggle={() => setSortOrder((prev) => (prev === 'desc' ? 'asc' : 'desc'))}
        onReset={handleResetFilters}
      />

      {/* Results Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1rem',
          fontSize: '0.8125rem',
          color: 'var(--color-ink-muted)',
        }}
      >
        <div>
          Showing <strong>{visibleItems.length}</strong> of <strong>{filteredItems.length}</strong> matching records
        </div>
        <div>
          Sorted by <strong>{sortOrder === 'desc' ? 'Newest Date First' : 'Oldest Date First'}</strong>
        </div>
      </div>

      {/* Items List */}
      {visibleItems.length === 0 ? (
        <EmptyState
          title="No timeline records found"
          description="Try broadening your search query, selecting 'All Facets', or adjusting the year filter."
          onReset={handleResetFilters}
          resetLabel="Reset Search & Filters"
        />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {visibleItems.map((item) => (
            <TimelineItemCard key={item.id} item={item} />
          ))}

          {hasMore && (
            <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
              <button
                onClick={() => setDisplayLimit((prev) => prev + 25)}
                className="btn btn-secondary"
                style={{ minWidth: '220px' }}
                aria-label={`Load next 25 records. Currently showing ${visibleItems.length} of ${filteredItems.length}`}
              >
                Load More Records ({filteredItems.length - visibleItems.length} remaining)
              </button>
            </div>
          )}
        </div>
      )}
    </section>
  );
};
