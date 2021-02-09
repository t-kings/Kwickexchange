import React, { useReducer } from "react";
import { BitcoinContext } from "../root";
import BitcoinReducer from "../reducers/bitcoinReducer";

const BitcoinState = (props) => {
  const initialState = {
    buy: {},
    sell: {},
  };

  const [state, dispatch] = useReducer(BitcoinReducer, initialState);

  const getBitcoinRate = async (bitcoinRate) => {
    dispatch({ type: "GET_BITCOIN_RATE", payload: bitcoinRate });
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
