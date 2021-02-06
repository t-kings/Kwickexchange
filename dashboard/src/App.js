import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Component } from "react";
import "./App.css";
import SignIn from "./pages/auth/SignIn";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={SignIn} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
