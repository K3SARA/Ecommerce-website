import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between p-6 bg-white shadow-md"
      style={{ fontFamily: "'Poppins', sans-serif" }}>
      
      <div className="text-2xl font-bold mr-dafoe-regular">N.Allen</div>
      <div className="flex space-x-6">
        <Link to="/" className="text-gray-600 hover:text-black">Home</Link>
        <Link to="/products" className="text-gray-600 hover:text-black">Products</Link>
        <Link to="/cart" className="text-gray-600 hover:text-black">Cart</Link>
      </div>
    </nav>
  );
}

export default Navbar;
