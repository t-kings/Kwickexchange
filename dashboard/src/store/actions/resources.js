import { apiUrl } from "../../helpers/config";
import axios from "axios";
export const getResources = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: "RESOURCES_LOADING" });
      await getBalances(dispatch, getState);
      await getTransactionCount(dispatch, getState);
      await getCurrencyList(dispatch, getState);
      await getNotificationSettingsList(dispatch, getState);
      await getNotifications(dispatch, getState);
      await getAllTradeHistory(dispatch, getState);
      await getActiveTradeHistory(dispatch, getState);
      await getPendingTradeHistory(dispatch, getState);
      await getCancelledTradeHistory(dispatch, getState);
      await getCompletedTradeHistory(dispatch, getState);
      await getBitcoinSellRate(dispatch, getState);
      await getBitcoinBuyRate(dispatch, getState);
      await getBitcoinBuyHistory(dispatch, getState);
      await getBitcoinSellHistory(dispatch, getState);
      await getGiftCards(dispatch, getState);
      await getGiftCardsTradeHistory(dispatch, getState);
      await getBitcoinDepositAddress(dispatch, getState);
      await getBitcoinDepositAddresses(dispatch, getState);
      await getBitcoinTransactions(dispatch, getState);
      await getBitcoinWithdrawalFee(dispatch, getState);
      await getBanks(dispatch, getState);
      await getNairaTransactions(dispatch, getState);
      await getNairaWithdrawalFee(dispatch, getState);
      await getUserBanks(dispatch, getState);
      dispatch({ type: "KILL_RESOURCES_LOADING" });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getHistories = async (dispatch, getState) => {
  try {
    await getTransactionCount(dispatch, getState);
    await getAllTradeHistory(dispatch, getState);
    await getActiveTradeHistory(dispatch, getState);
    await getNairaTransactions(dispatch, getState);
    await getPendingTradeHistory(dispatch, getState);
    await getCancelledTradeHistory(dispatch, getState);
    await getCompletedTradeHistory(dispatch, getState);
    await getBitcoinBuyRate(dispatch, getState);
    await getBitcoinBuyHistory(dispatch, getState);
    await getBitcoinTransactions(dispatch, getState);
    await getBitcoinSellHistory(dispatch, getState);
    await getGiftCardsTradeHistory(dispatch, getState);
  } catch (error) {
    console.log(error);
  }
};

export const getBalances = async (dispatch, getState) => {
  try {
    const res = await axios.get(apiUrl + "dashboard/walletbalance", {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + getState().auth.accessToken,
      },
    });
    if (res.status === 200) {
      dispatch({ type: "USER_BALANCES", data: res.data.data });
    }
    return true;
  } catch (err) {
    return true;
  }
};

export const getTransactionCount = async (dispatch, getState) => {
  try {
    const res = await axios.get(apiUrl + "dashboard/transaction/count", {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + getState().auth.accessToken,
      },
    });
    if (res.status === 200) {
      dispatch({ type: "USER_TRANSACTION_COUNT", data: res.data.data });
    }
    return true;
  } catch (err) {
    return true;
  }
};

export const getCurrencyList = async (dispatch, getState) => {
  try {
    const res = await axios.get(apiUrl + "settings/currency", {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + getState().auth.accessToken,
      },
    });
    if (res.status === 200) {
      dispatch({ type: "CURRENCY_LIST", data: res.data.data });
    }
    return true;
  } catch (err) {
    return true;
  }
};

export const getNotificationSettingsList = async (dispatch, getState) => {
  try {
    const res = await axios.get(apiUrl + "settings/notification", {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + getState().auth.accessToken,
      },
    });
    if (res.status === 200) {
      dispatch({ type: "NOTIFICATIONS_SETTINGS_LIST", data: res.data.data });
    }
    return true;
  } catch (err) {
    return true;
  }
};

