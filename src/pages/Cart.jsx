import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCartRequest,
  deleteFromCartRequest,
  updateCartRequest
} from "../features/cart/cartSlice";
import "../styles/Cart.css";

export default function Cart() {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchCartRequest());
  }, [dispatch]);

  const updateQuantity = (productId, type) => {
    const currentItem = items.find((item) => item.productId === productId);
    if (!currentItem) return;

    const newQuantity =
      type === "inc"
        ? currentItem.quantity + 1
        : Math.max(1, currentItem.quantity - 1);

    // Pass as array with one item (to match what updateCartSuccess expects)
    dispatch(updateCartRequest([{ productId, quantity: newQuantity }]));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const calculatedTotal = items.reduce(
    (acc, cur) => acc + (Number(cur.price) || 0) * (cur.quantity || 1),
    0
  );

  const displayTotal = calculatedTotal.toFixed(2);
  const itemCount = items.reduce((acc, cur) => acc + (cur.quantity || 1), 0);

  return (
    <div className="cart-container">
      <h1 className="cart-title">Shopping Cart</h1>

      {items.length === 0 ? (
        <p className="empty-cart">No items in cart</p>
      ) : (
        <div className="cart-content">
          <div className="cart-items">
            {items.map((p, index) => (
              <div
                className="cart-item"
                key={p.productId || `cart-item-${index}`}
              >
                <img
                  src={p.image}
                  alt={p.title}
                  className="cart-item-img"
                  onError={(e) => {
                    e.target.src = "/fallback-image.png";
                  }}
                />

                <div className="cart-item-details">
                  <h3>{p.title}</h3>
                  <p>
                    <span className="cart-price">
                      ₹ {Number(p.price).toFixed(2)}
                    </span>
                  </p>

                  <div className="quantity-controls">
                    <button
                      onClick={() => updateQuantity(p.productId, "dec")}
                      disabled={p.quantity <= 1}
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>
                    <span>{p.quantity}</span>
                    <button
                      onClick={() => updateQuantity(p.productId, "inc")}
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>

                  <button
                    className="remove-btn"
                    onClick={() => dispatch(deleteFromCartRequest(p.productId))}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="price-details">
            <h3>Price Details</h3>
            <div className="price-row">
              <span>
                Price ({itemCount} {itemCount === 1 ? "item" : "items"})
              </span>
              <span>₹ {displayTotal}</span>
            </div>
            <div className="price-row">
              <span>Delivery Charges</span>
              <span className="free-text">Free</span>
            </div>
            <hr />
            <div className="price-row total">
              <span>Total Amount</span>
              <span>₹ {displayTotal}</span>
            </div>
            <button className="checkout-btn">Checkout Now</button>
          </div>
        </div>
      )}
    </div>
  );
}
