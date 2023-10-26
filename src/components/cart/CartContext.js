import React, { createContext, useContext, useReducer } from "react";
import axios from "axios";

// Create a CartContext
const CartContext = createContext();

// Initial state for the cart
const initialState = {
  cart: [],
  cartItemCount: 0,
};

// Define the reducer function to handle cart actions
function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_TO_CART":
      return { ...state, cart: [...state.cart, action.payload] };
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload.id),
      };
    case "SET_CART_ITEM_COUNT":
      return { ...state, cartItemCount: action.payload };
    default:
      return state;
  }
}

// Create a CartProvider component
export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

// Custom hook to access the CartContext
export function useCart() {
  const { state, dispatch } = useContext(CartContext);

  const fetchCartItemCount = async () => {
    try {
      const response = await axios.get("http://localhost:3001/cart/count");
      const cartItemCount = response.data.count;
      dispatch({ type: "SET_CART_ITEM_COUNT", payload: cartItemCount });
    } catch (error) {
      console.error("Error fetching cart item count:", error);
    }
  };

  return {
    state,
    fetchCartItemCount,
  };
}
