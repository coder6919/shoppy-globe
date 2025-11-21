
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
  searchQuery: '', // Stores the state for the search feature (20 marks)
  loading: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    // Action to store the list of products after successful fetch
    setProducts: (state, action) => {
      state.products = action.payload;
      state.loading = 'succeeded';
      state.error = null;
    },
    // Action to update the search query
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload.toLowerCase();
    },
    // Actions for loading state (used by the custom hook)
    setLoading: (state, action) => {
      state.loading = action.payload;
      state.error = null;
    },
    setError: (state, action) => {
      state.loading = 'failed';
      state.error = action.payload;
    },
  },
});

// Selectors
// 1. Reads the current search query (Fixes the SyntaxError in ProductList.jsx)
export const selectSearchQuery = (state) => state.product.searchQuery;

// 2. Implements the filtering logic (Used by ProductList to display search results)
export const selectFilteredProducts = (state) => {
  const products = state.product.products;
  const query = state.product.searchQuery;

  if (!query) {
    return products;
  }

  return products.filter(
    (product) =>
      product.title.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query)
  );
};

export const selectLoadingStatus = (state) => state.product.loading;
export const selectError = (state) => state.product.error;

// Exporting Actions and the Reducer
export const { setProducts, setSearchQuery, setLoading, setError } = productSlice.actions;
export default productSlice.reducer;