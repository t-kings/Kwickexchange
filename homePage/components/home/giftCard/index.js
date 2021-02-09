import React, { Component, useContext } from "react";
import { useRouter } from "next/router";
import { GiftCardContext } from "../../../store/root";
import style from "./Index.module.css";
const Index = () => {
  const router = useRouter();
  const giftCardContext = useContext(GiftCardContext);
  return (
    <div>
      <GiftCard router={router} giftCardContext={giftCardContext} />
    </div>
  );
};
export default Index;
class GiftCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      giftCard: 0,
    };
  }

  handleGiftCard = (giftCard) => {
    clearInterval(this.timeOutId);
    this.setState({
      ...this.state,
      giftCard,
    });
    this.timeOutId = setTimeout(() => {
      this.random();
    }, 5000);
  };
  random = () => {
    const num = Math.floor(
      Math.random() * this.props.giftCardContext.sell.length
    );
    this.setState({
      ...this.state,
      giftCard: num,
    });
    this.timeOutId = setTimeout(() => {
      this.random();
    }, 5000);
  };
  timeOutId = "";
  componentDidMount = () => {
    this.random();
  };
  componentWillUnmount = () => {
    clearInterval(this.timeOutId);
  };
  render() {
    const giftCards = this.props.giftCardContext.sell;
    return (
      <section className={style.header}>
        <div className={style.flier}>
          <img src="/images/bg1.svg" alt="background" />
        </div>
        <div className={style.flier}>
          <img src="/images/bg2.svg" alt="background" />
        </div>
        <div className={style.flier}>
          <img src="/images/bg3.svg" alt="background" />
        </div>
        <div className={style.header_holder}>
          {giftCards.length > 0 ? (
            <>
              <div className={style.info_holder}>
                <h1>Sell all your gift cards from our Listings</h1>
                <ul id="giftCardsList">
                  {giftCards
                    .slice(0, giftCards.length > 5 ? 5 : giftCards.length)
                    .map((itm, idx) => (
                      <li
                        key={idx}
                        onClick={() => {
                          this.handleGiftCard(idx);
                        }}
                        className={
                          this.state.giftCard === idx ? style.active : ""
                        }
                      >
                        <img src="/images/bullets.svg" alt="bullet" />
                        <p>{itm.name}</p>
                      </li>
                    ))}
                </ul>
                <div className={style.action_buttons}>
                  <a href="/contact/speak" className={style.link_btn_gold}>
                    Get Started
                  </a>
                </div>
              </div>
              <div className={style.animated_payment}>
                <div>
                  <img
                    src="/images/bgImage.png"
                    alt="animated bitcoin payment"
                  />
                </div>
              </div>
            </>
          ) : (
            <div className={style.load}>
              <div className={style.loader}>Loading...</div>
            </div>
          )}
        </div>
      </section>
    );
  }
}
