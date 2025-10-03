// src/features/cart/cartSaga.jsx
import { all, call, put, takeLatest } from "redux-saga/effects";
import {
  fetchCartRequest,
  fetchCartSuccess,
  fetchCartFailure,
  addToCartRequest,
  updateCartRequest,
  updateCartSuccess,
  deleteFromCartRequest,
  deleteFromCartSuccess
} from "./cartSlice";

// --- Fetch Cart ---
function* fetchCart() {
  try {
    const storedCart = localStorage.getItem("cart");
    const items = storedCart ? JSON.parse(storedCart) : [];
    yield put(fetchCartSuccess({ items }));
  } catch (error) {
    yield put(fetchCartFailure(error.message));
  }
}

// --- Add to Cart ---
function* addToCart(action) {
  try {
    const product = action.payload;
    const storedCart = localStorage.getItem("cart");
    const items = storedCart ? JSON.parse(storedCart) : [];

    const existingItem = items.find((i) => i.productId === product.productId);
    if (existingItem) {
      existingItem.quantity += product.quantity || 1;
    } else {
      items.push(product);
    }

    localStorage.setItem("cart", JSON.stringify(items));
    yield put(fetchCartSuccess({ items }));
  } catch (error) {
    yield put(fetchCartFailure(error.message));
  }
}

// --- Update Cart ---
function* updateCart(action) {
  try {
    const updatedItems = action.payload; // [{ productId, quantity }]
    const storedCart = localStorage.getItem("cart");
    let items = storedCart ? JSON.parse(storedCart) : [];

    items = items.map((item) => {
      const updatedItem = updatedItems.find(
        (u) => u.productId === item.productId
      );
      return updatedItem ? { ...item, quantity: updatedItem.quantity } : item;
    });

    localStorage.setItem("cart", JSON.stringify(items));
    yield put(updateCartSuccess(items));
  } catch (error) {
    yield put(fetchCartFailure(error.message));
  }
}

// --- Delete from Cart ---
function* deleteFromCart(action) {
  try {
    const productId = action.payload;
    const storedCart = localStorage.getItem("cart");
    let items = storedCart ? JSON.parse(storedCart) : [];

    items = items.filter((item) => item.productId !== productId);
    localStorage.setItem("cart", JSON.stringify(items));

    yield put(deleteFromCartSuccess(productId));
  } catch (error) {
    yield put(fetchCartFailure(error.message));
  }
}

// --- Root Cart Saga ---
export function* cartSaga() {
  yield all([
    takeLatest(fetchCartRequest.type, fetchCart),
    takeLatest(addToCartRequest.type, addToCart),
    takeLatest(updateCartRequest.type, updateCart),
    takeLatest(deleteFromCartRequest.type, deleteFromCart)
  ]);
}
