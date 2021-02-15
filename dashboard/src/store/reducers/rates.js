const initialState = {
  bitcoin: {
    buy: {},
    sell: {},
  },
  giftCards: { sell: [] },
};

const ratesReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
export default ratesReducer;
