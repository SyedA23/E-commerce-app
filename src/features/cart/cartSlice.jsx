import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: { items: [], total: 0 },
  reducers: {
    fetchCartRequest: () => {},
    fetchCartSuccess: (state, action) => {
      state.items = action.payload.items;
      state.total = action.payload.total;
    },
    addToCartRequest: () => {},
    updateCartRequest: () => {},
    deleteFromCartRequest: () => {},
  },
});

export const {
  fetchCartRequest,
  fetchCartSuccess,
  addToCartRequest,
  updateCartRequest,
  deleteFromCartRequest,
} = cartSlice.actions;

export default cartSlice.reducer;
