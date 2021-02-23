import React, { Component } from "react";
import transStyle from "./Index.module.css";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import bg1 from "./images/1.png";
import bg2 from "./images/2.png";
import bg3 from "./images/3.png";
import {
  uploadProfilePic,
  updateProfile,
  updatePassword,
  changeNotification,
  updateNotificationSettings,
} from "../../../store/actions/auth";
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formTab: 1,
      passwordType: "password",
      errors: {
        current_password: [],
        password: [],
        password_confirmation: [],
      },
    };
  }

  handlePassword = (e) => {
    e.preventDefault();
    const errors = {
      current_password: [],
      password: [],
      password_confirmation: [],
    };
    this.setState({
      ...this.state,
      errors,
    });
    const { password, password_confirmation, current_password } = this.state;
    const { updatePassword } = this.props;
    if (password.length < 1) {
      errors.password.push("Password is required");
    }
    if (current_password.length < 1) {
      errors.current_password.push("Password is required");
    }
    if (password_confirmation.length < 1) {
      errors.password_confirmation.push("Confirm Password is required");
    }

    if (password !== password_confirmation) {
      errors.password_confirmation.push("Passwords do not match");
    }
    if (
      errors.password.length > 0 ||
      errors.current_password.length > 0 ||
      errors.password_confirmation.length > 0
    ) {
      this.setState({
        ...this.state,
        errors,
      });
    } else {
      updatePassword(password, current_password, password_confirmation);
    }
  };
  render() {
    const {
      isAuthenticated,
      uploadProfilePic,
      updateNotificationSettings,
      isLoading,
      user,
      updateProfile,
      currencyList,
      notificationSettings,
      changeNotification,
    } = this.props;
    console.log(notificationSettings);
    const errors = { ...this.state.errors, ...this.props.errors };
    const { formTab, passwordType } = this.state;
    if (!isAuthenticated) {
      return <Redirect to={{ pathname: "/", redirect_to: "/home/settings" }} />;
    }
    return (
      <section className={transStyle.home}>
        <h1 className={transStyle.title}>SETTINGS</h1>
        <div className={transStyle.hold}>
          <div className={transStyle.tabs}>
            <button
              onClick={() => this.setState({ ...this.state, formTab: 1 })}
              className={formTab === 1 ? transStyle.active : ""}
            >
              Profile
            </button>
            <button
              onClick={() => this.setState({ ...this.state, formTab: 2 })}
              className={formTab === 2 ? transStyle.active : ""}
            >
              Notification
            </button>
            <button
              onClick={() => this.setState({ ...this.state, formTab: 3 })}
              className={formTab === 3 ? transStyle.active : " "}
            >
              Security
            </button>
            <button
              onClick={() => this.setState({ ...this.state, formTab: 4 })}
              className={formTab === 4 ? transStyle.active : " "}
            >
              Verification
            </button>
          </div>
          {formTab === 1 ? (
            <>
              <div className={transStyle.profilePic}>
                <div>
                  <div className={transStyle.avatar}>
                    {user.avatar ? (
                      <img src={user.avatar} alt={user.fullname} />
                    ) : (
                      <svg
                        width="54"
                        height="60"
                        viewBox="0 0 54 60"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle cx="27" cy="13" r="13" fill="#161616" />
                        <path
                          d="M54 53C54 67.9117 41.9117 53 27 53C12.0883 53 0 67.9117 0 53C0 38.0883 12.0883 26 27 26C41.9117 26 54 38.0883 54 53Z"
                          fill="#161616"
                        />
                      </svg>
                    )}
                  </div>
                </div>
                <div>
                  <h2>Change Profile Picture</h2>
                  <p>Size must not be more than 20MB</p>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      const input = document.getElementById("file");
                      if ("files" in input) {
                        const file = input.files[0];
                        const formData = new FormData();
                        formData.append("file", file);
                        uploadProfilePic(formData);
                      }
                    }}
                  >
                    <input
                      type="file"
                      name="file"
                      id="file"
                      accept="image/*"
                      required
                      multiple={false}
                    />
                    {isLoading ? (
                      <div
                        className={
                          transStyle.load + " " + transStyle.link_btn_gold
                        }
                      >
                        <div className={transStyle.loader}>Loading...</div>
                      </div>
                    ) : (
                      <input
                        type="submit"
                        value="UPLOAD"
                        className={transStyle.link_btn_gold}
                      />
                    )}
                  </form>
                </div>
                <span className={transStyle._flier}>
                  <img src={bg1} alt="bg" />
                </span>
                <span className={transStyle._flier}>
                  <img src={bg2} alt="bg" />
                </span>
                <span className={transStyle._flier}>
                  <img src={bg3} alt="bg" />
                </span>
              </div>
            </>
          ) : formTab === 2 ? (
            <div className={transStyle.notification}>
              <p>
                In addition to these alerts, we may send you information about
                our goods and services
              </p>
              <div className={transStyle.table}>
                <table>
                  <thead>
                    <tr>
                      <th>Notification Type</th>
                      <th>App Notification</th>
                      <th>Email Notification</th>
                      <th>SMS Notification</th>
                    </tr>
                  </thead>
                  <tbody>
                    {notificationSettings.map((itm, idx) => (
                      <tr key={idx}>
                        <td>
                          <p>{itm.type}</p>
                        </td>
                        <td>
                          <input
                            type="checkbox"
                            onChange={(e) => {
                              changeNotification(
                                idx,
                                "app_notification",
                                e.target.checked
                              );
                            }}
                            defaultChecked={itm.app_notification}
                          />
                        </td>
                        <td>
                          <input
                            type="checkbox"
                            onChange={(e) => {
                              changeNotification(
                                idx,
                                "email_notification",
                                e.target.checked
                              );
                            }}
                            defaultChecked={itm.email_notification}
                          />
                        </td>
                        <td>
                          <input
                            type="checkbox"
                            onChange={(e) => {
                              changeNotification(
                                idx,
                                "sms_notification",
                                e.target.checked
                              );
                            }}
                            defaultChecked={itm.sms_notification}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {isLoading ? (
                <div
                  className={transStyle.load + " " + transStyle.link_btn_gold}
                >
                  <div className={transStyle.loader}>Loading...</div>
                </div>
              ) : (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    updateNotificationSettings();
                  }}
                  className={transStyle.link_btn_gold}
                >
                  SAVE
                </button>
              )}
            </div>
          ) : (
            <div className={transStyle.password}>
              <form onSubmit={this.handlePassword}>
                <div>
                  <input
                    type={passwordType}
                    placeholder="Old Password"
                    required
                    id="current_password"
                    onChange={(e) => {
                      e.preventDefault();
                      this.setState({
                        ...this.state,
                        current_password: e.target.value,
                      });
                    }}
                  />
                  {passwordType !== "password" ? (
                    <svg
                      onClick={(e) => {
                        this.setState({
                          ...this.state,
                          passwordType: "password",
                        });
                      }}
                      width="22"
                      height="19"
                      viewBox="0 0 22 19"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11 4C13.76 4 16 6.24 16 9C16 9.65 15.87 10.26 15.64 10.83L18.56 13.75C20.07 12.49 21.26 10.86 21.99 9C20.26 4.61 15.99 1.5 10.99 1.5C9.59 1.5 8.25 1.75 7.01 2.2L9.17 4.36C9.74 4.13 10.35 4 11 4ZM1 1.27L3.28 3.55L3.74 4.01C2.06856 5.308 0.776818 7.03148 0 9C1.73 13.39 6 16.5 11 16.5C12.55 16.5 14.03 16.2 15.38 15.66L15.8 16.08L18.73 19L20 17.73L2.27 0L1 1.27ZM6.53 6.8L8.08 8.35C8.03 8.56 8 8.78 8 9C8 10.66 9.34 12 11 12C11.22 12 11.44 11.97 11.65 11.92L13.2 13.47C12.53 13.8 11.79 14 11 14C8.24 14 6 11.76 6 9C6 8.21 6.2 7.47 6.53 6.8ZM10.84 6.02L13.99 9.17L14.01 9.01C14.01 7.35 12.67 6.01 11.01 6.01L10.84 6.02Z"
                        fill="black"
                      />
                    </svg>
                  ) : (
                    <svg
                      onClick={(e) => {
                        this.setState({
                          ...this.state,
                          passwordType: "text",
                        });
                      }}
                      width="22"
                      height="15"
                      viewBox="0 0 22 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11 0C6 0 1.73 3.11 0 7.5C1.73 11.89 6 15 11 15C16 15 20.27 11.89 22 7.5C20.27 3.11 16 0 11 0ZM11 12.5C8.24 12.5 6 10.26 6 7.5C6 4.74 8.24 2.5 11 2.5C13.76 2.5 16 4.74 16 7.5C16 10.26 13.76 12.5 11 12.5ZM11 4.5C9.34 4.5 8 5.84 8 7.5C8 9.16 9.34 10.5 11 10.5C12.66 10.5 14 9.16 14 7.5C14 5.84 12.66 4.5 11 4.5Z"
                        fill="black"
                      />
                    </svg>
                  )}
                </div>
                <input
                  required
                  type={passwordType}
                  id="password"
                  placeholder="Password"
                  onChange={(e) => {
                    e.preventDefault();
                    this.setState({
                      ...this.state,
                      password: e.target.value,
                    });
                  }}
                />
                <input
                  required
                  type={passwordType}
                  id="password_confirmation"
                  placeholder="New Password"
                  id="currentPassword"
                  onChange={(e) => {
                    e.preventDefault();
                    this.setState({
                      ...this.state,
                      password_confirmation: e.target.value,
                    });
                  }}
                />
                {isLoading ? (
                  <div
                    className={transStyle.load + " " + transStyle.link_btn_gold}
                  >
                    <div className={transStyle.loader}>Loading...</div>
                  </div>
                ) : (
                  <input
                    type="submit"
                    value="SAVE"
                    className={transStyle.link_btn_gold}
                  />
                )}
              </form>
              {errors["password"].map((item, idx) => (
                <p key={idx} className={transStyle.error_par}>
                  {item}
                </p>
              ))}
              {errors["password_confirmation"].map((item, idx) => (
                <p key={idx} className={transStyle.error_par}>
                  {item}
                </p>
              ))}
            </div>
          )}
        </div>

        {formTab === 1 ? (
          <div className={transStyle.profileInfo}>
            <div className={transStyle.profileTop}>
              <h2>Personal Information</h2>
            </div>
            <div className={transStyle.profileBody}>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  updateProfile({
                    currency_slug: this.state.currency_slug ?? user.fiat.slug,
                    phone_number: this.state.phone_number ?? user.phone,
                    full_name: user.fullname,
                  });
                }}
              >
                <input
                  type="text"
                  placeholder="Full Name"
                  defaultValue={user.fullname}
                  readOnly
                />
                <input
                  type="text"
                  placeholder="Username"
                  defaultValue={user.username}
                  readOnly
                />
                <input
                  type="email"
                  placeholder="Email"
                  defaultValue={user.email}
                  readOnly
                />
                <select
                  defaultValue={user.fiat.slug}
                  required
                  onChange={(e) => {
                    this.setState({
                      ...this.state,
                      currency_slug: e.target.value,
                    });
                  }}
                >
                  <option value="">select currency</option>
                  {currencyList.map((itm, idx) => (
                    <option value={itm.fiat_slug} key={idx}>
                      {itm.fiat} ({itm.fiat_slug})
                    </option>
                  ))}
                </select>
                <input
                  type="tel"
                  defaultValue={user.phone}
                  required
                  onChange={(e) => {
                    this.setState({
                      ...this.state,
                      phone_number: e.target.value,
                    });
                  }}
                  placeholder="Phone Number"
                />
                {isLoading ? (
                  <div
                    className={transStyle.load + " " + transStyle.link_btn_gold}
                  >
                    <div className={transStyle.loader}>Loading...</div>
                  </div>
                ) : (
                  <input
                    type="submit"
                    value="SAVE"
                    className={transStyle.link_btn_gold}
                  />
                )}
              </form>
            </div>
          </div>
        ) : null}
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  return { ...state.resources, ...state.auth };
};
const mapDispatchToProps = (dispatch) => {
  return {
    uploadProfilePic: (payload) => dispatch(uploadProfilePic(payload)),
    changeNotification: (idx, key, value) =>
      dispatch(changeNotification(idx, key, value)),
    updateProfile: (payload) => dispatch(updateProfile(payload)),
    updatePassword: (password, current_password, password_confirmation) =>
      dispatch(
        updatePassword(password, current_password, password_confirmation)
      ),
    updateNotificationSettings: () => dispatch(updateNotificationSettings()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
