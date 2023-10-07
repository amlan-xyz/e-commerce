import { NavLink, Route, Routes } from "react-router-dom";

//pages
import { Login } from "./pages/Auth/Login";
import { Signup } from "./pages/Auth/Signup";
import { Cart } from "./pages/Cart/Cart";
import { Home } from "./pages/Home/Home";
import { Products } from "./pages/Products/Products";

function App() {
  return (
    <div className="main__container">
      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/products">Products</NavLink>
        <NavLink to="/cart">Cart</NavLink>
        <NavLink to="/login">Login</NavLink>
        <NavLink to="/signup">Signup</NavLink>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
