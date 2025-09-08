import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "../styles/Navbar.css";


export default function Navbar() {
const cartCount = useSelector((state) => state.cart?.items?.length || 0);
const wishlistCount = useSelector((state) => state.wishlist?.items?.length || 0);


  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">🛍 Store</Link>
      </div>

      <input type="text" placeholder="Search" className="search" />

      <div className="nav-actions">
        <Link to="/wishlist">💙 {wishlistCount}</Link>
        <Link to="/cart">🛒 {cartCount}</Link>
        <button className="login-btn">Log In</button>
      </div>
    </nav>
  );
}
