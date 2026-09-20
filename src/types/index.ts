// src/types/index.ts — Authoritative TypeScript Contracts for "Your Life, In Receipts"

export type FacetType = 'all' | 'spotify' | 'household' | 'financial';

export interface TimelineCoverage {
  year: string;
  hasSpotify: boolean;
  hasHousehold: boolean;
  hasFinancial: boolean;
  totalListeningHours: number;
  totalHouseholdSpend: number;
  totalCardSpend: number;
  activeFacets: FacetType[];
  highlightText: string;
}

export interface TimelineSummary {
  timelineSpan: { minYear: string; maxYear: string };
  totalStreams: number;
  totalListeningHours: number;
  totalHouseholdSpend: number;
  totalCardSpend: number;
  totalTransactions: number;
  years: TimelineCoverage[];
}

export interface SpotifyArtistInsight {
  name: string;
  hours: number;
  streams: number;
  topTrack?: string;
}

export interface SpotifyTrackInsight {
  name: string;
  artist: string;
  plays: number;
  durationMinutes: number;
}

export interface SpotifyYearlyStats {
  year: string;
  streams: number;
  hours: number;
  topArtist: string;
  skipRatePct: number;
}

export interface SpotifyInsights {
  overall: {
    totalStreams: number;
    totalHours: number;
    uniqueArtists: number;
    uniqueTracks: number;
    uniqueAlbums: number;
    skipRatePct: number;
    shuffleRatePct: number;
    topPlatforms: { platform: string; count: number; percentage: number }[];
  };
  topArtists: SpotifyArtistInsight[];
  topTracks: SpotifyTrackInsight[];
  yearly: SpotifyYearlyStats[];
  playbackTriggers: { trigger: string; count: number }[];
}

export interface CategoryBreakdown {
  category: string;
  totalAmount: number;
  count: number;
  percentage: number;
}

export interface MicroMomentItem {
  id: string;
  date: string;
  category: string;
  subcategory: string;
  note: string;
  amount: number;
  mode: string;
}

export interface HouseholdInsights {
  summary: {
    totalExpense: number;
    totalIncome: number;
    totalTransferOut: number;
    netSavingsEstimated: number;
    transactionCount: number;
    dateSpan: { start: string; end: string };
  };
  categories: CategoryBreakdown[];
  paymentModes: { mode: string; count: number; totalAmount: number }[];
  yearlySpend: { year: string; spend: number; transactions: number }[];
  memorableMicroMoments: MicroMomentItem[];
}

export interface FinancialFraudAudit {
  totalAnalyzed: number;
  flaggedCount: number;
  flaggedPct: number;
  legitimateCount: number;
  unlabelledCount: number;
  flaggedVolume: number;
  yearlyFraud: { year: string; flagged: number; total: number }[];
}

export interface MaskedFinancialTransaction {
  id: string;
  date: string;
  merchant: string;
  category: string;
  amount: number;
  maskedCard: string;
  locationState: string;
  jobCategory: string;
  isFlagged: boolean;
}

export interface FinancialInsights {
  summary: {
    totalVolume: number;
    transactionCount: number;
    averageAmount: number;
    medianAmount: number;
    dateSpan: { start: string; end: string };
  };
  categories: CategoryBreakdown[];
  topStates: { state: string; count: number; totalAmount: number }[];
  topOccupations: { job: string; count: number }[];
  fraudAudit: FinancialFraudAudit;
  sampleFlaggedRecords: MaskedFinancialTransaction[];
}

export interface ReceiptItem {
  id: string;
  facet: 'spotify' | 'household' | 'financial';
  date: string;
  primaryLabel: string;
  secondaryLabel: string;
  valueDisplay: string;
  numericAmount?: number;
  isFlaggedRisk?: boolean;
  categoryBadge: string;
}

export interface GeneratedReceipt {
  receiptId: string;
  timestamp: string;
  title: string;
  eraSubtitle: string;
  activeFacets: FacetType[];
  items: ReceiptItem[];
  totals: {
    totalListeningTime?: string;
    totalExpenseINR?: number;
    totalCardINR?: number;
    grandTotalItems: number;
  };
  barcodeValue: string;
}
