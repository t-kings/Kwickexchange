import React, { Component } from "react";
import transStyle from "./Index.module.css";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
class Notification extends Component {
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
      return (
        <Redirect
          to={{
            pathname: "/",
            redirect_to: "/home/notifications/" + this.props.match.params.id,
          }}
        />
      );
    }
    return (
      <section className={transStyle.home}>
        <Link className={transStyle.back} to="/home/notifications">
          <span>
            <svg
              width="12"
              height="20"
              viewBox="0 0 12 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11 1L2 10L11 19"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </span>
          <h1 className={transStyle.title}>NOTIFICATIONS</h1>
        </Link>
        <div className={transStyle.summary}>
          <div className={transStyle.card}>
            <div className={transStyle.cardTop}>
              <h2>Notification</h2>
            </div>
            <div className={transStyle.cardBody}>
              <ul>
                <li>
                  <p>
                    Your transaction to sell 0.0000342BTC was not successful was
                    no successful
                  </p>
                </li>
                <li>
                  <p>Date</p>
                  <h6>27th Jan. 2021</h6>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  return { ...state.auth };
};
export default connect(mapStateToProps, null)(Notification);
