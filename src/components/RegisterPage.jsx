import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { FaGoogle, FaFacebook } from 'react-icons/fa';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore'; // Import Firestore functions
import { auth, db } from '/src/components/firebase'; // Import auth and db instances

const RegisterPage = ({ isOpen, onClose, onRegisterSuccess, onOpenLoginModal }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [registerError, setRegisterError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setRegisterError('');
    setIsSubmitting(true);

    if (password !== confirmPassword) {
      setRegisterError('Passwords do not match.');
      setIsSubmitting(false);
      return;
    }

    if (!auth || !db) { // Ensure both auth and db are available
      setRegisterError("Firebase services not ready. Please try again in a moment.");
      setIsSubmitting(false);
      console.error("Firebase Auth or Firestore instance is null in RegisterPage.handleRegister.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log("Successfully registered user with Firebase Auth:", user);

      // Determine the role based on email (for initial admin setup)
      const userRole = (user.email === 'admin@example.com') ? 'admin' : 'customer';

      // Save user role to Firestore
      // The document ID will be the user's UID
      await setDoc(doc(db, 'users', user.uid), {
        email: user.email,
        role: userRole,
        createdAt: new Date(),
      });
      console.log(`User role (${userRole}) saved to Firestore for UID: ${user.uid}`);

      onRegisterSuccess(email);
      onClose();

    } catch (error) {
      console.error("Firebase Registration Error:", error.code, error.message);
      if (error.code === 'auth/email-already-in-use') {
        setRegisterError('This email is already in use. Please try logging in or use a different email.');
      } else if (error.code === 'auth/weak-password') {
        setRegisterError('Password is too weak. Please use a stronger password (min 6 characters).');
      } else if (error.code === 'auth/invalid-email') {
        setRegisterError('Invalid email format.');
      } else if (error.code === 'auth/network-request-failed') {
        setRegisterError('Network error. Please check your internet connection.');
      } else if (error.code === 'auth/configuration-not-found') {
        setRegisterError('Firebase authentication is not correctly configured for email/password. Please enable it in your Firebase project settings.');
      } else {
        setRegisterError('An unexpected error occurred during registration. Please try again.');
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
              aria-label="Close registration form"
            >
              <XCircle size={28} />
            </button>

            <h2 className="text-3xl font-bold text-white mb-6 text-center">Register</h2>

            <form onSubmit={handleRegister} className="space-y-5">
              <div>
                <label htmlFor="register-email" className="block text-gray-300 text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  id="register-email"
                  className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="your@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="register-password" className="block text-gray-300 text-sm font-medium mb-2">Password</label>
                <input
                  type="password"
                  id="register-password"
                  className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="confirm-password" className="block text-gray-300 text-sm font-medium mb-2">Confirm Password</label>
                <input
                  type="password"
                  id="confirm-password"
                  className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="********"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>

              {registerError && (
                <p className="text-red-400 text-sm text-center">{registerError}</p>
              )}

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-md font-semibold text-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Registering...' : 'Register'}
              </Button>
            </form>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-700"></span>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-800 text-gray-400">Or continue with</span>
              </div>
            </div>

            <div className="flex flex-col space-y-3">
              <Button
                onClick={() => alert('Google login clicked!')}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-semibold flex items-center justify-center gap-2 shadow-lg"
              >
                <FaGoogle size={20} />
                Sign up with Google
              </Button>
              <Button
                onClick={() => alert('Facebook login clicked!')}
                className="w-full bg-blue-800 hover:bg-blue-900 text-white px-6 py-3 rounded-md font-semibold flex items-center justify-center gap-2 shadow-lg"
              >
                <FaFacebook size={20} />
                Sign up with Facebook
              </Button>
            </div>

            <p className="text-center text-gray-400 text-sm mt-6">
              Already have an account? {' '}
              <Link
                to="#"
                onClick={(e) => {
                  e.preventDefault();
                  onClose();
                  onOpenLoginModal();
                }}
                className="text-purple-400 hover:underline"
              >
                Login
              </Link>
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RegisterPage;
