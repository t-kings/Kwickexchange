import React, { Component } from "react";
import transStyle from "./Index.module.css";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Summary from "../../../components/dashboard/transactions";
import {
  getAllTradeHistoryOffset,
  getActiveTradeHistoryOffset,
  getPendingTradeHistoryOffset,
  getCancelledTradeHistoryOffset,
  getCompletedTradeHistoryOffset,
} from "../../../store/actions/resources";
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formTab: 1,
      trans: {},
      allTradeHistoryState: [],
      activeTradeHistoryState: [],
      pendingTradeHistoryState: [],
      cancelledTradeHistoryState: [],
      completedTradeHistoryState: [],
      allTradeHistorySearch: false,
      activeTradeHistorySearch: false,
      pendingTradeHistorySearch: false,
      cancelledTradeHistorySearch: false,
      completedTradeHistorySearch: false,
    };
  }
  openViewModal = (itm) => {
    try {
      this.setState({
        ...this.state,
        trans: itm,
      });
      document.querySelector("#transModal").style.display = "flex";
    } catch (e) {
      // console.log(e);
    }
  };
  componentDidMount = () => {
    const { tab } = this.props.match.params;
    if (tab) {
      this.setState({
        ...this.state,
        formTab: parseInt(tab),
      });
    }
  };

  handleAllTransactionSearch = (e) => {
    if (e) {
      const allTradeHistoryState = this.props.allTradeHistory.data.filter(
        (trade) => JSON.stringify(trade).toLowerCase().includes(e.toLowerCase())
      );
      this.setState({
        ...this.state,
        allTradeHistoryState,
        allTradeHistorySearch: true,
      });
    } else {
      this.setState({
        ...this.state,
        allTradeHistoryState: this.props.allTradeHistory,
        allTradeHistorySearch: false,
      });
    }
  };

  handlePendingTransactionSearch = (e) => {
    if (e) {
      const pendingTradeHistoryState = this.props.pendingTradeHistory.data.filter(
        (trade) => JSON.stringify(trade).toLowerCase().includes(e.toLowerCase())
      );
      this.setState({
        ...this.state,
        pendingTradeHistoryState,
        pendingTradeHistorySearch: true,
      });
    } else {
      this.setState({
        ...this.state,
        pendingTradeHistoryState: this.props.pendingTradeHistory,
        pendingTradeHistorySearch: false,
      });
    }
  };

  handleActiveTransactionSearch = (e) => {
    if (e) {
      const activeTradeHistoryState = this.props.activeTradeHistory.data.filter(
        (trade) => JSON.stringify(trade).toLowerCase().includes(e.toLowerCase())
      );
      this.setState({
        ...this.state,
        activeTradeHistoryState,
        activeTradeHistorySearch: true,
      });
    } else {
      this.setState({
        ...this.state,
        activeTradeHistoryState: this.props.activeTradeHistory,
        activeTradeHistorySearch: false,
      });
    }
  };

  handleCancelledTransactionSearch = (e) => {
    if (e) {
      const cancelledTradeHistoryState = this.props.cancelledTradeHistory.data.filter(
        (trade) => JSON.stringify(trade).toLowerCase().includes(e.toLowerCase())
      );
      this.setState({
        ...this.state,
        cancelledTradeHistoryState,
        cancelledTradeHistorySearch: true,
      });
    } else {
      this.setState({
        ...this.state,
        cancelledTradeHistoryState: this.props.cancelledTradeHistory,
        cancelledTradeHistorySearch: false,
      });
    }
  };

  handleCompletedTransactionSearch = (e) => {
    if (e) {
      const completedTradeHistoryState = this.props.completedTradeHistory.data.filter(
        (trade) => JSON.stringify(trade).toLowerCase().includes(e.toLowerCase())
      );
      this.setState({
        ...this.state,
        completedTradeHistoryState,
        completedTradeHistorySearch: true,
      });
    } else {
      this.setState({
        ...this.state,
        completedTradeHistoryState: this.props.completedTradeHistory,
        completedTradeHistorySearch: false,
      });
    }
  };
  render() {
    const {
      isAuthenticated,
      allTradeHistory,
      activeTradeHistory,
      pendingTradeHistory,
      cancelledTradeHistory,
      completedTradeHistory,
      getAllTradeHistoryOffset,
      getActiveTradeHistoryOffset,
      getPendingTradeHistoryOffset,
      getCancelledTradeHistoryOffset,
      getCompletedTradeHistoryOffset,
    } = this.props;
    const {
      formTab,
      allTradeHistoryState,
      activeTradeHistoryState,
      pendingTradeHistoryState,
      cancelledTradeHistoryState,
      completedTradeHistoryState,
      allTradeHistorySearch,
      activeTradeHistorySearch,
      pendingTradeHistorySearch,
      cancelledTradeHistorySearch,
      completedTradeHistorySearch,
    } = this.state;
    if (!isAuthenticated) {
      return (
        <Redirect to={{ pathname: "/", redirect_to: "/home/transactions" }} />
      );
    }
    return (
      <>
        <Summary itm={this.state.trans} />
        <section className={transStyle.home}>
          <h1 className={transStyle.title}>TRANSACTIONS</h1>
          <div className={transStyle.hold}>
            <div className={transStyle.tabs}>
              <button
                onClick={() => this.setState({ ...this.state, formTab: 1 })}
                className={formTab === 1 ? transStyle.active : ""}
              >
                All
              </button>
              <button
                onClick={() => this.setState({ ...this.state, formTab: 2 })}
                className={formTab === 2 ? transStyle.active : ""}
              >
                Pending
              </button>
              <button
                onClick={() => this.setState({ ...this.state, formTab: 3 })}
                className={formTab === 3 ? transStyle.active : " "}
              >
                Active
              </button>
              <button
                onClick={() => this.setState({ ...this.state, formTab: 4 })}
                className={formTab === 4 ? transStyle.active : " "}
              >
                Successful
              </button>
              <button
                onClick={() => this.setState({ ...this.state, formTab: 5 })}
                className={formTab === 5 ? transStyle.active : " "}
              >
                Cancelled
              </button>
            </div>
            {formTab === 1 ? (
              allTradeHistory.data.length === 0 ? (
                <div className={transStyle.transactions}>
                  <div className={transStyle.transactions_empty}>
                    <p>You have no trades yet!</p>
                  </div>
                </div>
              ) : (
                <div className={transStyle.transactions}>
                  <div className={transStyle.transactions_list}>
                    <div className={transStyle.address_search}>
                      <input
                        type="text"
                        onChange={(e) => {
                          e.preventDefault();
                          this.handleAllTransactionSearch(e.target.value);
                        }}
                        placeholder="Search"
                      />
                    </div>
                    <table>
                      <thead>
                        <tr>
                          <th>Asset</th>
                          <th>Type</th>
                          <th>NGN</th>
                          <th>Value</th>
                          <th>Status</th>
                          <th>Token</th>
                          <th>Date</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {(allTradeHistorySearch
                          ? allTradeHistoryState
                          : allTradeHistory.data
                        ).map((itm, idx) => (
                          <tr key={idx}>
                            <td style={{ textTransform: "capitalize" }}>
                              {itm.asset}
                            </td>
                            <td style={{ textTransform: "capitalize" }}>
                              {itm.type}
                            </td>
                            <td
                              className={
                                itm.type === "deposit" ||
                                itm.type === "buy" ||
                                itm.type === "receive"
                                  ? transStyle.green
                                  : itm.type === "transfer"
                                  ? ""
                                  : transStyle.red
                              }
                            >
                              ₦ {parseFloat(itm.amount_in_naira).toFixed(2)}
                            </td>
                            <td className={transStyle.green}>
                              {itm.asset.toLowerCase() === "naira"
                                ? `₦ ${parseFloat(itm.amount).toFixed(2)}`
                                : itm.asset.toLowerCase() === "giftcard"
                                ? parseFloat(itm.amount)
                                : parseFloat(itm.amount).toFixed(2) + " BTC"}
                            </td>
                            <td
                              className={
                                itm.status === "cancelled"
                                  ? transStyle.red
                                  : itm.status === "pending"
                                  ? transStyle.red
                                  : itm.status === "completed" ||
                                    itm.status === "successful"
                                  ? transStyle.green
                                  : transStyle.blue
                              }
                              style={{
                                textTransform: "capitalize",
                              }}
                            >
                              {itm.status}
                            </td>
                            <td>{itm.transaction_hash}</td>
                            <td>
                              {new Date(itm.createdAt).toLocaleDateString()}{" "}
                              {new Date(itm.createdAt).toLocaleTimeString()}
                            </td>
                            <td>
                              <button
                                className={transStyle.link_btn_gold}
                                onClick={(e) => {
                                  e.preventDefault();
                                  if (
                                    itm.status.toLowerCase() === "active" &&
                                    itm.asset.toLowerCase() === "giftcard"
                                  ) {
                                    this.props.history.push(
                                      "/home/gift-cards/" +
                                        itm.transaction_hash +
                                        "/status"
                                    );
                                  } else {
                                    this.openViewModal(itm);
                                  }
                                }}
                              >
                                View
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    <div className={transStyle.table_buttons}>
                      <div>
                        {(allTradeHistory.meta.current_page - 1) *
                          allTradeHistory.meta.items_per_page +
                          1}{" "}
                        -{" "}
                        {allTradeHistory.meta.current_page *
                          allTradeHistory.meta.items_per_page <
                        allTradeHistory.meta.total
                          ? allTradeHistory.meta.current_page *
                            allTradeHistory.meta.items_per_page
                          : allTradeHistory.meta.total}{" "}
                        of {allTradeHistory.meta.total}
                      </div>
                      <div>
                        <button
                          className={
                            !allTradeHistory.meta.previous_url
                              ? transStyle.back_none
                              : ""
                          }
                          onClick={(e) => {
                            e.preventDefault();
                            if (allTradeHistory.meta.previous_url) {
                              getAllTradeHistoryOffset(
                                allTradeHistory.meta.previous_url
                              );
                            }
                          }}
                        >
                          &lt;
                        </button>
                        <button
                          className={
                            !allTradeHistory.meta.next_url
                              ? transStyle.back_none
                              : ""
                          }
                          onClick={(e) => {
                            e.preventDefault();
                            if (allTradeHistory.meta.next_url) {
                              getAllTradeHistoryOffset(
                                allTradeHistory.meta.next_url
                              );
                            }
                          }}
                        >
                          &gt;
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            ) : formTab === 2 ? (
              pendingTradeHistory.data.length === 0 ? (
                <div className={transStyle.transactions}>
                  <div className={transStyle.transactions_empty}>
                    <p>You have no pending trade</p>
                  </div>
                </div>
              ) : (
                <div className={transStyle.transactions}>
                  <div className={transStyle.transactions_list}>
                    <div className={transStyle.address_search}>
                      <input
                        type="text"
                        onChange={(e) => {
                          e.preventDefault();
                          this.handlePendingTransactionSearch(e.target.value);
                        }}
                        placeholder="Search"
                      />
                    </div>
                    <table>
                      <thead>
                        <tr>
                          <th>Asset</th>
                          <th>Type</th>
                          <th>NGN</th>
                          <th>Value</th>
                          <th>Status</th>
                          <th>Token</th>
                          <th>Date</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {(pendingTradeHistorySearch
                          ? pendingTradeHistoryState
                          : pendingTradeHistory.data
                        ).map((itm, idx) => (
                          <tr key={idx}>
                            <td style={{ textTransform: "capitalize" }}>
                              {itm.asset}
                            </td>
                            <td style={{ textTransform: "capitalize" }}>
                              {itm.type}
                            </td>
                            <td
                              className={
                                itm.type === "deposit" ||
                                itm.type === "buy" ||
                                itm.type === "receive"
                                  ? transStyle.green
                                  : itm.type === "transfer"
                                  ? ""
                                  : transStyle.red
                              }
                            >
                              ₦ {parseFloat(itm.amount_in_naira).toFixed(2)}
                            </td>
                            <td className={transStyle.green}>
                              {itm.asset.toLowerCase() === "naira"
                                ? `₦ ${parseFloat(itm.amount).toFixed(2)}`
                                : itm.asset.toLowerCase() === "giftcard"
                                ? parseFloat(itm.amount)
                                : parseFloat(itm.amount).toFixed(2) + " BTC"}
                            </td>
                            <td
                              className={
                                itm.status === "cancelled"
                                  ? transStyle.red
                                  : itm.status === "pending"
                                  ? transStyle.red
                                  : itm.status === "completed" ||
                                    itm.status === "successful"
                                  ? transStyle.green
                                  : transStyle.blue
                              }
                              style={{
                                textTransform: "capitalize",
                              }}
                            >
                              {itm.status}
                            </td>
                            <td>{itm.transaction_hash}</td>
                            <td>
                              {new Date(itm.createdAt).toLocaleDateString()}{" "}
                              {new Date(itm.createdAt).toLocaleTimeString()}
                            </td>
                            <td>
                              <button
                                className={transStyle.link_btn_gold}
                                onClick={(e) => {
                                  e.preventDefault();
                                  if (
                                    itm.status.toLowerCase() === "active" &&
                                    itm.asset.toLowerCase() === "giftcard"
                                  ) {
                                    this.props.history.push(
                                      "/home/gift-cards/" +
                                        itm.transaction_hash +
                                        "/status"
                                    );
                                  } else {
                                    this.openViewModal(itm);
                                  }
                                }}
                              >
                                View
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    <div className={transStyle.table_buttons}>
                      <div>
                        {(pendingTradeHistory.meta.current_page - 1) *
                          pendingTradeHistory.meta.items_per_page +
                          1}{" "}
                        -{" "}
                        {pendingTradeHistory.meta.current_page *
                          pendingTradeHistory.meta.items_per_page <
                        pendingTradeHistory.meta.total
                          ? pendingTradeHistory.meta.current_page *
                            pendingTradeHistory.meta.items_per_page
                          : pendingTradeHistory.meta.total}{" "}
                        of {pendingTradeHistory.meta.total}
                      </div>
                      <div>
                        <button
                          className={
                            !pendingTradeHistory.meta.previous_url
                              ? transStyle.back_none
                              : ""
                          }
                          onClick={(e) => {
                            e.preventDefault();
                            if (pendingTradeHistory.meta.previous_url) {
                              getPendingTradeHistoryOffset(
                                pendingTradeHistory.meta.previous_url
                              );
                            }
                          }}
                        >
                          &lt;
                        </button>
                        <button
                          className={
                            !pendingTradeHistory.meta.next_url
                              ? transStyle.back_none
                              : ""
                          }
                          onClick={(e) => {
                            e.preventDefault();
                            if (pendingTradeHistory.meta.next_url) {
                              getPendingTradeHistoryOffset(
                                pendingTradeHistory.meta.next_url
                              );
                            }
                          }}
                        >
                          &gt;
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            ) : formTab === 3 ? (
              activeTradeHistory.data.length === 0 ? (
                <div className={transStyle.transactions}>
                  <div className={transStyle.transactions_empty}>
                    <p>You have no active trade</p>
                  </div>
                </div>
              ) : (
                <div className={transStyle.transactions}>
                  <div className={transStyle.transactions_list}>
                    <div className={transStyle.address_search}>
                      <input
                        type="text"
                        onChange={(e) => {
                          e.preventDefault();
                          this.handleActiveTransactionSearch(e.target.value);
                        }}
                        placeholder="Search"
                      />
                    </div>
                    <table>
                      <thead>
                        <tr>
                          <th>Asset</th>
                          <th>Type</th>
                          <th>NGN</th>
                          <th>Value</th>
                          <th>Status</th>
                          <th>Token</th>
                          <th>Date</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {(activeTradeHistorySearch
                          ? activeTradeHistoryState
                          : activeTradeHistory.data
                        ).map((itm, idx) => (
                          <tr key={idx}>
                            <td style={{ textTransform: "capitalize" }}>
                              {itm.asset}
                            </td>
                            <td style={{ textTransform: "capitalize" }}>
                              {itm.type}
                            </td>
                            <td
                              className={
                                itm.type === "deposit" ||
                                itm.type === "buy" ||
                                itm.type === "receive"
                                  ? transStyle.green
                                  : itm.type === "transfer"
                                  ? ""
                                  : transStyle.red
                              }
                            >
                              ₦ {parseFloat(itm.amount_in_naira).toFixed(2)}
                            </td>
                            <td className={transStyle.green}>
                              {itm.asset.toLowerCase() === "naira"
                                ? `₦ ${parseFloat(itm.amount).toFixed(2)}`
                                : itm.asset.toLowerCase() === "giftcard"
                                ? parseFloat(itm.amount)
                                : parseFloat(itm.amount).toFixed(2) + " BTC"}
                            </td>
                            <td
                              className={
                                itm.status === "cancelled"
                                  ? transStyle.red
                                  : itm.status === "pending"
                                  ? transStyle.red
                                  : itm.status === "completed" ||
                                    itm.status === "successful"
                                  ? transStyle.green
                                  : transStyle.blue
                              }
                              style={{
                                textTransform: "capitalize",
                              }}
                            >
                              {itm.status}
                            </td>
                            <td>{itm.transaction_hash}</td>
                            <td>
                              {new Date(itm.createdAt).toLocaleDateString()}{" "}
                              {new Date(itm.createdAt).toLocaleTimeString()}
                            </td>
                            <td>
                              <button
                                className={transStyle.link_btn_gold}
                                onClick={(e) => {
                                  e.preventDefault();
                                  if (
                                    itm.status.toLowerCase() === "active" &&
                                    itm.asset.toLowerCase() === "giftcard"
                                  ) {
                                    this.props.history.push(
                                      "/home/gift-cards/" +
                                        itm.transaction_hash +
                                        "/status"
                                    );
                                  } else {
                                    this.openViewModal(itm);
                                  }
                                }}
                              >
                                View
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    <div className={transStyle.table_buttons}>
                      <div>
                        {(activeTradeHistory.meta.current_page - 1) *
                          activeTradeHistory.meta.items_per_page +
                          1}{" "}
                        -{" "}
                        {activeTradeHistory.meta.current_page *
                          activeTradeHistory.meta.items_per_page <
                        activeTradeHistory.meta.total
                          ? activeTradeHistory.meta.current_page *
                            activeTradeHistory.meta.items_per_page
                          : activeTradeHistory.meta.total}{" "}
                        of {activeTradeHistory.meta.total}
                      </div>
                      <div>
                        <button
                          className={
                            !activeTradeHistory.meta.previous_url
                              ? transStyle.back_none
                              : ""
                          }
                          onClick={(e) => {
                            e.preventDefault();
                            if (activeTradeHistory.meta.previous_url) {
                              getActiveTradeHistoryOffset(
                                activeTradeHistory.meta.previous_url
                              );
                            }
                          }}
                        >
                          &lt;
                        </button>
                        <button
                          className={
                            !activeTradeHistory.meta.next_url
                              ? transStyle.back_none
                              : ""
                          }
                          onClick={(e) => {
                            e.preventDefault();
                            if (activeTradeHistory.meta.next_url) {
                              getActiveTradeHistoryOffset(
                                activeTradeHistory.meta.next_url
                              );
                            }
                          }}
                        >
                          &gt;
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            ) : formTab === 4 ? (
              completedTradeHistory.data.length === 0 ? (
                <div className={transStyle.transactions}>
                  <div className={transStyle.transactions_empty}>
                    <p>You have no completed trade</p>
                  </div>
                </div>
              ) : (
                <div className={transStyle.transactions}>
                  <div className={transStyle.transactions_list}>
                    <div className={transStyle.address_search}>
                      <input
                        type="text"
                        onChange={(e) => {
                          e.preventDefault();
                          this.handleCompletedTransactionSearch(e.target.value);
                        }}
                        placeholder="Search"
                      />
                    </div>
                    <table>
                      <thead>
                        <tr>
                          <th>Asset</th>
                          <th>Type</th>
                          <th>NGN</th>
                          <th>Value</th>
                          <th>Status</th>
                          <th>Token</th>
                          <th>Date</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {(completedTradeHistorySearch
                          ? completedTradeHistoryState
                          : completedTradeHistory.data
                        ).map((itm, idx) => (
                          <tr key={idx}>
                            <td style={{ textTransform: "capitalize" }}>
                              {itm.asset}
                            </td>
                            <td style={{ textTransform: "capitalize" }}>
                              {itm.type}
                            </td>
                            <td
                              className={
                                itm.type === "deposit" ||
                                itm.type === "buy" ||
                                itm.type === "receive"
                                  ? transStyle.green
                                  : itm.type === "transfer"
                                  ? ""
                                  : transStyle.red
                              }
                            >
                              ₦ {parseFloat(itm.amount_in_naira).toFixed(2)}
                            </td>
                            <td className={transStyle.green}>
                              {itm.asset.toLowerCase() === "naira"
                                ? `₦ ${parseFloat(itm.amount).toFixed(2)}`
                                : itm.asset.toLowerCase() === "giftcard"
                                ? parseFloat(itm.amount)
                                : parseFloat(itm.amount).toFixed(2) + " BTC"}
                            </td>
                            <td
                              className={
                                itm.status === "cancelled"
                                  ? transStyle.red
                                  : itm.status === "pending"
                                  ? transStyle.red
                                  : itm.status === "completed" ||
                                    itm.status === "successful"
                                  ? transStyle.green
                                  : transStyle.blue
                              }
                              style={{
                                textTransform: "capitalize",
                              }}
                            >
                              {itm.status}
                            </td>
                            <td>{itm.transaction_hash}</td>
                            <td>
                              {new Date(itm.createdAt).toLocaleDateString()}{" "}
                              {new Date(itm.createdAt).toLocaleTimeString()}
                            </td>
                            <td>
                              <button
                                className={transStyle.link_btn_gold}
                                onClick={(e) => {
                                  e.preventDefault();
                                  if (
                                    itm.status.toLowerCase() === "active" &&
                                    itm.asset.toLowerCase() === "giftcard"
                                  ) {
                                    this.props.history.push(
                                      "/home/gift-cards/" +
                                        itm.transaction_hash +
                                        "/status"
                                    );
                                  } else {
                                    this.openViewModal(itm);
                                  }
                                }}
                              >
                                View
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    <div className={transStyle.table_buttons}>
                      <div>
                        {(completedTradeHistory.meta.current_page - 1) *
                          completedTradeHistory.meta.items_per_page +
                          1}{" "}
                        -{" "}
                        {completedTradeHistory.meta.current_page *
                          completedTradeHistory.meta.items_per_page <
                        completedTradeHistory.meta.total
                          ? completedTradeHistory.meta.current_page *
                            completedTradeHistory.meta.items_per_page
                          : completedTradeHistory.meta.total}{" "}
                        of {completedTradeHistory.meta.total}
                      </div>
                      <div>
                        <button
                          className={
                            !completedTradeHistory.meta.previous_url
                              ? transStyle.back_none
                              : ""
                          }
                          onClick={(e) => {
                            e.preventDefault();
                            if (completedTradeHistory.meta.previous_url) {
                              getCompletedTradeHistoryOffset(
                                completedTradeHistory.meta.previous_url
                              );
                            }
                          }}
                        >
                          &lt;
                        </button>
                        <button
                          className={
                            !completedTradeHistory.meta.next_url
                              ? transStyle.back_none
                              : ""
                          }
                          onClick={(e) => {
                            e.preventDefault();
                            if (completedTradeHistory.meta.next_url) {
                              getCompletedTradeHistoryOffset(
                                completedTradeHistory.meta.next_url
                              );
                            }
                          }}
                        >
                          &gt;
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            ) : cancelledTradeHistory.data.length === 0 ? (
              <div className={transStyle.transactions}>
                <div className={transStyle.transactions_empty}>
                  <p>You have no cancelled trade</p>
                </div>
              </div>
            ) : (
              <div className={transStyle.transactions}>
                <div className={transStyle.transactions_list}>
                  <div className={transStyle.address_search}>
                    <input
                      type="text"
                      onChange={(e) => {
                        e.preventDefault();
                        this.handleCancelledTransactionSearch(e.target.value);
                      }}
                      placeholder="Search"
                    />
                  </div>
                  <table>
                    <thead>
                      <tr>
                        <th>Asset</th>
                        <th>Type</th>
                        <th>NGN</th>
                        <th>Value</th>
                        <th>Status</th>
                        <th>Token</th>
                        <th>Date</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(cancelledTradeHistorySearch
                        ? cancelledTradeHistoryState
                        : cancelledTradeHistory.data
                      ).map((itm, idx) => (
                        <tr key={idx}>
                          <td style={{ textTransform: "capitalize" }}>
                            {itm.asset}
                          </td>
                          <td style={{ textTransform: "capitalize" }}>
                            {itm.type}
                          </td>
                          <td
                            className={
                              itm.type === "deposit" ||
                              itm.type === "buy" ||
                              itm.type === "receive"
                                ? transStyle.green
                                : itm.type === "transfer"
                                ? ""
                                : transStyle.red
                            }
                          >
                            ₦ {parseFloat(itm.amount_in_naira).toFixed(2)}
                          </td>
                          <td className={transStyle.green}>
                            {itm.asset.toLowerCase() === "naira"
                              ? `₦ ${parseFloat(itm.amount).toFixed(2)}`
                              : itm.asset.toLowerCase() === "giftcard"
                              ? parseFloat(itm.amount)
                              : parseFloat(itm.amount).toFixed(2) + " BTC"}
                          </td>
                          <td
                            className={
                              itm.status === "cancelled"
                                ? transStyle.red
                                : itm.status === "pending"
                                ? transStyle.red
                                : itm.status === "completed" ||
                                  itm.status === "successful"
                                ? transStyle.green
                                : transStyle.blue
                            }
                            style={{
                              textTransform: "capitalize",
                            }}
                          >
                            {itm.status}
                          </td>
                          <td>{itm.transaction_hash}</td>
                          <td>
                            {new Date(itm.createdAt).toLocaleDateString()}{" "}
                            {new Date(itm.createdAt).toLocaleTimeString()}
                          </td>
                          <td>
                            <button
                              className={transStyle.link_btn_gold}
                              onClick={(e) => {
                                e.preventDefault();
                                if (
                                  itm.status.toLowerCase() === "active" &&
                                  itm.asset.toLowerCase() === "giftcard"
                                ) {
                                  this.props.history.push(
                                    "/home/gift-cards/" +
                                      itm.transaction_hash +
                                      "/status"
                                  );
                                } else {
                                  this.openViewModal(itm);
                                }
                              }}
                            >
                              View
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <div className={transStyle.table_buttons}>
                    <div>
                      {(cancelledTradeHistory.meta.current_page - 1) *
                        cancelledTradeHistory.meta.items_per_page +
                        1}{" "}
                      -{" "}
                      {cancelledTradeHistory.meta.current_page *
                        cancelledTradeHistory.meta.items_per_page <
                      cancelledTradeHistory.meta.total
                        ? cancelledTradeHistory.meta.current_page *
                          cancelledTradeHistory.meta.items_per_page
                        : cancelledTradeHistory.meta.total}{" "}
                      of {cancelledTradeHistory.meta.total}
                    </div>
                    <div>
                      <button
                        className={
                          !cancelledTradeHistory.meta.previous_url
                            ? transStyle.back_none
                            : ""
                        }
                        onClick={(e) => {
                          e.preventDefault();
                          if (cancelledTradeHistory.meta.previous_url) {
                            getCancelledTradeHistoryOffset(
                              cancelledTradeHistory.meta.previous_url
                            );
                          }
                        }}
                      >
                        &lt;
                      </button>
                      <button
                        className={
                          !cancelledTradeHistory.meta.next_url
                            ? transStyle.back_none
                            : ""
                        }
                        onClick={(e) => {
                          e.preventDefault();
                          if (cancelledTradeHistory.meta.next_url) {
                            getCancelledTradeHistoryOffset(
                              cancelledTradeHistory.meta.next_url
                            );
                          }
                        }}
                      >
                        &gt;
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
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
    getAllTradeHistoryOffset: (url) =>
      dispatch(getAllTradeHistoryOffset(url.replace("http://", "https://"))),
    getActiveTradeHistoryOffset: (url) =>
      dispatch(getActiveTradeHistoryOffset(url.replace("http://", "https://"))),
    getPendingTradeHistoryOffset: (url) =>
      dispatch(
        getPendingTradeHistoryOffset(url.replace("http://", "https://"))
      ),
    getCancelledTradeHistoryOffset: (url) =>
      dispatch(
        getCancelledTradeHistoryOffset(url.replace("http://", "https://"))
      ),
    getCompletedTradeHistoryOffset: (url) =>
      dispatch(
        getCompletedTradeHistoryOffset(url.replace("http://", "https://"))
      ),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
