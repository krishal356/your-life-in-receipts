import React from 'react';
import { Search, ArrowUpDown, RefreshCw } from 'lucide-react';
import { FacetType, TimelineCoverage } from '../../types';

interface TimelineToolbarProps {
  searchQuery: string;
  selectedFacet: FacetType;
  selectedYear: string;
  sortOrder: 'desc' | 'asc';
  timelineYears: TimelineCoverage[];
  onSearchChange: (query: string) => void;
  onFacetChange: (facet: FacetType) => void;
  onYearChange: (year: string) => void;
  onSortToggle: () => void;
  onReset: () => void;
}

export const TimelineToolbar: React.FC<TimelineToolbarProps> = ({
  searchQuery,
  selectedFacet,
  selectedYear,
  sortOrder,
  timelineYears,
  onSearchChange,
  onFacetChange,
  onYearChange,
  onSortToggle,
  onReset,
}) => {
  return (
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
        className="timeline-filter-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))',
          gap: '1rem',
          alignItems: 'center',
        }}
      >
        {/* Search Input */}
        <div style={{ position: 'relative' }}>
          <Search
            size={18}
            style={{
              position: 'absolute',
              left: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--color-ink-muted)',
            }}
          />
          <input
            type="text"
            placeholder="Search by artist, food note, category, or merchant (e.g. Beatles, tea, Travel)..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            aria-label="Search timeline records by artist, note, category, or merchant"
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
            onChange={(e) => onFacetChange(e.target.value as FacetType)}
            aria-label="Filter timeline by life facet"
            style={{
              width: '100%',
              padding: '0.625rem 0.875rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--color-border)',
              backgroundColor: 'var(--color-canvas)',
            }}
          >
            <option value="all">All Facets (Composite)</option>
            <option value="spotify">🎵 Spotify Only</option>
            <option value="household">☕ Household Spend Only</option>
            <option value="financial">💳 Card Commerce Only</option>
          </select>
        </div>

        {/* Year Filter */}
        <div>
          <select
            value={selectedYear}
            onChange={(e) => onYearChange(e.target.value)}
            aria-label="Filter timeline records by year"
            style={{
              width: '100%',
              padding: '0.625rem 0.875rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--color-border)',
              backgroundColor: 'var(--color-canvas)',
            }}
          >
            <option value="all">All Years (2013–2024)</option>
            {timelineYears.map((y) => (
              <option key={y.year} value={y.year}>
                {y.year} — {y.highlightText}
              </option>
            ))}
          </select>
        </div>

        {/* Sort & Reset Buttons */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <button
            onClick={onSortToggle}
            className="btn btn-secondary"
            aria-label={`Toggle sort order: currently ${sortOrder === 'desc' ? 'Newest First' : 'Oldest First'}`}
            style={{ flex: 1 }}
          >
            <ArrowUpDown size={16} />
            <span>{sortOrder === 'desc' ? 'Newest' : 'Oldest'}</span>
          </button>

          <button
            onClick={onReset}
            className="btn btn-secondary"
            aria-label="Reset all search and filter criteria"
            title="Reset Filters"
          >
            <RefreshCw size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
