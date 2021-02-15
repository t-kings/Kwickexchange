import React, { Component } from "react";
import { Redirect } from "react-router-dom";

export default class home extends Component {
  render() {
    return <Redirect to="/home/overview" />;
  }
}
