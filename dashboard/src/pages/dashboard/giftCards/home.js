import React, { Component } from "react";
import bitcoinStyle from "./Index.module.css";
import { Link, Redirect } from "react-router-dom";
import style from "../Index.module.css";
import { connect } from "react-redux";
import itunes from "./images/itunes.png";
import apple from "./images/apple.png";
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
    const { isAuthenticated } = this.props;
    if (!isAuthenticated) {
      return <Redirect to={{ pathname: "/", redirect_to: "/home/bitcoin" }} />;
    }
    return (
      <section className={bitcoinStyle.home}>
        <h1 className={bitcoinStyle.title}>GIFT CARDS</h1>
        <div className={bitcoinStyle.balances}>
          <Link to="/home/gift-cards/id">
            <div className={style.card + " " + bitcoinStyle.balance}>
              <img src={itunes} alt="itunes" />
              <p>Itunes</p>
            </div>
          </Link>
          <Link to="/home/gift-cards/id">
            <div className={style.card + " " + bitcoinStyle.balance}>
              <img src={apple} alt="apple" />
              <p>apple</p>
            </div>
          </Link>
          <Link to="/home/gift-cards/id">
            <div className={style.card + " " + bitcoinStyle.balance}>
              <img src={itunes} alt="itunes" />
              <p>Itunes</p>
            </div>
          </Link>
          <Link to="/home/gift-cards/id">
            <div className={style.card + " " + bitcoinStyle.balance}>
              <img src={apple} alt="apple" />
              <p>apple</p>
            </div>
          </Link>
          <Link to="/home/gift-cards/id">
            <div className={style.card + " " + bitcoinStyle.balance}>
              <img src={itunes} alt="itunes" />
              <p>Itunes</p>
            </div>
          </Link>
          <Link to="/home/gift-cards/id">
            <div className={style.card + " " + bitcoinStyle.balance}>
              <img src={apple} alt="apple" />
              <p>apple</p>
            </div>
          </Link>
          <Link to="/home/gift-cards/id">
            <div className={style.card + " " + bitcoinStyle.balance}>
              <img src={itunes} alt="itunes" />
              <p>Itunes</p>
            </div>
          </Link>
          <Link to="/home/gift-cards/id">
            <div className={style.card + " " + bitcoinStyle.balance}>
              <img src={apple} alt="apple" />
              <p>apple</p>
            </div>
          </Link>
          <Link to="/home/gift-cards/id">
            <div className={style.card + " " + bitcoinStyle.balance}>
              <img src={itunes} alt="itunes" />
              <p>Itunes</p>
            </div>
          </Link>
          <Link to="/home/gift-cards/id">
            <div className={style.card + " " + bitcoinStyle.balance}>
              <img src={apple} alt="apple" />
              <p>apple</p>
            </div>
          </Link>
          <Link to="/home/gift-cards/id">
            <div className={style.card + " " + bitcoinStyle.balance}>
              <img src={itunes} alt="itunes" />
              <p>Itunes</p>
            </div>
          </Link>
          <Link to="/home/gift-cards/id">
            <div className={style.card + " " + bitcoinStyle.balance}>
              <img src={apple} alt="apple" />
              <p>apple</p>
            </div>
          </Link>
          <Link to="/home/gift-cards/id">
            <div className={style.card + " " + bitcoinStyle.balance}>
              <img src={itunes} alt="itunes" />
              <p>Itunes</p>
            </div>
          </Link>
          <Link to="/home/gift-cards/id">
            <div className={style.card + " " + bitcoinStyle.balance}>
              <img src={apple} alt="apple" />
              <p>apple</p>
            </div>
          </Link>
          <Link to="/home/gift-cards/id">
            <div className={style.card + " " + bitcoinStyle.balance}>
              <img src={itunes} alt="itunes" />
              <p>Itunes</p>
            </div>
          </Link>
          <Link to="/home/gift-cards/id">
            <div className={style.card + " " + bitcoinStyle.balance}>
              <img src={apple} alt="apple" />
              <p>apple</p>
            </div>
          </Link>
          <Link to="/home/gift-cards/id">
            <div className={style.card + " " + bitcoinStyle.balance}>
              <img src={itunes} alt="itunes" />
              <p>Itunes</p>
            </div>
          </Link>
          <Link to="/home/gift-cards/id">
            <div className={style.card + " " + bitcoinStyle.balance}>
              <img src={apple} alt="apple" />
              <p>apple</p>
            </div>
          </Link>
          <Link to="/home/gift-cards/id">
            <div className={style.card + " " + bitcoinStyle.balance}>
              <img src={itunes} alt="itunes" />
              <p>Itunes</p>
            </div>
          </Link>
          <Link to="/home/gift-cards/id">
            <div className={style.card + " " + bitcoinStyle.balance}>
              <img src={apple} alt="apple" />
              <p>apple</p>
            </div>
          </Link>
          <Link to="/home/gift-cards/id">
            <div className={style.card + " " + bitcoinStyle.balance}>
              <img src={itunes} alt="itunes" />
              <p>Itunes</p>
            </div>
          </Link>
          <Link to="/home/gift-cards/id">
            <div className={style.card + " " + bitcoinStyle.balance}>
              <img src={apple} alt="apple" />
              <p>apple</p>
            </div>
          </Link>
          <Link to="/home/gift-cards/id">
            <div className={style.card + " " + bitcoinStyle.balance}>
              <img src={itunes} alt="itunes" />
              <p>Itunes</p>
            </div>
          </Link>
          <Link to="/home/gift-cards/id">
            <div className={style.card + " " + bitcoinStyle.balance}>
              <img src={apple} alt="apple" />
              <p>apple</p>
            </div>
          </Link>
          <Link to="/home/gift-cards/id">
            <div className={style.card + " " + bitcoinStyle.balance}>
              <img src={itunes} alt="itunes" />
              <p>Itunes</p>
            </div>
          </Link>
          <Link to="/home/gift-cards/id">
            <div className={style.card + " " + bitcoinStyle.balance}>
              <img src={apple} alt="apple" />
              <p>apple</p>
            </div>
          </Link>
          <Link to="/home/gift-cards/id">
            <div className={style.card + " " + bitcoinStyle.balance}>
              <img src={itunes} alt="itunes" />
              <p>Itunes</p>
            </div>
          </Link>
          <Link to="/home/gift-cards/id">
            <div className={style.card + " " + bitcoinStyle.balance}>
              <img src={apple} alt="apple" />
              <p>apple</p>
            </div>
          </Link>
          <Link to="/home/gift-cards/id">
            <div className={style.card + " " + bitcoinStyle.balance}>
              <img src={itunes} alt="itunes" />
              <p>Itunes</p>
            </div>
          </Link>
          <Link to="/home/gift-cards/id">
            <div className={style.card + " " + bitcoinStyle.balance}>
              <img src={apple} alt="apple" />
              <p>apple</p>
            </div>
          </Link>
          <Link to="/home/gift-cards/id">
            <div className={style.card + " " + bitcoinStyle.balance}>
              <img src={itunes} alt="itunes" />
              <p>Itunes</p>
            </div>
          </Link>
          <Link to="/home/gift-cards/id">
            <div className={style.card + " " + bitcoinStyle.balance}>
              <img src={apple} alt="apple" />
              <p>apple</p>
            </div>
          </Link>
          <Link to="/home/gift-cards/id">
            <div className={style.card + " " + bitcoinStyle.balance}>
              <img src={itunes} alt="itunes" />
              <p>Itunes</p>
            </div>
          </Link>
          <Link to="/home/gift-cards/id">
            <div className={style.card + " " + bitcoinStyle.balance}>
              <img src={apple} alt="apple" />
              <p>apple</p>
            </div>
          </Link>
          <Link to="/home/gift-cards/id">
            <div className={style.card + " " + bitcoinStyle.balance}>
              <img src={itunes} alt="itunes" />
              <p>Itunes</p>
            </div>
          </Link>
          <Link to="/home/gift-cards/id">
            <div className={style.card + " " + bitcoinStyle.balance}>
              <img src={apple} alt="apple" />
              <p>apple</p>
            </div>
          </Link>
          <Link to="/home/gift-cards/id">
            <div className={style.card + " " + bitcoinStyle.balance}>
              <img src={itunes} alt="itunes" />
              <p>Itunes</p>
            </div>
          </Link>
          <Link to="/home/gift-cards/id">
            <div className={style.card + " " + bitcoinStyle.balance}>
              <img src={apple} alt="apple" />
              <p>apple</p>
            </div>
          </Link>
          <Link to="/home/gift-cards/id">
            <div className={style.card + " " + bitcoinStyle.balance}>
              <img src={itunes} alt="itunes" />
              <p>Itunes</p>
            </div>
          </Link>
          <Link to="/home/gift-cards/id">
            <div className={style.card + " " + bitcoinStyle.balance}>
              <img src={apple} alt="apple" />
              <p>apple</p>
            </div>
          </Link>
          <Link to="/home/gift-cards/id">
            <div className={style.card + " " + bitcoinStyle.balance}>
              <img src={itunes} alt="itunes" />
              <p>Itunes</p>
            </div>
          </Link>
          <Link to="/home/gift-cards/id">
            <div className={style.card + " " + bitcoinStyle.balance}>
              <img src={apple} alt="apple" />
              <p>apple</p>
            </div>
          </Link>
          <Link to="/home/gift-cards/id">
            <div className={style.card + " " + bitcoinStyle.balance}>
              <img src={itunes} alt="itunes" />
              <p>Itunes</p>
            </div>
          </Link>
          <Link to="/home/gift-cards/id">
            <div className={style.card + " " + bitcoinStyle.balance}>
              <img src={apple} alt="apple" />
              <p>apple</p>
            </div>
          </Link>
          <Link to="/home/gift-cards/id">
            <div className={style.card + " " + bitcoinStyle.balance}>
              <img src={itunes} alt="itunes" />
              <p>Itunes</p>
            </div>
          </Link>
          <Link to="/home/gift-cards/id">
            <div className={style.card + " " + bitcoinStyle.balance}>
              <img src={apple} alt="apple" />
              <p>apple</p>
            </div>
          </Link>
          <Link to="/home/gift-cards/id">
            <div className={style.card + " " + bitcoinStyle.balance}>
              <img src={itunes} alt="itunes" />
              <p>Itunes</p>
            </div>
          </Link>
          <Link to="/home/gift-cards/id">
            <div className={style.card + " " + bitcoinStyle.balance}>
              <img src={apple} alt="apple" />
              <p>apple</p>
            </div>
          </Link>
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  return { ...state.auth };
};
export default connect(mapStateToProps, null)(Home);
