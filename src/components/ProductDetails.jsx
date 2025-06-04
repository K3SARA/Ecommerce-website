import React, { useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

const ProductDetails = () => {
  const { productId } = useParams(); // Get the product ID from the URL
  const { addToCart } = useContext(CartContext);

  // For simplicity, we'll use a hardcoded product.  In a real app,
  // you'd fetch this data from a database or API.
  const product = {
    id: '01',
    name: 'Ethereal Elegance Gown',
    description: 'A flowing, floor-length gown crafted from shimmering silk.  This gown features a delicate V-neckline, subtle draping, and a dramatic train. Perfect for formal occasions.',
    price: 299.99,
    imageUrl: '/one.jpeg', // Replace with your actual image URL
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
  };

  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);

  // Redirect if the product ID doesn't match.
  if (productId !== product.id) {
    return <div>Product not found</div>; // Or a Redirect component
  }

  const handleAddToCart = () => {
    if (selectedSize) {
      addToCart({
        ...product,
        size: selectedSize,
        quantity,
      });
      alert(`${quantity} of ${product.name} (Size: ${selectedSize}) added to cart!`); // Basic feedback
    } else {
      alert('Please select a size');
    }
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        {/* Product Image */}
        <div className="rounded-lg overflow-hidden shadow-lg">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-auto object-cover"
          />
        </div>

        {/* Product Details */}
        <div>
          <h1 className="text-3xl font-bold mb-4 text-white">{product.name}</h1>
          <p className="text-gray-300 mb-6">{product.description}</p>
          <p className="text-2xl font-semibold mb-4 text-white">Price: ${product.price.toFixed(2)}</p>

          {/* Size Selection */}
          <div className="mb-4">
            <label htmlFor="size" className="block text-sm font-medium text-gray-200 mb-2">
              Size:
            </label>
            <Select
              onValueChange={(value) => setSelectedSize(value)}
              value={selectedSize}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a size" />
              </SelectTrigger>
              <SelectContent>
                {product.sizes.map((size) => (
                  <SelectItem key={size} value={size}>
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Quantity Selection (Simplified) */}
          <div className="mb-6">
            <label htmlFor="quantity" className="block text-sm font-medium text-gray-200 mb-2">
              Quantity:
            </label>
            <div className="flex items-center gap-4">
              <input
                type="number"
                id="quantity"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
                className={cn(
                  "w-20 px-4 py-2 rounded-md border border-gray-700 bg-black/40 text-white",
                  "focus:outline-none focus:ring-2 focus:ring-purple-500",
                  "appearance-none", // Removes default number input arrows
                  "text-center" // Centers the number
                )}
              />
            </div>
          </div>

          {/* Add to Cart Button */}
          <Button
            onClick={handleAddToCart}
            className={cn(
              "bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-full",
              "hover:from-purple-600 hover:to-pink-600 transition-all duration-300",
              "shadow-lg hover:shadow-purple-500/50 font-semibold text-lg",
              "w-full md:w-auto" // Adjust width as needed
            )}
            disabled={!selectedSize}
          >
            Add to Cart
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default ProductDetails;
