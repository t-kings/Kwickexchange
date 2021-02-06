import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Component } from "react";
import "./App.css";
import SignIn from "./pages/auth/SignIn";
import Home from "./pages/auth/SignIn";
import Verify from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import { connect } from "react-redux";
import Notification from "./components/notification/index";
class App extends Component {
  render() {
    const { auth } = this.props;
    return (
      <BrowserRouter>
        <Notification />
        <Switch>
          <Route exact path="/" component={SignIn} />
          <Route exact path="/signup" component={SignUp} />
        </Switch>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => {
  return { ...state };
};
export default connect(mapStateToProps, null)(App);
