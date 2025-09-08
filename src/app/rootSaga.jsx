import { all } from "redux-saga/effects";
import { productSaga } from "../features/products/productSaga";
import { cartSaga } from "../features/cart/cartSaga";

export default function* rootSaga() {
  yield all([productSaga(), cartSaga()]);
}
