// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAo-Hiff-6S4ZAGr3nZHaxNmVCUv5i5Ed4",
  authDomain: "james-b0143.firebaseapp.com",
  projectId: "james-b0143",
  storageBucket: "james-b0143.firebasestorage.app",
  messagingSenderId: "889634576305",
  appId: "1:889634576305:web:b8bfe9761ca3523efb0f90",
  measurementId: "G-2E2M6MB3B0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
