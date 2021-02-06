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
            type: "Login",
            isSuccess: true,
            message: "Login Successful",
          },
        });
        setTimeout(() => {
          dispatch({
            type: "CLEAR_NOTIFICATION",
          });
        }, 5000);
      } else if (res.status === 202) {
        dispatch({
          type: "CLEAR_AUTH_LOADING",
        });
        dispatch({
          type: "SHOW_NOTIFICATION",
          data: {
            type: "Login",
            isSuccess: false,
            message: "Email not verified",
          },
        });
        setTimeout(() => {
          dispatch({
            type: "CLEAR_NOTIFICATION",
          });
        }, 5000);
        // dispatch({ type: "User_Registered", data: res.data });
        // setTimeout(dispatch({ type: "Clear_Verify", data: null }), 10000);
      } else {
        dispatch({
          type: "CLEAR_AUTH_LOADING",
        });
        dispatch({
          type: "SHOW_NOTIFICATION",
          data: {
            type: "Login",
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
          type: "Login",
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

// export const regUser = (user) => {
//   return async (dispatch, getState) => {
//     try {
//       const res = await axios.post(apiUrl + "register", { ...user });
//       if (res.status === 201) {
//         dispatch({ type: "User_Registered", data: res.data });
//         setTimeout(dispatch({ type: "Clear_Verify", data: null }), 10000);
//         // cogoToast.success(
//         //   "Successful! Verification link has been sent to your email."
//         // );
//       } else {
//         dispatch({ type: "User_Error", err: res.data.message });
//         // cogoToast.error(JSON.stringify(res?.data?.message));
//       }
//     } catch (err) {
//       dispatch({ type: "User_Error", err: err.response.data.message });
//       //   cogoToast.error(JSON.stringify(err?.response?.data?.message));
//     }
//   };
// };

// export const verifyUser = (user) => {
//   return (dispatch, getState) => {
//     axios
//       .post(apiUrl + "email/verify", { ...user })
//       .then((res) => {
//         if (res.status === 201) {
//           dispatch({ type: "User_Verified", data: res.data.data });
//         } else {
//           dispatch({ type: "User_Error", err: res.data.message });
//         }
//       })
//       .catch((err) => {
//         dispatch({ type: "User_Error", err: err.response.data.message });
//       });
//   };
// };

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

// export const forgotPassword = (email) => {
//   return async (dispatch, getState) => {
//     dispatch({ type: "Loading" });
//     axios
//       .get(apiUrl + "password/" + email)
//       .then((res) => {
//         // console.log(res)
//         if (res.status === 200) {
//           dispatch({ type: "Forgot_Success", data: res.data.data });
//           //   cogoToast.success("A reset link has been sent to your mail.");
//         } else {
//           dispatch({ type: "Forgot_Error", err: res.data.message });
//         }
//       })
//       .catch((err) => {
//         dispatch({ type: "Forgot_Error", err: err.response.data.message });
//         // cogoToast.error("Email does not exist!");
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
