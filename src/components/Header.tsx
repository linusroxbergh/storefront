import { Link, useNavigate, useSearchParams } from 'react-router';
import { useCart } from '../features/cart/CartProvider';

export function Header() {
  const { count, open } = useCart();
  const [params] = useSearchParams();
  const navigate = useNavigate();

  return (
    <header className="header">
      <Link to="/" className="logo">
        Fernhill
      </Link>
      <input
        type="search"
        className="search"
        placeholder="Search the shop"
        defaultValue={params.get('q') ?? ''}
        onChange={(e) => navigate(e.target.value ? `/?q=${encodeURIComponent(e.target.value)}` : '/')}
      />
      <button className="cart-button" onClick={open}>
        Cart <span className="count">{count}</span>
      </button>
    </header>
  );
}
