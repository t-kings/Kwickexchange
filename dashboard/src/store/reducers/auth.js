const initState = {
  isAuthenticated: false,
  toVerify: false,
  isLoading: false,
  user: {},
  accessToken: "",
  accessTokenExpiresIn: 1611538064,
  refreshToken: "",
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case "AUTH_LOADING":
      return {
        ...state,
        isLoading: true,
      };
    case "CLEAR_AUTH_LOADING":
      return {
        ...state,
        isLoading: false,
      };
    case "USER_LOGGED_IN":
      localStorage.setItem("authState", action.data);
      return {
        ...state,
        isAuthenticated: true,
        toVerify: false,
        isLoading: false,
        ...action.data,
      };
    case "USER_REGISTERED":
      return {
        ...state,
        toVerify: true,
        user: action.data,
      };
    case "ClEAR_VERIFY":
      return {
        ...state,
        toVerify: false,
      };
    // case "Token_LoggedIn":
    //   // console.log(action.data)
    //   return {
    //     ...state,
    //     isAuthenticated: true,
    //     token: localStorage.getItem("token"),
    //     profile: action.data.user,
    //     balance: action.data.ballance,
    //     transactions: action.data.transactions,
    //     nairaTransactions: action.data.naira_transactions,
    //     btcTransactions: action.data.btc_transactions,
    //   };
    // case "User_Error":
    //   return {
    //     ...state,
    //     isAuthenticated: false,
    //   };
    // case "logout":
    //   return {
    //     ...state,
    //     isAuthenticated: false,
    //   };
    // case "Forgot_Success":
    //   return {
    //     ...state,
    //     loader: false,
    //   };
    // case "Forgot_Error":
    //   return {
    //     ...state,
    //     loader: false,
    //   };
    default:
      return state;
  }
};

export default authReducer;
