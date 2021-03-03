import React, { Component } from "react";
import style from "../Index.module.css";
import { Switch, Route } from "react-router-dom";
import Home from "./home";
import Transaction from "./transaction";
class Index extends Component {
  render() {
    return (
      <main className={style.main_body}>
        <Switch>
          <Route exact path="/home/transactions" component={Home} />
          {/* <Route path="/home/transactions/:tab/:id" component={Transaction} /> */}
          <Route path="/home/transactions/:tab" component={Home} />
          <Route component={Home} />
        </Switch>
      </main>
    );
  }
}
export default Index;
