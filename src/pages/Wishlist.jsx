import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromWishlistRequest } from "../features/wishlist/wishlistSlice";
import "../styles/Wishlist.css";

export default function Wishlist() {
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const dispatch = useDispatch();

  return (
    <div className="wishlist-container">
      <h2 className="wishlist-title">My Wishlist</h2>

      {wishlistItems.length === 0 ? (
        <p className="empty-message">Your wishlist is empty!</p>
      ) : (
        <div className="wishlist-items">
          {wishlistItems.map((item) => (
            <div key={item.productId} className="wishlist-item">
              {/* Product Image */}
              <img src={item.image} alt={item.title} className="wishlist-img" />

              {/* Product Details */}
              <div className="wishlist-details">
                <h3>{item.title}</h3>
                <p className="wishlist-price">₹ {item.price}</p>
              </div>

              {/* Remove Button */}
              <button
                className="remove-btn"
                onClick={() =>
                  dispatch(removeFromWishlistRequest(item.productId))
                }
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
