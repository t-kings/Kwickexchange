import React, { Component } from "react";
import bitcoinStyle from "./Index.module.css";
import { Link, Redirect } from "react-router-dom";
import vc1 from "../images/vc1.png";
import vc2 from "../images/vc2.png";
import vc3 from "../images/vc3.png";
import { connect } from "react-redux";
import {
  startGiftCardTrade,
  cancelTrade,
  // uploadGiftCard,
} from "../../../store/actions/trade";

class Summary extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const {
      isAuthenticated,
      match,
      giftCard,
      giftCardDetails,
      isLoading,
      startGiftCardTrade,
      // uploadGiftCard,
      cancelTrade,
    } = this.props;
    const {
      currency,
      card,
      denomination,
      total,
      qty,
      formTab,
    } = giftCardDetails;
    if (!isAuthenticated) {
      return (
        <Redirect
          to={{
            pathname: "/",
            redirect_to: "/home/gift-cards/" + match.params.id + "/summary",
          }}
        />
      );
    }
    if (!formTab || !card || !qty) {
      <Redirect to={"/home/gift-cards/" + match.params.id} />;
    }
    return (
      <section className={bitcoinStyle.home}>
        <Link
          to={"/home/gift-cards/" + match.params.id}
          className={bitcoinStyle.back}
        >
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
            <h1 className={bitcoinStyle.summary}>Summary</h1>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                // const input = document.getElementById("file");
                // if ("files" in input) {
                //   const file = input.files[0];
                //   const formData = new FormData();
                //   formData.append("file", file);
                //   uploadGiftCard(formData);
                // }
                if (formTab === 2) {
                  if (
                    await startGiftCardTrade(
                      giftCard.id,
                      giftCard.currency[currency].country,
                      giftCard.currency[currency].cards.length
                        ? giftCard.currency[currency].cards[card].card_type
                        : "",
                      giftCard.currency[currency].cards[card].denomination
                        ? giftCard.currency[currency].cards[card].denomination[
                            denomination
                          ].value
                        : 0,
                      qty
                    )
                  ) {
                    document.querySelector("#chat").style.display = "block";
                  }
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
                    <p>{giftCard.currency[currency].country}</p>
                  </div>
                </div>
              ) : null}
              {giftCard.currency[currency].cards.length > 0 ? (
                <div className={bitcoinStyle.input}>
                  <div>
                    <p>Card</p>
                  </div>
                  <div>
                    <p>{giftCard.currency[currency].cards[card].card_type}</p>
                  </div>
                </div>
              ) : null}
              {giftCard.currency[currency].cards[card].denomination ? (
                <div className={bitcoinStyle.input}>
                  <div>
                    <p>Denomination</p>
                  </div>
                  <div>
                    <p>
                      {
                        giftCard.currency[currency].cards[card].denomination[
                          denomination
                        ].value
                      }
                    </p>
                  </div>
                </div>
              ) : null}
              <div className={bitcoinStyle.input}>
                <div>
                  <p>Quantity</p>
                </div>
                <div>
                  <p>{qty}</p>
                </div>
              </div>

              <div className={bitcoinStyle.input}>
                <div>
                  <p>Rate</p>
                </div>
                <div>
                  <p className={bitcoinStyle.rates_text}>
                    ₦
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
              {formTab === 1 ? (
                <div className={bitcoinStyle.input}>
                  <div>
                    <p>Payment Method</p>
                  </div>
                  <div>
                    <p>Select Currency</p>
                  </div>
                </div>
              ) : // <div className={bitcoinStyle.input}>
              //   <div>
              //     <p>Upload Credit Card</p>
              //   </div>
              //   <div>
              //     <input
              //       type="file"
              //       id="file"
              //       accept="image/*"
              //       placeholder="Upload image"
              //     />
              //   </div>
              // </div>
              null}
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

          <div className={bitcoinStyle.chat} id="chat">
            <div className={bitcoinStyle.chatHold}>
              <div className={bitcoinStyle.chatTop}>
                <div>
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="6" cy="6" r="6" fill="#00C013" />
                  </svg>
                  <p>Live Chat</p>
                </div>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    cancelTrade(giftCard.id);
                  }}
                >
                  CANCEL TRADE
                </button>
              </div>
              <div className={bitcoinStyle.body}>
                <div className={bitcoinStyle.receiver}>
                  <p>Upload a picture of your GiftCard</p>
                  <div className={bitcoinStyle.avatar}>
                    <span>Q</span>
                    <span>E</span>
                  </div>
                </div>
                <div className={bitcoinStyle.sender}>
                  <div className={bitcoinStyle.avatar}>
                    <span>Q</span>
                    <span>E</span>
                  </div>
                  <p>Upload a picture of your GiftCard</p>
                </div>
                <form>
                  <div className={bitcoinStyle.text}>
                    <input type="text" />
                    <div>
                      <input type="file" />
                      <svg
                        width="24"
                        height="30"
                        viewBox="0 0 24 30"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M23.6795 7.52344L16.3432 0.314732C16.1386 0.113839 15.8591 0 15.5693 0H1.09091C0.4875 0 0 0.478795 0 1.07143V28.9286C0 29.5212 0.4875 30 1.09091 30H22.9091C23.5125 30 24 29.5212 24 28.9286V8.28013C24 7.99553 23.8841 7.72433 23.6795 7.52344ZM8.18182 11.317C8.93523 11.317 9.54545 11.9163 9.54545 12.6562C9.54545 13.3962 8.93523 13.9955 8.18182 13.9955C7.42841 13.9955 6.81818 13.3962 6.81818 12.6562C6.81818 11.9163 7.42841 11.317 8.18182 11.317ZM18.2727 21.1607H5.72727C5.49886 21.1607 5.37273 20.9029 5.5125 20.7288L8.91477 16.4699C8.94028 16.4379 8.97288 16.412 9.01009 16.3942C9.0473 16.3763 9.08815 16.3671 9.12955 16.3671C9.17094 16.3671 9.21179 16.3763 9.249 16.3942C9.28621 16.412 9.31881 16.4379 9.34432 16.4699L10.7455 18.2243L13.3977 14.9029C13.4232 14.8709 13.4558 14.845 13.493 14.8272C13.5303 14.8094 13.5711 14.8001 13.6125 14.8001C13.6539 14.8001 13.6947 14.8094 13.732 14.8272C13.7692 14.845 13.8018 14.8709 13.8273 14.9029L18.4807 20.7288C18.6273 20.9029 18.4977 21.1607 18.2727 21.1607ZM15.0682 8.77232V2.47098L21.4841 8.77232H15.0682Z"
                          fill="black"
                        />
                      </svg>
                    </div>
                  </div>
                  <input
                    type="submit"
                    value="SEND"
                    className={bitcoinStyle.link_btn_gold}
                  />
                </form>
              </div>
            </div>
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
  return { ...state.auth, ...state.resources, giftCard, ...state.trade };
};

const mapDispatchToProps = (dispatch) => {
  return {
    startGiftCardTrade: (
      giftcard_id,
      currency,
      card_type,
      denomination,
      quantity
    ) =>
      dispatch(
        startGiftCardTrade(
          giftcard_id,
          currency,
          card_type,
          denomination,
          quantity
        )
      ),
    cancelTrade: (id) => dispatch(cancelTrade(id)),
    // uploadGiftCard: (payload) => dispatch(uploadGiftCard(payload)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Summary);
