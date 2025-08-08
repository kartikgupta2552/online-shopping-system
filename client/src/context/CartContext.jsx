// src/context/CartContext.js
import React, { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  // const addToCart = (product) => {
  //   setCart((prev) => [...prev, product]);
  // };
  const addToCart = (item) => {
    // Prevent duplicates
    const alreadyInCart = cart.some((cartItem) => cartItem.id === item.id);
    if (alreadyInCart) {
      alert("Item is already in the cart!");
      return;
    }
    setCart([...cart, item]);2
  }

  // const addToWishlist = (product) => {
  //   setWishlist((prev) => [...prev, product]);
  // };
  const addToWishlist = (product) => {
    const alreadyInWishlist = wishlist.some((wishItem) => wishItem.id === product.id);
    if (alreadyInWishlist) {
      alert("Item is already in the wishlist!");
      return;
    }
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
