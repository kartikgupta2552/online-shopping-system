import React, { createContext, useState, useEffect } from "react";
import api from "../utils/api"; // <-- See above!

export const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  // 💉 On mount (and on login), fetch cart and wishlist from backend
  useEffect(() => {
    const fetchCartAndWishlist = async () => {
      const token = JSON.parse(localStorage.getItem("user"))?.token;
      if (!token) {
        setCart([]);
        setWishlist([]);
        return;
      }
      try {
        // GET the user's cart from backend
        const cartResponse = await api.get("/cart");
        setCart(cartResponse.data.data.cartItems || []);

        // 🦴 Wishlists: If you have a backend endpoint, use it here.
        // For now: empty array or local
        setWishlist([]);
      } catch (error) {
        console.error("Failed to fetch cart or wishlist:", error);
        setCart([]);
        setWishlist([]);
      }
    };
    fetchCartAndWishlist();
  }, []);

  /*** ACTIONS - All hit backend, then update local state ***/

  // Add to cart (calls backend, then refreshes cart)
  const addToCart = async (product) => {
    try {
      await api.post("/cart/add", { productId: product.id, quantity: 1 }); // You can extend to allow custom quantity
      const cartResponse = await api.get("/cart");
      setCart(cartResponse.data.data.cartItems || []);
      // Optionally, remove from wishlist if backend supports that relationship
    } catch (error) {
      console.error("Failed to add to cart:", error);
    }
  };

  // Remove from cart (by productId)
  const removeFromCart = async (id) => {
    try {
      await api.delete(`/cart/item/${id}`);
      const cartResponse = await api.get("/cart");
      setCart(cartResponse.data.data.cartItems || []);
    } catch (error) {
      console.error("Failed to remove from cart:", error);
    }
  };

  // Clear cart via backend
  const clearCart = async () => {
    try {
      await api.delete("/cart/clear");
      setCart([]);
    } catch (error) {
      console.error("Failed to clear cart:", error);
    }
  };

  // WISHLIST functions: 🦴
  // Still using local state until you build a backend for it!
  const addToWishlist = (product) => {
    setWishlist((prev) =>
      prev.some((item) => item.id === product.id) ? prev : [...prev, product]
    );
    setCart((prev) => prev.filter((item) => item.id !== product.id));
  };

  const removeFromWishlist = (id) => {
    setWishlist((prev) => prev.filter((item) => item.id !== id));
  };

  // Expose everything in context
  return (
    <CartContext.Provider
      value={{
        cart,
        wishlist,
        addToCart,
        removeFromCart,
        clearCart,
        addToWishlist,
        removeFromWishlist,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
