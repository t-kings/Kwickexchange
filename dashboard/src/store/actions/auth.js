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
        dispatch({ type: "USER_LOGGED_IN", data: res.data.data });
        const expiryTime = res.data.data.accessTokenExpiresIn;
        setTimeout(() => {
          refreshToken(dispatch, getState);
        }, expiryTime - 300000);
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
          const expiryTime = res.data.data.accessTokenExpiresIn;
          setTimeout(() => {
            refreshToken(dispatch, getState);
          }, expiryTime - 300000);
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
      console.log(e);
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
        const expiryTime = res.data.data.accessTokenExpiresIn;
        setTimeout(() => {
          refreshToken(dispatch, getState);
        }, expiryTime - 300000);
      }
    }
  } catch (e) {
    dispatch({
      type: "CLEAR_AUTH_LOADING",
    });
    console.log(e);
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
        dispatch({
          type: "PROFILE_UPDATED",
          data: res.data.data,
        });
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
  console.log(password, current_password, password_confirmation);
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
      console.log(error?.response);
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
