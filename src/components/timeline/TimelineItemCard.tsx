import React from 'react';
import { ReceiptItem } from '../../types';
import { FACET_METADATA } from '../../constants/facets';

interface TimelineItemCardProps {
  item: ReceiptItem;
}

export const TimelineItemCard: React.FC<TimelineItemCardProps> = ({ item }) => {
  const facetMeta = FACET_METADATA[item.facet];

  return (
    <article
      className="card"
      style={{
        padding: '1rem 1.25rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '1rem',
        flexWrap: 'wrap',
      }}
      aria-label={`${item.primaryLabel} on ${item.date}`}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', minWidth: '220px', flex: 1 }}>
        <div
          style={{
            width: '38px',
            height: '38px',
            borderRadius: 'var(--radius-md)',
            backgroundColor: facetMeta.bgColor,
            color: facetMeta.color,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 700,
            fontSize: '1.125rem',
            border: `1px solid ${facetMeta.borderColor}`,
            flexShrink: 0,
          }}
          aria-hidden="true"
        >
          {facetMeta.iconSymbol}
        </div>

        <div style={{ minWidth: 0, flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.2rem' }}>
            <h3 style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--color-ink-primary)', margin: 0 }}>
              {item.primaryLabel}
            </h3>
            <span className={facetMeta.badgeClass} style={{ fontSize: '0.6875rem' }}>
              {item.categoryBadge}
            </span>
            {item.isFlaggedRisk && (
              <span className="badge badge-danger" style={{ fontSize: '0.6875rem' }}>
                Flagged
              </span>
            )}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-ink-secondary)' }}>
            {item.secondaryLabel}
          </div>
        </div>
      </div>

      <div style={{ textAlign: 'right', minWidth: '100px', marginLeft: 'auto' }}>
        <div style={{ fontWeight: 800, fontSize: '1.0625rem', color: 'var(--color-ink-primary)' }}>
          {item.valueDisplay}
        </div>
        <div style={{ fontSize: '0.6875rem', color: 'var(--color-ink-muted)' }}>
          {item.date}
        </div>
      </div>
    </article>
  );
};
