import { AiFillHeart, AiFillStar, AiOutlineHeart } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import "./Product.css";
//context
import { useCartContext } from "../../contexts/cart.context";
import { useWishlistContenxt } from "../../contexts/wishlist.context";
//actions
import { useEffect } from "react";
import { addToCart, fetchCart } from "../../actions/cart.action";
import {
  addToWishlist,
  deleteItemFromWishlist,
  fetchWishlist,
} from "../../actions/wishlist.action";

export const Product = ({ _id, name, rating, category, price, image }) => {
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

  return (
    <div className="product " id={category}>
      <img className="product__img" src={image} alt="A violet candy" />
      <div className="product__body flex">
        <div className="product__header flex">
          <h3>{name}</h3>
          {wishlists && wishlists.find((wishlist) => wishlist._id === _id) ? (
            <button
              className="product__wishlist-btn"
              onClick={() => removeFromWishlist(_id)}
            >
              {" "}
              <AiFillHeart className="heart__filled" />
            </button>
          ) : (
            <button
              className="product__wishlist-btn"
              onClick={() => handleWishlist(_id)}
            >
              {" "}
              <AiOutlineHeart className="heart__empty" />
            </button>
          )}
        </div>
        <small>
          {rating} <AiFillStar className="fill__primary" /> | {category}
        </small>
        <p>&#8377; {price}</p>
        {carts && carts.find((cart) => cart.item._id === _id) ? (
          <button
            className="product__cart-btn--alt"
            onClick={() => navigate("/cart")}
          >
            View Cart
          </button>
        ) : (
          <button className="product__cart-btn" onClick={() => handleCart(_id)}>
            Add to cart
          </button>
        )}
      </div>
    </div>
  );
};
