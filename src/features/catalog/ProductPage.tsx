import { Link, useParams } from 'react-router';
import { getProductBySlug } from '../../data/products';
import { formatMoney } from '../../lib/money';
import { useCart } from '../cart/CartProvider';
import './catalog.css';

export function ProductPage() {
  const { slug = '' } = useParams();
  const product = getProductBySlug(slug);
  const { add } = useCart();

  if (!product) {
    return (
      <p>
        That product isn't in the shop any more. <Link to="/">Back to the shop</Link>
      </p>
    );
  }

  const soldOut = product.stock === 0;

  return (
    <>
      <Link to="/" className="back">
        ← All products
      </Link>
      <article className="product">
        <div className="product-image" style={{ background: product.tone }}>
          <img src={product.image} alt="" />
        </div>
        <div>
          <h1>{product.name}</h1>
          <p className="price">{formatMoney(product.price)}</p>
          <p className="blurb">{product.blurb}</p>
          <ul className="details">
            {product.details.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
          <button className="button" disabled={soldOut} onClick={() => add(product.id)}>
            {soldOut ? 'Sold out' : 'Add to cart'}
          </button>
        </div>
      </article>
    </>
  );
}
