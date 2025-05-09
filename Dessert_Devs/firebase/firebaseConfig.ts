// firebaseConfig.ts
import { getFirestore } from "firebase/firestore";
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, set, onValue, off } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAo-Hiff-6S4ZAGr3nZHaxNmVCUv5i5Ed4",
  authDomain: "james-b0143.firebaseapp.com",
  databaseURL: "https://james-b0143-default-rtdb.firebaseio.com", // Add this line
  projectId: "james-b0143",
  storageBucket: "james-b0143.appspot.com", // Fixed this line
  messagingSenderId: "889634576305",
  appId: "1:889634576305:web:b8bfe9761ca3523efb0f90",
  measurementId: "G-2E2M6MB3B0"
};

// Initialize Firebase
// let app;
// if (getApps().length === 0) {
//   app = initializeApp(firebaseConfig);
// } else {
//   app = getApp();
// }

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app);
const database = getDatabase(app);


// Initialize Firestore
const db = getFirestore(app)

export { database, ref, set, onValue, off, db, app };
// export { app, db };