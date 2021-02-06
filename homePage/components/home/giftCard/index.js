import React, { Component } from "react";
import { useRouter } from "next/router";
import style from "./Index.module.css";
const Index = () => {
  const router = useRouter();
  return (
    <div>
      <GiftCard router={router} />
    </div>
  );
};
export default Index;
class GiftCard extends Component {
  handleGiftCard = (giftCard) => {
    this.setState({
      ...this.state,
      giftCard,
    });
  };
  render() {
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
          <div className={style.info_holder}>
            <h1>Sell all your gift cards from our Listings</h1>
            <ul>
              <li
                onClick={() => {
                  this.handleGiftCard(1);
                }}
              >
                <img src="/images/bullets.svg" alt="bullet" />
                <p>Amazon</p>
              </li>
              <li
                onClick={() => {
                  this.handleGiftCard(1);
                }}
              >
                <img src="/images/bullets.svg" alt="bullet" />
                <p>Nike</p>
              </li>
              <li
                onClick={() => {
                  this.handleGiftCard(1);
                }}
                className={style.active}
              >
                <img src="/images/bullets.svg" alt="bullet" />
                <p>Apple</p>
              </li>
              <li
                onClick={() => {
                  this.handleGiftCard(1);
                }}
              >
                <img src="/images/bullets.svg" alt="bullet" />
                <p>Zelle</p>
              </li>
              <li
                onClick={() => {
                  this.handleGiftCard(1);
                }}
              >
                <img src="/images/bullets.svg" alt="bullet" />
                <p>Triopic</p>
              </li>
              <li
                onClick={() => {
                  this.handleGiftCard(1);
                }}
              >
                <img src="/images/bullets.svg" alt="bullet" />
                <p>Lumbic</p>
              </li>
            </ul>
            <div className={style.action_buttons}>
              <a href="/contact/speak" className={style.link_btn_gold}>
                Get Started
              </a>
            </div>
          </div>
          <div className={style.animated_payment}>
            <div>
              <img src="/images/bgImage.png" alt="animated bitcoin payment" />
            </div>
          </div>
        </div>
      </section>
    );
  }
}
