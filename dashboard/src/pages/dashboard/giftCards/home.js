import React, { Component } from "react";
import bitcoinStyle from "./Index.module.css";
import { Link, Redirect } from "react-router-dom";
import style from "../Index.module.css";
import { connect } from "react-redux";
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { isAuthenticated, giftCards } = this.props;
    if (!isAuthenticated) {
      return <Redirect to={{ pathname: "/", redirect_to: "/home/bitcoin" }} />;
    }
    return (
      <section className={bitcoinStyle.home}>
        <h1 className={bitcoinStyle.title}>GIFT CARDS</h1>
        <div className={bitcoinStyle.balances}>
          {giftCards.data.map((itm, idx) => (
            <Link key={idx} to={"/home/gift-cards/" + itm.id}>
              <div className={style.card + " " + bitcoinStyle.balance}>
                <img src={itm.image} alt={itm.name} />
                <p>{itm.name}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  return { ...state.auth, ...state.resources };
};
export default connect(mapStateToProps, null)(Home);
