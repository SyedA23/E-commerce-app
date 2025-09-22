import React from "react";
import { Routes, Route } from "react-router-dom";
import ProductList from "./pages/ProductList";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Navbar from "./components/Navbar";


function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="*" element={<ProductList />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="wishlist" element={<Wishlist />} />
      </Routes>
    </>
  );
}

export default App;
