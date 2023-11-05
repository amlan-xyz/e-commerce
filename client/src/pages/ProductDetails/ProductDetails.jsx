import { useEffect, useState } from "react";
import { AiFillHeart, AiFillStar, AiOutlineHeart } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import { useProductsContext } from "../../contexts/products.context";
import "./ProductDetails.css";
//context
import { useCartContext } from "../../contexts/cart.context";
import { useWishlistContenxt } from "../../contexts/wishlist.context";
//actions
import { addToCart, fetchCart } from "../../actions/cart.action";
import {
  addToWishlist,
  deleteItemFromWishlist,
  fetchWishlist,
} from "../../actions/wishlist.action";

export const ProductDetail = () => {
  const { id } = useParams();
  const productContext = useProductsContext();
  const products = productContext.state.products;
  const [product, setProduct] = useState({});
  const findProduct = () => {
    const product = products.find(({ _id }) => _id === id);
    setProduct({ ...product });
  };

  const navigate = useNavigate();

  const cartContext = useCartContext();
  const carts = cartContext.state.cart;
  const wishlistContext = useWishlistContenxt();
  const wishlists = wishlistContext.state.wishlist;

  const handleCart = async (productId) => {
    const data = await addToCart(productId);
    console.log(data);
    cartContext.dispatch({ type: "ADD_TO_CART", payload: data });
  };

  const handleWishlist = async (productId) => {
    const item = addToWishlist(productId);
    wishlistContext.dispatch({ type: "ADD_TO_WISHLIST", payload: item });
  };

  const removeFromWishlist = async (productId) => {
    const deletedItem = await deleteItemFromWishlist(productId);
    wishlistContext.dispatch({
      type: "REMOVE_FROM_WISHLIST",
      payload: {
        id: deletedItem._id,
      },
    });
  };

  const getWishlist = async () => {
    const wishlist = await fetchWishlist();
    wishlistContext.dispatch({ type: "FETCH_WISHLIST", payload: wishlist });
  };

  const getCart = async () => {
    const cart = await fetchCart();
    cartContext.dispatch({ type: "FETCH_CART", payload: cart });
  };

  useEffect(() => {
    getCart();
  }, [cartContext.dispatch]);

  useEffect(() => {
    getWishlist();
  }, [wishlistContext.dispatch]);

  useEffect(() => {
    findProduct();
  }, []);

  return (
    <div className="item__container">
      {product && (
        <div className="item__body">
          <img className="item__img" src={product.image} alt={product.name} />
          <div className="item__details">
            <div className="item__heading">
              <h2>{product.name}</h2>
              {wishlists &&
              wishlists.find((wishlist) => wishlist._id === product._id) ? (
                <button
                  className="product__wishlist-btn"
                  onClick={() => removeFromWishlist(product._id)}
                >
                  {" "}
                  <AiFillHeart className="heart__filled" />
                </button>
              ) : (
                <button
                  className="product__wishlist-btn"
                  onClick={() => handleWishlist(product._id)}
                >
                  {" "}
                  <AiOutlineHeart className="heart__empty" />
                </button>
              )}
            </div>

            <p className="align">
              {product.category} | {product.rating}
              <AiFillStar className="fill__primary" />
            </p>
            <h3>&#8377; {product.price}</h3>
            <h3>Description</h3>
            <p className="item__description">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente,
              commodi Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Beatae, neque optio nemo quos odit quia quis dignissimos modi
              praesentium eius consectetur, officia odio atque ipsa soluta magni
              laudantium ratione reprehenderit?
            </p>
            {carts && carts.find((cart) => cart.item._id === product._id) ? (
              <button
                className="product__cart-btn--alt"
                onClick={() => navigate("/cart")}
              >
                View Cart
              </button>
            ) : (
              <button
                className="product__cart-btn"
                onClick={() => handleCart(product._id)}
              >
                Add to cart
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
