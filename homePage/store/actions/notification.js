import React, { useReducer } from "react";
import { NotificationContext } from "../root";
import NotificationReducer from "../reducers/notificationReducer";

const NotificationState = (props) => {
  const initialState = {
    type: "",
    show: false,
    isSuccess: true,
    message: "",
  };

  const [state, dispatch] = useReducer(NotificationReducer, initialState);

  // GET ALL CAKES
  const showNotification = async (isSuccess, type, message) => {
    dispatch({
      type: "SHOW_NOTIFICATION",
      payload: { isSuccess, type, message },
    });
    setTimeout(() => {
      dispatch({ type: "CLEAR_NOTIFICATION" });
    }, 5000);
  };

  return (
    <NotificationContext.Provider
      value={{
        ...state,
        showNotification,
      }}
    >
      {props.children}
    </NotificationContext.Provider>
  );
};

export default NotificationState;
