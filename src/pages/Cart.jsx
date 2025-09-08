import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCartRequest,
  deleteFromCartRequest,
  updateCartRequest
} from "../features/cart/cartSlice";

export default function Cart() {
  const dispatch = useDispatch();
  const { items, total } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchCartRequest());
  }, [dispatch]);

  const updateQuantity = (productId, type) => {
    const updated = items.map((item) => {
      if (item.productId === productId) {
        return {
          productId: item.productId,
          quantity:
            type === "inc"
              ? item.quantity + 1
              : item.quantity > 1
              ? item.quantity - 1
              : 1
        };
      }
      return { productId: item.productId, quantity: item.quantity };
    });
    dispatch(updateCartRequest(updated));
  };

  return (
    <div>
      <h1>Cart</h1>
      {items.length === 0 && <p>No items in cart</p>}
      <ul>
        {items.map((p, index) => (
          <li key={index}>
            <b>{p.title}</b> - ${p.price} × {p.quantity} = $
            {(p.price * p.quantity).toFixed(2)}
            <button onClick={() => updateQuantity(p.productId, "inc")}>
              +
            </button>
            <button onClick={() => updateQuantity(p.productId, "dec")}>
              -
            </button>
            <button
              onClick={() => dispatch(deleteFromCartRequest(p.productId))}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
      <h2>Total: ${total.toFixed(2)}</h2>
    </div>
  );
}
