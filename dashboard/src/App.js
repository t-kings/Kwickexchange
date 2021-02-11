import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Component } from "react";
import "./App.css";
import SignIn from "./pages/auth/SignIn";
import Home from "./pages/dashboard";
import Verify from "./pages/auth/Verify";
import VerifyEmail from "./pages/auth/VerifyEmail";
import SignUp from "./pages/auth/SignUp";
import { connect } from "react-redux";
import Notification from "./components/notification/index";
import RequestPassword from "./pages/auth/RequestPassword";
import Password from "./pages/auth/Password";
import ResetPassword from "./pages/auth/ResetPassword";
import ResetPasswordStatus from "./pages/auth/ResetPasswordStatus";
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
          <Route exact path="/password" component={RequestPassword} />
          <Route exact path="/password/:email" component={Password} />
          <Route exact path="/home" component={Home} />
          <Route
            exact
            path="/password/:email/:token"
            component={ResetPassword}
          />
          <Route
            exact
            path="/password/:user/reset/status"
            component={ResetPasswordStatus}
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => {
  return { ...state };
};
export default connect(mapStateToProps, null)(App);
