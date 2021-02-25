import React, { Component } from "react";
import style from "./Index.module.css";
import { connect } from "react-redux";
class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { userBanks, mySetState } = this.props;
    return (
      <section
        id="bankList"
        className={style.modal}
        onClick={(e) => {
          if (e.target == document.querySelector("#bankList")) {
            document.querySelector("#bankList").style.display = "none";
          }
        }}
      >
        <div className={style.modal_item + " " + style.card}>
          <div className={style.prompt}>
            <div className={style.top}>
              <h3>Select Bank Account</h3>
            </div>
            {userBanks.length > 0 ? (
              <ul>
                {userBanks.map((itm, idx) => (
                  <li
                    onClick={() => {
                      mySetState({
                        ...itm,
                        bank_name: itm.bank_code,
                      });
                      document.querySelector("#bankList").style.display =
                        "none";
                    }}
                    key={idx}
                  >
                    <p>{itm.account_name}</p>
                    <p>{itm.bank_name}</p>
                    <p>{itm.account_number}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>You have not saved any bank yet</p>
            )}

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
            </div>
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  return { ...state.resources };
};
export default connect(mapStateToProps, null)(Index);
