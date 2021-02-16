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
    const { errors } = this.state;
    return (
      <section
        id="addBank"
        onClick={(e) => {
          if (e.target == document.querySelector("#addBank")) {
            document.querySelector("#addBank").style.display = "none";
          }
        }}
        className={style.modal}
      >
        <div className={style.modal_item + " " + style.card}>
          <div className={style.prompt}>
            <div className={style.top}>
              <h3>Add Bank Account</h3>
            </div>
            <form className={style.box} onSubmit={this.handleSubmit}>
              <label
                className={
                  style.control_label +
                  " " +
                  (errors["bank_name"].length > 0 ? style.error : " ")
                }
                htmlFor="bank_name"
              >
                Select Bank
              </label>
              <select
                className={
                  style.form_control +
                  " " +
                  (errors["bank_name"].length > 0 ? style.error : " ")
                }
                id="bank_name_address"
                name="bank_name"
                onChange={this.handleChange}
                required
              >
                <option value="first bank">First Bank</option>
              </select>
              {errors["bank_name"].map((item, idx) => (
                <p key={idx} className={style.error_par}>
                  {item}
                </p>
              ))}

              <label
                className={
                  style.control_label +
                  " " +
                  (errors["account_name"].length > 0 ? style.error : " ")
                }
                htmlFor="account_name"
              >
                Account Name
              </label>
              <input
                type="text"
                className={
                  style.form_control +
                  " " +
                  (errors["account_name"].length > 0 ? style.error : " ")
                }
                id="account_name_naira"
                name="account_name"
                onChange={this.handleChange}
                required
              />
              {errors["account_name"].map((item, idx) => (
                <p key={idx} className={style.error_par}>
                  {item}
                </p>
              ))}

              <label
                className={
                  style.control_label +
                  " " +
                  (errors["account_number"].length > 0 ? style.error : " ")
                }
                htmlFor="account_number"
              >
                Account Number
              </label>
              <input
                type="text"
                className={
                  style.form_control +
                  " " +
                  (errors["account_number"].length > 0 ? style.error : " ")
                }
                id="account_number_account"
                name="account_number"
                onChange={this.handleChange}
                required
              />
              {errors["account_number"].map((item, idx) => (
                <p key={idx} className={style.error_par}>
                  {item}
                </p>
              ))}
            </form>
            <div className={style.actions}>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#addBank").style.display = "none";
                }}
                className={style.button + " " + style.grey}
              >
                Cancel
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                }}
                className={style.button + " " + style.link_btn_gold}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    // logout: () => dispatch(logout()),
  };
};
export default connect(null, mapDispatchToProps)(Index);
