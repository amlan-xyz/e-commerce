import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { BrowserRouter as Router } from "react-router-dom";

import { AuthProvider } from "./contexts/auth.context";
import { CartProvider } from "./contexts/cart.context";
import { ProductsProvider } from "./contexts/products.context";
import { WishlistProvider } from "./contexts/wishlist.context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <WishlistProvider>
          <CartProvider>
            <ProductsProvider>
              <App />
            </ProductsProvider>
          </CartProvider>
        </WishlistProvider>
      </AuthProvider>
    </Router>
  </React.StrictMode>
);
