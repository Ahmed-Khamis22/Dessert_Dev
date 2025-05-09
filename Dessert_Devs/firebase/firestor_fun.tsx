import {
   
    doc,
   
    getDoc,
   
  } from "firebase/firestore";
  import { db } from "../firebase/firebaseConfig";
  async function getUser(uid: string) {
    try {
      const userRef = doc(db, "users", uid);
      const userSnap = await getDoc(userRef);
  
      if (userSnap.exists()) {
        return userSnap.data() ;
      } else {
        throw new Error("User not found");
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      throw new Error("Failed to fetch user data");
    }
  }
  export {
    getUser,
  };