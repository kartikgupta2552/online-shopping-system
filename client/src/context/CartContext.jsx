// src/context/CartContext.js
import React, { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  
  const addToCart = (item) => {
    // Prevent duplicates
    const alreadyInCart = cart.some((cartItem) => cartItem.id === item.id);
    
    if (alreadyInCart) {
      alert("Item is already in the cart!");
      return;
    }
    alert("Item successfully added in the cart!");
    setCart([...cart, item]);2
  }

  
  const addToWishlist = (product) => {
    const alreadyInWishlist = wishlist.some((wishItem) => wishItem.id === product.id);
    
    if (alreadyInWishlist) {
      alert("Item is already in the wishlist!");
      return;
    }
    alert("Move to wishList Successfully");
    setWishlist((prev) => [...prev, product]);
  };
  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const removeFromWishlist = (id) => {
    setWishlist((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <CartContext.Provider value={{ cart, wishlist, addToCart, addToWishlist,removeFromCart,clearCart,removeFromWishlist }}>
      {children}
    </CartContext.Provider>
  );
};
