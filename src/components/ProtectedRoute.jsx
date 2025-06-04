import React from 'react';
import { Navigate } from 'react-router-dom';

/**
 * A component to protect routes based on user roles.
 * If the user's role is not in the allowedRoles array, they will be redirected.
 *
 * @param {object} props - The component props.
 * @param {string|null} props.userRole - The current user's role (e.g., 'admin', 'customer', or null if not logged in/role not determined).
 * @param {string[]} props.allowedRoles - An array of roles that are allowed to access this route.
 * @param {React.ReactNode} props.children - The child components to render if the user is authorized.
 */
const ProtectedRoute = ({ userRole, allowedRoles, children }) => {
  // If userRole is null, it means authentication is still loading or user is not logged in.
  // In a real application, you might want to show a loading spinner here.
  // For simplicity, we'll assume that if userRole is null, they are not authorized yet.
  if (userRole === null) {
    // You could also return a loading indicator here if authentication takes time
    // return <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-90 text-white text-xl z-[200]">Loading user role...</div>;
    return <Navigate to="/" replace />; // Redirect to home if role is not determined yet
  }

  // Check if the user's role is included in the allowedRoles array
  const isAuthorized = allowedRoles.includes(userRole);

  if (isAuthorized) {
    return children; // Render the protected content
  } else {
    // If not authorized, redirect to the home page or a specific unauthorized page
    console.warn(`Unauthorized access attempt. User role: ${userRole}, Allowed roles: ${allowedRoles.join(', ')}`);
    return <Navigate to="/" replace />; // Redirect to home
  }
};

export default ProtectedRoute;
