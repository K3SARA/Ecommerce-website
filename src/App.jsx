import React, { useState, useEffect } from "react";
import { HashRouter as Router, Routes, Route, Outlet } from "react-router-dom";

// Import Firebase Auth functions needed in App.jsx
import { onAuthStateChanged, signInAnonymously, signInWithCustomToken } from 'firebase/auth';
// Import Firestore functions, including setDoc
import { doc, getDoc, setDoc } from 'firebase/firestore'; 

import Home from "./pages/home";
import Cart from "./pages/Cart";
import Navbar from "./components/Navbar";
import { CartProvider } from './context/CartContext';
import CheckoutPage from './pages/CheckoutPage';
import ProductDetails from './context/ProductDetails';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import ProtectedRoute from './components/ProtectedRoute'; // Import the ProtectedRoute component

// Admin components
import AdminLayout from './admin/AdminLayout';
import AdminDashboard from './admin/pages/AdminDashboard';
import ProductList from './admin/pages/ProductList';
import OrderList from './admin/pages/OrderList';
import UserList from './admin/pages/UserList';
import AdminSettings from './admin/pages/AdminSettings';

// Firebase Imports - Directly import initialized instances
import { app, auth, db } from '/src/components/firebase';

function App() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [userRole, setUserRole] = useState(null); // State to store the user's role
  const [userId, setUserId] = useState(null);
  const [firebaseReady, setFirebaseReady] = useState(false); // State to track Firebase readiness

  // Effect to handle Firebase authentication state and fetch user role
  useEffect(() => {
    console.log("App useEffect: Running Firebase auth setup...");
    console.log("App useEffect: Imported auth instance:", auth);
    console.log("App useEffect: Imported db instance:", db);

    if (auth && db) { // Ensure both auth and db are available
      console.log("App useEffect: Firebase Auth and Firestore instances are available. Setting up listener.");

      const signInUser = async () => {
        // Check if __initial_auth_token is defined and not null/empty string
        if (typeof __initial_auth_token !== 'undefined' && __initial_auth_token) {
          try {
            await signInWithCustomToken(auth, __initial_auth_token);
            console.log("App useEffect: Signed in with custom token.");
          } catch (error) {
            console.error("App useEffect: Error signing in with custom token:", error);
            // Added specific error handling for auth/admin-restricted-operation
            if (error.code === 'auth/admin-restricted-operation') {
              console.error("Firebase Auth Error: Anonymous authentication might not be enabled in your Firebase project.");
            }
            await signInAnonymously(auth);
            console.log("App useEffect: Signed in anonymously due to custom token error.");
          }
        } else {
          try {
            await signInAnonymously(auth);
            console.log("App useEffect: Signed in anonymously.");
          } catch (error) {
            console.error("App useEffect: Error signing in anonymously:", error);
            if (error.code === 'auth/admin-restricted-operation') {
              console.error("Firebase Auth Error: Anonymous authentication might not be enabled in your Firebase project.");
            }
          }
        }
      };

      signInUser();

      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (user) {
          setUserId(user.uid);
          // Fetch user role from Firestore
          const userDocRef = doc(db, 'users', user.uid);
          const userDocSnap = await getDoc(userDocRef);

          if (userDocSnap.exists()) {
            const fetchedRole = userDocSnap.data().role || 'customer';
            setUserRole(fetchedRole);
            console.log("App useEffect: Auth state changed. User ID:", user.uid, "Fetched Role:", fetchedRole);
          } else {
            console.warn(`User document not found in Firestore for UID: ${user.uid}. Assigning default role 'customer'.`);
            setUserRole('customer'); // Default to customer if no role found
            // Optionally, create the user document with a default role if it doesn't exist
            // This is important for new anonymous users or users who registered before role saving was implemented
            await setDoc(userDocRef, { email: user.email, role: 'customer', createdAt: new Date() }, { merge: true });
          }
        } else {
          setUserId(null);
          setUserRole(null); // Clear role if user signs out
          console.log("App useEffect: User signed out.");
        }
        setFirebaseReady(true);
        console.log("App useEffect: firebaseReady set to true.");
      });

      return () => unsubscribe();
    } else {
      console.error("App useEffect: Firebase Auth or Firestore instance is NOT available. Cannot set up auth listener or sign in. This might be a timing issue or firebase.js failed to initialize.");
      setFirebaseReady(true); // Allow app to render, but modals will show loading
    }
  }, [auth, db]); // Depend on 'auth' and 'db' instances

  const handleOpenLoginModal = () => {
    if (firebaseReady) {
      setIsLoginModalOpen(true);
      setIsRegisterModalOpen(false);
    } else {
      console.warn("Attempted to open login modal before Firebase was ready.");
    }
  };

  const handleCloseLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  const handleLoginSuccess = (role) => {
    setUserRole(role); // Set the user role received from LoginPage
    console.log(`User logged in with role: ${role}`);
    if (role === 'admin') {
      window.location.hash = '/admin/dashboard'; // Navigate to admin dashboard
    }
  };

  const handleOpenRegisterModal = () => {
    if (firebaseReady) {
      setIsRegisterModalOpen(true);
      setIsLoginModalOpen(false);
    } else {
      console.warn("Attempted to open register modal before Firebase was ready.");
    }
  };

  const handleCloseRegisterModal = () => {
    setIsRegisterModalOpen(false);
  };

  const handleRegisterSuccess = (email) => {
    console.log(`User registered: ${email}`);
    handleOpenLoginModal();
  };

  const isAnyModalOpen = isLoginModalOpen || isRegisterModalOpen;

  return (
    <CartProvider>
      <Router>
        <div className={isAnyModalOpen ? 'filter blur-sm pointer-events-none' : ''}>
          <Navbar onOpenLoginModal={handleOpenLoginModal} firebaseReady={firebaseReady} />
          <Routes>
            <Route element={<>
              <Outlet />
            </>}>
              <Route path="/" element={<Home />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/products/:productId" element={<ProductDetails />} />
              <Route path="/products" element={<div className="pt-32 p-10">Products Page Coming Soon!</div>} />
            </Route>

            {/* Protected Admin Routes */}
            <Route
              path="/admin/*" // Use /* to match all nested admin routes
              element={
                <ProtectedRoute userRole={userRole} allowedRoles={['admin']}>
                  <AdminLayout db={db} auth={auth} userId={userId} />
                </ProtectedRoute>
              }
            >
              <Route path="dashboard" element={<AdminDashboard db={db} auth={auth} userId={userId} />} />
              <Route path="products" element={<ProductList db={db} auth={auth} userId={userId} />} />
              <Route path="orders" element={<OrderList db={db} auth={auth} userId={userId} />} />
              <Route path="users" element={<UserList db={db} auth={auth} userId={userId} />} />
              <Route path="settings" element={<AdminSettings db={db} auth={auth} userId={userId} />} />
            </Route>
          </Routes>
        </div>

        {firebaseReady ? (
          <>
            <LoginPage
              isOpen={isLoginModalOpen}
              onClose={handleCloseLoginModal}
              onLoginSuccess={handleLoginSuccess}
              onOpenRegisterModal={handleOpenRegisterModal}
              auth={auth}
            />

            <RegisterPage
              isOpen={isRegisterModalOpen}
              onClose={handleCloseRegisterModal}
              onRegisterSuccess={handleRegisterSuccess}
              onOpenLoginModal={handleOpenLoginModal}
              auth={auth}
            />
          </>
        ) : (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-90 text-white text-xl z-[200]">
            Initializing Application...
          </div>
        )}
      </Router>
    </CartProvider>
  );
}

export default App;
