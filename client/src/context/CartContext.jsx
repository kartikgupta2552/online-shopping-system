import React, { createContext, useState, useEffect } from 'react';

// 1. Create the context object!
export const CartContext = createContext(null);

// 2. CartProvider holds cart & wishlist states (synced to localStorage)
export const CartProvider = ({ children }) => {
  // -- Cart state, initialized from LS or empty --
  const [cart, setCart] = useState(() => {
    try {
      const stored = localStorage.getItem('cart');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState(() => {
    try {
      const stored = localStorage.getItem('wishlist');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // -- Keep localStorage updated whenever state changes --
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // -- Add to Cart: no duplicates! --
  const addToCart = (product) => {
    setCart(prev =>
      prev.some(item => item.id === product.id) ? prev : [...prev, product]
    );
    setWishlist(prev => prev.filter(item => item.id !== product.id));
  };

  // -- Remove from Cart --
  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  // -- Clear Cart --
  const clearCart = () => setCart([]);

  // -- Add to Wishlist: also prevent duplicates --
  const addToWishlist = (product) => {
    setWishlist(prev =>
      prev.some(item => item.id === product.id) ? prev : [...prev, product]
    );
    setCart(prev => prev.filter(item => item.id !== product.id));
  };

  // -- Remove from Wishlist --
  const removeFromWishlist = (id) => {
    setWishlist(prev => prev.filter(item => item.id !== id));
  };

  // -- THE CONTEXT VALUE: like your site-wide toolbox --
  return (
    <CartContext.Provider value={{
      cart, wishlist,
      addToCart, removeFromCart, clearCart,
      addToWishlist, removeFromWishlist
    }}>
      {children}
    </CartContext.Provider>
  );
};
