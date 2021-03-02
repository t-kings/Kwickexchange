import React, { Component } from "react";
import style from "./Index.module.css";
import { connect } from "react-redux";
class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: "",
      email: "",
      password: "",
      errors: {
        amount: [],
        email: [],
        password: [],
      },
    };
  }

  handleAmount = (e) => {
    const amount = parseFloat(e.target.value);
    this.setState({
      ...this.state,
      amount,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const errors = {
      amount: [],
      email: [],
      password: [],
    };
    this.setState({
      ...this.state,
      errors,
    });
    const { password, amount, email } = this.state;
    const { setNairaTransfer } = this.props;

    if (password.length < 1) {
      errors.password.push("Password is required");
    }
    if (amount.length < 1) {
      errors.amount.push("amount value is required");
    }

    if (email.length < 1) {
      errors.email.push("BTC email is required");
    }

    if (
      errors.amount.length > 0 ||
      errors.email.length > 0 ||
      errors.password.length > 0
    ) {
      this.setState({
        ...this.state,
        errors,
      });
    } else {
      e.preventDefault();
      setNairaTransfer({ password, amount, email });
      document.querySelector("#sendNairaEmail").style.display = "none";
      document.querySelector("#nairaSummary").style.display = "flex";
    }
  };
  handleChange = (e) => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value,
    });
  };
  render() {
    const { errors, amount } = this.state;
    return (
      <section
        id="sendNairaEmail"
        className={style.modal}
        onClick={(e) => {
          if (e.target == document.querySelector("#sendNairaEmail")) {
            document.querySelector("#sendNairaEmail").style.display = "none";
          }
        }}
      >
        <div className={style.modal_item + " " + style.card}>
          <div className={style.prompt}>
            <div className={style.top}>
              <h3>Send Naira</h3>
            </div>
            <form className={style.box} onSubmit={this.handleSubmit}>
              <label
                className={
                  style.control_label +
                  " " +
                  (errors["amount"].length > 0 ? style.error : " ")
                }
                htmlFor="amount"
              >
                Amount
              </label>
              <input
                type="number"
                className={
                  style.form_control +
                  " " +
                  (errors["amount"].length > 0 ? style.error : " ")
                }
                id="amount_email"
                name="amount"
                value={amount}
                step="any"
                onChange={this.handleAmount}
                required
              />
              {errors["amount"].map((item, idx) => (
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
                Receiver's Email
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
                  document.querySelector("#sendNairaEmail").style.display =
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
    setNairaTransfer: (payload) =>
      dispatch(async (dispatch, getState) => {
        dispatch((dispatch, getState) => {
          dispatch({
            type: "SET_NAIRA_TRANSFER",
            data: { ...payload },
          });
        });
      }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Index);
