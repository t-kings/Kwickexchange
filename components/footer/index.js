import React, { Component, useContext } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import style from "./Index.module.css";
import axios from "axios";
import { apiUrl } from "../../store/root";
import { NotificationContext } from "../../store/root";
const Index = () => {
  const router = useRouter();
  const context = useContext(NotificationContext);
  const { showNotification } = context;
  return (
    <div>
      <Footer router={router} showNotification={showNotification} />
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
      loading: false,
    };
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const { email, message } = this.state;
    this.setState({
      ...this.state,
      loading: true,
    });
    try {
      const res = await axios.post(apiUrl + "misc/contact-us", {
        email,
        message,
      });
      if (res.status === 201) {
        this.props.showNotification(
          true,
          "Contact Us",
          "Message received, we shall reach out to you shortly"
        );
      } else {
        this.props.showNotification(false, "Contact Us", res.data?.message);
      }
    } catch (e) {
      this.props.showNotification(
        false,
        "Contact Us",
        "Error Something went wrong"
      );
    }
    this.setState({
      ...this.state,
      loading: false,
    });
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
          <form id="contact_us" onSubmit={this.handleSubmit}>
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
              required
              onChange={(e) =>
                this.setState({
                  ...this.state,
                  message: e.target.value,
                })
              }
            ></textarea>
            {this.state.loading ? (
              <div className={style.link_btn_gold + " " + style.load}>
                <div className={style.loader}>Loading...</div>
              </div>
            ) : (
              <input
                type="submit"
                value="SEND"
                className={style.link_btn_gold}
              />
            )}
          </form>
        </div>
      </footer>
    );
  }
}
