import React, { Component } from "react";
import bitcoinStyle from "./Index.module.css";
import style from "../Index.module.css";
import { Link } from "react-router-dom";
class Status extends Component {
  render() {
    return (
      <section className={bitcoinStyle.home}>
        <div className={style.card + " " + bitcoinStyle.transaction}>
          <h3>Transaction Successful</h3>
          <p>Your transaction was successful!</p>
          <Link to="/home/bitcoin" className={bitcoinStyle.link_btn_gold}>
            Done
          </Link>
        </div>
      </section>
    );
  }
}
export default Status;
