import React, { Component } from "react";
import transStyle from "./Index.module.css";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { cancelTrade } from "../../../store/actions/trade";
class Transaction extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { isAuthenticated, transaction, isLoading, cancelTrade } = this.props;
    if (!isAuthenticated) {
      return (
        <Redirect
          to={{
            pathname: "/",
            redirect_to:
              "/home/transactions/" +
              this.props.match.params.tab +
              "/" +
              this.props.match.params.id,
          }}
        />
      );
    }
    return (
      <section className={transStyle.home}>
        <Link className={transStyle.back} to="/home/transactions">
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
          <h1 className={transStyle.title}>TRANSACTIONS</h1>
        </Link>
        <div className={transStyle.summary}>
          <div className={transStyle.card}>
            <div className={transStyle.cardTop}>
              <h2>Transaction Summary</h2>
            </div>
            <div className={transStyle.cardBody}>
              {}
              <h4
                className={
                  transaction.status === "cancelled"
                    ? transStyle.red
                    : transaction.status === "completed"
                    ? transStyle.green
                    : transStyle.blue
                }
              >
                {transaction.status}
              </h4>
              <ul>
                <li>
                  <p>Transaction Type</p>
                  <h6>{transaction.description}</h6>
                </li>
                <li>
                  <p>Amount</p>
                  <h6>₦{parseFloat(transaction.amount_in_naira).toFixed(2)}</h6>
                </li>

                <li>
                  <p>Value</p>
                  <h6>
                    {transaction.asset === "naira"
                      ? `₦ ${parseFloat(transaction.amount).toFixed(2)}`
                      : `${parseFloat(transaction.amount).toFixed(8)} BTC`}
                  </h6>
                </li>
                {transaction.recipient ? (
                  <li>
                    <p>Recipient</p>
                    <h6>{transaction.recipient}</h6>
                  </li>
                ) : null}

                {/* <li className={transStyle.flex}>
                  <div>
                    <p>Quantity</p>
                    <h6>23</h6>
                  </div>
                  <div>
                    <p>Amount</p>
                    <h6>₦ 20,000</h6>
                  </div>
                </li> */}
                <li>
                  <p>Date</p>
                  <h6>
                    {transaction.createdAt.replace("T", " ").replace("Z", "")}
                  </h6>
                </li>
              </ul>
              {transaction.can_cancell &&
              transaction.status.toLowerCase() === "active" ? (
                <div className={transStyle.center}>
                  {isLoading ? (
                    <div
                      className={
                        transStyle.load + " " + transStyle.link_btn_gold
                      }
                    >
                      <div className={transStyle.loader}>Loading...</div>
                    </div>
                  ) : (
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        cancelTrade(transaction.id);
                      }}
                      className={
                        transStyle.link_btn_gold + " " + transStyle.btn_red
                      }
                    >
                      Cancel
                    </button>
                  )}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state, props) => {
  const {
    pendingTradeHistory,
    allTradeHistory,
    activeTradeHistory,
    cancelledTradeHistory,
    completedTradeHistory,
  } = state.resources;
  let transaction = {};
  if (props.match.params.tab === "all") {
    transaction = allTradeHistory.data.find(
      (itm) => itm.transaction_hash === props.match.params.id
    );
  }
  if (props.match.params.tab === "pending") {
    transaction = pendingTradeHistory.data.find(
      (itm) => itm.transaction_hash === props.match.params.id
    );
  }
  if (props.match.params.tab === "active") {
    transaction = activeTradeHistory.data.find(
      (itm) => itm.transaction_hash === props.match.params.id
    );
  }
  if (props.match.params.tab === "cancelled") {
    transaction = cancelledTradeHistory.data.find(
      (itm) => itm.transaction_hash === props.match.params.id
    );
  }
  if (props.match.params.tab === "completed") {
    transaction = completedTradeHistory.data.find(
      (itm) => itm.transaction_hash === props.match.params.id
    );
  }
  return { ...state.auth, ...state.resources, transaction, ...state.trade };
};
const mapDispatchToProps = (dispatch) => {
  return {
    cancelTrade: (id) => dispatch(cancelTrade(id)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Transaction);
