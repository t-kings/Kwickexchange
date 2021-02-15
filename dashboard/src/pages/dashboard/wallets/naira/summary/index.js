import React from "react";
import style from "./Index.module.css";
import { connect } from "react-redux";
// import { logout } from "../../store/actions/auth";
const Index = ({ logout, isLoading }) => {
  const errors = [];
  const handleSubmit = () => {};
  const handleChange = () => {};
  return (
    <section id="bankList" className={style.modal}>
      <div className={style.modal_item + " " + style.card}>
        <div className={style.prompt}>
          <div className={style.top}>
            <h3>Withdrawal Summary</h3>
          </div>
          <p>Service charge cost ₦55</p>
          <div className={style.account}>
            <h4>John Ebrima Kalls</h4>
            <p>United Bank for Africa</p>
            <h6>02220565481</h6>
          </div>
          <form className={style.box} onSubmit={handleSubmit}>
            <input
              type="password"
              placeholder="Password"
              required
              onChange={handleChange}
              id="password"
              name="password"
              className={
                style.form_control +
                " " +
                (errors.filter((error) => error.param === "password").length > 0
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
            {isLoading ? (
              <div className={style.load + " " + style.link_btn_gold}>
                <div className={style.loader}>Loading...</div>
              </div>
            ) : (
              <input
                type="submit"
                value="Login"
                className={style.link_btn_gold}
              />
            )}
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
