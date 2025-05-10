// firebaseConfig.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase, ref, set, onValue, off } from "firebase/database";
import { getStorage } from "firebase/storage";

// إعدادات Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAo-Hiff-6S4ZAGr3nZHaxNmVCUv5i5Ed4",
  authDomain: "james-b0143.firebaseapp.com",
  databaseURL: "https://james-b0143-default-rtdb.firebaseio.com/", // Realtime DB
  projectId: "james-b0143",
  storageBucket: "james-b0143.appspot.com", // ✅ صح
  messagingSenderId: "889634576305",
  appId: "1:889634576305:web:b8bfe9761ca3523efb0f90",
  measurementId: "G-2E2M6MB3B0"
};

// ✅ تهيئة Firebase (مرة واحدة بس)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// ✅ الخدمات الأساسية
const auth = getAuth(app);
const db = getFirestore(app);
const database = getDatabase(app);
const storage = getStorage(app);

// ✅ التصدير
export {
  app,
  auth,
  db,
  database,
  storage,
  ref,
  set,
  onValue,
  off
};
