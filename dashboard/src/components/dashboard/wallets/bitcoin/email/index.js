import React, { Component } from "react";
import style from "./Index.module.css";
import { connect } from "react-redux";
class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      btc: "",
      usd: "",
      email: "",
      password: "",
      errors: {
        btc: [],
        usd: [],
        email: [],
        password: [],
      },
    };
  }

  handleBTC = (e) => {
    const { bitcoinSellRate } = this.props;
    const btc = parseFloat(e.target.value);
    const usd = btc * bitcoinSellRate.usd;
    this.setState({
      ...this.state,
      btc,
      usd: usd ? usd : 0,
    });
  };
  handleUSD = (e) => {
    const { bitcoinSellRate } = this.props;
    const usd = parseFloat(e.target.value);
    const btc = usd / bitcoinSellRate.usd;
    this.setState({
      ...this.state,
      usd,
      btc: btc ? btc : 0,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const errors = {
      btc: [],
      usd: [],
      email: [],
      password: [],
    };
    this.setState({
      ...this.state,
      errors,
    });
    const { password, btc, usd, email } = this.state;
    const { setBtcTransfer } = this.props;
    if (btc.length < 1) {
      errors.btc.push("BTC value is required");
    }
    if (password.length < 1) {
      errors.password.push("Password is required");
    }
    if (usd.length < 1) {
      errors.usd.push("USD value is required");
    }

    if (email.length < 1) {
      errors.email.push("BTC email is required");
    }

    if (
      errors.btc.length > 0 ||
      errors.usd.length > 0 ||
      errors.email.length > 0 ||
      errors.password.length > 0
    ) {
      this.setState({
        ...this.state,
        errors,
      });
    } else {
      e.preventDefault();
      setBtcTransfer({ password, btc, usd, email, address: "" });
      document.querySelector("#sendBtcEmail").style.display = "none";
      document.querySelector("#btcSummary").style.display = "flex";
    }
  };
  handleChange = (e) => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value,
    });
  };
  render() {
    const { errors, btc, usd } = this.state;
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
                id="btc_email"
                name="btc"
                step="any"
                value={btc}
                onChange={this.handleBTC}
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
                id="usd_email"
                name="usd"
                value={usd}
                step="any"
                onChange={this.handleUSD}
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
                id="password_email"
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
                onClick={this.handleSubmit}
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
const mapStateToProps = (state) => {
  return { ...state.auth, ...state.resources, ...state.trade };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setBtcTransfer: (payload) =>
      dispatch(async (dispatch, getState) => {
        dispatch((dispatch, getState) => {
          dispatch({
            type: "SET_BTC_WITHDRAWAL",
            data: { ...payload },
          });
        });
      }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Index);
