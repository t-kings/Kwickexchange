const initialState = {
  isLoading: false,
  giftCardDetails: {},
  currentGiftCardTrade: {},
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
    case "PROCESS_GIFT_CARD":
      return {
        ...state,
        giftCardDetails: action.data,
      };
    case "CURRENT_GIFT_CARD_TRADE":
      return {
        ...state,
        currentGiftCardTrade: action.data,
      };
    default:
      return state;
  }
};
export default tradeReducer;
