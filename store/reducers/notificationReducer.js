export default (state, action) => {
  switch (action.type) {
    case "SHOW_NOTIFICATION":
      return {
        ...state,
        show: true,
        ...action.payload,
      };
    case "CLEAR_NOTIFICATION":
      return {
        ...state,
        show: false,
      };
    default:
      return state;
  }
};
