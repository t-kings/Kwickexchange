import React, { Component } from "react";
import bitcoinStyle from "./Index.module.css";
import { Link } from "react-router-dom";
import itunes from "./images/itunes.png";
import vc1 from "../images/vc1.png";
import vc2 from "../images/vc2.png";
import vc3 from "../images/vc3.png";
class Status extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formTab: 1,
      dollar: 0.0,
      btc: 0.0,
    };
  }
  handleBTC = (e) => {
    const btc = parseFloat(e.target.value);
    const dollar = btc * this.props.bitcoinContext.sell.usd;
    this.setState({
      ...this.state,
      btc,
      dollar,
    });
  };
  handleDollar = (e) => {
    const dollar = parseFloat(e.target.value);
    const btc = dollar / this.props.bitcoinContext.sell.usd;
    this.setState({
      ...this.state,
      dollar,
      btc,
    });
  };

  render() {
    const { formTab } = this.state;
    return (
      <section className={bitcoinStyle.home}>
        <Link className={bitcoinStyle.back}>
          <span>
            <svg
              width="12"
              height="20"
              viewBox="0 0 12 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11 1L2 10L11 19"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </span>
          <span>Trade Gift Card</span>
        </Link>

        <div className={bitcoinStyle.hold}>
          <h1 className={bitcoinStyle.summary}>Summary</h1>
          <form onSubmit={this.handleBuy}>
            <img className={bitcoinStyle.img} src={itunes} alt="itunes" />
            <div className={bitcoinStyle.input}>
              <div>
                <p>Product</p>
              </div>
              <div>
                <p>Itunes Card</p>
              </div>
            </div>
            <div className={bitcoinStyle.input}>
              <div>
                <p>Currency</p>
              </div>
              <div>
                <p>Select Currency</p>
              </div>
            </div>
            <div className={bitcoinStyle.input}>
              <div>
                <p>Quantity</p>
              </div>
              <div>
                <div className={bitcoinStyle.increments}>
                  <input disabled={true} type="number" defaultValue="12" />
                </div>
              </div>
            </div>
            <div className={bitcoinStyle.input}>
              <div>
                <p>Rate</p>
              </div>
              <div>
                <p className={bitcoinStyle.rates_text}>₦ 234/CAD</p>
              </div>
            </div>
            <div className={bitcoinStyle.input}>
              <div>
                <p>Total</p>
              </div>
              <div>
                <p className={bitcoinStyle.total}>₦ 234/CAD</p>
              </div>
            </div>
            <hr />
            <div className={bitcoinStyle.input}>
              <div>
                <p>Payment Method</p>
              </div>
              <div>
                <p>Select Currency</p>
              </div>
            </div>
            <input
              className={bitcoinStyle.link_btn_gold}
              type="submit"
              value="SELL"
            />
          </form>
          <img src={vc1} className={bitcoinStyle.vc} alt="vector" />
          <img src={vc2} className={bitcoinStyle.vc} alt="vector" />
          <img src={vc3} className={bitcoinStyle.vc} alt="vector" />
        </div>
      </section>
    );
  }
}
export default Status;
