import { createContext, useContext, useReducer } from "react";
import { authReducer } from "../reducers/auth.reducer";

const AuthContext = createContext();

const initialState = {
  username: "",
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
