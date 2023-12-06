export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
        isLoggedIn: true,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
        isLoggedIn: false,
      };
    case "ADD_ADDRESS": {
      return {
        ...state,
        user: action.payload,
      };
    }
    case "REMOVE_ADDRESS": {
      return {
        ...state,
        user: action.payload,
      };
    }
    default:
      return state;
  }
};
