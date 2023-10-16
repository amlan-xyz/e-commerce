import { createContext, useContext, useEffect, useReducer } from "react";
import { fetchUserProfile } from "../actions/auth.action";
import { authReducer } from "../reducers/auth.reducer";
const AuthContext = createContext();

const initialState = {
  user: {},
  isLoggedIn: false,
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const getUserDetails = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = await fetchUserProfile();
      dispatch({ type: "LOGIN", payload: user });
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
