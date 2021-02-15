import React from "react";
import style from "./Index.module.css";
import { connect } from "react-redux";
// import { logout } from "../../store/actions/auth";
const Index = ({ logout }) => {
  return (
    <section id="bankList" className={style.modal}>
      <div className={style.modal_item + " " + style.card}>
        <div className={style.prompt}>
          <div className={style.top}>
            <h3>Select Bank Account</h3>
          </div>
          <ul>
            <li>
              <h4>John Ebrima Kalls</h4>
              <p>United Bank for Africa</p>
              <h6>02220565481</h6>
            </li>
            <li>
              <h4>John Ebrima Kalls</h4>
              <p>United Bank for Africa</p>
              <h6>02220565481</h6>
            </li>
          </ul>
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
