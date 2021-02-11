import React, { Component } from "react";
import Nav from "../../components/nav";
import Aside from "../../components/aside";
import style from "./Index.module.css";
class Index extends Component {
  componentDidMount = () => {
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
  };
  render() {
    return (
      <>
        <Nav />
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
export default Index;
