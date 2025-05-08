import React, { createContext, useState, ReactNode, useContext } from 'react';

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  rating: number;
  calories: number;
  quantity: number;
  cakeSize?: string;
  type?: 'Egg' | 'Eggless';
  glutenFree?: boolean;
  readOnly?: boolean; // ✅ أضف دي هنا
}


interface CartContextType {
  cartItems: Product[];
  total: number;
  discount: number;
  addToCart: (item: Product) => void;
  applyDiscount: (code: string) => void;
  updateQuantity: (
    id: string,
    newQuantity: number,
    cakeSize?: string,
    type?: 'Egg' | 'Eggless',
    glutenFree?: boolean
  ) => void;
  removeItem: (
    id: string,
    cakeSize?: string,
    type?: 'Egg' | 'Eggless',
    glutenFree?: boolean
  ) => void;
}

export const CartContext = createContext<CartContextType>({} as CartContextType);

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [discount, setDiscount] = useState<number>(0);

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const addToCart = (item: Product) => {
    setCartItems(prev => {
      const existingItem = prev.find(i =>
        i.id === item.id &&
        i.cakeSize === item.cakeSize &&
        i.type === item.type &&
        i.glutenFree === item.glutenFree
      );

      if (existingItem) {
        return prev.map(i =>
          i.id === item.id &&
          i.cakeSize === item.cakeSize &&
          i.type === item.type &&
          i.glutenFree === item.glutenFree
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }

      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const updateQuantity = (
    id: string,
    newQuantity: number,
    cakeSize?: string,
    type?: 'Egg' | 'Eggless',
    glutenFree?: boolean
  ) => {
    if (newQuantity < 1) return;
    setCartItems(prev =>
      prev.map(item =>
        item.id === id &&
        item.cakeSize === cakeSize &&
        item.type === type &&
        item.glutenFree === glutenFree
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const removeItem = (
    id: string,
    cakeSize?: string,
    type?: 'Egg' | 'Eggless',
    glutenFree?: boolean
  ) => {
    setCartItems(prev =>
      prev.filter(item =>
        !(
          item.id === id &&
          item.cakeSize === cakeSize &&
          item.type === type &&
          item.glutenFree === glutenFree
        )
      )
    );
  };

  const applyDiscount = (code: string) => {
    if (code === "Elgayar") {
      setDiscount(total * 0.10);
    } else if (code === "DISCOUNT5") {
      setDiscount(total * 0.05);
    } else {
      setDiscount(0);
    }
  };

  return (
    <CartContext.Provider 
      value={{ 
        cartItems, 
        total, 
        discount, 
        addToCart, 
        applyDiscount,
        updateQuantity,
        removeItem
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
