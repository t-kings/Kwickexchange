import React, { Component } from "react";
import style from "./Index.module.css";
import bg1 from "./images/bg.svg";
import bg2 from "./images/bg2.svg";
import bg3 from "./images/bg3.svg";
import { connect } from "react-redux";
import logo from "./images/logo.png";
import { Link, Redirect } from "react-router-dom";
import { resendVerification } from "../../store/actions/auth";
class Verify extends Component {
  handleResend = (e) => {
    e.preventDefault();

    const { isLoading, resendVerification, match } = this.props;
    if (isLoading) {
      return "";
    }
    resendVerification({ user: match.params.email });
  };
  render() {
    const { isAuthenticated, isLoading } = this.props;
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
          <form className={style.box}>
            <h1 className={style.box_title}>Verify Email</h1>
            <p className={style.box_info}>
              An email has been sent to {this.props.match.params.email} verify
              to continue
            </p>
            <p className={style.box_info}>Didn't receive it?</p>
            {isLoading ? (
              <div className={style.load + " " + style.link_btn_gold}>
                <div className={style.loader}>Loading...</div>
              </div>
            ) : (
              <button
                onClick={this.handleResend}
                className={style.link_btn_gold}
              >
                Resend
              </button>
            )}
          </form>
          <div className={style.foot}>
            <Link to="/">Sign In</Link>
          </div>
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
    resendVerification: (payload) => dispatch(resendVerification(payload)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Verify);
