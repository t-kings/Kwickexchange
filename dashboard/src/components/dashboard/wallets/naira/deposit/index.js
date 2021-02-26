import React, { Component } from "react";
import style from "./Index.module.css";
import { depositNaira } from "../../../../../store/actions/trade";
import { connect } from "react-redux";
class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: "",
      errors: {
        amount: [],
      },
    };
  }
  handleSubmit = async (e) => {
    e.preventDefault();
    const errors = {
      amount: [],
    };
    this.setState({
      ...this.state,
      errors,
    });
    const { amount } = this.state;
    const { depositNaira } = this.props;
    if (amount.length < 1) {
      errors.amount.push("amount is required");
    }
    if (amount < 5000) {
      errors.amount.push("Minimum amount is ₦5,000");
    }
    if (errors.amount.length > 0) {
      this.setState({
        ...this.state,
        errors,
      });
    } else {
      if (
        await depositNaira({
          amount,
        })
      ) {
        document.querySelector("#nairaDeposit").style.display = "none";
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
    const { isLoading } = this.props;
    return (
      <section
        onClick={(e) => {
          if (e.target == document.querySelector("#nairaDeposit")) {
            document.querySelector("#nairaDeposit").style.display = "none";
          }
        }}
        id="nairaDeposit"
        className={style.modal}
      >
        <div className={style.modal_item + " " + style.card}>
          <div className={style.prompt}>
            <div className={style.top}>
              <h3>Deposit Naira</h3>
            </div>
            <div className={style.box_}>
              <form className={style.box} onSubmit={this.handleSubmit}>
                <input
                  type="number"
                  step="any"
                  placeholder="0.00"
                  min={5000}
                  required
                  onChange={this.handleChange}
                  id="amount"
                  name="amount"
                  className={
                    style.form_control +
                    " " +
                    (errors.amount.length > 0 ? style.error : " ")
                  }
                />
                {errors.amount.map((item, idx) => (
                  <p key={idx} className={style.error_par}>
                    {item}
                  </p>
                ))}
              </form>
            </div>
            <div className={style.actions}>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#nairaDeposit").style.display =
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
                  Deposit
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
    depositNaira: (payload) => dispatch(depositNaira(payload)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Index);
