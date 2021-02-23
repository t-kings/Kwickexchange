import React, { Component } from "react";
import transStyle from "./Index.module.css";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formTab: 1,
    };
  }
  render() {
    const { isAuthenticated, notifications } = this.props;
    const { formTab } = this.state;
    if (!isAuthenticated) {
      return (
        <Redirect to={{ pathname: "/", redirect_to: "/home/notifications" }} />
      );
    }
    return (
      <section className={transStyle.home}>
        <h1 className={transStyle.title}>NOTIFICATIONS</h1>
        <div className={transStyle.hold}>
          <div className={transStyle.tabs}>
            <button
              onClick={() => this.setState({ ...this.state, formTab: 1 })}
              className={formTab === 1 ? transStyle.active : ""}
            >
              Notifications
            </button>
          </div>
          {formTab === 1 ? (
            <div className={transStyle.notification}>
              {notifications.map((itm, idx) => (
                <Link
                  key={idx}
                  className={transStyle.item}
                  to={"/home/notifications/" + itm._id}
                >
                  <div className={transStyle.avatar}>
                    <div>
                      <svg
                        width="25"
                        height="30"
                        viewBox="0 0 25 30"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M20.8514 20.6569V20.864L20.9979 21.0105L23.868 23.8806V24.6818H0.735291V23.8806L3.60544 21.0105L3.75188 20.864V20.6569V13.1154C3.75188 8.64426 6.10259 5.02957 10.1545 4.06954L10.5392 3.97838V3.58301V2.55737C10.5392 1.58162 11.3259 0.794922 12.3017 0.794922C13.2774 0.794922 14.0641 1.58162 14.0641 2.55737V3.58301V3.97806L14.4484 4.06945C18.4859 5.02941 20.8514 8.65978 20.8514 13.1154V20.6569ZM14.7679 27.1901C14.534 28.3361 13.5136 29.2067 12.3017 29.2067C11.6342 29.2067 10.9941 28.9415 10.5222 28.4696C10.1698 28.1173 9.93277 27.6712 9.83523 27.1901H14.7679Z"
                          fill="#FFC700"
                          stroke="black"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className={transStyle.story}>
                    <p>{itm.title}</p>
                    {/* <p className={transStyle.date}>{3rd Jan. 2021}</p> */}
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  return { ...state.auth, ...state.resources };
};
export default connect(mapStateToProps, null)(Home);
