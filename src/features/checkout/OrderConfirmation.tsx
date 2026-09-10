import { Link, useLocation, useParams } from 'react-router';
import { formatMoney } from '../../lib/money';
import type { Order } from '../../lib/orders';
import './checkout.css';

export function OrderConfirmation() {
  const { id } = useParams();
  const order = (useLocation().state as { order?: Order } | null)?.order;

  return (
    <div className="confirmation">
      <h1>Thank you</h1>
      <p>
        Order <strong>{id}</strong> is confirmed
        {order && `, and ${formatMoney(order.total)} was charged to the card ending ${order.last4}`}. We'll email you when it
        ships.
      </p>
      <Link to="/" className="button quiet">
        Keep shopping
      </Link>
    </div>
  );
}
