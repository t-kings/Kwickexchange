import React, { useReducer } from "react";
import { GiftCardContext } from "../root";
import GiftCardReducer from "../reducers/giftCardReducer";

const GiftCardState = (props) => {
  const initialState = {
    sell: [],
  };

  const [state, dispatch] = useReducer(GiftCardReducer, initialState);

  const getGiftCardRate = async (giftCardRate) => {
    dispatch({ type: "GET_GIFT_CARD_RATE", payload: giftCardRate });
  };

  return (
    <GiftCardContext.Provider
      value={{
        ...state,
        getGiftCardRate,
      }}
    >
      {props.children}
    </GiftCardContext.Provider>
  );
};

export default GiftCardState;
