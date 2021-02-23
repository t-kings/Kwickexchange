const initialState = {
  balance: {
    naira: "0.00",
    bitcoin: "0.00000000",
    bitcoin_in_fiat: 0,
    fiat: {
      symbol: "",
      name: "",
      slug: "",
    },
  },
  transactionCount: {
    count: 0,
    meta: "",
  },
  isLoading: true,
  currencyList: [
    {
      fiat: "US Dollar",
      fiat_slug: "dollar",
      symbol: "$",
      value_in_naira: 0,
    },
  ],
};

const resourcesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "RESOURCES_LOADING":
      return {
        ...state,
        isLoading: true,
      };
    case "KILL_RESOURCES_LOADING":
      return {
        ...state,
        isLoading: false,
      };
    case "USER_BALANCES":
      return {
        ...state,
        balance: action.data,
      };
    case "USER_TRANSACTION_COUNT":
      return {
        ...state,
        transactionCount: action.data,
      };
    case "CURRENCY_LIST":
      return {
        ...state,
        currencyList: action.data,
      };
    default:
      return state;
  }
};
export default resourcesReducer;
