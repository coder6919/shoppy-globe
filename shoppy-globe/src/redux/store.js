import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import productReducer from './productSlice';
import authReducer from './authSlice';
export const store = configureStore({
  reducer: {
    cart: cartReducer, // Maps cart state slice
    product: productReducer, // Maps product and search state slice
    auth: authReducer,
  },
  
});