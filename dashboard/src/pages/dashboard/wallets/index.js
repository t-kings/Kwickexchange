import React, { Component } from "react";
import style from "../Index.module.css";
import { Switch, Route } from "react-router-dom";
import Home from "./home";
import Bitcoin from "./bitcoin";
import Naira from "./naira";
class Index extends Component {
  render() {
    return (
      <main className={style.main_body}>
        <Switch>
          <Route exact path="/home/wallet" component={Home} />
          <Route path="/home/wallet/bitcoin" component={Bitcoin} />
          <Route path="/home/wallet/naira" component={Naira} />
        </Switch>
      </main>
    );
  }
}
export default Index;
