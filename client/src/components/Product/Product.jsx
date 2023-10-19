//context
import { useProductsContext } from "../../contexts/products.context";
//actions
import { addToCart } from "../../actions/cart.action";
import { addToWishlist } from "../../actions/wishlist.action";
export const Product = ({ _id, name, rating, category, price }) => {
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
    <>
      <p>{name}</p>
      <button onClick={() => handleCart(_id)}>Add to cart</button>
      <button onClick={() => handleWishlist(_id)}>Add to Wishlist</button>
    </>
  );
};
