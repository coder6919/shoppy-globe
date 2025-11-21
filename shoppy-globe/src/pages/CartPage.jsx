import React, { lazy, Suspense } from 'react';
import FallbackLoader from '../components/Common/FallbackLoader'; 

// Lazy Load the core component
const Cart = lazy(() => import('../components/Cart/Cart'));

const CartPage = () => {
  return (
    <Suspense fallback={<FallbackLoader />}>
      <Cart />
    </Suspense>
  );
};

export default CartPage;