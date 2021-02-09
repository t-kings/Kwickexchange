import { apiUrl } from "../../helpers/config";
import axios from "axios";

export const signIn = (user) => {
  return async (dispatch, getState) => {
    dispatch({
      type: "AUTH_LOADING",
    });
    try {
      const res = await axios.post(apiUrl + "auth/login", { ...user });
      if (res.status === 200) {
        dispatch({ type: "USER_LOGGED_IN", data: res.data });
        dispatch({
          type: "SHOW_NOTIFICATION",
          data: {
            type: "Sign In",
            isSuccess: true,
            message: "Sign In Successful",
          },
        });
        setTimeout(() => {
          dispatch({
            type: "CLEAR_NOTIFICATION",
          });
        }, 5000);
      } else {
        dispatch({
          type: "CLEAR_AUTH_LOADING",
        });
        dispatch({
          type: "SHOW_NOTIFICATION",
          data: {
            type: "Sign In",
            isSuccess: false,
            message: "Error, try again",
          },
        });
        setTimeout(() => {
          dispatch({
            type: "CLEAR_NOTIFICATION",
          });
        }, 5000);
      }
    } catch (err) {
      if (
        err.response.status === 400 &&
        err.response.data.data !== "Invalid Credentials"
      ) {
        dispatch({
          type: "CLEAR_AUTH_LOADING",
        });
        dispatch({
          type: "SHOW_NOTIFICATION",
          data: {
            type: "Sign In",
            isSuccess: false,
            message: "Email not verified",
          },
        });
        setTimeout(() => {
          dispatch({
            type: "CLEAR_NOTIFICATION",
          });
        }, 5000);
        dispatch({ type: "USER_REGISTERED", data: user });
        return setTimeout(dispatch({ type: "CLEAR_VERIFY" }), 5000);
      }
      if (
        err.response.status === 503 ||
        (err.response.status === 400 &&
          err.response.data.data === "Invalid Credentials")
      ) {
        dispatch({
          type: "CLEAR_AUTH_LOADING",
        });
        dispatch({
          type: "SHOW_NOTIFICATION",
          data: {
            type: "Sign In",
            isSuccess: false,
            message: "Wrong Username / Password Combination",
          },
        });
        return setTimeout(() => {
          dispatch({
            type: "CLEAR_NOTIFICATION",
          });
        }, 5000);
      }
      dispatch({
        type: "CLEAR_AUTH_LOADING",
      });
      dispatch({
        type: "SHOW_NOTIFICATION",
        data: {
          type: "Sign In",
          isSuccess: false,
          message: "Wrong Username / Password Combination",
        },
      });
      setTimeout(() => {
        dispatch({
          type: "CLEAR_NOTIFICATION",
        });
      }, 5000);
    }
  };
};

export const signUp = (user) => {
  return async (dispatch, getState) => {
    dispatch({
      type: "AUTH_LOADING",
    });
    try {
      const res = await axios.post(apiUrl + "auth/register", { ...user });
      if (res.status === 201) {
        dispatch({ type: "USER_REGISTERED", data: user });
        setTimeout(dispatch({ type: "CLEAR_VERIFY" }), 5000);
        dispatch({
          type: "SHOW_NOTIFICATION",
          data: {
            type: "Sign Up",
            isSuccess: true,
            message: "Account created",
          },
        });
        setTimeout(() => {
          dispatch({
            type: "CLEAR_NOTIFICATION",
          });
        }, 5000);
      } else {
        dispatch({
          type: "CLEAR_AUTH_LOADING",
        });
        dispatch({
          type: "SHOW_NOTIFICATION",
          data: {
            type: "Sign Up",
            isSuccess: false,
            message: "Error, try again",
          },
        });
        setTimeout(() => {
          dispatch({
            type: "CLEAR_NOTIFICATION",
          });
        }, 5000);
      }
    } catch (err) {
      if (err.response.status === 422) {
        dispatch({
          type: "AUTH_ERRORS",
          data: {
            errors: err.response.data.data.errors,
          },
        });
        dispatch({
          type: "SHOW_NOTIFICATION",
          data: {
            type: "Sign Up",
            isSuccess: false,
            message: "Check form errors",
          },
        });
        dispatch({
          type: "CLEAR_AUTH_LOADING",
        });
        return setTimeout(() => {
          dispatch({
            type: "CLEAR_NOTIFICATION",
          });
        }, 5000);
      }
      dispatch({
        type: "CLEAR_AUTH_LOADING",
      });
      dispatch({
        type: "SHOW_NOTIFICATION",
        data: {
          type: "Sign Up",
          isSuccess: false,
          message: "Account not created",
        },
      });
      setTimeout(() => {
        dispatch({
          type: "CLEAR_NOTIFICATION",
        });
      }, 5000);
    }
  };
};

