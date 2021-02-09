const giftCardReducer = (state, action) => {
  switch (action.type) {
    case "GET_GIFT_CARD_RATE":
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
export default giftCardReducer;
