//context
import { useProductsContext } from "../../contexts/products.context";
export const Sidebar = () => {
  const { state, dispatch } = useProductsContext();
  const handleReset = () => {
    dispatch({ type: "RESET" });
  };
  return (
    <div className="sidebar">
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
    </div>
  );
};
