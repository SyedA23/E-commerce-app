import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: { items: [], total: 0, loading: false, error: null },
  reducers: {
    fetchCartRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchCartSuccess: (state, action) => {
      state.loading = false;
      state.items = action.payload.items || [];
      state.total = state.items.reduce(
        (acc, item) => acc + (Number(item.price) || 0) * (item.quantity || 1),
        0
      );
    },
    fetchCartFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload || "Failed to fetch cart";
    },

    // Add proper reducers for these actions
    addToCartRequest: (state) => {
      state.loading = true;
      state.error = null;
    },

    updateCartRequest: (state) => {
      state.loading = true;
      state.error = null;
    },

    updateCartSuccess: (state, action) => {
      state.loading = false;
      const updatedItems = action.payload;
      // Ensure we're working with an array
      const itemsArray = Array.isArray(updatedItems)
        ? updatedItems
        : [updatedItems];

      itemsArray.forEach((updatedItem) => {
        const existingItem = state.items.find(
          (item) => item.productId === updatedItem.productId
        );
        if (existingItem) {
          existingItem.quantity = Math.max(1, updatedItem.quantity);
        }
      });
      state.total = state.items.reduce(
        (acc, item) => acc + (Number(item.price) || 0) * (item.quantity || 1),
        0
      );
    },

    updateCartFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    deleteFromCartRequest: (state) => {
      state.loading = true;
      state.error = null;
    },

    deleteFromCartSuccess: (state, action) => {
      state.loading = false;
      state.items = state.items.filter(
        (item) => item.productId !== action.payload
      );
      state.total = state.items.reduce(
        (acc, item) => acc + (Number(item.price) || 0) * (item.quantity || 1),
        0
      );
    },

    deleteFromCartFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }
  }
});

export const {
  fetchCartRequest,
  fetchCartSuccess,
  fetchCartFailure,
  addToCartRequest,
  updateCartRequest,
  updateCartSuccess,
  updateCartFailure,
  deleteFromCartRequest,
  deleteFromCartSuccess,
  deleteFromCartFailure
} = cartSlice.actions;

export default cartSlice.reducer;
