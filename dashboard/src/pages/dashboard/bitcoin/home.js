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
import { buyBitcoin, sellBitcoin } from "../../../store/actions/trade";
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formTab: 1,
      dollar: 0.0,
      btc: 0.0,
      naira: 0.0,
    };
  }
  handleBTC = (e) => {
    const { bitcoinBuyRate, bitcoinSellRate } = this.props;
    const { formTab } = this.state;
    const btc = parseFloat(e.target.value);
    let naira, dollar;
    if (formTab === 1) {
      dollar = btc * bitcoinBuyRate.usd;
    } else {
      dollar = btc * bitcoinSellRate.usd;
    }
    if (formTab === 1) {
      naira = dollar * bitcoinBuyRate.naira;
    } else {
      naira = dollar * bitcoinSellRate.naira;
    }
    this.setState({
      ...this.state,
      btc,
      dollar: dollar ? dollar : 0,
      naira: naira ? naira : 0,
    });
  };
  handleDollar = (e) => {
    const { bitcoinBuyRate, bitcoinSellRate } = this.props;
    const { formTab } = this.state;
    const dollar = parseFloat(e.target.value);
    let naira, btc;
    if (formTab === 1) {
      naira = dollar * bitcoinBuyRate.naira;
    } else {
      naira = dollar * bitcoinSellRate.naira;
    }
    if (formTab === 1) {
      btc = dollar / bitcoinBuyRate.usd;
    } else {
      btc = dollar / bitcoinSellRate.usd;
    }
    this.setState({
      ...this.state,
      dollar,
      naira: naira ? naira : 0,
      btc: btc ? btc : 0,
    });
  };

  handleNaira = (e) => {
    const { bitcoinBuyRate, bitcoinSellRate } = this.props;
    const { formTab } = this.state;
    const naira = parseFloat(e.target.value);
    let dollar, btc;
    if (formTab === 1) {
      dollar = naira / bitcoinBuyRate.naira;
    } else {
      dollar = naira / bitcoinSellRate.naira;
    }

    if (formTab === 1) {
      btc = dollar / bitcoinBuyRate.usd;
    } else {
      btc = dollar / bitcoinSellRate.usd;
    }

    this.setState({
      ...this.state,
      dollar: dollar ? dollar : 0,
      btc: btc ? btc : 0,
      naira,
    });
  };

  handleBuy = (e) => {
    e.preventDefault();
    const { naira, formTab } = this.state;
    const { bitcoinSellRate } = this.props;
    if (formTab === 2) {
      const newNaira = naira === null || naira === undefined ? 0 : naira;
      const dollar = naira / bitcoinSellRate.naira;
      const btc = dollar / bitcoinSellRate.usd;
      this.setState({
        ...this.state,
        dollar: dollar ? dollar : 0,
        btc: btc ? btc : 0,
        naira: newNaira ? newNaira : 0,
        formTab: 1,
      });
    }
  };

  handleSell = (e) => {
    e.preventDefault();
    const { naira, formTab } = this.state;
    const { bitcoinBuyRate } = this.props;
    if (formTab === 1) {
      const newNaira = naira === null || naira === undefined ? 0 : naira;
      const dollar = naira / bitcoinBuyRate.naira;
      const btc = dollar / bitcoinBuyRate.usd;
      this.setState({
        ...this.state,
        dollar: dollar ? dollar : 0,
        btc: btc ? btc : 0,
        naira: newNaira ? newNaira : 0,
        formTab: 2,
      });
    }
  };
  render() {
    const { formTab, btc } = this.state;
    const {
      isAuthenticated,
      balance,
      bitcoinBuyRate,
      bitcoinSellRate,
      buyBitcoin,
      sellBitcoin,
      isLoading,
    } = this.props;
    if (!isAuthenticated) {
      return <Redirect to={{ pathname: "/", redirect_to: "/home/bitcoin" }} />;
    }
    return (
      <section className={bitcoinStyle.home}>
        <h1 className={bitcoinStyle.title}>BITCOIN</h1>
        <div className={bitcoinStyle.balances}>
          <div className={style.card + " " + bitcoinStyle.balance}>
            <h4>BTC Wallet Balance</h4>
            <h3>
              {balance.fiat.symbol} {balance.bitcoin_in_fiat}
            </h3>
            <p>{balance.bitcoin} BTC</p>
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
              onClick={this.handleBuy}
              className={formTab === 1 ? bitcoinStyle.active : ""}
            >
              Buy
            </button>
            <button
              onClick={this.handleSell}
              className={formTab === 1 ? "" : bitcoinStyle.active}
            >
              Sell
            </button>
          </div>
          {formTab === 1 ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                buyBitcoin({
                  amount: btc,
                });
              }}
            >
              <div className={bitcoinStyle.rates_text}>
                <h2>Exchange Rate</h2>
                <p>
                  $
                  {bitcoinBuyRate.usd
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  /BTC
                </p>
              </div>
              <div className={bitcoinStyle.input}>
                <span>BTC</span>
                <input
                  type="number"
                  step="any"
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
                  step="any"
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
                  step="any"
                  min={0}
                  name="naira"
                  id="naira"
                  value={this.state.naira}
                  onChange={this.handleNaira}
                />
              </div>
              {isLoading ? (
                <div
                  className={
                    bitcoinStyle.load + " " + bitcoinStyle.link_btn_gold
                  }
                >
                  <div className={bitcoinStyle.loader}>Loading...</div>
                </div>
              ) : (
                <input
                  className={bitcoinStyle.link_btn_gold}
                  type="submit"
                  value="BUY BITCOIN"
                />
              )}
            </form>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                sellBitcoin({
                  amount: btc,
                });
              }}
            >
              <div className={bitcoinStyle.rates_text}>
                <h2>Exchange Rate</h2>
                <p>
                  $
                  {bitcoinSellRate.usd
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  /BTC
                </p>
              </div>
              <div className={bitcoinStyle.input}>
                <span>BTC</span>
                <input
                  type="number"
                  step="any"
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
                  step="any"
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
                  step="any"
                  min={0}
                  name="naira"
                  id="naira"
                  value={this.state.naira}
                  onChange={this.handleNaira}
                />
              </div>
              {isLoading ? (
                <div
                  className={
                    bitcoinStyle.load + " " + bitcoinStyle.link_btn_gold
                  }
                >
                  <div className={bitcoinStyle.loader}>Loading...</div>
                </div>
              ) : (
                <input
                  className={bitcoinStyle.link_btn_gold}
                  type="submit"
                  value="SELL BITCOIN"
                />
              )}
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
  return { ...state.auth, ...state.resources, ...state.trade };
};

const mapDispatchToProps = (dispatch) => {
  return {
    buyBitcoin: (payload) => dispatch(buyBitcoin(payload)),
    sellBitcoin: (payload) => dispatch(sellBitcoin(payload)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
