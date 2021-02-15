import React, { Component } from "react";
import { Redirect } from "react-router-dom";

export default class home extends Component {
  render() {
    const { isAuthenticated } = this.props;
    if (!isAuthenticated) {
      return (
        <Redirect
          to={
            this.props.location.redirect_to
              ? this.props.location.redirect_to
              : "/"
          }
        />
      );
    }
    // return <Redirect to="/home/overview" />;
    return <h1></h1>;
  }
}
