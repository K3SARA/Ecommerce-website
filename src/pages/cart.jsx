import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Button } from "@/components/ui/button"; // Import Button - adjust path if needed
import { ShoppingCart, ShoppingBag, Minus, Plus, Trash2 } from "lucide-react"; // Added new icons for better UI
import { useNavigate, Link } from 'react-router-dom'; // Import useNavigate and Link

function Cart() {
  const { cart, removeFromCart, updateQuantity } = useContext(CartContext);
  const navigate = useNavigate();

  // Calculate the total price of items in the cart
  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleCheckout = () => {
    navigate('/checkout'); // Use navigate to go to the checkout page
  };

  // Improved Empty Cart State
  if (!cart || cart.length === 0) {
    return (
      <div className="pt-32 p-10 flex flex-col items-center justify-center min-h-[calc(100vh-100px)] bg-gray-50">
        <ShoppingBag className="w-24 h-24 text-gray-400 mb-6" />
        <h2 className="text-3xl font-bold text-gray-800 mb-3">Your Cart is Empty</h2>
        <p className="text-gray-600 mb-8">Looks like you haven't added anything to your cart yet.</p>
        <Button
          onClick={() => navigate('/')} // Navigate to home or products page
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-full shadow-lg transition-colors duration-200"
        >
          Start Shopping
        </Button>
      </div>
    );
  }

  return (
    // Main container for the cart page, with background and top padding
    <div className="pt-24 p-4 md:p-10 bg-gray-50 min-h-screen">
      {/* Centralized content container with white background, shadow, and rounded corners */}
      <div className="max-w-4xl mx-auto bg-white p-6 md:p-10 rounded-xl shadow-lg border border-gray-100">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-10 text-center">Your Shopping Cart</h2>

        {/* List of Cart Items */}
        <div className="flex flex-col gap-6">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex flex-col md:flex-row items-center justify-between
                         border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md
                         transition-shadow duration-200 bg-white"
            >
              <div className="flex items-center gap-6 w-full md:w-auto mb-4 md:mb-0">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-md border border-gray-100 shadow-sm"
                />
                <div className="flex-1">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-800">{item.name}</h3>
                  <p className="text-gray-600 text-lg mt-1">${item.price.toFixed(2)}</p>
                  <div className="flex items-center mt-3">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity === 1}
                      className="p-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-md
                                 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      aria-label="Decrease quantity"
                    >
                      <Minus size={18} />
                    </button>
                    <span className="px-4 text-lg font-medium text-gray-800">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-md
                                 transition-colors duration-200"
                      aria-label="Increase quantity"
                    >
                      <Plus size={18} />
                    </button>
                  </div>
                </div>
              </div>
              <div className="text-right flex flex-col items-end md:items-end w-full md:w-auto">
                <p className="font-extrabold text-xl md:text-2xl text-gray-900 mb-2">${(item.price * item.quantity).toFixed(2)}</p>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-600 hover:text-red-800 text-sm font-medium
                             transition-colors duration-200 flex items-center gap-1"
                  aria-label="Remove item from cart"
                >
                  <Trash2 size={16} /> Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Total Section */}
        <div className="bg-gray-50 p-6 md:p-8 rounded-lg border border-gray-200 mt-10
                        flex flex-col items-end gap-6 shadow-inner">
          <h3 className="text-3xl font-extrabold text-gray-900">Total: ${totalPrice.toFixed(2)}</h3>
          <Button
            onClick={handleCheckout}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white
                       hover:from-purple-700 hover:to-pink-700 transition-all duration-300
                       shadow-lg hover:shadow-purple-500/50 font-semibold text-lg py-3 px-8
                       rounded-full flex items-center gap-3 transform hover:scale-105"
          >
            <ShoppingCart className="w-6 h-6" />
            Proceed to Checkout
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
