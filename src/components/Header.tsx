import { Link } from 'react-router';
import { useCart } from '../features/cart/CartProvider';

export function Header() {
  const { count, open } = useCart();

  return (
    <header className="header">
      <Link to="/" className="logo">
        Fernhill
      </Link>
      <button className="cart-button" onClick={open}>
        Cart <span className="count">{count}</span>
      </button>
    </header>
  );
}
