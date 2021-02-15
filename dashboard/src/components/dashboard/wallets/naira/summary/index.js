import React, { Component } from "react";
import style from "./Index.module.css";
import { connect } from "react-redux";
class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: [],
    };
  }
  handleSubmit = () => {};
  handleChange = () => {};
  render() {
    const { errors } = this.state;
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
            <p>Service charge cost ₦55</p>
            <div className={style.amounts}>
              <p>₦ 0.00</p>
              <p>Nwachukwu, Kingsley</p>
              <p>United Bank for Africa</p>
              <p>02220565481</p>
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
                  (errors.filter((error) => error.param === "password").length >
                  0
                    ? style.error
                    : " ")
                }
              />
              {errors
                .filter((error) => error.param === "password")
                .map((item, idx) => (
                  <p key={idx} className={style.error_par}>
                    {item.msg}
                  </p>
                ))}
            </form>

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
              <button
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#nairaSummary").style.display =
                    "none";
                }}
                className={style.button + " " + style.link_btn_gold}
              >
                Withdraw
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
