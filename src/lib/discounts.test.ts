import { describe, expect, it } from 'vitest';
import { discountFor, findCode } from './discounts';

describe('findCode', () => {
  it('ignores case and surrounding spaces', () => {
    expect(findCode(' save15 ')?.code).toBe('SAVE15');
  });

  it('returns undefined for unknown codes', () => {
    expect(findCode('FREEBIES')).toBeUndefined();
  });
});

describe('discountFor', () => {
  it('takes a percentage off', () => {
    expect(discountFor(findCode('SAVE15')!, 4800)).toBe(720);
  });

  it('needs the minimum subtotal for a fixed amount', () => {
    const code = findCode('WELCOME10')!;
    expect(discountFor(code, 4999)).toBe(0);
    expect(discountFor(code, 5000)).toBe(1000);
  });
});
