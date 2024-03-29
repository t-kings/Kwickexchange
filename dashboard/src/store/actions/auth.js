import { apiUrl } from "../../helpers/config";
import axios from "axios";
import { getBalances, getNotificationSettingsList } from "./resources";
export const signIn = (user) => {
  return async (dispatch, getState) => {
    dispatch({
      type: "AUTH_LOADING",
    });
    try {
      const res = await axios.post(apiUrl + "auth/login", { ...user });
      if (res.status === 200) {
        dispatch({ type: "USER_LOGGED_IN", data: res.data.data });
        const expiryTime = res.data.data.accessTokenExpiresIn;
        setTimeout(() => {
          refreshToken(dispatch, getState);
        }, expiryTime - 120000);
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

export const logout = () => {
  return (dispatch, getState) => {
    dispatch({ type: "LOGOUT" });
    dispatch({
      type: "SHOW_NOTIFICATION",
      data: {
        type: "Logout",
        isSuccess: true,
        message: "Logout Successful",
      },
    });
    setTimeout(() => {
      dispatch({
        type: "CLEAR_NOTIFICATION",
      });
    }, 5000);
  };
};

export const checkToken = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: "TOKEN_LOADING",
      });
      const token = JSON.parse(localStorage.getItem("refresh_token"));
      const stringProfile = JSON.parse(localStorage.getItem("profile"));
      if (stringProfile && token) {
        dispatch({
          type: "USER_LOGGED_IN",
          data: {
            user: stringProfile,
            refreshToken: token,
          },
        });
        const res = await axios.post(apiUrl + "auth/refresh-token", {
          refreshToken: token,
        });
        if (res.status === 200) {
          dispatch({
            type: "USER_LOGGED_IN",
            data: res.data.data,
          });
          await getUser(dispatch, getState);
          setTimeout(() => {
            refreshToken(dispatch, getState);
          }, 120000);
        } else {
          dispatch({
            type: "CLEAR_TOKEN_LOADING",
          });
          return false;
        }
        dispatch({
          type: "CLEAR_TOKEN_LOADING",
        });
        return true;
      } else {
        dispatch({ type: "LOGOUT" });
      }
      dispatch({
        type: "CLEAR_TOKEN_LOADING",
      });
      return false;
    } catch (e) {
      dispatch({
        type: "CLEAR_TOKEN_LOADING",
      });
      // console.log(e);
      return false;
    }
  };
};

export const refreshToken = async (dispatch, getState) => {
  try {
    const { auth } = getState();
    if (auth.refreshToken) {
      const res = await axios.post(apiUrl + "auth/refresh-token", {
        refreshToken: auth.refreshToken,
      });
      if (res.status === 200) {
        dispatch({
          type: "USER_LOGGED_IN",
          data: res.data.data,
        });
        await getUser(dispatch, getState);
        setTimeout(() => {
          refreshToken(dispatch, getState);
        }, 120000);
      }
    }
  } catch (e) {
    dispatch({
      type: "CLEAR_AUTH_LOADING",
    });
    // console.log(e);
  }
};

export const uploadProfilePic = (form) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: "AUTH_LOADING" });
      const res = await axios.patch(apiUrl + "settings/update-avatar", form, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + getState().auth.accessToken,
        },
      });
      if (res.status === 200) {
        await getUser(dispatch, getState);
        dispatch({
          type: "SHOW_NOTIFICATION",
          data: {
            type: "Avatar",
            isSuccess: true,
            message: res.data.data,
          },
        });
        setTimeout(() => {
          dispatch({
            type: "CLEAR_NOTIFICATION",
          });
        }, 5000);
      }
      dispatch({ type: "CLEAR_AUTH_LOADING" });
    } catch (error) {
      dispatch({
        type: "SHOW_NOTIFICATION",
        data: {
          type: "Avatar",
          isSuccess: false,
          message: error?.response?.data?.data,
        },
      });
      setTimeout(() => {
        dispatch({
          type: "CLEAR_NOTIFICATION",
        });
      }, 5000);
      dispatch({ type: "CLEAR_AUTH_LOADING" });
    }
  };
};

export const getUser = async (dispatch, getState) => {
  try {
    const res = await axios.get(apiUrl + "auth/me", {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + getState().auth.accessToken,
      },
    });
    if (res.status === 200) {
      dispatch({ type: "PROFILE_UPDATED", data: res.data.data });
    }
    return true;
  } catch (err) {
    return true;
  }
};

