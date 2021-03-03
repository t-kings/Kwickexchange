import React, { Component } from "react";
import style from "./Index.module.css";
import { connect } from "react-redux";
import { cancelTrade } from "../../../store/actions/trade";
class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { itm, isLoading, cancelTrade } = this.props;
    return (
      <section
        id="transModal"
        className={style.modal}
        onClick={(e) => {
          if (e.target == document.querySelector("#transModal")) {
            document.querySelector("#transModal").style.display = "none";
          }
        }}
      >
        <div className={style.modal_item + " " + style.card}>
          <div className={style.prompt}>
            <div className={style.top}>
              <h3>Transaction Summary</h3>
            </div>
            <div className={style.box}>
              <h4
                style={{
                  textTransform: "capitalize",
                }}
                className={
                  itm.status === "cancelled"
                    ? style.red
                    : itm.status === "completed"
                    ? style.green
                    : style.blue
                }
              >
                {itm.status}
              </h4>
              <ul>
                <li>
                  <p>Transaction Asset</p>
                  <h6 style={{ textTransform: "capitalize" }}>{itm.asset}</h6>
                </li>
                <li>
                  <p>Transaction Type</p>
                  <h6 style={{ textTransform: "capitalize" }}>{itm.type}</h6>
                </li>
                <li>
                  <p>Transaction Description</p>
                  <h6 style={{ textTransform: "capitalize" }}>
                    {itm.description}
                  </h6>
                </li>
                <li>
                  <p>Amount</p>
                  <h6>₦{parseFloat(itm.amount_in_naira).toFixed(2)}</h6>
                </li>
                <li>
                  <p>Value</p>
                  <h6>
                    {itm.asset === "naira"
                      ? `₦ ${parseFloat(itm.amount).toFixed(2)}`
                      : `${parseFloat(itm.amount).toFixed(8)} BTC`}
                  </h6>
                </li>
                {itm.recipient ? (
                  <li>
                    <p>Recipient</p>
                    <h6>{itm.recipient}</h6>
                  </li>
                ) : null}
                {/* <li className={style.flex}>
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
                  <h6>{new Date(itm.createdAt).toDateString()}</h6>
                </li>
              </ul>
              {itm.can_cancell && itm.status.toLowerCase() === "active" ? (
                <div className={style.center}>
                  {isLoading ? (
                    <div className={style.load + " " + style.link_btn_gold}>
                      <div className={style.loader}>Loading...</div>
                    </div>
                  ) : (
                    <button
                      onClick={async (e) => {
                        e.preventDefault();
                        if (await cancelTrade(itm.transaction_hash)) {
                          document.querySelector("#transModal").style.display =
                            "none";
                        }
                      }}
                      className={style.link_btn_gold + " " + style.btn_red}
                    >
                      Cancel Trade
                    </button>
                  )}
                </div>
              ) : null}
            </div>
            <div className={style.actions}>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#transModal").style.display = "none";
                }}
                className={style.button + " " + style.grey}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  return { ...state.auth, ...state.resources, ...state.trade };
};
const mapDispatchToProps = (dispatch) => {
  return {
    cancelTrade: (id) => dispatch(cancelTrade(id)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Index);
