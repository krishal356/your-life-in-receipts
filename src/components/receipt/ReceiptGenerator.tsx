import React, { useState, useMemo } from 'react';
import { ThermalReceipt } from './ThermalReceipt';
import { ReceiptControls } from './ReceiptControls';
import { ReceiptActions } from './ReceiptActions';
import curatedDataRaw from '../../data/curated-receipts.json';
import timelineDataRaw from '../../data/timeline-summary.json';
import { ReceiptItem, FacetType, TimelineSummary } from '../../types';
import { PresetKey, ReceiptPreset, RECEIPT_ITEM_LIMITS } from '../../constants/receiptPresets';
import { compileReceipt } from '../../selectors/receiptSelectors';
import { generateReceiptSvg, generateReceiptTextSummary, downloadSvgFile } from '../../utils/exportReceipt';

const curatedItems = curatedDataRaw as ReceiptItem[];
const timelineData = timelineDataRaw as TimelineSummary;

export const ReceiptGenerator: React.FC = () => {
  const [selectedPreset, setSelectedPreset] = useState<PresetKey>('all-time');
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [selectedFacet, setSelectedFacet] = useState<FacetType>('all');
  const [itemLimit, setItemLimit] = useState<number>(RECEIPT_ITEM_LIMITS.DEFAULT);
  const [copied, setCopied] = useState<boolean>(false);
  const [downloaded, setDownloaded] = useState<boolean>(false);

  const handleSelectPreset = (preset: ReceiptPreset) => {
    setSelectedPreset(preset.id);
    setSelectedYear(preset.year);
    setSelectedFacet(preset.facet);
  };

  const handleYearChange = (year: string) => {
    setSelectedYear(year);
    setSelectedPreset('all-time');
  };

  const handleFacetChange = (facet: FacetType) => {
    setSelectedFacet(facet);
    setSelectedPreset('all-time');
  };

  // Compile active receipt dynamically via pure selector
  const generatedReceipt = useMemo(() => {
    return compileReceipt({
      items: curatedItems,
      selectedPreset,
      selectedYear,
      selectedFacet,
      itemLimit,
    });
  }, [selectedYear, selectedFacet, itemLimit, selectedPreset]);

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadSvg = () => {
    const svgContent = generateReceiptSvg(generatedReceipt);
    downloadSvgFile(`receipt-${generatedReceipt.receiptId}.svg`, svgContent);
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2000);
  };

  const handleCopySummary = async () => {
    const summaryText = generateReceiptTextSummary(generatedReceipt);
    try {
      await navigator.clipboard.writeText(summaryText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      alert('Summary copied to clipboard!');
    }
  };

  return (
    <section aria-label="Thermal Receipt Generator" style={{ marginBottom: '3.5rem' }}>
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
          Thermal Receipt Generator
        </h2>
        <p style={{ fontSize: '0.9375rem', color: 'var(--color-ink-secondary)' }}>
          Synthesize any life era or domain facet into an authentic, tactile thermal receipt slip. Download, copy summary, or print directly.
        </p>
      </div>

      <div
        className="receipt-layout-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
          gap: '2rem',
          alignItems: 'start',
        }}
      >
        {/* Controls Column */}
        <ReceiptControls
          selectedPreset={selectedPreset}
          selectedYear={selectedYear}
          selectedFacet={selectedFacet}
          itemLimit={itemLimit}
          timelineYears={timelineData.years}
          onSelectPreset={handleSelectPreset}
          onYearChange={handleYearChange}
          onFacetChange={handleFacetChange}
          onLimitChange={setItemLimit}
        />

        {/* Receipt Display Column */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <ThermalReceipt receipt={generatedReceipt} />
          <ReceiptActions
            onPrint={handlePrint}
            onDownloadSvg={handleDownloadSvg}
            onCopySummary={handleCopySummary}
            copied={copied}
            downloaded={downloaded}
          />
        </div>
      </div>
    </section>
  );
};