export const getNotifications = async (dispatch, getState) => {
  try {
    const res = await axios.get(apiUrl + "notification/all", {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + getState().auth.accessToken,
      },
    });
    if (res.status === 200) {
      dispatch({ type: "NOTIFICATIONS_LIST", data: res.data.data });
    }
    return true;
  } catch (err) {
    return true;
  }
};

export const getAllTradeHistory = async (dispatch, getState) => {
  try {
    const res = await axios.get(apiUrl + "trade/history/all", {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + getState().auth.accessToken,
      },
    });
    if (res.status === 200) {
      dispatch({ type: "ALL_TRADE_HISTORY", data: res.data.data });
    }
    return true;
  } catch (err) {
    return true;
  }
};

export const getActiveTradeHistory = async (dispatch, getState) => {
  try {
    const res = await axios.get(apiUrl + "trade/history/active", {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + getState().auth.accessToken,
      },
    });
    if (res.status === 200) {
      dispatch({ type: "ACTIVE_TRADE_HISTORY", data: res.data.data });
    }
    return true;
  } catch (err) {
    return true;
  }
};

export const getPendingTradeHistory = async (dispatch, getState) => {
  try {
    const res = await axios.get(apiUrl + "trade/history/pending", {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + getState().auth.accessToken,
      },
    });
    if (res.status === 200) {
      dispatch({ type: "PENDING_TRADE_HISTORY", data: res.data.data });
    }
    return true;
  } catch (err) {
    return true;
  }
};

export const getCancelledTradeHistory = async (dispatch, getState) => {
  try {
    const res = await axios.get(apiUrl + "trade/history/cancelled", {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + getState().auth.accessToken,
      },
    });
    if (res.status === 200) {
      dispatch({ type: "CANCELLED_TRADE_HISTORY", data: res.data.data });
    }
    return true;
  } catch (err) {
    return true;
  }
};

export const getCompletedTradeHistory = async (dispatch, getState) => {
  try {
    const res = await axios.get(apiUrl + "trade/history/completed", {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + getState().auth.accessToken,
      },
    });
    if (res.status === 200) {
      dispatch({ type: "COMPLETED_TRADE_HISTORY", data: res.data.data });
    }
    return true;
  } catch (err) {
    return true;
  }
};

export const getBitcoinSellRate = async (dispatch, getState) => {
  try {
    const res = await axios.get(apiUrl + "transaction/bitcoin/rate/sell", {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + getState().auth.accessToken,
      },
    });
    if (res.status === 200) {
      dispatch({ type: "BITCOIN_SELL_RATE", data: res.data.data });
    }
    return true;
  } catch (err) {
    return true;
  }
};

export const getBitcoinBuyRate = async (dispatch, getState) => {
  try {
    const res = await axios.get(apiUrl + "transaction/bitcoin/rate/buy", {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + getState().auth.accessToken,
      },
    });
    if (res.status === 200) {
      dispatch({ type: "BITCOIN_BUY_RATE", data: res.data.data });
    }
    return true;
  } catch (err) {
    return true;
  }
};

export const getBitcoinSellHistory = async (dispatch, getState) => {
  try {
    const res = await axios.get(apiUrl + "transaction/bitcoin/list/sell", {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + getState().auth.accessToken,
      },
    });
    if (res.status === 200) {
      dispatch({ type: "BITCOIN_SELL_HISTORY", data: res.data.data });
    }
    return true;
  } catch (err) {
    return true;
  }
};

export const getBitcoinBuyHistory = async (dispatch, getState) => {
  try {
    const res = await axios.get(apiUrl + "transaction/bitcoin/list/buy", {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + getState().auth.accessToken,
      },
    });
    if (res.status === 200) {
      dispatch({ type: "BITCOIN_BUY_HISTORY", data: res.data.data });
    }
    return true;
  } catch (err) {
    return true;
  }
};
export const getGiftCards = async (dispatch, getState) => {
  try {
    const res = await axios.get(apiUrl + "transaction/giftcard/all", {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + getState().auth.accessToken,
      },
    });
    if (res.status === 200) {
      dispatch({ type: "GIFT_CARDS_LIST", data: res.data.data });
    }
    return true;
  } catch (err) {
    return true;
  }
};

