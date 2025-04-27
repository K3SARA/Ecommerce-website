import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";



function Home() {
  return (
    <div>
         <Navbar />
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between p-6 bg-white shadow-md"

      style={{ fontFamily: "'Poppins', sans-serif" }}>
        
        <div className="text-2xl font-bold mr-dafoe-regular">N.Allen</div>
        <div className="flex space-x-6">
            <Link to="/" className="text-gray-600 hover:text-black">Home</Link>
            <Link to="/products" className="text-gray-600 hover:text-black">Products</Link>
            <Link to="/cart" className="text-gray-600 hover:text-black">Cart</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section 
  className="text-center py-32 pt-48 bg-cover bg-center bg-no-repeat" 
  style={{ backgroundImage: "url('/bg_main.jpg')" }}
>
  <div className="bg-white/70 p-10 rounded-md inline-block">
    <h1 className="text-4xl font-bold mb-4">Welcome to N.Allen</h1>
    <p className="text-gray-600 mb-6">Find the best products at unbeatable prices</p>
    <button className="bg-black text-white py-2 px-6 rounded">Shop Now</button>
  </div>
</section>


      {/* Featured Products */}
      <section className="p-10">
        <h2 className="text-3xl font-bold mb-8 text-center">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {/* Product Card 1 */}
          <div className="border p-6 rounded-lg shadow hover:shadow-lg transition">
            <img src="one.jpeg" alt="Product" className="w-full mb-4 rounded" />
            <h3 className="text-xl font-bold mb-2">Product 1</h3>
            <p className="text-gray-600 mb-4">$29.99</p>
            <button className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800">Add to Cart</button>
          </div>

          {/* Product Card 2 */}
          <div className="border p-6 rounded-lg shadow hover:shadow-lg transition">
            <img src="two.jpeg" alt="Product" className="w-full mb-4 rounded" />
            <h3 className="text-xl font-bold mb-2">Product 2</h3>
            <p className="text-gray-600 mb-4">$49.99</p>
            <button className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800">Add to Cart</button>
          </div>

          {/* Product Card 3 */}
          <div className="border p-6 rounded-lg shadow hover:shadow-lg transition">
            <img src="three.jpeg" alt="Product" className="w-full mb-4 rounded" />
            <h3 className="text-xl font-bold mb-2">Product 3</h3>
            <p className="text-gray-600 mb-4">$19.99</p>
            <button className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800">Add to Cart</button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white text-center py-6 border-t">
        <p className="text-gray-600">&copy; 2025 MyShop. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;
