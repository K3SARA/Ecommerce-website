import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore'; // Import Firestore functions
import { auth, db } from '/src/components/firebase'; // Import auth and db instances

const LoginPage = ({ isOpen, onClose, onLoginSuccess, onOpenRegisterModal }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    setIsSubmitting(true);

    if (!auth || !db) { // Ensure both auth and db are available
      setLoginError("Firebase services not ready. Please try again in a moment.");
      setIsSubmitting(false);
      console.error("Firebase Auth or Firestore instance is null in LoginPage.handleLogin.");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log("Successfully logged in user with Firebase Auth:", user);

      // Fetch user role from Firestore
      const userDocRef = doc(db, 'users', user.uid);
      const userDocSnap = await getDoc(userDocRef);

      let userRole = 'customer'; // Default role
      if (userDocSnap.exists()) {
        userRole = userDocSnap.data().role || 'customer'; // Get role from Firestore, default to 'customer'
        console.log(`User role fetched from Firestore: ${userRole}`);
      } else {
        console.warn(`User document not found in Firestore for UID: ${user.uid}. Assigning default role 'customer'.`);
        // Optionally, create the user document with a default role if it doesn't exist
        await setDoc(userDocRef, { email: user.email, role: 'customer', createdAt: new Date() });
      }

      onLoginSuccess(userRole); // Pass the fetched or determined role
      onClose();

    } catch (error) {
      console.error("Firebase Login Error:", error.code, error.message);

      if (error.code === 'auth/invalid-email' || error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        setLoginError('Invalid email or password. Please check your credentials.');
      } else if (error.code === 'auth/user-disabled') {
        setLoginError('Your account has been disabled. Please contact support.');
      } else if (error.code === 'auth/too-many-requests') {
        setLoginError('Too many login attempts. Please try again later.');
      } else {
        setLoginError('An unexpected error occurred during login. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  if (!auth || !db) { // Check both auth and db for loading state
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
        <div className="bg-gray-800 p-8 rounded-xl shadow-2xl w-full max-w-md flex flex-col items-center justify-center text-white">
          <Loader2 className="animate-spin text-4xl text-purple-500 mb-4" />
          <p>Loading authentication services...</p>
        </div>
      </div>
    );
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}
          onClick={onClose}
        >
          <motion.div
            initial={{ y: -50, opacity: 0, scale: 0.8 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 50, opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="bg-gray-800 p-8 rounded-xl shadow-2xl w-full max-w-md relative max-h-full overflow-y-auto custom-scrollbar"
            onClick={(e) => e.stopPropagation()}
          >
            <style>
              {`
                /* For Webkit browsers (Chrome, Safari, Edge) */
                .custom-scrollbar::-webkit-scrollbar {
                  width: 8px;
                }

                .custom-scrollbar::-webkit-scrollbar-track {
                  background: transparent;
                  border-radius: 10px;
                }

                .custom-scrollbar::-webkit-scrollbar-thumb {
                  background: #888;
                  border-radius: 10px;
                }

                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                  background: #aaa;
                }

                .custom-scrollbar::-webkit-scrollbar-button {
                  display: none;
                }

                /* For Firefox */
                .custom-scrollbar {
                  scrollbar-width: thin;
                  scrollbar-color: #888 transparent;
                }
              `}
            </style>

            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors duration-200"
              aria-label="Close login form"
            >
              <XCircle size={28} />
            </button>

            <h2 className="text-3xl font-bold text-white mb-6 text-center">Login</h2>

            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label htmlFor="email" className="block text-gray-300 text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="your@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-gray-300 text-sm font-medium mb-2">Password</label>
                <input
                  type="password"
                  id="password"
                  className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {loginError && (
                <p className="text-red-400 text-sm text-center">{loginError}</p>
              )}

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-md font-semibold text-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Logging in...' : 'Login'}
              </Button>
            </form>

            <p className="text-center text-gray-400 text-sm mt-6">
              Don't have an account? {' '}
              <Link
                to="#"
                onClick={(e) => {
                  e.preventDefault();
                  onClose();
                  onOpenRegisterModal();
                }}
                className="text-purple-400 hover:underline"
              >
                Register
              </Link>
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoginPage;
