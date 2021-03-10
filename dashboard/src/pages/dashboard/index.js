import React, { Component } from "react";
import { connect } from "react-redux";
import Loading from "../../components/loading";
import Dashboard from "./dashboard";
import { getResources } from "../../store/actions/resources";
class Index extends Component {
  componentDidMount = () => {
    const { getResources } = this.props;
    getResources();
  };
  render() {
    const { isLoading } = this.props;
    return isLoading ? <Loading /> : <Dashboard />;
  }
}
const mapStateToProps = (state) => {
  return { ...state.resources };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getResources: () => dispatch(getResources()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Index);
