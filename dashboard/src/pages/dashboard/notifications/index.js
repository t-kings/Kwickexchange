import React, { Component } from "react";
import style from "../Index.module.css";
import { Switch, Route } from "react-router-dom";
import Home from "./home";
import Notification from "./notification";
class Index extends Component {
  render() {
    return (
      <main className={style.main_body}>
        <Switch>
          <Route exact path="/home/notifications" component={Home} />
          <Route path="/home/notifications/:id" component={Notification} />
        </Switch>
      </main>
    );
  }
}
export default Index;
