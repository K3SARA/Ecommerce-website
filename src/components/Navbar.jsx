import React, { useState, useRef, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { FiShoppingCart, FiSearch, FiUser } from "react-icons/fi"; // Import FiUser icon
import { motion, AnimatePresence } from "framer-motion";
import { CartContext } from "../context/CartContext";

// Add onOpenLoginModal and firebaseReady to Navbar's props
function Navbar({ onOpenLoginModal, firebaseReady }) { // Added firebaseReady prop
  const { cart } = useContext(CartContext);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const searchInputRef = useRef(null);
  const navItemsRef = useRef(null);
  const allProducts = [
    { id: '01', name: "Product 1", price: 29.99, image: "one.jpeg", description: "This is the description for Product 1.  It is a very good product.", category: "Electronics" },
    { id: '02', name: "Product 2", price: 49.99, image: "two.jpeg", description: "This is the description for Product 2.  It is another great product.", category: "Clothing" },
    { id: '03', name: "Product 3", price: 19.99, image: "three.jpeg", description: "This is the description for Product 3.  You will love this product.", category: "Home Goods" },
    { id: '04', name: "Product 4", price: 19.99, image: "three.jpeg", description: "This is the description for Product 4.  You will love this product.", category: "Home Goods" },
    { id: '05', name: "Product 5", price: 19.99, image: "three.jpeg", description: "This is the description for Product 5.  You will love this product.", category: "Home Goods" },
  ];
  const totalItemsInCart = cart?.reduce((total, item) => total + item.quantity, 0) ?? 0;

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  useEffect(() => {
    if (searchTerm) {
      const results = allProducts.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchTerm]);

  const handleSearchClick = () => {
    setIsSearchOpen(!isSearchOpen);
    if(isSearchOpen) {
      setSearchTerm('');
      setSearchResults([]);
    }
  };

  useEffect(() => {
    if (navItemsRef.current) {
      if (isSearchOpen) {
        navItemsRef.current.style.marginRight = '220px';
      } else {
        navItemsRef.current.style.marginRight = '0px';
      }
      navItemsRef.current.style.transition = 'margin-right 0.3s ease';
    }
  }, [isSearchOpen]);

  return (
    <nav
      className="fixed top-0 left-0 w-full z-50 flex items-center justify-between p-6 bg-white shadow-md"
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      <div className="text-2xl font-bold" style={{ fontFamily: "'Mr Dafoe', cursive" }}>
        N.Allen
      </div>
      <div className="flex items-center space-x-4">
        <motion.div
          ref={navItemsRef}
          className="flex items-center space-x-6 h-10"
          style={{ marginRight: isSearchOpen ? '220px' : '0px', transition: 'margin-right 0.3s ease' }}
        >
          <Link to="/" className="text-gray-600 hover:text-black" style={{lineHeight: '2.5rem'}}>
              Home
          </Link>
          <Link to="/products" className="text-gray-600 hover:text-black" style={{lineHeight: '2.5rem'}}>
              Products
          </Link>
          {/* Login Icon - now disabled if Firebase is not ready */}
          <motion.div
            className={firebaseReady ? "cursor-pointer" : "cursor-not-allowed opacity-50"} // Disable if not ready
            onClick={firebaseReady ? onOpenLoginModal : null} // Only clickable if ready
            whileHover={firebaseReady ? { scale: 1.1 } : {}}
            whileTap={firebaseReady ? { scale: 0.9 } : {}}
          >
            <FiUser size={24} className="text-gray-600 hover:text-black" />
          </motion.div>
          <Link to="/cart" className="text-gray-600 hover:text-black flex items-center relative" style={{lineHeight: '2.5rem'}}>
            <FiShoppingCart className="mr-1" size={24} />
            {totalItemsInCart > 0 && (
              <div className="absolute top-0 right-0 bg-red-500 text-white rounded-full min-w-[20px] h-5 flex items-center justify-center px-1 text-xs font-medium transform translate-x-1/2 -translate-y-1/2 shadow-md">
                {totalItemsInCart}
              </div>
            )}
          </Link>
        </motion.div>
        {/* Search Bar */}
        <div className="relative flex items-center">
          <motion.div
            className="cursor-pointer"
            onClick={handleSearchClick}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FiSearch size={24} className="text-gray-600 hover:text-black" />
          </motion.div>
          <AnimatePresence>
            {isSearchOpen && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 222 }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                // Changed 'rounded-md' to 'rounded-full' for more rounded corners
                className="absolute top-full right-0 mt-2 bg-white rounded-full shadow-lg border border-gray-200 z-10"
                style={{ top: '-10px', height: '30px', right: '30px' }}
              >
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  // Added 'rounded-full' to the input for consistent rounding
                  className="h-full w-full px-4 text-gray-800 placeholder:text-gray-400 focus:outline-none rounded-full"
                  placeholder="Search products..."
                />
                {searchResults.length > 0 && (
                  <ul className="absolute top-full left-0 w-full bg-white rounded-b-full shadow-lg border border-t-0 border-gray-200 max-h-60 overflow-y-auto">
                    {searchResults.map((product) => (
                      <li key={product.id}>
                        <Link
                          to={`/products/${product.id}`}
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                          onClick={() => setIsSearchOpen(false)}
                        >
                          {product.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
