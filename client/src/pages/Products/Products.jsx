import { useEffect, useState } from "react";
import { AiOutlineClose, AiOutlineSearch } from "react-icons/ai";
//context
import { useProductsContext } from "../../contexts/products.context";

//actions
import { fetchProducts } from "../../actions/products.action";

//components
import { EmptyProducts } from "../../components/Empty/Empty";
import { Loader } from "../../components/Loader/Loader";
import { Product } from "../../components/Product/Product";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import "./Products.css";

export const Products = () => {
  const { state, dispatch } = useProductsContext();
  const [showFilter, setShowFilter] = useState(false);
  const getProducts = async () => {
    dispatch({ type: "PRODUCTS_LOADING" });
    const products = await fetchProducts();
    dispatch({ type: "FETCH_PRODUCTS", payload: products });
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <section className="products__section">
      {state.loading === true ? (
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
