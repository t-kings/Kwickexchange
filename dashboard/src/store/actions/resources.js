import { apiUrl } from "../../helpers/config";
import axios from "axios";
export const getResources = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: "RESOURCES_LOADING" });
      await getBalances(dispatch, getState);
      await getTransactionCount(dispatch, getState);
      await getCurrencyList(dispatch, getState);
      dispatch({ type: "KILL_RESOURCES_LOADING" });
    } catch (error) {
      console.log(error);
    }
  };
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
