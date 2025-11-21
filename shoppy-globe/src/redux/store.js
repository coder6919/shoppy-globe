import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import productReducer from './productSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer, // Maps cart state slice
    product: productReducer, // Maps product and search state slice
  },
  
});