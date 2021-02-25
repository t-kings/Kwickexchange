import React, { Component } from "react";
import style from "./Index.module.css";
import { withdrawNaira } from "../../../../../store/actions/trade";
import { connect } from "react-redux";
class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      errors: {
        password: [],
      },
    };
  }
  handleSubmit = async (e) => {
    e.preventDefault();
    const errors = {
      password: [],
    };
    this.setState({
      ...this.state,
      errors,
    });
    const { password } = this.state;
    const { withdraw, onwProps } = this.props;
    const { amount, account_name, account_number, bank } = onwProps;
    if (password.length < 1) {
      errors.password.push("Password is required");
    }
    if (errors.password.length > 0) {
      this.setState({
        ...this.state,
        errors,
      });
    } else {
      if (
        await withdraw({
          account_number,
          account_name,
          amount,
          bank_slug: bank.slug,
          bank_name: bank.name,
          bank_code: bank.code,
          bank_type: bank.type,
          bank_currency: bank.currency,
        })
      ) {
        document.querySelector("#nairaSummary").style.display = "none";
      }
    }
  };
  handleChange = (e) => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value,
    });
  };
  render() {
    const { errors } = this.state;
    const { nairaWithdrawalFee, onwProps } = this.props;
    const { amount, account_name, account_number, bank, isLoading } = onwProps;
    return (
      <section
        onClick={(e) => {
          if (e.target == document.querySelector("#nairaSummary")) {
            document.querySelector("#nairaSummary").style.display = "none";
          }
        }}
        id="nairaSummary"
        className={style.modal}
      >
        <div className={style.modal_item + " " + style.card}>
          <div className={style.prompt}>
            <div className={style.top}>
              <h3>Withdrawal Summary</h3>
            </div>
            <div className={style.box_}>
              <p>Service charge cost {nairaWithdrawalFee.percentage}</p>
              <div className={style.amounts}>
                <p>₦ {amount}</p>
                <p>{account_name}</p>
                <p>{bank.name}</p>
                <p>{account_number}</p>
              </div>
              <form className={style.box} onSubmit={this.handleSubmit}>
                <input
                  type="password"
                  placeholder="Password"
                  required
                  onChange={this.handleChange}
                  id="password"
                  name="password"
                  className={
                    style.form_control +
                    " " +
                    (errors.password.length > 0 ? style.error : " ")
                  }
                />
                {errors.password.map((item, idx) => (
                  <p key={idx} className={style.error_par}>
                    {item.msg}
                  </p>
                ))}
              </form>
            </div>
            <div className={style.actions}>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#nairaSummary").style.display =
                    "none";
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
                  onClick={this.handleSubmit}
                  className={style.button + " " + style.link_btn_gold}
                >
                  Withdraw
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
    withdraw: (payload) => dispatch(withdrawNaira(payload)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Index);
