import React, { Component } from "react";
import bitcoinStyle from "./wallet.module.css";
import style from "../Index.module.css";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { validatePayment } from "../../../store/actions/trade";
class Status extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount = () => {
    const { validatePayment } = this.props;
    const urlParams = new URLSearchParams(window.location.search);
    const status = urlParams.get("status");
    const trxref = urlParams.get("trxref");
    const reference = urlParams.get("reference");
    this.setState({
      status,
      trxref,
      reference,
    });
    // if (status === "successful") {
    validatePayment(trxref, reference);
    // }
  };
  render() {
    const urlParams = new URLSearchParams(window.location.search);
    const status = urlParams.get("status");
    const trxref = urlParams.get("trxref");
    const reference = urlParams.get("reference");
    const { isAuthenticated, depositStatus } = this.props;
    if (!isAuthenticated) {
      return (
        <Redirect
          to={{
            pathname: "/",
            redirect_to:
              "/home/wallet/naira/status?status=" +
              status +
              "&trxref=" +
              trxref +
              "reference=" +
              reference,
          }}
        />
      );
    }

    if (depositStatus === null || depositStatus === undefined) {
      return (
        <section className={bitcoinStyle.home}>
          <div
            className={style.card + " " + bitcoinStyle.transaction}
            style={{ minHeight: "50vh" }}
          >
            <div className={bitcoinStyle.load}>
              <div className={bitcoinStyle.loader}>Loading...</div>
            </div>
          </div>
        </section>
      );
    }
    if (depositStatus === true) {
      return (
        <section className={bitcoinStyle.home}>
          <div className={style.card + " " + bitcoinStyle.transaction}>
            <h3>Transaction Successful</h3>
            <p>Your transaction was successful!</p>
            <Link
              to="/home/wallet/naira"
              className={bitcoinStyle.link_btn_gold}
            >
              Done
            </Link>
          </div>
        </section>
      );
    }
    return (
      <section className={bitcoinStyle.home}>
        <div className={style.card + " " + bitcoinStyle.transaction}>
          <h3 style={{ color: "red" }}>Transaction Error</h3>
          <p>Your transaction was not successful!</p>
          <Link to="/home/wallet/naira" className={bitcoinStyle.link_btn_gold}>
            Try Again
          </Link>
        </div>
      </section>
    );
  }
}

const matchStateToProps = (state) => {
  return { ...state.auth, ...state.trade };
};
const mapDispatchToProps = (dispatch) => ({
  validatePayment: (trxref, reference) =>
    dispatch(validatePayment(trxref, reference)),
});

export default connect(matchStateToProps, mapDispatchToProps)(Status);
