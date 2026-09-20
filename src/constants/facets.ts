import { FacetType } from '../types';

export interface FacetMetadata {
  id: FacetType;
  label: string;
  shortLabel: string;
  badgeClass: string;
  color: string;
  bgColor: string;
  borderColor: string;
  iconSymbol: string;
  spanText: string;
}

export const FACET_METADATA: Record<FacetType, FacetMetadata> = {
  all: {
    id: 'all',
    label: 'Unified All Facets',
    shortLabel: 'All Facets',
    badgeClass: 'badge',
    color: 'var(--color-ink-primary)',
    bgColor: 'var(--color-canvas)',
    borderColor: 'var(--color-border)',
    iconSymbol: '🧾',
    spanText: '2013–2024 (11.4 Years)',
  },
  spotify: {
    id: 'spotify',
    label: 'Cultural Soundtrack (Spotify)',
    shortLabel: 'Spotify',
    badgeClass: 'badge badge-spotify',
    color: 'var(--color-facet-spotify)',
    bgColor: 'var(--color-facet-spotify-bg)',
    borderColor: 'var(--color-facet-spotify-border)',
    iconSymbol: '🎵',
    spanText: '2013–2024 (11.4 Years)',
  },
  household: {
    id: 'household',
    label: 'Household Living (2015–2018)',
    shortLabel: 'Household',
    badgeClass: 'badge badge-household',
    color: 'var(--color-facet-household)',
    bgColor: 'var(--color-facet-household-bg)',
    borderColor: 'var(--color-facet-household-border)',
    iconSymbol: '☕',
    spanText: '2015–2018 (~3.75 Years)',
  },
  financial: {
    id: 'financial',
    label: 'Card Commerce (2022–2024)',
    shortLabel: 'Commerce',
    badgeClass: 'badge badge-financial',
    color: 'var(--color-facet-financial)',
    bgColor: 'var(--color-facet-financial-bg)',
    borderColor: 'var(--color-facet-financial-border)',
    iconSymbol: '💳',
    spanText: '2022–2024 (2.0 Years)',
  },
};
