import { createBrowserRouter, Outlet, RouterProvider } from 'react-router';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { ProductGrid } from './features/catalog/ProductGrid';

function Layout() {
  return (
    <>
      <Header />
      <main className="page">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [{ path: '/', element: <ProductGrid /> }],
  },
]);

export function App() {
  return <RouterProvider router={router} />;
}
