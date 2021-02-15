import { apiUrl } from "../../helpers/config";
import axios from "axios";

export const getBitcoinRate = () => {
  return async (dispatch, getState) => {
    try {
      const res = await axios.get(apiUrl + "/misc/bitcoin-rates");
      if (res.status === 200) {
        return res.data.data;
      }
      return [];
    } catch (e) {
      return [];
    }
  };
};

export const logout = () => {
  return (dispatch, getState) => {
    dispatch({ type: "LOGOUT" });
    dispatch({
      type: "SHOW_NOTIFICATION",
      data: {
        type: "Logout",
        isSuccess: true,
        message: "Logout Successful",
      },
    });
    setTimeout(() => {
      dispatch({
        type: "CLEAR_NOTIFICATION",
      });
    }, 5000);
  };
};

export const getGiftCardsRate = () => {
  return async (dispatch, getState) => {
    try {
      const res = await axios.get(apiUrl + "/misc/giftCard-rates");
      if (res.status === 200) {
        return res.data.data;
      }
      return [];
    } catch (e) {
      return [];
    }
  };
};
