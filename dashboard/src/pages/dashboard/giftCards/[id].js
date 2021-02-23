import React, { Component } from "react";
import bitcoinStyle from "./Index.module.css";
import { Link, Redirect } from "react-router-dom";
import vc1 from "../images/vc1.png";
import vc2 from "../images/vc2.png";
import vc3 from "../images/vc3.png";
import { connect } from "react-redux";
import { processGiftCard } from "../../../store/actions/trade";
class Status extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formTab: 1,
      currency: 0,
      card: 0,
      denomination: 0,
      qty: 0,
      total: 0,
      rate: 0,
      method: "naira",
    };
  }

  handleCurrency = (e) => {
    const currency = e.target.value;
    const { giftCard } = this.props;
    const { card, denomination, qty } = this.state;
    let rate = 0;
    let total = 0;
    const chosenCountry = giftCard.currency[currency];
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
    this.setState({
      ...this.state,
      currency,
      total,
      rate,
    });
  };

  handleCard = (e) => {
    const card = e.target.value;
    const { giftCard } = this.props;
    const { currency, denomination, qty } = this.state;
    let rate = 0;
    let total = 0;
    const chosenCountry = giftCard.currency[currency];
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
    this.setState({
      ...this.state,
      card,
      total,
      rate,
    });
  };

  handleDenomination = (e) => {
    const denomination = e.target.value;
    const { giftCard } = this.props;
    const { currency, card, qty } = this.state;
    let rate = 0;
    let total = 0;
    const chosenCountry = giftCard.currency[currency];
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
    this.setState({
      ...this.state,
      denomination,
      total,
      rate,
    });
  };
  handleQTY = (e) => {
    const qty = parseFloat(e);
    const { giftCard } = this.props;
    const { currency, card, denomination } = this.state;
    let rate = 0;
    let total = 0;
    const chosenCountry = giftCard.currency[currency];
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
    this.setState({
      ...this.state,
      qty,
      total,
      rate,
    });
  };
  render() {
    const { formTab, currency, card, denomination, qty, total } = this.state;
    const {
      giftCard,
      processGiftCard,
      history,
      match,
      isAuthenticated,
      isLoading,
    } = this.props;
    if (!isAuthenticated) {
      return (
        <Redirect
          to={{
            pathname: "/",
            redirect_to: "/home/gift-cards/" + match.params.id,
          }}
        />
      );
    }
    return (
      <section className={bitcoinStyle.home}>
        <Link to={"/home/gift-cards"} className={bitcoinStyle.back}>
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
        <div className={bitcoinStyle.group}>
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

            <form
              onSubmit={(e) => {
                e.preventDefault();
                processGiftCard(this.state);
                if (total > 0) {
                  history.push(
                    "/home/gift-cards/" + match.params.id + "/summary"
                  );
                }
              }}
            >
              <img
                className={bitcoinStyle.img}
                src={giftCard.image}
                alt={giftCard.name}
              />
              <div className={bitcoinStyle.input}>
                <div>
                  <p>Product</p>
                </div>
                <div>
                  <p>{giftCard.name}</p>
                </div>
              </div>
              {giftCard.currency.length > 0 ? (
                <div className={bitcoinStyle.input}>
                  <div>
                    <p>Currency</p>
                  </div>
                  <div>
                    <select
                      name="currency"
                      id="currency"
                      onChange={this.handleCurrency}
                    >
                      {giftCard.currency.map((itm, index) => (
                        <option key={index} value={index}>
                          {itm.country}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              ) : null}
              {giftCard.currency[currency].cards.length > 0 ? (
                <div className={bitcoinStyle.input}>
                  <div>
                    <p>Card</p>
                  </div>
                  <div>
                    <select name="card" id="card" onChange={this.handleCard}>
                      {giftCard.currency[currency].cards.map((itm, index) => (
                        <option key={index} value={index}>
                          {itm.card_type}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              ) : null}
              {giftCard.currency[currency].cards[card].denomination ? (
                <div className={bitcoinStyle.input}>
                  <div>
                    <p>Denomination</p>
                  </div>
                  <div>
                    <select
                      name="denomination"
                      id="denomination"
                      onChange={this.handleDenomination}
                    >
                      {giftCard.currency[currency].cards[card].denomination.map(
                        (itm, index) => (
                          <option key={index} value={index}>
                            {itm.value}
                          </option>
                        )
                      )}
                    </select>
                  </div>
                </div>
              ) : null}
              <div className={bitcoinStyle.input}>
                <div>
                  <p>Quantity</p>
                </div>
                <div>
                  <div className={bitcoinStyle.increments}>
                    <span
                      onClick={() => {
                        this.setState({
                          ...this.state,
                          qty: qty - 1 < 0 ? 0 : qty - 1,
                        });
                        this.handleQTY(qty - 1 < 0 ? 0 : qty - 1);
                      }}
                    >
                      -
                    </span>
                    <input onChange={() => {}} type="number" value={qty} />
                    <span
                      onClick={() => {
                        this.setState({ ...this.state, qty: qty + 1 });
                        this.handleQTY(qty + 1);
                      }}
                    >
                      +
                    </span>
                  </div>
                </div>
              </div>

              <div className={bitcoinStyle.input}>
                <div>
                  <p>Rate</p>
                </div>
                <div>
                  <p className={bitcoinStyle.rates_text}>
                    ₦{" "}
                    {giftCard.currency[currency].cards[card].denomination
                      ? giftCard.currency[currency].cards[card].denomination[
                          denomination
                        ].rate
                      : giftCard.currency[currency].cards[card].rate}
                  </p>
                </div>
              </div>
              <div className={bitcoinStyle.input}>
                <div>
                  <p>Total</p>
                </div>
                <div>
                  <p className={bitcoinStyle.total}>₦ {total}</p>
                </div>
              </div>
              <hr />
              <div className={bitcoinStyle.input}>
                <div>
                  <p>Payment Method</p>
                </div>
                <div>
                  <select
                    onChange={(e) => {
                      this.setState({
                        ...this.state,
                        method: e.target.value,
                      });
                    }}
                  >
                    <option value={"naira"}>Naira wallet</option>
                  </select>
                </div>
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
                  value={formTab === 1 ? "BUY GIFT CARD" : "SELL GIFT CARD"}
                />
              )}
            </form>
            <img src={vc1} className={bitcoinStyle.vc} alt="vector" />
            <img src={vc2} className={bitcoinStyle.vc} alt="vector" />
            <img src={vc3} className={bitcoinStyle.vc} alt="vector" />
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state, props) => {
  const { giftCards } = state.resources;
  const giftCard = giftCards.data.find(
    (itm) => itm.id === props.match.params.id
  );
  return { ...state.auth, ...state.resources, ...state.trade, giftCard };
};

const mapDispatchToProps = (dispatch) => {
  return {
    processGiftCard: (payload) => dispatch(processGiftCard(payload)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Status);
