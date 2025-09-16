import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { filterProductsBySearch } from "../features/products/productSlice";
import { FaHeart, FaShoppingCart, FaStore } from "react-icons/fa";
import "../styles/Navbar.css";

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  // ✅ Count total quantity in cart
  const cartCount = useSelector(
    (state) =>
      state.cart?.items?.reduce((acc, item) => acc + item.quantity, 0) || 0
  );

  // Wishlist count (just number of products, not quantities)
  const wishlistCount = useSelector(
    (state) => state.wishlist?.items?.length || 0
  );

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    dispatch(filterProductsBySearch(value));
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="logo">
        <Link to="/">
          <FaStore /> Store
        </Link>
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search"
        className="search"
        value={searchTerm}
        onChange={handleSearch}
      />

      {/* Actions */}
      <div className="nav-actions">
        {/* Wishlist */}
        <Link to="/wishlist" className="icon-link">
          <FaHeart className="icon" />
          {wishlistCount > 0 && <span className="badge">{wishlistCount}</span>}
        </Link>

        {/* Cart */}
        <Link to="/cart" className="icon-link">
          <FaShoppingCart className="icon" />
          {cartCount > 0 && <span className="badge">{cartCount}</span>}
        </Link>

        {/* Login */}
        <button className="login-btn" onClick={handleLogin}>
          Log In
        </button>
      </div>
    </nav>
  );
}
