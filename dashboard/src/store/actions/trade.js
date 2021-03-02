import { apiUrl } from "../../helpers/config";
import axios from "axios";
import {
  getBalances,
  getBitcoinDepositAddresses,
  getUserBanks,
  getHistories,
} from "./resources";
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
        await getBalances(dispatch, getState);
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
        dispatch({ type: "CLEAR_TRADE_LOADING" });
        getHistories(dispatch, getState);
        return true;
      }
      dispatch({ type: "CLEAR_TRADE_LOADING" });
      return false;
    } catch (error) {
      if (error?.response?.data?.data?.error?.error) {
        dispatch({
          type: "SHOW_NOTIFICATION",
          data: {
            type: "Trade",
            isSuccess: false,
            message: JSON.stringify(error?.response?.data?.data?.error?.error),
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
      if (error?.response?.status === 402) {
        dispatch({
          type: "SHOW_NOTIFICATION",
          data: {
            type: "Trade",
            isSuccess: false,
            message: error.response.data.message,
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
        await getBalances(dispatch, getState);
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
        getHistories(dispatch, getState);
        dispatch({ type: "CLEAR_TRADE_LOADING" });
        return true;
      }
      dispatch({ type: "CLEAR_TRADE_LOADING" });
      return false;
    } catch (error) {
      if (error?.response?.data?.data?.error?.error) {
        dispatch({
          type: "SHOW_NOTIFICATION",
          data: {
            type: "Trade",
            isSuccess: false,
            message: JSON.stringify(error?.response?.data?.data?.error?.error),
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
      if (error?.response?.status === 402) {
        dispatch({
          type: "SHOW_NOTIFICATION",
          data: {
            type: "Trade",
            isSuccess: false,
            message: error.response.data.message,
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
          denomination: denomination.toString(),
          quantity: quantity.toString(),
        },
        {
          headers: {
            Accept: "application/json",
            Authorization: "Bearer " + getState().auth.accessToken,
          },
        }
      );
      if (res.status === 201) {
        dispatch({ type: "CURRENT_GIFT_CARD_TRADE", data: res.data.data });
        return true;
      }
      dispatch({ type: "CLEAR_TRADE_LOADING" });
      return false;
    } catch (error) {
      // console.log(error.response?.data);
      if (error?.response?.status === 400) {
        dispatch({
          type: "SHOW_NOTIFICATION",
          data: {
            type: "Trade",
            isSuccess: false,
            message: error.response.data.message,
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

export const cancelTrade = (id) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: "TRADE_LOADING" });
      const res = await axios.patch(
        apiUrl + "transaction/giftcard/sell/cancell/" + id,
        {},
        {
          headers: {
            Accept: "application/json",
            Authorization: "Bearer " + getState().auth.accessToken,
          },
        }
      );
      if (res.status === 200) {
        await getHistories(dispatch, getState);
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
        dispatch({ type: "CLEAR_TRADE_LOADING" });
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

export const withdrawBTC = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: "TRADE_LOADING" });
      const res = await axios.post(
        apiUrl + "wallet/bitcoin/withdraw",
        {
          ...getState().trade.btcWithdrawal,
          amount: getState().trade.btcWithdrawal.btc,
        },
        {
          headers: {
            Accept: "application/json",
            Authorization: "Bearer " + getState().auth.accessToken,
          },
        }
      );
      if (res.status === 200) {
        await getBalances(dispatch, getState);
        dispatch({
          type: "SHOW_NOTIFICATION",
          data: {
            type: "Wallet",
            isSuccess: true,
            message: "Bitcoin withdrawal successful",
          },
        });
        setTimeout(() => {
          dispatch({
            type: "CLEAR_NOTIFICATION",
          });
        }, 5000);
        dispatch({ type: "CLEAR_TRADE_LOADING" });
        getHistories(dispatch, getState);
        return true;
      }
      dispatch({ type: "CLEAR_TRADE_LOADING" });
      return false;
    } catch (error) {
      if (error?.response?.status == 400) {
        dispatch({
          type: "SHOW_NOTIFICATION",
          data: {
            type: "Wallet",
            isSuccess: false,
            message: "Account not verified",
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
      if (error?.response?.status == 403) {
        dispatch({
          type: "SHOW_NOTIFICATION",
          data: {
            type: "Wallet",
            isSuccess: false,
            message: "Incorrect password",
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
      dispatch({
        type: "SHOW_NOTIFICATION",
        data: {
          type: "Wallet",
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

export const emailBTC = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: "TRADE_LOADING" });
      const res = await axios.post(
        apiUrl + "wallet/bitcoin/transfer",
        {
          ...getState().trade.btcWithdrawal,
          amount: getState().trade.btcWithdrawal.btc,
        },
        {
          headers: {
            Accept: "application/json",
            Authorization: "Bearer " + getState().auth.accessToken,
          },
        }
      );
      if (res.status === 200) {
        await getBalances(dispatch, getState);
        dispatch({
          type: "SHOW_NOTIFICATION",
          data: {
            type: "Wallet",
            isSuccess: true,
            message: "Bitcoin transferred successful",
          },
        });
        setTimeout(() => {
          dispatch({
            type: "CLEAR_NOTIFICATION",
          });
        }, 5000);
        dispatch({ type: "CLEAR_TRADE_LOADING" });
        getHistories(dispatch, getState);
        return true;
      }
      dispatch({ type: "CLEAR_TRADE_LOADING" });
      return false;
    } catch (error) {
      if (error?.response?.status == 403) {
        dispatch({
          type: "SHOW_NOTIFICATION",
          data: {
            type: "Wallet",
            isSuccess: false,
            message: "Incorrect password",
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
      if (error?.response?.status == 400) {
        dispatch({
          type: "SHOW_NOTIFICATION",
          data: {
            type: "Wallet",
            isSuccess: false,
            message: JSON.stringify(error.response.data.data),
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
      dispatch({
        type: "SHOW_NOTIFICATION",
        data: {
          type: "Wallet",
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

export const addBank = (payload) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: "TRADE_LOADING" });
      const res = await axios.post(apiUrl + "wallet/naira/addbank", payload, {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + getState().auth.accessToken,
        },
      });
      if (res.status === 200) {
        await getUserBanks(dispatch, getState);
        dispatch({
          type: "SHOW_NOTIFICATION",
          data: {
            type: "Bank Account",
            isSuccess: true,
            message: "Bank Account Added ",
          },
        });
        setTimeout(() => {
          dispatch({
            type: "CLEAR_NOTIFICATION",
          });
        }, 5000);
        dispatch({ type: "CLEAR_TRADE_LOADING" });
        return true;
      }
      dispatch({ type: "CLEAR_TRADE_LOADING" });
      return false;
    } catch (error) {
      if (error?.response?.status == 422) {
        dispatch({
          type: "SHOW_NOTIFICATION",
          data: {
            type: "Wallet",
            isSuccess: false,
            message: JSON.stringify(error.response.data.data),
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
      dispatch({
        type: "SHOW_NOTIFICATION",
        data: {
          type: "Bank Account",
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

export const deleteAccount = (id) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: "TRADE_LOADING" });
      const res = await axios.delete(apiUrl + "wallet/naira/removebank/" + id, {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + getState().auth.accessToken,
        },
      });
      if (res.status === 200) {
        await getUserBanks(dispatch, getState);
        dispatch({
          type: "SHOW_NOTIFICATION",
          data: {
            type: "Bank Account",
            isSuccess: true,
            message: "User account detail removed successfully",
          },
        });
        setTimeout(() => {
          dispatch({
            type: "CLEAR_NOTIFICATION",
          });
        }, 5000);
        dispatch({ type: "CLEAR_TRADE_LOADING" });
        return true;
      }
      dispatch({ type: "CLEAR_TRADE_LOADING" });
      return false;
    } catch (error) {
      // console.log(error.response.data);
      dispatch({
        type: "SHOW_NOTIFICATION",
        data: {
          type: "Bank Account",
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

export const withdrawNaira = (payload) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: "TRADE_LOADING" });
      const res = await axios.post(apiUrl + "wallet/naira/withdraw/", payload, {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + getState().auth.accessToken,
        },
      });
      if (res.status === 200) {
        await getBalances(dispatch, getState);
        dispatch({
          type: "SHOW_NOTIFICATION",
          data: {
            type: "Withdrawal",
            isSuccess: true,
            message: "Withdrawal Successful",
          },
        });
        setTimeout(() => {
          dispatch({
            type: "CLEAR_NOTIFICATION",
          });
        }, 5000);
        dispatch({ type: "CLEAR_TRADE_LOADING" });
        getHistories(dispatch, getState);
        return true;
      }
      dispatch({ type: "CLEAR_TRADE_LOADING" });
      return false;
    } catch (error) {
      dispatch({
        type: "SHOW_NOTIFICATION",
        data: {
          type: "Withdrawal",
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

export const transferNairaEmail = (payload) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: "TRADE_LOADING" });
      const res = await axios.post(apiUrl + "wallet/naira/transfer", payload, {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + getState().auth.accessToken,
        },
      });
      if (res.status === 200) {
        await getBalances(dispatch, getState);
        dispatch({
          type: "SHOW_NOTIFICATION",
          data: {
            type: "Naira Transfer",
            isSuccess: true,
            message: "Transfer Successful",
          },
        });
        setTimeout(() => {
          dispatch({
            type: "CLEAR_NOTIFICATION",
          });
        }, 5000);
        dispatch({ type: "CLEAR_TRADE_LOADING" });
        getHistories(dispatch, getState);
        return true;
      }
      dispatch({ type: "CLEAR_TRADE_LOADING" });
      return false;
    } catch (error) {
      if (error?.response?.status === 400) {
        dispatch({
          type: "SHOW_NOTIFICATION",
          data: {
            type: "Withdrawal",
            isSuccess: false,
            message: JSON.stringify(error?.response?.data?.data),
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
      dispatch({
        type: "SHOW_NOTIFICATION",
        data: {
          type: "Withdrawal",
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

export const generateAddress = () => async (dispatch, getState) => {
  try {
    dispatch({ type: "TRADE_LOADING" });
    const res = await axios.post(
      apiUrl + "wallet/bitcoin/generate",
      {},
      {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + getState().auth.accessToken,
        },
      }
    );
    if (res.status === 200) {
      dispatch({ type: "BITCOIN_DEPOSIT_ADDRESS", data: res.data.data });
      await getBitcoinDepositAddresses(dispatch, getState);
      dispatch({
        type: "SHOW_NOTIFICATION",
        data: {
          type: "Address",
          isSuccess: true,
          message: "New Address Created",
        },
      });
      setTimeout(() => {
        dispatch({
          type: "CLEAR_NOTIFICATION",
        });
      }, 5000);
    }
    dispatch({ type: "CLEAR_TRADE_LOADING" });
    return true;
  } catch (err) {
    dispatch({
      type: "SHOW_NOTIFICATION",
      data: {
        type: "Address",
        isSuccess: false,
        message: "Error, try again",
      },
    });
    setTimeout(() => {
      dispatch({
        type: "CLEAR_NOTIFICATION",
      });
    }, 5000);
    dispatch({ type: "CLEAR_TRADE_LOADING" });
    return true;
  }
};

export const depositNaira = (payload) => async (dispatch, getState) => {
  try {
    dispatch({ type: "TRADE_LOADING" });
    const res = await axios.post(apiUrl + "wallet/naira/deposit", payload, {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + getState().auth.accessToken,
      },
    });
    if (res.status === 200) {
      window.location.replace(res.data.data.pay_url);
    }
    dispatch({ type: "CLEAR_TRADE_LOADING" });
    return true;
  } catch (err) {
    if (err?.response?.data?.data) {
      dispatch({
        type: "SHOW_NOTIFICATION",
        data: {
          type: "Deposit",
          isSuccess: false,
          message: JSON.stringify(err?.response?.data?.data),
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
    dispatch({
      type: "SHOW_NOTIFICATION",
      data: {
        type: "Deposit",
        isSuccess: false,
        message: "Error, try again",
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

export const validatePayment = (trxref, reference) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: "TRADE_LOADING" });
    const res = await axios.get(
      apiUrl + `wallet/naira/verify?trxref=${trxref}&reference=${reference}`,
      {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + getState().auth.accessToken,
        },
      }
    );
    if (res.status === 200) {
      await getBalances(dispatch, getState);
      dispatch({ type: "DEPOSIT_STATUS", data: true });
      getHistories(dispatch, getState);
    } else {
      dispatch({ type: "DEPOSIT_STATUS", data: false });
    }
    dispatch({ type: "CLEAR_TRADE_LOADING" });
  } catch (err) {
    dispatch({ type: "DEPOSIT_STATUS", data: false });
    dispatch({ type: "CLEAR_TRADE_LOADING" });
  }
};

export const uploadGiftCard = (formData) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: "TRADE_LOADING" });
      const res = await axios.post(
        apiUrl +
          `transaction/giftcard/sell/upload/${
            getState().trade.currentGiftCardTrade.transaction_hash
          }`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + getState().auth.accessToken,
          },
        }
      );
      if (res.status === 201) {
        await getHistories(dispatch, getState);
        dispatch({
          type: "SHOW_NOTIFICATION",
          data: {
            type: "Upload Gift Card",
            isSuccess: true,
            message: "Trade Started",
          },
        });
        setTimeout(() => {
          dispatch({
            type: "CLEAR_NOTIFICATION",
          });
        }, 5000);
        dispatch({ type: "CLEAR_TRADE_LOADING" });
        return true;
      }
      dispatch({ type: "CLEAR_TRADE_LOADING" });
      return false;
    } catch (err) {
      if (err?.response?.data?.data) {
        dispatch({
          type: "SHOW_NOTIFICATION",
          data: {
            type: "Upload Gift Card",
            isSuccess: false,
            message: JSON.stringify(err?.response?.data?.data),
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
      dispatch({
        type: "SHOW_NOTIFICATION",
        data: {
          type: "Upload Gift Card",
          isSuccess: false,
          message: "Error, try again",
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
