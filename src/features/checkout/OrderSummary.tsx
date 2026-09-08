import { getProduct } from '../../data/products';
import { lineTotal } from '../../lib/cart';
import { formatMoney } from '../../lib/money';
import { useCart } from '../cart/CartProvider';
import { TotalsList } from '../cart/TotalsList';

export function OrderSummary() {
  const { lines, totals } = useCart();

  return (
    <aside className="summary">
      <h2>Order summary</h2>
      <ul className="summary-lines">
        {lines.map((line) => (
          <li key={line.productId}>
            <span>
              {getProduct(line.productId).name} × {line.qty}
            </span>
            <span>{formatMoney(lineTotal(line))}</span>
          </li>
        ))}
      </ul>
      <TotalsList totals={totals} />
    </aside>
  );
}
