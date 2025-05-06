import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 41000);
  const advancePayment = totalAmount * 0.3;

  return (
    <CartContext.Provider value={{ cartItems, setCartItems, totalAmount, advancePayment }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
