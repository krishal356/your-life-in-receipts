// src/utils/exportReceipt.ts — Pure export generators for Standalone SVG, Print, and Clipboard Summary
import { GeneratedReceipt } from '../types';

/**
 * Builds standalone SVG string representing the physical thermal receipt
 */
export function generateReceiptSvg(receipt: GeneratedReceipt): string {
  const itemsSvg = receipt.items
    .map(
      (it, idx) =>
        `<text x="24" y="${170 + idx * 26}" font-family="monospace" font-size="12" fill="#191715" font-weight="bold">${it.primaryLabel.slice(0, 24)}</text>` +
        `<text x="360" y="${170 + idx * 26}" font-family="monospace" font-size="12" fill="#191715" text-anchor="end">${it.valueDisplay}</text>`
    )
    .join('\n');

  const totalHeight = 320 + receipt.items.length * 26;
  const grandTotal = ((receipt.totals.totalExpenseINR || 0) + (receipt.totals.totalCardINR || 0)).toLocaleString('en-IN');

  return `<?xml version="1.0" standalone="no"?>
<svg width="380" height="${totalHeight}" viewBox="0 0 380 ${totalHeight}" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="#fffefb" stroke="#e3dcce" stroke-width="2"/>
  <text x="190" y="36" font-family="monospace" font-size="10" fill="#857c72" text-anchor="middle" letter-spacing="2">* OFFICIAL LIFE LEDGER *</text>
  <text x="190" y="60" font-family="monospace" font-size="16" fill="#191715" font-weight="bold" text-anchor="middle">YOUR LIFE, IN RECEIPTS</text>
  <text x="190" y="80" font-family="monospace" font-size="10" fill="#57514a" text-anchor="middle">${receipt.timestamp} • TERMINAL #LEDGER</text>
  <text x="190" y="100" font-family="monospace" font-size="12" fill="#c2410c" font-weight="bold" text-anchor="middle">${receipt.title.toUpperCase()}</text>
  <line x1="20" y1="120" x2="360" y2="120" stroke="#857c72" stroke-dasharray="4"/>
  <text x="24" y="140" font-family="monospace" font-size="10" fill="#857c72" font-weight="bold">ITEM / RECORD</text>
  <text x="360" y="140" font-family="monospace" font-size="10" fill="#857c72" font-weight="bold" text-anchor="end">VALUE</text>
  <line x1="20" y1="148" x2="360" y2="148" stroke="#191715" stroke-width="1"/>
  ${itemsSvg}
  <line x1="20" y1="${180 + receipt.items.length * 26}" x2="360" y2="${180 + receipt.items.length * 26}" stroke="#857c72" stroke-dasharray="4"/>
  <text x="24" y="${210 + receipt.items.length * 26}" font-family="monospace" font-size="13" fill="#191715" font-weight="bold">TOTAL OUTLAY:</text>
  <text x="360" y="${210 + receipt.items.length * 26}" font-family="monospace" font-size="14" fill="#191715" font-weight="bold" text-anchor="end">₹${grandTotal}</text>
  <text x="190" y="${250 + receipt.items.length * 26}" font-family="monospace" font-size="10" fill="#857c72" text-anchor="middle">${receipt.barcodeValue}</text>
</svg>`;
}

/**
 * Builds formatted text summary of the receipt for clipboard copying
 */
export function generateReceiptTextSummary(receipt: GeneratedReceipt): string {
  const grandTotal = ((receipt.totals.totalExpenseINR || 0) + (receipt.totals.totalCardINR || 0)).toLocaleString('en-IN');
  return `🧾 YOUR LIFE, IN RECEIPTS — ${receipt.title}\n` +
    `Date: ${receipt.timestamp}\n` +
    `Items: ${receipt.items.length}\n` +
    `Total Spend: ₹${grandTotal}\n` +
    `Tracks/Soundtrack: ${receipt.totals.totalListeningTime || 'N/A'}\n` +
    `---\n` +
    receipt.items.map((i) => `• ${i.primaryLabel} — ${i.valueDisplay}`).join('\n');
}

/**
 * Triggers a client-side file download of the SVG receipt
 */
export function downloadSvgFile(filename: string, svgContent: string): void {
  const blob = new Blob([svgContent], { type: 'image/svg+xml' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
