import React, { Component } from "react";
import style from "./Index.module.css";
import { deleteAccount } from "../../../../../store/actions/trade";
import { connect } from "react-redux";
class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { isLoading, deleteAccount, accountToDelete } = this.props;
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
              {isLoading ? (
                <div className={style.load + " " + style.link_btn_gold}>
                  <div className={style.loader}>Loading...</div>
                </div>
              ) : (
                <button
                  className={style.button + " " + style.red}
                  onClick={async (e) => {
                    e.preventDefault();
                    if (await deleteAccount(accountToDelete)) {
                      document.querySelector(
                        "#deleteAccountPrompt"
                      ).style.display = "none";
                    }
                  }}
                >
                  Delete
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
  return { ...state.trade };
};
const mapDispatchToProps = (dispatch) => {
  return {
    deleteAccount: (id) => dispatch(deleteAccount(id)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Index);
