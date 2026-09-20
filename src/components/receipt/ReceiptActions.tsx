import React from 'react';
import { Printer, Download, Copy, Check } from 'lucide-react';

interface ReceiptActionsProps {
  onPrint: () => void;
  onDownloadSvg: () => void;
  onCopySummary: () => void;
  copied: boolean;
  downloaded: boolean;
}

export const ReceiptActions: React.FC<ReceiptActionsProps> = ({
  onPrint,
  onDownloadSvg,
  onCopySummary,
  copied,
  downloaded,
}) => {
  return (
    <div
      className="no-print"
      style={{
        display: 'flex',
        gap: '0.75rem',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginTop: '1.25rem',
      }}
    >
      <button
        onClick={onPrint}
        className="btn btn-primary"
        aria-label="Print or Save PDF Thermal Receipt"
      >
        <Printer size={18} />
        <span>Print Slip</span>
      </button>

      <button
        onClick={onDownloadSvg}
        className="btn btn-secondary"
        aria-label="Download high-resolution vector SVG receipt"
      >
        {downloaded ? <Check size={18} color="var(--color-status-success)" /> : <Download size={18} />}
        <span>{downloaded ? 'Downloaded!' : 'Download SVG'}</span>
      </button>

      <button
        onClick={onCopySummary}
        className="btn btn-secondary"
        aria-label="Copy itemized receipt summary to clipboard"
      >
        {copied ? <Check size={18} color="var(--color-status-success)" /> : <Copy size={18} />}
        <span>{copied ? 'Copied to Clipboard!' : 'Copy Summary'}</span>
      </button>
    </div>
  );
};
