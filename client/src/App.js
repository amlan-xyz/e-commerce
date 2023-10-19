import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
//pages
import { Login } from "./pages/Auth/Login";
import { Signup } from "./pages/Auth/Signup";
import { Cart } from "./pages/Cart/Cart";
import { Home } from "./pages/Home/Home";
import { Products } from "./pages/Products/Products";
import { Profile } from "./pages/Profile/Profile";

//components
import { Navbar } from "./components/Navbar/Navbar";

//utils
import { fetchUserProfile } from "./actions/auth.action";
import { useAuthContext } from "./contexts/auth.context";
import { Wishlist } from "./pages/Wishlist/Wishlist";
import { RequiresAuth } from "./utils/auth";
function App() {
  const { dispatch } = useAuthContext();
  const getUserDetails = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = await fetchUserProfile();
      if (user) {
        dispatch({ type: "LOGIN", payload: user });
      }
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <div className="main">
      <Navbar />
      <div className="main__container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/shop"
            element={
              <RequiresAuth>
                <Products />
              </RequiresAuth>
            }
          />
          <Route
            path="/cart"
            element={
              <RequiresAuth>
                <Cart />
              </RequiresAuth>
            }
          />
          <Route
            path="/profile"
            element={
              <RequiresAuth>
                <Profile />
              </RequiresAuth>
            }
          />
          <Route
            path="/wishlist"
            element={
              <RequiresAuth>
                <Wishlist />
              </RequiresAuth>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
