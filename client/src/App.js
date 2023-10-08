import { Route, Routes } from "react-router-dom";

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
import { RequiresAuth } from "./utils/auth";

function App() {
  return (
    <div className="main__container">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/products"
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
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
