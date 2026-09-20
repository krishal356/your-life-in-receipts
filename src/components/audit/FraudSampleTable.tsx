import React from 'react';
import { MaskedFinancialTransaction } from '../../types';
import { formatINR } from '../../utils/formatters';

interface FraudSampleTableProps {
  records: MaskedFinancialTransaction[];
}

export const FraudSampleTable: React.FC<FraudSampleTableProps> = ({ records }) => {
  return (
    <div className="card">
      <div style={{ marginBottom: '1.25rem' }}>
        <h3 style={{ fontSize: '1.125rem', fontWeight: 800, color: 'var(--color-ink-primary)' }}>
          Sample Flagged Transactions (Anonymized & Masked)
        </h3>
        <p style={{ fontSize: '0.8125rem', color: 'var(--color-ink-muted)' }}>
          Representative records demonstrating masked payment credentials and anomaly distribution
        </p>
      </div>

      <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontSize: '0.8125rem',
            textAlign: 'left',
            minWidth: '580px',
          }}
          aria-label="Sample flagged financial transactions"
        >
          <thead>
            <tr style={{ borderBottom: '2px solid var(--color-border)', color: 'var(--color-ink-muted)' }}>
              <th style={{ padding: '0.625rem 0.5rem', fontWeight: 700 }}>DATE</th>
              <th style={{ padding: '0.625rem 0.5rem', fontWeight: 700 }}>MERCHANT</th>
              <th style={{ padding: '0.625rem 0.5rem', fontWeight: 700 }}>CATEGORY</th>
              <th style={{ padding: '0.625rem 0.5rem', fontWeight: 700 }}>LOCATION</th>
              <th style={{ padding: '0.625rem 0.5rem', fontWeight: 700 }}>MASKED CARD</th>
              <th style={{ padding: '0.625rem 0.5rem', fontWeight: 700, textAlign: 'right' }}>AMOUNT</th>
              <th style={{ padding: '0.625rem 0.5rem', fontWeight: 700, textAlign: 'center' }}>STATUS</th>
            </tr>
          </thead>
          <tbody>
            {records.map((tx) => (
              <tr
                key={tx.id}
                style={{
                  borderBottom: '1px solid var(--color-border-subtle)',
                  transition: 'background-color var(--transition-fast)',
                }}
              >
                <td style={{ padding: '0.625rem 0.5rem', color: 'var(--color-ink-secondary)', whiteSpace: 'nowrap' }}>
                  {tx.date}
                </td>
                <td style={{ padding: '0.625rem 0.5rem', fontWeight: 600, color: 'var(--color-ink-primary)' }}>
                  {tx.merchant}
                </td>
                <td style={{ padding: '0.625rem 0.5rem', color: 'var(--color-ink-secondary)', textTransform: 'capitalize' }}>
                  {tx.category.replace(/_/g, ' ')}
                </td>
                <td style={{ padding: '0.625rem 0.5rem', color: 'var(--color-ink-secondary)' }}>
                  {tx.locationState}
                </td>
                <td style={{ padding: '0.625rem 0.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--color-ink-muted)' }}>
                  {tx.maskedCard}
                </td>
                <td style={{ padding: '0.625rem 0.5rem', textAlign: 'right', fontWeight: 700, color: 'var(--color-ink-primary)' }}>
                  {formatINR(tx.amount)}
                </td>
                <td style={{ padding: '0.625rem 0.5rem', textAlign: 'center' }}>
                  <span className={tx.isFlagged ? 'badge badge-danger' : 'badge badge-success'}>
                    {tx.isFlagged ? 'Flagged Risk' : 'Legitimate'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
