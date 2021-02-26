import React, { Component } from "react";
import walletStyle from "./Index.module.css";
import { Link, Redirect, NavLink } from "react-router-dom";
import style from "../../Index.module.css";
import { connect } from "react-redux";
import ad from "../images/ad.png";
import vc1 from "../images/vc1.svg";
import vc2 from "../images/vc2.svg";
import vc3 from "../images/vc3.svg";
import empty from "../images/empty.png";
import vcc1 from "../images/vc1.png";
import vcc2 from "../images/vc2.png";
import vcc3 from "../images/vc3.png";
import { apiUrl } from "../../../../helpers/config";
import axios from "axios";
import SelectBank from "../../../../components/dashboard/wallets/naira/bank";
import Summary from "../../../../components/dashboard/wallets/naira/summary";
import Email from "../../../../components/dashboard/wallets/naira/email";
import Account from "../../../../components/dashboard/wallets/naira/account";
import Delete from "../../../../components/dashboard/wallets/naira/delete";
class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formTab: 1,
      isWithdrawal: false,
      transTab: 1,
      bank_name: "",
      account_name: "",
      amount: "",
      bank: {},
      account_number: "",
      errors: {
        bank_name: [],
        account_name: [],
        amount: [],
        account_number: [],
      },
    };
  }
  handleChange = (e) => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value,
    });
  };

  handleBank = async (e) => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value,
    });
    const { account_number } = this.state;
    const { banks, showNotification } = this.props;
    const bank = banks.find((bank) => bank.code.toString() === e.target.value);
    if (e.target.value.length > 0 && account_number.length > 9) {
      try {
        const res = await axios.post(
          apiUrl + "wallet/naira/resolve",
          {
            account_number: account_number.toString(),
            bank_code: bank.code,
          },
          {
            headers: {
              Accept: "application/json",
              Authorization: "Bearer " + this.props.accessToken,
            },
          }
        );
        if (res.status === 200) {
          this.setState({
            ...this.state,
            [e.target.name]: e.target.value,
            account_name: res.data.data.account_name,
            bank,
            errors: {
              ...this.state.errors,
              account_name: [],
            },
          });
        } else {
          this.setState({
            ...this.state,
            [e.target.name]: e.target.value,
            account_name: "",
            bank,
          });
        }
      } catch (error) {
        if (error.response?.status === 400) {
          showNotification(
            "Account Number",
            false,
            JSON.stringify(error.response?.data.data)
          );
        }
        this.setState({
          ...this.state,
          [e.target.name]: e.target.value,
          account_name: "",
          bank,
        });
      }
    } else {
      this.setState({
        ...this.state,
        [e.target.name]: e.target.value,
        account_name: "",
        bank,
      });
    }
  };

  handleName = async (e) => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value,
    });
    const { bank_name, bank } = this.state;
    const { showNotification } = this.props;
    if (e.target.value.length > 9 && bank_name.length > 0) {
      try {
        const res = await axios.post(
          apiUrl + "wallet/naira/resolve",
          {
            account_number: e.target.value.toString(),
            bank_code: bank.code,
          },
          {
            headers: {
              Accept: "application/json",
              Authorization: "Bearer " + this.props.accessToken,
            },
          }
        );
        if (res.status === 200) {
          this.setState({
            ...this.state,
            [e.target.name]: e.target.value,
            account_name: res.data.data.account_name,
            errors: {
              ...this.state.errors,
              account_name: [],
            },
          });
        } else {
          this.setState({
            ...this.state,
            [e.target.name]: e.target.value,
            account_name: "",
          });
        }
      } catch (error) {
        if (error.response?.status === 400) {
          showNotification(
            "Account Number",
            false,
            JSON.stringify(error.response?.data.data)
          );
        }
        this.setState({
          ...this.state,
          [e.target.name]: e.target.value,
          account_name: "",
        });
      }
    } else {
      this.setState({
        ...this.state,
        [e.target.name]: e.target.value,
        account_name: "",
      });
    }
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const errors = {
      bank_name: [],
      account_name: [],
      account_number: [],
      amount: [],
    };
    this.setState({
      ...this.state,
      errors,
    });
    const { account_number, account_name, bank_name, amount } = this.state;
    if (account_name.length < 1) {
      errors.account_name.push("Account Name is required");
    }
    if (account_number.length < 1) {
      errors.account_number.push("Account Number is required");
    }
    if (bank_name.length < 1) {
      errors.bank_name.push("Bank Name is required");
    }

    if (amount.length < 1) {
      errors.amount.push("Amount is required");
    }

    if (
      errors.account_name.length > 0 ||
      errors.account_number.length > 0 ||
      errors.amount.length > 0 ||
      errors.bank_name.length > 0
    ) {
      this.setState({
        ...this.state,
        errors,
      });
    } else {
      this.setState({
        ...this.state,
        isWithdrawal: true,
      });
      document.querySelector("#nairaSummary").style.display = "flex";
    }
  };
  render() {
    const {
      formTab,
      errors,
      bank_name,
      amount,
      account_name,
      account_number,
      accountToDelete,
      transTab,
    } = this.state;

    const {
      isAuthenticated,
      balance,
      user,
      banks,
      userBanks,
      nairaTransactions,
    } = this.props;
    if (!isAuthenticated) {
      return (
        <Redirect to={{ pathname: "/", redirect_to: "/home/wallet/naira" }} />
      );
    }
    return (
      <>
        <SelectBank
          mySetState={(e) => {
            this.setState({
              ...this.state,
              ...e,
            });
          }}
        />
        <Email />
        <Summary onwProps={this.state} />
        <Account />
        <Delete accountToDelete={accountToDelete} />
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
              <p>Naira Wallet</p>
            </Link>
          </div> */}
          <div className={walletStyle.balances}>
            <NavLink
              to="/home/wallet/bitcoin"
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
                <h4 style={{ color: "#0094FF" }}>BTC Wallet Ballance</h4>
                <h2>
                  {balance.fiat.symbol} {balance.bitcoin_in_fiat}
                </h2>
                <h3>{balance.bitcoin} BTC</h3>
              </div>
            </NavLink>
            <NavLink
              to="/home/wallet/naira"
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
                <h4>Naira Wallet Ballance</h4>
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
                Withdraw
              </button>
              <button
                onClick={() => this.setState({ ...this.state, formTab: 2 })}
                className={formTab === 2 ? walletStyle.active : ""}
              >
                Bank Account
              </button>
              <button
                onClick={() => this.setState({ ...this.state, formTab: 3 })}
                className={formTab === 3 ? walletStyle.active : " "}
              >
                Transactions
              </button>
            </div>
            {formTab === 1 ? (
              transTab === 1 ? (
                <div className={walletStyle.balance_tab_hold}>
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
                  <div className={walletStyle.balance_tab}>
                    <img src={ad} alt="card" />
                    <p>Withdraw and Transfer money from your naira Wallet</p>
                    <div className={walletStyle.address}>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          this.setState({
                            ...this.state,
                            transTab: 2,
                          });
                        }}
                        className={walletStyle.link_btn_gold}
                      >
                        <span>Withdraw</span>
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

                      <button
                        onClick={(e) => {
                          e.preventDefault();

                          this.setState({
                            ...this.state,
                            isWithdrawal: false,
                          });
                          document.querySelector(
                            "#sendNairaEmail"
                          ).style.display = "flex";
                        }}
                        className={walletStyle.link_btn_gold}
                      >
                        <span>Transfer</span>
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
              ) : (
                <div className={walletStyle.withdrawHold}>
                  <div className={walletStyle.withdraw}>
                    <div className={walletStyle.holdAccounts}>
                      <div>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            this.setState({
                              ...this.state,
                              transTab: 1,
                            });
                          }}
                        >
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
                        </button>
                      </div>
                      <h1 style={{ width: "100%", textAlign: "center" }}>
                        Withdraw to bank account
                      </h1>
                      <div></div>
                    </div>
                    <div className={walletStyle.withDrawAccountsList}>
                      {!user.phoneNumberVerified ? (
                        <p className={walletStyle.verify}>
                          Your Phone number is not verified.{" "}
                          <Link to={"/home/settings/" + 4}>Verify Now</Link>
                        </p>
                      ) : null}
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          document.querySelector("#bankList").style.display =
                            "flex";
                        }}
                        className={walletStyle.choose}
                      >
                        Choose from saved Account
                      </button>
                      <form
                        className={walletStyle.box}
                        onSubmit={this.handleSubmit}
                      >
                        <label
                          className={
                            walletStyle.control_label +
                            " " +
                            (errors.bank_name.length > 0
                              ? walletStyle.error
                              : " ")
                          }
                          htmlFor="bank_name"
                        >
                          Select Bank
                        </label>
                        <select
                          value={bank_name}
                          className={
                            walletStyle.form_control +
                            " " +
                            (errors.bank_name.length > 0
                              ? walletStyle.error
                              : " ")
                          }
                          id="bank_name"
                          name="bank_name"
                          onChange={this.handleBank}
                          required
                        >
                          <option value="">Select Bank</option>
                          {banks.map((itm, idx) => (
                            <option key={idx} value={itm.code.toString()}>
                              {itm.name}
                            </option>
                          ))}
                        </select>
                        {errors.bank_name.map((item, idx) => (
                          <p key={idx} className={walletStyle.error_par}>
                            {item}
                          </p>
                        ))}

                        <label
                          className={
                            walletStyle.control_label +
                            " " +
                            (errors.account_number.length > 0
                              ? walletStyle.error
                              : " ")
                          }
                          htmlFor="account_number"
                        >
                          Account Number
                        </label>
                        <input
                          value={account_number}
                          type="text"
                          className={
                            walletStyle.form_control +
                            " " +
                            (errors.account_number.length > 0
                              ? walletStyle.error
                              : " ")
                          }
                          id="account_number"
                          name="account_number"
                          onChange={this.handleName}
                          required
                        />
                        {errors.account_number.map((item, idx) => (
                          <p key={idx} className={walletStyle.error_par}>
                            {item}
                          </p>
                        ))}

                        <label
                          className={
                            walletStyle.control_label +
                            " " +
                            (errors.account_name.length > 0
                              ? walletStyle.error
                              : " ")
                          }
                          htmlFor="account_name"
                        >
                          Account Name
                        </label>
                        <input
                          value={account_name}
                          type="text"
                          className={
                            walletStyle.form_control +
                            " " +
                            (errors.account_name.length > 0
                              ? walletStyle.error
                              : " ")
                          }
                          id="account_name"
                          name="account_name"
                          style={{
                            cursor: "not-allowed",
                            background: "rgb(128, 128, 128, 0.2)",
                          }}
                          readOnly
                          onChange={this.handleChange}
                          required
                        />
                        {errors.account_name.map((item, idx) => (
                          <p key={idx} className={walletStyle.error_par}>
                            {item}
                          </p>
                        ))}

                        <label
                          className={
                            walletStyle.control_label +
                            " " +
                            (errors.amount.length > 0 ? walletStyle.error : " ")
                          }
                          htmlFor="amount"
                        >
                          Amount
                        </label>
                        <input
                          value={amount}
                          type="number"
                          placeholder="amount"
                          id="amount"
                          step="any"
                          name="amount"
                          required
                          onChange={this.handleChange}
                          className={
                            walletStyle.form_control +
                            " " +
                            (errors.amount.length > 0 ? walletStyle.error : " ")
                          }
                        />
                        {errors.amount.map((item, idx) => (
                          <p key={idx} className={walletStyle.error_par}>
                            {item}
                          </p>
                        ))}
                        <input
                          type="submit"
                          value="SEND"
                          className={walletStyle.link_btn_gold}
                        />
                      </form>
                    </div>
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
              )
            ) : formTab === 2 ? (
              <div className={walletStyle.saved_accountsHold}>
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
                <div
                  className={
                    walletStyle.transactions + " " + walletStyle.saved_accounts
                  }
                >
                  {userBanks.length > 0 ? (
                    <div className={walletStyle.bank_lists}>
                      <div className={walletStyle.holdAccounts}>
                        <div></div>
                        <h1>Saved Accounts</h1>
                        <div>
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              document.querySelector("#addBank").style.display =
                                "flex";
                            }}
                            className={walletStyle.link_btn_gold}
                          >
                            Add +
                          </button>
                        </div>
                      </div>
                      <ul className={walletStyle.accounts_list}>
                        {userBanks.map((itm, idx) => (
                          <li key={idx}>
                            <div className={walletStyle.first}>
                              <p>{itm.account_name}</p>
                              <p>{itm.bank_name}</p>
                              <p>{itm.account_number}</p>
                            </div>

                            <div className={walletStyle.second}>
                              <button
                                onClick={(e) => {
                                  e.preventDefault();
                                  this.setState({
                                    ...this.state,
                                    accountToDelete: itm.id,
                                  });
                                  document.querySelector(
                                    "#deleteAccountPrompt"
                                  ).style.display = "flex";
                                }}
                                className={walletStyle.red}
                              >
                                Delete
                              </button>
                              {/* <button
                              onClick={(e) => {
                                e.preventDefault();
                                document.querySelector(
                                  "#addBank"
                                ).style.display = "flex";
                              }}
                            >
                              Edit
                            </button> */}
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <div className={walletStyle.transactions_empty}>
                      <h1>Saved Accounts</h1>
                      <img src={empty} alt="empty" />
                      <p>No account added yet!</p>
                      <Link
                        to="/home/wallet/naira"
                        onClick={(e) => {
                          e.preventDefault();
                          document.querySelector("#addBank").style.display =
                            "flex";
                        }}
                        className={walletStyle.link_btn_gold}
                      >
                        <span>ADD ACCOUNT</span>
                        <span>+</span>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className={walletStyle.transactionsHold}>
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
                <div className={walletStyle.transactions}>
                  {nairaTransactions.data.length > 0 ? (
                    <div className={walletStyle.transactions_list}>
                      <table>
                        <thead>
                          <tr>
                            <th>Date</th>
                            <th>Trans. Type</th>
                            <th>Amount</th>
                          </tr>
                        </thead>
                        <tbody>
                          {nairaTransactions.data.map((itm, idx) => (
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
                  ) : (
                    <div className={walletStyle.transactions_empty}>
                      <img src={empty} alt="empty" />
                      <p>You have no naira transactions yet!</p>
                    </div>
                  )}
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
