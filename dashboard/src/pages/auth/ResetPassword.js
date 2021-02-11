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
      errors: {
        password: [],
        confirmPassword: [],
      },
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
    const errors = {
      password: [],
      confirmPassword: [],
    };
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
      errors.password.push("Password is required");
    }
    if (confirmPassword.length < 1) {
      errors.confirmPassword.push("Confirm Password is required");
    }
    if (password !== confirmPassword) {
      errors.confirmPassword.push("Passwords do not match");
    }
    if (errors.password.length > 0 || errors.confirmPassword.length > 0) {
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
    const errors = { ...this.state.errors, ...this.props.errors };
    const { isLoading, isAuthenticated, isPasswordChanged, user } = this.props;
    if (isAuthenticated) {
      return (
        <Redirect
          to={
            this.props.location.redirect_to
              ? this.props.location.redirect_to
              : "/home"
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
                (errors["password"].length > 0 ? style.error : " ")
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
                (errors["password"].length > 0 ? style.error : " ")
              }
            />
            {errors["password"].map((item, idx) => (
              <p key={idx} className={style.error_par}>
                {item}
              </p>
            ))}

            <label
              className={
                style.control_label +
                " " +
                (errors["confirmPassword"].length > 0 ? style.error : " ")
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
                (errors["confirmPassword"].length > 0 ? style.error : " ")
              }
            />
            {errors["confirmPassword"].map((item, idx) => (
              <p key={idx} className={style.error_par}>
                {item}
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
