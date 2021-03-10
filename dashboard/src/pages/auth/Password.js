import React, { Component } from "react";
import style from "./Index.module.css";
import bg1 from "./images/bg.svg";
import bg2 from "./images/bg2.svg";
import bg3 from "./images/bg3.svg";
import { connect } from "react-redux";
import { motion } from "framer-motion";
import logo from "./images/logo.png";
import { Link, Redirect } from "react-router-dom";
class Verify extends Component {
  render() {
    const { isAuthenticated } = this.props;
    if (isAuthenticated) {
      return (
        <Redirect
          to={
            this.props.location.redirect_to
              ? this.props.location.redirect_to
              : "/home/overview"
          }
        />
      );
    }
    const containerVariants = {
      hidden: {
        opacity: 0.5,
      },
      visible: {
        opacity: 1,
        transition: { delay: 0, duration: 0.5 },
      },
      exit: {
        x: "-100vh",
        transition: { ease: "easeInOut" },
      },
    };
    return (
      <motion.div
        className={style.big_container}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div className={style.flier}>
          <img src={bg1} alt="bg" />
        </div>
        <div className={style.flier}>
          <img src={bg2} alt="bg" />
        </div>
        <div className={style.flier}>
          <img src={bg3} alt="bg" />
        </div>
        <div className={style.container}>
          <div className={style.logo}>
            <a href="https://kwickxchnage.com" title="Kwick Xchange">
              <img src={logo} alt="Kwick Xchange logo" />
            </a>
          </div>
          <form className={style.box}>
            <h1 className={style.box_title}>Forgot Password</h1>
            <p className={style.box_info}>
              Password reset email has been sent to{" "}
              {this.props.match.params.email}.
            </p>
            <Link className={style.link_btn_gold} to="/">
              Sign In
            </Link>
          </form>
        </div>
      </motion.div>
    );
  }
}

const mapStateToProps = (state) => {
  return { ...state.auth };
};
export default connect(mapStateToProps)(Verify);
