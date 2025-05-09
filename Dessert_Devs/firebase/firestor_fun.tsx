import {
    collection,
    doc,
    updateDoc,
    deleteDoc,
    addDoc,
    getDocs,
    getDoc,
    query,
    where,
  } from "firebase/firestore";
  import { db } from "../firebase/firebaseConfig";
  
  // Product operations
  async function addProduct(product: {
    name: string;
    description: string;
    category: string;
    price: number;
    images: string[];
    tag?: string;
    rating?: number;
    calories?: number;
  }) {
    const productRef = await addDoc(collection(db, "products"), {
      name: product.name,
      description: product.description,
      price: product.price,
      images: product.images,
      category: product.category,
      tag: product.tag || "",
      rating: product.rating || 0,
      ratingCount: 0,
      calories: product.calories || 0,
      createdAt: new Date().toISOString()
    });
  
    // Update with the document ID
    await updateDoc(productRef, {
      id: productRef.id,
    });
  
    return productRef.id;
  }
  
  async function updateProduct(product: {
    id: string;
    name?: string;
    description?: string;
    price?: number;
    images?: string[];
    tag?: string;
    category?: string;
  }) {
    const productRef = doc(db, "products", product.id);
    const updateData: any = {};
    
    if (product.name) updateData.name = product.name;
    if (product.description) updateData.description = product.description;
    if (product.price) updateData.price = product.price;
    if (product.images) updateData.images = product.images;
    if (product.tag) updateData.tag = product.tag;
    if (product.category) updateData.category = product.category;
  
    await updateDoc(productRef, updateData);
  }
  
  async function deleteProduct(id: string) {
    // First delete from cart if exists
    const cartQuery = query(
      collection(db, "cart"), 
      where("productId", "==", id)
    );
    const cartSnapshot = await getDocs(cartQuery);
    
    cartSnapshot.forEach(async (cartItem) => {
      await deleteDoc(doc(db, "cart", cartItem.id));
    });
  
    // Then delete the product
    await deleteDoc(doc(db, "products", id));
  }
  
  // Cart operations
  async function addToCart(uid: string, product: {
    id: string;
    name: string;
    price: number;
    image: string;
  }) {
    const cartRef = collection(db, "cart");
    const querySnapshot = await getDocs(
      query(cartRef, where("productId", "==", product.id), where("uid", "==", uid))
    );
  
    if (!querySnapshot.empty) {
      throw new Error("This product is already in your cart.");
    }
  
    const cartItemRef = await addDoc(cartRef, {
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      uid: uid,
      quantity: 1,
      createdAt: new Date().toISOString()
    });
  
    await updateDoc(cartItemRef, {
      cartItemId: cartItemRef.id
    });
  
    return cartItemRef.id;
  }
  
  async function updateCartItemQuantity(cartItemId: string, quantity: number) {
    const cartItemRef = doc(db, "cart", cartItemId);
    await updateDoc(cartItemRef, {
      quantity: quantity
    });
  }
  
  async function deleteFromCart(cartItemId: string) {
    await deleteDoc(doc(db, "cart", cartItemId));
  }
  
  async function getCartItems(uid: string) {
    const cartRef = collection(db, "cart");
    const querySnapshot = await getDocs(
      query(cartRef, where("uid", "==", uid))
    );
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }
  
  // Product fetching
  async function getProducts() {
    const productsRef = collection(db, "products");
    const snapshot = await getDocs(productsRef);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }
  
  async function getProduct(id: string) {
    const productRef = doc(db, "products", id);
    const snapshot = await getDoc(productRef);
    return snapshot.exists() ? { id: snapshot.id, ...snapshot.data() } : null;
  }
  
  async function getProductsByCategory(category: string) {
    const productsRef = collection(db, "products");
    const querySnapshot = await getDocs(
      query(productsRef, where("category", "==", category))
    );
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }
  
  // Rating system
  async function updateProductRating(productId: string, newRating: number) {
    const productRef = doc(db, "products", productId);
    const productSnap = await getDoc(productRef);
    
    if (!productSnap.exists()) {
      throw new Error("Product not found");
    }
  
    const productData = productSnap.data();
    const currentRating = productData.rating || 0;
    const ratingCount = productData.ratingCount || 0;
    
    const updatedRating = ((currentRating * ratingCount) + newRating) / (ratingCount + 1);
  
    await updateDoc(productRef, {
      rating: updatedRating,
      ratingCount: ratingCount + 1
    });
  
    return updatedRating;
  }
  
  // Category operations
  async function addCategory(category: { name: string; icon?: string }) {
    const categoryRef = await addDoc(collection(db, "categories"), {
      name: category.name,
      icon: category.icon || "",
      createdAt: new Date().toISOString()
    });
  
    await updateDoc(categoryRef, {
      id: categoryRef.id
    });
  
    return categoryRef.id;
  }
  
  async function deleteCategory(categoryId: string) {
    // First update products in this category to "uncategorized"
    const productsQuery = query(
      collection(db, "products"), 
      where("category", "==", categoryId)
    );
    const productsSnapshot = await getDocs(productsQuery);
  
    const batchUpdates = productsSnapshot.docs.map(productDoc => 
      updateDoc(productDoc.ref, { category: "uncategorized" })
    );
  
    await Promise.all(batchUpdates);
    
    // Then delete the category
    await deleteDoc(doc(db, "categories", categoryId));
  }
  
  async function getCategories() {
    const categoriesRef = collection(db, "categories");
    const snapshot = await getDocs(categoriesRef);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }
  
  export {
    addProduct,
    updateProduct,
    deleteProduct,
    getProducts,
    getProduct,
    getProductsByCategory,
    addToCart,
    updateCartItemQuantity,
    deleteFromCart,
    getCartItems,
    updateProductRating,
    addCategory,
    deleteCategory,
    getCategories
  };
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
