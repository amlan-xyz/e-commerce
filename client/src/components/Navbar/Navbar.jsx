import { NavLink, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../contexts/auth.context";
export const Navbar = () => {
  const { state, dispatch } = useAuthContext();

  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear("token");
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <NavLink to="/">Home</NavLink>
      <NavLink to="/products">Products</NavLink>
      <NavLink to="/cart">Cart</NavLink>
      {state.isLoggedIn === true ? (
        <>
          <NavLink to="/profile">{state.user.username}</NavLink>
          <NavLink onClick={logout}>Logout</NavLink>
        </>
      ) : (
        <>
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/signup">Signup</NavLink>
        </>
      )}
    </nav>
  );
};
