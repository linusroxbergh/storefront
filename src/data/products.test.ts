import { describe, expect, it } from 'vitest';
import { getProduct, isNew } from './products';

describe('isNew', () => {
  const carafe = getProduct('FH-109');

  it('is new for 30 days after it was added', () => {
    expect(isNew(carafe, Date.parse('2026-09-20'))).toBe(true);
    expect(isNew(carafe, Date.parse('2026-10-13'))).toBe(false);
  });
});
