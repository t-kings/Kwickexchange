import React, { Component } from "react";
import walletStyle from "./wallet.module.css";
import { Link, Redirect } from "react-router-dom";
import style from "../Index.module.css";
import { connect } from "react-redux";
import bg1 from "./images/bg.svg";
import bg2 from "./images/bg2.svg";
import bg3 from "./images/bg3.svg";
class Home extends Component {
  render() {
    const { isAuthenticated, balance } = this.props;
    if (!isAuthenticated) {
      return <Redirect to={{ pathname: "/", redirect_to: "/home/wallet" }} />;
    }
    return <Redirect to="/home/wallet/bitcoin" />;
    return (
      <section className={walletStyle.wallets}>
        <div className={walletStyle.walletsHolder}>
          <div className={walletStyle.balances}>
            <div className={style.card + " " + walletStyle.balance}>
              <svg
                className={walletStyle.flier}
                viewBox="0 0 687 313"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  opacity="0.1"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M0 -6C12.8066 172.315 161.527 313 343.105 313C524.684 313 673.404 172.315 686.211 -6H598.905C586.336 124.206 476.608 226 343.105 226C209.603 226 99.8752 124.206 87.3059 -6H0Z"
                  fill="#0094FF"
                />
              </svg>
              <svg
                className={walletStyle.second_flier}
                viewBox="0 0 687 313"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  opacity="0.1"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M0 -6C12.8066 172.315 161.527 313 343.105 313C524.684 313 673.404 172.315 686.211 -6H598.905C586.336 124.206 476.608 226 343.105 226C209.603 226 99.8752 124.206 87.3059 -6H0Z"
                  fill="#0094FF"
                />
              </svg>
              <div>
                <span className={walletStyle.btc}>
                  <svg
                    width="13"
                    height="18"
                    viewBox="0 0 13 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2 10V14H0V16H3V18H5V16H7V18H9V15.949C10.968 15.7 12.5 14.034 12.5 12C12.5 10.68 11.85 9.516 10.86 8.787C11.5901 8.04302 11.9994 7.0424 12 6C12 4.142 10.721 2.589 9 2.142V0H7V2H5V0H3V2H0V4H2V10ZM8.5 14H4V10H8.5C9.603 10 10.5 10.897 10.5 12C10.5 13.103 9.603 14 8.5 14ZM4 4H8C9.103 4 10 4.897 10 6C10 7.103 9.103 8 8 8H4V4Z"
                      fill="#0094FF"
                    />
                  </svg>
                </span>
                <h3>{balance.bitcoin} BTC</h3>
                <p>BTC Wallet Balance</p>
                <Link
                  to="/home/wallet/bitcoin"
                  className={walletStyle.link_btn_gold}
                >
                  More
                </Link>
              </div>
            </div>
            <div className={style.card + " " + walletStyle.balance}>
              <svg
                className={walletStyle.flier}
                viewBox="0 0 687 313"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  opacity="0.1"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M0 -6C12.8066 172.315 161.527 313 343.105 313C524.684 313 673.404 172.315 686.211 -6H598.905C586.336 124.206 476.608 226 343.105 226C209.603 226 99.8752 124.206 87.3059 -6H0Z"
                  fill=" #00C844"
                />
              </svg>
              <svg
                className={walletStyle.second_flier}
                viewBox="0 0 687 313"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  opacity="0.1"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M0 -6C12.8066 172.315 161.527 313 343.105 313C524.684 313 673.404 172.315 686.211 -6H598.905C586.336 124.206 476.608 226 343.105 226C209.603 226 99.8752 124.206 87.3059 -6H0Z"
                  fill=" #00C844"
                />
              </svg>
              <div>
                <span className={walletStyle.naira}>
                  <svg
                    width="14"
                    height="16"
                    viewBox="0 0 14 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1.13708 15.0743H2.84451V2.46401L10.2708 15.0743H12.3279V0.365723H10.6205V12.5234L3.46166 0.365723H1.13708V15.0743Z"
                      fill="#00C844"
                    />
                    <rect y="5" width="14" height="2" fill="#00C844" />
                    <rect y="9" width="14" height="2" fill="#00C844" />
                  </svg>
                </span>
                <h3>₦ {balance.naira}</h3>
                <p>Naira Wallet Balance</p>
                <Link
                  to="/home/wallet/naira"
                  className={walletStyle.link_btn_gold}
                >
                  More
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className={walletStyle._flier}>
          <img src={bg1} alt="bg" />
        </div>
        <div className={walletStyle._flier}>
          <img src={bg2} alt="bg" />
        </div>
        <div className={walletStyle._flier}>
          <img src={bg3} alt="bg" />
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  return { ...state.auth, ...state.resources };
};
export default connect(mapStateToProps, null)(Home);
