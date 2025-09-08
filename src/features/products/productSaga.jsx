import { call, put, takeLatest } from "redux-saga/effects";
import api from "../../api/axios";
import {
  fetchProductsRequest,
  fetchProductsSuccess,
  fetchProductsFailure,
} from "./productSlice";

function* fetchProducts() {
  try {
    const response = yield call(api.get, "/products");
    yield put(fetchProductsSuccess(response.data));
  } catch (error) {
    yield put(fetchProductsFailure(error.message));
  }
}

export function* productSaga() {
  yield takeLatest(fetchProductsRequest.type, fetchProducts);
}
