import { AiFillHeart, AiFillStar, AiOutlineHeart } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import "./Product.css";
//context
import { useAuthContext } from "../../contexts/auth.context";
import { useCartContext } from "../../contexts/cart.context";
import { useWishlistContenxt } from "../../contexts/wishlist.context";
//actions
import { addToCart } from "../../actions/cart.action";
import {
  addToWishlist,
  deleteItemFromWishlist,
} from "../../actions/wishlist.action";

export const Product = ({ _id, name, rating, category, price, image }) => {
  const navigate = useNavigate();
  const { state } = useAuthContext();
  const cartContext = useCartContext();
  const carts = cartContext.state.cart;
  const wishlistContext = useWishlistContenxt();
  const wishlists = wishlistContext.state.wishlist;

  const handleCart = async (productId) => {
    if (state.isLoggedIn === false) {
      navigate("/login");
    } else {
      cartContext.dispatch({ type: "CART_LOADING" });
      const data = await addToCart(productId);
      cartContext.dispatch({ type: "ADD_TO_CART", payload: data });
    }
  };

  const handleWishlist = async (productId) => {
    if (state.isLoggedIn === false) {
      navigate("/login");
    } else {
      wishlistContext.dispatch({ type: "WISHLIST_LOADING" });
      const item = addToWishlist(productId);
      wishlistContext.dispatch({ type: "ADD_TO_WISHLIST", payload: item });
    }
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

  const handleBuyNow = () => {
    if (state.isLoggedIn === false) {
      navigate("/login");
    } else {
      navigate(`/buy-now/${_id}`);
    }
  };

  return (
    <div className="product " id={category}>
      <img
        onClick={() => navigate(`/products/${_id}`)}
        className="product__img"
        src={image}
        alt="A violet candy"
      />
      <div className="product__body flex">
        <div className="product__header flex">
          <h3 onClick={() => navigate(`/products/${_id}`)}>{name}</h3>
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
        <div className="product__btns">
          {carts && carts.find((cart) => cart.item._id === _id) ? (
            <button
              className="product__cart-btn--alt"
              onClick={() => navigate("/cart")}
            >
              View Cart
            </button>
          ) : (
            <button
              className="product__cart-btn"
              onClick={() => handleCart(_id)}
            >
              Add to cart
            </button>
          )}
          <button onClick={handleBuyNow} className="product__cart-btn--alt">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};
