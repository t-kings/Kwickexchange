import React, { Component } from "react";
import style from "./Index.module.css";
import bg1 from "./images/bg.svg";
import bg2 from "./images/bg2.svg";
import bg3 from "./images/bg3.svg";
import { connect } from "react-redux";
import logo from "./images/logo.png";
import { Link, Redirect } from "react-router-dom";
import { verifyEmail } from "../../store/actions/auth";
class VerifyEmail extends Component {
  componentDidMount = () => {
    const { verifyEmail, match } = this.props;
    verifyEmail(match.params.token);
  };
  render() {
    const { isAuthenticated, isLoading, isVerified } = this.props;
    if (isAuthenticated) {
      return (
        <Redirect
          to={
            this.props.location.redirect_to
              ? this.props.location.redirect_to
              : "/dashboard"
          }
        />
      );
    }
    return (
      <div className={style.big_container}>
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
          {isLoading ? (
            <>
              <div className={style.load + " " + style.big_load}>
                <div className={style.loader}>Loading...</div>
              </div>
            </>
          ) : isVerified ? (
            <>
              <form className={style.box}>
                <h1 className={style.box_title}>Successful!</h1>
                <p className={style.box_info}>
                  Your email has been verified successfully
                </p>
                <Link className={style.link_btn_gold} to="/">
                  Sign In
                </Link>
              </form>
            </>
          ) : (
            <>
              <form className={style.box}>
                <h1 className={style.box_title}>Not Successful!</h1>
                <p className={style.box_info}>An error occurred</p>
                <Link className={style.link_btn_gold} to="/">
                  Sign In
                </Link>
              </form>
            </>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { ...state.auth };
};
const mapDispatchToProps = (dispatch) => {
  return {
    verifyEmail: (payload) => dispatch(verifyEmail(payload)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);