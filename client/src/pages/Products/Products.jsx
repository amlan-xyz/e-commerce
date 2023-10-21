import { useEffect, useState } from "react";

//context
import { useProductsContext } from "../../contexts/products.context";

//actions
import { fetchProducts } from "../../actions/products.action";

//components
import { Product } from "../../components/Product/Product";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import "./Products.css";

import { AiOutlineClose, AiOutlineSearch } from "react-icons/ai";

export const Products = () => {
  const { state, dispatch } = useProductsContext();
  const [showFilter, setShowFilter] = useState(false);
  const getProducts = async () => {
    const products = await fetchProducts();
    dispatch({ type: "FETCH_PRODUCTS", payload: products });
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <section className="products__section grid">
      <div className="products__sidebar show__sidebar">
        <Sidebar />
      </div>
      <div className="products__content">
        <div className="products__header">
          <h2>/ Our products </h2>
          <div className="search__bar flex">
            <AiOutlineSearch />
            <input type="text" placeholder="Search....." />
          </div>
          <button onClick={() => setShowFilter(true)} className="show__filter">
            Filters
          </button>
        </div>

        <ul className="products__list grid">
          {state.filteredProducts.map((product) => (
            <li key={product._id} className="products__list-item">
              <Product {...product} />
            </li>
          ))}
        </ul>
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
    </section>
  );
};
