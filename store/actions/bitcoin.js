import React, { useReducer } from "react";
import { BitcoinContext } from "../root";
import BitcoinReducer from "../reducers/bitcoinReducer";

const BitcoinState = (props) => {
  const initialState = {
    buy: {},
    sell: {},
  };

  const [state, dispatch] = useReducer(BitcoinReducer, initialState);

  // GET ALL CAKES
  const getBitcoinRate = async () => {
    try {
      //   const res = await axios.get(apiUrl + "/misc/bitcoin-rates");
      const res = {
        status: 200,
        data: {
          message: "success",
          data: {
            buy: {
              type: "bitcoin-buy",
              usd: "37978.60",
              naira: "382.14",
            },
            sell: {
              type: "bitcoin-sell",
              usd: "37751.40",
              naira: "379.86",
            },
          },
        },
      };
      if (res.status === 200) {
        dispatch({ type: "GET_BITCOIN_RATE", payload: res.data.data });
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <BitcoinContext.Provider
      value={{
        ...state,
        getBitcoinRate,
      }}
    >
      {props.children}
    </BitcoinContext.Provider>
  );
};

export default BitcoinState;
