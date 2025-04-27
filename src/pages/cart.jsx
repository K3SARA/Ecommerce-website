import React from "react";
import Navbar from "../components/Navbar";

function Cart() {
  return (
    
    <div className="pt-32 p-10 min-h-screen bg-gray-50">
        <Navbar />
      {/* Page Title */}
      <h1 className="text-4xl font-bold mb-8 text-center">Your Cart</h1>

      {/* Cart Items List */}
      <div className="space-y-8">
        {/* Single Cart Item */}
        <div className="flex items-center justify-between bg-white p-6 rounded-lg shadow">
          <div className="flex items-center space-x-6">
            <img 
              src="https://via.placeholder.com/100" 
              alt="Product" 
              className="w-24 h-24 rounded object-cover"
            />
            <div>
              <h2 className="text-xl font-bold">Product 1</h2>
              <p className="text-gray-600">$29.99</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <input 
              type="number" 
              defaultValue={1} 
              className="w-16 text-center border rounded p-2"
            />
            <button className="text-red-500 hover:text-red-700">Remove</button>
          </div>
        </div>

        {/* Another cart item (copy and paste above div for more items) */}
      </div>

      {/* Cart Summary */}
      <div className="mt-12 bg-white p-8 rounded-lg shadow max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
        <div className="flex justify-between mb-4">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-bold">$29.99</span>
        </div>
        <div className="flex justify-between mb-6">
          <span className="text-gray-600">Shipping</span>
          <span className="font-bold">Free</span>
        </div>
        <div className="flex justify-between text-xl font-bold mb-6">
          <span>Total</span>
          <span>$29.99</span>
        </div>
        <button className="w-full bg-black text-white py-3 rounded hover:bg-gray-800">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}

export default Cart;
