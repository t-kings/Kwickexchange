import React, { Component } from "react";
import style from "./Index.module.css";
import { connect } from "react-redux";
import { withdrawBTC, emailBTC } from "../../../../../store/actions/trade";
class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const {
      btcWithdrawal,
      withdrawBTC,
      isLoading,
      emailBTC,
      bitcoinWithdrawalFee,
    } = this.props;
    return (
      <section id="btcSummary" className={style.modal}>
        <div className={style.modal_item + " " + style.card}>
          <div className={style.prompt}>
            <div className={style.top}>
              <h3>Withdrawal Summary</h3>
            </div>
            <div className={style.amounts}>
              {bitcoinWithdrawalFee.percentage ? (
                <div>
                  <span>
                    Service charge is {bitcoinWithdrawalFee.percentage}
                  </span>
                </div>
              ) : null}
              <p>{btcWithdrawal.btc} BTC</p>
              <p>$ {btcWithdrawal.usd}</p>
              <p>
                {btcWithdrawal.address && btcWithdrawal.address.length > 0
                  ? btcWithdrawal.address
                  : btcWithdrawal.email}
              </p>
            </div>
            <div className={style.actions}>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#btcSummary").style.display = "none";
                }}
                className={style.button + " " + style.grey}
              >
                Cancel
              </button>
              {isLoading ? (
                <div className={style.load + " " + style.link_btn_gold}>
                  <div className={style.loader}>Loading...</div>
                </div>
              ) : (
                <button
                  onClick={async (e) => {
                    e.preventDefault();
                    if (
                      btcWithdrawal.address &&
                      btcWithdrawal.address.length > 0
                    ) {
                      if (await withdrawBTC()) {
                        document.querySelector("#btcSummary").style.display =
                          "none";
                      }
                    } else {
                      if (await emailBTC()) {
                        document.querySelector("#btcSummary").style.display =
                          "none";
                      }
                    }
                  }}
                  className={style.button + " " + style.link_btn_gold}
                >
                  Proceed
                </button>
              )}
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
    withdrawBTC: () => dispatch(withdrawBTC()),
    emailBTC: () => dispatch(emailBTC()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Index);
