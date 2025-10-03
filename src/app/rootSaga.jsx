import { all } from "redux-saga/effects";
import { cartSaga } from "../features/cart/cartSaga";
import { productsSaga } from "../features/products/productSaga";

export function* rootSaga() {
  yield all([cartSaga(), productsSaga()]);
}