export const updateProfile = (form) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: "AUTH_LOADING" });
      const res = await axios.patch(apiUrl + "settings/update-profile", form, {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + getState().auth.accessToken,
        },
      });
      if (res.status === 200) {
        await getUser(dispatch, getState);
        await getBalances(dispatch, getState);
        dispatch({
          type: "SHOW_NOTIFICATION",
          data: {
            type: "Profile",
            isSuccess: true,
            message: "Profile Updated Successfully",
          },
        });
        setTimeout(() => {
          dispatch({
            type: "CLEAR_NOTIFICATION",
          });
        }, 5000);
      }
      dispatch({ type: "CLEAR_AUTH_LOADING" });
    } catch (error) {
      dispatch({
        type: "SHOW_NOTIFICATION",
        data: {
          type: "Profile",
          isSuccess: false,
          message: "Error!, please try again",
        },
      });
      setTimeout(() => {
        dispatch({
          type: "CLEAR_NOTIFICATION",
        });
      }, 5000);
      dispatch({ type: "CLEAR_AUTH_LOADING" });
    }
  };
};

export const updatePassword = (
  password,
  current_password,
  password_confirmation
) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: "AUTH_LOADING" });
      const res = await axios.patch(
        apiUrl + "settings/change-password",
        { password, current_password, password_confirmation },
        {
          headers: {
            Accept: "application/json",
            Authorization: "Bearer " + getState().auth.accessToken,
          },
        }
      );
      if (res.status === 200) {
        await getUser(dispatch, getState);
        dispatch({
          type: "SHOW_NOTIFICATION",
          data: {
            type: "Password",
            isSuccess: true,
            message: "Password Successfully Changed",
          },
        });
        setTimeout(() => {
          dispatch({
            type: "CLEAR_NOTIFICATION",
          });
        }, 5000);
      }
      dispatch({ type: "CLEAR_AUTH_LOADING" });
    } catch (error) {
      if (error.response.status === 422) {
        dispatch({
          type: "AUTH_ERRORS",
          data: {
            errors: error.response.data.data.errors,
          },
        });
        dispatch({
          type: "SHOW_NOTIFICATION",
          data: {
            type: "Password",
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
        type: "SHOW_NOTIFICATION",
        data: {
          type: "Password",
          isSuccess: false,
          message: "Error!, please try again",
        },
      });
      setTimeout(() => {
        dispatch({
          type: "CLEAR_NOTIFICATION",
        });
      }, 5000);
      dispatch({ type: "CLEAR_AUTH_LOADING" });
    }
  };
};

export const changeNotification = (idx, key, value) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: "CHANGE_NOTIFICATION", idx, key, value });
    } catch (error) {
      // console.log(error);
    }
  };
};

export const updateNotificationSettings = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: "AUTH_LOADING" });
      const res = await axios.patch(
        apiUrl + "settings/notification",
        getState().resources.notificationSettings,
        {
          headers: {
            Accept: "application/json",
            Authorization: "Bearer " + getState().auth.accessToken,
          },
        }
      );
      if (res.status === 200) {
        await getNotificationSettingsList(dispatch, getState);
        dispatch({
          type: "SHOW_NOTIFICATION",
          data: {
            type: "Notification",
            isSuccess: true,
            message: "Notification Settings Successfully Changed",
          },
        });
        setTimeout(() => {
          dispatch({
            type: "CLEAR_NOTIFICATION",
          });
        }, 5000);
      }
      dispatch({ type: "CLEAR_AUTH_LOADING" });
    } catch (error) {
      dispatch({
        type: "SHOW_NOTIFICATION",
        data: {
          type: "Notification",
          isSuccess: false,
          message: "Error!, please try again",
        },
      });
      setTimeout(() => {
        dispatch({
          type: "CLEAR_NOTIFICATION",
        });
      }, 5000);
      dispatch({ type: "CLEAR_AUTH_LOADING" });
    }
  };
};

export const markNotification = (id) => {
  return async (dispatch, getState) => {
    try {
      const res = await axios.post(
        apiUrl + "notification/mark/" + id,
        {},
        {
          headers: {
            Accept: "application/json",
            Authorization: "Bearer " + getState().auth.accessToken,
          },
        }
      );
    } catch (error) {
      // console.log(error);
    }
  };
};

