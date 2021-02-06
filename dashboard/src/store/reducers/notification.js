const initialState = {
  type: "",
  show: false,
  isSuccess: false,
  message: "",
};

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SHOW_NOTIFICATION":
      return {
        ...state,
        show: true,
        ...action.data,
      };
    case "CLEAR_NOTIFICATION":
      return {
        ...state,
        show: false,
      };
    default:
      return state;
  }
};
export default notificationReducer;
