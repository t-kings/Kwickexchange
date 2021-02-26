import React, { Component } from "react";
import style from "../Index.module.css";
import { Switch, Route } from "react-router-dom";
import Home from "./home";
import Bitcoin from "./bitcoin";
import Naira from "./naira";
import Status from "./status";
class Index extends Component {
  render() {
    return (
      <main className={style.main_body}>
        <Switch>
          <Route exact path="/home/wallet" component={Home} />
          <Route path="/home/wallet/bitcoin" component={Bitcoin} />
          <Route exact path="/home/wallet/naira" component={Naira} />
          <Route path="/home/wallet/naira/status" component={Status} />
          <Route component={Home} />
        </Switch>
      </main>
    );
  }
}
export default Index;
