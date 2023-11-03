import { useEffect } from "react";
import { fetchWishlist } from "../../actions/wishlist.action";
import { useWishlistContenxt } from "../../contexts/wishlist.context";

import { Product } from "../../components/Product/Product";
import "./Wishlist.css";

export const Wishlist = () => {
  const { state, dispatch } = useWishlistContenxt();

  const getWishlist = async () => {
    dispatch({ type: "WISHLIST_LOADING" });
    const wishlist = await fetchWishlist();
    dispatch({ type: "FETCH_WISHLIST", payload: wishlist });
  };

  useEffect(() => {
    getWishlist();
  }, []);

  return (
    <div className="wishlist__container">
      {state.loading === true ? (
        "Loading..."
      ) : (
        <div className="wishlist__body">
          <h1 className="text__center">Wishlist Page</h1>
          <ul className="wishlist">
            {state.wishlist &&
              state.wishlist.map((item) => {
                const { _id } = item;
                return (
                  <li className="" key={_id}>
                    <Product {...item} />
                  </li>
                );
              })}
          </ul>
        </div>
      )}
    </div>
  );
};
