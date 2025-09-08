import { call, put, takeLatest } from "redux-saga/effects";
import api from "../../api/axios";
import {
  fetchCartRequest,
  fetchCartSuccess,
  addToCartRequest,
  updateCartRequest,
  deleteFromCartRequest
} from "./cartSlice";
import { setLoading, setError } from "../../app/appSlice";

// Helper: merge product info with cart items
function* enrichCart(products) {
  try {
    const enriched = yield Promise.all(
      products.map(async (p) => {
        const res = await api.get(`/products/${p.productId}`);
        return {
          ...p,
          title: res.data.title,
          price: res.data.price
        };
      })
    );
    const total = enriched.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    return { items: enriched, total };
  } catch (err) {
    throw new Error("Failed to enrich cart");
  }
}

// Fetch cart
function* fetchCart() {
  try {
    yield put(setLoading(true));
    const response = yield call(api.get, "/carts/1"); // demo: user=1
    const enriched = yield call(enrichCart, response.data.products);
    yield put(fetchCartSuccess(enriched));
  } catch (error) {
    yield put(setError(error.message));
  } finally {
    yield put(setLoading(false));
  }
}

// Add product to cart
function* addToCart(action) {
  try {
    yield put(setLoading(true));
    yield call(api.post, "/carts", action.payload);
    yield put(fetchCartRequest());
  } catch (error) {
    yield put(setError(error.message));
  } finally {
    yield put(setLoading(false));
  }
}

// Update cart
function* updateCart(action) {
  try {
    yield put(setLoading(true));
    yield call(api.put, `/carts/1`, {
      userId: 1,
      date: new Date().toISOString(),
      products: action.payload
    });
    yield put(fetchCartRequest());
  } catch (error) {
    yield put(setError(error.message));
  } finally {
    yield put(setLoading(false));
  }
}

// Delete product
function* deleteFromCart(action) {
  try {
    yield put(setLoading(true));
    yield call(api.delete, `/carts/${action.payload}`);
    yield put(fetchCartRequest());
  } catch (error) {
    yield put(setError(error.message));
  } finally {
    yield put(setLoading(false));
  }
}

export function* cartSaga() {
  yield takeLatest(fetchCartRequest.type, fetchCart);
  yield takeLatest(addToCartRequest.type, addToCart);
  yield takeLatest(updateCartRequest.type, updateCart);
  yield takeLatest(deleteFromCartRequest.type, deleteFromCart);
}