export const getGiftCardsTradeHistory = async (dispatch, getState) => {
  try {
    const res = await axios.get(apiUrl + "transaction/giftcard/list/sell", {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + getState().auth.accessToken,
      },
    });
    if (res.status === 200) {
      dispatch({ type: "GIFT_CARDS_TRADE_HISTORY", data: res.data.data });
    }
    return true;
  } catch (err) {
    return true;
  }
};

export const getBitcoinDepositAddress = async (dispatch, getState) => {
  try {
    const res = await axios.get(apiUrl + "wallet/bitcoin/deposit", {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + getState().auth.accessToken,
      },
    });
    if (res.status === 200) {
      dispatch({ type: "BITCOIN_DEPOSIT_ADDRESS", data: res.data.data });
    }
    return true;
  } catch (err) {
    return true;
  }
};

export const getBitcoinDepositAddresses = async (dispatch, getState) => {
  try {
    const res = await axios.get(apiUrl + "wallet/bitcoin/list", {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + getState().auth.accessToken,
      },
    });
    if (res.status === 200) {
      dispatch({ type: "BITCOIN_DEPOSIT_ADDRESSES", data: res.data.data });
    }
    return true;
  } catch (err) {
    return true;
  }
};

export const getBitcoinTransactions = async (dispatch, getState) => {
  try {
    const res = await axios.get(apiUrl + "wallet/bitcoin/history", {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + getState().auth.accessToken,
      },
    });
    if (res.status === 200) {
      dispatch({ type: "BITCOIN_TRANSACTIONS_LIST", data: res.data.data });
    }
    return true;
  } catch (err) {
    return true;
  }
};

export const getBitcoinWithdrawalFee = async (dispatch, getState) => {
  try {
    const res = await axios.get(apiUrl + "wallet/bitcoin/fee", {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + getState().auth.accessToken,
      },
    });
    if (res.status === 200) {
      dispatch({ type: "BITCOIN_WITHDRAWAL_FEE", data: res.data.data });
    }
    return true;
  } catch (err) {
    return true;
  }
};

export const getBanks = async (dispatch, getState) => {
  try {
    const res = await axios.get(apiUrl + "wallet/naira/banklists", {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + getState().auth.accessToken,
      },
    });
    if (res.status === 200) {
      dispatch({ type: "BANKS", data: res.data.data });
    }
    return true;
  } catch (err) {
    return true;
  }
};

export const getNairaTransactions = async (dispatch, getState) => {
  try {
    const res = await axios.get(apiUrl + "wallet/naira/history", {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + getState().auth.accessToken,
      },
    });
    if (res.status === 200) {
      dispatch({ type: "NAIRA_TRANSACTIONS_LIST", data: res.data.data });
    }
    return true;
  } catch (err) {
    return true;
  }
};

export const getNairaWithdrawalFee = async (dispatch, getState) => {
  try {
    const res = await axios.get(apiUrl + "wallet/naira/fee", {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + getState().auth.accessToken,
      },
    });
    if (res.status === 200) {
      dispatch({ type: "NAIRA_WITHDRAWAL_FEE", data: res.data.data });
    }
    return true;
  } catch (err) {
    return true;
  }
};

export const getUserBanks = async (dispatch, getState) => {
  try {
    const res = await axios.get(apiUrl + "wallet/naira/list", {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + getState().auth.accessToken,
      },
    });
    if (res.status === 200) {
      dispatch({ type: "USER_NAIRA_BANKS", data: res.data.data });
    }
    return true;
  } catch (err) {
    return true;
  }
};
