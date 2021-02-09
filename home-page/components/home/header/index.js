import React, { Component, useContext } from "react";
import { useRouter } from "next/router";
import style from "./Index.module.css";
import { BitcoinContext } from "../../../store/root";
import { GiftCardContext } from "../../../store/root";
const Index = () => {
  const router = useRouter();
  const bitcoinContext = useContext(BitcoinContext);
  const giftCardContext = useContext(GiftCardContext);
  return (
    <div>
      <Header
        router={router}
        bitcoinContext={bitcoinContext}
        giftCardContext={giftCardContext}
      />
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
      qty: 1,
      giftCard: 0,
      country: 0,
      type: 25,
      total: 0,
      card: 0,
      denomination: 0,
      giftCards: [],
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
    const { giftCardContext } = this.props;
    const giftCards = giftCardContext.sell;
    const { country, card, denomination, qty } = this.state;
    let rate = 0;
    let total = 0;
    if (giftCards.length > 0) {
      const chosenGiftCard = giftCards[giftCard];
      if (chosenGiftCard.sellRates.length > 0) {
        const chosenCountry = chosenGiftCard.sellRates[country];
        if (chosenCountry.cards.length > 0) {
          const chosenCard = chosenCountry.cards[card];
          if (chosenCard.denomination) {
            const chosenCard = chosenCountry.cards[card];
            if (chosenCard.denomination.length > 0) {
              const chosenDenomination = chosenCard.denomination[denomination];
              rate = chosenDenomination.rate;
              const value = chosenDenomination.value;
              total = rate * value * qty;
            }
          } else {
            rate = chosenCard.rate;
            total = rate * qty;
          }
        }
      }
    }
    this.setState({
      ...this.state,
      giftCard,
      total,
      rate,
    });
  };

  handleCountry = (e) => {
    const country = e.target.value;
    const { giftCardContext } = this.props;
    const giftCards = giftCardContext.sell;
    const { giftCard, card, denomination, qty } = this.state;
    let rate = 0;
    let total = 0;
    if (giftCards.length > 0) {
      const chosenGiftCard = giftCards[giftCard];
      if (chosenGiftCard.sellRates.length > 0) {
        const chosenCountry = chosenGiftCard.sellRates[country];
        if (chosenCountry.cards.length > 0) {
          const chosenCard = chosenCountry.cards[card];
          if (chosenCard.denomination) {
            const chosenCard = chosenCountry.cards[card];
            if (chosenCard.denomination.length > 0) {
              const chosenDenomination = chosenCard.denomination[denomination];
              rate = chosenDenomination.rate;
              const value = chosenDenomination.value;
              total = rate * value * qty;
            }
          } else {
            rate = chosenCard.rate;
            total = rate * qty;
          }
        }
      }
    }
    this.setState({
      ...this.state,
      country,
      total,
      rate,
    });
  };

  handleCard = (e) => {
    const card = e.target.value;
    const { giftCardContext } = this.props;
    const giftCards = giftCardContext.sell;
    const { giftCard, country, denomination, qty } = this.state;
    let rate = 0;
    let total = 0;
    if (giftCards.length > 0) {
      const chosenGiftCard = giftCards[giftCard];
      if (chosenGiftCard.sellRates.length > 0) {
        const chosenCountry = chosenGiftCard.sellRates[country];
        if (chosenCountry.cards.length > 0) {
          const chosenCard = chosenCountry.cards[card];
          if (chosenCard.denomination) {
            const chosenCard = chosenCountry.cards[card];
            if (chosenCard.denomination.length > 0) {
              const chosenDenomination = chosenCard.denomination[denomination];
              rate = chosenDenomination.rate;
              const value = chosenDenomination.value;
              total = rate * value * qty;
            }
          } else {
            rate = chosenCard.rate;
            total = rate * qty;
          }
        }
      }
    }
    this.setState({
      ...this.state,
      card,
      total,
      rate,
    });
  };

  handleDenomination = (e) => {
    const denomination = e.target.value;
    const { giftCardContext } = this.props;
    const giftCards = giftCardContext.sell;
    const { giftCard, country, card, qty } = this.state;
    let rate = 0;
    let total = 0;
    if (giftCards.length > 0) {
      const chosenGiftCard = giftCards[giftCard];
      if (chosenGiftCard.sellRates.length > 0) {
        const chosenCountry = chosenGiftCard.sellRates[country];
        if (chosenCountry.cards.length > 0) {
          const chosenCard = chosenCountry.cards[card];
          if (chosenCard.denomination) {
            const chosenCard = chosenCountry.cards[card];
            if (chosenCard.denomination.length > 0) {
              const chosenDenomination = chosenCard.denomination[denomination];
              rate = chosenDenomination.rate;
              const value = chosenDenomination.value;
              total = rate * value * qty;
            }
          } else {
            rate = chosenCard.rate;
            total = rate * qty;
          }
        }
      }
    }
    this.setState({
      ...this.state,
      denomination,
      total,
      rate,
    });
  };
  handleQTY = (e) => {
    const qty = parseFloat(e.target.value);
    const { giftCardContext } = this.props;
    const giftCards = giftCardContext.sell;
    const { giftCard, country, card, denomination } = this.state;
    let rate = 0;
    let total = 0;
    if (giftCards.length > 0) {
      const chosenGiftCard = giftCards[giftCard];
      if (chosenGiftCard.sellRates.length > 0) {
        const chosenCountry = chosenGiftCard.sellRates[country];
        if (chosenCountry.cards.length > 0) {
          const chosenCard = chosenCountry.cards[card];
          if (chosenCard.denomination) {
            const chosenCard = chosenCountry.cards[card];
            if (chosenCard.denomination.length > 0) {
              const chosenDenomination = chosenCard.denomination[denomination];
              rate = chosenDenomination.rate;
              const value = chosenDenomination.value;
              total = rate * value * qty;
            }
          } else {
            rate = chosenCard.rate;
            total = rate * qty;
          }
        }
      }
    }
    this.setState({
      ...this.state,
      qty,
      total,
      rate,
    });
  };
  static getDerivedStateFromProps(props, state) {
    const giftCards = props.giftCardContext.sell;
    if (giftCards.length !== state.giftCards.length) {
      const qty = 1;
      const giftCard = 0;
      const country = 0;
      const card = 0;
      const denomination = 0;
      let rate = 0;
      let total = 0;
      if (giftCards.length > 0) {
        const chosenGiftCard = giftCards[giftCard];
        if (chosenGiftCard.sellRates.length > 0) {
          const chosenCountry = chosenGiftCard.sellRates[country];
          if (chosenCountry.cards.length > 0) {
            const chosenCard = chosenCountry.cards[card];
            if (chosenCard.denomination) {
              const chosenCard = chosenCountry.cards[card];
              if (chosenCard.denomination.length > 0) {
                const chosenDenomination =
                  chosenCard.denomination[denomination];
                rate = chosenDenomination.rate;
                const value = chosenDenomination.value;
                total = rate * value * qty;
              }
            } else {
              rate = chosenCard.rate;
              total = rate * qty;
            }
          }
        }
      }
      return { ...state, ...props, total, rate, giftCards };
    }
    return null;
  }
  render() {
    const { formTab, giftCard, country, card } = this.state;
    const { bitcoinContext, giftCardContext } = this.props;
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
                  Gift Cards
                </button>
              </div>
              {formTab === 1 ? (
                bitcoinContext.sell.usd ? (
                  <form
                    target="_blank"
                    action="https://dashboard.kwickxchange.com/signup"
                  >
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
                      <span>
                        $
                        {bitcoinContext.sell.usd
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        /BTC
                      </span>
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
              ) : giftCardContext.sell.length > 0 ? (
                <form target="_blank" action="https://url.com/signup">
                  <div className={style.gift}>
                    <div className={style.input}>
                      <select
                        name="giftCard"
                        id="giftCard"
                        onChange={this.handleGiftCard}
                      >
                        {giftCardContext.sell.map((itm, index) => (
                          <option key={index} value={index}>
                            {itm.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    {giftCardContext.sell[giftCard].sellRates.length > 0 ? (
                      <div className={style.input}>
                        <select
                          name="country"
                          id="country"
                          onChange={this.handleCountry}
                        >
                          {giftCardContext.sell[giftCard].sellRates.map(
                            (itm, index) => (
                              <option key={index} value={index}>
                                {itm.country}
                              </option>
                            )
                          )}
                        </select>
                      </div>
                    ) : (
                      <div className={style.input}>
                        <select
                          disabled
                          readOnly
                          name="country"
                          style={{
                            cursor: "not-allowed",
                          }}
                        >
                          <option value={0}>₦{0}</option>
                        </select>
                      </div>
                    )}
                  </div>
                  {giftCardContext.sell[giftCard].sellRates.length > 0 ? (
                    <div className={style.gift}>
                      <div className={style.input}>
                        <select
                          name="card"
                          id="card"
                          onChange={this.handleCard}
                        >
                          {giftCardContext.sell[giftCard].sellRates[
                            country
                          ].cards.map((itm, index) => (
                            <option key={index} value={index}>
                              {itm.card_type}
                            </option>
                          ))}
                        </select>
                      </div>
                      {giftCardContext.sell[giftCard].sellRates[country].cards[
                        card
                      ].denomination ? (
                        <div className={style.input}>
                          <select
                            name="denomination"
                            id="denomination"
                            onChange={this.handleDenomination}
                          >
                            {giftCardContext.sell[giftCard].sellRates[
                              country
                            ].cards[card].denomination.map((itm, index) => (
                              <option key={index} value={index}>
                                {itm.value + " - ₦" + itm.rate}
                              </option>
                            ))}
                          </select>
                        </div>
                      ) : (
                        <div className={style.input}>
                          <select
                            disabled
                            readOnly
                            name="rate"
                            style={{
                              cursor: "not-allowed",
                            }}
                          >
                            <option value={0}>
                              ₦
                              {
                                giftCardContext.sell[giftCard].sellRates[
                                  country
                                ].cards[card].rate
                              }
                            </option>
                          </select>
                        </div>
                      )}
                    </div>
                  ) : null}
                  <div className={style.gift}>
                    <div className={style.input}>
                      <input
                        type="number"
                        name="amount"
                        id="amount"
                        placeholder="Quantity"
                        onChange={this.handleQTY}
                        defaultValue={1}
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
                        value={this.state.total ? this.state.total : 0}
                      />
                    </div>
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
              )}
            </div>
          </div>
        </div>
      </header>
    );
  }
}
