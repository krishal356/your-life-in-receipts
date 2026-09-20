// src/utils/formatters.ts — Pure formatting utilities for numbers, currencies, and dates

/**
 * Formats a numeric value into standard Indian numbering system (e.g. ₹19,57,390)
 */
export function formatINR(amount: number): string {
  if (isNaN(amount)) return '₹0';
  return `₹${Math.round(amount).toLocaleString('en-IN')}`;
}

/**
 * Formats standard integers with local grouping (e.g. 149,860)
 */
export function formatNumber(num: number): string {
  if (isNaN(num)) return '0';
  return num.toLocaleString('en-IN');
}

/**
 * Formats hours with 1 decimal place (e.g. 5,341.5 hrs)
 */
export function formatHours(hours: number): string {
  if (isNaN(hours)) return '0.0 hrs';
  return `${hours.toLocaleString('en-IN', { minimumFractionDigits: 1, maximumFractionDigits: 1 })} hrs`;
}

/**
 * Formats short human-readable dates (e.g. 14 Nov 2017)
 */
export function formatDate(dateString: string): string {
  if (!dateString) return '';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

/**
 * Formats currency in lakhs/thousands shorthand for compact cards
 */
export function formatCompactINR(amount: number): string {
  if (amount >= 10000000) {
    return `₹${(amount / 10000000).toFixed(2)} Cr`;
  }
  if (amount >= 100000) {
    return `₹${(amount / 100000).toFixed(1)}L`;
  }
  if (amount >= 1000) {
    return `₹${(amount / 1000).toFixed(0)}k`;
  }
  return `₹${amount.toLocaleString('en-IN')}`;
}
