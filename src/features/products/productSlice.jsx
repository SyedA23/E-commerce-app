import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "products",
  initialState: { products: [], product: null, loading: false, error: null },
  reducers: {
    // All products
    fetchProductsRequest: () => {},
    fetchProductsSuccess: (state, action) => {
      state.products = action.payload;
    },
    fetchProductsFailure: (state, action) => {
      state.error = action.payload;
    },

    // Single product by ID
    fetchProductByIdRequest: (state, action) => {}, // Saga will handle
    fetchProductByIdSuccess: (state, action) => {
      state.product = action.payload;
    },
    fetchProductByIdFailure: (state, action) => {
      state.error = action.payload;
    }
  }
});

export const {
  fetchProductsRequest,
  fetchProductsSuccess,
  fetchProductsFailure,
  fetchProductByIdRequest,
  fetchProductByIdSuccess,
  fetchProductByIdFailure
} = productSlice.actions;

export default productSlice.reducer;
