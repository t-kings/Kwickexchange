import React, { Component } from "react";
import style from "./Index.module.css";
import { connect } from "react-redux";
class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {
        btc: [],
        usd: [],
        email: [],
        password: [],
      },
    };
  }
  handleSubmit = () => {};
  handleChange = () => {};
  render() {
    const { errors } = this.state;
    return (
      <section
        id="sendBtcEmail"
        className={style.modal}
        onClick={(e) => {
          if (e.target == document.querySelector("#sendBtcEmail")) {
            document.querySelector("#sendBtcEmail").style.display = "none";
          }
        }}
      >
        <div className={style.modal_item + " " + style.card}>
          <div className={style.prompt}>
            <div className={style.top}>
              <h3>Send BTC</h3>
            </div>
            <form className={style.box} onSubmit={this.handleSubmit}>
              <label
                className={
                  style.control_label +
                  " " +
                  (errors["btc"].length > 0 ? style.error : " ")
                }
                htmlFor="btc"
              >
                BTC
              </label>
              <input
                type="number"
                className={
                  style.form_control +
                  " " +
                  (errors["btc"].length > 0 ? style.error : " ")
                }
                id="btc"
                name="btc"
                onChange={this.handleChange}
                required
              />
              {errors["btc"].map((item, idx) => (
                <p key={idx} className={style.error_par}>
                  {item}
                </p>
              ))}
              <label
                className={
                  style.control_label +
                  " " +
                  (errors["usd"].length > 0 ? style.error : " ")
                }
                htmlFor="usd"
              >
                USD
              </label>
              <input
                type="number"
                className={
                  style.form_control +
                  " " +
                  (errors["usd"].length > 0 ? style.error : " ")
                }
                id="usd"
                name="usd"
                onChange={this.handleChange}
                required
              />
              {errors["usd"].map((item, idx) => (
                <p key={idx} className={style.error_par}>
                  {item}
                </p>
              ))}

              <label
                className={
                  style.control_label +
                  " " +
                  (errors["email"].length > 0 ? style.error : " ")
                }
                htmlFor="email"
              >
                Receiver Email
              </label>
              <input
                type="email"
                className={
                  style.form_control +
                  " " +
                  (errors["email"].length > 0 ? style.error : " ")
                }
                id="email"
                name="email"
                onChange={this.handleChange}
                required
              />
              {errors["email"].map((item, idx) => (
                <p key={idx} className={style.error_par}>
                  {item}
                </p>
              ))}

              <label
                className={
                  style.control_label +
                  " " +
                  (errors["password"].length > 0 ? style.error : " ")
                }
                htmlFor="password"
              >
                Password
              </label>
              <input
                type="password"
                placeholder="password"
                id="password"
                name="password"
                onChange={this.handleChange}
                className={
                  style.form_control +
                  " " +
                  (errors["password"].length > 0 ? style.error : " ")
                }
              />
              {errors["password"].map((item, idx) => (
                <p key={idx} className={style.error_par}>
                  {item}
                </p>
              ))}
            </form>
            <div className={style.actions}>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#sendBtcEmail").style.display =
                    "none";
                }}
                className={style.button + " " + style.grey}
              >
                Cancel
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#sendBtcEmail").style.display =
                    "none";
                  document.querySelector("#btcSummary").style.display = "flex";
                }}
                className={style.button + " " + style.link_btn_gold}
              >
                SEND
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