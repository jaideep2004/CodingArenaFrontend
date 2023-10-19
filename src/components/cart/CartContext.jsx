import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}
