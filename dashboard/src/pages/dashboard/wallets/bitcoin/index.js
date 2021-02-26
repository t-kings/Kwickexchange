import React, { Component } from "react";
import walletStyle from "./Index.module.css";
import { Link, NavLink, Redirect } from "react-router-dom";
import style from "../../Index.module.css";
import vc1 from "../images/vc1.svg";
import vc2 from "../images/vc2.svg";
import { connect } from "react-redux";
import vc3 from "../images/vc3.svg";
// import qr from "../images/qr.png";
import vcc1 from "../images/vc1.png";
import vcc2 from "../images/vc2.png";
import vcc3 from "../images/vc3.png";
import empty from "../images/empty.png";
import email from "../images/email.png";
import ad from "../images/ad.png";
import { generateAddress } from "../../../../store/actions/trade";
import Prompt from "../../../../components/dashboard/wallets/bitcoin/prompt";
import Email from "../../../../components/dashboard/wallets/bitcoin/email";
import Address from "../../../../components/dashboard/wallets/bitcoin/address";
class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formTab: 1,
      dollar: 0.0,
      btc: 0.0,
      qty: 1,
      giftCard: 0,
      country: 0,
      type: 25,
      total: 0,
      card: 0,
      denomination: 0,
      giftCards: [],
    };
  }

  render() {
    const { formTab } = this.state;
    const {
      isAuthenticated,
      balance,
      bitcoinDepositAddress,
      showNotification,
      bitcoinTransactionList,
      generateAddress,
      isLoading,
    } = this.props;
    if (!isAuthenticated) {
      return (
        <Redirect to={{ pathname: "/", redirect_to: "/home/wallet/bitcoin" }} />
      );
    }
    return (
      <>
        <Prompt />
        <Email />
        <Address />
        <section className={walletStyle.wallets}>
          {/* <div className={walletStyle.back}>
            <Link to="/home/wallet">
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
              <p>BTC Wallet</p>
            </Link>
          </div> */}
          <div className={walletStyle.balances}>
            <NavLink
              to="/home/wallet/bitcoin"
              className={
                style.card + " " + style.active + " " + walletStyle.balance
              }
            >
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
                <h4>BTC Wallet Ballance</h4>
                <h2>
                  {balance.fiat.symbol} {balance.bitcoin_in_fiat}
                </h2>
                <h3>{balance.bitcoin} BTC</h3>
              </div>
            </NavLink>
            <NavLink
              to="/home/wallet/naira"
              className={style.card + " " + walletStyle.balance}
            >
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
                <h4 style={{ color: "#00C844" }}>Naira Wallet Ballance</h4>
                <h2>₦{balance.naira}</h2>
              </div>
            </NavLink>
          </div>
          <div className={walletStyle.hold}>
            <div className={walletStyle.tabs}>
              <button
                onClick={() => this.setState({ ...this.state, formTab: 1 })}
                className={formTab === 1 ? walletStyle.active : ""}
              >
                Address
              </button>
              <button
                onClick={() => this.setState({ ...this.state, formTab: 2 })}
                className={formTab === 2 ? walletStyle.active : ""}
              >
                Transactions
              </button>
              <button
                onClick={() => this.setState({ ...this.state, formTab: 3 })}
                className={formTab === 3 ? walletStyle.active : " "}
              >
                Send
              </button>
            </div>
            {formTab === 1 ? (
              <div className={walletStyle.balance_tab}>
                <img
                  src={vcc1}
                  alt="holders"
                  className={walletStyle.vcHolders}
                />
                <img
                  src={vcc2}
                  alt="holders"
                  className={walletStyle.vcHolders}
                />
                <img
                  src={vcc3}
                  alt="holders"
                  className={walletStyle.vcHolders}
                />
                <div className={walletStyle.balance_tab_hold}>
                  <div className={walletStyle.text}>
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
                    <div className={walletStyle.address}>
                      <p>Your BTC Wallet Address</p>
                      <svg
                        onClick={() => {
                          const copyText = document.querySelector("#myInput");
                          copyText.select();
                          document.execCommand("copy");
                          showNotification(
                            "Address",
                            true,
                            "Copied to clip board"
                          );
                        }}
                        width="14"
                        height="16"
                        viewBox="0 0 14 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11.5 0.780016C11.5 0.677163 11.4797 0.575325 11.4402 0.480364C11.4006 0.385402 11.3427 0.299193 11.2698 0.226697C11.1968 0.154202 11.1102 0.0968521 11.015 0.0579488C10.9198 0.0190454 10.8179 -0.000643288 10.715 1.60272e-05H0.785C0.682149 -0.000643288 0.580183 0.0190454 0.484971 0.0579488C0.389759 0.0968521 0.303182 0.154202 0.230222 0.226697C0.157262 0.299193 0.0993595 0.385402 0.0598485 0.480364C0.0203376 0.575325 -2.11305e-06 0.677163 1.64649e-10 0.780016V13.22C-2.11305e-06 13.3229 0.0203376 13.4247 0.0598485 13.5197C0.0993595 13.6146 0.157262 13.7008 0.230222 13.7733C0.303182 13.8458 0.389759 13.9032 0.484971 13.9421C0.580183 13.981 0.682149 14.0007 0.785 14H1.045V1.03502H11.5V0.780016Z"
                          fill="black"
                        />
                        <path
                          d="M12.75 2H2.75C2.33579 2 2 2.33579 2 2.75V15.25C2 15.6642 2.33579 16 2.75 16H12.75C13.1642 16 13.5 15.6642 13.5 15.25V2.75C13.5 2.33579 13.1642 2 12.75 2Z"
                          fill="black"
                        />
                      </svg>
                    </div>
                    <input
                      type="text"
                      value={bitcoinDepositAddress.address}
                      readOnly
                      id="myInput"
                    />
                    {isLoading ? (
                      <div
                        style={{ marginTop: 20 }}
                        className={
                          walletStyle.load + " " + walletStyle.link_btn_gold
                        }
                      >
                        <div className={walletStyle.loader}>Loading...</div>
                      </div>
                    ) : (
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          generateAddress();
                        }}
                        style={{ marginTop: 20 }}
                        className={walletStyle.link_btn_gold}
                      >
                        Generate New Address
                      </button>
                    )}
                  </div>
                  <div className={walletStyle.qr}>
                    {/* <img src={qr} alt="qr-code" />
                  <p>Scan QR code to receive BTC in your wallet</p> */}
                  </div>
                </div>
              </div>
            ) : formTab === 2 ? (
              <div className={walletStyle.transactions}>
                {bitcoinTransactionList.data.length > 0 ? (
                  <div className={walletStyle.transactions_list}>
                    <div className={walletStyle.transactions_list_hold}>
                      <table>
                        <thead>
                          <tr>
                            <th>Date</th>
                            <th>Trans. Type</th>
                            <th>Amount</th>
                          </tr>
                        </thead>
                        <tbody>
                          {bitcoinTransactionList.data.map((itm, idx) => (
                            <tr key={idx}>
                              <td>{itm.createdAt}</td>
                              <td>
                                {itm.asset} - {itm.type}
                              </td>
                              <td
                                className={
                                  itm.status === "successful"
                                    ? walletStyle.green
                                    : walletStyle.red
                                }
                              >
                                {itm.amount} BTC
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ) : (
                  <div className={walletStyle.transactions_empty}>
                    <div className={walletStyle.transactions_empty_hold}>
                      <img src={empty} alt="empty" />
                      <p>You have no transactions yet!</p>
                      <Link
                        to="/home/bitcoin"
                        className={walletStyle.link_btn_gold}
                      >
                        BUY BTC
                      </Link>
                    </div>
                    <img
                      src={vcc1}
                      alt="holders"
                      className={walletStyle.vcHolders}
                    />
                    <img
                      src={vcc2}
                      alt="holders"
                      className={walletStyle.vcHolders}
                    />
                    <img
                      src={vcc3}
                      alt="holders"
                      className={walletStyle.vcHolders}
                    />
                  </div>
                )}
              </div>
            ) : (
              <div className={walletStyle.send}>
                <img
                  src={vcc1}
                  alt="holders"
                  className={walletStyle.vcHolders}
                />
                <img
                  src={vcc2}
                  alt="holders"
                  className={walletStyle.vcHolders}
                />
                <img
                  src={vcc3}
                  alt="holders"
                  className={walletStyle.vcHolders}
                />
                <div className={walletStyle.send_hold}>
                  <h1>Select Method of Transfer for BTC</h1>
                  <div className={walletStyle.actions}>
                    <div className={walletStyle.action}>
                      <img src={ad} alt="email" />
                      <p>Send to users BTC address</p>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          document.querySelector(
                            "#sendBtcAddress"
                          ).style.display = "flex";
                        }}
                        className={walletStyle.link_btn_gold}
                      >
                        <span>BTC ADDRESS</span>
                        <svg
                          width="13"
                          height="13"
                          viewBox="0 0 13 13"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M0 11.501C0 11.8988 0.158035 12.2803 0.43934 12.5616C0.720644 12.8429 1.10218 13.001 1.5 13.001H11.5C11.8978 13.001 12.2794 12.8429 12.5607 12.5616C12.842 12.2803 13 11.8988 13 11.501V6.50098C13 6.36837 12.9473 6.24119 12.8536 6.14742C12.7598 6.05366 12.6326 6.00098 12.5 6.00098C12.3674 6.00098 12.2402 6.05366 12.1464 6.14742C12.0527 6.24119 12 6.36837 12 6.50098V11.501C12 11.6336 11.9473 11.7608 11.8536 11.8545C11.7598 11.9483 11.6326 12.001 11.5 12.001H1.5C1.36739 12.001 1.24021 11.9483 1.14645 11.8545C1.05268 11.7608 1 11.6336 1 11.501V1.50098C1 1.36837 1.05268 1.24119 1.14645 1.14742C1.24021 1.05366 1.36739 1.00098 1.5 1.00098H5.5C5.63261 1.00098 5.75979 0.948298 5.85355 0.85453C5.94732 0.760762 6 0.633585 6 0.500977C6 0.368368 5.94732 0.241191 5.85355 0.147423C5.75979 0.053655 5.63261 0.000976563 5.5 0.000976562H1.5C1.10218 0.000976563 0.720644 0.159012 0.43934 0.440316C0.158035 0.721621 0 1.10315 0 1.50098V11.501Z"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M10 8.50098C10 8.63358 9.94732 8.76076 9.85355 8.85453C9.75979 8.9483 9.63261 9.00098 9.5 9.00098H4.5C4.36739 9.00098 4.24021 8.9483 4.14645 8.85453C4.05268 8.76076 4 8.63358 4 8.50098V3.50098C4 3.36837 4.05268 3.24119 4.14645 3.14742C4.24021 3.05366 4.36739 3.00098 4.5 3.00098C4.63261 3.00098 4.75979 3.05366 4.85355 3.14742C4.94732 3.24119 5 3.36837 5 3.50098V8.00098H9.5C9.63261 8.00098 9.75979 8.05365 9.85355 8.14742C9.94732 8.24119 10 8.36837 10 8.50098Z"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M4.14592 8.85463C4.09935 8.80819 4.06241 8.75301 4.0372 8.69226C4.012 8.63152 3.99902 8.5664 3.99902 8.50063C3.99902 8.43486 4.012 8.36974 4.0372 8.309C4.06241 8.24825 4.09935 8.19308 4.14592 8.14663L12.1459 0.146632C12.1924 0.100144 12.2476 0.0632673 12.3083 0.0381082C12.3691 0.0129491 12.4342 0 12.4999 0C12.5657 0 12.6308 0.0129491 12.6915 0.0381082C12.7522 0.0632673 12.8074 0.100144 12.8539 0.146632C12.9004 0.19312 12.9373 0.248309 12.9624 0.309048C12.9876 0.369788 13.0005 0.434888 13.0005 0.500632C13.0005 0.566375 12.9876 0.631476 12.9624 0.692215C12.9373 0.752954 12.9004 0.808144 12.8539 0.854632L4.85392 8.85463C4.80747 8.90119 4.7523 8.93814 4.69155 8.96334C4.63081 8.98855 4.56568 9.00152 4.49992 9.00152C4.43415 9.00152 4.36903 8.98855 4.30828 8.96334C4.24754 8.93814 4.19236 8.90119 4.14592 8.85463Z"
                          />
                        </svg>
                      </button>
                    </div>
                    <div className={walletStyle.action}>
                      <img src={email} alt="email" />
                      <p>Send to users on this platform via email</p>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          document.querySelector(
                            "#sendBtcEmail"
                          ).style.display = "flex";
                        }}
                        className={walletStyle.link_btn_gold}
                      >
                        <span>Email</span>
                        <svg
                          width="13"
                          height="13"
                          viewBox="0 0 13 13"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M0 11.501C0 11.8988 0.158035 12.2803 0.43934 12.5616C0.720644 12.8429 1.10218 13.001 1.5 13.001H11.5C11.8978 13.001 12.2794 12.8429 12.5607 12.5616C12.842 12.2803 13 11.8988 13 11.501V6.50098C13 6.36837 12.9473 6.24119 12.8536 6.14742C12.7598 6.05366 12.6326 6.00098 12.5 6.00098C12.3674 6.00098 12.2402 6.05366 12.1464 6.14742C12.0527 6.24119 12 6.36837 12 6.50098V11.501C12 11.6336 11.9473 11.7608 11.8536 11.8545C11.7598 11.9483 11.6326 12.001 11.5 12.001H1.5C1.36739 12.001 1.24021 11.9483 1.14645 11.8545C1.05268 11.7608 1 11.6336 1 11.501V1.50098C1 1.36837 1.05268 1.24119 1.14645 1.14742C1.24021 1.05366 1.36739 1.00098 1.5 1.00098H5.5C5.63261 1.00098 5.75979 0.948298 5.85355 0.85453C5.94732 0.760762 6 0.633585 6 0.500977C6 0.368368 5.94732 0.241191 5.85355 0.147423C5.75979 0.053655 5.63261 0.000976563 5.5 0.000976562H1.5C1.10218 0.000976563 0.720644 0.159012 0.43934 0.440316C0.158035 0.721621 0 1.10315 0 1.50098V11.501Z"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M10 8.50098C10 8.63358 9.94732 8.76076 9.85355 8.85453C9.75979 8.9483 9.63261 9.00098 9.5 9.00098H4.5C4.36739 9.00098 4.24021 8.9483 4.14645 8.85453C4.05268 8.76076 4 8.63358 4 8.50098V3.50098C4 3.36837 4.05268 3.24119 4.14645 3.14742C4.24021 3.05366 4.36739 3.00098 4.5 3.00098C4.63261 3.00098 4.75979 3.05366 4.85355 3.14742C4.94732 3.24119 5 3.36837 5 3.50098V8.00098H9.5C9.63261 8.00098 9.75979 8.05365 9.85355 8.14742C9.94732 8.24119 10 8.36837 10 8.50098Z"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M4.14592 8.85463C4.09935 8.80819 4.06241 8.75301 4.0372 8.69226C4.012 8.63152 3.99902 8.5664 3.99902 8.50063C3.99902 8.43486 4.012 8.36974 4.0372 8.309C4.06241 8.24825 4.09935 8.19308 4.14592 8.14663L12.1459 0.146632C12.1924 0.100144 12.2476 0.0632673 12.3083 0.0381082C12.3691 0.0129491 12.4342 0 12.4999 0C12.5657 0 12.6308 0.0129491 12.6915 0.0381082C12.7522 0.0632673 12.8074 0.100144 12.8539 0.146632C12.9004 0.19312 12.9373 0.248309 12.9624 0.309048C12.9876 0.369788 13.0005 0.434888 13.0005 0.500632C13.0005 0.566375 12.9876 0.631476 12.9624 0.692215C12.9373 0.752954 12.9004 0.808144 12.8539 0.854632L4.85392 8.85463C4.80747 8.90119 4.7523 8.93814 4.69155 8.96334C4.63081 8.98855 4.56568 9.00152 4.49992 9.00152C4.43415 9.00152 4.36903 8.98855 4.30828 8.96334C4.24754 8.93814 4.19236 8.90119 4.14592 8.85463Z"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <img src={vc1} className={walletStyle.vc} alt="vector" />
            <img src={vc2} className={walletStyle.vc} alt="vector" />
            <img src={vc3} className={walletStyle.vc} alt="vector" />
          </div>
        </section>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return { ...state.auth, ...state.resources, ...state.trade };
};
const mapDispatchToProps = (dispatch) => {
  return {
    generateAddress: () => dispatch(generateAddress()),
    showNotification: (type, isSuccess, message) =>
      dispatch((dispatch, getState) => {
        dispatch({
          type: "SHOW_NOTIFICATION",
          data: { type, isSuccess, message },
        });
        setTimeout(() => {
          dispatch({
            type: "CLEAR_NOTIFICATION",
          });
        }, 5000);
      }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Index);
