import { Link } from 'react-router';
import { getProduct } from '../../data/products';
import { FREE_SHIPPING_FROM, lineTotal } from '../../lib/cart';
import { formatMoney } from '../../lib/money';
import { useCart } from './CartProvider';
import { DiscountForm } from './DiscountForm';
import { TotalsList } from './TotalsList';
import './cart.css';

export function CartDrawer() {
  const { lines, isOpen, close, setQty, totals } = useCart();
  if (!isOpen) return null;

  return (
    <div className="drawer-backdrop" onClick={close}>
      <aside className="drawer" onClick={(e) => e.stopPropagation()}>
        <header className="drawer-head">
          <h2>Your cart</h2>
          <button className="icon-button" onClick={close}>
            ×
          </button>
        </header>

        {lines.length === 0 ? (
          <p className="muted">Your cart is empty.</p>
        ) : (
          <>
            <ul className="lines">
              {lines.map((line) => {
                const product = getProduct(line.productId);
                return (
                  <li key={line.productId} className="line">
                    <div className="line-image" style={{ background: product.tone }}>
                      <img src={product.image} alt="" />
                    </div>
                    <div className="line-info">
                      <span>{product.name}</span>
                      <span className="muted">{formatMoney(lineTotal(line))}</span>
                    </div>
                    <div className="qty">
                      <button onClick={() => setQty(line.productId, line.qty - 1)}>−</button>
                      <span>{line.qty}</span>
                      <button onClick={() => setQty(line.productId, line.qty + 1)}>+</button>
                    </div>
                  </li>
                );
              })}
            </ul>
            <DiscountForm />
            <TotalsList totals={totals} />
            {totals.shipping > 0 && (
              <p className="shipping-hint">Add {formatMoney(FREE_SHIPPING_FROM - totals.subtotal)} more for free shipping.</p>
            )}
            <Link to="/checkout" className="button wide" onClick={close}>
              Checkout
            </Link>
          </>
        )}
      </aside>
    </div>
  );
}
