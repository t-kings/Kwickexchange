const initialState = {
  isLoading: false,
};

const tradeReducer = (state = initialState, action) => {
  switch (action.type) {
    case "TRADE_LOADING":
      return {
        ...state,
        isLoading: true,
      };
    case "CLEAR_TRADE_LOADING":
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
};
export default tradeReducer;
