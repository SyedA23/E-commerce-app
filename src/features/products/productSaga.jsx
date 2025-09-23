// src/features/products/productSaga.jsx
import { call, put, takeLatest, all } from "redux-saga/effects";
import axios from "axios";
import {
  fetchProductsRequest,
  fetchProductsSuccess,
  fetchProductsFailure,
  fetchProductByIdRequest,
  fetchProductByIdSuccess,
  fetchProductByIdFailure,
  fetchCategoriesRequest,
  fetchCategoriesSuccess,
  fetchCategoriesFailure,
  fetchProductsByCategoryRequest,
  fetchProductsByCategorySuccess,
  fetchProductsByCategoryFailure
} from "./productSlice";

// ---- FETCH ALL PRODUCTS ----
function* fetchProductsSaga() {
  try {
    const response = yield call(axios.get, "https://fakestoreapi.com/products");
    yield put(fetchProductsSuccess(response.data));
  } catch (error) {
    yield put(fetchProductsFailure(error.message));
  }
}

// ---- FETCH PRODUCT BY ID ----
function* fetchProductByIdSaga(action) {
  try {
    const response = yield call(
      axios.get,
      `https://fakestoreapi.com/products/${action.payload}`
    );
    yield put(fetchProductByIdSuccess(response.data));
  } catch (error) {
    yield put(fetchProductByIdFailure(error.message));
  }
}

// ---- FETCH CATEGORIES ----
function* fetchCategoriesSaga() {
  try {
    const response = yield call(
      axios.get,
      "https://fakestoreapi.com/products/categories"
    );
    yield put(fetchCategoriesSuccess(response.data));
  } catch (error) {
    yield put(fetchCategoriesFailure(error.message));
  }
}

// ---- FETCH PRODUCTS BY CATEGORY ----
function* fetchProductsByCategorySaga(action) {
  try {
    let response;
    if (action.payload === "All") {
      // Fetch all if category is "All"
      response = yield call(axios.get, "https://fakestoreapi.com/products");
    } else {
      response = yield call(
        axios.get,
        `https://fakestoreapi.com/products/category/${action.payload}`
      );
    }
    yield put(fetchProductsByCategorySuccess(response.data));
  } catch (error) {
    yield put(fetchProductsByCategoryFailure(error.message));
  }
}

export function* productsSaga() {
  // ← changed from productSaga
  yield all([
    takeLatest(fetchProductsRequest.type, fetchProductsSaga),
    takeLatest(fetchProductByIdRequest.type, fetchProductByIdSaga),
    takeLatest(fetchCategoriesRequest.type, fetchCategoriesSaga),
    takeLatest(fetchProductsByCategoryRequest.type, fetchProductsByCategorySaga)
  ]);
}
