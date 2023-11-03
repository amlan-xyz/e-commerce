import { AiFillHeart, AiFillStar, AiOutlineHeart } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import "./Product.css";
//context
import { useCartContext } from "../../contexts/cart.context";
import { useProductsContext } from "../../contexts/products.context";
import { useWishlistContenxt } from "../../contexts/wishlist.context";
//actions
import { addToCart } from "../../actions/cart.action";
import {
  addToWishlist,
  deleteItemFromWishlist,
} from "../../actions/wishlist.action";

export const Product = ({ _id, name, rating, category, price, image }) => {
  const { dispatch } = useProductsContext();

  const { state } = useCartContext();
  const data = useWishlistContenxt();

  const wishlists = data.state.wishlist;

  const navigate = useNavigate();

  const handleCart = async (productId) => {
    const data = await addToCart(productId);
    dispatch({ type: "ADD_TO_CART", payload: data });
  };

  const handleWishlist = async (productId) => {
    dispatch({ type: "WISHLIST_LOADING" });
    const item = addToWishlist(productId);
    dispatch({ type: "ADD_TO_WISHLIST", payload: item });
  };

  const removeFromWishlist = async (productId) => {
    dispatch({ type: "WISHLIST_LOADING" });
    const deletedItem = await deleteItemFromWishlist(productId);
    dispatch({
      type: "REMOVE_FROM_WISHLIST",
      payload: {
        id: deletedItem._id,
      },
    });
  };

  return (
    <div className="product " id={category}>
      <img className="product__img" src={image} alt="A violet candy" />
      <div className="product__body flex">
        <div className="product__header flex">
          <h3>{name}</h3>
          {wishlists.find((wishlist) => wishlist._id === _id) ? (
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
        {state.cart.find((cartItem) => cartItem.item.name === name) ? (
          <button
            className="product__cart-btn"
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
