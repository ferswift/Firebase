// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBAjR3xgo4XgEdzC1DCqfpiZGtWzfscqL0",
  authDomain: "aprendizado-firebase-d9f34.firebaseapp.com",
  projectId: "aprendizado-firebase-d9f34",
  storageBucket: "aprendizado-firebase-d9f34.firebasestorage.app",
  messagingSenderId: "874721931721",
  appId: "1:874721931721:web:ed94701821fbe85f547818",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Banco de dados Firestore
export const db = getFirestore(app);
