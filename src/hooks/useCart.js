import { useState, useEffect } from 'react';

const CART_KEY = 'offlineshop_cart';

export function useCart() {
  const [cart, setCart] = useState(() => {
    try {
      const stored = localStorage.getItem(CART_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Persist to localStorage on every change
  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, selectedSize) => {
    setCart(prev => {
      const existing = prev.find(
        item => item.id === product.id && item.selectedSize === selectedSize
      );
      if (existing) {
        return prev.map(item =>
          item.id === product.id && item.selectedSize === selectedSize
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      }
      return [...prev, { ...product, selectedSize, qty: 1 }];
    });
  };

  const removeFromCart = (id, selectedSize) => {
    setCart(prev =>
      prev.filter(item => !(item.id === id && item.selectedSize === selectedSize))
    );
  };

  const updateQty = (id, selectedSize, qty) => {
    if (qty < 1) return removeFromCart(id, selectedSize);
    setCart(prev =>
      prev.map(item =>
        item.id === id && item.selectedSize === selectedSize
          ? { ...item, qty }
          : item
      )
    );
  };

  const clearCart = () => setCart([]);

  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return { cart, addToCart, removeFromCart, updateQty, clearCart, totalItems, totalPrice };
}
