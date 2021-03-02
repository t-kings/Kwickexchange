import React, { Component } from "react";
import style from "../Index.module.css";
import { Switch, Route } from "react-router-dom";
import Home from "./home";
import Status from "./status";
import Summary from "./summary";
import GiftCard from "./[id]";
class Index extends Component {
  render() {
    return (
      <main className={style.main_body}>
        <Switch>
          <Route exact path="/home/gift-cards" component={Home} />
          {/* <Route path="/home/gift-cards/status" component={Status} /> */}
          <Route exact path="/home/gift-cards/:id" component={GiftCard} />
          <Route path="/home/gift-cards/:id/summary" component={Summary} />
          <Route path="/home/gift-cards/:id/status" component={Status} />
          <Route component={Home} />
        </Switch>
      </main>
    );
  }
}
export default Index;
