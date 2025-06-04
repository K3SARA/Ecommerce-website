import React from 'react';

const AdminDashboard = () => {
    return (
        <div className="p-6 bg-gray-800 rounded-lg shadow-xl border border-gray-700">
            <h2 className="text-3xl font-bold text-white mb-6">Admin Dashboard</h2>
            <p className="text-gray-300">Welcome to your admin panel. Here you'll see an overview of your store's performance.</p>
            {/* Future content: stats, quick links */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                <div className="bg-gray-700 p-5 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold text-purple-300">Total Products</h3>
                    <p className="text-4xl font-bold text-white mt-2">120</p> {/* Placeholder */}
                </div>
                <div className="bg-gray-700 p-5 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold text-pink-300">Pending Orders</h3>
                    <p className="text-4xl font-bold text-white mt-2">15</p> {/* Placeholder */}
                </div>
                <div className="bg-gray-700 p-5 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold text-green-300">New Users</h3>
                    <p className="text-4xl font-bold text-white mt-2">30</p> {/* Placeholder */}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;