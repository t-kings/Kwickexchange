const initState = {
  isAuthenticated: false,
  toVerify: false,
  isLoading: false,
  user: {},
  accessToken: "",
  accessTokenExpiresIn: 0,
  refreshToken: "",
  isVerified: false,
  errors: {},
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case "AUTH_LOADING":
      return {
        ...state,
        isLoading: true,
        errors: {},
      };
    case "CLEAR_AUTH_LOADING":
      return {
        ...state,
        isLoading: false,
      };
    case "USER_LOGGED_IN":
      localStorage.setItem(
        "refresh_token",
        JSON.stringify(action.data.refreshToken)
      );
      if (action.data.user) {
        localStorage.setItem("profile", JSON.stringify(action.data.user));
      }

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
        isLoading: false,
      };
    case "CLEAR_VERIFY":
      return {
        ...state,
        toVerify: false,
      };
    case "EMAIL_VERIFIED":
      return {
        ...state,
        isVerified: true,
        isLoading: false,
      };
    case "PASSWORD_SENT":
      return {
        ...state,
        isPasswordSent: true,
        ...action.data,
      };
    case "PASSWORD_CHANGED":
      return {
        ...state,
        isPasswordChanged: true,
        ...action.data,
      };
    case "AUTH_ERRORS":
      return {
        ...state,
        ...action.data,
      };

    case "LOGOUT":
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("profile");
      return {
        ...state,
        isAuthenticated: false,
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
