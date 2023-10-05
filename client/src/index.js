import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { BrowserRouter as Router } from 'react-router-dom';

import { ProductsProvider } from './contexts/products.context';
import { CartProvider } from './contexts/cart.context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <CartProvider>
      <ProductsProvider>
        <App />
      </ProductsProvider>
      </CartProvider>
    </Router>
  </React.StrictMode>
);


