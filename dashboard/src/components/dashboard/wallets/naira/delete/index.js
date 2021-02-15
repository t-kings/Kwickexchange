import React, { Component } from "react";
import style from "./Index.module.css";
import { connect } from "react-redux";
class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {
        btc: [],
        usd: [],
        address: [],
        password: [],
      },
    };
  }
  handleSubmit = () => {};
  handleChange = () => {};
  render() {
    return (
      <section
        id="deleteAccountPrompt"
        onClick={(e) => {
          if (e.target == document.querySelector("#deleteAccountPrompt")) {
            document.querySelector("#deleteAccountPrompt").style.display =
              "none";
          }
        }}
        className={style.modal}
      >
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
                  document.querySelector("#deleteAccountPrompt").style.display =
                    "none";
                }}
                className={style.button + " " + style.grey}
              >
                Cancel
              </button>
              <button className={style.button + " " + style.red}>Delete</button>
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
