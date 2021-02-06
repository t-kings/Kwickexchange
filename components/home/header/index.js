import React, { Component, useContext } from "react";
import { useRouter } from "next/router";
import style from "./Index.module.css";
import { BitcoinContext } from "../../../store/root";
const Index = () => {
  const router = useRouter();
  const bitcoinContext = useContext(BitcoinContext);
  return (
    <div>
      <Header router={router} bitcoinContext={bitcoinContext} />
    </div>
  );
};
export default Index;
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formTab: 1,
      dollar: 0.0,
      btc: 0.0,
      qty: 0,
      giftCard: 100,
      type: 25,
      total: 0,
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

  handleGiftCard = (e) => {
    const giftCard = e.target.value;
    const total = giftCard * this.state.qty * this.state.type;
    this.setState({
      ...this.state,
      giftCard,
      total,
    });
  };

  handleQTY = (e) => {
    const qty = parseFloat(e.target.value);
    const total = this.state.giftCard * qty * this.state.type;
    this.setState({
      ...this.state,
      qty,
      total,
    });
  };

  handleType = (e) => {
    const type = parseFloat(e.target.value);
    const total = this.state.giftCard * type * this.state.qty;
    this.setState({
      ...this.state,
      type,
      total,
    });
  };
  render() {
    const { formTab } = this.state;
    return (
      <header className={style.header}>
        <div className={style.flier}>
          <svg
            viewBox="0 0 687 313"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              opacity="0.1"
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0 -6C12.8066 172.315 161.527 313 343.105 313C524.684 313 673.404 172.315 686.211 -6H598.905C586.336 124.206 476.608 226 343.105 226C209.603 226 99.8752 124.206 87.3059 -6H0Z"
              fill="white"
            />
          </svg>
        </div>
        <div className={style.second_flier}>
          <svg
            className={style.second_flier}
            viewBox="0 0 221 523"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g opacity="0.1" filter="url(#filter0_f)">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M221.017 17C144.986 22.4606 84.9998 85.8726 84.9998 163.295C84.9998 240.717 144.986 304.129 221.017 309.59L221.017 272.364C165.499 267.005 122.095 220.219 122.095 163.295C122.095 106.371 165.499 59.5853 221.017 54.2259L221.017 17Z"
                fill="white"
              />
            </g>
            <g opacity="0.1" filter="url(#filter1_f)">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M238.016 15.595C107.206 24.9899 4.00006 134.09 4.00005 267.295C4.00004 400.5 107.206 509.6 238.016 518.995L238.016 454.948C142.498 445.727 67.8227 365.232 67.8227 267.295C67.8227 169.358 142.498 88.8629 238.016 79.642L238.016 15.595Z"
                fill="white"
              />
            </g>
            <defs>
              <filter
                id="filter0_f"
                x="67.9999"
                y="0"
                width="170.017"
                height="326.59"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="BackgroundImageFix"
                  result="shape"
                />
                <feGaussianBlur
                  stdDeviation="8.5"
                  result="effect1_foregroundBlur"
                />
              </filter>
              <filter
                id="filter1_f"
                x="0"
                y="11.595"
                width="242.016"
                height="511.4"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="BackgroundImageFix"
                  result="shape"
                />
                <feGaussianBlur
                  stdDeviation="2"
                  result="effect1_foregroundBlur"
                />
              </filter>
            </defs>
          </svg>
        </div>

        <div className={style.header_holder}>
          <div className={style.info_holder}>
            <h1>
              A Trusted and Secure <br /> Exchange of Crypto
            </h1>
            <p className={style.subtitle}>
              The most reliable crypto currency exchange platform. Where you
              have easy access to your money anytime you want it.
            </p>
            <div className={style.action_buttons}>
              <a href="/#contact_us" className={style.link_btn_gold}>
                Contact Us
              </a>
            </div>
          </div>
          <div className={style.animated_payment}>
            <div className={style.hold}>
              <div className={style.tabs}>
                <button
                  onClick={() => this.setState({ ...this.state, formTab: 1 })}
                  className={formTab === 1 ? style.active : ""}
                >
                  Bitcoin
                </button>
                <button
                  onClick={() => this.setState({ ...this.state, formTab: 2 })}
                  className={formTab === 1 ? "" : style.active}
                >
                  Gift Card
                </button>
              </div>
              {formTab === 1 ? (
                this.props.bitcoinContext.sell.usd ? (
                  <form target="_blank" action="https://url.com/signup">
                    <div className={style.input}>
                      <span>BTC</span>
                      <input
                        type="number"
                        min={0}
                        name="btc"
                        id="btc"
                        onChange={this.handleBTC}
                        value={this.state.btc}
                      />
                      <span>$234/BTC</span>
                    </div>
                    <div className={style.input}>
                      <span>$</span>
                      <input
                        type="number"
                        min={0}
                        name="dollars"
                        id="dollars"
                        value={this.state.dollar}
                        onChange={this.handleDollar}
                      />
                      <span></span>
                    </div>
                    <input
                      className={style.link_btn_gold}
                      type="submit"
                      value="SELL"
                    />
                  </form>
                ) : (
                  <div className={style.load}>
                    <div className={style.loader}>Loading...</div>
                  </div>
                )
              ) : (
                <form target="_blank" action="https://url.com/signup">
                  <div className={style.gift}>
                    <div className={style.input}>
                      <select
                        name="giftCard"
                        id="giftCard"
                        onChange={this.handleGiftCard}
                      >
                        <option value="">Gift Card</option>
                      </select>
                    </div>
                    <div className={style.input}>
                      <select name="type" id="type" onChange={this.handleType}>
                        <option value="25">25</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                      </select>
                    </div>
                  </div>
                  <div className={style.gift}>
                    <div className={style.input}>
                      <input
                        type="number"
                        name="quantity"
                        id="quantity"
                        min={0}
                        placeholder="Quantity"
                        onChange={this.handleQTY}
                      />
                    </div>
                    <div className={style.input}>
                      <input
                        type="number"
                        name="amount"
                        id="amount"
                        placeholder="Total"
                        disabled
                        readOnly
                        value={this.state.total}
                      />
                    </div>
                  </div>
                  <input
                    className={style.link_btn_gold}
                    type="submit"
                    value="SELL"
                  />
                </form>
              )}
            </div>
          </div>
        </div>
      </header>
    );
  }
}
