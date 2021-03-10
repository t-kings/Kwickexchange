import React, { Component } from "react";
import style from "./Index.module.css";
import bg1 from "./images/bg.svg";
import bg2 from "./images/bg2.svg";
import bg3 from "./images/bg3.svg";
import { connect } from "react-redux";
import logo from "./images/logo.png";
import { Link, Redirect } from "react-router-dom";
import { motion } from "framer-motion";
import { requestPassword } from "../../store/actions/auth";
class RequestPassword extends Component {
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
    const { email } = this.state;
    const { isLoading, requestPassword } = this.props;
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
    if (errors.length > 0) {
      this.setState({
        ...this.state,
        errors,
      });
    } else {
      requestPassword({ email });
    }
  };
  render() {
    const { errors } = this.state;
    const { isLoading, isAuthenticated, user, isPasswordSent } = this.props;
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

    if (isPasswordSent) {
      return <Redirect to={"/password/" + user.email} />;
    }
    const containerVariants = {
      hidden: {
        x: "20vw",
        opacity: 0.5,
      },
      visible: {
        x: "0vh",
        opacity: 1,
        transition: { delay: 0, duration: 0.3 },
      },
      exit: {
        opacity: 0,
        transition: { ease: "easeInOut", duration: 0.15 },
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
            <h4 className={style.box_title}>Forgot Password</h4>
            <p className={style.box_info}>Enter your email</p>
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
      </motion.div>
    );
  }
}

const mapStateToProps = (state) => {
  return { ...state.auth };
};
const mapDispatchToProps = (dispatch) => {
  return {
    requestPassword: (payload) => dispatch(requestPassword(payload)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(RequestPassword);
