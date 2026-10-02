import { getProduct } from '../data/products';
import { discountFor, type DiscountCode } from './discounts';
import { sum } from './money';

export type CartLine = { productId: string; qty: number };

export type Totals = {
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
};

export const TAX_RATE = 0.08;
export const SHIPPING_FLAT = 695;
export const FREE_SHIPPING_FROM = 7500;

export function lineTotal(line: CartLine): number {
  return getProduct(line.productId).price * line.qty;
}

export function cartTotals(lines: CartLine[], code?: DiscountCode): Totals {
  const subtotal = sum(lines.map(lineTotal));
  const discount = code ? discountFor(code, subtotal) : 0;
  const shipping = lines.length === 0 || subtotal > FREE_SHIPPING_FROM ? 0 : SHIPPING_FLAT;
  const tax = Math.round(subtotal * TAX_RATE);
  return { subtotal, discount, shipping, tax, total: subtotal - discount + shipping + tax };
}

export function addLine(lines: CartLine[], productId: string, qty = 1): CartLine[] {
  if (!lines.some((l) => l.productId === productId)) return [...lines, { productId, qty }];
  return lines.map((l) => (l.productId === productId ? { ...l, qty: l.qty + qty } : l));
}

export function setQty(lines: CartLine[], productId: string, qty: number): CartLine[] {
  if (qty <= 0) return lines.filter((l) => l.productId !== productId);
  return lines.map((l) => (l.productId === productId ? { ...l, qty } : l));
}
