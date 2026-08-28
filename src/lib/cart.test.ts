import { describe, expect, it } from 'vitest';
import { addLine, cartTotals, setQty } from './cart';

const MUG = 'FH-101';

describe('addLine', () => {
  it('adds a new product as a line', () => {
    expect(addLine([], MUG)).toEqual([{ productId: MUG, qty: 1 }]);
  });

  it('bumps the quantity of a product already in the cart', () => {
    expect(addLine([{ productId: MUG, qty: 1 }], MUG, 2)).toEqual([{ productId: MUG, qty: 3 }]);
  });
});

describe('setQty', () => {
  it('removes the line at zero', () => {
    expect(setQty([{ productId: MUG, qty: 2 }], MUG, 0)).toEqual([]);
  });
});

describe('cartTotals', () => {
  it('is all zero for an empty cart', () => {
    expect(cartTotals([])).toEqual({ subtotal: 0, shipping: 0, tax: 0, total: 0 });
  });

  it('adds flat shipping and tax', () => {
    expect(cartTotals([{ productId: MUG, qty: 2 }])).toEqual({ subtotal: 4800, shipping: 695, tax: 384, total: 5879 });
  });
});
