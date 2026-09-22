export type DiscountCode =
  | { code: string; kind: 'percent'; percent: number }
  | { code: string; kind: 'amount'; amount: number; minSubtotal: number };

const CODES: DiscountCode[] = [
  { code: 'SAVE15', kind: 'percent', percent: 15 },
  { code: 'WELCOME10', kind: 'amount', amount: 1000, minSubtotal: 5000 },
];

export function findCode(input: string): DiscountCode | undefined {
  const wanted = input.trim().toUpperCase();
  return CODES.find((c) => c.code === wanted);
}

export function discountFor(code: DiscountCode, subtotal: number): number {
  if (code.kind === 'percent') return Math.round((subtotal * code.percent) / 100);
  return subtotal >= code.minSubtotal ? Math.min(code.amount, subtotal) : 0;
}
