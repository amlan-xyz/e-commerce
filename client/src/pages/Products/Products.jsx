import { useEffect } from "react";

//context
import { useProductsContext } from "../../contexts/products.context";

//actions
import { addToCart } from "../../actions/cart.action";
import { fetchProducts } from "../../actions/products.action";

export const Products = () => {
  const { state, dispatch } = useProductsContext();

  const getProducts = async () => {
    const products = await fetchProducts();
    dispatch({ type: "FETCH_PRODUCTS", payload: products });
  };

  const handleReset = () => {
    dispatch({ type: "RESET" });
  };

  const handleCart = async (productId) => {
    const data = await addToCart(productId);
    dispatch({ type: "ADD_TO_CART", payload: data });
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <section className="products__section">
      <h1>Products page</h1>
      <button onClick={handleReset}>Reset</button>

      <label htmlFor="search">Search</label>
      <input
        id="search"
        value={state.searchQuery}
        type="text"
        onChange={(e) => dispatch({ type: "SEARCH", payload: e.target.value })}
      />

      <label htmlFor="">Sort Price High To low</label>
      <input
        type="radio"
        checked={state.sortHighToLow === true}
        onChange={(e) => dispatch({ type: "SORT_BY_PRICE", payload: true })}
      />
      <label htmlFor="">Sort Price Low to High</label>
      <input
        checked={state.sortHighToLow === false}
        type="radio"
        name="sortPrice"
        onChange={(e) => dispatch({ type: "SORT_BY_PRICE", payload: false })}
      />

      <input
        type="range"
        min="0"
        max="10000"
        onChange={(e) => {
          console.log(e.target.value);
          dispatch({ type: "FILTER_BY_PRICE_RANGE", payload: e.target.value });
        }}
      />

      <label>Rating</label>
      <input
        type="checkbox"
        checked={state.rating === 4}
        name="rating-4"
        onChange={(e) => dispatch({ type: "FILTER_BY_RATING", payload: 4 })}
      />
      <input
        type="checkbox"
        checked={state.rating === 1}
        name="rating-0"
        onChange={(e) => dispatch({ type: "FILTER_BY_RATING", payload: 1 })}
      />
      <ul>
        {state.filteredProducts.map((product) => {
          const { _id, name, price } = product;
          return (
            <li key={_id}>
              {name} || {price}
              <button onClick={() => handleCart(_id)}>Add to cart</button>
            </li>
          );
        })}
      </ul>
    </section>
  );
};
