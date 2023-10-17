import { createContext, useContext, useReducer } from "react";

import { wishlistReducer } from "../reducers/wishlist.reducer";

const WishlistContext = createContext();

const initialState = {
  wishlist: [],
  loading: false,
};

export const WishlistProvider = ({ children }) => {
  const [state, dispatch] = useReducer(wishlistReducer, initialState);
  return (
    <WishlistContext.Provider value={{ state, dispatch }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlistContenxt = () => {
  return useContext(WishlistContext);
};
