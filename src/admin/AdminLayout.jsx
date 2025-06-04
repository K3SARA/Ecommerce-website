// src/admin/AdminLayout.jsx
import React from 'react';
import AdminSidebar from './components/AdminSidebar';
import { motion } from 'framer-motion';
import { Outlet } from 'react-router-dom'; // Make sure Outlet is imported for nested routes

const AdminLayout = ({ children, db, auth, userId }) => { // Added db, auth, userId props
    return (
        <div className="flex min-h-screen bg-gray-900 text-white">
            <AdminSidebar />
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="flex-1 p-8 pt-10 ml-64" // ml-64 to make space for sidebar
            >
                {/* Pass db, auth, userId to the Outlet for nested routes */}
                {children || <Outlet context={{ db, auth, userId }} />}
            </motion.div>
        </div>
    );
};

export default AdminLayout;
