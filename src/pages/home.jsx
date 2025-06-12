import React, { useContext, useEffect, useRef, useState } from "react"; // Added useState
import { CartContext } from "../context/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  ChevronDown,
  Hexagon,
  Layers3,
} from "lucide-react";
import { Link } from 'react-router-dom';
// import featuredProductsBg from '/src/images/bg_fp.jpg'; // This line is not used for hero, can be kept for products if needed later

// Array of images for the hero section slideshow
// Assuming these images are in your project's 'public' folder
const heroImages = [
  { src: '/1.png', alt: 'Elegant Product Image 1' },
  { src: '/2.png', alt: 'Elegant Product Image 2' },
  { src: '/3.png', alt: 'Elegant Product Image 3' },
  { src: '/4.png', alt: 'Elegant Product Image 4' },
];

function Home() {
  const { addToCart } = useContext(CartContext);
  // YOUR ORIGINAL PRODUCTS ARRAY - KEPT UNTOUCHED AS REQUESTED
  const products = [
    {
      id: '01',
      name: "Product 1",
      price: 29.99,
      image: "one.jpeg", // Assuming this is a relative path to public folder or images folder
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
  const productsSectionRef = useRef(null);

  const [currentImageIndex, setCurrentImageIndex] = useState(0); // State for current image in slideshow

  // Effect for image slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        (prevIndex + 1) % heroImages.length
      );
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval); // Clean up on component unmount
  }, []);

  // Parallax effect for both background image and text
  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current && bgParallaxRef.current && textParallaxRef.current) {
        const scrollY = window.scrollY;

        // Apply parallax to the div holding the current image
        // Original scale was 1 + scrollY * 0.001, adjusted slightly for smoother look with new background style
        bgParallaxRef.current.style.transform = `translateY(${scrollY * 0.3}px) scale(${1 + scrollY * 0.0001})`;
        textParallaxRef.current.style.transform = `translateY(${scrollY * 0.15}px)`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Auto-rotate function for shapes (kept as is)
  useEffect(() => {
    const rotateShapes = () => {
      const shapeElements = document.querySelectorAll('.floating-shape');
      shapeElements.forEach((shape) => {
        const currentRotation = parseFloat(shape.getAttribute('data-rotation')) || 0;
        const newRotation = currentRotation + 0.5; // Adjusted rotation speed for subtlety
        shape.style.transform = `rotate(${newRotation}deg)`;
        shape.setAttribute('data-rotation', newRotation);
      });
    };

    const intervalId = setInterval(rotateShapes, 50); // Adjusted interval for smoother speed
    return () => clearInterval(intervalId);
  }, []);


  const handleExploreClick = () => {
    if (productsSectionRef.current) {
      productsSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const currentHeroImage = heroImages[currentImageIndex]; // Get the current image object

  return (
    <div>
      {/* Hero Section - Focused on background changes */}
      <section
        ref={containerRef}
        // Original className for padding and overflow
        className="relative text-white text-center py-56 px-4 overflow-hidden"
        style={{
          top: '10px', // Added top: 100px
          paddingTop: '400px',
          right:'60px', // Overrides the padding-top from py-56
          width:'1500px'
        }}
      >
        {/* Parallax Background Images (Slideshow) */}
        {/* Uses AnimatePresence for smooth fade transitions between images */}
        <div ref={bgParallaxRef} className="absolute inset-0 z-0">
          <AnimatePresence initial={false}>
            <motion.img
              key={currentHeroImage.src}
              src={currentHeroImage.src}
              alt={currentHeroImage.alt}
              initial={{ opacity: 0 }}
              // Changed opacity to 1 for full visibility
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              // Changed object-cover to object-contain to ensure the full image is visible
              className="absolute inset-0 w-full h-full object-contain bg-center"
            />
          </AnimatePresence>
        </div>

        {/* Removed Overlay for content contrast (positioned above background images, below text) */}
        {/* <div className="absolute inset-0 bg-black/70 z-10" /> */}

        <div ref={textParallaxRef} className="container mx-auto relative z-20">
          {/* Removed Headline */}
          {/* <motion.h1
            initial={{ opacity: 0, y: 60, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="text-7xl lg:text-8xl font-extrabold mb-10 tracking-tight drop-shadow-lg flex items-center justify-center gap-4 text-gray-100"
          >
            Ethereal <span className="text-amber-500">Elegance</span>
          </motion.h1> */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeInOut", delay: 0.4 }}
            className="text-xl lg:text-2xl mb-16 text-gray-300 max-w-4xl mx-auto"
          >
            
          </motion.p>
          {/* Removed Button */}
          {/* <motion.button
            whileHover={{ scale: 1.05, x: 5, boxShadow: "0 15px 30px rgba(212, 175, 55, 0.4)" }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 500, damping: 20 }}
            onClick={handleExploreClick}
            className="bg-gradient-to-r from-gray-700 to-amber-600 text-white px-12 py-4 rounded-full font-semibold text-xl lg:text-2xl
                         shadow-xl hover:shadow-amber-500/50 transition-all duration-300
                         flex items-center justify-center gap-3 cursor-pointer"
          >
            <Layers3 className="w-6 h-6" />
            Explore the Collection
            <ArrowRight className="ml-2 w-5 h-5" />
          </motion.button> */}
        </div>

        {/* Floating Shapes (Animated) - Colors recalibrated for new palette */}
        <AnimatePresence>
          {[
            // Colors adjusted to be more in line with charcoal, muted golds, off-whites, and subtle blues
            { x: -150, y: 100, size: 100, bg: "rgba(166, 124, 0, 0.3)", rotate: 10 }, // Muted gold
            { x: 180, y: -120, size: 140, bg: "rgba(224, 224, 224, 0.2)", rotate: 30 }, // Off-white
            { x: -250, y: -180, size: 80, bg: "rgba(0, 188, 212, 0.2)", rotate: -20 }, // Subtle light blue hint
            { x: 300, y: 150, size: 120, bg: "rgba(255, 255, 255, 0.1)", rotate: 5 }, // Very light white
            { x: 0, y: -250, size: 90, bg: "rgba(100, 100, 100, 0.3)", rotate: -15 }, // Charcoal
            { x: -300, y: 200, size: 110, bg: "rgba(255, 255, 255, 0.15)", rotate: 25 }, // Another light white
          ].map((shape, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: shape.x, y: shape.y, rotate: shape.rotate, scale: 0.5 }}
              animate={{
                opacity: 1,
                x: shape.x + Math.random() * 60 - 30, // Slight random movement
                y: shape.y + Math.random() * 60 - 30,
                scale: 1,
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut",
                delay: index * 0.7, // Staggered entry
              }}
              exit={{ opacity: 0, scale: 0.2 }}
              className="absolute rounded-full floating-shape"
              style={{
                width: shape.size,
                height: shape.size,
                backgroundColor: shape.bg,
                filter: "blur(18px)", // Increased blur for softer look
              }}
            />
          ))}
        </AnimatePresence>
      </section>

      {/* Featured Products Section - KEPT ENTIRELY AS PROVIDED BY USER */}
      <div
        ref={productsSectionRef}
        className="py-16 px-4 md:px-10 relative overflow-hidden bg-gray-950"
      >
        <h2 className="text-4xl font-bold mb-12 text-center text-gray-100 relative after:content-[''] after:absolute after:left-1/2 after:-bottom-2 after:-translate-x-1/2 after:w-20 after:h-1 after:bg-blue-400 after:rounded-full">
          Featured Products
        </h2>

        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
          {products.map((product) => (
            <div key={product.id} className="group flex flex-col h-full">
              {/* Product Card */}
              <Link to={`/products/${product.id}`} className="block flex-grow">
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
                    <h3 className="text-xl font-bold text-white mb-2 transition-colors duration-300 group-hover:text-purple-300">{product.name}</h3>
                  </div>
                  <p className="text-gray-300 mb-4">${product.price.toFixed(2)}</p>
                </div>
              </Link>
              {/* Add to Cart Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation(); // Prevent link navigation
                  addToCart(product);
                }}
                className="mt-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-full
                           hover:from-blue-600 hover:to-purple-700 transition-all duration-300
                           shadow-lg hover:shadow-blue-500/50 font-semibold text-lg w-full flex items-center justify-center gap-3
                           hover:translate-y-[-2px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
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
