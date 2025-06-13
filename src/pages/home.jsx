import React, { useContext, useEffect, useRef, useState } from "react";
import { CartContext } from "../context/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  ChevronDown,
  Hexagon,
  Layers3,
  Heart, // Added Heart for card icon
  Share2, // Added Share2 for card icon
  Plus, // Added Plus for Add to Cart button
  ChevronLeft, // Added for carousel navigation
  ChevronRight // Added for carousel navigation
} from "lucide-react";
import { Link } from 'react-router-dom';
// import featuredProductsBg from '/src/images/bg_fp.jpg'; // This line is not used for hero, can be kept for products if needed later

// Array of images for the hero section slideshow
const heroImages = [
  { src: '/1.png', alt: 'Slideshow Image 1' }, // Updated to s1.png
  { src: '/2.png', alt: 'Slideshow Image 2' }, // Added s2.png
  { src: '/3.png', alt: 'Slideshow Image 3' }, // Added s3.png
  { src: '/4.png', alt: 'Slideshow Image 4' }, // Added s4.png
];

// New product data specifically for the luxury product slideshow
const luxuryProductsData = [
  { id: 'luxora', name: 'LUXORA', price: 3500, image: '/s1.png', color: '#D18228' }, // Orange
  { id: 'grandeur', name: 'GRANDEUR', price: 2200, image: '/s2.png', color: '#228B9F' }, // Teal
  { id: 'prestigio', name: 'PRESTIGIO', price: 4500, image: '/s3.png', color: '#6A1B9A' }, // Deep Purple
  { id: 'solaris', name: 'SOLARIS', price: 3800, image: '/s4.png', color: '#4CAF50' }, // Green
  { id: 'celestia', name: 'CELESTIA', price: 2900, image: '/s5.png', color: '#2196F3' }, // Blue
  { id: 'noir', name: 'NOIR', price: 2500, image: '/s6.png', color: '#424242' }, // Dark Gray/Black
];


