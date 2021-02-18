import React, { Component } from "react";
import bitcoinStyle from "./Index.module.css";
import { Redirect } from "react-router-dom";
import style from "../Index.module.css";
import { connect } from "react-redux";
import icon from "./images/btc.png";
import bg1 from "./images/bg1.svg";
import vc1 from "../images/vc1.png";
import vc2 from "../images/vc2.png";
import vc3 from "../images/vc3.png";
class Home extends Component {
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
    const { isAuthenticated } = this.props;
    if (!isAuthenticated) {
      return <Redirect to={{ pathname: "/", redirect_to: "/home/bitcoin" }} />;
    }
    return (
      <section className={bitcoinStyle.home}>
        <h1 className={bitcoinStyle.title}>BITCOIN</h1>
        <div className={bitcoinStyle.balances}>
          <div className={style.card + " " + bitcoinStyle.balance}>
            <h4>BTC Wallet Balance</h4>
            <h3>$ 0.00</h3>
            <p>0.0003423BTC</p>
          </div>
          <div className={style.card + " " + bitcoinStyle.balance_info}>
            <img src={icon} className={bitcoinStyle.icon} alt="wallet" />
            <p>
              All BTC transactions are taken place with the aid of your naira
              wallet
            </p>
            <img className={bitcoinStyle.flier} src={bg1} alt="bg" />
          </div>
        </div>

        <div className={bitcoinStyle.hold}>
          <div className={bitcoinStyle.tabs}>
            <button
              onClick={() => this.setState({ ...this.state, formTab: 1 })}
              className={formTab === 1 ? bitcoinStyle.active : ""}
            >
              Buy
            </button>
            <button
              onClick={() => this.setState({ ...this.state, formTab: 2 })}
              className={formTab === 1 ? "" : bitcoinStyle.active}
            >
              Sell
            </button>
          </div>
          {formTab === 1 ? (
            <form onSubmit={this.handleBuy}>
              <div className={bitcoinStyle.rates_text}>
                <h2>Exchange Rate</h2>
                <p>
                  $
                  {/* {bitcoin.sell.usd
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")} */}
                  /BTC
                </p>
              </div>
              <div className={bitcoinStyle.input}>
                <span>BTC</span>
                <input
                  type="number"
                  min={0}
                  name="btc"
                  id="btc"
                  onChange={this.handleBTC}
                  value={this.state.btc}
                />
              </div>
              <div className={bitcoinStyle.input}>
                <span>$</span>
                <input
                  type="number"
                  min={0}
                  name="dollars"
                  id="dollars"
                  value={this.state.dollar}
                  onChange={this.handleDollar}
                />
              </div>
              <div className={bitcoinStyle.input}>
                <span>₦</span>
                <input
                  type="number"
                  min={0}
                  name="naira"
                  id="naira"
                  value={this.state.naira}
                  onChange={this.handleNaira}
                />
              </div>
              <input
                className={bitcoinStyle.link_btn_gold}
                type="submit"
                value="SELL"
              />
            </form>
          ) : (
            <form onSubmit={this.handleBuy}>
              <div className={bitcoinStyle.rates_text}>
                <h2>Exchange Rate</h2>
                <p>
                  $
                  {/* {bitcoin.sell.usd
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")} */}
                  /BTC
                </p>
              </div>
              <div className={bitcoinStyle.input}>
                <span>BTC</span>
                <input
                  type="number"
                  min={0}
                  name="btc"
                  id="btc"
                  onChange={this.handleBTC}
                  value={this.state.btc}
                />
              </div>
              <div className={bitcoinStyle.input}>
                <span>$</span>
                <input
                  type="number"
                  min={0}
                  name="dollars"
                  id="dollars"
                  value={this.state.dollar}
                  onChange={this.handleDollar}
                />
              </div>
              <div className={bitcoinStyle.input}>
                <span>₦</span>
                <input
                  type="number"
                  min={0}
                  name="naira"
                  id="naira"
                  value={this.state.naira}
                  onChange={this.handleNaira}
                />
              </div>
              <input
                className={bitcoinStyle.link_btn_gold}
                type="submit"
                value="SELL"
              />
            </form>
          )}
          <img src={vc1} className={bitcoinStyle.vc} alt="vector" />
          <img src={vc2} className={bitcoinStyle.vc} alt="vector" />
          <img src={vc3} className={bitcoinStyle.vc} alt="vector" />
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  return { ...state.auth };
};
export default connect(mapStateToProps, null)(Home);
