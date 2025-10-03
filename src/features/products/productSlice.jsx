import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  categories: [],
  productDetail: null,
  loading: false,
  error: null
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    // ----- FETCH ALL PRODUCTS -----
    fetchProductsRequest: (state) => {
      state.loading = true;
    },
    fetchProductsSuccess: (state, action) => {
      state.loading = false;
      state.products = action.payload;
    },
    fetchProductsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // ----- FETCH SINGLE PRODUCT BY ID -----
    fetchProductByIdRequest: (state) => {
      state.loading = true;
    },
    fetchProductByIdSuccess: (state, action) => {
      state.loading = false;
      state.productDetail = action.payload;
    },
    fetchProductByIdFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // ----- FETCH PRODUCTS BY CATEGORY -----
    fetchProductsByCategoryRequest: (state) => {
      state.loading = true;
    },
    fetchProductsByCategorySuccess: (state, action) => {
      state.loading = false;
      state.products = action.payload;
    },
    fetchProductsByCategoryFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // ----- FETCH CATEGORIES -----
    fetchCategoriesRequest: (state) => {
      state.loading = true;
    },
    fetchCategoriesSuccess: (state, action) => {
      state.loading = false;
      state.categories = action.payload;
    },
    fetchCategoriesFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // ----- FILTER PRODUCTS BY SEARCH -----
    filterProductsBySearch: (state, action) => {
      const search = action.payload.toLowerCase();
      state.filteredProducts = state.products.filter((p) =>
        p.title.toLowerCase().includes(search)
      );
    }
  }
});

export const {
  fetchProductsRequest,
  fetchProductsSuccess,
  fetchProductsFailure,
  fetchProductByIdRequest,
  fetchProductByIdSuccess,
  fetchProductByIdFailure,
  fetchProductsByCategoryRequest,
  fetchProductsByCategorySuccess,
  fetchProductsByCategoryFailure,
  fetchCategoriesRequest,
  fetchCategoriesSuccess,
  fetchCategoriesFailure,
  filterProductsBySearch
} = productSlice.actions;

export default productSlice.reducer;
