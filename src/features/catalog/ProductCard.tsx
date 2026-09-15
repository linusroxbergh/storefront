import { Link } from 'react-router';
import { isNew, type Product } from '../../data/products';
import { flags } from '../../lib/flags';
import { formatMoney } from '../../lib/money';

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link to={`/products/${product.slug}`} className="card">
      <div className="card-image" style={{ background: product.tone }}>
        <img src={product.image} alt="" />
      </div>
      <div className="card-body">
        <span>{product.name}</span>
        <span className="card-price">{formatMoney(product.price)}</span>
      </div>
      {product.stock === 0 ? (
        <span className="badge">Sold out</span>
      ) : (
        flags.newBadges && isNew(product) && <span className="badge new">New</span>
      )}
    </Link>
  );
}
