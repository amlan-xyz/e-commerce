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
import { fetchCart } from "./actions/cart.action";
import { fetchWishlist } from "./actions/wishlist.action";
import { useAuthContext } from "./contexts/auth.context";
import { Wishlist } from "./pages/Wishlist/Wishlist";
import { RequiresAuth } from "./utils/auth";

import { useCartContext } from "./contexts/cart.context";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchProducts } from "./actions/products.action";
import { Footer } from "./components/Footer/Footer";
import { useProductsContext } from "./contexts/products.context";
import { useWishlistContenxt } from "./contexts/wishlist.context";
import { BuyNow } from "./pages/BuyNow/BuyNow";
import { Checkout } from "./pages/Checkout/Checkout";
import { ProductDetail } from "./pages/ProductDetails/ProductDetails";
function App() {
  const { dispatch } = useAuthContext();
  const productsContext = useProductsContext();
  const wishlistContext = useWishlistContenxt();
  const cartContext = useCartContext();
  const getUserDetails = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = await fetchUserProfile();
      if (user) {
        dispatch({ type: "LOGIN", payload: user });
        const cart = await fetchCart();
        cartContext.dispatch({ type: "FETCH_CART", payload: cart });
        const wishlist = await fetchWishlist();
        wishlistContext.dispatch({ type: "FETCH_WISHLIST", payload: wishlist });
      }
    }
  };

  const getProducts = async () => {
    const products = await fetchProducts();
    productsContext.dispatch({ type: "FETCH_PRODUCTS", payload: products });
  };

  useEffect(() => {
    getUserDetails();
    getProducts();
  }, []);

  return (
    <div className="main">
      <Navbar />
      <div className="main__container">
        <ToastContainer
          position="bottom-right"
          autoClose="400"
          closeOnClick="true"
          draggable="true"
          borderRadius="10px"
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />
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
          <Route
            path="/checkout"
            element={
              <RequiresAuth>
                <Checkout />
              </RequiresAuth>
            }
          />
          <Route
            path="/buy-now/:id"
            element={
              <RequiresAuth>
                <BuyNow />
              </RequiresAuth>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
