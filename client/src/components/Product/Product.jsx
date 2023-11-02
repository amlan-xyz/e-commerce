import { AiFillStar, AiOutlineHeart } from "react-icons/ai";
import "./Product.css";
//context
import { useProductsContext } from "../../contexts/products.context";
//actions
import { addToCart } from "../../actions/cart.action";
import { addToWishlist } from "../../actions/wishlist.action";
export const Product = ({ _id, name, rating, category, price, image }) => {
  const { dispatch } = useProductsContext();
  const handleCart = async (productId) => {
    const data = await addToCart(productId);
    dispatch({ type: "ADD_TO_CART", payload: data });
  };

  const handleWishlist = async (productId) => {
    dispatch({ type: "WISHLIST_LOADING" });
    const item = addToWishlist(productId);
    dispatch({ type: "ADD_TO_WISHLIST", payload: item });
  };
  return (
    <div className="product">
      <img className="product__img" src={image} alt="A violet candy" />
      <div className="product__body flex">
        <div className="product__header flex">
          <h3>{name}</h3>
          <button
            className="product__wishlist-btn"
            onClick={() => handleWishlist(_id)}
          >
            {" "}
            <AiOutlineHeart className="heart__empty" />
          </button>

          {/* <AiFillHeart className="heart__filled" /> */}
        </div>
        <small>
          {rating} <AiFillStar className="fill__primary" /> | {category}
        </small>
        <p>&#8377; {price}</p>
        <button className="product__cart-btn" onClick={() => handleCart(_id)}>
          Add to cart
        </button>
      </div>
    </div>
  );
};
