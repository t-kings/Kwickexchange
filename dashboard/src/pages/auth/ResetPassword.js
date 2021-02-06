import React, { Component } from "react";
import style from "./Index.module.css";
import bg1 from "./images/bg.svg";
import bg2 from "./images/bg2.svg";
import bg3 from "./images/bg3.svg";
import { connect } from "react-redux";
import logo from "./images/logo.png";
import { Link, Redirect } from "react-router-dom";
import { resetPassword } from "../../store/actions/auth";
class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      fullName: "",
      confirmPassword: "",
      username: "",
      loading: false,
      isAuthenticated: false,
      shouldVerify: false,
      errors: [],
      plans: [],
      user: {},
    };
  }
  handleChange = (e) => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value,
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const errors = [];
    this.setState({
      ...this.state,
      errors,
    });
    const { password, confirmPassword } = this.state;
    const { isLoading, resetPassword, match } = this.props;
    if (isLoading) {
      return "";
    }
    if (password.length < 1) {
      errors.push({
        msg: "Password is required",
        param: "password",
        location: "body",
      });
    }
    if (confirmPassword.length < 1) {
      errors.push({
        msg: "Confirm Password is required",
        param: "confirmPassword",
        location: "body",
      });
    }

    if (password !== confirmPassword) {
      errors.push({
        msg: "Passwords do not match",
        param: "confirmPassword",
        location: "body",
      });
    }
    if (errors.length > 0) {
      this.setState({
        ...this.state,
        errors,
      });
    } else {
      resetPassword({
        password,
        password_confirmation: confirmPassword,
        code: match.params.token,
      });
    }
  };
  render() {
    const { errors } = this.state;
    const { isLoading, isAuthenticated, isPasswordChanged, user } = this.props;
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
    if (isPasswordChanged) {
      return <Redirect to={"/password/" + user.email + "/reset/status"} />;
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
          <form className={style.box} onSubmit={this.handleSubmit}>
            <h4 className={style.box_title}>Reset Password</h4>
            <p className={style.box_info}>Enter a new Password</p>
            <label
              className={
                style.control_label +
                " " +
                (errors.filter((error) => error.param === "password").length > 0
                  ? style.error
                  : " ")
              }
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              placeholder="Password"
              required
              onChange={this.handleChange}
              id="password"
              name="password"
              className={
                style.form_control +
                " " +
                (errors.filter((error) => error.param === "password").length > 0
                  ? style.error
                  : " ")
              }
            />
            {errors
              .filter((error) => error.param === "password")
              .map((item, idx) => (
                <p key={idx} className={style.error_par}>
                  {item.msg}
                </p>
              ))}

            <label
              className={
                style.control_label +
                " " +
                (errors.filter((error) => error.param === "confirmPassword")
                  .length > 0
                  ? style.error
                  : " ")
              }
              htmlFor="confirmPassword"
            >
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="Confirm Password"
              required
              onChange={this.handleChange}
              id="confirmPassword"
              name="confirmPassword"
              className={
                style.form_control +
                " " +
                (errors.filter((error) => error.param === "confirmPassword")
                  .length > 0
                  ? style.error
                  : " ")
              }
            />
            {errors
              .filter((error) => error.param === "confirmPassword")
              .map((item, idx) => (
                <p key={idx} className={style.error_par}>
                  {item.msg}
                </p>
              ))}
            {isLoading ? (
              <div className={style.load + " " + style.link_btn_gold}>
                <div className={style.loader}>Loading...</div>
              </div>
            ) : (
              <input
                type="submit"
                value="Reset Password"
                className={style.link_btn_gold}
              />
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
    resetPassword: (payload) => dispatch(resetPassword(payload)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);
