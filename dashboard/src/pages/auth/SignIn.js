import React, { Component } from "react";
import style from "./Index.module.css";
import bg1 from "./images/bg.svg";
import bg2 from "./images/bg2.svg";
import bg3 from "./images/bg3.svg";
import logo from "./images/logo.png";
import { Link } from "react-router-dom";
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
    const { password, email } = this.state;
    const { loading } = this.props;
    if (loading) {
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
      //   this.setState({
      //     ...this.state,
      //     loading: true,
      //     errors,
      //   });
      //   axios
      //     .post(apiUrl + "/user/signin", {
      //       ...this.state,
      //     })
      //     .then((res) => {
      //       setUser(res.data.token);
      //       if (res.status === 200) {
      //         this.setState({
      //           ...this.state,
      //           loading: false,
      //           user: res.data.user,
      //           token: res.data.token,
      //           isAuthenticated: true,
      //         });
      //       } else {
      //         this.setState({
      //           ...this.state,
      //           errors,
      //           loading: false,
      //           user: res.data.user,
      //           response: res.data.message,
      //         });
      //       }
      //     })
      //     .catch((err) => {
      //       if (err.response?.status === 401) {
      //         this.setState({
      //           ...this.state,
      //           errors,
      //           loading: false,
      //           errors: err.response?.data.errors,
      //         });
      //       }
      //       if (err.response?.status === 500) {
      //         cogoToast.error("Internal server error!");
      //         this.setState({
      //           errors,
      //           ...this.state,
      //           loading: false,
      //         });
      //       }
      //       if (err.response?.status === 400) {
      //         cogoToast.error("Wrong email / password combination!");
      //         this.setState({
      //           errors,
      //           ...this.state,
      //           loading: false,
      //         });
      //       }
      //       if (err.response?.status === 402) {
      //         cogoToast.error("Email not verified!");
      //         this.setState({
      //           errors,
      //           ...this.state,
      //           shouldVerify: true,
      //           loading: false,
      //         });
      //       }
      //     });
    }
  };
  render() {
    const { errors, shouldVerify, isAuthenticated } = this.state;
    const { router } = this.props;
    if (isAuthenticated) {
      router.push("/");
    }
    if (shouldVerify) {
      router.push("/verify/" + this.state.email);
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
            <h4 className={style.box_title}>Login</h4>
            <input
              type="email"
              placeholder="Email address"
              onChange={this.handleChange}
              id="email"
              name="email"
              className={
                style.form_control +
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
            <input
              type="submit"
              value="Login"
              className={style.link_btn_gold}
            />
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
export default SignIn;
