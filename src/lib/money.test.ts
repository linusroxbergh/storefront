import { describe, expect, it } from 'vitest';
import { formatMoney, sum } from './money';

describe('formatMoney', () => {
  it('formats cents as dollars', () => {
    expect(formatMoney(2400)).toBe('$24.00');
    expect(formatMoney(5)).toBe('$0.05');
  });

  it('groups thousands', () => {
    expect(formatMoney(129900)).toBe('$1,299.00');
  });
});

describe('sum', () => {
  it('is 0 for no values', () => {
    expect(sum([])).toBe(0);
  });
});
