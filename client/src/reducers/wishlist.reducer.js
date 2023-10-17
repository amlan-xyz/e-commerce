export const wishlistReducer = (state, action) => {
  switch (action.type) {
    case "WISHLIST_LOADING":
      return {
        ...state,
        loading: true,
      };
    case "ADD_TO_WISHLIST":
      return {
        ...state,
        wishlist: [...state.wishlist, action.payload],
        loading: false,
      };
    case "FETCH_WISHLIST":
      return {
        ...state,
        wishlist: action.payload,
        loading: false,
      };
    case "REMOVE_FROM_WISHLIST":
      return {
        ...state,
        wishlist: state.wishlist.filter(({ _id }) => _id !== action.payload.id),
        loading: false,
      };
    default:
      return state;
  }
};
