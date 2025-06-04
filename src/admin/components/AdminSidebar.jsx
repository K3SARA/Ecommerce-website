// src/admin/components/AdminSidebar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingBag, Users, Settings, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';

const sidebarVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
};

const linkVariants = {
    hover: { scale: 1.05, originX: 0, color: "#a78bfa" }, // purple-400
    tap: { scale: 0.95 }
};

const AdminSidebar = () => {
    return (
        <motion.div
            className="w-64 bg-gray-800 text-white p-6 shadow-lg fixed h-full border-r border-gray-700"
            variants={sidebarVariants}
            initial="hidden"
            animate="visible"
        >
            <div className="mb-10 text-2xl font-bold text-purple-400">
                Admin Panel
            </div>
            <nav>
                <ul>
                    <motion.li variants={linkVariants} whileHover="hover" whileTap="tap" className="mb-4">
                        <Link to="/admin/dashboard" className="flex items-center space-x-3 text-lg hover:text-purple-300 transition-colors duration-200">
                            <LayoutDashboard className="w-6 h-6" />
                            <span>Dashboard</span>
                        </Link>
                    </motion.li>
                    <motion.li variants={linkVariants} whileHover="hover" whileTap="tap" className="mb-4">
                        <Link to="/admin/products" className="flex items-center space-x-3 text-lg hover:text-purple-300 transition-colors duration-200">
                            <Package className="w-6 h-6" />
                            <span>Products</span>
                        </Link>
                    </motion.li>
                    <motion.li variants={linkVariants} whileHover="hover" whileTap="tap" className="mb-4">
                        <Link to="/admin/orders" className="flex items-center space-x-3 text-lg hover:text-purple-300 transition-colors duration-200">
                            <ShoppingBag className="w-6 h-6" />
                            <span>Orders</span>
                        </Link>
                    </motion.li>
                    <motion.li variants={linkVariants} whileHover="hover" whileTap="tap" className="mb-4">
                        <Link to="/admin/users" className="flex items-center space-x-3 text-lg hover:text-purple-300 transition-colors duration-200">
                            <Users className="w-6 h-6" />
                            <span>Users</span>
                        </Link>
                    </motion.li>
                    <motion.li variants={linkVariants} whileHover="hover" whileTap="tap" className="mb-4">
                        <Link to="/admin/settings" className="flex items-center space-x-3 text-lg hover:text-purple-300 transition-colors duration-200">
                            <Settings className="w-6 h-6" />
                            <span>Settings</span>
                        </Link>
                    </motion.li>
                </ul>
            </nav>
            <div className="absolute bottom-6 left-6 right-6">
                <motion.li variants={linkVariants} whileHover="hover" whileTap="tap" className="mb-4 list-none">
                    <Link to="/admin-logout" className="flex items-center space-x-3 text-lg text-red-400 hover:text-red-300 transition-colors duration-200">
                        <LogOut className="w-6 h-6" />
                        <span>Logout</span>
                    </Link>
                </motion.li>
            </div>
        </motion.div>
    );
};

export default AdminSidebar;