import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ShoppingCart, Loader2 } from 'lucide-react';
import { cn } from "@/lib/utils"
import bgImage from '../bg-pd1.jpg'; // Make sure this path is correct

const ProductDetails = () => {
    const { productId } = useParams();
    const { addToCart } = useContext(CartContext);
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                // Simulate fetching data with a delay
                await new Promise(resolve => setTimeout(resolve, 500));

                const dummyProducts = [
                    { id: '01', name: "Product 1", price: 29.99, image: "one.jpeg", description: "This is the description for Product 1. It is a very good product.", category: "Electronics" },
                    { id: '02', name: "Product 2", price: 49.99, image: "two.jpeg", description: "This is the description for Product 2. It is another great product.", category: "Clothing" },
                    { id: '03', name: "Product 3", price: 19.99, image: "three.jpeg", description: "This is the description for Product 3. You will love this product.", category: "Home Goods" },
                ];

                const foundProduct = dummyProducts.find(p => p.id === productId);

                if (foundProduct) {
                    setProduct(foundProduct);
                } else {
                    setError('Product not found');
                }
            } catch (err) {
                setError(err.message || 'Failed to fetch product');
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [productId]);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Loader2 className="animate-spin text-4xl text-purple-500" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center h-screen text-red-500">
                <p className="text-xl mb-4">{error}</p>
                <Link to="/">
                    <Button variant="outline" className="mt-4">
                        <ArrowLeft className="mr-2 w-4 h-4" /> Back to Home
                    </Button>
                </Link>
            </div>
        );
    }

    if (!product) {
        return null;
    }

    const handleAddToCart = () => {
        addToCart({ ...product, quantity });
    };

    const incrementQuantity = () => {
        setQuantity(prev => prev + 1);
    }

    const decrementQuantity = () => {
        setQuantity(prev => Math.max(1, prev - 1));
    }

    const pageStyle = {
        // Removed backgroundColor: '#f0f0f0' as the image and overlay will cover it
        minHeight: '100vh',
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed', // Added for a fixed background effect
        position: 'relative' // Added for absolute positioning of the overlay
    };

    return (
        <div style={pageStyle}>
            {/* Overlay for black transparent glass effect */}
            <div style={{
                position: 'absolute',
                inset: 0, // Shorthand for top: 0, right: 0, bottom: 0, left: 0
                backgroundColor: 'rgba(69, 9, 75, 0.74)', // Changed opacity from 0. to 0.5
                zIndex: 1, // Ensure it's behind the content, but above the background image
                // Optional: Add a backdrop-filter for a subtle blur effect on content *behind* this overlay (if the overlay itself was more translucent)
                // backdropFilter: 'blur(3px)', // You might need to adjust browser prefixes or use a library for broader support
            }} />

            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="container mx-auto p-8"
                style={{ paddingTop: '100px', position: 'relative', zIndex: 2 }} // Content on top of overlay
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 ">
                    <div className="rounded-lg overflow-hidden shadow-lg border border-purple-500/10">
                        <Link to={`/products/${productId}`} data-discover="true">
                            <motion.img
                                src={product.image}
                                alt={product.name}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="w-full h-auto object-cover cursor-pointer"
                            />
                        </Link>
                    </div>

                    <div>
                        <h1 className="text-3xl font-bold mb-4 text-white">{product.name}</h1>
                        <p className="text-gray-300 mb-4">Category: {product.category}</p>
                        <p className="text-xl font-semibold mb-6 text-purple-300">${product.price.toFixed(2)}</p>
                        <p className="text-gray-200 mb-6">{product.description}</p>
                        <div className="flex items-center mb-6">
                            <span className="mr-4 text-white font-medium">Quantity:</span>
                            <div className="flex items-center">
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={decrementQuantity}
                                    disabled={quantity <= 1}
                                    className="text-white hover:bg-white/20 border-gray-700"
                                >
                                    -
                                </Button>
                                <span className="mx-2 text-white text-lg min-w-[2rem] text-center">{quantity}</span>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={incrementQuantity}
                                    className="text-white hover:bg-white/20 border-gray-700"
                                >
                                    +
                                </Button>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <Button
                                onClick={handleAddToCart}
                                className={cn(
                                    "bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-full",
                                    "hover:from-purple-600 hover:to-pink-600 transition-all duration-300",
                                    "shadow-lg hover:shadow-purple-500/50 font-semibold text-lg flex items-center gap-2"
                                )}
                            >
                                <ShoppingCart className="w-5 h-5" />
                                Add to Cart
                            </Button>
                            <Link to="/" data-discover="true">
                                <Button variant="outline" className="text-white hover:bg-white/20 border-gray-700">
                                    <ArrowLeft className="mr-2 w-4 h-4" /> Back
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default ProductDetails;
