import React, { Component } from "react";
import transStyle from "./Index.module.css";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Summary from "../../../components/dashboard/transactions";
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formTab: 1,
      trans: {},
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
      console.log(e);
    }
  };
  componentDidMount = () => {
    const { tab, id } = this.props.match.params;
    const { currentGiftCardTrade } = this.props;
    if (tab && id === "status" && currentGiftCardTrade.id) {
      this.setState({
        ...this.state,
        formTab: tab,
        trans: currentGiftCardTrade,
      });
      try {
        setTimeout(() => {
          document.querySelector("#transModal").style.display = "flex";
        }, 1000);
      } catch (e) {
        console.log(e);
      }
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
    } = this.props;
    const { formTab } = this.state;
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
                        {allTradeHistory.data.map((itm, idx) => (
                          <tr key={idx}>
                            <td style={{ textTransform: "capitalize" }}>
                              {itm.asset}
                            </td>
                            <td style={{ textTransform: "capitalize" }}>
                              {itm.type}
                            </td>
                            <td
                              className={
                                itm.type === "deposit" || itm.type === "buy"
                                  ? transStyle.green
                                  : transStyle.red
                              }
                            >
                              ₦ {parseFloat(itm.amount_in_naira).toFixed(2)}
                            </td>
                            <td className={transStyle.green}>
                              {itm.asset === "naira"
                                ? `₦ ${parseFloat(itm.amount).toFixed(2)}`
                                : `${parseFloat(itm.amount).toFixed(8)} BTC`}
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
                            <td>{new Date(itm.createdAt).toDateString()}</td>
                            <td>
                              <Link
                                to={
                                  "/home/transactions/all/" +
                                  itm.transaction_hash
                                }
                                className={transStyle.link_btn_gold}
                                onClick={(e) => {
                                  e.preventDefault();
                                  this.openViewModal(itm);
                                }}
                              >
                                View
                              </Link>
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
                            allTradeHistory.meta.current_page - 1 === 0
                              ? transStyle.back_none
                              : ""
                          }
                          onClick={(e) => {
                            e.preventDefault();
                            if (allTradeHistory.meta.current_page - 1 > 0) {
                              //go back
                            }
                          }}
                        >
                          &lt;
                        </button>
                        <button
                          className={
                            allTradeHistory.meta.current_page *
                              allTradeHistory.meta.items_per_page >
                            allTradeHistory.meta.total
                              ? transStyle.back_none
                              : ""
                          }
                          onClick={(e) => {
                            e.preventDefault();
                            if (
                              allTradeHistory.meta.current_page *
                                allTradeHistory.meta.items_per_page <
                              allTradeHistory.meta.total
                            ) {
                              //go next
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
                    <table>
                      <thead>
                        <tr>
                          <th>Trans. Type</th>
                          <th>NGN</th>
                          <th>Value</th>
                          <th>Status</th>
                          <th>Token</th>
                          <th>Date</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {pendingTradeHistory.data.map((itm, idx) => (
                          <tr key={idx}>
                            <td style={{ textTransform: "capitalize" }}>
                              {itm.asset} - {itm.type}
                            </td>
                            <td
                              className={
                                itm.type === "deposit" || itm.type === "buy"
                                  ? transStyle.green
                                  : transStyle.red
                              }
                            >
                              ₦ {parseFloat(itm.amount_in_naira).toFixed(2)}
                            </td>
                            <td className={transStyle.green}>
                              {itm.asset === "naira"
                                ? `₦ ${parseFloat(itm.amount).toFixed(2)}`
                                : `${parseFloat(itm.amount).toFixed(8)} BTC`}
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
                            <td>{new Date(itm.createdAt).toDateString()}</td>
                            <td>
                              <Link
                                to={
                                  "/home/transactions/pending/" +
                                  itm.transaction_hash
                                }
                                className={transStyle.link_btn_gold}
                                onClick={(e) => {
                                  e.preventDefault();
                                  this.openViewModal(itm);
                                }}
                              >
                                View
                              </Link>
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
                            pendingTradeHistory.meta.current_page - 1 === 0
                              ? transStyle.back_none
                              : ""
                          }
                          onClick={(e) => {
                            e.preventDefault();
                            if (pendingTradeHistory.meta.current_page - 1 > 0) {
                              //go back
                            }
                          }}
                        >
                          &lt;
                        </button>
                        <button
                          className={
                            pendingTradeHistory.meta.current_page *
                              pendingTradeHistory.meta.items_per_page >
                            pendingTradeHistory.meta.total
                              ? transStyle.back_none
                              : ""
                          }
                          onClick={(e) => {
                            e.preventDefault();
                            if (
                              pendingTradeHistory.meta.current_page *
                                pendingTradeHistory.meta.items_per_page <
                              pendingTradeHistory.meta.total
                            ) {
                              //go next
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
                    <table>
                      <thead>
                        <tr>
                          <th>Trans. Type</th>
                          <th>NGN</th>
                          <th>Value</th>
                          <th>Status</th>
                          <th>Token</th>
                          <th>Date</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {activeTradeHistory.data.map((itm, idx) => (
                          <tr key={idx}>
                            <td style={{ textTransform: "capitalize" }}>
                              {itm.asset} - {itm.type}
                            </td>
                            <td
                              className={
                                itm.type === "deposit" || itm.type === "buy"
                                  ? transStyle.green
                                  : transStyle.red
                              }
                            >
                              ₦ {parseFloat(itm.amount_in_naira).toFixed(2)}
                            </td>
                            <td className={transStyle.green}>
                              {itm.asset === "naira"
                                ? `₦ ${parseFloat(itm.amount).toFixed(2)}`
                                : `${parseFloat(itm.amount).toFixed(8)} BTC`}
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
                            <td>{new Date(itm.createdAt).toTimeString()}</td>
                            <td>
                              <Link
                                to={
                                  "/home/transactions/active/" +
                                  itm.transaction_hash
                                }
                                className={transStyle.link_btn_gold}
                                onClick={(e) => {
                                  e.preventDefault();
                                  this.openViewModal(itm);
                                }}
                              >
                                View
                              </Link>
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
                            activeTradeHistory.meta.current_page - 1 === 0
                              ? transStyle.back_none
                              : ""
                          }
                          onClick={(e) => {
                            e.preventDefault();
                            if (activeTradeHistory.meta.current_page - 1 > 0) {
                              //go back
                            }
                          }}
                        >
                          &lt;
                        </button>
                        <button
                          className={
                            activeTradeHistory.meta.current_page *
                              activeTradeHistory.meta.items_per_page >
                            activeTradeHistory.meta.total
                              ? transStyle.back_none
                              : ""
                          }
                          onClick={(e) => {
                            e.preventDefault();
                            if (
                              activeTradeHistory.meta.current_page *
                                activeTradeHistory.meta.items_per_page <
                              activeTradeHistory.meta.total
                            ) {
                              //go next
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
                    <table>
                      <thead>
                        <tr>
                          <th>Trans. Type</th>
                          <th>NGN</th>
                          <th>Value</th>
                          <th>Status</th>
                          <th>Token</th>
                          <th>Date</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {completedTradeHistory.data.map((itm, idx) => (
                          <tr key={idx}>
                            <td style={{ textTransform: "capitalize" }}>
                              {itm.asset} - {itm.type}
                            </td>
                            <td
                              className={
                                itm.type === "deposit" || itm.type === "buy"
                                  ? transStyle.green
                                  : transStyle.red
                              }
                            >
                              ₦ {parseFloat(itm.amount_in_naira).toFixed(2)}
                            </td>
                            <td className={transStyle.green}>
                              {itm.asset === "naira"
                                ? `₦ ${parseFloat(itm.amount).toFixed(2)}`
                                : `${parseFloat(itm.amount).toFixed(8)} BTC`}
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
                            <td>{new Date(itm.createdAt).toDateString()}</td>
                            <td>
                              <Link
                                to={
                                  "/home/transactions/completed/" +
                                  itm.transaction_hash
                                }
                                className={transStyle.link_btn_gold}
                                onClick={(e) => {
                                  e.preventDefault();
                                  this.openViewModal(itm);
                                }}
                              >
                                View
                              </Link>
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
                            completedTradeHistory.meta.current_page - 1 === 0
                              ? transStyle.back_none
                              : ""
                          }
                          onClick={(e) => {
                            e.preventDefault();
                            if (
                              completedTradeHistory.meta.current_page - 1 >
                              0
                            ) {
                              //go back
                            }
                          }}
                        >
                          &lt;
                        </button>
                        <button
                          className={
                            completedTradeHistory.meta.current_page *
                              completedTradeHistory.meta.items_per_page >
                            completedTradeHistory.meta.total
                              ? transStyle.back_none
                              : ""
                          }
                          onClick={(e) => {
                            e.preventDefault();
                            if (
                              completedTradeHistory.meta.current_page *
                                completedTradeHistory.meta.items_per_page <
                              completedTradeHistory.meta.total
                            ) {
                              //go next
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
                  <table>
                    <thead>
                      <tr>
                        <th>Trans. Type</th>
                        <th>NGN</th>
                        <th>Value</th>
                        <th>Status</th>
                        <th>Token</th>
                        <th>Date</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cancelledTradeHistory.data.map((itm, idx) => (
                        <tr key={idx}>
                          <td style={{ textTransform: "capitalize" }}>
                            {itm.asset} - {itm.type}
                          </td>
                          <td className={transStyle.green}>
                            ₦{itm.amount_in_naira}
                          </td>
                          <td className={transStyle.green}>₦ {itm.amount}</td>
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
                          <td>{new Date(itm.createdAt).toDateString()}</td>
                          <td>
                            <Link
                              to={
                                "/home/transactions/cancelled/" +
                                itm.transaction_hash
                              }
                              className={transStyle.link_btn_gold}
                            >
                              View
                            </Link>
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
                          cancelledTradeHistory.meta.current_page - 1 === 0
                            ? transStyle.back_none
                            : ""
                        }
                        onClick={(e) => {
                          e.preventDefault();
                          if (cancelledTradeHistory.meta.current_page - 1 > 0) {
                            //go back
                          }
                        }}
                      >
                        &lt;
                      </button>
                      <button
                        className={
                          cancelledTradeHistory.meta.current_page *
                            cancelledTradeHistory.meta.items_per_page >
                          cancelledTradeHistory.meta.total
                            ? transStyle.back_none
                            : ""
                        }
                        onClick={(e) => {
                          e.preventDefault();
                          if (
                            cancelledTradeHistory.meta.current_page *
                              cancelledTradeHistory.meta.items_per_page <
                            cancelledTradeHistory.meta.total
                          ) {
                            //go next
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
export default connect(mapStateToProps, null)(Home);
