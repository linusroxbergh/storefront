import type { CartLine, Totals } from './cart';

export type ShippingDetails = {
  name: string;
  email: string;
  address: string;
  city: string;
  zip: string;
};

export type PaymentDetails = { cardholder: string; last4: string; token: string };

export type Order = { id: string; total: number; last4: string };

type NewOrder = {
  lines: CartLine[];
  shipping: ShippingDetails;
  payment: PaymentDetails;
  totals: Totals;
};

export async function placeOrder({ lines, shipping, payment, totals }: NewOrder): Promise<Order> {
  const id = `FH-${Math.floor(100000 + Math.random() * 900000)}`;
  const res = await fetch('/api/payments', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      amount: totals.total,
      currency: 'usd',
      source: payment.token,
      reference: id,
      email: shipping.email,
      lines,
    }),
  });
  if (!res.ok) throw new Error(`payments-api answered ${res.status}`);
  return { id, total: totals.total, last4: payment.last4 };
}
