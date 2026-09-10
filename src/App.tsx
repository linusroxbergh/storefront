import { createBrowserRouter, Outlet, RouterProvider } from 'react-router';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { CartDrawer } from './features/cart/CartDrawer';
import { CartProvider } from './features/cart/CartProvider';
import { ProductGrid } from './features/catalog/ProductGrid';
import { ProductPage } from './features/catalog/ProductPage';
import { CheckoutPage } from './features/checkout/CheckoutPage';
import { OrderConfirmation } from './features/checkout/OrderConfirmation';

function Layout() {
  return (
    <CartProvider>
      <Header />
      <main className="page">
        <Outlet />
      </main>
      <Footer />
      <CartDrawer />
    </CartProvider>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: '/', element: <ProductGrid /> },
      { path: '/products/:slug', element: <ProductPage /> },
      { path: '/checkout', element: <CheckoutPage /> },
      { path: '/orders/:id', element: <OrderConfirmation /> },
    ],
  },
]);

export function App() {
  return <RouterProvider router={router} />;
}
