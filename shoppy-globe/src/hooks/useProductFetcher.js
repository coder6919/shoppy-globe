
import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setProducts,
  setLoading,
  setError,
  selectLoadingStatus,
} from '../redux/productSlice';

/**
 * Custom hook for fetching the main product list from the dummy API. 
 * - Uses useEffect to fetch when component mounts. (Data Fetching requirement)
 * - Manages loading and error state via Redux. (Error Handling requirement)
 */
const useProductFetcher = () => {
  const dispatch = useDispatch();
  const loadingStatus = useSelector(selectLoadingStatus);

  // const BASE_URL = 'https://dummyjson.com/products';
  // Add your local backend URL
  const BASE_URL = 'http://localhost:8000/api/products';

  const fetchData = useCallback(async () => {
    // Optimization: Prevents refetching if data is already loaded successfully
    if (loadingStatus === 'succeeded') {
        return; 
    }

    dispatch(setLoading('loading'));
    
    try {
      const response = await fetch(BASE_URL);

      if (!response.ok) {
        // Implement error handling gracefully
        throw new Error(`Failed to fetch product list. Status: ${response.status}`);
      }

      const data = await response.json();
      
      // Store the fetched data in Redux state
      dispatch(setProducts(data.products || [])); 

    } catch (err) {
      // Dispatch error action on failure
      dispatch(setError(err.message || 'An unknown error occurred during fetch.'));
      console.error('Data fetching error:', err);
    }
  }, [dispatch, loadingStatus]);

  // Use useEffect to run the fetch operation when the component mounts
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // The state (products, loading, error) is accessed directly via selectors in the components
  return {}; 
};

export default useProductFetcher;