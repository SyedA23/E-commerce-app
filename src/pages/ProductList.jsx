import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsRequest } from "../features/products/productSlice";
import { addToCartRequest } from "../features/cart/cartSlice";
import { addToWishlistRequest } from "../features/wishlist/wishlistSlice";
import "../styles/ProductList.css";

export default function ProductList() {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProductsRequest());
  }, [dispatch]);

  const handleAddToCart = (product) => {
    dispatch(
      addToCartRequest({
        userId: 1,
        date: new Date().toISOString(),
        products: [{ productId: product.id, quantity: 1 }]
      })
    );
  };

  const handleAddToWishlist = (product) => {
    dispatch(addToWishlistRequest(product));
  };

  return (
    <div className="store-container">
      {/* Sidebar Categories */}
      <aside className="sidebar">
        <h3>Categories</h3>
        <ul>
          <li>All</li>
          <li>Cloths</li>
          <li>Electronics</li>
          <li>Furniture</li>
          <li>Shoes</li>
          <li>Miscellaneous</li>
        </ul>
      </aside>

      {/* Product List */}
      <main className="products">
        {products.map((product) => (
          <div key={product.id} className="card">
            <img src={product.image} alt={product.title} />
            <h4>{product.title}</h4>
            <p>{product.description.slice(0, 60)}...</p>
            <p>
              <b>Price:</b> ₹ {product.price}/-
            </p>
            <div className="actions">
              <button onClick={() => handleAddToCart(product)}>
                🛒 Add To Cart
              </button>
              <button onClick={() => handleAddToWishlist(product)}>
                💙 Add To Wishlist
              </button>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}
