// src/utils/masking.ts — Pure privacy masking functions for card commerce and identifiers

/**
 * Masks a credit card number to show only the last 4 digits (e.g. **** **** **** 1234)
 */
export function maskCardNumber(cardNumber: string | number): string {
  const str = String(cardNumber).replace(/\D/g, '');
  if (!str) return '**** **** **** ****';
  const last4 = str.slice(-4);
  return `**** **** **** ${last4}`;
}

/**
 * Masks arbitrary customer or transaction IDs for public presentation
 */
export function maskIdentifier(identifier: string, visiblePrefix = 4): string {
  if (!identifier) return '***';
  if (identifier.length <= visiblePrefix) return identifier;
  const prefix = identifier.slice(0, visiblePrefix);
  return `${prefix}***`;
}
