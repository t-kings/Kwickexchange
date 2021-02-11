import React, { Component } from "react";
import style from "./Index.module.css";
import bg1 from "./images/bg.svg";
import bg2 from "./images/bg2.svg";
import bg3 from "./images/bg3.svg";
import { connect } from "react-redux";
import logo from "./images/logo.png";
import { Link, Redirect } from "react-router-dom";
import { signIn } from "../../store/actions/auth";
class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
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
    const { password, email } = this.state;
    const { isLoading, signIn } = this.props;
    if (isLoading) {
      return "";
    }
    if (email.length < 1) {
      errors.push({
        msg: "Email is required",
        param: "email",
        location: "body",
      });
    }
    if (password.length < 1) {
      errors.push({
        msg: "Password is required",
        param: "password",
        location: "body",
      });
    }
    if (errors.length > 0) {
      this.setState({
        ...this.state,
        errors,
      });
    } else {
      signIn({ email, password });
    }
  };
  render() {
    const { errors } = this.state;
    const { isLoading, isAuthenticated, toVerify, user } = this.props;
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
    if (toVerify) {
      return <Redirect to={"/verify/" + user.email} />;
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
            <h4 className={style.box_title}>Sign In</h4>
            <input
              type="email"
              placeholder="Email address"
              onChange={this.handleChange}
              id="email"
              name="email"
              className={
                style.form_control +
                " " +
                (errors.filter((error) => error.param === "email").length > 0
                  ? style.error
                  : " ")
              }
            />
            {errors
              .filter((error) => error.param === "email")
              .map((item, idx) => (
                <p key={idx} className={style.error_par}>
                  {item.msg}
                </p>
              ))}
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
            {isLoading ? (
              <div className={style.load + " " + style.link_btn_gold}>
                <div className={style.loader}>Loading...</div>
              </div>
            ) : (
              <input
                type="submit"
                value="Login"
                className={style.link_btn_gold}
              />
            )}
          </form>

          <div className={style.foot}>
            <Link to="/password">Forgot password?</Link>
            <Link to="/signup">Create Account</Link>
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
    signIn: (payload) => dispatch(signIn(payload)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
