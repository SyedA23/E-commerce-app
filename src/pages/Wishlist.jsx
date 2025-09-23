import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromWishlist } from "../features/wishlist/wishlistSlice";
import { addToCartRequest } from "../features/cart/cartSlice"; // Make sure this exists
import "../styles/Wishlist.css";

export default function Wishlist() {
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const dispatch = useDispatch();

  const handleAddToCart = (item) => {
    dispatch(
      addToCartRequest({
        productId: item.id,
        title: item.title,
        image: item.image,
        price: item.price,
        quantity: 1
      })
    );
  };

  return (
    <div className="wishlist-container">
      <h2 className="wishlist-title">My Wishlist</h2>

      {wishlistItems.length === 0 ? (
        <p className="empty-message">Your wishlist is empty!</p>
      ) : (
        <div className="wishlist-items">
          {wishlistItems.map((item) => (
            <div key={item.id} className="wishlist-item">
              {/* Product Image */}
              <img
                src={item.image}
                alt={item.title}
                className="wishlist-item-img"
                onError={(e) => (e.target.src = "/fallback-image.png")}
              />

              {/* Product Title */}
              <div className="wishlist-item-details">
                <h3>{item.title}</h3>
              </div>

              {/* Buttons */}
              <div className="wishlist-item-buttons">
                <button
                  className="add-to-cart-btn"
                  onClick={() => handleAddToCart(item)}
                >
                  Add to Cart
                </button>
                <button
                  className="remove-btn"
                  onClick={() => dispatch(removeFromWishlist(item.id))}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
