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

export const processGiftCard = (payload) => {
  return async (dispatch, getState) => {
    try {
      if (payload.total > 0) {
        dispatch({ type: "PROCESS_GIFT_CARD", data: payload });
      } else {
        dispatch({
          type: "SHOW_NOTIFICATION",
          data: {
            type: "Gift Card",
            isSuccess: false,
            message: "Total cannot be 0",
          },
        });
        setTimeout(() => {
          dispatch({
            type: "CLEAR_NOTIFICATION",
          });
        }, 5000);
      }
    } catch (error) {}
  };
};

export const startGiftCardTrade = (
  giftcard_id,
  currency,
  card_type,
  denomination,
  quantity
) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: "TRADE_LOADING" });
      const res = await axios.post(
        apiUrl + "transaction/giftcard/sell/initiate",
        {
          giftcard_id,
          currency,
          card_type,
          denomination,
          quantity,
        },
        {
          headers: {
            Accept: "application/json",
            Authorization: "Bearer " + getState().auth.accessToken,
          },
        }
      );
      if (res.status === 200) {
        dispatch({ type: "CURRENT_GIFT_CARD_TRADE", data: res.data.data });
        dispatch({
          type: "SHOW_NOTIFICATION",
          data: {
            type: "Trade",
            isSuccess: true,
            message: "Trade Started",
          },
        });
        setTimeout(() => {
          dispatch({
            type: "CLEAR_NOTIFICATION",
          });
        }, 5000);
        return true;
      }
      dispatch({ type: "CLEAR_TRADE_LOADING" });
      return false;
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
      return false;
    }
  };
};

export const cancelTrade = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: "TRADE_LOADING" });
      const res = await axios.patch(
        apiUrl +
          "transaction/giftcard/sell/cancell/" +
          getState().trade.currentGiftCardTrade.id,
        {},
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
            message: "Trade Cancelled",
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
