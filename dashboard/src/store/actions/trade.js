import { apiUrl } from "../../helpers/config";
import axios from "axios";
export const buyBitcoin = (payload) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: "TRADE_LOADING" });
      const res = await axios.post(
        apiUrl + "transaction/bitcoin/buy",
        payload,
        {
          headers: {
            Accept: "application/json",
            Authorization: "Bearer " + getState().auth.accessToken,
          },
        }
      );
      if (res.status === 200) {
        dispatch({
          type: "SHOW_NOTIFICATION",
          data: {
            type: "Trade",
            isSuccess: true,
            message: "Bitcoin transaction successful",
          },
        });
        setTimeout(() => {
          dispatch({
            type: "CLEAR_NOTIFICATION",
          });
        }, 5000);
      }
      dispatch({ type: "CLEAR_TRADE_LOADING" });
    } catch (error) {
      console.log(error.response.data);
      dispatch({
        type: "SHOW_NOTIFICATION",
        data: {
          type: "Trade",
          isSuccess: false,
          message: "Error!, please try again",
        },
      });
      setTimeout(() => {
        dispatch({
          type: "CLEAR_NOTIFICATION",
        });
      }, 5000);
      dispatch({ type: "CLEAR_TRADE_LOADING" });
    }
  };
};

export const sellBitcoin = (payload) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: "TRADE_LOADING" });
      const res = await axios.post(
        apiUrl + "transaction/bitcoin/sell",
        payload,
        {
          headers: {
            Accept: "application/json",
            Authorization: "Bearer " + getState().auth.accessToken,
          },
        }
      );
      if (res.status === 200) {
        dispatch({
          type: "SHOW_NOTIFICATION",
          data: {
            type: "Trade",
            isSuccess: true,
            message: "Bitcoin transaction successful",
          },
        });
        setTimeout(() => {
          dispatch({
            type: "CLEAR_NOTIFICATION",
          });
        }, 5000);
      }
      dispatch({ type: "CLEAR_TRADE_LOADING" });
    } catch (error) {
      dispatch({
        type: "SHOW_NOTIFICATION",
        data: {
          type: "Trade",
          isSuccess: false,
          message: "Error!, please try again",
        },
      });
      setTimeout(() => {
        dispatch({
          type: "CLEAR_NOTIFICATION",
        });
      }, 5000);
      dispatch({ type: "CLEAR_TRADE_LOADING" });
    }
  };
};