export const resendVerification = (user) => {
  return async (dispatch, getState) => {
    dispatch({
      type: "AUTH_LOADING",
    });
    try {
      const res = await axios.post(apiUrl + "auth/verification/email", {
        ...user,
      });
      if (res.status === 200) {
        dispatch({
          type: "SHOW_NOTIFICATION",
          data: {
            type: "Email Verification",
            isSuccess: true,
            message: "Verification email sent",
          },
        });
        dispatch({
          type: "CLEAR_AUTH_LOADING",
        });
        setTimeout(() => {
          dispatch({
            type: "CLEAR_NOTIFICATION",
          });
        }, 5000);
      } else {
        dispatch({
          type: "CLEAR_AUTH_LOADING",
        });
        dispatch({
          type: "SHOW_NOTIFICATION",
          data: {
            type: "Email Verification",
            isSuccess: false,
            message: "Error, try again",
          },
        });
        setTimeout(() => {
          dispatch({
            type: "CLEAR_NOTIFICATION",
          });
        }, 5000);
      }
    } catch (err) {
      dispatch({
        type: "CLEAR_AUTH_LOADING",
      });
      dispatch({
        type: "SHOW_NOTIFICATION",
        data: {
          type: "Email Verification",
          isSuccess: false,
          message: err?.response?.data?.message,
        },
      });
      setTimeout(() => {
        dispatch({
          type: "CLEAR_NOTIFICATION",
        });
      }, 5000);
    }
  };
};

export const verifyEmail = (user) => {
  return async (dispatch, getState) => {
    dispatch({
      type: "AUTH_LOADING",
    });
    try {
      const res = await axios.post(apiUrl + "auth/verify/email/" + user);
      if (res.status === 200) {
        dispatch({
          type: "EMAIL_VERIFIED",
          data: { isVerified: true },
        });
        dispatch({
          type: "SHOW_NOTIFICATION",
          data: {
            type: "Email Verification",
            isSuccess: true,
            message: "Email Verified Successfully",
          },
        });
        setTimeout(() => {
          dispatch({
            type: "CLEAR_NOTIFICATION",
          });
        }, 5000);
      } else {
        dispatch({
          type: "CLEAR_AUTH_LOADING",
        });
        dispatch({
          type: "SHOW_NOTIFICATION",
          data: {
            type: "Email Verification",
            isSuccess: false,
            message: "Error, try again",
          },
        });
        setTimeout(() => {
          dispatch({
            type: "CLEAR_NOTIFICATION",
          });
        }, 5000);
      }
    } catch (err) {
      console.log(err.response.data);
      dispatch({
        type: "CLEAR_AUTH_LOADING",
      });
      dispatch({
        type: "SHOW_NOTIFICATION",
        data: {
          type: "Email Verification",
          isSuccess: false,
          message: err?.response?.data?.data,
        },
      });
      setTimeout(() => {
        dispatch({
          type: "CLEAR_NOTIFICATION",
        });
      }, 5000);
    }
  };
};

export const requestPassword = (user) => {
  return async (dispatch, getState) => {
    dispatch({
      type: "AUTH_LOADING",
    });
    try {
      const res = await axios.post(apiUrl + "auth/forgot-password", {
        ...user,
      });
      if (res.status === 200) {
        dispatch({
          type: "PASSWORD_SENT",
          data: { user },
        });
        dispatch({
          type: "SHOW_NOTIFICATION",
          data: {
            type: "Request Password",
            isSuccess: true,
            message: "Password reset email sent",
          },
        });
        setTimeout(() => {
          dispatch({
            type: "CLEAR_NOTIFICATION",
          });
        }, 5000);
      } else {
        dispatch({
          type: "CLEAR_AUTH_LOADING",
        });
        dispatch({
          type: "SHOW_NOTIFICATION",
          data: {
            type: "Request Password",
            isSuccess: false,
            message: "Error, try again",
          },
        });
        setTimeout(() => {
          dispatch({
            type: "CLEAR_NOTIFICATION",
          });
        }, 5000);
      }
    } catch (err) {
      if (err.response.status === 404) {
        dispatch({
          type: "CLEAR_AUTH_LOADING",
        });
        dispatch({
          type: "SHOW_NOTIFICATION",
          data: {
            type: "Request Password",
            isSuccess: false,
            message: "Email not found",
          },
        });
        return setTimeout(() => {
          dispatch({
            type: "CLEAR_NOTIFICATION",
          });
        }, 5000);
      }
      dispatch({
        type: "CLEAR_AUTH_LOADING",
      });
      dispatch({
        type: "SHOW_NOTIFICATION",
        data: {
          type: "Request Password",
          isSuccess: false,
          message: err?.response?.data?.data,
        },
      });
      setTimeout(() => {
        dispatch({
          type: "CLEAR_NOTIFICATION",
        });
      }, 5000);
    }
  };
};

