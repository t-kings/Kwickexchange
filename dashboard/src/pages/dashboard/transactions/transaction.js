import React, { Component } from "react";
import transStyle from "./Index.module.css";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
class Transaction extends Component {
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
            redirect_to: "/home/transactions/" + this.props.match.params.id,
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
              <h4 className={transStyle.red}>Cancelled</h4>
              <h4 className={transStyle.blue}>Active</h4>
              <h4 className={transStyle.green}>Successful</h4>
              <ul>
                <li>
                  <p>Transaction Type</p>
                  <h6>Send BTC</h6>
                </li>
                <li>
                  <p>Amount</p>
                  <h6>0.00000000 BTC</h6>
                </li>
                <li>
                  <p>Recipient</p>
                  <h6>ox5dgvr5g1gr5rsjh5jbfgxd</h6>
                </li>
                <li className={transStyle.flex}>
                  <div>
                    <p>Quantity</p>
                    <h6>23</h6>
                  </div>
                  <div>
                    <p>Amount</p>
                    <h6>₦ 20,000</h6>
                  </div>
                </li>
                <li>
                  <p>Date</p>
                  <h6>27th Jan. 2021</h6>
                </li>
              </ul>
              <div className={transStyle.center}>
                <button
                  className={
                    transStyle.link_btn_gold + " " + transStyle.btn_red
                  }
                >
                  Cancel
                </button>
              </div>
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
export default connect(mapStateToProps, null)(Transaction);
