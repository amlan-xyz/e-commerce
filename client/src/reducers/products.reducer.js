export const productsReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_PRODUCTS":
      return {
        ...state,
        products: action.payload,
        filteredProducts: action.payload,
      };
    case "SEARCH":
      return {
        ...state,
        searchQuery: action.payload,
        filteredProducts: state.products.filter(({ name }) =>
          name.toLowerCase().includes(action.payload.toLowerCase())
        ),
      };
    case "SORT_BY_PRICE":
      return {
        ...state,
        sortHighToLow: action.payload,
        filteredProducts:
          action.payload === true
            ? state.filteredProducts.sort((a, b) => b.price - a.price)
            : state.filteredProducts.sort((a, b) => a.price - b.price),
      };
    case "FILTER_BY_PRICE_RANGE":
      return {
        ...state,
        priceRange: action.payload,
        filteredProducts: state.products.filter(
          ({ price }) => price >= action.payload
        ),
      };
    case "FILTER_BY_RATING":
      return {
        ...state,
        rating: action.payload,
        filteredProducts: state.products.filter(
          ({ rating }) => rating >= action.payload
        ),
      };
    case "FILTER_BY_CATEGORY":
      return {
        ...state,
        category: action.payload,
        filteredProducts: state.products.filter(
          ({ category }) => category === action.payload
        ),
      };
    case "RESET":
      return {
        ...state,
        filteredProducts: state.products,
        searchQuery: "",
        sortHighToLow: null,
        priceRange: 0,
        rating: 0,
        category: "",
      };
    default:
      return state;
  }
};
