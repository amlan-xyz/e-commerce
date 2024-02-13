import { useEffect, useState } from "react";
import { AiOutlineClose, AiOutlineSearch } from "react-icons/ai";
//context
import { useProductsContext } from "../../contexts/products.context";

//actions
import { fetchProducts } from "../../actions/products.action";

//components
import { fetchCart } from "../../actions/cart.action";
import { fetchWishlist } from "../../actions/wishlist.action";
import { EmptyProducts } from "../../components/Empty/Empty";
import { Loader } from "../../components/Loader/Loader";
import { Product } from "../../components/Product/Product";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import { useCartContext } from "../../contexts/cart.context";
import { useWishlistContenxt } from "../../contexts/wishlist.context";
import "./Products.css";

export const Products = () => {
  const { state, dispatch } = useProductsContext();
  const cartContext = useCartContext();
  const wishlistContext = useWishlistContenxt();
  const [showFilter, setShowFilter] = useState(false);

  useEffect(() => {
    const getProducts = async () => {
      dispatch({ type: "PRODUCTS_LOADING" });
      const products = await fetchProducts();
      dispatch({ type: "FETCH_PRODUCTS", payload: products });
    };
    getProducts();
  }, [dispatch]);

  useEffect(() => {
    const getCart = async () => {
      const cart = await fetchCart();
      cartContext.dispatch({ type: "FETCH_CART", payload: cart });
    };

    getCart();
  }, [cartContext, cartContext.state.cart]);

  useEffect(() => {
    const getWishlist = async () => {
      const wishlist = await fetchWishlist();
      wishlistContext.dispatch({ type: "FETCH_WISHLIST", payload: wishlist });
    };
    getWishlist();
  }, [wishlistContext, wishlistContext.state.wishlist]);

  return (
    <section className="products__section">
      {state.loading === true ||
      cartContext.state.loading === true ||
      wishlistContext.state.loading === true ? (
        <Loader />
      ) : (
        <>
          <div className="products__sidebar " id="hide-sidebar">
            <div className="products__sidebar-container">
              <Sidebar />
            </div>
          </div>
          <div className="products__body">
            <div className="products__heading">
              <div className="products__heading-body">
                <h2>/ Our products </h2>
                <button
                  onClick={() => setShowFilter(true)}
                  id="show-sidebar"
                  className=" link__btn"
                >
                  Filters
                </button>
              </div>
              <div className="search__bar">
                <AiOutlineSearch />
                <input
                  type="text"
                  onChange={(e) =>
                    dispatch({ type: "SEARCH", payload: e.target.value })
                  }
                  value={state.searchQuery}
                  placeholder="Search....."
                />
              </div>
            </div>
            <div className="products__content ">
              {state.filteredProducts &&
              state.filteredProducts?.length === 0 ? (
                <div className="div__center">
                  <EmptyProducts />
                </div>
              ) : (
                <ul className="products__list">
                  {state.filteredProducts?.map((product) => (
                    <li key={product._id} className="products__list-item">
                      <Product {...product} />
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          {showFilter && (
            <div className="modal">
              <div className="modal_wrapper"></div>
              <div className="modal_container">
                <button
                  onClick={() => setShowFilter(false)}
                  className="modal_close-btn"
                >
                  <AiOutlineClose />
                </button>
                <Sidebar />
              </div>
            </div>
          )}
        </>
      )}
    </section>
  );
};
