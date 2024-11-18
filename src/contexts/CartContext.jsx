import React, { createContext, useContext, useReducer, useEffect } from "react";
import { useAuth } from "./AuthContext";

const CartContext = createContext({
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
});

export const useCart = () => useContext(CartContext);

// Action types for the cart reducer
const ADD_TO_CART = "ADD_TO_CART";
const REMOVE_FROM_CART = "REMOVE_FROM_CART";
const CLEAR_CART = "CLEAR_CART";

// Cart reducer function
const cartReducer = (state, action) => {
  switch (action.type) {
    case ADD_TO_CART:
        // Check if the product is already in the cart
        const existingItemIndex = state.findIndex((item) => item.product_id === action.payload.product_id);
        
        if (existingItemIndex !== -1) {
          const updatedCart = [...state];
          updatedCart[existingItemIndex] = {
            ...updatedCart[existingItemIndex],
            quantity: updatedCart[existingItemIndex].quantity + action.payload.quantity, 
          };
          return updatedCart;
        } else {
          return [...state, action.payload];
        }
    case REMOVE_FROM_CART:
      return state.filter((item) => item.product_id !== action.payload.product_id);
    case CLEAR_CART:
      return [];
    default:
      return state;
  }
};

const CART_STORAGE_KEY = "cart_items";

const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const initialCart = user
    ? user.cart
    : JSON.parse(localStorage.getItem(CART_STORAGE_KEY)) || [];

  const [cart, dispatch] = useReducer(cartReducer, initialCart);

  useEffect(() => {
    if (user) {
    //   localStorage.setItem(CART_STORAGE_KEY, user[0].cart);
    } else {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
      console.log(cart);
    }
  }, [user, cart]);

  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;

// const { cart, dispatch } = useCart();

// const addToCart = (priceId, quantity) => {
//   dispatch({
//     type: 'ADD_TO_CART',
//     payload: {
//       price_id: priceId,
//       quantity: quantity,
//     },
//   });
// };
