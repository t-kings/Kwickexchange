import React, { Component } from "react";
import style from "./Index.module.css";
import { connect } from "react-redux";
class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {
        bank_name: [],
        account_name: [],
        amount: [],
        account_number: [],
      },
    };
  }
  handleSubmit = () => {};
  handleChange = () => {};
  render() {
    return (
      <section id="btcSummary" className={style.modal}>
        <div className={style.modal_item + " " + style.card}>
          <div className={style.prompt}>
            <div className={style.top}>
              <h3>Withdrawal Summary</h3>
            </div>
            <div className={style.amounts}>
              <p>0.0000000 BTC</p>
              <p>$ 0.00</p>
              <p>x0rnf43knfJ4F45sfsdf543g5s64sdgFAs</p>
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
              <button
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#btcSummary").style.display = "none";
                }}
                className={style.button + " " + style.link_btn_gold}
              >
                Proceed
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {};
};
export default connect(null, mapDispatchToProps)(Index);