function Home() {
  const { addToCart } = useContext(CartContext);
  // YOUR ORIGINAL PRODUCTS ARRAY - KEPT UNTOUCHED AS REQUESTED
  const products = [
    {
      id: '01',
      name: "Marshmellow White Unisex",
      price: 29.99,
      image: "one.jpeg", // Assuming this is a relative path to public folder or images folder
    },
    {
      id: '02',
      name: "Marshmellow Black Unisex",
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

  const containerRef = useRef(null); // Ref for hero section
  const bgParallaxRef = useRef(null); // Ref for hero section background parallax
  const textParallaxRef = useRef(null); // Ref for hero section text parallax
  const productsSectionRef = useRef(null); // Ref for the existing products section

  const [currentImageIndex, setCurrentImageIndex] = useState(0); // State for hero image slideshow
  const [activeLuxuryProductIndex, setActiveLuxuryProductIndex] = useState(0); // State for luxury product slideshow


  // Hero Section Image Slideshow Effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        (prevIndex + 1) % heroImages.length
      );
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  // Hero Section Parallax Effect
  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current && bgParallaxRef.current && textParallaxRef.current) {
        const scrollY = window.scrollY;
        bgParallaxRef.current.style.transform = `translateY(${scrollY * 0.3}px) scale(${1 + scrollY * 0.0001})`;
        textParallaxRef.current.style.transform = `translateY(${scrollY * 0.15}px)`;
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Shapes Auto-rotate Effect
  useEffect(() => {
    const rotateShapes = () => {
      const shapeElements = document.querySelectorAll('.floating-shape');
      shapeElements.forEach((shape) => {
        const currentRotation = parseFloat(shape.getAttribute('data-rotation')) || 0;
        const newRotation = currentRotation + 0.5;
        shape.style.transform = `rotate(${newRotation}deg)`;
        shape.setAttribute('data-rotation', newRotation);
      });
    };
    const intervalId = setInterval(rotateShapes, 50);
    return () => clearInterval(intervalId);
  }, []);

  // Luxury Product Slideshow Auto-Advance Effect
  useEffect(() => {
    const autoAdvanceInterval = setInterval(() => {
      setActiveLuxuryProductIndex((prevIndex) =>
        (prevIndex + 1) % luxuryProductsData.length
      );
    }, 4000); // Auto-advance every 4 seconds

    return () => clearInterval(autoAdvanceInterval);
  }, []);


  const handleExploreClick = () => {
    if (productsSectionRef.current) {
      productsSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const currentHeroImage = heroImages[currentImageIndex];

  // Function to get card animation properties based on its position relative to the active card
  const getCardVariants = (index) => {
    const total = luxuryProductsData.length;
    const offset = (index - activeLuxuryProductIndex + total) % total;

    // Define properties for different positions
    const variants = {
      // Active (center)
      '0': { x: '0%', y: '0%', rotate: 0, scale: 1, zIndex: 5, opacity: 1 },
      // Immediate right (peeking) - Increased x for more separation, slightly reduced opacity
      '1': { x: '60%', y: '0%', rotate: 0, scale: 0.9, zIndex: 4, opacity: 0.8 },
      // Further right (more hidden) - Increased x for more separation, more reduced opacity
      '2': { x: '120%', y: '0%', rotate: 0, scale: 0.8, zIndex: 3, opacity: 0.5 },
      // Immediate left (peeking) - Increased x for more separation, slightly reduced opacity
      [total - 1]: { x: '-60%', y: '0%', rotate: 0, scale: 0.9, zIndex: 4, opacity: 0.8 },
      // Further left (more hidden) - Increased x for more separation, more reduced opacity
      [total - 2]: { x: '-120%', y: '0%', rotate: 0, scale: 0.8, zIndex: 3, opacity: 0.5 },
      // Hidden far left (or any others beyond the immediate visible ones) - Pushed further off-screen
      'hidden-left': { x: '-300%', y: '0%', rotate: 0, scale: 0.7, zIndex: 0, opacity: 0 },
      // Hidden far right - Pushed further off-screen
      'hidden-right': { x: '300%', y: '0%', rotate: 0, scale: 0.7, zIndex: 0, opacity: 0 },
    };

    // Map offset to variant key
    if (offset === 0) return variants['0'];
    if (offset === 1) return variants['1'];
    if (offset === 2) return variants['2'];
    if (offset === total - 1) return variants[total - 1]; // Use actual index for wrap-around
    if (offset === total - 2) return variants[total - 2]; // Use actual index for wrap-around

    // For anything further out, make it hidden
    if (offset > total / 2) return variants['hidden-left'];
    return variants['hidden-right'];
  };

  const goToNextLuxuryProduct = () => {
    setActiveLuxuryProductIndex((prevIndex) => (prevIndex + 1) % luxuryProductsData.length);
  };

  const goToPrevLuxuryProduct = () => {
    setActiveLuxuryProductIndex((prevIndex) => (prevIndex - 1 + luxuryProductsData.length) % luxuryProductsData.length);
  };


  return (
    <div>
      {/* Hero Section - Focused on background changes */}
      <section
        ref={containerRef}
        className="relative text-white text-center py-56 px-4 overflow-hidden"
        style={{
          top: '0px',
          paddingTop: '380px',
          right: '60px',
          width: '1500px',
          bottom: '0px',
        }}
      >
        {/* Parallax Background Images (Slideshow) */}
        <div ref={bgParallaxRef} className="absolute inset-0 z-0">
          <AnimatePresence initial={false}>
            <motion.img
              key={currentHeroImage.src}
              src={currentHeroImage.src}
              alt={currentHeroImage.alt}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full object-contain bg-center"
            />
          </AnimatePresence>
        </div>

        
        {/* Floating Shapes (Animated) - Colors recalibrated for new palette */}
        <AnimatePresence>
          {[
            { x: -150, y: 100, size: 100, bg: "rgba(166, 124, 0, 0.3)", rotate: 10 },
            { x: 180, y: -120, size: 140, bg: "rgba(224, 224, 224, 0.2)", rotate: 30 },
            { x: -250, y: -180, size: 80, bg: "rgba(0, 188, 212, 0.2)", rotate: -20 },
            { x: 300, y: 150, size: 120, bg: "rgba(255, 255, 255, 0.1)", rotate: 5 },
            { x: 0, y: -250, size: 90, bg: "rgba(100, 100, 100, 0.3)", rotate: -15 },
            { x: -300, y: 200, size: 110, bg: "rgba(255, 255, 255, 0.15)", rotate: 25 },
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
                filter: "blur(18px)",
              }}
            />
          ))}
        </AnimatePresence>
      </section>

      {/* NEW: Luxury Products Showcase Section - Now the third section */}
      <section className="py-20 bg-gray-950 text-white relative overflow-hidden">
        <h2 className="text-5xl font-extrabold mb-16 text-center tracking-tight text-gray-100 relative
                       after:content-[''] after:absolute after:left-1/2 after:-bottom-4 after:-translate-x-1/2
                       after:w-28 after:h-1.5 after:bg-amber-500 after:rounded-full">
          EXQUISITE ELEGANCE
        </h2>

        <div className="relative w-full max-w-7xl mx-auto h-[550px] flex items-center justify-center pt-10">
          {luxuryProductsData.map((product, index) => (
            <motion.div
              key={product.id}
              className="absolute w-[300px] h-[400px] rounded-3xl shadow-2xl overflow-hidden cursor-pointer flex flex-col justify-between p-6"
              style={{ backgroundColor: product.color, willChange: 'transform, opacity' }}
              initial={{ opacity: 0, scale: 0.5, zIndex: 0 }}
              animate={getCardVariants(index)}
              transition={{ duration: 0.7, ease: "easeInOut" }} /* Changed ease to "easeInOut" */
            >
              <img
                  src={product.image}
                  alt={product.name}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              {/* Card Header with Icons */}
              <div className="absolute top-4 left-4 right-4 flex justify-between items-center text-white text-opacity-90 z-10">
                <Heart size={24} className="hover:text-white transition-colors duration-200" />
                <Share2 size={24} className="hover:text-white transition-colors duration-200" />
              </div>

              {/* Product Image */}
             
        

              {/* Product Details and Add to Cart */}
              <div className="mt-auto text-white text-left">
                <h3 className="text-3xl font-bold tracking-tight mb-2">{product.name}</h3>
                <p className="text-2xl font-semibold opacity-90 mb-4">${product.price.toFixed(2)}</p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(product);
                    console.log(`Added ${product.name} to cart`);
                  }}
                  className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-full flex items-center justify-center w-full
                             font-bold text-lg hover:bg-white/30 transition-all duration-300 shadow-lg group"
                >
                  <Plus className="mr-2 w-5 h-5 transition-transform duration-300 group-hover:rotate-90" />
                  Add to Cart
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Navigation Buttons for Luxury Products */}
        <div className="absolute inset-x-0 bottom-10 flex justify-center gap-6 z-10">
          <motion.button
            onClick={goToPrevLuxuryProduct}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-gray-800 text-amber-500 p-4 rounded-full shadow-lg hover:bg-gray-700 transition-colors duration-200"
          >
            <ChevronLeft size={30} />
          </motion.button>
          <motion.button
            onClick={goToNextLuxuryProduct}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-gray-800 text-amber-500 p-4 rounded-full shadow-lg hover:bg-gray-700 transition-colors duration-200"
          >
            <ChevronRight size={30} />
          </motion.button>
        </div>
      </section>


      {/* Featured Products Section - KEPT ENTIRELY AS PROVIDED BY USER */}
      <div
        ref={productsSectionRef}
        className="py-16 px-4 md:px-10 relative overflow-hidden bg-white"
        style={{
          paddingTop:'50px'
        }}
      >
        <h2 className="text-4xl font-bold mb-12 text-center text-black relative after:content-[''] after:absolute after:left-1/2 after:-bottom-2 after:-translate-x-1/2 after:w-20 after:h-1 after:bg-blue-400 after:rounded-full">
          Featured Products
        </h2>

        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
          {products.map((product) => (
            <div key={product.id} className="group flex flex-col h-full">
              {/* Product Card */}
              <Link to={`/products/${product.id}`} className="block flex-grow">


                  <div className="relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full mb-4 rounded-lg shadow-md transition-all duration-300 group-hover:scale-105 "
                    />
                    <h3 className="text-xl font-bold text-black mb-2 transition-colors duration-300 group-hover:text-purple-300">{product.name}</h3>
                  </div>
                  <p className="text-black mb-4">${product.price.toFixed(2)}</p>

              </Link>
              {/* Add to Cart Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
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
