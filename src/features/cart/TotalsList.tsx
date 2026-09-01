import type { Totals } from '../../lib/cart';
import { formatMoney } from '../../lib/money';

export function TotalsList({ totals }: { totals: Totals }) {
  return (
    <dl className="totals">
      <dt>Subtotal</dt>
      <dd>{formatMoney(totals.subtotal)}</dd>
      <dt>Shipping</dt>
      <dd>{formatMoney(totals.shipping)}</dd>
      <dt>Tax</dt>
      <dd>{formatMoney(totals.tax)}</dd>
      <dt className="total">Total</dt>
      <dd className="total">{formatMoney(totals.total)}</dd>
    </dl>
  );
}
