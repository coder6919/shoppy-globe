import { lazy, Suspense } from 'react';
import FallbackLoader from '../components/Common/FallbackLoader'; 

// Lazy Load the core component
const ProductList = lazy(() => import('../components/Products/ProductList'));

const HomePage = () => {
  return (
    <Suspense fallback={<FallbackLoader />}>
      <ProductList />
    </Suspense>
  );
};

export default HomePage;