import React, { Component } from "react";
import style from "../Index.module.css";
import { Switch, Route } from "react-router-dom";
import Home from "./home";
import Bitcoin from "./bitcoin";
class Index extends Component {
  render() {
    return (
      <main className={style.main_body}>
        <Switch>
          <Route exact path="/home/wallet" component={Home} />
          <Route path="/home/wallet/bitcoin" component={Bitcoin} />
        </Switch>
      </main>
    );
  }
}
export default Index;
