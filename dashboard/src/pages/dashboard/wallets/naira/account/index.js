import React from "react";
import style from "./Index.module.css";
import { connect } from "react-redux";
// import { logout } from "../../store/actions/auth";
const Index = ({ logout }) => {
  const errors = {
    bank_name: [],
    account_name: [],
    amount: [],
    account_number: [],
  };
  const handleSubmit = () => {};
  const handleChange = () => {};
  return (
    <section id="bankList" className={style.modal}>
      <div className={style.modal_item + " " + style.card}>
        <div className={style.prompt}>
          <div className={style.top}>
            <h3>Add Bank Account</h3>
          </div>
          <form className={style.box} onSubmit={handleSubmit}>
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
              id="bank_name"
              name="bank_name"
              onChange={handleChange}
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
              id="account_name"
              name="account_name"
              onChange={handleChange}
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
              id="account_number"
              name="account_number"
              onChange={handleChange}
              required
            />
            {errors["account_number"].map((item, idx) => (
              <p key={idx} className={style.error_par}>
                {item}
              </p>
            ))}

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
              placeholder="amount"
              id="amount"
              name="amount"
              onChange={handleChange}
              className={
                style.form_control +
                " " +
                (errors["amount"].length > 0 ? style.error : " ")
              }
            />
            {errors["amount"].map((item, idx) => (
              <p key={idx} className={style.error_par}>
                {item}
              </p>
            ))}
            <input
              type="submit"
              value="Create Account"
              className={style.link_btn_gold}
            />
          </form>
          <div className={style.actions}>
            <button
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#bankList").style.display = "none";
              }}
              className={style.button + " " + style.grey}
            >
              Cancel
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                logout();
                document.querySelector("#bankList").style.display = "none";
              }}
              className={style.button + " " + style.red}
            >
              Leave
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    // logout: () => dispatch(logout()),
  };
};
export default connect(null, mapDispatchToProps)(Index);
