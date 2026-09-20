// src/selectors/timelineSelectors.ts — Pure selectors for compound timeline search, filtering, and sorting
import { ReceiptItem, FacetType } from '../types';

export interface FilterTimelineParams {
  items: ReceiptItem[];
  searchQuery: string;
  selectedFacet: FacetType;
  selectedYear: string;
  sortOrder: 'desc' | 'asc';
}

/**
 * Pure selector that applies compound filtering (search + facet + year + sort)
 */
export function filterTimelineItems({
  items,
  searchQuery,
  selectedFacet,
  selectedYear,
  sortOrder,
}: FilterTimelineParams): ReceiptItem[] {
  let result = [...items];

  const trimmedQuery = searchQuery.trim().toLowerCase();
  if (trimmedQuery) {
    result = result.filter(
      (item) =>
        item.primaryLabel.toLowerCase().includes(trimmedQuery) ||
        item.secondaryLabel.toLowerCase().includes(trimmedQuery) ||
        item.categoryBadge.toLowerCase().includes(trimmedQuery) ||
        item.date.includes(trimmedQuery)
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
}
