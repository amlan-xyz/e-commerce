import { useState } from "react";
import {
  AiOutlineClose,
  AiOutlineHeart,
  AiOutlineShopping,
  AiOutlineShoppingCart,
  AiOutlineUserAdd,
} from "react-icons/ai";
import { BiLogIn, BiLogOut } from "react-icons/bi";
import { FaBars, FaCandyCane } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../contexts/auth.context";
import "./Navbar.css";

const getActiveStyle = ({ isActive }) => ({
  textDecoration: isActive ? "underline" : "",
});
export const Navbar = () => {
  const { state } = useAuthContext();
  const [toggleMenu, setToggleMenu] = useState(false);

  const handleToggle = () => {
    setToggleMenu(!toggleMenu);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    state.isLoggedIn = false;
    state.user = null;
    hideNav();
  };

  const hideNav = () => {
    setToggleMenu(false);
  };

  const navigate = useNavigate();

  return (
    <div className="navigation flex">
      <header onClick={() => navigate("/")} className="navigation__header">
        Candyland <FaCandyCane />
      </header>
      <nav>
        <button
          className="navigation__btn"
          onClick={handleToggle}
          id="show-toggle"
        >
          {toggleMenu ? <AiOutlineClose /> : <FaBars />}
        </button>
        <ul
          className="primary__navigation flex"
          id={toggleMenu ? "show-nav" : ""}
        >
          <li className="navigation__item">
            <NavLink
              onClick={hideNav}
              to="/shop"
              className="no__underline navigation__link"
              style={getActiveStyle}
            >
              Shop
              <AiOutlineShopping className="navigation__icon" />
            </NavLink>
          </li>
          <li className="navigation__item">
            <NavLink
              onClick={hideNav}
              to="/cart"
              className="no__underline navigation__link"
              style={getActiveStyle}
            >
              Cart
              <AiOutlineShoppingCart className="navigation__icon" />
            </NavLink>
          </li>
          <li className="navigation__item">
            <NavLink
              onClick={hideNav}
              to="/wishlist"
              className="no__underline navigation__link"
              style={getActiveStyle}
            >
              Wishlist
              <AiOutlineHeart className="navigation__icon" />
            </NavLink>
          </li>
          {state.isLoggedIn ? (
            <>
              <li className="navigation__item">
                <NavLink
                  onClick={hideNav}
                  to="/profile"
                  className="no__underline navigation__link"
                  style={getActiveStyle}
                >
                  Profile
                  <AiOutlineUserAdd className="navigation__icon" />
                </NavLink>
              </li>
              <li className="navigation__item">
                <NavLink
                  to="/login"
                  onClick={handleLogout}
                  className="no__underline navigation__link"
                  style={getActiveStyle}
                >
                  Logout
                  <BiLogOut className="navigation__icon" />
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li className="navigation__item">
                <NavLink to="/login" className="no__underline navigation__link">
                  Sign In
                  <BiLogIn className="navigation__icon" />
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
};
