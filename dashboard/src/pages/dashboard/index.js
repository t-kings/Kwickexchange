import React, { Component } from "react";
import { connect } from "react-redux";
import Loading from "../../components/loading";
import Dashboard from "./dashboard";
import { getResources } from "../../store/actions/resources";
import { motion } from "framer-motion";
class Index extends Component {
  componentDidMount = () => {
    const { getResources } = this.props;
    getResources();
  };
  static containerVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: { delay: 1.5, duration: 1.5 },
    },
    exit: {
      x: "-100vh",
      transition: { ease: "easeInOut" },
    },
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
