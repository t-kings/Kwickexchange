const bitcoinReducer =(state, action) => {
  switch (action.type) {
    case "GET_BITCOIN_RATE":
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
export default bitcoinReducer;