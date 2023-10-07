export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        username: action.payload,
      };
    default:
      return state;
  }
};
