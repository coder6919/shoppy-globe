import { lazy, Suspense } from 'react';
import FallbackLoader from '../components/Common/FallbackLoader'; 

// Lazy Load the core component
const Checkout = lazy(() => import('../components/Checkout'));

const CheckoutPage = () => {
  return (
    <Suspense fallback={<FallbackLoader />}>
      <Checkout />
    </Suspense>
  );
};

export default CheckoutPage;