// src/selectors/receiptSelectors.ts — Pure selectors for receipt synthesis and aggregation
import { ReceiptItem, GeneratedReceipt, FacetType } from '../types';
import { RECEIPT_PRESETS, PresetKey } from '../constants/receiptPresets';

export interface CompileReceiptParams {
  items: ReceiptItem[];
  selectedPreset: PresetKey;
  selectedYear: string;
  selectedFacet: FacetType;
  itemLimit: number;
}

/**
 * Pure selector that derives a GeneratedReceipt from source items and user filter parameters
 */
export function compileReceipt({
  items,
  selectedPreset,
  selectedYear,
  selectedFacet,
  itemLimit,
}: CompileReceiptParams): GeneratedReceipt {
  let filtered = [...items];

  if (selectedYear !== 'all') {
    filtered = filtered.filter((item) => item.date.startsWith(selectedYear));
  }

  if (selectedFacet !== 'all') {
    filtered = filtered.filter((item) => item.facet === selectedFacet);
  }

  const sliceItems = filtered.slice(0, itemLimit);

  let totalExpense = 0;
  let totalCard = 0;
  let spotifyCount = 0;

  sliceItems.forEach((item) => {
    if (item.facet === 'household') totalExpense += item.numericAmount || 0;
    if (item.facet === 'financial') totalCard += item.numericAmount || 0;
    if (item.facet === 'spotify') spotifyCount++;
  });

  const activeYearsText = selectedYear === 'all' ? '2013 – 2024' : `Year ${selectedYear}`;
  const presetObj = RECEIPT_PRESETS.find((p) => p.id === selectedPreset);
  const title = presetObj ? presetObj.label : `${activeYearsText} Custom Receipt`;

  return {
    receiptId: `REC-${selectedYear === 'all' ? 'ALL' : selectedYear}-${sliceItems.length}`,
    timestamp: new Date().toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }),
    title,
    eraSubtitle: `Scope: ${activeYearsText} • ${selectedFacet.toUpperCase()} Facet`,
    activeFacets: selectedFacet === 'all' ? ['spotify', 'household', 'financial'] : [selectedFacet],
    items: sliceItems,
    totals: {
      totalListeningTime: spotifyCount > 0 ? `${(spotifyCount * 3.4).toFixed(1)} hrs est.` : undefined,
      totalExpenseINR: totalExpense,
      totalCardINR: totalCard,
      grandTotalItems: sliceItems.length,
    },
    barcodeValue: `*LIFE-${selectedYear === 'all' ? '2013-2024' : selectedYear}-LEDGER*`,
  };
}
