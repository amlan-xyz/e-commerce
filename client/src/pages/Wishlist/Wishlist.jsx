import { useEffect } from "react";
import {
  deleteItemFromWishlist,
  fetchWishlist,
} from "../../actions/wishlist.action";
import { useWishlistContenxt } from "../../contexts/wishlist.context";
export const Wishlist = () => {
  const { state, dispatch } = useWishlistContenxt();

  const getWishlist = async () => {
    dispatch({ type: "WISHLIST_LOADING" });
    const wishlist = await fetchWishlist();
    dispatch({ type: "FETCH_WISHLIST", payload: wishlist });
  };

  const removeFromWishlist = async (productId) => {
    dispatch({ type: "WISHLIST_LOADING" });
    const deletedItem = await deleteItemFromWishlist(productId);
    console.log(deletedItem);
    dispatch({
      type: "REMOVE_FROM_WISHLIST",
      payload: {
        id: deletedItem._id,
      },
    });
  };

  useEffect(() => {
    getWishlist();
  }, []);

  return (
    <div className="wishlist__container">
      {state.loading === true ? (
        "Loading..."
      ) : (
        <>
          <h1>Wishlist Page</h1>
          <ul className="wishlist">
            {state.wishlist &&
              state.wishlist.map((item) => {
                const { _id, name } = item;
                return (
                  <li key={_id}>
                    {name}
                    <button onClick={() => removeFromWishlist(_id)}>
                      Remove from Wishlist
                    </button>
                  </li>
                );
              })}
          </ul>
        </>
      )}
    </div>
  );
};