export const resetPassword = (user) => {
  return async (dispatch, getState) => {
    dispatch({
      type: "AUTH_LOADING",
    });
    try {
      const res = await axios.post(apiUrl + "auth/reset-password", {
        ...user,
      });
      if (res.status === 200) {
        dispatch({
          type: "PASSWORD_CHANGED",
          data: user,
        });
        dispatch({
          type: "SHOW_NOTIFICATION",
          data: {
            type: "Reset Password",
            isSuccess: true,
            message: "Password changed successfully",
          },
        });
        setTimeout(() => {
          dispatch({
            type: "CLEAR_NOTIFICATION",
          });
        }, 5000);
      } else {
        dispatch({
          type: "CLEAR_AUTH_LOADING",
        });
        dispatch({
          type: "SHOW_NOTIFICATION",
          data: {
            type: "Reset Password",
            isSuccess: false,
            message: "Error, try again",
          },
        });
        setTimeout(() => {
          dispatch({
            type: "CLEAR_NOTIFICATION",
          });
        }, 5000);
      }
    } catch (err) {
      if (err.response.status === 422) {
        dispatch({
          type: "AUTH_ERRORS",
          data: {
            errors: err.response.data.data.errors,
          },
        });
        dispatch({
          type: "SHOW_NOTIFICATION",
          data: {
            type: "Sign Up",
            isSuccess: false,
            message: "Check form errors",
          },
        });
        dispatch({
          type: "CLEAR_AUTH_LOADING",
        });
        return setTimeout(() => {
          dispatch({
            type: "CLEAR_NOTIFICATION",
          });
        }, 5000);
      }
      dispatch({
        type: "CLEAR_AUTH_LOADING",
      });
      dispatch({
        type: "SHOW_NOTIFICATION",
        data: {
          type: "Reset Password",
          isSuccess: false,
          message: err?.response?.data?.message,
        },
      });
      setTimeout(() => {
        dispatch({
          type: "CLEAR_NOTIFICATION",
        });
      }, 5000);
    }
  };
};

// export const editProfile = (data) => {
//   return (dispatch, getState) => {
//     axios
//       .put(apiUrl + "user", data, {
//         headers: {
//           Accept: "application/json",
//           Authorization: "Bearer " + getToken(),
//         },
//       })
//       .then((res) => {
//         if (res.status === 201) {
//           //   cogoToast.success("Profile updated successfully");
//           dispatch({ type: "Token_LoggedIn", data: res.data });
//         } else {
//           //   cogoToast.error(res?.data?.message);
//         }
//       })
//       .catch((err) => {
//         // cogoToast.error(err.response?.data?.message);
//       });
//   };
// };

// export const logOut = (user) => {
//   return (dispatch, getState) => {
//     localStorage.setItem("token", "");
//     localStorage.removeItem("profile");
//     dispatch({ type: "logout", err: "User Out" });
//     // cogoToast.success("Log Out Successful!");
//   };
// };

// if (!localStorage.getItem("token")) {
//   localStorage.setItem("token", "");
// }

// const getToken = () => {
//   const token = localStorage.getItem("token");
//   return token;
// };

// export const checkToken = () => {
//   return (dispatch, getState) => {
//     const string = localStorage.getItem("profile");
//     if (string) {
//       const data = JSON.parse(string);
//       dispatch({ type: "Token_LoggedIn", data });
//     }
//     axios
//       .post(
//         apiUrl + "token",
//         {},
//         {
//           headers: {
//             Accept: "application/json",
//             Authorization: "Bearer " + getToken(),
//           },
//         }
//       )
//       .then((res) => {
//         if (res.status === 200) {
//           localStorage.setItem("profile", JSON.stringify(res.data));
//           dispatch({ type: "Token_LoggedIn", data: res.data });
//         } else {
//           dispatch({ type: "KILL_LOADING_AUTH" });
//           return false;
//         }
//         dispatch({ type: "KILL_LOADING_AUTH" });
//       })
//       .catch((err) => {
//         dispatch({ type: "KILL_LOADING_AUTH" });
//         return false;
//       });
//   };
// };

// export const updateUser = async () => {
//   try {
//     const res = await axios.post(
//       apiUrl + "token",
//       {},
//       {
//         headers: {
//           Accept: "application/json",
//           Authorization: "Bearer " + getToken(),
//         },
//       }
//     );
//     if (res.status === 200) {
//       return res;
//     }
//   } catch (err) {}
// };
