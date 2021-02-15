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
            <h3>Delete Bank Account</h3>
          </div>
          <p>Are you sure you want to delete this bank account ?</p>

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
