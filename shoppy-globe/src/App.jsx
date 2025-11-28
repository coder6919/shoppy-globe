import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import { Suspense, lazy } from 'react';
import Header from './components/Common/Header';
import FallbackLoader from './components/Common/FallbackLoader';
import NotFound from './components/Common/NotFound';
import Footer from './components/Common/Footer';

// --- Lazy Loading Components
const HomePage = lazy(() => import('./pages/HomePage'));
const CartPage = lazy(() => import('./pages/CartPage'));
const CheckoutPage = lazy(() => import('./pages/CheckoutPage'));
const ProductDetail = lazy(() => import('./components/ProductDetail')); 
const Login = lazy(() => import('./components/Auth/Login'));
const Register = lazy(() => import('./components/Auth/Register'));

// ✅ DEFINED: Layout Wrapper
// This prevents repeating Header/Suspense/Footer for every route
const Layout = ({ children }) => (
  <>
    <Header />
    <Suspense fallback={<FallbackLoader />}>
      {children}
    </Suspense>
    <Footer/>
  </>
);

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout><HomePage /></Layout>,
    errorElement: <NotFound />, 
  },
  {
    path: '/login',
    element: <Layout><Login /></Layout>,
  },
  {
    path: '/register',
    element: <Layout><Register /></Layout>,
  },
  {
    path: '/products',
    element: <Layout><HomePage /></Layout>,
  },
  {
    path: '/product/:id',
    element: <Layout><ProductDetail /></Layout>,
  },
  {
    path: '/cart',
    element: <Layout><CartPage /></Layout>,
  },
  {
    path: '/checkout',
    element: <Layout><CheckoutPage /></Layout>,
  },
  {
    path: '*',
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