import React, { useContext, useEffect, useRef } from "react";
import { CartContext } from "../context/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  ChevronDown,
  Hexagon,
  Layers3,
} from "lucide-react";
import { Link } from 'react-router-dom'; // Import Link
import featuredProductsBg from '/src/images/bg_fp.jpg';

function Home() {
  const { addToCart } = useContext(CartContext);
  const products = [
    {
      id: '01',
      name: "Product 1",
      price: 29.99,
      image: "one.jpeg",
    },
    {
      id: '02',
      name: "Product 2",
      price: 49.99,
      image: "two.jpeg",
    },
    {
      id: '03',
      name: "Product 3",
      price: 19.99,
      image: "three.jpeg",
    },
  ];

  const containerRef = useRef(null);
  const bgParallaxRef = useRef(null);
  const textParallaxRef = useRef(null);
  const productsSectionRef = useRef(null); // Ref for the products section

  // Parallax effect and more
  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current && bgParallaxRef.current && textParallaxRef.current) {
        const scrollY = window.scrollY;

        // Move background and text
        bgParallaxRef.current.style.transform = `translateY(${scrollY * 0.3}px) scale(${1 + scrollY * 0.001})`;
        textParallaxRef.current.style.transform = `translateY(${scrollY * 0.15}px)`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Auto-rotate function for shapes
  useEffect(() => {
    const rotateShapes = () => {
      const shapeElements = document.querySelectorAll('.floating-shape');
      shapeElements.forEach((shape) => {
        const currentRotation = parseFloat(shape.getAttribute('data-rotation')) || 0;
        const newRotation = currentRotation + 1; // Adjust rotation speed here
        shape.style.transform = `rotate(${newRotation}deg)`;
        shape.setAttribute('data-rotation', newRotation);
      });
    };

    const intervalId = setInterval(rotateShapes, 20); // Adjust interval for speed
    return () => clearInterval(intervalId);
  }, []);

  const handleExploreClick = () => {
    if (productsSectionRef.current) {
      productsSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };


  return (
    <div>
      {/* Hero Section */}
      <section
        ref={containerRef}
        className="relative bg-gradient-to-br from-purple-800 to-pink-800 text-white text-center py-44 px-4 overflow-hidden"
      >
        {/* Parallax Background Image */}
        <div
          ref={bgParallaxRef}
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: "url(hero-background.jpg)" }}
        />

        {/* Overlay with Animated Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 to-transparent" />

        <div ref={textParallaxRef} className="container mx-auto relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 60, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="text-7xl font-extrabold mb-10 tracking-tighter drop-shadow-3xl flex items-center justify-center gap-4"
          >

            Ethereal Elegance

          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeInOut", delay: 0.4 }}
            className="text-2xl mb-16 text-gray-200 max-w-4xl mx-auto"
          >
            Immerse yourself in a world where luxury transcends the ordinary.  Our
            exclusive collection is meticulously crafted to elevate your style to
            unprecedented heights.
          </motion.p>
          <motion.button
            whileHover={{ scale: 1.1, x: 5 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 500, damping: 20 }}
            onClick={handleExploreClick} // Use the new function here
            className="bg-white text-purple-900 px-12 py-4 rounded-full font-semibold text-2xl
                        shadow-2xl hover:shadow-purple-500/50 transition-all duration-300
                        flex items-center gap-3 cursor-pointer" // added cursor-pointer
          >
            <Layers3 className="w-6 h-6" />
            Explore the Collection
            <ArrowRight className="w-6 h-6" />
          </motion.button>
        </div>

        {/* Floating Shapes (Animated) */}
        <AnimatePresence>
          {[
            { x: -150, y: 100, size: 100, bg: "rgba(100, 80, 250, 0.4)", rotate: 10 },
            { x: 180, y: -120, size: 140, bg: "rgba(250, 120, 180, 0.3)", rotate: 30 },
            { x: -250, y: -180, size: 80, bg: "rgba(80, 220, 250, 0.4)", rotate: -20 },
            { x: 300, y: 150, size: 120, bg: "rgba(255, 255, 255, 0.2)", rotate: 5 },
            { x: 0, y: -250, size: 90, bg: "rgba(200, 100, 250, 0.3)", rotate: -15 },
            { x: -300, y: 200, size: 110, bg: "rgba(255, 180, 100, 0.2)", rotate: 25 },
          ].map((shape, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: shape.x, y: shape.y, rotate: shape.rotate, scale: 0.5 }}
              animate={{
                opacity: 1,
                x: shape.x + Math.random() * 60 - 30,
                y: shape.y + Math.random() * 60 - 30,
                scale: 1,
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut",
                delay: index * 0.7,
              }}
              exit={{ opacity: 0, scale: 0.2 }}
              className="absolute rounded-full floating-shape"
              style={{
                width: shape.size,
                height: shape.size,
                backgroundColor: shape.bg,
                filter: "blur(12px)",
              }}
            />
          ))}
        </AnimatePresence>
      </section>

      {/* Featured Products Section */}
      <div
        ref={productsSectionRef}
        className="pt-32 p-10 relative overflow-hidden" // Added relative and overflow-hidden
        style={{
          backgroundImage:`url(${featuredProductsBg})`, // Updated background image URL
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Overlay for background image opacity */}
        <div className="absolute inset-0 bg-black/50 z-0"></div> {/* Dark overlay for readability */}

        <h2 className="text-3xl font-bold mb-8 text-center relative z-10 text-white">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 relative z-10"> {/* Content on top of overlay */}
          {products.map((product) => (
            <div key={product.id} className="group">
              {/* Product Link (for image and title) */}
              <Link to={`/products/${product.id}`} className="block">
                <div
                  className="border p-6 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300
                            bg-white/5 backdrop-blur-md hover:scale-[1.02] border-purple-500/10 cursor-pointer"
                >
                  <div className="relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full mb-4 rounded-lg shadow-md transition-all duration-300 group-hover:scale-105 "
                    />
                    <h3 className="text-xl font-bold text-white mb-2 transition-colors duration-300 group-hover:text-purple-300">{product.name}</h3> {/* Changed to text-white */}
                  </div>
                  <p className="text-gray-300 mb-4">${product.price.toFixed(2)}</p> {/* Changed to text-gray-300 */}

                </div>
              </Link>
              {/* Add to Cart Button (separate, no navigation) */}

              <button
                onClick={(e) => {
                  e.stopPropagation(); // Prevent link navigation
                  addToCart(product);
                }}
                className="mt-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full
                            hover:from-purple-600 hover:to-pink-600 transition-all duration-300
                            shadow-lg hover:shadow-purple-500/50 font-semibold text-lg w-full
                            flex items-center justify-center gap-3"
              >
                Add to Cart
                <ArrowRight className="ml-2 w-5 h-5" />
              </button>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
