const usd = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

export function formatMoney(cents: number): string {
  return usd.format(cents / 100);
}

export function sum(values: number[]): number {
  return values.reduce((a, b) => a + b, 0);
}
