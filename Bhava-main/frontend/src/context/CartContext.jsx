import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

const CartContext = createContext(null);

const STORAGE_KEY = "bhava_cart";
const BASE = import.meta.env.VITE_API_URL || "";

// Parse "₹1,299" → 1299
const parsePrice = (str) =>
  parseInt(String(str).replace(/[₹,]/g, ""), 10) || 0;

function loadCart() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveCart(items) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

// Fire-and-forget: sync add to backend when user is logged in
async function syncAddToBackend(item) {
  const token = localStorage.getItem("bhava_token");
  if (!token) return;
  try {
    await fetch(`${BASE}/api/cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(item),
    });
  } catch {
    // silent — localStorage is source of truth
  }
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(loadCart);

  // Persist to localStorage whenever cart changes
  useEffect(() => {
    saveCart(cartItems);
  }, [cartItems]);

  const itemCount = cartItems.reduce((s, i) => s + i.quantity, 0);
  const total = cartItems.reduce((s, i) => s + parsePrice(i.price) * i.quantity, 0);

  const addToCart = useCallback((product) => {
    setCartItems((prev) => {
      const idx = prev.findIndex((i) => i.productId === product.productId);
      let next;
      if (idx >= 0) {
        next = prev.map((item, i) =>
          i === idx ? { ...item, quantity: item.quantity + (product.quantity || 1) } : item
        );
      } else {
        next = [...prev, { ...product, quantity: product.quantity || 1 }];
      }
      return next;
    });
    // Also sync to backend (async, non-blocking)
    syncAddToBackend(product);
  }, []);

  const removeFromCart = useCallback((productId) => {
    setCartItems((prev) => prev.filter((i) => i.productId !== productId));
  }, []);

  const updateQuantity = useCallback((productId, quantity) => {
    if (quantity < 1) return;
    setCartItems((prev) =>
      prev.map((i) => (i.productId === productId ? { ...i, quantity } : i))
    );
  }, []);

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart, itemCount, total }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
