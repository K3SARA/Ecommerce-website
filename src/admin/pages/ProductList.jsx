import React from 'react';

const ProductList = () => {
    return (
        <div className="p-6 bg-gray-800 rounded-lg shadow-xl border border-gray-700">
            <h2 className="text-3xl font-bold text-white mb-6">Product Management</h2>
            <p className="text-gray-300">Here you will manage all your products.</p>
            {/* Future content: table of products, add product button */}
            <button className="mt-6 bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-md transition-colors duration-200">
                Add New Product
            </button>
        </div>
    );
};

export default ProductList;