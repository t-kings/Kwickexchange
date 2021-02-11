import React, { Component } from "react";
import Nav from "../../components/nav";
import Aside from "../../components/aside";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Logout from "../../components/logout";
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
            <main className={style.main_body}></main>
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
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(Index);
