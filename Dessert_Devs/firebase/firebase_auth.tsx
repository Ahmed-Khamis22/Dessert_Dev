import { auth, db } from "./firebaseConfig";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
} from "firebase/auth";
import { get } from "firebase/database";
import { doc, setDoc, collection, addDoc, deleteDoc } from "firebase/firestore";

async function register(email: string, password: string, userName: String) {
  const cred = await createUserWithEmailAndPassword(auth, email, password);

  await sendEmailVerification(cred.user, {
    handleCodeInApp: true,
    url: "https://james-b0143.firebaseapp.com",
  });

  const userRef = doc(db, "users", cred.user.uid);

  await setDoc(userRef, {
    userName: userName,
    email: email,
   
    uid: cred.user.uid,
  });

  

  return cred;
}

async function login(email: string, password: string) {
  const cred = await signInWithEmailAndPassword(auth, email, password);
  if (!cred.user.emailVerified) {
    throw new Error("not emailVerified");
  }
  return cred;
}

async function resetPass(email: string) {
  await sendPasswordResetEmail(auth, email);
}

export { register, login, resetPass }