import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchProductByIdRequest } from "../features/products/productSlice";
import { addToCartRequest } from "../features/cart/cartSlice";
import { addToWishlist } from "../features/wishlist/wishlistSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/ProductDetail.css";

export default function ProductDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const {
    productDetail: product,
    loading,
    error
  } = useSelector((state) => state.products);
  const {
    items = [],
    loading: cartLoading,
    error: cartError
  } = useSelector((state) => state.cart);

  useEffect(() => {
    if (id) dispatch(fetchProductByIdRequest(Number(id))); // ensure numeric id
  }, [dispatch, id]);

  const handleAddToCart = () => {
    if (!product?.id) {
      toast.error("Product not available");
      return;
    }
    dispatch(
      addToCartRequest({
        userId: 1, // fixed
        date: new Date().toISOString(),
        products: [
          {
            productId: product.id,
            quantity: 1,
            price: product.price,
            title: product.title,
            image: product.image
          }
        ]
      })
    );
    toast.success("Item added to cart!");
  };

  const handleAddToWishlist = () => {
    if (!product) return;
    dispatch(addToWishlist(product));
    toast.info("Added to wishlist!");
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!product) return <p>Product not found</p>;

  return (
    <div className="detail-container">
      <div className="detail-image">
        <img src={product.image} alt={product.title} />
      </div>
      <div className="detail-info">
        <p className="category">{product.category}</p>
        <h2>{product.title}</h2>
        <p className="rating">⭐⭐⭐⭐☆</p>
        <p className="desc">{product.description}</p>

        <h3>₹{product.price}</h3>
        <p>Cart Items: {items?.length || 0}</p>

        <div className="buttons">
          <button onClick={handleAddToWishlist}>Add to Wishlist</button>
          <button onClick={handleAddToCart} disabled={cartLoading}>
            {cartLoading ? "Adding..." : "Add to Cart"}
          </button>
        </div>

        {cartError && <p className="error">Error: {cartError}</p>}
      </div>
    </div>
  );
}
