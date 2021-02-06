export default (state, action) => {
  switch (action.type) {
    case "GET_TESTIMONIALS":
      return {
        ...state,
        testimonials: action.payload,
        loading: false,
      };
    case "SET_LOADING":
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};
