import React from 'react';
import { GeneratedReceipt } from '../../types';

interface ThermalReceiptProps {
  receipt: GeneratedReceipt;
}

export const ThermalReceipt: React.FC<ThermalReceiptProps> = ({ receipt }) => {
  return (
    <article className="receipt-container" aria-label={`Thermal Receipt: ${receipt.title}`}>
      {/* Sawtooth Edges */}
      <div className="receipt-jagged-top" aria-hidden="true" />
      <div className="receipt-jagged-bottom" aria-hidden="true" />

      {/* Store Header */}
      <header className="receipt-header">
        <div style={{ fontSize: '0.6875rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--color-ink-muted)', marginBottom: '0.2rem' }}>
          * OFFICIAL LIFE LEDGER *
        </div>
        <h2 className="receipt-store-title">YOUR LIFE, IN RECEIPTS</h2>
        <div className="receipt-meta-line">TERMINAL #LEDGER-01 • REG: IN-DL</div>
        <div className="receipt-meta-line">{receipt.timestamp}</div>
        <div className="receipt-meta-line" style={{ fontWeight: 600, color: 'var(--color-accent-primary)', marginTop: '0.25rem' }}>
          {receipt.title.toUpperCase()}
        </div>
        <div style={{ fontSize: '0.6875rem', color: 'var(--color-ink-muted)', marginTop: '0.15rem' }}>
          {receipt.eraSubtitle}
        </div>
      </header>

      {/* Itemized Table Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.6875rem', fontWeight: 700, borderBottom: '1px solid var(--color-ink-primary)', paddingBottom: '0.25rem', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
        <span>ITEM / DESCRIPTION</span>
        <span>MAGNITUDE</span>
      </div>

      {/* Receipt Line Items */}
      <div style={{ minHeight: '160px' }}>
        {receipt.items.map((item, idx) => (
          <div key={item.id || idx} className="receipt-item-row">
            <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minWidth: 0, paddingRight: '0.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <span
                  style={{
                    fontSize: '0.625rem',
                    fontWeight: 700,
                    padding: '0.05rem 0.3rem',
                    borderRadius: '2px',
                    backgroundColor:
                      item.facet === 'spotify'
                        ? 'var(--color-facet-spotify-bg)'
                        : item.facet === 'household'
                        ? 'var(--color-facet-household-bg)'
                        : 'var(--color-facet-financial-bg)',
                    color:
                      item.facet === 'spotify'
                        ? 'var(--color-facet-spotify)'
                        : item.facet === 'household'
                        ? 'var(--color-facet-household)'
                        : 'var(--color-facet-financial)',
                  }}
                >
                  {item.facet === 'spotify' ? '♪' : item.facet === 'household' ? '☕' : '💳'}
                </span>
                <span className="receipt-item-name" style={{ fontWeight: 600 }}>
                  {item.primaryLabel}
                </span>
              </div>
              <span style={{ fontSize: '0.6875rem', color: 'var(--color-ink-secondary)', paddingLeft: '1.2rem' }}>
                {item.secondaryLabel}
              </span>
            </div>
            <div className="receipt-item-dots" aria-hidden="true" />
            <div className="receipt-item-price">
              {item.valueDisplay}
            </div>
          </div>
        ))}
      </div>

      {/* Totals Section */}
      <section className="receipt-totals-section" aria-label="Receipt Totals">
        <div className="receipt-total-row">
          <span>ITEM COUNT:</span>
          <span>{receipt.totals.grandTotalItems}</span>
        </div>

        {receipt.totals.totalListeningTime && (
          <div className="receipt-total-row">
            <span>SOUNDTRACK TIME:</span>
            <span style={{ color: 'var(--color-facet-spotify)', fontWeight: 600 }}>{receipt.totals.totalListeningTime}</span>
          </div>
        )}

        {typeof receipt.totals.totalExpenseINR === 'number' && receipt.totals.totalExpenseINR > 0 && (
          <div className="receipt-total-row">
            <span>HOUSEHOLD SPEND:</span>
            <span>₹{receipt.totals.totalExpenseINR.toLocaleString('en-IN')}</span>
          </div>
        )}

        {typeof receipt.totals.totalCardINR === 'number' && receipt.totals.totalCardINR > 0 && (
          <div className="receipt-total-row">
            <span>CARD COMMERCE:</span>
            <span>₹{receipt.totals.totalCardINR.toLocaleString('en-IN')}</span>
          </div>
        )}

        <div className="receipt-grand-total receipt-total-row">
          <span>TOTAL OUTLAY:</span>
          <span style={{ color: 'var(--color-ink-primary)' }}>
            ₹{((receipt.totals.totalExpenseINR || 0) + (receipt.totals.totalCardINR || 0)).toLocaleString('en-IN')}
          </span>
        </div>
      </section>

      {/* Barcode & Perforation Footer */}
      <footer className="receipt-barcode">
        <svg className="barcode-svg" viewBox="0 0 200 40" preserveAspectRatio="none" aria-hidden="true">
          <g fill="var(--color-ink-primary)">
            {/* Deterministic barcode bar rendering */}
            <rect x="0" y="0" width="3" height="40" />
            <rect x="5" y="0" width="1" height="40" />
            <rect x="8" y="0" width="4" height="40" />
            <rect x="15" y="0" width="2" height="40" />
            <rect x="20" y="0" width="5" height="40" />
            <rect x="28" y="0" width="1" height="40" />
            <rect x="32" y="0" width="3" height="40" />
            <rect x="38" y="0" width="2" height="40" />
            <rect x="43" y="0" width="4" height="40" />
            <rect x="50" y="0" width="1" height="40" />
            <rect x="54" y="0" width="6" height="40" />
            <rect x="63" y="0" width="2" height="40" />
            <rect x="68" y="0" width="3" height="40" />
            <rect x="74" y="0" width="1" height="40" />
            <rect x="78" y="0" width="5" height="40" />
            <rect x="86" y="0" width="2" height="40" />
            <rect x="91" y="0" width="4" height="40" />
            <rect x="98" y="0" width="2" height="40" />
            <rect x="103" y="0" width="5" height="40" />
            <rect x="111" y="0" width="1" height="40" />
            <rect x="115" y="0" width="3" height="40" />
            <rect x="121" y="0" width="4" height="40" />
            <rect x="128" y="0" width="2" height="40" />
            <rect x="133" y="0" width="5" height="40" />
            <rect x="141" y="0" width="1" height="40" />
            <rect x="145" y="0" width="4" height="40" />
            <rect x="152" y="0" width="2" height="40" />
            <rect x="157" y="0" width="6" height="40" />
            <rect x="166" y="0" width="1" height="40" />
            <rect x="170" y="0" width="3" height="40" />
            <rect x="176" y="0" width="4" height="40" />
            <rect x="183" y="0" width="2" height="40" />
            <rect x="188" y="0" width="4" height="40" />
            <rect x="195" y="0" width="3" height="40" />
          </g>
        </svg>
        <div className="barcode-number">{receipt.barcodeValue}</div>
        <div style={{ fontSize: '0.6875rem', color: 'var(--color-ink-muted)', marginTop: '0.4rem', textAlign: 'center' }}>
          THANK YOU FOR LIVING • RETAIN FOR MEMORIES
        </div>
      </footer>
    </article>
  );
};