export const deleteAccount = (e) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: "AUTH_LOADING" });
      const res = await axios.delete(apiUrl + "settings/delete-account", {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + getState().auth.accessToken,
        },
        data: {
          password: e,
        },
      });
      if (res.status === 200) {
        dispatch({
          type: "SHOW_NOTIFICATION",
          data: {
            type: "Delete Account",
            isSuccess: true,
            message: "User account detail removed successfully",
          },
        });
        setTimeout(() => {
          dispatch({
            type: "CLEAR_NOTIFICATION",
          });
        }, 5000);
        dispatch({ type: "CLEAR_AUTH_LOADING" });
        logout();
        return true;
      }
      dispatch({ type: "CLEAR_AUTH_LOADING" });
      return false;
    } catch (error) {
      if (error?.response?.data?.data) {
        dispatch({
          type: "SHOW_NOTIFICATION",
          data: {
            type: "Delete Account",
            isSuccess: false,
            message: JSON.stringify(error?.response?.data?.data),
          },
        });
        setTimeout(() => {
          dispatch({
            type: "CLEAR_NOTIFICATION",
          });
        }, 5000);
        dispatch({ type: "CLEAR_AUTH_LOADING" });
        return false;
      }
      dispatch({
        type: "SHOW_NOTIFICATION",
        data: {
          type: "Delete Account",
          isSuccess: false,
          message: "Error!, please try again",
        },
      });
      setTimeout(() => {
        dispatch({
          type: "CLEAR_NOTIFICATION",
        });
      }, 5000);
      dispatch({ type: "CLEAR_AUTH_LOADING" });
      return false;
    }
  };
};

export const verifyPhone = (e) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: "AUTH_LOADING" });
      const res = await axios.post(apiUrl + "auth/verify/sms", e, {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + getState().auth.accessToken,
        },
      });
      if (res.status === 200) {
        await getUser(dispatch, getState);
        dispatch({
          type: "SHOW_NOTIFICATION",
          data: {
            type: "Phone Number Verification",
            isSuccess: true,
            message: "Phone Number Verified",
          },
        });
        setTimeout(() => {
          dispatch({
            type: "CLEAR_NOTIFICATION",
          });
        }, 5000);
        dispatch({ type: "CLEAR_AUTH_LOADING" });
        logout();
        return true;
      }
      dispatch({ type: "CLEAR_AUTH_LOADING" });
      return false;
    } catch (error) {
      if (error?.response?.data?.data) {
        dispatch({
          type: "SHOW_NOTIFICATION",
          data: {
            type: "Phone Number Verification",
            isSuccess: false,
            message: JSON.stringify(error?.response?.data?.data),
          },
        });
        setTimeout(() => {
          dispatch({
            type: "CLEAR_NOTIFICATION",
          });
        }, 5000);
        dispatch({ type: "CLEAR_AUTH_LOADING" });
        return false;
      }
      dispatch({
        type: "SHOW_NOTIFICATION",
        data: {
          type: "Phone Number Verification",
          isSuccess: false,
          message: "Wrong Verification Code",
        },
      });
      setTimeout(() => {
        dispatch({
          type: "CLEAR_NOTIFICATION",
        });
      }, 5000);
      dispatch({ type: "CLEAR_AUTH_LOADING" });
      return false;
    }
  };
};

export const resendCode = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: "AUTH_LOADING" });
      const res = await axios.post(
        apiUrl + "auth/verification/sms",
        {
          user: getState().auth.user.email,
        },
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
            type: "Code Sent",
            isSuccess: true,
            message: "SMS verification sent",
          },
        });
        setTimeout(() => {
          dispatch({
            type: "CLEAR_NOTIFICATION",
          });
        }, 5000);
        dispatch({ type: "CLEAR_AUTH_LOADING" });
        logout();
        return true;
      }
      dispatch({ type: "CLEAR_AUTH_LOADING" });
      return false;
    } catch (error) {
      dispatch({
        type: "SHOW_NOTIFICATION",
        data: {
          type: "Code Sent",
          isSuccess: false,
          message: "Error!, please try again",
        },
      });
      setTimeout(() => {
        dispatch({
          type: "CLEAR_NOTIFICATION",
        });
      }, 5000);
      dispatch({ type: "CLEAR_AUTH_LOADING" });
      return false;
    }
  };
};
