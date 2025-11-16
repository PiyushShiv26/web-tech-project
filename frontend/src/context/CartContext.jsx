// src/context/CartContext.jsx

import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext(null);

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  const addItem = (product, qty = 1) => {
    setItems((prevItems) => {
      // Check if item already in cart
      const exist = prevItems.find((x) => x.product._id === product._id);

      if (exist) {
        // If exists, update quantity
        return prevItems.map((x) =>
          x.product._id === product._id ? { ...x, qty: x.qty + qty } : x
        );
      } else {
        // If new, add to cart
        return [...prevItems, { product, qty }];
      }
    });
  };

  const removeItem = (id) => {
    setItems((prevItems) => prevItems.filter((x) => x.product._id !== id));
  };

  // --- NEW FUNCTION ---
  // Clears the cart
  const clearCart = () => {
    setItems([]);
  };
  // --- END NEW FUNCTION ---

  const cartCount = items.reduce((acc, item) => acc + item.qty, 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, clearCart, cartCount }}>
      {children}
    </CartContext.Provider>
  );
};