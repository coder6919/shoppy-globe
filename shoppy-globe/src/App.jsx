
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import React, { Suspense, lazy } from 'react';
import Header from './components/Common/Header';
import FallbackLoader from './components/Common/FallbackLoader';
import NotFound from './components/Common/NotFound';
import Footer from './components/Common/Footer'; // Using the direct import for errorElement

// --- Lazy Loading Components (Performance Optimization: 20 marks) ---
const HomePage = lazy(() => import('./pages/HomePage'));
const CartPage = lazy(() => import('./pages/CartPage'));
const CheckoutPage = lazy(() => import('./pages/CheckoutPage'));
const ProductDetail = lazy(() => import('./components/ProductDetail')); 

// Define the router using createBrowserRouter
const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <Header />
        <Suspense fallback={<FallbackLoader />}>
          <HomePage />
        </Suspense>
        <Footer/>
      </>
    ),
    errorElement: <NotFound />, 
  },
  {
    path: '/products', // Maps the "Shop" link to the Home Page
    element: (
      <>
        <Header />
        <Suspense fallback={<FallbackLoader />}>
          <HomePage />
        </Suspense>
        <Footer/>
      </>
    ),
  },
  {
    path: '/product/:id', // Dynamic route for product details
    element: (
      <>
        <Header />
        <Suspense fallback={<FallbackLoader />}>
          <ProductDetail />
        </Suspense>
        <Footer/>
      </>
    ),
  },
  {
    path: '/cart',
    element: (
      <>
        <Header />
        <Suspense fallback={<FallbackLoader />}>
          <CartPage />
        </Suspense>
        <Footer/>
      </>
    ),
  },
  {
    path: '/checkout',
    element: (
      <>
        <Header />
        <Suspense fallback={<FallbackLoader />}>
          <CheckoutPage />
        </Suspense>
        <Footer/>
      </>
    ),
  },
  {
    path: '*', // Catch-all for 404 routes not handled by errorElement
    element: (
        <Suspense fallback={<FallbackLoader />}>
            <NotFound />
        </Suspense>
    ),
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;