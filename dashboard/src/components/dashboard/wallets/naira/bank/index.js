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
            <ul>
              <li>
                <p>John Ebrima Kalls</p>
                <p>United Bank for Africa</p>
                <p>02220565481</p>
              </li>
              <li>
                <p>John Ebrima Kalls</p>
                <p>United Bank for Africa</p>
                <p>02220565481</p>
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
            </div>
          </div>
        </div>
      </section>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {};
};
export default connect(null, mapDispatchToProps)(Index);
