export const cartReducer = (state, action) => {
  switch (action.type) {
    case "CART_LOADING": {
      return {
        ...state,
        loading: true,
      };
    }
    case "FETCH_CART": {
      return {
        ...state,
        cart: action.payload,
        loading: false,
      };
    }
    case "ADD_TO_CART":
      return {
        ...state,
        cart: [...state.cart, action.payload],
        loading: false,
      };
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter(({ _id }) => _id !== action.payload),
        loading: false,
      };
    case "UPDATE_QUANTITY":
      return {
        ...state,
        cart: state.cart.map((item) => {
          if (item._id === action.payload.id) {
            item.quantity = action.payload.qty;
          }
          return item;
        }),
        loading: false,
      };
    default:
      return state;
  }
};
