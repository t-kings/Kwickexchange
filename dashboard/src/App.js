import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Component } from "react";
import "./App.css";
import SignIn from "./pages/auth/SignIn";
import { connect } from "react-redux";
import Notification from "./components/notification/index";
class App extends Component {
  render() {
    const { auth } = this.props;
    return (
      <BrowserRouter>
        <Notification />
        <Switch>
          <Route
            exact
            path="/"
            component={auth.isAuthenticated ? SignIn : SignIn}
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
