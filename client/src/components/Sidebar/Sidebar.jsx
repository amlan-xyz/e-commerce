import { AiFillStar } from "react-icons/ai";
import "./Sidebar.css";
//context
import { useProductsContext } from "../../contexts/products.context";
export const Sidebar = () => {
  const { state, dispatch } = useProductsContext();
  const handleReset = () => {
    dispatch({ type: "RESET" });
  };
  return (
    <div className="sidebar ">
      <div className="sidebar__header flex">
        <h2>Filters</h2>
        <button onClick={handleReset}>Clear</button>
      </div>
      <div className="sidebar__price-range">
        <header>Price</header>
        <input
          type="range"
          list="markers"
          onChange={(e) => {
            dispatch({
              type: "FILTER_BY_PRICE_RANGE",
              payload: e.target.value,
            });
            console.log(e.target.value);
          }}
        />
        <datalist id="markers">
          <option value="0" label="0"></option>
          <option value="25" label="25"></option>
          <option value="50" label="50"></option>
          <option value="75" label="75"></option>
          <option value="100" label="100"></option>
        </datalist>
      </div>
      <div className="sidebar__categories">
        <header>Categories</header>
        <div className="sidebar__checkbox-container">
          <input
            id="candy"
            type="checkbox"
            checked={state.category === "candy"}
            name="rating-candy"
            onChange={(e) =>
              dispatch({ type: "FILTER_BY_CATEGORY", payload: "candy" })
            }
          />
          <label htmlFor="candy">Candies</label>
        </div>
        <div className="sidebar__checkbox-container">
          <input
            id="doughnuts"
            type="checkbox"
            checked={state.category === "doughnuts"}
            name="doughnuts"
            onChange={(e) =>
              dispatch({ type: "FILTER_BY_CATEGORY", payload: "doughnuts" })
            }
          />
          <label htmlFor="doughnuts">Doughnuts</label>
        </div>
        <div className="sidebar__checkbox-container">
          <input
            id="cupcakes"
            type="checkbox"
            checked={state.category === "cupcakes"}
            name="cupcakes"
            onChange={(e) =>
              dispatch({ type: "FILTER_BY_CATEGORY", payload: "cupcakes" })
            }
          />
          <label htmlFor="cupcakes">Cupcakes</label>
        </div>
      </div>

      <div className="sidebar__rating flex">
        <header>Rating</header>
        <div className="sidebar__checkbox-container">
          <input
            id="rating-4"
            type="checkbox"
            checked={state.rating === 4}
            name="rating-4"
            onChange={(e) => dispatch({ type: "FILTER_BY_RATING", payload: 4 })}
          />
          <label htmlFor="rating-4">
            4 <AiFillStar className="fill__primary" /> & above
          </label>
        </div>
        <div className="sidebar__checkbox-container">
          <input
            id="rating-3"
            type="checkbox"
            checked={state.rating === 3}
            name="rating-3"
            onChange={(e) => dispatch({ type: "FILTER_BY_RATING", payload: 3 })}
          />
          <label htmlFor="rating-3">
            3 <AiFillStar className="fill__primary" /> & above
          </label>
        </div>
        <div className="sidebar__checkbox-container">
          <input
            id="rating-2"
            type="checkbox"
            checked={state.rating === 2}
            name="rating-2"
            onChange={(e) => dispatch({ type: "FILTER_BY_RATING", payload: 2 })}
          />
          <label htmlFor="rating-2">
            2 <AiFillStar className="fill__primary" /> & above
          </label>
        </div>
        <div className="sidebar__checkbox-container">
          <input
            id="rating-1"
            type="checkbox"
            checked={state.rating === 1}
            name="rating-1"
            onChange={(e) => dispatch({ type: "FILTER_BY_RATING", payload: 1 })}
          />
          <label htmlFor="rating-1">
            1 <AiFillStar className="fill__primary" /> & above
          </label>
        </div>
      </div>
      <div className="sidebar__sort">
        <header>Sort Price </header>
        <div className="sidebar__sort-container flex">
          <div className="sidebar__sort-body">
            <input
              type="radio"
              checked={state.sortHighToLow === true}
              onChange={(e) =>
                dispatch({ type: "SORT_BY_PRICE", payload: true })
              }
            />
            <label htmlFor=""> High To Low</label>
          </div>

          <div className="sidebar__sort-body">
            <input
              checked={state.sortHighToLow === false}
              type="radio"
              name="sortPrice"
              onChange={(e) =>
                dispatch({ type: "SORT_BY_PRICE", payload: false })
              }
            />
            <label htmlFor=""> Low to High</label>
          </div>
        </div>
      </div>

      {/* <label htmlFor="search">Search</label> */}
      {/* <input
        id="search"
        value={state.searchQuery}
        type="text"
        onChange={(e) => dispatch({ type: "SEARCH", payload: e.target.value })}
      /> */}
    </div>
  );
};
