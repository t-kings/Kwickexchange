import React, { Component } from "react";
import style from "../Index.module.css";
import overviewStyle from "./overview.module.css";
import img1 from "../images/img1.png";
import { connect } from "react-redux";
import img2 from "../images/img2.png";
import vc1 from "../images/vc1.png";
import vc2 from "../images/vc2.png";
import vc3 from "../images/vc3.png";
import { buyBitcoin, sellBitcoin } from "../../../store/actions/trade";
import { Link, Redirect } from "react-router-dom";
class Overview extends Component {
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
      transactionCount,
      balance,
      bitcoinBuyRate,
      bitcoinSellRate,
      buyBitcoin,
      sellBitcoin,
      isLoading,
    } = this.props;
    if (!isAuthenticated) {
      return <Redirect to={{ pathname: "/", redirect_to: "/home/overview" }} />;
    }
    return (
      <main className={style.main_body}>
        <section className={overviewStyle.overview}>
          <div className={overviewStyle.actions}>
            <div className={overviewStyle.balances}>
              <Link
                to="/home/wallet/bitcoin"
                className={style.card + " " + overviewStyle.balance}
              >
                <svg
                  className={overviewStyle.flier}
                  viewBox="0 0 687 313"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    opacity="0.1"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M0 -6C12.8066 172.315 161.527 313 343.105 313C524.684 313 673.404 172.315 686.211 -6H598.905C586.336 124.206 476.608 226 343.105 226C209.603 226 99.8752 124.206 87.3059 -6H0Z"
                    fill="#0094FF"
                  />
                </svg>
                <svg
                  className={overviewStyle.second_flier}
                  viewBox="0 0 687 313"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    opacity="0.1"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M0 -6C12.8066 172.315 161.527 313 343.105 313C524.684 313 673.404 172.315 686.211 -6H598.905C586.336 124.206 476.608 226 343.105 226C209.603 226 99.8752 124.206 87.3059 -6H0Z"
                    fill="#0094FF"
                  />
                </svg>
                <div>
                  <span className={overviewStyle.btc}>
                    <svg
                      width="13"
                      height="18"
                      viewBox="0 0 13 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2 10V14H0V16H3V18H5V16H7V18H9V15.949C10.968 15.7 12.5 14.034 12.5 12C12.5 10.68 11.85 9.516 10.86 8.787C11.5901 8.04302 11.9994 7.0424 12 6C12 4.142 10.721 2.589 9 2.142V0H7V2H5V0H3V2H0V4H2V10ZM8.5 14H4V10H8.5C9.603 10 10.5 10.897 10.5 12C10.5 13.103 9.603 14 8.5 14ZM4 4H8C9.103 4 10 4.897 10 6C10 7.103 9.103 8 8 8H4V4Z"
                        fill="#0094FF"
                      />
                    </svg>
                  </span>
                  <h3>{balance.bitcoin} BTC</h3>
                  <p>BTC Wallet Balance</p>
                </div>
              </Link>
              <Link
                to="/home/wallet/naira"
                className={style.card + " " + overviewStyle.balance}
              >
                <svg
                  className={overviewStyle.flier}
                  viewBox="0 0 687 313"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    opacity="0.1"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M0 -6C12.8066 172.315 161.527 313 343.105 313C524.684 313 673.404 172.315 686.211 -6H598.905C586.336 124.206 476.608 226 343.105 226C209.603 226 99.8752 124.206 87.3059 -6H0Z"
                    fill=" #00C844"
                  />
                </svg>
                <svg
                  className={overviewStyle.second_flier}
                  viewBox="0 0 687 313"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    opacity="0.1"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M0 -6C12.8066 172.315 161.527 313 343.105 313C524.684 313 673.404 172.315 686.211 -6H598.905C586.336 124.206 476.608 226 343.105 226C209.603 226 99.8752 124.206 87.3059 -6H0Z"
                    fill=" #00C844"
                  />
                </svg>
                <div>
                  <span className={overviewStyle.naira}>
                    <svg
                      width="14"
                      height="16"
                      viewBox="0 0 14 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1.13708 15.0743H2.84451V2.46401L10.2708 15.0743H12.3279V0.365723H10.6205V12.5234L3.46166 0.365723H1.13708V15.0743Z"
                        fill="#00C844"
                      />
                      <rect y="5" width="14" height="2" fill="#00C844" />
                      <rect y="9" width="14" height="2" fill="#00C844" />
                    </svg>
                  </span>
                  <h3>₦ {balance.naira}</h3>
                  <p>Naira Wallet Balance</p>
                </div>
              </Link>
              <Link
                to="/home/transactions"
                className={style.card + " " + overviewStyle.balance}
              >
                <svg
                  className={overviewStyle.flier}
                  viewBox="0 0 687 313"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    opacity="0.1"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M0 -6C12.8066 172.315 161.527 313 343.105 313C524.684 313 673.404 172.315 686.211 -6H598.905C586.336 124.206 476.608 226 343.105 226C209.603 226 99.8752 124.206 87.3059 -6H0Z"
                    fill="#AC00C8"
                  />
                </svg>
                <svg
                  className={overviewStyle.second_flier}
                  viewBox="0 0 687 313"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    opacity="0.1"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M0 -6C12.8066 172.315 161.527 313 343.105 313C524.684 313 673.404 172.315 686.211 -6H598.905C586.336 124.206 476.608 226 343.105 226C209.603 226 99.8752 124.206 87.3059 -6H0Z"
                    fill="#AC00C8"
                  />
                </svg>
                <div>
                  <span className={overviewStyle.trans}>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 4.5H13.6M10.8 1L14.3 4.5L10.8 8M15 11.5H2.4M5.2 8L1.7 11.5L5.2 15"
                        stroke="#AC00C8"
                        strokeWidth="2"
                      />
                    </svg>
                  </span>
                  <h3>{transactionCount.count}</h3>
                  <p>Total Transactions </p>
                </div>
              </Link>
            </div>
            <div className={overviewStyle.sell}>
              <div className={overviewStyle.text}>
                <h1>Sell your Gift Cards</h1>
                <p>
                  Sell your gift cards from our over 123 gift cards at good
                  rates.
                </p>
                <Link
                  to="/home/gift-cards"
                  className={overviewStyle.link_btn_gold}
                >
                  SELL GIFT CARD
                </Link>
              </div>
              <div>
                <div className={overviewStyle.img}>
                  <span>
                    <img src={img1} alt="gift-cards" />
                  </span>
                </div>
              </div>
            </div>
            <div className={overviewStyle.graph}>
              <iframe
                title="."
                src="https://widget.coinlib.io/widget?type=chart&theme=light&coin_id=859&pref_coin_id=1505"
                width="100%"
                height="536px"
                scrolling="auto"
                marginWidth="0"
                marginHeight="0"
                frameBorder="0"
                border="0"
              ></iframe>
            </div>
          </div>
          <div className={overviewStyle.rates}>
            <div className={overviewStyle.hold}>
              <div className={overviewStyle.holder}>
                <div className={overviewStyle.tabs}>
                  <button
                    onClick={this.handleBuy}
                    className={formTab === 1 ? overviewStyle.active : ""}
                  >
                    Buy
                  </button>
                  <button
                    onClick={this.handleSell}
                    className={formTab === 1 ? "" : overviewStyle.active}
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
                    <div className={overviewStyle.rates_text}>
                      <h2>Exchange Rate</h2>
                      <p>
                        $
                        {bitcoinBuyRate.usd
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        /BTC
                      </p>
                    </div>
                    <div className={overviewStyle.input}>
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
                    <div className={overviewStyle.input}>
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
                    <div className={overviewStyle.input}>
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
                          overviewStyle.load + " " + overviewStyle.link_btn_gold
                        }
                      >
                        <div className={overviewStyle.loader}>Loading...</div>
                      </div>
                    ) : (
                      <input
                        className={overviewStyle.link_btn_gold}
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
                    <div className={overviewStyle.rates_text}>
                      <h2>Exchange Rate</h2>
                      <p>
                        $
                        {bitcoinSellRate.usd
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        /BTC
                      </p>
                    </div>
                    <div className={overviewStyle.input}>
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
                    <div className={overviewStyle.input}>
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
                    <div className={overviewStyle.input}>
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
                          overviewStyle.load + " " + overviewStyle.link_btn_gold
                        }
                      >
                        <div className={overviewStyle.loader}>Loading...</div>
                      </div>
                    ) : (
                      <input
                        className={overviewStyle.link_btn_gold}
                        type="submit"
                        value="SELL BITCOIN"
                      />
                    )}
                  </form>
                )}
              </div>
              <img src={vc1} className={overviewStyle.vc} alt="vector" />
              <img src={vc2} className={overviewStyle.vc} alt="vector" />
              <img src={vc3} className={overviewStyle.vc} alt="vector" />
            </div>
          </div>
        </section>
      </main>
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
export default connect(mapStateToProps, mapDispatchToProps)(Overview);
