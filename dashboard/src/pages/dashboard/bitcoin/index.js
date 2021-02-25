import React, { Component } from "react";
import style from "../Index.module.css";
import { Switch, Route } from "react-router-dom";
import Home from "./home";
import Status from "./status";
class Index extends Component {
  render() {
    return (
      <main className={style.main_body}>
        <Switch>
          <Route exact path="/home/bitcoin" component={Home} />
          <Route path="/home/bitcoin/status" component={Status} />
          <Route component={Home} />
        </Switch>
      </main>
    );
  }
}
export default Index;
