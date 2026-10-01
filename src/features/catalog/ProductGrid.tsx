import { useSearchParams } from 'react-router';
import { products } from '../../data/products';
import { ProductCard } from './ProductCard';
import './catalog.css';

export function ProductGrid() {
  const [params] = useSearchParams();
  const query = params.get('q')?.trim() ?? '';
  const shown = query ? products.filter((p) => p.name.includes(query)) : products;

  return (
    <section>
      {query ? (
        <div className="intro">
          <h1>Results for “{query}”</h1>
          <p>{shown.length === 0 ? 'Nothing matches that yet.' : `${shown.length} of ${products.length} products`}</p>
        </div>
      ) : (
        <div className="intro">
          <h1>Good things for the kitchen and table</h1>
          <p>Made in small batches by people we know. Free returns within 30 days.</p>
        </div>
      )}
      <ul className="grid">
        {shown.map((product) => (
          <li key={product.id}>
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </section>
  );
}
