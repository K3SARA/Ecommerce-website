import React, { useContext } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button"; // Assuming you have a Button component
import { CartContext } from '../context/CartContext'; // Import your CartContext

const AdvancedCheckoutPage = () => {
  const navigate = useNavigate();
  const { cart } = useContext(CartContext); // Access the cart from the context
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const [shippingInfo, setShippingInfo] = useState({
    address: '',
    city: '',
    postalCode: '',
    country: '',
  });

  const [paymentMethod, setPaymentMethod] = useState('creditCard'); // Default payment method

  // Calculate totals based on the actual cart items
  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  const shippingCost = 5.00.toFixed(2); // Example shipping cost
  const totalAmount = (parseFloat(totalPrice) + parseFloat(shippingCost)).toFixed(2);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('customer')) {
      setCustomerInfo(prev => ({ ...prev, [name.substring(8).toLowerCase()]: value }));
    } else if (name.startsWith('shipping')) {
      setShippingInfo(prev => ({ ...prev, [name.substring(8).toLowerCase()]: value }));
    }
  };

  const handlePaymentChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real application, you would process the order here,
    // including sending data to a server.
    console.log('Order submitted:', { customerInfo, shippingInfo, paymentMethod, cart, totalAmount });
    navigate('/order-confirmation'); // Redirect to order confirmation page
  };

  if (!cart || cart.length === 0) {
    return (
      <div className="py-16 bg-gray-100 min-h-screen flex justify-center items-center">
        <div className="bg-white shadow-md rounded-md p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Your cart is empty.</h2>
          <Button onClick={() => navigate('/cart')}>Go to Cart</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16 bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Checkout</h1>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Customer Information */}
          <div className="bg-white shadow-md rounded-md p-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Customer Information</h2>
            <div className="mb-4">
              <label htmlFor="customerName" className="block text-gray-600 text-sm font-medium mb-2">Name</label>
              <input
                type="text"
                id="customerName"
                name="customerName"
                value={customerInfo.name}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:border-purple-500"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="customerEmail" className="block text-gray-600 text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                id="customerEmail"
                name="customerEmail"
                value={customerInfo.email}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:border-purple-500"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="customerPhone" className="block text-gray-600 text-sm font-medium mb-2">Phone</label>
              <input
                type="tel"
                id="customerPhone"
                name="customerPhone"
                value={customerInfo.phone}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>

          {/* Shipping Information */}
          <div className="bg-white shadow-md rounded-md p-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Shipping Information</h2>
            <div className="mb-4">
              <label htmlFor="shippingAddress" className="block text-gray-600 text-sm font-medium mb-2">Address</label>
              <input
                type="text"
                id="shippingAddress"
                name="shippingAddress"
                value={shippingInfo.address}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:border-purple-500"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="shippingCity" className="block text-gray-600 text-sm font-medium mb-2">City</label>
              <input
                type="text"
                id="shippingCity"
                name="shippingCity"
                value={shippingInfo.city}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:border-purple-500"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="shippingPostalCode" className="block text-gray-600 text-sm font-medium mb-2">Postal Code</label>
                <input
                  type="text"
                  id="shippingPostalCode"
                  name="shippingPostalCode"
                  value={shippingInfo.postalCode}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:border-purple-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="shippingCountry" className="block text-gray-600 text-sm font-medium mb-2">Country</label>
                <input
                  type="text"
                  id="shippingCountry"
                  name="shippingCountry"
                  value={shippingInfo.country}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:border-purple-500"
                  required
                />
              </div>
            </div>
          </div>

          {/* Payment Options and Order Summary */}
          <div className="bg-white shadow-md rounded-md p-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Payment Options</h2>
            <div className="mb-4">
              <label className="block text-gray-600 text-sm font-medium mb-2">Select Payment Method</label>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="creditCard"
                    name="paymentMethod"
                    value="creditCard"
                    checked={paymentMethod === 'creditCard'}
                    onChange={handlePaymentChange}
                    className="form-radio h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300"
                  />
                  <label htmlFor="creditCard" className="ml-2 text-gray-700">Credit Card</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="paypal"
                    name="paymentMethod"
                    value="paypal"
                    checked={paymentMethod === 'paypal'}
                    onChange={handlePaymentChange}
                    className="form-radio h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300"
                  />
                  <label htmlFor="paypal" className="ml-2 text-gray-700">PayPal</label>
                </div>
                {/* Add more payment options as needed */}
              </div>
            </div>

            <div className="mt-8 border-t pt-6">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">Order Summary</h2>
              <ul className="space-y-3">
                {cart.map(item => (
                  <li key={item.id} className="flex items-center justify-between text-gray-600">
                    <span>{item.name} ({item.quantity})</span>
                    <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                  </li>
                ))}
                <li className="flex items-center justify-between font-semibold text-gray-700 mt-4">
                  <span>Subtotal</span>
                  <span>${totalPrice}</span>
                </li>
                <li className="flex items-center justify-between font-semibold text-gray-700">
                  <span>Shipping</span>
                  <span>${shippingCost}</span>
                </li>
                <li className="flex items-center justify-between font-bold text-gray-800 text-lg mt-4">
                  <span>Total</span>
                  <span>${totalAmount}</span>
                </li>
              </ul>
              <Button type="submit" className="w-full mt-6 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2">
                Place Order
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdvancedCheckoutPage;