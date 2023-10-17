import { Navigate, useLocation } from "react-router";
import { useAuthContext } from "../contexts/auth.context";
export function RequiresAuth({ children }) {
  const { state } = useAuthContext();
  const location = useLocation();

  return state.isLoggedIn === true ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }}></Navigate>
  );
}
