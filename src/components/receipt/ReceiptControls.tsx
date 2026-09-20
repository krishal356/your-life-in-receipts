import React from 'react';
import { SlidersHorizontal, Tag } from 'lucide-react';
import { FacetType, TimelineCoverage } from '../../types';
import { RECEIPT_PRESETS, RECEIPT_ITEM_LIMITS, PresetKey, ReceiptPreset } from '../../constants/receiptPresets';

interface ReceiptControlsProps {
  selectedPreset: PresetKey;
  selectedYear: string;
  selectedFacet: FacetType;
  itemLimit: number;
  timelineYears: TimelineCoverage[];
  onSelectPreset: (preset: ReceiptPreset) => void;
  onYearChange: (year: string) => void;
  onFacetChange: (facet: FacetType) => void;
  onLimitChange: (limit: number) => void;
}

export const ReceiptControls: React.FC<ReceiptControlsProps> = ({
  selectedPreset,
  selectedYear,
  selectedFacet,
  itemLimit,
  timelineYears,
  onSelectPreset,
  onYearChange,
  onFacetChange,
  onLimitChange,
}) => {
  return (
    <div className="card no-print" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Preset Buttons */}
      <div>
        <label
          htmlFor="preset-list"
          style={{
            display: 'block',
            fontSize: '0.8125rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            color: 'var(--color-ink-muted)',
            marginBottom: '0.75rem',
          }}
        >
          Curated Era Presets
        </label>
        <div id="preset-list" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {RECEIPT_PRESETS.map((preset) => {
            const isSelected = selectedPreset === preset.id;
            return (
              <button
                key={preset.id}
                onClick={() => onSelectPreset(preset)}
                className={`btn ${isSelected ? 'btn-primary' : 'btn-secondary'}`}
                style={{
                  justifyContent: 'space-between',
                  textAlign: 'left',
                  width: '100%',
                  padding: '0.75rem 1rem',
                }}
                aria-pressed={isSelected}
                aria-label={`Select preset: ${preset.label} (${preset.desc})`}
              >
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.875rem' }}>{preset.label}</div>
                  <div style={{ fontSize: '0.75rem', opacity: isSelected ? 0.95 : 0.75 }}>{preset.desc}</div>
                </div>
                <Tag size={16} />
              </button>
            );
          })}
        </div>
      </div>

      <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
          <SlidersHorizontal size={18} color="var(--color-accent-primary)" />
          <h3 style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--color-ink-primary)' }}>
            Custom Scope Builder
          </h3>
        </div>

        {/* Year Selector */}
        <div style={{ marginBottom: '1rem' }}>
          <label
            htmlFor="receipt-year-select"
            style={{
              display: 'block',
              fontSize: '0.8125rem',
              fontWeight: 600,
              color: 'var(--color-ink-secondary)',
              marginBottom: '0.35rem',
            }}
          >
            Timeline Era / Year
          </label>
          <select
            id="receipt-year-select"
            value={selectedYear}
            onChange={(e) => onYearChange(e.target.value)}
            aria-label="Filter receipt by year or all-time composite"
            style={{
              width: '100%',
              padding: '0.625rem 0.875rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--color-border)',
              backgroundColor: 'var(--color-surface)',
            }}
          >
            <option value="all">All Years (2013–2024 Composite)</option>
            {timelineYears.map((y) => (
              <option key={y.year} value={y.year}>
                {y.year} — {y.highlightText}
              </option>
            ))}
          </select>
        </div>

        {/* Facet Selector */}
        <div style={{ marginBottom: '1rem' }}>
          <label
            htmlFor="receipt-facet-select"
            style={{
              display: 'block',
              fontSize: '0.8125rem',
              fontWeight: 600,
              color: 'var(--color-ink-secondary)',
              marginBottom: '0.35rem',
            }}
          >
            Life Facet Filter
          </label>
          <select
            id="receipt-facet-select"
            value={selectedFacet}
            onChange={(e) => onFacetChange(e.target.value as FacetType)}
            aria-label="Filter receipt by life facet domain"
            style={{
              width: '100%',
              padding: '0.625rem 0.875rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--color-border)',
              backgroundColor: 'var(--color-surface)',
            }}
          >
            <option value="all">Unified All Facets (Sound + Spend + Card)</option>
            <option value="spotify">🎵 Cultural Facet Only (Spotify)</option>
            <option value="household">☕ Household Living Facet Only</option>
            <option value="financial">💳 Card Commerce Facet Only</option>
          </select>
        </div>

        {/* Item Limit Slider */}
        <div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '0.8125rem',
              fontWeight: 600,
              color: 'var(--color-ink-secondary)',
              marginBottom: '0.35rem',
            }}
          >
            <span>Receipt Item Count:</span>
            <span style={{ fontWeight: 700, color: 'var(--color-accent-primary)' }}>{itemLimit} items</span>
          </div>
          <input
            type="range"
            min={RECEIPT_ITEM_LIMITS.MIN}
            max={RECEIPT_ITEM_LIMITS.MAX}
            value={itemLimit}
            onChange={(e) => onLimitChange(parseInt(e.target.value, 10))}
            aria-label={`Adjust number of items in receipt from ${RECEIPT_ITEM_LIMITS.MIN} to ${RECEIPT_ITEM_LIMITS.MAX}`}
            style={{ width: '100%', accentColor: 'var(--color-accent-primary)' }}
          />
        </div>
      </div>
    </div>
  );
};
