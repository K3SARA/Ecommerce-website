// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Import getAuth
import { getFirestore } from "firebase/firestore"; // Import getFirestore

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBSiayLRxEU20uEiurLDvo32azQ5Epptfw",
  authDomain: "fir-register-94ff1.firebaseapp.com",
  projectId: "fir-register-94ff1",
  storageBucket: "fir-register-94ff1.firebasestorage.app",
  messagingSenderId: "424152751307",
  appId: "1:424152751307:web:01d46049a2be6f79ec8f4e"
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Added for debugging: Check the type of the imported functions
console.log("firebase.js: Type of getAuth:", typeof getAuth);
console.log("firebase.js: Type of getFirestore:", typeof getFirestore);

// Initialize Firebase Authentication and Firestore
const auth = getAuth(app);
const db = getFirestore(app);

// Export the initialized instances
export { app, auth, db };
