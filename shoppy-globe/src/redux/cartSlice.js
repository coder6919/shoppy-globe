import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [], // Array of { id, title, price, quantity, ... }
  totalQuantity: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Action: Add a new product or increment quantity
    addToCart: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find(item => item._id === newItem._id);

      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.items.push({ ...newItem, quantity: 1 });
      }
      state.totalQuantity++;
      cartSlice.caseReducers.updateTotals(state);
    },

    // Action: Remove a product entirely
    removeFromCart: (state, action) => {
      const id = action.payload;
      const itemToRemove = state.items.find(item => item._id === id);

      if (itemToRemove) {
        state.totalQuantity -= itemToRemove.quantity;
        state.items = state.items.filter(item => item._id !== id);
        cartSlice.caseReducers.updateTotals(state);
      }
    },

    // Action: Adjust quantity (increment or decrement, minimum quantity is 1)
    adjustQuantity: (state, action) => {
      const { id, adjustmentType } = action.payload;
      const existingItem = state.items.find(item => item._id === id);

      if (existingItem) {
        if (adjustmentType === 'increment') {
          existingItem.quantity++;
          state.totalQuantity++;
        } else if (adjustmentType === 'decrement' && existingItem.quantity > 1) {
          existingItem.quantity--;
          state.totalQuantity--;
        }
        cartSlice.caseReducers.updateTotals(state);
      }
    },

    // Action: Clear the cart after checkout
    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    },
    
    // Helper function (not an exported action) to recalculate totals
    updateTotals: (state) => {
      state.totalPrice = state.items.reduce(
        (total, item) => total + item.price * item.quantity, 0
      );
    }
  },
});

// Selectors: These are the NAMED exports required by components like Header.jsx!
export const selectCartItems = (state) => state.cart.items;
export const selectTotalQuantity = (state) => state.cart.totalQuantity;
export const selectTotalPrice = (state) => state.cart.totalPrice;

export const { addToCart, removeFromCart, adjustQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;