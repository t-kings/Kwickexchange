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
  notificationSettings: [
    {
      app_notification: true,
      email_notification: true,
      sms_notification: false,
      email: "",
      type: "Coin Incoming Unconfirmed",
      slug: "coin_incoming_unonfirmed",
    },
  ],
  notifications: [
    {
      read_status: false,
      _id: "",
      email: "",
      title: "",
      message: "",
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
    case "NOTIFICATIONS_SETTINGS_LIST":
      return {
        ...state,
        notificationSettings: action.data,
      };
    case "CHANGE_NOTIFICATION":
      const notificationSettings = state.notificationSettings;
      notificationSettings[action.idx][action.key] = action.value;
      return {
        ...state,
        notificationSettings,
      };
    case "NOTIFICATIONS_LIST":
      return {
        ...state,
        notifications: action.data,
      };
    default:
      return state;
  }
};
export default resourcesReducer;
