import { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { fetchUserProfile } from "../../actions/auth.action";
import { useAuthContext } from "../../contexts/auth.context";

export const Navbar = () => {
  const { state, dispatch } = useAuthContext();

  const navigate = useNavigate();

  const getUserDetails = async () => {
    if (localStorage.getItem("token")) {
      const user = await fetchUserProfile();
      dispatch({ type: "LOGIN", payload: user });
    }
  };

  const logout = () => {
    localStorage.clear("token");
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  };

  useEffect(() => {
    getUserDetails();
  }, []);

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
