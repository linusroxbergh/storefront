export type Product = {
  id: string;
  slug: string;
  name: string;
  /** cents */
  price: number;
  image: string;
  tone: string;
  blurb: string;
  details: string[];
  stock: number;
  addedAt: string;
};

export const products: Product[] = [
  {
    id: 'FH-101',
    slug: 'stoneware-mug',
    name: 'Stoneware Mug',
    price: 2400,
    image: '/products/stoneware-mug.svg',
    tone: '#e2d5c1',
    blurb: 'Wheel-thrown and glazed by hand, so the colour pools darker at the rim.',
    details: ['350 ml', 'Dishwasher safe', 'Made in Portugal'],
    stock: 42,
    addedAt: '2026-06-02',
  },
  {
    id: 'FH-102',
    slug: 'linen-tea-towel',
    name: 'Linen Tea Towel',
    price: 1800,
    image: '/products/linen-tea-towel.svg',
    tone: '#d3dccb',
    blurb: 'Stonewashed linen that dries glasses without leaving lint behind.',
    details: ['50 × 70 cm', '100% linen', 'Hanging loop'],
    stock: 80,
    addedAt: '2026-06-02',
  },
  {
    id: 'FH-103',
    slug: 'nesting-bowls',
    name: 'Nesting Bowls, set of 3',
    price: 5600,
    image: '/products/nesting-bowls.svg',
    tone: '#ebe0d2',
    blurb: 'Three sizes for prep, salads and everything in between. They stack into one.',
    details: ['Ø 12, 16 and 20 cm', 'Oven safe to 220 °C', 'Made in Portugal'],
    stock: 15,
    addedAt: '2026-06-02',
  },
  {
    id: 'FH-104',
    slug: 'wool-throw',
    name: 'Wool Throw',
    price: 12900,
    image: '/products/wool-throw.svg',
    tone: '#cdbba5',
    blurb: 'Lambswool woven in a loose herringbone, heavy enough for the porch in October.',
    details: ['130 × 180 cm', '100% lambswool', 'Dry clean'],
    stock: 6,
    addedAt: '2026-06-16',
  },
  {
    id: 'FH-105',
    slug: 'oak-serving-board',
    name: 'Oak Serving Board',
    price: 4200,
    image: '/products/oak-serving-board.svg',
    tone: '#dcc4a2',
    blurb: 'Oiled oak with a juice groove on one side and a flat face on the other.',
    details: ['40 × 25 cm', 'FSC-certified oak', 'Hand wash, oil now and then'],
    stock: 23,
    addedAt: '2026-06-16',
  },
  {
    id: 'FH-106',
    slug: 'enamel-pitcher',
    name: 'Enamel Pitcher',
    price: 3800,
    image: '/products/enamel-pitcher.svg',
    tone: '#d2dbe0',
    blurb: 'One litre, for water, milk or a handful of tulips.',
    details: ['1 l', 'Enamelled steel', 'Not for the hob'],
    stock: 0,
    addedAt: '2026-07-07',
  },
  {
    id: 'FH-107',
    slug: 'beeswax-tapers',
    name: 'Beeswax Tapers, pair',
    price: 1600,
    image: '/products/beeswax-tapers.svg',
    tone: '#efe3bd',
    blurb: 'Hand-dipped in Vermont. Each one burns for about eight hours.',
    details: ['25 cm', 'Pure beeswax', 'Cotton wick'],
    stock: 120,
    addedAt: '2026-09-10',
  },
  {
    id: 'FH-108',
    slug: 'canvas-apron',
    name: 'Canvas Apron',
    price: 3400,
    image: '/products/canvas-apron.svg',
    tone: '#c3cdb9',
    blurb: 'Heavy canvas with crossed straps that spare your neck on long days.',
    details: ['One size', 'Organic cotton canvas', 'Two front pockets'],
    stock: 31,
    addedAt: '2026-07-07',
  },
  {
    id: 'FH-109',
    slug: 'glass-carafe',
    name: 'Glass Carafe',
    price: 2900,
    image: '/products/glass-carafe.svg',
    tone: '#dce5e7',
    blurb: 'Mouth-blown. Holds a bottle of wine or a litre of water, and the glass sits on top as a lid.',
    details: ['1 l', 'Borosilicate glass', 'Dishwasher safe'],
    stock: 18,
    addedAt: '2026-09-12',
  },
];

const byId = new Map(products.map((p) => [p.id, p]));

export function getProduct(id: string): Product {
  const product = byId.get(id);
  if (!product) throw new Error(`Unknown product ${id}`);
  return product;
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}
