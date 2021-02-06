import React, { Component } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import style from "./Index.module.css";
const Index = () => {
  const router = useRouter();
  return (
    <div>
      <Footer router={router} />
    </div>
  );
};
export default Index;
class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      message: "",
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
  };
  render() {
    return (
      <footer className={style.footer}>
        <div className={style.hold}>
          <ul>
            <li className={style.title}>
              <h2>Company</h2>
            </li>
            <li>
              <Link href="/overview">
                <a>Overview</a>
              </Link>
            </li>
            <li>
              <Link href="/why">
                <a>Why Us</a>
              </Link>
            </li>
            <li>
              <Link href="/data">
                <a>Data</a>
              </Link>
            </li>
          </ul>
        </div>
        <div className={style.hold}>
          <ul>
            <li className={style.title}>
              <h2>Social</h2>
            </li>
            <li>
              <a href="">Instagram</a>
            </li>
            <li>
              <a href="">Twitter</a>
            </li>
            <li>
              <a href="">Facebook</a>
            </li>
          </ul>
        </div>

        <div className={style.hold}>
          <form onSubmit={this.handleSubmit}>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              onChange={(e) =>
                this.setState({
                  ...this.state,
                  email: e.target.value,
                })
              }
              required
            />
            <textarea
              name="message"
              id="message"
              cols="30"
              rows="10"
              placeholder="Message"
              onChange={(e) =>
                this.setState({
                  ...this.state,
                  message: e.target.value,
                })
              }
            ></textarea>
            <input type="submit" value="SEND" className={style.link_btn_gold} />
          </form>
        </div>
      </footer>
    );
  }
}
