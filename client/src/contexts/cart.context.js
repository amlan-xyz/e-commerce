import { createContext, useContext, useReducer } from "react";

import { cartReducer } from "../reducers/cart.reducer";

const CartContext = createContext();

const initialState = {
  cart: [],
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => {
  return useContext(CartContext);
};
