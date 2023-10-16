export const cartReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_CART": {
      return {
        ...state,
        cart: action.payload,
      };
    }
    case "ADD_TO_CART":
      return {
        ...state,
        cart: [...state.cart, action.payload],
      };
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter(({ _id }) => _id !== action.payload),
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
      };
    default:
      return state;
  }
};
