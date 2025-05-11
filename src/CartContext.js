import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([
    { id: 1, name: 'Chair', price: 100, quantity: 2, image: 'https://via.placeholder.com/150' },
    { id: 2, name: 'Smartphone Case', price: 250, quantity: 1, image: 'https://via.placeholder.com/150' },
    { id: 3, name: 'Bluetooth Speaker', price: 300, quantity: 1, image: 'https://via.placeholder.com/150' },
  ]);

  const removeFromCart = (id) => setItems(items.filter(item => item.id !== id));
  const updateQuantity = (id, quantity) => setItems(items.map(item => item.id === id ? { ...item, quantity } : item));
  const clearCart = () => setItems([]);

  const cartTotal = items.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ items, removeFromCart, updateQuantity, cartTotal, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
