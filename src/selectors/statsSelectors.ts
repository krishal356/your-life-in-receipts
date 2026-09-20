// src/selectors/statsSelectors.ts — Pure derived KPI metrics across datasets
import { TimelineSummary, SpotifyInsights, HouseholdInsights, FinancialInsights } from '../types';

export interface GlobalKpiMetrics {
  totalSoundHours: number;
  totalStreams: number;
  topArtistName: string;
  topArtistHours: number;
  totalHouseholdSpend: number;
  totalHouseholdIncome: number;
  totalCardVolume: number;
  averageCardTicket: number;
  fraudFlaggedCount: number;
  fraudFlaggedPct: number;
}

export function deriveGlobalKpis(
  _timeline: TimelineSummary,
  spotify: SpotifyInsights,
  household: HouseholdInsights,
  financial: FinancialInsights
): GlobalKpiMetrics {
  return {
    totalSoundHours: spotify.overall.totalHours,
    totalStreams: spotify.overall.totalStreams,
    topArtistName: spotify.topArtists[0]?.name || 'Unknown',
    topArtistHours: spotify.topArtists[0]?.hours || 0,
    totalHouseholdSpend: household.summary.totalExpense,
    totalHouseholdIncome: household.summary.totalIncome,
    totalCardVolume: financial.summary.totalVolume,
    averageCardTicket: financial.summary.averageAmount,
    fraudFlaggedCount: financial.fraudAudit.flaggedCount,
    fraudFlaggedPct: financial.fraudAudit.flaggedPct,
  };
}
