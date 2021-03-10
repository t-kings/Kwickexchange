import React, { Component } from "react";
import style from "./Index.module.css";
import bg1 from "./images/bg.svg";
import bg2 from "./images/bg2.svg";
import bg3 from "./images/bg3.svg";
import { connect } from "react-redux";
import logo from "./images/logo.png";
import { Link, Redirect } from "react-router-dom";
import { motion } from "framer-motion";
import { signUp } from "../../store/actions/auth";
class SignUp extends Component {
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
        full_name: [],
        user_name: [],
        username: [],
        email: [],
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
      full_name: [],
      user_name: [],
      username: [],
      email: [],
      password: [],
      confirmPassword: [],
    };
    this.setState({
      ...this.state,
      errors,
    });
    const { password, email, fullName, username, confirmPassword } = this.state;
    const { isLoading, signUp } = this.props;
    if (isLoading) {
      return "";
    }
    if (email.length < 1) {
      errors.email.push("Email is required");
    }
    if (password.length < 1) {
      errors.password.push("Password is required");
    }
    if (confirmPassword.length < 1) {
      errors.confirmPassword.push("Confirm Password is required");
    }

    if (username.length < 1) {
      errors.user_name.push("Username is required");
    }

    if (fullName.length < 1) {
      errors.full_name.push("Full Name is required");
    }

    if (password !== confirmPassword) {
      errors.confirmPassword.push("Passwords do not match");
    }
    if (
      errors.full_name.length > 0 ||
      errors.user_name.length > 0 ||
      errors.email.length > 0 ||
      errors.password.length > 0 ||
      errors.confirmPassword.length > 0
    ) {
      this.setState({
        ...this.state,
        errors,
      });
    } else {
      signUp({ email, password, full_name: fullName, user_name: username });
    }
  };
  render() {
    const errors = { ...this.state.errors, ...this.props.errors };
    const { isLoading, isAuthenticated, toVerify, user } = this.props;
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
    if (toVerify) {
      return <Redirect to={"/verify/" + user.email} />;
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
          <form className={style.box} onSubmit={this.handleSubmit}>
            <h4 className={style.box_title}>Create your account</h4>
            <label
              className={
                style.control_label +
                " " +
                (errors["full_name"].length > 0 ? style.error : " ")
              }
              htmlFor="fullName"
            >
              Full Name
            </label>
            <input
              type="text"
              className={
                style.form_control +
                " " +
                (errors["full_name"].length > 0 ? style.error : " ")
              }
              id="fullName"
              name="fullName"
              onChange={this.handleChange}
              required
            />
            {errors["full_name"].map((item, idx) => (
              <p key={idx} className={style.error_par}>
                {item}
              </p>
            ))}

            <label
              className={
                style.control_label +
                " " +
                (errors["user_name"].length > 0 ? style.error : " ")
              }
              htmlFor="username"
            >
              Username
            </label>
            <input
              type="text"
              className={
                style.form_control +
                " " +
                (errors["user_name"].length > 0 ? style.error : " ")
              }
              id="username"
              name="username"
              onChange={this.handleChange}
              required
            />
            {errors["user_name"].map((item, idx) => (
              <p key={idx} className={style.error_par}>
                {item}
              </p>
            ))}
            <label
              className={
                style.control_label +
                " " +
                (errors["email"].length > 0 ? style.error : " ")
              }
              htmlFor="email"
            >
              Email Address
            </label>
            <input
              type="email"
              placeholder="Email address"
              id="email"
              name="email"
              onChange={this.handleChange}
              className={
                style.form_control +
                " " +
                (errors["email"].length > 0 ? style.error : " ")
              }
            />
            {errors["email"].map((item, idx) => (
              <p key={idx} className={style.error_par}>
                {item}
              </p>
            ))}
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
                value="Create Account"
                className={style.link_btn_gold}
              />
            )}
          </form>

          <div className={style.foot}>
            <Link to="/">Sign In</Link>
          </div>
        </div>
      </motion.div>
    );
  }
}

const mapStateToProps = (state) => {
  return { ...state.auth };
};
const mapDispatchToProps = (dispatch) => {
  return {
    signUp: (payload) => dispatch(signUp(payload)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
