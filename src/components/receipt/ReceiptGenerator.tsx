import React, { useState, useMemo } from 'react';
import { Printer, Copy, Check, SlidersHorizontal, RefreshCw, Calendar, Tag, Download } from 'lucide-react';
import { ThermalReceipt } from './ThermalReceipt';
import curatedDataRaw from '../../data/curated-receipts.json';
import timelineDataRaw from '../../data/timeline-summary.json';
import { ReceiptItem, GeneratedReceipt, FacetType, TimelineSummary } from '../../types';

const curatedItems = curatedDataRaw as ReceiptItem[];
const timelineData = timelineDataRaw as TimelineSummary;

type PresetKey = 'all-time' | 'hustle-2016' | 'living-2017' | 'surge-2020' | 'commerce-2023';

export const ReceiptGenerator: React.FC = () => {
  const [selectedPreset, setSelectedPreset] = useState<PresetKey>('all-time');
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [selectedFacet, setSelectedFacet] = useState<FacetType>('all');
  const [itemLimit, setItemLimit] = useState<number>(8);
  const [copied, setCopied] = useState<boolean>(false);
  const [downloaded, setDownloaded] = useState<boolean>(false);

  // Preset definitions
  const presets: { id: PresetKey; label: string; year: string; facet: FacetType; desc: string }[] = [
    { id: 'all-time', label: 'All-Time Master', year: 'all', facet: 'all', desc: '11-year composite life ledger' },
    { id: 'hustle-2016', label: '2016: The Hustle Year', year: '2016', facet: 'all', desc: 'Work routines & everyday soundtracks' },
    { id: 'living-2017', label: '2017: Peak Household', year: '2017', facet: 'household', desc: '₹6.5L household expenses & groceries' },
    { id: 'surge-2020', label: '2020: Streaming Surge', year: '2020', facet: 'spotify', desc: '920.7 hours of pandemic listening' },
    { id: 'commerce-2023', label: '2023: Digital Commerce', year: '2023', facet: 'all', desc: 'Travel & modern card spending' },
  ];

  const handleSelectPreset = (preset: (typeof presets)[0]) => {
    setSelectedPreset(preset.id);
    setSelectedYear(preset.year);
    setSelectedFacet(preset.facet);
  };

  // Compile active receipt dynamically from real curated data
  const generatedReceipt: GeneratedReceipt = useMemo(() => {
    let filtered = [...curatedItems];

    if (selectedYear !== 'all') {
      filtered = filtered.filter((item) => item.date.startsWith(selectedYear));
    }

    if (selectedFacet !== 'all') {
      filtered = filtered.filter((item) => item.facet === selectedFacet);
    }

    // Deterministic selection up to itemLimit
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
    const presetObj = presets.find((p) => p.id === selectedPreset);
    const title = presetObj ? presetObj.label : `${activeYearsText} Custom Receipt`;

    return {
      receiptId: `REC-${selectedYear === 'all' ? 'ALL' : selectedYear}-${sliceItems.length}`,
      timestamp: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
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
  }, [selectedYear, selectedFacet, itemLimit, selectedPreset]);

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadSvg = () => {
    const itemsSvg = generatedReceipt.items
      .map(
        (it, idx) =>
          `<text x="24" y="${170 + idx * 26}" font-family="monospace" font-size="12" fill="#191715" font-weight="bold">${it.primaryLabel.slice(0, 24)}</text>` +
          `<text x="360" y="${170 + idx * 26}" font-family="monospace" font-size="12" fill="#191715" text-anchor="end">${it.valueDisplay}</text>`
      )
      .join('\n');

    const totalHeight = 320 + generatedReceipt.items.length * 26;
    const grandTotal = ((generatedReceipt.totals.totalExpenseINR || 0) + (generatedReceipt.totals.totalCardINR || 0)).toLocaleString('en-IN');

    const svgContent = `<?xml version="1.0" standalone="no"?>
<svg width="380" height="${totalHeight}" viewBox="0 0 380 ${totalHeight}" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="#fffefb" stroke="#e3dcce" stroke-width="2"/>
  <text x="190" y="36" font-family="monospace" font-size="10" fill="#857c72" text-anchor="middle" letter-spacing="2">* OFFICIAL LIFE LEDGER *</text>
  <text x="190" y="60" font-family="monospace" font-size="16" fill="#191715" font-weight="bold" text-anchor="middle">YOUR LIFE, IN RECEIPTS</text>
  <text x="190" y="80" font-family="monospace" font-size="10" fill="#57514a" text-anchor="middle">${generatedReceipt.timestamp} • TERMINAL #LEDGER</text>
  <text x="190" y="100" font-family="monospace" font-size="12" fill="#c2410c" font-weight="bold" text-anchor="middle">${generatedReceipt.title.toUpperCase()}</text>
  <line x1="20" y1="120" x2="360" y2="120" stroke="#857c72" stroke-dasharray="4"/>
  <text x="24" y="140" font-family="monospace" font-size="10" fill="#857c72" font-weight="bold">ITEM / RECORD</text>
  <text x="360" y="140" font-family="monospace" font-size="10" fill="#857c72" font-weight="bold" text-anchor="end">VALUE</text>
  <line x1="20" y1="148" x2="360" y2="148" stroke="#191715" stroke-width="1"/>
  ${itemsSvg}
  <line x1="20" y1="${180 + generatedReceipt.items.length * 26}" x2="360" y2="${180 + generatedReceipt.items.length * 26}" stroke="#857c72" stroke-dasharray="4"/>
  <text x="24" y="${210 + generatedReceipt.items.length * 26}" font-family="monospace" font-size="13" fill="#191715" font-weight="bold">TOTAL OUTLAY:</text>
  <text x="360" y="${210 + generatedReceipt.items.length * 26}" font-family="monospace" font-size="14" fill="#191715" font-weight="bold" text-anchor="end">₹${grandTotal}</text>
  <text x="190" y="${250 + generatedReceipt.items.length * 26}" font-family="monospace" font-size="10" fill="#857c72" text-anchor="middle">${generatedReceipt.barcodeValue}</text>
</svg>`;

    const blob = new Blob([svgContent], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `receipt-${generatedReceipt.receiptId}.svg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2000);
  };

  const handleCopySummary = async () => {
    const summaryText = `🧾 YOUR LIFE, IN RECEIPTS — ${generatedReceipt.title}\n` +
      `Date: ${generatedReceipt.timestamp}\n` +
      `Items: ${generatedReceipt.items.length}\n` +
      `Total Spend: ₹${((generatedReceipt.totals.totalExpenseINR || 0) + (generatedReceipt.totals.totalCardINR || 0)).toLocaleString('en-IN')}\n` +
      `Tracks/Soundtrack: ${generatedReceipt.totals.totalListeningTime || 'N/A'}\n` +
      `---\n` +
      generatedReceipt.items.map((i) => `• ${i.primaryLabel} — ${i.valueDisplay}`).join('\n');

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
        <h2 style={{ fontSize: '1.75rem', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--color-ink-primary)', marginBottom: '0.5rem' }}>
          Thermal Receipt Generator
        </h2>
        <p style={{ fontSize: '0.9375rem', color: 'var(--color-ink-secondary)' }}>
          Synthesize any era or facet into a tactile digital receipt. Download, copy summary, or print directly.
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2rem',
          alignItems: 'start',
        }}
      >
        {/* Controls Column */}
        <div className="card no-print" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Preset Buttons */}
          <div>
            <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-ink-muted)', marginBottom: '0.75rem' }}>
              Era Presets
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {presets.map((preset) => {
                const isSelected = selectedPreset === preset.id;
                return (
                  <button
                    key={preset.id}
                    onClick={() => handleSelectPreset(preset)}
                    className={`btn ${isSelected ? 'btn-primary' : 'btn-secondary'}`}
                    style={{ justifyContent: 'space-between', textAlign: 'left', width: '100%' }}
                    aria-pressed={isSelected}
                  >
                    <div>
                      <div style={{ fontWeight: 700 }}>{preset.label}</div>
                      <div style={{ fontSize: '0.75rem', opacity: isSelected ? 0.9 : 0.7 }}>{preset.desc}</div>
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
              <label htmlFor="year-select" style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-ink-secondary)', marginBottom: '0.35rem' }}>
                Timeline Year
              </label>
              <select
                id="year-select"
                value={selectedYear}
                onChange={(e) => {
                  setSelectedYear(e.target.value);
                  setSelectedPreset('all-time');
                }}
                style={{
                  width: '100%',
                  padding: '0.625rem 0.875rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--color-border)',
                  backgroundColor: 'var(--color-surface)',
                }}
              >
                <option value="all">All Years (2013–2024 Composite)</option>
                {timelineData.years.map((y) => (
                  <option key={y.year} value={y.year}>
                    {y.year} — {y.highlightText}
                  </option>
                ))}
              </select>
            </div>

            {/* Facet Selector */}
            <div style={{ marginBottom: '1rem' }}>
              <label htmlFor="facet-select" style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-ink-secondary)', marginBottom: '0.35rem' }}>
                Data Facet
              </label>
              <select
                id="facet-select"
                value={selectedFacet}
                onChange={(e) => {
                  setSelectedFacet(e.target.value as FacetType);
                  setSelectedPreset('all-time');
                }}
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
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-ink-secondary)', marginBottom: '0.35rem' }}>
                <span>Receipt Item Count:</span>
                <span style={{ fontWeight: 700, color: 'var(--color-accent-primary)' }}>{itemLimit} items</span>
              </div>
              <input
                type="range"
                min="4"
                max="14"
                value={itemLimit}
                onChange={(e) => setItemLimit(parseInt(e.target.value, 10))}
                aria-label="Adjust number of items in receipt"
                style={{ width: '100%', accentColor: 'var(--color-accent-primary)' }}
              />
            </div>
          </div>

          {/* Action Bar */}
          <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '1.25rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <button onClick={handlePrint} className="btn btn-primary" aria-label="Print or Save PDF Receipt">
              <Printer size={18} />
              <span>Print Receipt</span>
            </button>
            <button onClick={handleDownloadSvg} className="btn btn-secondary" aria-label="Download thermal receipt as vector SVG file">
              {downloaded ? <Check size={18} color="var(--color-status-success)" /> : <Download size={18} />}
              <span>{downloaded ? 'Saved SVG!' : 'Download SVG'}</span>
            </button>
            <button onClick={handleCopySummary} className="btn btn-secondary" aria-label="Copy receipt text summary">
              {copied ? <Check size={18} color="var(--color-status-success)" /> : <Copy size={18} />}
              <span>{copied ? 'Copied!' : 'Copy Summary'}</span>
            </button>
            <button
              onClick={() => {
                setSelectedPreset('all-time');
                setSelectedYear('all');
                setSelectedFacet('all');
                setItemLimit(8);
              }}
              className="btn btn-secondary"
              aria-label="Reset generator to default"
            >
              <RefreshCw size={16} />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* Live Thermal Receipt Preview Column */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '0.75rem', fontSize: '0.8125rem', color: 'var(--color-ink-muted)' }}>
            <Calendar size={14} />
            <span>Interactive Thermal Output Preview</span>
          </div>
          <ThermalReceipt receipt={generatedReceipt} />
        </div>
      </div>
    </section>
  );
};
