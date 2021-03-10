import React, { Component } from "react";
import Nav from "../../components/nav";
import Aside from "../../components/aside";
import { Switch, Route, useLocation } from "react-router-dom";
import Overview from "./overview";
import Wallets from "./wallets";
import Logout from "../../components/logout";
import Home from "./home";
import Bitcoin from "./bitcoin";
import GiftCards from "./giftCards";
import Transactions from "./transactions";
import Notifications from "./notifications";
import Settings from "./settings";
import style from "./Index.module.css";
import { AnimatePresence } from "framer-motion";
class Dashboard extends Component {
  componentDidMount = () => {
    try {
      const aside = document.querySelector("#aside");
      const asideLinks = document.querySelectorAll("#aside ul li a");
      const main_Section = document.querySelector("#main_section");
      const bars = document.querySelector("#bars");
      const crossBars = document.querySelector("#bars_cross");
      const open = () => {
        aside.style.display = "block";
        bars.style.display = "none";
        crossBars.style.display = "block";
        main_Section.style.display = "none";
      };
      const close = () => {
        aside.style.display = "none";
        bars.style.display = "block";
        main_Section.style.display = "block";
        crossBars.style.display = "none";
      };
      for (let k = 0; k < asideLinks.length; k++) {
        const element = asideLinks[k];
        element.addEventListener("click", () => {
          if (window.screen.width < 1001) {
            close();
          }
        });
      }
      bars.addEventListener("click", () => {
        open();
      });

      crossBars.addEventListener("click", () => {
        close();
      });

      main_Section.addEventListener("click", () => {
        if (window.screen.width < 1001) {
          close();
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
    return (
      <>
        <Nav />
        <Logout />
        <main className={style.main}>
          <Aside />
          <section id="main_section" className={style.main_section}>
            <Index />
          </section>
        </main>
      </>
    );
  }
}
const Index = () => {
  const location = useLocation();
  return (
    <AnimatePresence exitBeforeEnter>
      <Switch location={location} key={location.key}>
        <Route exact path="/home" component={Home} />
        <Route path="/home/overview" component={Overview} />
        <Route path="/home/wallet" component={Wallets} />
        <Route path="/home/bitcoin" component={Bitcoin} />
        <Route path="/home/gift-cards" component={GiftCards} />
        <Route path="/home/transactions" component={Transactions} />
        <Route path="/home/notifications" component={Notifications} />
        <Route path="/home/settings" component={Settings} />
        <Route component={Home} />
      </Switch>
      ;
    </AnimatePresence>
  );
};
export default Dashboard;
