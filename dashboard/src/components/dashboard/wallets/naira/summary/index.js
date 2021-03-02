import React, { Component } from "react";
import style from "./Index.module.css";
import {
  withdrawNaira,
  transferNairaEmail,
} from "../../../../../store/actions/trade";
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
    const {
      withdraw,
      onwProps,
      transferNairaEmail,
      nairaTransfer,
    } = this.props;
    const {
      amount,
      account_name,
      account_number,
      bank,
      isWithdrawal,
    } = onwProps;
    if (isWithdrawal) {
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
            password,
            bank_currency: bank.currency,
          })
        ) {
          document.querySelector("#nairaSummary").style.display = "none";
        }
      }
    } else {
      if (
        await transferNairaEmail({
          email: nairaTransfer.email,
          amount: nairaTransfer.amount.toString(),
          password: nairaTransfer.password,
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
    const {
      nairaWithdrawalFee,
      onwProps,
      nairaTransfer,
      isLoading,
    } = this.props;
    const {
      amount,
      account_name,
      account_number,
      bank,
      isWithdrawal,
    } = onwProps;
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
              <h3>{isWithdrawal ? "Withdrawal" : "Transfer"} Summary</h3>
            </div>
            <div className={style.box_}>
              <p>Service charge cost {nairaWithdrawalFee.percentage}</p>
              {isWithdrawal ? (
                <div className={style.amounts}>
                  <p>₦ {amount}</p>
                  <p>{account_name}</p>
                  <p>{bank.name}</p>
                  <p>{account_number}</p>
                </div>
              ) : (
                <div className={style.amounts}>
                  <p>₦ {nairaTransfer.amount}</p>
                  <p>{nairaTransfer.email}</p>
                </div>
              )}
              {isWithdrawal ? (
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
              ) : null}
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
                  {isWithdrawal ? "Withdraw" : "Transfer"}
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
    transferNairaEmail: (payload) => dispatch(transferNairaEmail(payload)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Index);
