import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Component } from "react";
import "./App.css";
import SignIn from "./pages/auth/SignIn";
import Home from "./pages/auth/SignIn";
import Verify from "./pages/auth/Verify";
import VerifyEmail from "./pages/auth/VerifyEmail";
import SignUp from "./pages/auth/SignUp";
import { connect } from "react-redux";
import Notification from "./components/notification/index";
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Notification />
        <Switch>
          <Route exact path="/" component={SignIn} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/verify/:email" component={Verify} />
          <Route exact path="/verify/:email/:token" component={VerifyEmail} />
        </Switch>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => {
  return { ...state };
};
export default connect(mapStateToProps, null)(App);
