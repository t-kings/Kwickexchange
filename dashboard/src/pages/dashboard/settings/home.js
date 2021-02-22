import React, { Component } from "react";
import transStyle from "./Index.module.css";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import bg1 from "./images/1.png";
import bg2 from "./images/2.png";
import bg3 from "./images/3.png";
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formTab: 1,
    };
  }
  render() {
    const { isAuthenticated } = this.props;
    const { formTab } = this.state;
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
                  </div>
                </div>
                <div>
                  <h2>Change Profile Picture</h2>
                  <p>Size must not be more than 20MB</p>
                  <form>
                    <input type="file" />
                    <input
                      type="submit"
                      value="UPLOAD"
                      className={transStyle.link_btn_gold}
                    />
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
                    <tr>
                      <td>
                        <p>Coin incoming confirmed</p>
                      </td>
                      <td>
                        <input type="checkbox" checked={true} />
                      </td>
                      <td>
                        <input type="checkbox" checked={true} />
                      </td>
                      <td>
                        <input type="checkbox" checked={false} />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <p>Coin incoming unconfirmed</p>
                      </td>
                      <td>
                        <input type="checkbox" checked={true} />
                      </td>
                      <td>
                        <input type="checkbox" checked={true} />
                      </td>
                      <td>
                        <input type="checkbox" checked={false} />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <p>Coin outgoing confirmed</p>
                      </td>
                      <td>
                        <input type="checkbox" checked={true} />
                      </td>
                      <td>
                        <input type="checkbox" checked={true} />
                      </td>
                      <td>
                        <input type="checkbox" checked={false} />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <p>New trade</p>
                      </td>
                      <td>
                        <input type="checkbox" checked={true} />
                      </td>
                      <td>
                        <input type="checkbox" checked={true} />
                      </td>
                      <td>
                        <input type="checkbox" checked={false} />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <p>Buy paid for trade</p>
                      </td>
                      <td>
                        <input type="checkbox" checked={true} />
                      </td>
                      <td>
                        <input type="checkbox" checked={true} />
                      </td>
                      <td>
                        <input type="checkbox" checked={false} />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <p>Trade cancelled or expired</p>
                      </td>
                      <td>
                        <input type="checkbox" checked={true} />
                      </td>
                      <td>
                        <input type="checkbox" checked={true} />
                      </td>
                      <td>
                        <input type="checkbox" checked={false} />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <button className={transStyle.link_btn_gold}>SAVE</button>
            </div>
          ) : (
            <div className={transStyle.password}>
              <form>
                <div>
                  <input type="password" placeholder="Old Password" />
                  <svg
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
                </div>
                <input type="password" id="password" placeholder="Password" />
                <input
                  type="password"
                  id="confirmPassword"
                  placeholder="New Password"
                />
                <input
                  type="submit"
                  value="SAVE"
                  className={transStyle.link_btn_gold}
                />
              </form>
            </div>
          )}
        </div>

        {formTab === 1 ? (
          <div className={transStyle.profileInfo}>
            <div className={transStyle.profileTop}>
              <h2>Personal Information</h2>
            </div>
            <div className={transStyle.profileBody}>
              <form>
                <div>
                  <input type="text" placeholder="First Name" />
                  <input type="text" placeholder="username" />
                  <input type="text" placeholder="Last Name" />
                  <input type="email" placeholder="Email" />
                  <select>
                    <option value="timezone">Timezone</option>
                  </select>
                  <input type="tel" placeholder="Phone Number" />
                  <select>
                    <option value="timezone">Select Currency</option>
                  </select>
                </div>
                <input
                  type="submit"
                  value="SAVE"
                  className={transStyle.link_btn_gold}
                />
              </form>
            </div>
          </div>
        ) : null}
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  return { ...state.auth };
};
export default connect(mapStateToProps, null)(Home);
