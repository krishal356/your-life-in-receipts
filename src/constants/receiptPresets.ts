import { FacetType } from '../types';

export type PresetKey = 'all-time' | 'hustle-2016' | 'living-2017' | 'surge-2020' | 'commerce-2023';

export interface ReceiptPreset {
  id: PresetKey;
  label: string;
  year: string;
  facet: FacetType;
  desc: string;
  defaultLimit?: number;
}

export const RECEIPT_PRESETS: ReceiptPreset[] = [
  {
    id: 'all-time',
    label: 'All-Time Master',
    year: 'all',
    facet: 'all',
    desc: '11-year composite life ledger',
  },
  {
    id: 'hustle-2016',
    label: '2016: The Hustle Year',
    year: '2016',
    facet: 'all',
    desc: 'Work routines & everyday soundtracks',
  },
  {
    id: 'living-2017',
    label: '2017: Peak Household',
    year: '2017',
    facet: 'household',
    desc: '₹6.5L household expenses & groceries',
  },
  {
    id: 'surge-2020',
    label: '2020: Streaming Surge',
    year: '2020',
    facet: 'spotify',
    desc: '920.7 hours of pandemic listening',
  },
  {
    id: 'commerce-2023',
    label: '2023: Digital Commerce',
    year: '2023',
    facet: 'all',
    desc: 'Travel & modern card spending',
  },
];

export const RECEIPT_ITEM_LIMITS = {
  MIN: 4,
  MAX: 14,
  DEFAULT: 8,
} as const;
