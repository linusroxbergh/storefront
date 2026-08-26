import { products } from '../../data/products';
import { ProductCard } from './ProductCard';
import './catalog.css';

export function ProductGrid() {
  return (
    <section>
      <div className="intro">
        <h1>Good things for the kitchen and table</h1>
        <p>Made in small batches by people we know. Free returns within 30 days.</p>
      </div>
      <ul className="grid">
        {products.map((product) => (
          <li key={product.id}>
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </section>
  );
}
