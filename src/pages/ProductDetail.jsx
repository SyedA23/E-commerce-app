import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchProductByIdRequest } from "../features/products/productSlice";
import { addToCartRequest } from "../features/cart/cartSlice";
import { addToWishlistRequest } from "../features/wishlist/wishlistSlice";
import "../styles/ProductDetail.css";

export default function ProductDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { product, loading } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProductByIdRequest(id));
  }, [dispatch, id]);

  const handleAddToCart = () => {
    dispatch(
      addToCartRequest({
        userId: 1,
        date: new Date().toISOString(),
        products: [{ productId: product.id, quantity: 1 }],
      })
    );
  };

  const handleAddToWishlist = () => {
    dispatch(addToWishlistRequest(product));
  };

  if (loading) return <p>Loading...</p>;
  if (!product) return <p>Product not found</p>;

  return (
    <div className="detail-container">
      {/* Left side image */}
      <div className="detail-image">
        <img src={product.image} alt={product.title} />
      </div>

      {/* Right side content */}
      <div className="detail-info">
        <p className="category">{product.category}</p>
        <h2>{product.title}</h2>
        <p className="rating">⭐⭐⭐⭐☆</p>
        <p className="desc">{product.description}</p>

        <div className="color-options">
          <span className="color-circle gray"></span>
          <span className="color-circle green"></span>
          <span className="color-circle black"></span>
        </div>

        <h3>₹{product.price}</h3>
        <div className="buttons">
          <button onClick={handleAddToWishlist}>Add to Wishlist</button>
          <button onClick={handleAddToCart}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
}
