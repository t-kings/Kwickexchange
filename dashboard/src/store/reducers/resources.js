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
  currencyList: [],
  notificationSettings: [],
  notifications: [],
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
    data: [],
    meta: {},
  },
  bitcoinBuyHistory: {
    data: [],
    meta: {},
  },
  bitcoinSellHistory: {
    data: [],
    meta: {},
  },
  bitcoinBuyRate: {},
  bitcoinSellRate: {},
  giftCards: {
    data: [],
    meta: {},
  },
  giftCardsHistory: {
    data: [],
    meta: {},
  },
  bitcoinDepositAddresses: {
    data: [],
    meta: {},
  },
  bitcoinDepositAddress: {},
  bitcoinTransactionList: {
    data: [],
    meta: {},
  },
  bitcoinWithdrawalFee: {},
  banks: {
    data: [],
    meta: {},
  },
  nairaTransactions: {
    data: [],
    meta: {},
  },
  nairaWithdrawalFee: {},
  userBanks: {
    data: [],
    meta: {},
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
        completedTradeHistory: action.data,
      };
    case "BITCOIN_BUY_HISTORY":
      return {
        ...state,
        bitcoinBuyHistory: action.data,
      };
    case "BITCOIN_SELL_HISTORY":
      return {
        ...state,
        bitcoinSellHistory: action.data,
      };
    case "BITCOIN_BUY_RATE":
      return {
        ...state,
        bitcoinBuyRate: action.data,
      };
    case "BITCOIN_SELL_RATE":
      return {
        ...state,
        bitcoinSellRate: action.data,
      };
    case "GIFT_CARDS_LIST":
      return {
        ...state,
        giftCards: action.data,
      };
    case "GIFT_CARDS_TRADE_HISTORY":
      return {
        ...state,
        giftCardsHistory: action.data,
      };

    case "BITCOIN_DEPOSIT_ADDRESS":
      return {
        ...state,
        bitcoinDepositAddress: action.data,
      };

    case "BITCOIN_DEPOSIT_ADDRESSES":
      return {
        ...state,
        bitcoinDepositAddresses: action.data,
      };
    case "BITCOIN_TRANSACTIONS_LIST":
      return {
        ...state,
        bitcoinTransactionList: action.data,
      };
    case "BITCOIN_WITHDRAWAL_FEE":
      return {
        ...state,
        bitcoinWithdrawalFee: action.data,
      };

    case "BANKS":
      return {
        ...state,
        banks: action.data,
      };
    case "NAIRA_TRANSACTIONS_LIST":
      return {
        ...state,
        nairaTransactions: action.data,
      };
    case "NAIRA_WITHDRAWAL_FEE":
      return {
        ...state,
        nairaWithdrawalFee: action.data,
      };
    case "USER_NAIRA_BANKS":
      return {
        ...state,
        userBanks: action.data,
      };
    default:
      return state;
  }
};
export default resourcesReducer;
