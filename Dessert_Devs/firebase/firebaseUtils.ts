// firebaseUtils.ts
import { database, ref, set, onValue, off } from "./firebaseConfig";
import { 
  categories, 
  offers 
} from "../Data/productsData";

export interface Product {
  id: string;
  name: string;
  description: string;
  images: string[];
  price: number;
  sugarLevel: number;
  sugarFree: boolean;
  hasEgg: boolean;
  type: string;
  rating: number;
  calories: number;
  category: string;
  tag?: string;
}

export interface Cake {
  id: string;
  name: string;
  description: string;
  images: string[];
  price: number;
  type: string;
  rating: number;
  calories: string;
  category: string;
  tag?: string;
}

export interface Deal {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  discount: string;
  description: string;
  calories: string;
  deliveryTime: string;
  image: string;
  rating: number;
  tag: string;
}

export interface Offer {
  id: string;
  title: string;
  description: string;
  code: string;
  validUntil: string;
}

export const uploadInitialData = async () => {
  try {
    await Promise.all([
      set(ref(database, 'categories'), categories),
      set(ref(database, 'offers'), offers)
    ]);
    console.log("Data uploaded successfully!");
  } catch (error) {
    console.error("Upload error:", error);
    throw error;
  }
};

export const getProducts = (callback: (data: Product[]) => void) => {
  const productsRef = ref(database, 'products');
  const listener = (snapshot: any) => {
    const data = snapshot.val();
    callback(data ? Object.values(data) : []);
  };
  
  onValue(productsRef, listener);
  
  return () => off(productsRef, 'value', listener);
};

export const getCakes = (callback: (data: Cake[]) => void) => {
  const cakesRef = ref(database, 'cakes');
  const listener = (snapshot: any) => {
    const data = snapshot.val();
    callback(data ? Object.values(data) : []);
  };
  
  onValue(cakesRef, listener);
  
  return () => off(cakesRef, 'value', listener);
};

export const getDeals = (callback: (data: Deal[]) => void) => {
  const dealsRef = ref(database, 'deals');
  const listener = (snapshot: any) => {
    const data = snapshot.val();
    callback(data ? Object.values(data) : []);
  };
  
  onValue(dealsRef, listener);
  
  return () => off(dealsRef, 'value', listener);
};

export const getOffers = (callback: (data: Offer[]) => void) => {
  const offersRef = ref(database, 'offers');
  const listener = (snapshot: any) => {
    const data = snapshot.val();
    callback(data ? Object.values(data) : []);
  };
  
  onValue(offersRef, listener);
  
  return () => off(offersRef, 'value', listener);
};

export const getCategories = (callback: (data: string[]) => void) => {
  const categoriesRef = ref(database, 'categories');
  const listener = (snapshot: any) => {
    const data = snapshot.val();
    callback(data || []);
  };
  
  onValue(categoriesRef, listener);
  
  return () => off(categoriesRef, 'value', listener);
};