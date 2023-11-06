import { useEffect } from "react";
import { fetchWishlist } from "../../actions/wishlist.action";
import { EmptyWishlist } from "../../components/Empty/Empty";
import { Loader } from "../../components/Loader/Loader";
import { Product } from "../../components/Product/Product";
import { useWishlistContenxt } from "../../contexts/wishlist.context";
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
    <>
      {state.wishlist && state.wishlist.length === 0 ? (
        <div className="div__center">
          <EmptyWishlist />
        </div>
      ) : (
        <div className="wishlist__container">
          {state.loading === true ? (
            <Loader />
          ) : (
            <div className="wishlist__body">
              <h1 className="text__center">
                My Wishlist ({state.wishlist.length}){" "}
              </h1>
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
      )}
    </>
  );
};
