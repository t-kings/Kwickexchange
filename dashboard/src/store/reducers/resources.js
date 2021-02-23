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
  notificationSettings: [],
  notifications: [
    {
      read_status: false,
      _id: "",
      email: "",
      title: "",
      message: "",
    },
  ],
  allTradeHistory: {
    data: [],
    meta: {},
  },
  activeTradeHistory: {
    data: [],
    meta: {},
  },
  pendingTradeHistory: {
    data: [],
    meta: {},
  },
  cancelledTradeHistory: {
    data: [],
    meta: {},
  },
  completedTradeHistory: {
    data: [
      {
        status: "completed",
        email: "harrysjil@gmail.com",
        transaction_hash: "bbb2-2d70350341c7",
        type: "deposit",
        asset: "naira",
        amount_in_naira: "5000",
        amount: "5000",
        description: "Deposit 5000 naira to harrysjil@gmail.com",
        createdAt: "2021-01-29T13:51:21.798Z",
        can_cancell: false,
      },
      {
        status: "completed",
        email: "harrysjil@gmail.com",
        transaction_hash: "a7b2-2c41eac41103",
        type: "deposit",
        asset: "naira",
        amount_in_naira: "5000",
        amount: "5000",
        description: "Deposit 5000 naira to harrysjil@gmail.com",
        createdAt: "2021-01-29T14:39:31.558Z",
        can_cancell: false,
      },
      {
        status: "completed",
        email: "harrysjil@gmail.com",
        transaction_hash: "b466-bea2a6c854fc",
        type: "deposit",
        asset: "naira",
        amount_in_naira: "5000",
        amount: "5000",
        description: "Deposit 5000 naira to harrysjil@gmail.com",
        createdAt: "2021-01-29T14:41:38.527Z",
        can_cancell: false,
      },
    ],
    meta: {
      total: 3,
      last_page: 1,
      first_page: 1,
      current_page: 1,
      items_per_page: 5,
      next_page: null,
      previous_page: null,
      next_url: null,
      previous_url: null,
    },
  },
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
    case "ALL_TRADE_HISTORY":
      return {
        ...state,
        allTradeHistory: action.data,
      };
    case "ACTIVE_TRADE_HISTORY":
      return {
        ...state,
        activeTradeHistory: action.data,
      };
    case "PENDING_TRADE_HISTORY":
      return {
        ...state,
        pendingTradeHistory: action.data,
      };
    case "CANCELLED_TRADE_HISTORY":
      return {
        ...state,
        cancelledTradeHistory: action.data,
      };
    case "COMPLETED_TRADE_HISTORY":
      return {
        ...state,
        // completedTradeHistory: action.data,
      };
    default:
      return state;
  }
};
export default resourcesReducer;
