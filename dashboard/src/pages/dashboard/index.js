import React, { Component } from "react";
import Nav from "../../components/nav";
import Aside from "../../components/aside";
import { connect } from "react-redux";
import { Redirect, Switch, Route } from "react-router-dom";
import Overview from "./overview";
import Wallets from "./wallets";
import Logout from "../../components/logout";
import Home from "./home";
import { getBitcoinRate, getGiftCardsRate } from "../../store/actions/rates";
import style from "./Index.module.css";
class Index extends Component {
  componentDidMount = () => {
    try {
      const aside = document.querySelector("#aside");
      const main_Section = document.querySelector("#main_section");
      const bars = document.querySelector("#bars");
      const crossBars = document.querySelector("#bars_cross");
      bars.addEventListener("click", () => {
        aside.style.display = "block";
        bars.style.display = "none";
        crossBars.style.display = "block";
      });

      crossBars.addEventListener("click", () => {
        aside.style.display = "none";
        bars.style.display = "block";
        crossBars.style.display = "none";
      });

      main_Section.addEventListener("click", () => {
        if (window.screen.width < 1000) {
          aside.style.display = "none";
          bars.style.display = "block";
          crossBars.style.display = "none";
        }
      });

      const logoutModal = document.querySelector("#logout");
      logoutModal.addEventListener("click", (e) => {
        if (e.target == logoutModal) {
          logoutModal.style.display = "none";
        }
      });
    } catch (e) {}

    this.props.getBitcoinRate();
    this.props.getGiftCardsRate();
  };
  render() {
    const { isAuthenticated } = this.props;
    if (!isAuthenticated) {
      return (
        <Redirect
          to={
            this.props.location.redirect_to
              ? this.props.location.redirect_to
              : "/"
          }
        />
      );
    }
    return (
      <>
        <Nav />
        <Logout />
        <main className={style.main}>
          <Aside />
          <section id="main_section" className={style.main_section}>
            <Switch>
              <Route exact path="/home" component={Home} />
              <Route path="/home/overview" component={Overview} />
              <Route path="/home/wallet" component={Wallets} />
            </Switch>
          </section>
        </main>
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return { ...state.auth };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getBitcoinRate: () => dispatch(getBitcoinRate()),
    getGiftCardsRate: () => dispatch(getGiftCardsRate()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Index);
