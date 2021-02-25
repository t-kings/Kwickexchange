import React, { Component } from "react";
import style from "../Index.module.css";
import { Switch, Route } from "react-router-dom";
import Home from "./home";
class Index extends Component {
  render() {
    return (
      <main className={style.main_body}>
        <Switch>
          <Route exact path="/home/settings" component={Home} />
          <Route exact path="/home/settings/:id" component={Home} />
          <Route component={Home} />
        </Switch>
      </main>
    );
  }
}
export default Index;
