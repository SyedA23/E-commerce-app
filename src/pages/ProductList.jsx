import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import {
  fetchProductsRequest,
  fetchCategoriesRequest,
  fetchProductsByCategoryRequest
} from "../features/products/productSlice";
import { addToCartRequest } from "../features/cart/cartSlice";
import { addToWishlist } from "../features/wishlist/wishlistSlice";
import "../styles/ProductList.css";

export default function ProductList() {
  const dispatch = useDispatch();
  const { products, categories, loading, error } = useSelector(
    (state) => state.products
  );

  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    dispatch(fetchProductsRequest());
    dispatch(fetchCategoriesRequest());
  }, [dispatch]);

  const handleAddToCart = (product) => {
    dispatch(
      addToCartRequest({
        productId: product.id,
        quantity: 1,
        // You might need to include these based on your cart slice implementation:
        title: product.title,
        price: product.price,
        image: product.image
      })
    );
  };

  const handleAddToWishlist = (product) => {
    dispatch(addToWishlist(product));
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    if (category === "All") {
      dispatch(fetchProductsRequest());
    } else {
      dispatch(fetchProductsByCategoryRequest(category));
    }
  };

  // Show loading state
  if (loading) return <div className="loading">Loading products...</div>;

  // Show error state
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="store-container">
      {/* Sidebar Categories */}
      <aside className="sidebar">
        <h3>Categories</h3>
        <ul>
          <li
            className={selectedCategory === "All" ? "active" : ""}
            onClick={() => handleCategoryClick("All")}
          >
            All
          </li>
          {categories.map((cat) => (
            <li
              key={cat}
              className={selectedCategory === cat ? "active" : ""}
              onClick={() => handleCategoryClick(cat)}
            >
              {cat}
            </li>
          ))}
        </ul>
      </aside>

      {/* Product List */}
      <main className="products">
        {products && products.length > 0
          ? products.map((product) => (
              <div key={product.id} className="card">
                <div className="card-image-container">
                  <Link to={`/product/${product.id}`} className="card-link">
                    <img
                      src={product.image}
                      alt={product.title}
                      onError={(e) => {
                        e.target.src = "/fallback-image.png";
                      }}
                    />
                  </Link>
                </div>
                <div className="card-content">
                  <Link to={`/product/${product.id}`} className="card-link">
                    <h4>{product.title}</h4>
                    <p className="description">
                      {product.description?.slice(0, 60)}...
                    </p>
                    <p className="price">
                      <b>Price:</b> ₹ {product.price}/-
                    </p>
                  </Link>
                  <div className="actions">
                    <button
                      onClick={() => handleAddToCart(product)}
                      aria-label="Add to cart"
                    >
                      🛒 Add To Cart
                    </button>
                    <button
                      onClick={() => handleAddToWishlist(product)}
                      aria-label="Add to wishlist"
                    >
                      💙 Add To Wishlist
                    </button>
                  </div>
                </div>
              </div>
            ))
          : !loading && <p className="no-products">No products found.</p>}
      </main>
    </div>
  );
}
